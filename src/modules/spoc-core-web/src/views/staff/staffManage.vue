<style lang="less">
@wh: #fff;
@pd16: 16px;
.ivu-modal-confirm-footer .ivu-btn-text {
    border: 1px solid rgb(220, 222, 226);
}
.ivu-modal-confirm-footer .ivu-btn-text:hover {
    border: 1px solid rgb(220, 222, 226);
}
.staff-manage-container {
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    overflow-x: hidden;
    overflow-y: hidden;
    .ivu-table-cell {
        padding-left: 10px;
        padding-right: 10px;
    }
    .b-radius {
        border-radius: 4px;
    }
    .staff-aside {
        width: 260px;
        height: 100%;
        padding-top: 16px;
        background: @wh;
    }
    .staff-comtent {
        width: calc(~'100% - 268px');
        height: 100%;
        overflow-y: auto;
        .search_form_create {
            display: inline-block;
            vertical-align: bottom;
            .ivu-form-item-label {
                display: none;
            }
            &.ivu-form-inline {
                .ivu-form-item {
                    margin: 0;
                }
            }
        }
        .search-table {
            margin-top: 8px;
            background: @wh;
            padding-left: @pd16;
            padding-right: @pd16;
        }
        .table-pages {
            text-align: center;
            margin-top: @pd16;
            padding-bottom: 40px;
        }
    }
    .check-title {
        position: relative;
        text-indent: 10px;
        &:before {
            position: absolute;
            content: '';
            display: block;
            left: 0;
            top: 0;
            width: 3px;
            height: 100%;
            background: #aaa;
        }
    }
    .mytable {
        height: calc(~'100% - 80px');
        width: 100%;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        padding: 0 16px;
    }
}
</style>

<template>
    <div class="staff-manage-container">
        <div class="staff-aside b-radius">
            <Input v-model="search" search icon="md-search" :placeholder="$t('views_staff_staffmanage_717')" style="width: 220px;margin-left:20px;" @on-search="searchTreeByName"/>
            <left-tree ref="leftTree" @table-title="gettableTitle" :hide="hide" @get-new-table="getNewtable" @editOrAddTree="editOrAddTree" :searchVal="search"></left-tree>
        </div>
        <div class="staff-comtent" v-if="!!hide">
            <v-search-collapse v-if="!!hide"  @search="searchInfo"  @reset="resetSearch" @changeDivHeight="changeDivHeight">
                <Select :placeholder="$t('modules_spoc_core_web_src_views_staff_staffmanage_311')" v-model="isSearchCurLevelOffice" clearable>
                    <Option v-for="item in staffRangeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <DatePicker
                    type="daterange"
                    separator=" ~ "
                    @on-change="comeTimeChange"
                    :value="comeT"
                    format="yyyy-MM-dd"
                    split-panels
                    :placeholder="$t('views_staff_staffmanage_724')"
                    style="width:180px;"
                ></DatePicker>
                <DatePicker
                    type="daterange"
                    separator=" ~ "
                    @on-change="offTimeChange"
                    :value="offT"
                    format="yyyy-MM-dd"
                    split-panels
                    :placeholder="$t('views_staff_staffmanage_725')"
                    style="width:180px;"
                ></DatePicker>
                <Input v-model="name" :placeholder="$t('modules_rolemanage_186')" />
                <Input v-model="loginName" :placeholder="$t('modules_rolemanage_190')" />
                <Select clearable :placeholder="$t('views_staff_staffmanage_720')" v-model="isService">
                    <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Select clearable :placeholder="$t('views_staff_staffmanage_747')" v-model="isEnable">
                    <Option v-for="item in isEnableList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Select :placeholder="$t('views_staff_staffmanage_721')" v-model="userType" clearable>
                    <Option v-for="item in usrType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Select :placeholder="$t('views_staff_staffmanage_722')" v-model="gender" clearable>
                    <Option v-for="item in genderList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
