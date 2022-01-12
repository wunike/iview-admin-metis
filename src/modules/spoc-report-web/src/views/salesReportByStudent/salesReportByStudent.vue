<style lang="less">
.glr-container {
    .my-table {
        width: 100%;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        padding: 0 16px;
        margin-top: 10px;
    }
}
</style>

<template>
    <div class="glr-container">
        <v-search-collapse @search="search" @reset="reset" @changeDivHeight="changeDivHeight">
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
                    v-model="GLR.officeId"
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
                :options="options1"
                v-model="GLR.payTime"
                type="daterange"
                :placeholder="$t('modules_spoc_report_web_src_views_salesreportbystudent_salesreportbystudent_4698')"
                style="width:224px;"
                @on-open-change="setOptTime"
            ></MonthRangeDatePicker>
            <MonthRangeDatePicker
                ref="DatePicker2"
                :clearable="false"
                separator=" ~ "
                :options="options2"
                v-model="GLR.signTime"
                type="daterange"
                :placeholder="$t('modules_spoc_report_web_src_views_salesreportbystudent_salesreportbystudent_4699')"
                style="width:224px;"
            ></MonthRangeDatePicker>
            <Select :placeholder="$t('modules_spoc_portal_views_contractmanage_contractmanage_3397')" clearable filterable style="width:224px;" v-model="GLR.signType" @on-change="firstSourceChange">
                <Option v-for="item in signTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select v-model="GLR.ctType" :placeholder="$t('modules_spoc_report_web_src_views_refundreport_index_4663')" clearable style="width:224px;">
                <Option :value="item.value" v-for="(item, index) in ctTypeList" :key="index">{{ item.label }}</Option>
            </Select>
        </v-search-collapse>
        <journaling
            v-if="defaultShowCol"
            :showSummary="currentTab == '0'"
            class="my-table"
            :tableName="tabs"
            :tableData="tableData"
            :defaultShowCol="defaultShowCol"
            :btnList="btnList"
            :tableHeightOut="tableHeightOut"
            @changeTableType="changeTableType"
            :hasPage="currentTab == 1"
            :current="pageNo"
            :total="total"
            :pageSize="pageSize"
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
import vSearchCollapse from '@public/modules/vSearchCollapse';
import valid, { errors, sysOffice, sysUser, common, sysDict, sysCommonSql, report, rptArchiveSchedule } from '../../libs/request';
import { mapMutations, mapState } from 'vuex';
import journaling from '../../modules/journaling';
// import TreeSelect from '_c/tree-select';
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
import {
    waitUntil,
    MonthrangeOpt,
    defaultDatePickerValue,
    getMonthEndDay,
    titleTransformationToLabel,
    getSelectIdsByid,
    getSelectTreeDataByid,
    noGdMonth,
    hasGdMonth
} from '@public/libs/util';
export default {
    name: 'report.salesReportByStudent',
    components: {
        vSearchCollapse,
        Treeselect,
        journaling
    },
    data() {
        return {
            storageDataObj: {
                "0": {},
                "1": {}
            },
            exportMonthModalLoading: true,
            exportMonthModal: false,
            exportMonth: [],
            pageSize: this.$store.state.app.pageSizeGlobal || 10,
            pageNo: 1,
            total: 0,
            gdTime: '',
            parentOfficeId: '',
            ininOfficeIdList: [],
            valueConsistsOf: 'LEAF_PRIORITY', // ALL、BRANCH_PRIORITY、LEAF_PRIORITY、ALL_WITH_INDETERMINATE
            tableHeightOut: 72,
            // selectTreeLabel: '',
            currentTab: 0,
            signTypeList: [
                {
                    value: 'new',
                    label: this.$t('modules_spoc_portal_views_contractmanage_contractmanage_3403')
                },
                {
                    value: 'replenish',
                    label: this.$t('modules_spoc_report_web_src_views_refundreport_index_4671')
                }
            ],
            ctTypeList: [],
            gdType: '1',
            GLR: {
                officeId: [],
                officeIdList: [],
                payTime: [],
                time: [],
                signType: '',
                signTime:[],
                ctType: '',
            },
            defaultShowCol: {},
            tableData: [],
            btnList: [
                {
                    style: {},
                    type: '',
                    btnClick: this.export,
                    text: this.$t('integralflow_5')
                }
            ],
            tabs: [
                {
                    name: this.$t('modules_spoc_report_web_src_views_salesreportbystudent_salesreportbystudent_4707'),
                    value: '0'
                },
                {
                    name: this.$t('modules_spoc_report_web_src_views_salesreportbystudent_salesreportbystudent_4708'),
                    value: '1'
                }
            ]
        };
    },
    computed: {
        ...mapState(['app', 'buttonPerm', 'calendarConfig'])
    },
    mounted() {
        this.getCtTypeList();
        this.getTreeDatas();
    },

    methods: {
        ...mapMutations(['updateLoadingStatus']),
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
                    officeIds: this.GLR.officeId,
                    startTime: '',
                    endTime: '',
                    signStartTime: '',
                    signEndTime: '',
                    signType: this.GLR.signType,
                    contractType: this.GLR.ctType
                };
                if (this.exportMonth[0]) {
                    param.startTime = new Date(this.exportMonth[0]).format('yyyy-MM-dd 00:00:00');
                }
                if (this.exportMonth[1]) {
                    param.endTime = getMonthEndDay(new Date(this.exportMonth[1]).format('yyyy-MM'));
                }
                if (this.GLR.signTime[0]) {
                    param.signStartTime = new Date(this.GLR.signTime[0]).format('yyyy-MM-dd 00:00:00');
                }
                if (this.GLR.signTime[1]) {
                    param.signEndTime = getMonthEndDay(new Date(this.GLR.signTime[1]).format('yyyy-MM'));
                }
                report
                    .exportRptCashStudentArchive(param)
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            const blob = new Blob([res.data], {
                                type: 'application/actet-stream;charset=utf-8'
                            });
                            const contentDisposition = res.headers['content-disposition']; //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
                            const patt = new RegExp('filename=([^;]+\\.[^\\.;]+);*');
                            const result = patt.exec(contentDisposition);
                            if (!result) {
                                this.$Message.error(this.$t('integralflow_19'));
                                return;
                            }
                            const filename = decodeURIComponent(result[1]);
                            const downloadElement = document.createElement('a');
                            const href = window.URL.createObjectURL(blob); //创建下载的链接
                            downloadElement.style.display = 'none';
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
        setOptTime(flag){
            if(flag){
                this.GLR.payTime=[];
            }
        },
        search() {
            this.pageNo = 1
            this.getListData();
        },
        initOffice() {
            if (this.app.currOfficeId == 'all' || this.app.currOfficeId == this.parentOfficeId) {
                this.$set(this.GLR, 'officeIdList', this.ininOfficeIdList);
                this.$set(this.GLR, 'officeId', []);
                this.$nextTick(() => {
                    this.$forceUpdate();
                    this.getArchiveDate()
                });
            } else {
                let resultSelectObj = {};
                getSelectTreeDataByid(this.ininOfficeIdList, resultSelectObj);
                let resultIdsObj = {};
                getSelectIdsByid(this.ininOfficeIdList, resultIdsObj);
                this.$set(this.GLR, 'officeIdList', [resultSelectObj[this.app.currOfficeId]]);
                this.$set(this.GLR, 'officeId', resultIdsObj[this.app.currOfficeId]);
                this.$nextTick(() => {
                    this.$forceUpdate();
                    this.getArchiveDate()
                });
            }
        },
        changeGd(val) {
            this.pageNo = 1
            this.GLR.payTime = [];
            this.findRecentlyArchiveDate(false,true)
        },
        findRecentlyArchiveDate(isInit, noSetMonth) {
            // console.log(res.data.data, 'gdTime')
            let _this = this;
            if (this.gdTime != '-1') {
                if (this.gdType == '1') {
                    // 未月结
                    // 拼接未月结时间点。为某个月最后一天的23:59:59。
                    // 注意，未月结要在归档节点上加1000毫秒。这样拿到下个月的一号
                    let _gdTime = new Date(new Date(this.gdTime).getTime() + 1000);
                    let _gdTimeStrYear = _gdTime.getFullYear();
                    let _gdTimeStrMonth = _gdTime.getMonth() + 1;
                    let _gdTimeStr = _gdTimeStrYear + '-' + (_gdTimeStrMonth < 10 ? '0' + _gdTimeStrMonth : _gdTimeStrMonth);
                    //设置未月结月份可选范围
                    this.options1 = noGdMonth(_this, _gdTimeStr, 'DatePicker', Number(this.calendarConfig.maxMonthInterval));

                    // if (!noSetMonth) {
                        let months = this.GLR.payTime[0] ? this.GLR.payTime : defaultDatePickerValue(this.calendarConfig.maxMonthInterval);
                        if (new Date(months[0]).getTime() < new Date(_gdTimeStr).getTime()) {
                            // 判断开始月份是否超过了归档点。超过修改开始月份为归档点（加1000后的归档点）
                            months[0] = new Date(_gdTimeStr);
                        }
                        this.GLR.payTime = months;
                    // }
                } else {
                    // 已月结
                    // 拼接已月结时间点。为某个月最后一天的23:59:59。
                    // 注意，这里不需要加1000
                    let _gdTime = new Date(new Date(this.gdTime).getTime());
                    let _gdTimeStrYear = _gdTime.getFullYear();
                    let _gdTimeStrMonth = _gdTime.getMonth() + 1;
                    let _gdTimeStr = _gdTimeStrYear + '-' + (_gdTimeStrMonth < 10 ? '0' + _gdTimeStrMonth : _gdTimeStrMonth);
                    //设置已月结月份可选范围
                    this.options1 = hasGdMonth(_this, _gdTimeStr, 'DatePicker', Number(this.calendarConfig.maxMonthInterval));

                    // if (!noSetMonth) {
                        let months = this.GLR.payTime[0] ? this.GLR.payTime : defaultDatePickerValue(this.calendarConfig.maxMonthInterval);
                        if (new Date(months[0]).getTime() < new Date(_gdTimeStr).getTime() && new Date(months[1]).getTime() < new Date(_gdTimeStr).getTime()) {
                            // 开始月份、结束月份 都比归档点超前，无需修改
                        } else if (new Date(months[0]).getTime() < new Date(_gdTimeStr).getTime() && new Date(months[1]).getTime() < new Date(_gdTimeStr).getTime()) {
                            // 开始月份超前。但结束月份比归档点晚。 则设置结束月份为归档点
                            months[1] = new Date(_gdTimeStr);
                        } else {
                            // 如果开始月份、结束月份都比结束月份晚。则修改结束点为归档点，开始点为结束点 减去 配置月份跨度数
                            let dateStart = new Date(_gdTimeStr);
                            let dateEnd = new Date(_gdTimeStr);
                            months[1] = dateEnd;
                            dateStart.setMonth(dateStart.getMonth() - (Number(this.calendarConfig.maxMonthInterval) - 1));
                            months[0] = dateStart;
                        }
                        this.GLR.payTime = months;
                    // }
                }
            } else {
                // 只有未月结数据
                this.gdType = '1';
                this.options1 = MonthrangeOpt(this, 'DatePicker', Number(this.calendarConfig.maxMonthInterval));
                console.log(this.options1, 11211);
                // if (!noSetMonth) {
                    if (this.GLR.payTime && this.GLR.payTime[0]) {
                        //有选中的月份。无需修改
                    } else {
                        this.GLR.payTime = defaultDatePickerValue(this.calendarConfig.maxMonthInterval);
                    }
                // }
            }

            if(isInit){
                this.getShowTitle(noSetMonth);
            }
        },
        reset() {
            this.GLR.signType = '';
            this.GLR.ctType = '';
            this.GLR.payTime = [];
            this.gdType = '1';
            this.total = 0;
            this.pageNo = 1;
            this.pageSize = this.$store.state.app.pageSizeGlobal || 10;
            this.initOffice();
        },
        firstSourceChange() {},
        changeDivHeight(height) {
            this.tableHeightOut = height;
        },
        getCtTypeList() {
            sysDict
                .batchListData({
                    types: 'ht_contract_category,'
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.ctTypeList = res.data.data.ht_contract_category;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
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
                            this.ininOfficeIdList = JSON.parse(JSON.stringify(officeIdList));
                            waitUntil(
                                () => {
                                    return (this.app.currOfficeId && this.calendarConfig.maxMonthInterval) || false;
                                },
                                () => {
                                    this.initOffice();
                                    // this.GLR.payTime = defaultDatePickerValue(this.calendarConfig.maxMonthInterval);
                                    // this.GLR.signTime = defaultDatePickerValue(this.calendarConfig.maxMonthInterval);
                                    // this.options1 = MonthrangeOpt(this, 'DatePicker1', Number(this.calendarConfig.maxMonthInterval), true);
                                    this.options2 = MonthrangeOpt(this, 'DatePicker2', Number(this.calendarConfig.maxMonthInterval), true);
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
        changeTree(value, label) {
            // 选择归属机构
            // this.GLR.officeId = value;
            // this.selectTreeLabel = label;
        },
        getShowTitle(noSearch) {
            let params
            if (this.currentTab == '0'){
                params = {
                    pageIdentifier: 'RptCashStudentArchiveVO',
                    voName: 'com.windliven.spoc.modules.rpt.vo.RptCashStudentArchiveVO'
                }
               
            } else {
                params = {
                    pageIdentifier: 'RptCashStudentArchiveDetailVO',
                    voName: 'com.windliven.spoc.modules.rpt.vo.RptCashStudentArchiveDetailVO'
                }
            }
            report.rptStudentGetShowTitle(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    // console.log(res)
                    this.defaultShowCol = res.data.data;
                    this.storageDataObj[this.currentTab].defaultShowCol = res.data.data
                    if (!noSearch) {
                        this.getListData();
                    }
                }
            })
            .catch(errors.call(this));
        },
        getListData() {
            this.updateLoadingStatus({ isLoading: true });
            let param = {
                officeIds: this.GLR.officeId,
                startTime: '',
                endTime: '',
                signStartTime: '',
                signEndTime: '',
                signType: this.GLR.signType,
                contractType: this.GLR.ctType,
                archiveStatus: this.gdType
            };
            if (this.GLR.payTime[0]) {
                param.startTime = new Date(this.GLR.payTime[0]).format('yyyy-MM-dd 00:00:00');
            }
            if (this.GLR.payTime[1]) {
                param.endTime = getMonthEndDay(this.GLR.payTime[1]);
            }
            if (this.GLR.signTime[0]) {
                param.signStartTime = new Date(this.GLR.signTime[0]).format('yyyy-MM-dd 00:00:00');
            }
            if (this.GLR.signTime[1]) {
                param.signEndTime = getMonthEndDay(this.GLR.signTime[1]);
            }
            if (this.currentTab == 0) {
                report
                    .salesReportByStudentSummary(param)
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            let result = res.data.data;
                            this.tableData = result;
                            this.storageDataObj[this.currentTab].data = this.tableData;
                            let _data = Object.assign({},this.GLR)
                            _data.gdType = this.gdType
                            this.storageDataObj[this.currentTab].searchObj =_data
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {
                        this.updateLoadingStatus({ isLoading: false });
                    });
            } else {
                param.archiveStatus = this.gdType
                param.pageNo = this.pageNo;
                param.pageSize = this.pageSize;
                report
                    .salesReportByStudentDetails(param)
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            let result = res.data.data;
                            this.total = Number(result.total)
                            this.tableData = result.list;
                            this.storageDataObj[this.currentTab].data = this.tableData;
                            let _data = Object.assign({},this.GLR)
                            _data.gdType = this.gdType
                            _data.total = Number(this.total)
                            _data.pageNo = Number(this.pageNo)
                            _data.pageSize = Number(this.pageSize)
                            this.storageDataObj[this.currentTab].searchObj =_data
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {
                        this.updateLoadingStatus({ isLoading: false });
                    });
            }
        },
        export() {
            this.exportMonth = [].concat(this.GLR.payTime)
            this.exportMonthModal = true
        },
        changeTableType(val) {
            this.pageNo =1
            this.currentTab = val;
            this.tableColumnArray = [] //[].concat(this["tableColumnArray" + val]);
            if (this.storageDataObj[this.currentTab].data) {
                this.defaultShowCol = this.storageDataObj[this.currentTab].defaultShowCol
                this.tableData = this.storageDataObj[this.currentTab].data;
                let searchObj = this.storageDataObj[this.currentTab].searchObj;
                if (searchObj) {
                    this.GLR.officeId= searchObj.officeId
                    this.GLR.payTime = searchObj.payTime
                    this.GLR.time = searchObj.time
                    this.GLR.signType = searchObj.signType
                    this.GLR.signTime = searchObj.signTime
                    this.GLR.ctType = searchObj.ctType
                    this.total = searchObj.total
                    this.pageNo = searchObj.pageNo
                    this.pageSize = searchObj.pageSize
                    this.gdType = searchObj.gdType
                }
                // this.getShowTitle(true);
                this.findRecentlyArchiveDate(false,true)
            } else {
                this.tableData = [];
                this.GLR.payTime = []
                this.GLR.officeIds = []
                this.gdType = '1'
                this.total = 0
                this.pageNo = 1
                this.findRecentlyArchiveDate(true,false)
            }
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
    },
    watch: {
        'app.currOfficeId': function(val, oldVal) {
            if (oldVal && this.$route.name == 'report.salesReportByStudent') {
                this.pageNo = 1
                this.initOffice();
            }
        }
    }
};
</script>
