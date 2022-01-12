<style lang="less">
@pinkish-grey: #ccc;
@black: #333;
@white: #e0e0e0;
.upFileNew {
	position: relative;
	box-shadow: 0 0 10px 0 rgba(4, 0, 0, 0.15);
	border: solid 1px @white;
	padding: 10px;
	width: 440px;
	min-height: 120px;
	box-sizing: border-box;
	background-color: #fff;
	left: -20px;
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
		}
		.del-btn{
			color: #f00;
			cursor: pointer;
		}
	}
}
</style>
<template>
    <div class="upFileNew">
        <!-- <div class="close-btn" @click.stop="close">
            <Icon type="android-close"></Icon>
        </div> -->
		<div class="up-file-lists">
			<ul>
				<li class="li" v-for="(item,index) in files" :key="'f'+index">
					<span>{{item.name?item.name:item.fileName}}</span>
					<span class="del-btn" @click="delfile(item,index)">{{$t('classlist_compontents_detailinfo_46')}}</span>
				</li>
			</ul>
		</div>
		<cos-upload
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
        </cos-upload>
        <div class="num-bar clearfix">
			<Button class="sure" @click.stop="sure">{{$t('classroom_allscore_54')}}</Button>
		</div>
    </div>
</template>
<script>
// import valid,{errors, sysAttachment } from '../../../libs/request.js'
import {mapMutations} from 'vuex';
import { clone } from '@public/libs/util.js'
// import cosUpload from '@public/modules/cosUpload1'
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
	data() {
		return {
			files: clone(this.setfile),
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
		num(){
			return `${this.files.length}/${this.maxNum}`;
		}
	},
	components: {
		// cosUpload
	},
	methods: {
		...mapMutations(['updateLoadingStatus']),
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
        },
	},
    watch:{
        num(v){
            this.$emit('on-change',this.files);
        }
    }
};
</script>
