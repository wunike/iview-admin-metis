<style lang="less">
.ppm-detail-container {
	b {
		font-weight: normal;
	}

	.question-by-parent {
		background: #fff;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;
	}
	.pricipal-reply-fa {
		padding: 0 16px;
		background: #fff;
	}
	.pricipal-reply {
		background: #fff;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;
		border-top: 1px solid #eee;
	}
	.qbp-left {
		width: 80px;
		img {
			height: 42px;
			width: 42px;
			border-radius: 50%;
			margin-left: 20px;
			margin-top: 20px;
		}
	}
	.qbp-right {
		.qbpr-header {
			margin-top: 32px;
			span {
				font-size: 16px;
				font-weight: 600;
				color: rgba(73, 80, 96, 1);
			}
			b {
				font-size: 14px;
				font-weight: normal;
				color: rgba(153, 153, 153, 1);
				margin-left: 8px;
			}
		}
		.qbpr-question {
			margin-top: 10px;
			margin-bottom: 2px;
			font-size: 16px;
			span {
				font-size: 16px;
				font-weight: normal;
				color: rgba(73, 80, 96, 1);
			}
			b {
				display: inline-block;
				min-width: 64px;
				padding: 0 5px;
				height: 24px;
				text-align: center;
				line-height: 24px;
				font-size: 14px;
				font-weight: normal;
				margin-left: 8px;
				border-radius: 4px;
			}
			.not {
				color: #ff3000;
				background: #ffece4;
			}
			.do {
				color: #46bc15;
				background: #e4fdda;
			}
			.ever {
				color: #999;
				background: #f2f3f7;
			}
		}
		.qbpr-question-infos {
			font-size: 14px;
			font-weight: normal;
			color: rgba(73, 80, 96, 1);
			line-height: 20px;
			max-width: 1014px;
			padding-bottom: 16px;
			&.padding-left {
				padding-left: 49px;
			}
		}
		.qbpr-img {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: flex-start;
			&.padding-left {
				padding-left: 49px;
			}
			.qbpr-img-and-pdf-content {
				width: auto;
				.imgs {
					width: 84px;
					height: 84px;
					margin-right: 16px;
					img {
						width: 84px;
						height: 84px;
					}
				}
			}
		}
		.link-box {
			margin-top: 8px;
			&.padding-left {
				padding-left: 49px;
			}
		}
		.qbpr-links {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: flex-start;
			.list-item {
				margin-bottom: 16px;

				margin-bottom: 2px;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				.img {
					margin-right: 16px;
				}
				.name {
					font-size: 12px;
				}
				.bytes {
					font-size: 12px;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
					margin-right: 16px;
				}
			}
		}
	}
	.feedback-question {
		background: #fff;
		border-radius: 4px;
		.fq-types {
			padding-top: 20px;
			padding-left: 20px;
			/*padding-bottom:16p
                x;*/
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: flex-start;
		}
		.img-lists {
			.list-item {
				margin-left: 24px;
				margin-top: 2px;
				margin-bottom: 2px;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				img {
					width: 14px;
					height: 14px;
					margin-right: 16px;
				}
				.img {
					margin-right: 16px;
				}
				.name {
					font-size: 12px;
					color: rgba(34, 38, 44, 1);
				}
				.bytes {
					font-size: 12px;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
					margin-right: 16px;
				}
			}
		}
		.fq-content {
			padding: 0 20px;
			margin-top: 20px;
		}
		.fq-button {
			text-align: right;
			padding-top: 20px;
			padding-bottom: 20px;
			padding-right: 32px;
		}
	}
}
.ppm-detail-model-container {
	.ivu-modal-header {
		padding: 17px 24px 16px !important;
		background: #f7f8fa;
		border-radius: 4px;
		.ivu-modal-header-inner {
			font-size: 18px;
			font-weight: 500;
			color: rgba(0, 0, 0, 0.85);
		}
	}
	.ppm-item {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;
		span {
			font-size: 14px;
			margin-top: 10px;
			margin-right: 10px;
			font-weight: normal;
			color: rgba(153, 153, 153, 1);
		}
	}
}
</style>

