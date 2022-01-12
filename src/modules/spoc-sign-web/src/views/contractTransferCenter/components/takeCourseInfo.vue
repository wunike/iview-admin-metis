<style lang="less">
.take-course-container1 {
    padding: 0 24px;
    width:100%;
    .flexRow {
        display: flex;
        flex-direction: row;
    }
    .money {
        color: #f5222d !important;
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
        padding: 16px !important;
    }
    .turnCenterType {
        padding-bottom: 16px;
        font-size: 14px;
    }
    .turn_center_table {
        .ivu-table-wrapper {
            border: none;
            .ivu-table:before,
            .ivu-table:after {
                display: none;
            }
        }
    }
    .cp-course-item {
        height: 496px;
        width: 100%;
        border-radius: 4px;
        border: 1px solid #e6e7eb;
        overflow: visible;
        position: relative;
        margin-top: 24px;
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
                    background-color: #f3f3f3;
                    // cursor: pointer;
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
    	padding: 12px 0px 25px;
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
    	.cp-counts-right {
    		flex: 1;
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
    <div class="take-course-container1">
        <!-- <Modal class="take-course" width="680" v-model="takeCourse" :mask-closable="false" :title="$t('modules_spoc_crm_web_src_views_customer360_index_1098')"> -->
            <div>
                <Form :label-width="80">
                    <div class="turnCenterType">{{$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_takecourse_5852')}} {{ type == 1 ? $t('modules_spoc_sign_web_src_views_contracttransfercenter_components_takecourse_58531') : $t('modules_spoc_sign_web_src_views_contracttransfercenter_components_takecourse_5853') }}</div>
                    <div class="turn_center_table"><Table border size="small" :columns="columns" :data="tableData"></Table></div>
                    <!-- <FormItem :label="$t('modules_spoc_crm_web_src_views_transferintroductionmanagement_regreward_2013')" style="padding-top: 16px;">
                        <Select v-model="formItem.inSellerId" filterable>
                            <Option v-for="(item, index) in roleList" :key="item.id" :value="item.id" :label="item.name">{{ item.name }}</Option>
                        </Select>
                    </FormItem> -->
                    <div class="cp-course-item">
                        <div class="cp-course-item-t"><span>{{$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_takecourse_5855')}}</span></div>
                        <div class="new-course">
                            <div class="combination-course">
                                <Select disabled v-model="kcbId" ref="kcbSel" clearable prefix="ios-search" filterable :placeholder="$t('modules_spoc_sign_web_src_views_contractgeneration_component_vitemcard_5449')" style="width:240px;margin-right:16px;" remote @on-query-change="kcbRemote" @on-change="addKcb" :loading="kcbLoading">
                                    <Option v-for="item in kcbOptions" :value="item.id" :key="item.id" :label="item.name" v-if="item.htItemSubList.length">
                                        <div class="kcb_wrap">
                                            <div>{{ item.name }}</div>
                                            <div class="KcbMoney">{{getKcbInfo(item)}}</div>
                                            <div>{{ item.gradeLabel }}</div>
                                            <div>
                                                <Button type="primary">{{$t('spoc_hootie_web_282')}}</Button>
                                            </div>
                                        </div>
                                    </Option>
                                </Select>
                                <Poptip placement="bottom" width="550" @on-popper-hide="courseTableHide">
                                    <Button disabled>{{$t('core.coursePackGroup')}}</Button>
                                    <div class="course_table" slot="content">
                                        <!--组合课程包搜索-->
                                        <div class="combination-course-table">
                                            <div class="course-search">
                                                <Select disabled v-model="gradeId" ref="gradeSel" clearable style="width:140px;margin-right: 10px;">
                                                    <Option v-for="item in gradeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                                </Select>
                                                <Input disabled v-model="packageCoursesName" :placeholder="$t('modules_spoc_sign_web_src_views_contractgeneration_component_vitemcard_5452')" style="width:224px;margin-right: 24px;" />
                                                <Button disabled type="primary" @click="courseSearch">{{$t('message_addressbook_267')}}</Button>
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
                                            <span>{{$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_takecourse_5861')}}</span>
                                        </div>
                                        <div class="kcbAction">
                                           <!-- <a @click="schoolHour(items,indexs)">{{ !items.ifDiscount ? $t('modules_spoc_sign_web_src_views_contracttransfercenter_components_takecourse_5862') : $t('modules_spoc_sign_web_src_views_contracttransfercenter_components_takecourse_5863') }}</a>
                                            <span @click="delItem(indexs,items)">
                                                <CommonIcon type="_shanchu" :size="14" :style="{ marginTop: '0px', display: 'inline-block', verticalAlign: 'middle' }" />
                                            </span> -->
                                        </div>
                                    </div>
                                    <div class="nc-2">
                                        <span>{{$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_takecourse_5864')}}</span>
                                        <Input disabled v-model="items.endNum" style="width: 60px" @on-blur="endNumChange(items,$event,indexs)" />
                                        <b>×</b>
                                        <Input disabled v-model="items.costPrice" style="width: 60px" @on-blur="endCostPriceChange(items,$event,indexs)" />
                                        <b>=</b>
                                        <Input disabled v-model="items.publicPrice" style="width: 100px" @on-blur="endPublicPriceChange(items,$event,indexs)" />
                                    </div>
                                    <div class="nc-3">
                                        <span>{{$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_takecourse_5865')}}</span>
                                        <div style="width:268px;" @click.stop="tags_boxShow(items,indexs)">
                                        	<div class="tags_box" v-if="items.policyType=='kcb'">
                                        		<Row type="flex" class="Row" align="middle">
                                        			<Col span="23">
                                        			<Tag disabled v-for="(item,index) in items.jsonData.policyList" :key="index" @on-close="closeTag(items,index,item.id,indexs)">{{item.name}}</Tag>
                                        			<!-- <input disabled v-model="zkyhSearch" style="width:235px;display:inline-block;border: none;height: 31px;"></input> -->
                                        			</Col>
                                        			<Col span="1">
                                        			<!-- <Dropdown disabled transfer-class-name="pulldown" transfer trigger="custom" :visible="items.visible" placement="bottom-end" @on-click="policyChange(items,indexs,$event)">
                                        				<a href="javascript:void(0)" @click.stop="tags_boxShow(items,indexs)" class="arrow">
                                        					<Icon type="md-arrow-dropdown" v-show="!items.visible" color="#80848f" size="14"></Icon>
                                        					<Icon type="md-arrow-dropup" v-show="items.visible" color="#80848f" size="14"></Icon>
                                        				</a>
                                        				<DropdownMenu slot="list">
                                        					<DropdownItem v-for="(item,index) in items.policyItemList" v-show="item.name.indexOf(zkyhSearch) >= 0" :name="item.id" :key="item.id" :selected="items.policyIds.indexOf(item.id)!=-1&&item.type!='discount'" :disabled="(items.policyIds.indexOf(item.id)!=-1&&item.type!='discount')?false:(items.jsonData.policyList.find(oitem=>oitem.type==item.type)&&item.type!='discount'&&items.policyIds.indexOf(item.id)==-1)||items.policyIds.length>=3">
                                        						{{item.name}}
                                        					</DropdownItem>
                                        				</DropdownMenu>
                                        			</Dropdown> -->
                                        			</Col>
                                        		</Row>
                                        	</div>
                                        	<div class="tags_box2" v-else style="background-color: #f3f3f3;">
                                        		<Row type="flex" class="Row" align="middle">
                                        			<Col span="23">
                                        			<Tag disabled>{{$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_takecourseinfo_5915', [(items.discountAmount*1).toFixed(2)])}}</Tag>
                                        			</Col>
                                        			<Col span="1">
                                        			<Icon type="arrow-down-b" color="#80848f" size="14"></Icon>
                                        			</Col>
                                        		</Row>
                                        	</div>
                                        </div>
                                        <!-- <Select :placeholder="$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_takecourse_5867')" clearable >
                                            <Option v-for="items in item.policyItemList" :value="items.value" :key="items.value">{{ items.label }}</Option>
                                        </Select> -->
                                    </div>
                                    <div class="nc-2" v-if="items.jsonData.policyList.findIndex(v=>v.type=='relief')!=-1">
                                        <span>{{$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_takecourse_5868')}}</span>
                                        <Input disabled v-model="items.jsonData.policyList.find(v=>v.type=='relief').exemptionPrice" style="width: 100px" @on-blur="setDiscount(items,indexs)" />
                                    </div>
                                    <div class="nc-2">
                                        <span>{{$t('modules_spoc_sign_web_src_views_contractgeneration_component_contractinfo_5235')}}</span>
                                        <Input disabled v-model="items.leaveNum" style="width: 100px" @on-blur="setleaveNum(items,indexs)" />
                                    </div>
                                    <div class="nc-4">
                                        <div>
                                            <span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_lookinfo_5039')}}</span>
                                            <span>{{ number_format(items.endCostPrice, 2, '.', ',')}} {{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</span>
                                        </div>
                                        <div>
                                            <span>{{$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_takecourse_5872')}}</span>
                                            <span>{{ number_format(kckSale(items), 2, '.', ',')}} {{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</span>
                                        </div>
                                        <div>
                                            <span>{{$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_takecourse_5873')}}</span>
                                            <span>{{ number_format(items.endPublicPrice, 2, '.', ',')}} {{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</span>
                                        </div>
                                    </div>
                                    <div v-show="items.ifDiscount" class="nc-5">
                                        <span>{{$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_takecourse_5874')}}</span>
                                        <Input v-model="items.discount" :disabled="true" style="width: 60px;" @on-blur="discountChange(items,indexs,$event)" />
                                        <span>{{$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_takecourse_5875')}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="cp-course-item-b">
                            <div class="left">
                                <span>{{$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_takecourse_5876')}}</span>
                                <span class="money">{{number_format(residue, 2, '.', ',')}}</span>
                                <span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</span>
                            </div>
                            <div class="right">
                                <span>{{$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_takecourse_5878')}}</span>
                                <span>{{ncList.length}}</span>
                                <span>{{$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_takecourse_5879')}}</span>
                                <span class="money">{{number_format(carryforward, 2, '.', ',')}}</span>
                                <span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</span>
                            </div>
                        </div>
                    </div>
                </Form>
                <div class="cp-counts">
                	<div class="cp-counts-right">
                		<h2>{{$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_takecourse_5880')}}</h2>
                        <Row>
                            <Col span="11">
                                <div class="counts-item">
                                	<span>{{$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_takecourse_5881')}}</span>
                                	<span>
                                        <span class="money">{{number_format(carryforward, 2, '.', ',')}}</span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</span>
                                </div>
                            </Col>
                            <Col span="11" push="2">
                                <div class="counts-item">
                                	<span>{{$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_takecourse_5882')}}<Poptip placement="bottom" min-width="220" :transfer="true">
                                            <Icon size="12" style="cursor: pointer;margin-left:-10px;" color="#999" type="ios-help-circle-outline" />
                                            <div slot="content">
                                                <p>{{$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_takecourse_5883')}}</p>
                                                <p>{{$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_takecourse_5884')}}</p>
                                            </div>
                                        </Poptip>
                                    </span>
                                	<span>
                                        <span class="money">{{number_format(residue, 2, '.', ',')}}</span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</span>
                                </div>
                            </Col>
                        </Row>

                		<Row>
                		    <Col span="11">
                                <div class="counts-item">
                                	<span>{{$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_takecourse_5885')}}</span>
                                	<span>
                                        <span class="money">{{number_format(rollOut-residue, 2, '.', ',')}}</span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</span>
                                </div>
                            </Col>
                		    <Col span="11" push="2">
                                <div class="counts-item">
                                	<span>{{$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_takecourse_5886')}}</span>
                                	<span>
                                        <!-- <span class="money">{{number_format(carryforward-(rollOut-residue), 2, '.', ',')}}</span> -->

                                	<span class="money">{{number_format(carryforward-(rollOut-residue), 2, '.', ',')}}</span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</span>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                		    <Col span="11">
                                <div class="counts-item">
                                	<span>合同模板：</span>
                                    <span>{{inCtTplName}}</span>
                                </div>
                            </Col>
                        </Row>
                	</div>
                </div>
            </div>
    </div>
</template>

<script>
import valid, { errors, htContract, common, htTranslateApply, sysDict, sysUser } from '../../../libs/request';
import CommonIcon from '_c/common-icon';
import { mapMutations, mapState } from 'vuex';
export default {
    props: {},
    data() {
        return {
            inCtTplName: '',
            takeCourse: false,
            turnCenterId: '',
            // rollOut: '',
            type: '1',
            columns: [
                {
                    title: this.$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_takecourse_5889'),
                    align: 'center',
					resizable: true,
					width: null,
                    children: [
                        {
                            title: this.$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_takecourse_5890'),
                            key: 'courseName',
							resizable: true,
							width: null,
                        },
                        {
                            title: this.$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_takecourse_5891'),
                            key: 'outCourseHour',
							resizable: true,
							width: null,
                        },
                        {
                            title: this.$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_5011'),
                            key: 'courseUnitPrice',
							resizable: true,
							width: null,
                            render: (h, params) => {
                                return h('div', this.number_format(params.row.courseUnitPrice, 2, '.', ','));
                            }
                        },
                        {
                            title: this.$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_takecourse_5893'),
                            key: 'outCoursePrice',
							resizable: true,
							width: null,
                            render: (h, params) => {
                                return h('div', this.number_format(params.row.outCoursePrice, 2, '.', ','));
                            }
                        }
                    ]
                }
            ],
            tableData: [],
            formItem: {
                inSellerId: ''
            },
            roleList: [],
            officeIds: '',
            kcbId:'',
            kcbLoading:false,
            kcbOptions:[],
            gradeId:'',
            gradeList:[],
            packageCoursesName:'',
            courseTableCol: [{
            		title: this.$t('views_coursepack_bigtableexample_319'),
            		key: 'name',
            		minWidth: 70,
					resizable: true,
					width: null,
            	},
            	{
            		title: this.$t('views_coursepack_coursepackgroup_465'),
            		key: 'course',
            		minWidth: 70,
					resizable: true,
					width: null,
            		render: (h, params) => {
            			return h('div', params.row.htItemList.length);
            		}
            	},
            	{
            		title: this.$t('modules_spoc_sign_web_src_views_contracttransfercenter_components_takecourse_5896'),
            		key: 'publicPrice',
            		minWidth: 70,
					resizable: true,
					width: null,
            		render: (h, params) => {
            			return h('div', Number(params.row.htItemSubList[0].publicPrice).toFixed(2));
            		}
            	},
            	{
            		title: this.$t('classlist_compontents_detailinfo_45'),
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
            					this.$t('spoc_hootie_web_282')
            				)
            			]);
            		}
            	}
            ],
            courseTableData:[],
            ncList:[],
            zkyhSearch:'',
            inRemainPrice:''
        };
    },
    computed: {
        rollOut() {
            let num = 0;
            this.tableData.forEach(v => {
                if(Number(v.outCourseHour)==Number(v.leftCourseHour)){
                    num += Number(v.leftCoursePrice);
                }else{
                    num += v.outCourseHour * v.courseUnitPrice;
                }
            });
            return num;
        },
        residue() {
        	let num = this.rollOut;
        	this.ncList.forEach(v => {
                num = Number(this.floatSub(num , (v.deduction || 0)))
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
        // this.getListDataByRole();
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        editInfo(id) {
            htTranslateApply
                .form({
                    id
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let data = res.data.data;
                        this.turnCenterId = data.id;
                        this.rollOut = data.outCoursePublicUnitPrices;
                        this.ncList = data.inJson||[];
                        this.type = data.type;
                        this.tableData = data.outJson;
                        this.officeIds = data.inOfficeId;
                        this.inCtTplName = data.inCtTplName;
                        this.inRemainPrice=data.inRemainPrice;
                        this.getListDataByRole();
                        this.findChildDictByParentDict();
                        this.getListData();
                        this.$emit('openModal')
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
        },
        getListData() {
        	this.kcbLoading = true;
        	htContract
        		.findItemListData({
        			officeId: this.officeIds
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
        getListDataByRole() {
            let params = {
                roleIds: '4,8',
                pageSize: '10',
                officeIds: this.officeIds
            };
            sysUser
                .listDataByRole(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.roleList = res.data.data;
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
        show(id) {
            this.takeCourse = true;
            if (id) {
                this.turnCenterId = id;
                this.editInfo(id);
            }
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
                            v.jsonData={
                                policyList:[]
                            }
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
        getKcbInfo(item) {
            if(item.htItemSubList.length) {
                return(
                    this.number_format(item.htItemSubList[0].costPrice, 2, '.', ',') +
                    this.$t('modules_spoc_sign_web_src_views_contractgeneration_component_vitemcard_5477') +
                    this.number_format(item.htItemSubList[0].num, 0, '', '') +
                    this.$t('modules_spoc_sign_web_src_views_contractgeneration_component_vitemcard_5478') +
                    this.number_format(item.htItemSubList[0].publicPrice, 2, '.', ',') +
                    this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')
                );
            } else {
                return '';
            }
        },
        courseTableHide() {
        	this.gradeId = '';
        	this.packageCoursesName = '';
        	this.$refs.gradeSel.clearSingleSelect();
        },
        courseSearch() {
        	let arr = [];
        	this.zhkcbList.forEach(v => {
        		if((v.name.indexOf(this.packageCoursesName) != -1 || !this.packageCoursesName) && (v.gradeVal == this.gradeId || !this.gradeId)) {
        			arr.push(v);
        		}
        	})
        	this.courseTableData = arr;
        },
        schoolHour(item, indexs) {
        	item.ifDiscount = !item.ifDiscount;
        	this.setDeduction(item, indexs);
        },
        delItem(index, row) {
            if(row.kId) {
                let arr = this.ncList.filter(v => v.kId != row.kId);
                this.ncList = arr;
            } else {
                this.ncList.splice(index, 1);
            }
        },
        endNumChange(item, e, indexs) {
            let num = e.target.value;
            item.num = num;
            item.jsonData.policyList = [];
            item.policyIds = [];
            item.publicPrice = num * item.costPrice;
            this.setDiscount(item, indexs);
        },
        endCostPriceChange(item, e, indexs) {
            let num = e.target.value;
            item.jsonData.policyList = [];
            item.policyIds = [];
            item.publicPrice = num * item.endNum;
            this.setDiscount(item, indexs);

        },
        endPublicPriceChange(item, e, indexs) {
            let num = e.target.value;
            item.jsonData.policyList = [];
            item.policyIds = [];
            item.costPrice = num / item.endNum;
            item.publicPrice = num;
            this.setDiscount(item, indexs);

        },
        tags_boxShow(items, ind) {
        	let obj = items;
        	obj.visible = !items.visible;
        	this.$set(this.ncList, ind, obj)
        },
        closeTag(item, ind, id, indexs) {
            let index = item.policyIds.indexOf(id)
            item.policyIds.splice(index, 1);
            item.jsonData.policyList.splice(ind, 1);
            if(!item.jsonData.policyList.find(oitem => oitem.type == 'relief')) {
                item.policyList.find(v=>v.type=='relief').exemptionPrice = '';
            }
            this.$set(this.ncList, indexs, item)
            this.setDiscount(item, indexs);
            // this.conce ssions(o);
        },
        policyChange(items, ind, e) {
            if(items.jsonData.policyList.length > 2) {
                return;
            }
            items.policyItemList.forEach(v => {
                if(v.id == e) {
                    let index = items.jsonData.policyList.findIndex(v => v.id == e);
                    if(v.type != 'discount' && index != -1) {
                        let index1 = items.policyIds.indexOf(e);
                        items.jsonData.policyList.splice(index, 1);
                        items.policyIds.splice(index1, 1);
                    } else {
                        items.jsonData.policyList.push(v);
                        items.policyIds.push(e);
                    }
                }
            })
            this.tags_boxHide(items, ind);
            this.setDiscount(items, ind);
            this.zkyhSearch = '';
        },
        tags_boxHide(items, ind) {
        	let obj = items;
        	obj.visible = false;
        	this.$set(this.ncList, ind, obj)
        },
        setDiscount(o, indexs) {
            let privilege = o.jsonData.policyList.sort((a, b) => {
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
                    coursePrice -= o.jsonData.policyList.find(v=>v.type=='relief').exemptionPrice;
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
            let privilege = item.jsonData.policyList.sort((a, b) => {
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
                    coursePrice -= item.jsonData.policyList.find(v=>v.type=='relief').exemptionPrice;
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
        kckSale(items) {
        	return items.publicPrice - items.endPublicPrice;
        },
        setDeduction(item, indexs) {
            item.discountDisabled = false;
            item.deduction = 0;
            let num = null;
            if(item.ifDiscount) {
                num = (this.residue / item.endCostPrice);
            } else {
                num = 0;
                let privilege = item.jsonData.policyList.sort((a, b) => {
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
                        coursePrice -= item.jsonData.policyList.find(v=>v.type=='relief').exemptionPrice;
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
                    v.jsonData={
                        policyList:[]
                    }
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
        cancel() {
            this.takeCourse = false;
            this.$emit('cancel');
        },
        submit() {
            this.updateLoadingStatus({
                isLoading: true
            });
            let params = {
                "id": this.turnCenterId,
                "inSellerId": this.formItem.inSellerId,
                "inJson": [],
                "inPublicTotalPrice": 0,
                "inSignPrice": this.carryforward,
                "inRemainPrice": this.balance>=0?this.balance:0,
                "inPayPrice": this.balance>=0?0:(-1*this.balance)
            }
            let inJson = [];
            let inCourseNames = [];
            let inTotalPrice = 0;
            let discountRemarks=[];
            this.ncList.forEach((v, k) => {
					inCourseNames.push(v.name);
					inTotalPrice += v.publicPrice * 1;
					let obj = Object.assign({},v);
                    obj.discountPrice= this.kckSale(v);
                    delete obj.policyItemList;
                // let obj = {
                //     coursePackId: v.packId,
                //     coursePackPriceId: v.packPriceId,
                //     courseId: v.id,
                //     coursePriceId: v.htItemSubList[0].id,
                //     courseType: v.type,
                //     courseName: v.name,
                //     publicUnitPrice: v.costPrice,
                //     publicHour: v.num,
                //     publicPrice: v.publicPrice,
                //     courseUnitPrice: v.endCostPrice,
                //     courseHour: v.endNum,
                //     coursePrice: v.endPublicPrice,
                //     discountPrice: this.kckSale(v),
                //     leaveNum: v.leaveNum,
                //     yhzcList: []
                // };
                // v.policyItemList.forEach(val => {
                //     let obj1 = {
                //         itemId: val.id,
                //         itemName: val.name,
                //         exemptionPrice: val.type == 'relief' ? v.derate : ''
                //     };
                //     obj.yhzcList.push(obj1);
                // });
                // if (k == 0) {
                //     obj.ncList = this.ncList;
                // }
                    obj.jsonData.policyList.forEach(val=>{
                        delete val.htItemSettings;
                        if(val.type=='relief'){

                        }
                        let str=val.name+(val.type=='relief'?(val.exemptionPrice||0)+this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617'):'');
                        discountRemarks.push(str)
                    })
                inJson.push(obj);
            });
            params.discountRemarks=discountRemarks.join('、');
            params.inJson = inJson;
            params.inCourseNames = inCourseNames.join(',');
            params.inTotalPrice = inTotalPrice;
            htTranslateApply
                .optionCourse(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.takeCourse = false;
                        this.$Message.success(res.data.message);
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
        number_format(number, decimals, dec_point, thousands_sep) {
            /*
             * 参数说明：
             * number：要格式化的数字
             * decimals：保留几位小数
             * dec_point：小数点符号
             * thousands_sep：千分位符号
             * */
            number = (number + '').replace(/[^0-9+-Ee.]/g, '');
            var n = !isFinite(+number) ? 0 : +number,
                prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
                sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep,
                dec = typeof dec_point === 'undefined' ? '.' : dec_point,
                s = '',
                toFixedFix = function(n, prec) {
                    var k = Math.pow(10, prec);
                    return '' + Math.round(n * k) / k;
                };

            s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
            var re = /(-?\d+)(\d{3})/;
            while (re.test(s[0])) {
                s[0] = s[0].replace(re, '$1' + sep + '$2');
            }

            if ((s[1] || '').length < prec) {
                s[1] = s[1] || '';
                s[1] += new Array(prec - s[1].length + 1).join('0');
            }
            return s.join(dec);
        },
        
        //减
         floatSub(arg1,arg2){
             var r1,r2,m,n;
             try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
             try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
             m=Math.pow(10,Math.max(r1,r2));
             //动态控制精度长度
             n=(r1>=r2)?r1:r2;
             return ((arg1*m-arg2*m)/m).toFixed(n);
        },
    }
};
</script>
