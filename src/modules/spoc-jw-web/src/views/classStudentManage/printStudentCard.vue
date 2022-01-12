<style lang="less">
.printWindowParent {
	.a_button {
		width: 100%;
		height: 56px;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px -1px 3px 0px rgba(0, 0, 0, 0.12);
		position: fixed;
		bottom: 0;
		z-index: 99999;
		text-align: center;
		padding-top: 12px;
		.myButton {
			width: 120px;
			margin: 0 auto;
		}
	}

	.printWindow {
		width: 1100px;
		margin: 0 auto;
		.stuGroup {
			padding-top: 100px;
			display: flex;
    		flex-wrap: wrap;
		}
		.stuCard {
			width: 267px;
			height: 418px;
			display: inline-block;
			margin-right: 30px;
			margin-bottom: 40px;
			text-align: center;
			border: 1px solid #e0e0e0;
			position: relative;
			.companyInfo {
				width: 170px;
				margin: 0 auto;
				padding: 20px 0 20px 0;
				img {
					max-width: 170px;
				}
			}
			.stuName {
				margin: 0 auto;
				text-align: center;
				color: #17b6a5;
				font-size: 14px;
				font-weight: bold;
				.avator {
					width: 110px;
					height: 120px;
				}
				.grade {
					color: #fff;
					/* background: #17B6A5; */
					display: inline-block;
					padding: 2px 12px;
					border-radius: 15px;
				}
				.myJsBarcode {
					height: 70px;
					width: 200px;
				}
			}
			.del {
				display: none;
				position: absolute;
				top: 0;
				left: 0;
				width: 267px;
				height: 418px;
				background: rgba(0, 0, 0, 0.5);
				.delIcon {
					font-size: 45px;
					margin-top: 178px;
					cursor: pointer;
					color: #fff;
				}
			}
			&:hover {
				.del {
					display: block;
				}
			}
		}
		.onlyOne {
			width: 100%;
			height: 100%;
			position: relative;
			.stuCard {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				margin-right: 0;
				margin-bottom: 0;
			}
			.myButton {
				position: relative;
				right: 0;
				bottom: -45px;
				background: #44bcb7;
			}
		}
	}
}
</style>
<template>
	<div class="printWindowParent">
		<div class="a_button" v-show="!isPrint">
			<Button class="myButton" type="primary" @click="print">{{$t('modules_spoc_jw_web_src_views_classstudentmanage_printstudentcard_2811')}}</Button>
		</div>
		<div
			class="printWindow"
			:style="{width: isPrint ? '1100px':'891px',  height: students.length == 1 ? '100vh': '', margin: (isPrint && students.length == 1) ? '0': '0 auto'}"
		>
			<div v-if="students.length > 1">
				<div v-for="(item, index) in printStudentArr" :key="index" class="stuGroup">
					<div v-for="(childItem, indexChild) in item" :key="indexChild" class="stuCard">
						<div class="companyInfo">
							<img src="./../../assets/img/company.png" />
						</div>
						<div class="stuName">
							<img class="avator" :src="childItem.imgPath ? childItem.imgPath: defaultImg"/>
							<div>{{childItem.name}}</div>
							<div style="height:21px;font-weight: 400;margin-bottom:12px;">{{childItem.enName}}</div>
							<div style="height:21px;">{{childItem.officeName}}</div>
							<div style="height:26px;">
								<span class="grade" :style="{'background': myBackground}">{{childItem.grade}}</span>
							</div>
							<div>
								<canvas
									class="myJsBarcode"
									:id="'canvas_'+ (index * 9 + indexChild) + '_' + childItem.code"
								></canvas>
							</div>
						</div>
						<div class="del" v-if="!isPrint">
							<div :title="$t('classlist_compontents_detailinfo_46')" @click="delStuCard(childItem.code, childItem.name, index * 9 + indexChild)">
								<Icon type="ios-trash-outline" class="delIcon" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div v-if="students.length == 1" class="onlyOne">
				<div v-for="(childItem, indexChild) in students" :key="indexChild" class="stuCard">
					<div class="companyInfo">
						<img src="./../../assets/img/company.png" />
					</div>
					<div class="stuName">
						<img class="avator" :src="childItem.imgPath ? childItem.imgPath: defaultImg" />
						<div>{{childItem.name}}</div>
						<div style="font-weight: 400;margin-bottom:12px;">{{childItem.enName}}</div>
						<div>{{childItem.officeName}}</div>
						<div style="height:26px;">
							<span class="grade" :style="{'background': myBackground}">{{childItem.grade}}</span>
						</div>
						<div>
							<canvas class="myJsBarcode" :id="'canvas_'+ indexChild + '_' + childItem.code"></canvas>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
const JsBarcode = require("jsbarcode");
import { mapMutations } from "vuex";
import valid, { errors, jwClassCourse } from "../../libs/request";
export default {
	components: {},
	mounted() {
		this.defaultImg = require('../../assets/img/avator.png');
		let params = JSON.parse(localStorage.getItem("printStuCard"));
		if (params.changeColor) {
			this.myBackground = params.changeColor;
		}
		this.getPrintStudentArr(params.stuIdList);
	},
	computed: {},
	data() {
		return {
			defaultImg: '',
			myBackground: "rgb(0, 162, 154)",
			printStudentArr: [],
			isPrint: false,
			students: []
		};
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		formatData() {
			let result = [];
			let child = [];
			this.students.forEach((item, index) => {
				child.push(item);
				if (index % 9 == 8) {
					result.push(child);
					child = [];
				}
			});
			if (child.length) {
				result.push(child);
			}
			this.printStudentArr = result;
			this.$nextTick(() => {
				this.students.forEach((item, index) => {
					var canvas = document.getElementById(
						"canvas_" + index + "_" + item.code
					);
					try {
						JsBarcode(canvas, item.code);
					} catch(e){
						console.log(e)
					}
				});
			});
		},
		getPrintStudentArr(stuIdList) {
			let param = {
				admissionEndDate: "",
				admissionStartDate: "",
				assistId: "",
				classIdList: [],
				classTeacherId: "",
				courseIdList: [],
				officeId: "",
				pageNo: 1,
				pageSize: 100,
				phone: "",
				school: "",
				status: "",
				stuName: "",
				teacherId: "",
				stuIdList
			};
			jwClassCourse
				.listPageStudentVolumes(param)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.students = res.data.data.list;
						this.formatData();
					} else {
						this.$Message.error(res.data.message);
					}
				})
				.catch(errors.call(this))
				.finally(() => {});
		},
		delStuCard(code, name, _index) {
			this.$Modal.confirm({
				title: this.$t('modules_spoc_jw_web_src_views_classstudentmanage_printstudentcard_2813'),
				content: this.$t('modules_spoc_jw_web_src_views_classstudentmanage_printstudentcard_2814') + name + "(" + code + ")",
				onOk: () => {
					this.students = this.students.filter((item, index) => {
						return index != _index;
					});
					this.formatData();
					this.$Message.info(this.$t('scoretemplate_compontents_scoremodify_549'));
				},
				onCancel: () => {}
			});
		},
		print() {
			this.isPrint = true;
			setTimeout(() => {
				window.print();
				this.isPrint = false;
			}, 50);
		}
	}
};
</script>