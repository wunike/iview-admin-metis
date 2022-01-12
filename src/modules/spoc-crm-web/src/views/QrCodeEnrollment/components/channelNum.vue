<style lang="less">
// .api{
//     overflow:auto;
// }
</style>
<template>
    <div>
        <Poptip placement="right" transfer>
            <!--  click: () => {
                                    alert(23213)
                                    this.findQrcodeChannel(params.row.id);
            }-->
            <a @click="clickFindQrcodeChannelFn">{{channelNum}}</a>
            <div
                @scroll="myFunction"
                class="api"
                slot="content"
                :style="{height:findQrcodeChannelList.length>7?'270px':'',overflow:'auto'}"
            >
                <div
                    v-for="(item,index) in findQrcodeChannelList"
                    :key="index"
                    style="height:40px;line-height:40px;"
                >
                    {{index+1}}.{{item.name}}
                </div>
                <div v-show="findQrcodeChannelList.length<=0">
                    <Button loading shape="circle"></Button>
                </div>
            </div>
        </Poptip>
    </div>
</template>
<script>
import { mapMutations } from "vuex";
import valid, { errors, crmQrcode } from "../../../libs/request";
export default {
    components: {},
    mounted() {
        // this.baseData();
    },
    props: {
        channelNum: {
            type: [String, Array, Number]
        },
        qrcodeId: {
            type: [String]
        }
    },
    data() {
        return {
            findQrcodeChannelList: [],
            pageNo: 1,
            pageSize: 8,
            maxPage: 0,
            loadingData: true
        };
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        clickFindQrcodeChannelFn() {
            this.pageNo = 1;
            this.findQrcodeChannelList = [];
            if (this.loadingData) {
                this.findQrcodeChannelFn();
                this.loadingData = false;
            }
        },
        findQrcodeChannelFn() {
            crmQrcode
                .findQrcodeChannel({
                    qrcodeId: this.qrcodeId,
                    pageNo: this.pageNo,
                    pageSize: this.pageSize
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let result = res.data.data;
                        this.findQrcodeChannelList = this.findQrcodeChannelList.concat(
                            result.list
                        ).filter(
                            item => {
                                return item.defaultChannel != "1";
                            }
                        );
                        this.maxPage = result.nextPage;
                        // this.dataTotal = result.total;[].concat(1,2).filter((item)=>{return item>0})
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                    setTimeout(() => {
                        this.loadingData = true;
                    }, 200);
                });
        },
        myFunction(event) {
            let el = event.target;
            if (el.clientHeight + el.scrollTop >= el.scrollHeight) {
                console.log(this.$t('modules_spoc_crm_web_src_views_qrcodeenrollment_components_channelnum_1489'));
                if (this.maxPage > 0) {
                    this.pageNo = this.maxPage;
                    this.findQrcodeChannelFn();
                }
            }
        }
        //  原生js onscroll 监听元素滚动 滚动到底部的时候触发的事件
    }
};
</script>
