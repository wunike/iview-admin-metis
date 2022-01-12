<style lang="less">
    .outContainStyle {
        .configInfo {
            .IconStyle {
                margin: 0px 8px 0px 19px;
                font-size: 16px;
                color: #ccc;
            }

            .tipStyle {
                font-family: HiraginoSansGB-W3;
                color: rgba(153, 153, 153, 1);
            }

            .mainTitle {
                height: 33px;
                line-height: 33px;
                padding-left: 10px;
                margin-left: 6px;
                font-size: 14px;
                font-family: Helvetica;
                color: rgba(73, 80, 96, 1);
                width: 80px;
            }

            .uploadStyle {

                .ivu-form-item-content {
                    margin-left: 20px !important;

                    .ivu-upload {
                        .ivu-btn-default {
                            span {
                                font-size: 14px !important;
                                font-family: PingFangSC-Regular;
                                color: rgba(0, 0, 0, 0.65);
                            }
                        }
                    }
                }
            }

            .ivu-form-item {

                .ivu-form-item-label,
                .ivu-form-item-content {
                    font-family: HiraginoSansGB-W3 !important;
                    color: rgba(73, 80, 96, 1) !important;
                }

                &.ivu-form-item-required .ivu-form-item-label:before {
                    content: '';
                }
            }

            .imgOutStyle {
                display: flex;
                background: rgba(242, 243, 247, 1);
                border: 1px solid rgba(220, 222, 227, 1);
                justify-content: center;
                align-items: center;
                margin-left: 122px;
                height: 150px;
                margin-bottom: 20px;
                width: 423px;
            }

            .imgBigStyle {
                width: 24px;
                height: 24px;
            }

            .imgBigStyle1 {
                width: 272px;
                height: 66px;
            }

            .imgBigStyle2,
            .imgBigStyle3 {
                width: 272px;
                height: 118px;
            }

            .imgNameStyle0 {
                .ivu-form-item-content {
                    width: 365px;
                }
            }

            .imgNameStyle {
                display: flex;
                width: 459px;

                .ivu-form-item:nth-child(1) {
                    .ivu-form-item-content {
                        width: 249px;
                    }
                }

                .ivu-form-item:nth-child(2) {
                    .ivu-form-item-content {
                        width: 30px;
                        margin-left: 16px !important;
                    }
                }

            }
            .exterior-list{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                .style_box{
                    position: relative;
                    img{
                        width: 66px;
                        height: 52px;
                        cursor: pointer;
                    }
                    .checkmark{
                        position: absolute;
                        top: 50%;
                        margin-top: -10px;
                        left: 50%;
                        margin-left: -8px;
                        text-align: center;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                    }
                }
            }
            .LogoStyle {
                .ivu-form-item {
                    .ivu-form-item-content {
                        width: 239px !important;
                    }
                }
            }
        }

        .configInfo:nth-child(1) {
            margin-top: 10px;
        }
        .color-list{
            width: 340px;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            height:32px;
            line-height: 32px;
            div{
                display: inline-block;
                height:20px;
                width:20px;
                border-radius: 50%;
                margin-right: 20px;
                position: relative;
                &.on{
                    span{
                        display: inline-block;
                    }
                }
                span{
                    display: none;
                    height:20px;
                    width:20px;
                    border-radius: 50%;
                    position: absolute;
                    top:0px;
                    left:0px;
                }
                strong{
                    display: inline-block;
                    height:18px;
                    width:18px;
                    border-radius: 50%;
                    position: absolute;
                    top:1px;
                    left:1px;
                    background: #fff;
                }
                b{
                    display: inline-block;
                    height:14px;
                    width:14px;
                    border-radius: 50%;
                    position: absolute;
                    top:3px;
                    left:3px;
                }
            }
        }
    }
