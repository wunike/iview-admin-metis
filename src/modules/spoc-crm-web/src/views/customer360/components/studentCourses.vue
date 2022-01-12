<style lang="less">
.student-courses-container {
    position: relative;
    height: 100%;
    .table-wrapper {
        margin-top: 10px;
        padding: 18px 16px;
        min-height: ~"calc(100% - 88px)";
        background: #fff;
    }
    .page-wrapper {
        padding-top: 16px;
        padding-bottom: 4px;
        text-align: center;
    }
}
</style>
    
<template>
    <div class="student-courses-container">
        <v-search-collapse
            style="background: #fff;"
            @search="SearchList"
            @reset="resetSearch"
            @changeDivHeight="changeDivHeight"
            class="searchCollapse"
        >
            <!-- <input-select ref="inputstudentNameLists" :dataList="studentNameLists" :placeholder="$t('mycourse_mycourse_372')" @returnSelect="selectStudentName" idName="value"></input-select>
            <Input v-model="params.teacherName" :placeholder="$t('courselist_12')"/>-->
            <DatePicker
                v-model="startDate"
                type="daterange"
                @on-change="SignTimeChange"
                placement="bottom-start"
                separator=" ~ "
                :placeholder="$t('courselist_compontents_modify_180')"
                style="width:224px;"
            ></DatePicker>
            <Select v-model="findObj.officeId" clearable :placeholder="$t('courselist_courselist_225')" style="width:224px;">
                <Option
                    v-for="item in officeIdList"
                    :value="item.id"
                    :key="item.value"
                >{{item.code}}{{ item.name }}</Option>
            </Select>
            <Input
                :placeholder="$t('mycourse_mycourse_372')"
                v-model="findObj.classCourseName"
                style="width:224px;margin-right:12px;"
            ></Input>
            <Select
                v-model="findObj.type"
                :placeholder="$t('courselist_courselist_223')"
                @on-change="changeType"
                style="width:224px;"
                clearable
            >
                <Option
                    v-for="item in jw_course_typeList"
                    :value="item.value"
                    :key="item.value"
                >{{ item.label }}</Option>
            </Select>
            <Select v-model="findObj.grade" :placeholder="$t('messagemanagement_index_355')" style="width:224px;" clearable>
                <Option
                    v-for="item in jw_course_gradeList"
                    :value="item.value"
                    :key="item.value"
                    v-show="findObj.type == item.type"
                >{{ item.label }}</Option>
            </Select>

            <!-- multiple -->
            <Select
                filterable
                remote
                :loading="teacherLoading"
                :remote-method="teacherRemote"
                :placeholder="$t('courselist_12')"
                v-model="findObj.teacherId"
                clearable
                style="width:224px;"
            >
                <Option v-for="item in teacherList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
            <Select
                filterable
                remote
                :loading="classTeacherLoading"
                :remote-method="classTeacherRemote"
                :placeholder="$t('mycourse_mycourse_374')"
                v-model="findObj.classTeacherId"
                clearable
                style="width:224px;"
            >
                <Option
                    v-for="item in classTeacherList"
                    :value="item.id"
                    :key="item.id"
                >{{ item.name }}</Option>
            </Select>
        </v-search-collapse>
        <div class="table-wrapper">
            <Tabs @on-click="tabStatusTabs" v-model="tabValue">
                <!-- absent:缺勤，none：未考勤，present：出勤 -->
                <TabPane :label="$t('message_index_287')" name="All"></TabPane>
                <TabPane :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentcourses_921')" name="present"></TabPane>
                <TabPane :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentcourses_922')" name="absent"></TabPane>
                <TabPane :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentcourses_923')" name="none"></TabPane>
            </Tabs>
            <Table :columns="columns" :data="tableData" border></Table>
            <div class="page-wrapper" v-if="dataTotal > 1">
                <Page
                    :current="pageNo"
                    v-if="dataTotal > 1"
                    :total="dataTotal"
                    show-elevator
                    show-total
                    show-sizer
                    :page-size="pageSize"
                    @on-change="pageChange"
                    @on-page-size-change="pageSizeChange"
                ></Page>
            </div>
        </div>
    </div>
</template>

<script>
/**
 ** @author: 曹见芳
 ** 客户360 - 课程教学
 */
