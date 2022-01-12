<style lang="less">
    .myDropdown{
        display: inline-block;
    }
</style>
<template>
    <div class="myDropdown">
        <Dropdown @on-click="dropFn" :transfer="true">
            <a class="a-button" href="javascript:void(0)">{{$t('views_room_selectcomp_629')}}<Icon class="a-icon" type="ios-arrow-down"></Icon>
            </a>
            <DropdownMenu slot="list">
                <DropdownItem v-for="(item, index) in buttonList" :disabled="rows.status  == '1' && item.key == 'delData'"  :title="(rows.status  == '1' && item.key == 'delData') ? $t('views_room_selectcomp_630'): ''" @on-click="dropFn(rows,item.key)" :name="item.value" :key="index">{{item.value}}</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>

<script>
    export default {
        mounted() {
        },
        props: {
            rows : {
                type: Object,
                required: true
            },
            buttonList:{
                default:[],
                type:Array,
            },
        },
        methods: {
            dropFn(a) {
                let arr = this.buttonList
                for(let i in arr ){
                   if(arr[i].value === a){
                       this.$emit("leaveCompanyFn", {row: this.rows, key: arr[i].key})
                        return;
                   }
                }
            }
        }
    }
</script>
