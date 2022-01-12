<style lang="less">
.performance-pan-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    .my-table {
        width: 100%;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        padding: 0 16px;
        margin-top: 10px;
        .subTypeNameStyle {
            margin-left: 11px;
            .ivu-table-cell {
                margin-left: 11px;
            }
        }
    }
    .ivu-select-item {
        zoom: 1;
        &::before,
        &::after {
            content: '';
            display: block;
            clear: both;
            height: 0;
            line-height: 0;
            font-size: 0;
        }
    }
    .searchCollapse {
        .ivu-input-number {
            .ivu-input-number-handler-wrap {
                opacity: 1;
            }
        }
    }
    .buttons-after-slot {
        float: left;
        padding-right: 12px;
        span {
            &.primary {
                color: #44bcb7;
                font-size: 16px;
            }
        }
    }
    .performance-pan-main {
        background: #ffffff;
        border-radius: 4px;
        margin-top: 10px;
        padding: 10px;
        flex: 1;
        padding-bottom: 40px;
        .ivu-tabs {
            .ivu-tabs-bar {
                border-bottom: none;
                margin-bottom: 0;
            }
        }
        .ivu-page {
            margin-top: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}
</style>

<template>
    <div class="performance-pan-container">
        <v-search-collapse @search="doSearch" @reset="resetSearch" @changeDivHeight="changeDivHeight" class="searchCollapse">
            <Select
                v-model="params.userId"
                v-if="params.objectType == 'sales consultant'"
                filterable
                remote
                clearable
                placeholder="销售顾问"
                :remote-method="remoteMethod"
                :loading="loadingSearch"
                :label-in-value="true"
                @on-change="choicesStudent"
            >
                <Option v-for="option in saleLists" :value="option.value" :key="option.value" :label="option.name">{{ option.name }}</Option>
            </Select>
            <Select v-model="params.officeId" style="width: 224px;" :clearable="this.params.objectType == 'office'" placeholder="校区">
                <Option v-for="item in officeLists" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
            <DatePicker v-model="params.timeScope" :clearable="false" type="month" format="yyyy年MM月" placement="bottom-start" style="width:224px;"></DatePicker>
        </v-search-collapse>
        <div class="performance-pan-main">
            <Tabs v-model="params.objectType" @on-click="changeTableType">
                <TabPane label="校区业绩计划" name="office"></TabPane>
                <TabPane label="销售业绩计划" name="sales consultant"></TabPane>
                <!-- <div class="tab_info buttons-after-slot" v-if="params.objectType == 'sales consultant'" slot="extra">
                    销售计划业绩合计/校区计划业绩：
                    <span class="primary">320.00/320.00</span>
                    ，销售计划到访数合计/校区计划到访数：
                    <span class="primary">2000/2000</span>
                </div> -->
                <Button type="primary" slot="extra" @click="showBatch" style="float: right;margin-bottom: 16px;">批量下达计划</Button>
            </Tabs>
            <Table :columns="defaultShowCol" :data="tableData" v-if="defaultShowCol">
                <template v-for="item in showColKeys" :keys="item" slot-scope="{ row, index }" :slot="item">
                    <span v-if="item == 'officeName' || item == 'objectName'" class="office_name">{{ row[item] }}</span>
                    <span v-else>{{ row[item] }}</span>
                    <!-- row[item+'Real']}} / -->
                </template>
            </Table>

            <!-- <Page :total="dataTotal" :current="pageNo" :page-size="pageSize" show-total show-sizer show-elevator @on-change="pageChange" @on-page-size-change="pageSizeChange" /> -->
        </div>
        <performance-plan-modal ref="performancePlanModalRef" @saveOk="doSearch"></performance-plan-modal>
        <batchModificationOffice
            :paramsInd="params"
            ref="batchModificationOffice"
            @hidModal="hidModal"
            v-if="showBatchModificationOffice"
            @uploadRows="doSearch"
        ></batchModificationOffice>
        <batchModificationSale :paramsInd="params" ref="batchModificationSale" @hidModal="hidModal" v-if="showBatchModificationSale" @uploadRows="doSearch"></batchModificationSale>
    </div>
</template>

<script>
/**
 ** @author: 曹见芳
 ** 业绩计划
 */
import { mapMutations, mapState } from 'vuex';
import valid, { errors, sysUser, sysDict, crmReferral, sysConfig, crmPlan, sysCommonSql } from '../../libs/request';
import { waitUntil } from '@public/libs/util';
import bigTable from '@public/modules/bigTable.vue';
import vSearchCollapse from '@public/modules/vSearchCollapse';
import performancePlanModal from './modal.vue';
import batchModificationOffice from './batchModification.vue';
import batchModificationSale from './batchModification.vue';

