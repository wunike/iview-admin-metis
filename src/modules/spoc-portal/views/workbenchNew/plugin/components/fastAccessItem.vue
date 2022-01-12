<style lang="less">
@import "../libs/public.less";
.fast-access-item-container{
    position: relative;
    text-align: center;
    background: #3499FD;color: #fff;
    &.fast-new{
        background: #fff;
        color: #565656;
        & > i {
            right: 3px;top: 3px;
            color: rgba(0, 0, 0, .5);
            &:hover{
                color: rgba(0, 0, 0, .8);
            }
        }
        .iconBody{
            padding-top: 12px;
            img{
                height: 28px;
            }
        }
    }
    & > i{
        position: absolute;right: 7px;top: 6px;
        font-size: 14px;color: rgba(255,255,255,.5);
        cursor: pointer;
        &:hover{
            color: #fff;
        }
    }
    .iconBody{
        height: 38px;padding-top: 18px;
        img{
            display: block;height: 20px;margin: 0 auto;
        }
        i{
            font-size: 20px;line-height: 1;
        }
    }
    .name{
        line-height: 34px;
        font-size: 12px;
    }
}
</style>

<template>
<div class="fast-access-item-container" :class="{ 'fast-new': bg == 'white' }">
    <Icon type="md-close-circle" class="i-close" v-if="checked" @click="del" />
    <Icon type="md-add-circle" class="i-add" v-if="!checked" @click="add" />
    <div :class="['iconBody', {imgModel:iconCheck(data.icon)=='url'}]">
        <i class="iconfont" :class="data.icon" v-if="iconCheck(data.icon)=='icon'"></i>
        <img draggable="false" v-if="iconCheck(data.icon)=='url'" :src="data.icon" />
    </div>
    <div class="name">{{data.title}}</div>
</div>
</template>

<script>
/**
 ** @author: 曹见芳
 ** 快捷项
 */
export default {
    name: 'fastAccessItem',
    props: {
        data: {
            type: Object,
            required: true
        },
        checked: {
            type: Boolean,
            default: false
        },
        bg: {
            type: String,
            default: ''
        }
    },
    methods: {
        iconCheck(src) {
            if(src) {
                let types = ['png', 'jpg', 'svg', 'gif', 'jpeg'];
                let cur_typs = src.split('.').pop();
                let returnStr = 'icon'
                if(cur_typs && types.indexOf(cur_typs) > -1) {
                    returnStr = 'url';
                }
                return returnStr;
            }
            return '';
        },
        del() {
            this.$emit('onDel', this.data);
        },
        add() {
            this.$emit('onAdd', this.data);
        }
    },
}
</script>


