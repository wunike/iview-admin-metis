<style lang="less">
.colorStyle {
    color: #999;
    font-size: 14px;
}
.lesseeShareEditPage {
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
                    left: 0px;
                    width: 150px;
                    .ivu-progress {
                        width: 150px;
                    }
                    .ivu-upload-list-file > span {
                        display: none;
                    }
                }

                &.isDefinedHasImg {
                    position: relative;
                    .imgPop {
                        background: #000;
                        opacity: 0;
                        display: flex;
                        transition: all 0.4s;
                    }
                    .ivu-upload:hover .imgPop {
                        cursor: pointer;
                        opacity: 0.4;
                    }
                }
            }
        }
    }
}
</style>
<template>
    <div class="lesseeShareEditPage">
        <Form ref="formRef" :model="formValidate" :rules="ruleValidate" :label-width="130">
            <Card :bordered="false" style="margin-top: 10px;">
                <div class="pageInfo">
                    <div class="title title1">H5页面信息</div>
                    <Row class-name="classInfoStyle">
                        <Col span="24">
                            <FormItem
                                label="选择页面模板:"
                                prop="classroomId"
                                :rules="{required: false, message: '请选择', trigger: 'change'}"
                            >
                                <div style="display:flex;align-items: center;">
                                    <!-- <RadioGroup v-model="phone" style="display:flex;"> -->
                                    <div
                                        v-if="formValidate.url"
                                        class="isDefined isDefinedHasImg"
                                        :style="{background:formValidate.url?`url(${formValidate.url})`:'#EBECF0',backgroundSize:'100px 180px' }"
                                    >
                                        <!-- :max-size="2048"
                                        :on-exceeded-size="handleSizeError"-->
                                        <Upload
                                            :data="{
                                                bizId: '',
                                                bizType: 'image',
                                                isSingle: true
                                            }"
                                            :headers="headers"
                                            ref="pageRef"
                                            style="width:100px;height:180px;justify-content:center;align-items: center;display:flex;"
                                            :action="uploadImg"
                                            :before-upload="detailBeforeUpload"
                                            :format="['jpg','png']"
                                            :on-format-error="handleFormatError"
                                            name="file"
                                            :show-upload-list="pageTemplateList"
                                            :on-success="HandleSuccess"
                                        >
                                            <div
                                                class="imgPop"
                                                style="position: absolute;left:0px;top:0;justify-content:center;align-items:center;width:100px;height:180px;text-align:center"
                                            >
                                                <Icon
                                                    type="ios-create-outline"
                                                    size="20"
                                                    style="margin:0 auto 8px;color:#FFF;font-weight: 600;"
                                                ></Icon>
                                            </div>
                                        </Upload>
                                    </div>
                                    <div v-else class="isDefined">
                                        <!-- :max-size="2048"
                                        :on-exceeded-size="handleSizeError"-->
                                        <Upload
                                            :data="{
                                                bizId: '',
                                                bizType: 'image',
                                                isSingle: true
                                            }"
                                            :headers="headers"
                                            ref="pageRef"
                                            style="width:100px;height:180px;justify-content:center;align-items: center;display:flex;position:relative"
                                            :action="uploadImg"
                                            :before-upload="detailBeforeUpload"
                                            :format="['jpg','png']"
                                            :on-format-error="handleFormatError"
                                            name="file"
                                            :show-upload-list="pageTemplateList"
                                            :on-success="HandleSuccess"
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
                                    </div>
                                    <div
                                        style="margin-left:14px;margin-right:5px;color:rgba(0,0,0,0.45);font-size:14px;"
                                    >支持扩展名：.png .jpg ；建议尺寸：1080*1920；建议大小：小于2M</div>
                                    <Poptip trigger="hover" title>
                                        <Icon type="ios-information-circle" class="IconStyle" />
                                        <div class="api" slot="content">上传图片宽高比需小于9/16；图片宽度不小于750px</div>
                                    </Poptip>
                                </div>
                            </FormItem>
                            <FormItem label="适用范围:">
                                <RadioGroup v-model="formValidate.position">
                                    <Radio label="0">图片下方</Radio>
                                    <Radio label="1">覆盖在图片上的浮层</Radio>
                                </RadioGroup>
                            </FormItem>
                            <FormItem
                                label="选择页面字段:"
                                prop="fromData"
                                :rules="{required: true, message:'页面字段不能为空', trigger: 'change'}"
                            >
                                <div
                                    class="userTargetInner"
                                    style="display:flex;align-items:center;min-height:33px;"
                                >
                                    <span
                                        v-for="(item,index) in valSelect"
                                        :key="index"
                                    >{{item.name}}</span>
                                    <!-- <span>常规课</span> -->
                                    <Icon
                                        type="ios-create-outline"
                                        size="18"
                                        :style="{marginLeft:valSelect.length?'9px':'',cursor:'pointer'}"
                                        @click="showPageFields"
                                    />
                                    <pageFields
                                        ref="pageFieldRef"
                                        @chooseDetailMethod="chooseDetailMethod"
                                    ></pageFields>
                                </div>
                            </FormItem>
                            <FormItem
                                label="页面标题:"
                                prop="title"
                                :rules="{required: false, message: '请选择', trigger: 'change'}"
                            >
                                <Input
                                    placeholder="请输入页面标题"
                                    v-model="formValidate.title"
                                    style="width:254px"
                                />
                            </FormItem>
                            <FormItem
                                class="logoStyle"
                                label="H5页面Logo:"
                                prop="logoUr"
                                :rules="{required: false, message: '请选择', trigger: 'change'}"
                            >
                                <Upload
                                    :data="{
                                        bizId: '',
                                        bizType: 'image',
                                        isSingle: true
                                    }"
                                    :headers="headers"
                                    :default-file-list="defaultList"
                                    :action="uploadImg"
                                    :show-upload-list="true"
                                    name="file"
                                    :format="['jpg','png']"
                                    :on-format-error="handleFormatError1"
                                    :on-success="HandleSuccess1"
                                    :on-remove="HandleRemove"
                                >
                                    <!--   :on-format-error="FormatError1"
                                    :format="['ico']"
                                    :default-file-list="systenUrl"
                                    :before-upload="detailBeforeUpload"
                                    :on-progress="progressUpload"
                                    -->
                                    <Button icon="ivu-icon ivu-icon-ios-cloud-upload-outline">上传文件</Button>
                                </Upload>
                                <span
                                    style="font-size:14px;color:#999;margin-left:21px"
                                >支持扩展名：.png .jpg</span>
                            </FormItem>
                            <FormItem label prop>
                                <div style="margin-top:18px">
                                    <Button type="primary" @click="saveBtn">保存</Button>
                                    <Button
                                        style="margin-left:12px"
                                        type="primary"
                                        @click="lookBtn"
                                    >预览</Button>
                                    <Button style="margin-left:12px" @click="cancelBtn">取消</Button>
                                </div>
                            </FormItem>
                        </Col>
                    </Row>
                </div>
            </Card>
        </Form>
        <Modal
            v-model="modal1"
            title="预览页面"
            @on-ok="ok"
            width="320"
            :mask-closable="false"
            class-name="QrModelStyle"
        >
            <div style="position: relative;height: 568px;">
                <h5Form ref="h5FormRef" :formData="formValidate"></h5Form>
            </div>

            <div slot="footer">
                <Button @click="modal1=false">关闭</Button>
                <!-- <Button @click="cancelImg" v-if="titleVal==2||titleVal==3">取消</Button>
                <Button @click="OkBtn" v-if="titleVal==2||titleVal==3" type="primary">确定</Button>-->
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
} from "../../../../spoc-crm-web/src/libs/request";
import { waitUntil } from "@public/libs/util";
// ../../../../spoc-crm-web/src/libs/request
import pageFields from "../../../../spoc-crm-web/src/views/QrCodeEnrollment/components/pageFields";
import h5Form from "../../../../spoc-crm-web/src/views/h5Form/h5Form";
export default {
    data() {
        return {
            isActioning: false, //多次提交拦截
            pageTemplateList: false,
            modal1: false,
            defaultList: [
                // {
                //     'name': 'a42bdcc1178e62b4694c830f028db5c0',
                //     'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                // }
            ],

            formValidate: {
                // belongOfficeId: "",
                // ownerOffice: "",
                // ownerId: "",
                // source: "",
                // source1: "",
                // source2: "",
                // source3: "",
                tags: "",
                url: "",
                position: "0",
                fromData: "",
                title: "",
                logoUr: ""
            },
            // officeIdList: [],
            // ownerIdList: [],
            phone: "",
            // userLabelData: [],
            valSelect: [],
            headers: {}
        };
    },
    computed: {
        ...mapState(["app"]),
        uploadImg: function() {
            return api.fileAttachmentUploadUrl(); // sysAttachment.uploadFileUrl();
        }
    },
    components: {
        pageFields,
        h5Form
    },
    mounted() {
        this.headers = {
            token: localStorage.getItem('token'),
            tenant: localStorage.getItem('tenant')	
        }
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        detailBeforeUpload(file) {
            this.$refs.pageRef.clearFiles();
            this.pageTemplateList = true;
            if (file.name.endsWith(".jpg") || file.name.endsWith(".png")) {
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
                                title: `请上传宽高比小于 ${width} :${height}的图片`
                            });
                            this.pageTemplateList = false;
                            reject();
                        } else if (height && this.height < 750) {
                            self.$Notice.error({
                                title: "请上传宽度不小于750px的图片"
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
            if (this.formValidate.fromData) {
                this.modal1 = true;
                this.$refs.h5FormRef.getFormDataFn(this.formValidate);
                this.$refs.h5FormRef.getInfo();
            }
        },
        chooseDetailMethod(data) {
            this.formValidate.fromData = JSON.stringify(data);
            this.$refs.formRef.validateField("fromData");
            this.valSelect = data.filter((item, index) => {
                return item.editable == "1";
            });
            console.log(this.valSelect);
        },
        saveBtn() {
            this.formValidate.source = `${this.formValidate.source1},${this.formValidate.source2},${this.formValidate.source3}`;
            delete this.formValidate.source1;
            delete this.formValidate.source2;
            delete this.formValidate.source3;
            console.log(this.formValidate);
            let Obj = this.formValidate;
            this.$refs.formRef.validate(validRes => {
                if (validRes) {
                    if (this.isActioning) {
                        //多次提交拦截
                        return;
                    }
                    this.isActioning = true;
                    this.updateLoadingStatus({ isLoading: true });
                    crmQrcode
                        .save(Obj)
                        .then(valid.call(this))
                        .then(res => {
                            if (res.ok) {
                                this.$Message.success(res.data.message);
                                // this.getListData();
                                this.modal1 = false;
                                this.$router.push({
                                    name: "core.lesseeTrialTenant",
                                    params: {
                                        tabValName: "name3"
                                    }
                                });
                            }
                        })
                        .catch(errors.call(this))
                        .finally(() => {
                            this.updateLoadingStatus({ isLoading: false });
                            setTimeout(() => {
                                //多次提交拦截
                                this.isActioning = false;
                            }, 200);
                        });
                }
            });
        },
        getListDataByRole() {
            /* 
            用这个接口/a/ws/sys/user/listDataByRole?roleIds=3&pageSize=-1&officeIds=3
officeIds根据上面选的校区动态的，其他参数都不变
            */
            // let obj = {
            //     roleIds: 3,
            //     pageSize: -1,
            //     officeIds: this.formValidate.ownerOffice
            // };
            // sysUser
            //     .listDataByRole(obj)
            //     .then(valid.call(this))
            //     .then(res => {
            //         if (res.ok) {
            //             this.ownerIdList = res.data.data;
            //         }
            //     })
            //     .catch(errors.call(this))
            //     .finally(() => {
            //         // this.updateLoadingStatus({ isLoading: false });
            //     });
        },
        handleSizeError(file, fileList) {
            this.$Message.error("请上传2M以内的图片文件");
        },
        handleFormatError(file) {
            this.pageTemplateList = false;
            this.$Notice.warning({
                title: "格式不正确",
                desc: "文件格式为" + file.name + "不正确, 请选择正确格式的图片"
            });
        },
        handleFormatError1(file) {
            this.pageTemplateList = false;
            this.$Notice.warning({
                title: "格式不正确",
                desc:
                    "文件格式为" +
                    file.name +
                    "不正确, 请选择.png 或者.jpg格式的图片"
            });
        },
        HandleSuccess: function(data) {
            this.updateLoadingStatus({ isLoading: false });
            this.formValidate.url = data.data.url;
            this.$Message.success("上传成功");
            this.pageTemplateList = false;
        },
        HandleRemove: function() {
            this.formValidate.logoUr = "";
        },
        HandleSuccess1: function(data) {
            this.updateLoadingStatus({ isLoading: false });
            this.defaultList = [
                {
                    name: data.data.filename,
                    url: data.data.url
                }
            ];
            this.formValidate.logoUr = data.data.url;
            this.$Message.success("上传成功");
        },
        showPageFields() {
            this.$refs.pageFieldRef.classShowMethods();
        },
        cancelBtn() {
            // this.$router.go(-1);
            // this.cancelBtn = true;
            this.$router.push({
                name: "core.lesseeTrialTenant",
                params: {
                    tabValName: "name3"
                }
            });
        }
    }
};
</script>