<style lang="less">
.school-timet-table-signin-container {
	position: relative;
	height: 100%;
	div::-webkit-scrollbar {
		width: 6px !important;
	}
}
</style>

<template>
	<div class="school-timet-table-signin-container">
		<search
			:date="date"
			:datePickerVal="date"
			:isCurrent="isCurrent"
			from="signIn"
			@onChangeDate="changeDate"
			@search="uploadLists"
			@getCurrentLists="getCurrentLists"
			@next="next"
			@prev="prev"
		></search>

		<course-time-list
			ref="courseTimeList"
			:fromSignIn="true"
            from="signIn"
			:lists="lists"
			:date="tableDate"
			:pageNo="pageNo"
			:pageCount="pageCount"
			:showStudentLists="showStudentLists"
			@changeShowStudentLists="changeShowStudentLists"
			@goDetail="goDetail"
			@pagePrev="pagePrev"
			@pageNext="pageNext"
		></course-time-list>
	</div>
</template>

<script>
import search from "../../modules/search";
import courseTimeList from "./components/courseTimeList";
import valid, { errors, sys, jwManualSign } from "../../libs/request";
import { mapMutations, mapState } from "vuex";

const ONE_DAY = 24 * 60 * 60 * 1000;

export default {
	name: "jw.schoolTimetableSignIn",
	props: {},
	data() {
		return {
			date: "",
			tableDate: "",
			isCurrent: true,
			lists: [],
			pageNo: 1, //当前页码
			pageCount: 1, //页码总数
			pageSize: 7, //每页条数
			count: 0, //数据总数
			uploadTime: false,
			params: {
				isShowStudent: "0" //是否显示学员列表(0: 不显示 1： 显示)
			},
			showStudentLists: false
		};
	},
	computed: {
		...mapState(["app", "buttonPerm"]),
        myButtonPrem() {
            return this.buttonPerm ? (this.buttonPerm["jw.schoolTimetableSignIn"] || []) : [];
        },
	},
	components: {
		search,
		courseTimeList
	},
	mounted() {
		this.getDays();
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		changeShowStudentLists(val) {
			this.showStudentLists = val;
			if (val) {
				this.getLists();
			}
		},
		getCurrentLists() {
			this.uploadTime = true;
			this.getDays();
		},
		changeDate(e) {
			let toDay = new Date().format("yyyy-MM-dd");
			// console.log(toDay == e)
			this.date = e;
			if (toDay == e) {
				// 今天
				this.isCurrent = true;
			} else {
				this.isCurrent = false;
			}
			this.getLists();
		},
		prev() {
			this.uploadTime = true;
			this.getDays("prev");
		},
		next() {
			this.uploadTime = true;
			this.getDays("next");
		},
		uploadLists(_params) {
			this.params = Object.assign({}, _params);
			this.getLists();
		},
		getDays(str) {
			if (str == "prev") {
				this.date = new Date(
					new Date(this.date).getTime() - ONE_DAY
				).format("yyyy-MM-dd");
				this.isCurrent = false;
			} else if (str == "next") {
				this.date = new Date(
					new Date(this.date).getTime() + ONE_DAY
				).format("yyyy-MM-dd");
				this.isCurrent = false;
			} else {
				this.date = new Date().format("yyyy-MM-dd");
				this.isCurrent = true;
			}
			this.tableDate = new Date(this.date).format("yyyy/MM/dd");
			if (this.uploadTime) this.getLists();
		},
		getLists() {
			// 获取数据
			this.updateLoadingStatus({
				isLoading: true
			});
			let params = Object.assign({}, this.params);
			params.date = this.date;
			params.pageNo = this.pageNo;
			params.pageSize = this.pageSize;
			params.isShowStudent = this.showStudentLists ? "1" : "0";
			// console.log(params)
			jwManualSign
				.listManualSign(params)
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
		goDetail(item) {
			// console.log(item)
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
		pagePrev() {
			// 获取上一页
			this.pageNo--;
			this.getLists();
		},
		pageNext() {
			// 获取下一页
			this.pageNo++;
			this.getLists();
		}
	}
};
</script>