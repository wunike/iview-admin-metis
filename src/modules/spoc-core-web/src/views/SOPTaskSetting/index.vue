<style lang="less">
.sop-list-container {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: stretch;

	.right {
		transition: all 0.3s;
		transform-origin: center;
		transform: rotate(-180deg);
		font-size: 15px;
		margin-right: 5px;
	}
	.down {
		transition: all 0.3s;
		transform-origin: center;
		transform: rotate(-90deg);
		font-size: 15px;
		margin-right: 5px;
	}
	.up {
		transition: all 0.3s;
		transform-origin: center;
		transform: rotate(90deg);
		font-size: 15px;
		margin-right: 5px;
	}
	.course-temp {
		width: 200px;
		background: #fff;
		border-radius: 4px;
		margin-right: 8px;
		padding-top: 4px;
		overflow-y: scroll;
		overflow-x: hidden;
		.cb-item {
			padding-left: 20px;
			height: 32px;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			cursor: pointer;
			.ivu-poptip {
				height: 32px;
			}
			> span {
				display: inline-block;
				/*height:32px;*/
				margin-left: 8px;
				color: #495060;
				font-size: 14px;
			}
			img {
				margin-left: 3px;
				height: 24px;
				width: 24px;
			}
		}
		.active {
			background: #e3f2fd;
		}
	}
	.class-feedback {
		height: auto;
		width: calc(~"100% - 208px");
		background: #fff;
		border-radius: 4px;
		padding: 0 16px;
		overflow-y: auto;
		.class-fd-header {
			height: 48px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
			h2 {
				font-size: 16px;
				font-weight: bold;
				color: rgba(73, 80, 96, 1);
				padding-top: 20px;
				padding-bottom: 12px;
				padding-left: 32px;
			}
		}
		.table-header {
			width: 100%;
			height: 50px;
			background: rgba(250, 250, 250, 1);
			border-bottom: 1px solid #e6e7eb;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			.expand {
				width: 16px;
				height: 100%;
				margin-left: 10px;
				display: flex;
				align-items: center;
				padding-right: 44px;
			}
			.th-1 {
				width: calc(~"(100% - 220px) / 5");
				font-size: 12px;
				font-weight: 500;
				color: rgba(73, 80, 96, 1);
			}
			.spec-item {
				width: 205px;
				font-size: 12px;
				font-weight: 500;
				color: rgba(73, 80, 96, 1);
			}
		}
		.table-body {
			max-height: calc(~"100% - 170px");
			overflow-y: auto;
			.ivu-table-overflowX {
				overflow-x: hidden;
			}
			.ivu-table-wrapper {
				border-top: 1px solid #e2e2e2;
				border-bottom: none;
			}
			/*tr {*/
			/*	td {*/
			/*		background: #fafafa;*/
			/*	}*/
			/*}*/
			.padding48 {
				padding-left: 68px;
			}
			.table-item {
				width: 100%;
				height: 50px;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				.expand {
					padding-left: 16px;
					display: flex;
					align-items: center;
					padding-right: 28px;
					img {
						width: 16px;
						height: auto;
						cursor: pointer;
					}
				}
				.ti-1 {
					width: calc(~"(100% - 220px) / 5");
					height: 50px;
					line-height: 50px;
					font-size: 12px;
					font-weight: 400;
					color: rgba(73, 80, 96, 1);
				}
				.spec-item {
					width: 210px;
					position: relative;
					height: 50px;
					line-height: 50px;
					a {
						margin-right: 16px;
					}
					.si-icon {
						font-size: 18px;
						color: #495060;
						position: absolute;
						right: 10px;
						top: 16px;
						cursor: pointer;
					}
				}
			}
			.button-table {
				border-top: 1px solid #e8e8e8;
				border-bottom: 1px solid #e8e8e8;
			}
			.table-item-content {
				width: 100%;
				border: 1px solid #e8e8e8;
				.sub-table {
					width: 100%;
					height: 50px;
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					align-items: center;
					padding-left: 48px;
					border-bottom: 1px solid #e6e7eb;
					&:nth-last-of-type(1) {
						border-bottom: none;
					}
					.st-1 {
						width: calc(~"(100% - 160px) / 4");
						height: 50px;
						line-height: 50px;
						font-size: 12px;
						font-weight: 400;
						color: rgba(73, 80, 96, 1);
						padding-right: 50px;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						.do-action {
							margin-right: 8px;
							cursor: pointer;
						}
					}
					.spec-item {
						width: 160px;
					}
				}
			}
		}
		.add-button {
			padding-top: 16px;
			padding-bottom: 16px;
			text-align: center;
		}
	}
}
.add-star-container {
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
	.as-item {
		font-size: 14px;
		color: rgba(153, 153, 153, 1);
		> span {
			display: inline-block;
			text-align: right;
			width: 110px;
			font-size: 14px;
			font-weight: normal;
			color: rgba(153, 153, 153, 1);
			margin-right: 10px;
		}
		b {
			font-weight: normal;
			color: #495060;
		}
		.lessonNo{
			width:250px;
		}
	}
}
.new-temp-star-container {
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
		padding: 0;
	}
	.nm-content {
		padding-left: 24px;
		padding-right: 24px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: stretch;
		.nm-item {
			width: 464px;
			border-radius: 4px;
			display: flex;
			flex-direction: column;
			justify-content: center;
		}
		.nmc-header {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			margin-top: 20px;
			margin-bottom: 16px;
			b {
				color: #999;
				font-size: 14px;
				font-weight: 500;
				text-align: center;
				background: rgba(247, 248, 250, 1);
				padding: 5px 16px;
				border-radius: 4px;
			}
			span {
				font-size: 14px;
				font-weight: 900;
				margin-right: 3px;
			}
		}
		.nmc-item {
			background: #fff;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: flex-start;
			span {
				display: inline-block;
				text-align: right;
				width: 80px;
				margin-right: 10px;
				font-size: 14px;
				color: rgba(153, 153, 153, 1);
				padding-top: 10px;
			}
			padding-left: 16px;
			padding-right: 24px;
			padding-bottom: 20px;
		}
	}

}
</style>