</style>
<template>
    <div class="outContainStyle">
        <div>
            <Form ref="formValidateInfo" :model="formValidate" :rules="ruleValidate" :label-width="95"
                label-position="right">
                <div class="configInfo" v-if="showMap.systeninfo">
                    <Row>
                        <Col span="1" class-name="mainTitle"> 系统信息
                        </Col>
                        <Col span="7" class-name="imgNameStyle0">
                        <FormItem label="系统名称:" prop="sysName">
                            <Input v-model="formValidate.sysName" placeholder="请输入系统名称"
                                @on-change="valChange('systeninfo')"></Input>
                        </FormItem>
                        </Col>

                    </Row>
                    <Row>
                        <Col span="1" class-name="mainTitle">
                        </Col>
                        <Col span="7" class-name="imgNameStyle0">
                            <FormItem label="外观:" prop="exterior" show-message>
                                <div class="exterior-list">
                                    <div v-for="(item,index) in exteriorList" :key="item.index" class="style_box">
                                        <img :src="item.path" :alt="item.value" @click="setExterior(item.value)">
                                        <div class="checkmark" v-if="exterior==item.value"><Icon type="md-checkmark" color="#44BCB7" :size="16"/></div>
                                    </div>
                                </div>
                            </FormItem>
                        </Col>

                    </Row>
                    <Row>
                        <Col span="1" class-name="mainTitle">
                        </Col>
                        <Col span="7" class-name="imgNameStyle0">
                            <FormItem label="主颜色:" prop="color" show-message>
                                <div class="color-list">
                                    <div v-for="(item) in colorSettedArr" :key="item.index" :class="{'on':current == item.index}" @click="selectColor(item)" style="cursor: pointer;">
                                        <span :style="{background:item.value}"></span>
                                        <strong></strong>
                                        <b :style="{background:item.value}"></b>
                                    </div>
                                </div>
                            </FormItem>
                        </Col>

                    </Row>
                    <Row>
                        <Col span="1" class-name="mainTitle">
                        </Col>
                        <Col span="7" class-name="imgNameStyle">
                        <FormItem label="系统图标:" prop="systeninfoName">
                            <Input disabled v-model="formValidate.systeninfoName"></Input>
                        </FormItem>
                        <FormItem label="" prop="systenUrl">
                            <Upload
                                :before-upload="detailBeforeUpload"
                                :format="['ico']"
                                :action="uploadImg"
                                :default-file-list="systenUrl" name="file" :show-upload-list="false"
                                :data="{
                                    bizId: '',
                                    bizType: 'systeninfo',
                                    isSingle: true
                                }"
                                :headers="headers"
                                :on-format-error="FormatError1" :on-progress="progressUpload"
                                :on-success="HandleSuccess">
                                <Button icon="ivu-icon ivu-icon-ios-cloud-upload-outline">上传文件</Button>

                            </Upload>
                        </FormItem>
                        </Col>
                        <Col span="6" style="height:32px;line-height:32px;width:415px;">
                            <Icon type="ios-information-circle" class="IconStyle" />
                            <span class="tipStyle">请上传尺寸12*12，格式为.ico的图片</span>
                            <Button @click="handleReset1('systeninfo')" style="margin-left:12px;">重置</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="6" class-name="imgOutStyle" style="margin-left:122px">
                        <div class="imgBigStyle" style="text-align:center"><img :src="systenUrl[0].url"
                                style="max-width: 24px;max-height:24px;" alt=""></div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="15" style="width:1000px;margin-left:90px;">
                        <FormItem label="在线帮助:" prop="isHideHelp">
                            <Checkbox v-model="formValidate.isHideHelp" style="margin:0px 20px;"
                                @on-change="valChange('systeninfo')">隐藏</Checkbox>
                            <span class="tipStyle">
                                <Icon type="ios-information-circle" class="IconStyle" />
                                勾选隐藏之后，系统里面右上角的“在线帮助”隐藏，用户将无法查看系统帮助文档</span>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="6" style="width:415px;margin:0px 0 7px 128px;display:flex;justify-content:flex-end">
                        <Button type="primary" @click="handleSubmitBtn('systeninfo')" size=""
                            :disabled="!idChange1">保存</Button>
                        </Col>
                    </Row>
                    <Divider />
                </div>
                <div class="configInfo" v-if="showMap.logoinfo">
                    <Row>
                        <Col span="1" class-name="mainTitle">深色LOGO</Col>
                        <Col span="7" class-name="imgNameStyle LogoStyle">
                        <FormItem label="LOGO图片:" prop="logoinfoName" :label-width="106">
                            <Input disabled v-model="formValidate.logoinfoName"></Input>
                        </FormItem>
                        <FormItem label="">
                            <Upload
                                :data="{
                                    bizId: '',
                                    bizType: 'logoinfo',
                                    isSingle: true
                                }"
                                :headers="headers"
                                :before-upload="detailBeforeUpload1" :action="uploadImg"
                                :default-file-list="logoUrl" name="file" :show-upload-list="false"
                                :format="['jpg','png']" :on-format-error="FormatError" :on-progress="progressUpload"
                                :on-success="HandleSuccess">
                                <Button icon="ivu-icon ivu-icon-ios-cloud-upload-outline">上传文件</Button>
                            </Upload>
                        </FormItem>
                        </Col>
                        <Col span="6" style="height:32px;line-height:32px;width:500px;">
                        <Icon type="ios-information-circle" class="IconStyle" />
                        <span class="tipStyle">请上传尺寸为80px * 24px ，格式为.jpg或.png的深色图片</span>
                        <Button @click="handleReset1('logoinfo')" style="margin-left:12px;">重置</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="6" class-name="imgOutStyle">
                        <div class="imgBigStyle1" style="text-align:center"><img :src="logoUrl[0].url"
                                style="max-width: 272px;max-height:118px;" alt=""></div>
                        </Col>
                    </Row>
                    <Row>
                        <Col style="width:415px;margin:12px 0 7px 128px;display:flex;justify-content:flex-end">
                        <Button type="primary" @click="handleSubmitBtn('logoinfo')" size=""
                            :disabled="!idChange2">保存</Button>
                        </Col>
                    </Row>
                    <Divider />
                </div>
                <div class="configInfo" v-if="showMap.logoinfo_light">
                    <Row>
                        <Col span="1" class-name="mainTitle">浅色LOGO</Col>
                        <Col span="7" class-name="imgNameStyle LogoStyle">
                            <FormItem label="LOGO图片:" prop="logoinfoNameLight" :label-width="106">
                                <Input disabled v-model="formValidate.logoinfoNameLight"></Input>
                            </FormItem>
                            <FormItem label="">
                                <Upload
                                        :data="{
                                    bizId: '',
                                    bizType: 'logoinfo_light',
                                    isSingle: true
                                }"
                                        :headers="headers"
                                        :before-upload="detailBeforeUpload1" :action="uploadImg"
                                        :default-file-list="logoUrlLight" name="file" :show-upload-list="false"
                                        :format="['jpg','png']" :on-format-error="FormatError" :on-progress="progressUpload"
                                        :on-success="HandleSuccess">
                                    <Button icon="ivu-icon ivu-icon-ios-cloud-upload-outline">上传文件</Button>
                                </Upload>
                            </FormItem>
                        </Col>
                        <Col span="6" style="height:32px;line-height:32px;width:500px;">
                            <Icon type="ios-information-circle" class="IconStyle" />
                            <span class="tipStyle">请上传尺寸为80px * 24px ，格式为.jpg或.png的浅色图片</span>
                            <Button @click="handleReset1('logoinfo_light')" style="margin-left:12px;">重置</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="6" class-name="imgOutStyle">
                            <div class="imgBigStyle1" style="text-align:center"><img :src="logoUrlLight[0].url"
                                                                                     style="max-width: 272px;max-height:118px;" alt=""></div>
                        </Col>
                    </Row>
                    <Row>
                        <Col style="width:415px;margin:12px 0 7px 128px;display:flex;justify-content:flex-end">
                            <Button type="primary" @click="handleSubmitBtn('logoinfo_light')" size=""
                                    :disabled="!idChange7">保存</Button>
                        </Col>
                    </Row>
                    <Divider />
                </div>
                <div class="configInfo" v-if="showMap.minilogoinfo">
                    <Row>
                        <Col span="1" class-name="mainTitle">MiniLOGO</Col>
                        <Col span="7" class-name="imgNameStyle LogoStyle">
                            <FormItem label="LOGO图片:" prop="miniLogoinfoName" :label-width="106">
                                <Input disabled v-model="formValidate.miniLogoinfoName"></Input>
                            </FormItem>
                            <FormItem label="">
                                <Upload
                                        :data="{
                                    bizId: '',
                                    bizType: 'minilogoinfo',
                                    isSingle: true
                                }"
                                        :headers="headers"
                                        :before-upload="detailBeforeUpload1" :action="uploadImg"
                                        :default-file-list="miniLogoUrl" name="file" :show-upload-list="false"
                                        :format="['jpg','png']" :on-format-error="FormatError" :on-progress="progressUpload"
                                        :on-success="HandleSuccess">
                                    <Button icon="ivu-icon ivu-icon-ios-cloud-upload-outline">上传文件</Button>
                                </Upload>
                            </FormItem>
                        </Col>
                        <Col span="6" style="height:32px;line-height:32px;width:415px;margin-top:1px;">
