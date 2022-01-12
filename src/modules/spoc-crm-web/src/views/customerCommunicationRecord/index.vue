<style lang="less">
.custom-communication-record {
    .my-table {
        width: 100%;
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
    .fast-date{
        width:100%;
        height:50px;
        margin-top: 10px;
        background: #fff;
        padding-left: 24px;
        /*margin-bottom:-2px;*/
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items:center;
        border-bottom: 1px solid rgb(220, 222, 226);
        li{
            padding-top:18px;
            margin-bottom:-2px;
            height:100%;
            margin-right: 40px;
            cursor: pointer;
            font-size: 14px;
            font-weight: normal;
            border-bottom: 2px solid transparent;
            &:hover{
                /*color:#44bcb7;*/
            }
            &.active{
                /*color:#44bcb7;*/
                /*border-bottom: 2px solid #44bcb7;*/
            }
        }
    }
    .table-name-slot{
        margin-left: -16px;
        font-family: PingFangSC-Regular, PingFang SC;
        margin-bottom: -7px;
        font-size: 12px;
        font-weight: 600;
        a{
            font-weight: normal;
            font-size: 16px;
            padding:0 2px;
        }
    }
}
.exportIng{
    .ivu-modal-body{
        padding-bottom: 35px;
    }
    .ivu-modal-footer{
        display: none;
    }
}
</style>
<template>
    <div class="custom-communication-record">
        <v-search-collapse @search="searchList" @reset="resetSearch" @changeDivHeight="changeDivHeight">
            <DatePicker
                ref="DatePicker"
				:options="options3"
				split-panels
				@on-change="setOptTime"
                format="yyyy-MM-dd"
                v-model="optTime"
                type="daterange"
                placement="bottom-start"
                separator=" ~ "
                :placeholder="$t('modules_spoc_crm_web_src_views_customerchangelog_index_1148')"
                style="width:224px;"
            ></DatePicker>
            <Select
                v-model="params.followOfficeId"
                clearable
                :placeholder="$t('modules_spoc_crm_web_src_views_clientareaaround_clientareaaround_781')"
            >
                <Option
                    v-for="item in officeIdList"
                    :value="item.id"
                    :key="item.value"
                >{{item.code}}{{ item.name }}</Option>
            </Select>
            <Input v-model="params.cusName" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_leftbanner_819')"></Input>
            <Input v-model="params.phone" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_leftbanner_820')"></Input>
            <Select
                v-model="params.salerId"
                :placeholder="$t('modules_spoc_crm_web_src_modules_resourceentrymodal copy_536')"
                clearable 
                filterable
                remote
                :remote-method="remoteMethod4"
                :loading="loading2">
                <Option v-for="(item, index) in roleOptions4" :value="item.value" :key="index">{{item.name}}</Option>
            </Select>
            <Select
                v-model="params.traceType"
                :placeholder="$t('modules_spoc_crm_web_src_views_customercommunicationrecord_index_1186')"
                clearable>
                <Option v-for="(item, index) in crm_trace_type" :value="item.value" :key="index">{{item.label}}</Option>
            </Select>
        </v-search-collapse>
        <ul class="fast-date">
            <li
                    :class="{active:item.value == selectedDate}"
                    v-for="(item,index) in dateLists"
                    @click="selectDate(item.value,index)"
                    :key="index">
                {{item.label}}
            </li>
        </ul>
        <big-table
            v-if="defaultShowCol"
            class="my-table"
            :tableName="tableName"
            :tableData="tableData"
            :tableColumnArray="tableColumnArray"
            :defaultShowCol="defaultShowCol"
            :canSelection="true"
            :dataTotal="dataTotal"
            :btnList="btnList"
            :pageNo="pageNo"
            :updateShowTitleMethod="updateShowTitle"
            :updateShowTitleKey="updateShowTitleKey"
            :tableHeightOut="tableHeightOut"
            @resetDefault="resetDefaultCol"
            @sortChange="sortChange"
            @onRowClick="onRowClick"
            @selectionChange="selectionChange"
            @pageChange="pageChange"
        >
            <div slot="tableNameSlot" class="table-name-slot">
                <a>{{startDate?startDate:'-'}}</a>{{$t('modules_spoc_crm_web_src_views_customercommunicationrecord_index_1187')}}<a>{{endDate?endDate:'-'}}</a>，<a>{{fllowNum.salerNum}}</a>{{$t('modules_spoc_crm_web_src_views_customercommunicationrecord_index_1188')}}<a>{{fllowNum.cusNum}}</a>{{$t('modules_spoc_crm_web_src_views_customercommunicationrecord_index_1189')}}<a>{{dataTotal}}</a>{{$t('importPage_result4after1')}}</div>
        </big-table>
        <export-modal ref="exportModal" :exportMethod="exportMethod"></export-modal>
        <Modal v-model="modal3" width="400" class="exportIng" :closable="false" :mask-closable="false">
            <div>
                <div class="ivu-modal-confirm">
                    <div class="ivu-modal-confirm-head">
                        <div class="ivu-modal-confirm-head-icon ivu-modal-confirm-head-icon-info">
                                <i class="ivu-icon ivu-icon-ios-information-circle"></i>
                        </div>
                        <div class="ivu-modal-confirm-head-title">{{$t('modules_spoc_crm_web_src_views_customercommunicationrecord_index_1191')}}</div>
                    </div>
                    <div class="ivu-modal-confirm-body">
                        <div>{{$t('modules_spoc_crm_web_src_views_customercommunicationrecord_index_1192')}}</div>
                    </div>
                </div>
            </div>
        </Modal>
    </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import bigTable from "@public/modules/bigTable.vue";
import exportModal from "@public/modules/exportModal.vue";
import vSearchCollapse from "@public/modules/vSearchCollapse";
import valid, {
    errors,
    crmActivity,
    sysUser,
    crmTrace,
    sysDict,
    sysCommonSql,
    crmCustomer
} from "../../libs/request";
import { waitUntil, DatePickerOpt, defaultDatePickerValue } from "@public/libs/util";
import util from "@public/libs/js/util";
// import memberRegistration from "./components/memberRegistration";
export default {
    name: 'crm.customerCommunicationRecord',
    data() {
        return {
            updateShowTitleKey: 'crm.customerCommunicationRecord',
            updateShowTitle:crmCustomer.updateShowTitle,
            crm_trace_type:[],
            loading2: false,
            roleOptions4: [],
            dateLists:[
                {
                    label:this.$t('modules_spoc_crm_web_src_views_customerchangelog_index_1159'),
                    value:'today'
                },
                {
                    label:this.$t('messagemanagement_components_histroylists_315'),
                    value:'yestoday'
                },
                {
                    label:this.$t('modules_spoc_crm_web_src_views_customerchangelog_index_1161'),
                    value:'week'
                },
                {
                    label:this.$t('modules_spoc_crm_web_src_views_customerchangelog_index_1162'),
                    value:'month'
                },
            ],
            startDate:'',//用于页面显示
            endDate:'',//用于页面显示
            startTime:'',
            endTime:'',
            selectedDate:'',
            isActioning: false, //多次提交拦截
            options3: null,
            tableHeightOut: 72, //324,
            exportMethod: crmActivity.exportSelectedFile, //导出用到的方法对象
            selection: [],
            btnList: [
                {
                    style: {},
                    type: '',
                    btnClick: this.isImport,
                    text: this.$t('modules_spoc_crm_web_src_views_customercommunicationrecord_index_1197')
                },
                [
                    {
                        style: {},
                        type: '',
                        btnClick: this.isExport,
                        text: this.$t('modules_spoc_crm_web_src_views_customercommunicationrecord_index_1198'),
                        value: '2',
                        parentName: this.$t('modules_spoc_crm_web_src_views_customercommunicationrecord_index_1199')
                    },
                    {
                        style: {},
                        type: '',
                        btnClick: this.isExport,
                        text: this.$t('modules_spoc_crm_web_src_views_customercommunicationrecord_index_1200'),
                        value: '1',
                        parentName: this.$t('modules_spoc_crm_web_src_views_customercommunicationrecord_index_1199')
                    }
                ]
            ],
            officeIdList: [],
            optTime: [],
            params: {
                cusName: "",
                phone: "",
                followOfficeId: "",
                salerId: "",
                traceType: "",
                orderByStatus: '',
                orderByType: ''
            },
            pageNo: 1,
            pageSize: this.$store.state.app.pageSizeGlobal,
            /*搜索相关结束*/
            tableName: "",
            defaultShowCol: null,
            fllowNum:{},
            dataTotal: 0,
            sortObj: {},
            tableColumnArray: [
                {
                    title: this.$t('classlist_compontents_detailinfo_45'),
                    key: "doAction",
                    width: 90,
                    render: (h, params) => {
                        return h("div", [
                            this.myButtonPrem.indexOf("crmDetail") >=0 ? h(
                                "a",
                                {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    },
                                    style: {
                                        marginRight: "8px"
                                    },
                                    on: {
                                        click: (e) => {
                                            e.stopPropagation()
                                            this.$router.push({
                                                name:'crm.customer360',
                                                query:{
                                                    id:params.row.cusId,
                                                    // followDate: params.row.followDate,
                                                    flowId: params.row.id
                                                }
                                            })
                                        }
                                    }
                                },
                                "详情"
                            ) : '',
                        ]);
                    }
                }
            ],
            tableData: [],
            modal3: false,
        };
    },
    computed: {
        ...mapState(["app", "buttonPerm","calendarConfig"]),
        myButtonPrem() {
            return this.buttonPerm["crm.customerCommunicationRecord"] || [];
        }
    },
    components: {
        bigTable,
        exportModal,
        vSearchCollapse,
    },
    mounted() {
        this.getCrm_trace_type()
        this.getInitData();
        this.getShowTitle();
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        getShowTitle() {
            let params = {
                pageIdentifier: 'crm.customerCommunicationRecord',
                voName: 'com.windliven.spoc.modules.crm.vo.CrmTraceFollowRecordVO'
            }
            crmCustomer.getShowTitle(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.defaultShowCol = res.data.data;
                }
            })
            .catch(errors.call(this));
        },
        sortChange(sortObj){
            // console.log(sortObj,"sortObj~~~~~~~~~~")
            if(sortObj.order == 'asc'){
                this.params.orderByStatus = '1'
                this.params.orderByType = sortObj.key
            } else if(sortObj.order == 'desc') {
                this.params.orderByStatus = '2'
                this.params.orderByType = sortObj.key
            } else {
                this.params.orderByStatus = ''
                this.params.orderByType = ''
            } 
            this.pageNo = 1
            this.getListData()
        },
        getCrm_trace_type(){
            let params1 = {
                types: "crm_trace_type",
            }
            sysDict.batchListData(params1).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.crm_trace_type = res.data.data.crm_trace_type;
                }
            }).catch(errors.call(this));
        },
        // 获取跟进人下拉
        remoteMethod4 (query) {
            if (query !== '') {
                this.loading2 = true;
                    let params = {
                        mainTable: "crm_customer_status",
                        mainField: "saler",
                        joinField: "id",
                        joinTable: "sys_user",
                        secondField: "name",
                        joinTableSearchParam: query
                    };
                    sysCommonSql
                    .queryPageInputInitData(params)
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            this.loading2 = false;
                            this.roleOptions4 = res.data.data;
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {
                        // this.loadingoptUserId = false;
                    });
            } else {
                this.roleOptions4 = [];
            }
        },
        onRowClick(row, index){
            if(this.myButtonPrem.indexOf("crmDetail") >=0){
                this.$router.push({
                    name:'crm.customer360',
                    query:{
                        id: row.cusId
                    }
                })
            }
        },
        isImport() {
            this.$router.push({
                name: 'crm.customerCommunicationRecordImport'
            });
        },
        resetDefaultCol(){
            this.updateLoadingStatus({ isLoading: true });
            crmCustomer.clearShowField({
                pageIdentifier: "crm.customerCommunicationRecord",
            })
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.getShowTitle(true);
                } else {
                    this.updateLoadingStatus({ isLoading: false });
                }
            })
            .catch(errors.call(this))
            .finally(() => {

            });
        },
        selectDate(value) {
            this.selectedDate = value
            if(value == 'today'){
                let today = new Date().format('yyyy-MM-dd')
                this.optTime=[today,today]
            }else if(value == 'yestoday'){
                let yestoday = new Date(new Date(new Date().format('yyyy-MM-dd')).getTime() - 24 * 60 * 60 * 1000).format('yyyy-MM-dd')
                this.optTime=[yestoday,yestoday]
            }else if(value == 'week'){
                let now = new Date();
                let nowTime = now.getTime();
                let day = now.getDay();
                let oneDayTime = 24*60*60*1000;
                let MondayTime = nowTime - (day-1) * oneDayTime;
                let SundayTime = nowTime + (7-day) * oneDayTime;
                let monday = new Date(MondayTime).format('yyyy-MM-dd');
                let sunday = new Date(SundayTime).format('yyyy-MM-dd');
                this.optTime=[monday,sunday]
            }else if(value == 'month'){
                let firstDate = new Date();
                firstDate.setDate(1); //第一天
                let f = new Date(firstDate).format('yyyy-MM-dd')
                let endDate = new Date(firstDate);
                endDate.setMonth(firstDate.getMonth()+1);
                endDate.setDate(0);
                endDate = new Date(endDate).format('yyyy-MM-dd')
                this.optTime=[f,endDate]
            }
            let ff = this.optTime[0] + ' 00:00:00'
            let ee = this.optTime[1] + ' 23:59:59'
            console.log(this.optTime)
            this.startDate = this.optTime[0]
            this.endDate = this.optTime[1]
            this.startTime = new Date(ff).getTime()
            this.endTime = new Date(ee).getTime()

            this.getListData()
            this.getCount()
        },
        setOptTime(val){
            console.log(val)
            this.selectedDate = ''
            let ff = val[0] + ' 00:00:00'
            let ee = val[1] + ' 23:59:59'
            this.startDate = val[0]
            this.endDate = val[1]
            this.startTime = new Date(ff).getTime()
            this.endTime = new Date(ee).getTime()
            // console.log(this.startTime,this.endTime,this.startDate,this.endDate)
        },
        isExport(val) {
            let param = {
                // pageNo: this.pageNo,
                // pageSize: this.dataTotal,
                startTime: this.startTime,
                endTime: this.endTime,
                cusName: this.params.cusName,
                phone: this.params.phone,
                stuName: this.params.stuName,
                followOfficeId: this.params.followOfficeId,
                content: this.params.content,
                createById: this.params.createById,
                type:'followRecord',
                salerId: this.params.salerId,
                traceType: this.params.traceType,
                orderByStatus: this.params.orderByStatus,
                orderByType: this.params.orderByType
            }
            if (val == "2") {
                if (val == "2" && !this.selection.length) {
                    this.$Message.error(this.$t('scoretemplate_scoretemplate_572'));
                    return;
                }
                param = {
                    type: "followRecord",
                    ids: this.selection.map(item => {
                        return item.id;
                    })
                };
            }
            this.modal3 = true
            crmTrace.exportData(param)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    util.blobDownload(res)
                }
            })
            .catch(errors.call(this))
            .finally(() => {
                setTimeout(()=>{
                    this.modal3 = false
                },1000)
            });
        },

        changeDivHeight(height) {
            this.tableHeightOut = height;
        },


        //可选方法，如果是多选的话必须有
        selectionChange(selection) {
            this.selection = selection;
        },
        getInitData() {
            let promise = new Promise((resolve, reject) => {
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
                               this.$set(this.params, "followOfficeId", this.app.currOfficeId == "all" ? "" : this.app.currOfficeId);
                            }
                            return (this.app.currOfficeId && this.calendarConfig.maxMonthInterval && JSON.stringify(this.buttonPerm)!= '{}' && this.buttonPerm) || false;
                        },
                        () => {
                            this.optTime = defaultDatePickerValue()
                            console.log(this.optTime)
                            this.setOptTime([new Date(this.optTime[0]).format('yyyy-MM-dd'),new Date(this.optTime[1]).format('yyyy-MM-dd')])//设置初始时间
                            this.getListData();
                            this.getCount()
                            this.btnList = []
                            if(this.myButtonPrem.indexOf("import") >=0){
                                this.btnList.push({
                                    style: {},
                                    type: '',
                                    btnClick: this.isImport,
                                    text: this.$t('views_coursepack_bigtableexample_343') //'导入'
                                    
                                })
                            }
                            if(this.myButtonPrem.indexOf("export") >=0){
                                this.btnList.push({
                                    style: {},
                                    type: '',
                                    btnClick: this.isExport,
                                    text: this.$t('integralflow_4'), //'导出全部',
                                    value:'1',
                                })
                            }
                        }
                    );
                }
            });
        },
        getListData() {
            this.updateLoadingStatus({ isLoading: true });
            let param = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                startTime: this.startTime,
                endTime: this.endTime,
                cusName: this.params.cusName,
                phone: this.params.phone,
                stuName: this.params.stuName,
                followOfficeId: this.params.followOfficeId,
                grade: this.params.grade,
                type:'followRecord',
                salerId: this.params.salerId,
                traceType: this.params.traceType,
                orderByStatus: this.params.orderByStatus,
                orderByType: this.params.orderByType
            };
            // this.searchObj = param; //这里需要给searchObj 赋值，导出数据的时候需要用到
            crmTrace
                .followRecordlistPage(param)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let result = res.data.data;
                        this.tableData = result.content;
                        this.dataTotal = result.totalElements;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        getCount() {
            this.updateLoadingStatus({ isLoading: true });
            let param = {
                // pageNo: this.pageNo,
                // pageSize: this.pageSize,
                startTime: this.startTime,
                endTime: this.endTime,
                cusName: this.params.cusName,
                phone: this.params.phone,
                stuName: this.params.stuName,
                followOfficeId: this.params.followOfficeId,
                grade: this.params.grade,
                type:'followRecord',
                salerId: this.params.salerId,
                traceType: this.params.traceType,
                orderByStatus: this.params.orderByStatus,
                orderByType: this.params.orderByType
            };
            // this.searchObj = param; //这里需要给searchObj 赋值，导出数据的时候需要用到
            crmTrace
            .count(param)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.fllowNum = res.data.data;
                }
            })
            .catch(errors.call(this))
            .finally(() => {
                this.updateLoadingStatus({ isLoading: false });
            });
        },
        //获取数据，根据情况修改接口、传参
        searchList() {
            this.pageNo = 1;
            this.getListData();
            this.getCount()
        },
        //分页方法 如果有分页则为必须方法，修改getCourseList为自己的获取数据方法 这里注意。不再有每页个数改变的方法了
        pageChange(pageNo, pageSize) {
            if (!pageNo) {
                //防止无用重复请求
                return;
            }
            this.pageNo = pageNo;
            this.pageSize = pageSize;
            this.getListData();
            this.getCount()
        },

        resetSearch() {
            // console.log(this.optTime)
            this.optTime = defaultDatePickerValue();
            this.setOptTime([new Date(this.optTime[0]).format('yyyy-MM-dd'),new Date(this.optTime[1]).format('yyyy-MM-dd')])//设置初始时间

            for (let item in this.params) {
                this.params[item] = "";
            }
            this.pageNo = 1;
            this.$set(this.params, "followOfficeId", this.app.currOfficeId == "all" ? "" : this.app.currOfficeId);
            this.getListData();
            this.getCount()
        }
    },
    watch: {
        "app.currOfficeId": function(val, oldVal) {
            if (oldVal && this.$route.name == "crm.customerCommunicationRecord") {
               this.$set(this.params, "followOfficeId", val == "all" ? "" : val);
               this.getListData();
                this.getCount()
            }
        }
    }
};
</script>