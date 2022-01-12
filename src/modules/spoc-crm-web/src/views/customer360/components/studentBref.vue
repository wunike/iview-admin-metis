<style lang="less">
@mainColor: #44bcb7;
.student-bref-container {
    position: relative;
    padding-bottom: 40px;
    background: #fff;
    h3 {
        @h: 46px;
        height: @h + 12px;
        line-height: @h;
        padding-left: 24px;
        padding-top: 12px;
        font-size: 16px;
    }
    .edit-wrapper {
        float: right;
        margin-right: 60px;
        color: #999;
        cursor: pointer;
        i {
            margin-left: 7px;
            font-size: 14px;
            cursor: pointer;
            &:hover {
                color: @mainColor;
            }
        }
    }
    .ivu-form-inline .ivu-form-item {
        width: 50%;
        padding-right: 60px;
        margin-right: 0;
        margin-bottom: 0;
    }
    .ivu-form-inline.margin .ivu-form-item {
        margin-bottom: 20px;
    }
    // .ivu-input-wrapper, .ivu-select, .ivu-radio-group{
    //     // width: 280px;
    //     // margin-right: 58px;
    // }
    .ivu-form-inline {
        button {
            width: 65px;
            height: 32px;
            margin: 0 8px;
            padding: 0;
            font-size: 14px;
        }
    }
    .ivu-date-picker {
        width: 100%;
    }
    .add-contacts {
        float: right;
        margin-right: 60px;
    }
    .title {
        @h: 20px + 16px + 16px;
        margin-top: 4px;
        height: @h;
        line-height: @h;
        padding-left: 24px;
        font-size: 14px;
    }
}
</style>

