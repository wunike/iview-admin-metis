<style lang="less">
.audition-conversion-report-container {
    height: 100%;
    .my-table {
        width: 100%;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        padding: 0 16px 16px;
        margin-top: 10px;
    }
}
</style>

<template>
    <div class="audition-conversion-report-container">
        <v-search-collapse @search="SearchList" @reset="reset" @changeDivHeight="changeDivHeight">
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
                    v-model="params.officeIds"
                    :options="params.officeIdList"
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
                type="daterange"
                v-model="params.month"
                style="width: 224px;"
                :clearable="false"
                :placeholder="$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4472')"
                @on-open-change="setOptTime"
            ></MonthRangeDatePicker>
            <Select v-model="params.teacherId" :placeholder="$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4473')" filterable remote :remote-method="remoteTeacher" :loading="loadingTeacher">
                <Option v-for="item in teacherLists" :value="item.value" :key="item.value">{{ item.name }}</Option>
            </Select>
            <Select v-show="currentTab == '1'" v-model="params.isSign" :placeholder="$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4474')">
                <Option v-for="item in signLists" :value="item.value" :key="item.value">{{ item.name }}</Option>
            </Select>
            <Select v-show="currentTab == '1'" v-model="params.isFirst" :placeholder="$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4475')">
                <Option v-for="item in firstLists" :value="item.value" :key="item.value">{{ item.name }}</Option>
            </Select>
            <Select v-show="currentTab == '1'" v-model="params.signer" :placeholder="$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4476')" filterable remote :remote-method="remoteSigner" :loading="loadingSigner">
                <Option v-for="item in signerLists" :value="item.value" :key="item.value">{{ item.name }}</Option>
            </Select>
<!--            <Select v-show="currentTab == '1'" v-model="params.signPrice" :placeholder="$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4477')" clearable>-->
<!--                <Option v-for="item in signPriceLists" :value="item.value" :key="item.id">{{ item.label }}</Option>-->
<!--            </Select>-->
            <DatePicker
                v-show="currentTab == '1'"
                v-model="signTime"
                type="daterange"
                placement="bottom-start"
                separator=" ~ "
                :placeholder="$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1642')"
                style="width:224px;"
            ></DatePicker>
        </v-search-collapse>
        <journaling
            v-if="defaultShowCol"
            class="my-table"
            :hasPage="hasPage"
            :current="pageNo"
            :total="total"
            :pageSize="pageSize"
            :tableName="tabs"
            :tableData="tableData"
            :defaultShowCol="defaultShowCol"
            :btnList="btnList"
            :tableHeightOut="tableHeightOut"
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
/**
 ** @author: 曹见芳
 ** 试听课转换报表
 */
import vSearchCollapse from '@public/modules/vSearchCollapse';
import valid, { errors, sysOffice, sysUser, common, sysDict, sysCommonSql, rptCentralArchive, rptArchiveSchedule } from '../../libs/request';
import { crmCustomerSignReport } from '../../../../spoc-crm-web/src/libs/request';
import { mapMutations, mapState } from 'vuex';
import journaling from '../../modules/journaling';
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
import { waitUntil, MonthrangeOpt, defaultDatePickerValue, getMonthEndDay, titleTransformationToLabel, getSelectIdsByid, getSelectTreeDataByid, noGdMonth, hasGdMonth} from '@public/libs/util';

