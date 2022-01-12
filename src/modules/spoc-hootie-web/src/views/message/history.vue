<style lang="less">
.historyModal {
	.ivu-modal-body {
		padding: 0 0 24px;
		.ivu-scroll-container {
			padding: 0 16px;
		}
	}
	.headers {
		font-size: 18px;
		font-weight: 500;
		color: rgba(73, 80, 96, 1);
		line-height: 25px;
	}
	.body {
		.history_wrap {
			background: rgba(255, 255, 255, 1);
			.history_box {
				background: rgba(247, 248, 250, 1);
				border-radius: 4px 4px 0px 0px;
				border: 1px solid rgba(217, 217, 217, 1);
				padding: 8px 16px;
				.historyTo {
					font-size: 12px;
					font-weight: normal;
					color: rgba(102, 102, 102, 1);
					line-height: 18px;
				}
				.students {
					font-size: 14px;
					font-weight: normal;
					color: rgba(153, 153, 153, 1);
					line-height: 21px;
				}
			}
			.history_msg {
				min-height: 78px;
				padding: 10px;
				font-size: 14px;
				font-weight: normal;
				color: rgba(73, 80, 96, 1);
				line-height: 21px;
				position: relative;
				border-radius: 0 0 4px 4px;
				border: 1px solid rgba(217, 217, 217, 1);
				border-top: none;
				padding-bottom: 40px;
				.file {
					flex: 1;
					padding: 8px;
					font-size: 14px;
					font-weight: 400;
					line-height: 20px;
					width: 262px;
					height: 66px;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					flex-direction: row-reverse;
					background: rgba(255, 255, 255, 1);
					border-radius: 4px;
					border: 1px solid rgba(220, 222, 227, 1);
					.file_info {
						flex: 1;
						width: 100%;
						overflow: hidden;
						margin-right: 12px;
						color: rgba(73, 80, 96, 1);
					}
					.file_icon {
						color: inherit;
						position: relative;
						.file_type {
							position: absolute;
							top: 0;
							left: 0;
							bottom: 0;
							right: 0;
							color: #ffffff;
							text-align: center;
							line-height: 48px;
						}
					}
				}
				.image {
					display: flex;
					justify-content: center;
					align-items: center;
					margin: auto;
					max-width: 62%;
					height: auto;
					img {
						display: inline-block;
						max-width: 100%;
						max-height: 260px;
						height: auto;
					}
				}
				.history_audio {
					display: flex;
					justify-content: center;
					align-items: center;
				}
                .history_video{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .video{
                        width: 60%;
                    }
                }
				.again {
					position: absolute;
					right: 16px;
					bottom: 16px;
					width: 88px;
					height: 24px;
					background: rgba(255, 255, 255, 1);
					border-radius: 4px;
					border: 1px solid rgba(230, 231, 235, 1);
					font-size: 14px;
					font-weight: normal;
					color: rgba(73, 80, 96, 1);
					line-height: 22px;
					text-align: center;
					cursor: pointer;
				}
			}
		}
	}
}
</style>

