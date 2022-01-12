<style lang="less">
@pinkish-grey: #ccc;
@black: #333;
@white: #e0e0e0;
.crm-up-file {
	position: relative;
	box-shadow: 0 0 10px 0 rgba(4, 0, 0, 0.15);
	border: solid 1px @white;
	padding: 10px;
	width: 419px;
	min-height: 188px;
	max-height: 300px;
	box-sizing: border-box;
	background-color: #fff;
	left: -20px;
	z-index: 90;
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
	.file-lists {
		min-height: 50px;
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
    <div class="crm-up-file">
        <div class="close-btn" @click.stop="close">
            <Icon type="android-close"></Icon>
        </div>
        <div style="line-height: 30px;">
            <h3>{{$t('modules_spoc_crm_web_src_views_customer360_components_upfile_1060')}}</h3>
            <p>{{$t('modules_spoc_crm_web_src_views_customer360_components_upfile_1061')}}</p>
            <div>
                <!-- <Button :disabled="files.length>=maxNum" type="success" size="small" @click="showyunpan">{{$t('modules_spoc_crm_web_src_views_customer360_components_upfile_1062')}}</Button> -->
                <Upload 
                :action="uploadFileUrl"
                :show-upload-list="false"
				:before-upload="beforeUpload"
                :on-success="handleSuccess"
                :format="['doc','docx','xls', 'xlsx', 'pdf']"
                :max-size="20480"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :data="data"
                name="files"
                :disabled="files.length>=maxNum">
					<Button :disabled="files.length>=maxNum" type="success" size="small">{{$t('modules_spoc_crm_web_src_views_customer360_components_upfile_1063')}}</Button>
                </Upload>
			</div>
            <div class="file-lists">
                <ul>
                    <li class="li" v-for="(item,index) in files" :key="'f'+index">
                        <span>{{item.name?item.name:item.fileName}}</span>
                        <span class="del-btn" @click="delfile(item,index)">{{$t('modules_spoc_crm_web_src_views_customer360_components_upfile_1064')}}</span>
                    </li>
                </ul>
            </div>
            <div class="num-bar clearfix">
                <p class="num-text">{{num}}</p>
                <button class="sure" @click.stop="sure">{{$t('classroom_allscore_54')}}</button>
            </div>
        </div>
		<!-- <div v-if="pan.show">
			<yunpan @on-confirm="doSendFile" ref="yunpan" @on-cancel="doCancel" :visible="pan.visible"></yunpan>
		</div> -->
    </div>
</template>
<script>
// import yunpan from "@public/modules/yunpan";
import valid,{errors, sysAttachment } from '../../../libs/request.js'
import {mapMutations} from 'vuex';
import { clone } from '@public/libs/util.js'
export default {
	props:{
        setfile:{
            type:Array,
            default:()=>{
                return [];
            }
		},
		cusId:{
			type:String,
			required:true,
		}
    },
	data() {
		return {
			maxNum: 3,
			files: clone(this.setfile),
			pan:{
				show:false,
				visible:false,
			},
			data:{
				dirName:'all',
				type:'trace_file',
				menuId: 2001
			},
			uploadFileUrl: sysAttachment.uploadFileUrl()
		};
	},
	computed: {
		num(){
			return `${this.files.length}/${this.maxNum}`;
		}
	},
	components: {
		// yunpan,
	},
	methods: {
		...mapMutations(['updateLoadingStatus']),
		beforeUpload(){
            this.updateLoadingStatus({ isLoading: true });
        },
		handleSuccess (res, file) {
			console.info(res,2);
			this.updateLoadingStatus({ isLoading: false });
            const item = res.data;
            this.files.push(item);
        },
        handleFormatError (file) {
			this.updateLoadingStatus({ isLoading: false });
            this.$Message.error(this.$t('modules_spoc_crm_web_src_views_customer360_components_upfile_1066'));
        },
        handleMaxSize (file) {
			this.updateLoadingStatus({ isLoading: false });
            this.$Message.error(this.$t('modules_spoc_crm_web_src_views_customer360_components_upfile_1067'));
        },
		init(){
			this.files = clone(this.setfile);
		},
		close() {
			this.$emit("close");
		},
		sure(){
			this.$emit("close");
		},
		uplocal() {
			this.$el.querySelector('.hidden').click();
		},
		showyunpan() {
			this.pan.visible = true;
			this.pan.show = true;
		},
		doSendFile(item) {
			this.files.push(Object.assign({},item));
			this.doCancel();
		},
		doCancel() {
			this.pan.visible = false;
			setTimeout(() => {
				this.pan.show = false;
			}, 300);
		},
		delfile(file,i){
			this.files.splice(i,1);	
		},
	},
    watch:{
        num(v){
            this.$emit('on-change',this.files);
        }
    }
};
</script>


