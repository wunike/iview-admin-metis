<style lang="less">
.pact {
    width: 100%;
    padding: 0px !important;
    .filter {
        // font-size: 14px;
        border-radius: 4px;
        li {
            list-style: none;
            margin-bottom: 5px;
            .analyseBarFilter .titleBar span:first-child {
                margin-right: 7px !important;
                width: 80px;
            }
        }
    }
    .compact_main {
        width: 100%;
        padding: 16px 32px;
        margin-top: 10px;
        position: relative;
        overflow: visible;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        background: #ffffff;
        dl {
            dt {
                .card {
                    width: 226px;
                    height: 118px;
                    display: inline-block;
                    position: relative;
                    margin: 10px;
                    background: url(../../../assets/library/cardBg.png) no-repeat 166px 62px;
                    border-radius: 5px;
                    &.violet {
                        background-color: #7583df;
                    }
                    &.blue {
                        background-color: #428fdf;
                    }
                    &.orange {
                        background-color: #e6892a;
                    }
                    &.green {
                        background-color: #4ec289;
                    }
                    &.pink {
                        background-color: #ec4763;
                    }
                    .ivu-card-body {
                        background-color: initial;
                        .card-cont {
                            width: 150px;
                            height: 66px;
                            line-height: 1.5em;
                            position: relative;
                            opacity: 1;
                            padding: 4px 0px 0px 4px;
                            font-size: 14px;
                            color: #fff;
                            display: -webkit-box;
                            overflow: hidden;
                            background-color: inherit;
                            &.violet {
                                background-color: #7583df;
                            }
                            &.blue {
                                background-color: #428fdf;
                            }
                            &.orange {
                                background-color: #e6892a;
                            }
                            &.green {
                                background-color: #4ec289;
                            }
                            &.pink {
                                background-color: #ec4763;
                            }
                            &::after {
                                content: '...';
                                font-weight: bold;
                                position: absolute;
                                bottom: 0;
                                right: 0;
                                padding-right: 4px;
                                background-color: inherit;
                            }
                            .card-tit {
                                margin-bottom: 12px;
                            }
                        }
                    }
                    .card-shade {
                        display: none;
                        position: absolute;
                        top: 0;
                        left: 0;
                        border-radius: 5px;
                        width: 226px;
                        height: 118px;
                        background: rgba(0, 0, 0, 0.6);
                        line-height: 118px;
                        text-align: center;
                        .btn-box {
                            padding: 0 5px;
                            height: 100%;
                            text-align: center;
                            button {
                                padding: 4px 7px;
                                height: 35px;
                                margin-right: 5px;
                            }
                        }
                        .btn-box1 {
                            line-height: 118px;
                            text-align: center;
                            button {
                                margin: 0 2px;
                            }
                        }
                        button {
                            font-size: 16px;
                            span {
                                vertical-align: middle;
                            }
                            &.create-compact {
                                width: 114px;
                            }
                        }
                    }
                    &:hover .card-shade-active {
                        display: block;
                    }
                }
            }
            dd {
                padding-left: 24px;
                span {
                    color: #44bcb7;
                    &.red {
                        color: #ff0000;
                    }
                }
            }
        }
        .add {
            width: 100%;
            // position: absolute;
            // top: 0px;
            // left: 0;
            line-height: 42px;
            text-align: left;
            .coad-num {
                padding: 0 0px;
                font-size: 14px;
                a {
                    font-weight: normal;
                    font-size: 18px;
                    cursor: default;
                }
            }
            button {
                float: right;
                margin-right: 10px;
            }
        }
        .page-box {
            display: flex;
            justify-content: center;
            margin-top: 20px;
            width: 100%;
        }
    }
}

.modal-add {
    .ivu-modal-body {
        padding-bottom: 0px;
    }
    .formModal {
        .analyseBarFilter .titleBar span:first-child {
            display: inline-block;
            text-align: right;
            color: #495060;
        }
        // padding: 10px 14px 10px 0px;
        overflow: auto;
        .width330 {
            width: 330px;
        }
        .width380 {
            width: 380px;
        }
        .width306 {
            width: 306px;
        }
        .widthMax {
            width: 100%;
        }
        .ivu-form-item {
            .ivu-input {
                background: #fff;
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
                background: #fff;
            }
        }
        .langlabel {
            .ivu-form-item-label {
                padding: 5px 12px 0 0px;
            }
        }
        .logoBox {
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
            label {
                line-height: 70px;
            }
            .uploadBox {
                position: relative;
                padding: 5px 0px;
                .tips {
                    color: #999899;
                    font-size: 12px;
                    margin-top: 10px;
                }
                .inline {
                    display: inline-block;
                }
                .error_tips {
                    top: 85%;
                }
            }
        }
        .logo {
            .ivu-form .logoBox .uploadBox .tips {
                line-height: 1em;
                margin-top: 20px;
            }
            .ivu-form-item-content {
                line-height: 1em;
            }
        }
        .limit {
            margin-top: 14px;
            span {
                color: #999999;
            }
        }
        .fileName {
            position: relative;
            display: inline-block;
            span {
                /* position: absolute;
					bottom: -18px;
					right: 12px;
					line-height: 32px; */
                margin-left: 20px;
                color: red;
                cursor: pointer;
            }
        }
        .fileName:hover {
            span {
                display: inline-block;
            }
        }
    }
}