import vSearchCollapse from "@public/modules/vSearchCollapse";
// import inputSelect from "@public/modules/inputSelect";
import valid, {
    errors,
    sysUser,
    sysDict,
    crmCustomerDetail
} from "../../../libs/request";
import { mapMutations, mapState } from "vuex";
import { waitUntil } from "@public/libs/util";
export default {
    name: "studentCourses",
    components: {
        vSearchCollapse
        // inputSelect
    },
    props: {},
    data() {
        return {
            tabValue: "All",
            pageNo: 1,
            pageSize: this.$store.state.app.pageSizeGlobal,
            dataTotal: 0, //数据总数
            startDate: [],
            teacherLoading: false,
            // assistLoading: false,
            classTeacherLoading: false,
            teacherList: [],
            // assistList: [],
            classTeacherList: [],
            findObj: {
                startTime: "", //开始上课时间
                endTime: "", //end上课时间
                officeId: "",
                classCourseName: "",
                type: "",
                grade: "",
                teacherId: "",
                classTeacherId: "",
                status: ""
            },
            jw_course_typeList: [],
            jw_course_gradeList: [],
            officeIdList: [],
            tableHeightOut: 72, //324,
            studentNameLists: [],
            params: {
                teacherName: ""
            },
            tableData: [],
            columns: [
                {
                    title: "班课名称",
                    width: null,
                    resizable: true,
                    key: "classCourseName"
                },
                {
                    title: "课程分类",
                    width: null,
                    resizable: true,
                    key: "type"
                },
                {
                    title: "考勤状态",
                    width: null,
                    resizable: true,
                    key: "attendanceStatusName",
                    render: (h, params) => {
                        // 考勤状态 absent:缺勤，none：未考勤，present：出勤
                        let text = "";
                        let color = "";
                        if (params.row.attendanceStatus == "none") {
                            color = "#999";
                        } else if (params.row.attendanceStatus == "present") {
                            color = "#44BCB7";
                        } else if (params.row.attendanceStatus == "absent") {
                            color = "#E64630";
                        }
                        return h("div", [
                            h("span", [
                                h("span", {
                                    style: {
                                        width: "4px",
                                        height: "4px",
                                        background: color,
                                        display: "inline-block",
                                        marginRight: "8px",
                                        borderRadius: "50%"
                                    }
                                }),
                                params.row.attendanceStatusName
                            ])
                        ]);
                    }
                },
                {
                    title: "校区",
                    width: null,
                    resizable: true,
                    key: "officeName"
                },
                {
                    title: "上课日期",
                    width: null,
                    resizable: true,
                    key: "startDate",
                    render: (h, params) => {
                        return h("div", params.row.startDate.split(" ")[0]);
                    }
                },
                {
                    title: "上课时间",
                    width: null,
                    resizable: true,
                    key: "startTime",
                    render: (h, params) => {
                        return h(
                            "div",
                            params.row.startTime.split(" ")[1].slice(0, 5) +
                                "-" +
                                params.row.endTime.split(" ")[1].slice(0, 5)
                        );
                    }
                },
                {
                    title: "课时时长",
                    width: null,
                    resizable: true,
                    key: "duration"
                },
                {
                    title: "授课教师",
                    width: null,
                    resizable: true,
                    key: "teacherName"
                },
                {
                    title: "服务OO",
                    width: null,
                    resizable: true,
                    key: "classTeacherName"
                },
                {
                    title: "年级",
                    width: null,
                    resizable: true,
                    key: "grade"
                },
                {
                    title: "扣费课程",
                    width: null,
                    resizable: true,
                    key: "deductCourse"
                },
                {
                    title: "计划课时",
                    width: null,
                    resizable: true,
                    key: "plantHours"
                },
                {
                    title: "实际课时",
                    width: null,
                    resizable: true,
                    key: "factHours"
                },
                {
                    title: "备注",
                    width: null,
                    resizable: true,
                    key: "remark"
                }
            ]
        };
    },
    computed: {
        ...mapState(["app"])
    },
    mounted() {
        this.batchListData();
        this.getInitData();
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        tabStatusTabs(val) {
            this.findObj.status = val != "All" ? val : "";
            this.pageNo = 1;
            this.getListData();
        },
        //获取数据，根据情况修改接口、传参
        SearchList() {
            this.pageNo = 1;
            this.getListData();
        },
        pageSizeChange(pageSize) {
            this.pageSize = pageSize;
            this.pageNo = 1;
            this.getListData();
        },
        //分页方法 如果有分页则为必须方法，修改getCourseList为自己的获取数据方法 这里注意。不再有每页个数改变的方法了
        pageChange(pageNo, pageSize) {
            if (!pageNo) {
                //防止无用重复请求
                return;
            }
            this.pageNo = pageNo;
            // this.pageSize = pageSize;
            this.getListData();
        },
        getListData() {
            this.updateLoadingStatus({ isLoading: true });
            let param = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                // studentId: "0a5b1816-8b78-11e9-8c8e-94c6916a383b",
                studentId: this.$route.query.id ? this.$route.query.id : this.$route.query.cusId,
                officeId: ""
            };
            param = Object.assign({}, param, this.findObj);
            param.officeId = "";
            // this.findObj = param; //这里需要给findObj 赋值，导出数据的时候需要用到
            crmCustomerDetail
                .findCourseLearnPage(param)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let result = res.data.data;
                        this.tableData = result.list;
                        this.dataTotal = result.total;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        teacherRemote(query) {
            this.getSearchList(9, query);
        },
        // assistRemote(query) {
        // 	this.getSearchList(10, query);
        // },
        classTeacherRemote(query) {
            this.getSearchList(6, query);
        },
        getSearchList(userType, query) {
            if (userType == 9) {
                this.teacherLoading = true;
            }
            // else if (userType == 10) {
            // 	this.assistLoading = true;
            // }
            else if (userType == 6) {
                this.classTeacherLoading = true;
            }
            let obj = {
                roleIds: userType,
                pageSize: 10,
                pageNo: 1,
                isService: 1,
                isEnable: 1,
                officeId: this.findObj.officeId,
                name: query
            };
            sysUser
                .listDataByRole(obj)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        if (userType == 9) {
                            this.teacherLoading = false;
                            this.teacherList = res.data.data;
                        } else if (userType == 10) {
                            this.assistLoading = false;
                            this.assistList = res.data.data;
                        } else if (userType == 6) {
                            this.classTeacherLoading = false;
                            this.classTeacherList = res.data.data;
                        }
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    // this.updateLoadingStatus({ isLoading: false });
                });
        },
        SignTimeChange(date) {
            this.findObj.startTime = date[0] ? date[0] + " 00:00:00" : "";
            this.findObj.endTime = date[1] ? date[1] + " 23:59:59" : "";
        },
        getInitData() {
            var promise = new Promise((resolve, reject) => {
                //校区列表
                sysUser
                    .dataScopeFilter()
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            resolve(res);
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {});
            });
            promise.then(res => {
                if (res.ok) {
                    this.officeIdList = res.data.data;
                    waitUntil(
                        () => {
                            if (this.app.currOfficeId) {
                                 this.$set(this.findObj, "officeId", this.app.currOfficeId == "all" ? "" : this.app.currOfficeId);
                            }
                            return this.app.currOfficeId || false;
                        },
                        () => {
                            this.getListData();
                        }
                    );
                }
            });
        },
        batchListData() {
            /* 
                        类型type: cw_capital_trace_type

                        详情type: cw_capital_trace_sub_type
                    */
            let types = "jw_course_type"; //课程包分类,适用年级
            sysDict
                .batchListData({
                    types
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.jw_course_typeList = res.data.data.jw_course_type;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
            /* 年级 */
            let type = "jw_course_type"; //课程包分类,适用年级
            sysDict
                .findChildDictByParentDict({
                    type
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.jw_course_gradeList = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        resetSearch() {
            this.startDate = [];
            for (let item in this.findObj) {
                // if (item == "tags") {
                //     this.findObj[item] = [];
                // } else {
                this.findObj[item] = "";
                // }
            }
            this.pageNo = 1;
            this.$set(this.findObj, "officeId", this.app.currOfficeId == "all" ? "" : this.app.currOfficeId);
            this.getListData();
        },
        getLists() {},
        changeDivHeight(height) {
            this.tableHeightOut = height;
        },
        selectStudentName(obj) {
            // 学员姓名
            // console.log(obj)
            if (obj && obj.searchValue) {
                if (obj.searchType == "name") {
                    delete this.params.studentIds;
                    this.params.studentName = obj.searchValue;
                } else {
                    delete this.params.studentName;
                    this.params.studentIds = [obj.searchValue];
                }
                let params = {
                    mainTable: "ht_receipt",
                    mainField: "student_id",
                    joinTable: "com_student",
                    joinField: "id",
                    secondField: "name",
                    joinTableSearchParam: obj.searchValue
                };
                this.queryPageInputInitData(params, "studentName");
            } else {
                delete this.params.studentIds;
                delete this.params.studentName;
            }
        },
        queryPageInputInitData() {}
    },
    watch: {
        "app.currOfficeId": function(val, oldVal) {
            if (oldVal&& this.$route.name == "crm.customer360" ) {
                this.$set(this.findObj, "officeId", val == "all" ? "" : val);
                this.getListData();
            }
        }
    }
};
</script>


