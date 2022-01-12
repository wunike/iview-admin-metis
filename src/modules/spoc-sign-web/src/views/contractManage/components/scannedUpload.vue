<style lang="less">
	.modal-form {
		.ivu-modal-header p,
		.ivu-modal-header-inner {
			font-size: 18px;
			font-weight: 600;
		}
		.ivu-checkbox-wrapper {
			font-size: 14px;
		}
	}
	
	.modal-form .ivu-form {
		font-size: 14px;
		.width200 {
			width: 200px;
		}
		.width204 {
			width: 204px;
		}
		.width316 {
			width: 316px;
		}
		.width244 {
			width: 244px;
		}
		.width136 {
			width: 136px;
		}
		.mr14 {
			margin-left: 12px;
		}
		.mr150 {
			margin-left: 150px;
		}
		.mr10 {
			margin-left: 10px;
		}
		.p90 {
			margin-left: 80px;
			color: #999999;
		}
		.fl {
			float: left;
		}
		.fr {
			float: right;
		}
		.inline {
			display: inline-block;
		}
		.ivu-form-item-label {
			font-size: 14px;
			color: #999999;
		}
		.ivu-input {
			// background: #fafafa;
			color: #212121;
			font-size: 14px;
		}
		.ivu-input:hover {
			background: #fff;
		}
		.ivu-select-placeholder {
			color: #b3b3b3;
		}
		.ivu-select-selection {
			background: #FAFAFA;
		}
		.fileName {
			position: relative;
			display: inline-block;
			span {
				position: absolute;
				line-height: 32px;
				bottom: -24px;
				right: 12px;
				color: red;
				cursor: pointer;
				display: none;
			}
		}
		.fileName:hover {
			span {
				display: inline-block;
			}
		}
	}
	.modalFile {
		.formFile {
			.ivu-form-item {
				margin-bottom: 14px;
			}
			.pactId {
				.ivu-form-item-label {
					padding: 10px 12px 10px 0;
				}
			}
			.sacn {
				.ivu-form-item-label {
					padding: 14px 12px 10px 0;
				}
			}
			.fileBox {
				.copyFileName {
					position: relative;
					display: inline-block;
					span {
						position: absolute;
						line-height: 32px;
						bottom: 0px;
						right: -42px;
						color: red;
						cursor: pointer;
						display: none;
					}
				}
				.fileNameBox:hover .copyFileName {
					span {
						display: inline-block;
					}
				}
			}
		}
	}
</style>

<template>
		<Modal v-model="modalFile" :mask-closable="false" :closable="false" ref="modalFile" :title="fileTit" width="730" class="modalFile modal-form">
			<div>
				<Form ref="formFile" :label-width="150" class="formFile">
					<FormItem :label="$t('modules_spoc_sign_web_src_views_approval_approvalnew_5071')" class="pactId">
						<p>{{fileData.id}}</p>
					</FormItem>
					<FormItem :label="$t('modules_spoc_sign_web_src_views_contractmanage_components_scannedupload_5642')" style="margin-bottom: 14px;" class="scan">
						<div class="fileBox">
							<div class="fileNameBox" v-for="(item,index) in fileData.scanlist" v-if="fileData.scanlist.length" :key="item.id">
								<p class="copyFileName">
									<a href="javascript:void(0)" v-text="!!item.fileName?item.fileName:''">
									</a>
									<span @click="delFile1(item.id,index)">{{$t('classlist_compontents_detailinfo_46')}}</span>
								</p>
							</div>
							<p style="float: left;" v-if="!fileData.scanlist.length">{{$t('modules_spoc_sign_web_src_views_contractmanage_components_scannedupload_5644')}}</p>
							<div class="fl uploadBox">
								<!-- 	<Upload ref="upload" name="files" :data="{'objectId':modalId,'type':'ht_contract_scan','dirName':fileData.type=='images'?'images':fileData.type=='files'?'files':'all','isOverride':1}" :show-upload-list="false" :on-success="handleSuccess2" :format="['jpg','jpeg','png','pdf']" :max-size="2048" :on-format-error="handleFormatError2" :on-exceeded-size="handleMaxSize" :action="uploadFile"><Button type="primary">{{$t('modules_spoc_sign_web_src_views_contractmanage_components_scannedupload_5645')}}</Button></Upload> -->
								<!--<Button type="primary" @click="onUploadLocal">{{$t('modules_spoc_sign_web_src_views_contractmanage_components_scannedupload_5645')}}</Button>-->
								 <Upload 
                                    :action="imgAction" 
                                    ref="upload"
                                    :data="{'bizId':modalId,'bizType':'image','isSingle':true}" 
                                    :headers="headers"
                                    name="file" 
                                    :show-upload-list="false" 
                                    :on-success="handleSuccess2" 
                                    :format="['jpg','jpeg','png','pdf']" 
                                    :on-exceeded-size="handleMaxSize"
                                    :max-size="2048">
                                    <Button type="primary">点击上传</Button>
                                </Upload>
							</div>
						</div>
					</FormItem>
				</Form>
			</div>
			<div slot="footer">
				<Button @click="modalFile=false">{{$t('classroom_allscore_53')}}</Button>
				<Button type="primary" @click="archive">{{$t('classroom_allscore_54')}}</Button>
			</div>
		</Modal>
</template>

<script>
	export default(){
		data(){
			return {
				modalFile:false
			}
		},
		methods:{
			
		}
	}
</script>

