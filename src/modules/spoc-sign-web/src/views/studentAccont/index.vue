<style lang="less">
.student-accont-container{
    position: relative;
    .ivu-tabs-nav-scroll{
        width: 100%;
    }
    .page-wrapper{
        text-align: center;padding-top: 14px;
    }
}
.ivu-modal-header{
    padding:17px 24px 16px!important;
    background: #F7F8FA;
    border-radius:4px;
    .ivu-modal-header-inner{
        font-size:18px;
        font-weight:500;
        color:rgba(0,0,0,0.85);
    }
}
</style>
    
<template>
<div class="student-accont-container">
    <information 
        ref="information" 
        :curStudent="curStudent" 
        :accountOverview="accountOverview" 
        @uploadLists="uploadLists"
        v-if="curStudent && curStudent.studentId">
    </information>
    <Tabs v-model="tabValue">
        <TabPane :label="$t('modules_spoc_sign_web_src_views_studentaccont_index_7491')" name="A"></TabPane>
        <TabPane :label="$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6893')" name="B"></TabPane>
        <!-- <TabPane :label="$t('modules_spoc_sign_web_src_views_studentaccont_index_7493')" name="C"></TabPane> -->
        <TabPane :label="$t('modules_spoc_sign_web_src_views_studentaccont_index_7494')" name="D"></TabPane>
    </Tabs>
    <div v-show="tabValue === 'A'" style="margin-bottom: -20px;">
        <contract-item 
            v-for="contract in contractLists" 
            :accountOverview="accountOverview" 
            :curStudent="curStudent" 
            :key="contract.ctId" 
            :item="contract" 
            @uploadLists="uploadLists">
        </contract-item>
    </div>
    <div v-show="tabValue === 'B'">
        <!-- 合同流水 -->
        <Table border :columns="columnsContract" :data="dataContract"></Table>
        <div class="page-wrapper">
            <Page :current="pageNoContract"
                :total="countContract"
                v-if="pageCountContract > 1"
                show-elevator show-total show-sizer
                :page-size="pageSizeContract"
                @on-change="pageChangeContract"
                @on-page-size-change="sizeChangeContract">
            </Page>
        </div>
    </div>
    <div v-show="tabValue === 'C'">
        <!-- 电子账户流水 -->
        <Table border :columns="columnsElectron" :data="dataElectron"></Table>
        <div class="page-wrapper">
            <Page :current="pageNoElectron"
                :total="countElectron"
                v-if="pageCountElectron > 1"
                show-elevator show-total show-sizer
                :page-size="pageSizeElectron"
                @on-change="pageChangeElectron"
                @on-page-size-change="sizeChangeElectron">
            </Page>
        </div>
    </div>
    <div v-show="tabValue === 'D'">
        <!-- 教务流水 -->
        <Table border :columns="columnsContract" :data="dataAcademic"></Table>
        <div class="page-wrapper">
            <Page :current="pageNoAcademic"
                :total="countAcademic"
                v-if="pageCountAcademic > 1"
                show-elevator show-total show-sizer
                :page-size="pageSizeAcademic"
                @on-change="pageChangeAcademic"
                @on-page-size-change="sizeChangeAcademic">
            </Page>
        </div>
    </div>
</div>
</template>

