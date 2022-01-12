<style lang="less">
	.my_pact {
		width: 100%;
		height: 100%;
		font-size: 14px;
		background: #FFFFFF;
		.tabs {
			.ivu-tabs-tab {
				font-size: 14px;
			}
		}
		.time {
			width: 118px;
			.ivu-input {
				height: 26px;
				width: 118px;
			}
			.ivu-input-icon {
				height: 26px;
				line-height: 26px;
				font-style: normal;
				color: #44bcb7;
				font-size: 16px;
			}
		}
		.filter {
			margin-top: 10px;
			.title {
				margin: 0;
				padding: 0;
			}
		}
		.filterDw {
			.mb12 {
				margin-bottom: 12px;
			}
		}
		.filter-two {
			overflow: hidden;
			.title {
				font-size: 12px;
				width: 70px;
				text-align: right;
				margin-right: 10px;
				box-sizing: border-box;
				padding: 3px 0px;
				color: #999;
				float: left;
			}
			.filter-date {
				float: left;
			}
		}
		.main {
			width: 100%;
			min-width: 960px;
			padding: 30px 0 30px 0;
			position: relative;
			.list-info {
				width: 100%;
				position: absolute;
				font-size: 12px;
				top: -34px;
				right: 0;
				z-index: -1;
				line-height: 42px;
				text-align: right;
				.red {
					color: #FF0000;
					font-size: 16px;
				}
			}
			.page-box {
				display: flex;
				justify-content: center;
				margin-top: 20px;
			}
			.noList {
				width: 100%;
				text-align: center;
				span {
					background: url("../../assets/images/tableDataEmpty.png");
					padding-bottom: 50px;
					display: inline-block;
					padding-top: 160px;
					color: #aaa;
					background-repeat: no-repeat;
					background-position: center 40px;
					min-width: 200px;
				}
			}
			.addPact {
				position: absolute;
				top: -60px;
				right: 0px;
			}
		}
	}
	
	.modal-form {
		.ivu-modal-header p,
		.ivu-modal-header-inner {
			font-size: 18px;
			font-weight: 600;
		}
		.ivu-checkbox-wrapper {
			font-size: 14px;
		}
	}
	
	.modal-form .ivu-form {
		font-size: 14px;
		.width200 {
			width: 200px;
		}
		.width204 {
			width: 204px;
		}
		.width316 {
			width: 316px;
		}
		.width244 {
			width: 244px;
		}
		.width136 {
			width: 136px;
		}
		.mr14 {
			margin-left: 12px;
		}
		.mr150 {
			margin-left: 150px;
		}
		.mr10 {
			margin-left: 10px;
		}
		.p90 {
			margin-left: 80px;
			color: #999999;
		}
		.fl {
			float: left;
		}
		.fr {
			float: right;
		}
		.inline {
			display: inline-block;
		}
		.ivu-form-item-label {
			font-size: 14px;
			color: #999999;
		}
		.ivu-input {
			// background: #fafafa;
			color: #212121;
			font-size: 14px;
		}
		.ivu-input:hover {
			background: #fff;
		}
		.ivu-select-placeholder {
			color: #b3b3b3;
		}
		.ivu-select-selection {
			background: #FAFAFA;
		}
		.fileName {
			position: relative;
			display: inline-block;
			span {
				position: absolute;
				line-height: 32px;
				bottom: -24px;
				right: 12px;
				color: red;
				cursor: pointer;
				display: none;
			}
		}
		.fileName:hover {
			span {
				display: inline-block;
			}
		}
	}
	/*.ivu-modal-header-inner{
		font-size: 16px;
	}*/
	
	.modalOff {
		.cont {
			font-size: 18px;
			text-align: center;
			margin: 40px 0;
			font-weight: 600;
		}
		.modal-btn {
			text-align: center;
			padding-bottom: 34px;
			.ivu-btn {
				font-weight: 400;
				font-size: 14px;
				width: 120px;
				height: 36px;
				margin: 0 5px;
			}
		}
		.ivu-modal-footer {
			display: none;
		}
	}
	
	.modalMake {
		.inp input {
			width: 270px;
		}
	}
	
	.modalAccount {
		.ivu-modal-body {
			padding: 16px 24px;
			height: 396px;
			overflow: auto;
		}
		.formAccount {
			/*overflow: hidden;*/
			.oldNews{
				margin-bottom: 10px;
				.ivu-form-item{
					margin-bottom: 4px;
					p{
						line-height: 34px;
					}
				}
			}
			.but_list{
				margin-left: 18px;
			}
		}
		.ivu-modal-body {
			padding: 10px;
		}
	}
	
	.modalFile {
		.formFile {
			.ivu-form-item {
				margin-bottom: 14px;
			}
			.pactId {
				.ivu-form-item-label {
					padding: 10px 12px 10px 0;
				}
			}
			.sacn {
				.ivu-form-item-label {
					padding: 14px 12px 10px 0;
				}
			}
			.fileBox {
				.copyFileName {
					position: relative;
					display: inline-block;
					span {
						position: absolute;
						line-height: 32px;
						bottom: 0px;
						right: -42px;
						color: red;
						cursor: pointer;
						display: none;
					}
				}
				.fileNameBox:hover .copyFileName {
					span {
						display: inline-block;
					}
				}
			}
		}
	}
	
	.modalJournal {
		.ivu-modal-footer {
			display: none;
		}
		.ivu-modal-body {}
	}
	
	.modal-form .logoBox {
		.schoolLogoBox {
			width: 70px;
			height: 70px;
			background-color: #f7f7f7;
			border: 1px solid #e0e1e2;
			img {
				width: 70px;
				height: 70px;
			}
		}
		.scanBox {
			line-height: 34px;
			.fileName {
				span {
					bottom: -10px;
					line-height: 24px;
				}
				span:hover {
					display: block;
				}
			}
			p {
				color: #0d70b0;
			}
		}
		label {
			line-height: 70px;
		}
		.uploadBox {
			position: relative;
			padding: 5px 0px;
			margin-left: 20px;
			.tips {
				color: #999899;
				font-size: 12px;
				margin-top: 10px;
			}
			.error_tips {
				top: 85%;
			}
		}
	}
	
	.logo {
		width: 100%;
		.ivu-form .logoBox .uploadBox .tips {
			line-height: 1em;
			margin-top: 20px;
		}
		.ivu-form-item-content {
			line-height: 1em;
		}
	}
	
	.promModal {
		.prom-form {
			/*height: 260px;
			overflow: auto;*/
		}
	}
</style>

