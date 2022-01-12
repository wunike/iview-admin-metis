<style lang="less">
.classRoom {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;
	background: rgba(240, 242, 245, 1);
	height: 100%;
	.room_header {
		width: 100%;
		height: 64px;
		background: rgba(255, 255, 255, 1);
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 0 24px;
		border-bottom: 1px solid #dadada;
		.back_btn {
			i {
				cursor: pointer;
			}
		}
		.class_name {
			height: 28px;
			font-size: 20px;
			font-weight: 500;
			color: rgba(73, 80, 96, 1);
			line-height: 28px;
			margin-left: 10px;
		}
		.class_num {
			margin-left: 10px;
			height: 20px;
			font-size: 14px;
			font-weight: 500;
			color: rgba(153, 153, 153, 1);
			line-height: 20px;
		}
		.signature {
			margin-left: 40px;
			height: 20px;
			font-size: 14px;
			font-weight: 500;
			color: rgba(73, 80, 96, 1);
			line-height: 20px;
			.green {
				color: #44bcb7;
			}
		}
		.class_info {
			flex: 1;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			padding-right: 28px;
			img {
				width: 20px;
				height: 20px;
			}
			span {
				margin-left: 8px;
				height: 20px;
				font-size: 14px;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
				line-height: 20px;
			}
		}
	}
	.not-started {
		height: calc(~"100% - 64px");
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin-top: 50px;
		img {
			width: 200px;
			height: auto;
		}
		div {
			margin-top: 30px;
			font-size: 18px;
			font-weight: 400;
			color: rgba(73, 80, 96, 1);
		}
	}
	.room_main {
		flex: 1;
		width: 100%;
		height: calc(~"100% - 134px");
		overflow: hidden;
		overflow-y: auto;
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		padding-top: 10px;
		> div {
			width: 100%;
			height: 100%;
			overflow: hidden;
			overflow-y: auto;
			display: flex;
			justify-content: flex-start;
			align-items: flex-start;
		}
		.stu_card {
			width: 9.86vw;
			height: 8.19vw;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.05);
			position: relative;
			text-align: center;
			&:hover {
				box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.1);
			}
			.atten {
				position: absolute;
				top: -0.99vw;
				right: -1.88vw;
				img {
					width: 3.06vw;
					height: auto;
				}
			}
			.score {
				width: 3.06vw;
				height: 2.77vw;
				background: rgba(68, 188, 183, 1);
				box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.15);
				border-radius: 1.46vw;
				border: 3px solid rgba(255, 255, 255, 1);
				position: absolute;
				top: -0.83vw;
				right: -1.88vw;
				font-size: 14px;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				line-height: 2.66vw;

				&.none {
					background: rgba(218, 218, 218, 1);
					opacity: 0.8;
				}
				&.red {
					background: #f5222d;
					opacity: 0.8;
				}
			}
			@media screen and (min-width: 1200px) {
				.score {
					font-size: 12px;
				}
			}
			@media screen and (min-width: 1400px) {
				.score {
					font-size: 14px;
				}
			}
			@media screen and (min-width: 1600px) {
				.score {
					font-size: 16px;
				}
			}
			@media screen and (min-width: 1800px) {
				.score {
					font-size: 18px;
				}
			}
			@media screen and (min-width: 2000px) {
				.score {
					font-size: 20px;
				}
			}
		}
		.room_main_left {
			width: 16.67vw;
			min-width: 16.67vw;
			padding-top: 8.34vw;
			.stu_card {
				margin: auto;
				padding-top: 54px;
				&.no {
					background: #f5f5f5;
				}
				.img_box {
					width: 6.25vw;
					height: 4.86vw;
					border-radius: 50%;
					overflow: hidden;
					position: absolute;
					top: -2.36vw;
					left: ~"calc(50% - 3.13vw)";
					img {
						width: 6.25vw;
						height: auto;
					}
				}
				.all_stu {
					height: 1.7vw;
					font-size: 18px;
					font-weight: 500;
					color: rgba(73, 80, 96, 1);
					line-height: 1.7vw;
				}
			}
		}
		.room_main_right {
			flex: 1;
			padding-right: 70px;
			padding-bottom: 90px;
			.stu_card {
				float: left;
				margin: 6.67vw 1.53vw 1.54vw 1.53vw;
				padding-top: 2.78vw;

				.img-box {
					width: 12.5vw;
					height: auto;
					position: absolute;
					top: -4.45vw;
					left: ~"calc(50% - 6.25vw)";
					display: flex;
					justify-content: center;
					align-items: flex-end;
					img {
						width: auto;
						height: 6.6vw;
					}
				}
				.img-box1 {
					width: auto;
					height: 6.6vw;
					img {
						width: auto;
						height: 6.6vw;
					}
				}
				.en_name {
					height: 1.63vw;
					font-size: 16px;
					font-weight: 500;
					color: rgba(73, 80, 96, 1);
					line-height: 1.63vw;
				}
				.cn_name {
					height: 1.6vw;
					font-size: 16px;
					font-weight: 500;
					color: rgba(73, 80, 96, 1);
					line-height: 1.63vw;
				}
				.totalpoint {
					margin-top: 10px;
					display: inline-block;
					height: 1vw;
					line-height: 1.1vw;
					color: #fff;
					padding: 0 1.04vw;
					background: #44bcb7;
					border-radius: 18px;
					&.none {
						background: rgba(218, 218, 218, 1);
						opacity: 0.8;
					}
				}
			}
		}
	}
	.name-clock {
		position: fixed;
		bottom: 90px;
		left: 0;
		width: 100%;
		background: transparent;
	}
	.room_footer {
		position: fixed;
		bottom: 0;
		right: 0;
		left: 0;
		width: 100%;
		height: 70px;
		background: rgba(255, 255, 255, 1);
		display: flex;
		justify-content: center;
		align-items: center;
		border-top: 1px solid #dadada;
		.operate {
			padding: 22px 30px;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			span {
				height: 22px;
				font-size: 16px;
				font-weight: 500;
				color: rgba(73, 80, 96, 1);
				line-height: 22px;
			}
			i {
				line-height: 1;
			}
			&.active {
				background: #f7f8fa;
			}
			&:hover {
				background: #f7f8fa;
			}
		}
		.attendance-btn {
			width: 100%;
			height: 70px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 52px;
			.no-bg {
				font-size: 16px;
				font-weight: 500;
				color: rgba(68, 188, 183, 1);
				cursor: pointer;
			}
			.no-everything {
				font-size: 16px;
				font-weight: 500;
				color: #495060;
			}
			.ab-item {
				height: 100%;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				.save-btn {
					font-size: 16px;
					font-weight: 500;
					color: #fff;
					display: inline-block;
					padding: 0 36px;
					height: 40px;
					line-height: 40px;
					text-align: center;
					background: rgba(68, 188, 183, 1);
					margin-left: 24px;
					border-radius: 20px;
					cursor: pointer;
					&:hover {
						background: #53aeaa;
					}
				}
				div {
					height: 100%;
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					align-items: center;
					cursor: pointer;
					padding: 0 10px;
					&:hover {
						background: #f7f8fa;
					}
					img {
						width: 36px;
						height: 36px;
					}
					span {
						font-size: 16px;
						font-weight: 500;
						color: rgba(68, 188, 183, 1);
					}
				}
			}
		}
	}
}
.big-choose-name-box {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: #44bcb7;
	height: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	z-index: 1;
	.close-btn {
		position: absolute;
		top: 16px;
		right: 16px;
		width: 22px;
		height: 22px;
	}
	.choose-name-box-div {
		width: 535px;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.pick-again {
			font-size: 28px;
			font-weight: normal;
			color: rgba(255, 255, 255, 1);
			margin-bottom: 100px;
		}
		.choose-name-box {
			margin-bottom: 36px;
			height: 340px;
			width: 535px;
			background: #fff;
			border-radius: 4px;
			position: relative;
			.mask {
				background-color: rgba(0, 0, 0, 0.7);
				height: 340px;
				width: 535px;
				z-index: 1;
				position: absolute;
				top: 0;
				left: 0;
				border-radius: 4px;
				display: flex;
				justify-content: center;
				align-items: center;
				.start-btn {
					height: 150px;
					width: 150px;
					cursor: pointer;
					background: url("../../assets/img/start-btn.png") no-repeat
						left center;
					background-size: contain;
				}
				.operation-buttons {
					position: absolute;
					right: 0;
					top: 0;
					img {
						margin-right: 16px;
						margin-top: 10px;
						cursor: pointer;
					}
				}
			}
			.content {
				height: 340px;
				width: 535px;
				position: relative;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				padding-top: 30px;
				.student {
					img {
						height: 142px;
						width: auto;
						margin-bottom: 30px;
					}
				}
				.en {
					font-size: 24px;
					font-weight: 500;
					color: rgba(73, 80, 96, 1);
				}
				.cn {
					font-size: 36px;
					font-weight: 600;
					color: rgba(73, 80, 96, 1);
				}
			}
		}
	}
}
.big-time-box {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;

	height: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	.close-btn {
		position: absolute;
		top: 16px;
		right: 16px;
		width: 22px;
		height: 22px;
	}
	.choose-name-box-div {
		width: 100%;
		height: 360px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.numbers {
			.over {
				font-size: 244px;
				font-weight: 600;
				color: rgba(255, 255, 255, 1);
				font-family: PingFangSC-Semibold;
			}
			.clock-list {
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				div {
					font-size: 244px;
					font-weight: 600;
					color: rgba(255, 255, 255, 1);
					font-family: PingFangSC-Semibold;
				}
			}
		}
		.action-btns {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			width: 346px;
			padding-left: 40px;
			.restart {
				img {
					width: 62px;
					height: 64px;
					cursor: pointer;
				}
			}
			.start {
				margin-left: 40px;
				margin-right: 40px;
				img {
					width: 64px;
					height: 64px;
					cursor: pointer;
				}
			}
			span {
				font-size: 28px;
				font-weight: 600;
				font-family: PingFangSC-Semibold;
				color: rgba(255, 255, 255, 1);
				cursor: pointer;
			}
		}
	}
}
</style>

