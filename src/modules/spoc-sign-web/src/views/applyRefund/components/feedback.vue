<style lang="less">
.feedback {
    .clear{
        zoom: 1;
        &::before, &::after{
            content: '';
            display: block;clear: both;height: 0;line-height: 0;font-size: 0;
        }
    }
    .feedbackcontent {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
        & > div {
            font-size: 14px;
            font-family: HiraginoSansGB-W3;
            font-weight: normal;
            color: #999;
        }
        & > div:nth-child(1) {
            width: 85px;
            text-align: right;
            line-height: 32px;
            .redStyle {
                color: red;
            }
        }
        & > div:nth-child(2) {
            width: 400px;
            margin-left: 10px;
            textarea.ivu-input {
                height: 60px;
            }
            .ivu-upload {
                .Uploadtip {
                    font-size: 14px;
                    font-family: PingFangSC-Regular;
                    font-weight: 400;
                    color: rgba(28, 43, 54, 1);
                    & + p {
                        font-size: 14px;
                        font-family: PingFangSC-Regular;
                        font-weight: 400;
                        color: rgba(28, 43, 54, 0.5);
                    }
                }
            }
        }
    }
    .ivu-upload-list-file{
        position: relative;
        padding-left: 26px;padding-right: 30px;
        & > span .ivu-icon{
            position: absolute;left: 4px;top: 8px;font-size: 13px;color: #999;
            font-family: "iconfont" !important;
            &::before{
                content: "\e620";
            }
        }
        .ivu-upload-list-remove{
            position: absolute;right: 0;top: 5px;
        }
    }
}
</style>
<template>
    <div class="feedback">
        <div class="feedbackcontent">
            <div>
                <span class="redStyle">*</span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_feedback_5016')}}</div>
            <div>
                <Select v-model="params.refundReasonType" @on-change="changeStatus" :placeholder="$t('modules_spoc_sign_web_src_views_applyrefund_components_feedback_5017')">
                    <Option v-for="item in ht_refund_reason_type" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>
        </div>
        <div class="feedbackcontent">
            <div>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_feedback_5018')}}</div>
            <div>
                <Input v-model="params.remark" type="textarea" @on-change="changeStatus" :placeholder="$t('modules_spoc_core_web_src_views_schoolmanagement_index_263')"/>
            </div>
        </div>
        <div class="feedbackcontent">
            <div>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_feedback_5020')}}</div>
            <div>
                <Input v-model="params.reason" type="textarea" @on-change="changeStatus" :placeholder="$t('scoretemplate_compontents_scoremodify_528')"/>
            </div>
        </div>
        <div class="feedbackcontent" style="margin-bottom: -18px;">
            <div>
                <span class="redStyle">*</span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_feedback_5021')}}</div>
            <div>
                <Upload
                    :action="imgAction" 
                    type="drag"
                    ref="uploads"
                    :data="uploadData" 
                    :headers="headers"
                    name="file" 
                    :show-upload-list="true" 
                    :on-success="handleSuccess" 
                    :format="['rar','zip','doc','docx','pdf','jpg','ppt','pptx','xls','xlsx','png']" 
                    :on-exceeded-size="handleMaxSize"
                    :before-upload="handleBeforeUpload"
                    :on-format-error="handleFormatError" 
                    :on-remove="moveFile"
                    :max-size="20480">
                    <div style="padding: 10px 0">
                        <!-- icon-zhuanchuxueyuan -->
                        <!-- <i class="iconfont icon-zhuanchuxueyuan"></i> -->
                        <i class="iconfont icon-inbox" style="font-size:24px;color:#2d8cf0"></i>
                        <!-- <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon> -->
                        <p class="Uploadtip">{{$t('courselist_compontents_servicecontent_210')}}</p>
                        <p>{{$t('modules_spoc_crm_web_src_views_customermanagement_importpage_1249')}}</p>
                    </div>
                </Upload>
            </div>
        </div>
    </div>
</template>
<script>
import { mapMutations } from "vuex";
import valid, { errors, sysDict, sysAttachment, api } from "../../../libs/request";
export default {
    props: {
        ht_refund_reason_type: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            changed: false,
            params: {
                refundReasonType: '',
                remark: '',
                reason: '',
            },
            fileLists: [],
            defaultFileList: [],
            imgAction: '',
            uploadData: {
                // objectId: '',
                // type: "secretaire",
                // fileType: "all",
                // dirName: 'images',
                bizId: '',
                bizType: 'image',
                isSingle: true
            },
            headers:{}
        };
    },
    computed: {
        uploadImg: function() {
            return sysAttachment.uploadFileUrl();
        }
    },
    mounted() {
        this.imgAction = api.fileAttachmentUploadUrl(); // sysUser.uploadImg();
        this.headers = {
            token: localStorage.getItem('token'),
            tenant: localStorage.getItem('tenant')	
        }
    },
    methods: {
        init() {
            this.params = {
                refundReasonType: '',
                remark: '',
                reason: '',
            }
            this.fileLists = [];
            this.$refs.uploads.clearFiles();
        },
        initParams(params) {
            // 从我的合同审批 - 详情 - 重新提交 - 初始化
            this.params = {
                refundReasonType: params.refundReasonType || '',
                remark: params.remarks || '',
                reason: params.reason || '',
            }
            this.fileLists = params.refundReasonList || [];
            if(params.refundReasonList && params.refundReasonList.length) {
                console.log(params.refundReasonList)
                let arr = []
                params.refundReasonList.forEach(v => {
                    arr.push({
                        name: v.realName,
                        url: v.filePath
                    })
                })
                this.defaultFileList = arr
            }
        },
        changeStatus() {
            this.changed = true;
        },
        onNext() {
            if(this.changed) {
                this.changed = false;
                let params = Object.assign({}, this.params);
                let attachmentIds = [];
                this.fileLists.forEach(file => {
                    attachmentIds.push(file.id)
                });
                params.attachmentIds = attachmentIds;
                return params;
            }
            else return false;
        },
        handleMaxSize() {
            this.$Message.error(this.$t('modules_spoc_sign_web_src_views_applyrefund_components_feedback_5024'))
        },
        handleBeforeUpload() {},
        handleFormatError() {
            this.$Message.error(this.$t('modules_spoc_sign_web_src_views_applyrefund_components_feedback_5025'));
        },
        // handleSuccess(res, file, fileList) {
        //     console.log(res)
        //     // console.log(file)
        //     if(res.status == "success" && res.statusCode == "200"){
        //         this.changeStatus();
        //         let _data = res.data;
        //         this.fileLists.push(_data);
        //     } else {
        //         this.$Message.error(res.message)
        //         this.$refs.uploads.fileList.splice(fileList.indexOf(file), 1);
                
        //     }
        //     // console.log(this.fileLists)
        // },
        handleSuccess(response) {
            this.changeStatus();
            // console.log(response, '文件上传')
            this.fileLists.push(response.data)
        },
        moveFile(file, fileList) {
            console.log(file, fileList)
            this.changeStatus();
            this.fileLists = [];
            fileList.forEach(e => {
                this.fileLists.push(e.response.data)
            });
            // console.log(this.fileLists)
        }
        // moveFile(item, index) {
        //     this.fileLists.splice(index, 1)
        //     console.log(item)
        //     console.log(index)
        // }
    }
};
</script>
