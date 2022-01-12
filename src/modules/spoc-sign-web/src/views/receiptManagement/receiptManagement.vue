<style lang="less">
.receipt-management-container {
    .mytable {
        margin-top: 10px;
        width: 100%;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        padding: 0 16px;
        .ivu-table-cell {
            overflow: unset !important;
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
            background: #06a59b;
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
            background: #ff3000;
        }
    }
}
.upload-proof {
    .ivu-modal-footer .ivu-btn-text {
        border: 1px solid rgb(220, 222, 226);
    }
    .ivu-modal-footer .ivu-btn-text:hover {
        border: 1px solid rgb(220, 222, 226);
    }

    .ivu-modal-header {
        padding: 17px 24px 16px !important;
        background: #f7f8fa;
        border-radius: 4px;
        .ivu-modal-header-inner {
            font-size: 18px;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.85);
        }
    }
    .ivu-input {
        font-size: 14px !important;
    }
    .ivu-modal-body {
        padding: 24px 24px 14px 24px !important;
    }
    .ivu-modal-footer {
        padding: 10px 24px !important;
    }
    .box-item {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        margin-bottom: 20px;
        padding-left: 10px;
        > em {
            color: #ff3000;
            font-size: 14px;
            margin-top: 4px;
            padding-right: 4px;
        }
        > span {
            margin-right: 10px;
            color: #999999;
            font-size: 14px;
            line-height: 30px;
        }
    }
    .center-right {
        width: 300px;
    }
}
</style>

