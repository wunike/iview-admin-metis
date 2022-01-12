<style lang="less">
.share-container {
    .share-bottom {
        display: flex;
        padding: 32px;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        > div {
            // &:nth-child(1) {
            //     // width: 378px;
            //     // height: 679px;
            //     // background: #ddd;
            // }
            &:nth-child(2) {
                // width: 378px;
                // height: 679px;
                // background: #ddd;
                // margin-right: 38px;
                .text-info {
                    font-size: 14px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: rgba(153, 153, 153, 1);
                }
            }
        }
    }
}
</style>
<template>
    <div class="share-container">
        <!-- <top-main-info ref="topMainInfoRef" :eidtShow="true" :TabShow="true"></top-main-info> -->
        <div class="share-bottom">
            <div style="width: 378px; height: 679px;position: relative; margin-right: 38px;border: 1px solid #ddd;">
                <h5Form ref="h5FormRef" :formData="formValidate"></h5Form>
            </div>
            <div>
                <Button type="primary" style="margin-bottom:12px;" @click="goToEditSharePage">编辑分享页面</Button>
                <div class="text-info">左图是您套餐当前的预览效果。</div>
                <div class="text-info">分享页是用户看到套餐的活动介绍，您可以通过微信、二维码等渠道为租户分享您的套餐。</div>
                <div
                    style="width:116px;height:116px;background:#ddd;margin-top:40px"
                    id="sharePageQr"
                ></div>
                <div style="font-size:14px;margin-top:12px;color:#999999FF">扫一扫，套餐介绍分享给客户。</div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import QRCode from "qrcodejs2";