export default {
    name: 'performancePlan',
    components: {
        bigTable,
        vSearchCollapse,
        performancePlanModal,
        batchModificationSale,
        batchModificationOffice
    },
    data() {
        return {
            showBatchModificationOffice: false,
            showBatchModificationSale: false,
            tableHeightOut: 72,
            createTime: '2020-06',
            params: {
                objectType: 'office',
                officeId: '',
                timeScope: new Date().getFullYear() + '-' + (new Date().getMonth() + 1),
                userId: ''
            },
            pageNo: 1,
            pageSize: this.$store.state.app.pageSizeGlobal || 10,
            officeLists: [],
            defaultShowCol: null,
            showColKeys: [],
            tableData: [],
            dataTotal: 0,
            tableSaleColum: null,
            tableColumnArray: [
                {
                    title: '操作',
                    key: 'doAction',
                    width: 150,
                    render: (h, params) => {
                        let dom = [];
                        dom.push(
                            h(
                                'a',
                                {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '8px'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params.row);
                                        }
                                    }
                                },
                                '修改'
                            )
                        );
                        if (this.params.objectType == 'office') {
                            dom.push(
                                h(
                                    'a',
                                    {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                this.openSale(params.row);
                                            }
                                        }
                                    },
                                    '销售业绩计划'
                                )
                            );
                        }
                        return h('div', dom);
                    }
                }
            ],
            timer: null,
            loadingSearch: false,
            saleLists: [],
            showClo: []
        };
    },
    computed: {
        ...mapState(['app'])
    },
    mounted() {
        this.getOfficeLists();
        this.getShowTitle();
        this.batchListData();
        waitUntil(
            () => {
                return this.app.currOfficeId;
            },
            () => {
                if (this.params.objectType == 'office') {
                    this.params.officeId = '';
                } else {
                    this.params.officeId = this.officeLists[0].id;
                }
                this.doSearch();
            }
        );
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        showBatch() {
            if (this.params.objectType == 'office') {
                this.showBatchModificationOffice = true;
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.$refs.batchModificationOffice.showModal(this.params.objectType);
                    }, 200);
                });
            } else {
                this.showBatchModificationSale = true;
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.$refs.batchModificationSale.showModal(this.params.objectType);
                    }, 200);
                });
            }
        },
        hidModal() {
            if (this.params.objectType == 'office') {
                this.showBatchModificationOffice = false;
            } else {
                this.showBatchModificationSale = false;
            }
        },
        changeDivHeight(height) {
            this.tableHeightOut = height;
        },
        getOfficeLists() {
            sysUser
                .dataScopeFilter({ types: '2,3' })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.officeLists = res.data.data;
                    }
                })
                .catch(errors.call(this));
        },
        batchListData() {
            // 获取字典项
            let types = [
                'crm_referral' // 转介绍类型
            ];
            sysDict
                .batchListData({ types: types.join(',') })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let _data = res.data.data;
                        this.referralTypeLists = _data.crm_referral;
                    }
                })
                .catch(errors.call(this));
        },
        getListData(params) {
            // 获取data
            params = Object.assign(
                {
                    pageNo: this.pageNo,
                    pageSize: this.pageSize
                },
                params
            );
            this.updateLoadingStatus({ isLoading: true });
            params.timeScope = new Date(params.timeScope).format('yyyy-MM');
            console.log(params);
            crmPlan
                .list(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let result = res.data.data.list;
                        // result.forEach(v => {
                        //     v = Object.assign(v, JSON.parse(v.plan));
                        //     v = Object.assign(v, JSON.parse(v.planReal));
                        // });
                        this.tableData = result;
                        this.dataTotal = result.length;
                    } else {
                        this.tableData = [];
                        this.dataTotal = 0;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        //分页方法 如果有分页则为必须方法，修改getCourseList为自己的获取数据方法 这里注意。不再有每页个数改变的方法了
        pageChange(pageNo) {
            this.pageNo = pageNo;
            this.doSearch();
        },
        pageSizeChange(pageSize) {
            this.pageNo = 1;
            this.pageSize = pageSize;
            this.doSearch();
        },
        //必须方法，获取默认显示的可选列  接口根据需要自行更换，每个模块的接口是不一致的
        getShowTitle() {
            // let params = {
            //     pageIdentifier: 'listReferralPage',
            //     voName: 'com.windliven.spoc.modules.crm.vo.CrmReferralVO'
            // }
            // crmReferral.getShowTitle(params)
            //     .then(valid.call(this))
            //     .then(res => {
            //         if (res.ok) {
            //             this.defaultShowCol = res.data.data;
            //         }
            //     })
            //     .catch(errors.call(this));

            // 获取data
            // this.updateLoadingStatus({ isLoading: true });
            sysConfig
                .getConfig({
                    menuId: 2001,
                    configId: 'crm:plan'
                })
                .then(valid.call(this))
                .then(res => {
                    let list = res.data.data;
                    this.showClo = res.data.data;
                    this.showColKeys=[];
                    list.map(v => {
                        v.name = v.name.replace(/CountPlan/, "Plan")
                        v.key = v.name.replace(/Plan/, "Count");
                    });
                    list=list.filter(v=>v.selected=='1')
                    list.unshift({ title: '校区', key: 'objectName' });
                    let arr = [];
                    if (this.params.objectType == 'office') {
                        arr = arr.concat(list, this.tableColumnArray);
                    } else {
                        arr = arr.concat(
                            [
                                {
                                    title: '销售顾问',
                                    key: 'objectName'
                                }
                            ],
                            list,
                            this.tableColumnArray
                        );
                    }
                    arr.map(v=>{
                        v.slot = v.key;
                        this.showColKeys.push(v.key);
                    })
                    this.defaultShowCol=arr;
                    // this.tableColumnArray=
                })
                .catch(errors.call(this))
                .finally(() => {
                    // this.updateLoadingStatus({ isLoading: false });
                });
        },
        doSearch() {
            this.getShowTitle();
            this.getListData(this.params);
        },
        resetSearch() {
            this.params = {
                objectType: 'office',
                officeId: '',
                timeScope: new Date().getFullYear() + '-' + (new Date().getMonth() + 1),
                userId: ''
            };
            if (this.params.objectType == 'office') {
                this.params.officeId = '';
            } else {
                this.params.officeId = this.officeLists[0].id;
            }
            this.getShowTitle();
            this.getListData(this.params);
        },
        changeTableType(val) {
            console.log(val);
            // this.params.objectType = val;
            if (this.params.objectType == 'office') {
                this.params.officeId = '';
            } else {
                this.params.officeId = this.officeLists[0].id;
            }
            this.getShowTitle();
            this.getListData(this.params);
        },
        edit(row) {
            // if (this.params.objectType == '1') {
            // 修改 校区业绩计划
            this.$refs.performancePlanModalRef.showOfficeModal({
                tabaleTabs: this.params.objectType,
                showClo: this.showClo,
                row,
                timeScope:this.params.timeScope
            });
            // }
        },
        openSale(row) {
            // console.log(row)
            this.params.objectType = 'sales consultant';
            this.params.officeId = row.objectId;
            this.getShowTitle();
            this.getListData(this.params);
        },
        remoteMethod(query) {
            if (query !== '') {
                this.loadingSearch = true;
                console.log(query, 'qweqwe');
                this.debounce(query);
            } else {
                this.saleLists = [];
            }
        },
        debounce(query) {
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            this.timer = setTimeout(() => {
                this.getSaleLists(query);
            }, 500);
        },
        // getSaleLists(str) {
        // this.loadingSearch = false;
        // this.saleLists = [
        //     {
        //         cusId: '1',
        //         name: 'a1'
        //     },
        //     {
        //         cusId: '2',
        //         name: 'a2'
        //     },
        //     {
        //         cusId: '3',
        //         name: 'c1'
        //     }
        // ];
        // },
        choicesStudent(item) {
            console.log(item);
        },
        getSaleLists(query) {
            let params = {
                mainTable: 'sys_user',
                mainField: 'id',
                joinField: 'id',
                joinTable: 'sys_user',
                secondField: 'name',
                joinTableSearchParam: query
            };
            sysCommonSql
                .queryPageInputInitData(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.loadingSearch = false;
                        this.saleLists = res.data.data;
                    }
                })
                .catch(errors.call(this));
        },
        hidModal() {}
    },
    watch: {
        'app.currOfficeId': function(val, oldVal) {
            if (oldVal) {
                if (this.params.objectType == 'office') {
                    this.params.officeId = '';
                } else {
                    this.params.officeId = this.app.currOfficeId;
                }
                this.doSearch();
            }
        }
    }
};
</script>
