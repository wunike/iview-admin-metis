<style lang="less">
.packageChange {
    .v-search-collapse {
        width: 100%;
    }
    .mytable {
        margin-top: 10px;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        padding: 0 16px;
    }
}
</style>

<template>
    <div class="packageChange">
        <v-search-collapse v-if="!ctNo" @search="search" @reset="resetSearch" class="v-search-collapse" @changeDivHeight="changeDivHeight">
            <DatePicker
                v-model="commitTime"
                type="daterange"
                ref="DatePicker"
                split-panels
                :options="options"
                @on-open-change="setOptTime"
                :placeholder="$t('principalmailbox_index_490')"
                style="width: 224px"
                @on-change="commitTimeChange"
            ></DatePicker>
            <DatePicker
                v-model="auditTime"
                type="daterange"
                ref="DatePicker1"
                split-panels
                :options="options1"
                @on-open-change="setOptTime1"
                :placeholder="$t('modules_spoc_sign_web_src_views_contracttransfercenter_contracttransfercenter_6017')"
                style="width: 224px"
                @on-change="auditTimeChange"
            ></DatePicker>
            <Select v-model="officeId" :placeholder="$t('courselist_courselist_225')" multiple style="width:280px">
                <Option v-for="item in officeIdList" :value="item.id" :key="item.id">{{ item.code }}{{ item.name }}</Option>
            </Select>
            <Input v-model="fromStuName" :placeholder="$t('modules_spoc_sign_web_src_views_packagechange_packagechange_68141')" style="width: 140px" />
            <Input v-model="toStuName" :placeholder="$t('modules_spoc_sign_web_src_views_packagechange_packagechange_6814')" style="width: 140px" />
            <Input v-model="outCourseName" :placeholder="$t('modules_spoc_sign_web_src_views_packagechange_packagechange_6815')" style="width: 140px" />
            <Input v-model="inCourseName" :placeholder="$t('modules_spoc_sign_web_src_views_packagechange_packagechange_6816')" style="width: 140px" />
            <Select v-model="auditStatus" clearable :placeholder="$t('spoc_hootie_web_12')" style="width:140px">
                <Option v-for="item in approveList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="fromCtNo" :placeholder="$t('modules_spoc_sign_web_src_views_packagechange_packagechange_6818')" style="width: 140px" />
            <Input v-model="toCtNo" :placeholder="$t('modules_spoc_sign_web_src_views_packagechange_packagechange_6819')" style="width: 140px" />
        </v-search-collapse>
        <big-table
            v-if="defaultShowCol"
            class="mytable"
            :tableName="tableTitle"
            :tableData="dataList"
            :tableColumnArray="columnsT"
            :defaultShowCol="defaultShowCol"
            :btnList="btnList"
            :canSelection="true && !ctNo"
            :updateShowTitleKey="updateShowTitleKey"
            :updateShowTitleMethod="updateShowTitle"
            :canChangeHeight="!ctNo"
            :isShowSelectTableColumn="!ctNo"
            :dataTotal="pageCounts"
            :tableHeightOut="tableHeightOut"
            @resetDefault="resetDefaultCol"
            @pageChange="pageChange"
            @selectionChange="selectTableItem"
        ></big-table>
        <popupsM ref="popModule" v-if="popShow" @cancel="cancelPopModule" @save="savePop"></popupsM>
        <export-modal ref="exportModal"></export-modal>
        <tableDetails :detailsTitle="$t('modules_spoc_jw_web_src_views_approval_approvalnew_2249')" ref="tableDetails"></tableDetails>
    </div>
</template>
<script>
import vSearchCollapse from '@public/modules/vSearchCollapse.vue';
import { mapMutations, mapState } from 'vuex';
import { waitUntil, DatePickerOpt, defaultDatePickerValue } from '@public/libs/util';
import bigTable from '@public/modules/bigTable.vue';
import valid, { errors, htContract, common, htChangeApply, sysDict, sysUser } from '../../libs/request';
import popupsM from './pops/popups.vue';
import tableDetails from '../../modules/tableDetails.vue';
import exportModal from '@public/modules/exportModal.vue';

