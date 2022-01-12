<style lang="less">
    .tenant-infos-container {
        padding: 10px;
        background: #fff;
        height: 100%;

        .edit-button {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-bottom:30px;
            b {
                font-weight: normal;
            }
        }

        .infos {
            display: flex;

            .c {
                font-size: 14px;
                color: #999;
                height: 32px;
                line-height: 32px;
                div{
                    margin-bottom:20px;

                }
                span {
                    display: inline-block;
                    width: 138px;
                    text-align: right;
                }

                b {
                    font-weight: normal;
                    color: #495060;
                }
            }

            .i-left {
                flex: 4;
            }

            .i-right {
                flex: 3;

            }
        }

        .edit {

        }
    }
</style>

<template>
    <div class="tenant-infos-container">
        <div class="edit-button">
            <div><span>ID：</span><b>SH201910030204 </b></div>
            <div>
                <Button v-if="!ifEditing" type="primary" @click="editFn">编辑</Button>
                <Button style="margin-right:16px;" v-if="ifEditing" @click="cancelFn">取消</Button>
                <Button v-if="ifEditing" type="primary" @click="saveFn">保存</Button>
            </div>
        </div>
        <div class="infos" v-if="!ifEditing">
            <div class="c i-left">
                <div><span>企业名称：</span><b></b></div>
                <div><span>联系人姓名：</span><b></b></div>
                <div><span>手机号：</span><b></b></div>
                <div><span>企业所在地：</span><b></b></div>

            </div>
            <div class="c i-right">
                <div><span>租户类型：</span><b></b></div>
                <div><span>访问地址：</span><b></b></div>
                <div><span>邮箱：</span><b></b></div>
                <div><span>账号密码：</span><b></b></div>

            </div>
        </div>
        <div class="edit" v-else>
            <Form ref="formValidateRef" :model="data" :rules="studRule" :label-width="110">
                <Row>
                    <Col span="10">
                        <FormItem
                                prop="name"
                                label="企业名称："
                                :rules="{required: true, message: '企业名称不能为空!', trigger: 'change'}"
                        >
                            <Input v-model="data.name" placeholder="企业名称"></Input>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem
                                prop="type"
                                label="租户类型："
                                :rules="{required: true, message: '租户类型不能为空', trigger: 'change'}"
                        >
                            <Select
                                    v-model="data.type"
                                    @on-change="referralerChange"
                            >
                                <Option
                                        v-for="item in typeList"
                                        :value="item.id"
                                        :key="item.id"
                                        :label="item.name"
                                >
                                    <span>{{item.name}}</span>
                                </Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="10">
                        <FormItem
                                prop="connectName"
                                label="联系人姓名："
                                :rules="{required: true, message: '联系人姓名不能为空!', trigger: 'change'}"
                        >
                            <Input v-model="data.connectName" placeholder="联系人姓名"></Input>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem
                                prop="net"
                                label="访问域名："
                                :rules="{required: true, message: '访问域名不能为空', trigger: 'change'}"
                        >
                            <Input v-model="data.net" placeholder="访问域名"></Input>

                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="10">
                        <FormItem
                                prop="phone"
                                label="手机号："
                                :rules="{required: true, message: '手机号不能为空!', trigger: 'change'}"
                        >
                            <Row>
                                <Col span="6">
                                    <Select
                                            v-model="data.type"
                                            @on-change="referralerChange"
                                    >
                                        <Option
                                                v-for="item in typeList"
                                                :value="item.id"
                                                :key="item.id"
                                                :label="item.name"
                                        >
                                            <span>{{item.name}}</span>
                                        </Option>
                                    </Select>
                                </Col>
                                <Col span="18">
                                    <Input v-model="data.phone" placeholder="手机号"></Input>
                                </Col>
                            </Row>

                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem
                                prop="email"
                                label="邮箱："
                                :rules="{required: false, message: '邮箱不能为空', trigger: 'change'}"
                        >
                            <Input v-model="data.email" placeholder="邮箱"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row >
                    <Col span="10">
                        <FormItem
                                prop="address"
                                label="企业所在地："
                                :rules="{required: false, message: '企业名称不能为空!', trigger: 'change'}"
                        >
                            <Row type="flex" justify="space-between">
                                <Col span="19">
                                    <Input style="margin-right: 8px;"  v-model="data.address" placeholder="请输入企业所在地"></Input>

                                </Col>
                                <Col >
                                    <Button @click="getMap">地址选择</Button>
                                </Col>
                            </Row>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem
                                prop="password"
                                label="账户密码："


                                :rules="{required: true, message: '账户密码不能为空', trigger: 'change'}"
                        >
                            <Row type="flex" justify="space-between">
                                <Col span="18">
                                    <Input style="margin-right: 8px;"  type="password" v-model="data.password" placeholder="账户密码"></Input>

                                </Col>
                                <Col>
                                    <Button @click="reset">恢复初始密码</Button>
                                </Col>
                            </Row>
                        </FormItem>
                    </Col>
                </Row>
            </Form>

        </div>
        <mapModel ref="mapModel" @mapOk="mapOk"></mapModel>
    </div>
</template>

<script>
    /**
     ** 客户360 - 租户信息
     */
    import mapModel from "@public/modules/mapModel.vue";
    export default {
        props: {
            id: {
                type: String,
                required: true
            }
        },
        components: {mapModel},
        data() {
            return {
                ifEditing: false,
                data: {
                    name: '',
                    type: '',
                    connectName: '',
                    net: '',
                    phone:'',
                    email:'',
                    address:'',
                    password:'',

                },
                typeList: [],
            }
        },
        mounted() {

        },

        methods: {
            reset() {

            },
            getMap() {
                this.$refs.mapModel.modelShow();
            },
            mapOk(keyword, province, city, region, lng, lat) {
                console.log(keyword,province,city,region,lng,lat)
                this.data.address=keyword;
            },
            editFn() {
                this.ifEditing = true
            },
            cancelFn() {
                this.ifEditing = false
            },
            saveFn() {
                this.ifEditing = false

            },
        },
    }
</script>
