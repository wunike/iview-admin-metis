<style lang="less">
.capitalFlow{
    .capitalFlowTable {
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
       .ivu-table-wrapper{
           border-left: none;
       }
   }
}
</style>
<template>
    <div class="capitalFlow">
        <v-search-collapse @search="SearchList" @reset="resetSearch" v-show="!ctNo" @changeDivHeight="changeDivHeight">
            <DatePicker
                ref="DatePicker"
                v-model="optTime"
                type="daterange"
                @on-change="SignTimeChange"
                placement="bottom-start"
                separator=" ~ "
                :placeholder="$t('modules_spoc_jw_web_src_views_chargingmanage_chargingmanagelist_2327')"
                style="width:224px;"
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
            <Input v-model="findObj.contractNo" :placeholder="$t('modules_spoc_sign_web_src_views_approval_approvalnew_5071')" style="width:224px;"></Input>
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
            <Select v-model="findObj.subType" clearable :placeholder="$t('messagemanagement_index_354')" style="width:140px;">
                <Option
                    v-for="item in cw_capital_trace_sub_typeList"
                    :value="item.value"
                    :key="item.value"
                >{{ item.label }}</Option>
            </Select>
            <Select
                v-model="findObj.optUserId"
                :placeholder="$t('integralflow_10')"
                style="width: 140px;margin-right:12px;"
                clearable
                filterable="true"
                remote
                :loading="loadingoptUserId"
                :remote-method="remoteoptUserId"
            >
                <Option
                    v-for="item in optUserIdList"
                    :value="item.value"
                    :key="item.value"
                >{{ item.name }}</Option>
            </Select>
            <Select v-model="findObj.type" clearable :placeholder="$t('messagemanagement_components_histroylists_312')" style="width:224px;">
                <Option
                    v-for="item in cw_capital_trace_typelist"
                    :value="item.value"
                    :key="item.value"
                >{{ item.label }}</Option>
            </Select>
            <Select
                v-model="findObj.courseType"
                :placeholder="$t('courselist_courselist_223')"
                @on-change="changeType"
                style="width:224px;"
                clearable
            >
                <Option
                    v-for="item in jw_course_typeList"
                    :value="item.value"
                    :key="item.value"
                >{{ item.label }}</Option>
            </Select>
            <Select v-model="findObj.courseGrade" :placeholder="$t('messagemanagement_index_355')" style="width:224px;" clearable>
                <Option
                    v-for="item in jw_course_gradeList"
                    :value="item.value"
                    :key="item.value"
                    v-show="findObj.courseType == item.type"
                >{{ item.label }}</Option>
            </Select>
        </v-search-collapse>
        <big-table
            v-if="defaultShowCol"
            class="capitalFlowTable"
            :tableHeightOut="tableHeightOut"
            :tableName="tableName"
            :tableData="tableData"
            :tableColumnArray="tableColumnArray"
            :defaultShowCol="defaultShowCol"
            :canSelection="true && !ctNo"
            :dataTotal="dataTotal"
            :btnList="btnList"
            :canChangeHeight="!ctNo"
            :isShowSelectTableColumn="!ctNo"
            :updateShowTitleMethod="updateShowTitle"
            :updateShowTitleKey="updateShowTitleKey"
            @resetDefault="resetDefaultCol"
            @selectionChange="selectionChange"
            @pageChange="pageChange"
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
    htContract,
    common,
    sysUser,
    cwCapitalTrace,
    sysDict,
    sysCommonSql
} from "../../libs/request";

