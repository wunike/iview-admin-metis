<style lang="less">
    .add-approval{
        .ivu-modal-footer .ivu-btn-text{
            border:1px solid rgb(220, 222, 226);
        }
        .ivu-modal-footer .ivu-btn-text:hover{
            border:1px solid rgb(220, 222, 226);
        }
        .ivu-modal-header{
            padding:17px 24px 16px!important;
            background: #F7F8FA;
            border-radius:4px;
            .ivu-modal-header-inner{
                font-size:18px;
                font-weight:500;
                color:rgba(0,0,0,0.85);
            }
        }
        .ivu-radio-wrapper{
            font-size: 14px;
        }
        .ivu-input,.ivu-select-placeholder,.ivu-tag-text,.ivu-select-item{
            font-size:14px!important;
        }
    }   .ivu-select-selection{
            overflow: hidden;
        }
    .add-approval-box2{
        .my-company{
            .ivu-select-selection{
                height:62px;
            }
        }
        .ivu-form-item{
            margin-bottom:0;
        }
        .ivu-form-item-label,.ivu-select-selected-value{
            font-size: 14px!important;
        }
        .ivu-checkbox-wrapper{
            margin-right:0;
            font-size: 12px;
            margin-left:10px;
            margin-top:10px;
        }
        .form-item1{
            width:100%;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: flex-start;
            margin-bottom: 20px;
        }
    }
    .add-approval-box{
        width:100%;
        .ivu-table-header{
            th{
                height:50px;
            }
        }
        .aab-bottom{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: stretch;
        }
        .aa-left{
            width:345px;
        }
        .aa-right{
            width:564px;
            .ap-h2{
                width:100%;
            }
            h2{
                font-size:14px;
                font-weight:500;
                color:rgba(73,80,96,1);
                height:52px;
            }
            .ap-box{
                padding:18px 0 0 18px;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: flex-start;
                align-items: flex-start;
                .ap-item{
                    display: block;
                    height: 40px;
                    font-weight: normal;
                    margin-right:8px;
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    align-items: center;
                    margin-bottom:20px;
                    font-size: 14px;
                }
                .box-info{
                    padding:10px;
                    background: #6CB4EE;
                    border-radius: 8px;
                    margin-right:12px;
                    position: relative;
                    i{
                        color:#fff;
                        background: none;
                        font-style: normal;
                        padding-left:24px;
                        padding-right:24px;
                    }
                    img{
                        position: absolute;
                        top:-8px;
                        cursor: pointer;
                    }
                    .edit{
                        right:15px;
                    }
                    .del{
                        right:-5px;
                    }
                }
                .box-info2{
                    .box-info;
                    background: none;
                    border:2px solid #999;
                    padding-top:8px;
                    padding-bottom:8px;
                    i{
                        font-size: 14px;
                        color:#999;
                        padding-left:4px;
                        padding-right:4px;
                    }
                }
                em{
                    font-style: normal;
                    display: inline-block;
                    width: 40px;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    color:#fff;
                    border-radius: 50px;
                }
            }
        }
    }
    .high-setting{
        .ivu-modal-header{
            padding:17px 24px 16px!important;
            background: #F7F8FA;
            border-radius:4px;
            .ivu-modal-header-inner{
                font-size:18px;
                font-weight:500;
                color:rgba(0,0,0,0.85);
            }
        }
        .ivu-radio-wrapper,.ivu-input{
            font-size: 14px;
        }

        .high-setting-com{
            width:100%;
            .hsc-header{
                background: #F6F7FA;
                padding:20px!important;
                margin-bottom:30px;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: flex-start;
                flex-wrap: wrap;
                width:100%;
                .info-line-item{
                    font-size: 14px;
                    width: 50%;
                    padding-bottom: 18px;
                    span{
                        color:#999;
                    }
                    b{
                        font-weight: normal;
                        color:#495060;
                    }
                }
            }
            .form-line{
                width:100%;
                height:32px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                margin:16px 0;
                .form-line-is{
                    height:1px ;
                    background: #D9D9D9;
                }
                .is1{
                    width:24px;
                }
                .is2{
                    width:410px;
                }
                .form-line-txt{
                    display: block;
                    width:90px;
                    font-size:14px;
                    color:#495060;
                    text-align: center;
                }
            }
            .hsc-line-item{
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: flex-start;
                /*padding-bottom:20px;*/
                /*margin-left:40px;*/
                &:nth-last-of-type(1){
                    padding-bottom:0px;
                }
                .ivu-select-selection{
                    height:32px;
                }
                .ivu-checkbox-wrapper{
                    margin-right:0;
                    font-size: 12px;
                    margin-left:0px;
                    margin-top:5px;
                }
                >span{
                    font-size:14px;
                    font-weight:normal;
                    color:#999999;
                    display: inline-block;
                    width:75px;
                    margin-top:4px;
                    text-align: right;
                    margin-right:10px;
                }
            }
            .tips{
                height:20px;
                line-height: 20px;
                padding-left:120px;
            }
            .edit-title{
                height:32px;
                width:100%;
                line-height: 32px;
                background: #F7F8FA;
                border:1px solid #DCDEE3;
                border-radius: 4px 4px 0 0;
                span{
                    margin-left:20px;
                    font-size:12px;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                }
            }
            .edit-body{
                border-left:1px solid #DCDEE3;
                border-right:1px solid #DCDEE3;
                border-bottom:1px solid #DCDEE3;
                padding-left:16px;
                padding-top:20px;
                padding-bottom:20px;
                margin-bottom:15px;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                flex-wrap: wrap;
                .eb-item{
                    width:23%;
                    margin-bottom:14px;
                }

            }

        }
    }
