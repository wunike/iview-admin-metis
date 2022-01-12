<style lang="less">
    .sr-container{
        .my-table{
            width: 100%;
            background: rgba(255, 255, 255, 1);
            border-radius: 4px;
            padding: 0 16px 16px;
            margin-top: 10px;
        }
        .this-page{
            background: #fff;
            padding-bottom:20px;
            width:100%;
            text-align: center;
        }
    }
</style>

<template>
    <div class="sr-container">
        <v-search-collapse @search="search" @reset="reset" @changeDivHeight="changeDivHeight">
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
                        v-model="GLR.officeId"
                        :options="GLR.officeIdList">
                </treeselect>
            </div>
            <Select
                    v-model="gdType"
                    style="width:200px"
                    @on-change="changeGd"
            >
                <Option value="1">{{$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4470')}}</Option>
                <Option value="2" :disabled="gdTime == '-1'">{{$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4471')}}</Option>
            </Select>
            <MonthRangeDatePicker
                    type="daterange"
                    v-model="GLR.month"
                    ref="DatePicker"
                    :placeholder="$t('modules_spoc_report_web_src_views_salesreport_index_4681')"
                    style="width: 224px;"
                    :clearable="false"
                    separator=" ~ "
                    :options="options3"
                    @on-open-change="setOptTime"
            ></MonthRangeDatePicker>
            <MonthRangeDatePicker
                    type="daterange"
                    v-model="GLR.monthSignRange"
                    v-if="currentTab =='0'"
                    :placeholder="$t('modules_spoc_report_web_src_views_salesreport_index_4682')"
                    style="width: 224px;"
                    @on-open-change="setOptTime1"
            ></MonthRangeDatePicker>
            <Select
                    :placeholder="$t('modules_spoc_portal_views_contractmanage_contractmanage_3397')"
                    clearable
                    filterable
                    v-if="currentTab =='0'"
                    v-model="GLR.signType">
                <Option
                        v-for="item in GLR.signTypeList"
                        :value="item.value"
                        :key="item.value"
                >{{ item.label }}</Option>
            </Select>
            <Select  v-model="GLR.ctType"
                     v-if="currentTab =='0'"
                     :placeholder="$t('modules_spoc_report_web_src_views_refundreport_index_4663')" clearable>
                <Option
                        :value="item.value"
                        v-for="(item,index) in GLR.ctTypeList"
                        :key="index"
                >{{item.label}}</Option>
            </Select>
        </v-search-collapse>
        <journaling v-if="defaultShowCol"
                    :showSummary="currentTab != '0'"
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
                    @pageSizeChange="pageSizeChange"
                    @pageChange="pageChange"
                    @changeTableType="changeTableType">
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
    import valid, {
        errors,
        sysUser,
        sysDict,
        report, rptArchiveSchedule,
    } from "../../libs/request";
    import { mapMutations,mapState } from "vuex";
    import Treeselect from '@riophae/vue-treeselect'
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'
    import exportModal from "@public/modules/exportModal.vue";
    import journaling from '../../modules/journaling';
    import { waitUntil,
        getMonthEndDay,
        titleTransformationToLabel,
        getSelectIdsByid,
        getSelectTreeDataByid,
        defaultDatePickerValue ,
        noGdMonth,
        hasGdMonth,
        MonthrangeOpt
    } from '@public/libs/util';
    export default {
        name:'report.salesReport',
        components: {
            vSearchCollapse,
            Treeselect,
            exportModal,
            journaling,
        },
        data() {
            return {
                exportMonthModalLoading: true,
                exportMonthModal: false,
                exportMonth: [],
                options3: null,
                hasPage:false,
                total:0,
                pageNo:1,
                pageSize: this.$store.state.app.pageSizeGlobal || 10,
                gdType: '1',
                gdTime: '',
                storageDataObj: {
                    '0':{},
                    '1':{},
                    '2':{},
                    '3':{}
                },
                parentOfficeId: '',
                ininOfficeIdList: [],
                valueConsistsOf:  'LEAF_PRIORITY', // ALL、BRANCH_PRIORITY、LEAF_PRIORITY、ALL_WITH_INDETERMINATE
                currentTab:'1',
                tableHeightOut:72,
                startMonth:'',
                endMonth:'',
                startMonthSign:'',
                endMonthSign:'',
                GLR:{
                    officeId:[],
                    officeIdList:[],
                    monthSignRange:[],
                    month:[],

                    signType:'',
                    signTypeList:[
                        {value:'new',label:this.$t('modules_spoc_portal_views_contractmanage_contractmanage_3403')},
                        {value:'replenish',label:this.$t('modules_spoc_report_web_src_views_refundreport_index_4671')}
                    ],
                    ctType:'',
                    ctTypeList:[],
                },
                defaultShowCol:{},
                tableData:[],
                tableColumnArray:[],
                btnList:[
                    {
                        style: {},
                        type: "",
                        btnClick: this.export,
                        text: this.$t('integralflow_5')
                    }
                ],
                tabs:[
                    {
                        name: this.$t('modules_spoc_report_web_src_views_salesreport_index_4690'),
                        value:'1'
                    },
                    {
                        name:this.$t('modules_spoc_report_web_src_views_salesreport_index_4691'),
                        value:'2'
                    },
                    {
                        name:this.$t('modules_spoc_report_web_src_views_salesreport_index_4692'),
                        value:'3'
                    },
                    {
                        name:this.$t('modules_spoc_report_web_src_views_salesreport_index_4693'),
                        value:'0'
                    },
                ],
            }
        },
        mounted() {
            waitUntil(
                () => {
                    return (this.app.currOfficeId && this.calendarConfig.maxMonthInterval) || false;
                },
                () => {
                    let tenant = this.tenant || localStorage.getItem('tenant')
                    if(tenant == '0002'){
                        this.tabs = [
                            {
                                name: this.$t('modules_spoc_report_web_src_views_salesreport_index_4690'),
                                value:'1'
                            },
                            {
                                name:this.$t('modules_spoc_report_web_src_views_salesreport_index_4691'),
                                value:'2'
                            },
                        ]
                    } else {
                        this.tabs = [
                            {
                                name: this.$t('modules_spoc_report_web_src_views_salesreport_index_4690'),
                                value:'1'
                            },
                            {
                                name:this.$t('modules_spoc_report_web_src_views_salesreport_index_4691'),
                                value:'2'
                            },
                            {
                                name:this.$t('modules_spoc_report_web_src_views_salesreport_index_4692'),
                                value:'3'
                            },
                            {
                                name:this.$t('modules_spoc_report_web_src_views_salesreport_index_4693'),
                                value:'0'
                            },
                        ]
                    }
                    this.init()
                }
            );
        },
        computed: {
            ...mapState(["userInfo", "app", "buttonPerm", "calendarConfig", "tenant"])
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
                    let param = {
                        officeIds:this.GLR.officeId,//校区id
                    }
                    param.startTime = new Date(this.exportMonth[0]).format('yyyy-MM-01 00:00:00')
                    param.endTime = getMonthEndDay(new Date(this.exportMonth[1]).format('yyyy-MM'));
                    report.exportRptCashSalerArchive(param)
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            // console.log(res.data)
                            const blob = new Blob([res.data], {type: "application/actet-stream;charset=utf-8"});
                            const contentDisposition = res.headers["content-disposition"]; //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
                            const patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*");
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
            setOptTime(flag){
                if(flag){
                    this.GLR.month=[];
                }
            },
            setOptTime1(flag){
                if(flag){
                    this.GLR.monthSignRange=[];
                }
            },
            pageSizeChange(val){
                this.pageSize = val
                if(this.pageNo == 1){
                    this.getListData()
                }
            },
            pageChange(val){
                this.pageNo = val
                this.getListData()
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
            init(){
                this.signTypeList()
                this.getTreeDatas()
            },
            search() {
                this.pageNo = 1;
                this.findRecentlyArchiveDate(true)
            },
            initOffice(){
                if(this.app.currOfficeId == 'all'|| this.app.currOfficeId == this.parentOfficeId){
                    this.$set(this.GLR, 'officeIdList', this.ininOfficeIdList);
                    this.$set(this.GLR, 'officeId',[]);
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
                    this.$set(this.GLR, 'officeId',resultIdsObj[this.app.currOfficeId]);
                    this.$nextTick(()=>{
                        this.$forceUpdate();
                        this.getArchiveDate()
                    })
                }
            },
            reset() {
                this.GLR.officeId = []
                this.GLR.month = []
                this.GLR.monthSignRange = []
                this.GLR.signType = ''
                this.GLR.ctType = ''
                this.tableData = [];
                this.gdType = '1'
                this.total = 0
                this.pageNo = 1
                this.initOffice()
            },
            changeDivHeight(height) {
                this.tableHeightOut = height;
            },
            signTypeList() {
                sysDict
                .batchListData({
                    types: 'ht_contract_category'
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        // this.GLR.signTypeList = res.data.data.ht_contract_sign_type;
                        this.GLR.ctTypeList = res.data.data.ht_contract_category;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },


            getTreeDatas() {
                // this.updateLoadingStatus({isLoading: true});
                sysUser.dataScopeFilterTree().then(valid.call(this)).then((res)=>{
                    if(res.ok){
                        if(Array.isArray(res.data.data.children)){
                            let officeIdList = res.data.data.children
                            this.parentOfficeId = officeIdList[0].id
                            titleTransformationToLabel(officeIdList)
                            this.ininOfficeIdList = JSON.parse(JSON.stringify(officeIdList))
                            // this.GLR.officeIdList = res.data.data.children;
                            this.initOffice()
                        }
                    }
                }).catch(errors.call(this)).finally(()=>{
                    // this.updateLoadingStatus({isLoading:false});
                });
            },
            export() {
                this.exportMonth = [].concat(this.GLR.month)
                this.exportMonthModal = true
            },
            changeTableType(val) {
                this.currentTab = val
                this.pageNo = 1
                if(val === '0'){
                    this.hasPage = true
                }else {
                    this.hasPage = false
                }
                if (this.storageDataObj[this.currentTab].data) {
                    this.defaultShowCol = this.storageDataObj[this.currentTab].defaultShowCol
                    this.tableData = this.storageDataObj[this.currentTab].data;
                    let searchObj = this.storageDataObj[this.currentTab].searchObj;
                    if (searchObj) {
                        this.GLR.officeId = searchObj.officeId
                        this.GLR.month = searchObj.month
                        this.GLR.monthSignRange = searchObj.monthSignRange
                        this.GLR.signType = searchObj.signType
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
                    this.GLR.month = []
                    this.GLR.officeIds = []
                    this.gdType = '1'
                    this.total = 0
                    this.pageNo = 1
                    this.findRecentlyArchiveDate(true,false)
                }
            },
            titleKey(key){
                let params ={}
                switch(key){
                    case '0':
                        params = {
                            pageIdentifier: "RptCashSalerArchiveDetailVO",
                            voName: "com.windliven.spoc.modules.rpt.vo.RptCashSalerArchiveDetailVO"
                        };
                        break;
                    case '1':
                        params = {
                            pageIdentifier: "RptCashSalerArchiveOfficeMonthVO",
                            voName: "com.windliven.spoc.modules.rpt.vo.RptCashSalerArchiveOfficeMonthVO"
                        };
                        break;
                    case '2':
                        params = {
                            pageIdentifier: "RptCashSalerArchiveOfficeUserVO",
                            voName: "com.windliven.spoc.modules.rpt.vo.RptCashSalerArchiveOfficeUserVO"
                        };
                        break;
                    case '3':
                        params = {
                            pageIdentifier: "RptCashSalerArchiveOfficeDayVO",
                            voName: "com.windliven.spoc.modules.rpt.vo.RptCashSalerArchiveOfficeDayVO"
                        };
                        break;
                }
                return params;
            },
            getShowTitle(noSearch) {
                // this.updateLoadingStatus({ isLoading: true });
                let params = this.titleKey(this.currentTab)
                report
                .salesGetShowTitle(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.defaultShowCol = res.data.data;
                        this.storageDataObj[this.currentTab].defaultShowCol = res.data.data
                        if (!noSearch) {
                            this.getListData();
                        }
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    // this.updateLoadingStatus({ isLoading: false });
                });
            },
            listKey(key){
                let params ={}
                switch(key){
                    case '0'://明细
                        params ={
                            "officeIds":this.GLR.officeId,
                            "startTime":this.startMonth,
                            "endTime":this.endMonth,
                            "signStartTime":this.startMonthSign,
                            "signEndTime":this.endMonthSign,
                            "signType":this.GLR.signType,
                            "contractType":this.GLR.ctType,
                            "pageNo":this.pageNo,
                            pageSize:this.pageSize,
                        };
                        break;
                    default://其他
                        params = {
                            "officeIds":this.GLR.officeId,
                            "userIds":[],
                            "startTime":this.startMonth,
                            "endTime":this.endMonth
                        };
                }
                return params;
            },
            getListData() {
                this.updateLoadingStatus({ isLoading: true });
                if (this.GLR.month[0]) {
                    this.startMonth = new Date(this.GLR.month[0]).format('yyyy-MM-01 00:00:00');
                } else {
                     this.startMonth =''
                }
                if (this.GLR.month[1]) {
                    this.endMonth = getMonthEndDay(new Date(this.GLR.month[1]).format('yyyy-MM'));
                } else {
                     this.endMonth =''
                }
                if (this.GLR.monthSignRange[0]) {
                    this.startMonthSign = new Date(this.GLR.monthSignRange[0]).format('yyyy-MM-01 00:00:00');
                } else {
                     this.startMonthSign =''
                }
                if (this.GLR.monthSignRange[1]) {
                    this.endMonthSign = getMonthEndDay(new Date(this.GLR.monthSignRange[1]).format('yyyy-MM'));
                } else {
                     this.endMonthSign =''
                }
                let param = this.listKey(this.currentTab)

                let api = null;
                switch(this.currentTab){
                    case '0':
                        param.archiveStatus = this.gdType
                        api = report.salesCash(param);
                        break;
                    case '1':
                        api = report.officeCashSummaryByMonth(param);
                        break;
                    case '2':
                        api = report.officeUserCashSummaryByMonth(param);
                        break;
                    case '3':
                        api = report.officeCashSummaryByDay(param);
                        break;
                }
                api.then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        if(this.currentTab == '0'){
                            this.tableData = res.data.data.list
                            this.total = Number(res.data.data.total)
                        }else{
                            this.tableData = res.data.data
                        }
                        this.storageDataObj[this.currentTab].data = this.tableData
                        let _data = Object.assign({},this.GLR)
                        delete _data.officeIdList
                        delete _data.signTypeList
                        delete _data.ctTypeList
                        _data.gdType = this.gdType

                        if(this.currentTab == "0"){ // 明细
                            _data.total = Number(this.total)
                            _data.pageNo = Number(this.pageNo)
                            _data.pageSize = Number(this.pageSize)
                        }
                        this.storageDataObj[this.currentTab].searchObj =_data
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
            },
        },
        watch: {
            "app.currOfficeId": function(val, oldVal) {
                // console.log(val)
                if (oldVal && this.$route.name == "report.salesReport") {
                    this.pageNo = 1
                    this.initOffice()
                }
            }
        }
    }
</script>
