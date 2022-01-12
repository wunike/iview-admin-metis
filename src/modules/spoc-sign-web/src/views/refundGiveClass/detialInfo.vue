<style lang="less">
    .detial-info-box{
        width:960px;
        /*background: #fffff1;*/
        .dib-item{
            display:flex;
            flex-direction: row;
            justify-content: flex-start;
            padding-bottom:12px;
            width:940px;
            >span{
                display: inline-block;
                width:90px;
                font-size: 14px;
                font-weight: normal;
                color: rgba(153, 153, 153, 1);
            }
            b{
                font-style: normal;
            }
            em{
                font-style: normal;
            }
            .tab-title{
                width:860px;
                display: flex;
                flex-direction: row;
                padding-top:12.5px;
                padding-bottom:12.5px;
                background: #FAFAFA;
                border:1px solid #E8E8E8;
                padding-left:10px;
                font-size: 12px;
                b{
                    display: inline-block;
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
            .tab-title-new{
                width:860px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                padding-top:10px;
                padding-bottom:10px;
                background: #FAFAFA;
                border:1px solid #E8E8E8;
                padding-left:10px;
                padding-right:20px;
            }

            .tab-body{
                width:860px;
                font-size: 12px;
                .tab-body-t{
                    width:860px;
                    display: flex;
                    flex-direction: row;
                    background: #FAFAFA;
                    border:1px solid #E8E8E8;
                    padding-top:15.5px;
                    padding-bottom:15.5px;
                    padding-left:10px;
                    border-top:0;
                    b{
                        display: inline-block;
                        width:16.67% ;
                        color:rgba(73, 80, 96, 1);
                        font-weight:600;
                    }
                }
                .tab-body-b{
                    width:860px;
                    display: flex;
                    flex-direction: row;
                    border:1px solid #E8E8E8;
                    border-top:0;
                    padding-top:10.5px;
                    padding-bottom:10.5px;
                    padding-left:10px;
                    em{
                        width:16.67% ;
                        display: inline-block;
                        font-weight:400;
                        color:rgba(73,80,96,1);
                    }
                }
            }
            .di-reason{
                width:860px;
            }
        }
    }
</style>
<template>
    <div class="detial-info-box">
        <div class="lizhi" v-if="showKey=='contract present'">
            <div class="dib-item">
            <span>{{$t('portal_app_Centres')}}</span>
                <div>{{listData.officeName}}</div>
            </div>
            <div class="dib-item">
                <span>{{$t('modules_spoc_jw_web_src_views_approval_jwapprovaldetial_2265')}}</span>
                <div>{{listData.studentName}}</div>
            </div>
            <div class="dib-item" v-if="disabledGroup === '0'">
                <span>{{$t('modules_spoc_sign_web_src_views_refundgiveclass_detialinfo_7119')}}</span>
                <div>
                    <div class="tab-title" v-if="listData">
                        <b><a @click="turnCt(listData.htContractInfoVO.ctId, listData.htContractInfoVO.ctNo)" :title="listData.htContractInfoVO.name">{{listData.htContractInfoVO.name}}</a></b>
                        <b style="width:34%">{{$t('modules_spoc_sign_web_src_modules_preview_4895')}}<em>{{listData.htContractInfoVO.ctNo}}</em></b>
                        <b style="width:22%">{{$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_5003')}}<em>{{listData.htContractInfoVO.sellerName}}</em></b>
                        <b style="width:22%">{{$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6879')}}<em>{{listData.htContractInfoVO.signTime}}</em></b>
                    </div>
                    <div class="tab-body">
                        <div class="tab-body-t">
                            <b>{{$t('modules_spoc_jw_web_src_views_chargingmanage_chargingmanagelist_2335')}}</b>
                            <b>{{$t('modules_spoc_sign_web_src_views_coursevalidityadjustment_components_choosecourse_6064')}}</b>
                            <b>{{$t('modules_spoc_jw_web_src_views_1v1_student_2218')}}</b>
                            <b>{{$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2134')}}</b>
                            <b>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_5010')}}</b>
                            <b>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_5011')}}</b>
                            <b>{{$t('modules_spoc_sign_web_src_views_contractgeneration_component_vitemcard_5472')}}</b>
                            <b>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_5014')}}</b>
                            <b>{{$t('mycourse_mycourse_374')}}</b>
                        </div>
                        <div class="tab-body-b" v-for="(item,idx) in listData.htContractInfoVO.courseInfoVOList" :key="idx">
                            <em>{{item.courseName == null?'-':item.courseName }}</em>
                            <em>{{item.courseHourNum == null?'-':item.courseHourNum }}</em>
                            <em>{{item.costNum == null?'-':item.costNum }}</em>
                            <em>{{item.leftCourseHour == null?'-':item.leftCourseHour }}</em>
                            <em>{{item.coursePrice == null?'-':item.coursePrice }}</em>
                            <em>{{item.publicUnitPrice == null?'-':item.publicUnitPrice }}</em>
                            <em>{{item.courseUnitPrice == null?'-':item.courseUnitPrice }}</em>
                            <em>{{item.teacherName == null?'-':item.teacherName }}</em>
                            <em>{{item.classTeacherName == null?'-':item.classTeacherName }}</em>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dib-item" v-if="disabledGroup === '1'">
                <span>{{$t('modules_spoc_sign_web_src_views_refundgiveclass_detialinfo_7132')}}</span>
                <div>
                    <div class="tab-title">
                        <b><a :title="listData.htContractInfoVO.name" @click="turnCt(listData.htContractInfoVO.ctId, listData.htContractInfoVO.ctId)">{{listData.htContractInfoVO.name}}</a></b>
                        <b style="width:34%">{{$t('modules_spoc_sign_web_src_modules_preview_4895')}}<em>{{listData.htContractInfoVO.ctNo}}</em></b>
                        <b style="width:22%">{{$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_5003')}}<em>{{listData.htContractInfoVO.sellerName}}</em></b>
                        <b style="width:22%">{{$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6879')}}<em>{{listData.htContractInfoVO.signTime}}</em></b>
                    </div>
                    <div class="tab-body" style="display: none">
                        <div class="tab-body-t">
                            <b>{{$t('modules_spoc_jw_web_src_views_chargingmanage_chargingmanagelist_2335')}}</b>
                            <b>{{$t('modules_spoc_sign_web_src_views_coursevalidityadjustment_components_choosecourse_6064')}}</b>
                            <b>{{$t('modules_spoc_jw_web_src_views_1v1_student_2218')}}</b>
                            <b>{{$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2134')}}</b>
                            <b>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_5010')}}</b>
                            <b>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_5011')}}</b>
                            <b>{{$t('modules_spoc_sign_web_src_views_contractgeneration_component_vitemcard_5472')}}</b>
                            <b>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_5014')}}</b>
                            <b>{{$t('mycourse_mycourse_374')}}</b>
                        </div>
                        <div class="tab-body-b" v-for="(item,idx) in listData.htContractInfoVO.courseInfoVOList" :key="idx">
                            <em>{{item.courseName == null?'-':item.courseName }}</em>
                            <em>{{item.courseHourNum == null?'-':item.courseHourNum }}</em>
                            <em>{{item.costNum == null?'-':item.costNum }}</em>
                            <em>{{item.leftCourseHour == null?'-':item.leftCourseHour }}</em>
                            <em>{{item.coursePrice == null?'-':item.coursePrice }}</em>
                            <em>{{item.publicUnitPrice == null?'-':item.publicUnitPrice }}</em>
                            <em>{{item.courseUnitPrice == null?'-':item.courseUnitPrice }}</em>
                            <em>{{item.teacherName == null?'-':item.teacherName }}</em>
                            <em>{{item.classTeacherName == null?'-':item.classTeacherName }}</em>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dib-item" v-if="disabledGroup === '0'">
                <span>{{$t('modules_spoc_sign_web_src_views_refundgiveclass_detialinfo_7119')}}</span>
                <div><b>{{listData.num}}</b>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_604')}}</div>
            </div>
            <div class="dib-item" v-if="disabledGroup === '1'">
                <span>{{$t('modules_spoc_sign_web_src_views_refundgiveclass_detialinfo_7134')}}</span>
                <div class="tab-title-new" v-if="listData.htCourseVO">
                    <h4 style="display: inline-block">{{listData.htCourseVO.courseName}}</h4>
                    <b>{{$t('modules_spoc_sign_web_src_views_refundgiveclass_detialinfo_7135', [listData.htCourseVO.price,listData.htCourseVO.num,listData.htCourseVO.totalPrice])}}</b>
                    <b><em>{{listData.htCourseVO.courseName}}</em></b>
                    <b><em>{{listData.htCourseVO.courseTypeName}}</em></b>
                </div>
            </div>
            <div class="dib-item">
                <span>{{$t('modules_spoc_jw_web_src_views_approval_jwapprovaldetial_2267')}}</span>
                <div class="di-reason">{{listData.remarks}}</div>
            </div>
        </div>
        <!-- ------------------------yang---------------------------------- -->
        <div class="yang" v-if="showKey=='contract leave'||showKey=='contract valid'">
            <!-- <div class="dib-item"> -->
              <div class="dib-item" v-if="showKey=='contract leave'">
                <span>{{$t('portal_app_Centres')}}</span>
                <div>{{listData.htLeaveApply?listData.htLeaveApply.officeName:''}}</div>
            </div>
            <div class="dib-item" v-else>
                <span>{{$t('portal_app_Centres')}}</span>
                <div>{{listData.officeName}}</div>
            </div>
              <div class="dib-item" v-if="showKey=='contract leave'">
                <span>{{$t('modules_spoc_jw_web_src_views_approval_jwapprovaldetial_2265')}}</span>
                <div>{{listData.htLeaveApply?listData.htLeaveApply.studentName:''}}</div>
            </div>
            <div class="dib-item" v-else>
                <span>{{$t('modules_spoc_jw_web_src_views_approval_jwapprovaldetial_2265')}}</span>
                <div>{{listData.studentName}}</div>
            </div>
            <div class="dib-item">
                <span>{{$t('modules_spoc_jw_web_src_views_signindetail_index_3163')}}</span>
                <div>
                    <div class="tab-title">
                        <b><a :title="listData.htContractInfoVO.name" @click="turnCt(listData.htContractInfoVO.ctId, listData.htContractInfoVO.ctNo)">{{listData.htContractInfoVO.name}}</a></b>
                        <b style="width:34%">{{$t('modules_spoc_sign_web_src_modules_preview_4895')}}<em>{{listData.htContractInfoVO.ctNo}}</em></b>
                        <b style="width:22%">{{$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_5003')}}<em>{{listData.htContractInfoVO.sellerName}}</em></b>
                        <b style="width:22%">{{$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6879')}}<em>{{listData.htContractInfoVO.signTime}}</em></b>
                    </div>
                   <div class="tab-body">
                        <div class="tab-body-t">
                            <b>{{$t('modules_spoc_jw_web_src_views_chargingmanage_chargingmanagelist_2335')}}</b>
                            <b>{{$t('modules_spoc_sign_web_src_views_coursevalidityadjustment_components_choosecourse_6064')}}</b>
                            <b>{{$t('modules_spoc_jw_web_src_views_1v1_student_2218')}}</b>
                            <b>{{$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2134')}}</b>
                            <b>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_5010')}}</b>
                            <b>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_5011')}}</b>
                            <b>{{$t('modules_spoc_sign_web_src_views_contractgeneration_component_vitemcard_5472')}}</b>
                            <b>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_5014')}}</b>
                            <b>{{$t('mycourse_mycourse_374')}}</b>
                        </div>
                        <div class="tab-body-b" v-for="(item,idx) in listData.htContractInfoVO.courseInfoVOList" :key="idx">
                            <em>{{item.courseName == null?'-':item.courseName }}</em>
                            <em>{{item.courseHourNum == null?'-':item.courseHourNum }}</em>
                            <em>{{item.costNum == null?'-':item.costNum }}</em>
                            <em>{{item.leftCourseHour == null?'-':item.leftCourseHour }}</em>
                            <em>{{item.coursePrice == null?'-':item.coursePrice }}</em>
                            <em>{{item.publicUnitPrice == null?'-':item.publicUnitPrice }}</em>
                            <em>{{item.courseUnitPrice == null?'-':item.courseUnitPrice }}</em>
                            <em>{{item.teacherName == null?'-':item.teacherName }}</em>
                            <em>{{item.classTeacherName == null?'-':item.classTeacherName }}</em>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dib-item" v-if="showKey=='contract valid'">
                <span>{{yxqType == '1' ? $t('modules_spoc_sign_web_src_views_refundgiveclass_detialinfo_7138') : $t('modules_spoc_sign_web_src_views_refundgiveclass_detialinfo_71381')}}</span>
                <div class="di-reason">{{listData?listData.newEndDate:''}}</div>
            </div>
            <div class="dib-item" v-if="showKey=='contract valid'">
                <span>{{yxqType == '1' ? $t('modules_spoc_sign_web_src_views_refundgiveclass_detialinfo_7139') : $t('modules_spoc_sign_web_src_views_refundgiveclass_detialinfo_71391')}}</span>
                <div class="di-reason">{{listData?listData.num:'' }} {{$t('message_socket_304')}}</div>
            </div>
            <div class="dib-item" v-if="showKey=='contract leave'">
                <span>{{$t('modules_spoc_sign_web_src_views_refundgiveclass_detialinfo_7141')}}</span>
                <div class="di-reason">{{listData.htLeaveApply?listData.htLeaveApply.num:''}}{{$t('modules_spoc_jw_web_src_views_servicescharts_serviceschartspart5_3102')}}</div>
            </div>
            <div class="dib-item" v-if="showKey=='contract leave'">
                <span>{{$t('modules_spoc_jw_web_src_views_approval_jwapprovaldetial_2267')}}</span>
                <div class="di-reason">{{listData.htLeaveApply?listData.htLeaveApply.remarks:''}}</div>
            </div>
            <div class="dib-item" v-else>
                <span>{{$t('modules_spoc_jw_web_src_views_approval_jwapprovaldetial_2267')}}</span>
                <div class="di-reason">{{listData.remarks}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            showKey:{
              type: String,
              required: true
            },
            yxqType:{
              type: String // 1有效期终止  0有效期延期
            },
            listData:{
                type:Object,
                required: true,
                default:() => {
                    return {}
                }
            },
            disabledGroup:{
                type:String,
                required: true,
                default:'0'
            }
        },
        methods: {
            turnCt(id, ctNo) {
                this.$router.push({
                    name:'sign.pactDetails',
                    query:{
                        id:id,
                        ctNo: ctNo
                    }
                })
            },
        },
    }
</script>