<template>
	<div class="sop-list-container">
		<div class="course-temp">
			<div class="cb-item-1" v-for="(item,index) in leftClassCourse" :key="index">
				<div class="cb-item" style="cursor: default">
                    <a><Icon
						style="cursor: pointer"
						size="15"
						type="ios-arrow-back"
						:class="{'down':item.expand,'right':!item.expand}"
						@click.stop="item.expand=!item.expand"
					/></a>
                    <a style="margin-top:-2px;"><Icon size="16" type="md-folder" /></a>
                    <span>{{item.label}}</span>
				</div>
				<div v-if="item.children.length > 0 &&item.expand">
					<div
						class="cb-item"
						:class="{active: item1.label === currentClass}"
						v-for="(item1,index) in item.children"
						@click="clickCourse(item1)"
						:key="index"
					>
						<Poptip
							popper-class="left-pop"
							:transfer="true"
							placement="right"
							trigger="hover"
							:content="item1.label"
						>
							<span
								class="cb-item-content"
								style="margin-left:45px;display:block;width:130px;
        height:32px;line-height: 32px;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;padding-right:10px;"
							>{{item1.label}}</span>
						</Poptip>
						<!--<span style="margin-left:45px;">{{item1.label}}</span>-->
					</div>
				</div>
			</div>
		</div>
		<div class="class-feedback">
			<div class="class-fd-header">
				<h2>{{$t('core.sopTaskSetting')}}</h2>
                <div><Checkbox @on-change="changeShowMoreValue" v-model="showMoreValue">{{$t('modules_spoc_core_web_src_views_soptasksetting_index_283')}}</Checkbox></div>
			</div>
			<div class="table-header">
				<div class="expand"></div>
				<div class="th-1">{{$t('classlist_classlist_7')}}</div>
                <div class="th-1">{{$t('modules_spoc_core_web_src_views_soptasksetting_index_284')}}</div>
                <div class="th-1">{{$t('scoretemplate_scoretemplate_569')}}</div>
				<div class="th-1">{{$t('scoretemplate_scoretemplate_556')}}</div>
				<div class="th-1">{{$t('startemplate_index_577')}}</div>
				<div class="th-1">{{$t('startemplate_index_578')}}</div>
				<div class="spec-item">{{$t('classlist_compontents_detailinfo_45')}}</div>
			</div>
			<div class="table-body" v-if="data.length > 0">
				<div class="table-item-box" v-for="(item,index) in data" :key="index">
					<div
						class="table-item"
						:style="item.expand ? 'border-bottom:none' : 'border-bottom:1px solid #E6E7EB;' "
					>
						<div class="expand">
							<img @click.stop="openItem(item)" src="../../assets/images/collapse.png" v-if="item.expand" />
							<img @click.stop="openItem(item)" src="../../assets/images/expand.png" v-else />
						</div>
						<div class="ti-1">{{item.lesson}}</div>
                        <div class="ti-1">{{item.num}}</div>
                        <div class="ti-1">{{item.createByName}}</div>
						<div class="ti-1">{{formatTime(item.createDate)}}</div>
						<div class="ti-1">{{item.updateByName}}</div>
						<div class="ti-1">{{formatTime(item.updateDate)}}</div>
						<div class="spec-item" v-if="isAdmin">
							<a
								style="display:inline-block;"
								@click="deleteFn(item,index)"
							>{{$t('classlist_compontents_detailinfo_46')}}</a>
						</div>
						<div class="spec-item" v-else>
							<a
								v-if="item.isAdmin == 0"
								style="display:inline-block;"
								@click="deleteFn(item,index)"
							>{{$t('classlist_compontents_detailinfo_46')}}</a>
							<a
								v-else
								style="color:#999;cursor: default;display:inline-block;"
								@click="deleteFn(item,index)"
							>{{$t('classlist_compontents_detailinfo_46')}}</a>
						</div>
					</div>
					<Table
						v-if="item.expand && item.relList.length >0"
						:show-header="false"
						:columns="columns1"
						:data="item.relList"
					></Table>
					<div v-if="item.expand && item.relList.length < 1" class="add-button button-table">
						<Button v-if="isAdmin" @click="AddTemplate('add',item)">{{$t('modules_spoc_core_web_src_views_soptasksetting_index_285')}}</Button>
						<Button
							v-else
							:disabled="item.isAdmin == 1 || item.isAdmin === null"
							@click="AddTemplate('add',item)"
						>{{$t('modules_spoc_core_web_src_views_soptasksetting_index_285')}}</Button>
					</div>
				</div>
			</div>
			<div class="add-button">
				<Button
					v-if="currentClass !== null"
					type="primary"
					size="large"
					style="height:36px;"
					@click="addClassTemplate"
				>{{$t('startemplate_index_584')}}</Button>
			</div>
		</div>
		<Modal
			class="add-star-container"
			width="600"
			v-model="addClassModel"
			:title="$t('startemplate_index_584')"
			:mask-closable="false"
			@on-cancel="cancelAddFn"
		>
			<div class="as-item">
				<span>{{$t('startemplate_index_585')}}</span>
				<b>
					{{$t('startemplate_index_586')}}
					<InputNumber :max="100" :min="1" v-model="classNums" class="lessonNo"></InputNumber>
					{{$t('startemplate_index_587')}}
				</b>
			</div>
			<div slot="footer">
				<Button @click="cancelAddFn">{{$t('classroom_allscore_53')}}</Button>
				<Button type="primary" @click="submitAddFn">{{$t('classroom_allscore_54')}}</Button>
			</div>
		</Modal>
		<Modal
			class="new-temp-star-container"
			width="600"
			v-model="showModel"
			:title="$t('modules_spoc_core_web_src_views_soptasksetting_index_285')"
			:mask-closable="false"
			@on-cancel="cancelFn"
		>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="160">
                <FormItem :label="$t('modules_spoc_core_web_src_views_soptasksetting_index_286')" prop="sopTask" style="margin-top:24px;">
                    <Select v-model="formValidate.sopTask" filterable :placeholder="$t('pushsettings_index_505')" style="width:400px;">
                        <Option :value="item.id" v-for="item in sopTaskList" :key="item.id">{{item.name}}</Option>
                    </Select>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="cancelFn">{{$t('classroom_allscore_53')}}</Button>
                <Button  type="primary" @click="handleSubmit">{{$t('classroom_allscore_54')}}</Button>
            </div>
		</Modal>
	</div>
