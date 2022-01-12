<style lang="less">
.resourceEntryModal {
    min-height: 100%;
    .edit_btn {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 15px 20px 0 0;
    }
    .mark-line {
        width: 100%;
        height: 24px;
        display: flex;
        flex-direction: row;
        align-items: center;
        position: relative;
        margin-bottom: 15px;
        margin-top: 0px;
        .line {
            height: 1px;
            width: 100%;
            background: #d9d9d9;
        }
        span {
            position: absolute;
            top: 3px;
            left: 24px;
            z-index: 2;
            padding: 0 10px;
            background: #fff;
            font-size: 14px;
            color: #495060;
        }
    }
    .add-btn {
        border: 1px solid #ccc;
        height: 31px;
        width: 31px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        cursor: pointer;
        margin-left: 8px;
        margin-top: 0 !important;
    }
    .ivu-form-item {
        margin-bottom: 20px;
    }
    .link-classname {
        .ivu-poptip-body {
            padding: 0 !important;
        }
    }
    .com {
        background: #fff;
        padding: 26px 32px;
        border-radius: 4px;
    }
    .stu-info {
        &.com {
            padding-top: 0;
        }
    }
    .no-com {
        margin-top: 0px;
    }
    .userTargetInner {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        > span {
            display: inline-block;
            font-size: 12px;
            color: rgba(73, 80, 96, 1);
            background: rgba(235, 236, 240, 1);
            border-radius: 4px;
            padding: 0px 12px;
            margin-right: 8px;
            margin-top: 2px;
        }
    }
    .contacts_wrap {
        .linkman {
            margin-bottom: 14px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .linkman_tit {
                flex: 1;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                .tit_cont {
                    display: inline-block;
                    width: 110px;
                    padding-right: 12px;
                    text-align: right;
                    font-weight: bold;
                    font-size: 14px;
                }
            }
            button {
                margin-left: 12px;
            }
        }
    }
    .fixed-button {
        background: #fff;
        width: 100%;
        padding: 12px 16px 8px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        box-shadow: 0px -1px 3px 0px rgba(0, 0, 0, 0.12);
    }
    .common {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        .left,
        .right {
            width: auto;
            flex: 1;
        }
    }
    .custom-block {
        .ivu-col {
            float: inherit;
            display: inline-block;
        }
        .ivu-input-type-textarea{
            .ivu-input{
                height:auto;
            }
        }
    }
    .custom-block-title {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 14px;
    }
    .phone_box {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .mark-line {
        font-size: 16px;
        font-weight: 500;
        color: rgba(73, 80, 96, 1);
        line-height: 22px;
        span {
            left: 0;
        }
        .line {
            display: none;
        }
    }
}
.same_modal {
    .same_modal_header {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .same_modal_title {
            font-size: 18px;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.85);
            line-height: 24px;
        }
        .same_modal_info {
            font-size: 12px;
            font-weight: normal;
            color: rgba(153, 153, 153, 1);
            line-height: 18px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }
    }
    .same_modal_footer {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        button {
            margin-left: 10px;
        }
    }
}
.add_name_modal {
    .warn {
        font-size: 14px;
        line-height: 20px;
        margin-bottom: 14px;
    }
    .same_modal_title {
        font-size: 18px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
        line-height: 24px;
    }
    .same_modal_footer {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        button {
            margin-left: 10px;
        }
    }
}
</style>

