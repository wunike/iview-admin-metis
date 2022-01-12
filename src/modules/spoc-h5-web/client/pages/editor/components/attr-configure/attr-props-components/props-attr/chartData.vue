<template>
    <div v-if="Object.keys(chartData).length">
        <div v-for="(items, indexs) in jsondata" :key="'excel-editor' + indexs" id="example1" class="hot">
            <span v-if="!Number(Object.keys(chartData.rows)[indexs]) && Number(Object.keys(chartData.rows)[indexs]) !== 0">{{ Object.keys(chartData.rows)[indexs] }}</span>
            <hot-table
                :data="items"
                language="zh-CN"
                :maxRows="10"
                :colHeaders="columns"
                :rowHeaders="true"
                :autoRowSize="true"
                licenseKey="non-commercial-and-evaluation"
                :columnSorting="true"
                :contextMenu="['row_above', 'row_below', 'remove_row']"
                width="100%"
                height="200"
                :manualColumnResize="true"
                :manualRowResize="true"
                :afterChange="afterChange"
            ></hot-table>
        </div>
    </div>
</template>

<script>
import { HotTable } from '@handsontable/vue';
export default {
    name: 'attr-qk-chartData',
    props: {
        chartData: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    data() {
        return {
            tempValue: '',
            updatting: true,
            jsondata: []
        };
    },
    computed: {
        columns() {
            this.updatting = false;
            setTimeout(() => {
                this.updatting = true;
            }, 1);
            return this.chartData.columns;
        }
    },
    components: {
        HotTable
    },
    mounted() {
        this.tempValue = this.chartData;
        if (Array.isArray(this.chartData.rows)) {
            let arr = [];
            // arr.push(['',...this.chartData.columns]);
            this.chartData.rows.forEach(val => {
                let arr1 = [];
                this.chartData.columns.forEach(v => {
                    arr1.push(val[v]);
                });
                arr.push(arr1);
            });
            this.jsondata = [arr];
            this.$set(this, 'jsondata', [arr]);
        } else {
            let keys = Object.keys(this.chartData.rows);
            let arr = [];
            keys.forEach(v => {
                let arr1 = [];
                // arr1.push(['',...this.chartData.columns]);
                this.chartData.rows[v].forEach(val => {
                    let arr2 = [];
                    this.chartData.columns.forEach(value => {
                        arr2.push(val[value]);
                    });
                    arr1.push(arr2);
                });
                arr.push(arr1);
            });
            this.jsondata = arr;
            this.$set(this, 'jsondata', arr);
        }
    },
    methods: {
        afterChange(changes) {
            if (Array.isArray(this.chartData.rows)) {
                let obj = {};
                obj.columns = this.columns;
                let arr = [];
                this.jsondata.forEach(value => {
                    value.forEach((v, k) => {
                        let obj1 = {};
                        this.columns.forEach((item, key) => {
                            obj1[item] = v[key];
                        });
                        arr.push(obj1);
                    });
                });
                obj.rows = arr;
                this.$emit('update:chartData', obj);
            } else {
                let keys = Object.keys(this.chartData.rows);
                let obj = {};
                obj.columns = this.columns;
                obj.rows = {};
                this.jsondata.forEach((value, key) => {
                    let arr = [];
                    value.forEach(v => {
                        let obj1 = {};
                        v.forEach((item, k) => {
                            obj1[this.columns[k]] = item;
                        });
                        arr.push(obj1);
                    });
                    obj.rows[keys[key]] = arr;
                });
                this.$emit('update:chartData', obj);
            }
        }
    },
    watch: {
        jsondata: {
            handler: function(val, oldVal) {},
            deep: true
        },
        chartData: {
            handler: function(val, oldVal) {
                if (String(val) === String(oldVal)) {
                    return;
                }
                if (Array.isArray(val.rows)) {
                    let arr = [];
                    // arr.push(['',...val.columns]);
                    val.rows.forEach(value => {
                        let arr1 = [];
                        val.columns.forEach(v => {
                            arr1.push(value[v]);
                        });
                        arr.push(arr1);
                    });
                    this.jsondata = [arr];
                } else {
                    let keys = Object.keys(val.rows);
                    let arr = [];
                    keys.forEach(v => {
                        let arr1 = [];
                        // arr1.push(['',...val.columns]);
                        val.rows[v].forEach(value => {
                            let arr2 = [];
                            val.columns.forEach(v => {
                                arr2.push(value[v]);
                            });
                            arr1.push(arr2);
                        });
                        arr.push(arr1);
                    });
                    this.jsondata = arr;
                }
            },
            deep: true
        }
        // tempValue() {
        //     this.$emit('update:chartData', this.tempValue);
        // }
    }
};
</script>

<style scoped>
.el-form-item {
    margin-bottom: 10px;
}
</style>
