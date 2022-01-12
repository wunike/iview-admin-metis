<template>
<div v-show="value" :class="['portalItemSettingMode','animated',{fadeIn:value}]">
    <div class="portalItemSettingBody">
        <div class="portalItemSettingName">
            <span v-show="!editMode" v-text="name"></span>
            <Input v-show="editMode" ref="itemNameInput" v-model="itemName" @on-change="" :maxlength="30" placeholder="请输入新名称" @on-blur="onBlurEvent()" style="width: 70%; max-width:200px">
            </Input>
        </div>
        <div class="portalItemSettingBtns" @click="editClick($event)">
            <slot></slot>
        </div>
    </div>
</div>
</template>
<script>
export default {
    props: {
        data:{
            type: Object
        },
        //是否编辑模式
        value: {
            type: Boolean,
            default: false
        },
        name:{
            type:String,
            default:""
        }
    },
    data() {
        return {
            editMode:false,
            itemName:this.name
        };
    },
    methods: {
        editClick(event){
            if(event.target.className.indexOf("editModeBtnEdit")>=0 || event.target.parentElement.className.indexOf("editModeBtnEdit")>=0){
                this.editMode=true;
                this.$nextTick(()=>{
                    this.$refs.itemNameInput.focus();
                })
            }
            event.stopPropagation();
            event.preventDefault();
        },
        onBlurEvent(event){
            this.$emit("onNameChangEvent",this.itemName);
            this.editMode=false;
        }
    },
    mounted() {

    },
    beforeDestroy() {

    }
}
</script>
<style lang="less">
@import "./public.less";
.portalItemSettingMode {
    user-select: none;
    animation-duration: 0.4s;
    position: absolute;
    overflow: hidden;
    background-color: rgba(255,255,255,0.8);
    z-index: 100;
    width: 100%;
    top: 0;
    left: 0;
    height: 100%;
    .portalItemSettingBody{
        position: absolute;
        width: 100%;
        height: 120px;
        left: 0;
        top: 50%;
        margin-top: -70px;
        .portalItemSettingName{
            height: 40px;
            line-height: 40px;
            text-align: center;
        }
        .portalItemSettingBtns{
            height: 80px;
            text-align: center;
            vertical-align: middle;
            line-height: 80px;
            &>*{
                display: inline-block;
                vertical-align: middle;
                white-space: nowrap;
                overflow: hidden;
            }
        }
    }
}
</style>
