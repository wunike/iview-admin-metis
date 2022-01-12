<style lang='less'>
	.workorderMGSX {
		height: 100%;
		background: #FFF;
		.feedbackView{
			padding: 10px;
			background: #FFF;
		}
		.updataTime {
			color: #b8b8b8;
			display: inline-block;
			text-align: right;
			width: 60px;
			margin-right: 14px;
		}
		.docu-top-area-timing-through {
			width: 14px;
			height: 4px;
			display: inline-block;
			margin-top: 14px;
			margin-right: 12px;
			float: left;
		}
		.all {
			i {
				font-style: normal;
				font-size: 18px;
				color: red;
			}
		}
		.page {
			text-align: center; padding: 16px 0;
		}
		.workorder_box {
			margin-top: 10px;
			width: 100%;
			background: #ffffff;
			border-radius: 4px;
			padding: 0 16px;
			.tableName {
				height: 60px;
				padding-bottom: 12px;
				position: relative;
				.name {
					font-size: 16px;
					font-weight: bold;
					color: #495060;
					position: absolute;
					left: 16px;
					bottom: 12px;
				}
			}
		}
	}
	
	.checkDetailMGSX {
		ul,
		li {
			margin: 0;
			padding: 0;
		}
		li {
			list-style: none;
			line-height: 30px;
			margin-left: 10px;
			span {
				display: inline-block;
				width: 80px;
				text-align: right;
				margin-right: 10px;
				vertical-align: top;
			}
			.description {
				display: inline-block;
				width: 550px;
			}
		}
	}
</style>
<template>
	<div class="workorderMGSX">
		<div v-if="!isShowDetail">
			<v-search-collapse @search="getWordorderMList" @reset="resetSearch" @changeDivHeight="changeDivHeight">
				<DatePicker 
					type="daterange" 
					v-model="daterange" 
					placeholder="提交时间范围" 
					style="width: 200px" 
					separator=" ~ "
					ref="DatePicker"
					split-panels
					:options="options"
					@on-open-change="setOptTime"
				></DatePicker>
				<Input v-model="compact" placeholder="输入编号/问题标题/提交姓名" style="width: 230px;"></Input>
				<!--<span class="docu-top-area-timing-through"></span>
				<DatePicker type="date" placeholder="结束时间" style="width: 110px" @on-change="onchangeEDate"></DatePicker>-->
			</v-search-collapse>
			<!--<v-select style="width: 396px;margin: 15px 0;" placeholder="输入编号/问题内容关键词/提交姓名" :datafunc="datafunc" icon="search" v-model="compact" k='cnname' @on-enter="textChange" @on-click="textChange" @selected="textChange">
			</v-select>-->
			<!--<p class="all">共计<i>{{data.count}}</i>条</p>-->
			<!--<v-title title="反馈列表">
				<v-btn-options slot="right" :btns="btnsNormal1">
				</v-btn-options>
			</v-title>-->
			<div class="workorder_box">
				<div class="tableName">
					<p class="name">反馈列表</p>
				</div>
				<Table  
					id="bigTableMiddle" 
					:height="_tableHeight" 
					:columns="columns" 
					:data="data.list" 
					@on-sort-change="onSortChange" 
					@on-filter-change="filterChange" 
					@on-selection-change='selectChange'></Table>
				<div class="page">
					<Page show-elevator show-total show-sizer @on-page-size-change="onPageSizeChange" :current="pageNo" :total="data.total" @on-change="onPageChange"></Page>
				</div>
			</div>
			<!-- 对话框 -->
