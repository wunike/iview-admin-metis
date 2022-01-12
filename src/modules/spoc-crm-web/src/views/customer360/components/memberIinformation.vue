<style lang="less">
@mainColor: #44BCB7;
.member-iinformation-container{
    margin-top: 8px;
    position: relative;padding-bottom: 10px;padding-top: 25px;
    background: #fff;
    .pane-tabs{
        @h: 30px;
        margin: 0 10px;
        ul{
            display: flex;
        }
        li{
            position: relative;z-index: 1;
            flex: 1;
            height: @h;line-height: @h - 2px;
            text-align: center;
            border: 1px solid #D4D5DA;
            margin-right: -1px;font-size: 12px;
            cursor: pointer;
            &:first-child{
                border-radius:4px 0px 0px 4px;
            }
            &:last-child{
                border-radius:0px 4px 4px 0px;
            }
            &.active{
                z-index: 2;
                background: @mainColor;border-color: @mainColor;color: #fff;
            }
        }
    }
    .detail{
        @span: 46px + 36px;
        padding-top: 11px;padding-left: 19px;
        li{
            @h: 28px;
            position: relative;height: @h;line-height: @h;
            padding-left: @span;
        }
        span{
            position: absolute;left: 0;top: 0;width: @span;
            color: #999;
        }
        &.detail-title-lang{
            @span: 100px;
            li{
                padding-left: @span;
            }
            span{
                width: @span;
            }
        }
        .title{
            position: relative;top: -10px;
            line-height: 20px;
            font-size: 14px;font-weight: bold;
        }
    }
}
</style>
    
<template>
<div class="member-iinformation-container">
    <div class="pane-tabs" v-if="detailData.type == '1'">
        <ul>
            <li @click="memberNum = '1'"  :class="{active: memberNum == 1}">{{$t('modules_spoc_crm_web_src_views_customer360_components_memberiinformation_830')}}</li>
            <li @click="memberNum = '2'"  :class="{active: memberNum == 2}">{{$t('modules_spoc_crm_web_src_views_customer360_components_memberiinformation_831')}}</li>
        </ul>
    </div>
    <div class="detail detail-title-lang">
        <div class="title" v-if="detailData.type == '0'">{{$t('modules_spoc_crm_web_src_views_customer360_components_memberiinformation_832')}}</div>
        <ul v-if="detailData.type == '1' && memberNum == 1">
            <li>
                <span>{{$t('modules_spoc_crm_web_src_views_customer360_components_memberiinformation_833')}}</span>
                <div>{{$t('modules_spoc_crm_web_src_views_customer360_components_memberiinformation_834')}} {{ detailData.statusLabel ? '-' + detailData.statusLabel : '' }}</div>
            </li>
            <li>
                <span>{{$t('modules_spoc_crm_web_src_views_customer360_components_memberiinformation_835')}}</span>
                <div>{{$t('modules_spoc_crm_web_src_views_customer360_components_memberiinformation_836', [detailStatistics2.returnVisitNum || 0])}}</div>
            </li>
            <li>
                <span>{{$t('modules_spoc_crm_web_src_views_customer360_components_memberiinformation_837')}}</span>
                <div>{{$t('modules_spoc_crm_web_src_views_customer360_components_memberiinformation_836', [detailStatistics2.interviewNum || 0])}}</div>
            </li>
            <li>
                <span>{{$t('modules_spoc_crm_web_src_views_customer360_components_memberiinformation_838')}}</span>
                <div>{{$t('modules_spoc_crm_web_src_views_customer360_components_memberiinformation_836', [detailStatistics2.signNum || 0])}}</div>
            </li>
            <li>
                <span>{{$t('modules_spoc_crm_web_src_views_customer360_components_memberiinformation_839')}}</span>
                <div>{{$t('modules_spoc_crm_web_src_views_customer360_components_memberiinformation_836', [detailStatistics2.monthPresentAvg || 0])}}</div>
            </li>
        </ul>
        <ul v-if="detailData.type == '0' || memberNum == 2">
            <!-- <li>
                <span>{{$t('modules_spoc_crm_web_src_views_customer360_components_memberiinformation_840')}}</span>
                <div>{{detailData.ownerOfficeName}}</div>
            </li> -->
            <li>
                <span>{{$t('modules_spoc_crm_web_src_views_customer360_components_memberiinformation_841')}}</span>
                <div>{{detailData.ownerName}}</div>
            </li>
            <li>
                <span>{{$t('modules_spoc_crm_web_src_views_customer360_components_memberiinformation_833')}}</span>
                <div>{{detailData.isVleads == '0' ? 'leads' : 'vleads'}}{{detailData.statusLabel ? '-' + detailData.statusLabel : ''}}</div>
            </li>
            <!-- <li>
                <span>{{$t('modules_spoc_crm_web_src_views_customer360_components_memberiinformation_842')}}</span>
                <div>{{$t('modules_spoc_crm_web_src_views_customer360_components_memberiinformation_836', [detailStatistics1.traceTotalNum || 0])}}</div>
            </li>
            <li>
                <span>{{$t('modules_spoc_crm_web_src_views_customer360_components_memberiinformation_843')}}</span>
                <div>{{$t('modules_spoc_crm_web_src_views_customer360_components_memberiinformation_836', [detailStatistics1.traceNum || 0])}}</div>
            </li> -->
            <li>
                <span>{{$t('modules_spoc_crm_web_src_views_customer360_components_memberiinformation_844')}}</span>
                <div>{{$t('modules_spoc_crm_web_src_views_customer360_components_memberiinformation_836', [detailStatistics1.traceFollowCount || 0])}}</div>
            </li>
            <li>
                <span>{{$t('modules_spoc_crm_web_src_views_customer360_components_memberiinformation_845')}}</span>
                <div>{{$t('modules_spoc_crm_web_src_views_customer360_components_memberiinformation_836', [detailStatistics1.oppNum || 0])}}</div>
            </li>
            <li>
                <span>{{$t('modules_spoc_crm_web_src_views_customer360_components_memberiinformation_846')}}</span>
                <div>{{$t('modules_spoc_crm_web_src_views_customer360_components_memberiinformation_847', [detailStatistics1.intervalDate || 0])}}</div>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