<template>
	<div class="my_pact">
		<Tabs size="small" class="tabs" :animated="false" v-model="tabsNum" @on-click="tabCut(tabsNum)">
			<TabPane name="wait" :label="$t('modules_spoc_sign_web_src_views_mypact_mypact_6640')"></TabPane>
			<TabPane name="signed" :label="$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4485')"></TabPane>
			<!--<TabPane name="finished" :label="$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1749')"></TabPane>-->
			<TabPane name="closed" :label="$t('modules_spoc_sign_web_src_modules_tabledetails_4942')"></TabPane>
			<TabPane name="collaborate" :label="$t('modules_spoc_sign_web_src_views_mypact_mypact_6644')" v-if="false"></TabPane>
		</Tabs>
		<v-select style="width: 396px;margin: 15px 0;" :placeholder="$t('modules_spoc_sign_web_src_views_mypact_mypact_6645')" icon="search" v-model="compact" k='cnname' :datafunc="searchDropList" @on-enter="textChange" @on-click="textChange" @selected="textChange">
		</v-select>
		<div v-if="tabsNum=='wait'||tabsNum=='closed'">
			<DatePicker v-model="beforeTime" format="yyyy-MM-dd" type="date" :placeholder="$t('principalmailbox_8')" style="width: 118px;height:26px;" class="time" @on-change="timeCharge"></DatePicker>
			<span style="background-color: rgb(54, 162, 158); display: inline-block; width: 12px; height: 2px;"></span>
			<DatePicker v-model="afterTime" format="yyyy-MM-dd" type="date" :placeholder="$t('principalmailbox_8')" class="time" style="width: 118px;height:26px;" @on-change="timeCharge"></DatePicker>
			<v-search-options :data="wait.countryList" byKey="label" :searchTitle="wait.searchName" labelWidth="0" @on-select-item="pullTags" style="margin-top: 10px;"></v-search-options>
		</div>
		<div class="filterDw" v-else-if="tabsNum=='signed'">
			<div class="filter-two">
				<div class="title">{{$t('modules_spoc_sign_web_src_views_mypact_mypact_6647')}}</div>
				<div class="filter-date">
					<DatePicker v-model="beforeTime" format="yyyy-MM-dd" class="time" type="date" :placeholder="$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1642')" style="width: 118px;height:26px;" @on-change="timeCharge"></DatePicker>
					——
					<DatePicker v-model="afterTime" format="yyyy-MM-dd" class="time" type="date" :placeholder="$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1642')" style="width: 118px;height:26px;" @on-change="timeCharge"></DatePicker>
				</div>
			</div>
			<v-search-options :data="other.countryList" byKey="label" :searchTitle="other.searchName" labelWidth="80" @on-select-item="pullTags1" style="margin-top: 10px;"></v-search-options>
			<!-- <v-search-options :data="receiptStatusList.countryList" byKey="label" :searchTitle="receiptStatusList.searchName" labelWidth="80" @on-select-item="pullTagsReceiptStatus" style="margin-top: 10px;" v-if="tabsNum=='signed'"></v-search-options> -->
		</div>
		<div v-else>
			<v-search-options :data="teamwork.countryList" byKey="label" :searchTitle="teamwork.searchName" labelWidth="0" @on-select-item="pullTags2"></v-search-options>
		</div>
		<div class="main">
			<div v-for="item in list">
				<pact-card :list="item" @showInvoiceModel='showInvoiceModel' :isClose="tabsNum=='closed'?true:false" :status="tabsNum" @off="offModal" @redact="redactModal" @make="makeModal" @account="accountModal" @file="fileModal" @journal="journalModal" @appointment="appointment" @promptly="promptly" @urgeAudit="urgeAudit" @accounting="accounting" @unClose="unClose" @goPreview="goPreview"></pact-card>
			</div>
			<div class="noList" v-if="!list.length">
				<span>{{$t('modules_spoc_sign_web_src_views_mypact_mypact_6649')}}</span>
			</div>
			<div class="page-box" v-show="count>10">
				<div style="margin: auto;display: inline-block;">
					<Page :total="count" :page-size="10" :current="page" show-total :show-sizer="count>10" show-elevator @on-change="pageChange" @on-page-size-change="sizeChange"></Page>
				</div>
			</div>
			<p class="list-info" v-if="info">{{$t('modules_spoc_sign_web_src_views_mypact_mypact_6650')}}<span class="red" v-text="info.total"></span>{{$t('modules_spoc_sign_web_src_views_mypact_mypact_6651')}}<span class="red" v-text="tabsNum!='collaborate'?(info.signPriceSum?parseFloat((Number(info.signPriceSum)).toFixed(2)):0):(info.totalMoney?parseFloat((Number(info.totalMoney)).toFixed(2)):0)"></span>{{$t('modules_spoc_sign_web_src_views_library_pact_pact_6600')}}<span v-if="tabsNum=='collaborate'">{{$t('modules_spoc_sign_web_src_views_mypact_mypact_6653')}}<span class="red" v-text="info.ratioMoney?parseFloat((Number(info.ratioMoney)).toFixed(2)):0"></span>{{$t('modules_spoc_sign_web_src_views_library_pact_pact_6600')}}</span>
			</p>
			<p class="addPact">
				<Button type="primary" @click="addPact">{{$t('modules_spoc_sign_web_src_views_mypact_mypact_6654')}}</Button>
			</p>
		</div>

		<Modal v-model="modalOff" :title="$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5717')" width="730" class="modalOff modal-form">
			<div style="text-align:center">
				<p class="cont">{{$t('modules_spoc_sign_web_src_views_mypact_mypact_6656')}}</p>
				<div class="modal-btn">
					<Button @click="modalOff=false">{{$t('classroom_allscore_53')}}</Button>
					<Button type="primary" @click="closePact">{{$t('classroom_allscore_54')}}</Button>
				</div>
			</div>
		</Modal>
		<Modal v-model="close" :title="$t('modules_spoc_sign_web_src_views_mypact_mypact_6659')" width="730" class="modalOff modal-form">
			<div style="text-align:center">
				<p class="cont">{{$t('modules_spoc_sign_web_src_views_mypact_mypact_6660')}}</p>
				<div class="modal-btn">
					<Button @click="close=false">{{$t('classroom_allscore_53')}}</Button>
					<Button type="primary" @click="unCloseOk">{{$t('classroom_allscore_54')}}</Button>
				</div>
			</div>
		</Modal>
		<Modal ref="xgModal" v-model="modalMake" :title="$t('modules_spoc_sign_web_src_modules_pactcard_4870')" width="730" class="modalMake modal-form" @on-ok="makeOk('formMake')">
			<div>
				<Form ref="formMake" :rules="makeRule" :model="makeData" :label-width="116" class="formMake">
					<FormItem :label="$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1642')" class="inp" prop="signTime">
						<DatePicker v-model="makeData.signTime" format="yyyy/MM/dd HH:mm" type="datetime" :placeholder="$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1642')" style="width: 270px"></DatePicker>
					</FormItem>
					<FormItem :label="$t('modules_spoc_sign_web_src_views_approval_approvalnew_5071')" class="inp" style="margin-bottom: 14px;">
						<Input v-model="makeData.no" readonly type="text"></Input>
					</FormItem>
					<!--<FormItem :label="$t('modules_spoc_sign_web_src_views_mypact_mypact_6663')" style="margin-bottom: 0px;" v-if="false">
						<div v-for="(item,index) in makeData.partners" :key="index" style="margin-bottom: 10px;height:33px">
							<div style="float: left;">
								<v-select style="width: 150px;margin-right: 4px;" :placeholder="$t('modules_spoc_sign_web_src_views_mypact_mypact_6664')" :listIndex="index" icon="chevron-down" v-model="item.partnerName" k='name' :datafunc="searchDropList1" @selected="textChange1" @blur="unselect"></v-select>
							</div>
							<div style="float: left;">
								<Input v-model="item.ratio" :placeholder="$t('modules_spoc_sign_web_src_views_mypact_mypact_6665')" style="width: 100px;">
								<span slot="append">%</span>
								</Input>
							</div>
							<Button type="primary" @click="addMake" v-if="index==makeData.partners.length-1" class="inline mr10">{{$t('classroom_allscore_52')}}</Button>
							<Button @click="delMake(index)" class="inline mr10">{{$t('classlist_compontents_detailinfo_46')}}</Button>
						</div>
					</FormItem>-->
				</Form>
			</div>
		</Modal>
		<Modal v-model="modalAccount" :title="accountTite" width="1220" class-name="modalAccount modal-form vertical-center-modal">
			<div>
				<Form ref="formAccount" :rules="accountRule" :model="accountData" :label-width="114" class="formAccount">
					<div style="margin-bottom: 8px;"><div style="display:inline-block;width:114px;text-align: right;padding-right: 12px;">{{$t('modules_spoc_sign_web_src_views_mypact_mypact_6668')}}</div><span style="display:inline-block;padding:0 8px;color: red;font-size: 16px;width: 80px;text-align: left;">{{this.cardPrice}}</span>{{$t('modules_spoc_sign_web_src_views_contractgeneration_contractgeneration_5542')}}</div>
					<div v-for="(item,index) in htReceiptDetails" :key="item.id" style="overflow: hidden;" v-if="htReceiptDetails.length" class="oldNews">
						<FormItem :label="$t('startemplate_index_586')+(index+1)+$t('modules_spoc_sign_web_src_views_mypact_mypact_6671')" class="fl">
							<p class="width316"><span style="display:inline-block;padding:0 8px;width: 80px;text-align: left;">{{item.curReceipt}}</span>{{$t('modules_spoc_sign_web_src_modules_pactcard_4840')}}</p>
						</FormItem>
						<FormItem :label="$t('modules_spoc_sign_web_src_views_mypact_mypact_6673')" class="fr">
							<p class="width316" style="padding-left: 8px;">{{item.typeLabel}}</p>
						</FormItem>
						<FormItem :label="$t('modules_spoc_sign_web_src_views_mypact_mypact_6674')" class="fl">
							<p class="width316" style="padding-left: 8px;">{{item.accountLabel}}</p>
						</FormItem>
						<FormItem :label="$t('modules_spoc_sign_web_src_views_mypact_mypact_6675')" class="fr">
							<p class="width316" style="padding-left: 8px;">{{item.receiptTime}}</p>
						</FormItem>
					</div>
					<div class="">
						<FormItem :label="$t('startemplate_index_586')+(htReceiptDetails.length+1)+$t('modules_spoc_sign_web_src_views_mypact_mypact_6671')" class="inline" prop="curReceipt">
							<Input v-model="accountData.curReceipt" type="text" style="width: 80px;"></Input>{{$t('modules_spoc_sign_web_src_modules_pactcard_4840')}}</FormItem>
						<FormItem :label="$t('modules_spoc_sign_web_src_views_mypact_mypact_6673')" class="inline" prop="type" :label-width="94">
							<Select v-model="accountData.type" style="width:136px;">
								<Option :value="item.value" v-for="item in payment" :key="item.id">{{item.label}}</Option>
							</Select>
						</FormItem>
						<FormItem :label="$t('modules_spoc_sign_web_src_views_mypact_mypact_6674')" class="inline" prop="account" :label-width="98" v-if="!htReceiptDetails.length">
							<Select v-model="accountData.account" style="width: 230px;" @on-change="accountChange">
								<Option :value="item.id" v-for="item in accId" :key="item.id">{{item.accountName}}</Option>
							</Select>
						</FormItem>
						<FormItem :label="$t('modules_spoc_sign_web_src_views_mypact_mypact_6676')" class="inline" prop="bank" :label-width="98" v-if="!htReceiptDetails.length">
							<Select v-model="accountData.bank" style="width: 230px;">
								<Option :value="item.id" v-for="(item,index) in bankList" :key="item.id">{{item.accountBank}}</Option>
							</Select>
						</FormItem>
						<Button type="primary" @click="addReceipt" v-if="accountData.receiptPlans.length==0" class="inline mr10">{{$t('classroom_allscore_52')}}</Button>
					</div>
					<div v-for="(item,index) in accountData.receiptPlans" :key="item.id" class="">
						<FormItem :label="$t('startemplate_index_586')+(index+htReceiptDetails.length+2)+$t('modules_spoc_sign_web_src_views_mypact_mypact_6677')" class="inline">
							<Input v-model="item.planReceipt" type="text" style="width: 80px;"></Input>{{$t('modules_spoc_sign_web_src_modules_pactcard_4840')}}</FormItem>
						<FormItem :label="$t('modules_spoc_sign_web_src_views_mypact_mypact_6678')" class="inline" :label-width="94" :rules="item.planReceipt?{required: true,type:'date', message: $t('startemplate_index_586')+(index+htReceiptDetails.length+2)+$t('modules_spoc_sign_web_src_views_mypact_mypact_6679'), trigger: 'change'}:[]" :required="item.planReceipt?true:false" :prop="item.planReceipt?'receiptPlans.' + index + '.planReceiptTime':''">
							<DatePicker v-model="item.planReceiptTime" :format="$t('modules_spoc_sign_web_src_views_mypact_mypact_6680')" type="date" style="width: 136px"></DatePicker>
						</FormItem>
						<div class="inline but_list">
							<Button type="primary" @click="addReceipt" v-if="index==accountData.receiptPlans.length-1" class="inline mr10">{{$t('classroom_allscore_52')}}</Button>
							<Button @click="delReceipt(index)" class="inline mr10">{{$t('classlist_compontents_detailinfo_46')}}</Button>
						</div>
					</div>
					<Form-item :label="$t('modules_spoc_sign_web_src_views_mypact_mypact_6681')" class="logo" prop="receiptList">
						<div class="infoList logoBox clearfix">
							<div class="fl schoolLogoBox" v-for="(item,index) in accountData.receiptList" v-if="accountData.receiptList.length">
								<i-input v-model="item.filePath" v-show="false"></i-input>
								<p class="fileName">
									<img :src="displayUrl(item.id)" :class="{hide:!item.filePath}">
									<span @click="delFile(item.id,index)">{{$t('classlist_compontents_detailinfo_46')}}</span>
								</p>
							</div>
							<div class="fl schoolLogoBox" v-if="!accountData.receiptList.length">
							</div>
							<div class="fl uploadBox">
								<!-- <Upload ref="upload" name='files' :data="{'type':'ht_receipt','studentId':ecId,'dirName':'business','isOverride':0,'menuId':201}" :show-upload-list="false" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :action="uploadToPan">
									<Button type="primary">{{$t('modules_spoc_sign_web_src_views_contractmanage_components_scannedupload_5645')}}</Button>
								</Upload> -->
								<Upload 
                                    ref="upload" 
                                    name='file' 
                                    :data="{'bizId': '', 'bizType':'image','studentId':ecId,'bizId':'','isSingle':true}" 
                                    :show-upload-list="false" 
                                    :on-success="handleSuccess" 
                                    :format="['jpg','jpeg','png']" 
                                    :max-size="2048" 
                                    :on-format-error="handleFormatError" 
                                    :on-exceeded-size="handleMaxSize" 
                                    :headers="headers"
                                    :action="imgAction">
									<Button type="primary">{{$t('modules_spoc_sign_web_src_views_contractmanage_components_scannedupload_5645')}}</Button>
								</Upload>
								<p class="tips">{{$t('modules_spoc_sign_web_src_views_mypact_mypact_6683')}}</p>
								<!--<div class="ivu-form-item-error-tip error_tips">{{imgErrorTips}}</div>-->
							</div>
						</div>
					</Form-item>
					<div style="margin-left: 114px;">
						<Checkbox v-model="accountRemind" @on-change="accRemind">{{$t('modules_spoc_sign_web_src_views_mypact_mypact_6684')}}</Checkbox>
					</div>
				</Form>
			</div>
			<div slot="footer">
				<Button @click="modalAccount=false">{{$t('classroom_allscore_53')}}</Button>
				<Button type="primary" @click="accOk" :disabled="okDisable">{{$t('classroom_allscore_54')}}</Button>
			</div>
		</Modal>
		<Modal v-model="modalFile" :mask-closable="false" :closable="false" ref="modalFile" :title="fileTit" width="730" class="modalFile modal-form">
			<div>
				<Form ref="formFile" :label-width="150" class="formFile">
					<FormItem :label="$t('modules_spoc_sign_web_src_views_approval_approvalnew_5071')" class="pactId">
						<p>{{fileData.id}}</p>
					</FormItem>
					<FormItem :label="$t('modules_spoc_sign_web_src_views_contractmanage_components_scannedupload_5642')" style="margin-bottom: 14px;" class="scan">
						<div class="fileBox">
							<div class="fileNameBox" v-for="(item,index) in fileData.scanlist" v-if="fileData.scanlist.length" :key="item.id">
								<p class="copyFileName">
									<a href="javascript:void(0)" v-text="!!item.fileName?item.fileName:''">
									</a>
									<span @click="delFile1(item.id,index)">{{$t('classlist_compontents_detailinfo_46')}}</span>
								</p>
							</div>
							<p style="float: left;" v-if="!fileData.scanlist.length">{{$t('modules_spoc_sign_web_src_views_contractmanage_components_scannedupload_5644')}}</p>
							<div class="fl uploadBox">
								<!-- 	<Upload ref="upload" name="files" :data="{'objectId':modalId,'type':'ht_contract_scan','dirName':fileData.type=='images'?'images':fileData.type=='files'?'files':'all','isOverride':1}" :show-upload-list="false" :on-success="handleSuccess2" :format="['jpg','jpeg','png','pdf']" :max-size="2048" :on-format-error="handleFormatError2" :on-exceeded-size="handleMaxSize" :action="uploadFile"><Button type="primary">{{$t('modules_spoc_sign_web_src_views_contractmanage_components_scannedupload_5645')}}</Button></Upload> -->
								<!--<Button type="primary" @click="onUploadLocal">{{$t('modules_spoc_sign_web_src_views_contractmanage_components_scannedupload_5645')}}</Button>-->
								<Upload 
                                    ref="upload" 
                                    name="file" 
                                    :headers="headers"
                                    :data="{'bizId': modalId, 'bizType': 'image', 'isSingle': true}" 
                                    :show-upload-list="false" 
                                    :on-success="handleSuccess2" 
                                    :format="['jpg','jpeg','png','pdf']" 
                                    :max-size="2048" 
                                    :on-format-error="handleFormatError2" 
                                    :on-exceeded-size="handleMaxSize" 
                                    :action="imgAction">
                                    <Button type="primary">{{$t('modules_spoc_sign_web_src_views_contractmanage_components_scannedupload_5645')}}</Button>
                                </Upload>
							</div>
						</div>
					</FormItem>
				</Form>
			</div>
			<div slot="footer">
				<Button @click="modalFile=false">{{$t('classroom_allscore_53')}}</Button>
				<Button type="primary" @click="archive">{{$t('classroom_allscore_54')}}</Button>
			</div>
		</Modal>
		<up-to-pan ref="uptopan1" :studentId="ecId" :object-id="modalId" :dir="''" type="HT_CONTRACT_SCAN" fileType="all" @uploadok="onUploadOk1" :detector="detector" :format="['jpg','jpeg','png','pdf']" dirName="business" />
		<Modal v-model="modalJournal" :title="jouTit" width="730" class="modalJournal modal-form">
			<Table border :columns="journalCol" :data="journalData"></Table>
		</Modal>
		<Modal ref="appoModal" v-model="appoModal" :title="$t('modules_spoc_sign_web_src_views_mypact_mypact_6687')" width="730" class="appoModal modal-form" @on-ok="appok('formTrans')">
			<div>
				<Form ref="formTrans" :label-width="120" :rules="formTransRule" :model="appoForm" class="formTrans">
					<FormItem :label="$t('modules_spoc_sign_web_src_views_mypact_mypact_6688')" prop="appoDate">
						<DatePicker v-model="appoForm.appoDate" format="yyyy/MM/dd HH:mm" type="datetime" :placeholder="$t('modules_spoc_sign_web_src_views_mypact_mypact_6689')" style="width: 270px"></DatePicker>
						<Checkbox v-model="appoForm.remind" true-value="1" false-value="0">{{$t('modules_spoc_sign_web_src_views_mypact_mypact_6690')}}</Checkbox>
					</FormItem>
				</Form>
			</div>
		</Modal>
		<Modal ref="promModal" v-model="promModal" :title="$t('modules_spoc_sign_web_src_modules_pactcard_4843')" width="730" class="promModal modal-form" @on-ok="promOk('promValidate')">
			<div>
				<Form ref="promValidate" :rules="promFormRule" :model="promForm" :label-width="120" class="prom-form">
					<FormItem :label="$t('modules_spoc_sign_web_src_modules_preview_4905')">
						<Input v-model="promForm.signPrice" type="text" :disabled="!isCeo" class="width204"></Input>{{$t('modules_spoc_sign_web_src_views_mypact_mypact_6693')}}</FormItem>
					<FormItem :label="$t('modules_spoc_sign_web_src_views_mypact_mypact_6647')" prop="signTime">
						<DatePicker transfer v-model="promForm.signTime" :options="options" format="yyyy-MM-dd HH:mm:ss" type="datetime" :placeholder="$t('modules_spoc_sign_web_src_views_mypact_mypact_6689')" style="width: 270px"></DatePicker>
					</FormItem>
					<!--<FormItem :label="$t('modules_spoc_sign_web_src_views_mypact_mypact_6694')" prop="no">
						<Input v-model="promForm.no" type="text" style="width: 270px;"></Input>
					</FormItem>-->
					<!--<FormItem :label="$t('modules_spoc_sign_web_src_views_mypact_mypact_6663')" style="margin-bottom: 0px;" v-if="false">
						<div v-for="(item,index) in promForm.partners" :key="index" style="margin-bottom: 10px;">
							<div style="float: left;">
								<v-select style="width: 150px;margin-right: 4px;display: inline-block;" :placeholder="$t('modules_spoc_sign_web_src_views_mypact_mypact_6664')" :listIndex="index" icon="chevron-down" v-model="item.partnerName" k='name' :datafunc="searchDropList1" @selected="textChange2" @blur="unselect2"></v-select>
							</div>
							<div style="float: left;">
								<Input v-model="item.ratio" :placeholder="$t('modules_spoc_sign_web_src_views_mypact_mypact_6665')" style="width: 114px;">
								<span slot="append">%</span>
								</Input>
							</div>
							<Button type="primary" @click="addProm" v-if="index==promForm.partners.length-1" class="inline mr10">{{$t('classroom_allscore_52')}}</Button>
							<Button @click="delProm(index)" class="inline mr10">{{$t('classlist_compontents_detailinfo_46')}}</Button>
						</div>
					</FormItem>-->
				</Form>
			</div>
		</Modal>
		<add-invoice
			ref="invoiceModel"
			@updataTable='updataTable'
			from='admin'
		>
		</add-invoice>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import vSearchOptions from "../../modules/vSearchOptions";
	import vSelect from "../../modules/vSelect.vue";
	import pactCard from "../../modules/pactCard.vue";
	import upToPan from '../../modules/planUpToPan';
	import valid, {
		errors,
		common,
		htContract,
		sysUser,
		account,
		htContractTpl,
		sysAttachment,
		sysDict,
		api
	} from "../../libs/request.js";
	import addInvoice from '../../modules/addInvoice'

	export default {
		name: 'sign.myPact',
		data() {
			return {
                options: {
                    disabledDate (date) {
                        const disabledTime = date.getTime();
                        return disabledTime >= new Date().getTime();
                    }
                },
				ecId:'',
				okDisable: false,
				tabsNum: 'wait',
				close: false,
				fileTit: this.$t('modules_spoc_sign_web_src_modules_pactcard_4872'),
				compact: '',
				auditStatus: '',
				payment: [],
				accId: [],
				accountTite: this.$t('modules_spoc_sign_web_src_modules_pactcard_4845'),
				count: 10,
				page: 1,
				pageSize: 10,
				flag: 1,
				jouTit: this.$t('modules_spoc_sign_web_src_modules_pactcard_4875'),
				detector: {
					type: 'name',
					condition: '',
					content: ''
				},
				isProtocol: '',
				receiptStatus: '',
				info: {},
				list: [],
				cardPrice: '',
				bankList:[],
				oldPrice: 0,
				wait: {
					searchName: '',
					countryList: [{
							id: 0,
							label: this.$t('message_index_287')
						},
						{
							id: 6015,
							label: this.$t('modules_spoc_sign_web_src_views_mypact_mypact_6699')
						},
						{
							id: 6013,
							label: this.$t('modules_spoc_sign_web_src_views_mypact_mypact_6700')
						},
						{
							id: 6014,
							label: this.$t('mycourse_mycourse_388')
						},
						{
							id: 6016,
							label: this.$t('modules_spoc_sign_web_src_views_mypact_mypact_6702')
						},
					],
				},
				other: {
					searchName: this.$t('modules_spoc_sign_web_src_views_category_category_5130'),
					countryList: [{
							id: 0,
							label: this.$t('message_index_287')
						},
						{
							id: 1,
							label: this.$t('modules_spoc_sign_web_src_views_mypact_mypact_6704')
						},
						{
							id: 2,
							label: this.$t('modules_spoc_sign_web_src_views_mypact_mypact_6705')
						},
					],
				},
				receiptStatusList: {
					searchName: this.$t('modules_spoc_sign_web_src_views_mypact_mypact_6706'),
					countryList: [{
							id: 0,
							label: this.$t('message_index_287')
						},
						{
							id: 1,
							label: this.$t('modules_spoc_sign_web_src_views_mypact_mypact_6707')
						},
						{
							id: 2,
							label: this.$t('modules_spoc_sign_web_src_views_mypact_mypact_6708')
						},
						{
							id: 3,
							label: this.$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1749')
						},
					],
				},
				teamwork: {
					searchName: '',
					countryList: [{
							id: 0,
							label: this.$t('modules_spoc_sign_web_src_views_mypact_mypact_6709')
						},
						{
							id: 1,
							label: this.$t('modules_spoc_sign_web_src_views_mypact_mypact_6710')
						},
					],
				},
				beforeTime: '',
				afterTime: '',
				modalId: '',
				modalOff: false,
				modalMake: false,
				makeData: {
					signTime: '',
					no: '',
					partners: [{
						partnerId: '',
						partnerName: '',
						ratio: ''
					}]
				},
				makeRule: {
					signTime: [{
						required: true,
						type: 'date',
						message: this.$t('modules_spoc_sign_web_src_views_mypact_mypact_6711'),
						trigger: 'change'
					}],
				},
				modalAccount: false,
				accountData: {
					planId: '',
					curReceipt: '',
					type: '',
					id: '',
					account: '',
					bank:'',
					receiptPlans: [],
					receiptList: [],
				},
				accountRule: {
					curReceipt: [
						//						{required:true, message:"金额不能为空", trigger: 'blur'},
						{
							required: true,
							pattern: /^\d+\.{0,1}\d*$/,
							message: this.$t('modules_spoc_crm_web_src_modules_resourceentrymodal copy_532'),
							trigger: 'blur'
						},
					],
					type: [{
						required: true,
						message: this.$t('modules_spoc_sign_web_src_views_mypact_mypact_6713'),
						trigger: 'change'
					}],
					account: [{
						required: true,
						message: this.$t('modules_spoc_sign_web_src_views_mypact_mypact_6714'),
						trigger: 'change'
					}],
					bank: [{
						required: true,
						message: this.$t('modules_spoc_sign_web_src_views_mypact_mypact_6715'),
						trigger: 'change'
					}],
					receiptList: [{
						required: true,
						type: 'array',
						message: this.$t('modules_spoc_sign_web_src_views_mypact_mypact_6716'),
						trigger: 'change'
					}],
				},
				htReceiptDetails: [],
				accountRemind: true,
				modalFile: false,
				fileData: {
					id: '2017BJ-G-VIP-001',
					scanUrl: '',
					scanlist: [],
					type: ''
				},
				modalJournal: false,
				appoModal: false,
				appoForm: {
					appoDate: '',
					remind: '1'
				},
				formTransRule: {
					appoDate: [{
						required: true,
						type: 'date',
						message: this.$t('modules_spoc_sign_web_src_views_mypact_mypact_6711'),
						trigger: 'change'
					}],
				},
				promModal: false,
				promForm: {
					signPrice: '',
					signTime: new Date(),
					no: '',
					partners: [{
						partnerId: '',
						partnerName: '',
						ratio: ''
					}]
				},
				promFormRule: {
					signTime: [{
						required: true,
						type: 'date',
						message: this.$t('modules_spoc_sign_web_src_views_mypact_mypact_6711'),
						trigger: 'change'
					}],
//					no: [{
//						required: true,
//						message: "编号不能为空",
//						trigger: 'blur'
//					}],
				},
				journalCol: [{
						title: this.$t('courselist_compontents_detailinfo_160'),
						type: 'index',
						align: 'center',
						resizable: true,
						width: null,
					},
					{
						title: this.$t('integralflow_10'),
						align: 'center',
						key: 'optUserName',
						resizable: true,
						width: null,
					},
					{
						title: this.$t('classlist_compontents_detailinfo_45'),
						align: 'center',
						key: 'content',
						resizable: true,
						width: null,
						render: (h, params) => {
							return h('div', {}, [
								h('p', {}, params.row.content),
								h('p', {style:{'word-break':'break-all'}}, !!params.row.reason ? this.$t('modules_spoc_sign_web_src_views_mypact_mypact_6720') + params.row.reason : '')
							])
						}
					},
					{
						title: this.$t('messagemanagement_components_histroylists_313'),
						align: 'center',
						key: 'optTime',
						resizable: true,
						width: null,
					}
				],
				journalData: [],
				imgAction: '',
				headers:{}
			}
		},
		computed: {
			...mapGetters('sign', ['isCeo']),
			uploadFile: function() {
				return sysAttachment.uploadFileUrl();
			},
			uploadToPan: function() {
				return sysAttachment.uploadToPanUrl();
			},
			
		},
		components: {
			vSelect,
			vSearchOptions,
			pactCard,
			upToPan,
			addInvoice,
		},
		created() {
			let params = {
				name: this.compact,
				status: 'committed,checked',
				auditStatus: '',
				'from': 1,
				pageNo: this.page,
				pageSize: this.pageSize,

			}
			htContract.list(params).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.list = res.data.data.list;
					this.info = res.data.data.attach;
					this.count = res.data.data.count;
				}
			}).catch(errors.call(this)).finally(() => {});
			let params1 = {
				type: 'ht_receipt_detail_type'
			}
			sysDict.listData(params1).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.payment = res.data.data;
				}
			}).catch(errors.call(this)).finally(() => {});
			htContractTpl.listAccount().then(valid.call(this)).then(res => {
				if(res.ok) {
					this.accId = res.data.data;
				}
			}).catch(errors.call(this));

		},
		mounted() {
			this.$el.parentElement.scrollTop = 0
			this.imgAction = api.fileAttachmentUploadUrl(); // sysUser.uploadImg();
            this.headers = {
                token: localStorage.getItem('token'),
                tenant: localStorage.getItem('tenant')	
            }
		},
		methods: {
			showInvoiceModel(val) {
				this.$refs.invoiceModel.show(val)
			},
			
			displayUrl(id) {
				return sysAttachment.displayUrl(id);
			},
			updataTable() {
				this.getList()
			},
			getList() {
				let val, tType;
				if(this.tabsNum == "wait") {
					val = 'committed,checked';
					tType = 1;
				} else if(this.tabsNum == "closed") {
					val = 'closed,refund';
					tType = 1;
				} else if(this.tabsNum == "signed") {
					val = 'signed,accounted,collected';
					tType = 2;
				} else {
					val = this.tabsNum;
					tType = 2;
				}
				let params = {
					name: this.compact,
					status: val,
					auditStatus: this.auditStatus,
					isProtocol: this.isProtocol,
					receiptStatus: this.receiptStatus,
					'from': 1,
					pageNo: this.page,
					pageSize: this.pageSize,
				}
				if(!!this.beforeTime) {
					if(this.tabsNum == "signed") {
						params.signStartDate = (new Date(this.beforeTime)).format('yyyy-MM-dd');
					}else{
						params.createStartDate = (new Date(this.beforeTime)).format('yyyy-MM-dd');
					}
					params.timeType = tType;
				};
				if(!!this.afterTime) {
					if(this.tabsNum == "signed") {
						params.signEndDate = (new Date(this.afterTime)).format('yyyy-MM-dd');
					}else{
						params.createEndDate = (new Date(this.afterTime)).format('yyyy-MM-dd');
					}
					params.timeType = tType;
				} else if(!!this.beforeTime && !this.afterTime) {
					if(this.tabsNum == "signed") {
						params.signEndDate = (new Date()).format('yyyy-MM-dd');
					}else{
						params.createEndDate = (new Date()).format('yyyy-MM-dd');
					}
				};
				htContract.list(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.list = res.data.data.list;
						this.info = res.data.data.attach;
						this.count = res.data.data.count;
					}
				}).catch(errors.call(this)).finally(() => {});
			},
			getPartnerShip() {
				let params = {
					name: this.compact,
					pageNo: this.page,
					pageSize: this.pageSize,
					flag: this.flag
				}
				if(!!this.beforeTime) {
					params.startTime = (new Date(this.beforeTime)).format('yyyy-MM-dd');
					params.timeType = tType;
				};
				if(!!this.afterTime) {
					params.endTime = (new Date(this.afterTime)).format('yyyy-MM-dd');
					params.timeType = tType;
				} else if(!!this.beforeTime && !this.afterTime) {
					params.endTime = (new Date()).format('yyyy-MM-dd');
				};
				htContract.listPartnerShip(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.list = res.data.data.list;
						this.info = res.data.data.attach;
						this.count = res.data.data.count;
					}
				}).catch(errors.call(this)).finally(() => {});
			},
			timeCharge() {
				//				timeCharge
				this.$nextTick(() => {
					this.getList();
				})
			},
			tabCut(val) {
				this.list=[];
				this.$nextTick(() => {
					this.afterTime='';
					this.beforeTime='';
					this.auditStatus = '';
					this.isProtocol = '';
					this.receiptStatus = '';
					this.page = 1;
					if(this.tabsNum == 'collaborate') {
						this.getPartnerShip();
					} else {
						this.getList()
					}
				})
			},
			searchDropList(word) {
				return new Promise((resolve, reject) => {});
			},
			searchDropList1(word) {
				return new Promise((resolve, reject) => {
					let params = {
						name: word
					}
					sysUser.listAllUserMap(params).then(valid.call(this)).then(res => {
						if(res.ok) {
							resolve(res.data.data);
						} else {
							reject(res);
						}
					}).catch(err => {
						errors.call(this);
						reject(err);
					});
				});
			},
			textChange1: function(val, ind) {
				this.$nextTick(() => {
					this.makeData.partners[ind].partnerId = val.id;
				})
			},
			textChange2: function(val, ind, vid) {
				this.$nextTick(() => {
					this.promForm.partners[ind].partnerId = val.id;
				})
			},
			textChange: function(val) {
				this.$nextTick(() => {
					if(this.tabsNum == 'collaborate') {
						this.getPartnerShip();
					} else {
						this.getList()
					}
				})
			},
			nationalChange(item) {
				console.log(item);
			},
			pullTags(val) {
				console.log(val)
				if(val == 0) {
					this.auditStatus = '';
				} else if(val == 6015) {
					this.auditStatus = 'waiting';
				} else if(val == 6013) {
					this.auditStatus = 'agree';
				} else if(val == 6014) {
					this.auditStatus = 'reject';
				} else if(val == 6016) {
					this.auditStatus = 'nocheck';
				}
				if(this.tabsNum == 'collaborate') {

				} else {
					this.getList();
				}
			},
			pullTags1(val) {
				if(val == 0) {
					this.isProtocol = '';
				} else if(val == 1) {
					this.isProtocol = '1';
				} else if(val == 2) {
					this.isProtocol = '0';
				}
				if(this.tabsNum == 'collaborate') {

				} else {
					this.getList();
				}
			},
			pullTagsReceiptStatus(val) {
				if(val == 0) {
					this.receiptStatus = '';
				} else {
					this.receiptStatus = val - 1;
				}
				if(this.tabsNum == 'collaborate') {

				} else {
					this.getList();
				}
			},
			pullTags2(val) {
				if(val == 0) {
					this.flag = 1;
				} else if(val == 1) {
					this.flag = 2;
				}
				this.getPartnerShip();
			},
			offModal(val) {
				this.modalOff = true;
				this.modalId = val.id;
			},
			redactModal(val) {
				this.$router.push({
					name: 'sign.contractGeneration',
					query: {
						id: val.tplId,
						mid: val.id
					}
				})
			},
			makeModal(val) {
				this.modalMake = true;
				this.modalId = val.id;
				let params = {
					ctId: this.modalId
				}
				htContract.formSign(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.makeData.signTime = res.data.data.signTime;
						this.makeData.no = res.data.data.no;
						if(res.data.data.partners.length) {
							let arr = [];
							res.data.data.partners.forEach((v, k) => {
								v.ratio = v.ratio * 1e2;
								arr.push(v);
							})
							this.makeData.partners = arr;
						} else {
							this.makeData.partners = [{
								partnerId: '',
								partnerName: '',
								ratio: ''
							}];
						}
					}
				}).catch(errors.call(this)).finally(() => {});
			},
			unClose(val) {
				this.modalId = val.id;
				this.close = true;
			},
			unCloseOk() {
				let params = {
					id: this.modalId
				}
				htContract.cancelCloseContract(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.tabsNum = 'wait';
						this.getList();
						this.close = false;
					}
				}).catch(errors.call(this));
			},
			goPreview(val) {
				this.modalId = val.id;
				this.$router.push({
					name: 'sign.pactPreview',
					query: {
						id: val.id
					}
				})
			},
			getAcc() {
				let params = {
					ctId: this.modalId
				}
				account.formAccounted(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.htReceiptDetails = res.data.data.htReceiptDetails;
						let oldPrice = 0;
						if(this.htReceiptDetails.length) {
							this.account = this.htReceiptDetails[0].account
							this.htReceiptDetails.forEach((v, k) => {
								let num = (typeof v.factRecipot === 'number' && isFinite(v.factRecipot)) ? v.factRecipot : 0;
								oldPrice += num;
							})
						}
						this.oldPrice = oldPrice;
						this.accountData.planId = res.data.data.htReceiptDetail.planId;
						if(res.data.data.htReceiptPlans.length) {
							this.accountData.receiptPlans = res.data.data.htReceiptPlans;
							let log = true;
							res.data.data.htReceiptPlans.map((v, k) => {
								if(v.isNotify == '0') {
									log = false;
								}
							})
							this.accountRemind = log;
							this.accRemind(log);
							///AAA
						} else {
							this.accountData.receiptPlans = []
						}
						if(res.data.data.htReceiptDetail.receiptList.length) {
							this.accountData.receiptList = res.data.data.htReceiptDetail.receiptList;
						} else {
							this.accountData.receiptList = [];
						}
						this.accountData.id = res.data.data.htReceiptDetail.id;
						this.accountData.curReceipt = res.data.data.htReceiptDetail.curReceipt;
						this.accountData.type = res.data.data.htReceiptDetail.type;
						if(res.data.data.htReceiptDetails.length){
							let length=res.data.data.htReceiptDetails.length;
							this.accountData.account = res.data.data.htReceiptDetails[length-1].account;
						}else{
							this.accountData.account = res.data.data.htReceiptDetail.account;
						}
						//						this.$refs['formAccount'].validate();
						this.modalAccount = true;
					}
				}).catch(errors.call(this)).finally(() => {});
			},
			delFile(id, ind) {
				// console.log(id)
				if(id) {
					let params = {
						'id': id
					}
					sysAttachment.delete(params).then(valid.call(this)).then(res => {
						if(res.ok) {
							this.$Message.success(res.data.message);
							this.accountData.receiptList.splice(ind, 1);
						}
					}).catch(errors.call(this));
				}
			},
			delFile1(id, ind) {
				// console.log(id);
				//				return false;
				if(id) {
					let params = {
						'id': id
					}
					sysAttachment.delete(params).then(valid.call(this)).then(res => {
						if(res.ok) {
							//							this.formArchive();
							this.fileData.scanlist.splice(ind, 1);
						}
					}).catch(errors.call(this));
				} else {
					//					this.formArchive();
					this.fileData.scanlist.splice(ind, 1);
					this.fileData.scanUrl = '';
				}
			},
			accRemind(val) {
				if(val) {
					this.accountData.receiptPlans.forEach((v, k) => {
						v.isNotify = '1';
					})
				} else {
					this.accountData.receiptPlans.forEach((v, k) => {
						v.isNotify = '0';
					})

				}
			},
			accOk() {
				this.$refs.formAccount.validate((ok) => {

					if(ok) {
						let sum = 0;
						this.accountData.receiptPlans.forEach((v, k) => {
							sum += Number(v.planReceipt) || 0;
							v.planReceiptTime = (new Date(v.planReceiptTime)).format('yyyy-MM-dd hh:mm:ss');
						})
						//						this.accountData.receiptPlans.forEach((v,k)=>{
						//						})
						//console.log(Number(this.cardPrice))
						//console.log(Number(this.oldPrice))
						//console.log(Number(this.accountData.curReceipt))
						//console.log(Number(sum))
						if(Number(this.cardPrice) == Number(this.oldPrice) + Number(this.accountData.curReceipt) + Number(sum)) {
								console.log(this.accountData, )
							let params = this.accountData;
							params.ctId = this.modalId;
							let arr = [];
							params.receiptPlans.forEach((v, k) => {
								if(v.planReceipt) {
									arr.push(v)
								}
							});
							params.receiptPlans = arr;
							this.okDisable = true;
							account.accounted(params).then(valid.call(this)).then(res => {
								if(res.ok) {
									this.$Message.success(res.data.message);
									this.modalAccount = false;
									this.okDisable = false
									this.getList();
								}else{
									this.okDisable = false
								}
							}).catch(errors.call(this));
						} else if(Number(this.cardPrice) > Number(this.oldPrice) + Number(this.accountData.curReceipt) + Number(sum)) {
							this.$Modal.success({
								content: this.$t('modules_spoc_sign_web_src_views_mypact_mypact_6722')
							});
						} else {
							this.$Modal.success({
								content: this.$t('modules_spoc_sign_web_src_views_mypact_mypact_6723')
							});
						}
					}
				})
			},
			accountModal(val) {
				this.modalId = val.id;
				this.cardPrice = val.htSign.signPrice
				this.accountTite = this.$t('modules_spoc_sign_web_src_modules_pactcard_4871');
				this.$refs['formAccount'].resetFields();
				this.getAcc();
			},
			accounting(val) {
				this.modalId = val.id;
				this.ecId=val.ecId;
				this.accountTite = this.$t('modules_spoc_sign_web_src_modules_pactcard_4845');
				this.$refs['formAccount'].resetFields();
				this.cardPrice = val.htSign.signPrice
				if(!!this.accountData.curReceipt) {
					this.accountData.curReceipt = val.htSign.signPrice;
				}
				this.getAcc();
			},
			fileModal(val, tit) {
				this.modalFile = true;
				this.modalId = val.id;
				this.ecId = val.ecId;
				this.fileTit = tit;
				this.fileData.id = val.no;
				this.formArchive();
			},
			formArchive() {
				let params = {
					id: this.modalId
				}
				htContract.formArchive(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$Message.success(res.data.message);
						if(res.data.data.length) {
							this.fileData.scanlist = res.data.data;
						} else {
							this.fileData.scanlist = [];
						}
					}
				}).catch(errors.call(this));
			},
			archive() {
					let params={
						id:this.modalId
					}
					htContract.archive(params).then(valid.call(this)).then(res => {
						if(res.ok) {
								this.$refs.modalFile.visible = false;
								this.modalFile = false;
								this.getList();
						}else{
								this.$refs.modalFile.visible = true;
								this.modalFile = true;
						}
					}).catch(errors.call(this)).finally(() => {});
			},
			journalModal(val, tit) {
				this.modalJournal = true;
				this.jouTit = tit;
				this.modalId = val.id;
				let params = {
					ctId: this.modalId
				}
				htContract.listOptLog(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.journalData = res.data.data;
					}
				}).catch(errors.call(this)).finally(() => {});

			},
			closePact() {
				let params = {
					id: this.modalId
				}
				htContract.closeContract(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$Message.success(res.data.message);
						this.modalOff = false;
						this.getList();
					}
				}).catch(errors.call(this)).finally(() => {});
			},
			addReceipt() {
				let obj = {
					planReceipt: '',
					planReceiptTime: '',
					isNotify: '1',
					account: this.account
				};
				// console.log(this.account, '00')
				let leng = this.accountData.receiptPlans.length;
				this.accountData.receiptPlans.splice(leng, 0, obj)
			},
			delReceipt(ind) {
				if(this.accountData.receiptPlans.length > 0) {
					this.accountData.receiptPlans.splice(ind, 1);
				} else {
//					let obj = {
//						planReceipt: '',
//						planReceiptTime: '',
//						isNotify: '1'
//					};
//					this.accountData.receiptPlans.splice(0, 1, obj)
				}
			},
			//			addpartners(){
			//				let obj={partnerId:'',partnerName:'',ratio:''};
			//				let leng=this.promForm.partners.length;
			//				this.promForm.partners.splice(leng,0,obj)
			//			},
			addMake() {
				let obj = {
					partnerId: '',
					partnerName: '',
					ratio: ''
				};
				let leng = this.makeData.partners.length;
				this.makeData.partners.splice(leng, 0, obj)
			},
			delMake(ind) {
				this.makeData.partners.splice(ind, 1);
			},
			makeOk(name) {
				this.$refs[name].validate((ok) => {
					if(ok) {
						let arr = [];
						this.makeData.partners.forEach((v, k) => {
							if(v.partnerId != '') {
								arr.push(v);
							}
						});
						arr.forEach((v, k) => {
							v.ratio = v.ratio / 100
						});
						let params = {
							ctId: this.modalId,
							no: this.makeData.no,
							signTime: (new Date(this.makeData.signTime)).format('yyyy-MM-dd hh:mm:ss'),
							partners: this.makeData.partners
						}
						//							params.partners=this.makeData.partners.length?this.makeData.partners:[]
						params.partners = arr;
						htContract.sign(params).then(valid.call(this)).then(res => {
							if(res.ok) {
								this.$Message.success(res.data.message);
								if(this.ecId){
//									let params1 = {
//										cusCode: this.ecId,
//										status: 'sign'
//									}
//									crmCustomerSale.updateStatus(params1).then(valid.call(this)).then(res => {
//										if(res.ok) {}
//									}).catch(errors.call(this));
								}
								this.modalMake = false;
								this.getList();
							}
						}).catch(errors.call(this)).finally(() => {});
					} else {
						this.$refs.xgModal.visible = true;
						this.modalMake = true;
					}
				})
			},
			handleSuccess: function(data) {
				if(data.code == "0") {
					this.$Message.success(data.msg);
					let length = this.accountData.receiptList.length;
					this.accountData.receiptList.splice(length, 0, data.data);
					this.$refs.formAccount.validateField('receiptList')
				} else {
					this.$Message.error(data.msg);
				}
			},
			handleFormatError: function() {
				this.$Message.error(this.$t('modules_usermanage_256'));
			},
			handleSuccess2: function(response) {
				if(response.code == "0") {
					this.$Message.success('上传成功');
//					this.fileData.scanlist.push(data.data);
					let length = this.fileData.scanlist.length;
					this.fileData.scanlist.splice(length, 0, response.data);
				} else {
					this.$Message.error(response.msg);
				}
			},
			handleFormatError2: function() {
				this.$Message.error(this.$t('modules_usermanage_256'));
			},
			handleMaxSize: function() {
				this.$Message.error(this.$t('modules_spoc_sign_web_src_views_mypact_mypact_6727'));
			},
			appointment(val) {
				this.modalId = val.id;
				this.ecId=val.ecId;
				this.appoModal = true;
				console.log(val)
				this.appoForm.appoDate = val.htSign.expectTime;
			},
			appok(name) {
				this.$refs[name].validate((ok) => {
					if(ok) {
						let params = {
							ctId: this.modalId,
							expectTime: (new Date(this.appoForm.appoDate)).format('yyyy-MM-dd hh:mm:ss'),
							isNotify: this.appoForm.remind
						}
						htContract.expect(params).then(valid.call(this)).then(res => {
							if(res.ok) {
								if(this.ecId){
//									let params1 = {
//										cusCode: this.ecId,
//										status: 'unsign'
//									}
//									crmCustomerSale.updateStatus(params1).then(valid.call(this)).then(res => {
//										if(res.ok) {
											this.appoModal = false;
											this.getList();
//										} else {
//											this.$refs.appoModal.visible = true;
//											this.appoModal = true;
//										}
//									}).catch(errors.call(this));
								}else{
									this.appoModal = false;
									this.getList();
								}
							}
						}).catch(errors.call(this)).finally(() => {});
					} else {
						this.$refs.appoModal.visible = true;
						this.appoModal = true;
					}
				})
			},
			promptly(val) {
				this.promModal = true;
				this.modalId = val.id;
				this.ecId=val.ecId;
				let params = {
					ctId: this.modalId
				}
				htContract.formSign(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.promForm.signTime = res.data.data.signTime?new Date(res.data.data.signTime):new Date();
						this.promForm.no = res.data.data.no;
						this.promForm.signPrice = parseFloat((res.data.data.signPrice).toFixed(2));
						if(res.data.data.partners.length) {
							this.promForm.partners = res.data.data.partners;
						} else {
							this.promForm.partners = [{
								partnerId: '',
								partnerName: '',
								ratio: ''
							}];
						}
					}
				}).catch(errors.call(this)).finally(() => {});
			},
			urgeAudit(val) {
				this.modalId = val.id;
				let params = {
					id: this.modalId
				}
				htContract.urgeAudit(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$Modal.success({
							content: this.$t('modules_spoc_sign_web_src_views_mypact_mypact_6728')
						});
					}
				}).catch(errors.call(this)).finally(() => {});
			},
			addProm() {
				let obj = {
					partnerId: '',
					partnerName: '',
					ratio: ''
				};
				let leng = this.promForm.partners.length;
				this.promForm.partners.splice(leng, 0, obj)
			},
			delProm(ind) {
				if(this.promForm.partners.length > 1) {
					this.promForm.partners.splice(ind, 1);
				} else {
					let obj = {
						partnerId: '',
						partnerName: '',
						ratio: ''
					};
					this.promForm.partners.splice(0, 1, obj)
				}
			},
			promOk(name) {
				this.$refs[name].validate((ok) => {
					if(ok) {
						let arr = [];
						this.promForm.partners.forEach((v, k) => {
							arr.push(v);
						});
//						arr.forEach((v, k) => {
//							v.ratio = (v.ratio).toFixed(2);
//						});
						let params = {
							ctId: this.modalId,
							signPrice: (this.promForm.signPrice).toFixed(2),
							no: this.promForm.no,
							signTime: (new Date(this.promForm.signTime)).format('yyyy-MM-dd hh:mm:ss'),
						}
						if(this.promForm.partners.length == 1 && this.promForm.partners[0].partnerId == '') {

						} else {
							//							params.partners=this.promForm.partners.length?this.promForm.partners:[]
							params.partners = arr;
						}
						htContract.sign(params).then(valid.call(this)).then(res => {
							if(res.ok) {
								if(this.ecId){
//									let params1 = {
//										cusCode: this.ecId,
//										status: 'sign'
//									}
//									crmCustomerSale.updateStatus(params1).then(valid.call(this)).then(res => {
//										if(res.ok) {}
//									}).catch(errors.call(this));
								}
								this.$Message.success(res.data.message);
								this.getList();
							}
						}).catch(errors.call(this)).finally(() => {});
					} else {
						this.$refs.promModal.visible = true;
						this.promModal = true;
					}
				})
			},
			pageChange(val) {
				this.page = val;
				if(this.tabsNum == 'collaborate') {
					this.getPartnerShip();
					this.$el.parentElement.scrollTop = 0
				} else {
					this.getList();
					this.$el.parentElement.scrollTop = 0
				}
			},
			sizeChange(val) {
				this.pageSize = val;
				if(this.tabsNum == 'collaborate') {
					this.getPartnerShip();
				} else {
					this.getList()
				}
			},
			addPact() {
				this.$router.push({
					name: 'sign.library',
					query: {}
				})
			},
			unselect(e, wind, ind) {
				if(!wind) {
					this.makeData.partners[ind].partnerName = '';
				}
			},
			unselect2(e, wind, ind) {
				if(!wind) {
					this.promForm.partners[ind].partnerName = '';
				}
			},
			onUploadLocal() {
				this.$refs.uptopan1.doUpload();
			},
			onUploadOk1(data) {
				if(data.status == "success") {
					//					this.attachmentList.push(data.data);
					this.fileData.scanlist.push(data.data);
				} else {
					this.$Message.error(data.message);
				}
			},
			accountChange(id){
				this.accountData.bank='';
				let arr=[];
				this.accId.forEach((v,k)=>{
					if(id==v.id){
						arr.push({accountBank:v.accountBank,id})
					}
				})
				this.bankList=arr;
			}
		}
	}
</script>