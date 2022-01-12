<style lang="less">
.to-score-container {
	.ivu-modal-header {
		padding: 17px 24px 16px !important;
		background: #f7f8fa;
		border-radius: 4px;
		.ivu-modal-header-inner {
			font-size: 18px;
			font-weight: 500;
			color: rgba(0, 0, 0, 0.85);
		}
	}
	.ivu-modal-body {
		padding: 0px !important;
	}
	.ivu-modal-footer {
		padding: 10px 24px 10px 18px;
	}
	.ivu-select-input {
		cursor: text !important;
	}
	.my-table {
		padding: 0 24px 24px 24px;
		.no-class {
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: flex-start;
			.no-class-content {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				padding: 30px 0;
				img {
					width: 160px;
					height: auto;
				}
				p {
					margin-top: 20px;
					color: #000;
					font-size: 18px;
				}
			}
		}
	}
	.approval {
		position: relative;
		color: #495060;
		padding-left: 12px;
		&::before {
			position: absolute;
			display: block;
			content: "";
			width: 4px;
			height: 4px;
			border-radius: 50%;
			left: 0;
			top: 4px;
		}
	}
	.approval-1 {
		.approval;
		&::before {
			background: #ff6666;
		}
	}
	.approval-2 {
		.approval;
		&::before {
			background: #44bcb7;
		}
	}
	.v-search-collapse-container {
		padding-left: 24px;
	}
}
</style>

<template>
	<div>
		<Modal
			class="to-score-container"
			width="1000"
			v-model="showModel"
			:title="$t('mycourse_mycourse_369')"
			:mask-closable="false"
			@on-cancel="scoreCancel"
		>
			<vSearchCollapse @search="searchInfo" @reset="resetSearch">
				<Select
					:placeholder="$t('courselist_courselist_225')"
					v-model="searchBox.selectCompus"
					@on-change="changeCenter"
					style="width:190px;margin-right:12px;"
				>
					<Option
						v-for="item in searchBox.selectCompusList"
						:value="item.id"
						:key="item.id"
					>{{item.code}}{{item.name }}</Option>
				</Select>
				<Select
					v-model="className"
					filterable
					clearable
					:placeholder="$t('mycourse_scoreexchage_413')"
					@on-change="getClassId"
					@on-clear="clearClassName"
					style="width: 190px;margin-right:12px;"
				>
					<Option v-for="item in classNameList" :value="item.id" :key="item.id">{{ item.name }}</Option>
				</Select>
				<Select
					:placeholder="$t('mycourse_scoreexchage_414')"
					:disabled="!className"
					v-model="lesson"
					clearable
					@on-change="getStudnetList"
					@on-clear="clearLesson"
					style="width:140px;margin-right:12px;"
				>
					<Option v-for="item in lessonList" :value="item.id" :key="item.id">{{ item.name }}</Option>
				</Select>
				<Select
					ref="studnetSel"
					:disabled="!lesson"
					:placeholder="$t('mycourse_scoreexchage_415')"
					v-model="stuName"
					clearable
					style="width:140px;margin-right:12px;"
				>
					<Option
						v-for="item in studentList"
						:value="item.id"
						:key="item.id"
					>{{ $i18n.locale == 'zh-CN' ? item.name : item.enName }}</Option>
				</Select>
				<!-- <Input v-model="stuName"  :disabled="data.length < 1" :placeholder="$t('mycourse_scoreexchage_415')" @on-keyup="getNewList(stuName)" style="width: 200px;margin-right:12px;" /> -->
			</vSearchCollapse>
			<div class="my-table" v-if="studentListForTable.length > 0">
				<Table
					:highlight-row="true"
					@on-row-click="clickItemRow"
					height="300"
                    border
					:columns="col"
					:data="studentListForTable"
				></Table>
			</div>
			<div class="my-table" v-else>
				<div class="no-class">
					<div class="no-class-content">
						<img src="../../assets/img/no-stu-class.png" />
						<p>{{$t('mycourse_mycourse_415')}}</p>
					</div>
				</div>
			</div>
			<div slot="footer">
				<Button @click="scoreCancel">{{$t('classroom_allscore_53')}}</Button>
				<Button type="primary" @click="scoreOK">{{$t('mycourse_toscore_432')}}</Button>
			</div>
		</Modal>
		<score ref="score" :stuList="stuList" @getfaList="searchInfo"></score>
	</div>
