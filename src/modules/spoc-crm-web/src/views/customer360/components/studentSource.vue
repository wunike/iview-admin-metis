<style lang="less">
.student-source-container,
.edit-cources {
    position: relative;
    padding: 15px 0 17px;min-height: 100%;
    background: #fff;
    .clear {
        zoom: 1;
        &::before,
        &::after {
            content: "";
            display: block;
            clear: both;
            height: 0;
            line-height: 0;
            font-size: 0;
        }
    }
    .source-lists {
        padding-bottom: 2px;
        padding-left: 18px;
        .clear();
    }
    .source-item {
        margin-bottom:8px;
        @left: 48px + 90px;
        @h: 14px + 18px;
        position: relative;
        float: left;
        min-height: @h;
        line-height: 22px;
        padding: 5px 12px 5px @left;
        width: 50%;
        font-size: 14px;
        & > span {
            position: absolute;
            left: 0;
            top: 5px;
            width: @left;
            color: #999;
            text-align: right;
        }
    }
    .title {
        @h: 36px;
        .clear;
        .h3 {
            float: left;
            width: 123px;
            font-size: 14px;
            font-weight: bold;
            text-align: right;
        }
        .null,
        .h3 {
            height: @h;
            line-height: @h;
        }
        button {
            margin-left: 40px;
            width: 52px;
            height: 24px;
            padding: 0;
        }
        & > div {
            float: left;
        }
    }
    .edit {
        position: absolute;
        left: 48px + 90px;
        top: 0;
        button {
            margin-left: 10px;
        }
    }
}
</style>
    
