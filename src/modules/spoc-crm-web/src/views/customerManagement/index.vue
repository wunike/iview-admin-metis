<style lang="less">
.custom-management-container {
  .cusCode {
    position: relative;
  }
  .ivu-card-body {
    padding: 0;
  }
  .form_create {
    vertical-align: top;
    &.ivu-form-inline {
      .ivu-form-item {
        margin: 0;
        .address_map {
          .address_input {
            margin-right: 0;
          }
          button {
            margin-right: 12px;
          }
        }
      }
    }
  }
  .num_title {
    margin-top: 10px;
    .num {
      font-size: 18px;
      font-weight: 400;
      line-height: 25px;
      text-align: center;
      &.blue {
        color: #01afec;
      }
      &.yellow {
        color: #ecb62f;
      }
      &.Violet {
        color: #7c6af2;
      }
    }
    .label {
      font-size: 12px;
      font-weight: 400;
      color: rgba(73, 80, 96, 1);
      line-height: 17px;
      text-align: center;
    }
    .statistics_wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 16px 0;
      .statistics_box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        // cursor: pointer;
      }
    }
    .statistics_wrap_hover {
      &:hover {
        // background: #F7F8FA;
      }
    }
    .statistics_wrap_seleted {
      .label {
        color: #01afec;
      }
    }
  }
  .my-table {
    width: 100%;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    padding: 0 16px;

    .subTypeNameStyle {
      margin-left: 11px;
      .ivu-table-cell {
        margin-left: 11px;
      }
    }
  }
  .tabs {
    margin-top: 10px;
    background: #fff;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 16px;
  }
  .ivu-tabs-bar {
    margin-bottom: 0;
    border-radius: 4px 4px 0 0;
  }
  .borderStyle {
    display: inline-block;
    position: relative;
    &:after {
      content: '';
      display: block;
      position: absolute;
      left: 140px;
      top: 15px;
      margin: 0 1px;
      width: 10px;
      height: 2px;
      background: #e6e7eb;
    }
  }
  .highLight {
    > td {
      background-color: #ebf7ff !important;
    }
  }
}
</style>

