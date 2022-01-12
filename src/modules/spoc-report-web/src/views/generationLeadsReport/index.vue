<style lang="less">
.glr-container{
    .query_sources{
        .ivu-select-dropdown{
            min-width: 300px !important;
        }
        .ivu-input-wrapper{
            width: calc(~"100% - 12px");
            margin: 0 6px;
        }
    }
    .my-table {
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
    <div class="glr-container">
        <v-search-collapse ref="searchCollapse" @search="search" @reset="reset" @changeDivHeight="changeDivHeight">
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
            <Select v-model="gdType" style="width:200px" @on-change="changeGd">
                <Option value="1">{{$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4470')}}</Option>
                <Option value="2" :disabled="gdTime == '-1'">{{$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4471')}}</Option>
            </Select>
            <MonthRangeDatePicker
                    v-model="GLR.month"
                    ref="DatePicker"
                    type="daterange"
                    style="width: 224px;"
                    :placeholder="$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4480')"
                    :clearable="false"
                    separator=" ~ "
                    :options="options3"
                    @on-open-change="setOptTime">
            </MonthRangeDatePicker>
            <Select
                    v-if="currentTab == '0'||currentTab == '4'||currentTab == '1'"
                    :placeholder="$t('modules_spoc_crm_web_src_views_customermanagement_index_1267')"
                    style="width:224px;"
                    class="query_sources"
                    multiple
                    loading-:text="$t('modules_spoc_core_web_src_views_staff_components_staffdynamic_301')"
                    :loading="querySourcesLoading"
                    v-model="GLR.querySources">
                <Input v-model="custQuery" suffix="ios-search"  :placeholder="$t('modules_spoc_report_web_src_views_generationleadsreport_index_4604')" clearable @on-change="firstSourceChange(custQuery)"/>
                <Option

                        v-for="item in customerSource"
                        :value="item.value"
                        :key="item.value"
                >{{ item.name }}</Option>
            </Select>
            <Select
                    style="width: 140px;"
                    v-if="currentTab == '0'||currentTab == '2'"
                    v-model="GLR.activityType" multiple :placeholder="$t('modules_spoc_report_web_src_views_generationleadsreport_index_4605')" clearable>
                <Option :value="item.id" v-for="(item,index) in activityTypeList" :key="index">{{item.name}}</Option>
            </Select>
            <Select
                    v-if="currentTab == '0'"
                    :placeholder="$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_688')"
                    style="width: 140px;"
                    v-model="GLR.ownerId"
                    filterable
                    remote
                    clearable
                    @on-clear="ownerClear"
                    :loading="loadingCreateById"
                    :remote-method="remoteCreateById" >
                <Option v-for="item in ownerIdList" :value="item.value" :key="item.value">{{ item.name }}</Option>
            </Select>
            <Select
                    v-if="currentTab == '0'"
                    :placeholder="$t('modules_spoc_report_web_src_views_generationleadsreport_index_4607')"
                    style="width: 140px;"
                    v-model="GLR.promoter"
                    filterable
                    remote
                    clearable
                    :loading="loadingCreateByIdPro"
                    @on-clear="promoterClear"
                    :remote-method="remoteCreateByIdPro" >
                <Option v-for="item in promoterList" :value="item.channelId" :key="item.channelId">{{ item.channelName }}</Option>
            </Select>
            <Select
                    v-if="currentTab == '0'"
                    :placeholder="$t('modules_spoc_report_web_src_views_generationleadsreport_index_4608')"
                    style="width: 140px;"
                    clearable
                    v-model="GLR.signType" >
                <Option v-for="item in signTypeList" :value="item.value[0]" :key="item.value">{{ item.name }}</Option>
            </Select>
            <Select
                    v-if="currentTab == '0'"
                    :placeholder="$t('modules_spoc_report_web_src_views_generationleadsreport_index_4609')"
                    style="width: 140px;"
                    clearable
                    v-model="GLR.signClass" >
                <Option v-for="item in signClassList" :value="item.value" :key="item.id">{{ item.label }}</Option>
            </Select>
        </v-search-collapse>
                    <!-- :showSummary="currentTab != '0' && currentTab != '4' && currentTab != '1'" -->
        <journaling v-if="defaultShowCol"
                    class="my-table"
                    :showSummary="false"
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
        <export-modal ref="exportModal" :exportMethod="exportMethod"></export-modal>
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
        report,
        sysCommonSql, rptArchiveSchedule
    } from "../../libs/request";
    import {
        crmActivity,
        crmChannel,
    } from "../../../../spoc-crm-web/src/libs/request";
    import { mapMutations,mapState } from "vuex";
    import exportModal from "@public/modules/exportModal.vue";
    import journaling from '../../modules/journaling';
    import { 
        waitUntil,
        getMonthEndDay,
        titleTransformationToLabel,
        getSelectIdsByid,
        getSelectTreeDataByid,
        defaultDatePickerValue,
        noGdMonth,
        hasGdMonth,
        MonthrangeOpt
    } from '@public/libs/util';
    import Treeselect from '@riophae/vue-treeselect';
    import '@riophae/vue-treeselect/dist/vue-treeselect.css';
    export default {
        name:'report.generationLeadsReport',
        components: {
            vSearchCollapse,
            Treeselect,
            exportModal,
            journaling
        },
        data() {
            return {
                exportMonthModalLoading: true,
                exportMonthModal: false,
                exportMonth: [],
                options3: null,
                hasPage: true,
                gdType: '1',
                gdTime: '',
                storageDataObj: {
                    '0':{},
                    '1':{},
                    '2':{},
                    '3':{},
                    '4':{}
                },
                parentOfficeId: '',
                ininOfficeIdList: [],
                valueConsistsOf:  'LEAF_PRIORITY', // ALL、BRANCH_PRIORITY、LEAF_PRIORITY、ALL_WITH_INDETERMINATE
                querySourcesLoading:false,
                querySourcesLoadText:'',
                currentTab:'1',
                tableHeightOut:72,
                month:[],
                startTime:'',
                startMonth:'',
                endMonth:'',
                custQuery:'',
                customerSourceCopy:[],
                loadingCreateById:false,
                loadingCreateByIdPro:false,
                customerSource:[],
                activityTypeList:[],
                ownerIdList:[],
                promoterList:[],
                signTypeList:[],
                signClassList:[],
                GLR:{
                    officeId:[],
                    officeIdList:[],
                    month:[],
                    querySources:[],
                    activityType:[],
                    ownerId:'',
                    promoter:'',
                    signType:'',
                    signClass:'',
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
                        name: this.$t('modules_spoc_report_web_src_views_generationleadsreport_index_4612'),
                        value:'1'
                    },
                    {
                        name: this.$t('modules_spoc_report_web_src_views_generationleadsreport_index_4613'),
                        value:'2'
                    },
                    {
                        name: this.$t('modules_spoc_report_web_src_views_generationleadsreport_index_4614'),
                        value:'3'
                    },
                    {
                        name: this.$t('modules_spoc_report_web_src_views_generationleadsreport_index_4615'),
                        value:'4'
                    },
                    {
                        name:this.$t('modules_spoc_report_web_src_views_generationleadsreport_index_4616'),
                        value:'0'
                    },
                ],
                total:0,
                pageNo:1,
                pageSize: this.$store.state.app.pageSizeGlobal || 10,
            }
        },
        computed: {
            ...mapState(["userInfo", "app", "buttonPerm", "calendarConfig"]),
        },
        mounted() {
            waitUntil(
                () => {
                    return (this.app.currOfficeId && this.calendarConfig.maxMonthInterval) || false;
                },
                () => {
                    this.init()
                }
            );
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
                    report.exportChannelConver(param)
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
            findRecentlyArchiveDate(isInit,noSearch){
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
                    this.getShowTitle(noSearch);
                }
            },
            changeTableType(val) {
                this.currentTab = val

                //全部都分页
                // this.hasPage = false
                // if(val === '0' || val === '4' || val === '1'){
                //     this.pageNo = 1
                //     this.hasPage = true
                // }else {
                //     this.hasPage = false
                // }

                if (this.storageDataObj[this.currentTab].data) {
                    this.defaultShowCol = this.storageDataObj[this.currentTab].defaultShowCol
                    this.tableData = this.storageDataObj[this.currentTab].data;
                    let searchObj = this.storageDataObj[this.currentTab].searchObj;
                    console.log(this.storageDataObj, searchObj)
                    if (searchObj) {
                        this.GLR.officeId = searchObj.officeId
                        this.GLR.month = searchObj.month
                        this.GLR.querySources = searchObj.querySources
                        this.GLR.activityType = searchObj.activityType
                        this.GLR.ownerId = searchObj.ownerId
                        this.GLR.promoter = searchObj.promoter
                        this.GLR.signType = searchObj.signType
                        this.GLR.signClass = searchObj.signClass
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
                this.$nextTick(() => {
                    this.$refs.searchCollapse.initDom();
                })
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
            init(){
                this.ownerIdChange()
                this.batchListData()
                this.getCustomerSource()
                this.signListFn()
                this.getTreeDatas()
            },
            search() {
                this.pageNo = 1;
                this.findRecentlyArchiveDate(true)
            },
            reset() {
                this.GLR.month = []
                this.GLR.querySources = []
                this.custQuery = ''
                this.GLR.activityType = []
                this.GLR.ownerId = ''
                this.GLR.promoter = ''
                this.GLR.signType = ''
                this.GLR.signClass = ''
                this.tableData = [];
                this.gdType = '1'
                this.total = 0
                this.pageNo = 1
                this.initOffice()
            },
            signListFn() {
                this.updateLoadingStatus({ isLoading: true });
                sysDict.batchListData({type:'ht_contract_category'}).then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.signClassList = res.data.data.ht_contract_category
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    // this.updateLoadingStatus({ isLoading: false });
                });
            },
            remoteCreateByIdPro(query) {
                this.loadingCreateById = true;
                let params = {
                    "name": query,
                    "pageNo": 1,
                    "pageSize": 50
                };
                crmChannel
                .listPage(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.promoterList = res.data.data.list;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.loadingCreateById = false;
                });
            },
            ownerClear() {
                this.GLR.ownerId = ''
                this.ownerIdList = []
            },
            promoterClear() {
                this.GLR.promoter = ''
                this.promoterList = []
            },
            remoteCreateById(query) {
                this.loadingCreateById = true;
                let params = {
                    joinField: "id",
                    joinTable: "sys_user",
                    mainField: "create_by",
                    mainTable: "crm_customer",
                    pageSize: "15",
                    secondField: "name",
                    joinTableSearchParam: query
                };
                sysCommonSql
                .queryPageInputInitData(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.ownerIdList = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.loadingCreateById = false;
                });
            },
            firstSourceChange(val) {
                // 三级渠道
                val=val?val.toLowerCase():''
                let reg = new RegExp(val);
                let arr = [];
                for (let i = 0; i < this.customerSourceCopy.length; i++) {
                    let name=this.customerSourceCopy[i].name;
                    if (reg.test(name?name.toLowerCase():'')) {
                        arr.push(this.customerSourceCopy[i]);
                    }
                }
                if(arr.length){
                    this.querySourcesLoading=false;
                    this.querySourcesLoadText=null;
                }else{
                    this.querySourcesLoading=true;
                    this.querySourcesLoadText=this.$t('modules_spoc_core_web_src_views_staff_components_staffdynamic_301');
                }
                this.customerSource = arr
            },
            ownerIdChange() {
                //登记人
                sysDict.getDictStringTree({type:'ht_contract_sign_type'}).then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.signTypeList = res.data.data
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
            batchListData() {
                this.updateLoadingStatus({ isLoading: true });
                let params ={
                    pageNo:1,
                    pageSize:50,
                }
                 crmActivity
                .listCrmActivityPage(
                    params
                )
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.activityTypeList = res.data.data.list
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    // this.updateLoadingStatus({ isLoading: false });
                });

            },
            getCustomerSource() {
                this.updateLoadingStatus({ isLoading: true });
                sysDict.getDictStringTree({type:'crm_customer_source'}).then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.customerSourceCopy = res.data.data;
                        this.customerSource = Object.assign([],this.customerSourceCopy)
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    // this.updateLoadingStatus({ isLoading: false });
                });
            },
            getTreeDatas() {
                this.updateLoadingStatus({isLoading: true});
                sysUser.dataScopeFilterTree().then(valid.call(this)).then((res)=>{
                    if(res.ok){
                        // console.log(res)
                        if(Array.isArray(res.data.data.children)){
                            let officeIdList = res.data.data.children
                            this.parentOfficeId = officeIdList[0].id
                            titleTransformationToLabel(officeIdList)
                            this.ininOfficeIdList = JSON.parse(JSON.stringify(officeIdList))
                            this.initOffice()
                            // this.getListData('1')
                        }
                    }
                }).catch(errors.call(this)).finally(()=>{
                    // this.updateLoadingStatus({isLoading:false});
                });
            },
            titleKey(key){
                let params ={}
                switch(key){
                    case '0':
                        params = {
                            pageIdentifier: "rptChannelConverDetailVO",
                            voName: "RptChannelConverDetailVO"
                        };
                        break;
                    case '4':
                        params = {
                            pageIdentifier: "rptChannelConverOfficeCollectVO",
                            voName: "RptChannelConverOfficeCollectVO"
                        };
                        break;
                    case '1':
                        params = {
                            pageIdentifier: "rptChannelConverCollectVO",
                            voName: "RptChannelConverCollectVO"
                        };
                        break;
                    case '2':
                        params = {
                            pageIdentifier: "rptChannelConverActivityCollectVO",
                            voName: "RptChannelConverActivityCollectVO"
                        };
                        break;
                    case '3':
                        params = {
                            pageIdentifier: "rptChannelConverSalerCollectVO",
                            voName: "RptChannelConverSalerCollectVO"
                        };
                        break;
                }
                return params;
            },
            getShowTitle(noSearch) {
                // this.updateLoadingStatus({ isLoading: true });
                let params = this.titleKey(this.currentTab)
                report
                .channelGetShowTitle(params)
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
                            pageNo:this.pageNo,
                            pageSize:this.pageSize,
                            officeIds:this.GLR.officeId,//校区id
                            cityId:'',//城市id
                            startTime:this.startMonth,//开始时间
                            endTime:this.endMonth,//结束时间
                            querySources:this.GLR.querySources,//渠道来源
                            activityIds:this.GLR.activityType,//活动id
                            createByIds:this.GLR.ownerId!= ''&& this.GLR.ownerId?[this.GLR.ownerId]:[],//登记人id
                            promotionIds:this.GLR.promoter != ''&& this.GLR.promoter?[this.GLR.promoter]:[],//促销员id
                            signType:this.GLR.signType,//签约类型
                            signClassify:this.GLR.signClass//签约分类
                        };
                        break;
                    case '4'://渠道跟进人汇总
                        params = {
                            pageNo:this.pageNo,
                            pageSize:this.pageSize,
                            officeIds:this.GLR.officeId,//校区id
                            cityId:'',//城市id
                            startTime:this.startMonth,//开始时间
                            endTime:this.endMonth,//结束时间
                            querySources:this.GLR.querySources,//渠道来源
                        };
                        break;
                    case '1'://渠道转化汇总
                        params = {
                            pageNo:this.pageNo,
                            pageSize:this.pageSize,
                            officeIds:this.GLR.officeId,//校区id
                            cityId:'',//城市id
                            startTime:this.startMonth,//开始时间
                            endTime:this.endMonth,//结束时间
                            querySources:this.GLR.querySources,//渠道来源
                        };
                        break;
                    case '2'://活动汇总
                        params = {
                            pageNo:this.pageNo,
                            pageSize:this.pageSize,
                            officeIds:this.GLR.officeId,//校区id
                            cityId:'',//城市id
                            startTime:this.startMonth,//开始时间
                            endTime:this.endMonth,//结束时间
                            activityIds:this.GLR.activityType,//活动id
                        };
                        break;
                    case '3'://跟进人汇总
                        params = {
                            pageNo:this.pageNo,
                            pageSize:this.pageSize,
                            officeIds:this.GLR.officeId,//校区id
                            cityId:'',//城市id
                            startTime:this.startMonth,//开始时间
                            endTime:this.endMonth,//结束时间
                        };
                        break;
                }
                return params;
            },
            getListData() {
                this.updateLoadingStatus({ isLoading: true });
                if (this.GLR.month[0]) {
                    this.startMonth = new Date(this.GLR.month[0]).format('yyyy-MM-01 00:00:00');
                } else {
                    this.startMonth = ''
                }
                if (this.GLR.month[1]) {
                    this.endMonth = getMonthEndDay(new Date(this.GLR.month[1]).format('yyyy-MM'));
                } else {
                    this.endMonth = ''
                }
                let param = this.listKey(this.currentTab)
                let api = null;
                let key = this.currentTab
                param.archiveStatus = this.gdType
                switch(key){
                    case '0':
                        // param.archiveStatus = this.gdType
                        api = report.channelListPage(param);//渠道转化明细
                        break;
                    case '4':
                        // param.archiveStatus = this.gdType
                        api = report.channelFindChannelSalerCollect(param);//渠道跟进人明细
                        break;
                    case '1':
                        // param.archiveStatus = this.gdType
                        api = report.channelFindChannelConverCollect(param);//渠道转化汇总
                        break;
                    case '2':
                        api = report.channelfindChannelConverActivityCollect(param);//活动汇总
                        break;
                    case '3':
                        api = report.channelListChannelConverSalerCollect(param);//跟进人汇总
                        break;
                }
                api.then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        // 全部都分页，不做判断
                        // if(this.currentTab == '0' || this.currentTab == '4' || this.currentTab == '1'){
                            this.tableData = res.data.data.list
                            this.total = Number(res.data.data.total)
                        // }else{
                        //     this.tableData = res.data.data
                        // }
                        this.storageDataObj[this.currentTab].data = this.tableData
                        let _data = Object.assign({},this.GLR)
                        _data.gdType = this.gdType

                        // if(this.currentTab == "0" || this.currentTab == "4" || this.currentTab == "1"){ // 明细
                            _data.total = Number(this.total)
                            _data.pageNo = Number(this.pageNo)
                            _data.pageSize = Number(this.pageSize)
                        // }
                        this.storageDataObj[this.currentTab].searchObj =_data
                        console.log(this.storageDataObj)
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
            },
            export() {
                this.exportMonth = [].concat(this.GLR.month)
                this.exportMonthModal = true
            },
            exportMethod() {

            },

        },
        watch: {
            "app.currOfficeId": function(val, oldVal) {
                // console.log(val)
                if (oldVal && this.$route.name == "report.generationLeadsReport") {
                    this.pageNo = 1
                    this.initOffice()
                }
            }
        }
    }
</script>