</style>

<template>
    <div>
        <Modal
            class="add-approval"
            width="600"
            v-model="showModel2"
            :title="titleName1"
            :mask-closable="false"
            @on-cancel="asyncCancel2">
            <div class="add-approval-box2">
                <Form ref="form" :model="form"  :rules="formRule" :label-width="100">
                    <FormItem :label="$t('views_approvalnotice_approvalset_addapproval_261')"
                              prop="model"
                              style="margin-bottom:20px;"
                              :rules="{required: true, message: $t('pushsettings_index_507'), trigger: 'change'}">
                        <Select v-model="form.model"   style="width:452px;" @on-change="selModel">
                            <Option v-for="item in modelList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem v-if="form.model" :label="$t('views_approvalnotice_approvalset_addapproval_263')"
                              prop="name"
                              style="margin-bottom:20px;"
                              :rules="{required: true, message: $t('pushsettings_index_507'), trigger: 'change'}">
                        <Select v-model="form.name" clearable  style="width:452px;" >
                            <Option v-for="item in nameList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem :label="$t('scoretemplate_compontents_scoremodify_533')"
                              prop="company"
                              class="my-company"
                              style="margin-bottom:20px;"
                              :rules="{required: true, type:'array', message: $t('pushsettings_index_507'), trigger: 'change'}">
                        <Select v-model="form.company"  multiple style="width:396px;" @on-change="changeCompany">
                            <Option v-for="item in companyList" :value="item.id" :key="item.id">{{ item.code }}{{ item.name }}</Option>
                        </Select>
                        <Checkbox v-model="selAll" @on-change="selAllFn">{{$t('modules_rolepeople_212')}}</Checkbox>

                    </FormItem>
                    <FormItem :label="$t('views_approvalnotice_approvalset_addapproval_266')">
                        <Input v-model="remarks" type="textarea" :rows="3" style="width:452px;" :placeholder="$t('scoretemplate_compontents_scoremodify_528')" />
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button @click="asyncCancel2">{{$t('classroom_allscore_53')}}</Button>
                <Button type="primary" @click="asyncOK2">{{buttonName1}}</Button>
            </div>
        </Modal>
        <Modal
            class="add-approval"
            width="1000"
            v-model="showModel"
            :title="titleName"
            :mask-closable="false"
            @on-cancel="asyncCancel">
            <div class="add-approval-box">
                <div class="aab-bottom">
                    <div class="aa-left">
                        <Input v-model="search"  :placeholder="$t('views_approvalnotice_approvalset_addapproval_269')" style="width: 270px;margin-right:10px;margin-bottom:20px" />
                        <Button style="width: 65px;margin-bottom:20px" type="primary" @click="getNewList">{{$t('modules_rolepeople_210')}}</Button>
                        <Table  :columns="cols"
                               height="394"
                               style="width:100%;"
                               :data="dataSub"></Table>
                    </div>
                    <div class="aa-right">
                        <div class="ap-h2">
                            <h2>{{$t('views_approvalnotice_approvalset_addapproval_271')}}</h2>
                        </div>
                        <div class="ap-box">
                            <div class="ap-item"><em style="background: #F7BC62;margin-right:12px;">{{$t('views_approvalnotice_approvalset_addapproval_272')}}</em><img src="../../../assets/images/2right.png"></div>

                            <div v-if="sketchMap.length < 1 " class="ap-item">
                                <div class="box-info2">
                                    <i>{{$t('views_approvalnotice_approvalset_addapproval_273')}}</i>
                                </div>
                                <img src="../../../assets/images/2right.png">
                            </div>
                            <div v-else  class="ap-item" v-for="(item,index) in sketchMap" :key="index">
                                <div @mouseover="item.show = true" @mouseleave="item.show = false"  class="box-info">
                                    <i>{{item.name}} - {{item.officeTypeName}} </i>
                                    <!-- flowType && item.show -->
                                    <img class="edit" v-if="item.show" @click="editItem(item)" src="../../../assets/images/edit.png" >
                                    <img class="del" v-if="item.show" @click="delItem(item)" src="../../../assets/images/close.png" >
                                </div>
                                <img src="../../../assets/images/2right.png">
                            </div>
                            <div class="ap-item"><em style="background: #58BE97">{{$t('classlist_classlist_13')}}</em></div>
                        </div>
                    </div>
                </div>
            </div>
            <div slot="footer">
                <Button @click="asyncCancel">{{$t('classroom_allscore_53')}}</Button>
                <Button type="primary" @click="submitFn">{{$t('classroom_allscore_54')}}</Button>
            </div>
        </Modal>
        <Modal
                class="high-setting"
                width="600"
                v-model="highSetting"
                :title="$t('views_approvalnotice_approvalset_addapproval_295')"
                :mask-closable="false"
                @on-cancel="highCancel">
            <div class="high-setting-com">
                <div class="hsc-header">
                    <div class="info-line-item">
                        <span>{{$t('views_approvalnotice_approvalset_addapproval_296')}}</span><b>{{nodeNo}}</b>
                    </div>
                    <div class="info-line-item" >
                        <span>{{$t('views_approvalnotice_approvalset_addapproval_297')}}</span><b>{{nodeName}}</b>
                    </div>
                    <div class="info-line-item" style="padding-bottom: 0">
                        <span>{{$t('views_approvalnotice_approvalset_addapproval_298')}}</span><b>{{roleName}}</b>
                    </div>
                    <div class="info-line-item" style="padding-bottom: 0">
                        <span>{{$t('views_approvalnotice_approvalset_addapproval_299')}}</span><b>{{nodeLevel}}</b>
                    </div>
                </div>
                <div class="hsc-line-item" style="margin-bottom:20px;">
                    <span>{{$t('views_approvalnotice_approvalset_addapproval_300')}}</span>
                    <Input v-model="detailUrl"
                           style="width: 500px;"
                            :placeholder="$t('views_approvalnotice_approvalset_addapproval_304')"
                            />
                </div>
                <div class="hsc-line-item">
                    <span>{{$t('views_approvalnotice_approvalset_addapproval_308')}}</span>
                    <Input v-model="physicalPath"
                           @on-change="physicalPathFn"
                           @on-enter="enterFn"
                           style="width: 500px;"
                           :placeholder="$t('views_approvalnotice_approvalset_addapproval_309')"  />
                </div>
                <div class="tips">
                    <span v-if="placeSwitch" style="color:#bbb">{{$t('views_approvalnotice_approvalset_addapproval_309')}}</span>
                    <span v-if="errorLock" style="color:#f5222d">{{$t('views_approvalnotice_approvalset_addapproval_311')}}</span></div>
