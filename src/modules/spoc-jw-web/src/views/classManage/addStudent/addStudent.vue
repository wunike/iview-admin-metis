<style lang="less">
.class-details-container {
    height: 100%;
    .details-info {
        width: 100%;
        // height: 182px;
        background: #fff;
        margin-bottom: 16px;
        border-radius: 4px;
        padding: 10px 23px;

        h2 {
            width: 100%;
            height: 28px;
            font-size: 20px;
            font-weight: 500;
            color: rgba(73, 80, 96, 1);
            line-height: 28px;
            margin-bottom: 4px;
        }

        .info-table {
            ul {
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: flex-start;
            }

            li {
                width: 25%;
                min-height: 14px;
                /*overflow: hidden;*/
                font-size: 14px;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: flex-start;
                padding-right: 16px;
                margin-top: 6px;
                span {
                    display: inline-block;
                    color: #999999;
                    min-width: 30px;
                    font-weight: normal;
                }

                div {
                    color: #495060;
                }
            }

            // .s-ul {
            //     li:nth-of-type(1) {
            //         width: 33.33333%;
            //     }

            //     li:nth-of-type(2) {
            //         width: 66.66666%;
            //         padding-right: 33px;
            //     }
            // }
        }
    }

    .details-action {
        width: 100%;
        height: calc(~"100% - 120px");
        background: #fff;
        border-radius: 4px;
        padding: 10px 22px 0;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;

        .action-block {
            /*width:528px;*/
            height: 100%;

            header {
                width: 100%;
                height: 32px;
                line-height: 32px;
                padding-left: 20px;
                background: #f7f8fa;
                border-bottom: 1px solid #dcdee3;
            }

            section {
                width: 100%;
                height: calc(~"100% - 32px");
            }

            .search-box {
                width: 100%;
                border-bottom: 1px solid #dcdee3;
                height: 50px;
                line-height: 50px;
                padding-left: 20px;
            }

            .page {
                width: 100%;
                height: 39px;
                text-align: center;
                line-height: 39px;
                border-top: 1px solid #dcdee3;
                background: #f7f8fa;
            }

            .d-table {
                width: 100%;
                height: calc(~"100% - 90px");
                overflow-y: auto;
                td, th{
                    &:last-child{
                        border-right: none;
                    }
                }
            }

            .d-footer {
                margin-top: 12px;
            }
        }

        .action-block-1 {
            border: 1px solid #dcdee3;
            border-radius: 3px;
            height: calc(~"100% - 42px");
        }

        .action-buttons {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .ivu-table-header {
            table {
                th {
                    height: 40px;
                    background: none;
                }
            }
        }
    }

    // .show-pay {
    //     position: relative;
    //     color: #495060;
    //     padding-left: 16px;

    //     &::before {
    //         position: absolute;
    //         display: block;
    //         content: "";
    //         width: 6px;
    //         height: 6px;
    //         background: #46bc15;
    //         border-radius: 50%;
    //         left: 0;
    //         top: 6px;
    //     }
    // }

    // .show-paying {
    //     color: #495060;
    //     position: relative;
    //     padding-left: 16px;

    //     &::before {
    //         display: block;
    //         position: absolute;
    //         content: "";
    //         width: 6px;
    //         height: 6px;
    //         left: 0;
    //         top: 6px;
    //         background: #01c1b2;
    //         border-radius: 50%;
    //     }
    // }

    // .ivu-input-wrapper {
    //     .ivu-input {
    //         color: #999999;
    //     }
    // }
}

.sure-back {
    &.sure-back1 {
        .ivu-form-item-label {
            color: rgba(153, 153, 153, 1);
            font-size: 14px;
            font-family: HiraginoSansGB-W3;
        }
    }

    .ivu-modal-body {
        .ivu-form-item {
            margin-bottom: 0 !important;
            padding-top: 10px;
            padding-bottom: 10px;
        }
    }

    .ivu-modal-footer .ivu-btn-text {
        border: 1px solid rgb(220, 222, 226);
    }

    .ivu-modal-footer .ivu-btn-text:hover {
        border: 1px solid rgb(220, 222, 226);
    }

    .ivu-modal-header {
        padding: 16.5px 24px;

        .ivu-modal-header-inner {
            font-size: 18px;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.85);
        }
    }

    .ivu-modal-footer {
        padding: 10px 24px !important;
    }
}
</style>

