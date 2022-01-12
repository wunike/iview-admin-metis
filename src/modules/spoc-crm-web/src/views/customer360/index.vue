<style lang="less">
@mainColor: #44BCB7;
.danhang{
    overflow: hidden;text-overflow: ellipsis;white-space: nowrap;
}
.customer-360-container{
    position: relative;
    height: 100%;
    .bottom{
        position: absolute;top: 72px;left: 0;right: 0;bottom: 0;
        display: flex;
        flex-direction: row;
    }
    .left{
        position: relative;
        width: 260px;height: 100%;flex: 0 0 260px;
        margin-right: 16px;
        overflow-y: auto;
    }
    .right{
        position: relative;flex-direction: column;
        flex: auto;height: 100%;overflow-x: hidden;
    }
    .ivu-tabs-bar{
        margin-bottom: 0;
    }
    .tabs-wrapper{
        padding: 22px 16px 0;
        background: #fff;
    }
    .right-scroll{
        position: absolute;left: 0;right: 0;bottom: 0;top: 58px;
        overflow-y: auto;
    }
    .right-fixed{
        position: relative;
        width: 16px + 41px;height: 100%;
    }
    .task-btns{
        @width: 48px;
        position: absolute;left: 8px;
        top: 48px + 28px;
        // bottom: 50px;
        width: @width;
        li{
            position: relative;
            display: block;width: @width;height: @width;margin-bottom: 6px;border-radius:2px;
            text-align: center;background: #fff;
            cursor: pointer;
            &:hover{
                div{
                    opacity: 1;
                }
            }
            i{
                font-size: 19px;line-height: @width;
            }
            div{
                display: flex;align-items: center;
                opacity: 0;
                transition: opacity .5s;
                position: absolute;left: 0;right: 0;top: 0;bottom: 0;
                z-index: 2;
                background: rgba(0,0,0,.6);color: #fff;
            }
            span{
                flex: 1;
            }
        }
    }
    .task-block{
        @width: 48px;
        position: absolute;
        // bottom: 266px + 28px;
        top: 0;
        left: 8px;
        width: @width;height: @width;border-radius:2px;
        background: #fff;
        box-shadow:0px 2px 6px 0px rgba(0,0,0,0.15);
        font-size: 14px;text-align: center;
        .label{
            width: 34px;margin: 0 auto;padding-top: 6px;line-height: 18px;
            cursor: pointer;
        }
        i{
            margin-right: 4px;
            color: @mainColor;font-size: 16px;font-style: inherit;
        }
    }
    .task-lists{
        position: absolute;right: 60px;top: 0;z-index: 9;
        width: 328px;padding: 4px 0 12px;
        background: #fff;box-shadow:0px 4px 8px 0px rgba(0,0,0,0.15);
        text-align: left;
        &::after{
            content: '';
            border: 6px solid transparent;border-left-color: #fff;
            position: absolute;right: -12px;top: 20px;
        }
        .title{
            @h: 46px;
            padding: 0 12px;
            height: @h;line-height: @h;font-size: 14px;
            div{
                float: left;
                span{
                    font-size: 16px;margin: 0 4px;
                    color: @mainColor;
                }
            }
            & > span{
                float: right;color: @mainColor;cursor: pointer;
            }
        }
        .lists{
            max-height: 270px;overflow-y: auto;
            padding: 3px 12px 0;
            width: 100%;
            li{
                position: relative;
                padding-left: 92px;padding-top: 8px;
                height: 59px;margin-bottom: 18px;
                background: #fff;
                box-shadow:0px 0px 4px 0px rgba(0,0,0,0.15);
                border-radius:4px;
                cursor: pointer;
            }
        }
        .type{
            @h: 24px;
            position: absolute;left: 12px;top: 17px;
            width: 64px;height: @h;line-height: @h;
            color: #fff;text-align: center;font-size: 12px;
            border-radius: 4px;
            background: #F39945;
            &.type-color-1{background: #8272EC;}
            &.type-color-2{background: #F39945;}
            &.type-color-3{background: #01C1B2;}
        }
        .time{
            @h: 24px;
            height: @h;line-height: @h;
            .danhang;
            font-size: 14px;font-weight: bold;
            &.time-today{
                color: #E72B00;
            }
            span{
                @w: 16px;
                display: inline-block;
                width: @w;height: @w;line-height: @w;
                margin-left: 6px;
                background: #E72B00;
                color: #fff;font-size: 12px;text-align: center;
                border-radius: 4px;
            }
        }
        .detail{
            @h: 18px;
            height: @h;line-height: @h;.danhang;
            font-size: 12px;
            span{
                color: #999;
            }
        }
    }
    .ivu-tabs-nav-scrollable{
        padding: 0 32px;
    }
}
.modal-360{
    .ivu-modal-footer{
        display: none;
    }
    .content{
        position: relative;
        padding-left: 46px;
        i{
            position: absolute;left: 8px;top: 7px;
            font-size: 26px;color: #FAAD14;
        }
        h3{
            @h: 40px;
            height: @h;line-height: @h;
            font-size: 16px;
        }
        p{
            @h: 30px;
            height: @h;line-height: @h;
            font-size: 14px;
        }
        span{
            cursor: pointer;
            &:hover{
                color: @mainColor;
            }
        }
    }
    .footer{
        padding-top: 20px;
        text-align: right;
        button{
            margin-left: 8px;
        }
    }
}
.seePactModel{
    .ivu-modal-body{
        padding-top: 0;
    }
    .ivu-modal-body .ivu-form .ivu-form-item-label{
        font-size: 12px;
        padding-right: 0;
    }
    .ivu-modal-body .ivu-input{
        font-size: 12px;
    }
    .ivu-form-item{
        margin-bottom: 0;
    }
    .content{
        .pact_item{
            font-size: 12px;
            border-bottom: 1px #e7e7e7 solid;
            margin-top: 14px;
            .edit_box{
                display: flex;
                justify-content: flex-end;
                align-items: flex-start;
                color: #4dbfba;
            }
            .active_box{
                overflow: hidden;
                height: 24px;
                width: 100%;
                margin-bottom: 14px;
                .active_left{
                    float: left;
                }
                .active_right{
                    float: right;
                    margin-right: 12px;
                }
                button{
                    width: 52px;
                    height: 24px;
                    padding: 0;
                    line-height: 1;
                }
            }
            .ivu-row{
                margin-bottom: 14px;
                padding: 0 20px;
            }
        }
    }
}
</style>

<template>
<div class="customer-360-container">
    <customer-steps ref="customerSteps" :id="id"></customer-steps>
    <div class="bottom">
        <div class="left">
            <left-banner :isSimSign="isSimSign" :detailData="detailData" @showStudentAccont="showStudentAccont" @openPact="toPactNow" @seePactNow="seePactNow"></left-banner>
            <user-tag :detailData="detailData" :id="id"></user-tag>
            <member-iinformation :detailData="detailData" :id="id" @uploadTraceTotalNum="uploadTraceTotalNum"></member-iinformation>
        </div>
        <div class="right">
            <div class="tabs-wrapper">
                <Tabs :value="tabName" :animated="false" @on-click="TabPaneChange" v-if="myButtonPrem && myButtonPrem.length">
                    <TabPane label="客户动态" name="1" v-if="myButtonPrem.indexOf('traceTab') > -1"></TabPane>
                    <TabPane label="任务列表" name="2" v-if="myButtonPrem.indexOf('taskTab') > -1"></TabPane>
                    <TabPane label="学员课表" name="3" v-if="routeName == 'crm.customer360' && myButtonPrem.indexOf('studentScheduleTab') > -1"></TabPane>
                    <TabPane label="客户信息" name="4" v-if="routeName == 'crm.customer360' && myButtonPrem.indexOf('cusTab') > -1"></TabPane>
                    <TabPane label="学员信息" name="9" v-if="detailData.stuId && routeName == 'crm.customer360' && myButtonPrem.indexOf('studentTab') > -1"></TabPane>
                    <TabPane label="客户获取" name="5" v-if="myButtonPrem.indexOf('cusNabTab') > -1"></TabPane>
                    <TabPane label="课程教学" name="6" v-if="routeName == 'crm.customer360' && myButtonPrem.indexOf('courseTeachingTab') > -1"></TabPane>
                    <TabPane label="客户成长" name="7" v-if="myButtonPrem.indexOf('growUpTab') > -1 && routeName == 'crm.customer360'"></TabPane>
                    <TabPane label="其他信息" name="8" v-if="myButtonPrem.indexOf('otherTab') > -1 && routeName == 'crm.customer360'"></TabPane>
                    <TabPane label="合同信息" name="10" v-if="routeName == 'core.lessee360'"></TabPane>
                    <!--<TabPane label="系统使用统计" name="11"></TabPane>-->
                    <!--<TabPane label="租户信息" name="12"></TabPane>-->
                </Tabs>
            </div>
            <div class="right-scroll">
                <flow-up v-if="tabName == '1' && eventByState" :eventByState="eventByState" ref="flowUpRef" :id="id" :detailData="detailData" @upload-all="uploadAll" @reCustomerSteps="reCustomerSteps"></flow-up>
                <task-lists-temp v-else-if="tabName == '2'" ref="taskListsTempRef" :id="id"  @doSearch="doSearch" @showDetail="getTaskDetail" :studentId="detailData.stuId"></task-lists-temp>
                <school-timetable v-else-if="tabName == '3'" ref="schoolTimetableRef" :id="id"></school-timetable>
                <student-bref v-else-if="tabName == '4'" ref="studentBrefRef" style="background: #FFFFFF;" showLine="1" :id="id" :stuId="detailData.stuId" :isEdit="false" @uploadTags="uploadTags"></student-bref>
                <studentInfo v-else-if="tabName == '9'" ref="studentInfoRef" style="background: #FFFFFF;" :id="detailData.stuId" @uploadTags="uploadTags"></studentInfo>
                <student-source v-else-if="tabName == '5'" ref="studentSourceRef" :id="id"></student-source>
                <student-courses v-else-if="tabName == '6'" ref="studentCoursesRef" :id="id"></student-courses>
                <student-grow-up v-else-if="tabName == '7'" ref="studentGrowUpRef" :id="detailData.stuId"></student-grow-up>
                <student-other v-else-if="tabName == '8'" ref="studentOtherRef" :id="id" :stuId="detailData.stuId"></student-other>
                <sign-lists v-else-if="tabName == '10'" ref="signListsrEF" :id="id"></sign-lists>
                <countUseSystem v-else-if="tabName == '11'" ref="countUseSystem" :id="id"></countUseSystem>
                <tenantInfos v-else-if="tabName == '12'" ref="tenantInfos" :id="id"></tenantInfos>
            </div>
        </div>
        <div class="right-fixed">
            <div class="task-block" v-if="(detailData.isEffective != '1') && (myButtonPrem.indexOf('taskSmallList') > -1)">
                <div class="label" @click="showLists">
                    <i>{{taskLists.length}}</i>{{$t('modules_spoc_crm_web_src_views_customer360_index_1088')}}</div>
                <div class="task-lists" v-show="showListsFlag">
                    <div class="title">
                        <div>{{$t('modules_spoc_crm_web_src_views_customer360_index_1089')}}<span>{{taskLists.length}}</span>{{$t('modules_spoc_crm_web_src_views_customer360_index_1090')}}</div>
                        <span @click="closeLists">{{$t('messagemanagement_components_searchlists_331')}}<i class="ivu-icon ivu-icon-ios-arrow-up"></i></span>
                    </div>
                    <div class="lists">
                        <ul>
                            <li v-for="(task, index) in taskLists" :key="index" @click="getTaskDetail(task.id)">
                                <span class="type type-color-1">{{task.tplName}}</span>
                                <div class="time" :class="{'time-today': task.isHot == '1'}">{{task.startTime}}<span v-if="task.isHot == '1'">{{$t('modules_spoc_crm_web_src_views_customer360_index_1092')}}</span></div>
                                <div class="detail"><span>{{task.executorName}}：</span>{{task.description}}</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <ul class="task-btns" :style="{top: detailData.isEffective == '1' ? '0' :''}">
                <li v-if="detailData.isEffective != '1' && myButtonPrem.indexOf('traceTaskList') > -1">
                    <i class="iconfont icon-folder-add-fill" style="color: #01AFEC;"></i>
                    <div @click="addTask('follow task')"><span>{{$t('modules_spoc_crm_web_src_views_customer360_index_1093')}}<br />{{$t('modules_spoc_core_web_src_views_customstate_customizestate_148')}}</span></div>
                </li>
                <li v-if="detailData.isEffective != '1' && myButtonPrem.indexOf('serviceTaskList') > -1 && detailData && detailData.type == '1'">
                    <i class="iconfont icon-folder-add-fill" style="color: red;"></i>
                    <div @click="addTask('service task')"><span>{{$t('modules_spoc_crm_web_src_views_customer360_index_1095')}}<br />{{$t('modules_spoc_core_web_src_views_customstate_customizestate_148')}}</span></div>
                </li>
                <li @click="toPact" v-if="detailData.isEffective != '1' && canShowSign && myButtonPrem.indexOf('sign') > -1 && !isSimSign">
                    <i class="iconfont icon-baomingcishu" style="color: #FBC271;"></i>
                    <div><span>{{$t('modules_spoc_crm_web_src_views_customer360_index_1096')}}</span></div>
                </li>
                <li @click="toPactNow" v-if="detailData.isEffective != '1' && canShowSign && myButtonPrem.indexOf('sign') > -1 && isSimSign">
                    <i class="iconfont icon-baomingcishu" style="color: #FBC271;"></i>
                    <div><span>签约</span></div>
                </li>
                <!-- <li @click="toPactNow">
                    <i class="iconfont icon-baomingcishu" style="color: #FBC271;"></i>
                    <div><span>签约</span></div>
                </li> -->

                <li @click="toMessage" v-if="detailData.isEffective != '1' && myButtonPrem.indexOf('dialogue') > -1 && detailData.stuId">
                    <i class="iconfont icon-shishiduihua" style="color: #012F67;"></i>
                    <div><span>{{$t('modules_spoc_crm_web_src_views_customer360_index_1097')}}</span></div>
                </li>
                <li @click="toClassManageList" v-if="detailData.isEffective != '1' && myButtonPrem.indexOf('jw') > -1">
                    <i class="iconfont icon-kehao" style="color: #F9CA01;"></i>
                    <div><span>{{$t('modules_spoc_crm_web_src_views_customer360_index_1098')}}</span></div>
                </li>
                <li v-if="detailData.isEffective == '0' && canInvalid && myButtonPrem.indexOf('editEffective') > -1" @click="showConfirm('1')">
                    <i class="iconfont icon-xingzhuangjiehe11" style="color: #FF9F40;"></i>
                    <div><span>无效</span></div>
                </li>
                <li v-if="detailData.isEffective == '1' && myButtonPrem.indexOf('editEffective') > -1" @click="showConfirm('0')">
                    <i class="iconfont icon-xingzhuangjiehe1" style="color: #FF9F40;"></i>
                    <div><span>激活</span></div>
                </li>
            </ul>
        </div>
    </div>
    <studentAccont ref="studentAccont"></studentAccont>
    <task-modal ref="taskModalRef" @doSearch="doSearchTaskList"></task-modal>
    <task-detail-modal @refresh="doSearchTaskList" ref="taskDeatilModalRef"></task-detail-modal>
    <Modal v-model="modalAddress" class-name="modal-360" width="433" :closable="false">
        <div class="content">
            <Icon type="ios-help-circle" />
            <h3>{{$t('modules_spoc_crm_web_src_views_customer360_index_1101')}}</h3>
            <p>{{$t('modules_spoc_crm_web_src_views_customer360_index_1102')}}</p>
            <p>{{$t('modules_spoc_crm_web_src_views_customer360_index_1103', [detailData.name])}}</p>
            <p>{{$t('modules_spoc_crm_web_src_views_customer360_index_1104')}}<span @click="showPhoneList">{{phoneNum}}</span></p>
        </div>
        <div class="footer">
            <Button @click="addressCancel">{{$t('classroom_allscore_53')}}</Button>
            <Button type="primary" @click="addressNext">{{$t('classroom_clock_85')}}</Button>
        </div>
    </Modal>
    <Modal v-model="modalReferral" class-name="modal-360" width="433" :closable="false">
        <div class="content">
            <Icon type="ios-help-circle" />
            <h3>{{$t('modules_spoc_crm_web_src_views_customer360_index_1107')}}</h3>
            <p><span style="color:#F5222D">{{$t('modules_spoc_crm_web_src_views_customer360_index_1108')}}</span>{{$t('modules_spoc_crm_web_src_views_customer360_index_1109')}}</p>
        </div>
        <div class="footer">
            <Button @click="referralCancel">{{$t('classroom_allscore_53')}}</Button>
            <Button type="primary" @click="referralNext">{{$t('classroom_clock_85')}}</Button>
        </div>
    </Modal>
    <Modal v-model="nowPactModel" class-name="nowPactModel" :title="$t('modules_spoc_crm_web_src_views_customer360_index_1096')" width="433">
        <div class="content">
            <Form ref="formPact" :model="pactForm" :rules="rulePact" :label-width="108">
                <FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_index_1112')" prop="price">
                    <Input v-model="pactForm.price" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_index_1113')"></Input>
                </FormItem>
                <FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_index_1114')" prop="buyCourseNum">
                    <Input v-model="pactForm.buyCourseNum" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_index_1115')"></Input>
                </FormItem>
                <FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_index_1116')" prop="presentCourseNum">
                    <Input v-model="pactForm.presentCourseNum" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_index_1117')"></Input>
                </FormItem>
                <FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_index_1118')" prop="validDate1">
                    <DatePicker type="datetime" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_index_1119')" v-model="pactForm.validDate" style="width: 100%;"></DatePicker>
                </FormItem>
                <FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_index_1110')" prop="taskId">
                    <Select v-model="pactForm.taskId" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_index_1111')">
                        <Option :value="item.id" v-for="item in planList" :key="item.id">{{item.startTime}} {{item.executorName}}</Option>
                    </Select>
                </FormItem>
            </Form>
        </div>
        <div slot="footer">
            <Button @click="closePact('formPact')">{{$t('classroom_allscore_53')}}</Button>
            <Button type="primary" @click="pactOk('formPact')">{{$t('modules_spoc_crm_web_src_views_customer360_index_1120')}}</Button>
        </div>
    </Modal>
    <Modal v-model="seePactModel" class-name="seePactModel" :title="$t('modules_spoc_crm_web_src_views_customer360_index_1087')" footer-hide width="580">
        <div class="content">
            <div class="pact_item" v-for="(item,index) in pactList" :key="item.id">
                <div class="active_box" v-if="item.isEdit">
                    <Button class="active_left" @click="delItemMessage(item,'editForm'+index)">删除</Button>
                    <Button class="active_right" @click="closeChange(item,'editForm'+index)">取消</Button>
                    <Button class="active_right" @click="saveChange(item,'editForm'+index)">保存</Button>
                </div>
                <!-- 1 -->
                <div class="edit_box" v-else-if="myButtonPrem.indexOf('contractUpdate') > -1"><span @click="editItem(item)"><Icon type="ios-create-outline" :size="18" style="cursor: pointer;"/></span></div>
                <Row>
                    <Col span="12">{{$t('modules_spoc_crm_web_src_views_customer360_index_1123', [item.taskStartTime])}}</Col>
                    <Col span="12">{{item.taskExecutorName}}</Col>
                </Row>
                <Row v-if="!item.isEdit">
                    <Col span="8">{{$t('modules_spoc_crm_web_src_views_customer360_index_1124', [item.price])}}</Col>
                    <Col span="8">{{$t('modules_spoc_crm_web_src_views_customer360_index_1125', [item.buyCourseNum])}}</Col>
                    <Col span="8">{{$t('modules_spoc_crm_web_src_views_customer360_index_1126', [item.presentCourseNum])}}</Col>
                </Row>
                <Row v-else>
                    <Form :ref="'editForm'+index" :model="editPactForm" :rules="ruleEditPact" :label-width="96">
                        <Col span="8">
                            <FormItem label="合同金额：" prop="price">
                                <InputNumber :active-change="false" :min="0" :precision="2" size="small" v-model="editPactForm.price" style="width: 80px;"/>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="付费课时数：" prop="buyCourseNum">
                                <InputNumber :active-change="false" :min="0" :precision="0" size="small" v-model="editPactForm.buyCourseNum" style="width: 80px;"/>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="赠课课时数：" prop="presentCourseNum">
                                <InputNumber :active-change="false" :min="0" :precision="0" size="small" v-model="editPactForm.presentCourseNum" style="width: 80px;"/>
                            </FormItem>
                        </Col>
                    </Form>
                </Row>
                <Row>
                    <Col span="16">{{$t('modules_spoc_crm_web_src_views_customer360_index_1127', [item.createDate])}}</Col>
                    <Col span="8">{{$t('modules_spoc_crm_web_src_views_customer360_index_1128', [item.createByName])}}</Col>
                </Row>
                <Row>
                    <Col span="16">{{$t('modules_spoc_crm_web_src_views_customer360_index_1129', [item.updateDate])}}</Col>
                    <Col span="8">{{$t('modules_spoc_crm_web_src_views_customer360_index_1130', [item.updateByName])}}</Col>
                </Row>
            </div>
        </div>
    </Modal>
</div>
</template>

<script>
/**
 ** @author: 曹见芳
 ** 客户360
 */
import customerSteps from './components/customerSteps.vue';
import leftBanner from './components/leftBanner.vue';
import userTag from './components/userTag.vue';
import flowUp from './components/flowUp.vue';
import schoolTimetable from './components/schoolTimetable.vue';
import studentBref from '../../modules/resourceEntryModal.vue';
import studentInfo from './components/studentInfo.vue';
import studentSource from './components/studentSource.vue';
import studentCourses from './components/studentCourses.vue';
import studentGrowUp from './components/studentGrowUp.vue';
import studentOther from './components/studentOther.vue';
import memberIinformation from './components/memberIinformation.vue';
import taskListsTemp from './components/taskLists.vue';
import valid, { 
    common,  
    errors, 
    crmCustomerDetail, 
    crmCustomer, 
    crmSign,
    crmCustomerStatus,
    sysConfig,
    api
} from "../../libs/request";
import { mapMutations, mapState } from 'vuex';
import studentAccont from "../../../../spoc-sign-web/src/views/studentAccont/modal.vue";
import taskModal from '../taskCenter/taskModal';
import taskDetailModal from '../taskCenter/taskDetailModal';
import { waitUntil } from "@public/libs/util";
import signLists from './components/signLists.vue';
import countUseSystem from "./components/countUseSystem";
import tenantInfos from "./components/tenantInfos";
export default {
    components: {
        customerSteps,
        leftBanner,
        userTag,
        flowUp,
        schoolTimetable,
        studentBref,
        studentInfo,
        studentSource,
        studentCourses,
        studentGrowUp,
        studentOther,
        memberIinformation,
        taskListsTemp,
        studentAccont,
        taskModal,
        taskDetailModal,
        signLists,
        countUseSystem,
        tenantInfos
    },
    name: 'crm.customer360',
    data(){
        return {
            eventByState: null,
            stateDisableRels: {},
            tabName: '1',
            taskLists: [],
            showListsFlag: false,
            detailData: {},
            modalAddress: false,
            modalReferral: false,
            myButtonPrem: [],
            traceTotalNum: null,
            dataProof: {},
            phoneNum: '',
            nowPactModel:false,
            pactForm:{
                taskId:'',
                price:'',
                buyCourseNum:'',
                presentCourseNum:'',
                validDate:''
            },
            editPactForm:{
                id:'',
                taskId:'',
                price: null,
                buyCourseNum: null,
                presentCourseNum: null,
                validDate:''
            },
            planList:[],
            rulePact:{
                taskId: [
                    // { required: true, message: '该项必填', trigger: 'change' },
                ],
                price: [
                    { required: true, message: this.$t('modules_spoc_crm_web_src_views_customer360_index_1131'), trigger: 'blur' },
                    { pattern: /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/, message: this.$t('modules_spoc_crm_web_src_views_customer360_index_1132'), trigger: 'blur' },
                ],
                buyCourseNum: [
                    { required: false,pattern: /^[1-9]*[1-9][0-9]*$/, message: this.$t('modules_spoc_crm_web_src_views_customer360_index_1133'), trigger: 'blur' },
                ],
                presentCourseNum: [
                    { pattern: /^[0-9]+$/, message: this.$t('modules_spoc_crm_web_src_views_customer360_index_1133'), trigger: 'blur' },
                ],
                validDate: [
                    { required: true,type: 'date', message: this.$t('modules_spoc_crm_web_src_views_customer360_index_1131'), trigger: 'change' },
                ],
            },
            ruleEditPact:{
                price: [
                    { required: true, message: this.$t('modules_spoc_crm_web_src_views_customer360_index_1131'), trigger: 'blur' },
                    { pattern: /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/, message: this.$t('modules_spoc_crm_web_src_views_customer360_index_1132'), trigger: 'blur' },
                ],
                buyCourseNum: [
                    { required: false,pattern: /^[1-9]*[1-9][0-9]*$/, message: this.$t('modules_spoc_crm_web_src_views_customer360_index_1133'), trigger: 'blur' },
                ],
                presentCourseNum: [
                    { pattern: /^[0-9]+$/, message: this.$t('modules_spoc_crm_web_src_views_customer360_index_1133'), trigger: 'blur' },
                ],
            },
            seePactModel:false,
            isEdit:false,
            pactList:[],
            isSimSign: false, //是否简版合同
        };
    },
    computed: {
        ...mapState(["buttonPerm", "userInfo"]),
        id() {
            return this.$route.query.id ? this.$route.query.id : this.$route.query.cusId ? this.$route.query.cusId : '9a4bbb2d6e3846878572debfa8bc486c';
        },
        routeName() {
            return this.$route.name;
        },
        canShowSign(){
            // return (!this.stateDisableRels[this.detailData.statusVal]) || (this.stateDisableRels[this.detailData.statusVal].indexOf('sign') < 0)
            if(this.eventByState){
                return this.eventByState.indexOf('sign') < 0
            } else {
                return false
            }
        },
        canInvalid(){
            if(this.eventByState){
                return this.eventByState.indexOf('invalid') < 0
            } else {
                return false
            }
        },
        canActivation(){
            if(this.eventByState){
                return this.eventByState.indexOf('activation') < 0
            } else {
                return false
            }
        },
    },
    mounted(){
        waitUntil(
            () => {
                return (this.userInfo && this.buttonPerm && (JSON.stringify(this.buttonPerm) != "{}")) || false;
            },
            () => {
                console.log(this.buttonPerm,"this.buttonPerm")
                this.myButtonPrem = this.buttonPerm['crm.customer360'] || []
                console.log(this.myButtonPrem,"this.myButtonPrem")

                // this.getConfig()
                let params ={
                    tenantCode: localStorage.getItem('tenant')
                }
                api
                .getByTenantCode(params)
                .then(valid.call(this))
                .then((res) => {
                    if(res.ok){
                        console.log(res.data.data,"getByTenantCode~")
                        this.isSimSign = res.data.data.version.code == 'crm' //简版合同
                        this.getDetail(this.id);
                        this.getDataProof(this.id);
                    }
                })
                .catch(errors.call(this))
            }
        );

        waitUntil(
            // 6281 【变更】客户360地址信息相关提示
            () => {
                let flag = false;
                if(this.traceTotalNum != null && this.dataProof.address != undefined && JSON.stringify(this.detailData)!= '{}') flag = true;
                return flag;
            },
            () => {
                // 只有跟进人进入客户详情页面，当前客户跟进人的跟进次数>=1之后，才需要弹出填写地址提醒；
                // 先判断 this.traceTotalNum > 0 && this.dataProof.address = false;
                // sessionStorage.clear();
                // this.userInfo.id == this.detailData.ownerId 当前登录人是资源跟进人，否则直接不弹窗
                if(this.traceTotalNum > 0 && !this.dataProof.address && this.userInfo.id == this.detailData.ownerId) {
                    let getAddressDateLists = sessionStorage.getItem("addressDateLists");
                    let _lists = [];
                    if(getAddressDateLists) _lists = JSON.parse(getAddressDateLists);
                    // console.log(_lists);
                    let curDate = new Date().format('yyyy-MM-dd');
                    if(getAddressDateLists) {
                        // 判断是否有当前日期
                        // 一天每个资源针对同一个跟进人弹出一次
                        let _cur = {};
                        _lists.forEach(list => {
                            if(list.stuId == this.id) {
                                _cur = list;
                                // 找到当前人
                            }
                        });
                        if(JSON.stringify(_cur) != '{}') {
                            let _index = _cur.date.indexOf(curDate);
                            if(_index == -1) {
                                // 当前跟进人人，当前日期没有弹出过
                                this.modalAddress = true;
                                _cur.date.push(curDate);
                                sessionStorage.setItem("addressDateLists", JSON.stringify(_cur));
                            }
                        } else {
                            _lists.push({
                                stuId: this.id,
                                date: [curDate]
                            })
                            sessionStorage.setItem("addressDateLists", JSON.stringify(_lists));
                            this.modalAddress = true;
                        }
                    } else {
                        // null, 存入sessionStorage，判断是否弹窗
                        _lists.push({
                            stuId: this.id,
                            date: [curDate]
                        })
                        sessionStorage.setItem("addressDateLists", JSON.stringify(_lists));
                        this.modalAddress = true;
                    }
                }
            }
        );
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        getEventByState() {
            crmCustomer.getEventByState({
                state: this.detailData.statusVal
            })
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.eventByState = res.data.data || []
                }
            })
            .catch(errors.call(this))
            .finally(() => {

            });
        },
        getConfig(){
            sysConfig.getConfig({ 
                menuId: 2001,
                configId: 'crm:customState'
            }).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    let obj = {}
                    res.data.data.forEach(item =>{
                        let _arr = []
                        if(item.stateDisableRels && item.stateDisableRels.length){
                            item.stateDisableRels.forEach(itemChild=>{
                                if(itemChild.type == '1'){ // 禁用操作  存储操作KEY
                                    _arr.push(itemChild.value)
                                }
                                if(itemChild.type == '2'){ // 禁用任务。存储任务名
                                    _arr.push(itemChild.name)
                                }
                            })
                        }
                        obj[item.value] = _arr
                    })
                    this.stateDisableRels = obj
                    this.getDetail(this.id);
                    this.getDataProof(this.id);
                }
            })
            .catch(errors.call(this))
            .finally(() => {
                // this.updateLoadingStatus({
                //     isLoading: false
                // });
            });
        },
        reCustomerSteps(){
            this.getDetail(this.id);
            this.$refs.customerSteps && this.$refs.customerSteps.getStatusList();
        },
        uploadTraceTotalNum(num) {
            if(num) this.traceTotalNum = num;
        },
        getTaskDetail(id){
            this.$refs.taskDeatilModalRef.showModal(id);
        },
        getTaskListData(id) {
            if(this.myButtonPrem.indexOf('taskSmallList') < 0){
                // 没有任务小列表权限
                return 
            }
			this.updateLoadingStatus({ isLoading: true });
			let param = {
                pageNo: -1,
                objectId: id,
                type: '',
                status: '0'
			};
			common
				.listPageComTask(param)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let result = res.data.data;
						this.taskLists = result.list;
				}
			})
			.catch(errors.call(this))
			.finally(() => {
				this.updateLoadingStatus({ isLoading: false });
			});
		},
        doSearchTaskList(){
            this.tabName = '2';
            this.getDetail(this.id);
            this.getTaskListData(this.id);
            this.$refs.taskListsTempRef && this.$refs.taskListsTempRef.getListData();
            this.$refs.flowUpRef && this.$refs.flowUpRef.getCrmTraceTrees();
            this.$refs.customerSteps && this.$refs.customerSteps.getStatusList();
        },
        addTask(taskType){
            this.$refs.taskModalRef.showModal({
				modalName: this.$t('modules_spoc_core_web_src_views_tasktemplate_index_415'),
				// isSelf: '0',
                taskType: taskType,
                stuId: this.$route.query.id ? this.$route.query.id : this.$route.query.cusId,
                stuNameForFollow: this.detailData.name,
                stuNameForService: this.detailData.stuName,
                from: '360',
                type: this.detailData.type,
                statusVal: this.detailData.statusVal,
                phone: this.detailData.phoneObj ? this.detailData.phoneObj.starPhone : '',
			});
        },
        TabPaneChange(name) {
            this.tabName = name;
            this.$nextTick(() => {
                if(this.tabName == '8') {
                    this.$refs.studentOtherRef.getStudentCard();
                }
            })
        },
        showLists() {
            if(!this.taskLists.length){
                return
            }
            this.showListsFlag = !this.showListsFlag;
        },
        closeLists() {
            this.showListsFlag = false;
        },
        getDetail(id) {
            this.updateLoadingStatus({isLoading:true});
            this.getTaskListData(id)
            let params = {
                id: id
            }
            crmCustomerDetail.base(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.detailData = res.data.data;
                    if(this.$route.query.isEditCustomer == 1){
                        this.referralNext()
                    } else if(this.$route.query.isEditStudent == 1){
                        this.editStu()
                    }   
                    this.getEventByState()
                    // this.detailData.type = '1'
                    this.phoneNum = this.detailData && this.detailData.phoneObj && this.detailData.phoneObj.starPhone ? this.detailData.phoneObj.starPhone : '';
                }
            })
            .catch(errors.call(this))
            .finally(() => {this.updateLoadingStatus({isLoading:false})});
        },
        showStudentAccont() {
            if(this.detailData.stuId && this.detailData.stuOfficeId) {
                this.$refs.studentAccont.show({
                    studentId: this.detailData.stuId,
                    officeId: this.detailData.stuOfficeId,
                })
            } else this.$Message.error(this.$t('modules_spoc_crm_web_src_views_customer360_index_1135'));
        },
        getDataProof(id) {
            let params = {
                id: id
            }
            crmCustomerDetail.dataProof(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    let _data = res.data.data;
                    this.dataProof = _data;
                    // if(!_data.address) this.modalAddress = true;
                    if(!_data.referral) this.modalReferral = true;
                }
            })
            .catch(errors.call(this))
        },
        addressNext() {
            this.tabName = '4';
            this.addressCancel();
        },
        addressCancel() {
            this.modalAddress = false;
        },
        referralNext() {
            this.tabName = '4';
            this.$nextTick(()=>{
                setTimeout(()=>{
                    this.$refs.studentBrefRef.setEdit()
                },200)
            })
            this.referralCancel();
        },
        editStu() {
            this.tabName = '9';
            this.$nextTick(()=>{
                setTimeout(()=>{
                    this.$refs.studentInfoRef.modelShow(true)
                },200)
            })
        },
        referralCancel() {
            this.modalReferral = false;
        },
        toMessage() {
            // console.log(this.userInfo.id)
            if(this.detailData.stuId) {
                let params = {
                    stuId: this.detailData.stuId,
                    teacherId: this.userInfo.id
                }
                crmCustomerDetail.listClasses(params)
                .then(valid.call(this))
				.then(res => {
					if (res.ok) {
                        let result = res.data.data;
                        if(result && result.length) {
                            this.openMessage(result[0]);
                        } else {
                            this.$Message.error(this.$t('modules_spoc_crm_web_src_views_customer360_index_1136'))
                        }
                    }
                })
                .catch(errors.call(this))
            }
        },
        openMessage(data) {
            this.$router.push({
                name: 'hootie.message',
                query:{
                    form: 'crm.customer360',
                    classCourseId: data.classId,
				    stuId: data.stuId,
                }
            });
        },
        toPact() {
            console.log(this.detailData.stuId,this.detailData.name)
            this.$router.push({
                name: 'sign.pact',
                query:{
                    cusId: this.detailData.id,
                }
            });
        },
        toPactNow(){
            console.log(this.detailData.stuId,this.detailData.name)
            this.nowPactModel=true;
            common
				.listPageComTaskTpl({
                    "pageNo":1,
                    "pageSize":20,
                    "name":"试听课任务",
                    "createDateSearch":["",""],
                    "isEnable":"1",
                    "startDate":"",
                    "endDate":""
                })
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
                        if(res.data.data.list && res.data.data.list.length){
                            let tplId = res.data.data.list[0].id
                            let params1 = {
                                "pageNo": -1,
                                "objectId": this.detailData.id,
                                "type": "follow task",
                                "tplId": tplId
                            };
                            common
                                .listPageComTask(params1)
                                .then(valid.call(this))
                                .then(res => {
                                    if (res.ok) {
                                        this.planList=res.data.data.list || [];
                                    }
                                })
                                .catch(errors.call(this));

                        }
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
        },
        pactOk(name){
            this.$refs[name].validate((ok) => {
                console.log(ok)
                if (ok) {
                    this.updateLoadingStatus({
                        isLoading: true
                    });
                    let params=Object.assign({},this.pactForm);
                    params.cusId=this.detailData.id;
                    params.validDate= params.validDate ? new Date(params.validDate).format('yyyy-MM-dd hh:mm:ss') : '5000-12-30 23:59:59'
                    crmSign
                        .save(params)
                        .then(valid.call(this))
                        .then(res => {
                            if (res.ok) {
                                this.$refs[name].resetFields();
                                this.getDetail(this.id);
                                this.$refs.customerSteps && this.$refs.customerSteps.getStatusList();
                                this.nowPactModel=false;
                                this.$Message.success(this.$t('modules_spoc_crm_web_src_views_customer360_index_1137'));
                            }
                        })
                        .catch(errors.call(this)).finally(()=>{
                            this.updateLoadingStatus({
                                isLoading: false
                            });
                        });
                } else {
                    // this.$Message.error('Fail!');
                }
            })
        },
        closePact(name){
            this.$refs[name].resetFields();
            this.nowPactModel=false;
        },
        toClassManageList() {
            this.$router.push({
                name: 'jw.classManageList',
                query:{
                    stuId: this.detailData.stuId,
                }
            });
        },
        uploadAll() {
            this.getDetail(this.id);
            this.$refs.customerSteps && this.$refs.customerSteps.getStatusList();
            // 更新各个子模块
            this.$refs.flowUpRef && this.$refs.flowUpRef.getCrmTraceTrees();
            this.$refs.studentBrefRef && this.$refs.studentBrefRef.getFormFn();
        },
        doSearch() {
            // 刷新进度条
            this.$refs.customerSteps && this.$refs.customerSteps.getStatusList();
            this.getDetail(this.id);
            this.getTaskListData(this.id);
        },
        uploadTags() {
            // 更新标签
            this.getDetail(this.id);
        },
        showPhoneList() {
            // 解密手机号
            const old = this.detailData.phoneObj.starPhone;
            let params = {
                sorts: 0,
                id: this.detailData.id
            };
            crmCustomer
                .showPhoneList(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let _data = res.data.data[0];
                        this.phoneNum = _data.phone;
                        setTimeout(() => {
                            this.phoneNum =
                                _data.starPhone;
                        }, 10e3);
                    }
                })
                .catch(errors.call(this));
        },
        seePactNow(){
            let params = {
                "pageNo": -1,
                "cusId": this.detailData.id,
            };
            crmSign
                .listPage(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let arr=res.data.data.list;
                        arr.map(v=>v.isEdit=false);
                        this.pactList=arr;
                        if(this.pactList && this.pactList.length){
                            this.seePactModel=true;
                        }else{
                            this.$Modal.warning({
                                title: this.$t('modules_spoc_crm_web_src_views_customer360_index_1138'),
                                content: this.$t('modules_spoc_crm_web_src_views_customer360_index_1139')
                            });
                        }
                    }
                })
                .catch(errors.call(this));
        },
        editItem(item){
            item.isEdit=true;
            this.pactList.forEach(v=>{
                if(v.id!=item.id){
                    v.isEdit=false;
                }
            })
            this.editPactForm = {
                id:item.id,
                taskId:item.taskId,
                price: item.price - 0,
                buyCourseNum:item.buyCourseNum,
                presentCourseNum:item.presentCourseNum,
                validDate:item.validDate
            };
        },
        delItemMessage(item,name) {
            this.$Modal.confirm({
                title: '提示',
                content: '<p>合同删除后，将无法恢复！</p><p>确定删除？</p>',
                onOk: () => {
                    this.delItem(item,name);
                }
            });
        },
        delItem(item,name){
            let params = {
                id:item.id
            };
            crmSign
                .deleteById(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.seePactNow();
                        this.closeChange(item,name);
                    }
                })
                .catch(errors.call(this));
        },
        closeChange(item,name){
            item.isEdit=false;
            this.editPactForm = {
                id:'',
                taskId:'',
                price: null,
                buyCourseNum: null,
                presentCourseNum: null,
                validDate:''
            };
            this.$refs[name][0].resetFields();
        },
        saveChange(item,name){
            this.$refs[name][0].validate((ok) => {
                if (ok) {
                    let params=this.editPactForm;
                    params.cusId=this.detailData.id;
                    crmSign
                        .save(params)
                        .then(valid.call(this))
                        .then(res => {
                            if (res.ok) {
                                this.closeChange(item,name);
                                this.seePactNow();
                                this.$Message.success(this.$t('modules_spoc_crm_web_src_views_customer360_index_1140'));
                            }
                        })
                        .catch(errors.call(this));
                } else {
                    this.$Message.error(this.$t('modules_spoc_crm_web_src_views_customer360_index_1141'));
                }
            })
        },
        showConfirm(type) {
            if(type == '1') {
                // 点击 无效
                let config = {
                    okText:this.$t('classroom_clock_85'),
                    title:this.$t('modules_spoc_crm_web_src_views_customer360_index_1142'),
                    width:350,
                    content: '丢入无效池中的资源，将不在日常跟进的列表中出现，您还要继续吗？',
                    onOk: () => {
                        this.changeStatus(type, [this.id])
                    }
                }
                this.$Modal.confirm(config)
            } else {
                // 点击 激活
                let obj = {
                    title:this.$t('modules_spoc_crm_web_src_views_customer360_index_1100'),
                    content: this.$t('modules_spoc_crm_web_src_views_customer360_index_1146')+'<br/>'+
                        this.$t('modules_spoc_crm_web_src_views_customer360_index_1147')+'<span style="color:#FF0000">'+ this.detailData.statusLabel+ '</span>',
                    onOk:() => {
                        this.changeStatus(type, [this.id])
                    },
                }
                this.$Modal.confirm(obj)
            }
        },
        changeStatus(toStatus,arr){
            let params = {
                isEffective: toStatus,
                ids:arr
            };
            crmCustomerStatus.modifyEffective(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.uploadAll();
                }
            })
            .catch(errors.call(this))
        },
    },
    watch: {
        id: function(newVal, oldVal) {
            if (this.$route.name == 'crm.customer360') {
                this.getDetail(newVal);
                this.getDataProof(newVal);
            }
        },
        '$route.query': function(newVal, oldVal) {
            if (this.$route.name == 'crm.customer360') {
                if(this.$route.query.isEditCustomer == 1){
                    this.referralNext()
                } else if(this.$route.query.isEditStudent == 1){
                    this.editStu()
                } else {
                    this.tabName = '1';
                }
            }
        }
    }
}
</script>
