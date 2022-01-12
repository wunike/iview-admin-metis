<style lang="less">
    .signManageDetail {
        padding: 40px 35px;
        .baseInfo,.appendList,.checkRecord,.other{
            p:first-of-type {
                font-size: 20px;
                font-weight: 600;
                margin-bottom: 10px;
            }
        }

	.table{
		text-align: center;
		border: 1px #dddee1 solid;
		background: #dddee1;
		td{
			background: #FFFFFF;
		}
		th{
			background: #f7f7f7;
		}
	}
        .baseInfo,.appendList{
            overflow: hidden;
            .left,.right {
                margin: 0;
                margin-bottom:30px;
                position: relative;
                float: left;
                width: 50%;
                p {
                    font-weight: normal;
                    font-size: 14px;
                    line-height: 31px;
                    margin: 0;
                    display: flex;
                    justify-content: flex-start;
                    align-items: flex-start;
                }

                span {
                    color: #b8b8b8;
                    display: inline-block;
                    text-align: right;
                }
                i{
                	font-style: normal;
                	display: inline-block;
                	width: 598px;
                	word-break: break-all;
                }
                .sale {
                    display: block;
                    color: #495060;
                    width: 500px;
                    text-align: left;
                }
            }

            .left {
                span {
                    display: inline-block;
                    width: 130px;
                }
                .first {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 130px;
                }
            }
            .left1 {
                overflow: hidden;
                padding-left: 130px;
                flex-wrap: wrap;
                justify-content: space-between;
            }

            .right {
                span {
                    width: 145px;
                }
                .first {
                    position: absolute;
                    left: 0;
                    width: 80px;
                    overflow: hidden;
                    top: 0;
                }
            }
            .right1 {
                flex-wrap: wrap;
                justify-content: space-between;
                padding-left: 80px;
            }
            .remarks {
                float: left;
                .other {
                    position: relative;
                    color: #000;
                    font-size: 14px;
                    padding-left: 130px;
                    min-height: 24px;
                    font-weight: normal;
                    margin-bottom: 5px;
                    .title {
                        line-height: 15px;
                        position: absolute;
                        display: inline-block;
                        width: 130px;
                        color: #b8b8b8;
                        left: 0;
                        top: 4px;
                        text-align: right;
                    }
                }
            }
        }
        .appendList {
            font-size: 14px;
            .bar {
                line-height: 24px;
                text-indent: 2em;
                p {
                    font-size: 14px;
                    font-weight: normal;
                    margin-bottom: 0;
                }
                margin-bottom: 20px;
            }

            .checkman {
                margin-top: 10px;
            }
        }
        .checkRecord {
            margin-top: 18px;
        }
    }