<template>
    <div class="class-details-container">
        <div class="details-info">
            <h2>{{ClassData.name}}</h2>
            <div class="info-table">
                <ul>
                    <li>
                        <span>{{$t('messagemanagement_components_infos_322')}}</span>
                        <div>{{ClassData.gradeLabel}}</div>
                    </li>
                    <li>
                        <span>{{$t('modules_spoc_jw_web_src_views_classmanage_addstudent_addstudent_2389')}}</span>
                        <div
                            v-show="ClassData.memberCount"
                        >{{`${ClassData.actualMemberCount}/${ClassData.memberCount}`}}</div>
                    </li>
                    <li>
                        <span>{{$t('modules_spoc_jw_web_src_views_classmanage_addstudent_addstudent_2390')}}</span>
                        <div>{{`${ClassData.finishCourseHour+''}/${ClassData.courseHour}`}}</div>
                    </li>
                    <li>
                        <span>{{$t('courselist_compontents_modify_187')}}</span>
                        <div>{{ClassData.teacherName}}</div>
                    </li>
                </ul>
                <ul>
                    <li>
                        <span>{{$t('modules_spoc_jw_web_src_views_attendancepage_attendancepage_2297')}}</span>
                        <div>{{ClassData.assistName}}</div>
                    </li>
                    <li>
                        <span>{{$t('courselist_compontents_modify_193')}}</span>
                        <div>{{ClassData.classTeacherName}}</div>
                    </li>
                    <li>
                        <span>{{$t('modules_spoc_jw_web_src_views_classmanage_addstudent_addstudent_2394')}}</span>
                        <div>{{ClassData.courseName}}</div>
                    </li>
                    <li>
                        <span>{{$t('modules_spoc_jw_web_src_views_classmanage_addstudent_addstudent_2395')}}</span>
                        <div>{{ClassData.startDate}}</div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="details-action">
            <Row style="width:100%;height:100%;">
                <Col span="11" style="height:100%;">
                    <div class="action-block">
                        <div class="action-block-1">
                            <header>{{$t('modules_spoc_jw_web_src_views_classmanage_addstudent_addstudent_2396')}}</header>
                            <section>
                                <div class="search-box">
                                    <Select
                                        ref="setQueryRef"
                                        clearable
                                        v-model="searchCourseId"
                                        :placeholder="$t('modules_spoc_jw_web_src_views_chargingmanage_chargingmanagelist_2335')"
                                        @on-change="changeSearchCourseId"
                                        style="width:115px;margin-right:12px;color:#999999;"
                                        filterable="true"
                                        remote
                                        :loading="loadingCourseId"
                                        :remote-method="remoteCourseId"
                                    >
                                        <Option
                                            v-for="item in getcourseList"
                                            :value="item.id"
                                            :key="item.id"
                                            :label="item.name"
                                        >
                                            {{
                                            item.name }}
                                        </Option>
                                    </Select>
                                    <Input
                                        v-model="studentName"
                                        :placeholder="$t('classlist_compontents_detailinfo_35')"
                                        style="width: 115px;margin-right:12px;color:#999999;"
                                    />
                                    <Button type="primary" @click="findLeftStudentList">{{$t('modules_rolepeople_210')}}</Button>
                                </div>
                                <div class="d-table">
                                    <Table
                                        size="small"
                                        :columns="columns1"
                                        @on-selection-change="selectChangeLeft1"
                                        :data="tableDataList1"
                                        border
                                    ></Table>
                                </div>
                                <div class="page">
                                    <Page
                                        v-show="tableDataList1.length>0"
                                        :total="total"
                                        size="small"
                                        :current="pageNo"
                                        :page-size="pageSize"
                                        @on-change="pageChange"
                                        @on-page-size-change="pageSizeChange"
                                        show-elevator
                                        show-sizer
                                    />
                                </div>
                            </section>
                        </div>
                        <div class="d-footer">
                            <!-- <Checkbox
                                v-model="hoursZeroFlag"
                                @on-change="filterRemainStudentList"
                            >{{$t('modules_spoc_jw_web_src_views_classmanage_addstudent_addstudent_2400')}}</Checkbox> -->
                            <Checkbox
                                v-model="expiredFlag"
                                @on-change="expiredFlagStudentList"
                            >{{$t('modules_spoc_jw_web_src_views_classmanage_addstudent_addstudent_24001')}}</Checkbox>
                            <Checkbox
                                v-model="assignedFlag"
                                @on-change="filterEvenStudent"
                            >{{$t('modules_spoc_jw_web_src_views_classmanage_addstudent_addstudent_2401')}}</Checkbox>
                        </div>
                    </div>
                </Col>
                <Col span="2" style="height:100%;">
                    <div class="action-buttons">
                        <Button v-if="toRight" type="primary" @click="toRightFn">{{$t('modules_spoc_jw_web_src_views_classmanage_addstudent_addstudent_2402')}}<Icon type="ios-arrow-forward" />
                        </Button>
                        <Button v-else disabled>{{$t('modules_spoc_jw_web_src_views_classmanage_addstudent_addstudent_2402')}}<Icon type="ios-arrow-forward" />
                        </Button>
                        <!--
                   if(this.isEdit){
                          this.$Message.warning($t('modules_spoc_jw_web_src_views_classmanage_addstudent_addstudent_2403'));
                          return
                        }
                        -->
                        <!-- <Button v-if="toLeft" type="primary" style="margin-top:8px;" @click="toLeftFn">
                  <Icon type="ios-arrow-back"/>{{$t('modules_spoc_jw_web_src_views_classmanage_addstudent_addstudent_2404')}}</Button>
                <Button v-else style="margin-top:8px;" disabled>
                  <Icon type="ios-arrow-back"/>{{$t('modules_spoc_jw_web_src_views_classmanage_addstudent_addstudent_2404')}}</Button>-->
                    </div>
                </Col>
                <Col span="11" style="height:100%;">
                    <div class="action-block">
                        <div class="action-block-1">
                            <header>{{$t('modules_spoc_jw_web_src_views_classmanage_addstudent_addstudent_2405')}}</header>
                            <section>
                                <div class="search-box">
                                    <Input
                                        v-model="studentName1"
                                        :placeholder="$t('classlist_compontents_detailinfo_35')"
                                        style="width: 115px;margin-right:12px;color:#999999;"
                                    />
                                    <Button type="primary" @click="getRightLists">{{$t('modules_rolepeople_210')}}</Button>
                                </div>
                                <div class="table-border d-table">
                                    <!-- @on-selection-change="selectChangeLeft2" -->
                                    <Table size="small" :columns="columns2" :data="data2" border>
                                        <template slot-scope="{ row, index }" slot="startDate">
                                            <DatePicker
                                                v-if="row.add==true"
                                                :transfer="true"
                                                :options="optionsDisableObj"
                                                format="yyyy-MM-dd"
                                                type="date"
                                                v-model="row.startDate"
                                                :placeholder="$t('modules_spoc_jw_web_src_views_classmanage_addstudent_addstudent_2406')"
                                                style="width: 120px"
                                                @on-change="startDateChange(index)"
                                            ></DatePicker>
                                            <span v-else>{{ row.startDate }}</span>
                                        </template>
                                        <template slot-scope="{ row, index }" slot="doAction">
                                            <div v-if="row.add">
                                                <a
                                                    @click="handleSave(row,index)"
                                                    style="float:left;padding-left:2px;margin-right:12px;"
                                                >{{$t('scoretemplate_scoretemplate_561')}}</a><!-- 确认 -->
                                                <a
                                                    @click="handleCancel(row,index)"
                                                    style="float: left"
                                                >{{$t('classroom_allscore_53')}}</a> <!-- 取消 -->
                                            </div>
                                            <div v-else>
                                                <!-- 已退班 -->
                                                <a
                                                    v-if="comStudentCourseRelList1(row)"
                                                    style="color:#ccc"
                                                >{{$t('modules_spoc_jw_web_src_views_classmanage_addstudent_addstudent_2409')}}</a>
                                               <!--  已结课 -->
                                                <a
                                                    v-else-if="row.isStudying == '1' && row.status == 'finish'"
                                                    style="color:#ccc"
                                                >{{$t('mycourse_mycourse_413')}}</a>
                                                <!-- 退班中  || 退班-->
                                                <a
                                                    @click="handleEdit(row, index)"
                                                    v-else
                                                    :style="{color:comStudentCourseRelList(row)?'#ccc':''}"
                                                >{{comStudentCourseRelList(row)?$t('modules_spoc_jw_web_src_views_classmanage_addstudent_addstudent_2410'):$t('modules_spoc_jw_web_src_views_classmanage_addstudent_addstudent_2404')}}</a>
                                            </div>
                                        </template>
                                    </Table>
                                </div>
                                <div class="page">
                                    <Page
                                        v-show="data2.length>0"
                                        :total="total1"
                                        :current="pageNo1"
                                        :page-size="pageSize1"
                                       
                                        @on-page-size-change="pageSizeChange1"
                                        @on-change="pageChange1"
                                        size="small"
                                        show-elevator
                                        show-sizer
                                    />
                                </div>
                            </section>
                        </div>
                        <div class="d-footer">
                            <Checkbox
                                v-model="readFlag"
                                style="width:230px;"
                                @on-change=" filterReadFlagChange"
                            >{{$t('modules_spoc_jw_web_src_views_classmanage_addstudent_addstudent_2411')}}</Checkbox>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>

        <Modal
            class="sure-back sure-back1"
            width="600"
            v-model="ReasonShow"
            :mask-closable="false"
            :title="$t('modules_spoc_jw_web_src_views_classmanage_addstudent_addstudent_2412')"
        >
            <Form
                :label-width="140"
                label-position="right"
                ref="quitReasonRef"
                :model="quitReasonObj"
            >
                <FormItem :label="$t('modules_spoc_jw_web_src_views_approval_jwapprovaldetial_2265')" style="color:rgba(73,80,96,1);font-size:14px;">
                    <span style="font-size:14px;color:#495060">{{this.backData.studentName}}</span>
                </FormItem>
                <FormItem
                    :label="$t('modules_spoc_jw_web_src_views_classmanage_addstudent_addstudent_2414')"
                    prop="sendAudit"
                    :rules="{required: true, message: $t('pushsettings_index_504'), trigger: 'change'}"
                    v-if="backCourseList.length>1"
                >
                    <Select v-model="quitReasonObj.sendAudit" style="width:346px;">
                        <Option
                            v-for="item in backCourseList"
                            :value="item.id"
                            :key="item.id"
                        >{{ item.courseName }}</Option>
                    </Select>
                </FormItem>
                <FormItem
                    :label="$t('modules_spoc_jw_web_src_views_classmanage_addstudent_addstudent_2416')"
                    prop="quitReason"
                    :rules="{required: false, message: $t('pushsettings_index_504'), trigger: 'change'}"
                >
                    <Input
                        style="width:346px;"
                        v-model="quitReasonObj.quitReason"
                        type="textarea"
                        :autosize="{minRows: 3,maxRows: 5}"
                        :placeholder="$t('modules_spoc_jw_web_src_views_classmanage_addstudent_addstudent_2417')"
                    ></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="cacelBtn">{{$t('classroom_allscore_53')}}</Button>
                <Button type="primary" @click="okSureBtn">{{$t('scoretemplate_scoretemplate_561')}}</Button>
            </div>
        </Modal>
        <Modal
            class="sure-back sure-back1"
            width="600"
            v-model="ReasonShow1"
            :mask-closable="false"
            :title="$t('modules_spoc_jw_web_src_views_classmanage_addstudent_addstudent_2418')"
        >
            <Form
                :model="formValidate"
                :rules="ruleValidate"
                label-position="right"
                :label-width="120"
                ref="startDateRef"
            >
                <FormItem :label="$t('modules_spoc_jw_web_src_views_classmanage_addstudent_addstudent_2419')" prop="startDate">
                    <DatePicker
                        :transfer="true"
                        format="yyyy-MM-dd"
                        :options="optionsDisableObj"
                        type="date"
                        v-model="formValidate.startDate"
                        :placeholder="$t('modules_spoc_jw_web_src_views_classmanage_addstudent_addstudent_2406')"
                        :clearable="false"
                        style="width: 346px"
                        @on-change="startDateChange1"
                    ></DatePicker>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="cancelRightBtn">{{$t('classroom_allscore_53')}}</Button>
                <Button type="primary" @click="okRightBtn">{{$t('scoretemplate_scoretemplate_561')}}</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import valid, {
    errors,
    common,
    comAuditFlow,
    jwClassCourse
} from "../../../libs/request";
import { jwCourse } from "../../../../../spoc-core-web/src/libs/request";

