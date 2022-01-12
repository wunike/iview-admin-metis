<style lang="less">
.check-in-electronic-container {
	.check-in-content {
		position: relative;
		margin-top: 10px;
		background: #fff;
	}
	.no-student,
	.unwanted-box,
	.student-abnormal {
		position: absolute;
		top: 50%;
		left: 0;
		right: 0;
		transform: translate(0, -50%);
		text-align: center;
	}
	.no-student {
		p {
			font-size: 16px;
			line-height: 48px;
		}
	}
	.student-abnormal {
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
	.student-lists {
		padding: 16px 32px;
		h3 {
			@h: 48px;
			font-size: 16px;
			line-height: @h;
			height: @h;
		}
		.ivu-form .ivu-form-item-label {
			padding-right: 0;
		}
		.ivu-form-inline .ivu-form-item {
			width: 25%;
			margin-right: 0;
			margin-bottom: 16px;
		}
		.ivu-form .ivu-form-item-label {
			color: #999;
			font-size: 14px;
		}
		.ivu-form-item-content {
			font-size: 14px;
		}
		.ivu-table-wrapper {
			border: 1px solid #dcdee2;
			border-bottom: 0;
			border-right: 0;
			margin-bottom: 16px;
			.ivu-table {
				&:after {
					display: block;
				}
			}
		}
	}
	.unwanted-box {
		.img-box {
			position: relative;
			width: 300px;
			height: 220px;
			margin: 0 auto 24px;
			img {
				display: block;
				width: 100%;
				height: 100%;
			}
			.title {
				@h: 32px;
				position: absolute;
				height: @h;
				line-height: @h;
				left: 0;
				right: 0;
				bottom: 0;
				font-size: 16px;
			}
		}
		.tips {
			@h: 30px;
			height: @h;
			line-height: @h;
		}
	}
}
</style>

<template>
	<div class="check-in-electronic-container">
		<search
			:date="date"
			:datePickerVal="date"
			:isCurrent="isCurrent"
			from="checkInElectronic"
			@onChangeDate="changeDate"
			@getCurrentLists="getCurrentLists"
			@next="next"
			@prev="prev"
		>
			<div class="line-bottom">
				<!-- readonly -->
				<Input
					ref="code"
					id="code"
					autofocus
					:placeholder="$t('modules_spoc_jw_web_src_views_checkinelectronic_index_2364')"
					style="max-width: 237px; margin-right: 32px;"
					@on-enter="getStudent"
					@on-keypress="keypress"
					v-model="code"
				/>
				<!-- <Button type="primary" style="margin-right: 12px;">{{$t('modules_rolepeople_210')}}</Button>
				<Button>{{$t('classroom_clock_87')}}</Button>-->
			</div>
		</search>
		<div class="check-in-content" :style="{ minHeight: height + 'px' }">
			<div class="no-student" v-show="showType == 'init'">
				<img src="../../assets/img/nothing.png" width="130" alt />
				<p>{{$t('modules_spoc_jw_web_src_views_checkinelectronic_index_2367')}}</p>
			</div>
			<div class="student-lists" v-show="showType == 'type0'">
				<h3>{{$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_883')}}</h3>
				<div class="stu-detail">
					<Form v-if="studentDetail" :model="studentDetail" inline>
						<FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentother_1000')">{{ studentDetail.studentCode }}</FormItem>
						<FormItem :label="$t('classroom_exchange_96')">{{ studentDetail.studentName }}</FormItem>
						<FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_945')">{{ studentDetail.customerName }}</FormItem>
						<FormItem :label="$t('views_staff_components_staffinfo_674')">{{ studentDetail.tel }}</FormItem>
					</Form>
				</div>
				<!-- {{dataLists}} -->
				<Table :columns="columns" :data="dataLists"></Table>
			</div>
			<div class="unwanted-box" v-show="showType == 'type2'">
				<div class="img-box">
					<img src="../../assets/img/unwanted.png" alt />
					<p class="title">{{$t('modules_spoc_jw_web_src_views_checkinelectronic_index_2373')}}</p>
				</div>
				<Button @click="nextElectronicSign(true)">{{$t('modules_spoc_jw_web_src_views_checkinelectronic_index_2374')}}</Button>
				<p class="tips">{{$t('modules_spoc_jw_web_src_views_checkinelectronic_index_2375', [ second ])}}</p>
			</div>
			<div class="student-abnormal" v-show="showType == 'type3'">
				<img src="../../assets/img/abnormal.png" width="300px" alt />
				<p>{{$t('modules_spoc_jw_web_src_views_checkinelectronic_index_2376')}}</p>
			</div>
			<div class="student-abnormal" v-show="showType == 'type4'">
				<img src="../../assets/img/abnormal.png" width="300px" alt />
				<p>{{$t('modules_spoc_jw_web_src_views_checkinelectronic_index_2377')}}</p>
			</div>
		</div>
	</div>
</template>

<script>
import search from "../../modules/search";
import valid, { errors, sys, jwManualSign } from "../../libs/request";
const ONE_DAY = 24 * 60 * 60 * 1000;
let time = null;

export default {
	name: "jw.checkInElectronic",
	data() {
		return {
			height: 500,
			date: "", //日期
			isCurrent: true, //是否当天
			code: "", // 扫码枪数据
			second: 5, // 倒计时5秒
			studentDetail: {
				studentId: "",
				studentName: "",
				customerName: "",
				tel: ""
			},
			dataLists: [],
			showType: "init", // init: 还没开始扫描的状态, type0: 签到成功, type2: 今日不需考勤, type3: 课次异常
			columns: [
				{
					title: this.$t('courselist_compontents_detailinfo_160'),
					type: "index",
					width: 60,
					align: "center"
				},
				{
					title: this.$t('mycourse_mycourse_372'),
					key: "classCourseName"
				},
				{
					title: this.$t('mycourse_mycourse_377'),
					key: "startTime"
				},
				{
					title: this.$t('modules_spoc_jw_web_src_views_checkinelectronic_index_2381'),
					key: "remainLeaveNum",
					width: 76 + 36
				},
				{
					title: this.$t('modules_spoc_jw_web_src_views_checkinelectronic_index_2382'),
					key: "createBy"
				},
				{
					title: this.$t('modules_spoc_jw_web_src_views_checkinelectronic_index_2383'),
					key: "createDate"
				},
				{
					title: this.$t('classlist_compontents_detailinfo_42'),
					key: "attendanceStatusName",
					width: 52 + 36
				},
				{
					title: this.$t('modules_spoc_jw_web_src_views_checkinelectronic_index_2385'),
					key: "attendanceDetailStatusName",
					width: 52 + 36
				},
				{
					title: this.$t('modules_spoc_jw_web_src_views_checkinelectronic_index_2386'),
					key: "deductHours",
					width: 62 + 36
				}
			]
		};
	},
	components: {
		search
	},
	mounted() {
		this.initTableHeight();
		this.getCurrentLists();
		window.onresize = () => {
			this.initTableHeight();
		};
		setTimeout(() => {
			this.$refs.code.focus();
		}, 100);
	},
	destroyed() {
		window.onresize = null;
	},
	methods: {
		keypress(){
			setTimeout(() => {
				this.code = ''
			}, 100);
		},
		initTableHeight() {
			this.height = document.body.offsetHeight - 64 - 38 - 118 - 16 * 3;
			// console.log(document.body.offsetHeight)
		},
		getCurrentLists() {
			this.date = new Date().format("yyyy-MM-dd");
			this.checkCurrent();
		},
		changeDate(e) {
			let toDay = new Date().format("yyyy-MM-dd");
			this.date = e;
			this.checkCurrent();
		},
		prev() {
			let _date = this.date;
			this.date = new Date(new Date(_date).getTime() - ONE_DAY).format(
				"yyyy-MM-dd"
			);
			this.checkCurrent();
		},
		next() {
			let _date = this.date;
			this.date = new Date(new Date(_date).getTime() + ONE_DAY).format(
				"yyyy-MM-dd"
			);
			this.checkCurrent();
		},
		checkCurrent() {
			this.isCurrent =
				new Date(this.date).getTime() ==
				new Date(new Date().format("yyyy-MM-dd")).getTime()
					? true
					: false;
			this.$refs.code.focus();
		},
		getStudent(e) {
			// console.log(e)
			let params = {
				studentCode: this.code,
				date: this.date
			};
			jwManualSign
				.electronicSign(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						if (time) clearInterval(time);
						if (res.data.data) {
							this.changeDomState(res.data.data);
						}
					}
				})
				.catch(errors.call(this));
		},
		changeDomState(_detail) {
			// 根据type显示页面
			let _type = _detail.type;
			if (_type == "0") {
				// 成功
				this.showType = "type0";
				this.nextElectronicSign();
				if (
					_detail.jwElectronicSignDetailVOList &&
					_detail.jwElectronicSignDetailVOList.length
				) {
					this.studentDetail =
						_detail.jwElectronicSignDetailVOList[0];
				}
				this.dataLists = [..._detail.jwElectronicSignDetailVOList];
			} else if (_type == "1") {
				// 已考勤
				this.$Message.success(this.$t('modules_spoc_jw_web_src_views_checkinelectronic_index_2387'));
				this.nextElectronicSign();
			} else if (_type == "2") {
				// 今日不需考勤
				this.showType = "type2";
				this.second = 5; //倒计时时间初始化
				time = setInterval(() => {
					this.second--;
					if (this.second < 1) {
						this.nextElectronicSign(true);
					}
				}, 1000);
			} else if (_type == "3") {
				// 课次异常
				this.showType = "type3";
				this.nextElectronicSign();
			} else if (_type == "4") {
				// 课次异常
				this.showType = "type4";
				this.nextElectronicSign();
			}
		},
		nextElectronicSign(_type) {
			// 清空当前数据，进行下一次签到
			if (_type) {
				clearInterval(time);
				this.showType = "init";
			}
			this.code = "";
			this.$refs.code.focus();
		}
	}
};
</script>