</style>
<template>
    <div class="signManageDetail">
        <div class="baseInfo">
            <p>{{$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1506')}}</p>
            <div class="left">
                <p><span>{{$t('modules_spoc_sign_web_src_views_approval_approvalnew_5071')}}</span>：<i style="color:#36a29e;font-style:normal;width:130px;">{{data.code}}</i></p>
                <p><span>{{$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5667')}}</span>：{{data.name}}</p>
                <p><span>{{$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4477')}}</span>：{{data.signPrice}}</p>
                <!-- <p><span>{{$t('modules_spoc_sign_web_src_views_signmanage_signmanagedetail_7380')}}</span>：{{data.presentPriceCost}}</p> -->
                <!--<p><span>{{$t('modules_spoc_sign_web_src_views_signmanage_signmanagedetail_7381')}}</span>：{{data.partnerName}}</p>-->
                <p><span>{{$t('modules_spoc_sign_web_src_views_signmanage_signmanagedetail_7382')}}</span>：{{data.sellerUserRoleName}} -- {{data.sellerUser.name}}</p>
            </div>
            <div class="right">
                <p><span>{{$t('modules_spoc_sign_web_src_views_signmanage_signmanagedetail_7383')}}</span>：{{data.no}}</p>
                <p><span>{{$t('modules_spoc_sign_web_src_views_signmanage_signmanage_7352')}}</span>：{{data.price}}</p>
                <p><span>{{$t('modules_spoc_sign_web_src_views_signmanage_signmanagedetail_7385')}}</span>：{{data.presentPrice}}</p>
                <!--<p><span>{{$t('modules_spoc_sign_web_src_views_signmanage_signmanagedetail_7386')}}</span>：{{data.partnerRatio}}</p>-->
            </div>
        </div>
        <div v-if="data.protocolContent" class="appendList">
            <p>{{$t('modules_spoc_sign_web_src_views_signmanage_signmanagedetail_7387')}}</p>
            <div class="bar">
                <p v-for="item in list" v-html="getParse(item)"></p>
            </div>
            <!-- <div class="left">
                <p class="left1">
                    <span class="first">{{$t('modules_spoc_sign_web_src_views_contractgeneration_contractgeneration1_5607')}}</span>
                    <span class="sale" v-for="(item, index) in saleList">{{index+1}}. {{item}}</span>
                </p>
            </div>
            <div class="right">
                <p  class="right1">
                    <span class="first">{{$t('modules_spoc_sign_web_src_views_contractgeneration_contractgeneration1_5613')}}</span>
                    <span class="sale" v-for="(item, index) in saleList">{{index+1}}. {{item}}</span>
                </p>
            </div> -->
           <div class="remarks">
               <p class="other">
                   <span class="title">{{$t('modules_spoc_sign_web_src_views_signmanage_signmanagedetail_7390')}}<br/>{{$t('modules_spoc_sign_web_src_views_signmanage_signmanagedetail_7391')}}</span>：{{data.discountRemarks}}</p>
               <p class="other" style="margin-top:20px;">
                   <span class="title">{{$t('modules_spoc_jw_web_src_views_signindetail_components_bigtablenormal_3111')}}</span>：{{data.remarks}}</p>
           </div>
        </div>
        <div class="appendList">
            <p>{{$t('modules_spoc_sign_web_src_views_signmanage_signmanagedetail_7393')}}</p>
            <div class="checkman">
                <div class="left">
                    <p><span>{{$t('modules_spoc_sign_web_src_views_signmanage_signmanagedetail_7394')}}</span>：{{data.factAuditorName}}</p>
                    <p><span>{{$t('modules_spoc_sign_web_src_views_signmanage_signmanagedetail_7395')}}</span>：{{data.auditorTime}}</p>
                    <p><span>{{$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1642')}}</span>：{{data.signTime}}</p>
                </div>
                <div class="right">
                    <p ><span>{{$t('modules_spoc_sign_web_src_views_signmanage_signmanagedetail_7397')}}</span>：<i>{{data.auditorName}}</i></p>
                    <!-- <p v-if="data.auditorStatus !== $t('mycourse_mycourse_387')"><span>{{$t('modules_spoc_sign_web_src_modules_tabledetails_4950')}}</span>：<i>{{data.reason}}</i></p>
                    <p v-if="data.auditorStatus == $t('mycourse_mycourse_387')"><span>{{$t('modules_spoc_sign_web_src_views_signmanage_signmanagedetail_7400')}}</span>：<i>{{data.auditorStatus}}</i></p> -->
                    <p v-if="data.auditorStatus !== '已通过'"><span>{{$t('modules_spoc_sign_web_src_modules_tabledetails_4950')}}</span>：<i>{{data.reason}}</i></p>
                    <p v-if="data.auditorStatus == '已通过'"><span>{{$t('modules_spoc_sign_web_src_views_signmanage_signmanagedetail_7400')}}</span>：<i>{{data.auditorStatus}}</i></p>
                    <p><span>{{$t('modules_spoc_jw_web_src_views_models_2936')}}</span>：<i>{{data.contractStatus}}</i></p>
                </div>
            </div>
        </div>
        <div class="appendList">
            <p>{{$t('modules_spoc_sign_web_src_modules_addinvoice_4781')}}</p>
            <div class="checkman">
                <div class="left">
                    <p><span>{{$t('modules_spoc_sign_web_src_modules_addinvoice_4817')}}</span>：{{data.htInvoice.type==0?$t('spoc_hootie_web_59'):$t('modules_spoc_sign_web_src_modules_addinvoice_4795')}}</i></p>
                    <p><span>{{$t('modules_spoc_sign_web_src_modules_addinvoice_4818')}}</span>：{{data.htInvoice.subType==0?$t('modules_spoc_sign_web_src_modules_addinvoice_4801'):$t('modules_spoc_sign_web_src_modules_addinvoice_4802')}}</p>
                    <p v-if="data.htInvoice.type==1"><span>{{$t('modules_spoc_sign_web_src_modules_addinvoice_4782')}}</span>：{{data.htInvoice.title}}</p>
                    <p v-if="data.htInvoice.type==0"><span>{{$t('modules_rolemanage_186')}}</span>：{{data.htInvoice.title}}</p>
                    <p><span>{{$t('modules_spoc_sign_web_src_modules_addinvoice_4821')}}</span>：{{data.htInvoice.taxNo}}</p>
                    <p><span>{{$t('modules_spoc_portal_views_workbenchnew_lists_index_4276')}}</span>：{{data.htInvoice.updateByName}}</p>
                    <p><span>{{$t('modules_spoc_sign_web_src_views_signmanage_signmanagedetail_7413')}}</span>：{{data.htInvoice.updateDate}}</p>
                </div>
                <div class="right">
                    <p ><span>{{$t('modules_spoc_sign_web_src_modules_addinvoice_4822')}}</span>：<i>{{data.htInvoice.address}}</i></p>
                    <p ><span>{{$t('modules_spoc_crm_web_src_views_onsitemanagement_onsitemanagement_1436')}}</span>：<i>{{data.htInvoice.phone}}</i></p>
                    <p ><span>{{$t('modules_spoc_sign_web_src_modules_addinvoice_4823')}}</span>：<i>{{data.htInvoice.bankName}}</i></p>
                    <p ><span>{{$t('modules_spoc_sign_web_src_modules_addinvoice_4824')}}</span>：<i>{{data.htInvoice.bankAccount}}</i></p>
                    <p ><span>{{$t('modules_spoc_sign_web_src_modules_addinvoice_4819')}}</span>：<i>{{data.htInvoice.categoryLabel}}</i></p>
                </div>
            </div>
        </div>
        <div class="checkRecord">
            <p>{{$t('modules_spoc_sign_web_src_modules_pactcard_4853')}}</p>
            <Table border style="margin-bottom:30px" :columns="columns1" :data="data1"></Table>
        </div>
        <div class="other">
            <p>{{$t('modules_spoc_sign_web_src_views_signmanage_signmanagedetail_7420')}}</p>
            <Table border :columns="columns2" :data="data2"></Table>            
        </div>
    </div>
</template>
<script>
import valid, { errors, htContract } from "../../libs/request"
export default {
    data() {
		return{
            signNumber: this.$route.query.signNumber,
            data: {
                sellerUser: {},
                protocolCustom: '',
                htInvoice: {
                },
            },
            saleList: [
                this.$t('modules_spoc_sign_web_src_views_signmanage_signmanagedetail_7421'),
                this.$t('modules_spoc_sign_web_src_views_signmanage_signmanagedetail_7421'),
                this.$t('modules_spoc_sign_web_src_views_signmanage_signmanagedetail_7421'),
                this.$t('modules_spoc_sign_web_src_views_signmanage_signmanagedetail_7421'),
                this.$t('modules_spoc_sign_web_src_views_signmanage_signmanagedetail_7421'),
                this.$t('modules_spoc_sign_web_src_views_signmanage_signmanagedetail_7421'),
                this.$t('modules_spoc_sign_web_src_views_signmanage_signmanagedetail_7421'),
            ],
            data1:[],
            data2: [],
            columns1: [
                {
                    title: this.$t('courselist_compontents_detailinfo_160'),
                    type: 'index',
                    align: 'center',
					resizable: true,
					width: null,
                },
                {
                    title: this.$t('modules_spoc_sign_web_src_views_signmanage_signmanagedetail_7423'),
                    key: 'content',
                    align: 'center',
					resizable: true,
					width: null,
                },
                {
                    title: this.$t('modules_spoc_sign_web_src_views_signmanage_signmanagedetail_7400'),
                    key: 'typeLabel',
                    align: 'center',
					resizable: true,
					width: null,
                    // render: (h, params) => {
                    //     return h('span', params.row.typeLabel)
					// }  
                },
                {
                    title: this.$t('modules_spoc_sign_web_src_views_signmanage_signmanagedetail_7424'),
                    key: 'reason',
                    align: 'center',
					resizable: true,
					width: null,
                     render: (h, params) => {
                        return h('span', params.row.reason == '' ? '-' : params.row.reason)
					}
                },
                {
                    title: this.$t('modules_spoc_sign_web_src_views_signmanage_signmanagedetail_7425'),
                    key: 'optUserName',
                    align: 'center',
					resizable: true,
					width: null,
                },
                {
                    title: this.$t('modules_spoc_sign_web_src_views_signmanage_signmanagedetail_7395'),
                    key: 'optTime',
                    align: 'center',
					resizable: true,
					width: null,
                },
            ],
            columns2: [
                {
                    title: this.$t('courselist_compontents_detailinfo_160'),
                    type: 'index',
                    align: 'center',
					resizable: true,
					width: null,
                },
                {
                    title: this.$t('integralflow_10'),
                    key: 'optUserName',
                    align: 'center',
					resizable: true,
					width: null,
                },
                {
                    title: this.$t('classlist_compontents_detailinfo_45'),
                    key: 'typeLabel',
                    align: 'center',
					resizable: true,
					width: null,
                },
                {
                    title: this.$t('messagemanagement_components_histroylists_313'),
                    key: 'optTime',
                    align: 'center',
					resizable: true,
					width: null,
                }
            ],
		}
    },

    computed: {
        list() {
            return this.data.protocolContent.split('\n')
        }
    },
    
    mounted() {
        this.getCheckSignRecord()
        this.getDetailTable()
        this.getDetailTableOther()
    },

	methods:{
		getParse(item){
//			console.log(item,typeof item)
//			console.log(JSON.parse(JSON.stringify(item)),typeof JSON.parse(JSON.stringify(item)))

        // 去掉转义字符  
        item = item.replace(/[\'\"\\\/\b\f\n\r\t]/g, ''); 
			return item;
		},
		getCheckSignRecord() {
            htContract.contractOperate({
                id:this.signNumber
            })
            .then(valid.call(this))
            .then(res => {
				if(res.ok) {
                    this.data = res.data.data
                    if (this.data.htInvoice == null) {
                       this.data.htInvoice = {} 
                    }
                     
				}
            })
            .catch(errors.call(this))
            .finally(() => {});
        },
        
        getDetailTable() {
            htContract.listOptLog({
                ctId:this.signNumber,
                inCludeTypes:'reject,check,agree',
            })
            .then(valid.call(this))
            .then(res => {
				if(res.ok) {
                    this.data1= res.data.data
				}
            })
            .catch(errors.call(this))
            .finally(() => {});
        },

        getDetailTableOther() {
            htContract.listOptLog({
                ctId:this.signNumber,
                exCludeTypes: 'reject,check'
            })
            .then(valid.call(this))
            .then(res => {
				if(res.ok) {
                    this.data2 = res.data.data
					
				}
            })
            .catch(errors.call(this))
            .finally(() => {});
        }
    },
    
};
</script>