<!--                <Select :placeholder="$t('views_staff_staffmanage_723')" v-model="job" clearable>-->
<!--                    <Option v-for="item in jobList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
<!--                </Select>-->
                <Select :placeholder="$t('modules_rolemanage_187')" v-model="role" multiple clearable>
                    <Option v-for="item in roleList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>

                <form-create ref="fc" v-model="fApi" :rule="rule" :option="option" class="search_form_create"></form-create>
            </v-search-collapse>
            <big-table
                v-if="defaultShowCol"
                :needFixed="true"
                class="mytable"
                :style="{'margin-top':!!!hide?'0':'8px'}"
                :tableName="tableTitle"
                :tableData="dataT"
                :pageNo="pageNo"
                :tableHeightOut="tableHeightOut"
                :tableColumnArray="columnsT"
                :defaultShowCol="defaultShowCol"
                :btnList="btnList"
                :canSelection="true"
                :updateShowTitleMethod="updateShowTitle"
                :dataTotal="pageCounts"
                :maxFlagForFixed="7"
                @resetDefault="resetDefaultCol"
                @selectionChange="selectTableItem"
                @pageChange="pageChange"
                :isShowSelectTableColumn="hide?true:false"
            ></big-table>
            <export-modal ref="exportModal" :exportMethod="exportMethod"></export-modal>
        </div>
        <staffDynamic ref="staffInfo" :treeOfficeId="treeOfficeId" :formStatus="formStatus" :titleName="titleName" @refresh-table="addStaffRefTable"></staffDynamic>
        <Modal v-model="leaveMdal"
               :mask-closable="false"
               :title="$t('modules_spoc_core_web_src_views_staff_staffmanage_313')"
        >
            <Form ref="formModal" :rules="ruleCustom" class="form-box" :model="formModal" label-position="right" :label-width="100">
                    <FormItem :label="$t('views_staff_components_staffinfo_690')" prop="leaveDates">
                        <DatePicker
                                v-model="formModal.leaveDates"
                                type="date"
                                :placeholder="$t('scoretemplate_compontents_scoremodify_528')"
                                style="width: 256px"
                        ></DatePicker>
                    </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="cancelLeave">{{ $t('classroom_allscore_53') }}</Button>
                <Button type="primary" @click="okLeave">{{ $t('classroom_allscore_54') }}</Button>
            </div>
        </Modal>
        <Modal v-model="newPass"
               :mask-closable="false"
               :title="$t('modules_spoc_core_web_src_views_staff_staffmanage_314')"
        >
            <Form ref="formModal1" :rules="ruleCustom1" class="form-box" :model="formModal1" label-position="right" :label-width="100">
                <FormItem :label="$t('modules_spoc_core_web_src_views_staff_staffmanage_314')" prop="newPassword">
                    <Input v-model="formModal1.newPassword"
                           :placeholder="$t('modules_spoc_core_web_src_views_staff_staffmanage_315')"
                           type="password"
                           style="width: 256px;"/>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="cancelNewPass">{{ $t('classroom_allscore_53') }}</Button>
                <Button type="primary" @click="okNewPass">{{ $t('classroom_allscore_54') }}</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
/**
 **@date: 2019/4/19 12:00
 **@author: lizhi
 **@filename: staffManage2.vue
 * 主页面 包含表格
 */
