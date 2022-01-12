<style lang="less">
.classAttendance {
    .mytable {
        margin-top: 10px;
        width: 100%;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        padding: 0 16px;
    }
}
</style>
<template>
    <div class="classAttendance">
        <v-search-collapse
            ref="searchCollapse"
            @search="SearchList"
            @reset="resetSearch"
            @changeDivHeight="changeDivHeight"
        >
            <div class="treeSelectCos" style="width: 224px;">
                <treeselect
                    sortValueBy="INDEX"
                    :flat="false"
                    :noOptionsText="''"
                    :alwaysOpen="false"
                    :multiple="true"
                    :default-expand-level="2"
                    :limit="1"
                    :limitText="count => `${count}+`"
                    :value-consists-of="valueConsistsOf"
                    :placeholder="$t('modules_spoc_crm_web_src_views_clientareaaround_clientareaaround_781')"
                    v-model="GLR.officeIds"
                    :options="GLR.officeIdList"
                ></treeselect>
            </div>
            <Select v-model="gdType" style="width:200px" @on-change="changeGd">
                <Option value="1">{{$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4470')}}</Option>
                <Option value="2" :disabled="gdTime == '-1'">{{$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4471')}}</Option>
            </Select>
            <MonthRangeDatePicker
                ref="DatePicker"
                separator=" ~ "
                :options="options3"
                style="width: 224px;"
                :editable="false"
                :clearable="false"
                type="daterange"
                :placeholder="$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4472')"
                @on-open-change="setOptTime"
                v-model="GLR.month"
            ></MonthRangeDatePicker>
            <!-- <tree-select
                :placeholder="$t('modules_spoc_crm_web_src_views_clientareaaround_clientareaaround_781')"
                v-model="GLR.officeIds"
                style="width: 300px;"
                check-strictly
                :expand-all="true"
                @on-change="changeTree"
                :data="GLR.officeId"
            ></tree-select>-->
            <Input v-model="GLR.className" :placeholder="$t('mycourse_mycourse_372')"></Input>
            <Select
                filterable
                remote
                :loading="teacherLoading"
                :remote-method="teacherRemote"
                v-model="GLR.teacherId"
                clearable
                :placeholder="$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2492')"
            >
                <Option
                    v-for="item in teacherNameList"
                    :value="item.value"
                    :key="item.value"
                >{{ item.name }}</Option>
            </Select>
            <Select
                filterable
                remote
                :loading="classTeacherLoading"
                :remote-method="classTeacherRemote"
                v-model="GLR.ooId"
                clearable
                :placeholder="$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2494')"
            >
                <Option
                    v-for="item in classTeacherNameList"
                    :value="item.value"
                    :key="item.value"
                >{{ item.name }}</Option>
            </Select>

            <Select v-model="GLR.type" :placeholder="$t('modules_spoc_report_web_src_views_classattendance_classattendance_4584')" clearable filterable>
                <Option
                    v-for="item in jw_course_typeList"
                    :value="item.value"
                    :key="item.value"
                >{{ item.label }}</Option>
            </Select>
            <Select v-model="GLR.grade" :placeholder="$t('modules_spoc_report_web_src_views_classattendance_classattendance_4585')" style="width:140px;" clearable>
                <Option
                    v-for="item in jw_course_gradeList"
                    v-show="GLR.type == item.type"
                    :value="item.value"
                    :key="item.value"
                >{{ item.label }}</Option>
            </Select>
            <Select
                v-model="GLR.status"
                v-if="tableType==1"
                :placeholder="$t('mycourse_mycourse_375')"
                clearable
                filterable
            >
                <Option
                    v-for="item in classStatusList"
                    :value="item.value"
                    :key="item.value"
                >{{ item.label }}</Option>
            </Select>
            <Input v-model="GLR.stuName" :placeholder="$t('memberlist_memberlist_257')" v-if="tableType==2"></Input>
            <Input v-model="GLR.stuEnName" :placeholder="$t('classlist_compontents_detailinfo_36')" v-if="tableType==2"></Input>
            <Select
                v-model="GLR.costStatus"
                v-if="tableType==2"
                :placeholder="$t('modules_spoc_jw_web_src_views_models_2937')"
                clearable
                filterable
            >
                <Option
                    v-for="item in costStatusList"
                    :value="item.value"
                    :key="item.value"
                >{{ item.label }}</Option>
            </Select>
        </v-search-collapse>
        <journaling
            ref="classTable"
            v-if="defaultShowCol"
            class="mytable"
            :showSummary="false"
            :tableName="tableName"
            :tableData="tableData"
            :tableColumnArray="tableColumnArray"
            :defaultShowCol="defaultShowCol"
            :btnList="btnList"
            :tableHeightOut="tableHeightOut"
            @selectionChange="selectionChange"
            @changeTableType="changeTableType"
            :hasPage="hasPage"
            :total="total"
            :current="pageNo"
            :pageSize="pageSize"
            @pageChange="pageChange"
            @pageSizeChange="pageSizeChange"
        ></journaling>
        <Modal
            v-model="exportMonthModal"
            :title="$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4479')"
            :loading="exportMonthModalLoading"
            width="300"
            @on-ok="exportOk"
            @on-cancel="exportCancel">
            <MonthRangeDatePicker
                v-model="exportMonth"
                ref="exportDatePicker"
                type="daterange"
                style="width: 224px;"
                :placeholder="$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4480')"
                :clearable="false"
                separator=" ~ ">
            </MonthRangeDatePicker>
        </Modal>
    </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import bigTable from "@public/modules/bigTable.vue";
import vSearchCollapse from "@public/modules/vSearchCollapse";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import journaling from "../../modules/journaling";
import {
    waitUntil,
    MonthrangeOpt,
    getMonthEndDay,
    defaultDatePickerValue,
    titleTransformationToLabel,
    getSelectIdsByid,
    getSelectTreeDataByid,
    noGdMonth, 
    hasGdMonth,
} from "@public/libs/util";
import valid, {
    errors,
    sysUser,
    sysCommonSql,
    sysDict,
    report,
    rptArchiveSchedule
} from "./../../libs/request";
export default {
    name: "report.classAttendance",
    components: {
        bigTable,
        vSearchCollapse,
        Treeselect,
        journaling
    },
    mounted() {
        this.batchListData(); //年级列表接口  课程包全部分类接口   //上课状态下拉
        this.getTreeDatas();
    },
    computed: {
        ...mapState(["app", "calendarConfig"])
    },
    data() {
        return {
            exportMonthModalLoading: true,
            exportMonthModal: false,
            exportMonth: [],
            gdType: '1',
            gdTime: '',
            storageDataObj: {
                "1": {},
                "2": {}
            },
            options3: null,
            hasPage: true,
            total: 0,
            pageNo: 1,
            pageSize: this.$store.state.app.pageSizeGlobal || 10,
            parentOfficeId: "",
            ininOfficeIdList: [],
            valueConsistsOf: "LEAF_PRIORITY", // ALL、BRANCH_PRIORITY、、ALL_WITH_INDETERMINATE
            jw_course_typeList: [],
            classStatusList: [],
            costStatusList: [
                {
                    value: "0",
                    label: this.$t('modules_spoc_report_web_src_views_classattendance_classattendance_4592')
                },
                {
                    value: "1",
                    label: this.$t('modules_spoc_report_web_src_views_classattendance_classattendance_4593')
                }
            ],
            jw_course_gradeList: [],
            tableHeightOut: 72, //324,
            teacherLoading: false,
            assistLoading: false,
            classTeacherLoading: false,
            teacherNameList: [],
            assistNameList: [],
            classTeacherNameList: [],
            tableType: "1",
            GLR: {
                className: '',
                teacherId: '',
                ooId: '',
                type: '',
                grade: '',
                status: '',
                costStatus: '',
                stuName: '',
                stuEnName: '',
                officeIds: [],
                officeIdList: [],
                month: []
            },
            tableName: [
                {
                    name: this.$t('modules_spoc_report_web_src_views_classattendance_classattendance_4594'),
                    value: "1"
                },
                {
                    name: this.$t('modules_spoc_report_web_src_views_classattendance_classattendance_4595'),
                    value: "2"
                }
            ],
            selection: [],
            // updateShowTitle: report.rptGroupClassArchiveUpdateShowTitle,
            // updateShowTitleKey: "RptGroupClassArchiveVO",
            defaultShowCol: null,
            tableColumnArray: [],
            tableColumnArray1: [],
            tableColumnArray2: [],
            tableData: [{}],
            btnList: [
                {
                    style: {},
                    type: "",
                    btnClick: this.exportAll,
                    text: this.$t('integralflow_5')
                }
            ]
        };
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        // 获取归档时间点
        getArchiveDate(){
            this.updateLoadingStatus({ isLoading: true });
            rptArchiveSchedule
            .findRecentlyArchiveDate({
                "officeIds": this.GLR.officeIds,
            })
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    // console.log(res.data.data, 'gdTime')
                    this.gdTime = res.data.data // 归档时间节点，如果是-1则全是未月结
                    this.findRecentlyArchiveDate(true)
                } else {
                    this.updateLoadingStatus({ isLoading: false });
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },
        exportOk(){
            if(this.exportMonth && !this.exportMonth[0]){
                this.$Message.error(this.$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4488'))
                this.exportMonthModal = true
                this.exportMonthModalLoading = false
                setTimeout(()=>{
                    this.exportMonthModalLoading = true
                },0)
            } else {
                this.updateLoadingStatus({ isLoading: true });

                let param = this.storageDataObj[this.tableType].searchObj
                param.officeIds = this.GLR.officeIds;//校区id
                param.startTime = new Date(this.exportMonth[0]).format('yyyy-MM-01 00:00:00')
                param.endTime = getMonthEndDay(new Date(this.exportMonth[1]).format('yyyy-MM'));
                report
                .rptGroupClassArchiveExportFile(param)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        const blob = new Blob([res.data], {
                            type: "application/actet-stream;charset=utf-8"
                        });
                        const contentDisposition =
                            res.headers["content-disposition"]; //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
                        const patt = new RegExp(
                            "filename=([^;]+\\.[^\\.;]+);*"
                        );
                        const result = patt.exec(contentDisposition);
                        if (!result) {
                            this.$Message.error(this.$t("integralflow_19"));
                            return;
                        }
                        const filename = decodeURIComponent(result[1]);
                        const downloadElement = document.createElement("a");
                        const href = window.URL.createObjectURL(blob); //创建下载的链接
                        downloadElement.style.display = "none";
                        downloadElement.href = href;
                        downloadElement.download = filename; //下载后文件名
                        document.body.appendChild(downloadElement);
                        downloadElement.click(); //点击下载
                        document.body.removeChild(downloadElement); //下载完成移除元素
                        window.URL.revokeObjectURL(href);
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.exportMonthModal = false
                    this.exportMonthModalLoading = false
                    setTimeout(()=>{
                        this.exportMonthModalLoading = true
                    },0)
                    this.updateLoadingStatus({ isLoading: false });
                });
            }
        },
        exportCancel(){
            this.exportMonthModal = false
        },
        pageSizeChange(val){
            console.log(val, 'pageSizeChange')
            this.pageSize = val
            if(this.pageNo == 1){
                this.getListData()
            }
        },
        pageChange(val){
            console.log(val, 'pageChange')
            this.pageNo = val
            this.getListData()
        },
        setOptTime(flag){
            if(flag){
                this.GLR.month=[];
            }
        },
        changeGd(val){
            this.pageNo = 1
            this.GLR.month = [];
            this.findRecentlyArchiveDate(false,true)
        },
        // 设置日期可选范围。并设置默认筛选日期
        findRecentlyArchiveDate(isInit,noSetMonth){
            let _this = this
            if(this.gdTime != '-1'){
                if(this.gdType == '1'){ // 未月结
                    // 拼接未月结时间点。为某个月最后一天的23:59:59。
                    // 注意，未月结要在归档节点上加1000毫秒。这样拿到下个月的一号
                    let _gdTime = new Date(new Date(this.gdTime).getTime() + 1000)
                    let _gdTimeStrYear = _gdTime.getFullYear()
                    let _gdTimeStrMonth = _gdTime.getMonth() + 1
                    let _gdTimeStr = _gdTimeStrYear + '-' + (_gdTimeStrMonth < 10 ? '0' + _gdTimeStrMonth : _gdTimeStrMonth)
                    //设置未月结月份可选范围
                    this.options3 = noGdMonth(_this, _gdTimeStr, 'DatePicker',Number(this.calendarConfig.maxMonthInterval))
                    
                    // if(!noSetMonth){
                        let months = this.GLR.month[0] ? this.GLR.month : defaultDatePickerValue(this.calendarConfig.maxMonthInterval)
                        if(new Date(months[0]).getTime() < new Date(_gdTimeStr).getTime()){
                            // 判断开始月份是否超过了归档点。超过修改开始月份为归档点（加1000后的归档点）
                            months[0] = new Date(_gdTimeStr)
                        }
                        this.GLR.month = months
                    // }
                } else { // 已月结
                    // 拼接已月结时间点。为某个月最后一天的23:59:59。
                    // 注意，这里不需要加1000
                    let _gdTime = new Date(new Date(this.gdTime).getTime())
                    let _gdTimeStrYear = _gdTime.getFullYear()
                    let _gdTimeStrMonth = _gdTime.getMonth() + 1
                    let _gdTimeStr = _gdTimeStrYear + '-' + (_gdTimeStrMonth < 10 ? '0' + _gdTimeStrMonth : _gdTimeStrMonth)
                    //设置已月结月份可选范围
                    this.options3 = hasGdMonth(_this, _gdTimeStr, 'DatePicker',Number(this.calendarConfig.maxMonthInterval))
                    
                    // if(!noSetMonth){
                        let months = this.GLR.month[0] ? this.GLR.month : defaultDatePickerValue(this.calendarConfig.maxMonthInterval)
                        if((new Date(months[0]).getTime() < new Date(_gdTimeStr).getTime()) && (new Date(months[1]).getTime() < new Date(_gdTimeStr).getTime())){
                            // 开始月份、结束月份 都比归档点超前，无需修改
                        } else if((new Date(months[0]).getTime() < new Date(_gdTimeStr).getTime()) && (new Date(months[1]).getTime() < new Date(_gdTimeStr).getTime())){
                            // 开始月份超前。但结束月份比归档点晚。 则设置结束月份为归档点
                            months[1] = new Date(_gdTimeStr)
                        } else {
                            // 如果开始月份、结束月份都比结束月份晚。则修改结束点为归档点，开始点为结束点 减去 配置月份跨度数
                            let dateStart = new Date(_gdTimeStr)
                            let dateEnd = new Date(_gdTimeStr)
                            months[1] = dateEnd
                            dateStart.setMonth(dateStart.getMonth() - (Number(this.calendarConfig.maxMonthInterval) -1))
                            months[0] = dateStart
                        }
                        this.GLR.month = months
                    // }
                }
            } else {
                // 只有未月结数据
                this.gdType = '1'
                
                this.options3 = MonthrangeOpt(this,'DatePicker',Number(this.calendarConfig.maxMonthInterval))
                // if(!noSetMonth){
                    if(this.GLR.month && this.GLR.month[0]){
                        //有选中的月份。无需修改
                    } else {
                        this.GLR.month = defaultDatePickerValue(this.calendarConfig.maxMonthInterval)
                    }
                // }
            }
            if(isInit){
                this.getShowTitle(noSetMonth);
            }
        },
        exportAll() {
            this.exportMonth = [].concat(this.GLR.month)
            this.exportMonthModal = true
        },
        getTreeDatas() {
            this.updateLoadingStatus({ isLoading: true });
            sysUser
                .dataScopeFilterTree()
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        if (Array.isArray(res.data.data.children)) {
                            // let officeIdList = res.data.data.children;
                            // this.parentOfficeId = officeIdList[0].id;
                            // titleTransformationToLabel(officeIdList);
                            // this.ininOfficeIdList = JSON.parse(
                            //     JSON.stringify(officeIdList)
                            // );
                            // this.initOffice();
                            let officeIdList = res.data.data.children;
                            this.parentOfficeId = officeIdList[0].id;
                            titleTransformationToLabel(officeIdList);
                            this.ininOfficeIdList = JSON.parse(
                                JSON.stringify(officeIdList)
                            );
                            // this.GLR.officeIdList = officeIdList;
                            // console.log(this.GLR.officeIdList, this.parentOfficeId,'this.GLR.officeIdList')
                            waitUntil(
                                () => {
                                    return (
                                        (this.app.currOfficeId &&
                                            this.calendarConfig
                                                .maxMonthInterval) ||
                                        false
                                    );
                                },
                                () => {
                                    this.initOffice();
                                }
                            );
                        }
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        initOffice() {
            if (
                this.app.currOfficeId == "all" ||
                this.app.currOfficeId == this.parentOfficeId
            ) {
                this.$set(this.GLR, "officeIdList", this.ininOfficeIdList);
                this.$set(this.GLR, "officeIds", []);
                this.$nextTick(() => {
                    this.$forceUpdate();
                    this.getArchiveDate()
                });
            } else {
                let resultSelectObj = {};
                getSelectTreeDataByid(this.ininOfficeIdList, resultSelectObj);
                let resultIdsObj = {};
                getSelectIdsByid(this.ininOfficeIdList, resultIdsObj);
                this.$set(this.GLR, "officeIdList", [
                    resultSelectObj[this.app.currOfficeId]
                ]);
                this.$set(
                    this.GLR,
                    "officeIds",
                    resultIdsObj[this.app.currOfficeId]
                );
                this.$nextTick(() => {
                    this.$forceUpdate();
                    this.getArchiveDate()
                });
            }
        },
        changeTree(val) {
            console.log("val" + val);
        },
        batchListData() {
            let types = "jw_course_type,jw_lesson_status"; //课程包分类,适用年级
            sysDict
                .batchListData({
                    types
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.jw_course_typeList = res.data.data.jw_course_type;
                        this.classStatusList = res.data.data.jw_lesson_status;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
            /* 年级 */
            let type = "jw_course_type";
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
        changeDivHeight(height) {
            this.tableHeightOut = height;
        },
        teacherRemote(query) {
            this.getSearchList("teacher_id", query);
        },
        assistRemote(query) {
            this.getSearchList("assist_id", query);
        },
        classTeacherRemote(query) {
            this.getSearchList("class_teacher_id", query);
        },
        getSearchList(userType, query) {
            if (query !== "") {
                if (userType == "teacher_id") {
                    this.teacherLoading = true;
                } else if (userType == "assist_id") {
                    this.assistLoading = true;
                } else if (userType == "class_teacher_id") {
                    this.classTeacherLoading = true;
                }
                let obj = {
                    mainTable: "jw_class_course",
                    mainField: userType,
                    joinField: "id",
                    joinTable: "sys_user",
                    secondField: "name",
                    joinTableSearchParam: query
                };
                sysCommonSql
                    .queryPageInputInitData(obj)
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            if (userType == "teacher_id") {
                                this.teacherLoading = false;
                                this.teacherNameList = res.data.data;
                            } else if (userType == "assist_id") {
                                this.assistLoading = false;
                                this.assistNameList = res.data.data;
                            } else if (userType == "class_teacher_id") {
                                this.classTeacherLoading = false;
                                this.classTeacherNameList = res.data.data;
                            }
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {
                        // this.updateLoadingStatus({ isLoading: false });
                    });
            }
        },
        changeTableType(val) {
            this.tableType = val;
            this.tableColumnArray = [].concat(this["tableColumnArray" + val]);
            // if(val == '2'){
            //     this.hasPage = true
            // } else {
            //     this.hasPage = false
            // }
            if (this.storageDataObj[this.tableType].data) {
                this.defaultShowCol = this.storageDataObj[this.tableType].defaultShowCol
                this.tableData = this.storageDataObj[this.tableType].data;
                let searchObj = this.storageDataObj[this.tableType].searchObj;
                if (searchObj) {
                    this.GLR.className = searchObj.className
                    this.GLR.teacherId = searchObj.teacherId
                    this.GLR.ooId = searchObj.ooId
                    this.GLR.type = searchObj.type
                    this.GLR.grade = searchObj.grade
                    this.GLR.status = searchObj.status 
                    this.GLR.costStatus = searchObj.costStatus 
                    this.GLR.stuName = searchObj.stuName 
                    this.GLR.stuEnName = searchObj.stuEnName
                    this.GLR.officeIds = searchObj.officeIds
                    this.GLR.month = searchObj.month
                    this.gdType = searchObj.gdType
                    this.total = searchObj.total
                    this.pageNo = searchObj.pageNo
                    this.pageSize = searchObj.pageSize
                }
                // this.getShowTitle(true);
                this.findRecentlyArchiveDate(false,true)
            } else {
                this.tableData = [];
                this.GLR.month = []
                // this.GLR.officeIds = []
                this.gdType = '1'
                this.total = 0
                this.pageNo = 1
                this.findRecentlyArchiveDate(true,false)
            }
            this.$nextTick(() => {
                this.$refs.searchCollapse.initDom();
            })
        },
        SearchList() {
            this.pageNo = 1;
            this.findRecentlyArchiveDate(true)
        },
        resetSearch() {
            for (let item in this.GLR) {
                if (item != "officeIdList" &&item != "officeIds") {
                    this.GLR[item] = "";
                }
            }
            this.$set(this.GLR, "officeIds", []);
            this.tableData = [];
            this.gdType = '1'
            this.total = 0
            this.pageNo = 1
            this.initOffice();
        },
        //获取数据，根据情况修改接口、传参
        getListData() {
            this.updateLoadingStatus({ isLoading: true });
            let myRequestList;
            let param = {
                orderByType: "",
                orderByStatus: "2"
            };
            param = Object.assign({}, param, this.GLR);
            delete param.officeIdList;
            param.startTime =
                new Date(this.GLR.month[0]).format("yyyy-MM") +
                "-01 00:00:00";
            param.endTime = getMonthEndDay(
                new Date(this.GLR.month[1]).format("yyyy-MM")
            );
            delete param.month
            // this.hasPage = false;
            param.pageNo = this.pageNo;
            param.pageSize = this.pageSize;
            param.archiveStatus = this.gdType
            if (this.tableType == "1") {
                myRequestList = report.rptGroupClassArchiveListPage(param);
            } else if (this.tableType == "2") {
                myRequestList = report.rptGroupClassArchiveListDetailPage(param);
            }
            myRequestList
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let result = res.data.data;
                        this.tableData = result.list;
                        this.total = Number(result.total);
                        // if (this.tableType == "2") {
                        //     this.tableData = result.list;
                        //     this.total = Number(result.total);
                        // } else {
                        //     this.tableData = result;
                        // }
                        this.storageDataObj[this.tableType].data = this.tableData;
                        let _data = Object.assign({},this.GLR)
                        _data.gdType = this.gdType
                        // if(this.tableType == "2"){ // 明细
                            _data.total = Number(this.total)
                            _data.pageNo = Number(this.pageNo)
                            _data.pageSize = Number(this.pageSize)
                        // }
                        this.storageDataObj[this.tableType].searchObj =_data
                        console.log(this.storageDataObj,"this.storageDataObj~~~")
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        //可选方法，如果是多选的话必须有
        selectionChange(selection) {
            this.selection = selection;
        },
        //必须方法，获取默认显示的可选列  接口根据需要自行更换，每个模块的接口是不一致的
        getShowTitle(noSearch) {
            let param = {};
            // let myRequestShowTitle;
            if (this.tableType == "1") {
                param = {
                    pageIdentifier: "RptGroupClassArchiveVO",
                    voName:
                        "com.windliven.spoc.modules.rpt.vo.RptGroupClassArchiveVO"
                };
                // this.hasPage = false;
            } else if (this.tableType == "2") {
                param = {
                    pageIdentifier: "RptGroupClassArchiveDetailVO",
                    voName:
                        "com.windliven.spoc.modules.rpt.vo.RptGroupClassArchiveDetailVO"
                };
                // this.hasPage = true;
            }
            report
                .rptGroupClassArchiveGetShowTitle(param)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.defaultShowCol = res.data.data;
                        this.storageDataObj[this.tableType].defaultShowCol = res.data.data
                        if (!noSearch) {
                            this.getListData();
                        }
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
        }
    },
    watch: {
        "app.currOfficeId": function(val, oldVal) {
            if (oldVal && this.$route.name == "report.classAttendance") {
                this.pageNo = 1
                this.initOffice();
            }
        }
    }
};
</script>
