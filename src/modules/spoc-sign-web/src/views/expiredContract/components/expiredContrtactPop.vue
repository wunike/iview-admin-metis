<style lang="less">
.expired-pop-container{
    .ivu-modal-footer .ivu-btn-text{
        border:1px solid rgb(220, 222, 226);
    }
    .ivu-modal-footer .ivu-btn-text:hover{
        border:1px solid rgb(220, 222, 226);
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
    .ivu-modal-body{
        padding:24px 24px 10px 24px;
    }
    .expired-box{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        .item{
            width:50%;
            padding-bottom:14px ;
            font-size: 14px;
            span{
                display: inline-block;
                width:110px;
                text-align: right;
                color: #999;
            }
            b{
                font-weight: normal;
            }
        }
    }
}
</style>

<template>
    <div class="expired-pop">
        <!-- <Modal
                class="expired-pop-container"
                width="600"
                v-model="expiredPopContainer"
                :mask-closable="false"
                @on-cancel="cancel"
                :title="$t('modules_spoc_sign_web_src_views_expiredcontract_components_expiredcontrtactpop_6509')">
            <div class="expired-box">
                <div class="item"><span>{{$t('classroom_exchange_96')}}</span><b>{{$t('modules_spoc_sign_web_src_views_expiredcontract_components_expiredcontrtactpop_6511')}}</b></div>
                <div class="item"><span>{{$t('portal_app_Centres')}}</span><b>{{$t('modules_spoc_sign_web_src_views_expiredcontract_components_expiredcontrtactpop_6513')}}</b></div>
                <div class="item"><span>{{$t('modules_spoc_sign_web_src_views_expiredcontract_components_expiredcontrtactpop_6514')}}</span><b>{{$t('modules_spoc_sign_web_src_views_expiredcontract_components_expiredcontrtactpop_6515')}}</b></div>
                <div class="item"><span>{{$t('modules_spoc_sign_web_src_views_expiredcontract_components_expiredcontrtactpop_6516')}}</span><b>EE 1</b></div>
                <div class="item"><span>{{$t('views_coursepack_coursepack_363')}}</span><b>EE</b></div>
                <div class="item"><span>{{$t('messagemanagement_components_infos_322')}}</span><b>EE 1</b></div>
                <div class="item"><span>{{$t('modules_spoc_jw_web_src_views_attendancepage_attendancepage_2307')}}</span><b>EE 1</b></div>
                <div class="item"><span>{{$t('modules_spoc_sign_web_src_views_contractrefund_refunddetail_5833')}}</span><b>EE 1</b></div>
                <div class="item"><span>{{$t('modules_spoc_sign_web_src_views_expiredcontract_components_expiredcontrtactpop_6521')}}</span><b>2019-03-06</b></div>
                <div class="item"><span>{{$t('modules_spoc_sign_web_src_views_expiredcontract_components_expiredcontrtactpop_6522')}}</span><b>{{$t('modules_spoc_sign_web_src_views_expiredcontract_components_expiredcontrtactpop_6511')}}</b></div>
                <div class="item"><span>{{$t('modules_spoc_sign_web_src_views_expiredcontract_components_expiredcontrtactpop_6523')}}</span><b>2019-03-06 22:22</b></div>
                <div class="item"><span>{{$t('modules_spoc_sign_web_src_views_expiredcontract_components_expiredcontrtactpop_6524')}}</span><b>{{$t('modules_spoc_sign_web_src_views_expiredcontract_components_expiredcontrtactpop_6525')}}</b></div>
                <div class="item"><span>{{$t('modules_spoc_sign_web_src_views_expiredcontract_components_expiredcontrtactpop_6526')}}</span><b>1</b>{{$t('modules_spoc_jw_web_src_views_servicescharts_serviceschartspart5_3102')}}</div>
            </div>
            <div slot="footer">
                <Button @click="cancel">{{$t('classroom_allscore_53')}}</Button>
                <Button type="primary" @click="submit">{{$t('modules_spoc_sign_web_src_views_expiredcontract_components_expiredcontrtactpop_6529')}}</Button>
            </div>
        </Modal>
 -->
    </div>
</template>

<script>
    export default {
        name: 'turnCenter',
        props: {

        },
        data() {
            return {
                expiredPopContainer:false
            }
        },
        mounted() {

        },

        methods: {
            show(){
                this.expiredPopContainer=true
            },
            cancel() {
                this.expiredPopContainer=false
            },
            submit() {
                /* this.$Modal.confirm({
                    title: '过期课程收入',
                    content: '<span style="color:#F5222D;">确认收入后，学员的课程状态将改为结课</span>,<br/> 你还要继续吗？',
                    onCancel: ()=> {

                    },
                    onOk: ()=> {

                    },
                }); */
            },
        }
    }
</script>