import leftTree from './components/leftTree.vue';
// import staffInfo from './components/staffInfo.vue';
import staffDynamic from './components/staffDynamic.vue';
import selectComp from '@public/modules/tableDropdown.vue';
import vSearchCollapse from '@public/modules/vSearchCollapse';
import bigTable from '@public/modules/bigTable.vue';
import exportModal from '@public/modules/exportModal.vue';
import valid, { errors, sysUser, sysDict, sysUserForI18n, SysProps,sysRole } from '../../libs/request';
import { mapMutations } from 'vuex';
export default {
    name: 'core.staff',
    props:{
        hide:{
            type:Boolean,
            default:()=>{
                return true
            }
        }
    },
    data() {
        const validatePass = (rule, value, callback) => {
            if (value !== null && value !== undefined) {
                if (value === '') {
                    callback(new Error(this.$t('modules_spoc_core_web_src_views_staff_staffmanage_316')));
                } else {
                    callback();
                }
            } else {
                callback(new Error(this.$t('modules_spoc_core_web_src_views_staff_staffmanage_316')));
            }
        };
        return {
            //实例对象
            fApi: {},
            //表单生成规则
            rule: [],
            //组件参数配置
            option: {
                form: {
                    //是否开启行内表单模式
                    inline: true,
                    //表单域标签的位置，可选值为 left、right、top
                    labelPosition: 'right',
                    //表单域标签的宽度，所有的 FormItem 都会继承 Form 组件的 label-width 的值
                    // labelPosition为"top"时,需要手动设置 labelWidth 为 undefined
                    labelWidth: 0,
                    //是否显示校验错误信息
                    showMessage: true,
                    //原生的 autocomplete 属性，可选值为 off 或 on
                    autocomplete: 'off',
                    //所有带有 size 属性的组件的尺寸，默认为不设置，详见各组件默认的 size 值。可选值为 default、small 或 large。
                    size: undefined
                },
                row: {
                    //栅格间距，单位 px，左右平分
                    gutter: 0,
                    //布局模式，可选值为flex或不选，在现代浏览器下有效
                    type: undefined,
                    //flex 布局下的垂直对齐方式，可选值为top、middle、bottom
                    align: undefined,
                    //flex 布局下的水平排列方式，可选值为start、end、center、space-around、space-between
                    justify: undefined,
                    //自定义的class名称
                    className: undefined
                },
                submitBtn: {
                    //按钮类型，可选值为primary、ghost、dashed、text、info、success、warning、error或者不设置
                    type: 'primary',
                    //按钮大小，可选值为large、small、default或者不设置
                    size: 'large',
                    //按钮形状，可选值为circle或者不设置
                    shape: undefined,
                    //开启后，按钮的长度为 100%
                    long: true,
                    //设置button原生的type，可选值为button、submit、reset
                    htmlType: 'button',
                    //设置按钮为禁用状态
                    disabled: false,
                    //设置按钮的图标类型
                    icon: 'ios-upload',
                    //按钮文字提示
                    innerText: this.$t('modules_spoc_core_web_src_views_staff_staffmanage_317'),
                    //设置按钮为加载中状态
                    loading: false,
                    //是否显示,默认显示
                    show: false,
                    //设置提交按钮布局规则,参考栅格布局规则
                    col: undefined
                },
                resetBtn: {
                    //配置说明同上
                    type: 'ghost',
                    size: 'large',
                    shape: undefined,
                    long: true,
                    htmlType: 'button',
                    disabled: false,
                    icon: 'refresh',
                    innerText: this.$t('modules_spoc_core_web_src_views_staff_staffmanage_318'),
                    loading: false,
                    //默认不显示
                    show: false,
                    //设置重置按钮布局规则,参考栅格布局规则
                    col: undefined
                },
                info: {
                    //提示消息类型,poptip,tooltip
                    type: 'poptip'
                }
                //表单提交事件
                // onSubmit: function(formData) {
                //     alert(JSON.stringify(formData));
                // }
            },
            formMap: {
                hidden: {
                    type: 'hidden',
                    field: '',
                    value: '',
                    col: {
                        span: 12
                    }
                },
                input: {
                    type: 'input',
                    title: '',
                    field: '',
                    value: '',
                    props: {
                        type: 'text'
                    },
                    validate: [],
                    col: {
                        span: 12
                    }
                },
                textarea:{
                    type: 'input',
                    title: '',
                    field: '',
                    value: '',
                    props: {
                        type: 'textarea'
                    },
                    validate: [],
                    col: {
                        span: 12
                    }
                },
                InputNumber: {
                    type: 'InputNumber',
                    field: '',
                    title: '',
                    value: '',
                    props: {
                        precision: 2
                    },
                    col: {
                        span: 12
                    }
                },
                autoComplete: {
                    type: 'autoComplete',
                    field: '',
                    title: '',
                    value: '',
                    props: {
                        data: [],
                        clearable: true
                    },
                    col: {
                        span: 12
                    }
                },
                radio: {
                    type: 'radio',
                    title: '',
                    field: '',
                    value: '',
                    options: [
                        // {value:"0",label:"不包邮",disabled:false},
                    ],
                    col: {
                        span: 12
                    }
                },
                checkbox: {
                    type: 'checkbox',
                    title: '',
                    field: '',
                    value: [],
                    options: [
                        // {value:"1",label:"好用",disabled:true},
                    ],
                    col: {
                        span: 12
                    }
                },
                select: {
                    type: 'select',
                    field: '',
                    title: '',
                    value: [],
                    options: [
                        // {"value": "104", "label": "生态蔬菜", "disabled": false},
                    ],
                    props: {
                        multiple: true,
                        placeholder: this.$t('modules_spoc_core_web_src_views_staff_staffmanage_319'),
                        'not-found-text': this.$t('modules_spoc_core_web_src_views_staff_staffmanage_320'),
                        placement: 'bottom'
                    },
                    col: {
                        span: 12
                    }
                },
                switch: {
                    type: 'switch',
                    title: '',
                    field: '',
                    value: '1',
                    props: {
                        trueValue: '1',
                        falseValue: '0',
                        slot: {
                            open: '',
                            close: ''
                        }
                    },
                    col: {
                        span: 12
                    }
                },
                cascader: {
                    type: 'cascader',
                    title: '',
                    field: '',
                    value: [],
                    props: {
                        data: window.province || []
                    },
                    col: {
                        span: 12
                    }
                },
                DatePicker: {
                    type: 'DatePicker',
                    field: '',
                    title: '',
                    props: {
                        prop: '',
                        type: 'datetime',
                        transfer: true,
                        format: 'yyyy-MM-dd HH:mm:ss',
                        placeholder: this.$t('modules_spoc_core_web_src_views_staff_staffmanage_321'),
                        size: 'default',
                        disabled: false,
                        clearable: true,
                        readonly: false,
                    },
                    col: {
                        span: 12
                    }
                },
                TimePicker: {
                    type: 'TimePicker',
                    field: '',
                    title: '',
                    props: {
                        type: 'time',
                        placeholder: this.$t('modules_spoc_core_web_src_views_staff_staffmanage_322')
                    },
                    col: {
                        span: 12
                    }
                },
                ColorPicker: {
                    type: 'ColorPicker',
                    field: '',
                    title: '',
                    value: '',
                    col: {
                        span: 12
                    }
                },
                upload: {
                    type: 'upload',
                    field: '',
                    title: '',
                    props: {
                        // "type":"select",
                        // "uploadType":"image",
                        // "action": "/upload.php",
                        // "name":"pic",
                        // "multiple": true,
                        // "accept":"image\/*",
                        // "format":["jpg","jpeg","png","gif"],
                        // "maxSize":2048,
                        // "maxLength":5,
                        // "onSuccess":function (res, file) {
                        // }
                    },
                    col: {
                        span: 12
                    }
                },
                rate: {
                    type: 'rate',
                    field: '',
                    title: '',
                    value: 0,
                    props: {
                        count: 5,
                        allowHalf: false
                    },
                    validate: [
                        // {required:true,type:'number',min:3, message: '请大于3颗星',trigger:'change'}
                    ],
                    col: {
                        span: 12
                    }
                },
                slider: {
                    type: 'slider',
                    field: '',
                    title: '',
                    value: [0, 100],
                    props: {
                        min: 0,
                        max: 100,
                        range: true
                    },
                    col: {
                        span: 12
                    }
                },
                tree: {
                    type: 'tree',
                    title: '',
                    field: '',
                    value: [],
                    props: {
                        data: [],
                        type: 'checked',
                        multiple: false,
                        showCheckbox: true,
                        emptyText: this.$t('modules_spoc_core_web_src_views_staff_staffmanage_323')
                    },
                    col: {
                        span: 12
                    }
                }
            },
            tableHeightOut: 72 - 14, //324,
            updateShowTitle: sysUser.updateShowTitle,
            defaultShowCol: null,
            exportMethod: sysUser.exportData,
            btnList: [
                {
                    style: {},
                    type: '',
                    btnClick: this.showNewStaff,
                    text: this.$t('views_staff_staffmanage_726')
                },
                {
                    style: {},
                    type: '',
                    hidden:!this.hide,
                    btnClick: this.showImport,
                    text: this.$t('views_coursepack_bigtableexample_343')
                },
                [
                    {
                        style: {},
                        type: '',
                        hidden:!this.hide,
                        btnClick: this.isExport,
                        text: this.$t('integralflow_4'),
                        value: '1',
                        parentName: this.$t('integralflow_5')
                    },
                    {
                        style: {},
                        type: '',
                        hidden:!this.hide,
                        btnClick: this.isExport,
                        text: this.$t('integralflow_6'),
                        value: '2',
                        parentName: this.$t('integralflow_5')
                    }
                ]
            ],
            selectedIds: [], //选中的ids
            currentIds: [], //当前页的ids
            imports: false,
            formStatus: 0,
            search: '',
            name: '',
            loginName: '',
            isService: '1',
            isEnable:'1',
            isEnableList:[
                {
                    value: '1',
                    label: this.$t('views_staff_staffmanage_748')
                },
                {
                    value: '0',
                    label: this.$t('views_staff_staffmanage_749')
                }
            ],
            stateList: [
                {
                    value: '1',
                    label: this.$t('views_staff_components_staffinfo_685')
                },
                {
                    value: '0',
                    label: this.$t('views_staff_components_staffinfo_686')
                }
            ],
            userType: '',
            usrType: [],
            gender: '',
            genderList: [
                {
                    value: 'm',
                    label: this.$t('views_staff_components_staffinfo_670')
                },
                {
                    value: 'f',
                    label: this.$t('views_staff_components_staffinfo_671')
                }
            ],
            job: '',
            jobList: [],
            role: [],//筛选项角色
            roleList: [],
            comeT: [],
            offT: [],
            pageNo: 1,
            pageCounts: 0, //总数
            pageSize: this.$store.state.app.pageSizeGlobal,
            tableTitle: '',
            columnsT: [
                {
                    key: 'isService',
                    render: (h, params) => {
                        return h(
                            'span',
                            params.row.isService === '1' ? this.$t('views_staff_components_staffinfo_685') : params.row.isService === '0' ? this.$t('views_staff_components_staffinfo_686') : ''
                        );
                    }
                },
                {
                    key: 'no',
                    // minWidth: 60
                },
                {
                    key: 'name',
                    // minWidth: 80,
                    // maxWidth: 130
                    // render: (h, params) => {
                    //     return h('span', params.row.isEnable === '1' ? params.row.name : params.row.name+'('+ this.$t('views_staff_components_staffinfo_686') +')');
                    // }
                },
                {
                    key: 'loginName',
                    // minWidth: 85
                },
                {
                    key: 'mobile',
                    // minWidth: 85
                },
                {
                    key: 'officeName',
                    // minWidth: 100
                },
                {
                    key: 'jobName',
                    // minWidth: 60
                    // render: (h, params) => {
                    //     return h('span', this.getTablejobValue(params.row.job, this.jobList));
                    // }
                },
                // {
                //     key: 'gender',
                //     // minWidth: 34,
                //     render: (h, params) => {
                //         return h(
                //             'span',
                //             params.row.gender === 'm' ? this.$t('views_staff_components_staffinfo_670') : params.row.gender === 'f' ? this.$t('views_staff_components_staffinfo_671') : ''
                //         );
                //     }
                // },
                {
                    key: 'email',
                    // minWidth: 84
                },
                {
                    key: 'entryDate',
                    // minWidth: 75
                },
                {
                    key: 'leaveDate',
                    // minWidth: 75
                },
                {
                    key: 'crossNames',
                    // minWidth: 84
                },
                {
                    key: 'adminNames',
                    // minWidth: 84
                },
                {
                    key: 'departNames',
                    // minWidth: 84
                },
                {
                    key: 'teachableDuration',
                    // minWidth: 40
                },
                {
                    key: 'enName',
                    // minWidth: 84
                },
                {
                    key: 'userTypeName',
                    // minWidth: 34
                },
                {
                    key: 'isEnable',
                    // minWidth: 34,
                    render: (h, params) => {
                        return h('span', params.row.isEnable === '1' ? this.$t('views_staff_staffmanage_748') : this.$t('views_staff_staffmanage_749'));
                    }
                },
                {
                    title: this.$t('classlist_compontents_detailinfo_45'),
                    key: 'doAction',
                    fixed: 'right',
                    width: 110,
                    render: (h, params) => {
                        return h('div', [
                            h(
                                'a',
                                {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '16px'
                                    },
                                    on: {
                                        click: () => {
                                            this.$refs.staffInfo.setModel(params.row, 1);
                                            this.titleName = this.$t('views_staff_staffmanage_751');
                                        }
                                    }
                                },
                                this.$t('modules_expandrow_15')
                            ),
                            h(selectComp, {
                                props: {
                                    actionName: this.$t('views_room_selectcomp_629'),
                                    buttonList: params.row.isService == '1' ? [
                                        {
                                            label: params.row.isEnable === '1' ? this.$t('views_staff_staffmanage_749') : this.$t('views_staff_staffmanage_748'),
                                            key: 'fb'
                                        },
                                        {
                                            label: this.$t('views_staff_components_staffinfo_686'),
                                            key: 'leave'//离职
                                        },
                                        {
                                            label: this.$t('views_staff_staffmanage_753'),
                                            key: 'reWritePws'
                                        }
                                    ] : [
                                        {
                                            label: params.row.isEnable === '1' ? this.$t('views_staff_staffmanage_749') : this.$t('views_staff_staffmanage_748'),
                                            key: 'fb'
                                        },
                                        {
                                            label: this.$t('views_staff_components_staffinfo_685'),
                                            key: 'stay'//在职
                                        },
                                        {
                                            label: this.$t('views_staff_staffmanage_753'),
                                            key: 'reWritePws'
                                        }
                                    ]
                                },
                                on: {
                                    dropFn: key => {
                                        this.itemForm({
                                            key: key,
                                            row: params.row
                                        });
                                    }
                                }
                            })
                        ]);
                    }
                }
            ],
            dataT: [],
            titleName: '',
            params: {},
            entryDateStart: '',
            entryDateEnd: '',
            leaveDateStart: '',
            leaveDateEnd: '',
            treeOfficeId:'',//左侧树选中Id
            //离职弹框
            leaveMdal:false,
            ruleCustom:{
                leaveDates: [{ required: true, validator: validatePass, trigger: 'blur' }]
            },
            formModal:{
                leaveDates:''
            },
            staffLeaveObj:null,
            //新密码
            newPass:false,
            ruleCustom1:{
                newPassword: [
                    { required: true, message: this.$t('modules_spoc_core_web_src_views_staff_staffmanage_324'), trigger: 'blur' },
                    { pattern:/^\w{6,20}$/, message: this.$t('modules_spoc_core_web_src_views_staff_staffmanage_325'), trigger: 'blur' },
                ]
            },
            formModal1:{
                newPassword:''
            },
            newPassObj:null,//离职 启用时存用户数据
            isSearchCurLevelOffice:'',
            staffRangeList:[
                {
                    label:this.$t('modules_spoc_core_web_src_views_staff_staffmanage_326'),
                    value:'0'
                },
                {
                    label:this.$t('modules_spoc_core_web_src_views_staff_staffmanage_327'),
                    value:'1'
                }
            ],//人员范围
        };
    },
    components: {
        leftTree,
        // staffInfo,
        staffDynamic,
        vSearchCollapse,
        selectComp,
        bigTable,
        exportModal
    },
    mounted() {
        this.getFormLayout();
        this.getRoleList()

    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        resetDefaultCol(){
            this.updateLoadingStatus({ isLoading: true });
            sysUserForI18n.clearShowField({
                pageIdentifier: "user/listData",
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
        getRoleList(){ //获取角色
            sysRole
            .roleList()
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.roleList = res.data.data.roleList;
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },
        getFormLayout() {
            let arr = [];
            let params = {
                tableName: 'sys_user'
            };
            SysProps.list(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let list = res.data.data;
                        list.forEach((v, k) => {
                            if (v.isQuery) {
                                let obj = Object.assign({}, this.formMap[v.jdbcType]);
                                obj.title = v.name;
                                obj.field = v.field;
                                obj.props = {};
                                obj.props.placeholder = v.name;
                                if (v.dictType) {
                                    let params1 = {
                                        type: v.dictType,
                                        menuId: v.menuId || 0
                                    };
                                    sysDict
                                        .DictListDataNew(params1)
                                        .then(valid.call(this))
                                        .then(res => {
                                            if (res.ok) {
                                                obj.options = res.data.data;
                                            }
                                        })
                                        .catch(errors.call(this))
                                        .finally(() => {
                                            // this.refs.fc.$f.append(obj);
                                            if (k == list.length - 1) {
                                                this.rule = arr;
                                            }
                                        });
                                } else {
                                    arr.push(obj);
                                    // this.$fc.append(obj);
                                    if (k == list.length - 1) {
                                        this.rule = arr;
                                    }
                                }
                            }
                        });
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.$nextTick(() => {
                        this.getShowTitle();
                        // this.getTableDatas();
                        this.setSearchCol();
                    });
                });
        },
        //获取显示列
        changeDivHeight(height) {
            this.tableHeightOut = height - 14;
        },
        getShowTitle(closeLoad) {
            sysUserForI18n
                .getShowTitle({
                    pageIdentifier: 'user/listData',
                    lang: this.$i18n.locale,
                    voName: 'com.windliven.spoc.modules.sys.vo.UserVO',
                    tableName:'sys_user'
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
        //记录已选员工id
        selectTableItem(row) {
            //选择导出
            let s = this.selectedIds;
            let c = this.currentIds;
            for (let i in c) {
                if (s.includes(c[i])) {
                    let num = this.selectedIds.indexOf(c[i]);
                    s.splice(num, 1);
                }
            }
            if (row.length) {
                row.forEach(item => {
                    s.push(item.id);
                });
            }
        },
        isExport(val) {
            //这里val的值。是根据设置下拉类型button设定的值来匹配判断
            if (val == '2' && !this.selectedIds.length) {
                this.$Message.error(this.$t('views_staff_staffmanage_754'));
                return;
            }
            let params = {};
            params.entryDateStart = this.entryDateStart;
            params.entryDateEnd = this.entryDateStart;
            params.leaveDateStart = this.entryDateStart;
            params.leaveDateEnd = this.entryDateStart;
            params.gender = this.gender;
            params.isService = this.isService;
            params.isEnable = this.isEnable;
            params.job = this.job;
            params.loginName = this.loginName.trim();
            params.name = this.name.trim();
            params.userType = this.userType;
            params.searchOfficeId = this.params.searchOfficeId
            if (val == '2') {
                //如果是导出所选，需要在这里传递所选对象、或者对象ID，这里根据需要自行处理，并作为搜索参数的一部分传递到导出组件
                params.userIds = this.selectedIds.join(',');
                this.exportMethod = sysUser.exportSelected;
            } else {
                delete params.userIds;
                this.exportMethod = sysUser.exportData;
            }
            this.$refs.exportModal.noShowExport(this.exportMethod, params);
        },
        //岗位
        getTablejobValue(value, list) {
            for (let i in list) {
                if (list[i].value === value) {
                    return list[i].label;
                }
            }
        },
        addStaffRefTable() {
            this.$refs.leftTree.getTreeDatas(true,this.treeOfficeId);
        },
        //左侧树 联动表格刷新
        getNewtable(id) {
            this.pageNo = 1
            this.treeOfficeId = id
            this.getTableDatas(id);
        },
        //左侧树修改编辑后。添加员工弹框更新下来菜单
        editOrAddTree(){
            this.$refs.staffInfo.officeListData();
        },
        setSearchCol() {
            sysDict
                .batchListData()
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let sys_user_type = res.data.data.sys_user_type;
                        let sys_user_job = res.data.data.sys_user_job;
                        this.usrType = [];
                        for (let item in sys_user_type) {
                            let obj = {};
                            let obj1 = sys_user_type[item];
                            obj.value = obj1.value;
                            obj.label = obj1.label;
                            this.usrType.push(obj);
                        }
                        this.jobList = [];
                        for (let item in sys_user_job) {
                            let obj = {};
                            let obj1 = sys_user_job[item];
                            obj.value = obj1.value;
                            obj.label = obj1.label;
                            this.jobList.push(obj);
                        }
                    }
                })
                .catch(errors.call(this));
        },
        // table 部分//禁用
        disableUsr(id, value) {
            let val = value.isEnable === '1' ? this.$t('views_staff_staffmanage_749') : this.$t('views_staff_staffmanage_748');
            let keyStatus = value.isEnable  === '1' ? '0' : '1';
            if(value.isService === '0'&& !this.newPass && value.isEnable === '0'){
                this.newPass = true
                return {id:id,value:value};
            }
            this.$Modal.confirm({
                title: this.$t('views_staff_staffmanage_755', [val]),
                content: '<p>' + this.$t('views_staff_staffmanage_756', [val, val]) + '</p>',
                onOk: () => {
                    sysUser
                        .updateIsEnable({
                            id: id,
                            isEnable: keyStatus,
                            newPassword:value.isService === '0'&& value.isEnable === '0'?this.formModal1.newPassword:''
                        })
                        .then(valid.call(this))
                        .then(res => {
                            if (res.ok) {
                                if (value === '1') {
                                    this.$Message.success({
                                        content: this.$t('views_staff_staffmanage_757', [val]),
                                        duration: 1
                                    });
                                } else {
                                    this.$Message.success({
                                        content: this.$t('views_staff_staffmanage_757', [val]),
                                        duration: 1
                                    });
                                }
                                this.newPass = false
                                this.getTableDatas();
                            }
                        })
                        .catch(errors.call(this));
                },
                onCancel: () => {}
            });
        },
        //导入
        showImport() {
            this.$router.push({
                name:'core.staffImport'
            });
        },
        //新建员工
        showNewStaff() {
            this.titleName = this.$t('views_staff_staffmanage_726');
            this.$refs.staffInfo.setModel();
        },
        //启用时修改密码
        okNewPass() {
            this.$refs['formModal1'].validate(valid1 => {
                if (valid1) {
                    this.disableUsr(this.newPassObj.id, this.newPassObj.value)
                }
            })
        },
        cancelNewPass() {
            this.newPass = false;
            this.$refs['formModal1'].resetFields()
        },
        //离职
        staffLeave(obj){//员工离职
            this.leaveMdal = true;
            this.staffLeaveObj = obj;
            this.$refs['formModal'].resetFields()
        },
        okLeave() {
            this.$refs['formModal'].validate(valid1 => {
                if (valid1) {
                    this.$Modal.confirm({
                        title: this.$t('modules_spoc_core_web_src_views_staff_staffmanage_328'),
                        // content: '<p>改为在职时会重置密码，密码为123456。</p>',
                        onOk: () => {
                            sysUser
                            .updateIsService({
                                id: this.staffLeaveObj.row.id,
                                isService: '0',
                                leaveDate:this.formModal.leaveDates.format('yyyy-MM-dd')
                            })
                            .then(valid.call(this))
                            .then(res => {
                                if (res.ok) {
                                    this.leaveMdal = false;
                                    this.getTableDatas();
                                }
                            })
                            .catch(errors.call(this));
                        },
                        onCancel: () => {}
                    });
                }
            })
        },
        cancelLeave() {
            this.leaveMdal = false;
            this.$refs['formModal'].resetFields()
            this.staffLeaveObj = null;
        },
        staffStay(obj){//员工在职
            this.$Modal.confirm({
                title: this.$t('modules_spoc_core_web_src_views_staff_staffmanage_329'),
                // content: '<p>改为在职时会重置密码。</p>',
                onOk: () => {
                    sysUser
                    .updateIsService({
                        id: obj.row.id,
                        isService: '1',
                        leaveDate:''
                    })
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            this.getTableDatas();
                        }
                    })
                    .catch(errors.call(this));
                },
                onCancel: () => {}
            });

        },
        itemForm(obj) {
            console.log(obj)
            if (obj.key === 'leave') {//离职
                this.staffLeave(obj)
            } else if (obj.key === 'reWritePws') {//重置密码
                this.reWritePws(obj.row);
            } else if (obj.key === 'fb') {//启用、禁用
                 if(obj.row.isService === '0'){
                    this.newPassObj =  this.disableUsr(obj.row.id, obj.row);
                     console.log(this.newPassObj)
                 }else{
                     this.newPassObj = null
                     this.disableUsr(obj.row.id, obj.row);
                 }
            }  else if (obj.key === 'stay') {//在职
                this.staffStay(obj)
            }
        },
        //重置密码
        reWritePws(id) {
            sysUser
                .resetBasePwd({
                    id: id.id
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        const title = this.$t('views_staff_staffmanage_753');
                        const content = '<p style="width:320px;">' + this.$t('views_staff_staffmanage_760') + '</p>';
                        this.$Modal.success({
                            title: title,
                            style: {
                                width: '433px'
                            },
                            content: content
                        });
                    }
                })
                .catch(errors.call(this));
        },
        //搜索
        searchInfo() {
            this.pageNo = 1;
            this.getTableDatas();
        },
        //入职时间
        comeTimeChange(item) {
            if (item && item[0]) {
                this.params.entryDateStart = (new Date(item[0])).format('yyyy-MM-dd');
                this.params.entryDateEnd = (new Date(item[1])).format('yyyy-MM-dd');
                this.entryDateStart = item[0];
                this.entryDateEnd = item[1];
            } else {
                delete this.params.entryDateStart;
                delete this.params.entryDateEnd;
                this.entryDateStart = '';
                this.entryDateEnd = '';
            }
        },
        //离职时间
        offTimeChange(item) {
            if (item && item[0]) {
                this.params.leaveDateStart = (new Date(item[0])).format('yyyy-MM-dd');
                this.params.leaveDateEnd = (new Date(item[1])).format('yyyy-MM-dd');
                this.leaveDateStart = item[0];
                this.leaveDateEnd = item[1];
            } else {
                delete this.params.leaveDateStart;
                delete this.params.leaveDateEnd;
                this.leaveDateStart = '';
                this.leaveDateEnd = '';
            }
        },
        //重置 搜索
        resetSearch() {
            let $f = this.fApi;
            this.pageNo = 1;
            this.name = '';
            this.loginName = '';
            this.isService = '1';
            this.isEnable ='1';
            this.userType = '';
            this.gender = '';
            this.job = '';
            this.comeT = [];
            this.offT = [];
            this.role = [];
            this.params.entryDateStart = '';
            this.params.entryDateEnd = '';
            this.params.leaveDateStart = '';
            this.params.entryDateEnd = '';
            this.isSearchCurLevelOffice = '';
            $f.resetFields();
            this.getTableDatas();
        },
        //获取表头 标题
        gettableTitle(title, code) {
            // 设置表格标题
            this.tableTitle = title + '【' + code + '】';
        },
        //获取表格数据
        getTableDatas(id) {
            this.updateLoadingStatus({
                isLoading: true
            });
            // this.$refs.leftTree.getTreeDatas();
            if (id || this.treeOfficeId) {
                this.params.searchOfficeId = id || this.treeOfficeId;
            }
            let $f = this.fApi;
            this.params.pageNo = this.pageNo;
            this.params.pageSize = this.pageSize;
            this.params.name = this.name;
            this.params.loginName = this.loginName;
            this.params.isService = this.isService;
            this.params.userType = this.userType;
            this.params.gender = this.gender;
            // this.params.job = this.job;
            this.params.roleIds = this.role;
            this.params.isEnable = this.isEnable;
            this.params.isSearchCurLevelOffice = this.isSearchCurLevelOffice;
            this.params.fieldJsonData = {};
            if (this.rule.length && !!this.hide) {
                $f.submit(
                    (formData, api) => {
                        for (let i in formData) {
                            if(Array.isArray(formData[i])){

                            }else{
                                formData[i]=[formData[i]];
                            }
                        }
                        this.params.fieldJsonData = formData;
                        this.params.orderByType = "createDate"
                        this.params.orderByStatus = "2"
                        sysUser
                            .listPage(this.params)
                            .then(valid.call(this))
                            .then(res => {
                                if (res.ok) {
                                    let data = res.data;
                                    this.pageCounts = data.data.total;
                                    let d = data.data.list;
                                    this.currentIds = [];
                                    for (let i in d) {
                                        this.currentIds.push(d[i].id);
                                        if (this.selectedIds.includes(d[i].id)) {
                                            d[i]._checked = true;
                                        }
                                    }
                                    this.dataT = d;
                                }
                            })
                            .catch(errors.call(this))
                            .finally(() => {
                                this.updateLoadingStatus({
                                    isLoading: false
                                });
                            });
                    },
                    api => {
                        //验证未通过
                        console.log(this.$t('modules_spoc_core_web_src_views_staff_staffmanage_330'));
                    }
                );
            } else {
                // this.params = {
                //     entryDateEnd: "",
                //     entryDateStart: "",
                //     fieldJsonData: {},
                //     gender: "",
                //     isService: "",
                //     job: "",
                //     leaveDateStart: "",
                //     loginName: "",
                //     name: "",
                //     pageNo: this.pageNo,
                //     pageSize:this.pageSize,
                //     userType: "",
                // }
                if (id || this.treeOfficeId) {
                    this.params.searchOfficeId = id || this.treeOfficeId;
                }
                this.params.orderByType = "createDate"
                this.params.orderByStatus = "2"
                sysUser
                    .listPage(this.params)
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            let data = res.data;
                            this.pageCounts = data.data.total;
                            let d = data.data.list;
                            this.currentIds = [];
                            for (let i in d) {
                                this.currentIds.push(d[i].id);
                                if (this.selectedIds.includes(d[i].id)) {
                                    d[i]._checked = true;
                                }
                            }
                            this.dataT = d;
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {
                        this.updateLoadingStatus({
                            isLoading: false
                        });
                    });
            }
        },
        //搜索树
        searchTreeByName(v) {
            if(v){
                this.$refs.leftTree.searchTreeByName(v);
            }
        },
        //改变页码
        pageChange(pageNo, pageSize) {
            if (!pageNo) {
                //防止无用重复请求
                return;
            }
            this.pageNo = pageNo;
            this.pageSize = pageSize;
            this.getTableDatas();
        },
        // 改变table单页显示数
        sizeChange(size) {
            this.pageSize = size;
            this.getTableDatas();
        }
    }
};
</script>
