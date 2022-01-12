<style lang="less">
@mainColor: #44bcb7;
.clear {
    zoom: 1;
    &::after,
    &::before {
        content: "";
        display: block;
        height: 0;
        line-height: 0;
        clear: both;
        font-size: 0;
    }
}
.left-banner-container {
    position: relative;
    .fl {
        float: left;
    }
    .fr {
        float: right;
    }
    .banner-top {
        position: relative;
        padding: 20px 0 18px 20px;
        background: #fff;
        .stutas {
            @h: 18px;
            position: absolute;
            left: 0;
            top: 16px;
            padding-left: 8px;
            height: @h;
            line-height: @h;
            color: #fff;
            i {
                position: absolute;
                z-index: 1;
                left: 0;
                top: 0;
                color: #f39945;
                font-size: 18px;
            }
            .txt {
                position: relative;
                z-index: 2;
                font-size: 10px;
                -webkit-transform-origin-x: 0;
                -webkit-transform: scale(0.833333333333333);
                display: inline-block;
            }
        }
        .photo {
            @w: 64px;
            height: @w;
            padding-left: 82px;
            span {
                float: left;
                width: @w;
                height: @w;
                border-radius: @w;
                line-height: @w;
                box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.25);
                background: #fff;
                text-align: center;
                i {
                    font-size: 37px;
                }
            }
            img {
                display: block;
                width: @w;
                height: @w;
                border-radius: @w;
            }
            & > i {
                float: left;
                margin-left: 6px;
                margin-top: 44px;
            }
        }
    }
    .banner-brief {
        position: relative;
        padding-top: 14px;
        text-align: center;
        padding-right: 12px;
        .name {
            @h: 28px;
            line-height: @h;
            font-size: 16px;
            font-weight: bold;
            span {
                font-size: 14px;
                font-weight: normal;
            }
            i {
                margin-left: 4px;
                cursor: pointer;
                color: #c4c6cf;
                &:active {
                    color: @mainColor;
                }
            }
        }
        .phone,
        .other {
            @h: 28px;
            // height: @h;
            line-height: @h;
            font-size: 14px;
        }
        .phone {
            span {
                cursor: pointer;
                &:hover {
                    color: @mainColor;
                }
            }
        }
        .other {
            margin-bottom: 8px;
            text-align: center;
            color: #999;
            & > span {
                margin-right: 8px;
                &:last-child{
                    margin-right: 0;
                }
            }
        }
    }
    .banner-tag {
        margin-bottom: -8px;
        padding-bottom: 1px;
        text-align: center;
        line-height: 0;
        ul {
            display: inline-block;
            .clear;
        }
        li {
            @h: 24px;
            float: left;
            padding: 0 12px;
            height: @h;
            line-height: @h;
            margin-right: 8px;
            margin-bottom: 8px;
            border-radius: 4px;
            font-size: 12px;
            background: #ebecf0;
        }
    }
    .student-lists {
        position: relative;
        margin-bottom: 8px;
        margin-top: 8px;
        padding-top: 12px;
        padding-left: 20px;
        background: #fff;
        p {
            @h: 36px;
            height: @h;
            line-height: @h;
            font-size: 14px;
        }
    }
    .photo-lists {
        ul {
            .clear;
        }
        li {
            @w: 24px;
            float: left;
            margin-bottom: 8px;
            margin-right: 6px;
            width: @w;
            height: @w;
            border-radius: @w;
            overflow: hidden;
            box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.25);
            cursor: pointer;
            span {
                display: block;
                width: 100%;
                height: 100%;
                line-height: @w;
                text-align: center;
            }
            img {
                display: block;
                width: 100%;
                height: 100%;
            }
            // &.active{
            //     @w: 28px;
            //     position: relative;top: -2px;
            //     width: @w;height: @w;border-radius: @w;
            //     box-shadow:0px 2px 6px 0px rgba(0,165,154,0.3);
            //     border:1px solid rgba(68,188,183,0.3);
            // }
        }
    }
    .banner-bottom {
        position: absolute;
        top: 90px;
        left: 0;
        right: 0;
        z-index: 9;
        padding-bottom: 18px;
        padding-top: 16px;
        background: #fff;
        text-align: center;
        box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
        .arrow {
            position: absolute;
            top: -15px;
            border: 8px solid transparent;
            border-bottom-color: #fff;
        }
        .banner-brief {
            padding: 0 16px;
        }
    }
    .link {
        @h: 42px;
        margin-top: 8px;
        // margin: 8px 0;
        height: @h;
        background: #fff;
        text-align: center;
        ul {
            display: flex;
        }
        li {
            position: relative;
            flex: 1;
            height: @h;
            line-height: @h;
            border-right: 1px solid #f0f2f5;
            cursor: pointer;
            font-size: 14px;
            color: #999;
            &:last-child {
                border-right: none;
            }
            &:hover {
                color: @mainColor;
            }
        }
        i {
            margin-right: 8px;
        }
    }
}
.duplicate-checking-modal {
    .top {
        height: 20px + 12px;
        line-height: 20px;
        font-size: 14px;
        span {
            color: #999;
        }
        div {
            float: left;
            padding-left: 40px;
            &:first-child {
                width: 435px;
            }
        }
    }
    .checkbox{
        padding-left: 40px;
        margin-bottom: 16px;
        font-size: 14px;
        & > span{
            color: #999;
        }
        .ivu-checkbox-wrapper{
            font-size: 14px;
        }
    }
}
</style>
    
