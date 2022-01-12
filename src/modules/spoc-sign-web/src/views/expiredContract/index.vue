<style lang="less">
.expired-contract-container {
    .mytable {
        margin-top: 10px;
        width: 100%;
        border-radius: 4px;
        padding: 0 16px;
        background: #fff;
    }
    .borderStyle {
        position: relative;
        display: inline-block;
        &:after {
            content: "";
            display: block;
            position: absolute;
            left: 143px;
            top: 15px;
            width: 12px;
            height: 2px;
            background: #e6e7eb;
        }
    }
}
</style>

<template>
    <div class="expired-contract-container">
        <v-search-collapse @search="SearchList" @reset="resetSearch" class="searchCollapse" @changeDivHeight="changeDivHeight">
            <DatePicker
                v-model="expiredConfirmTime"
                type="daterange"
                separator=" ~ "
                @on-change="expiredConfirmTimeChange"
                :placeholder="$t('modules_spoc_sign_web_src_views_expiredcontract_index_6548')"
                style="width: 224px;margin-right:12px;"
                ref="DatePicker"
                split-panels
                :options="options"
                @on-open-change="setOptTime"
            ></DatePicker>
            <DatePicker
                v-model="expiredDate"
                type="daterange"
                separator=" ~ "
                @on-change="expiredDateChange"
                :placeholder="$t('modules_spoc_sign_web_src_views_expiredcontract_index_6549')"
                style="width: 224px;margin-right:12px;"
                ref="DatePicker1"
                split-panels
                :options="options1"
                @on-open-change="setOptTime1"
            ></DatePicker>
            <Select
                :placeholder="$t('messagemanagement_index_352')"
                v-model="findObj.officeId"
                clearable
                style="width:224px;"
            >
                <Option v-for="item in officeIdList" :value="item.id" :key="item.id">{{ item.code }}{{ item.name }}</Option>
            </Select>
            <Select
                v-model="findObj.studentId"
                :placeholder="$t('memberlist_memberlist_257')"
                style="width:224px;"
                clearable
                filterable="true"
                remote
                :loading="loadingStu"
                :remote-method="remoteStuName0"
            >
                <Option
                    v-for="item in studentNameList0"
                    :value="item.id"
                    :key="item.id"
                >{{ item.name }}</Option>
            </Select>
            <Input v-model="findObj.courseName" :placeholder="$t('core.coursePack')" style="width:140px;"></Input>
            <Select v-model="findObj.courseType" :placeholder="$t('modules_spoc_sign_web_src_views_expiredcontract_index_6553')" style="width:140px;" clearable>
                <Option
                    v-for="item in jw_course_typeList"
                    :value="item.value"
                    :key="item.value"
                >{{ item.label }}</Option>
            </Select>
            <Select
                :placeholder="$t('modules_spoc_sign_web_src_views_expiredcontract_index_6554')"
                v-model="findObj.isExpiredConfirm"
                clearable
                style="width:140px;margin-right:12px;"
            >
                <Option
                    v-for="item in isExpiredConfirmList"
                    :value="item.value"
                    :key="item.value"
                >{{ item.label }}</Option>
            </Select>
            <Input
                v-model="findObj.ctNo"
                :placeholder="$t('modules_spoc_sign_web_src_views_approval_approvalnew_5071')"
                style="width: 140px;margin-right:12px;"
            />
            <div class="borderStyle">
                <InputNumber
                    v-model="findObj.startLeftCourseHour"
                    :min="0"
                    :placeholder="$t('modules_spoc_sign_web_src_views_expiredcontract_index_6556')"
                    style="margin-right: 20px;"
                />
                <InputNumber v-model="findObj.endLeftCourseHour" :min="0" :placeholder="$t('modules_spoc_sign_web_src_views_expiredcontract_index_6556')" />
            </div>
            <div class="borderStyle">
                <InputNumber
                    v-model="findObj.startLeftCoursePrice"
                    :min="0"
                    :placeholder="$t('modules_spoc_sign_web_src_views_expiredcontract_index_6557')"
                    style="margin-right: 20px;"
                />
                <InputNumber v-model="findObj.endLeftCoursePrice" :min="0" :placeholder="$t('modules_spoc_sign_web_src_views_expiredcontract_index_6557')" />
            </div>
        </v-search-collapse>
        <big-table
            v-if="defaultShowCol"
            :tableName="$t('modules_spoc_sign_web_src_views_expiredcontract_index_6558')"
            class="mytable"
            :tableData="tableData"
            :tableColumnArray="tableColumnArray"
            :defaultShowCol="defaultShowCol"
            :btnList="btnList"
            :canSelection="true"
            :tableHeightOut="tableHeightOut"
            :updateShowTitleMethod="updateShowTitle"
            updateShowTitleKey="updateShowTitleKey,"
            :dataTotal="dataTotal"
            @resetDefault="resetDefaultCol"
            @selectionChange="selectionChange"
            @sortChange="sortChange"
            @pageChange="pageChange"
        ></big-table>
        <export-modal ref="exportModal"></export-modal>
        <htConfirmApplyDetail
            ref="htConfirmApplyDetailRef"
            @htConfirmApplyConfirm="htConfirmApplyConfirm"
        ></htConfirmApplyDetail>
        <tableDetails :detailsTitle="$t('modules_spoc_jw_web_src_views_approval_approvalnew_2249')" ref="tableDetailsRef"></tableDetails>
    </div>
