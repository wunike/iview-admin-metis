<style lang="less">
.assign_leads_by_single {
    .ivu-table-wrapper {
        border: 1px solid #dcdee2;
        border-bottom: 0;
        border-right: 0;
        .ivu-table {
            th {
                /*background-color: #fff;*/
            }
            &:after {
                display: inline-block;
                content: '';
                width: 1px;
                height: 100%;
                position: absolute;
                top: 0;
                right: 0;
                background-color: #dcdee2;
                z-index: 3;
            }
        }
    }
    .assign_leads_by_single-box-single {
        // height: 386px;
        width: 100%;
        .title {
            background: #f7f8fa;
            height: 32px;
            line-height: 32px;
            padding-left: 20px;
            border-top: 1px solid #dcdee3;
            border-left: 1px solid #dcdee3;
            border-right: 1px solid #dcdee3;
            span {
                font-size: 12px;
                font-weight: 600;
                color: rgba(51, 51, 51, 1);
            }
        }

        .search-box {
            margin-bottom: 16px;
        }
    }
}
</style>

<template>
    <Modal v-model="batchAssign" width="449" class-name="assign_leads_by_single" :title="$t('modules_spoc_crm_web_src_views_customermanagement_assignleadsbysingle_1224')" :mask-closable="false" @on-visible-change="visibleChange" :transfer="false">
        <div class="assign_leads_by_single-box-single">
            <div class="search-box">
                <Input v-model="name" :placeholder="$t('modules_spoc_crm_web_src_views_customermanagement_assignleads_1206')" style="width: 160px;margin-right:12px;" />
                <Select v-model="campus" @on-change="search" style="width: 160px;margin-right:12px;" filterable :placeholder="$t('modules_spoc_crm_web_src_views_customermanagement_assignleadsbysingle_1226')">
                    <Option v-for="item in campusList" :value="item.id" :key="item.id">{{ item.code }}{{ item.name }}</Option>
                </Select>
                <Button type="primary" @click="search">{{$t('modules_rolepeople_210')}}</Button>
            </div>
            <Table height="338" :no-data-text="name ? '暂无数据': '当前机构下没有销售，请联系校长或管理员分配销售人员'" :columns="columns2" :loading="isloading" :data="data2" @on-selection-change="selectionChange" border></Table>
            <Form ref="formValidate" style="margin-top:20px;" v-if="isAssign" :model="formValidate" :rules="ruleValidate" :label-width="90">
                <FormItem :label="$t('modules_spoc_crm_web_src_views_customermanagement_assignleadsbysingle_1228')" prop="reason">
                    <Select v-model="formValidate.reason" @on-change="changeReason" clearable style="width:300px" :placeholder="$t('modules_spoc_crm_web_src_views_customermanagement_assignleadsbysingle_1229')">
                        <Option :value="$t('modules_spoc_crm_web_src_views_customermanagement_assignleadsbysingle_1230')">{{$t('modules_spoc_crm_web_src_views_customermanagement_assignleadsbysingle_1230')}}</Option>
                        <Option :value="$t('modules_spoc_crm_web_src_views_customermanagement_assignleadsbysingle_1231')">{{$t('modules_spoc_crm_web_src_views_customermanagement_assignleadsbysingle_1231')}}</Option>
                        <Option :value="$t('modules_spoc_crm_web_src_views_customermanagement_assignleadsbysingle_1232')">{{$t('modules_spoc_crm_web_src_views_customermanagement_assignleadsbysingle_1232')}}</Option>
                        <Option :value="$t('modules_spoc_crm_web_src_views_customermanagement_assignleadsbysingle_1233')">{{$t('modules_spoc_crm_web_src_views_customermanagement_assignleadsbysingle_1233')}}</Option>
                    </Select>
                </FormItem>
                <FormItem :label="$t('modules_spoc_crm_web_src_views_customermanagement_assignleadsbysingle_1234')" prop="reasonOthenDesc" v-if="formValidate.reason == $t('modules_spoc_crm_web_src_views_customermanagement_assignleadsbysingle_1233')">
                    <Input v-model="formValidate.reasonOthenDesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('modules_spoc_crm_web_src_views_customermanagement_assignleadsbysingle_1235')"></Input>
                </FormItem>
            </Form>
        </div>

        <div slot="footer" class="same_modal_footer">
            <Button @click="cancel">{{$t('classroom_allscore_53')}}</Button>
            <Button type="primary" @click="save">{{$t('scoretemplate_scoretemplate_561')}}</Button>
        </div>
    </Modal>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { waitUntil } from '@public/libs/util';
