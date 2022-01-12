<style lang="less">
.onSiteManagementClass {
    .mytable {
        width: 100%;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        padding: 0 16px;
        margin-top: 10px;
        .subTypeNameStyle {
            margin-left: 11px;
            .ivu-table-cell {
                margin-left: 11px;
            }
        }
    }
    .table-name-slot-style {
        margin-left: -16px;
        font-family:PingFangSC-Regular,PingFang SC;
        margin-bottom:-7px;
        font-size: 12px;
        font-weight: 600;
        > a {
            font-weight: normal;
            font-size: 16px;
        }
    }
}
</style>
<template>
    <div class="onSiteManagementClass">
        <v-search-collapse
            @search="search"
            @reset="resetSearch"
            :hasTag="hasTag"
            ref="searchCollapseRef"
            @userLabelTrueChoose="userLabelTrueChoose"
            @changeDivHeight="changeDivHeight"
            @userLabelTrueChooseClear="userLabelTrueChooseClear">
            <DatePicker
                ref="DatePicker"
                :options="options4"
                split-panels
                @on-open-change="setOptTime4"
                v-model="optTime4"
                type="daterange"
                @on-change="signTimeChange4"
                placement="bottom-start"
                :transfer="true"
                separator=" ~ "
                :placeholder="$t('modules_spoc_crm_web_src_views_onsitemanagement_onsitemanagement_1431')"
                style="width:224px;">
            </DatePicker>
                <!-- :options="options3"
                @on-open-change="setOptTime" -->
            <DatePicker
                ref="DatePicker"
                split-panels
                v-model="optTime"
                type="daterange"
                @on-change="signTimeChange"
                placement="bottom-start"
                :transfer="true"
                separator=" ~ "
                :placeholder="$t('modules_spoc_crm_web_src_views_onsitemanagement_onsitemanagement_1432')"
                style="width:224px;">
            </DatePicker>
            <DatePicker
                split-panels
                v-model="optTime2"
                type="daterange"
                @on-change="signTimeChange2"
                placement="bottom-start"
                :transfer="true"
                separator=" ~ "
                :placeholder="$t('modules_spoc_crm_web_src_views_customermanagement_index_1259')"
                style="width:224px;">
            </DatePicker>
            <Select
                style="width:224px;"
                v-model="findObj.officeId"
                clearable
                :placeholder="$t('modules_spoc_crm_web_src_modules_resourceentrymodal copy_537')">
                <Option
                    v-for="item in officeIdList"
                    :value="item.id"
                    :key="item.id">
                    {{ item.code }}{{ item.name }}
                </Option>
            </Select>
            <Input v-model="findObj.name" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_leftbanner_819')" style="width:140px;"></Input>
            <Input v-model="findObj.phone" :placeholder="$t('modules_spoc_crm_web_src_views_onsitemanagement_onsitemanagement_1436')" style="width:140px;"></Input>
            <Select
                    v-model="findObj.createBy"
                    :placeholder="$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_688')"
                    clearable
                    filterable="true"
                    @on-query-change="changecreateBy"
                    remote
                    :loading="createByLoading"
                    :remote-method="remoteRegisterPerson">
                    <Option
                        v-for="item in createByPersonList"
                        :value="item.value"
                        :label="item.name"
                        :key="item.value">
                        {{ item.name }}
                    </Option>
            </Select>
            <Select
                    v-model="findObj.followerId"
                    :placeholder="$t('modules_spoc_crm_web_src_modules_resourceentrymodal copy_536')"
                    clearable
                    filterable="true"
                    @on-query-change="changeFllower"
                    remote
                    :loading="fllowerLoading"
                    :remote-method="remoteFollowUp">
                    <Option
                        v-for="item in followUpList"
                        :value="item.value"
                        :label="item.name"
                        :key="item.value">
                        {{ item.name }}
                    </Option>
            </Select>
            <Select
                    :placeholder="$t('modules_spoc_crm_web_src_views_customermanagement_index_1267')"
                    clearable
                    v-model="findObj.querySources"
                    :transfer="true"
                    multiple
                    filterable
                    >
                <Option
                        v-for="item in crm_customer_source"
                        :value="item.value"
                        :key="item.value"
                >{{ item.name }}</Option>
            </Select>
           <!--  <Select
                    :placeholder="$t('modules_spoc_crm_web_src_views_onsitemanagement_onsitemanagement_1440')"
                    clearable
                    :transfer="true"
                    v-model="findObj.secondSource"
                    @on-change="secondSourceChange">
                <Option
                        v-for="item in crm_customer_secondSource"
                        :value="item.value"
                        :key="item.value"
                >{{ item.label }}</Option>
            </Select>
            <Select :placeholder="$t('modules_spoc_crm_web_src_views_onsitemanagement_onsitemanagement_1441')" :transfer="true"  clearable v-model="findObj.thirdSource">
                <Option
                        v-for="item in crm_customer_thirdSource"
                        :value="item.value"
                        :key="item.value"
                >{{ item.label }}</Option>
            </Select> -->
            <Select v-model="findObj.completeNameList" multiple  class="w400" :placeholder="$t('modules_spoc_crm_web_src_views_onsitemanagement_onsitemanagement_1442')">
                <Option
                    v-for="(item, index) in completeResultList"
                    :key="index"
                    :value="item.resultValue">{{item.resultLabel}}</Option>
            </Select>
            <Select
                    :placeholder="$t('modules_spoc_crm_web_src_views_onsitemanagement_onsitemanagement_1443')"
                    clearable
                    v-model="findObj.taskStatus"
                    :transfer="true"
                    >
                <Option value="1">{{$t('modules_spoc_crm_web_src_views_onsitemanagement_onsitemanagement_1444')}}</Option>
                <Option value="0">{{$t('modules_spoc_crm_web_src_views_onsitemanagement_onsitemanagement_1445')}}</Option>
            </Select>
        </v-search-collapse>
        <big-table
            v-if="defaultShowCol"
            class="mytable"
            :tableData="tableData"
            :tableHeightOut="tableHeightOut"
            :tableColumnArray="tableColumnArray"
            :defaultShowCol="defaultShowCol"
            :canSelection="true"
            :dataTotal="dataTotal"
            :btnList="btnList"
            :pageNo="pageNo"
            :canChangeHeight="true"
            :isShowSelectTableColumn="true"
            :updateShowTitleMethod="updateShowTitle"
            :updateShowTitleKey="updateShowTitleKey"
            @onRowClick="onRowClick"
            @resetDefault="resetDefaultCol"
            @selectionChange="selectionChange"
            @sortChange="sortChangeFn"
            @pageChange="pageChange">
            <div slot="tableNameSlot" class="table-name-slot-style">
                {{$t('modules_spoc_crm_web_src_views_onsitemanagement_onsitemanagement_1446')}}<span>{{statisticsData.allNum || '0' }}</span>
                {{$t('modules_spoc_crm_web_src_views_onsitemanagement_onsitemanagement_1447')}}<span>{{statisticsData.confirmOpp || '0' }}</span>
                {{$t('modules_spoc_crm_web_src_views_onsitemanagement_onsitemanagement_1448')}}<span>{{statisticsData.parentOpp || '0' }}</span>
                {{$t('modules_spoc_crm_web_src_views_onsitemanagement_onsitemanagement_1449')}}<span>{{statisticsData.studentOpp || '0' }}</span>
                {{$t('modules_spoc_crm_web_src_views_onsitemanagement_onsitemanagement_1450')}}<span>{{statisticsData.allOpp || '0' }}</span>
                {{$t('modules_spoc_crm_web_src_views_onsitemanagement_onsitemanagement_1451')}}<span>{{statisticsData.notConfirmOpp || '0' }}</span>
                {{$t('modules_spoc_crm_web_src_views_marketcharts_marketchartsoptionsfor1_1349')}}
            </div>
        </big-table>
        <export-modal ref="exportModal" :exportMethod="exportMethod"></export-modal>
        <task-detail-modal @refresh="search" ref="taskDeatilModalRef"></task-detail-modal>
    </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import bigTable from "@public/modules/bigTable.vue";
