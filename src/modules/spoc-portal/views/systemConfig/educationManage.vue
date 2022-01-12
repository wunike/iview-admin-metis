<style lang="less">
.educationManage {
    .modelEducation {
        .ivu-form-item-label {
            text-align: left;
            padding-left: 16px;
            font-size: 14px;
        }
        .ivu-tooltip-content {
            .ivu-tooltip-inner {
                background: #ffffff;
                color: #565656;
            }
            .ivu-tooltip-arrow {
                border-right-color: #ffffff;
            }
        }
        .ivu-tooltip-rel {
            i {
                cursor: pointer;
                &:hover {
                    color: #565656 !important;
                }
            }
        }
        .hint {
            padding-top: 8px;
            font-size: 12px;
            color: #999;
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            height: 24px;
            line-height: 1.2em;
            i {
                line-height: 13px;
            }
            &.implement {
                height: 24px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding-top: 0;
            }
        }
        .idExample {
            width: 420px;
            height: 150px;
            background-color: #fafafa;
            border: 1px solid #ddd;
            text-align: center;
            vertical-align: top;
            font-size: 32px;
            line-height: 150px;
            margin: 10px 0 20px;
        }
        .studentSave {
            width: 420px;
            text-align: right;
        }
        .new_state {
            color: #357eee;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin: 12px 0 0;
            a {
                i {
                    line-height: 14px;
                }
                span {
                    line-height: 14px;
                }
            }
        }
        .stateOther {
            span {
                color: #495060;
                cursor: context-menu;
                font-weight: 700;
            }
        }
        .hand_status {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .say {
                padding-left: 30px;
            }
        }
        .statusTable {
            .ivu-table-cell {
                span {
                    line-height: 1.2em;
                }
            }
        }
        .renewal {
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            margin-bottom: 12px;
        }
        .lesson {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            div,
            .hint {
            }
        }
        .attendance {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            div,
            .hint {
            }
        }
        .labelP0 {
            .ivu-form-item-label {
                padding-left: 0;
            }
        }
        .width165 {
            width: 165px;
            min-width: 165px;
        }
        .width250 {
            width: 250px;
            min-width: 250px;
        }
    }
}
</style>

