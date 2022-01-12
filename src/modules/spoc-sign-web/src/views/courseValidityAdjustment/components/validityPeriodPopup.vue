<style lang="less">
    .validity-period{
        .flex-row{
            display: flex;
            flex-direction: row;
        }
        .ivu-modal-footer .ivu-btn-text{
            border:1px solid rgb(220, 222, 226);
        }
        .ivu-modal-footer .ivu-btn-text:hover{
            border:1px solid rgb(220, 222, 226);
        }

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
        .ivu-input{
            font-size:14px!important;
        }
        .ivu-modal-footer{
            padding:10px 24px!important;
        }
        .turn-box{
            padding-right:28px;
            .formValidOut{
                 .ivu-form-item-label{
                     color:#999;
                     font-size:14px;
                 }
            }
            @w400:400px;
            @h32:32px;
            .cp-course-item{
                height:400px;
                overflow: visible;
                position: relative;
                border:1px solid #E6E7EB;
                border-radius:4px;
                box-sizing: border-box;
                .cp-course-ul{
                    height:399px;
                    background: #fff;
                    overflow-y: scroll;
                    border-bottom:1px solid #E6E7EB;
                    .cp-course-li{
                        border-bottom:1px solid #E6E7EB;
                        .flex-row;
                        justify-content: flex-start;
                        align-items: flex-start;
                        height:180px;
                        width:100%;
                        &:nth-last-of-type(1){
                            border-bottom:none;
                        }
                    }
                    .checkes{
                        .flex-row;
                        justify-content: center;
                        align-items: center;
                        width:98px;
                        height:100%;
                    }
                    .ul-items{
                        width:302px;
                        div{
                            width:288px;
                            margin-top:12px;
                            font-size:14px;
                            span{
                                font-size:14px;
                                color:#495060;
                            }
                        }
                        .ul-items-s{
                            margin-top:10px;
                            padding-top:6px;
                            margin-bottom:10px;
                            border-top:1px dashed #E6E7EB;
                        }
                    }

                }
                .cp-course-item-b{
                    height:39px;
                    background: #fff;
                    padding-right:8px;
                    padding-top:8px;
                    padding-left:15px;
                    font-size:14px;
                    overflow: visible;

                    a{
                        cursor: default;
                    }
                    .left{
                        float:left;
                    }
                    .right{
                        float:right;
                    }
                }
            }
        }
    }


</style>

