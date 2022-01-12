<style lang="less">
.between {
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
.createBetweenModal {
    .steps {
        display: flex;
        justify-content: center;
        align-items: center;
        // margin-bottom: 20px;
        padding: 0 50px 20px;
        .ivu-steps-item {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            overflow: visible;
            position: relative;
            .ivu-steps-tail {
                display: block;
                left: 50%;
                height:2px;
                overflow: hidden;
                i{
                    content: '';
                    position: absolute;
                    width: 9999px;
                    height: 1px;
                    left: 0;
                    top: 50%;
                    background: #e8eaec;
                }
            }
            &:nth-last-of-type(1){
                .ivu-steps-tail {
                    display: none;
                }
            }
            /*.ivu-steps-head {*/
            /*    margin: 0;*/
            /*    padding: 0 10px;*/
            /*}*/
            /*.ivu-steps-head-inner {*/
            /*    margin: 0;*/
            /*    padding: 0;*/
            /*}*/
            .ivu-steps-main {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                div {
                    margin: 0;
                    padding: 0;
                    &:after{
                        display: none;
                    }
                }
            }
        }
    }
    .createBetweenModal_boday {
        padding: 0 50px;

        .collapse {
            margin-bottom: 20px;
            .ivu-collapse-header {
                font-size: 12px;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
            }
            .ivu-collapse-content {
                padding: 0;
                .ivu-collapse-content-box {
                    padding: 0;
                }
            }
            .collapse_filter {
                width: 100%;
                border-bottom: 1px #d4d5da solid;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding: 10px 20px;
                .collapse_filter_tit {
                    font-size: 13px;
                    font-weight: normal;
                    color: rgba(153, 153, 153, 1);
                    line-height: 20px;
                    padding-right: 10px;
                }
                .collapse_checked {
                    font-size: 13px;
                    font-weight: normal;
                    color: rgba(68, 188, 183, 1);
                    line-height: 20px;
                    margin-left: 14px;
                }
            }
            .moudle_box {
                height: 224px;
                padding: 10px 24px;
                overflow-y: auto;
                .check_box_group {
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    .check_box {
                        min-width: 50%;
                        padding: 8px 0;
                    }
                }
            }
        }
    }
    .ivu-table-wrapper{
        border-left: 1px solid #dcdee2;
        .ivu-table-cell{
            overflow: visible;
            padding: 0 10px;
        }
    }
}
</style>

<template>
    <div class="between">
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
            <Input v-model="searcParams.betweenName" placeholder="功能包名称" style="width: 224px" />
            <Input v-model="searcParams.createRole" placeholder="创建人" style="width: 140px" />
            <Select v-model="searcParams.billinMode" style="width:140px" transfer placeholder="计费方式" clearable>
                <Option :value="1" :key="1">1</Option>
            </Select>
            <Select v-model="searcParams.betweenStatus" style="width:140px" transfer placeholder="功能包状态" clearable>
                <Option :value="2" :key="2">2</Option>
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
        <Modal v-model="createBetweenModal" width="600" title="新建功能包" class-name="createBetweenModal">
            <Steps :current="current" class="steps">
                <Step title="基本设置" content="设置套餐的基础信息"></Step>
                <Step title="套餐价格" content="定义套餐优惠价格"></Step>
            </Steps>
            <div class="createBetweenModal_boday" v-show="current == 0">
                <Form ref="formBetween" :model="formBetween" :rules="ruleBetween" :label-width="108">
                    <FormItem prop="betweenName" label="功能包名称："><Input type="text" v-model="formBetween.betweenName" placeholder="请输入" /></FormItem>
                    <Collapse v-model="collapse" class="collapse">
                        <Panel name="1" hide-arrow>
                            选择功能模块
                            <div slot="content">
                                <div class="collapse_filter">
                                    <div class="collapse_filter_tit">功能权限：</div>
                                    <Select v-model="permission" style="width:268px" placeholder="功能模块名称">
                                        <Option :value="3" :key="3">3</Option>
                                    </Select>
                                    <a class="collapse_checked">查看已选</a>
                                </div>
                                <div class="moudle_box">
                                    <CheckboxGroup v-model="mudules" class="check_box_group">
                                        <div class="check_box"><Checkbox label="banana">香蕉</Checkbox></div>
                                        <div class="check_box"><Checkbox label="banana">香蕉</Checkbox></div>
                                        <div class="check_box"><Checkbox label="banana">香蕉</Checkbox></div>
                                        <div class="check_box"><Checkbox label="banana">香蕉</Checkbox></div>
                                        <div class="check_box"><Checkbox label="banana">香蕉</Checkbox></div>
                                        <div class="check_box"><Checkbox label="banana">香蕉</Checkbox></div>
                                        <div class="check_box"><Checkbox label="banana">香蕉</Checkbox></div>
                                    </CheckboxGroup>
                                </div>
                            </div>
                        </Panel>
                    </Collapse>
                </Form>
            </div>
            <div v-show="current != 0">
                <Table :columns="columns" :data="modalTableData">
                    <template slot-scope="{ row, index }" slot="chargeType">
                        {{ row.chargeType }}
                    </template>

                    <template slot-scope="{ row, index }" slot="num">
                        <Input type="text" v-model="row.num">
                            <span slot="append">年</span>
                        </Input>
                        <!-- <span v-else>{{ row.num }}</span> -->
                    </template>

                    <template slot-scope="{ row, index }" slot="price">
                        {{ row.price }}
                    </template>

                    <template slot-scope="{ row, index }" slot="preferential">
                        {{ row.preferential }}
                    </template>

                    <template slot-scope="{ row, index }" slot="pricing">
                        <Input type="text" v-model="row.pricing">
                            <span slot="append">人</span>
                        </Input>
                        <!-- <span v-else>{{ row.pricing }}</span> -->
                    </template>
                </Table>
            </div>
            <div slot="footer" class="createBetweenMod al_footer">
                <Button @click="step('formBetween')" v-show="current != 0">上一步</Button>
                <Button @click="close('formBetween')" v-show="current == 0">取消</Button>
                <Button type="primary" @click="ok('formBetween')" v-show="current != 0">确定</Button>
                <Button type="primary" @click="next('formBetween')" v-show="current == 0">下一步</Button>
            </div>
        </Modal>
        <share ref="share"></share>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import valid, { errors, sysUser, sysDict, sysCommonSql, sysConfig, sysProps } from '../../libs/request';
import vSearchCollapse from '@public/modules/vSearchCollapse';
import { waitUntil, DatePickerOpt, defaultDatePickerValue } from '@public/libs/util';
import bigTable from '@public/modules/bigTable.vue';
import share from "./components/share";
export default {
    name: 'core.between',
    data() {
        return {
            mudules: [],
            current: 0,
            permission: '',
            collapse: '1',
            formBetween: {
                betweenName: '',
                funModule: []
            },
            ruleBetween: {
                betweenName: [{ required: true, message: '功能包名称不能为空', trigger: 'blur' }]
            },
            createBetweenModal: false,
            searcParams: {
                betweenName: '',
                createRole: '',
                billinMode: '',
                betweenStatus: ''
            },
            optTime: '',
            options: null,
            tableHeightOut: 72 + 90 + 52,
            tableData: [{}],
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
                                        marginRight: '8px',
                                        // display: this.myButtonPrem && this.myButtonPrem.indexOf('details') >= 0 ? 'inline-block' : 'none'
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push({name:'core.lesseeTrialTenant'})
                                        }
                                    }
                                },
                                '详情'
                            ),
                            h(
                                'a',
                                {
                                    style: {
                                        // marginRight: '8px',
                                        // display: this.myButtonPrem && this.myButtonPrem.indexOf('details') >= 0 ? 'inline-block' : 'none'
                                    },
                                    on: {
                                        click: () => {
                                            this.$refs.share.receiptInfos({
                                                id:params.row.id
                                            })
                                            // this.$router.push({name:'core.lesseeShareEditPage',params:{tabValName:'name3'}})
                                        }
                                    }
                                },
                                '分享'
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
                    btnClick: this.createFunBetweenage,
                    text: '创建套餐'
                }
            ],
            pageNo: 1,
            pageSize: this.$store.state.app.pageSizeGlobal,
            updateShowTitle: 'jwCourse.updateShowTitle', //del""
            updateShowTitleKey: 'crm.customerManagement',
            tableSelected: [],
            modalTableData: [
                { chargeType: 1024, num: '', price: 1024, preferential: 246, pricing: '' },
                { chargeType: 1024, num: '', price: 1024, preferential: 246, pricing: '' }
            ],
            columns: [
                {
                    title: '计费类型',
                    slot: 'chargeType'
                },
                {
                    title: '限制量',
                    slot: 'num',
                    minWidth:50,
                },
                {
                    title: '定价(元)',
                    slot: 'price'
                },
                {
                    title: '优惠金额(元)',
                    slot: 'preferential'
                },
                {
                    title: '套餐定价',
                    slot: 'pricing',
                    minWidth:50,
                }
            ]
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
        bigTable,
        share
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
    },
    methods: {
        searchRecord() {},
        resetSearchRecord() {},
        changeDivHeight(height) {
            this.tableHeightOut = height + 90 + 52;
        },
        createFunBetweenage() {
            this.createBetweenModal = true;
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
        close(name) {
            this.$refs[name].resetFields();
            this.createBetweenModal = false;
        },
        ok(name) {
            this.$refs[name].validate(ok => {
                if (ok) {
                    this.createBetweenModal = false;
                } else {
                }
            });
        },
        next(name) {
            this.$refs[name].validate(ok => {
                if (ok) {
                    this.current = 1;
                } else {
                }
            });
        },
        step() {
            this.current = 0;
        },
        funModuleChange(arr, item) {
            this.formBetween.funModule = arr;
        }
    }
};
</script>
