<style lang="less">
.tableTooltip {
    white-space: initial !important;
    display: inline-block;
    .ivu-tooltip,
    .ivu-tooltip-rel {
        display: inline-block !important;
    }
}
.table_tooltip_contents {
    .table_tooltip_tables {
        white-space: initial !important;
    }
}
</style>

<template>
    <div class="tableTooltip">
        <!-- border  :width="450" -->
        <Tooltip transfer placement="top" :max-width="474" theme="light">
            <Icon type="ios-information-circle-outline" :size="16" style="margin-top: -2px;cursor: pointer;margin-left: 6px;"/>
            <div slot="content" class="table_tooltip_contents">
                <Table size="small" border width="440" :columns="columns" :data="tableList" class="table_tooltip_tables"></Table>
            </div>
        </Tooltip>
    </div>
</template>

<script>
export default {
    props: {
        tableData: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            tableList: this.tableData,
            columns: [
                {
                    title: '课程名称',
                    key: 'name',
                    width: 100
                },
                {
                    title: '课程状态',
                    key: 'statusLabel',
                    width: 90
                },
                {
                    title: '变更原因',
                    key: 'statusContent',
                    width: 138
                },
                {
                    title: '课程班级状态',
                    key: 'studying',
                    width: 110
                }
            ]
        };
    }
};
</script>
