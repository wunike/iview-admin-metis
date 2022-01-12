<style lang="less">
.school-timet-table-teacher-container {
	position: relative;
	height: 100%;
	.export-dropdowm-box {
		margin-top: 10px;
		text-align: right;
	}
	.export-dropdowm {
		text-align: center;
	}
	.page-box {
		padding: 14px 0;
		margin-bottom: 16px;
		background: #fff;
		text-align: center;
	}
	div::-webkit-scrollbar {
		width: 6px !important;
	}
}
.exportIng{
    .ivu-modal-body{
        padding-bottom: 35px;
    }
    .ivu-modal-footer{
        display: none;
    }
}
</style>

<template>
	<div class="school-timet-table-teacher-container">
		<search
			ref="search"
			:date="date"
			:datePickerVal="datePickerValArr"
			:isCurrent="isCurrent"
			from="teacher"
			@onChangeDate="changeDate"
			@initLists="initLists"
			@search="uploadLists"
			@getCurrentLists="getCurrentLists"
			@next="next"
			@prev="prev"
		></search>

		<div class="export-dropdowm-box">
			<Checkbox v-model="showTableDetail">{{$t('modules_spoc_jw_web_src_views_schooltimetable_class_3028')}}</Checkbox>
			<Dropdown trigger="click" @on-click="exportTpl" class="export-dropdowm" v-if="myButtonPrem && myButtonPrem.indexOf('export') >-1">
				<a href="javascript:void(0)">
					<Button type="primary">{{$t('integralflow_5')}}<Icon type="ios-arrow-down"></Icon>
					</Button>
				</a>
				<DropdownMenu slot="list">
					<DropdownItem name="1">{{$t('integralflow_6')}}</DropdownItem>
					<DropdownItem name="2">{{$t('integralflow_4')}}</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</div>

		<course-time-list
			ref="courseTimeList"
			:fromSignIn="false"
			from="teacher"
			:needCheckbox="true"
			:showTableDetail="showTableDetail"
			:lists="lists"
			:isCurrent="true"
			@changeSingle="changeSingle"
            @goDetail="goDetail"
			@changeData="changeData"
		></course-time-list>

		<div class="page-box">
			<Page
				:current="pageNo"
				:total="count"
				show-elevator
				show-total
				:page-size="pageSize"
				@on-change="pageChange"
				@on-page-size-change="sizeChange"
			></Page>
		</div>
		<Modal v-model="modal3" width="400" class="exportIng" :closable="false" :mask-closable="false">
			<div>
				<div class="ivu-modal-confirm">
					<div class="ivu-modal-confirm-head">
						<div class="ivu-modal-confirm-head-icon ivu-modal-confirm-head-icon-info">
								<i class="ivu-icon ivu-icon-ios-information-circle"></i>
						</div>
						<div class="ivu-modal-confirm-head-title">{{$t('modules_spoc_crm_web_src_views_activityenrollment_index_761')}}</div>
					</div>
					<div class="ivu-modal-confirm-body">
						<div>{{$t('modules_spoc_crm_web_src_views_activityenrollment_index_762')}}</div>
					</div>
				</div>
			</div>
		</Modal>
	</div>
</template>

<script>
import search from "../../modules/search";
import courseTimeList from "./components/courseTimeList";
import valid, { errors, sys, jwTeacherSchedule } from "../../libs/request";
import { mapMutations, mapState } from "vuex";
import util from "@public/libs/js/util";

const ONE_DAY = 24 * 60 * 60 * 1000;

