<style lang="less">
.stopModalStyle {
    .stopList {
        margin-bottom: 16px;
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
                width: 50%;
                // &:nth-child(1){
                //     >span:nth-child(2){
                //         color:#495060FF;
                //     }
                // }
            }
        }
    }
}
</style>
<template>
    <div class="stopModalClass">
        <!-- <Button type="primary" @click="modal1 = true">Display dialog box</Button> -->
        <Modal
            width="800"
            v-model="modal1"
            title="停用服务"
            @on-ok="ok"
            @on-cancel="cancel"
            class-name="stopModalStyle"
        >
            <p style="color:#999999FF;margin-bottom:12px;font-size:14px;">选择需要停用的服务：</p>
            <!-- stopList:[{label:'label1'},{label:'label2'},{label:'label3'},{label:'label4'},] -->
            <CheckboxGroup v-model="social">
                <div class="stopList">
                    <div
                        style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px"
                    >
                        <Checkbox label="label1">
                            <span class="title" style="margin-left:8px;">全功能流程套餐-体验版</span>
                        </Checkbox>
                        <Button type="primary" style="padding:6px 16px;" @click="goToDetail">详情</Button>
                    </div>
                    <div class="stopListContent">
                        <div>
                            <span style="color:#999;">试用周期：</span>
                            <span style="color:#495060FF;">2019.11.5 -2019.11.30</span>
                        </div>
                        <div>
                            <span style="color:#999;">申请时间：</span>
                            <span style="color:#495060FF;">2019.11.5 10:00</span>
                        </div>
                        <div style="margin-top: 10px;">
                            <span style="color:#999;">剩余时长：</span>
                            <span style="color:#495060FF;">
                                <span style="color:#F39945FF">20</span>小时
                                <span style="color:#F39945FF">49</span>分钟
                            </span>
                        </div>
                        <div style="margin-top: 10px;">
                            <span style="color:#999;">功能模块：</span>
                            <span style="color:#495060FF;">CRM、合同、教务、家校</span>
                        </div>
                    </div>
                </div>
                <div class="stopList">
                    <div
                        style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px"
                    >
                        <Checkbox label="label2">
                            <span class="title" style="margin-left:8px;">全功能流程套餐-正式版</span>
                        </Checkbox>
                        <Button type="primary" @click="goToDetail">详情</Button>
                    </div>
                    <div class="stopListContent">
                        <div>
                            <span style="color:#999;">计费方式：</span>
                            <span style="color:#495060FF;">包年包月</span>
                        </div>
                        <div>
                            <span style="color:#999;">合同原价：</span>
                            <span style="color:#495060FF;">190.00</span>
                        </div>
                        <div style="margin-top: 10px;">
                            <span style="color:#999;">实收金额：</span>
                            <span style="color:#495060FF;">100</span>
                        </div>
                        <div style="margin-top: 10px;">
                            <span style="color:#999;">服务周期：</span>
                            <span style="color:#495060FF;">2019.11.5 -2019.11.30</span>
                        </div>
                        <div style="margin-top: 10px;">
                            <span style="color:#999;">剩余时长：</span>
                            <span style="color:#495060FF;">
                                <span style="color:#F39945FF">20</span>小时
                                <span style="color:#F39945FF">49</span>分钟
                            </span>
                        </div>
                        <div style="margin-top: 10px;">
                            <span style="color:#999;">功能模块：</span>
                            <span style="color:#495060FF;">CRM、合同、教务、家校</span>
                        </div>
                    </div>
                </div>
            </CheckboxGroup>
        </Modal>
    </div>
</template>
<script>
export default {
    props: {
        modal1: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            stopList: [
                { label: "label1" },
                { label: "label2" },
                { label: "label3" },
                { label: "label4" }
            ],
            social: ["label1", "label2"]
            // modal1: false
        };
    },
    methods: {
        goToDetail() {
            this.$router.push({
                name: "core.lesseeTrialTenant",
                query: {
                    // qrCode: params.row.qrCode
                }
            });
        },
        ok() {
            // this.$Message.info("Clicked ok");
        },
        cancel() {
            // this.$Message.info("Clicked cancel");
        }
    }
};
</script>
