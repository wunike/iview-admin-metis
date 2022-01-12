<style lang="less">
.lesseeTrialTenantClass {
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
    .tabs-class {
        .ivu-tabs-nav {
            margin-left: 10px;
        }
    }
}
</style>
<template>
    <div class="lesseeTrialTenantClass">
        <top-main-info ref="topMainInfoRef" :eidtShow="true"></top-main-info>
        <Tabs
            class="tabs-class"
            :animated="false"
            style="background:#fff;padding-top:10px;"
            @on-click="tabChange"
            v-model="tabValName"
        >
            <TabPane label="基本信息" name="name1"></TabPane>
            <TabPane label="租户列表" name="name2"></TabPane>
            <TabPane label="分享页" name="name3"></TabPane>
        </Tabs>

        <!-- :btnList="btnList" -->
        <div v-if="tabValName=='name1'">
            <essentialInfo></essentialInfo>
        </div>
        <div v-else-if="tabValName=='name2'">
            <v-search-collapse
                ref="searchCollapseRef"
                @search="searchList"
                @reset="resetSearch"
                @changeDivHeight="changeDivHeight"
            >
                <Input v-model="findObj.qrCode" placeholder="客户姓名" style="width:140px;" />
                <Input v-model="findObj.qrCode" placeholder="创建人" style="width:140px;" />
                <Select v-model="findObj.status" clearable placeholder="使用状态" style="width:140px;">
                    <Option
                        v-for="item in statusList"
                        :value="item.value"
                        :key="item.value"
                    >{{ item.label }}</Option>
                </Select>
                <DatePicker
                    ref="DatePicker"
                    :options="options3"
                    split-panels
                    @on-open-change="setOptTime"
                    v-model="optTime"
                    type="daterange"
                    placement="bottom-start"
                    separator=" ~ "
                    placeholder="创建日期"
                    style="width:224px;"
                ></DatePicker>
                <DatePicker
                    ref="DatePicker"
                    :options="options3"
                    split-panels
                    @on-open-change="setOptTime"
                    v-model="optTime"
                    type="daterange"
                    placement="bottom-start"
                    separator=" ~ "
                    placeholder="结束日期"
                    style="width:224px;"
                ></DatePicker>
                <Select
                    v-model="findObj.ownerOfficeId"
                    clearable
                    placeholder="选择登记校区 "
                    style="width:224px;"
                    @on-change="ownerOfficeChange"
                >
                    <Option
                        v-for="item in officeIdList"
                        :value="item.id"
                        :key="item.value"
                    >{{ item.code }}{{ item.name }}</Option>
                </Select>
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
                :isShowSelectTableColumn="true"
                :updateShowTitleMethod="updateShowTitle"
                :updateShowTitleKey="updateShowTitleKey"
                :tableHeightOut="tableHeightOut"
                @selectionChange="selectionChange"
                @pageChange="pageChange"
                @sortChange="sortChange"
                @changeTableType="changeTableType"
            ></big-table>
        </div>
        <lesseeSharePage v-else></lesseeSharePage>
    </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import bigTable from "@public/modules/bigTable.vue";
// import exportModal from "@public/modules/exportModal.vue";
import vSearchCollapse from "@public/modules/vSearchCollapse";
import valid, {
    errors,
    common,
    sysUser,
    sysDict,
    sysCommonSql,
    crmQrcode
} from "../../../../spoc-crm-web/src/libs/request";
// D:\yangdongxu\spoc-portal-cos\src\modules\spoc-crm-web\src\libs
import {
    waitUntil,
    DatePickerOpt,
    defaultDatePickerValue
} from "@public/libs/util";
import tableDropdown from "@public/modules/tableDropdown";
import topMainInfo from "./components/topMainInfo";
import lesseeSharePage from "./components/lesseeSharePage";
import essentialInfo from "./components/essentialInfo";

