<style lang="less">
    .sign_container .s-content {
        background: none;
    }
    .mytable {
        margin-top: 10px;
        width: 100%;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        padding: 0 16px;
    }
    .refundGiveClass {
        .approval {
            position: relative;
            color: #495060;
            padding-left: 8px;
            &::before {
                position: absolute;
                display: block;
                content: '';
                width: 4px;
                height: 4px;
                border-radius: 50%;
                left: 0;
                top: 4px;
            }
        }
        .approval-1 {
            .approval;
            &::before {
                background: #999999;
            }
        }
        .approval-2 {
            .approval;
            &::before {
                background: #46BC15;
            }
        }
        .approval-3 {
            .approval;
            &::before {
                background: #44BCB7;
            }
        }
        .approval-4 {
            .approval;
            &::before {
                background: #F5222D;
            }
        }
        .approval-5 {
            .approval;
            &::before {
                background: #EABB06;
            }
        }
        .approval-6 {
            .approval;
            &::before {
                background: #CCCCCC;
            }
        }
        .searchCollapse {
            .ivu-input-number {
                .ivu-input-number-handler-wrap {
                    opacity: 1;
                }
            }
            .border-style {
                display: inline-block;
                position: relative;
                &:after {
                    content: "";
                    display: block;
                    position: absolute;
                    left: 142px;
                    top: 15px;
                    margin: 0 1px;
                    width: 10px;
                    height: 2px;
                    background: #e6e7eb;
                }
            }
        }
    }
    .details-box{
        width:100%;
        display: flex;
        justify-content: center;
    }
</style>
<template>
    <div class="refundGiveClass">
        <v-search-collapse v-if="!ctNo" @search="getLists" @reset="resetSearch" @changeDivHeight="changeDivHeight" class="searchCollapse">
            <DatePicker
                v-model="classListFind.submitTime"
                format="yyyy-MM-dd"
                type="daterange"
                :placeholder="$t('principalmailbox_index_490')"
                :clearable="true"
                style="width:224px;"
                @on-change="submitTime1"
                @on-clear="clearTime1"
                ref="DatePicker"
                split-panels
                :options="options"
                @on-open-change="setOptTime"
            ></DatePicker>
            <Select v-model="classListFind.areaSchool" style="width: 224px;" clearable :placeholder="$t('messagemanagement_index_352')">
                <Option
                        v-for="item in areaSchoolList"
                        :value="item.id"
                        :key="item.id"
                >{{item.code}}{{ item.name }}</Option>
            </Select>
            <Select filterable remote
                    @on-clear="clearStu"
                    @on-change="getChangeStu"
                    @on-query-change="getQuery"
                    :remote-method="getStus" v-model="classListFind.stundentName"  :placeholder="$t('memberlist_memberlist_257')" >
                <Option v-for="item in nameList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
            <Input v-model="classListFind.givecClass" :placeholder="$t('modules_spoc_sign_web_src_views_refundgiveclass_refundgiveclass_7187')"></Input>
            <div class="border-style" style="width: 296px;">
                <InputNumber :active-change="true" @on-change="restLeft" v-model="classListFind.restHourLow" :min="0" :placeholder="$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_21341')"></InputNumber>
                <InputNumber style="margin-left:10px;" :active-change="true" @on-change="restRight" v-model="classListFind.restHourHigh" :min="0" :placeholder="$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_21342')"></InputNumber>
            </div>
            <Input v-model="classListFind.refundNum" :placeholder="$t('modules_spoc_sign_web_src_views_approval_approvalnew_5071')"></Input>
            <Select v-model="classListFind.giveClassType" clearable :placeholder="$t('modules_spoc_sign_web_src_views_refundgiveclass_refundgiveclass_7190')">
                <Option
                        v-for="item in giveClassTypeList"
                        :value="item.value"
                        :key="item.value"
                >{{ item.label }}</Option>
            </Select>
            <Select v-model="classListFind.approvalStatus" clearable :placeholder="$t('spoc_hootie_web_12')">
                <Option
                        v-for="item in approvalStatusList"
                        :value="item.value"
                        :key="item.value"
                >{{ item.label }}</Option>
            </Select>
            <DatePicker
                v-model="classListFind.approvalTime"
                format="yyyy-MM-dd"
                type="daterange"
                :placeholder="$t('classlist_classlist_10')"
                :clearable="true"
                @on-change="submitTime"
                @on-clear="clearTime"
                style="width:224px;"
                ref="DatePicker1"
                split-panels
                :options="options1"
                @on-open-change="setOptTime1"
            ></DatePicker>
            <Select filterable remote
                    @on-clear="clearApl"
                    @on-query-change="getQuery1"
                    :remote-method="getSearchList" v-model="classListFind.submitPeople"  :placeholder="$t('modules_spoc_portal_views_workorderm_index_4442')" style="width: 114px;">
                <Option v-for="item in submitPeopleList" :value="item.value" :key="item.value">{{ item.name }}</Option>
            </Select>
            <Select filterable remote
                    @on-query-change="getQuery2"
                    :remote-method="getSearchList2" v-model="classListFind.seller"  :placeholder="$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4476')" style="width: 114px;">
                <Option v-for="item in sellerList" :value="item.value" :key="item.value">{{ item.name }}</Option>
            </Select>
        </v-search-collapse>
        <big-table
                v-if="defaultShowCol"
                class="mytable"
                :tableName="$t('modules_spoc_sign_web_src_views_refundgiveclass_refundgiveclass_7195')"
                :tableData="tableData"
                :tableHeightOut="tableHeightOut"
                :tableColumnArray="tableColumnArray"
                :defaultShowCol="defaultShowCol"
                :btnList="btnList"
                :canSelection="true && !ctNo"
                :pageNo="pageNo"
                :updateShowTitleMethod="updateShowTitle"
                :updateShowTitleKey="updateShowTitleKey"
                :dataTotal="dataTotal"
                :canChangeHeight="!ctNo"
                :isShowSelectTableColumn="!ctNo"
                @resetDefault="resetDefaultCol"
                @selectionChange="selectionChange"
                @sortChange="sortChange"
                @pageChange="pageChange"
                @changeTableType="changeTableType"
        ></big-table>
        <export-modal ref="exportModal"></export-modal>
        <give-class @ge-parent-list="getListsPage1"  ref="giveclassRef"></give-class>
        <table-details ref="giveClassDetails"></table-details>
    </div>
