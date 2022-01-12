<style lang="less">
@comColor: #495060;
.flex-row {
	display: flex;
	flex-direction: row;
}
.performance-allocation {
	.ivu-modal-footer .ivu-btn-text {
		border: 1px solid rgb(220, 222, 226);
	}
	.ivu-modal-footer .ivu-btn-text:hover {
		border: 1px solid rgb(220, 222, 226);
	}

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
	.ivu-input {
		font-size: 14px !important;
	}
	.ivu-modal-footer {
		padding: 10px 24px !important;
	}
	.ivu-input-group-append {
		width: 34px !important;
	}

	.ivu-modal-body {
		font-size: 14px !important;
		color: @comColor;
	}
	.ivu-table-header {
		th {
			height: 50px !important;
		}
	}
	.ivu-table-tbody {
		td {
			height: 40px !important;
		}
	}
	b {
		font-weight: normal;
	}
	em {
		font-style: normal;
	}
	.pa-top {
		width: 100%;
		margin-bottom: 20px;
		padding: 10px;
		background: #f7f8fa;
	}
	.item-line {
		width: 100%;
		margin-bottom: 16px;
		.flex-row;
		justify-content: flex-start;
		align-items: center;
		&:nth-last-of-type(1) {
			margin-bottom: 0;
		}
		div {
			&:nth-child(1) {
				width: 217px + 26px;
			}
			&:nth-child(2) {
				width: 240px + 24px;
			}
			&:nth-child(3) {
				width: 213px;
			}
			height: 20px;
			font-size: 14px;
			color: @comColor;
			span {
				color: #999;
			}
		}
	}
	// 恢复
	.pa-bottom {
		width: 100%;
		min-height: 208px;
		.flex-row;
		justify-content: space-between;
		align-items: stretch;
	}
	.pa-c {
		width: 370px;
		border: 1px solid #d4d5da;
		h2 {
			height: 50px;
			line-height: 50px;
			font-weight: normal;
			font-size: 14px;
			padding-left: 16px;
			border-bottom: 1px solid #d4d5da;
			em {
				color: #ff3000;
				padding-right: 3px;
			}
		}
	}
	.left-item-box,
	.right-item-box {
		padding: 3px 16px 11px 16px;
	}
	.item-box-item {
		height: 32px;
		.flex-row;
		justify-content: flex-start;
		align-items: center;
		margin-top: 8px;
	}
	.add-prev {
		height: 32px;
		width: 34px;
		.flex-row;
		justify-content: space-between;
		align-items: center;
		i {
			cursor: pointer;
			color: #999;
			&:hover {
				color: #44bcb7;
			}
		}
	}
	.price-content {
		width: 122px;
		margin-right: 12px;
		.ivu-input-number {
			float: left;
			border-top-right-radius: 0;
			border-bottom-right-radius: 0;
		}
		.price-right {
			float: left;
			width: 34px;
			height: 32px;
			text-align: center;
			line-height: 32px;
			border-radius: 0 4px 4px 0;
			border: 1px solid #dcdee2;
			background-color: #f8f8f9;
			border-left: none;
		}
	}
}
</style>

