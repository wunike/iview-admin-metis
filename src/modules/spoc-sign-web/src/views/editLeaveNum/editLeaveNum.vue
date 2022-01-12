<style lang="less">
.mytable {
    width: 100%;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    padding: 0 16px;
    margin-top: 10px;
}
</style>
<template>
    <div>
        <v-search-collapse @search="SearchList" @reset="resetSearch" v-show="!ctNo" @changeDivHeight="changeDivHeight">
            <DatePicker
                v-model="signTime"
                type="daterange"
                @on-change="signTimeChange"
                placement="bottom-start"
                separator=" ~ "
                :placeholder="$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5661')"
                style="width:224px;"
                ref="DatePicker"
                split-panels
                :options="options"
                @on-open-change="setOptTime"
            ></DatePicker>
            <Select
                v-model="findObj.officeId"
                clearable
                :placeholder="$t('messagemanagement_index_344')"
                style="width:224px;"
                @on-change="officeIdChange"
            >
                <Option
                    v-for="item in officeIdList"
                    :value="item.id"
                    :key="item.value"
                >{{ item.code }}{{ item.name }}</Option>
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
            <Input v-model="findObj.courseName" :placeholder="$t('core.coursePack')" style="width:224px;"></Input>
            <!-- <Select v-model="findObj.courseName" :placeholder="$t('core.coursePack')" style="width:224px;" clearable>
                <Option v-for="item in courseNameList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>-->
            <Select v-model="findObj.courseType" :placeholder="$t('views_coursepack_bigtableexample_322')" style="width:224px;" clearable>
                <Option
                    v-for="item in jw_course_typeList"
                    :value="item.value"
                    :key="item.value"
                >{{ item.label }}</Option>
            </Select>
            <Select v-model="findObj.isUsed" :placeholder="$t('modules_spoc_sign_web_src_views_editleavenum_editleavenum_6491')" style="width:224px;" clearable>
                <Option
                    v-for="item in isUsedList"
                    :value="item.value"
                    :key="item.value"
                >{{ item.label }}</Option>
            </Select>
            <Input
                v-model="findObj.ctNo"
                :placeholder="$t('modules_spoc_sign_web_src_views_approval_approvalnew_5071')"
                style="width:140px;"
                @on-change="ctNoChange"
            ></Input>
            <!-- <Input v-model="findObj.signName" :placeholder="$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4476')" style="width:140px;"></Input> -->
            <!-- <Input v-model="findObj.phone" :placeholder="$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1637')" style="width:140px;"></Input> -->
            <Select
                v-model="findObj.signId"
                :placeholder="$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4476')"
                style="width: 140px;margin-right:12px;"
                clearable
                filterable="true"
                remote
                :loading="loadingSignId"
                :remote-method="remoteSignId"
            >
                <Option
                    v-for="item in signIdList"
                    :value="item.value"
                    :key="item.value"
                >{{ item.name }}</Option>
            </Select>
              <div style="display:inline-block;position:relative;">
                <InputNumber
                    v-model="findObj.startLeftNum"
                    :min="0"
                    :placeholder="$t('modules_spoc_jw_web_src_views_checkinelectronic_index_2381')"
                    style="width:140px;"
                ></InputNumber>
                <span style="position: absolute;left: 142px;top: -3px;font-size: 24px;">-</span>
                <InputNumber
                    v-model="findObj.endLeftNum"
                    :min="0"
                    :placeholder="$t('modules_spoc_jw_web_src_views_checkinelectronic_index_2381')"
                    style="width:140px;margin-left:12px"
                ></InputNumber>
            </div>
            <!--

            loadingSignId:false,
            loadingCreateById:false,
            signIdList:[],
            createByIdList:[],
            -->
            <Select
                v-model="findObj.createById"
                :placeholder="$t('modules_spoc_portal_views_workorderm_index_4442')"
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
        </v-search-collapse>
        <big-table
            v-if="defaultShowCol"
            class="mytable"
            :tableName="$t('modules_spoc_sign_web_src_views_editleavenum_editleavenum_6497')"
            :tableData="tableData"
            :tableColumnArray="tableColumnArray"
            :defaultShowCol="defaultShowCol"
            :btnList="btnList"
            :canSelection="true && !ctNo"
            :updateShowTitleMethod="updateShowTitle"
            :updateShowTitleKey="updateShowTitleKey"
            :dataTotal="dataTotal"
            :canChangeHeight="!ctNo"
            :tableHeightOut="tableHeightOut"
            :isShowSelectTableColumn="!ctNo"
            @resetDefault="resetDefaultCol"
            @selectionChange="selectionChange"
            @sortChange="sortChange"
            @pageChange="pageChange"
        ></big-table>
        <export-modal ref="exportModal"></export-modal>
        <editLeaveNumModify
            v-if="officeIdList && officeIdList.length"
            ref="editLeaveNumModifyRef"
            @getListDataEmit="getListDataEmit"
            :officeIdList="officeIdList"
        ></editLeaveNumModify>
        <tableDetails :detailsTitle="$t('modules_spoc_jw_web_src_views_approval_approvalnew_2249')" ref="tableDetailsRef">
            <!-- <div slot="details" class="details-box">
            </div>-->
        </tableDetails>
    </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import bigTable from "@public/modules/bigTable.vue";