<!--                            <Icon type="ios-information-circle" class="IconStyle" />-->
<!--                            <span class="tipStyle">请上传尺寸为80px * 24px ，格式为.jpg或.png的图片</span>-->
                            <Button @click="handleReset1('minilogoinfo')" style="margin-left:12px;">重置</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="6" class-name="imgOutStyle">
                            <div class="imgBigStyle1" style="text-align:center"><img :src="miniLogoUrl[0].url"
                                                                                     style="max-width: 272px;max-height:118px;" alt=""></div>
                        </Col>
                    </Row>
                    <Row>
                        <Col style="width:415px;margin:12px 0 7px 128px;display:flex;justify-content:flex-end">
                            <Button type="primary" @click="handleSubmitBtn('minilogoinfo')" size=""
                                    :disabled="!idChange6">保存</Button>
                        </Col>
                    </Row>
                    <Divider />
                </div>
                <div class="configInfo" v-if="showMap.appsetinfo">
                    <Row>
                        <Col span="1" class-name="mainTitle">APP设置</Col>
                        <Col span="7" class-name="imgNameStyle">
                        <FormItem label="启动页:" prop="appinfoName">
                            <Input disabled v-model="formValidate.appinfoName"></Input>
                        </FormItem>
                        <FormItem label="">
                            <Upload :action="uploadWelcome" :default-file-list="appUrl"
                                name="file" :show-upload-list="false"
                                :data="{}"
                                :format="['png']" :max-size="500" :on-exceeded-size="handleSizeError"
                                :on-format-error="formatErrorApp" :on-progress="progressUpload"
                                :on-success="HandleSuccessApp">
                                <Button icon="ivu-icon ivu-icon-ios-cloud-upload-outline">上传文件</Button>
                            </Upload>
                        </FormItem>
                        </Col>
                        <Col span="6" style="height:32px;line-height:32px;width:446px;">
                        <Icon type="ios-information-circle" class="IconStyle" />
                        <span class="tipStyle">每次启动Hootie小程序，都可以看到的图片。</span>
                         <Button @click="handleReset1('appsetinfo')" style="margin-left:12px;">重置</Button>
                        <p style="margin-left:43px;" class="tipStyle">图片尺寸：836 x 842（推荐尺寸）</p>
                        <p style="margin-left:43px;" class="tipStyle">图片大小：500k以内</p>
                        <p style="margin-left:43px;" class="tipStyle">图片格式：png</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="6" class-name="imgOutStyle">
                        <div class="imgBigStyle2" style="text-align:center"><img :src="appUrl[0].url +'?_t=' + random"
                                style="max-width: 272px;max-height:118px;" alt=""></div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="6" style="width:415px;margin:12px 0 7px 128px;display:flex;justify-content:flex-end">
                        <!-- <Button type="primary" @click="handleSubmitBtn('appsetinfo')" size=""
                            :disabled="!idChange3">保存</Button> -->
                        </Col>
                    </Row>
                    <Divider />
                </div>
                <div class="configInfo" ref="formValidateI" v-if="showMap.businesslicenseinfo">
                    <Row>
                        <Col span="1" class-name="mainTitle"> 营业执照
                        </Col>
                        <Col span="7" class-name="imgNameStyle0">
                        <FormItem label="机构名称:" prop="businessName">
                            <Input v-model="formValidate.businessName" placeholder="请输入机构名称"
                                @on-change="valChange('businesslicenseinfo')"></Input>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="1" class-name="mainTitle">
                        </Col>
                        <Col span="7" class-name="imgNameStyle">
                        <FormItem label="营业执照:" prop="businessfileName">
                            <Input disabled v-model="formValidate.businessfileName"></Input>
                        </FormItem>
                        <FormItem label="">
                            <Upload
                                :data="{
                                    bizId: '',
                                    bizType: 'businesslicenseinfo',
                                    isSingle: true
                                }"
                                :headers="headers"
                                :action="uploadImg" :default-file-list="businessUrl"
                                name="file"
                                :show-upload-list="false"
                                :format="['jpg','png']" :on-format-error="FormatError" :on-progress="progressUpload"
                                :on-success="HandleSuccess">
                                <Button icon="ivu-icon ivu-icon-ios-cloud-upload-outline">上传文件</Button>
                            </Upload>
                        </FormItem>
                        </Col>
                        <Col span="6" style="height:32px;line-height:32px;">
                        <Icon type="ios-information-circle" class="IconStyle" />
                        <span class="tipStyle">请上传格式为.jpg或.png的图片</span>
                        <Button @click="handleReset1('businesslicenseinfo')" style="margin-left:12px;">重置</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="6" class-name="imgOutStyle">
                        <div class="imgBigStyle3" style="text-align:center"><img :src="businessUrl[0].url"
                                style="max-width: 272px;max-height:118px;" alt=""></div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="6" style="width:415px;margin:12px 0 7px 128px;display:flex;justify-content:flex-end">
                        <Button type="primary" @click="handleSubmitBtn('businesslicenseinfo')" size=""
                            :disabled="!idChange4">保存</Button>
                        </Col>
                    </Row>
                    <Divider />
                </div>
                <div class="configInfo" ref="formValidateI">
                    <Row>
                        <!-- 可配显示具体配置项 -->
                        <Col span="1" class-name="mainTitle"> 时间筛选
                        </Col>
                        <Col span="7" class-name="imgNameStyle0">
                        <FormItem label="筛选时间限度:" prop="calendarConfig">
                            <!-- <Input disabled v-model="formValidate.businessfileName"></Input> -->
                            <Input   v-model="formValidate.calendarConfig" @on-change="calendarConfigChange">
                                <span slot="append">月</span>
                            </Input>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="6" style="width:415px;margin:12px 0 7px 128px;display:flex;justify-content:flex-end">
                        <Button type="primary" @click="handleSubmitBtn('calendarConfig')" size=""
                            :disabled="!idChange5">保存</Button>
                        </Col>
                    </Row>
                    <Divider />
                </div>
                <div class="configInfo" ref="formValidateI">
                    <Row>
                        <!-- 可配显示具体配置项 -->
                        <Col span="1" class-name="mainTitle">导入设置
                        </Col>
                        <Col span="7" class-name="imgNameStyle0">
                        <FormItem label="批次大小:" prop="importBatchSize">
                            <InputNumber  v-model="formValidate.importBatchSize" @on-change="importBatchSizeChange">
                            </InputNumber>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="6" style="width:415px;margin:12px 0 7px 128px;display:flex;justify-content:flex-end">
                        <Button type="primary" @click="handleSubmitBtn('com:importBatchSize')" size=""
                            :disabled="!idChange8">保存</Button>
                        </Col>
                    </Row>
                </div>
            </Form>
        </div>
    </div>