<template>
    <div class="left-banner-container">
        <div class="banner-top">
            <div class="stutas" v-if="detailData.isEffective == '1'">
                <i class="iconfont icon-xingzhuangjiehe"></i>
                <span class="txt">{{$t('modules_spoc_crm_web_src_views_customer360_components_leftbanner_804')}}</span>
            </div>
            <div class="photo">
                <span>
                    <img :src="detailData.photo" alt v-if="detailData.photo" />
                    <i class="iconfont icon-rencai" v-else></i>
                </span>
                <i
                    class="iconfont icon-huiyuan"
                    :style="{color: detailData.type == '1' ? '#F8B62D' : '#C4C6CF'}"
                ></i>
            </div>
            <div class="banner-brief">
                <div class="name">
                    {{detailData.name}}({{detailData.code}})
                    <span v-if="detailData.enName">({{detailData.enName}})</span>
                </div>
                <div class="phone" v-if="detailData.phoneObj && detailData.phoneObj.starPhone">
                    <span @click="showPhoneList">{{detailData.phoneObj.starPhone}}</span>
                </div>
                <div class="other" style="margin-bottom: 0">
                    <span>{{$t('modules_spoc_crm_web_src_views_customer360_components_leftbanner_805')}} {{ detailData.genderLabel ? detailData.genderLabel : '-' }}</span>
                    <span>{{$t('modules_spoc_crm_web_src_views_customer360_components_leftbanner_806')}} {{ detailData.age ? detailData.age :'-' }} {{$t('modules_spoc_crm_web_src_views_customer360_components_leftbanner_807')}} <span v-if="detailData.birthday">({{detailData.birthday}})</span>
                    </span>
                </div>
                <div class="other">
                    <span>{{$t('modules_spoc_crm_web_src_views_customer360_components_leftbanner_808')}} {{ detailData.ownerOfficeName ? detailData.ownerOfficeName : '-' }}</span>
                </div>
                <div
                    class="banner-tag"
                    v-if="detailData.sourceList && detailData.sourceList.length"
                >
                    <ul>
                        <li
                            v-for="source in detailData.sourceList"
                            :key="source"
                            v-if="source"
                        >{{source}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div
            class="link"
            v-if="(myButtonPrem.indexOf('account') > -1 && detailData.stuId && detailData.stuOfficeId) || 
                (myButtonPrem.indexOf('ctListPage') > -1 && userInfo.tenant) || 
                myButtonPrem.indexOf('cusCheck') > -1" >
            <ul>
                <!-- 1 -->
                <li @click="showStudentAccont" v-if="myButtonPrem.indexOf('account') > -1 && detailData.stuId && detailData.stuOfficeId">
                    <i class="iconfont icon-leftbar-zhangwumingxi-icon"></i>
                    <span>{{$t('modules_spoc_crm_web_src_views_customer360_components_leftbanner_809')}}</span>
                </li>
                <li @click="toContractManage" v-if="myButtonPrem.indexOf('ctListPage') > -1 && (!isSimSign)">
                    <i class="iconfont icon-hetong3"></i>
                    <span>{{$t('views_approvalnotice_approvalset_addapproval_276')}}</span>
                </li>
                <li @click="seePactNow" v-if="myButtonPrem.indexOf('ctListPage') > -1 && isSimSign">
                    <i class="iconfont icon-hetong3"></i>
                    <span>合同</span>
                </li>
                
                <!-- <li @click="seePactNow" v-if="myButtonPrem.indexOf('ctListPage') > -1">
                    <i class="iconfont icon-hetong3"></i>
                    <span>合同</span>
                </li> -->
                <li @click="showdUplicateCheckingModal" v-if="myButtonPrem.indexOf('cusCheck') > -1">
                    <i class="iconfont icon-chaxundaochu-"></i>
                    <span>{{$t('modules_spoc_crm_web_src_views_customer360_components_leftbanner_811')}}</span>
                </li>
            </ul>
        </div>
        <div class="student-lists" v-if="detailData.joinList && detailData.joinList.length">
            <p>{{$t('modules_spoc_crm_web_src_views_customer360_components_leftbanner_812', [detailData.joinList && detailData.joinList.length ? detailData.joinList.length : 0])}}</p>
            <div class="photo-lists">
                <ul>
                    <li
                        v-for="(item, index) in detailData.joinList"
                        :key="index"
                        :class="{active: index == current}"
                        @click="changeStudentId(item)"
                        @mouseout="hideBannerBottom"
                        @mouseover="changeStudent(item, index)"
                    >
                        <span>
                            <img :src="item.photo" alt v-if="item.photo" />
                            <i class="iconfont icon-rencai" v-else></i>
                        </span>
                    </li>
                </ul>
            </div>
            <div class="banner-bottom" v-show="showBannerBottom">
                <div class="arrow" :style="{left: left}"></div>
                <div class="banner-brief">
                    <div class="name">
                        {{currentStudent.name}}
                        <span v-if="currentStudent.enName">({{currentStudent.enName}})</span>
                    </div>
                    <div
                        class="phone"
                        v-if="currentStudent.phoneObj && currentStudent.phoneObj.starPhone"
                    >{{currentStudent.phoneObj.starPhone}}</div>
                    <div class="other">
                        <span class="fl">{{$t('modules_spoc_crm_web_src_views_customer360_components_leftbanner_813', [currentStudent.genderLabel])}}</span>
                        <span class="fr">{{$t('modules_spoc_crm_web_src_views_customer360_components_leftbanner_814', [currentStudent.age,currentStudent.birthday])}}</span>
                    </div>
                    <div class="banner-tag">
                        <ul>
                            <li v-for="source in currentStudent.sourceList" :key="source">{{source}}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <Modal
            v-model="duplicateCheckingModal"
            class-name="duplicate-checking-modal"
            width="800"
            :title="$t('modules_spoc_crm_web_src_views_customer360_components_leftbanner_815')"
        >
            <div class="top">
                <div>
                    <span>{{$t('modules_spoc_crm_web_src_views_customer360_components_leftbanner_816')}}</span>
                    {{detailData.name}}
                </div>
                <div>
                    <span>{{$t('modules_spoc_crm_web_src_views_customer360_components_leftbanner_817')}}</span>
                    {{detailData.phoneObj && detailData.phoneObj.starPhone ? detailData.phoneObj.starPhone : ''}}
                </div>
            </div>
            <div class="checkbox">
                <span>{{$t('modules_spoc_crm_web_src_views_customer360_components_leftbanner_818')}}</span>
                <Checkbox v-model="params.name" true-value="1" false-value="0">{{$t('modules_spoc_crm_web_src_views_customer360_components_leftbanner_819')}}</Checkbox>
                <Checkbox v-model="params.phone" true-value="1" false-value="0">{{$t('modules_spoc_crm_web_src_views_customer360_components_leftbanner_820')}}</Checkbox>
                <Checkbox v-model="params.qq" true-value="1" false-value="0">{{$t('modules_spoc_crm_web_src_views_customer360_components_leftbanner_821')}}</Checkbox>
                <Checkbox v-model="params.wechat" true-value="1" false-value="0">{{$t('modules_spoc_crm_web_src_views_customer360_components_leftbanner_822')}}</Checkbox>
                <Button type="primary" @click="duplicateChecking" style="margin-left: 30px">{{$t('modules_rolepeople_210')}}</Button>
            </div>
            <div class="table">
                <Table :columns="columns" :data="duplicateCheckingLists" border></Table>
            </div>
        </Modal>
    </div>
</template>

<script>
/**
 ** @author: 曹见芳
 ** 客户360 - 左侧banner
 */
import valid, {
    errors,
    crmCustomerDetail,
    crmCustomer
} from "../../../libs/request";
import { mapMutations, mapState } from "vuex";
import { waitUntil } from "@public/libs/util";
export default {
    name: "leftBanner",
    props: {
        detailData: {
            type: Object,
            required: true
        },
        isSimSign: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            myButtonPrem: [],
            current: 0,
            duplicateCheckingModal: false,
            duplicateCheckingLists: [],
            columns: [
                {
                    title: this.$t('modules_spoc_crm_web_src_views_customer360_components_leftbanner_819'),
                    key: "name",
                    width: null,
                    resizable: true,
                    render: (h, params) => {
                        return h("div", params.row.name || "-");
                    }
                },
                {
                    title: this.$t('modules_spoc_crm_web_src_views_customer360_components_leftbanner_820'),
                    key: "phone",
                    width: null,
                    resizable: true,
                    render: (h, params) => {
                        let phone = "-";
                        if (params.row.phone && params.row.phone.starPhone) { phone = params.row.phone.starPhone; }
                        return h("div", phone);
                    }
                },
                {
                    title: this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_694'),
                    key: "createDate",
                    width: null,
                    resizable: true,
                    render: (h, params) => {
                        return h("div", params.row.createDate || "-");
                    }
                },
                {
                    title: this.$t('modules_spoc_crm_web_src_views_customer360_components_leftbanner_825'),
                    key: "ownerName",
                    width: null,
                    resizable: true,
                    render: (h, params) => {
                        return h("div", params.row.ownerName || "-");
                    }
                },
                {
                    title: this.$t('pushsettings_index_496'),
                    key: "statusLabel",
                    width: null,
                    resizable: true,
                    render: (h, params) => {
                        return h("div", params.row.statusLabel || "-");
                    }
                },
                {
                    title: this.$t('messagemanagement_index_352'),
                    key: "officeName",
                    width: null,
                    resizable: true,
                    render: (h, params) => {
                        return h("div", params.row.officeName || "-");
                    }
                }
            ],
            showBannerBottom: false,
            params: {
                name: '0',
                phone: '0',
                qq: '0',
                wechat: '0',
            }
        };
    },
    mounted() {
        waitUntil(
            () => {
                return (this.userInfo && this.buttonPerm && (JSON.stringify(this.buttonPerm) != "{}")) || false;
            },
            () => {
                this.myButtonPrem = this.buttonPerm['crm.customer360'] || [];
                console.log(this.myButtonPrem)
            }
        );
    },
    computed: {
        ...mapState(["buttonPerm", "userInfo"]),
        // myButtonPrem(){
        //     return this.buttonPerm['crm.customer360']
        // },
        currentStudent() {
            let obj = {};
            if (this.detailData.joinList && this.detailData.joinList.length) {
                obj = this.detailData.joinList[this.current];
            }
            return obj;
        },
        left() {
            return this.current * 30 + 24 + "px";
        }
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        changeStudent(student, index) {
            this.current = index;
            this.showBannerBottom = true;
        },
        hideBannerBottom() {
            this.showBannerBottom = false;
        },
        showdUplicateCheckingModal() {
            this.duplicateCheckingLists = [];
            for (const key in this.params) {
                if (this.params.hasOwnProperty(key)) {
                    this.params[key] = '0';
                }
            }
            this.duplicateCheckingModal = true;
        },
        duplicateChecking() {
            let num = 0;
            for (const key in this.params) {
                if (this.params.hasOwnProperty(key)) {
                    if(this.params[key] == '1') num++;
                }
            }
            if(num < 1) {
                this.$Message.error(this.$t('modules_spoc_crm_web_src_views_customer360_components_leftbanner_828'))
                return false;
            }
            let params = Object.assign({
                id: this.detailData.id
            }, this.params);
            this.updateLoadingStatus({ isLoading: true });
            crmCustomerDetail
                .cusCheckList(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let _arr = res.data.data;
                        if (_arr && _arr.length) {
                            this.duplicateCheckingLists = _arr;
                        } else {
                            this.duplicateCheckingLists = [];
                            this.$Message.success(
                                this.$t('modules_spoc_crm_web_src_views_customer360_components_leftbanner_829')
                            );
                        }
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        changeStudentId(item) {
            this.$router.push({
                name: "crm.customer360",
                query: {
                    id: item.id
                }
            });
        },
        showStudentAccont() {
            this.$emit("showStudentAccont");
        },
        toContractManage() {
            if(this.detailData.stuId) {
                this.$router.push({
                    name: "sign.contractManage",
                    params: {
                        studentId: this.detailData.stuId,
                        studentName: this.detailData.name
                    }
                });
            } else {
                this.$emit('openPact')
            }
        },
        showPhoneList() {
            // 解密手机号
            const old = this.detailData.phoneObj.starPhone;
            let params = {
                sorts: 0,
                id: this.detailData.id
            };
            crmCustomer
                .showPhoneList(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let _data = res.data.data[0];
                        this.detailData.phoneObj.starPhone = _data.phone;
                        setTimeout(() => {
                            this.detailData.phoneObj.starPhone =
                                _data.starPhone;
                        }, 1*60*60*1000);
                    }
                })
                .catch(errors.call(this));
        },
		seePactNow(){
            // this.$router.push({
            //     name: "sign.contractManage",
            //     params: {
            //         studentId: this.detailData.stuId,
            //         studentName: this.detailData.stuName ? this.detailData.stuName : this.detailData.name
            //     }
            // });
			this.$emit('seePactNow');
		}
    }
};
</script>