<template>
	<div
		v-show="loading"
		class="classRoom"
		:style="notStarted ? 'background:#fff' : 'background:#f0f2f5'"
	>
		<audio :src="timeUpFilePath" id="time0_1" style="display:none;" />
		<!-- 倒计时结束 -->
		<div
			class="room_header"
			@click="randomTX"
			:style="notStarted ? 'background:#f0f2f5;heihgt:64px;' : 'background:#fff;heihgt:64px;'"
		>
			<div class="back_btn">
				<Icon type="ios-arrow-back" @click="turnBack" :size="30" />
			</div>
			<div
				class="class_name"
				:style="notStarted ? 'color:#999' : 'color:#495060'"
			>{{classInfos.className }}</div>
			<div class="class_num">{{$t('classroom_classroom_63', [classInfos.curLesson])}}</div>
			<div class="signature" v-if="!notStarted">
				{{$t('classroom_classroom_64')}}
				<span class="green">{{classInfos.factNum}}</span>
				/{{lessonTotalAttendanceNum}}）
			</div>
			<div class="class_info">
				<img v-if="!notStarted" src="../../assets/img/fangzi.png" />
				<img src="../../assets/img/fangzi1.png" v-else />
				<span>{{classInfos.classTeacherName}}</span>
				<span>{{classInfos.classroomName}}</span>
			</div>
		</div>
		<div v-if="notStarted" class="not-started">
			<img src="../../assets/img/notData.png" />
			<div>{{$t('classroom_classroom_65')}}</div>
		</div>
		<div class="room_main" v-else>
			<div v-if="types == 'default' || types== 'name' || types== 'clock'  ">
				<div class="room_main_left">
					<div
						class="stu_card"
						:class="{'no':scoreStuList.length <1}"
						:style="scoreStuList.length <1? 'cursor:default' :'cursor:pointer'"
						@click="scoreAll"
					>
						<div class="img_box">
							<img src="../../assets/img/class_stu.png" />
						</div>
						<div class="all_stu">{{$t('classroom_classroom_66')}}</div>
						<div
							class="score"
							:class="this.scoreStuList.length < 1 ? 'none' :  ''"
						>{{classInfos.totalPoint}}</div>
					</div>
				</div>
				<div class="room_main_right">
					<div
						class="stu_card"
						v-for="(item, index) in stuList"
						:key="index"
						@click="selectEvaluation(item)"
						:style="ifAvsent(item,'3')? 'cursor:default' :'cursor:pointer'"
					>
						<div class="img-box">
							<img v-if="ifAvsent(item,'3')" src="../../assets/img/no_stu.png" />
							<img v-else-if="item.classAvatarPath !== null" :src="item.classAvatarPath" />
							<img v-else-if="randomTX(item.phone) === 0" src="../../assets/img/tx-0.png" />
							<img v-else-if="randomTX(item.phone) === 1" src="../../assets/img/tx-1.png" />
							<img v-else-if="randomTX(item.phone) === 2" src="../../assets/img/tx-2.png" />
							<img v-else-if="randomTX(item.phone) === 3" src="../../assets/img/tx-3.png" />
							<img v-else-if="randomTX(item.phone) === 4" src="../../assets/img/tx-4.png" />
							<img v-else-if="randomTX(item.phone) === 5" src="../../assets/img/tx-5.png" />
							<img v-else-if="randomTX(item.phone) === 6" src="../../assets/img/tx-6.png" />
							<img v-else-if="randomTX(item.phone) === 7" src="../../assets/img/tx-7.png" />
							<img v-else-if="randomTX(item.phone) === 8" src="../../assets/img/tx-8.png" />
							<img v-else-if="randomTX(item.phone) === 9" src="../../assets/img/tx-9.png" />
							<img v-else-if="randomTX(item.phone) === 10" src="../../assets/img/tx-10.png" />
						</div>
						<div class="en_name">{{item.enName}}</div>
						<div class="cn_name">{{item.name}}</div>
						<span class="totalpoint" :class="ifAvsent(item,'3') ? 'none' : ''">{{item.totalpoint}}</span>
						<div
							class="score"
							:class="ifAvsent(item,'3') ? 'none' : showStuScore(item) < 0 ? 'red' : ''"
						>{{showStuScore(item)}}</div>
					</div>
				</div>
			</div>
			<div v-if="types == 'attendance'">
				<div class="room_main_left">
					<div class="stu_card no">
						<div class="img_box">
							<img src="../../assets/img/class_stu.png" />
						</div>
						<div class="all_stu">{{$t('classroom_classroom_66')}}</div>
					</div>
				</div>
				<div class="room_main_right">
					<div
						@click="changeAttendance(item)"
						class="stu_card"
						:key="index"
						v-for="(item, index) in attendance"
					>
						<div class="img-box">
							<img v-if="item.classAvatarPath !== null" :src="item.classAvatarPath" />
							<img v-else-if="randomTX(item.phone) === 0" src="../../assets/img/tx-0.png" />
							<img v-else-if="randomTX(item.phone) === 1" src="../../assets/img/tx-1.png" />
							<img v-else-if="randomTX(item.phone) === 2" src="../../assets/img/tx-2.png" />
							<img v-else-if="randomTX(item.phone) === 3" src="../../assets/img/tx-3.png" />
							<img v-else-if="randomTX(item.phone) === 4" src="../../assets/img/tx-4.png" />
							<img v-else-if="randomTX(item.phone) === 5" src="../../assets/img/tx-5.png" />
							<img v-else-if="randomTX(item.phone) === 6" src="../../assets/img/tx-6.png" />
							<img v-else-if="randomTX(item.phone) === 7" src="../../assets/img/tx-7.png" />
							<img v-else-if="randomTX(item.phone) === 8" src="../../assets/img/tx-8.png" />
							<img v-else-if="randomTX(item.phone) === 9" src="../../assets/img/tx-9.png" />
							<img v-else-if="randomTX(item.phone) === 10" src="../../assets/img/tx-10.png" />
						</div>
						<div class="en_name">{{item.enName}}</div>
						<div class="cn_name">{{item.name}}</div>
						<div class="atten">
							<img v-if="item.jxAttendance.status == 'present'" src="../../assets/img/attendance.png" />
							<img src="../../assets/img/absence.png" v-else />
						</div>
					</div>
				</div>
			</div>
			<div v-if="types == 'evaluation'">
				<div class="room_main_left">
					<div class="stu_card no">
						<div class="img_box">
							<img src="../../assets/img/class_stu.png" />
						</div>
						<div class="all_stu">{{$t('classroom_classroom_66')}}</div>
					</div>
				</div>
				<div class="room_main_right">
					<div
						class="stu_card"
						v-for="(item, index) in scoreStuList"
						@click="selectStu(item)"
						:key="index"
						:style="item.status == 'absent'? 'cursor:default' :'cursor:pointer'"
					>
						<div class="img-box">
							<img v-if="item.classAvatarPath !== null" :src="item.classAvatarPath" />
							<img v-else-if="randomTX(item.phone) === 0" src="../../assets/img/tx-0.png" />
							<img v-else-if="randomTX(item.phone) === 1" src="../../assets/img/tx-1.png" />
							<img v-else-if="randomTX(item.phone) === 2" src="../../assets/img/tx-2.png" />
							<img v-else-if="randomTX(item.phone) === 3" src="../../assets/img/tx-3.png" />
							<img v-else-if="randomTX(item.phone) === 4" src="../../assets/img/tx-4.png" />
							<img v-else-if="randomTX(item.phone) === 5" src="../../assets/img/tx-5.png" />
							<img v-else-if="randomTX(item.phone) === 6" src="../../assets/img/tx-6.png" />
							<img v-else-if="randomTX(item.phone) === 7" src="../../assets/img/tx-7.png" />
							<img v-else-if="randomTX(item.phone) === 8" src="../../assets/img/tx-8.png" />
							<img v-else-if="randomTX(item.phone) === 9" src="../../assets/img/tx-9.png" />
							<img v-else-if="randomTX(item.phone) === 10" src="../../assets/img/tx-10.png" />
						</div>
						<div class="en_name">{{item.enName}}</div>
						<div class="cn_name">{{item.name}}</div>
						<div class="atten">
							<img v-if="!item.selected" src="../../assets/img/unselected-stu.png" />
							<img src="../../assets/img/selected-stu.png" v-else />
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--点名-->
		<div v-show="types == 'name'" class="name-clock">
			<chooseName
				ref="chooseName"
				@close-name="closeName"
				@showBigChooseNamefn="showBigChooseNamefn"
				:id="classId"
				:list="scoreStuList"
			></chooseName>
		</div>
		<!--定时器-->
		<div v-if="types== 'clock'" class="name-clock">
			<clock
				ref="clockSmall"
				@close-clock="closeName"
				@reset="getReset"
				@show-choose="showClock"
				:id="classId"
				:clockData="clockData"
			></clock>
		</div>
		<!-- 底部按钮操作开始 -->
		<div
			v-if="types !== 'attendance'"
			class="room_footer"
			:style="notStarted ? 'background:#f0f2f5' : 'background:#fff'"
		>
			<div
				@click="checkOutType('attendance')"
				class="operate"
				:class="types == 'attendance'? 'active' : '' "
				:style="{cursor:notStarted? 'default' : 'pointer'}"
			>
				<CommonIcon
					type="_bianzu"
					:size="24"
					:color="!notStarted? '#44BCB7' : '#999'"
					:style="{marginRight: '8px',display:'inline-block', verticalAlign: 'middle'}"
				/>
				<span :style="{color:!notStarted? '#495060' : '#999'}">{{$t('classroom_classroom_67')}}</span>
			</div>
			<div
				v-if="this.roleId != '10'"
				@click="checkOutType('evaluation')"
				class="operate"
				:class="types == 'evaluation'? 'active' : '' "
				:style="{cursor:notStarted? 'default' : 'pointer'}"
			>
				<CommonIcon
					type="_bianzu1"
					:size="24"
					:color="!notStarted? '#44BCB7' : '#999'"
					:style="{marginRight: '8px',display:'inline-block', verticalAlign: 'middle'}"
				/>
				<span :style="{color:!notStarted? '#495060' : '#999'}">{{$t('classroom_classroom_68')}}</span>
			</div>
			<div
				v-if="this.roleId != '10'"
				@click="checkOutType('name')"
				class="operate"
				:class="types == 'name'? 'active' : '' "
				:style="{cursor:notStarted? 'default' : 'pointer'}"
			>
				<CommonIcon
					type="_bianzu2"
					:size="24"
					:color="!notStarted? '#44BCB7' : '#999'"
					:style="{marginRight: '8px',display:'inline-block', verticalAlign: 'middle'}"
				/>
				<span :style="{color:!notStarted? '#495060' : '#999'}">{{$t('classroom_classroom_69')}}</span>
			</div>
			<div
				v-if="this.roleId != '10'"
				@click="checkOutType('clock')"
				class="operate"
				:class="types == 'clock'? 'active' : '' "
				:style="{cursor:notStarted? 'default' : 'pointer'}"
			>
				<CommonIcon
					type="_xingzhuang"
					:size="24"
					:color="!notStarted? '#44BCB7' : '#999'"
					:style="{marginRight: '8px',display:'inline-block', verticalAlign: 'middle'}"
				/>
				<span :style="{color:!notStarted? '#495060' : '#999'}">{{$t('classroom_classroom_70')}}</span>
			</div>
		</div>
		<!-- 底部按钮操作结束 -->

		<!-- 考勤时显示的底部开始 -->
		<div
			v-if="types == 'attendance'"
			class="room_footer"
			:style="notStarted ? 'background:#f0f2f5' : 'background:#fff'"
		>
			<div class="attendance-btn">
				<div class="ab-item">
					<div @click="allAttendance(1)" style="margin-right:24px;">
						<img src="../../assets/img/attendance.png" />
						<span>{{$t('classroom_classroom_71')}}</span>
					</div>
					<div @click="allAttendance(0)">
						<img src="../../assets/img/absence.png" />
						<span>{{$t('classroom_classroom_72')}}</span>
					</div>
				</div>
				<div class="ab-item">
					<span class="no-bg" @click="cancelAttendance">{{$t('classroom_allscore_53')}}</span>
					<span @click="checkMorePeopleConflict" class="save-btn">{{$t('classroom_classroom_74')}}</span>
				</div>
			</div>
		</div>
		<!-- 考勤时显示的底部结束 -->

		<!-- 评价时显示的底部开始 -->
		<div
			v-if="types == 'evaluation'"
			class="room_footer"
			:style="notStarted ? 'background:#f0f2f5' : 'background:#fff'"
		>
			<div class="attendance-btn">
				<div @click="selectStuAll" class="no-bg">{{$t('classroom_classroom_75')}}</div>
				<div class="no-everything">
					<span>{{selectedStuConut}}</span>
					{{$t('classroom_classroom_76')}}
				</div>
				<div class="ab-item">
					<span class="no-bg" @click="cancelEvaluation">{{$t('classroom_allscore_53')}}</span>
					<span @click="saveEvaluation" class="save-btn">{{$t('classroom_classroom_77')}}</span>
				</div>
			</div>
		</div>
		<!-- 评价时显示的底部结束 -->

		<evaluation ref="evaluation" @getfaList="getMainInfo"></evaluation>
		<allScore ref="allScore" @getfaList="getMainInfo"></allScore>
		<div v-if="showBigChooseName" class="big-choose-name-box">
			<div class="close-btn">
				<Icon color="#fff" size="22" style="cursor: pointer" @click="back" type="md-close" />
			</div>
			<div class="choose-name-box-div">
				<div class="choose-name-box" :style="{marginBottom:showMask ? '36px' :'36px'}">
					<div v-if="showMask" class="mask">
						<div @click="timer2" class="start-btn"></div>
					</div>
					<div class="content">
						<div class="student">
							<img src="../../assets/img/man_stu.png" />
						</div>
						<span class="cn">{{chooseData.enName}}</span>
						<span class="en">{{chooseData.name}}</span>
					</div>
				</div>
				<span v-if="!showMask" @click="pickAgain" style="cursor: pointer" class="pick-again">Pick again</span>
				<span v-if="showMask" class="pick-again">&nbsp;</span>
			</div>
		</div>
		<div
			v-if="showBigTimer"
			class="big-time-box"
			:style="{background: type == '4'? '#FF5D5B' : '#44BCB7'}"
		>
			<div class="close-btn">
				<Icon color="#fff" size="22" style="cursor: pointer" @click="closeBigTimer" type="md-close" />
			</div>
			<div class="choose-name-box-div">
				<div class="numbers">
					<div class="over" v-if="type == '4'">Time's Up!</div>
					<div class="clock-list" v-else>
						<div>{{text1}}</div>
						<div>{{text2}}</div>
						<div>:</div>
						<div>{{text3}}</div>
						<div>{{text4}}</div>
					</div>
				</div>
				<div class="action-btns">
					<div class="restart" @click="reset">
						<Icon color="#fff" size="36" type="ios-skip-backward" />
						<!--                        <i style="font-size: 26px;color:#fff;cursor: pointer" class="iconfont icon-zhongxinshangchuan"></i>-->
					</div>
					<div class="start">
						<img
							@click="timer3"
							v-if="type == '1' || type == '3' "
							src="../../assets/img/start-green.png"
						/>
						<img @click="stop" v-if="type == '2'" src="../../assets/img/big-stop.png" />
						<img @click="newStart" v-if="type == '4'" src="../../assets/img/start-red.png" />
					</div>
					<span @click="add10">+10s</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CommonIcon from "_c/common-icon";