import h5Form from "../../../../../spoc-crm-web/src/views/h5Form/h5Form";
// import topMainInfo from "../lesseeTrialUsers/components/topMainInfo";
export default {
    data() {
        return {
            formValidate: {
                tags: "",
                url: "/spoc-common/upload/all/20191226/f9980964d85f40e2afe0af80ee2ba1b0.png",
                position: "1",
                fromData:'',
                    // '[{"base":"0","category":"sysField","createById":"1","createDate":1571019705000,"delFlag":"0","dictType":"","dictValue":"","editable":"1","enName":"visibleOffice","field":"visibleOffice","isEdit":"0","isFitPhone":"1","isList":"0","isNull":"0","isQuery":"1","jdbcType":"select","menuId":"0","name":"选择校区","queryTypeValue":"","required":"1","sort":0,"tableName":"crm_customer","type":"下拉选择框","updateById":"1","updateDate":1572938899510,"_id":"crmcustomer_013","options":[{"value":"1","label":"HO总部"},{"value":"2","label":"深圳"},{"value":"3","label":"深圳华侨城校区"},{"value":"4","label":"深圳海上世界校区"},{"value":"5","label":"宁波"},{"value":"6","label":"宁波海曙校区"},{"value":"7","label":"宁波鄞州赫德校区"},{"value":"9","label":"杭州"},{"value":"10","label":"杭州西溪校区"},{"value":"15","label":"测试分公司"},{"value":"17","label":"测试校区"},{"value":"11","label":"上海"},{"value":"12","label":"上海松江赫德校区"},{"value":"13","label":"上海静安校区"},{"value":"14","label":"上海浦东塘桥校区"},{"value":"64ca792af729470790b8419c601ff056","label":"上海松江泰晤士校区"}]},{"updateDate":1576726266857,"_index":0,"delFlag":"0","type":"输入框","isList":"0","required":"1","tableName":"crm_customer","_rowKey":1353,"isFitPhone":"1","shouwType":"input","jdbcType":"input","enName":"name","createDate":1571019705000,"queryTypeValue":"","editable":"1","isQuery":"0","sort":1,"updateById":"1","field":"name","isEdit":"0","isNull":"0","name":"姓名","createById":"1","_id":"crmcustomer_001","category":"sysField","base":"1"},{"updateDate":1576726242024,"_index":1,"delFlag":"0","type":"输入框","isList":"0","required":"0","tableName":"crm_customer","isFitPhone":"1","_rowKey":1288,"shouwType":"input","jdbcType":"input","enName":"enName","createDate":1571019705000,"queryTypeValue":"","editable":"0","isQuery":"0","sort":2,"updateById":"1","field":"enName","isEdit":"0","isNull":"0","name":"英文名","createById":"1","_id":"crmcustomer_010","category":"sysField","base":"1"},{"updateDate":1576726268253,"_index":2,"delFlag":"0","type":"输入框","isList":"0","required":"1","tableName":"crm_customer","isFitPhone":"1","_rowKey":1372,"shouwType":"input","jdbcType":"input","enName":"phone","createDate":1571019705000,"queryTypeValue":"","editable":"1","isQuery":"0","sort":3,"updateById":"1","field":"phoneList","isEdit":"0","isNull":"0","name":"手机号","createById":"1","_id":"crmcustomer_003","category":"sysField","base":"1"},{"updateDate":1576726239774,"_index":3,"delFlag":"0","type":"单选框","isList":"0","dictType":"sys_gender","required":"0","tableName":"crm_customer","isFitPhone":"1","_rowKey":1254,"shouwType":"input","jdbcType":"radio","enName":"gender","menuId":"0","createDate":1571019705000,"dictValue":"性别","queryTypeValue":"","editable":"0","isQuery":"0","sort":4,"updateById":"1","field":"gender","isEdit":"0","isNull":"0","name":"性别","createById":"1","_id":"crmcustomer_011","category":"sysField","base":"1"},{"updateDate":1576726237792,"_index":5,"delFlag":"0","type":"日期选择器","isList":"0","required":"0","tableName":"crm_customer","isFitPhone":"1","_rowKey":1232,"shouwType":"input","jdbcType":"DatePicker","enName":"birthday","createDate":1571019705000,"queryTypeValue":"","editable":"0","isQuery":"0","sort":6,"updateById":"1","field":"birthday","isEdit":"0","isNull":"0","name":"出生日期","createById":"1","_id":"crmcustomer_012","category":"sysField","base":"1"},{"updateDate":1576726235737,"_index":7,"delFlag":"0","type":"输入框","isList":"0","required":"0","tableName":"crm_customer","isFitPhone":"1","_rowKey":1210,"shouwType":"input","jdbcType":"input","enName":"wechat","createDate":1571019705000,"queryTypeValue":"","editable":"0","isQuery":"0","sort":8,"updateById":"1","field":"wechat","isEdit":"0","isNull":"0","name":"微信","createById":"1","_id":"crmcustomer_002","category":"sysField","base":"1"},{"updateDate":1576726235342,"_index":8,"delFlag":"0","type":"输入框","isList":"0","required":"0","tableName":"crm_customer","isFitPhone":"1","_rowKey":1199,"shouwType":"input","jdbcType":"input","enName":"qq","createDate":1571019705000,"queryTypeValue":"","editable":"0","isQuery":"0","sort":9,"updateById":"1","field":"qq","isEdit":"0","isNull":"0","name":"QQ","createById":"1","_id":"crmcustomer_004","category":"sysField","base":"1"},{"updateDate":1576726234460,"_index":9,"delFlag":"0","type":"输入框","isList":"0","required":"0","tableName":"crm_customer","isFitPhone":"1","_rowKey":1188,"shouwType":"input","jdbcType":"input","enName":"address","createDate":1571019705000,"queryTypeValue":"","editable":"0","isQuery":"0","sort":10,"updateById":"1","field":"address","isEdit":"0","isNull":"0","name":"地址","createById":"1","_id":"crmcustomer_008","category":"sysField","base":"1"},{"updateDate":1576726234072,"_index":10,"delFlag":"0","type":"输入框","isList":"0","required":"1","tableName":"crm_customer","isFitPhone":"1","_rowKey":1177,"shouwType":"input","jdbcType":"input","enName":"email","createDate":1571019705000,"queryTypeValue":"","editable":"0","isQuery":"0","sort":11,"updateById":"1","field":"email","isEdit":"0","isNull":"0","name":"E-mail","createById":"1","_id":"crmcustomer_006","category":"sysField","base":"1"},{"updateDate":1576726232826,"_index":11,"delFlag":"0","type":"文本域","isList":"0","required":"0","tableName":"crm_customer","isFitPhone":"1","_rowKey":1166,"shouwType":"input","jdbcType":"textarea","enName":"remark","createDate":1571019705000,"queryTypeValue":"","editable":"0","isQuery":"0","sort":12,"updateById":"1","field":"remarks","isEdit":"0","isNull":"0","name":"备注","createById":"1","_id":"crmcustomer_009","category":"sysField","base":"1"}]',
                title: "",
                logoUr: ""
            }
        };
    },
    computed: {
        ...mapState(["app", "buttonPerm", "calendarConfig"])
    },
    components: {
        h5Form
    },
    mounted() {
        this.$nextTick(() => {
            this.$refs.h5FormRef.getFormDataFn(this.formValidate);
            this.$refs.h5FormRef.getInfo();
            let ele = document.querySelector("#sharePageQr");
            ele.innerHTML = "";
            // this.showQRCode(
            //     ele,
            //     window.location.origin +
            //         "/#/h5Form.html?id=" +
            //         this.formObj.id +
            //         "&channelId=" +
            //         this.formObj.channelId
            // );
            this.showQRCode(ele, "https://www.baidu.com/");
        });
    },
    methods: {
        goToEditSharePage() {
            this.$router.push({
                name: "core.lesseeShareEditPage"
            });
        },
        // 生成二维码
        showQRCode(ele, url) {
            //ele元素  具体生成二维码对应的url
            var qrcode = new QRCode(ele, {
                text: url,
                width: 116,
                height: 116,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
        }
    }
};
</script>