export default {
    name: 'sign.packageChange',
    props: {
        //判断是否合同详情页打开的。有合同编号则为合同详情页打开
        ctNo: {
            type: String
        },
        ctId: {
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
            options: null,
            options1: null,
            tableHeightOut: 72, //324,
            commitTime: [],
            auditTime: [],
            searchObj: {},
            popShow: false,
            fromStuName: '',
            toStuName: '',
            outCourseName: '',
            inCourseName: '',
            fromCtNo: '',
            toCtNo: '',
            auditStatus: '',
            commitTimeEnd: '',
            commitTimeStart: '',
            auditTimeEnd: '',
            auditTimeStart: '',
            approveList: [],
            officeId: [],
            officeIdList: [],
            defaultShowCol: null,
            tableTitle: this.$t('modules_spoc_sign_web_src_views_packagechange_packagechange_6821'),
            dataList: [],
            columnsT: [
                {
                    title: this.$t('classlist_compontents_detailinfo_45'),
                    key: 'doAction',
                    fixed: 'right',
                    align: 'center',
                    minWidth: 60,
                    render: (h, params) => {
                        return h('div', [
                            h(
                                'a',
                                {
                                    style: {
                                        display:
                                            (params.row.auditStatus == 'reject' || params.row.auditStatus == 'uncommit') &&
                                            (this.myButtonPrem && this.myButtonPrem.indexOf('edit') != -1)
                                                ? ''
                                                : 'none',
                                        'margin-right': '12px'
                                    },
                                    props: {},
                                    on: {
                                        click: () => {
                                            this.popShow = true;
                                            this.$nextTick(() => {
                                                this.$refs.popModule.show(params.row.id);
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
                                        display: this.myButtonPrem && this.myButtonPrem.indexOf('details') != -1 ? '' : 'none',
                                        'margin-right': '12px'
                                    },
                                    props: {},
                                    on: {
                                        click: () => {
                                            this.$refs.tableDetails.showPop({
                                                flowId: params.row.flowId,
                                                id: params.row.id,
                                                key: 'contract change'
                                            });
                                        }
                                    }
                                },
                                this.$t('principalmailbox_16')
                            ),
                            !(this.ctId&&(this.ctId==params.row.fromCtId)||!(params.row.fromCtId&&params.row.fromCtNo))&&h(
                                'a',
                                {
                                    style: {
                                        // 'display':this.ctId&&(this.ctId==params.row.fromCtId)||!(params.row.fromCtId&&params.row.fromCtNo)?'none':'',
                                        'margin-right': '12px'
                                    },
                                    props: {

                                    },
                                    on: {
                                        click: () => {
                                            // if (!this.ctNo) {#1328 【BUG】合同详情，改包记录，按钮点击无响应，改包的补充协议文字条款可以在哪里修改？
                                                this.$router.push({
                                                    name: 'sign.pactDetails',
                                                    query: {
                                                        id: params.row.fromCtId,
                                                        ctNo: params.row.fromCtNo
                                                    }
                                                });
                                            // }
                                        }
                                    }
                                },
                                this.$t('modules_spoc_sign_web_src_views_packagechange_packagechange_6825')
                            ),
                            !(this.ctId&&(this.ctId==params.row.toCtId)||!(params.row.toCtId&&params.row.toCtNo))&&h(
                                'a',
                                {
                                    style: {
                                        // 'display':?'none':'',
                                        'margin-right': '12px'
                                    },
                                    props: {},
                                    on: {
                                        click: () => {
                                            // if (!this.ctNo) {
                                                this.$router.push({
                                                    name: 'sign.pactDetails',
                                                    query: {
                                                        id: params.row.toCtId,
                                                        ctNo: params.row.toCtNo
                                                    }
                                                });
                                            // }
                                        }
                                    }
                                },
                                this.$t('modules_spoc_sign_web_src_views_packagechange_packagechange_6826')
                            ),
                            h(
                                'a',
                                {
                                    style: {
                                        display:
                                            (params.row.auditStatus == 'agree') &&
                                            (this.myButtonPrem && this.myButtonPrem.indexOf('forciblyReject') != -1)
                                                ? ''
                                                : 'none'
                                    },
                                    props: {},
                                    on: {
                                        click: () => {
                                            this.forciblyReject(params.row.id);
                                        }
                                    }
                                },
                                '强制驳回'
                            )
                        ]);
                    }
                }
            ],
            pageCounts: 0,
            updateShowTitle: htChangeApply.updateShowTitle,
            updateShowTitleKey: 'htChangeApply/listPage',
            pageNo: 1,
            pageSize: this.$store.state.app.pageSizeGlobal,
            selectedIds: []
        };
    },
    computed: {
        ...mapState(['userInfo', 'app', 'buttonPerm', 'calendarConfig']),
        myButtonPrem() {
            if (this.buttonPerm && (JSON.stringify(this.buttonPerm) != "{}")) {
                return this.buttonPerm['sign.packageChange'] || [];
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
                        btnClick: this.packageChange,
                        text: this.$t('modules_spoc_sign_web_src_views_packagechange_packagechange_6827'),
                        value: '1'
                    }
                ];
            } else {
                return [
                    {
                        style: {},
                        type: '',
                        btnClick: this.packageChange,
                        text: this.$t('modules_spoc_sign_web_src_views_packagechange_packagechange_6827'),
                        value: '1'
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
    components: {
        vSearchCollapse,
        bigTable,
        popupsM,
        exportModal,
        tableDetails
    },
    created() {
        this.getShowTitle();
        this.getComAuditStatus();
        if (this.ctNo) {
            // 如果是从合同详情打开，直接加载列表。不是则先加载右上已选校区
            this.fromCtNo = this.ctNo;
            this.getListData();
        } else {
            this.getofficeIdList();
        }
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        resetDefaultCol() {
            this.updateLoadingStatus({ isLoading: true });
            htChangeApply
                .clearShowField({
                    pageIdentifier: 'htChangeApply/listPage'
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
        changeDivHeight(height) {
            this.tableHeightOut = height;
        },
        getShowTitle(closeLoad) {
            htChangeApply
                .getShowTitle({
                    pageIdentifier: 'htChangeApply/listPage',
                    voName: 'com.windliven.spoc.modules.contract.vo.HtChangeApplyVO',
                    lang: this.$i18n.locale
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        /* console.log(res.data.data.false)
							let _res = []
							res.data.data.false.forEach(item=>{
							    if(item.selected){
							        _res.push(item.name)
							    }
							})
							this.defaultShowCol = _res */
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
        getofficeIdList(val) {
            //				let params = {
            //					parentIds: val ? val : 0
            //				}
            sysUser
                .dataScopeFilter()
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.officeIdList = res.data.data;
                        waitUntil(
                            () => {
                                return (this.app.currOfficeId && this.calendarConfig.maxMonthInterval) || false;
                            },
                            () => {
                                if (this.app.currOfficeId == 'all') {
                                    this.officeId = [];
                                } else {
                                    this.officeId = [this.app.currOfficeId];
                                }
                                this.commitTime = defaultDatePickerValue();
                                this.auditTime = []; //defaultDatePickerValue();
                                this.options = DatePickerOpt(this, 'DatePicker', Number(this.calendarConfig.maxMonthInterval));
                                this.options1 = DatePickerOpt(this, 'DatePicker1', Number(this.calendarConfig.maxMonthInterval));
                                this.auditTimeChange();
                                this.commitTimeChange();
                                this.getListData();
                            }
                        );
                    }
                })
                .catch(errors.call(this));
        },
        getComAuditStatus() {
            sysDict
                .batchListData({
                    types: 'com_audit_status'
                })
                .then(valid.call(this))
                .then(res => {
                    this.approveList = res.data.data.com_audit_status;
                })
                .catch(errors.call(this))
                .finally(() => {});
        },
        getListData() {
            this.updateLoadingStatus({
                isLoading: true
            });
            let params = {
                auditStatus: this.auditStatus,
                auditTimeEnd: this.auditTimeEnd,
                auditTimeStart: this.auditTimeStart,
                commitTimeStart: this.commitTimeStart,
                commitTimeEnd: this.commitTimeEnd,
                fromCtNo: this.fromCtNo,
                fromStuName: this.fromStuName,
                inCourseName: this.inCourseName,
                officeIds: this.officeId,
                outCourseName: this.outCourseName,
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                toCtNo: this.toCtNo,
                toStuName: this.toStuName
            };
            if(this.ctId){
                params.fromCtNo='';
                params.ctId=this.ctId;
            }
            this.searchObj = params;
            htChangeApply
                .listPage(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        /* console.log(res.data.data.false)
							let _res = []
							res.data.data.false.forEach(item=>{
							    if(item.selected){
							        _res.push(item.name)
							    }
							})
							this.defaultShowCol = _res */
                        this.dataList = res.data.data.list;
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
        search() {
            this.pageNo = 1;
            this.getListData();
        },
        resetSearch() {
            this.auditStatus = '';
            this.auditTimeEnd = '';
            this.auditTimeStart = '';
            this.commitTimeStart = '';
            this.fromCtNo = '';
            this.fromStuName = '';
            this.inCourseName = '';
            if (this.app.currOfficeId == 'all') {
                this.officeId = [];
            } else {
                this.officeId = [this.app.currOfficeId];
            }
            this.outCourseName = '';
            this.pageNo = 1;
            this.toCtNo = '';
            this.toStuName = '';
            this.pageSize = this.$store.state.app.pageSizeGlobal;
            this.commitTime = defaultDatePickerValue();
            this.auditTime = []; // defaultDatePickerValue();
            this.auditTimeChange();
            this.commitTimeChange();
            this.getListData();
        },
        packageChange() {
            this.popShow = true;
            this.$nextTick(() => {
                if (this.ctNo) {
                    // 合同详情打开
                    this.$refs.popModule.showNew(this.ctStudnetId, this.ctStudnetName, this.ctNo);
                } else {
                    this.$refs.popModule.show();
                }
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
        isExport(val) {
            if (val == 1) {
                delete this.searchObj.ids;
            } else {
                if (this.selectedIds.length < 1) {
                    this.$Message.error(this.$t('modules_spoc_sign_web_src_views_editleavenum_components_editleavenummodify_6461'));
                    return;
                }
                this.searchObj.ids = this.selectedIds;
            }
            this.$refs.exportModal.noShowExport(htChangeApply.exportFile, this.searchObj);
        },
        commitTimeChange(val) {
            this.commitTimeStart = this.commitTime[0] ? this.commitTime[0].format('yyyy-MM-dd 00:00:00') : '';
            this.commitTimeEnd = this.commitTime[1] ? this.commitTime[1].format('yyyy-MM-dd 23:59:59') : '';
        },
        auditTimeChange(val) {
            this.auditTimeStart = this.auditTime[0] ? this.auditTime[0].format('yyyy-MM-dd 00:00:00') : '';
            this.auditTimeEnd = this.auditTime[1] ? this.auditTime[1].format('yyyy-MM-dd 23:59:59') : '';
        },
        cancelPopModule() {
            this.popShow = false;
            // this.pageNo = 1;
            this.getListData();
        },
        savePop() {
            this.popShow = false;
            this.pageNo = 1;
            this.getListData();
        },
        setOptTime(flag) {
            if (flag) {
                this.commitTime = [];
                this.commitTimeChange();
            }
        },
        setOptTime1(flag) {
            if (flag) {
                this.auditTime = [];
                this.auditTimeChange();
            }
        },
        forciblyReject(id) {
            htChangeApply
                .forciblyReject({
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
            if (oldVal && !this.ctNo && this.$route.name == 'sign.packageChange') {
                if (this.app.currOfficeId == 'all') {
                    this.officeId = [];
                } else {
                    this.officeId = [this.app.currOfficeId];
                }
                this.getListData();
            }
        }
    }
};
</script>