<template>
    <div class="student-source-container">
        <!-- <div class="source-lists">
            <div class="source-item">
                <span>{{$t('modules_spoc_crm_web_src_views_customer360_components_studentsource_1006')}}</span>
                <div>{{getDetailObj.createDate}}</div>
            </div>
            <div class="source-item">
                <span>{{$t('modules_spoc_crm_web_src_views_customer360_components_studentsource_1007')}}</span>
                <div>{{getDetailObj.allocTime}}</div>
            </div>
            <div class="source-item">
                <span>{{$t('modules_spoc_crm_web_src_views_customer360_components_studentsource_1008')}}</span>
                <div>{{getDetailObj.sourceList[0]}}</div>
            </div>
            <div class="source-item">
                <span>{{$t('modules_spoc_crm_web_src_views_customer360_components_studentsource_1009')}}</span>
                <div>{{getDetailObj.sourceList[1]}}</div>
            </div>
            <div class="source-item">
                <span>{{$t('modules_spoc_crm_web_src_views_customer360_components_studentsource_1010')}}</span>
                <div>{{getDetailObj.sourceList[2]}}</div>
            </div>
            <div class="source-item" style="width: 100%;">
                <span>{{$t('modules_spoc_crm_web_src_views_customer360_components_studentsource_1011')}}</span>
                <div>{{getDetailObj.remarks}}</div>
            </div>
        </div>
        <div class="title">
            <span class="h3">{{$t('modules_spoc_crm_web_src_views_customer360_components_studentsource_1012')}}</span>
            <span class="null" v-if="!getDetailObj.actName&&!getDetailObj.actBeginDate&&!getDetailObj.actPromoter">{{$t('modules_spoc_crm_web_src_views_customer360_components_studentsource_1013')}}</span>
        </div>
        <div class="source-lists" v-if="getDetailObj.actName||getDetailObj.actBeginDate||getDetailObj.actPromoter">
            <div class="source-item">
                <span>{{$t('modules_spoc_crm_web_src_views_customer360_components_studentsource_1014')}}</span>
                <div>{{getDetailObj.actName}}</div>
            </div>
            <div class="source-item">
                <span>{{$t('modules_spoc_crm_web_src_views_customer360_components_studentsource_1015')}}</span>
                <div v-show="getDetailObj.actBeginDate">{{getDetailObj.actBeginDate+"-"+getDetailObj.actEndDate}}</div>
            </div>
            <div class="source-item">
                <span>Promoter：</span>
                <div>{{getDetailObj.actPromoter}}</div>
            </div>
        </div> -->
        <div class="title">
            <span class="h3">{{$t('modules_spoc_crm_web_src_views_customer360_components_studentsource_1016')}}</span>
            <div style="height:36px;display:flex;align-items:center">
                <span class="null" v-if="!getDetailObj.referralId&&isNotEdit">无</span>
                <Button @click="showRecommender" v-if="isNotEdit && myButtonPrem.indexOf('editcusNab') > -1">编辑</Button>
            </div>
        </div>
        <div class="source-lists" v-if="getDetailObj.referralId&&isNotEdit">
            <div class="source-item">
                <span>{{$t('modules_spoc_crm_web_src_views_customer360_components_studentsource_1018')}}</span>
                <div>{{getDetailObj.referralTypeLabel}}</div>
            </div>
            <div class="source-item">
                <span>{{$t('modules_spoc_crm_web_src_views_customer360_components_studentsource_1019')}}</span>
                <div>{{getDetailObj.referralName}}</div>
            </div>
            <div class="source-item">
                <span>{{$t('modules_spoc_crm_web_src_views_customer360_components_studentsource_1020')}}</span>
                <div>{{getDetailObj.referralPhone}}</div>
            </div>
        </div>
        <div class="source-lists" v-if="!isNotEdit">
            <Form ref="formValidateRef" :model="studData" :rules="studRule" :label-width="110">
                <Row>
                    <Col span="10">
                        <FormItem
                            prop="referral.referralType"
                            :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentsource_1021')"
                            :rules="{required: true, message: $t('modules_spoc_crm_web_src_modules_resourceentrymodal copy_529'), trigger: 'change'}"
                        >
                            <Select
                                transfer
                                v-model="studData.referral.referralType"
                                :placeholder="$t('modules_spoc_crm_web_src_modules_resourceentrymodal copy_507')"
                                @on-change="referralTypeChange"
                            >
                                <Option
                                    v-for="item in referralList"
                                    :value="item.value"
                                    :key="item.is"
                                >{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem
                            prop="referral.referraler"
                            :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentsource_1024')"
                            :rules="{required: true, message: $t('modules_spoc_crm_web_src_modules_resourceentrymodal copy_530'), trigger: 'change'}"
                        >
                       <!--  @on-query-change="queryChange" -->
                            <Select
                                ref="selectRef"
                                v-model="studData.referral.referraler"
                                filterable
                                remote
                                :remote-method="remoteReferraler"
                                :loading="referralLoading"
                                @on-change="referralerChange"
                            >
                                <Option
                                    v-for="item in referralerList"
                                    :value="item.id"
                                    :key="item.id"
                                    :label="item.name"
                                >
                                    <span>{{item.name}}</span>
                                    <span style="float:right;color:#ccc">{{item.phone}}</span>
                                </Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" justify="end">
                    <Col span="6" v-if="!isNotEdit">
                        <Button style="margin-right: 8px" @click="cancelFn">{{$t('classroom_allscore_53')}}</Button>
                        <Button type="primary" @click="makeSureFn">{{$t('courselist_compontents_servicecontent_215')}}</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    </div>
</template>

<script>
import valid, {
    errors,
    sysCommonSql,
    sysDict,
    crmCustomerDetail
} from "../../../libs/request";
import { mapMutations, mapState } from "vuex";
import { waitUntil } from "@public/libs/util";
export default {
    name: "studentSource",
    components: {},
    props: {
        id: {
            type: String,
            required: true
        }
    },
    watch: {
        id: function(newVal, oldVal) {
            // console.log(newVal);
			if (this.$route.name == 'crm.customer360') {
				this.getDetailDataFn();
				this.getReferralList();
			}
        }
    },
    data() {
        return {
            // setLabel: "sssssss",
            isNotEdit: true,
            referralList: [],
            referralLoading: false,
            referralerList: [],
            getDetailObj: { sourceList: [] },
            studData: {
                referral: {
                    referralType: "",
                    referraler: ""
                }
            },
            referralerPhone: "",
            referralerName: "",
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
        this.getDetailDataFn();
        this.getReferralList();
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        makeSureFn() {
            this.$refs.formValidateRef.validate(validRes => {
                let arr = this.referralerList.filter(item => {
                    return item.id == this.studData.referral.referraler;
                });
                this.referralerPhone = arr[0].phone;
                this.referralerName = arr[0].name;
                if (validRes) {
                    this.updateLoadingStatus({ isLoading: true });
                    let params = {
                        referralType: this.studData.referral.referralType,
                        referraler: this.studData.referral.referraler,
                        referralerPhone: this.referralerPhone,
                        referralerName: this.referralerName,
                        cusId: this.getDetailObj.id
                    };
                    crmCustomerDetail
                        .saveReferral(params)
                        .then(valid.call(this))
                        .then(res => {
                            if (res.ok) {
                                this.$Message.success(this.$t('modules_spoc_crm_web_src_views_customer360_components_studentsource_1028'));
                                this.$refs.formValidateRef.resetFields();
                                this.isNotEdit = true;
                                this.getDetailDataFn();
                            }
                        })
                        .catch(errors.call(this))
                        .finally(() => {
                            this.updateLoadingStatus({ isLoading: false });
                        });
                } else {
                    this.$Message.error(this.$t('modules_spoc_crm_web_src_views_customer360_components_studentsource_1029'));
                    this.updateLoadingStatus({ isLoading: false });
                }
            });
        },
        cancelFn() {
            this.$refs.formValidateRef.resetFields();
            this.isNotEdit = true;
        },
        getReferralList() {
            let params = {
                types: "referral referral"
            };
            sysDict
                .batchListData(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.referralList = res.data.data["referral referral"];
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },

        remoteReferraler(query) {
            if (this.referralLoading) {
                return;
            }
            if (query) {
                let _query = ''
                if(this.referralerList){
                    this.referralerList.forEach(item=>{
                        if(item.id == this.studData.referral.referraler){
                            _query = item.name
                        }
                    })
                }
                if(_query != query){ // 防止选择数据的时候触发了搜索
                    this.referralerSearch(query);
                }
            }
        },
        referralerSearch(query) {
            if(this.referralLoading){
                return 
            }
            this.referralLoading = true
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
                        if (this.getDetailObj.referral) {
                            this.studData.referral.referraler = this.getDetailObj.referral;
                        }
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    setTimeout(() => {
                        this.referralLoading = false;
                    }, 200);
                });
        },
        showRecommender() {
            this.isNotEdit = false;
            this.studData.referral.referralType = this.getDetailObj.referralTypeVal;
            if (this.getDetailObj.referralName) {
                this.referralLoading = false;
                this.remoteReferraler(this.getDetailObj.referralName);
            }else{
                this.referralerList =[]
            }
        },
        referralTypeChange() {
            this.$refs.formValidateRef.validateField("referral.referralType");
            this.studData.referral.referraler='';
            this.referralerList=[];
        },
        referralerChange(val) {
            this.$refs.formValidateRef.validateField("referral.referraler");
            // this.referralLoading = true;
        },
        getDetailDataFn() {
            this.updateLoadingStatus({ isLoading: true });
            let param = {
                id: this.id
            };
            crmCustomerDetail
                .createData(param)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.getDetailObj = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        }
    }
};
</script>