export default {
	name: "jw.schoolTimetableTeacher",
	data() {
		return {
			modal3: false,
			date: "",
			isCurrent: true,
			lists: [],
			exportIds: [],
			startTime: "",
			endTime: "",
			allocType: "",
			grade: "",
			teacherId: "",
			teacherType: "",
			officeId: "",
			uploadTime: false,
			pageNo: 1, //当前页码
			pageCount: 1, //页码总数
			pageSize: 2, //每页条数
			count: 0, //数据总数
			showTableDetail: !true,
			setStartTimeToDatePickerVal: false
		};
	},
	computed: {
		...mapState(["app", "buttonPerm"]),
        myButtonPrem() {
            return this.buttonPerm ? (this.buttonPerm["jw.schoolTimetableTeacher"] || []) : [];
        },
		datePickerValArr() {
			return [this.startTime, this.endTime];
		}
	},
	components: {
		search,
		courseTimeList
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		initLists(_teacherType, _officeId) {
			// 刚进入的时候，只有 教师类型 ，获取列表
			this.teacherType = _teacherType;
			this.officeId = _officeId;
			this.getLists();
		},
		changeDate(e) {
			if (e && e.length == 2) {
				let isMonday = new Date(e[0]).getDay() == 1;
				let isSunday = new Date(e[1]).getDay() == 0;
				let isOnWeek =
					(new Date(e[1]).getTime() - new Date(e[0]).getTime()) /
						ONE_DAY ==
					6;
				if (!isMonday || !isSunday || !isOnWeek) {
					this.$Message.warning(
						this.$t('modules_spoc_crm_web_src_views_customer360_components_schooltimetable_856')
					);
				}
				this.setStartTimeToDatePickerVal = false;
				// console.log(this.startTime)
				// console.log(this.endTime)
				// 不在当前选择的一周之内，才做操作
				if (
					new Date(e[0]).getTime() <
						new Date(this.startTime).getTime() ||
					new Date(e[0]).getTime() > new Date(this.endTime).getTime()
				) {
					this.uploadTime = true;
					this.$refs.courseTimeList.getDays(e[0]);
					// } else {
					//     console.log('不操作')
				}
			}
		},
		getCurrentLists() {
			this.setStartTimeToDatePickerVal = true;
			this.uploadTime = true;
			this.$refs.courseTimeList.getDays();
		},
		prev() {
			this.setStartTimeToDatePickerVal = true;
			this.uploadTime = true;
			this.$refs.courseTimeList.getDays("prev");
		},
		next() {
			this.setStartTimeToDatePickerVal = true;
			this.uploadTime = true;
			this.$refs.courseTimeList.getDays("next");
		},
		uploadLists(_params) {
			this.pageNo = 1;
			this.allocType = _params.allocType;
			this.grade = _params.grade;
			this.teacherId = _params.teacherId;
			this.teacherType = _params.teacherType;
			this.officeId = _params.officeId;
			this.getLists();
		},
		pageChange(page) {
			this.pageNo = page;
			this.getLists();
		},
		sizeChange(size) {
			this.pageSize = size;
			this.getLists();
		},
		getLists() {
			// 获取数据
			this.updateLoadingStatus({
				isLoading: true
			});
			let params = {
				pageNo: this.pageNo,
				pageSize: this.pageSize,
				allocType: this.allocType,
				endTime: this.endTime,
				grade: this.grade,
				startTime: this.startTime,
				teacherId: this.teacherId,
				teacherType: this.teacherType,
				officeId: this.officeId
			};
			jwTeacherSchedule
				.listTeacherSchedule(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let _data = res.data.data;
						this.lists = _data.list;
						this.pageCount = _data.pages;
						this.count = _data.total;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});
		},
		changeData(_firstDate, _endDate, _isCurrent) {
			this.startTime = _firstDate;
			this.endTime = _endDate;
			this.date = `${_firstDate} ~ ${_endDate}`;
			this.isCurrent = _isCurrent >= 0 ? true : false;
			if (this.setStartTimeToDatePickerVal)
				this.datePickerVal = _firstDate;
			if (this.uploadTime) this.getLists();
		},
		changeSingle(_val, _id) {
			if (_val) this.exportIds.push(_id);
			else {
				let _index = this.exportIds.indexOf(_id);
				if (_index > -1) {
					this.exportIds.splice(_index, 1);
				}
			}
			// console.log(this.exportIds)
		},
		exportTpl(name) {
			let params = {
				allocType: this.allocType,
				endTime: this.endTime,
				grade: this.grade,
				startTime: this.startTime,
				teacherId: this.teacherId,
				teacherType: this.teacherType,
				officeId: this.officeId
			};
			if (name == "1") {
				// 导出所选
				if (this.exportIds.length == 0) {
					this.$Message.error(this.$t('modules_spoc_jw_web_src_views_schooltimetable_class_3035'));
					return;
				} else params.teacherId = this.exportIds.join();
				// }else{
				// 导出全部
			}
			// console.log(params)
			this.exportTeacherSchedule(params);
		},
		exportTeacherSchedule(_params) {
			// 执行导出
			this.modal3 = true
			jwTeacherSchedule
				.exportTeacherSchedule(_params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						util.blobDownload(res);
					}
				})
				.catch(errors.call(this)).finally(()=>{
					setTimeout(()=>{
						this.modal3 = false
					},1000)
				});
        },
        goDetail(item) {
			// console.log(item, this.myButtonPrem)
			if(this.myButtonPrem && this.myButtonPrem.indexOf('details') >-1) {
				if (item && item.detail && item.detail.id) {
					this.$router.push({
						name: "jw.signinDetail",
						query: {
							lessonId: item.detail.id
							// status: item.attendanceStatus
						}
					});
				}
			}
		},
	}
};
</script>