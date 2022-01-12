<style lang="less">
    .upload-lists{
        width:100%;
        .del{
            &:hover{
                color:#888;
            }
        }
        >div{
            width:100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding-left:50px;
            margin-bottom:12px;
            div{
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                img{
                    width:16px;
                    height:16px;
                    margin-right:12px;
                }
            }
        }

    }
</style>
<template>
    <div>
   		<Modal v-model="showModal"
            :title="title"
            width="600">
            <Form :model="formItem" :label-width="120">
                <FormItem :label="$t('modules_spoc_sign_web_src_views_contractmanage_components_scanningcopymodal_5648')">
                    <!-- <Upload
                        name="files"
                        :action="uploadFileUrl"
                        :data="uploadData"
                        :format="['jpg','png','pdf']" 
                        :on-format-error="formatError"
                        :on-success="handleSuccess"
                        :show-upload-list="false"
                        :before-upload="beforeUpload">
                        <Button icon="ios-cloud-upload-outline">{{$t('modules_spoc_core_web_src_views_announcement_addannouncement_63')}}</Button>
                        <div style="color:rgba(0,0,0,0.45);">{{$t('modules_spoc_sign_web_src_views_contractmanage_components_scanningcopymodal_5650')}}</div>
                    </Upload> -->
                    <Upload 
                        name="file"
                        :action="imgAction"
                        :data="uploadData"
                        :headers="headers"
                        :format="['jpg','png','pdf']" 
                        :on-format-error="formatError"
                        :on-success="handleSuccess"
                        :show-upload-list="false"
                        :before-upload="beforeUpload">
                        <Button icon="ios-cloud-upload-outline">上传文件</Button>
                        <div style="color:rgba(0,0,0,0.45);">支持扩展名：.png .pdf .jpg</div>
                    </Upload>
                </FormItem>
            </Form>
            <div class="upload-lists">
                <div v-for="item in list" :key="item.id">
                    <div>
                        <a v-if="suffix(item.url)" style="margin-left:-3px;margin-right:8px;" target="_blank" :href="item.url"><Icon type="md-document" size="22" /></a>
                        <img v-else :src="item.url" alt="">
                        <a target="_blank" :href="item.url">{{item.filename}}</a>
                    </div>
                    <Icon @click="deleteFn(item.id)" style="cursor: pointer;" class="del" size="16" type="ios-close-circle" />
                </div>
            </div>
            <div slot="footer">
                <Button type="primary" size="large" @click="ok">{{$t('courselist_compontents_servicecontent_216')}}</Button>
            </div>
    	</Modal>
    </div>
</template>
<script>
import { mapGetters, mapState, mapMutations } from 'vuex';
import valid, { errors, htContract,sysAttachment, api } from "../../../libs/request";
export default {
 	data() {
		return {
            showModal: false,
            formItem:{},
            uploadData:{},
            ctId: '',
            title:this.$t('modules_spoc_sign_web_src_views_contractmanage_components_scanningcopymodal_5652'),
            list:[],
            imgAction: '',
            headers: {}
		};
	},
	components: {
    },
    computed: {
        uploadFileUrl: function () {
            return sysAttachment.uploadFileUrl();
        },

    },
    mounted() {
        this.imgAction = api.fileAttachmentUploadUrl(); // sysUser.uploadImg();
        this.headers = {
            token: localStorage.getItem('token'),
            tenant: localStorage.getItem('tenant')	
        }
    },
	methods: {
        ...mapMutations(['updateLoadingStatus']),
        suffix (v) {
            if(v.substr(-3) == 'pdf'){
                return true;
            }else{
                return false;
            }
        },
        searchPort(v){
            api.findAttachmentByBizTypesAndBizIds({ 
                bizTypes: "HT_CONTRACT_SCAN",
                bizIds: this.ctId
            })
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.list = res.data.data;
                    if(!v){
                        this.associateScanAttachmentFn();//更新状态
                    }
                }
            })
            .catch(errors.call(this))
            .finally(() => {
                this.updateLoadingStatus({ isLoading: false });
            });
            // sysAttachment.findListByTypes({
            //     objectId: this.ctId,
            //     type:'ht_contract_scan'
            // })
            // .then(valid.call(this))
            // .then(res => {
            //     if (res.ok) {
            //         this.list = res.data.data.list;
            //         if(!v){
            //             this.associateScanAttachmentFn();//更新状态
            //         }
            //     }
            // })
            // .catch(errors.call(this)).finally(()=>{
            //     this.updateLoadingStatus({ isLoading: false });
            // })
        },
        beforeUpload(){
            this.updateLoadingStatus({ isLoading: true });
        },
        formatError(file){
            this.updateLoadingStatus({ isLoading: false });
            this.$Message.error({
                content: file.name + this.$t('modules_spoc_sign_web_src_views_contractmanage_components_scanningcopymodal_5653'),
                duration: 3
            });
        },
        handleSuccess(response, file, fileList){
            this.$Message.success(this.$t('modules_spoc_sign_web_src_views_contractmanage_components_scanningcopymodal_5654'))
            this.searchPort()
        },
        associateScanAttachmentFn() {
            htContract.associateScanAttachment({
                ctId: this.ctId
            })
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.$emit('updataTable');//更新父组件列表
                }
            })
            .catch(errors.call(this)).finally(()=>{
            })
        },
        ok(){
            this.showModal = false
        },
        show(id, isUploaded) {
            this.ctId = id
            if(id){
                this.uploadData = {
                    bizId: id,
                    bizType: 'HT_CONTRACT_SCAN',
                    isSingle: true
                }
                if(isUploaded == '1'){
                    this.title = this.$t('modules_spoc_sign_web_src_views_contractmanage_components_scanningcopymodal_5655')
                } else {
                    this.title = this.$t('modules_spoc_sign_web_src_views_contractmanage_components_scanningcopymodal_5652')
                }
                this.showModal = true
                this.searchPort(true)
            } else {
                this.$Message.error(this.$t('modules_spoc_sign_web_src_views_contractmanage_components_scanningcopymodal_5656'))
            }
        },
        deleteFn(id) {
            let params = {
                'ids[]': id
            };
            api.deleteAttachment(params)
            // sysAttachment.deleteById({
            //     id: id
            // })
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.$Message.success(this.$t('startemplate_index_605'))
                    this.searchPort()
                }
            })
            .catch(errors.call(this)).finally(()=>{
                this.updateLoadingStatus({ isLoading: false });
            })
        },

	},
};
</script>
