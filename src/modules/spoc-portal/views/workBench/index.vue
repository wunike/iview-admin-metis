<style lang="less">
.create-work-store-box {
    padding: 10px;
    height: 100%;
    width: 100%;
    overflow-y: hidden;

    .create-work-store-header {
        height: 120px;
        padding: 37px 84px 0;
        background: #fff;
        border-radius: 4px;

        .ivu-steps-item {
            padding-left: 35px;
            /*position: relative;*/
            /*left:-35px;*/
            &:last-child{
                .ivu-steps-tail{
                    display: none;
                }
            }
        }
        .ivu-steps-tail{
            display: block;
        }
        .ivu-steps-main {
            /*z-index: 100;*/
            /*overflow-x: hidden!important;*/
            .step-name {
                padding-left: 20px;
            }

            .ivu-steps-content {
                padding-left: 0;
            }

            .step-content {
                width: 100px;
                margin-left: -35px;

                div {
                    text-align: center;
                    color: rgba(34, 38, 44, 1);
                    font-size: 12px;
                }

                .step-content-title-1 {
                    font-size: 14px;
                    font-family: Roboto-Regular, Roboto;
                    font-weight: 400;
                    color: rgba(34, 38, 44, 1);
                    line-height: 18px;
                    padding-bottom: 4px;
                    padding-top: 6px;
                }
            }
        }
    }

    .cistern-center {
        margin-top: 10px;
        margin-bottom: 60px;
        border-radius: 4px;
        height: calc(~'100% - 222px');
    }

    .create-work-store-footer {
        background: #fff;
        box-shadow: 0px -1px 3px 0px rgba(0, 0, 0, 0.12);
        width: 100%;
        position: fixed;
        padding: 12px 16px 12px 16px;
        bottom: 0;
        right: 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
}

.finish-modal {
    text-align: center;

    .fm-icon {
        margin-top: -10px;
    }

    h2 {
        margin-top: 22px;
        font-size: 16px;
        font-family: HiraginoSansGB-W6, HiraginoSansGB;
        font-weight: normal;
        color: rgba(73, 80, 96, 1);
    }

    .info {
        margin-top: 10px;
        margin-bottom: 32px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(73, 80, 96, 1);
    }
}
</style>
<template>
    <div class="create-work-store-box">
        <div class="create-work-store-header">
            <Steps :current="current" :status="status">
                <Step v-for="(item, index) in stepArr" :key="index">
                    <div slot="title" class="step-name">&nbsp;</div>
                    <div slot="content" class="step-content">
                        <div class="step-content-title-1">{{ item.name }}</div>
                        <!-- <div>{{ item.content }}</div> -->
                        <!-- <div>{{ item.sub }}</div> -->
                    </div>
                </Step>
            </Steps>
        </div>
        <div class="cistern-center">
            <enterpriseInfo v-if="stepArr.length - current == 5" ref="enterpriseInfo" @add="add"></enterpriseInfo>
            <systemInfo v-if="stepArr.length - current == 4" ref="systemInfo" @add="add"></systemInfo>
            <organization v-if="stepArr.length - current == 3" ref="organization"></organization>
            <authorityAllocation v-if="stepArr.length - current == 2" ref="authorityAllocation"></authorityAllocation>
            <addEmployee v-if="stepArr.length - current == 1" ref="addEmployee"></addEmployee>
        </div>
        <div class="create-work-store-footer">
            <Button v-show="current < stepArr.length && current > 0" style="margin-right:20px;" @click="prev">上一步</Button>
            <Button v-show="current < stepArr.length - 1" type="primary" style="margin-right:20px;" @click="next">下一步</Button>
            <Button v-show="current == stepArr.length - 1" type="primary" @click="finished">完成</Button>
        </div>
        <Modal v-model="finish" footer-hide :mask-closable="false">
            <div class="finish-modal">
                <div class="fm-icon"><Icon size="54" color="#52C41A" type="ios-checkmark-circle" /></div>
                <h2 style="margin-bottom:30px;">恭喜您！租户创建成功！</h2>
                <!-- <h2>企业信息提交完成</h2> -->
                <!-- <div class="info">提交完成，您可以开始使用 MEIIS 系统。</div> -->
                <div class="fm-button"><Button @click="goOut" type="primary">立即使用</Button></div>
            </div>
        </Modal>
    </div>
</template>

<script>
import addEmployee from './components/addEmployee';
import authorityAllocation from './components/authorityAllocation';
import enterpriseInfo from './components/enterpriseInfo';
import organization from './components/organization';
import systemInfo from './components/systemInfo';
import valid, { errors, api } from '../../libs/request.js';
import { mapMutations, mapState } from 'vuex';
import {waitUntil} from "../../libs/util";
export default {
    components: {
        addEmployee,
        authorityAllocation,
        enterpriseInfo,
        organization,
        systemInfo
    },
    data() {
        return {
            leave: false,
            finish: false,
            current: 0,
            status: '0',
            stepArr: [
                { name: '企业信息', content: `填写企业相关的`, sub: '基本信息' },
                { name: '系统信息', content: '设置相关的系统展', sub: '示信息' },
                { name: '添加机构', content: '为您的企业组建相', sub: '应组织架构' },
                { name: '分配权限', content: '依据员工的不同角', sub: '色进行权限设置' },
                { name: '添加员工', content: '企业架构下的组织', sub: '添加相关员工' }
            ],
            bussinessId: ''
        };
    },
    computed:{
        ...mapState(['userInfo', 'appMenuList']),
    },
    mounted() {
        this.$refs.enterpriseInfo.getForm();
        this.getId();
        this.getFormByGetByDomain();

        waitUntil(
            () => {
                return this.userInfo&&this.userInfo.id;
            },
            () => {
                if (this.userInfo && this.userInfo.id != '1') {
                    this.stepArr = [
                        { name: '添加机构', content: '为您的企业组建相', sub: '应组织架构' },
                        { name: '分配权限', content: '依据员工的不同角', sub: '色进行权限设置' },
                        { name: '添加员工', content: '企业架构下的组织', sub: '添加相关员工' }
                    ];
                }
            }
        );
    },
    beforeRouteLeave(to, from, next) {
        if (to.name === 'portal.login') {
            next();
            return;
        }
        api.tenantForm({})
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    console.log(res.data.data);
                    if (this.leave) {
                        if (res.data.data && res.data.data.status && res.data.data.status.code == 'UNINIT') {
                            if (to.name === 'portal.workBench' || to.name === 'portal.workbenchNew') {
                                next();
                            } else {
                                next(false);
                            }
                        } else {
                            next();
                        }
                    } else {
                        next(false);
                    }
                }
            })
            .catch(errors.call(this));
    },
    methods: {
        getFormByGetByDomain(key) {
            let params = {
                tenantCode: localStorage.getItem('tenant')
            };
            api.getByTenantCode(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        if (res.data.data) {
                            let data = res.data.data;
                            // if (data.version && data.version.code == 'standard') {
                            //     this.stepArr = [
                            //         { name: '组织架构', content: '为您的企业组建相', sub: '应组织架构' },
                            //         { name: '权限分配', content: '依据员工的不同角', sub: '色进行权限设置' },
                            //         { name: '添加员工', content: '企业架构下的组织', sub: '添加相关员工' }
                            //     ];
                            // }
                        }
                    }
                })
                .catch(errors.call(this));
        },
        getId() {
            api.tenantForm()
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.bussinessId = res.data.data.id;
                    }
                })
                .catch(errors.call(this));
        },
        goOut() {
            this.$router.push({
                name: 'portal.workbenchNew'
            });
        },
        go2Use() {
            let param = {
                id: this.bussinessId,
                status: {
                    code: 'TRAILING'
                }
            };
            api.updateStatus(param)
                .then(valid.call(this))
                .then(res => {
                    if (res.data.data) {
                        this.leave = true;
                    }
                })
                .catch(errors.call(this));
        },
        prev() {
            if (this.current == 1) {
                setTimeout(() => {
                    this.$refs.enterpriseInfo.getForm();
                }, 0);
            } else if (this.current == 2) {
                setTimeout(() => {
                    this.$refs.systemInfo.getForm('icon');
                }, 0);
            }
            this.before();
        },
        before() {
            if (this.current == 0) {
                this.current = 0;
            } else {
                this.current -= 1;
            }
        },
        finished() {
            this.finish = true;
            this.go2Use();
            // if (this.current == this.stepArr.length-1) {
            //     this.current = 0;
            // } else {
            //     this.current += 1;
            // }
        },
        add() {
            if (this.current == this.stepArr.length) {
                this.current = 0;
            } else {
                this.current += 1;
            }
            if (this.current == 1) {
                setTimeout(() => {
                    this.$refs.systemInfo.getForm('icon');
                }, 0);
            }
        },
        next() {
            if (this.stepArr.length - this.current == 5) {
                this.$refs.enterpriseInfo.save();
            } else if (this.stepArr.length - this.current == 4) {
                this.$refs.systemInfo.save();
            } else {
                this.add();
            }
        }
    }
};
</script>
