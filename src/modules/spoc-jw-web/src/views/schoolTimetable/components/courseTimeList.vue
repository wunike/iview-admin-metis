<style lang="less">
.course-time-lists-container {
	@border-top: 1px solid #dcdee3;
	@border-right: 1px solid #a0a2ad;
	@timeWidth: 105px;
	.clear() {
		zoom: 1;
		&::after,
		&::before {
			content: "";
			display: block;
			height: 0;
			line-height: 0;
			clear: both;
			font-size: 0;
		}
	}
	margin: 10px 0px;
	.clear();
	background: #fff;
	li {
		list-style: none;
	}
	.table-body {
		@h: 89px;
		position: relative;
		height: 288px;
		overflow-y: scroll;
		width: 100%;
		&.shrink-table {
			@h: 36px;
			.tabel-tr,
			.tabel-tr-data {
				.time {
					line-height: @h;
					height: @h;
				}
			}
			.tabel-tr {
				height: @h;
				li {
					height: @h;
				}
			}
		}
		.tabel-tr,
		.tabel-tr-data {
			.flex-ul {
				margin-left: @timeWidth;
				// .clear();
				display: flex;
			}
			.time {
				position: absolute;
				left: 0;
				top: 0;
				line-height: @h;
				height: @h;
				width: @timeWidth;
				text-align: center;
				font-size: 14px;
				border-bottom: @border-top;
			}
			li {
				// float: left;width: 100% / 7;
				flex: 1;
			}
		}
		.tabel-tr {
			position: relative;
			height: @h;
			li {
				height: @h;
				border-left: @border-right;
				border-bottom: @border-top;
				// &:active{
				//     background: #F2F3F7;
				// }
				// &.today{
				//     background: #f1f1f1;
				// }
			}
		}
		.tabel-tr-data {
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			z-index: 2;
			li {
				height: 1px;
				position: relative;
			}
		}
		.time-table-card {
			@left: 0;
			@right: 6px;
			position: absolute;
			left: @left;
			right: @right;
			top: 0;
			z-index: 1;
			height: 100px;
			border: 1px solid #d4d5da;
			background: #fff;
			&:hover {
				z-index: 2;
			}
		}
		.time-table-detail {
			height: 100%;
			margin-bottom: 1px;
			// overflow: hidden;
			padding: 7px 8px;
			&.noPadding {
				position: relative;
				padding: 0 4px;
			}
			.p,
			.div {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.p {
				line-height: 16px;
			}
			.div {
				font-weight: bold;
				line-height: 24px;
			}
		}
		.tooltip-middle {
			overflow: hidden;
		}
		.ivu-tooltip,
		.ivu-tooltip-rel {
			display: block;
			height: 100%;
		}
		.ivu-tooltip-rel {
			overflow: hidden;
		}
		.time-table-lists {
			@borderWidth: 1px;
			position: absolute;
			left: -@borderWidth;
			right: -@borderWidth;
			border: 1px solid #d4d5da;
			// border-top: none;
			ul {
				padding: 6px 0;
			}
			li {
				@h: 16px;
				.clear();
				padding: 0 8px;
				line-height: @h;
				height: @h;
			}
		}
	}
	.bgColor0 {
		background-color: #d4d5da;
		& + .time-table-lists {
			background-color: #e9eaec;
		}
	}
	.bgColorA {
		background-color: #bad9ff !important;
		& + .time-table-lists {
			background-color: #dcecff !important;
		}
	}
	.bgColorB {
		background-color: #ffe6bd;
		& + .time-table-lists {
			background-color: #fff2de;
		}
	}
	.bgColorC {
		background-color: #cdf2be;
		& + .time-table-lists {
			background-color: #e6f8de;
		}
	}
	.bgColorD {
		background-color: #ffac99;
		& + .time-table-lists {
			background-color: #fed5cd;
		}
	}
	.full-height-sign-bottom {
		height: ~"calc(100% - 47px)";
	}
	.full-height-sign-body {
		height: ~"calc(100% - 56px)";
	}
	.abridge-detail {
		@w: 16px;
		position: absolute;
		top: 50%;
		left: 0;
		right: 0;
		transform: translate(0, -50%);
		line-height: @w;
		& > i {
			float: left;
			height: @w;
			line-height: @w;
			width: @w;
			margin-right: 2px;
			margin-left: 2px;
			text-align: center;
			border-radius: 4px;
			background: #44bcb7;
			color: #fff;
			font-size: 12px;
			font-style: inherit;
		}
		.tooltip-middle {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.ivu-tooltip-popper {
			margin-left: -20px;
		}
	}
}
.course-time-no-lists {
	position: relative;
	margin-top: 10px;
	height: 100%;
	background: #fff;
	.detail {
		position: absolute;
		top: 50%;
		left: 0;
		right: 0;
		transform: translate(0, -50%);
		text-align: center;
	}
	p {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 2;
		font-size: 16px;
		line-height: 48px;
	}
}
.full-height {
	height: ~"calc(100% - 130px - 68px)";
}
.full-height-sign {
	height: ~"calc(100% - 130px - 16px)";
}
</style>
    
<template>
	<div :class="{'full-height-sign': fromSignIn, 'full-height': copyLists.length == 0 && !fromSignIn}">
		<div class="course-time-no-lists" v-if="copyLists.length == 0">
			<div class="detail">
				<img src="../../../assets/img/noLists.png" width="300" alt />
				<p>{{$t('modules_spoc_crm_web_src_views_customer360_components_timetable_coursetimelist_1051')}}</p>
			</div>
		</div>
		<div
			class="course-time-lists-container"
			:style="{height: fromSignIn ? '100%' : ''}"
			v-else
			v-for="out in copyLists"
			:key="out.id">
			<course-time-header
				:headerTitle="out.headerTitle"
				:id="out.id"
                :from="from"
				:needCheckbox="needCheckbox"
				@setShowStudentLists="setShowStudentLists"
				@changeSingle="changeSingle"
				:fromSignIn="fromSignIn">
            </course-time-header>
			<div class="time-table-bottom" :class="{'full-height-sign-bottom': fromSignIn}">
				<table-header
					:fromSignIn="fromSignIn"
					:classRoomName="classRoomName"
					:timeCardLists="out.timeCard"
					:todayIndex="todayIndex"
					:pageNo="pageNo"
					:pageCount="pageCount"
					:headerLists="headerLists"
					:scrollbarWidth="scrollbarWidth"
					@pagePrev="pagePrev"
					@pageNext="pageNext">
                </table-header>
				<div
					class="table-body"
					:class="{'full-height-sign-body': fromSignIn, 'shrink-table': !showTableDetail}"
					id="tableBody">
					<div v-if="showTableDetail">
						<div
							class="tabel-tr"
							v-for="time in 8"
							:key="'tabel-tr-' + time"
							v-if="out.startTimeHourZero">
							<div class="time">{{ time - 1 }}:00</div>
							<ul class="flex-ul">
								<li
									v-for="item in 7"
									:key="'tabel-li-' + item"
									:class="{today: item == todayIndex + 1}"
									@click="clickItem(time - 1, item)">
                                </li>
							</ul>
						</div>
						<div class="tabel-tr" v-for="time in 15" :key="'tabel-tr' + time">
							<div class="time">{{ time + 7 }}:00</div>
							<ul class="flex-ul">
								<li
									v-for="item in 7"
									:key="'tabel-li' + item"
									:class="{today: item == todayIndex + 1}"
									@click="clickItem(time + 7, item)">
                                </li>
							</ul>
						</div>
					</div>

					<div v-if="!showTableDetail">
						<div
							class="tabel-tr"
							v-for="time in 9"
							:key="'tabel-tr-detail-' + time"
							v-if="out.startTimeHourZero">
							<div class="time">{{ time * 2 - 2 }}:00</div>
							<ul class="flex-ul">
								<li
									v-for="item in 7"
									:key="'tabel-li-detail-' + item"
									:class="{today: item == todayIndex + 1}">
                                </li>
							</ul>
						</div>
						<div class="tabel-tr" v-for="time in 8" :key="'tabel-tr-detail' + time">
							<div class="time">{{ time * 2 + 6 }}:00</div>
							<ul class="flex-ul">
								<li
									v-for="item in 7"
									:key="'tabel-li-detail' + item"
									:class="{today: item == todayIndex + 1}">
                                </li>
							</ul>
						</div>
					</div>

					<div class="tabel-tr-data">
						<div class="time"></div>
						<ul class="flex-ul">
							<li v-for="(card, index1) in 7" :key="'tabel-li-data' + card">
								<div
									class="time-table-card"
									v-for="(item, index2) in out.timeCard[card - 1].lists"
									:key="index2"
									:style="{
                                        top: `${item.start * rowHeight}px`,
                                        left: item.left, 
                                        right: item.right, 
                                        height: `${item.height * rowHeight}px`,
                                        cursor: fromSignIn ? 'pointer' : ''
                                    }">
									<!-- 考勤状态- ( unAttendClass:未上课，finishAttendance:已完成考勤，unAttendance:未考勤，unFinishAttendance:未完成考勤，unNormal:异常) -->
									<div
										class="time-table-detail"
										@click="clickCard(item)"
										:class="{
                                            bgColor0: item.attendanceStatus == 'unAttendClass', 
                                            bgColorA: item.attendanceStatus == 'unAttendance' || (item.attendanceStatus == 'unAttendClass' && item.beforeTodey), 
                                            bgColorB: item.attendanceStatus == 'unFinishAttendance', 
                                            bgColorC: item.attendanceStatus == 'finishAttendance', 
                                            bgColorD: item.attendanceStatus == 'unNormal',
                                            noPadding: !showTableDetail
                                        }">
                                        <!-- {{item.beforeTodey}} -->
										<div v-if="showTableDetail">
											<div v-if="(fromSignIn && item.height >= 1.5) || (!fromSignIn && item.height >= 1.5)">
												<card-detail
													:date="date"
													:item="item"
													:headerLists="headerLists"
													:index1="index1"
													:fromSignIn="fromSignIn">
                                                </card-detail>
											</div>
											<Tooltip :placement="item.start * rowHeight < 89 * 4 ? 'bottom' : 'top'" v-else>
												<!-- <Tooltip :placement="item.start * rowHeight < 89 * 4 ? 'bottom' : 'top'"> -->
												<div class="tooltip-middle" :style="{height: `${item.height * rowHeight - 14}px`}">
													<card-detail
														:date="date"
														:item="item"
														:headerLists="headerLists"
														:index1="index1"
														:fromSignIn="fromSignIn">
                                                    </card-detail>
												</div>
												<div slot="content">
													<card-detail
														:date="date"
														:item="item"
														:headerLists="headerLists"
														:index1="index1"
														:fromSignIn="fromSignIn">
                                                    </card-detail>
												</div>
											</Tooltip>
										</div>
										<div v-else class="abridge-detail">
											<i>{{$t('modules_spoc_crm_web_src_views_customer360_components_timetable_coursetimelist_1052')}}</i>
											<Tooltip :placement="item.start * rowHeight < 36 * 4 ? 'bottom' : 'top'">
												<div class="tooltip-middle">{{ item.detail.classroomName }}</div>
												<div slot="content">
													<card-detail
														:date="date"
														:item="item"
														:headerLists="headerLists"
														:index1="index1"
														:fromSignIn="fromSignIn">
                                                    </card-detail>
												</div>
											</Tooltip>
										</div>
									</div>
									<div
										class="time-table-lists"
										v-if="showStudentLists"
										:style="{
                                            top: item.stuTop ? `${item.stuTop}px` : '', 
                                            bottom: item.stuBottom ? `${item.stuBottom}px` : '', 
                                        }">
										<ul>
											<li v-for="(student, index) in item.detail.jwStudentLessonAttendanceVOList" :key="index">
												<div class="fl">{{ student.name }}</div>
												<div class="fr">
													<span style="margin-right: 4px;">{{ student.attendanceStatus }}</span>
													<span>{{ student.attendanceDetailStatus }}</span>
												</div>
											</li>
										</ul>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import courseTimeHeader from "./courseTimeHeader";