<template>
    <div class="educationManage">
        <Form ref="formEducation" :model="modelEducation" :rules="ruleEducation" :label-width="160" class="modelEducation">
            <FormItem label="学号规则配置" v-if="showMap[4001]">
                <RadioGroup v-model="studentcode.valueObject.codeTemplate" vertical @on-change="stencilChange">
                    <!-- :disabled="studentcode.valueObject.isInit == 1" -->
                    <Radio
                        label="1"
                    >
                        <span>模板一（10位自动递增编号）</span>
                    </Radio>
                    <!-- :disabled="studentcode.valueObject.isInit == 1" -->
                    <Radio
                        label="2"
                    >
                        <span>模板二（YYYYMMDD+4位自动编号）</span>
                    </Radio>
                </RadioGroup>
                <!-- <p class="hint">
                    <Icon type="ios-information-circle" :size="16" color="#ccc" />
                    &nbsp;学号规则配置只支持一次设定，请慎重操作！
                </p> -->
                <div class="idExample" v-text="studentcode.valueObject.codeTemplate == 1 ? 1904130001 : 'YYYYMMDD0001'"></div>
                <!-- :disabled="studentcode.valueObject.isInit == 1" -->
                <div class="studentSave"><Button type="primary" @click="saveCode" >保存</Button></div>
            </FormItem>
            <Divider v-if="showMap[4002]"/>
            <FormItem v-if="showMap[4002]">
                <div slot="label" style="display: flex;align-items: center;">
                    学员状态规则 &nbsp;
                    <Tooltip content="" :max-width="246" placement="right">
                        <CommonIcon type="_tishi" :size="14" color="#ccc" :style="{ marginTop: '0px', display: 'inline-block', verticalAlign: 'middle' }" />
                        <div slot="content" style="background: #FFFFFF;">
                            学员状态为系统每天更新的数据，其中学员最后上课日期至今取学员的合同课程的最后上课日期，新签合同时合同课程的最后上课日期默认为签约日期，上课扣费后更新最后上课日期
                        </div>
                    </Tooltip>
                </div>
                <Table :columns="coursesCol" :data="coursesList" :width="860" class="statusTable"></Table>
                <p class="new_state">
                    <a href="javascript:void(0);" @click="openCondSet('新增状态', coursesLength, true)">
                        <Icon type="md-add" :size="15" />
                        <span>新增状态</span>
                    </a>
                </p>
                <p class="stateOther">
                    当学员的状态不符合上述规则时，学员状态将为
                    <span>其他</span>
                </p>
                <FormItem label="手动改状态" class="labelP0">
                    <Checkbox v-model="coursestudentstatus.valueObject.isManualModify" true-value="1" false-value="0" @on-change="saveConditionSet(false)">允许</Checkbox>
                </FormItem>
                <FormItem label="若手动修改学员状态为" class="labelP0">
                    <div class="hand_status">
                        <CheckboxGroup v-model="coursestudentstatus.valueObject.manualModifyStatuses" @on-change="saveConditionSet(false)">
                            <Checkbox :label="item.id" v-for="(item, index) in coursestudentstatus.valueObject.statuses" :key="index" v-show="item.name">
                                <span>{{ item.name }}</span>
                            </Checkbox>
                        </CheckboxGroup>
                        <span class="say">则更新时不更新此类学员的状态</span>
                    </div>
                </FormItem>
            </FormItem>
            <Divider v-if="showMap[4003]"/>
            <FormItem label="续费预警配置" v-if="showMap[4003]">
                <div class="renewal">
                    <div style="line-height: 1.4em;padding-top: 7px;">班课续费预警&nbsp;(默认)</div>
                    &emsp;
                    <div>学员的班课课程</div>
                    &emsp;
                    <Select v-model="renewwarn.valueObject.classCourse.field" style="width:180px" label-in-value @on-change="fieldRenewwarnChange">
                        <Option value="hours" label="剩余课时"></Option>
                        <Option value="day" label="剩余有效期"></Option>
                        <Option value="hoursAndDay" label="剩余课时并且剩余有效期"></Option>
                        <Option value="hoursOrDay" label="剩余课时或剩余有效期"></Option>
                    </Select>
                    &emsp;
                    <div>不足</div>
                    &emsp;
                    <Input v-model="renewwarn.valueObject.classCourse.hours" @on-change="setNumber" @on-blur="saveRenewwarn" style="width: 120px;" v-if="showHours">
                        <span slot="append">课时</span>
                    </Input>
                    &emsp;
                    <Input v-model="renewwarn.valueObject.classCourse.day" @on-change="setNumber" @on-blur="saveRenewwarn" style="width: 120px;" v-if="showDay">
                        <span slot="append">天</span>
                    </Input>
                    <div>
                    &emsp;，则更新时不更新此类学员的状态</div>
                </div>
                <p class="hint implement">
                    <Icon type="ios-information-circle" :size="16" color="#ccc" />
                    &nbsp;续费预警学员将在桌面续费预警和续费预警列表显示！

                    <Button type="primary" size="small" @click="saveRenewwarn">保存</Button>
                </p>
            </FormItem>
            <Divider v-if="showMap[4004]"/>
            <FormItem label="排课配置" v-if="showMap[4004]">
                <div class="lesson">
                    <div class="width250">允许排冲突课程</div>
                    &emsp;
                    <div class="width165">
                        <CheckboxGroup v-model="lessonsetting.valueObject.allowConflict" @on-change="saveLessonSet"><Checkbox label="classCourse">允许</Checkbox></CheckboxGroup>
                    </div>
                    <p class="hint">
                        <Icon type="ios-information-circle" :size="16" color="#ccc" />
                        &nbsp;若不允许，则排课或修改排课时，存在冲突的课程将不允许保存
                    </p>
                </div>
            </FormItem>
            <Divider v-if="showMap[4005]"/>
            <FormItem label="考勤扣费配置" v-if="showMap[4005]">
                <div class="attendance">
                    <div class="width250">允许修改实扣课时</div>
                    &emsp;
                    <div class="width165">
                        <CheckboxGroup v-model="attendancededuction.valueObject.modifyRealDeductionHours" @on-change="saveAttendance">
                            <Checkbox label="classCourse">允许</Checkbox>
                        </CheckboxGroup>
                    </div>
                    <p class="hint">
                        <Icon type="ios-information-circle" :size="16" color="#ccc" />
                        &nbsp;开启后，对应类型的课程考勤扣费时，能修改实际上课课时
                    </p>
                </div>
                <div class="attendance">
                    <div class="width250">班课缺勤扣课时</div>
                    &emsp;
                    <div class="width165">
                        <Checkbox v-model="attendancededuction.valueObject.isClassCourseDeductionHours" true-value="1" false-value="0" @on-change="saveAttendance">允许</Checkbox>
                    </div>
                    <p class="hint">
                        <Icon type="ios-information-circle" :size="16" color="#ccc" />
                        &nbsp;开启后班课考勤时缺勤学员默认扣课时扣费
                    </p>
                </div>
                <div class="attendance">
                    <div class="width250">欠费课程允许考勤扣费</div>
                    &emsp;
                    <div class="width165">
                        <CheckboxGroup v-model="attendancededuction.valueObject.allowArrears" @on-change="saveAttendance">
                            <Checkbox label="classCourse">允许</Checkbox>
                        </CheckboxGroup>
                    </div>
                    <p class="hint">
                        <Icon type="ios-information-circle" :size="16" color="#ccc" />
                        &nbsp;开启后，对应类型的课程剩余课时为0时，可继续考勤扣费，扣费后剩余课时为负数
                    </p>
                </div>
            </FormItem>
        </Form>
        <condition-set ref="conditionSet" :coursesList="coursestudentstatus.valueObject.statuses" v-if="showCondSet" @close="closeCondSet" @ok="saveConditionSet"></condition-set>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import conditionSet from './conditionSet.vue';
