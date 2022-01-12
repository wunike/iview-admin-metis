<style lang="less">
.student-list-class-container {
    .mytable {
        width: 100%;
        margin-top: 10px;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        padding: 0 16px;
        .subTypeNameStyle {
            margin-left: 11px;
            .ivu-table-cell {
                margin-left: 11px;
            }
        }
    }
}
</style>
<template>
    <div class="student-list-class-container">
        <v-search-collapse
            @search="SearchList"
            @reset="resetSearch"
            @changeDivHeight="changeDivHeight"
        >
            <!-- <tree-select
                :placeholder="$t('modules_spoc_crm_web_src_views_clientareaaround_clientareaaround_781')"
                v-model="GLR.officeIds"
                style="width: 224px;"
                check-strictly
                :expand-all="true"
                @on-change="changeTree"
                :data="GLR.officeIdList"
            ></tree-select>-->
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
                :clearable="false"
                separator=" ~ "
                :options="options3"
                style="width: 224px;"
                :editable="false"
                type="daterange"
                :placeholder="$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4472')"
                @on-open-change="setOptTime"
                v-model="GLR.month"
            ></MonthRangeDatePicker>
            <Input v-model="GLR.stuCode" :placeholder="$t('memberlist_5')" v-if="tableType == '1'" />
            <!-- <Input v-model="GLR.name" :placeholder="$t('memberlist_memberlist_257')" v-if="tableType == '1'" />
            <Input v-model="GLR.enName" :placeholder="$t('modules_spoc_report_web_src_views_studentlist_studentlist_4716')" v-if="tableType == '1'" /> -->
            <Select
                v-if="tableType == '1'"
                v-model="GLR.name"
                :placeholder="$t('memberlist_memberlist_257')"
                filterable
                remote
                :remote-method="remoteMethod1"
                :loading="loading1">
                <Option v-for="(option, index) in studenNameList" :value="option.id" :key="index">{{option.name}}</Option>
            </Select>
            <Select
                v-if="tableType == '1'"
                v-model="GLR.enName"
                :placeholder="$t('modules_spoc_report_web_src_views_studentlist_studentlist_4716')"
                filterable
                remote
                :remote-method="remoteMethod2"
                :loading="loading2">
                <Option v-for="(option, index) in studenEnNameList" :value="option.id" :key="index">{{option.name}}</Option>
            </Select>
            <Input
                v-if="tableType == '1'"
                v-model="GLR.phone"
                :placeholder="$t('classlist_compontents_detailinfo_37')"
                @on-keyup="RemoveSpace"
            />
            <Select
                v-model="GLR.status"
                :placeholder="$t('mycourse_mycourse_375')"
                v-if="tableType == '1'"
                clearable
                filterable
            >
                <Option
                    v-show="item.value!='ready'&&item.value!='start'"
                    v-for="item in classStatusList"
                    :value="item.value"
                    :key="item.value"
                >{{ item.label }}</Option>
            </Select>
        </v-search-collapse>
        <journaling
            v-if="defaultShowCol"
            :hasPage="hasPage"
            :current="pageNo"
            :total="total"
            :pageSize="pageSize"
            :tableHeightOut="tableHeightOut"
            class="mytable"
            :showSummary="tableType==2"
            :tableName="tableName"
            :tableData="tableData"
            :tableColumnArray="tableColumnArray"
            :defaultShowCol="defaultShowCol"
            :dataTotal="dataTotal"
            :btnList="btnList"
            :updateShowTitleKey="updateShowTitleKey"
            :updateShowTitleMethod="updateShowTitle"
            @selectionChange="selectionChange"
            @changeTableType="changeTableType"
            @pageSizeChange="pageSizeChange"
            @pageChange="pageChange"
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
import vSearchCollapse from "@public/modules/vSearchCollapse";
import journaling from "../../modules/journaling";
// import treeSelect from "_c/tree-select/tree-select.vue";
import valid, { errors, sysUser, sysDict, report, sysCommonSql, rptArchiveSchedule } from "./../../libs/request";
import {
    waitUntil,
    getMonthEndDay,
    defaultDatePickerValue,
    titleTransformationToLabel,
    getSelectIdsByid,
    getSelectTreeDataByid,
    MonthrangeOpt,
    noGdMonth, 
    hasGdMonth,
} from "@public/libs/util";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
    name: "report.studentList",
    data() {
        return {
            loading1: false,
            loading2: false,
            studenNameList: [],
            studenEnNameList: [],
            exportMonthModalLoading: true,
            exportMonthModal: false,
            exportMonth: [],
            hasPage: false,
            pageNo: 1,
            total: 0,
            options3: null,
            gdType: '1',
            gdTime: '',
            storageDataObj: {
                "1": {},
                "2": {}
            },
            // tableType: '0',
            valueConsistsOf: "LEAF_PRIORITY",
            parentOfficeId: "",
            ininOfficeIdList: [],
            updateShowTitleKey: "RptStudentArchiveVO",
            tableType: "2",
            tableName: [
                {
                    name: this.$t('modules_spoc_report_web_src_views_studentlist_studentlist_4721'),
                    value: "2"
                },
                {
                    name: this.$t('report.studentList'),
                    value: "1"
                }
            ],
            classStatusList: [],
            tableHeightOut: 72, //324,
            updateShowTitle: report.updateShowTitle,
            selection: [],
            btnList: [
                {
                    style: {},
                    type: "",
                    btnClick: this.exportAll,
                    text: this.$t('integralflow_5')
                }
            ],
            GLR: {
                officeIds: [],
                officeIdList: [],
                name: "",
                enName: "",
                stuCode: "",
                status: "",
                month: []
            },
            pageSize: this.$store.state.app.pageSizeGlobal || 10,
            /*搜索相关结束*/
            defaultShowCol: null,
            dataTotal: 0,
            sortObj: {},
            tableData: [{}]
        };
    },
    computed: {
        ...mapState(["app", "calendarConfig"])
    },
    components: {
        Treeselect,
        vSearchCollapse,
        journaling
    },
    mounted() {
        this.batchListData(); //上课状态下拉
        this.getTreeDatas();
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        remoteMethod1(query){
            if(query){
                this.loading1 = true
                sysCommonSql
                .querySingleTableData({
                    "searchField":"name",
                    "searchFieldParam": query,
                    "mainTable":"com_student",
                    "field1":"mobile"})
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.studenNameList = res.data.data
                    } else {
                        this.studenNameList = []
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.loading1 = false
                });
            }
        },
        remoteMethod2(query){
            if(query){
                this.loading2 = true
                sysCommonSql
                .querySingleTableData({
                    "searchField":"en_name",
                    "searchFieldParam": query,
                    "mainTable":"com_student",
                    "field1":"mobile"})
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.studenEnNameList = res.data.data
                    } else {
                        this.studenEnNameList = []
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.loading2 = false
                });
            }
        },
        // 获取归档时间点
        getArchiveDate(){
            this.updateLoadingStatus({ isLoading: true });
            rptArchiveSchedule
            .findRecentlyArchiveDate({
                "officeIds": this.GLR.officeId,
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
                let param = {
                    officeIds:this.GLR.officeIds,//校区id
                }
                param.startTime = new Date(this.exportMonth[0]).format('yyyy-MM-01 00:00:00')
                param.endTime = getMonthEndDay(new Date(this.exportMonth[1]).format('yyyy-MM'));
                report
                .rptStudentArchiveExportFile(param)
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
        exportAll() {
            this.exportMonth = [].concat(this.GLR.month)
            this.exportMonthModal = true
        },
        changeTableType(val) {
            this.pageNo =1
            this.tableType = val;
            this.tableColumnArray = [] //[].concat(this["tableColumnArray" + val]);
            if(val == '1'){
                this.hasPage = true
            } else {
                this.hasPage = false
            }
            if (this.storageDataObj[this.tableType].data) {
                this.defaultShowCol = this.storageDataObj[this.tableType].defaultShowCol
                this.tableData = this.storageDataObj[this.tableType].data;
                let searchObj = this.storageDataObj[this.tableType].searchObj;
                if (searchObj) {
                    this.GLR.officeIds= searchObj.officeIds
                    this.GLR.name = searchObj.name
                    this.GLR.enName = searchObj.enName
                    this.GLR.stuCode = searchObj.stuCode
                    this.GLR.status = searchObj.status
                    this.GLR.month = searchObj.month 
                    this.total = searchObj.total
                    this.pageNo = searchObj.pageNo
                    this.pageSize = searchObj.pageSize
                    this.gdType = searchObj.gdType
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
        },
        //不是数字就清空数据
        numArea(value) {
            var patt1 = new RegExp(/^[0-9]{0,}$/);
            return patt1.test(value);
        },
        RemoveSpace(val) {
            if (!this.numArea(this.GLR.phone)) {
                this.GLR.phone = parseInt(this.GLR.phone)
                    ? parseInt(this.GLR.phone)
                    : "";
            }
        },
        batchListData() {
            let types = "com_student_course_rel_status"; //课程包分类,适用年级
            sysDict
                .batchListData({
                    types
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.classStatusList =
                            res.data.data.com_student_course_rel_status;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    // this.updateLoadingStatus({ isLoading: false });
                });
        },
        getTreeDatas() {
            this.updateLoadingStatus({ isLoading: true });
            sysUser
                .dataScopeFilterTree()
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        if (Array.isArray(res.data.data.children)) {
                            let officeIdList = res.data.data.children;
                            this.parentOfficeId = officeIdList[0].id;
                            titleTransformationToLabel(officeIdList);
                            this.ininOfficeIdList = JSON.parse(
                                JSON.stringify(officeIdList)
                            );
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
                                    // this.GLR.month = defaultDatePickerValue(this.calendarConfig.maxMonthInterval)
                                    // this.getShowTitle();
                                }
                            );
                        }
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    // this.updateLoadingStatus({ isLoading: false });
                });
        },
        changeDivHeight(height) {
            this.tableHeightOut = height;
        },
        //可选方法，如果是多选的话必须有
        selectionChange(selection) {
            this.selection = selection;
        },
        getListDataEmit() {
            this.getListData();
        },
        getListData() {
            this.updateLoadingStatus({ isLoading: true });
            let param = {};
            let myQuest;
            if (this.tableType == "1") {
                param = JSON.parse(JSON.stringify(this.GLR));
                // delete param.officeIdList;
                param.startTime =
                    new Date(this.GLR.month[0]).format("yyyy-MM") +
                    "-01 00:00:00";
                param.endTime = getMonthEndDay(
                    new Date(this.GLR.month[1]).format("yyyy-MM")
                );
                param.archiveStatus = this.gdType
                param.pageSize = this.pageSize || 10
                param.pageNo = this.pageNo
                myQuest = report.listPage;
            } else if (this.tableType == "2") {
                param.officeIds = this.GLR.officeIds;
                param.startTime =
                    new Date(this.GLR.month[0]).format("yyyy-MM") +
                    "-01 00:00:00";
                param.endTime = getMonthEndDay(
                    new Date(this.GLR.month[1]).format("yyyy-MM")
                );
                myQuest = report.statistic;
            }
            delete param.officeIdList
            this.searchObj = param; //这里需要给searchObj 赋值，导出数据的时候需要用到
            myQuest(param)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let result = res.data.data;
                        if(this.tableType == "2"){ // 汇总
                            this.tableData = result;
                        } else {
                            this.total = Number(result.total)
                            this.tableData = result.list;
                        }
                        this.storageDataObj[this.tableType].data = this.tableData;
                        let _data = Object.assign({},this.GLR)
                        _data.gdType = this.gdType
                        if(this.tableType == "1"){ // 明细
                            _data.total = Number(this.total)
                            _data.pageNo = Number(this.pageNo)
                            _data.pageSize = Number(this.pageSize)
                        }
                        this.storageDataObj[this.tableType].searchObj =_data
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        //获取数据，根据情况修改接口、传参
        SearchList() {
            this.pageNo = 1;
            this.findRecentlyArchiveDate(true)
        },
        //必须方法，获取默认显示的可选列  接口根据需要自行更换，每个模块的接口是不一致的
        getShowTitle(noSearch) {
            let param = {};
            if (this.tableType == "1") {
                param = {
                    pageIdentifier: "RptStudentArchiveVO",
                    voName:
                        "com.windliven.spoc.modules.rpt.vo.RptStudentArchiveVO"
                };
            } else if (this.tableType == "2") {
                param = {
                    pageIdentifier: "RptStudentArchiveStatisticVO",
                    voName:
                        "com.windliven.spoc.modules.rpt.vo.RptStudentArchiveStatisticVO"
                };
            }
            report
                .getShowTitle(param)
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
                .catch(errors.call(this));
        },
        resetSearch() {
            for (let item in this.GLR) {
                if (item != "officeIdList" && item != "officeIds") {
                    this.GLR[item] = "";
                }
            }
            this.$set(this.GLR, "officeIds", []);
            this.tableData = [];
            this.gdType = '1'
            this.total = 0
            this.pageNo = 1
            this.initOffice();
        }
    },
    watch: {
        "app.currOfficeId": function(val, oldVal) {
            if (oldVal && this.$route.name == "report.studentList") {
                this.pageNo = 1
                this.initOffice();
            }
        },
    }
};
</script>