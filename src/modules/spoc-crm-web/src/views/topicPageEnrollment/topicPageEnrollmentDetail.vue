<style lang="less">
.pub {
    font-size: 14px;
    font-family: HiraginoSansGB;
    font-weight: normal;
    color: rgba(153, 153, 153, 1);
}
.mytable {
    width: 100%;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    padding: 0 16px;
    .subTypeNameStyle {
        margin-left: 11px;
        .ivu-table-cell {
            margin-left: 11px;
        }
    }
    .imgClass {
        canvas {
            border: 1px solid red;
            transform: scale(0.2, 0.2) translate(-72px, -72px);
        }
        img {
            width: 100%;
            height: 100%;
        }
    }
}
.QrCodeEnrollmentDetail {
    .QrCodeEnrollmentDetailTop {
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        display: flex;
        // 二维码样式
        .detailImgQr {
            padding: 30px 32px 0px;
            display: flex;
            flex-direction: column;
            margin-bottom: 15px;
            span {
                padding: 6px 12px;
                margin: 16px auto 0px;
                color: rgba(70, 188, 21, 1);
                background: rgba(228, 253, 218, 1);
                border-radius: 4px;
            }
            #detailImgQrdiv {
                cursor:pointer;
                img {
                    width: 80px;
                    height: 80px;
                }
            }
        }
        .detailInfo {
            display: flex;
            flex-grow: 1;
            flex-direction: column;
            padding: 20px 0px;
            position: relative;
            .detailInfoTop {
                display: flex;
                // align-items: center;
                // flex-wrap: wrap;
                justify-content: flex-start;
                .pub;
                .spanLabelTitle {
                    flex-shrink: 0;
                    /* 值越大，减小的越厉害。如果值为0，表示不减小。 */
                    display: flex;
                    align-items: center;
                    height: 30px;
                    margin-top: 4px;
                    // justify-content: flex-start;
                }
                .spanLabel {
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    justify-content: flex-start;
                    span {
                        font-size: 12px;
                        color: rgba(73, 80, 96, 1);
                        background: rgba(235, 236, 240, 1);
                        border-radius: 4px;
                        padding: 6px 12px;
                        margin-left: 8px;
                        margin-top: 4px;
                    }
                }
            }
            // 右侧三列样式
            .detailInfoBottom {
                display: flex;
                justify-content: space-between;
                > div {
                    width: 30%;
                    > div {
                        margin-top: 10px;
                        margin-bottom: 0px;
                        .pub;
                        > span {
                            color: #495060;
                            // font-weight: 600;
                        }
                        .QrNoClass {
                            transform: rotateX(180deg);
                            display: inline-block; //不是块级元素 不转呀
                            color: #44bcb7;
                            margin-left: 5px;
                            cursor: pointer;
                        }
                        .copyTipClass {
                            position: absolute;
                            top: 20px;
                            left: 10px;
                            width: 200px;
                            font-size: 12px;
                            opacity: 0;
                            color: #44bcb7;
                            transition: opacity 1s;
                        }
                    }
                }
            }
            .editor{
                position: absolute;
                top: 12px;
                right: 12px;
            }
        }
    }
    .QrCodeEnrollmentDetailButtom {
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        margin: 10px 0px;
        padding: 19px 32px;
        display: flex;
        &:nth-child(2) {
            justify-content: space-between;
        }
        &:nth-child(3) {
            justify-content: center;
        }
        > div {
            .pub;
            > span {
                color: #495060;
            }
        }
    }
}
//弹窗中的样式
.QrCodeEnrollmentDetailModal {
    .configStyle {
        > div {
            .pub;
            > span {
                color: #495060;
            }
        }
    }
    .posterView {
        position: relative;
        .posterLogo{
            position: absolute;
            background-size: cover;

            background-color: #FFFFFF;
        }
        .posterQRCode{
            position: absolute;
        }
    }
}
</style>
<template>
    <div class="QrCodeEnrollmentDetail">
        <div class="QrCodeEnrollmentDetailTop">
            <div class="detailImgQr">
                <div
                    @click="bigImgSrcFn(1)"
                    id="detailImgQrdiv"
                ></div>
                    <!-- :style="{filter:formObj.enable!='1'?'blur(2px)':''}" -->
                <span
                    v-if="formObj.enable"
                    :style="{color:formObj.enable!='1'?'#999':'',background:formObj.enable!='1'?'#EEE':''}"
                >{{formObj.enable=="1"?$t("scoretemplate_scoretemplate_559"):$t("scoretemplate_scoretemplate_558")}}</span>
            </div>
            <div class="detailInfo">
                <div class="detailInfoBottom">
                    <div>
                        <!-- <div>{{$t('modules_spoc_crm_web_src_views_qrcodeenrollment_qrcodeenrollmentdetail_1577')}}<span
                                id="QrTextId"
                                style="::selection{background:red;}"
                            >{{this.formObj.qrCode}}</span>
                            <span style="position:relative;">
                                <i class="iconfont icon-fuzhi QrNoClass" @click="QrNoCopyClick"></i>
                                <p class="copyTipClass" :style="{opacity:copyTip?1:0}">{{$t('modules_spoc_crm_web_src_views_qrcodeenrollment_qrcodeenrollmentdetail_1578')}}</p>
                            </span>
                        </div> -->
                        <div>{{$t('modules_spoc_portal_views_formview_components_propseitem_3623')}}：<span>{{formObj.title}}</span>
                        </div>
                        <div>{{$t('modules_spoc_crm_web_src_views_qrcodeenrollment_qrcodeenrollmentdetail_1579')}}<span>{{formObj.created}}</span>
                        </div>
                        <div>{{$t('modules_spoc_crm_web_src_views_qrcodeenrollment_qrcodeenrollmentdetail_1580')}}<span>{{formObj.ownerName}}</span>
                        </div>
                    </div>
                    <!-- <div>
                        <div>{{$t('modules_spoc_crm_web_src_views_qrcodeenrollment_qrcodeenrollmentdetail_1581')}}<span>{{formObj.officeName}}</span>
                        </div>
                        <div>{{$t('modules_spoc_crm_web_src_views_qrcodeenrollment_qrcodeenrollmentdetail_1582')}}<span>{{formObj.ownerOfficeName}}</span>
                        </div>
                        <div>{{$t('modules_spoc_crm_web_src_views_qrcodeenrollment_qrcodeenrollmentdetail_1583')}}<span>{{formObj.ownerName}}</span>
                        </div>
                    </div> -->
                    <div>
                        <div>{{$t('modules_spoc_crm_web_src_views_qrcodeenrollment_qrcodeenrollmentdetail_1584')}}<span>{{formObj.belongOfficeName}}</span>
                        </div>
                        <div>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_entrydetial_712')}}<span>{{formObj.sourceName}}</span>
                        </div>
                        <!-- <div>{{$t('modules_spoc_crm_web_src_views_qrcodeenrollment_qrcodeenrollmentdetail_1586')}}<span>{{formObj.activityName}}</span>
                        </div> -->
                    </div>
                </div>
                <!-- <Button class="editor" @click="editor">编辑</Button> -->
            </div>
        </div>
        <div class="QrCodeEnrollmentDetailButtom">
            <!-- <div>{{$t('modules_spoc_crm_web_src_views_qrcodeenrollment_qrcodeenrollmentdetail_1587')}}<span>{{formObj.channelNum}}</span>
            </div> -->
            <!-- <div>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_660')}}<span>{{formObj.crmH5StaticVO.visits}}</span>
            </div> -->
            <div>
                Leads：
                <span>{{formObj.crmH5StaticVO.leads}}</span>
            </div>
            <div>
                Vleads：
                <span>{{formObj.crmH5StaticVO.vleads}}</span>
            </div>
            <div>
                APP：
                <span>{{formObj.crmH5StaticVO.app}}</span>
            </div>
            <div>
                OPP：
                <span>{{formObj.crmH5StaticVO.opp}}</span>
            </div>
            <div>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_661')}}<span>{{formObj.crmH5StaticVO.anew}}</span>
            </div>
        </div>
        <div class="QrCodeEnrollmentDetailButtom">
            <div style="width:24%;">{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_664')}}<span
                    style="color:#44BCB7"
                >{{!isNaN(formObj.crmH5StaticVO.appPercent)?formObj.crmH5StaticVO.appPercent*100+'%':''}}</span>
            </div>
            <div style="width:19%;">{{$t('modules_spoc_crm_web_src_views_qrcodeenrollment_qrcodeenrollmentdetail_1591')}}<span
                    style="color:#44BCB7"
                >{{!isNaN(formObj.crmH5StaticVO.oppPercent)?formObj.crmH5StaticVO.oppPercent*100+'%':''}}</span>
            </div>
            <div style="width:19%;">{{$t('modules_spoc_crm_web_src_views_qrcodeenrollment_qrcodeenrollmentdetail_1592')}}<span
                    style="color:#44BCB7"
                >{{!isNaN(formObj.crmH5StaticVO.newPercent)?formObj.crmH5StaticVO.newPercent*100+'%':''}}</span>
            </div>
        </div>
        <big-table
            v-if="defaultShowCol"
            class="mytable"
            :tableName="tableName"
            :tableData="tableData"
            :tableColumnArray="tableColumnArray"
            :defaultShowCol="defaultShowCol"
            :dataTotal="dataTotal"
            :btnList="btnList"
            :canChangeHeight="!ctNo"
            :isShowSelectTableColumn="false"
            :canSelection="false"
            @pageChange="pageChange"
            @changeTableType="changeTableType"
        ></big-table>
        <Modal
            v-model="modal1"
            :title="title"
            @on-ok="ok"
            width="600"
            :mask-closable="false"
            class-name="QrCodeEnrollmentDetailModal"
        >
            <div
                v-if="titleVal==1"
                style="width:100%;display:flex;justify-content:center;align-items:center"
            >
                <div>
                    <!-- <p
                        v-if="formObj.enable!='1'"
                        style="margin-bottom:25px;text-align:center;color:#999;font-size:16px;"
                    >{{$t('modules_spoc_crm_web_src_views_qrcodeenrollment_qrcodeenrollmentdetail_1593')}}</p>
                    <p
                        v-else
                        style="margin-bottom:25px;text-align:center;color:#999;font-size:16px;"
                    >{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_viewimg_742')}}</p> -->
                    <img
                        :src="imgSrc"
                        alt
                        width="200"
                    />
                        <!-- :style="{filter:formObj.enable!='1'?'blur(3px)':''}" -->
                </div>
            </div>
            <div
                v-if="titleVal==4"
                style="width:100%;display:flex;justify-content:center;align-items:center"
            >
                <div>
                    <p
                        v-if="curEnable!='1'||formObj.enable!='1'"
                        style="margin-bottom:25px;text-align:center;color:#999;font-size:16px;"
                    >{{$t('modules_spoc_crm_web_src_views_qrcodeenrollment_qrcodeenrollmentdetail_1593')}}</p>
                    <p
                        v-else
                        style="margin-bottom:25px;text-align:center;color:#999;font-size:16px;"
                    >{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_viewimg_742')}}</p>
                    <img
                        :src="imgSrc"
                        alt
                        width="200"
                    />
                        <!-- :style="{filter:curEnable!='1'||formObj.enable!='1'?'blur(3px)':''}" -->
                </div>
            </div>
            <div v-if="titleVal==2">
                <Form ref="formRef" :model="formValidate" :label-width="130">
                    <FormItem
                        :label="$t('memberlist_compontents_modify_240')"
                        prop="configName"
                        :rules="{required: true, message: $t('modules_spoc_crm_web_src_views_qrcodeenrollment_qrcodeenrollmentdetail_1596'), trigger: 'change'}"
                    >
                           <!--  remote
                            :loading="loadingconfigName"
                            :remote-method="remoteconfigName" -->
                        <Select
                            v-model="formValidate.configName"
                            :placeholder="$t('modules_spoc_crm_web_src_views_activityenrollment_components_memberregistration_728')"
                            style="width:306px"
                            clearable
                            filterable="true"
                            @on-change="configNameChange"
                        >
                            <Option
                                v-for="item in configNameList"
                                :label="item.name+'('+ (item.phone ? item.phone : '-') +')' "
                                :value="item.name"
                                :key="item.name"
                            >{{ item.name+'('+ (item.phone ? item.phone : '-') +')' }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem
                        :label="$t('modules_spoc_crm_web_src_views_qrcodeenrollment_qrcodeenrollmentdetail_1598')"
                        prop="configPhone"
                        style="margin-bottom:0px"
                        :rules="{required: false, message: $t('modules_spoc_crm_web_src_views_qrcodeenrollment_qrcodeenrollmentdetail_1599'), trigger: 'change'}"
                    >
                        <!-- :rules="{required: false, validator: validatePass, trigger: 'change'}" -->
                        <Input
                            disabled
                            :placeholder="$t('modules_spoc_crm_web_src_views_qrcodeenrollment_qrcodeenrollmentdetail_1600')"
                            v-model="formValidate.configPhone"
                            style="width:306px"
                        ></Input>
                    </FormItem>
                </Form>
            </div>
            <div v-if="titleVal==3">
                <Divider orientation="left" class="dividerOwn" style="margin-top:0">{{$t('modules_spoc_crm_web_src_views_qrcodeenrollment_qrcodeenrollmentdetail_1601')}}</Divider>
                <div
                    class="configStyle"
                    style="width:100%;display:flex;justify-content:space-around;align-items:center"
                >
                    <div style="margin-left:-70px">{{$t('memberlist_compontents_modify_240')}}<span>{{rowTableObj.name}}</span>
                    </div>
                    <div>{{$t('modules_spoc_crm_web_src_views_qrcodeenrollment_qrcodeenrollmentdetail_1598')}}<span>{{rowTableObj.phone?rowTableObj.phone:'--'}}</span>
                    </div>
                </div>
                <Divider orientation="left">{{$t('modules_spoc_crm_web_src_views_qrcodeenrollment_qrcodeenrollmentdetail_1602')}}</Divider>
                <div style="width:100%;display:flex;justify-content:center;align-items:center">
                    <img :src="imgSrc" alt width="200" />
                </div>
            </div>
            <div v-if="titleVal==5">
                <Divider orientation="left" class="dividerOwn" style="margin-top:0">{{$t('modules_spoc_crm_web_src_views_qrcodeenrollment_qrcodeenrollmentdetail_1601')}}</Divider>
                <div
                    class="configStyle"
                    style="width:100%;display:flex;justify-content:space-around;align-items:center"
                >
                    <div style="margin-left:-70px">{{$t('memberlist_compontents_modify_240')}}<span>{{rowTableObj.name}}</span>
                    </div>
                    <div>{{$t('modules_spoc_crm_web_src_views_qrcodeenrollment_qrcodeenrollmentdetail_1598')}}<span>{{rowTableObj.phone?rowTableObj.phone:'--'}}</span>
                    </div>
                </div>
                <Divider orientation="left">{{$t('modules_spoc_crm_web_src_views_qrcodeenrollment_qrcodeenrollmentdetail_1603')}}</Divider>
                <div style="width:100%;display:flex;justify-content:center;align-items:center">
                    <div
                        class="posterView"
                        id="posterViewdom"
                        :style="`width:320px;height:568px;display:flex;justify-content:center;align-items: center;background-image: url(${posterData.posterUrl});background-size: cover;background-repeat: no-repeat;`"
                    >
                        <div class="posterLogo" :style="{width:posterLogoWidth,height:posterLogoHeight,left:posterLogoLeft,top:posterLogoTop,'background-image':(posterData.logoUr?`url(${this.posterData.logoUr})`:'#ffffff'),'background-size': 'cover','background-repeat': 'no-repeat'}" v-if="posterData.posterUrl"></div>
                        <div class="posterQRCode detailPosterQrdiv" :style="{width:posterQRCodeWidth,height:posterQRCodeHeight,left:posterQRCodeLeft,top:posterQRCodeTop,'background':'#ffffff','background-size': 'cover','background-repeat': 'no-repeat'}" v-if="posterData.posterUrl"></div>
                    </div>
                </div>
            </div>
            <div slot="footer">
                <Button @click="cancelImg" v-if="titleVal==1||titleVal==4||titleVal==5">{{$t('courselist_compontents_servicecontent_216')}}</Button>
                <Button @click="cancelImg" v-if="titleVal==2||titleVal==3">{{$t('classroom_allscore_53')}}</Button>
                <Button @click="downloadposter" type="primary" v-if="titleVal==5">{{$t('classroom_allscore_54')}}</Button>
                <Button @click="OkBtn" v-if="titleVal==2||titleVal==3" type="primary">{{$t('classroom_allscore_54')}}</Button>
            </div>
        </Modal>
        <!-- http://localhost:8081/api/crm/a/ws/crm/crmQrcode/save -->
    </div>
</template>
<script>
import QRCode from "qrcodejs2";
import { waitUntil } from "@public/libs/util";
import { mapMutations, mapState } from "vuex";
import bigTable from "@public/modules/bigTable.vue";
import vSearchCollapse from "@public/modules/vSearchCollapse";
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import $config from '@/config'
import valid, {
    errors,
    crmQrcode,
    sysCommonSql,
    crmChannel,
    crmActivity,
    crmH5
} from "../../libs/request";
export default {
    name: 'crm.topicPageEnrollmentDetail',
    data() {
        let _this = this;
        return {
            // validatePass: (rule, value, callback) => {
            //     if (!value || value[0] === "") {
            //         callback();
            //     } else if (!/^1[3456789]\d{9}$/.test(value)) {
            //         callback(new Error("请输入11位有效手机号码"));
            //     } else {
            //         callback();
            //     }
            // },
            logoWidth:'',
            logoHight:'',
            findQrcodeDynamicLineBool: false,
            curEnable: false,
            activityId: "",
            enrollType: "",
            loadingconfigName: false,
            configNameList: [],
            formObj: { },
            rowTableObj: {},
            cols1: {
                true: [
                    // {
                    //     name: "channelCode",
                    //     title: this.$t('modules_spoc_core_web_src_views_announcement_index_107'),
                    //     selected: true,
                    //     required: false,
                    //     sort: 0,
                    //     noExport: true
                    // },
                    {
                        name: "name",
                        title: this.$t('modules_rolemanage_186'),
                        selected: true,
                        required: false,
                        sort: 0,
                        noExport: true
                    },
                    {
                        name: "phone",
                        title: this.$t('modules_usermanage_230'),
                        selected: true,
                        required: false,
                        sort: 1,
                        noExport: true
                    },
                    /*   {
                        name: "createByName",
                        title: "创建人",
                        selected: true,
                        required: false,
                        sort: 2,
                        noExport: true
                    },
                    {
                        name: "detailDate",
                        title: "创建时间",
                        selected: true,
                        required: false,
                        sort: 3,
                        noExport: true
                    }, */
                    {
                        name: "enableName",
                        title: "状态",
                        selected: true,
                        required: false,
                        sort: 4,
                        noExport: true
                    },
                    {
                        name: "qrId",
                        title: "专属二维码",
                        selected: true,
                        required: false,
                        sort: 4,
                        noExport: true
                    },
                    {
                        name: "visitNum",
                        title: "访问次数",
                        selected: true,
                        required: false,
                        sort: 4,
                        noExport: true
                    },
                    {
                        name: "leads",
                        title: "leads数",
                        selected: true,
                        required: false,
                        sort: 5,
                        noExport: true
                    },
                    {
                        name: "vleads",
                        title: "Vleads数",
                        selected: true,
                        required: false,
                        sort: 6,
                        noExport: true
                    },
                    {
                        name: "app",
                        title: "APP",
                        selected: true,
                        required: false,
                        sort: 7,
                        noExport: true
                    },
                    {
                        name: "appPercent",
                        title: "APP转化率",
                        selected: true,
                        required: false,
                        sort: 8,
                        noExport: true
                    },
                    {
                        name: "opp",
                        title: "OPP",
                        selected: true,
                        required: false,
                        sort: 9,
                        noExport: true
                    },
                    {
                        name: "oppPercent",
                        title: "OPP转化率",
                        selected: true,
                        required: false,
                        sort: 10,
                        noExport: true
                    },
                    {
                        name: "anew",
                        title: "New",
                        selected: true,
                        required: false,
                        sort: 11,
                        noExport: true
                    },
                    {
                        name: "newPercent",
                        title: "New转化率",
                        selected: true,
                        required: false,
                        sort: 12,
                        noExport: true
                    }
                ]
            },
            cols2: {
                true: [
                    {
                        name: "name",
                        title: "姓名",
                        selected: true,
                        required: false,
                        sort: 0,
                        noExport: true
                    },
                    {
                        name: "phone",
                        title: "手机号",
                        selected: true,
                        required: false,
                        sort: 1,
                        noExport: true
                    },
                    {
                        name: "createDate",
                        title: "录入时间",
                        selected: true,
                        required: false,
                        sort: 2,
                        noExport: true
                    },
                    {
                        name: "enrollTypeName",
                        title: "资源类型",
                        selected: true,
                        required: false,
                        sort: 3,
                        noExport: true
                    },
                    {
                        name: "activityName",
                        title: "来源活动",
                        selected: true,
                        required: false,
                        sort: 4,
                        noExport: true
                    },
                    {
                        name: "channelName",
                        title: "促销员",
                        selected: true,
                        required: false,
                        sort: 6,
                        noExport: true
                    },
                    {
                        name: "status",
                        title: "是否vleads",
                        selected: true,
                        required: false,
                        sort: 6,
                        noExport: true
                    },
                    {
                        name: "psaname",
                        title: "跟进PSA",
                        selected: true,
                        required: false,
                        sort: 7,
                        noExport: true
                    },
                    {
                        name: "customerStatus",
                        title: "跟踪状态",
                        selected: true,
                        required: false,
                        sort: 8,
                        noExport: true
                    },
                    {
                        name: "semData",
                        title: "Sem来源",
                        selected: true,
                        required: false,
                        sort: 9,
                        noExport: true
                    }
                ]
            },
            cols3: {
                true: [
                    {
                        name: "name",
                        title: "姓名",
                        selected: true,
                        required: false,
                        sort: 0,
                        noExport: true
                    },
                    {
                        name: "phone",
                        title: "手机号",
                        selected: true,
                        required: false,
                        sort: 1,
                        noExport: true
                    },
                    {
                        name: "registrantName",
                        title: "登记人",
                        selected: true,
                        required: false,
                        sort: 2,
                        noExport: true
                    },
                    {
                        name: "registrantTime",
                        title: "登记时间",
                        selected: true,
                        required: false,
                        sort: 3,
                        noExport: true
                    },
                    {
                        name: "psaname",
                        title: "跟进PSA",
                        selected: true,
                        required: false,
                        sort: 3,
                        noExport: true
                    },
                    {
                        name: "customerStatus",
                        title: "会员状态",
                        selected: true,
                        required: false,
                        sort: 4,
                        noExport: true
                    },
                    {
                        name: "semData",
                        title: "Sem来源",
                        selected: true,
                        required: false,
                        sort: 5,
                        noExport: true
                    }
                ]
            },
            titleVal: "",
            formValidate: {
                configName: "",
                configPhone: ""
            },
            posterData:{
                belongOfficeId: "",
                ownerOffice: "",
                ownerId: "",
                sourceArray:[],
                source: "",
                source1: "",
                source2: "",
                source3: "",
                tags: "",
                url: "",
                position: "0",
                fromData: [],
                title: "",
                logoUr: "",
                posterUrl:'',
                welcomeMsg:'',
                posterLogoPointXy:{
                    x:30,
                    y:34
                },
                posterQrCodePointXy:{
                    x:220,
                    y:480
                }
            },
            userId: "no",
            modal1: false,
            imgSrc: "",
            tableType: "2",
            btnList: [
                // {
                //     style: {},
                //     type: "",
                //     btnClick: this.addConfigPeople,
                //     text: "新增促销员"
                // }
            ],
            pageNo: 1,
            pageSize: this.$store.state.app.pageSizeGlobal,
            tableName: [
                {
                    name: "报名资源",
                    value: "2"
                },
                {
                    name: "报名会员",
                    value: "3"
                }
            ],
            defaultShowCol: null,
            dataTotal: 0,
            tableColumnArray: [],
            // tableColumnArray1: [
            //     {
            //         // title: "APP转化率",
            //         key: "appPercent",
            //         render: (h, params) => {
            //             return h("div", {}, params.row.appPercent * 100 + "%");
            //         }
            //     },
            //     {
            //         // title: "OPP转化率",
            //         key: "oppPercent",
            //         render: (h, params) => {
            //             return h("div", {}, params.row.oppPercent * 100 + "%");
            //         }
            //     },
            //     {
            //         // title: "New转化率",
            //         key: "newPercent",
            //         render: (h, params) => {
            //             return h("div", {}, params.row.newPercent * 100 + "%");
            //         }
            //     },
            //     {
            //         // title: "状态",
            //         key: "enableName",
            //         render: (h, params) => {
            //             let enableBool = this.formObj.enable;
            //             return h(
            //                 "div",
            //                 {},
            //                 enableBool == "1" ? params.row.enableName : "-"
            //             );
            //         }
            //     },
            //     {
            //         // title: "专属二维码",
            //         key: "qrId",
            //         render: (h, params) => {
            //             let indexImg = params.index;
            //             return h("div", [
            //                 h("div", {
            //                     style: {
            //                         cursor: "pointer",
            //                         width: "40px",
            //                         height: "40px"
            //                     },
            //                     attrs: {
            //                         class: "imgClass"
            //                     },
            //                     on: {
            //                         click: () => {
            //                             this.curEnable = params.row.enable;
            //                             this.bigImgSrcFn(4, indexImg);
            //                         }
            //                     }
            //                 })
            //             ]);
            //         }
            //     },
            //     {
            //         title: "操作",
            //         key: "doAction",
            //         width: 200,
            //         render: (h, params) => {
            //             let indexImg = params.index;
            //             let enableBool = this.formObj.enable;
            //             return enableBool == "1"
            //                 ? h("div", [
            //                       this.myButtonPrem.indexOf("editStatus") >= 0
            //                           ? h(
            //                                 "a",
            //                                 {
            //                                     props: {
            //                                         type: "text",
            //                                         size: "small"
            //                                     },
            //                                     style: {
            //                                         marginRight: "16px",
            //                                         color:
            //                                             params.row
            //                                                 .defaultChannel ==
            //                                             "1"
            //                                                 ? "#ccc"
            //                                                 : ""
            //                                     },
            //                                     on: {
            //                                         click: () => {
            //                                             if (
            //                                                 params.row
            //                                                     .defaultChannel !=
            //                                                     "1" &&
            //                                                 this.myButtonPrem.indexOf(
            //                                                     "channelEdit"
            //                                                 ) >= 0
            //                                             ) {
            //                                                 this.validFn(
            //                                                     params.row
            //                                                         .channelQrcodeRelId,
            //                                                     this.formObj.id,
            //                                                     params.row
            //                                                         .enable == 1
            //                                                         ? "0"
            //                                                         : "1",
            //                                                     params.row
            //                                                         .channelId
            //                                                 );
            //                                             }
            //                                         }
            //                                     }
            //                                 },
            //                                 params.row.enable == 1
            //                                     ? "设为无效"
            //                                     : "设为有效"
            //                             )
            //                           : "",
            //                       this.myButtonPrem.indexOf("downloadQRCode") >=
            //                       0
            //                           ? h(
            //                                 "a",
            //                                 {
            //                                     props: {
            //                                         type: "text",
            //                                         size: "small"
            //                                     },
            //                                     style: { marginRight: "16px" },
            //                                     on: {
            //                                         click: () => {
            //                                             if (
            //                                                 params.row.enable !=
            //                                                 "1"
            //                                             ) {
            //                                                 this.$Message.error(
            //                                                     "二维码已失效,不能下载"
            //                                                 );
            //                                             } else {
            //                                                 this.rowTableObj =
            //                                                     params.row;
            //                                                 this.bigImgSrcFn(
            //                                                     3,
            //                                                     indexImg
            //                                                 );
            //                                             }
            //                                         }
            //                                     }
            //                                 },
            //                                 "下载二维码"
            //                             )
            //                           : "",
            //                       this.myButtonPrem.indexOf("downloadQRCode") >=
            //                       0
            //                           ? h(
            //                                 "a",
            //                                 {
            //                                     props: {
            //                                         type: "text",
            //                                         size: "small"
            //                                     },
            //                                     style: { marginRight: "16px" },
            //                                     on: {
            //                                         click: () => {
            //                                             if (
            //                                                 params.row.enable !=
            //                                                 "1"
            //                                             ) {
            //                                                 this.$Message.error(
            //                                                     "海报已失效,不能下载"
            //                                                 );
            //                                             } else {
            //                                                 this.rowTableObj =
            //                                                     params.row;
            //                                                 this.bigImgSrcFn(
            //                                                     5,
            //                                                     indexImg
            //                                                 );
            //                                             }
            //                                         }
            //                                     }
            //                                 },
            //                                 "下载海报"
            //                             )
            //                           : "",
            //                   ])
            //                 : "";
            //         }
            //     }
            // ],
            // 招生列表
            tableColumnArray2: [
                {
                    // title: "资源类型",
                    key: "enrollTypeName",
                    filters: [
                        {
                            label: "新资源",
                            value: "new"
                        },
                        {
                            label: "重复录入",
                            value: "repetition"
                        }
                    ],
                    filterMultiple: false,
                    filterRemote: function(value, row) {
                        //  enrollType   new:新资源，repetition:重复录入
                        _this.enrollType = value[0];
                        _this.pageNo = 1;
                        _this.getListData();
                    }
                },
                {
                    // title: "来源活动",
                    key: "activityName",
                    filters: [],
                    filterMultiple: false,
                    filterRemote: function(value, row) {
                        _this.activityId = value[0];
                        _this.pageNo = 1;
                        _this.getListData();
                    }
                },
                {
                    // title: "是否vleads",
                    key: "status",
                    render: (h, params) => {
                        let status = params.row.status;
                        let text = "";
                        // 是否有效： 0：空，1：有效， 2：无效'
                        if (status == "0") {
                            text = "-";
                        } else if (status == "1") {
                            text = "有效";
                        } else if (status == "2") {
                            text = "无效";
                        }
                        return h("div", [h("div", {}, text)]);
                    }
                },
                {
                    // title: "跟踪状态",
                    key: "customerStatus",
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "div",
                                {},
                                params.row.enrollType == "repetition" ||
                                    params.row.enrollType == "expired"
                                    ? "_"
                                    : params.row.customerStatus
                            )
                        ]);
                    }
                },
                {
                    // title: "跟踪PSA",
                    key: "psaname",
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "div",
                                {},
                                params.row.enrollType == "repetition" ||
                                    params.row.enrollType == "expired"
                                    ? "_"
                                    : params.row.psaname
                            )
                        ]);
                    }
                },
                {
                    // title: "手机号",
                    key: "phone",
                    render: (h, params) => {
                        return h("div", [h("div", {}, params.row.phone)]);
                    }
                },
                {
                    title: "操作",
                    key: "doAction",
                    width: 120,
                    render: (h, params) => {
                        return h("div", [
                            (params.row.enrollType == "repetition" ||
                            params.row.enrollType == "expired" || this.myButtonPrem.indexOf("crmDetail") < 0)
                                ? ""
                                : h(
                                      "a",
                                      {
                                          props: {
                                              type: "text",
                                              size: "small"
                                          },
                                          style: {
                                              marginRight: "16px"
                                          },
                                          on: {
                                              click: () => {
                                                  this.$router.push({
                                                      name: "crm.customer360",
                                                      query: {
                                                          id:
                                                              params.row
                                                                  .customerId
                                                      }
                                                  });
                                              }
                                          }
                                      },
                                      "查看资源"
                                  )
                        ]);
                    }
                }
            ],
            //报名学员
            tableColumnArray3: [
                {
                    // title: "手机号",
                    key: "phone",
                    render: (h, params) => {
                        return h("div", [h("div", {}, params.row.phone)]);
                    }
                },
                {
                    title: "操作",
                    key: "doAction",
                    width: 120,
                    render: (h, params) => {
                        return h("div", [
                            this.myButtonPrem.indexOf("crmDetail") < 0 ? "" : h(
                                "a",
                                {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    },
                                    style: {
                                        marginRight: "16px"
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push({
                                                name: "crm.customer360",
                                                query: {
                                                    id: params.row.customerId
                                                }
                                            });
                                        }
                                    }
                                },
                                "查看会员"
                            )
                        ]);
                    }
                }
            ],
            tableData: [],
            copyTip: false
        };
    },
    computed: {
        ...mapState(["app", "buttonPerm", 'tenant']),
        myButtonPrem() {
            return this.buttonPerm["crm.QrCodeEnrollment"] || [];
        },
        posterLogoWidth:function(){
            let ratio= 1;
            // if(this.logoWidth){
            //     return this.logoWidth*ratio+'px';
            // }else{
                return 86*ratio+'px';
            // }
        },
        posterLogoHeight:function(){
            let ratio1= 1;
            let ratio=86*ratio1/this.logoWidth;
            if(this.logoHight){
                return this.logoHight*ratio+'px';
            }else{
                return 16*ratio+'px';
            }
        },
        posterLogoLeft:function(){
            let ratio= 1;
            if(this.posterData.posterLogoPointXy.x){
                return this.posterData.posterLogoPointXy.x*ratio+'px';
            }else{
                return 30*ratio+'px';
            }
        },
        posterLogoTop:function(){
            let ratio= 1;
            if(this.posterData.posterLogoPointXy.y){
                return this.posterData.posterLogoPointXy.y*ratio+'px';
            }else{
                return 34*ratio+'px';
            }
        },
        posterQRCodeWidth:function(){
            let ratio= 1;
            return 70*ratio+'px';
        },
        posterQRCodeHeight:function(){
            let ratio= 1;
            return 70*ratio+'px';
        },
        posterQRCodeLeft:function(){
            let ratio= 1;
            if(this.posterData.posterQrCodePointXy.x){
                return this.posterData.posterQrCodePointXy.x*ratio+'px';
            }else{
                return 220*ratio+'px';
            }
        },
        posterQRCodeTop:function(){
            let ratio= 1;
            if(this.posterData.posterQrCodePointXy.y){
                return this.posterData.posterQrCodePointXy.y*ratio+'px';
            }else{
                return 480*ratio+'px';
            }
        },
    },
    components: {
        bigTable,
        vSearchCollapse
    },
    mounted() {
        waitUntil(
            () => {
                return JSON.stringify(this.buttonPerm) != "{}" || false;
            },
            () => {
                this.tableName = []
                // if(this.myButtonPrem.indexOf('channelTab') >= 0){
                //     this.tableName.push({
                //         name: "促销员列表",
                //         value: "1"
                //     })
                // }
                if(this.myButtonPrem.indexOf('cusEnroll') >= 0){
                    this.tableName.push({
                        name: "报名资源",
                        value: "2"
                    })
                }
                if(this.myButtonPrem.indexOf('vipEnroll') >= 0){
                    this.tableName.push({
                        name: "报名会员",
                        value: "3"
                    })
                }

                this.QrCodeForm();
            }
        );
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        remoteconfigName(query) {
            // this.loadingconfigName = true;
            let params = {
                fuzzySearch: "1",
                name: ''
            };
            crmChannel
                .checkChannel(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.configNameList = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    // this.loadingconfigName = false;
                });
        },
        configNameChange(val) {
            if (!val) {
                this.formValidate.configPhone = "";
                return;
            }
            let arr = this.configNameList.filter(item => {
                return item.name == val;
            })[0];
            this.userId = arr.id;
            this.formValidate.configPhone = arr.phone;
        },
        OkBtn() {
            if (this.titleVal == 2) {
                let Obj = {
                    qrcodeId: this.formObj.id,
                    name: this.formValidate.configName,
                    phone: this.formValidate.configPhone
                };
                this.$refs.formRef.validate(validRes => {
                    if (validRes) {
                        Obj.channelId = this.userId;
                        this.updateLoadingStatus({ isLoading: true });
                        crmChannel
                            .saveQrcodeChannel(Obj)
                            .then(valid.call(this))
                            .then(res => {
                                if (res.ok) {
                                    this.$Message.success(res.data.message);
                                    this.QrCodeForm();
                                    this.modal1 = false;
                                }
                            })
                            .catch(errors.call(this))
                            .finally(() => {
                                this.updateLoadingStatus({ isLoading: false });
                            });
                    }
                });
            } else if (this.titleVal == 3) {
                this.downLoad(this.imgSrc, this.rowTableObj);
                this.modal1 = false;
            }
        },
        validFn(channelQrcodeRelId, qrcodeId, isEnable, channelId) {
            this.updateLoadingStatus({ isLoading: true });
            let param = {
                channelQrcodeRelId,
                qrcodeId,
                isEnable,
                channelId
            };
            crmQrcode
                .updateQrcodeChannelEnable(param)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.$Message.success(res.data.message);
                        this.getListData();
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        QrCodeForm() {
            this.updateLoadingStatus({ isLoading: true });
            let params = {
                id: this.$route.query.id
            };
            crmH5
                .detail(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.formObj = res.data.data;
                        this.$nextTick(() => {
                            let ele = document.querySelector("#detailImgQrdiv");
                            ele.innerHTML = "";
                            this.showQRCode(
                                ele,$config.baseURL1 + '/page/view/' + this.$route.query.id
                            );
                            this.changeTableType(2);
                        });
                        // this.findQrCodeActivity();
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    // this.updateLoadingStatus({ isLoading: false });
                });
        },
        // 生成二维码
        showQRCode(ele, url) {
            //ele元素  具体生成二维码对应的url
            var qrcode = new QRCode(ele, {
                text: url,
                width: 180,
                height: 180,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
        },
        QrNoCopyClick() {
            const range = document.createRange();
            range.selectNode(document.getElementById("QrTextId")); // 设定range包含的节点对象
            /* 窗口的selection对象，表示用户选择的文本 */
            const selection = window.getSelection();
            if (selection.rangeCount > 0) selection.removeAllRanges(); //
            selection.addRange(range); // 将要复制的区域的range对象添加到selection对象中
            document.execCommand("copy"); //
            selection.removeAllRanges(); //删除鼠标点击选中文字的丑陋的背景效果
            if (!this.copyTip) {
                this.copyTip = true;
                setTimeout(() => {
                    this.copyTip = false;
                }, 1000);
            }
        },
        addConfigPeople() {
            this.remoteconfigName()
            this.bigImgSrcFn(2);
        },
        bigImgSrcFn(val, index) {
            let title = "";
            if (val == 1) {
                this.titleVal = 1;
                title = this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_623');
                let imgsrc = document.querySelector("#detailImgQrdiv img").src;
                this.imgSrc = imgsrc;
            } else if (val == 2) {
                this.titleVal = 2;
                title = this.$t('modules_spoc_crm_web_src_views_qrcodeenrollment_qrcodeenrollmentdetail_1610');
                setTimeout(() => {
                    this.$refs.formRef.resetFields();
                });
            } else if (val == 3) {
                this.titleVal = 3;
                title = this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_683');
                let imgsrc = document
                    .querySelectorAll(".imgClass")
                    [index].querySelectorAll("img")[0].src;
                this.imgSrc = imgsrc;
            } else if (val == 4) {
                this.titleVal = 4;
                title = this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_623');
                let imgsrc = document
                    .querySelectorAll(".imgClass")
                    [index].querySelectorAll("img")[0].src;
                this.imgSrc = imgsrc;
            }
            if (val == 5) {
                this.titleVal = 5;
                title = this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_643');

                let params = {
                    channelId: this.rowTableObj.channelId,
                    id: this.rowTableObj.qrId,
                    tenant: (this.tenant || localStorage.getItem('tenant')),
                };
                crmQrcode
                    .form(params)
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            let _this=this;
                            let obj = res.data.data;
                            obj.posterLogoPointXy = JSON.parse(obj.posterLogoPointXy);
                            obj.posterQrCodePointXy = JSON.parse(obj.posterQrCodePointXy);
                            this.posterData=obj;
                            let img = new Image();
                            img.onload = function () {
                                _this.logoWidth = img.width;
                                _this.logoHight = img.height;
                            }
                            img.src = obj.logoUr;
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {
                        this.title = title;
                        // this.title = '新增促销员';
                        this.modal1 = true;
                        this.$nextTick(() => {
                            let ele = document.querySelectorAll(".detailPosterQrdiv");
                            ele.forEach(v=>{
                                v.innerHTML = "";
                                this.showQRCode(
                                    v,$config.baseURL1 + '/page/view/' + this.$route.query.id
                                );
                            })
                        });
                    });

            }else{
                this.title = title;
                // this.title = '新增促销员';
                this.modal1 = true;
            }
        },
        cancelImg() {
            this.modal1 = false;
        },
        downLoad(name, rowTableObj) {
            //name img 路径或者要下载的文章路径
            var a = document.createElement("a");
            var event = new MouseEvent("click");
            a.download =
                rowTableObj.qrCode +
                (rowTableObj.defaultChannel != "1"
                    ? "_" + rowTableObj.channelName
                    : "");
            a.href = name;
            a.dispatchEvent(event);
        },
        changeTableType(val) {
            this.activityId = "";
            this.enrollType = "";
            this.tableType = val;
            this.updateLoadingStatus({ isLoading: true });
            this.tableColumnArray = [].concat(this["tableColumnArray" + val]);
            this.getListData();
            // this.findQrcodeDynamicLine();
            if (val == "1") {
                // if (this.myButtonPrem.indexOf("channelEdit") < 0) {
                //     //不可选择促销员
                //     this.btnList = [];
                // } else {
                //     this.btnList = [
                //         {
                //             style: {},
                //             type: "",
                //             btnClick: this.addConfigPeople,
                //             text: this.$t('modules_spoc_crm_web_src_views_qrcodeenrollment_qrcodeenrollmentdetail_1610')
                //         }
                //     ];
                // }
                // let params = {
                //     qrCode: this.$route.query.qrCode
                // };
                // crmQrcode
                //     .detail(params)
                //     .then(valid.call(this))
                //     .then(res => {
                //         if (res.ok) {
                //             this.formObj = res.data.data;
                //         }
                //     })
                //     .catch(errors.call(this))
                //     .finally(() => {
                //     });
            } else if (val == "2" || val == "3") {
                this.btnList = [];
            }
        },
        getListDataEmit() {
            this.getListData();
        },
        findQrCodeActivity() {
            // 来源活动下拉
            crmActivity
                .findQrCodeActivity({ qrId: this.formObj.id })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let arr = res.data.data;
                        arr.forEach(item => {
                            item.label = item.name;
                            item.value = item.id;
                        });
                        this.tableColumnArray2.filter(item => {
                            if (item.key == "activityName") {
                                item.filters = arr;
                            }
                        });
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({
                        isLoading: false
                    });
                });
        },
        findQrcodeDynamicLine() {
            if (this.findQrcodeDynamicLineBool) {
                this.getListData();
                return;
            }
            // 来源活动下拉
            // crmQrcode
            //     .findQrcodeDynamicLine({ qrId: this.formObj.id })
            //     .then(valid.call(this))
            //     .then(res => {
            //         if (res.ok) {
            //             let arr = res.data.data;
            //             arr.forEach((item, index) => {
            //                 item.title = item.name;
            //                 item.name = item.enName;
            //                 item.selected = true;
            //                 item.required = false;
            //                 item.sort = index + 9;
            //                 item.noExport = true;
            //                 delete item.enName;
            //             });
            //             this.cols2.true = this.cols2.true.concat(arr);
            //             this.cols3.true = this.cols3.true.concat(arr);
            //             this.getListData();
            //             this.findQrcodeDynamicLineBool = true;
            //         }
            //     })
            //     .catch(errors.call(this))
            //     .finally(() => {});
        },
        getListData() {
            this.updateLoadingStatus({ isLoading: true });
            let myRequestList;
            if (this.tableType == "2") {
                this.defaultShowCol = this.cols2;
                myRequestList = crmH5.findCustomer;
            } else if (this.tableType == "3") {
                this.defaultShowCol = this.cols3;
                myRequestList = crmH5.findMember;
            }

            let param = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                h5Id: this.$route.query.id
            };
            myRequestList(param)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let result = res.data.data;
                        this.tableData = result.list;
                        this.dataTotal = result.total;
                        if (this.tableType == "1") {
                            //根据数据生成列表数据二维码
                            for (let n = 0; n < this.tableData.length; n++) {
                                this.$nextTick(() => {
                                    let imgsrc = document.getElementsByClassName(
                                        "imgClass"
                                    );
                                    this.showQRCode(
                                        imgsrc[n],
                                        ele,$config.baseURL1 + '/page/view/' + this.$route.query.id
                                    );
                                });
                            }
                        }
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        //分页方法 如果有分页则为必须方法，修改getCourseList为自己的获取数据方法 这里注意。不再有每页个数改变的方法了
        pageChange(pageNo, pageSize) {
            if (!pageNo) {
                //防止无用重复请求
                return;
            }
            this.pageNo = pageNo;
            this.pageSize = pageSize;
            this.getListData();
        },
        editor(){
            this.$router.push({name:"crm.editorQrCode",query:{id:this.formObj.id,channelId:this.formObj.channelId}})
        },
        downloadposter(){
            domtoimage.toBlob(document.getElementById('posterViewdom'))
            .then(function (blob) {
                window.saveAs(blob, 'poster.png');
            });
        }
    }
};
</script>