import exportModal from "@public/modules/exportModal.vue";
import vSearchCollapse from "@public/modules/vSearchCollapse";
import valid, {
    errors,
    crmTask,
    sysUser,
    sysDict,
    common,
    sysCommonSql,
} from "../../libs/request";
import taskDetailModal from "../taskCenter/taskDetailModal";
import { waitUntil, DatePickerOpt, defaultDatePickerValue } from "@public/libs/util";
export default {
    name: 'crm.onSiteManagement',
    data() {
        return {
            options3: DatePickerOpt(this,'DatePicker',3),
            options4: DatePickerOpt(this,'DatePicker',3),
            tableHeightOut: 72, //324,
            hasTag: true,
            updateShowTitleKey: "CrmTask",
            updateShowTitle: crmTask.updateShowTitle,
            exportMethod: crmTask.export, //导出用到的方法对象
            selection: [],
            btnList: [
                [
                    {
                        style: {},
                        type: "",
                        btnClick: this.isExport,
                        text: this.$t('integralflow_4'),
                        value: "1",
                        parentName: this.$t('integralflow_5')
                    },
                    {
                        style: {},
                        type: "",
                        btnClick: this.isExport,
                        text: this.$t('integralflow_6'),
                        value: "2",
                        parentName: this.$t('integralflow_5')
                    }
                ]
            ],
            officeIdList: [],
            optTime: [],
            optTime2:[],
            optTime4: [],
            crm_customer_source: [],
            crm_customer_secondSource: [],
            crm_customer_thirdSource: [],
            createByPersonList: [],
            followUpList: [],
            fllowerLoading:false,
            createByLoading:false,
            findObj: {
                arrivalTimeStart: "", //开始签约时间
                arrivalTimeEnd: "", //end签约时间
                startTimeStart: "",
                startTimeEnd: "",
                createDateStart: "",
                createDateEnd: "",
                officeId:"",
                name:"",
                phone:"",
                createBy:"",
                followerId:"",
                querySources:[],
                taskStatus: '',
                // secondSource:"",
                // thirdSource:"",
                tags:[],
                orderByType:'',
                orderByStatus:'',// 排序类型，1:升序；2:降序
                completeNameList: [],
            },
            pageNo: 1,
            pageSize: this.$store.state.app.pageSizeGlobal,
            /*搜索相关结束*/
            defaultShowCol: null,
            dataTotal: 0,
            tableColumnArray: [
                {
                    key:'name',
                    render:(h,params) => {
                        return h("div",[
                            this.myButtonPrem.indexOf("cusDetail") >=0 ? h("a",{
                                on:{
                                    click:(e)=>{
                                        e.stopPropagation()
                                        this.$router.push({
                                            name:'crm.customer360',
                                            query:{
                                                id:params.row.customerId
                                            }
                                        })
                                    }
                                }
                            },params.row.name) : params.row.name
                        ])
                    }
                },
                {
                    key:'arrivalTime',
                    sortable: 'custom',
                },
                {
                    title: this.$t('classlist_compontents_detailinfo_45'),
                    key: "doAction",
                    width: 190,
                    render: (h, params) => {
                        return h("div", {
                                    on: {
                                        click: (e) => {
                                            e.stopPropagation()
                                        },
                                    }
                            }, [
                            // delte
                            this.myButtonPrem.indexOf("delte") >=0?h(
                                "a",
                                {
                                    style: {
                                        "margin-right": "8px"
                                    },
                                    on: {
                                        click: (e) => {
                                            e.stopPropagation()
                                            this.$Modal.confirm({
                                                title: this.$t('views_coursepack_bigtableexample_345'),
                                                content: this.$t('modules_spoc_crm_web_src_views_onsitemanagement_onsitemanagement_1457'),
                                                onOk: () => {
                                                    this.delete(params.row.taskId);
                                                }
                                            });
                                        }
                                    }
                                },
                                this.$t('classlist_compontents_detailinfo_46')
                            ):'',
                            this.myButtonPrem.indexOf("cusDetail") >=0?h(
                                "a",
                                {
                                    style: {
                                        "margin-right": "8px"
                                    },
                                    on: {
                                        click: (e) => {
                                            e.stopPropagation()
                                            this.$router.push({
                                                name:'crm.customer360',
                                                query:{
                                                    id:params.row.customerId
                                                }
                                            })
                                        }
                                    }
                                },
                                this.$t('principalmailbox_16')
                            ):'',
                            this.myButtonPrem.indexOf("taskFinish") >= 0? h(
                                "a",
                                {
                                    style: {
                                        "margin-right": "8px",
                                        // display:params.row.status == '0' && this.myButtonPrem.indexOf('finish') >=0?'inline-block' : 'none',
                                        // color:(params.row.taskStatus == '0')?'' : '#ccc',
                                        // cursor:(params.row.taskStatus == '0')?'pointer' : 'default',
                                        cursor: 'pointer',
                                    },
                                    on: {
                                        click: (e) => {
                                            e.stopPropagation()
                                            // if(params.row.taskStatus == '0'){
                                                console.log('ok')
                                                // this.$refs.taskDeatilModalRef.showModalComplete(params.row.taskId);
                                                this.$refs.taskDeatilModalRef.showModal(params.row.taskId);
                                            // }
                                        }
                                    }
                                },
                                params.row.taskStatus == '0' ? this.$t('modules_spoc_crm_web_src_views_onsitemanagement_onsitemanagement_1460') : this.$t('modules_spoc_crm_web_src_views_onsitemanagement_onsitemanagement_1461')
                            ):'',
                            // this.myButtonPrem.indexOf("taskDetails") >=0?h(
                            //     "a",
                            //     {
                            //         style: {
                            //             "margin-right": "8px"
                            //         },
                            //         on: {
                            //             click: () => {
                            //                 this.$refs.taskDeatilModalRef.showModal(params.row.taskId);
                            //             }
                            //         }
                            //     },
                            //     "任务详情"
                            // ):'',
                        ]);
                    }
                }
            ],
            tableData: [],
            statisticsData:{},
            searchObj:{},
            selectedIds:[],
            currentIds:[],
            completeResultList:[],
        };
    },
    computed: {
         ...mapState(["app", "buttonPerm","calendarConfig"]),
        myButtonPrem() {
             console.log(this.buttonPerm["crm.onSiteManagement"])
            return this.buttonPerm["crm.onSiteManagement"] || [];
        }
    },
    components: {
        bigTable,
        exportModal,
        vSearchCollapse,
        taskDetailModal,
    },
    mounted() {
        this.batchListDataFn();
        this.getShowTitle();
        this.getInitData();
        this.listPageComTaskTpl('follow task');
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        onRowClick(row, index){
            if(this.myButtonPrem.indexOf("cusDetail") >=0){
                this.$router.push({
                    name:'crm.customer360',
                    query:{
                        id:row.customerId
                    }
                })
            }
        },
        resetDefaultCol(){
            this.updateLoadingStatus({ isLoading: true });
            crmTask.clearShowField({
                pageIdentifier: "CrmTask",
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
        listPageComTaskTpl(taskType) {
			this.updateLoadingStatus({ isLoading: true });

			let param = {
				pageNo: 1,
				pageSize: 0,
				isEnable: "1",
				type: taskType//跟进任务"follow task"，  服务任务"service task"
			};

			common
				.listPageComTaskTpl(param)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						console.log(res.data.data);
						let _arr = res.data.data.list.filter(item=>{
                            // return item.name==this.$t('modules_spoc_crm_web_src_views_onsitemanagement_onsitemanagement_1462')
                            return item.name=='预约上门'
                        });
                        if(_arr && _arr.length){
                            this.completeResultList = _arr[0].completeResultList
                        }
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
        setOptTime(flag){
            if(flag){
                this.optTime = []
            }
        },
        setOptTime4(flag){
            if(flag){
                this.optTime4 = []
            }
        },
        changeDivHeight(height) {
            this.tableHeightOut = height;
        },
        delete(id){
            let params = {
               id
            };
            common
            .deleteById(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.$Message.success(this.$t('scoretemplate_scoretemplate_571'))
                    this.getStatistics()
                    this.getListData()
                }
            })
            .catch(errors.call(this))
        },
        sortChangeFn(val) {
            //asc 升序 desc 降序
            this.findObj.orderByStatus = val.order == 'asc'? '1':val.order == 'desc'?'2':''
            this.findObj.orderByType = val.key
            this.getListData()
        },
        userLabelTrueChoose(data) {
            this.findObj.tags = data;
            this.pageNo = 1;
            this.getListData()
        },
        userLabelTrueChooseClear(data) {
            this.findObj.tags = data;
            this.pageNo = 1;
            this.getListData()
        },
        changeFllower(val) {
            // console.log(val)
            // if(val == ''){
            //     this.findObj.followerId = ''
            //     this.followUpList = []
            // }
        },
        changecreateBy(val) {
            // if(val == ''){
            //     this.findObj.createBy = ''
            //     this.createByPersonList = []
            // }
        },
        //跟进人
        remoteFollowUp(query) {
            this.fllowerLoading = true;
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
                    this.followUpList = res.data.data;
                }
            })
            .catch(errors.call(this))
            .finally(()=>{
                this.fllowerLoading = false;
            })
        },
        //登记人
        remoteRegisterPerson(query) {
            this.createByLoading = true
            let params = {
                mainTable: "crm_customer",
                mainField: "create_by",
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
                    this.createByPersonList = res.data.data;
                }
            })
            .catch(errors.call(this))
            .finally(()=>{
                this.createByLoading = false;
            })
        },
        batchListDataFn() {
              sysDict.getDictStringTree({type:'crm_customer_source'}).then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.crm_customer_source = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        //可选方法，如果是多选的话必须有
        selectionChange(row) {
            let s = this.selectedIds;
            let c = this.currentIds;
            for (let i in c) {
                if (s.includes(c[i])) {
                    let num = this.selectedIds.indexOf(c[i]);
                    s.splice(num, 1);
                }
            }
            if (row.length) {
                row.forEach(item => {
                    s.push(item.taskId);
                });
            }
        },
        isExport(val) {
            //这里val的值。是根据设置下拉类型button设定的值来匹配判断
            if (val == "2" && !this.selectedIds.length) {
                this.$Message.error(this.$t('scoretemplate_scoretemplate_572'));
                return;
            }
            let searchObj = JSON.parse(JSON.stringify(this.searchObj));
            delete searchObj.pageNo
            delete searchObj.pageSize
            if (val == "1") {
            } else if (val == "2") {
                //如果是导出所选，需要在这里传递所选对象、或者对象ID，这里根据需要自行处理，并作为搜索参数的一部分传递到导出组件
                searchObj = {
                    idList: this.selectedIds
                }
            }
            this.exportMethod = crmTask.export; //导出用到的方法对象

            this.$refs.exportModal.noShowExport(this.exportMethod, searchObj);
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
                                    this.$set(this.findObj, "officeId", this.app.currOfficeId == "all" ? "" : this.app.currOfficeId);
                            }
                            return (this.app.currOfficeId && JSON.stringify(this.buttonPerm)!= '{}')|| false;
                        },
                        () => {
                            this.findObj.orderByType = 'startTime'//'arrivalTime'
                            this.findObj.orderByStatus = '2'
                            // this.optTime = defaultDatePickerValue()
                            this.optTime4 = defaultDatePickerValue()
				            // this.options3 = DatePickerOpt(this,'DatePicker',Number(this.calendarConfig.maxMonthInterval))
				            this.options4 = DatePickerOpt(this,'DatePicker',Number(this.calendarConfig.maxMonthInterval))
                            this.signTimeChange()
                            this.signTimeChange2()
                            this.signTimeChange4()
                            this.getStatistics()
                            this.getListData();
                             if(this.myButtonPrem.indexOf('export') < 0){ //导出
                                this.btnList = []
                            }
                        }
                    );
                }
            });
        },
        getStatistics() {
            // this.updateLoadingStatus({ isLoading: true });
            let param = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
            };
            param = Object.assign({}, param, this.findObj);
            // param.officeId = "3";
            this.searchObj = param;
            crmTask
            .statistics(param)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    let result = res.data.data;
                    this.statisticsData = result
                }
            })
            .catch(errors.call(this))
            .finally(() => {
                // this.updateLoadingStatus({ isLoading: false });
            });
        },
        getListData() {
            this.updateLoadingStatus({ isLoading: true });
            let param = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
            };
            param = Object.assign({}, param, this.findObj);
            // param.officeId = "3";
            this.searchObj = {...param};
            crmTask
                .listPage(param)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        // let result = res.data.data;
                        let data = res.data;
                        // this.tableData = result.list;
                        let d = data.data.list;
                        this.dataTotal = data.data.total;
                        this.currentIds = [];
                        for (let i in d) {
                            this.currentIds.push(d[i].taskId);
                            if (this.selectedIds.includes(d[i].taskId)) {
                                d[i]._checked = true;
                            }
                        }
                        this.tableData = d;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        signTimeChange(date) {
            this.findObj.arrivalTimeStart = this.optTime[0] ? this.optTime[0].format('yyyy-MM-dd 00:00') : ""
            this.findObj.arrivalTimeEnd = this.optTime[1] ? this.optTime[1].format('yyyy-MM-dd 23:59') : ""
        },
        signTimeChange2(date) {
            this.findObj.createDateStart = this.optTime2[0] ? this.optTime2[0].format('yyyy-MM-dd 00:00') : ""
            this.findObj.createDateEnd = this.optTime2[1] ? this.optTime2[1].format('yyyy-MM-dd 23:59') : ""
        },
        signTimeChange4(date) {
            this.findObj.startTimeStart = this.optTime4[0] ? this.optTime4[0].format('yyyy-MM-dd 00:00') : ""
            this.findObj.startTimeEnd = this.optTime4[1] ? this.optTime4[1].format('yyyy-MM-dd 23:59') : ""
        },
        //获取数据，根据情况修改接口、传参
        search() {
            this.pageNo = 1;
            this.findObj.orderByType = 'startTime'//'arrivalTime'
            this.findObj.orderByStatus = '2'
            this.getStatistics()
            this.getListData();
        },
        //分页方法 如果有分页则为必须方法，修改getCourseList为自己的获取数据方法 这里注意。不再有每页个数改变的方法了
        pageChange(pageNo, pageSize) {
            if (!pageNo) {
                //防止无用重复请求
                return;
            }
            this.pageNo = pageNo;
            this.pageSize = pageSize;
            this.getStatistics()
            this.getListData();
        },
        //必须方法，获取默认显示的可选列  接口根据需要自行更换，每个模块的接口是不一致的
        getShowTitle(closeLoad) {
            crmTask
                .getShowTitle({
                    pageIdentifier: "CrmTask",
                    voName: "com.windliven.spoc.modules.crm.vo.CrmTaskVO",
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.defaultShowCol = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
					if(closeLoad){
                        this.updateLoadingStatus({ isLoading: false });
                    }
				});
        },
        resetSearch() {
            for (let item in this.findObj) {
                if (typeof this.findObj[item] === "string") {
                    this.findObj[item] = "";
                }
                if (typeof this.findObj[item] === "object") {
                    this.findObj[item] = [];
                }
            }
            this.selectedIds = []//清空选中的id
            this.optTime = []//defaultDatePickerValue();
            this.optTime2 = []
            this.optTime4 = defaultDatePickerValue();
            this.signTimeChange(this.optTime)
            this.signTimeChange2(this.optTime2)
            this.signTimeChange4(this.optTime4)
            this.pageNo = 1;
            this.$set(this.findObj, "officeId", this.app.currOfficeId == "all" ? "" : this.app.currOfficeId);
            this.getStatistics()
            this.$refs.searchCollapseRef.resetTrueFn();
            // this.getListData();
        }
    },
    watch: {
        "app.currOfficeId": function(val, oldVal) {
            if (oldVal&& this.$route.name == "crm.onSiteManagement") {
                this.$set(this.findObj, "officeId", val == "all" ? "" : val);
                this.getStatistics()
                this.getListData();
            }
        }
    }
};
</script>
