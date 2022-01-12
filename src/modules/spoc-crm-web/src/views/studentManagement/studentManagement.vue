<style lang="less">
.studentManagementClass {
    .double-input {
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
        position: relative;
        /*.double-input-warning{*/
        /*    position: absolute;*/
        /*    top:32px;*/
        /*    left:6px;*/
        /*    color:red;*/
        /*    font-size: 12px;*/
        /*}*/
    }
    .mytable {
        width: 100%;
        margin-top: 10px;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        padding: 0 16px;
        .subTypeNameStyle {
            margin-left: 11px;
            .ivu-table-cell {
                margin-left: 11px;
            }
        }
    }
    .tableNameSlotStyle {
        margin-left: -16px;
        font-size: 16px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(73, 80, 96, 1);
        > span {
            color: #44bcb7;
        }
    }
}
</style>
<template>
    <div class="studentManagementClass">
        <v-search-collapse @search="SearchList" @reset="resetSearch"  @changeDivHeight="changeDivHeight">
            <DatePicker
                ref="DatePicker"
                :options="options3"
                split-panels
                @on-open-change="setOptTime"
                v-model="entryDate"
                type="daterange"
                @on-change="signTimeChange"
                placement="bottom-start"
                separator=" ~ "
                :placeholder="$t('modules_spoc_crm_web_src_views_studentmanagement_studentmanagement_1683')"
                style="width:224px;"
            ></DatePicker>
            <DatePicker
                    ref="DatePicker2"
                    :options="options4"
                    split-panels
                    @on-open-change="setOptTime2"
                    v-model="endTime"
                    type="daterange"
                    @on-change="signTimeChange2"
                    placement="bottom-start"
                    separator=" ~ "
                    :placeholder="$t('modules_spoc_crm_web_src_views_studentmanagement_studentmanagement_1684')"
                    style="width:224px;"
            ></DatePicker>
            <Select
                v-model="findObj.officeId"
                clearable
                :placeholder="$t('integralflow_15')"
                style="width:224px;"
                @on-change="officeIdChange"
            >
                <Option
                    v-for="item in officeIdList"
                    :value="item.id"
                    :key="item.value"
                >{{ item.code}}{{ item.name }}</Option>
            </Select>
            <Input v-model.trim="findObj.name" clearable :placeholder="$t('memberlist_memberlist_257')" style="width:140px;" />
            <Input v-model="findObj.phone" clearable :placeholder="$t('classlist_compontents_detailinfo_37')" style="width:140px;" @on-keyup="RemoveSpace" />
            <Select
                v-model="findObj.gradeType"
                :placeholder="$t('courselist_courselist_223')"
                @on-change="changeType"
                style="width:140px;"
                clearable
            >

                <Option
                    v-for="item in jw_course_typeList"
                    :value="item.value"
                    :key="item.value"
                >{{ item.label }}</Option>
            </Select>
            <Select v-model="findObj.grade" :placeholder="$t('messagemanagement_index_355')" style="width:140px;" clearable>
                <Option
                    v-for="item in jw_course_gradeList"
                    :value="item.value"
                    :key="item.value"
                    v-show="findObj.gradeType == item.type"
                >{{ item.label }}</Option>
            </Select>
            <Select
                :placeholder="$t('modules_spoc_crm_web_src_views_customermanagement_index_1267')"
				clearable
                multiple
                filterable
                v-model="findObj.querySources"
            >
                <Option
                    v-for="item in crm_customer_source"
                    :value="item.value"
                    :key="item.value"
                >{{ item.name }}</Option>
            </Select>
            <Input v-model.trim="findObj.enName" :placeholder="$t('classlist_compontents_detailinfo_36')" style="width:224px;"></Input>
            <Select v-model="findObj.status" :placeholder="$t('pushsettings_index_496')" style="width:140px;" clearable>
                <Option
                        v-for="item in com_student_course_rel_status"
                        :value="item.value"
                        :key="item.value"
                >{{ item.label }}</Option>
            </Select>
            <Select
                    :placeholder="$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1638')"
                    clearable
                    filterable
                    v-model="findObj.ooId"
            >
                <Option
                        v-for="item in ooIdList"
                        :value="item.id"
                        :key="item.id"
                >{{ item.name }}</Option>
            </Select>
            <Select
                    :placeholder="$t('modules_spoc_crm_web_src_views_studentmanagement_studentmanagement_1694')"
                    clearable
                    v-model="findObj.ooIdIsNull"
            >
                <Option
                        v-for="item in ooIdIsNullList"
                        :value="item.value"
                        :key="item.value"
                >{{ item.name }}</Option>
            </Select>
            <div class="double-input" style="width: 292px;">
