<style lang="less">
.customAttribute {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 10px;
    .businessMenu_box {
        width: 200px;
        height: 100%;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-direction: column;
        .businessMenu_tit {
            width: 100%;
            height: 55px;
            font-size: 16px;
            font-weight: 500;
            color: rgba(73, 80, 96, 1);
            line-height: 55px;
            padding: 0 20px;
            border-bottom: 1px rgba(230, 231, 235, 1) solid;
        }
        .businessMenu_list {
            flex: 1;
            width: 100%;
            overflow-y: auto;
            overflow-x: hidden;
            .ivu-cell {
                padding: 0;
                &.ivu-cell-selected,
                &.ivu-cell-selected:hover {
                    background: rgba(227, 242, 253, 1);
                    color: #495060;
                }
                .ivu-cell-link {
                    height: 50px;
                    padding: 15px 20px;
                }
                .ivu-cell-title {
                    line-height: 22px;
                }
            }
        }
    }
    .customAttribute_wrap {
        flex: 1;
        height: 100%;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        margin-left: 10px;
        overflow: hidden;
        overflow-y: auto;
    }
}
</style>

<template>
    <div class="customAttribute">
        <div class="businessMenu_box">
            <div class="businessMenu_tit">业务对象</div>
            <div class="businessMenu_list">
                <CellGroup @on-click="cellChange"><Cell v-for="(item, index) in menuList" :key="index" :title="item.name" :name="item.enName" :selected="cellName == item.enName" /></CellGroup>
            </div>
        </div>
        <div class="customAttribute_wrap">
            <div style="padding: 16px 16px 0;">
                <Tabs :animated="false" v-model="tabName" v-if="tableInfo.isSysField == 1">
                    <TabPane label="自定义属性" name="attribute"></TabPane>
                    <TabPane label="表单布局" name="layout"></TabPane>
                </Tabs>
            </div>
            <div v-if="tabName == 'attribute'">
                <sysTable :tableName="tableInfo.tableName" category="sysField" v-if="tableInfo.isSysField == 1"></sysTable>
                <customTable :tableName="tableInfo.tableName" category="ugcField" :islayout="tableInfo.isSysField == 1?false:true" v-if="tableInfo.isUgcField == 1"></customTable>
            </div>
            <div v-else>
                <layoutTable :tableName="tableInfo.tableName" category="ugcField" islayout></layoutTable>
                </div>
        </div>
        <div></div>
    </div>
</template>

<script>
import valid, { errors, SysProps } from '../../libs/request';
import { mapMutations, mapState } from 'vuex';
import customTable from './customTable.vue';
import sysTable from './sysTable.vue';
import layoutTable from './layoutTable.vue';
export default {
	name:"portal.customAttribute",
    data() {
        return {
            tabName: 'attribute',
            cellName: '',
            menuList: [],
            tableInfo: {
                tableName: '',
                isSysField: '',
                isUgcField: ''
            }
        };
    },
    computed: {},
    components: {
        customTable,
        sysTable,
        layoutTable
    },
    created() {
        this.getMenuList();
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        cellChange(item) {
            this.cellName = item;
            this.tabName = 'attribute';
            this.tableInfo = this.menuList.find(v => v.enName == item);
        },
        getMenuList() {
            let params = {};
            this.updateLoadingStatus({
                isLoading: true
            });
            SysProps.menuList(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.menuList = res.data.data;
                        this.cellName = res.data.data[0].enName;
                        this.tableInfo = res.data.data[0];
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({
                        isLoading: false
                    });
                });
        }
    }
};
</script>
