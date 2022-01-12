<style lang="less">
.ae-container-fa{
    height:100%;
    overflow-y: auto;
    /*overflow-x: hidden;*/
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    .ae-aside{
        width: 260px;
        height: 100%;
        background: #fff;
        overflow-y: auto;
        padding-top:16px;
        /*overflow-x: hidden;*/

    }
    .ae-container-box{
        width: calc(~'100% - 268px');
        height: 100%;
        overflow-y: auto;
    }
}

</style>

<template>
    <div class="ae-container-fa">
        <div class="ae-aside">
            <Input v-model="search" search icon="md-search" :placeholder="$t('views_staff_staffmanage_717')" style="width: 220px;margin-left:20px;" @on-search="searchTreeByName"/>
            <leftTree  ref="leftTree" @table-title="gettableTitle" :hide="hide" @get-new-table="getNewtable" @editOrAddTree="editOrAddTree" :searchVal="search"></leftTree>
        </div>
        <div class="ae-container-box">
            <employee ref="employee"  @get-new-tree="getNewTree"></employee>
        </div>
    </div>
</template>

<script>
    import employee from './employee'
    import leftTree from '../../../../spoc-core-web/src/views/staff/components/leftTree'
    import { mapMutations } from 'vuex';
    export default {
        components: {
            employee,leftTree
        },
        data() {
            return {
                search:"",
                hide:false,
                isFirst:true,
            }
        },
        mounted() {

        },

        methods: {
            ...mapMutations(['updateLoadingStatus']),
            searchTreeByName() {

            },

            getNewTree(arr) {
                console.log(arr)
                this.$refs.leftTree.getTreeDatas(true,arr[0])
                this.$refs.employee.setTitle([arr[1],arr[2]])
            },
            //获取表头 标题
            gettableTitle(title, code) {
                // 设置表格标题
                this.$refs.employee.setTitle([title,code])
            },
            //左侧树 联动表格刷新
            getNewtable(id) {
                this.$refs.employee.getTableDatas(id);
            },
            //左侧树修改编辑后。添加员工弹框更新下来菜单
            editOrAddTree(){
                this.$refs.staffInfo.officeListData();
            },

        },
    }
</script>
