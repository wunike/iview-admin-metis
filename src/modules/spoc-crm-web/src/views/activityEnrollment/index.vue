<style lang="less">
.activity-enrollment {
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
}
.qr-code-pop {
    padding-left: 30px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    span {
        color: #999;
        font-size: 14px;
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
    <div class="activity-enrollment">
        <v-search-collapse @search="searchList" @reset="resetSearch" @changeDivHeight="changeDivHeight">
            <DatePicker
                ref="DatePicker"
				:options="options3"
				split-panels
				@on-open-change="setOptTime"
                v-model="optTime"
                type="daterange"
                placement="bottom-start"
                separator=" ~ "
                :placeholder="$t('modules_spoc_crm_web_src_views_activityenrollment_index_744')"
                style="width:224px;"
            ></DatePicker>
            <Select
                v-model="findObj.belongOfficeId"
                clearable
                :placeholder="$t('modules_spoc_crm_web_src_views_activityenrollment_index_745')"
                style="display: none"
                @on-change="officeIdChange"
            >
                <Option
                    v-for="item in officeIdList"
                    :value="item.id"
                    :key="item.value"
                >{{ item.name }}</Option>
            </Select>
            <Select v-model="findObj.hostTeacher" :placeholder="$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_609')" clearable>
                <Option
                    :value="item.id"
                    v-for="(item,index) in teachList"
                    :key="index"
                >{{item.name}}</Option>
            </Select>
            <Input v-model="findObj.name" :placeholder="$t('modules_spoc_crm_web_src_views_activityenrollment_index_747')"></Input>
            <Select v-model="findObj.status" clearable :placeholder="$t('modules_spoc_crm_web_src_views_activityenrollment_index_748')">
                <Option
                    v-for="item in statusList"
                    :value="item.value"
                    :key="item.value"
                >{{ item.label }}</Option>
            </Select>
            <!--            活动类型-->
            <Select v-model="findObj.type" clearable :placeholder="$t('modules_spoc_crm_web_src_views_activityenrollment_index_749')">
                <Option
                    v-for="item in typeList"
                    :value="item.value"
                    :key="item.value"
                >{{ item.label }}</Option>
            </Select>
            <!--            活动编号-->
            <Input v-model="findObj.code" :placeholder="$t('modules_spoc_crm_web_src_views_activityenrollment_index_750')" style="width:140px;" />
            <!--            二维码编号-->
            <Input v-model="findObj.qrCode" :placeholder="$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_695')" style="width:140px;" />
            <!--            创建时间-->
            <DatePicker
                ref="DatePicker"
                split-panels
                @on-open-change="setOptTime2"
                v-model="optTime2"
                type="daterange"
                placement="bottom-start"
                separator=" ~ "
                :placeholder="$t('modules_spoc_core_web_src_views_schoolmanagement_index_239')"
                style="width:224px;"
            ></DatePicker>
            <!--            创建人-->
            <Input v-model="findObj.createByName" :placeholder="$t('scoretemplate_scoretemplate_569')" style="width:140px;" />

            <!--            服务OO-->
            <Select v-model="findObj.classTeacherId" :placeholder="$t('courselist_compontents_modify_194')" clearable>
                <Option :value="item.id" v-for="(item,index) in classTeacherIdList" :key="index">{{item.name}}</Option>
            </Select>
            <!--            教室-->
            <Input v-model="findObj.classroomName" :placeholder="$t('modules_spoc_crm_web_src_views_activityenrollment_index_755')" style="width:140px;" />

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
            :isShowSelectTableColumn="true"
            :updateShowTitleMethod="updateShowTitle"
            :updateShowTitleKey="updateShowTitleKey"
            :tableHeightOut="tableHeightOut"
            @onRowClick="onRowClick"
            @resetDefault="resetDefaultCol"
            @selectionChange="selectionChange"
            @pageChange="pageChange"
        ></big-table>
        <export-modal ref="exportModal" :exportMethod="exportMethod"></export-modal>
        <memberRegistration ref="memberRegistration"></memberRegistration>
        <poptipCom ref="poptipCom" @sendData="getData"></poptipCom>
        <Modal v-model="QrCode" :title="$t('modules_spoc_crm_web_src_views_activityenrollment_index_756')" width="600" :mask-closable="false">
            <div class="qr-code-pop">
                <span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_624')}}</span>
                <Select
                    filterable
                    remote
                    v-model="QrCodeValue"
                    :placeholder="$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_625')"
                    style="width: 300px"
                    @on-clear="clearApl"
                    :loading="QrCodeValueLd"
                    @on-query-change="getQuery"
                    :remote-method="()=>{}"
                    clearable
                >
                    <Option
                        v-for="(item,index) in qrCodeList"
                        :label="item.code"
                        :value="item.id"
                        :key="index"
                    >{{ item.code }}</Option>
                </Select>
            </div>
            <div slot="footer">
                <Button style="margin-left:12px" @click="cancel">{{$t('classroom_allscore_53')}}</Button>
                <Button type="primary" @click="ok">{{$t('courselist_compontents_servicecontent_215')}}</Button>
            </div>
        </Modal>
        <Modal v-model="modal3" width="400" class="exportIng" :closable="false" :mask-closable="false">
            <div>
                <div class="ivu-modal-confirm">
                    <div class="ivu-modal-confirm-head">
                        <div class="ivu-modal-confirm-head-icon ivu-modal-confirm-head-icon-info">
                                <i class="ivu-icon ivu-icon-ios-information-circle"></i>
                        </div>
                        <div class="ivu-modal-confirm-head-title">{{$t('modules_spoc_crm_web_src_views_activityenrollment_index_761')}}</div>
                    </div>
                    <div class="ivu-modal-confirm-body">
                        <div>{{$t('modules_spoc_crm_web_src_views_activityenrollment_index_762')}}</div>
                    </div>
                </div>
            </div>
        </Modal>
    </div>
</template>
<script>
import tableDropdown from "@public/modules/tableDropdown.vue";
import newDropdown from "./components/newDropdown";
import poptipCom from "./components/poptipCom";
import { mapMutations, mapState } from "vuex";
import bigTable from "@public/modules/bigTable.vue";
import exportModal from "@public/modules/exportModal.vue";
import vSearchCollapse from "@public/modules/vSearchCollapse";
import valid, {
    errors,
    crmActivity,
    sysUser,
    crmQrcode, sysDict, crmCustomer, crmTrace
} from "../../libs/request";
import { waitUntil, DatePickerOpt, defaultDatePickerValue } from "@public/libs/util";
import util from "@public/libs/js/util";
import memberRegistration from "./components/memberRegistration";
export default {
    name: 'crm.activityEnrollment',
    data() {
        return {
            modal3: false,
            isActioning: false, //多次提交拦截
            options3: null,
            tableHeightOut: 72, //324,
            QrCodeValueLd: false,
            QrCode: false,
            QrCodeValue: "",
            qrCodeList: [],
            updateShowTitleKey: "listCrmActivityPage",
            updateShowTitle: crmActivity.updateShowTitle,
            exportMethod: crmActivity.export, //导出用到的方法对象
            selection: [],
            btnList: [
                // {
                //     style: {},
                //     type: "",
                //     btnClick: this.createActivity,
                //     text: "创建活动"
                // },
                // [
                //     {
                //         btnClick: this.isExport,
                //         text: '导出所选',
                //         value: '2',
                //         parentName: '导出'
                //     },
                //     {
                //         btnClick: this.isExport,
                //         text: '导出全部',
                //         value: '1',
                //         parentName: '导出'
                //     }
                // ]
            ],
            officeIdList: [],
            optTime: [],
            teachList: [],
            typeList:[],
            classTeacherIdList:[],
            statusList: [
                {
                    value: "0",
                    label: this.$t('scoretemplate_scoretemplate_558')
                },
                {
                    value: "1",
                    label: this.$t('scoretemplate_scoretemplate_559')
                }
            ],
            optTime2:[],
            findObj: {
                name: "",
                createById: "",
                status: "",
                belongOfficeId: "",
                hostTeacher: "",
                teacherId: '',
                createDateStart: '',
                createDateEnd: '',
                classTeacherId: '',
                classroomName: '',
                createByName: '',
                type: '',
                code: '',
                qrCode: '',
            },
            pageNo: 1,
            pageSize: this.$store.state.app.pageSizeGlobal,
            /*搜索相关结束*/
            tableName: this.$t('modules_spoc_crm_web_src_views_activityenrollment_index_769'),
            defaultShowCol: null,
            dataTotal: 0,
            sortObj: {},
            tableColumnArray: [
                {
                    // title: "APP转化率",
                    key: "appConversionRates",
                    render: (h, params) => {
                        return h(
                            "span",
                            {

                            },
                            params.row.appConversionRates*100+ '%'
                        );
                    }
                },
                {
                    // title: "OPP转化率",
                    key: "oppConversionRates",
                    render: (h, params) => {
                        return h(
                            "span",
                            {

                            },
                            params.row.oppConversionRates*100+ '%'
                        );
                    }
                },
                {
                    // title: "New转化率",
                    key: "newConversionRates",
                    render: (h, params) => {
                        return h(
                            "span",
                            {

                            },
                            params.row.newConversionRates*100+ '%'
                        );
                    }
                },
                {
                    // title: "总费用 ¥",
                    key: "expense",
                    // minWidth: 60,
                    fixed: "right",
                    render: (h, params) => {
                        return this.myButtonPrem.indexOf("editPrice") > -1 ? h(
                            "a",
                            {
                                style: {
                                    display: "block"
                                },
                                on: {
                                    click: (e) => {
                                        e.stopPropagation()
                                        if(this.myButtonPrem.indexOf("editPrice") > -1){
                                            this.$refs.poptipCom.show({
                                                val: params.row.expense,
                                                id: params.row.id
                                            });
                                        }
                                        // console.log('999999')
                                    }
                                }
                            },
                            params.row.expense ? params.row.expense : "点击输入"
                        ) : h('div',{},(params.row.expense ? params.row.expense : ""));
                    }
                },
                {
                    // title: "活动状态",
                    key: "isEnableName",
                    width: 80,
                    render: (h, params) => {
                        return this.myButtonPrem.indexOf("editStatus") > -1 ? h("div", {
                            on: {
                                click: (e) => {
                                    e.stopPropagation()
                                }
                            }
                        },[
                            h(newDropdown, {
                                props: {
                                    actionName: params.row.isEnableName
                                        ? params.row.isEnableName
                                        : "-",
                                    buttonList: [
                                        {
                                            label: this.$t('scoretemplate_scoretemplate_559'),
                                            key: "1"
                                        },
                                        {
                                            label: this.$t('scoretemplate_scoretemplate_558'),
                                            key: "0"
                                        }
                                    ]
                                },
                                style: {
                                    // marginRight:'8px'
                                },
                                on: {
                                    dropFn: key => {
                                        if (params.row.isEnable != key && (this.myButtonPrem.indexOf("editStatus") > -1)) {
                                            let param = {
                                                id: params.row.id + ""
                                            };
                                            if (key == "1") {
                                                param.isEnable = "1";
                                            } else {
                                                param.isEnable = "0";
                                            }
                                            this.updateIsEnableOrExpense(param);
                                        }
                                    }
                                }
                            })
                        ]) : h('div',{},(params.row.isEnableName ? params.row.isEnableName : "-"));
                    }
                },
                {
                    title: this.$t('classlist_compontents_detailinfo_45'),
                    key: "doAction",
                    width: 130,
                    render: (h, params) => {

                        let buttonList = []
                        if(this.myButtonPrem.indexOf("cusEnroll") > -1){
                            buttonList.push({
                                label: "新资源报名",
                                key: "1"
                            })
                        }
                        if(this.myButtonPrem.indexOf("vipEnroll") > -1){
                            buttonList.push({
                                label: "创建会员",
                                key: "0"
                            })
                        }
                        return h("div", {
                            on: {
                                click: (e) => {
                                    e.stopPropagation()
                                },
                            }
                        },[
                            this.myButtonPrem.indexOf("detail") > -1 ? h(
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
                                                name:
                                                    "crm.activityEnrollment.detial",
                                                query: {
                                                    activityId: params.row.id,
                                                    qr: params.row.qrCode,
                                                    isEnable:
                                                        params.row.isEnable
                                                }
                                            });
                                        }
                                    }
                                },
                                "详情"
                            ) : '',
                            this.myButtonPrem.indexOf("editQrcode") > -1 ? h(
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
                                            this.activityId = params.row.id;
                                            this.qrId = params.row.qrId;
                                            this.qrCode = params.row.qrCode;
                                            this.QrCode = true;
                                        }
                                    }
                                },
                                "二维码"
                            ) : '',
                            (this.myButtonPrem.indexOf("cusEnroll") > -1 || this.myButtonPrem.indexOf("vipEnroll") > -1) ? h(tableDropdown, {
                                props: {
                                    actionName: "报名",
                                    buttonList: buttonList
                                },
                                style: {
                                    display:
                                        params.row.isEnable == "1"
                                            ? "inline-block"
                                            : "none"
                                },
                                on: {
                                    dropFn: key => {
                                        if (key == "1") {
                                            this.$router.push({
                                                name: "crm.leadsEntry",
                                                query: {
                                                    activityId: params.row.id,
                                                    source:
                                                        "crm.activityEnrollment"
                                                }
                                            });
                                        } else {
                                            this.$refs.memberRegistration.showModal(
                                                {
                                                    activityId: params.row.id,
                                                    qrId: params.row.qrId,
                                                    qr: params.row.qrCode,
                                                    isEnable:
                                                        params.row.isEnable
                                                }
                                            );
                                        }
                                    }
                                }
                            }) : ''
                        ]);
                    }
                }
            ],
            tableData: [],
            activityId: "",
            qrId: "",
            qrCode: "",
            tableSelected:[],
            selectedIds: [], //选中的ids
            currentIds: [], //当前页的ids
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
        tableDropdown,
        memberRegistration,
        newDropdown,
        poptipCom
    },
    mounted() {
        this.getShowTitle();
        // this.getInitData();
        this.getTeachers(9);
        this.getTeachers(6);
        this.batchListData();
        // this.getListData();
        if (this.$route.query.id) {
            this.$refs.memberRegistration.showModal({
                id: this.$route.query.id,
                activityId: this.$route.query.activityId,
                name: this.$route.query.name
            });
        }
        waitUntil(
            () => {
                return (this.calendarConfig.maxMonthInterval && this.buttonPerm && (JSON.stringify(this.buttonPerm) != "{}")) || false;
            },
            () => {
                this.optTime = defaultDatePickerValue()
                this.options3 = DatePickerOpt(this,'DatePicker',Number(this.calendarConfig.maxMonthInterval))
                this.getListData();
            }
        );
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        onRowClick(row, index){
            if(this.myButtonPrem.indexOf("detail") > -1){
                this.$router.push({
                    name:
                        "crm.activityEnrollment.detial",
                    query: {
                        activityId: row.id,
                        qr: row.qrCode,
                        isEnable: row.isEnable
                    }
                });
            }
        },
        resetDefaultCol(){
            this.updateLoadingStatus({ isLoading: true });
            crmActivity.clearShowField({
                pageIdentifier: "listCrmActivityPage",
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
        batchListData() {
            // this.updateLoadingStatus({ isLoading: true });
            let types =
                "crm_activity_type";
            sysDict
                .batchListData({
                    types
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.typeList = res.data.data.crm_activity_type
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    // this.updateLoadingStatus({ isLoading: false });
                });

        },
        officeIdChange(){

        },
        setOptTime(flag){
            if(flag){
                this.optTime = []
            }
        },
        setOptTime2(flag){
            if(flag){
                this.optTime2 = []
            }
        },
        changeDivHeight(height) {
            this.tableHeightOut = height;
        },
        getTeachers(ids) {
            sysUser
                .listDataByRole({
                    roleIds: ids,
                    pageSize: -1
                    // officeIds:this.officeId,
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        if (ids == 9) {
                            this.teachList = res.data.data;
                        }else if(ids == 6){
                            this.classTeacherIdList = res.data.data;
                        }
                    }
                })
                .then(errors.call(this))
                .finally(() => {});
        },
        ok() {
            let currentCode = "00";
            for (let i in this.qrCodeList) {
                if (this.QrCodeValue == this.qrCodeList[i].id) {
                    currentCode = this.qrCodeList[i].code;
                }
            }
            this.QrCode = false;
            let params = {
                id: this.activityId,
                qrId: this.QrCodeValue,
                qrCode: currentCode
            };
            if(this.isActioning){ //多次提交拦截
                return
            }
            this.isActioning = true
            this.updateLoadingStatus({ isLoading: true });
            crmActivity
                .updateQrcode(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.$Message.success(this.$t('modules_spoc_crm_web_src_views_activityenrollment_index_777'));
                        this.getListData();
                        this.QrCodeValue = "";
                        this.qrCodeList = [];
                    }
                })
                .catch(errors.call(this))
                .finally(()=>{
                    this.updateLoadingStatus({ isLoading: false });
                    setTimeout(()=>{
                        //多次提交拦截
                        this.isActioning = false
                    },200)
                });
            this.getListData();
        },
        cancel() {
            this.QrCode = false;
            this.QrCodeValue = "";
            this.qrCodeList = [];
        },
        getQuery(query) {
            if (query === "" && typeof query !== "undefined") {
                this.QrCodeValue = "";
                this.qrCodeList = [];
            }
            this.listByCode(query);
        },
        clearApl() {
            this.qrCodeList = [];
        },
        listByCode(query) {
            if (query !== "") {
                this.QrCodeValueLd = true;
                let obj = {
                    officeId: "",
                    code: query
                };
                crmQrcode
                    .listByCode(obj)
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            this.qrCodeList = res.data.data;
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {
                        this.QrCodeValueLd = false;
                    });
            }
        },
        getData(val) {
            if (val.cost) {
                let param = {
                    id: val.id,
                    expense: val.cost
                };
                this.updateIsEnableOrExpense(param);
            }
        },
        updateIsEnableOrExpense(params) {
            crmActivity
                .updateIsEnableOrExpense(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.$Message.success(this.$t('courselist_compontents_modify_200'));
                        this.getListData();
                    }
                })
                .then(errors.call(this))
                .finally(() => {
                    // this.$refs['formValidate'].resetFields()
                    // this.startDate = ''
                    // this.endDate = ''
                });
        },
        createActivity(type) {
            this.$router.push({
                name: "crm.createEvent"
            });
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
            this.tableSelected=selection;
            // this.selection = selection;
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
                               this.$set(this.findObj, "belongOfficeId", val == "all" ? "" : val);
                            }
                            return (this.app.currOfficeId && this.calendarConfig.maxMonthInterval) || false;
                        },
                        () => {
                            this.optTime = defaultDatePickerValue()
				            this.options3 = DatePickerOpt(this,'DatePicker',Number(this.calendarConfig.maxMonthInterval))
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
                beginDate: this.optTime[0] ? this.optTime[0].format('yyyy-MM-dd 00:00:00') : "",
                endDate: this.optTime[1] ? this.optTime[1].format('yyyy-MM-dd 23:59:59') : "",
                isEnable: this.findObj.status,
                teacherId: this.findObj.hostTeacher,
                name: this.findObj.name,
                createDateStart: this.optTime2[0] ? this.optTime2[0].format('yyyy-MM-dd 00:00:00') : "",
                createDateEnd:this.optTime2[1] ? this.optTime2[1].format('yyyy-MM-dd 23:59:59') : "",
                classTeacherId: this.findObj.classTeacherId,
                classroomName: this.findObj.classroomName,
                createByName: this.findObj.createByName,
                type: this.findObj.type,
                code: this.findObj.code,
                qrCode: this.findObj.qrCode,
            };
            this.searchObj = param; //这里需要给searchObj 赋值，导出数据的时候需要用到
            console.log(this.searchObj)
            crmActivity
                .listCrmActivityPage(param)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let result = res.data.data;
                        this.dataTotal = result.total;
                        let d = result.list;
                        this.currentIds = [];
                        for (let i in d) {
                            this.currentIds.push(d[i].id);
                            if (this.selectedIds.includes(d[i].id)) {
                                d[i]._checked = true;
                            }
                        }
                        this.tableData = d;
                        waitUntil(
                            () => {
                                return (
                                    JSON.stringify(this.buttonPerm) != "{}" ||
                                    false
                                );
                            },
                            () => {
                                this.btnList = [];
                                if (this.myButtonPrem.indexOf("create") >= 0) {
                                    //不可创建
                                    this.btnList.push({
                                        style: {},
                                        type: "",
                                        btnClick: this.createActivity,
                                        text: "创建活动"
                                    })
                                }

                                if (this.myButtonPrem.indexOf("export") >= 0) {
                                    //不可导出
                                    this.btnList.push([
                                        {
                                            btnClick: this.isExport,
                                            text: '导出所选',
                                            value: '2',
                                            parentName: '导出'
                                        },
                                        {
                                            btnClick: this.isExport,
                                            text: '导出全部',
                                            value: '1',
                                            parentName: '导出'
                                        }
                                    ])
                                }
                            }
                        );
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
        //必须方法，获取默认显示的可选列  接口根据需要自行更换，每个模块的接口是不一致的
        getShowTitle(closeLoad) {
            crmActivity
                .getShowTitle({
                    pageIdentifier: "listCrmActivityPage",
                    voName: "com.windliven.spoc.modules.crm.vo.CrmActivityVO"
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        // console.log(res)
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
            // console.log(this.optTime)
            this.optTime = defaultDatePickerValue();
            for (let item in this.findObj) {
                this.findObj[item] = "";
            }
            this.optTime2 = []
            this.findObj.createDateStart = '';
            this.findObj.createDateEnd = '';

            this.pageNo = 1;
            this.$set(this.findObj, "belongOfficeId", this.app.currOfficeId == "all" ? "" : this.app.currOfficeId);
            this.getListData();
        },
        isExport(val) {
            //这里val的值。是根据设置下拉类型button设定的值来匹配判断
            let searchObj = {
                // pageNo: this.pageNo,
                // pageSize: this.pageSize,
                beginDate: this.optTime[0] ? this.optTime[0].format('yyyy-MM-dd 00:00:00') : "",
                endDate: this.optTime[1] ? this.optTime[1].format('yyyy-MM-dd 23:59:59') : "",
                isEnable: this.findObj.status,
                teacherId: this.findObj.hostTeacher,
                name: this.findObj.name,
                createDateStart: this.optTime2[0] ? this.optTime2[0].format('yyyy-MM-dd 00:00:00') : "",
                createDateEnd:this.optTime2[1] ? this.optTime2[1].format('yyyy-MM-dd 23:59:59') : "",
                classTeacherId: this.findObj.classTeacherId,
                classroomName: this.findObj.classroomName,
                createByName: this.findObj.createByName,
                type: this.findObj.type,
                code: this.findObj.code,
                qrCode: this.findObj.qrCode,
            };
            console.log(searchObj)
            if (val == '2') {
                //如果是导出所选，需要在这里传递所选对象、或者对象ID，这里根据需要自行处理，并作为搜索参数的一部分传递到导出组件
                if(this.selectedIds.length < 1){
                    this.$Message.error(this.$t('modules_spoc_crm_web_src_views_activityenrollment_index_779'))
                    return
                }
                searchObj.idList = this.selectedIds;
                this.modal3 = true
                crmActivity.export(searchObj)
                .then(valid.call(this))
                .then(res => {
                    if(res.ok){
                        util.blobDownload(res)
                    }
                }).finally(() => {
                    setTimeout(()=>{
                        this.modal3 = false
                    },1000)
                });
            } else {
                delete searchObj.idList;
                this.modal3 = true
                crmActivity.export(searchObj)
                .then(valid.call(this))
                .then(res => {
                    if(res.ok){
                        util.blobDownload(res)
                    }
                }).finally(() => {
                    setTimeout(()=>{
                        this.modal3 = false
                    },1000)
                });
            }
        },
    },
    watch: {
        "app.currOfficeId": function(val, oldVal) {
            if (oldVal && this.$route.name == "crm.activityEnrollment") {
               this.$set(this.findObj, "belongOfficeId", val == "all" ? "" : val);
               this.getListData();
            }
        }
    }
};
</script>
