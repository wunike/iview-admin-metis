<style lang="less">
.modalStyle {
    .ivu-modal-header {
        padding-top: 16px;
        padding-bottom: 16px;
        background:rgba(247,248,250,1);
        border-radius: 4px;
        .ivu-modal-header-inner {
            font-size: 18px;
            font-weight:500;
        }
    }
    .ivu-form {
        .ivu-form-item{
             margin-bottom: 21px;
             .ivu-input-with-suffix{
                 font-size:14px;
             }
             &.ivu-radio-groupForm{
                 .ivu-radio-group-item{
                     font-size: 14px;
                 }
             }
        }
        .ivu-form-item-label {
            font-size: 14px;
            color: #999999;
        }
        .ivu-select-input {
            font-size: 14px;
        }
        .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
            font-size: 14px;
        }
        // .ivu-select-selected-value{

        // }
        .w50Style,.w100info{
            margin-bottom: 0px;
        }
        // .w100info {
        //     margin-bottom: 0px;
        // }
    }
    .chooseCourseOut {
        // margin-left: 30px;
        margin-bottom: 20px;
    }
}
</style>
<template>
    <div class="chooseOne">
        <Modal
            class-name="modalStyle"
            v-model="editModal"
            :loading="editModalLoading"
            :title="titleName"
            width="800"
            :mask-closable="false"
            @on-ok="editOk"
            @on-cancel="editCancel"
        >
            <Form
                ref="createCoursePackRef"
                :model="editObj"
                :label-width="100"
                class="modalStyleForm"
            >
                <FormItem
                    :label="$t('views_room_classroom_571')"
                    class="w100"
                    prop="officeId"
                    :rules="{ required: true, type: 'string',  message: $t('importPage_warning2'), trigger: 'change' }"
                >
                    <Select
                        :disabled="addInfoObj"
                        v-model="editObj.officeId"
                        :placeholder="$t('messagemanagement_index_344')"
                        style="width:400px;"
                        clearable
                        @on-change="officeIdChange"
                    >
                        <Option
                            v-for="item in officeIdList"
                            :value="item.id"
                            :key="item.id"
                        >{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem
                    :label="$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_4998')"
                    class="w100"
                    prop="studentId"
                    :rules="{ required: true, type: 'string',  message: $t('modules_spoc_sign_web_src_views_editleavenum_components_editleavenummodify_6461'), trigger: 'change' }"
                >
                    <Select
                        :disabled="addInfoObj"
                        v-model="editObj.studentId"
                        :placeholder="$t('memberlist_memberlist_257')"
                        filterable
                        remote
                        :remote-method="remoteStuName"
                        :loading="loadingStu"
                        style="width: 400px;"
                        @on-change="stuChange"
                    >
                        <Option
                            v-for="(option, index) in studentNameList"
                            :value="option.id"
                            :label="option.name"
                            :key="index"
                        >
                            <span>{{ option.name }}</span>
                            <span style="float:right;color:#ccc">{{ option.phone }}</span>
                        </Option>
                    </Select>
                </FormItem>
                <FormItem 
                      v-if="typeTip=='stop'||typeTip=='delay'"
                      class="w100 ivu-radio-groupForm" :label="$t('modules_spoc_sign_web_src_views_editleavenum_components_editleavenummodify_6463')"
                      prop="type"
                      :rules="{required: true, message: $t('pushsettings_index_504'), trigger: 'change'}">
                    <RadioGroup @on-change="chooseGiveClass" v-model="editObj.type">
                       <Radio style="margin-right:80px;" label="1">{{$t('modules_spoc_sign_web_src_views_editleavenum_components_editleavenummodify_6465')}}</Radio>
                       <Radio label="0">{{$t('modules_spoc_sign_web_src_views_editleavenum_components_editleavenummodify_6466')}}</Radio>
                    </RadioGroup>
               </FormItem>
                <FormItem
                    :label="$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2618')"
                    class="w50 w50Style"
                    prop="courseId"
                    :rules="{required: true, message: $t('modules_spoc_sign_web_src_views_contractgeneration_component_modules_oto_5308'), trigger: 'change'}"
                >
                    <Input v-model="editObj.courseId" :placeholder="$t('modules_spoc_sign_web_src_views_editleavenum_components_editleavenummodify_6469')" style="display:none;width:200px;" />
                </FormItem>
                <div class="chooseCourseOut">
                    <chooseCourse
                        @courseChooseEmit="courseChooseEmit"
                        ref="chooseCourseRef"
                        :showCt="showCt"
                    ></chooseCourse>
                </div>
                
                <FormItem
                    v-if="typeTip==0"
                    :label="$t('modules_spoc_sign_web_src_views_editleavenum_components_editleavenummodify_6470')"
                    class="w100"
                    prop="num"
                    :rules="{ required: true, type: 'number', message: $t('modules_spoc_sign_web_src_views_editleavenum_components_editleavenummodify_6471'), trigger: 'change'}"
                >
                    <InputNumber :min="1" v-model="editObj.num" style="width: 82px"></InputNumber>
                    <span style="color:#999;font-size:14px;margin-left:8px;">{{$t('modules_spoc_jw_web_src_views_servicescharts_serviceschartspart5_3102')}}</span>
                </FormItem>
                <!-- f (this.typeTip == "stop") {
                this.labelText = $t("modules_spoc_sign_web_src_views_editleavenum_components_editleavenummodify_6473");
            } else if (this.typeTip == "delay") {
                this.labelText = $t("modules_spoc_sign_web_src_views_editleavenum_components_editleavenummodify_6474"); -->
                <FormItem
                    v-if="typeTip=='stop'||typeTip=='delay'"
                    :label="typeTip=='stop'?$t('modules_spoc_sign_web_src_views_editleavenum_components_editleavenummodify_6475'):$t('modules_spoc_sign_web_src_views_editleavenum_components_editleavenummodify_6476')"
                    class="w50"
                    prop="newEndDate"
                    :rules="{required: true, message: $t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_628'), trigger: 'change'}"
                >
                    <DatePicker
                      :disabled="!expiredDate"
                        :options="optionsDisableObj"
                        :value="editObj.newEndDate"
                        type="date"
                        :placeholder="$t('mycourse_mycourse_360')"
                        style="width: 400px;"
                        @on-change="newEndDateChange"
                    ></DatePicker>
                    <span
                        style="color:#999;font-size:14px;margin-left:10px"
                        v-if="editObj.newEndDate&&expiredDate"
                    >{{$t('modules_spoc_crm_web_src_views_customer360_components_flowup_796')}}<strong
                            style="color:#44BCB7"
                            v-if="editObj.newEndDate&&expiredDate"
                        >{{editObj.num}}</strong>{{$t('message_socket_304')}}</span>
                </FormItem>
                <!--    <FormItem v-else :label="$t('modules_spoc_sign_web_src_views_coursevalidityadjustment_components_validityperiodpopup_6080')" class="w50" prop="expressDate"  :rules="{required: true, message: $t('modules_spoc_sign_web_src_views_coursevalidityadjustment_components_validityperiodpopup_6073'), trigger: 'change'}">
                         <DatePicker v-model="formObj.expressDate" type="date" :placeholder="$t('mycourse_mycourse_360')" style="width: 400px;"></DatePicker> <span style="color:#999;font-size:14px;margin-left:10px">{{$t('modules_spoc_crm_web_src_views_customer360_components_flowup_796')}}<strong style='color:#44BCB7'>{{stopTime}}</strong>{{$t('message_socket_304')}}</span>  
                </FormItem>-->
                <FormItem
                    :label="$t('modules_spoc_sign_web_src_views_editleavenum_components_editleavenummodify_6483')"
                    class="w100 w100info"
                    prop="remarks"
                    :rules="{required: false, message: $t('modules_spoc_sign_web_src_views_editleavenum_components_editleavenummodify_6484'), trigger: 'change'}"
                >
                    <Input
                        v-model="editObj.remarks"
                        type="textarea"
                        :rows="4"
                        :placeholder="$t('modules_spoc_sign_web_src_views_editleavenum_components_editleavenummodify_6484')"
                    />
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import { waitUntil } from "@public/libs/util";
import valid, {
    errors,
    htLeaveApply,
    htValidApply,
    common
} from "../../../libs/request";
import chooseCourse from "../../courseValidityAdjustment/components/chooseCourse.vue";
import { setTimeout } from "timers";
export default {
    components: {
        chooseCourse,
    },
    data() {
        return {
            isActioning: false, //多次提交拦截
            addInfoObj:null, //从合同详情传递的详情
            /*  stuCourseObj:{
            }, */
            // labelText: "",
            optionsDisableObj: {},
            expiredDate: "",
            typeTip: "stop", //点击弹窗时候的地方判断
            titleName: "修改请假次数新增",
            loadingStu: false,
            studentNameList: [],
            showCt: false, //隐藏合同的单选按钮
            editModal: false,
            editModalLoading: true,
            editObj: {
                officeId: "",
                studentId: "",
                num: "",
                remarks: "",
                courseId: "",
                courseName: "",
                courseType: "",
                studentCourseId: "",
                ctId: "",
                type:'1',
                newEndDate: ""
            }
        };
    },
    mounted() {
        waitUntil(
            () => {
                return this.app.currOfficeId || false;
            },
            () => {
                if (this.app.currOfficeId=='all') {
                    // this.$set(this.findObj, "officeId", this.app.currOfficeId);
                    this.$set(this.editObj, "officeId", '');
                }else{
                    this.$set(this.editObj, "officeId", this.app.currOfficeId);
				}
                // this.getListData();
            }
        );
    },
    props: {
        officeIdList: {
            type: Array,
            default: []
        }
    },
    computed: {
        ...mapState(["app"])
    },
    watch: {
        "app.currOfficeId": function(val, oldVal) {
            if (oldVal && this.$route.name == "sign.editLeaveNum") {
                if (this.app.currOfficeId=='all') {
                    this.$set(this.editObj, "officeId", '');
                }else{
                    this.$set(this.editObj, "officeId", this.app.currOfficeId);
				}
            }
        }
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        chooseGiveClass(key) {
            if(key == '0'){ //延期
                    this.typeTip = "delay"
            }else if(key=="1"){ //终止
                this.typeTip = "stop";
            }
            this.editObj.newEndDate='';
            this.editObj.num='';
            if(this.expiredDate){
                let dataVal = new Date(this.expiredDate).getTime() - 86400000;
                if (this.typeTip == "stop") {
                    this.optionsDisableObj = {
                        disabledDate(date) {
                            return date && date.valueOf() > dataVal;
                        }
                    };
                } else if ( this.typeTip == "delay") {
                    this.optionsDisableObj = {
                        disabledDate(date) {
                            return date && date.valueOf() < dataVal;
                        }
                    };
                }
            }
        },
        stuChange(val) {
            this.studentNameList.forEach(v => {
                if (v.id == val) {
                    // this.stuCourseObj = v;
                    let obj = {
                        stuId: v.id,
                        officeId: this.editObj.officeId
                    };
                    if(this.addInfoObj){
                        obj.ctNo = this.addInfoObj.ctNo
                    }
                    setTimeout(() => {
                        this.$refs["chooseCourseRef"].courseList(obj);
                    }, 100);
                }
            });
        },
        editObjStuIdChange(val) {},
        newEndDateChange(val) {
            this.editObj.newEndDate = val;
            this.editObj.num = Math.abs(
                (new Date(this.expiredDate).getTime() -
                    new Date(this.editObj.newEndDate).getTime()) /
                    (1000 * 60 * 60 * 24)
            );
        },
        showTipsMethods(typeTip,titleName,addInfoObj) { //第三个参数为合同详情打开传递的参数
            // this.$refs["createCoursePackRef"].resetFields();
            this.expiredDate = "";
            this.editObj.num = "";
            this.expiredDate = "";
            this.editModal = true;
            this.titleName = titleName;
            //展示新增
            this.typeTip = typeTip;
            // if (this.typeTip == "stop") {
            //     this.labelText = "终止日期:";
            // } else if (this.typeTip == "delay") {
            //     this.labelText = "延期日期:";
            // }
            this.$nextTick(() => {
                this.$refs.createCoursePackRef.resetFields();
                this.$refs.chooseCourseRef.courseClear();
                this.$set(this.editObj, "type", typeTip == 'stop' ? '1' : '0');
                if(addInfoObj){ //从合同详情打开
                    this.addInfoObj = addInfoObj
                    this.studentNameList = [{
                        id: addInfoObj.ctStudnetId,
                        name: addInfoObj.ctStudnetName 
                    }]
                    console.log(addInfoObj.ctOfficeId)
                    this.$set(this.editObj, "officeId", addInfoObj.ctOfficeId);
                    this.$set(this.editObj, "studentId", addInfoObj.ctStudnetId);
                    this.stuChange(addInfoObj.ctStudnetId)
                } else {
                    this.addInfoObj = null
					if (this.app.currOfficeId=='all') {
						this.$set(this.editObj, "officeId", '');
					}else{
						this.$set(this.editObj, "officeId", this.app.currOfficeId);
					}
                }
            });
        },
        remoteStuName(query) {
            if(this.addInfoObj){
                return //从合同管理打开，不需要加载学生
            }
            if (query !== "") {
                if (typeof query == "object") {
                    return;
                }
                this.loadingStu = true;
                let params = {
                    name: query,
                    officeId:this.editObj.officeId
                };
                common
                    .listByOfficeIdAndName(params)
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            this.studentNameList = res.data.data;
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {
                        this.loadingStu = false;
                    });
            } else {
                this.studentNameList = [];
            }
        },
        courseChooseEmit(val, ctNo) {
            if (this.editObj.newEndDate) {
                this.editObj.newEndDate = "";
                this.editObj.num = "";
            }
            console.log("val:" + JSON.stringify(val));
            if (typeof val == "object") {
                this.editObj.courseId = val.courseId;
                this.editObj.courseName = val.courseName;
                this.editObj.courseType = val.courseType;
                this.editObj.studentCourseId = val.stuCourId;
                this.editObj.ctId = val.ctId;
                this.editObj.ctNo = ctNo;
                this.expiredDate = val.expiredDate;

                let dataVal = new Date(this.expiredDate).getTime() - 86400000;
                if (this.expiredDate && this.typeTip == "stop") {
                    this.optionsDisableObj = {
                        disabledDate(date) {
                            return date && date.valueOf() > dataVal;
                        }
                    };
                } else if (this.expiredDate && this.typeTip == "delay") {
                    this.optionsDisableObj = {
                        disabledDate(date) {
                            return date && date.valueOf() < dataVal;
                        }
                    };
                }
            } else {
                this.editObj.courseId = "";
                this.editObj.courseName = "";
                this.editObj.courseType = "";
                this.editObj.studentCourseId = "";
                this.expiredDate = "";
            }
        },

        officeIdChange() {
            this.editObj.studentId = "";
            this.studentNameList = [];
        },
        editCancel() {},
        //送审
        sendAudit(objectId) {
            this.updateLoadingStatus({ isLoading: true });
            let params;
            //请假
            if (this.typeTip == 0) {
                params = {
                    auditType: "contract leave",
                    officeId: this.editObj.officeId,
                    objectId: objectId,
                    studentId: this.editObj.studentId,
                    objectNo: this.editObj.ctId
                };
            }
            //有效期
            /* http://localhost:8005/spoc-contract/a/ws/common/comAuditFlow/sendAudit?officeId=&studentId=&auditType=contract valid&objectId= */
            else if (this.typeTip == "stop" || this.typeTip == "delay") {
                params = {
                    auditType: "contract valid",
                    officeId: this.editObj.officeId,
                    objectId: objectId,
                    studentId: this.editObj.studentId
                    // objectNo: this.editObj.ctId,
                };
            }
            common
                .sendAudit(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.$Message.success(res.data.message);
                        //刷新列表首页数据子组件调取父组件的方法
                        this.$emit("getListDataEmit", "");
                        this.editModal = false;
                        this.editModalLoading = true;
                    } else {
                        this.$Message.error(res.data.message);
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({
                        isLoading: false
                    });
                });
        },
        editOk() {
            // debugger;
            this.$refs.createCoursePackRef.validate(validRes => {
                if (validRes) {
                    if(this.isActioning){ //多次提交拦截
                        return
                    }
                    this.isActioning = true
                    this.updateLoadingStatus({
                        isLoading: true
                    });
                    /* type类型 : 0：延期；1：取消延期 */
                    let typeRqquest;
                    if (this.typeTip == "stop") {
                        this.editObj.type = "1";
                        typeRqquest = htValidApply;
                    } else if (this.typeTip == "delay") {
                        this.editObj.type = "0";
                        typeRqquest = htValidApply;
                    } else if (this.typeTip == "0") {
                        typeRqquest = htLeaveApply;
                    }
                    typeRqquest
                        .save(this.editObj)
                        .then(valid.call(this))
                        .then(res => {
                            if (res.ok) {
                                /*  if(this.typeTip=="0"){
                                    this.updateLoadingStatus({
                                        isLoading: true
                                    });
                                  this.sendAudit(res.data.data.id);
                                }
                                else if(this.typeTip=="stop"||this.typeTip=="delay"){
                                    this.sendAudit(res.data.data);
                                }else{ */
                                this.$Message.success(this.$t('modules_spoc_portal_views_rolepermission_component_permissionallocation_3819'));
                                //刷新列表首页数据子组件调取父组件的方法
                                this.$emit("getListDataEmit", "");
                                this.editModal = false;
                                this.editModalLoading = true;
                                // }
                            } else {
                                this.editModalLoading = false;
                                this.editModal = true;
                                setTimeout(() => {
                                    this.editModalLoading = true;
                                }, 0);
                            }
                        })
                        .catch(errors.call(this))
                        .finally(() => {
                            this.updateLoadingStatus({
                                isLoading: false
                            });
                            setTimeout(()=>{
                                //多次提交拦截
                                this.isActioning = false
                            },200)
                        });
                } else {
                    this.editModalLoading = false;
                    this.editModal = true;
                    setTimeout(() => {
                        this.editModalLoading = true;
                    }, 0);
                }
            });
        }
    }
};
</script>
