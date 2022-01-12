<style lang="less">
.glr-container {
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
    <div class="glr-container">
        <v-search-collapse @search="doSearch" @reset="reset" @changeDivHeight="changeDivHeight">
            <div class="treeSelectCos" style="width: 224px;" v-show="currentTab== '1'">
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
                ref="DatePicker"
                :clearable="false"
                separator=" ~ "
                :options="options3"
                @on-open-change="setOptTime"
                v-model="GLR.month"
                type="daterange"
                :placeholder="$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4472')"
                style="width:224px;"
            ></MonthRangeDatePicker>
            <!-- <tree-select :placeholder="$t('modules_spoc_crm_web_src_views_clientareaaround_clientareaaround_781')" v-model="GLR.officeId" style="width: 224px;" check-strictly :expand-all="true" :data="GLR.officeIdList"></tree-select> -->
        </v-search-collapse>
        <journaling
            v-if="defaultShowCol"
            class="my-table"
            :tableName="tabs"
            :tableData="tableData"
            :defaultShowCol="defaultShowCol"
            :changeColEveryChange="true"
            :btnList="btnList"
            :tableHeightOut="tableHeightOut"
            @changeTableType="changeTableType"
            :showSummary="false"
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
        <!-- <export-modal ref="exportModal" :exportMethod="exportMethod"></export-modal> -->
    </div>
</template>

<script>
import vSearchCollapse from '@public/modules/vSearchCollapse';
import valid, { errors, sysOffice, sysUser, common, sysDict, sysCommonSql, rptCentralArchive, rptArchiveSchedule } from '../../libs/request';
import { mapMutations, mapState } from 'vuex';
import journaling from '../../modules/journaling';
// import exportModal from '@public/modules/exportModal.vue';
// import TreeSelect from '_c/tree-select';
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { waitUntil, MonthrangeOpt, noGdMonth, hasGdMonth, defaultDatePickerValue, getMonthEndDay, titleTransformationToLabel, getSelectIdsByid, getSelectTreeDataByid} from '@public/libs/util';

export default {
    name:'report.centerReport',
    data() {
        return {
            exportMonthModalLoading: true,
            exportMonthModal: false,
            exportMonth: [],
            gdType: '1',
            gdTime: '',
            storageDataObj: {
                '0':{},
                '1':{}
            },
            parentOfficeId: '',
            ininOfficeIdList: [],
            valueConsistsOf:  'LEAF_PRIORITY', // ALL、BRANCH_PRIORITY、LEAF_PRIORITY、ALL_WITH_INDETERMINATE
            currentTab: '0',
            options3: null,
            tableHeightOut: 72,
            GLR: {
                officeId: [],
                officeIdList: [],
                month: '',
                name: '',
            },
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
            // exportMethod: crmActivity.exportSelectedFile, //导出用到的方法对象
            tabs: [
                {
                    name: this.$t('modules_spoc_report_web_src_views_centerreport_centerreport_4554'),
                    value: '0'
                },
                {
                    name: this.$t('modules_spoc_report_web_src_views_centerreport_centerreport_4555'),
                    value: '1'
                }
            ],
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
        this.getTreeDatas()
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        doSearch(){
            this.pageNo = 1
            this.findRecentlyArchiveDate(true)
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
                    officeIds:this.GLR.officeId,//校区id
                }
                param.startTime = new Date(this.exportMonth[0]).format('yyyy-MM-01 00:00:00')
                param.endTime = getMonthEndDay(new Date(this.exportMonth[1]).format('yyyy-MM'));
                rptCentralArchive
                .export(param)
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
                    if(true){
                        let months = this.GLR.month[0] ? this.GLR.month : defaultDatePickerValue(this.calendarConfig.maxMonthInterval)
                        if(new Date(months[0]).getTime() < new Date(_gdTimeStr).getTime()){
                            // 判断开始月份是否超过了归档点。超过修改开始月份为归档点（加1000后的归档点）
                            months[0] = new Date(_gdTimeStr)
                        }
                        this.GLR.month = months
                    }
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
                    if(true){
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
                    }
                }
            } else {
                // 只有未月结数据
                this.gdType = '1'
                
                this.options3 = MonthrangeOpt(this,'DatePicker',Number(this.calendarConfig.maxMonthInterval))
                // if(!noSetMonth){
                if(true){
                    if(this.GLR.month && this.GLR.month[0]){
                        //有选中的月份。无需修改
                    } else {
                        this.GLR.month = defaultDatePickerValue(this.calendarConfig.maxMonthInterval)
                    }
                }
            }
            if(isInit){
                this.getShowTitle();
            }
        },
        getTreeDatas() {
            this.updateLoadingStatus({ isLoading: true });
            sysUser
                .dataScopeFilterTree()
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        if (Array.isArray(res.data.data.children)) {
                            let officeIdList = res.data.data.children
                            this.parentOfficeId = officeIdList[0].id
                            titleTransformationToLabel(officeIdList)
                            this.ininOfficeIdList = JSON.parse(JSON.stringify(officeIdList))
                            // this.GLR.officeIdList = officeIdList;
                            console.log(this.GLR.officeIdList, this.parentOfficeId,'this.GLR.officeIdList')
                            waitUntil(
                                () => {
                                    return (this.app.currOfficeId&&this.calendarConfig.maxMonthInterval) || false;
                                },
                                () => {
                                    this.initOffice()
                                    // this.findRecentlyArchiveDate(true)
                                    // this.GLR.month = defaultDatePickerValue(this.calendarConfig.maxMonthInterval)
                                    // this.getShowTitle();
                                }
                            );
                        }
                    } else {
                        this.updateLoadingStatus({ isLoading: false });
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    // this.updateLoadingStatus({ isLoading: false });
                });
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
            this.GLR.month = []
            this.gdType = '1'
            this.initOffice()
            // this.findRecentlyArchiveDate(true)
        },
        changeDivHeight(height) {
            this.tableHeightOut = height;
        },
        getShowTitle(noSearch) {
            let months = []
            if(!this.GLR.month[0]){
                // this.GLR.month = defaultDatePickerValue(this.calendarConfig.maxMonthInterval)
            }
            console.log(this.GLR.month)
            let startYear = Number(this.GLR.month[0].format('yyyy'))
            let startMonth = Number(this.GLR.month[0].format('MM'))
            let endYear = Number(this.GLR.month[1].format('yyyy'))
            let endMonth = Number(this.GLR.month[1].format('MM'))

            console.log(startYear, startMonth, endYear, endMonth)

            for(; (startYear < endYear && startMonth <= 12) || (startYear == endYear && startMonth <= endMonth); startMonth++){
                // months.push(startYear + '-' + startMonth)
                months.push(startYear + '-' + (startMonth < 10 ? ('0' + startMonth) : startMonth))
                if(startMonth == 12){
                    startYear += 1
                    startMonth = 0
                }
            }
            console.log(months,"months")
            let trueAarray = [
                {
                    "name": "index",
                    "title": this.$t('courselist_compontents_detailinfo_160'),
                    "selected": true,
                    "required": true,
                    "total": false,
                    "filter": "",
                    "sort": 0,
                    "dynamiced": false
                },
                // {
                //     "name": 'cityName',
                //     "title": '城市',
                //     "selected": true,
                //     "required": true,
                //     "total": false,
                //     "filter": "",
                //     "sort": 0,
                //     "dynamiced": false
                // },
                {
                    "name": "officeName",
                    "title": this.$t('modules_spoc_report_web_src_views_centerreport_centerreport_4558'),
                    "selected": true,
                    "required": true,
                    "total": false,
                    "filter": "",
                    "sort": 0,
                    "dynamiced": false
                },
                {
                    "name": "function",
                    "title": this.$t('modules_spoc_report_web_src_views_centerreport_centerreport_4559'),
                    "selected": true,
                    "required": true,
                    "total": false,
                    "filter": "",
                    "sort": 0,
                    "dynamiced": false
                },
                {
                    "name": "item",
                    "title": this.$t('modules_spoc_report_web_src_views_centerreport_centerreport_4560'),
                    "selected": true,
                    "required": true,
                    "total": false,
                    "filter": "",
                    "sort": 0,
                    "dynamiced": false
                },
                {
                    "name": "code",
                    "title": "Items",
                    "selected": true,
                    "required": true,
                    "total": false,
                    "filter": "",
                    "sort": 0,
                    "dynamiced": false
                },
                {
                    "name": 'ytd',
                    "title": 'TTL',
                    "selected": true,
                    "required": true,
                    "total": false,
                    "filter": "",
                    "sort": 0,
                    "dynamiced": false
                }
            ]

            months.forEach(itemChild => {
                trueAarray.push(
                    {
                        "name": itemChild,
                        "title": itemChild,
                        "selected": true,
                        "required": true,
                        "total": false,
                        "filter": "",
                        "sort": 0,
                        "dynamiced": false
                    }
                )
            });

            // trueAarray.push(
            //     {
            //         "name": 'ytd',
            //         "title": 'YTD',
            //         "selected": true,
            //         "required": true,
            //         "total": false,
            //         "filter": "",
            //         "sort": 0,
            //         "dynamiced": false
            //     }
            // )

            if(this.currentTab == '1'){
                trueAarray.splice(1,0,{
                    "name": 'cityName',
                    "title": this.$t('modules_spoc_report_web_src_views_centerreport_centerreport_4561'),
                    "selected": true,
                    "required": true,
                    "total": false,
                    "filter": "",
                    "sort": 0,
                    "dynamiced": false
                })
            }

            this.defaultShowCol = {
                "true": trueAarray
            }
            console.log(trueAarray,'trueAarray~~~~~~~`')
            if(!noSearch){
                this.getListData(months);
            }
        },
        getListData(months) {
            this.updateLoadingStatus({ isLoading: true });

            let param = {
                startTime: '',
                endTime: '',
            };
            if(this.currentTab == '1'){
                param.officeIds = this.GLR.officeId
            }

            if (this.GLR.month[0]) {
                param.startTime = new Date(this.GLR.month[0]).format('yyyy-MM-01 00:00:00');
            }
            if (this.GLR.month[1]) {
                param.endTime = getMonthEndDay(new Date(this.GLR.month[1]).format('yyyy-MM'));
            }
            // this.searchObj = param; //这里需要给searchObj 赋值，导出数据的时候需要用到
            if (this.currentTab == '0') {
                rptCentralArchive.listPageCentralSummary(param)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let result = res.data.data
                        let tableData = []
                        result.forEach((itemChild, index)=> {
                            let obj = {
                                index: index + 1,
                                cityName: itemChild.cityName,
                                officeName: itemChild.officeName,
                                function: itemChild.function,
                                item: itemChild.item,
                                code: itemChild.code,
                                // ytd: itemChild.ytd
                            }
                            if(itemChild.valueType == 'percent') {
                                obj.ytd = itemChild.ytd
                            } else if(itemChild.valueType == 'float') {
                                obj.ytd = Number(itemChild.ytd).toFixed(2)
                            } else {
                                obj.ytd = Number(itemChild.ytd)
                            }
                            months.forEach((monthsItem, monthsIndex)=>{
                                // obj[monthsItem] = (Math.random() * 100).toFixed(2)
                                // obj[monthsItem] = itemChild.values[monthsIndex]

                                // let _obj = itemChild.values[monthsIndex]
                                let _obj = itemChild.values
                                for(let key in _obj){
                                    if(itemChild.valueType == 'percent') {
                                        obj[key] = _obj[key]
                                    } else if(itemChild.valueType == 'float') {
                                        obj[key] = Number(_obj[key]).toFixed(2)
                                    } else {
                                        obj[key] = Number(_obj[key])
                                    }
                                }
                            })

                            tableData.push(obj)
                        });

                        this.tableData = tableData
                        console.log(tableData,'~~~~~~~~~~~')
                        this.storageDataObj[this.currentTab].data = tableData
                        this.storageDataObj[this.currentTab].searchObj = {
                            'GLR.month': this.GLR.month,
                            'GLR.officeId': [],
                            'gdType': this.gdType
                        }
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });

            } else {
                rptCentralArchive.listPageCentralDetail(param)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let result = res.data.data
                        let tableData = []
                        result.forEach((itemChild, index)=> {
                            let obj = {
                                index: index + 1,
                                cityName: itemChild.cityName,
                                officeName: itemChild.officeName,
                                function: itemChild.function,
                                item: itemChild.item,
                                code: itemChild.code,
                                // ytd: itemChild.ytd
                            }
                            if(itemChild.valueType == 'percent') {
                                obj.ytd = itemChild.ytd
                            } else if(itemChild.valueType == 'float') {
                                obj.ytd = Number(itemChild.ytd).toFixed(2)
                            } else {
                                obj.ytd = Number(itemChild.ytd)
                            }
                            months.forEach((monthsItem, monthsIndex)=>{
                                // let _obj = itemChild.values[monthsIndex]
                                let _obj = itemChild.values
                                for(let key in _obj){
                                    if(itemChild.valueType == 'percent') {
                                        obj[key] = _obj[key]
                                    } else if(itemChild.valueType == 'float') {
                                        obj[key] = Number(_obj[key]).toFixed(2)
                                    } else {
                                        obj[key] = Number(_obj[key])
                                    }
                                }
                            })

                            tableData.push(obj)
                        });

                        this.tableData = tableData
                        this.storageDataObj[this.currentTab].data = tableData
                        this.storageDataObj[this.currentTab].searchObj = {
                            'GLR.month': this.GLR.month,
                            'GLR.officeId': this.GLR.officeId,
                            'gdType': this.gdType
                        }
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
            }
        },
        export() {
            this.exportMonth = [].concat(this.GLR.month)
            this.exportMonthModal = true
        },
        changeTableType(val) {
            this.currentTab = val;
            console.log('changeTableType')
            if(this.storageDataObj[this.currentTab].data){
                this.tableData = this.storageDataObj[this.currentTab].data
                let searchObj = this.storageDataObj[this.currentTab].searchObj
                if(searchObj){
                    this.$set(this.GLR, 'officeId',searchObj['GLR.officeId']);
                    this.$set(this.GLR, 'month',searchObj['GLR.month']);
                    this.gdType = searchObj['gdType']
                }
                this.getShowTitle(true);
                this.findRecentlyArchiveDate(false,true)
            } else { 
                this.tableData = []
                this.GLR.month = []
                this.GLR.officeId = []
                this.gdType = '1'
                this.findRecentlyArchiveDate(true,false)
            }
        },
        setOptTime(flag){
            if(flag){
                this.GLR.month=[];
            }
        },
    },
    watch: {
        'app.currOfficeId': function(val, oldVal) {
            if (oldVal && this.$route.name == 'report.centerReport' && this.currentTab == '1') {
                this.pageNo = 1
                this.initOffice()
                // this.$nextTick(()=>{
                //     this.findRecentlyArchiveDate(true)
                //     // this.getShowTitle();
                // })
            }
        },
    }
};
</script>
