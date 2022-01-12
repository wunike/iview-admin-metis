<style lang="less">
.renewalWarningStyle {
    .borderStyle {
        display: inline-block;
        position: relative;
        &:after {
            content: "";
            display: block;
            position: absolute;
            left: 140px;
            top: 15px;
            margin: 0 1px;
            width: 10px;
            height: 2px;
            background: #e6e7eb;
        }
    }
    .table-name-slot-style {
        padding:12px 16px 10px;font-size:14px;background: #FFF;
        // margin-left: 10px;
        font-family: PingFangSC-Regular, PingFang SC;
        margin-bottom: -7px;
        font-size: 12px;
        font-weight: 600;
        > span {
            font-weight: normal;
            font-size: 16px;
            color: #44bcb7;
        }
    }
    .tabAndBtnList {
        position: relative;
        .tabs-class {
            margin-top: 10px;
            padding-left: 16px;
            background: #fff;
            padding-top: 24px;
            .ivu-tabs-bar {
                margin-bottom: 0px;
            }
        }
        .btnListStyle {
            position: absolute;
            top: 20px;
            right: 0px;
            > button {
                margin-right: 16px;
            }
        }
    }
    .mytable {
        width: 100%;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        padding: 0 16px;
    }
}
</style>
<template>
    <div class="renewalWarningStyle">
        <v-search-collapse
            ref="searchCollapseRef"
            @search="searchList"
            @reset="resetSearch"
            @changeDivHeight="changeDivHeight"
        >
            <Select
                v-model="findObj.ownerOfficeId"
                clearable
                :placeholder="$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1612')"
                style="width:224px;"
                @on-change="ownerOfficeChange"
            >
                <Option
                    v-for="item in officeIdList"
                    :value="item.id"
                    :key="item.value"
                >{{ item.code }}{{ item.name }}</Option>
            </Select>
            <Select :placeholder="$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1613')" v-model="findObj.ownerId" @on-change="ownerIdChange">
                <Option v-for="item in ownerIdList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
            <Select :placeholder="$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1614')" v-model="findObj.ownerId" @on-change="ownerIdChange">
                <Option v-for="item in ownerIdList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
            <Select :placeholder="$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1615')" v-model="findObj.ownerId" @on-change="ownerIdChange">
                <Option v-for="item in ownerIdList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
            <Select :placeholder="$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1615')" v-model="findObj.ownerId" @on-change="ownerIdChange">
                <Option v-for="item in ownerIdList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
            <Select v-model="findObj.status" clearable :placeholder="$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1616')" style="width:140px;">
                <Option
                    v-for="item in statusList"
                    :value="item.value"
                    :key="item.value"
                >{{ item.label }}</Option>
            </Select>
            <Select v-model="findObj.status" clearable :placeholder="$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1617')" style="width:140px;">
                <Option
                    v-for="item in statusList"
                    :value="item.value"
                    :key="item.value"
                >{{ item.label }}</Option>
            </Select>
            <Select :placeholder="$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1618')" v-model="findObj.ownerId" @on-change="ownerIdChange">
                <Option v-for="item in ownerIdList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
            <Input v-model="findObj.qrCode" :placeholder="$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1619')" style="width:140px;" />
            <div class="borderStyle" style="width: 292px;">
                <InputNumber
                    :active-change="true"
                    style="margin-right: 12px;"
                    @on-change="restLeft"
                    v-model="findObj.traceCountStart"
                    :min="0"
                    :placeholder="$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1620')"
                ></InputNumber>
                <InputNumber
                    :active-change="true"
                    @on-change="restRight"
                    v-model="findObj.traceCountEnd"
                    :min="0"
                    :placeholder="$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1620')"
                ></InputNumber>
            </div>
            <div class="borderStyle" style="width: 292px;">
                <InputNumber
                    :active-change="true"
                    style="margin-right: 12px;"
                    @on-change="restLeft"
                    v-model="findObj.traceCountStart"
                    :min="0"
                    :placeholder="$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1621')"
                ></InputNumber>
                <InputNumber
                    :active-change="true"
                    @on-change="restRight"
                    v-model="findObj.traceCountEnd"
                    :min="0"
                    :placeholder="$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1621')"
                ></InputNumber>
            </div>
            <div class="borderStyle" style="width: 292px;">
                <InputNumber
                    :active-change="true"
                    style="margin-right: 12px;"
                    @on-change="restLeft"
                    v-model="findObj.traceCountStart"
                    :min="0"
                    :placeholder="$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1622')"
                ></InputNumber>
                <InputNumber
                    :active-change="true"
                    @on-change="restRight"
                    v-model="findObj.traceCountEnd"
                    :min="0"
                    :placeholder="$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1622')"
                ></InputNumber>
            </div>
            <div class="borderStyle" style="width: 292px;">
                <InputNumber
                    :active-change="true"
                    style="margin-right: 12px;"
                    @on-change="restLeft"
                    v-model="findObj.traceCountStart"
                    :min="0"
                    :placeholder="$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1623')"
                ></InputNumber>
                <InputNumber
                    :active-change="true"
                    @on-change="restRight"
                    v-model="findObj.traceCountEnd"
                    :min="0"
                    :placeholder="$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1623')"
                ></InputNumber>
            </div>
        </v-search-collapse>
        <!-- <big-table
            v-if="defaultShowCol"
            class="mytable"
            :tableName="tableName"
            :tableData="tableData"
            :tableColumnArray="tableColumnArray"
            :defaultShowCol="defaultShowCol"
            :canSelection="false"
            :dataTotal="dataTotal"
            :btnList="btnList"
            :canChangeHeight="true"
            :isShowSelectTableColumn="true"
            :updateShowTitleMethod="updateShowTitle"
            :updateShowTitleKey="updateShowTitleKey"
            :tableHeightOut="tableHeightOut"
            @selectionChange="selectionChange"
            @pageChange="pageChange"
            @sortChange="sortChange"
        ></big-table>
        <export-modal ref="exportModal" :exportMethod="exportMethod"></export-modal>-->
        <div class="tabAndBtnList">
            <Tabs
                value="name1"
                :animated="false"
                class="tabs-class"
                @on-click="tabChange"
                v-model="tabValName"
            >
                <TabPane :label="$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1624')" name="name1"></TabPane>
                <TabPane :label="$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1625')" name="name2"></TabPane>
            </Tabs>
            <div class="btnListStyle" v-if="tabValName=='name1'">
                <Button type="primary">{{$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1626')}}</Button>
                <Button type="primary">{{$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1627')}}</Button>
                <Button type="primary">{{$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1628')}}</Button>
                <Button type="primary">{{$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1629')}}</Button>
                <Button type="primary">{{$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1630')}}</Button>
            </div>
            <div class="btnListStyle" v-else-if="tabValName=='name2'">
                <Button type="primary">{{$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1631')}}</Button>
                <Button type="primary">{{$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1630')}}</Button>
            </div>
        </div>
       <div slot="tableNameSlot" class="table-name-slot-style">{{$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1632')}}<span>18</span>{{$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1633')}}<span>27</span>{{$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1634')}}<span>1</span>{{$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1635')}}</div>
        <Table
            class="mytable"
            highlight-row
            ref="selection"
            :columns="columns14"
            :data="data5"
            border
            :span-method="handleSpan"
            @on-selection-change="selectionChange"
        ></Table>
    </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
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
import {
    waitUntil,
    DatePickerOpt,
    defaultDatePickerValue
} from "@public/libs/util";
// import channelNum from "./components/channelNum";
// import labelMore from "./components/labelMore";
export default {
    name: 'crm.renewalWarning',
    data() {
        return {
            tabValName: "name1",
            columns14: [
                {
                    type: "selection",
                    width: 60,
                    align: "center",
                    // width: null,
                    resizable: true,
                    // fixed:'left'
                },
                {
                    title: this.$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1636'),
                    key: "address1",
                    width: null,
                    resizable: true
                },
                {
                    title: this.$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1637'),
                    key: "address2",
                    width: null,
                    resizable: true
                },
                {
                    title: this.$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1616'),
                    key: "address3",
                    width: null,
                    resizable: true
                },
                {
                    title: this.$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1617'),
                    key: "address4",
                    width: null,
                    resizable: true
                },
                {
                    title: this.$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1622'),
                    width: null,
                    key: "address5",
                    resizable: true
                },
                {
                    title: this.$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1638'),
                    key: "address6",
                    width: null,
                    resizable: true
                },
                {
                    title: this.$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1639'),
                    key: "address7",
                    width: null,
                    resizable: true
                },
                {
                    title: this.$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1640'),
                    key: "address8",
                    width: null,
                    resizable: true
                },
                {
                    title: this.$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1619'),
                    key: "address9",
                    width: null,
                    resizable: true
                },
                {
                    title: this.$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1641'),
                    key: "address10",
                    width: null,
                    resizable: true
                },
                {
                    title: this.$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1642'),
                    key: "address11",
                    width: null,
                    resizable: true
                },
                {
                    title: this.$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1643'),
                    key: "address12",
                    width: null,
                    resizable: true
                },
                {
                    title: this.$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1644'),
                    key: "address13",
                    width: null,
                    resizable: true
                },
                {
                    title: this.$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1623'),
                    key: "address14",
                    width: null,
                    resizable: true
                },
                {
                    title: this.$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1645'),
                    key: "action",
                    width: 150,
                    //    fixed:'right',
                    align: "center",
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "a",
                                {
                                    // props: {
                                    //     type: "primary",
                                    //     size: "small"
                                    // },
                                    style: {
                                        marginRight: "16px"
                                    },
                                    on: {
                                        click: () => {
                                            // this.show(params.index);
                                        }
                                    }
                                },
                                this.$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1646')
                            ),
                            h(
                                "a",
                                {
                                    // props: {
                                    //     type: "error",
                                    //     size: "small"
                                    // },
                                    on: {
                                        click: () => {
                                            // this.remove(params.index);
                                            this.$Modal.confirm({
                                                title: this.$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1627'),
                                                content:
                                                    this.$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1647'),
                                                onOk: () => {
                                                    // this.remove(params.row.id);
                                                },
                                                onCancel: () => {}
                                            });
                                        }
                                    }
                                },
                                this.$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1627')
                            )
                        ]);
                    }
                }
            ],
            data5: [],
            options3: null,
            tableHeightOut: 72, //324,
            orderByStatus: 2,
            orderByType: "",
            ownerIdList: [],
            optTime: [],
            crm_customer_source: [],
            officeIdList: [],
            loadingCreateById: false,
            createByIdList: [],
            statusList: [
                {
                    value: "0",
                    label: this.$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1648')
                },
                {
                    value: "1",
                    label: this.$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1649')
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
                    text: this.$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1650')
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
                tags: [],
                traceCountStart: "",
                traceCountEnd: ""
            },
            pageNo: 1,
            pageSize: this.$store.state.app.pageSizeGlobal,
            /*搜索相关结束*/
            tableName: "二维码招生列表",
            defaultShowCol: null,
            dataTotal: 0,
            sortObj: {}
        };
    },
    computed: {
        ...mapState(["app", "buttonPerm", "calendarConfig"]),
        myButtonPrem() {
            return this.buttonPerm["crm.QrCodeEnrollment"] || [];
        }
    },
    components: {
        // exportModal,
        vSearchCollapse
    },
    mounted() {
        // this.getShowTitle();
        this.getInitData();
        for (let i = 0; i < 10; i++) {
            this.data5.push({
                id: i,
                num: 0,
                havePosition: true,
                address1: "郭德超1" + Math.random().toFixed(2) * 1000,
                address2: "15011164583" + Math.random().toFixed(2) * 1000,
                address3: "LWP" + Math.random().toFixed(2) * 1000,
                address4: "未关注" + Math.random().toFixed(2) * 1000,
                address5: "1" + Math.random().toFixed(2) * 1000,
                address6: "肖恩巴蒂尔" + Math.random().toFixed(2) * 1000,
                address7: "深圳校区" + Math.random().toFixed(2) * 1000,
                address8: "GIR-50" + Math.random().toFixed(2) * 1000,
                address9: "2019GIR" + Math.random().toFixed(2) * 1000,
                address10: "Giorgio" + Math.random().toFixed(2) * 1000,
                address11: "2019-10-08" + Math.random().toFixed(2) * 1000,
                address12: "33课时/4125元" + Math.random().toFixed(2) * 1000,
                address13: "19课时/2375元" + Math.random().toFixed(2) * 1000,
                address14: "1" + Math.random().toFixed(2) * 1000
            });
        }
        //判断多少课程数用num属性 然后对一样的课程加标识 havePosition=false不显示这个内容 默认是true
        this.data5[3].num = 3;
        this.data5[4].havePosition = false;
        this.data5[5].havePosition = false;
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        tabChange(name) {},
        handleSpan({ row, column, rowIndex, columnIndex }) {
            if (rowIndex === row._index && columnIndex <= 7 && row.num > 0) {
                return {
                    rowspan: row.num,
                    colspan: 1
                };
            } else if (
                rowIndex === row._index &&
                columnIndex <= 7 &&
                !row.havePosition
            ) {
                return {
                    rowspan: 0,
                    colspan: 0
                };
            }
        },
        restLeft(num) {
            if (num > this.findObj.traceCountEnd) {
                this.findObj.traceCountEnd = num;
                if (this.findObj.traceCountEnd <= 0) {
                    this.findObj.traceCountEnd = 0;
                }
            }
        },
        restRight(num) {
            if (this.findObj.traceCountStart > num) {
                this.findObj.traceCountStart = num;
                if (this.findObj.traceCountStart <= 0) {
                    this.findObj.traceCountStart = 0;
                }
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
        //可选方法，如果是多选的话必须有
        selectionChange(selection) {
            // debugger
            console.log("selection:" + JSON.stringify(selection));
            this.selection = selection;
        },
        isExport(val) {
            //这里val的值。是根据设置下拉类型button设定的值来匹配判断
            if (val == "2" && !this.selection.length) {
                this.$Message.error(this.$t('scoretemplate_scoretemplate_572'));
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
            this.optTime = defaultDatePickerValue(
                
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
            if (oldVal && this.$route.name == "crm.renewalWarning") {
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
