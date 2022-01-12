<style lang="less">

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
        .head{
             /*.name{*/
             /*    margin-left:0;*/
             /*}*/
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
        .table-slot-tabs{
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: flex-end;
            margin-bottom:-12px;
            .ivu-tabs-bar{
                margin-bottom: 0;
                margin-right:20px;
            }
            span{
                font-size:12px;
                font-weight:normal;
                color:rgba(153,153,153,1);
            }
        }
    }
    .QrCodeEnrollmentDetail-lz {
        .pub {
            font-size: 14px;
            font-family: HiraginoSansGB;
            font-weight: normal;
            color: rgba(153, 153, 153, 1);
        }
        .QrCodeEnrollmentDetailTop {
            background: rgba(255, 255, 255, 1);
            border-radius: 4px;
            display: flex;
            // 二维码样式
            .detailImgQr {
                padding: 27px 32px 15px;
                width:144px;
                display: flex;
                flex-direction: column;
                align-items: center;justify-content: center;
                span {
                    padding: 3px 12px;
                    margin: 16px auto 0;
                    color: rgba(70, 188, 21, 1);
                    background: rgba(228, 253, 218, 1);
                    border-radius: 4px;
                    &.no{
                        color: #999;
                        background: #f2f3f7;
                    }
                }
                .detail-img-qrdiv{
                    width:80px;
                    height:80px;
                    canvas{
                        width:80px;
                        height:80px;
                    }
                    img{
                        width:80px;
                        height:80px;
                        user-select: none;
                    }
                }

            }
            .detailInfo {
                display: flex;
                flex-grow: 1;
                flex-direction: row;
                padding-top: 25px;
                .detailInfoRight {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: center;
                    width: 8%;
                    .edit-btn{
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                    }
                }
                // 右侧三列样式
                .detailInfoBottom {
                    width: 92%;
                    display: flex;
                    justify-content: space-between;
                    > div {
                        width: 30%;
                        > div {
                            margin-bottom: 12px;
                            .pub;
                            > span {
                                color: #495060;
                                font-weight: normal;
                            }
                        }
                    }
                    > div:nth-of-type(1) {
                        width: 35%;
                    }
                    > div:nth-of-type(2) {
                        width: 30%;
                    }
                    > div:nth-of-type(3) {
                        width: 25%;
                    }
                }
            }
        }
        .detailInfoCenter{
            background: #fff;
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
            padding:20px 32px  4px;
            > div {
                width: 20%;
                > div {
                    margin-bottom: 12px;
                    .pub;
                    > span {
                        color: #495060;
                        font-weight: normal;
                    }
                }
            }
            >div:nth-of-type(1),>div:nth-of-type(2){
                width: 22.5%;
            }
            >div:nth-of-type(3),>div:nth-of-type(4),>div:nth-of-type(5){
                width: 18.2%;
            }
        }
        .QrCodeEnrollmentDetailButtom {
            background: rgba(255, 255, 255, 1);
            border-radius: 4px;
            margin: 10px 0px;
            padding: 20px 32px;
            display: flex;
            justify-content: center;
            > div {
                width:200px;
                margin-right:100px;
                .pub;
                font-family:HiraginoSansGB-W6,HiraginoSansGB;
                > span {
                    color: #495060;
                    font-weight: normal;
                }
            }
            >div:nth-of-type(3){
                margin-right:0;
            }
        }
    }
</style>
<template>
    <div class="QrCodeEnrollmentDetail-lz">
        <div class="QrCodeEnrollmentDetailTop">
            <div class="detailImgQr">
                <div class="detail-img-qrdiv" :style="status == $t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_643')?'filter:blur(1px)':''" v-show="formData.qrCode" @click="bigImgSrcFn(1)" id="detailImgQrdiv"></div>
