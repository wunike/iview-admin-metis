<style lang="less">
.pub {
    font-size: 14px;
    font-family: HiraginoSansGB-W3, HiraginoSansGB;
    font-weight: normal;
    color: rgba(153, 153, 153, 1);
}
.tenantAccountClass {
    .topMain {
        margin-bottom: 16px;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        padding: 20px 32px;
        .title {
            font-size: 20px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(73, 80, 96, 1);
        }
        .textMain {
            display: flex;
            justify-content: flex-start;
            > div {
                width: 33.33%;
                margin-top: 20px;
                font-size: 14px;
                font-family: HiraginoSansGB-W3, HiraginoSansGB;
                font-weight: normal;
                color: rgba(153, 153, 153, 1);
                > span {
                    color: #495060ff;
                }
            }
        }
    }
    .main-contain {
        background: rgba(255, 255, 255, 1);
        overflow: hidden;
        .tabs-class {
            padding-left: 16px;
            background: #fff;
            padding-top: 24px;
            .ivu-tabs-bar {
                margin-bottom: 0px;
            }
        }
        .mealList {
            margin: 16px 16px 16px;
            font-size: 14px;
            padding: 20px 24px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.15);
            border-radius: 4px;
            .title {
                font-size: 16px;
                font-family: HiraginoSansGB-W6, HiraginoSansGB;
                font-weight: 800;
                color: rgba(73, 80, 96, 1);
            }
            .stopListContent {
                display: flex;
                flex-wrap: wrap;
                > div {
                    width: 33.33%;
                    margin-top: 11px;
                }
            }
        }
    }
}
</style>
<template>
    <div class="tenantAccountClass">
        <div class="topMain">
            <div class="title">深圳市义格知慧教育科技有限公司</div>
            <div class="textMain">
                <div>
                    姓名：
                    <span>GGR</span>
                </div>
                <div>
                    职位：
                    <span>市场运营总监</span>
                </div>
                <div>
                    联系人电话：
                    <span>134****0000</span>
                </div>
            </div>
        </div>
        <div class="main-contain">
            <Tabs class="tabs-class" :animated="false" @on-click="tabChange" v-model="tabValName">
                <TabPane label="试用记录" name="name1"></TabPane>
                <TabPane label="购买记录" name="name2"></TabPane>
            </Tabs>
            <div class="experience-version" v-if="tabValName=='name1'">
                <div class="mealList">
                    <div
                        style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px"
                    >
                        <div style="display:flex;">
                            <span class="title">全功能流程套餐-体验版</span>
                            <span
                                style="display:flex;align-items:center;width:40px;margin-left:6px;"
                            >
                                <!-- 使用中 -->
                                <!-- <img src="../../assets/images/use-ing.png" alt width="100%" /> -->
                                <!-- 停用中 -->
                                <img src="../../assets/images/stop-ing.png" alt width="100%" />
                                <!-- 已结束 -->
                                <!-- <img src="../../assets/images/end-ing.png" alt width="100%" /> -->
                            </span>
                        </div>
                        <Button type="primary" style="padding:6px 16px;" @click="goToDetail">详情</Button>
                    </div>
                    <div class="stopListContent">
                        <div>
                            <span style="color:#999;">申请时间：</span>
                            <span style="color:#495060FF;">2019.11.5 10:00</span>
                        </div>
                        <div>
                            <span style="color:#999;">试用周期：</span>
                            <span style="color:#495060FF;">2019.11.5 -2019.11.30</span>
                        </div>
                        <div>
                            <span style="color:#999;">剩余时长：</span>
                            <span style="color:#495060FF;">
                                <span style="color:#F39945FF">20</span>小时
                                <span style="color:#F39945FF">49</span>分钟
                            </span>
                        </div>
                        <div>
                            <span style="color:#999;">功能模块：</span>
                            <span style="color:#495060FF;">CRM、合同、教务、家校</span>
                        </div>
                    </div>
                </div>
                <div class="mealList">
                    <div
                        style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px"
                    >
                        <div style="display:flex;">
                            <span class="title">全功能流程套餐-体验版</span>
                            <span
                                style="display:flex;align-items:center;width:40px;margin-left:6px;"
                            >
                                <!-- 使用中 -->
                                <img src="../../assets/images/use-ing.png" alt width="100%" />
                                <!-- 停用中 -->
                                <!-- <img src="../../assets/images/stop-ing.png" alt width="100%" /> -->
                                <!-- 已结束 -->
                                <!-- <img src="../../assets/images/end-ing.png" alt width="100%" /> -->
                            </span>
                        </div>
                        <Button type="primary" style="padding:6px 16px;" @click="goToDetail">详情</Button>
                    </div>
                    <div class="stopListContent">
                        <div>
                            <span style="color:#999;">申请时间：</span>
                            <span style="color:#495060FF;">2019.11.5 10:00</span>
                        </div>
                        <div>
                            <span style="color:#999;">试用周期：</span>
                            <span style="color:#495060FF;">2019.11.5 -2019.11.30</span>
                        </div>
                        <div>
                            <span style="color:#999;">剩余时长：</span>
                            <span style="color:#495060FF;">
                                <span style="color:#F39945FF">20</span>小时
                                <span style="color:#F39945FF">49</span>分钟
                            </span>
                        </div>
                        <div>
                            <span style="color:#999;">功能模块：</span>
                            <span style="color:#495060FF;">CRM、合同、教务、家校</span>
                        </div>
                    </div>
                </div>
                <div class="mealList">
                    <div
                        style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px"
                    >
                        <div style="display:flex;">
                            <span class="title" style="color:#999999FF">全功能流程套餐-体验版</span>
                            <span
                                style="display:flex;align-items:center;width:40px;margin-left:6px;"
                            >
                                <!-- 使用中 -->
                                <!-- <img src="../../assets/images/use-ing.png" alt width="100%" /> -->
                                <!-- 停用中 -->
                                <!-- <img src="../../assets/images/stop-ing.png" alt width="100%" /> -->
                                <!-- 已结束 -->
                                <img src="../../assets/images/end-ing.png" alt width="100%" />
                            </span>
                        </div>
                        <Button type="primary" style="padding:6px 16px;" @click="goToDetail">详情</Button>
                    </div>
                    <div class="stopListContent">
                        <div>
                            <span style="color:#999;">申请时间：</span>
                            <span style="color:#495060FF;">2019.11.5 10:00</span>
                        </div>
                        <div>
                            <span style="color:#999;">试用周期：</span>
                            <span style="color:#495060FF;">2019.11.5 -2019.11.30</span>
                        </div>
                        <div>
                            <span style="color:#999;">剩余时长：</span>
                            <span style="color:#495060FF;">
                                <span style="color:#F39945FF">20</span>小时
                                <span style="color:#F39945FF">49</span>分钟
                            </span>
                        </div>
                        <div>
                            <span style="color:#999;">功能模块：</span>
                            <span style="color:#495060FF;">CRM、合同、教务、家校</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="official-version" v-if="tabValName=='name2'">
                <div class="mealList">
                    <div
                        style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px"
                    >
                        <div style="display:flex;">
                            <span class="title">全功能流程套餐-正式版</span>
                            <span
                                style="display:flex;align-items:center;width:40px;margin-left:6px;"
                            >
                                <!-- 使用中 -->
                                <img src="../../assets/images/use-ing.png" alt width="100%" />
                                <!-- 停用中 -->
                                <!-- <img src="../../assets/images/stop-ing.png" alt width="100%" /> -->
                                <!-- 已结束 -->
                                <!-- <img src="../../assets/images/end-ing.png" alt width="100%" /> -->
                            </span>
                        </div>
                        <Button type="primary" style="padding:6px 16px;" @click="goToDetail">详情</Button>
                    </div>
                    <div class="stopListContent">
                        <div>
                            <span style="color:#999;">计费方式：</span>
                            <span style="color:#495060FF;">包年包月</span>
                        </div>
                        <div>
                            <span style="color:#999;">合同原价：</span>
                            <span style="color:#495060FF;">100.00</span>
                        </div>
                        <div>
                            <span style="color:#999;">实收金额：</span>
                            <span style="color:#495060FF;">100.00</span>
                        </div>
                        <div>
                            <span style="color:#999;">服务周期：</span>
                            <span style="color:#495060FF;">2019.11.5 -2019.11.30</span>
                        </div>
                        <div>
                            <span style="color:#999;">剩余服务时长：</span>
                            <span style="color:#495060FF;">
                                <span style="color:#F39945FF">20</span>小时
                                <span style="color:#F39945FF">49</span>分钟
                            </span>
                        </div>
                        <div>
                            <span style="color:#999;">功能模块：</span>
                            <span style="color:#495060FF;">CRM、合同、教务、家校</span>
                        </div>
                    </div>
                </div>
                <div class="mealList">
                    <div
                        style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px"
                    >
                        <div style="display:flex;">
                            <span class="title">全功能流程套餐-正式版</span>
                            <span
                                style="display:flex;align-items:center;width:40px;margin-left:6px;"
                            >
                                <!-- 使用中 -->
                                <img src="../../assets/images/use-ing.png" alt width="100%" />
                                <!-- 停用中 -->
                                <!-- <img src="../../assets/images/stop-ing.png" alt width="100%" /> -->
                                <!-- 已结束 -->
                                <!-- <img src="../../assets/images/end-ing.png" alt width="100%" /> -->
                            </span>
                        </div>
                        <Button type="primary" style="padding:6px 16px;" @click="goToDetail">详情</Button>
                    </div>
                    <div class="stopListContent">
                        <div>
                            <span style="color:#999;">计费方式：</span>
                            <span style="color:#495060FF;">按量计费</span>
                        </div>
                        <div>
                            <span style="color:#999;">合同原价：</span>
                            <span style="color:#495060FF;">100.00</span>
                        </div>
                        <div>
                            <span style="color:#999;">实收金额：</span>
                            <span style="color:#495060FF;">100.00</span>
                        </div>
                        <div>
                            <span style="color:#999;">最大客户数：</span>
                            <span style="color:#495060FF;">1000个</span>
                        </div>
                        <div>
                            <span style="color:#999;">剩余客户数：</span>
                            <span style="color:#495060FF;">
                                <span style="color:#F39945FF">200</span>个
                                <!-- <span style="color:#F39945FF">49</span>分钟 -->
                            </span>
                        </div>
                        <div>
                            <span style="color:#999;">功能模块：</span>
                            <span style="color:#495060FF;">CRM、合同、教务、家校</span>
                        </div>
                    </div>
                </div>
                <div class="mealList">
                    <div
                        style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px"
                    >
                        <div style="display:flex;">
                            <span class="title" style="color:#999999FF">全功能流程套餐-正式版</span>
                            <span
                                style="display:flex;align-items:center;width:40px;margin-left:6px;"
                            >
                                <!-- 使用中 -->
                                <!-- <img src="../../assets/images/use-ing.png" alt width="100%" /> -->
                                <!-- 停用中 -->
                                <!-- <img src="../../assets/images/stop-ing.png" alt width="100%" /> -->
                                <!-- 已结束 -->
                                <img src="../../assets/images/end-ing.png" alt width="100%" />
                            </span>
                        </div>
                        <Button type="primary" style="padding:6px 16px;" @click="goToDetail">详情</Button>
                    </div>
                    <div class="stopListContent">
                        <div>
                            <span style="color:#999;">计费方式：</span>
                            <span style="color:#495060FF;">包年包月</span>
                        </div>
                        <div>
                            <span style="color:#999;">合同原价：</span>
                            <span style="color:#495060FF;">100.00</span>
                        </div>
                        <div>
                            <span style="color:#999;">实收金额：</span>
                            <span style="color:#495060FF;">100.00</span>
                        </div>
                        <div>
                            <span style="color:#999;">服务周期：</span>
                            <span style="color:#495060FF;">2019.11.5 -2019.11.30</span>
                        </div>
                        <div>
                            <span style="color:#999;">剩余服务时长：</span>
                            <span style="color:#495060FF;">
                                <span style="color:#F39945FF">20</span>小时
                                <span style="color:#F39945FF">49</span>分钟
                            </span>
                        </div>
                        <div>
                            <span style="color:#999;">功能模块：</span>
                            <span style="color:#495060FF;">CRM、合同、教务、家校</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
    name: 'core.tenantAccount',
    data() {
        return { tabValName: "name1" };
    },
    computed: {},
    components: {},
    mounted() {},
    methods: {
        goToDetail() {
            this.$router.push({
                name: "core.lesseeTrialTenant"
            });
        },
        tabChange(name) {
            // if (name == "name3") {
            //     this.$router.push({
            //         name: "core.lesseeSharePage"
            //     });
            // }
        }
    }
};
</script>
