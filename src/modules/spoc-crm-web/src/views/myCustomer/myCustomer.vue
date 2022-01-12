<style lang="less">
.my-customer-class {
  .highLight {
    > td {
      background-color: #ebf7ff !important;
    }
  }
  .cusCode {
    position: relative;
  }
  .form_create {
    float: left;
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
  .icon-down {
    margin-left: 6px;
    cursor: pointer;
  }
  .page-contain {
    display: flex;
    .cardStyle {
      width: calc(~'100% - 298px');
      margin-bottom: 16px;
      margin-right: 16px;
      border: none;
      &:not(.cardMax) {
        .ivu-card-head {
          border-bottom: none;
        }
        .ivu-card-body {
          display: none;
        }
      }
      &.cardMax {
        height: 156px;
      }
      .cardTitle {
        font-size: 16px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(73, 80, 96, 1);
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        h2 {
          font-size: 16px;
          font-weight: 400;
          color: rgba(73, 80, 96, 1);
        }
        div {
          margin-left: 40px;
          font-size: 12px;
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(73, 80, 96, 1);
          span {
            font-size: 16px;
            /*margin-top:-5px;*/
          }
        }
      }
      .cardRow-my {
        .num_title {
          // margin-top: 10px;
          .ivu-card-body {
            padding: 0;
          }
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
      }
    }

    .cardRightStyle {
      display: flex;
      width: 298px;
      &:not(.cardRightStyleMax) {
        img {
          height: 24px;
        }
      }
      &.cardRightStyleMax {
        & > div {
          height: 156px;
        }
      }
      > div {
        flex: 1;
        // width: 148px;
        height: 45px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        cursor: pointer;
        &:hover {
          background: #fbfbfb;
        }
        b {
          font-size: 14px;
          font-weight: 400;
          color: rgba(73, 80, 96, 1);
          margin-top: 18px;
        }
        &:nth-child(1) {
          margin-right: 2px;
          i {
            color: #ff9f40;
          }
          .IconTask {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            span {
              width: 41px;
              height: 28px;
              line-height: 28px;
              color: #fff;
              text-align: center;
              background: rgba(254, 101, 101, 1);
              box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
              border-radius: 18px;
              position: absolute;
              top: -16px;
              right: -28px;
            }
          }
        }
        &:nth-child(2) {
          margin-right: 2px;
          i {
            color: #7c6af2;
          }
        }
      }
    }
  }
  .ivu-tabs {
    background: #fff;
    padding-top: 20px;
  }
  .mytable {
    width: 100%;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    padding: 8px 16px 0;
    margin-top: 0;
    .subTypeNameStyle {
      margin-left: 11px;
      .ivu-table-cell {
        margin-left: 11px;
      }
    }
  }
  .table-name-slot-style-custom {
    margin-left: -16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 600;
    font-size: 12px;
    margin-bottom: -7px;
    a {
      font-weight: normal;
      font-family: PingFangSC-Regular, PingFang SC;
      font-size: 16px;
    }
  }
  /*.tableNameSlotStyle {*/
  /*    margin-left: -16px;*/
  /*    font-size: 16px;*/
  /*    font-family: PingFangSC;*/
  /*    font-weight: 400;*/
  /*    color: rgba(73, 80, 96, 1);*/
  /*    > span {*/
  /*        color: #44bcb7;*/
  /*    }*/
  /*}*/
  .my-tags {
    padding: 0 16px;
    background: #fff;
    .ivu-tabs-bar {
      margin-bottom: 0;
    }
  }
}
</style>
<template>
  <div class="my-customer-class">
    <div class="page-contain">
      <Card
        style="margin-bottom: 16px"
        class="cardStyle"
        :class="{
          cardMax: openFlag,
          noRule:
            myButtonPrem &&
            myButtonPrem.indexOf('taskPage') < 0 &&
            myButtonPrem.indexOf('ctTplPage') < 0
        }"
        dis-hover
      >
        <div slot="title" class="cardTitle">
          <h2>
            {{ $t('modules_spoc_crm_web_src_views_mycustomer_mycustomer_1380') }}
          </h2>
          <span @click="changeOpenFlag" class="icon-down">
            <Icon type="ios-arrow-up" style="position: relative; top: -2px" v-if="openFlag" />
            <Icon type="ios-arrow-down" v-else />
          </span>
          <!--                    <div>-->
          <!--                        本月签单金额集团排名第-->
          <!--                        <span>{{2}}</span> 名-->
          <!--                    </div>-->
        </div>
        <span href="#" slot="extra" style="color: #999"
          >{{ new Date().format('yyyy-MM-dd') }} &nbsp;{{ RetnW() }}</span
        >
        <div class="cardRow-my" v-show="openFlag">
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
                        statistics_wrap_hover: true,
                        statistics_wrap_seleted: item.fieldValue == findObj.statisticsTerm
                      }"
                      @click="setStatistics(item.fieldValue)"
                      :style="{ cursor: 'pointer' }"
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
          </Row>
        </div>
      </Card>
      <div
        class="cardRightStyle"
        v-if="myButtonPrem.indexOf('taskPage') >= 0 || myButtonPrem.indexOf('ctTplPage') >= 0"
        :class="{ cardRightStyleMax: openFlag }"
      >
        <div @click="toTaskCenter" v-if="myButtonPrem.indexOf('taskPage') >= 0">
          <span class="IconTask">
            <span v-if="totalTaskNum > 0 && openFlag">{{ totalTaskNum }}</span>
            <img src="../../assets/img/task.png" alt="" />
            <b v-if="openFlag">{{
              $t('modules_spoc_crm_web_src_views_mycustomer_mycustomer_1387')
            }}</b>
          </span>
        </div>
        <div @click="toContract" v-if="!isSimSign && myButtonPrem.indexOf('ctTplPage') >= 0">
          <img src="../../assets/img/get-name.png" alt="" />
          <b v-if="openFlag">{{
            $t('modules_spoc_crm_web_src_views_activityenrollment_index_774')
          }}</b>
        </div>
      </div>
    </div>
    <v-search-collapse
      @search="search"
      @reset="resetSearch"
      :hasTag="hasTag"
      ref="searchCollapseRef"
      @userLabelTrueChoose="userLabelTrueChoose"
      @changeDivHeight="changeDivHeight"
      @userLabelTrueChooseClear="userLabelTrueChooseClear"
    >
      <DatePicker
        split-panels
        @on-open-change="setOptTime1"
        v-model="optTime"
        ref="DatePicker1"
        type="daterange"
        @on-change="loginDataChange"
        placement="bottom-start"
        separator=" ~ "
        :options="options1"
        transfer="true"
        style="width: 224px"
        :placeholder="$t('modules_spoc_crm_web_src_views_customermanagement_index_1259')"
        :clearable="true"
      ></DatePicker>
      <treeSelectCos ref="ownerOfficeIds"></treeSelectCos>
      <DatePicker
        ref="DatePicker2"
        :options="options2"
        split-panels
        @on-open-change="setOptTime2"
        v-model="flTime"
        type="daterange"
        @on-change="flTimeChange"
        placement="bottom-start"
        separator=" ~ "
        transfer="true"
        style="width: 224px"
        :placeholder="$t('modules_spoc_crm_web_src_views_customermanagement_index_1274')"
        :clearable="true"
      ></DatePicker>
      <Input v-model.trim="findObj.cusCode" placeholder="客户编号"></Input>
      <Input v-model.trim="findObj.name" placeholder="客户姓名"></Input>
      <Input v-model="findObj.phone" placeholder="客户电话"></Input>
      <Input v-model="findObj.wechat" clearable placeholder="客户微信" />
      <Select
        placeholder="渠道来源"
        clearable
        multiple
        filterable
        v-model="findObj.querySources"
        @on-change="firstSourceChange"
      >
        <Input v-model.trim="querySourcesKey" clearable style="width:180px;margin-left:12px" placeholder="请输入关键字" />
        <Option
          v-for="item in crm_customer_source"
          v-show="item.name.indexOf(querySourcesKey) >=0"
          :value="item.value"
          :key="item.value"
          v-if="findObj.querySources.indexOf(item.value) >= 0"
          >{{ item.name }}</Option
        >
        <Option
          v-for="item in crm_customer_source"
          v-show="item.name.indexOf(querySourcesKey) >=0"
          :value="item.value"
          :key="item.value"
          v-if="findObj.querySources.indexOf(item.value) < 0"
          >{{ item.name }}</Option
        >
      </Select>
      <Select
        v-model="findObj.registerId"
        placeholder="登记人"
        clearable
        filterable="true"
        remote
        @on-query-change="changeRegisterId"
        :remote-method="remoteRegisterPerson"
      >
        <Option v-for="item in registerPersonList" :value="item.value" :key="item.value">{{
          item.name
        }}</Option>
      </Select>
      <Select
        v-model="findObj.followerId"
        placeholder="跟进人"
        clearable
        filterable="true"
        @on-query-change="changeFllower"
        remote
        :remote-method="remoteFollowUp"
      >
        <Option v-for="item in followUpList" :value="item.value" :key="item.value">{{
          item.name
        }}</Option>
      </Select>
      <DatePicker
        v-model="allocTime"
        @on-change="allocTimeChange"
        type="daterange"
        :clearable="true"
        placement="bottom-start"
        separator=" ~ "
        placeholder="分配日期范围"
        style="width: 206px"
      ></DatePicker>
      <Select
        v-model="findObj.allocerId"
        placeholder="分配人"
        clearable
        filterable="true"
        remote
        @on-query-change="changeAllocerId"
        :remote-method="remoteAssigner"
      >
        <Option v-for="item in assignerList" :value="item.value" :key="item.value">{{
          item.name
        }}</Option>
      </Select>
      <Select
        v-model="findObj.officeIds"
        clearable
        multiple
        :max-tag-count="2"
        :placeholder="$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_689')"
        @on-change="officeIdChange"
      >
        <Option
          v-for="item in officeIdList"
          :value="item.id"
          :label="code(item.code) + item.name"
          :key="item.id"
          v-if="findObj.officeIds.indexOf(item.id) >= 0"
          >{{ item.code }}{{ item.name }}
        </Option>
        <Option
          v-for="item in officeIdList"
          :value="item.id"
          :label="code(item.code) + item.name"
          :key="item.id"
          v-if="findObj.officeIds.indexOf(item.id) < 0"
          >{{ item.code }}{{ item.name }}
        </Option>
      </Select>
      <Select
        v-model="findObj.selectOfficeIds"
        clearable
        multiple
        :max-tag-count="2"
        placeholder="选择中心"
      >
        <Option
          v-for="item in officeIdList"
          :value="item.id"
          :key="item.id"
          v-if="findObj.selectOfficeIds.indexOf(item.id) >= 0"
          >{{ item.code }}{{ item.name }}
        </Option>
        <Option
          v-for="item in officeIdList"
          :value="item.id"
          :key="item.id"
          v-if="findObj.selectOfficeIds.indexOf(item.id) < 0"
          >{{ item.code }}{{ item.name }}
        </Option>
      </Select>
      <!-- <Select
                v-model="findObj.ownerOfficeIds"
                clearable
                multiple
                :max-tag-count="2"
                placeholder="归属校区"
                @on-change="officeIdChange">
                <Option
                    v-for="item in officeIdList"
                    :value="item.id"
                    :key="item.id">{{item.code}}{{item.name}}
                </Option>
            </Select> -->
      <!--   v-model="findObj.ownerOfficeIds"
                    :options="GLR.officeIdList" -->
      <DatePicker
        v-model="startEndDate"
        @on-change="startEndDateChange"
        type="daterange"
        placement="bottom-start"
        separator=" ~ "
        transfer="true"
        style="width: 224px"
        placeholder="统计日期范围"
        :clearable="true"
      ></DatePicker>
      <div class="borderStyle" style="width: 292px">
        <InputNumber
          :active-change="true"
          style="margin-right: 12px"
          @on-change="restLeft"
          v-model="findObj.traceFollowCountStart"
          :min="0"
          :placeholder="$t('modules_spoc_crm_web_src_views_customermanagement_index_1275')"
        ></InputNumber>
        <InputNumber
          :active-change="true"
          @on-change="restRight"
          v-model="findObj.traceFollowCountEnd"
          :min="0"
          :placeholder="$t('modules_spoc_crm_web_src_views_customermanagement_index_1276')"
        ></InputNumber>
      </div>
      <Input
        v-model="findObj.studentName"
        clearable
        :placeholder="$t('classlist_compontents_detailinfo_35')"
      ></Input>
      <form-create
        ref="fc"
        v-model="fApi"
        :rule="rule"
        :option="option"
        class="form_create"
        style="margin-right: 0"
      ></form-create>
    </v-search-collapse>
    <div class="my-tags">
      <Tabs
        :value="TabPaneChangeval"
        @on-click="TabPaneChange"
        style="margin-bottom: -14px; margin-top: 12px"
      >
        <TabPane
          :label="item.groupName + '(' + item.count + ')'"
          :name="item.groupName"
          v-for="(item, index) in additionalObjectNew"
          :key="index"
        ></TabPane>
      </Tabs>
    </div>
    <big-table
      ref="myCustomer"
      v-if="defaultShowCol"
      :tableHeightOut="tableHeightOut"
      :pageNo="pageNo"
      class="mytable"
      :tableData="tableData"
      :tableColumnArray="tableColumnArray"
      :defaultShowCol="defaultShowCol"
      :canSelection="true"
      :dataTotal="dataTotal"
      :btnList="btnList"
      :canChangeHeight="true"
      :isShowSelectTableColumn="true"
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
      <div
        slot="tableNameSlot"
        class="table-name-slot-style-custom"
        v-if="TabPaneChangeval != '无效池'"
      >
        <span v-for="(item, index) in statisticsList" :key="index"
          >{{ index > 0 ? '，' : '' }}{{ item.fieldName }}
          <a>{{ statisticsMap[item.fieldValue] }}</a
          >个</span
        >
      </div>
    </big-table>
    <assignLeadsBySingle
      ref="assignLeadsBySingle"
      @assign-success="getListsFn"
    ></assignLeadsBySingle>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex';
