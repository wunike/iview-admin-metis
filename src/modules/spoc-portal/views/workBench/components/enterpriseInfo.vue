<style lang="less">
.ei-container{
    background: #fff;
    height:100%;
    overflow-y: auto;
    padding-top:30px;
    padding-left:96px;
    padding-bottom:30px;
    overflow-x: hidden;
    .img-name-class{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
    }
    .img-big-style3 {
        width: 420px;
        height: 150px;
        background: #DCDEE3;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        -webkit-user-drag: none;
        img{
            max-height:150px;
        }
    }
    .cosUpload{
        text-align: right ;
    }
    .uploadWarning{
        display:none;
    }
    .open-progress{
        display:none;
    }
}
</style>

<template>
    <div class="ei-container">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-colon  :label-width="80">
            <Row>
                <Col span="8">
                    <FormItem label="企业名称" prop="name" show-message>
                        <Input v-model="formValidate.name" style="width: 340px" placeholder="请输入企业名称" @on-blur="nameBlur(formValidate.name)"></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <FormItem label="企业简称" prop="bussinessShortName" show-message>
                        <Input v-model="formValidate.bussinessShortName" style="width: 340px" placeholder="请输入企业简称"></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <FormItem label="联系人" prop="connect" show-message>
                        <Input v-model="formValidate.connect"  style="width: 340px" placeholder="请输入姓名"></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <FormItem label="联系电话" prop="phone" show-message>
                        <Input v-model="formValidate.phone"  style="width: 340px" placeholder="请输入联系电话"></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="8" style="width: 420px">
                    <Row style="display: flex;justify-content: space-between;">
                        <Col span="18" style="margin-right:7px;">
                            <FormItem label="营业执照" prop="businessfileName">
                                <Input  disabled v-model="formValidate.businessfileName"></Input>
                            </FormItem>
                        </Col>
                        <Col>
                            <!-- <cos-upload
                                    ref="businessFileName"
                                    v-if="objectType && kind"
                                    :objectType="objectType"
                                    :objectId="objectId"
                                    :kind="kind"
                                    :accept="['png','jpg']"
                                    :maxNum="1"
                                    :maxSize=".5"
                                    :buttonSize="buttonSize"
                                    :buttonType="buttonType"
                                    :style="buttonStyle"
                                    uploadButtonName="上传文件"
                                    fileInputId="businessFile"
                                    :isChangeFile="true"
                                    @hasUploadFile="hasUploadFile">
                            </cos-upload> -->
                           <Upload style="margin-top:1px;" 
                                :data="{
                                    bizId: '',
                                    bizType: 'businesslicenseinfo',
                                    isSingle: true
                                }"
                                :headers="headers"
                                :action="uploadImg" :default-file-list="businessUrl" name="file"
                                :show-upload-list="false"
                                :format="['jpg','png']" :on-format-error="FormatError" :on-progress="progressUpload"
                                :on-success="HandleSuccess">
                               <Button icon="ivu-icon ivu-icon-ios-cloud-upload-outline">上传文件</Button>
                           </Upload>
                        </Col>
                    </Row>
                </Col>
                <Col span="6" style="height:32px;line-height:32px;color:#999999;margin-left:10px;">
                    <Icon type="ios-information-circle" class="IconStyle" />
                    <span class="tipStyle">请上传格式为.jpg或.png的图片</span>
                </Col>
            </Row>
            <Row>
                <Col span="18" >
                    <FormItem>
                        <div class="img-big-style3" style="text-align:center">
                            <img :src="businessUrlUrl"  >
                        </div>
                    </FormItem>
                </Col>
            </Row>
        </Form>
    </div>
</template>

