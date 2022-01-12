<style lang="less">
.journaling {
    // padding: 10px;
    #text_width_box {
        position: fixed;
        top: -999999px;
        left: -999999px;
        visibility: hidden;
    }
    .head {
        position: relative;
        height: 48px;
        margin-bottom: 12px;
        .name {
            font-size: 16px;
            font-weight: bold;
            position: absolute;
            bottom: 0;
            left: 0;
            margin-left: 10px;
        }
        .nameTab {
            bottom: -28px;
            margin-left: 0;
            width: 100%;
        }
        .buttons {
            position: absolute;
            bottom: 0;
            right: 0px;
        }
    }
    .journaling_table {
        .ivu-table-summary {
            tr {
                td {
                    background: #ffffff;
                    font-weight: bold;
                    height: 34px;
                }
            }
        }
    }
    .page_btn {
        padding: 10px;
        display: flex;
        justify-content: center;
    }
}
</style>

<template>
    <div class="journaling">
        <span id="text_width_box"></span>
        <div class="head">
            <div class="name" v-if="!tableName"><slot name="tableNameSlot"></slot></div>
            <div class="name" v-else-if="!Array.isArray(tableName)">{{ tableName }}</div>
            <div class="name nameTab" v-else>
                <Tabs v-model="nameType" @on-click="changeTableType"><TabPane :label="item.name" :name="item.value" v-for="item in tableName" :key="item.value"></TabPane></Tabs>
            </div>
            <div class="buttons">
                <div style="display: inline-block;" v-for="(item, index) in btnList" :key="index">
                    <Button
                        style="margin-right: 12px;"
                        v-if="!Array.isArray(item) && !!item.hidden == false"
                        :style="item.style"
                        :type="item.type ? item.type : 'primary'"
                        @click="item.btnClick"
                        v-html="item.text"
                    ></Button>
                    <Dropdown style="margin-right: 12px;" v-if="Array.isArray(item) && item.every(v => !!v.hidden == false)" @on-click="item[0].btnClick">
                        <Button type="primary">
                            {{ item[0].parentName }}
                            <Icon type="ios-arrow-down"></Icon>
                        </Button>
                        <DropdownMenu slot="list">
                            <DropdownItem v-for="(itemChild, indexChild) in item" :key="indexChild" :name="itemChild.value" v-if="!!itemChild.hidden == false">
                                {{ itemChild.text }}
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <slot name="buttonsAfterSlot"></slot>
            </div>
        </div>
        <Table
            ref="tableview"
            :columns="columns"
            :data="tableData"
            border
            :show-summary="showSummary"
            :summary-method="handleSummary"
            :max-height="tableHeight"
            class="journaling_table"
        ></Table>
        <div class="page_btn">
            <Page :current="current" :total="total" :page-size="pageSize" show-sizer show-elevator show-total @on-change="pageChange" @on-page-size-change="pageSizeChange" v-if="hasPage" />
        </div>
    </div>
</template>

