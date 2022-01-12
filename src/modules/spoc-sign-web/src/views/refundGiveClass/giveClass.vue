<style lang="less">
    .classShow{
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
    }
    .form-info{
        .ivu-form-item{
            margin-bottom:0;
        }
        .no-see{
            display: none;
        }
        .down {
            transition: all .3s;  transform-origin: center center;  transform: rotate(-180deg) ;
            font-size:15px;
        }
        .right{
            transition: all .3s;  transform-origin: center center;  transform: rotate(0deg) ;
            font-size:15px;
        }
        .flex-row{
            display: flex;
            flex-direction: row;
        }
        @comColor:#495060;
        .choose-contract-box{
            width:100%;
            margin-bottom:10px;
            &:nth-last-of-type(1){
                margin-bottom: 0;
            }
        }
        .ivu-form-item-label,
        .ivu-select-selected-value,
        .ivu-radio-group-item,
        .input-label,
        .ivu-select-input{
            font-style: normal;
            font-size: 14px!important;
        }
        .ivu-form-item-label{
            color:#999999!important;
        }
        .radio-table{
            /*在做皮肤的时候这里需要修改*/
            .ivu-checkbox {
                display: inline-block;
                margin-right: 4px;
                white-space: nowrap;
                position: relative;
                line-height: 1;
                vertical-align: middle;
                cursor: pointer
            }
            .ivu-checkbox-input {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                z-index: 1;
                opacity: 0;
                width: 13px!important;
                height: 13px!important;
                cursor: pointer
            }
            .ivu-checkbox-inner {
                display: inline-block;
                width: 14px!important;
                height: 14px!important;
                position: relative;
                top: 0;
                left: 0;
                background-color: #fff;
                border: 1px solid #dcdee2;
                border-radius: 50%;
                transition: all .2s ease-in-out
            }

            .ivu-checkbox-inner:after {
                position: absolute;
                width: 8px;
                height: 8px;
                left: 2px;
                top: 2px;
                border-radius: 50%;
                padding:0;
                margin:0;
                display: table;
                border-top: 0;
                border-left: 0;
                border:0;
                content: ' ';
                background-color: #44bcb7;
                opacity: 0;
                transition: all .2s ease-in-out;
                -ms-transform: scale(0);
                transform: scale(0)
            }
            .ivu-checkbox-checked:hover .ivu-checkbox-inner {
                border-color: #44bcb7;
            }
            .ivu-checkbox-checked .ivu-checkbox-inner {
                border-color: #44bcb7;
            }
            .ivu-checkbox-checked .ivu-checkbox-inner:after {
                opacity: 1;
                -ms-transform: scale(1);
                transform: scale(1);
                transition: all .2s ease-in-out
            }

        }
        .item-line{
            .flex-row;
            height:50px;
            justify-content: space-between;
            align-items: center;
            width:100%;
            padding:0  22px;
            background: #FAFAFA;
            font-size:12px;
            color:@comColor;
            border:1px solid #E8E8E8;

            div{
                .flex-row;
                justify-content: flex-start;
                align-items: center;
                span{

                }
                em{
                    color:#44BCB7;
                    font-size: 16px;
                }
            }
            // 合同名称多是...
            .refundNameHeight{
                  a{
                      display: inline-block;
                      overflow: hidden;
                      max-width: 200px;
                      min-width: 100px;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                  }
            }
        }
        .cmsb-list-box{
            position: absolute;
            top:33px;
            left:0;
            max-height:250px;
            width:400px;
            z-index: 2;
            background:rgba(255,255,255,1);
            box-shadow:0px 2px 4px 0px rgba(0,0,0,0.2);
            border-radius:4px;
            .cmsb-list{
                width:100%;
                max-height:250px;
                overflow-y: auto;
                .item{
                    height:54px;
                    width:100%;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-around;
                    align-items: center;
                    border-bottom: rgba(230,231,235,1) 1px solid ;
                    padding-left:10px;
                    padding-right:24px;
                    overflow: hidden;
                    .item-left{
                        width:350px;
                        height:54px;
                        font-size:12px;
                        color:rgba(153,153,153,1);
                        h2{
                            line-height:0px;
                            padding-top:18px;
                            font-size:12px;
                            font-family:PingFangSC;
                            font-weight:500;
                            color:rgba(73,80,96,1);
                        }
                        b{
                            font-size:12px;
                            font-family:PingFangSC;
                            font-weight:400;
                            color:rgba(153,153,153,1);
                        }
                        .item-left-bottom{
                            padding-top:3px;
                            span{
                                padding-right:12px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
<template>
    <Modal
            :mask-closable="false"
            v-model="classShowTipBoo"
            class-name="classShow"
            @on-cancel="handleReset"
            :title="$t('modules_spoc_sign_web_src_modules_tabledetails_4970')"
            width="800">
        <Form :model="formItem"
              @click.prevent.stop="showCMSB = false"
              class="form-info" ref="form" :rules="ruleInline" :label-width="100">
            <FormItem style="margin-bottom:20px;" :label="$t('portal_app_Centres')"
                      prop="areaSchool"
                      :rules="{required: true, message: $t('pushsettings_index_504'), trigger: 'change'}">
                <Select v-model="formItem.areaSchool" :disabled="ctNo"
                        :placeholder="$t('importPage_warning2')" style="width:400px" @on-change="getSchoolFn">
                    <Option
                            v-for="item in areaSchoolList"
                            :value="item.id"
                            :key="item.id"
                    >{{item.code}}{{ item.name }}</Option>
                </Select>
            </FormItem>
            <FormItem style="margin-bottom:20px;" :label="$t('modules_spoc_sign_web_src_views_refundgiveclass_giveclass_7147')"
                      prop="stuName"
                      :rules="{required: true, message: $t('pushsettings_index_504'), trigger: 'change'}">
                      <!-- @on-query-change="getQuery" -->
                <Select 
                        filterable
                        remote 
                        :disabled="ctNo"
                        @on-change="listContractsAndCoursesFn"
                        :loading="getStusLoading"
                        :remote-method="getStus"
                        v-model.trim="formItem.stuName"  
                        :placeholder="$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_4999')" style="width: 400px;">
                    <Option v-for="item in nameList" :value="item.id" :key="item.id" :label="item.name">{{item.name}}<span style="float:right;color:#ccc">{{item.phone}}</span>
                    </Option>
                </Select>
            </FormItem>
            <FormItem style="margin-bottom:20px;" :label="$t('modules_spoc_sign_web_src_views_refundgiveclass_giveclass_7149')"
                      prop="disabledGroup"
                      :rules="{required: true, message: $t('pushsettings_index_504'), trigger: 'change'}">
                <RadioGroup @on-change="chooseGiveClass" v-model="formItem.disabledGroup">
                    <Radio style="margin-right:80px;" label="1">{{$t('modules_spoc_sign_web_src_views_refundgiveclass_giveclass_7150')}}</Radio>
                    <Radio label="0">{{$t('modules_spoc_sign_web_src_modules_tabledetails_4970')}}</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem  v-if="formItem.disabledGroup == '0'" :label="$t('modules_spoc_sign_web_src_views_refundgiveclass_giveclass_7151')"
                      :rules="{required: true, message: $t('pushsettings_index_504'), trigger: 'change'}">
            </FormItem>
            <FormItem  v-else :label="$t('modules_spoc_sign_web_src_views_refundgiveclass_detialinfo_7132')"
                      :rules="{required: true, message: $t('pushsettings_index_504'), trigger: 'change'}">
            </FormItem>
            <div class="choose-contract-box" style="margin-bottom:20px;"  v-if="list.length < 1">
                <div class="item-line">
                    <div>
                        <b>--</b>
                    </div>
                    <div><span>{{$t('modules_spoc_sign_web_src_modules_preview_4895')}}</span><b>-</b></div>
                    <div><span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_5003')}}</span><b>-</b></div>
                    <div><span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_5004')}}</span><b>-</b></div>
                    <div>
                    </div>
                </div>
            </div>
            <RadioGroup v-else style="width: 100%;margin-bottom:20px;"  v-model="contract" @on-change="selectContract">
                <div class="choose-contract-box"  v-for='(item, index) in list' :key="index">
                    <div class="item-line" :style="!item.expand ? 'border-bottom:1px solid #E8E8E8' : 'border-bottom:none'">
                        <div  class="refundNameHeight">
                            <Radio v-if="formItem.disabledGroup == 0" :label="item.ctId" :value="item.ctId"><span class="no-see">{{item.ctId}}</span></Radio>
                            <b v-if="formItem.disabledGroup == 1" style="width:26px;display: inline-block"></b>
                            <a :title="item.name">{{item.name}}</a>
                            <!-- 
                                 &.refundNameHeight{
                  a{
                      display: inline-block;
                      overflow: hidden;
                      max-width: 200px;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                  }
            }
                             -->
                        </div>
                        <div style="width:39%;">
                            <span>{{$t('modules_spoc_sign_web_src_modules_preview_4895')}}</span>
                            <span v-if="item.show">{{item.ctNo}}</span>
                            <span v-else>{{item.ctNo.substr(0,4)+'***********'+item.ctNo.substr(-2,2)}}</span>
                            <span style="margin-left: 10px;" @click.stop="showHide(item)"><a>{{item.show?$t('modules_expandrow_14'):$t('courselist_compontents_servicecontent_219')}}</a></span>
                        </div>
                        <div style="width:18%;"><span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_5003')}}</span><b>{{item.signTime}}</b></div>
                        <div style="width:18%;"><span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_5004')}}</span><b>{{item.sellerName}}</b></div>
                        <div style="width:2%;">
                            <Icon @click.stop="openItem(item)" style="cursor: pointer" size="15" type="ios-arrow-down"
                                  :class="{'down':item.expand,'right':!item.expand}"/>
                        </div>
                    </div>
                    <Table
							border
                            v-if="item.expand"
                            :columns="columns0"
                            class="radio-table"
                            :data="item.courseInfoVOList">
                    </Table>
                </div>
            </RadioGroup>
            <FormItem style="margin-bottom:20px;" v-if="formItem.disabledGroup == '1'" :label="$t('modules_spoc_sign_web_src_views_refundgiveclass_detialinfo_7119')"
                      prop="courseHours"
                      :rules="{required: true, type:'number', message: $t('pushsettings_index_504'), trigger: 'blur'}">
                <InputNumber v-model="formItem.courseHours" style="width:80px"  :min="1"></InputNumber><em style="margin-left:8px;" class="input-label">{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_604')}}</em>
            </FormItem>
            <FormItem style="margin-bottom:20px;" v-else :label="$t('modules_spoc_sign_web_src_views_refundgiveclass_detialinfo_7134')"
                      prop="searVal"
                      :rules="{required: true, message: $t('pushsettings_index_504'), trigger: 'focus'}">
                <Input @on-keyup="getCourseByName(formItem.searVal)"
                       v-model="formItem.searVal"
                       :placeholder="$t('modules_spoc_sign_web_src_views_contractgeneration_component_vitemcard_5449')"
                       style="width: 400px">
                </Input>
                <div @mouseenter="showCMSB=true" class="cmsb-list-box" v-if="showCMSB">
                    <div class="cmsb-list">
                        <div class="item" v-for="(item,index) in subCourseList" :key="index">
                            <div class="item-left">
                                <h2>{{item.courseName}}</h2>
                                <div class="item-left-bottom">
                                    <span><b>{{item.price}}</b>{{$t('modules_spoc_sign_web_src_views_refundgiveclass_giveclass_7162')}}<b>{{item.num}}</b>{{$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_turncenter_5964')}}<b>{{item.totalPrice}}</b>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</span>
                                    <span>{{item.courseTypeName}}</span>
                                    <span>{{item.courseName}}</span>
                                </div>
                            </div>
                            <Button type="primary" @click.stop="selectCourseItem(item)">{{$t('spoc_hootie_web_282')}}</Button>
                        </div>
                    </div>
                </div>
            </FormItem>
            <FormItem :label="$t('modules_spoc_jw_web_src_views_approval_jwapprovaldetial_2267')"
                      prop="remarks"
                      :rules="{required: false, message: $t('pushsettings_index_504'), trigger: 'blur'}">
                <Input
                        v-model="formItem.remarks"
                        type="textarea"
                        :autosize="{minRows: 3,maxRows: 3}"
                        :placeholder="$t('modules_spoc_core_web_src_views_schoolmanagement_index_263')"
                />
            </FormItem>
        </Form>
        <div slot="footer" class="modiRoomTip" >
            <div>
                <Button @click="handleReset">{{$t('classroom_allscore_53')}}</Button>
                <Button type="primary" @click="handleSubmit" >{{$t('courselist_compontents_servicecontent_214')}}</Button>
            </div>
        </div>
    </Modal>
</template>
<script>
    import {mapMutations, mapState} from 'vuex';
    import { waitUntil } from '@public/libs/util';
    import valid, {
        errors,
        sysUser,
        common,
		comAuditFlow,
        htPresentApply,
        htContract
    } from "../../libs/request";
    export default {
        components: {},
        props: {},
        data() {
            return {
                isActioning: false, //多次提交拦截
                ctNo: false,
                ctStudnetId:'',
                ctStudnetName:'',
                ctOfficeId:'',
                getStusLoading: false,
                classShowTipBoo: false,
                ruleInline:{},
                columns0: [
                    {
                        title: " ",
                        align: "center",
                        minWidth: 30,
						resizable: true,
						width: null,
                        render: (h, params) => {
                            let that = this
                            return h('div',
                                {
                                  style:{
                                      display:this.formItem.disabledGroup == 1 ? 'block':'none'
                                  }
                                },
                                [h('Checkbox', {
                                    props: {
                                        value: params.row.select
                                    },
                                    on: {
                                        'on-change': (val) => {
                                            let list = that.list
                                            for(let i in list){
                                                let sub = list[i].courseInfoVOList
                                                for(let j in sub){
                                                    if(sub[j].courseId === params.row.courseId){
                                                        // console.log(params.row.courseId,val)
                                                        if(val){
                                                            this.typeHours.ctId = list[i].ctId
                                                            this.typeHours.obj = sub[j]
                                                        }else{
                                                            this.typeHours={}
                                                        }
                                                        // console.log(this.typeHours)
                                                        this.$set(sub[j], 'select', true)
                                                    }else{
                                                        this.$set(sub[j], 'select', false)
                                                    }
                                                }
                                            }

                                        }
                                    }
                                })
                            ])
                        }
                    },
                    {
                        title: this.$t('modules_spoc_jw_web_src_views_chargingmanage_chargingmanagelist_2335'),
                        key: "courseName",
						resizable: true,
						width: null,
                        render:(h,params)=>{
                            return h('span',{},
                                    params.row.courseName == null ? '-' :params.row.courseName
                            )
                        }
                    },
                    {
                        title: this.$t('modules_spoc_sign_web_src_views_coursevalidityadjustment_components_choosecourse_6064'),
                        key: "courseHourNum",
						resizable: true,
						width: null,
                        render:(h,params)=>{
                            return h('span',{},
                                    params.row.courseHourNum == null ? '-' :params.row.courseHourNum
                            )
                        }
                    },
                    {
                        title: this.$t('modules_spoc_jw_web_src_views_1v1_student_2218'),
                        key: "costNum",
						resizable: true,
						width: null,
                        render:(h,params)=>{
                            return h('span',{},
                                    params.row.costNum == null ? '-' :params.row.costNum
                            )
                        }
                    },
                    {
                        title: this.$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2134'),
                        key: "leftCourseHour",
						resizable: true,
						width: null,
                        render:(h,params)=>{
                            return h('span',{},
                                    params.row.leftCourseHour == null ? '-' :params.row.leftCourseHour
                            )
                        }
                    },
                    {
                        title: this.$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_5010'),
                        key: "coursePrice",
                        minWidth:15,
						resizable: true,
						width: null,
                        render:(h,params)=>{
                            return h('span',{
                                    style:{
                                        'word-break': 'nowrap'
                                    },
                                },
                                    params.row.coursePrice == null ? '-' : Number(params.row.coursePrice).toFixed(2)
                            )
                        }
                    },
                    {
                        title: this.$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_5011'),
                        key: "publicUnitPrice",
                        minWidth:15,
						resizable: true,
						width: null,
                        render:(h,params)=>{
                            return h('span',{
                                    style:{
                                        'word-break': 'nowrap'
                                    },
                                },
                                    params.row.publicUnitPrice == null ? '-' : Number(params.row.publicUnitPrice).toFixed(2)
                            )
                        }
                    },
                    {
                        title: this.$t('modules_spoc_sign_web_src_views_contractgeneration_component_vitemcard_5472'),
                        key: "courseUnitPrice",
                        minWidth:15,
						resizable: true,
						width: null,
                        render:(h,params)=>{
                            return h('span',{
                                    style:{
                                        'word-break': 'nowrap'
                                    },
                                },
                                    params.row.courseUnitPrice == null ? '-' : Number(params.row.courseUnitPrice).toFixed(2)
                            )
                        }
                    },
                    {
                        title: this.$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_5014'),
                        key: "teacherName",
						resizable: true,
						width: null,
                        render:(h,params)=>{
                            return h('span',{},
                                    params.row.teacherName == null ? '-' :params.row.teacherName
                            )
                        }
                    },
                    {
                        title: this.$t('mycourse_mycourse_374'),
                        key: "classTeacherName",
						resizable: true,
						width: null,
                        render:(h,params)=>{
                            return h('span',{},
                                    params.row.classTeacherName == null ? '-' :params.row.classTeacherName
                            )
                        }
                    },

                ],
                contract:'',
                list:[],
                formItem:{
                    stuName:'',
                    areaSchool:"",
                    disabledGroup: "1",
                    remarks:"",
                    courseHours:1,
                    searVal:'',
                },
                nameList:[],
                areaSchoolList:[],
                showCMSB:false,
                courseList:[],
                subCourseList:[],
                typeCourse:{},
                typeHours:{},
                getChangeStu: false,//防止接口重复加载
            };
        },
        computed:{
            ...mapState(["userInfo", "app"])
        },
        mounted() {
            this.blogCompassFn()
            this.init()
        },
        methods: {
            ...mapMutations(['updateLoadingStatus']),
            showHide(item1) {
                this.list.forEach((item,index) => {
                    if(item1.ctId == item.ctId){
                        this.$set(this.list[index], 'show', !this.list[index].show)
                    }
                })
            },
            init(){
                this.contract = ''
                this.typeCourse = {}
                this.typeHours = {}
                this.formItem.stuName = ''
                this.nameList = []
                this.list = []
                this.formItem.courseHours = 1
                this.formItem.remarks = ''
                this.formItem.disabledGroup = '1'
                this.formItem.searVal = ''
                this.subCourseList = this.courseList.concat()
				if(this.app.currOfficeId=='all'){
					this.$set(this.formItem, 'areaSchool', '')
				}else{
					this.$set(this.formItem, 'areaSchool', this.app.currOfficeId)
				}
            },
            selectCourseItem(item){
                this.formItem.searVal = item.courseName
                this.typeCourse.obj = item
                this.showCMSB = false
                // console.log(item)
            },
            getCourseByName(value){
                // console.log(value)
                this.showCMSB=true
                ///^[\u4e00-\u9fa5_a-zA-Z0-9]+$/
                // let reg = new RegExp(value,'u');
                // console.log(this.courseList)
                let arr = [];
                for (let i = 0; i < this.courseList.length; i++) {
                    if (this.courseList[i].courseName.indexOf(value) > -1) {
                        arr.push(this.courseList[i]);
                    }
                    // if (reg.test(this.courseList[i].courseName)) {
                    //     arr.push(this.courseList[i]);
                    // }
                }
                this.subCourseList = arr
                // console.log(this.subCourseList)
            },
            getcourseListFn(){
                let params={}
                params.officeId = this.formItem.areaSchool//归属校区
                htContract.listCourses(params)
                .then(valid.call(this))
                .then(res=>{
                    if(res.ok){
                        this.courseList = res.data.data.concat()
                        this.subCourseList = res.data.data
                        // console.log(this.subCourseList)
                    }
                })
                .then(errors.call(this))
            },
            handleSubmit() {
                this.$refs['form'].validate((validRes) => {
                    if (validRes) {
                        let isOk = false
                        // if(this.formItem.stuName){
                        //     isOk=true
                        // }else{
                        //     this.$Message.error("需要选择学生")
                        //     isOk=false
                        //     return
                        // }
                        if(this.formItem.disabledGroup == '1'){
                            if(this.typeHours.obj && this.typeHours.obj.courseId){
                                isOk=true
                            }else{
                                this.$Message.error(this.$t('modules_spoc_sign_web_src_views_refundgiveclass_giveclass_7179'))
                                isOk=false
                                return
                            }
                        }else{
                            if(this.formItem.searVal && this.typeCourse.obj.courseId && this.contract != ''){
                                isOk=true
                            }else{
                                this.$Message.error(this.$t('modules_spoc_sign_web_src_views_refundgiveclass_giveclass_7180'))
                                isOk=false
                                return
                            }
                        }
                        // if(this.formItem.remarks){
                        //     isOk=true
                        // }else{
                        //     this.$Message.error("请填写原因说明")
                        //     isOk=false
                        //     return
                        // }
                        // console.log(isOk)
                        if(isOk){
                            if(this.isActioning){ //多次提交拦截
                                return
                            }
                            this.isActioning = true
                            this.updateLoadingStatus({isLoading:true});
                            
                            let params={}
                            params.officeId = this.formItem.areaSchool//归属校区
                            params.remarks = this.formItem.remarks//原因说明
                            params.type = this.formItem.disabledGroup//赠送方式 : 0：赠送课程；1：赠送课时
                            // console.log(this.disabledGroup)
                            // console.log(this.typeCourse)
                            // console.log(this.typeHours)
                            if(this.formItem.disabledGroup == '0'){ //赠送课程 typeCourse
                                params.courseId = this.typeCourse.obj.courseId//课程编号
                                params.courseName = this.typeCourse.obj.courseName//课程名称
                                params.courseType = this.typeCourse.obj.courseType//课程类型
                                // params.stuCourId = this.typeCourse.obj.stuCourId //学生课程ID
                                params.ctId = this.typeCourse.ctId//合同id
                                params.num = this.typeCourse.obj.num//赠课课时
                            }else{
                                params.num = this.formItem.courseHours//赠课课时
                                params.courseId = this.typeHours.obj.courseId//课程编号
                                params.courseName = this.typeHours.obj.courseName//课程名称
                                params.courseType = this.typeHours.obj.courseType//课程类型
                                // params.courseType = this.typeHours.obj.courseType == null ? 'EE3' : this.typeHours.obj.courseType//课程类型
                                params.studentCourseId = this.typeHours.obj.stuCourId //学生课程ID
                                params.ctId = this.typeHours.ctId//合同id
                            }
                            params.studentId = this.formItem.stuName//学员编号
                            // console.log(params)
                            htPresentApply.save(params)
                            .then(valid.call(this))
                            .then(res=>{
                                if(res.ok){
                                    let objId = res.data.data
                                    // console.log(objId)
                                    // console.log(objId != '')
                                    if(objId != ''){
                                        // this.sendAudit(objId)
                                        this.$emit('ge-parent-list')
                                        this.classShowTipBoo = false
                                        this.$Message.success(this.$t('modules_spoc_sign_web_src_views_refundgiveclass_giveclass_7181'));
                                        this.$refs['form'].resetFields();
                                        this.init()
                                    }else{
                                        this.$Message.error(this.$t('modules_spoc_sign_web_src_views_refundgiveclass_giveclass_7182'))
                                    }
                                }
                            })
                            .then(errors.call(this)).finally(()=>{
                                this.updateLoadingStatus({isLoading:false});
                                setTimeout(()=>{
                                    //多次提交拦截
                                    this.isActioning = false
                                },200)
                            })
                        }
                    } else {
                        this.$Message.error(this.$t('modules_spoc_sign_web_src_views_refundgiveclass_giveclass_7183'));
                    }
                })
            },
            sendAudit (objectId) {
                //送审
                this.updateLoadingStatus({ isLoading: true })
                let params = {
                    auditType: 'contract present',
                    officeId: this.formItem.areaSchool,
                    objectId: objectId,
                    studentId: this.formItem.stuName,
                    objectNo: '',
                }
                // if(this.disabledGroup == '0'){ //赠送课程 typeCourse
                //     params.objectNo = this.typeCourse.ctId//合同id
                // }else{
                //     params.objectNo = this.typeHours.ctId//合同id
                // }
                comAuditFlow.sendAudit(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.$emit('ge-parent-list')
                        // console.log(res.data.data)
                        this.classShowTipBoo = false
                        this.init()
                        this.$Message.success(this.$t('modules_spoc_sign_web_src_views_refundgiveclass_giveclass_7181'));
                    } else {
                        this.$Message.error(res.data.message)
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({
                        isLoading: false
                    })
                })
            },
            getSchoolFn() {
                this.formItem.stuName = ''
                this.nameList = []
                this.list = []
                this.getcourseListFn()
            },
            getQuery(query) {
                if(query === '' && query != undefined){
                    this.formItem.stuName = ''
                    this.nameList = []
                    this.list = []
                }
            },
            getStus(query) {
                if(this.getChangeStu){
                    return
                }
                if(query != undefined && query != ''){
                    this.getStusLoading = true
                    let params={}
                    params.officeId = this.formItem.areaSchool
                    params.name = query
                    common.listByOfficeIdAndName(params)
                    .then(valid.call(this))
                    .then(res=>{
                        if(res.ok){
                            this.nameList = res.data.data
                        }
                    })
                    .then(errors.call(this)).finally(()=>{
                        this.getStusLoading = false
                    })
                }else{
                    this.nameList = []
                }
            },
            //获取合同和课程
            listContractsAndCoursesFn() {
                if(this.formItem.stuName != undefined){
                    this.getChangeStu = true
                    setTimeout(()=>{
                        this.getChangeStu = false
                    },1000)
                    let params={}
                    params.officeId = this.formItem.areaSchool
                    params.stuId = this.formItem.stuName
                    htContract.listContractsAndCourses(params)
                    .then(valid.call(this))
                    .then(res=>{
                        if(res.ok){
                            if(this.ctNo){
                                this.list = res.data.data.filter((item)=>{
                                    return item.ctNo == this.ctNo
                                })
                            } else {
                                this.list = res.data.data
                            }
                        }
                    })
                    .then(errors.call(this))
                }
            },
            selectContract(id) {
                this.typeCourse.ctId = id
            },
            blogCompassFn() {
                sysUser.dataScopeFilter()
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        if(res.data.data.length > 0){
                            this.areaSchoolList = res.data.data
                        }else{
                            this.areaSchoolList = []
                        }
                        waitUntil(()=>{
                            // console.log("this.app.currOfficeId ==" + this.app.currOfficeId)
                            return this.app.currOfficeId || false;
                        },()=>{
								if(this.app.currOfficeId=='all'){
									this.$set(this.formItem, 'areaSchool', '')
								}else{
									this.$set(this.formItem, 'areaSchool', this.app.currOfficeId)
								}
                                this.getcourseListFn()
                        });
                    }
                })
                .catch(errors.call(this))
                .finally(()=>{
                    this.updateLoadingStatus({isLoading:false});
                });
            },
            openItem(item) {
                this.list.forEach((item1,index) => {
                    if(item1.ctId == item.ctId){
                        this.$set(this.list[index], 'expand', !this.list[index].expand)
                    }else{
                        this.$set(this.list[index], 'expand', false)
                    }
                })
            },
            chooseGiveClass(key) {
                if(key == '0'){ //课程
                    this.contract = ''
                    this.formItem.searVal = ''
                    this.typeCourse = {}
                }else{ //课时
                    let list = this.list
                    for(let i in list){
                        let sub = list[i].courseInfoVOList
                        for(let j in sub){
                            this.$set(sub[j], 'select', false)
                        }
                    }
                    this.formItem.courseHours = 1
                    this.typeHours = {}
                }
                // console.log(this.formItem.disabledGroup)
            },
            giveclassShowMethod(ctNo,ctStudnetId,ctStudnetName,ctOfficeId){
                if(ctNo){
                    this.ctNo = ctNo
                    this.ctStudnetId = ctStudnetId
                    this.ctStudnetName = ctStudnetName
                    this.ctOfficeId = ctOfficeId
                    this.formItem.areaSchool = ctOfficeId
                    this.formItem.stuName = ctStudnetId
                    this.nameList = [{
                        id: ctStudnetId,
                        name: ctStudnetName,
                        phone: ''
                    }]
                    this.listContractsAndCoursesFn()
                } else {
                    this.ctNo = false
					if(this.app.currOfficeId=='all'){
						this.$set(this.formItem, 'areaSchool', '')
					}else{
						this.$set(this.formItem, 'areaSchool', this.app.currOfficeId)
					}
                    this.formItem.stuName = ''
                    this.nameList = []
                }
                this.classShowTipBoo=true;
            },
            handleReset() {
                this.classShowTipBoo = false;
                this.$refs['form'].resetFields();
                this.init()
            },
        },
        watch:{
            'app.currOfficeId': function(val,oldVal){
                if(oldVal && this.$route.name == "sign.refundGiveClass"){
					if(this.app.currOfficeId=='all'){
						this.$set(this.formItem, 'areaSchool', '')
                        this.$refs['form'].resetFields();
					}else{
						this.$set(this.formItem, 'areaSchool', this.app.currOfficeId)
                        this.getSchoolFn()
					}
                }
            }
        }
    };
</script>