<template>
	<div class="ppm-detail-container" v-show="loadings">
		<div
			class="question-by-parent"
			:style="!principalFeedback.length ? 'border-radius:4px' : 'border-radius:4px 4px 0 0'"
		>
			<div class="qbp-left">
				<img :src="stuImg" />
			</div>
			<div class="qbp-right">
				<div class="qbpr-header">
					<span>{{stuName}}</span>
					<b>{{queTime}}</b>
					<i class="iconfont icon-dingwei" style="font-size: 12px;color:#999;margin-left:18px;"></i>
					<b style="margin-left:3px;">{{stuLucation}}</b>
				</div>
				<div class="qbpr-question">
					{{$t('principalmailbox_feedbackdetail_470')}}
					<span>{{queTitle}}</span>
					<b
						:class="status === '2' ? 'ever' : status === '1' ? 'do' :'not' "
					>{{status === '2' ? $t('principalmailbox_feedbackdetail_471') : status === '0' ? $t('principalmailbox_feedbackdetail_472') : $t('principalmailbox_feedbackdetail_473')}}</b>
				</div>
				<div class="qbpr-question-infos">{{queContent}}</div>
				<div
					:style="filePathArrayBox.length > 0 ?'padding-bottom:16px;display:block' : 'padding-bottom:0;display:none'"
				>
					<div class="qbpr-img">
						<div class="qbpr-img-and-pdf-content" v-for="(item1, index) in filePathArrayBox" :key="index">
							<div class="list-item imgs" v-if="testItem(item1)">
								<a target="_blank" :href="item1" class="img">
									<img :src="getImgThumb(item1)" :onerror="getImgThumbError(item1)" />
								</a>
							</div>
						</div>
					</div>
					<div class="link-box" :style="!testIfNoImg(filePathArrayBox) ?'margin-top:0':'margin-top:8px'">
						<div class="qbpr-links" v-for="(item1, index) in filePathArrayBox" :key="index">
							<div
								class="list-item"
								v-if="!testItem(item1)"
								:style="{display:!testItem(item1)? 'none' : 'block'}"
							>
								<a target="_blank" :href="item1" class="img">
									<i style="font-size:16px;cursor: pointer" class="iconfont icon-fujian"></i>
								</a>
								<span class="name">{{getName(item1)}}</span>
								<!--<span class="bytes">({{item1.size}})</span>-->
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="pricipal-reply-fa">
			<div
				v-for="(item,index) in principalFeedback"
				class="pricipal-reply"
				:key="index"
				:style="index === principalFeedback.length-1 ? 'border-radius:0 0 4px 4px;' : 'border-radius:0'"
			>
				<div class="qbp-left" style="width:60px;">
					<img style="margin-left:0px;" :src="item.avatarUrl" />
				</div>
				<div class="qbp-right">
					<div class="qbpr-header" style="margin-bottom:16px;">
						<span>{{item.createName}}</span>
						<b>{{formatTime(item.createDate)}}</b>
					</div>
					<div class="qbpr-question-infos">{{item.message}}</div>
					<div
						:style="item.filePathArray.length > 0 ? 'padding-bottom:16px;display:block' : 'padding-bottom:0;display:none'"
					>
						<div class="qbpr-img">
							<div
								class="qbpr-img-and-pdf-content"
								v-for="(item1, index) in item.filePathArray"
								:key="index"
							>
								<div class="list-item imgs" v-if="testItem(item1)">
									<a target="_blank" :href="item1" class="img">
										<img :src="getImgThumb(item1)" :onerror="getImgThumbError(item1)" />
									</a>
								</div>
							</div>
						</div>
						<div
							class="link-box"
							:style="!testIfNoImg(item.filePathArray) ?'margin-top:0':'margin-top:8px'"
						>
							<div class="qbpr-links" v-for="(item1, index)  in item.filePathArray" :key="index">
								<div class="list-item" v-if="!testItem(item1)">
									<a target="_blank" :href="item1" class="img">
										<i style="font-size:16px;cursor: pointer" class="iconfont icon-fujian"></i>
									</a>
									<span class="name">{{getName(item1)}}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="this.status !== '2'" class="feedback-question" style="margin-top: 10px;">
			<div class="fq-types">
				<Upload
					ref="uploadImg"
					:format="['jpg','jpeg','png']"
                    name="file"
                    :headers="headers"
					:on-success="uploadSuccessImg"
					:on-format-error="handleFormatErrorImg"
					:show-upload-list="false"
					:data="dataUploadImg"
					:action="uploadImg"
				>
					<img
						src="../../assets/img/upload-imgs.png"
						style="width:17px;height:15px;margin-right:24px;margin-top:5px;cursor: pointer"
					/>
				</Upload>
				<Upload
					:multiple="true"
					:show-upload-list="false"
					ref="uploadLinks"
                    name="file"
                    :headers="headers"
					:format="['pdf','doc','docx','xls','xlsx','ppt','pptx','txt']"
					:on-success="uploadSuccessFiles"
					:on-format-error="handleFormatErrorFiles"
					:data="dataUploadFile"
					:action="uploadImg"
				>
					<i style="color:#979797;font-size:16px;cursor: pointer" class="iconfont icon-fujian"></i>
				</Upload>
			</div>
			<div class="img-lists">
				<div class="list-item" style="margin-top:17px;" v-for="item in imgList" :key="item.id">
					<a target="_blank" :href="item.path">
						<img :src="getImgThumb(item.path)" :onerror="getImgThumbError(item.path)" />
					</a>
					<span class="name">{{item.name}}</span>
					<span class="bytes">({{item.size}})</span>
					<a @click="delImg(item.path)">{{$t('classlist_compontents_detailinfo_46')}}</a>
				</div>
			</div>
			<div class="img-lists">
				<div class="list-item" v-for="(item, index)  in filesList" :key="index">
					<a target="_blank" :href="item.path" class="img">
						<i style="font-size:16px;cursor: pointer" class="iconfont icon-fujian"></i>
					</a>
					<span class="name">{{item.name}}</span>
					<span class="bytes">({{item.size}})</span>
					<a @click="delFiles(item.path)">{{$t('classlist_compontents_detailinfo_46')}}</a>
				</div>
			</div>
			<div class="fq-content">
				<Input
					v-model="infos"
					type="textarea"
					:rows="5"
					:placeholder="$t('principalmailbox_feedbackdetail_475')"
				/>
			</div>
			<div class="fq-button">
				<Button
					v-if="this.status === '1'"
					@click="resolved"
				>{{$t('principalmailbox_feedbackdetail_471')}}</Button>
				<Button
					type="primary"
					style="margin-left:12px;"
					@click="toFeedback"
				>{{$t('principalmailbox_feedbackdetail_476')}}</Button>
			</div>
		</div>
		<Modal
			class="ppm-detail-model-container"
			width="800"
			v-model="showModel"
			:title="$t('principalmailbox_feedbackdetail_477')"
			:mask-closable="false"
			@on-cancel="cancelFn"
		>
			<div class="ppm-item">
				<span>{{$t('principalmailbox_feedbackdetail_478')}}</span>
				<Input
					v-model="resolve"
					type="textarea"
					:rows="4"
					style="width: 605px;"
					:placeholder="$t('principalmailbox_feedbackdetail_479')"
				/>
				<Button
					@click="resolve = ''"
					style="margin-top:24px;margin-left:24px;"
				>{{$t('classroom_toevaluation_136')}}</Button>
			</div>
			<div slot="footer">
				<Button @click="cancelFn">{{$t('classroom_allscore_53')}}</Button>
				<Button type="primary" @click="submitFn">{{$t('classroom_allscore_54')}}</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
