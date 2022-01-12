<style lang="less">
.pactDetails {
    padding: 0 !important;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    .ivu-table .tableCellClass {
        color: #44bcb7;
        font-weight: 700;
    }
    .ivu-collapse-content-box {
        padding: 0 !important;
    }
    .mytable {
        margin-top: 0 !important;
    }
    .ivu-anchor-link {
        cursor: pointer;
    }
    .pactDetails_menu {
        width: 220px;
        height: 100%;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        .details_menu_title {
            width: 100%;
            height: 50px;
            font-size: 16px;
            font-weight: 600;
            color: #495060;
            line-height: 50px;
            padding-left: 16px;
            background: #f7f8fa;
        }
        .details_menu_title1 {
            background: #ffffff;
            border-bottom: 1px solid #e6e7eb;
        }
        .brief {
            width: 218px;
            background: #ffffff;
            padding: 12px 16px;
            color: #495060;
            margin-bottom: 8px;
            .brief_info {
                font-size: 14px;
                font-weight: 400;
                line-height: 20px;
                span {
                    color: #999;
                }
                margin-bottom: 2px;
                &:last-child {
                    margin-bottom: 0;
                }
                .goDetail {
                    cursor: pointer;
                    color: #44bcb7;
                }
            }
        }
        .cell {
            flex: 1;
            width: 100%;
            overflow-y: auto;
            .ivu-anchor {
                padding: 0;
                .ivu-anchor-ink:before {
                    display: none;
                }
                .ivu-anchor-link {
                    background: #ffffff;
                    padding-left: 16px;
                    font-size: 14px;
                    font-weight: 400;
                    color: #495060;
                    line-height: 40px;
                    &:hover {
                        background: #ebfcfb;
                        color: #44bcb7;
                    }
                }
                .active {
                    background: #ebfcfb;
                    color: #44bcb7;
                }
            }
        }
    }
    .pactDetails_wrap {
        margin-left: 8px;
        border-radius: 4px;
        height: 100%;
        overflow: auto;
        flex: 1;
        .btnlist {
            background: #ffffff;
            height: 54px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding: 0 10px;
            border-bottom: 1px #e6e7eb solid;
            button {
                margin: 0 6px;
            }
        }
        .case {
            background: #ffffff;
            padding: 0 16px 20px 16px;
            .case_tit {
                font-size: 16px;
                font-weight: 500;
                color: rgba(73, 80, 96, 1);
                line-height: 20px;
                padding: 16px 0;
            }
        }
        .collapse {
            border: none;
            .ivu-collapse-item {
                border: none;
                margin-top: 10px;
                .ivu-collapse-header {
                    display: flex;
                    flex-direction: row-reverse;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 16px;
                    font-weight: 500;
                    color: rgba(73, 80, 96, 1);
                    background: #ffffff;
                    height: 52px;
                    i {
                        font-size: 18px;
                        color: #999999;
                        transform: rotate(90deg);
                    }
                }
                &.ivu-collapse-item-active {
                    .ivu-collapse-header {
                        i {
                            transform: rotate(-90deg);
                        }
                    }
                }
            }
        }
        .ctInfoDetail {
            overflow: hidden;
            padding-top: 16px;
            .ctInfoDetailContent {
                float: left;
                width: 33%;
                font-size: 14px;
                line-height: 32px;
                height: 32px;
                margin-bottom: 12px;
                .ctInfoDetailContentSpan {
                    display: inline-block;
                    color: #999999;
                    width: 70px;
                    text-align: right;
                }
            }
        }
    }
    .pdf-converting {
        height: 20vh;
        box-shadow: 1px 1px 15px #ddd;
        font-size: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: rgba(1, 1, 1, 0.4);
        .text {
            align-self: center;
            color: #fff;
        }
    }
    .handle_table {
        padding: 20px 0;
    }
}
</style>