<script>
import information from "./information.vue";
import contractItem from "./contractItem.vue";
import valid, { errors, htStudentAccount, common, cwCapitalTrace } from "../../libs/request";
export default {
    name: 'studentAccont',
    data(){
        return {
            tabValue: 'A',
            contractLists: [],
            columnsContract: [
                {
                    title: this.$t('messagemanagement_index_354'),
                    key: 'subTypeName',
					resizable: true,
					width: null,
                    render: (h, params) => {
                        return h('div', params.row.subTypeName || '-')
                    }
                },
                {
                    title: this.$t('modules_spoc_sign_web_src_views_studentaccont_contractitem_7469'),
                    key: 'revenue',
					resizable: true,
					width: null,
                    render: (h, params) => {
                        let num = params.row.revenue ? Number(params.row.revenue) : 0;
                        let str = num;
                        if(num >= 0) {
                            str = '+' + str;
                        }
                        return h('div', {
                            style: {
                                color: num >= 0 ? '#44BCB7' : '#FF3000'
                            }
                        }, str);
                    }
                },
                {
                    title: this.$t('memberlist_memberlist_257'),
                    key: 'studentName',
					resizable: true,
					width: null,
                    render: (h, params) => {
                        return h('div', params.row.studentName || '-')
                    }
                },
                {
                    title: this.$t('mycourse_mycourse_380'),
                    key: 'courseName',
					resizable: true,
					width: null,
                    render: (h, params) => {
                        return h('div', params.row.courseName || '-')
                    }
                },
                {
                    title: this.$t('messagemanagement_components_histroylists_312'),
                    key: 'typeName',
					resizable: true,
					width: null,
                    render: (h, params) => {
                        return h('div', params.row.typeName || '-')
                    }
                },
                {
                    title: this.$t('messagemanagement_components_histroylists_313'),
                    key: 'optTime',
					resizable: true,
					width: null,
                    render: (h, params) => {
                        return h('div', params.row.optTime || '-')
                    }
                },
                {
                    title: this.$t('views_coursepack_coursepack_384'),
                    key: 'officeName',
					resizable: true,
					width: null,
                    render: (h, params) => {
                        return h('div', params.row.officeName || '-')
                    }
                },
                {
                    title: this.$t('integralflow_10'),
                    key: 'optUser',
					resizable: true,
					width: null,
                    render: (h, params) => {
                        return h('div', params.row.optUser || '-')
                    }
                },
                {
                    title: this.$t('modules_spoc_sign_web_src_views_approval_approvalnew_5071'),
                    key: 'contractNo',
					resizable: true,
					width: null,
                    render: (h, params) => {
                        return h("div", [
                            h("a",{
                                on:{
                                    click:()=>{
                                        this.$router.push({
                                            name:'sign.pactDetails',
                                            query:{
                                                id:params.row.id,
                                                ctNo:params.row.contractNo,
                                            }
                                        })
                                    }
                                }
                            },
                            params.row.contractNo || '-')
                        ]);
                    }
                },
            ],
            dataContract: [],
            columnsElectron: [
                {
                    title: this.$t('messagemanagement_components_histroylists_313'),
                    key: 'optTime',
					resizable: true,
					width: null,
                    render: (h, params) => {
                        return h('div', params.row.optTime || '-')
                    }
                },
                {
                    title: this.$t('modules_spoc_sign_web_src_views_studentaccont_index_7504'),
                    key: 'revenue',
					resizable: true,
					width: null,
                    render: (h, params) => {
                        let num = params.row.revenue ? Number(params.row.revenue) : 0;
                        let addType = ['prestoreAccount','backAccount','changePackage','turningCenter','transferIncome','receivePayBack'];
                        let subtractType = ['withdraw','receivePay','transferExpend'];
                        let _type = params.row.type;
                        let str = num;
                        if(addType.indexOf(_type) > -1) {
                            str = '+' + str;
                        } else {
                            str = '-' + str;
                        }
                        return h('div', {
                            style: {
                                color: addType.indexOf(_type) > -1 ? '#44BCB7' : '#FF3000'
                            }
                        }, str);
                    }
                },
                {
                    title: this.$t('modules_spoc_sign_web_src_views_studentaccont_index_7505'),
                    key: 'operation',
					resizable: true,
					width: null,
                    render: (h, params) => {
                        return h('div', params.row.operation || '-')
                    }
                },
                {
                    title: this.$t('views_coursepack_coursepack_384'),
                    key: 'officeName',
					resizable: true,
					width: null,
                    render: (h, params) => {
                        return h('div', params.row.officeName || '-')
                    }
                },
                {
                    title: this.$t('integralflow_10'),
                    key: 'optUserName',
					resizable: true,
					width: null,
                    render: (h, params) => {
                        return h('div', params.row.optUserName || '-')
                    }
                },
            ],
            dataElectron: [],
            curStudent: {},
            accountOverview: {},
            pageNoElectron: 1,//当前页码 - 电子账户
            pageCountElectron: 1,//页码总数 - 电子账户
            pageSizeElectron: 10,//每页条数 - 电子账户
            countElectron: 0,//数据总数 - 电子账户
            pageNoContract: 1,//当前页码 - 合同流水
            pageCountContract: 1,//页码总数 - 合同流水
            pageSizeContract: 10,//每页条数 - 合同流水
            countContract: 0,//数据总数 - 合同流水
            dataAcademic: [],
            pageNoAcademic: 1,//当前页码 - 教务流水
            pageCountAcademic: 1,//页码总数 - 教务流水
            pageSizeAcademic: 10,//每页条数 - 教务流水
            countAcademic: 0,//数据总数 - 教务流水
        };
    },
    components: {
        information, contractItem
    },
    methods: {
        reset() {
            this.tabValue = 'A';
            this.contractLists = [];
            this.dataContract = [];
            this.dataElectron = [];
            this.dataAcademic = [];
        },
        init(obj) {
            this.curStudent = obj;
            // console.log(obj);
            this.getStudentContract();
            this.getAccountOverview();
            this.getListsElectron();
            this.getListsContract();
            this.getListsAcademic();
            setTimeout(() => {
                this.$refs.information.init();
            }, 0);
        },
        getAccountOverview() {
            let params = {
                studentId: this.curStudent.studentId
            }
            htStudentAccount.getAccountOverview(params)
            .then(valid.call(this))
            .then(res=>{
                if(res.ok){
                    this.accountOverview = res.data.data;
                }
            })
            .catch(errors.call(this))
        },
        getStudentContract() {
            let params = {
                studentId: this.curStudent.studentId
            }
            htStudentAccount.getStudentContract(params)
            .then(valid.call(this))
            .then(res=>{
                if(res.ok){
                    let _data = res.data.data;
                    this.contractLists = _data;
                }
            })
            .catch(errors.call(this))
        },
        getListsElectron() {
            let params = {
                studentId: this.curStudent.studentId,
                pageNo: this.pageNoElectron,
                pageSize: this.pageSizeElectron
            }
            common.comAccountCapitalTraceListPage(params)
            .then(valid.call(this))
            .then(res=>{
                if(res.ok){
                    let _data = res.data.data;
                    this.dataElectron = _data.list;
                    this.pageCountElectron = _data.pages;
                    this.countElectron = _data.total;
                }
            })
            .catch(errors.call(this))
        },
        pageChangeElectron(page) {
            this.pageNoElectron = page;
            this.getListsElectron();
        },
        sizeChangeElectron(size) {
            this.pageSizeElectron = size;
            this.getListsElectron();
        },
        getListsContract() {
            let params = {
                filtered: '0',
                officeId: this.curStudent.officeId,
                studentId: this.curStudent.studentId,
                contractId: '',
                param: this.searchVal,
                pageNo: this.pageNoContract,
                pageSize: this.pageSizeContract,
                type: 'contract'
            }
            this.listStuPage(params, 'contract')
        },
        pageChangeContract(page) {
            this.pageNoElectron = page;
            this.getListsContract();
        },
        sizeChangeContract(size) {
            this.pageSizeElectron = size;
            this.getListsContract();
        },
        listStuPage(params, type) {
            cwCapitalTrace.listStuPage(params)
            .then(valid.call(this))
            .then(res=>{
                if(res.ok){
                    let _data = res.data.data;
                    if(type == 'contract') {
                        this.dataContract = _data.list;
                        this.pageCountContract = _data.pages;
                        this.countContract = _data.total;
                    } else {
                        this.dataAcademic = _data.list;
                        this.pageCountAcademic = _data.pages;
                        this.countAcademic = _data.total;
                    }
                }
            })
            .catch(errors.call(this))
        },
        getListsAcademic() {
            let params = {
                filtered: '0',
                officeId: this.curStudent.officeId,
                studentId: this.curStudent.studentId,
                contractId: '',
                param: this.searchVal,
                pageNo: this.pageNoContract,
                pageSize: this.pageSizeContract,
                type: 'academic'
            }
            this.listStuPage(params, 'academic')
        },
        pageChangeAcademic(page) {
            this.pageNoAcademic = page;
            this.getListsAcademic();
        },
        sizeChangeAcademic(size) {
            this.pageSizeAcademic = size;
            this.getListsAcademic();
        },
        uploadLists() {
            // 更新全部
            this.getStudentContract();
            this.getAccountOverview();
            this.getListsElectron();
            this.getListsContract();
            this.getListsAcademic();
        },
    }
}
</script>


