<style lang="less">
.teach_list_box {
	background: #ffffff;
	width: 100%;
	.collapse {
		width: 100%;
		border-bottom: 1px #e6e7eb solid;
		.v-search-collapse-container {
			padding-left: 0;
			padding-top: 16px;
			padding-left: 35px;
			padding-bottom: 4px;
		}
	}
	.teach_list {
		width: 100%;
		/*height: 465px;*/
		position: relative;
		.not_data {
			width: 100%;
			min-height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			padding-bottom: 70px;
			padding-top: 70px;
			.warn {
				font-size: 16px;
				font-weight: 400;
				color: rgba(73, 80, 96, 1);
				line-height: 22px;
				margin-top: 29px;
			}
		}
		.teachs_box {
			width: 100%;
			/*height: 100%;*/
			overflow: hidden;
			/*display: flex;
					justify-content: flex-start;
					align-items: flex-start;*/

			padding-left: 180px;
			.teachs {
				width: 180px;
				height: calc(~"100% + 64px");
				overflow-x: hidden;
				overflow-y: scroll;
				border-right: 1px #e6e7eb solid;
				position: absolute;
				top: 0;
				left: 0;
				right: 180px;
				bottom: 0;
				z-index: 12;
				.active{
					background:#EBFCFB;
				}
				.teachsChild{
					height:60px;
					padding-left: 20px;
					font-size:14px;
					border-bottom: 1px solid #F1F1F1; 
					cursor: pointer;
					.d1{
						padding-top: 9px;
						font-weight: 600;
						color:#495060;
						line-height:21px;
					}
					.d2{
						color:#666666;
						line-height:21px;
					}
				}
			}
			.teachs_info {
				float: right;
				width: 100%;
				/*height: 100%;*/
				overflow: hidden;
				padding: 14px 20px 24px;
				.teachs_info_title {
					strong {
						font-size: 18px;
						font-weight: 500;
						color: rgba(73, 80, 96, 1);
						line-height: 25px;
						padding-right: 20px;
					}
					> span {
						font-size: 14px;
						font-weight: 400;
						color: rgba(155, 155, 155, 1);
						line-height: 20px;
						padding-right: 16px;
					}
					button {
						float: right;
						span {
							padding: 0;
						}
					}
				}
				.teachs_info_box {
					padding-top: 30px;
					.ivu-row {
						margin-bottom: 20px;
					}
					.version_wrap {
						display: flex;
						align-items: center;
						justify-content: center;
						.version_box {
							height: 32px;
							background: rgba(240, 242, 245, 1);
							border-radius: 4px;
							display: flex;
							align-items: center;
							justify-content: flex-start;
							padding: 5px 20px;
							.dot {
								width: 4px;
								height: 4px;
								background: rgba(153, 153, 153, 1);
								border-radius: 2px;
								margin-right: 4px;
							}
							.cont {
								font-size: 16px;
								font-weight: 500;
								color: rgba(153, 153, 153, 1);
								line-height: 22px;
							}
						}
					}
					.info_wrap {
						display: flex;
						justify-content: flex-start;
						align-items: flex-start;
						.info_tit {
							width: 140px;
							font-size: 14px;
							font-weight: normal;
							color: rgba(153, 153, 153, 1);
							line-height: 21px;
							text-align: right;
							padding-right: 10px;
						}
						.info_cont {
							flex: 1;
							font-size: 14px;
							font-weight: 400;
							color: rgba(73, 80, 96, 1);
							line-height: 20px;
						}
					}
				}
			}
		}
	}
}
</style>

