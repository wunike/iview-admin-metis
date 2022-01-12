<style lang="less">
.transfer-center-container {
    .Tabs {
        background-color: #ffffff;
        .ivu-tabs-bar {
            margin-bottom: 0;
        }
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
        > span {
            margin-right: 10px;
            color: #999999;
            font-size: 14px;
            line-height: 30px;
        }
    }
    .center-right {
        width: 400px;
    }
}

.table-details-to-center {
    background: #f2f3f7;
    padding-top: 20px;
    padding-bottom: 4px;
    padding-left: 120px;
    .flexRow {
        display: flex;
        flex-direction: row;
    }
    .tdv-item {
        .flexRow;
        justify-content: flex-start;
        align-items: flex-start;
        padding-bottom: 16px;
        > span {
            display: inline-block;
            width: 100px;
            text-align: right;
            padding-right: 10px;
        }
    }
    .tdv-item-right {
        width: 700px;
    }
    .cp-course-item {
        height: 444px;
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
</style>

<template>
    <div class="transfer-center-container">
        <Tabs v-model="tabType" class="Tabs" @on-click="tabsChange">
            <TabPane :label="$t('modules_spoc_sign_web_src_views_contracttransfercenter_contracttransfercenter_6014')" name="out"></TabPane>
            <TabPane :label="$t('modules_spoc_sign_web_src_views_contracttransfercenter_contracttransfercenter_6015')" name="in"></TabPane>
        </Tabs>
        <v-search-collapse v-if="!ctNo" @search="searchInfo" @reset="resetSearch" @changeDivHeight="changeDivHeight">
            <DatePicker
                v-model="searchBox.commitTime"
                type="daterange"
                separator=" ~ "
                :placeholder="$t('principalmailbox_index_490')"
                style="width: 224px;margin-right:12px;"
                @on-change="commitTimeChange"
                ref="DatePicker"
                split-panels
                :options="options"
                @on-open-change="setOptTime"
            ></DatePicker>
            <DatePicker
                v-model="searchBox.auditTime"
                type="daterange"
                separator=" ~ "
                :placeholder="$t('modules_spoc_sign_web_src_views_contracttransfercenter_contracttransfercenter_6017')"
                style="width: 224px;margin-right:12px;"
                @on-change="auditTimeChange"
                ref="DatePicker1"
                split-panels
                :options="options1"
                @on-open-change="setOptTime1"
            ></DatePicker>
            <Select
                :placeholder="$t('modules_spoc_crm_web_src_views_clientareaaround_clientareaaround_781')"
                v-model="searchBox.officeId"
                clearable
                style="width:224px;margin-right:12px;"
            >
                <Option v-for="item in officeList" :value="item.id" :key="item.id">{{ item.code }}{{ item.name }}</Option>
            </Select>
            <Input v-model="searchBox.stuName" :placeholder="$t('memberlist_memberlist_257')" style="width: 140px;margin-right:12px;" />
            <Input
                v-model="searchBox.outCourseName"
                :placeholder="$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_takecourse_5889')"
                style="width: 140px;margin-right:12px;"
            />
            <Input
                v-model="searchBox.inCourseName"
                :placeholder="$t('modules_spoc_sign_web_src_views_contracttransfercenter_contracttransfercenter_6021')"
                style="width: 140px;margin-right:12px;"
            />
            <Select
                :placeholder="$t('modules_spoc_sign_web_src_views_contracttransfercenter_contracttransfercenter_6022')"
                v-model="searchBox.commitId"
                clearable
                style="width:180px;margin-right:12px;"
            >
                <Option v-for="item in commitList" :value="item.value" :key="item.value">{{ item.name }}</Option>
            </Select>
            <!-- <Select :placeholder="$t('modules_spoc_sign_web_src_views_contracttransfercenter_contracttransfercenter_6023')" v-model="searchBox.outSchool" clearable style="width:180px;margin-right:12px;">
                <Option v-for="item in searchBox.outSchoolList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
            <Select :placeholder="$t('modules_spoc_sign_web_src_views_contracttransfercenter_contracttransfercenter_6024')" v-model="searchBox.intoSchool" clearable style="width:180px;margin-right:12px;">
                <Option v-for="item in searchBox.intoSchoolList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select> -->
            <Input
                v-model="searchBox.outCtNo"
                :placeholder="$t('modules_spoc_sign_web_src_views_contracttransfercenter_contracttransfercenter_6025')"
                style="width: 140px;margin-right:12px;"
            />
            <Input
                v-model="searchBox.inCtNo"
                :placeholder="$t('modules_spoc_sign_web_src_views_contracttransfercenter_contracttransfercenter_6026')"
                style="width: 140px;margin-right:12px;"
            />
            <!-- <Input v-model="searchBox.contractName" :placeholder="$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5667')" style="width: 140px;margin-right:12px;" /> -->
            <Select
                :placeholder="$t('modules_spoc_sign_web_src_views_contracttransfercenter_contracttransfercenter_6028')"
                clearable
                v-model="searchBox.type"
                v-if="searchBox.transferTypeList.length"
                style="width:140px;margin-right:12px;"
            >
                <Option v-for="item in searchBox.transferTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <!--  <Select :placeholder="$t('modules_spoc_sign_web_src_views_contracttransfercenter_contracttransfercenter_6029')" v-model="searchBox.approvalType" clearable style="width:140px;margin-right:12px;">
                <Option v-for="item in searchBox.approvalTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select> -->
            <Select
                :placeholder="$t('spoc_hootie_web_12')"
                v-if="searchBox.approvalStatusList.length"
                v-model="searchBox.auditStatus"
                clearable
                style="width:140px;margin-right:12px;"
            >
                <Option v-for="item in searchBox.approvalStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select :placeholder="$t('sfyxk')" v-model="searchBox.inJson" clearable style="width:140px;margin-right:12px;">
                <Option :value="1">{{ $t('sfyxk1') }}</Option>
                <Option :value="0">{{ $t('sfyxk0') }}</Option>
            </Select>
            <Select placeholder="选课审批状态" v-model="searchBox.ctSaveStatusVal" clearable style="width:140px;margin-right:12px;">
                <Option v-for="item in searchBox.approvalStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </v-search-collapse>
        <big-table
            v-if="defaultShowCol"
            class="mytable"
            :tableName="tableTitle"
            :tableHeightOut="tableHeightOut"
            :tableData="dataT"
            :tableColumnArray="columnsT"
            :defaultShowCol="defaultShowCol"
            :btnList="btnList"
            :canSelection="true && !ctNo"
            :updateShowTitleMethod="updateShowTitle"
            :dataTotal="pageCounts"
            :canChangeHeight="!ctNo"
            :isShowSelectTableColumn="!ctNo"
            :maxFlagForFixed="11"
            @resetDefault="resetDefaultCol"
            @selectionChange="selectTableItem"
            @pageChange="pageChange"
        ></big-table>
        <turn-center ref="turnCenter" v-if="turnCenterShow" @cancel="cancelTurnCenter" @save="saveTurnCenter"></turn-center>
        <takeCourse ref="takeCourse" v-if="takeCourseShow" @cancel="cancelTakeCourse" @save="saveTakeCourse"></takeCourse>

        <export-modal ref="exportModal"></export-modal>
        <tableDetails :detailsTitle="$t('modules_spoc_jw_web_src_views_approval_approvalnew_2249')" ref="tableDetails"></tableDetails>

        <Modal
            class="select_follower"
            width="340"
            v-model="followerModal"
            :mask-closable="false"
            :title="$t('modules_spoc_sign_web_src_views_contracttransfercenter_contracttransfercenter_6032')"
        >
            <div>
                {{ $t('modules_spoc_crm_web_src_views_transferintroductionmanagement_regreward_2013') }}
                <Select v-model="inSellerId" style="width:200px">
                    <Option v-for="item in roleList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
            </div>
            <div slot="footer">
                <Button @click="cancelFollower">{{ $t('classroom_allscore_53') }}</Button>
                <Button type="primary" :loading="loading" @click="submitFollower">{{ $t('courselist_compontents_servicecontent_215') }}</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import vSearchCollapse from '@public/modules/vSearchCollapse';
import bigTable from '@public/modules/bigTable.vue';
import exportModal from '@public/modules/exportModal.vue';
import turnCenter from './components/turnCenter.vue';
import takeCourse from './components/takeCourse.vue';
import tableDetails from '../../modules/tableDetails.vue';
import { waitUntil, DatePickerOpt, defaultDatePickerValue } from '@public/libs/util';
import { mapMutations, mapState } from 'vuex';
import valid, { errors, htContract, common, htChangeApply, sysUser, sysDict, htTranslateApply, sysCommonSql } from '../../libs/request';
export default {
    name: 'sign.contractTransferCenter',
    props: {
        //判断是否合同详情页打开的。有合同编号则为合同详情页打开
        ctNo: {
            type: String
        },
        ctStudnetId: {
            type: String
        },
        ctStudnetName: {
            type: String
        }
    },
    data() {
        return {
            loading: false,
            tid: '',
            followerModal: false,
            inSellerId: '',
            outOfficeId: '',
            roleList: [],
            tabType: 'out',
            dataT: [],
            options: null,
            options1: null,
            tableHeightOut: 72, //324,
            searchObj: {},
            selectedIds: [],
            commitList: [],
            officeList: [],
            turnCenterShow: false,
            takeCourseShow: false,
            updateShowTitle: htTranslateApply.updateShowTitle,
            tableTitle: this.$t('modules_spoc_sign_web_src_views_contracttransfercenter_contracttransfercenter_6036'),
            auditTimeStart: '',
            auditTimeEnd: '',
            commitTimeStart: '',
            commitTimeEnd: '',
            searchBox: {
                officeId: '',
                stuName: '',
                outCourseName: '',
                inCourseName: '',
                commitId: '',
                commitTimeStart: '',
                CommitTimeEnd: '',
                outCtNo: '',
                inCtNo: '',
                inJson: '',
                type: '',
                auditStatus: '',
                auditTimeStart: '',
                auditTimeEnd: '',
                transferTypeList: [
                    {
                        value: '1',
                        label: this.$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_takecourse_58531')
                    },
                    {
                        value: '0',
                        label: this.$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_takecourse_5853')
                    }
                ],
                approvalType: '',
                approvalTypeList: [
                    {
                        value: '1',
                        label: this.$t('modules_spoc_sign_web_src_views_contracttransfercenter_contracttransfercenter_6039')
                    },
                    {
                        value: '2',
                        label: this.$t('modules_spoc_sign_web_src_views_contracttransfercenter_contracttransfercenter_6040')
                    }
                ],
                approvalStatus: '',
                approvalStatusList: [],
                auditTime: [],
                commitTime: [],
                ctSaveStatusVal:'',
            },
            defaultShowCol: null,
            pageNo: 1,
            pageCounts: 0, //总数
            pageSize: this.$store.state.app.pageSizeGlobal,
            columnsT: [
                {
                    // title: '类型',
                    key: 'a4',
                    render: (h, params) => {
                        return h(
                            'span',
                            params.row.a4 === '1'
                                ? this.$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_takecourse_58531')
                                : params.row.a4 === '2'
                                ? this.$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_takecourse_5853')
                                : '-'
                        );
                    }
                },
                {
                    key: 'outCtNo',
                    render: (h, params) => {
                        return h('div', [
                            h(
                                this.tabType == 'in' ? 'span' : 'a',
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
                                                        id: params.row.outCtId,
                                                        ctNo: params.row.outCtNo
                                                    }
                                                });
                                            }
                                        }
                                    }
                                },
                                params.row.outCtNo
                            )
                        ]);
                    }
                },
                {
                    title: this.$t('classlist_compontents_detailinfo_45'),
                    key: 'doAction',
                    minWidth: 60,
                    render: (h, params) => {
                        return h('div', [
                            h(
                                'a',
                                {
                                    style: {
                                        // display: params.row.auditStatus == 'reject' ? '' : 'none',
                                        display: params.row.auditStatus == 'reject' && (this.myButtonPrem && this.myButtonPrem.indexOf('edit') != -1) ? 'inline-block' : 'none',
                                        'margin-right': '12px'
                                    },
                                    props: {},
                                    on: {
                                        click: () => {
                                            this.turnCenterShow = true;
                                            this.$nextTick(() => {
                                                this.$refs.turnCenter.showPop(params.row.id);
                                            });
                                        }
                                    }
                                },
                                this.$t('classroom_allscore_51')
                            ),
                            h(
                                'a',
                                {
                                    style: {
                                        // display: params.row.auditStatus == 'reject' ? '' : 'none',
                                        display:
                                            (params.row.statusFlag == 1 || params.row.statusFlag == 2 || params.row.statusFlag == 4) &&
                                            this.tabType == 'in' &&
                                            params.row.ctSaveStatusVal != 'agree'
                                                ? 'inline-block'
                                                : 'none',
                                        'margin-right': '12px'
                                    },
                                    props: {},
                                    on: {
                                        click: () => {
                                            this.outOfficeId = params.row.inOfficeId;
                                            this.getListDataByRole();
                                            this.followerModal = true;
                                            this.tid = params.row.id;
                                            this.inSellerId = params.row.inSellerId;
                                        }
                                    }
                                },
                                this.$t('modules_spoc_sign_web_src_views_contracttransfercenter_contracttransfercenter_6032')
                            ),
                            h(
                                'a',
                                {
                                    style: {
                                        // display: params.row.auditStatus == 'reject' ? '' : 'none',
                                        display:
                                            this.tabType == 'in' &&
                                            params.row.statusFlag == 2 &&
                                            params.row.statusVal == 'agree' &&
                                            (this.myButtonPrem && this.myButtonPrem.indexOf('saveCourse') != -1)
                                                ? 'inline-block'
                                                : 'none',
                                        'margin-right': '12px'
                                    },
                                    props: {},
                                    on: {
                                        click: () => {
                                            this.takeCourseShow = true;
                                            this.$nextTick(() => {
                                                this.$refs.takeCourse.show(params.row.id);
                                            });
                                        }
                                    }
                                },
                                this.$t('modules_spoc_crm_web_src_views_customer360_index_1098')
                            ),
                            h(
                                'a',
                                {
                                    style: {
                                        // display: params.row.auditStatus == 'reject' ? '' : 'none',
                                        display:
                                            this.tabType == 'in' &&
                                            params.row.statusFlag == 4 &&
                                            params.row.ctSaveStatusVal != 'agree' &&
                                            (this.myButtonPrem && this.myButtonPrem.indexOf('saveCourse') != -1)
                                                ? 'inline-block'
                                                : 'none',
                                        'margin-right': '12px'
                                    },
                                    props: {},
                                    on: {
                                        click: () => {
                                            this.takeCourseShow = true;
                                            this.$nextTick(() => {
                                                this.$refs.takeCourse.show(params.row.id);
                                            });
                                        }
                                    }
                                },
                                this.$t('modules_spoc_sign_web_src_views_contracttransfercenter_contracttransfercenter_6044')
                            ),
                            h(
                                'a',
                                {
                                    style: {
                                        // display: params.row.auditStatus == 'reject' ? '' : 'none',
                                        display: this.myButtonPrem && this.myButtonPrem.indexOf('details') != -1 ? 'inline-block' : 'none',
                                        'margin-right': '12px'
                                    },
                                    props: {},
                                    on: {
                                        click: () => {
                                            this.$refs.tableDetails.showPop({
                                                flowId: params.row.flowId,
                                                id: params.row.id,
                                                key: 'contract translate'
                                            });
                                        }
                                    }
                                },
                                this.$t('modules_spoc_sign_web_src_modules_tabledetails_4944')
                            ),
                            h(
                                'a',
                                {
                                    style: {
                                        // display: params.row.auditStatus == 'reject' ? '' : 'none',
                                        display:
                                            this.tabType == 'in' &&
                                            (params.row.statusFlag == 3 || params.row.statusFlag == 4) &&
                                            this.myButtonPrem &&
                                            this.myButtonPrem.indexOf('details') != -1
                                                ? 'inline-block'
                                                : 'none',
                                        'margin-right': '12px'
                                    },
                                    props: {},
                                    on: {
                                        click: () => {
                                            this.$refs.tableDetails.showPop({
                                                flowId: params.row.ctSaveFlowId,
                                                id: params.row.id,
                                                key: 'contract takeCourse'
                                            });
                                        }
                                    }
                                },
                                this.$t('modules_spoc_sign_web_src_modules_tabledetails_4945')
                            ),
                            h(
                                'a',
                                {
                                    style: {
                                        // display: params.row.auditStatus == 'reject' ? '' : 'none',
                                        display:
                                            this.tabType == 'in' &&
                                            params.row.ctSaveStatusVal == 'agree' &&
                                            this.myButtonPrem &&
                                            this.myButtonPrem.indexOf('rollbackOptionCourse') != -1
                                                ? 'inline-block'
                                                : 'none'
                                    },
                                    props: {},
                                    on: {
                                        click: () => {
                                            this.rollbackOptionCourse(params.row.id);
                                        }
                                    }
                                },
                                '选课回滚'
                            )
                        ]);
                    }
                }
            ]
        };
    },
    components: {
        vSearchCollapse,
        bigTable,
        exportModal,
        turnCenter,
        takeCourse,
        tableDetails
    },
    computed: {
        ...mapState(['userInfo', 'app', 'buttonPerm', 'calendarConfig']),
        myButtonPrem() {
            if (this.buttonPerm && (JSON.stringify(this.buttonPerm) != "{}")) {
                return this.buttonPerm['sign.contractTransferCenter'] || [];
            } else {
                return false;
            }
        },
        btnList() {
            if (this.ctNo) {
                // 如果是从合同详情打开，直接加载列表。不是则先加载右上已选校区
                return [
                    {
                        style: {},
                        type: '',
                        btnClick: this.tranferCenterApplay,
                        text: this.$t('modules_spoc_sign_web_src_views_contracttransfercenter_contracttransfercenter_6047')
                    }
                ];
            } else {
                return [
                    {
                        style: {},
                        type: '',
                        btnClick: this.tranferCenterApplay,
                        text: this.$t('modules_spoc_sign_web_src_views_contracttransfercenter_contracttransfercenter_6047')
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
    mounted() {
        // this.getofficeIdList();
        this.getShowTitle();
        if (this.ctNo) {
            // 如果是从合同详情打开，直接加载列表。不是则先加载右上已选校区
            this.searchBox.outCtNo = this.ctNo;
            this.getListData();
        } else {
            this.getDataScopeFilter();
            this.getSpr();
            this.getComAuditStatus();
            // waitUntil(
            // 	() => {
            // 		if(this.app.currOfficeId) {
            // 			this.$set(this.searchBox, 'officeId', this.app.currOfficeId);
            // 		}
            // 		return this.app.currOfficeId || false;
            // 	},
            // 	() => {
            // 		this.getListData();
            // 	}
            // );
        }
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        resetDefaultCol() {
            this.updateLoadingStatus({ isLoading: true });
            htTranslateApply
                .clearShowField({
                    pageIdentifier: 'htTranslateApply/FlistPage'
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
                .finally(() => {});
        },
        getListDataByRole() {
            let params = {
                roleIds: '6',
                pageSize: -1,
                officeIds: this.outOfficeId
            };
            sysUser
                .listDataByRole(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.roleList = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
        },
        changeDivHeight(height) {
            this.tableHeightOut = height;
        },
        commitTimeChange(val) {
            this.commitTimeStart = this.searchBox.commitTime[0] ? this.searchBox.commitTime[0].format('yyyy-MM-dd 00:00:00') : '';
            this.commitTimeEnd = this.searchBox.commitTime[1] ? this.searchBox.commitTime[1].format('yyyy-MM-dd 23:59:59') : '';
        },
        auditTimeChange(val) {
            this.auditTimeStart = this.searchBox.auditTime[0] ? this.searchBox.auditTime[0].format('yyyy-MM-dd 00:00:00') : '';
            this.auditTimeEnd = this.searchBox.auditTime[1] ? this.searchBox.auditTime[1].format('yyyy-MM-dd 23:59:59') : '';
        },
        getSpr() {
            sysCommonSql
                .queryPageInputInitData({
                    mainTable: 'ht_translate_apply',
                    mainField: 'commit_id',
                    joinTable: 'sys_user',
                    joinField: 'id',
                    secondField: 'name'
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.commitList = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
        },
        getListData() {
            this.updateLoadingStatus({
                isLoading: true
            });
            this.selectedIds = [];
            let param = {
                tabType: this.tabType,
                officeId: this.searchBox.officeId,
                stuName: this.searchBox.stuName,
                outCourseName: this.searchBox.outCourseName,
                inCourseName: this.searchBox.inCourseName,
                commitId: this.searchBox.commitId,
                commitTimeStart: this.commitTimeStart,
                commitTimeEnd: this.commitTimeEnd,
                outCtNo: this.searchBox.outCtNo,
                inCtNo: this.searchBox.inCtNo,
                inJson: this.searchBox.inJson,
                type: this.searchBox.type,
                auditStatus: this.searchBox.auditStatus,
                ctSaveStatusVal:this.searchBox.ctSaveStatusVal,
                auditTimeStart: this.auditTimeStart,
                auditTimeEnd: this.auditTimeEnd,
                pageNo: this.pageNo,
                pageSize: this.pageSize
            };
            this.searchObj = JSON.parse(JSON.stringify(param));
            htTranslateApply
                .listPage(param)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.dataT = res.data.data.list;
                        this.pageCounts = res.data.data.total;
                        this.pageNo = res.data.data.pageNum;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({
                        isLoading: false
                    });
                });
        },
        tabsChange(val) {
            this.pageNo = 1;
            this.getListData();
        },
        //查看详情
        seeDetails(obj) {
            this.$refs.tableDetails.showPop(obj);
        },
        //转中心申请弹窗
        tranferCenterApplay() {
            this.turnCenterShow = true;
            this.$nextTick(() => {
                if (this.ctNo) {
                    // 合同详情打开
                    this.$refs.turnCenter.showPopNew(this.ctStudnetId, this.ctStudnetName, this.ctNo);
                } else {
                    this.$refs.turnCenter.showPop();
                }
            });
        },
        getofficeIdList() {
            console.log('getofficeIdList');
            htContract
                .getXq()
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        // this.officeIdList = res.data.data;
                        this.searchBox.intoSchoolList = res.data.data;
                        this.searchBox.outSchoolList = res.data.data;
                    }
                })
                .catch(errors.call(this));
        },
        getDataScopeFilter() {
            sysUser
                .dataScopeFilter()
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        console.log(res.data.data);
                        this.officeList = res.data.data;
                        waitUntil(
                            () => {
                                return (this.app.currOfficeId && this.calendarConfig.maxMonthInterval) || false;
                            },
                            () => {
                                if (this.app.currOfficeId == 'all') {
                                    this.$set(this.searchBox, 'officeId', '');
                                } else {
                                    this.$set(this.searchBox, 'officeId', this.app.currOfficeId);
                                }
                                this.searchBox.auditTime = []; //defaultDatePickerValue();
                                this.searchBox.commitTime = defaultDatePickerValue();
                                this.options = DatePickerOpt(this, 'DatePicker', Number(this.calendarConfig.maxMonthInterval));
                                this.options1 = DatePickerOpt(this, 'DatePicker1', Number(this.calendarConfig.maxMonthInterval));
                                this.commitTimeChange();
                                this.auditTimeChange();
                                this.getListData();
                            }
                        );
                    } else {
                        this.$Message.error(res.data.message);
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
        },
        getComAuditStatus() {
            sysDict
                .batchListData({
                    types: 'com_audit_status'
                })
                .then(valid.call(this))
                .then(res => {
                    this.searchBox.approvalStatusList = res.data.data.com_audit_status;
                })
                .catch(errors.call(this))
                .finally(() => {});
        },
        getShowTitle(closeLoad) {
            htTranslateApply
                .getShowTitle({
                    pageIdentifier: 'htTranslateApply/FlistPage',
                    voName: 'com.windliven.spoc.modules.contract.vo.HtTranslateApplyVO'
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.defaultShowCol = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    if (closeLoad) {
                        this.updateLoadingStatus({ isLoading: false });
                    }
                });
        },
        searchInfo() {
            this.pageNo = 1;
            this.getListData();
        },
        resetSearch() {
            this.searchBox.auditTime = []; //defaultDatePickerValue();
            this.searchBox.commitTime = defaultDatePickerValue();
            this.searchBox.submitDate = [];
            for (let item in this.searchBox) {
                if (typeof this.searchBox[item] === 'string') {
                    this.searchBox[item] = '';
                }
            }
            this.pageNo = 1;
            if (this.app.currOfficeId == 'all') {
                this.$set(this.searchBox, 'officeId', '');
            } else {
                this.$set(this.searchBox, 'officeId', this.app.currOfficeId);
            }
            this.commitTimeChange();
            this.auditTimeChange();
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
        //改变页码
        pageChange(page) {
            this.pageNo = page;
            this.getTableDatas();
        },
        //获取表格数据
        getTableDatas() {
            this.getListData();
            //                this.updateLoadingStatus({isLoading: true});
        },
        isExport(val) {
            delete this.searchObj.pageNo;
            delete this.searchObj.pageSize;
            if (val == 1) {
                delete this.searchObj.ids;
            } else {
                if (this.selectedIds.length < 1) {
                    this.$Message.error(this.$t('modules_spoc_sign_web_src_views_contracttransfercenter_contracttransfercenter_6051'));
                    return;
                }
                this.searchObj.ids = this.selectedIds;
            }
            this.$refs.exportModal.noShowExport(htTranslateApply.export, this.searchObj);
        },
        downLoad(id) {
            console.log(id);
        },
        success() {
            console.log(this.$t('classlist_classlist_13'));
        },
        fail() {
            console.log(this.$t('courselist_compontents_servicecontent_217'));
        },
        cancelTurnCenter() {
            this.turnCenterShow = false;
            // this.pageNo = 1;
            this.getListData();
        },
        saveTurnCenter() {
            this.turnCenterShow = false;
            this.pageNo = 1;
            this.getListData();
        },
        cancelTakeCourse() {
            this.takeCourseShow = false;
            // this.pageNo = 1;
            this.getListData();
        },
        saveTakeCourse() {
            this.takeCourseShow = false;
            this.pageNo = 1;
            this.getListData();
        },
        setOptTime(flag) {
            if (flag) {
                this.searchBox.commitTime = [];
                this.commitTimeChange();
            }
        },
        setOptTime1(flag) {
            if (flag) {
                this.searchBox.auditTime = [];
                this.auditTimeChange();
            }
        },
        cancelFollower() {
            this.followerModal = false;
        },
        submitFollower() {
            this.loading = true;
            let params1 = {
                id: this.tid,
                inSellerId: this.inSellerId
            };
            htTranslateApply
                .saveInSellerId(params1)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.followerModal = false;
                        this.searchInfo();
                        this.$Message.success(this.$t('modules_spoc_portal_views_workbench_components_employee_4184'));
                    } else {
                        this.$Message.error(this.$t('modules_spoc_sign_web_src_views_contracttransfercenter_contracttransfercenter_6055'));
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                    this.loading = false;
                });
        },
        rollbackOptionCourse(id) {
            htTranslateApply
                .rollbackOptionCourse({
                    id
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.getListData();
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
        }
    },
    watch: {
        'app.currOfficeId': function(val, oldVal) {
            //合同详情页打开的。不执行监听
            if (oldVal && !this.ctNo && this.$route.name == 'sign.contractTransferCenter') {
                if (this.app.currOfficeId == 'all') {
                    this.$set(this.searchBox, 'officeId', '');
                } else {
                    this.$set(this.searchBox, 'officeId', this.app.currOfficeId);
                }
                this.getListData();
            }
        }
    }
};
</script>