<script>
    import valid, {
        errors,
        sysConfig,
        sysAttachment,
        common,
        api
    } from "../../../libs/request.js";
    import { mapMutations } from 'vuex';
    import cosUpload from "@public/modules/cosUpload.vue";
    export default {
    components: {
        cosUpload
    },
    data() {
        const validateName = (rule, value, callback) => {
            // const reg = /^[^ ]+$/;
            const regx = /^[\u4E00-\u9FA5()]+|$/
           if(value == '') {
                callback(new Error('不能为空和带空格！'));
            }else if(!regx.test(value)){
                callback(new Error('只能输入中文字符'));
            }else{
               callback()
           }
        };
        const validatePass = (rule, value, callback) => {
            const reg = /^[^ ]+$/;
            if(!reg.test(value)) {
                callback(new Error('不能为空和带空格！'));
            }else{
                callback()
            }
        };

        const validateNack = (rule, value, callback) => {
            const reg = /[a-zA-Z][a-zA-Z0-9_]{0,19}$/;
            if(!reg.test(value)) {
                callback(new Error('企业简称由英文数字下划线组合,且由字母开头,不超过20位字符'));
            }else{
                callback();
            }
        };
        const phone = (rule, value, callback) => {
            const reg = /^[^ ]+$/;
            const phone = /^1[0-9]{10}$/;
            if(!reg.test(value)) {
                callback(new Error('不能为空和带空格！'));
            }else if(!phone.test(value)){
                callback(new Error('手机格式错误！'));
            }else{
                callback();
            }
        };
        return {
            objectType:'customer',
            kind:'image',
            objectId: '',
            onlyLd:'',
            buttonSize:'default',
            buttonType:'default',
            buttonStyle:{
                'margin-right':'0'
            },
            // businessUrl: [{ 'name': '', 'url': '' }],
            businessUrlUrl:"",
            formValidate:{
                name:"",
                bussinessShortName:"",
                connect:"",
                phone:"",
                businessfileName:"",
            },
            ruleValidate:{
                name: [
                    { required: true,validator: validateName , trigger: 'blur' }
                ],
                bussinessShortName: [
                    { required: true,validator: validateNack , trigger: 'blur' }
                ],
                connect: [
                    { required: true, validator: validatePass , trigger: 'blur' }
                ],
                phone: [
                    { required: true, validator: phone , trigger: 'blur' }
                ],
            },
            headers:{}
        }
    },
    computed: {
        uploadImg: function () {
            return api.fileAttachmentUploadUrl(); //sysAttachment.uploadFileUrl();
        },
    },
    mounted() {
        this.headers = {
            token: localStorage.getItem('token'),
            tenant: localStorage.getItem('tenant')	
        }
    },

    methods: {
        ...mapMutations(['updateLoadingStatus']),
        nameBlur(val){
            let params ={
                businessName:val
            }
            sysConfig
            .findBusinShortName(params)
            .then(valid.call(this))
            .then((res) => {
                if(res.ok){
                   this.formValidate.bussinessShortName = res.data.data
                }
            })
        },
        hasUploadFile(fileObj) {
            this.formValidate.businessfileName = fileObj.fileName;
            this.businessUrlUrl = fileObj.filePath
        },
        FormatError(file) {
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: file.name + '文件格式不正确, 请选择JPG、PNG'
            });
        },
        progressUpload(event, file, fileList) {
            this.updateLoadingStatus({ isLoading: true })
        },
        HandleSuccess: function (data) {
            this.updateLoadingStatus({ isLoading: false })
            this.$Message.success('上传成功');
            if (data.data.bizType == 'businesslicenseinfo') {
                // this.idChange4 = true;
                this.businessUrl = [];
                this.businessUrl.push({ "name": data.data.filename, "url": data.data.url });
                this.formValidate.businessfileName = data.data.filename;
            }
        },
        getForm() {
            this.updateLoadingStatus({ isLoading: true });
            let params ={
                configId:'base:businesslicenseinfo'
            }
            sysConfig
            .form(params)
            .then(valid.call(this))
            .then((res) => {
                if(res.ok){
                    if(res.data.data){
                        // console.log(res.data.data)
                        this.onlyLd = res.data.data.id
                        let data = JSON.parse(res.data.data.value)
                        this.formValidate.name = data.businessName
                        this.nameBlur(this.formValidate.name)
                        this.formValidate.bussinessShortName = data.bussinessShortName ? data.bussinessShortName : this.formValidate.bussinessShortName
                        this.formValidate.businessfileName = data.businessLicensePicName
                        this.businessUrlUrl = data.businessLicensePicUrl
                        let key={
                            a:false, // 联系人
                            b:false,// 电话
                            c:false,//企业名称
                        }
                        if(data.name){// 联系人
                            this.formValidate.connect = data.name
                        }else {
                            key.a = true
                        }
                        if(data.phone){// 电话
                            this.formValidate.phone = data.phone
                        }else {
                            key.b = true
                        }
                        if(data.businessName){//企业名称
                            this.formValidate.name = data.businessName
                        }else {
                            key.c = true
                        }
                        if(key.a || key.b|| key.c){
                            this.getFormByGetByDomain(key)
                        }
                    }
                }
            })
            .catch(errors.call(this)).finally(() => {
                this.updateLoadingStatus({ isLoading: false });
            });
        },
        getFormByGetByDomain(key) {
            let params ={
                tenantCode:this.headers.tenant
            }
            api
            .getByTenantCode(params)
            .then(valid.call(this))
            .then((res) => {
                if(res.ok){
                    if(res.data.data){
                        let data = res.data.data
                        if(key.a){
                            this.formValidate.connect = data.duty// 联系人
                        }
                        if(key.b){
                            this.formValidate.phone = data.mobile
                        }
                        if(key.c){
                            this.formValidate.name = data.name//企业名称
                            this.nameBlur(this.formValidate.name)
                        }
                    }
                }
            })
            .catch(errors.call(this))
        },
        save(){
            this.$refs['formValidate'].validate((v) => {
                if (v) {
                    this.saveNext()
                }
            })
        },
        saveNext(){
            this.updateLoadingStatus({ isLoading: true });
            let params ={
                "valueObject": {
                    "businessName": this.formValidate.name,
                    bussinessShortName:this.formValidate.bussinessShortName,
                    "name": this.formValidate.connect,
                    "phone": this.formValidate.phone,
                    businessLicensePicName:this.formValidate.businessfileName,
                    "businessLicensePicUrl": this.businessUrlUrl
                },
                "menuId": "0",
                "configId": "base:businesslicenseinfo",
                "remarks": "营业执照"
            }
            if(this.onlyLd){
                params.id = this.onlyLd
            }
            sysConfig
            .save(params)
            .then(valid.call(this))
            .then((res) => {
                if(res.ok){
                    this.$emit('add',0)

                    // console.log(res)
                }
            })
            .catch(errors.call(this)).finally(() => {
                this.updateLoadingStatus({ isLoading: false });
            });
        },
    },
}
</script>