import chooseName from "./chooseName";
import evaluation from "./evaluation";
import score from "./score";
import allScore from "./allScore";
import clock from "./clock";
import valid, { errors, jxLessonStudentRel, sysUser } from "../../libs/request";
import { mapMutations } from "vuex";
export default {
	name: "classRoom",
	data() {
		return {
			isSaveAttendance: false, //防止重复提交
			timeUpFilePath:
				(location.hostname == "hootie.athenaca.com" ? "" : "/spoc-jw") +
				"/upload/sounds/Time/TimeUp.mp3",
			notStarted: false,
			types: "default",
			lessonTotalAttendanceNum: "", //应到总数
			isAttendance: "0",
			classInfos: {},
			stuList: [],
			clockData: {
				type: "1",
				times: 0
			},
			attendance: [],
			attendanceParams: [], //出勤参数
			selectedStuConut: 0,
			scoreStuList: [],
			classId: "",//也就是lessonId,开始时定义错了
			from: "",
			classListId: "",
			showBigChooseName: false,
			ifStopChoose: false,
			scTimer: null,
			scOpen: true,
			chooseData: {},
			showMask: true,
			showBigTimer: false,
			text: 0,
			showMaskT: true,
			type: 1,
			tmr: null,
			times: 0,
			tmr2: null,
			loading: false,
			openSingle: true,
			ifClickAll: false, //考勤全选
			roleId: "",
			text1: 0,
			text2: 0,
			text3: 0,
			text4: 0,
			textSet: 300
		};
	},
	components: {
		CommonIcon,
		chooseName,
		clock,
		evaluation,
		score,
		allScore
	},
	mounted() {
		this.getUserRight();
		this.getInfos();
		this.getMainInfo();
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		randomTX(number) {
			if(typeof number === "string"){
                let num = Number(number.slice(-2)) % 11;
                return num;
            }
		},
		getUserRight() {
			//判断登录用户类型
			sysUser
				.userInfoData()
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.roleId = res.data.data.roleId;
					}
				})
				.catch(errors.call(this));
		},
		checkImgExists(imgurl) {
			var ImgObj = new Image(); //判断图片是否存在
			ImgObj.src = imgurl;
			//存在图片
			if (
				ImgObj.fileSize > 0 ||
				(ImgObj.width > 0 && ImgObj.height > 0)
			) {
				return true;
			} else {
				return false;
			}
		},

		showStuScore(item) {
			if (item.jxLessonStudentRel == null) {
				return 0;
			} else {
				if (item.jxLessonStudentRel.totalPoint == null) {
					return 0;
				} else {
					return item.jxLessonStudentRel.totalPoint;
				}
			}
		},
		getInfos() {
			if (this.$route.query.id != undefined) {
				this.classId = this.$route.query.id;
			}
			if (this.$route.query.from != undefined) {
				this.from = this.$route.query.from;
				if (this.$route.query.classListId != undefined) {
					this.classListId = this.$route.query.classListId;
				}
			}
			if (this.scoreStuList.length > 0) {
				this.chooseData = this.scoreStuList[0];
			}
		},
		ifAvsent(item, key) {
			if (key == "1") {
				if (item.jxLessonStudentRel == null) {
					return false;
				} else {
					if (
						item.jxLessonStudentRel.jxAttendance.status ==
							"present" &&
						item.gender == "m"
					) {
						return true;
					} else {
						return false;
					}
				}
			} else if (key == "2") {
				if (item.jxLessonStudentRel == null) {
					return false;
				} else {
					if (
						item.jxLessonStudentRel.jxAttendance.status ==
							"present" &&
						item.gender == "f"
					) {
						return true;
					} else {
						return false;
					}
				}
			} else if (key == "3") {
				if (item.jxLessonStudentRel == null) {
					return true;
				} else {
					if (
						item.jxLessonStudentRel.jxAttendance.status == "present"
					) {
						return false;
					} else {
						return true;
					}
				}
			}
		},
		getMainInfo() {
			//现在最新决定，不自动进入全屏
			// this.launchFullscreen(document.documentElement)
			this.updateLoadingStatus({ isLoading: true });
			jxLessonStudentRel
				.getLessonAttendanceInfo({ lessonId: this.classId })
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						if (
							res.data.message ==
								this.$t("classroom_classroom_65") ||
							res.data.message == "The class has not started yet."
						) {
							this.notStarted = true;
							let data = res.data.data;
							//                            this.classInfos = this.deepClone(data.lesson)
							this.classInfos = JSON.parse(
								JSON.stringify(data.lesson)
							);
							this.loading = true;
						} else {
							this.notStarted = false;
							let data = res.data.data;
							this.lessonTotalAttendanceNum =
								data.lessonTotalAttendanceNum;
							this.classInfos = JSON.parse(
								JSON.stringify(data.lesson)
							);
							this.isAttendance = data.lesson.isAttendance;
							this.stuList = JSON.parse(
								JSON.stringify(data.studentList)
							);
							this.attendance = [];
							this.attendanceParams = [];
							this.scoreStuList = [];
							this.stuList.forEach(item => {
								//item.avator = '/spoc-hootie/avator/'+item.id+'.png'
								let obj = {
									lessonId: this.classId,
									officeId: this.classInfos.officeId,
									studentId: item.id,
									teacherId: this.classInfos.teacherId,
									classTeacherId: this.classInfos
										.classTeacherId,
									totalPoint: item.totalPoint,
									isFeedback: item.isFeedback,
									enName: item.enName,
									gender: item.gender,
									phone: item.phone,
									name: item.name,
									classAvatarPath: item.classAvatarPath,
									jxAttendance: {}
								};
								if (item.jxLessonStudentRel == null) {
									obj.jxAttendance.status = "absent";
									obj.phone = item.phone;
								} else {
									obj = JSON.parse(
										JSON.stringify(item.jxLessonStudentRel)
									);
									obj.enName = item.enName;
									obj.gender = item.gender;
									obj.name = item.name;
									obj.phone = item.phone;
									obj.classAvatarPath = item.classAvatarPath;
								}
								this.attendance.push(obj);
								this.attendanceParams.push(obj);
								if (obj.jxAttendance.status == "present") {
									let obj1 = {
										id: item.id,
										lessonId: this.classId,
										officeId: this.classInfos.officeId,
										studentId: item.id,
										teacherId: this.classInfos.teacherId,
										classTeacherId: this.classInfos
											.classTeacherId,
										totalPoint: item.totalPoint,
										isFeedback: item.isFeedback,
										point: item.point,
										enName: item.enName,
										gender: item.gender,
										name: item.name,
										phone: item.phone,
										classAvatarPath: item.classAvatarPath,
										selected: false
									};
									this.scoreStuList.push(obj1);
								}
							});
							//                            console.log(this.attendance)
							//                            console.log(this.scoreStuList)
							this.lessonTotalAttendanceNum = this.stuList.length;
							this.loading = true;
						}
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		changeAttendance(item) {
			if (this.openSingle) {
				//是否第一次点击
				this.openSingle = false;
				if (this.ifClickAll) {
					//已经点击过了全部
					//this.ifClickAll = false
					item.jxAttendance.status =
						item.jxAttendance.status == "absent"
							? "present"
							: "absent";
					this.attendanceParams.forEach(item1 => {
						if (item1.studentId == item.studentId) {
							item1.jxAttendance.status =
								item.jxAttendance.status;
						}
					});
				} else {
					this.attendanceParams = [];
					item.jxAttendance.status =
						item.jxAttendance.status == "absent"
							? "present"
							: "absent";
					this.changeAttendanceParam(
						item.id,
						item.studentId,
						item.jxAttendance.status
					);
				}
			} else {
				let isTrue = false; //已经点击过学生了
				this.attendanceParams.forEach(item1 => {
					if (item1.studentId == item.studentId) {
						isTrue = true;
						item1.jxAttendance.status =
							item.jxAttendance.status == "absent"
								? "present"
								: "absent";
					}
				});
				if (isTrue) {
					if (this.ifClickAll) {
						item.jxAttendance.status =
							item.jxAttendance.status == "absent"
								? "present"
								: "absent";
					}
				} else {
					item.jxAttendance.status =
						item.jxAttendance.status == "absent"
							? "present"
							: "absent";
					this.changeAttendanceParam(
						item.id,
						item.studentId,
						item.jxAttendance.status
					);
				}
			}
		},
		changeAttendanceParam(ids, id, status) {
			if (ids == undefined) {
				//未考勤
				this.attendance.forEach(item => {
					if (item.studentId == id) {
						item.jxAttendance.status = status;
					}
					this.attendanceParams.push(item);
				});
			} else {
				//考过
				this.attendance.forEach(item => {
					if (item.studentId == id) {
						item.jxAttendance.status = status;
						this.attendanceParams.push(item);
					}
				});
			}
		},
		allAttendance(type) {
			this.ifClickAll = true;
			this.openSingle = true;
			this.attendanceParams = [];
			let obj = {};
			this.attendance.forEach(item => {
				if (item.id == undefined) {
					//未考勤
					obj = {
						//                            "id":item.id,
						lessonId: item.lessonId,
						officeId: item.officeId,
						studentId: item.studentId,
						teacherId: item.teacherId,
						classTeacherId: item.classTeacherId,
						totalPoint: item.totalPoint,
						isFeedback: item.isFeedback,
						jxAttendance: {}
					};
					if (type == 0) {
						//转为缺勤
						item.jxAttendance.status = "absent";
						obj.jxAttendance.status = "absent";
					} else {
						item.jxAttendance.status = "present";
						obj.jxAttendance.status = "present";
					}
					this.attendanceParams.push(obj);
				} else {
					if (type == 0) {
						//转为缺勤
						item.jxAttendance.status = "absent";
						obj = JSON.parse(JSON.stringify(item));
					} else {
						item.jxAttendance.status = "present";
						obj = JSON.parse(JSON.stringify(item));
					}
					this.attendanceParams.push(obj);
				}
			});
		},
		turnBack() {
			// this.exitFullscreen();
			history.go(-1);
		},
		//多人同时考勤是冲突校验
		checkMorePeopleConflict(){
			if(this.isAttendance == '0'){
				jxLessonStudentRel
				.isAttendanced({lessonId:this.classId})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.saveAttendance()
					}else{
                        this.getMainInfo();
                        this.types = "default";
                        this.openSingle = true;
                        this.ifClickAll = false;
                        this.attendanceParams = [];
					}
				})
				.catch(errors.call(this))
				.finally(() => {
				});
			}else{
				this.saveAttendance()
			}
			
		},
		checkOutType(type) {
			if (!this.notStarted) {
				if (type == "attendance") { //进入考勤
					this.types = type;

				} else if (type == "evaluation") {
					this.scoreStuList.forEach(item => {
						item.selected = false;
					});
					this.types = type;
				} else {
					if (this.roleId == "10") {
						this.types = "attendance";
					} else {
						this.types = type;
					}
				}
				if(this.types == 'name'){
					this.$refs.chooseName.init()
				}
			}
		},
		cancelAttendance() {
			this.types = "default";
			this.getMainInfo();
			this.openSingle = true;
			this.ifClickAll = false;
			this.attendanceParams = [];
		},
		saveAttendance() {
			if (this.isSaveAttendance) {
				return;
			}
			this.isSaveAttendance = true;
			jxLessonStudentRel
				.attendance(this.attendanceParams)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.getMainInfo();
						this.types = "default";
						this.openSingle = true;
						this.ifClickAll = false;
						this.attendanceParams = [];
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.isSaveAttendance = false;
				});
		},
		isObject(o) {
			return (
				(typeof o === "object" || typeof o === "function") && o !== null
			);
		},
		deepClone(obj) {
			if (!this.isObject(obj)) {
				throw new Error(this.$t("classroom_allscore_61"));
			}
			let isArray = Array.isArray(obj);
			let cloneObj = isArray ? [] : {};
			for (let key in obj) {
				cloneObj[key] = this.isObject(obj[key])
					? this.deepClone(obj[key])
					: obj[key];
			}
			return cloneObj;
		},
		selectStu(item) {
			item.selected = !item.selected;
			if (item.selected) {
				this.selectedStuConut++;
			} else {
				this.selectedStuConut--;
			}
		},
		selectStuAll() {
			this.selectedStuConut = 0;
			this.scoreStuList.forEach(item => {
				item.selected = true;
				this.selectedStuConut++;
			});
		},
		selectEvaluation(item) {
			if (this.roleId != "10") {
				if (item.jxLessonStudentRel.jxAttendance.status == "present") {
					this.$refs.evaluation.show({ type: "score", stu: [item] });
				}
			} else {
				this.$Message.error(this.$t("classroom_classroom_79"));
			}
		},
		scoreAll() {
			if (this.roleId != "10") {
				let arr = [];
				if (this.stuList.length > 0) {
					this.stuList.forEach(item => {
						if (
							item.jxLessonStudentRel.jxAttendance.status ==
							"present"
						) {
							arr.push(item);
						}
					});
					if (arr.length == 0) {
						this.$Message.warning({
							duration: 3,
							top: 30,
							content: this.$t("classroom_choosename_62")
						});
					} else {
						this.$refs.allScore.show({
							type: "score",
							stu: arr
						});
					}
				}
			} else {
				this.$Message.error(this.$t("classroom_classroom_79"));
			}
		},
		saveEvaluation() {
			let obj = [];
			let obj1 = [];
			let count = 0;
			this.scoreStuList.forEach(item => {
				if (item.selected) {
					count++;
					obj.push(item.id);
				}
			});
			this.stuList.forEach(item => {
				if (obj.includes(item.id)) {
					obj1.push(item);
				}
			});
			if (count < 1) {
				this.$Message.warning({
					duration: 3,
					top: 30,
					content: this.$t("classroom_classroom_81")
				});
			} else {
				this.$refs.allScore.show({
					type: "score",
					stu: obj1
				});
				this.types = "default";
				this.selectedStuConut = 0;
			}
		},
		cancelEvaluation() {
			this.types = "default";
			this.selectedStuConut = 0;
		},
		timer2() {
			this.ifStopChoose = false;
			if (this.scoreStuList.length == 0) {
				let config = {
					duration: 2,
					top: 30,
					content: this.$t("classroom_choosename_62")
				};
				this.$Message.warning(config);
			} else {
				this.showMask = false;
				let len = this.scoreStuList.length;
				this.tmr = setInterval(() => {
					let t = Math.random();
					let index = parseInt(t * len);
					this.chooseData = this.scoreStuList[index];
				}, 100);
				let t = setTimeout(() => {
					clearTimeout(t);
					clearInterval(this.tmr);
					this.ifStopChoose = true;
				}, 3000);
			}
		},
		pickAgain() {
			if (this.ifStopChoose) {
				this.ifStopChoose = false;
				clearInterval(this.tmr);
				this.timer2();
			} else {
				if (this.scOpen) {
					this.$Message.warning(this.$t("classroom_classroom_82"));
					this.scOpen = false;
				} else {
					this.scTimer = setTimeout(() => {
						this.scOpen = true;
					}, 1000);
				}
			}
		},
		back() {
			this.showBigChooseName = false;
		},
		launchFullscreen(element) {
			if (element.requestFullscreen) {
				element.requestFullscreen();
			} else if (element.mozRequestFullScreen) {
				element.mozRequestFullScreen();
			} else if (element.webkitRequestFullscreen) {
				element.webkitRequestFullscreen();
			} else if (element.msRequestFullscreen) {
				element.msRequestFullscreen();
			}
		},
		exitFullscreen() {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			}
		},
		showBigChooseNamefn() {
			this.showBigChooseName = true;
			this.showMask = true;
			if (this.scoreStuList.length > 0) {
				this.chooseData = this.scoreStuList[0];
			}
		},
		closeName() {
			this.types = "default";
		},
		getReset(val) {
			this.text = val.a * 600 + val.b * 60 + val.c * 10 + val.d * 1;
			this.textSet = this.text;
		},
		setClock(text) {
			let minutes = text / 60;
			let seconds = text % 60;
			this.text1 = parseInt(minutes / 10);
			this.text2 = parseInt(minutes % 10);
			this.text3 = parseInt(seconds / 10);
			this.text4 = parseInt(seconds % 10);
		},
		reset() {
			document.getElementById("time0").pause();
			document.getElementById("time0").currentTime = 0;
			document.getElementById("time0_1").pause();
			document.getElementById("time0_1").currentTime = 0;
			this.type = "1";
			this.setClock(this.textSet);
			this.text = this.textSet;
			clearInterval(this.tmr2);
		},
		add10() {
			this.text = parseInt(this.text) + 10;
			if (this.text > 5999) {
				this.text = 5999;
			}
			this.textSet = this.text;
			this.$refs.clockSmall.setSmall({ a: this.text });
			this.setClock(this.text);
		},
		newStart() {
			this.text = this.times;
			this.setClock(this.text);
			this.isOver = false;
			this.type = "1";
			this.timer3();
		},
		timer3() {
			this.isOver = false;
			this.tmr2 = setInterval(() => {
				if (this.text == 0) {
					this.stop();
					document.getElementById("time0_1").play();
					this.type = "4";
					this.isOver = true;
				} else {
					this.text--;
					this.setClock(this.text);
					this.type = "2";
				}
			}, 1000);
		},
		stop() {
			clearInterval(this.tmr2);
			this.type = "3";
		},

		showClock(data) {
			this.showBigTimer = true;
			this.text = data.times;
			this.setClock(this.text);
			this.type = data.type;
			clearInterval(this.tmr2);
			if (this.type == "2") {
				this.timer3();
			}
		},
		closeBigTimer() {
			this.showBigTimer = false;
			clearInterval(this.tmr2);
			this.clockData.type = this.type;
			this.clockData.times = this.text;
			this.$refs.clockSmall.init();
			this.exitFullscreen();
		}
	}
};
</script>
