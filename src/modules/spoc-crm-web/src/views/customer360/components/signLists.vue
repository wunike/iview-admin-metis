<style lang="less">
@mainColor: #44BCB7;
.sign-lists-container{
    position: relative;
    padding: 20px 20px 10px;min-height: 100%;
    background: #fff;
    .tabs{
        height: 30px;margin-bottom: 20px;
    }
    .tabs-btns{
        @h: 30px;
        li{
            float: left;height: @h;line-height: @h - 2px;
            width: 112px;margin-right: -1px;
            border: 1px solid #D4D5DA;font-size: 14px;
            text-align: center;
            cursor: pointer;
            &.active{
                background: @mainColor;border-color: @mainColor;color: #fff;
            }
            &:first-child{
                border-radius:4px 0px 0px 4px;
            }
            &:last-child{
                border-radius:0px 4px 4px 0px;
            }
        }
    }
    .sign-lists{
        padding-bottom: 20px;
    }
    .sign-item{
        padding: 8px 24px 16px;
        margin-bottom: 16px;
        box-shadow:0px 0px 4px 0px rgba(0,0,0,0.15);
        background: #fff;
    }
    .title{
        @h: 16px + 24px;
        height: @h;
        h2{
            float: left;
            span{
                float: left;
                line-height: @h;
                font-size: 16px;font-weight:normal;
            }
            img{
                float: left;height: 16px;margin-left: 6px;margin-top: 12px;
            }
        }
        .btns{
            float: right;padding-top: 8px;
            button{
                @h: 24px;
                margin-left: 8px;
                padding: 0 12px;
                height: @h;line-height: @h;
                border: none;
                font-size: 12px;
            }
        }
    }
    .detail{
        zoom: 1;
        &::before, &::after{
            content: '';
            display: block;clear: both;height: 0;line-height: 0;font-size: 0;
        }
    }
    .detail-item{
        @h: 30px;
        float: left;width: 100% / 3;
        height: @h;line-height: @h;
        font-size: 14px;
        .label{
            float: left;
            color: #999;
        }
        i{
            font-style: inherit;color: #F39945;
        }
    }
}
.customer360-stop-using-confirm{
    .ivu-modal-header{
        display: none;
    }
    .ivu-modal-body{
        padding: 16px 0 0;
    }
    .ivu-modal-footer {
        height: 32px + 24px;
        border-top: none;
        button{
            float: right;
            width: 66px;height: 32px;padding: 0;
        }
    }
    .title{
        @h: 22px;
        position: relative;
        padding: 16px 0 14px 70px;
        line-height: @h;height: @h + 30px;
        font-size: 16px;
        i{
            position: absolute;left: 32px;top: 16px;
            color: #FAAD14;font-size: 22px;
        }
        em{
            font-style: inherit;color: #F39945;
        }
    }
    .detail{
        line-height: 22px;
        padding: 0 32px 22px 70px;font-size: 14px;font-weight: 400;
        span{
            color: #FF1B1B;
        }
    }
}
</style>
    
