<template>
<div class="editModeBtnFrame" v-if="showBtn" @click="$emit('click')">
    <div v-if="type=='edit'" class="editModeBtn editModeBtnEdit">
        <Icon type="compose"></Icon>
    </div>
    <div v-else-if="type=='lock'" :class="['editModeBtn',{
        editModeBtnLocked:status.isLock,
        editModeBtnUnLocked:!status.isLock}
        ]">
        <Icon type="locked" v-show="status.isLock"></Icon>
        <Icon type="unlocked" v-show="!status.isLock"></Icon>
    </div>
    <div v-else-if="type=='sort'" class="editModeBtn editModeBtnSort">
        <Icon type="navicon-round"></Icon>
    </div>
    <div v-if="type=='setting'" class="editModeBtn editModeBtnSetting">
        <Icon type="ios-gear"></Icon>
    </div>
    <!-- <div v-if="type=='delete'" :class="['editModeBtn',{editModeBtnDelete:!disable.isDel,editModeBtnDisableDelete:disable.isDel}]">
        <i class="iconfont icon-shanchu"></i>
    </div> -->
    <div v-if="type=='delete'" class="editModeBtn">
        <i class="iconfont icon-shanchu"></i>
    </div>
</div>
</template>
<script>
import MODE from "../mode.js";
export default {
    props: {
        //按钮类型
        type: {
            type: String,
            default: ""
        },
        data: {
            type: Object
        },
        mode: {
            type: String,
            default: ""
        }
    },
    computed:{
        ...MODE
    },
    data() {
        return {
            showBtn: true,
            status:{
                isLock:false
            },
            disable:{
                isLock:false,
                isDel:false
            }
        };
    },
    watch:{
        mode(){
            this.updateView();
        },
        data:{
            deep:true,
            handler(){
                this.updateView();
            }
        }
    },
    methods: {
        updateView(){
            switch (this.type) {
                case "edit":

                    break;
                case "lock":
                    if(this.mode==this.MODE_TEMPLATE){
                        this.showBtn=true;
                        this.disable.isLock=false;
                        this.status.isLock=!!this.data.isLock;
                    }else if(this.data.isLock){
                        this.disable.isLock=true;
                        this.status.isLock=true;
                    }else{
                        this.showBtn=false;
                    }
                    break;
                case "sort":

                    break;
                case "setting":

                    break;
                case "delete":
                    if(this.mode==this.MODE_TEMPLATE){
                        this.disable.isDel=false;
                    }else if(!this.data.isDel || this.data.isLock){
                        this.disable.isDel=true;
                    }
                    break;
                default:
            }
        }
    },
    created(){
        this.updateView();
    },
    mounted() {

    },
    beforeDestroy() {

    }
}
</script>
<style lang="less">
@import "./public.less";
.editModeBtnFrame {
    position: relative;
    width: 50px;
    height: 40px;
    line-height: 38px;
    margin-left: 5px;
    margin-right: 5px;
    color: #fff;
    text-align: center;
    line-height: 38px;
    border-radius: 4px;
    overflow: hidden;
    display: inline-block;
    vertical-align: middle;
    .editModeBtn {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        font-size: 20px;
        background-color: #999;
        cursor: pointer;
        &:hover {
            background-color: #FF445F;
        }
        &.editModeBtnDelete {
            background-color: #e07065;
            &:hover {
                background-color: #cb5a4f;
            }
        }
        &.editModeBtnDisableDelete {
            background-color: #a8abb0;
            &:hover {
                background-color: #a8abb0;
            }
        }
        &.editModeBtnLocked {
            background-color: #fdbe6f;
            &:hover {
                background-color: #e8a95b;
            }
        }
    }
}
</style>
