<style lang="less">
.danhang(){
    overflow: hidden;text-overflow: ellipsis;white-space: nowrap;
}
.contract-item-container{
    @mainColor: #3CBDB8;
    @headerRightWidth: 60px + 123px;
    margin-bottom: 20px;
    .item-header{
        @h: 40px; 
        position: relative;height: @h;line-height: @h - 2px;
        padding-left: 18px;padding-right: @headerRightWidth;margin-bottom: -4px;
        border-radius:4px;background: #FAFAFA;
        border: 1px solid #DEDDDE;font-size: 14px;
        &::before{
            content: '';
            position: absolute;left: -1px;top: 0;bottom: 0;width: 6px;z-index: 1;
            background: @mainColor;
            border-radius: 6px;
        }
        ul{
            display: block;height: 100%;
        }
        li{
            float: left;width: 100% / 6;
            .danhang();
            &.name{
                color: @mainColor;width: 88px;margin-right: 30px;
                .icon{
                    // 
                    font-size: 16px;margin: 4px;
                }
            }
        }
        .label{
            font-weight: bold;
        }
    }
    .header-right{
        position: absolute;right: 0;top: 0;bottom: 0;width: @headerRightWidth;
        button{
            width: 60px;margin-right: 11px;
            float: left;margin-top: 3px;
        }
        .icon-box{
            position: absolute;right: 0;top: 0;bottom: 0;
            margin: 4px;width: 47px;
            cursor: pointer;
            i{
                position: absolute; top: 50%;left: 50%;transform: translate(-50%,-50%);
                font-size: 24px;color: #999;
            }
        }
    }
    .item-content{
        padding: 16px 21px 28px 20px;
        border: 1px solid #D4D5DA;border-top: none;
        border-radius: 0 0 4px 4px;
    }
    .contract-log-wrapper{
        margin-top: 20px;
    }
    .log-header{
        @h: 50px;
        position: relative;
        height: @h;line-height: @h - 2px;padding-left: 24px;
        background: #FAFAFA;border: 1px solid #E8E8E8;border-bottom: none;
        .name{
            font-weight: bold;
        }
        .right{
            position: absolute;right: 0;top: 0;bottom: 0;
            width: 534px;
        }
    }
    .ivu-icon-ios-help-circle{
        position: relative;top: -1px;
        color: #ccc;font-size: 16px;
    }
    .icon-hetong2{
        position: relative;top: 1px;margin-right: 2px;
    }
    .page-wrapper{
        text-align: center;padding-top: 14px;
    }
    .ivu-select-multiple {
        @h: 32px;
        min-width: 140px;width: auto;max-width: 140px * 2;
        .ivu-select-selection{
            &::before{
                left: 0;
            }
            &::after{
                right: 0;
            }
            &::before, &::after{
                content: '';position: absolute;top: 1px;height: 28px;width: 4px;
                background: #fff;z-index: 1;
            }
            height: @h;overflow: hidden;
            // text-overflow: ellipsis;
            white-space: nowrap;
            & > div{
                position: absolute;
                right: 24px;
                min-width: ~"calc(100% - 28px)";
            }
            .ivu-tag-checked{
                & ~ input{
                    display: none;
                }
            }
            .ivu-select-arrow{
                position: absolute;top: 14px;right: -24px;
                // margin-left: -12px;
            }
            
        }
        .ivu-select-arrow{
            padding: 7px;right: -4px;top: 15px;margin-top: 0;z-index: 3;background: #fff;
            transition: transform .2s ease-in-out;border-radius: 50%;
        }
    }
}
</style>
    