<!--                <div class="detail-img-qrdiv" id="detailImgQrdivCopy" v-if="status==$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_643')&&formData.qrCode" @click="bigImgSrcFn(0)"><img src="../../../assets/img/invalid-code.png"></div>-->
                <span :class="{no:status == $t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_643')}">{{status}}</span>
            </div>
            <div class="detailInfo">
                <div class="detailInfoBottom">
                    <div>
                        <div>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_599')}}<span>{{formData.name? formData.name :'-'}}</span>
                        </div>
                        <div>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_601')}}<span>{{formData.activityDate? formData.activityDate :'-'}}</span>
                        </div>
<!--                        <div>-->
<!--                            授课助教：-->
<!--                            <span>{{formData.assistName? formData.assistName :'-'}}</span>-->
<!--                        </div>-->
                        <div>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_646')}}<span>{{formData.createDate? formatTime(formData.createDate) :'-'}}</span>
                        </div>
                        <div>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_621')}}<span>{{formData.cost?Number.parseFloat(formData.cost).toFixed(2) :'-'}}</span>
                        </div>
                    </div>
                    <div>
                        <div>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_597')}}<span>{{formData.type? formData.typeName :'-'}}</span>
                        </div>
<!--                        <div>-->
<!--                            计划课时：-->
<!--                            <span>{{formData.courseHour? formData.courseHour :'-'}}</span>-->
<!--                        </div>-->
                        <div>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_608')}}<span>{{formData.teacherName? formData.teacherName :'-'}}</span>
                        </div>
                        <div>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_624')}}<span>{{formData.qrCode? formData.qrCode :'-'}}</span>
                        </div>
                    </div>
                    <div>
                        <div>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_605')}}<span>{{formData.classroomName? formData.classroomName :'-'}}</span>
                        </div>
                        <div>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_652')}}<span>{{formData.createByName? formData.createByName :'-'}}</span>
                        </div>
                        <div>{{$t('classlist_compontents_detailinfo_22')}}<span>{{formData.classTeacherName? formData.classTeacherName :'-'}}</span>
                        </div>

                    </div>
                </div>
                <div class="detailInfoRight">
                    <Button type="primary" v-if="myButtonPrem.indexOf('edit') > -1" @click="toEdit"><div class="edit-btn"><Icon size="16" type="ios-create-outline" style="margin-right:4px;"/><span>编辑</span></div></Button>
                </div>
            </div>
        </div>
        <div class="detailInfoCenter">
            <div>
                <div>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_616')}}<span>{{formData.placeCost > -1&& formData.placeCost !== null? Number.parseFloat(formData.placeCost).toFixed(2):'-'}}</span>
                </div>
                <!-- <div>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_656')}}<span style="color:#44BCB7">{{formData.realCount > -1&& formData.realCount !== null? formData.realCount :'-'}}</span>/<span>{{formData.predictCount > -1&& formData.predictCount !== null? formData.predictCount :'-'}}</span> -->
                <div>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_658')}}<span style="color:#44BCB7">{{formData.realLeads > -1&& formData.realLeads !== null? formData.realLeads :'-'}}</span>/<span>{{formData. predictLeads > -1&& formData.predictLeads !== null? formData.predictLeads :'-'}}</span>
                </div>
                <div>
                    APP：
                    <span>{{formData.appNums > -1&& formData.appNums !== null? formData.appNums :'-'}}</span>
                </div>
            </div>
            <div>
                <div>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_618')}}<span>{{formData.personCost > -1&& formData.personCost !== null? Number.parseFloat(formData.personCost).toFixed(2) :'-'}}</span>
                </div>
                <div>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_656')}}<span style="color:#44BCB7">{{formData.newNums > -1&& formData.newNums !== null? formData.newNums :'-'}}</span>/<span>{{formData.predictCount > -1&& formData.predictCount !== null? formData.predictCount :'-'}}</span>
                </div>
                <div>
                    OPP：
                    <span>{{formData.oppNums > -1&& formData.oppNums !== null? formData.oppNums :'-'}}</span>
                </div>
            </div>
            <div>
                <div>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_619')}}<span>{{formData.giftCost > -1&& formData.giftCost !== null? Number.parseFloat(formData.giftCost).toFixed(2)  :'-'}}</span>
                </div>
                <div>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_660')}}<span>{{formData.visitNums > -1&& formData.visitNums !== null? formData.visitNums :'0'}}</span>
                </div>
                <!-- <div>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_661')}}<span>{{formData.newNums > -1&& formData.newNums !== null? formData.newNums :'-'}}</span>
                </div> -->
            </div>
            <div>
                <div>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_620')}}<span>{{formData.otherCost > -1&& formData.otherCost !== null? Number.parseFloat(formData.otherCost).toFixed(2)  :'-'}}</span>
                </div>
                <div>
                    leads：
                    <span>{{formData.realLeads > -1&& formData.realLeads !== null? formData.realLeads :'-'}}</span>
                </div>
            </div>
            <div>
                <div>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_663')}}<span style="color:#FF0000">{{formData.expense > -1&& formData.expense !== null? Number.parseFloat(formData.expense).toFixed(2) :'-'}}</span>
                </div>
                <div>
                    Vleads：
                    <span>{{formData.vleadNums > -1&& formData.vleadNums !== null? formData.vleadNums :'-'}}</span>
                </div>
            </div>
        </div>
        <div class="QrCodeEnrollmentDetailButtom">
            <div>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_664')}}<span style="color:#44BCB7;font-size: 16px;">{{formData.appConversionRates > 0? formData.appConversionRates*100+'%' :'0%'}}</span>
            </div>
            <div>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_665')}}<span style="color:#44BCB7;font-size: 16px;">{{formData.oppConversionRates > 0? formData.oppConversionRates*100+'%' :'0%'}}</span>
            </div>
            <div>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_666')}}<span style="color:#44BCB7;font-size: 16px;">{{formData.newConversionRates > 0? formData.newConversionRates*100+'%' :'0%'}}</span>
            </div>
        </div>
        <big-table
                v-if="defaultShowCol"
                class="mytable"
                :btnList="btnList"
                :tableData="tableData"
                :tableColumnArray="tableColumnArray"
                :defaultShowCol="defaultShowCol"
                :dataTotal="dataTotal"
                :pageNo="pageNo"
                :canSelection="true"
                :isShowSelectTableColumn="false"
                @selectionChange="selectionChange"
                @pageChange="pageChange"
                @changeTableType="changeTableType">
            <div slot="tableNameSlot" class="table-slot-tabs">
                <Tabs v-model="tabSlot" @on-click="changeTableType">
                    <TabPane label="报名资源" name="0" v-if="myButtonPrem.indexOf('cusTab') > -1"></TabPane>
                    <TabPane label="报名会员" name="1" v-if="myButtonPrem.indexOf('vipTab') > -1"></TabPane>
                    <TabPane label="促销员列表" name="2" v-if="myButtonPrem.indexOf('channelTab') > -1"></TabPane>
                </Tabs>
            </div>
            <div v-if="tabSlot == '2'" slot="buttonsAfterSlot" class="buttons-after-slot">
                <Checkbox v-model="setSource" @on-change="setSourceFn">{{setSource? setSourceValue[1] : setSourceValue[0] }}</Checkbox>
            </div>
        </big-table>
        <new-resource-registration ref="newResource"></new-resource-registration>
        <member-registration ref="memberRegistration" @refresh="refreshFn"></member-registration>
        <viewIMG ref="viewIMGId"></viewIMG>
    </div>
