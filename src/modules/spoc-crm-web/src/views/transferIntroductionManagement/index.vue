<style lang="less">
.transfer-intro-box{
    .ivu-tabs-bar{
        margin-bottom:0;
        border-radius: 4px 4px 0 0;
    }
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
    .search-title{
        padding:16px;
        background: #fff;
    }
    .v-search-collapse-container{
        padding-left:16px;
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
<div class="transfer-intro-box">
    <div class="search-title">
        <Tabs :value="tabName" :animated="false" @on-click="changeTabs">
            <TabPane label="登记记录" name="0" v-if="myButtonPrem.indexOf('cusList') > -1"></TabPane>
            <TabPane label="登记人" name="1" v-if="myButtonPrem.indexOf('userList') > -1"></TabPane>
        </Tabs>
        <v-search-collapse @search="SearchRecord" @reset="resetSearchRecord" v-if="tabName == '0'" key="tab0" @changeDivHeight="changeDivHeight">
            <DatePicker
                v-model="createTime"
                ref="DatePicker"
				:options="options3"
				split-panels
				@on-open-change="setOptTime"
                type="daterange"
                placement="bottom-start"
                separator=" ~ "
                :placeholder="$t('modules_spoc_crm_web_src_modules_resourceentrymodal copy_535')"
                style="width:224px;">
            </DatePicker>
            <DatePicker
                ref="DatePicker1"
				:options="options31"
				split-panels
				@on-open-change="setOptTime1"
                v-model="signTime"
                type="daterange"
                :transfer="true"
                placement="bottom-start"
                separator=" ~ "
                :placeholder="$t('modules_spoc_crm_web_src_views_transferintroductionmanagement_index_1975')"
                style="width:224px;">
            </DatePicker>
            <Select v-model="paramsTab1.officeId" style="width: 224px;" clearable :placeholder="$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_689')">
                <Option v-for="item in officeLists" :value="item.id" :key="item.id">{{ item.code }}{{ item.name }}</Option>
            </Select>
            <Select v-model="paramsTab1.followerOffice" style="width: 224px;" clearable :placeholder="$t('modules_spoc_crm_web_src_modules_resourceentrymodal copy_537')">
                <Option v-for="item in officeLists" :value="item.id" :key="item.id">{{ item.code }}{{ item.name }}</Option>
            </Select>
            <Input v-model="paramsTab1.name" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_leftbanner_819')"></Input>
            <Input v-model="paramsTab1.phone" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_leftbanner_820')"></Input>
            <Input v-model="paramsTab1.createByName" :placeholder="$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_688')"></Input>
            <Input v-model="paramsTab1.referralerName" :placeholder="$t('modules_spoc_crm_web_src_modules_leadsinfo_487')"></Input>
            <Input v-model="paramsTab1.referralerPhone" :placeholder="$t('modules_spoc_crm_web_src_views_transferintroductionmanagement_index_1980')"></Input>
            <!-- <Select v-model="paramsTab1.isExisted" clearable style="width: 224px;" :placeholder="$t('modules_spoc_crm_web_src_views_transferintroductionmanagement_index_1981')">
                <Option value="1">{{$t('modules_spoc_crm_web_src_views_transferintroductionmanagement_index_1982')}}</Option>
                <Option value="0">{{$t('modules_spoc_crm_web_src_views_transferintroductionmanagement_index_1983')}}</Option>
            </Select> -->
            <Select v-model="paramsTab1.status" clearable :transfer="true" :placeholder="$t('pushsettings_index_496')">
                <Option v-for="item in statusList" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
            <Select v-model="paramsTab1.referralType" :placeholder="$t('modules_spoc_crm_web_src_views_transferintroductionmanagement_index_1985')">
                <Option v-for="item in referralTypeLists" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
            <Select v-model="paramsTab1.isStart" clearable :transfer="true" :placeholder="$t('modules_spoc_crm_web_src_views_transferintroductionmanagement_index_1986')">
                <Option v-for="item in isStartList" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
            <Select v-model="paramsTab1.auditFlag" clearable :transfer="true" :placeholder="$t('spoc_hootie_web_12')">
                <Option v-for="item in aauditFlagList" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
        </v-search-collapse>
        <v-search-collapse @search="SearchMan" @reset="resetSearchMan" v-if="tabName == '1'" key="tab1" @changeDivHeight="changeDivHeight">
            <DatePicker
                ref="DatePicker2"
				:options="options32"
				split-panels
				@on-open-change="setOptTime2"
                v-model="createDate"
                type="daterange"
                :transfer="true"
                placement="bottom-start"
                separator=" ~ "
                :placeholder="$t('modules_spoc_crm_web_src_modules_resourceentrymodal copy_535')"
                style="width:224px;">
            </DatePicker>
            <DatePicker
                ref="DatePicker3"
				:options="options33"
				split-panels
				@on-open-change="setOptTime3"
                v-model="signDate"
                type="daterange"
                :transfer="true"
                placement="bottom-start"
                separator=" ~ "
                :placeholder="$t('modules_spoc_crm_web_src_views_transferintroductionmanagement_index_1975')"
                style="width:224px;">
            </DatePicker>
            <Select v-model="paramsTab2.officeId" style="width: 224px;" clearable :transfer="true" :placeholder="$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_689')">
                <Option v-for="item in officeLists" :value="item.id" :key="item.id">{{ item.code }}{{ item.name }}</Option>
            </Select>
            <Input v-model="paramsTab2.createByName" :placeholder="$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_688')"></Input>
        </v-search-collapse>
    </div>

    <big-table v-if="defaultShowCol"
        class="my-table"
        :tableName="tableName"
        :tableData="tableData"
        :tableHeightOut="tableHeightOut"
        :tableColumnArray="tableColumnArray"
        :defaultShowCol="defaultShowCol"
        :canSelection="true"
        :dataTotal="dataTotal"
        :btnList="btnList"
        :pageNo="pageNo"
        :updateShowTitleMethod="updateShowTitle"
        :updateShowTitleKey="updateShowTitleKey"
        @onRowClick="onRowClick"
        @resetDefault="resetDefaultCol"
        @selectionChange="selectionChange"
        @pageChange="pageChange">
    </big-table>
    <export-modal ref="exportModal" :exportMethod="exportMethod"></export-modal>
    <regReward ref="regReward" @uploadLists="getListData"></regReward>
    <Modal v-model="modal3" width="400" class="exportIng" :closable="false" :mask-closable="false">
        <div>
            <div class="ivu-modal-confirm">
                <div class="ivu-modal-confirm-head">
                    <div class="ivu-modal-confirm-head-icon ivu-modal-confirm-head-icon-info">
                            <i class="ivu-icon ivu-icon-ios-information-circle"></i>
                    </div>
                    <div class="ivu-modal-confirm-head-title">{{$t('modules_spoc_crm_web_src_views_transferintroductionmanagement_index_1988')}}</div>
                </div>
                <div class="ivu-modal-confirm-body">
                    <div>{{$t('modules_spoc_crm_web_src_views_transferintroductionmanagement_index_1989')}}</div>
                </div>
            </div>
        </div>
    </Modal>
</div>
</template>
<script>
import tableDropdown from '@public/modules/tableDropdown.vue';
import { mapMutations, mapState } from "vuex";
import valid, { errors, sysUser, sysDict, crmReferral } from "../../libs/request";
import { waitUntil, DatePickerOpt, defaultDatePickerValue } from "@public/libs/util";
import util from "@public/libs/js/util";
import bigTable from "@public/modules/bigTable.vue";
import exportModal from "@public/modules/exportModal.vue";
import vSearchCollapse from "@public/modules/vSearchCollapse";
import regReward from "./regReward";
export default {
    name: 'crm.transferIntro',
    props: {

    },
    data() {
        return {
            modal3: false,
            options3: null,
            options31: null,
            options32: null,
            options33: null,
            tableHeightOut: 140, //324,
            tabName:'0',
            updateShowTitleKey: "listReferralPage",
            updateShowTitle: crmReferral.updateShowTitle,
            // exportMethod: htContract.exportSelectedFile, //导出用到的方法对象
            exportMethod: crmReferral.crmReferralExport, //导出用到的方法对象
            selection: [],
            createTime: [], // 创建时间
            signTime: [], // 签约日期
            createDate: [], //登记时间
            signDate: [],
            referralTypeLists:[], //转介绍类型Lists
            statusList:[], //状态Lists
            isStartList:[
                {
                    label:this.$t('modules_spoc_crm_web_src_views_transferintroductionmanagement_index_1990'),
                    value:'0'
                },
                {
                    label:this.$t('modules_spoc_crm_web_src_views_transferintroductionmanagement_index_1991'),
                    value:'1'
                },
            ], //是否已开课
            aauditFlagList:[
                {
                    label:this.$t('modules_spoc_crm_web_src_views_transferintroductionmanagement_index_1992'),
                    value:'0'
                },
                {
                    label:this.$t('classlist_classlist_13'),
                    value:'1'
                },
                {
                    label:this.$t('courselist_compontents_servicecontent_217'),
                    value:'2'
                },
            ], //审批状态
            tableName: this.$t('modules_spoc_crm_web_src_views_transferintroductionmanagement_index_1995'),
            defaultShowCol: null,
            dataTotal: 0,
            tableData: [],
            paramsTab1: {
                officeId: '',
                followerOffice: '',
                createByName: '',
                referralType: '',
                name: '',
                phone: '',
                referralerName: '',
                status: '',
                createDateEnd: '',
                createDateStart: '',
                signDateEnd: '',
                signDateStart: '',
                referralerPhone: '',
                // isExisted: '',
                isStart: '',
                auditFlag: '',
            },
            paramsTab2: {
                officeId: '',
                createByName: '',
                createDateEnd: '',
                createDateStart: '',
            },
            pageNo: 1,
            pageSize: this.$store.state.app.pageSizeGlobal,
            officeLists: [],
            btnList:[],
            btnListExport: [
                // {
                //     style: {},
                //     type: '',
                //     btnClick: this.isExportNew,
                //     text: '导出',
                //     value: '2',
                // }
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
            tableColumnArray:[],
            tableColumnArray1: [
                {
                    title: this.$t('classlist_compontents_detailinfo_45'),
                    key: "doAction",
                    width: 140,
                    render: (h, params) => {
                        let self = this
                        let dom = [];
                        if(params.row.auditFlag == '1' && this.myButtonPrem.indexOf('reward') > -1) {
                            dom.push(h("a", {
                                props: {
                                    type: "text",
                                    size: "small"
                                },
                                style: {marginRight:'8px',},
                                on: {
                                    click: (e) => {
                                        e.stopPropagation()
                                        this.$refs.regReward.show(params.row)
                                    }
                                }}, this.$t('modules_spoc_crm_web_src_views_transferintroductionmanagement_index_2000'))
                            )
                        }
                        return h("div", {
                                on: {
                                    click: (e) => {
                                        e.stopPropagation()
                                    },
                                }
                            },[
                            this.myButtonPrem.indexOf('crmDetail') > -1 ? h(
                                "a",
                                {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    },
                                    style: {
                                        marginRight:'8px',
                                    },
                                    on: {
                                        click: (e) => {
                                            e.stopPropagation()
                                            this.$router.push({
                                                name: 'crm.customer360',
                                                query:{
                                                    id: params.row.cusId
                                                }
                                            });
                                        }
                                    }
                                }, this.$t('principalmailbox_16')
                            ) : '',
                            this.myButtonPrem.indexOf('audit') > -1 ? h(tableDropdown, {
                                props: {
                                    actionName: this.$t('modules_spoc_crm_web_src_views_transferintroductionmanagement_index_2002'),
                                    buttonList: [
                                        {
                                            label: this.$t('classlist_classlist_13'),
                                            key: '1'
                                        },
                                        {
                                            label: this.$t('courselist_compontents_servicecontent_217'),
                                            key: '2'
                                        }
                                    ]
                                },
                                on: {
                                    dropFn: key => {
                                        if(key == '1'){
                                            let obj = {
                                                title:this.$t('modules_spoc_crm_web_src_views_transferintroductionmanagement_index_2003'),
                                                content: this.$t('modules_spoc_crm_web_src_views_transferintroductionmanagement_index_2004'),
                                                onOk:() => {
                                                    self.setAudit(params.row.id, key);
                                                }
                                            }
                                            this.$Modal.confirm(obj)
                                        } else {
                                            self.setAudit(params.row.id, key);
                                        }
                                    }
                                }
                            }) : '', dom
                        ]);
                    }
                }
            ],
        };
    },
    computed: {
        ...mapState(["app", "buttonPerm", "calendarConfig"]),
        myButtonPrem(){
            return this.buttonPerm['crm.transferIntro'] || []
        },
    },
    components: {
        bigTable,
        exportModal,
        vSearchCollapse,
        regReward,
        tableDropdown,
    },
    mounted() {
        this.getShowTitle();
        this.batchListData();
        this.getOfficeLists();
        waitUntil(
            () => {
                if ((this.app.currOfficeId && JSON.stringify(this.buttonPerm)!= '{}') || false) {
                    // this.paramsTab1.officeId = this.app.currOfficeId;
                    // this.paramsTab2.officeId = this.app.currOfficeId;
                    if (this.app.currOfficeId == "all") {
                        this.paramsTab1.officeId = "";
                        this.paramsTab2.officeId = "";
                    } else {
                    this.paramsTab1.officeId = this.app.currOfficeId;
                    this.paramsTab2.officeId = this.app.currOfficeId;
                    }
                }
                return (this.app.currOfficeId && this.paramsTab1.referralType) || false;
            },
            () => {
                // console.log(this.myButtonPrem);
                if(this.myButtonPrem.indexOf('edit') > -1){ //可以新增
                    this.btnList = [
                        {
                            type: '',
                            btnClick: this.addNew,
                            text: this.$t('modules_spoc_crm_web_src_views_transferintroductionmanagement_index_2005'),
                        },
                        ...this.btnListExport
                    ]
                } else {
                    this.btnList = [...this.btnListExport]
                }
                this.tableColumnArray = this.tableColumnArray1
                this.options3 = DatePickerOpt(this,'DatePicker',Number(this.calendarConfig.maxMonthInterval))
                this.options31 = DatePickerOpt(this,'DatePicker1',Number(this.calendarConfig.maxMonthInterval))
                this.options32 = DatePickerOpt(this,'DatePicker2',Number(this.calendarConfig.maxMonthInterval))
                this.options33 = DatePickerOpt(this,'DatePicker3',Number(this.calendarConfig.maxMonthInterval))
                this.createTime = defaultDatePickerValue(this.calendarConfig.maxMonthInterval)
                this.createDate = defaultDatePickerValue(this.calendarConfig.maxMonthInterval)

                if(this.myButtonPrem.indexOf('cusList') < 0 && this.myButtonPrem.indexOf('userList') > -1){
                    this.tabName = '1'
                }
                this.getListData();
            }
        );
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        onRowClick(row, index){
            if(this.myButtonPrem.indexOf('crmDetail') > -1){
                this.$router.push({
                    name: 'crm.customer360',
                    query:{
                        id: row.cusId
                    }
                });
            }
        },
        resetDefaultCol(){
            this.updateLoadingStatus({ isLoading: true });
            let params = {};
            if(this.tabName == '0') {
                // 登记记录
                params = {pageIdentifier: 'listReferralPage',}
            } else {
                // 登记人
                params = {pageIdentifier: 'listCreatersPage',}
            }
            crmReferral.clearShowField(params)
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
        setOptTime(flag){
            if(flag){
                this.createTime = []
            }
        },
        setOptTime1(flag){
            if(flag){
                this.signTime = []
            }
        },
        setOptTime2(flag){
            if(flag){
                this.createDate = []
            }
        },
        setOptTime3(flag){
            if(flag){
                this.signDate = []
            }
        },
        addNew() {
            this.$router.push({
                name:'crm.leadsEntry',
                query: {
                    isTransferIntro: '1',
                    source: 'crm.transferIntro'
                }
            })
        },
        changeTabs(val) {
            this.tableHeightOut = 140;
            this.tabName = val;
            this.pageNo = 1;
            this.getShowTitle();
            if(val == '0'){
                this.resetSearchRecord();
                this.updateShowTitleKey = 'listReferralPage';
                this.tableName = this.$t('modules_spoc_crm_web_src_views_transferintroductionmanagement_index_1995')
                this.tableColumnArray = this.tableColumnArray1
                if(this.myButtonPrem.indexOf('edit') > -1){ //可以新增
                    this.btnList = [
                        {
                            type: '',
                            btnClick: this.addNew,
                            text: this.$t('modules_spoc_crm_web_src_views_transferintroductionmanagement_index_2005'),
                        },
                        ...this.btnListExport
                    ]
                } else {
                    this.btnList = [...this.btnListExport]
                }
            } else {
                this.resetSearchMan();
                this.updateShowTitleKey = 'listCreatersPage';
                this.tableName = this.$t('modules_spoc_crm_web_src_views_transferintroductionmanagement_index_2006')
                this.btnList = [...this.btnListExport]
                this.tableColumnArray = []
            }
        },
        //可选方法，如果是多选的话必须有
        selectionChange(selection) {
            this.selection = selection;
        },
        isExportNew(){
            this.modal3 = true
            crmReferral.crmReferralExport(this.searchObj)
			.then(valid.call(this))
			.then(res => {
				if (res.data) {
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
        isExport(val) {
            //这里val的值。是根据设置下拉类型button设定的值来匹配判断
            if (val == "2" && !this.selection.length) {
                this.$Message.error(this.$t('scoretemplate_scoretemplate_572'));
                return;
            }
            let searchObj = JSON.parse(JSON.stringify(this.searchObj));
            delete searchObj.pageNo
            delete searchObj.pageSize
            if (val == "1") {
                // this.exportMethod = htContract.exportFile; //导出用到的方法对象
            } else if (val == "2") {
                //如果是导出所选，需要在这里传递所选对象、或者对象ID，这里根据需要自行处理，并作为搜索参数的一部分传递到导出组件
                if(this.tabName == '0'){
                    searchObj = {
                        ids: this.selection.map(item => {
                            return item.id;
                        }),
                        "createByIds": [
                            "-1"
                        ],
                    };
                } else {
                    searchObj = {
                        ids: [
                            "-1"
                        ],
                        "createByIds":this.selection.map(item => {
                            return item.createBy;
                        }), 
                    };
                }
                // this.exportMethod = htContract.exportSelectedFile; //导出用到的方法对象
            }
            this.$refs.exportModal.noShowExport(this.exportMethod, searchObj);
        },
        batchListData() {
            let types = [
                'alloc', // 状态
                'sale', // 状态
                // 'pub', // 状态
                'crm_referral', // 转介绍类型
            ]
            sysDict.batchListData({types: types.join(',')})
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    let _data = res.data.data;
                    let _arr = [];
                    _arr = [..._arr, ..._data.alloc, ..._data.sale];
                    this.statusList = _arr;
                    this.referralTypeLists = _data.crm_referral;
                    this.referralTypeLists.unshift({
                        value: 'all',
                        label: this.$t('message_index_287')
                    })
                    this.paramsTab1.referralType = 'all';
                    // this.paramsTab1.referralType = _data.crm_referral.length ? _data.crm_referral[0].value : '';
                }
            })
            .catch(errors.call(this))
        },
        getListData() {
            let param = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
            };
            if(this.tabName == '0') {
                // 登记记录
                this.paramsTab1.createDateStart = this.createTime[0] ? this.createTime[0].format('yyyy-MM-dd 00:00:00') : "";
                this.paramsTab1.createDateEnd = this.createTime[1] ? this.createTime[1].format('yyyy-MM-dd 23:59:59') : "";
                this.paramsTab1.signDateStart = this.signTime[0] ? this.signTime[0].format('yyyy-MM-dd 00:00:00') : "";
                this.paramsTab1.signDateEnd = this.signTime[1] ? this.signTime[1].format('yyyy-MM-dd 23:59:59') : "";
                param = Object.assign({}, param, this.paramsTab1);
                if(this.paramsTab1.referralType == 'all') {
                    param.referralType = '';
                }
                this.listPage(param);
            } else {
                // 登记人
                this.paramsTab2.createDateStart = this.createDate[0] ? this.createDate[0].format('yyyy-MM-dd 00:00:00') : "";
                this.paramsTab2.createDateEnd = this.createDate[1] ? this.createDate[1].format('yyyy-MM-dd 23:59:59') : "";
                this.paramsTab2.signDateStart = this.signDate[0] ? this.signDate[0].format('yyyy-MM-dd 00:00:00') : "";
                this.paramsTab2.signDateEnd = this.signDate[1] ? this.signDate[1].format('yyyy-MM-dd 23:59:59') : "";
                param = Object.assign({}, param, this.paramsTab2);
                this.listCreatersPage(param);
            }
            this.searchObj = param; //这里需要给searchObj 赋值，导出数据的时候需要用到
        },
        listPage(params) {
            // 登记记录列表
            this.updateLoadingStatus({ isLoading: true });
            crmReferral.listReferralPage(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    let result = res.data.data;
                    this.tableData = result.list;
                    this.dataTotal = result.total;
                } else {
                    this.tableData = [];
                    this.dataTotal = 0;
                }
            })
            .catch(errors.call(this))
            .finally(() => {
                this.updateLoadingStatus({ isLoading: false });
            });

        },
        listCreatersPage(params) {
            // 登记人列表
            this.updateLoadingStatus({ isLoading: true });
            crmReferral.listCreatersPage(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    let result = res.data.data;
                    this.tableData = result.list;
                    this.dataTotal = result.total;
                } else {
                    this.tableData = [];
                    this.dataTotal = 0;
                }
            })
            .catch(errors.call(this))
            .finally(() => {
                this.updateLoadingStatus({ isLoading: false });
            });
        },
        //获取数据，根据情况修改接口、传参
        SearchRecord() {
            this.pageNo = 1;
            this.getListData();
        },
        SearchMan() {
            this.pageNo = 1;
            this.getListData();
        },
        resetSearchRecord() {
            // reset 登记记录 搜索条件
            this.createTime = defaultDatePickerValue()
            this.signTime = [];
            for (let item in this.paramsTab1) {
                this.paramsTab1[item] = '';
            }
            this.pageNo = 1;
            // this.paramsTab1.officeId = this.app.currOfficeId;
             if (this.app.currOfficeId == "all") {
                this.paramsTab1.officeId = "";
            } else {
                this.paramsTab1.officeId = this.app.currOfficeId;
            }
            this.paramsTab1.referralType = this.referralTypeLists.length ? this.referralTypeLists[0].value : '';
            this.getListData();
        },
        resetSearchMan() {
            // reset 登记人 搜索条件
            this.createDate = defaultDatePickerValue()
            this.signDate = [];
             for (let item in this.paramsTab2) {
                this.paramsTab2[item] = '';
            }
            if (this.app.currOfficeId == "all") {
                this.paramsTab2.officeId = "";
            } else {
                this.paramsTab2.officeId = this.app.currOfficeId;
            }
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
        //必须方法，获取默认显示的可选列  接口根据需要自行更换，每个模块的接口是不一致的
        getShowTitle(closeLoad) {
            let params = {};
            if(this.tabName == '0') {
                // 登记记录
                params = {
                    pageIdentifier: 'listReferralPage',
                    voName: 'com.windliven.spoc.modules.crm.vo.CrmReferralVO'
                }
            } else {
                // 登记人
                params = {
                    pageIdentifier: 'listCreatersPage',
                    voName: 'com.windliven.spoc.modules.crm.vo.CrmReferralCreaterVO'
                }
            }
            crmReferral.getShowTitle(params)
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
        getOfficeLists() {
            sysUser.dataScopeFilter()
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.officeLists = res.data.data;
                }
            })
            .catch(errors.call(this))
        },
        setAudit(id, status) {
            console.log(status)
            let params = {
                id: id,
                auditFlag: status
            }
            crmReferral.audit(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.$Message.success(res.data.message);
                    this.getListData();
                }
            })
            .catch(errors.call(this))
        },
        changeDivHeight(height) {
            // console.log(height)
            this.tableHeightOut = height + 68;
        },
    },
    watch: {
        "app.currOfficeId": function(val, oldVal) {
            if (oldVal&&this.$route.name=="crm.transferIntro") {
              /*   this.paramsTab1.officeId = this.app.currOfficeId;
                this.paramsTab2.officeId = this.app.currOfficeId;
                this.getListData(); */
                  if (this.app.currOfficeId == "all") {
                    this.paramsTab1.officeId = "";
                    this.paramsTab2.officeId = "";
                } else {
                    this.paramsTab1.officeId = this.app.currOfficeId;
                    this.paramsTab2.officeId = this.app.currOfficeId;
                }
                    this.getListData();
            }
        }
    }
};
</script>