<template>
<div class="contract-item-container">
    <div class="item-header">
        <ul>
            <li class="name">
                <i class="iconfont icon-hetong2"></i>
                <span>{{item.name}}</span>
            </li>
            <li>
                <span class="label">{{$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_5003')}}</span>
                <span class="value">{{formatDate(item.signTime)}}</span>
            </li>
            <li>
                <span class="label">{{$t('modules_spoc_sign_web_src_views_studentaccont_contractitem_7450')}}</span>
                <span class="value">{{$t('modules_spoc_sign_web_src_views_studentaccont_contractitem_7451', [formatNums(item.signPrice)])}}</span>
            </li>
            <li>
                <span class="label">{{$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_takecourse_5872')}}</span>
                <span class="value">{{$t('modules_spoc_sign_web_src_views_studentaccont_contractitem_7451', [formatNums(item.deratePrice)])}}</span>
                <Tooltip theme="light">
                    <Icon type="ios-help-circle" />
                    <div slot="content">
                        <p v-for="(l, i) in deratePriceTooLists" :key="i">{{l}}</p>
                    </div>
                </Tooltip>
            </li>
            <li>
                <span class="label">{{$t('modules_spoc_sign_web_src_views_studentaccont_contractitem_7453')}}</span>
                <span class="value">{{$t('modules_spoc_sign_web_src_views_studentaccont_contractitem_7451', [formatNums(item.sparePrice)])}}</span>
                <Tooltip theme="light">
                    <Icon type="ios-help-circle" />
                    <div slot="content">
                        <p>{{$t('modules_spoc_sign_web_src_views_studentaccont_contractitem_7454', [item.receivedPrice])}}</p>
                    </div>
                </Tooltip>
            </li>
            <li>
                <span class="label">{{$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_5004')}}</span>
                <span class="value">{{item.sellerName}}</span>
            </li>
        </ul>
        <div class="header-right">
            <Button type="primary" @click="refund(item)" v-if="(item.status == 'paying' || item.status == 'normal') && (!(item.exceptionReceiptCount != '0'))">{{$t('modules_spoc_sign_web_src_views_studentaccont_contractitem_7456')}}</Button>
            <Button type="primary" @click="receipt(item)" v-if="item.sparePrice > 0">{{$t('modules_spoc_sign_web_src_views_studentaccont_contractitem_7457')}}</Button>
            <div class="icon-box" @click.stop="openOrClose()">
                <Icon type="ios-arrow-down" v-if="!open"/>
                <Icon type="ios-arrow-up" v-if="open"/>
            </div>
        </div>
    </div>
    <div class="item-content" v-if="open">
        <Table border :columns="columns1" :data="data1"></Table>
        <div class="contract-log-wrapper">
            <div class="log-header">
                <span class="name">{{$t('modules_spoc_sign_web_src_views_studentaccont_contractitem_7458')}}</span>
                <div class="right">
                    <Select v-model="subTypeList" multiple style="width:254px;margin-right: 12px;" :placeholder="$t('modules_spoc_sign_web_src_views_studentaccont_contractitem_7459')" @on-change="getLists">
                        <Option v-for="item in cw_capital_trace_sub_type" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Input v-model="searchVal" search :placeholder="$t('modules_spoc_sign_web_src_views_studentaccont_contractitem_7460')" style="width:254px;" @on-search="getLists"/>
                </div>
            </div>
            <Table border :columns="columnsLog" :data="logLists"></Table>
            <div class="page-wrapper">
                <Page :current="pageNo"
                    :total="count"
                    v-if="pageCount > 1"
                    show-elevator show-total show-sizer
                    :page-size="pageSize"
                    @on-change="pageChange"
                    @on-page-size-change="sizeChange">
                </Page>
            </div>
        </div>
    </div>
    <add-new-payment ref="addNewPayment" @uploadLists="uploadLists"></add-new-payment>
    <applyRefund ref="applyRefundRef"></applyRefund>
</div>
</template>

<script>
import valid, { errors, htStudentAccount, sysDict, cwCapitalTrace } from "../../libs/request";
import addNewPayment from "../receiptManagement/components/addNewPayment.vue";
import applyRefund from "../applyRefund/applyRefund";
export default {
    name: 'contractItem',
    props: {
        item: {
            type: Object,
            required: true
        },
        // open: {
        //     type: Boolean,
        //     default: false
        // }
        curStudent: {
            type: Object,
            required: true
        },
        accountOverview: {
            type: Object,
            required: true
        },
    },
    data(){
        return {
            open: !true,
            columns1: [],
            data1: [],
            searchVal: '',
            // checkList: ['A','B','C'],
            logLists: [],
            // getFinish: false, //获取
            cw_capital_trace_sub_type: [],
            subTypeList: [],
            columnsLog: [],
            pageNo: 1,//当前页码
            pageCount: 1,//页码总数 
            pageSize: 10,//每页条数
            count: 0,//数据总数
        };
    },
    computed: {
        deratePriceTooLists() {
            let arr = []
            if(this.item.discountRemarks && this.item.discountRemarks.length) {
                arr = this.item.discountRemarks.split('、');
            }
            return arr
        }
    },
    components: {
        addNewPayment,
        applyRefund
    },
    mounted(){
        this.init();
    },
    methods: {
        init() {
            // console.log(this.item)
            this.columns1 = [
                {
                    title: this.$t('modules_spoc_jw_web_src_views_chargingmanage_chargingmanagelist_2335'),
                    key: 'courseName',
					resizable: true,
					width: null,
                },
                {
                    title: this.$t('modules_spoc_sign_web_src_views_discount_componet_vadddiscountitem_6177'),
                    key: 'courseUnitPrice',
					resizable: true,
					width: null,
                },
                {
                    title: this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_604'),
                    key: 'courseHourNum',
					resizable: true,
					width: null,
                },
                {
                    title: this.$t('modules_spoc_sign_web_src_views_studentaccont_contractitem_7464'),
                    key: 'coursePrice',
					resizable: true,
					width: null,
                },
                {
                    title: this.$t('modules_spoc_sign_web_src_views_studentaccont_contractitem_7465'),
                    key: 'deratePrice',
					resizable: true,
					width: null,
                },
                {
                    title: this.$t('modules_spoc_sign_web_src_views_receiptmanagement_components_choosecontract_7004'),
                    key: 'costNum',
					resizable: true,
					width: null,
                },
                {
                    title: this.$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2134'),
                    key: 'remainCourseHour',
					resizable: true,
					width: null,
                    render: (h, params) => {
                        return h('span', `${params.row.remainMoneyCourseHour} + ${params.row.remainPresentCourseHour}`)
                    }
                },
            ];
            this.columnsLog = [
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
                {
                    title: this.$t('modules_spoc_sign_web_src_views_studentaccont_contractitem_7477'),
                    key: 'no',
                    render: (h, params) => {
                        return h('div', params.row.no || '-')
                    }
                },
                {
                    title: this.$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3111'),
                    key: 'remarks',
                    render: (h, params) => {
                        return h('div', params.row.remarks || '-')
                    }
                }
            ]
            this.baseData();

        },
        openOrClose() {
            this.open = !this.open;
            if(this.open) {
                this.getStudentContractCourse();
                // this.getLists();
            }
        },
        formatDate(date) {
            let _date = new Date(date).format('yy/MM/dd');
            return _date;
        },
        formatNums(val){
            //格式化数字
            if(val !== undefined){
                let newNum = Number(val).toFixed(2).toString();
                let prev = newNum.split('.')[0]
                let next = newNum.split('.')[1]
                prev = prev.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
                newNum = prev+'.'+ next;
                return newNum;
            }
        },
        getStudentContractCourse() {
            // this.data1 = [];
            let params = {
                ctId: this.item.ctId
            }
            htStudentAccount.getStudentContractCourse(params)
            .then(valid.call(this))
            .then(res=>{
                if(res.ok){
                    let _data = res.data.data;
                    this.data1 = _data;
                }
            })
            .catch(errors.call(this))
        },
        receipt(item) {
            // 收费
            // console.log('receipt', item, this.curStudent)
            this.$refs.addNewPayment.showPopFromContractItem({
                studentId: this.curStudent.studentId,
                studentName: this.accountOverview.studentName,
                contract: item,
                cusId: this.curStudent.cusId
            });
        },
        refund(item) {
            // 退费
            let obj = Object.assign({}, item);
            obj.studentId = this.curStudent.studentId;
            obj.studentName = this.accountOverview.studentName;
            this.$refs["applyRefundRef"].applyRefundRefShow(obj);
        },
        baseData() {
			let types = [
                'cw_capital_trace_sub_type', //分类筛选
            ]
			sysDict.batchListData({
				types: types.join(',')
			})
			.then(valid.call(this))
			.then(res => {
				if (res.ok) {
                    let _data = res.data.data;
                    // console.log(_data)
                    this.cw_capital_trace_sub_type = _data.cw_capital_trace_sub_type;
                    this.subTypeList = [this.cw_capital_trace_sub_type[0].value]
				}
			})
            .catch(errors.call(this));
        },
        getLists() {
            if(!this.subTypeList.length) {
                // this.$Message.error('请选择分类筛选');
                return false;
            }
            let params = {
                filtered: '0',
                officeId: this.curStudent.officeId,
                studentId: this.curStudent.studentId,
                contractId: this.item.ctId,
                subTypeList: this.subTypeList,
                param: this.searchVal,
                pageNo: this.pageNo,
                pageSize: this.pageSize
            }
            cwCapitalTrace.listStuPage(params)
            .then(valid.call(this))
			.then(res => {
				if (res.ok) {
                    let _data = res.data.data;
                    this.logLists = _data.list;
                    this.pageCount = _data.pages;
                    this.pageCount = _data.total;
				}
			})
            .catch(errors.call(this));
        },
        pageChange(page) {
            this.pageNo = page;
            this.getLists();
        },
        sizeChange(size) {
            this.pageSize = size;
            this.getLists();
        },
        uploadLists() {
            this.$emit('uploadLists');
        },
    }
}
</script>


