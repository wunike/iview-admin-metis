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
    .searchCollapse {
        .ivu-input-number {
            .ivu-input-number-handler-wrap {
                opacity: 1;
            }
        }
        .borderStyle {
            display: inline-block;
            position: relative;
            &:after {
                content: '';
                display: block;
                position: absolute;
                left: 140px;
                top: 15px;
                margin: 0 1px;
                width: 10px;
                height: 2px;
                background: #e6e7eb;
            }
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
            background: #eabb06;
        }
    }
    .approval-2 {
        .approval;
        &::before {
            background: #999999;
        }
    }
    .approval-3 {
        .approval;
        &::before {
            background: #46bc15;
        }
    }
    .approval-4 {
        .approval;
        &::before {
            background: #44bcb7;
        }
    }
    .approval-5 {
        .approval;
        &::before {
            background: #f5222d;
        }
    }
    .approval-6 {
        .approval;
        &::before {
            background: #cccccc;
        }
    }
}
</style>
<template>
    <div class="refundGiveClass">
        <v-search-collapse v-if="!ctNo" @search="getListData" @reset="resetSearch" @changeDivHeight="changeDivHeight" class="searchCollapse">
            <DatePicker
                v-model="classListFind.submitTime"
                format="yyyy-MM-dd"
                type="daterange"
                separator=" ~ "
                :placeholder="$t('principalmailbox_index_490')"
                style="width:200px;"
                ref="DatePicker"
                split-panels
                :options="options"
                @on-open-change="setOptTime"
            ></DatePicker>
            <DatePicker v-model="classListFind.newTime" format="yyyy/MM/dd" type="date" :placeholder="$t('modules_spoc_sign_web_src_views_contractrefund_contractrefund_5804')" style="width:200px;"></DatePicker>
            <Select v-model="classListFind.ownOfficeIds" clearable :placeholder="$t('messagemanagement_index_352')" style="width:224px">
                <Option v-for="item in areaSchoolList" :value="item.id" :key="item.id">{{ item.code }}{{ item.name }}</Option>
            </Select>
            <input-select ref="inputstudentNameLists" :dataList="studentNameLists" :placeholder="$t('memberlist_memberlist_257')" @returnSelect="selectStudentName" idName="value"></input-select>
            <input-select ref="inputuserNameLists" :dataList="userNameLists" :placeholder="$t('modules_spoc_portal_views_workorderm_index_4442')" @returnSelect="selectUserName" idName="value"></input-select>
            <Input v-model="classListFind.className" :placeholder="$t('mycourse_mycourse_380')" />
            <Select v-model="classListFind.auditStatus" clearable :placeholder="$t('spoc_hootie_web_12')">
                <Option v-for="item in auditStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select v-model="classListFind.dutyOfficeIds" clearable :placeholder="$t('modules_spoc_sign_web_src_views_contractrefund_contractrefund_5810')">
                <Option v-for="item in areaSchoolList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
            <input-select
                ref="inputresponseTeacherLists"
                :dataList="responseTeacherLists"
                :placeholder="$t('modules_spoc_sign_web_src_views_contractrefund_contractrefund_5811')"
                @returnSelect="selectResponseTeacher"
                idName="value"
            ></input-select>
            <input-select
                ref="inputresponseCurrentPeople"
                :dataList="responseCurrentPeople"
                :placeholder="$t('modules_spoc_sign_web_src_views_contractrefund_contractrefund_5812')"
                @returnSelect="selectCurrentPeople"
                idName="value"
            ></input-select>
            <div class="borderStyle" style="width: 292px;">
                <InputNumber
                    v-model="classListFind.restHourLow"
                    :min="0"
                    style="marginRight: 12px"
                    :max="classListFind.restHourHigh ? classListFind.restHourHigh - 1 : Infinity"
                    :active-change="false"
                    :placeholder="$t('modules_spoc_sign_web_src_views_contractrefund_contractrefund_5813')"
                />
                <InputNumber
                    v-model="classListFind.restHourHigh"
                    :min="classListFind.restHourLow ? classListFind.restHourLow + 1 : -Infinity"
                    :active-change="false"
                    :placeholder="$t('modules_spoc_sign_web_src_views_contractrefund_contractrefund_5813')"
                />
            </div>
            <Input v-model="classListFind.ctNo" :placeholder="$t('modules_spoc_sign_web_src_views_approval_approvalnew_5071')" />
        </v-search-collapse>
        <big-table
            v-if="defaultShowCol"
            class="mytable"
            :tableHeightOut="tableHeightOut"
            :tableName="$t('modules_spoc_sign_web_src_views_contractrefund_contractrefund_5814')"
            :tableData="tableData"
            :tableColumnArray="tableColumnArray"
            :defaultShowCol="defaultShowCol"
            :btnList="btnList"
            :pageNo="pageNo"
            :dataTotal="dataTotal"
            :canSelection="true && !ctNo"
            :updateShowTitleMethod="updateShowTitle"
            updateShowTitleKey="contract"
            :canChangeHeight="!ctNo"
            :isShowSelectTableColumn="!ctNo"
            @resetDefault="resetDefaultCol"
            @selectionChange="selectionChange"
            @sortChange="sortChange"
            @pageChange="pageChange"
            @changeTableType="changeTableType"
        ></big-table>
        <export-modal ref="exportModal"></export-modal>
        <applyRefund ref="applyRefundRef" @uploadLists="getListDataPage1"></applyRefund>
        <studentAccont ref="studentAccont"></studentAccont>
        <tableDetails :detailsTitle="$t('modules_spoc_jw_web_src_views_approval_approvalnew_2249')" ref="tableDetails"></tableDetails>
    </div>
