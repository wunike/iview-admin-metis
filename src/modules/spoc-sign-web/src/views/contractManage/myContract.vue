<style lang="less">
.contractManage {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100%;

    .borderStyle {
        display: inline-block;
        position: relative;
        &:after {
            content: "";
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
    .cell_wrap {
        width:100%;
        background: #fff;
        .cell_box {
            display: inline-block;
            width: 100%;
            padding: 6px 16px 0;
            background: #ffffff;
            .ivu-tabs-bar {
                margin-bottom: 0;
            }
            .cell {
                width: 108px;
                height: 32px;
                background: #ffffff;
                float: left;
                border: 1px solid rgba(230, 231, 235, 1);
                border-right: none;
                line-height: 32px;
                text-align: center;
                cursor: pointer;
                &:last-of-type {
                    border-right: 1px solid rgba(230, 231, 235, 1);
                    border-radius: 0px 4px 4px 0;
                }
                &:first-of-type {
                    border-radius: 4px 0 0 4px;
                }
                &.actived {
                    border: 1px solid rgba(68, 188, 183, 1);
                    background: rgba(68, 188, 183, 1);
                    color: #ffffff;
                }
            }
        }
    }
    .contractManageTable {
        padding: 0 16px;
        background: #ffffff;
        border-radius: 4px;
        flex: 1;
        width: 100%;
        .doAction {
            display: flex;
            justify-content: space-around;
            align-items: center;
            .doInfo {
                margin: 3px 6px;
                display: inline-block;
            }
        }
        .tableName {
            font-size: 12px;
            a {
                font-size: 16px;
            }
        }
    }
    .collapse {
        width: 100%;
        margin-bottom:16px;
    }
    .alert {
        width: 100%;
        height: 34px;
        margin-bottom: 16px;
        cursor: pointer;
        .ivu-alert-warning {
            float: left;
            width: 100%;
        }
    }
}
.ap-details-modules-packageChange {
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
    .ap-item {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        > span {
            display: inline-block;
            width: 93px;
            text-align: right;
            font-size: 14px;
            font-weight: normal;
            color: rgba(153, 153, 153, 1);
            margin-right: 10px;
            margin-top: 10px;
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
    <div class="contractManage" :style="{ 'padding-top': (ctStatus == 'reject' || (ctStatus != 'reject' && contractCount == 0 ))? '16px' : '' }">
        <div class="alert" v-show="ctStatus != 'reject' && contractCount != 0" @click="changeFilter('reject')">
            <Alert type="warning" show-icon>{{$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5658')}}<em>
                    &nbsp;
                    <b>{{ contractCount }}</b>
                    &nbsp;
                </em>{{$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5659')}}</Alert>
        </div>
        <div class="collapse">
            <v-search-collapse @search="doSearch" @reset="resetSearch">
                <DatePicker
                    type="daterange"
                    ref="DatePicker"
                    split-panels
                    :options="options"
                    @on-open-change="setOptTime"
                    :placeholder="$t('principalmailbox_index_490')"
                    style="width: 224px"
                    v-model="createTime"
                    @on-change="createTimeChange"
                ></DatePicker>
                <DatePicker
                    type="daterange"
                    ref="DatePicker1"
                    split-panels
                    :options="options1"
                    @on-open-change="setOptTime1"
                    :placeholder="$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5661')"
                    style="width: 224px"
                    v-model="signTime"
                    @on-change="signTimeChange"
                ></DatePicker>
                <Select :placeholder="$t('courselist_courselist_2251')" v-model="campusIds" multiple clearable :max-tag-count="2" style="width:280px;margin-right:12px;">
                    <Option v-for="item in campusList" :value="item.id" :key="item.id">{{ item.code }}{{ item.name }}</Option>
                </Select>
                <Select v-model="studentId"
                    filterable
                    remote
                    clearable
                    :placeholder="$t('memberlist_memberlist_257')"
                    :remote-method="remoteMethodStudentId"
                    :label="studentName"
                    @on-clear="clearStudent"
                    >
                    <Option v-for="item in studentList"
                        :value="item.id"
                        :key="item.id">{{ item.name }}</Option>
                </Select>
                <!-- <Input v-model="studentName" clearable @on-change="changeStudentName" :placeholder="$t('memberlist_memberlist_257')" style="width: 140px" /> -->
                <Input v-model.trim="studentEnName" clearable :placeholder="$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5664')" style="width: 140px" />
                <Input v-model="phone" clearable :placeholder="$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5665')" style="width: 140px" />
                <Input v-model="ctNo" clearable :placeholder="$t('modules_spoc_sign_web_src_views_approval_approvalnew_5071')" style="width: 140px" />
                <Input v-model="ctName" clearable :placeholder="$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5667')" style="width: 140px" />
                <Select v-model="signType" clearable :placeholder="$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5668')" style="width:140px">
                    <Option value="newRef">{{$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5669')}}</Option>
                    <Option value="newMkt">{{$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5670')}}</Option>
                    <Option value="replenish">{{$t('modules_spoc_report_web_src_views_refundreport_index_4671')}}</Option>
                    <!-- <Option v-for="item in signTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option> -->
                </Select>
                <Select v-model="sellerIds" :placeholder="$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4476')" filterable remote :max-tag-count="2" multiple :remote-method="remoteSeller" :loading="sellerLoading">
                    <Option v-for="(option, index) in sellerList" :value="option.value" :key="index">{{ option.name }}</Option>
                </Select>
                <Select v-model="receiptStatus" clearable :placeholder="$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5673')" style="width:140px">
                    <Option v-for="item in receiptStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Input v-model="receiptName" :placeholder="$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5674')" style="width: 140px" />
                <Select v-model="invoiceStatus" clearable :placeholder="$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5675')" style="width:140px">
                    <Option value="1">{{$t('modules_spoc_sign_web_src_modules_pactcard_4877')}}</Option>
                    <Option value="0">{{$t('modules_spoc_sign_web_src_modules_pactcard_4876')}}</Option>
                </Select>
                <Select v-model="isUploaded" clearable :placeholder="$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5678')" style="width:140px">
                    <Option value="1">{{$t('memberlist_18')}}</Option>
                    <Option value="0">{{$t('memberlist_19')}}</Option>
                </Select>
                <Select
                    :placeholder="$t('modules_spoc_crm_web_src_views_customermanagement_index_1267')"
                    clearable
                    multiple
                    filterable
                    v-model="querySources"
                >
                    <Option
                        v-for="item in crm_customer_source"
                        :value="item.value"
                        :key="item.value"
                    >{{ item.name }}</Option>
                </Select>
                <div class="borderStyle" style="width: 292px;">
                    <InputNumber :active-change="true" style="margin-right: 12px;" @on-change="restLeft" v-model="discountStart" :min="0" :placeholder="$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5682')"></InputNumber>
                    <InputNumber :active-change="true" @on-blur="restRight" v-model="discountEnd" :min="0" :placeholder="$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5683')"></InputNumber>
                </div>
            </v-search-collapse>
        </div>
        <div class="cell_wrap">
            <div class="cell_box">
                <!-- <div class="cell" v-for="item in ctStatusList" :key="item.value" :class="{ actived: ctStatus === item.value }" @click="changeFilter(item.value)">
					{{ item.label }}
				</div> -->
                <Tabs v-model="ctStatus" @on-click="changeFilter"><TabPane key="" :label="$t('message_index_287')" name=""></TabPane><TabPane v-for="item in ctStatusList" :key="item.value" :label="item.label" :name="item.value"></TabPane></Tabs>
            </div>
        </div>
        <div class="contractManageTable">
            <big-table
                v-if="defaultShowCol"
                :tableName="tableTitle"
                :tableData="dataList"
                :tableColumnArray="columnsT"
                :defaultShowCol="defaultShowCol"
                :btnList="btnList"
                :canSelection="true"
                :updateShowTitleKey="updateShowTitleKey"
                :updateShowTitleMethod="updateShowTitle"
                :dataTotal="pageCounts"
                :pageNo="pageNo"
                @resetDefault="resetDefaultCol"
                @pageChange="pageChange"
                @selectionChange="selectTableItem"
            >
                <p slot="tableNameSlot" class="tableName">{{$t('modules_spoc_crm_web_src_views_customer360_components_flowup_796')}}<a>{{ pactInfo.total }}</a>{{$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5686')}}<a style="color:#F5222D;">{{ pactInfo.signPriceTotal ? (Number(pactInfo.signPriceTotal)/10000).toFixed(2) : '-' }}</a>{{$t('modules_spoc_crm_web_src_views_performanceplan_modal_1482')}}</p>
            </big-table>
        </div>
        <list-opt-log-modal ref="listOptLogModal"></list-opt-log-modal>
        <add-invoice ref="invoiceModel" :isShowinfor="isShowinfor" @updataTable="getListData"></add-invoice>
        <scanning-copy-modal ref="scanningCopyModal" @updataTable="getListData"></scanning-copy-modal>
        <export-inovice-modal ref="exportInoviceModal"></export-inovice-modal>
        <add-new-payment ref="addNewPayment" @uploadLists="getListData"></add-new-payment>
        <apply-refund ref="applyRefundRef" @uploadLists="getListData"></apply-refund>
        <Modal v-model="showImgModal" :title="$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5688')" style="text-align:center;" width="600">
            <img :src="imgUrl" style="max-width:300px;max-height:300px;" />
            <div slot="footer"><Button type="primary" size="large" @click="closeShowImg">{{$t('courselist_compontents_servicecontent_216')}}</Button></div>
        </Modal>
        <Modal class="ap-details-modules-packageChange" width="600" v-model="apDetailsModules" :mask-closable="false" @on-cancel="cancelAdm" :title="$t('modules_spoc_sign_web_src_modules_pactcard_4891')">
            <div class="ap-item">
                <span>{{$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5691')}}</span>
                <Input v-model="reasons" type="textarea" style="width:455px;" :autosize="{ minRows: 4, maxRows: 4 }" :placeholder="$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5692')" />
            </div>
            <div slot="footer">
                <Button @click="cancelAdm">{{$t('classroom_allscore_53')}}</Button>
                <Button @click="invalidAuditBefore" type="primary" style="margin-left: 6px">{{$t('modules_spoc_sign_web_src_modules_pactcard_4891')}}</Button>
            </div>
        </Modal>
        <Modal class="ap-details-modules-packageChange" width="600" v-model="showEditInfo" :mask-closable="false" @on-cancel="cancelShowEditInfo" :title="$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5694')">
            <div class="ap-item">
                <!-- 	1改包、2转中心、3修改请假次数、4赠课、5有效期调整 -->
                <Button @click="editInfoAction(1)" style="width:105px;margin-right:20px;display:inline-block;" type="primary">{{$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5695')}}</Button>
                <Button @click="editInfoAction(2)" style="width:105px;margin-right:20px;display:inline-block;" type="primary">{{$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5696')}}</Button>
                <Button @click="editInfoAction(3)" style="width:105px;margin-right:20px;display:inline-block;" type="primary">{{$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5697')}}</Button>
                <Button @click="editInfoAction(4)" style="width:105px;margin-right:20px;display:inline-block;" type="primary">{{$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5698')}}</Button>
                <Button @click="editInfoAction(5)" style="width:105px;margin-right:20px;display:inline-block;" type="primary">{{$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5699')}}</Button>
            </div>
            <div slot="footer"><Button @click="cancelShowEditInfo">{{$t('classroom_allscore_53')}}</Button></div>
        </Modal>
        <popupsM ref="popModule" @save="getListData"></popupsM>
        <turn-center ref="turnCenter" @save="getListData"></turn-center>
        <editLeaveNumModify v-if="campusList && campusList.length" ref="editLeaveNumModifyRef" @getListDataEmit="getListData" :officeIdList="campusList"></editLeaveNumModify>
        <give-class @ge-parent-list="getListData" ref="giveclassRef"></give-class>
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
import vSearchCollapse from '@public/modules/vSearchCollapse.vue';
import popTipComp from '@public/modules/tableDropdown.vue';
import bigTable from '@public/modules/bigTable.vue';
import addNewPayment from '../receiptManagement/components/addNewPayment.vue';
import applyRefund from '../applyRefund/applyRefund';
import addInvoice from '../../modules/addInvoice';
import { mapGetters, mapState, mapMutations } from 'vuex';
import { waitUntil, DatePickerOpt, defaultDatePickerValue, formatNum } from '@public/libs/util';
import listOptLogModal from './components/listOptLogModal';
import scanningCopyModal from './components/scanningCopyModal';
import exportInoviceModal from './components/exportInoviceModal';
import popupsM from '../packageChange/pops/popups.vue';
import editLeaveNumModify from '../editLeaveNum/components/editLeaveNumModify';
import giveClass from '../refundGiveClass/giveClass';
import turnCenter from '../contractTransferCenter/components/turnCenter.vue';
import valid, { errors, htContract, common, comAuditFlow, sysDict, sysUser, sysCommonSql, sysAttachment } from '../../libs/request';
import {crmActivity} from "../../../../spoc-crm-web/src/libs/crmActivity";
export default {
    name: 'sign.contractManage',
    data() {
        return {
            modal3: false,
            exportRequest: null,
            studentList:[],
            isActioning: false, //多次提交拦截
            options: null,
            options1: null,
            flowId: '',
            apDetailsModules: false,
            reasons: '', // 作废理由
            contractCount: '',
            createTime: [],
            signTime: [],
            selectedIds: [],
            exportObj: {},
            isShowinfor: true,
            pageNo: 1,
            pageSize: this.$store.state.app.pageSizeGlobal,
            createStartDate: '',
            createEndDate: '',
            signStartDate: '',
            signEndDate: '',
            orderByType: '',
            orderByStatus: '',
            sellerIds: [],
            sellerLoading: false,
            sellerList: [],
            studentName: '',
            studentEnName: '',
            invoiceStatus: '',
            isUploaded:'',
            phone:'',
            querySources: [],
            receiptName: '',
            discountStart: null,
            discountEnd: null,
            ctNo: '',
            ctName: '',
            ctStatus: '',
            ctStatusList: [],
            receiptStatus: '',
            receiptStatusList: [
                {
                    value: '0',
                    label: this.$t('memberlist_19')
                },
                {
                    value: '1',
                    label: this.$t('memberlist_18')
                }
            ],
            defaultShowCol: null,
            tableTitle: '',
            dataList: [],
            campusIds: [],
            campusList: [],
            signTypeList: [],
            crm_customer_source: [],
            signType: '',
            columnsT: [
                {
                    //title: '学员姓名',
                    key: 'studentName',
                    minWidth: 65
                    //						fixed: 'left',
                    //						tooltip: true
                },
                {
                    // title: '合同编号',
                    key: 'ctNo',
                    minWidth: 104
                },
                // {
                // 	title: '审批进度',
                // 	key: 'auditRate',
                // 	minWidth: 80,
                // 	render: (h, params) => {
                // 		let arr = params.row.auditRate.split('/');
                // 		return h('Progress', {
                // 			props: {
                // 				percent: arr[0] / arr[1],
                // 				//									'hide-info':true
                // 			}
                // 		}, [h('span', {}, params.row.auditRate)]);
                // 	}
                // },
                {
                    // title: '签单类型',
                    key: 'signType',
                    render: (h, params) => {
                        let obj = this.signTypeList.find(v => v.value == params.row.signType);
                        return h('span', obj ? obj.label : '');
                    }
                },
                {
                    // title: '总额',
                    key: 'allPrice',
                    align: 'right',
                    render: (h, params) => {
                        return h('span', formatNum(params.row.allPrice));
                    }
                },
                {
                    // title: '优惠',
                    key: 'deratePrice',
                    align: 'right',
                    render: (h, params) => {
                        return h('span', formatNum(params.row.deratePrice));
                    }
                },
                {
                    // title: '签约金额',
                    key: 'signPrice',
                    align: 'right',
                    render: (h, params) => {
                        return h('span', formatNum(params.row.signPrice));
                    }
                },
                {
                    // title: '已收款',
                    key: 'curReceipt',
                    align: 'right',
                    render: (h, params) => {
                        return h('span', formatNum(params.row.curReceipt));
                    }
                },
                {
                    // title: '待付清',
                    key: 'tailPrice',
                    align: 'right',
                    render: (h, params) => {
                        return h('span', formatNum(params.row.tailPrice));
                    }
                },
                {
                    // title: '收款凭证',
                    key: 'receiptStatus',
                    render: (h, params) => {
                        let receiptList = [];
                        if (params.row.receiptStatus == '1') {
                            params.row.receiptList.forEach(item => {
                                console.log(item);
                                receiptList.push(
                                    h('img', {
                                        attrs: {
                                            src: item
                                        },
                                        style: {
                                            cursor: 'pointer',
                                            width: '30px',
                                            height: '30px',
                                            'margin-right': '4px'
                                        },
                                        on: {
                                            click: () => {
                                                this.showImg(item);
                                            }
                                        }
                                    })
                                );
                            });
                        }
                        return h('div', {}, params.row.receiptStatus == 0 ? this.$t('memberlist_19') : receiptList);
                    }
                },
                // {
                //     key: 'ctStatusLabel',
                //     render: (h, params) => {
                //         return h('div', {}, params.row.exceptionReceiptCount != '0' ? params.row.ctStatusLabel + this.$t('memberlist_19_1') : params.row.ctStatusLabel);
                //     }
                // },
                {
                    title: this.$t('classlist_compontents_detailinfo_45'),
                    key: 'doAction',
                    minWidth: 60,
                    render: (h, params) => {
                        return h('div', this.getDoAction(h, params));
                    }
                }
            ],
            pageCounts: 0,
            updateShowTitle: htContract.updateShowTitle,
            updateShowTitleKey:'htContractListPage',
            pactInfo: {
                rejectNum: 0,
                total: 0,
                signPriceTotal: 0
            },
            imgUrl: '',
            showImgModal: false,
            normal_ctNo: '',
            normal_studentId: '',
            normal_studentName: '',
            normal_officeId: '',
            showEditInfo: false,
            studentId: ''
        };
    },
    computed: {
        ...mapState(['userInfo', 'app', 'buttonPerm', 'calendarConfig']),
        myButtonPrem() {
            if (this.buttonPerm && (JSON.stringify(this.buttonPerm) != "{}")) {
                return this.buttonPerm['sign.myContract'] || [];
            } else {
                return false;
            }
        },
        btnList() {
            return [
                {
                    hidden: this.myButtonPrem && this.myButtonPrem.indexOf('save') != -1 ? false : true,
                    style: {},
                    type: '',
                    btnClick: this.newPact,
                    text: this.$t('sign.contractGeneration'),
                    value: '1'
                },
                // [
                //     {
                //         hidden: this.myButtonPrem && this.myButtonPrem.indexOf('exportCt') != -1 ? false : true,
                //         style: {},
                //         type: '',
                //         btnClick: this.isExport,
                //         text: '导出全部',
                //         value: '1',
                //         parentName: '导出合同'
                //     },
                //     {
                //         hidden: this.myButtonPrem && this.myButtonPrem.indexOf('exportCt') != -1 ? false : true,
                //         style: {},
                //         type: '',
                //         btnClick: this.isExport,
                //         text: '导出所选',
                //         value: '2',
                //         parentName: '导出合同'
                //     }
                // ],
                // [
                //     {
                //         hidden: this.myButtonPrem && this.myButtonPrem.indexOf('exportCourse') != -1 ? false : true,
                //         style: {},
                //         type: '',
                //         btnClick: this.isExportCourse,
                //         text: '导出全部',
                //         value: '1',
                //         parentName: '导出课程包'
                //     },
                //     {
                //         hidden: this.myButtonPrem && this.myButtonPrem.indexOf('exportCourse') != -1 ? false : true,
                //         style: {},
                //         type: '',
                //         btnClick: this.isExportCourse,
                //         text: '导出所选',
                //         value: '2',
                //         parentName: '导出课程包'
                //     }
                // ],
                // {
                //     hidden: this.myButtonPrem && this.myButtonPrem.indexOf('exportInvoice') != -1 ? false : true,
                //     style: {},
                //     type: '',
                //     btnClick: this.exportInovice,
                //     text: '导出历史开票',
                //     value: '1'
                // }
            ];
        }
    },
    components: {
        vSearchCollapse,
        bigTable,
        addNewPayment,
        listOptLogModal,
        addInvoice,
        scanningCopyModal,
        exportInoviceModal,
        popTipComp,
        applyRefund,
        popupsM,
        editLeaveNumModify,
        giveClass,
        turnCenter
    },
    mounted() {
        this.getShowTitle()
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
        sysDict
            .batchListData({
                types: 'ht_contract_status,ht_contract_sign_type'
            })
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.ctStatusList = res.data.data.ht_contract_status;
                    // this.ctStatusList.unshift({
                    //     value: "",
                    //     label: '全部'
                    // });
                    this.signTypeList = res.data.data.ht_contract_sign_type;
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        sysUser
            .dataScopeFilter()
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    let data = res.data.data;
                    this.campusList = data;
                } else {
                    this.$Message.error(res.data.message);
                }
            })
            .catch(errors.call(this))
            .finally(() => {});

        this.studentId = this.$route.params.studentId ? this.$route.params.studentId : '';
        if(this.studentId && this.$route.params.studentName){
            this.studentList = [{
                id: this.$route.params.studentId,
                name: this.$route.params.studentName
            }]
            this.studentName = this.$route.params.studentName
        }

        waitUntil(
            () => {
                return (this.app.currOfficeId && this.calendarConfig.maxMonthInterval) && Object.keys(this.userInfo).length;
            },
            () => {
                if (this.app.currOfficeId) {
                    if (this.app.currOfficeId == 'all' || this.studentId) {
                        this.campusIds = [];
                    } else {
                        this.campusIds = [this.app.currOfficeId];
                    }
                    this.createTime = defaultDatePickerValue();
                    this.options = DatePickerOpt(this,'DatePicker',Number(this.calendarConfig.maxMonthInterval))
                    this.createTimeChange()
                }
                this.createTime = this.studentId ? [] : defaultDatePickerValue();
                this.signTime = [];//defaultDatePickerValue();
				this.options1 = DatePickerOpt(this,'DatePicker1',Number(this.calendarConfig.maxMonthInterval))
                this.signTimeChange()
                this.createTimeChange()
                this.getListData();
                this.getRejectCount();
                // console.log( this.campusIds)
            }
        );
        if(this.$route.query.modalType) {
            // 工作台任务中心点击确认到访
            this.$refs.scanningCopyModal.show(this.$route.query.ctId);
        }
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        resetDefaultCol(){
            this.updateLoadingStatus({ isLoading: true });
            htContract.clearShowField({
                pageIdentifier: "htContractListPage",
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
        getShowTitle(closeLoad){
            htContract.getShowTitle({
                pageIdentifier: 'htContractListPage',
                voName: 'com.windliven.spoc.modules.contract.vo.HtContractListPageVO',
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
        clearStudent(){
            this.studentId = ''
            this.studentName = ''
        },
        remoteMethodStudentId(query) {
            if(!!query) {
                // 不为空
                let params = {
                    officeId: '',
                    name: query
                }
                common.listByOfficeIdAndName(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.studentList = res.data.data.length ? res.data.data : [];
                    }
                })
                .catch(errors.call(this));
            } else {
                this.studentList = [];
            }
        },
        changeStudentName(){
            console.log("changeStudentName")
            this.studentId = ''
        },
        getConAttBaseInfo(ctId){
            let url = htContract.downloadSignReceipt({
                // id:res.data.data.id,
                objectId:ctId,
                templateName: '合同扫描件',
                type: 'HT_CONTRACT_SCAN'
            })
            window.open(url)
            // htContract
            //     .getConAttBaseInfo({ id:ctId })
            //     .then(valid.call(this))
            //     .then(res => {
            //         if (res.ok) {
            //             let url = sysAttachment.download({
            //                     id:res.data.data.id,
            //                     objectId:res.data.data.objectId,
            //                     templateName:res.data.data.templateName,
            //                     type:res.data.data.type
            //                 })
            //             console.log(url,'111')
            //             window.open(url)
            //         }
            //     })
            //     .catch(errors.call(this))
            //     .finally(() => {

            //     });
        },
        restLeft(num) {
            if(num > this.discountEnd){
                this.discountEnd = num
                if(this.discountEnd <= 0){
                    this.discountEnd = 0
                }
            }
        },
        restRight(num) {
            if(this.discountStart > this.discountEnd){
                this.discountStart = this.discountEnd
                if(this.discountStart <= 0){
                    this.discountStart = 0
                }
            }
        },
        cancelShowEditInfo() {
            this.showEditInfo = false;
        },
        cancelAdm() {
            this.apDetailsModules = false;
            this.reasons = '';
        },
        invalidAuditBefore() {
            let str = this.reasons;
            str = str.replace(/^\s$/g, '');
            if (str == '' || str == null) {
                this.$Message.warning(this.$t('modules_spoc_sign_web_src_modules_tabledetails_4965'));
            } else {
                this.invalidAudit();
            }
        },
        invalidAudit() {
            if(this.isActioning){ //多次提交拦截
                return
            }
            this.isActioning = true
            this.updateLoadingStatus({
                isLoading: true
            });
            let params = {
                id: this.flowId,
                invalidReason: this.reasons
            };
            comAuditFlow
                .invalidAudit(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.$Message.success(this.$t('modules_spoc_sign_web_src_modules_tabledetails_4966'));
                        this.reasons = '';
                        this.apDetailsModules = false;
                        this.doSearch();
                    }
                })
                .then(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({
                        isLoading: false
                    });
                    setTimeout(()=>{
                        //多次提交拦截
                        this.isActioning = false
                    },200)
                });
        },
        closeShowImg() {
            this.showImgModal = false;
            this.imgUrl = '';
        },
        showImg(url) {
            this.imgUrl = url;
            this.showImgModal = true;
        },
        getRejectCount() {
            let params = {
                studentName: this.studentName,
                ctNo: this.ctNo,
                ctName: this.ctName,
                ctStatus: 'reject',
                signType: this.signType,
                officeIds: this.campusIds.join(','),
                sellerIds: this.sellerIds.join(','),
                createStartDate: this.createStartDate,
                createEndDate: this.createEndDate,
                signStartDate: this.signStartDate,
                signEndDate: this.signEndDate,
                orderByType: this.orderByType,
                orderByStatus: this.orderByStatus,
                receiptStatus: this.receiptStatus,
                studentEnName: this.studentEnName,
                invoiceStatus: this.invoiceStatus,
                isUploaded:this.isUploaded,
                phone: this.phone,
                querySources: this.querySources,
                receiptName: this.receiptName,
                discountStart: this.discountStart ? this.discountStart/100 : '',
                discountEnd: this.discountEnd ? this.discountEnd/100 : '',
                stateGroupType:"contract list"
            }
            htContract
                .getRejectCount(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.contractCount = res.data.data.contractCount;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
        },
        doSearch() {
            this.pageNo = 1;
            this.getListData();
        },
        getListData() {
            this.selectedIds = [];
            this.updateLoadingStatus({
                isLoading: true
            });
            this.studentName = this.studentName.replace(/^\s+|\s+$/g,"")
            let params = {
                studentName: this.studentName,
                ctNo: this.ctNo,
                ctName: this.ctName,
                ctStatus: this.ctStatus==0?'':this.ctStatus,
                signType: this.signType,
                officeIds: this.campusIds.join(','),
                sellerIds: this.sellerIds.join(','),
                createStartDate: this.createStartDate,
                createEndDate: this.createEndDate,
                signStartDate: this.signStartDate,
                signEndDate: this.signEndDate,
                orderByType: this.orderByType,
                orderByStatus: this.orderByStatus,
                pageSize: this.pageSize,
                pageNo: this.pageNo,
                receiptStatus: this.receiptStatus,
                studentEnName: this.studentEnName,
                invoiceStatus: this.invoiceStatus,
                isUploaded:this.isUploaded,
                phone: this.phone,
                querySources: this.querySources,
                receiptName: this.receiptName,
                discountStart: this.discountStart ? this.discountStart/100 : '',
                discountEnd: this.discountEnd ? this.discountEnd/100 : '',
            };
            if(this.studentId) params.studentId = this.studentId;
            this.exportObj = params;
            htContract
                .listPage(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.dataList = res.data.data.list;
                        this.pageCounts = res.data.data.total;
                        this.listPageCount();
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({
                        isLoading: false
                    });
                });
        },
        listPageCount() {
            let params = {
                studentName: this.studentName,
                ctNo: this.ctNo,
                ctName: this.ctName,
                ctStatus: this.ctStatus==0?'':this.ctStatus,
                signType: this.signType,
                officeIds: this.campusIds.join(','),
                sellerIds: this.sellerIds.join(','),
                createStartDate: this.createStartDate,
                createEndDate: this.createEndDate,
                signStartDate: this.signStartDate,
                signEndDate: this.signEndDate,
                orderByType: this.orderByType,
                orderByStatus: this.orderByStatus,
                pageSize: this.pageSize,
                pageNo: this.pageNo,
                receiptStatus: this.receiptStatus,
                studentEnName: this.studentEnName,
                invoiceStatus: this.invoiceStatus,
                isUploaded:this.isUploaded,
                phone: this.phone,
                querySources: this.querySources,
                receiptName: this.receiptName,
                discountStart: this.discountStart ? this.discountStart/100 : '',
                discountEnd: this.discountEnd ? this.discountEnd/100 : '',
                stateGroupType:"contract list"
            };
            if(this.studentId) params.studentId = this.studentId;
            htContract
                .listPageCount(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.pactInfo = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({
                        isLoading: false
                    });
                });
        },
        resetSearch() {
            this.studentName = '';
            this.ctNo = '';
            this.ctName = '';
            this.ctStatus = 0;
            this.signType = '';
            if (this.app.currOfficeId == 'all') {
                this.campusIds = [];
            } else {
                this.campusIds = [this.app.currOfficeId];
            }
            this.sellerIds = [];
            this.createStartDate = '';
            this.createEndDate = '';
            this.signStartDate = '';
            this.signEndDate = '';
            this.orderByType = '';
            this.orderByStatus = '';
            this.pageNo = 1;
            this.receiptStatus = '';
            this.studentEnName= '';
            this.invoiceStatus= '';
            this.isUploaded= '';
            this.phone= '';
            this.querySources= [];
            this.receiptName= '';
            this.discountStart = null;
            this.discountEnd = null;
            this.createTime = defaultDatePickerValue();
            this.signTime = []; //defaultDatePickerValue();
            this.createTimeChange()
            this.signTimeChange()
            this.getListData();
        },
        newPact() {
            this.$router.push({
                name: 'sign.pact'
            });
        },
        pageChange(no, size) {
            this.pageNo = no;
            this.pageSize = size;
            this.getListData();
        },
        selectTableItem(row) {
            this.selectedIds = [];
            if (row.length) {
                row.forEach(item => {
                    this.selectedIds.push(item.id);
                });
            }
        },
        changeFilter(item) {
            this.pageNo = 1;
            // this.ctStatus = item == 0 ? "" : item;
            this.getListData();
        },
        blob(res){
            const blob = new Blob([res.data], {type: "application/actet-stream;charset=utf-8"});
            const contentDisposition = res.headers["content-disposition"]; //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
            const patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*");
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
        },
        isExport(val) {
            if (val == '2') {
                if (!this.selectedIds.length) {
                    this.$Message.error(this.$t('importPage_warning1'));
                    return;
                }
                let params = {
                    ids: this.selectedIds
                };
                // window.open(htContract.exportSelectContract(params));
                this.modal3 = true
                htContract.exportContract(params)
                .then(valid.call(this))
                .then(res => {
                    if(res.ok){
                        this.blob(res)
                    }
                }).finally(()=>{
                    setTimeout(()=>{
						this.modal3 = false
					},1000)
                })
            } else {
                let _exportObj = {};
                for (let key in this.exportObj) {
                    if (typeof this.exportObj[key] == 'undefined') {
                        _exportObj[key] = '';
                    } else {
                        _exportObj[key] = this.exportObj[key];
                    }
                }
                this.modal3 = true
                htContract.exportContract(_exportObj)
                .then(valid.call(this))
                .then(res => {
                    if(res.ok){
                        this.blob(res)
                    }
                }).finally(()=>{
                    setTimeout(()=>{
						this.modal3 = false
					},1000)
                })
                // window.open(htContract.exportContract(_exportObj));
            }
        },
        isExportCourse(val) {
            if (val == '2') {
                if (!this.selectedIds.length) {
                    this.$Message.error(this.$t('importPage_warning1'));
                    return;
                }
                let params = {
                    ids: this.selectedIds
                };
                this.modal3 = true
                htContract.exportSelectKCB(params)
                .then(valid.call(this))
                .then(res => {
                    if(res.ok){
                        this.blob(res)
                    }
                }).finally(()=>{
                    setTimeout(()=>{
						this.modal3 = false
					},1000)
                })
                // window.open(htContract.exportSelectKCB(params));
            } else {
                let _exportObj = {};
                for (let key in this.exportObj) {
                    if (typeof this.exportObj[key] == 'undefined') {
                        _exportObj[key] = '';
                    } else {
                        _exportObj[key] = this.exportObj[key];
                    }
                }
                // console.log(_exportObj);
                this.modal3 = true
                htContract.exportKCB(_exportObj)
                .then(valid.call(this))
                .then(res => {
                    if(res.ok){
                        this.blob(res)
                    }
                }).finally(()=>{
                    setTimeout(()=>{
						this.modal3 = false
					},1000)
                })
                // window.open(htContract.exportKCB(_exportObj));
            }
        },
        exportInovice(val) {
            this.$refs.exportInoviceModal.openModal = true;
        },
        remoteSeller(query) {
            this.sellerLoading = true;
            let params = {
                mainTable: 'ht_sign',
                mainField: 'seller_id',
                joinTable: 'sys_user',
                joinField: 'id',
                secondField: 'name',
                pageSize: '15',
                joinTableSearchParam: query
            };
            sysCommonSql
                .queryPageInputInitData(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.sellerList = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.sellerLoading = false;
                });
        },
        createTimeChange(val) {
            this.createStartDate = this.createTime[0] ? this.createTime[0].format('yyyy-MM-dd 00:00:00') : '';
            this.createEndDate = this.createTime[1] ? this.createTime[1].format('yyyy-MM-dd 23:59:59') : '';
        },
        signTimeChange(val) {
            this.signStartDate = this.signTime[0] ? this.signTime[0].format('yyyy-MM-dd 00:00:00') : '';
            this.signEndDate = this.signTime[1] ? this.signTime[1].format('yyyy-MM-dd 23:59:59') : '';
        },
        //驳回在送审
        rejectSendAudit(id) {
            this.updateLoadingStatus({ isLoading: true });
            comAuditFlow
                .rejectSendAudit({ id })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.doSearch();
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        //撤回在送审 草稿箱
        withdrawSendAudit(id) {
            this.updateLoadingStatus({ isLoading: true });
            comAuditFlow
                .withdrawSendAudit({ id })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.doSearch();
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        invalidContract(ctId){
            this.updateLoadingStatus({ isLoading: true });
            htContract
                .invalidContract({ ctId })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.doSearch();
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        closeContract(auditId) {
            this.reasons = '';
            this.flowId = auditId;
            this.apDetailsModules = true;
            // this.$Modal.confirm({
            //     title: '作废合同',
            // 	content: '<p style="color:#FF3000;">合同作废后不可恢复，需要重新生成合同，<span style="color:#000;">你还要继续吗？</span></p>',
            // 	okText: '继续',
            //     onOk: () => {
            // 		this.updateLoadingStatus({ isLoading: true });
            // 		htContract.closeContract({
            // 			id
            // 		})
            // 		.then(valid.call(this))
            // 		.then(res => {
            // 			if(res.ok) {
            // 				this.pageNo = 1
            // 				this.getListData()
            // 			}
            // 		})
            // 		.catch(errors.call(this)).finally(() => {
            // 			this.updateLoadingStatus({ isLoading: false });
            // 		});
            //     },
            //     onCancel: () => {
            //     }
            // });
        },
        approval(obj) {
            if (obj.key === 'print') {
                // 打印
                htContract.getContractFileExist({
                    id:obj.row.id
                }).then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        if(res.data.data.size == '0'){
                            this.$Message.error({
                                duration: 3,
                                content: this.$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5712')
                            })
                        } else {
                            let url = htContract.downloadUrl(obj.row.id);
                            window.open(url);
                        }
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            } else if (obj.key === 'log') {
                // 日志
                this.$refs.listOptLogModal.listOptLog(obj.row.id);
            } else if (obj.key === 'downloadSkpz') {
                //下载收款凭证
                this.$router.push({
                    name: 'sign.receiptManagement',
                    query: {
                        ctNo: obj.row.ctNo
                    }
                });
            } else if (obj.key === 'downloadScan') {
                //下载扫描件
                this.getConAttBaseInfo(obj.row.id)
            } else if (obj.key === 'scan') {
                // 上传扫描件
                this.$refs.scanningCopyModal.show(obj.row.id, obj.row.isUploaded);
            } else if (obj.key === 'invoice') {
                // 开票
                this.isShowinfor = obj.row.invoiceStatus != 1;
                this.$refs.invoiceModel.show(obj.row);
            }
        },
        editInfoAction(type) {
            //1改包、2转中心、3修改请假次数、4赠课、5有效期调整
            // this.showEditInfo = false
            if (type == '1') {
                this.$refs.popModule.showNew(this.normal_studentId, this.normal_studentName, this.normal_ctNo);
            }
            if (type == '2') {
                this.$refs.turnCenter.showPopNew(this.normal_studentId, this.normal_studentName, this.normal_ctNo);
            }
            if (type == '3') {
                this.$refs.editLeaveNumModifyRef.showTipsMethods(0, this.$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5713'), {
                    ctNo: this.normal_ctNo,
                    ctStudnetId: this.normal_studentId,
                    ctStudnetName: this.normal_studentName,
                    ctOfficeId: this.normal_officeId
                });
            }
            if (type == '4') {
                this.$refs['giveclassRef'].giveclassShowMethod(this.normal_ctNo, this.normal_studentId, this.normal_studentName, this.normal_officeId);
            }
            if (type == '5') {
                this.$refs.editLeaveNumModifyRef.showTipsMethods('stop', this.$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5714'), {
                    ctNo: this.normal_ctNo,
                    ctStudnetId: this.normal_studentId,
                    ctStudnetName: this.normal_studentName,
                    ctOfficeId: this.normal_officeId
                });
            }
        },
        getDoAction(h, params) {
            let detail = h(
                //详情
                'a',
                {
                    class: {
                        doInfo: true
                    },
                    style: {
                        display: this.myButtonPrem && this.myButtonPrem.indexOf('details') != -1 ? 'inline-block' : 'none',
                        margin: '3px 6px'
                    },
                    on: {
                        click: () => {
                            this.$router.push({
                                name: 'sign.pactDetails',
                                query: {
                                    id: params.row.id,
                                    ctNo: params.row.ctNo
                                }
                            });
                        }
                    }
                },
                this.$t('principalmailbox_16')
            );

            let revamp = h(
                //修改合同
                'a',
                {
                    class: {
                        doInfo: true
                    },
                    style: {
                        margin: '3px 6px',
                        display: 'inline-block'
                    },
                    on: {
                        click: () => {
                            this.$router.push({
                                name: 'sign.contractGeneration',
                                query: {
                                    id: params.row.tplId,
                                    mid: params.row.id
                                }
                            });
                        }
                    }
                },
                this.$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5716')
            );
            let invalidContract = h(
                //作废合同
                'a',
                {
                    class: {
                        doInfo: true
                    },
                    style: {
                        margin: '3px 6px',
                        display: 'inline-block'
                    },
                    on: {
                        click: () => {
                            this.$Modal.confirm({
                                title: this.$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5717'),
                                content: '<p style="color:#FF3000;">' + this.$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5718') + '</p>',
                                okText: this.$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5719'),
                                cancelText: this.$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5720'),
                                onOk: () => {
                                   this.invalidContract(params.row.id);
                                },
                                onCancel: () => {
                                }
                            });
                        }
                    }
                },
                this.$t('modules_spoc_sign_web_src_modules_pactcard_4891')
            );
            let invalid = h(
                //作废
                'a',
                {
                    class: {
                        doInfo: true
                    },
                    style: {
                        margin: '3px 6px',
                        display: 'inline-block'
                    },
                    on: {
                        click: () => {
                            this.closeContract(params.row.auditId);
                        }
                    }
                },
                this.$t('modules_spoc_sign_web_src_modules_pactcard_4891')
            );
            let tuikuan = params.row.exceptionReceiptCount != '0' ? '' : h(
                //退款
                'a',
                {
                    class: {
                        doInfo: true
                    },
                    style: {
                        display: this.myButtonPrem && this.myButtonPrem.indexOf('refund') != -1 ? 'inline-block' : 'none',
                        margin: '3px 6px'
                    },
                    on: {
                        click: () => {
                            // console.log(params.row);
                            this.$refs.applyRefundRef.applyRefundRefShow(params.row);
                        }
                    }
                },
                this.$t('modules_spoc_sign_web_src_modules_pactcard_4892')
            );

            let shoukuan = h(
                //收款
                'a',
                {
                    class: {
                        doInfo: true
                    },
                    style: {
                        margin: '3px 6px',
                        display: 'inline-block'
                    },
                    on: {
                        click: () => {
                            this.$refs.addNewPayment.showPop(
                                {
                                    ctNo: params.row.ctNo,
                                    ctId: params.row.id,
                                    cusId: params.row.studentId,
                                    studentName: params.row.studentName,
                                    sparePrice: params.row.tailPrice,
                                    additionInfo: params.row.additionInfo,
                                    officeId: params.row.officeId
                                }
                            );
                        }
                    }
                },
                this.$t('modules_spoc_sign_web_src_modules_pactcard_4890')
            );

            let resubmit = h(
                //重新提交
                'a',
                {
                    class: {
                        doInfo: true
                    },
                    style: {
                        margin: '3px 6px',
                        display: 'inline-block'
                    },
                    on: {
                        click: () => {
                            if (params.row.ctStatusValue == 'reject') {
                                //已驳回
                                this.rejectSendAudit(params.row.auditId);
                            }
                            if (params.row.ctStatusValue == 'draft') {
                                // 草稿箱
                                this.withdrawSendAudit(params.row.auditId);
                            }
                        }
                    }
                },
                this.$t('modules_spoc_sign_web_src_modules_tabledetails_4930')
            );
            let editInfo = params.row.exceptionReceiptCount != '0' ? '' : h(popTipComp, {
                // 履行中更多修改
                props: {
                    actionName: this.$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5694'),
                    buttonList: [
                        { label: this.$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5695'), key: '1' },
                        { label: this.$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5696'), key: '2' },
                        { label: this.$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5697'), key: '3' },
                        { label: this.$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5698'), key: '4' },
                        { label: this.$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5699'), key: '5' }
                    ]
                },
                style: {
                    display: this.myButtonPrem && this.myButtonPrem.indexOf('edit') != -1 ? 'inline-block' : 'none',
                    margin: '3px 6px'
                },
                on: {
                    dropFn: key => {
                        this.normal_ctNo = params.row.ctNo;
                        this.normal_studentId = params.row.studentId;
                        this.normal_studentName = params.row.studentName;
                        this.normal_officeId = params.row.officeId;
                        this.editInfoAction(key);
                    }
                }
            });
            // let editInfo = h( // 履行中更多修改
            // 	'a',
            // 	{
            // 		'class': {
            // 			doInfo: true
            // 		},
            // 		style: {
            // 			margin: '3px 6px'
            // 		},
            // 		on: {
            // 			click: () => {
            // 				this.normal_ctNo = params.row.ctNo
            // 				this.normal_studentId = params.row.studentId
            // 				this.normal_studentName = params.row.studentName
            // 				this.normal_officeId = params.row.officeId
            // 				this.showEditInfo = true
            // 			}
            // 		}
            // 	},
            // 	'修改信息'
            // )
            let buttonList = [];
            if (this.myButtonPrem && this.myButtonPrem.indexOf('print') != -1) {
                buttonList.push({ label: this.$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5724'), key: 'print' });
            }
            if (this.myButtonPrem && this.myButtonPrem.indexOf('log') != -1) {
                buttonList.push({ label: this.$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5725'), key: 'log' });
            }
            if (this.myButtonPrem && this.myButtonPrem.indexOf('uploadSM') != -1) {
                buttonList.push({ label: params.row.isUploaded == '1' ? this.$t('modules_spoc_sign_web_src_views_contractmanage_mycontract_5796'):this.$t('modules_spoc_sign_web_src_views_contractmanage_components_scanningcopymodal_5652'), key: 'scan' });
            }
            if (this.myButtonPrem && this.myButtonPrem.indexOf('downloadScanningCopy') != -1 && params.row.isUploaded == '1') {
                buttonList.push({ label: this.$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5728'), key: 'downloadScan' });
            }
            if (this.myButtonPrem && this.myButtonPrem.indexOf('downloadSkpz') != -1 && params.row.receiptStatus == '1') {
                buttonList.push({ label: this.$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5729'), key: 'downloadSkpz' });
            }
            if (params.row.ctStatusValue == 'normal' || params.row.ctStatusValue == 'close' || params.row.ctStatusValue == 'refund' || params.row.ctStatusValue == 'paying') {
                //履行中 || 已结束 || 已退款 || 待付清
                if (this.myButtonPrem && this.myButtonPrem.indexOf('invoice') != -1) {
                    buttonList.push({ label: params.row.invoiceStatus == '1' ? this.$t('modules_spoc_sign_web_src_modules_addinvoice_4781') : this.$t('modules_spoc_sign_web_src_modules_pactcard_4874'), key: 'invoice' });
                }
            }
            let more = h(popTipComp, {
                props: {
                    actionName: this.$t('views_room_selectcomp_629'),
                    buttonList: buttonList
                },
                style: {
                    margin: '3px 6px',
                    display: 'inline-block'
                },
                on: {
                    dropFn: key => {
                        this.approval({ key: key, row: params.row });
                    }
                }
            });
            if (params.row.ctStatusValue == 'audit') {
                // 待审批
                return [
                    detail,
                    // revamp,
                    // invalid,
                    more
                ];
            }
            if (params.row.ctStatusValue == 'reject') {
                // 已驳回
                return [detail, revamp, invalid, resubmit, more];
            }
            if (params.row.ctStatusValue == 'unpay') {
                // 待付款
                return [detail, shoukuan, invalidContract, more];
            }
            if (params.row.ctStatusValue == 'paying') {
                // 待付清
                return [detail, shoukuan, tuikuan, more];
            }
            if (params.row.ctStatusValue == 'normal') {
                // 履行中
                return [detail, tuikuan, editInfo, more];
            }
            if (params.row.ctStatusValue == 'close' || params.row.ctStatusValue == 'refund' || params.row.ctStatusValue == 'delete') {
                // 已结束  || 已退款 || 已作废
                return [detail, more];
            }
            if (params.row.ctStatusValue == 'draft') {
                // 草稿箱
                return [detail, resubmit, invalid, more];
            }
        },
        setOptTime(flag) {
            if (flag) {
                this.createTime = [];
                this.createTimeChange()
            }
        },
        setOptTime1(flag) {
            if (flag) {
                this.signTime = [];
                this.signTimeChange()
            }
        }
    },
    watch: {
        'app.currOfficeId': function(val, oldVal) {
            if (oldVal && this.$route.name == 'sign.myContract') {
                if (this.app.currOfficeId == 'all') {
                    this.campusIds = [];
                } else {
                    this.campusIds = [this.app.currOfficeId];
                }
                this.doSearch();
                this.getRejectCount();
            }
        },
        '$route.params.studentName': function(val, oldVal) {
            if (val && this.$route.name == 'sign.myContract') {
                if(this.$route.params.studentId){
                    this.studentName = val;
                    this.studentId = this.$route.params.studentId
                    this.studentList = [{
                        id: this.$route.params.studentId,
                        name: val
                    }]
                    this.createTime = [];
                    this.signTime = []
                    this.signTimeChange()
                    this.createTimeChange()
                    this.campusIds = [];
                    this.doSearch();
                }
            }
        }
    }
};
</script>
