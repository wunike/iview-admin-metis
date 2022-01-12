<style lang="less">
.colorStyle {
    color: #999;
    font-size: 14px;
}
.createQrCodeStyle {
    .ivu-card:hover {
        box-shadow: none;
    }
    .pageInfo {
        .title {
            margin: 8px 0 20px 16px;
            font-weight: 800;
            color: rgba(73, 80, 96, 1);
            & + div > span {
                .colorStyle;
            }
        }
        .title1 {
            margin: 16px 0 16px 16px;
        }

        .classInfoStyle {
            .ivu-form-item-label {
                .colorStyle;
            }
            display: flex;
            justify-content: flex-start;
            // margin-left: 60px;
            .colorStyle;
            .userTargetInner {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                // height: 33px;
                > span {
                    display: inline-block;
                    font-size: 12px;
                    color: rgba(73, 80, 96, 1);
                    background: rgba(235, 236, 240, 1);
                    border-radius: 4px;
                    padding: 0px 12px;
                    margin-right: 8px;
                    margin-top: 2px;
                }
            }
            .logoStyle {
                .ivu-form-item-content {
                    display: flex;
                    .ivu-upload-list-file-finish {
                        display: flex;
                        align-items: center;
                    }
                    // .ivu-upload-list-remove {
                    //     display: none;
                    // }
                }
            }
            .isDefined {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100px;
                height: 180px;
                background: #ebecf0;
                cursor: pointer;
                // box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.15);
                border-radius: 4px;
                .ivu-upload-list {
                    position: absolute;
                    bottom: -30px;
                    left:0px;
                    width: 150px;
                    .ivu-progress {
                        width: 150px;
                    }
                    .ivu-upload-list-file>span{
                        display:none;
                    }
                }
                &.isDefinedHasPosterImg{
                    .imgPop {
                        position: relative;
                        .upload_modal{
                            width:90px;
                            height:160px;
                            justify-content:space-around;
                            align-items: center;
                            background-color: transparent;
                            display: none;
                            z-index: 11;
                            background-color: rgba(0,0,0,.5);
                        }
                        .posterLogo{
                            position: absolute;
                            background-size: cover;

                            background-color: #FFFFFF;
                        }
                        .posterQRCode{
                            position: absolute;
                        }
                    }
                    .ivu-upload:hover .imgPop {
                        .upload_modal{
                            display:flex;
                        }
                    }
                }

                &.isDefinedHasImg {
                    .imgPop {
                        .upload_modal{
                            width:90px;
                            z-index: 11;
                            height:60px;
                            justify-content:space-around;
                            align-items: center;
                            background-color: transparent;
                            display: none;
                        }
                    }
                    .ivu-upload:hover .imgPop {
                        .upload_modal{
                            display:flex;
                            background-color: rgba(0,0,0,.5);
                        }
                    }
                }
            }
        }
    }
}
.QrModelStyle,.posterModelStyle{
    .ivu-modal-header{
        display: none;
    }
    .ivu-modal-close{
        right: -24px;
        top: -24px;
        i{
            &.ivu-icon-ios-close{color: #F0F0F0;
            }
        }
    }
    .ivu-modal-content{
        .ivu-modal-body{
            padding: 0;
            .QrModelStyle_body{
                position: relative;
                height: 568px;
                .preview_Qrcode_box{
                    position: absolute;
                    top: 0;
                    right: -140px;
                    width: 122px;
                    height: 160px;
                    background: #FFFFFF;
                    border-radius: 4px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px;
                    .tit{
                        font-size: 12px;
                        font-family: Source Han Sans CN;
                        font-weight: 400;
                        color: #333333;
                    }
                    .posterQRCode{
                        margin: 10px 0;
                    }
                    .warn{
                        font-size: 10px;
                        font-family: Source Han Sans CN;
                        font-weight: 400;
                        color: #333333;
                    }
                }
                .scroll_hide{
                    width: 320px;
                    height: 100%;
                    overflow: hidden;
                    position: relative;
                    .h5Form{
                        width: 329px;
                    }
                }
            }
        }
    }
}
.QrModelStyle{
}
.posterModelStyle{
    .posterModelBody{
        position: relative;
        height: 568px;
        background-image: url(${formValidate.posterUrl});
        background-size: cover;
        background-repeat: no-repeat;
    }
}