<template>
    <div class="resourceEntryModal">
        <div class="edit_btn" v-if="!tEdit&&showLine=='1'">
            <Tooltip :content="$t('modules_spoc_crm_web_src_modules_resourceentrymodal copy_496')" placement="bottom-end">
                <span @click="setEdit" style="cursor: pointer;">
                    <Icon type="ios-create-outline" size="18" />
                </span>
            </Tooltip>
        </div>
        <Form
            ref="formValidate"
            label-colon
            :model="studData"
            :rules="studRule"
            :label-width="110"
            v-if="tEdit&&detection.length"
        >
            <div class="custom-block com">
                <div class="custom-block-title">
                    <h2>{{$t('modules_spoc_crm_web_src_modules_leadsinfo_484')}}</h2>
                    <div v-if="showLine == '1'">（{{studData.cusCode}}）</div>
                </div>
                <div v-if="fieldJson.length">
                    <Row>
                        <Col
                            :span="item.field=='remarks'||(item.field=='sourceList'&&studData.sourceList[0]=='referral')?24:12"
                            v-for="(item,num) in fieldJson"
                            :key="num"
                            v-if="formItemshow(item.field)"
                        >
                            <FormItem
                                prop="remarks"
                                :label="formItemName('remarks')"
                                v-if="item.field=='remarks'"
                            >
                                <Input
                                    v-model="studData.remarks"
                                    type="textarea"
                                    :rows="4"
                                    :placeholder="$t('scoretemplate_compontents_scoremodify_528')+formItemName('remarks')"
                                    show-word-limit
                                    maxlength="500"
                                ></Input>
                            </FormItem>
                            <FormItem
                                prop="schoolId"
                                :label="formItemName('schoolId')"
                                v-show="formItemshow('schoolId')"
                                v-else-if="item.field=='schoolId'"
                            >
                                <Select
                                    v-model="studData.schoolId"
                                    :placeholder="$t('modules_spoc_crm_web_src_modules_resourceentrymodal copy_511')"
                                    filterable
                                    remote
                                    clearable
                                    :remote-method="getComSchoolListName"
                                    :loading="loading"
                                >
                                    <Option
                                        v-for="(option, index) in schoolList"
                                        :value="option.id"
                                        :key="index"
                                    >{{option.name}}</Option>
                                </Select>
                            </FormItem>
                            <FormItem
                                prop="selectOfficeId"
                                :label="formItemName('selectOfficeId')"
                                v-show="formItemshow('selectOfficeId')"
                                v-else-if="item.field=='selectOfficeId'"
                            >
                                <Select
                                    transfer
                                    v-model="studData.selectOfficeId"
                                    :placeholder="$t('modules_spoc_crm_web_src_modules_resourceentrymodal copy_510')"
                                    clearable
                                >
                                    <Option
                                        :value="item.id"
                                        v-for="item in officeList"
                                        :key="item.id"
                                    >{{item.name}}</Option>
                                </Select>
                            </FormItem>
                            <FormItem
                                prop="address"
                                :label="formItemName('address')"
                                v-show="formItemshow('address')"
                                v-else-if="item.field=='address'"
                            >
                                <Row type="flex" justify="space-between">
                                    <div
                                        style="width:100%;
                                    display: flex;
                                    flex-direction: row;
                                    justify-content: space-between;
                                    align-items: center;"
                                    >
                                        <Input
                                            style="margin-right: 8px;"
                                            v-model="studData.address"
                                            :placeholder="$t('scoretemplate_compontents_scoremodify_528')+formItemName('address')"
                                        ></Input>
                                        <Button @click="getMap">{{$t('views_staff_components_lefttree_6412')}}</Button>
                                    </div>
                                </Row>
                            </FormItem>
                            <div v-else-if="item.field=='sourceList'">
                                <Row>
                                    <Col :span="studData.sourceList[0]=='referral'?12:24">
                                        <FormItem
                                            prop="sourceList"
                                            :label="formItemName('sourceList')"
                                            v-show="formItemshow('sourceList')"
                                        >
                                            <Cascader
                                                :data="sourceList"
                                                :placeholder="$t('scoretemplate_compontents_scoremodify_528')+formItemName('sourceList')"

                                                filterable
                                                clearable
                                                v-model="studData.sourceList"
                                                @on-change="sourceChange"
                                            ></Cascader>
                                        </FormItem>
                                    </Col>
                                    <Col span="6" v-if="studData.sourceList[0]=='referral'">
                                        <FormItem
                                            prop="referral.referralType"
                                            :label="$t('modules_spoc_crm_web_src_modules_leadsinfo_486')"
                                            v-if="studData.sourceList[0]=='referral'"
                                        >
                                            <Select
                                                transfer
                                                v-model="studData.referral.referralType"
                                                :placeholder="$t('modules_spoc_crm_web_src_modules_resourceentrymodal_552')"
                                                @on-change="referralTypeChange"
                                            >
                                                <Option
                                                    v-for="item in referralList"
                                                    :value="item.value"
                                                    :key="item.value"
                                                >{{ item.label }}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col span="6" v-if="studData.sourceList[0]=='referral'">
                                        <FormItem
                                            prop="referral.referraler"
                                            :label="$t('modules_spoc_crm_web_src_modules_leadsinfo_487')"
                                            label-width="70"
                                            v-if="studData.sourceList[0]=='referral'"
                                        >
                                            <Select
                                                :label="studData.referral.referralerName"
                                                ref="referraler"
                                                transfer
                                                v-model="studData.referral.referraler"
                                                filterable
                                                clearable
                                                remote
                                                :placeholder="$t('modules_spoc_crm_web_src_modules_resourceentrymodal_5531')"
                                                @on-query-change="remoteReferraler"
                                                :loading="referralLoading"
                                                @on-change="referralerChange"
                                            >
                                                <!-- @on-query-change="referralerQuery" -->
                                                <Option
                                                    v-for="item in referralerList"
                                                    :value="item.id"
                                                    :key="item.id"
                                                    :label="item.name+item.phone"
                                                >
                                                    <span>{{item.name}}</span>
                                                    <span style="float:right;color:#ccc">{{item.phone}}</span>
                                                </Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                </Row>
                            </div>
                            <FormItem
                                prop="birthday"
                                :rules="formItemrequired('birthday')?[{required: formItemrequired('birthday'),type:'date', message: formItemName('birthday')+$t('pushsettings_index_504'), trigger: 'change'}]:[]"
                                :label="formItemName('birthday')"
                                v-show="formItemshow('birthday')"
                                v-else-if="item.field=='birthday'"
                            >
                                <DatePicker
                                    type="date"
                                    style="width:100%;"
                                    :placeholder="formItemName('birthday')"
                                    :options="birthdayOption"
                                    v-model="studData.birthday"
                                    transfer
                                ></DatePicker>
                            </FormItem>
                            <FormItem
                                prop="districtEntity"
                                :label="formItemName('districtEntity')"
                                v-show="formItemshow('districtEntity')"
                                v-else-if="item.field=='districtEntity'"
                            >
                                <Row type="flex" justify="space-between">
                                    <Col span="6">
                                        <Select
                                            transfer
                                            v-model="studData.districtEntity.country"
                                            :placeholder="$t('modules_spoc_crm_web_src_modules_resourceentrymodal_555')"
                                            clearable
                                            @on-change="toShowCity('countryName',$event)"
                                        >
                                            <Option
                                                :value="item.id"
                                                v-for="item in countryList"
                                                :key="item.id"
                                            >{{item.name}}</Option>
                                        </Select>
                                    </Col>
                                    <Col span="6">
                                        <Select
                                            transfer
                                            v-model="studData.districtEntity.province"
                                            :placeholder="$t('modules_spoc_core_web_src_views_schoolmanagement_index_253')"
                                            clearable
                                            @on-change="toShowCity('provinceName',$event)"
                                        >
                                            <Option
                                                :value="item.id"
                                                v-for="item in provinceList"
                                                :key="item.id"
                                            >{{item.name}}</Option>
                                        </Select>
                                    </Col>
                                    <Col span="6">
                                        <Select
                                            transfer
                                            v-model="studData.districtEntity.city"
                                            :placeholder="$t('modules_spoc_crm_web_src_modules_resourceentrymodal_557')"
                                            clearable
                                            @on-change="toShowCity('cityName',$event)"
                                        >
                                            <Option
                                                :value="item.id"
                                                v-for="item in cityList"
                                                :key="item.id"
                                            >{{item.name}}</Option>
                                        </Select>
                                    </Col>
                                    <Col span="6">
                                        <Select
                                            transfer
                                            v-model="studData.districtEntity.area"
                                            :placeholder="$t('modules_spoc_crm_web_src_modules_resourceentrymodal_558')"
                                            clearable
                                            @on-change="toShowCity('areaName',$event)"
                                        >
                                            <Option
                                                :value="item.id"
                                                v-for="item in areaList"
                                                :key="item.id"
                                            >{{item.name}}</Option>
                                        </Select>
                                    </Col>
                                </Row>
                            </FormItem>
                            <FormItem
                                prop="gender"
                                :label="formItemName('gender')"
                                v-show="formItemshow('gender')"
                                v-else-if="item.field=='gender'"
                            >
                                <RadioGroup v-model="studData.gender">
                                    <Radio style="margin-right:40px;" label="m">{{$t('views_staff_components_staffinfo_670')}}</Radio>
                                    <Radio label="f">{{$t('views_staff_components_staffinfo_671')}}</Radio>
                                </RadioGroup>
                            </FormItem>
                            <FormItem
                                :label="index==0?formItemName('phoneList'):''"
                                :prop="'phoneList.'+index+'.phone'"
                                :rules="[{ required:isPhonereQuired, 'validator': validatePhone, 'trigger': 'blur' }]"
                                v-for="(phoneItem, index) in studData.phoneList"
                                :key="'phoneList'+index"
                                v-show="formItemshow('phoneList')"
                                v-else-if="item.field=='phoneList'"
                            >
                                <div class="phone_box">
                                    <Select
                                        transfer
                                        v-model="phoneItem.district"
                                        :placeholder="$t('modules_spoc_crm_web_src_modules_resourceentrymodal_561')"
                                        clearable
                                        :disabled="!!(((index==0&&showLine=='1')||isInvalidOverride)&&((oldPhoneList.find(v=>v.phone==phoneItem.phone&&v.phone))!==undefined&&phoneItem.phone))"
                                        style="width: 94px;"
                                    >
                                        <Option
                                            :value="item.areaCode"
                                            v-for="item in areaCodeList"
                                            :key="item.areaCode"
                                        >{{item.areaCodeShow+item.name}}</Option>
                                    </Select>
                                    <Input
                                        v-model.trim="phoneItem.phone"
                                        :placeholder="$t('scoretemplate_compontents_scoremodify_528')+formItemName('phoneList')"
                                        @on-blur="phoneBlur(index,phoneItem.phone)"
                                        :disabled="!!(((index==0&&showLine=='1')||isInvalidOverride)&&((oldPhoneList.find(v=>v.phone==phoneItem.phone&&v.phone))!==undefined&&phoneItem.phone))"
                                        style="flex: 1;"
                                    ></Input>
                                    <!-- findPhonePlace(index,phoneItem.phone) -->
                                    <span
                                        class="add-btn"
                                        @click="addPhone"
                                        v-show="!isInvalidOverride"
                                        v-if="index==0"
                                    >
                                        <Icon size="14" color="#ccc" type="md-add" />
                                    </span>
                                    <span
                                        class="add-btn"
                                        v-show="!isInvalidOverride"
                                        @click="delPhone(index)"
                                        v-else
                                    >
                                        <Icon size="14" color="#ccc" type="md-remove" />
                                    </span>
                                </div>
                            </FormItem>
                            <FormItem
                                :prop="item.field"
                                :label="formItemName(item.field)"
                                v-else
                                v-show="formItemshow(item.field)"
                                :rules="(item.field=='wechat')?[{required: isWechatQuired,message: $t('modules_spoc_core_web_src_views_customstate_stategroup_204'),trigger: 'blur'},{pattern: /^(\S+(\s?\S+)*)$/,message: $t('modules_spoc_crm_web_src_modules_resourceentrymodal copy_531'),trigger: 'blur'},{ validator: validateWechat, trigger: 'blur' }]:(item.field=='name'&& hasDetection('name'))?[{required: true,message: $t('modules_spoc_core_web_src_views_customstate_stategroup_204'),trigger: 'blur'},{pattern: /^(\S+(\s?\S+)*)$/,message: $t('modules_spoc_crm_web_src_modules_resourceentrymodal copy_531'),trigger: 'blur'},{ validator: validateName, trigger: 'blur' }]:[]"
                            >
                                <Input
                                    v-model="studData[item.field]"
                                    :disabled="(item.field=='name'||item.field=='wechat')?(isInvalidOverride&&!item.editable):isInvalidOverride"
                                    :placeholder="$t('scoretemplate_compontents_scoremodify_528')+formItemName(item.field)"
                                    @on-blur="nameBlur(item.field)"
                                ></Input>
                                <!-- :disabled="(showLine=='1'||isInvalidOverride)&&(!!oldWechat)" -->
                            </FormItem>
                        </Col>
                    </Row>
                    <Row v-if="showLine == '1'">
                        <Col span="24">
                            <FormItem :label="$t('modules_spoc_crm_web_src_modules_leadsinfo_490')" prop="tag">
                                <div class="userTargetInner">
                                    <span v-for="item in userLabelData" :key="item">{{item}}</span>
                                    <!-- <span>{{$t('modules_spoc_crm_web_src_modules_resourceentrymodal_563')}}</span> -->
                                    <userLabel
                                        ref="userLabelRef"
                                        menuId="2001"
                                        flag="0"
                                        :echoDisplay="true"
                                        :defaultCheckedTagids="studData.tags"
                                        @userLabelTrueChoose="userLabelTrueChoose"
                                    >
                                        <span slot="hasTagName">
                                            <Icon type="ios-create-outline" size="18" />
                                        </span>
                                    </userLabel>
                                </div>
                            </FormItem>
                        </Col>
                    </Row>
                </div>
            </div>
            <div class="stu-info com">
                <h2 style="margin-bottom: 14px;">{{$t('modules_spoc_crm_web_src_modules_leadsinfo_491')}}</h2>
                <div>
                    <div class="contacts_wrap">
                        <form-create ref="fc" v-model="fApi" :rule="rule" :option="option"></form-create>
                    </div>
                </div>
            </div>
        </Form>
        <leadsInfo v-if="!tEdit&&showLine=='1'" :id="id" :stuId="stuId" ref="leadsInfoObj"></leadsInfo>
        <div class="fixed-button" v-if="tEdit&&showLine=='1'">
            <Button @click="reset" style="margin-right: 16px">{{$t('classroom_allscore_53')}}</Button>
            <Button type="primary" @click="saveAll">{{$t('courselist_compontents_servicecontent_215')}}</Button>
        </div>
        <mapModel ref="mapModel" @mapOk="mapOk"></mapModel>
        <Modal v-model="sameModal" class-name="same_modal" width="800" :title="$t('modules_spoc_crm_web_src_modules_resourceentrymodal_567')">
            <div slot="header" class="same_modal_header">
                <div class="same_modal_title">{{$t('modules_spoc_crm_web_src_modules_resourceentrymodal copy_518')}}</div>
                <div class="same_modal_info">
                    <Icon type="ios-information-circle" size="14" style="margin: 0 8px;" />{{$t('modules_spoc_crm_web_src_modules_resourceentrymodal copy_519')}}"确认并保存".
                </div>
            </div>
            <div>
                <Table :columns="sameCol" :data="sameData" border></Table>
            </div>
            <div slot="footer" class="same_modal_footer">
                <Button @click="sameModal=false">{{$t('modules_spoc_crm_web_src_modules_resourceentrymodal copy_520')}}</Button>
                <Button type="primary" @click="validateForm">{{$t('modules_spoc_crm_web_src_modules_resourceentrymodal copy_521')}}</Button>
            </div>
        </Modal>
        <Modal
            v-model="addNmaeModal"
            class-name="add_name_modal"
            width="400"
            :closable="false"
            :mask-closable="false"
            :title="$t('modules_spoc_crm_web_src_modules_resourceentrymodal copy_522')"
        >
            <div>
                <p class="warn">{{$t('modules_spoc_crm_web_src_modules_resourceentrymodal copy_523')}}</p>
                <Form ref="formDynamic" :model="studData" :label-width="80" style="width: 300px">
                    <FormItem
                        :label="$t('modules_spoc_crm_web_src_modules_resourceentrymodal_574')"
                        prop="name"
                        :rules="{required: true, message: $t('modules_spoc_crm_web_src_modules_resourceentrymodal_575'), trigger: 'blur'}"
                    >
                        <Input type="text" v-model="studData.name" :placeholder="$t('modules_spoc_crm_web_src_modules_resourceentrymodal_576')"></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer" class="add_name_modal_footer">
                <Button type="primary" @click="addName">{{$t('modules_spoc_crm_web_src_modules_resourceentrymodal_577')}}</Button>
            </div>
        </Modal>
        <Modal
            v-model="duplicateModal"
            class-name="duplicate_modal"
            width="840"
            :closable="false"
            :mask-closable="false"
            title="重复客户"
        >
            <div>
                <Table border :columns="duplicateCol" :data="duplicateData">
                    <template slot-scope="{ row, index }" slot="startPhone">
                        {{row.phone.join('、')}}
                    </template>
                    <template slot-scope="{ row, index }" slot="type">
                        <span v-if="row.type==1" style="margin-right:5px;">已是会员</span>
                        <span v-if="row.isExpire==0">已存在</span>
                        <span v-if="row.isExpire==1">已过期</span>
                    </template>
                    <template slot-scope="{ row, index }" slot="active">
                            <a v-if="row.type==1 || row.isExpire==0" @click="goInfo(row.id)">详情</a>
                            <a v-if="row.isExpire==1" @click="cover(row)">覆盖</a>
                    </template>
                </Table>
            </div>
            <div slot="footer" class="duplicate_modal_footer">
                <Button @click="closeDuplicateModal">关闭</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
