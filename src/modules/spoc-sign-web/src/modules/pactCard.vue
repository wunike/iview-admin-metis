<style lang="less">
	.pactcard-list {
		.is-open-invoice {
			position: absolute;
			right: 93px;
			bottom: 96px;
			.text {
				font-size: 14px;
				position: absolute;
				left: 13px;
				top: 8px;
			}
		}
	    &.ivu-card{
    		box-shadow: 0 0 15px #888;
	    }
		margin-bottom: 30px;
		width: 100%;
		position: relative;
		.green {
			color: #44bcb7;
			font-size: 18px;
		}
		.red {
			color: #ff0000;
			font-size: 18px;
		}
		.ivu-card-body {
			padding: 0;
		}
		.info {
			padding: 15px 0 0px;
			border-bottom: 1px #e0e0e0 solid;
			
			.info-box {
				display: flex;
				flex-wrap: nowrap;
				justify-content: space-around;
				align-items: center;
				width: 100%;
			}
			.info-lf {
				width: 144px;
				line-height: 25px;
				margin: 0 40px;
				text-align: center;
				font-size: 22px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				color: #44bcb7;
			}
			.info-gt {
				display: flex;
				flex-wrap: wrap;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				flex: 1;
				.box {
					display: flex;
					flex-wrap: wrap;
					flex-direction: column;
					justify-content: space-around;
					align-items: center;
					flex: 1;
					padding-left: 26px;
					p {
						width: 100%;
						text-align: left;
						line-height: 25px;
						&.blod {
							font-weight: bold;
						}
						&.fr {
							float: right;
						}
						&.jump {
							cursor: pointer;
							span {
								color: #44bcb7;
							}
						}
					}
				}
			}
			.btn {
				margin: 0;
				text-align: center;
				clear: both;
				padding: 20px 0;
				.ivu-btn {
					width: 90px;
					height: 32px;
					line-height: 1.4em;
					font-size: 12px;
					margin: 0 20px;
					border-radius: 3px;
				}
			}
		}
		.other {
			padding: 20px 0;
			/*height: 94px;*/
			border-bottom: 1px #e0e0e0 solid;
			.price {
				text-align: center;
				font-weight: bold;
				// .is-open-invoice {
				// 	position: absolute;
				// 	left: 250px;
				// 	color: red;
				// 	top: 2px;
				// }
			}
			.other-box {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				align-items: center;
			}
			.other-lf {
				width: 144px;
				text-align: center;
				font-size: 14px;
				font-weight: normal;
				margin: 0 40px;
			}
			.other-gt {
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				align-items: center;
				flex: 1;
				.policy {
					flex: 1;
					padding-left: 26px;
					.ivu-table-wrapper {
						width: 80%;
						.ivu-table {
							width: 100%;
						}
					}
					.ivu-table-footer{
						line-height: 35px;
						height: 35px;
					}
					.table {
						width: 100%;
						td {
							height: 35px;
							font-size: 14px;
							font-weight: bold;
							text-align: center;
							line-height: 35px;
							&.gt {
								border: none;
							}
						}
					}
				}
				p {
					text-align: left;
					line-height: 22px;
					margin-bottom: 6px;
					&.blod {
						font-weight: bold;
					}
				}
				
			}
			.append {
				text-align: center;
				padding-left: 144px;
			}
			.oFooter {
				position: relative;
				.stamp {
					position: absolute;
					right: 11.2%;
					bottom: 0;
					.reason {
						width: 130px;
						text-align: center;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
						position: absolute;
						bottom: 0;
						left: -134px;
						.ivu-tooltip-inner {
							max-width: 250px;
							min-height: 34px;
							padding: 8px 12px;
							color: #fff;
							text-align: left;
							text-decoration: none;
							background-color: rgba(70, 76, 91, 0.9);
							border-radius: 4px;
							box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
							white-space: nowrap;
						}
						.ivu-tooltip-popper[x-placement^="top"] .ivu-tooltip-arrow{
							display: block;
						}
					}
				}
				.btn {
					margin: 0;
					text-align: center;
					clear: both;
					padding-top: 20px;
					.ivu-btn {
						width:90px;
						height: 32px;
						line-height: 1.4em;
						font-size: 12px;
						margin: 0 20px;
						border-radius: 3px;
					}
				}
			}
		}
		.plan {
			width: 100%;
			padding: 15px 0;
			height: 86px;
			.plan-lf {
			    padding: 0 40px;
			    box-sizing: content-box;
				width: 144px;
				line-height: 54px;
				text-align: center;
				font-size: 14px;
				float: left;
				font-weight: normal;
			}
			.plan-box {
				float: left;
				height: 54px;
				font-size: 12px;
				.plan-cont {
					@left: 68px;
					position: relative;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					.line {
						position: absolute;
						top: 22px;
						left: @left;
						right: @left;
						background: #999999;
						border-radius: 4px;
						overflow: hidden;
						.level {
							width: 0px;
							height: 0px;
							background: #44bcb7;
    						border-bottom: 4px solid #44bcb7;
						}
					}
					.tenor {
						width: 48px;
						height: 48px;
						z-index: 99;
						line-height: 38px;
						float: left;
						border: 4px #999999 solid;
						&.action {
							border: 4px #44bcb7 solid;
						}
						.ivu-tooltip-rel{
							line-height: 40px;
						}
						border-radius: 50%;
						margin: 0 @left;
						background: #fff;
						text-align: center;
						cursor: pointer;
						position: relative;
						.urge {
							display: block;
							position: absolute;
							right: -48px;
							bottom: -16px;
							color: #FFFFFF;
							background: #44bcb7;
							width: 48px;
							line-height: 22px;
							border-radius: 10px;
							font-size: 12px;
							&.dis {
								color: #bbbec4;
								background-color: #eeeeee;
								border-color: #8C8C8C;
								cursor: not-allowed;
							}
						}
					}
				}
			}
		}
		.sw {
			font-size: 34px;
			position: absolute;
			line-height: 1.2em;
			padding: 0 12px;
			top: 0;
			right: 18px;
			color: #333333;
			cursor: pointer;
			.ivu-select-dropdown {
				ul {
					width: 124px;
					line-height: 32px;
					background: #fff;
					li {
						font-size: 14px;
						text-align: center;
						padding: 0;
						span {
							display: block;
							cursor: pointer;
							padding: 7px 16px;
						}
					}
				}
			}
		}
		.seal {
			width: 90px;
			height: 90px;
			padding: 4px;
			/*position: absolute;
			right: 18px;
			bottom: -8px;*/
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			.iconfont {
				font-size: 80px;
				color: #eaacb7;
				position: absolute;
				top: 3px;
				left: 5px;
				line-height: 1em;
				opacity: 0.9;
			}
			.text {
				transform: rotate(-19deg);
				font-size: 14px;
				color: #fff;
				text-align: center;
				z-index: 999;
			}
		}
		.archived {
			position: absolute;
			top: 66px;
			left: 166px;
			margin: -30px 0 0 -50px;
			opacity: 0.6;
		}
		.cooperation {
			width: 100%;
			padding: 15px 0;
			min-height: 86px;
			text-align: center;
			line-height: 24px;
			p {
				padding-left: 168px;
				text-align: left;
			}
			span {
				font-size: 18px;
				&.red {
					color: '#eaacb7';
				}
				&.green {
					color: '#44bcb7';
					font-size: 16px;
				}
			}
		}
	}