</style>
<template>
    <div class="createQrCodeStyle">
        <Form ref="formRef" :model="formValidate" :rules="ruleValidate" :label-width="130">
            <Card :bordered="false">
                <div class="pageInfo">
                    <div class="title title1">{{$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1506')}}</div>
                    <Row class-name="classInfoStyle">
                        <Col span="8">
                            <FormItem
                                :label="$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1507')"
                                prop="belongOfficeId"
                                :rules="{required: true, message: $t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1508'), trigger: 'change'}"
                            >
                                <Select
                                    :placeholder="$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1509')"
                                    v-model="formValidate.belongOfficeId"
                                    @on-change="classroomIdChange"
                                    filterable
                                >
                                    <Option
                                        v-for="item in officeIdList"
                                        :value="item.id"
                                        :key="item.id"
                                    >{{ item.code }}{{ item.name }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem
                                :label="$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1510')"
                                prop="ownerOffice"
                                :rules="{required: true, message: $t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1511'), trigger: 'change'}"
                            >
                                <Select
                                    :placeholder="$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1512')"
                                    v-model="formValidate.ownerOffice"
                                    @on-change="ownerOfficeChange"
                                    filterable
                                >
                                    <Option
                                        v-for="item in officeIdList"
                                        :value="item.id"
                                        :key="item.id"
                                    >{{ item.code }}{{ item.name }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem
                                :label="$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1513')"
                                prop="ownerId"
                                :rules="{required: true, message: $t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1514'), trigger: 'change'}"
                            >
                                <Select not-found-text="登记人需要先分配市场角色" :placeholder="$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1515')" v-model="formValidate.ownerId">
                                    <Option
                                        v-for="item in ownerIdList"
                                        :value="item.id"
                                        :key="item.id"
                                    >{{ item.name }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row class-name="classInfoStyle">
                        <Col span="8">
                            <FormItem prop="sourceArray"
                                :rules="{required: true,  type: 'array', min: 1, message: $t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1516'), trigger: 'change'}"
                                :label="$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1517')">
                                <Cascader :data="sourceList" :placeholder="$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1518')" transfer filterable clearable v-model="formValidate.sourceArray"></Cascader>
                            </FormItem>
                        </Col>
                        <Col span="16">
                            <FormItem :label="$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1519')" prop="name" class="userTarget">
                                <div class="userTargetInner">
                                    <span v-for="item in userLabelData" :key="item">{{item}}</span>
                                    <userLabel
                                        ref="userLabelRef"
                                        :menuId="2001"
                                        :flag="0"
                                        :echoDisplay="true"
                                        :defaultCheckedTagids="formValidate.tags"
                                        @userLabelTrueChoose="userLabelTrueChoose"
                                    >
                                        <span slot="hasTagName">
                                            <Icon
                                                type="ios-create-outline"
                                                size="18"
                                                style="cursor:pointer"
                                            />
                                        </span>
                                    </userLabel>
                                </div>
                            </FormItem>
                        </Col>
                        <!-- <Col span="8">
                            <FormItem
                                :label="$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1520')"
                                prop="source1"
                                :rules="{required: true, message: $t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1516'), trigger: 'change'}"
                            >
                                <Select
                                    :placeholder="$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1521')"
                                    v-model="formValidate.source1"
                                    @on-change="source1Change"
                                >
                                    <Option
                                        v-for="item in crm_customer_source"
                                        :value="item.value"
                                        v-show="item.value!='referral'"
                                        :key="item.value"
                                    >{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem
                                :label="$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1522')"
                                prop="source2"
                                :rules="{required: true, message: $t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1516'), trigger: 'change'}"
                            >
                                <Select
                                    :placeholder="$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1523')"
                                    v-model="formValidate.source2"
                                    @on-change="source2Change"
                                >
                                    <Option
                                        v-for="item in crm_customer_source2"
                                        :value="item.value"
                                        :key="item.value"
                                    >{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem
                                :label="$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1524')"
                                prop="source3"
                                :rules="{required: true, message: $t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1516'), trigger: 'change'}"
                            >
                                <Select :placeholder="$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1525')" v-model="formValidate.source3">
                                    <Option
                                        v-for="item in crm_customer_source3"
                                        :value="item.value"
                                        :key="item.value"
                                    >{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                        </Col> -->
                    </Row>
                    <!-- <Row class-name="classInfoStyle">
                        <Col span="24">
                            <FormItem :label="$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1519')" prop="name" class="userTarget">
                                <div class="userTargetInner">
                                    <span v-for="item in userLabelData" :key="item">{{item}}</span>
                                    <userLabel
                                        ref="userLabelRef"
                                        :menuId="2001"
                                        :flag="0"
                                        @userLabelTrueChoose="userLabelTrueChoose"
                                    >
                                        <span slot="hasTagName">
                                            <Icon
                                                type="ios-create-outline"
                                                size="18"
                                                style="cursor:pointer"
                                            />
                                        </span>
                                    </userLabel>
                                </div>
                            </FormItem>
                        </Col>
                    </Row> -->
                </div>
            </Card>
            <Card :bordered="false" style="margin-top: 10px;">
                <div class="pageInfo">
                    <div class="title title1">{{$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1526')}}</div>
                    <Row class-name="classInfoStyle">
                        <Col span="24">
                            <FormItem
                                :label="$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1561')"
                                prop="classroomId"
                                :rules="{required: false, message: $t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1528'), trigger: 'change'}"
                            >
                                <div style="display:flex;align-items: center;">
                                        <Upload
                                            ref="pageRef"
                                            style="width:90px;height:160px;display:flex;justify-content:center;align-items: center;"
                                            :class="{isDefined:true, isDefinedHasPosterImg:formValidate.posterUrl}"
                                            :action="uploadImg"
                                            :format="['jpg','png','jpeg','gif']"
                                            :on-format-error="posterHandleFormatError"
                                            name="file"
                                            :headers="headers"
                                            :show-upload-list="pageTemplateList"
                                            :data="uploadData"
                                            :before-upload="posterHandleBefore"
                                            :on-success="posterHandleSuccess"
                                            :on-exceeded-size="handleSizeError"
                                            :max-size="2048"
                                        >
                                            <div
                                                class="imgPop"
                                                :style="`width:90px;height:160px;display:flex;justify-content:center;align-items: center;background-image: url(${formValidate.posterUrl});background-size: cover;background-repeat: no-repeat;`"
                                            >
                                                <div class="posterLogo" :style="{width:posterLogoWidth,height:posterLogoHeight,left:posterLogoLeft,top:posterLogoTop,'background-image':(formValidate.logoUr?`url(${this.formValidate.logoUr})`:'#ffffff'),'background-size': 'cover','background-repeat': 'no-repeat'}" v-if="formValidate.posterUrl"></div>
                                                <div class="posterQRCode detailImgQrdiv" :style="{width:posterQRCodeWidth,height:posterQRCodeHeight,left:posterQRCodeLeft,top:posterQRCodeTop,'background':'#ffffff','background-size': 'cover','background-repeat': 'no-repeat'}" v-if="formValidate.posterUrl"></div>
                                                <div class="upload_modal" v-if="formValidate.posterUrl" style="">
                                                    <span @click.stop="editorPoster" style="color:#FFF;font-weight: 600;cursor: pointer;">
                                                        <Icon
                                                        type="ios-create-outline"
                                                        size="20"
                                                        ></Icon>
                                                    </span>
                                                    <span
                                                        @click.stop="closePosterUrl"
                                                        style="color:#FFF;font-weight: 600;cursor: pointer;"
                                                    >
                                                        <Icon
                                                            type="md-close"
                                                            size="20"
                                                        ></Icon>
                                                    </span>
                                                </div>
                                                <Icon
                                                    type="ios-add"
                                                    size="16"
                                                    style="color: #3399ff;color:#999999;border:1px solid #999;font-weight: 600;"
                                                    v-else
                                                ></Icon>
                                            </div>
                                        </Upload>
                                    <div
                                        style="margin-left:14px;margin-right:5px;color:rgba(0,0,0,0.45);font-size:14px;"
                                    >{{$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1529')}}</div>
                                    <Poptip trigger="hover" title="">
                                        <Icon type="ios-information-circle" class="IconStyle" />
                                        <div class="api" slot="content">{{$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1530')}}</div>
                                    </Poptip>
                                </div>
                            </FormItem>
                            <FormItem
                                class="logoStyle"
                                :label="$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1541')"
                                prop="logoUr"
                                :rules="{required: false, message: $t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1528'), trigger: 'change'}"
                            >
                                <Upload
                                    :default-file-list="defaultList"
                                    :action="uploadImg"
                                    :show-upload-list="true"
                                    name="file"
                                    :headers="headers"
                                    :format="['jpg','png','jpeg','gif']"
                                    :before-upload="logoHandleBefore"
                                    :on-format-error="handleFormatError1"
                                    :on-success="HandleSuccess1"
                                    :on-remove="HandleRemove"
                                    :data="uploadData1"
                                >
                                    <!--   :on-format-error="FormatError1"
                                    :format="['ico']"
                                    :default-file-list="systenUrl"
                                    :before-upload="detailBeforeUpload"
                                    :on-progress="progressUpload"
                                    -->
                                    <Button icon="ivu-icon ivu-icon-ios-cloud-upload-outline">{{$t('modules_spoc_core_web_src_views_announcement_addannouncement_63')}}</Button>
                                </Upload>
                                <span
                                    style="font-size:14px;color:#999;margin-left:21px"
                                >{{$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1543')}}</span>
                            </FormItem>
                            <FormItem
                                :label="$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1539')"
                                prop="title"
                                :rules="{required: false, message: $t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1528'), trigger: 'change'}"
                            >
                                <Input
                                    :placeholder="$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1540')"
                                    v-model="formValidate.title"
                                    style="width:254px"
                                />
                            </FormItem>
                            <FormItem
                                :label="$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1557')"
                                prop="welcomeMsg"
                                :rules="{required: false, message: $t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1528'), trigger: 'change'}"
                            >
                                <Input
                                    :placeholder="$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1558')"
                                    v-model="formValidate.welcomeMsg"
                                    style="width:254px"
                                />
                            </FormItem>
                            <FormItem
                                :label="$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1527')"
                                prop="classroomId"
                                :rules="{required: false, message: $t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1528'), trigger: 'change'}"
                            >
                                <div style="display:flex;align-items: center;">
                                    <!-- <RadioGroup v-model="phone" style="display:flex;"> -->
                                    <!-- <div
                                        v-if="formValidate.url"
                                        class="isDefined isDefinedHasImg"
                                        :style="{
                                            'background-image': 'url('+formValidate.url+')',
                                            'background-size': '100% auto',
                                            'background-repeat': 'no-repeat'
                                        }"
                                    > -->
                                        <!-- :max-size="2048"
                                        -->
                                        <!-- :before-upload="detailBeforeUpload" -->
                                        <Upload
                                            ref="pageRef"
                                            style="width:90px;height:60px;display:flex;justify-content:center;align-items: center;"
                                            :class="{isDefined:true, isDefinedHasImg:formValidate.url}"
                                            :action="uploadImg"
                                            :format="['jpg','png','jpeg','gif']"
                                            :on-format-error="handleFormatError"
                                            name="file"
                                            :headers="headers"
                                            :show-upload-list="pageTemplateList"
                                            :data="uploadData"
                                            :before-upload="HandleBefore"
                                            :on-success="HandleSuccess"
                                            :on-exceeded-size="handleSizeError"
                                            :max-size="2048"
                                        >
                                            <div
                                                class="imgPop"
                                                :style="`width:90px;height:60px;display:flex;justify-content:center;align-items: center;background-image: url(${formValidate.url});background-size: cover;background-repeat: no-repeat;`"
                                            >
                                                <div class="upload_modal" v-if="formValidate.url" style="">
                                                    <!-- <Icon
                                                        type="ios-create-outline"
                                                        size="20"
                                                        style="margin:0 auto 8px;color:#FFF;font-weight: 600;cursor: pointer;"
                                                    ></Icon> -->
                                                    <span
                                                        @click.stop="closeUrl"
                                                        style="color:#FFF;font-weight: 600;cursor: pointer;"
                                                    >
                                                        <Icon
                                                            type="md-close"
                                                            size="20"
                                                        ></Icon>
                                                    </span>
                                                </div>
                                                <Icon
                                                    type="ios-add"
                                                    size="16"
                                                    style="color: #3399ff;color:#999999;border:1px solid #999;font-weight: 600;"
                                                    v-else
                                                ></Icon>
                                            </div>
                                        </Upload>
                                    <!-- </div> -->
                                    <!--<div v-else class="isDefined">
                                        <Upload
                                            ref="pageRef"
                                            style="width:100px;height:180px;justify-content:center;align-items: center;display:flex;position:relative"
                                            :action="uploadImg"
                                            :format="['jpg','png']"
                                            :on-format-error="handleFormatError"
                                            name="file"
                                            :headers="headers"
                                            :show-upload-list="pageTemplateList"
                                            :data="uploadData"
                                            :before-upload="HandleBefore"
                                            :on-success="HandleSuccess"
                                            :on-exceeded-size="handleSizeError"
                                            :max-size="2048"
                                        >
                                            <div
                                                style="display:flex;justify-content:center;align-items:center;width:100px;height:180px;text-align:center"
                                            >
                                                <Icon
                                                    type="ios-add"
                                                    size="16"
                                                    style="color: #3399ff;margin:0 auto 8px;color:#999999;border:1px solid #999;font-weight: 600;"
                                                ></Icon>
                                            </div>
                                        </Upload>
                                    </div>-->
                                    <div
                                        style="margin-left:14px;margin-right:5px;color:rgba(0,0,0,0.45);font-size:14px;"
                                    >{{$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1560')}}</div>
                                    <Poptip trigger="hover" title="">
                                        <Icon type="ios-information-circle" class="IconStyle" />
                                        <div class="api" slot="content">{{$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1559')}}</div>
                                    </Poptip>
                                </div>
                            </FormItem>
                            <FormItem :label="$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1531')">
                                <RadioGroup v-model="formValidate.position">
                                    <Radio label="0">{{$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1532')}}</Radio>
                                    <Radio label="1">{{$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1533')}}</Radio>
                                </RadioGroup>
                            </FormItem>
                            <FormItem
                                :label="$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1534')"
                                prop="fromData"
                                :rules="{type:'array',min:1, message:$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1535'), trigger: 'change'}"
                            >
                                <div
                                    class="userTargetInner"
                                    style="display:flex;align-items:center;min-height:33px;"
                                >
                                    <span
                                        v-for="(item,index) in valSelect"
                                        :key="index"
                                    >{{item.name}}</span>
                                    <!-- <span>{{$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1536')}}</span> -->
                                    <Icon
                                        type="ios-create-outline"
                                        size="18"
                                        :style="{marginLeft:valSelect.length?'9px':'',cursor:'pointer'}"
                                        @click="showPageFields"
                                    />
                                    <pageFields
                                        :formList="formValidate.fromData"
                                        ref="pageFieldRef"
                                        @chooseDetailMethod="chooseDetailMethod"
                                    ></pageFields>
                                </div>
                            </FormItem>
                            <FormItem :label="$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1537')" v-if="formValidate.fromData.find(v=>v.field=='visibleOffice')">
                                <Select
                                    :placeholder="$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1538')"
                                    v-model="visibleOffice"
                                    :label-in-value="true"
                                    filterable
                                    clearable
                                    multiple
                                    @on-change="visibleOfficeChange"
                                    style="width:254px"
                                >
                                    <Option
                                        v-for="item in officeIdList"
                                        :value="item.id"
                                        :key="item.id"
                                    >{{ item.code }}{{ item.name }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label prop>
                                <div style="margin-top:18px">
                                    <Button type="primary" @click="saveBtn">{{$t('courselist_compontents_servicecontent_215')}}</Button>
                                    <Button
                                        style="margin-left:12px"
                                        type="primary"
                                        @click="lookPosterBtn"
                                    >{{$t('modules_spoc_core_web_src_views_tasktemplate_index_455')}}</Button>
                                    <Button
                                        style="margin-left:12px"
                                        type="primary"
                                        @click="lookBtn"
                                    >{{$t('modules_spoc_core_web_src_views_tasktemplate_index_456')}}</Button>
                                    <Button style="margin-left:12px" @click="cancelBtn">{{$t('classroom_allscore_53')}}</Button>
                                </div>
                            </FormItem>
                        </Col>
                    </Row>
                </div>
            </Card>
        </Form>
        <Modal
            v-model="modal1"
            @on-ok="ok"
            width="320"
            :mask-closable="false"
            class-name="QrModelStyle"
            footer-hide
        >
            <div slot="header" style="text-align:center">
                {{formValidate.title||$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1547')}}
            </div>
            <div style="" class="QrModelStyle_body">
                <div class="preview_Qrcode_box">
                    <div class="tit">扫码预览</div>
                    <div class="posterQRCode detailImgQrdiv" :style="{width:`${posterViewQRCodeWidth}px`,height:`${posterViewQRCodeHeight}px`,'background':'#ffffff','background-size': 'cover','background-repeat': 'no-repeat'}"></div>
                    <div class="warn">仅供预览 请勿传播</div>
                </div>
                <div class="scroll_hide">
                    <h5Form ref="h5FormRef" :formData="formValidate"></h5Form>
                </div>
            </div>

            <!-- <div slot="footer"> -->
                <!-- <Button @click="modal1=false">{{$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1548')}}</Button> -->
                <!-- <Button @click="cancelImg" v-if="titleVal==2||titleVal==3">{{$t('classroom_allscore_53')}}</Button>
                <Button @click="OkBtn" v-if="titleVal==2||titleVal==3" type="primary">{{$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1549')}}</Button>-->
            <!-- </div> -->
        </Modal>
        <Modal
            v-model="posterModal"
            @on-ok="posterOk"
            width="320"
            :mask-closable="false"
            class-name="posterModelStyle"
            footer-hide
        >
            <div slot="header" style="text-align:center">
                海报编辑
            </div>
            <div class="posterModelBody" :style="{'background-image': `url(${this.formValidate.posterUrl})`}">
                 <!-- dragCancel=".drag" -->
                <VueDragResize :isDraggable="isDraggable" :parentLimitation="true" :isResizable="false" :parentW="320" :parentH="568" :w="posterViewLogoWidth" :h="posterViewLogoHeight" :minw="0" :minh="0" :x="posterViewLogoLeft" :y="posterViewLogoTop" @dragstop="onLogoDragstop" v-if="formValidate.logoUr">
                        <div class="posterViewLogo" :style="{width:`${posterViewLogoWidth}px`,height:`${posterViewLogoHeight}px`,'background-image':(formValidate.logoUr?`url(${this.formValidate.logoUr})`:'#ffffff'),'background-size': 'cover','background-repeat': 'no-repeat'}"></div>
                </VueDragResize>
                <VueDragResize :isDraggable="isDraggable" :parentLimitation="true" :isResizable="false" :parentW="320" :parentH="568" :w="posterViewQRCodeWidth" :h="posterViewQRCodeHeight" :minw="0" :minh="0" :x="posterViewQRCodeLeft" :y="posterViewQRCodeTop" @dragstop="onQRCodeDragstop">
                        <div class="posterViewQRCode detailImgQrdiv" :style="{width:`${posterViewQRCodeWidth}px`,height:`${posterViewQRCodeHeight}px`,'background-color':'#ffffff','background-size': 'cover','background-repeat': 'no-repeat'}"></div>
                </VueDragResize>
            </div>
        </Modal>
    </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import valid, {
    errors,
    common,
    sysUser,
    sysDict,
    sysAttachment,
    crmQrcode,
    api
} from "../../libs/request";
import { waitUntil } from "@public/libs/util";
import userLabel from "@public/modules/userLabel";
import pageFields from "./components/pageFields";
import h5Form from "../h5Form/h5Form";
import VueDragResize from 'vue-drag-resize'
import QRCode from "qrcodejs2";
export default {
    name: 'crm.createTopicPage',
    data() {
        return {
            posterModal:false,
            isActioning: false, //多次提交拦截
            pageTemplateList: false,
            modal1: false,
            defaultList: [
                // {
                //     'name': 'a42bdcc1178e62b4694c830f028db5c0',
                //     'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                // }
            ],

            crm_customer_source: [],
            crm_customer_source2: [],
            crm_customer_source3: [],
            formValidate: {
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
            logoWidth:'',
            logoHeight:'',
            officeIdList: [],
            ownerIdList: [],
            phone: "",
            userLabelData: [],
            valSelect: [],
            visibleOffice:[],
            sourceList: [],
            uploadData:{
                // type:'crmQrcode',
                // fileType:'image',
                // dirName:'all',
                // remarks:'',
                // menuId:'2001',
                // compressSize: 2048, // 压缩的大小单位kb
                // compressHeigth: 1920,
                // compressWeigth: 1080
                bizId: '',
                bizType: 'image',
                isSingle: true,
            },
            headers:{},
            uploadData1:{
                // type:'crmQrcode',
                // fileType:'image',
                // dirName:'all',
                // remarks:'',
                // menuId:'2001'
                bizId: '',
                bizType: 'image',
                isSingle: true,
            },
            isDraggable:true
        };
    },
    computed: {
        ...mapState(["app"]),
        uploadImg: function() {
            return api.fileAttachmentUploadUrl();
        },
        posterLogoWidth:function(){
            let ratio= 90/320;
            // if(this.logoWidth){
            //     return this.logoWidth*ratio+'px';
            // }else{
                return 86*ratio+'px';
            // }
        },
        posterLogoHeight:function(){
            let ratio1= 90/320;
            let ratio=86*ratio1/this.logoWidth;
            if(this.logoHeight){
                return this.logoHeight*ratio+'px';
            }else{
                return 16*ratio+'px';
            }
        },
        posterLogoLeft:function(){
            let ratio= 90/320;
            if(this.formValidate.posterLogoPointXy.x){
                return this.formValidate.posterLogoPointXy.x*ratio+'px';
            }else{
                return 30*ratio+'px';
            }
        },
        posterLogoTop:function(){
            let ratio= 90/320;
            if(this.formValidate.posterLogoPointXy.y){
                return this.formValidate.posterLogoPointXy.y*ratio+'px';
            }else{
                return 34*ratio+'px';
            }
        },
        posterViewLogoWidth:function(){
            let ratio= 1;
            // if(this.logoWidth){
            //     return this.logoWidth*ratio+'px';
            // }else{
                return 86*ratio;
            // }
        },
        posterViewLogoHeight:function(){
            let ratio1= 1;
            let ratio=86*ratio1/this.logoWidth;
            if(this.logoHeight){
                return parseInt(this.logoHeight*ratio);
            }else{
                return 16*ratio;
            }
        },
        posterViewLogoLeft:function(){
            let ratio= 1;
            if(this.formValidate.posterLogoPointXy.x){
                return this.formValidate.posterLogoPointXy.x*ratio;
            }else{
                return 30*ratio;
            }
        },
        posterViewLogoTop:function(){
            let ratio= 1;
            if(this.formValidate.posterLogoPointXy.y){
                return this.formValidate.posterLogoPointXy.y*ratio;
            }else{
                return 34*ratio;
            }
        },
        posterQRCodeWidth:function(){
            let ratio= 90/320;
            return 70*ratio+'px';
        },
        posterQRCodeHeight:function(){
            let ratio= 90/320;
            return 70*ratio+'px';
        },
        posterQRCodeLeft:function(){
            let ratio= 90/320;
            if(this.formValidate.posterQrCodePointXy.x){
                return this.formValidate.posterQrCodePointXy.x*ratio+'px';
            }else{
                return 220*ratio+'px';
            }
        },
        posterQRCodeTop:function(){
            let ratio= 90/320;
            if(this.formValidate.posterQrCodePointXy.y){
                return this.formValidate.posterQrCodePointXy.y*ratio+'px';
            }else{
                return 480*ratio+'px';
            }
        },
        posterViewQRCodeWidth:function(){
            let ratio= 1;
            return 70*ratio;
        },
        posterViewQRCodeHeight:function(){
            let ratio= 1;
            return 70*ratio;
        },
        posterViewQRCodeLeft:function(){
            let ratio= 1;
            if(this.formValidate.posterQrCodePointXy.x){
                return this.formValidate.posterQrCodePointXy.x*ratio;
            }else{
                return 220*ratio;
            }
        },
        posterViewQRCodeTop:function(){
            let ratio= 1;
            if(this.formValidate.posterQrCodePointXy.y){
                return this.formValidate.posterQrCodePointXy.y*ratio;
            }else{
                return 480*ratio;
            }
        },
    },
    components: {
        userLabel,
        pageFields,
        h5Form,
        VueDragResize
    },
    mounted() {
        this.headers = {
            token: localStorage.getItem('token'),
            tenant: localStorage.getItem('tenant')
        }
        this.getSchool();
        this.batchListDataFn();
        this.getSource();
        if(this.$route.query.channelId||this.$route.query.id){
            this.getInfo();
        }
    },
    methods: {
        ...mapMutations(["updateLoadingStatus",'closeTag']),
        getInfo() {
            let params = {
                channelId: this.$route.query.channelId,
                id: this.$route.query.id
            };
            crmQrcode
                .form(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let obj=res.data.data
                        obj.fromData=JSON.parse(obj.fromData);
                        obj.tags=JSON.parse(obj.tags);
                        obj.sourceArray=JSON.parse(obj.source);
                        obj.posterLogoPointXy = JSON.parse(obj.posterLogoPointXy);
                        obj.posterQrCodePointXy = JSON.parse(obj.posterQrCodePointXy);
                        this.formValidate = obj;
                        let list = obj.fromData.find(v=>v.field=='visibleOffice').options.map(v=>v.value);
                        this.visibleOffice=list;
                        if(obj.logoUr){
                            let _this=this;
                            let path =obj.logoUr.split("/");
                            this.defaultList=[
                                {
                                    name: path[path.length-1],
                                    url: obj.logoUr
                                }]
                            let img = new Image();
                            img.onload = function () {
                                _this.logoWidth = img.width;
                                _this.logoHeight = img.height;
                            }
                            img.src = obj.logoUr;
                        }
                        this.getListDataByRole();
                    }else{
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
        },
        getSource(){
            let params={
                type: 'crm_customer_source',
            }
            sysDict
            .getTypeTree(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.sourceList=res.data.data.children;
                }
            })
            .catch(errors.call(this))
            .finally(() => {
                this.updateLoadingStatus({ isLoading: false });
            });
        },
        visibleOfficeChange(obj){
            let arr=[];
            // console.log(obj,123);
            // this.officeIdList.forEach(val=>{
            //     if(val.id==obj.value){
            //         arr.push({value:val.value,label:(val.code?val.code:'')+' '+val.name});
            //     }
            // });
            // console.log(arr,234);
            this.formValidate.fromData.find(v=>v.field=='visibleOffice').options=obj;
        },
        detailBeforeUpload(file) {
            this.$refs.pageRef.clearFiles();
            this.pageTemplateList = true;
            if(file.name.endsWith('.jpg')||file.name.endsWith('.png')){
                return this.checkImageWH(file, 9, 16);
            }
        },
        //checkImageWH  返回一个promise  检测通过返回resolve  失败返回reject组织图片上传
        checkImageWH(file, width, height) {
            let self = this;
            return new Promise(function(resolve, reject) {
                let filereader = new FileReader();
                filereader.onload = e => {
                    let src = e.target.result;
                    const image = new Image();
                    image.onload = function() {
                        if (
                            width &&
                            height &&
                            this.width / this.height > width / height
                        ) {
                            self.$Notice.error({
                                title: this.$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1550', [width,height])
                            });
                            this.pageTemplateList = false;
                            reject();
                        } else if (height && this.height < 750) {
                            self.$Notice.error({
                                title: this.$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1551')
                            });
                            this.pageTemplateList = false;
                            reject();
                        } else {
                            resolve();
                        }
                    };
                    image.onerror = reject;
                    image.src = src;
                };
                filereader.readAsDataURL(file);
            });
        },
        lookBtn() {
            // if (this.formValidate.fromData.length) {
                this.$refs.formRef.validate(validRes => {
                    if (validRes) {
                        // delete this.formValidate.source1;
                        // delete this.formValidate.source2;
                        // delete this.formValidate.source3;

                        this.formValidate.source = this.formValidate.sourceArray.join(',')
                        // delete this.formValidate.sourceArray;
                        let Obj = Object.assign({}, this.formValidate);
                            Obj = JSON.parse(JSON.stringify(Obj));
                        Obj.posterLogoPointXy = JSON.stringify(Obj.posterLogoPointXy);
                        Obj.posterQrCodePointXy = JSON.stringify(Obj.posterQrCodePointXy);
                        Obj.fromData = JSON.stringify(Obj.fromData);
                        if(this.isActioning){ //多次提交拦截
                            return
                        }
                        this.isActioning = true
                        this.updateLoadingStatus({ isLoading: true });
                        crmQrcode
                            .saveTempByRedis(Obj)
                            .then(valid.call(this))
                            .then(res => {
                                if (res.ok) {
                                    this.modal1 = true;
                                    this.$refs.h5FormRef.getFormDataFn(this.formValidate);
                                    this.$refs.h5FormRef.getInfo();
                                    this.$nextTick(() => {
                                        let ele = document.querySelectorAll(".detailImgQrdiv");
                                        ele.forEach(v=>{
                                            v.innerHTML = "";
                                            this.showQRCode(
                                                v,
                                                window.location.origin +
                                                    "/#/h5Form.html?id=" +
                                                    res.data.data +
                                                    "&isRedisGet=1" +
                                                    "&channelId=" +
                                                    '' +
                                                    "&tenant=" + (this.tenant || localStorage.getItem('tenant'))
                                            );
                                        })
                                    });
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
                });

            // }
        },
        lookPosterBtn(){
            this.$refs.formRef.validate(validRes => {
                if (validRes) {
                    // delete this.formValidate.source1;
                    // delete this.formValidate.source2;
                    // delete this.formValidate.source3;

                    this.formValidate.source = this.formValidate.sourceArray.join(',')
                    // delete this.formValidate.sourceArray;
                    let Obj = Object.assign({}, this.formValidate);
                        Obj = JSON.parse(JSON.stringify(Obj));
                    Obj.posterLogoPointXy = JSON.stringify(Obj.posterLogoPointXy);
                    Obj.posterQrCodePointXy = JSON.stringify(Obj.posterQrCodePointXy);
                    Obj.fromData = JSON.stringify(Obj.fromData);
                    if(this.isActioning){ //多次提交拦截
                        return
                    }
                    this.isActioning = true
                    this.updateLoadingStatus({ isLoading: true });
                    crmQrcode
                        .saveTempByRedis(Obj)
                        .then(valid.call(this))
                        .then(res => {
                            if (res.ok) {
                                this.$nextTick(() => {
                                    let ele = document.querySelectorAll(".detailImgQrdiv");
                                    ele.forEach(v=>{
                                        v.innerHTML = "";
                                        this.showQRCode(
                                            v,
                                            window.location.origin +
                                                "/#/h5Form.html?id=" +
                                                res.data.data +
                                                "&isRedisGet=1" +
                                                "&channelId=" +
                                                '' +
                                                "&tenant=" + (this.tenant || localStorage.getItem('tenant'))
                                        );
                                    })

                                });
                                this.isDraggable=false;
                                this.posterModal=true;
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
            });
        },
        chooseDetailMethod(data) {
            this.formValidate.fromData = data; //JSON.stringify();
            console.log('O%',data)
            this.$refs.formRef.validateField("fromData");
            this.valSelect = data.filter((item, index) => {
                return item.editable == "1";
            });
        },
        saveBtn() {
            // this.formValidate.source = `${this.formValidate.source1},${this.formValidate.source2},${this.formValidate.source3}`;
            this.$refs.formRef.validate(validRes => {
                if (validRes) {
                    delete this.formValidate.source1;
                    delete this.formValidate.source2;
                    delete this.formValidate.source3;

                    this.formValidate.source = this.formValidate.sourceArray.join(',')
                    delete this.formValidate.sourceArray;
                    let Obj = Object.assign({}, this.formValidate);
                        Obj = JSON.parse(JSON.stringify(Obj));
                    Obj.posterLogoPointXy = JSON.stringify(Obj.posterLogoPointXy);
                    Obj.posterQrCodePointXy = JSON.stringify(Obj.posterQrCodePointXy);
                    Obj.fromData = JSON.stringify(Obj.fromData);
                    if(this.isActioning){ //多次提交拦截
                        return
                    }
                    this.isActioning = true
                    this.updateLoadingStatus({ isLoading: true });
                    crmQrcode
                        .save(Obj)
                        .then(valid.call(this))
                        .then(res => {
                            if (res.ok) {
                                this.$Message.success(res.data.message);
                                // this.getListData();
                                this.modal1 = false;
                                this.closeTag(this.$route)
                                this.$router.push({
                                    name: "crm.QrCodeEnrollment"
                                });
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
            });
        },
        source1Change() {
            this.crm_customer_source2 = [];
            this.formValidate.source2 = "";
            this.crm_customer_source3 = [];
            this.formValidate.source3 = "";
            this.batchListDataFn(1);
        },
        source2Change() {
            this.crm_customer_source3 = [];
            this.formValidate.source3 = "";
            this.batchListDataFn(2);
        },
        ownerOfficeChange() {
            this.formValidate.ownerId = "";
            this.getListDataByRole();
        },
        getListDataByRole() {
            /*
            用这个接口/a/ws/sys/user/listDataByRole?roleIds=3&pageSize=-1&officeIds=3
officeIds根据上面选的校区动态的，其他参数都不变
            */
            let obj = {
                roleIds: "3",//'1289126915386376192',
                pageSize: -1,
                officeIds: this.formValidate.ownerOffice
            };
            sysUser
                .listDataByRole(obj)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.ownerIdList = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    // this.updateLoadingStatus({ isLoading: false });
                });
        },
        batchListDataFn(val) {
            let types; //创建二维码的渠道   是字典查询，字典type是crm_customer_source;
            if (val == 1) {
                types = this.formValidate.source1;
            } else if (val == 2) {
                types = this.formValidate.source2;
            } else {
                types = "crm_customer_source";
            }
            sysDict
                .batchListData({
                    types
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        if (val == 1) {
                            this.crm_customer_source2 = res.data.data[types];
                        } else if (val == 2) {
                            this.crm_customer_source3 = res.data.data[types];
                        } else {
                            this.crm_customer_source = res.data.data.crm_customer_source;
                        }
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        getSchool() {
            //校区列表
            sysUser
                .dataScopeFilter()
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.officeIdList = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
        },
        handleSizeError(file, fileList) {
            this.$Message.error(this.$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1552'));
        },
        handleFormatError(file) {
            this.pageTemplateList = false;
            this.$Notice.warning({
                title: this.$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1553'),
                desc: this.$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1554') + file.name + this.$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1555')
            });
        },
        posterHandleFormatError(file) {
            this.pageTemplateList = false;
            this.$Notice.warning({
                title: this.$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1553'),
                desc: this.$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1554') + file.name + this.$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1555')
            });
        },
        handleFormatError1(file) {
            this.pageTemplateList = false;
            this.$Notice.warning({
                title: this.$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1553'),
                desc: this.$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1554') + file.name + this.$t('modules_spoc_crm_web_src_views_qrcodeenrollment_createqrcode_1556')
            });
        },
        HandleSuccess(response) {
            this.updateLoadingStatus({ isLoading: false });
            if(response.code === 0 && response.data && response.data.url){
                this.formValidate.url = response.data.url;
                this.$Message.success("上传成功");
            } else {
                this.$Message.error("上传失败");
            }
            // this.pageTemplateList = false;
        },
        posterHandleSuccess(response, file, fileList) {
            this.updateLoadingStatus({ isLoading: false });
            if(response.code === 0 && response.data && response.data.url){
                this.formValidate.posterUrl = response.data.url;
                // let _URL = window.URL || window.webkitURL;
                // let img = new Image();
                // img.onload = () => {
                //     this.logoWidth = img.width;
                //     this.logoHeight = img.height;
                // }
                // img.src = _URL.createObjectURL(file);
                this.$Message.success("上传成功");
            } else {
                this.$Message.error("上传失败");
            }
            // this.pageTemplateList = false;
        },
        HandleRemove() {
            this.formValidate.logoUr = "";
        },
        HandleSuccess1(response, file, fileList) {
            this.updateLoadingStatus({ isLoading: false });
            let _this=this;
            if(response.code === 0 && response.data && response.data.url){
                this.defaultList = [
                    {
                        name: response.data.filename,
                        url: response.data.url
                    }
                ];
                this.formValidate.logoUr = response.data.url;
                this.$Message.success("上传成功");
                let _URL = window.URL || window.webkitURL;
                let img = new Image();
                img.onload = function () {
                    _this.logoWidth = img.width;
                    _this.logoHeight = img.height;
                }
                img.src = response.data.url;
            } else {
                this.$Message.error("上传失败");
            }
        },
        showPageFields() {
            this.$refs.pageFieldRef.classShowMethods();
        },
        userLabelTrueChoose(data) {
            this.userLabelData = data.hasCheckedTagNames;
            this.formValidate.tags = data.hasCheckedTagids.join(",");
        },
        cancelBtn() {
            this.cancelBtn = true;
            this.$router.push({
                name: "crm.QrCodeEnrollment"
            });
        },
        closeUrl(){
            this.formValidate.url=null;
        },
        closePosterUrl(){
            this.formValidate.posterUrl=null;
        },
        editorPoster(){
            this.isDraggable=true;
            this.posterModal=true;
        },
        HandleBefore(file){
            let _this = this;
            let imgWidth="";
            let imgHeight="";
            const isSize = new Promise(function (resolve, reject) {
                let width = 1280;
                let height = 800;
                let _URL = window.URL || window.webkitURL;
                let img = new Image();
                img.onload = function () {
                    imgWidth = img.width;
                    imgHeight = img.height;
                    let valid = ((img.width / img.height) == (3/2));
                    valid ? resolve() : reject();
                }
                img.src = _URL.createObjectURL(file);
            }).then(() => {
                return file;
            }, () => {
                _this.$Message.warning({content: '上传文件的图片大小比例建议为3:2。当前上传图片的宽高分别为：'+imgWidth+'px和'+imgHeight+'px'})
                // return Promise.reject();
                return file
            });
            return true;
        },
        posterHandleBefore(file){
            let _this = this;
            let imgWidth="";
            let imgHeight="";
            const isSize = new Promise(function (resolve, reject) {
                let width = 1280;
                let height = 800;
                let _URL = window.URL || window.webkitURL;
                let img = new Image();
                img.onload = function () {
                    imgWidth = img.width;
                    imgHeight = img.height;
                    let valid = ((img.width / img.height) == (9/16));
                    valid ? resolve() : reject();
                }
                img.src = _URL.createObjectURL(file);
            }).then(() => {
                return file;
            }, () => {
                _this.$Message.warning({content: '上传文件的图片大小不合符标准,图片比例应为9:16。当前上传图片的宽高分别为：'+imgWidth+'px和'+imgHeight+'px'})
                return Promise.reject();
            });
            return isSize;
        },
        posterOk(){

        },
        onLogoDragstop(obj){
            this.formValidate.posterLogoPointXy.x=obj.left;
            this.formValidate.posterLogoPointXy.y=obj.top;
        },
        onQRCodeDragstop(obj){
            this.formValidate.posterQrCodePointXy.x=obj.left;
            this.formValidate.posterQrCodePointXy.y=obj.top;
        },
        showQRCode(ele, url) {
            //ele元素  具体生成二维码对应的url
            console.log(ele,123123)
            var qrcode = new QRCode(ele, {
                text: url,
                width: 180,
                height: 180,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
        },
    },
    watch: {
        '$route.name': {
          handler: function (val, oldVal) {
                if(val=='crm.createQrCode'){
                    if(this.$route.query.channelId||this.$route.query.id){
                        this.getInfo();
                    }
                }
          },
          deep: true
        },
    },
};
</script>
