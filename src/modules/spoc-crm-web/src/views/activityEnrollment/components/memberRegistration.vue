<style lang="less">
    .mr-modal{
        .ivu-modal-header{
            padding:17px 24px 16px!important;
            background: #F7F8FA;
            border-radius:4px;
            .ivu-modal-header-inner{
                font-size:18px;
                font-weight:500;
                color:rgba(0,0,0,0.85);
            }
        }

        .search-ipt{
            span{
                display: inline-block;
                width: 90px;
                text-align: right;
                font-size:14px;
                font-weight:normal;
                color:rgba(153,153,153,1);
                margin-right:10px;
            }
        }

    }
</style>
<template>
    <Modal
            v-model="mrLock"
            :title="$t('modules_spoc_crm_web_src_views_activityenrollment_components_memberregistration_726')"
            width="600"
            class="mr-modal"
            :mask-closable="false"
            @on-cancel="cancel">
            <div class="search-ipt" >
                <span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_memberregistration_727')}}</span>
                <Select
                        v-model="member"
                        :placeholder="$t('modules_spoc_crm_web_src_views_activityenrollment_components_memberregistration_728')"
                        style="width: 450px;"
                        clearable
                        :filterable="true"
                        remote
                        :loading="loading"
                        :transfer="true"
                        @on-change="getForm(member)"
                        @on-clear="clear"
                        :remote-method="remoteMember"
                >
                    <Option
                            v-for="item in memberList"
                            :value="item.id"
                            :key="item.id"
                            :label="item.name"
                    >
                        <div style="display: flex;
                                    flex-direction: row;
                                    justify-content: space-between;
                                    align-items: center">
                            <span>{{ item.name }}</span>
                            <span>{{ item.enName !== undefined? item.enName : '-' }}</span>
                            <span>{{ item.phone }}</span>
                        </div>
                    </Option>
                </Select>
            </div>
            <entryDetial v-if="member" ref="entryDetialObj"></entryDetial>
            <div  slot="footer">
                <Button @click="cancel" style="margin-right: 8px">{{$t('classroom_allscore_53')}}</Button>
                <Button type="primary" @click="handleSubmit">{{$t('classroom_allscore_54')}}</Button>
            </div>
    </Modal>
</template>

<script>
    import { mapMutations } from "vuex";
    import valid, {
        errors,
        crmCustomer,
        sysCommonSql
    } from "../../../libs/request";
    import entryDetial from "./entryDetial";
    export default {
        data() {
            return {
                isActioning: false, //多次提交拦截
                member:'',
                memberList:[],
                loading:false,
                mrLock:false,
                idList:{},
            }
        },
        components: {
            entryDetial
        },
        methods: {
            ...mapMutations(["updateLoadingStatus"]),
            clear() {
                this.member = ''
                this.memberList = []
            },
            remoteMember(query) {
                this.loading = true;
                let params = {
                    mainTable: "crm_customer",
                    searchField: "name",
                    joinField: "id",
                    searchFieldParam: query,
                    searchField1: "type",
                    searchFieldParam1: '1',
                    field1:"star_phone",
                    field2:"en_name"
                };
                sysCommonSql
                .querySingleTableData(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.memberList = res.data.data;
                        if(this.$route.query.name){
                            this.member = this.$route.query.id
                            this.getForm(this.$route.query.id)
                        }
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.loading = false;
                });
            },
            showModal(data){
                this.idList = data
                this.mrLock = true
                // this.getBuildTree()//获取所有标签
                // this.getReferralList()//获取学校年级，学校类型
                if(this.$route.query.name){
                    this.remoteMember(this.$route.query.name)
                }
            },
            getForm(id) {
                if(this.member){
                    this.$nextTick(()=>{
                        this.$refs.entryDetialObj.getFormFn(id)
                    })
                }
            },
            handleSubmit () {
                // console.log(this.member)
                if(this.member){
                    if(this.isActioning){ //多次提交拦截
                        return
                    }
                    this.isActioning = true
                    this.updateLoadingStatus({ isLoading: true });
                    let param = {
                        "isMemberEnroll":"1",
                        "id":this.member,
                        "activityId":this.idList.activityId?this.idList.activityId :'',
                        "qrId":this.idList.qrId?this.idList.qrId :'',
                        "channelId":""
                    }
                    crmCustomer.saveEnrollCustomer(param)
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            this.$Message.success(this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_memberregistration_731'))
                            this.mrLock = false
                            this.memberList = []
                            this.member = ''
                            this.$emit('refresh')
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {
                        this.updateLoadingStatus({ isLoading: false });
                        setTimeout(()=>{
                            //多次提交拦截
                            this.isActioning = false
                        },200)
                    });
                }
            },
            cancel () {
                this.mrLock = false
                this.member = ''
                this.memberList=[]
            }
        },
    }
</script>
