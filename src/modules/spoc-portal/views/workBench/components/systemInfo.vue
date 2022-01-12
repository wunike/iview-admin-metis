<style lang="less">
    .si-container{
        background: #fff;
        padding-top:30px;
        padding-left:96px;
        padding-bottom:30px;
        height:100%;
        overflow-y: auto;
        overflow-x: hidden;
        .img-name-class{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
        }
        .img-big-style3 {
            width: 420px;
            height: 150px;
            background: #DCDEE3;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            -webkit-user-drag: none;
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
    <div class="si-container">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-colon  :label-width="80">
            <Row>
                <Col span="8">
                    <FormItem label="系统名称" prop="name" show-message>
                        <Input v-model="formValidate.name" style="width: 340px" placeholder="请输入系统名称"></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <FormItem label="主颜色" prop="color" show-message>
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
                <Col span="15">
                    <FormItem label="在线帮助" prop="isHideHelp">
                        <Checkbox v-model="formValidate.isHideHelp">隐藏</Checkbox>
                        <span  style="color:#999999;">
                                <Icon type="ios-information-circle" class="IconStyle" />
                                勾选隐藏之后，系统里面右上角的“在线帮助”隐藏，用户将无法查看系统帮助文档</span>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="8" style="width: 420px">
                    <Row style="display: flex;justify-content: space-between;">
                        <Col span="18" >
                            <FormItem label="系统图标" prop="systeninfoName">
                                <Input disabled v-model="formValidate.systeninfoName"></Input>
                            </FormItem>
                        </Col>
                        <Col  >
                            <Upload 
                                    :data="{
                                        bizId: '',
                                        bizType: 'systeninfo',
                                        isSingle: true
                                    }"
                                    :headers="headers"
                                    :before-upload="detailBeforeUpload" :action="uploadImg"
                                    :default-file-list="systenUrl" name="file" :show-upload-list="false"
                                    :format="['ico']" :on-format-error="FormatError1" :on-progress="progressUpload"
                                    :on-success="HandleSuccess">
                                <Button icon="ivu-icon ivu-icon-ios-cloud-upload-outline">上传文件</Button>
                            </Upload>
                        </Col>
                    </Row>
                </Col>
                <Col span="12" style="height:32px;line-height:32px;color:#999999;margin-left:10px;">
                    <Icon type="ios-information-circle" />
                    <span >请上传尺寸12*12，格式为.ico的图片</span>
                </Col>
            </Row>

            <Row>
                <Col span="18" >
                    <FormItem>
                        <div class="img-big-style3" style="text-align:center">
                            <img :src="systenUrl[0].url" style="max-width: 420px;max-height:150px;" >
                        </div>
                    </FormItem>

                </Col>
            </Row>
<!--            深色logo-->
            <Row>
                <Col span="8" style="width: 420px">
                    <Row style="display: flex;justify-content: space-between;">
                        <Col span="18" >
                            <FormItem label="深色LOGO" prop="logoinfoName">
                                <Input disabled v-model="formValidate.logoinfoName"></Input>
                            </FormItem>
                        </Col>
                        <Col  >
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
                        </Col>
                    </Row>
                </Col>
                <Col span="12" style="height:32px;line-height:32px;color:#999999;margin-left:10px;">
                    <Icon type="ios-information-circle" class="IconStyle" />
                    <span class="tipStyle">请上传尺寸80*24，格式为.jpg或.png的图片</span>
                </Col>
            </Row>
            <Row>
                <Col span="18" >
                    <FormItem>
                        <div class="img-big-style3" style="text-align:center">
                            <img :src="logoUrl[0].url" style="max-width: 420px;max-height:150px;" >
                        </div>
                    </FormItem>
                </Col>
            </Row>
<!--            浅色logo-->
            <Row>
                <Col span="8" style="width: 420px">
                    <Row style="display: flex;justify-content: space-between;">
                        <Col span="18" >
                            <FormItem label="浅色LOGO" prop="logoinfoNameLight">
                                <Input disabled v-model="formValidate.logoinfoNameLight"></Input>
                            </FormItem>
                        </Col>
                        <Col  >
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
                        </Col>
                    </Row>
                </Col>
                <Col span="12" style="height:32px;line-height:32px;color:#999999;margin-left:10px;">
                    <Icon type="ios-information-circle" class="IconStyle" />
                    <span class="tipStyle">请上传尺寸80*24，格式为.jpg或.png的图片</span>
                </Col>
            </Row>
            <Row>
                <Col span="18" >
                    <FormItem>
                        <div class="img-big-style3" style="text-align:center">
                            <img :src="logoUrlLight[0].url" style="max-width: 420px;max-height:150px;" >
                        </div>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="8" style="width: 420px">
                    <Row style="display: flex;justify-content: space-between;">
                        <Col span="18" >
                            <FormItem label="APP启动页" prop="appinfoName">
                                <Input disabled v-model="formValidate.appinfoName"></Input>
                            </FormItem>
                        </Col>
                        <Col  >
                            <Upload :action="uploadWelcome" :default-file-list="appUrl"
                                    name="file" :show-upload-list="false"
                                    :data="{}"
                                    :format="['png']" :max-size="500" :on-exceeded-size="handleSizeError"
                                    :on-format-error="formatErrorApp" :on-progress="progressUpload"
                                    :on-success="HandleSuccessApp">
                                <Button icon="ivu-icon ivu-icon-ios-cloud-upload-outline">上传文件</Button>
                            </Upload>
                        </Col>
                    </Row>
                </Col>
                <Col span="12" style="height:32px;line-height:32px;color:#999999;margin-left:10px;">
                    <Icon type="ios-information-circle" class="IconStyle" />
                    <span class="tipStyle">请上传尺寸：836 x 842（推荐尺寸）；大小：500k以内；格式：png</span>
                </Col>
            </Row>
            <Row>
                <Col span="18" >
                    <FormItem>
                        <div class="img-big-style3" style="text-align:center">
                            <img :src="appUrl[0].url" style="max-width: 420px;max-height:150px;" >
                        </div>
                    </FormItem>

                </Col>
            </Row>
        </Form>
    </div>
</template>

<script>
    import valid, {
        errors,
        sysConfig,
        sysAttachment,
        common,
        api
    } from "../../../libs/request.js";
    import { mapMutations } from 'vuex';

    export default {
        components: {

        },
        data() {
            const validatePass = (rule, value, callback) => {
                const reg = /^[^ ]+$/;
                if(!reg.test(value)) {
                    callback(new Error('格式错误！'));
                }else{
                    callback();
                }
            };
            return {
                iconId:"",
                logoId:"",
                logoinfo_lightId:"",
                appId:"",
                random : Math.random() * 9999,
                current:'default',
                colorSettedArr:[
                    {index:'default',value:'#44BCB7'},
                    {index:'blue',value:'#2d8cf0'},
                    {index:'orange',value:'#F5A623'},
                ],
                businessUrl: [{ 'name': '', 'url': '' }],
                systenUrl: [{ 'name': '', 'url': '' }],
                logoUrl: [{ 'name': '', 'url': '' }],
                logoUrlLight: [{ 'name': '', 'url': '' }],
                appUrl: [{ 'name': '', 'url': '' }],
                formValidate:{
                    name:"",
                    color:"0",
                    connect:"",
                    phone:"",
                    isHideHelp:'',
                    businessfileName:"",
                    logoinfoName:'',
                    logoinfoNameLight:''
                },
                ruleValidate:{
                    name: [
                        { required: true, validator: validatePass ,trigger: 'blur' }
                    ],
                },
                headers:{}
            }
        },
        computed: {
            uploadImg: function () {
                return api.fileAttachmentUploadUrl(); // sysAttachment.uploadFileUrl();
            },
            uploadWelcome: function () {
                return common.uploadWelcome();
            }
        },
        mounted() {
            // this.selectColor(this.colorSettedArr[0])
            this.headers = {
                token: localStorage.getItem('token'),
                tenant: localStorage.getItem('tenant')	
            }
        },

        methods: {
            ...mapMutations(['updateLoadingStatus']),
            HandleSuccessApp(data){
                let img = location.host == "hootie.athenaca.com" ? '/upload/welcome/applets-welcome.png': '/spoc-jw/upload/welcome/applets-welcome.png'
                this.random = Math.random() * 9999
                this.updateLoadingStatus({ isLoading: false })
                // this.idChange3 = true;
                this.appUrl = [];
                this.appUrl.push({ "name": img, "url": img });
                this.formValidate.appinfoName = img;
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
            detailBeforeUpload(file) {
                return true //this.checkImageWH(file, 12, 12);
            },
            detailBeforeUpload1(file) {
                return true // this.checkImageWH(file, 272, 66);
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
            progressUpload(event, file, fileList) {
                this.updateLoadingStatus({ isLoading: true })
            },
            HandleSuccess: function (data) {

                this.updateLoadingStatus({ isLoading: false })
                this.$Message.success('上传成功');
                if (data.data.bizType == 'businesslicenseinfo') {
                    // this.idChange4 = true;
                    this.businessUrl = [];
                    this.businessUrl.push({ "name": data.data.filename, "url": data.data.url });
                    this.formValidate.businessfileName = data.data.filename;
                } else if (data.data.bizType == 'appsetinfo') {
                    // this.idChange3 = true;
                    this.appUrl = [];
                    this.appUrl.push({ "name": data.data.filename, "url": data.data.url });
                    this.formValidate.appinfoName = data.data.filename;
                } else if (data.data.bizType == 'logoinfo') {
                    // this.idChange2 = true;
                    this.logoUrl = [];
                    this.logoUrl.push({ "name": data.data.filename, "url": data.data.url });
                    this.formValidate.logoinfoName = data.data.filename;
                } else if (data.data.bizType == 'logoinfo_light') {
                    // this.idChange2 = true;
                    this.logoUrlLight = [];
                    this.logoUrlLight.push({ "name": data.data.filename, "url": data.data.url });
                    this.formValidate.logoinfoNameLight = data.data.filename;
                }  else if (data.data.bizType == 'systeninfo') {
                    // this.idChange1 = true;
                    this.systenUrl = [];
                    this.systenUrl.push({ "name": data.data.filename, "url": data.data.url })
                    this.formValidate.systeninfoName = data.data.filename;
                }
            },

            selectColor(item) {
                this.current = item.index;
                this.formValidate.color = item.index;
                let color = item.index||'default';
                // let themeDom = document.querySelector('link[name="theme"]');
                // if (!themeDom) {
                //     let dom = document.createElement("LINK");
                //     dom.setAttribute("type", "text/css");
                //     dom.setAttribute("rel", "stylesheet");
                //     dom.setAttribute("name", "theme");
                //     dom.setAttribute("href", "");
                //     document.querySelector("head").appendChild(dom);
                // }
                // let path = '';
                // if (process.env.NODE_ENV.indexOf('dev') > -1) {
                //     path = '/';
                // } else {
                //     path = '/';
                // }

                // let stylesheetPath = path + color + '.css';
                // let themeLink = document.querySelector('link[name="theme"]');
                let themeWrap = document.querySelector('body');
                // themeLink.setAttribute('href', stylesheetPath);
                themeWrap.setAttribute('class', color + '_wrap');
            },
            save(){
                this.$refs['formValidate'].validate((valid) => {
                    if (valid) {
                       this.saveInfos('icon')
                    }
                })
            },
            getForm(key) {
                this.updateLoadingStatus({ isLoading: true });
                let params ={}
                if(key =='icon'){
                    params.configId = 'base:systeninfo'
                }else if(key =='logo'){
                    params.configId = 'base:logoinfo'
                }else if(key =='app'){
                    params.configId = 'base:appsetinfo'
                } else if(key =='logoinfo_light'){
                    params.configId = 'base:logoinfo_light'
                }
                sysConfig
                .form(params)
                .then(valid.call(this))
                .then((res) => {
                    if(res.ok){
                        if(res.data.data){

                            let data = JSON.parse(res.data.data.value)
                            if(key =='icon'){
                                this.iconId = res.data.data.id
                                this.formValidate.name = data.sysName
                                this.formValidate.color = data.color
                                this.formValidate.systeninfoName = data.sysPicName
                                this.systenUrl = [
                                    {
                                        name:data.sysPicName,
                                        url:data.sysPicUrl
                                    }
                                ]

                                this.colorSettedArr.forEach((item,index)=> {
                                    if(data.color == item.index){
                                        // this.current = index
                                        this.selectColor(item)
                                    }
                                })
                                this.formValidate.isHideHelp = data.isHideHelp=='0'?false:true
                                // console.log(this.formValidate.isHideHelp)
                                this.getForm('logo')
                            }else if(key =='logo'){
                                this.logoId = res.data.data.id
                                this.formValidate.logoinfoName = data.logoPicName
                                this.logoUrl = [
                                    {
                                        name:data.logoPicName,
                                        url:data.logoUrl
                                    }
                                ]
                                this.getForm('logoinfo_light')
                            }else if(key =='logoinfo_light'){
                                this.logoinfo_lightId = res.data.data.id
                                this.formValidate.logoinfoNameLight = data.logoPicName
                                this.logoUrlLight = [
                                    {
                                        name:data.logoPicName,
                                        url:data.logoUrl
                                    }
                                ]
                                this.getForm('app')
                            }else if(key =='app'){
                                this.appId = res.data.data.id
                                this.formValidate.appinfoName = data.appStartUpPic
                                this.appUrl = [
                                    {
                                        name:data.appStartUpPic,
                                        url:data.appStartUpPicUrl
                                    }
                                ]
                                this.updateLoadingStatus({ isLoading: false });
                            }
                        }
                    }
                })
            },
            saveInfos(key){
                this.updateLoadingStatus({ isLoading: true });
                let params ={}
                if(key =='icon'){
                    params = {
                        "valueObject": {
                            "sysName": this.formValidate.name,
                            color: this.formValidate.color,
                            sysPicUrl: this.systenUrl[0].url,
                            sysPicName:this.systenUrl[0].name,
                            "isHideHelp": this.formValidate.isHideHelp? '1' :'0'
                        },
                        "menuId": "0",
                        "configId": "base:systeninfo",
                        "remarks": "系统信息"
                    }
                    params.id = this.iconId
                }else if(key =='logo'){
                    params = {
                        "valueObject": {
                            "logoPicName": this.logoUrl[0].name,
                            "logoUrl": this.logoUrl[0].url
                        },
                        "menuId": "0",
                        "configId": "base:logoinfo",
                        "remarks": "深色LOGO"
                    }
                    params.id = this.logoId
                }else if(key =='logoinfo_light'){
                    params = {
                        "valueObject": {
                            "logoPicName": this.logoUrlLight[0].name,
                            "logoUrl": this.logoUrlLight[0].url
                        },
                        "menuId": "0",
                        "configId": "base:logoinfo_light",
                        "remarks": "浅色LOGO"
                    }
                    params.id = this.logoinfo_lightId
                }else if(key =='app'){
                    params = {
                        "valueObject": {
                            "appStartUpPic": this.appUrl[0].name,
                            "appStartUpPicUrl": this.appUrl[0].url,
                        },
                        "menuId": "0",
                        "configId": "base:appsetinfo",
                        "remarks": "APP设置"
                    }
                    params.id = this.appId
                }
                sysConfig
                .save(params)
                .then(valid.call(this))
                .then((res) => {
                    if(res.ok){
                        if(key =='icon'){
                          this.saveInfos('logo')
                        }else if(key =='logo'){
                            this.saveInfos('logoinfo_light')
                        }
                        else if(key =='logoinfo_light'){
                            this.saveInfos('app')
                        }else if(key =='app'){
                            this.$emit('add',0)
                            this.updateLoadingStatus({ isLoading: false });
                        }
                    }
                })
            },
        },
    }
</script>
