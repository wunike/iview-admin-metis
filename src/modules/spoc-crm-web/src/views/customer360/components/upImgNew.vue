<style lang="less">
@pinkish-grey: #ccc;
@black: #333;
@white: #e0e0e0;
.upImgNew {
	box-shadow: 0 0 10px 0 rgba(4, 0, 0, 0.15);
	border: solid 1px @white;
	padding: 10px;
	width: 388px;
    min-height: 120px;
	box-sizing: border-box;
	background-color: #fff;
    position: absolute;
    // left: -20px;
    top: 25px;
    z-index: 96;
    padding-bottom: 52px;
    .hidden{
        display: none;
    }
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
            &:hover{
                background-color: #f5f5f5;
            }
		}
    }
    .imgdiv{
        width: 60px;
        height: 60px;
        float: left;
        margin: 4px;
        border: 1px dashed #ddd;
        position: relative;
        .img{
            width: 100%;
            height: 100%;
        }
        &:hover{
            .del-btn{
                display: block;
            }
            &:after{
                background: rgba(1, 1, 1, 0.5);
                content: " ";
                left: 0;
                top: 30px;
                right: 0;
                bottom: 0;
                width: 100%;
                position: absolute;
                z-index: 20;
            }
        }
        .del-btn{
            position: absolute;
            left: 40px;
            top: 35px;
            color: #fff;
            font-size: 20px;
            cursor: pointer;
            display: none;
            z-index: 77;
            
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
    <div class="upImgNew">
       <!--  <div class="close-btn" @click.stop="close">
            <i class="iconfont icon-lujingfuzhi" style="color:#000;"></i>
        </div> -->
        <div style="line-height: 30px;">
            <h3>上传图片</h3>
            <p>单个图片5M以内,支持jpg,jpeg,png格式</p>
        </div>
        <div class="clearfix">
            <div class="imgdiv" v-for="(attachmentObj,index) in imgs" :key="index">
                <img class="img" :src="attachmentObj.url">
                <Icon @click.native="delImg(index)" class="del-btn" type="ios-trash-outline" />
            </div>
            <Upload 
                :headers="headers"
                :action="uploadFileUrl"
                :show-upload-list="false"
                :before-upload="beforeUpload"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png']"
                :max-size="5120"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :data="{
                    bizId: objectId,
                    bizType: objectType,
                    isSingle: true
                }"
                name="file"
                v-if="maxNum == 0 || imgs.length < maxNum">
                <label class="add-icon">
                    <Icon type="ios-add" :size="30"/>
                </label>
            </Upload>
        </div> 
        <!-- <cos-upload 
            :showButton="false"
            ref="cosUploadImg"
            v-if="objectType && kind" 
            :objectType="objectType" 
            :objectId="objectId"
            :kind="kind"
            :accept="['png','jpg','jpeg']"
            :fileInputId="fileInputId" 
            @delFromUpload="delFromUpload"
            @hasUploadFile="hasUploadFile">
        </cos-upload> -->
        <div class="num-bar clearfix">
            <Button class="sure" @click.stop="sure">{{$t('classroom_allscore_54')}}</Button>
        </div>
    </div>
</template>
<script>
import {mapMutations} from 'vuex';
import { clone } from '@public/libs/util.js'
import cosUpload from '@public/modules/cosUpload'
import valid, { errors, api} from "../../../libs/request";

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
        setimg:{
            type:Array,
            default:()=>{
                return [];
            }
        },
        maxNum: {
            type: [Number || String],
            default: 9
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
            headers:{},
            imgs:clone(this.setimg),
            uploadFileUrl: api.fileAttachmentUploadUrl(), // sysAttachment.uploadFileUrl()
		};
	},
	computed: {
		num() {
			return `${this.imgs.length}/${this.maxNum}`;
		}
    },
    components:{
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
            const item = res.data;
            this.imgs.push(item);
        },
        handleFormatError (file) {
            this.updateLoadingStatus({ isLoading: false });
            this.$Message.error("请选择jpg,jpeg,png格式文件");
        },
        handleMaxSize (file) {
            this.updateLoadingStatus({ isLoading: false });
            this.$Message.error("请选择不超过5M的图片");
        },
        reset(){
            this.imgs = []
            if(this.$refs.cosUploadImg){
                this.$refs.cosUploadImg.reset()
            }
        },
        hasUploadFile(attachmentObj){
            console.log("attachmentObj = " + attachmentObj)
            this.imgs.push(attachmentObj)
        },
		close() {
            this.$emit("close");
        },
        sure(){
			this.$emit("close", 'sure');
        },
        delFromUpload(index){
            this.imgs.splice(index,1);
        },
        delImg(index,item){
            this.imgs.splice(index,1);
            this.$refs.cosUploadImg.deleteFileFromParent(index)
        }
    },
    watch:{
        num(v){
            this.$emit('on-change',this.imgs);
        }
    }
};
</script>


