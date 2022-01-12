<style lang="less">
@pinkish-grey: #ccc;
@black: #333;
@white: #e0e0e0;
.cos-crm-up-img {
	box-shadow: 0 0 10px 0 rgba(4, 0, 0, 0.15);
	border: solid 1px @white;
	padding: 10px;
	width: 369px;
    // min-height: 176px;
    // max-height: 300px;
	box-sizing: border-box;
	background-color: #fff;
    position: absolute;
    // left: -20px;
    bottom:10px;
    z-index: 999;
    .hidden{
        display: none;
    }
    &:before {
		content: "";
		border: 5px solid #fff;
		border-left-color: transparent;
		border-bottom-color: transparent;
		position: absolute;
		transform: rotate(135deg);
		left: 24px;
		box-shadow: 2px -2px 2px rgba(200, 200, 200, 0.4);
        // top: -5px;
        bottom: -5px;
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
        margin-top: 5px;
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
    .img-lists{
        min-height: 60px;
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
    .error-txt{
        display: inline-block;position: relative;top: -12px;
        color: red;
    }
}
</style>
<template>
    <div class="cos-crm-up-img">
        <div class="close-btn" @click.stop="close">
            <Icon type="android-close"></Icon>
        </div>
        <!-- <div style="line-height: 30px;">
            <h3>{{$t('modules_spoc_crm_web_src_views_taskcenter_upimg_1942')}}</h3>
            <p>{{$t('modules_spoc_crm_web_src_views_taskcenter_upimg_1943')}}</p>
        </div> -->
        <div class="img-lists clearfix">
            <div class="imgdiv" v-for="(item,index) in imgs" :key="index">
                <img class="img" :src="item.url">
                <Icon @click.native="delImg(index, item)" class="del-btn" type="ios-trash-outline" />
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
                :data="data"
                name="file"
                v-if="maxNum == 0 || imgs.length < maxNum">
                <label class="add-icon">
                    <Icon type="ios-add" :size="30"/>
                </label>
            </Upload>
            <p style="color: #999;font-size：12px;line-height:18px;">{{$t('modules_spoc_crm_web_src_views_taskcenter_upimg_1944')}}</p>
        </div>

        <div class="num-bar clearfix">
            <!-- <p class="num-text" v-if="maxNum > 0">{{num}}</p> -->
            <Button class="sure" @click.stop="sure">{{$t('classroom_allscore_54')}}</Button>
        </div>
        <p class="error-txt" v-if="errorTxt">{{ errorTxt }}</p>
        <!-- <input type="file" :id="uid" class="hidden" accept="image/*" @change="onFileChange"> -->
        
    </div>
</template>
<script>
import { util } from '@public/libs/util'
import valid,{errors, sysAttachment, api } from '../../libs/request.js'
import {mapMutations} from 'vuex';
import { clone } from '@public/libs/util.js'

export default {
    props:{
        errorTxt: {
            type: String,
            default: ''
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
        }
    },
    mounted() {
		this.headers = {
			token: localStorage.getItem('token'),
			tenant: localStorage.getItem('tenant')	
		}
	},
	data() {
		return {
            uid:util.uuid(),
            imgs:clone(this.setimg),
            data:{
                // dirName:'all',
                // type:'crm_task_img',
                // menuId:2001
                bizId: '',
				bizType: 'crm_task_img',
				isSingle: true
            },
            uploadFileUrl: api.fileAttachmentUploadUrl(), // sysAttachment.uploadFileUrl()
            headers: {},
		};
	},
	computed: {
		num() {
			return `${this.imgs.length}/${this.maxNum}`;
		}
    },
    components:{
        
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
            this.$Message.error(this.$t('modules_spoc_crm_web_src_views_customer360_components_upimg_1073'));
        },
        handleMaxSize (file) {
            this.updateLoadingStatus({ isLoading: false });
            this.$Message.error(this.$t('modules_spoc_crm_web_src_views_taskcenter_upimg_1947'));
        },
        init(){
			this.imgs = clone(this.setimg);
		},
		close() {
            this.$emit("close");
        },
        sure(){
			this.$emit("close", 'sure');
        },
        delImg(index,item){
            this.imgs.splice(index,1);
            this.$emit('onDelImg',item);
        }
    },
    watch:{
        num(v){
            this.$emit('on-change',this.imgs);
        }
    }
};
</script>