import { waitUntil, DatePickerOpt, defaultDatePickerValue } from "@public/libs/util";
export default {
    name: 'sign.capitalFlow',
    props: {
        ctNo: {
            type: String
        }
    },
    data() {
        return {
			options: null,
            tableHeightOut: 72,
            updateShowTitleKey: "listPage",
            updateShowTitle: cwCapitalTrace.updateShowTitle,
            exportMethod: cwCapitalTrace.export, //导出用到的方法对象
            selection: [],
            btnList: [
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
            cw_capital_trace_typelist: [],
            cw_capital_trace_sub_typeList: [],
            loadingoptUserId: false,
            optUserIdList: [],
            loadingStu: false,
            studentNameList0: [],
            jw_course_typeList: [],
            jw_course_gradeList: [],
            isUsedList: [
                { label: this.$t('modules_spoc_sign_web_src_views_capitalflow_capitalflow_5115'), value: "0" },
                { label: this.$t('modules_spoc_portal_views_workbenchnew_lists_index_4263'), value: "1" },
                { label: this.$t('modules_spoc_sign_web_src_views_capitalflow_capitalflow_5117'), value: "2" }
            ],
            officeIdList: [],
            courseTimeStart: "",
            courseTimeEnd: "",
            optTime: [],
            findObj: {
                officeId: "",
                contractNo: "",
                studentId: "",
                subType: "",
                optTimeStart: "", //开始签约时间
                optTimeEnd: "", //end签约时间
                optUserId: "",
                type: "",
                courseType: "",
                courseGrade: ""
            },
            pageNo: 1,
            pageSize: this.$store.state.app.pageSizeGlobal,
            /*搜索相关结束*/
            tableName: this.$t('capitalFlow1'), //"资金流水列表",
            defaultShowCol: null,
            dataTotal: 0,
            sortObj: {},
            tableColumnArray: [
                {
                    // title: "分类",
                    key: "subTypeName",
                    className: "subTypeNameStyle"
                },
                {
                    // title: "金额",
                    key: "revenue",
                    render: (h, params) => {
                        let money = params.row.revenue;
                        money = money ? Number(money).toFixed(2) :'';
                        return h("div", [
                            h(
                                "a",
                                {
                                    style: {
                                        color:
                                            params.row.revenue >= 0
                                                ? "#F5222D"
                                                : "#44BCB7"
                                    }
                                },
                                money > 0 ? `+${money}` : money
                            )
                        ]);
                    }
                },
                {
                    // title: "合同编号",
                    key: "contractNo",
                    minWidth: 140,
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "a",
                                {
                                    style: {
                                        color: this.ctNo ? "#000" : ""
                                    },
                                    on: {
                                        click: () => {
                                            if (!this.ctNo) {
                                                this.$router.push({
                                                    name: "sign.pactDetails",
                                                    query: {
                                                        id: params.row.contractId,
                                                        ctNo: params.row.contractNo
                                                    }
                                                });
                                            }
                                        }
                                    }
                                },
                                params.row.contractNo
                            )
                        ]);
                    }
                },
            ],
            tableData: []
        };
    },
    computed: {
        ...mapState(["app", "calendarConfig"])
    },
    components: {
        bigTable,
        exportModal,
        vSearchCollapse
    },
    mounted() {
        this.getShowTitle();
        if (this.ctNo) {
            // 如果是从合同详情打开
            this.btnList = []
            this.findObj.contractNo = this.ctNo;
            this.getListData(true);
        } else {
            this.getInitData();
            this.batchListData();
        }
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        resetDefaultCol(){
            this.updateLoadingStatus({ isLoading: true });
            cwCapitalTrace.clearShowField({
                pageIdentifier: "listPage",
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
        remoteoptUserId(query) {
            this.loadingoptUserId = true;
            let params = {
                mainTable: "cw_capital_trace",
                mainField: "opt_user",
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
                        this.optUserIdList = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.loadingoptUserId = false;
                });
        },
        getListDataEmit() {
            this.getListData();
        },
        officeIdChange() {
            this.findObj.studentId = "";
        },
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
							this.optTime = defaultDatePickerValue();
							this.options = DatePickerOpt(this,'DatePicker',Number(this.calendarConfig.maxMonthInterval))
                            this.getListData();
                        }
                    );
                }
            });
        },
        batchListData() {
            /*
                        类型type: cw_capital_trace_type

                        详情type: cw_capital_trace_sub_type
                    */
            let types =
                "jw_course_type,cw_capital_trace_type,cw_capital_trace_sub_type"; //课程包分类,适用年级
            sysDict
                .batchListData({
                    types
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.jw_course_typeList = res.data.data.jw_course_type;
                        this.cw_capital_trace_sub_typeList =
                            res.data.data.cw_capital_trace_sub_type;
                        this.cw_capital_trace_typelist =
                            res.data.data.cw_capital_trace_type;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
            /* 年级 */
            let type = "jw_course_type";
            sysDict
                .findChildDictByParentDict({
                    type
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.jw_course_gradeList = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        changeType(val) {
            this.findObj.courseGrade = "";
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
                        this.studentNameList0 = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.loadingStu = false;
                });
        },
        getListData(fromCtDetail) {
            this.updateLoadingStatus({ isLoading: true });
            let param = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                filtered: fromCtDetail ? 0 : 1
            };
            param = Object.assign({}, param, this.findObj);
            this.searchObj = param; //这里需要给searchObj 赋值，导出数据的时候需要用到
            cwCapitalTrace
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
        SignTimeChange(date) {
            this.findObj.optTimeStart = date[0] ? date[0] + " 00:00:00" : "";
            this.findObj.optTimeEnd = date[1] ? date[1] + " 23:59:59" : "";
        },
        //获取数据，根据情况修改接口、传参
        SearchList() {
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
        //必须方法，获取默认显示的可选列  接口根据需要自行更换，每个模块的接口是不一致的
        getShowTitle(closeLoad) {
            cwCapitalTrace
                .getShowTitle({
                    pageIdentifier: "listPage",
                    voName: "com.windliven.spoc.modules.cw.vo.CwCapitalTraceVO"
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
            this.optTime = defaultDatePickerValue();
            for (let item in this.findObj) {
                this.findObj[item] = "";
            }
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
        setOptTime(flag){
            if(flag){
                this.optTime=[];
            }
        },
    },
    watch: {
        "app.currOfficeId": function(val, oldVal) {
            if (oldVal && this.$route.name == "sign.capitalFlow") {
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
    }
};
</script>
