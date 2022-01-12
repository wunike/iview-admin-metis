    <style lang="less">
.detial-info-box1 {
    width: 100%;
    // display:flex;
    .dib-items {
        // width: 33.33%;
        display: flex;
        // flex-direction: row;
        // justify-content: flex-start;
        padding-bottom:16px;
        margin-left:20px;
        span {
            display: inline-block;
            // width: 130px;
            font-size: 14px;
            font-weight: normal;
            text-align: right;
            color: rgba(153, 153, 153, 1);
        }
        .editObjData{
            font-size:14px;
            padding-left:6px;
        }
    }
}
</style>
<template>
    <Modal v-model="datailModal" :loading="addModalLoading" :title="$t('modules_spoc_sign_web_src_views_expiredcontract_components_htconfirmapplydetail_6530')" width=800 :mask-closable="false"  @on-cancel="saveCancel">
            <div class="chooseOne detial-info-box1">
                  <Row>
                    <Col span="8">
                        <div class="dib-items">
                            <span>{{$t('modules_spoc_sign_web_src_views_expiredcontract_components_htconfirmapplydetail_6531')}}</span>
                            <div class="editObjData">{{editObj.studentName}}</div>
                        </div>
                    </Col>
                    <Col span="8">
                        <div class="dib-items">
                            <span>{{$t('views_room_classroom_571')}}</span>
                            <div class="editObjData">{{editObj.officeName}}</div>
                        </div>
                    </Col>
                    <Col span="8">
                        <div class="dib-items">
                            <span>{{$t('modules_spoc_sign_web_src_views_expiredcontract_components_htconfirmapplydetail_6533')}}</span>
                            <div class="editObjData">{{editObj.isExpiredConfirm}}</div>
                        </div>
                    </Col>
                </Row>
                  <!-- <Row>
                </Row> -->
                  <Row>
                    <Col span="8">
                        <div class="dib-items">
                            <span>{{$t('modules_spoc_sign_web_src_views_expiredcontract_components_htconfirmapplydetail_6534')}}</span>
                            <div class="editObjData">{{editObj.courseName}}</div>
                        </div>
                    </Col>
                    <Col span="8">
                        <div class="dib-items">
                            <span>{{$t('modules_spoc_sign_web_src_views_expiredcontract_components_htconfirmapplydetail_6535')}}</span>
                            <div class="editObjData">{{editObj.courseTypeName}}</div>
                        </div>
                    </Col>
                    <Col span="8">
                        <div class="dib-items">
                            <span>{{$t('modules_spoc_sign_web_src_views_expiredcontract_components_htconfirmapplydetail_6536')}}</span>
                            <div class="editObjData">{{editObj.leftLeaveNum}}</div>
                        </div>
                    </Col>
                </Row>
                  <Row>
                    <Col span="8">
                        <div class="dib-items">
                            <span>{{$t('modules_spoc_sign_web_src_views_expiredcontract_components_htconfirmapplydetail_6537')}}</span>
                            <div class="editObjData">{{editObj.expiredDate}}</div>
                        </div>
                    </Col>
                    <Col span="8">
                        <div class="dib-items">
                            <span>{{$t('modules_spoc_sign_web_src_views_expiredcontract_components_htconfirmapplydetail_6538')}}</span>

                            <div class="editObjData">{{editObj.expiredConfirmByName}}</div>
                        </div>
                    </Col>
                   <!-- <Col span="8">
                        <div class="dib-items">
                            <span>{{$t('modules_spoc_sign_web_src_views_expiredcontract_components_htconfirmapplydetail_6539')}}</span>
                            <div class="editObjData">{{editObj.leftCourseHour}}</div>
                        </div>
                    </Col> -->
                    <Col span="8">
                        <div class="dib-items" style="padding-bottom:0">
                            <span>{{$t('modules_spoc_sign_web_src_views_expiredcontract_components_htconfirmapplydetail_6540')}}</span>
                            
                            <div class="editObjData">{{editObj.expiredConfirmTime}}</div>
                        </div>
                    </Col>
                </Row>
                  <Row>
                    <Col span="8">
                        <div class="dib-items" style="padding-bottom:0">
                            <span>{{$t('modules_spoc_sign_web_src_views_expiredcontract_components_htconfirmapplydetail_65381')}}</span>
                            <div class="editObjData">{{editObj.confirmCourseHour}}</div>
                        </div>
                    </Col>
                    <Col span="8">
                        <div class="dib-items" style="padding-bottom:0">
                            <span>{{$t('modules_spoc_sign_web_src_views_expiredcontract_components_htconfirmapplydetail_65382')}}</span>
                            <div class="editObjData">{{editObj.confirmCoursePresentHour}}</div>
                        </div>
                    </Col>
                    <Col span="8">
                        <div class="dib-items" style="padding-bottom:0">
                            <span>{{$t('modules_spoc_sign_web_src_views_expiredcontract_components_htconfirmapplydetail_65383')}}</span>
                            <div class="editObjData">{{editObj.confirmCoursePrice}}</div>
                        </div>
                    </Col>
                   <!--  <Col span="8">
                        <div class="dib-items" style="padding-bottom:0">
                            <span>{{$t('modules_spoc_sign_web_src_views_expiredcontract_components_htconfirmapplydetail_6541')}}</span>
                            <div class="editObjData">{{(Math.floor(editObj.validDate/30)>0?Math.floor(editObj.validDate/30)+$t('message_socket_302'):'')+(editObj.validDate%30>0?editObj.validDate%30+$t('message_socket_304'):'')}}</div>
                        </div>
                    </Col>
                    <Col span="8">
                        <div class="dib-items" style="padding-bottom:0">
                            <span>{{$t('modules_spoc_sign_web_src_views_expiredcontract_components_htconfirmapplydetail_6544')}}</span>
                            <div class="editObjData">{{editObj.validApplyNum}}</div>
                        </div>
                    </Col> -->
                </Row>
            </div>
            <div slot="footer" v-if="type=='sure'">
                <Button @click="saveCancel">{{$t('classroom_allscore_53')}}</Button>
                <Button type="primary" @click="saveOk">{{$t('modules_spoc_sign_web_src_views_expiredcontract_components_expiredcontrtactpop_6529')}}</Button>
            </div>
            <div slot="footer" v-else-if="type=='detail'">
                <Button @click="saveCancel">{{$t('classroom_exchange_105')}}</Button>
            </div>
		</Modal>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import valid, { errors, common ,htConfirmApply} from "../../../libs/request";