<template>
    <div class="pactDetails">
        <div class="pactDetails_menu">
            <div class="details_menu_title">{{$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6858')}}</div>
            <div class="brief">
                <p class="brief_info">
                    <span>{{$t('modules_spoc_jw_web_src_views_approval_jwapprovaldetial_2265')}}</span>
                    <span class="goDetail" @click="goDetail">{{ ctInfoSmall.studentName }}</span>
                </p>
                <p class="brief_info">
                    <span>{{$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6860')}}</span>
                    {{ ctInfoSmall.courseHourNumTotal }}
                </p>
                <p class="brief_info">
                    <span>{{$t('modules_spoc_sign_web_src_views_contractrefund_refunddetail_5833')}}</span>
                    {{ ctInfoSmall.remainMoneyCourseHourTotal }} + {{ ctInfoSmall.remainPresentCourseHourTotal < 0 ? 0 : ctInfoSmall.remainPresentCourseHourTotal }}
                </p>
                <p class="brief_info">
                    <span>{{$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6862')}}</span>
                    {{ ctInfoSmall.startTime }}
                </p>
                <p class="brief_info">
                    <span>{{$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6863')}}</span>
                    {{ ctInfoSmall.isInvoice == '1' ? $t('modules_spoc_sign_web_src_modules_pactcard_4877') : $t('modules_spoc_sign_web_src_modules_pactcard_4876') }}
                </p>
            </div>
            <div class="details_menu_title details_menu_title1">{{$t('sign.pactDetails')}}</div>
            <div class="cell">
                <div class="ivu-anchor">
                    <div
                        class="ivu-anchor-link"
                        :class="{ active: item.value == collapse }"
                        @click="onSelectHref(item.value)"
                        v-for="item in menuList"
                        :key="item.value"
                        :title="item.label"
                    >
                        {{ item.label }}
                    </div>
                </div>
            </div>
        </div>
        <div class="pactDetails_wrap">
            <div class="btnlist">
                <Button @click.stop="againPDF" type="primary">{{$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6867')}}</Button>
                <Button v-show="ctInfoSmall.isScan == '1'" type="primary" @click="downloadScanningCopy">{{$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5728')}}</Button>
                <Button type="primary" @click="uploadScanningCopy">{{$t('modules_spoc_sign_web_src_views_contractmanage_components_scanningcopymodal_5652')}}</Button>
                <Button v-show="ctInfoSmall.isContract == '1'" type="primary" @click="downloadCt">{{$t('modules_spoc_sign_web_src_views_mypact_preview_preview_6733')}}</Button>
            </div>
            <div class="case" id="case">
                <div class="case_tit">{{$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6871')}}</div>
                <Table border :columns="caseColumns" :data="caseData" class="case_table"></Table>
            </div>
            <Collapse v-model="collapse" class="collapse" :accordion="true" @on-change="changeCollapse">
                <Panel id="info" name="info">{{$t('modules_spoc_crm_web_src_views_customer360_index_1087')}}<div slot="content" class="ctInfoDetail">
                        <div class="ctInfoDetailContent">
                            <span class="ctInfoDetailContentSpan">{{$t('modules_spoc_sign_web_src_modules_preview_4895')}}</span>
                            {{ info.no }}
                        </div>
                        <div class="ctInfoDetailContent">
                            <span class="ctInfoDetailContentSpan">{{$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6874')}}</span>
                            {{ info.statusVal }}
                        </div>
                        <div class="ctInfoDetailContent">
                            <span class="ctInfoDetailContentSpan">{{$t('modules_spoc_sign_web_src_modules_preview_4894')}}</span>
                            <span v-if="!editHtInfoState">{{ info.signType }}</span>
                            <span v-if="editHtInfoState">
                                <Select v-model="signType" style="width: 150px;" :placeholder="$t('modules_spoc_report_web_src_views_generationleadsreport_index_4608')">
                                    <Option v-for="item in ht_contract_sign_type" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </span>
                        </div>
                        <div class="ctInfoDetailContent">
                            <span class="ctInfoDetailContentSpan">{{$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6877')}}</span>
                            <span v-if="!editHtInfoState">{{ info.signTime }}</span>
                            <span v-if="editHtInfoState">
                                <DatePicker
                                    ref="DatePicker"
                                    v-model="signTime"
                                    type="date"
                                    :transfer="true"
                                    placement="bottom-start"
                                    :placeholder="$t('modules_spoc_crm_web_src_views_transferintroductionmanagement_index_1975')"
                                    style="width:150px;"
                                ></DatePicker>
                            </span>
                        </div>
                        <div class="ctInfoDetailContent">
                            <span class="ctInfoDetailContentSpan">{{$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6862')}}</span>
                            {{ info.startTime }}
                        </div>
                        <div class="ctInfoDetailContent">
                            <span class="ctInfoDetailContentSpan">{{$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6879')}}</span>
                            <span v-if="!editHtInfoState">{{ info.sellerName }}</span>
                            <span v-if="editHtInfoState">
								<Poptip placement="bottom" trigger="hover" width="302">
									<Input v-model="info.sellerName" style="width: 150px;" readonly></Input>
									<div class="api" slot="content">
										<Select size="small" v-model="roleId" style="width: 100px;margin-bottom:12px;margin-right:12px;" :placeholder="$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6880')">
											<Option v-show="selectedRoles.indexOf(item.id) > -1" v-for="item in roleList" :value="item.id" :key="item.id">{{item.name}}</Option>
										</Select>
										<Input size="small" v-model="sellerNameKey" style="width:100px;margin-bottom:12px;margin-right:12px;" :placeholder="$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6881')"></Input>
										<Button size="small" type="primary" style="margin-bottom:12px;" @click="listDataByRole">{{$t('modules_rolepeople_210')}}</Button>
										<Table style="border-top:1px solid #EEE;" :show-header="false"  size="small" :max-height="200" :width="270" :columns="columns1" :data="roleUserList"></Table>
									</div>
								</Poptip>
								<!-- <Select v-model="sellerId" style="width: 150px;" :placeholder="$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4476')">
									<Option v-for="item in roleUserList" :value="item.id" :key="item.id">{{item.name}}</Option>
								</Select> -->
							</span>
                        </div>
                        <div class="ctInfoDetailContent">
                            <span class="ctInfoDetailContentSpan">{{$t('modules_spoc_crm_web_src_views_customer360_components_signlists_869')}}</span>
                            <p style="display:inline;font-weight:700;">{{ info.price }}</p>
                        </div>
                        <div class="ctInfoDetailContent">
                            <span class="ctInfoDetailContentSpan">{{$t('modules_spoc_sign_web_src_modules_preview_4905')}}</span>
                            <p style="color: #44BCB7;display:inline;font-weight:700;">{{ info.signPrice }}</p>
                        </div>
                        <div style="clear:both;padding-bottom:20px;">
                            <Button type="primary" @click="editHtInfo">{{ editHtInfoState ? $t('courselist_compontents_servicecontent_215') : $t('modules_expandrow_15') }}</Button>
                        </div>
                    </div>
                </Panel>
                <Panel id="preview" name="preview">
                    <div>{{$t('sign.preview')}}<!--  <Button @click.stop="againPDF" type="primary" style="margin-left:20px;">{{$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6867')}}</Button> --></div>
                    <div slot="content">
                        <!-- <div class="handle_table" v-if="ctInfoSmall.isContract == '0'">{{$t('modules_spoc_sign_web_src_modules_preview_4911')}}</div> -->
                        <!-- <iframe class="pdfviewer" v-else-if="pdfurl" :src="pdfurl" style="width:100%;" height="500"></iframe> -->
                        <div ref="cpdf" v-if="pdfurl" class="pdfBox" style="text-align:center;">
                            <canvas v-for="n in viewHt.page_count" :key="n" class="canvasstyle" :id="'canvasviewHt'+n" :ref="'canvasviewHt'+n"></canvas>
                        </div>
                        <div class="pdf-converting" v-if="previewProgress==100&&pdfurl && viewHt.isloading"><p class="text">{{$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6890')}}</p></div>
                        <div class="pdf-converting" v-else-if="previewProgress==-99"><p class="text">{{previewMsg}}</p></div>
                        <div class="pdf-converting" v-else-if="previewProgress>=0&&previewProgress<100">
                            <p class="text">【 转码中请稍后！】</p>
                            <p style="width: 400px;"><Progress :percent="previewProgress" :stroke-width="20" text-inside :stroke-color="['#17b6a5', '#17b6a5']"/></p>
                        </div>
                        <div class="pdf-converting" v-show="!pdfurl" v-else>
                        </div>
                    </div>
                </Panel>
                <Panel id="deal" name="deal">{{$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6891')}}<div slot="content">
                        <!-- <div class="handle_table" v-if="ctInfoSmall.isProtocol == '0'">{{$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6892')}}</div>
                        <iframe class="pdfviewer" v-else-if="pdfurl1" :src="pdfurl1" style="width:100%;" height="500"></iframe> -->
                        <div v-if="isProtocol">
                            <div ref="cpdf1" v-if="pdfurlProtocol" class="pdfBox" style="text-align:center;">
                                <canvas v-for="n in viewProtocol.page_count" :key="n" class="canvasstyle" :id="'canvasviewProtocol'+n" :ref="'canvasviewProtocol'+n"></canvas>
                            </div>
                            <div class="pdf-converting" v-if="dealProgress==100&&pdfurlProtocol && viewProtocol.isloading"><p class="text">{{$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6890')}}</p></div>
                            <div class="pdf-converting" v-else-if="dealProgress==-99"><p class="text">{{dealMsg}}</p></div>
                            <div class="pdf-converting" v-else-if="dealProgress>=0&&dealProgress<100">
                                <p class="text">【 转码中请稍后！】</p>
                                <p style="width: 400px;"><Progress :percent="dealProgress" :stroke-width="20" text-inside :stroke-color="['#17b6a5', '#17b6a5']"/></p>
                            </div>
                            <div class="pdf-converting" v-show="!pdfurlProtocol" v-else>
                            </div>
                        </div>
                        <div v-else>
                            <div class="pdf-converting">
                                <p class="text">当前合同没有补充协议</p>
                            </div>
                        </div>
                    </div>
                </Panel>
                <Panel id="account" name="account">{{$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6893')}}<div slot="content"><capital-flow :ctNo="ctNo" v-if="show_account && ctNo" style="margin-top:0;"></capital-flow></div>
                </Panel>
                <Panel id="receiptManagement" name="receiptManagement">{{$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6894')}}<div slot="content">
                        <receipt-management
                            :ctNo="ctNo"
                            :ctStudnetId="ctInfoSmall.studentId"
                            :ctStudnetName="ctInfoSmall.studentName"
                            v-if="show_receiptManagement && ctNo"
                            style="margin-top:0;"
                        ></receipt-management>
                    </div>
                </Panel>
                <Panel id="package" name="package">{{$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6895')}}<div slot="content">
                        <package-change
                            :ctNo="ctNo"
                            :ctId="ctId"
                            :ctStudnetId="ctInfoSmall.studentId"
                            :ctStudnetName="ctInfoSmall.studentName"
                            v-if="show_package && ctNo"
                            style="margin-top:0;"
                        ></package-change>
                    </div>
                </Panel>
                <Panel id="cro" name="cro">{{$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6896')}}<div slot="content">
                        <contract-transfer-center
                            :ctNo="ctNo"
                            :ctStudnetId="ctInfoSmall.studentId"
                            :ctStudnetName="ctInfoSmall.studentName"
                            v-if="show_cro && ctNo"
                            style="margin-top:0;"
                        ></contract-transfer-center>
                    </div>
                </Panel>
                <Panel id="lessons" name="lessons">{{$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6897')}}<div slot="content">
                        <refund-give-class
                            :ctNo="ctNo"
                            :ctStudnetId="ctInfoSmall.studentId"
                            :ctStudnetName="ctInfoSmall.studentName"
                            :ctOfficeId="ctInfoSmall.officeId"
                            v-if="show_lessons && ctNo"
                            style="margin-top:0;"
                        ></refund-give-class>
                    </div>
                </Panel>
                <Panel id="leave" name="leave">{{$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6898')}}<div slot="content">
                        <edit-leave-num
                            :ctNo="ctNo"
                            :ctStudnetId="ctInfoSmall.studentId"
                            :ctStudnetName="ctInfoSmall.studentName"
                            :ctOfficeId="ctInfoSmall.officeId"
                            v-if="show_leave && ctNo"
                            style="margin-top:0;"
                        ></edit-leave-num>
                    </div>
                </Panel>
                <Panel id="validity" name="validity">{{$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6899')}}<div slot="content">
                        <course-validity-adjustment
                            :ctNo="ctNo"
                            :ctStudnetId="ctInfoSmall.studentId"
                            :ctStudnetName="ctInfoSmall.studentName"
                            :ctOfficeId="ctInfoSmall.officeId"
                            v-if="show_validity && ctNo"
                            style="margin-top:0;"
                        ></course-validity-adjustment>
                    </div>
                </Panel>
                <Panel id="premium" name="premium">{{$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6900')}}<div slot="content"><contract-refund :ctNo="ctNo" :ctInfoSmall="ctInfoSmall" v-if="show_premium && ctNo" style="margin-top:0;"></contract-refund></div>
                </Panel>
                <Panel id="invoice" name="invoice">{{$t('modules_spoc_sign_web_src_modules_addinvoice_4781')}}<div slot="content">
                        <invoice-info v-if="ctId && ctInfoSmall.isInvoice == '1'" :ctId="ctId"></invoice-info>
                        <!-- 可以开票  params.row.ctStatusValue == 'normal' || params.row.ctStatusValue == 'close' || params.row.ctStatusValue =='refund' || params.row.ctStatusValue == 'paying' -->
                        <div class="handle_table" v-else>{{$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6902')}}<Button type="primary" @click="kp" v-show="info.status == 'normal' || info.status == 'close' || info.status == 'refund' || info.status == 'paying'">{{$t('modules_spoc_sign_web_src_modules_pactcard_4874')}}</Button>
                        </div>
                    </div>
                </Panel>
                <Panel name="handle">{{$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6904')}}<div class="handle_table" slot="content"><list-opt-log-modal-table :ctId="ctId" v-if="ctId"></list-opt-log-modal-table></div>
                </Panel>
                <div id="handle" :style="{ 'margin-bottom': (collapse == 'handle' ? 100 : 0) + 'px' }"></div>
            </Collapse>
        </div>
        <scanning-copy-modal ref="scanningCopyModal" @updataTable="updataTable"></scanning-copy-modal>
        <add-invoice ref="invoiceModel" :isShowinfor="isShowinfor" @updataTable="updataInvoice"></add-invoice>
    </div>
</template>
<script>
import valid, { errors, htContract, common, sysDict, sysUser, sysCommonSql, sysAttachment, sysConfig, sysRole, api } from '../../libs/request';
import { mapGetters, mapState, mapMutations } from 'vuex';
import listOptLogModalTable from '../contractManage/components/listOptLogModalTable';
import invoiceInfo from './components/invoiceInfo';
import scanningCopyModal from '../contractManage/components/scanningCopyModal';
import editLeaveNum from '../editLeaveNum/editLeaveNum';
import refundGiveClass from '../refundGiveClass/refundGiveClass';
import courseValidityAdjustment from '../courseValidityAdjustment/courseValidityAdjustment';
import contractRefund from '../contractRefund/contractRefund';
import packageChange from '../packageChange/packageChange';
import addInvoice from '../../modules/addInvoice';
import capitalFlow from '../capitalFlow/capitalFlow';
import contractTransferCenter from '../contractTransferCenter/contractTransferCenter';
import receiptManagement from '../receiptManagement/receiptManagement';
import PDFJS from 'pdfjs-dist';
PDFJS.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.min');
export default {
    computed:{
    },
    mounted() {
        this.getRoleList()
        this.init();
        this.batchListData();
    },
    beforeDestroy(){
        clearInterval(this.previewTimer)
        clearInterval(this.dealTimer)
    },
    components: {
        listOptLogModalTable,
        invoiceInfo,
        scanningCopyModal,
        editLeaveNum,
        refundGiveClass,
        courseValidityAdjustment,
        contractRefund,
        packageChange,
        addInvoice,
        capitalFlow,
        contractTransferCenter,
        receiptManagement
    },
    data() {
        return {
            viewHt:{
                isloading: false,
                pdfDoc: null, //pdfjs 生成的对象
                pageNum: 1, //
                pageRendering: false,
                pageNumPending: null,
                page_num: 0, //当前页数
                page_count: 0, //总页数
            },
            viewProtocol:{
                isloading: false,
                pdfDoc: null, //pdfjs 生成的对象
                pageNum: 1, //
                pageRendering: false,
                pageNumPending: null,
                page_num: 0, //当前页数
                page_count: 0, //总页数
            },
            pdfurlProtocol: '',
            wid: 948, //刚进入页面中的pdf容器的宽度
            scale: null, //放大倍数
            pdfInfo: [],
            cusId: '',
            isShowinfor: true,
            show_leave: false,
            show_lessons: false,
            show_package: false,
            show_receiptManagement: false,
            show_account: false,
            show_premium: false,
            show_validity: false,
            show_cro: false,
            pdfurl: '', //主合同
            pdfurl1: '', //补充协议
            ctId: '',
            ctNo: '',
            ctInfoSmall: {
                isInvoice: '0', //有无发票 默认无
                isScan: '0', //有无扫描件  默认无
                isContract: '0', //有无合同  默认无
                isProtocol: '0' //有无补充协议  默认无
            },
            info: {},
            menuList: [
                {
                    label: this.$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6871'),
                    value: 'case'
                },
                {
                    label: this.$t('modules_spoc_crm_web_src_views_customer360_index_1087'),
                    value: 'info'
                },
                {
                    label: this.$t('sign.preview'),
                    value: 'preview'
                },
                {
                    label: this.$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6891'),
                    value: 'deal'
                },
                {
                    label: this.$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6894'),
                    value: 'receiptManagement'
                },
                {
                    label: this.$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6893'),
                    value: 'account'
                },
                {
                    label: this.$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6895'),
                    value: 'package'
                },
                {
                    label: this.$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6896'),
                    value: 'cro'
                },
                {
                    label: this.$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6897'),
                    value: 'lessons'
                },
                {
                    label: this.$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6898'),
                    value: 'leave'
                },
                {
                    label: this.$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6899'),
                    value: 'validity'
                },
                {
                    label: this.$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6900'),
                    value: 'premium'
                },
                {
                    label: this.$t('modules_spoc_sign_web_src_modules_addinvoice_4781'),
                    value: 'invoice'
                },
                {
                    label: this.$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6904'),
                    value: 'handle'
                }
            ],
            collapse: 'case',
            caseColumns: [
                {
                    title: this.$t('mycourse_mycourse_380'),
                    key: 'courseName',
                    minWidth: 85,
                    resizable: true,
                    width: null
                },
                {
                    title: this.$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2134'),
                    key: 'remainMoneyCourseHour',
                    minWidth: 85,
                    resizable: true,
                    width: null,
                    align: 'right',
                    render: (h, params) => {
                        return h(
                            'div',
                            {},
                            params.row.remainPresentCourseHour
                                ? params.row.remainMoneyCourseHour + ' + ' + (params.row.remainPresentCourseHour < 0 ? 0 : params.row.remainPresentCourseHour)
                                : params.row.remainMoneyCourseHour
                        );
                    }
                },
                {
                    title: this.$t('modules_spoc_sign_web_src_views_expiredcontract_index_6557'),
                    key: 'leftCoursePrice',
                    minWidth: 85,
                    align: 'right',
                    resizable: true,
                    width: null
                },
                {
                    title: this.$t('views_coursepack_coursepack_379'),
                    key: 'courseHourNum',
                    minWidth: 74,
                    align: 'right',
                    resizable: true,
                    width: null
                },
                {
                    title: this.$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6909'),
                    key: 'coursePrice',
                    minWidth: 85,
                    align: 'right',
                    resizable: true,
                    width: null
                },
                {
                    title: this.$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6910'),
                    key: 'costNum',
                    minWidth: 62,
                    align: 'right',
                    resizable: true,
                    width: null
                },
                {
                    title: this.$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6911'),
                    key: 'costTotal',
                    minWidth: 85,
                    align: 'right',
                    resizable: true,
                    width: null
                },
                {
                    title: this.$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6912'),
                    key: 'transferHour',
                    minWidth: 100,
                    align: 'right',
                    resizable: true,
                    width: null
                },
                {
                    title: this.$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6913'),
                    key: 'transferPrice',
                    minWidth: 100,
                    align: 'right',
                    resizable: true,
                    width: null
                },
                {
                    title: this.$t('modules_spoc_sign_web_src_views_contractrefund_contractrefund_5813'),
                    key: 'backCourseNum',
                    minWidth: 85,
                    align: 'right',
                    resizable: true,
                    width: null
                },
                {
                    title: this.$t('modules_spoc_sign_web_src_modules_pactcard_4892'),
                    key: 'backCoursePrice',
                    minWidth: 62,
                    align: 'right',
                    resizable: true,
                    width: null
                },
                {
                    title: this.$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6916'),
                    key: 'otherCostNum',
                    minWidth: 85,
                    align: 'right',
                    resizable: true,
                    width: null
                },
                {
                    title: this.$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6917'),
                    key: 'otherCostPrice',
                    minWidth: 74,
                    align: 'right',
                    resizable: true,
                    width: null
                },
                {
                    title: this.$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6918'),
                    key: 'changeHour',
                    minWidth: 74,
                    align: 'right',
                    resizable: true,
                    width: null
                },
                {
                    title: this.$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6919'),
                    key: 'changePrice',
                    minWidth: 74,
                    align: 'right',
                    resizable: true,
                    width: null
                },
                {
                    title: this.$t('views_coursepack_coursepackgroup_450'),
                    key: 'validDate',
                    minWidth: 74,
                    resizable: true,
                    width: null,
                    render: (h, params) => {
                        let str1 = params.row.validDate ? params.row.validDate + this.$t('message_socket_302') : '';
                        let str2 = '';
                        if (params.row.validDay && params.row.validDay != '0') {
                            let month = Math.abs(parseInt(Number(params.row.validDay) / 30));
                            let monthStr = month ? month + this.$t('message_socket_302') : '';
                            let day = Math.abs(Number(params.row.validDay) % 30);
                            let dayStr = day ? day + this.$t('message_socket_304') : '';
                            str2 = (Number(params.row.validDay) > 0 ? ' +' : ' -') + monthStr + dayStr;
                        }
                        return h('div', {}, str1 + str2);
                    }
                },
                {
                    title: this.$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6923'),
                    key: 'validDateUnit',
                    minWidth: 85,
                    resizable: true,
                    width: null,
                    render: (h, params) => {
                        return h('div', {}, params.row.isValid ? params.row.validDateUnit + this.$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6924') : params.row.validDateUnit || '');
                    }
                }
            ],
            caseData: [],
            handleColumns: [
                {
                    title: this.$t('courselist_compontents_detailinfo_160'),
                    type: 'index',
                    key: 'date',
                    align: 'center',
                    resizable: true,
                    width: null
                },
                {
                    title: this.$t('integralflow_10'),
                    key: 'name',
                    align: 'center',
                    resizable: true,
                    width: null
                },
                {
                    title: this.$t('classlist_compontents_detailinfo_45'),
                    key: 'age',
                    align: 'center',
                    resizable: true,
                    width: null
                },
                {
                    title: this.$t('messagemanagement_components_histroylists_313'),
                    key: 'addres',
                    align: 'center',
                    resizable: true,
                    width: null
                }
            ],
            handleData: [],
            baseList: [
                { title: this.$t('modules_spoc_sign_web_src_modules_addinvoice_4817'), key: 'type' },
                { title: this.$t('modules_spoc_sign_web_src_modules_addinvoice_4782'), key: 'title' },
                { title: this.$t('modules_spoc_sign_web_src_modules_addinvoice_4818'), key: 'subType' },
                { title: this.$t('modules_spoc_sign_web_src_modules_addinvoice_4819'), key: 'category' },
                { title: this.$t('modules_spoc_crm_web_src_views_onsitemanagement_onsitemanagement_1436'), key: 'phone' },
                { title: this.$t('modules_spoc_sign_web_src_modules_addinvoice_4821'), key: 'taxNo' },
                { title: this.$t('modules_spoc_sign_web_src_modules_addinvoice_4822'), key: 'address' },
                { title: this.$t('modules_spoc_sign_web_src_modules_addinvoice_4823'), key: 'bankName' },
                { title: this.$t('modules_spoc_sign_web_src_modules_addinvoice_4824'), key: 'bankAccount' },
                { title: this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3111'), key: 'remarks' },
                { title: this.$t('modules_spoc_portal_views_workbenchnew_lists_index_4276'), key: 'updateByName' }
            ],
            editHtInfoState: false,
            ht_contract_sign_type: [],
            signType: '',
            signTime: '',
            sellerId: '',
            roleUserList: [],
            officeId: '',
            roleId: '',
            selectedRoles: [],
            sellerNameKey: '',
            roleList: [],
            columns1:[
                {
                    title: this.$t('modules_rolemanage_186'),
                    key: 'name',
                    align: 'left',
                    width: 200,
                },
                {
                    title: this.$t('classlist_compontents_detailinfo_45'),
                    key: 'doAction',
                    width: 60,
                    render: (h, params) => {
                        return h(
                            'a',
                            {
                                on: {
                                    click: () => {
                                        this.info.sellerName = params.row.name
                                        this.sellerId = params.row.id
                                    }
                                }
                            },
                            this.$t('spoc_hootie_web_282')
                        )
                    }
                },
            ],
            previewTimer:'',
            previewProgress: -1,
            previewMsg:'',
            dealTimer:'',
            dealProgress: -1,
            dealMsg:'',
            isProtocol: false
        };
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        loadPdf(pdfurl, type){
            let that = this
            this.updateLoadingStatus({ isLoading: true });
            PDFJS.getDocument(pdfurl).then((pdfDoc_) => { //初始化pdf
                that[type].isloading = false
                that[type].pdfDoc = pdfDoc_;
                that[type].page_count = that[type].pdfDoc.numPages;
                console.log(that[type].page_count, that[type].pdfDoc)
                that.$nextTick(() => {
                    that.updateLoadingStatus({ isLoading: false });
                    for(let i = 1; i <= that[type].page_count; i++) {
                        that.renderPage(i,type);
                    }
                })
            }).catch((error)=>{
                console.log(error,this.$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6942'))
                that[type].isloading = true
                that.updateLoadingStatus({ isLoading: false });
            });
        },
        renderPage(num, type) { //渲染pdf
            let vm = this
            this[type].pageRendering = true;
            let canvas = document.getElementById('canvas'+ type + num); // Using promise to fetch the page
            vm[type].pdfDoc.getPage(num).then(function(page) {
                vm.scale = vm.wid / page.getViewport(1.0).width;
                //vm.wid是在data中定义的一个变量，最初设置的pdf的宽度
                var viewport = page.getViewport(vm.scale);
                // var viewport = page.getViewport(vm.scale); //alert(vm.canvas.height)
                canvas.height = viewport.height;
                canvas.width = viewport.width; // Render PDF page into canvas context
                console.log(canvas)
                let ctx = canvas.getContext('2d');
                var renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                };
                var renderTask = page.render(renderContext); // Wait for rendering to finish
                renderTask.promise.then(function() {
                    vm[type].pageRendering = false;
                    if(vm[type].pageNumPending !== null) { // New page rendering is pending
                        vm.renderPage(vm[type].pageNumPending);
                        vm[type].pageNumPending = null;
                    }
                });
            });
            vm[type].page_num = vm[type].pageNum;
        },
        againPDF(){
            this.updateLoadingStatus({ isLoading: true });
            htContract
                .againPDF({
                    ctId: this.ctId,
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.collapse=[];
                        // this.previewTimer='';
                        this.pdfurl='';
                        if(this.previewTimer){
                            window.clearInterval(this.previewTimer)
                        }
                        this.previewProgress= -1;
                        this.previewMsg='';
                        // this.dealTimer='';
                        this.pdfurlProtocol='';
                        if(this.dealTimer){
                            window.clearInterval(this.dealTimer)
                        }
                        this.dealProgress= -1;
                        this.dealMsg='';
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        getRoleList(){
            sysRole.roleList({}).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.roleList = res.data.data.roleList;
                }
            })
            .catch(errors.call(this))
            .finally(() => {

            });
        },
        batchListData() {
            let types = 'ht_contract_sign_type';
            sysDict
                .batchListData({
                    types
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.ht_contract_sign_type = res.data.data.ht_contract_sign_type;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
        },
        editHtInfo() {
            this.editHtInfoState = !this.editHtInfoState;

            if (!this.editHtInfoState) {
                this.updateLoadingStatus({ isLoading: true });
                htContract
                    .saveData({
                        id: this.ctId,
                        sellerId: this.sellerId,
                        signDate: new Date(this.signTime).format('yyyy-MM-dd 00:00:00'),
                        signType: this.signType,
                        officeId: this.officeId
                    })
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            this.init();
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {
                        this.sellerNameKey = ''
                        this.updateLoadingStatus({ isLoading: false });
                    });
            }
        },
        init() {
            this.ctId = '';//this.$route.query.id
            this.ctNo = this.$route.query.ctNo;
            if (this.ctId) {
                // 历史，暂时不会走改判断
                this.getContractInformation();
                this.getContractServiceCondition();
                this.getContractDetailInfo();
            } else if (this.ctNo) {
                htContract
                    .form({
                        ctNo: this.ctNo
                    })
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            this.ctId = res.data.data.id;
                            this.cusId = res.data.data.cusId;
                            this.signType = res.data.data.signType;
                            this.getContractInformation();
                            this.getContractServiceCondition();
                            this.getContractDetailInfo();
                            this.officeId = res.data.data.htSign.officeId;
                            this.sellerId = res.data.data.sellerId;
                            this.isProtocol = res.data.data.isProtocol == '1' // 是否有补充协议
                            this.getRoleConfig()
							// this.listDataByRole(officeId)
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {});
            }
            if (this.$route.query.id) {
                // sysAttachment
                //     .findList({
                //         objectIds: this.$route.query.id
                //     })
                api.findAttachmentByBizTypesAndBizIds({
                        bizIds: this.$route.query.id
                    })
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            this.pdfInfo = res.data.data;
                            // if(this.ctInfoSmall.isContract == '1'){ //有合同
                            //this.pdfurl = this.pdfInfo.find(v => v.type == 'ht_contract') ? this.pdfInfo.find(v => v.type == 'ht_contract').filePath : false;
                            // }
                            // if(this.ctInfoSmall.isProtocol == '1'){ //有补充协议
                            this.pdfurl1 = this.pdfInfo.find(v => v.type == 'ht_contract_protocol') ? this.pdfInfo.find(v => v.type == 'ht_contract_protocol').filePath : false;
                            // }
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {});
            }
        },
        getRoleConfig(){
            sysConfig.getConfig({
                menuId: 5001,
                configId: 'ct:sellerRoleId'
            }).then(valid.call(this)).then((res) => {
                if (res.ok) {
                    let _data = res.data.data;
                    this.selectedRoles = _data.roleIds
                    this.roleId = this.selectedRoles[0]
                    this.listDataByRole()
                }
            }).catch(errors.call(this)).finally(() => {
            });
        },
        listDataByRole(){
            sysUser
            .listDataByRole({
                officeIds: this.officeId,
                pageSize:-1,
                roleIds: this.roleId,
                name: this.sellerNameKey
            })
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.roleUserList = res.data.data
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },
        goDetail() {
            this.$router.push({
                name: 'crm.customer360',
                query: {
                    id: this.cusId
                }
            });
        },
        updataInvoice() {
            this.$set(this.ctInfoSmall, 'isInvoice', 1);
        },
        kp() {
            this.isShowinfor = this.ctInfoSmall.invoiceStatus != 1;
            this.ctInfoSmall.id = this.ctId;
            this.$refs.invoiceModel.show(this.ctInfoSmall);
        },
        changeCollapse(val) {
            console.log(val);
            if (val.length) {
                this.collapse = val[0];
                this['show_' + val[0]] = true;
            }
            if(val.indexOf('preview')!=-1){
                this.previewTimer=setInterval(()=>{
                    if(this.ctId&&!this.pdfurl){
                        htContract.getPdfConverterProgress({ctId:this.ctId,type:'ht:contract:pdf:converter'})
                            .then(valid.call(this))
                            .then(res => {
                                if (res.ok) {
                                    let response=res.data.data;
                                    if(response.percent==100){
                                        this.previewProgress=response.percent;
                                        setTimeout(()=>{
                                            this.pdfurl = htContract.displayUrl(
                                                { 
                                                    id:this.ctId,
                                                    type:'HT_CONTRACT',
                                                    tenant: localStorage.getItem('tenant'),
                                                    // token: localStorage.getItem('token')
                                                }
                                            )
                                            console.log(this.pdfurl,"this.pdfurl")
                                        },1000)
                                        window.clearInterval(this.previewTimer);
                                    // console.log(this.pdfurl,'pdfurl~~~~~~~·')
                                    }else if(response.percent==-99){
                                        window.clearInterval(this.previewTimer);
                                        this.previewProgress=response.percent;
                                        this.previewMsg=response.errorMsg;
                                    }else{
                                        this.previewProgress=response.percent;
                                    }
                                }
                            })
                            .catch(errors.call(this))
                            .finally(() => {
                            });
                    }
                },1000)
            }
            if(val.indexOf('deal')!=-1 && this.isProtocol){
                this.dealTimer=setInterval(()=>{
                    if(this.ctId&&!this.pdfurlProtocol){
                        htContract.getPdfConverterProgress({ctId:this.ctId,type:'ht:contract:protocol:pdf:converter'})
                            .then(valid.call(this))
                            .then(res => {
                                if (res.ok) {
                                    let response=res.data.data;
                                    if(response.percent==100){
                                        this.dealProgress=response.percent;
                                        window.clearInterval(this.dealTimer);
                                        setTimeout(()=>{
                                            this.pdfurlProtocol = htContract.displayUrl({
                                                id:this.ctId,
                                                type:'HT_CONTRACT_PROTOCOL',
                                                tenant: localStorage.getItem('tenant'),
                                                // token: localStorage.getItem('token')
                                            })
                                        },1000)
                                        // console.log(this.pdfurlProtocol,'pdfurlProtocol~~~~~~~·')
                                    }else if(response.percent==-99){
                                        window.clearInterval(this.dealTimer);
                                        this.dealProgress=response.percent;
                                        this.dealMsg=response.errorMsg;
                                    }else{
                                        this.dealProgress=response.percent;
                                    }
                                }
                            })
                            .catch(errors.call(this))
                            .finally(() => {
                            });
                    }
                },1000)
            }
        },
        //下载合同
        downloadCt() {
            let url = htContract.downloadUrl(this.ctId);
            window.open(url);
        },
        //上传完扫描件后更新页面按钮状态
        updataTable() {
            this.ctInfoSmall.isScan = '1';
        },
        //下载扫描件
        downloadScanningCopy() {
            let url = htContract.downloadSignReceipt({
                objectId: this.ctId,
                type: 'HT_CONTRACT_SCAN',
                templateName: this.$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6943')
            });
            window.open(url);
        },
        //上传扫描件
        uploadScanningCopy() {
            this.$refs.scanningCopyModal.show(this.ctId);
        },
        //切换内容区显示
        onSelectHref(href) {
            console.log(href);
            this.collapse = href;
            this.$nextTick(() => {
                document.querySelector('#' + href).scrollIntoView(true);
            });
            this['show_' + href] = true;
            this.changeCollapse([href])
        },
        //获取合同详情信息
        getContractDetailInfo() {
            htContract
                .getContractDetailInfo({
                    ctId: this.ctId
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.sellerNameKey = ''
                        this.info = res.data.data;
                        console.log(this.info,"this.info~~")
                        this.signTime = res.data.data.signTime;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
        },
        //获取合同详情简要信息
        getContractInformation() {
            htContract
                .getContractInformation({
                    ctId: this.ctId
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.ctInfoSmall = res.data.data || {};
                        console.log(this.ctInfoSmall);
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
        },
        //获取使用情况
        getContractServiceCondition() {
            htContract
                .getContractServiceCondition({
                    ctId: this.ctId
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.caseData = res.data.data.detail;
                        let totalData = res.data.data.comStudentCourseRelTotalVO || {};
                        let totalObj = {
                            courseName: this.$t('teachpush_slidecard_625'),
                            remainMoneyCourseHour: totalData.remainMoneyCourseHourTotal,
                            remainPresentCourseHour: totalData.remainPresentCourseHourTotal,
                            leftCoursePrice: totalData.leftCoursePriceTotal,
                            courseHourNum: totalData.courseHourNumTotal,
                            coursePrice: totalData.coursePriceTotal,
                            costNum: totalData.costNumTotal,
                            costTotal: totalData.costTotals,
                            transferHour: totalData.transferHourTotal,
                            transferPrice: totalData.transferPriceTotal,
                            backCourseNum: totalData.backCourseNumTotal,
                            backCoursePrice: totalData.backCoursePriceTotal,
                            otherCostNum: totalData.otherCostNumTotal,
                            otherCostPrice: totalData.otherCostPriceTotal,
                            changeHour: totalData.changeHourTotal,
                            changePrice: totalData.changePriceTotal,
                            validDate: '',
                            validDateUnit: '',
                            isValid: '',
                            cellClassName: {
                                remainMoneyCourseHour: 'tableCellClass',
                                leftCoursePrice: 'tableCellClass',
                                courseHourNum: 'tableCellClass',
                                coursePrice: 'tableCellClass',
                                costNum: 'tableCellClass',
                                costTotal: 'tableCellClass',
                                transferHour: 'tableCellClass',
                                transferPrice: 'tableCellClass',
                                backCourseNum: 'tableCellClass',
                                backCoursePrice: 'tableCellClass',
                                otherCostNum: 'tableCellClass',
                                otherCostPrice: 'tableCellClass',
                                changeHour: 'tableCellClass',
                                changePrice: 'tableCellClass'
                            }
                        };
                        this.caseData.push(totalObj);
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
        },
    },
    watch: {
        '$route.query.ctNo': function(val, oldVal) {
            this.init();
            this.$el.querySelector('.pactDetails_wrap').scrollTop=0;
        },
        ctId:{
            handler: function (params) {
            }
        },
        pdfurl: {
            handler: function(val, oldVal) {
                if(val) {
                    this.loadPdf(this.pdfurl, 'viewHt')
                }
            },
            deep: true,
            immediate: true
        },
        pdfurlProtocol: {
            handler: function(val, oldVal) {
                if(val) {
                    this.loadPdf(this.pdfurlProtocol, 'viewProtocol')
                }
            },
            deep: true,
            immediate: true
        },
    }
};
</script>