export default {
    name: "jw.classManage.addStudent",
    data() {
        return {
            searchCourseId: "",
            isEdit: false,
            quitReasonObj: {
                sendAudit: "",
                quitReason: ""
            },
            backCourseList: [],
            optionsDisableObj: {},
            loadingCourseId: false,
            getcourseList: [],
            nameList: [],
            formValidate: {
                startDate: ""
            },
            ruleValidate: {
                startDate: [
                    {
                        required: true,
                        message: this.$t('modules_spoc_jw_web_src_views_classmanage_addstudent_addstudent_2420'),
                        trigger: "change"
                    }
                ]
            },
            MoreData: false,
            checkLeftArr: [],
            LeftChooseArr: [],
            backData: [],
            savestartDate: "",
            ClassData: {
                /*    classTeacherName: "", //服务OO
                     teacherName: "", //授课老师
                     assistName: "", //助教
                     grade: "", //年级
                     memberCount: "", //满课人数
                     actualMemberCount: "", //已报人数
                     name: "", //班课名字
                     courseName: "", //所属课程
                     arrangedHour: "", //已排课时
                     attendanceHour: "", //已考勤课时
                     courseHour: "", //课时数 : 同步合同模块数据，可修改
                     finishCourseHour: "", //已上课时数
                     startDate: "", //上课时间
                     type: "", //课程分类：关联字典表：jw_course_type */
            },
            studentName: "",
            studentName1: "",
            // courseId: "",
            courseName: "",
            hoursZeroFlag: false,
            expiredFlag: false,
            assignedFlag: false,

            pageSize: this.$store.state.app.pageSizeGlobal,
            pageNo: 1,
            total: 0,
            pageSize1: this.$store.state.app.pageSizeGlobal,
            pageNo1: 1,
            total1: 0,
            toRight: false,
            readFlag: false,

            backToLeft: "", //退学id
            backToRight: "", //报班
            toLeft: false,
            leftSels: [],
            rightSels: [],
            mPay: "",
            name: "",

            columns1: [
                {
                    type: "selection",
                    width: 50,
                    resizable: true
                },
                // {
                // 	title: "学生姓名",
                // 	tooltip: true,
                // 	key: "studentName",
                // 	width:null,
                // 	resizable:true
                // },
                {
                    title: "学生姓名",
                    tooltip: true,
                    key: "studentName",
                    // width:null,
                    // resizable:true,
                    render(h, params) {
                        return h(
                            "div",
                            {
                                style: {
                                    // position:'relative'
                                }
                            },
                            [
                                h("span", {}, params.row.studentName),
                                params.row.isAssigned == "1"
                                    ? h(
                                        "Tooltip",
                                        {
                                            props:{
                                                content:  params.row.classCourseName,
                                                transfer: true
                                            },
                                            style:{
                                                display: 'inline-block'
                                            }
                                        },
                                        [
                                            h(
                                            "div",
                                            {
                                                style: {
                                                    marginLeft: "5px",
                                                    width: "52px",
                                                    height: "20px",
                                                    color: "#495060",
                                                    lineHeight: "20px",
                                                    textAlign: "center",
                                                    background: "#EBECF0",
                                                    borderRadius: "4px",
                                                    display: "inline-block"
                                                },
                                            },
                                            "已分班")
                                        ]
                                    )
                                : (params.row.isExpired == "1"
                                    ? h(
                                        "div",
                                        {
                                            style: {
                                                marginLeft: "5px",
                                                width: "52px",
                                                height: "20px",
                                                color: "#495060",
                                                lineHeight: "20px",
                                                textAlign: "center",
                                                background: "#EBECF0",
                                                borderRadius: "4px",
                                                display: "inline-block"
                                            },
                                        },
                                        "已过期")
                                : "")
                            ]
                        );
                    }
                },
                {
                    title: "已报课程",
                    tooltip: true,
                    width: null,
                    resizable: true,
                    key: "courseName"
                },
                {
                    title: "剩余课时",
                    tooltip: true,
                    width: null,
                    resizable: true,
                    key: "remainMoneyCourseHour",
                    render(h, params) {
                        return h(
                            "div",
                            {
                                style: {
                                    color:
                                        params.row.remainMoneyCourseHour == 0
                                            ? "#FF3000"
                                            : ""
                                }
                            },
                            params.row.remainMoneyCourseHour
                        );
                    }
                },
                {
                    title: this.$t('classlist_compontents_detailinfo_45'),
                    width: null,
                    resizable: true,
                    key: "doAction",
                    render: (h, params) => {
                        return h(
                            "a",
                            {
                                props: {
                                    type: "text",
                                    size: "small"
                                },
                                style: {},
                                on: {
                                    click: () => {
                                        // if (params.row.isAssigned == 1) {
                                        //     this.$Message.warning(
                                        //         "该学员已经分班,不能报班"
                                        //     );
                                        //     return;
                                        // }
                                        if (params.row.remainMoneyCourseHour <= 0) {
                                            this.$Message.warning("剩余课时小于等于零,不能报班");
                                            return;
                                        }
                                        if (params.row.isExpired == '1') {
                                            this.$Message.warning("该学员已过期，请延期后，入班");
                                            return;
                                        }
                                        if (this.isEdit) {
                                            this.$Message.warning("请先保存当前的操作~");
                                            return;
                                        }
                                        this.reportClass(params);
                                    }
                                }
                            },
                            "报班"
                        );
                    }
                }
            ],
            tableDataList1: [],
            columns2: [
                {
                    title: "学生姓名",
                    width: null,
                    resizable: true,
                    tooltip: true,
                    key: "studentName"
                },
                {
                    title: "首课日期",
                    tooltip: true,
                    width: null,
                    resizable: true,
                    slot: "startDate"
                },
                {
                    title: this.$t('classlist_compontents_detailinfo_45'),
                    width: null,
                    resizable: true,
                    slot: "doAction"
                }
            ],
            data2: [],
            editIndex: -1,
            ReasonShow: false,
            ReasonShow1: false
        };
    },
    components: {},
    mounted() {
        this.ClassGetData();
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        changeSearchCourseId(val) {
            // this.courseId = val;
        },
        // row.comStudentCourseRelList.auditStatus
        comStudentCourseRelList(row) {
            let arrBool = row.comStudentCourseRelList.some(item => {
                return (
                    item.auditStatus == "unaudit" ||
                    item.auditStatus == "auditing"
                );
            });
            return arrBool;
        },
        /* comStudentCourseRelListReject(row) {
                let arrBool = row.comStudentCourseRelList.some((item) => {
                    return item.auditStatus == 'reject'
                })
                let val=arrBool?'reject':''
                return val
            }, */
        comStudentCourseRelList1(row) {
            // let arrBool = row.comStudentCourseRelList.some((item) => {
            // 	return item.auditStatus == 'agree'
            // })
            // return arrBool
            // status='quit' || isStudying='0'
            // let stop = (row.status == "quit"|| row.status=='finish'||row.isStudying=='0');
            let stop = row.isStudying == '0';
            return stop;
        },
        clearSingleSelect() {
            alert(111);
        },
        remoteCourseId(query) {
            if (this.loadingCourseId) {
                return;
            }
            this.getcourseListData(query);
        },
        getcourseListData(query) {
            this.loadingCourseId = true;
            let params = {
                name: query,
                pageSize: 0,
                officeId: this.$route.query.officeId
                    ? this.$route.query.officeId
                    : this.ClassData.office.id
            };
            console.log(params);
            common
                .listPageByOffice(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.getcourseList = res.data.data.list;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    setTimeout(() => {
                        this.loadingCourseId = false;
                    }, 500);
                    this.updateLoadingStatus({
                        isLoading: false
                    });
                });
        },
        startDateChange1(val) {
            this.formValidate.startDate = val;
        },
        cancelRightBtn() {
            this.ReasonShow1 = false;
        },
        okRightBtn() {
            this.$refs["startDateRef"].validate(validres => {
                if (validres) {
                    this.updateLoadingStatus({
                        isLoading: true
                    });
                    // return;
                    this.LeftChooseArr.filter(item => {
                        item.startDate = this.formValidate.startDate;
                    });
                    let obj = [];
                    this.LeftChooseArr.filter(item => {
                        obj.push({
                            classId: this.ClassData.id,
                            studentId: item.studentId,
                            studentCourseId: item.id,
                            startDate: item.startDate
                        });
                    });
                    jwClassCourse
                        .studentJoinClass(obj)
                        .then(valid.call(this))
                        .then(res => {
                            if (res.ok) {
                                this.$Message.success(res.data.message);
                                this.toLeft = false;
                                this.ReasonShow1 = false;
                                this.toRight = false;
                                this.listPageClassStudent();
                                this.comStudentCourseRellistPage();
                                this.formListFn();
                            }
                        })
                        .catch(errors.call(this))
                        .finally(() => {
                            this.updateLoadingStatus({
                                isLoading: false
                            });
                        });
                } else {
                    this.$Message.error("信息不完整,暂不能修改!");
                    this.updateLoadingStatus({
                        isLoading: false
                    });
                }
            });
        },
        startDateChange(index) {},
        ClassGetData() {
            this.updateLoadingStatus({
                isLoading: true
            });
            //顶部详情数据
            jwClassCourse
                .form({
                    id: this.$route.query.id
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.ClassData = res.data.data;
                        // this.courseId = res.data.data.courseId;
                        this.searchCourseId = this.ClassData.courseId;
                        this.courseName = res.data.data.courseName;
                        this.getcourseListData(res.data.data.courseName);
                        this.getRightLists();
                        this.comStudentCourseRellistPage();
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    // this.updateLoadingStatus({ isLoading: false });
                });
        },
        formListFn() {
            this.updateLoadingStatus({
                isLoading: true
            });
            //顶部详情数据
            jwClassCourse
                .form({
                    id: this.$route.query.id
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.ClassData = res.data.data;
                        // this.courseId = res.data.data.courseId;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    // this.updateLoadingStatus({ isLoading: false });
                });
        },
        //班课下学员 已报名学员
        comStudentCourseRellistPage() {
            this.updateLoadingStatus({
                isLoading: true
            });
            let param = {
                classId: this.ClassData.id, //课程编号
                courseId: this.searchCourseId, //课程编号
                studentName: this.studentName, //学生姓名
                hoursZeroFlag: this.hoursZeroFlag ? 1 : 0, //剩余课时为零标识(0:未勾选；1:已勾选)
                assignedFlag: this.assignedFlag ? 1 : 0, //已分班学员标识(0:未勾选；1:已勾选)
                expiredFlag: this.expiredFlag ? 1 : 0, //已过期(0:未勾选；1:已勾选)
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                officeId: this.$route.query.officeId
                    ? this.$route.query.officeId
                    : this.ClassData.office.id
            };
            if (this.assignedFlag) {
                let obj = {
                    orderByType: "studentCourseId",
                    orderByStatus: 2
                };
                param = Object.assign({}, obj, param);
            }
            jwClassCourse
                .comStudentCourseRellistPage(param)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.tableDataList1 = res.data.data.list;
                        //已分班可课时小于零的都不能报班 禁用
                        this.tableDataList1.filter(item => {
                            // if (item.isAssigned == 1) {
                            //     item._disabled = true;
                            // }
                            if (item.remainMoneyCourseHour <= 0) {
                                item._disabled = true;
                            }
                        });
                        this.total = res.data.data.total;
                        // this.pageNo = res.data.data.pageNum;
                        // this.pageSize = res.data.data.pageSize;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({
                        isLoading: false
                    });
                });
        },
        //查找已经报名的学员
        findLeftStudentList() {
            this.pageNo = 1
            this.comStudentCourseRellistPage();
        },
        //查看剩余课时为0的学员
        filterRemainStudentList() {
            this.pageNo = 1
            this.comStudentCourseRellistPage();
        },
        //查看过期学员
        expiredFlagStudentList() {
            this.pageNo = 1
            this.comStudentCourseRellistPage();
        },
        //查看已分班学员
        filterEvenStudent() {
            this.pageNo = 1
            this.comStudentCourseRellistPage();
        },
        //右侧
        //班课学员及学员考勤vo分页列表/本班课学员
        listPageClassStudent() {
            let param = {
                id: this.$route.query.id,
                pageNo: this.pageNo1,
                pageSize: this.pageSize1,
                studentName: this.studentName1, //学生姓名
                readFlag: this.readFlag ? 1 : 0,
                officeId: this.$route.query.officeId
                    ? this.$route.query.officeId
                    : this.ClassData.office.id
            };
            jwClassCourse
                .listPageClassStudent(param)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.data2 = res.data.data.list;
                        this.pageNo1 = res.data.data.pageNum;
                        this.pageSize1 = res.data.data.pageSize;
                        this.total1 = res.data.data.total;
                        //首课日期不能要在开班日期之后
                        let val = this.ClassData.beginDate;
                        this.optionsDisableObj = {
                            disabledDate(date) {
                                return (
                                    date &&
                                    date.valueOf() <
                                        new Date(val).getTime() +
                                            (3600 * 24 - 86400000)
                                );
                            }
                        };
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({
                        isLoading: false
                    });
                });
        },
        filterReadFlagChange() {
            this.pageNo1 = 1
            this.listPageClassStudent();
        },
        pageChange(page) {
            this.pageNo = page;
            this.comStudentCourseRellistPage();
        },
        pageSizeChange(size) {
            this.pageSize = size;
            this.pageNo = 1;
            this.findLeftStudentList();
        },
        pageChange1(page) {
            this.pageNo1 = page;
            this.listPageClassStudent();
        },
        pageSizeChange1(size) {
            this.pageSize1 = size;
            this.pageNo1 = 1;
            this.listPageClassStudent();
        },
        formatDate(da) {
            da = new Date(da);
            var year = da.getFullYear();
            var month = da.getMonth() + 1;
            month = month < 10 ? "0" + month : month;
            var date = da.getDate();
            date = date < 10 ? "0" + date : date;
            return [year, month, date].join("-");
        },
        //确认
        handleSave(row, index) {
            /* if(Number(this.total1)+1>Number(this.ClassData.memberCount)){
                   this.$Message.error('超过满班人数,不能添加')
                   return
                } */
            if (row.startDate) {
                row.startDate = this.formatDate(row.startDate.getTime());
                let params = [
                    {
                        classId: this.ClassData.id,
                        studentId: row.studentId,
                        studentCourseId: row.id,
                        startDate: row.startDate
                    }
                ];
                jwClassCourse
                    .studentJoinClass(params)
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            this.$Message.success(res.data.message);
                            this.toLeft = false;
                            this.isEdit = false;
                            this.listPageClassStudent();
                            this.formListFn();
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {});
            } else {
                this.$Message.warning({
                    top: 50,
                    content: "请选择日期",
                    duration: 3
                });
            }
        },
        //点击表格照进会苹果报班
        reportClass(params) {
            params.row.add = true;
            params.row._disabled = true;
            this.tableDataList1.splice(params.index, 1);
            this.data2.push(params.row);
            this.isEdit = true;
        },
        //取消报班的时候
        handleCancel(row, index) {
            // debugger;
            row._disabled = false;
            this.data2.splice(index, 1);
            this.tableDataList1.push(row);
            this.isEdit = false;
        },
        selectChangeLeft1(checkArr) {
            // debugger;
            checkArr.length > 0
                ? (this.toRight = true)
                : (this.toRight = false);
            /*
                checkArr.filter(item => {
                    item._disabled = true;
                    this.checkLeftArr.push(item.id);
                }); */
            this.LeftChooseArr = [...checkArr];
        },
        //向右添加
        toRightFn() {
            if (this.isEdit) {
                this.$Message.warning("请先保存当前的操作~");
                return;
            }
            let canNext = true
            this.LeftChooseArr.filter(item => {
                if(item.isExpired == '1'){
                    canNext = false
                }
            });
            if(!canNext){
                this.$Message.warning("所选学员存在已过期，请延期后，入班");
                return;
            }

            this.ReasonShow1 = true;
            this.$refs["startDateRef"].resetFields();
        },
        goToRight() {
            this.toRight = false;
            let a = this.tableDataList1.filter(item => {
                return this.checkLeftArr.indexOf(item.id) == -1;
            });
            this.tableDataList1 = a;
            this.data2 = this.data2.concat(this.LeftChooseArr);
            this.checkLeftArr = [];
        },
        //退班
        handleEdit(row, index) {
            if (this.comStudentCourseRelList(row)) {
                return;
            }
            this.$refs["quitReasonRef"].resetFields();
            this.ReasonShow = true;
            this.backData = row;
            // if(row.comStudentCourseRelList) {
            this.backCourseList = row.comStudentCourseRelList;
            // }
        },
        sendAudit(resolve) {
            this.updateLoadingStatus({ isLoading: true });
            let params = {
                auditType: "jw drop class",
                officeId: this.$route.query.officeId
                    ? this.$route.query.officeId
                    : this.ClassData.office.id,
                objectId:
                    this.backCourseList.length > 1
                        ? this.quitReasonObj.sendAudit
                        : this.backCourseList[0].id,
                studentId: this.backData.studentId
            };
            this.$refs["quitReasonRef"].validate(validres => {
                if (validres) {
                    comAuditFlow
                        .sendAudit(params)
                        .then(valid.call(this))
                        .then(res => {
                            if (res.ok) {
                                this.$Message.success(res.data.message);
                                resolve("ok");
                            } else {
                                this.$Message.error(res.data.message);
                            }
                        })
                        .catch(errors.call(this))
                        .finally(() => {
                            this.updateLoadingStatus({
                                isLoading: false
                            });
                        });
                }
            });
            // }
        },
        cacelBtn() {
            this.ReasonShow = false;
            this.$refs["quitReasonRef"].resetFields();
        },
        studentQuitClass(resolve) {
            let params;
            let quitReason = this.quitReasonObj.quitReason;
            //  if (!this.MoreData) {
            params = [
                {
                    id: this.backData.id,
                    classId: this.backData.classId,
                    /*    studentCourseId: this.backData.studentCourseId, */
                    quitReason: quitReason
                }
            ];
            jwClassCourse
                .studentQuitClass(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        resolve("ok");
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
        },
        rejectSendAudit() {
            comAuditFlow
                .rejectSendAudit({
                    id: this.backData.id
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        resolve("ok");
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
        },
        okSureBtn() {
            //点击确定退班交互  //列中的退班
            //   this.rejectSendAudit();
            //   return
            let p1 = new Promise((resolve, reject) => {
                this.sendAudit(resolve);
            });
            let p2 = new Promise((resolve, reject) => {
                this.studentQuitClass(resolve);
            });
            Promise.all([p1, p2])
                .then(result => {
                    console.log(result); //["ok", "ok"]
                    if (result[0] == "ok" && result[1] == "ok") {
                        // this.$Message.success('送审成功')
                        this.$refs["quitReasonRef"].resetFields();
                        this.listPageClassStudent();
                        this.ReasonShow = false;
                        this.isEdit = false;
                        this.findLeftStudentList()
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        /*  selectChangeLeft2(checkArr) {
               // debugger;
               checkArr.length > 0 ? (this.toLeft = true) : (this.toLeft = false);
               checkArr.filter(item => {
                 item.del = true;
                 this.checkLeftArr.push(item.studentCourseId);
               });
               this.LeftChooseArr = [...checkArr];
             }, */
        //向左添加
        toLeftFn() {
            // debugger;
            this.ReasonShow = true;
            this.MoreData = true;
            //多选的退班
            let a = [];
            this.LeftChooseArr.filter(function(item) {
                a.push(item.studentName);
            });
            this.backData.studentName = a.join(",");
        },
        getRightLists() {
            //获取右侧列表
            this.pageNo1 = 1
            this.listPageClassStudent();
        }
    }
};

//可能用到的接口
// 页面 班课详情
//1, 进入页面 获取 页面基本信息 ，包括1） 班课信息，2）获取本班课学员列表
//2，已报名学员里课时和付款状态，通过字典项获取，其中付款状态可能不需要
//3，已报名学员，列表获取，参数包括，1课时，2学生姓名，3付款状态，4当前页，5每页数据条数，6课时剩余为0的学员，7已分班学员
//4，已报名学员报班接口，学生id
//5，本班课学员，获取列表接口，1学生姓名，2查看所有报读过本班课的学员，3当前页，4每页数据条数
//6，本班课学员，学员退班接口，参数，学生id
</script>
