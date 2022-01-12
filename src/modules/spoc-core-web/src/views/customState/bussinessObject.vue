<style lang="less">
.bussiness-object-container{
    padding-top:20px;
    >h2{
        font-size:16px;
        font-family:PingFangSC-Medium,PingFangSC;
        font-weight:500;
        color:rgba(73,80,96,1);
        padding-left: 20px;
        padding-bottom: 10px;
    }
    .buss-item{
        padding-left: 20px;
        height:42px;
        line-height: 42px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(51,51,51,1);
        user-select: none;
        cursor: pointer;
        &.active{
            background: #E3F2FD;
            cursor: default;
        }
    }
}
</style>

<template>
    <div class="bussiness-object-container">
        <h2>{{$t('modules_spoc_core_web_src_views_customstate_bussinessobject_130')}}</h2>
        <div class="buss-item" :class="{active:selIdx==index}" @click="changeType(index)" v-for="(item,index) in types" :key="index">
            {{item.name}}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        types:{
            type: Array,
            required:true
        }
    },
    components: {

    },
    data() {
        return {
            selIdx:0,
        }
    },
    mounted() {

    },

    methods: {
        changeType(index) {
            if(this.selIdx == index){
                return
            }
            this.selIdx = index
            this.$emit('changeType', index)
        },
    },
}
</script>
