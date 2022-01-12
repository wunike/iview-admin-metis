<style lang="less">
.approval-manage {
    .ivu-tabs-bar {
        margin-bottom: 0;
    }
    .ivu-tabs-nav {
        padding-top: 12px;
    }
    .ivu-tabs-tab {
        padding-bottom: 10px !important;
    }
    .v-search-collapse-container {
        padding-bottom: 4px;
    }
    @br: 4px; //border-radius
    .am-header {
        background: #fff;
        border-radius: @br;
    }
    .mytable {
        margin-top: 10px;
        width: 100%;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        padding: 0 16px;
        .name {
            margin-left: 0;
        }
    }
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
            background: #46bc15;
        }
    }
    .approval-3 {
        .approval;
        &::before {
            background: #44bcb7;
        }
    }
    .approval-4 {
        .approval;
        &::before {
            background: #f5222d;
        }
    }
    .approval-5 {
        .approval;
        &::before {
            background: #eabb06;
        }
    }
    .approval-6 {
        .approval;
        &::before {
            background: #cccccc;
        }
    }
    .progress {
        width: 60px;
        height: 8px;
        background: #ebecf0;
        border-radius: 24px;
        position: relative;
        overflow: hidden;
        > span {
            position: absolute;
            top: 0;
            left: 0;
            display: inline-block;
            height: 100%;
            width: 0;
            background: #44bcb7;
        }
    }
}
.cp-section {
    .flexRow {
        display: flex;
        flex-direction: row;
    }
    .cp-course {
        height: 535px;
        width: 100%;
        padding: 20px 40px 20px;
        background: #f2f3f7;
        .flexRow;
        justify-content: space-between;
        align-items: center;
        .cp-course-item {
            height: 496px;
            width: 400px;
            border-radius: 4px;
            border: 1px solid #e6e7eb;
            overflow: visible;
            position: relative;
            .combination-course-table {
                position: absolute;
                height: 275px;
                width: 548px;
                top: 100px;
                right: 32px;
                box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
                background: #fff;
                border-radius: 4px;
                z-index: 10;
                .ivu-table td,
                .ivu-table-header th {
                    height: 50px !important;
                }
            }
            .course-search {
                height: 64px;
                width: 548px;
                .flexRow;
                justify-content: flex-start;
                align-items: center;
            }
            .cp-course-item-t {
                height: 52px;
                border-radius: 4px 4px 0 0;
                .flexRow;
                justify-content: center;
                align-items: center;
                background: #f7f8fa;
                border-bottom: 1px solid #e6e7eb;
                span {
                    color: #495060;
                    font-size: 14px;
                    margin-left: 3px;
                }
            }
            .cp-course-ul {
                height: 403px;
                background: #fff;
                overflow-y: scroll;
                .cp-course-li {
                    border-bottom: 1px solid #e6e7eb;
                    .flexRow;
                    justify-content: flex-start;
                    align-items: flex-start;
                    height: 180px;
                    width: 100%;
                    &:nth-last-of-type(1) {
                        border-bottom: 0;
                    }
                }
                .checkes {
                    .flexRow;
                    justify-content: center;
                    align-items: center;
                    width: 56px;
                    height: 100%;
                }
                .ul-items {
                    width: 302px;
                    div {
                        width: 288px;
                        margin-top: 12px;
                        font-size: 14px;
                        span {
                            font-size: 14px;
                            color: #495060;
                        }
                    }
                    .ul-items-s {
                        margin-top: 10px;
                        padding-top: 6px;
                        margin-bottom: 10px;
                        border-top: 1px dashed #e6e7eb;
                    }
                }
            }
            .cp-course-item-b {
                height: 39px;
                background: #fff;
                border-radius: 0 0 4px 4px;
                padding-right: 8px;
                padding-top: 8px;
                padding-left: 15px;
                font-size: 14px;
                border-top: 1px solid #e6e7eb;
                a {
                    cursor: default;
                }
                .left {
                    float: left;
                }
                .right {
                    float: right;
                }
            }
            .new-course {
                background: #fff;
            }
            .combination-course {
                height: 64px;
                background: #fff;
                border-bottom: 1px solid #e6e7eb;
                padding: 15px 16px 0;
            }
            .new-course-box {
                height: 403px;
                overflow-y: scroll;
            }
            .new-course-item {
                padding-left: 16px;
                padding-right: 16px;
                width: 100%;
                border-bottom: 1px solid #e6e7eb;
                padding-bottom: 10px;
                .nc-1 {
                    .flexRow;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px 0;
                    b {
                        font-size: 16px;
                        font-weight: 500;
                        color: rgba(73, 80, 96, 1);
                        line-height: 22px;
                        margin-right: 6px;
                    }
                    span {
                        font-size: 12px;
                        font-weight: 400;
                        color: rgba(153, 153, 153, 1);
                        line-height: 17px;
                    }
                    a {
                        font-size: 14px;
                        font-weight: 400;
                        line-height: 20px;
                        margin-right: 16px;
                    }
                }
                .nc-2 {
                    margin-bottom: 10px;
                    span {
                        font-size: 14px;
                        color: rgba(73, 80, 96, 1);
                    }
                    b {
                        font-size: 14px;
                        font-weight: 400;
                        color: rgba(73, 80, 96, 1);
                        line-height: 20px;
                        padding: 0 5px;
                    }
                }
                .nc-3 {
                    padding-bottom: 15px;
                    border-bottom: 1px dashed #e6e7eb;
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    span {
                        font-size: 14px;
                        font-weight: 400;
                        color: rgba(73, 80, 96, 1);
                    }
                }
                .nc-4 {
                    .flexRow;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 5px;
                    span {
                        font-size: 14px;
                        font-weight: 400;
                        color: rgba(73, 80, 96, 1);
                        line-height: 20px;
                    }
                }
                .nc-5 {
                    span {
                        font-size: 14px;
                        font-weight: 400;
                        color: rgba(73, 80, 96, 1);
                        line-height: 20px;
                    }
                }
                &:nth-last-of-type(1) {
                    border-bottom: 0;
                }
            }
        }
    }
}
</style>
<template>
    <div class="approval-manage">
        <div class="am-header">
            <vSearchCollapse @search="listMyUnauditFlowCom" @reset="resetSearch" @changeDivHeight="changeDivHeight">
                <DatePicker
                    ref="DatePicker"
                    v-model="searchBox.applayTime"
                    type="daterange"
                    @on-change="submitTime"
                    @on-clear="clearTime"
                    separator=" ~ "
                    :placeholder="$t('modules_spoc_jw_web_src_views_approval_approvalnew_2244')"
                    split-panels
					:options="options"
					@on-open-change="setOptTime"
                    style="width: 224px;margin-right:12px;"
                ></DatePicker>
                <Select :placeholder="$t('courselist_courselist_225')" v-model="searchBox.selectCompus" clearable style="width:224px;margin-right:12px;">
                    <Option v-for="item in searchBox.selectCompusList" :value="item.id" :key="item.id">{{item.code}}{{item.name }}</Option>
                </Select>
                <Select
                    filterable
                    remote
                    :loading="teacherLoading"
                    @on-clear="clearStu"
                    :remote-method="stuRemote"
                    v-model="searchBox.name"
                    clearable
                    :placeholder="$t('memberlist_memberlist_257')"
                    style="width: 140px;margin-right:12px;"
                >
                    <Option v-for="item in nameList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
                <Input v-model="searchBox.contractNo" :placeholder="$t('modules_spoc_sign_web_src_views_approval_approvalnew_5071')" style="width: 140px;margin-right:12px;" />
                <Select
                    filterable
                    remote
                    :loading="assistLoading"
                    :remote-method="appRemote"
                    v-model="searchBox.applicant"
                    @on-clear="clearAppl"
                    clearable
                    :placeholder="$t('modules_spoc_jw_web_src_views_approval_approvalnew_2247')"
                    style="width: 140px;margin-right:12px;"
                >
                    <Option v-for="item in applicantList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
                <Select :placeholder="$t('spoc_hootie_web_12')" v-model="searchBox.status" clearable
                    style="width:140px;margin-right:12px;">
                    <Option v-for="item in statusList" :value="item.value"
                        :key="item.value">{{ item.label }}</Option>
                </Select>
                <Select :placeholder="$t('modules_spoc_jw_web_src_views_approval_approvalnew_2248')" v-model="searchBox.bussType" clearable style="width:140px;margin-right:12px;">
                    <Option v-for="item in searchBox.bussTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </vSearchCollapse>
        </div>
        <big-table
            v-if="defaultShowCol"
            class="mytable"
            :tableData="dataT"
            :tableHeightOut="tableHeightOut"
            :tableColumnArray="columnsT"
            :defaultShowCol="defaultShowCol"
            :btnList="btnList"
            :canSelection="true"
            :pageNo="pageNo"
            :updateShowTitleKey="updateShowTitleKey"
            :updateShowTitleMethod="updateShowTitle"
            :dataTotal="pageCounts"
            :maxFlagForFixed="12"
            :isShowSelectTableColumn="true"
            @resetDefault="resetDefaultCol"
            @selectionChange="selectTableItem"
            @pageChange="pageChange"
        >
            <div slot="tableNameSlot">{{ tableTitle }}</div>
        </big-table>
        <tableDetails @getFaList="listMyUnauditFlowCom" :detailsTitle="$t('modules_spoc_jw_web_src_views_approval_approvalnew_2249')" ref="tableDetails"></tableDetails>
    </div>
