<style lang="less">
.bgF9CA01() {
    background: #f9ca01;
    .arrow {
        background: #f9ca01;
        &::after {
            border-left-color: #f9ca01;
        }
    }
}
.bgF39945() {
    background: #f39945;
    .arrow {
        background: #f39945;
        &::after {
            border-left-color: #f39945;
        }
    }
}
.bg012F67() {
    background: #012f67;
    .arrow {
        background: #012f67;
        &::after {
            border-left-color: #012f67;
        }
    }
}
.danhang {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.customer-steps-container {
    position: relative;
    height: 56px;
    display: flex;
    .step-item {
        flex: 1;
        position: relative;
        padding-left: 20px;
        height: 100%;
        background: #ebecf0;
        color: #999;
        overflow: hidden;
        @w: 24px;
        .num {
            float: left;
            width: @w;
            height: @w;
            border-radius: @w;
            border: 1px solid #c0c0c0;
            text-align: center;
            // margin-right: 4px;
        }
        .title {
            font-weight: bold;
            display: block;
            .danhang;
        }
        .arrow {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 20px;
            background: #ebecf0;
            z-index: 2;
            overflow: hidden;
            &::before,
            &::after {
                content: '';
                position: absolute;
                left: 0;
                top: -7px;
                bottom: 0;
                border: 36px solid transparent;
                border-left: 20px solid #fff;
            }
            &::after {
                left: -4px;
                border-left-color: #ebecf0;
            }
        }
        &:nth-child(1) {
            .arrow {
                display: none;
            }
        }
        // .detail, .time{
        //     padding-left: 15px;
        // }
        .detail {
            padding-top: 16px;
            line-height: @w;
            margin-left: 12px;
            position: relative;
            padding-left: 28px;
            overflow: hidden;
            height: 40px;
            .num {
                position: absolute;
                left: 0;
                top: 15px;
            }
        }
        .time {
            padding-left: 12px;
            @h: 18px;
            height: @h;
            line-height: @h;
            overflow: hidden;
            p {
                display: block;
                .danhang;
            }
        }
        &.step-active {
            .bg012F67();
        }
        &.arrow-color .arrow::after {
            border-left-color: #012f67;
        }
        &:nth-child(1),
        &:nth-child(2),
        &:nth-child(3) {
            &.step-active {
                .bgF9CA01();
            }
        }
        &:nth-child(4).step-active {
            .bgF39945();
            .arrow::after {
                border-left-color: #f9ca01;
            }
        }
        &:nth-child(5).step-active {
            .bg012F67();
            .arrow::after {
                border-left-color: #f39945;
            }
        }
        &:nth-child(1),
        &:nth-child(2),
        &:nth-child(3),
        &:nth-child(4) {
            &.arrow-color .arrow::after {
                border-left-color: #f9ca01;
            }
        }
        &:nth-child(5).arrow-color .arrow::after {
            border-left-color: #f39945;
        }
    }
    .step-active {
        color: #fff;
        .num {
            @w: 16px;
            width: @w;
            height: @w;
            border-radius: @w;
            border-color: #fff;
            margin-top: 2px;
            line-height: 14px;
        }
        &.detail-center {
            .detail {
                height: 30px;
                padding-top: 10px;
                line-height: 20px;
                padding-left: 20px;
                .num {
                    top: 10px;
                }
            }
        }
        .time {
            font-size: 12px;
        }
    }
    .ivu-tooltip,
    .ivu-tooltip-rel {
        display: block;
    }
}
</style>

<template>
    <div class="customer-steps-container">
        <div
            class="step-item"
            :class="{
                'step-active': index < sctiveNum,
                'detail-center': index < sctiveNum && item.time,
                'arrow-color': index == sctiveNum
            }"
            v-for="(item, index) in steps"
            :key="index"
        >
            <div class="arrow"></div>
            <div class="detail">
                <span class="num">{{ item.num }}</span>
                <Tooltip :content="item.name" placement="top" :transfer="true">
                    <span class="title">{{ item.name }}</span>
                </Tooltip>
            </div>
            <div class="time" v-if="item.isSelect == 'true'">
                <Tooltip :content="item.time" placement="top" :transfer="true">
                    <p>{{ item.time }}</p>
                </Tooltip>
            </div>
        </div>
    </div>
</template>

<script>
/**
 ** @author: 曹见芳
 ** 客户360 - 顶部流程
 ** 测试
 */
import valid, { errors, crmCustomerDetail } from '../../../libs/request';
import { mapMutations } from 'vuex';
export default {
    name: 'customerSteps',
    props: {
        id: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            steps: [],
            sctiveNum: 0
        };
    },
    mounted() {
        this.getStatusList();
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        getStatusList() {
            this.updateLoadingStatus({ isLoading: true });
            let params = {
                id: this.id
            };
            crmCustomerDetail
                .statusList(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let _arr = res.data.data;
                        //         _arr = [{
                        //     "name": "首次录入",
                        //     "isSelect": "true",
                        //     "time": "2019-10-18 14:47",
                        //     "value": "init"
                        // }, {
                        //     "name": "首次联系",
                        //     "isSelect": "true",
                        //     "time": null,
                        //     "value": "first contact"
                        // }, {
                        //     "name": "首次邀约",
                        //     "isSelect": "true",
                        //     "time": null,
                        //     "value": "first invitation"
                        // }, {
                        //     "name": "首次到访",
                        //     "isSelect": "true",
                        //     "time": null,
                        //     "value": "first visit"
                        // }, {
                        //     "name": "首次签约",
                        //     "isSelect": "true",
                        //     "time": null,
                        //     "value": "first signing"
                        // }, {
                        //     "name": "首次回访",
                        //     "isSelect": "true",
                        //     "time": null,
                        //     "value": "first return visit"
                        // }, {
                        //     "name": "首次续费",
                        //     "isSelect": "true",
                        //     "time": null,
                        //     "value": "first renewal"
                        // }, {
                        //     "name": "再次续费",
                        //     "isSelect": "true",
                        //     "time": null,
                        //     "value": "renewal again"
                        // }]
                        let _num = 0;
                        if (_arr && _arr.length) {
                            for (let i = 0; i < _arr.length; i++) {
                                _arr[i].num = i + 1;
                                if (_arr[i].isSelect == 'true') _num = i + 1;
                            }
                        }
                        this.steps = _arr;
                        this.sctiveNum = _num;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        }
    },
    watch: {
        id() {
            if (this.$route.name == 'crm.customer360') {
                this.getStatusList();
            }
        }
    }
};
</script>
