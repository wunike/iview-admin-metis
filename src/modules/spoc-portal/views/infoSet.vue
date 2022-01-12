<style lang="less">
.infoConfig {
    font-size: 14px;
    /*border-top: 1px solid #e0e0e0;*/

    // overflow: hidden;
    padding: 10px;
    position: relative;
    background: #ffffff;
    margin-top: 32px;
    .alert {
        position: absolute;
        top: -48px;
        left: -16px;
        right: -16px;
    }
    .mask {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1999;
        background-color: rgba(255, 255, 255, 0.99);
    }
    .warn {
        border: 1px #e0e0e0 solid;
        line-height: 52px;
        background-color: #fafafa;
        padding-left: 12px;
        padding-right: 30px;
        .btn {
            float: right;
            margin-top: 10px;
        }
    }
    .table {
        margin-top: 20px;
        border: none;
        .ivu-table:after {
            display: none;
        }
    }
    .page-box {
        display: flex;
        justify-content: center;
        margin-top: 14px;
        // padding-bottom: 16px;
        display: none;
    }
    .menu {
        position: absolute;
        right: 70px;
        top: 50px;
        line-height: 34px;
        .icon-shaixuanguolv {
            cursor: pointer;
        }
    }
    .shade {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #fff;
        .demo-spin-icon-load {
            animation: ani-demo-spin 1s linear infinite;
        }
        @keyframes ani-demo-spin {
            from {
                transform: rotate(0deg);
            }
            50% {
                transform: rotate(180deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
        .demo-spin-col {
            height: 100vh;
            position: relative;
        }
    }
}

.modal {
    .role {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        padding-top: 6px;
        .box {
            width: 370px;
            height: 300px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(230, 231, 235, 1);
            .tit {
                width: 368px;
                height: 39px;
                background: rgba(250, 250, 250, 1);
                font-size: 12px;
                font-weight: 500;
                color: rgba(73, 80, 96, 1);
                line-height: 39px;
                padding: 0 16px;
            }
            .wind {
                width: 100%;
                height: 260px;
                border: 1px solid rgba(230, 231, 235, 1);
                border-left: none;
                border-right: none;
                .content {
                    overflow: auto;
                    height: 207px;
                    width: 100%;
                    padding: 12px;
                    border-bottom: 1px solid rgba(230, 231, 235, 1);
                    .checkbox {
                        margin-bottom: 10px;
                        font-size: 12px;
                        font-weight: 400;
                        color: rgba(73, 80, 96, 1);
                    }
                }
                .btn {
                    height: 46px;
                    padding: 6px 12px;
                    text-align: right;
                    .but {
                        width: 76px;
                        height: 34px;
                        span {
                            display: inline-block;
                            line-height: 18px;
                        }
                    }
                }
            }
        }
    }
    .warn {
        margin-top: 10px;
        color: red;
        line-height: 2.5em;
    }
    .table {
        .hid {
            display: none;
        }
        .table_foot {
            width: 100%;
            td {
                padding: 0 18px;
                .input {
                    width: 140px;
                }
                &.tdLast {
                    text-align: center;
                    .a2 {
                        margin-left: 20px;
                    }
                }
            }
        }
    }
    .lastWarn {
        margin-top: 10px;
    }
}
</style>

<template>
    <div class="infoConfig" :style="alertClose ? 'margin-top: 0;' : ''">
        <Alert type="warning" show-icon class="alert" closable @on-close="alertClose = true">
            <b>提醒</b>
            ：您可以为每类消息设置是否接收，为防止重要信息遗漏，建议设置全部接收。
        </Alert>
        <!--
		<p class="warn">
			<Button type="primary" class="btn">设置通知接收人</Button>
		</p> -->

        <Select v-model="model1" placeholder="所属应用" style="width:200px" @on-change="filter">
            <Option v-for="item in filtersList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Table ref="selection" :columns="columns4" :data="setList" :height="430" class="table" v-show="isShow"></Table>
        <div class="page-box">
            <div style="margin: auto;display: inline-block;">
                <Page :total="count" :current="1" show-total :show-sizer="count > 10" show-elevator @on-change="pageChange" @on-page-size-change="sizeChange"></Page>
            </div>
        </div>
        <Modal ref="save" v-model="modal" width="800" title="设置通知角色" class-name="modal vertical-center-modal" @on-ok="saveModel">
            <div>
                <p>
                    通知类型：
                    <span>{{configName}}</span>
                </p>
                <div class="role">
                    <div class="box">
                        <p class="tit">待分配角色
                            <Checkbox :value="checkAll" @on-change="handleCheckAll" style="float: right;">全选</Checkbox>
                        </p>
                        <div class="wind">
                            <div class="content">
                                <CheckboxGroup v-model="unassignRolesGroup" @on-change="unassignRolesGroupChange">
                                    <Row>
                                        <Col span="8" v-for="item in unassignRoles" :key="item.id">
                                            <Checkbox class="checkbox" :label="item.id">{{ item.name }}</Checkbox>
                                        </Col>
                                    </Row>
                                </CheckboxGroup>
                            </div>
                            <div class="btn">
                                <Button @click="toadd" class="but">
                                    添加 >
                                    <i class="iconfont icon-youjiantou"></i>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div class="box">
                        <p class="tit">已分配角色</p>
                        <div class="wind">
                            <div class="content">
                                <CheckboxGroup v-model="assignRolesGroup">
                                    <Row>
                                        <Col span="8" v-for="item in assignRoles" :key="item.id">
                                            <Checkbox class="checkbox" :label="item.id">{{ item.name }}</Checkbox>
                                        </Col>
                                    </Row>
                                </CheckboxGroup>
                            </div>
                            <div class="btn">
                                <Button @click="toremove" class="but">
                                    <i class="iconfont icon-zuojiantou"></i>
                                    < 移除
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
        <div class="shade" v-if="loadingShow">
            <div class="demo-spin-col">
                <Spin fix size="large">
                    <Icon type="load-c" size="18" class="demo-spin-icon-load"></Icon>
                    <div>Loading</div>
                </Spin>
            </div>
        </div>
    </div>
</template>

<script>
import filters from '../modules/filter.vue';
import valid, { errors, sysConfig, sysMenu } from '../libs/request.js';
export default {
    name: 'portal.infoSet',
    data() {
        return {
            checkAll:false,
            alertClose: false,
            loadingShow: false,
            isShow: false,
            count: 0,
            menuId: '',
            modal: false,
            iname: '',
            iemail: '',
            iphone: '',
            assignRoles: [],
            assignRolesGroup: [],
            imenuId: '',
            kind: '',
            unassignRoles: [],
            userLinks: [],
            unassignRolesGroup: [],
            filtersList: [],
            configName:'',
            columns1: [
                {
                    title: '姓名',
                    key: 'name',
                    render: (h, params) => {
                        let self = this;
                        return h('div', {}, [
                            h('input', {
                                attrs: {
                                    type: 'text'
                                },
                                domProps: {
                                    value: self.userLinks[params.index].name
                                },
                                class: {
                                    hid: !self.userLinks[params.index].isEdit
                                },
                                on: {
                                    change: function(event) {
                                        self.userLinks[params.index].name = event.target.value;
                                    }
                                }
                            }),
                            h(
                                'p',
                                {
                                    class: {
                                        hid: self.userLinks[params.index].isEdit
                                    }
                                },
                                params.row.name
                            )
                        ]);
                    }
                },
                {
                    title: '邮箱',
                    key: 'email',
                    render: (h, params) => {
                        let self = this;
                        return h('div', {}, [
                            h('input', {
                                attrs: {
                                    type: 'text'
                                },
                                domProps: {
                                    value: self.userLinks[params.index].email
                                },
                                class: {
                                    hid: !self.userLinks[params.index].isEdit
                                },
                                on: {
                                    change: function(event) {
                                        self.userLinks[params.index].email = event.target.value;
                                    }
                                }
                            }),
                            h(
                                'p',
                                {
                                    class: {
                                        hid: self.userLinks[params.index].isEdit
                                    }
                                },
                                params.row.email
                            )
                        ]);
                    }
                },
                {
                    title: '手机',
                    key: 'mobile',
                    render: (h, params) => {
                        let self = this;
                        return h('div', {}, [
                            h('input', {
                                attrs: {
                                    type: 'text'
                                },
                                domProps: {
                                    value: self.userLinks[params.index].mobile
                                },
                                class: {
                                    hid: !self.userLinks[params.index].isEdit
                                },
                                on: {
                                    change: function(event) {
                                        self.userLinks[params.index].mobile = event.target.value;
                                    }
                                }
                            }),
                            h(
                                'p',
                                {
                                    class: {
                                        hid: self.userLinks[params.index].isEdit
                                    }
                                },
                                params.row.mobile
                            )
                        ]);
                    }
                },
                {
                    title: '操作',
                    key: 'configName',
                    align: 'center',
                    render: (h, params) => {
                        let self = this;
                        return h(
                            'div',
                            {
                                style: {
                                    width: '100%',
                                    textAlign: 'center'
                                }
                            },
                            [
                                h(
                                    'a',
                                    {
                                        attrs: {
                                            href: 'javascript:void(0)'
                                        },
                                        style: {
                                            fontSize: '12px'
                                        },
                                        on: {
                                            click: function() {
                                                console.log(self.userLinks[params.index]);
                                                self.userLinks[params.index].isEdit = !self.userLinks[params.index].isEdit;
                                            }
                                        }
                                    },
                                    params.row.isEdit ? '确定' : '修改'
                                ),
                                h(
                                    'a',
                                    {
                                        attrs: {
                                            href: 'javascript:void(0)'
                                        },
                                        style: {
                                            fontSize: '12px',
                                            marginLeft: '20px'
                                        },
                                        on: {
                                            click: function() {
                                                self.userLinks.splice(params.index, 1);
                                            }
                                        }
                                    },
                                    '取消'
                                )
                            ]
                        );
                    }
                }
            ],
            columns4: [
                {
                    title: '通知类型',
                    key: 'configName'
                },
                {
                    key: 'bool1',
                    align: 'left',
                    renderHeader: (h, params) => {
                        let self = this;
                        return h('div', {}, [
                            h(
                                'Checkbox',
                                {
                                    props: {
                                        value: self.bTit[params.index - 1].log,
                                        'true-value': '1',
                                        'false-value': '0'
                                    },
                                    on: {
                                        'on-change': function(val) {
                                            self.checkCol(self.bTit[params.index - 1].ename, val, self.menuId);
                                        }
                                    }
                                },
                                self.bTit[params.index - 1].cname
                            )
                        ]);
                    },
                    render: (h, params) => {
                        let self = this;
                        return h('div', {}, [
                            h(
                                'Checkbox',
                                {
                                    props: {
                                        value: params.row.mapValue[self.bTit[params.column._index - 1].ename],
                                        'true-value': '1',
                                        'false-value': '0'
                                    },
                                    on: {
                                        'on-change': function(val) {
                                            self.fit(params.row.menuId, params.row.configId, self.bTit[params.column._index - 1].ename, val);
                                        }
                                    }
                                },
                                ''
                            )
                        ]);
                    }
                },
                {
                    key: 'bool2',
                    align: 'left',
                    renderHeader: (h, params) => {
                        let self = this;
                        return h('div', {}, [
                            h(
                                'Checkbox',
                                {
                                    props: {
                                        value: self.bTit[params.index - 1].log,
                                        'true-value': '1',
                                        'false-value': '0'
                                    },
                                    on: {
                                        'on-change': function(val) {
                                            self.checkCol(self.bTit[params.index - 1].ename, val, self.menuId);
                                        }
                                    }
                                },
                                this.bTit[params.index - 1].cname
                            )
                        ]);
                    },
                    render: (h, params) => {
                        let self = this;
                        return h('div', {}, [
                            h(
                                'Checkbox',
                                {
                                    props: {
                                        value: params.row.mapValue[self.bTit[params.column._index - 1].ename],
                                        'true-value': '1',
                                        'false-value': '0'
                                    },
                                    on: {
                                        'on-change': function(val) {
                                            self.fit(params.row.menuId, params.row.configId, self.bTit[params.column._index - 1].ename, val);
                                        }
                                    }
                                },
                                ''
                            )
                        ]);
                    }
                },
                {
                    key: 'bool3',
                    align: 'left',
                    renderHeader: (h, params) => {
                        let self = this;
                        return h('div', {}, [
                            h(
                                'Checkbox',
                                {
                                    props: {
                                        value: self.bTit[params.index - 1].log,
                                        'true-value': '1',
                                        'false-value': '0'
                                    },
                                    on: {
                                        'on-change': function(val) {
                                            self.checkCol(self.bTit[params.index - 1].ename, val, self.menuId);
                                        }
                                    }
                                },
                                this.bTit[params.index - 1].cname
                            )
                        ]);
                    },
                    render: (h, params) => {
                        let self = this;
                        return h('div', {}, [
                            h(
                                'Checkbox',
                                {
                                    props: {
                                        value: params.row.mapValue[self.bTit[params.column._index - 1].ename],
                                        'true-value': '1',
                                        'false-value': '0'
                                    },
                                    on: {
                                        'on-change': function(val) {
                                            self.fit(params.row.menuId, params.row.configId, self.bTit[params.column._index - 1].ename, val);
                                        }
                                    }
                                },
                                ''
                            )
                        ]);
                    }
                },
                {
                    key: 'bool4',
                    align: 'left',
                    renderHeader: (h, params) => {
                        let self = this;
                        return h('div', {}, [
                            h(
                                'Checkbox',
                                {
                                    props: {
                                        value: self.bTit[params.index - 1].log,
                                        'true-value': '1',
                                        'false-value': '0'
                                    },
                                    on: {
                                        'on-change': function(val) {
                                            self.checkCol(self.bTit[params.index - 1].ename, val, self.menuId);
                                        }
                                    }
                                },
                                this.bTit[params.index - 1].cname
                            )
                        ]);
                    },
                    render: (h, params) => {
                        let self = this;
                        return h('div', {}, [
                            h(
                                'Checkbox',
                                {
                                    props: {
                                        value: params.row.mapValue[self.bTit[params.column._index - 1].ename],
                                        'true-value': '1',
                                        'false-value': '0'
                                    },
                                    on: {
                                        'on-change': function(val) {
                                            self.fit(params.row.menuId, params.row.configId, self.bTit[params.column._index - 1].ename, val);
                                        }
                                    }
                                },
                                ''
                            )
                        ]);
                    }
                },
                {
                    key: 'bool5',
                    align: 'left',
                    renderHeader: (h, params) => {
                        let self = this;
                        return h('div', {}, [
                            h(
                                'Checkbox',
                                {
                                    props: {
                                        value: self.bTit[params.index - 1].log,
                                        'true-value': '1',
                                        'false-value': '0'
                                    },
                                    on: {
                                        'on-change': function(val) {
                                            self.checkCol(self.bTit[params.index - 1].ename, val, self.menuId);
                                        }
                                    }
                                },
                                this.bTit[params.index - 1].cname
                            )
                        ]);
                    },
                    render: (h, params) => {
                        let self = this;
                        return h('div', {}, [
                            h(
                                'Checkbox',
                                {
                                    props: {
                                        value: params.row.mapValue[self.bTit[params.column._index - 1].ename],
                                        'true-value': '1',
                                        'false-value': '0'
                                    },
                                    on: {
                                        'on-change': function(val) {
                                            self.fit(params.row.menuId, params.row.configId, self.bTit[params.column._index - 1].ename, val);
                                        }
                                    }
                                },
                                ''
                            )
                        ]);
                    }
                },
                {
                    key: 'bool',
                    align: 'left',
                    renderHeader: (h, params) => {
                        let self = this;
                        return h('div', {}, [
                            h(
                                'Checkbox',
                                {
                                    props: {
                                        value: self.bTit[params.index - 1].log,
                                        'true-value': '1',
                                        'false-value': '0'
                                    },
                                    on: {
                                        'on-change': function(val) {
                                            self.checkCol(self.bTit[params.index - 1].ename, val, self.menuId);
                                        }
                                    }
                                },
                                this.bTit[params.index - 1].cname
                            )
                        ]);
                    },
                    render: (h, params) => {
                        let self = this;
                        return h('div', {}, [
                            h(
                                'Checkbox',
                                {
                                    props: {
                                        value: params.row.mapValue[self.bTit[params.column._index - 1].ename],
                                        'true-value': '1',
                                        'false-value': '0'
                                    },
                                    on: {
                                        'on-change': function(val) {
                                            self.fit(params.row.menuId, params.row.configId, self.bTit[params.column._index - 1].ename, val);
                                        }
                                    }
                                },
                                ''
                            )
                        ]);
                    }
                },
                {
                    key: 'bool6',
                    align: 'left',
                    title: '通知接收人',
                    render: (h, params) => {
                        let self = this;
                        return h(
                            'div',
                            {
                                style: {
                                    width: '70px',
                                    textAlign: 'center'
                                }
                            },
                            [
                                h(
                                    'a',
                                    {
                                        attrs: {
                                            href: 'javascript:void(0)'
                                        },
                                        style: {
                                            fontSize: '12px'
                                        },
                                        on: {
                                            click: function() {
                                                self.clickSet(params.row);
                                            }
                                        }
                                    },
                                    '设置'
                                )
                            ]
                        );
                    }
                }
            ],
            setList: [],
            maskShow: false
        };
    },
    components: {
        filters
    },
    computed: {
        bTit() {
            if (this.setList.length) {
                let obj = [];
                for (var i in this.setList[0].mapValue) {
                    obj.push(i);
                }
                let arr = [];
                obj.forEach((v, k) => {
                    let cname = '';
                    switch (v) {
                        case 'app':
                            cname = 'APP';
                            break;
                        case 'email':
                            cname = '发邮件';
                            break;
                        case 'ewechat':
                            cname = '企业微信';
                            break;
                        case 'phone':
                            cname = '短信提醒';
                            break;
                        case 'web':
                            cname = '站内信';
                            break;
                        case 'chat':
                            cname = '聊天';
                            break;
                        default:
                            break;
                    }
                    arr.push({
                        ename: v,
                        cname: cname,
                        log: '0'
                    });
                });
                arr.forEach((val, ky) => {
                    let log = '1';
                    this.setList.forEach((v, k) => {
                        if (v.mapValue[val.ename] == '0') {
                            log = '0';
                        }
                    });
                    val.log = log;
                });
                return arr;
            } else {
                return [
                    {
                        ename: 'app',
                        cname: 'APP',
                        log: '0'
                    },
                    {
                        ename: 'web',
                        cname: '站内信',
                        log: '0'
                    },
                    {
                        ename: 'phone',
                        cname: '短信提醒',
                        log: '0'
                    },
                    {
                        ename: 'chat',
                        cname: '聊天',
                        log: '0'
                    },
                    {
                        ename: 'ewechat',
                        cname: '企业微信',
                        log: '0'
                    },
                    {
                        ename: 'email',
                        cname: '发邮件',
                        log: '0'
                    }
                ];
            }
        }
    },
    created() {
        this.getList();
        let params1 = {};
        sysMenu
            .listMenu(params1)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    let arr = [];
                    res.data.data.forEach((v, k) => {
                        arr.push({
                            label: v.name,
                            value: v.id
                        });
                    });
                    //					this.menuId = arr[0].value;
                    this.filtersList = arr;
                }
            })
            .catch(errors.call(this));
    },
    mounted() {
        this.$nextTick(() => {
            this.isShow = true;
        });
    },
    methods: {
        getList() {
            this.loadingShow = true;
            this.maskShow = true;
            let params = {
                menuId: this.menuId
            };
            sysConfig
                .listNotifySetting(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.setList = res.data.data;
                        this.count = res.data.data.count;
                        //						if(!this.setList.length) return;
                        this.$nextTick(() => {
                            this.isShowTable = true;
                            setTimeout(() => {
                                this.maskShow = false;
                                this.loadingShow = false;
                            }, 300);
                        });
                    }
                })
                .catch(errors.call(this));
        },
        pageChange: function(num) {
            this.pageNo = num;
            this.getList();
        },
        sizeChange: function(val) {
            this.pageSize = val;
            this.getList();
        },
        checkCol(_key, val, m) {
            this.setList.forEach((v, k) => {
                v.mapValue[_key] = val;
            });
            let params = {
                menuId: m,
                method: _key,
                isRecieve: val
            };
            sysConfig
                .batchNotifySetting(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                    }
                })
                .catch(errors.call(this));
        },
        fit(m, c, mt, ir) {
            let params = {
                menuId: m,
                configId: c,
                method: mt,
                isRecieve: ir
            };
            sysConfig
                .notifySetting(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                    }
                })
                .catch(errors.call(this));
        },
        toadd() {
            this.unassignRolesGroup.forEach((v, k) => {
                this.unassignRoles.forEach((val, ind, arr) => {
                    if (v == val.id) {
                        this.unassignRoles.splice(ind, 1);
                        this.assignRoles.push(val);
                    }
                });
            });
            this.unassignRolesGroup = [];
        },
        addList() {
            this.userLinks.push({
                cfgId: this.kind,
                name: this.iname,
                email: this.iemail,
                mobile: this.iphone,
                isEdit: false
            });
            this.iname = '';
            this.iemail = '';
            this.iphone = '';
        },
        clearList() {
            this.iname = '';
            this.iemail = '';
            this.iphone = '';
        },
        toremove() {
            this.assignRolesGroup.forEach((v, k) => {
                this.assignRoles.forEach((val, ind) => {
                    if (v == val.id) {
                        let obj = this.assignRoles.splice(ind, 1);
                        this.unassignRoles.push(val);
                    }
                });
            });
            this.assignRolesGroup = [];
        },
        clickSet(val) {
            let params = {
                menuId: val.menuId,
                kind: val.configId
            };
            this.imenuId = val.menuId;
            this.kind = val.configId;
            this.configName=val.configName;
            //				assignRoles:[],
            //				imenuId:'',
            //				kind:'',
            //				unassignRoles:[],
            //				userLinks:[],
            sysConfig
                .receiptConfig(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let arr = res.data.data.userLinks;
                        arr.forEach((v, k) => {
                            v.isEdit = false;
                        });
                        this.userLinks = arr;
                        this.assignRoles = res.data.data.assignRoles;
                        this.unassignRoles = res.data.data.unassignRoles;
                        this.modal = true;
                    }
                })
                .catch(errors.call(this));
        },
        saveModel() {
            this.$refs.save.visible = true;
            this.modal = true;
            let params = {
                kind: this.kind,
                menuId: this.imenuId,
                assignRoles: [],
                userLinks: []
            };
            params.assignRoles = this.assignRoles.map(item => {
                return {
                    id: item.id
                };
            });
            params.userLinks = this.userLinks.map(item => {
                return {
                    cfgId: item.cfgId,
                    name: item.name,
                    email: item.email,
                    mobile: item.mobile
                };
            });
            sysConfig
                .saveReceiptConfig(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.$Message.success(res.data.message);
                        this.modal = false;
                    } else {
                        this.$refs.save.visible = true;
                        this.modal = true;
                    }
                })
                .catch(errors.call(this));
        },
        filter(val) {
            this.menuId = value;
            this.getList();
        },
        handleCheckAll(val){
            if(val){
                this.unassignRolesGroup=this.unassignRoles.map(v=>v.id);
            }else{
                this.unassignRolesGroup=[];
            }
        },
        unassignRolesGroupChange(arr){
            let validArr=this.unassignRoles.map(v=>v.id);
            this.checkAll=validArr.every(v=>arr.indexOf(v)!=-1);
        }
    }
};
</script>
