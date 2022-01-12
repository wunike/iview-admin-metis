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
    position: relative;
    left: -20px;
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
        <div class="clearfix" v-if="imgs.length">
            <div class="imgdiv" v-for="(attachmentObj,index) in imgs" :key="index">
                <img class="img" :src="attachmentObj.filePath">
                <Icon @click.native="delImg(index)" class="del-btn" type="ios-trash-outline" />
            </div>
        </div>
        <cos-upload
            ref="cosUploadImg"
            v-if="objectType && kind"
            :objectType="objectType"
            :objectId="objectId"
            :kind="kind"
            :accept="['png','jpg','jpeg']"
            :fileInputId="fileInputId"
            @delFromUpload="delFromUpload"
            @hasUploadFile="hasUploadFile">
        </cos-upload>
        <div class="num-bar clearfix">
            <Button class="sure" @click.stop="sure">{{$t('classroom_allscore_54')}}</Button>
        </div>
    </div>
</template>
<script>
import {mapMutations} from 'vuex';
import { clone } from '@public/libs/util.js'

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
	data() {
		return {
            imgs:clone(this.setimg),
		};
	},
	computed: {
        _objectType(){
          return this.objectType;
        },
        _objectId(){
          return this.objectId;
        },
        _kind(){
          return this.kind;
        },
        _setfile(){
          return this.setfile;
        },
        _maxNum(){
          return this.maxNum;
        },
        _fileInputId(){
          return this.fileInputId;
        },
		num() {
			return `${this.imgs.length}/${this.maxNum}`;
		}
    },
    components:{
    },
	methods: {
        ...mapMutations(['updateLoadingStatus']),
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
        },
    },
    watch:{
        num(v){
            this.$emit('on-change',this.imgs);
        }
    }
};
</script>