<script>
import util from '@public/libs/js/util';
import { waitUntil, clone } from '@public/libs/util';
import valid, { errors, sysOffice, sysUser, common, sysDict, sysCommonSql, report } from '../libs/request';
export default {
    props: {
        showSummary: {
            type: Boolean,
            default: true
        },
        changeColEveryChange: { // 是否每次变化都修改columns
            type: Boolean,
            default: false
        },
        defaultShowCol: {
            type: Array,
            default: () => {
                return [];
            }
        },
        tableData: {
            type: Array,
            default: () => {
                return [];
            }
        },
        //表格名称
        tableName: {
            type: [String, Array]
        },
        //table上侧按钮集合
        btnList: {
            type: Array
        },
        current: {
            type: [Number, String],
            default: 1
        },
        total: {
            type: [Number, String],
            default: 0
        },
        pageSize: {
            type: [Number, String],
            default: 10
        },
        hasPage: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            nameType: this.tableName ? (Array.isArray(this.tableName) ? this.tableName[0].value : '') : '',
            columns: [],
            tableHeight: '',
            colCatch: {}
        };
    },
    computed: {},
    components: {},
    mounted() {
        this.$nextTick(() => {
            let mainBox = document.getElementsByClassName('mainBody')[0].firstChild;
            mainBox.style.height = '100%';
            let searchBox = document.getElementById('vSearchCollapseContainer'); //clientHeight
            this.$el.style.minHeight = mainBox.clientHeight - searchBox.clientHeight - 16 + 'px';
            let headBox = this.$el.querySelector('.head');
            this.tableHeight = this.$el.clientHeight - 110;
            waitUntil(
                () => {
                    return Object.keys(this.defaultShowCol).length && this.defaultShowCol.true;// && this.tableData.length;
                },
                () => {
                    this.setColumns();
                }
            );
        });
    },
    methods: {
        setColumns() {
            let col = this.defaultShowCol.true;
            this.columns = [];
            let newCol = [];
            if ((!this.changeColEveryChange)&&this.colCatch[this.nameType]&&this.colCatch[this.nameType].length) {
                newCol=this.colCatch[this.nameType];
            } else {
                col.forEach((v, k) => {
                    let content = this.tableData
                        .map(val => val[v.name])
                        .sort((a, b) => {
                            let numa = a ? a.length : 0;
                            let numb = b ? b.length : 0;
                            return numb - numa;
                        });
                    let contentWidth = this.getTextWidth(content[0]);
                    let colWidth = this.getTextWidth(v.title);
                    let obj = {
                        title: v.title,
                        key: v.name,
                        width: null,
                        minWidth: 20 + Math.max(contentWidth, colWidth),
                        resizable: true,
                        sortable: true,
                        total: v.total,
                        tooltip: true,
                        percent: v.percent
                    };
                    if (v.filter) {
                        this.getDictList(v.filter, k);
                        obj.filters = [];
                        obj.filterMultiple = false;
                        obj.filterMethod = (value, row) => {
                            return row[v.name].toLowerCase().indexOf(value.toLowerCase()) != -1;
                        };
                    }
                    newCol.push(obj);
                });
            }
            this.columns = newCol;
            this.colCatch[this.nameType] = newCol;
        },
        getDictList(type, ind) {
            let types = type;
            return sysDict
                .batchListData({
                    types
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.columns[ind].filters = res.data.data[type].map(item => {
                            return {
                                label: item.label,
                                value: item.label
                            };
                        });
                    }
                })
                .catch(errors.call(this));
        },
        handleSummary({ columns, data }) {
            const sums = {};
            let otherColumns = []
            columns.forEach((column, index) => {
                const key = column.key;
                if (index === 0) {
                    sums[key] = {
                        key,
                        value: this.$t('modules_spoc_jw_web_src_views_servicescharts_serviceechartsoptionsfor234_1_3073')
                    };
                    return;
                }
                const values = data.map(item => Number(item[key]));
                // if (!values.every(value => isNaN(value)) && column.total) {
                if (column.total) {
                    const v = values.reduce((prev, curr) => {
                        const value = parseFloat(curr);
                        if (!isNaN(value)) {
                            return parseFloat(prev) + parseFloat(curr);
                        } else {
                            return prev;
                        }
                    }, 0);

                    if (column.total == 'int') {
                        sums[key] = {
                            key,
                            value: v
                        };
                    } else if (column.total == 'float') {
                        if (column.percent) {
                            let val = (v / values.length).toFixed(2);
                            sums[key] = {
                                key,
                                value: val
                            };
                        } else {
                            sums[key] = {
                                key,
                                value: v.toFixed(2)
                            };
                        }
                    } else if(column.total == 'avg'){
                        sums[key] = {
                            key,
                            value: data.length ? (v/data.length).toFixed(2) : v
                        };
                    } else if(column.total == 'count'){
                        sums[key] = {
                            key,
                            value: data.length
                        };
                    } else {
                        otherColumns.push({
                            key,
                            total: column.total,
                            percent: column.percent
                        })
                    }
                } else {
                    sums[key] = {
                        key,
                        value: ''
                    };
                }
            });
            this.$nextTick(() => {
                setTimeout(() => {
                    let wid = this.$refs.tableview.scrollBarWidth;
                    console.log(wid);
                    if (this.$refs.tableview.showVerticalScrollBar) {
                        this.$refs.tableview.$refs.summary.$el.children[0].style.paddingRight = wid - 1 + 'px';
                        this.$refs.tableview.$refs.summary.$el.style.borderRight = '1px solid #e8eaec';
                    } else {
                        this.$refs.tableview.$refs.summary.$el.children[0].style.paddingRight = 0 + 'px';
                        this.$refs.tableview.$refs.summary.$el.style.borderRight = 'none';
                    }
                }, 100);
            });
            if(otherColumns.length){
                otherColumns.forEach(item=>{
                    // let args = item.total.split('/')
                    // let value = (sums[args[0]].value / sums[args[1]].value).toFixed(2)
                    let value = 0
                    try {
                        value = eval(item.total)
                    } catch(e) {
                        console.log(e)
                    }
                    if(!isNaN(value)){
                        if(item.percent){
                            value = (value * 100).toFixed(2)
                        } else {
                            value = value.toFixed(2)
                        }
                    }
                    sums[item.key] = {
                        key: item.key,
                        value
                    }
                })
            }
            console.log(sums, otherColumns,'sums~~~~~~~')
            return sums;
        },
        changeTableType(val) {
            this.$emit('changeTableType', val);
        },
        getTextWidth(str) {
            let span = this.$el.querySelectorAll('#text_width_box')[0];
            span.innerHTML = str;
            return span.clientWidth + 36 + 18;
        },
        pageChange(val) {
            this.$emit('pageChange', val);
        },
        pageSizeChange(val) {
            this.$emit('pageSizeChange', val);
        }
    },
    watch: {
        tableData: {
            handler: function(val, oldVal) {
                waitUntil(
                    () => {
                        return Object.keys(this.defaultShowCol).length && this.defaultShowCol.true;
                    },
                    () => {
                        // this.setColumns();
                    }
                );
            },
            deep: true
        },
        defaultShowCol: {
            handler: function(val, oldVal) {
                this.setColumns();
            },
            deep: true
        }
    }
};
</script>