/**
 ** @author: 曹见芳
 ** 客户360 - 左侧memberIinformation
 */
import valid, { errors, crmCustomerDetail } from "../../../libs/request";
export default {
    name: 'memberIinformation',
    props: {
        detailData: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },
    data(){
        return {
            memberNum: 1,
            detailStatistics1: { //非会员信息
                intervalDate: '',
                interviewNum: '',
                monthPresentAvg: '',
                oppNum: '',
                returnVisitNum: '',
                signNum: '',
                traceNum: '',
                traceTotalNum: '',
            },
            detailStatistics2:{ //会员信息
                intervalDate: '',
                interviewNum: '',
                monthPresentAvg: '',
                oppNum: '',
                returnVisitNum: '',
                signNum: '',
                traceNum: '',
                traceTotalNum: '',
            }
        };
    },
    mounted() {
        this.getDetailStatistics();
    },
    methods: {
        getDetailStatistics() {
            if(this.detailData.type == 1){
                //会员信息
                let params1 = {
                    id: this.id
                }
                crmCustomerDetail.statisticsMember(params1)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.detailStatistics2 = res.data.data || {};
                    }
                })
                .catch(errors.call(this))
                
            }
            //非会员信息
            let params = {
                id: this.id
            }
            crmCustomerDetail.statisticsUnMember(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.detailStatistics1 = res.data.data || {};
                    this.$emit('uploadTraceTotalNum', this.detailStatistics1.traceTotalNum)
                }
            })
            .catch(errors.call(this))
        }
    },
    watch: {
        detailData: {
            handler(val, oval) {
                this.getDetailStatistics();
            },
            deep: true
        }
    }
}
</script>


