<style lang="less">
.star-list-container {
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
			tr {
				td {
					background: #fafafa;
				}
			}
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
	<div class="star-list-container">
		<div class="course-temp">
			<div class="cb-item-1" v-for="(item,index) in leftClassCourse" :key="index">
				<div class="cb-item" style="cursor: default">
					<Icon
						style="cursor: pointer"
						size="15"
						type="ios-arrow-back"
						:class="{'down':item.expand,'right':!item.expand}"
						@click.stop="item.expand=!item.expand"
					/>
					<img style="width:14px;height:12px;" src="../../assets/img/sub-class.png" />
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
				<h2 style="float: left">{{$t('startemplate_index_573')}}</h2>
                <Button type="primary" v-if="myButtonPrem && myButtonPrem.indexOf('import') >= 0" @click="toImport" style="float: right;margin-top: 12px;">{{$t('views_coursepack_bigtableexample_343')}}</Button>
			</div>
			<div class="table-header">
				<div class="expand"></div>
				<div class="th-1">{{$t('classlist_classlist_7')}}</div>
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
							<img @click.stop="openItem(item)" src="../../assets/img/collapse.png" v-if="item.expand" />
							<img @click.stop="openItem(item)" src="../../assets/img/expand.png" v-else />
						</div>
						<div class="ti-1">{{item.lesson}}</div>
						<div class="ti-1">{{item.createByName}}</div>
						<div class="ti-1">{{formatTime(item.createDate)}}</div>
						<div class="ti-1">{{item.updateByName}}</div>
						<div class="ti-1">{{formatTime(item.updateDate)}}</div>
						<div class="spec-item" v-if="isAdmin">
							<a
								style="display:inline-block;"
								@click="deleteFn(item,index)"
							>{{$t('classlist_compontents_detailinfo_46')}}</a>

							<a
								v-if="index < data.length -1"
								style="display:inline-block;"
								@click="moveDown(item,index)"
							>{{$t('startemplate_index_581')}}</a>
							<a
								v-else
								style="color:#999;cursor: default;display:inline-block;"
							>{{$t('startemplate_index_581')}}</a>

							<a
								v-if="index > 0"
								style="display:inline-block;"
								@click="moveUp(item,index)"
							>{{$t('startemplate_index_582')}}</a>
							<a
								v-else
								style="color:#999;cursor: default;display:inline-block;"
							>{{$t('startemplate_index_582')}}</a>
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

							<a
								v-if="index < data.length -1 && item.isAdmin ==0 "
								style="display:inline-block;"
								@click="moveDown(item,index)"
							>{{$t('startemplate_index_581')}}</a>
							<a
								v-else
								style="color:#999;cursor: default;display:inline-block;"
							>{{$t('startemplate_index_581')}}</a>

							<a
								v-if="index > 0&& item.isAdmin == 0"
								style="display:inline-block;"
								@click="moveUp(item,index)"
							>{{$t('startemplate_index_582')}}</a>
							<a
								v-else
								style="color:#999;cursor: default;display:inline-block;"
							>{{$t('startemplate_index_582')}}</a>
						</div>
					</div>
					<Table
						v-if="item.expand && item.jxStarTplDetailList.length >0"
						:show-header="false"
						:columns="columns1"

						:data="item.jxStarTplDetailList"
					></Table>
					<div v-if="item.expand && item.jxStarTplDetailList.length < 1" class="add-button button-table">
						<Button v-if="isAdmin" @click="AddTemplate('add',item)">{{$t('startemplate_index_583')}}</Button>
						<Button
							v-else
							:disabled="item.isAdmin == 1 || item.isAdmin === null"
							@click="AddTemplate('add',item)"
						>{{$t('startemplate_index_583')}}</Button>
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
			width="1000"
			v-model="showModel"
			:title="$t('startemplate_index_590')"
			:mask-closable="false"
			@on-cancel="cancelFn"
		>
			<div class="nm-content">
				<div class="nm-item">
					<div class="nmc-header">
						<b>
							<span>·</span>English Version
						</b>
					</div>
					<div class="nmc-item">
						<span>Evaluation：</span>
						<Input
							v-model="feedbackEn"
							type="textarea"
							style="width:324px;"
							:disabled="viewOpen"
							:maxlength="300"
							@on-blur="clearSpace(feedbackEn,'feedbackEn')"
							@keyup.native="setLimit(300,feedbackEn,'feedbackEn',0)"
							:autosize="{minRows: 3,maxRows: 3}"
							placeholder="Please input the information of  Evaluation"
						></Input>
					</div>
				</div>
				<div class="nm-item">
					<div class="nmc-header">
						<b>
							<span>·</span>
							{{$t('mycourse_viewstucontent_458')}}
						</b>
					</div>
					<div class="nmc-item">
						<span>{{$t('startemplate_index_592')}}</span>
						<Input
							v-model="feedbackCn"
							style="width:324px;"
							:maxlength="300"
							:disabled="viewOpen"
							@on-blur="clearSpace(feedbackCn,'feedbackCn')"
							@keyup.native="setLimit(300,feedbackCn,'feedbackCn',1)"
							type="textarea"
							:autosize="{minRows: 3,maxRows: 3}"
							:placeholder="$t('startemplate_index_593')"
						></Input>
					</div>
				</div>
			</div>
			<div style="margin-bottom:24px;">
				<span
					style="color:#999999;width:141px;display:inline-block;text-align:right;padding-right:30px;"
				>{{$t('startemplate_index_594')}}</span>
				<Input
					v-model="remarks"
					style="width: calc(100% - 185px); "
					:maxlength="300"
					:disabled="viewOpen"
					@on-blur="clearSpace(remarks,'remarks')"
					@keyup.native="setLimit(300,remarks,'remarks',1)"
					type="textarea"
					:autosize="{minRows: 3,maxRows: 3}"
					:placeholder="$t('startemplate_index_595')"
				></Input>
			</div>
			<div slot="footer">
				<Button @click="cancelFn">{{$t('classroom_allscore_53')}}</Button>
				<Button v-if="!viewOpen" type="primary" @click="submitFn">{{$t('classroom_allscore_54')}}</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
import valid, { errors, jxStarTpl, sysDict, sysUser } from "../../libs/request";
import { mapMutations, mapState } from "vuex";
export default {
	name: "hootie.starTemplate",
	data() {
		return {
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
					title: "infos",
					key: "item",
                    minWidth:130,
					tooltip: true
					//                        render: (h,params) => {
					//                            return h('span','中文：'+params.row.itemEn)
					//                        }
				},
				{
					title: "enInfos",
					key: "itemEn",
                    minWidth:130,
					tooltip: true,
					className: "padding48"
					//                        render: (h,params) => {
					//                            return h('div',[
					//                                h('span','English：'),
					//                                h('span',params.row.itemEn),
					//                            ])
					//                        }
				},
				{
					title: "remarks",
					key: "remarks",
                    minWidth:130,
					tooltip: true
					//                        render: (h,params) => {
					//                            return h('span','说明：'+params.row.itemEn)
					//                        }
				},
				{
					title: "valid",
					key: "status",
					width:120,
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
					minWidth:100,
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
								class: "iconfont icon-bianji",
								on: {
									click: () => {
										if (
											that.isAdmin ||
											(!that.isAdmin &&
												that.createMan == "0")
										) {
											this.editTemplate(params.row);
										}
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
								class: "iconfont icon-bianzu7",
								on: {
									click: () => {
										if (
											that.isAdmin ||
											(!that.isAdmin &&
												that.createMan == "0")
										) {
											this.viewTemplate(params.row);
										}
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
								class: "iconfont icon-shanchu1",
								on: {
									click: () => {
										if (
											that.isAdmin ||
											(!that.isAdmin &&
												that.createMan == "0")
										) {
											this.deleteTemplate(params.row);
										}
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
										if (
											that.isAdmin ||
											(!that.isAdmin &&
												that.createMan == "0")
										) {
											this.AddTemplate("add");
										}
									}
								}
							})
						]);
					}
				},
				{
					title: "doAction",
					key: "doAction",
                    width:100,
					render: (h, params) => {
						let that = this;
						return h("div", {}, [
							h("i", {
								style: {
									"margin-right": "8px",
									cursor:
										params.row._index <
											this.currentGradeObj
												.jxStarTplDetailList.length -
												1 &&
										(that.isAdmin ||
											(!that.isAdmin &&
												that.createMan == "0"))
											? "pointer"
											: "default",
									color:
										params.row._index <
											this.currentGradeObj
												.jxStarTplDetailList.length -
												1 &&
										(that.isAdmin ||
											(!that.isAdmin &&
												that.createMan == "0"))
											? "#495050"
											: "#999"
								},
								class: "iconfont icon-shangyifuzhi",
								on: {
									click: () => {
										if (
											params.row._index <
												this.currentGradeObj
													.jxStarTplDetailList
													.length -
													1 &&
											(that.isAdmin ||
												(!that.isAdmin &&
													that.createMan == "0"))
										) {
											this.downTemplate(params.row);
										}
									}
								}
							}),
							h("i", {
								style: {
									"margin-right": "8px",
									cursor:
										params.row._index > 0 &&
										(that.isAdmin ||
											(!that.isAdmin &&
												that.createMan == "0"))
											? "pointer"
											: "default",
									color:
										params.row._index > 0 &&
										(that.isAdmin ||
											(!that.isAdmin &&
												that.createMan == "0"))
											? "#495050"
											: "#999"
								},
								class: "iconfont icon-shangyifuzhi1",
								on: {
									click: () => {
										if (
											params.row._index > 0 &&
											(that.isAdmin ||
												(!that.isAdmin &&
													that.createMan == "0"))
										) {
											this.upTemplate(params.row);
										}
									}
								}
							})
						]);
					}
				}
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
	computed: {
		...mapState(['app',"buttonPerm"]),
		myButtonPrem(){
			if(this.buttonPerm){
				return this.buttonPerm['hootie.starTemplate'] || [];
			}
			return [];
		},
	},
	created() {
		this.loginer();
	},
	mounted() {
		this.getUserRight();
		this.getBelongCourseType();
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
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
				this.currentGradeObj = {};
			} else {
				this.data.forEach((item1, index) => {
					item1.expand = false;
				});
				item.expand = !item.expand;
				this.currentGradeObj = item;
				this.createMan = item.isAdmin;
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
								this.listParams.courseGrade = item.value;
								this.listParams.courseType = item.type;
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
						this.getLists(this.currentGradeObj.id);
					}
				})
				.catch(errors.call(this));
			this.updateLoadingStatus({ isLoading: false });
		},
		getLists(id) {
			this.updateLoadingStatus({ isLoading: true });
			this.listParams.pageNumber = this.pageNumber;
			this.listParams.pageSize = this.pageSize;
			this.listParams.courseType = this.currentCourseType;
			this.listParams.courseGrade = this.currentCourseGrade;
			jxStarTpl
				.list(this.listParams)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let list = res.data.data.content;
						list.forEach((item, index) => {
							if (item.id == id) {
								item.expand = true;
								this.currentGradeObj = item;
							} else {
								item.expand = false;
							}
							if (index < 1) {
								this.classNums =
									item.lesson < 100 ? item.lesson + 1 : 100;
							}
						});
						//                        console.log(list)
						this.data = list;
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
		submitAddFn() {
			if (this.classNums > 100) {
				this.$Message.error({
					duration: 2,
					top: 30,
					content: this.$t("startemplate_index_600")
				});
			} else {
				let params = {
					courseType: this.currentCourseType,
					courseGrade: this.currentCourseGrade,
					lesson: this.classNums,
					jxStarTplDetailList: []
				};
				jxStarTpl
					.save(params)
					.then(valid.call(this))
					.then(res => {
						if (res.ok) {
							this.addClassModel = false;
							this.pageNumber = 1;
							this.pageSize = 100;
							this.classNums = 1;
							this.getLists(this.currentGradeObj.id);
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
					jxStarTpl
						.deleteById({ id: item.id })
						.then(valid.call(this))
						.then(res => {
							if (res.ok) {
								this.$Message.success({
									top: 30,
									duration: 3,
									content: this.$t("startemplate_index_605")
								});
								this.getLists(this.currentGradeObj.id);
							}
						})
						.catch(errors.call(this));
				},
				onCancel: () => {}
			});
		},
		moveDown(item, index) {
			let len = this.data.length;
			let params = [];

			if (len > index + 1) {
				let obj1 = {};
				let obj = {};
				obj.id = item.id;
				obj1.sort = item.lesson.toString();

				obj1.id = this.data[index + 1].id;
				obj.sort = this.data[index + 1].lesson.toString();
				params.push(obj1);
				params.push(obj);
				jxStarTpl
					.changeTplSort(params)
					.then(valid.call(this))
					.then(res => {
						if (res.ok) {
							this.$Message.success({
								top: 30,
								duration: 3,
								content: this.$t("startemplate_index_606")
							});
							this.getLists(this.currentGradeObj.id);
						}
					})
					.catch(errors.call(this));
			} else {
				this.$Message.warning({
					duration: 3,
					top: 30,
					content: this.$t("startemplate_index_607")
				});
			}
		},
		moveUp(item, index) {
			let params = [];
			if (index > 0) {
				let obj1 = {};
				let obj = {
					id: item.id,
					sort: item.lesson.toString()
				};
				obj.id = item.id;
				obj.sort = this.data[index - 1].lesson.toString();

				obj1.sort = item.lesson.toString();
				obj1.id = this.data[index - 1].id;
				params.push(obj1);
				params.push(obj);
				jxStarTpl
					.changeTplSort(params)
					.then(valid.call(this))
					.then(res => {
						if (res.ok) {
							this.$Message.success({
								top: 30,
								duration: 3,
								content: this.$t("startemplate_index_608")
							});
							this.getLists(this.currentGradeObj.id);
						}
					})
					.catch(errors.call(this));
			} else {
				this.$Message.warning({
					duration: 3,
					top: 30,
					content: this.$t("startemplate_index_607")
				});
			}
		},
		clickCourse(item1) {
			this.currentClass = item1.label;
			this.pageNumber = 1;
			this.pageSize = 100;
			this.listParams.courseGrade = item1.value;
			this.listParams.courseType = item1.type;
			(this.currentCourseType = item1.type),
				(this.currentCourseGrade = item1.value),
				this.getLists(this.currentGradeObj.id);
		},
		addClassTemplate() {
			//添加课次模板
			this.addClassModel = true;
		},
		AddTemplate(type) {
			//添加模板
			this.type = type;
			this.showModel = true;
			this.feedbackEn = "";
			this.feedbackCn = "";
			this.remarks = "";
		},
		cancelFn() {
			this.viewOpen = false;
			this.showModel = false;
			this.feedbackEn = "";
			this.feedbackCn = "";
		},
		submitFn() {
			if (this.feedbackEn.length < 1 && this.feedbackCn.length < 1) {
				this.$Message.warning({
					duration: 3,
					top: 30,
					content: this.$t("startemplate_index_609")
				});
			} else {
				let params = {};
				params.courseType = this.currentGradeObj.courseType;
				params.courseGrade = this.currentGradeObj.courseGrade;
				params.lesson = this.currentGradeObj.lesson;
				params.id = this.currentGradeObj.id;
				params.createById = this.currentGradeObj.createById;
				params.createByName = this.currentGradeObj.createByName;
				params.createDate = this.currentGradeObj.createDate;
				params.updateById = this.currentGradeObj.updateById;
				params.updateByName = this.currentGradeObj.updateByName;
				params.updateDate = this.currentGradeObj.updateDate;
				params.isAdmin = this.currentGradeObj.isAdmin;

				if (this.type === "edit") {
					let arr1 = JSON.parse(
						JSON.stringify(this.currentGradeObj.jxStarTplDetailList)
					);
					for (let i in arr1) {
						if (arr1[i].sort == this.editId) {
							arr1[i].item = this.feedbackCn;
							arr1[i].itemEn = this.feedbackEn;
							arr1[i].remarks = this.remarks;
						}
					}
					params.jxStarTplDetailList = arr1;
				} else if (this.type === "add") {
					let obj = {};
					if (this.currentGradeObj.jxStarTplDetailList.length > 0) {
						let arr = [];
						let count = 0;
						for (let i in this.currentGradeObj
							.jxStarTplDetailList) {
							if (
								this.currentGradeObj.jxStarTplDetailList[i]
									.status == "1"
							) {
								count++;
							}
							arr.push(
								Number(
									this.currentGradeObj.jxStarTplDetailList[i]
										.sort
								)
							);
						}
						let max = Math.max(...arr) + 1;
						if (count >= 5) {
							obj = {
								item: this.feedbackCn,
								itemEn: this.feedbackEn,
								status: "0",
								remarks: this.remarks,
								sort: max.toString()
							};
						} else {
							obj = {
								item: this.feedbackCn,
								itemEn: this.feedbackEn,
								status: "1",
								remarks: this.remarks,
								sort: max.toString()
							};
						}

						let arrObj = JSON.parse(
							JSON.stringify(
								this.currentGradeObj.jxStarTplDetailList
							)
						);
						arrObj.push(obj);
						params.jxStarTplDetailList = arrObj;
					} else {
						obj = {
							item: this.feedbackCn,
							itemEn: this.feedbackEn,
							status: "1",
							sort: "1",
							remarks: this.remarks
						};
						params.jxStarTplDetailList = [obj];
					}
				}
				jxStarTpl
					.save(params)
					.then(valid.call(this))
					.then(res => {
						if (res.ok) {
							this.showModel = false;
							this.getLists(this.currentGradeObj.id);
						}
					})
					.catch(errors.call(this));
			}
		},

		commonTemplate(arr) {
			let params = {};
			params.id = this.currentGradeObj.id;
			params.createById = this.currentGradeObj.createById;
			params.createByName = this.currentGradeObj.createByName;
			params.createDate = this.currentGradeObj.createDate;
			params.updateById = this.currentGradeObj.updateById;
			params.updateByName = this.currentGradeObj.updateByName;
			params.updateDate = this.currentGradeObj.updateDate;
			params.courseType = this.currentGradeObj.courseType;
			params.courseGrade = this.currentGradeObj.courseGrade;
			params.lesson = this.currentGradeObj.lesson;
			params.isAdmin = this.currentGradeObj.isAdmin;

			params.jxStarTplDetailList = arr;
			jxStarTpl
				.save(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.showModel = false;
						this.getLists(this.currentGradeObj.id);
					}
				})
				.catch(errors.call(this));
		},
		editTemplate(row) {
			if (row.status == "1") {
				this.$Message.warning({
					duration: 2,
					top: 30,
					content: this.$t("startemplate_index_610")
				});
			} else {
				this.showModel = true;
				this.type = "edit";
				this.editId = row.sort;
				this.feedbackEn = row.itemEn;
				this.feedbackCn = row.item;
				this.remarks = row.remarks;
			}
		},
		viewTemplate(row) {
			this.showModel = true;
			this.type = "view";
			this.viewOpen = true;
			this.feedbackEn = row.itemEn;
			this.feedbackCn = row.item;
			this.remarks = row.remarks;
		},
		changeTemplate(row) {
			this.type = "change";
			let count = 0;
			let arr = this.currentGradeObj.jxStarTplDetailList;
			arr.forEach(item => {
				if (item.sort == row.sort) {
					item.status = row.status;
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
				this.commonTemplate(arr);
			}
		},
		deleteTemplate(row) {
			this.type = "del";
			if (row.status == "1") {
				this.$Message.warning({
					duration: 2,
					top: 30,
					content: this.$t("startemplate_index_613")
				});
			} else {
				this.$Modal.confirm({
					title:
						"<p>" +
						this.$t("scoretemplate_scoretemplate_561") +
						'<span style="color:#FAAD14;">' +
						this.$t("startemplate_index_614") +
						"</span></p>",
					content:
						'<p style="color:#495060;font-size:14px;">' +
						this.$t("startemplate_index_615") +
						"</p>",
					onOk: () => {
						let arr = this.currentGradeObj.jxStarTplDetailList;
						let arr1 = arr.filter(item => {
							if (item.sort == row.sort) {
							} else {
								return item;
							}
						});
						this.currentGradeObj.jxStarTplDetailList = [...arr1];
						this.commonTemplate(arr1);
					},
					onCancel: () => {}
				});
			}
		},
		upTemplate(row) {
			this.type = "up";
			let arr = [...this.currentGradeObj.jxStarTplDetailList];
			if (row._index && arr.length > 1) {
				let obj = arr.splice(row._index, 1)[0];
				arr.splice(row._index - 1, 0, obj);
				this.commonTemplate(arr);
			} else {
				this.$Message.warning({
					duration: 3,
					top: 30,
					content: this.$t("startemplate_index_607")
				});
			}
		},
		downTemplate(row) {
			this.type = "down";
			let arr = [...this.currentGradeObj.jxStarTplDetailList];
			if (row._index + 1 < arr.length && arr.length > 1) {
				let obj = arr.splice(row._index, 1)[0];
				arr.splice(row._index + 1, 0, obj);
				this.commonTemplate(arr);
			} else {
				this.$Message.warning({
					duration: 3,
					top: 30,
					content: this.$t("startemplate_index_607")
				});
			}
        },
        toImport() {
            this.$router.push({
                name: 'hootie.importStarTemplate'
            })
        }
	}
};
</script>