</template>

<script>
import valid, {errors,common,sysDict,sysUser} from '../../libs/request'
import { mapMutations } from "vuex";
export default {
	name: 'core.sopTaskSetting',
	data() {
		return {
		    sopTaskList:[],
            formValidate: {
                sopTask: '',
            },
            ruleValidate: {
                sopTask: [
                    { required: true,  message: this.$t('modules_spoc_core_web_src_views_soptasksetting_index_290'), trigger: 'change' }
                ],
            },
            showMoreValue:false,
			addClassModel: false,
			classNums: 1,
			type: "add",
			_idx: -1,
			usr: "",
			feedbackEn: "",
			feedbackCn: "",
			remarks: "",
			showModel: false,
			columns1: [
				{
					title: "taskTplName",
					key: "taskTplName",
                    align:'center'
					// tooltip: true
					//                        render: (h,params) => {
					//                            return h('span','中文：'+params.row.itemEn)
					//                        }
				},

				{
					title: "valid",
					key: "status",
                    align:'center',
					render: (h, params) => {
						let that = this;
						return h("div", {}, [
							h("i-switch", {
								props: {
									value: params.row.status,
									"true-value": "1",
									"false-value": "0",
									disabled:
										that.isAdmin ||
										(!that.isAdmin && that.createMan == "0")
											? false
											: true
								},
								style: {
									color: "#495050",
									marginRight: "8px"
								},
								on: {
									"on-change": () => {
										params.row.status =
											params.row.status === "1"
												? "0"
												: "1";
										this.changeTemplate(params.row);
									}
								}
							}),
							h(
								"span",
								{
									style: {
										color: "#495050",
										display:
											params.row.status == "1"
												? "inline-block"
												: "none"
									}
								},
								this.$t("scoretemplate_scoretemplate_559")
							),
							h(
								"span",
								{
									style: {
										color: "#999",
										display:
											params.row.status == "0"
												? "inline-block"
												: "none"
									}
								},
								this.$t("scoretemplate_scoretemplate_558")
							)
						]);
					}
				},
				{
					title: "edits",
					key: "edits",
                    align:'center',
					render: (h, params) => {
						let that = this;
						return h("div", {}, [
							h("i", {
								style: {
									"margin-right": "8px",
									cursor:
										that.isAdmin ||
										(!that.isAdmin && that.createMan == "0")
											? "pointer"
											: "default",
									color:
										that.isAdmin ||
										(!that.isAdmin && that.createMan == "0")
											? ""
											: "#999"
								},
								class: "iconfont icon-shanchu1",
								on: {
									click: () => {
                                        this.data.forEach(item => {
                                            if(item.id == params.row.comSopLessonId){
                                                this.currentGradeObj = item
                                            }
                                        })
                                        this.deleteTemplate(params.row);
									}
								}
							}),
							h("i", {
								style: {
									"margin-right": "8px",
									cursor:
										that.isAdmin ||
										(!that.isAdmin && that.createMan == "0")
											? "pointer"
											: "default",
									color:
										that.isAdmin ||
										(!that.isAdmin && that.createMan == "0")
											? ""
											: "#999"
								},
								class: "iconfont icon-tianjiafuzhi",
								on: {
									click: () => {
                                        this.data.forEach(item => {
                                            if(item.id == params.row.comSopLessonId){
                                                this.currentGradeObj = item
                                            }
                                        })
                                        this.AddTemplate("add",this.currentGradeObj);

                                    }
								}
							})
						]);
					}
				},
			],
			currentClass: null,
			currentCourse: 0,
			leftClassCourse: [],
			data: [],
			listParams: {},
			pageNumber: 1,
			pageSize: 100,
			currentGradeObj: {},
			currentCourseType: "", //选中的课程
			currentCourseGrade: "", //选中的年级
			editId: "", //编辑的时候选中的序号
			open: true,
			isAdmin: null,
			createMan: null,
			viewOpen: false
		};
	},
	components: {},
	created() {
		this.loginer();
	},
	mounted() {
		this.getUserRight();
		this.getBelongCourseType();
		this.listPageComTaskTpl()
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
        listPageComTaskTpl() {
            common
                .listPageComTaskTpl({"type":"sop task"})
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                       this.sopTaskList = res.data.data.list
                    }
                })
                .catch(errors.call(this));
        },
		loginer() {
			sysUser
				.userInfoData()
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						//                       console.log(res.data.data.admin)
						this.isAdmin = res.data.data.admin;
					}
				})
				.catch(errors.call(this));
		},
		formatTime(time) {
			let times = new Date(time).format("yyyy-MM-dd hh:mm:ss");
			return times;
		},
		clearSpace(val, obj) {
			let a = obj;
			let str = val;
			str = str.replace(/\s+/g, "");
			if (str.length < 1) {
				this[a] = "";
			}
		},
		setLimit(limit, val, obj, lang) {
			if (!lang) {
				let a = obj;
				let b = val;
				let text = b.replace(/\s+/g, "");
				this[a] = val.replace(/[^A-Za-z0-9,.? ]/g, "");
				if (text.length > 0) {
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
			} else {
				let b = val;
				let text = b.replace(/\s+/g, "");
				if (text.length > 0) {
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
			}
		},
		openItem(item) {
			if (item.expand) {
				item.expand = !item.expand;
			} else {
				item.expand = !item.expand;
				this.createMan = item.isAdmin;
			}
            let ifTrue =  (currentValue) => currentValue.expand == true;
            let isOk = this.data.every(ifTrue)
            if(isOk){
                this.showMoreValue  = true
            }else {
                this.showMoreValue = false
            }
        },
        changeShowMoreValue(val) {
            if(val){
                this.data.forEach(item => {
                    item.expand = true
                })
            }else{
                this.data.forEach((item,index) => {
                    if(index < 1){
                        item.expand = true
                    }else{
                        item.expand = false
                    }
                })
            }
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
						let jw_course_type = res.data.data.jw_course_type;
						this.leftClassCourse = [];
						jw_course_type.forEach((item, index) => {
							let obj = {
								types: "",
								label: "",
								children: []
							};
							obj.types = item.value;
							obj.label = item.label;
							if (index < 1) {
								obj.expand = true;
							} else {
								obj.expand = false;
							}
							obj.children = [];
							this.leftClassCourse.push(obj);
						});
						this.getGrade();
					}
				})
				.catch(errors.call(this));
		},
        //
		getGrade() {
			this.updateLoadingStatus({ isLoading: true });
			let type = "jw_course_type";
			sysDict
				.findChildDictByParentDict({
					type
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let sub_course_type = res.data.data;
						this.leftClassCourse.forEach((item, index) => {
							if (index < 1) {
								this.currentClass = item.label;
								this.listParams.type = item.value;
								this.listParams.grade = item.type;
								item.children = sub_course_type.filter(
									(items, idx) => {
										if (idx < 1) {
											this.currentClass = items.label;
											this.currentCourseGrade =
												items.value;
											this.currentCourseType = items.type;
										}
										return item.types == items.type;
									}
								);
							}
							item.children = sub_course_type.filter(items => {
								return item.types == items.type;
							});
						});
						this.getLists();
					}
				})
				.catch(errors.call(this));
			this.updateLoadingStatus({ isLoading: false });
		},
		getLists(id) {
			this.updateLoadingStatus({ isLoading: true });
			this.listParams.type = this.currentCourseType;
			this.listParams.grade = this.currentCourseGrade;
            common
				.comSopLessonListPage(this.listParams)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let list = res.data.data.list;
						this.data = list;
                        list.forEach((item, index) => {
                            if (index < 1) {
                                this.classNums =
                                    item.lesson < 100 ? parseInt(item.lesson) + 1 : 100;
                            }
                        });
                        if(list.length <1){
                            this.classNums = 1
                        }
                        if(this.showMoreValue){
                            this.data.forEach(item => {
                                item.expand = true
                            })
                        }else{
                            this.data.forEach(item => {
                                if(item.id == this.currentGradeObj.id){
                                    item.expand = true
                                }
                            })
                        }
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		cancelAddFn() {
			this.addClassModel = false;
		},
		submitAddFn() {//添加课次
			if (this.classNums > 100) {
				this.$Message.error({
					duration: 2,
					top: 30,
					content: this.$t("startemplate_index_600")
				});
			} else {
				let params = {
                    type: this.currentCourseType,
                    grade: this.currentCourseGrade,
					lesson: this.classNums,
                    comSopLessonTaskTplRelList: []
				};
				common
					.comSopLessonSave(params)
					.then(valid.call(this))
					.then(res => {
						if (res.ok) {
							this.addClassModel = false;
							this.pageNumber = 1;
							this.pageSize = 100;
							this.classNums = 1;
							this.getLists();
						}
					})
					.catch(errors.call(this));
			}
		},
		getUserRight() {
			//判断登录用户类型
			sysUser
				.userInfoData()
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.usr = res.data.data.name;
					}
				})
				.catch(errors.call(this));
		},
		deleteFn(item) {
			this.$Modal.confirm({
				title:
					this.$t("scoretemplate_scoretemplate_561") +
					'<span style="color:#FAAD14;">' +
					this.$t("startemplate_index_602") +
					"</span>",
				content:
					'<p style="color:#495060;font-size:14px;">' +
					this.$t("startemplate_index_603") +
					item.lesson +
					this.$t("startemplate_index_604") +
					"</p>",
				onOk: () => {
					common
						.comSopLessonDeleteById({ id: item.id })
						.then(valid.call(this))
						.then(res => {
							if (res.ok) {
								this.$Message.success({
									top: 30,
									duration: 3,
									content: this.$t("startemplate_index_605")
								});
								this.getLists();
							}
						})
						.catch(errors.call(this));
				},
				onCancel: () => {}
			});
		},


		clickCourse(item1) {
			this.currentClass = item1.label;
			this.pageNumber = 1;
			this.pageSize = 100;
			this.listParams.grade = item1.value;
			this.listParams.type = item1.type;
			(this.currentCourseType = item1.type),
				(this.currentCourseGrade = item1.value),
				this.getLists();
		},
		addClassTemplate() {
			//添加课次模板
			this.addClassModel = true;

		},
		AddTemplate(type,key) {
			//添加模板
			this.type = type;
			this.showModel = true;
            this.formValidate.sopTask = '';
			this.currentGradeObj = key
		},
		cancelFn() {
			this.viewOpen = false;
			this.showModel = false;
			this.handleReset()
		},
        handleSubmit () {
            this.$refs['formValidate'].validate((valids) => {
                if (valids) {
                    this.submitFn()
                }
            })
        },
        handleReset () {
            this.$refs['formValidate'].resetFields();
        },
		submitFn(status) {//添加SOP任务
            console.log(this.currentGradeObj)
            let params = {};
            if (this.currentGradeObj.relList.length > 0) {
                let arr = [];
                let count = 0;
                for (let i in this.currentGradeObj
                    .relList) {
                    if (
                        this.currentGradeObj.relList[i].status == "1"
                    ){
                        count++;
                    }
                    arr.push(
                        Number(
                            this.currentGradeObj.relList[i].sort
                        )
                    );
                }
                let max = Math.max(...arr) + 1;
                if (count >= 5) {
                    params = {
                        "relList": [
                        {
                            "comSopLessonId": this.currentGradeObj.id,
                            "taskTplId": this.formValidate.sopTask,
                            "status": '0',
                            "sort": parseInt(max.toString())+1
                        }
                    ]}
                } else {
                    params = {
                        "relList": [
                            {
                                "comSopLessonId": this.currentGradeObj.id,
                                "taskTplId": this.formValidate.sopTask,
                                "status": '1',
                                "sort": parseInt(max.toString())+1
                            }
                        ]}
                }

            }else{
                params = {
                    "relList": [
                        {
                            "comSopLessonId": this.currentGradeObj.id,
                            "taskTplId": this.formValidate.sopTask,
                            "status": '1',
                            "sort": 1
                        }
                    ]}
            }
            // console.log(params)
				common
					.saveRel(params)
					.then(valid.call(this))
					.then(res => {
						if (res.ok) {
							this.showModel = false;
							this.getLists(this.currentGradeObj.id);
                            this.$refs['formValidate'].resetFields();
						}
					})
					.catch(errors.call(this));

		},
		changeTemplate(row) {
		    this.data.forEach(item => {
		        if(item.id == row.comSopLessonId){
                    this.currentGradeObj = item
                }
            })
			this.type = "change";
			let count = 0;
			let arr = this.currentGradeObj.relList;
			arr.forEach(item => {
				if (item.sort == row.sort) {
					item.status = row.status;
                    console.log(row.status)
				}
				if (item.status > 0) {
					count++;
				}
			});
			if (count > 5) {
				if (row.status) {
					this.$Modal.error({
						title: this.$t("startemplate_index_611"),
						content: this.$t("startemplate_index_612"),
						onOk: () => {
							arr.forEach(item => {
								if (item.sort == row.sort) {
									item.status = row.status =
										row.status === "1" ? "0" : "1";
								}
							});
						}
					});
				}
			} else {
                let params = {
                    "relList": [
                        {
                            "comSopLessonId": row.comSopLessonId,
                            "taskTplId": row.taskTplId,
                            "taskTplName":row.taskTplName,
                            "status": row.status,
                            "sort": 1
                        }
                    ]
                }
                common
                    .saveRel(params)
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            this.showModel = false;
                            this.getLists();
                        }
                    })
                    .catch(errors.call(this));
			}
		},
		deleteTemplate(row) {// 删除子主题
            console.log(row)
			this.type = "del";
			if (row.status == "1") {
				this.$Message.warning({
					duration: 2,
					top: 30,
					content: this.$t('modules_spoc_core_web_src_views_soptasksetting_index_291')
				});
			} else {
				this.$Modal.confirm({
					title:
						"<p>" +
						this.$t("scoretemplate_scoretemplate_561") +
						'<span style="color:#FAAD14;">'+this.$t('modules_spoc_core_web_src_views_soptasksetting_index_292') +'</span></p>',
					content:
						'<p style="color:#495060;font-size:14px;">' +
						this.$t('modules_spoc_core_web_src_views_soptasksetting_index_293') +
						"</p>",
					onOk: () => {
                        common
                            .deleteRel({
                                "comSopLessonId":row.comSopLessonId,
                                "taskTplId":row.taskTplId,
                            })
                            .then(valid.call(this))
                            .then(res => {
                                if (res.ok) {
                                    this.getLists()
                                }
                            })
                            .catch(errors.call(this));
					},
					onCancel: () => {}
				});
			}
		},
	}
};
</script>