import bigTable from '@public/modules/bigTable.vue';
import exportModal from '@public/modules/exportModal.vue';
import vSearchCollapse from '@public/modules/vSearchCollapse';
import valid, {
  errors,
  crmCustomer,
  sysUser,
  sysDict,
  sysConfig,
  common,
  sysCommonSql,
  crmCustomerStatus,
  crmCustomerStatistics,
  sysProps,
  api
} from '../../libs/request';
import {
  waitUntil,
  DatePickerOpt,
  defaultDatePickerValue,
  titleTransformationToLabel,
  getSelectIdsByid,
  getSelectTreeDataByid
} from '@public/libs/util';
import assignLeadsBySingle from '../customerManagement/assignLeadsBySingle';
import formCreateSetting from './formCreate.js';
import treeSelectCos from '@public/modules/treeSelectCos';
export default {
  name: 'crm.myCustomer',
  mixins: [formCreateSetting],
  data() {
    return {
      curViewId: '',
      startEndDate: [],
      GLR: {
        officeIdList: []
      },
      parentOfficeId: '',
      ininOfficeIdList: [],
      valueConsistsOf: 'LEAF_PRIORITY', // ALL、BRANCH_PRIORITY、LEAF_PRIORITY、ALL_WITH_INDETERMINATE
      openFlag: false, //展开 true,收起 false
      tableHeightOut: 72 + 45 + 56, //324,
      disableOperate: {},
      additionalObjectNew: [],
      statisticsMap: {},
      statisticsList: [],
      hasTag: true,
      TabPaneChangeval: '',
      updateShowTitleKey: 'crm.myCustomer',
      updateShowTitle: crmCustomer.updateShowTitle,
      btnList: [],
      btnList1: [],
      optTime: [],
      flTime: [],
      allocTime: [],
      options1: null,
      options2: null,
      officeIdList: [],
      phoneList: [],
      registerPersonList: [],
      assignerList: [],
      followUpList: [],
      crm_customer_source: [],
      querySourcesKey: '',
      // crm_customer_secondSource: [],
      // crm_customer_thirdSource: [],
      findObj: {
        cusCode: '',
        startDate: '',
        endDate: '',
        registStartTime: '',
        registEndTime: '',
        followStartTime: '',
        followEndTime: '',
        officeIds: [],
        ownerOfficeIds: [],
        name: '',
        phone: '',
        wechat: '',
        studentName: '',
        querySources: [],
        // secondSource: "",
        // thirdSource: "",
        registerId: '',
        allocerId: '',
        followerId: '',
        tagsArr: [],
        traceFollowCountStart: '',
        traceFollowCountEnd: '',
        fieldJsonData: {},
        selectOfficeIds: [],
        orderByStatus: '',
        orderByType: ''
      },
      pageNo: 1,
      pageSize: this.$store.state.app.pageSizeGlobal,
      // pageSize: 5,
      defaultShowCol: null,
      dataTotal: 0,
      tableColumnArray: [],
      tableColumnArray0: [
        {
          key: 'cusCode',
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
          width: 120,
          render: (h, params) => {
            return h('div', [
              h(
                'a',
                {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    marginRight: '8px',
                    display: this.myButtonPrem.indexOf('crmDetail') >= 0 ? 'inline-block' : 'none'
                  },
                  // this.ifInclude(params.row.status,'details')&& 直接去掉——by杨乔
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
                      0 && this.ifInclude(params.row.status, 'assign') ? 'inline-block' : 'none'
                  },
                  on: {
                    click: (e) => {
                      e.stopPropagation();
                      this.$refs.assignLeadsBySingle.show(params.row.id);
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
                      params.row.salerTraceFollowCount > 0 &&
                      this.getCanAction(params.row.status, 'invalid') &&
                      this.ifInclude(params.row.status, 'invalid') &&
                      this.myButtonPrem.indexOf('editEffective') >= 0
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
                  style: {
                    display: 'inline-block'
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
            ]);
          }
        }
      ],
      tableColumnArray2: [
        {
          title: this.$t('classlist_compontents_detailinfo_45'),
          key: 'doAction',
          width: 80,
          render: (h, params) => {
            return h('div', [
              h(
                'a',
                {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    marginRight: '8px',
                    display: this.myButtonPrem.indexOf('crmDetail') >= 0 ? 'inline-block' : 'none'
                  },
                  on: {
                    click: () => {
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
                      this.myButtonPrem.indexOf('editEffective') >= 0 &&
                      this.getCanAction(params.row.status, 'activation')
                        ? 'inline-block'
                        : 'none'
                  },
                  on: {
                    click: (e) => {
                      e.stopPropagation();
                      let obj = {
                        title: this.$t('modules_spoc_crm_web_src_views_mycustomer_mycustomer_1413'),
                        content:
                          this.$t('modules_spoc_crm_web_src_views_mycustomer_mycustomer_1414') +
                          '<br/>' +
                          this.$t('modules_spoc_crm_web_src_views_mycustomer_mycustomer_1415') +
                          '<span style="color:#FF0000">' +
                          params.row.statusLabel +
                          '</span>',
                        onOk: () => {
                          let arr = [params.row.id];
                          this.changeStatus('0', arr);
                        }
                      };
                      this.$Modal.confirm(obj);
                    }
                  }
                },
                this.$t('modules_spoc_crm_web_src_views_mycustomer_mycustomer_1413')
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
                    display: 0 && true ? 'inline-block' : 'none'
                  },
                  on: {
                    click: (e) => {
                      e.stopPropagation();
                      this.$refs.assignLeadsBySingle.show(params.row.id);
                    }
                  }
                },
                this.$t('modules_spoc_crm_web_src_views_customermanagement_index_1287')
              )
            ]);
          }
        }
      ],
      tableData: [],
      selectedIds: [], //选中的ids
      currentIds: [], //当前页的ids
      setButton: [], //配置的按钮规则
      isEffective: '0',
      statusArr: [],
      totalTaskNum: '0',
      myButtonPrem: [],
      filterObj: {},
      isSimSign: false,
      statisticsTerm: '',
      themeColor: ''
    };
  },
  computed: {
    ...mapState(['app', 'buttonPerm', 'calendarConfig']),
    // myButtonPrem(){
    //     // console.log(this.buttonPerm['crm.myCustomer'])
    //     return this.buttonPerm['crm.myCustomer'] || []
    // },
    spanSurplus() {
      return (
        (24 - Math.floor(24 / this.statisticsList.length) * this.statisticsList.length) /
        Math.floor(this.statisticsList.length / 2)
      );
    }
  },
  components: {
    bigTable,
    exportModal,
    vSearchCollapse,
    assignLeadsBySingle,
    treeSelectCos
  },

  mounted() {
    // this.updateLoadingStatus({ isLoading: true });
    let colors = {
      blue: '#2E86FF',
      coral: 'rgb(255, 122, 84)',
      default: '#44bcb7',
      grass: 'rgb(136, 176, 75)',
      iris: 'rgb(114, 115, 222)',
      orange: 'rgb(255, 204, 0)'
    };
    this.themeColor = colors[localStorage.getItem('theme')] || '#44bcb7';
    let params = {
      tenantCode: localStorage.getItem('tenant')
    };
    api
      .getByTenantCode(params)
      .then(valid.call(this))
      .then((res) => {
        if (res.ok) {
          console.log(res.data.data, 'getByTenantCode~');
          this.isSimSign = res.data.data.version.code == 'crm'; //简版合同
          this.init();
        }
      })
      .catch(errors.call(this));
  },
  methods: {
    ...mapMutations(['updateLoadingStatus']),
    rowClassName(row, index) {
      if (row.id == this.curViewId) {
        return 'highLight';
      }
      return '';
    },
    init() {
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
          this.getShowTitle();
          this.getInitData(); // 获取校区
          this.performanceData(); // 获取顶部统计相关业绩
          this.batchListDataFn(); // 获取渠道来源
          this.getConfigSubFn(); // 获取按钮规则
          this.getcustomerList(); // 混合在用
          waitUntil(
            () => {
              return (
                (this.app.currOfficeId &&
                  JSON.stringify(this.buttonPerm) != '{}' &&
                  this.buttonPerm) ||
                false
              );
            },
            () => {
              this.tableColumnArray = this.tableColumnArray0;

              let btnList1 = [
                {
                  style: {},
                  type: '',
                  btnClick: this.joinValid,
                  text: this.$t('modules_spoc_crm_web_src_views_customerchangelog_index_1175')
                }
              ];
              if (this.buttonPerm['crm.myCustomer'].indexOf('saveMyCus') >= 0) {
                btnList1.unshift({
                  style: {},
                  type: '',
                  btnClick: this.jumpEntry,
                  // tipTheme:'light',
                  // tipContent:'从此录入的客户会直接分配给自己',
                  // tipPlacement:'top',
                  text: '录入我的客户'
                });
              }
              this.btnList1 = btnList1;

              this.btnList = this.btnList1;
              // this.TabPaneChange('已分配')

              this.optTime = defaultDatePickerValue(this.calendarConfig.maxMonthInterval);
              this.options1 = DatePickerOpt(
                this,
                'DatePicker1',
                Number(this.calendarConfig.maxMonthInterval)
              );
              this.options2 = DatePickerOpt(
                this,
                'DatePicker2',
                Number(this.calendarConfig.maxMonthInterval)
              );
              this.loginDataChange();
              // this.getListStateGroup(1)

              this.getTreeDatas(1);
              this.myButtonPrem = this.buttonPerm['crm.myCustomer'] || [];
            }
          );
        });
    },
    getCanAction(status, actionName) {
      // 获取的操作项对应值。。担心与设定的权限点不是一样的key
      // 0: {name: "详情", value: "details"}
      // 1: {name: "分配", value: "assign"}
      // 2: {name: "无效", value: "invalid"}
      // 3: {name: "激活", value: "activation"}
      // 4: {name: "首次录入", value: "input", isSys: "true"}
      // 5: {name: "合同付清", value: "payOff", isSys: "true"}
      // 6: {name: "回退", value: "return", isSys: "true"}
      // 7: {name: "合同完结", value: "finish", isSys: "true"}
      // 8: {name: "签约", value: "sign", isSys: "true"}
      // 9: {name: "有效通话", value: "call", isSys: "true"}
      // 10: {name: "日常跟进", value: "follow", isSys: "true"}
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
      console.log('on-filter-change~~~~1`', filterObj);
      this.filterObj = filterObj;
      this.pageNo = 1;
      this.tableData = [];
      this.getListStateGroup();
      this.getLists();
      this.getStatisticsName();
    },
    sortChange(sortObj) {
      console.log(sortObj, '~~~~~~~~~~~~');
      this.findObj.orderByType = sortObj.key;
      if (sortObj.order == 'asc') {
        //升序
        this.findObj.orderByStatus = 1;
      } else if (sortObj.order == 'desc') {
        //desc 降序
        this.findObj.orderByStatus = 2;
      } else {
        this.findObj.orderByStatus = '';
        this.findObj.orderByType = '';
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
          query: {
            id: row.id
          }
        });
      }
    },
    // 获取校区树形下拉数据
    getTreeDatas(key) {
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
              this.initOffice(key);
            }
          }
        })
        .catch(errors.call(this))
        .finally(() => {
          // this.updateLoadingStatus({isLoading:false});
        });
    },
    initOffice(key) {
      this.$refs.ownerOfficeIds.officeIdList = this.ininOfficeIdList;
      if (this.app.currOfficeId == 'all' || this.app.currOfficeId == this.parentOfficeId) {
        this.$refs.ownerOfficeIds.officeIds = [];
        this.$set(this.findObj, 'ownerOfficeIds', []);
        this.$nextTick(() => {
          this.$forceUpdate();
        });
      } else {
        let resultSelectObj = {};
        getSelectTreeDataByid(this.ininOfficeIdList, resultSelectObj);
        let resultIdsObj = {};
        getSelectIdsByid(this.ininOfficeIdList, resultIdsObj);
        // this.$set(this.GLR, 'officeIdList', [resultSelectObj[this.app.currOfficeId]]);
        this.$set(this.findObj, 'ownerOfficeIds', resultIdsObj[this.app.currOfficeId]);
        this.$refs.ownerOfficeIds.officeIds = resultIdsObj[this.app.currOfficeId];
        this.$nextTick(() => {
          this.$forceUpdate();
        });
      }
      if (key) {
        this.getListStateGroup(key);
      } else {
        this.getListStateGroup();
        this.getLists();
        this.getStatisticsName();
      }
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
    setOptTime1(flag) {
      if (flag) {
        this.optTime = [];
        this.loginDataChange();
      }
    },
    setOptTime2(flag) {
      if (flag) {
        this.flTime = [];
        this.flTimeChange();
      }
    },
    // 获取表头部的统计类别及数据
    getStatisticsName() {
      let params = {
        menuId: '2001',
        configId: 'crm:statisticsState',
        subArrKey: 'type',
        subArrValue: 'my customer list',
        subArrGetKey: 'group'
      };
      sysConfig
        .getConfigSub(params)
        .then(valid.call(this))
        .then((res) => {
          if (res.ok) {
            this.statisticsList = res.data.data;
            this.crmCustomerStatistics();
          }
        })
        .catch(errors.call(this))
        .finally(() => {});
    },
    // 获取表头部的统计数据
    crmCustomerStatistics() {
      let param = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        stateGroupType: 'my customer list'
      };
      param = Object.assign({}, param, this.findObj);
      param.isEffective = this.isEffective;
      param.statusArr = this.statusArr;
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
    // 起止次数查询
    restLeft(num) {
      if (num > this.findObj.traceFollowCountEnd) {
        this.findObj.traceFollowCountEnd = num;
        if (this.findObj.traceFollowCountEnd <= 0) {
          this.findObj.traceFollowCountEnd = 0;
        }
      }
    },
    // 起止次数查询
    restRight(num) {
      if (this.findObj.traceFollowCountStart > num) {
        this.findObj.traceFollowCountStart = num;
        if (this.findObj.traceFollowCountStart <= 0) {
          this.findObj.traceFollowCountStart = 0;
        }
      }
    },
    changeDivHeight(height) {
      this.tableHeightOut = height + 156 + 56;
    },
    code(code) {
      let cd = code ? code : '';
      return cd;
    },
    getTodayServicesNum() {
      //今日任务数
      // this.updateLoadingStatus({ isLoading: true });
      let time = new Date().format('yyyy-MM-dd');
      let params = {
        tabType: '0',
        startTime: time + ' 00:00:00',
        endTime: time + ' 23:59:59',
        type: '',
        status: '0'
      };
      common
        .listPageComTask(params)
        .then(valid.call(this))
        .then((res) => {
          if (res.ok) {
            this.totalTaskNum = res.data.data.total;
            // console.log(res.data.data)
          }
        })
        .catch(errors.call(this))
        .finally(() => {
          // this.updateLoadingStatus({ isLoading: false });
        });
    },
    toContract() {
      this.$router.push({
        name: 'sign.pact',
        query: {
          id: '--',
          form: 'crm.myCustomer'
        }
      });
    },
    toTaskCenter() {
      this.$router.push({
        name: 'crm.taskCenter'
      });
    },
    changeFllower(val) {
      if (val == '') {
        this.followUpList = [];
      }
    },
    changeAllocerId(val) {
      if (val == '') {
        this.assignerList = [];
      }
    },
    changeRegisterId(val) {
      if (val == '') {
        this.registerPersonList = [];
      }
    },
    getListsFn() {
      this.pageNo = 1;
      this.getListStateGroup();
      this.getLists();
      this.getStatisticsName();
    },
    ifInclude(status, type) {
      // console.log(status,type)
      let boo = 'false';
      this.setButton.forEach((item) => {
        if (item.value == status) {
          // && this.myButtonPrem.indexOf("details") >= 0
          if (item.button.includes(type)) {
            boo = 'true';
          }
        }
      });
      // console.log(boo)
      return boo;
    },
    // 获取按钮规则
    getConfigSubFn() {
      // this.updateLoadingStatus({ isLoading: true });
      let params = {
        menuId: '2001',
        configId: 'crm:customState',
        subArrKey: 'child',
        subArrGetKey: 'transferOutOpt'
      };
      sysConfig
        .getConfigSub(params)
        .then(valid.call(this))
        .then((res) => {
          if (res.ok) {
            this.setButton = res.data.data;
          }
        })
        .catch(errors.call(this))
        .finally(() => {
          // this.updateLoadingStatus({ isLoading: false });
        });
    },
    //获取顶部统计相关业绩
    performanceData() {
      // this.updateLoadingStatus({ isLoading: true });
    },
    userLabelTrueChoose(data) {
      this.findObj.tagsArr = data;
      this.pageNo = 1;
      this.getListStateGroup();
      this.getLists();
      this.getStatisticsName();
    },
    userLabelTrueChooseClear(data) {
      this.findObj.tagsArr = data;
      this.pageNo = 1;
      this.getListStateGroup();
      this.getLists();
      this.getStatisticsName();
    },
    changeStatus(toStatus, arr) {
      let params = {
        isEffective: toStatus,
        ids: arr
      };
      crmCustomerStatus
        .modifyEffective(params)
        .then(valid.call(this))
        .then((res) => {
          if (res.ok) {
            this.pageNo = 1;
            this.getListStateGroup();
            this.getLists();
            this.getStatisticsName();
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
    //跟进人
    remoteFollowUp(query) {
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
            this.followUpList = res.data.data;
          }
        })
        .catch(errors.call(this));
    },
    //分配人
    remoteAssigner(query) {
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
            this.assignerList = res.data.data;
          }
        })
        .catch(errors.call(this));
    },
    //登记人
    remoteRegisterPerson(query) {
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
            this.registerPersonList = res.data.data;
          }
        })
        .catch(errors.call(this));
    },
    firstSourceChange() {
      // this.crm_customer_secondSource = [];
      // this.findObj.secondSource = "";
      // this.crm_customer_thirdSource = [];
      // this.findObj.thirdSource = "";
      // this.batchListDataFn(1);
    },
    // secondSourceChange() {
    //     this.crm_customer_thirdSource = [];
    //     this.findObj.thirdSource = "";
    //     this.batchListDataFn(2);
    // },
    // 获取渠道来源
    batchListDataFn() {
      sysDict
        .getDictStringTree({ type: 'crm_customer_source' })
        .then(valid.call(this))
        .then((res) => {
          if (res.ok) {
            this.crm_customer_source = res.data.data;
          }
        })
        .catch(errors.call(this))
        .finally(() => {
          // this.updateLoadingStatus({ isLoading: false });
        });
      // let types;
      // if (val == 1) {
      //     types = this.findObj.firstSource;
      // } else if (val == 2) {
      //     types = this.findObj.secondSource;
      // } else {
      //     types = "crm_customer_source";
      // }
      // sysDict
      // .batchListData({
      //     types
      // })
      // .then(valid.call(this))
      // .then(res => {
      //     if (res.ok) {
      //         if (val == 1) {
      //             this.crm_customer_secondSource =
      //                 res.data.data[types];
      //         } else if (val == 2) {
      //             this.crm_customer_thirdSource =
      //                 res.data.data[types];
      //         } else {
      //             this.crm_customer_source =
      //                 res.data.data.crm_customer_source;
      //         }
      //     }
      // })
      // .catch(errors.call(this))
      // .finally(() => {
      //     // this.updateLoadingStatus({ isLoading: false });
      // });
    },
    joinValid() {
      // console.log(this.selectedIds)
      if (this.selectedIds.length > 0) {
        let config = {
          okText: this.$t('modules_spoc_crm_web_src_views_mycustomer_mycustomer_1416'),
          title: this.$t('modules_spoc_crm_web_src_views_mycustomer_mycustomer_1417'),
          width: 400,
          content: this.$t('modules_spoc_crm_web_src_views_mycustomer_mycustomer_1418', [
            this.selectedIds.length
          ]),
          onOk: () => {
            this.changeStatus('1', this.selectedIds);
          }
        };
        this.$Modal.confirm(config);
      } else {
        this.$Message.warning(this.$t('modules_spoc_crm_web_src_views_mycustomer_mycustomer_1419'));
      }
    },
    joinValidBySingle(id, val) {
      let config = {
        okText: this.$t('modules_spoc_crm_web_src_views_mycustomer_mycustomer_1416'),
        title: this.$t('modules_spoc_crm_web_src_views_mycustomer_mycustomer_1420'),
        width: 350,
        content:
          this.$t('modules_spoc_crm_web_src_views_mycustomer_mycustomer_1421') +
          '<span style="color:#FE6565;">' +
          this.$t('modules_spoc_crm_web_src_views_mycustomer_mycustomer_1422') +
          '</span>' +
          this.$t('modules_spoc_crm_web_src_views_mycustomer_mycustomer_1423'),
        onOk: () => {
          // console.log(id)
          let arr = [id];
          this.changeStatus(val, arr);
        }
      };
      this.$Modal.confirm(config);
    },
    RetnW() {
      let date = new Date();
      let day = date.getDay();
      let weeks = [
        this.$t('modules_spoc_crm_web_src_views_mycustomer_mycustomer_1424'),
        this.$t('modules_spoc_crm_web_src_views_mycustomer_mycustomer_1425'),
        this.$t('modules_spoc_crm_web_src_views_mycustomer_mycustomer_1426'),
        this.$t('modules_spoc_crm_web_src_views_mycustomer_mycustomer_1427'),
        this.$t('modules_spoc_crm_web_src_views_mycustomer_mycustomer_1428'),
        this.$t('modules_spoc_crm_web_src_views_mycustomer_mycustomer_1429'),
        this.$t('modules_spoc_crm_web_src_views_mycustomer_mycustomer_1430')
      ];
      let week = weeks[day];
      return week;
    },
    TabPaneChange(name) {
      console.log(name);
      // console.log(this.additionalObjectNew)
      this.selectedIds = []; //切换tab的时候置空选中的数据
      this.TabPaneChangeval = name;
      this.statusArr = [];
      for (let i in this.additionalObjectNew) {
        // if(this.additionalObjectNew[i].groupName == name && name != this.$t('modules_spoc_crm_web_src_views_mycustomer_mycustomer_1406')){
        if (this.additionalObjectNew[i].groupName == name && name != '无效池') {
          this.statusArr = this.additionalObjectNew[i].states.map((v) => v.value);
        }
      }
      if (name == '无效池') {
        // if(name == this.$t('modules_spoc_crm_web_src_views_mycustomer_mycustomer_1406')){
        this.isEffective = '1';
        this.btnList = [];
        this.tableColumnArray = this.tableColumnArray2;
      } else {
        this.isEffective = '0';
        this.tableColumnArray = this.tableColumnArray0;
        this.btnList = this.btnList1;
      }
      this.getListStateGroup();
      this.getLists(name);
      this.getStatisticsName();
    },
    getInitData() {
      //校区列表
      sysUser
        .dataScopeFilter()
        .then(valid.call(this))
        .then((res) => {
          if (res.ok) {
            this.officeIdList = res.data.data;
          }
        })
        .catch(errors.call(this));
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
    },
    // 获取tab内容
    getListStateGroup(key) {
      // this.updateLoadingStatus({ isLoading: true });
      let param = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        stateGroupType: 'my customer list'
      };
      param = Object.assign({}, param, this.findObj);
      param.ownerOfficeIds = this.$refs.ownerOfficeIds.officeIds;
      // param.statusArr = this.statusArr
      param.isEffective = this.isEffective;
      crmCustomer
        .listStateGroup(param)
        .then(valid.call(this))
        .then((res) => {
          if (res.ok) {
            this.additionalObjectNew = res.data.data;
            if (key) {
              this.selectedIds = []; //切换tab的时候置空选中的数据
              // this.statusArr=[];
              this.pageNo = 1;
              // console.log(this.additionalObjectNew)
              // for(let i in this.additionalObjectNew){
              //     if(this.additionalObjectNew[i].groupName == name && name != '无效池'){
              //         this.statusArr=this.additionalObjectNew[i].states.map(v=>v.value);
              //     }
              // }
              this.statusArr = this.additionalObjectNew[0].states.map((v) => v.value);
              this.getLists();
              this.getStatisticsName();
            }
          }
        })
        .catch(errors.call(this))
        .finally(() => {
          // this.updateLoadingStatus({ isLoading: false });
        });
    },
    // 获取表格数据
    getLists() {
      // console.log(this.TabPaneChangeval,900)
      this.updateLoadingStatus({ isLoading: true });
      let param = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      };
      param = Object.assign({}, param, this.findObj);
      param.isEffective = this.isEffective;
      param.statusArr = this.statusArr;
      param.ownerOfficeIds = this.$refs.ownerOfficeIds.officeIds;
      if (!this.statusArr) {
        return;
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
      crmCustomer
        .listPage(param)
        .then(valid.call(this))
        .then((res) => {
          if (res.ok) {
            let data = res.data;
            // this.additionalObjectNew = data.data.additionalObject;
            this.dataTotal = data.data.total;
            let d = data.data.list;
            this.pageNo = data.data.pageNum ? data.data.pageNum : 1;
            this.currentIds = [];
            this.pageSize = data.data.pageSize ? data.data.pageSize : 20;
            for (let i in d) {
              this.currentIds.push(d[i].id);
              if (this.selectedIds.includes(d[i].id)) {
                d[i]._checked = true;
              }
            }
            this.tableData = d;
          }
        })
        .catch(errors.call(this))
        .finally(() => {
          this.updateLoadingStatus({ isLoading: false });
        });
    },
    loginDataChange(date) {
      this.findObj.registStartTime = this.optTime[0]
        ? this.optTime[0].format('yyyy-MM-dd 00:00:00')
        : '';
      this.findObj.registEndTime = this.optTime[1]
        ? this.optTime[1].format('yyyy-MM-dd 23:59:59')
        : '';
    },
    flTimeChange(date) {
      this.findObj.followStartTime = this.flTime[0]
        ? this.flTime[0].format('yyyy-MM-dd 00:00:00')
        : '';
      this.findObj.followEndTime = this.flTime[1]
        ? this.flTime[1].format('yyyy-MM-dd 23:59:59')
        : '';
    },
    startEndDateChange(date) {
      this.findObj.startDate = this.startEndDate[0]
        ? this.startEndDate[0].format('yyyy-MM-dd 00:00:00')
        : '';
      this.findObj.endDate = this.startEndDate[1]
        ? this.startEndDate[1].format('yyyy-MM-dd 23:59:59')
        : '';
    },
    allocTimeChange(date) {
      this.findObj.allocStartTime = this.allocTime[0]
        ? this.allocTime[0].format('yyyy-MM-dd 00:00:00')
        : '';
      this.findObj.allocEndTime = this.allocTime[1]
        ? this.allocTime[1].format('yyyy-MM-dd 23:59:59')
        : '';
    },
    //获取数据，根据情况修改接口、传参
    search() {
      let $f = this.fApi;
      let formData = $f.formData();
      for (let i in formData) {
        if (Array.isArray(formData[i])) {
        } else {
          formData[i] = [formData[i]];
        }
      }
      this.findObj.fieldJsonData = formData;
      this.$nextTick(() => {
        this.pageNo = 1;
        this.getListStateGroup();
        this.getLists();
        this.getStatisticsName();
      });
    },
    //分页方法 如果有分页则为必须方法，修改getCourseList为自己的获取数据方法 这里注意。不再有每页个数改变的方法了
    pageChange(pageNo, pageSize) {
      if (!pageNo) {
        return;
      }
      this.pageNo = pageNo;
      this.pageSize = pageSize;
      this.getListStateGroup();
      this.getLists();
      this.getStatisticsName();
    },
    //必须方法，获取默认显示的可选列  接口根据需要自行更换，每个模块的接口是不一致的
    getShowTitle(closeLoad) {
      crmCustomer
        .getShowTitle({
          pageIdentifier: 'crm.myCustomer',
          voName: 'com.windliven.spoc.modules.crm.vo.CrmCustomerVO',
          tableName: 'crm_customer'
        })
        .then(valid.call(this))
        .then((res) => {
          if (res.ok) {
            this.defaultShowCol = res.data.data;
          }
        })
        .catch(errors.call(this))
        .finally(() => {
          if (closeLoad) {
            this.updateLoadingStatus({ isLoading: false });
          }
        });
    },
    resetSearch() {
      this.optTime = defaultDatePickerValue();
      this.flTime = [];
      for (let item in this.findObj) {
        if (typeof this.findObj[item] === 'string') {
          this.findObj[item] = '';
        }
        if (typeof this.findObj[item] === 'object') {
          this.findObj[item] = [];
        }
      }
      this.findObj.traceCountStart = '';
      this.findObj.traceCountEnd = '';
      // if (this.app.currOfficeId == "all") {
      //     this.findObj.ownerOfficeIds=[];
      // } else {
      //     this.findObj.ownerOfficeIds=[this.app.currOfficeId];
      // }
      let $f = this.fApi;
      $f.resetFields();
      // this.objfield.forEach(v=>{
      //     let obj={};
      //     v.value.forEach(val=>{
      //         obj.val='';
      //     })
      //     $f.setValue(v.field,obj);
      // })
      let formData = null;
      formData = $f.formData();
      for (let i in formData) {
        if (Array.isArray(formData[i])) {
        } else {
          formData[i] = [formData[i]];
        }
      }
      this.findObj.fieldJsonData = formData;
      this.loginDataChange();
      this.flTimeChange();
      this.startEndDateChange();
      this.allocTime = ['', ''];
      this.allocTimeChange();
      this.pageNo = 1;
      this.$refs.myCustomer.resetFilter();
      this.filterObj = {};
      this.$refs.searchCollapseRef.resetTrueFn();
      // this.getListStateGroup();
      // this.getLists();
    },
    changeOpenFlag() {
      this.openFlag = !this.openFlag;
      if (this.openFlag) {
        this.tableHeightOut = this.tableHeightOut + 156 - 45;
      } else {
        this.tableHeightOut = this.tableHeightOut - 156 + 45;
      }
    },
    jumpEntry() {
      this.$router.push({
        name: 'crm.leadsEntry',
        query: {
          source: 'crm.myCustomer'
        }
      });
    },
    setStatistics(val) {
      this.findObj.statisticsTerm = val;
      let $f = this.fApi;
      let formData = $f.formData();
      for (let i in formData) {
        if (Array.isArray(formData[i])) {
        } else {
          formData[i] = [formData[i]];
        }
      }
      this.findObj.fieldJsonData = formData;
      this.$nextTick(() => {
        this.pageNo = 1;
        this.getListStateGroup();
        this.getLists();
        this.getStatisticsName();
        this.performanceData();
      });
    }
  },
  watch: {
    'app.currOfficeId': function (val, oldVal) {
      if (oldVal && this.$route.name == 'crm.myCustomer') {
        //   if (this.app.currOfficeId == "all") {
        //       this.findObj.ownerOfficeIds=[];
        //     } else {
        //         this.findObj.ownerOfficeIds=[this.app.currOfficeId];
        //     }
        this.pageNo = 1;
        this.initOffice();
      }
    },
    '$route.name': {
      handler: function (val, oldVal) {
        if (val == 'crm.myCustomer') {
          let $f = this.fApi;
          let formData = $f.formData();
          for (let i in formData) {
            if (Array.isArray(formData[i])) {
            } else {
              formData[i] = [formData[i]];
            }
          }
          this.findObj.fieldJsonData = formData;
          this.$nextTick(() => {
            this.getListStateGroup();
            this.getLists();
            this.getStatisticsName();
            this.performanceData();
          });
        }
      },
      deep: true
    }
  }
};
</script>
