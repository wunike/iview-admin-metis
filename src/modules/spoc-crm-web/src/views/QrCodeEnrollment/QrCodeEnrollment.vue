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
            ref="searchCollapseRef"
            @search="searchList"
            @reset="resetSearch"
            :hasTag="true"
            @hasTagEmitFn="hasTagEmitFn"
            @userLabelTrueChoose="userLabelTrueChoose"
            @userLabelTrueChooseClear="userLabelTrueChooseClear"
            @changeDivHeight="changeDivHeight"
        >
            <DatePicker
                ref="DatePicker"
				:options="options3"
				split-panels
				@on-open-change="setOptTime"
                v-model="optTime"
                type="daterange"
                placement="bottom-start"
                separator=" ~ "
                :placeholder="$t('scoretemplate_scoretemplate_556')"
                style="width:224px;"
            ></DatePicker>
            <Select
                v-model="findObj.ownerOfficeId"
                clearable
                :placeholder="$t('modules_spoc_crm_web_src_views_qrcodeenrollment_qrcodeenrollment_1559')"
                style="width:224px;"
                @on-change="ownerOfficeChange"
            >
                <Option
                    v-for="item in officeIdList"
                    :value="item.id"
                    :key="item.value"
                >{{ item.code }}{{ item.name }}</Option>
            </Select>
            <Select :placeholder="$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1515')" v-model="findObj.ownerId" @on-change="ownerIdChange">
                <Option v-for="item in ownerIdList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
            <Input v-model="findObj.qrCode" :placeholder="$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_695')" style="width:140px;" />
            <Select
                v-model="findObj.createById"
                :placeholder="$t('modules_spoc_crm_web_src_views_qrcodeenrollment_qrcodeenrollment_1562')"
                style="width: 140px;margin-right:12px;"
                clearable
                filterable="true"
                remote
                :loading="loadingCreateById"
                :remote-method="remoteCreateById"
            >
                <Option
                    v-for="item in createByIdList"
                    :value="item.value"
                    :key="item.value"
                >{{ item.name }}</Option>
            </Select>
            <Select v-model="findObj.status" clearable :placeholder="$t('modules_spoc_crm_web_src_views_qrcodeenrollment_qrcodeenrollment_1563')" style="width:140px;">
                <Option
                    v-for="item in statusList"
                    :value="item.value"
                    :key="item.value"
                >{{ item.label }}</Option>
            </Select>
            <Select
                :placeholder="$t('modules_spoc_crm_web_src_views_customermanagement_index_1267')"           
                clearable
                multiple
                filterable
                v-model="findObj.querySources"
                @on-change="firstSourceChange"
            >
                <Option
                    v-for="item in crm_customer_source"
                    :value="item.value"
                    :key="item.value"
                >{{ item.name }}</Option>
            </Select>
            <!-- <Select
                :placeholder="$t('modules_spoc_crm_web_src_views_qrcodeenrollment_qrcodeenrollment_1565')"
                clearable
                v-model="findObj.secondSource"
                @on-change="secondSourceChange"
            >
                <Option
                    v-for="item in crm_customer_secondSource"
                    :value="item.value"
                    :key="item.value"
                >{{ item.label }}</Option>
            </Select>
            <Select :placeholder="$t('modules_spoc_crm_web_src_views_qrcodeenrollment_qrcodeenrollment_1566')" clearable v-model="findObj.thirdSource">
                <Option
                    v-for="item in crm_customer_thirdSource"
                    :value="item.value"
                    :key="item.value"
                >{{ item.label }}</Option>
            </Select> -->
        </v-search-collapse>
        <big-table
            v-if="defaultShowCol"
            ref="myTable"
            class="mytable"
            :tableName="tableName"
            :tableData="tableData"
            :tableColumnArray="tableColumnArray"
            :defaultShowCol="defaultShowCol"
            :canSelection="true"
            :dataTotal="dataTotal"
            :btnList="btnList"
            :canChangeHeight="true"
            :isShowSelectTableColumn="true"
            :updateShowTitleMethod="updateShowTitle"
            :updateShowTitleKey="updateShowTitleKey"
            :tableHeightOut="tableHeightOut"
            @onRowClick="onRowClick"
            @resetDefault="resetDefaultCol"
            @selectionChange="selectionChange"
            @filterChange="filterChange"
            @pageChange="pageChange"
            @sortChange="sortChange"
        ></big-table>
        <export-modal ref="exportModal" :exportMethod="exportMethod"></export-modal>
    </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import bigTable from "@public/modules/bigTable.vue";