<template>
<div class="sign-lists-container">
    <div class="tabs">
        <ul class="tabs-btns">
            <li :class="{active: signType == 'follow task'}" @click="changeTabs('follow task')">{{$t('modules_spoc_crm_web_src_views_customer360_components_signlists_862')}}</li>
            <li :class="{active: signType == 'service task'}" @click="changeTabs('service task')">{{$t('modules_spoc_crm_web_src_views_customer360_components_signlists_863')}}</li>
        </ul>
    </div>
    <div class="sign-lists">
        <div class="sign-item" v-for="(item, index) in signLists" :key="index">
            <div class="title">
                <h2>
                    <span>{{item.title}}</span>
                    <img src="../../../assets/img/icon-using.png" v-if="item.type == '1'" alt="">
                    <img src="../../../assets/img/icon-stop-using.png" v-else-if="item.type == '2'" alt="">
                    <img src="../../../assets/img/icon-stop.png" v-else-if="item.type == '3'" alt="">
                </h2>
                <div class="btns">
                    <Button type="primary">{{$t('modules_spoc_crm_web_src_views_customer360_components_signlists_864')}}</Button>
                    <Button type="primary" v-if="item.type != '3'" @click="openStopUsing(item)">{{$t('modules_spoc_crm_web_src_views_customer360_components_signlists_865')}}</Button>
                    <Button type="primary" v-if="signType == 'follow task'">{{$t('modules_spoc_crm_web_src_views_customer360_components_signlists_866')}}</Button>
                </div>
            </div>
            <div class="detail">
                <div class="detail-item">
                    <span class="label">{{$t('modules_spoc_crm_web_src_views_customer360_components_signlists_867')}}</span>
                    <div>{{$t('modules_spoc_crm_web_src_views_customer360_components_signlists_868')}}</div>
                </div>
                <div class="detail-item">
                    <span class="label">{{$t('modules_spoc_crm_web_src_views_customer360_components_signlists_869')}}</span>
                    <div>100.00</div>
                </div>
                <div class="detail-item">
                    <span class="label">{{$t('modules_spoc_crm_web_src_views_customer360_components_signlists_870')}}</span>
                    <div>100.00</div>
                </div>
                <div class="detail-item">
                    <span class="label">{{$t('modules_spoc_crm_web_src_views_customer360_components_signlists_871')}}</span>
                    <div>2019.11.5 -2019.11.30</div>
                </div>
                <div class="detail-item" style="width: 66%">
                    <span class="label">{{$t('modules_spoc_crm_web_src_views_customer360_components_signlists_872')}}</span>
                    <div><i>20</i>{{$t('modules_spoc_crm_web_src_views_customer360_components_signlists_873')}}<i>49</i>{{$t('modules_spoc_crm_web_src_views_customer360_components_signlists_874')}}</div>
                </div>
                <div class="detail-item" style="width: 100%">
                    <span class="label">{{$t('modules_spoc_crm_web_src_views_customer360_components_signlists_875')}}</span>
                    <div>{{$t('modules_spoc_crm_web_src_views_customer360_components_signlists_876')}}</div>
                </div>
            </div>
        </div>
    </div>
    <Modal
        v-model="stopUsingModal"
        :closable="false"
        width="433"
        class="customer360-stop-using-confirm">
        <div slot="header"></div>
        <div class="title">
            <Icon type="md-help-circle" />
            <span>{{$t('modules_spoc_crm_web_src_views_customer360_components_signlists_877')}}<em>{{$t('modules_spoc_crm_web_src_views_customer360_components_signlists_865')}}</em>{{$t('modules_spoc_crm_web_src_views_customer360_components_signlists_878')}}</span>
        </div>
        <div class="detail">{{$t('modules_spoc_crm_web_src_views_customer360_components_signlists_879')}}</div>
        <div slot="footer">
            <div>
                <Button type="primary" style="margin-left: 8px" @click="stopUsing">{{$t('modules_spoc_crm_web_src_views_customer360_components_signlists_880')}}</Button>
                <Button @click="stopUsingCancel">{{$t('modules_spoc_crm_web_src_views_customer360_components_signlists_881')}}</Button>
            </div>
        </div>
    </Modal>
</div>
</template>

<script>
/**
 ** @author: 曹见芳
 ** 客户360 - 合同信息
 */
import valid, { errors, crmCustomerDetail } from "../../../libs/request";
import { mapMutations, mapState } from 'vuex';
import { clone, waitUntil } from '@public/libs/util.js'
export default {
    name: 'signLists',
    props: {
        id: {
            type: String,
            required: true
        }
    },
    data(){
        return {
            myButtonPrem: [],
            signType: 'follow task',
            signLists: [
                {
                    id: 1,
                    title: this.$t('modules_spoc_crm_web_src_views_customer360_components_signlists_882'),
                    type: '1', // 使用中
                },
                {
                    id: 2,
                    title: this.$t('modules_spoc_crm_web_src_views_customer360_components_signlists_882'),
                    type: '2', // 停用中
                },
                {
                    id: 3,
                    title: this.$t('modules_spoc_crm_web_src_views_customer360_components_signlists_882'),
                    type: '3', // 已结束
                }
            ],
            stopUsingModal: false,
            stopId: '',
        };
    },
    computed: {
        ...mapState(["buttonPerm"]),
    },
    mounted(){
        waitUntil(
            () => {
                return JSON.stringify(this.buttonPerm)!= '{}' || false;
            },
            () => {
                this.myButtonPrem = this.buttonPerm['crm.customer360'] || []
            }
        );
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        getLists() {
            // this.updateLoadingStatus({ isLoading: true });
            // let obj = Object.assign({}, this.studData);
            // obj = JSON.parse(JSON.stringify(obj));
            // common.comStudentSave(obj)
            // .then(valid.call(this))
            // .then(res => {
            //     if(res.ok) {
            //         this.getInfo();
            //         this.close();
            //     }
            // })
            // .catch(errors.call(this))
            // .finally(() => {
            //     this.updateLoadingStatus({ isLoading: false });
            // });
        },
        changeTabs(str) {
            console.log('changeTabs', str)
            this.signType = str;
        },
        openStopUsing(item) {
            this.stopId = item.id;
            this.stopUsingModal = true;
        },
        stopUsing() {
            this.stopUsingCancel();
        },
        stopUsingCancel() {
            this.stopUsingModal = false;
        },
    },
    watch: {
        id: function(newVal, oldVal){
            console.log('watch id', newVal);
        }
    }
}
</script>


