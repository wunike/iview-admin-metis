<template>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%" class="form-rule-dialog">
        <el-table :data="tableData" style="width: 100%" size="mini">
            <el-table-column label="字段名称">
                <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="填写方式">
                <template slot-scope="scope">
                    <span>{{ scope.row.type }}</span>
                </template>
            </el-table-column>
            <el-table-column label="是否选择本字段">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.editable" active-value="1" inactive-value="0"></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="是否必填">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.required"></el-switch>
                </template>
            </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    props: {
        ruleList: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },
    data() {
        return {
            dialogVisible: false,
            tableData: []
        };
    },
    computed: {},
    mounted() {
        this.tableData = this.ruleList;
    },
    methods: {
        show() {
            this.dialogVisible = true;
            this.tableData = this.ruleList;
        },
        close() {
            this.dialogVisible = false;
            this.tableData = this.ruleList;
        },
        save() {
            this.dialogVisible = false;
            this.$emit('update:ruleList', this.tableData);
        }
    },
    watch: {
        // ruleList(val) {
        // 	this.tableData = val;
        // },
        // tempValue() {
        // 	this.$emit('update:ruleList', this.tempValue);
        // }
    }
};
</script>

<style lang="less">
.form-rule-dialog {
    .el-dialog {
        .el-dialog__body {
            padding: 0 20px;
        }
    }
}
</style>