</style>

<template>
	<Card class="pactcard-list" v-if="listData">
		<div class="info">
			<div class="info-box">
				<h3 class="info-lf">
					{{listData.studentName}}
				</h3>
				<div class="info-gt">
					<div class="box">
						<p @click="goPreview" class="jump">{{$t('modules_spoc_sign_web_src_modules_pactcard_4830')}}<span style="font-weight: bold;">{{listData.name}}</span></p>
						<p v-if="status=='wait'||status=='closed'">{{$t('modules_spoc_sign_web_src_modules_pactcard_4831', [listData.commitTime ])}}</p>
						<p v-if="status!='wait'&&status!='closed'">{{$t('modules_spoc_sign_web_src_modules_pactcard_4832', [listData.htSign.signTime ])}}</p>
						<p v-if="listData.status=='closed'">{{$t('modules_spoc_sign_web_src_modules_pactcard_4833', [listData.closeTime])}}</p>
						<p v-if="listData.status=='refund'">{{$t('modules_spoc_sign_web_src_modules_pactcard_4834', [listData.refundTime])}}</p>
						<p v-if="listData.htSign.expectTime && status=='wait'">{{$t('modules_spoc_sign_web_src_modules_pactcard_4835', [listData.htSign.expectTime])}}</p>
					</div>
					<div class="box">
						<!-- <p >{{$t('modules_spoc_sign_web_src_modules_pactcard_4836', [listData.code])}}</p> -->
						<p><span v-if="status!='wait'">{{$t('modules_spoc_sign_web_src_modules_pactcard_4837', [listData.no])}}</span></p>
						<p class="blod fr">{{$t('modules_spoc_crm_web_src_views_customer360_components_signlists_869')}}<span class="green">{{ price.toLocaleString() }}</span>{{$t('modules_spoc_sign_web_src_modules_pactcard_4839')}}<span class="red">{{ newPrice.toLocaleString() }}</span>{{$t('modules_spoc_sign_web_src_modules_pactcard_4840')}}</p>
					</div>
				</div>
			</div>
			<div v-if="status!='collaborate'">
				<div class="btn" v-if="!listData.htContractItemList.length && status=='wait'">
					<!--<Button type="primary" @click="appointment" v-if="listData.auditStatus!='reject' && listData.htSign.expectTime">{{$t('modules_spoc_sign_web_src_modules_pactcard_4841')}}</Button>-->
					<Button type="primary" @click="goEdit" v-if="listData.auditStatus=='reject'||listData.auditStatus=='agree'">{{$t('modules_spoc_sign_web_src_modules_pactcard_4842')}}</Button>
					<Button type="primary" @click="promptly">{{$t('modules_spoc_sign_web_src_modules_pactcard_4843')}}</Button>
					<Button type="primary" @click="goConnect(listData.id, listData.studentId)" v-if="listData.receiptDetailStatus==1">{{$t('modules_spoc_sign_web_src_modules_pactcard_4844')}}</Button>
				</div>
				<div class="btn" v-if="!listData.htContractItemList.length && (listData.status=='signed' || listData.status=='accounted' || listData.status=='collected')">
					<Button type="primary" @click="goEdit" v-if="listData.auditStatus=='reject'||listData.auditStatus=='agree'">{{$t('modules_spoc_sign_web_src_modules_pactcard_4842')}}</Button>
					<!-- <Button type="primary" @click="accounting" v-if="listData.receiptStatus==0&&listData.status!='collected'">{{$t('modules_spoc_sign_web_src_modules_pactcard_4845')}}</Button>
					<Button type="primary" @click="goConnect(listData.id, listData.studentId)" v-if="listData.receiptDetailStatus==1">{{$t('modules_spoc_sign_web_src_modules_pactcard_4844')}}</Button> -->
				</div>
				<div class="btn" v-if="!listData.htContractItemList.length && listData.status=='closed'">
					<Button type="primary" @click="unClose" v-html="$t('modules_spoc_sign_web_src_modules_pactcard_4846')"></Button>
					<Button type="primary" @click="goConnect(listData.id, listData.studentId)" v-if="listData.receiptDetailStatus==1">{{$t('modules_spoc_sign_web_src_modules_pactcard_4844')}}</Button>
				</div>
			</div>
		</div>
		<div class="other" v-if="listData.htContractItemList.length">
			<div class="price">
				<!-- <p class="blod pl5">{{$t('modules_spoc_sign_web_src_modules_pactcard_4847')}}<span class="red" v-text="listData.htSign.deratePrice?parseFloat((listData.htSign.deratePrice/1e4).toFixed(4)):0"></span>{{$t('modules_spoc_sign_web_src_modules_pactcard_4848')}}<span class="red" v-text="listData.htSign.presentPrice?parseFloat((listData.htSign.presentPrice/1e4).toFixed(4)):0"></span>{{$t('modules_spoc_sign_web_src_modules_pactcard_4840')}}</p> -->
				<p class="blod pl5" style="position:relative">
					<span>{{$t('modules_spoc_sign_web_src_modules_pactcard_4849')}}</span>
					<span class="red">{{price.toLocaleString()}}</span>
					<span>{{$t('modules_spoc_sign_web_src_modules_pactcard_4850')}}</span>
					<span class="red">{{newPrice.toLocaleString()}}</span>
					<span>{{$t('modules_spoc_sign_web_src_modules_pactcard_4851')}}</span>
					<span class="red" v-text="(price - newPrice).toFixed(2).toLocaleString()"></span>
					<span>{{$t('modules_spoc_sign_web_src_modules_pactcard_4840')}}</span>
				</p>
			</div>
			<div class="other-box">
				<h3 class="other-lf">{{$t('modules_spoc_sign_web_src_modules_pactcard_4852')}}<span style="color: #44bcb7;display: block;cursor: pointer;" @click="journal($t('modules_spoc_sign_web_src_modules_pactcard_4853'))">{{$t('modules_spoc_sign_web_src_modules_pactcard_4854')}}</span>
				</h3>
				<div class="other-gt">
					<div class="policy">
						<Table border :columns="columns1" :data="listData.htContractItemList">
							<p></p>
							<table slot="footer" border="0" cellspacing="0" cellpadding="0" class="table">
								<tr>
									<td colspan="2" style="font-weight: normal;">{{$t('teachpush_slidecard_625')}}</td>
									<td class="gt" style="border-right: 1px solid #e9eaec;">{{$t('modules_spoc_sign_web_src_modules_pactcard_4856', [ price ])}}</td>
									<td class="gt">{{$t('modules_spoc_sign_web_src_modules_pactcard_4856', [ newPrice ])}}</td>
								</tr>
							</table>
						</Table>
						<p v-if="listData.protocolCustom">{{$t('modules_spoc_sign_web_src_modules_pactcard_4857', [listData.protocolCustom])}}</p>
					</div>
				</div>
			</div>
			<div v-if="status!='collaborate'" class="oFooter">
				<div class="btn" v-if="status=='wait'">
					<!--<Button type="primary" @click="appointment" v-if="listData.auditStatus!='reject' && listData.htSign.expectTime">{{$t('modules_spoc_sign_web_src_modules_pactcard_4841')}}</Button>-->
					<Button type="primary" @click="goEdit" v-if="listData.auditStatus=='reject'||listData.auditStatus=='agree'" v-text="$t('modules_spoc_sign_web_src_modules_pactcard_4842')"></Button>
					<Button type="primary" @click="promptly" v-if="(listData.auditStatus=='agree'||listData.auditStatus=='nocheck')">{{$t('modules_spoc_sign_web_src_modules_pactcard_4843')}}</Button>
					<Button type="primary" @click="goConnect(listData.id, listData.studentId)" v-if="listData.receiptDetailStatus==1">{{$t('modules_spoc_sign_web_src_modules_pactcard_4844')}}</Button>
				</div>
				<div class="btn" v-if="(listData.status=='signed' || listData.status=='accounted' || listData.status=='collected')">
					<Button type="primary" @click="goEdit" v-if="listData.auditStatus=='reject'||listData.auditStatus=='agree'" v-text="$t('modules_spoc_sign_web_src_modules_pactcard_4842')"></Button>
					<!-- <Button type="primary" @click="accounting" v-text="$t('modules_spoc_sign_web_src_modules_pactcard_4845')" v-if="listData.receiptStatus==0&&listData.status!='collected'"></Button>
					<Button type="primary" @click="goConnect(listData.id, listData.studentId)" v-if="listData.receiptDetailStatus==1">{{$t('modules_spoc_sign_web_src_modules_pactcard_4844')}}</Button> -->
				</div>
				<div class="btn" v-if="listData.status=='closed'">
					<Button type="primary" @click="unClose" v-text="$t('modules_spoc_sign_web_src_modules_pactcard_4846')"></Button>
					<Button type="primary" @click="goConnect(listData.id, listData.studentId)" v-if="listData.receiptDetailStatus==1">{{$t('modules_spoc_sign_web_src_modules_pactcard_4844')}}</Button>
				</div>
				<div class="stamp">
					<Tooltip :content="_reason" class="reason" placement="top" v-if="show_reason">
						{{_reason}}
					</Tooltip>
					<div class="seal" v-if="listStatus=='wait'">
						<i class="iconfont icon-zhang" :style="{color:iconColor}"></i>
						<span class="text">{{iconText}}</span>
					</div>
					<div class="seal" v-if="listData.status=='refund'">
						<i class="iconfont icon-zhang" style="color:#999"></i>
						<span class="text">{{$t('modules_spoc_sign_web_src_modules_pactcard_4858')}}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="plan" v-if="status!='collaborate'">
			<h3 class="plan-lf">{{$t('modules_spoc_sign_web_src_modules_pactcard_4859')}}</h3>
			<div class="plan-box">
				<div class="plan-cont">
					<div class="line">
						<p class="level" :style="{width:((long-1)*200)+'px'}"></p>
					</div>
					<Tooltip v-for="(item,index) in loading" :key="index" class="tenor" :class="{action:long>index}" :disabled="!item.time" placement="top" v-if="item.show">
						{{item.info}}
						<div slot="content" v-if="item.info==$t('modules_spoc_crm_web_src_views_transferintroductionmanagement_index_2002')&& !!item.time">
							<p>{{$t('modules_spoc_sign_web_src_modules_pactcard_4861', [item.who])}}</p>
							<p>{{$t('modules_spoc_sign_web_src_modules_pactcard_4862', [item.info,item.time])}}</p>
						</div>
						<div slot="content" v-else-if="!!item.time">
							<p>{{$t('modules_spoc_sign_web_src_modules_pactcard_4862', [item.info,item.time])}}</p>
						</div>
						<span class="urge" :class="{dis:isUrge}" v-if="item.eve && !close && listData.status=='committed' && listData.auditStatus!='reject'" @click="urgeAudit" v-text="isUrge?min+'s':$t('modules_spoc_sign_web_src_modules_pactcard_4863')"></span>
					</Tooltip>
				</div>
			</div>
		</div>
		<div class="cooperation" v-else>
			<p v-for="item in listData.htPartnerList" v-if="listData.htPartnerList.length">{{$t('modules_spoc_sign_web_src_modules_pactcard_4864')}}<span class="green" v-text="item.partnerName"></span>{{$t('modules_spoc_sign_web_src_modules_pactcard_4865')}}<span class="red" v-text="parseFloat((Number(item.ratio)*1e2).toFixed(2))+'%'"></span>{{$t('modules_spoc_sign_web_src_modules_pactcard_4866')}}<span class="red" v-text="parseFloat((Number(item.ratioAmount)).toFixed(2))">2</span>{{$t('modules_spoc_sign_web_src_modules_pactcard_4867')}}</p>
			<span v-if="!listData.htPartnerList.length">{{$t('modules_spoc_sign_web_src_modules_pactcard_4868')}}</span>
		</div>
		<div class="sw">
			<Dropdown class="dropdown" placement="bottom-start">
				<Icon type="more"></Icon>
				<DropdownMenu slot="list">
					<DropdownItem><span @click="offPlan" v-if="status=='wait' && listData.auditStatus!='waiting'">{{$t('modules_spoc_sign_web_src_modules_pactcard_4869')}}</span></DropdownItem>
					<DropdownItem><span @click="redact" v-if="status=='wait' && (listData.auditStatus=='reject ' || listData.auditStatus=='nocheck'||listData.auditStatus=='agree')">{{$t('modules_spoc_sign_web_src_modules_pactcard_4842')}}</span></DropdownItem>
					<DropdownItem><span @click="make" v-if="listData.status=='signed'">{{$t('modules_spoc_sign_web_src_modules_pactcard_4870')}}</span></DropdownItem>
					<DropdownItem><span @click="account" v-if="listData.receiptStatus==1 && status=='signed'">{{$t('modules_spoc_sign_web_src_modules_pactcard_4871')}}</span></DropdownItem>
					<DropdownItem><span @click="file" v-if="status!='wait' && listData.status!='refund'" v-text="listData.isArchived!=1?$t('modules_spoc_sign_web_src_modules_pactcard_4872'):$t('modules_spoc_sign_web_src_modules_pactcard_4873')">	</span></DropdownItem>
					<DropdownItem><span @click="invoice(listData)" v-if="listData.status=='signed'&&listData.invoiceStatus==0">{{$t('modules_spoc_sign_web_src_modules_pactcard_4874')}}</span></DropdownItem>
					<DropdownItem><span @click="journal($t('modules_spoc_sign_web_src_modules_pactcard_4875'))">{{$t('modules_spoc_sign_web_src_modules_pactcard_4875')}}</span></DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</div>
		<div class="archived" v-if="listData.isArchived==1">
			<img src="../assets/myPact/archived.png" />
		</div>
		<span v-if="listData.status=='signed'" class=""><i class="icon-zhang_ iconfont is-open-invoice" style="color:red;font-size:24px"><span class="text">{{listData.invoiceStatus==0?$t('modules_spoc_sign_web_src_modules_pactcard_4876'):$t('modules_spoc_sign_web_src_modules_pactcard_4877')}}</span></i></span>
	</Card>