<template>
    <div class="student-bref-container">
        <h3>
            <span>学员信息</span>
            <div class="edit-wrapper" v-if="!editStudent && myButtonPrem.indexOf('editStudent') > -1"><i class="iconfont icon-bianzu31" @click="editStudentStatus"></i></div>
        </h3>
        <Form ref="studentForm" :model="student" :rules="ruleStudent" inline :label-width="124" :class="{ margin: editStudent }">
            <FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_884')" prop="name">
                <span v-if="!editStudent">{{ student.name }}</span>
                <Input v-else type="text" v-model="student.name" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_885')" />
            </FormItem>
            <FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_886')" prop="enname">
                <span v-if="!editStudent">{{ student.enname }}</span>
                <Input v-else type="text" v-model="student.enname" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_885')" />
            </FormItem>
            <FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_887')" prop="phone">
                <span v-if="!editStudent">{{ student.phone }}</span>
                <Input v-else type="text" v-model="student.phone" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_885')" />
            </FormItem>
            <FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_888')" prop="gender">
                <span v-if="!editStudent">{{ student.gender }}</span>
                <RadioGroup v-else v-model="student.gender">
                    <Radio label="male">Male</Radio>
                    <Radio label="female">Female</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_889')" prop="birthday">
                <span v-if="!editStudent">{{ student.birthday }}</span>
                <DatePicker v-else type="date" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_885')" v-model="student.birthday"></DatePicker>
            </FormItem>
            <FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_890')" prop="type">
                <span v-if="!editStudent">{{ student.type }}</span>
                <Select v-else v-model="student.type" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_891')">
                    <Option v-for="item in selectLists" :key="item.value" :value="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_892')" prop="schoolName">
                <span v-if="!editStudent">{{ student.schoolName }}</span>
                <Input v-else type="text" v-model="student.schoolName" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_885')" />
            </FormItem>
            <FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_893')" prop="grade">
                <span v-if="!editStudent">{{ student.grade }}</span>
                <Select v-else v-model="student.grade" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_894')">
                    <Option v-for="item in selectLists" :key="item.value" :value="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem v-if="editStudent" style="text-align: center;width: 100%;">
                <Button @click="handleReset('studentForm')">{{$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_895')}}</Button>
                <Button type="primary" @click="handleSubmitStudent('studentForm')">{{$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_896')}}</Button>
            </FormItem>
        </Form>
        <h3>
            <span>{{$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_897')}}</span>
            <Button class="add-contacts" @click="addContact">{{$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_898')}}</Button>
        </h3>
        <div class="contacts-lists">
            <div class="contacts-item" v-for="(contacts, index) in contactsLists">
                <div class="title">
                    <h4>
                        <span>联系人{{ index + 1 }}</span>
                        <div class="edit-wrapper" v-if="!contacts.edit && myButtonPrem.indexOf('editStudent') > -1">
                            <i class="iconfont icon-lujingfuzhi" @click="deleteContact(index)"></i>
                            <i class="iconfont icon-bianzu31" @click="editContact(index)"></i>
                        </div>
                    </h4>
                </div>
                <Form ref="contactsForm" :model="contacts" :rules="ruleContacts" inline :label-width="124" :class="{ margin: contacts.edit }">
                    <FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_884')" prop="name">
                        <span v-if="!contacts.edit">{{ contacts.name }}</span>
                        <Input v-else type="text" v-model="contacts.name" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_885')" />
                    </FormItem>
                    <FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_900')" prop="gx">
                        <span v-if="!contacts.edit">{{ contacts.gx }}</span>
                        <Select v-else v-model="contacts.gx" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_891')">
                            <Option v-for="item in selectLists" :key="item.value" :value="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_887')" prop="phone">
                        <span v-if="!contacts.edit">{{ contacts.phone }}</span>
                        <Input v-else type="text" v-model="contacts.phone" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_885')" />
                    </FormItem>
                    <FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_901')" prop="tel">
                        <span v-if="!contacts.edit">{{ contacts.tel }}</span>
                        <Input v-else type="text" v-model="contacts.tel" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_885')" />
                    </FormItem>
                    <FormItem label="QQ：" prop="qq">
                        <span v-if="!contacts.edit">{{ contacts.qq }}</span>
                        <Input v-else type="text" v-model="contacts.qq" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_885')" />
                    </FormItem>
                    <FormItem label="Wechat：" prop="wechat">
                        <span v-if="!contacts.edit">{{ contacts.wechat }}</span>
                        <Input v-else type="text" v-model="contacts.wechat" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_885')" />
                    </FormItem>
                    <FormItem label="E-mail：" prop="email">
                        <span v-if="!contacts.edit">{{ contacts.email }}</span>
                        <Input v-else type="text" v-model="contacts.email" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_885')" />
                    </FormItem>
                    <FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_902')" prop="primary">
                        <span v-if="!contacts.edit">{{ contacts.primary }}</span>
                        <RadioGroup v-else v-model="contacts.primary">
                            <Radio label="1">{{$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_903')}}</Radio>
                            <Radio label="0">{{$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_904')}}</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_905')" prop="remarks">
                        <span v-if="!contacts.edit">{{ contacts.remarks }}</span>
                        <Input v-else type="text" v-model="contacts.email" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_885')" />
                    </FormItem>
                    <FormItem v-if="contacts.edit" style="text-align: center;width: 100%;">
                        <Button style="margin-left: 8px" @click="handleReset('contactsForm', index)">{{$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_895')}}</Button>
                        <Button type="primary" @click="handleSubmitContacts('contactsForm', index)">{{$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_896')}}</Button>
                    </FormItem>
                </Form>
            </div>
        </div>
        <h3>
            <span>{{$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_906')}}</span>
            <div class="edit-wrapper" v-if="!editAddress"><i class="iconfont icon-bianzu31" @click="editAddressStatus"></i></div>
        </h3>
        <Form ref="addressForm" :model="address" :rules="ruleAddress" inline :label-width="124" :class="{ margin: editAddress }">
            <FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_907')" prop="province">
                <span v-if="!editAddress">{{ address.province }}</span>
                <Input v-else type="text" v-model="address.province" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_885')" />
            </FormItem>
            <FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_908')" prop="city">
                <span v-if="!editAddress">{{ address.city }}</span>
                <Input v-else type="text" v-model="address.city" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_885')" />
            </FormItem>
            <FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_909')" prop="city">
                <span v-if="!editAddress">{{ address.city }}</span>
                <Input v-else type="text" v-model="address.city" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_885')" />
            </FormItem>
            <FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_910')" prop="city">
                <span v-if="!editAddress">{{ address.city }}</span>
                <Input v-else type="text" v-model="address.city" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_885')" />
            </FormItem>
            <FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_911')" prop="city">
                <span v-if="!editAddress">{{ address.city }}</span>
                <Input v-else type="text" v-model="address.city" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_885')" />
            </FormItem>
            <FormItem v-if="editAddress" style="text-align: center;width: 100%;">
                <Button @click="handleReset('addressForm')">{{$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_895')}}</Button>
                <Button type="primary" @click="handleSubmitAddress('addressForm')">{{$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_896')}}</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
/**
 ** @author: 曹见芳
 ** 客户360 - 基本信息
 */
import { mapMutations, mapState } from 'vuex';
import { waitUntil } from "@public/libs/util";
export default {
    name: 'studentBref',
    props: {},
    data() {
        return {
            editStudent: !false, //true: 显示输入框, false: 显示文本
            student: {
                name: this.$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_912'),
                enname: 'Oswald',
                phone: '18010101111',
                gender: 'male',
                birthday: '2019-9-23',
                type: '1',
                schoolName: '',
                grade: '1'
            },
            ruleStudent: {},
            ruleContacts: {},
            ruleAddress: {},
            contactsLists: [],
            newContacts: {
                edit: true, //true: 显示输入框, false: 显示文本
                name: '',
                gx: '',
                phone: '',
                tel: '',
                qq: '',
                wechat: '',
                email: '',
                primary: '',
                remarks: '',
                isNew: true
            },
            selectLists: [
                {
                    value: '1',
                    label: '111'
                },
                {
                    value: '2',
                    label: '222'
                }
            ],
            editAddress: false, //true: 显示输入框, false: 显示文本
            address: {},
            myButtonPrem: []
        };
    },
    computed: {
        ...mapState(["buttonPerm", "userInfo"]),
    },
    mounted() {
        waitUntil(
            () => {
                return (this.userInfo && this.buttonPerm && (JSON.stringify(this.buttonPerm) != "{}")) || false;
            },
            () => {
                this.myButtonPrem = this.buttonPerm['crm.customer360'] || []
            }
        );
        this.getForm();
    },
    methods: {
        getForm() {
            this.contactsLists = [
                {
                    edit: false, //true: 显示输入框, false: 显示文本
                    name: '11',
                    gx: '1',
                    phone: '1',
                    tel: '1',
                    qq: '1',
                    wechat: '1',
                    email: '1',
                    primary: '1',
                    remarks: '1'
                },
                {
                    edit: true, //true: 显示输入框, false: 显示文本
                    name: '22',
                    gx: '2',
                    phone: '4',
                    tel: '3',
                    qq: '2',
                    wechat: '21',
                    email: '21',
                    primary: '2',
                    remarks: '2222'
                }
            ];
        },
        handleReset(name, index) {
            if (name == 'studentForm') {
                this.editStudent = false;
                this.$refs[name].resetFields();
            } else if (name == 'addressForm') {
                this.editAddress = false;
                this.$refs[name].resetFields();
            } else {
                if (this.contactsLists[index].isNew) {
                    // 新增的取消 === 删除
                    this.contactsLists.splice(index, 1);
                } else {
                    this.contactsLists[index].edit = false;
                    this.$refs[name][index].resetFields();
                }
            }
        },
        handleSubmitStudent(name) {
            // 保存学生信息
            this.$refs[name].validate(valid => {
                if (valid) {
                    this.editStudent = false;
                } else {
                    this.$Message.error('Fail!');
                }
            });
        },
        handleSubmitContacts(name, index) {
            // 保存联系人
            this.$refs[name][index].validate(valid => {
                if (valid) {
                    this.contactsLists[index].edit = false;
                    // this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            });
        },
        handleSubmitAddress(name) {
            // 保存住址信息
            this.$refs[name].validate(valid => {
                if (valid) {
                    this.editAddress = false;
                } else {
                    this.$Message.error('Fail!');
                }
            });
        },
        editStudentStatus() {
            this.editStudent = true;
        },
        editAddressStatus() {
            this.editAddress = true;
        },
        addContact() {
            // 增加联系人
            let _data = Object.assign({}, this.newContacts);
            this.contactsLists.push(_data);
        },
        editContact(index) {
            // 编辑联系人
            this.contactsLists[index].edit = true;
        },
        deleteContact(index) {
            // 删除联系人
            this.contactsLists.splice(index, 1);
        }
    }
};
</script>