</template>
<script>
import vSearchCollapse from '@public/modules/vSearchCollapse';
import bigTable from '@public/modules/bigTable.vue';
import tableDetails from '../../modules/tableDetails.vue';
import valid, { errors, sysUser, comAuditFlow, sysDict, sysCommonSql, common } from '../../libs/request';
import { mapMutations, mapState } from 'vuex';
import { waitUntil, DatePickerOpt, defaultDatePickerValue } from "@public/libs/util";

export default {
    name: 'sign.approvalManagement',
    data() {
        return {
			options: null,
            tableHeightOut: 68 + 50, //324,
            waitApproval: 0, //待审批数
            nameList: [],
            applicantList: [],
            searchBox: {
                name: '',
                contractNo: '',
                selectCompus: '',
                bussType: '',
                bussTypeList: [],
                applicant: '',
                selectCompusList: [],
                applayTime: [],
                status: ''
            },
            tableTitle: this.$t('sign.approvalManagement'),
            ncList: [
                //新报课程列表
            ],
            cpList: [],
            updateShowTitleKey:'ComAuditFlowListVO',
            updateShowTitle: comAuditFlow.updateShowTitle,
            defaultShowCol: null,
            exportMethod: null,
            pageNo: 1,
            pageCounts: 0, //总数
            pageSize: this.$store.state.app.pageSizeGlobal,
            btnList: [],
            dataT: [],
            columnsT: [
                {
                    // title: '学员姓名',
                    key: 'studentName',
                    fixed: 'left',
                    tooltip: true,
                    render: (h, params) => {
                        return h(
                            'a',
                            {
                                style: {},
                                on: {
                                    click: () => {
                                        //                                        alert('ok')
                                    }
                                }
                            },
                            params.row.studentName ? params.row.studentName : '-'
                        );
                    }
                },
                {
                    // title: '业务类型',
                    key: 'type',
                    fixed: 'left',
                    render: (h, params) => {
                        return h('span', params.row.typeName);
                    }
                },
                {
                    // title: '审批状态',
                    key: 'nodeStatusName',
                    render: (h, params) => {
                        return h(
                            'span',
                            {
                                class:
                                    params.row.status === 'unaudit'
                                        ? 'approval-1'
                                        : params.row.status === 'auditing'
                                        ? 'approval-2'
                                        : params.row.status === 'agree'
                                        ? 'approval-3'
                                        : params.row.status === 'reject'
                                        ? 'approval-4'
                                        : params.row.status === 'uncommit'
                                        ? 'approval-5'
                                        : params.row.status === 'invalid'
                                        ? 'approval-6'
                                        : ''
                            },
                            params.row.statusName
                        );
                    }
                },

                {
                    // title: '合同编号',
                    key: 'objectNo',
                    fixed: 'left',
                    tooltip: true,
                    render: (h, params) => {
                        return h(
                            'a',
                            {
                                style: {
                                    'word-break': 'break-all',
                                    color: !params.row.objectNo ? '#515A6E' : '' //合同详情页打开的。颜色修改
                                },
                                on: {
                                    click: () => {
                                        if (params.row.objectNo) {
                                            //合同详情页打开的。不执行跳转
                                            this.$router.push({
                                                name: 'sign.pactDetails',
                                                query: {
                                                    id: '', //params.row.objectId, 这里拿到的ID不是合同ID，所以不传递，使用ctNo来查询
                                                    ctNo: params.row.objectNo
                                                }
                                            });
                                        }
                                    }
                                }
                            },
                            params.row.objectNo ? params.row.objectNo : '-'
                        );
                    }
                },
                {
                    // title: '当前审批角色',
                    key: 'curRoleName',
                    tooltip: true,
                    render: (h, params) => {
                        return h('div', {}, [
                            h(
                                'span',
                                {
                                    style: {
                                        display: params.row.flowLevel == null ? 'none' : 'block'
                                    }
                                },
                                params.row.curRoleName
                            ),
                            h(
                                'span',
                                {
                                    style: {
                                        display: !params.row.curRoleName ? 'block' : 'none'
                                    }
                                },
                                '-'
                            )
                        ]);
                    }
                },
                {
                    // title: '审批进度',
                    key: 'auditProgress',
                    minWidth: 120,
                    tooltip: true,
                    render: (h, params) => {
                        return h(
                            'div',
                            {
                                style: {
                                    display: 'flex',
                                    'flex-direction': 'row',
                                    'justify-content': 'flex-start',
                                    'align-items': 'center'
                                }
                            },
                            [
                                h(
                                    'div',
                                    {
                                        class: 'progress',
                                        style: {
                                            display: params.row.status == 'invalid' ? 'none' : 'block'
                                            // display: params.row.flowLevel == null || params.row.status == 'invalid' ||(parseInt(parseInt(params.row.curNodeOrder)+1) == parseInt(parseInt(params.row.flowLevel)+1)) ? 'none' : 'block'
                                        }
                                    },
                                    [
                                        h('span', {
                                            style: {
                                                width: params.row.flowLevel ? 
                                                (this.tabValue == 'C'
                                                    ? (60 * parseInt(parseInt(params.row.curNodeOrder)+1)) / parseInt(parseInt(params.row.flowLevel)+1) + 'px'
                                                    : (params.row.status == 'reject' || params.row.status == 'uncommit')
                                                        ? '' :(60 * parseInt(parseInt(params.row.curNodeOrder)+1)) / parseInt(parseInt(params.row.flowLevel)+1) + 'px') : '60px'
                                            }
                                        })
                                    ]
                                ),
                                h(
                                    'span',
                                    {
                                        style: {
                                            'margin-left': '4px',
                                            display: params.row.flowLevel == null || params.row.status == 'invalid'||
                                            (parseInt(parseInt(params.row.curNodeOrder)+1) == parseInt(parseInt(params.row.flowLevel)+1))? 'none' : 'block'
                                        }
                                    },
                                    (this.tabValue == 'C'
                                        ?parseInt(parseInt(params.row.curNodeOrder)+1)
                                        :(params.row.status == 'reject' || params.row.status == 'uncommit')
                                        ? params.row.curNodeOrder
                                        :parseInt(parseInt(params.row.curNodeOrder)+1))
                                        +
                                        '/' + parseInt(parseInt(params.row.flowLevel)+1)
                                ),
                                h(
                                    'span',
                                    {
                                        style: {
                                            display: params.row.flowLevel == null || (parseInt(parseInt(params.row.curNodeOrder)+1) == parseInt(parseInt(params.row.flowLevel)+1)) ? 'block' : 'none',
                                            'margin-left': '4px'
                                        }
                                    },
                                    params.row.flowLevel ? ((parseInt(params.row.curNodeOrder)+1) + '/' + (parseInt(params.row.flowLevel)+1)) : '1/1'
                                    // '已完成'
                                ),
                                h(
                                    'span',
                                    {
                                        style: {
                                            display: params.row.flowLevel !== null && params.row.status == 'invalid'? 'block' : 'none',
                                            'margin-left': '4px'
                                        }
                                    },
                                    '-'
                                )
                            ]
                        );
                    }
                },

                {
                    title: this.$t('classlist_compontents_detailinfo_45'),
                    key: 'doAction',
                    fixed: 'right',
                    width: 70,
                    render: (h, params) => {
                        return h('div', [
                            h(
                                'a',
                                {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    style: {},
                                    on: {
                                        click: () => {
                                            // console.log(params.row)
                                            this.$refs.tableDetails.showPop({
                                                flowId: params.row.id,
                                                id: params.row.objectId,
                                                key: params.row.type,
                                                tab: this.tabValue,
                                                status: params.row.status
                                            });
                                        }
                                    }
                                },
                                this.$t('principalmailbox_16')
                            )
                        ]);
                    }
                }
            ],
            startTime: '',
            endTime: '',
            params: {},
            statusList: [
                // {
                //     value: 'unaudit',
                //     label: '待审批'
                // },
                // {
                //     value: 'auditing',
                //     label: '审批中'
                // },
                // {
                //     value: 'agree',
                //     label: '审批通过'
                // },
                // {
                //     value: 'reject',
                //     label: '审批不通过'
                // },
                // {
                //     value: 'unaudit',
                //     label: '已撤回'
                // },
                // {
                //     value: 'unaudit',
                //     label: '已作废'
                // }
            ]
        };
    },
    computed: {
        ...mapState(['userInfo', 'app', "calendarConfig"])
    },
    components: {
        vSearchCollapse,
        bigTable,
        tableDetails
    },
    created() {},
    mounted() {
        this.getBuss();
        this.getShowTitle();
        this.getCompassFn();
        // this.addActive('A')
//        this.initFromWorkbench();
    },

    methods: {
        ...mapMutations(['updateLoadingStatus']),
        resetDefaultCol(){
            this.updateLoadingStatus({ isLoading: true });
            comAuditFlow.clearShowField({
                pageIdentifier: "ComAuditFlowListVO",
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
            this.tableHeightOut = height + 50;
        },
//        initFromWorkbench() {
//            if(this.$route.query.modalType && this.$route.query.modalType == 'myUnaudit') {
//                // 工作台任务 待审批合同
//                let params = {
//                    flowId: this.$route.query.flowId,
//                    id: this.$route.query.objectId,
//                    key: this.$route.query.auditType,
//                    tab: this.tabValue,
//                }
//                this.$refs.tableDetails.showPop(params);
//            }
//        },
        listMyUnauditFlowCom() {
            //common
            this.updateLoadingStatus({ isLoading: true });
            this.params = {
                applyerId: this.searchBox.applicant,
                auditor: '',
                endApplyTime: this.endTime,
                menuId: '5001',
                objectNo: this.searchBox.contractNo,
                officeId: this.searchBox.selectCompus == 'all' ? '' : this.searchBox.selectCompus,
                officeType: '',
                startApplyTime: this.startTime,
                studentId: this.searchBox.name,
                type: this.searchBox.bussType,
                userId: '',
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                status: this.searchBox.status
            };
            let fn = comAuditFlow.listPage(this.params);
            fn.then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.dataT = res.data.data.list;
                        this.pageCounts = res.data.data.total;
                        let ids = this.searchBox.selectCompusList.map(item => {
                            return item.id;
                        });
                        if (res.data.data.selfOffices && res.data.data.selfOffices.length) {
                            res.data.data.selfOffices.forEach(item => {
                                if (ids.indexOf(item.id) < 0) {
                                    this.searchBox.selectCompusList.push(item);
                                }
                            });
                        }
                        this.searchBox.selectCompusList.sort(function(a, b) {
                            return a.sort - b.sort;
                        });
                    }
                })
                .then(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
//        searchInfo() {
//            this.listMyUnauditFlowCom();
//        },
        clearTime() {
            this.startTime = '';
            this.endTime = '';
        },
        submitTime(val) {
            this.startTime = this.searchBox.applayTime[0] ? this.searchBox.applayTime[0].format('yyyy-MM-dd 00:00:00') : '';
            this.endTime = this.searchBox.applayTime[1] ? this.searchBox.applayTime[1].format('yyyy-MM-dd 23:59:59') : '';
        },
        getBuss() {
            let types = [
                'com_audit_flow_type', 
                'com_audit_status'
            ]
            sysDict
                .batchListData({types: types.join(',')})
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let _data = res.data.data;
                        let arr = _data.com_audit_flow_type;
                        this.searchBox.bussTypeList = arr.filter(item => {
                            return item.menuId == '5001';
                        });
                        this.statusList = _data.com_audit_status;
                    }
                })
                .then(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        clearAppl() {
            this.applicantList = [];
        },
        clearStu() {
            this.nameList = [];
        },
        stuRemote(query) {
            this.getSearchList('student_id', query);
        },
        appRemote(query) {
            this.getSearchList('applyer_id', query);
        },
        getSearchList(userType, query) {
            if (query !== '') {
                let obj = {
                    mainTable: 'com_audit_flow',
                    mainField: userType,
                    joinField: 'id',
                    joinTable: 'sys_user',
                    secondField: 'name',
                    joinTableSearchParam: query
                };
                if (userType == 'student_id') {
                    this.teacherLoading = true;
                    obj.joinTable = 'com_student';
                } else if (userType == 'applyer_id') {
                    this.assistLoading = true;
                    obj.joinTable = 'sys_user';
                }
                sysCommonSql
                    .queryPageInputInitData(obj)
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            //                            console.log(res)
                            if (userType == 'student_id') {
                                this.teacherLoading = false;
                                this.nameList = res.data.data;
                            } else if (userType == 'applyer_id') {
                                this.assistLoading = false;
                                this.applicantList = res.data.data;
                            }
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {
                        // this.updateLoadingStatus({ isLoading: false });
                    });
            }
        },
        getCompassFn() {
            sysUser
                .dataScopeFilter()
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let data = res.data.data;
                        this.searchBox.selectCompusList = data;
                        // console.log(data)
                        waitUntil(
                            () => {
                                // console.log("this.app.currOfficeId ==" + this.app.currOfficeId)
                                return (this.app.currOfficeId && this.calendarConfig.maxMonthInterval) || false;
                            },
                            () => {
                                if (this.app.currOfficeId == 'all') {
                                    this.$set(this.searchBox, 'selectCompus', '');
                                } else {
                                    this.$set(this.searchBox, 'selectCompus', this.app.currOfficeId);
                                }
								this.searchBox.applayTime= defaultDatePickerValue()
								this.options = DatePickerOpt(this,'DatePicker',Number(this.calendarConfig.maxMonthInterval))
                                this.submitTime()
                                this.listMyUnauditFlowCom();
                            }
                        );
                    }
                })
                .catch(errors.call(this));
        },
        resetSearch() {
            for (let item in this.searchBox) {
                if (typeof this.searchBox[item] === 'string') {
                    this.searchBox[item] = '';
                }
            }
            this.startTime = '';
            this.endTime = '';
            this.searchBox.applayTime = defaultDatePickerValue();
                if (this.app.currOfficeId == 'all') {
                    this.$set(this.searchBox, 'selectCompus', '');
                } else {
                    this.$set(this.searchBox, 'selectCompus', this.app.currOfficeId);
                }
            this.submitTime()
            this.listMyUnauditFlowCom();
        },
        getShowTitle(closeLoad) {
            // this.defaultShowCol = this.cols;
            comAuditFlow.getShowTitle({
                pageIdentifier: 'ComAuditFlowListVO',
                voName: 'com.windliven.spoc.modules.common.vo.ComAuditFlowListVO',
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
        //改变页码
        pageChange(page, pageSize) {
            this.pageNo = page;
            this.pageSize = pageSize;
            this.listMyUnauditFlowCom();
        },
		setOptTime(flag){
		    if(flag){
		        this.searchBox.applayTime=[];
		        this.submitTime()
		    }
		},
    },
    watch: {
        'app.currOfficeId': function(val, oldVal) {
            if (oldVal && this.$route.name == 'sign.approval') {
                if (this.app.currOfficeId == 'all') {
                    this.$set(this.searchBox, 'selectCompus', '');
                } else {
                    this.$set(this.searchBox, 'selectCompus', this.app.currOfficeId);
                }
                this.listMyUnauditFlowCom();
            }
        },
//        '$route.query': function(val, oldVal) {
//            this.initFromWorkbench();
//        }
    }
};
</script>
