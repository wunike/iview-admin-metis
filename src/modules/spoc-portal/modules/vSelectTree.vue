<style lang="less">
.v-select-tree-container{
    @transition: all 0.2s ease-in-out;
    position: relative;z-index: 1;
    width: 200px;
    .v-select-input{
        @h: 32px;
        height: @h;line-height: @h;
        transition: @transition;
        border: 1px solid #dcdee2;border-radius: 4px;background-color: #fff;
        span{
            display: block;padding-left: 8px;padding-right: 24px;
            overflow: hidden;text-overflow:ellipsis;white-space: nowrap;
            color: #c5c8ce;
            &.select-value{
                color: #515a6e;
            }
        }
        &.v-select-visible{
            .v-select-arrow{
                transform: rotate(180deg);
                display: inline-block;
            }
        }
        .v-select-arrow, .v-select-close {
            position: absolute;top: 50%;right: 8px;
            line-height: 1;margin-top: -7px;
            font-size: 14px;color: #808695;
            transition: @transition;
        }
    }
    .v-select-bottom{
        position: absolute;z-index: 900;
        // width: 100%;
        width: 210px;
        max-height: 200px;overflow: auto;
        margin: 5px 0;padding: 5px 0 5px 6px;
        background: #fff;border-radius: 4px;box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    }
}
</style>
    
<template>
<div class="v-select-tree-container">
    <div class="v-select-input" :class="[ showOptins ? 'v-select-visible' : '']" 
        @mouseout="hideIconClose"
        @mouseover="showIconClose"
        @click.stop="showDropdown">
        <span :class="[ label ? 'select-value' : '' ]">{{ label ? label : placeholder }}</span>
        <Icon type="ios-close-circle" class="v-select-close" @click.stop="clearSelect" v-if="hasClose && showClose && selectValve" />
        <Icon type="ios-arrow-down" class="v-select-arrow" v-else />
    </div>
    <div class="v-select-bottom" v-if="showOptins" @click.stop="toggleExpand">
        <Tree :data="treeData" @on-select-change="selectTree"></Tree>
    </div>
</div>
</template>

<script>

/**
 * select 展开为 tree 的形式
 * @author 曹见芳
 */

export default {
    props: {
        placeholder: { // placeholder 文字
            type: String,
            default: '请输入',
        },
        treeData: { // tree 
            type: Array,
            required: true
        },
        hasClose: { // 是否显示右侧 close 图标
            type: Boolean,
            default: false
        },
        label: { // label
            type: String,
            default: '',
        }
    },
    data(){
        return {
            selectValve: '', // 选择的项的 value
            selectLabel: '', // 选择的项的 label
            showOptins: false, // 展开下拉菜单
            showClose: false,
        };
    },
    created(){
        this.addListener();
    },
    beforeDestroy(){
        this.removeListener();
    },
    methods: {
        addListener() {
            document.addEventListener('click',this.hideDropdown);
        },
        removeListener() {
            document.removeEventListener('click',this.hideDropdown);
        },
        hideDropdown() {
            // 隐藏下拉菜单
            this.showOptins = false;
        },
        showDropdown() {
            // 展开下拉菜单
            this.showOptins = !this.showOptins;
        },
        selectTree(item) {
            // 选中树的某一项
            // console.log(item);
            if(item && item[0]) {
                this.selectValve = item[0].id;
                this.selectLabel = item[0].title;
                this.hideDropdown();
                this.$emit('onChange', this.selectValve, this.selectLabel);
            }
        },
        toggleExpand() {
            // 展开和收起子列表
            this.removeListener();
            setTimeout(() => {
                this.addListener();
            }, 10);
        },
        showIconClose() {
            // 鼠标划过显示框
            this.showClose = true;
        },
        hideIconClose() {
            // 鼠标离开显示狂
            this.showClose = false;
        },
        clearSelect() {
            // 清空显示框内容
            this.selectValve = '';
            this.selectLabel = '';
            this.$emit('onChange', this.selectValve);
        },
        
    },
}
</script>


