<style lang="less">
@pinkish-grey: #ccc;
@black: #333;
@white: #e0e0e0;
.crm-up-file {
	position: absolute;
	box-shadow: 0 0 10px 0 rgba(4, 0, 0, 0.15);
	border: solid 1px @white;
	padding: 10px;
	width: 419px;
	// min-height: 188px;
	// max-height: 300px;
	box-sizing: border-box;
	background-color: #fff;
	// left: -20px;
	bottom:10px;
	z-index: 90;
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
	.num-text {
		/* float: left; */
		margin-left: 12px;
		color: #999;
		line-height: 30px;
	}
	.num-bar {
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
		// min-height: 50px;
		.li{
			list-style: none;
			line-height: 18px;
		}
		.del-btn{
			color: #f00;
			cursor: pointer;
			margin-left: 12px;
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
    <div class="crm-up-file">
        <div class="close-btn" @click.stop="close">
            <Icon type="android-close"></Icon>
        </div>
        <div style="line-height: 30px;">
            <!-- <h3>{{$t('modules_spoc_crm_web_src_views_taskcenter_upfile_1934')}}</h3>
            <p>{{$t('modules_spoc_crm_web_src_views_taskcenter_upfile_1935')}}</p> -->
            <div>
                <Upload 
				:headers="headers"
                :action="uploadFileUrl"
                :show-upload-list="false"
				:before-upload="beforeUpload"
                :on-success="handleSuccess"
                :format="['doc','docx','xls', 'xlsx', 'pdf']"
                :max-size="20480"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :data="data"
                name="file"
                :disabled="files.length>=maxNum">
					<!-- <label class="add-icon">
						<Icon type="ios-add" :size="30"/>
					</label> -->
					<Button :disabled="files.length>=maxNum" type="primary" size="small">{{$t('modules_spoc_crm_web_src_views_taskcenter_upfile_1936')}}</Button><span class="num-text">{{num}}</span>
					<p style="color: #999;font-size：12px;">{{$t('modules_spoc_crm_web_src_views_taskcenter_upfile_1937')}}</p>
				</Upload>
			</div>
            <div class="file-lists">
                <ul>
                    <li class="li" v-for="(item,index) in files" :key="'f'+index">
                        <span>{{item.name?item.name:item.filename}}</span>
                        <span class="del-btn" @click="delfile(item,index)">{{$t('classlist_compontents_detailinfo_46')}}</span>
                    </li>
                </ul>
            </div>
            <div class="num-bar clearfix">
                <Button class="sure" @click.stop="sure">{{$t('classroom_allscore_54')}}</Button>
            </div>
        </div>
		<!-- <div v-if="pan.show">
			<yunpan @on-confirm="doSendFile" ref="yunpan" @on-cancel="doCancel" :visible="pan.visible"></yunpan>
		</div> -->
    </div>
</template>
<script>
// import yunpan from "@public/modules/yunpan";
import valid,{errors, sysAttachment, api } from '../../libs/request.js'
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
	mounted() {
		this.headers = {
			token: localStorage.getItem('token'),
			tenant: localStorage.getItem('tenant')	
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
				// dirName:'all',
				// type:'crm_task_file',
				// menuId: 2001
				bizId: '',
				bizType: 'crm_task_file',
				isSingle: true
			},
			uploadFileUrl: api.fileAttachmentUploadUrl(), // sysAttachment.uploadFileUrl()
			headers: {},
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
            this.$Message.error(this.$t('modules_spoc_crm_web_src_views_taskcenter_upfile_1941'));
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