<template>
    <div class="receipt-management-container">
        <v-search-collapse v-show="!ctNo" @search="getListData" @reset="resetSearch" @changeDivHeight="changeDivHeight">
            <DatePicker
                v-model="searchBox.receiptDate"
                type="daterange"
                separator=" ~ "
                :placeholder="$t('modules_spoc_report_web_src_views_salesreportbystudent_salesreportbystudent_4698')"
                style="width: 204px;"
                ref="DatePicker"
                split-panels
                :options="options"
                @on-open-change="setOptTime"
            ></DatePicker>
            <DatePicker
                v-model="searchBox.financialCollectionDate"
                type="daterange"
                separator=" ~ "
                :placeholder="$t('modules_spoc_sign_web_src_views_receiptmanagement_receiptmanagement_7070')"
                style="width: 204px;"
                ref="DatePicker1"
                split-panels
                :options="options1"
                @on-open-change="setOptTime1"
            ></DatePicker>
            <DatePicker
                v-model="searchBox.financialArrivalDate"
                type="daterange"
                separator=" ~ "
                :placeholder="$t('modules_spoc_sign_web_src_views_receiptmanagement_receiptmanagement_7071')"
                style="width: 204px;"
                ref="DatePicker2"
                split-panels
                :options="options2"
                @on-open-change="setOptTime2"
            ></DatePicker>
            <Select :placeholder="$t('modules_spoc_sign_web_src_views_receiptmanagement_receiptmanagement_7072')" v-model="params.receiptOfficeIds" multiple style="width:224px;">
                <Option v-for="item in areaSchoolList" :value="item.id" :key="item.id">{{ item.code }}{{ item.name }}</Option>
            </Select>
            <input-select ref="inputstudentName" :dataList="studentNameLists" :placeholder="$t('memberlist_memberlist_257')" @returnSelect="selectStudentName" idName="value"></input-select>
            <input-select ref="inputUser" :dataList="userLists" :placeholder="$t('modules_spoc_sign_web_src_views_receiptmanagement_receiptmanagement_7074')" @returnSelect="selectUser" idName="value"></input-select>
            <Select :placeholder="$t('modules_spoc_sign_web_src_views_receiptmanagement_receiptmanagement_7075')" v-model="params.kind" clearable>
                <Option v-for="item in ht_receipt_detail_type" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select :placeholder="$t('modules_spoc_jw_web_src_views_approval_approvalnew_2248')" v-model="params.businessType" clearable>
                <Option v-for="item in ht_receipt_business_type" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="params.ctNo" :placeholder="$t('modules_spoc_sign_web_src_views_approval_approvalnew_5071')" />
            <!-- <DatePicker v-model="searchBox.reportingTime" type="daterange" separator=" ~ " :placeholder="$t('modules_spoc_sign_web_src_views_receiptmanagement_receiptmanagement_7078')" style="width: 224px;"></DatePicker> -->
            <Select :placeholder="$t('spoc_hootie_web_12')" v-model="params.status" clearable>
                <Option v-for="item in auditStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="params.no" :placeholder="$t('modules_spoc_sign_web_src_views_receiptmanagement_receiptmanagement_7080')" />
            <Select :placeholder="$t('modules_spoc_sign_web_src_views_receiptmanagement_receiptmanagement_7081')" v-model="params.certFlag" clearable>
                <Option v-for="item in certFlagLists" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </v-search-collapse>
        <big-table
            v-if="defaultShowCol"
            class="mytable"
            :tableData="dataT"
            :tableColumnArray="columnsT"
            :defaultShowCol="defaultShowCol"
            :tableHeightOut="tableHeightOut"
            updateShowTitleKey="htReceipt.receipt"
            :btnList="btnList"
            :canSelection="true && !ctNo"
            :isShowSelectTableColumn="!ctNo"
            :updateShowTitleMethod="updateShowTitle"
            :dataTotal="pageCounts"
            :maxFlagForFixed="11"
            :canChangeHeight="!ctNo"
            @resetDefault="resetDefaultCol"
            @selectionChange="selectTableItem"
            @pageChange="pageChange"
        >
            <div slot="tableNameSlot" style="color:#495060;font-size:12px;font-weight: 500">{{$t('modules_spoc_portal_views_selfcentred_feedback_3879')}}<span style="color:#44BCB7;font-size:16px;">{{ pageCounts }}</span>{{$t('modules_spoc_sign_web_src_views_receiptmanagement_receiptmanagement_7083')}}<span style="color:#F5222D;font-size:16px;">{{ formatNums(money) }}</span>{{$t('modules_spoc_crm_web_src_views_performanceplan_modal_1482')}}</div>
        </big-table>
        <add-new-payment ref="addNewPayment" @uploadLists="getListDataPage1"></add-new-payment>
        <performance-allocation ref="performanceAllocation" @goBack="goBack"></performance-allocation>
        <view-the-payment-slip ref="viewThePaymentSlip" @closePop="closePop"></view-the-payment-slip>
        <export-modal ref="exportModal"></export-modal>
        <upload-file ref="uploadFile" @uploadLists="getListData"></upload-file>
        <Modal class="upload-proof" width="450" v-model="sureReceived" :mask-closable="false" :title="idReceived ? $t('modules_spoc_sign_web_src_views_receiptmanagement_receiptmanagement_7085') : $t('modules_spoc_sign_web_src_views_receiptmanagement_receiptmanagement_70851')">
            <div class="box-item" style="margin-bottom:0;" v-if="idReceived">
                <em>*</em>
                <span>{{$t('modules_spoc_sign_web_src_views_receiptmanagement_receiptmanagement_7086')}}</span>
                <DatePicker v-model="dateArrived" type="date" :placeholder="$t('mycourse_mycourse_360')" style="width: 260px"></DatePicker>
            </div>
            <div class="box-item" style="margin-bottom:0;" v-else>
                <em>*</em>
                <span>{{$t('modules_spoc_jw_web_src_views_approval_jwapprovaldetial_2267')}}</span>
                <Input v-model="auditReason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" style="width: 300px" :placeholder="$t('scoretemplate_compontents_scoremodify_528')" />
            </div>
            <div slot="footer">
                <Button @click="cancelSureReceived">{{$t('classroom_allscore_53')}}</Button>
                <Button type="primary" @click="submitSureReceived">{{$t('courselist_compontents_servicecontent_214')}}</Button>
            </div>
        </Modal>
        <studentAccont ref="studentAccont"></studentAccont>
        <view-g-x :myStuTalks="myStuTalks" ref="viewGXRef"></view-g-x>
        <Modal
            v-model="deleteModal"
            :title="$t('classlist_classlist_12')"
            :okText="$t('views_coursepack_bigtableexample_345')"
            :cancelText="$t('modules_spoc_sign_web_src_views_receiptmanagement_receiptmanagement_7092')"
            width="400"
            @on-ok="deleteReceiptById">
            <p>{{$t('modules_spoc_sign_web_src_views_receiptmanagement_receiptmanagement_7093')}}</p>
        </Modal>
    </div>