.del-modal {
    .tit {
        color: #222222;
    }
    .cont {
        font-size: 18px;
        height: 190px;
        padding-top: 34px;
        text-align: center;
        .name {
            color: #e8352c;
        }
        .button {
            margin-top: 45px;
            button {
                width: 122px;
                height: 34px;
            }
        }
    }
    .ivu-modal-footer {
        display: none;
    }
}
/*.tally-modal {
		.filter {
			font-size: 14px;
			li {
				margin-bottom: 10px;
			}
			.country {}
		}
	}*/

.modal-policy {
    .ivu-modal-footer {
        border: none;
    }
    .title {
        height: 40px;
        background-color: #fafafa;
        border-bottom: solid 1px #e0e0e0;
        font-size: 16px;
        text-align: center;
        line-height: 40px;
    }
    .policy-content {
        display: flex;
        justify-content: space-between;
        .right,
        .center,
        .left {
            width: 246px;
            height: 248px;
            border: solid 1px #e0e0e0;
            position: relative;
            .btn {
                width: 100%;
                padding: 8px;
                position: absolute;
                bottom: 0;
                text-align: right;
            }
        }
        .right_contnet {
            padding: 8px 0;
            position: absolute;
            top: 40px;
            bottom: 32px;
            overflow: auto;
            text-align: center;
            button {
                width: 106px;
                margin: 6px;
            }
        }
        .left_content {
            padding: 8px 0;
            text-align: center;
            position: absolute;
            top: 40px;
            bottom: 32px;
        }
    }
}
</style>

