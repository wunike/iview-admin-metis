<style lang="less">
.mytable {
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
</style>
<template>
    <div>
        <v-search-collapse
            @search="searchList"
            @reset="resetSearch"
            @changeDivHeight="changeDivHeight">
            <DatePicker
                ref="DatePicker"
                :options="options"
                split-panels
                @on-open-change="setOptTime"
                v-model="optTime"
                type="daterange"
                placement="bottom-start"
                separator=" ~ "
                placeholder="开通租户日期"
                style="width:224px;">
            </DatePicker>
            <Input v-model="params.name" placeholder="企业名称" />
            <!-- <Input v-model="params.qrCode" placeholder="企业简称" /> -->
            <Input v-model="params.duty" placeholder="联系人" />
            <Input v-model="params.mobile" placeholder="联系电话" />
        </v-search-collapse>
        <big-table
            v-if="defaultShowCol"
            class="mytable"
            :tableName="tableName"
            :tableData="tableData"
            :tableColumnArray="tableColumnArray"
            :defaultShowCol="defaultShowCol"
            :canSelection="false"
            :dataTotal="dataTotal"
            :canChangeHeight="true"
            :btnList="btnList"
            :isShowSelectTableColumn="true"
            :tableHeightOut="tableHeightOut"
            @selectionChange="selectionChange"
            @pageChange="pageChange"
            @sortChange="sortChange"
            @changeTableType="changeTableType">
        </big-table>
        <stop-modal ref="stopModalRef" :modal1="modal1"></stop-modal>
        <create-lessee @upload="getListData" ref="createLesseeRef"></create-lessee>
    </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import bigTable from "@public/modules/bigTable.vue";
import vSearchCollapse from "@public/modules/vSearchCollapse";
import valid, { errors, api } from "../../libs/request";
import { waitUntil, DatePickerOpt, defaultDatePickerValue } from "@public/libs/util";
import tableDropdown from "@public/modules/tableDropdown";
import stopModal from "./components/stopModal";
import createLessee from "./components/createLessee";
// import labelMore from "./components/labelMore";
export default {
    name: 'core.lessee',
    data() {
        return {
            modal1: false,
            options: null,
            tableHeightOut: 72,
            orderByStatus: 'descending',
            orderByType: "",
            optTime: [],
            selection: [],
            btnList: [
                {
                    type: '',
                    btnClick: this.addNew,
                    text: '创建租户',
                },
            ],
            params: {
                duty: '',
                mobile: '',
                name: '',
                // startTime: '',
                // endTime: '',
                // status: ''
            },
            pageNo: 1,
            pageSize: this.$store.state.app.pageSizeGlobal,
            tableName: [
                {
                    name: "全部",
                    value: "all"
                }
            ],
            defaultShowCol: null,
            defaultShowColCopy: null,
            dataTotal: 0,
            tableColumnArray: [
                {
                    key: "status",
                    render: (h, params) => {
                        return h('span', params.row.status.desc || '-')
                    }
                },
                {
                    key: "type",
                    render: (h, params) => {
                        return h('span', params.row.type.desc || '-')
                    }
                },
                {
                    key: "version",
                    render: (h, params) => {
                        return h('span', params.row.version.desc || '-')
                    }
                },
                {
                    title: "操作",
                    key: "doAction",
                    width: 100,
                    render: (h, params) => {
                        let dom = [];
                        let statusFlag = params.row.status.code;

                        if(statusFlag == 'NORMAL' || statusFlag == 'FORBIDDEN') {
                            // 当前正常 或者 禁用
                            dom.push(h('a', {
                                props: {
                                    type: "text",
                                    size: "small"
                                },
                                style: {
                                    "margin-right": "6px"
                                },
                                on: {
                                    click: () => {
                                        this.updateStatus(params.row.id, statusFlag == 'NORMAL' ? 'FORBIDDEN' : 'NORMAL');
                                    }
                                }
                            }, statusFlag == 'NORMAL' ? '停用' : '启用'))

                            if(statusFlag == 'NORMAL'){
                                dom.push(h(
                                        "a",
                                    {
                                        props: {
                                            type: "text",
                                            size: "small"
                                        },
                                        on: {
                                            click: () => {
                                                // this.$router.push({
                                                //     name:'crm.customer360',
                                                //     query:{
                                                //         id:params.row.id
                                                //     }
                                                // })
                                                this.$refs.createLesseeRef.editorModal(params.row);
                                            }
                                        }
                                    },
                                    "续约"
                                ))
                            }
                        } else if(statusFlag == 'TRAILING' || statusFlag == 'UNPAY') {
                            // 当前 试用 或者 未付费
                            dom.push(h('a', {
                                props: {
                                    type: "text",
                                    size: "small"
                                },
                                style: {
                                    "margin-right": "6px"
                                },
                                on: {
                                    click: () => {
                                        this.updateStatus(params.row.id, 'NORMAL');
                                    }
                                }
                            }, '转正式'))
                            if(statusFlag == 'UNPAY') {
                                // 当前 未付费
                                dom.push(h(
                                        "a",
                                    {
                                        props: {
                                            type: "text",
                                            size: "small"
                                        },
                                        on: {
                                            click: () => {
                                                // this.$router.push({
                                                //     name:'crm.customer360',
                                                //     query:{
                                                //         id:params.row.id
                                                //     }
                                                // })
                                                this.$refs.createLesseeRef.editorModal(params.row);
                                            }
                                        }
                                    },
                                    "延期"
                                ))
                            }
                            // dom.push(h('a', {
                            //     props: {
                            //         type: "text",
                            //         size: "small"
                            //     },
                            //     style: {
                            //         "margin-right": "6px"
                            //     },
                            //     on: {
                            //         click: () => {
                            //             this.updateStatus(params.row.id, 'UNPAY');
                            //         }
                            //     }
                            // }, '未付费'))
                        } else if(statusFlag == 'FINISH'){
                            dom.push(h(
                                    "a",
                                {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    },
                                    on: {
                                        click: () => {
                                            // this.$router.push({
                                            //     name:'crm.customer360',
                                            //     query:{
                                            //         id:params.row.id
                                            //     }
                                            // })
                                            this.$refs.createLesseeRef.editorModal(params.row);
                                        }
                                    }
                                },
                                "续约"
                            ))
                        }
                        return h("div", [
                            h(
                                "a",
                                {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    },
                                    style: {
                                        "margin-right": "6px"
                                    },
                                    on: {
                                        click: () => {
                                           this.$router.push({
                                                name:'core.tenantAccount',
                                                query:{
                                                    id:params.row.id
                                                }
                                            })
                                        }
                                    }
                                },
                                "详情"
                            ),
                            dom,
                            // h(
                            //     "a",
                            //     {
                            //         props: {
                            //             type: "text",
                            //             size: "small"
                            //         },
                            //         style: {
                            //             "margin-left": "6px"
                            //         },
                            //         on: {
                            //             click: () => {
                            //                 this.$refs.stopModalRef.modal1 = true;

                            //             }
                            //         }
                            //     },
                            //     "停用服务"
                            // ),
                            // h(
                            //     "a",
                            //     {
                            //         props: {
                            //             type: "text",
                            //             size: "small"
                            //         },
                            //         style: {
                            //             "margin-left": "6px"
                            //         },
                            //         on: {
                            //             click: () => {
                            //                  this.$router.push({
                            //                     name:'crm.customer360',
                            //                     query:{
                            //                         id:params.row.id
                            //                     }
                            //                 })
                            //             }
                            //         }
                            //     },
                            //     "系统账户信息"
                            // ),
                        ]);
                    }
                }
            ],
            tableData: [],
        };
    },
    computed: {
        ...mapState(["app", "buttonPerm", "calendarConfig"]),
        myButtonPrem() {
            return this.buttonPerm["crm.QrCodeEnrollment"] || [];
        }
    },
    components: {
        bigTable,
        vSearchCollapse,
        tableDropdown,
        stopModal,
        createLessee
        // labelMore
    },
    mounted() {
        this.getShowTitle();
        this.getListData();
        this.batchListDataFn();
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        changeTableType(val) {
            if(val != 'all') {
                this.params.status = {
                    code: val
                }
            } else {
                delete this.params.status;
            }
            this.defaultShowCol = {};
            this.$nextTick(() => {
                this.defaultShowCol = Object.assign(this.defaultShowColCopy)
            })
            this.pageNo = 1;
            this.getListData();
        },
        setOptTime(flag) {
            if (flag) {
                this.optTime = [];
            }
        },
        changeDivHeight(height) {
            this.tableHeightOut = height;
        },
        sortChange(val) {
            // debugger;
            this.orderByType = val.key;
            if (val.order == "asc") {
                //升序
                this.orderByStatus = 'ascending';
            } else {
                //desc 降序
                this.orderByStatus = 'descending';
            }
            this.pageNo = 1;
            this.tableData = [];
            this.getListData();
        },
        batchListDataFn() {
            // 获取租户状态列表
            api.enums({ codes: "TenantStatusEnum" })
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    let statusLists = res.data.data.TenantStatusEnum;
                    let lists = [
                        {
                            name: "全部",
                            value: "all"
                        },
                    ];
                    for (const key in statusLists) {
                        lists.push({
                            value: key,
                            name: statusLists[key]
                        })
                    }
                    this.tableName = lists;
                }
            })
            .catch(errors.call(this))
            .finally(() => {
                this.updateLoadingStatus({ isLoading: false });
            });
        },
        //可选方法，如果是多选的话必须有
        selectionChange(selection) {
            this.selection = selection;
        },
        getListData() {
            this.updateLoadingStatus({ isLoading: true });
            let startTime = this.optTime[0] ? this.optTime[0].format("yyyy-MM-dd 00:00:00") : "";
            let endTime = this.optTime[1] ? this.optTime[1].format("yyyy-MM-dd 23:59:59") : "";

            let param = Object.assign({
                current: this.pageNo,
                size: this.pageSize,
                // order: this.orderByType,
                // sort: this.orderByStatus,
                order: 'descending',
                sort: 'id',
                map: {
                    createTime_st: startTime,
                    createTime_ed: endTime
                }
            }, {
                model: this.params
            });
            // this.searchObj = param; //这里需要给searchObj 赋值，导出数据的时候需要用到
            api.tenantPage(param)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    let result = res.data.data;
                    this.tableData = result.records;
                    this.dataTotal = result.total;
                }
            })
            .catch(errors.call(this))
            .finally(() => {
                this.updateLoadingStatus({ isLoading: false });
            });
        },
        //获取数据，根据情况修改接口、传参
        searchList() {
            this.tableData = [];
            this.pageNo = 1;
            this.getListData();
        },
        //分页方法 如果有分页则为必须方法，修改getCourseList为自己的获取数据方法 这里注意。不再有每页个数改变的方法了
        pageChange(pageNo, pageSize) {
            if (!pageNo) {
                //防止无用重复请求
                return;
            }
            this.pageNo = pageNo;
            this.pageSize = pageSize;
            this.tableData = [];
            this.getListData();
        },
        //必须方法，获取默认显示的可选列  接口根据需要自行更换，每个模块的接口是不一致的
        getShowTitle() {
            api.tenantGetShowTitle({
                pageIdentifier: 'lessee',
                tableName: "tenant",
                voName: "com.github.zuihou.authority.dto.defaults.TenantPageQueryDTO"
            })
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.defaultShowCol = res.data.data;
                    this.defaultShowColCopy = Object.assign(res.data.data);
                }
            })
            .catch(errors.call(this));
        },
        resetSearch() {
            // this.optTime = defaultDatePickerValue(
            //     this.calendarConfig.maxMonthInterval
            // );
            this.optTime = [];
            for (let item in this.params) {
                this.params[item] = "";
            }
            this.pageNo = 1;
            this.getListData();
        },
        addNew() {
            // 创建租户
            this.$refs.createLesseeRef.showModal();
        },
        updateStatus(id, status) {
            let params = {
                id,
                status: {
                    code: status
                }
            }
            api.tenantUpdateStatus(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.$Message.success(status == 'FORBIDDEN' ? '停用成功' : '启用成功');
                    this.searchList();
                }
            })
            .catch(errors.call(this));
        },
    }
};
</script>
