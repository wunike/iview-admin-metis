<style lang="less">
	.approval-set-container {
		height: 100%;
		width: 100%;
		.ivu-table-header {
			th {
				height: 50px;
			}
		}
		.ivu-table-tbody {
			td {
				height: 50px;
			}
		}
		.approval {
			position: relative;
			color: #495060;
			padding-left: 8px;
			&::before {
				position: absolute;
				display: block;
				content: '';
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
				background: #46BC15;
			}
		}
		.approval-2 {
			.approval;
			&::before {
				background: #999999;
			}
		}
		.valid-approval {
			padding: 20px 22px 20px 10px;
			background: #fff;
			.va-header {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: flex-end;
				margin-bottom: 12px;
				h2 {
					font-size: 16px;
					font-weight: 500;
					color: rgba(73, 80, 96, 1);
				}
			}
		}
		.invalid-approval {
			margin-top: 10px;
		}
	}
</style>

<template>
	<div class="approval-set-container">
		<div class="valid-approval">
			<div class="va-header">
				<h2>{{$t('views_approvalnotice_approvalset_index_293')}}</h2>
				<Button style="font-size: 14px;" type="primary" @click="addApprovalFn('add')">{{$t('views_approvalnotice_approvalset_addapproval_284')}}</Button>
			</div>
			<Table border :columns="cols" :data="data"></Table>
		</div>
		<div class="valid-approval invalid-approval">
			<div class="va-header">
				<h2>{{$t('views_approvalnotice_approvalset_index_295')}}</h2>
			</div>
			<Table border :columns="cols1" :data="data1"></Table>
		</div>
		<addApproval @refreshList="getLists" ref="addApproval"></addApproval>
	</div>

</template>