</template>
<script>
    import valid, {
        errors,
        crmActivity,
        sysUser,
    } from "../../../libs/request";
    import QRCode from "qrcodejs2";
    import { mapMutations, mapState } from "vuex";
    import bigTable from "@public/modules/bigTable.vue";
    import exportModal from "@public/modules/exportModal.vue";
    import vSearchCollapse from "@public/modules/vSearchCollapse";
    import memberRegistration from "./memberRegistration";
    import viewIMG from "./viewIMG";
    import { waitUntil, DatePickerOpt, defaultDatePickerValue } from "@public/libs/util";
    export default {
        name: 'crm.activityEnrollment.detial',
        components: {
            bigTable,
            exportModal,
            vSearchCollapse,
            memberRegistration,
            viewIMG
        },
        data() {
            return {
                setSource:false,
                setSourceValue:[this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_670'),this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_671')],
                id:'',
                qrId:'',
                channelId:'',
                status:'',
                formData:{},//form 数据
                detailInfo:{},
                detailInfo2:{},
                tableType: "0",
                selection: [],
                loadingoptUserId: false,
                optUserIdList: [],
                btnList: [],
                btnList0:[
                    // {
                    //     btnClick: this.showPop,
                    //     text: "新资源报名"
                    // },
                    // {
                    //     btnClick: this.ImportingResource,
                    //     text: "导入新资源"
                    // },
                ],
                btnList1:[
                    // {
                    //     btnClick: this.showInfo,
                    //     text: "创建会员"
                    // },
                    // {
                    //     btnClick: this.ImportingMember,
                    //     text: "导入会员"
                    // },
                ],
                btnList2:[],
                pageNo: 1,
                pageSize: this.$store.state.app.pageSizeGlobal,
                tabSlot:'0',
                defaultShowCol: null,
                dataTotal: 0,
                // sortObj: {},
                tableColumnArray: [],
                //报名资源
                tableColumnArray0: [
                    {
                        // title: "资源类型",
                        key: "enrollTypeName",
                        filters: [
                            {
                                label: this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_676'),
                                value: 1
                            },
                            {
                                label: this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_677'),
                                value: 2
                            },
                            {
                                label: this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_678'),
                                value: 3
                            },
                            {
                                label: this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_679'),
                                value: 4
                            },
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            if (value === 1) {
                                return row.enrollTypeName == '新资源' //this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_676');
                            } else if (value === 2) {
                                return row.enrollTypeName == '重复录入' //this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_677');
                            } else if (value === 3) {
                                return row.enrollTypeName == '激活资源' //this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_678');
                            }else if (value === 4) {
                                return row.enrollTypeName == '已过期资源' //this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_679');
                            }
                        }
                    },
                    {
                        title: this.$t('classlist_compontents_detailinfo_45'),
                        key: "doAction",
                        width: 120,
                        render: (h, params) => {
                            return h("div", [
                                this.myButtonPrem.indexOf('crmDetail') > -1 ? h(
                                    "a",
                                    {
                                        props: {
                                            type: "text",
                                            size: "small"
                                        },
                                        style: { marginRight: "8px" },
                                        on: {
                                            click: () => {
                                                this.$router.push({
                                                    name:'crm.customer360',
                                                    query:{
                                                        id:params.row.customerId
                                                    }
                                                })
                                            }
                                        }
                                    },
                                    "查看资源"
                                ) : ''
                            ]);
                        }
                    }
                ],
                // 报名会员
                tableColumnArray1: [
                    {
                        title: this.$t('classlist_compontents_detailinfo_45'),
                        key: "doAction",
                        width: 120,
                        render: (h, params) => {
                            return h("div", [
                                this.myButtonPrem.indexOf('crmDetail') > -1 ? h(
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
                                                    name:'crm.customer360',
                                                    query:{
                                                        id:params.row.customerId
                                                    }

                                                })
                                            }
                                        }
                                    },
                                    "查看资源"
                                ) : ''
                            ]);
                        }
                    }
                ],
                //配置人员列表
                tableColumnArray2: [
                    {
                        // title: "APP转化率",
                        key: "appPercent",
                        render: (h, params) => {
                            return h(
                                "span",
                                {

                                },
                                params.row.appPercent*100+ '%'
                            );
                        }
                    },
                    {
                        // title: "OPP转化率",
                        key: "oppPercent",
                        render: (h, params) => {
                            return h(
                                "span",
                                {

                                },
                                params.row.oppPercent*100+ '%'
                            );
                        }
                    },
                    {
                        // title: "New转化率",
                        key: "newPercent",
                        render: (h, params) => {
                            return h(
                                "span",
                                {

                                },
                                params.row.newPercent*100+ '%'
                            );
                        }
                    },
                    {
                        // title: "专属二维码",
                        key: "qrId",
                        render: (h, params) => {
                            let indexImg = params.index;
                            // console.log(this.status)
                            return h("div", [
                                h("div", {
                                    style: {
                                        cursor: "pointer",
                                        width: "40px",
                                        height: "40px",
                                        // filter:this.status!=this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_682')||(this.status==this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_682')&&params.row.enableName!=this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_682'))?'blur(1px)':''
                                        filter:this.status!=this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_682')||(this.status==this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_682')&&params.row.enableName!='有效')?'blur(1px)':''
                                    },
                                    attrs: {
                                        class: "imgClass"
                                    },
                                    on: {
                                        click: () => {
                                            // if(this.status!=this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_682')||(this.status==this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_682')&&params.row.enableName!=this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_682'))){
                                            if(this.status!=this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_682')||(this.status==this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_682')&&params.row.enableName!='有效')){
                                                // console.log('ok')
                                                this.bigImgSrcFn(4, indexImg,'1');
                                            }else{
                                                // console.log('0000')
                                                this.bigImgSrcFn(4, indexImg);
                                            }
                                        }
                                    }
                                })
                            ]);
                        }
                    },
                    {
                        title: this.$t('classlist_compontents_detailinfo_45'),
                        key: "doAction",
                        width: 120,
                        render: (h, params) => {
                            let indexImg = params.index;
                            // let enableBool = this.status;
                            return h("div",
                                {
                                  style:{
                                      // display:this.status!='有效'||(this.status=='有效'&&params.row.enableName!='有效')?'none':'block'
                                  }
                                },
                                [
                                    this.myButtonPrem.indexOf('downloadQRCode') > -1 ? h(
                                        "a",
                                        {
                                            props: {
                                                type: "text",
                                                size: "small"
                                            },
                                            style: {
                                                marginRight: "16px" ,
                                                // color:this.status!=this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_682')||(this.status==this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_682')&&params.row.enableName!=this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_682'))?'#ccc':'',
                                                color:this.status!=this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_682')||(this.status==this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_682')&&params.row.enableName!='有效')?'#ccc':'',
                                                // cursor:this.status!=this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_682')||(this.status==this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_682')&&params.row.enableName!=this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_682'))?'default':'pointer'
                                                cursor:this.status!=this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_682')||(this.status==this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_682')&&params.row.enableName!='有效')?'default':'pointer'
                                            },
                                            on: {
                                                click: () => {
                                                    // if(this.status!=this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_682')||(this.status==this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_682')&&params.row.enableName!=this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_682'))){
                                                    if(this.status!=this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_682')||(this.status==this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_682')&&params.row.enableName!='有效')){
                                                        return
                                                    }
                                                    let imgSrc = document.querySelectorAll(".imgClass")[indexImg].querySelectorAll("img")[0].src;
                                                    this.downLoad(imgSrc, params.row);
                                                }
                                            }
                                        },
                                        "下载二维码"
                                    ) : ''
                                ]) 
                        }
                    }
                ],
                cols0: {
                    "false":[
                        {
                            "name":"name",
                            "title":this.$t('modules_rolemanage_186'),
                            "selected":true,
                            "required":true,
                            "sort":0
                        },
                        {
                            "name":"phone",
                            "title":this.$t('modules_usermanage_230'),
                            "selected":true,
                            "required":true,
                            "sort":0
                        },
                        {
                            "name":"createDate",
                            "title": this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_686'),
                            "selected":true,
                            "required":true,
                            "sort":0
                        },
                        {
                            "name":"enrollTypeName",
                            "title":this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_687'),
                            "selected":true,
                            "required":false,
                            "sort":0
                        },
                        {
                            "name":"createByName",
                            "title":this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_688'),
                            "selected":true,
                            "required":false,
                            "sort":0
                        },
                        {
                            "name":"officeName",
                            "title": this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_689'),
                            "selected":true,
                            "required":false,
                            "sort":0
                        },
                        {
                            "name":"belongOfficeName",
                            "title":this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_690'),
                            "selected":true,
                            "required":false,
                            "sort":0
                        },
                        {
                            "name":"isEffectiveName",
                            "title":this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_691'),
                            "selected":true,
                            "required":false,
                            "sort":0
                        },
                        {
                            "name":"saler",
                            "title":this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_692'),
                            "selected":true,
                            "required":false,
                            "sort":0
                        },
                        {
                            "name":"statusName",
                            "title":this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_693'),
                            "selected":true,
                            "required":false,
                            "sort":0
                        }
                    ],
                    'true':[

                    ]
                },
                cols1: {
                    "false":[
                        {
                            "name":"name",
                            "title":this.$t('modules_rolemanage_186'),
                            "selected":true,
                            "required":true,
                            "sort":0
                        },

                        {
                            "name":"phone",
                            "title":this.$t('modules_usermanage_230'),
                            "selected":true,
                            "required":true,
                            "sort":0
                        },
                        {
                            "name":"createByName",
                            "title":this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_688'),
                            "selected":true,
                            "required":false,
                            "sort":0
                        },
                        {
                            "name":"createDate",
                            "title":this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_694'),
                            "selected":true,
                            "required":false,
                            "sort":0
                        },
                        {
                            "name":"isEffectiveName",
                            "title":this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_691'),
                            "selected":true,
                            "required":false,
                            "sort":0
                        },
                        {
                            "name":"saler",
                            "title":this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_692'),
                            "selected":true,
                            "required":false,
                            "sort":0
                        },
                        {
                            "name":"statusName",
                            "title":this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_693'),
                            "selected":true,
                            "required":false,
                            "sort":0
                        }
                    ],
                    'true':[

                    ]
                },
                cols2: {
                    true: [
                        {
                            name: "qrCode",
                            title: this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_695'),
                            selected: true,
                            required: false,
                            sort: 0,
                            noExport: true
                        },
                        {
                            name: "channelCode",
                            title: this.$t('modules_spoc_core_web_src_views_announcement_index_107'),
                            selected: true,
                            required: false,
                            sort: 0,
                            noExport: true
                        },
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
                        {
                            name: "createByName",
                            title: this.$t('scoretemplate_scoretemplate_569'),
                            selected: true,
                            required: false,
                            sort: 2,
                            noExport: true
                        },
                        {
                            name: "createDate",
                            title: this.$t('scoretemplate_scoretemplate_556'),
                            selected: true,
                            required: false,
                            sort: 3,
                            noExport: true
                        },
                        {
                            name: "enableName",
                            title: this.$t('pushsettings_index_496'),
                            selected: true,
                            required: false,
                            sort: 4,
                            noExport: true
                        },
                        {
                            name: "qrId",
                            title: this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_700'),
                            selected: true,
                            required: false,
                            sort: 4,
                            noExport: true
                        },
                        {
                            name: "visitNum",
                            title: this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_701'),
                            selected: true,
                            required: false,
                            sort: 4,
                            noExport: true
                        },
                        {
                            name: "leads",
                            title: this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_702'),
                            selected: true,
                            required: false,
                            sort: 5,
                            noExport: true
                        },
                        {
                            name: "vleads",
                            title: this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_703'),
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
                            title: this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_704'),
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
                            title: this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_705'),
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
                            title: this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_706'),
                            selected: true,
                            required: false,
                            sort: 12,
                            noExport: true
                        }
                    ]
                },
                tableData: []
            };
        },
        computed: {
            ...mapState(["app",'buttonPerm', 'tenant']),
            myButtonPrem() {
                return this.buttonPerm["crm.activityEnrollment"] || [];
            }
        },
        mounted() {
            waitUntil(
                () => {
                    return (
                        JSON.stringify(this.buttonPerm) != "{}" ||
                        false
                    );
                },
                () => {
                    this.id = this.$route.query.activityId
                    this.status = this.$route.query.isEnable == '1' ? '有效' : this.$route.query.isEnable == '0' ? '无效' : ''
                    
                    if(this.myButtonPrem.indexOf('cusEnroll') > -1){
                        this.btnList0 = [
                            {
                                btnClick: this.showPop,
                                text: "新资源报名"
                            },
                            {
                                btnClick: this.ImportingResource,
                                text: "导入新资源"
                            },
                        ]
                    }
                    if(this.myButtonPrem.indexOf('vipEnroll') > -1){
                        this.btnList1 = [
                            {
                                btnClick: this.showInfo,
                                text: "创建会员"
                            },
                            {
                                btnClick: this.ImportingMember,
                                text: "导入会员"
                            },
                        ]
                    }
                    
                    this.getForm(this.id)
                    if(this.$route.query.change == '1'){
                        this.tabSlot = '1'
                        this.changeTableType('1');
                    }else{
                        this.changeTableType('0');
                        this.tabSlot = '0'
                    }
                }
            );
        },
        methods: {
            ...mapMutations(["updateLoadingStatus"]),
            ImportingMember(){
                this.$router.push({ name: "crm.activityImport" ,query:{activityId:this.$route.query.activityId,qr:this.$route.query.qr,isEnable:this.$route.isEnable}});
            },
            ImportingResource(){
                this.$router.push({ name: "crm.newResourceImport" ,query:{activityId:this.$route.query.activityId,qr:this.$route.query.qr,isEnable:this.$route.isEnable}});
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
            refreshFn(){
                // console.log('lizhi')
                this.getListData('1')
            },
            formatTime(time) {
                let times = new Date(time).format("yyyy-MM-dd hh:mm:ss");
                return times;
            },
            toEdit(){
                this.$router.push({
                    name:"crm.createEvent",
                    query: {
                        id:this.id,
                        isEnable:this.$route.query.isEnable,
                        qr:this.$route.query.qr
                    }
                })
            },
            setQrCode() {
                this.$nextTick(() => {
                    let ele = document.querySelector("#detailImgQrdiv");
                    this.showQRCode(
                        ele,
                        window.location.origin + "/#/h5Form.html?id=" + this.qrId +"&channelId=" + this.channelId + "&tenant=" + (this.tenant || localStorage.getItem('tenant'))
                    );
                    // ele.title = ''
                });
            },
            // 生成二维码
            showQRCode(ele, url) {
                //ele元素  具体生成二维码对应的url
                // this.$nextTick(() => {
                // dom元素更新后执行， 因此此处能正确打印出更改之后的值；
                let qrcode = new QRCode(ele, {
                    // text: "https://www.iviewui.com/docs/guide/install",
                    text: url,
                    width: 180,
                    height: 180,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.H
                });
                // });
            },
            getListData(key) {
                this.updateLoadingStatus({ isLoading: true });
                let param = {
                    pageNo: this.pageNo,
                    pageSize: this.pageSize,
                    id:this.id,
                };
                let fn= null;
                if(key != '2'){
                    param.isMember = key == '0' ? '0' : '1'
                }else{
                    param.isFilte = this.setSource ? '1' :'0'
                }
                if(key != '2'){
                    fn = crmActivity.listEnrolls(param)
                }else{ //配置人员列表
                    fn = crmActivity.listChannels(param)
                }
                fn.then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let result = res.data.data;
                        // console.log(result)
                        this.tableData = result.list;
                        this.dataTotal = result.total;
                        if (this.tableType == "2") {
                            //根据数据生成列表数据二维码
                            for (let n = 0; n < this.tableData.length; n++) {
                                // this.tableData[n].code = n + 1;
                                this.$nextTick(() => {
                                    let imgsrc = document.getElementsByClassName(
                                        "imgClass"
                                    );
                                    this.showQRCode(
                                        imgsrc[n],
                                        window.location.origin +
                                        "/#/h5Form.html?id=" +
                                        this.tableData[n].qrId +
                                        "&channelId=" +
                                        this.tableData[n].channelId +
                                        "&tenant=" + (this.tenant || localStorage.getItem('tenant'))
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
            getForm(id){ //获取详情信息
                this.updateLoadingStatus({ isLoading: true });
                crmActivity.form({id:this.id})
                .then(valid.call(this))
                .then((res) => {
                    if(res.ok){
                        this.formData = res.data.data
                        this.qrId = this.formData.qrId
                        this.channelId = this.formData.channelId
                        this.setQrCode()
                    }
                })
                .then(errors.call(this))
                .finally(() => {
                    // console.log(this.qrId)
                    this.updateLoadingStatus({ isLoading: false });
                })
            },
            bigImgSrcFn(type,src,tableStatus){ //展示二维码
                console.log(tableStatus)
                // console.log(document.querySelector('.detail-img-qrdiv img'))
                let srcStr = {};
                if(type == '1'){
                    srcStr = { src:document.querySelector('#detailImgQrdiv img').src}
                } else if (type == '0') {
                    srcStr = { src:document.querySelector('#detailImgQrdivCopy img').src}
                } else if (type == 4) {
                    // title = "二维码";
                    let imgSrc = document
                    .querySelectorAll(".imgClass")[src].querySelectorAll("img")[0].src;
                    srcStr = { src:imgSrc}

                } else{
                    srcStr = { src:src}
                }
                if(tableStatus == '1'){
                    this.$refs.viewIMGId.show(srcStr,this.status,'1')
                }else{
                    this.$refs.viewIMGId.show(srcStr,this.status)
                }
            },
            showPop() {
                this.$router.push({
                    name:'crm.leadsEntry',
                    query:{
                        activityId:this.id,
                        source:'crm.activityEnrollment.detial',
                        qr:this.$route.query.qr,
                        isEnable:this.$route.query.isEnable
                    }
                })
                // this.$refs.newResource.showModal({key:'newSrc',name:'新资源报名'})
            },
            showInfo() {
                this.$refs.memberRegistration.showModal({
                    activityId:this.id,
                    qrId:this.qrId,
                    qr:this.$route.query.qr,
                    isEnable:this.$route.query.isEnable
                })
            },
            setSourceFn() {
                // console.log(this.setSource)
                this.getListData('2')
            },
            changeTableType(val) { //根据tab 展示按钮
                // console.log(val)
                this.tableType = val;//控制表格右侧按钮显示
                // this.updateLoadingStatus({ isLoading: true });
                this.tableColumnArray = [].concat(this["tableColumnArray" + val]);
                // this.getShowTitle(true);
                this.defaultShowCol = Object.assign({},this['cols'+val])
                if (val == "0") {
                    this.btnList = this.$route.query.isEnable == '0'?[] : this.btnList0
                    this.getListData('0')
                } else if(val == "1"){ //创建会员
                    this.btnList = this.$route.query.isEnable == '0'?[] : this.btnList1
                    this.getListData('1')
                } else {
                    this.btnList = this.$route.query.isEnable == '0'?[] : this.btnList2
                    this.getListData('2')
                }
            },
            //可选方法，如果是多选的话必须有
            selectionChange(selection) {
                this.selection = selection;
            },
            changeType(val) {
                this.findObj.courseGrade = "";
            },
            SignTimeChange(date) {
                this.findObj.optTimeStart = date[0] ? date[0] + " 00:00:00" : "";
                this.findObj.optTimeEnd = date[1] ? date[1] + " 23:59:59" : "";
            },
            //获取数据，根据情况修改接口、传参
            SearchList() {
                this.pageNo = 1;
                this.getListData(this.tableType);
            },
            //分页方法 如果有分页则为必须方法，修改getCourseList为自己的获取数据方法 这里注意。不再有每页个数改变的方法了
            pageChange(pageNo, pageSize) {
                if (!pageNo) {
                    //防止无用重复请求
                    return;
                }
                this.pageNo = pageNo;
                this.pageSize = pageSize;
                this.getListData(this.tableType);
            },
            resetSearch() {
                this.optTime = "";
                for (let item in this.findObj) {
                    this.findObj[item] = "";
                }
                this.pageNo = 1;
                this.getListData(this.tableType);
            }
        },
    };
</script>