</template>

<script>
import score from "../classRoom/score";
import vSearchCollapse from "@public/modules/vSearchCollapse";
import valid, {
	errors,
	jxClassCourse,
	jxLesson,
	sysUser,
	jxLessonStudentRel
} from "../../libs/request";
import { mapMutations, mapState } from "vuex";
import { waitUntil } from "@public/libs/util";

export default {
	props: {},
	data() {
		return {
			searchBox: {
				selectCompus: "",
				selectCompusList: []
			},
			showModel: false,
			className: "",
			classNameList: [],
			lesson: "",
			lessonList: [],
			stuName: "",
			col: [
				{
					title: this.$t("mycourse_scoreexchage_418"),
                    width:null,
                    resizable:true,
					key: "name"
				},
				{
					title: this.$t("classlist_compontents_detailinfo_36"),
                    width:null,
                    resizable:true,
					key: "enName"
				},
				{
					title: this.$t("classlist_compontents_detailinfo_37"),
                    width:null,
                    resizable:true,
					key: "phone"
				},
				{
					title: this.$t("mycourse_scoreexchage_421"),
                    width:null,
                    resizable:true,
					key: "status",
					render: (h, params) => {
						return h(
							"span",
							{
								class:
									params.row.jxLessonStudentRel.jxAttendance
										.status === "present"
										? "approval-2"
										: params.row.jxLessonStudentRel
												.jxAttendance.status ===
										  "absent"
										? "approval-1"
										: ""
							},
							params.row.jxLessonStudentRel.jxAttendance
								.status === "present"
								? this.$t("mycourse_scoreexchage_422")
								: params.row.jxLessonStudentRel.jxAttendance
										.status === "absent"
								? this.$t("mycourse_scoreexchage_423")
								: ""
						);
					}
				}
			],
			studentList: [],
			studentListForTable: [],
			params: {},
			currentRow: null,
			stuList: [],
			currentRowObj: {}
		};
	},
	components: {
		vSearchCollapse,
		score
	},

	computed: {
		...mapState(["userInfo", "app"])
	},

	mounted() {
		this.getCompassFn();
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		//切换校区，获取班课
		changeCenter(val) {
			this.className = "";
			this.classNameList = [];
			this.clearClassName();
			this.findClassIdNameByClassNameFn("");
		},
		//获取校区
		getCompassFn() {
			sysUser
				.dataScopeFilter()
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let data = res.data.data;
						this.searchBox.selectCompusList = data;
						// console.log(data)
						waitUntil(
							() => {
								// console.log("this.app.currOfficeId ==" + this.app.currOfficeId)
                                if (this.app.currOfficeId == 'all') {
                                    this.$set(
                                        this.searchBox,
                                        "selectCompus",
                                        this.userInfo.officeId
                                    );
                                }else{
                                    this.$set(
                                        this.searchBox,
                                        "selectCompus",
                                        this.app.currOfficeId
                                    );
                                }
								return this.app.currOfficeId || false;
							},
							() => {
								this.findClassIdNameByClassNameFn("");
							}
						);
					}
				})
				.catch(errors.call(this));
		},
		//根据校区，获取班课
		findClassIdNameByClassNameFn(query) {
			let params = {
				className: query,
				officeId: this.searchBox.selectCompus
			};
			jxClassCourse
				.findClassIdNameByClassName(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.classNameList = res.data.data;
					}
				})
				.catch(errors.call(this));
		},
		//根据班课获取课次
		getClassId(id) {
			if (id) {
				let params = {
					classId: id
				};
				jxLesson
					.findLessonIdNameByClassId(params)
					.then(valid.call(this))
					.then(res => {
						if (res.ok) {
							this.lessonList = res.data.data;
						}
					})
					.catch(errors.call(this));
			}
		},
		//清除班课
		clearClassName() {
			this.lessonList = [];
			this.lesson = "";
			this.studentList = [];
			this.stuName = "";
			this.studentListForTable = [];
			this.currentRow = null;
			this.currentRowObj = {};
			// this.$refs.lesson.clearSingleSelect();
		},
		//清除课次
		clearLesson() {
			this.studentList = [];
			this.stuName = "";
			this.studentListForTable = [];
			this.currentRow = null;
			this.currentRowObj = {};
		},
		//切换课次，获取课次学生
		getStudnetList(val) {
			if (val) {
				this.updateLoadingStatus({ isLoading: true });
				this.clearLesson();
				jxLessonStudentRel
					.getLessonDetailInfo({
						id: val
					})
					.then(valid.call(this))
					.then(res => {
						if (res.ok) {
							this.studentList = [].concat(
								res.data.data.studentList
							);
							this.studentListForTable =
								res.data.data.studentList;
							this.currentRow = null;
							this.currentRowObj = {};
						}
					})
					.catch(errors.call(this))
					.finally(() => {
						this.updateLoadingStatus({ isLoading: false });
					});
			}
		},
		clickItemRow(row, index) {
			this.currentRow = index;
			this.currentRowObj = row;
			this.stuList = [row];
		},
		searchInfo(isScore) {
			if (this.lesson == "" || this.lesson === undefined) {
				this.$Message.warning(this.$t("mycourse_scoreexchage_424"));
				this.studentList = [];
				this.studentListForTable = [];
				this.currentRow = null;
				this.currentRowObj = {};
			} else {
				this.currentRow = null;
				this.currentRowObj = {};
				if (this.stuName) {
					this.studentListForTable = this.studentList.filter(item => {
						return item.id == this.stuName;
					});
				} else {
					this.studentListForTable = [].concat(this.studentList);
				}
			}
			if(isScore){ //如果是打分成功后返回，则刷新列表
				this.getStudnetList(this.lesson)
			}
		},
		resetSearch() {
			this.className = "";
			this.classNameList = [];
			this.lesson = "";
			this.lessonList = [];
			this.stuName = "";
			this.studentList = [];
			this.studentListForTable = [];
			this.currentRow = null;
			this.currentRowObj = {};
            if (this.app.currOfficeId == 'all') {
                this.$set(
                    this.searchBox,
                    "selectCompus",
                    this.userInfo.officeId
                );
            }else{
                this.$set(
                    this.searchBox,
                    "selectCompus",
                    this.app.currOfficeId
                );
            }
			this.findClassIdNameByClassNameFn("");
		},
		show() {
			this.showModel = true;
		},
		scoreCancel() {
			this.resetSearch();
			this.showModel = false;
			this.currentRowObj = {};
		},
		scoreOK() {
			if (this.currentRowObj.jxLessonStudentRel == undefined) {
				this.$Message.warning(this.$t("mycourse_scoreexchage_425"));
			} else {
				let ifPresent = this.currentRowObj.jxLessonStudentRel
					.jxAttendance.status;
				if (ifPresent == "present") {
					//                    this.showModel = false
					this.$refs.score.show("course");
					//                    this.resetSearch()
				} else {
					this.$Message.warning(this.$t("classroom_choosename_62"));
				}
			}
		}
	},
	watch: {
		"app.currOfficeId": function(val, oldVal) {
			if (oldVal) {
                if (this.app.currOfficeId == 'all') {
                    this.$set(
                        this.searchBox,
                        "selectCompus",
                        this.userInfo.officeId
                    );
                }else{
                    this.$set(
                        this.searchBox,
                        "selectCompus",
                        this.app.currOfficeId
                    );
                }
				this.findClassIdNameByClassNameFn("");
				// this.addActive('A')
			}
		}
	}
};
</script>