import exportModal from "@public/modules/exportModal.vue";
import vSearchCollapse from "@public/modules/vSearchCollapse";
import valid, {
    errors,
    htContract,
    common,
    sysUser,
    htLeaveApply,
    sysDict,
    sysCommonSql
} from "../../libs/request";
import { waitUntil, DatePickerOpt, defaultDatePickerValue } from "@public/libs/util";
import editLeaveNumModify from "./components/editLeaveNumModify.vue";
import tableDetails from "../../modules/tableDetails.vue";
// import { log } from 'util';
export default {
    name: 'sign.editLeaveNum',
    props: {
        //判断是否合同详情页打开的。有合同编号则为合同详情页打开
        ctNo:{
            type: String
        },
        ctStudnetId:{
            type: String
        },
        ctStudnetName:{
            type: String
        },
        ctOfficeId:{
            type: String
        }
    },
    components: {
        bigTable,
        exportModal,
        vSearchCollapse,
        editLeaveNumModify,
        tableDetails
    },
    computed: {
        ...mapState(["app", 'buttonPerm', "calendarConfig"]),
        myButtonPrem() {
            if (this.buttonPerm && (JSON.stringify(this.buttonPerm) != "{}")) {
                return this.buttonPerm['sign.editLeaveNum'] || [];
            } else {
                return false;
            }
        },
        btnList() {
            if (this.ctNo) {
                // 如果是从合同详情打开
                return [
                    {
                        style: {},
                        type: "",
                        btnClick: this.isCreate,
                        text: this.$t('modules_spoc_sign_web_src_views_editleavenum_editleavenum_6499')
                    }
                ];
            }else{
                return[
                    {
                        style: {},
                        type: "",
                        btnClick: this.isCreate,
                        text: this.$t('modules_spoc_sign_web_src_views_editleavenum_editleavenum_6499')
                    },
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

        }
    },
    watch: {
        "app.currOfficeId": function(val, oldVal) {
            if (oldVal && !this.ctNo && this.$route.name == "sign.editLeaveNum") {
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
    mounted() {
        this.getShowTitle();
        if (this.ctNo) {
            // 如果是从合同详情打开
            this.findObj.ctNo = this.ctNo;
            this.getMoreList()
        } else {
            this.getMoreList();
        }
    },
    data() {
        return {
            // orderByStatus: 1,
            // orderByType: "",
            options: null,
            tableHeightOut: 72, //324,
            sortObj: {},
            loadingSignId: false,
            loadingCreateById: false,
            signIdList: [],
            createByIdList: [],
            loadingStu: false,
            studentNameList0: [],
            courseNameList: [],
            jw_course_typeList: [],
            isUsedList: [
                // 0：未使用；1：使用中；2：已使用
                { label: this.$t('modules_spoc_sign_web_src_views_capitalflow_capitalflow_5115'), value: "0" },
                { label: this.$t('modules_spoc_portal_views_workbenchnew_lists_index_4263'), value: "1" },
                { label: this.$t('modules_spoc_sign_web_src_views_capitalflow_capitalflow_5117'), value: "2" }
            ],
            officeIdList: [],
            courseTimeStart: "",
            courseTimeEnd: "",
            signTime: [],
            findObj: {
                studentId: "",
                // studentName:'',
                courseName: "",
                courseType: "",
                startLeftNum: "",
                endLeftNum: "",
                isUsed: "",

                startSignTime: "", //开始签约时间
                endSignTime: "", //end签约时间
                officeId: "",
                ctNo: "",
                signId: "",
                createById: ""
                // signName:'',
                // phone:'',
            },
            pageNo: 1,
            pageSize: this.$store.state.app.pageSizeGlobal,
            /*搜索相关结束*/

            // tableName: "请假次数列表",
            selection: [],
            updateShowTitle: htLeaveApply.updateShowTitle,
            updateShowTitleKey: "htLeaveApply",
            exportMethod: htLeaveApply.exportSelectedFile, //导出用到的方法对象
            defaultShowCol: null,
            dataTotal: 0,
            tableColumnArray: [
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
                    // title: "合同编号",
                    key: "ctNo",
                    minWidth: 140,
                    // render: (h, params) => {
                    //     return h("div", [
                    //         h(
                    //             "a",
                    //             {
                    //                 style: {
                    //                     color: this.ctNo ? "#000" : ""
                    //                 },
                    //                 on: {
                    //                     click: () => {
                    //                         if (!this.ctNo) {
                    //                             this.$router.push({
                    //                                 name: "sign.pactDetails",
                    //                                 query: {
                    //                                     id: params.row.ctId,
                    //                                     ctNo: params.row.ctNo
                    //                                 }
                    //                             });
                    //                         }
                    //                     }
                    //                 }
                    //             },
                    //             params.row.ctNo
                    //         )
                    //     ]);
                    // }
                },
                {
                    // title: "已使用请假次数",
                    key: "useNum",
                    sortable: 'custom',
                    width: 120
                },
                {
                    // title: "剩余请假次数",
                    key: "leftNum",
                    sortable: 'custom',
                    width: 120
                },
                {
                    // title: "原请假次数",
                    key: "oriNum",
                    sortable: 'custom'
                },
                {
                    // title: "新增请假次数",
                    key: "num",
                    sortable: 'custom',
                    width: 120
                },
                {
                    // title: "审批状态",
                    key: "statusName",
                    /**
                     * 审批流程实例状态：未提交，待审批，审批中，已通过，已驳回
                     */
                    /*  public static final String AUDIT_STATUS_UNCOMMIT = "uncommit";
                            public static final String AUDIT_STATUS_UNAUDIT = "unaudit";
                            public static final String AUDIT_STATUS_AUDITING = "auditing";
                            public static final String AUDIT_STATUS_AGREE = "agree";
                            public static final String AUDIT_STATUS_REJECT = "reject"; */
                    /*
                            审批状态色值统一：                                                                                                      1、待审批：#999999
                        2、审批中：#46BC15
                        3、审批通过：#44BCB7
                        4、审批不通过：#F5222D
                        5、已撤回：#EABB06
                        6、已作废：#CCCCCC
                            */
                    render: (h, params) => {
                        let text = "";
                        let color = "";
                        if (params.row.status == "uncommit") {
                            // text = "未提交";
                            color = "#EABB06";
                        } else if (params.row.status == "unaudit") {
                            // text = "待审批";
                            color = "#999999";
                        } else if (params.row.status == "auditing") {
                            // text = "审批中";
                            color = "#46BC15";
                        } else if (params.row.status == "agree") {
                            // text = "审批通过";
                            color = "#44BCB7";
                        } else if (params.row.status == "reject") {
                            // text = "审批不通过";
                            color = "#F5222D";
                        } else if (params.row.status == "invalid") {
                            // text = "已作废";
                            color = "#CCCCCC";
                        }
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
                                params.row.statusName
                            ])
                        ]);
                    }
                },
                {
                    // title: "最新审批时间",
                    key: "auditTime",
                    sortable: 'custom',
                  /*   render: (h, params) => {
                        return h(
                            "div",
                            {},
                            params.row.status == "unaudit" ||
                                params.row.status == "uncommit"
                                ? "/"
                                : params.row.auditTime
                        );
                    } */
                },
                {
                    title: this.$t('classlist_compontents_detailinfo_45'), //"操作",
                    key: "doAction",
                    width: 200,
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "a",
                                {
                                    style: {
                                        display: this.myButtonPrem && this.myButtonPrem.indexOf('details') != -1 ? '' : 'none' ,
                                       marginRight:'8px',
                                    },
                                    on: {
                                        click: () => {
                                            this.$refs.tableDetailsRef.showPop({
                                                id: params.row.id,
                                                flowId: params.row.flowId,
                                                key: "contract leave",
                                                status: params.row.status
                                            });
                                        }
                                    }
                                },
                                this.$t('mycourse_viewstucontent_454')//"申请详情"
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
                                this.$t('jw.studentCourseDetail') //"学员详情"
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
                                this.$t('sign.pactDetails') // "合同详情"
                            ),
                        ]);
                    }
                }
            ],
            tableData: [],

        };
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        resetDefaultCol(){
            this.updateLoadingStatus({ isLoading: true });
            htLeaveApply.clearShowField({
                pageIdentifier: "htLeaveApply",
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
        changeDivHeight(height) {
            this.tableHeightOut = height;
        },
        remoteSignId(query) {
            this.loadingSignId = true;
            /*
                joinField: "id"
                joinTable: "sys_user"
                joinTableSearchParam: ""
                mainField: "seller_id"
                mainTable: "ht_sign"
                secondField: "name"
                */
            let params = {
                joinField: "id",
                joinTable: "sys_user",
                mainField: "seller_id",
                mainTable: "ht_sign",
                secondField: "name",
                joinTableSearchParam: query
            };
            sysCommonSql
                .queryPageInputInitData(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.signIdList = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.loadingSignId = false;
                });
        },
        remoteCreateById(query) {
            this.loadingCreateById = true;
            let params = {
                mainTable: "ht_valid_apply",
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
                        console.log(this.createByIdList);
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.loadingCreateById = false;
                });
        },
        ctNoChange(val) {
            this.findObj.ctNo = val.replace(/^\s*/, "");
        },
        getListDataEmit() {
            this.pageNo =1
            this.getListData();
        },
        officeIdChange() {
            this.findObj.studentId = "";
        },
        getMoreList() {
            //校区列表
            sysUser
                .dataScopeFilter()
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.officeIdList = res.data.data;
                        if(this.ctNo){
                            this.getListData();
                        } else {
                            waitUntil(
                                () => {
                                    return (this.app.currOfficeId && this.calendarConfig.maxMonthInterval);
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
									this.signTime = defaultDatePickerValue();
									this.options = DatePickerOpt(this,'DatePicker',Number(this.calendarConfig.maxMonthInterval));
                                    this.signTimeChange()
                                    this.getListData();
                                }
                            );
                        }
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    // this.updateLoadingStatus({ isLoading: false });
                });
            let types = "jw_course_type"; //课程包分类,适用年级
            sysDict
                .batchListData({
                    types
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.jw_course_typeList = res.data.data.jw_course_type;
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
        getListData() {
            this.updateLoadingStatus({ isLoading: true });
            let param = {
                // studentName:this.findObj.studentName,
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
            htLeaveApply
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
        //查看详情
        seeDetails(obj) {
            this.$refs.tableDetails.showPop(obj);
        },
        isExport(val) {
            //这里val的值。是根据设置下拉类型button设定的值来匹配判断
            if (val == "2" && !this.selection.length) {
                this.$Message.error(this.$t('scoretemplate_scoretemplate_572'));
                return;
            }
            let searchObj = Object.assign({},this.searchObj);
            if (val == "1") {
                delete searchObj.pageNo
                delete searchObj.pageSize
                this.exportMethod = htLeaveApply.htLeaveApplyExport; //导出用到的方法对象
            } else if (val == "2") {
                //如果是导出所选，需要在这里传递所选对象、或者对象ID，这里根据需要自行处理，并作为搜索参数的一部分传递到导出组件
                searchObj = {
                    ids: this.selection
                        .map(item => {
                            return item.id;
                        })
                        
                };
                this.exportMethod = htLeaveApply.htLeaveApplyExport; //导出用到的方法对象
            }
            this.$refs.exportModal.noShowExport(this.exportMethod, searchObj);
        },
        signTimeChange(date) {
            this.findObj.startSignTime = this.signTime[0] ? this.signTime[0].format('yyyy-MM-dd 00:00:00') : '';
            this.findObj.endSignTime = this.signTime[1] ? this.signTime[1].format('yyyy-MM-dd 23:59:59') : '';
        },
        //获取数据，根据情况修改接口、传参
        SearchList() {
            if (
                Number(this.findObj.startLeftNum) >
                Number(this.findObj.endLeftNum)
            ) {
                this.$Message.error(this.$t('modules_spoc_sign_web_src_views_editleavenum_editleavenum_6507'));
                this.findObj.endLeftNum = "";
                return;
            }
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
            this.getListData();
        },
        //如果有排序字段则为 必须方法，修改getCourseList为自己的获取数据方法
        sortChange(obj) {
            this.sortObj = obj;
            this.getListData();
        },
        //可选方法，如果是多选的话必须有
        selectionChange(selection) {
            console.log(selection);
            this.selection = selection;
        },
        //必须方法，获取默认显示的可选列  接口根据需要自行更换，每个模块的接口是不一致的
        getShowTitle(closeLoad) {
            htLeaveApply
                .getShowTitle({
                    pageIdentifier: "htLeaveApply",
                    voName: "HtLeaveApply",
					lang: this.$i18n.locale,
                })
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
        resetSearch() {
            this.signTime = defaultDatePickerValue();
            for (let item in this.findObj) {
                this.findObj[item] = "";
            }
            this.pageNo = 1;
            this.signTimeChange()
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
        isCreate() {
            if(this.ctNo){ //从合同详情点击添加，多个对象参数（合同编号、学生ID、学生姓名、校区ID）
                this.$refs.editLeaveNumModifyRef.showTipsMethods(
                    0,
                    this.$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5713'),
                    {
                        ctNo:this.ctNo,
                        ctStudnetId:this.ctStudnetId,
                        ctStudnetName:this.ctStudnetName,
                        ctOfficeId:this.ctOfficeId
                    }
                );
            } else {
                this.$refs.editLeaveNumModifyRef.showTipsMethods(
                    0,
                    this.$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5713')
                );
            }
        },
        setOptTime(flag){
            if(flag){
                this.signTime=[];
                this.signTimeChange()
            }
        },
    }
};
</script>
