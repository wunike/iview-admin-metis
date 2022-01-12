<template>
    <Modal
        class="upload-proof"
        width="600"
        v-model="uploadProof"
        :mask-closable="false"
        :title="$t('modules_spoc_sign_web_src_views_receiptmanagement_components_uploadfile_7032')">
        <div class="box-item" style="margin-bottom:0;">
            <em>*</em>
            <span>{{$t('modules_spoc_sign_web_src_views_receiptmanagement_components_uploadfile_7033')}}</span>
            <div class="center-right" >
                <Upload
                    ref="upload"
                    :action="imgAction"
                    :headers="headers"
                    type="drag"
                    :max-size="2048"
                    :on-exceeded-size="handleMaxSize"
                    :before-upload="handleBeforeUpload"
                    :on-format-error="handleFormatError"
                    :on-remove="moveFile"
                    :format="['gif','jpg','png','svg','jpeg']"
                    name="file"
                    :show-upload-list="true"
                    :data="{bizId:'',bizType:'HT_REFUND',isSingle:true}"
                    :on-success="handleSuccess">
                    <div style="padding: 20px 0">
                        <i class="iconfont icon-inbox" style="font-size:24px;color:#2d8cf0"></i>
                        <p class="Uploadtip">{{$t('courselist_compontents_servicecontent_210')}}</p>
                        <p>{{$t('modules_spoc_sign_web_src_views_receiptmanagement_components_uploadfile_7035')}}</p>
                    </div>
                </Upload>
            </div>
        </div>
        <div slot="footer">
            <Button @click="cancelUpLoad">{{$t('classroom_allscore_53')}}</Button>
            <Button type="primary" @click="submitUpLoad">{{$t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1851')}}</Button>
        </div>
    </Modal>
</template>

<script>
import valid, { errors, sysAttachment, htReceipt, api } from "../../../libs/request";
export default {
    name: 'uploadFile',
    data(){
        return {
            uploadProof: false,
            fileLists: [],
            id: '',
            fileLength: 0,
            imgAction: '',
            headers:{}
        };
    },
    mounted() {
        this.imgAction = api.fileAttachmentUploadUrl(); // sysUser.uploadImg();
        this.headers = {
            token: localStorage.getItem('token'),
            tenant: localStorage.getItem('tenant')	
        }
    },
    computed: {
        uploadImg: function() {
            return sysAttachment.uploadFileUrl();
        }
    },
    methods: {
        cancelUpLoad(){
            this.fileLists = [];
            this.$refs.upload.clearFiles();
            this.uploadProof = false
        },
        //确认上传凭证
        submitUpLoad(){
            // this.uploadProof = false
            // console.log(this.fileLists)
            let attachmentIds = [];
            this.fileLists.forEach(file => {
                attachmentIds.push(file.id)
            });
            let params = {
                id: this.id,
                attachmentIds: attachmentIds
            }
            this.associateAttachment(params)
        },
        associateAttachment(params) {
            htReceipt.associateAttachment(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.$Message.success(this.$t('scoretemplate_compontents_scoremodify_545'));
                    this.$emit('uploadLists')
                    this.cancelUpLoad();
                }
            })
            .catch(errors.call(this))
        },
        show(item) {
            // console.log(item.id)
            this.fileLength = item.filePaths ? item.filePaths.split(',').length : 0;
            this.id = item.id;
            this.uploadProof = true
        },
        handleMaxSize() {
            this.$Message.error(this.$t('modules_spoc_sign_web_src_views_applyrefund_components_feedback_5024'))
        },
        handleBeforeUpload() {
            // console.log(this.fileLength);
            // console.log(this.fileLists);
            if(this.fileLength + this.fileLists.length > 9) {
                this.$Message.error(this.$t('modules_spoc_sign_web_src_views_receiptmanagement_components_uploadfile_7040'))
                return false;
            }
        },
        handleFormatError() {
            this.$Message.error(this.$t('modules_spoc_sign_web_src_views_receiptmanagement_components_uploadfile_7035'));
        },
        handleSuccess(response) {
            let _data = response.data;
            this.fileLists.push(_data);
        },
        moveFile(file, fileList) {
            this.fileLists = [];
            fileList.forEach(e => {
                this.fileLists.push(e.response.data)
            });
        }
    }
}
</script>