import valid, { errors, sysUser, crmCustomerStatus, sysConfig } from '../../libs/request';
export default {
    components: {},
    data() {
        return {
            formValidate:{
                reason: '', // 再次分配理由
                reasonOthenDesc: '' , // 选择其他项时，需要填写说明
            },
            ruleValidate: {
                reason: [
                    { required: true, message: this.$t('modules_spoc_crm_web_src_views_customermanagement_assignleadsbysingle_1229'), trigger: 'change' }
                ],
                reasonOthenDesc: [
                    { required: true, message: this.$t('modules_spoc_crm_web_src_views_customermanagement_assignleadsbysingle_1235'), trigger: 'change' }
                ],
            },
            isAssign: false, // 为true 则是已分配资源再次分配需要加上理由
            selectedRoles: [],
            isActioning: false, //多次提交拦截
            isloading: false,
            batchAssign: false,
            name: '',
            campus: '',
            nameList: [],
            campusList: [],
            columns2: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: this.$t('modules_rolemanage_186'),
                    width:null,
                    resizable:true,
                    key: 'name',
                    render: (h, params) => {
                        return h('div', {}, params.row.name+'（'+params.row.total+'）');
                    }
                },
                {
                    title: this.$t('modules_usermanage_230'),
                    width:null,
                    resizable:true,
                    key: 'mobile'
                },
                // {
                //     title: '所属校区',
                //     width:null,
                //     resizable:true,
                //     key: 'officeName'
                // }
            ],
            data2: [],
            currentIds: [],
            selectedIds: [],
            id: '',
            pageNo: 1,
            count: 0,
            assignOfficeId: '',
        };
    },
    computed: {
        ...mapState(['app'])
    },
    mounted() {
        this.updateLoadingStatus({isLoading: true});
        sysConfig.getConfig({
            menuId: 2001,
            configId:'crm:allocPool'
        }).then(valid.call(this)).then((res) => {
            if (res.ok) {
                let _data = res.data.data;
                // 分单池规则
                // this.allocPool.enable = _data.enable;
                // this.allocPool.enableLable = _data.enable == '1' ? true : false;
                this.selectedRoles = _data.roleIds
                this.getInitData();
                this.$nextTick(() => {
                    let _this = this;
                    let table_box = this.$el.querySelector('.ivu-table-body');
                    let table_tbody = this.$el.querySelector('.ivu-table-tbody');
                    table_box.addEventListener(
                        'scroll',
                        function() {
                            if (Math.ceil(table_box.clientHeight + table_box.scrollTop) >= Math.ceil(table_tbody.offsetHeight)) {
                                console.log(121212);
                                if (_this.data2.length < _this.count) {
                                    _this.isloading = true;
                                    _this.pageNo += 1;
                                    _this.getList();
                                }
                            }
                        },
                        false
                    );
                });
            } else {
                this.updateLoadingStatus({isLoading: false});
            }
        }).catch(errors.call(this)).finally(() => {
        });
    },

    methods: {
        ...mapMutations(['updateLoadingStatus']),
        changeReason(){
            this.formValidate.reasonOthenDesc = ''
        },
        selectionChange(selection) {
            let s = this.selectedIds;
            let c = this.currentIds;
            for (let i in c) {
                if (s.includes(c[i])) {
                    let num = this.selectedIds.indexOf(c[i]);
                    s.splice(num, 1);
                }
            }
            if (selection.length) {
                selection.forEach(item => {
                    s.push(item.id);
                });
            }
        },
        getInitData() {
            let promise = new Promise((resolve, reject) => {
                //校区列表
                sysUser
                    .dataScopeFilter()
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            resolve(res);
                        }
                    })
                    .catch(errors.call(this));
            });
            promise.then(res => {
                if (res.ok) {
                    this.campusList = res.data.data;
                    waitUntil(
                        () => {
                            return !!this.app.currOfficeId;
                        },
                        () => {
                            this.campus = this.app.currOfficeId;
                            this.search();
                        }
                    );
                }
            });
        },
        show(id, status) {
            this.isAssign = status ? true : false //是否是已经分配过的
            this.formValidate = {
                reason: '',
                reasonOthenDesc: ''
            }
            this.id = id;
            this.batchAssign = true;
            this.selectedIds = [];
            this.data2 = [];
        },
        cancel() {
            this.batchAssign = false;
            this.selectedIds = [];
            this.data2 = [];
        },
        search() {
            this.pageNo = 1;
            this.getList();
        },
        getList() {
            this.updateLoadingStatus({ isLoading: true });
            let params = {
                isService: 1,
                roleIds: this.selectedRoles.join(','), //'4',
                officeId: this.campus,
                name: this.name,
                pageSize: 10,
                pageNo: this.pageNo,
                // dsfFlag: '1'
            };
            this.assignOfficeId = this.campus + ''
            crmCustomerStatus
                .listRoleUser(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        // this.data2 = res.data.data.list
                        let data = res.data;
                        let d = data.data.list;
                        this.currentIds = [];
                        for (let i in d) {
                            this.currentIds.push(d[i].id);
                            if (this.selectedIds.includes(d[i].id)) {
                                d[i]._checked = true;
                            }
                        }
                        if (this.pageNo == 1) {
                            this.data2 = [];
                        }
                        this.count = data.data.total;
                        this.data2 = this.data2.concat(d);
                        console.log(res);
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.isloading = false;
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        save() {
            // console.log(this.selectedIds)
            if(!this.selectedIds.length){
                this.$Message.error('请选择销售')
                return false;
            }
            if(this.isAssign){
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                        this.assign([this.id]);
                    } else {
                        this.batchAssign = true
                    }
                })
            } else {
                this.assign([this.id]);
            }
        },
        assign(arr) {
            if(this.isActioning){ //多次提交拦截
                return
            }
            this.isActioning = true
            this.updateLoadingStatus({ isLoading: true });
            let params = {
                assignPhase: 'sale',
                ids: arr,
                assignedUserIds: this.selectedIds,
                assignOfficeId: this.assignOfficeId,
                officeId: this.assignOfficeId,
            };
            if(this.isAssign){
                params.reason = this.formValidate.reasonOthenDesc ? this.formValidate.reasonOthenDesc : this.formValidate.reason
            }
            crmCustomerStatus
                .assign(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.$emit('assign-success');
                        this.batchAssign = false;
                        this.$nextTick(() => {
                            this.$emit('close');
                        });
                        if (res.data.data.totalCount - res.data.data.assignCount > 0) {
                            this.$Modal.success({
                                title: this.$t('modules_spoc_crm_web_src_views_customermanagement_assignleadsbysingle_1240'),
                                content: this.$t('modules_spoc_crm_web_src_views_customermanagement_assignleadsbysingle_1241', [res.data.data.assignCount,res.data.data.totalCount - res.data.data.assignCount])
                            });
                        } else {
                            // this.$Modal.success({
                            //     title: '分配成功',
                            //     content: `已分配${res.data.data.assignCount}个资源，剩余${res.data.data.totalCount - res.data.data.assignCount}个资源未分配!<br>销售资源数已达到最大值，请将未分配资源分配给其他销售。`
                            // });
                            this.$Message.success(this.$t('modules_spoc_crm_web_src_views_customermanagement_assignleadsbysingle_1242'));
                        }
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                    this.isAssign = false
                    setTimeout(()=>{
                        //多次提交拦截
                        this.isActioning = false
                    },200)
                });
        },
        visibleChange(val) {
            if (!val) {
                this.$nextTick(() => {
                    this.$emit('close');
                });
            }
        }
    },
    watch: {
        'app.currOfficeId': function(val, oldVal) {
            if (oldVal) {
                this.campus=this.app.currOfficeId
                this.pageNo=1;
                this.search();
            }
        }
    }
};
</script>
