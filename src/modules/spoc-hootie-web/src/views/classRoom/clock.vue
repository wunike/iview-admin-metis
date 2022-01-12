<style lang="less">
._clock {
	width: 456px;
	margin: 0 auto;
	.clock-box {
		margin: 0 auto;
		height: 298px;
		width: 456px;
		border-radius: 4px;
		position: relative;
		background: #5f6382;
		.cb-header {
			height: 54px;
			width: 100%;
			background: #474b65;
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 4px 4px 0 0;
			.do-action-btns {
				width: 80px;
				height: 100%;
				position: absolute;
				top: 0;
				right: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				img {
					cursor: pointer;
					margin-left: 12px;
				}
			}
			span {
				font-size: 14px;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
			}
		}
		.cb-content {
			height: 54px;
			width: 100%;
			position: relative;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
			position: relative;
			.edit-btn {
				position: absolute;
				top: 10px;
				right: 20px;
				color: #fff;
				font-size: 14px;
				cursor: pointer;
			}
			.full-screen {
				position: absolute;
				right: 16px;
				top: 16px;
				cursor: pointer;
			}
			.time {
				width: 100%;
				height: 126px;
				margin-top: 24px;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: flex-start;
				.time-item {
					width: 66px;
					height: 126px;
					font-size: 99px;
					color: #fff;
					margin-right: 2px;
					font-family: PingFangSC-Light;
					div {
						width: 66px;
						text-align: center;
						height: 126px;
						line-height: 126px;
					}
					input {
						float: left;
						width: 66px;
						height: 126px;
						line-height: 126px;
						font-size: 99px;
						color: #fff;
						background: #474b65;
						border: 1px solid #a3a5b2;
						border-radius: 4px;
						text-align: center;
					}
				}
				.time-colon {
					width: 30px;
					text-align: center;
					height: 126px;
					line-height: 110px;
					font-size: 99px;
					color: #fff;
					font-family: PingFangSC-Light;
				}
			}
			.operation-btns {
				width: 100%;
				height: 43px;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: flex-start;
				margin-top: 25px;
				.btn {
					width: 145px;
					height: 43px;
					border: 1px solid #a3a5b2;
					border-radius: 22px;
					color: #fff;
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					background: #343959;
					cursor: pointer;
					span {
						margin-left: 4px;
						font-size: 14px;
						font-weight: 500;
						color: rgba(255, 255, 255, 1);
					}
					&.start {
						cursor: default;
						background: #474b65;
					}
				}
			}
		}
	}
	.tips {
		width: 456px;
		height: 20px;
		line-height: 20px;
		font-size: 12px;
		color: #999;
		text-align: center;
		padding-top: 5px;
	}
}
</style>

<template>
	<div class="_clock">
		<audio :src="timeUpFilePath" id="time0" style="display:none;" />
		<!-- 倒计时结束 -->
		<div class="clock-box">
			<div class="cb-header">
				<span>{{$t('classroom_clock_83')}}</span>
				<div class="do-action-btns">
					<!--                    <img @click="toEdit" src="../../assets/img/full-screen.png">-->
					<img @click="toFullScreen" src="../../assets/img/full-screen.png" />
					<img @click="close" src="../../assets/img/close-icon.png" />
				</div>
			</div>
			<div class="cb-content">
				<div @click="toEdit" v-if="type != 2" class="edit-btn">{{toEditCont}}</div>
				<!--<img class="full-screen" @click="toFullScreen" src="../../assets/img/full-screen.png">-->
				<div class="time">
					<div class="time-item">
						<input v-if="edit " maxlength="1" type="text" @keyup="keyupFn(text1,'text1')" v-model="text1" />
						<div style="cursor:default" v-else>{{text1}}</div>
					</div>
					<div class="time-item">
						<input v-if="edit" maxlength="1" type="text" @keyup="keyupFn(text2,'text2')" v-model="text2" />
						<div style="cursor:default" v-else>{{text2}}</div>
					</div>
					<div class="time-colon">:</div>
					<div class="time-item">
						<input maxlength="1" type="text" v-model="text3" @keyup="keyupFn(text3,'text3')" v-if="edit" />
						<div style="cursor:default" v-else>{{text3}}</div>
					</div>
					<div class="time-item">
						<input v-if="edit" maxlength="1" type="text" @keyup="keyupFn(text4,'text4')" v-model="text4" />
						<div style="cursor:default" v-else>{{text4}}</div>
					</div>
				</div>
				<div class="operation-btns">
					<div
						@click="timer"
						v-if="type == 1 || type == 3 || type == 4"
						class="btn"
						:class="!edit ? '' :'start'"
					>
						<Icon color="#fff" size="19" type="ios-play" />
						<span>{{type == 1 || type == 4 ? $t('classroom_clock_84') : type == 3 ? $t('classroom_clock_85') :''}}</span>
					</div>
					<div @click="stop" v-if="type == 2" class="btn">
						<Icon color="#fff" size="19" type="ios-pause" />
						<span>{{$t('classroom_clock_86')}}</span>
					</div>
					<div
						@click="clear"
						v-if="type == 2 || type == 3"
						:class="!edit ? '' :'start'"
						class="btn"
						style="margin-left:20px;"
					>
						<Icon color="#fff" size="19" type="ios-skip-backward" />
						<span>{{$t('classroom_clock_87')}}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="tips">
			<!--            {{$t('classroom_clock_88')}}-->
		</div>
	</div>
