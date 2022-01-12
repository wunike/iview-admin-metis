<style lang="less">
.histroy-lists-container {
	position: relative;
	height: 100%;
	.history_scroll {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		.ivu-scroll-container {
			height: 100% !important;
		}
		&.scrool_file {
			top: 30px;
			.ivu-scroll-container {
				height: ~"calc(100% - 30px)" !important;
			}
		}
	}
	.date-content {
		@h: 24px;
		position: relative;
		margin: 0 125px;
		height: @h;
		line-height: @h;
		text-align: center;
		color: #666;
		&::before,
		&::after {
			content: "";
			position: absolute;
			top: 12px;
			height: 1px;
		}
		&::before {
			left: 0;
			right: ~"calc(50% + 50px)";
			background: linear-gradient(
				90deg,
				rgba(255, 255, 255, 1) 0%,
				rgba(238, 238, 238, 1) 100%
			);
		}
		&::after {
			right: 0;
			left: ~"calc(50% + 50px)";
			background: linear-gradient(
				270deg,
				rgba(255, 255, 255, 1) 0%,
				rgba(238, 238, 238, 1) 100%
			);
		}
		span {
			position: relative;
			z-index: 3;
			padding: 0 24px;
			background-color: #fff;
		}
	}
	// 一条信息 start
	.history-item {
		position: relative;
		margin-top: 24px;
		padding-left: 66px;
		padding-right: 50px;
	}
	.item-img {
		@w: 38px;
		position: absolute;
		left: 20px;
		top: 10px;
		width: @w;
		height: @w;
		border-radius: @w;
		background-color: #eee;
		img {
			display: block;
			width: 100%;
		}
	}
	.name-line {
		@h: 36px;
		height: @h;
		line-height: @h;
		.name {
			font-size: 14px;
			color: #495060;
			margin: 6px;
		}
		.time {
			color: #999;
			font-size: 13px;
		}
	}
	.txt {
		margin-left: 7px;
		display: inline-block;
		padding: 6px 16px;
		line-height: 22px;
		border-radius: 4px 12px 12px 12px;
		background: #f3f3f3;
		color: #495060;
		font-size: 14px;
		img {
			display: block;
			margin: 6px 0;
			max-width: 200px;
		}
	}
	.ivu-avatar {
		@w: 38px;
		width: @w;
		height: @w;
		border-radius: @w;
		line-height: @w;
	}
	.file {
		flex: 1;
		padding: 8px;
		font-size: 14px;
		font-weight: 400;
		color: rgba(73, 80, 96, 1);
		line-height: 20px;
		// width: 262px;
		height: 66px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		.file_info {
			flex: 1;
		}
	}
	.file_icon {
		display: inline-block;
		position: relative;
		color: #01c1b2;
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
	// 一条信息 end
	// 图片列表
	.group-for-month {
		// margin: 0 10px;
		margin-left: 10px;
	}
	.img-lists {
		a {
			@h: 104px;
			position: relative;
			display: inline-block;
			width: @h;
			height: @h;
			margin-right: 12px;
			margin-top: 12px;
			border-radius: 4px;
			border: 1px solid rgba(217, 217, 217, 1);
			overflow: hidden;
		}
		img {
			position: absolute;
			top: 50%;
			left: 0;
			transform: translate(0, -50%);
			width: 100%;
		}
	}
	// 文件列表
	.file-header,
	.file-item {
		color: #495060;
		padding-left: 36px;
		margin: 0 10px;
		ul,
		li {
			height: 100%;
		}
		li {
			float: left;
			&:nth-child(1) {
				width: 24px + 98px;
			}
			&:nth-child(2) {
				width: 24px + 186px;
			}
			&:nth-child(3) {
				width: 24px + 128px;
				margin-left: 12px;
			}
			&:nth-child(4) {
				width: 24px + 163px;
			}
		}
	}
	.file-header {
		@h: 30px;
		height: @h;
		line-height: @h;
		font-size: 12px;
		background: #fafafa;
		border-radius: 4px 4px 0px 0px;
	}
	.file-item {
		@h: 60px;
		font-size: 14px;
		height: @h;
		line-height: @h;
		border-top: 1px solid #e6e7eb;
		&:first-child {
			border-top: none;
		}
		li {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			&:nth-child(3),
			&:nth-child(4),
			&:nth-child(5) {
				color: #999;
			}
		}
	}
	// 没有消息
	.no-history {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		img {
			position: absolute;
			top: 50%;
			left: 0;
			transform: translate(0, -50%);
			width: 300px;
			margin: 0 auto;
			right: 0;
		}
		p {
			position: absolute;
			left: 0;
			right: 0;
			top: ~"calc(50% + 80px)";
			text-align: center;
			font-size: 16px;
		}
	}
}
</style>
    
<template>
	<div class="histroy-lists-container">
		<div class="file-header" v-if="historyLists && historyLists.length && historyType == '3'">
			<ul>
				<li>{{$t('messagemanagement_components_histroylists_309')}}</li>
				<li>{{$t('messagemanagement_components_histroylists_310')}}</li>
				<li>{{$t('messagemanagement_components_histroylists_311')}}</li>
				<li>{{$t('messagemanagement_components_histroylists_312')}}</li>
				<li>{{$t('messagemanagement_components_histroylists_313')}}</li>
			</ul>
		</div>
		<Scroll
			:on-reach-top="handleReachTop"
			:distance-to-edge="[-10,-10]"
			class="history_scroll"
			:class="{'scrool_file': historyLists && historyLists.length && historyType == '3'}"
		>
			<div v-if="historyLists && historyLists.length">
				<!-- 图片 -->
				<div v-if="historyType == '4'">
					<div class="group-for-month" v-for="(item, index) in historyLists" :key="'img' + index">
						<div class="date-content" v-if="historyLists.length > 1">
							<span v-if="item.month == currMonth">{{$t('messagemanagement_components_histroylists_314')}}</span>
							<span v-else>{{ item.month }}</span>
						</div>
						<div class="img-lists">
							<a :href="h.filePath" v-for="(h, i) in item.lists" :key="i" download>
								<img :src="h.filePath" />
							</a>
						</div>
					</div>
				</div>
				<div class="group-for-file" v-else-if="historyType == '3'">
					<div class="file-item" v-for="item in historyLists" :key="item.id">
						<ul>
							<li>
								<div class="file_icon">
									<CommonIcon
										type="_wenjian"
										:size="48"
										:style="{width:'48px',height:'48px',display:'inline-block', verticalAlign: 'middle',lineHeight:1}"
									/>
									<span class="file_type">{{JSON.parse(item.message).fileName.split('.').pop()}}</span>
								</div>
							</li>
							<li>{{ JSON.parse(item.message).fileName }}</li>
							<li>{{ JSON.parse(item.message).fileSizeStr }}</li>
							<li v-if="$i18n.locale=='zh-CN'">{{ item.fromName }}</li>
							<li v-else>{{ item.fromEnName }}</li>
							<li>{{ new Date(item.fromDateStr).format('yyyy/MM/dd') }}</li>
						</ul>
					</div>
				</div>
				<!-- 全部 -->
				<div v-else>
					<div class="group-for-date" v-for="(item, index) in historyLists" :key="index">
						<div class="date-content" v-if="historyLists.length > 1">
							<span v-if="item.date == today">{{$t('messagemanagement_components_histroylists_314')}}</span>
							<span
								v-else-if="item.date == yesterday"
							>{{$t('messagemanagement_components_histroylists_315')}}</span>
							<span v-else>{{ item.date }}</span>
						</div>
						<div class="history-item" v-for="(h, i) in item.lists" :key="i">
							<!-- {{h.fromId}}
							{{currentFromId}}-->
							<span class="item-img">
								<Avatar :src="h.fromAvator" v-if="h.fromAvator" />
								<Avatar style="background-color: #87d068" icon="ios-person" v-else />
							</span>
							<div class="name-line">
								<span class="name" v-if="$i18n.locale=='zh-CN'">{{ h.fromName }}</span>
								<span class="name" v-else>{{ h.fromEnName }}</span>
								<span class="time">{{ h.time }}</span>
							</div>
							<div class="txt" v-html="h.message" v-if="h.msgType == '1'"></div>
							<div class="txt" v-else-if="h.msgType == '4'">
								<!-- 图片 -->
								<a :href="h.filePath" download>
									<img :src="h.filePath" />
								</a>
							</div>
							<div class="txt" v-else-if="h.msgType == '3'">
								<!-- 文件 -->
								<a :href="h.filePath" :download="JSON.parse(h.message).fileName" class="file">
									<div class="file_icon">
										<CommonIcon
											type="_wenjian"
											:size="48"
											:style="{width:'48px',height:'48px',display:'inline-block', verticalAlign: 'middle',lineHeight:1}"
										/>
										<span class="file_type">{{JSON.parse(h.message).fileName.split('.').pop()}}</span>
									</div>
									<div class="file_info">
										<p>{{JSON.parse(h.message).fileName}}</p>
									</div>
								</a>
							</div>
							<div class="txt" v-else-if="h.msgType == '5'">
								<!-- 语音 -->
								<audio :src="h.filePath" controls>{{$t('message_myhistory_295')}}</audio>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="no-history" v-else>
				<img src="../../../assets/img/noHistory.png" alt />
				<p
					v-if="historyType == '3' || historyType == '4'"
				>{{$t('messagemanagement_components_histroylists_318')}}</p>
				<p v-else>{{$t('messagemanagement_components_histroylists_316')}}</p>
			</div>
		</Scroll>
	</div>
</template>

<script>
import valid, { errors, jxChatMessage } from "../../../libs/request";
import CommonIcon from "_c/common-icon";
import { mapGetters, mapState, mapMutations } from "vuex";
export default {
	components: {
		CommonIcon
	},
	props: {
		curr: {
			type: String,
			default: "1"
		},
		dateRange: {
			type: Array
		},
		stuId: {
			type: String,
			default: ""
		}
	},
	data() {
		return {
			historyPageNo: 1,
			historyPageSize: 10,
			historyPageCount: 0,
			historyLists: [],
			today: new Date().format("yyyy-MM-dd"),
			yesterday: new Date(new Date().getTime() - 86400000).format(
				"yyyy-MM-dd"
			),
			pushFlag: true,
			historyType: "", //4：图片，3：文件，''：全部
			currMonth: new Date().format(
				this.$t("messagemanagement_components_histroylists_317")
			),
			dialogId: ""
		};
	},
	// mounted() {
	//     console.log(this.today)
	//     console.log(this.yesterday)
	// },
	methods: {
		showSearchChatRecordLists(list) {
			// 搜索的lists
			this.historyLists = [];
			this.historyPageNo = 2;
			this.historyPageCount = 1;
			// console.log(list)
			this.setLists(list);
			// this.historyLists = list;
		},
		handleReachTop() {
			// 查看更多
			this.pushFlag = false;
			// console.log(this.historyPageCount >= this.historyPageNo)
			if (this.historyPageCount >= this.historyPageNo) {
				this.findHistory();
			}
		},
		findHistory() {
			// console.log(this.dateRange)
			let params = {
				dialogId: this.dialogId,
				stuId: this.stuId,
				page: {
					pageNo: this.historyPageNo,
					pageSize: this.historyPageSize
				}
			};
			console.log(this.dialogId);
			if (this.historyType) params.msgType = this.historyType;
			if (this.dateRange && this.dateRange.length == 2) {
				params.startTime = new Date(
					this.dateRange[0] + " 00:00:00"
				).getTime();
				params.endTime = new Date(
					this.dateRange[1] + " 23:59:59"
				).getTime();
				console.log(this.dateRange[0] + " 00:00:00");
				console.log(this.dateRange[1] + " 23:59:59");
			}
			jxChatMessage
				.findHistory(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let _data = res.data.data;
						this.historyPageNo++;
						this.historyPageCount = _data.total;
						if (this.historyType == "4") {
							// 图片
							this.setListsImg(_data);
						} else if (this.historyType == "3") {
							// 文件
							this.setListsFile(_data);
						} else this.setLists(_data);
					}
				})
				.catch(errors.call(this));
		},
		setListsImg(_data) {
			let arrFinal = [],
				arr = {
					month: "",
					lists: []
				},
				arrHistoryLists = [];
			_data.list.forEach(history => {
				let currentMonth = new Date(history.fromDateStr).format(
					this.$t("messagemanagement_components_histroylists_317")
				);
				// console.log(currentMonth)
				// console.log(this.historyLists)
				// 判断已存在的历史数据里面，有没有当前日期的数据
				if (
					this.historyLists.length &&
					this.historyLists[0].month == currentMonth
				) {
					// 当前日期 和 已存在的list最后一条日期一致
					arrHistoryLists.push(history);
				} else {
					if (!arr.month || arr.month == currentMonth) {
						// 刚开始 month 为 '' 或者 当前的 month 等于 暂存的 month
						if (!arr.month) arr.month = currentMonth;
						arr.lists.push(history);
					} else {
						// 下一个日期的数据
						if (this.pushFlag) arrFinal.push(arr);
						else arrFinal.unshift(arr);
						arr = {
							month: currentMonth,
							lists: [history]
						};
					}
				}
			});
			if (arrHistoryLists.length) {
				this.historyLists[0].lists = [
					...arrHistoryLists,
					...this.historyLists[0].lists
				];
			}
			if (arr.month && arr.lists.length) {
				if (this.pushFlag) arrFinal.push(arr);
				else arrFinal.unshift(arr);
				// arrFinal.unshift(arr);
			}
			this.historyLists = [...arrFinal, ...this.historyLists];
		},
		setListsFile(_data) {
			let arrFinal = [];
			_data.list.forEach(history => {
				// console.log(history.message)
				// history.message = JSON.parse(history.message);
				arrFinal.push(history);
			});
			this.historyLists = [...arrFinal, ...this.historyLists];
			// console.log(this.historyLists)
		},
		setLists(_data) {
			// 处理获取的数据
			// console.log(this.historyLists)
			// console.log(_data)
			let arrFinal = [],
				arr = {
					date: "",
					lists: []
				},
				arrHistoryLists = [];
			_data.list.forEach(history => {
				// if(history.msgType == '3') {
				//     // 文件
				//     history.message = JSON.parse(history.message);
				// }
				history.time = history.fromDateStr.split(" ")[1];
				let currentDate = history.fromDateStr.split(" ")[0];
				// console.log(currentDate)
				// console.log(this.historyLists)
				// 判断已存在的历史数据里面，有没有当前日期的数据
				if (
					this.historyLists.length &&
					this.historyLists[0].date == currentDate
				) {
					// 当前日期 和 已存在的list最后一条日期一致
					arrHistoryLists.push(history);
				} else {
					if (!arr.date || arr.date == currentDate) {
						// 刚开始 date 为 '' 或者 当前的 date 等于 暂存的 dete
						if (!arr.date) arr.date = currentDate;
						arr.lists.push(history);
					} else {
						// 下一个日期的数据
						if (this.pushFlag) arrFinal.push(arr);
						else arrFinal.unshift(arr);
						arr = {
							date: currentDate,
							lists: [history]
						};
					}
				}
			});
			if (arrHistoryLists.length) {
				this.historyLists[0].lists = [
					...arrHistoryLists,
					...this.historyLists[0].lists
				];
			}
			if (arr.date && arr.lists.length) {
				if (this.pushFlag) arrFinal.push(arr);
				else arrFinal.unshift(arr);
				// arrFinal.unshift(arr);
			}
			this.historyLists = [...arrFinal, ...this.historyLists];
			// console.log(this.historyLists)
		},
		uploadParams(dialogId) {
			if (dialogId) this.dialogId = dialogId;
			this.pushFlag = true;
			this.historyPageNo = 1;
			this.historyLists = [];
			if (this.dialogId && this.dialogId != "-1") this.findHistory();
		}
	},
	watch: {
		curr(val) {
			// 1, 全部
			// 4, 图片
			// 3, 文件
			// console.log(val)
			// console.log(this.dialogId)
			if (val == "1") {
				this.historyType = "";
			} else {
				this.historyType = val;
			}
			if (this.dialogId && this.dialogId != "-1") {
				this.uploadParams();
			}
		},
		dateRange(val) {
			// console.log(val)
			if (val && val.length == 2) {
				this.uploadParams();
			}
		}
	}
};
</script>