<!--                <div class="double-input-warning">{{$t('modules_spoc_crm_web_src_views_studentmanagement_studentmanagement_1695')}}</div>-->
                <InputNumber
                        :active-change="true"
                        style="margin-right: 12px;"
                        v-model="findObj.ageStart"
                        :min="0"
                        :placeholder="$t('modules_spoc_crm_web_src_views_studentmanagement_studentmanagement_1696')"></InputNumber>
                <InputNumber
                        :active-change="true"
                        v-model="findObj.ageEnd"
                        :min="0"
                        :placeholder="$t('modules_spoc_crm_web_src_views_studentmanagement_studentmanagement_1697')"></InputNumber>
            </div>
            <Input v-model="findObj.cusName" clearable :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_leftbanner_819')" style="width:140px;" @on-keyup="RemoveSpace" />
        </v-search-collapse>
        <big-table
            v-if="defaultShowCol"
            :tableHeightOut="tableHeightOut"
            class="mytable"
            :tableName="$t('modules_spoc_crm_web_src_views_studentmanagement_studentmanagement_1699')"
            :tableData="tableData"
            :tableColumnArray="tableColumnArray"
            :defaultShowCol="defaultShowCol"
            :canSelection="true"
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
        <studentAccont ref="studentAccont"></studentAccont>
        <Modal
			v-model="saveOoIdModal"
			:title="$t('modules_spoc_crm_web_src_views_studentmanagement_studentmanagement_1700')"
			width="350"
			:mask-closable="false"
			:loading="loadingModal"
			@on-cancel="handleReset('formValidate')"
		>
			<div>
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="70">
                    <FormItem :label="$t('modules_spoc_crm_web_src_views_studentmanagement_studentmanagement_1701')" prop="ooId">
                        <Select filterable v-model="formValidate.ooId" :placeholder="$t('modules_spoc_crm_web_src_views_studentmanagement_studentmanagement_1702')" style="width:200px;">
                            <Option :value="item.id" v-for="item in ooList" :key="item.id">{{item.name}}</Option>
                        </Select>
                    </FormItem>
                </Form>
			</div>
			<div slot="footer">
				<Button @click="handleReset('formValidate')" style="margin-right: 16px">{{$t('classroom_allscore_53')}}</Button>
				<Button type="primary" @click="handleSubmit('formValidate')">{{$t('classroom_allscore_54')}}</Button>
			</div>
		</Modal>
        <Modal
			v-model="transferSchoolModal"
			:title="$t('modules_spoc_crm_web_src_views_studentmanagement_studentmanagement_17001')"
			width="350"
			:mask-closable="false"
            :loading="transferSchoolModalLoading"
            @on-ok="saveTransferSchool"
		>
			<div>
                <Form ref="formValidate1" :model="formValidate" :rules="ruleValidate" :label-width="70">
                    <FormItem :label="$t('modules_spoc_crm_web_src_views_performanceplan_modal_1478')" prop="transferSchoolId">
                        <Select filterable v-model="formValidate.transferSchoolId" :placeholder="$t('modules_spoc_crm_web_src_views_studentmanagement_studentmanagement_1702')" style="width:200px;">
                            <Option v-show="item.id != transferSchoolOldId" v-for="item in companyList" :value="item.id" :key="item.id">{{ item.code }}{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                </Form>
			</div>
		</Modal>
    </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import bigTable from "@public/modules/bigTable.vue";
import popTipComp from '@public/modules/tableDropdown.vue';
import exportModal from "@public/modules/exportModal.vue";
import vSearchCollapse from "@public/modules/vSearchCollapse";
import {
    htLeaveApply,
} from "../../../../spoc-sign-web/src/libs/request";
import valid,{ errors,sysUser,sysCommonSql,common, sysDict } from "./../../libs/request";
import studentAccont from "../../../../spoc-sign-web/src/views/studentAccont/modal.vue";
import { waitUntil, DatePickerOpt, defaultDatePickerValue } from "@public/libs/util";
export default {
    name: 'crm.studentManagement',
    props: {
        ctNo: {
            type: String
        }
    },
    data() {
        return {
            companyList:[],
            transferSchoolStuId: '',
            transferSchoolOldId: '',
            transferSchoolModal: false,
            transferSchoolModalLoading: true,
            formValidate: {
                ooId: '',
                transferSchoolId: ''
			},
			ruleValidate: {
                ooId: [
                    { required: true, message: this.$t('modules_spoc_crm_web_src_views_studentmanagement_studentmanagement_1702'), trigger: 'change' },
                ],
                transferSchoolId: [
                    { required: true, message: this.$t('modules_spoc_crm_web_src_views_clientareaaround_clientareaaround_781'), trigger: 'change' },
                ]
            },
            isSaveing: false,
            stuId: '',
            ooId: '',
            ooList: [],
            saveOoIdModal: false,
            loadingModal: true,
            options3: null,
            options4: null,
            tableHeightOut: 72, //324,
            crm_customer_source: [],
            // crm_customer_secondSource: [],
            // crm_customer_thirdSource: [],
            hasTag: true,
            updateShowTitleKey: "ComStudent",
            updateShowTitle: common.updateShowTitle,
            exportMethod: htLeaveApply.exportSelectedFile, //导出用到的方法对象
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
            loadingoptUserId: false,
            optUserIdList: [],
            loadingStu: false,
            studentNameList0: [],
            jw_course_typeList: [],
            jw_course_gradeList: [],
            com_student_course_rel_status:[],//状态
            officeIdList: [],
            courseTimeStart: "",
            courseTimeEnd: "",
            entryDate: [],
            endTime: [],
            ooIdList:[],
            ooIdIsNullList:[
                {
                    value:'0',
                    name:this.$t('modules_spoc_crm_web_src_views_studentmanagement_studentmanagement_1708')
                },
                {
                    value:'1',
                    name:this.$t('modules_rolepeople_215')
                },
            ],
            findObj: {
                entryDateStart: "", //开始入学日期时间
                entryDateEnd: "", //end入学日期时间
                officeId: "",
                name: "",
                phone: "",
                cusName: '',
                gradeType: "",
                grade: "",
                enName: "",
                querySources: [],
                ooIdIsNull:'',
                ooId:'',
                ageStart:'',
                ageEnd:'',
                // secondSource: "",
                // thirdSource: ""
                status: "",
                graduationDateStart: "", //开始节课时间
                graduationDateEnd: "", //end结课时间
            },
            pageNo: 1,
            pageSize: this.$store.state.app.pageSizeGlobal,
            /*搜索相关结束*/
            defaultShowCol: null,
            dataTotal: 0,
            sortObj: {},
            tableColumnArray: [
                {
                    // title: "学员编号",
                    key: "code",
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "a",
                                {
                                    style: {
                                        color:this.myButtonPrem.indexOf("details") >= 0?'':'#515a6e'
                                    },
                                    on: {
                                        click: () => {
                                            if(this.myButtonPrem.indexOf("details") >= 0){
                                                this.$router.push({
                                                    name: "crm.customer360",
                                                    query: {
                                                        id: params.row.cusId
                                                    }
                                                });
                                            }
                                        }
                                    }
                                },
                                params.row.code
                            )
                        ]);
                    }
                },
                {
                    // title: "学员姓名",
                    key: "name",
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "a",
                                {
                                    style: {
                                        color:this.myButtonPrem.indexOf("details") >= 0?'':'#515a6e'
                                    },
                                    on: {
                                        click: () => {
                                             if(this.myButtonPrem.indexOf("details") >= 0){
                                                this.$router.push({
                                                    name: "crm.customer360",
                                                    query: {
                                                        id: params.row.cusId
                                                    }
                                                });
                                            }
                                        }
                                    }
                                },
                                params.row.name
                            )
                        ]);
                    }
                },
                {
                    title: "操作",
                    key: "doAction",
                    width: 90,
                    render: (h, params) => {
                        let buttonList = [];
                        if (this.myButtonPrem.indexOf("account") >= 0) {
                            buttonList.push({ label: '账务', key: 'account' });
                        }
                        if (this.myButtonPrem.indexOf("contract") >= 0) {
                            buttonList.push({ label: '报名', key: 'contract' });
                        }
                        if (this.myButtonPrem.indexOf("saveOo") >= 0) {
                            buttonList.push({ label: '分配学管', key: 'saveOo' });
                        }
                        if (this.myButtonPrem.indexOf("translateOffice") >= 0) {
                            buttonList.push({ label: '转校区', key: 'translateOffice' });
                        }
                        let more = h(popTipComp, {
                            props: {
                                actionName: this.$t('views_room_selectcomp_629'),
                                buttonList: buttonList
                            },
                            style: {
                                margin: '3px 6px',
                                display: 'inline-block'
                            },
                            on: {
                                dropFn: key => {
                                    this.approval({ key: key, row: params.row });
                                }
                            }
                        });

                        return h("div", [
                            this.myButtonPrem.indexOf("details") >= 0
                                      ?h(
                                "a",
                                {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    },
                                    style: {},
                                    on: {
                                        click: () => {
                                            this.$router.push({
                                                name: "crm.customer360",
                                                query: {
                                                    id: params.row.cusId
                                                }
                                            });
                                        }
                                    }
                                },
                                "详情"
                            ):'',
                            (this.myButtonPrem.indexOf("details") >= 0 && 
                             this.myButtonPrem360.indexOf('studentTab') >= 0)
                                      ?h(
                                "a",
                                {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    },
                                    style: {
                                        'margin-left': '12px'
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push({
                                                name: "crm.customer360",
                                                query: {
                                                    id: params.row.cusId,
                                                    isEditStudent: 1
                                                }
                                            });
                                        }
                                    }
                                },
                                "编辑学员"
                            ):'',
                            buttonList.length ? more :""
                        ]);
                    }
                }
            ],
            tableData: [],
            myButtonPrem: [],
            myButtonPrem360: [],
        };
    },
    computed: {
         ...mapState(["app","buttonPerm","calendarConfig"]),
        // myButtonPrem(){
        //     return this.buttonPerm['crm.studentManagement']
        // }
    },
    components: {
        bigTable,
        exportModal,
        vSearchCollapse,
        studentAccont,
        popTipComp
    },
    mounted() {
        this.getShowTitle();
        this.getInitData();
        this.batchListData();
        this.batchListDataFn();
        this.getSuitCompass();
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        approval(obj) {
            console.log(obj,'   ````````````')
            if (obj.key === 'account') { // 账务
                this.$refs.studentAccont.show({
                    officeId: obj.row.officeId,
                    studentId: obj.row.id,
                    cusId: obj.row.cusId
                });
            }
            if (obj.key === 'contract') { // 报名
                this.$router.push({
                    name: "sign.pact",
                    query: {
                        // id:params.row.id,
                        cusId: obj.row.cusId

                    }
                });
            }
            if (obj.key === 'saveOo') { // 分配学管
                this.showSaveOoIdModal(obj.row.id, obj.row.officeId, obj.row.ooId)
            }
            if (obj.key === 'translateOffice') { // 转校区
                this.showtransferSchool(obj.row.id, obj.row.officeId)
            }
        },
        getSuitCompass(){
            common.getAuditOffices()
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.companyList = res.data.data
                    }
                })
                .catch(errors.call(this))
        },
        resetDefaultCol(){
            this.updateLoadingStatus({ isLoading: true });
            common.clearShowField({
                pageIdentifier: "ComStudent",
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
           //不是数字就清空数据
		numArea(value) {
			var patt1 = new RegExp(/^[0-9]{0,}$/);
			return patt1.test(value);
		},
        RemoveSpace(val) {
			if (!this.numArea(this.findObj.phone)) {
				this.findObj.phone = parseInt(this.findObj.phone)
					? parseInt(this.findObj.phone)
					: "";
			}
		},
        handleReset(){
			this.$refs.formValidate.resetFields()
			this.saveOoIdModal = false
		},
		handleSubmit(){
			this.$refs.formValidate.validate((validRes) => {
				console.log("validRes === " + validRes)
				if (validRes) {
					console.log("this.isSaveing ==" + this.isSaveing)
					if(this.isSaveing){
						return
					}
					this.isSaveing = true
                    this.updateLoadingStatus({ isLoading: true });

					common.saveOoId({
                        id: this.stuId,
                        ooId: this.formValidate.ooId
                    }).then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            this.$refs.formValidate.resetFields()
                            this.saveOoIdModal = false
                            this.loadingModal = false
                            setTimeout(() => {
                                this.loadingModal = true
                            }, 0);
                            this.getListData();
                        } else {
                            this.saveOoIdModal = true
                            this.loadingModal = false
                            setTimeout(() => {
                                this.loadingModal = true
                            }, 0);
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {
                        setTimeout(()=>{
                            this.isSaveing = false
                        },300)
                        this.updateLoadingStatus({ isLoading: false });
                    });
				} else {
					this.isSaveing = false
					this.createTaskModal = true
					this.loadingModal = false
					setTimeout(() => {
						this.loadingModal = true
					}, 0);
				}
			})
        },
        saveTransferSchool(){
            this.$refs.formValidate1.validate((validRes) => {
				console.log("validRes === " + validRes)
				if (validRes) {
					console.log("this.isSaveing ==" + this.isSaveing)
					if(this.isSaveing){
						return
					}
					this.isSaveing = true
                    this.updateLoadingStatus({ isLoading: true });

					common.transformOfficeId({
                        id: this.transferSchoolStuId,
                        oldOfficeId: this.transferSchoolOldId,
                        officeId: this.formValidate.transferSchoolId
                    }).then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            this.$refs.formValidate1.resetFields()
                            this.transferSchoolModal = false
                            this.transferSchoolModalLoading = false
                            setTimeout(() => {
                                this.transferSchoolModalLoading = true
                            }, 0);
                            this.getListData();
                        } else {
                            this.transferSchoolModal = true
                            this.transferSchoolModalLoading = false
                            setTimeout(() => {
                                this.transferSchoolModalLoading = true
                            }, 0);
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {
                        setTimeout(()=>{
                            this.isSaveing = false
                        },300)
                        this.updateLoadingStatus({ isLoading: false });
                    });
				} else {
					this.isSaveing = false
					this.transferSchoolModalLoading = false
                    this.transferSchoolModal = true
                    setTimeout(()=>{
                        this.transferSchoolModalLoading = true
                    })
				}
			})
        },
        showtransferSchool(stuId, officeId){
            this.formValidate.transferSchoolId = ''
            this.transferSchoolStuId = stuId
            this.transferSchoolOldId = officeId
            this.transferSchoolModal = true
        },
        showSaveOoIdModal(stuId, officeId, ooId){
            this.isSaveing = false
            this.saveOoIdModal = true
            this.stuId = stuId
            this.updateLoadingStatus({ isLoading: true });
            sysUser.listRoleUser({
                roleId:6,
                officeId: officeId,//'17',
                pageSize:0,
                excludeOfficeIds:1,
                isService:1
            }).then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.ooList = res.data.data.list;
                    this.formValidate.ooId = ooId ? ooId : ''
                }
            })
            .catch(errors.call(this))
            .finally(() => {
                this.updateLoadingStatus({ isLoading: false });
            });
        },
        setOptTime(flag){
            if(flag){
                this.entryDate = []
                this.signTimeChange()
            }
        },
        setOptTime2(flag){
            if(flag){
                this.endTime = []
            }
        },
        changeDivHeight(height) {
            this.tableHeightOut = height;
        },
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
        },
        //可选方法，如果是多选的话必须有
        selectionChange(selection) {
            this.selection = selection;
            console.log(this.selection.map(item => {
                return item.id;
            }))
        },
        isExport(val) {
            //这里val的值。是根据设置下拉类型button设定的值来匹配判断
            if (val == "2" && !this.selection.length) {
                this.$Message.error("请选择要导出的数据");
                return;
            }
            let searchObj = this.searchObj;
            if (val == "1") {
                this.exportMethod = common.exportStudent; //导出用到的方法对象
            } else if (val == "2") {
                //如果是导出所选，需要在这里传递所选对象、或者对象ID，这里根据需要自行处理，并作为搜索参数的一部分传递到导出组件
                searchObj.idList =this.selection
                        .map(item => {
                            return item.id;
                        });
                this.exportMethod = common.exportStudent; //导出用到的方法对象
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
            this.ooIdListFn()
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
                            if (this.app.currOfficeId) {
                                this.$set(this.findObj, "officeId", this.app.currOfficeId=='all'?'':this.app.currOfficeId);
                            }
                            return (this.app.currOfficeId && JSON.stringify(this.buttonPerm)!= '{}')|| false;
                        },
                        () => {
                            this.myButtonPrem = this.buttonPerm['crm.studentManagement'] || []
                            this.myButtonPrem360 = this.buttonPerm['crm.customer360'] || []
                            if(this.myButtonPrem.indexOf("export") < 0){
                                this.btnList = []
                            }
                            this.ooIdListFn()
                            this.signTimeChange();
                            this.getListData();
                        }
                    );
                }
            });
        },
        batchListData() {
            let types = "jw_course_type,com_student_course_rel_status"; //课程包分类,适用年级
            sysDict
                .batchListData({
                    types
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        if(res.data.data){
                            this.com_student_course_rel_status = res.data.data.com_student_course_rel_status || [];
                            this.jw_course_typeList = res.data.data.jw_course_type || [];
                        }
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
                        console.log(res)
                        this.jw_course_gradeList = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        changeType(val) {
            this.findObj.grade = "";
        },
        getListData() {
            this.updateLoadingStatus({ isLoading: true });
            let param = {
                pageNo: this.pageNo,
                pageSize: this.pageSize
            };
            param = Object.assign({}, param, this.findObj);
            this.searchObj = param; //这里需要给searchObj 赋值，导出数据的时候需要用到
            common
                .manageListPage(param)
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
        signTimeChange(date) {
            this.findObj.entryDateStart = this.entryDate[0] ? this.entryDate[0].format('yyyy-MM-dd 00:00:00') : ""
            this.findObj.entryDateEnd = this.entryDate[1] ? this.entryDate[1].format('yyyy-MM-dd 23:59:59') : ""
        },
        signTimeChange2(date) {
            this.findObj.graduationDateStart = this.endTime[0] ? this.endTime[0].format('yyyy-MM-dd 00:00:00') : ""
            this.findObj.graduationDateEnd = this.endTime[1] ? this.endTime[1].format('yyyy-MM-dd 23:59:59') : ""
        },
        //获取数据，根据情况修改接口、传参
        SearchList() {
            if (
                Number(this.findObj.startLeftNum) >
                Number(this.findObj.endLeftNum)
            ) {
                this.$Message.error(this.$t('modules_spoc_crm_web_src_views_studentmanagement_studentmanagement_1710'));
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
        //必须方法，获取默认显示的可选列  接口根据需要自行更换，每个模块的接口是不一致的
        getShowTitle(closeLoad) {
            common
                .getShowTitle({
                    pageIdentifier: "ComStudent",
                    voName:
                        "com.windliven.spoc.modules.student.vo.ComStudentManageVO"
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
            for (let item in this.findObj) {
                if(item=='querySources'){
                    this.findObj[item] = [];
                }else{
                    this.findObj[item] = "";
                }
            }
            this.entryDate = [] //defaultDatePickerValue();
            this.signTimeChange();
            this.pageNo = 1;
            // this.$set(this.findObj, "officeId", this.app.currOfficeId);
            this.$set(this.findObj, "officeId", this.app.currOfficeId=='all'?'':this.app.currOfficeId);
            this.getListData();
        },
        restLeft(num) {
            if(num > this.findObj.ageEnd){
                this.findObj.ageEnd = num
                if(this.findObj.ageEnd <= 0){
                    this.findObj.ageEnd = 0
                }
            }
        },
        restRight(num) {
            if(this.findObj.ageStart > num){
                this.findObj.ageStart = num
                if(this.findObj.ageStart <= 0){
                    this.findObj.ageStart = 0
                }
            }
        },
        ooIdListFn() {
            this.findObj.ooId = ''
            this.updateLoadingStatus({ isLoading: false });
            sysUser.listDataByRole({
                roleIds:6,
                officeIds: this.findObj.officeId ? this.findObj.officeId : '',
                pageSize:-1
            }).then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.ooIdList = res.data.data;
                }
            })
            .catch(errors.call(this))
            .finally(() => {
                this.updateLoadingStatus({ isLoading: false });
            });
        },
    },
    watch: {
        "app.currOfficeId": function(val, oldVal) {
            if (oldVal&&this.$route.name=="crm.studentManagement") {
                this.$set(this.findObj, "officeId", val=='all'?'':val);
                this.getListData();
            }
        },
    }
};
</script>