import tableHeader from "./tableHeader";
import cardDetail from "./cardDetail";

const ONE_HOUR = 60 * 60 * 1000;
const ONE_DAY = 24 * 60 * 60 * 1000;

export default {
	props: {
		fromSignIn: {
			// 手工签到
			type: Boolean,
			default: false
		},
		from: {
			type: String,
			default: ""
		},
		needCheckbox: {
			type: Boolean,
			default: false
		},
		lists: {
			type: Array,
			default: () => {
				return [];
			}
		},
		date: {
			type: String,
			default: ""
		},
		pageNo: {
			type: Number,
			default: 1
		},
		pageCount: {
			type: Number,
			default: 1
		},
		showStudentLists: {
			type: Boolean,
			default: false
		},
		showTableDetail: {
			//true: 展开, false: 收起
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			startDay: "",
			endDay: "",
			currentWeek: true,
			headerLists: [],
			todayIndex: -1,
			scrollbarWidth: 6,
			startTime: "",
			endTime: "",
			copyLists: [],
			initThWidthFlag: true,
			classRoomName: []
		};
	},
	computed: {
		rowHeight() {
			// 默认是展开的高度:89, 收起的高度: 36 / 2
			return this.showTableDetail ? 89 : 36 / 2;
		}
	},
	components: {
		courseTimeHeader,
		tableHeader,
		cardDetail
	},
	mounted() {
		if (!this.fromSignIn) this.getDays();
	},
	methods: {
		initListsSignIn() {
			let _lists = {
				id: "signIn",
				headerTitle: "",
				timeCard: [
					{ lists: [] },
					{ lists: [] },
					{ lists: [] },
					{ lists: [] },
					{ lists: [] },
					{ lists: [] },
					{ lists: [] }
				],
				startTimeHourZero: false
			};
			let __startTimeHourZero = false; //true: 0点~8点有课
			let _header = [];
			if (this.lists && this.lists.length) {
				// 先单独计算0-8点是否有课
				this.lists.forEach((e, index) => {
					if (
						e.jwSubManualSignVOList &&
						e.jwSubManualSignVOList.length
					) {
						// 先单独计算0-8点是否有课
						e.jwSubManualSignVOList.forEach(item => {
							// console.log(Number(item.startTime.split(":")[0]))
							let __startTimeHour = Number(
								item.startTime.split(":")[0]
							);
							if (__startTimeHour < 8) {
								__startTimeHourZero = true;
							}
						});
					}
				});
				if (__startTimeHourZero) _lists.startTimeHourZero = true;
				// console.log(__startTimeHourZero)
				this.lists.forEach((e, index) => {
					let _sbnormalNum = 1;
					_header.push({
						name: e.classroomName
					});
					if (
						e.jwSubManualSignVOList &&
						e.jwSubManualSignVOList.length
					) {
						e.jwSubManualSignVOList.forEach(item => {
							if (item.attendanceStatus == "unNormal") {
								// 冲突
								_lists.timeCard[index].lists.push(
									this.formatCard(
										item,
										__startTimeHourZero,
										index,
										_sbnormalNum
									)
								);
								_sbnormalNum++;
							} else
								_lists.timeCard[index].lists.push(
									this.formatCard(
										item,
										__startTimeHourZero,
										index
									)
								);
						});
					}
				});
				this.copyLists = [_lists];
				// console.log(this.copyLists)
			} else {
				this.copyLists = [];
			}
			this.classRoomName = _header;
		},
		initLists() {
			let _lists = [];
			if (this.lists && this.lists.length) {
				this.lists.forEach(e => {
					let _text = "";
					if (e.teacherType && e.teacherType == "teacher_id")
						_text = this.$t('courselist_12');
					else if (
						e.teacherType &&
						e.teacherType == "class_teacher_id"
					)
						_text = this.$t('mycourse_mycourse_374');
					else _text = this.$t('courselist_13');
					let _listsItem = {
						id: e.id,
						headerTitle:
							this.from == "teacher"
								? `${_text}：${e.name}`
								: e.name,
						startTimeHourZero: false,
						timeCard: [
							{ lists: [] },
							{ lists: [] },
							{ lists: [] },
							{ lists: [] },
							{ lists: [] },
							{ lists: [] },
							{ lists: [] }
						]
					};
					let __startTimeHourZero = false;
					if (e.list && e.list.length) {
						// 先单独计算0-8点是否有课
						e.list.forEach(item => {
							let __startTimeHour = Number(
								item.startTime.split(":")[0]
							);
							if (__startTimeHour < 8) {
								__startTimeHourZero = true;
							}
						});
						e.list.forEach(item => {
							let num = Number(item.week) - 1;
							_listsItem.timeCard[num].lists.push(
								this.formatCard(item, __startTimeHourZero)
							);
						});
						if (__startTimeHourZero)
							_listsItem.startTimeHourZero = true;
					}
					_lists.push(_listsItem);
				});
			}
			this.copyLists = _lists;
			// console.log(this.copyLists)
		},
		formatCard(_item, startTimeHourZero, index, _sbnormalNum) {
			// 将获取的数据格式化为方块需要的形式
			let __startTime = "8:00";
			if (startTimeHourZero) {
				// 0~8点有课
				__startTime = "0:00";
			} else {
			}
			let num;
			num = index || Number(_item.week);
			if (index == 0) num = 0;

			let date = new Date().format("yyyy/MM/dd");
			let start =
				(new Date(`${date} ${_item.startTime}`).getTime() -
					new Date(`${date} ${__startTime}`).getTime()) /
				ONE_HOUR;
			let height =
				(new Date(`${date} ${_item.endTime}`).getTime() -
					new Date(`${date} ${_item.startTime}`).getTime()) /
				ONE_HOUR;

			let right = 6,
				left = 0 + 1;
			if (_sbnormalNum) {
				// 冲突数据
				// console.log(Number(_sbnormalNum) % 2)
				if (Number(_sbnormalNum) % 2 == 0) {
					right = 0;
					left = 6;
				}
            }
            
            let beforeTodey = false; // 初始化为 false
            // 计算日期是否在 「此刻」之前
            if (!this.fromSignIn) {
                if(new Date(this.headerLists[_item.week - 1].date + ' ' + _item.endTime).getTime() < new Date().getTime()) beforeTodey = true;
                // console.log('week:' + _item.week, 'today:' + new Date(this.headerLists[_item.week - 1].date).format("yyyy/MM/dd"))
            } else {
                if(new Date(this.date + ' ' + _item.endTime).getTime() < new Date(date).getTime()) beforeTodey = true;
                // console.log('week:' + _item.week, 'today:' + new Date( this.date).format("yyyy/MM/dd"))
            }

			let obj = {
				attendanceStatus: _item.attendanceStatus,
				start: start,
				height: height,
				right: `${right}px`,
				left: `${left}px`,
                detail: _item,
                beforeTodey: beforeTodey
			};
			// console.log(height)

			// 手工签到，计算学生列表的位置
			if (this.fromSignIn) {
				if (!_item.jwStudentLessonAttendanceVOList)
					_item.jwStudentLessonAttendanceVOList = [];
				let _top = start * this.rowHeight;
				let _height = height * this.rowHeight;
				let _stuNum = _item.jwStudentLessonAttendanceVOList.length * 16;
				if (
					_item.jwStudentLessonAttendanceVOList.length &&
					_top + _height + _stuNum + 16 > this.rowHeight * 15
				)
					obj.stuBottom = _height - 2;
				else obj.stuTop = _height - 2;
			}
			return obj;
		},
		initThWidth() {
			// this.scrollbarWidth = document.getElementById('tableBody').offsetWidth - document.getElementById('tabel1').offsetWidth;
		},
		clickItem(out, item) {
			// if(this.fromSignIn){
			//     console.log(`${ this.classRoomName[item - 1].name } ${out}:00`)
			// }else{
			//     console.log(`${ this.headerLists[item - 1].date } ${out}:00`)
			// }
		},
		clickCard(item) {
			this.$emit("goDetail", item);
		},
		getDays(str) {
			// 获取日期数据
			let currentDate;
			if (!str) {
				// 不传str，表示获取当前这个星期
				this.currentWeek = true; // 本周
				// currentDate = new Date('2019.4.1');
				currentDate = new Date();
			} else if (str == "prev") {
				this.currentWeek = false;
				currentDate = new Date(
					new Date(this.startDay).getTime() - ONE_DAY
				);
			} else if (str == "next") {
				this.currentWeek = false;
				currentDate = new Date(
					new Date(this.endDay).getTime() + ONE_DAY
				);
			} else {
				// 先计算今天是周几
				// let test = new Date("2019-8-6").format("yyyy-MM-dd");
				let test = new Date().format("yyyy-MM-dd");
				let curWeek = new Date(test).getDay(); //周一 ~ 周日 == 1，2，3，4，5，6，0
				// 计算本周的周一和周日
				let curWeekStartDay, curWeekEndDay;
				if (curWeek == 0) {
					curWeekEndDay = new Date(new Date(test)).getTime();
					curWeekStartDay = new Date(
						new Date(curWeekEndDay).getTime() - ONE_DAY * 6
					).getTime();
				} else {
					curWeekStartDay = new Date(
						new Date(test).getTime() - ONE_DAY * (curWeek - 1)
					).getTime();
					curWeekEndDay = new Date(
						new Date(new Date(curWeekStartDay)).getTime() +
							ONE_DAY * 6
					).getTime();
				}
				// console.log('本周的周一是：' + new Date(curWeekStartDay).format('yyyy-MM-dd'));
				// console.log('本周的周日是：' + new Date(curWeekEndDay).format('yyyy-MM-dd'));
				// 判断是否是本周
				this.currentWeek =
					new Date(str).getTime() < curWeekStartDay ||
					new Date(str).getTime() > curWeekEndDay
						? false
						: true;
				currentDate = new Date(str);
			}
			let week = currentDate.getDay();
			this.headerLists = [];

			// 计算需要在当前日期之前加几个
			let prevNum = week - 1;
			if (prevNum === -1) {
				// 当前是周日
				prevNum = 6;
			}

			// 计算startDay，endDay，即本周的第一天（周一）和最后一天（周日）
			this.startDay = new Date(
				currentDate.getTime() - ONE_DAY * prevNum
			).format("yyyy/MM/dd");
			this.endDay = new Date(
				currentDate.getTime() + ONE_DAY * (6 - prevNum)
			).format("yyyy/MM/dd");
			// console.log(this.startDay)
			// console.log(this.endDay)

			// 计算today
			let todayNum =
				(new Date(new Date().format("yyyy/MM/dd")).getTime() -
					new Date(this.startDay).getTime()) /
				ONE_DAY;
			// console.log(todayNum)
			if (todayNum >= 0 && todayNum < 7) this.todayIndex = todayNum;
			else this.todayIndex = -1;

			for (let i = 0; i < prevNum; i++) {
				let newDate = new Date(
					currentDate.getTime() - ONE_DAY * (i + 1)
				);
				this.headerLists.unshift({
					date: newDate.format("yyyy/MM/dd"),
					week: newDate.getDay(),
					star: false
				});
			}

			// 添加今天
			this.headerLists.push({
				date: currentDate.format("yyyy/MM/dd"),
				week: currentDate.getDay(),
				star: false
			});

			// 添加后面的日期
			for (let i = 0; i < 6 - prevNum; i++) {
				let newDate = new Date(
					currentDate.getTime() + ONE_DAY * (i + 1)
				);
				this.headerLists.push({
					date: newDate.format("yyyy/MM/dd"),
					week: newDate.getDay(),
					star: false
				});
			}
			let _firstDate = new Date(this.headerLists[0].date).format(
				"yyyy-MM-dd"
			);
			let _endDate = new Date(this.headerLists[6].date).format(
				"yyyy-MM-dd"
			);
			this.startTime = _firstDate;
			this.endTime = _endDate;
			this.$emit("changeData", _firstDate, _endDate, this.todayIndex);
		},
		setShowStudentLists(val) {
			// 显示学员列表
			this.$emit("changeShowStudentLists", val);
		},
		changeSingle(_val, _id) {
			// 多选框
			this.$emit("changeSingle", _val, _id);
		},
		pagePrev() {
			// 获取上一页
			this.$emit("pagePrev");
		},
		pageNext() {
			// 获取下一页
			this.$emit("pageNext");
		}
	},
	watch: {
		lists(val) {
			if (!this.fromSignIn) this.initLists();
			else this.initListsSignIn();
			if (this.initThWidthFlag) {
				this.initThWidthFlag = false;
				setTimeout(() => {
					this.initThWidth();
				}, 0);
			}
		}
	}
};
</script>


