<style lang="less">
.taskDetailModal{
	position: relative;
	// .ivu-modal-content{
	// 	max-height: calc(100vh - 200px); 
	// 	overflow-y: scroll;
	// }
	.seal {
		position: absolute;
		z-index: 999;
		right:20px;
		bottom: 20px;
		width: 90px;
		height: 90px;
		padding: 4px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		border: 2px solid rgba(68,188,183,1);
		border-radius: 50%;
		.sealChild{
			width: 80px;
			height: 80px;
			padding: 4px;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			background: rgba(68,188,183,1);
			border-radius: 50%;
			.text {
				transform: rotate(-19deg);
				font-size: 14px;
				color: #fff;
				text-align: center;
			}
		}
	}
	.sopFileList{
		margin-left: 49px;
		margin-bottom: 12px;
		.sopFileTitle, .sopFileContent{
			height:32px;
			font-size:12px;
			font-family:PingFangSC-Medium,PingFang SC;
			font-weight:500;
			color:rgba(73,80,96,1);
			line-height:32px;
			display: flex;
			flex-direction:row;
			// margin-bottom:12px;
			border: 1px solid #EFEFEF;
		}
		.fileName{
			width:265px;
		}
		.fileStatu{
			width: 110px;
		}
		.uploadDate{
			width: 175px;
		}
		.downloadFile{
			width: 140px;
		}
		.uploadAction{
			width: 210px;
			span{
				margin-right:16px;
			}
		}
		.sopFileContent{
			color: #495060;
			font-weight: 400;
			.isDo{
				color:rgba(68,188,183,1);
				cursor:pointer;
			}
			.noDo{
				color:rgba(153,153,153,1);
			}
		}
	}
	.sopParam{
		margin-bottom:12px;
		margin-left: 49px;
		font-size:12px;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		.sopParamTitle{
			margin-right: 10px;
			// color:rgba(153,153,153,1);
		}
		.sopParamContent{
			color:#495060;
		}
	}
	textarea{
		resize: none;
	}
	.v-enter,
    .v-leave-to{
        opacity: 0;
        transform: translateY(0);
    }
    .v-enter-active,
    .v-leave-active{
        transition: all 0.4s ease;
    }

	.ivu-modal-body{
		padding-bottom: 0;
	}
	.fl{
		float: left;
	}
	.fr{
		float: right;
	}
	.contentTop{
		overflow: hidden;
		padding-bottom: 24px;
		border-bottom: 1px solid #EFEFEF;
		.l1{
			.doComplete{
				width:32px;
				height:32px;
				border-radius:4px;
				border:2px solid #979797;
				margin-right: 16px;
				text-align: center;
				color: #FFFFFF;
				cursor: pointer;
			}
			.isComplete{
				background: #44BCB7;
				color: #FFFFFF;
				border:2px solid #44BCB7;
			}
			.username{
				font-size:20px;
				font-weight:500;
				color: #495060;
				margin-bottom: 18px;
				.go360{
					font-size:16px;
					margin-left: 10px;
					color: #44BCB7;
					cursor: pointer;
				}
			}
			
			.mainUser{
				margin-top: 10px;
				overflow: hidden;
				line-height: 32px;
				font-size:14px;
				.mainUserInfO{
					color: #495060;
					cursor: pointer;
					margin-right: 50px;
					.editMainUserInfo{
						position: absolute;
						width:252px;
						height:184px;
						background:rgba(255,255,255,1);
						box-shadow:0px 1px 3px 0px rgba(0,0,0,0.12);
						border-radius:3px;
						border:1px solid rgba(230,231,235,1);
						z-index: 999;
						.userOption{
							font-size:12px;
							line-height:17px;
							padding: 8px 18px 7px 12px;
							&:hover{
								background: #F2F3F7;
							}
						}
					}
				}
				.data1{
					width:32px;
					height: 32px;
					border-radius: 16px;
					line-height: 32px;
					text-align: center;
					margin-right: 8px;
				}
				.mainUserDate{
					color: #495060;
					cursor: pointer;
					margin-right: 50px;
				}
				.changeHot{
					position: absolute;
					z-index: 99999999;
					.changeIsHotChild{
						position: absolute;
						left: -46px;
						top: 4px;
						width:83px;
						height:69px;
						background:rgba(255,255,255,1);
						box-shadow:0px 1px 3px 0px rgba(0,0,0,0.12);
						border-radius:3px;
						border:1px solid rgba(230,231,235,1);
						.choose{
							overflow:hidden;
							height: 34px;
							padding-top: 10px;
							padding-left: 15px;
							cursor: pointer;
						}
						.colorBlock{
							width:14px;
							height:14px;
							border-radius:4px;
							float: left;
							margin-right: 2px;
						}
						.jinJifont{
							float: left;
							color: #333333;
							line-height: 14px;
						}

					}
				}
			}
			.buchong{
				margin-top: 18px;
				font-size: 14px;
				color: #495060;
				span{
					color: #999999;
				}
			}
			.createUser{
				border-right: 1px solid #E6E7EB; 
				.createUserLabel{
					color: #999999;
					font-size: 12px;
					margin-bottom: 12px;
				}
				.createUserName{
					overflow: hidden;
					img{
						width:24px;
						height:24px;
						border-radius: 12px; 
						margin-right: 10px;
					}
					.createUserNameF{
						font-size: 12px;
						line-height: 24px;
						margin-right: 20px;
						width:60px;
					}
				}
				.createUserDate{
					width:137px;
					// height:24px;
					line-height: 24px;
					background:rgba(238,238,238,1);
					border-radius:16px;
					color: #495060;
					// padding-left: 14px;
					text-align: center;
					margin-bottom: 10px;
				}
			}
		}
	}
	.contentMid{
		margin-top: 12px;
		// padding:12px 0 12px 42px;
		// height:290px;
		// border-bottom: 1px solid #EFEFEF;
		.msg{
			overflow: hidden;
			// border-bottom: 1px solid #EFEFEF;
			// padding: 20px 0;
			padding-top: 12px;
			.avator{
				width: 32px;
				height: 32px;
				border-radius: 24px;
				margin-right: 12px;
			}
			.msgContent{
				.name{
					color: #495060;
					margin-right: 8px;
					font-size: 14px; 
				}
				.time{
					color: #999999;
					font-size: 14px; 
				}
				.msgContentHtml{
					margin-top: 6px;
					width:780px;
					word-break: break-all;
					word-wrap: break-word;
				}
			}
			&:last-child{
				border-bottom:none;
			}
		}
	}
	.contentBottom{
		margin-bottom: 12px;
		padding-left: 4px;
		// padding:14px 0 26px 26px;
		// height:290px;
		.record{
			overflow: hidden;
			padding: 6px 0;
			.recordType{
				width: 16px;
				height: 16px;
				border-radius: 8px;
				margin-right: 6px;
			}
			.recordContent{
				width:880px;
			}
		}
	}
	.dynamicForm{
		// padding: 24px;
		// height:290px;
		padding-top: 16px;
		border-bottom:1px solid #EFEFEF;
		.desc1{
			font-size:14px;
			color:#999999;
			margin-right: 12px;
		}
		.desc2{
			font-size:14px;
			color:#44BCB7;
			cursor: pointer;
		}
	}
	.footerDiv{
		overflow: hidden;
		img{
			width:32px;
			height:32px;
			border-radius: 16px;
			margin-right: 16px;
			margin-left: 32px;
		}
		.inputDiv{
			width:852px;
			height:36px;
			line-height: 36px;
			background:rgba(243,243,243,1);
			border-radius:4px;
			border:1px solid rgba(217,217,217,1);
			font-size: 14px;
			color:#999999;
			text-align: left;
			padding-left:20px;
			cursor: pointer;
			&:hover{
				border:1px solid #44BCB7;
				background: #FFFFFF;
			}
		}
	}
	.contentMid_contentBottom{
		margin-top:21px;
		margin-left:21px;
		margin-bottom:12px;
		height: 16px;
		line-height:16px;
		.active{
			color: #44BCB7;
		}
		.c1{
			cursor:pointer;
			display:inline-block;padding-right:16px;
		}
		.c2{
			border-left: 1px solid #EFEFEF;
			cursor:pointer;
			padding:0 16px;
			display:inline-block;
		}
	}
	.commentList{
		// position: absolute;
		// bottom:0;
		// left: 0;
		background: #fff;
		// width:1000px;
		// border: 1px solid #EFEFEF;
		// border-radius: 10px;
		// padding: 20px;
		// box-shadow:0px 1px 3px 0px rgba(0,0,0,0.12);
		margin-top: 12px;
		.avator{
			width:32px;
			height:32px;
			border-radius: 16px;
			margin-right: 16px;
			// margin-left: 32px;
		}
		.task-img{
			float: left;
			margin-right: 16px;
			line-height: 1;
			color: #44BCB7;
			width: 75px;
			cursor: pointer;
			i{
				position: relative;top: -1px;
				font-size: 15px;margin-right: 4px;
			}
		}
		.rightbtn{
			float: right;margin-left: 12px;
		}
	}
	.w306{
		width: 187px;
	}
}
.taskCompleteModal{
	.w306{
		width: 306px;
	}
	.ivu-modal-body{
		padding-bottom: 0;
	}
}
</style>
<template>
	<div>
		<Modal
			v-model="taskDetailModal"
			:title="$t('modules_spoc_crm_web_src_views_onsitemanagement_onsitemanagement_1461')"
			width="1000"
			class="taskDetailModal"
			:mask-closable="false"
			:footer-hide="true"
			:loading="loadingTaskCompleteModal"
			@on-cancel="chooseCancel()"
		>
			<div @click="falseAll">
				<div class="seal" v-if="isComplete">
					<div class="sealChild">
						<span class="text">{{$t('modules_spoc_crm_web_src_views_onsitemanagement_onsitemanagement_1444')}}</span>
					</div>
				</div>
				<div class="contentTop">
					<div class="l1 fl">
						<div class="doComplete" :class="{'isComplete': isComplete}" @click="toShowTaskCompleteModal">
							<i class="iconfont icon-duigou"></i>
						</div>
					</div>
					<div class="l1 fl" style="width:628px;">
						<p class="username">{{detailObj.taskTpl.name}}({{detailObj.objectName}})<span v-show="$route.name !='crm.customer360'" @click="go360" class="go360">{{$t('modules_spoc_crm_web_src_views_taskcenter_taskcenterall_1807')}}</span><span style="font-size:16px;color:#46BC15;margin-left:10px;" v-show="isComplete">{{detailObj.completeResultObj ? detailObj.completeResultObj.resultLabel : ''}}</span></p>
						<div class="mainUser">
							<img class="fl data1" src="../../assets/img/task/yyhf.png" :title="$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1742')"/>
							<div class="mainUserInfO fl" :title="$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1742')">
								<span @click.stop="toshowMainUser">{{executorName}}</span>
								<div @click.stop="" class="editMainUserInfo" v-show="showEditMainUserInfo">
									<Input style="width:228px;margin-left:12px;margin-top:10px;" v-model="searchUserModel" search :placeholder="$t('scoretemplate_compontents_scoremodify_528')" />
									<div style="overflow-y:auto;height:128px;margin-top: 12px;">
										<div class="userOption" @click="selectExecutor(item.id)" v-for="(item, index) in classTeacherList" :key="index" v-show="(!searchUserModel) || item.name.indexOf(searchUserModel) > -1 ">{{item.name}}</div>
									</div>
								</div>
								<div style="display:inline-block;color:rgb(113, 211, 207);margin-left:8px;" v-show="!(isComplete || myButtonPrem.indexOf('edit') < 0)">
									<Icon type="md-create" @click.stop="toshowMainUser"/>
								</div>
							</div>
							<div class="fl data1" style="background:#EEEEEE;" :title="$t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1827')"><i class="iconfont icon-rili2"></i></div>
							<div class="mainUserDate fl" :title="$t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1827')">
								<DatePicker
									v-if="hasDatePicker"
									ref="createDatePicker1"
									:open="openDate"
									:value="detailObj.startTime"
									confirm
									type="datetime"
									format="yyyy-MM-dd HH:mm"
									:time-picker-options="{steps: [1, 5, 30]}"
									@on-change="handleChange"
									@on-clear="handleClear"
									@on-ok="handleOk">
									<div style="padding: 8px 0;" @click.stop="handleClick">{{startTime}}</div>
								</DatePicker>
								<div style="display:inline-block;color:rgb(113, 211, 207);margin-left:8px;" v-show="!(isComplete || myButtonPrem.indexOf('edit') < 0)">
									<Icon type="md-create" @click.stop="handleClick"/>
								</div>
							</div>
							<div class="fl data1" :style="{color:'#FFFFFF',background: detailObj.isHot == '1' ? '#FF9300' : '#71D3CF'}"><i class="iconfont icon-tishi1"></i></div>
							<div class="fl" :style="{color: detailObj.isHot == '1' ? '#FF9300' : '#71D3CF'}">
								<span style="cursor:pointer;" @click.stop="toshowChangeHot">{{detailObj.isHot == '1' ? $t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1828') : $t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1829')}}</span>
								<div class="changeHot" v-show="showChangeHot">
									<div class="changeIsHotChild">
										<div class="choose" @click="changeHot('1')"><div class="colorBlock" style="background:#FF9300;"></div><span class="jinJifont">{{$t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1828')}}</span></div>
										<div class="choose" @click="changeHot('0')"><div class="colorBlock" style="background:#71D3CF;"></div><span class="jinJifont">{{$t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1829')}}</span></div>
									</div>
								</div>
								<div style="display:inline-block;color:rgb(113, 211, 207);margin-left:8px;" v-show="!(isComplete || myButtonPrem.indexOf('edit') < 0)">
									<Icon type="md-create" @click.stop="toshowChangeHot"/>
								</div>
							</div>
						</div>
						<!-- <div class="buchong" v-if="isComplete">
							<span>{{$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1725')}}</span>{{detailObj.remarks}}
						</div> -->
					</div>
					<div class="l1" :class="{'fl' : detailObj.isSelf == '1', 'fr' : detailObj.isSelf == '0'}" style="overflow:hidden;">
						<div class="createUser"  :class="{'fl' : detailObj.isSelf == '1', 'fr' : detailObj.isSelf == '0'}" :style="{border:detailObj.isSelf == '0' ? 'none' : ''}">
							<div class="createUserLabel">{{$t('scoretemplate_scoretemplate_569')}}</div>
							<div class="createUserName">
								<img class="fl" src="../../assets/img/task/yyhf.png">
								<div class="createUserNameF fl">{{detailObj.createByName}}</div>
							</div>
						</div>
						<div class="createUser fl" style="padding-left:24px; border:none;" v-if="detailObj.isSelf == '1'">
							<div class="createUserLabel">{{$t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1832')}}</div>
							<div class="createUserDate" v-for="(item, index) in detailObj.reminderTimeList" v-if="detailObj.reminderTimeList && detailObj.reminderTimeList.length">
								<DatePicker
									:disabled="true"
									v-if="hasDatePicker2"
									:key="index"
									ref="createDatePicker2"
									:open="openDate1"
									:value="item"
									confirm
									type="datetime"
									format="yyyy-MM-dd HH:mm"
									:time-picker-options="{steps: [1, 5, 30]}"
									@on-change="handleChange1"
									@on-clear="handleClear1"
									@on-ok="handleOk1">
									<div @click.stop="handleClick1" style="cursor:pointer;">
										<i class="iconfont icon-rili1" style="font-size: 12px;margin-right:4px;"></i>{{item || $t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1833')}}
									</div>
								</DatePicker>
							</div>
							<div class="createUserDate" v-if="!detailObj.reminderTimeList || detailObj.reminderTimeList.length == 0">
								<DatePicker
									:disabled="true"
									v-if="hasDatePicker2"
									ref="createDatePicker2"
									:open="openDate1"
									:value="detailObj.reminderTime"
									confirm
									type="datetime"
									format="yyyy-MM-dd HH:mm"
									:time-picker-options="{steps: [1, 5, 30]}"
									@on-change="handleChange1"
									@on-clear="handleClear1"
									@on-ok="handleOk1">
									<div @click.stop="handleClick1" style="cursor:pointer;">
										<i class="iconfont icon-rili1" style="font-size: 12px;margin-right:4px;"></i>{{$t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1833')}}</div>
								</DatePicker>
							</div>
						</div>
					</div>
				</div>
				<!-- <div class="contentMid_contentBottom">
					<div class="c1" v-if="detailObj.type == 'sop task' && needUploadSop" @click="contentType='sopFile'; showSend = false;" :class="{active: contentType == 'sopFile'}"><i class="iconfont icon-renwuguanli" style="font-size:16px;margin-right:6px;"></i>{{$t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1834')}}</div>
					<div v-if="detailObj.type == 'sop task'" @click="contentType='sop'; showSend = false;" :class="{active: contentType == 'sop', c1: !needUploadSop, c2: needUploadSop }"><i class="iconfont icon-shijianshuxingweihu" style="font-size:16px;margin-right:6px;"></i>{{$t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1835')}}</div>
					<div @click="contentType='contentBottom'; showSend = false;" :class="{active: contentType == 'contentBottom' , c1:detailObj.type != 'sop task', c2: detailObj.type == 'sop task' }"><i class="iconfont icon-jilu1" style="font-size:12px;margin-right:7px;"></i>{{$t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1836')}}</div>
					<div class="c2" @click="contentType='contentMid'; showSend = false;" :class="{active: contentType == 'contentMid'}"><i class="iconfont icon-pinglun" style="font-size:16px;margin-right:6px;"></i>{{$t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1837')}}</div>
					<div class="c2" @click="contentType='dynamicForm'; showSend = false;" :class="{active: contentType == 'dynamicForm' }"><i class="iconfont icon-shenglong" style="font-size:16px;margin-right:7px;"></i>{{$t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1838')}}</div>
				</div> -->
				<!-- <div class="contentMid" v-show="contentType == 'sopFile'"> -->
				<div class="contentMid" style="border-bottom: 1px solid #EFEFEF;margin-top:12px;" v-show="detailObj.type == 'sop task'">
					<!-- SOP属性 -->
					<div class="sopParam"><span class="sopParamTitle">{{$t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1839')}}</span><span class="sopParamContent">{{className}}</span></div>
					<div class="sopParam"><span class="sopParamTitle">{{$t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1840')}}</span><span class="sopParamContent"><!-- {{lessonName}} -->{{detailObj.lessonStartTime}} ~ {{detailObj.lessonEndTime | endTimeFilter}}</span></div>
				</div>
				<div class="contentMid" style="border-bottom: 1px solid #EFEFEF;" v-show="detailObj.type == 'sop task'">
					<!-- sop任务文档 -->
					<div class="sopFileList">
						<div class="sopFileTitle">
							<div class="fileName">{{$t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1841')}}</div>
							<div class="fileStatu">{{$t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1842')}}</div>
							<div class="uploadDate">{{$t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1843')}}</div>
							<div class="downloadFile">{{$t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1844')}}</div>
							<div class="uploadAction">{{$t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1845')}}</div>
						</div>
						<div class="sopFileContent" v-for="(item, index) in uploadFormData" :key="index">
							<div class="fileName"><Icon class="isDo" v-if="item.filePath" size="30" type="ios-checkmark" /><span style="color:red;" v-show="item.required != '0'">*</span>{{item.name}}</div>
							<div class="fileStatu" :class="item.filePath ? 'isDo': 'noDo'">{{item.filePath ? $t('memberlist_18'):$t('memberlist_19')}}</div>
							<div class="uploadDate">{{item.createDate || '/'}}</div>
							<div class="downloadFile" :class="item.templeteModelUrl ? 'isDo' : 'noDo'">
								<a :href="item.templeteModelUrl" v-show="item.templeteModelUrl">{{$t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1848')}}</a>
								<span v-show="!item.templeteModelUrl">{{$t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1848')}}</span>
							</div>
							<div class="uploadAction">
								<span :class="item.filePath || item.templeteModelUrl ? 'isDo': 'noDo'">
									<a v-show="item.filePath || item.templeteModelUrl" :href="item.filePath || item.templeteModelUrl">{{$t('modules_spoc_core_web_src_views_tasktemplate_index_413')}}</a>
									<span v-show="!(item.filePath || item.templeteModelUrl)">{{$t('modules_spoc_core_web_src_views_tasktemplate_index_413')}}</span>
								</span>
								<span class="isDo" v-if="!isComplete">
									<Upload
											:headers="headers"
                                            style="display:inline-block;"
											:action="uploadFileUrl"
                                            :format="item.format"
                                            :on-format-error="handleFormatError"
                                            name="file"
                                            :data="item.uploadData"
                                            :on-success="HandleSuccess"
											:show-upload-list="false"
                                        >{{item.filePath ? $t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1850'):$t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1851')}}
										</Upload>
								</span>
							</div>
						</div>
					</div>
				</div>
				<div class="dynamicForm">
					<!-- 任务表单 -->
					<form-create 
					 	v-if="taskDetailModal && hasFormData"
						ref="fc1" 
						v-model="fApi" 
						:rule="rule" 
						:option="option">
					</form-create>
					<Form ref="taskCompleteFrom"  v-if="detailObj.taskTpl.completeResultList" :model="taskCompleteObj" :label-width="120">
						<FormItem  :label="$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1722')" prop="resultValue"  :rules="{required: true, message: $t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1723'), trigger: 'change'}">
							<Select :disabled="isComplete" v-model="taskCompleteObj.resultValue" class="w306" :placeholder="$t('pushsettings_index_505')">
								<Option v-for="(item, index) in detailObj.taskTpl.completeResultList" :key="index" :value="item.resultValue">{{item.resultLabel}}</Option>
							</Select>
						</FormItem>
					</Form>
					<p v-show="!showEditDesc" style="padding-left:16px;margin-bottom: 12px;">
						<span style='display:inline-block; width:94px; text-align:right;margin-right: 10px;'>{{$t('modules_spoc_core_web_src_views_tasktemplate_index_425')}}</span><Input v-model="detailObj.description" :readonly="isComplete" type="textarea" :rows="2" :autosize="{minRows: 2,maxRows: 2}"  style="width:780px;" :placeholder="$t('scoretemplate_compontents_scoremodify_528')" />
					</p>
					<!-- <p v-if="isComplete" style="padding-left:16px;margin-bottom: 12px;">
						<span style='display:inline-block; width:94px; text-align:right;margin-right: 10px;'>{{$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1725')}}</span><Input v-model="detailObj.remarks" :readonly="isComplete" type="textarea" :rows="2" :autosize="{minRows: 2,maxRows: 2}"  style="width:780px;" :placeholder="$t('scoretemplate_compontents_scoremodify_528')" />
					</p> -->
					<div v-show="showEditDesc">
						<Input v-model="descToSave" type="textarea" :rows="2" :autosize="{minRows: 2,maxRows: 2}"  style="width:520px;" :placeholder="$t('scoretemplate_compontents_scoremodify_528')" />
						<div style="margin-top:12px;">
							<Button @click="cancelDesc" style="margin-right: 16px">{{$t('classroom_allscore_53')}}</Button>
							<Button type="primary" @click="saveDesc">{{$t('classroom_allscore_54')}}</Button>
						</div>
					</div>
				</div>
				<!-- <div class="contentBottom" v-show="contentType == 'contentBottom'"> -->
				<div style="max-height:290px;overflow-y:auto;">
					<div class="contentBottom" v-if="detailObj.detailList && detailObj.detailList.length">
						<!-- 动态 -->
						<div class="record" v-for="(item, index) in detailObj.detailList" :key="index">
							<div class="recordContent fl"><i class="iconfont" :class="item.content == $t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1765')? 'icon-wancheng1': 'icon-jiajilu'" style="margin-left:4px;margin-right:20px;color:#71D3CF;"></i>{{item.optDate}}&nbsp;{{item.opterName}}&nbsp;{{item.content}}</div>
						</div>
					</div>
					<!-- <div class="contentMid" v-show="contentType == 'contentMid'" :style="{'overflow-y': detailObj.commentList && detailObj.commentList.length > 0? 'scroll':''}"> -->
					<div class="contentMid" v-if="detailObj.commentList && detailObj.commentList.length > 0">
						<div class="msg"  v-for="(item,index) in detailObj.commentList" :key="index">
							<img class="avator fl" src="../../assets/img/task/yyhf.png">
							<div class="msgContent fl">
								<p><span class="name">{{item.opterName}}</span><span class="time">{{item.optDate}}</span></p>
								<div class="msgContentHtml">
									<p>{{item.content}}</p>
								</div>
								<div v-for="(fileItem, fileIndex) in item.files" :key="fileIndex" @click="openFile(fileItem.filePath)">
									<i class="iconfont icon-bianzu5" style="margin-left:1px;margin-right:6px;color:#000000;"></i><span style="color:#44BCB7;cursor:pointer;">{{fileItem.fileName}}</span>
								</div>
							</div>
						</div>
						<!-- <div class="msg" v-if="(!detailObj.commentList) || detailObj.commentList.length == 0">
							<div style="color:#BFBFBF;margin: 18px 100px 100px 399px;">
								<i class="iconfont icon-zanwuxiaoxi-copy" style="font-size:70px;"></i>
								<p style="width:75px;margin-top: -14px;text-align:center;">{{$t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1859')}}</p>
							</div>
							
						</div> -->
					</div>
				</div>
				<transition>
					<!-- <div v-if="showSend" class="commentList"> -->
					<div v-if="(!this.isComplete) && this.myButtonPrem.indexOf('edit') >= 0" class="commentList">
						<img class="avator fl" src="../../assets/img/task/yyhf.png"/>
						<div class="fl" style="width:852px;">
							<Form ref="formValidate" :model="addItem" :rules="ruleValidate" :label-width="0">
								<FormItem label="" prop="text">
									<Input v-model="addItem.text" type="textarea" :rows="2" :autosize="{minRows: 2,maxRows: 2}" :placeholder="$t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1863')"></Input>
								</FormItem>
								<FormItem label="" style="margin-bottom: 0;">
									<div @click="showImgBox" class="task-img">
										<Icon type="ios-image"/><span>{{$t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1864', [imgnum])}}</span>
										<up-img ref="img1" v-show="!addItem.show && addItem.img.visible" @close="close" @on-change="onImgChange" class="abs-img"/>
									</div>
									<div @click="showFileBox" class="task-img">
										<Icon type="ios-folder"/><span>{{$t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1865', [filenum])}}</span>
										<up-file ref="file1" :cus-id="id" v-show="!addItem.show && addItem.file.visible" @close="close" @on-change="onFileChange" class="abs-file"/>
										</div>
									<Button class="rightbtn" type="primary" @click="commentSubmit">{{$t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1837')}}</Button>
									<Button class="rightbtn" @click="commentCancel">{{$t('classroom_clock_87')}}</Button>
								</FormItem>
							</Form>
						</div>
					</div>
				</transition>
				<div style="height:12px;clear:both;"></div>
				<div style="text-align:center;padding-bottom:32px;" v-if="(!this.isComplete)">
					<!-- <Button style="margin-right:24px;" @click="toShowSend"  v-if="(!this.isComplete) && this.myButtonPrem.indexOf('edit') >= 0" >{{$t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1837')}}</Button> -->
					<Button style="margin-right:24px;" type="primary" v-if="false &&(!this.isComplete) && this.myButtonPrem.indexOf('finish') >= 0"  @click="toSaveDesc_form">{{$t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1860')}}</Button>
					<Button type="primary" v-if="(!this.isComplete) && this.myButtonPrem.indexOf('finish') >= 0"  @click="toShowTaskCompleteModal">{{$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1721')}}</Button>
				</div>
			</div>
			<!-- <div slot="footer">
				<div class="footerDiv" @click="toShowSend">
					<img src="../../assets/img/task/yyhf.png" class="fl"/>
					<div class="inputDiv fl">{{$t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1862')}}</div>
				</div>
			</div> -->
		</Modal>
	</div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import valid, {
	errors,
	common,
	sysUser,
	sysDict,
	sysCommonSql,
	crmActivity,
	sysAttachment,
	api
} from "../../libs/request";
import { waitUntil } from "@public/libs/util";
import upFile from './upFile';
import upImg from './upImg';
import formCreateSetting from './formCreate.js';
export default {
	name: 'taskDetailModal',
	mixins: [formCreateSetting],
	data() {
		return {
			uploadFileUrl: api.fileAttachmentUploadUrl(),
			uploadFormData: [],
			needUploadSop: false,
			className:'',
			lessonName:'',
			isActioning: false, //多次提交拦截
			contentType:'contentMid',
			// option:{
			// 	form:{
			// 		labelWidth:82
			// 	}
			// },
			hasFormData: false,
			hasDatePicker: true,
			hasDatePicker2: true,
			executorName: '',
			classTeacherList: [],
			showSend: false,
			addItem: {
                text: '',
                img: {
					visible: false
				},
				file: {
					visible: false
				},
            },
            imgList:[],
            fileList:[],
            ruleValidate: {
                text: [
                    { required: true, message: this.$t('modules_spoc_crm_web_src_views_customer360_components_flowup_803'), trigger: 'blur' },
                ]
            },
			taskDetailModal: false,
			showEditDesc: false,
			descToSave: '',
			taskCompleteModal: false,
			isComplete: false,
			taskCompleteObj: {
				resultValue:'',
				remarks: ''
			},
			loadingTaskCompleteModal: false,
			startTime: '',
			reminderTime: '',
			openDate: false,
			openDate1: false,
			showChangeHot: false,
			searchUserModel: '',
			showEditMainUserInfo: false,
			detailObj:{
				completeResultObj: '',
				commentList: [],
				taskTpl:{}
			},
			canShow: false,
			headers: {}
		};
	},
	computed: {
		...mapState(["app", "buttonPerm"]),
        myButtonPrem() {
            return this.buttonPerm ? (this.buttonPerm["crm.taskCenter"] || []) : [];
        },
        imgnum(){
			return `${this.imgList.length}/9`;
		},
		filenum(){
			return `${this.fileList.length}/3`;
		},
	},
	components: {
		upFile,
		upImg
	},
	mounted() {
		this.headers = {
			token: localStorage.getItem('token'),
			tenant: localStorage.getItem('tenant')
		}
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		go360(){
			this.taskDetailModal = false
			this.$router.push({
				name:'crm.customer360',
				query:{id:this.detailObj.objectId}
			})
		},
		HandleSuccess(response, file, fileList){
			this.updateLoadingStatus({ isLoading: false });
			let type = response.data.bizType // 动态表单设定的字段key
			this.uploadFormData.forEach((item, index)=>{
				// if(item.field == type){
				if(item.name == type){
					if(item.fileId){
						this.deleteUploadFile(item.fileId)
					}
					this.$set(this.uploadFormData[index],'fileId', response.data.id)
					this.$set(this.uploadFormData[index],'filePath', response.data.url) // downloadUrlByUrl  downloadUrlById  downloadUrlByBizId
					this.$set(this.uploadFormData[index],'createDate', response.data.createDate)
					// item.fileId = response.data.id
					// item.filePath = response.data.filePath
				}
			})
			this.$forceUpdate()
            this.$Message.success(this.$t('scoretemplate_compontents_scoremodify_545'));
		},
		deleteUploadFile(fileId){
			if(fileId){
				this.updateLoadingStatus({ isLoading: true });
				sysAttachment.deleteById({id:fileId}).then(valid.call(this))
				.then((res) => {
					if (res.ok) {
					}
				})
				.then(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				})
			}
			return true
		},
		listFile(objectId){
			if(objectId){
				this.updateLoadingStatus({ isLoading: true });
				sysAttachment.list({objectId:objectId}).then(valid.call(this))
				.then((res) => {
					if (res.ok) {
						let fileList = res.data.data.list
						fileList.forEach(item=>{
							this.uploadFormData.forEach(itemFormData=>{
								// if(itemFormData.field == item.type){
								if(itemFormData.name == item.type){
									itemFormData.fileId = item.id
									itemFormData.filePath = item.filePath
									itemFormData.createDate = item.createDate
								}
							})
						})
					}
				})
				.then(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				})
			}
			return true
		},
		handleFormatError(file) {
            this.$Notice.warning({
                title: this.$t('scoretemplate_compontents_scoremodify_542'),
                desc: file.name + this.$t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1874')
            });
        },
		//打开发送消息
		toShowSend(){
			if(this.isComplete || this.myButtonPrem.indexOf('edit') < 0){
				return
			}
			this.showSend = true
			this.showChangeHot = false
			this.openDate = false
			this.openDate1 = false
			this.showEditMainUserInfo = false
			this.$nextTick(()=>{
				if(this.$refs.file1 && this.$refs.img1){
					this.$refs.file1.files = []
					this.$refs.img1.imgs = []
				}
				this.imgList = []
				this.fileList = []
			})
		},
		//打开修改紧急
		toshowChangeHot(){
			if(this.isComplete || this.myButtonPrem.indexOf('edit') < 0){
				return
			}
			this.showChangeHot = !this.showChangeHot
			this.openDate = false
			this.openDate1 = false
			this.showSend = false
			this.showEditMainUserInfo = false
		},
		//打开修改执行人
		toshowMainUser(){
			if(this.isComplete || this.myButtonPrem.indexOf('edit') < 0){
				return
			}
			this.showEditMainUserInfo= !this.showEditMainUserInfo 
			this.showChangeHot = false
			this.openDate = false
			this.openDate1 = false
			this.showSend = false
		},
		getServiceObjectExecutor(objectId, serviceTypes){
			common.getServiceObjectExecutor({
				objectId,
				serviceTypes
            }).then(valid.call(this))
            .then((res) => {
                if (res.ok) {
					this.classTeacherList = res.data.data

					let executor = this.classTeacherList.find((item) =>{ return item.id == this.detailObj.executorId})
					if(executor){
						this.executorName = executor.name
					} else {
						this.executorName = this.$t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1875')
					}
                }
            })
            .then(errors.call(this))
            .finally(() => {
            })
		},
		openFile(filePath){
			window.open(filePath);
		},
		close(){
			this.addItem.img.visible = false;
            this.addItem.file.visible = false;
        },
        onImgChange(v){
			this.imgList = v;
		},
		onFileChange(v){
			this.fileList = v;
		},
        showImgBox() {
			this.addItem.img.visible = true;
			this.addItem.file.visible = false;
		},
		showFileBox() {
			this.addItem.img.visible = false;
			this.addItem.file.visible = true;
		},
		//取消评论
		commentCancel(){
			this.addItem.text = ''
			this.imgList = []
			this.fileList = []
			this.$refs.img1.imgs = []
			this.$refs.file1.files = []
			this.showSend = false
		},
		//提交评论
		commentSubmit(){
			console.log(this.imgList, 'this.imgList')
			console.log(this.fileList, 'this.fileList')
			this.$refs.formValidate.validate((validRes) => {
                if (validRes) {
					let files = []
					this.imgList.forEach(item => {
						files.push({
							"fileName": item.fileName,
							"filePath": item.filePath
						})
					});
					this.fileList.forEach(item => {
						files.push({
							"fileName": item.fileName,
							"filePath": item.filePath
						})
					});
					if(this.detailObj.commentList){
						this.detailObj.commentList.push({
							"content": this.addItem.text,
							"files": files
						})
					} else {
						this.detailObj.commentList = [{
							"content": this.addItem.text,
							"files": files
						}]
					}
					this.addItem.text = ''
					this.imgList = []
					this.fileList = []
					this.showSend = false
					this.$refs.img1.imgs = []
					this.$refs.file1.files = []
					this.doSave()
                } else {
                    // this.$Message.error('Fail!');
                }
            })
		},
		//执行保存
		doSave(isComplete){
			console.log(this.detailObj)
			this.addItem.text = ''
			this.imgList = []
			this.fileList = []
			this.showSend = false
			this.showEditDesc = false
			this.openDate = false;
			if(this.isActioning){ //多次提交拦截
				return
			}
			this.isActioning = true
			this.updateLoadingStatus({ isLoading: true });
			common.saveComTask(this.detailObj)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						if(isComplete){
							this.taskDetailModal = false
							this.$emit('refresh', this.detailObj.objectId)
						} else {
							this.getDetail(this.editId)
						}
					} else {
						this.updateLoadingStatus({ isLoading: false });
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					setTimeout(()=>{
						//多次提交拦截
						this.isActioning = false
					},200)
				});
		},
		//修改执行人
		selectExecutor(id){
			let executor = this.classTeacherList.find((item) =>{ return item.id == id})
			if(executor){
				this.executorName = executor.name
				this.detailObj.executorId = id
			} else {
				this.executorName = this.$t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1875')
			}
			this.showEditMainUserInfo = false
			this.doSave()
		},
		//点击任意区域。关闭修改执行人、关闭修改紧急状态
		falseAll(){
			this.showChangeHot = false
			this.showEditMainUserInfo = false
			// this.openDate = false;
			// this.openDate1 = false
			// this.showSend = false
		},
		//修改紧急状态
		changeHot(type){
			this.detailObj.isHot = type
			this.doSave()
		},
		//打开修改开始日期
		handleClick () {
			if(this.isComplete || this.myButtonPrem.indexOf('edit') < 0){
				return
			}
			// 修改默认日期弹框重置按钮的文字
			let btnDefault = this.$refs.createDatePicker1.$el.querySelector('.ivu-btn-default')
			if(btnDefault){
				btnDefault.innerHTML = this.$t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1876')
			}
			// 修改取消后再次打开，上次选择日期还有边框
			let focused = this.$refs.createDatePicker1.$el.querySelector('.ivu-date-picker-cells-focused')
			if(focused){
				let q = focused.className
				let r = q.replace('ivu-date-picker-cells-focused', '')
				focused.className = r
			}
			
			this.detailObj.startTime = this.startTime;
			this.openDate = !this.openDate;
			this.showChangeHot = false
			this.openDate1 = false
			this.showSend = false
			this.showEditMainUserInfo = false
		},
		//临时修改开始时间
		handleChange (date) {
			this.detailObj.startTime = date;
		},
		//取消修改并还原开始时间
		handleClear () {
			this.detailObj.startTime = this.startTime
			this.openDate = false;
		},
		//确认修改开始时间
		handleOk () {
			this.startTime = this.detailObj.startTime;
			this.detailObj.endTime = new Date(this.detailObj.startTime).format('yyyy-MM-dd 23:59:59');
			this.openDate = false;
			this.hasDatePicker = false
			setTimeout(()=>{
				this.hasDatePicker = true
			},0)
			this.doSave()
		},
		//打开修改提醒日期
		handleClick1 () {
			return false; // 不许修改提醒时间
			// if(this.isComplete || this.myButtonPrem.indexOf('edit') < 0){
			// 	return
			// }
			// // 修改默认日期弹框重置按钮的文字
			// let btnDefault = this.$refs.createDatePicker2.$el ? this.$refs.createDatePicker2.$el.querySelector('.ivu-btn-default') : null
			// if(btnDefault){
			// 	btnDefault.innerHTML = '<span>取消</span>'
			// }
			// // 修改取消后再次打开，上次选择日期还有边框
			// let focused = this.$refs.createDatePicker2.$el ? this.$refs.createDatePicker2.$el.querySelector('.ivu-date-picker-cells-focused') : null
			// if(focused){
			// 	let q = focused.className
			// 	let r = q.replace('ivu-date-picker-cells-focused', '')
			// 	focused.className = r
			// }
			
			// this.detailObj.reminderTime = this.reminderTime;
			// this.openDate1 = !this.openDate1;
			// this.showSend = false
			// this.showChangeHot = false
			// this.openDate = false
			// this.showEditMainUserInfo = false
		},
		//临时修改提醒时间
		handleChange1 (date) {
			this.detailObj.reminderTime = date;
		},
		//取消修改并还原提醒时间
		handleClear1 () {
			this.detailObj.reminderTime = this.reminderTime
			this.openDate1 = false;
		},
		//修改提醒时间
		handleOk1 () {
			this.reminderTime = this.detailObj.reminderTime;
			this.openDate1 = false;

			this.hasDatePicker2 = false
			setTimeout(()=>{
				this.hasDatePicker2 = true
			},0)
			this.doSave()
		},
		//打开完成任务
		toShowTaskCompleteModal(){
			waitUntil(
				() => {
					return JSON.stringify(this.buttonPerm) != "{}" || false;
				},
				() => {
					if(this.isComplete || this.myButtonPrem.indexOf('finish') < 0){
						return
					}
					if(this.hasFormData){
						let $f = this.fApi
						$f.submit((formData,api)=>{
							//提交表单
							this.doTaskComplete(JSON.stringify(formData))
						},(api)=>{
							// this.$Message.error(this.$t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1878'))
							if(this.$refs.taskCompleteFrom){
								this.$refs.taskCompleteFrom.validate()
							}
						})
					} else {
						this.doTaskComplete("")
					}

					// if(this.hasFormData){
					// 	let $f = this.fApi
					// 	$f.submit((formData,api)=>{
					// 		this.option.form.labelWidth = 120
					// 		this.taskCompleteModal = true
					// 		this.$refs.taskCompleteFrom.resetFields()
							
					// 		setTimeout(() => {
					// 			if(this.$refs.fc){
					// 				let $f = this.$refs.fc.$f
					// 				// let $f = this.fApi
					// 				if($f){
					// 					$f.disabled(false)
					// 					//填充默认到访时间
					// 					$f.setValue({'arrivalTime' : new Date()});
					// 				}
					// 			}
					// 		}, 1000);
					// 	},(api)=>{
					// 		this.$Message.error(this.$t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1878'))
					// 	})
					// } else {
					// 	this.option.form.labelWidth = 120
					// 	this.taskCompleteModal = true
					// 	this.$refs.taskCompleteFrom.resetFields()
						
					// 	setTimeout(() => {
					// 		if(this.$refs.fc){
					// 			let $f = this.$refs.fc.$f
					// 			// let $f = this.fApi
					// 			if($f){
					// 				$f.disabled(false)
					// 				//填充默认到访时间
					// 				$f.setValue({'arrivalTime' : new Date()});
					// 			}
					// 		}
					// 	}, 1000);
					// }
				}
			);
		},
		//关闭完成任务弹框
		cancelTaskComplete(){
			this.taskCompleteModal = false
			this.$refs.taskCompleteFrom.resetFields()
			this.$emit('refresh', this.detailObj.objectId)
		},
		handleSubmit(){
			//有动态表单，并且直接完成，则先获取动态表单的值
			if(this.hasFormData){
				let $f = this.fApi
				$f.submit((formData,api)=>{
					//提交表单
					console.log(this.$t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1877'))
					this.doTaskComplete(JSON.stringify(formData))
				},(api)=>{
					this.$Message.error(this.$t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1878'))
					this.$refs.taskCompleteFrom.validate()
				})
			} else {
				this.doTaskComplete("")
			}
			
		},
		//提交任务完成
		doTaskComplete(formData){
			let q = true
			if(this.uploadFormData){
				this.uploadFormData.forEach(item=>{
					if(item.required != '0' && !item.filePath){
						q = false
					}
				})
				if(!q){
					this.$Message.error(this.$t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1879'))
					return false;
				}
			}
			if(this.detailObj.taskTpl.completeResultList){
				this.$refs.taskCompleteFrom.validate((valid) => {
					if (valid) {
						this.taskDetailModal = false
						// this.taskCompleteModal = false
						// this.isComplete = true
						console.log(this.taskCompleteObj)
						this.detailObj.status = '1'
						// this.detailObj.remarks = this.taskCompleteObj.remarks 
						if(Array.isArray(this.detailObj.detailList)){
							this.detailObj.detailList.push({ "content":this.$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1765') })
						} else {
							this.detailObj.detailList = [{ "content":this.$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1765') }]
						}
	
						if(this.detailObj.taskTpl.completeResultList){
							let obj = this.detailObj.taskTpl.completeResultList.find(item=>{ return item.resultValue == this.taskCompleteObj.resultValue })
							if(obj){
								this.detailObj.completeResultObj = {resultLabel: obj.resultLabel, resultValue: obj.resultValue}
							}
						}
						
						this.detailObj.formData = formData
	
						this.doSave(true)
	
					} else {
						this.loadingTaskCompleteModal = true
						this.taskDetailModal = true
						setTimeout(()=>{
							this.loadingTaskCompleteModal = false
						},0)
						// this.loadingTaskCompleteModal = true
						// this.taskCompleteModal = true
						// setTimeout(()=>{
						// 	this.loadingTaskCompleteModal = false
						// },0)
					}
				})
			} else {
				this.taskDetailModal = false
				console.log(this.taskCompleteObj)
				this.detailObj.status = '1'
				if(Array.isArray(this.detailObj.detailList)){
					this.detailObj.detailList.push({ "content":this.$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1765') })
				} else {
					this.detailObj.detailList = [{ "content":this.$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1765') }]
				}
				
				this.detailObj.formData = formData

				this.doSave(true)
			}
			
		},
		//打开修改描述
		toShowEditDesc(){
			this.descToSave = this.detailObj.description ? this.detailObj.description + "" : ''
			this.showEditDesc = true
		},
		//取消修改描述
		cancelDesc(){
			this.showEditDesc = false
		},
		toSaveDesc_form(){
			if(this.hasFormData){
				let $f = this.$refs.fc1.$f
				this.detailObj.formData = JSON.stringify($f.formData())
			}
			if(this.hasFormData){
				let $f = this.fApi
				$f.submit((formData,api)=>{
					this.doSave()
				},(api)=>{
					this.$Message.error(this.$t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1878'))
				})
			} else {
				this.doSave()
			}
		},
		//修改描述
		saveDesc(){
			this.detailObj.description = this.descToSave
			this.showEditDesc = false
			this.doSave()
		},
		//打开任务详情弹框
		showModal(id){
			waitUntil(
				() => {
					return JSON.stringify(this.buttonPerm) != "{}" || false;
				},
				() => {
					// this.contentType = 'contentMid'
					this.contentType = 'contentBottom'
					this.openDate = false
					this.openDate1 = false
					this.showChangeHot = false
					this.showSend = false
					this.showEditMainUserInfo = false

					this.taskDetailModal = true
					this.showEditDesc = false
					this.descToSave = ''
					this.editId = id
					this.getDetail(id, true)
				}
			);
		},
		//打开完成任务弹框
		showModalComplete(id){
			// this.option.form.labelWidth = 120
			this.canShow = false
			this.taskCompleteModal = true
			this.editId = id
			this.getDetail(id)
		},
		//获取详情
		getDetail(id ,getServiceObjectExecutor){
			this.updateLoadingStatus({ isLoading: true });
			common
				.formComTask({
					id,
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.uploadFormData = []
						this.needUploadSop = false
						this.hasFormData = false
						this.reminderTime = ''
						this.detailObj = res.data.data
						this.startTime = this.detailObj.startTime
						this.isComplete = this.detailObj.status == '1'
						if(this.detailObj.reminderTime){
							this.reminderTime = this.detailObj.reminderTime
						}
						if(this.taskCompleteObj && this.detailObj.completeResultObj){
							this.taskCompleteObj.resultValue = this.detailObj.completeResultObj.resultValue
						}
						if(this.detailObj.type == 'sop task'){
							let _formData = this.detailObj.taskTpl.formData
							if(_formData && _formData.length){
								let formData = JSON.parse(_formData)
								if(formData && formData.length){
									let uploadFormData = formData.filter(item=>{ return item.jdbcType == 'upload' || item.jdbcType == 'uploadTemplate' })  //过滤出来是上传的动态表单
									if(uploadFormData.length){
										this.needUploadSop = true
										uploadFormData.forEach(item=>{
											item.uploadData = item.props.data || {}
											// item.uploadData.type = item.field
											// item.type = item.field
											item.uploadData.bizType = item.name
											item.type = item.name
											// item.uploadData.fileType = 'file'
											item.uploadData.isSingle = true
											item.uploadData.objectId = id
											item.templeteModelUrl = (item.filtersLabel && item.filtersLabel.url) ? item.filtersLabel.url : ''
										})
										this.uploadFormData = uploadFormData
										this.listFile(id)
									} else {
										this.needUploadSop = false
									}
								} else {
									this.needUploadSop = false
								}
							} else {
								this.needUploadSop = false
							}
							this.className = this.detailObj.className
							this.lessonName = this.detailObj.lessonName
							if(this.needUploadSop){
								this.contentType = 'sopFile'
							} else {
								this.contentType = 'sop'
							}
						}
						
						let _formData = this.detailObj.taskTpl.formData
						if(_formData && _formData.length){
							let formData = JSON.parse(_formData)
							if(formData && formData.length){
								let noUploadFormData = formData.filter(item=>{ return item.jdbcType != 'upload' && item.jdbcType != 'uploadTemplate' }) // 过滤出来不是上传的动态表单
								if(noUploadFormData.length){
									this.hasFormData = true
									this.setFormAttr(noUploadFormData);
									// if(this.detailObj.formData){ //详情页面展示，动态表单不可输入
									this.$nextTick(()=>{
										setTimeout(() => {
											let $f = (this.$refs && this.$refs.fc1) ? this.$refs.fc1.$f : null
											// let $f = this.fApi
											if($f){
												let _formData = JSON.parse(this.detailObj.formData)
												for(let key in _formData){
													if(/^\d{4,}-(?:0?\d|1[12])-(?:[012]?\d|3[01]) (?:[01]?\d|2[0-4]):(?:[0-5]?\d|60)$/.test(_formData[key])){
														_formData[key] = new Date(_formData[key])
													}
												}
												console.log(_formData)
												$f.setValue(_formData);
												$f.disabled(this.isComplete)
											}
										}, 2000);
									})
								} else {
									this.hasFormData = false
								}
							} else {
								this.hasFormData = false
							}
						} else {
							this.hasFormData = false
						}

						if(getServiceObjectExecutor){
							if(this.detailObj.taskTpl.serviceTypes){
								this.getServiceObjectExecutor(this.detailObj.objectId, this.detailObj.taskTpl.serviceTypes)
							}
							if(this.detailObj.taskTpl.roles){
								this.isRolesGetClassTeacherList(this.detailObj.taskTpl.roles)
							}
						}
					}
			})
			.catch(errors.call(this))
			.finally(() => {
				setTimeout(()=>{
					this.canShow = true
					this.updateLoadingStatus({ isLoading: false });
				},1000)
			});
		},
		/* chooseOk(){
			this.taskDetailModal = false
		},*/
		chooseCancel(){
			this.taskDetailModal = false
			this.$emit('refresh',this.detailObj.objectId)
		}, 
		isRolesGetClassTeacherList(roles){
			sysUser
				.dataScopeFilter()
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let officeIds = res.data.data.map((item)=>{ return item.id }) || []
						sysUser.listDataByRole({
							officeIds: officeIds.join(','), //this.userInfo.officeId, 
							pageSize:-1,
							roleIds: roles
						})
						.then(valid.call(this))
						.then(res => {
							if (res.ok) {
								this.classTeacherList = res.data.data;
								let executor = this.classTeacherList.find((item) =>{ return item.id == this.detailObj.executorId })
								if(executor){
									this.executorName = executor.name
								} else {
									this.executorName = this.$t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1875')
								}
							}
						})
						.catch(errors.call(this))
						.finally(() => {});
					}
				})
				.catch(errors.call(this))
				.finally(() => {

				});
		},
	},
	filters:{
		endTimeFilter(val){
			let res = ''
			if(val){
				let _arr = val.split(' ')
				if(_arr[1]){
					res = _arr[1]
				}
			}
			return res
		}
	},
	watch: {
		// "app.currOfficeId": function(val, oldVal) {
		// 	if (oldVal) {
		// 		this.$set(this.searchObj, "gjxq", this.app.currOfficeId);
		// 		this.getListData();
		// 	}
		// }
		showEditMainUserInfo: function(val,oldVal){
			if(!val){
				this.searchUserModel = ''
			}
		}
	}
};
</script>