<template>
	<div class="teach_list_box">
		<div class="collapse">
			<v-search-collapse @search="getListData" @reset="resetSearch">
				<Input v-model="gradeName" :placeholder="$t('teachpush_teachlist_626')" style="width: 224px" />
				<Select
					:placeholder="$t('courselist_courselist_223')"
					@on-change="selectCourse(courseType)"
					@on-clear="clearCourse"
					v-model="courseType"
					:max-tag-count="2"
					style="width:140px;margin-right:12px;"
				>
					<Option v-for="item in courseTypeList" :value="item.value" :key="item.id">{{ item.label }}</Option>
				</Select>
				<Select
					v-model="courseGrade"
					clearable
					:placeholder="$t('teachpush_teachlist_628')"
					@on-change="getValidLesson"
					@on-clear="clearGrade"
					style="width:140px"
				>
					<Option v-for="item in courseGradeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				<Select
					v-model="lesson"
					clearable
					filterable
					:placeholder="$t('classlist_classlist_7')"
					style="width:140px"
				>
					<Option v-for="item in lessonList" :value="item" :key="item">{{ item }}</Option>
				</Select>
			</v-search-collapse>
		</div>
		<div class="teach_list">
			<div class="not_data" v-if="sendPageList && sendPageList.length < 1">
				<img src="../../assets/img/notData.png" width="154" />
				<p class="warn">{{$t('teachpush_teachlist_629')}}</p>
			</div>
			<div class="teachs_box" v-else>
				<div class="teachs" v-if="!noData">
					<div
						class="teachsChild"
						:class="{'active' : selectedId == item.id}"
						v-for="(item, index) in sendPageList"
						:key="index"
						@click="getSendPageDetail(item.id)"
					>
						<div class="d1">
							{{item.no}}
						</div>
						<div class="d2">
							{{item.courseType}}-{{item.courseGrade}}-{{item.lesson}}
						</div>
					</div>
				</div>
				<div class="teachs_info" v-if="!noData">
					<div class="teachs_info_title">
						<strong>{{sendPageDetail.lesson}}</strong>
						<span>{{$t('teachpush_teachlist_630', [sendPageDetail.createByName])}}</span>
						<span>{{$t('teachpush_teachlist_631', [this.formatTime(new Date(sendPageDetail.createDate).getTime())])}}</span>
						<Button @click="editFn" v-if="!isEdit">{{$t('classroom_allscore_51')}}</Button>
					</div>
					<div class="teachs_info_box">
						<Row>
							<Col span="12">
								<div class="version_wrap">
									<div class="version_box">
										<span class="dot"></span>
										<span class="cont">English Version</span>
									</div>
								</div>
							</Col>
							<Col span="12">
								<div class="version_wrap">
									<div class="version_box">
										<span class="dot"></span>
										<span class="cont">{{$t('mycourse_viewstucontent_458')}}</span>
									</div>
								</div>
							</Col>
						</Row>
						<Row>
							<Col span="12">
								<div class="info_wrap">
									<div class="info_tit">Course Materials：</div>
									<div class="info_cont">
										<Input
											:autosize="{minRows: 3,maxRows: 3}"
											@keyup.native="setLimit(1000,sendPageDetail.courseMaterialsEn,'sendPageDetail.courseMaterialsEn',0)"
											@on-blur="clearSpace(sendPageDetail.courseMaterialsEn,'sendPageDetail.courseMaterialsEn')"
											placeholder="Please input the information of Course Materials(Limit to 1000 characters or less)"
											v-model="sendPageDetail.courseMaterialsEn"
											type="textarea"
											:maxlength="1000"
											v-if="isEdit"
										/>
										<span v-else>{{sendPageDetail.courseMaterialsEn}}</span>
									</div>
								</div>
							</Col>
							<Col span="12">
								<div class="info_wrap">
									<div class="info_tit">{{$t('mycourse_viewstucontent_448')}}</div>
									<div class="info_cont">
										<Input
											:autosize="{minRows: 3,maxRows: 3}"
											@on-blur="clearSpace(sendPageDetail.courseMaterials,'sendPageDetail.courseMaterials')"
											@keyup.native="setLimit(1000,sendPageDetail.courseMaterials,'sendPageDetail.courseMaterials',1)"
											:placeholder="$t('pushsettings_index_511')"
											v-model="sendPageDetail.courseMaterials"
											type="textarea"
											:maxlength="1000"
											v-if="isEdit"
										/>
										<span v-else>{{sendPageDetail.courseMaterials}}</span>
									</div>
								</div>
							</Col>
						</Row>
						<Row>
							<Col span="12">
								<div class="info_wrap">
									<div class="info_tit">Target Objectives：</div>
									<div class="info_cont">
										<Input
											:autosize="{minRows: 3,maxRows: 3}"
											@on-blur="clearSpace(sendPageDetail.targetObjectivesEn,'sendPageDetail.targetObjectivesEn')"
											@keyup.native="setLimit(1000,sendPageDetail.targetObjectivesEn,'sendPageDetail.targetObjectivesEn',0)"
											placeholder="Please input the information of Target Objectives(Limit to 1000 characters or less)"
											v-model="sendPageDetail.targetObjectivesEn"
											type="textarea"
											:maxlength="1000"
											v-if="isEdit"
										/>
										<span v-else>{{sendPageDetail.targetObjectivesEn}}</span>
									</div>
								</div>
							</Col>
							<Col span="12">
								<div class="info_wrap">
									<div class="info_tit">{{$t('teachpush_teachlist_636')}}</div>
									<div class="info_cont">
										<Input
											:autosize="{minRows: 3,maxRows: 3}"
											@on-blur="clearSpace(sendPageDetail.targetObjectives,'sendPageDetail.targetObjectives')"
											@keyup.native="setLimit(1000,sendPageDetail.targetObjectives,'sendPageDetail.targetObjectives',1)"
											:placeholder="$t('pushsettings_index_513')"
											v-model="sendPageDetail.targetObjectives"
											type="textarea"
											:maxlength="1000"
											v-if="isEdit"
										/>
										<span v-else>{{sendPageDetail.targetObjectives}}</span>
									</div>
								</div>
							</Col>
						</Row>
						<Row>
							<Col span="12">
								<div class="info_wrap">
									<div class="info_tit">Classwork：</div>
									<div class="info_cont">
										<Input
											:autosize="{minRows: 3,maxRows: 3}"
											@on-blur="clearSpace(sendPageDetail.classworkEn,'sendPageDetail.classworkEn')"
											@keyup.native="setLimit(1000,sendPageDetail.classworkEn,'sendPageDetail.classworkEn',0)"
											placeholder="Please input the information of ClassWork(Limit to 1000 characters or less)"
											v-model="sendPageDetail.classworkEn"
											type="textarea"
											:maxlength="1000"
											v-if="isEdit"
										/>
										<span v-else>{{sendPageDetail.classworkEn}}</span>
									</div>
								</div>
							</Col>
							<Col span="12">
								<div class="info_wrap">
									<div class="info_tit">{{$t('mycourse_viewstucontent_450')}}</div>
									<div class="info_cont">
										<Input
											:autosize="{minRows: 3,maxRows: 3}"
											@on-blur="clearSpace(sendPageDetail.classwork,'sendPageDetail.classwork')"
											@keyup.native="setLimit(1000,sendPageDetail.classwork,'sendPageDetail.classwork',1)"
											:placeholder="$t('pushsettings_index_515')"
											v-model="sendPageDetail.classwork"
											type="textarea"
											:maxlength="1000"
											v-if="isEdit"
										/>
										<span v-else>{{sendPageDetail.classwork}}</span>
									</div>
								</div>
							</Col>
						</Row>
						<Row>
							<Col span="12">
								<div class="info_wrap">
									<div class="info_tit">Homework：</div>
									<div class="info_cont">
										<Input
											:autosize="{minRows: 3,maxRows: 3}"
											@on-blur="clearSpace(sendPageDetail.homeworkEn,'sendPageDetail.homeworkEn')"
											@keyup.native="setLimit(1000,sendPageDetail.homeworkEn,'sendPageDetail.homeworkEn',0)"
											placeholder="Please input the information of HomeWork(Limit to 1000 characters or less)"
											v-model="sendPageDetail.homeworkEn"
											type="textarea"
											:maxlength="1000"
											v-if="isEdit"
										/>
										<span v-else>{{sendPageDetail.homeworkEn}}</span>
									</div>
								</div>
							</Col>
							<Col span="12">
								<div class="info_wrap">
									<div class="info_tit">{{$t('mycourse_viewstucontent_451')}}</div>
									<div class="info_cont">
										<Input
											:autosize="{minRows: 3,maxRows: 3}"
											@on-blur="clearSpace(sendPageDetail.homework,'sendPageDetail.homework')"
											@keyup.native="setLimit(1000,sendPageDetail.homework,'sendPageDetail.homework',1)"
											:placeholder="$t('pushsettings_index_515')"
											v-model="sendPageDetail.homework"
											type="textarea"
											:maxlength="1000"
											v-if="isEdit"
										/>
										<span v-else>{{sendPageDetail.homework}}</span>
									</div>
								</div>
							</Col>
						</Row>
					</div>
				</div>
			</div>
		</div>
		<!--<div class="teach_list" v-else>-->
		<!--<div><img src="../../assets/img/notData.png" alt=""></div>-->
		<!--<div>{{$t('teachpush_teachlist_629')}}</div>-->
		<!--</div>-->
	</div>
