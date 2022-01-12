<style lang="less">
.choose-name-box-small {
	margin: 0 auto;
	height: 200px;
	width: 800px;
	background: #fff;
	border-radius: 4px;
	position: relative;
	.mask {
		background-color: rgba(0, 0, 0, 0.7);
		height: 200px;
		width: 800px;
		z-index: 1;
		position: absolute;
		top: 0;
		left: 0;
		border-radius: 4px;
		display: flex;
		justify-content: center;
		align-items: center;
		.start-btn {
			height: 100px;
			width: 100px;
			cursor: pointer;
			background: url("../../assets/img/start-small.png") no-repeat left
				center;
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
		height: 200px;
		width: 800px;
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0 59px 0 45px;
		.un-know-box {
			height: 88px;
			width: 88px;
			.un-know {
				height: 88px;
				width: 88px;
				background: #44bcb7;
				border-radius: 50%;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				img {
					height: 41px;
					width: 62px;
				}
			}
		}

		.student {
			img {
				height: 142px;
				width: auto;
			}
		}
		.student-name {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.cn {
				margin-top: 20px;
				font-size: 36px;
				font-weight: 600;
				color: rgba(73, 80, 96, 1);
			}
			.en {
				font-size: 24px;
				font-weight: 500;
				color: rgba(73, 80, 96, 1);
			}
		}
		.close {
			position: absolute;
			top: -25px;
			right: -25px;
			height: 50px;
			width: 50px;
			cursor: pointer;
		}
	}
}
</style>

<template>
	<div class="choose-name-box-small">
		<audio :src="randomFilePath" loop="loop" id="random0" style="display:none;" />
		<div v-if="showMask" class="mask">
			<div class="operation-buttons">
				<img @click="toFullScreen" src="../../assets/img/full-screen.png" />
				<img @click="close" src="../../assets/img/close-icon.png" />
			</div>
			<div @click="timer" class="start-btn"></div>
		</div>
		<div class="content">
			<div v-if="!showMask" @click="close" class="close">
				<img src="../../assets/img/del.png" />
			</div>
			<div class="student">
				<img src="../../assets/img/man_stu.png" />
			</div>
			<div class="student-name">
				<span class="cn">{{chooseData.enName}}</span>

				<span class="en">{{chooseData.name}}</span>
			</div>

			<div v-if="!isOver" class="un-know-box">
				<div v-if="!showMask" class="un-know">
					<img src="../../assets/img/un-know.png" />
				</div>
			</div>
			<div class="un-know-box" v-else>
				<div v-if="!showMask" class="un-know" @click="timer" style="cursor: pointer">
					<i style="font-size: 50px;color:#fff;" class="iconfont icon-zhongxinshangchuan"></i>
				</div>
			</div>
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
		list: {
			type: Array,
			default: () => {
				return [];
			}
		}
	},
	data() {
		return {
			randomFilePath:
				(location.hostname == "hootie.athenaca.com" ? "" : "/spoc-jw") +
				"/upload/sounds/Random/Random.mp3",
			showMask: true,
			chooseData: {},
			tmr: null,
			isOver: false,
			newSelectIndex: "",
			hasChooseStu: [],
			noChooseStu: [],
			oldChooseStu: '' // 上一轮最后选择的学生
		};
	},
	components: {},
	mounted() {
		// this.init();
	},

	methods: {
		getRandomInt(min,max){
			return Math.floor(Math.random()*(max-min+1))+min;
		},
		start2Choose() {
			this.showMask = false;
		},
		init() {
			this.$nextTick(() => {
				this.timer();
			});
		},
		getNewStu(stuId){
			let noChooseStu = []
			this.list.forEach((item,index)=>{
				if(this.hasChooseStu.indexOf(item.id) < 0){
					noChooseStu.push(item.id)
				}
			})
			let index = this.getRandomInt(0,noChooseStu.length - 1)
			let chooseId = noChooseStu[index]
			if(chooseId != stuId){
				return chooseId
			} else {
				this.getNewStu(stuId)
			}
		},
		timer() {
			if (this.list.length == 0) {
				let config = {
					duration: 2,
					top: 30,
					content: this.$t("classroom_choosename_62")
				};
				this.$Message.warning(config);
			} else {
				this.showMask = false;
				this.isOver = false;
				let len = this.list.length;
				document.getElementById("random0").play();

				// 获取未选点过名的学生ID
				let noChooseStu = []
				this.list.forEach((item,index)=>{
					if(this.hasChooseStu.indexOf(item.id) < 0){
						noChooseStu.push(item.id)
					}
				})
				this.noChooseStu = noChooseStu
				this.tmr = setInterval(() => {
					// 动态刷新随机姓名，不做最终选择用
					let index = this.getRandomInt(0,len-1)
					this.chooseData = this.list[index];
				}, 100);
				let t = setTimeout(() => {
					/* 
						计时结束，随机出来一个未选择结果里的一个下标位，作为最终点名对象，
						并把改id填充进入已选id。
						多次点名后，如果已选点名跟备选的数组长度一致，清空已选学生
					*/
					clearTimeout(t);
					clearInterval(this.tmr);
					let index = this.getRandomInt(0,this.noChooseStu.length - 1)
					let chooseId = this.noChooseStu[index]
					
					// 极端情况下，循环过一轮之后，新一轮的开始人与上一轮的结束人相同，则重新选择一个
					if((!this.hasChooseStu.length) && this.oldChooseStu){
						if(chooseId == this.oldChooseStu){
							chooseId = this.getNewStu(chooseId)
						}
					}

					this.chooseData = this.list.find(item=>{
						return chooseId == item.id
					})
					this.hasChooseStu.push(chooseId)

					let noChooseStu = []
					this.list.forEach((item,index)=>{
						if(this.hasChooseStu.indexOf(item.id) < 0){
							noChooseStu.push(item.id)
						}
					})
					if(!noChooseStu.length){
						// 所有人都点过了。清空已选
						this.hasChooseStu = []
						this.oldChooseStu = chooseId // 本轮结束后最后一个选择学生
					}
					document.getElementById("random0").pause();
					document.getElementById("random0").currentTime = 0;
					this.isOver = true;
					//检测是否和上一次点中的人重复，如果重复则继续随机
				}, 3000);
			}
		},
		close() {
			this.$emit("close-name");
		},
		toFullScreen() {
			this.$emit("showBigChooseNamefn");
		}
	},
	watch: {
		list: {
			handler: function(val, oldVal) {
			}
		}
	}
};
</script>
