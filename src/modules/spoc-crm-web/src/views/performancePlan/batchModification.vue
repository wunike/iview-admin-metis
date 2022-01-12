<style lang="less">
.performance-plan-modal-container {
    .ivu-form .ivu-form-item-label {
        font-size: 14px;
        color: #999;
    }
    .ivu-form-item-content,
    .ivu-input-group-append,
    .ivu-input-group-prepend,
    .ivu-input {
        font-size: 14px;
    }
    .ivu-input-group-append,
    .ivu-input-group-prepend {
        width: 44px;
    }
    .setted_table {
        .ivu-table:before {
            display: none;
        }
        .ivu-table-row {
            td {
                border: none;
            }
        }
        .ivu-table td {
            background-color: #f8f8f9;
            .office_name {
                font-weight: 700;
                color: #515a6e;
            }
        }
    }
    .ivu-table-overflowX {
        overflow-x: hidden;
    }
}
</style>

<template>
    <div>
        <Modal class="performance-plan-modal-container" v-model="editModal" title="批量下达计划" width="600">
            <!-- <Form ref="editItemRef" :model="editItem" :rules="ruleItem" :label-width="68">
                <FormItem label="时间：">
                    <DatePicker v-model="params.timeScope" type="month" format="yyyy年MM月" placement="bottom-start" style="width:224px;"></DatePicker>
                </FormItem>
            </Form> -->
            <Table :columns="setCols" :data="editParams" :show-header="false" v-if="setCols.length && editKeys.length && editParams.length" class="setted_table">
                <template v-for="item in editKeys" :keys="item" slot-scope="{ row, index }" :slot="item">
                    <span v-if="item == 'officeName' || item == 'saleName'" class="office_name">快速设置</span>
                    <InputNumber v-model="row[item]" @on-change="setParmas($event, item)" v-else></InputNumber>
                </template>
            </Table>
            <Table
                ref="selection"
                :columns="defaultShowCol"
                :data="tableData"
                v-if="defaultShowCol"
                :loading="isLoading"
                @on-selection-change="tableSelChange"
                :max-height="400"
            ></Table>
            <div slot="footer">
                <Button @click="hidModal">取消</Button>
                <Button type="primary" @click="save">保存</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
/**
 ** @author: 曹见芳
 ** 业绩计划 - 弹窗
 */
import valid, { errors, sysUser, sysDict, crmReferral, sysConfig, crmPlan } from '../../libs/request';
import { mapMutations, mapState } from 'vuex';
export default {
    props: {
        paramsInd: {
            type: Object,
            default: () => {
                return {
                    objectType: 'office',
                    officeId: '',
                    timeScope: new Date().getFullYear() + '-' + (new Date().getMonth() + 1),
                    userId: ''
                };
            }
        }
    },
    data() {
        return {
            editParams: {},
            loading: false,
            isLoading: false,
            tableColumnArray: [],
            editModal: false,
            defaultShowCol: null,
            tableData: [],
            editItem: {},
            params: this.paramsInd,
            setCols: [],
            setData: [],
            editKeys: [],
            selRowId: [],
            showcol: []
        };
    },
    mounted() {},
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        showModal(type) {
            this.params.objectType = type;
            this.getShowTitle();
            this.editModal = true;
        },
        hidModal() {
            this.editModal = false;
            this.$emit('hidModal');
        },
        getShowTitle() {
            sysConfig
                .getConfig({
                    menuId: 2001,
                    configId: 'crm:plan'
                })
                .then(valid.call(this))
                .then(res => {
                    this.editKeys = [];
                    this.setCols = [];
                    this.showcol = res.data.data;
                    let list = res.data.data;
                    list.map(v => {
                        v.name = v.name.replace(/CountPlan/, 'Plan');
                        v.key = v.name.replace(/Plan/, 'Count');
                    });
                    list = list.filter(v => v.selected == '1');
                    let arr = [];
                    if (this.params.objectType == 'office') {
                        arr = arr.concat(list, this.tableColumnArray);
                        arr.unshift({ title: '校区', key: 'objectName' });
                    } else {
                        arr = arr.concat(list, this.tableColumnArray);
                        arr.unshift({
                            title: '销售顾问',
                            key: 'objectName'
                        });
                    }
                    arr.unshift({
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    });
                    this.defaultShowCol = arr;
                    let dataList = JSON.parse(JSON.stringify(arr));
                    dataList.splice(0, 1);
                    dataList.unshift({
                        type: 'html',
                        width: 60,
                        align: 'center',
                        key: 'type'
                    });

                    console.log(1);
                    let setColsArr = dataList.map(v => {
                        if (v.key !== 'type') {
                            if (v.key == 'objectName') {
                                v.key = 'saleName';
                                v.name = 'saleName';
                            }
                            v.slot = v.key;
                        }
                        this.editKeys.push(v.key);
                        console.log(2);
                        this.setCols.push(v);
                    });
                    // this.setCols = setColsArr;
                    console.log(3, setColsArr);
                })
                .catch(errors.call(this))
                .finally(() => {
                    console.log(3.1);
                    this.getListData(this.params);
                });
        },
        getListData(params) {
            // 获取data
            console.log(4);
            this.isLoading = true;
            params = Object.assign(
                {
                    pageNo: 0,
                    pageSize: 0
                },
                params
            );
            this.updateLoadingStatus({ isLoading: true });
            params.timeScope = new Date(params.timeScope).format('yyyy-MM');
            crmPlan
                .list(params)
                .then(valid.call(this))
                .then(res => {
                    let obj = {};
                    if (res.ok) {
                        console.log(6);
                        let result = res.data.data.list;
                        // result.forEach(v => {
                        //     v = Object.assign(v, JSON.parse(v.plan));
                        // });
                        this.tableData = result;
                        if (result.length) {
                            obj = Object.assign({}, result[0]);
                            for (let i in obj) {
                                obj[i] = '';
                            }
                        } else {
                            this.editKeys.forEach(v => {
                                obj[v] = '';
                            });
                        }
                        this.tableData.map(v => (v._checked = true));
                        this.editParams = [obj];
                    } else {
                        this.tableData = [];
                        this.editParams = [obj];
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                    this.$refs.selection.selectAll(true);
                    this.isLoading = false;
                });
        },
        setParmas(e, key) {
            this.tableData.map(v => {
                if (this.selRowId.indexOf(v.objectId) != -1) {
                    let frist = v[key].split('/')[0];
                    v[key] = `${frist}/${e||0}`;
                    let keys = key.replace(/Count/, 'Plan');
                    v[keys] = e||0;
                    let strobj = {};
                    this.showcol.map(v => {
                        strobj[v.name] = '';
                    });
                    for (let i in strobj) {
                        strobj[i] = Number(v[i]) || 0;
                    }
                    v.plan = JSON.stringify(strobj);
                    v._checked = true;
                    v.isChanged = true;
                } else {
                    v._checked = false;
                }
            });
        },
        tableSelChange(val) {
            this.selRowId = val.map(v => v.objectId);
        },
        save() {
            this.updateLoadingStatus({ isLoading: true });
            let params = this.tableData.filter(v => v.isChanged);
            params.map(v => {
                v.timeScope = new Date(this.params.timeScope).format('yyyy-MM');
                v.objectType = this.params.objectType;
                v.period = 'month';
            });
            crmPlan
                .batchSave(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.$emit('uploadRows');
                        this.hidModal();
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        }
    }
};
</script>