</template>

<script>
	import { mapMutations } from 'vuex';
	import valid, { errors, htContract } from "../libs/request";
	export default {
		props: {
			list: {
				type: Object,
				default: () => {
					return {};
				}
			},
			isClose: {
				type: Boolean,
				default: () => {
					return false;
				}
			},
			status: {
				type: String,
				default: () => {
					return '';
				}
			},
		},

		components: {
		},

		data() {
			return {
				isUrge: false,
				min: 60,
				columns1: [
					// {
					// 	title: '促签项目',
					// 	align: 'center',
					// 	key: 'policyName'
					// },
					// {
					// 	title: '权限级别',
					// 	align: 'center',
					// 	key: 'level'
					// },
					// {
					// 	title: '优惠条款',
					// 	align: 'center',
					// 	key: 'name'
					// },
					// {
					// 	title: '赠送金额',
					// 	align: 'center',
					// 	key: 'publicPrice',
					// 	render: (h, params) => {
					// 		return h('div', {}, params.row.type=='gift'?(parseFloat((Number(params.row.publicPrice) / 1e4).toFixed(4)) + '元'):'-');
					// 	}
					// },
					{
						title: this.$t('modules_spoc_sign_web_src_modules_pactcard_4878'),
						align: 'center',
						key: 'policyName',
						resizable: true,
						width: null
					},
					{
						title: this.$t('modules_spoc_sign_web_src_modules_pactcard_4879'),
						align: 'center',
						key: 'name',
						resizable: true,
						width: null
					},
					{
						title: this.$t('modules_spoc_sign_web_src_modules_pactcard_4880'),
						align: 'center',
						key: 'publicPrice',
						render: (h, params) => {
							return h('div', {}, (parseFloat((Number(params.row.publicPrice)).toFixed(2)) + this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')));
						},
						resizable: true,
						width: null
					},
					{
						title: this.$t('modules_spoc_sign_web_src_modules_pactcard_4882'),
						align: 'center',
						key: 'costPrice',
						render: (h, params) => {
							return h('div', {}, (parseFloat((Number(params.row.costPrice)).toFixed(2)) + this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')));
						},
						resizable: true,
						width: null
					},
				],
			}
		},
		computed: {
			_reason(){
				if(this.listData.htOptStatusLog.reject){
					let leng=this.listData.htOptStatusLog.reject.length;
					return this.listData.htOptStatusLog.reject[0].reason;
				}
			},
			show_reason(){
				if(this.listData.auditStatus=='reject'){
					return true;
				}else{
					return false;
				}
			},
			iconColor() {
				//				if(this.listData.auditStatus==)
				switch(this.listData.auditStatus) {
					case 'agree':
						return '#44bcb7'
						break;
					case 'reject':
						return '#eaacb7'
						break;
					case 'waiting':
						return '#e6d096'
						break;
					case 'nocheck':
						return '#44bcb7'
						break;
					default:
						break;
				}
			},
			iconText() {
				//				if(this.listData.auditStatus==)
				switch(this.listData.auditStatus) {
					case 'agree':
						return this.$t('classlist_classlist_13')
						break;
					case 'reject':
						return this.$t('modules_spoc_sign_web_src_modules_pactcard_4884')
						break;
					case 'waiting':
						return this.$t('modules_spoc_sign_web_src_modules_pactcard_4885')
						break;
					case 'nocheck':
						return this.$t('modules_spoc_sign_web_src_modules_pactcard_4886')
						break;
					default:
						break;
				}
			},
			listStatus() {
				return this.status;
			},
			loading() {
				let arr = [{
						'key': 'commit',
						'info': this.$t('courselist_compontents_servicecontent_214'),
						eve: '',
						show: true,
					},
					{
						'key': 'sign',
						'info': this.$t('modules_spoc_crm_web_src_views_customer360_index_1096'),
						eve: '',
						show: !this.close,
					},
					{
						'key': 'account',
						'info': this.$t('modules_spoc_sign_web_src_modules_pactcard_4889'),
						eve: '',
						// show: !this.close,
						show: false,
					},
					{
						'key': 'collecting bill',
						'info': this.$t('modules_spoc_sign_web_src_modules_pactcard_4890'),
						eve: '',
						// show: !this.close,
						show: false,
					},
				];
				if(this.listData.auditStatus != 'nocheck') {
					arr.splice(1, 0, {
						'key': 'agree',
						'info': this.$t('modules_spoc_crm_web_src_views_transferintroductionmanagement_index_2002'),
						eve: this.$t('modules_spoc_sign_web_src_modules_pactcard_4863'),
						show: true,
						who: ''
					});
				}
				if(this.listStatus == "closed") {
					arr.push({
						'key': 'close',
						'info': this.$t('modules_spoc_sign_web_src_modules_pactcard_4891'),
						eve: '',
						show: true,
					});
				} else if(this.listData.status == "refund") {
					arr.push({
						'key': 'refund',
						'info': this.$t('modules_spoc_sign_web_src_modules_pactcard_4892'),
						eve: '',
						show: !this.close,
					});
				} else {
					arr.push({
						'key': 'finish',
						'info': this.$t('modules_spoc_crm_web_src_views_onsitemanagement_onsitemanagement_1444'),
						eve: '',
						// show: !this.close,
						show: false,
					});
				}
				arr.forEach((v, k) => {
					if(!!this.listData.htOptStatusLog[v.key]) {
						v.time = this.listData.htOptStatusLog[v.key][0].optTime;
						if(v.key == 'check'||v.key == 'agree') {
							v.who = this.listData.htOptStatusLog[v.key][0].optUserName;
						}
					} else {
						v.time = '';
					}
				})
				return arr;
			},
			long() {
				let status = this.listData.status;
				let isArchived = this.listData.isArchived;
				if(this.listData.auditStatus == 'nocheck') {
					if(status.search(/committed/) > -1) return 1;
					if(status.search(/checked/) > -1) return 1;
					if(status.search(/signed/) > -1) return 2;
					if(status.search(/accounted/) > -1) return 3;
					if(status.search(/collected/) > -1) return 4;
					if(isArchived == 1) return 5;
					if(status.search(/closed/) > -1) return 6;
					if(status.search(/finished/) > -1) return 6;
					if(status.search(/refund/) > -1) return 6;
				} else {
					if(status.search(/committed/) > -1) return 1;
					if(status.search(/checked/) > -1) return 2;
					if(status.search(/signed/) > -1) return 3;
					if(status.search(/accounted/) > -1) return 4;
					if(status.search(/collected/) > -1) return 5;
					if(isArchived == 1) return 6;
					if(status.search(/closed/) > -1) return 7;
					if(status.search(/finished/) > -1) return 7;
					if(status.search(/refund/) > -1) return 7;
				}
			},
			close() {
				return this.isClose;
			},
			listData() {
				return this.list;
			},
			price() {
				return parseFloat((this.listData.price).toFixed(2));
			},
			newPrice() {
				if(this.listData.htSign.signPrice||this.listData.htSign.signPrice==0) {
					return parseFloat((this.listData.htSign.signPrice).toFixed(2));
				} else {
					return parseFloat((this.listData.price).toFixed(2));
				}
			},
			deratePrice() {
				return parseFloat((this.listData.htSign.signPrice).toFixed(2));
			}
		},
		methods: {
			...mapMutations(['updateLoadingStatus']),
			invoice(val) {
				this.$emit('showInvoiceModel', val)
				// this.$refs.invoiceModel.show()
			},
			offPlan() {
				this.$emit('off', this.listData)
			},
			redact() {
				this.$emit('redact', this.listData)
			},
			make() {
				this.$emit('make', this.listData)
			},
			account() {
				this.$emit('account', this.listData)
			},
			file() {
				this.$emit('file', this.listData, this.listData.isArchived != 1 ? this.$t('modules_spoc_sign_web_src_modules_pactcard_4872') : this.$t('modules_spoc_sign_web_src_modules_pactcard_4873'))
			},
			//			transfer(){
			//				this.$emit('transfer',this.listData)
			//			},
			journal(tit) {
				this.$emit('journal', this.listData,tit)
			},
			appointment() {
				this.$emit('appointment', this.listData)
			},
			goEdit() {
				this.$router.push({
					name: 'sign.contractGeneration',
					query: {
						id: this.list.tplId,
						mid: this.list.id
					}
				})
			},
			promptly() {
				this.$emit('promptly', this.listData)
			},
			urgeAudit() {
				if(!this.isUrge) {
					this.$emit('urgeAudit', this.listData)
					let _t = this;
					this.isUrge = true;

					function time() {
						_t.min--;
						window.setTimeout(function() {
							if(_t.min <= 0) {
								_t.min = 60;
								_t.isUrge = false;
							} else {
								time()
							}
						}, 1000)
					}
					time();
				}
			},
			accounting() {
				this.$emit('accounting', this.listData)
			},
			//交接后期
			goConnect(id,studentId){
				this.updateLoadingStatus({isLoading:true})
				htContract.handover({id: id})
				.then(valid.call(this))
				.then(res => {
					if(res.ok) {
						this.updateLoadingStatus({isLoading:false,loadingBg:false})
						this.$router.push({
							name: 'sign.connectedit',
							query: {
								studentId: res.data.data.studentId,
								groupId: res.data.data.groupId,
								//phase:'sign'
							}
						})
					}
					
				})
				.catch(errors.call(this))
				.finally(() => {});
			},
			unClose() {
				this.$emit('unClose', this.listData)
			},
			goPreview() {
				this.$emit('goPreview', this.listData)
			}
		}
	}
</script>