</template>
<script>
/***
 * 退费管理
 */
import { mapMutations, mapState } from 'vuex';
import bigTable from '@public/modules/bigTable.vue';
import exportModal from '@public/modules/exportModal.vue';
import vSearchCollapse from '@public/modules/vSearchCollapse';
import valid, { errors, sysDict, htReceipt, sysCommonSql, sysUser } from '../../libs/request';
import tableDropdown from '@public/modules/tableDropdown';
import inputSelect from '@public/modules/inputSelect';
import applyRefund from './../applyRefund/applyRefund';
import { MENUIDS } from '@public/libs/config';
import { waitUntil, DatePickerOpt, defaultDatePickerValue } from '@public/libs/util';
import studentAccont from '../studentAccont/modal.vue';
import tableDetails from '../../modules/tableDetails.vue';
export default {
    name: 'sign.contractRefund',
    props: {
        ctNo: {
            //从合同详情打开
            type: String
        },
        ctInfoSmall: {
            type: Object
        }
    },
    components: {
        bigTable,
        exportModal,
        vSearchCollapse,
        tableDropdown,
        applyRefund,
        inputSelect,
        studentAccont,
        tableDetails
    },
    data() {
        return {
            options: null,
            tableHeightOut: 72, //324,
            classListFind: {
                studentName: '',
                userName: '',
                className: '',
                auditStatus: '',
                submitTime: [],
                ownOfficeIds: '',
                dutyOfficeIds: '',
                responseTeacher: '',
                restHourLow: null,
                restHourHigh: null,
                currentPeople: '',
                newTime: '',
                ctNo: ''
            },
            studentNameLists: [],
            userNameLists: [],
            areaSchoolList: [],
            responseCurrentPeople: [],
            auditStatusList: [], //审批状态
            ht_receipt_out_kind: [], //退款方式
            selection: [],
            updateShowTitle: htReceipt.updateShowTitle,
            defaultShowCol: null,
            dataTotal: 0,
            pageNo: 1,
            pageSize: this.$store.state.app.pageSizeGlobal,
            sortObj: {},
            tableColumnArray: [
                {
                    // title: '学员姓名',
                    key: 'studentName',
                    render: (h, params) => {
                        return h(
                            'a',
                            {
                                on: {
                                    click: () => {
                                        this.$refs.studentAccont.show({
                                            officeId: params.row.officeId,
                                            studentId: params.row.studentId
                                        });
                                    }
                                }
                            },
                            params.row.studentName || '-'
                        );
                    }
                },
                {
                    // title: '退课课时',
                    key: 'refundHours',
                    sortable: 'custom',
                    render: (h, params) => {
                        return h('span', params.row.refundHours || '-');
                    }
                },
                {
                    // title: '实退金额',
                    key: 'refundAmount',
                    sortable: 'custom'
                },
                {
                    // title: '审批状态',
                    key: 'auditStatusLabel',
                    render: (h, params) => {
                        // 审批状态
                        return h(
                            'span',
                            {
                                style: {
                                    'word-break': 'break-all'
                                },
                                class: {
                                    'approval-1': params.row.auditStatus == 'uncommit', //已撤回
                                    'approval-2': params.row.auditStatus == 'unaudit', //待审批
                                    'approval-3': params.row.auditStatus == 'auditing', //审批中
                                    'approval-4': params.row.auditStatus == 'agree', //审批通过
                                    'approval-5': params.row.auditStatus == 'reject', //已驳回
                                    'approval-6': params.row.auditStatus == 'invalid' //已作废
                                    // uncommit 已撤回  #EABB06
                                    // unaudit  待审批   #999999
                                    // auditing 审批中  #46BC15
                                    // agree  审批通过  #44BCB7
                                    // reject  审批不通过  #F5222D
                                    // invalid  已作废  #CCCCCC
                                }
                            },
                            params.row.auditStatusLabel || '-'
                        );
                    }
                },
                {
                    // title: '提交时间',
                    key: 'commitDate',
                    sortable: 'custom',
                    render: (h, params) => {
                        return h('span', params.row.commitDate || '-');
                    }
                },
                {
                    // title: '最新审批时间',
                    key: 'auditDate',
                    sortable: 'custom',
                    render: (h, params) => {
                        return h('span', params.row.auditDate || '-');
                    }
                },
                {
                    // title: '合同编号',
                    key: 'ctNo',
                    render: (h, params) => {
                        return h('div', [
                            h(
                                'a',
                                {
                                    style: {
                                        color: this.ctNo ? '#000' : ''
                                    },
                                    on: {
                                        click: () => {
                                            if (!this.ctNo) {
                                                this.$router.push({
                                                    name: 'sign.pactDetails',
                                                    query: {
                                                        id: params.row.ctId,
                                                        ctNo: params.row.ctNo
                                                    }
                                                });
                                            }
                                        }
                                    }
                                },
                                params.row.ctNo || '-'
                            )
                        ]);
                    }
                },
                {
                    title: this.$t('classlist_compontents_detailinfo_45'),
                    key: 'doAction',
                    width: 40,
                    fixed: 'right',
                    render: (h, params) => {
                        if (params.row.auditStatus == 'invalid') {
                            return h('span');
                        } else {
                            return h('div', [
                                h(
                                    'a',
                                    {
                                        style: {
                                            display: this.myButtonPrem && this.myButtonPrem.indexOf('details') != -1 ? '' : 'none'
                                        },
                                        on: {
                                            click: () => {
                                                this.$refs.tableDetails.getForm(
                                                    {
                                                        id: params.row.id, // 详情
                                                        // flowId: params.row.flowId, //审批
                                                        key: 'contract receipt out'
                                                    },
                                                    1
                                                );
                                            }
                                        }
                                    },
                                    this.$t('principalmailbox_16')
                                )
                            ]);
                        }
                    }
                }
            ],
            tableData: [],
            params: {},
            searchObj: {},
            pId: null,
            responseTeacherLists: []
        };
    },
    mounted() {
        this.pId = MENUIDS.SIGN;
        this.getShowTitle();
        this.baseData();
        if (this.ctNo) {
            this.getListData();
        } else {
            this.dataScopeFilter();
        }
    },
    computed: {
        ...mapState(['app', 'buttonPerm', 'calendarConfig']),
        myButtonPrem() {
            if (this.buttonPerm && (JSON.stringify(this.buttonPerm) != "{}")) {
                return this.buttonPerm['sign.contractRefund'] || [];
            } else {
                return false;
            }
        },
        btnList() {
            if (this.ctNo) {
                return [
                    {
                        style: {},
                        type: '',
                        btnClick: this.submitApplyRefund,
                        text: this.$t('modules_spoc_sign_web_src_views_contractrefund_contractrefund_5818')
                    }
                ];
            } else {
                return [
                    {
                        style: {},
                        type: '',
                        btnClick: this.submitApplyRefund,
                        text: this.$t('modules_spoc_sign_web_src_views_contractrefund_contractrefund_5818')
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
                        }
                    ]
                ];
            }
        }
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        resetDefaultCol(){
            this.updateLoadingStatus({ isLoading: true });
            htReceipt.clearShowField({
                pageIdentifier: "contract",
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
        changeTableType(val) {
            console.log(val);
        },
        getListDataPage1(){
            this.pageNo = 1
            this.getListData()
        },
        //获取数据，根据情况修改接口、传参
        getListData() {
            // 计算参数
            this.currentPage = this.pageNo;
            let param = Object.assign(
                {
                    pageNo: this.pageNo,
                    pageSize: this.pageSize
                },
                this.params
            );
            if (this.sortObj.order != 'normal' && this.sortObj.key) {
                param.orderByType = this.sortObj.key;
                param.orderByStatus = this.sortObj.order == 'asc' ? '1' : '2';
            }
            param.commitStartDate = this.classListFind.submitTime[0] ? this.classListFind.submitTime[0].format('yyyy-MM-dd 00:00:00') : '';
            param.commitEndDate = this.classListFind.submitTime[1] ? this.classListFind.submitTime[1].format('yyyy-MM-dd 23:59:59') : '';
            param.auditStatus = this.classListFind.auditStatus;
            param.ownOfficeIds = this.classListFind.ownOfficeIds ? [this.classListFind.ownOfficeIds] : [];
            param.dutyOfficeIds = this.classListFind.dutyOfficeIds ? [this.classListFind.dutyOfficeIds] : [];
            param.auditStartDate = this.classListFind.newTime[0] ? this.classListFind.newTime[0].format('yyyy-MM-dd 00:00:00') : '';
            param.auditEndDate = this.classListFind.newTime[1] ? this.classListFind.newTime[1].format('yyyy-MM-dd 23:59:59') : '';
            param.startRefundHours = this.classListFind.restHourLow;
            param.endRefundHours = this.classListFind.restHourHigh;
            param.courseName = this.classListFind.className;
            param.ctNo = this.classListFind.ctNo;
            // console.log(param)
            this.searchObj = param; //这里需要给searchObj 赋值，导出数据的时候需要用到
            this.listPageRefund(param);
        },
        listPageRefund(param) {
            this.updateLoadingStatus({ isLoading: true });
            if (this.ctNo) {
                param.ctNo = this.ctNo;
            }
            htReceipt
                .listPageRefund(param)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let result = res.data.data;
                        this.tableData = result.list;
                        this.dataTotal = result.total;
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
            this.getListData();
        },
        //如果有排序字段则为 必须方法，修改getCourseList为自己的获取数据方法
        sortChange(obj) {
            this.sortObj = obj;
            this.getListData();
        },
        //可选方法，如果是多选的话必须有
        selectionChange(selection) {
            this.selection = selection;
        },
        //必须方法，获取默认显示的可选列  接口根据需要自行更换，每个模块的接口是不一致的
        getShowTitle(closeLoad) {
            htReceipt
                .getShowTitle({ pageIdentifier: 'contract', lang: this.$i18n.locale })
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
            for (let item in this.classListFind) {
                if (typeof this.classListFind[item] === 'string') this.classListFind[item] = '';
                if (typeof this.classListFind[item] === 'number') this.classListFind[item] = null;
            }
            for (let item in this.params) {
                if (typeof this.params[item] === 'string') {
                    this.params[item] = '';
                }
            }
            this.classListFind.submitTime = defaultDatePickerValue();
            this.classListFind.newTime = [];
            if (this.app.currOfficeId == 'all') {
                this.$set(this.classListFind, 'ownOfficeIds', '');
            } else {
                this.$set(this.classListFind, 'ownOfficeIds', this.app.currOfficeId);
            }
            this.$refs.inputstudentNameLists.reset();
            this.$refs.inputuserNameLists.reset();
            this.$refs.inputresponseTeacherLists.reset();
            this.$refs.inputresponseCurrentPeople.reset();
            delete this.params.studentIds;
            delete this.params.userIds;
            delete this.params.dutyUserIds;
            delete this.params.audtierIds;
            delete this.params.studentName;
            delete this.params.userName;
            delete this.params.dutyUserName;
            delete this.params.auditerName;
            this.searchObj = this.params; //这里需要给searchObj 赋值，导出数据的时候需要用到
            this.getListData();
        },
        submitApplyRefund() {
            if (this.ctNo) {
                this.$refs['applyRefundRef'].applyRefundRefShow(this.ctInfoSmall);
            } else {
                this.$refs['applyRefundRef'].applyRefundRefShow();
            }
        },
        isExport(val) {
            //这里val的值。是根据设置下拉类型button设定的值来匹配判断
            if (val == '2' && !this.selection.length) {
                this.$Message.error(this.$t('scoretemplate_scoretemplate_572'));
                return;
            }
            let searchObj = Object.assign({},this.searchObj)
            if (val == '2') {
                //如果是导出所选，需要在这里传递所选对象、或者对象ID，这里根据需要自行处理，并作为搜索参数的一部分传递到导出组件
                let _ids = [];
                this.selection.forEach(e => {
                    _ids.push(e.id);
                });
                searchObj = {
                    ids: _ids
                }
            } else {
                delete searchObj.pageNo
                delete searchObj.pageSize
            }
            this.$refs.exportModal.noShowExport(htReceipt.exportFileRefund, searchObj);
        },
        isCreate() {
            this.$router.push({
                name: 'jw.createClass',
                query: {}
            });
        },
        selectStudentName(obj) {
            // 学员姓名
            // console.log(obj)
            if (obj && obj.searchValue) {
                if (obj.searchType == 'name') {
                    delete this.params.studentIds;
                    this.params.studentName = obj.searchValue;
                } else {
                    delete this.params.studentName;
                    this.params.studentIds = [obj.searchValue];
                }
                let params = {
                    mainTable: 'ht_receipt',
                    mainField: 'student_id',
                    joinTable: 'com_student',
                    joinField: 'id',
                    secondField: 'name',
                    joinTableSearchParam: obj.searchValue
                };
                this.queryPageInputInitData(params, 'studentName');
            } else {
                delete this.params.studentIds;
                delete this.params.studentName;
            }
        },
        selectUserName(obj) {
            // 提交人
            if (obj && obj.searchValue) {
                if (obj.searchType == 'name') {
                    delete this.params.userIds;
                    this.params.userName = obj.searchValue;
                } else {
                    delete this.params.userName;
                    this.params.userIds = [obj.searchValue];
                }
                let params = {
                    mainTable: 'ht_receipt',
                    mainField: 'applyer',
                    joinTable: 'sys_user',
                    joinField: 'id',
                    secondField: 'name',
                    joinTableSearchParam: obj.searchValue
                };
                this.queryPageInputInitData(params, 'userName');
            } else {
                delete this.params.userIds;
                delete this.params.userName;
            }
        },
        selectResponseTeacher(obj) {
            // 责任老师
            if (obj && obj.searchValue) {
                if (obj.searchType == 'name') {
                    delete this.params.dutyUserIds;
                    this.params.dutyUserName = obj.searchValue;
                } else {
                    delete this.params.dutyUserName;
                    this.params.dutyUserIds = [obj.searchValue];
                }
                let params = {
                    mainTable: 'ht_receipt_partner',
                    mainField: 'object_id',
                    joinTable: 'sys_user',
                    joinField: 'id',
                    secondField: 'name',
                    joinTableSearchParam: obj.searchValue
                };
                this.queryPageInputInitData(params, 'selectResponse');
            } else {
                delete this.params.dutyUserIds;
                delete this.params.dutyUserName;
            }
        },
        selectCurrentPeople(obj) {
            // 当前审批人
            if (obj && obj.searchValue) {
                if (obj.searchType == 'name') {
                    delete this.params.audtierIds;
                    this.params.auditerName = obj.searchValue;
                } else {
                    delete this.params.auditerName;
                    this.params.audtierIds = [obj.searchValue];
                }
                let params = {
                    mainTable: 'ht_receipt',
                    mainField: 'auditer',
                    joinTable: 'sys_user',
                    joinField: 'id',
                    secondField: 'name',
                    joinTableSearchParam: obj.searchValue
                };
                this.queryPageInputInitData(params, 'currentPeople');
            } else {
                delete this.params.audtierIds;
                delete this.params.auditerName;
            }
        },
        queryPageInputInitData(params, key) {
            sysCommonSql
                .queryPageInputInitData(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let _data = res.data.data;
                        if (key === 'studentName') {
                            this.studentNameLists = [..._data];
                        } else if (key === 'userName') {
                            this.userNameLists = [..._data];
                        } else if (key === 'selectResponse') {
                            this.responseTeacherLists = [..._data];
                        } else if (key === 'currentPeople') {
                            this.responseCurrentPeople = [..._data];
                        }
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
        },
        baseData() {
            let types = [
                'com_audit_status', //审批状态字典
                'ht_receipt_out_kind' //退款方式字典
            ];
            sysDict
                .batchListData({
                    types: types.join(',')
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let _data = res.data.data;
                        this.auditStatusList = _data.com_audit_status;
                        this.ht_receipt_out_kind = _data.ht_receipt_out_kind;
                    }
                })
                .catch(errors.call(this));
        },
        dataScopeFilter() {
            // 获取校区列表
            sysUser
                .dataScopeFilter({
                    menuId: this.pId
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.areaSchoolList = res.data.data;
                        waitUntil(
                            () => {
                                return (this.app.currOfficeId && this.calendarConfig.maxMonthInterval) || false;
                            },
                            () => {
                                if (this.app.currOfficeId == 'all') {
                                    this.$set(this.classListFind, 'ownOfficeIds', '');
                                } else {
                                    this.$set(this.classListFind, 'ownOfficeIds', this.app.currOfficeId);
                                }
                                this.classListFind.submitTime = defaultDatePickerValue();
								this.options = DatePickerOpt(this,'DatePicker',Number(this.calendarConfig.maxMonthInterval));
                                this.getListData();
                            }
                        );
                    }
                })
                .catch(errors.call(this));
        },
        setOptTime(flag) {
            if (flag) {
                this.classListFind.submitTime = [];
            }
        }
    },
    watch: {
        'app.currOfficeId': function(val, oldVal) {
            if (oldVal && !this.ctNo && this.$route.name == 'sign.contractRefund') {
                if (this.app.currOfficeId == 'all') {
                    this.$set(this.classListFind, 'ownOfficeIds', '');
                } else {
                    this.$set(this.classListFind, 'ownOfficeIds', this.app.currOfficeId);
                }
                this.getListData();
            }
        }
    }
};
</script>