<template>
	<div v-if="historyShow">
		<Modal
			v-model="modal"
			footer-hide
			transfer
			class-name="vertical-center-modal historyModal"
			:width="800"
		>
			<p slot="header" class="headers">{{$t('spoc_hootie_web_50')}}</p>
			<div class="body">
				<Scroll :on-reach-top="handleReachTop" :height="400">
					<div class="history_wrap" v-for="item in historyList" :key="item.id">
						<Divider dashed>{{ dateFtt('yyyy-MM-dd hh:mm', item.updateDate) }}</Divider>
						<div class="history_box">
							<div class="historyTo">
								<div class="studentNum" v-if="item.toId == '@All'">{{$t('spoc_hootie_web_51')}}</div>
								<div
									class="studentNum"
									v-else
								>{{ item.toName.split(',').length}}{{$t('spoc_hootie_web_52')}}</div>
							</div>
							<div class="students" v-if="item.toName">{{ item.toName }}</div>
						</div>
						<div class="history_msg">
							<div v-html="item.message" v-if="item.msgType == 1"></div>
							<a
								:href="item.filePath"
								:download="JSON.parse(item.message).fileName"
								class="file"
								v-if="item.msgType == 3"
							>
								<div class="file_icon">
									<CommonIcon
										:type="fileIcon(item)"
										:size="48"
										:style="{ width: '48px', height: '48px', display: 'inline-block', verticalAlign: 'middle', lineHeight: 1 }"
									/>
									<!--<span class="file_type">{{item.data.message.split('.')[item.data.message.split('.').length-1]}}</span>-->
								</div>
								<div class="file_info">
									<Poptip trigger="hover" :content="JSON.parse(item.message).fileName">
										<p style="white-space: nowrap;">{{ JSON.parse(item.message).fileName }}</p>
									</Poptip>
									<p style="text-align: left;color: #999999;">{{ JSON.parse(item.message).fileSizeStr }}</p>
								</div>
							</a>
							<a :href="item.filePath" download class="image" v-else-if="item.msgType == 4">
								<img :src="item.filePath" />
							</a>
							<div class="history_audio" v-else-if="item.msgType == 5">
								<audio :src="item.filePath" controls>{{ $t('message_myhistory_295') }}</audio>
							</div>
							<div class="history_video" v-else-if="item.msgType == 6">
                                <video controls="controls" class="video">
                                    <source :src="item.filePath" />
                                    Your browser does not support the video tag.
                                </video>
							</div>
							<div class="again" @click="againTo(item)">{{$t('spoc_hootie_web_53')}}</div>
						</div>
					</div>
				</Scroll>
			</div>
			<div slot="footer">
				<Button @click="close">{{$t('classroom_allscore_53')}}</Button>
				<Button @click="back">{{$t('spoc_hootie_web_55')}}</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
import valid, { errors, jxChatGroupMessage } from "../../libs/request";
import CommonIcon from "_c/common-icon";
export default {
	data() {
		return {
			modal: false,
			pageNo: 1,
			historyList: [],
			iconMap: {
				xlsx: "_excelfuzhi",
				xls: "_excelfuzhi",
				docx: "_wordfuzhi",
				doc: "_wordfuzhi",
				pdf: "_pdf1",
				ppt: "_pptfuzhi1",
				pptx: "_pptfuzhi1"
			},
			historyShow: false
		};
	},
	components: {
		CommonIcon
	},
	mounted() {},
	methods: {
		show() {
			this.listPage();
			this.modal = true;
		},
		close() {
			this.$emit("close");
		},
		back() {
			this.modal = false;
			this.$emit("back");
		},
		fileIcon(item) {
			let arr = item.filePath.split(".");
			let fileType = arr[arr.length - 1];
			if (fileType) {
				fileType = fileType.toLocaleLowerCase();
				return this.iconMap[fileType] || "_pptfuzhi";
			} else {
				return "_pptfuzhi";
			}
		},
		listPage() {
			let params = {
				pageNo: this.pageNo
			};
			jxChatGroupMessage
				.listPage(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						console.log(res);
						res.data.data.list.forEach(v => {
							this.historyList.unshift(v);
						});
						if (res.data.data.list.length) {
							this.pageNo += 1;
						}
					}
				})
				.catch(errors.call(this))
				.finally(() => {});
		},
		dateFtt(fmt, formDate) {
			//author: meizz
			let date = new Date(formDate);
			var o = {
				"M+": date.getMonth() + 1, //月份
				"d+": date.getDate(), //日
				"h+": date.getHours(), //小时
				"m+": date.getMinutes(), //分
				"s+": date.getSeconds(), //秒
				"q+": Math.floor((date.getMonth() + 3) / 3), //季度
				S: date.getMilliseconds() //毫秒
			};
			if (/(y+)/.test(fmt))
				fmt = fmt.replace(
					RegExp.$1,
					(date.getFullYear() + "").substr(4 - RegExp.$1.length)
				);
			for (var k in o)
				if (new RegExp("(" + k + ")").test(fmt))
					fmt = fmt.replace(
						RegExp.$1,
						RegExp.$1.length == 1
							? o[k]
							: ("00" + o[k]).substr(("" + o[k]).length)
					);
			return fmt;
		},
		againTo(item) {
			this.$emit("again", item);
		},
		handleReachTop() {
			return new Promise(resolve => {
				this.listPage();
				resolve();
			});
		}
	}
};
</script>