</template>

<script>
/***
 * 收款管理
 */
import { mapMutations, mapState } from 'vuex';
import popTipComp from '@public/modules/tableDropdown.vue';
import vSearchCollapse from '@public/modules/vSearchCollapse';
import bigTable from '@public/modules/bigTable.vue';
import exportModal from '@public/modules/exportModal.vue';
import addNewPayment from './components/addNewPayment.vue';
import performanceAllocation from './components/performanceAllocation.vue';
import viewThePaymentSlip from './components/viewThePaymentSlip.vue';
import uploadFile from './components/uploadFile.vue';
import inputSelect from '@public/modules/inputSelect';
import valid, { errors, sysDict, htReceipt, sysUser, sysCommonSql, api } from '../../libs/request';
import util from '@public/libs/js/util';
import { waitUntil, DatePickerOpt, defaultDatePickerValue } from '@public/libs/util';
import studentAccont from '../studentAccont/modal.vue';
import viewGX from '../../modules/viewGX.vue';
export default {
    name: 'sign.receiptManagement',
    props:{
        ctNo: {
            type: String
        }
    },
    data() {
        return {
            idReceived: true,
            auditReason: '',
            options: null,
            options1: null,
            options2: null,
            tableHeightOut: 72, //324,
            dateArrived: '', // 到账日期
            receiptAuditId: '',
            sureReceived: false, //确认收到
            updateShowTitle: htReceipt.updateShowTitle,
            money: '',
            searchBox: {
                receiptDate: [], //收款日期
                financialCollectionDate: [], //财务收款日期
                financialArrivalDate: [], //财务到账日期
                reportingTime: [] //报账时间
            },
            studentNameLists: [],
            userLists: [],
            defaultShowCol: null,
            pageNo: 1,
            pageCounts: 0, //总数
            pageSize: this.$store.state.app.pageSizeGlobal,
            params: {
                status: '',
                certFlag: '',
                no: '',
                kind: '',
                businessType: '',
                ctNo: '',
                receiptOfficeIds: []
            },
            searchObj: {},
            ht_receipt_detail_type: [],
            ht_receipt_business_type: [],
            areaSchoolList: [],
            certFlagLists: [{ value: '0', label: this.$t('memberlist_19') }, { value: '1', label: this.$t('memberlist_18') }],
            dataT: [],
            seleteItem: [],
            myStuTalks: [],
            deleteModal: false,
            columnsT: [
                {
                    // title: '学员姓名',
                    key: 'studentName',
                    render: (h, params) => {
                        return h(
                            'a',
                            {
                                on: {
                                    click: () => {
                                        // console.log(params.row.officeId)
                                        // console.log(params.row.studentId)
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
                    key: 'status',
                    render: (h, params) => {
                        // 审批状态
                        let str = '-';
                        // console.log(params.row.status)
                        if (params.row.status == 0) str = this.$t('mycourse_mycourse_386');
                        if (params.row.status == 1) str = this.$t('spoc_hootie_web_19');
                        if (params.row.status == 2) str = this.$t('spoc_hootie_web_20');
                        return h(
                            'span',
                            {
                                style: {
                                    'word-break': 'break-all'
                                },
                                class: {
                                    'approval-1': params.row.status == 0,
                                    'approval-2': params.row.status == 1,
                                    'approval-3': params.row.status == 2
                                }
                            },
                            str
                        );
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
                                        color: this.ctNo ? "#000" : ""
                                    },
                                    on: {
                                        click: () => {
                                            if(params.row.ctNo && !this.ctNo) {
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
                    key: 'filePaths',
                    render: (h, params) => {
                        let dom = [];
                        if (params.row.filePaths) {
                            let arr = params.row.filePaths.split(',');
                            arr.forEach(img => {
                                dom.push(
                                    h('img', {
                                        domProps: {
                                            src: img
                                        },
                                        style: {
                                            height: '20px',
                                            width: '20px',
                                            cursor: 'pointer'
                                        },
                                        on: {
                                            click: () => {
                                                // console.log(arr)
                                                let _arr = [];
                                                arr.forEach(e => {
                                                    _arr.push({
                                                        url: e,
                                                        fileName: e.split('/').pop()
                                                    });
                                                });
                                                this.myStuTalks = _arr;
                                                this.$refs.viewGXRef.showViewGX = true;
                                            }
                                        }
                                    })
                                );
                            });
                        } else {
                            dom.push(
                                h(
                                    'span',
                                    {
                                        style: {
                                            color: '#E72B00',
                                            display: params.row.q10 ? 'none' : 'block'
                                        }
                                    },
                                    this.$t('memberlist_19')
                                )
                            );
                        }
                        return h('div', dom);
                    }
                },
                {
                    title: this.$t('classlist_compontents_detailinfo_45'),
                    key: 'doAction',
                    width: 126,
                    render: (h, params) => {
                        let arr = [];
                        if (params.row.status == 2) {
                            if(this.myButtonPrem && this.myButtonPrem.indexOf('edit') != -1){
                                arr.push({ label: this.$t('modules_expandrow_15'), key: 'reWrite' });
                            }
                        }
                        arr = [...arr];
                        if(params.row.filePaths && this.myButtonPrem && this.myButtonPrem.indexOf('download') != -1){
                            arr.push({ label: this.$t('modules_spoc_sign_web_src_views_receiptmanagement_receiptmanagement_7101'), key: 'download' })
                        }
                        if(this.myButtonPrem && this.myButtonPrem.indexOf('upload') != -1){
                            arr.push({ label: this.$t('modules_spoc_sign_web_src_views_receiptmanagement_receiptmanagement_7102'), key: 'upload' })
                        }
                        if(params.row.ctId) {
                            // 业绩分配
                            arr.push({ label: this.$t('sign.performanceAllocation'), key: 'grade' });
                        }
                        if(this.myButtonPrem && 
                           this.myButtonPrem.indexOf('delete') != -1 && 
                           (params.row.status == 0 || params.row.status == 2)) arr.push({ label: this.$t('classlist_compontents_detailinfo_46'), key: 'delete' });
                        return h('div', [
                            h(
                                'a',
                                {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '6px',
                                        // bug 277
                                        display: this.myButtonPrem && this.myButtonPrem.indexOf('details') != -1 && params.row.ctId ? '' : 'none'
                                    },
                                    on: {
                                        click: () => {
                                            this.$refs.viewThePaymentSlip && this.$refs.viewThePaymentSlip.showPop(params.row.id);
                                        }
                                    }
                                },
                                this.$t('principalmailbox_16')
                            ),
                            this.myButtonPrem && this.myButtonPrem.indexOf('audit') > -1 ? h(popTipComp, {
                                props: {
                                    actionName: this.$t('spoc_hootie_web_21'),
                                    buttonList: [{ label: this.$t('modules_spoc_sign_web_src_views_receiptmanagement_receiptmanagement_7085'), key: 'Received' }, { label: this.$t('modules_spoc_sign_web_src_views_receiptmanagement_receiptmanagement_7107'), key: 'notReceived' }]
                                },
                                style: {
                                    marginRight: '2px'
                                },
                                on: {
                                    dropFn: key => {
                                        this.approval({ key: key, row: params.row });
                                    }
                                }
                            }) : '',
                            h(popTipComp, {
                                props: {
                                    actionName: this.$t('views_room_selectcomp_629'),
                                    buttonList: arr
                                },
                                on: {
                                    dropFn: key => {
                                        this.itemForm({ key: key, row: params.row });
                                    }
                                }
                            })
                        ]);
                    }
                }
            ],
            auditStatusList: [
                {
                    value: '0',
                    label: this.$t('mycourse_mycourse_386')
                },
                {
                    value: '1',
                    label: this.$t('spoc_hootie_web_19')
                },
                {
                    value: '2',
                    label: this.$t('spoc_hootie_web_20')
                }
            ]
        };
    },
    computed: {
        ...mapState(['app', 'buttonPerm', "calendarConfig"]),
        myButtonPrem() {
            if (this.buttonPerm && (JSON.stringify(this.buttonPerm) != "{}")) {
                return this.buttonPerm['sign.receiptManagement'] || [];
            } else {
                return false;
            }
        },
        btnList() {
            return [
                {
                    style: {},
                    type: '',
                    btnClick: this.addPay,
                    text: this.$t('modules_spoc_sign_web_src_views_receiptmanagement_components_addnewpayment_6984')
                },
                [
                    {
                        hidden: (!this.ctNo) && this.myButtonPrem && this.myButtonPrem.indexOf('export') != -1 ? false : true,
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
    },
    components: {
        popTipComp,
        vSearchCollapse,
        bigTable,
        exportModal,
        addNewPayment,
        performanceAllocation,
        viewThePaymentSlip,
        inputSelect,
        uploadFile,
        studentAccont,
        viewGX
    },
    mounted() {
        if(this.ctNo){
            this.params.ctNo = this.ctNo
        }
        this.getShowTitle();
        this.baseData();
        this.dataScopeFilter();
        let params = {
            mainTable: 'ht_receipt',
            mainField: 'recepitor',
            joinTable: 'sys_user',
            joinField: 'id',
            secondField: 'name',
            joinTableSearchParam: ''
        };
        this.queryPageInputInitData(params, 'user');
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        resetDefaultCol(){
            this.updateLoadingStatus({ isLoading: true });
            htReceipt.clearShowField({
                pageIdentifier: "htReceipt.receipt",
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
        initFromWorkbench() {
            if(this.$route.query.modalType && this.$route.query.modalType == 'createReceipt') {
                // 工作台任务中心点击 待收款
                this.$refs.addNewPayment.showPopFromWorkbench(this.$route.query.stuName, this.$route.query.stuId, this.$route.query.ctId);
            }
            if(this.$route.query.modalType && this.$route.query.modalType == 'uploadFile') {
                // 工作台任务中心点击 待上传收款凭证
                // console.log(this.$route.query.receiptId)
                let _receiptId = this.$route.query.receiptId;
                waitUntil(
                    () => {
                        return (this.dataT && this.dataT.length) || false;
                    },
                    () => {
                        let _returnItem = null;
                        let filterData = this.dataT.filter(function(item){
                            return item.id == _receiptId; 
                        });
                        if(filterData && filterData.length) _returnItem = filterData[0];
                        if(_returnItem) {
                            console.log(_returnItem)
                            this.$refs.uploadFile.show(_returnItem);
                        }
                    }
                );
            }

            if(this.$route.query.ctNo){
                this.resetSearch(true)
                this.$set(this.searchBox, 'receiptDate', []);
                this.$set(this.params, 'receiptOfficeIds', []);
                this.$set(this.params, 'ctNo', this.$route.query.ctNo);
                this.getListData();
            }
        },
        changeDivHeight(height) {
            this.tableHeightOut = height;
        },
        //取消确认收到 / 未收到
        cancelSureReceived() {
            this.dateArrived = '';
            this.auditReason = '';
            this.sureReceived = false;
        },
        //确认收到 / 未收到
        submitSureReceived() {
            if(this.idReceived) {
                // 确认收到
                if (this.dateArrived) {
                    let params = {
                        id: this.receiptAuditId,
                        status: 1,
                        arrivalTime: new Date(this.dateArrived).format('yyyy-MM-dd hh:mm:ss')
                    };
                    this.sureReceived = false;
                    this.dateArrived = '';
                    this.receiptAudit(params);
                } else {
                    this.$Message.error(this.$t('modules_spoc_sign_web_src_views_receiptmanagement_receiptmanagement_7113'));
                }
            } else {
                // 未收到
                if(this.auditReason) {
                    let params = {
                        id: this.receiptAuditId,
                        status: 2,
                        auditReason: this.auditReason
                    };
                    this.sureReceived = false;
                    this.auditReason = '';
                    this.receiptAudit(params);
                } else {
                    this.$Message.error(this.$t('modules_spoc_sign_web_src_views_editleavenum_components_editleavenummodify_6484'));
                }
            }
            
        },
        approval(obj) {
            if (obj.key === 'Received') {
                //确认收到
                this.idReceived = true;
                this.sureReceived = true;
                this.receiptAuditId = obj.row.id;
                this.dateArrived = obj.row.arrivalTime ? new Date(obj.row.arrivalTime).format('yyyy-MM-dd') : ''
            } else if (obj.key === 'notReceived') {
                //未收到
                this.idReceived = false;
                this.sureReceived = true;
                this.receiptAuditId = obj.row.id;
            }
        },
        receiptAudit(params) {
            htReceipt
                .receiptAudit(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.$Message.success(res.data.message)
                        this.getListData();
                    }
                })
                .catch(errors.call(this));
        },
        itemForm(obj) {
            if (obj.key === 'grade') {
                //业绩分配
                this.$refs.performanceAllocation && this.$refs.performanceAllocation.showPop(obj.row.id);
            } else if (obj.key === 'upload') {
                //上传
                this.$refs.uploadFile && this.$refs.uploadFile.show(obj.row);
            } else if (obj.key === 'download') {
                //下载凭证
                this.downloadReceiptCert(obj.row);
            } else if (obj.key === 'reWrite') {
                //修改
                this.$refs.addNewPayment && this.$refs.addNewPayment.edit(obj.row.id);
            } else if (obj.key === 'delete') {
                //删除
                this.deleteId = obj.row.id;
                this.deleteModal = true;
            }
        },
        downloadReceiptCert(item) {
            let url = api.downloadBiz({
                'bizId':item.id,
                'bizType': 'HT_REFUND',
                tenant: localStorage.getItem('tenant'),
                token: localStorage.getItem('token')
            })
            window.open(url)
            // if (!item.filePaths) {
            //     this.$Message.error(this.$t('modules_spoc_sign_web_src_views_receiptmanagement_receiptmanagement_7114'));
            //     return false;
            // }
            // htReceipt
            //     .downloadReceiptCert({ id: item.id })
            //     .then(valid.call(this))
            //     .then(res => {
            //         if (res.ok) {
            //             // console.log('下载成功')
            //             util.blobDownload(res);
            //         }
            //     })
            //     .catch(errors.call(this));
        },
        getShowTitle(closeLoad) {
            htReceipt
                .getShowTitle({
                    pageIdentifier: 'htReceipt.receipt',
                    voName: 'HtReceiptVO',
                    lang: this.$i18n.locale
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
        getListDataPage1(){
            this.pageNo = 1
            this.getListData()
        },
        getListData() {
            // 计算参数
            let param = Object.assign(
                {
                    pageNo: this.pageNo,
                    pageSize: this.pageSize
                },
                this.params
            );
            param.receiptStartTime = this.searchBox.receiptDate[0]? this.searchBox.receiptDate[0].format('yyyy-MM-dd 00:00:00') : '';
            param.receiptEndTime = this.searchBox.receiptDate[1]? this.searchBox.receiptDate[1].format('yyyy-MM-dd 23:59:59') : '';
            param.financeReceiptStartTime = this.searchBox.financialCollectionDate[0]? this.searchBox.financialCollectionDate[0].format('yyyy-MM-dd 00:00:00') : '';
            param.financeReceiptEndTime = this.searchBox.financialCollectionDate[1]? this.searchBox.financialCollectionDate[1].format('yyyy-MM-dd 23:59:59') : '';
            param.arrivalStartTime = this.searchBox.financialArrivalDate[0]? this.searchBox.financialArrivalDate[0].format('yyyy-MM-dd 00:00:00') : '';
            param.arrivalEndTime = this.searchBox.financialArrivalDate[1]? this.searchBox.financialArrivalDate[1].format('yyyy-MM-dd 23:59:59') : '';
            
            this.searchObj = param; //这里需要给searchObj 赋值，导出数据的时候需要用到
            this.listPageRefund(param);
            this.totalAmountListReceipt(param);
        },
        listPageRefund(param) {
            this.updateLoadingStatus({ isLoading: true });
            htReceipt
                .listPageReceipt(param)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let result = res.data.data;
                        this.dataT = result.list;
                        this.pageCounts = result.total;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        totalAmountListReceipt(param) {
            htReceipt
                .totalAmountListReceipt(param)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.money = Number(res.data.data) / 10000;
                    }
                })
                .catch(errors.call(this));
        },
        formatNums(val) {
            //格式化数字
            // if(val !== undefined){
            //     let newNum = Number(val).toFixed(4).toString();
            //     let prev = newNum.split('.')[0]
            //     let next = newNum.split('.')[1]
            //     prev = prev.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
            //     newNum = prev+'.'+ next;
            //     return newNum;
            // }
            if(val){
                return val.toFixed(2)
            }else{
                return 0.00
            }
        },
        resetSearch(noReload) {
            this.searchBox.receiptDate = defaultDatePickerValue();
            this.searchBox.financialCollectionDate = [];// defaultDatePickerValue();
            this.searchBox.financialArrivalDate = []; // defaultDatePickerValue();
            this.searchBox.reportingTime = [];
            for (let item in this.params) {
                if (typeof this.params[item] === 'string') {
                    this.params[item] = '';
                }
            }
            if (this.app.currOfficeId == 'all') {
                this.$set(this.params, 'receiptOfficeIds', []);
            } else {
                this.$set(this.params, 'receiptOfficeIds', [this.app.currOfficeId]);
            }
            this.$refs.inputstudentName.reset();
            this.$refs.inputUser.reset();
            delete this.params.studentIds;
            delete this.params.userIds;
            delete this.params.studentName;
            delete this.params.userName;
            this.searchObj = this.params; //这里需要给searchObj 赋值，导出数据的时候需要用到
            if(!noReload){
                this.getListData();
            }
        },
        selectTableItem(item) {
            this.seleteItem = item;
        },
        //改变页码
        pageChange(pageNo, pageSize) {
            if (!pageNo) {
                //防止无用重复请求
                return;
            }
            this.pageNo = pageNo;
            this.pageSize = pageSize;
            this.getListData();
        },
        isExport(val) {
            //这里val的值。是根据设置下拉类型button设定的值来匹配判断
            if (val == '2' && !this.seleteItem.length) {
                this.$Message.error(this.$t('scoretemplate_scoretemplate_572'));
                return;
            }
            let searchObj = Object.assign({},this.searchObj)
            if (val == '2') {
                //如果是导出所选，需要在这里传递所选对象、或者对象ID，这里根据需要自行处理，并作为搜索参数的一部分传递到导出组件
                let _ids = [];
                this.seleteItem.forEach(e => {
                    _ids.push(e.id);
                });
                searchObj.ids = _ids;
            } 
            delete searchObj.pageNo
            delete searchObj.pageSize
            console.log(searchObj)
            this.$refs.exportModal.noShowExport(htReceipt.export, searchObj);
        },
        //新增付款
        addPay() {
            this.$refs.addNewPayment && this.$refs.addNewPayment.showPop();
        },
        baseData() {
            let types = [
                // 'com_audit_status', //审批状态字典
                'ht_receipt_business_type', //业务类型
                'ht_receipt_detail_type' //支付方式
            ];
            sysDict
                .batchListData({
                    types: types.join(',')
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let _data = res.data.data;
                        // this.auditStatusList = _data.com_audit_status
                        this.ht_receipt_business_type = _data.ht_receipt_business_type;
                        this.ht_receipt_detail_type = _data.ht_receipt_detail_type;
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
                                    this.params.receiptOfficeIds = [];
                                } else {
                                    this.params.receiptOfficeIds = [this.app.currOfficeId];
                                }
								this.searchBox.receiptDate = defaultDatePickerValue();
								this.searchBox.financialCollectionDate = []; //defaultDatePickerValue();
								this.searchBox.financialArrivalDate = []; // defaultDatePickerValue();
								this.options = DatePickerOpt(this,'DatePicker',Number(this.calendarConfig.maxMonthInterval));
								this.options1 = DatePickerOpt(this,'DatePicker1',Number(this.calendarConfig.maxMonthInterval));
								this.options2 = DatePickerOpt(this,'DatePicker2',Number(this.calendarConfig.maxMonthInterval));
                                this.initFromWorkbench();
                                this.getListData();
                            }
                        );
                    }
                })
                .catch(errors.call(this));
        },
        closePop(id) {
            // 详情弹窗的业绩分配
            this.$refs.performanceAllocation && this.$refs.performanceAllocation.showPop(id, 'viewThePaymentSlip');
        },
        goBack(str, id) {
            this.$refs[str] && this.$refs[str].showPop(id);
        },
        selectStudentName(obj) {
            // console.log(obj, obj.searchValue)
            // 学员姓名
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
        selectUser(obj) {
            // console.log(obj, obj.searchValue)
            // 收款人
            if (obj) {
                if (obj.searchType == 'name') {
                    delete this.params.userIds;
                    this.params.userName = obj.searchValue;
                } else {
                    delete this.params.userName;
                    this.params.userIds = [obj.searchValue];
                }
                let params = {
                    mainTable: 'ht_receipt',
                    mainField: 'recepitor',
                    joinTable: 'sys_user',
                    joinField: 'id',
                    secondField: 'name',
                    joinTableSearchParam: obj.searchValue
                };
                this.queryPageInputInitData(params, 'user');
            } else {
                delete this.params.userIds;
                delete this.params.userName;
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
                        } else if (key === 'user') {
                            this.userLists = [..._data];
                        }
                    }
                })
                .catch(errors.call(this));
        },
        setOptTime(flag) {
            if (flag) {
                this.searchBox.receiptDate = [];
            }
        },
        setOptTime1(flag) {
            if (flag) {
                this.searchBox.financialCollectionDate = [];
            }
        },
        setOptTime2(flag) {
            if (flag) {
                this.searchBox.financialArrivalDate = [];
            }
        },
        deleteReceiptById() {
            htReceipt.deleteReceiptById({id: this.deleteId})
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.$Message.success(this.$t('scoretemplate_compontents_scoremodify_549'));
                    this.getListData();
                }
            })
            .catch(errors.call(this));
        }
    },
    watch: {
        'app.currOfficeId': function(val, oldVal) {
            if (oldVal && !this.ctNo && this.$route.name == 'sign.receiptManagement') {
                if (this.app.currOfficeId == 'all') {
                    this.$set(this.params, 'receiptOfficeIds', []);
                } else {
                    this.$set(this.params, 'receiptOfficeIds', [this.app.currOfficeId]);
                }
                this.getListData();
            }
        },
        '$route.query': function(val, oldVal) {
            if(this.$route.name == 'sign.receiptManagement'){
                this.initFromWorkbench();
            }
        }
    }
};
</script>