import CommonIcon from '_c/common-icon';
import valid, { errors, sysConfig, ssCaseCard, common } from '../../libs/request.js';
export default {
    data() {
        return {
            showCondSet: false,
            studentcode: {
                id: '',
                configId: '',
                valueObject: {
                    codeTemplate: '1',
                    codeTemplateName: '10位自动递增编号',
                    isInit: '0'
                },
                menuId: '0',
                remarks: ''
            },
            coursestudentstatus: {
                configId: 'jw:coursestudentstatus',
                configName: null,
                createDate: null,
                id: '16',
                menuId: '0',
                module: null,
                remarks: '学员状态规则',
                sysNotificationReceiptList: [],
                sysUserLinkList: [],
                value: '',
                valueObject: {
                    statuses: [],
                    default: '9',
                    defaultName: '其他',
                    isManualModify: '1',
                    manualModifyStatuses: ['4']
                }
            },
            renewwarn: {
                configId: 'jw:renewwarn',
                configName: null,
                createDate: null,
                id: '17',
                ids: [],
                menuId: '0',
                module: null,
                remarks: '续费预警配置',
                sysNotificationReceiptList: [],
                sysUserLinkList: [],
                updateDate: '2019-04-23 15:09:52',
                value: '',
                valueObject: {
                    classCourse: {
                        field: 'hours',
                        fieldName: '课时',
                        hours: "0",
                        day: "9"
                    }
                }
            },
            lessonsetting: {
                configId: 'jw:lessonsetting',
                configName: null,
                createDate: null,
                id: '18',
                ids: [],
                menuId: '0',
                module: null,
                remarks: '排课配置',
                sysNotificationReceiptList: [],
                sysUserLinkList: [],
                updateDate: '2019-04-23 15:12:04',
                value: '',
                valueObject: {
                    allowConflict: ['classCourse']
                }
            },
            attendancededuction: {
                configId: 'jw:attendancededuction',
                configName: null,
                createDate: null,
                id: '19',
                ids: [],
                menuId: '0',
                module: null,
                remarks: '考勤扣费配置',
                sysNotificationReceiptList: [],
                sysUserLinkList: [],
                updateDate: '2019-04-23 15:13:55',
                value: '',
                valueObject: {
                    modifyRealDeductionHours: ['classCourse'],
                    isClassCourseDeductionHours: '1',
                    allowArrears: ['classCourse']
                }
            },
            modelEducation: {},
            ruleEducation: {},
            coursesCol: [
                {
                    title: '状态名称',
                    key: 'name',
                    width: 160
                },
                {
                    title: '参数值',
                    key: 'age',
                    render: (h, params) => {
                        return h('div', {}, params.row.remarks.split('，')[0].substring(2));
                    }
                },
                {
                    title: '说明',
                    key: 'remarks'
                },
                {
                    title: '操作',
                    width: 160,
                    render: (h, params) => {
                        return h(
                            'div',
                            {
                                style: {
                                    width: '70px'
                                }
                            },
                            [
                                h(
                                    'a',
                                    {
                                        style: {
                                            float: 'left',
                                            display: params.row.isSys == 1 ? 'none' : ''
                                        },
                                        attrs: {
                                            href: 'javascript:void(0);'
                                        },
                                        on: {
                                            click: () => {
                                                this.openCondSet('修改状态', params.row.id);
                                            }
                                        }
                                    },
                                    '修改'
                                ),
                                h(
                                    'a',
                                    {
                                        style: {
                                            float: 'right',
                                            display: params.row.isSys == 1 ? 'none' : '',
                                            color: 'red'
                                        },
                                        attrs: {
                                            href: 'javascript:void(0);'
                                        },
                                        on: {
                                            click: () => {
                                                this.delCondSet(params.row.id);
                                            }
                                        }
                                    },
                                    '删除'
                                )
                            ]
                        );
                    }
                }
            ],
            showMap:{
                '4001':false,
                '4002':false,
                '4003':false,
                '4004':false,
                '4005':false,
            }
        };
    },
    computed: {
        coursesList() {
            let otherId = this.coursestudentstatus.valueObject.default;
            return this.coursestudentstatus.valueObject.statuses.filter(item => {
                return item.id != otherId && !!item.remarks.split('，')[0].substring(2) && item.name;
            });
        },
        coursesLength() {
            return this.coursestudentstatus.valueObject.statuses.length;
        },
        showHours(){
            let value=this.renewwarn.valueObject.classCourse.field;
            if(value=='hours'||value=='hoursAndDay'||value=='hoursOrDay'){
                return true;
            }else{
                return false;
            }
        },
        showDay(){
            let value=this.renewwarn.valueObject.classCourse.field;
            if(value=='day'||value=='hoursAndDay'||value=='hoursOrDay'){
                return true;
            }else{
                return false;
            }
        }
    },
    components: {
        conditionSet,
        CommonIcon
    },
    created() {
        this.getInit();
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        getInit() {
            this.updateLoadingStatus({
                isLoading: true
            });
            sysConfig
                .getList({
                    id: 4001
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let obj = res.data.data;
                        if(obj){
                            obj.valueObject = JSON.parse(res.data.data.value);
                            this.showMap[4001]=true
                        }else{
                            this.showMap[4001]=false
                        }
                        this.studentcode = obj;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({
                        isLoading: false
                    });
                });
            sysConfig
                .getList({
                    id: 4002
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let obj = res.data.data;
                        if(obj){
                            obj.valueObject = JSON.parse(res.data.data.value);
                            this.showMap[4002]=true
                        }else{
                            this.showMap[4002]=false
                        }
                        this.coursestudentstatus = obj;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({
                        isLoading: false
                    });
                });
            sysConfig
                .getList({
                    id: 4003
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let obj = res.data.data;
                        if(obj){
                            obj.valueObject = JSON.parse(res.data.data.value);
                            this.showMap[4003]=true
                        }else{
                            this.showMap[4003]=false
                        }
                        this.renewwarn = obj;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({
                        isLoading: false
                    });
                });
            sysConfig
                .getList({
                    id: 4004
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let obj = res.data.data;
                        if(obj){
                            obj.valueObject = JSON.parse(res.data.data.value);
                            this.showMap[4004]=true
                        }else{
                            this.showMap[4004]=false
                        }
                        this.lessonsetting = obj;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({
                        isLoading: false
                    });
                });
            sysConfig
                .getList({
                    id: 4005
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let obj = res.data.data;
                        if(obj){
                            obj.valueObject = JSON.parse(res.data.data.value);
                            this.showMap[4005]=true
                        }else{
                            this.showMap[4005]=false
                        }
                        this.attendancededuction = obj;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({
                        isLoading: false
                    });
                });
        },
        stencilChange(val) {
            if (val == 1) {
                this.studentcode.valueObject.codeTemplateName = '10位自动递增编号';
            } else {
                this.studentcode.valueObject.codeTemplateName = 'YYYYMMDD+4位自动编号';
            }
        },
        saveCode() {
            this.updateLoadingStatus({
                isLoading: true
            });
            this.studentcode.valueObject.isInit = '1';
            sysConfig
                .save(this.studentcode)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.$Message.success({
                            content: res.data.message
                        });
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({
                        isLoading: false
                    });
                });
        },
        saveConditionSet(flag = true) {
            this.updateLoadingStatus({
                isLoading: true
            });
            console.log(this.coursestudentstatus)
            sysConfig
                .save(this.coursestudentstatus)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        if (flag) {
                            this.$refs.conditionSet.close();
                        }
                        this.$Message.success({
                            content: res.data.message
                        });
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({
                        isLoading: false
                    });
                });
        },
        saveRenewwarn() {
            this.updateLoadingStatus({
                isLoading: true
            });
            sysConfig
                .save(this.renewwarn)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        // this.$Message.success({
                        //     content: res.data.message
                        // });
                        this.implement()
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({
                        isLoading: false
                    });
                });
        },
        saveLessonSet() {
            this.updateLoadingStatus({
                isLoading: true
            });
            sysConfig
                .save(this.lessonsetting)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.$Message.success({
                            content: res.data.message
                        });
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({
                        isLoading: false
                    });
                });
        },
        saveAttendance() {
            this.updateLoadingStatus({
                isLoading: true
            });
            sysConfig
                .save(this.attendancededuction)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.$Message.success({
                            content: res.data.message
                        });
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    // this.updateLoadingStatus({
                    //     isLoading: false
                    // });
                });
        },
        fieldRenewwarnChange(val) {
            this.renewwarn.valueObject.classCourse.fieldName = val.label;
            this.saveRenewwarn();
        },
        openCondSet(tit, num, isAdd) {
            let arr = this.coursestudentstatus.valueObject.statuses;
            if (arr.length >= this.coursestudentstatus.valueObject.default && isAdd) {
                this.$Modal.warning({
                    title: '警告',
                    content: '状态规则已达到最大值，请删除后添加！'
                });
                return;
            }
            let ids = ['1', '2', '3', '4', '5', '6', '7', '8'];
            let idNum = [];
            ids.forEach(v => {
                let flag = arr.some(val => {
                    return v == val.id;
                });
                if (!flag) {
                    idNum.push(v);
                }
            });
            if (!idNum.length && isAdd) {
                this.$Modal.warning({
                    title: '警告',
                    content: '状态规则已达到最大值，请删除后添加！'
                });
                return;
            }
            let obj = {
                id: idNum[0],
                name: '',
                logicalOperation: 'and',
                conditions: [
                    {
                        isDict: '',
                        field: '',
                        fieldName: '',
                        operation: '',
                        operationName: '',
                        value: '',
                        valueName: ''
                    }
                ],
                remarks: '',
                isHide: '0'
            };
            if (isAdd) {
                arr.splice(arr.length - 1, 0, obj);
                num = idNum[0];
            }
            this.coursestudentstatus.valueObject.statuses.sort((a, b) => {
                return a.id - b.id;
            });
            this.showCondSet = true;
            this.$nextTick(() => {
                this.$refs.conditionSet.showModal(tit, num);
            });
        },
        closeCondSet() {
            this.showCondSet = false;
            this.getInit();
        },
        delCondSet(ind) {
            let num = '';
            let arr = this.coursestudentstatus.valueObject.statuses;
            arr.forEach((v, k) => {
                if (v.id == ind) {
                    num = k;
                }
            });

            this.$Modal.confirm({
                title: '提示',
                content: '是否删除该状态规则，一经删除无法恢复！',
                onOk: () => {
                    this.coursestudentstatus.valueObject.statuses.splice(num, 1);
                    this.saveConditionSet(false);
                },
                onCancel: () => {}
            });
        },
        setNumber(e) {
            let val=e.target.value;
            this.renewwarn.valueObject.classCourse.value = '' + (val||0);
        },
        implement() {
            this.updateLoadingStatus({
                isLoading: true
            });
            common
                .comAlarmRenewRenewalWarn()
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.$Message.success('执行系统配置成功');
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({
                        isLoading: false
                    });
                });
        }
    }
};
</script>
