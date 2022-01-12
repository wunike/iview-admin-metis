<style lang="less">
    .my-dropdown{
        display: inline-block;
        .a-icon{
            position: relative;left: -4px;
        }
    }
</style>
<template>
    <div class="my-dropdown">
        <Dropdown @on-click="dropFn" :transfer="transfer">
            <slot name="infos"></slot>
            <DropdownMenu slot="list">
                <DropdownItem 
                    v-for="(item, index) in buttonList" 
                    :disabled="item.disabled"  
                    :title="item.title"  
                    :name="item.value"
                    :key="index">
                    {{item.label}}
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>

<script>
    export default {
        mounted() {
        },
        props: {
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
                // console.log(key)
                this.$emit("dropFn", key)
            }
        }
    }
</script>
