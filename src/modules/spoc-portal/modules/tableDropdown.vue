<style lang="less">
    .myDropdown{
        display: inline-block;
        .a-icon{
            position: relative;left: -4px;
        }
    }
</style>
<template>
    <div class="myDropdown">
        <Dropdown @on-click="dropFn" :transfer="transfer">
            <a class="a-button" href="javascript:void(0)">
                {{actionName}}
                <Icon class="a-icon" type="ios-arrow-down"></Icon>
            </a>
            <DropdownMenu slot="list">
                <DropdownItem 
                    v-for="(item, index) in buttonList" 
                    :disabled="item.disabled"  
                    :title="item.title"  
                    :name="item.key" 
                    :key="index">
                    {{item.label}}
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>

<script>
/**
 * @param actionName  字符串 ,下拉按钮显示名称，默认为‘更多’
 * @param transfer  布尔值，默认为true。iview中Dropdown的一个属性
 * @param buttonList  数组，按钮集合，
 *      示例 [{
            label: '删除',              //选项文字
            key: 'del',                 //传递回方法的值。确保唯一性
            title: '有效数据不可删除',   //title文字  可以为空字符串
            disabled: true,            //是否禁用
        }],     
 * @method dropFn  方法，返回所选选项的值
 * @author Longwang
*/
    export default {
        mounted() {
        },
        props: {
            actionName:{
                type: String,
                default: '更多'
            },
            transfer:{
                type: Boolean,
                default: true
            },
            buttonList:{
                default:[],
                type:Array,
            },
        },
        methods: {
            dropFn(key) {
                this.$emit("dropFn", key)
            }
        }
    }
</script>
