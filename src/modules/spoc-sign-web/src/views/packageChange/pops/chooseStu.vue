<style lang="less">
	.choose-stu {
		width: 100%;
		background: #fff;
		z-index: 100;
		.page {
			text-align: center;
			padding: 20px 0;
		}
		.v-search-collapse-container {
			padding-left: 0;
		}
		.stu-table {
			border: none;
			.ivu-table td,
			.ivu-table-header th {
				height: 50px !important;
			}
			.ivu-table:before,
			.ivu-table:after {
				display: none;
			}
		}
	}
</style>

<template>
	<div>
		<Modal v-model="stuModal" width="1000" footer-hide :title="$t('modules_spoc_sign_web_src_views_packagechange_pops_choosestu_6832')">
			<div class="choose-stu" v-if="stuModal">
				<!-- <v-search-collapse @search="searchInfo" @reset="resetSearch" style="padding-top: 0;">
                </v-search-collapse> -->
				<Select v-model="stuId" clearable :placeholder="$t('memberlist_memberlist_257')" filterable remote :remote-method="remoteMethod" :loading="loading" style="width: 300px;margin-bottom: 16px;" @on-change="stuChange">
					<Option v-for="(option, index) in options" :value="option.id" :label="option.name" :key="index">
						<CommonIcon type="_sousuox" :size="14" :style="{ marginRight: '12px', display: 'inline-block', verticalAlign: 'middle' }" />
						<span>{{ option.name }}</span>
						<span style="float:right;color:#ccc">{{ option.phone }}</span>
					</Option>
				</Select>
				<Table border max-height="335" stripe :loading="loadingTable" class="stu-table" :columns="courseTableCol" :data="courseTableData" style="width: 100%;"></Table>
				<div class=" page">
					<Page :total="total" size="small" :current="pageNo" :page-size="pageSize" :page-size-opts="[5, 10, 20, 30, 40]" @on-change="pageChange" @on-page-size-change="pageSizeChange" show-elevator show-sizer />
				</div>
			</div>
		</Modal>
	</div>
</template>

<script>
	import vSearchCollapse from '@public/modules/vSearchCollapse';
	import valid, {
		errors,
		htContract,
		common
	} from '../../../libs/request';
	import CommonIcon from '_c/common-icon';
	export default {
		props: {
            officeId:{
                type:String,
                default:'',
            }
        },
		data() {
			return {
				loadingTable: false,
				loading: false,
				options: [],
				stuModal: false,
				stuInfo: {},
				courseTableCol: [{
						title: this.$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5667'),
						key: 'name',
						resizable: true,
						width: null,
					},
					{
						title: this.$t('modules_spoc_sign_web_src_views_approval_approvalnew_5071'),
						key: 'ctNo',
						minWidth: 200,
						resizable: true,
						width: null,
						render: (h, params) => {
							return h('div', params.row.ctNo);
						}
					},
					{
						title: this.$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1642'),
						key: 'signTime',
						resizable: true,
						width: null,
						render: (h, params) => {
							return h('div', params.row.signTime || '-');
						}
					},
					{
						title: this.$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4476'),
						key: 'sellerName',
						resizable: true,
						width: null,
						render: (h, params) => {
							return h('div', params.row.sellerName);
						}
					},
					{
						title: this.$t('classlist_compontents_detailinfo_45'),
						key: 'doAction',
						minWidth: 80,
						resizable: true,
						width: null,
						render: (h, params) => {
							return h('div', [
								h(
									'a', {
										props: {},
										style: {},
										on: {
											click: () => {
												this.$emit('clickAction', params.row, this.stuInfo);
												this.closeModal();
											}
										}
									},
									this.$t('spoc_hootie_web_282')
								)
							]);
						}
					}
				],
				courseTableData: [],
				stuId: '',
				total: 1,
				pageNo: 1,
				pageSize: 20
			};
		},
		components: {
			vSearchCollapse,
			CommonIcon
		},
		mounted() {
			this.pageSize = this.$store.state.app.pageSizeGlobal;
		},
		methods: {
			searchInfo() {
				this.getLists();
			},
			resetSearch() {
				this.stuId = '';
			},
			pageChange(page) {
				this.pageNo = page;
				this.getLists();
			},
			pageSizeChange(size) {
				this.pageSize = size;
				this.pageNo = 1;
				this.getLists();
			},
			getLists() {
				this.loadingTable = true;
				let params = {
					studentId: this.stuId,
					status: 'normal',
					pageNo: this.pageNo,
					pageSize: this.pageSize
				};
				htContract
					.listContractsWithJwTeacher(params)
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							this.courseTableData = res.data.data.list || [];
							this.pageNo = res.data.data.pageNum || 1;
							this.total = res.data.data.total || 0;
						}
					})
					.catch(errors.call(this))
					.finally(() => {
						this.loadingTable = false;
					});
			},
			showModal() {
				this.stuModal = true;
			},
			closeModal() {
				this.stuModal = false;
				this.$emit('close');
			},
			remoteMethod(query) {
				if(query !== '') {
					this.loading = true;
					let params = {
						name: query,
                        officeId:this.officeId
					};
					common
						.listByOfficeIdAndName(params)
						.then(valid.call(this))
						.then(res => {
							if(res.ok) {
								this.options = res.data.data;
							}
						})
						.catch(errors.call(this))
						.finally(() => {
							this.loading = false;
						});
				} else {
					this.options = [];
				}
			},
			stuChange(val) {
				this.options.forEach(v => {
					if(v.id == val) {
						this.stuInfo = v;
					}
				});
				if(this.stuId){
					this.searchInfo();
				}
			}
		}
	};
</script>
