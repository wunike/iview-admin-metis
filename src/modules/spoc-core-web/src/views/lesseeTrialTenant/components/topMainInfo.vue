<style lang="less">
.pub {
    font-size: 14px;
    font-family: HiraginoSansGB-W3, HiraginoSansGB;
    font-weight: normal;
    color: rgba(153, 153, 153, 1);
}
.topMainInfoOut{
    margin-bottom: 16px;
    .topMainInfo {
        background: #fff;
        border-radius: 4px;
        padding: 20px 32px;
        display: flex;
        justify-content: space-between;
        .userLeft {
            .user-title {
                display: flex;
                align-items: center;
                .title {
                    font-size: 20px;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: rgba(73, 80, 96, 1);
                }
                .edit {
                    margin-left: 10px;
                }
                .status {
                    font-size: 12px;
                    font-family: HiraginoSansGB-W3, HiraginoSansGB;
                    font-weight: normal;
                    color: rgba(70, 188, 21, 1);
                    padding: 6px 12px;
                    background: rgba(228, 253, 218, 1);
                    border-radius: 4px;
                    margin-left: 12px;
                }
            }
            .user-name {
                margin-top: 20px;
                .pub;
                > span {
                    > span {
                        color: #495060ff;
                    }
                }
            }
        }
        .userNum {
            display: flex;
            > div {
                display: flex;
                flex-direction: column;
                margin-left: 40px;
                > span {
                    display: block;
                    text-align: right;
                    .pub;
                    &:nth-child(2) {
                        font-size: 28px;
                        font-family: HiraginoSansGB-W3, HiraginoSansGB;
                        font-weight: normal;
                        color: rgba(51, 51, 51, 1);
                    }
                }
            }
        }
    }
}
</style>
<template>
    <div class="topMainInfoOut">
        <div class="topMainInfo">
            <div class="userLeft">
                <div class="user-title">
                    <span class="title">家校互动-超级版</span>
                    <span class="edit" v-if="eidtShow">
                        <Icon type="ios-create-outline" size="18" style="cursor:pointer" />
                    </span>
                    <span class="status">有效</span>
                </div>
                <div class="user-name">
                    <span>
                        创建人：
                        <span>韩梅梅</span>
                    </span>
                    <span style="margin-left:100px;">
                        创建时间：
                        <span>2019-11-09 12:30</span>
                    </span>
                </div>
            </div>
            <div class="userNum">
                <div>
                    <span>本月试用用户数</span>
                    <span>149</span>
                </div>
                <div>
                    <span>试用用户总数</span>
                    <span>625</span>
                </div>
                <div>
                    <span>本月新增租户数</span>
                    <span>50</span>
                </div>
                <div>
                    <span>租户总数</span>
                    <span>2903</span>
                </div>
            </div>
        </div>
        <Tabs :animated="false" style="background:#fff;padding-top:10px" v-if="TabShow">
            <TabPane label="基本信息"></TabPane>
            <TabPane label="租户列表"></TabPane>
            <TabPane label="分享页"></TabPane>
        </Tabs>
    </div>
</template>
<script>
export default {
    props: {
        eidtShow: {
            type: Boolean,
            default: false
        },
        TabShow:{
            type: Boolean,
            default: false
        }
    },
    data() {
        return {};
    },
    methods: {}
};
</script>
