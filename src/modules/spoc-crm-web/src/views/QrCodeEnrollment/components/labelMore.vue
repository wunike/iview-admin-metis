<style lang="less">
    .lableMore {
        display: inline-block;
        background: #ebecf0;
        padding: 0px 12px;
         height:24px;
        line-height: 24px;
        border-radius: 4px;
        margin-right: 8px;
        margin-top: 5px;
        margin-bottom: 5px;
        color: #495060;
    }
    .outLabelClass{
        max-width: 400px;
    }
</style>
<template>
    <span>
        <Poptip placement="right" transfer trigger="hover"  word-wrap popper-class="outLabelClass">
            <span class="lableMore" @click="clickFindQrcodeChannelFn">...</span>
            <div
                @scroll="myFunction"
                slot="content"
                :style="{height:labelMoreArr.length>7?'270px':'',overflowY:'auto'}"
            >
                <span class="lableMore" v-for="(item,index) in labelMoreArr" :key="index">{{item}}</span>
            </div>
        </Poptip>
    </span>
</template>
<script>
import { mapMutations } from "vuex";
export default {
    components: {},
    mounted() {},
    props: {
        labelMoreArr: {
        }
    },
    data() {
        return {
            // labelMoreArr: [],
        };
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        labelMoreArrFn(data){
            // debugger;
        //    this.labelMoreArr=data;
        },
        clickFindQrcodeChannelFn() {}
    }
};
</script>