<template>
    <div class="pact">
        <!-- <v-select style="width: 396px;margin: 15px 0;" :placeholder="$t('modules_spoc_sign_web_src_views_library_pact_pact_6580')" icon="search" v-model="compact" k='cnname' :datafunc="searchDropList" @on-enter="textChange" @on-click="textChange" @selected="textChange">
		</v-select> -->
        <!-- <ul class="filter">
			<li v-for="(item,index) in pactTags" :key="index">
				<v-search-options multiple :data="item.children" byKey="title" :parentId="item.id" :searchTitle="item.title" labelWidth="80" @on-select-item="pullTags" v-if="item.children.length"></v-search-options>
			</li>
			<li v-if="isAdmin ||isLawer||isHeaderOfficeLeader || isCeo">
				<v-search-options :data="firm.countryList" byKey="name" :searchTitle="firm.searchName" @on-select-item="firmChange" labelWidth="80" v-if="firm.countryList.length"></v-search-options>
			</li>
			<li v-if="false">
				<case-bar-filter :from="2" menuId="201" @tagListChange="tagListChange" :modelName="$t('sign.index')" align="right" :width="70">
				</case-bar-filter>
			</li>
		</ul> -->
        <div class="filter">
            <vSearchCollapse @search="textChange" @reset="resetSearch">
                <Select :placeholder="$t('courselist_courselist_225')" v-model="companyIds" clearable style="width:200px;margin-right:12px;">
                    <Option v-for="item in firm.countryList" :value="item.id" :key="item.id">{{ item.code }}{{ item.name }}</Option>
                </Select>
                <Input v-model="compact" :placeholder="$t('modules_spoc_sign_web_src_views_contractmanage_contractmanage_5667')" style="width: 140px;margin-right:12px;" />
            </vSearchCollapse>
        </div>
        <div class="compact_main">
            <p class="add">
                <span class="coad-num">{{$t('modules_spoc_sign_web_src_views_library_pact_pact_6584')}}<a>&nbsp;{{ count }}&nbsp;</a>{{$t('modules_spoc_crm_web_src_views_marketcharts_marketchartsoptionsfor1_1349')}}</span>
                <Button type="primary" v-if="myButtonPrem.indexOf('edit') >= 0" @click="pactSaveFjxy">{{$t('pactSaveFjxy')}}</Button>
                <Button type="primary" v-if="myButtonPrem.indexOf('edit') >= 0" @click="redact($t('modules_spoc_sign_web_src_views_library_pact_pact_6586'))">{{$t('modules_spoc_sign_web_src_views_library_pact_pact_6586')}}</Button>
                <!-- <btnlist :btn="btnItem">
					<span slot='url' style="margin-left: 12px;">{{$t('modules_spoc_sign_web_src_views_library_pact_pact_6587')}}</span>
				</btnlist> -->
            </p>
            <dl v-for="(item, index) in cardList" :key="index">
                <dt>
                    <Card class="card" :style="{ backgroundColor: item.color }">
                        <div class="card-cont">
                            <p class="card-tit">{{ item.type }}</p>
                            <p class="card-name">{{ item.name }}</p>
                        </div>
                        <div class="card-shade card-shade-active">
                            <div class="btn-box">
                                <Button type="primary" v-if="myButtonPrem.indexOf('edit') >= 0" size="large" shape="circle" @click="redact($t('modules_spoc_sign_web_src_views_library_pact_pact_6588'), item.id)">{{$t('classroom_allscore_51')}}</Button>
                                <Button type="primary" v-if="myButtonPrem.indexOf('delete') >= 0" size="large" shape="circle" @click="del(item.id, item.name)">{{$t('classlist_compontents_detailinfo_46')}}</Button>
                                <Button type="primary" v-if="isXQPass(item.companyIds)" size="large" shape="circle" @click="gotoCreate(item)">{{$t('modules_spoc_sign_web_src_views_library_pact_pact_6592')}}</Button>
                                <Button type="primary" size="large" shape="circle" @click="preview(item.id)">{{$t('modules_spoc_core_web_src_views_tasktemplate_index_413')}}</Button>
                            </div>
                        </div>
                    </Card>
                </dt>
                <dd v-if="isAdmin || isLawer || isHeaderOfficeLeader">
                    <p>{{$t('modules_spoc_sign_web_src_views_library_pact_pact_6593')}}<a style="cursor: default;">&nbsp;{{ item.generatingCount }}&nbsp;</a>{{$t('modules_spoc_sign_web_src_views_library_pact_pact_6594')}}<a style="cursor: default;">{{ item.signCount }}</a>{{$t('modules_spoc_sign_web_src_views_library_pact_pact_6595')}}</p>
                    <p>{{$t('modules_spoc_sign_web_src_views_library_pact_pact_6596')}}<span class="red">
                            &nbsp;
                            <b v-text="!!item.priceSum ? parseFloat((Number(item.priceSum) / 1e4).toFixed(4)) : 0"></b>
                            &nbsp;
                        </span>{{$t('modules_spoc_crm_web_src_views_performanceplan_modal_1482')}}</p>
                </dd>
            </dl>
            <div class="page-box" v-show="count > 10">
                <div style="margin: auto;display: inline-block;">
                    <Page
                        :total="count"
                        :page-size="20"
                        :current="1"
                        show-total
                        :show-sizer="count > 10"
                        show-elevator
                        @on-change="pageChange"
                        @on-page-size-change="sizeChange"
                    ></Page>
                </div>
            </div>
        </div>
        <Modal ref="addModal" v-model="addModal" :title="compactTit" width="600" class="modal-add" @on-ok="rulesSubmit('formModal')" @on-cancel="clearForm" :mask-closable="false">
            <div>
                <Form ref="formModal" :model="formModal" :rules="ruleModal" :label-width="170" class="formModal">
                    <FormItem :label="$t('modules_spoc_sign_web_src_modules_pactcard_4830')" prop="name" class="widthMax fl"><Input v-model="formModal.name" placeholder="" type="text" class="width306" /></FormItem>
                    <FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_components_signlists_869')" prop="price" class="widthMax fl" v-show="false">
                        <Input v-model="formModal.price" type="text" class="width306" />{{$t('modules_spoc_sign_web_src_views_library_pact_pact_6600')}}</FormItem>
                    <FormItem :label="$t('modules_spoc_sign_web_src_views_discount_discountnew_6286')" required prop="companyIds" class="fr widthMax">
                        <Select multiple v-model="companyId" class="width306" @on-change="companyIdStr">
                            <Option v-for="item in account" :value="item.id" :key="item.id" :disabled="disable.indexOf(item.id) > -1 ? true : false">
                                {{ item.name }} - {{ item.accountName }}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem :label="$t('modules_spoc_sign_web_src_views_library_pact_pact_6602')" prop="htTagList" required class="fl " v-if="false">
                        <tag-module
                            :hasSelected="tally"
                            :modelName="$t('sign.index')"
                            pid="201"
                            title=""
                            isPact
                            @getTagName="tallyOk"
                            style="display: inline-block;"
                            :style1="{
                                color: '#b8b8b8',
                                display: 'inline-block',
                                textAlign: 'right',
                                width: '0px'
                            }"
                        ></tag-module>
                    </FormItem>
                    <Form-item :label="$t('modules_spoc_sign_web_src_views_library_pact_pact_6603')" prop="contentFile" class="widthMax fl">
                        <div class="infoList logoBox clearfix">
                            <div>
                                <p class="fileName" v-show="formModal.attachments && formModal.attachments.length" v-for="(item, index) in formModal.attachments" :key="index">
                                    <a href="javascript:void(0)" v-text="item.submittedFileName ? item.submittedFileName : ''"></a>
                                    <span @click="delFile(item.id)">{{$t('classlist_compontents_detailinfo_46')}}</span>
                                </p>
                                <p style="" v-show="!(formModal.attachments && formModal.attachments.length)">{{$t('modules_spoc_sign_web_src_views_library_pact_pact_6604')}}</p>
                            </div>
                            <div class="uploadBox">
                                <i-input v-model="formModal.contentFile" v-show="false"></i-input>
                                <!-- <Upload
                                    ref="upload"
                                    name="files"
                                    :data="uploadDate"
                                    :show-upload-list="false"
                                    :format="['docx']"
                                    :action="uploadFile"
                                    :on-success="handleSuccess"
                                    :on-error="isLoadingFalse"
                                    :on-progress="beforeUpload"
                                    :on-format-error="handleFormatError"
                                    :on-exceeded-size="handleMaxSize"
                                    :max-size="20480"
                                >
                                    <Button style="height:32px;line-height: 18px;">
                                        <i class="iconfont icon-Groupfuzhi"></i>
                                        {{ formModal.attachments.length ? $t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1850') : $t('modules_spoc_core_web_src_views_announcement_addannouncement_63') }}
                                    </Button>
                                </Upload> -->
                                <Upload
                                    ref="upload"
                                    name="file"
                                    :data="uploadData"
                                    :headers="headers"
                                    :show-upload-list="false"
                                    :format="['docx']"
                                    :action="imgAction"
                                    :on-success="handleSuccess"
                                    :on-error="isLoadingFalse"
                                    :on-progress="beforeUpload"
                                    :on-format-error="handleFormatError"
                                    :on-exceeded-size="handleMaxSize"
                                    :max-size="20480">
                                    <Button style="height:32px;line-height: 18px;">
                                        <i class="iconfont icon-Groupfuzhi"></i>
                                         {{ formModal.attachments.length ? $t('modules_spoc_crm_web_src_views_taskcenter_taskdetailmodal_1850') : $t('modules_spoc_core_web_src_views_announcement_addannouncement_63') }}
                                    </Button>
                                </Upload>
                                <p style="color:rgba(0,0,0,0.45);font-size:12px;line-height:12px;padding-top:10px;">{{$t('modules_spoc_sign_web_src_views_library_pact_pact_6607')}}</p>
                            </div>
                        </div>
                    </Form-item>
                    <Form-item :label="$t('modules_spoc_sign_web_src_views_library_pact_pact_6608')" prop="color" class="logo fl"><ColorPicker v-model="formModal.color" recommend /></Form-item>
                    <Form-item :label="$t('modules_spoc_sign_web_src_views_library_pact_pact_6609')" prop="limitScope" class="logo fl widthMax" v-show="false">
                        <div style="line-height: 32px;">
                            <RadioGroup v-model="formModal.isLimitScope" @on-change="peopleChoose(formModal.isLimitScope)">
                                <Radio label="1">{{$t('modules_leftremenu_92')}}</Radio>
                                <Radio label="0">{{$t('modules_leftremenu_93')}}</Radio>
                            </RadioGroup>
                        </div>
                    </Form-item>
                    <Form-item :label="$t('modules_spoc_sign_web_src_views_library_pact_pact_6612')" prop="isAudit" class="logo fl widthMax">
                        <div style="line-height: 32px;">
                            <RadioGroup v-model="formModal.isAudit">
                                <Radio label="1">{{$t('modules_leftremenu_92')}}</Radio>
                                <Radio label="0">{{$t('modules_leftremenu_93')}}</Radio>
                            </RadioGroup>
                        </div>
                    </Form-item>
                    <Form-item :label="$t('modules_spoc_sign_web_src_views_library_pact_pact_6613')" prop="isPolicy" class="logo fl widthMax" v-show="false">
                        <div style="line-height: 32px;">
                            <RadioGroup v-model="formModal.isPolicy" @on-change="addDiscountsMoadl(formModal.isPolicy)">
                                <Radio label="1">{{$t('modules_leftremenu_92')}}</Radio>
                                <Radio label="0">{{$t('modules_leftremenu_93')}}</Radio>
                            </RadioGroup>
                        </div>
                    </Form-item>
                </Form>
            </div>
        </Modal>
        <!-- <Modal v-model="delModal" width="740" class-name="del-modal">
            <p slot="header" class="tit"><span>{{$t('modules_spoc_sign_web_src_views_library_pact_pact_6614')}}</span></p>
            <div class="cont">
                <p>{{$t('modules_spoc_sign_web_src_views_category_category_5132')}}<span class="name">&nbsp;{{ selectCard }}&nbsp;</span>{{$t('pushsettings_23')}}</p>
                <div class="button">
                    <Button type="error" size="large" @click="delCard">{{$t('classroom_allscore_54')}}</Button>
                    <Button size="large" @click="offModal">{{$t('classroom_allscore_53')}}</Button>
                </div>
            </div>
        </Modal> -->
        <!--<Modal v-model="tallyModal" width="730" class-name="tally-modal" @on-ok="tallyOk" @on-cancel="tallyClose">
			<p slot="header" class="tit">
				<span>{{$t('modules_spoc_sign_web_src_views_library_pact_pact_6619')}}</span>
			</p>
			<div>
				<ul class="filter">
					<li v-for="(item,index) in pactTags">
						<v-search-options multiple :toSelect="tally" :data="item.children" byKey="title" :parentId="item.id" :searchTitle="item.title" labelWidth="80" @on-select-item="pullTally"></v-search-options>
					</li>
				</ul>
			</div>
		</Modal>-->
        <Modal width="750" class-name="modal-policy" :title="$t('modules_spoc_sign_web_src_views_category_category_5137')" v-model="showAddDiscounts" @on-ok="addDiscounts" @on-cancel="offDiscounts">
            <div class="policy-content">
                <div class="right">
                    <div class="title">{{$t('modules_spoc_sign_web_src_views_category_category_5138')}}</div>
                    <div class="right_contnet">
                        <Button
                            :type="btnActiveIndex.indexOf(item.id) != -1 ? 'primary' : 'default'"
                            v-for="(item, index) in policyList"
                            :key="index"
                            @click="showDiscountItem(item.id)"
                        >
                            {{ item.name }}
                        </Button>
                    </div>
                </div>
                <div class="center">
                    <div class="title">{{$t('modules_spoc_sign_web_src_views_category_category_5139')}}</div>
                    <div class="left_content">
                        <CheckboxGroup v-model="checkAllGroup">
                            <Checkbox
                                :label="item.id"
                                v-for="(item, index) in checkGroupList"
                                :key="index"
                                v-if="btnActiveIndex.indexOf(item.policyId) != -1 && checkedAllGroup.indexOf(item.id) == -1"
                            >
                                {{ item.name }}
                            </Checkbox>
                        </CheckboxGroup>
                    </div>
                    <div class="btn"><Button @click="addGroup">添加 ></Button></div>
                </div>
                <div class="left">
                    <div class="title">{{$t('modules_spoc_sign_web_src_views_library_pact_pact_6623')}}</div>
                    <div class="left_content">
                        <CheckboxGroup v-model="checkedGroup" @on-change="checkedGroupChange">
                            <Checkbox :label="item.id" v-for="(item, index) in checkedGroupList" :key="index">{{ item.name }}</Checkbox>
                        </CheckboxGroup>
                    </div>
                    <div class="btn"><Button @click="delGroup">{{$t('modules_spoc_sign_web_src_views_discount_componet_addzzdd_6113')}}</Button></div>
                </div>
            </div>
        </Modal>
        <role-people ref="rolepeople" :selected="formModal.limitScope" @fresh="offrole" v-if="false"></role-people>
        <scfjxy ref="scfjxy"></scfjxy>
    </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex';
import vSearchOptions from '../../../modules/vSearchOptions';
import vSelect from '../../../modules/vSelect.vue';
import rolePeople from '../../../modules/rolePeople.vue';
import caseBarFilter from '@public/modules/caseBarFilter.vue';
import tagModule from '@public/modules/tagModule.vue';
import { waitUntil, DatePickerOpt, defaultDatePickerValue } from "@public/libs/util";
import upToPan from '../../../modules/planUpToPan';
import vSearchCollapse from '@public/modules/vSearchCollapse';
import valid, { errors, common, htContractTpl, htPolicy, sysAttachment, sysOffice, sysUser, api } from '../../../libs/request.js';
import scfjxy from './scfjxy.vue';
import btnlist from './btnlist.vue';
//const route = 'sign.index'; // 签约的顶级路由
export default {
    name: 'sign.pact',
    data() {
        const validateGrade = (rule, value, callback) => {
            if (!this.formModal.accounts.length) {
                callback(new Error(this.$t('pushsettings_index_504')));
            } else {
                callback();
            }
        };
        const validateTag = (rule, value, callback) => {
            if (!this.formModal.htTagList.length) {
                callback(new Error(this.$t('pushsettings_index_504')));
            } else {
                callback();
            }
        };
        return {
            page: 1,
            pageSize: 20,
            btnItem: [
                {
                    cont: ''
                },
                {
                    cont: ''
                },
                {
                    cont: ''
                },
                {
                    cont: ''
                }
            ],
            activeId: '',
            isEdit: false,
            compact: '',
            companyIds: '',
            tags: [],
            account: [],
            compactTit: '',
            addModal: false,
            delModal: false,
            disable: [],
            selectCard: this.$t('modules_spoc_sign_web_src_views_library_pact_pact_6626'),
            count: 0,
            //				tallyModal: false,
            showAddDiscounts: false,
            checkedGroup: [],
            checkAllGroup: [],
            checkedAllGroup: [],
            checkedGroupList: [],
            policyList: [],
            checkGroupList: [],
            btnActiveIndex: [],
            companyId: [],
            formModal: {
                type: '',
                name: '',
                id: '',
                price: '',
                companyIds: '',
                contentFile: '',
                htTagList: [],
                color: '#F06292',
                accounts: [],
                limitScope: '',
                isLimitScope: 0,
                attachments: [],
                isAudit: 0,
                isPolicy: 0,
                htTplItemList: []
            },
            formModal1: {
                type: '',
                name: '',
                id: '',
                price: '',
                companyIds: '',
                htTagList: [],
                contentFile: '',
                color: '#F06292',
                accounts: [],
                limitScope: '',
                isLimitScope: 0,
                attachments: [],
                isAudit: 0,
                isPolicy: 0,
                htTplItemList: []
            },
            ruleModal: {
                companyIds: [
                    {
                        validator: validateGrade,
                        trigger: 'click'
                    }
                ],
                // htTagList: [{
                // 	validator: validateTag,
                // 	trigger: 'change'
                // }],
                name: [
                    {
                        required: true,
                        message: this.$t('pushsettings_index_504'),
                        trigger: 'blur'
                    }
                ]
                // price: [{
                // 	required: true,
                // 	pattern: /^\d+\.{0,1}\d*$/,
                // 	max: 6,
                // 	message: "必须为数字",
                // 	trigger: 'blur'
                // }, ],
            },
            tally: [],
            //				tally2: [],
            //				pactTags: [
            //					//					{sort:1,title:'国别：',children:[]},
            //					//					{sort:2,title:'产品体系：',children:[]},
            //					//					{sort:3,title:'产品类型：',children:[]},
            //					//					{sort:4,title:'申请阶段：',children:[]},
            //				],
            firm: {
                searchName: this.$t('views_coursepack_coursepack_384'),
                countryList: []
            },
            cardList: [],
            compactType: [this.$t('modules_spoc_sign_web_src_views_library_pact_pact_6628'), this.$t('modules_spoc_jw_web_src_views_chargingmanage_chargingmanagelist_2335'), this.$t('modules_spoc_report_web_src_views_generationleadsreport_index_4605'), this.$t('modules_spoc_sign_web_src_views_library_pact_pact_6631'), this.$t('modules_spoc_sign_web_src_views_library_pact_pact_6632'), this.$t('modules_spoc_sign_web_src_views_library_pact_pact_6633'), this.$t('modules_spoc_sign_web_src_views_library_pact_pact_6634')],
            imgAction: '',
            uploadData: {
                bizId: '',
                bizType: 'HT_CONTRACT_TPL',
                isSingle: true
            },
            headers:{},
            myButtonPrem: []
        };
    },
    computed: {
        ...mapGetters('sign', ['isAdmin', 'isLawer', 'isCeo', 'isHeaderOfficeLeader']),
        ...mapState(['userInfo', 'buttonPerm', 'app', 'appMenuList', "calendarConfig"]),
        uploadImg: function() {
            return sysUser.uploadImg();
        },
        uploadFile: function() {
            return sysAttachment.uploadFileUrl();
        },
        company() {
            if (this.userInfo) {
                return this.userInfo.xqIds || '';
            }
        }
    },
    components: {
        vSelect,
        vSearchOptions,
        rolePeople,
        btnlist,
        caseBarFilter,
        tagModule,
        upToPan,
        vSearchCollapse,
        scfjxy
    },
    // activated() {
    //     this.init();
    // },
    mounted() {
        this.imgAction = api.fileAttachmentUploadUrl(); // sysUser.uploadImg();
        this.headers = {
            token: localStorage.getItem('token'),
            tenant: localStorage.getItem('tenant')	
        }
        this.updateLoadingStatus({ isLoading: true });
        sysUser
        .dataScopeFilter()
        .then(valid.call(this))
        .then(res => {
            if (res.ok) {
                let data = res.data.data;
                this.firm.countryList = data;

                waitUntil(
                    () => {
                        return (this.app.currOfficeId && JSON.stringify(this.buttonPerm)!= '{}')|| false;
                    },
                    () => {
                        this.myButtonPrem = this.buttonPerm['sign.pact'] || []
                        if (this.app.currOfficeId == 'all') {
                            this.companyIds = '';
                        } else {
                            this.companyIds = this.app.currOfficeId;
                        }
                        this.init();
                    },
                    () => {
                        this.myButtonPrem = []
                        if (this.app.currOfficeId == 'all') {
                            this.companyIds = '';
                        } else {
                            this.companyIds = this.app.currOfficeId;
                        }
                        this.init();
                    },
                    50,20
                );

            } else {
                this.updateLoadingStatus({ isLoading: false });
                this.$Message.error(res.data.message);
            }
        })
        .catch(errors.call(this))
        .finally(() => {});
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        pactSaveFjxy(){
            this.$refs.scfjxy.show();
        },
        init() {
            // let params = {
            //     type: 3
            // };
            // sysOffice
            //     .officeList(params)
            //     .then(valid.call(this))
            //     .then(res => {
            //         if (res.ok) {
            //             let data = res.data.data.allCompany;
            //             data.unshift({
            //                 id: '',
            //                 name: '全部'
            //             });
            //             this.firm.countryList = data;
            //         }
            //     })
            //     .catch(errors.call(this));
            htContractTpl
                .listAccount()
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.account = res.data.data;
                    }
                })
                .catch(errors.call(this));
            let arr = [];
            this.tags.forEach((v, k) => {
                if (v.childTags.length) {
                    arr.push(v);
                }
            });
            let params1 = {
                tags: arr,
                name: this.compact,
                companyIds: this.companyIds,
                pageNo: this.page,
                pageSize: this.pageSize
            };
            htContractTpl
                .list(params1)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.count = res.data.data.total;
                        this.cardList = res.data.data.list;
                        if (this.count == 1 && this.$route.query.cusId) {
                            this.gotoCreate(this.cardList[0]);
                        }
                    }
                })
                .catch(errors.call(this));
            //				}
            //			}).catch(errors.call(this));
            htPolicy
                .list()
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.policyList = res.data.data.list;
                        let arr1 = [];
                        this.policyList.forEach((v, k) => {
                            arr1 = arr1.concat(v.htItemList);
                        });
                        this.checkGroupList = arr1;
                    }
                })
                .catch(errors.call(this)).finally(()=>{
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        isXQPass(cid) {
            let arr1 = cid.split(',');
            // let arr2 = this.company.split(',');
            let arr2 = this.firm.countryList.map((item)=>{ return item.id });
            let flag = false;
            arr1.forEach(item => {
                arr2.forEach(val => {
                    if (item == val) flag = true;
                });
            });
            return flag;
        },
        list() {
            let arr = [];
            this.tags.forEach((v, k) => {
                if (v.childTags.length) {
                    arr.push(v);
                }
            });
            let params = {
                tags: arr,
                name: this.compact,
                companyIds: this.companyIds,
                pageNo: this.page,
                pageSize: this.pageSize
            };
            htContractTpl
                .list(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.count = res.data.data.total;
                        this.cardList = res.data.data.list;
                        if (this.count == 1 && this.$route.query.cusId) {
                            this.gotoCreate(this.cardList[0]);
                        }
                    }
                })
                .catch(errors.call(this));
        },
        offrole(val) {
            let arr = val.map(item => item.id);
            this.formModal.limitScope = arr.length ? arr.join(',') : '';
            // console.log(this.formModal.limitScope)
        },
        redact(val, tit) {
            this.tally = [];
            this.addModal = true;
            this.compactTit = val;
            this.companyId = [];
            this.$refs.formModal.resetFields();
            for (let i in this.formModal) {
                for (let k in this.formModal1) {
                    if (i == k) {
                        this.formModal[i] = this.formModal1[k];
                    }
                }
            }
            if (tit) {
                this.isEdit = true;
                let params = {
                    id: tit
                };
                this.activeId = tit;
                htContractTpl
                    .form(params)
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            let list = res.data.data;
                            for (let i in this.formModal) {
                                this.formModal[i] = list[i];
                            }
                            this.formModal.attachments = this.formModal.attachments.filter(item => item.bizType == 'HT_CONTRACT_TPL');
                            let arr = [];
                            this.formModal.accounts.forEach((v, k) => {
                                arr.push(v.id);
                            });
                            this.companyId = arr;
                            this.companyIdStr();
                            //							this.tally.forEach((v, k) => {
                            let arr1 = [];
                            //								this.formModal.htTagList.forEach((val, key) => {
                            //									if(v.id == val.parentId) {
                            //										arr1.push({
                            //											id: val.id,
                            //											title: val.name
                            //										})
                            //									}
                            //								});
                            //								v.childTags = arr1;
                            //							})

                            this.formModal.htTagList.forEach((val, key) => {
                                arr1.push(val.id);
                            });
                            this.tally = arr1;
                            let limitArr = [];
                            // this.formModal.limitScope.split(',').forEach((v, k) => {
                            // 	if(v != '') {
                            // 		limitArr.push(v)
                            // 	}
                            // });
                            // this.formModal.limitScope = limitArr.join(',');
                            let GroupArr = [];
                            this.checkGroupList.forEach((v, k) => {
                                this.formModal.htTplItemList.forEach((val, key) => {
                                    //									if(v.id==val.itemId)	console.log(v.id+'|'+val.itemId)
                                    if (v.id == val.itemId) {
                                        GroupArr.push(v);
                                        this.checkAllGroup.push(v.id);
                                        this.checkedAllGroup.push(v.id);
                                    }
                                });
                            });
                            this.checkedGroupList = GroupArr;
                            this.formModal.price = parseFloat((this.formModal.price / 1e4).toFixed(4));
                        }
                    })
                    .catch(errors.call(this));
            } else {
                let arr = [];
                this.tally = arr;
                //					this.tally.forEach((v) => {
                //						v.childTags.forEach((val) => {
                //							arr.push({
                //								parentId: v.id,
                //								id: val.id,
                //								name: val.title
                //							})
                //						})
                //					});
                this.formModal.htTagList = arr;
            }
        },
        del(val, name) {
            // this.delModal = true;
            this.activeId = val;
            this.selectCard = name;
                this.$Modal.confirm({
                    title: this.$t('modules_spoc_sign_web_src_views_library_pact_pact_6614'),
                    content: this.$t('modules_spoc_sign_web_src_views_category_category_5132') + '<span style="color:red">' + name + '</span>',
                    onOk: () => {
                        this.delCard();
                    },
                    onCancel: () => {
                    }
                });
        },
        gotoCreate(item) {
            //跳转
            let query = {
                id: item.id
            };
            if (this.$route.query.cusId) {
                query.cusId = this.$route.query.cusId;
                if(this.count == 1){
                    this.$route.query.cusId = '';
                }
            }
            this.$router.push({
                name: 'sign.contractGeneration',
                query
            });
        },
        companyIdStr(val) {
            var officeId = [];
            let disable = [];
            let accounts = [];
            this.account.forEach((v, k) => {
                if (this.companyId.indexOf(v.id) > -1) {
                    officeId.push(v.officeId);
                    accounts.push(v);
                }
            });
            this.account.forEach((v, k) => {
                if (officeId.indexOf(v.officeId) > -1 && this.companyId.indexOf(v.id) == -1) {
                    disable.push(v.id);
                }
            });
            this.formModal.accounts = accounts;
            this.disable = disable;
            //				this.$refs.formModal.validateField('companyIds')
            //				this.formModal.companyIds=this.companyId.map(item=>{return item}).join(',');
        },
        preview(id) {
            //				this.$emit("jump", 'sign.preview', 0, id)

            this.$router.push({
                name: 'sign.preview',
                query: {
                    show: 0,
                    id: id
                }
            });
        },
        pageChange(val) {
            this.page = val;
            this.list();
        },
        sizeChange(val) {
            this.pageSize = val;
            this.list();
        },
        peopleChoose(item) {
            if (item == 1) {
                this.$nextTick(() => {
                    this.$refs.rolepeople.show();
                });
            }
            // console.log()
        },
        searchDropList(word) {
            return new Promise((resolve, reject) => {});
        },
        firmChange() {
            //				let arr=item.childTags.map(val=>{return val.id})
            //				this.companyIds=arr.join(',');
            // this.companyIds = item
            this.list();
        },
        //			pullTags(item) {
        //				this.tags.forEach((v) => {
        //					if(v.id == item.id) {
        //						v.childTags = item.childTags;
        //					}
        //				});
        //				this.list();
        //			},
        //			pullTally(item) {
        //				let arr = [];
        //				console.log(this.tally)
        //				this.tally.forEach((v) => {
        //					if(v.id == item.id) {
        //						v.childTags = item.childTags;
        //					}
        //				});
        //			},
        tallyOk(item) {
            if (item.length) {
                this.formModal.htTagList = item;
                this.$refs.formModal.validateField('htTagList');
            }
        },
        //			tallyClose() {
        //				this.tally = this.tally2;
        //			},
        textChange(val) {
            this.list();
        },
        delFile(val) {
            // console.log(val)
            if (val) {
                let params = {
                    'ids[]': val
                };
                api.deleteAttachment(params)
                // let params = {
                //     id: val
                // };
                
                // sysAttachment
                //     .delete(params)
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            this.formModal.attachments = [];
                            this.formModal.contentFile = '';
                        }
                    })
                    .catch(errors.call(this));
            }
        },
        // handleSuccess: function(data) {
        //     if (data.status == 'success') {
        //         this.formModal.attachments = [data.data];
        //         this.formModal.contentFile = data.data.filePath;
        //     } else {
        //         this.$Message.error(data.message);
        //     }
        //     this.updateLoadingStatus({ isLoading: false });
        // },
        handleSuccess: function(response) {
            if (response.code == '0') {
                this.formModal.attachments = [response.data];
                this.formModal.contentFile = response.data.url;
            } else {
                this.$Message.error(response.msg);
            }
            this.updateLoadingStatus({ isLoading: false });
        },
        beforeUpload: function() {
            this.updateLoadingStatus({ isLoading: true });
        },
        isLoadingFalse() {
            this.updateLoadingStatus({ isLoading: false });
        },
        handleFormatError: function() {
            this.$Message.error(this.$t('modules_spoc_sign_web_src_views_library_pact_pact_6635'));
        },
        handleMaxSize: function() {
            this.$Message.error(this.$t('spoc_hootie_web_38'));
        },
        rulesSubmit: function(name) {
            // 添加、编辑保存合同
            this.$refs[name].validate(valid1 => {
                if (valid1) {
                    // let money = (this.formModal.price * 1e4).toFixed(2);
                    // money = String(money);
                    // if(money.indexOf('.') != -1) {
                    // 	money.substring(0, money.indexOf('.'));
                    // }
                    // this.formModal.price = money;
                    let params = this.formModal;
                    // console.log(params)
                    this.updateLoadingStatus({ isLoading: true });
                    htContractTpl
                        .save(params)
                        .then(valid.call(this))
                        .then(res => {
                            if (res.ok) {
                                this.$Message.success(res.data.message);
                                this.addModal = false;
                                this.disable = [];
                                //								this.tally = this.tally2;
                                this.list();
                            } else {
                                this.$refs.addModal.visible = true;
                                this.addModal = true;
                                this.formModal.price = parseFloat((money / 1e4).toFixed(2));
                            }
                        })
                        .catch(errors.call(this)).finally(()=>{
                            this.updateLoadingStatus({ isLoading: false });
                        });
                } else {
                    this.$refs.addModal.visible = true;
                    this.addModal = true;
                }
            });
        },
        clearForm() {
            this.isEdit = false;
            this.disable = [];
        },
        delCard() {
            let params = {
                id: this.activeId
            };
            htContractTpl
                .delete(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.$Message.success(this.$t('scoretemplate_scoretemplate_571'));
                        this.list();
                    }
                })
                .catch(errors.call(this));
            this.delModal = false;
        },
        // offModal() {
        //     this.delModal = false;
        // },
        //			selectTally() {
        //				this.tallyModal = true;
        //			},
        addGroup() {
            let arr = [];
            let arr1 = [];
            this.checkGroupList.forEach((v, k) => {
                if (this.checkAllGroup.indexOf(v.id) != -1) {
                    arr.splice(0, 0, v);
                }
            });
            this.checkAllGroup.forEach((v, k) => {
                arr1.splice(0, 0, v);
            });
            this.checkedAllGroup = arr1;
            this.checkedGroupList = arr;
        },
        delGroup() {
            let arr = [];
            let arr1 = [];
            let arr2 = [];
            this.checkedGroupList.forEach((v, k) => {
                if (this.checkedGroup.indexOf(v.id) == -1) {
                    let leng = arr.length;
                    arr.splice(leng, 0, v);
                    arr1.splice(leng, 0, v.id);
                }
            });
            this.checkAllGroup.forEach((v, k) => {
                if (this.checkedGroup.indexOf(v) == -1) {
                    let leng = arr2.length;
                    arr2.splice(leng, 0, v);
                }
            });

            this.checkedGroup = [];
            this.checkedAllGroup = arr1;
            this.checkAllGroup = arr2;
            this.checkedGroupList = arr;
        },
        /*添加优惠政策*/
        addDiscounts() {
            //接口
            this.formModal.htTplItemList = this.checkedGroupList.map(item => {
                return {
                    itemId: item.id,
                    policyId: item.policyId
                };
            });
        },
        offDiscounts() {
            this.checkedGroup = [];
            this.checkedAllGroup = [];
            this.checkAllGroup = [];
            this.checkedGroupList = [];
        },
        addDiscountsMoadl(item) {
            if (item == 1) {
                this.showAddDiscounts = true;
            }
        },
        showDiscountItem(ind) {
            if (this.btnActiveIndex.indexOf(ind) != -1) {
                let index = this.btnActiveIndex.indexOf(ind);
                this.btnActiveIndex.splice(index, 1);
            } else {
                let length = this.btnActiveIndex.length;
                this.btnActiveIndex.splice(length - 1, 0, ind);
            }
        },
        checkedGroupChange() {},
        //筛选标签变化
        tagListChange(tags) {
            // console.log(tags);
            this.tags = tags;
            this.pageNo = 1;
            this.list();
        },
        resetSearch() {
            if (this.app.currOfficeId == 'all') {
                this.companyIds = '';
            } else {
                this.companyIds = this.app.currOfficeId;
            }
            this.compact = '';
            this.list();
        }
    },
    watch: {
        'app.currOfficeId': function(val, oldVal) {
            if (this.$route.name == 'sign.pact') {
                if (this.app.currOfficeId == 'all') {
                    this.companyIds = '';
                } else {
                    this.companyIds = this.app.currOfficeId;
                }
                this.list();
            }
        },
    }
};
</script>