</template>

<script>
export default {
	props: {
		id: {
			type: String,
			default: ""
		},
		clockData: {
			type: Object,
			default: () => {
				return {};
			}
		}
	},
	data() {
		return {
			timeUpFilePath:
				(location.hostname == "hootie.athenaca.com" ? "" : "/spoc-jw") +
				"/upload/sounds/Time/TimeUp.mp3",
			toEditCont: this.$t("classroom_allscore_51"),
			showMask: true,
			type: 1, //，1 开始状态，2 暂停，3 继续， 4 结束，  ---所处状态
			startOrStop: false, //true 开始
			current: "",
			edit: false,
			key1: false,
			key2: false,
			key3: false,
			key4: false,
			text1: 0,
			text2: 5,
			text3: 0,
			text4: 0,
			text11: 0,
			text22: 5,
			text33: 0,
			text44: 0,
			tmr: null,
			isOver: false,
			times: 0
		};
	},
	components: {},

	mounted() {
		this.init();
		this.initCopy();
	},

	methods: {
		toEdit() {
			this.edit = !this.edit;
			if (this.edit) {
				this.toEditCont = this.$t(
					"courselist_compontents_servicecontent_215"
				); //'保存'
			} else {
				this.toEditCont = this.$t("classroom_allscore_51"); //'编辑'
			}
			this.text11 = this.text1;
			this.text22 = this.text2;
			this.text33 = this.text3;
			this.text44 = this.text4;
			this.$emit("reset", {
				a: this.text11,
				b: this.text22,
				c: this.text33,
				d: this.text44
			});
		},
		initCopy() {
			this.text1 = 0;
			this.text2 = 5;
			this.text3 = 0;
			this.text4 = 0;
		},
		init() {
			this.type = this.clockData.type;
			let second = this.clockData.times;
			let minutes = second / 60;
			let seconds = second % 60;
			this.text1 = parseInt(minutes / 10);
			this.text2 = parseInt(minutes % 10);
			this.text3 = parseInt(seconds / 10);
			this.text4 = parseInt(seconds % 10);
			clearInterval(this.tmr);
			if (this.type == "2") {
				this.timer();
			}
		},
		editFn(key) {
			if (this.type != "2") {
				this.edit = true;
			} else {
				this.edit = false;
			}

			this.current = key;
		},
		leave() {
			this.edit = false;
			this.current = "";
		},
		keyupFn(val, key) {
			let value = val.toString();
			let pa1 = /[0-9]/;
			let pa2 = /[0-5]/;
			let k = true;
			if (key == "text3") {
				k = pa2.test(value);
			} else {
				k = pa1.test(value);
			}
			if (!k) {
				this[key] = 0;
			} else {
				this[key] = Number(val);
			}
			this.text11 = this.text1;
			this.text22 = this.text2;
			this.text33 = this.text3;
			this.text44 = this.text4;
			this.$emit("reset", {
				a: this.text11,
				b: this.text22,
				c: this.text33,
				d: this.text44
			});
		},
		setSmall(val) {
			let second = val.a;
			let minutes = second / 60;
			let seconds = second % 60;
			this.text11 = parseInt(minutes / 10);
			this.text22 = parseInt(minutes % 10);
			this.text33 = parseInt(seconds / 10);
			this.text44 = parseInt(seconds % 10);
		},
		start2Choose() {
			this.showMask = false;
		},
		close() {
			document.getElementById("time0").pause();
			document.getElementById("time0").currentTime = 0;
			document.getElementById("time0_1").pause();
			document.getElementById("time0_1").currentTime = 0;
			this.$emit("close-clock");
		},
		toFullScreen() {
			if (this.edit) {
				this.$Message.warning(this.$t('modules_spoc_hootie_web_src_views_classroom_clock_2039'));
			} else {
				clearInterval(this.tmr);
				this.$emit("show-choose", {
					type: this.type,
					times:
						this.text1 * 600 +
						this.text2 * 60 +
						this.text3 * 10 +
						this.text4 * 1
				});
				this.launchFullscreen(document.documentElement);
			}
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
		timer() {
			if (!this.edit) {
				if (
					this.text1 * 600 +
						this.text2 * 60 +
						this.text3 * 10 +
						this.text4 ==
					0
				) {
					this.type = "1";
				} else {
					this.type = "2";
					this.edit = false;
					this.isOver = false;
					this.tmr = setInterval(() => {
						let second =
							this.text1 * 600 +
							this.text2 * 60 +
							this.text3 * 10 +
							this.text4;
						if (second == 0) {
							this.stop();
							this.isOver = true;
							this.type = "4";
							document.getElementById("time0").play();
						} else {
							second--;
							let minutes = second / 60;
							let seconds = second % 60;
							this.text1 = parseInt(minutes / 10);
							this.text2 = parseInt(minutes % 10);
							this.text3 = parseInt(seconds / 10);
							this.text4 = parseInt(seconds % 10);
						}
					}, 1000);
				}
			}
		},
		stop() {
			clearInterval(this.tmr);
			this.type = 3;
			this.startOrStop = false;
		},
		clear() {
			if (!this.edit) {
				this.text1 = this.text11;
				this.text2 = this.text22;
				this.text3 = this.text33;
				this.text4 = this.text44;
				// this.edit = false
				// this.toEditCont = '编辑'
				this.type = "1";
				this.startOrStop = false;
				clearInterval(this.tmr);
			}
		}
	}
};
</script>
