    <style lang="less">
.detial-info-box1 {
    width: 100%;
    .dib-item {
        display: flex;
        padding-bottom:12px;
        span {
            display: inline-block;
            font-size: 14px;
            font-weight: normal;
            color: rgba(153, 153, 153, 1);
        }
    }
}
</style>
<template>
    <div class="chooseOne detial-info-box1">
        <Row>
            <Col span="24">
                <div class="dib-item">
                    <span>{{$t('portal_app_Centres')}}</span>
                    <div class="editObjData">{{editObj.officeName}}</div>
                </div>
            </Col>
            <Col span="24" style="margin-left:0px">
                <div class="dib-item">
                    <span>{{$t('modules_spoc_sign_web_src_modules_pactcard_4830')}}</span>
                    <div class="editObjData">{{editObj.ctNo}}</div>
                </div>
            </Col>
             <Col span="24" style="margin-left:0px">
                <div class="dib-item">
                    <span>{{$t('modules_spoc_sign_web_src_views_editleavenum_components_editdetail_6454')}}</span>
                    <div class="editObjData">{{$t('modules_spoc_sign_web_src_views_editleavenum_components_editdetail_6455', [editObj.num])}}</div>
                </div>
            </Col>
        </Row>
        <Row>
            <Col span="8">
                <div class="dib-item">
                    <span>{{$t('modules_spoc_jw_web_src_views_approval_jwapprovaldetial_2267')}}</span>
                    <div class="editObjData">{{editObj.remarks}}</div>
                </div>
            </Col>
        </Row>
    </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import valid, { errors, htLeaveApply, common ,htValidApply} from "../../../libs/request";
export default {
    components: {
    },
    data() {
        return {
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
    computed: {
        ...mapState(["app"])
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        //请假详情接口
        htLeaveApplyForm(id,type) {
            this.updateLoadingStatus({ isLoading: true });
            let obj = {
                id
            };
             /* type类型 : 0：延期；1：取消延期 */
            let typeRqquest;
            if(type=='leave'){
                typeRqquest=htLeaveApply;
            }
            else if(type=='vaild'){
                typeRqquest=htValidApply;
            }
            typeRqquest
                .form(obj)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.editObj = res.data.data;
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
