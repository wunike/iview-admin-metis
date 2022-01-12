<style lang="less">
	.data-container {
		// margin: 16px;
		padding: 8px 16px;
		background-color: #FFFFFF;
		.content {
			padding-left: 16px;
			padding-top: 24px;
		}
		h2 {
			font-size: 14px;
			font-weight: bold;
			color: rgba(73, 80, 96, 1);
			line-height: 20px;
		}
		.img {
			margin-top: 24px;
			height: 100px;
			overflow: hidden;
			.img-box {
				float: left;
				line-height: 1px;
				width: 100px;
				height: 100px;
				background: url('../assets/img/avatorUpload.png')
			}
			.img-button {
				float: left;
				height: 100px;
				margin-left: 10px;
				padding-top: 32px;
                .uploadWarning{
                    display:none;
                }
                .open-progress{
                    display:none;
                }
			}
		}
		.detail {
			overflow: hidden;
			.item {
				float: left;
				font-size: 14px;
				margin-top: 10px;
				width: 33%;
				span {
					width: 110px;
					display: inline-block;
					text-align: right;
					color: #999999;
				}
				p {
					display: inline-block;
					color: #495060;
				}
			}
		}
		.uploadButton {
			height: 32px;
			i {
				font-size: 14px;
			}
		}
		.uploadDes {
            margin-top:6px;
			color: #999;
		}
	}
</style>

<template>
	<div class="data-container">
		<div class="content" style="border-bottom:1px solid #E6E7EB;">
			<h2>{{$t('portal_app_PersonalAvatar')}}<!-- 个人头像 --></h2>
			<div class="img">
				<div class="img-box">
					<img :src="userInfo.photo" alt="" style="width:100px;height:100px;">
				</div>
				<div class="img-button">
					<Upload 
						:action="imgAction" 
						style="line-height:32px;margin-bottom:8px;" 
						:data="uploadData" 
						:headers="headers"
						name="file" 
						:show-upload-list="false" 
						:on-success="uploadSuccess" 
						:format="['jpg','jpeg','png']" 
						:on-format-error="uploadFormatError" 
						:on-exceeded-size="uploadSizeError" 
						:max-size="3000">
						<Button icon="ios-share-outline" class="uploadButton" v-if="userInfo.photo">{{$t('portal_app_EditAvatar')}}<!-- 修改头像 --></Button>
						<Button icon="ios-share-outline" class="uploadButton" v-else>{{$t('portal_app_UploadAvatar')}}<!-- 上传头像 --></Button>
					</Upload>
                    <!-- <cos-upload
                            ref="modalUpload"
                            v-if="objectType && kind"
                            :objectType="objectType"
                            :objectId="objectId"
                            :kind="kind"
                            :accept="['png','jpg','jpeg']"
                            :maxNum="1"
                            :maxSize="3"
                            :uploadButtonName="uploadButtonName"
                            fileInputId="modalId"
                            :isChangeFile="true"
                            @hasUploadFile="hasUploadFile"
                    >
                    </cos-upload> -->
					<p class="uploadDes">{{$t('portal_app_SupportsAvatar')}}
						<!-- (支持 JPG,PNG,JPEG 格式图片，不大于3M) -->
					</p>
				</div>
			</div>
		</div>
		<div class="content">
			<h2>{{$t('portal_app_BasicInformation')}}<!-- 基本资料 --></h2>
			<div class="detail">
				<div class="item">
					<span>{{$t('portal_app_EmployeeName')}}<!-- 员工姓名： --></span>
					<p>{{ userInfo.name }}</p>
				</div>
				<div class="item">
					<span>{{$t('portal_app_Subordinate')}}<!-- 所属城市中心： --></span>
					<p>{{ userInfo.companyName }}</p>
				</div>
				<div class="item">
					<span>{{$t('portal_app_Centres')}}<!-- 所属校区： --></span>
					<p>{{ userInfo.officeName }}</p>
				</div>
				<div class="item">
					<span>{{$t('views_staff_components_staffinfo_674')}}<!-- 联系电话： --></span>
					<p>{{ userInfo.mobile }}</p>
				</div>
				<div class="item">
					<span>{{$t('modules_rolemanage_169')}}<!-- 邮箱： --></span>
					<p>{{ userInfo.email }}</p>
				</div>
				<div class="item">
					<span>{{$t('views_staff_components_staffinfo_679')}}<!-- 岗位： --></span>
					<p>{{ userInfo.jobName }}</p>
				</div>
				<div class="item">
					<span>{{$t('portal_app_DateEntry')}}<!-- 入职日期： --></span>
					<p>{{ userInfo.entryDate }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	import valid, {
		errors,
		sys,
		sysUser,
		api
	} from '../libs/request.js';
    import cosUpload from "@public/modules/cosUpload.vue";

	export default {
		name: 'portal.personEdit',
		data() {
			return {
                objectType:'secretaire',
                objectId: '',
                kind: 'image',
				tabValue: 0,
				imgAction: '',
				headers: '',
				uploadData: {
					// objectId: '',
					// type: "secretaire",
					// fileType: "all",
					// dirName: 'images',
					bizId: '',
					bizType: 'image',
					isSingle: true
				},
				userInfo:{},
			};
		},
		computed: {
			// ...mapState(['userInfo']),
            uploadButtonName(){
			    return this.userInfo.photo? this.$t('portal_app_EditAvatar') :this.$t('portal_app_UploadAvatar')
            }
		},

		mounted() {
			this.imgAction = api.fileAttachmentUploadUrl(); // sysUser.uploadImg();
			this.userInfoData();
			this.headers = {
				token: localStorage.getItem('token'),
				tenant: localStorage.getItem('tenant')	
			}
		},
        components:{
            cosUpload
        },
		methods: {
			userInfoData(){
 				sysUser.userInfoData({}).then(valid.call(this)).then(res => {
                    if(res.ok) {
						this.userInfo = res.data.data;
						this.userInfo.entryDate = new Date(this.userInfo.entryDate).format('yyyy-MM-dd')
                    }
                }).catch(errors.call(this))
			},
			uploadSizeError() {
				// this.$Message.error('请上传不超过3M的图片')
				this.$Message.error(this.$t('portal_app_3M'))
			},
			uploadFormatError() {
				// this.$Message.error('请上传JPG,PNG,JPEG格式的图片')
				this.$Message.error(this.$t('portal_app_imagesFormat'))
			},
            hasUploadFile(fileObj){
				// console.log(fileObj)
				this.$set(this.userInfo, 'photo', fileObj.filePath)
                let data = {
                    photo: fileObj.filePath
                }
                sysUser.savePhoto(data).then(valid.call(this)).then(res => {
                    if(res.ok) {
                        this.registerModule();
                    }
                }).catch(errors.call(this))
            },
			uploadSuccess(response) {
				console.log(response,'头像上传')
				let data = {
					photo: response.data.url
				}
				sysUser.savePhoto(data).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.registerModule();
					}
				}).catch(errors.call(this))
			},
			registerModule() {
				this.$store.dispatch('portal/getUserInfo');
			},
		},
	}
</script>