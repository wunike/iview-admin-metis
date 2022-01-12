<style lang="less">
    .clientManage {
        .modelEducation {
            .ivu-form-item-label {
                text-align: left;
                padding-left: 16px;
                font-size: 14px;
            }
            .ivu-tooltip-content {
                .ivu-tooltip-inner {
                    background: #FFFFFF;
                    color: #565656;
                }
                .ivu-tooltip-arrow {
                    border-right-color: #FFFFFF;
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
            .hint-copy {
                /*padding-top: 8px;*/
                font-size: 12px;
                color: #999;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                height: 32px;
                line-height: 32px;
                i{
                    line-height: 13px;
                }
                &.active{
                    color:#495060;
                    font-size: 12px;
                }
            }
            .idExample {
                width: 420px;
                height: 150px;
                background-color: #FAFAFA;
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
            .save-button{
                margin-top:20px;
                margin-left:364px;
                /*text-align: right;*/
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
                    color: #357eee;
                    cursor: pointer;
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
            .renewal{
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                margin-bottom: 12px;
            }
            .lesson{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                margin-bottom:10px;
                .lesson-item{
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                }
                div,.hint-copy{
                }
            }
            .lesson-item-content{
                margin-left:30px;
                display: flex;
                justify-content: flex-start;
            }
            .attendance{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                div,.hint-copy{
                }
            }
            .labelP0{
                .ivu-form-item-label{
                    padding-left: 0;
                }
            }
            .width165{
                width: 165px;
                min-width: 165px;
            }
            .width250{
                width: 250px;
                min-width: 250px;
            }
        }
        .common-span{
            width:120px;
        }
    }
</style>

<template>
    <div class="clientManage">
        <Form ref="formEducation" :label-width="160" class="modelEducation">
            <FormItem label="客户编号规则">
                <RadioGroup v-model="studentcode.select" vertical @on-change="stencilChange">
                    <Radio
                        v-for="(item, index) in studentcode.lists"
                        :key="index"
                        :disabled="studentcode.isInit==1"
                        :label="item.codeTemplateNo"
                        v-if="studentcode.lists && studentcode.lists.length">
                        <span>模板{{index | capitalizedNumber }}（{{item.codeTemplateName}}）</span>
                    </Radio>
                </RadioGroup>
                <p class="hint-copy">
                    <Icon type="ios-information-circle" :size="16" color="#ccc" />&nbsp;客户编号规则配置只支持一次设定，请慎重操作！
                </p>
                <div class="idExample" v-text="studentcode.codeTemplate"></div>
                <div class="save-button">
                    <Button type="primary" :disabled="studentcode.isInit==1" @click="saveInit('crm:codeRule')">保存</Button>
                </div>
            </FormItem>
            <Divider v-if="ifShow"/>
            <FormItem label="客户公共规则" v-if="ifShow">
                <div class="lesson">
                    <!--<Checkbox v-model="allocPool.enableLable" @on-change="changeAllocPool">启用</Checkbox>-->
                    <p class="hint-copy active">
                        配置客户公共规则
                    </p>
                    <div class="lesson-item-content">
                        <Checkbox @on-change="selectedChange" v-model="cusExprieTime.selected">是否选中</Checkbox>
                        <div style="margin-left:20px;">
                            <span>分钟数：</span>
                            <Input-number @on-change="selectedChange" size="small" :min="0" v-model="cusExprieTime.time"></Input-number>
                        </div>
                    </div>
                </div>
                <div class="save-button">
                    <Button type="primary" :disabled="cusExprieTimeIsChange" @click="saveInit('crm:cusComRule')">保存</Button>
                </div>
            </FormItem>
            <Divider/>
            <FormItem label="分单池规则">
                <div class="lesson">
                    <!--<Checkbox v-model="allocPool.enableLable" @on-change="changeAllocPool">启用</Checkbox>-->
                    <p class="hint-copy active">
                        配置分单池功能，分单员角色可以通过分单池统一进行资源分配、撤回、再分配
                    </p>
                    <Select style="margin-left:20px;width:300px;" placeholder="请选择角色"  @on-change="changeAllocPool" v-model="selectedRoles" multiple clearable>
                        <Option v-for="item in roleList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </div>
                <div class="save-button">
                    <Button type="primary" :disabled="!allocPool.isChange" @click="saveInit('crm:allocPool')">保存</Button>
                </div>
            </FormItem>
            <Divider v-if="publicLibraryRule.configItem.length"/>
            <FormItem label="公共库规则" v-if="publicLibraryRule.configItem.length">
                <div class="lesson">
                    <!--<div class="lesson-item">-->
                        <!--<Checkbox v-model="publicLibraryRule.enableLable" @on-change="changePublicLibraryRule">启用</Checkbox>-->
                    <!--</div>-->
                    <p class="hint-copy active">
                        <!--<Icon type="ios-information-circle" :size="16" color="#ccc" />&nbsp;-->
                        配置公共库功能，未及时领取的资源会掉落到公共库，销售人员可以从公共库抢单
                    </p>
                </div>
                <div class="lesson" v-for="(item, index) in publicLibraryRule.configItem" :key="index">
                    <div>
                        <Checkbox label="classCourse" @on-change="changePublicLibraryRule">{{item.itemName}}</Checkbox>
                    </div>
                    <Input style="width:130px;margin-right:6px;" v-model="item.value" placeholder="请输入" @on-change="changePublicLibraryRule">
                        <span slot="append">分钟</span>
                    </Input>
                    <p class="hint-copy" v-if="item.itemValue == 'allocDropTime'">
                        <Icon type="ios-information-circle" :size="16" color="#ccc" />&nbsp;
                        分单后领取资源的最大时长，超过该时长资源自动掉落公共库
                    </p>
                    <p class="hint-copy" v-else-if="item.itemValue == 'grabDropTime'">
                        <Icon type="ios-information-circle" :size="16" color="#ccc" />&nbsp;
                        抢单后打通首电的最大时长，超过该时长资源自动掉落公共库
                    </p>
                    <p class="hint-copy" v-else-if="item.itemValue == 'maxGrabCount'">
                        <Icon type="ios-information-circle" :size="16" color="#ccc" />&nbsp;
                        销售能够抢单的资源最大数量，达到这个数量后不能继续抢单
                    </p>
                    <p class="hint-copy" v-else-if="item.itemValue == 'cusRecoveryTime'">
                        <Icon type="ios-information-circle" :size="16" color="#ccc" />&nbsp;
                        销售人员领取资源后没跟进的最大时长，超过该时长资源自动掉落公共库
                    </p>
                    <p class="hint-copy" v-else-if="item.itemValue == 'cusInvalidTime'">
                        <Icon type="ios-information-circle" :size="16" color="#ccc" />&nbsp;
                        资源失效的最大时长，超过该时长资源自动掉落公共库并失效，此时资源可在重新激活时变更来源
                    </p>
                </div>
                <div class="lesson">
                    <div>
                        <Button  style="margin-right:16px;" @click="setWhiteName">白名单设置（ <span style="color:#FF0000;">{{publicLibraryRule.whiteList.length}}</span>人）</Button>
                        <p class="hint-copy" style="display: inline-block">
                            <Icon type="ios-information-circle" :size="16" color="#ccc" />&nbsp;白名单人员分配、领取、抢单资源，不参与掉落
                        </p>
                    </div>
                </div>
                <div class="save-button">
                    <Button type="primary" :disabled="!publicLibraryRule.isChange" @click="rightNowFn('crm:publicLibraryRule')" style="margin-right:16px;">立即生效</Button>
                    <Button type="primary" :disabled="!publicLibraryRule.isChange" @click="toSomeTime('crm:publicLibraryRule')" style="margin-right:8px;">指定时间生效</Button>
                    <p class="hint-copy" style="display: inline-block">
                        <Icon type="ios-information-circle" :size="16" color="#ccc" />&nbsp;高危操作，需要输入验证码确认
                    </p>
                </div>
            </FormItem>
            <Divider v-if="tmkLibraryRule.configItem.length"/>
            <FormItem label="TMK库规则" v-if="tmkLibraryRule.configItem.length">
                <div class="lesson">
                    <!--<Checkbox v-model="tmkLibraryRule.enableLable" @on-change="changeTmkLibraryRule">启用</Checkbox>-->
                    <p class="hint-copy active">
                        <!--<Icon type="ios-information-circle" :size="16" color="#ccc" />&nbsp;-->
                        TMK库相当于于优先级较低的二级公共库，启用后公共库会开启TMK库，无效放弃的资源，公共库超过特定时长未领取的资源，TMK人员可以抢单
                    </p>
                </div>
                <div class="lesson" v-for="(item, index) in tmkLibraryRule.configItem" :key="index">
                    <div>
                        <Checkbox label="classCourse" @on-change="changeTmkLibraryRule">{{item.itemName}}</Checkbox>
                    </div>
                    <Input style="width:130px;margin-right:6px;" v-model="item.value" placeholder="请输入" @on-change="changeTmkLibraryRule">
                        <span slot="append">分钟</span>
                    </Input>
                    <p class="hint-copy" v-if="item.itemValue == 'tmkDropTime'">
                        <Icon type="ios-information-circle" :size="16" color="#ccc" />&nbsp;
                        公共库资源掉落的最大时长，超过该时长TMK人员可以抢单
                    </p>
                    <p class="hint-copy" v-else-if="item.itemValue == 'cusRecoveryTime'">
                        <Icon type="ios-information-circle" :size="16" color="#ccc" />&nbsp;
                        TMK人员领取资源后没跟进的最大时长，超过该时长资源自动掉落公共库
                    </p>
                </div>
                <div class="save-button">
                    <Button type="primary" :disabled="!tmkLibraryRule.isChange" @click="rightNowFn('crm:tmkLibraryRule')" style="margin-right:16px;">立即生效</Button>
                    <Button type="primary" :disabled="!tmkLibraryRule.isChange" @click="toSomeTime('crm:tmkLibraryRule')" style="margin-right:8px;">指定时间生效</Button>
                    <p class="hint-copy" style="display: inline-block">
                        <Icon type="ios-information-circle" :size="16" color="#ccc" />&nbsp;高危操作，需要输入验证码确认
                    </p>
                </div>
            </FormItem>
            <Divider v-if="recordRule.configItem.length"/>
            <FormItem label="录音规则" v-if="recordRule.configItem.length">
                <div class="lesson active">
                    <!--<div class="lesson-item">-->
                        <!--<Checkbox v-model="recordRule.enableLable" @on-change="changeRecordRule">启用</Checkbox>-->
                    <!--</div>-->
                    <p class="hint-copy">
                        <!--<Icon type="ios-information-circle" :size="16" color="#ccc" />&nbsp;-->
                        配置App录音和录音管理功能
                    </p>
                </div>
                <div class="lesson" v-for="(item, index) in recordRule.configItem" :key="index">
                    <div>
                        <Checkbox label="classCourse" @on-change="changeRecordRule">{{item.itemName}}</Checkbox>
                    </div>
                    <Input style="width:130px;margin-right:6px;" v-model="item.value" placeholder="请输入" @on-change="changeRecordRule">
                        <span slot="append">分钟</span>
                    </Input>
                    <p class="hint-copy" v-if="item.itemValue == 'itemValue'">
                        <Icon type="ios-information-circle" :size="16" color="#ccc" />&nbsp;
                        通话录音的最小时长，超过该时长的通话录音才会被系统保存
                    </p>
                    <p class="hint-copy" v-else-if="item.itemValue == 'recordSaveDuration'">
                        <Icon type="ios-information-circle" :size="16" color="#ccc" />&nbsp;
                        通话录音保存的最大时长，超过该时长的通话录音会被系统自动删除，当不设置时，所有录音会一直保留
                    </p>
                </div>
                <div class="save-button">
                    <Button type="primary" :disabled="!recordRule.isChange" @click="saveInit('crm:recordRule')" style="margin-right:16px;">保存</Button>
                    <p class="hint-copy" style="display: inline-block">
                        <Icon type="ios-information-circle" :size="16" color="#ccc" />&nbsp;高危操作，需要输入验证码确认
                    </p>
                </div>
            </FormItem>
            <Divider />
            <FormItem label="计划指标">
                <div class="lesson">
                    <div class="item-label" style="width:120px;">
                        计划下达指标项
                    </div>
                    <div class="hint-copy">
                        <CheckboxGroup v-model="plays" @on-change="playsChange">
                            <Checkbox  v-for="items in playsList"
                                       :key="items.name"
                                       :label="items.name"
                                       style="margin-right: 20px;">{{items.title}}
                            </Checkbox>
                        </CheckboxGroup>
                    </div>
                </div>
                <div class="save-button">
                    <Button type="primary" :disabled="!isChangePlay"  @click="saveInit('crm:plan')" style="margin-right:16px;">保存</Button>
                </div>
            </FormItem>
            <Divider />
            <FormItem label="同名客户检测">
                <div class="lesson">
                    <CheckboxGroup v-model="detection" @on-change="detectionChange">
                        <Checkbox v-for="item in detectionList" :key="item.name" :label="item.name" style="margin-right: 20px;" :disabled="detection.length==1&&detection.indexOf(item.name)!=-1">
                            {{item.title}}
                        </Checkbox>
                    </CheckboxGroup>
                    <p class="hint-copy">
                        <Icon type="ios-information-circle" :size="16" color="#ccc" />&nbsp;
                        新增客户时，勾选项为同名客户的判定条件，至少选择一个判重条件，若选择多个条件只要满足其中一个即判定为重复
                    </p>
                </div>
                <div class="save-button">
                    <Button type="primary" :disabled="!isChangeDetection"  @click="saveInit('crm:rptRule')" style="margin-right:16px;">保存</Button>
                </div>
            </FormItem>
            <Divider />
            <FormItem label="同名客户查重">
                <div class="lesson">
                    <CheckboxGroup v-model="cnki" @on-change="cnkiChange">
                        <Checkbox v-for="item in cnkiList" :key="item.name" :label="item.name" style="margin-right: 20px;">
                            {{item.title}}
                        </Checkbox>
                    </CheckboxGroup>
                    <p class="hint-copy">
                        <Icon type="ios-information-circle" :size="16" color="#ccc" />&nbsp;
                        设置用于查重的字段
                    </p>
                </div>
                <div class="save-button">
                    <Button type="primary" :disabled="!isChangeCnki"  @click="saveInit('crm:searchRptRule')" style="margin-right:16px;">保存</Button>
                </div>
            </FormItem>
            <Divider />
            <FormItem label="其它配置">
                <div class="lesson" v-for="(item, index) in otherConfig.configItem" :key="index">
                    <span class="common-span" v-if="item.configValue != 'repeatRule'">{{item.configName}}</span>
                    <div class="lesson-item" v-if="item.configValue == 'repeatRule'" v-show="false">
                        <div>
                            <Checkbox v-model="check.selectedLable"
                                @on-change="changeOtherConfig"
                                v-if="item.checkBoxs && item.checkBoxs.length"
                                v-for="check in item.checkBoxs" :key="check.cbValue">
                                {{check.cbName}}
                            </Checkbox>
                        </div>
                        <p class="hint-copy">
                            <Icon type="ios-information-circle" :size="16" color="#ccc" />&nbsp;
                            新增客户时，勾选项为同名客户的判定条件，若不勾选则不检测同名客户
                        </p>
                    </div>
                    <div class="lesson-item" v-else-if="item.configValue == 'notAllowRepeat'">
                        <Checkbox v-model="item.enableLable" @on-change="changeOtherConfig">启用</Checkbox>
                        <p class="hint-copy">
                            <Icon type="ios-information-circle" :size="16" color="#ccc" />&nbsp;
                            开启后不允许创建同名学员，不开启则允许创建同名学员
                        </p>
                    </div>
                    <div class="lesson-item" v-else-if="item.configValue == 'salerMaxLimit'">
                        <Checkbox v-model="item.enableLable" @on-change="changeOtherConfig">启用</Checkbox>
                        <Input style="width:130px;margin-right:6px;" v-model="item.count" placeholder="请输入">
                            <span slot="append">个</span>
                        </Input>
                        <span>销售可以拥有的最大资源数量上限</span>
                    </div>
                    <div class="lesson-item" v-else-if="item.configValue == 'customerListFilterRule'">
                        <RadioGroup v-model="item.rule" @on-change="changeOtherConfig">
                            <Radio label="0">统计状态优先</Radio>
                            <Radio label="1">客户状态优先</Radio>
                        </RadioGroup>
                    </div>
                    <div class="lesson-item"  v-else-if="item.configValue == 'customerAssignRule'">
                        <Select v-model="item.roleIds" style="width:180px" :max-tag-count="1" @on-change="changeOtherConfig" multiple  clearable>
                            <Option v-for="item in roleList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </div>
                </div>
                <div class="save-button">
                    <Button type="primary" :disabled="!otherConfig.isChange" @click="saveInit('crm:otherConfig')" style="margin-right:16px;">保存</Button>
                </div>
            </FormItem>
        </Form>
        <whiteNameSet ref="whiteNameSet" :lists="publicLibraryRule.whiteList"></whiteNameSet>
        <Modal v-model="rightNow"
            :title="isRightNow?'立即生效':'指定时间生效'"
            width="600"
            class="right-now"
            :mask-closable="false">
            <Form ref="formValidate1" :model="formValidate1" :rules="ruleValidate1" :label-width="140">
                <FormItem v-if="isRightNow" label="生效时间：">
                    <span>13:30</span>
                </FormItem>
                <FormItem v-else-if="!isRightNow" :rules="{ required: true, type: 'date', message: '请选择日期', trigger: 'change' }" label="生效时间：" prop="time">
                    <DatePicker v-model="formValidate1.time"
                        type="date"
                        placeholder="请选择"
                        style="width: 306px">
                    </DatePicker>
                </FormItem>
                <FormItem label="生效规律：" prop="law">
                    <Select placeholder="请选择" style="width: 306px" v-model="formValidate1.law" clearable>
                        <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="验证码：" prop="code">
                    <div style="width: 306px">
                        <Input style="width: 198px;margin-right:16px;"
                            placeholder="请输入"
                            v-model="formValidate1.code"></Input>
                        <Button type="primary" size="large">获取验证码</Button>
                    </div>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" size="large" @click="cancel1">取消</Button>
                <Button type="primary" size="large" @click="ok1">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex';
    import valid, {errors,sysConfig, sysRole,api} from "../../libs/request.js";
    import {crmCustomer} from '../../../spoc-crm-web/src/libs/request.js';
    import whiteNameSet from "./whiteNameSet";
    export default {
        components: {
            whiteNameSet
        },
        data() {
            return {
                cnki:[],
                cnkiList:[],
                isChangeCnki:false,
                detectionList:[],
                detection:[],
                disableRule:[],
                ifCanModify:0,
                isChangeDetection:false,
                cusExprieTime:{
                    selected:false,
                    time:0,
                },
                ifShow:true,//cusComRule是否显示
                cusExprieTimeIsChange:true,
                selectedRoles:[],
                roleList:[],
                isRightNow:true,//是否是立刻生效
                rightNow:false,
                formValidate1:{
                    time:'',
                    law:'',
                    code:'',
                },
                ruleValidate1:{
                    law: [
                        {required: true,message: '该项为必填',trigger: 'blur'},
                        {pattern: /^\w{1,8}$/,message: '请输入分组名称，最多支持8个字符',trigger: 'blur'}
                    ],
                    code: [
                        {required: true,message: '该项为必填',trigger: 'blur'},
                        {pattern: /^\w{1,8}$/,message: '请输入分组名称，最多支持8个字符',trigger: 'blur'}
                    ],
                },
                studentcode: {
                    select: '1',
                    isInit: 0,
                    codeTemplate: '',
                    lists: []
                },
                allocPool: {
                    // enable: '0',
                    enableLable: false,
                    isChange: false
                },
                publicLibraryRule: {
                    enableLable: false,
                    isChange: false,
                    configItem: [],
                    whiteList: []
                },
                modalKey: '',
                statusList: [
                    {
                        value: '1',
                        label: '自定义1'
                    }
                ],
                tmkLibraryRule: {
                    enableLable: false,
                    isChange: false,
                    configItem: []
                },
                recordRule: {
                    enableLable: false,
                    isChange: false,
                    configItem: []
                },
                otherConfig: {
                    isChange: false,
                    configItem: []
                },
                plays:[],
                playsList:[],
                isChangePlay:false,
            }
        },
        created() {
            this.getLists()
        },
        methods: {
            ...mapMutations(['updateLoadingStatus']),
            playsChange(v) {
                this.isChangePlay = true
            },
            detectionChange(arr){
                this.isChangeDetection = true
                this.detectionList.map(v=>{
                    if(arr.indexOf(v.name)!=-1){
                        v.selected='1'
                    }else{
                        v.selected='0'
                    }
                })
            },
            cnkiChange(arr){
                this.isChangeCnki = true
                this.cnkiList.map(v=>{
                    if(arr.indexOf(v.name)!=-1){
                        v.selected='1'
                    }else{
                        v.selected='0'
                    }
                })
            },
            saveDetection(){
                let params={rptRule:this.detection.join(',')};
                crmCustomer.updateRptRule(params).then(valid.call(this)).then(res => {
                    if(res.ok) {
                        this.$Message.success(res.data.message)
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    // this.getDetection();
                });
            },
            getDetection(){
                crmCustomer.getRptRule({}).then(valid.call(this)).then(res => {
                    if(res.ok) {
                        this.detection=res.data.data.rptRule;
                        this.disableRule=res.data.data.rptRule;
                        this.ifCanModify=res.data.data.ifCanModify;
                        this.isChangeDetection = false;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {

                });
            },
            getLists() {
                sysRole.roleList({}).then(valid.call(this)).then(res => {
                    if(res.ok) {
                        this.roleList = res.data.data.roleList;
                        this.getInit('crm:codeRule');
                        this.getInit('crm:allocPool');
                        this.getInit('crm:publicLibraryRule');
                        this.getInit('crm:tmkLibraryRule');
                        this.getInit('crm:recordRule');
                        this.getInit('crm:otherConfig');
                        this.getInit('crm:cusComRule');
                        this.getInit('crm:planItem');
                        this.getInit('crm:plan');
                        this.getInit('crm:rptRule');
                        this.getInit('crm:searchRptRule');

                        // this.getDetection();
                    }
                })
                .catch(errors.call(this))
                .finally(() => {

                });
            },
            setWhiteName(){
                this.$refs.whiteNameSet.show()
            },
            cancel1() {
                this.rightNow = false;
                this.$refs['formValidate1'].resetFields();
            },
            ok1() {
                this.$refs['formValidate1'].validate((valid) => {
                    if (valid) {
                        this.saveInit(this.modalKey);
                    } else {
                        this.$Message.error('错了，老弟!');
                    }
                })
            },
            rightNowFn(key) {
                this.initformValidate1();
                this.modalKey = key;
                this.isRightNow = true
                this.rightNow = true
            },
            toSomeTime(key) {
                this.initformValidate1();
                this.modalKey = key;
                this.isRightNow = false
                this.rightNow = true
            },
            initformValidate1() {
                this.formValidate1 = {
                    time:'',
                    law:'',
                    code:'',
                }
            },
            getInit(configId) {
                this.updateLoadingStatus({isLoading: true});
                sysConfig.getConfig({
                    menuId: 2001,
                    configId
                }).then(valid.call(this)).then((res) => {
                    if (res.ok) {
                        let _data = res.data.data;
                        if(configId == 'crm:codeRule') {
                            // 客户编号规则
                            this.studentcode.lists = _data;
                            _data.forEach(list => {
                                if(list.selected) {
                                    this.studentcode.select = list.codeTemplateNo;
                                    this.studentcode.codeTemplate = list.codeTemplate;
                                }
                            });
                        } else if(configId == 'crm:allocPool') {
                            // 分单池规则
                            // this.allocPool.enable = _data.enable;
//                            this.allocPool.enableLable = _data.enable == '1' ? true : false;
                            this.selectedRoles = _data?_data.roleIds:[];
                        } else if(configId == 'crm:cusComRule') {
                            // 客户公共规则
                            if(_data){
                                this.cusExprieTime = _data.cusExprieTime;
                                this.cusExprieTime.selected = Boolean(this.cusExprieTime.selected)
                                this.cusExprieTime.time = Number(this.cusExprieTime.time)
                            }else{
                                this.ifShow = false
                            }
                        } else if(configId == 'crm:publicLibraryRule') {
                            // 公共库规则
//                            this.publicLibraryRule.enableLable = _data.enable == '1' ? true : false;
                            this.publicLibraryRule.configItem = _data?_data.configItem:[];
                            // this.publicLibraryRule.whiteList = _data.whiteList;
                            this.publicLibraryRule.whiteList = [
                                {
                                    name: '111'
                                }
                            ];
                        } else if(configId == 'crm:tmkLibraryRule') {
                            // TMK库规则
//                            this.tmkLibraryRule.enableLable =  _data.enable == '1' ? true : false;
                            this.tmkLibraryRule.configItem = _data?_data.configItem:[];
                        } else if(configId == 'crm:recordRule') {
                            // 录音规则
//                            this.recordRule.enableLable =  _data.enable == '1' ? true : false;
                            this.recordRule.configItem = _data?_data.configItem:[];
                        } else if(configId == 'crm:otherConfig') {
                            // 其他配置
                            if(_data && _data.length) {
                                this.otherConfig.configItem = _data;
                                // console.log(_data)
                                _data.forEach(e => {
                                    if(e.enable) e.enableLable = e.enable == '1' ? true : false;
                                    if(e.checkBoxs && e.checkBoxs.length) {
                                        e.checkBoxs.forEach(item => {
                                            item.selectedLable = item.selected == '1' ? true : false
                                        });
                                    }
                                });
                            }
                        } /*else if(configId == 'crm:planItem'){
                        }*/ else if(configId == 'crm:plan'){
                            this.playsList = _data
                            this.plays = _data.map(item => {
                                if(item.selected=='1'){
                                    return item.name
                                }
                            })
                            // this.getInit('crm:plan')
                        }else if(configId == 'crm:rptRule'){
                            this.detectionList=_data.choices;
                            this.detection=_data.rule.split('|');
                        }else if(configId == 'crm:searchRptRule'){
                            this.cnkiList=_data.choices;
                            this.cnki=_data.choices.filter(v=>v.selected==1).map(v=>v.name);
                        }
                    }
                }).catch(errors.call(this)).finally(() => {
                    this.updateLoadingStatus({isLoading: false});
                });
            },
            stencilChange(val) {
                let data = this.studentcode.lists.filter(function(item){
                    return item.codeTemplateNo == val;
                })[0];
                this.studentcode.codeTemplate = data.codeTemplate;
            },
            changeAllocPool() {
                // if((this.allocPool.enable == '1' && this.allocPool.enableLable) || (this.allocPool.enable == '0' && !this.allocPool.enableLable)) {
                //     this.allocPool.isChange = false;
                // }else this.allocPool.isChange = true;
                this.allocPool.isChange = true;
            },
            changePublicLibraryRule() {
                this.publicLibraryRule.isChange = true;
            },
            changeTmkLibraryRule() {
                this.tmkLibraryRule.isChange = true;
            },
            changeRecordRule() {
                this.recordRule.isChange = true;
            },
            changeOtherConfig() {
                this.otherConfig.isChange = true;
            },
            selectedChange() {
                this.cusExprieTimeIsChange = false
            },
            saveInit(type) {
                let params = {
                    menuId: 2001,
                    configId: type
                }
                if (type == 'crm:allocPool') {
                    // 分单池规则
                    if(!this.selectedRoles.length){
                        this.$Message.error('至少选择一个角色')
                        return
                    }
                    params.objectValue = {
//                        enable: this.allocPool.enableLable ? '1' : '0',
                        roleIds: this.selectedRoles
                    }
                } else if(type == 'crm:cusComRule') {
                    // 公共库规则
                    params.objectValue = {cusExprieTime: {
                        selected: String(this.cusExprieTime.selected),
                        time: String(this.cusExprieTime.time)
                    }}
                } else if(type == 'crm:publicLibraryRule') {
                    // 公共库规则
                    params.objectValue = {
//                        enable: this.publicLibraryRule.enableLable ? '1' : '0',
                        configItem: this.publicLibraryRule.configItem,
                        whiteList: this.publicLibraryRule.whiteList
                    };
                } else if(type == 'crm:tmkLibraryRule') {
                    // TMK库规则
                    params.objectValue = {
//                        enable: this.tmkLibraryRule.enableLable ? '1' : '0',
                        configItem: this.tmkLibraryRule.configItem,
                    };
                } else if(type == 'crm:recordRule') {
                    // 录音规则
                    params.objectValue = {
//                        enable: this.recordRule.enableLable ? '1' : '0',
                        configItem: this.recordRule.configItem,
                    };
                } else if(type == 'crm:otherConfig') {
                    // 其他配置
                    let _arr = [];
                    // console.log(this.otherConfig)
                    this.otherConfig.configItem.forEach(configItem => {
                        let _obj = Object.assign({}, configItem);
                        if(_obj.configValue == 'repeatRule') {
                            let _checkArr = [];
                            _obj.checkBoxs.forEach(checkBox => {
                                let _check = Object.assign({}, checkBox);
                                _check.selected = _check.selectedLable ? '1' : '0';
                                delete _check.selectedLable;
                                _checkArr.push(_check);
                            });
                            _obj.checkBoxs = _checkArr;
                        }
                        if(_obj.configValue == 'notAllowRepeat'||_obj.configValue == 'salerMaxLimit') {
                            _obj.enable = _obj.enableLable ? '1' : '0';
                            delete _obj.enableLable;
                        }
                        _arr.push(_obj);
                    });
                    params.objectValue = _arr;
                } else if(type == 'crm:codeRule') {
                    // 客户编号规则
                    let _arr = [];
                    this.studentcode.lists.forEach(list => {
                        let _item = Object.assign({}, list);
                        delete _item.selected;
                        if(_item.codeTemplateNo == this.studentcode.select) {
                            _item.selected = 'true'
                        }
                        _arr.push(_item);
                    });
                    params.objectValue = _arr;
                } else if(type == 'crm:plan') {
                    let arr = this.playsList.map(item => {
                         if(this.plays.includes(item.name)){
                             item.selected='1';
                         }else{
                             item.selected='0';
                         }
                         return item;
                    })
                    params.objectValue = arr
                } else if(type == 'crm:rptRule'){
                    let obj={};
                    obj.rule=this.detection.join('|');
                    obj.choices=this.detectionList;
                    params.objectValue = obj;
                } else if(type == 'crm:searchRptRule'){
                    let obj={};
                    obj.choices=this.cnkiList;
                    params.objectValue = obj;
                }
                if (type == 'crm:rptRule') {
                    this.$Modal.confirm({
                        title: this.$t('modules_spoc_crm_web_src_modules_resourceentrymodal_591'),
                        content:'修改判重规则会重建用户判重缓存，是否继续？',
                        onOk: () => {
                            this.updateConfig(params, type);
                        },
                        onCancel: () => {
                            // 同名客户检测
                            this.isChangeDetection=false;
                            this.getInit('crm:rptRule')
                        }
                    });
                } else{
                    this.updateConfig(params, type);
                }
            },
            updateConfig(params, type) {
                this.updateLoadingStatus({isLoading: true});
                sysConfig.updateConfig(params)
                .then(valid.call(this))
                .then((res) => {
                    if (res.ok) {
                        this.$Message.success({content: res.data.message});
                        if (type == 'crm:allocPool') {
                            // 分单池规则
                            this.allocPool.isChange = false;
                        } else if(type == 'crm:cusComRule') {
                            // 客户公共规则
                            this.cusExprieTimeIsChange = true;
                        } else if(type == 'crm:publicLibraryRule') {
                            // 公共库规则
                            this.rightNow = false;
                            this.publicLibraryRule.isChange = false;
                        } else if(type == 'crm:tmkLibraryRule') {
                            // TMK库规则
                            this.rightNow = false;
                            this.tmkLibraryRule.isChange = false;
                        } else if(type == 'crm:recordRule') {
                            // 录音规则
                            this.recordRule.isChange = false;
                        } else if(type == 'crm:otherConfig') {
                            // 其他配置
                            this.otherConfig.isChange = false;
                        } else if(type == 'crm:codeRule') {
                            // 其他配置
                            this.studentcode.isInit = 1;
                        } else if(type == 'crm:plan') {
                            // 计划指标
                           this.isChangePlay = false
                            this.getInit('crm:plan')
                        } else if(type == 'crm:rptRule') {
                            // 同名客户检测
                            api.clearRptRule({}).then(valid.call(this)).then(res => {
                                if(res.ok) {
                                }
                            })
                            .catch(errors.call(this))
                            .finally(() => {
                                this.isChangeDetection=false;
                                this.getInit('crm:rptRule')
                            });
                        } else if(type == 'crm:searchRptRule') {
                            // 同名客户检测
                            this.isChangeCnki=false;
                            this.getInit('crm:searchRptRule')
                        }
                    }
                }).catch(errors.call(this)).finally(() => {
                    this.updateLoadingStatus({isLoading: false});
                });
            },
        },
        filters: {
            capitalizedNumber(num){
                let _str = '一';
                if(num == 1) _str = '二';
                if(num == 2) _str = '三';
                if(num == 3) _str = '四';
                if(num == 4) _str = '五';
                return _str;
            }
        }
    }
</script>