<template>
	<div class="choose-contract-container">
		<Modal
			class="performance-allocation"
			width="800"
			v-model="performanceAllocationModal"
			:mask-closable="false"
			@on-cancel="cancel"
			:title="$t('sign.performanceAllocation')"
		>
			<div class="pa-top">
				<div class="item-line">
					<div>
						<span>{{$t('modules_spoc_sign_web_src_views_receiptmanagement_components_performanceallocation_7008')}}</span>
						<b>{{infos.no || '-'}}</b>
					</div>
					<div>
						<span>{{$t('modules_spoc_sign_web_src_views_receiptmanagement_components_performanceallocation_7009')}}</span>
						<a @click="goDetail(infos)" v-if="infos.ctNo">{{infos.ctNo}}</a>
						<span v-else>-</span>
					</div>
					<div>
						<span>{{$t('modules_spoc_sign_web_src_views_receiptmanagement_components_performanceallocation_7010')}}</span>
						<b>{{infos.financeReceiptTime || '-'}}</b>
					</div>
				</div>
				<div class="item-line">
					<div>
						<span>{{$t('modules_spoc_sign_web_src_views_receiptmanagement_components_addnewpayment_6971')}}</span>
						<b>{{infos.typeLabel || '-'}}</b>
					</div>
					<div>
						<span>{{$t('modules_spoc_sign_web_src_views_receiptmanagement_components_addnewpayment_6974')}}</span>
						<b>{{infos.curReceipt ? formatNums(infos.curReceipt) : '-' }} {{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</b>
					</div>
					<div>
						<span>{{$t('modules_spoc_sign_web_src_views_receiptmanagement_components_addnewpayment_6973')}}</span>
						<b>{{infos.voucherNo || '-'}}</b>
					</div>
				</div>
				<div class="item-line">
					<div>
						<span>{{$t('modules_spoc_sign_web_src_views_receiptmanagement_components_addnewpayment_6977')}}</span>
						<b>{{infos.businessTypeLabel || '-'}}</b>
					</div>
					<div>
						<span>{{$t('modules_spoc_sign_web_src_views_receiptmanagement_components_addnewpayment_6975')}}</span>
						<b>{{infos.receiptTime || '-'}}</b>
						<!-- <b>{{infos.arrivalTime || '-'}}</b> -->
					</div>
					<div>
						<span>{{$t('classroom_exchange_96')}}</span>
						<a>{{infos.studentName || '-'}}</a>
					</div>
				</div>
				<div class="item-line">
					<div>
						<span>{{$t('modules_spoc_sign_web_src_views_receiptmanagement_components_performanceallocation_7018')}}</span>
						<b>{{mainOffice.name || '-'}}</b>
					</div>
					<div>
						<span>{{$t('modules_spoc_sign_web_src_views_receiptmanagement_components_performanceallocation_7019')}}</span>
						<b>{{mainUser.name || '-'}}</b>
					</div>
				</div>
			</div>
			<div class="pa-bottom">
				<div class="pab-left pa-c">
					<h2>
						<em>*</em>
						<span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_responsibility_5057')}}</span>
					</h2>
					<div class="left-item-box">
						<div class="item-box-item" v-for="(one,index) in officeLists" :key="index">
							<Select
								:placeholder="$t('modules_spoc_crm_web_src_views_clientareaaround_clientareaaround_781')"
								:disabled="one.isMain == '1'"
								@on-change="changeOfficeId"
								v-model="one.officeId"
								clearable
								style="width:160px;margin-right:8px;"
							>
								<Option
									v-for="item in schoolList"
									v-show="checkOfficeId.indexOf(item.id) == -1"
									:value="item.id"
									:key="item.id"
								>{{ item.name }}</Option>
							</Select>
							<div class="price-content">
								<InputNumber
									v-model="one.officePrice"
									:min="0"
									:precision="2"
									:active-change="false"
								/>
								<span
									class="price-right"
								>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</span>
							</div>
							<div class="add-prev">
								<i
									class="iconfont icon-zhuanzerenren"
									@click="updateHtRecepit(one, index, 'office')"
									v-if="one.isMain == '0'"
								></i>
								<Icon
									@click="addOfficeItem"
									v-if="officeLists.length < 2 || (index === officeLists.length - 1 && officeLists.length > 1) "
									type="md-add-circle"
								/>
								<Icon
									@click="delOfficeItem(index, one.officeId)"
									v-if="index >= 1"
									type="md-remove-circle"
								/>
							</div>
						</div>
					</div>
				</div>
				<div class="pab-right pa-c">
					<h2>
						<em>*</em>
						<span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_responsibility_5060')}}</span>
					</h2>
					<div class="right-item-box">
						<div class="item-box-item" v-for="(one,index) in userLists" :key="index">
							<Select
								:placeholder="$t('modules_spoc_sign_web_src_views_receiptmanagement_components_performanceallocation_7024')"
								:disabled="one.isMain == '1'"
								v-model="one.userId"
								clearable
								filterable
								style="width:160px;margin-right:8px;"
							>
								<Option
									v-for="(item, childIndex) in teacherList"
									v-show="checkUserId.indexOf(item.userId) == -1"
									:value="item.userId"
									:key="childIndex"
								>{{ item.name }}-{{item.officeName}}</Option>
							</Select>
							<div class="price-content">
								<InputNumber
									v-model="one.userPrice"
									:min="0"
									:precision="2"
									:active-change="false"
									style="width: 88px;"
								/>
								<span
									class="price-right"
								>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</span>
							</div>
							<div class="add-prev">
								<i
									class="iconfont icon-zhuanzerenren"
									@click="updateHtRecepit(one, index, 'user')"
									v-if="one.isMain == '0'"
								></i>
								<Icon
									@click="addUserItem"
									v-if="userLists.length < 2 || (index === userLists.length - 1 && userLists.length > 1) "
									type="md-add-circle"
								/>
								<Icon @click="delUserItem(index)" v-if="index >= 1" type="md-remove-circle" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div slot="footer">
				<Button type="primary" @click="submit">{{$t('classroom_allscore_54')}}</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
import valid, {
	errors,
	htReceipt,
	sysUser,
	sysCommonSql,
} from "../../../libs/request";
import { MENUIDS } from "@public/libs/config";
export default {
	name: "performanceAllocationModal",
	data() {
		return {
			pId: null,
			performanceAllocationModal: false,
			infos: {},
			officeLists: [],
			officeListsItem: {
				officeId: "",
				officePrice: null,
				isMain: "0",
			},
			schoolList: [],
			userLists: [],
			userListsItem: {
				userId: "",
				userPrice: null,
				isMain: "0",
			},
			teacherList: [],
			id: "",
			type: "",
			mainOffice: {
				id: "",
				name: "",
			},
			mainUser: {
				id: "",
				name: "",
			},
			isMianIsChange: false, //主要责任人是否修改
		};
	},
	computed: {
		checkOfficeId() {
			let _arr = this.officeLists.map((item) => {
				return item.officeId;
			});
			return _arr;
		},
		checkUserId() {
			let _arr = this.userLists.map((item) => {
				return item.userId;
			});
			return _arr;
		},
	},
	mounted() {
		this.pId = MENUIDS.SIGN;
	},
	methods: {
		showPop(id, type) {
			// console.log(id, type)
			this.officeLists = [];
			this.userLists = [];
			this.isMianIsChange = false;
			this.id = id;
			this.type = type || "";
			this.dataScopeFilter();
			this.performanceAllocationModal = true;
			this.getForm();
		},
		getForm() {
			htReceipt
				.form({ id: this.id })
				.then(valid.call(this))
				.then((res) => {
					if (res.ok) {
						let _data = res.data.data;
						this.infos = _data;
						this.mainOffice = {
							id: _data.receiptInOfficeId,
							name: _data.receiptInOfficeName,
						};
						this.mainUser = {
							id: _data.receiptInUserId,
							name: _data.receiptInUserName,
						};
						let _officeList =
							_data.htReceiptDetailPartnerShowVO.officeList;
						let _userList =
							_data.htReceiptDetailPartnerShowVO.userList;
						// 校区
						if (_officeList && _officeList.length) {
							let _arr = [];
							_officeList.forEach((item) => {
								item.officePrice = Number(item.officePrice);
								if (item.isMain == "1") {
									_arr.unshift(item);
								} else {
									_arr.push(item);
								}
							});
							this.officeLists = _arr;
							this.changeOfficeId();
						} else {
							this.officeLists = [
								{
									officeId: _data.receiptInOfficeId || "",
									officePrice: null,
									isMain: "1",
								},
							];
						}
						// 教师
						if (_userList && _userList.length) {
							let _arr = [];
							_userList.forEach((item) => {
								item.userPrice = Number(item.userPrice);
								item.userId = item.userId + "_" + item.officeId; // 用户ID+校区ID
								if (item.isMain == "1") {
									_arr.unshift(item);
								} else {
									_arr.push(item);
								}
							});
							this.userLists = _arr;
						} else {
							let _userId =
								_data.receiptInUserId +
								"_" +
								_data.receiptInOfficeId;
							this.userLists = [
								{
									userId: _userId,
									officeId: _data.receiptInOfficeId,
									officeName: _data.receiptInOfficeName,
									userName: _data.receiptInUserName,
									userPrice: null,
									isMain: "1",
								},
							];
						}
					}
				})
				.catch(errors.call(this));
		},
		formatNums(val) {
			//格式化数字
			// if(val !== undefined){
			//     let newNum = Number(val).toFixed(2).toString();
			//     let prev = newNum.split('.')[0]
			//     let next = newNum.split('.')[1]
			//     prev = prev.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
			//     newNum = prev+'.'+ next;
			//     return newNum;
			// }
			return val || 0;
		},
		cancel() {
			this.performanceAllocationModal = false;
		},
		submit() {
			// 前端验证
			let _officeLists = [],
				_userList = [];
			let __mainOfficeId = "",
				__mainUserId = "";

			// 校区分配
			let countNumOffice = 0;
			this.officeLists.forEach((item) => {
				if (item.isMain == "1") {
					// 判断主责任校区是否修改
					__mainOfficeId = item.officeId;
					if (item.officeId != this.infos.receiptInOfficeId) {
						this.isMianIsChange = true;
					}
					// 判断主责人校区金额是否存在，如果金额被情况，改为0
					if (item.officePrice == null) {
						item.officePrice = 0;
					}
					// 计算总金额
					countNumOffice += item.officePrice;
					// console.log(item.officePrice);
					_officeLists.push({
						officeId: item.officeId,
						officePrice: item.officePrice,
					});
				// } else if (item.officeId && item.officePrice) {
				} else if (item.officeId) {
					if(!item.officePrice){
						item.officePrice = 0
					}
					// 计算总金额
					countNumOffice += item.officePrice;
					// console.log(item.officePrice);
					_officeLists.push({
						officeId: item.officeId,
						officePrice: item.officePrice,
					});
				}
				// delete item.isMain;
			});
			if (countNumOffice != this.infos.curReceipt) {
				// 校区责任总金额必须等于合同收款金额
				this.$Modal.error({
					title: this.$t('classlist_classlist_12'),
					content: this.$t(
						"modules_spoc_sign_web_src_views_applyrefund_applyrefund_4994"
					)
				});
				return false;
			}
			// 个人责任
			let countNumUser = 0;
			let userByOfficeGroup = {}; // 个人分配金额校区分组
			this.userLists.forEach((item) => {
				let _userId = item.userId.split("_")[0]; // 从用户——校区ID中截取用户ID
				let _officeId = item.userId.split("_")[1]; // 从用户——校区ID中截取校区ID
				if (item.isMain == "1") {
					// 判断主责任校区是否修改
					__mainUserId = _userId;
					if (_userId != this.infos.receiptInUserId) {
						this.isMianIsChange = true;
					}
					// 判断主责人校区金额是否存在，如果金额被情况，改为0
					if (item.userPrice == null) {
						item.userPrice = 0;
					}
					// 计算总金额
					countNumUser += item.userPrice;

					if (userByOfficeGroup[_officeId]) {
						userByOfficeGroup[_officeId] += item.userPrice;
					} else {
						userByOfficeGroup[_officeId] = item.userPrice;
					}
					// console.log(item.userPrice);
					_userList.push({
						userId: _userId,
						userPrice: item.userPrice,
						officeId: _officeId,
					});
				} else if (_userId && item.userPrice) {
					// 计算总金额
					countNumUser += item.userPrice;
					if (userByOfficeGroup[_officeId]) {
						userByOfficeGroup[_officeId] += item.userPrice;
					} else {
						userByOfficeGroup[_officeId] = item.userPrice;
					}
					// console.log(item.userPrice);
					_userList.push({
						userId: _userId,
						userPrice: item.userPrice,
						officeId: _officeId,
					});
				}
				// delete item.isMain;
			});
			// 屏蔽掉该段判断。目前校区所属个人总和可以超过校区
			// let personByOfficeFlag = false;
			// for (let key in userByOfficeGroup) {
			// 	let obj = _officeLists.find((item) => {
			// 		return item.officeId == key;
			// 	});
			// 	if (obj && obj.officePrice) {
			// 		if (userByOfficeGroup[key] > obj.officePrice) {
			// 			personByOfficeFlag = true;
			// 		}
			// 	}
			// }
			// if (personByOfficeFlag) {
			// 	// 个人责任金额不能大于隶属校区责任金额
			// 	this.$Modal.error({
			// 		title: this.$t('classlist_classlist_12'),
			// 		content: this.$t(
			// 			"modules_spoc_sign_web_src_views_applyrefund_applyrefund_49951"
			// 		)
			// 	});
			// 	return false;
			// }
			if (countNumUser > this.infos.curReceipt) {
				// 个人责任总金额不能大于合同收款金额
				this.$Modal.error({
					title: this.$t('classlist_classlist_12'),
					content: this.$t(
						"modules_spoc_sign_web_src_views_applyrefund_applyrefund_4995"
					)
				});
				return false;
			}
			// 执行业绩分配
			this.receiptAllocation(
				_officeLists,
				_userList,
				__mainOfficeId,
				__mainUserId
			);
		},
		receiptAllocation(
			_officeLists,
			_userList,
			__mainOfficeId,
			__mainUserId
		) {
			// 提交业绩分配
			let params = {
				id: this.id,
				htReceiptDetailPartnerShowVO: {
					officeList: _officeLists.map((item) => {
						return {
							officeId: item.officeId,
							officePrice: item.officePrice,
						};
					}),
					userList: _userList.map((item) => {
						return {
							userId: item.userId,
							officeId: item.officeId,
							userPrice: item.userPrice,
						};
					}),
				},
			};
			params.receiptTime = this.infos.receiptTime
			// console.log(params);
			htReceipt
				.receiptAllocation(params)
				.then(valid.call(this))
				.then((res) => {
					if (res.ok) {
						if (this.isMianIsChange) {
							this.submitHtRecepit(__mainOfficeId, __mainUserId);
						} else {
							this.$Message.success(
								this.$t(
									"scoretemplate_compontents_scoremodify_550"
								)
							);
							this.$emit("goBack", this.type, this.id);
							this.cancel();
						}
					}
				})
				.catch(errors.call(this));
		},
		addOfficeItem() {
			this.officeLists.push(Object.assign({}, this.officeListsItem));
		},
		delOfficeItem(index, officeId) {
			if (this.officeLists.length > 1) {
				this.officeLists.splice(index, 1);
			}
			if (officeId) {
				let userLists = [];
				this.userLists.forEach((item) => {
					let _officeId = item.userId.split("_")[1];
					if (_officeId != officeId) {
						userLists.push(item);
					}
				});
				this.userLists = userLists;
			}
			this.changeOfficeId()
		},
		addUserItem() {
			this.userLists.push(Object.assign({}, this.userListsItem));
		},
		delUserItem(index) {
			if (this.userLists.length > 1) {
				this.userLists.splice(index, 1);
			}
		},
		dataScopeFilter() {
			// 获取校区列表
			// sysUser.dataScopeFilter({
			// 	menuId: this.pId
			// })
			sysCommonSql
				.querySingleTableData({
					searchField: "type",
					searchFieldParam: "3",
					mainTable: "sys_office",
					field1: "name",
				})
				.then(valid.call(this))
				.then((res) => {
					if (res.ok) {
						this.schoolList = res.data.data;
					}
				})
				.catch(errors.call(this));
		},
		changeOfficeId() {
			let officeIds = [];
			this.officeLists.forEach((list) => {
				let _id = list.officeId;
				if (_id && officeIds.indexOf(_id) == -1) {
					officeIds.push(_id);
				}
			});
			if (officeIds && officeIds.length) {
				let params = {
					officeIds: officeIds.join(","),
					// joinScope: 'ads,jur,cro'
					joinScope: "ads,cro",
				};
				this.listPageOfficeScopeUser(params);
			}
		},
		listPageOfficeScopeUser(params) {
			sysUser
				.listPageOfficeScopeUser(params)
				.then(valid.call(this))
				.then((res) => {
					if (res.ok) {
						let _data = res.data.data;
						_data.forEach((item) => {
							// 这里只有id。没有userId。需要转换
							item.userId = item.id + "_" + item.officeId;
						});
						this.teacherList = _data;
						// this.$set(this, "teacherList", _data);
					}
				})
				.catch(errors.call(this));
		},
		goDetail(pay) {
			// console.log(pay)
			this.$router.push({
				name: "sign.pactDetails",
				query: {
					id: pay.ctId,
					ctNo: pay.ctNo,
				},
			});
		},
		updateHtRecepit(item, index, type) {
			// 修改主要责任人
			// type: 'office' || 'user'
			if (type == "office") {
				if (item.officeId) {
					let _curr = this.officeLists.splice(index, 1)[0];
					let _mainOffice = this.schoolList.filter((item) => {
						return item.id == _curr.officeId;
					})[0];
					this.mainOffice = {
						id: _mainOffice.id,
						name: _mainOffice.name,
					};
					this.officeLists.unshift(_curr);
					this.officeLists.forEach((list) => {
						list.isMain = "0";
					});
					this.officeLists[0].isMain = "1";
				} else {
					this.$Modal.error({
						title: this.$t('classlist_classlist_12'),
						content: this.$t(
							"modules_spoc_sign_web_src_views_applyrefund_components_responsibility_5062"
						)
					});
				}
			} else {
				if (item.userId) {
					let _curr = this.userLists.splice(index, 1)[0];
					let _mainUser = this.teacherList.filter((item) => {
						return item.userId == _curr.userId;
					})[0];
					this.mainUser = {
						id: _mainUser.userId.split("_")[0],
						name: _mainUser.name,
					};
					this.userLists.unshift(_curr);
					this.userLists.forEach((list) => {
						list.isMain = "0";
					});
					this.userLists[0].isMain = "1";
				} else {
					this.$Modal.error({
						title: this.$t('classlist_classlist_12'),
						content: this.$t(
							"modules_spoc_sign_web_src_views_applyrefund_components_responsibility_5063"
						)
					});
				}
			}
		},
		submitHtRecepit(__mainOfficeId, __mainUserId) {
			// 提交修改主要责任人
			let params = {
				ctId: this.infos.ctId,
				type: "0",
				officeId: __mainOfficeId,
				userId: __mainUserId,
			};
			htReceipt
				.updateHtRecepitOfficeIdAndUserId(params)
				.then(valid.call(this))
				.then((res) => {
					if (res.ok) {
						this.$Message.success(
							this.$t("scoretemplate_compontents_scoremodify_550")
						);
						this.$emit("goBack", this.type, this.id);
						this.cancel();
					}
				})
				.catch(errors.call(this));
		},
	},
};
</script>
