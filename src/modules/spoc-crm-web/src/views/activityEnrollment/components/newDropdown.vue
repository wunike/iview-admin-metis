<style lang="less">
.n-a-button{
    border-radius: 4px;
    box-sizing: border-box;
    display: block;
    width:68px;
    height:32px;
    line-height: 32px;
    border:1px solid transparent;
    padding-left:10px;
    .a-icon{
        margin-left:8px;
        display: none;
    }
    &:hover{
        box-sizing: border-box;
        border:1px solid #44BCB7;
        background: #fff;
        .a-icon{
            display: inline-block;
        }
    }
}
</style>

<template>
    <Dropdown @on-click="dropFn" :transfer="transfer">
        <a class="n-a-button" href="javascript:void(0)">
            {{actionName}}
            <Icon class="a-icon"  type="ios-arrow-down"></Icon>
        </a>

        <DropdownMenu slot="list">
            <DropdownItem
                    v-for="(item, index) in buttonList"
                    :title="item.title"
                    :disabled="actionName == item.label? true:false"
                    :name="item.key"
                    :key="index">
                {{item.label}}
            </DropdownItem>
        </DropdownMenu>
    </Dropdown>
</template>

<script>
export default {
    props:{
        buttonList:{
            type:Array,
            require:true,
            default: ()=>{
                return [];
            },
        },
        actionName:{
            type: String,
            default: ''
        },
    },

    data() {
        return {
            transfer:true,
        }
    },
    mounted() {

    },

    methods: {
        dropFn(key) {
            this.$emit("dropFn", key)
        }
    },
}
</script>
