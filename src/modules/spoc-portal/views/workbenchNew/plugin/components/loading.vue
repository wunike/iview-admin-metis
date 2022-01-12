<template>
    <div class="loadingFrame" v-scoped v-show="loadingStatus">
        <div class="loadingComponent">
            <Spin size="large"></Spin>
        </div>
    </div>
</template>

<script>

export default {
    props:{
       loadingStatus:{//显示隐藏
           type:Boolean,
           default:true
       }
    },
}
</script>

<style lang="less">
    .loadingFrame{
        width:100%;
        height:100%;
        position: absolute;
        top:0;
        left:0;
    }
    .loadingComponent{
        position: absolute;
        width:50px;
        height:50px;
        left:0;
        right:0;
        top:0;
        bottom:0;
        margin:auto;
    }
    .ivu-spin-large{
        .ivu-spin-dot{
            width:50px;
            height:50px;
        }
    }
</style>
