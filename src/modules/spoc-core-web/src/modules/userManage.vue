<style lang="less">
.core-usermanage-form{
    .box {
        width: 570px;
        position: relative;
        .organizatin-upload {
            width: 120px !important;
            margin-left: 77px;
            margin-top: 14px;
            font-size: 14px;
            .ivu-upload {
                color: #fff;
                background-color: #2d8cf0;
                border: none;
                padding: 6px 12px;
            }
        }
        &:after {
            content: "";
            display: block;
            clear: both;
        }
        .add-left {
            float: left;
        }
        .upPhoto {
            position: absolute;
            top: 40px;
            right: 55px;
            .photo {
                width: 80px;
                height: 80px;
                border: 1px solid #e0e0e0;
                margin-left: 77px;
                background-color: #f1f1f1;
                img {
                    width: 100%;
                    height: 100%;
                    text-align: center;
                }
            }
            .iconPhoto {
                background: #44BCB7;
                color: #FFFFFF;
                margin-top: 15px;
            }
        }
    }
}
</style>
<template>
    <div>
        <Modal :title="addForm.update?addForm.edittitle:addForm.addtitle" v-model="addForm.visible" class-name="vertical-center-modal" width="580px">
            <Form :label-width="72" label-position="right" ref="addForm" class="core-usermanage-form" :rules="ruleValidate" :model="addForm">
                <div class="box">
                    <div class="add-left" style="width: 340px;">
                        <FormItem :label="$t('modules_usermanage_219')" prop="name">
                            <Input v-model="addForm.name" :placeholder="$t('modules_usermanage_220')"></Input>
                        </FormItem>
                        <FormItem :label="$t('modules_usermanage_221')" prop="enName">
                            <Input v-model="addForm.enName" :placeholder="$t('modules_usermanage_222')"></Input>
                        </FormItem>
                        <FormItem :label="$t('modules_usermanage_223')" prop="loginName">
                            <Input v-model="addForm.loginName" :placeholder="$t('modules_usermanage_224')"></Input>
                        </FormItem>
                        <FormItem :label="$t('modules_usermanage_225')" prop="password">
                            <Input type="password" v-model="addForm.password" :placeholder="$t('modules_usermanage_226')"></Input>
                        </FormItem>
                    </div>
                    <div class="upPhoto">
                        <div class="photo" >
                            <img :src="addForm.photo" alt=""/>
                        </div>
                        <Upload 
                            :data="{
                                bizId: '',
                                bizType: 'image',
                                isSingle: true
                            }"
                            :headers="headers"
                            :action="uploadUrl" name="file" 
                            :on-success="uploadSuccess" ref="upload" class="organizatin-upload" 
                            :format="['jpg','jpeg','png']" :show-upload-list="false" 
                            :max-size="100" :on-format-error="uploadFormatError" 
                            :on-exceeded-size="uploadMaxSize">{{$t('modules_usermanage_227')}}</Upload>
                    </div>
                </div>
                <div class="bottom">
                    <FormItem :label="$t('modules_usermanage_228')" prop="email">
                        <Input v-model="addForm.email" :placeholder="$t('modules_usermanage_229')"></Input>
                    </FormItem>
                    <FormItem :label="$t('modules_usermanage_230')" prop="mobile">
                        <Input v-model="addForm.mobile" :placeholder="$t('modules_usermanage_231')"></Input>
                    </FormItem>
                    <FormItem :label="$t('modules_usermanage_232')" prop="jobID">
                        <Select v-model="addForm.jobID" filterable>
                            <Option v-for="item in roleListData" :value="item.id" :key="item.id">{{item.label}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem :label="$t('modules_usermanage_233')" prop="officeId">
                        <Select v-model="addForm.officeId" filterable>
                            <Option v-for="item in facListData" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem :label="$t('modules_usermanage_234')" prop="institution">
                        <Select v-model="addForm.departIds" filterable multiple @on-change="institutionChange">
                            <Option v-for="item in institutionList" :disabled="item.id==addForm.officeId" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem :label="$t('modules_usermanage_235')" prop="levelID">
                        <Select v-model="addForm.levelID">
                            <OptionGroup :label="item.title" v-for="item in gradeListData" :key="item.id">
                                <Option v-for="i in item.children" :value="i.id" :key="i.id">{{i.title}}</Option>
                            </OptionGroup>
                        </Select>
                    </FormItem>
                    <FormItem :label="$t('modules_usermanage_236')" prop="remarks" class="last-child">
                        <Input v-model="addForm.remarks" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('modules_usermanage_237')"></Input>
                    </FormItem>
                </div>
            </Form>
            <div slot="footer">
                <Button @click="addMemberClose">{{$t('modules_usermanage_238')}}</Button>
                <Button type="primary" @click="addMemberOk">{{$t('modules_usermanage_239')}}</Button>
            </div>
        </Modal>
    </div>
</template>
<script>

import valid,{ errors,sysDict, sysUser, sysOffice, api } from "../libs/request";
import {extendKey} from '../libs/util.js';
import {mapMutations} from 'vuex';


export default {
    mounted(){
        this.headers = {
            token: localStorage.getItem('token'),
            tenant: localStorage.getItem('tenant')	
        }
    },
    props:{
        tableSelectedItem:{
            type:Array,
            required:true,
           
        }
    },
    computed: {
		uploadUrl() {
		  return api.fileAttachmentUploadUrl(); //sysUser.uploadImg();
		},
    },
    data() {
        return {
            headers: {},
            // 添加成员表单验证
            ruleValidate: {
                name: [
                    {required: true, message: this.$t('modules_usermanage_240'), trigger: 'blur'}
                ],
                enName: [
                    {required: false, message: this.$t('modules_usermanage_241'),pattern: /^[a-zA-Z\.\s]+$/, trigger: 'blur'},
                ],
                loginName: [
                    {required: true, message: this.$t('modules_usermanage_242'), trigger: 'blur'}
                ],
                password: [
                    {required: false, message: this.$t('modules_usermanage_243'), trigger: 'blur'},
                    {type: 'string', min: 6, message: this.$t('modules_usermanage_244'), trigger: 'blur'},
                    {type: 'string', pattern: /^([0-9]|[a-zA-Z]|[@$]){4,32}$/, message: this.$t('modules_usermanage_245'), trigger: 'blur'}
                ],
                email: [
                    {required: true, message: this.$t('modules_usermanage_246'), trigger: 'blur'},
                    {type: 'string', pattern: /^[.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: this.$t('modules_usermanage_247'), trigger: 'blur'}
                ],
                mobile: [
                    {required: true, message: this.$t('modules_usermanage_248'), trigger: 'blur'},
                    {type: 'string', pattern: /(^\+1\ ?\d{10}$)|(^1[345678]\d{9}$)|(^\d{1,3}-\d{9,10}$)/, message: this.$t('modules_usermanage_249'), trigger: 'blur'}
                ],
                jobID: [
                    {required: true, message: this.$t('modules_usermanage_250'), trigger: 'change'}
                ],
                officeId: [
                    {required: true, message: this.$t('modules_usermanage_251'), trigger: 'change'}
                ],
                levelID: [
                    {required: true, message: this.$t('modules_usermanage_252'), trigger: 'change'}
                ],
                remarks: [
                    {type: 'string', max: 100, message: this.$t('modules_usermanage_253'), trigger: 'blur'}
                ]
            },
            addForm: {
                visible:false,
                update:false,
                addtitle:this.$t('modules_usermanage_254'),
                edittitle:this.$t('modules_usermanage_255'),
				institution:'',
				departIds:[],
                name: "",
                enName: "",
                loginName: "",
                password: "",
                photo: "",
                officeId: '',
                email:'',
                mobile : '',
                jobID: '',
                levelID: "",
                remarks: "",
            },
            // 添加成员三个下拉数据
            institutionList:[],
            facListData:[],
            roleListData:[],
            gradeListData:[],
        };
    },
    methods:{
        ...mapMutations(['updateLoadingStatus']),
        institutionChange(val){
        	this.addForm.institution=','+this.addForm.departIds.join(',')+',';
        	console.log(this.addForm.institution)
        },
        showAdd(){
            this.addFacMember();
        },
        showUpdate(){
            this.showUpdateUser();
        },
        showDel(){
            this.showDelUser();
        },
        addFacMember() {
            this.tryGetRoleList();
            this.tryGetFacList();
            this.tryGetOrganList();
            this.tryGetGradeList();
            this.$refs.addForm.resetFields();
            this.addForm.photo = '';
            this.addForm.update = false;
            this.addForm.visible = true;
        },
        addMemberOk() {
            this.$refs.addForm.validate((va) => {
                if (va) {
                    //保存数据
                    let param = {
                        'office.id':this.addForm.officeId,
                        departIds:this.addForm.institution,
                        'job.id':this.addForm.jobID,
                        name:this.addForm.name,
                        enName: this.addForm.enName,
                        loginName: this.addForm.loginName,
                        password: this.addForm.password,
                        photo: this.addForm.photo,
                        email: this.addForm.email,
                        mobile : this.addForm.mobile,
                        remarks: this.addForm.remarks,
                        level: this.addForm.levelID
                    };
                    if(this.addForm.update){
                        param.id = this.addForm.update.id;
                    }
                    this.updateLoadingStatus({isLoading: true});
                    sysUser.saveUser(param).then(valid.call(this)).then(res => {
                        if (res.ok) {
                            this.addMemberClose();
                            this.$emit('update','org',{ref:'org'});
                            this.$emit('fresh');
                        }
                    }).catch(errors.call(this)).finally(()=>{
                        this.updateLoadingStatus({isLoading: false});
                    });
                }
            });
        },
        addMemberClose() {
            this.addForm.visible = false;
            this.departIds=[];
        },
        uploadSuccess(res,file){
            this.addForm.photo = res.data.url;
        },
        uploadFormatError() {
            this.$Message.error(this.$t('modules_usermanage_256'));
        },
        uploadMaxSize() {
            this.$Message.error(this.$t('modules_usermanage_257'));
        },
        showUpdateUser(){
            if(this.tableSelectedItem.length!=1){
                return this.$Message.error(this.$t('modules_usermanage_258'));
            }
            this.$refs.addForm.resetFields();
            let user = this.tableSelectedItem[0];
            extendKey(['name','enName','loginName','photo','officeId','email','mobile','jobID','levelID','remarks','departIds'],user,this.addForm);
            if(this.addForm.departIds){
	            let arr=this.addForm.departIds.split(',');
	            let length=arr.length;
	            this.addForm.departIds=arr.slice(1,-1);
            }
            Promise.all([this.tryGetRoleList(),this.tryGetFacList(),this.tryGetGradeList(),this.tryGetOrganList()]).then(()=>{
                this.addForm.update = user;
                this.addForm.visible = true;
            });
        },
        showDelUser(){
            //删除操作  包含删除一个或者多个同时删除
            if (this.tableSelectedItem.length > 0) {
                this.$Modal.confirm({
                    title: this.$t('modules_usermanage_259'),
                    content: this.$t('modules_usermanage_260'),
                    onOk: () => {
                        let userList = this.tableSelectedItem.map(item=>{
                            return {id:item.id};
                        });
                        this.updateLoadingStatus({isLoading: true});
                        sysUser.deleteUser({userList: JSON.stringify(userList)}).then(valid.call(this)).then((data) => {
                            if (data.ok) {
                                this.$emit('update','org',{ref:'org'});
                                this.$emit('fresh');
                            }
                        }).catch(errors.call(this)).finally(()=>{
                            this.updateLoadingStatus({isLoading: false});
                        })
                    }
                })
            }
        },
        tryGetRoleList(){ // 添加成员 岗位的下拉数据
            if(!this.roleListData.length){
                this.updateLoadingStatus({isLoading: true});
                return sysDict.listJobTree().then(valid.call(this)).then(res => {
                    if (res.ok) {
                        this.roleListData = res.data.data;
                    }
                }).catch(errors.call(this)).finally(()=>{
                    this.updateLoadingStatus({isLoading:false});
                });
            }
            return Promise.resolve();
            
        },
        tryGetFacList(){ // 添加成员 机构的下拉数据
            if(!this.facListData.length){
                this.updateLoadingStatus({isLoading: true});
                return sysOffice.officeListData({}).then(valid.call(this)).then(res => {
                    if (res.ok) {
                        this.facListData = res.data.data.allOffice;
                    }
                }).catch(errors.call(this)).finally(()=>{
                    this.updateLoadingStatus({isLoading:false});
                });
            }
            return Promise.resolve();
            
        },
        tryGetGradeList(){ //  添加成员 职能等级的下拉数据
            if(!this.gradeListData.length){
                return sysDict.loadJobTree().then(valid.call(this)).then(res => {
                    if (res.ok) {
                        this.gradeListData = res.data.data.children;
                    }
                }).catch(errors.call(this)).finally(()=>{
                    this.updateLoadingStatus({isLoading:false});
                });
            }
            return Promise.resolve();
        },
        tryGetOrganList(){//  添加成员兼职机构的下拉数据
            if(!this.institutionList.length){//getOfficeList
                return sysOffice.officeList({grade:2,types:"1,2,3"}).then(valid.call(this)).then(res => {
                    if (res.ok) {
                        this.institutionList = res.data.data.allCompany;
                    }
                }).catch(errors.call(this)).finally(()=>{
                    this.updateLoadingStatus({isLoading:false});
                });
            }
            return Promise.resolve();
        }
    }
}
</script>


