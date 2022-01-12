<style lang="less">
.funPackageManage {
    width: 100%;
    height: 100%;
    .my-table {
        width: 100%;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        padding: 0 16px;
        margin-top: 10px;
        .tableNameSlot {
            font-size: 14px;
            font-weight: normal;
            color: rgba(73, 80, 96, 1);
            line-height: 21px;
            .num {
                font-size: 14px;
                color: #495060;
                font-weight: bold;
            }
        }
        .subTypeNameStyle {
            margin-left: 11px;
            .ivu-table-cell {
                margin-left: 11px;
            }
        }
    }
}
.createPackModal {
    .createPackModal_boday{
        padding: 0 50px;
        .collapse{
            margin-bottom: 20px;
            .ivu-collapse-header{
                font-size:12px;
                font-weight:400;
                color:rgba(51,51,51,1);
            }
            .ivu-collapse-content{
                padding: 0;
                .ivu-collapse-content-box{
                    padding: 0;
                }
            }
            .collapse_filter{
                width: 100%;
                border-bottom: 1px #D4D5DA solid;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding: 10px 20px;
                .collapse_filter_tit{
                    font-size:13px;
                    font-weight:normal;
                    color:rgba(153,153,153,1);
                    line-height:20px;
                    padding-right: 10px;
                }
                .collapse_checked{
                    font-size:13px;
                    font-weight:normal;
                    color:rgba(68,188,183,1);
                    line-height:20px;
                    margin-left: 14px;
                }
            }
            .tree_box{
                height: 224px;
                padding: 10px 24px;
                overflow-y: auto;
            }
        }
    }
}
</style>

<template>
    <div class="funPackageManage">
        <v-search-collapse @search="searchRecord" @reset="resetSearchRecord" @changeDivHeight="changeDivHeight">
            <DatePicker
                ref="DatePicker"
                v-model="optTime"
                type="daterange"
                :clearable="false"
                placement="bottom-start"
                separator=" ~ "
                placeholder="创建时间范围"
                style="width:224px;"
                :options="options"
                split-panels
                @on-open-change="setOptTime"
            ></DatePicker>
            <Input v-model="searcParams.funPackName" placeholder="功能包名称" style="width: 224px" />
            <Input v-model="searcParams.createRole" placeholder="创建人" style="width: 140px" />
            <Select v-model="searcParams.billinMode" style="width:140px" transfer placeholder="计费方式" clearable>
                <!-- <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option> -->
            </Select>
            <Select v-model="searcParams.funPackStatus" style="width:140px" transfer placeholder="功能包状态" clearable>
                <!-- <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option> -->
            </Select>
        </v-search-collapse>
        <big-table
            v-if="defaultShowCol"
            class="my-table"
            tableName=""
            :tableData="tableData"
            :tableColumnArray="tableColumnArray"
            :defaultShowCol="defaultShowCol"
            :canSelection="true"
            :dataTotal="dataTotal"
            :btnList="btnList"
            :pageNo="pageNo"
            :tableHeightOut="tableHeightOut"
            :updateShowTitleMethod="updateShowTitle"
            :updateShowTitleKey="updateShowTitleKey"
            @selectionChange="selectionChange"
            @pageChange="pageChange"
        >
            <div class="tableNameSlot" slot="tableNameSlot">
                共
                <span class="num">255</span>
                种功能包；有效：
                <span class="num">230</span>
                种；失效：
                <span class="num">230</span>
                种；
            </div>
        </big-table>
        <Modal v-model="createPackModal" width="600" title="新建功能包" class-name="createPackModal">
            <div class="createPackModal_boday">
                <Form ref="formPack" :model="formPack" :rules="rulePack" :label-width="124">
                    <FormItem prop="packName" label="功能包名称：">
                        <Input type="text" v-model="formPack.packName" placeholder="请输入"/>
                    </FormItem>
                    <Collapse v-model="collapse" class="collapse">
                        <Panel name="1" hide-arrow>
                            选择功能模块
                            <div slot="content">
                                <div class="collapse_filter">
                                    <div class="collapse_filter_tit">
                                        功能权限：
                                    </div>
                                    <Select v-model="permission" style="width:268px" placeholder="功能模块名称">
                                        <!-- <Option v-for="item in cityList" v-if="cityList && cityList.length" :value="item.value" :key="item.value">{{ item.label }}</Option> -->
                                    </Select>
                                    <a class="collapse_checked">
                                        查看已选
                                    </a>
                                </div>
                                <div class="tree_box">
                                <Tree :data="collapseTree" show-checkbox multiple check-directly @on-check-change="funModuleChange"></Tree>
                                </div>
                            </div>
                        </Panel>
                    </Collapse>
                    <FormItem prop="langUnitPrice" label="包年包月单价：">
                        <Input type="text" v-model="formPack.langUnitPrice" placeholder="请输入">
                            <span slot="append">元/年</span>
                        </Input>
                    </FormItem>
                    <FormItem prop="shortUnitPrice" label="按量付费单价：">
                        <Input type="text" v-model="formPack.shortUnitPrice" placeholder="请输入">
                            <span slot="append">元/年</span>
                        </Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer" class="createPackMod al_footer">
                <Button @click="close('formPack')">取消</Button>
                <Button type="primary" @click="ok('formPack')">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import valid, { errors, sysUser, sysDict, sysCommonSql, sysConfig, sysProps } from '../../libs/request';
