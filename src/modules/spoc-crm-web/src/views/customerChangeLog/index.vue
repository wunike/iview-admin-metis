<style lang="less">
    .custom-change-log {
        .my-table {
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
        .table-name-slot{
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items:flex-end;
            ul{
                margin-left: 50px;
                margin-bottom:-2px;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items:flex-end;
                li{
                    margin-right: 40px;
                    cursor: pointer;
                    font-size: 12px;
                    font-weight: normal;
                    &:hover{
                        color:#44bcb7;
                    }
                    &.active{
                        color:#44bcb7;
                        /*border-bottom: 1px solid #44bcb7;*/
                    }
                }
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
    <div class="custom-change-log">
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
                >{{ item.code}}{{item.name }}</Option>
            </Select>
            <Select
                    v-model="params.traceType"
                    clearable
                    :placeholder="$t('modules_spoc_crm_web_src_views_customerchangelog_index_1150')"
            >
                <Option
                        v-for="item in traceTypeList"
                        :value="item.value"
                        :key="item.value"
                >{{ item.label }}</Option>
            </Select>

            <Input v-model="params.cusName" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_leftbanner_819')"></Input>
            <Input v-model="params.phone" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_leftbanner_820')"></Input>
          <!--   <Input v-model="params.stuName" :placeholder="$t('modules_spoc_crm_web_src_views_customerchangelog_index_1153')"></Input>
            <Select v-model="params.grade" :placeholder="$t('modules_spoc_crm_web_src_views_customerchangelog_index_1154')" clearable>
                <Option
                        :value="item.value"
                        v-for="(item, index) in gradeList"
                        :key="index"
                >{{item.label}}</Option>
            </Select> -->
            <Select
                    filterable
                    remote
                    @on-clear="clearStu"
                    :remote-method="stuRemoteEn"
                    v-model="params.createById"
                    clearable
                    :placeholder="$t('integralflow_10')"
                    style="width: 140px;margin-right:12px;"
            >
                <Option v-for="item in createByIdList" :value="item.value" :key="item.value">{{ item.name }}</Option>
            </Select>
            <Input v-model="params.content" :placeholder="$t('teachpush_teachpush_649')"></Input>
        </v-search-collapse>
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
                @selectionChange="selectionChange"
                @pageChange="pageChange"
        >

        </big-table>
        <export-modal ref="exportModal" :exportMethod="exportMethod"></export-modal>
        <Modal v-model="modal3" width="400" class="exportIng" :closable="false" :mask-closable="false">
            <div>
                <div class="ivu-modal-confirm">
                    <div class="ivu-modal-confirm-head">
                        <div class="ivu-modal-confirm-head-icon ivu-modal-confirm-head-icon-info">
                                <i class="ivu-icon ivu-icon-ios-information-circle"></i>
                        </div>
                        <div class="ivu-modal-confirm-head-title">{{$t('modules_spoc_crm_web_src_views_customerchangelog_index_1157')}}</div>
                    </div>
                    <div class="ivu-modal-confirm-body">
                        <div>{{$t('modules_spoc_crm_web_src_views_customerchangelog_index_1158')}}</div>
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
    import util from "@public/libs/js/util";
    import { waitUntil, DatePickerOpt, defaultDatePickerValue } from "@public/libs/util";
//    import util from "@public/libs/js/util";
    // import memberRegistration from "./components/memberRegistration";
    export default {
        name: 'crm.customerChangeLog',
        data() {
            return {
                modal3: false,
                updateShowTitleKey: 'crm.customerChangeLog',
                updateShowTitle:crmCustomer.updateShowTitle,
                dateLists:[
                    {
                        label:this.$t('modules_spoc_crm_web_src_views_customerchangelog_index_1159'),
                        value:'today'
                    },
                    {
                        label:this.$t('modules_spoc_crm_web_src_views_customerchangelog_index_1160'),
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
                startTime:'',
                endTime:'',
                selectedDate:'',
                isActioning: false, //多次提交拦截
                options3: null,
                tableHeightOut: 72, //324,
                exportMethod: crmActivity.exportSelectedFile, //导出用到的方法对象
                selection: [],
                btnList: [
                    [
                        {
                            style: {},
                            type: '',
                            btnClick: this.isExport,
                            text: this.$t('integralflow_6'),
                            value: '2',
                            parentName: this.$t('integralflow_5')
                        },
                        {
                            style: {},
                            type: '',
                            btnClick: this.isExport,
                            text: this.$t('integralflow_4'),
                            value: '1',
                            parentName: this.$t('integralflow_5')
                        }
                    ]
                ],
                traceTypeList:[
                    {
                        value:'task update',
                        label:this.$t('modules_spoc_crm_web_src_views_customerchangelog_index_1166')
                    },
                    {
                        value:'updatetag',
                        label:this.$t('modules_spoc_crm_web_src_views_customerchangelog_index_1167')
                    },
                    {
                        value:'updatestatus',
                        label:this.$t('modules_spoc_crm_web_src_views_customerchangelog_index_1168')
                    },
                    {
                        value:'updatecus',
                        label:this.$t('modules_spoc_crm_web_src_views_customerchangelog_index_1169')
                    },
                    {
                        value:'review',
                        label:this.$t('modules_spoc_crm_web_src_views_customerchangelog_index_1170')
                    },
                    {
                        value:'arcade apply',
                        label:this.$t('modules_spoc_crm_web_src_views_customerchangelog_index_1171')
                    },
                    {
                        value:'activity apply',
                        label:this.$t('modules_spoc_crm_web_src_views_customerchangelog_index_1172')
                    },
                    {
                        value:'update create',
                        label:this.$t('modules_spoc_crm_web_src_views_customerchangelog_index_1173')
                    },
                    {
                        value:'contract create',
                        label:this.$t('modules_spoc_crm_web_src_views_customerchangelog_index_1174')
                    },
                    {
                        value:'invalid',
                        label:this.$t('modules_spoc_crm_web_src_views_customerchangelog_index_1175')
                    },
                    {
                        value:'activate',
                        label:this.$t('modules_spoc_crm_web_src_views_customerchangelog_index_1176')
                    },
                    {
                        value:'alloc',
                        label:this.$t('modules_spoc_crm_web_src_views_customerchangelog_index_1177')
                    },
                    {
                        value:'call',
                        label:this.$t('modules_spoc_crm_web_src_views_customerchangelog_index_1178')
                    },
                ],
                officeIdList: [],
                optTime: [],
                gradeList: [],
                createByIdList:[],
                params: {
                    traceType:'',
                    cusName: "",
                    stuName: "",
                    followOfficeId: "",
                    grade: "",
                    content:'',
                    createById:'',
                    phone: '',
                },
                pageNo: 1,
                pageSize: this.$store.state.app.pageSizeGlobal,
                /*搜索相关结束*/
                tableName: this.$t('modules_spoc_crm_web_src_views_customerchangelog_index_1179'),
                defaultShowCol: null,
                dataTotal: 0,
                sortObj: {},
                tableColumnArray: [],
                tableData: [],
            };
        },
        computed: {
            ...mapState(["app", "buttonPerm","calendarConfig"]),
            myButtonPrem() {
                return this.buttonPerm["crm.activityEnrollment"] || [];
            }
        },
        components: {
            bigTable,
            exportModal,
            vSearchCollapse,
        },
        mounted() {
            // this.jwCourseType()
            this.getInitData();
            this.getShowTitle();
        },
        methods: {
            ...mapMutations(["updateLoadingStatus"]),
            resetDefaultCol(){
                this.updateLoadingStatus({ isLoading: true });
                crmCustomer.clearShowField({
                    pageIdentifier: "crm.customerChangeLog",
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
            getShowTitle(closeLoad) {
                let params = {
                    pageIdentifier: 'crm.customerChangeLog',
                    voName: 'com.windliven.spoc.modules.crm.vo.CrmTraceUpdateLogVO'
                }
                crmCustomer.getShowTitle(params)
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
            stuRemoteEn(query) {
                if (query !== '') {
                    let obj = {
                        mainTable: 'sys_user',
                        mainField: 'id',
                        joinField: 'id',
                        joinTable: 'sys_user',
                        secondField: 'name',
                        joinTableSearchParam: query
                    };
                    sysCommonSql
                    .queryPageInputInitData(obj)
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            this.createByIdList = res.data.data;
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {
                        // this.updateLoadingStatus({ isLoading: false });
                    });
                }
            },
            selectDate(value) {
                this.selectedDate = value
                if(value == 'today'){
                    let today = new Date().format('yyyy-MM-dd')
                    this.optTime=[today,today]
                }else if(value == 'yestoday' ){
                    let yestoday = new Date(new Date(new Date().format('yyyy-MM-dd')).getTime() - 24 * 60 * 60 * 1000).format('yyyy-MM-dd')
                    this.optTime=[yestoday,yestoday]
                }else if(value == 'week' ){
                    let now = new Date();
                    let nowTime = now.getTime() ;
                    let day = now.getDay();
                    let oneDayTime = 24*60*60*1000 ;
                    let MondayTime = nowTime - (day-1)*oneDayTime ;
                    let SundayTime =  nowTime + (7-day)*oneDayTime ;
                    let monday = new Date(MondayTime).format('yyyy-MM-dd');
                    let sunday = new Date(SundayTime).format('yyyy-MM-dd');
                    this.optTime=[monday,sunday]
                }else if(value == 'month' ){
                    let firstDate = new Date();
                    firstDate.setDate(1); //第一天
                    let  f = new Date(firstDate).format('yyyy-MM-dd')
                    let endDate = new Date(firstDate);
                    endDate.setMonth(firstDate.getMonth()+1);
                    endDate.setDate(0);
                    endDate = new Date(endDate).format('yyyy-MM-dd')
                    this.optTime=[f,endDate]
                }
                let ff = this.optTime[0] + ' 00:00:00'
                let ee = this.optTime[1] + ' 23:59:59'
                this.startTime = new Date(ff).getTime()
                this.endTime = new Date(ee).getTime()
                this.getListData()
            },
            setOptTime(val){
                this.selectedDate = ''
                let ff = val[0] + ' 00:00:00'
                let ee = val[1] + ' 23:59:59'
                this.startTime = new Date(ff).getTime()
                this.endTime = new Date(ee).getTime()
                // console.log(this.startTime,this.endTime)

            },
            jwCourseType() {
                let type = "jw_course_type";
                sysDict
                .findChildDictByParentDict({
                    type
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.gradeList = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
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
                    grade: this.params.grade,
                    type:'updateLog'
                }
                param.startTime=this.startMonth
                param.endTime=this.endMonth
                if (val == "2") {
                    if (!this.selection.length) {
                        this.$Message.error(this.$t('scoretemplate_scoretemplate_572'));
                        return;
                    }
                    param = {
                        type: "updateLog",
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
                                return (this.app.currOfficeId && this.calendarConfig.maxMonthInterval && JSON.stringify(this.buttonPerm)!= '{}') || false;
                            },
                            () => {
                                this.optTime = defaultDatePickerValue()
                                this.setOptTime([new Date(this.optTime[0]).format('yyyy-MM-dd'),new Date(this.optTime[1]).format('yyyy-MM-dd')])//设置初始时间
                                
                                if(this.myButtonPrem.indexOf("export") >=0){
                                    this.btnList = [
                                        {
                                            style: {},
                                            type: '',
                                            btnClick: this.isExport,
                                            text: '导出全部',
                                            value:'1',
                                        },
                                    ]
                                }
                                this.getListData();
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
                    traceType: this.params.traceType,
                    cusName: this.params.cusName,
                    phone: this.params.phone,
                    stuName: this.params.stuName,
                    followOfficeId: this.params.followOfficeId,
                    grade: this.params.grade,
                    content: this.params.content,
                    createById: this.params.createById,
                    type:'updateLog'
                };
                // this.searchObj = param; //这里需要给searchObj 赋值，导出数据的时候需要用到
                crmTrace
                .updateLoglistPage(param)
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
            //获取数据，根据情况修改接口、传参
            searchList() {
                this.pageNo = 1;
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
                this.getListData();
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
            }
        },
        watch: {
            "app.currOfficeId": function(val, oldVal) {
                if (oldVal && this.$route.name == "crm.customerChangeLog") {
                    this.$set(this.params, "followOfficeId", val == "all" ? "" : val);
                    this.getListData();
                }
            }
        }
    };
</script>