</template>

<script>
import vSearchCollapse from "@public/modules/vSearchCollapse.vue";
import { mapMutations } from "vuex";
import valid, {
	errors,
	sysUser,
	jxCourseTpl,
	jxLessonAudit,
	sysDict
} from "../../libs/request";
export default {
	props: {
        isReject:{
            type:Boolean,
            required: true
        },
        isSaved:{
            type:Boolean,
            required: true
        },
		classCourseData: {
			type: Object
		},
		sendPageDetailProp: {
			type: Object
		}
	},
	mounted() {
		this.getBelongCourseType();
		//			this.listSendPage()
        // console.log(this.isReject)
		if (this.isSaved || this.isReject) {
			this.sendPageDetail = this.sendPageDetailProp;
			this.selectedId = this.sendPageDetailProp.id;
		}
	},
	data() {
		return {
			isEdit: false,
			gradeName: "",
			courseType: "",
			courseTypeList: "",
			gradeArr: [],
			courseGrade: "",
			lesson: null,
			courseGradeList: "",
			sendPageList: null,
			selectedId: "",
			sendPageDetail: {},
			types: "",
			grade: "",
			course: "",
			editId: "",
			params: {},
			noData: false,
			open: true,
			lessonList: [],
            isSave:false,
		};
	},
	components: {
		vSearchCollapse
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
        /*shangeSaveStauts(obj){
		    console.log(111,this.isEdit)
            this.isSave = obj.isSave
        },*/
		getClassParams(key) {
			this.listSendPage(key);
		},
		setLimit(limit, val, obj, lang) {
			//			    console.log(lang)
			if (!lang) {
				let a = obj.split(".")[0];
				let b = obj.split(".")[1];
				//                    let value = val.replace(/^\s$/g,'')
				this[a][b] = val.replace(
					/[^A-Za-z0-9,.?：\/、\\;:\(\)!'"@#\^\$\&\*-=\+\[\]《》_\>\<%\s ]/g,
					""
				);
				if (val.length == limit) {
					this[a][b] = val.replace(
						/[^A-Za-z0-9,.?：\/、\\;:\(\)!'"@#\^\$\&\*-=\+\[\]《》_\>\<%\s ]/g,
						""
					);
					if (this.open) {
						this.open = false;
						this.$Message.warning({
							top: 50,
							duration: 3,
							content: "Limit to" + limit + "characters or less"
						});
						setTimeout(() => {
							this.open = true;
						}, 2000);
					}
				}
			} else {
				if (val.length == limit) {
					if (this.open) {
						this.open = false;
						this.$Message.warning({
							top: 50,
							duration: 3,
							content:
								this.$t("startemplate_index_598") +
								limit +
								this.$t("startemplate_index_599")
						});
						setTimeout(() => {
							this.open = true;
						}, 2000);
					}
				}
			}
		},
		clearSpace(val, obj) {
			let a = obj.split(".")[0];
			let b = obj.split(".")[1];
			let str = val;
			str = str.replace(/\s+/g, "");
			if (str.length < 1) {
				this[a][b] = "";
			}
		},
		clearCourse() {
			this.courseGrade = "";
			this.lesson = "";
			this.courseGradeList = [];
			this.lessonList = [];
		},
		clearGrade() {
			this.lesson = "";
			this.lessonList = [];
		},
		getBelongCourseType() {
			let type = "jw_course_type"; //,jw_course_grade' //课程包分类,适用年级
			sysDict
				.batchListData({
					type
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.courseTypeList = res.data.data.jw_course_type;
						//                        console.log(this.courseTypeList)
					}
				})
				.catch(errors.call(this))
				.finally(() => {
				});
			sysDict
				.findChildDictByParentDict({
					type
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.gradeArr = res.data.data;
						this.getClassParams("0");
					}
				})
				.catch(errors.call(this))
				.finally(() => {
				});
		},
		selectCourse(type) {
			//                console.log(type)
			//                console.log(this.gradeArr)
			this.courseGradeList = this.gradeArr.filter(item => {
				return item.type == type;
			});
			this.clearGrade()
			//                console.log(this.courseGradeList)
		},
		getValidLesson(val,isChange){
			if(!this.courseType || !val){
				return
			}
			if(!isChange){
				this.lesson = "";
				this.updateLoadingStatus({ isLoading: true });
			}
			jxCourseTpl.validLesson({
			// jxCourseTpl.optionalLesson({
					courseType: this.courseType,
					courseGrade: val
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.lessonList = res.data.data
						// console.log(this.lesson)
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					if(!isChange){
						this.updateLoadingStatus({ isLoading: false });
					}
				});
		},
		formatTime(time) {
			if (!isNaN(time)) {
				let times = new Date(time).format("yyyy-MM-dd hh:mm:ss");
				return times;
			}
			return "-";
		},
		setEdit() {
			this.isEdit = false;
		},
		editFn() {
			this.isEdit = true;
            // this.sendPageDetail = this.sendPageDetailProp;
            // this.selectedId = this.sendPageDetailProp.id;
			this.$emit("if-edit", true);
		},
		getSendPageDetail(id) {
			// console.log(id)
			this.updateLoadingStatus({ isLoading: true });
			this.selectedId = id;
			jxCourseTpl
				.form({
					id
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
					    // console.log(res.data.data)
						let result = res.data.data;
						this.sendPageDetail = result;
						this.editId = result.id;
						this.types = result.courseType;
						this.grade = result.courseGrade;
						this.course = result.lesson;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		saveSendPageDetail() {
			this.isEdit = false;
			this.$emit("if-edit", false);
			this.isSave = true
            this.$emit("if-save", {isSave:true,obj:this.sendPageDetail});
        },
		listSendPage(key) {
		    console.log('listSendPage---'+key)
			this.updateLoadingStatus({ isLoading: true });
			this.sendPageList = null;
			this.params = {
				//                    "no":"",
				//                    "courseType":"",
				//                    "courseGrade":"",
				pageNumber: "1",
				pageSize: "20"
			};

			this.params.no = this.gradeName;
			if (key == "0") {
				this.courseType = this.classCourseData.courseType;
				this.selectCourse(this.courseType);
				this.courseGrade = this.classCourseData.courseGrade;
				this.lesson = Number(this.classCourseData.curLesson);
				this.getValidLesson(this.courseGrade,true)
			}
			if (key == "1") {
				this.lesson = "";
			}
			if (key == "2") {
				this.courseGrade = "";
				this.lesson = "";
			}

			this.params.courseType = this.courseType;
			this.params.courseGrade = this.courseGrade;
			this.params.lesson = this.lesson;
			//                console.log(this.params)
			jxCourseTpl
				.listSendPage(this.params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let result = res.data.data;
						//						console.log(result)
						this.sendPageList = result;
						let len = this.sendPageList.length;

						if (key == "0") {
							if (len < 1) {
								this.getClassParams("1");
							} else {
								this.updateLoadingStatus({ isLoading: false });
								this.noData = false;
								this.$emit("no-data", false);
							}
						}
						if (key == "1") {
							if (len < 1) {
								this.getClassParams("2");
							} else {
								this.updateLoadingStatus({ isLoading: false });
								this.noData = false;
								this.$emit("no-data", false);
							}
						}
						if (key == "2") {
							if (len < 1) {
								this.getClassParams("3");
							} else {
								this.updateLoadingStatus({ isLoading: false });
								this.noData = false;
								this.$emit("no-data", false);
							}
						}
						if(!key || key == "3"){
							this.updateLoadingStatus({ isLoading: false });
							if (this.sendPageList.length < 1) {
								this.noData = true;
								this.$emit("no-data", true);
							} else {
								this.noData = false;
								this.$emit("no-data", false);
							}
						}
						// console.log(this.isSaved)
						if (this.sendPageList[0] && !this.isSaved && !this.isReject) {
							this.selectedId = this.sendPageList[0].id;
							this.getSendPageDetail(this.selectedId);
						}
					}
				})
				.catch(()=>{
					errors.call(this)
					this.updateLoadingStatus({ isLoading: false });
				})
				.finally(() => {
					
				});
		},
		getListData() {
			this.listSendPage();
		},
		resetSearch() {
			this.gradeName = "";
			this.courseType = "";
			this.courseGrade = "";
			this.lesson = "";
			this.listSendPage();
		}
	},
    watch:{
        sendPageDetailProp(){
            if (this.isSaved || this.isReject) {
                this.sendPageDetail = this.sendPageDetailProp;
                this.selectedId = this.sendPageDetailProp.id;
            }
        }
    },
};
</script>