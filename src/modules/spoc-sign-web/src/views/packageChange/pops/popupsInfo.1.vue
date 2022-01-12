<style lang="less">
	.popups-container {
        width: 100%;
		.flexRow {
			display: flex;
			flex-direction: row;
		}
		.money {
			color: #F5222D !important;
		}
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
		.ivu-select-selected-value,
		.ivu-select-placeholder,
		.ivu-select-input {
			font-size: 14px !important;
		}
		.ivu-select-placeholder {
			color: #999999 !important;
		}
		border-radius: 4px;
		position: relative;
		color: rgba(73, 80, 96, 1);
		.ivu-modal-body {
			padding: 0 !important;
		}
		.cp-header {
			height: 161px;
			padding: 24px 40px 20px;
			.flexRow;
			justify-content: center;
		}
		.cp-header-item {
			width: 400px;
			height: 100%;
			border: 1px solid #e6e7eb;
			border-radius: 4px;
			.header-info {
				height: calc(~'100% - 52px');
				padding: 0 20px;
				.flexRow;
				justify-content: space-between;
				align-items: center;
				.info-span {
					font-size: 14px;
					font-weight: 400;
				}
				.ivu-poptip-body-content {
					height: 64px;
				}
				.api {
					height: auto;
					.api_btn {
						width: 100%;
						display: flex;
						justify-content: flex-end;
						align-items: center;
						padding-top: 8px;
						button {
							width: 60px;
							height: 24px;
							padding: 0;
							text-align: center;
							line-height: 22px;
							margin-left: 12px;
						}
					}
				}
			}
		}
		.to-right {
			height: 100%;
			width: 120px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 30px;
		}
		.cp-header-item-header {
			height: 52px;
			position: relative;
			background: #f7f8fa;
			border-bottom: 1px solid #e6e7eb;
			div {
				height: 100%;
				.flexRow;
				justify-content: center;
				align-items: center;
				span {
					color: #495060;
					font-size: 14px;
					margin-left: 3px;
				}
			}
		}
		.change_package_course {
			width: 100%;
		}
		.cp-course {
			height: 535px;
			width: 100%;
			padding: 20px 40px 20px;
			background: #f2f3f7;
			.flexRow;
			justify-content: space-between;
		}
		.cp-course-item {
			height: 496px;
			width: 450px;
			border-radius: 4px;
			border: 1px solid #e6e7eb;
			overflow: visible;
			position: relative;
			.combination-course-table {
				height: 275px;
				width: 100%;
				box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
				background: #fff;
				border-radius: 4px;
				z-index: 10;
				.ivu-table td,
				.ivu-table-header th {
					height: 50px !important;
				}
				// .ivu-table-wrapper{
				//     border: none;
				// }
				// .ivu-table:before,.ivu-table:after{
				//     display: none;
				// }
			}
			.course-search {
				height: 64px;
				width: 100%;
				.flexRow;
				justify-content: flex-start;
				align-items: center;
			}
			.cp-course-item-t {
				height: 52px;
				border-radius: 4px 4px 0 0;
				.flexRow;
				justify-content: center;
				align-items: center;
				background: #f7f8fa;
				border-bottom: 1px solid #e6e7eb;
				span {
					color: #495060;
					font-size: 14px;
					margin-left: 3px;
				}
			}
			.cp-course-ul {
				height: 403px;
				background: #fff;
				overflow-y: scroll;
				padding-bottom: 24px;
				.cp-course-li {
					border-bottom: 1px solid #e6e7eb;
					.flexRow;
					justify-content: flex-start;
					align-items: flex-start;
					width: 100%;
					&:nth-last-of-type(1) {
						// border-bottom: 0;
					}
					.ivu-checkbox-group {
						width: 100%;
					}
					.ivu-checkbox-wrapper {
						width: 100%;
						display: flex;
						justify-content: center;
						align-items: center;
						.ivu-checkbox {
							padding: 0 30px;
						}
					}
				}
				.checkes {
					.flexRow;
					flex: 1;
					justify-content: center;
					align-items: center;
					height: 100%;
				}
				.ul-items {
					width: 302px;
					div {
						width: 288px;
						margin-top: 12px;
						font-size: 14px;
						span {
							font-size: 14px;
							color: #495060;
						}
					}
					.ul-items-s {
						margin-top: 10px;
						padding-top: 6px;
						margin-bottom: 10px;
						border-top: 1px dashed #e6e7eb;
					}
				}
			}
			.cp-course-item-b {
				height: 39px;
				background: #fff;
				border-radius: 0 0 4px 4px;
				padding-right: 8px;
				padding-top: 8px;
				padding-left: 15px;
				font-size: 14px;
				border-top: 1px solid #e6e7eb;
				a {
					cursor: default;
				}
				.left {
					float: left;
				}
				.right {
					float: right;
				}
			}
			.new-course {
				height: 403px;
				background: #fff;
			}
			.combination-course {
				height: 64px;
				background: #fff;
				border-bottom: 1px solid #e6e7eb;
				padding: 15px 16px 0;
				.kcb_wrap {
					display: flex;
					justify-content: space-around;
					align-items: center;
					div {
						padding: 0 8px;
						&.KcbMoney {
							flex: 1;
						}
					}
				}
				.course_table {
					padding-bottom: 18px;
				}
			}
			.new-course-box {
				height: 339px;
				overflow-y: scroll;
			}
			.new-course-item {
				padding-left: 16px;
				padding-right: 16px;
				width: 100%;
				border-bottom: 1px solid #e6e7eb;
				padding-bottom: 10px;
				.nc-1 {
					.flexRow;
					justify-content: space-between;
					align-items: center;
					padding: 10px 0;
					b {
						font-size: 16px;
						font-weight: 500;
						color: rgba(73, 80, 96, 1);
						line-height: 22px;
						margin-right: 6px;
					}
					span {
						font-size: 12px;
						font-weight: 400;
						color: rgba(153, 153, 153, 1);
						line-height: 17px;
					}
					a {
						font-size: 14px;
						font-weight: 400;
						line-height: 20px;
						margin-right: 16px;
					}
					.kcbAction {
						display: flex;
						justify-content: flex-start;
						align-items: center;
						.icon-shanchu {
							color: #D8D8D8;
							cursor: pointer;
							&:hover {
								color: #000000;
							}
						}
					}
				}
				.nc-2 {
					margin-bottom: 10px;
					span {
						font-size: 14px;
						color: rgba(73, 80, 96, 1);
					}
					b {
						font-size: 14px;
						font-weight: 400;
						color: rgba(73, 80, 96, 1);
						line-height: 20px;
						padding: 0 5px;
					}
				}
				.nc-3 {
					padding-bottom: 15px;
					border-bottom: 1px dashed #e6e7eb;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					span {
						font-size: 14px;
						font-weight: 400;
						color: rgba(73, 80, 96, 1);
					}
					.tags_box {
						width: 262px;
						min-height: 32px;
						padding: 0px 7px;
						font-size: 12px;
						border: 1px solid #dddee1;
						border-radius: 4px;
						cursor: pointer;
						.Row {
							.ivu-tag {
								background: #44bcb7;
								.ivu-tag-text,
								.ivu-icon-ios-close-empty {
									color: #FFFFFF;
								}
							}
							.arrow {}
						}
					}
				}
				.nc-4 {
					.flexRow;
					justify-content: space-between;
					align-items: center;
					margin-top: 5px;
					span {
						font-size: 14px;
						font-weight: 400;
						color: rgba(73, 80, 96, 1);
						line-height: 20px;
					}
				}
				.nc-5 {
					span {
						font-size: 14px;
						font-weight: 400;
						color: rgba(73, 80, 96, 1);
						line-height: 20px;
					}
				}
				&:nth-last-of-type(1) {
					border-bottom: 0;
				}
			}
		}
		.cp-counts {
			padding: 20px 36px 25px;
			height: 207px;
			width: 100%;
			.flexRow;
			justify-content: space-between;
			.com {
				margin-bottom: 12px;
				font-size: 14px;
				font-weight: 500;
				color: rgba(73, 80, 96, 1);
				line-height: 20px;
			}
			.cp-counts-left {
				width: 400px;
				span {
					.com;
				}
			}
			.cp-counts-right {
				width: 400px;
				h2 {
					.com;
					border-bottom: 1px solid #e6e7eb;
					padding-bottom: 6px;
				}
				.counts-item {
					.flexRow;
					justify-content: space-between;
					margin-top: 13px;
					span {
						font-size: 14px;
						font-weight: 400;
						color: rgba(73, 80, 96, 1);
						line-height: 20px;
					}
					a {
						font-size: 16px;
					}
				}
			}
		}
	}

	.pulldown {
		width: 259px !important;
		max-height: 157px !important;
		overflow-y: auto !important;
	}