import vSearchCollapse from '@public/modules/vSearchCollapse';
import { waitUntil, DatePickerOpt, defaultDatePickerValue } from '@public/libs/util';
import bigTable from '@public/modules/bigTable.vue';
export default {
    name: 'core.funPackageManage',
    data() {
        return {
            collapseTree:[
                    {
                        title: 'parent 1',
                        expand: true,
                        children: [
                            {
                                title: 'parent 1-1',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-1-1'
                                    },
                                    {
                                        title: 'leaf 1-1-2'
                                    }
                                ]
                            },
                            {
                                title: 'parent 1-2',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-2-1'
                                    },
                                    {
                                        title: 'leaf 1-2-1'
                                    }
                                ]
                            }
                        ]
                    }
                ],
            permission:'',
            collapse:'1',
            formPack:{
                packName:'',
                langUnitPrice:'',
                shortUnitPrice:'',
                funModule:[],
            },
            rulePack:{
                packName:[{ required: true, message: '功能包名称不能为空', trigger: 'blur' }],
                langUnitPrice:[
                    { required: true, message: '包年包月单价不能为空', trigger: 'blur' },
                    { pattern: /^\d+$/, message: '请填写数字', trigger: 'blur' },
                    ],
                shortUnitPrice:[
                    { required: true, message: '按量付费单价不能为空', trigger: 'blur' },
                    { pattern: /^\d+$/, message: '请填写数字', trigger: 'blur' },
                    ],
            },
            createPackModal: false,
            searcParams: {
                funPackageName: '',
                createRole: '',
                billinMode: '',
                funPackStatus: ''
            },
            optTime: '',
            options: null,
            tableHeightOut: 72 + 90 + 52,
            tableData: [],
            tableColumnArray: [
                {
                    title: '操作',
                    key: 'doAction',
                    width: 130,
                    render: (h, params) => {
                        return h('div', [
                            h(
                                'a',
                                {
                                    style: {
                                        // marginRight: '8px',
                                        // display: this.myButtonPrem && this.myButtonPrem.indexOf('details') >= 0 ? 'inline-block' : 'none'
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push({name:'core.lesseeTrialTenant'})
                                        }
                                    }
                                },
                                '详情'
                            )
                        ]);
                    }
                }
            ],
            defaultShowCol: null,
            dataTotal: 0,
            btnList: [
                {
                    // hidden: this.myButtonPrem && this.myButtonPrem.indexOf('invalid') >= 0 ? false : true,
                    btnClick: this.createFunPackage,
                    text: '创建功能包'
                }
            ],
            pageNo: 1,
            pageSize: this.$store.state.app.pageSizeGlobal,
            updateShowTitle: '',
            updateShowTitleKey: 'crm.customerManagement',
            tableSelected: []
        };
    },
    computed: {
        ...mapState(['app', 'buttonPerm', 'calendarConfig']),
        name() {
            return this.data;
        }
    },
    components: {
        vSearchCollapse,
        bigTable
    },
    mounted() {
        waitUntil(
            () => {
                return (this.app.currOfficeId && this.calendarConfig.maxMonthInterval) || false;
            },
            () => {
                this.optTime = defaultDatePickerValue();
                this.options3 = DatePickerOpt(this, 'DatePicker', Number(this.calendarConfig.maxMonthInterval));
            }
        );
        this.getShowTitle();
        this.getListData();
    },
    methods: {
        searchRecord() {},
        resetSearchRecord() {},
        changeDivHeight(height) {
            this.tableHeightOut = height + 90 + 52;
        },
        createFunPackage() {
            this.createPackModal = true;
        },
        selectionChange(selection) {
            this.tableSelected = selection;
            console.log(selection);
        },
        pageChange(pageNo, pageSize) {
            if (!pageNo) {
                //防止无用重复请求
            }
        },
        getShowTitle() {
            this.defaultShowCol = {
                true: [
                    {
                        name: 'id',
                        title: '编号',
                        selected: true,
                        required: true,
                        dynamiced: false
                    },
                    {
                        name: 'typeName',
                        title: '类型',
                        selected: true,
                        required: true,
                        dynamiced: false
                    },
                    {
                        name: 'status',
                        title: '状态',
                        selected: true,
                        required: true,
                        dynamiced: false
                    },
                    {
                        name: 'officeNameList',
                        title: '公告可见校区',
                        selected: true,
                        required: true,
                        dynamiced: false
                    },
                    {
                        name: 'roleNameList',
                        title: '公告可见角色',
                        selected: true,
                        required: true,
                        dynamiced: false
                    },
                    {
                        name: 'title',
                        title: '主题',
                        selected: true,
                        required: true,
                        dynamiced: false
                    },
                    {
                        name: 'sendTime',
                        title: '发送时间',
                        selected: true,
                        required: true,
                        dynamiced: false
                    },
                    {
                        name: 'planTime',
                        title: '计划发送时间',
                        selected: true,
                        required: true,
                        dynamiced: false
                    },
                    {
                        name: 'revocationTime',
                        title: '撤回时间',
                        selected: true,
                        required: true,
                        dynamiced: false
                    }
                ]
            };
        },
        getListData(){
            this.tableData=[
                    {
                        id: '编号',
                        typeName: '类型',
                        status: '状态',
                        officeNameList: '公告可见校区',
                        roleNameList: '公告可见角色',
                        title: '主题',
                        sendTime: '发送时间',
                        planTime: '计划发送时间',
                        revocationTime: '撤回时间',
                    }
                ]
        },
        close(name){
            this.$refs[name].resetFields();
            this.createPackModal=false;
        },
        ok(name){
            this.$refs[name].validate((ok) => {
                if (ok) {
                    this.createPackModal=false;
                } else {
                }
            })
        },
        funModuleChange(arr,item){
            this.formPack.funModule=arr;
        }
    }
};
</script>