export default {
    components: {
    },
    data() {
        return {
            type:'',
            datailModal:false,
            addModalLoading:false,
            editObj: {
                officeId: "",
                studentId: "",
                num: "",
                remarks: "",
                courseId: "",
                courseName: "",
                courseType: "",
                studentCourseId: "",
                ctId: ""
            }
        };
    },
    mounted() {
    },
    /*  props: {
        detailId: {
            type: String,
            default: ''
        },
    }, */
    computed: {
        ...mapState(["app"])
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        showTips(id,type){
            this.type=type;
            this.datailModal=true;
            this.htConfirmApplyForm(id);
        },
        closeTips(id,type){
            this.datailModal=false;
        },
        saveOk() {
            this.$emit("htConfirmApplyConfirm",this.editObj.id, this.editObj.confirmCoursePrice, this.editObj.confirmCourseHour);
            // this.htConfirmApplyConfirm();
			},
			saveCancel() {
              	// this.addModalLoading = false
                this.datailModal = false
                // setTimeout(() => {
                //     this.addModalLoading = true
                // }, 0);
			},
        //请假详情接口
        htConfirmApplyForm(id,type) {
            this.updateLoadingStatus({ isLoading: true });
            let obj = {
                id
            };
            htConfirmApply
                .form(obj)
                .then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.editObj = res.data.data;
                        //  for(let key  in  this.editObj){
                        //      if(!this.editObj[key]){
                        //         this.editObj[key]='/'
                        //      }
                        //     }
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
