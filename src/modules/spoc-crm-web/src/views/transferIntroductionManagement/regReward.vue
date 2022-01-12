<style lang="less">
.reg-reward{
    .common{
        ul{
            zoom: 1;
            &::after, &::before{
                content: '';
                display: block;clear: both;height: 0;line-height: 0;font-size: 0;
            }
        }
        li{
            float: left;margin-bottom:16px;
            &:nth-child(2n) {
                width: 51%;
            }
            &:nth-child(2n + 1) {
                width: 49%;
            }
        }
        .label{
            float: left;font-size:14px;
            font-weight:normal;
            color:#999;
        }
        .value{
            float: left;
            max-width: 165px;
            font-size:14px;
            font-weight:normal;
            color:#495060;
            // span{
            //     display: inline-block;
            //     &::after{
            //         content: ','
            //     }
            //     &:last-child::after{
            //         display: none;
            //     }
            // }
            i{
                color: #C8C9D0;
                position: relative;
                top: -1px;
                margin-left: 3px;
            }
        }
    }
    .reward-input{
        // display: flex;
        // flex-direction: row;
        // justify-content: flex-start;
        // align-items: center;
        padding-left: 72px;position: relative;
        span{
            position: absolute;left: 0;width: 72px;
            top: 50%;transform: translate(0,-50%);
            font-size:14px;
            font-weight:normal;
            color:rgba(153,153,153,1);
            text-align: left;
        }
        p{
            position: absolute;bottom: -20px;left: 72px;
            line-height: 20px;color: #f00;
        }
    }
    .error{
        .ivu-input{
            border-color: #f00;
        }
    }
}
</style>

<template>
    <div class="reg-reward-container">
        <Modal
            v-model="regReward"
            :loading="loading"
            width="600"
            class="reg-reward"
            :title="$t('modules_spoc_crm_web_src_views_transferintroductionmanagement_regreward_2009')"
            :mask-closable="false"
            @on-ok="save">
            <div class="common">
                <ul>
                    <li>
                        <span class="label">{{$t('modules_spoc_crm_web_src_views_customer360_components_leftbanner_816')}}</span>
                        <div class="value">{{item.name || '-'}}</div>
                    </li>
                    <li>
                        <span class="label">{{$t('modules_spoc_crm_web_src_views_transferintroductionmanagement_regreward_2011')}}</span>
                        <div class="value">
                            <span>{{item.phone && item.phone.length ? item.phone[0].starPhone : ''}}</span>
                            
                            <Tooltip placement="right" v-if="item.phone && item.phone.length > 1">
                                <Icon type="ios-information-circle"/>
                                <div slot="content">
                                    <p v-for="(p, index) in item.phone" :key="index">{{p.starPhone}}</p>
                                </div>
                            </Tooltip>
                            <!-- <span v-for="p in item.phone" :key="p">{{p}}</span> -->
                        </div>
                    </li>
                    <li>
                        <span class="label">{{$t('modules_spoc_crm_web_src_views_customer360_components_studentsource_1024')}}</span>
                        <div class="value">{{item.referralerName || '-'}}</div>
                    </li>
                    <li>
                        <span class="label">{{$t('modules_spoc_crm_web_src_views_transferintroductionmanagement_regreward_2013')}}</span>
                        <div class="value">{{item.followerName || '-'}}</div>
                    </li>
                    <li>
                        <span class="label">{{$t('modules_spoc_crm_web_src_views_performanceplan_modal_1478')}}</span>
                        <div class="value">{{item.officeName || '-'}}</div>
                    </li>
                    <li>
                        <span class="label">{{$t('modules_spoc_crm_web_src_views_customer360_components_studentsource_1006')}}</span>
                        <div class="value">{{item.createDate || '-'}}</div>
                    </li>
                </ul>
            </div>
            <div class="reward-input">
                <span>{{$t('modules_spoc_crm_web_src_views_transferintroductionmanagement_regreward_2016')}}</span>
                <Input v-model="reward" @on-change="changeReward" type="textarea" :class="{'error': error}" :rows="2" style="width: 472px;" :placeholder="$t('modules_spoc_crm_web_src_views_transferintroductionmanagement_regreward_2017')"/>
                <p v-if="error" class="error">{{$t('modules_spoc_crm_web_src_views_transferintroductionmanagement_regreward_2017')}}</p>
            </div>
        </Modal>
    </div>
</template>

<script>
import valid, { errors, crmReferral } from "../../libs/request";
import { mapMutations, mapState } from "vuex";

export default {
    data() {
        return {
            isActioning: false, //多次提交拦截
            regReward:false,
            item: {},
            reward: '',
            loading: true,
            error: false,
        }
    },
    methods: {
         ...mapMutations(["updateLoadingStatus"]),
        show(data) {
            this.error = false;
            this.reward = data.reward;
            this.item = Object.assign({}, data);
            if(data.phone) {
                this.item.phone = JSON.parse(data.phone);
            }
            this.regReward = true;
        },
        save() {
            if(this.reward && this.reward.length >= 3) {
                let params = {
                    reward: this.reward,
                    id: this.item.id
                }
                if(this.isActioning){ //多次提交拦截
                    return
                }
                this.isActioning = true
                this.updateLoadingStatus({ isLoading: true });

                crmReferral.reward(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.regReward = false;
                        this.$emit('uploadLists');
                    }
                })
                .catch(errors.call(this)).finally(()=>{
                    this.updateLoadingStatus({ isLoading: false });
                    setTimeout(()=>{
                        //多次提交拦截
                        this.isActioning = false
                    },200)
                })
            } else {
                this.error = true;
                this.changeLoading();
            }
        },
        changeLoading() {
            this.loading = false;
            setTimeout(() => {
                this.loading = true;
            }, 0);
        },
        changeReward(e) {
            let _str = e.target.value;
            if(_str.length >= 3) {
                this.error = false;
            } else {
                this.error = true;
            }
        }
    }
}
</script>