<template>
    <div class="turn-center-container">
        <Modal
                class="validity-period"
                width="1200"
                v-model="validityPeriodPopup"
                :mask-closable="false"
                @on-cancel="cancel"
                :title="titles">
            <div class="turn-box">
                 <Form ref="formRef" :model="formObj" class="formValidOut" :label-width="110">
                    <FormItem :label="$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_4998')" class="w50" prop="code"  :rules="{required: true, message: $t('modules_spoc_sign_web_src_views_coursevalidityadjustment_components_validityperiodpopup_6073'), trigger: 'change'}">
                        <Input :placeholder="$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_4999')" icon="ios-search" 
                         @on-click="search" v-model="formObj.code" class="w250p" />
                    </FormItem>
                    <FormItem :label="$t('modules_spoc_jw_web_src_views_classmanage_addstudent_addstudent_2414')" class="w50" prop="course"  :rules="{required: true, message: $t('modules_spoc_sign_web_src_views_coursevalidityadjustment_components_validityperiodpopup_6073'), trigger: 'change'}">
                         <chooseCourse ref="chooseCourseRef"></chooseCourse>
                         <chooseCourse ref="chooseCourseRef"></chooseCourse>
                    </FormItem>
                     <FormItem v-if="status" :label="$t('modules_spoc_sign_web_src_views_coursevalidityadjustment_components_validityperiodpopup_6076')" class="w50" prop="endDate"  :rules="{required: true, message: $t('modules_spoc_sign_web_src_views_coursevalidityadjustment_components_validityperiodpopup_6073'), trigger: 'change'}">
                         <DatePicker v-model="formObj.endDate" type="date" :placeholder="$t('mycourse_mycourse_360')" style="width: 400px;"></DatePicker> <span style="color:#999;font-size:14px;margin-left:10px">{{$t('modules_spoc_crm_web_src_views_customer360_components_flowup_796')}}<strong style='color:#44BCB7'>{{stopTime}}</strong>{{$t('message_socket_304')}}</span>  
                    </FormItem>
                     <FormItem v-else :label="$t('modules_spoc_sign_web_src_views_coursevalidityadjustment_components_validityperiodpopup_6080')" class="w50" prop="expressDate"  :rules="{required: true, message: $t('modules_spoc_sign_web_src_views_coursevalidityadjustment_components_validityperiodpopup_6073'), trigger: 'change'}">
                         <DatePicker v-model="formObj.expressDate" type="date" :placeholder="$t('mycourse_mycourse_360')" style="width: 400px;"></DatePicker> <span style="color:#999;font-size:14px;margin-left:10px">{{$t('modules_spoc_crm_web_src_views_customer360_components_flowup_796')}}<strong style='color:#44BCB7'>{{stopTime}}</strong>{{$t('message_socket_304')}}</span>  
                    </FormItem>
                     <FormItem  :label="$t('modules_spoc_jw_web_src_views_approval_jwapprovaldetial_2267')" class="w50" prop="infos"  :rules="{required: true, message: $t('modules_spoc_sign_web_src_views_coursevalidityadjustment_components_validityperiodpopup_6073'), trigger: 'change'}">
                         <Input v-model="formObj.infos"  :placeholder="$t('modules_spoc_core_web_src_views_schoolmanagement_index_263')"  type="textarea" :rows="4"  style="width: 100%" />
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button @click="cancel">{{$t('classroom_allscore_53')}}</Button>
                <Button type="primary" @click="submit">{{$t('courselist_compontents_servicecontent_214')}}</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
 import chooseCourse from "./chooseCourse.vue";
    /**
     **@date: 2019/5/30 10:51
     **@author: lizhi
     **@filename: validityPeriodPopup.vue
     * 课程有效期调整申请
     */
    export default {
        name: 'sign.validityPeriodPopup',
        props: {

        },
        components: {
            chooseCourse
        },
        data() {
            return {
                formObj:{
                 code:'',
                 course:'',
                 expressDate:'',
                 infos:'',
                },
                validityPeriodPopup:false,
                status:true,
                titles:'',
                turnStyle:this.$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_takecourse_58531'),
                cpList:[
                    {
                        checked:false,
                        className:'EE2',
                        buyTimes:30,
                        buyPrice:240.45,
                        remain:2,//剩余
                        outTimes:2,
                        outPrice:240.15,
                        price:5000,
                        favourable:1000,
                    },
                    {
                        checked:false,
                        className:'HGJKHJK',
                        buyTimes:100,
                        buyPrice:240.45,
                        remain:2,//剩余
                        outTimes:2,
                        outPrice:240.15,
                        price:5000,
                        favourable:1000,
                    },
                    {
                        checked:false,
                        className:'CXCXZ',
                        buyTimes:100,
                        buyPrice:50.45,
                        remain:2,//剩余
                        outTimes:2,
                        outPrice:50.15,
                        price:5000,
                        favourable:1000,
                    },
                ],
                dates:'',
                infos:'',
                stopTime:200,
            }
        },
        computed: {

        },

        created() {

        },

        mounted() {

        },

        methods: {
            showPop(key){
                this.validityPeriodPopup = true;
                
                if(key === 1){
                    this.titles = this.$t('modules_spoc_sign_web_src_views_coursevalidityadjustment_components_validityperiodpopup_6086')
                    this.status = true
                }else {
                    this.titles = this.$t('modules_spoc_sign_web_src_views_coursevalidityadjustment_components_validityperiodpopup_6087')
                    this.status = false
                }
            },
            cancel(){
                this.validityPeriodPopup = false
                this.dates = ''
                this.infos = ''
            },
            submit(){
                 this.$refs.formRef.validate(validRes => {
                    if (validRes) {
                    this.updateLoadingStatus({ isLoading: true });
                    // jxStudent
                    //     .saveBaseInfo(Obj)
                    //     .then(valid.call(this))
                    //     .then(res => {
                    //     if (res.ok) {
                    //         this.$Message.success(this.$t('courselist_compontents_modify_200'));
                    //         this.$emit("emitGetListData");
                    //         this.addModal = false;
                    //     }
                    //     })
                    //     .catch(errors.call(this))
                    //     .finally(() => {
                    //     this.updateLoadingStatus({ isLoading: false });
                    //     });
                    }
                });
            },
            search(){
                console.log(this.infos)
            },
        },
        watch: {

        },
    }
</script>