<!--			<Modal :mask-closable='false' v-model="modalShow" width=430 title="确认接收" @on-ok="ok" @on-cancel="cancel">-->
<!--				<p style="text-align:left">确认接收当前反馈内容？</p>-->
<!--			</Modal>-->
<!--			<Modal :mask-closable='false' v-model="modalClose" width=430 title="确认关闭" @on-ok="okClose" @on-cancel="cancelClose">-->
<!--				<p style="text-align:left">确认关闭当前反馈内容？</p>-->
<!--			</Modal>-->
			<Modal v-model="checkDetailM" width=728 title="确认解决结果" :mask-closable='false'>
				<ul class="checkDetailMGSX">
					<li><span>优先级：</span>{{checkInfo.status}}</li>
					<li><span>问题分类：</span>{{checkInfo.type}}</li>
					<li><span>问题描述：</span>
						<div class="description" v-html="checkInfo.content">{{checkInfo.content}}</div>
					</li>
				</ul>
				<div slot="footer">
					<Button @click="cancelResole">不予解决</Button>
					<Button type="primary" @click="okResole">确认已解决</Button>
				</div>
			</Modal>
			<Modal :mask-closable='false' v-model="reasonModal" width=728 title="确认解决结果" @on-ok="okReason" ref="reason" @on-cancel="cancelReason">
				<div style="padding-left:10px">
					<p style="line-height:30px" v-if="isReject"><span style="color:red">*</span>请输入不予解决的理由</p>
					<p style="line-height:30px" v-else>请描述解决方案</p>
					<editor :value='editorC' @input="inputContent"></editor>
				</div>
			</Modal>
		</div>
		<div v-else>
			<view-feedback-detail :detailId='detailId' @on-back="back"></view-feedback-detail>
		</div>
	</div>
</template>