</style>

<template>
	<div class="popups-container">
		<header class="cp-header">
			<div v-if="!showOnly" class="cp-header-item">
				<div class="cp-header-item-header">
					<div>
						<i class="iconfont icon-zhuanchuxueyuan"></i>
						<span>转出学员</span>
					</div>
					<a @click="showSelf(1)" style="position: absolute;right:20px;top:13px;font-size:14px;"><i class="iconfont icon-wancheng"></i></a>
				</div>
				<div class="header-info">
					<span class="info-span">{{ outStu.name || '--' }}</span>
					<span class="info-span">{{ outStu.No || '--' }}</span>
					<span class="info-span">{{ outStu.grade || '--' }}</span>
					<Button @click="chooseStuAFn(0)" disabled>切换</Button>
				</div>
			</div>
			<div v-if="showOnly" class="cp-header-item">
				<div class="cp-header-item-header">
					<div>
						<i class="iconfont icon-zhuanchuxueyuan"></i>
						<span>转出学员</span>
					</div>
					<a @click="showSelf(0)" style="position: absolute;right:20px;top:13px;"><i style="font-size:14px;" class="iconfont icon-shuaxin"></i></a>
				</div>
				<div class="header-info">
					<span class="info-span">{{ outStu.name || '--' }}</span>
					<span class="info-span">{{ outStu.No || '--' }}</span>
					<span class="info-span">{{ outStu.grade || '--' }}</span>
					<Button @click="chooseStuAFn(0)" disabled>切换</Button>
				</div>
			</div>
			<div v-if="!showOnly" class="to-right"><img src="../../../assets/images/arrow-right.png" /></div>
			<div v-if="!showOnly" class="cp-header-item">
				<div class="cp-header-item-header">
					<div>
						<i class="iconfont icon-zhuanruxueyuan"></i>
						<span>转入学员</span>
					</div>
				</div>
				<div class="header-info">
					<span class="info-span">{{ inStu.name || '--' }}</span>
					<span class="info-span">{{ inStu.No || '--' }}</span>
					<span class="info-span">{{ inStu.grade || '--' }}</span>
					<Poptip v-model="apiVisible" placement="left" width="250" @on-popper-hide="apiPopperHide">
						<Button  disabled>切换</Button>
						<div class="api" slot="content">
							<Select  disabled v-model="intoStuId" ref="intoStuSel" clearable placeholder="学员姓名" filterable remote :remote-method="remoteMethod" :loading="loading" style="width: 200px;" @on-change="stuChange">
								<Option v-for="(option, index) in options" :value="option.id" :label="option.name" :key="index">
									<CommonIcon type="_sousuox" :size="14" :style="{ marginRight: '12px', display: 'inline-block', verticalAlign: 'middle' }" />
									<span>{{ option.name }}</span>
									<span style="float:right;color:#ccc">{{ option.phone }}</span>
								</Option>
							</Select>
							<!-- <div class="api_btn">
										<Button @click="apiClose">取消</Button>
										<Button type="primary" @click="apiOk">确定</Button>
									</div> -->
						</div>
					</Poptip>
				</div>
			</div>
		</header>
		<section class="change_package_course">
			<div class="cp-course">
				<div class="cp-course-item">
					<div class="cp-course-item-t"><span>改包课程</span></div>
					<div class="cp-course-ul">
						<div class="cp-course-li" v-for="item in cpList" :key="'cpList'+item.studentCourseId">
							<CheckboxGroup v-model="OutCourse" @on-change="OutCourseChange">
								<Checkbox :label="item.studentCourseId" disabled>
									<div class="checkes">
										<div class="ul-items">
											<div>
												<span>产品：</span>
												<span>{{ item.courseName }}</span>
											</div>
											<div>
												<span>购买：</span>
												<span>
                                                            {{ number_format(item.courseUnitPrice, 2, '.', ',') }} x {{ item.courseHourNum }}
                                                            课时 =
                                                            {{ number_format(item.courseHourNum * item.courseUnitPrice, 2, '.', ',') }}
                                                            元
                                                        </span>
											</div>
											<div>
												<span>剩余：</span>
												<span>{{ item.leftCourseHour }} 课时</span>
											</div>
											<div>
												<span>转出：</span>
												<span>
                                                            {{ number_format(item.courseUnitPrice, 2, '.', ',') }} x {{ item.leftCourseHour }}
                                                            课时 =
                                                            {{ number_format(item.leftCourseHour * item.courseUnitPrice, 2, '.', ',') }}
                                                            元
                                                        </span>
											</div>
											<div class="ul-items-s">
												<span>定价：</span>
												<span>{{ number_format(item.publicPrice, 2, '.', ',') }}</span> 元
												<span style="margin-left:10px;">优惠：</span>
												<span>{{ number_format(item.publicPrice - item.coursePrice, 2, '.', ',') }}</span> 元
											</div>
										</div>
									</div>
								</Checkbox>
							</CheckboxGroup>
						</div>
					</div>
					<div class="cp-course-item-b">
						<div class="right">
							<span>结转：</span>
							<span>{{ OutCourseList.length }}</span>
							<span>课程 | 共</span>
							<span class="money">{{ this.number_format(rollOut, 2, '.', ',') }}</span>
							<span>元</span>
						</div>
					</div>
				</div>
				<div class="to-right" v-if="false"><img src="../../../assets/images/arrow-right.png" /></div>
				<div class="cp-course-item">
					<div class="cp-course-item-t"><span>新报课程</span></div>
					<div class="new-course">
						<div class="combination-course">
							<Select v-model="kcbId" ref="kcbSel" clearable prefix="ios-search" filterable placeholder="请输入课程名称进行搜索" style="width:240px;margin-right:16px;" remote @on-query-change="kcbRemote" @on-change="addKcb" :loading="kcbLoading" disabled>
								<Option v-for="item in kcbOptions" :value="item.id" :key="item.id" :label="item.name" v-if="item.htItemSubList.length">
									<div class="kcb_wrap">
										<div>{{ item.name }}</div>
										<div class="KcbMoney">{{getKcbInfo(item)}}</div>
										<div>{{ item.gradeLabel }}</div>
										<div>
											<Button type="primary">选择</Button>
										</div>
									</div>
								</Option>
							</Select>
							<Poptip placement="bottom" width="550" @on-popper-hide="courseTableHide">
								<Button  disabled>组合课程包</Button>
								<div class="course_table" slot="content">
									<!--组合课程包搜索-->
									<div class="combination-course-table">
										<div class="course-search">
											<Select v-model="gradeId" ref="gradeSel" clearable style="width:140px;margin-right: 10px;" disabled>
												<Option v-for="item in gradeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
											</Select>
											<Input v-model="packageCoursesName" placeholder="请输入组合课程包名称进行搜索" style="width:224px;margin-right: 24px;" disabled/>
											<Button type="primary" @click="courseSearch" disabled>搜索</Button>
										</div>
										<Table border v-if="courseTableData.length" height="211" :columns="courseTableCol" :data="courseTableData"></Table>
									</div>
								</div>
							</Poptip>
						</div>
						<div class="new-course-box">
							<div v-for="(items, indexs) in ncList" :key="items.id+indexs" class="new-course-item">
								<div class="nc-1">
									<div>
										<b>{{ items.name }}</b>
										<span v-if="items.htItemSubList.length">{{ number_format(items.costPrice, 2, '.', ',') }}</span>
										<span v-else>0</span>
										<span>元/小时</span>
									</div>
									<div class="kcbAction">
										<a @click="schoolHour(items,indexs)" disabled>{{ !items.ifDiscount ? '课时抵扣' : '取消抵扣' }}</a>
										<!-- <span @click="delItem(indexs,items)">
                                                    <CommonIcon type="_shanchu" :size="14" :style="{ marginTop: '0px', display: 'inline-block', verticalAlign: 'middle' }" />
                                        </span> -->
									</div>
								</div>
								<div class="nc-2">
									<span>购买信息：</span>
									<Input v-model="items.endNum" style="width: 60px" @on-blur="endNumChange(items,$event,indexs)" disabled/>
									<b>×</b>
									<Input v-model="items.costPrice" style="width: 60px" @on-blur="endCostPriceChange(items,$event,indexs)" disabled/>
									<b>=</b>
									<Input v-model="items.publicPrice" style="width: 100px" @on-blur="endPublicPriceChange(items,$event,indexs)" disabled/>
								</div>
								<div class="nc-3">
									<span>优惠信息：</span>
									<div style="width:268px;" @click.stop="tags_boxShow(items,indexs)">
										<div class="tags_box" v-if="items.policyType=='kcb'">
											<Row type="flex" class="Row" align="middle">
												<Col span="23">
												<Tag v-for="(item,index) in items.typeList" :key="index" @on-close="closeTag(items,index,item.id,indexs)">{{item.name}}</Tag>
												<!-- <input v-model="zkyhSearch" style="width:235px;display:inline-block;border: none;height: 31px;" disabled></input> -->
												</Col>
												<Col span="1">
												<!-- <Dropdown transfer-class-name="pulldown" transfer trigger="custom" :visible="items.visible" placement="bottom-end" @on-click="policyChange(items,indexs,$event)">
													<a href="javascript:void(0)" disabled @click.stop="tags_boxShow(items,indexs)" class="arrow">
														<Icon type="md-arrow-dropdown" v-show="!items.visible" color="#80848f" size="14"></Icon>
														<Icon type="md-arrow-dropup" v-show="items.visible" color="#80848f" size="14"></Icon>
													</a>
													<DropdownMenu slot="list">
														<DropdownItem v-for="(item,index) in items.policyItemList" v-show="item.name.indexOf(zkyhSearch) >= 0" :name="item.id" :key="item.id" :selected="items.policyIds.indexOf(item.id)!=-1&&item.type!='discount'" :disabled="(items.policyIds.indexOf(item.id)!=-1&&item.type!='discount')?false:(items.typeList.find(oitem=>oitem.type==item.type)&&item.type!='discount'&&items.policyIds.indexOf(item.id)==-1)||items.policyIds.length>=3">
															{{item.name}}
														</DropdownItem>
													</DropdownMenu>
												</Dropdown> -->
												</Col>
											</Row>
										</div>
										<div class="tags_box2" v-else>
											<Row type="flex" class="Row" align="middle">
												<Col span="23">
												<Tag>组合课程包优惠{{(items.discountAmount*1).toFixed(2)}}</Tag>
												</Col>
												<Col span="1">
												<Icon type="arrow-down-b" color="#80848f" size="14"></Icon>
												</Col>
											</Row>
										</div>
									</div>
									<!-- <Select placeholder="请选择优惠" clearable >
                                                <Option v-for="items in item.policyItemList" :value="items.value" :key="items.value">{{ items.label }}</Option>
                                            </Select> -->
								</div>
								<div class="nc-2" v-if="items.typeList.findIndex(v=>v.type=='relief')!=-1">
									<span>减免金额：</span>
									<Input v-model="items.derate" style="width: 100px" @on-blur="setDiscount(items,indexs)" />
								</div>
								<div class="nc-2">
									<span>请假次数：</span>
									<Input v-model="items.leaveNum" style="width: 100px" @on-blur="setleaveNum(items,indexs)" disabled/>
								</div>
								<div class="nc-4">
									<div>
										<span>折后单价：</span>
										<span>{{ number_format(items.endCostPrice, 2, '.', ',') }}
                                                    元</span>
									</div>
									<div>
										<span>优惠：</span>
										<span>{{ number_format(kckSale(items), 2, '.', ',') }} 元</span>
									</div>
									<div>
										<span>应收金额：</span>
										<span>{{ number_format(items.endPublicPrice, 2, '.', ',') }} 元</span>
									</div>
								</div>
								<div v-show="items.ifDiscount" class="nc-5">
									<span>其中，结转课程的金额，按该课程价格已抵扣</span>
									<Input v-model="items.discount" :disabled="items.discountDisabled" style="width: 60px;" @on-blur="discountChange(items,indexs,$event)" />
									<span>课时。已抵扣的课时不会再进行收费。</span>
								</div>
							</div>
						</div>
					</div>
					<div class="cp-course-item-b">
						<div class="left">
							<span>可抵扣金额：</span>
							<span class="money">{{number_format(residue, 2, '.', ',')}}</span>
							<span>元</span>
						</div>
						<div class="right">
							<span>结转：</span>
							<span>{{ncList.length}}</span>
							<span>课程 | 共</span>
							<span class="money">{{number_format(carryforward, 2, '.', ',')}}</span>
							<span>元</span>
						</div>
					</div>
				</div>
			</div>
			<div class="cp-counts">
				<div class="cp-counts-left">
					<span>备注</span>
					<Input v-model="remarks" type="textarea" :rows="4" style="margin-top: 12px;" disabled />
				</div>
				<div class="cp-counts-right">
					<h2>改包结算</h2>
					<div class="counts-item">
						<span>折后金额：</span>
						<span>
                                    <span class="money">{{number_format(carryforward, 2, '.', ',')}}</span> 元
						</span>
					</div>
					<div class="counts-item">
						<span>抵扣金额：</span>
						<span>
                                    <span class="money">{{number_format(rollOut-residue, 2, '.', ',')}}</span> 元
						</span>
					</div>
					<div class="counts-item">
						<span>
                                    改包结存金额：
                                    <Poptip placement="bottom" min-width="220" :transfer="true">
                                        <Icon size="12" style="cursor: pointer;margin-left:-10px;" color="#999" type="ios-help-circle-outline" />
                                        <div slot="content">
                                            <p>当前选中的抵扣课程不足以消耗选中的改包课程的金额，</p>
                                            <p>剩余的金额将以电子货币的形式存入学生账户中供再次使用。</p>
                                        </div>
                                    </Poptip>
                                </span>
						<span>
                                    <span class="money">{{balance>=0?number_format(balance, 2, '.', ','):number_format(0, 2, '.', ',')}}</span> 元
						</span>
					</div>
					<div class="counts-item">
						<span>实际补缴：</span>
						<span>
                                    <!-- <span class="money">{{number_format(carryforward-(rollOut-residue), 2, '.', ',')}}</span> -->

						<span class="money">{{balance>=0?number_format(0, 2, '.', ','):number_format((-1*balance), 2, '.', ',')}}</span> 元
						</span>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
	import valid, {
		errors,
		htContract,
		common,
		htChangeApply,
		sysDict
	} from '../../../libs/request';
	import CommonIcon from '_c/common-icon';
	import {
		mapMutations,
		mapState
	} from 'vuex';
	export default {
		props: {
			//合同详情打开添加
			ctStudnetId: {
				type: String
			},
			ctStudnetName: {
				type: String
			},
		},
		data() {
			return {
				chooseStuShow: false,
				remarks: '',
				kcbLoading: false,
				zkyhSearch: '',
				apiVisible: false,
				intoStuId: '',
				inStuInfo: {},
				loading: false,
				options: [],
				changePackage: false,
				showOnly: true, //切换转出学员
				courseTableCol: [{
						title: '课程包名称',
						key: 'name',
						minWidth: 70,
						resizable: true,
						width: null,
					},
					{
						title: '包含课程',
						key: 'course',
						minWidth: 70,
						resizable: true,
						width: null,
						render: (h, params) => {
							return h('div', params.row.htItemList.length);
						}
					},
					{
						title: '组合价格',
						key: 'publicPrice',
						minWidth: 70,
						resizable: true,
						width: null,
						render: (h, params) => {
							return h('div', Number(params.row.htItemSubList[0].publicPrice).toFixed(2));
						}
					},
					{
						title: '操作',
						key: 'doAction',
						minWidth: 70,
						resizable: true,
						width: null,
						render: (h, params) => {
							return h('div', [
								h(
									'Button', {
										props: {
											type: 'primary'
										},
										style: {},
										on: {
											click: () => {
												this.addZhkcb(params.row.htItemList, params.row)
											}
										}
									},
									'选择'
								)
							]);
						}
					}
				],
				courseTableData: [],
				chooseStuA: false, //切换学生
				kcbId: '',
				cpTitle: '改包申请',
				chooseStatus: '', //转入转出状态 2 转出   1 转入
				outStu: {
					name: '--',
					No: '--',
					grade: '--'
				},
				inStu: {
					name: '--',
					No: '--',
					grade: '--'
				},
				ncList: [],
				OutCourse: [],
				OutCourseList: [],
				cpList: [],
				officeId: '',
				kcbList: [],
				zhkcbList: [],
				kcbOptions: [],
				formstuInfo: {},
				formctInfo: {},
				gradeList: [],
				gradeId: '',
				packageCoursesName: '',
				changePackageId: ''
			};
		},
		computed: {
			rollOut() {
				let num = 0;
				this.OutCourseList.forEach(v => {
					num += v.leftCourseHour * v.courseUnitPrice;
				});
				return num;
			},
			residue() {
				let num = this.rollOut;
				this.ncList.forEach(v => {
					num = num - (v.deduction || 0)
				})
				return num;
			},
			carryforward() {
				let num = 0;
				this.ncList.forEach(v => {
					num += v.endPublicPrice;
				});
				return num;
			},
			balance() {
				return this.rollOut - this.carryforward;
			}
		},
		components: {
			CommonIcon
		},
		created() {
			this.findChildDictByParentDict()
		},
		methods: {
			...mapMutations(['updateLoadingStatus']),
			editInfo(id) {
				htChangeApply
					.form({
						id
					})
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							let data = res.data.data;
							this.formstuInfo = data.outStudentInfo;
							this.inStuInfo = data.inStudentInfo;
							this.OutCourse = data.outJson.length ? data.outJson[0].OutCourse || [] : [];
							this.OutCourseList = data.outJson.length ? data.outJson[0].OutCourseList || [] : [];
							console.log(this.OutCourseList, 888)
							this.ncList = data.inJson.length ? data.inJson[0].ncList || [] : [];
							// this.cpList = data.courseInfoVOList;
							this.cpList = data.outJson.length ? data.outJson[0].cpList || [] : [];
							this.officeId = data.officeId;
							this.formctInfo = data.htContractInfoVO;
							this.outStu.name = this.formstuInfo.name;
							this.outStu.No = this.formstuInfo.phone;
							this.outStu.grade = this.formstuInfo.gradeLabel;
							this.inStu.name = this.inStuInfo.name;
							this.inStu.No = this.inStuInfo.phone;
							this.inStu.grade = this.inStuInfo.gradeLabel;
							this.remarks = data.remarks;
							if(data.type == 1) {
								this.showOnly == false;
							}
							this.getListData();
						}
					})
					.catch(errors.call(this))
					.finally(() => {});
			},
			findChildDictByParentDict() {
				let params = {
					type: 'jw_course_type'
				};
				sysDict
					.findChildDictByParentDict(params)
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							this.gradeList = res.data.data;
						}
					})
					.catch(errors.call(this))
					.finally(() => {});
			},
			kckSale(items) {
				return items.publicPrice - items.endPublicPrice;
			},
			getKcbInfo(item) {
				if(item.htItemSubList.length) {
					return(
						this.number_format(item.htItemSubList[0].costPrice, 2, '.', ',') +
						'元/课时*' +
						this.number_format(item.htItemSubList[0].num, 0, '', '') +
						'课时=' +
						this.number_format(item.htItemSubList[0].publicPrice, 2, '.', ',') +
						'元'
					);
				} else {
					return '';
				}
			},
			show(id) {
				this.changePackage = true;
				if(id) {
					this.id = id;
					this.editInfo(id);
				}
			},
			turnCenter() {
				this.$router.push({
					name: 'sign.turnCenter'
				});
			},
			validityPeriodPopupFn() {
				this.$router.push({
					name: 'sign.validityPeriodPopup'
				});
			},
			viewThePaymentSlip() {
				this.$router.push({
					name: 'sign.viewThePaymentSlip'
				});
			},
			addNewPaymentFn() {
				this.$router.push({
					name: 'sign.addNewPayment'
				});
			},
			showSelf(val) {
				this.showOnly = val ? true : false;
				this.inStu.name = this.outStu.name;
				this.inStu.No = this.outStu.No;
				this.inStu.grade = this.outStu.grade;
			},
			chooseStuAFn(status) {
				this.chooseStatus = status ? '1' : '0';
				this.chooseStuA = true;
				this.chooseStuShow = true;
				this.$nextTick(() => {
					this.$refs.chooseStu.showModal();
				})
			},
			clickActionFn(row, info) {
				//选择学生
				this.chooseStuA = false;
				this.outStu.name = info.name;
				this.outStu.No = info.phone;
				this.outStu.grade = info.gradeLabel;
				if(this.showOnly) {
					this.inStu.name = info.name;
					this.inStu.No = info.phone;
					this.inStu.grade = info.gradeLabel;
					this.inStuInfo = info;
				}
				this.cpList = row.courseInfoVOList;
				this.officeId = row.officeId;
				this.formctInfo = row;
				this.formstuInfo = info;
				this.OutCourse = [];
				this.OutCourseList = [];
				this.ncList = [];
				if(this.$refs.chooseStu) {
					this.$refs.chooseStu.closeModal();
				}
				this.getListData();
			},
			//课时抵扣
			schoolHour(item, indexs) {
				item.ifDiscount = !item.ifDiscount;
				this.setDeduction(item, indexs);
			},
			setDeduction(item, indexs) {
				item.discountDisabled = false;
				item.deduction = 0;
				let num = null;
				if(item.ifDiscount) {
					num = (this.residue / item.endCostPrice);
				} else {
					num = 0;
					let privilege = item.typeList.sort((a, b) => {
						return a.levelSort - b.levelSort;
					})
					let coursePrice = item.publicPrice - item.discountAmount;

					// v.endNum=Number(v.htItemSubList[0].num);
					// v.endCostPrice=Number(v.htItemSubList[0].costPrice);
					// v.endPublicPrice= Number(v.htItemSubList[0].publicPrice);

					privilege.forEach(v => {
						if(v.type == "fullreduction") {
							let nums = parseInt(coursePrice / v.fullReductionPrice);
							if(nums > v.fullReductionLimit && v.fullReductionLimit > 0) {
								nums = v.fullReductionLimit;
							}
							coursePrice -= nums * v.fullReductionDiscount;
						}
						if(v.type == "discount") {
							coursePrice = coursePrice * v.ratio;
						}
						if(v.type == "relief") {
							coursePrice -= item.derate;
						}
					})
					item.endCostPrice = (coursePrice / item.endNum);
					item.endPublicPrice = coursePrice;
				}
				if(num <= item.num) {
					item.endNum = item.num;
				} else if(num >= item.num) {
					num = item.num;
					item.endNum = item.num;
					item.discountDisabled = true;
				}
				item.discount = Number(num).toFixed(1);
				item.endPublicPrice = item.endNum * item.endCostPrice;
				item.deduction = num * item.endCostPrice;
				this.$set(this.ncList, indexs, item);
			},
			//删除某项课程
			delItem(index, row) {
				if(row.kId) {
					let arr = this.ncList.filter(v => v.kId != row.kId);
					this.ncList = arr;
				} else {
					this.ncList.splice(index, 1);
				}
			},
			submit() {
				// formstuInfo:{},
				// formctInfo:{},
				// inStuInfo
				this.updateLoadingStatus({
					isLoading: true
				});
				let params = {
					id: this.changePackageId,
					"type": this.formstuInfo.id == this.inStuInfo.id ? "0" : "1",
					"officeId": this.officeId,
					"fromCtId": this.formctInfo.ctId,
					"fromStudentId": this.formstuInfo.id,
					"toStudentId": this.inStuInfo.id,
					"outJson": [],
					"outCourseNum": this.OutCourseList.length,
					"outCourseHourNum": 0,
					"outPrice": this.rollOut,
					"inJson": [],
					"inCourseNames": "EE1",
					"inSignPrice": this.carryforward,
					"inTotalPrice": this.rollOut,
					"inPrice": this.rollOut,
					"inRemainPrice": this.balance > 0 ? this.balance : 0,
					"inPayPrice": this.balance < 0 ? this.balance * -1 : 0,
					"remarks": this.remarks
				};
				let outJson = [];
				let outCourseHourNum = 0;
				this.OutCourseList.forEach((v, k) => {
					let obj = {
						"stuCourseRelId": v.studentCourseId,
						"courseId": v.courseId,
						"courseName": v.courseName,
						"courseUnitPrice": v.courseUnitPrice,
						"courseHourNum": v.courseHourNum,
						"coursePrice": v.coursePrice,
						"leftCourseHour": v.leftCourseHour,
						"publicPrice": v.publicPrice,
						"discountPrice": v.publicPrice - v.coursePrice, //edit
						"finishLeaveNum": this.formctInfo.finishLeaveNum,
					}
					if(k == 0) {
						obj.OutCourse = this.OutCourse;
						obj.OutCourseList = this.OutCourseList;
						obj.cpList = this.cpList;
					}
					outJson.push(obj);
					outCourseHourNum += (v.leftCourseHour || 0) * 1;
				})
				params.outJson = outJson;
				params.outCourseHourNum = outCourseHourNum;
				let inJson = [];
				let inCourseNames = [];
				let inTotalPrice = 0;
				this.ncList.forEach((v, k) => {
					inCourseNames.push(v.name);
					inTotalPrice += v.publicPrice * 1;
					let obj = {
						"coursePackId": v.packId,
						"coursePackPriceId": v.packPriceId,
						"courseId": v.id,
						"coursePriceId": v.htItemSubList[0].id,
						"courseType": v.type,
						"courseName": v.name,
						"publicUnitPrice": v.htItemSubList[0].costPrice,
						"publicHour": v.htItemSubList[0].num,
						"publicPrice": v.htItemSubList[0].publicPrice,
						"courseUnitPrice": v.endCostPrice,
						"courseHour": v.endNum,
						"coursePrice": v.endPublicPrice,
						"discountPrice": this.kckSale(v),
						"leaveNum": v.leaveNum,
						"yhzcList": []
					};
					v.policyItemList.forEach(val => {
						let obj1 = {
							"itemId": val.id,
							"itemName": val.name,
							"exemptionPrice": val.type == 'relief' ? v.derate : ''
						}
						obj.yhzcList.push(obj1)
					})
					if(k == 0) {
						obj.ncList = this.ncList;
					}
					inJson.push(obj);
				})
				params.inJson = inJson;
				params.inCourseNames = inCourseNames.join(',');
				params.inTotalPrice = inTotalPrice;
				htChangeApply
					.save(params)
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							this.changePackage = false;
							this.$Message.success(res.data.message)
							this.$emit('save');
						}
					})
					.catch(errors.call(this))
					.finally(() => {
						this.updateLoadingStatus({
							isLoading: false
						});
					});
			},

			//组合课程包
			courseSearch() {
				let arr = [];
				this.zhkcbList.forEach(v => {
					if((v.name.indexOf(this.packageCoursesName) != -1 || !this.packageCoursesName) && (v.gradeVal ==
							this.gradeId || !this.gradeId)) {
						arr.push(v);
					}
				})
				this.courseTableData = arr;
			},
			number_format(number, decimals, dec_point, thousands_sep) {
				/*
				 * 参数说明：
				 * number：要格式化的数字
				 * decimals：保留几位小数
				 * dec_point：小数点符号
				 * thousands_sep：千分位符号
				 * */
				number = (number + '').replace(/[^0-9+-Ee.]/g, '');
				let n = !isFinite(+number) ? 0 : +number,
					prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
					sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep,
					dec = typeof dec_point === 'undefined' ? '.' : dec_point,
					s = '',
					toFixedFix = function(n, prec) {
						let k = Math.pow(10, prec);
						return '' + Math.round(n * k) / k;
					};

				s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
				let re = /(-?\d+)(\d{3})/;
				while(re.test(s[0])) {
					s[0] = s[0].replace(re, '$1' + sep + '$2');
				}

				if((s[1] || '').length < prec) {
					s[1] = s[1] || '';
					s[1] += new Array(prec - s[1].length + 1).join('0');
				}
				return s.join(dec);
			},
			OutCourseChange(params) {
				let arr = [];
				this.cpList.forEach(v => {
					if(params.indexOf(v.id) != -1) {
						arr.push(v);
					}
				});
				this.OutCourseList = arr;
			},
			remoteMethod(query) {
				if(query !== '') {
					this.loading = true;
					let params = {
						name: query
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
						this.inStuInfo = v;
					}
				});
				this.apiOk();
			},
			apiPopperHide(val) {
				// this.inStuInfo = {};
				console.log('apiPopperHide', this.$refs.intoStuSel)
				this.$refs.intoStuSel.clearSingleSelect();
				this.intoStuId = '';
				this.options = [];
			},
			courseTableHide() {
				this.gradeId = '';
				this.packageCoursesName = '';
				this.$refs.gradeSel.clearSingleSelect();
			},
			apiClose() {
				// this.inStuInfo = {};
				this.intoStuId = '';
				this.options = [];
				this.apiVisible = false;
			},
			apiOk() {
				this.inStu.name = this.inStuInfo.name;
				this.inStu.No = this.inStuInfo.phone;
				this.inStu.grade = this.inStuInfo.gradeLabel;
				this.apiVisible = false;
			},
			getListData() {
				this.kcbLoading = true;
				htContract
					.findItemListData({
						officeId: this.officeId
					})
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							res.data.data.forEach(v => {
								if(v.type == 'kcb') {
									this.kcbList = v.htItemList;
									this.kcbOptions = v.htItemList;
								}
								if(v.type == 'zhkcb') {
									this.zhkcbList = v.htItemList;
									this.courseTableData = v.htItemList
								}
							});
							this.kcbLoading = false;
						}
					})
					.catch(errors.call(this))
					.finally(() => {});
			},
			kcbRemote(query) {
				console.log(query);
				if(query !== '') {
					this.kcbOptions = this.kcbList.filter(v => v.name.toLowerCase().indexOf(query.toLowerCase()) != -1);
				} else {
					this.kcbOptions = this.kcbList;
				}
			},
			addKcb(val) {
				this.kcbList.forEach(v => {
					if(v.id == val) {
						if(v.htItemSubList.length) {
							v.discountDisabled = false;
							v.discountAmount = 0;
							v.endNum = Number(v.htItemSubList[0].num);
							v.num = Number(v.htItemSubList[0].num);
							v.endCostPrice = Number(v.htItemSubList[0].costPrice);
							v.costPrice = Number(v.htItemSubList[0].costPrice);
							v.endPublicPrice = Number(v.htItemSubList[0].publicPrice);
							v.publicPrice = Number(v.htItemSubList[0].publicPrice);
							v.visible = false;
							v.typeList = [];
							v.policyIds = [];
							v.exemptionPrice = '';
							v.deduction = 0;
							v.derate = '';
							v.ifDiscount = false;
							v.discount = '';
							v.leaveNum = Math.ceil(v.endNum / 40);
							let obj = Object.assign({}, v);
							obj = JSON.parse(JSON.stringify(obj));
							this.$set(this.ncList, this.ncList.length, obj)
						}
					}
				});
				this.kcbId = '';
				this.$refs.kcbSel.clearSingleSelect();
			},
			addZhkcb(val, data) {
				let keys = this.guid();
				val.forEach(v => {
					if(v.htItemSubList.length) {
						v.kId = keys;
						v.discountDisabled = false;
						v.discountAmount = data.htItemSubList[0].discountAmount * (v.htItemSubList[0].publicPrice / data.htItemSubList[0].groupPrice);
						v.endNum = Number(v.htItemSubList[0].num);
						v.num = Number(v.htItemSubList[0].num);
						v.endPublicPrice = Number(v.htItemSubList[0].publicPrice - v.discountAmount);
						v.endCostPrice = Number(v.endPublicPrice / v.endNum);
						v.costPrice = Number(v.htItemSubList[0].costPrice);
						v.publicPrice = Number(v.htItemSubList[0].publicPrice)
						v.visible = false;
						v.typeList = [];
						v.policyIds = [];
						v.exemptionPrice = '';
						v.deduction = 0;
						v.derate = '';
						v.ifDiscount = false;
						v.discount = '';
						v.leaveNum = Math.ceil(v.endNum / 40);
						let obj = Object.assign({}, v);
						obj = JSON.parse(JSON.stringify(obj));
						this.$set(this.ncList, this.ncList.length, obj)
					}
				});
				this.$refs.kcbSel.clearSingleSelect();
			},
			guid() {
				return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
					let r = Math.random() * 16 | 0,
						v = c == 'x' ? r : (r & 0x3 | 0x8);
					return v.toString(16);
				});
			},
			tags_boxShow(items, ind) {
				let obj = items;
				obj.visible = !items.visible;
				this.$set(this.ncList, ind, obj)
			},
			tags_boxHide(items, ind) {
				let obj = items;
				obj.visible = false;
				this.$set(this.ncList, ind, obj)
			},
			setzkyhSearch(val) {
				console.log(val)
			},
			closeTag(item, ind, id, indexs) {
				let index = item.policyIds.indexOf(id)
				item.policyIds.splice(index, 1);
				item.typeList.splice(ind, 1);
				if(!item.typeList.find(oitem => oitem.type == 'relief')) {
					item.exemptionPrice = '';
				}
				this.$set(this.ncList, indexs, item)
				this.setDiscount(item, indexs);
				// this.conce ssions(o);
			},
			policyChange(items, ind, e) {
				if(items.typeList.length > 2) {
					return;
				}
				items.policyItemList.forEach(v => {
					if(v.id == e) {
						let index = items.typeList.findIndex(v => v.id == e);
						if(v.type != 'discount' && index != -1) {
							let index1 = items.policyIds.indexOf(e);
							items.typeList.splice(index, 1);
							items.policyIds.splice(index1, 1);
						} else {
							items.typeList.push(v);
							items.policyIds.push(e);
						}
					}
				})
				this.tags_boxHide(items, ind);
				this.setDiscount(items, ind);
				this.zkyhSearch = '';
			},
			setDiscount(o, indexs) {
				let privilege = o.typeList.sort((a, b) => {
					return a.levelSort - b.levelSort;
				})
				let coursePrice = o.publicPrice - o.discountAmount;

				// v.endNum=Number(v.htItemSubList[0].num);
				// v.endCostPrice=Number(v.htItemSubList[0].costPrice);
				// v.endPublicPrice= Number(v.htItemSubList[0].publicPrice);

				privilege.forEach(v => {
					if(v.type == "fullreduction") {
						let num = parseInt(coursePrice / v.fullReductionPrice);
						if(num > v.fullReductionLimit && v.fullReductionLimit > 0) {
							num = v.fullReductionLimit;
						}
						coursePrice -= num * v.fullReductionDiscount;
					}
					if(v.type == "discount") {
						coursePrice = coursePrice * v.ratio;
					}
					if(v.type == "relief") {
						coursePrice -= o.derate;
					}
				})
				o.endCostPrice = (coursePrice / o.endNum);
				o.endPublicPrice = coursePrice;
				o.ifDiscount = false;
				this.setDeduction(o, indexs);
			},
			setleaveNum(o, indexs) {
				if(o.leaveNum < 0) {
					o.leaveNum = 0;
				}
				this.$set(this.ncList, indexs, o)
			},
			discountChange(item, indexs, e) {
				let privilege = item.typeList.sort((a, b) => {
					return a.levelSort - b.levelSort;
				})
				let coursePrice = item.publicPrice - item.discountAmount;
				privilege.forEach(v => {
					if(v.type == "fullreduction") {
						let nums = parseInt(coursePrice / v.fullReductionPrice);
						if(nums > v.fullReductionLimit && v.fullReductionLimit > 0) {
							nums = v.fullReductionLimit;
						}
						coursePrice -= nums * v.fullReductionDiscount;
					}
					if(v.type == "discount") {
						coursePrice = coursePrice * v.ratio;
					}
					if(v.type == "relief") {
						coursePrice -= item.derate;
					}
				})
				item.endCostPrice = (coursePrice / item.endNum);
				// item.endPublicPrice = coursePrice;
				item.deduction = 0;
				let max = (this.residue / item.endCostPrice);
				if(Number(item.discount) > Number(max)) {
					item.discount = Math.ceil(max);
					item.discountDisabled = true;
				}
				if(Number(item.discount) < Number(max)) {
					item.discount = Math.floor(max);
					item.discountDisabled = true;
				}
				if(Number(item.discount) < 0) {
					item.discount = 0;
				}
				if(Number(item.discount) >= Number(item.num)) {
					item.discount = item.num;
				}
				let num = item.discount;
				if(Number(num) <= Number(item.num)) {
					item.endNum = item.num;
				} else if(Number(num) >= Number(item.num)) {
					num = item.num;
					item.discount = item.num;
					item.endNum = item.num;
				}
				if(Number(max) < Number(item.num) && num == Math.ceil(max)) {
					item.deduction = this.residue;
					item.endCostPrice = (coursePrice - (num - max) * item.endCostPrice) / item.endNum;
				} else if(Number(max) < Number(item.num) && num == Math.floor(max)) {
					item.deduction = this.residue;
					item.endCostPrice = (coursePrice + Math.abs(num - max) * item.endCostPrice) / item.endNum;
				} else {
					item.deduction = num * item.endCostPrice;
				}
				item.endPublicPrice = item.endNum * item.endCostPrice;
				this.$set(this.ncList, indexs, item)
			},
			closeChooseStu() {
				this.chooseStuShow = false;
			},
			getMax(item) {
				let max = (this.residue / item.endCostPrice);
				return Math.ceil(max);
			},
			endNumChange(item, e, indexs) {
				let num = e.target.value;
				console.log(num, item.endNum)
				item.num = num;
				item.typeList = [];
				item.policyIds = [];
				item.publicPrice = num * item.costPrice;
				this.setDiscount(item, indexs);
				// item.endNum=e.target;
			},
			endCostPriceChange(item, e, indexs) {
				let num = e.target.value;
				item.typeList = [];
				item.policyIds = [];
				item.publicPrice = num * item.endNum;
				this.setDiscount(item, indexs);

			},
			endPublicPriceChange(item, e, indexs) {
				let num = e.target.value;
				item.typeList = [];
				item.policyIds = [];
				item.costPrice = num / item.endNum;
				item.publicPrice = num;
				this.setDiscount(item, indexs);

			}
		}
	};
</script>