export default {
    name: 'core.lesseeTrialTenant',
    // beforeRouteEnter(to, from, next) {
    //     next(vm => {
    //         if (from.name == "core.lesseeShareEditPage") {
    //             vm.tabValName = "name3";
    //         }
    //     });
    // },
    data() {
        return {
            tabValName: "name1",
            modal1: false,
            options3: null,
            tableHeightOut: 72, //324,
            orderByStatus: 2,
            orderByType: "",
            ownerIdList: [],
            optTime: [],
            crm_customer_source: [],
            // crm_customer_secondSource: [],
            // crm_customer_thirdSource: [],
            officeIdList: [],
            loadingCreateById: false,
            createByIdList: [],
            statusList: [
                {
                    value: "0",
                    label: "无效"
                },
                {
                    value: "1",
                    label: "有效"
                }
            ],
            updateShowTitleKey: "crmQrcode",
            updateShowTitle: crmQrcode.updateShowTitle,
            exportMethod: crmQrcode.exportSelectedFile, //导出用到的方法对象
            selection: [],
            btnList: [
                {
                    style: {},
                    type: "",
                    btnClick: this.createQrCode,
                    text: "创建二维码"
                }
            ],
            findObj: {
                startTime: "",
                endTime: "", //开始生成时间
                ownerOfficeId: "",
                ownerId: "",
                qrCode: "",
                createById: "",
                status: "",
                querySources: [],
                // secondSource: "",
                // thirdSource: "",
                tags: []
            },
            pageNo: 1,
            pageSize: this.$store.state.app.pageSizeGlobal,
            /*搜索相关结束*/
            tableName: [
                {
                    name: "试用租户",
                    value: "1"
                },
                {
                    name: "付费租户",
                    value: "2"
                }
            ],
            defaultShowCol: null,
            dataTotal: 0,
            sortObj: {},
            tableColumnArray: [
                // {
                //     title: "客户标签",
                //     key: "tags",
                //     minWidth: 100,
                //     render: (h, params) => {
                //         if (params.row.tags) {
                //             let arr = params.row.tags.split(" ");
                //             return h(
                //                 "div",
                //                 arr.map(function(item, index) {
                //                     if (index < 3) {
                //                         return h(
                //                             "span",
                //                             {
                //                                 style: {
                //                                     display: "inline-block",
                //                                     background: "#EBECF0",
                //                                     borderRadius: "4px",
                //                                     height: "24px",
                //                                     "line-height": "24px",
                //                                     padding: "0 12px",
                //                                     marginRight: "8px",
                //                                     marginTop: "5px",
                //                                     marginBottom: "5px",
                //                                     color: "#495060"
                //                                 }
                //                             },
                //                             item ? item : "-"
                //                         );
                //                     } else if (index == 3) {
                //                         return h(labelMore, {
                //                             ref: "labelMoreRef",
                //                             props: {
                //                                 labelMoreArr: arr.slice(3)
                //                             }
                //                         });
                //                     }
                //                 })
                //             );
                //         }
                //     }
                // },
                // {
                //     title: "促销员",
                //     key: "channelNum",
                //     minWidth: 40,
                //     render: (h, params) => {
                //         return params.row.channelNum > 0
                //             ? h(channelNum, {
                //                   props: {
                //                       channelNum: params.row.channelNum,
                //                       qrcodeId: params.row.id
                //                   },
                //                   on: {
                //                       click: () => {}
                //                   }
                //               })
                //             : h("div", {}, params.row.channelNum);
                //     }
                // },
                {
                    // title: "访问次数",
                    sortable: true,
                    key: "visits",
                    width: 80,
                    render: (h, params) => {
                        return h(
                            "a",
                            {
                                style: {
                                    // "color": "10px"
                                }
                            },
                            params.row.appPercent * 100 + "%"
                        );
                    }
                },
                {
                    // title: "leads数",
                    sortable: true,
                    key: "leads",
                    width: 80
                },
                {
                    // title: "Vleads数",
                    sortable: true,
                    key: "vleads",
                    width: 80
                },
                {
                    // title: "APP数",
                    sortable: true,
                    key: "app",
                    width: 80
                },
                {
                    // title: "APP转化数",
                    sortable: true,
                    key: "appPercent",
                    width: 100,
                    render: (h, params) => {
                        return h("div", {}, params.row.appPercent * 100 + "%");
                    }
                },
                {
                    // title: "OPP数",
                    sortable: true,
                    key: "opp",
                    width: 80
                },
                {
                    // title: "OPP转化率",
                    sortable: true,
                    key: "oppPercent",
                    width: 100,
                    render: (h, params) => {
                        return h("div", {}, params.row.oppPercent * 100 + "%");
                    }
                },
                {
                    // title: "New数",
                    sortable: true,
                    key: "anew",
                    width: 80
                },
                {
                    // title: "New转化率",
                    sortable: true,
                    key: "newPercent",
                    width: 100,
                    render: (h, params) => {
                        return h("div", {}, params.row.newPercent * 100 + "%");
                    }
                },
                {
                    // title: "二维码状态",
                    key: "codeEnable",
                    width: 110,
                    render: (h, params) => {
                        // let status = "";
                        // if (params.row.status == "ready") {
                        // 	status = "error";
                        // } else if (params.row.status == "doing") {
                        // 	status = "success";
                        // } else if (params.row.status == "finish") {
                        // 	status = "default";
                        // } else if (params.row.status == "lose") {
                        // 	status = "warning";
                        // }
                        return h("div", [
                            h("Badge", {
                                props: {
                                    status: "success"
                                }
                            }),
                            params.row.codeEnable
                        ]);
                    }
                },
                {
                    title: "操作",
                    key: "doAction",
                    width: 170,
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "a",
                                {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    },
                                    style: {},
                                    on: {
                                        click: () => {
                                            // this.$router.push({
                                            //     name:
                                            //         "crm.QrCodeEnrollmentDetail",
                                            //     query: {
                                            //         qrCode: params.row.qrCode
                                            //     }
                                            // });
                                        }
                                    }
                                },
                                "详情"
                            ),
                            h(
                                "a",
                                {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    },
                                    style: {
                                        "margin-left": "12px"
                                    },
                                    on: {
                                        click: () => {
                                            // this.$refs.stopModalRef.modal1 = true;
                                            // this.$router.push({
                                            //     name:
                                            //         "crm.QrCodeEnrollmentDetail",
                                            //     query: {
                                            //         qrCode: params.row.qrCode
                                            //     }
                                            // });
                                        }
                                    }
                                },
                                "修改备注"
                            )
                            // h(
                            //     "a",
                            //     {
                            //         props: {
                            //             type: "text",
                            //             size: "small"
                            //         },
                            //         style: {
                            //             "margin-left": "12px"
                            //         },
                            //         on: {
                            //             click: () => {
                            //                 this.$router.push({
                            //                     name:
                            //                         "crm.QrCodeEnrollmentDetail",
                            //                     query: {
                            //                         qrCode: params.row.qrCode
                            //                     }
                            //                 });
                            //             }
                            //         }
                            //     },
                            //     "详情"
                            // ),
                            // h(
                            //     "a",
                            //     {
                            //         props: {
                            //             type: "text",
                            //             size: "small"
                            //         },
                            //         style: {
                            //             "margin-left": "12px"
                            //         },
                            //         on: {
                            //             click: () => {
                            //                 this.$Modal.success({
                            //                     title: "重置密码",
                            //                     content:
                            //                         "<p>重置成功，密码重置为123456，需要在第一次登录时修改。</p>"
                            //                 });
                            //             }
                            //         }
                            //     },
                            //     "重置密码"
                            // )
                        ]);
                    }
                }
            ],
            tableData: []
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
        // exportModal,
        vSearchCollapse,
        tableDropdown,
        topMainInfo,
        lesseeSharePage,
        essentialInfo
    },
    mounted() {
        //编辑分享页取消时候返回到分享页的tab
        if (
            this.$route.params.tabValName &&
            this.$route.params.tabValName == "name3"
        ) {
            this.tabValName = "name3";
        }
        this.getShowTitle();
        this.getInitData();
        // this.batchListData();
        this.batchListDataFn();
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        tabChange(name) {
            // if (name == "name3") {
            //     this.$router.push({
            //         name: "core.lesseeSharePage"
            //     });
            // }
        },
        changeTableType(val) {
            // this.tableType = val;
            // this.updateLoadingStatus({ isLoading: true });
            this.tableColumnArray = [];
            // this.tableColumnArray = [].concat(this["tableColumnArray" + val]);
            // this.getShowTitle(true);
            // if (val == "1") {
            // 	this.updateShowTitleKey = "jwClassCourse";
            // } else {
            // 	this.updateShowTitleKey = "jwClassShare";
            // }
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
                this.orderByStatus = 1;
            } else {
                //desc 降序
                this.orderByStatus = 2;
            }
            this.pageNo = 1;
            this.tableData = [];
            this.getListData();
        },
        ownerOfficeChange() {
            this.findObj.ownerId = "";
            this.getListDataByRole();
        },
        getListDataByRole() {
            /*
            用这个接口/a/ws/sys/user/listDataByRole?roleIds=3&pageSize=-1&officeIds=3
officeIds根据上面选的校区动态的，其他参数都不变
            */
            let obj = {
                roleIds: 3,
                pageSize: -1,
                officeIds: this.findObj.ownerOfficeId
            };
            sysUser
                .listDataByRole(obj)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.ownerIdList = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    // this.updateLoadingStatus({ isLoading: false });
                });
        },
        firstSourceChange(val) {
            //     this.crm_customer_secondSource = [];
            //     this.findObj.secondSource = "";
            //     this.crm_customer_thirdSource = [];
            //     this.findObj.thirdSource = "";
            //     val ? this.batchListDataFn(1) : "";
        },
        // secondSourceChange(val) {
        //     this.crm_customer_thirdSource = [];
        //     this.findObj.thirdSource = "";
        //     val ? this.batchListDataFn(2) : "";
        // },
        batchListDataFn() {
            sysDict
                .getDictStringTree({ type: "crm_customer_source" })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.crm_customer_source = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
            // let types; //创建二维码的渠道   是字典查询，字典type是crm_customer_source;
            // if (val == 1) {
            //     types = this.findObj.firstSource;
            // } else if (val == 2) {
            //     types = this.findObj.secondSource;
            // } else {
            //     types = "crm_customer_source";
            // }
            // sysDict
            //     .batchListData({
            //         types
            //     })
            //     .then(valid.call(this))
            //     .then(res => {
            //         if (res.ok) {
            //             if (val == 1) {
            //                 this.crm_customer_secondSource =
            //                     res.data.data[types];
            //             } else if (val == 2) {
            //                 this.crm_customer_thirdSource =
            //                     res.data.data[types];
            //             } else {
            //                 this.crm_customer_source =
            //                     res.data.data.crm_customer_source;
            //             }
            //         }
            //     })
            //     .catch(errors.call(this))
            //     .finally(() => {
            //         this.updateLoadingStatus({ isLoading: false });
            //     });
        },
        remoteCreateById(query) {
            this.loadingCreateById = true;
            let params = {
                mainTable: "crm_qrcode",
                mainField: "create_by",
                joinField: "id",
                joinTable: "sys_user",
                secondField: "name",
                joinTableSearchParam: query
            };
            sysCommonSql
                .queryPageInputInitData(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.createByIdList = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.loadingCreateById = false;
                });
        },
        userLabelTrueChoose(data) {
            this.findObj.tags = data;
            this.searchList();
        },
        userLabelTrueChooseClear(data) {
            this.findObj.tags = data;
        },
        validFn(id, isEnable) {
            let param = {
                id,
                isEnable
            };
            crmQrcode
                .updateQrcodeEnable(param)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.$Message.success(res.data.message);
                        this.updateLoadingStatus({ isLoading: true });
                        this.tableData = [];
                        this.getListData();
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    // this.updateLoadingStatus({ isLoading: false });
                });
        },
        createQrCode(type) {
            this.$router.push({
                name: "crm.createQrCode"
            });
        },
        //可选方法，如果是多选的话必须有
        selectionChange(selection) {
            this.selection = selection;
        },
        isExport(val) {
            //这里val的值。是根据设置下拉类型button设定的值来匹配判断
            if (val == "2" && !this.selection.length) {
                this.$Message.error("请选择要导出的数据");
                return;
            }
            let searchObj = this.searchObj;
            if (val == "1") {
                this.exportMethod = htContract.exportFile; //导出用到的方法对象
            } else if (val == "2") {
                //如果是导出所选，需要在这里传递所选对象、或者对象ID，这里根据需要自行处理，并作为搜索参数的一部分传递到导出组件
                searchObj = {
                    ids: this.selection.map(item => {
                        return item.id;
                    })
                };
                this.exportMethod = htContract.exportSelectedFile; //导出用到的方法对象
            }
            this.$refs.exportModal.noShowExport(this.exportMethod, searchObj);
        },
        // getListDataEmit() {
        //     this.searchList();
        // },
        getInitData() {
            var promise = new Promise((resolve, reject) => {
                //校区列表
                sysUser
                    .dataScopeFilter()
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            resolve(res);
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {});
            });
            promise.then(res => {
                if (res.ok) {
                    this.officeIdList = res.data.data;
                    waitUntil(
                        () => {
                            if (this.app.currOfficeId) {
                                this.$set(
                                    this.findObj,
                                    "ownerOfficeId",
                                    this.app.currOfficeId == "all"
                                        ? ""
                                        : this.app.currOfficeId
                                );
                            }
                            return (
                                (this.app.currOfficeId &&
                                    JSON.stringify(this.buttonPerm) != "{}") ||
                                false
                            );
                        },
                        () => {
                            if (this.myButtonPrem.indexOf("edit") < 0) {
                                //不可创建编辑
                                this.btnList = [];
                            }
                            this.optTime = defaultDatePickerValue(
                                this.calendarConfig.maxMonthInterval
                            );
                            this.options3 = DatePickerOpt(
                                this,
                                "DatePicker",
                                Number(this.calendarConfig.maxMonthInterval)
                            );
                            this.getListDataByRole();
                            this.getListData();
                        }
                    );
                }
            });
        },
        changeType(val) {
            this.findObj.courseGrade = "";
        },
        getListData() {
            // debugger;
            this.updateLoadingStatus({ isLoading: true });
            let param = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                orderByType: this.orderByType,
                orderByStatus: this.orderByStatus
            };
            this.findObj.startTime = this.optTime[0]
                ? this.optTime[0].format("yyyy-MM-dd 00:00:00")
                : "";
            this.findObj.endTime = this.optTime[1]
                ? this.optTime[1].format("yyyy-MM-dd 23:59:59")
                : "";
            param = Object.assign({}, param, this.findObj);
            // param.ownerOfficeId = this.findObj.ownerOfficeId;
            // this.searchObj = param; //这里需要给searchObj 赋值，导出数据的时候需要用到
            crmQrcode
                .listPage(param)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let result = res.data.data;
                        this.tableData = result.list;
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
            crmQrcode
                .getShowTitle({
                    pageIdentifier: "crmQrcode"
                    // voName: "com.windliven.spoc.modules.cw.vo.CwCapitalTraceVO"
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.defaultShowCol = res.data.data;
                    }
                })
                .catch(errors.call(this));
        },
        resetSearch() {
            this.$refs.searchCollapseRef.resetTrueFn();
            this.optTime = defaultDatePickerValue(
                this.calendarConfig.maxMonthInterval
            );
            for (let item in this.findObj) {
                if (item == "tags") {
                    this.findObj[item] = [];
                } else if (item == "querySources") {
                    this.findObj[item] = [];
                } else {
                    this.findObj[item] = "";
                }
            }
            this.pageNo = 1;
            this.$set(
                this.findObj,
                "ownerOfficeId",
                this.app.currOfficeId == "all" ? "" : this.app.currOfficeId
            );
            this.getListData();
        }
    },
    watch: {
        "app.currOfficeId": function(val, oldVal) {
            if (oldVal && this.$route.name == "crm.QrCodeEnrollment") {
                this.$set(
                    this.findObj,
                    "ownerOfficeId",
                    val == "all" ? "" : val
                );
                this.getListData();
            }
        }
    }
};
</script>