</template>

<script>
import vSearchCollapse from "@public/modules/vSearchCollapse";
import bigTable from "@public/modules/bigTable";
import exportModal from "@public/modules/exportModal.vue";
import valid, {
    errors,
    sys,
    htConfirmApply,
    sysUser,
    sysDict,
    common
} from "../../libs/request";
import tableDetials from "../../modules/tableDetails.vue";
import { waitUntil, DatePickerOpt, defaultDatePickerValue } from "@public/libs/util";
import { mapMutations, mapState } from "vuex";
import htConfirmApplyDetail from "./components/htConfirmApplyDetail.vue";
export default {
    name: 'sign.expiredContract',
    props: {},
    computed: {
        ...mapState(["app", 'buttonPerm', "calendarConfig"]),
        myButtonPrem() {
            if (this.buttonPerm && (JSON.stringify(this.buttonPerm) != "{}")) {
                console.log(this.buttonPerm['sign.expiredContract'])
                return this.buttonPerm['sign.expiredContract'] || [];
            } else {
                return false;
            }
        },
        btnList() {
            return [
                [
                    {
                        hidden: this.myButtonPrem && this.myButtonPrem.indexOf('export') != -1 ? false : true,
                        style: {},
                        type: "",
                        btnClick: this.isExport,
                        text: this.$t('integralflow_4'),
                        value: "1",
                        parentName: this.$t('integralflow_5')
                    },
                    {
                        hidden: this.myButtonPrem && this.myButtonPrem.indexOf('export') != -1 ? false : true,
                        style: {},
                        type: "",
                        btnClick: this.isExport,
                        text: this.$t('integralflow_6'),
                        value: "2",
                        parentName: this.$t('integralflow_5')
                    }
                ]
            ]
        }
    },
    watch: {
        "app.currOfficeId": function(val, oldVal) {
            if (oldVal && this.$route.name == "sign.expiredContract") {
                if (this.app.currOfficeId=='all') {
                    this.$set(
                        this.findObj,
                        "officeId",
                        ''
                    );
                }else{
                    this.$set(
                        this.findObj,
                        "officeId",
                        this.app.currOfficeId
                    );
                }
                this.getListData();
            }
        }
    },
    data() {
        return {
            // orderByStatus: 1,
            // orderByType: "",
            searchObj: {},
            options: null,
            options1: null,
            tableHeightOut: 72, //324,
            sortObj: {},
            loadingStu: false,
            studentNameList0: [],
            expiredConfirmTime: [],
            expiredDate: [],
            isExpiredConfirmList: [
                {
                    value: "0",
                    label: this.$t('modules_spoc_sign_web_src_views_expiredcontract_components_expiredcontrtactpop_6515')
                },
                {
                    value: "1",
                    label: this.$t('modules_spoc_sign_web_src_views_expiredcontract_index_6564')
                }
            ],
            defaultShowCol: null,
            tableData: [],
            updateShowTitle: htConfirmApply.updateShowTitle,
            updateShowTitleKey: "htConfirmApply",
            exportMethod: htConfirmApply.export, //导出用到的方法对象
            dataTotal: 0,
            pageNo: 1,
            pageSize: this.$store.state.app.pageSizeGlobal,
            selection: [],
            findObj: {
                studentId: "",
                courseName: "",
                courseType: "",
                isExpiredConfirm: "",
                officeId: "",
                ctNo: "",
                startExpiredConfirmTime: "",
                endExpiredConfirmTime: "",
                startLeftCourseHour: "",
                endLeftCourseHour: "",
                startLeftCoursePrice: "",
                endLeftCoursePrice: "",
                startExpiredDate: "",
                endExpiredDate: ""
            },
            typeList: [
                {
                    value: "1",
                    label: "1"
                },
                {
                    value: "2",
                    label: "2"
                }
            ],
            tableColumnArray: [
                {
                    // title: "确认状态",
                    key: "isExpiredConfirm",
                    render: (h, params) => {
                        //  let text="";
                        let color = "";
                        // if (params.row.isExpiredConfirm == this.$t('modules_spoc_sign_web_src_views_expiredcontract_components_expiredcontrtactpop_6515')) {
                        if (params.row.isExpiredConfirm == '未确认') {
                            //    text='未确认';
                            color = "#F5222D";
                        // } else if (params.row.isExpiredConfirm == this.$t('modules_spoc_sign_web_src_views_expiredcontract_index_6564')) {
                        } else if (params.row.isExpiredConfirm == '已确认') {
                            //    text='已确认';
                            color = "#52C41A";
                        }
                        //    return h("div", {},text);
                        return h("div", [
                            h("span", [
                                h("span", {
                                    style: {
                                        width: "4px",
                                        height: "4px",
                                        background: color,
                                        display: "inline-block",
                                        marginRight: "8px",
                                        borderRadius: "50%"
                                    }
                                }),
                                params.row.isExpiredConfirm
                            ])
                        ]);
                    }
                },
                {
                    // title: "学员姓名",
                    key: "studentName",
                    tooltip: true,
                    // render: (h, params) => {
                    //     return h("div", [
                    //         h(
                    //             "a",
                    //             {
                    //                 style: {
                    //                     color: this.ctNo ? "#000" : ""
                    //                 }
                    //             },
                    //             params.row.studentName
                    //         )
                    //     ]);
                    // }
                },
                {
                    // title: "剩余请假次数",
                    key: "leftLeaveNum",
                    tooltip: true,
                    sortable: 'custom'

                },
                {
                    // title: "剩余课时",
                    key: "leftCourseHour",
                    tooltip: true,
                    sortable: 'custom'
                },
                {
                    // title: "剩余金额",
                    key: "leftCoursePrice",
                    tooltip: true,
                    sortable: 'custom'
                },
                {
                    // title: "过期日期",
                    key: "expiredDate",
                    tooltip: true,
                    sortable: 'custom'
                },
                {
                    // title: "确认收入时间",
                    key: "expiredConfirmTime",
                    tooltip: true,
                    sortable: 'custom'
                },
                {
                    // title: "课程有效期(个月)",
                    key: "validDate",
                    tooltip: true,
                    sortable: 'custom',
                    width:150,
                    render: (h, params) => {
                        let a =
                            Math.floor(params.row.validDate / 30) > 0
                                ? Math.floor(params.row.validDate / 30) + this.$t('message_socket_302')
                                : "";
                        let b =
                            params.row.validDate % 30 > 0
                                ? (params.row.validDate % 30) + this.$t('message_socket_304')
                                : "";
                        return h("div", [
                            h(
                                "a",
                                {
                                    style: {
                                        color: this.ctNo ? "#000" : ""
                                    }
                                },
                                a + b
                            )
                        ]);
                    }
                },
                {
                    // title: "延期次数",
                    key: "validApplyNum",
                    tooltip: true,
                    sortable: 'custom'
                },
                {
                    title: this.$t('classlist_compontents_detailinfo_45'),
                    key: "doAction",
                    // width: 100,
                    width:250,
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "a",
                                {
                                    props: {
                                        type: "text",
                                        size: "small",
                                    },
                                    style: {
                                        marginRight:'8px',
                                        // display: params.row.isExpiredConfirm == this.$t('modules_spoc_sign_web_src_views_expiredcontract_index_6564')
                                        display: params.row.isExpiredConfirm == '已确认'
                                            ? '' : 'none' ,
                                    },
                                    on: {
                                        click: () => {
                                            this.delete(params.row.id);
                                        }
                                    }
                                },
                                this.$t('classlist_compontents_detailinfo_46')
                            ),
                            h(
                                "a",
                                {
                                    props: {
                                        type: "text",
                                        size: "small",
                                    },
                                    style: {
                                         marginRight:'8px',
                                        display: this.myButtonPrem && this.myButtonPrem.indexOf('details') != -1 ? '' : 'none' ,
                                    },
                                    on: {
                                        click: () => {
                                            this.$refs.htConfirmApplyDetailRef.showTips(
                                                params.row.id,
                                                "detail"
                                            );
                                        }
                                    }
                                },
                                this.$t('modules_spoc_sign_web_src_views_expiredcontract_index_6569')
                            ),
                            h(
                                "a",
                                {
                                    props: {
                                        type: "text",
                                        size: "small",
                                    },
                                    style: {
                                        marginRight:'8px',
                                        color: this.ctNo ? "#000" : "",
                                        display: this.myButtonPrem && this.myButtonPrem.indexOf('details') != -1 ? '' : 'none' ,
                                    },
                                    on: {
                                        click: () => {
                                             if (!this.ctNo) {
                                                this.$router.push({
                                                name:'crm.customer360',
                                                query:{
                                                        id:params.row.studentId
                                                    }
                                                })
                                            }
                                        }
                                    }
                                },
                                this.$t('jw.studentCourseDetail')
                            ),
                            h(
                                "a",
                                {
                                    props: {
                                        type: "text",
                                        size: "small",
                                    },
                                    style: {
                                        marginRight:'8px',
                                        color: this.ctNo ? "#000" : "",
                                        display: this.myButtonPrem && this.myButtonPrem.indexOf('details') != -1 ? '' : 'none' ,
                                    },
                                    on: {
                                        click: () => {
                                             if (!this.ctNo) {
                                                this.$router.push({
                                                    name: "sign.pactDetails",
                                                    query: {
                                                        id: params.row.ctId,
                                                        ctNo: params.row.ctNo
                                                    }
                                                });
                                            }
                                        }
                                    }
                                },
                                this.$t('sign.pactDetails')
                            ),
                            // params.row.isExpiredConfirm == this.$t('modules_spoc_sign_web_src_views_expiredcontract_components_expiredcontrtactpop_6515')
                            params.row.isExpiredConfirm == '未确认'
                                ? h(
                                      "a",
                                      {
                                          props: {
                                              type: "text",
                                              size: "small"
                                          },
                                          style: {
                                              marginRight:'8px',
                                              display: this.myButtonPrem && this.myButtonPrem.indexOf('edit') != -1 ? '' : 'none' ,
                                          },
                                          on: {
                                              click: () => {
                                                  this.$Modal.confirm({
                                                      title: this.$t('modules_spoc_sign_web_src_views_expiredcontract_components_htconfirmapplydetail_6530'),
                                                      content: '<span style="color: #F04134;">' + this.$t('modules_spoc_sign_web_src_views_expiredcontract_index_6573') + '</span>' + this.$t('modules_spoc_sign_web_src_views_expiredcontract_index_65731'),
                                                      onOk: () => {
                                                          this.$refs.htConfirmApplyDetailRef.showTips(
                                                              params.row.id,
                                                              "sure"
                                                          );
                                                      },
                                                      okText: this.$t('classroom_clock_85')
                                                      // cancelText: 'Cancel'
                                                  });
                                              }
                                          }
                                      },
                                      this.$t('modules_spoc_sign_web_src_views_expiredcontract_components_expiredcontrtactpop_6529')
                                  )
                                : ""
                        ]);
                    }
                }
            ]
        };
    },
    components: {
        bigTable,
        exportModal,
        vSearchCollapse,
        tableDetials,
        htConfirmApplyDetail
    },
    created() {},
    mounted() {
        this.getShowTitle();
        this.getSchoolList();
        this.statusListMethod();
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        resetDefaultCol(){
            this.updateLoadingStatus({ isLoading: true });
            htConfirmApply.clearShowField({
                pageIdentifier: "htConfirmApply",
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
        delete(id) {
            this.updateLoadingStatus({ isLoading: true });
            htConfirmApply
            .deleteConfirm({id:id})
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.$Message.success(res.data.message);
                    this.getListData();
                }
            })
            .catch(errors.call(this))
            .finally(() => {
                this.updateLoadingStatus({ isLoading: false });
            });
        },
        changeDivHeight(height) {
            this.tableHeightOut = height;
        },
        sortChange(obj) {
            this.sortObj = obj;
            this.getListData();
        },
        htConfirmApplyConfirm(id, confirmCoursePrice,confirmCourseHour) {
            // debugger;
            this.updateLoadingStatus({ isLoading: true });
            let params = {
                id,
                confirmCoursePrice,
                confirmCourseHour
            };
            htConfirmApply
                .confirm(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.$Message.success(res.data.message);
                        this.getListData();
                        this.$refs.htConfirmApplyDetailRef.closeTips();
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        remoteStuName0(query) {
            this.loadingStu = true;
            let params = {
                name: query,
                officeId: this.findObj.officeId
            };
            common
                .listByOfficeIdAndName(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        // debugger
                        this.studentNameList0 = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.loadingStu = false;
                });
        },
        isExport(val) {
            //这里val的值。是根据设置下拉类型button设定的值来匹配判断
            if (val == "2" && !this.selection.length) {
                this.$Message.error(this.$t('scoretemplate_scoretemplate_572'));
                return;
            }
            let searchObj = this.searchObj;
            if (val == "1") {
                delete searchObj.pageNo
                delete searchObj.pageSize
            } else if (val == "2") {
                //如果是导出所选，需要在这里传递所选对象、或者对象ID，这里根据需要自行处理，并作为搜索参数的一部分传递到导出组件
                searchObj = {
                    ids: this.selection.map(item => {
                        return item.id;
                    })
                };
            }
            this.$refs.exportModal.noShowExport(this.exportMethod, searchObj);
        },
        expiredConfirmTimeChange(val) {
            this.findObj.startExpiredConfirmTime = this.expiredConfirmTime[0] ? this.expiredConfirmTime[0].format('yyyy-MM-dd 00:00:00') : '';
            this.findObj.endExpiredConfirmTime = this.expiredConfirmTime[1] ? this.expiredConfirmTime[1].format('yyyy-MM-dd 23:59:59') : '';
        },
        expiredDateChange(val) {
            this.findObj.startExpiredDate = this.expiredDate[0] ? this.expiredDate[0].format('yyyy-MM-dd 00:00:00') : '';
            this.findObj.endExpiredDate = this.expiredDate[1] ? this.expiredDate[1].format('yyyy-MM-dd 23:59:59') : '';
        },
        statusListMethod() {
            // let types = "com_audit_status,jw_course_type"; //课程包分类,适用年级
            let types = "jw_course_type"; //课程包分类
            sysDict
                .batchListData({
                    types
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        // this.statusList = res.data.data.com_audit_status;
                        this.jw_course_typeList = res.data.data.jw_course_type;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        getSchoolList() {
            //校区列表
            sysUser
                .dataScopeFilter()
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.officeIdList = res.data.data;
                        waitUntil(
                            () => {
                                return (this.app.currOfficeId && this.calendarConfig.maxMonthInterval) || false;
                            },
                            () => {
                                if (this.app.currOfficeId=='all') {
                                    this.$set(
                                        this.findObj,
                                        "officeId",
                                        ''
                                    );
                                }else{
                                    this.$set(
                                        this.findObj,
                                        "officeId",
                                        this.app.currOfficeId
                                    );
                                }
								this.expiredDate = []; //defaultDatePickerValue();
								this.expiredConfirmTime = defaultDatePickerValue();
                                this.expiredConfirmTimeChange()
                                this.expiredDateChange()
                                this.options = DatePickerOpt(this,'DatePicker',Number(this.calendarConfig.maxMonthInterval));
								this.options1 = DatePickerOpt(this,'DatePicker1',Number(this.calendarConfig.maxMonthInterval));
                                this.getListData();
                            }
                        );
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    // this.updateLoadingStatus({ isLoading: false });
                });
        },
        resetSearch() {
            this.expiredDate = [];// defaultDatePickerValue();
            this.expiredConfirmTime = defaultDatePickerValue();
            for (let item in this.findObj) {
                this.findObj[item] = "";
            }
            this.expiredConfirmTimeChange()
            this.expiredDateChange()
            this.pageNo = 1;
            if (this.app.currOfficeId=='all') {
                this.$set(
                    this.findObj,
                    "officeId",
                    ''
                );
            }else{
                this.$set(
                    this.findObj,
                    "officeId",
                    this.app.currOfficeId
                );
            }
            this.getListData();
        },
        //获取数据，根据情况修改接口、传参
        getListData() {
            // debugger;
            this.updateLoadingStatus({ isLoading: true });
            let param = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                // orderByType: this.orderByType,
                // orderByStatus: this.orderByStatus
            };
            if (this.sortObj.order != "normal" && this.sortObj.key) {
                param.orderByType = this.sortObj.key;
                param.orderByStatus = this.sortObj.order == "asc" ? "1" : "2";
            }
            param = Object.assign({}, param, this.findObj);
            this.searchObj = param; //这里需要给searchObj 赋值，导出数据的时候需要用到
            htConfirmApply
                .listPage(param)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        // debugger
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
        //可选方法，如果是多选的话必须有
        selectionChange(selection) {
            console.log(selection);
            this.selection = selection;
        },
        //分页方法 如果有分页则为必须方法，修改getCourseList为自己的获取数据方法 这里注意。不再有每页个数改变的方法了
        pageChange(pageNo, pageSize) {
            if (!pageNo) {
                //防止无用重复请求
                return;
            }
            this.pageNo = pageNo;
            this.pageSize = pageSize;
            this.getListData();
        },
        //必须方法，获取默认显示的可选列  接口根据需要自行更换，每个模块的接口是不一致的
        getShowTitle(closeLoad) {
            htConfirmApply
                // .getShowTitle({ pageIdentifier: "htConfirmApply", voName: "HtValidApply"})
                .getShowTitle({ pageIdentifier: "htConfirmApply",lang: this.$i18n.locale, })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.defaultShowCol = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    if(closeLoad){
                        this.updateLoadingStatus({ isLoading: false });
                    }
                });
        },
        SearchList() {
            if (
                Number(this.findObj.startLeftCourseHour) >
                Number(this.findObj.endLeftCourseHour)
            ) {
                this.$Message.error(this.$t('modules_spoc_sign_web_src_views_expiredcontract_index_6578'));
                this.findObj.endLeftCourseHour = "";
                return;
            }
            if (
                Number(this.findObj.startLeftCoursePrice) >
                Number(this.findObj.endLeftCoursePrice)
            ) {
                this.$Message.error(this.$t('modules_spoc_sign_web_src_views_expiredcontract_index_6579'));
                this.findObj.endLeftCoursePrice = "";
                return;
            }
            this.pageNo = 1;
            this.getListData();
        },
        setOptTime(flag){
            if(flag){
                this.expiredConfirmTime=[];
                this.expiredConfirmTimeChange()
            }
        },
        setOptTime1(flag){
            if(flag){
                this.expiredDate=[];
                this.expiredDateChange()
            }
        },
    }
};
</script>