<script>
	/**
	 **@date: 2019/6/11 14:08
	 **@author: lizhi
	 **@filename: index.vue
	 */
	import addApproval from './approvalSet/addApproval.vue'
	import { common, sysUser } from '@public/libs/request'
	import valid, {
		errors
	} from '../../libs/request';
	import { mapMutations } from 'vuex';
	export default {
		name: 'core.approvalSet',
		data() {
			return {
				ifSysUser: '1',
				titleName: this.$t('views_approvalnotice_approvalset_index_296'),
				cols: [{
						title: this.$t('views_approvalnotice_approvalset_index_297'),
						key: 'name',
						minWidth: 150,
						width:null,
						resizable:true,
						render: (h, params) => {
							return h('div', [
								h('span', {}, params.row.name),
								h('span', {
										style: {
											display: 'inline-block',
											padding: '0px 6px',
											fontSize: '12px',
											textAlign: 'center',
											background: params.row.isSys === '1' ? 'rgba(65, 167, 22, .6)' : params.row.isSys === '0' ? 'rgba(46, 125, 224, .6)' : '',
											borderRadius: '4px',
											marginLeft: '6px',
											color: '#fff',
										}
									},
									params.row.isSys === '1' ? this.$t('views_approvalnotice_approvalset_index_298') :
									params.row.isSys === '0' ? this.$t('views_approvalnotice_approvalset_index_299') : ''
								)
							])
						}
					},
					{
						title: this.$t('views_approvalnotice_approvalset_index_300'),
						key: 'officeNames',
						minWidth: 250,
						width:null,
						resizable:true,
						render: (h, params) => {
							return h('div', [
								h('span', {}, params.row.isAllOffice === '1' ? this.$t('views_approvalnotice_approvalset_addapproval_288') : params.row.officeNames),
							])
						}
					},
					{
						title: this.$t('views_approvalnotice_approvalset_index_302'),
						key: 'remarks',
						minWidth: 150,
						width:null,
						resizable:true,
						tooltip: true,
					},
					{
						title: this.$t('views_approvalnotice_approvalset_index_303'),
						key: 'flowDescription',
						minWidth: 200,
						width:null,
						resizable:true,
					},
					{
						title: this.$t('views_approvalnotice_approvalset_addapproval_280'),
						key: 'flowLevel',
						width: 120,
						resizable:true,
					},
					{
						title: this.$t('views_approvalnotice_approvalset_index_305'),
						key: 'isEnable',
						width: 150,
						resizable:true,
						render: (h, params) => {
							return h('span', {
									class: params.row.isEnable === '1' ?
										'approval-1' : params.row.isEnable === '0' ?
										'approval-2' : ''
								},
								params.row.isEnable === '1' ? this.$t('scoretemplate_scoretemplate_559') :
								params.row.isEnable === '0' ? this.$t('scoretemplate_scoretemplate_558') : ''
							)
						}
					},
					{
						title: this.$t('integralflow_4'),
						key: 'doAction',
						width: 150,
						render: (h, params) => {
							return h('div', {
								style: {
									display: 'flex',
									'flex-direction': 'row',
									'justify-content': 'flex-start',
									'align-items': 'center'
								}
							}, [
								h('a', {
									style: {
										'margin-right': '10px',
                                        color: params.row.isSys === this.ifSysUser && this.ifSysUser == '0' || this.ifSysUser === '1'
                                            ? '' : '#999',
                                        cursor:params.row.isSys === this.ifSysUser && this.ifSysUser == '0' || this.ifSysUser === '1'
                                            ? 'pointer' :'default',
									},
									on: {
										click: () => {
											if(params.row.isSys === this.ifSysUser && this.ifSysUser == '0' || this.ifSysUser === '1') {
												this.addApprovalFn('re', params.row)
											} else {
												// this.$Message.warning(this.$t('views_approvalnotice_approvalset_index_309'))
											}
										}
									}
								}, this.$t('modules_expandrow_15')),
								h('a', {
									style: {
										'margin-right': '12px',
                                        color: params.row.isSys === this.ifSysUser && this.ifSysUser == '0' || this.ifSysUser === '1'
                                            ? '' : '#999',
                                        cursor:params.row.isSys === this.ifSysUser && this.ifSysUser == '0' || this.ifSysUser === '1'
                                            ? 'pointer' :'default',

                                    },
									on: {
										click: () => {
											if(params.row.isSys === this.ifSysUser && this.ifSysUser == '0' || this.ifSysUser === '1') {
												this.addApprovalFn('set', params.row)
											} else {
												// this.$Message.warning(this.$t('views_approvalnotice_approvalset_index_309'))
											}

										}
									}

								}, this.$t('views_approvalnotice_approvalset_index_311')),
								h('a', {
									style: {
                                        color: params.row.isSys == '1' ? '#999' :'',
                                        cursor:params.row.isSys == '1' ? 'default' :'pointer',
									},
									on: {
										click: () => {
											if(params.row.isSys == '0') {
												this.$Modal.confirm({
													title: this.$t('views_approvalnotice_approvalset_index_312'),
													content: '<p style="color:#F5222D;font-size:14px;">' + this.$t('views_approvalnotice_approvalset_index_313') + '</p>' +
														'<p style="font-size:14px;">' + this.$t('views_approvalnotice_approvalset_index_314') + '</p>',
													onOk: () => {
														this.$refs.addApproval.changeEnableFn(params.row, params.row.isEnable)
													},
													onCancel: () => {
														this.$refs.addApproval.reset()
													}
												});
											} else {
												// this.$Message.warning(this.$t('views_approvalnotice_approvalset_index_309'))
											}

										}
									}
								}, this.$t('scoretemplate_scoretemplate_558')),
							])
						}
					},

				],
				data: [],
				cols1: [{
						title: this.$t('views_approvalnotice_approvalset_index_297'),
						key: 'name',
						minWidth: 150,
						width:null,
						resizable:true,
						render: (h, params) => {
							return h('div', [
								h('span', {}, params.row.name),
								h('span', {
										style: {
											display: 'inline-block',
											padding: '0px 6px',
											fontSize: '12px',
											textAlign: 'center',
											background: params.row.isSys === '1' ? 'rgba(65, 167, 22, .6)' : params.row.isSys === '0' ? 'rgba(46, 125, 224, .6)' : '',

											borderRadius: '4px',
											marginLeft: '6px',
											color: '#fff',
										}
									},
									params.row.isSys === '1' ? this.$t('views_approvalnotice_approvalset_index_298') :
									params.row.isSys === '0' ? this.$t('views_approvalnotice_approvalset_index_299') : ''
								)
							])
						}
					},
					{
						title: this.$t('views_approvalnotice_approvalset_index_300'),
						key: 'officeNames',
						minWidth: 250,
						width:null,
						resizable:true,
						render: (h, params) => {
							return h('div', [
								h('span', {}, params.row.isAllOffice === '1' ? this.$t('views_approvalnotice_approvalset_addapproval_288') : params.row.officeNames),
							])
						}
					},
					{
						title: this.$t('views_approvalnotice_approvalset_index_302'),
						key: 'remarks',
						minWidth: 150,
						width:null,
						resizable:true,
						tooltip: true,
					},
					{
						title: this.$t('views_approvalnotice_approvalset_index_303'),
						key: 'flowDescription',
						minWidth: 200,
						width:null,
						resizable:true,
					},
					{
						title: this.$t('views_approvalnotice_approvalset_addapproval_280'),
						key: 'flowLevel',
						width: 120,
						resizable:true,
					},
					{
						title: this.$t('views_approvalnotice_approvalset_index_305'),
						key: 'isEnable',
						width: 150,
						resizable:true,
						render: (h, params) => {
							return h('span', {
									class: params.row.isEnable === '1' ?
										'approval-1' : params.row.isEnable === '0' ?
										'approval-2' : ''
								},
								params.row.isEnable === '1' ? this.$t('scoretemplate_scoretemplate_559') :
								params.row.isEnable === '0' ? this.$t('scoretemplate_scoretemplate_558') : ''
							)
						}
					},
					{
						title: this.$t('integralflow_4'),
						key: 'doAction',
						width: 150,
						render: (h, params) => {
							return h('div', {
								style: {
									display: 'flex',
									'flex-direction': 'row',
									'justify-content': 'flex-start',
									'align-items': 'center'
								}
							}, [
								h('a', {
									style: {
										'margin-right': '10px',
                                        color: params.row.isSys === this.ifSysUser && this.ifSysUser == '0' || this.ifSysUser === '1'
                                            ? '' : '#999',
                                        cursor:params.row.isSys === this.ifSysUser && this.ifSysUser == '0' || this.ifSysUser === '1'
                                            ? 'pointer' :'default',
									},
									on: {
										click: () => {
											if(params.row.isSys === this.ifSysUser && this.ifSysUser == '0' || this.ifSysUser === '1') {
												this.addApprovalFn('re', params.row)
											} else {
												// this.$Message.warning(this.$t('views_approvalnotice_approvalset_index_309'))
											}

										}
									}
								}, this.$t('modules_expandrow_15')),
								h('a', {
									style: {
										'margin-right': '10px',
                                        color: params.row.isSys === this.ifSysUser && this.ifSysUser == '0' || this.ifSysUser === '1'
                                            ? '' : '#999',
                                        cursor:params.row.isSys === this.ifSysUser && this.ifSysUser == '0' || this.ifSysUser === '1'
                                            ? 'pointer' :'default',
									},
									on: {
										click: () => {
											if(params.row.isSys === this.ifSysUser && this.ifSysUser == '0' || this.ifSysUser === '1') {
												//                                                console.log('909')
												this.addApprovalFn('set', params.row)
											} else {
												//                                                console.log('901')
												// this.$Message.warning(this.$t('views_approvalnotice_approvalset_index_309'))
											}
										}
									}
								}, this.$t('views_approvalnotice_approvalset_index_311')),
								h('a', {
									style: {
                                        color: params.row.isSys === this.ifSysUser && this.ifSysUser == '0' || this.ifSysUser === '1'
                                            ? '' : '#999',
                                        cursor:params.row.isSys === this.ifSysUser && this.ifSysUser == '0' || this.ifSysUser === '1'
                                            ? 'pointer' :'default',
                                    },
									on: {
										click: () => {
											if(params.row.isSys === this.ifSysUser && this.ifSysUser == '0' || this.ifSysUser === '1') {
												this.$refs.addApproval.changeEnableFn(params.row, params.row.isEnable)
											} else {
												// this.$Message.warning(this.$t('views_approvalnotice_approvalset_index_309'))
											}
										}
									}
								}, this.$t('scoretemplate_scoretemplate_559')),
							])
						}
					},

				],
				data1: [],
			}
		},
		components: {
			addApproval
		},
		computed: {

		},
		mounted() {
			this.getLists()
			this.getUserRight()
		},
		methods: {
			...mapMutations(['updateLoadingStatus']),
			getUserRight() { //判断登录用户类型
				sysUser.userInfoData()
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							this.ifSysUser = res.data.data.admin ? '1' : '0'
						}
					})
					.catch(errors.call(this))
			},
			getLists() {
				this.updateLoadingStatus({
					isLoading: true
				});
				let params = {

				}
				common.listPage(params)
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							let list = res.data.data.list
							let listD1 = [] //有效
							let listD2 = [] //无效

							for(let i in list) {
								if(list[i].isEnable === '0') {
									listD2.push(list[i])
								} else if(list[i].isEnable === '1') {
									listD1.push(list[i])
								}
							}
							this.data = listD1
							this.data1 = listD2

						}
					})
					.catch(errors.call(this))
					.finally(() => {
						this.updateLoadingStatus({
							isLoading: false
						});
					});
			},
			addApprovalFn(type, row) {
				this.titleName = type
				this.$refs.addApproval.showPop({
					row: row,
					type: type
				})
			},
			//改变页码
			pageChange(page) {
				this.pageNo = page
				this.getTableDatas()
			},
			// 改变table单页显示数
			sizeChange(size) {
				this.pageSize = size
				this.getTableDatas()
			},
			changeEnable(id, ifEnable) {
				let params = {}
				params.id = id
				params.isEnable = ifEnable
				common.save(params)
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							//                        this.$Message.success('保存成功!')
							this.getLists()
						}

					})
					.catch(errors.call(this))
			},
		},
	}
</script>