</template>
<script>
    import {mapMutations, mapState} from 'vuex';
    import { waitUntil, DatePickerOpt, defaultDatePickerValue } from "@public/libs/util";
    import bigTable from "@public/modules/bigTable.vue";
    import exportModal from "@public/modules/exportModal.vue";
    import vSearchCollapse from "@public/modules/vSearchCollapse";
    import valid, {
        errors,
        sysUser,
        htPresentApply,
        sysCommonSql,
        common,
        sysDict } from "../../libs/request";
    import tableDropdown from "@public/modules/tableDropdown";
    import giveClass from "./giveClass";
    import tableDetails from '../../modules/tableDetails.vue';
    export default {
        name: 'sign.refundGiveClass',
        props:{
            //判断是否合同详情页打开的。有合同编号则为合同详情页打开
            ctNo:{
                type: String
            },
            ctStudnetId:{
                type: String
            },
            ctStudnetName:{
                type: String
            },
            ctOfficeId:{
                type: String
            }
        },
        components: {
            bigTable,
            exportModal,
            vSearchCollapse,
            tableDropdown,
            giveClass,
            tableDetails,
        },
        computed:{
            ...mapState(["userInfo", "app", 'buttonPerm', "calendarConfig"]),
            myButtonPrem() {
                if (this.buttonPerm && (JSON.stringify(this.buttonPerm) != "{}")) {
                    return this.buttonPerm['sign.refundGiveClass'] || [];
                } else {
                    return false;
                }
            },
            btnList(){
                if(this.ctNo){ // 如果是从合同详情打开
                    return [{
                            style: {},
                            type: "",
                            btnClick: this.submitGiveClass,
                            text: this.$t('modules_spoc_sign_web_src_views_refundgiveclass_refundgiveclass_7196')
                        }]
                }else{
                    return [
                        {
                            style: {},
                            type: "",
                            btnClick: this.submitGiveClass,
                            text: this.$t('modules_spoc_sign_web_src_views_refundgiveclass_refundgiveclass_7196')
                        },
                        [
                            {
                                hidden: this.myButtonPrem && this.myButtonPrem.indexOf('export') != -1 ? false : true,
                                style: {},
                                type: '',
                                btnClick: this.isExport,
                                text: this.$t('integralflow_4'),
                                value: '1',
                                parentName: this.$t('integralflow_5')
                            },
                            {
                                hidden: this.myButtonPrem && this.myButtonPrem.indexOf('export') != -1 ? false : true,
                                style: {},
                                type: '',
                                btnClick: this.isExport,
                                text: this.$t('integralflow_6'),
                                value: '2',
                                parentName: this.$t('integralflow_5')
                            },
                        ]
                    ];
                }
            }
        },
        mounted() {
            this.getStatusList()
            this.getShowTitle();
            if(this.ctNo){ // 如果是从合同详情打开
                this.classListFind.refundNum = this.ctNo;
                this.getLists()
            } else {
                this.blogCompassFn()
            }
        },
        data() {
            return {
                options: null,
                options1: null,
                tableHeightOut: 72, //324,
                orderByStatus:'',
                orderByType:"",
                selectedIds: [], //选中的ids
                currentIds: [], //当前页的ids
                itemId:'',
                giveclassShow:false,
                classListFind: {
                    stundentName: "",
                    givecClass: "",
                    submitTime: [],
                    areaSchool: "",
                    restHourLow: '',
                    restHourHigh: '',
                    refundNum: "",
                    giveClassType: "",
                    approvalStatus: "",
                    approvalTime: [],
                    submitPeople: "",
                    seller:"",
                },
                stuQuery:'',
                nameList:[],
                submitPeopleList:[],
                sellerList:[],
                startTime:'',//时间参数
                endTime:'',
                startTime1:'',
                endTime1:'',
                areaSchoolList: [],
                giveClassTypeList: [
                    {value:'1',label:this.$t('modules_spoc_sign_web_src_views_refundgiveclass_giveclass_7150')},
                    {value:'0',label:this.$t('modules_spoc_sign_web_src_modules_tabledetails_4970')}
                ],
                approvalStatusList: [],
                selection: [],
                updateShowTitleKey: "htPresentApply/listPage",
                updateShowTitle: htPresentApply.updateShowTitle,
                exportMethod: htPresentApply.exportFile, //导出用到的方法对象
                defaultShowCol: null,
                dataTotal: 0,
                pageNo: 1,
                pageSize: this.$store.state.app.pageSizeGlobal,
                tableColumnArray: [
                    {
                        // title: "学员姓名",
                        key: "studentName",
                        // render: (h, params) => {
                        //     return h('a', {
                        //             style:{
                        //                 'word-break': 'break-all',
                        //                 color: this.ctNo ? '#000' : '' //合同详情页打开的。颜色修改
                        //             },
                        //             on:{
                        //                 click:() => {
                        //                     // this.$router.push({
                        //                     //     name:'sign.pactDetails',
                        //                     //     query:{
                        //                     //         id:params.row.ctId
                        //                     //     }
                        //                     // })
                        //                 }
                        //             }
                        //         },
                        //         params.row.studentName)
                        // }
                    },
                    {
                        // title: "相关合同编号",
                        key: "no",
                        // render: (h, params) => {
                        //     return h('a', {
                        //             style:{
                        //                 'word-break': 'break-all',
                        //                 color: this.ctNo ? '#000' : '' //合同详情页打开的。颜色修改
                        //             },
                        //             on:{
                        //                click:() => {
                        //                     if(!this.ctNo){ //合同详情页打开的。不执行跳转
                        //                         this.$router.push({
                        //                             name:'sign.pactDetails',
                        //                             query:{
                        //                                 id:params.row.ctId,
                        //                                 ctNo:params.row.no
                        //                             }
                        //                         })
                        //                     }
                        //                 }
                        //             }
                        //         },
                        //         params.row.no)
                        // }
                    },
                    {
                        // title: "审批状态",
                        key: "statusName",
                        render: (h, params) => {
                            return h('span', {
                                    class: params.row.status === 'unaudit' ? 'approval-1'
                                        : params.row.status === 'auditing' ? 'approval-2'
                                            : params.row.status === 'agree' ? 'approval-3'
                                                : params.row.status === 'reject' ? 'approval-4'
                                                    : params.row.status === 'uncommit' ? 'approval-5'
                                                        : params.row.status === 'invalid' ? 'approval-6' : '',
                                },
                                params.row.status === 'unaudit' ? this.$t('mycourse_mycourse_386') :
                                    params.row.status === 'auditing' ? this.$t('modules_spoc_jw_web_src_views_approval_approvalnew_2258') :
                                        params.row.status === 'agree' ? this.$t('spoc_hootie_web_19') :
                                            params.row.status === 'reject' ? this.$t('spoc_hootie_web_20') :
                                                params.row.status === 'uncommit' ? this.$t('modules_spoc_core_web_src_views_announcement_index_94') :
                                                    params.row.status === 'invalid' ? this.$t('modules_spoc_sign_web_src_modules_tabledetails_4942') : ''
                            )
                        }
                    },
                    {
                        // title: "赠送课时",
                        key: "num",
                        sortable: "custom",
                    },
                    {
                        // title: "已使用",
                        key: "usedNum",
                        sortable: "custom",
                    },
                    {
                        // title: "剩余",
                        key: "leftNum",
                        sortable: "custom",
                    },
                    {
                        // title: "作废课时",
                        key: "discardNum",
                        sortable: "custom",
                        render: (h, params) => {
                            return h('span', {
                                },
                                params.row.discardNum == null ? '0':params.row.discardNum)
                        }
                    },
                    {
                        // title: "提交时间",
                        key: "createDate",
                        sortable: "custom",
                    },
                    {
                        // title: "最新审批时间",
                        key: "auditTime",
                        sortable: "custom"
                    },
                    {
                        title: this.$t('classlist_compontents_detailinfo_45'),
                        key: "doAction",
                        width: !this.ctNo ? 220 : 110,
                        render: (h, params) => {
                            return h("div", [
                                !this.ctNo ? h(  //合同详情页打开的。不显示跳转
                                    "a",
                                    {
                                        style: {
                                        },
                                        on: {
                                            click: () => {
                                                this.$router.push({
                                                    name:'crm.customer360',
                                                    query:{
                                                        id:params.row.cusId
                                                    }
                                                })
                                            }
                                        }
                                    },
                                    this.$t('jw.studentCourseDetail')
                                ) : '' ,
                                !this.ctNo ? h(  //合同详情页打开的。不显示跳转
                                    "a",
                                    {
                                        style: {
                                            "margin-left": "5px",
                                        },
                                        on: {
                                            click: () => {
                                                this.$router.push({
                                                    name:'sign.pactDetails',
                                                    query:{
                                                        id:params.row.ctId,
                                                        ctNo:params.row.no
                                                    }
                                                })
                                            }
                                        }
                                    },
                                    this.$t('sign.pactDetails')
                                ) : '',
                                h(
                                    "a",
                                    {
                                        style: {
                                            "margin-left": "5px",
                                            display:(params.row.status != 'invalid'&&(this.myButtonPrem && this.myButtonPrem.indexOf('details') != -1)) ? 'inline-block' : 'none'
                                        },
                                        on: {
                                            click: () => {
                                                this.$refs.giveClassDetails.showPop({
                                                    id:params.row.id,
                                                    flowId:params.row.flowId,
                                                    key:'contract present',
                                                    status:params.row.status
                                                })
                                            }
                                        }
                                    },
                                    this.$t('courselist_compontents_servicecontent_202')
                                ),
                                h(
                                    "a",
                                    {
                                        style:{
                                             //合同详情页打开的。不显示赠课清零
                                            "margin-left": "5px",
                                            'display': (params.row.status == 'agree' && !this.ctNo&&(this.myButtonPrem && this.myButtonPrem.indexOf('clear') != -1)) ? 'inline-block' :'none'
                                        },
                                        on: {
                                            click: () => {
                                                this.$Modal.confirm({
                                                    width:433,
                                                    title:this.$t('modules_spoc_sign_web_src_views_refundgiveclass_refundgiveclass_7212'),
                                                    content:`<p style="color:rgba(255, 48, 0, 1)">赠送的课时数中剩余的所有课时将计入清零课时数， </p>
                                                            <span>你还要继续吗？</span>`,
                                                    onOk: ()=>{
                                                        this.clearCourse(params.row.id)
                                                    },
                                                })
                                            }
                                        }
                                    },
                                    this.$t('modules_spoc_sign_web_src_views_refundgiveclass_refundgiveclass_7213')
                                ),
                            ]);
                        }
                    }
                ],
                tableData: [],
            };
        },
        methods: {
            ...mapMutations(["updateLoadingStatus"]),
            resetDefaultCol(){
                this.updateLoadingStatus({ isLoading: true });
                htPresentApply.clearShowField({
                    pageIdentifier: "htPresentApply/listPage",
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
            changeDivHeight(height) {
                this.tableHeightOut = height;
            },
            restLeft(num) {
                if(num > this.classListFind.restHourHigh){
                    this.classListFind.restHourHigh = num
                    if(this.classListFind.restHourHigh <= 0){
                        this.classListFind.restHourHigh = 0
                    }
                }
            },
            restRight(num) {
                if(this.classListFind.restHourLow > num){
                    this.classListFind.restHourLow = num
                    if(this.classListFind.restHourLow <= 0){
                        this.classListFind.restHourLow = 0
                    }
                }
            },
            clearApl(){
              this.submitPeopleList = []
            },
            getSearchList(query) {
                if (query !== "") {
                    let obj= {
                        mainTable: "ht_present_apply",
                        mainField: 'create_by',
                        joinField: "id",
                        joinTable: "sys_user",
                        secondField: "name",
                        joinTableSearchParam: query
                    };
                    sysCommonSql.queryPageInputInitData(obj)
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            this.submitPeopleList = res.data.data
                        }
                    })
                    .catch(errors.call(this))
                }else{
                    this.classListFind.submitPeople = ''
                    this.submitPeopleList = []
                }
            },
            getSearchList2(query) {
                if (query !== "") {
                    let obj= {
                        mainTable: "ht_sign",
                        mainField: 'seller_id',
                        joinField: "id",
                        joinTable: "sys_user",
                        secondField: "name",
                        joinTableSearchParam: query
                    };
                    sysCommonSql.queryPageInputInitData(obj)
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            this.sellerList = res.data.data
                        }
                    })
                    .catch(errors.call(this))
                }else{
                    this.classListFind.seller = ''
                    this.sellerList = []
                }
            },
            clearStu() {
                this.nameList = []
            },
            getChangeStu(val) {
                if(val == undefined){
                    this.nameList = []
                    this.classListFind.stundentName = ''
                }
            },
            clearCourse(id){
                let params={}
                params.id = id
                htPresentApply.clear(params)
                .then(valid.call(this))
                .then(res=>{
                    if(res.ok){
                        this.$Message.success(this.$t('modules_spoc_sign_web_src_views_refundgiveclass_refundgiveclass_7214'))
                        this.getLists()
                    }
                })
                .then(errors.call(this))
            },
            getQuery(query) {
                if(query == '' && query != undefined){
                    this.classListFind.stundentName = ''
                    this.nameList = []
                }
            },
            getQuery1(query) {
                if(query == ''){
                    this.classListFind.submitPeople = ''
                    this.submitPeopleList = []
                }
            },
            getQuery2(query) {
                if(query == ''){
                    this.classListFind.seller = ''
                    this.sellerList = []
                }
            },
            getStus(query) {
                this.stuQuery = query
                if(query != undefined && query != ''){
                    let params={}
                    params.officeId = this.classListFind.areaSchool
                    params.name = query
                    common.listByOfficeIdAndName(params)
                    .then(valid.call(this))
                    .then(res=>{
                        if(res.ok){
                            this.nameList = res.data.data
                        }
                    })
                    .then(errors.call(this))
                }
            },
            getStatusList(){
                let params = {
                    types:'com_audit_status'
                }
                sysDict.batchListData(params)
                .then(valid.call(this))
                .then(res => {
                    if(res.ok){
                        this.approvalStatusList = res.data.data.com_audit_status
                    }
                })
                .then(errors.call(this))
            },
            submitTime(val){
                this.startTime = this.classListFind.approvalTime[0] ? this.classListFind.approvalTime[0].format('yyyy-MM-dd 00:00:00') : '';
                this.endTime = this.classListFind.approvalTime[1] ? this.classListFind.approvalTime[1].format('yyyy-MM-dd 23:59:59') : '';
            },
            submitTime1(val){
                this.startTime1 = this.classListFind.submitTime[0] ? this.classListFind.submitTime[0].format('yyyy-MM-dd 00:00:00') : '';
                this.endTime1 = this.classListFind.submitTime[1] ? this.classListFind.submitTime[1].format('yyyy-MM-dd 23:59:59') : '';
            },
            clearTime() {
                this.startTime = ''
                this.endTime = ''
            },
            clearTime1() {
                this.startTime1 = ''
                this.endTime1 = ''
            },
            blogCompassFn() {
                sysUser.dataScopeFilter()
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        if(res.data.data.length > 0){
                            this.areaSchoolList = res.data.data
                        }else{
                            this.areaSchoolList = []
                        }
                        waitUntil(()=>{
                            // console.log("this.app.currOfficeId ==" + this.app.currOfficeId)
                            return (this.app.currOfficeId && this.calendarConfig.maxMonthInterval) || false;
                        },()=>{
                            if(this.app.currOfficeId=='all'){
                                this.$set(this.classListFind, 'areaSchool', '')
                            }else{
                                this.$set(this.classListFind, 'areaSchool', this.app.currOfficeId)
                            }
							this.classListFind.submitTime = defaultDatePickerValue()
							this.classListFind.approvalTime = []; //defaultDatePickerValue()
                            this.submitTime1()
                            this.submitTime()
                            this.options = DatePickerOpt(this,'DatePicker',Number(this.calendarConfig.maxMonthInterval));
							this.options1 = DatePickerOpt(this,'DatePicker1',Number(this.calendarConfig.maxMonthInterval));
                            this.getLists();
                        });
                    }
                })
                .catch(errors.call(this))
                .finally(()=>{
                    this.updateLoadingStatus({isLoading:false});
                });
            },

            doActionItem(obj) {
                if (obj.key === "delData") {
                    if (obj.row.status != "1") {
                        this.$Modal.confirm({
                            title: this.$t('views_coursepack_bigtableexample_345'),
                            content: this.$t('views_coursepack_bigtableexample_346'),
                            onOk: () => {
                                this.deleteCoursePack(obj.row.id);
                            },
                            onCancel: () => {}
                        });
                    }
                } else if (obj.key === "changeStatus") {
                    this.$Modal.confirm({
                        title: this.$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2535'),
                        content: this.$t('modules_spoc_jw_web_src_views_classmanage_classmanagelist_2536'),
                        onOk: () => {
                            this.changeStatus(obj.row.id, obj.row.status);
                        },
                        onCancel: () => {}
                    });
                } else if (obj.key === "copy") {
                }
            },
            getListsPage1(){
                this.pageNo = 1
                this.getLists()
            },
            //获取数据，根据情况修改接口、传参
            getLists() {
                this.updateLoadingStatus({ isLoading: true });
                this.currentPage = this.pageNo;
                let param = {
                    pageNo: this.pageNo,
                    pageSize: this.pageSize,
                    "studentId" : '',
                    "courseName" : this.classListFind.givecClass,
                    "createById" : this.classListFind.submitPeople,
                    "createDateStart" : this.startTime1,
                    "createDateEnd" : this.endTime1,
                    "officeId" : this.classListFind.areaSchool,
                    "leftNumStart" : this.classListFind.restHourLow,
                    "leftNumEnd" : this.classListFind.restHourHigh,
                    "ctNo" : this.classListFind.refundNum,//合同编号
                    "type" : this.classListFind.giveClassType,
                    "status" : this.classListFind.approvalStatus,
                    "auditTimeStart" : this.startTime,
                    "auditTimeEnd" : this.endTime,
                    "orderByType" : this.orderByType,
                    "orderByStatus" : this.orderByStatus,
                    filtered:'1',
                    'seller_id':this.classListFind.seller
                };
                if(this.classListFind.stundentName == undefined){
                    param.studentName = this.stuQuery
                }else{
                    param.studentId = this.classListFind.stundentName
                }
                this.searchObj = param; //这里需要给searchObj 赋值，导出数据的时候需要用到
                htPresentApply
                .listPage(param)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let data = res.data;
                        this.dataTotal = data.data.total;
                        let d = data.data.list;
                        this.currentIds = [];
                        for (let i in d) {
                            this.currentIds.push(d[i].id);
                            if (this.selectedIds.includes(d[i].id)) {
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
            //分页方法 如果有分页则为必须方法，修改getCourseList为自己的获取数据方法 这里注意。不再有每页个数改变的方法了
            pageChange(pageNo, pageSize) {
                if (!pageNo) {
                    //防止无用重复请求
                    return;
                }
                this.pageNo = pageNo;
                this.pageSize = pageSize;
                this.getLists();
            },
            //如果有排序字段则为 必须方法，修改getCourseList为自己的获取数据方法
            sortChange(column) {
                 // console.log(column); // {key: "createByName" ,order: "desc"}
                this.orderByType = column.key
                this.orderByStatus = column.order === 'asc'?'1':column.order === 'desc'?'2' :""
                this.getLists();
            },
            //可选方法，如果是多选的话必须有
            selectionChange(selection) {
                //选择导出
                let s = this.selectedIds;
                let c = this.currentIds;
                for (let i in c) {
                    if (s.includes(c[i])) {
                        let num = this.selectedIds.indexOf(c[i]);
                        s.splice(num, 1);
                    }
                }
                if (selection.length) {
                    selection.forEach(item => {
                        s.push(item.id);
                    });
                }
            },
            //必须方法，获取默认显示的可选列  接口根据需要自行更换，每个模块的接口是不一致的
            getShowTitle(closeLoad) {
                htPresentApply
                .getShowTitle({
                    pageIdentifier: "htPresentApply/listPage",
                    voName:'HtPresentApplyVO',
					lang: this.$i18n.locale,
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
                for(let item in this.classListFind) {
                    if(typeof this.classListFind[item] === 'string' && item != 'areaSchool') {
                        this.classListFind[item] = ''
                    }
                }
                this.startTime=''
                this.endTime=''
                this.startTime1=''
                this.endTime1=''
                this.stuQuery = ''
                if(this.app.currOfficeId=='all'){
                    this.$set(this.classListFind, 'areaSchool', '')
                }else{
                    this.$set(this.classListFind, 'areaSchool', this.app.currOfficeId)
                }
                this.classListFind.submitTime = defaultDatePickerValue()
                this.classListFind.approvalTime = []; //defaultDatePickerValue()
                this.classListFind.restHourLow = ''
                this.classListFind.restHourHigh = ''
                this.nameList = []
                this.classListFind.submitPeople = ''
                this.submitPeopleList = []
                this.selectedIds = []
                this.orderByType = ''
                this.orderByStatus = ''
                this.submitTime1()
                this.submitTime()
                this.getLists()
            },
            getDetail(name) {

            },
            submitGiveClass() {
                console.log(this.$route)
                if(this.$route.name == "sign.refundGiveClass"){
                    this.$refs["giveclassRef"].giveclassShowMethod();
                } else {
                    this.$refs["giveclassRef"].giveclassShowMethod(this.ctNo,this.ctStudnetId,this.ctStudnetName,this.ctOfficeId);
                }
            },
            isExport(val) {
                //这里val的值。是根据设置下拉类型button设定的值来匹配判断
                if (val == '2') {
                    //如果是导出所选，需要在这里传递所选对象、或者对象ID，这里根据需要自行处理，并作为搜索参数的一部分传递到导出组件
                    if(this.selectedIds.length < 1){
                        this.$Message.error(this.$t('modules_spoc_sign_web_src_views_editleavenum_components_editleavenummodify_6461'))
                        return
                    }
                    this.searchObj.ids = this.selectedIds;
                    this.exportMethod = htPresentApply.htPresentApplyExport;
                } else {
                    delete this.searchObj.idList
                    this.exportMethod = htPresentApply.htPresentApplyExport;
                }
                this.$refs.exportModal.noShowExport(this.exportMethod, this.searchObj);
            },
            isCreate() {
                this.$router.push({
                    name: "jw.createClass",
                    query: {}
                });
            },
            setOptTime(flag){
                if(flag){
                    this.classListFind.submitTime=[];
                    this.clearTime1()
                }
            },
            setOptTime1(flag){
                if(flag){
                    this.classListFind.approvalTime=[];
                    this.clearTime()
                }
            },
        },
        watch:{
            'app.currOfficeId': function(val,oldVal){
                //合同详情页打开的。不执行监听
                if(oldVal && !this.ctNo && this.$route.name == "sign.refundGiveClass"){
                    if(this.app.currOfficeId=='all'){
                        this.$set(this.classListFind, 'areaSchool', '')
                    }else{
                        this.$set(this.classListFind, 'areaSchool', this.app.currOfficeId)
                    }
                    this.getLists()
                }
            }
        }
    };
</script>