export default {
    name: 'report.centerReport',
    data() {
        return {
            exportMonthModalLoading: true,
            exportMonthModal: false,
            exportMonth: [],
            hasPage: false,
            pageNo: 1,
            pageSize: this.$store.state.app.pageSizeGlobal || 10,
            total: 0,
            options3: null,
            gdType: '1',
            gdTime: '',
            storageDataObj: {
                '0': {},
                '1': {}
            },
            parentOfficeId: '',
            ininOfficeIdList: [],
            valueConsistsOf: 'LEAF_PRIORITY', // ALL、BRANCH_PRIORITY、LEAF_PRIORITY、ALL_WITH_INDETERMINATE
            currentTab: '0',
            tableHeightOut: 72,
            params: {
                officeIds: [],
                officeIdList: [],
                month: '',
                teacherId: '',
                isSign: '',
                isFirst: '',
                signer: '',
                signPrice:''
            },
            signTime: [],
            teacherLists: [],
            signerLists: [],
            signPriceLists:[],
            loadingTeacher: false,
            loadingSigner: false,
            defaultShowCol: null,
            tableData: [],
            tableColumnArray: [],
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
                    name: this.$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4482'),
                    value: '0'
                },
                {
                    name: this.$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4483'),
                    value: '1'
                }
            ],
            signLists: [
                {
                    value: '0',
                    name: this.$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4484')
                },
                {
                    value: '1',
                    name: this.$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4485')
                }
            ],
            firstLists: [
                {
                    value: '1',
                    name: this.$t('modules_leftremenu_92')
                },
                {
                    value: '0',
                    name: this.$t('modules_leftremenu_93')
                }
            ],
            searchObj: {}
        };
    },
    computed: {
        ...mapState(['app', 'buttonPerm', 'calendarConfig'])
    },
    components: {
        vSearchCollapse,
        journaling,
        Treeselect
    },
    mounted() {
        // this.com_task_tpl_price()
        // this.getShowTitle('0');
        // this.params.month = [new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000).format('yyyy-MM'), new Date().format('yyyy-MM')];
        // this.getMonthDataPay(this.params.month);
        this.getTreeDatas();
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        // 获取归档时间点
        getArchiveDate(){
            this.updateLoadingStatus({ isLoading: true });
            rptArchiveSchedule
            .findRecentlyArchiveDate({
                "officeIds": this.params.officeIds,
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
        com_task_tpl_price() {
            sysDict.batchListData({types:'com_task_tpl_price'})
            .then(valid.call(this))
            .then((res)=> {
                if(res.ok){
                    this.signPriceLists = res.data.data.com_task_tpl_price
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
                let fun = this.currentTab == '0' ? crmCustomerSignReport.exportTotalFile : crmCustomerSignReport.exportDetailFile;
                let params = Object.assign({}, this.searchObj);
                let showFieldList = [];
                this.defaultShowCol.true.map(item => {
                    showFieldList.push({
                        name: item.name,
                        title: item.title,
                        selected: true
                    });
                });
                params.showFieldList = showFieldList;
                params.startTime = new Date(this.exportMonth[0]).format('yyyy-MM-01 00:00:00')
                params.endTime = getMonthEndDay(new Date(this.exportMonth[1]).format('yyyy-MM'));
                
                fun(params)
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
        SearchList() {
            this.pageNo = 1;
            this.findRecentlyArchiveDate(true)
        },
        pageSizeChange(val){
            console.log(val, 'pageSizeChange')
            this.pageSize = val
            if(this.pageNo == 1){
                this.doSearch()
            }
        },
        pageChange(val){
            console.log(val, 'pageChange')
            this.pageNo = val
            this.doSearch()
        },
        setOptTime(flag){
            if(flag){
                this.params.month=[];
            }
        },
        changeGd(val){
            this.pageNo = 1
            this.params.month = [];
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
                        let months = this.params.month[0] ? this.params.month : defaultDatePickerValue(this.calendarConfig.maxMonthInterval)
                        if(new Date(months[0]).getTime() < new Date(_gdTimeStr).getTime()){
                            // 判断开始月份是否超过了归档点。超过修改开始月份为归档点（加1000后的归档点）
                            months[0] = new Date(_gdTimeStr)
                        }
                        this.params.month = months
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
                        let months = this.params.month[0] ? this.params.month : defaultDatePickerValue(this.calendarConfig.maxMonthInterval)
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
                        this.params.month = months
                    // }
                }
            } else {
                // 只有未月结数据
                this.gdType = '1'
                
                this.options3 = MonthrangeOpt(this,'DatePicker',Number(this.calendarConfig.maxMonthInterval))
                // if(!noSetMonth){
                    if(this.params.month && this.params.month[0]){
                        //有选中的月份。无需修改
                    } else {
                        this.params.month = defaultDatePickerValue(this.calendarConfig.maxMonthInterval)
                    }
                // }
            }
            if(isInit){
                this.getShowTitle(noSetMonth);
            }
        },
        changeDivHeight(height) {
            this.tableHeightOut = height;
        },
        getMonthDataPay(val) {
            this.params.startTime = val[0] ? val[0] + '-01 00:00:00' : '';
            this.params.endTime = val[1] ? getMonthEndDay(val[1]) : '';
            // console.log(`this.params.startTime = ${this.params.startTime}, this.params.endTime = ${this.params.endTime}`)
        },
        initOffice() {
            if (this.app.currOfficeId == 'all' || this.app.currOfficeId == this.parentOfficeId) {
                this.$set(this.params, 'officeIdList', this.ininOfficeIdList);
                this.$set(this.params, 'officeIds', []);
                this.$nextTick(() => {
                    this.$forceUpdate();
                    this.getArchiveDate()
                });
            } else {
                let resultSelectObj = {};
                getSelectTreeDataByid(this.ininOfficeIdList, resultSelectObj);
                let resultIdsObj = {};
                getSelectIdsByid(this.ininOfficeIdList, resultIdsObj);
                this.$set(this.params, 'officeIdList', [resultSelectObj[this.app.currOfficeId]]);
                this.$set(this.params, 'officeIds', resultIdsObj[this.app.currOfficeId]);
                this.$nextTick(() => {
                    this.$forceUpdate();
                    this.getArchiveDate()
                });
            }
        },
        getTreeDatas() {
            sysUser
                .dataScopeFilterTree()
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        // console.log(res)
                        if (Array.isArray(res.data.data.children)) {
                            let officeIdList = res.data.data.children;
                            this.parentOfficeId = officeIdList[0].id;
                            titleTransformationToLabel(officeIdList);
                            this.ininOfficeIdList = JSON.parse(JSON.stringify(officeIdList));
                            waitUntil(
                                () => {
                                    return (
                                        (this.app.currOfficeId && this.calendarConfig.maxMonthInterval) || false
                                    );
                                },
                                () => {
                                    this.initOffice();
                                }
                            );
                        }
                    }
                })
                .catch(errors.call(this));
        },
        reset() {
            this.params.teacherId = '';
            this.params.isSign = '';
            this.params.isFirst = '';
            this.params.signer = '';
            this.params.month = [];
            this.$set(this.params, "officeIds", []);
            this.tableData = [];
            this.gdType = '1'
            this.total = 0
            this.pageNo = 1
            this.initOffice();
        },
        getShowTitle(noSearch) {
            let params = {
                pageIdentifier: this.currentTab == '0' ? 'CrmCustomerSignTotalReportVO' : 'CrmCustomerSignDetailReportVO',
                voName: this.currentTab == '0' ? 'com.windliven.spoc.modules.crm.vo.CrmCustomerSignTotalReportVO' : 'com.windliven.spoc.modules.crm.vo.CrmCustomerSignDetailReportVO'
            };
            crmCustomerSignReport
                .getShowTitle(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.defaultShowCol = res.data.data;
                        this.storageDataObj[this.currentTab].defaultShowCol = res.data.data
                        if (!noSearch) {
                            this.doSearch();
                        }
                    }
                })
                .catch(errors.call(this));
        },
        getListData(params) {
            this.updateLoadingStatus({ isLoading: true });
            this.searchObj = params; //这里需要给searchObj 赋值，导出数据的时候需要用到
            if (this.currentTab == '0') {
                // 试听课教练汇总
                crmCustomerSignReport
                    .listTotalPage(params)
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            this.tableData = res.data.data.list;
                            this.storageDataObj[this.currentTab].data = this.tableData;
                            let _data = Object.assign({},this.params)
                            _data.gdType = this.gdType
                            this.storageDataObj[this.currentTab].searchObj =_data
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {
                        this.updateLoadingStatus({ isLoading: false });
                    });
            } else {
                // 试听课明细
                crmCustomerSignReport
                    .listDetailPage(params)
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            this.tableData = res.data.data.list;
                            this.total = Number(res.data.data.total)
                            this.storageDataObj[this.currentTab].data = this.tableData;
                            let _data = Object.assign({},this.params)
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
            this.exportMonth = [].concat(this.params.month)
            this.exportMonthModal = true
        },
        changeTableType(val) {
            this.pageNo = 1
            this.currentTab = val;
             if(val == '1'){
                this.hasPage = true
            } else {
                this.hasPage = false
            }
            if (this.storageDataObj[this.currentTab].data) {
                this.defaultShowCol = this.storageDataObj[this.currentTab].defaultShowCol
                this.tableData = this.storageDataObj[this.currentTab].data;
                let searchObj = this.storageDataObj[this.currentTab].searchObj;
                console.log(searchObj,'searchObj')
                if (searchObj) {
                    this.params.officeIds = searchObj.officeIds
                    this.params.month = searchObj.month
                    this.params.teacherId = searchObj.teacherId
                    this.params.isSign = searchObj.isSign
                    this.params.isFirst = searchObj.isFirst
                    this.params.signer = searchObj.signer
                    this.params.signPrice = searchObj.signPrice
                    this.total = searchObj.total
                    this.pageNo = searchObj.pageNo
                    this.pageSize = searchObj.pageSize
                    this.gdType = searchObj.gdType
                }
                this.findRecentlyArchiveDate(false,true)
            } else {
                this.tableData = [];
                this.params.month = []
                this.params.officeIds = []
                this.gdType = '1'
                this.total = 0
                this.pageNo = 1
                this.findRecentlyArchiveDate(true,false)
            }
        },
        doSearch() {
            let params = JSON.parse(JSON.stringify(this.params));
            delete params.month;
            delete params.officeIdList;
            if (this.params.isSign == '') delete params.isSign;
            if (this.params.isFirst == '') delete params.isFirst;
            if (!this.params.teacherId) delete params.teacherId;
            if (!this.params.signer) delete params.signer;
            if (!this.params.officeIds || this.params.officeIds.length == 0) delete params.officeIds;
            // console.log(params);
            if(this.currentTab == '0'){
                params.pageSize = 0;
            } else {
                params.pageSize = this.pageSize
                params.pageNo = this.pageNo
                params.archiveStatus = this.gdType
                params.signStartTime = this.signTime[0] ? new Date(this.signTime[0]).format('yyyy-MM-dd 00:00:00'): '';
                params.signEndTime = this.signTime[1] ? new Date(this.signTime[1]).format('yyyy-MM-dd 23:59:59'): '';
            }
            params.startTime = this.params.month[0] ? new Date(this.params.month[0]).format('yyyy-MM') + '-01 00:00:00' : '';
            params.endTime = this.params.month[1] ? getMonthEndDay(this.params.month[1]) : '';
            this.getListData(params);
        },
        remoteTeacher(query) {
            if (query !== '') {
                this.remoteMethods(query, 'teacher');
            } else {
                this.teacherLists = [];
            }
        },
        remoteSigner(query) {
            if (query !== '') {
                this.remoteMethods(query, 'signer');
            } else {
                this.signerLists = [];
            }
        },
        remoteMethods(query, type) {
            if (type == 'teacher') {
                this.loadingTeacher = true;
            } else {
                this.loadingSigner = true;
            }
            let params = {
                mainTable: 'sys_user',
                mainField: 'id',
                joinField: 'id',
                joinTable: 'sys_user',
                secondField: 'name',
                joinTableSearchParam: query
            };
            sysCommonSql
                .queryPageInputInitData(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        if (type == 'teacher') {
                            this.loadingTeacher = false;
                            this.teacherLists = res.data.data;
                        } else {
                            this.loadingSigner = false;
                            this.signerLists = res.data.data;
                        }
                    }
                })
                .catch(errors.call(this));
        },
    },
    watch: {
        'app.currOfficeId': function(val, oldVal) {
            if (oldVal && this.$route.name == 'report.auditionConversionReport' && this.currentTab == '1') {
                this.pageNo = 1
                this.initOffice();
            }
        }
    }
};
</script>