import exportModal from "@public/modules/exportModal.vue";
import vSearchCollapse from "@public/modules/vSearchCollapse";
import valid, {
    errors,
    common,
    sysUser,
    sysDict,
    sysCommonSql,
    crmQrcode
} from "../../libs/request";
import { waitUntil, DatePickerOpt, defaultDatePickerValue } from "@public/libs/util";
import tableDropdown from "@public/modules/tableDropdown";
import channelNum from "./components/channelNum";
import labelMore from "./components/labelMore";
export default {
    name: 'crm.QrCodeEnrollment',
    data() {
        return {
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
                    label: this.$t('scoretemplate_scoretemplate_558')
                },
                {
                    value: "1",
                    label: this.$t('scoretemplate_scoretemplate_559')
                }
            ],
            updateShowTitleKey: "crmQrcode",
            updateShowTitle: crmQrcode.updateShowTitle,
            exportMethod: crmQrcode.export, //导出用到的方法对象
            selection: [],
            btnList: [
                {
                    style: {},
                    type: "",
                    btnClick: this.createQrCode,
                    text: this.$t('crm.createQrCode')
                },
                [
                    {
                        style: {},
                        type: "",
                        btnClick: this.isExport,
                        text: this.$t('integralflow_4'),
                        value: "1",
                        parentName: this.$t('integralflow_5')
                    },
                    {
                        style: {},
                        type: "",
                        btnClick: this.isExport,
                        text: this.$t('integralflow_6'),
                        value: "2",
                        parentName: this.$t('integralflow_5')
                    }
                ]
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
            tableName: "二维码招生列表",
            defaultShowCol: null,
            dataTotal: 0,
            sortObj: {},
            tableColumnArray: [
                // { title: "创建时间", key: "createDate" ,minWidth:50},
                // { title: "二维码编号", key: "qrCode" ,minWidth:60},
                // { title: "二维码创建人", key: "createByName" ,minWidth:50},
                // { title: "登记人", key: "ownerName" ,minWidth:40},
                // { title: "登记机构", key: "ownerOfficeName" ,minWidth:50},
                // { title: "Leads归属校区", key: "belongOfficeName" ,minWidth:50},
                // { title: "渠道来源", key: "source" ,minWidth:50},
                // { title: "二维码状态", key: "codeEnable" ,minWidth:50},
                {
                    // title: "客户标签",
                    key: "tags",
                    minWidth: 100,
                    render: (h, params) => {
                        if (params.row.tags) {
                            let arr = params.row.tags.split(" ");
                            return h(
                                "div",
                                arr.map(function(item, index) {
                                    if (index < 3) {
                                        return h(
                                            "span",
                                            {
                                                style: {
                                                    display: "inline-block",
                                                    background: "#EBECF0",
                                                    borderRadius: "4px",
                                                    height: "24px",
                                                    "line-height": "24px",
                                                    padding: "0 12px",
                                                    marginRight: "8px",
                                                    marginTop: "5px",
                                                    marginBottom: "5px",
                                                    color: "#495060"
                                                }
                                            },
                                            item ? item : "-"
                                        );
                                    } else if (index == 3) {
                                        return h(labelMore, {
                                            ref: "labelMoreRef",
                                            props: {
                                                labelMoreArr: arr.slice(3)
                                            }
                                        });
                                    }
                                })
                            );
                        }
                    }
                },
                {
                    // title: "促销员",
                    key: "channelNum",
                    minWidth: 40,
                    render: (h, params) => {
                        return params.row.channelNum > 0
                            ? h(channelNum, {
                                  props: {
                                      channelNum: params.row.channelNum,
                                      qrcodeId: params.row.id
                                  },
                                  on: {
                                      click: () => {}
                                  }
                              })
                            : h("div", {}, params.row.channelNum);
                    }
                },
                {
                    // title: "访问次数",
                    sortable: true,
                    key: "visits",
                    width: 80
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
                        return h(tableDropdown, {
                            style: {
                                "margin-left": "10px"
                            },
                            props: {
                                buttonList: [
                                    {
                                        label: "有效",
                                        key: "1"
                                    },
                                    {
                                        label: "无效",
                                        key: "0"
                                    }
                                ],
                                actionName: params.row.codeEnable
                            },
                            on: {
                                dropFn: key => {
                                    this.validFn(params.row.id, key);
                                }
                            }
                        });
                    }
                },
                {
                    title: "操作",
                    key: "doAction",
                    minWidth: 60,
                    render: (h, params) => {
                        return h("div", [
                            this.myButtonPrem.indexOf("detail") >= 0 ? h(
                                "a",
                                {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    },
                                    style: {},
                                    on: {
                                        click: (e) => {
                                            e.stopPropagation()
                                            this.$router.push({
                                                name:
                                                    "crm.QrCodeEnrollmentDetail",
                                                query: {
                                                    qrCode: params.row.qrCode
                                                }
                                            });
                                        }
                                    }
                                },
                                "详情"
                            ) : ''
                        ]);
                    }
                }
            ],
            tableData: [],
            searchObj: {}
        };
    },
    computed: {
        ...mapState(["app", "buttonPerm","calendarConfig"]),
        myButtonPrem() {
            return this.buttonPerm["crm.QrCodeEnrollment"] || [];
        }
    },
    components: {
        bigTable,
        exportModal,
        vSearchCollapse,
        tableDropdown,
        channelNum,
        labelMore
    },
    mounted() {
        this.getShowTitle();
        this.getInitData();
        // this.batchListData();
        this.batchListDataFn();

    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        filterChange(val){
            console.log(val,'filterChange~~~~~~~~~~~')
        },
        onRowClick(row, index){
            if(this.myButtonPrem.indexOf("detail") >= 0){
                this.$router.push({
                    name:
                        "crm.QrCodeEnrollmentDetail",
                    query: {
                        qrCode: row.qrCode
                    }
                });
            }
        },
        resetDefaultCol(){
            this.updateLoadingStatus({ isLoading: true });
            crmQrcode.clearShowField({
                pageIdentifier: "crmQrcode",
            })
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.getShowTitle(true);
                } else {
                    this.updateLoadingStatus({ isLoading: false });
                }
            })
            .catch(errors.call(this))
            .finally(() => {

            });
        },
        setOptTime(flag){
			if(flag){
				this.optTime = []
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
             sysDict.getDictStringTree({type:'crm_customer_source'}).then(valid.call(this))
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
                this.$Message.error(this.$t('scoretemplate_scoretemplate_572'));
                return;
            }
            let searchObj = this.searchObj;
            delete searchObj.pageNo
            delete searchObj.pageSize
            if (val == "2") {
                //如果是导出所选，需要在这里传递所选对象、或者对象ID，这里根据需要自行处理，并作为搜索参数的一部分传递到导出组件
                searchObj = {
                    ids: this.selection.map(item => {
                        return item.id;
                    })
                };
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
                                // this.$set(
                                //     this.findObj,
                                //     "ownerOfficeId",
                                //     this.app.currOfficeId == "all"
                                //         ? ""
                                //         : this.app.currOfficeId
                                // );
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
                                this.btnList = [
                                    [
                                        {
                                            style: {},
                                            type: "",
                                            btnClick: this.isExport,
                                            text: this.$t('integralflow_4'),
                                            value: "1",
                                            parentName: this.$t('integralflow_5')
                                        },
                                        {
                                            style: {},
                                            type: "",
                                            btnClick: this.isExport,
                                            text: this.$t('integralflow_6'),
                                            value: "2",
                                            parentName: this.$t('integralflow_5')
                                        }
                                    ]
                                ];
                            }
                            this.optTime = defaultDatePickerValue()
				            this.options3 = DatePickerOpt(this,'DatePicker',Number(this.calendarConfig.maxMonthInterval))
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
            this.selection = []
            this.updateLoadingStatus({ isLoading: true });
            let param = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                orderByType: this.orderByType,
                orderByStatus: this.orderByStatus
            };
            this.findObj.startTime = this.optTime[0] ? this.optTime[0].format('yyyy-MM-dd 00:00:00') : "";
            this.findObj.endTime = this.optTime[1] ? this.optTime[1].format('yyyy-MM-dd 23:59:59') : "";
            param = Object.assign({}, param, this.findObj);
            // param.ownerOfficeId = this.findObj.ownerOfficeId;
            this.searchObj = param; //这里需要给searchObj 赋值，导出数据的时候需要用到
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
        getShowTitle(closeLoad) {
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
                    if(closeLoad){
                        this.updateLoadingStatus({ isLoading: false });
                    }
                })
                .catch(errors.call(this));
        },
        resetSearch() {
            this.$refs.searchCollapseRef.resetTrueFn();
            this.$refs.myTable.resetFilter()
            this.optTime = defaultDatePickerValue(this.calendarConfig.maxMonthInterval);
            for (let item in this.findObj) {
                if (item == "tags") {
                    this.findObj[item] = [];
                }
                else if (item == "querySources") {
                    this.findObj[item] = [];
                }
                 else {
                    this.findObj[item] = "";
                }
            }
            this.pageNo = 1;
            // this.$set(
            //     this.findObj,
            //     "ownerOfficeId",
            //     this.app.currOfficeId == "all" ? "" : this.app.currOfficeId
            // );
            this.getListData();
        }
    },
    watch: {
        "app.currOfficeId": function(val, oldVal) {
            if (oldVal && this.$route.name == "crm.QrCodeEnrollment") {
                // this.$set(
                //     this.findObj,
                //     "ownerOfficeId",
                //     val == "all" ? "" : val
                // );
                // this.getListData();
            }
        }
    }
};
</script>