</template>
<script>
    import { mapMutations } from 'vuex';
    import valid, {
        errors,
        sysConfig,
        sysAttachment,
        common,
        api
    } from "../../libs/request.js";
    export default {
        components: {

        },
        data() {
               //不是数字就清空数据
            function numArea(value) {
                var patt1 = new RegExp(/^[0-9]{0,}$/);
                return patt1.test(value);
            }
            //   function RemoveSpace() {
            //         if (!this.numArea(this.formValidate.calendarConfig)) {
            //             this.formValidate.calendarConfig = '';
            //         }
           var CalendarConfigCheck=function(rule, value, callback){
                    if (value === '') {
                        return callback(new Error('不能为空'));
                    }
                    else if (!numArea(value)) {
                        return callback(new Error('请输入有效数字'));
                    }
                    else {
                        callback();
                    }
                };
            return {
                headers: {},
                random : Math.random() * 9999,
                current:'default',
                colorSettedArr:[
                    {index:'default',value:'#44BCB7'},
                    {index:'grass',value:'#88B04B'},
                    {index:'blue',value:'#2d8cf0'},
                    {index:'iris',value:'#7273DE'},
                    {index:'coral',value:'#FF7A54'},
                    {index:'orange',value:'#F5A623'},
                ],
                exterior:'leftStyle',
                exteriorList:[
                    {path:require("@public/assets/img/systemConfig/leftStyle.png"),value:'leftStyle'},
                    {path:require("@public/assets/img/systemConfig/topStyle.png"),value:'topStyle'},
                    {path:require("@public/assets/img/systemConfig/noneStyle.png"),value:'noneStyle'},
                ],
                idChange1: false,
                idChange2: false,
                idChange3: false,
                idChange4: false,
                idChange5: false,
                idChange6: false,
                idChange7: false,//浅色
                idChange8: false,//浅色

                systenUrl: [{ 'name': '', 'url': '' }],
                logoUrl: [{ 'name': '', 'url': '' }],
                logoUrlLight: [{ 'name': '', 'url': '' }],//浅色
                miniLogoUrl: [{ 'name': '', 'url': '' }],
                appUrl: [{ 'name': '', 'url': '' }],
                businessUrl: [{ 'name': '', 'url': '' }],
                value: '',
                query: {
                    valueObject: {},
                    menuId: "0"
                },
                systeninfoId:'',
                logoinfoId:'',
                logoinfolightId:'',
                minilogoinfoId:'',
                appsetinfoId:'',
                businesslicenseinfoId:'',
                formValidate: {
                    sysName: '',
                    systeninfoName: '',
                    isHideHelp: false,
                    logoinfoName: '',
                    logoinfoNameLight: '',
                    miniLogoinfoName:'',
                    appinfoName: '',
                    businessName: '',
                    businessfileName: '',
                    calendarConfig: '',
                    importBatchSize: 0,
                },
                ruleValidate: {
                    sysName: [
                        { required: true, type: 'string', message: '不能为空值', trigger: 'change' }
                    ],
                    systeninfoName: [
                        { required: true, type: 'string', message: '不能为空值', trigger: 'change' }
                    ],
                    logoinfoName: [
                        { required: true, type: 'string', message: '不能为空值', trigger: 'change' }
                    ],
                    logoinfoNameLight: [
                        { required: true, type: 'string', message: '不能为空值', trigger: 'change' }
                    ],
                    miniLogoinfoName: [
                        { required: true, type: 'string', message: '不能为空值', trigger: 'change' }
                    ],
                    appinfoName: [
                        { required: true, type: 'string', message: '不能为空值', trigger: 'change' }
                    ],
                    businessName: [
                        { required: true, type: 'string', message: '不能为空值', trigger: 'change' }
                    ],
                    businessfileName: [
                        { required: true, type: 'string', message: '不能为空值', trigger: 'change' }
                    ],
                    calendarConfig: [
                        { validator: CalendarConfigCheck, trigger: 'change' }
                    ],
                    importBatchSize: [
                        { required: true, type: 'number', message: '不能为空值', trigger: 'change' }
                    ],
                },
                showMap:{
                    systeninfo:false,
                    logoinfo:false,
                    logoinfo_light:false,
                    minilogoinfo:false,
                    appsetinfo:false,
                    businesslicenseinfo:false
                }
            }
        },
        created() {
        },
        mounted() {
            this.getData();
            let url = window.location.host == 'hootie.athenaca.com' ? '/upload/welcome/applets-welcome.png': '/spoc-jw/upload/welcome/applets-welcome.png'
            this.appUrl = [{ 'name': url, 'url': url }]
            this.headers = {
				token: localStorage.getItem('token'),
				tenant: localStorage.getItem('tenant')
			}
        },
        computed: {
            uploadImg: function () {
                return api.fileAttachmentUploadUrl();
            },
            uploadWelcome: function () {
                return common.uploadWelcome();
            }
        },
        methods: {
            ...mapMutations(['updateLoadingStatus']),
              //不是数字就清空数据
            numArea(value) {
                var patt1 = new RegExp(/^[0-9]{0,}$/);
                return patt1.test(value);
            },
            RemoveSpace() {
                    if (!this.numArea(this.formValidate.calendarConfig)) {
                        this.formValidate.calendarConfig = '';
                    }
            },
            calendarConfigChange(val){
               this.idChange5=true;
            },
            importBatchSizeChange(val){
               this.idChange8=true;
            },
            valChange(name) {
                if (name == 'systeninfo') {
                    this.idChange1 = true;
                } else if (name == 'businesslicenseinfo') {
                    this.idChange4 = true;
                }
            },
            selectColor(item) {
                this.current = item.index;
                this.formValidate.color = this.current;
                let color = item.index||'default';
                let themeWrap = document.querySelector('body');
                // themeWrap.setAttribute('class', color + '_wrap');
                let classcont=themeWrap.className;
                if(classcont.search(/\w+_wrap/gi)==-1){
                    classcont=classcont+' '+this.current + '_wrap';
                }else{
                    classcont=classcont.replace(/\w+_wrap/gi, this.current + '_wrap');
                }
                themeWrap.className=classcont;
                this.valChange('systeninfo');
            },
            getData() {
                let que = { configId: 'base:systeninfo'};
                sysConfig.getList(que).then(valid.call(this)).then((res) => {
                    if (res.ok) {
                        if(res.data.data){
                            this.showMap.systeninfo=true;
                        }else{
                            this.showMap.systeninfo=false;
                            return
                        }
                        let val = JSON.parse(res.data.data.value);
                        this.systeninfoId = res.data.data.id
                        this.formValidate.sysName = val.sysName;
                        this.formValidate.isHideHelp = val.isHideHelp ? true : false;
                        this.systenUrl[0].name = val.sysPicName;
                        this.formValidate.systeninfoName = val.sysPicName;
                        this.systenUrl[0].url = val.sysPicUrl;
                        this.colorSettedArr.forEach((item,index)=> {
                            if(val.color == item.index){
                                this.selectColor(item)
                            }
                        })
                        this.setExterior(val.exterior)
                    }
                }).catch(errors.call(this)).finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
                let que1 = { configId: 'base:logoinfo' };
                sysConfig.getList(que1).then(valid.call(this)).then((res) => {
                    if (res.ok) {
                        if(res.data.data){
                            this.showMap.logoinfo=true;
                        }else{
                            this.showMap.logoinfo=false;
                            return
                        }
                        let val = JSON.parse(res.data.data.value);
                        this.logoinfoId = res.data.data.id
                        this.logoUrl[0].name = val.logoPicName;
                        this.formValidate.logoinfoName = val.logoPicName;
                        this.logoUrl[0].url = val.logoUrl;
                    }
                }).catch(errors.call(this)).finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
                let que6 = { configId: 'base:logoinfo_light' };
                sysConfig.getList(que6).then(valid.call(this)).then((res) => {
                    if (res.ok) {
                        if(res.data.data){
                            this.showMap.logoinfo_light=true;
                        }else{
                            this.showMap.logoinfo_light=false;
                            return
                        }
                        let val = JSON.parse(res.data.data.value);
                        this.logoinfolightId = res.data.data.id
                        this.logoUrlLight[0].name = val.logoPicName;
                        this.formValidate.logoinfoNameLight = val.logoPicName;
                        this.logoUrlLight[0].url = val.logoUrl;
                    }
                }).catch(errors.call(this)).finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
                let que5 = { configId: 'base:minilogoinfo' };
                sysConfig.getList(que5).then(valid.call(this)).then((res) => {
                    if (res.ok) {
                        if(res.data.data){
                            this.showMap.minilogoinfo=true;
                        }else{
                            this.showMap.minilogoinfo=false;
                            return
                        }
                        let val = JSON.parse(res.data.data.value);
                        this.minilogoinfoId = res.data.data.id
                        this.miniLogoUrl[0].name = val.miniLogoPicName;
                        this.formValidate.miniLogoinfoName = val.miniLogoPicName;
                        this.miniLogoUrl[0].url = val.miniLogoUrl;
                    }
                }).catch(errors.call(this)).finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
                let que2 = { configId: 'base:appsetinfo' };
                sysConfig.getList(que2).then(valid.call(this)).then((res) => {
                    if (res.ok) {
                        if(res.data.data){
                            this.showMap.appsetinfo=true;
                        }else{
                            this.showMap.appsetinfo=false;
                            return
                        }
                        let val = JSON.parse(res.data.data.value);
                        this.appsetinfoId = res.data.data.id
                        this.appUrl[0].name = val.appStartUpPic;
                        this.formValidate.appinfoName = val.appStartUpPic;
                        this.appUrl[0].url = val.appStartUpPicUrl;
                    }
                }).catch(errors.call(this)).finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
                let que3 = { configId: 'base:businesslicenseinfo' };
                sysConfig.getList(que3).then(valid.call(this)).then((res) => {
                    if (res.ok) {
                        if(res.data.data){
                            this.showMap.businesslicenseinfo=true;
                        }else{
                            this.showMap.businesslicenseinfo=false;
                            return
                        }
                        let val = JSON.parse(res.data.data.value);
                        this.businesslicenseinfoId = res.data.data.id
                        this.formValidate.businessName = val.businessName;
                        this.businessUrl[0].name = val.businessLicensePicName;
                        this.formValidate.businessfileName = val.businessLicensePicName;
                        this.businessUrl[0].url = val.businessLicensePicUrl;

                    }
                }).catch(errors.call(this)).finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
                let que4 = {configId:"base:calendarConfig",menuId:'0'};
                sysConfig.getConfig(que4).then(valid.call(this)).then((res) => {
                    if (res.ok) {
                        // debugger
                        this.formValidate.calendarConfig=res.data.data.maxMonthInterval;
                        // let val = JSON.parse(res.data.data.value);
                        // debugger;
                        // this.formValidate.calendarConfig = val.calendarConfig;

                    }
                }).catch(errors.call(this)).finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
                let que7 = {configId:"com:importBatchSize",menuId:'0'};
                sysConfig.getConfig(que7).then(valid.call(this)).then((res) => {
                    if (res.ok) {
                        this.formValidate.importBatchSize = Number(res.data.data.size) || 0
                    }
                }).catch(errors.call(this)).finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
            },
            handleSizeError(file, fileList) {
                this.$Message.error('请上传小于500k的文件');
            },
            formatErrorApp(file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: file.name + '文件格式不正确, 请选择PNG'
                });
            },
            FormatError(file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: file.name + '文件格式不正确, 请选择JPG、PNG'
                });
            },
            FormatError1(file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: file.name + '文件格式不正确, 请选择ICO'
                });
            },
            //return  promise
            detailBeforeUpload(file) {
                return true //this.checkImageWH(file, 12, 12);
            },
            detailBeforeUpload1(file) {
                return true // this.checkImageWH(file, 80, 24);
            },
            detailBeforeUpload2(file) {
                return true // this.checkImageWH(file, 1080, 1440);
            },
            //checkImageWH  返回一个promise  检测通过返回resolve  失败返回reject组织图片上传
            checkImageWH(file, width, height) {
                let self = this;
                return new Promise(function (resolve, reject) {
                    let filereader = new FileReader();
                    filereader.onload = e => {
                        let src = e.target.result;
                        const image = new Image();
                        image.onload = function () {
                            if (width && this.width != width) {
                                self.$Notice.error({
                                    title: '请上传' + width + "*" + height + "的图片",
                                });
                                reject();
                            } else if (height && this.height != height) {
                                self.$Notice.error({
                                    title: '请上传' + width + "*" + height + "的图片",
                                });
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
            progressUpload(event, file, fileList) {
                this.updateLoadingStatus({ isLoading: true })
            },
            HandleSuccessApp(data){
                let img = location.host == "hootie.athenaca.com" ? '/upload/welcome/applets-welcome.png': '/spoc-jw/upload/welcome/applets-welcome.png'
                this.random = Math.random() * 9999
                this.updateLoadingStatus({ isLoading: false })
                this.idChange3 = true;
                this.appUrl = [];
                this.appUrl.push({ "name": img, "url": img });
                this.formValidate.appinfoName = img;
            },
            HandleSuccess: function (data) {
                this.updateLoadingStatus({ isLoading: false })
                // console.log(data,'上传成功')
                this.$Message.success('上传成功');
                if (data.data.bizType == 'businesslicenseinfo') {
                    this.idChange4 = true;
                    this.businessUrl = [];
                    this.businessUrl.push({ "name": data.data.filename, "url": data.data.url });
                    this.formValidate.businessfileName = data.data.filename;
                } else if (data.data.bizType == 'appsetinfo') {
                    this.idChange3 = true;
                    this.appUrl = [];
                    this.appUrl.push({ "name": data.data.filename, "url": data.data.url });
                    this.formValidate.appinfoName = data.data.filename;
                } else if (data.data.bizType == 'logoinfo') {
                    this.idChange2 = true;
                    this.logoUrl = [];
                    this.logoUrl.push({ "name": data.data.filename, "url": data.data.url });
                    this.formValidate.logoinfoName = data.data.filename;
                } else if (data.data.bizType == 'systeninfo') {
                    this.idChange1 = true;
                    this.systenUrl = [];
                    this.systenUrl.push({ "name": data.data.filename, "url": data.data.url })
                    this.formValidate.systeninfoName = data.data.filename;
                }else if (data.data.bizType == 'minilogoinfo') {
                    this.idChange6 = true;
                    this.miniLogoUrl = [];
                    this.miniLogoUrl.push({ "name": data.data.filename, "url": data.data.url })
                    this.formValidate.miniLogoinfoName = data.data.filename;
                }else if (data.data.bizType == 'logoinfo_light') {
                    this.idChange7 = true;
                    this.logoUrlLight = [];
                    this.logoUrlLight.push({ "name": data.data.filename, "url": data.data.url });
                    this.formValidate.logoinfoNameLight = data.data.filename;
                }
                // debugger;
            },
            handleSubmitBtn(name) {
                let query = this.query;
                let valsrules;
                let rulearr = [];
                query = {
                    // valueObject: {},
                    "menuId": "0"
                }
                if (name == 'systeninfo') {
                    query.valueObject={};
                    valsrules = 'systeninfo';
                    rulearr = ['sysName', 'systeninfoName'];
                    this.idChange1 = false;
                    query.id = this.systeninfoId;
                    query.configId = 'base:systeninfo';
                    query.remarks = '系统信息';
                    query.valueObject.sysName = this.formValidate.sysName;
                    query.valueObject.sysPicName = this.systenUrl[0].name;
                    query.valueObject.sysPicUrl = this.systenUrl[0].url;
                    query.valueObject.color = this.formValidate.color;
                    query.valueObject.exterior = this.formValidate.exterior;
                    query.valueObject.isHideHelp = this.formValidate.isHideHelp ? 1 : 0;
                    // if ((this.formValidate.sysName == "") && (this.systenUrl[0].name == "")) {
                    //     return this.$Message.info('没有数据可提交!');
                    // }
                } else if (name == 'logoinfo') {
                    query.valueObject={};
                    valsrules = 'logoinfo';
                    rulearr = ['logoinfoName'];
                    this.idChange2 = false;
                    query.id = this.logoinfoId;
                    query.configId = 'base:logoinfo';
                    query.remarks = '深色LOGO';
                    query.valueObject.logoPicName = this.logoUrl[0].name;
                    query.valueObject.logoUrl = this.logoUrl[0].url;
                } else if (name == 'logoinfo_light') {
                    query.valueObject={};
                    valsrules = 'logoinfo_light';
                    rulearr = ['logoinfoNameLight'];
                    this.idChange7 = false;
                    query.id = this.logoinfolightId;
                    query.configId = 'base:logoinfo_light';
                    query.remarks = '浅色LOGO';
                    query.valueObject.logoPicName = this.logoUrlLight[0].name;
                    query.valueObject.logoUrl = this.logoUrlLight[0].url;
                } else if (name == 'minilogoinfo') {
                    query.valueObject={};
                    valsrules = 'minilogoinfo';
                    rulearr = ['miniLogoinfoName'];
                    this.idChange6 = false;
                    query.id = this.minilogoinfoId;
                    query.configId = 'base:minilogoinfo';
                    query.remarks = 'MiniLOGO';
                    query.valueObject.miniLogoPicName = this.miniLogoUrl[0].name;
                    query.valueObject.miniLogoUrl = this.miniLogoUrl[0].url;
                } else if (name == 'appsetinfo') {
                    query.valueObject={};
                    valsrules = 'appsetinfo';
                    rulearr = ['appinfoName'];
                    this.idChange3 = false;
                    query.id = this.appsetinfoId;
                    query.configId = 'base:appsetinfo';
                    query.remarks = 'APP设置';
                    query.valueObject.appStartUpPic = this.appUrl[0].name;
                    query.valueObject.appStartUpPicUrl = this.appUrl[0].url;
                } else if (name == 'businesslicenseinfo') {
                    query.valueObject={};
                    valsrules = 'businesslicenseinfo';
                    rulearr = ['businessName', 'businessfileName'];
                    this.idChange4 = false;
                    query.id = this.businesslicenseinfoId;
                    query.configId = 'base:businesslicenseinfo';
                    query.remarks = '营业执照';
                    query.valueObject.businessName = this.formValidate.businessName;
                    query.valueObject.businessLicensePicName = this.businessUrl[0].name;
                    query.valueObject.businessLicensePicUrl = this.businessUrl[0].url;
                } else if(name == 'calendarConfig'){
                    query.objectValue={};
                    this.idChange5 = false;
                    rulearr = ['calendarConfig'];
                    query.configId = 'base:calendarConfig';
                    query.objectValue.maxMonthInterval = this.formValidate.calendarConfig;
                    this.ruleControl(rulearr, query,'calendarConfig');
                    return
                } else if(name == 'com:importBatchSize'){
                    query.objectValue={};
                    this.idChange8 = false;
                    rulearr = ['importBatchSize'];
                    query.configId = 'com:importBatchSize';
                    query.objectValue.size = this.formValidate.importBatchSize;
                    this.ruleControl(rulearr, query, 'com:importBatchSize');
                    return
                }
                this.ruleControl(rulearr, query);
            },
            ruleControl(rulearr, query,isCalendarConfig) {
                this.$refs['formValidateInfo'].validateField(rulearr[0], (errMsg) => {
                    if (errMsg) {
                        //TODO 验证未通过
                        this.$Message.error('验证未通过');
                    } else {
                        if (rulearr[1]) {
                            this.$refs['formValidateInfo'].validateField(rulearr[1], (errMsg) => {
                                if (errMsg) {
                                    //TODO 验证未通过
                                    this.$Message.error('验证未通过');
                                } else {
                                    //TODO 验证通过
                                    this.updateLoadingStatus({ isLoading: true });
                                    // this.$Message.success('成功!');
                                    sysConfig.save(query).then(valid.call(this)).then((res) => {
                                        if (res.ok) {
                                            this.$Message.success('保存成功!');
                                        }
                                        this.updateLoadingStatus({ isLoading: false });
                                    }).catch(errors.call(this)).finally(() => {
                                        this.updateLoadingStatus({ isLoading: false });
                                    });
                                }
                            });

                        } else {
                            let myquest='';
                            if(isCalendarConfig){
                                myquest=sysConfig.updateConfig
                            }else{
                                myquest=sysConfig.save
                            }
                            //TODO 验证通过
                            this.updateLoadingStatus({ isLoading: true });
                            // this.$Message.success('成功!');
                            myquest(query).then(valid.call(this)).then((res) => {
                                if (res.ok) {
                                    this.$Message.success('保存成功!');
                                    // this.$store.commit('updateCalendarConfig', {
                                    //     calendarConfig: {maxMonthInterval:query.objectValue.maxMonthInterval}
                                    // })
                                }
                                this.updateLoadingStatus({ isLoading: false });
                            }).catch(errors.call(this)).finally(() => {
                                this.updateLoadingStatus({ isLoading: false });
                            });
                        }
                    }
                });
            },
            handleReset1(name) {
                // let query = {
                //     valueObject: {},
                //     "menuId": "0"
                // }
                if (name == 'systeninfo') {
                    let que = { configId: 'base:systeninfo'};
                    sysConfig.getList(que).then(valid.call(this)).then((res) => {
                        if (res.ok) {
                            let val = JSON.parse(res.data.data.value);
                            this.systeninfoId = res.data.data.id
                            this.formValidate.sysName = val.sysName;
                            this.formValidate.isHideHelp = val.isHideHelp ? true : false;
                            this.systenUrl[0].name = val.sysPicName;
                            this.formValidate.systeninfoName = val.sysPicName;
                            this.systenUrl[0].url = val.sysPicUrl;
                            this.colorSettedArr.forEach((item,index)=> {
                                if(val.color == item.index){
                                    this.selectColor(item)
                                }
                            })
                            this.setExterior(val.exterior)
                        }
                    }).catch(errors.call(this)).finally(() => {
                        this.updateLoadingStatus({ isLoading: false });
                    });
                } else if (name == 'logoinfo') {
                    let que1 = { configId: 'base:logoinfo' };
                    sysConfig.getList(que1).then(valid.call(this)).then((res) => {
                        if (res.ok) {
                            let val = JSON.parse(res.data.data.value);
                            this.logoinfoId = res.data.data.id
                            this.logoUrl[0].name = val.logoPicName;
                            this.formValidate.logoinfoName = val.logoPicName;
                            this.logoUrl[0].url = val.logoUrl;
                        }
                    }).catch(errors.call(this)).finally(() => {
                        this.updateLoadingStatus({ isLoading: false });
                    });
                } else if (name == 'logoinfo_light') {
                    let que6 = { configId: 'base:logoinfo_light' };
                    sysConfig.getList(que6).then(valid.call(this)).then((res) => {
                        if (res.ok) {
                            let val = JSON.parse(res.data.data.value);
                            this.logoinfolightId = res.data.data.id
                            this.logoUrlLight[0].name = val.logoPicName;
                            this.formValidate.logoinfoNameLight = val.logoPicName;
                            this.logoUrlLight[0].url = val.logoUrl;
                        }
                    }).catch(errors.call(this)).finally(() => {
                        this.updateLoadingStatus({ isLoading: false });
                    });
                } else if (name == 'appsetinfo') {
                    let que2 = { configId: 'base:appsetinfo' };
                    sysConfig.getList(que2).then(valid.call(this)).then((res) => {
                        if (res.ok) {
                            let val = JSON.parse(res.data.data.value);
                            this.appsetinfoId = res.data.data.id
                            this.appUrl[0].name = val.appStartUpPic;
                            this.formValidate.appinfoName = val.appStartUpPic;
                            this.appUrl[0].url = val.appStartUpPicUrl;
                        }
                    }).catch(errors.call(this)).finally(() => {
                        this.updateLoadingStatus({ isLoading: false });
                    });
                } else if (name == 'businesslicenseinfo') {
                    let que3 = { configId: 'base:businesslicenseinfo' };
                    sysConfig.getList(que3).then(valid.call(this)).then((res) => {
                        if (res.ok) {
                            let val = JSON.parse(res.data.data.value);
                            this.businesslicenseinfoId = res.data.data.id
                            this.formValidate.businessName = val.businessName;
                            this.businessUrl[0].name = val.businessLicensePicName;
                            this.formValidate.businessfileName = val.businessLicensePicName;
                            this.businessUrl[0].url = val.businessLicensePicUrl;
                        }
                    }).catch(errors.call(this)).finally(() => {
                        this.updateLoadingStatus({ isLoading: false });
                    });
                } else if (name == 'minilogoinfo') {
                    let que5 = { configId: 'base:minilogoinfo' };
                    sysConfig.getList(que5).then(valid.call(this)).then((res) => {
                        if (res.ok) {
                            let val = JSON.parse(res.data.data.value);
                            this.minilogoinfoId = res.data.data.id
                            this.miniLogoUrl[0].name = val.miniLogoPicName;
                            this.formValidate.miniLogoinfoName = val.miniLogoPicName;
                            this.miniLogoUrl[0].url = val.miniLogoUrl;
                        }
                    }).catch(errors.call(this)).finally(() => {
                        this.updateLoadingStatus({ isLoading: false });
                    });
                }
            },
            setExterior(val){
                if(val){
                    this.exterior=val
                };
                this.formValidate.exterior=this.exterior;
                let themeWrap = document.querySelector('body');
                let classcont=themeWrap.className;
                if(classcont.search(/\w+Style/gi)==-1){
                    classcont=classcont+' '+this.exterior;
                }else{
                    classcont=classcont.replace(/\w+Style/gi, this.exterior);
                }
                themeWrap.className=classcont;
                if(this.exterior=='topStyle'){
                    this.$store.commit('changeMenuTheme', 'light');
                }else{
                    this.$store.commit('changeMenuTheme', 'dark');
                }
                this.valChange('systeninfo');
            }
        }

    }

</script>