//客户信息录入组件
// import mapModal from "../views/activityEnrollment/mapModal";
import valid, {
    errors,
    sys,
    sysUser,
    sysDict,
    crmCustomer,
    sysConfig,
    sysCommonSql,
    crmActivity,
    sysProps,
    common
} from "../libs/request.js";
import { mapMutations, mapState } from "vuex";
import userLabel from "@public/modules/userLabel";
import mapModel from "@public/modules/mapModel.vue";
import leadsInfo from "./leadsInfo.vue";
import formCreateSetting from "../views/leadsEntry/formCreate.js";

export default {
    props: {
        showLine: {
            type: "String",
            require: true
        },
        isEdit: {
            type: Boolean,
            default: true
        },
        id: {
            type: "String",
            default: ""
        },
        stuId: {
            type: "String",
            default: ""
        }
    },
    mixins: [formCreateSetting],
    components: {
        mapModel,
        userLabel,
        leadsInfo
    },
    data() {
        // const validateReferral = (rule, value, callback) => {
        //     if(value.referralType){
        //         callback();
        //     }else{
        //         callback(new Error('地址不能为空'));
        //     }/*else if(value.city==''&&this.showCity==false){
        //         callback();
        //     }*/
        // };
        const validateSource = (rule, value, callback) => {
            let emptyObj = value.length == 3;
            if (emptyObj) {
                callback(new Error(this.$t('modules_spoc_core_web_src_views_customstate_stategroup_204')));
            } else {
                callback(
                    new Error(this.formItemName("sourceList") + this.$t('pushsettings_index_504'))
                );
            }
        };

        return {
            duplicateModal:false,
            duplicateCol:[
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '电话',
                        key: 'startPhone',
                        slot: 'startPhone'
                    },
                    {
                        title: '微信号',
                        key: 'wechat'
                    },
                    {
                        title: '登记人',
                        key: 'createByName'
                    },
                    {
                        title: '登记时间',
                        key: 'createDate'
                    },
                    {
                        title: '失效状态',
                        key: 'type',
                        slot: 'type'
                    },
                    {
                        title: '操作',
                        key: 'active',
                        slot: 'active'
                    },
            ],
            duplicateData:[],
            baseInfo: {},
            schoolList: [],
            loading: false,
            fieldJson: [],
            addNmaeModal: false,
            referralLoading: false,
            referralerList: [],
            sameModal: false,
            isSchoolMap: false,
            showCity: true,
            areaCodeList: [],
            countryList: [],
            provinceList: [],
            cityList: [],
            areaList:[],
            referralList: [],
            sourceList: [],
            officeList: [],
            birthdayOption: {
                disabledDate(date) {
                    return date && date.valueOf() > Date.now();
                }
            },
            nrrLock: false,
            schoolTypeList: [],
            schoolGradeList: [],
            userLabelData: [],
            studData: {
                id:'',
                activityId: null,
                qrId: null,
                channelId: null,
                officeId: null,
                followOfficeId: null,
                name: "",
                enName: "",
                wechat: "",
                phoneList: [
                    {
                        phone: "",
                        district: "0086",
                        isModif: 1,
                        locId: "",
                        sort: ""
                    }
                ],
                qq: "",
                districtEntity: {
                    city: "",
                    cityName: "",
                    country: "CN7",
                    countryName: this.$t('modules_spoc_crm_web_src_modules_resourceentrymodal_578'),
                    province: "",
                    provinceName: "",
                    area:"",
                    areaName:""
                },
                email: "",
                selectOfficeId: "",
                schoolId: "",
                sourceList: [],
                address: "",
                latLongAddress: "",
                referral: {
                    referralType: "",
                    referraler: "",
                    referralerName: "",
                    referralerPhone: ""
                },
                tags: [],
                remarks: "",
                birthday: "",
                gender: "",
                additionInfo: {
                    schoolGrade: "",
                    schoolType: "",
                    school: "",
                    latLongSchool: "",
                    fieldJsonData: {}
                },
                fieldJsonData: {},
                isInvalidOverride: null
            },
            isfindPhonePlace: false,
            sameCol: [
                {
                    title: this.$t('modules_spoc_crm_web_src_modules_resourceentrymodal copy_533'),
                    key: "name",
                    width: null,
                    resizable: true
                },
                {
                    title: this.$t('classlist_compontents_detailinfo_37'),
                    key: "name",
                    width: null,
                    resizable: true,
                    render: (h, params) => {
                        return h("div", params.row.phone.join(" "));
                    }
                },
                {
                    title: this.$t('modules_spoc_crm_web_src_modules_resourceentrymodal copy_535'),
                    width: null,
                    resizable: true,
                    key: "createDate"
                },
                {
                    title: this.$t('modules_spoc_crm_web_src_modules_resourceentrymodal copy_536'),
                    width: null,
                    resizable: true,
                    key: "salerName"
                },
                {
                    title: this.$t('modules_spoc_crm_web_src_modules_resourceentrymodal copy_537'),
                    width: null,
                    resizable: true,
                    key: "followOfficeName"
                }
            ],
            sameData: [],
            searchPhoneInfo: {
                ind: "",
                phone: ""
            },
            oldPhoneList: [],
            oldName:'',
            tEdit: this.isEdit,
            isSaving: false,
            isInvalidOverride: false,
            objfield: [],
            detection:[],
            studRule:{},
            timer:'',
            oldWechat:''
        };
    },
    computed: {
        ...mapState(["userInfo", "app"]),
        isPhonereQuired(){
            let flag=null;
            if(this.detection.length){
                if(this.hasDetection('phone')&&this.studData.wechat){
                    flag= false;
                }else if(this.hasDetection('phone')&&!this.studData.wechat){
                    flag= true
                }else{
                    flag= false
                }
            }else{
                flag= false;
            }
            if(this.hasDetection('phone')&&this.studData.phoneList.some(v=>v.phone)){
                flag= true;
            }
            // this.$refs.formValidate.validateField('phoneList.'+(this.studData.phoneList.length-1)+'.phone');
            // if(this.$refs["formValidate"]){
            //     this.$refs["formValidate"].validateField("wechat");
            // }
            return flag;
        },
        isWechatQuired(){
            let flag=null;
            if(this.detection.length){
                let isPhone=this.studData.phoneList.some(v=>v.phone);
                if(this.hasDetection('wechat')&&isPhone){
                    flag= false;
                }else if(this.hasDetection('wechat')&&!isPhone){
                    flag= true
                }else{
                    flag= false
                }
            }else{
                flag= false;
            }
            if(this.hasDetection('wechat')&&this.studData.wechat){
                flag= true;
            }
            // if(this.$refs["formValidate"]){
            //     this.$refs.formValidate.validateField('phoneList.'+(this.studData.phoneList.length-1)+'.phone');
            // }
            // this.$refs["formValidate"].validateField("wechat");
            return flag;
        }
    },
    mounted() {
        this.getCountryCode();
        this.getFindByName();
        this.getcustomerList();
        this.getSource();
        this.getReferralList();
        this.getOfficeList();
        this.listLocation(this.studData.districtEntity.country, 'province');
        if (
            this.$route.query.source == "crm.activityEnrollment" ||
            this.$route.query.source == "crm.activityEnrollment.detial"
        ) {
            this.getFormBase();
        }
        if (this.showLine == "1") {
            this.$nextTick(() => {
                this.getFormFn();
            });
        }
        this.$nextTick(()=>{
                this.getDetection();
        })
        // this.referralerSearch('');
    },

    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        goInfo(id){
            this.$router.push({
                name:'crm.customer360',
                query:{
                    id
                }
            })
            this.duplicateModal=false;
        },
        cover(info){
            this.isInvalidOverride = true;
            if (
                this.$route.query.source ==
                    "crm.activityEnrollment" ||
                this.$route.query.source ==
                    "crm.activityEnrollment.detial"
            ) {
                this.getForm(info.id, true);
            } else {
                this.$nextTick(() => {
                    this.getForm(info.id);
                });
            }
            this.duplicateModal=false;
        },
        showDuplicateModal(){
            clearTimeout(this.timer);
            this.timer=setTimeout(()=>{
                this.duplicateModal=true;
            },500)
        },
        closeDuplicateModal(){
            this.duplicateModal=false;
            if(!this.oldPhoneList.filter(v=>v.phone==this.searchPhoneInfo.phone).length){
                this.studData.phoneList.splice(
                    this.searchPhoneInfo.ind,
                    1
                );
            }
            if (
                this.studData.phoneList
                    .length == 0
            ) {
                let obj = {
                    phone: "",
                    district: "0086",
                    isModif: 1,
                    locId: "",
                    sort: ""
                };
                this.studData.phoneList.push(
                    obj
                );
            }

        },
        hasDetection(val){
            return this.detection.join(',').indexOf(val)!=-1;
        },
        getDetection(){
            sysConfig.getConfig({configId:'crm:rptRule',menuId: 2001}).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.detection=res.data.data.rule.split('|');
                    this.studRule={
                        phoneList: [
                            // { validator: validatePhone, trigger: 'blur' }
                        ],
                        sourceList: [
                            {
                                required: true,
                                type: "array",
                                message: this.$t('modules_spoc_core_web_src_views_customstate_stategroup_204'),
                                trigger: "change"
                            }
                        ],
                        "referral.referralType": [
                            {
                                required: true,
                                message: this.$t('modules_spoc_crm_web_src_modules_resourceentrymodal copy_529'),
                                trigger: "change"
                            }
                        ],
                        "referral.referraler": [
                            {
                                required: true,
                                message: this.$t('modules_spoc_crm_web_src_modules_resourceentrymodal copy_530'),
                                trigger: "change"
                            }
                        ],

                        // gender: [{
                        //     required: true,
                        //     message: '请填写性别',
                        //     trigger: 'change'
                        // }, ],
                        type: [
                            {
                                required: true,
                                message: this.$t('modules_spoc_core_web_src_views_customstate_stategroup_204'),
                                trigger: "blur"
                            },
                            {
                                pattern: /^\d+$/,
                                message: this.$t('modules_spoc_crm_web_src_modules_resourceentrymodal copy_532'),
                                trigger: "blur"
                            }
                        ]
                    }
                }
            })
            .catch(errors.call(this))
            .finally(() => {

            });
        },
        getComSchoolListName(name) {
            this.loading = true;
            let params = {
                name
            };
            common
                .comSchoolListName(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.schoolList = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.loading = false;
                });
        },
        getOfficeList() {
            sysUser
                .dataScopeFilter()
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.officeList = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
        },
        formItemName(_key) {
            return this.fieldJson.find(v => v.field == _key).name;
        },
        formItemrequired(_key) {
            return this.fieldJson.find(v => v.field == _key).required == "1";
        },
        formItemshow(_key) {
            return this.fieldJson.find(v => v.field == _key).base == "1";
        },
        getcustomerList() {
            let params = {
                tableName: "crm_customer"
            };
            sysProps
                .list(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let list = res.data.data.filter(v => {
                            return (
                                v.category == "ugcField" &&
                                (v.base == "1" || v.editable == "1")
                            );
                        });
                        this.fieldJson = res.data.data.filter(v => {
                            return v.category == "sysField";
                        });
                        this.objfield = list
                            .filter(v => v.isObjField)
                            .map(v => {
                                return {
                                    field: v.field,
                                    value: v.objFieldKeys
                                };
                            });
                        this.setFormAttr(list);
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
        },
        getFormFn() {
            this.$refs.leadsInfoObj.getFormFn(this.id);
        },
        isShowSource(item) {
            let flag = false;
            if (this.userInfo) {
                if (
                    this.userInfo.roleIdList.indexOf("8") != -1 ||
                    this.userInfo.roleIdList.indexOf("1") != -1 ||
                    this.userInfo.roleIdList.indexOf(
                        "78d34370d97a451dafc198ab813f23c6"
                    ) != -1
                ) {
                    flag = true;
                }
                if (
                    this.userInfo.roleIdList.indexOf("4") != -1 ||
                    this.userInfo.roleIdList.indexOf("5") != -1 ||
                    this.userInfo.roleIdList.indexOf("6") != -1
                ) {
                    if (
                        item.value == "referral" ||
                        item.value == "walk in" ||
                        item.value == "call in"
                    ) {
                        flag = true;
                    }
                }
                if (this.userInfo.roleIdList.indexOf("3") != -1) {
                    if (item.value == "call out" || item.value == "net in") {
                        flag = true;
                    }
                }
            }
            if (item.value == "referral") {
                if (
                    this.$route.query.source == "crm.activityEnrollment" ||
                    this.$route.query.source == "crm.activityEnrollment.detial"
                ) {
                    flag = false;
                }
            }
            return flag;
        },
        validatePhone(rule, value, callback) {
            if (this.isSaving == false) {
                this.studData.phoneList.forEach((v, k) => {
                    v.sort = k + "";
                    if (this.oldPhoneList.find(val => v.phone == val.phone)) {
                        v.isModif = "0";
                    } else {
                        v.isModif = "1";
                    }
                });
            }
            let emptyObj = value == "";
            if(!emptyObj){
                let patt1 = new RegExp(/^1\d{10}$/);
                let result = patt1.test(value);
                if(!result){
                    callback(
                        new Error( this.$t('pushsettings_index_521'))
                    );
                    return;
                }
            }
            if (emptyObj&&this.isPhonereQuired) {
                callback(
                    new Error(this.formItemName("phoneList") + this.$t('pushsettings_index_504'))
                );
                return;
            } else {
                let ind = rule.field.split(".")[1];
                let phone = value;
                this.searchPhoneInfo = {
                    ind: ind,
                    phone: phone
                };
                if(!this.isPhonereQuired&&!phone){
                    callback();
                    return;
                }
                if(!this.isPhonereQuired&&phone){
                    this.findPhonePlace(ind, phone);
                    callback();
                    return;
                }
                if (
                    this.$route.query.source == "crm.activityEnrollment" ||
                    this.$route.query.source == "crm.activityEnrollment.detial"
                ) {
                    this.getCustomerByRPTRule(ind, phone);
                    callback();
                    return;
                } else {
                    if (!this.studData.name&&this.hasDetection('name')) {
                        this.$refs["formValidate"].validateField("name");
                        callback();
                        return;
                    }
                    // if (!this.studData.wechat&&this.isWechatQuired) {
                    //     this.$refs["formValidate"].validateField("wechat");
                    //     callback();
                    // }
                    /*let detectionArr=this.detection.join('-').split('-');
                    let detectionMap=[...new Set(detectionArr)];
                    let detectionList=[];
                    let params = {
                        rptRule:[],
                        rptRuleValue:{

                        }
                    };
                    // Object.assign({}, this.studData);
                    if(detectionMap.indexOf('name')!=-1&&this.studData.name){
                        params.rptRuleValue.name=this.studData.name;
                        detectionList=detectionList.concat(this.detection.filter(v=>v.indexOf('name')!=-1));
                    }else{
                        detectionList=detectionList.filter(v=>v.indexOf('name')==-1);
                    }
                    if(detectionMap.indexOf('phone')!=-1){
                        let phone=this.studData.phoneList.filter(v=>v.isModif==1&&v.phone);
                        if(phone.length){
                            params.rptRuleValue.phoneList=phone;
                            detectionList=detectionList.concat(this.detection.filter(v=>v.indexOf('phone')!=-1));
                        }else{
                            detectionList=detectionList.filter(v=>v.indexOf('phone')==-1);
                        }
                    }
                    if(detectionMap.indexOf('wechat')!=-1&&this.studData.wechat){
                        params.rptRuleValue.wechat=this.studData.wechat;
                        detectionList=detectionList.concat(this.detection.filter(v=>v.indexOf('wechat')!=-1));
                    }else{
                        detectionList=detectionList.filter(v=>v.indexOf('wechat')==-1);
                    }
                    params.rptRule=[...new Set(detectionList)];*/
                    let obj = this.studData.phoneList.find(
                        v => v.phone == value
                    );
                    let detectionArr=this.detection.join('-').split('-');
                    let detectionMap=[...new Set(detectionArr)];
                    let hasphoneRule=false;
                    if(detectionMap.indexOf('phone')!=-1){
                        let phone=this.studData.phoneList.filter(v=>v.isModif==1&&v.phone);
                        if(phone.length){
                            hasphoneRule=true;
                        }else{
                            hasphoneRule=false;
                        }
                    }
                    if(this.isPhonereQuired&&hasphoneRule){
                        if (obj.isModif == 1 ) {
                            /*if(this.studData.id){
                                params.id=this.studData.id;
                            }
                            params=Object.assign(params,params.rptRuleValue);*/

                            let params = Object.assign({}, this.studData);

                            if (params.birthday) {
                                params.birthday = new Date(params.birthday).format(
                                    "yyyy-MM-dd"
                                );
                            } else {
                                params.birthday = "";
                            }
                            if (params.sourceList[0] != "referral") {
                                params.referral = null;
                            }
                            if(params.phoneList.every(v=>!v.phone)){
                                params.phoneList=null;
                            }
                            if(this.$route.query.source=="crm.myCustomer"||this.$route.query.source=="sign.contractGeneration"){
                                params.isCreateSelfCustomer="1";
                            }
                            crmCustomer
                                .getCustomerByRPTRule(params)
                                .then(valid.call(this))
                                .then(res => {
                                    if (res.ok) {
                                        this.duplicateData=res.data.data||[];
                                        let info = res.data.data?res.data.data.find(v=>v.phone.indexOf(value)!=-1):false;
                                        if (info && info.type == "1") {
                                            this.showDuplicateModal();
                                            callback(new Error(this.$t('modules_spoc_crm_web_src_modules_resourceentrymodal copy_538')));
                                        } else if (info && info.isExpire == "0") {
                                            this.showDuplicateModal();
                                                callback(new Error('手机号'+value+'已存在'));
                                            // callback(new Error(this.$t('modules_spoc_crm_web_src_modules_resourceentrymodal copy_539')));
                                        } else if (info && info.isExpire == "1") {
                                            this.showDuplicateModal();
                                                callback(new Error('手机号'+value+'已过期'));
                                            // this.$Modal.confirm({
                                            //     title: this.$t('modules_spoc_crm_web_src_modules_resourceentrymodal_591'),
                                            //     content:
                                            //         this.$t('modules_spoc_crm_web_src_modules_resourceentrymodal copy_541'),
                                            //     onOk: () => {
                                            //         this.isInvalidOverride = true;
                                            //         if (
                                            //             this.$route.query.source ==
                                            //                 "crm.activityEnrollment" ||
                                            //             this.$route.query.source ==
                                            //                 "crm.activityEnrollment.detial"
                                            //         ) {
                                            //             this.getForm(info.id, true);
                                            //         } else {
                                            //             this.$nextTick(() => {
                                            //                 this.getForm(info.id);
                                            //             });
                                            //         }
                                            //     },
                                            //     onCancel: () => {
                                            //         this.studData.phoneList.splice(
                                            //             this.searchPhoneInfo.ind,
                                            //             1
                                            //         );
                                            //         if (
                                            //             this.studData.phoneList
                                            //                 .length == 0
                                            //         ) {
                                            //             let obj = {
                                            //                 phone: "",
                                            //                 district: "0086",
                                            //                 isModif: 1,
                                            //                 locId: "",
                                            //                 sort: ""
                                            //             };
                                            //             this.studData.phoneList.push(
                                            //                 obj
                                            //             );
                                            //         }
                                            //     }
                                            // });
                                        } else {
                                            if(this.isSaving == false){
                                                this.findPhonePlace(ind, phone);
                                            }
                                        }
                                    } else {
                                        if(this.isSaving == false){
                                            this.findPhonePlace(ind, phone);
                                        }
                                        callback(new Error(res.data.msg));
                                    }
                                })
                                .catch(errors.call(this))
                                .finally(() => {
                                    callback();
                                });
                        } else {
                            callback();
                        }
                    }else{
                        this.findPhonePlace(ind, phone);
                        callback();
                    }
                }
            }
        },
        getForm(tid, hasSource) {
            this.updateLoadingStatus({ isLoading: true });
            let params = {
                id: tid || this.id
            };
            crmCustomer
                .form(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.isfindPhonePlace = true;
                        this.baseInfo = res.data.data;
                        if (!this.baseInfo.gender) {
                            // this.baseInfo.gender = "m";
                            // this.$set(this.baseInfo,'additionInfo',obj)
                        }
                        this.studData = Object.assign(
                            this.studData,
                            this.baseInfo
                        );
                        if (hasSource) {
                            this.$emit("setTags", this.studData.tags);
                        } else {
                        }
                        this.oldPhoneList = JSON.parse(JSON.stringify(this.baseInfo.phoneList));
                        this.oldName=JSON.parse(JSON.stringify(this.studData.name));
                        this.oldWechat=JSON.parse(JSON.stringify(this.studData.wechat));
                        this.baseInfo.phoneList.forEach(v => {
                            v.isModif = 0;
                        });
                        this.tEdit = true;
                        this.$nextTick(() => {
                            if (this.$refs.referraler) {
                                this.$refs["referraler"].query = this.studData.referral.referralerName;
                                // this.$refs.referraler.setQuery(this.studData.referral.referralerName);
                                this.remoteReferraler(this.studData.referral.referralerName)
                            }
                            // if(!(this.showLine=='1'&&this.stuId)){
                            let $f = this.fApi;
                            $f.setValue(this.baseInfo.fieldJsonData);
                            // }
                            if (this.isInvalidOverride) {
                                this.studData.isInvalidOverride = "1";
                            }
                        });
                        if (this.showLine == "1") {
                            this.$nextTick(() => {
                                // this.$refs.userLabelRef.makeSureBtn();
                            });
                        }
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        getFormBase() {
            let params = {
                id: this.$route.query.activityId
            };
            crmActivity
                .formBase(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.baseInfo = res.data.data;
                        this.studData.activityId = this.baseInfo.activityId;
                        this.studData.qrId = this.baseInfo.qrId;
                        this.studData.channelId = "";
                        this.studData.sourceList =
                            this.baseInfo.sourceList || [];
                        this.studData.tags = this.baseInfo.tags || [];
                        this.studData.officeId = this.baseInfo.officeId;
                        this.studData.followOfficeId = this.baseInfo.followOfficeId;
                        this.studData.selectOfficeId = this.baseInfo.selectOfficeId;
                        this.studData.schoolId = this.baseInfo.schoolId;
                        this.$emit("setTags", this.studData.tags);
                        this.$nextTick(() => {
                            if (this.$refs.referraler) {
                                this.$refs["referraler"].query = this.studData.referral.referralerName;
                                // this.$refs.referraler.setQuery(this.studData.referral.referralerName);
                                this.remoteReferraler(this.studData.referral.referralerName)
                           }
                            // if(!(this.showLine=='1'&&this.stuId)){
                            let $f = this.fApi;
                            $f.setValue(this.baseInfo.fieldJsonData);
                            // }
                        });
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
        },
        getCustomerByPhone(phone) {
            this.$refs["formValidate"].validate(ok => {
                if (ok) {
                    // this.updateLoadingStatus({ isLoading: true });
                    let params = {
                        phone: phone
                    };
                    crmCustomer
                        .getCustomerByPhone(params)
                        .then(valid.call(this))
                        .then(res => {
                            if (res.ok) {
                                let list = res.data.data;
                                if (list.length) {
                                    this.sameData = list;
                                    this.sameModal = true;
                                    this.updateLoadingStatus({
                                        isLoading: false
                                    });
                                } else {
                                    this.validateForm();
                                }
                            }else{
                                this.updateLoadingStatus({ isLoading: false });
                            }
                        })
                        .catch(errors.call(this))
                        .finally(() => {});
                } else {
                    this.updateLoadingStatus({ isLoading: false });
                }
            });
        },
        getReferralList() {
            let params = {
                types:
                    "referral referral,com_student_school_grade,com_student_school_type"
            };
            sysDict
                .batchListData(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.referralList = res.data.data["referral referral"];
                        this.schoolGradeList =
                            res.data.data["com_student_school_grade"];
                        this.schoolTypeList =
                            res.data.data["com_student_school_type"];
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        getSource() {
            let params = {
                type: "crm_customer_source"
            };
            sysDict
                .getTypeTree(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        if (this.$route.query.isTransferIntro == "1") {
                            this.sourceList = res.data.data.children.filter(
                                v => v.value == "referral"
                            );
                        } else if (
                            this.$route.query.source ==
                                "crm.activityEnrollment" ||
                            this.$route.query.source ==
                                "crm.activityEnrollment.detial"
                        ) {
                            this.sourceList = res.data.data.children.filter(
                                v => v.value != "referral"
                            );
                        } else {
                            this.sourceList = res.data.data.children;
                        }

                        if (this.$route.query.isTransferIntro == "1") {
                            let sourceList = this.sourceList;
                            this.studData.sourceList = [
                                sourceList[0].value,
                                sourceList[0].children[0].value,
                                sourceList[0].children[0].children[0].value
                            ];
                            this.sourceChange(this.studData.sourceList);
                        }
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        getFindByName() {
            this.updateLoadingStatus({ isLoading: true });
            let params = {
                name: "",
                level: 2
            };
            sys.findByName(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.countryList = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        listLocation(id, isCountry) {
            let params = {
                id: id
            };
            sys.listLocation(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        if (isCountry=='province') {
                            this.provinceList = res.data.data;
                        } else if(isCountry=='city') {
                            this.cityList = res.data.data;
                        }else{
                            this.areaList = res.data.data;
                        }
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
        },
        getCountryCode() {
            this.updateLoadingStatus({ isLoading: true });
            crmCustomer
                .getCountryCode()
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.areaCodeList = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        phoneBlur(ind, phone) {
            this.$nextTick(()=>{
                this.$refs["formValidate"].validateField("wechat");
                this.$refs.formValidate.validateField('name');
            })
            // this.searchPhoneInfo={
            //     ind:ind,
            //     phone:phone
            // }
            // if(this.$route.query.source=='crm.activityEnrollment'||this.$route.query.source=='crm.activityEnrollment.detial'){
            //     this.getCustomerByNameAndPhone(ind,phone)
            // }else{
            //     this.findPhonePlace(ind,phone)
            // }
        },
        findPhonePlace(ind, phone) {
            // this.updateLoadingStatus({ isLoading: true });
            this.isfindPhonePlace = true;

            // ====> start  处理无法识别的、莫名其妙的空格
            if(phone){
                if(phone){
                    var re = /[\u202C\u202D\u202E]/g;
                    phone = phone.replace(re, "");
                }
            }
            // ====> end

            let params = {
                phone: phone || ""
            };
            crmCustomer
                .findPhonePlace(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let info = res.data.data;
                        this.studData.phoneList[ind].district = info.areaCode;
                        this.studData.phoneList[ind].locId = info.country;
                        this.studData.phoneList[ind].sort = ind + "";
                        if (ind == 0) {
                            let obj = {
                                city: info.city,
                                cityName: info.cityName,
                                country: info.country,
                                countryName: info.countryName,
                                province: info.province,
                                provinceName: info.provinceName,
                                area:"",
                                areaName:""
                            };
                            if (info.city == info.province) {
                                obj.city = "";
                                obj.cityName = "";
                                this.showCity = false;
                            } else {
                                this.showCity = true;
                            }
                            this.studData.districtEntity = obj;
                            // 百度地图API功能
                            // var map = new BMap.Map("allmap");
                            // var point = new BMap.Point(116.331398,39.897445);
                            // map.centerAndZoom(point,12);
                            // // 创建地址解析器实例
                            let myGeo = new BMap.Geocoder();
                            let address =
                                obj.countryName +
                                obj.provinceName +
                                obj.cityName;

                            this.studData.address = address;
                            // 将地址解析结果显示在地图上,并调整地图视野
                            myGeo.getPoint(
                                address,
                                point => {
                                    if (point) {
                                        this.studData.latLongAddress =
                                            point.lng + "," + point.lat;
                                    } else {
                                        // alert("您选择地址没有解析到结果!");
                                    }
                                },
                                obj.cityName ||
                                    obj.provinceName ||
                                    obj.countryName
                            );
                        }
                    }else{
                        this.updateLoadingStatus({ isLoading: false });
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        getCustomerByRPTRule(ind, phone) {
            if (!this.studData.name) {
                this.addNmaeModal = true;
                return;
            }
            this.updateLoadingStatus({ isLoading: true });
            /*let detectionArr=this.detection.join('-').split('-');
            let detectionMap=[...new Set(detectionArr)];
            let detectionList=[];
            let params = {
                rptRule:[],
                rptRuleValue:{

                }
            };
            // Object.assign({}, this.studData);
            if(detectionMap.indexOf('name')!=-1&&this.studData.name){
                params.rptRuleValue.name=this.studData.name;
                detectionList=detectionList.concat(this.detection.filter(v=>v.indexOf('name')!=-1));
            }else{
                detectionList=detectionList.filter(v=>v.indexOf('name')==-1);
            }
            if(detectionMap.indexOf('phone')!=-1){
                let phone=this.studData.phoneList.filter(v=>v.isModif==1&&v.phone);
                if(phone.length){
                    params.rptRuleValue.phoneList=phone;
                    detectionList=detectionList.concat(this.detection.filter(v=>v.indexOf('phone')!=-1));
                }else{
                    detectionList=detectionList.filter(v=>v.indexOf('phone')==-1);
                }
            }
            if(detectionMap.indexOf('wechat')!=-1&&this.studData.wechat){
                params.rptRuleValue.wechat=this.studData.wechat;
                detectionList=detectionList.concat(this.detection.filter(v=>v.indexOf('wechat')!=-1));
            }else{
                detectionList=detectionList.filter(v=>v.indexOf('wechat')==-1);
            }
            params.rptRule=[...new Set(detectionList)];
            if(this.studData.id){
                params.id=this.studData.id;
            }
            params=Object.assign(params,params.rptRuleValue);*/

            let params = Object.assign({}, this.studData);

            if (params.birthday) {
                params.birthday = new Date(params.birthday).format(
                    "yyyy-MM-dd"
                );
            } else {
                params.birthday = "";
            }
            if (params.sourceList[0] != "referral") {
                params.referral = null;
            }
            if(params.phoneList.every(v=>!v.phone)){
                params.phoneList=null;
            }
            if(this.$route.query.source=="crm.myCustomer"||this.$route.query.source=="sign.contractGeneration"){
                params.isCreateSelfCustomer="1";
            }
            crmCustomer
                .getCustomerByRPTRule(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.duplicateData=res.data.data||[];
                        let info = res.data.data;
                        if (info&&
                            info.length &&
                            this.isSaving == false
                        ) {
                            this.showDuplicateModal();
                            this.updateLoadingStatus({ isLoading: false });
                        } else {
                            if (this.isSaving == false) {
                                this.findPhonePlace(ind, phone);
                            }
                        }
                    } else {
                        this.updateLoadingStatus({ isLoading: false });
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
        },
        toShowCity(key, val) {
            let _name = "";
            if (key == "countryName") {
                this.showCity = true;
                _name =
                    this.countryList.find(v => v.id == val) &&
                    this.countryList.find(v => v.id == val).name;
            } else if (key == "provinceName") {
                this.showCity = true;
                _name =
                    this.provinceList.find(v => v.id == val) &&
                    this.provinceList.find(v => v.id == val).name;
            } else if(key=="cityName") {
                _name =
                    this.cityList.find(v => v.id == val) &&
                    this.cityList.find(v => v.id == val).name;
            }else{
                _name =
                    this.areaList.find(v => v.id == val) &&
                    this.areaList.find(v => v.id == val).name;
            }
            this.studData.districtEntity[key] = _name;
        },
        userLabelTrueChoose(data) {
            this.userLabelData = data.hasCheckedTagNames;
            this.studData.tags = data.hasCheckedTagids;
        },
        getMap() {
            this.isSchoolMap = false;
            this.$refs.mapModel.modelShow();
        },
        getSchoolMap() {
            this.isSchoolMap = true;
            this.$refs.mapModel.modelShow();
        },
        mapOk(keyword, province, city, region, lng, lat) {
            if (this.isSchoolMap) {
                this.studData.additionInfo.school = keyword;
                this.studData.additionInfo.latLongSchool = lng + "," + lat;
            } else {
                this.studData.address = keyword;
                this.studData.latLongAddress = lng + "," + lat;
            }
        },
        delContacts(ind) {
            this.studData.additionInfo.splice(ind, 1);
        },
        addPhone() {
            this.studData.phoneList.push({
                phone: "",
                district: "0086",
                isModif: 1,
                locId: "",
                sort: ""
            });
        },
        delPhone(ind) {
            this.studData.phoneList.splice(ind, 1);
        },
        referralerQuery(query) {
            if (query == "") {
                this.referralerSearch(query);
                // this.referralerSearch(query);
            }
        },
        remoteReferraler(query) {
            let _query = ''
            if(this.referralerList){
                this.referralerList.forEach(item=>{
                    if(item.id == this.studData.referral.referraler){
                        _query = item.name+item.phone
                    }
                })
            }
            if(_query != query){ // 防止选择数据的时候触发了搜索
                this.referralerSearch(query);
            }
        },
        referralerSearch(query) {
            if(!query){
                return
            }
            this.referralLoading = true;
            let params = {
                searchField: "name",
                searchFieldParam: query
            };
            if (this.studData.referral.referralType == "Student Referral") {
                params.mainTable = "com_student";
                params.field1 = "phone";
            } else if (
                this.studData.referral.referralType == "Non-Student Referral"
            ) {
                params.mainTable = "crm_customer";
                params.field1 = "star_phone";
            } else {
                params.mainTable = "sys_user";
                params.field1 = "mobile";
            }
            sysCommonSql
                .querySingleTableData(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {

                        this.referralerList = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.referralLoading = false;
                });
        },
        reset() {
            this.$refs["formValidate"].resetFields();
            this.isInvalidOverride = false;
            this.studData.isInvalidOverride = null;
            let $f = this.fApi;
            $f.resetFields();
            this.studData= {
                id:'',
                activityId: null,
                qrId: null,
                channelId: null,
                officeId: null,
                followOfficeId: null,
                name: "",
                enName: "",
                wechat: "",
                phoneList: [
                    {
                        phone: "",
                        district: "0086",
                        isModif: 1,
                        locId: "",
                        sort: ""
                    }
                ],
                qq: "",
                districtEntity: {
                    city: "",
                    cityName: "",
                    country: "CN7",
                    countryName: this.$t('modules_spoc_crm_web_src_modules_resourceentrymodal_578'),
                    province: "",
                    provinceName: "",
                    area:"",
                    areaName:""
                },
                email: "",
                selectOfficeId: "",
                schoolId: "",
                sourceList: [],
                address: "",
                latLongAddress: "",
                referral: {
                    referralType: "",
                    referraler: "",
                    referralerName: "",
                    referralerPhone: ""
                },
                tags: [],
                remarks: "",
                birthday: "",
                gender: "",
                additionInfo: {
                    schoolGrade: "",
                    schoolType: "",
                    school: "",
                    latLongSchool: "",
                    fieldJsonData: {}
                },
                fieldJsonData: {},
                isInvalidOverride: null
            };
            if (this.showLine == "1") {
                this.tEdit = false;
                this.$nextTick(() => {
                    this.$refs.leadsInfoObj.getFormFn(this.id);
                });
            }
        },
        validateForm(name) {
            this.$refs["formValidate"].validate(ok => {
                if (ok) {
                    // if(!(this.showLine=='1'&&this.stuId)){
                    let $f = this.fApi;
                    if(this.rule.length){
                        $f.submit(
                            (formData, api) => {
                                //提交表单
                                this.studData.fieldJsonData = formData;
                                if (
                                    this.$route.query.source ==
                                        "crm.activityEnrollment" ||
                                    this.$route.query.source ==
                                        "crm.activityEnrollment.detial"
                                ) {
                                    this.saveEnrollCustomer();
                                } else {
                                    this.saveLeads();
                                }
                            },
                            api => {
                                //验证未通过
                                console.log('validateForm4')
                                this.updateLoadingStatus({ isLoading: false });
                            }
                        );
                    }else{
                        //提交表单
                        this.studData.fieldJsonData = null;
                        if (
                            this.$route.query.source ==
                                "crm.activityEnrollment" ||
                            this.$route.query.source ==
                                "crm.activityEnrollment.detial"
                        ) {
                            this.saveEnrollCustomer();
                        } else {
                            this.saveLeads();
                        }
                    }

                    // }else{
                    //     if(this.$route.query.source=='crm.activityEnrollment'||this.$route.query.source=='crm.activityEnrollment.detial'){
                    //         this.saveEnrollCustomer();
                    //     }else{
                    //         this.saveLeads();
                    //     }
                    // }
                } else {
                    this.sameModal = false;
                    this.updateLoadingStatus({ isLoading: false });
                }
            });
        },
        saveAll(tags) {
            this.updateLoadingStatus({ isLoading: true });
            if (tags && tags.length) {
                this.studData.tags = tags;
            }

            this.studData.phoneList.forEach((obj)=>{
                // ====> start  处理无法识别的、莫名其妙的空格
                if(obj.phone){
                    var re = /[\u202C\u202D\u202E]/g;
                    obj.phone = obj.phone.replace(re, "");
                }
                // ====> end
            })

            if (this.tEdit) {
                this.studData.phoneList.forEach((v, k) => {
                    v.sort = k + "";
                    if (this.oldPhoneList.find(val => v.phone == val.phone)) {
                        v.isModif = "0";
                    } else {
                        v.isModif = "1";
                    }
                });
                this.$nextTick(() => {
                    this.isSaving = true;
                    if (this.studData.phoneList.some(v => v.isModif == "1")&&this.isPhonereQuired) {
                        let phones = this.studData.phoneList
                            .map(v => v.phone)
                            .join(",");
                        this.getCustomerByPhone(phones);
                    } else {
                        this.validateForm();
                    }
                });
            } else {
                this.isSaving = true;
                if(this.isPhonereQuired){
                    let phones = this.studData.phoneList
                        .map(v => v.phone)
                        .join(",");
                    this.getCustomerByPhone(phones);
                }else{
                    this.validateForm();
                }
            }
        },
        saveLeads() {
            this.updateLoadingStatus({ isLoading: true });
            let params = Object.assign({}, this.studData);
            /*let detectionArr=this.detection.join('-').split('-');
            let detectionMap=[...new Set(detectionArr)];
            let detectionList=[];
            params.rptRule=[];
            params.rptRuleValue={};
            // Object.assign({}, this.studData);
            if(detectionMap.indexOf('name')!=-1&&this.studData.name){
                params.rptRuleValue.name=this.studData.name;
                detectionList=detectionList.concat(this.detection.filter(v=>v.indexOf('name')!=-1));
            }else{
                detectionList=detectionList.filter(v=>v.indexOf('name')==-1);
            }
            if(detectionMap.indexOf('phone')!=-1){
                let phone=this.studData.phoneList.filter(v=>v.isModif==1&&v.phone);
                if(phone.length){
                    params.rptRuleValue.phoneList=phone;
                    detectionList=detectionList.concat(this.detection.filter(v=>v.indexOf('phone')!=-1));
                }else{
                    detectionList=detectionList.filter(v=>v.indexOf('phone')==-1);
                }
            }
            if(detectionMap.indexOf('wechat')!=-1&&this.studData.wechat){
                params.rptRuleValue.wechat=this.studData.wechat;
                detectionList=detectionList.concat(this.detection.filter(v=>v.indexOf('wechat')!=-1));
            }else{
                detectionList=detectionList.filter(v=>v.indexOf('wechat')==-1);
            }
            params.rptRule=[...new Set(detectionList)];*/

            if (params.birthday) {
                params.birthday = new Date(params.birthday).format(
                    "yyyy-MM-dd"
                );
            } else {
                params.birthday = "";
            }
            if (params.sourceList[0] != "referral") {
                params.referral = null;
            }
            if(params.phoneList.every(v=>!v.phone)){
                params.phoneList=null;
            }
            if(this.$route.query.source=="crm.myCustomer"||this.$route.query.source=="sign.contractGeneration"){
                params.isCreateSelfCustomer="1";
            }
            crmCustomer
                .save(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.$emit("saveOk");
                        if (
                            this.$route.query.source ==
                                "crm.activityEnrollment" ||
                            this.$route.query.source ==
                                "crm.activityEnrollment.detial"
                        ) {
                            this.getFormBase();
                        }
                        if (this.showLine == "1") {
                            this.$nextTick(() => {
                                this.getFormFn();
                            });
                        }
                        this.$Message.success(res.data.message);
                        if (this.showLine == "1" && this.tEdit) {
                            this.tEdit = false;
                            this.$nextTick(() => {
                                this.$refs.leadsInfoObj.getFormFn(this.id);
                                this.$emit("uploadTags");
                            });
                            return;
                        }
                        this.sameModal = false;
                        if (this.$route.query.source) {
                            if(this.$route.query.source=="sign.contractGeneration"){
                                this.$router.push({
                                    name: this.$route.query.source,
                                    query:{
                                        id:this.$route.query.signId,
                                        officeId:this.$route.query.officeId,
                                        phone:params.phoneList[0].phone,
                                        cusId:res.data.data
                                    }
                                });
                            }else{
                                this.$router.push({
                                    name: this.$route.query.source
                                });
                            }
                        } else {
                            this.$Modal.confirm({
                                title: '录入成功',
                                content: '<p>继续录入或者进入客户管理</p>',
                                okText:'继续录入',
                                cancelText:'进入客户管理',
                                onOk: () => {
                                    this.reset();
                                },
                                onCancel: () => {
                                    this.$router.push({
                                        name: "crm.customerManagement"
                                    });
                                }
                            });
                        }
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        saveEnrollCustomer() {
            this.updateLoadingStatus({ isLoading: true });
            let params = Object.assign({}, this.studData);
            if (params.birthday) {
                params.birthday = new Date(params.birthday).format(
                    "yyyy-MM-dd"
                );
            } else {
                params.birthday = "";
            }
            params.isMemberEnroll = "0";
            params.isFormEnroll = "0";
            params.referral = null;
            /*let detectionArr=this.detection.join('-').split('-');
            let detectionMap=[...new Set(detectionArr)];
            let detectionList=[];
            params.rptRule=[]
            params.rptRuleValue={}
            // Object.assign({}, this.studData);
            if(detectionMap.indexOf('name')!=-1&&this.studData.name){
                params.rptRuleValue.name=this.studData.name;
                detectionList=detectionList.concat(this.detection.filter(v=>v.indexOf('name')!=-1));
            }else{
                detectionList=detectionList.filter(v=>v.indexOf('name')==-1);
            }
            if(detectionMap.indexOf('phone')!=-1){
                let phone=this.studData.phoneList.filter(v=>v.isModif==1&&v.phone);
                if(phone.length){
                    params.rptRuleValue.phoneList=phone;
                    detectionList=detectionList.concat(this.detection.filter(v=>v.indexOf('phone')!=-1));
                }else{
                    detectionList=detectionList.filter(v=>v.indexOf('phone')==-1);
                }
            }
            if(detectionMap.indexOf('wechat')!=-1&&this.studData.wechat){
                params.rptRuleValue.wechat=this.studData.wechat;
                detectionList=detectionList.concat(this.detection.filter(v=>v.indexOf('wechat')!=-1));
            }else{
                detectionList=detectionList.filter(v=>v.indexOf('wechat')==-1);
            }
            params.rptRule=[...new Set(detectionList)];*/
            if(params.phoneList.every(v=>!v.phone)){
                params.phoneList=null;
            }
            crmCustomer
                .saveEnrollCustomer(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.$Message.success(res.data.message);
                        this.$emit("saveOk");
                        if (
                            this.$route.query.source ==
                                "crm.activityEnrollment" ||
                            this.$route.query.source ==
                                "crm.activityEnrollment.detial"
                        ) {
                            this.getFormBase();
                        }
                        if (this.showLine == "1") {
                            this.$nextTick(() => {
                                this.getFormFn();
                            });
                        }
                        let query = { ...this.$route.query };
                        delete query["source"];
                        this.sameModal = false;
                        this.$router.push({
                            name: this.$route.query.source,
                            query: query
                        });
                        this.$emit("uploadTags");
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        addName() {
            if (this.studData.name) {
                this.addNmaeModal = false;
                this.getCustomerByRPTRule(
                    this.searchPhoneInfo.ind,
                    this.searchPhoneInfo.phone
                );
            } else {
                this.$refs.formDynamic.validateField("name");
            }
            this.$refs["formValidate"].validateField("name");
        },
        referralTypeChange(val) {
            this.$refs.formValidate.validateField("referral.referralType");
            this.studData.sourceList.splice(2,1,val);
            this.referralerList=[];
            this.referralerSearch("");
        },
        referralerChange(val) {
            let obj = this.referralerList.find(v => v.id == val);
            this.studData.referral.referralerName = obj.name;
            this.studData.referral.referralerPhone = obj.phone;
            this.$refs.formValidate.validateField("referral.referraler");
        },
        setEdit() {
            this.getForm();
        },
        setTagsName(names) {
            this.userLabelData = names;
        },
        sourceChange(val, sel) {
            this.studData.referral.referralType = val[2];
            this.remoteReferraler("");
        },
        nameBlur(val){
            if(val=='name'){
                if(this.isPhonereQuired){
                    this.studData.phoneList.forEach((v,k)=>{
                        this.$refs.formValidate.validateField('phoneList.'+k+'.phone');
                    })
                }
            }
            if(val=='wechat'){
                this.$nextTick(()=>{
                    this.studData.phoneList.forEach((v,k)=>{
                        this.$refs.formValidate.validateField('phoneList.'+k+'.phone');
                    })
                    // this.$refs.formValidate.validateField('phoneList.'+(this.studData.phoneList.length-1)+'.phone');
                    this.$refs.formValidate.validateField('name');
                })
            }
        },

        validateName(rule, value, callback){
            let emptyObj = !!value;
            if (emptyObj) {
                let phoneFlag=this.studData.phoneList.filter(v=>!v.phone).length;
                if (phoneFlag&&this.isPhonereQuired) {
                    this.studData.phoneList.forEach((v,k)=>{
                        this.$refs.formValidate.validateField('phoneList.'+k+'.phone');
                    })
                    callback();
                    return;
                }
                if (!this.studData.wechat&&this.isWechatQuired) {
                    this.$refs["formValidate"].validateField("wechat");
                    callback();
                    return;
                }
                /*let detectionArr=this.detection.join('-').split('-');

                let detectionMap=[...new Set(detectionArr)];
                let detectionList=[];
                let params = {
                    rptRule:[],
                    rptRuleValue:{

                    }
                };
                // Object.assign({}, this.studData);
                if(detectionMap.indexOf('name')!=-1&&this.studData.name){
                    params.rptRuleValue.name=this.studData.name;
                    detectionList=detectionList.concat(this.detection.filter(v=>v.indexOf('name')!=-1));
                }else{
                    detectionList=detectionList.filter(v=>v.indexOf('name')==-1);
                }
                if(detectionMap.indexOf('phone')!=-1){
                    if(detectionMap.indexOf('name')!=-1&&this.studData.name&&this.oldName!=params.rptRuleValue.name){
                        this.studData.phoneList.map(v=>v.isModif=1);
                    }
                    let phone=this.studData.phoneList.filter(v=>v.isModif==1&&v.phone);
                    if(phone.length){
                        params.rptRuleValue.phoneList=phone;
                        detectionList=detectionList.concat(this.detection.filter(v=>v.indexOf('phone')!=-1));
                    }else{
                        detectionList=detectionList.filter(v=>v.indexOf('phone')==-1);
                    }
                }
                if(detectionMap.indexOf('wechat')!=-1&&this.studData.wechat){
                    params.rptRuleValue.wechat=this.studData.wechat;
                    detectionList=detectionList.concat(this.detection.filter(v=>v.indexOf('wechat')!=-1));
                }else{
                    detectionList=detectionList.filter(v=>v.indexOf('wechat')==-1);
                }
                params.rptRule=[...new Set(detectionList)];
                if(this.studData.id){
                    params.id=this.studData.id;
                }
                params=Object.assign(params,params.rptRuleValue);*/
                let params = Object.assign({}, this.studData);

                if (params.birthday) {
                    params.birthday = new Date(params.birthday).format(
                        "yyyy-MM-dd"
                    );
                } else {
                    params.birthday = "";
                }
                if (params.sourceList[0] != "referral") {
                    params.referral = null;
                }
                if(params.phoneList.every(v=>!v.phone)){
                    params.phoneList=null;
                }
                if(this.$route.query.source=="crm.myCustomer"||this.$route.query.source=="sign.contractGeneration"){
                    params.isCreateSelfCustomer="1";
                }
                crmCustomer
                    .getCustomerByRPTRule(params)
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            this.duplicateData=res.data.data||[];
                            let info = res.data.data;
                            if (info&&info.length) {
                                this.showDuplicateModal();
                                callback(new Error(this.$t('modules_spoc_crm_web_src_modules_resourceentrymodal copy_539')));
                            } else {
                                callback();
                            }
                        } else {
                            callback(new Error(res.data.msg));
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {
                        this.oldName=params.name;
                        callback();
                    });
            } else {
                callback(new Error(this.$t('modules_spoc_core_web_src_views_customstate_stategroup_204')));
            }
        },
        validateWechat(rule, value, callback){
            let emptyObj = !!value;
            if(this.isWechatQuired){
                if (emptyObj) {
                    if (!this.studData.name&&this.hasDetection('name')) {
                        this.$refs["formValidate"].validateField("name");
                        callback();
                        return;
                    }
                    /*let detectionArr=this.detection.join('-').split('-');
                    let detectionMap=[...new Set(detectionArr)];
                    let detectionList=[];
                    let params = {
                        rptRule:[],
                        rptRuleValue:{

                        }
                    };
                    // Object.assign({}, this.studData);
                    if(detectionMap.indexOf('name')!=-1&&this.studData.name){
                        params.rptRuleValue.name=this.studData.name;
                        detectionList=detectionList.concat(this.detection.filter(v=>v.indexOf('name')!=-1));
                    }else{
                        detectionList=detectionList.filter(v=>v.indexOf('name')==-1);
                    }
                    if(detectionMap.indexOf('phone')!=-1){
                        let phone=this.studData.phoneList.filter(v=>v.isModif==1&&v.phone);
                        if(phone.length){
                            params.rptRuleValue.phoneList=phone;
                            detectionList=detectionList.concat(this.detection.filter(v=>v.indexOf('phone')!=-1));
                        }else{
                            detectionList=detectionList.filter(v=>v.indexOf('phone')==-1);
                        }
                    }
                    if(detectionMap.indexOf('wechat')!=-1&&this.studData.wechat){
                        params.rptRuleValue.wechat=this.studData.wechat;
                        detectionList=detectionList.concat(this.detection.filter(v=>v.indexOf('wechat')!=-1));
                    }else{
                        detectionList=detectionList.filter(v=>v.indexOf('wechat')==-1);
                    }
                    params.rptRule=[...new Set(detectionList)];

                    if(this.studData.id){
                        params.id=this.studData.id;
                    }
                    params=Object.assign(params,params.rptRuleValue);*/

                    let params = Object.assign({}, this.studData);

                    if (params.birthday) {
                        params.birthday = new Date(params.birthday).format(
                            "yyyy-MM-dd"
                        );
                    } else {
                        params.birthday = "";
                    }
                    if (params.sourceList[0] != "referral") {
                        params.referral = null;
                    }
                    if(params.phoneList.every(v=>!v.phone)){
                        params.phoneList=null;
                    }
                    if(this.$route.query.source=="crm.myCustomer"||this.$route.query.source=="sign.contractGeneration"){
                        params.isCreateSelfCustomer="1";
                    }
                    crmCustomer
                        .getCustomerByRPTRule(params)
                        .then(valid.call(this))
                        .then(res => {
                            if (res.ok) {
                                this.duplicateData=res.data.data||[];
                                let info = res.data.data;
                                if (info&&info.length) {
                                    this.showDuplicateModal();
                                    callback(new Error(this.$t('modules_spoc_crm_web_src_modules_resourceentrymodal copy_539')));
                                } else {
                                    callback();
                                }
                            } else {
                                callback(new Error(res.data.msg));
                            }
                        })
                        .catch(errors.call(this))
                        .finally(() => {
                            callback();
                        });
                } else {
                    callback(new Error(this.$t('modules_spoc_core_web_src_views_customstate_stategroup_204')));
                }
            }else{
                callback();
            }
        }
    },
    watch: {
        "studData.districtEntity.city": {
            handler: function(val, oldVal) {
                if (val) {
                    this.listLocation(val, 'area');
                }
                if (!this.isfindPhonePlace) {
                    this.studData.districtEntity.area = "";
                    this.studData.districtEntity.areaName = "";
                }
                this.$nextTick(() => {
                    this.isfindPhonePlace = false;
                });
            },
            deep: true
        },
        "studData.districtEntity.province": {
            handler: function(val, oldVal) {
                if (val) {
                    this.listLocation(val, 'city');
                }
                if (!this.isfindPhonePlace) {
                    this.studData.districtEntity.city = "";
                    this.studData.districtEntity.cityName = "";
                }
                // this.$nextTick(() => {
                //     this.isfindPhonePlace = false;
                // });
            },
            deep: true
        },
        "studData.districtEntity.country": {
            handler: function(val, oldVal) {
                if (val) {
                    this.listLocation(val, 'province');
                }
                if (!this.isfindPhonePlace) {
                    this.studData.districtEntity.province = "";
                    this.studData.districtEntity.provinceName = "";
                }
                // this.studData.districtEntity.city='';
                // this.studData.districtEntity.cityName='';
            },
            deep: true
        },
        "studData.referral.referralType": {
            handler: function(val, oldVal) {
                if (
                    this.studData.sourceList[0] == "referral" &&
                    val&&val.indexOf("referral") != -1
                ) {
                    this.$set(this.studData.sourceList, 2, val);
                }
            },
            deep: true
        },
        "studData.phoneList": {
            handler: function(val, oldVal) {
                this.isSaving = false;
            },
            deep: true
        },
        "studData.name": {
            handler: function(val, oldVal) {
                this.isSaving = false;
            },
            deep: true
        }
    }
};
</script>