import valid, {
	errors,
	jxMailbox,
	sysUser,
	sysAttachment,
	api
} from "../../libs/request";
import { mapMutations } from "vuex";
export default {
	name: "hootie.principalFBDetail",
	props: {},
	data() {
		return {
			loadings: false,
			stuImg: "",
			stuName: "",
			queTime: "",
			stuLucation: "",
			queTitle: "",
			queContent: "",
			showModel: false,
			resolve: "",
			status: "",
			infos: "",
			filesList: [],
			filesListFa: [],

			imgList: [],
			imgListFa: [],
			principalFeedback: [],
			filePathArrayBox: [],
			name: "",
			id: "",
			sendNoComplate: false,
			headers:{},
            dataUploadImg:{
			    // isThumb: 1,
                // type:'jxMailBox',
                // fileType:'image',
                // dirName:'all',
                // remarks:'',
                // menuId:'7001'
                bizId: '',
                bizType: 'image',
                isSingle: true,
			},
            dataUploadFile:{
                // type:'jxMailBox',
                // fileType:'image',
                // dirName:'all',
                // remarks:'',
                // menuId:'7001'
                bizId: '',
                bizType: 'image',
                isSingle: true,
            },
		};
	},
	components: {},
	computed: {
		uploadImg: function() {
			return api.fileAttachmentUploadUrl();
		}
	},

	created() {},

	mounted() {
		//        this.getStatus(this.$route.query)
		this.getForm();
		this.getUserRight();
		this.headers = {
            token: localStorage.getItem('token'),
            tenant: localStorage.getItem('tenant')
        }
	},

	methods: {
		...mapMutations(["updateLoadingStatus"]),
		getImgThumbError(filePath) {
			return 'this.src="' + filePath + '"';
		},
		getImgThumb(filePath) {
			let _filePath = filePath.split(".");
			let type = _filePath[_filePath.length - 1];
			return filePath + "-thumb." + type;
		},
		getName(item) {
			let arr = item.split("/");
			let len = item.split("/").length - 1;
			return arr[len];
		},
		testIfNoImg(obj) {
			let a = false;
			obj.forEach(item => {
				if (this.testItem(item)) {
					a = true;
				}
			});
			return a;
		},
		formatTime(time) {
			let times = new Date(time).format("yyyy/MM/dd hh:mm");
			return times;
		},
		delImg(item) {
			this.imgList.forEach((val, index) => {
				if (val.path == item) {
					this.imgList.splice(index, 1);
				}
			});
			this.imgListFa.forEach((val, index) => {
				if (val.response.data.filePath == item) {
					this.imgListFa.splice(index, 1);
				}
			});
		},
		delFiles(item) {
			this.filesList.forEach((val, index) => {
				if (val.path == item) {
					this.filesList.splice(index, 1);
				}
			});
			this.filesListFa.forEach((val, index) => {
				if (val.response.data.filePath == item) {
					this.filesListFa.splice(index, 1);
				}
			});
		},
		testItem(item) {
			let arr = item.match(/\.(jpg|png|jpeg)/g);
			if (arr !== null && arr.length > 0) {
				return true;
			}
			return false;
		},
		getUserRight() {
			//判断登录用户类型
			sysUser
				.userInfoData()
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.name =
							res.data.data.name +
							this.$t("principalmailbox_feedbackdetail_483");
						this.id = res.data.data.id;
					}
				})
				.catch(errors.call(this));
		},
		uploadSuccessImg(res, file, fileList) {
			if (res.status == "success") {
				this.imgList = [];
				this.imgListFa = fileList;
				fileList.forEach(item => {
					let obj = {};
					obj.name = item.name;
					obj.path = item.response.data.url;
					obj.id = item.response.data.id;
					let size =
						item.size < 1024
							? item.size + "B"
							: item.size / 1024 < 1024
							? (item.size / 1024).toFixed(2) + "kb"
							: item.size / 1024 / 1024 < 1024
							? (item.size / 1024 / 1024).toFixed(2) + "Mb"
							: "";
					obj.size = size;
					this.imgList.push(obj);
				});
				//                this.imgList=fileList
			}
		},
		handleFormatErrorImg(res, file) {
			this.$Notice.error({
				title: this.$t("principalmailbox_feedbackdetail_484"),
				desc: ""
			});
		},
		uploadSuccessFiles(res, file, fileList) {
			if (res.status == "success") {
				this.filesListFa = fileList;
				this.filesList = [];
				fileList.forEach(item => {
					let obj = {};
					obj.name = item.name;
					obj.path = item.response.data.url;
					obj.id = item.response.data.id;
					let size =
						item.size < 1024
							? item.size + "B"
							: item.size / 1024 < 1024
							? (item.size / 1024).toFixed(2) + "kb"
							: item.size / 1024 / 1024 < 1024
							? (item.size / 1024 / 1024 < 1024) + "Mb"
							: "";
					obj.size = size;
					this.filesList.push(obj);
				});
			}
		},
		handleFormatErrorFiles(res, file) {
			this.$Notice.error({
				title: this.$t("principalmailbox_feedbackdetail_485"),
				desc: ""
			});
		},
		getForm() {
			if (
				this.$route.query.id == "" ||
				this.$route.query.id == undefined
			) {
				this.$router.push({
					name: "hootie.principal"
				});
			} else {
				this.updateLoadingStatus({ isLoading: true });
				let params = {};
				params.id = this.$route.query.id;
				jxMailbox
					.form(params)
					.then(valid.call(this))
					.then(res => {
						if (res.ok) {
							this.loadings = true;
							this.principalFeedback =
								res.data.data.jxMailboxMessageList;
							this.status = res.data.data.status;
							this.stuImg = res.data.data.avatarUrl;
							this.stuName = res.data.data.stuName;
							this.queTime = res.data.data.commitDate;
							this.stuLucation = res.data.data.officeName;
							this.queTitle = res.data.data.title;
							this.queContent = res.data.data.content;
							this.filePathArrayBox = res.data.data.filePathArray;
						}
					})
					.catch(errors.call(this))
					.finally(() => {
						this.updateLoadingStatus({ isLoading: false });
					});
			}
		},
		toFeedback(val, type) {
			let value = "";
			if (type == "2") {
				value = val.replace(/\s+/g, "");
			} else {
				value = this.infos.replace(/\s+/g, "");
			}
			if (value.length > 0) {
				this.updateLoadingStatus({ isLoading: true });
				let params = {};
				params["mailId"] = this.$route.query.id;
				params["message"] = value;
				params["roleType"] = "1";
				params["createName"] = this.name;
				params["userId"] = this.id;
				params.replyTerminal = "pc";
				params.mailStatus = type == "2" ? "2" : "1";
				let arr = [];
				this.filesList.forEach(item => {
					arr.push(item.path);
				});
				this.imgList.forEach(item => {
					arr.push(item.path);
				});
				params["filePathArray"] = arr;

				if (this.sendNoComplate) {
					return;
				}
				this.sendNoComplate = true;
				jxMailbox
					.saveMessage(params)
					.then(valid.call(this))
					.then(res => {
						if (res.ok) {
							this.getForm();
							this.infos = "";
							this.filesList = [];
							this.filesListFa = [];
							this.imgListFa = [];
							this.imgList = [];
							this.resolve = "";
							this.showModel = false;
						}
					})
					.catch(errors.call(this))
					.finally(() => {
						this.sendNoComplate = false;
						this.updateLoadingStatus({ isLoading: false });
					});
			} else {
				this.$Message.warning(
					this.$t("principalmailbox_feedbackdetail_486")
				);
				this.infos = "";
			}
		},
		resolved() {
			this.showModel = true;
		},
		submitFn() {
			this.toFeedback(this.resolve, "2");
		},
		cancelFn() {
			this.showModel = false;
		}
	}
};
</script>