<!--                可编辑字段-->
                <div class="edit-title">
                    <span>{{$t('views_approvalnotice_approvalset_addapproval_312')}}</span>
                </div>
                <div class="edit-body">
                    <div v-if="!editSwitch&& editCode.length < 1 "
                         style="
                         width:100%;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                           ">
                        <img src="../../../assets/images/no-data.png" style='width:150px;height:auto;'>
                        <span>{{$t('modules_spoc_core_web_src_views_approvalnotice_approvalset_addapproval_120')}}</span>
                    </div>
                    <CheckboxGroup v-else v-model="editCode" style="width:95%;" @on-change="getCheckboxGroup">
                        <Checkbox :label="item.name" class="eb-item" v-for="(item,index) in editCodeArr" :key="index">
                        </Checkbox>
                    </CheckboxGroup>
                </div>
<!--                前置条件-->
<!--                <div class="hsc-line-item" :style="{marginBottom: !rearCondition&&!frontCondition ? '':'20px'}">-->
<!--                    <span>{{$t('views_approvalnotice_approvalset_addapproval_310')}}</span>-->
<!--                    <Checkbox v-model="frontCondition" style="margin-right:80px;">{{$t('views_approvalnotice_approvalset_addapproval_301')}}</Checkbox>-->
<!--                    <Checkbox v-model="rearCondition">{{$t('views_approvalnotice_approvalset_addapproval_307')}}</Checkbox>-->
<!--                </div>-->
                <div class="hsc-line-item" style="margin-bottom:20px;"  >
                    <span>{{$t('views_approvalnotice_approvalset_addapproval_301')}}：</span>
                    <Select v-model="beforInterceptCallbackList"  :placeholder="$t('views_approvalnotice_approvalset_addapproval_305')"
                            multiple style="width:415px;margin-right:8px;" @on-change="changeBicb">
                        <Option v-for="item in bicbList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                    <Checkbox v-model="selAllBefore" @on-change="selAllBeforeFn">{{$t('modules_rolepeople_212')}}</Checkbox>
                </div>
<!--                <div class="hsc-line-item" :style="{marginBottom: rearCondition? '20px':''}"  v-if="frontCondition">-->
<!--                    <span>{{$t('views_approvalnotice_approvalset_addapproval_303')}}</span>-->
<!--                    <Input v-model="beforInterceptJumpUrl" :placeholder="$t('views_approvalnotice_approvalset_addapproval_306')" style="width:642px;" />-->
<!--                </div>-->
<!--               后置条件 -->
                <div class="hsc-line-item" style="margin-bottom:0px;" >
                    <span>{{$t('views_approvalnotice_approvalset_addapproval_307')}}：</span>
                    <Select v-model="afterInterceptCallbackList"  :placeholder="$t('views_approvalnotice_approvalset_addapproval_305')"
                            multiple style="width:415px;margin-right:8px;" @on-change="changeAicb">
                        <Option v-for="item in aicbList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                    <Checkbox v-model="selAllAfter" @on-change="selAllAfterFn">{{$t('modules_rolepeople_212')}}</Checkbox>
                </div>