<template>
  <div class="custom-management-container">
    <v-search-collapse
      @search="searchRecord"
      :hasTag="hasTag"
      @reset="resetSearchRecord"
      @userLabelTrueChoose="userLabelTrueChoose"
      @changeDivHeight="changeDivHeight"
    >
      <DatePicker
        ref="DatePicker"
        v-model="optTime"
        type="daterange"
        :clearable="true"
        placement="bottom-start"
        separator=" ~ "
        :placeholder="$t('modules_spoc_crm_web_src_views_customermanagement_index_1259')"
        style="width: 206px"
        :options="options3"
        split-panels
        @on-open-change="setOptTime"
      ></DatePicker>
      <treeSelectCos ref="ownerOfficeIds" placeholder="跟进校区"></treeSelectCos>
      <!-- <campusSelection v-model="record.officeIds" placeholder="登记校区" style="width: 206px;" @officeIdChange="officeIdChange" :waitFun="waitFun"></campusSelection> -->
      <DatePicker
        ref="DatePicker1"
        :options="options31"
        split-panels
        @on-open-change="setOptTime1"
        v-model="followTime"
        type="daterange"
        :clearable="true"
        placement="bottom-start"
        separator=" ~ "
        placeholder="最近跟进日期"
        style="width: 206px"
      ></DatePicker>
      <!--  <campusSelection v-model="record.ownerOfficeIds" placeholder="跟进校区" style="width: 206px;" @officeIdChange="ownerofficeIdChange" :waitFun="waitFun"></campusSelection> -->
      <!-- <div class="treeSelectCos" style="width: 224px;">
                <treeselect
                    sortValueBy="INDEX"
                    :flat="false"
                    :noOptionsText="''"
                    :alwaysOpen="false"
                    :multiple="true"
                    :default-expand-level="2"
                    :limit='1'
                    :limitText="count => `${count}+`"
                    :value-consists-of="valueConsistsOf"
                    placeholder="跟进校区"
                    v-model="record.ownerOfficeIds"
                    :options="GLR.officeIdList">
                </treeselect>
            </div> -->
      <Input v-model.trim="record.cusCode" clearable placeholder="客户编号" />
      <Input v-model.trim="record.name" clearable placeholder="客户姓名" />
      <Input v-model="record.phone" clearable placeholder="客户电话" />
      <Input v-model="record.wechat" clearable placeholder="客户微信" />
      <!-- @on-change="sourceChange(1,$event)" -->
      <Select
        v-model="record.querySources"
        style="width: 206px"
        clearable
        multiple
        filterable
        placeholder="渠道来源"
      >
        <Input v-model.trim="querySourcesKey" clearable style="width:180px;margin-left:12px" placeholder="请输入关键字" />
        <Option
          v-for="item in crm_customer_source"
          v-show="item.name.indexOf(querySourcesKey) >=0"
          :value="item.value"
          :key="item.id"
          v-if="record.querySources.indexOf(item.value) >= 0"
          >{{ item.name }}</Option
        >
        <Option
          v-for="item in crm_customer_source"
          v-show="item.name.indexOf(querySourcesKey) >=0"
          :value="item.value"
          :key="item.id"
          v-if="record.querySources.indexOf(item.value) < 0"
          >{{ item.name }}</Option
        >
      </Select>
      <Select
        v-model="record.registerId"
        placeholder="登记人"
        clearable
        filterable
        remote
        :remote-method="remoteMethod2"
        :loading="loading2"
      >
        <Option v-for="(item, index) in roleOptions2" :value="item.value" :key="index">{{
          item.name
        }}</Option>
      </Select>
      <Select
        v-model="record.followerId"
        placeholder="跟进人"
        clearable
        filterable
        remote
        :remote-method="remoteMethod4"
        :loading="loading2"
      >
        <Option v-for="(item, index) in roleOptions4" :value="item.value" :key="index">{{
          item.name
        }}</Option>
      </Select>
      <Select
        v-model="record.officeIds"
        style="width: 206px"
        multiple
        clearable
        :placeholder="$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_689')"
      >
        <Option
          v-for="item in areaSchoolList"
          :value="item.id"
          :key="item.id"
          v-if="record.officeIds.indexOf(item.id) >= 0"
          >{{ item.code }}{{ item.name }}</Option
        >
        <Option
          v-for="item in areaSchoolList"
          :value="item.id"
          :key="item.id"
          v-if="record.officeIds.indexOf(item.id) < 0"
          >{{ item.code }}{{ item.name }}</Option
        >
      </Select>
      <Select
        v-model="record.signOfficeIds"
        style="width: 206px"
        multiple
        clearable
        :placeholder="$t('modules_spoc_crm_web_src_views_customermanagement_index_1262')"
      >
        <Option
          v-for="item in areaSchoolList"
          :value="item.id"
          :key="item.id"
          v-if="record.signOfficeIds.indexOf(item.id) >= 0"
          >{{ item.code }}{{ item.name }}</Option
        >
        <Option
          v-for="item in areaSchoolList"
          :value="item.id"
          :key="item.id"
          v-if="record.signOfficeIds.indexOf(item.id) < 0"
          >{{ item.code }}{{ item.name }}</Option
        >
      </Select>
      <Select
        v-model="record.selectOfficeIds"
        style="width: 206px"
        multiple
        clearable
        :placeholder="$t('modules_spoc_crm_web_src_modules_leadsinfo_488')"
      >
        <Option
          v-for="item in areaSchoolList"
          :value="item.id"
          :key="item.id"
          v-if="record.selectOfficeIds.indexOf(item.id) >= 0"
          >{{ item.code }}{{ item.name }}</Option
        >
        <Option
          v-for="item in areaSchoolList"
          :value="item.id"
          :key="item.id"
          v-if="record.selectOfficeIds.indexOf(item.id) < 0"
          >{{ item.code }}{{ item.name }}</Option
        >
      </Select>
      <Select v-model="record.traceFollowFlag" clearable placeholder="跟进进度">
        <Option v-for="(item, index) in traceFollowList" :value="item.value" :key="index">{{
          item.label
        }}</Option>
      </Select>
      <DatePicker
        v-model="allocTime"
        type="daterange"
        :clearable="true"
        placement="bottom-start"
        separator=" ~ "
        placeholder="分配日期范围"
        style="width: 206px"
      ></DatePicker>
      <Select
        v-model="record.allocerId"
        placeholder="分配人"
        clearable
        filterable
        remote
        :remote-method="remoteMethod3"
        :loading="loading2"
      >
        <Option v-for="(item, index) in roleOptions3" :value="item.value" :key="index">{{
          item.name
        }}</Option>
      </Select>
      <DatePicker
        v-model="startEndDate"
        type="daterange"
        :clearable="true"
        placement="bottom-start"
        separator=" ~ "
        placeholder="统计日期范围"
        style="width: 206px"
      ></DatePicker>
      <Select
        v-model="record.entryType"
        :placeholder="$t('modules_spoc_crm_web_src_views_customermanagement_index_1266')"
        clearable
      >
        <Option v-for="(item, index) in entryTypeList" :value="item.value" :key="index">{{
          item.label
        }}</Option>
      </Select>
      <div class="borderStyle" style="width: 292px">
        <InputNumber
          :min="0"
          v-model="record.traceCountStart"
          placeholder="起始跟进次数"
          @on-change="traceCountStartBlur"
          style="margin-right: 12px"
        ></InputNumber>
        <InputNumber
          v-model="record.traceCountEnd"
          placeholder="结束跟进次数"
          @on-change="traceCountEndBlur"
          :formatter="
            (val) => {
              return val == Infinity ? '不限' : val;
            }
          "
        ></InputNumber>
      </div>
      <Select
            transfer
            v-model="record.districtEntity.country"
            :placeholder="$t('modules_spoc_crm_web_src_modules_resourceentrymodal_555')"
            clearable
            @on-change="toShowCity('countryName',$event)"
        >
            <Option
                :value="item.id"
                v-for="item in countryList"
                :key="item.id"
            >{{item.name}}</Option>
        </Select>
        <Select
            transfer
            v-model="record.districtEntity.province"
            :placeholder="$t('modules_spoc_core_web_src_views_schoolmanagement_index_253')"
            clearable
            @on-change="toShowCity('provinceName',$event)"
        >
            <Option
                :value="item.id"
                v-for="item in provinceList"
                :key="item.id"
            >{{item.name}}</Option>
        </Select>
        <Select
            transfer
            v-model="record.districtEntity.city"
            :placeholder="$t('modules_spoc_crm_web_src_modules_resourceentrymodal_557')"
            clearable
            @on-change="toShowCity('cityName',$event)"
        >
            <Option
                :value="item.id"
                v-for="item in cityList"
                :key="item.id"
            >{{item.name}}</Option>
        </Select>
        <Select
            transfer
            v-model="record.districtEntity.area"
            :placeholder="$t('modules_spoc_crm_web_src_modules_resourceentrymodal_558')"
            clearable
            @on-change="toShowCity('areaName',$event)"
        >
            <Option
                :value="item.id"
                v-for="item in areaList"
                :key="item.id"
            >{{item.name}}</Option>
        </Select>
      <form-create
        ref="fc"
        v-model="fApi"
        :rule="rule"
        :option="option"
        class="form_create"
      ></form-create>
    </v-search-collapse>

    <Row class="num_title">
      <Col span="24">
        <Card dis-hover :bordered="false">
          <Row>
            <Col
              :span="
                (index + 1) % 2 == 0
                  ? spanSurplus + Math.floor(24 / statisticsList.length)
                  : Math.floor(24 / statisticsList.length)
              "
              v-for="(item, index) in statisticsList"
              :key="index"
            >
              <div
                class="statistics_wrap"
                :class="{
                  statistics_wrap_hover: !(listRule == '1'),
                  statistics_wrap_seleted: item.fieldValue == record.statisticsTerm
                }"
                @click="setStatistics(item.fieldValue)"
                :style="{
                  cursor: listRule == '1' ? 'default' : 'pointer'
                }"
              >
                <div class="statistics_box">
                  <div class="num blue">
                    {{ statisticsMap[item.fieldValue] }}
                  </div>
                  <div class="label">
                    {{ item.fieldName }}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      </Col>
      <!-- <Col span="8">
                <Card dis-hover :bordered="false">
                    <Row>
                        <Col span="12">
                            <div class="num Violet">271</div>
                            <div class="label">{{$t('modules_spoc_crm_web_src_views_customermanagement_index_1280')}}</div>
                        </Col>
                        <Col span="12">
                            <div class="num Violet">271</div>
                            <div class="label">{{$t('modules_spoc_crm_web_src_views_customermanagement_index_1281')}}</div>
                        </Col>
                    </Row>
                </Card>
            </Col> -->
    </Row>

    <div class="tabs">
      <Tabs v-model="tabName" :animated="false" @on-click="changeTabs">
        <TabPane
          :label="item.groupName + ' (' + item.count + ')'"
          :name="index"
          v-for="(item, index) in tabList"
          :key="index"
        ></TabPane>
      </Tabs>
    </div>
    <big-table
      v-if="defaultShowCol && myButtonPrem && $route.name == 'crm.customerManagement'"
      ref="customerManagement"
      class="my-table"
      :tableName="$t('modules_spoc_crm_web_src_views_customermanagement_index_1282')"
      :tableData="tableData"
      :tableColumnArray="tableColumnArray"
      :defaultShowCol="defaultShowCol"
      :canSelection="true"
      :dataTotal="dataTotal"
      :btnList="btnList"
      :pageNo="pageNo"
      :tableHeightOut="tableHeightOut"
      :updateShowTitleMethod="updateShowTitle"
      :updateShowTitleKey="updateShowTitleKey"
      :row-class-name="rowClassName"
      @sortChange="sortChange"
      @filterChange="filterChange"
      @onRowClick="onRowClick"
      @resetDefault="resetDefaultCol"
      @selectionChange="selectionChange"
      @pageChange="pageChange"
    >
    </big-table>
    <export-modal ref="exportModal" :exportMethod="exportMethod"></export-modal>
    <assignLeads
      ref="assignLeads"
      :tableSelected="tableSelected"
      @assign-success="assignSuccess"
      @close="assignLeadsClose"
      v-if="assignLeadsShow"
    ></assignLeads>
    <assignLeadsBySingle
      ref="assignLeadsBySingle"
      @assign-success="assignSuccess"
      @close="assignLeadsBySingleClose"
      v-if="assignLeadsBySingleShow"
    ></assignLeadsBySingle>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import valid, {
  errors,
  sysUser,
  sysDict,
  sysCommonSql,
  crmCustomerStatus,
  crmCustomer,
  sysConfig,
  crmCustomerStatistics,
  sysProps,
  sys
} from '../../libs/request';
import vSearchCollapse from '@public/modules/vSearchCollapse';
import campusSelection from '@public/modules/campusSelection';
import bigTable from '@public/modules/bigTable.vue';
import exportModal from '@public/modules/exportModal.vue';
import assignLeads from './assignLeads';
import assignLeadsBySingle from './assignLeadsBySingle';
import {
  waitUntil,
  DatePickerOpt,
  defaultDatePickerValue,
  titleTransformationToLabel,
  getSelectIdsByid,
  getSelectTreeDataByid
} from '@public/libs/util';
import bussinessObject from '../../../../spoc-core-web/src/views/customState/bussinessObject';
import formCreateSetting from './formCreate.js';
import treeSelectCos from '@public/modules/treeSelectCos';
export default {
  name: 'crm.customerManagement',
  mixins: [formCreateSetting],
  components: {
    vSearchCollapse,
    campusSelection,
    bigTable,
    exportModal,
    assignLeads,
    assignLeadsBySingle,
    treeSelectCos
  },
  data() {
    return {
      curViewId: '',
      GLR: {
        officeIdList: []
      },
      parentOfficeId: '',
      ininOfficeIdList: [],
      valueConsistsOf: 'LEAF_PRIORITY', // ALL、BRANCH_PRIORITY、LEAF_PRIORITY、ALL_WITH_INDETERMINATE
      disableOperate: {},
      optTime: [],
      startEndDate: [],
      options3: null,
      options31: null,
      followTime: [],
      allocTime: [],
      tableHeightOut: 72 + 90 + 52, //324,
      updateShowTitleKey: 'crm.customerManagement0',
      assignLeadsShow: false,
      assignLeadsBySingleShow: false,
      tableSelected: [],
      loading2: false,
      roleOptions2: [],
      loading3: false,
      roleOptions3: [],
      loading4: false,
      roleOptions4: [],
      tabList: [],
      selectedIds: [], //选中的ids
      currentIds: [], //当前页的ids
      hasTag: true,
      updateShowTitle: crmCustomer.updateShowTitle,
      exportMethod: crmCustomer.export, //导出用到的方法对象
      areaSchoolList: [],
      crm_customer_source: [],
      querySourcesKey: '',
      btnList: [],
      pageNo: 1,
      pageSize: this.$store.state.app.pageSizeGlobal,
      defaultShowCol: null,
      dataTotal: 0,
      tableColumnArray: [],
      tableColumnArray1: [
        {
          key: 'cusCode',
          width: 130,
          className: 'cusCode',
          render: (h, params) => {
            return h('div', {}, [
              h(
                'span',
                {
                  style: {
                    'padding-left': '14px'
                  }
                },
                params.row.cusCode
              ),
              params.row.topFlag == 1
                ? h(
                    'div',
                    {
                      style: {
                        width: 0,
                        height: 0,
                        'border-top': '32px solid ' + this.themeColor,
                        'border-right': '32px solid transparent',
                        position: 'absolute',
                        left: 0,
                        top: 0
                      }
                    },
                    [
                      h(
                        'div',
                        {
                          style: {
                            width: '32px',
                            height: '32px',
                            color: '#fff',
                            position: 'absolute',
                            left: '4px',
                            top: '-38px',
                            transform: 'rotate(-45deg)'
                          }
                        },
                        'Top'
                      )
                    ]
                  )
                : '',
              params.row.topFlag == -1
                ? h(
                    'div',
                    {
                      style: {
                        width: 0,
                        height: 0,
                        'border-top': '32px solid ' + this.themeColor,
                        'border-right': '32px solid transparent',
                        position: 'absolute',
                        left: 0,
                        top: 0
                      }
                    },
                    [
                      h(
                        'div',
                        {
                          style: {
                            width: '32px',
                            height: '32px',
                            color: '#fff',
                            position: 'absolute',
                            left: '4px',
                            top: '-38px',
                            transform: 'rotate(-45deg)'
                          }
                        },
                        'End'
                      )
                    ]
                  )
                : ''
            ]);
          }
        },
        {
          title: this.$t('classlist_compontents_detailinfo_45'),
          key: 'doAction',
          width: 130,
          render: (h, params) => {
            return h(
              'div',
              {
                on: {
                  click: (e) => {
                    e.stopPropagation();
                  }
                }
              },
              [
                h(
                  'a',
                  {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    style: {
                      marginRight: '8px',
                      display:
                        this.myButtonPrem && this.myButtonPrem.indexOf('crmDetail') >= 0
                          ? 'inline-block'
                          : 'none'
                    },
                    on: {
                      click: (e) => {
                        e.stopPropagation();
                        this.curViewId = params.row.id;
                        this.$router.push({
                          name: 'crm.customer360',
                          query: {
                            id: params.row.id
                          }
                        });
                      }
                    }
                  },
                  this.$t('principalmailbox_16')
                ),
                h(
                  'a',
                  {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    style: {
                      marginRight: '8px',
                      display:
                        this.myButtonPrem && this.myButtonPrem.indexOf('crmDetail') >= 0
                          ? 'inline-block'
                          : 'none'
                    },
                    on: {
                      click: (e) => {
                        e.stopPropagation();
                        this.curViewId = params.row.id;
                        this.$router.push({
                          name: 'crm.customer360',
                          query: {
                            id: params.row.id,
                            isEditCustomer: 1
                          }
                        });
                      }
                    }
                  },
                  '编辑客户'
                ),
                h(
                  'a',
                  {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    style: {
                      marginRight: '8px',
                      display:
                        this.myButtonPrem &&
                        this.myButtonPrem.indexOf('alloc') >= 0 &&
                        this.getCanAction(params.row.status, 'assign')
                          ? 'inline-block'
                          : 'none'
                    },
                    on: {
                      click: (e) => {
                        e.stopPropagation();
                        if (params.row.status == 'assign') {
                          this.$Modal.confirm({
                            title: this.$t(
                              'modules_spoc_crm_web_src_views_customermanagement_index_1285'
                            ),
                            content: this.$t(
                              'modules_spoc_crm_web_src_views_customermanagement_index_1286'
                            ),
                            onOk: () => {
                              this.assignLeadsBySingleShow = true;
                              this.$nextTick(() => {
                                this.$refs.assignLeadsBySingle.show(params.row.id, true);
                              });
                            },
                            onCancel: () => {}
                          });
                        } else {
                          this.assignLeadsBySingleShow = true;
                          this.$nextTick(() => {
                            this.$refs.assignLeadsBySingle.show(params.row.id);
                          });
                        }
                      }
                    }
                  },
                  this.$t('modules_spoc_crm_web_src_views_customermanagement_index_1287')
                ),

                h(
                  'a',
                  {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    style: {
                      marginRight: '8px',
                      display:
                        this.myButtonPrem &&
                        this.myButtonPrem.indexOf('editEffective') >= 0 &&
                        params.row.followerName &&
                        this.getCanAction(params.row.status, 'invalid')
                          ? 'inline-block'
                          : 'none'
                    },
                    on: {
                      click: (e) => {
                        e.stopPropagation();
                        this.joinValidBySingle(params.row.id, '1');
                      }
                    }
                  },
                  this.$t('scoretemplate_scoretemplate_558')
                ),
                h(
                  'a',
                  {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    on: {
                      click: (e) => {
                        e.stopPropagation();
                        this.updateTopFlag(params.row.id, params.row.topFlag == 1 ? 0 : 1);
                      }
                    }
                  },
                  params.row.topFlag == 1 ? '取消置顶' : '置顶'
                )
              ]
            );
          }
        }
      ],
      tableColumnArray2: [
        {
          title: this.$t('classlist_compontents_detailinfo_45'),
          key: 'doAction',
          width: 130,
          render: (h, params) => {
            return h(
              'div',
              {
                on: {
                  click: (e) => {
                    e.stopPropagation();
                  }
                }
              },
              [
                h(
                  'a',
                  {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    style: {
                      marginRight: '8px',
                      display:
                        this.myButtonPrem && this.myButtonPrem.indexOf('crmDetail') >= 0
                          ? 'inline-block'
                          : 'none'
                    },
                    on: {
                      click: (e) => {
                        e.stopPropagation();
                        this.curViewId = params.row.id;
                        this.$router.push({
                          name: 'crm.customer360',
                          query: {
                            id: params.row.id
                          }
                        });
                      }
                    }
                  },
                  this.$t('principalmailbox_16')
                ),
                h(
                  'a',
                  {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    style: {
                      marginRight: '8px',
                      display:
                        this.myButtonPrem &&
                        this.myButtonPrem.indexOf('editEffective') >= 0 &&
                        this.getCanAction(params.row.status, 'activation')
                          ? 'inline-block'
                          : 'none'
                    },
                    on: {
                      click: (e) => {
                        e.stopPropagation();
                        let obj = {
                          title: this.$t('modules_spoc_crm_web_src_views_customer360_index_1100'),
                          content:
                            this.$t(
                              'modules_spoc_crm_web_src_views_customermanagement_index_1290'
                            ) +
                            '<br/>' +
                            this.$t(
                              'modules_spoc_crm_web_src_views_customermanagement_index_1291'
                            ) +
                            '<span style="color:#FF0000">' +
                            params.row.statusLabel +
                            '</span>',
                          onOk: () => {
                            let arr = [params.row.id];
                            this.changeStatus('0', arr);
                          },
                          onCancel: () => {}
                        };
                        this.$Modal.confirm(obj);
                      }
                    }
                  },
                  this.$t('modules_spoc_crm_web_src_views_customer360_index_1100')
                ),
                h(
                  'a',
                  {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    style: {
                      marginRight: '8px',
                      display:
                        this.getCanAction(params.row.status, 'activation')
                          ? 'inline-block'
                          : 'none'
                    },
                    on: {
                      click: (e) => {
                        e.stopPropagation();
                        this.updateTopFlag(params.row.id, params.row.topFlag == -1 ? 0 : -1);
                      }
                    }
                  },
                  params.row.topFlag == -1 ? '取消置底' : '置底'
                ),
                h(
                  'a',
                  {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    style: {
                      marginRight: '8px',
                      display:
                        this.myButtonPrem &&
                        this.myButtonPrem.indexOf('alloc') >= 0 &&
                        this.getCanAction(params.row.status, 'assign')
                          ? 'inline-block'
                          : 'none'
                    },
                    on: {
                      click: (e) => {
                        e.stopPropagation();
                        if (params.row.status == 'assign') {
                          this.$Modal.confirm({
                            title: this.$t(
                              'modules_spoc_crm_web_src_views_customermanagement_index_1285'
                            ),
                            content: this.$t(
                              'modules_spoc_crm_web_src_views_customermanagement_index_1286'
                            ),
                            onOk: () => {
                              this.assignLeadsBySingleShow = true;
                              this.$nextTick(() => {
                                this.$refs.assignLeadsBySingle.show(params.row.id, true);
                              });
                            },
                            onCancel: () => {}
                          });
                        } else {
                          this.assignLeadsBySingleShow = true;
                          this.$nextTick(() => {
                            this.$refs.assignLeadsBySingle.show(params.row.id);
                          });
                        }
                      }
                    }
                  },
                  this.$t('modules_spoc_crm_web_src_views_customermanagement_index_1287')
                )
              ]
            );
          }
        }
      ],
      tableData: [],
      record: {
        cusCode: '',
        startDate: '',
        endDate: '',
        officeIds: [],
        ownerOfficeIds: [],
        signOfficeIds: [],
        querySources: [],
        name: '',
        phone: '',
        wechat: '',
        studentName: '',
        registerId: '',
        allocerId: '',
        followerId: '',
        tagsArr: [],
        entryType: '',
        traceFollowCountStart: null,
        traceFollowCountEnd: null,
        fieldJsonData: {},
        selectOfficeIds: [],
        statisticsTerm: '',
        traceFollowFlag: '',
        orderByStatus: '',
        orderByType: '',
        traceCountStart: null,
        traceCountEnd: null,
        districtEntity: {
            city: "",
            cityName: "",
            country: "CN7",
            countryName: this.$t('modules_spoc_crm_web_src_modules_resourceentrymodal_578'),
            province: "",
            provinceName: "",
            area:"",
            areaName:""
        },
      },
      traceFollowList: [
        {
          value: 0,
          label: this.$t('modules_spoc_crm_web_src_views_customermanagement_index_1292')
        },
        {
          value: 1,
          label: this.$t('modules_spoc_crm_web_src_views_customermanagement_index_1293')
        }
      ],
      tabName: 0,
      isEffective: '0',
      statusArr: [],
      statisticsList: [],
      statisticsMap: {},
      entryTypeList: [],
      objfield: [],
      listRule: '1',
      myButtonPrem: null,
      filterObj: {},
      themeColor: '',
        countryList: [],
        provinceList: [],
        cityList: [],
        areaList:[],
    };
  },
  computed: {
    ...mapState(['app', 'buttonPerm', 'calendarConfig']),
    btnList1() {
      let arr = [
        {
          hidden:
            this.myButtonPrem && this.myButtonPrem.indexOf('editEffective') >= 0 ? false : true,
          btnClick: this.joinValid,
          text: this.$t('modules_spoc_crm_web_src_views_customerchangelog_index_1175')
        },
        {
          hidden: this.myButtonPrem && this.myButtonPrem.indexOf('alloc') >= 0 ? false : true,
          btnClick: this.assignLeads,
          text: this.$t(
            'modules_spoc_crm_web_src_views_customermanagement_assignleadsbysingle_1224'
          )
        },
        {
          hidden: this.myButtonPrem && this.myButtonPrem.indexOf('import') >= 0 ? false : true,
          btnClick: this.showImport,
          text: this.$t('modules_spoc_crm_web_src_views_customermanagement_index_1296')
        },
        [
          {
            hidden: this.myButtonPrem && this.myButtonPrem.indexOf('export') >= 0 ? false : true,
            btnClick: this.isExport,
            text: this.$t('integralflow_6'),
            value: '2',
            parentName: this.$t('integralflow_5')
          },
          {
            hidden: this.myButtonPrem && this.myButtonPrem.indexOf('export') >= 0 ? false : true,
            btnClick: this.isExport,
            text: this.$t('integralflow_4'),
            value: '1',
            parentName: this.$t('integralflow_5')
          }
        ]
      ];
      return arr;
    },
    btnList2() {
      let arr = [
        {
          hidden: this.myButtonPrem && this.myButtonPrem.indexOf('alloc') >= 0 ? false : true,
          btnClick: this.assignLeads,
          text: this.$t(
            'modules_spoc_crm_web_src_views_customermanagement_assignleadsbysingle_1224'
          )
        },
        {
          hidden: this.myButtonPrem && this.myButtonPrem.indexOf('import') >= 0 ? false : true,
          btnClick: this.showImport,
          text: this.$t('modules_spoc_crm_web_src_views_customermanagement_index_1296')
        },
        [
          {
            hidden: this.myButtonPrem && this.myButtonPrem.indexOf('export') >= 0 ? false : true,
            btnClick: this.isExport,
            text: this.$t('integralflow_6'),
            value: '2',
            parentName: this.$t('integralflow_5')
          },
          {
            hidden: this.myButtonPrem && this.myButtonPrem.indexOf('export') >= 0 ? false : true,
            btnClick: this.isExport,
            text: this.$t('integralflow_4'),
            value: '1',
            parentName: this.$t('integralflow_5')
          }
        ]
      ];
      return arr;
    },
    spanSurplus() {
      return (
        (24 - Math.floor(24 / this.statisticsList.length) * this.statisticsList.length) /
        Math.floor(this.statisticsList.length / 2)
      );
    }
  },
  mounted() {
    // console.log(this.buttonPerm['crm.customerManagement'])
    let colors = {
      blue: '#2E86FF',
      coral: 'rgb(255, 122, 84)',
      default: '#44bcb7',
      grass: 'rgb(136, 176, 75)',
      iris: 'rgb(114, 115, 222)',
      orange: 'rgb(255, 204, 0)'
    };
    this.getFindByName();
    this.listLocation(this.record.districtEntity.country, 'province');
    this.themeColor = colors[localStorage.getItem('theme')] || '#44bcb7';
    crmCustomer
      .findStateDisableOperate({})
      .then(valid.call(this))
      .then((res) => {
        if (res.ok) {
          this.disableOperate = res.data.data;
        }
      })
      .catch(errors.call(this))
      .finally(() => {
        this.getSchoolList(); // 获取登记校区
        // this.getShowTitle();
        // this.getLists();
        this.getSource(); // 获取渠道来源下拉
        // this.getButStatus();  // 无用请求？
        this.getEntryTypeList(); // 获取录入方式下拉
        this.getcustomerList(); // 混合在用
        // this.getOfficeList(); // 无用请求？
        this.getConfig(); // 获取权限
        waitUntil(
          () => {
            return (
              (this.app.currOfficeId &&
                this.calendarConfig.maxMonthInterval &&
                this.buttonPerm &&
                JSON.stringify(this.buttonPerm) != '{}') ||
              false
            );
          },
          () => {
            this.optTime = defaultDatePickerValue(this.calendarConfig.maxMonthInterval);
            // console.log(this.calendarConfig.maxMonthInterval,123)
            this.options3 = DatePickerOpt(
              this,
              'DatePicker',
              Number(this.calendarConfig.maxMonthInterval)
            );
            this.options31 = DatePickerOpt(
              this,
              'DatePicker1',
              Number(this.calendarConfig.maxMonthInterval)
            );
            // this.getStatisticsName();
            this.myButtonPrem = this.buttonPerm['crm.customerManagement'] || [];
            // console.log(this.myButtonPrem, "myButtonPrem~~~~~~~")
            this.getTreeDatas(); // 获取校区树形下拉
          }
        );
      });
  },
  methods: {
    ...mapMutations(['updateLoadingStatus']),

    toShowCity(key, val) {
        let _name = "";
        if (key == "countryName") {
            this.showCity = true;
            _name =
                this.countryList.find(v => v.id == val) &&
                this.countryList.find(v => v.id == val).name;
        } else if (key == "provinceName") {
            this.showCity = true;
            _name =
                this.provinceList.find(v => v.id == val) &&
                this.provinceList.find(v => v.id == val).name;
        } else if(key=="cityName") {
            _name =
                this.cityList.find(v => v.id == val) &&
                this.cityList.find(v => v.id == val).name;
        }else{
            _name =
                this.areaList.find(v => v.id == val) &&
                this.areaList.find(v => v.id == val).name;
        }
        this.record.districtEntity[key] = _name;
    },
    getFindByName() {
        this.updateLoadingStatus({ isLoading: true });
        let params = {
            name: "",
            level: 2
        };
        sys.findByName(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.countryList = res.data.data;
                }
            })
            .catch(errors.call(this))
            .finally(() => {
                this.updateLoadingStatus({ isLoading: false });
            });
    },
    listLocation(id, isCountry) {
        let params = {
            id: id
        };
        sys.listLocation(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    if (isCountry=='province') {
                        this.provinceList = res.data.data;
                    } else if(isCountry=='city') {
                        this.cityList = res.data.data;
                    }else{
                        this.areaList = res.data.data;
                    }
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
    },
    rowClassName(row, index) {
      if (row.id == this.curViewId) {
        return 'highLight';
      }
      return '';
    },
    getCanAction(status, actionName) {
      if (!this.disableOperate[status]) {
        return true;
      } else {
        if (this.disableOperate[status].indexOf(actionName) >= 0) {
          return false; // 存在该禁用，不允许显示
        } else {
          return true;
        }
      }
    },
    filterChange(filterObj) {
      // console.log("on-filter-change~~~~1`",filterObj)
      this.filterObj = filterObj;
      this.pageNo = 1;
      this.tableData = [];
      this.getLists();
      this.getStatisticsName(); // 获取统计项及数据
      this.getListStateGroup(); // 获取tab的数据
    },
    sortChange(sortObj) {
      // console.log(sortObj,'~~~~~~~~~~~~')
      this.record.orderByType = sortObj.key;
      if (sortObj.order == 'asc') {
        //升序
        this.record.orderByStatus = 1;
      } else if (sortObj.order == 'desc') {
        //desc 降序
        this.record.orderByStatus = 2;
      } else {
        this.record.orderByStatus = '';
        this.record.orderByType = '';
      }
      this.pageNo = 1;
      this.tableData = [];
      this.getLists();
    },
    onRowClick(row, index) {
      if (this.myButtonPrem.indexOf('crmDetail') >= 0) {
        this.curViewId = row.id;
        this.$router.push({
          name: 'crm.customer360',
          query: { id: row.id }
        });
      }
    },
    getTreeDatas() {
      this.updateLoadingStatus({ isLoading: true });
      sysUser
        .dataScopeFilterTree()
        .then(valid.call(this))
        .then((res) => {
          if (res.ok) {
            // console.log(res)
            if (Array.isArray(res.data.data.children)) {
              let officeIdList = res.data.data.children;
              this.parentOfficeId = officeIdList[0].id;
              titleTransformationToLabel(officeIdList);
              this.ininOfficeIdList = JSON.parse(JSON.stringify(officeIdList));
              this.initOffice();
              // this.getListData('1')
            }
          }
        })
        .catch(errors.call(this))
        .finally(() => {
          // this.updateLoadingStatus({isLoading:false});
        });
    },
    initOffice() {
      this.$refs.ownerOfficeIds.officeIdList = this.ininOfficeIdList;
      // this.$set(this.GLR, 'officeIdList', this.ininOfficeIdList);
      if (this.app.currOfficeId == 'all' || this.app.currOfficeId == this.parentOfficeId) {
        this.$set(this.record, 'ownerOfficeIds', []);
        this.$refs.ownerOfficeIds.officeIds = [];
        this.$nextTick(() => {
          this.$forceUpdate();
        });
      } else {
        let resultSelectObj = {};
        getSelectTreeDataByid(this.ininOfficeIdList, resultSelectObj);
        let resultIdsObj = {};
        getSelectIdsByid(this.ininOfficeIdList, resultIdsObj);
        // this.$set(this.GLR, 'officeIdList', [resultSelectObj[this.app.currOfficeId]]);
        this.$set(this.record, 'ownerOfficeIds', resultIdsObj[this.app.currOfficeId]);
        this.$refs.ownerOfficeIds.officeIds = resultIdsObj[this.app.currOfficeId];
        this.$nextTick(() => {
          this.$forceUpdate();
        });
      }
      this.tableColumnArray = this.tableColumnArray1;
      this.btnList = this.btnList1;
      this.getShowTitle();
    },
    // getOfficeList(){
    //     sysUser
    //     .dataScopeFilter()
    //     .then(valid.call(this))
    //     .then(res => {
    //         if (res.ok) {
    //           this.selectOfficeList = res.data.data;
    //         }
    //     })
    //     .catch(errors.call(this))
    //     .finally(() => {});
    // },

    // 获取权限
    getConfig() {
      let params = {
        menuId: '2001',
        configId: 'crm:otherConfig'
      };
      sysConfig
        .getConfig(params)
        .then(valid.call(this))
        .then((res) => {
          if (res.ok) {
            this.listRule = res.data.data.find(
              (v) => v.configValue == 'customerListFilterRule'
            ).rule;
          }
        })
        .catch(errors.call(this))
        .finally(() => {});
    },
    // 混合在用
    getcustomerList() {
      let params = {
        tableName: 'crm_customer'
      };
      sysProps
        .list(params)
        .then(valid.call(this))
        .then((res) => {
          if (res.ok) {
            let list = res.data.data.filter((v) => {
              return v.category == 'ugcField' && v.isQuery == '1';
            });
            // this.objfield=list.filter(v=>v.isObjField).map(v=>{
            //     return {field:v.field,value:v.objFieldKeys};
            // })
            this.setFormAttr(list);
          }
        })
        .catch(errors.call(this))
        .finally(() => {});
    },
    showImport() {
      this.$router.push({ name: 'crm.crmCustomerImport' });
    },
    changeDivHeight(height) {
      this.tableHeightOut = height + 90 + 52;
    },
    // 获取统计项数据
    crmCustomerStatistics() {
      let param = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        isEffective: this.isEffective,
        stateGroupType: 'customer management list'
      };
      if (this.tabList.length && this.tabList[0].states) {
        param.statusArr = this.tabList[0].states.map((v) => v.value);
      } else {
        param.statusArr = this.statusArr;
      }
      param = Object.assign({}, param, this.record);
      param.ownerOfficeIds = this.$refs.ownerOfficeIds.officeIds;
      if (this.tabName == this.tabList.length - 1) {
        param.isEffective = '0';
      }
      // if(this.tabName==0){
      // 	delete param.isEffective;
      // }
      // param.firstSource=param.sources[0];
      // param.secondSource=param.sources[1];
      // param.thirdSource=param.sources[2];
      // if(param.sources.every(v=>v=='')){
      //     param.sources=[];
      // }
      if (this.optTime[0]) {
        param.registStartTime = new Date(this.optTime[0]).format('yyyy-MM-dd 00:00:00');
      } else {
        param.registStartTime = '';
      }
      if (this.optTime[1]) {
        param.registEndTime = new Date(this.optTime[1]).format('yyyy-MM-dd 23:59:59');
      } else {
        param.registEndTime = '';
      }

      if (this.startEndDate[0]) {
        param.startDate = new Date(this.startEndDate[0]).format('yyyy-MM-dd 00:00:00');
      } else {
        param.startDate = '';
      }
      if (this.startEndDate[1]) {
        param.endDate = new Date(this.startEndDate[1]).format('yyyy-MM-dd 23:59:59');
      } else {
        param.endDate = '';
      }

      if (this.followTime[0]) {
        param.followStartTime = new Date(this.followTime[0]).format('yyyy-MM-dd 00:00:00');
      } else {
        param.followStartTime = '';
      }
      if (this.followTime[1]) {
        param.followEndTime = new Date(this.followTime[1]).format('yyyy-MM-dd 23:59:59');
      } else {
        param.followEndTime = '';
      }

      if (this.allocTime[0]) {
        param.allocStartTime = new Date(this.allocTime[0]).format('yyyy-MM-dd 00:00:00');
      } else {
        param.allocStartTime = '';
      }
      if (this.allocTime[1]) {
        param.allocEndTime = new Date(this.allocTime[1]).format('yyyy-MM-dd 23:59:59');
      } else {
        param.allocEndTime = '';
      }

      if (param.traceCountEnd == Infinity) {
        param.traceCountEnd = '';
      }

      for (let key in this.filterObj) {
        param[key] = this.filterObj[key];
      }

      param.statisticsTerm = '';
      crmCustomerStatistics
        .countStatisticalTerms(param)
        .then(valid.call(this))
        .then((res) => {
          if (res.ok) {
            this.statisticsMap = res.data.data;
          }
        })
        .catch(errors.call(this))
        .finally(() => {});
    },
    // 获取统计项类别并获取统计项数据
    getStatisticsName() {
      let params = {
        menuId: '2001',
        configId: 'crm:statisticsState',
        subArrKey: 'type',
        subArrValue: 'customer management list',
        subArrGetKey: 'group'
      };
      sysConfig
        .getConfigSub(params)
        .then(valid.call(this))
        .then((res) => {
          if (res.ok) {
            // this.record.statisticsTerm='';
            this.statisticsList = res.data.data;
            // 获取统计项数据
            this.crmCustomerStatistics();
          }
        })
        .catch(errors.call(this))
        .finally(() => {});
    },
    // getButStatus(){
    //     let params={
    //         menuId:'2001',
    //         configId:'crm:customState',
    //         subArrKey:'child',
    //         subArrGetKey:'transferOutOpt'
    //     }
    //     sysConfig
    //     .getConfigSub(params)
    //     .then(valid.call(this))
    //     .then(res => {
    //         if (res.ok) {
    //         }
    //     })
    //     .catch(errors.call(this))
    //     .finally(() => {
    //     });
    // },

    // 获取渠道来源下拉
    getSource() {
      sysDict
        .getDictStringTree({ type: 'crm_customer_source' })
        .then(valid.call(this))
        .then((res) => {
          if (res.ok) {
            let arr = res.data.data;
            this.crm_customer_source = arr;
          }
        })
        .catch(errors.call(this))
        .finally(() => {
          // this.updateLoadingStatus({ isLoading: false });
        });
      // let params={
      //     types: type,
      // }
      // sysDict
      // .batchListData(params)
      // .then(valid.call(this))
      // .then(res => {
      //     if (res.ok) {
      //         // this.crm_customer_source[ind]=res.data.data[type];
      //         this.$set(this.crm_customer_source,ind,res.data.data[type])
      //     }
      // })
      // .catch(errors.call(this))
      // .finally(() => {
      // });
    },
    // 获取录入方式下拉
    getEntryTypeList() {
      let params = {
        types: 'crm_entry_type'
      };
      sysDict
        .batchListData(params)
        .then(valid.call(this))
        .then((res) => {
          if (res.ok) {
            this.entryTypeList = res.data.data['crm_entry_type'];
          }
        })
        .catch(errors.call(this))
        .finally(() => {});
    },
    waitFun() {
      return this.myButtonPrem.length;
    },
    // 获取登记校区
    getSchoolList() {
      let params = {};
      sysUser
        .dataScopeFilter(params)
        .then(valid.call(this))
        .then((res) => {
          if (res.ok) {
            this.areaSchoolList = res.data.data;
          }
        })
        .catch(errors.call(this))
        .finally(() => {});
    },
    delete() {
      let config = {
        okText: this.$t('classroom_allscore_54'),
        title: this.$t('modules_spoc_crm_web_src_views_customermanagement_index_1301'),
        width: 433,
        content:
          '<p>' +
          this.$t('modules_spoc_crm_web_src_views_customermanagement_index_1302') +
          '<span>' +
          this.tableSelected.length +
          '</span>' +
          this.$t('modules_spoc_crm_web_src_views_customermanagement_index_1303') +
          '<span style="color:#FF5D5B">' +
          this.$t('modules_spoc_crm_web_src_views_customermanagement_index_1304') +
          '</span></p>' +
          '<p>' +
          this.$t('modules_spoc_crm_web_src_views_customermanagement_index_1305') +
          '</p>',
        onOk: () => {}
      };
      this.$Modal.confirm(config);
    },
    joinValid() {
      if (!this.tableSelected.length) {
        this.$Message.warning(
          this.$t('modules_spoc_crm_web_src_views_customermanagement_index_1306')
        );
        return;
      }
      if (
        this.tableSelected.find((v) => !v.followerName) ||
        this.tableSelected.find((v) => v.salerTraceFollowCount == 0)
      ) {
        this.$Message.warning(
          this.$t('modules_spoc_crm_web_src_views_customermanagement_index_1307')
        );
        return;
      }
      let config = {
        okText: this.$t('classroom_allscore_54'),
        title: this.$t('modules_spoc_crm_web_src_views_customermanagement_index_1308'),
        width: 433,
        content:
          this.$t('modules_spoc_crm_web_src_views_customermanagement_index_1302') +
          '<span>' +
          this.tableSelected.length +
          '</span>' +
          this.$t('modules_spoc_crm_web_src_views_customermanagement_index_1309'),
        onOk: () => {
          let arr = this.tableSelected.map((v) => v.id);
          this.changeStatus('1', arr);
        }
      };
      this.$Modal.confirm(config);
    },
    assignLeads() {
      if (!this.tableSelected.length) {
        this.$Message.warning(
          this.$t('modules_spoc_crm_web_src_views_customermanagement_index_1310')
        );
        return;
      }
      let hasAssign = false;
      this.tableSelected.forEach((item) => {
        if (item.status == 'assign') {
          hasAssign = true;
        }
      });
      // if(hasAssign){
      //     this.$Message.warning('所选资源中存在已分配的资源，不可批量分配')
      //     return
      // }

      this.assignLeadsShow = true;
      this.$nextTick(() => {
        this.$refs.assignLeads.show(hasAssign);
      });
    },
    // 获取tab的数据
    getListStateGroup() {
      let param = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        isEffective: this.isEffective,
        // statusArr:this.statusArr,
        stateGroupType: 'customer management list'
      };
      param = Object.assign({}, param, this.record);
      param.ownerOfficeIds = this.$refs.ownerOfficeIds.officeIds;
      if (this.tabName == this.tabList.length - 1) {
        param.isEffective = '0';
      }
      // if(this.tabName==0){
      // 	delete param.isEffective;
      // }
      // param.firstSource=param.sources[0];
      // param.secondSource=param.sources[1];
      // param.thirdSource=param.sources[2];
      // if(param.sources.every(v=>v=='')){
      //     param.sources=[];
      // }
      if (this.optTime[0]) {
        param.registStartTime = new Date(this.optTime[0]).format('yyyy-MM-dd 00:00:00');
      } else {
        param.registStartTime = '';
      }
      if (this.optTime[1]) {
        param.registEndTime = new Date(this.optTime[1]).format('yyyy-MM-dd 23:59:59');
      } else {
        param.registEndTime = '';
      }

      if (this.startEndDate[0]) {
        param.startDate = new Date(this.startEndDate[0]).format('yyyy-MM-dd 00:00:00');
      } else {
        param.startDate = '';
      }
      if (this.startEndDate[1]) {
        param.endDate = new Date(this.startEndDate[1]).format('yyyy-MM-dd 23:59:59');
      } else {
        param.endDate = '';
      }

      if (this.followTime[0]) {
        param.followStartTime = new Date(this.followTime[0]).format('yyyy-MM-dd 00:00:00');
      } else {
        param.followStartTime = '';
      }
      if (this.followTime[1]) {
        param.followEndTime = new Date(this.followTime[1]).format('yyyy-MM-dd 23:59:59');
      } else {
        param.followEndTime = '';
      }

      if (this.allocTime[0]) {
        param.allocStartTime = new Date(this.allocTime[0]).format('yyyy-MM-dd 00:00:00');
      } else {
        param.allocStartTime = '';
      }
      if (this.allocTime[1]) {
        param.allocEndTime = new Date(this.allocTime[1]).format('yyyy-MM-dd 23:59:59');
      } else {
        param.allocEndTime = '';
      }

      if (param.traceCountEnd == Infinity) {
        param.traceCountEnd = '';
      }
      if (this.allocTime[1]) {
        param.allocEndTime = new Date(this.allocTime[1]).format('yyyy-MM-dd 23:59:59');
      } else {
        param.allocEndTime = '';
      }

      if (param.traceFollowCountEnd == Infinity) {
        param.traceFollowCountEnd = '';
      }
      if (!param.statisticsTerm && this.listRule == '1') {
        delete param.statisticsTerm;
      }

      for (let key in this.filterObj) {
        param[key] = this.filterObj[key];
      }

      crmCustomer
        .listStateGroup(param)
        .then(valid.call(this))
        .then((res) => {
          if (res.ok) {
            this.tabList = res.data.data;
          }
        })
        .catch(errors.call(this))
        .finally(() => {});
    },
    changeTabs(val, flag) {
      this.selectedIds = []; //切换tab的时候置空选中的数据
      this.pageNo = 1;
      this.tabName = val || this.tabName;
      // console.log((val||this.tabName) ,'~~~~~`')
      // this.updateShowTitleKey = 'crm.customerManagement' + this.tabName;
      if (this.tabList[val].states) {
        this.statusArr = this.tabList[val].states.map((v) => v.value);
      } else {
        this.statusArr = [];
      }
      if (val == this.tabList.length - 1) {
        this.isEffective = '1';
        this.btnList = this.btnList2;
        this.tableColumnArray = this.tableColumnArray2;
      } else {
        this.isEffective = '0';
        this.tableColumnArray = this.tableColumnArray1;
        this.btnList = this.btnList1;
      }
      if (flag) {
        this.getShowTitle();
      } else {
        this.getLists();
        if (this.listRule == '1') {
          this.getStatisticsName();
        }
        // this.getListStateGroup();
      }
    },
    //可选方法，如果是多选的话必须有
    selectionChange(selection) {
      //选择导出
      let s = this.selectedIds;
      let c = this.currentIds;
      for (let i in c) {
        if (s.includes(c[i])) {
          let num = this.selectedIds.indexOf(c[i]);
          s.splice(num, 1);
        }
      }
      if (selection.length) {
        selection.forEach((item) => {
          s.push(item.id);
        });
      }
      this.tableSelected = selection;
      // console.log(selection)
    },
    isExport(val) {
      //这里val的值。是根据设置下拉类型button设定的值来匹配判断
      if (val == '2') {
        //如果是导出所选，需要在这里传递所选对象、或者对象ID，这里根据需要自行处理，并作为搜索参数的一部分传递到导出组件
        if (this.selectedIds.length < 1) {
          this.$Message.error(this.$t('importPage_warning1'));
          return;
        }
        this.searchObj.ids = this.selectedIds;
        this.exportMethod = crmCustomer.export;
      } else {
        delete this.searchObj.ids;
        this.exportMethod = crmCustomer.export;
      }
      this.$refs.exportModal.noShowExport(this.exportMethod, this.searchObj);
    },
    // 获取表格数据
    getLists() {
      this.updateLoadingStatus({ isLoading: true });
      let param = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        isEffective: this.isEffective,
        statusArr: this.statusArr,
        stateGroupType: 'customer management list'
      };
      param = Object.assign({}, param, this.record);
      param.ownerOfficeIds = this.$refs.ownerOfficeIds.officeIds;
      // if(this.tabName==0){
      // 	delete param.isEffective;
      // }
      // param.firstSource=param.sources[0];
      // param.secondSource=param.sources[1];
      // param.thirdSource=param.sources[2];
      // if(param.sources.every(v=>v=='')){
      //     param.sources=[];
      // }
      if (this.optTime[0]) {
        param.registStartTime = new Date(this.optTime[0]).format('yyyy-MM-dd 00:00:00');
      } else {
        param.registStartTime = '';
      }
      if (this.optTime[1]) {
        param.registEndTime = new Date(this.optTime[1]).format('yyyy-MM-dd 23:59:59');
      } else {
        param.registEndTime = '';
      }

      if (this.startEndDate[0]) {
        param.startDate = new Date(this.startEndDate[0]).format('yyyy-MM-dd 00:00:00');
      } else {
        param.startDate = '';
      }
      if (this.startEndDate[1]) {
        param.endDate = new Date(this.startEndDate[1]).format('yyyy-MM-dd 23:59:59');
      } else {
        param.endDate = '';
      }

      if (this.followTime[0]) {
        param.followStartTime = new Date(this.followTime[0]).format('yyyy-MM-dd 00:00:00');
      } else {
        param.followStartTime = '';
      }
      if (this.followTime[1]) {
        param.followEndTime = new Date(this.followTime[1]).format('yyyy-MM-dd 23:59:59');
      } else {
        param.followEndTime = '';
      }

      if (this.allocTime[0]) {
        param.allocStartTime = new Date(this.allocTime[0]).format('yyyy-MM-dd 00:00:00');
      } else {
        param.allocStartTime = '';
      }
      if (this.allocTime[1]) {
        param.allocEndTime = new Date(this.allocTime[1]).format('yyyy-MM-dd 23:59:59');
      } else {
        param.allocEndTime = '';
      }

      if (param.traceCountEnd == Infinity) {
        param.traceCountEnd = '';
      }
      if (this.allocTime[1]) {
        param.allocEndTime = new Date(this.allocTime[1]).format('yyyy-MM-dd 23:59:59');
      } else {
        param.allocEndTime = '';
      }

      if (param.traceFollowCountEnd == Infinity) {
        param.traceFollowCountEnd = '';
      }
      if (!param.statisticsTerm && this.listRule == '1') {
        delete param.statisticsTerm;
      }

      for (let key in this.filterObj) {
        if (key != 'fieldJsonData') {
          param[key] = this.filterObj[key];
        }
      }
      if (this.filterObj.fieldJsonData) {
        if (param.fieldJsonData) {
          param.fieldJsonData = Object.assign(param.fieldJsonData, this.filterObj.fieldJsonData);
        } else {
          param.fieldJsonData = this.filterObj.fieldJsonData;
        }
      }
      this.searchObj = param; //这里需要给searchObj 赋值，导出数据的时候需要用到
      crmCustomer
        .listPageManage(param)
        .then(valid.call(this))
        .then((res) => {
          if (res.ok) {
            // let result = res.data.data;
            // this.tableData = result.list;
            // this.dataTotal = result.total;
            let data = res.data;
            this.dataTotal = data.data.total;
            let d = data.data.list;
            this.pageNo = data.data.pageNum ? data.data.pageNum : 1;
            this.currentIds = [];
            this.pageSize = data.data.pageNum ? data.data.pageSize : 20;
            for (let i in d) {
              this.currentIds.push(d[i].id);
              // this.selectedIds=[];892 【COS分配】批量分配，没有实现
              // if (this.selectedIds.includes(d[i].id)) {
              //     d[i]._checked = true;
              // }
            }
            this.tableData = d;
          }
        })
        .catch(errors.call(this))
        .finally(() => {
          this.updateLoadingStatus({ isLoading: false });
        });
    },
    getShowTitle(closeLoad) {
      this.updateLoadingStatus({ isLoading: true });
      crmCustomer
        .getShowTitle({
          pageIdentifier: 'crm.customerManagement0',
          voName: 'com.windliven.spoc.modules.crm.vo.CrmCustomerVO',
          tableName: 'crm_customer'
        })
        .then(valid.call(this))
        .then((res) => {
          if (res.ok) {
            this.defaultShowCol = res.data.data;
            this.getLists(); // 获取表格数据
            this.getStatisticsName(); // 获取统计项及数据
            this.getListStateGroup(); // 获取tab的数据
          }
        })
        .catch(errors.call(this))
        .finally(() => {
          if (closeLoad) {
            this.updateLoadingStatus({ isLoading: false });
          }
        });
    },
    pageChange(pageNo, pageSize) {
      if (!pageNo) {
        //防止无用重复请求
        return;
      }
      this.pageNo = pageNo;
      this.pageSize = pageSize;
      this.getLists();
      this.getStatisticsName();
      this.getListStateGroup();
    },
    // sourceChange(ind,type){
    //     for (let i = 2; i >= ind; i--) {
    //         this.record.sources[i]='';
    //     }
    //     if(ind<3){
    //         this.getSource(ind,type);
    //     }
    // },

    // 获取登记人下拉
    remoteMethod2(query) {
      // console.log(query)
      if (query !== '') {
        this.loading1 = true;
        let params = {
          mainTable: 'crm_customer',
          mainField: 'create_by',
          joinField: 'id',
          joinTable: 'sys_user',
          secondField: 'name',
          joinTableSearchParam: query
        };
        sysCommonSql
          .queryPageInputInitData(params)
          .then(valid.call(this))
          .then((res) => {
            if (res.ok) {
              this.loading2 = false;
              this.roleOptions2 = res.data.data;
            }
          })
          .catch(errors.call(this))
          .finally(() => {
            // this.loadingoptUserId = false;
          });
      } else {
        this.options1 = [];
      }
    },
    // 获取分配人下拉
    remoteMethod3(query) {
      if (query !== '') {
        this.loading1 = true;
        let params = {
          mainTable: 'crm_customer_status',
          mainField: 'allocer',
          joinField: 'id',
          joinTable: 'sys_user',
          secondField: 'name',
          joinTableSearchParam: query
        };
        sysCommonSql
          .queryPageInputInitData(params)
          .then(valid.call(this))
          .then((res) => {
            if (res.ok) {
              this.loading3 = false;
              this.roleOptions3 = res.data.data;
            }
          })
          .catch(errors.call(this))
          .finally(() => {
            // this.loadingoptUserId = false;
          });
      } else {
        this.options1 = [];
      }
    },
    // 获取跟进人下拉
    remoteMethod4(query) {
      if (query !== '') {
        this.loading1 = true;
        let params = {
          mainTable: 'crm_customer_status',
          mainField: 'saler',
          joinField: 'id',
          joinTable: 'sys_user',
          secondField: 'name',
          joinTableSearchParam: query
        };
        sysCommonSql
          .queryPageInputInitData(params)
          .then(valid.call(this))
          .then((res) => {
            if (res.ok) {
              this.loading4 = false;
              this.roleOptions4 = res.data.data;
            }
          })
          .catch(errors.call(this))
          .finally(() => {
            // this.loadingoptUserId = false;
          });
      } else {
        this.options1 = [];
      }
    },
    //标签切换
    userLabelTrueChoose(item) {
      this.record.tagsArr = item;
      this.pageNo = 1;
      this.getLists();
      this.getStatisticsName();
      this.getListStateGroup();
    },
    // 执行搜索
    searchRecord() {
      let $f = this.fApi;
      let formData = $f.formData();
      for (let i in formData) {
        if (Array.isArray(formData[i])) {
        } else {
          formData[i] = [formData[i]];
        }
      }
      this.record.fieldJsonData = formData;
      this.$nextTick(() => {
        this.pageNo = 1;
        this.getLists();
        this.getStatisticsName();
        this.getListStateGroup();
      });
    },
    // 重置搜索
    resetSearchRecord() {
      let $f = this.fApi;
      $f.resetFields();
      this.objfield.forEach((v) => {
        let obj = {};
        v.value.forEach((val) => {
          obj.val = '';
        });
        $f.setValue(v.field, obj);
      });
      let formData = null;
      this.$nextTick(() => {
        formData = $f.formData();
        for (let i in formData) {
          if (Array.isArray(formData[i])) {
          } else {
            formData[i] = [formData[i]];
          }
        }
        this.record = {
          officeIds: [],
          ownerOfficeIds: [],
          signOfficeIds: [],
          querySources: [],
          name: '',
          phone: '',
          wechat: '',
          studentName: '',
          registerId: '',
          allocerId: '',
          followerId: '',
          tagsArr: [],
          entryType: '',
          traceFollowCountStart: null,
          traceFollowCountEnd: null,
          selectOfficeIds: [],
          orderByStatus: '',
          orderByType: '',
          districtEntity: {
              city: "",
              cityName: "",
              country: "CN7",
              countryName: this.$t('modules_spoc_crm_web_src_modules_resourceentrymodal_578'),
              province: "",
              provinceName: "",
              area:"",
              areaName:""
          },
        };
        this.record.fieldJsonData = formData;
        this.followTime = [];
        this.allocTime = [];
        this.$refs.customerManagement.resetFilter();
        this.filterObj = {};
        // this.record.officeIds = this.app.currOfficeId =='all'? []: [this.app.currOfficeId];
        this.optTime = defaultDatePickerValue(this.calendarConfig.maxMonthInterval);
        this.pageNo = 1;
        this.initOffice();
        // this.getLists();
        // this.getStatisticsName();
        // this.getListStateGroup();
      });
    },
    assignSuccess() {
      // this.pageNo = 1;
      this.getLists();
      this.getStatisticsName();
      this.getListStateGroup();
      this.assignLeadsClose();
      this.assignLeadsBySingleClose();
    },
    joinValidBySingle(id, val) {
      let config = {
        okText: this.$t('classroom_allscore_54'),
        title: this.$t('modules_spoc_crm_web_src_views_customer360_index_1142'),
        width: 433,
        content: '丢入无效池中的资源，将不在日常跟进的列表中出现，您还要继续吗？',
        onOk: () => {
          // console.log(id)
          let arr = [id];
          this.changeStatus(val, arr);
        }
      };
      this.$Modal.confirm(config);
    },
    changeStatus(toStatus, arr) {
      let params = {
        isEffective: toStatus,
        ids: arr
      };
      // if(this.tabName==0){
      // 	delete param.isEffective;
      // }
      crmCustomerStatus
        .modifyEffective(params)
        .then(valid.call(this))
        .then((res) => {
          if (res.ok) {
            this.pageNo = 1;
            this.getLists();
            this.getStatisticsName();
            this.getListStateGroup();
          }
        })
        .catch(errors.call(this));
    },
    updateTopFlag(id, topFlag) {
      let params = {
        id,
        topFlag
      };
      crmCustomer
        .updateTopFlag(params)
        .then(valid.call(this))
        .then((res) => {
          if (res.ok) {
            this.pageNo = 1;
            this.getLists();
          }
        })
        .catch(errors.call(this));
    },
    assignLeadsClose() {
      this.tableSelected = [];
      this.$nextTick(() => {
        this.assignLeadsShow = false;
      });
    },
    assignLeadsBySingleClose() {
      // console.log(112233)
      this.$nextTick(() => {
        this.assignLeadsBySingleShow = false;
      });
    },
    ownerofficeIdChange() {
      this.updateLoadingStatus({ isLoading: true });
      let param = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        stateGroupType: 'customer management list'
      };
      param = Object.assign({}, param, this.record);
      // param.firstSource=param.sources[0];
      // param.secondSource=param.sources[1];
      // param.thirdSource=param.sources[2];
      if (this.optTime[0]) {
        param.registStartTime = new Date(this.optTime[0]).format('yyyy-MM-dd 00:00:00');
      } else {
        param.registStartTime = '';
      }
      if (this.optTime[1]) {
        param.registEndTime = new Date(this.optTime[1]).format('yyyy-MM-dd 23:59:59');
      } else {
        param.registEndTime = '';
      }

      if (this.followTime[0]) {
        param.followStartTime = new Date(this.followTime[0]).format('yyyy-MM-dd 00:00:00');
      } else {
        param.followStartTime = '';
      }
      if (this.followTime[1]) {
        param.followEndTime = new Date(this.followTime[1]).format('yyyy-MM-dd 23:59:59');
      } else {
        param.followEndTime = '';
      }

      if (this.allocTime[0]) {
        param.allocStartTime = new Date(this.allocTime[0]).format('yyyy-MM-dd 00:00:00');
      } else {
        param.allocStartTime = '';
      }
      if (this.allocTime[1]) {
        param.allocEndTime = new Date(this.allocTime[1]).format('yyyy-MM-dd 23:59:59');
      } else {
        param.allocEndTime = '';
      }

      if (param.traceCountEnd == Infinity) {
        param.traceCountEnd = '';
      }

      for (let key in this.filterObj) {
        param[key] = this.filterObj[key];
      }

      this.searchObj = param; //这里需要给searchObj 赋值，导出数据的时候需要用到
      crmCustomer
        .listStateGroup(param)
        .then(valid.call(this))
        .then((res) => {
          if (res.ok) {
            this.tabList = res.data.data;
            this.changeTabs(0, true);
          }
        })
        .catch(errors.call(this))
        .finally(() => {});
    },
    traceFollowCountStartBlur() {
      if (!this.record.traceFollowCountEnd) {
        this.record.traceFollowCountEnd = Infinity;
      } else if (this.record.traceFollowCountEnd < this.record.traceFollowCountStart) {
        this.record.traceFollowCountEnd = this.record.traceFollowCountStart;
      } else {
      }
    },
    traceFollowCountEndBlur() {
      if (!this.record.traceFollowCountStart) {
        this.record.traceFollowCountStart = 0;
      } else if (this.record.traceFollowCountEnd < this.record.traceFollowCountStart) {
        this.record.traceFollowCountStart = this.record.traceFollowCountEnd;
      } else {
      }
    },
    setOptTime(flag) {
      if (flag) {
        this.optTime = [];
      }
    },
    setOptTime1(flag) {
      if (flag) {
        this.followTime = [];
      }
    },
    setStatistics(val) {
      if (this.listRule == '0') {
        this.record.statisticsTerm = val;
        let $f = this.fApi;
        let formData = $f.formData();
        for (let i in formData) {
          if (Array.isArray(formData[i])) {
          } else {
            formData[i] = [formData[i]];
          }
        }
        this.record.fieldJsonData = formData;
        this.$nextTick(() => {
          this.pageNo = 1;
          this.getLists();
          // this.getStatisticsName();
          this.getListStateGroup();
        });
      }
    }
  },
    watch: {
        "record.districtEntity.city": {
            handler: function(val, oldVal) {
                if (val) {
                    this.listLocation(val, 'area');
                }
            },
            deep: true
        },
        "record.districtEntity.province": {
            handler: function(val, oldVal) {
                if (val) {
                    this.listLocation(val, 'city');
                }
            },
            deep: true
        },
        "record.districtEntity.country": {
            handler: function(val, oldVal) {
                if (val) {
                    this.listLocation(val, 'province');
                }
            },
            deep: true
        },
        'app.currOfficeId': function (val, oldVal) {
          // console.log(val,'app.currOfficeId')
          if (oldVal && this.$route.name == 'crm.customerManagement') {
            // this.$set(this.record, "ownerOfficeIds", val=='all'?[]: [val]);
            this.pageNo = 1;
            this.initOffice();
          }
        },
    '$route.name': {
      handler: function (val, oldVal) {
        if (val == 'crm.customerManagement') {
          let $f = this.fApi;
          let formData = $f.formData();
          for (let i in formData) {
            if (Array.isArray(formData[i])) {
            } else {
              formData[i] = [formData[i]];
            }
          }
          this.record.fieldJsonData = formData;
          this.$nextTick(() => {
            this.getLists();
            this.getStatisticsName();
            this.getListStateGroup();
          });
        }
      },
      deep: true
    }
  }
};
</script>
