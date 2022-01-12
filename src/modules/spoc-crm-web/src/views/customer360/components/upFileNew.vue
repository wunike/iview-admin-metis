<style lang="less">
@pinkish-grey: #ccc;
@black: #333;
@white: #e0e0e0;
.upFileNew {
	position: absolute;
	box-shadow: 0 0 10px 0 rgba(4, 0, 0, 0.15);
	border: solid 1px @white;
	padding: 10px;
	width: 440px;
	min-height: 120px;
	box-sizing: border-box;
	background-color: #fff;
	top: 25px;
	// left: -20px;
	z-index: 90;
	padding-bottom: 52px;
	&:before {
		content: "";
		border: 5px solid #fff;
		border-left-color: transparent;
		border-bottom-color: transparent;
		position: absolute;
		transform: rotate(-45deg);
		left: 24px;
		box-shadow: 2px -2px 2px rgba(200, 200, 200, 0.4);
		top: -5px;
	}
	.hidden{
		display: none;
	}
	.close-btn {
		position: absolute;
		top: 10px;
		right: 10px;
		.ivu-icon {
			font-size: 18px;
			color: #999;
			cursor: pointer;
			&:hover {
				color: #555;
			}
		}
	}
	.num-bar {
		position: absolute;
        bottom: 10px;
        right: 10px;
		.num-text {
			float: left;
			color: #999;
		}
		.sure {
			float: right;
			line-height: 24px;
			cursor: pointer;
			padding: 0 12px;
			border-radius: 2px;
			border: solid 1px @pinkish-grey;
			color: @black;
			&:hover {
				background-color: #f5f5f5;
			}
		}
	}
	.up-file-lists {
		.li{
			list-style: none;
			line-height: 18px;
		}
		.del-btn{
			color: #f00;
			cursor: pointer;
			margin-left:12px;
		}
	}
	.add-icon{
        width: 60px;
        height: 60px;
        margin: 4px;
        float: left;
        border: 2px dashed @pinkish-grey;
        text-align: center;
        line-height: 60px;
        border-radius: 4px;
        .ivu-icon{
            color: @pinkish-grey;
            font-size: 20px;
        }
        &:hover{
            cursor: pointer;
            border-color: #aaa;
            .ivu-icon{
                color: #aaa;
            }
        }
    }
}
</style>
<template>
    <div class="upFileNew">
        <!-- <div class="close-btn" @click.stop="close">
            <Icon type="android-close"></Icon>
        </div> -->
		<!-- <label :for="fileInputId" class="add-icon">
			<Icon type="ios-add" :size="30"/>
		</label> -->
		<div style="line-height: 30px;">
            <h3>上传文件</h3>
            <p>单个图片5M以内,支持doc,docx,xls,xlsx,pdf格式</p>
        </div>
		<div style="clear:both;"></div>
		<div class="up-file-lists">
			<ul>
				<li class="li" v-for="(item,index) in files" :key="'f'+index">
					<span>{{item.name?item.name:item.filename}}</span>
					<span class="del-btn" @click="delfile(item,index)">{{$t('modules_spoc_crm_web_src_views_customer360_components_upfilenew_1068')}}</span>
				</li>
			</ul>
		</div>
		<Upload 
			:headers="headers"
			:action="uploadFileUrl"
			:show-upload-list="false"
			:before-upload="beforeUpload"
			:on-success="handleSuccess"
			:format="['doc','docx','xls','xlsx','pdf']"
			:max-size="5120"
			:on-format-error="handleFormatError"
			:on-exceeded-size="handleMaxSize"
			:data="{
				bizId: objectId,
				bizType: objectType,
				isSingle: true
			}"
			name="file"
			v-if="maxNum == 0 || files.length < maxNum">
			<Button :disabled="files.length>=maxNum" type="primary" size="small">选择文件</Button>
		</Upload>
		<!-- <cos-upload 
            ref="cosUploadFile"
            v-if="objectType && kind" 
            :objectType="objectType" 
            :objectId="objectId"
            :kind="kind"
            :accept="['doc','docx','xls','xlsx','pdf']"
            :fileInputId="fileInputId" 
            :maxNum="maxNum" 
            @delFromUpload="delFromUpload"
            @hasUploadFile="hasUploadFile">
        </cos-upload> -->
        <div class="num-bar clearfix">
			<Button class="sure" @click.stop="sure">{{$t('classroom_allscore_54')}}</Button>
		</div>
    </div>
</template>
<script>
import valid,{errors, sysAttachment, api } from '../../../libs/request.js'
import {mapMutations} from 'vuex';
import { clone } from '@public/libs/util.js'
import cosUpload from '@public/modules/cosUpload1'
export default {
	props:{
		objectType:{ //获取token接口的参数  customer/student/office
			type:String,
			required: true
		},
		objectId:{ //获取token接口的参数  业务实体编号
			type:String,
			default: ''
		},
		kind:{ //获取token接口的参数  image、file、video业务种类（录音、合同、头像、图片、视频、音频....）
			type:String,
			required: true
		},
        setfile:{
            type:Array,
            default:()=>{
                return [];
            }
		},
		maxNum: {
            type: [Number || String],
            default: 3
        },
        fileInputId:{
			type: String, 
			required: true
		},
	},
	mounted() {
		this.headers = {
			token: localStorage.getItem('token'),
			tenant: localStorage.getItem('tenant')	
		}
	},
	data() {
		return {
			files: clone(this.setfile),
			headers:{},
            uploadFileUrl: api.fileAttachmentUploadUrl(), // sysAttachment.uploadFileUrl()
		};
	},
	computed: {
		num(){
			return `${this.files.length}/${this.maxNum}`;
		}
	},
	components: {
		cosUpload
	},
	methods: {
		...mapMutations(['updateLoadingStatus']),
		beforeUpload(){
            this.updateLoadingStatus({ isLoading: true });
        },
		handleSuccess (res, file) {
            this.updateLoadingStatus({ isLoading: false });
			console.info(res,1);
			if(res.code === 0){
				const item = res.data;
				this.files.push(item);
			} else {
				this.$Message.error(res.msg);
			}
        },
        handleFormatError (file) {
            this.updateLoadingStatus({ isLoading: false });
            this.$Message.error("请选择doc,docx,xls,xlsx,pdf格式文件");
        },
        handleMaxSize (file) {
            this.updateLoadingStatus({ isLoading: false });
            this.$Message.error("请选择不超过5M的文件");
        },
		reset(){
            this.files = []
            if(this.$refs.cosUploadFile){
                this.$refs.cosUploadFile.reset()
            }
        },
        hasUploadFile(attachmentObj){
            console.log("attachmentObj = " + attachmentObj)
            this.files.push(attachmentObj)
        },
		close() {
            this.$emit("close");
        },
        sure(){
			this.$emit("close", 'sure');
        },
        delFromUpload(index){
            this.files.splice(index,1);
        },
        delFile(index,item){
            this.files.splice(index,1);
            this.$refs.cosUploadFile.deleteFileFromParent(index)
        }
	},
    watch:{
        num(v){
            this.$emit('on-change',this.files);
        }
    }
};
</script>