<!--                <div class="hsc-line-item"  v-if="rearCondition">-->
<!--                    <span>{{$t('views_approvalnotice_approvalset_addapproval_303_1')}}</span>-->
<!--                    <Input v-model="afterInterceptJumpUrl" :placeholder="$t('views_approvalnotice_approvalset_addapproval_306')" style="width:642px;" />-->
<!--                </div>-->
            </div>
            <div slot="footer">
                <Button @click="highCancel">{{$t('classroom_allscore_53')}}</Button>
                <Button type="primary" @click="highSubmit">{{$t('classroom_allscore_54')}}</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import valid, {
        errors,
        sysDict,
		comAuditFlow
    } from '../../../libs/request';
    import {sysRole,sysUser,common} from '@public/libs/request'
    import {mapMutations} from 'vuex';
    export default {
        props: {},
        data() {
            return {
                selectItem:null,//高级操作编辑存储数据变量
                highSetting:false,//高级设置
                nodeNo:"",
                nodeName:"",
                roleName:"",
                nodeLevel:"",
                detailUrl:'',
                physicalPath:'',
                editCode:[],//编辑字段
                placeSwitch:false,
                errorLock:false,
                editSwitch:false,
                editCodeArr:[],
                beforInterceptCallbackList:[],
                afterInterceptCallbackList:[],
                selAllBefore:false,
                selAllAfter:false,
                bicbList:[],
                aicbList:[],
                flowType:false,//业务类型 是否为转中心
                form:{
                    model:'',
                    name:'',
                    company:[],
                },
                selAll:false,//全选
                isAdd: '',//默认是添加,设置,修改
                id:'',//修改是传入的id
                ifSysUser:false,//默认不是系统管理员
                selectedBox:[],//选中角色的ID集合
                oldSelectBox:[],//选中角色的ID集合修改前的
                titleName1:'',
                buttonName1:'',
                titleName:'',
                officeNames:'',
                sketchMap:[],
                pageNo:1,
                pageCounts: 20, //总数
                pageSize: 10,
                showModel:false,
                showModel2:false,
                modelList:[
                    {
                        id:'5001',
                        name:this.$t('views_approvalnotice_approvalset_addapproval_276')
                    },{
                        id:'4001',
                        name:this.$t('views_approvalnotice_approvalset_addapproval_277')
                    }
                ],
                nameList:[],
                nl1:[],
                nl2:[],
                companyList:[],
                cols:[
                    {
                        key:'name',
                        title:this.$t('modules_rolemanage_152'),
                    },
                    {
                        key:'officeType',
                        title:this.$t('views_approvalnotice_approvalset_addapproval_280'),
                        render: (h,params) => {
                            return h('Select',{
                                props:{
                                    transfer:true,
                                    value:  params.row.officeType
                                },
                                on:{
                                    'on-change': (key) => {
                                        params.row.officeType = key
                                        this.options.forEach(function(item){
                                            if(key == item.value){
                                                params.row.officeTypeName = item.label
                                            }
                                        })
                                    }
                                }
                            },
                                this.options.map(function(obj){
                                    return h('Option', {
                                        props: {
                                            value: obj.value
                                        }
                                    }, obj.label);
                                }),
                            )
                        }
                    },
                    {
                        width:100,
                        title:this.$t('classlist_compontents_detailinfo_45'),
                        render:(h,params) => {
                            return('div',[
                                h('i-button',{
                                    on:{
                                        click:() => {
                                            // console.log(this.sketchMap)
                                            let len = this.sketchMap.length
                                            let obj = {...params.row}
                                            obj.setting = {
                                                "detailUrl": "",
                                                "beforInterceptCallbackList": [],
                                                "afterInterceptCallbackList": []
                                            }
                                            // obj.type = ''
                                            obj.idx = len
                                            this.sketchMap.push(obj)
                                            // console.log(this.sketchMap)
                                        }
                                    }
                                },this.$t('classroom_allscore_52'))
                            ])
                        }
                    },
                ],
                options:[],
                data:[],
                dataSub:[],
                search:'',
                isEnable:'1',
                params:{},
                remarks:'',
                officeArr:[],
                sketchs:[],
                flowDescriptions:[],
                formRule:{},
                ifTurnEnable:false,
                turnSys:'1'
            }
        },
        components: {
        },
        computed:{

        },
        mounted() {
            this.getSeniorAuditOption()
            this.getUserRight()
            this.getLists()
            this.getSuitCompass()
            this.getApprovalName()
            this.getOptions()
        },
        methods: {
            ...mapMutations(['updateLoadingStatus']),
            getCheckboxGroup(arr) {
                console.log(arr)
            },
            enterFn() {
                if(this.physicalPath){
                    this.placeSwitch = false
                    this.errorLock = false
                    this.editSwitch = true
                    this.editCodeArr = [
                        {name:this.$t('modules_spoc_core_web_src_views_approvalnotice_approvalset_addapproval_121')},
                        {name:this.$t('modules_spoc_core_web_src_views_approvalnotice_approvalset_addapproval_122')},
                        {name:this.$t('modules_spoc_core_web_src_views_approvalnotice_approvalset_addapproval_123')},
                        {name:this.$t('modules_spoc_core_web_src_views_approvalnotice_approvalset_addapproval_124')},
                        {name:this.$t('modules_spoc_core_web_src_views_approvalnotice_approvalset_addapproval_125')},
                    ]
                }

                // this.errorLock = true
            },
            physicalPathFn() {
                this.errorLock = false
                this.editSwitch = false
                if(this.physicalPath.length > 0) {
                    this.placeSwitch = true
                }else{
                    this.placeSwitch = false
                }
            },
            getSeniorAuditOption() {
                comAuditFlow.getSeniorAuditOption()
                .then(valid.call(this)).then((res)=>{
                    if(res.ok){
                        console.log(res)
                        this.bicbList = res.data.data
                        this.aicbList = res.data.data
                    }
                }).catch(errors.call(this))
            },
            delItem(item){
                //删除
                for(let i in this.sketchMap){
                    if(this.sketchMap[i].idx === item.idx){
                        this.sketchMap.splice(i,1)
                    }
                }
                for(let i in this.data){
                    if(this.data[i].idx === item.idx){
                        this.$set(this.data[i], 'select', false)
                    }
                }
                for(let i in this.sketchMap){
                    this.sketchMap[i].idx = i
                }
            },
            editItem(item) {
                //编辑
                // console.log(this.sketchMap)
                this.showModel = false
                this.sketchMap.forEach((im,index) => {
                    if(item.idx == im.idx){
                        this.highSetting = true
                        console.log(im)
                        this.nodeNo = parseInt(im.idx) +1
                        this.nodeName = this.$t('modules_spoc_core_web_src_views_approvalnotice_approvalset_addapproval_126')
                        this.roleName = im.name
                        this.nodeLevel = im.officeTypeName
                        this.selectItem = im.idx
                        this.detailUrl = im.setting.detailUrl
                        this.beforInterceptCallbackList = im.setting.beforInterceptCallbackList
                        this.afterInterceptCallbackList = im.setting.afterInterceptCallbackList
                    }
                })
            },
            getOptions(){
                let params = 'sys_office_type'
                sysDict.batchListData({params})
                .then(valid.call(this)).then((res)=>{
                    if(res.ok){
                        let sys_office_type = res.data.data.sys_office_type
                        this.options = []
                        for(let item in sys_office_type){
                            let obj = {}
                            let obj1 = sys_office_type[item]
                            obj.value = obj1.value
                            obj.label = obj1.label
                            this.options.push(obj)
                        }
                    }
                }).catch(errors.call(this))
            },
            selModel(val){
                if(val === '5001'){
                    this.nameList = [...this.nl1]
                }else{
                    this.nameList = [...this.nl2]
                }
            },
            changeCompany(arr){
                if(arr.length === this.companyList.length){
                    this.selAll = true
                }else{
                    this.selAll = false
                }
            },
            changeBicb(arr) {
                if(arr.length === this.bicbList.length){
                    this.selAllBefore = true
                }else{
                    this.selAllBefore = false
                }
            },
            changeAicb(arr) {
                if(arr.length === this.aicbList.length){
                    this.selAllAfter = true
                }else{
                    this.selAllAfter = false
                }
            },
            //全选
            selAllFn(){
                if(this.selAll){
                    let arr = []
                    let arr1 = this.companyList
                    for(let i in arr1){
                        arr.push(arr1[i].id)
                    }
                    this.form.company = arr
                }else{
                    this.form.company = []
                }
            },
            //高级弹窗 全选
            selAllBeforeFn() {
                //前置
                if(this.selAllBefore){
                    let arr = []
                    let arr1 = this.bicbList
                    for(let i in arr1){
                        arr.push(arr1[i].id)
                    }
                    this.beforInterceptCallbackList = arr
                }else{
                    this.beforInterceptCallbackList = []
                }
            },
            selAllAfterFn() {
                //后置
                if(this.selAllAfter){
                    let arr = []
                    let arr1 = this.aicbList
                    for(let i in arr1){
                        arr.push(arr1[i].id)
                    }
                    this.afterInterceptCallbackList = arr
                }else{
                    this.afterInterceptCallbackList = []
                }
            },

            //打开弹窗
            showPop(obj){
                console.log(obj)
                if(obj.row){
                    this.flowType = obj.row.name == '合同转中心' ? true : false//打开的时候是不是转中心
                    // this.flowType = obj.row.name == this.$t('modules_spoc_core_web_src_views_approvalnotice_approvalset_addapproval_127') ? true : false//打开的时候是不是转中心
                }
                if(obj.type === 're'){
                    this.titleName1 = this.$t('views_approvalnotice_approvalset_addapproval_281')
                    this.buttonName1 = this.$t('scoretemplate_scoretemplate_561')
                    this.showModel2 = true
                    this.isAdd = false
                    this.getForm(obj.row.id)
                    this.ifTurnEnable = true
                    this.turnSys = obj.row.isSys
                }else if(obj.type === 'set'){
                    this.titleName = this.$t('views_approvalnotice_approvalset_addapproval_283')
                    this.showModel= true
                    this.isAdd = false
                    this.getForm(obj.row.id)
                    this.ifTurnEnable = true
                    this.turnSys = obj.row.isSys
                }else{
                    this.$refs['form'].resetFields();
                    this.titleName1 = this.$t('views_approvalnotice_approvalset_addapproval_284')
                    this.buttonName1 = this.$t('teachpush_teachpush_658')
                    this.showModel2 = true
                    this.isAdd = true
                }
            },
            changeEnableFn(row,isEnable){
                this.ifTurnEnable = true
                this.turnSys = row.isSys
                this.getForm(row.id, true,isEnable)
            },
            //修改设置审批流
            getForm(id, isAsyncOK,isEnables){
                this.updateLoadingStatus({isLoading: true});
                this.selectedBox = []
                this.$refs['form'].resetFields();
                let params = { id:id };
                this.id = id
                common.form(params)
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            let form = res.data.data
                            if(form.menuId === '5001'){
                                this.nameList = [...this.nl1]
                            }else{
                                this.nameList = [...this.nl2]
                            }
                            this.id = form.id
                            this.remarks = form.remarks
                            this.isEnable = form.isEnable
                            this.form.model = form.menuId
                            this.officeNames = form.officeNames
                            this.form.company = form.officeIds != null ?form.officeIds.replace(/^\s*/g,'').substring(1,form.officeIds.length-1).split(',') :[]
                            this.selAll = this.form.company.length === this.companyList.length ? true : false
                            this.flowDescriptions = form.flowDescriptions
                            for(let i in this.nameList){
                                if(this.nameList[i].label === form.name){
                                    this.form.name = this.nameList[i].value
                                }
                            }
                            this.flowType = this.form.name == 'contract translate' ? true : false//打开的时候是不是转中心
                            let obj = JSON.parse(form.flowJson)
                            this.selectedBox = []
                            this.sketchMap = []
                            for(let i in obj){
                                this.selectedBox.push(obj[i].roleId)
                                let o = {
                                    show:false,
                                    name:obj[i].nodeName,
                                    id : obj[i].roleId,
                                    select:true,
                                    officeType:obj[i].officeType,
                                    officeTypeName:obj[i].officeTypeName,
                                    setting:null,
                                    idx :i
                                }
                                if(obj[i].setting){
                                    o.setting = {
                                        "detailUrl": obj[i].setting.detailUrl,
                                        "beforInterceptCallbackList": obj[i].setting.beforInterceptCallbackList,
                                        "afterInterceptCallbackList": obj[i].setting.afterInterceptCallbackList
                                    }
                                }
                                this.sketchMap.push(o)
                            }
                            this.oldSelectBox = [...this.selectedBox]
                            for(let i in this.data){
                                if(this.selectedBox.includes(this.data[i].id)){
                                    this.$set(this.data[i], 'select', true)
                                    for(let j in obj){
                                        if(this.data[i].id === obj[j].roleId){
                                            this.$set(this.data[i], 'officeType', obj[j].officeType)
                                            this.$set(this.data[i], 'officeTypeName',obj[j].officeTypeName)
                                        }
                                    }
                                }else{
                                    this.$set(this.data[i], 'select', false)
                                }
                            }
                            if(isAsyncOK){
                                this.isEnable = isEnables === '0' ? '1' : '0'
                                this.asyncOK()
                            }
                        }
                    })
                    .catch(errors.call(this))
                .finally(()=>{
                    this.updateLoadingStatus({isLoading:false});
                });
            },
            getApprovalName(){
                let types = 'com_audit_flow_type'
                sysDict.batchListData({types}).then(valid.call(this)).then((res)=>{
                    if(res.ok){
                        let ht_com_audit_type = res.data.data.com_audit_flow_type
                        this.nameList = []
                        for(let item in ht_com_audit_type){
                            let obj = {}
                            let obj1 = ht_com_audit_type[item]
                            obj.value = obj1.value
                            obj.label = obj1.label
                            if(obj1.menuId ==='5001'){
                                this.nl1.push(obj)
                            }else{
                                this.nl2.push(obj)
                            }
                        }
                    }
                }).catch(errors.call(this))
            },
            getSuitCompass(){
                common.getAuditOffices()
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            this.companyList = res.data.data
                        }
                    })
                    .catch(errors.call(this))
            },

            getLists(){
                let params ={}
                params.pageNo=this.pageNo
                params.pageSize=this.pageSize
                sysRole.roleList(params)
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            let list = res.data.data.roleList
                            let listObj = []
                            for(let item in list){
                                let obj = {}
                                let listItem = list[item]
                                obj.id = listItem.id
                                obj.name = listItem.name
                                obj.officeType = '1'
                                obj.officeTypeName = this.$t('views_approvalnotice_approvalset_addapproval_286')

                                if(this.selectedBox.includes(listItem.id)){
                                    obj.select = true//判断选中
                                }else{
                                    obj.select = false//判断选中
                                }
                                obj.show = false//判断选中
                                listObj.push(obj)
                            }
                            this.data = listObj.concat()
                            this.dataSub = listObj
                        }
                    })
                    .catch(errors.call(this))
            },
            getNewList(){
                var reg = new RegExp(this.search);
                var arr = [];
                for (var i = 0; i < this.data.length; i++) {
                    if (reg.test(this.data[i].name)) {
                        if(this.selectedBox.includes(this.data[i].id)){
                            this.data[i].select = true//判断选中
                        }else{
                            this.data[i].select = false//判断选中
                        }
                        arr.push(this.data[i]);
                    }
                }
                this.dataSub = arr
            },
            getUserRight(){//判断登录用户类型
                sysUser.userInfoData()
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            this.ifSysUser = res.data.data.admin ? true : false
                        }
                    })
                    .catch(errors.call(this))
            },
            submitFn(){
                if(this.sketchMap.length > 0){
                    this.asyncOK()
                }else{
                    this.$Message.warning({
                        top: 50,
                        duration: 3,
                        content:this.$t('views_approvalnotice_approvalset_addapproval_287')
                    })
                }
            },
            highCancel() {
                this.highSetting = false
                this.nodeNo = ''
                this.nodeName = ''
                this.roleName = ''
                this.nodeLevel = ''
                this.detailUrl = ''
                this.beforInterceptCallbackList = []
                this.afterInterceptCallbackList = []
                this.selAllAfter = false
                this.selAllBefore = false
                this.placeSwitch = false
                this.errorLock = false
                this.showModel = true
            },
            highSubmit() {
                // console.log(this.beforInterceptCallbackList)
                //高级修改 提交
                // return
                this.sketchMap.forEach((im,index) => {
                    if(this.selectItem == im.idx){
                        // this.highSetting = true
                        // console.log(im)
                        // this.nodeNo = parseInt(im.idx) +1
                        // this.nodeName = '转中心审批'
                        // this.roleName = im.name
                        // this.nodeLevel = im.officeTypeName
                        im.setting.detailUrl = this.detailUrl
                        im.setting.beforInterceptCallbackList = this.beforInterceptCallbackList
                        im.setting.afterInterceptCallbackList = this.afterInterceptCallbackList
                        this.highSetting = false
                        this.placeSwitch = false
                        this.errorLock = false
                        this.$Message.success(this.$t('modules_spoc_core_web_src_views_approvalnotice_approvalset_addapproval_128'))
                        this.showModel = true
                    }
                })

            },
            asyncOK(){
                this.officeArr = []
                if(this.form.company.length){
                    for(let i in this.companyList){
                        if(this.form.company.includes(this.companyList[i].id)){
                            this.officeArr.push(this.companyList[i].name)
                        }
                    }
                }
                this.sketchs = []
                this.params.flowLevel = this.sketchMap.length//
                this.flowDescriptions = []
                for(let i in this.nameList){
                    if(this.nameList[i].value === this.form.name){
                        this.params.name = this.nameList[i].label
                        this.params.type = this.nameList[i].value
                    }
                }
                //contract translate 转中心
                // console.log(this.params.type)
                let isHigh = this.params.type == 'contract translate' ? true : false
                if(this.sketchMap.length){
                    let Obj = this.sketchMap
                    let len = Obj.length-1
                    for(let i in Obj){
                        this.flowDescriptions.push(Obj[i].name+'-'+ Obj[i].officeTypeName)
                        let obj={
                            "nodeName":Obj[i].name,
                            "nodeOrder":0,
                            "maxNode":this.params.flowLevel,
                            "nextNode":0,
                            "roleId":Obj[i].id,
                            "roleName":Obj[i].name,
                            "isFirst":"0",
                            "isEnd":"0",
                            "officeType":Obj[i].officeType,
                            "officeTypeName":Obj[i].officeTypeName,
                            setting: isHigh ? Obj[i].setting : null
                        }
                        if(len === 0){
                                obj["nodeOrder"]=1
                                obj["nextNode"]=2
                                obj["isFirst"]=1
                                obj["isEnd"]=1
                        }else{
                            if(i < 1){
                                obj["nodeOrder"]=1
                                obj["nextNode"]=2
                                obj["isFirst"]=1
                                obj["isEnd"]=0
                            }else if(i == len){
                                obj["nodeOrder"]=parseInt(i)+1
                                obj["nextNode"]=''
                                obj["isFirst"]=0
                                obj["isEnd"]=1
                            }else{
                                obj["nodeOrder"]=parseInt(i)+1
                                obj["nextNode"]=parseInt(i)+2
                                obj["isFirst"]=0
                                obj["isEnd"]=0
                            }
                        }
                        this.sketchs.push(obj)
                    }
                }
                this.params.flowDescription = this.flowDescriptions.length ? this.flowDescriptions.join('——>') : ''
                this.params.flowJsonObject = this.sketchs
                this.params.id = this.isAdd ? '' : this.id
                if(this.companyList.length === 1){
                    this.params.isAllOffice = '0'
                }else{
                    this.params.isAllOffice = this.form.company.length < 1? ''  : this.form.company.length === this.companyList.length ? '1' :'0'
                }
                if(this.officeNames == this.officeArr.join('/')){
//                this.params.officeNames = this.officeArr.join('/')
                    this.params.officeNames = this.officeNames
                }else{
                    this.params.officeNames = this.params.isAllOffice === '1' ? this.$t('views_approvalnotice_approvalset_addapproval_288') :
                        this.params.isAllOffice === '0'? this.officeArr.join('/') : ''
                }
                this.params.isEnable = this.isEnable//
                if(this.ifTurnEnable){
                    this.params.isSys = this.turnSys
                }else{
                    this.params.isSys = this.ifSysUser === false ? '0' : '1' //是否是系统流程
                }
                if(this.isAdd){
                    this.params.isSys = this.ifSysUser = 0
                }
                this.params.menuId = this.form.model

                this.params.officeIds = this.form.company.length>0 ?','+this.form.company.join(',')+',' : ''//
                this.params.remarks = this.remarks
                console.log(this.params)
                common.save(this.params)
                    .then(valid.call(this))
                    .then(res => {
                        if(res.ok){
                            this.$Message.success(this.$t('views_approvalnotice_approvalset_addapproval_289'))
                            this.showModel = false
                            this.showModel2 = false
                            this.$emit('refreshList')
                            this.reset()
                            this.oldSelectBox = []
                            this.ifTurnEnable = false
                            this.officeNames = ''
                            this.search = ''
                            this.getNewList()
                            this.flowType = false
                        }
                    })
                    .catch(errors.call(this))
                    .finally(()=>{
                    })
            },
            asyncOKReapt(){
                //第一次做校验
                this.officeArr = []
                if(this.form.company.length){
                    for(let i in this.companyList){
                        if(this.form.company.includes(this.companyList[i].id)){
                            this.officeArr.push(this.companyList[i].name)
                        }
                    }
                }
                this.sketchs = []
                this.params.flowLevel = this.sketchMap.length//
                this.flowDescriptions = []
                for(let i in this.nameList){
                    if(this.nameList[i].value === this.form.name){
                        this.params.name = this.nameList[i].label
                        this.params.type = this.nameList[i].value
                    }
                }
                let isHigh = this.params.type == 'contract translate' ? true : false
                if(this.sketchMap.length){
                    let Obj = this.sketchMap
                    let len = Obj.length-1
                    for(let i in Obj){
                        this.flowDescriptions.push(Obj[i].name+'-'+ Obj[i].officeTypeName)
                        let obj={
                            "nodeName":Obj[i].name,
                            "nodeOrder":0,
                            "maxNode":this.params.flowLevel,
                            "nextNode":0,
                            "roleId":Obj[i].id,
                            "roleName":Obj[i].name,
                            "isFirst":"0",
                            "isEnd":"0",
                            "officeType":Obj[i].officeType,
                            "officeTypeName":Obj[i].officeTypeName,
                            setting: isHigh ? Obj[i].setting : null
                        }
                        if(len === 0){
                            obj["nodeOrder"]=1
                            obj["nextNode"]=2
                            obj["isFirst"]=1
                            obj["isEnd"]=1
                        }else{
                            if(i < 1){
                                obj["nodeOrder"]=1
                                obj["nextNode"]=2
                                obj["isFirst"]=1
                                obj["isEnd"]=0
                            }else if(i == len){
                                obj["nodeOrder"]=parseInt(i)+1
                                obj["nextNode"]=''
                                obj["isFirst"]=0
                                obj["isEnd"]=1
                            }else{
                                obj["nodeOrder"]=parseInt(i)+1
                                obj["nextNode"]=parseInt(i)+2
                                obj["isFirst"]=0
                                obj["isEnd"]=0
                            }
                        }
                        this.sketchs.push(obj)
                    }
                }
                this.params.flowDescription = this.flowDescriptions.length ? this.flowDescriptions.join('——>') : ''
                this.params.flowJsonObject = this.sketchs
                this.params.id = this.isAdd ? '' : this.id
                if(this.companyList.length === 1){
                    this.params.isAllOffice = '0'
                }else{
                    this.params.isAllOffice = this.form.company.length < 1? ''  : this.form.company.length === this.companyList.length ? '1' :'0'
                }
                if(this.officeNames == this.officeArr.join('/')){
//                this.params.officeNames = this.officeArr.join('/')
                    this.params.officeNames = this.officeNames
                }else{
                    this.params.officeNames =  this.params.isAllOffice === '1' ? this.$t('views_approvalnotice_approvalset_addapproval_288') :
                        this.params.isAllOffice === '0'? this.officeArr.join('/') : ''
                }
                this.params.isEnable = this.isEnable//
                if(this.ifTurnEnable){
                    this.params.isSys = this.turnSys
                }else{
                    this.params.isSys = this.ifSysUser === false ? '0' : '1' //是否是系统流程
                }
                if(this.isAdd){
                    this.params.isSys = this.ifSysUser = 0
                }
                this.params.menuId = this.form.model
                this.params.officeIds = this.form.company.length>0 ?','+this.form.company.join(',')+',' : ''//
                this.params.remarks = this.remarks
                common.ifCanSave(this.params)
                .then(valid.call(this))
                .then(res => {
                    if(res.ok){
                        this.titleName = this.$t('views_approvalnotice_approvalset_addapproval_290')
                        this.showModel2= false
                        this.showModel= true
                    }
                })
                .catch(errors.call(this))
                .finally(()=>{
                })
            },

            asyncOK2(){
                this.flowType = this.form.name == 'contract translate' ? true : false//打开的时候是不是转中心
                if(this.isAdd){ //添加审批
                    this.$refs['form'].validate((valid) => {
                        if (valid) {
                            this.asyncOKReapt()
                        } else {
                            this.$Message.error(this.$t('views_approvalnotice_approvalset_addapproval_291'));
                        }
                    })
                }else{ //修改审批
                    this.$refs['form'].validate((valid) => {
                        if (valid) {
                            //校验
                            this.asyncOK()

                        } else {
                            this.$Message.error(this.$t('views_approvalnotice_approvalset_addapproval_291'));
                        }
                    })
                }
            },
            reset(){
                this.officeArr = []
                this.sketchs = []
                this.flowDescriptions = []
                this.selectedBox = []
                this.sketchMap = []
                this.id = ''
                this.form.company = []
                this.isEnable = ''
                this.form.model = ''
                this.remarks = ''
                this.form.name = ''
                for(let i in this.data){
                    this.$set(this.data[i], 'select', false)
                    this.$set(this.data[i], 'officeType', '1')
                    this.$set(this.data[i], 'officeTypeName', this.$t('views_approvalnotice_approvalset_addapproval_286'))
                }
            },
            asyncCancel(){
                if(this.oldSelectBox.toString() === this.selectedBox.toString()){
                    if(this.isAdd){
                        this.showModel = false
                        this.$Modal.confirm({
                            title: this.$t('views_approvalnotice_approvalset_addapproval_292'),
                            width:380,
                            onOk: () => {
                                this.showModel = false
                                this.$emit('refreshList')
                                this.reset()
                                this.oldSelectBox = []
                            },
                            onCancel: () => {
                                this.showModel = true
                            }
                        });
                    }else{
                        this.showModel = false
                        this.$emit('refreshList')
                        this.reset()
                    }
                }else{
                    this.showModel = false
                    this.$Modal.confirm({
                        title: this.$t('views_approvalnotice_approvalset_addapproval_292'),
                        width:380,
                        onOk: () => {
                            this.showModel = false
                            this.$emit('refreshList')
                            this.reset()
                            this.oldSelectBox = []
                        },
                        onCancel: () => {
                            this.showModel = true
                        }
                    });
                }
            },
            asyncCancel2(){
                this.showModel2 = false
                this.reset()
            },
        },
    }
</script>
