<style lang="less">
    .glr-container{
        .my-table{
            width: 100%;
            background: rgba(255, 255, 255, 1);
            border-radius: 4px;
            padding: 0 16px 16px;
            margin-top: 10px;
        }
        .ivu-table-tip {
            position: relative;
            td {
                span{
                    position: absolute;left: 0;right: 0;margin: 0 auto;
                    top: 14px;
                }
            }
        }
    }
</style>

<template>
    <div class="glr-container">
        <v-search-collapse ref="searchCard" @search="SearchList" @reset="reset" @changeDivHeight="changeDivHeight" :key="2">
            <div class="treeSelectCos" style="width: 224px;">
                <treeselect  
                    sortValueBy="INDEX"
                    :flat="false"
                    :noOptionsText="''"
                    :alwaysOpen="false"
                    :multiple="true"
                    :default-expand-level="2"
                    :limit='1'
                    :limitText="count => `${count}+`"
                    :value-consists-of="valueConsistsOf" 
                    :placeholder="$t('modules_spoc_crm_web_src_views_clientareaaround_clientareaaround_781')" 
                    v-model="GLR.officeIds" 
                    :options="GLR.officeIdList">
                </treeselect>
            </div>
            <Select v-model="gdType" style="width:200px" @on-change="changeGd">
                <Option value="1">{{$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4470')}}</Option>
                <Option value="2" :disabled="gdTime == '-1'">{{$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4471')}}</Option>
            </Select>
            <MonthRangeDatePicker 
                type="daterange" 
                style="width:224px;"
                ref="DatePicker"
                separator=" ~ "
                :options="options3"
                :editable="false"
                :clearable="false"
                :placeholder="$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4472')"
                @on-open-change="setOptTime"
                v-model="GLR.month"
                >
            </MonthRangeDatePicker>
            <Select
                :placeholder="$t('modules_spoc_portal_views_contractmanage_contractmanage_3397')"
                clearable
                v-model="params.signType">
                <Option v-for="item in signTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select  v-model="params.category" :placeholder="$t('modules_spoc_report_web_src_views_refundreport_index_4663')" clearable>
                <Option :value="item.value" v-for="(item,index) in ctTypeList" :key="index">{{item.label}}</Option>
            </Select>
            <Select v-model="params.auditStatus" clearable :placeholder="$t('spoc_hootie_web_12')" v-if="currentTab == '1' || currentTab == '2'">
                <Option v-for="item in approvalStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select
                 v-if="currentTab == '1' || currentTab == '2'"
                filterable
                v-model="params.applyerIds"
                multiple
                clearable
                :placeholder="$t('modules_spoc_jw_web_src_views_approval_approvalnew_2247')">
                <Option v-for="item in applicantList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
            <Select
                 v-if="currentTab == '1' || currentTab == '2'"
                filterable
                remote
                @on-clear="clearStu"
                :remote-method="stuRemote"
                v-model="params.studentId"
                clearable
                :placeholder="$t('memberlist_memberlist_257')">
                <Option v-for="item in nameList" :value="item.value" :key="item.value">{{ item.name }}</Option>
            </Select>
            <Input v-model="params.phone" :placeholder="$t('modules_spoc_crm_web_src_views_mycustomer_mycustomer_1397')" v-if="currentTab == '1' || currentTab == '2'"/>
        </v-search-collapse>
        <journaling v-if="defaultShowCol"
            class="my-table"
            :showSummary="currentTab == '3' || currentTab == '4'"
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
            @pageChange="pageChange">
        </journaling>
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
import vSearchCollapse from "@public/modules/vSearchCollapse";
import valid, { errors, sysOffice, sysUser, sysDict, rptRefundArchive, sysCommonSql, rptArchiveSchedule } from "../../libs/request";
import { mapMutations, mapState } from "vuex";
// import TreeSelect from '_c/tree-select';
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import journaling from '../../modules/journaling';
import { waitUntil, getMonthEndDay, titleTransformationToLabel, getSelectIdsByid, getSelectTreeDataByid, MonthrangeOpt,
    noGdMonth, 
    hasGdMonth,
    defaultDatePickerValue} from '@public/libs/util';
export default {
    name:'report.refundReport',
    components: {
        vSearchCollapse,
        Treeselect,
        journaling
    },
    data() {
        return {
            exportMonthModalLoading: true,
            exportMonthModal: false,
            exportMonth: [],
            gdType: '1',
            gdTime: '',
            options3: null,
            hasPage: false,
            total: 0,
            pageNo: 1,
            pageSize: this.$store.state.app.pageSizeGlobal || 10,
            storageDataObj: {
                '1': {},
                '2': {},
                '3': {},
                '4': {},
            },
            GLR: {
                officeIds: [],
                officeIdList: [],
                month: []
            },
            parentOfficeId: '',
            ininOfficeIdList: [],
            valueConsistsOf:  'LEAF_PRIORITY', // ALL、BRANCH_PRIORITY、LEAF_PRIORITY、ALL_WITH_INDETERMINATE
            currentTab:'4',
            tableHeightOut:72,
            params:{
                officeIds: [],
                time:[],
                signType:'',
                category:'',
                auditStatus:'',
                applyerIds: [],
                studentName:'',
                studentId: '',
                phone:'',
            },
            signTypeList:[
                { value: 'new', label: this.$t('modules_spoc_portal_views_contractmanage_contractmanage_3403') },
                { value: 'again', label: this.$t('modules_spoc_report_web_src_views_refundreport_index_4671') },
            ],
            ctTypeList:[],
            approvalStatusList:[],
            applicantList:[],
            nameList:[],
            defaultShowCol:{},
            tableData:[],
            btnList:[
                {
                    type: '',
                    btnClick: this.isExport,
                    text: this.$t('integralflow_5'),
                    style: 'margin-right: 0'
                },
            ],
            tabs:[
                {
                    name:this.$t('modules_spoc_report_web_src_views_refundreport_index_4673'),
                    value:'4'
                },
                {
                    name:this.$t('modules_spoc_report_web_src_views_refundreport_index_4674'),
                    value:'3'
                },
                {
                    name: this.$t('modules_spoc_report_web_src_views_refundreport_index_4675'),
                    value:'1'
                },
                {
                    name:this.$t('modules_spoc_report_web_src_views_refundreport_index_4676'),
                    value:'2'
                },
            ],
            
        }
    },
    computed: {
        ...mapState(['app', 'buttonPerm', 'calendarConfig'])
    },
    mounted() {
        this.batchListData();
        this.listApplyer(); // 申请人
        this.getTreeDatas();
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
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
                let param = Object.assign({},this.searchObj)
                param.startTime = new Date(this.exportMonth[0]).format('yyyy-MM-01 00:00:00')
                param.endTime = getMonthEndDay(new Date(this.exportMonth[1]).format('yyyy-MM'));
                rptRefundArchive.export(param)
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
                this.search()
            }
        },
        pageChange(val){
            console.log(val, 'pageChange')
            this.pageNo = val
            this.search()
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
        changeDivHeight(height) {
            this.tableHeightOut = height;
        },
        search() {
            // 计算参数
            let params = Object.assign({}, this.params);
            delete params.officeIdList;
            delete params.gdType;
            delete params.total;
            params.officeIds = this.GLR.officeIds
            if(this.GLR.month && this.GLR.month.length == 2 && this.GLR.month[0] && this.GLR.month[1]) {
                let _start = new Date(this.GLR.month[0]).format("yyyy-MM") + "-01 00:00:00";
                let _end = new Date(this.GLR.month[1]).format('yyyy-MM');
                params.startTime = _start;
                params.endTime = getMonthEndDay(_end);
            } else {
                params.startTime = '';
                params.endTime = '';
            }
            if(this.currentTab == '1' || this.currentTab == '2'){
                params.archiveStatus = this.gdType
                params.pageNo = this.pageNo
                params.pageSize = this.pageSize
            }
            this.searchObj = params; //这里需要给searchObj 赋值，导出数据的时候需要用到
            this.getListData(params, this.currentTab);
        },
        initOffice(){
            if(this.app.currOfficeId == 'all'|| this.app.currOfficeId == this.parentOfficeId){
                this.$set(this.GLR, 'officeIdList', this.ininOfficeIdList);
                this.$set(this.GLR, 'officeIds',[]);
                this.$nextTick(()=>{
                    this.$forceUpdate();
                    this.getArchiveDate()
                })
            } else {
                let resultSelectObj = {}
                getSelectTreeDataByid(this.ininOfficeIdList, resultSelectObj);
                let resultIdsObj = {}
                getSelectIdsByid(this.ininOfficeIdList, resultIdsObj)
                this.$set(this.GLR, 'officeIdList', [resultSelectObj[this.app.currOfficeId]]);
                this.$set(this.GLR, 'officeIds',resultIdsObj[this.app.currOfficeId]);
                this.$nextTick(()=>{
                    this.$forceUpdate();
                    this.getArchiveDate()
                })
            }
            // console.log(this.GLR.officeIdList, this.GLR.officeIds)
        },
        reset() {
            this.params = {
                signType:'',
                category:'',
                auditStatus:'',
                applyerIds: [],
                studentName:'',
                studentId: '',
                phone:'',
            }
            this.GLR.month = []
            this.$set(this.GLR, "officeIds", []);
            this.tableData = [];
            this.gdType = '1'
            this.total = 0
            this.pageNo = 1
            this.initOffice();
        },
        clearStu() {
            this.nameList = [];
        },
        listApplyer() {
            rptRefundArchive.listApplyer({})
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.applicantList = res.data.data;
                }
            })
            .catch(errors.call(this))
        },
        stuRemote(query) {
            if (query !== '') {
                let obj = {
                    mainTable: 'com_audit_flow',
                    mainField: 'student_id',
                    joinField: 'id',
                    joinTable: 'sys_user',
                    secondField: 'name',
                    joinTableSearchParam: query,
                    joinTable: 'com_student'
                };
                this.teacherLoading = true;
                sysCommonSql.queryPageInputInitData(obj)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.nameList = res.data.data;
                    }
                })
                .catch(errors.call(this))
            }
        },
        batchListData() {
            // 获取字典项
            let types = [
                'com_audit_status',
                'ht_contract_category', // 合同分类
            ]
            sysDict.batchListData({types: types.join(',')})
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    let _data = res.data.data;
                    this.approvalStatusList = _data.com_audit_status
                    this.ctTypeList = _data.ht_contract_category
                }
            })
            .catch(errors.call(this))
        },
        getTreeDatas() {
            this.updateLoadingStatus({isLoading: true});
            sysUser.dataScopeFilterTree().then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    let _data = res.data.data;
                    if (Array.isArray(_data.children)) {
                        let officeIdList = res.data.data.children
                        this.parentOfficeId = officeIdList[0].id
                        titleTransformationToLabel(officeIdList)
                        this.ininOfficeIdList = JSON.parse(JSON.stringify(officeIdList))
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
            }).catch(errors.call(this)).finally(()=>{
                this.updateLoadingStatus({isLoading:false});
            });
        },
        getShowTitle(noSearch) {
            // 责任人退费明细
            let type = this.currentTab;
            let params = {
                pageIdentifier: 'rptRefundArchive/listPageRefundOwnerDetail',
                voName: 'com.windliven.spoc.modules.rpt.vo.RptRefundOwnerDetailVO'
            }
            if(type == '2') {
                // 学员退费明细
                params = {
                    pageIdentifier: 'rptRefundArchive/listPageRefundDetail',
                    voName: 'com.windliven.spoc.modules.rpt.vo.RptRefundDetailVO'
                }
            } else if(type == '3') {
                // 责任人汇总
                params = {
                    pageIdentifier: 'rptRefundArchive/listRefundOwnerSummary',
                    voName: 'com.windliven.spoc.modules.rpt.vo.RptRefundOwnerArchiveVO'
                }
            } else if(type == '4') {
                // 校区退费汇总
                params = {
                    pageIdentifier: 'rptRefundArchive/listRefundSummary',
                    voName: 'com.windliven.spoc.modules.rpt.vo.RptRefundArchiveVO'
                }
            } 
            rptRefundArchive.getShowTitle(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.defaultShowCol = res.data.data;
                    this.storageDataObj[type].showTitle = res.data.data;
                    if (!noSearch) {
                        this.search();
                    }
                }
            })
            .catch(errors.call(this));
        },
        getListData(params, type) {
            // console.log(type)
            let apiDocName = 'listPageRefundOwnerDetail';
            switch (type) {
                case '2': 
                    apiDocName = 'listPageRefundDetail'
                    break;
                case '3':
                    apiDocName = 'listRefundOwnerSummary'
                    break;
                case '4': 
                    apiDocName = 'listRefundSummary'
                    break;
                default: 
                    apiDocName = 'listPageRefundOwnerDetail';
                    break;
            }
            this.updateLoadingStatus({ isLoading: true });
            delete params.month;
            rptRefundArchive[apiDocName](params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    let result = res.data.data;
                    
                    if(type == '1' || type == '2') {
                        this.tableData = result.list;
                        this.total = Number(result.total);
                    } else {
                        this.tableData = result;
                    }
                    this.storageDataObj[type].tableData = this.tableData

                    let _data = Object.assign({},this.GLR, params)
                    _data.gdType = this.gdType
                    if(type == '1' || type == '2'){ // 明细
                        _data.total = Number(this.total)
                        _data.pageNo = Number(this.pageNo)
                        _data.pageSize = Number(this.pageSize)
                    }
                    this.storageDataObj[type].searchObj = _data;
                    console.log(this.storageDataObj,"this.storageDataObj~~~~~~")
                }
            })
            .catch(errors.call(this))
            .finally(() => {
                this.updateLoadingStatus({ isLoading: false });
            });
        },
        isExport() {
            this.exportMonth = [].concat(this.GLR.month)
            this.exportMonthModal = true
        },
        changeTableType(val) {
            console.log(val)
            this.pageNo = 1
            this.currentTab = val;
            this.hasPage = false
            console.log(this.storageDataObj[this.currentTab])
            if(this.storageDataObj[this.currentTab].tableData) {
                this.defaultShowCol = this.storageDataObj[this.currentTab].showTitle;
                this.params = this.storageDataObj[this.currentTab].searchObj;
                this.$set(this.GLR, 'officeIds', this.params.officeIds);
                this.$set(this.GLR, 'month', this.params.month);
                this.tableData = this.storageDataObj[this.currentTab].tableData;
                this.total = this.storageDataObj[this.currentTab].searchObj.total;
                this.pageNo = this.storageDataObj[this.currentTab].searchObj.pageNo
                this.pageSize = this.storageDataObj[this.currentTab].searchObj.pageSize
                this.gdType = this.storageDataObj[this.currentTab].searchObj.gdType
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
            if(val == '1' || val == '2'){
                this.hasPage = true
            }
            this.$nextTick(() => {
                this.$refs.searchCard && this.$refs.searchCard.initDom();
            })
        },
    },
    watch: {
         "app.currOfficeId": function(val, oldVal) {
            if (oldVal && this.$route.name == "report.refundReport") {
                this.pageNo = 1
                this.initOffice();
            }
        }
    }
}
</script>