<script>
	import vSelect from '@public/modules/vSelect'
	import vTitle from "@public/modules/vTitle";
	import vBtnOptions from '@public/modules/vBtnOptions'
	import editor from '../selfCentred/editor'
	import viewFeedbackDetail from '../selfCentred/viewFeedbackDetail.vue'
    import vSearchCollapse from '@public/modules/vSearchCollapse';
    import { waitUntil, DatePickerOpt, defaultDatePickerValue } from '@public/libs/util';
	import valid, {
		errors,
		sys,
		sysDict,
		sysWorkorder
	} from '../../libs/request.js';
	import { mapMutations, mapState } from 'vuex';
	export default {
		name: 'portal.workorderM',
		data() {
			return {
				options: null,
				tableHeightOut: 72, //324,
				mainBodyHeight: '',
				dataTotal: 1,
				daterange: "",
				isReject: false,
				isShowDetail: false,
				detailId: '',
				editorC: '',
				isShow: false,
				handleType: '',
				checkInfo: {
					content: '',
				},
				modalShow: false,
				modalClose: false,
				showType: '',
				reasonModal: false,
				isAllType: false,
				checkDetailM: false,
				singleId: '',
				showIds: '',
				closeIds: '',
				startTime: '',
				endTime: '',
				pageSize: this.$store.state.app.pageSizeGlobal,
				pageNo: 1,
				type: '',
				status: '',
				sort: '',
				priority: '',
				compact: '',
				data: {
					count: 20,
					list: [],
				},
				btnsNormal1: [],
				columns: [{
						type: 'selection',
						width: 60,
						align: 'center'
					},
					{
						title: "编号",
						key: "no",
						minWidth: 100,
						align: 'left',
						render: (h, params) => {
							return h('a', {
									on: {
										'click': () => {
											this.detailId = params.row.id
											this.isShowDetail = true
											this.$router.push({
												name: 'portal.workorderM',
												query: {
													showInfo: true
												}
											})
										}
									}
								},
								params.row.no
							)
						}
					},
					{
						title: "问题标题",
						key: "title",
						align: 'left',
						minWidth: 100
					},
					{
						title: "问题内容",
						key: "content",
						align: 'left',
						width: 240,
						render: (h, params) => {
							return h('a', {
									style: {
										// overflow:'hidden',
										// textOverflow:'ellipsis',
										// display:'-webkit-box',
										// '-webkit-box-orient':'vertical',
										// '-webkit-line-clamp':2,
										//										'cursor': 'pointer'
									},
									on: {
										'click': () => {
											this.detailId = params.row.id
											// console.log(params.row.id)
											this.isShowDetail = true
											this.$router.push({
												name: 'portal.workorderM',
												query: {
													showInfo: true
												}
											})
										}
									}
								},
								params.row.content.replace(/<\/?.+?\/?>/g, "").length > 10 ? (params.row.content.replace(/<\/?.+?\/?>/g, "").substr(0, 10) + '...') : params.row.content.replace(/<\/?.+?\/?>/g, "")
							)
						}
					},
					{
						title: "问题分类",
						key: "type",
						align: 'left',
						filters: [],
						filterMultiple: false,
						filterRemote() {},
						minWidth: 100
					},
					{
						title: "优先级",
						key: "priority",
						align: 'left',
						width: 120,
						filters: [],
						filterMultiple: false,
						filterRemote() {}
					},
					{
						title: "提交人",
						key: "createBy",
						align: 'left',
						minWidth: 100
					},
					{
						title: "提交时间",
						key: "createDate",
						sortable: "custom",
						align: 'left',
						minWidth: 110
					},
					{
						title: "状态",
						key: "status",
						align: 'left',
						filters: [],
						filterMultiple: false,
						filterRemote() {},
						minWidth: 80
					},
					{
						title: "操作",
						// key: "updateDate",
						//						sortable: "custom",
						align: "center",
						width: 80,
						render: (h, params) => {
							return h('a', {
									on: {
										click: () => {
											this.isAllType = false
											this.singleId = params.row.id
											if(params.row.status == '已提交') {
												let config = {
													title:'确认接收当前反馈内容？',
													width:400,
													content:``,
													onOk: () => {
														this.ok()
													}
												}
												this.$Modal.confirm(config)
											} else if(params.row.status == '已验证') {
												this.modalClose = true;
                                                this.$Modal.confirm({
                                                    title: '确认关闭',
                                                    content: '<p>确认关闭当前反馈内容？</p>',
                                                    onOk: () => {
                                                        this.okClose();
                                                    },
                                                    onCancel: () => {
                                                        this.cancelClose();
                                                    }
                                                });
											} else if(params.row.status == '处理中') {
												this.checkInfo = params.row
												this.editorC = ''
												this.checkDetailM = true;
											}
										}
									}
								},
								params.row.status == "已提交"
                                    ? "接收" : (params.row.status == "已验证")
                                    ? "关闭" : (params.row.status == "处理中")
                                        ? "确认" : ""
							)
						}
					},
                ],
                actualHeight: 0,
                uploadHeight: false, //继续更新高度
			}
		},

		components: {
			vSelect,
			vBtnOptions,
			vTitle,
			editor,
			viewFeedbackDetail,
			vSearchCollapse
        },

		computed: {
        	...mapState(['app', 'buttonPerm', 'calendarConfig']),
            _tableHeight() {
                // console.log('tableHeightOut:init = ' + this.tableHeightOut) // 搜索框的高度
                let hasPage = 65
                // 计算出的表格内容最大的高度
                // 48 + 12为表格名称的高度
                // 16为margin-top的高度
                // 40为表头的高度
                let __maxHeight__ = this.mainBodyHeight - this.tableHeightOut - hasPage - 48 - 12 - 16;
                let num = __maxHeight__ > this.actualHeight ? '' : (__maxHeight__ < 48 * this.data.list.length && __maxHeight__ < 48 * 6 ? 48 * 6 : __maxHeight__);
                // console.log('_tableHeight:change = ' + num)
                return num;
            },
        },

		mounted() {
			this.getDictType('sys_workorder_priority')
			this.getDictType('sys_workorder_type')
            this.getDictType('sys_workorder_status')
            this.initMainBodyHeight()
            window.onresize = () => {
                this.initMainBodyHeight();
            }
            waitUntil(()=>{
				this.actualHeightFun();
                return this.calendarConfig.maxMonthInterval;
                // return this.calendarConfig.maxMonthInterval && (this.uploadHeight || !!this.actualHeight);
            },()=>{
				this.daterange = defaultDatePickerValue(this.calendarConfig.maxMonthInterval);
				// this.options = DatePickerOpt(this,'DatePicker',Number(this.calendarConfig.maxMonthInterval));
				// console.log(this.actualHeight)
				this.getWordorderMList()
            });
		},

        destroyed(){
            window.onresize = null;
        },

		methods: {
			...mapMutations([
				'updateLoadingStatus',
			]),
			setOptTime(flag) {
				if (flag) {
					this.daterange = [];
				}
			},
            actualHeightFun() {
                // table实际渲染高度
                if(document.getElementById('bigTableMiddle') && 
                    document.getElementById('bigTableMiddle').getElementsByTagName('table') && 
                    document.getElementById('bigTableMiddle').getElementsByTagName('table').length &&
                    document.getElementById('bigTableMiddle').getElementsByTagName('table')[1].offsetHeight > 0) {
                    this.actualHeight = document.getElementById('bigTableMiddle').getElementsByTagName('table')[1].offsetHeight
                }
                console.log('actualHeight', this.actualHeight)
            },
            changeDivHeight(height){
                this.tableHeightOut = height
            },
            initMainBodyHeight() {
                // console.log(document.getElementById('mainBody').offsetHeight - 16 * 2)
                this.mainBodyHeight = document.body.offsetHeight - 104 - 16 * 2;
            },
			getDictType(type) {
				let obj = {
					type: type,
				}
				sysDict.listData(obj).then(valid.call(this)).then(res => {
					if(res.ok) {
						let data = res.data.data
						if(type == 'sys_workorder_priority') this.columns[5].filters = data
						if(type == 'sys_workorder_type') this.columns[4].filters = data
						if(type == 'sys_workorder_status') this.columns[8].filters = data
					}
				}).catch(errors.call(this)).finally();
			},

			getWordorderMList() {
				this.updateLoadingStatus({isLoading:true});
				let obj = {
					pageSize: this.pageSize,
					pageNo: this.pageNo,
					endTime: this.daterange[1] ? new Date(this.daterange[1]).format('yyyy-MM-dd 23:59:59') : '',
					name: this.compact,
					sort: this.sort,
					startTime: this.daterange[0] ? new Date(this.daterange[0]).format('yyyy-MM-dd 00:00:00') : '',
					status: this.status,
					type: this.type,
					priority: this.priority,
				}
				sysWorkorder.wordorderMList(obj).then(valid.call(this)).then(res => {
					if(res.ok) {
                        this.data = res.data.data;
                        this.uploadHeight = true;
                        this.pageNo=res.data.data.pageNum;
                        this.dataTotal = res.data.data.total
					}
				}).catch(errors.call(this)).finally(()=>{
					this.updateLoadingStatus({isLoading:false});
				});
			},

			onchangeEDate(val) {
				//				this.getWordorderMList()
			},
			onSortChange(val) {
				this.sort = 0
				if(val.order == "normal") this.sort = ''
				if(val.order == 'desc') this.sort = '1'
				this.getWordorderMList()
			},

			filterChange(val) {
				if(val.key == 'status') this.status = val._filterChecked[0]
				if(val.key == 'priority') this.priority = val._filterChecked[0]
				if(val.key == 'type') this.type = val._filterChecked[0]
				this.getWordorderMList()
			},

			selectChange(val) {
				this.btnsNormal1 = []
				let show, close;
				show = val.some(item => item.status == '已提交')
				close = val.some(item => item.status == '已验证')
				if(show) {
					this.btnsNormal1.push({
						class: "bt3",
						text: "批量接收",
						btnClick: () => {
						    this.isAllType = this.modalShow = true
                            this.$Modal.confirm({
                                title: '确认接收',
                                content: '<p>确认关闭当前反馈内容？</p>',
                                onOk: () => {
                                    this.ok();
                                },
                                onCancel: () => {
                                    this.cancel();
                                }
                            });
                        }
					}, )
					this.showIdHandle(val)
				}
				if(close) {
					this.btnsNormal1.push({
						class: "bt3",
						text: "批量关闭",
						btnClick: () => {
                            this.isAllType = this.modalClose = true
                            this.$Modal.confirm({
                                title: '确认关闭',
                                content: '<p>确认关闭当前反馈内容？</p>',
                                onOk: () => {
                                    this.okClose();
                                },
                                onCancel: () => {
                                    this.cancelClose();
                                }
                            });
                        }
					}, )
					this.closeIdHanle(val)
				}
			},

			showIdHandle(val) {
				this.showIds = ''
				val.forEach(item => {
					if(item.status == '已提交') this.showIds += item.id + ','
				})
			},

			closeIdHanle(val) {
				this.closeIds = ''
				val.forEach(item => {
					if(item.status == '已验证') this.closeIds += item.id + ','
				})
			},

			okClose() {
				this.showType = 'close'
				if(this.isAllType) {
					this.editStatusAll(this.closeIds)
					return
				}
				this.editStatusAll(this.singleId)
			},

			cancelClose() {

			},

			ok() {
				this.showType = 'receive'
				if(this.isAllType) {
					this.editStatusAll(this.showIds)
					return
				}
				this.editStatusAll(this.singleId)
			},

			cancel() {

			},

			okResole() {
				this.checkDetailM = false
				this.handleType = 'fixed'
				this.isReject = false
				this.reasonModal = true
				// this.handleWordorder()
			},

			cancelResole() {
				this.handleType = 'willnotfix'
				this.checkDetailM = false
				this.isReject = true
				this.reasonModal = true
			},

			okReason() {
				this.handleWordorder()
			},

			cancelReason() {},

			editStatusAll(id) {
				let obj = {
					id: id,
					status: this.showType
				}
				sysWorkorder.editStatusAll(obj).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$Message.info(res.data.message)
						this.getWordorderMList()
					}
				}).catch(errors.call(this)).finally();
			},

			inputContent(val) {
				this.editorC = val
			},

			handleWordorder() {
				if(this.handleType === 'willnotfix' && !this.editorC.replace(/<\/?.+?\/?>/g, "")) {
					this.$Message.info('请填写不予解决理由')
					this.$refs.reason.visible = true
					this.reasonModal = true
					return
				}
				let obj = {
					id: this.checkInfo.id,
					status: this.handleType,
					content: this.editorC
				}
				// if (this.handleType == 'willnotfix') {
				// obj = Object.assign(obj, {
				//     content: this.editorC
				// })
				// }
				sysWorkorder.handleWordorder(obj).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$Message.info(res.data.message)
						this.getWordorderMList()
					}
				}).catch(errors.call(this)).finally();
			},

			onPageChange(val) {
				this.pageNo = val
				this.getWordorderMList()
			},

			onPageSizeChange(val) {
				this.pageSize = val
				this.getWordorderMList()
			},

			textChange() {
				this.getWordorderMList()
			},

			datafunc() {
				return new Promise((resole, reject) => {

				})
			},
			back() {
				this.isShowDetail = false;
			},
			resetSearch() {
				this.compact = '';
				this.daterange = defaultDatePickerValue(this.calendarConfig.maxMonthInterval);
				this.pageSize= this.$store.state.app.pageSizeGlobal;
				this.pageNo=1;
				this.getWordorderMList()
			}
		},
		watch: {
			$route: {
				handler: function(val, oval) {
					if(val.query.showInfo) {
						this.isShowDetail = true;
					} else {
						this.isShowDetail = false;
					}
				},
				deep: true,
            },
            'data.list': {
                handler(val, oval) {
                    // setTimeout(() => {
                    //     this.actualHeightFun();
                    // }, 100);
                    this.$nextTick(() => {
                        this.actualHeightFun();
                    })
                },
                deep: true
            }
		}
	}
</script>