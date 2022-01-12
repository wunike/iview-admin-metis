<style lang="less">
.sales-follow-up-charts-wrapper {
  width: 100%;
  height: 100%;
  .search-top {
    height: 50px;
    width: ~"calc(100% - 60px)";
    margin: 0 auto;
    position: relative;
    .selects {
      position: absolute;
      left: 0;
      top: 0;
    }
    .time {
      text-align: center;
    }
    .ivu-radio-group {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  .market-charts-part,
  .pie-charts,
  .funnel-charts {
    margin: 0 auto;
    height: ~"calc(100% - 120px)";
  }
  .market-charts-part {
    width: ~"calc(100% - 60px)";
  }
  .pie-charts {
    width: 100%;
  }
  .pie-charts-part,
  .funnel-charts-part {
    float: left;
    width: 50%;
    height: 100%;
    position: relative;
    &:first-child {
      &:after {
        content: "";
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        width: 1px;
        background: #eee;
      }
    }
    .title {
      @h: 30px;
      height: @h;
      line-height: @h;
      font-size: 16px;
      padding-left: 30px;
      font-weight: bold;
    }
  }
  .funnel-charts-part {
    &:first-child {
      &:after {
        display: none;
      }
    }
  }
  .pie-charts-part-inner {
    width: ~"calc(100% - 80px)";
    height: ~"calc(100% - 30px)";
    margin: 0 auto;
  }
  .funnel-lists {
    padding-left: 30px;
    padding-top: 40px;
  }
  .funnel-item {
    @left: 80px;
    margin: 0 30px;
    position: relative;
    padding-left: @left;
    font-size: 14px;
    line-height: 30px;
    span {
      position: absolute;
      left: 0;
      top: 0;
      color: #333;
    }
    ul {
      zoom: 1;
      &::before,
      &::after {
        content: "";
        display: block;
        clear: both;
        height: 0;
        line-height: 0;
        font-size: 0;
      }
    }
    li {
      float: left;
      margin-right: 12px;
      cursor: pointer;
      color: #999;
      &.active {
        color: #000;
      }
    }
  }
}
</style>
<template>
    <div class="sales-follow-up-charts-wrapper">
        <Tabs v-model="chartType" @on-click="getOption">
            <TabPane :label="$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7251')" name="1"></TabPane>
            <TabPane :label="$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7252')" name="2"></TabPane>
            <TabPane :label="$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7253')" name="3"></TabPane>
        </Tabs>
        <div class="search-top">
            <div class="selects">
                <Select v-model="type" style="width:200px" v-if="chartType == 1">
                    <Option
                        v-for="item in typeLists"
                        :value="item.value"
                        :key="item.value"
                    >{{ item.label }}</Option>
                </Select>
                <div v-else>
                    <Select
                        v-model="officeId"
                        style="width: 200px;margin-right: 16px;"
                        clearable
                        :placeholder="$t('messagemanagement_index_352')"
                    >
                        <Option
                            v-for="item in officeLists"
                            :value="item.id"
                            :key="item.id"
                        >{{ item.name }}</Option>
                    </Select>
                    <Select v-model="sale" style="width:200px">
                        <Option
                            v-for="item in saleLists"
                            :value="item.value"
                            :key="item.value"
                        >{{ item.label }}</Option>
                    </Select>
                </div>
            </div>
            <div class="time">{{time}}</div>
            <RadioGroup v-model="timeType">
                <Radio
                    v-for="item in timeLists"
                    :key="item.value"
                    :label="item.value"
                >{{item.label}}</Radio>
            </RadioGroup>
        </div>
        <chart-spart1
            class="market-charts-part"
            key="1"
            v-if="option && chartType == 1"
            :option="option"
        ></chart-spart1>
        <div class="pie-charts" v-else-if="chartType == 2">
            <div class="pie-charts-part">
                <div class="title">{{$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7255')}}</div>
                <chart-spart1
                    class="pie-charts-part-inner"
                    key="2"
                    v-if="option2"
                    :option="option2"
                ></chart-spart1>
            </div>
            <div class="pie-charts-part">
                <div class="title">{{$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7256')}}</div>
                <chart-spart1
                    class="pie-charts-part-inner"
                    key="3"
                    v-if="option3"
                    :option="option3"
                ></chart-spart1>
            </div>
        </div>
        <div class="funnel-charts" v-if="chartType == 3">
            <div class="funnel-charts-part funnel-lists">
                <div class="funnel-item">
                    <span>{{$t('modules_spoc_crm_web_src_views_marketcharts_marketchartspart1_1353')}}</span>
                    <ul>
                        <li class="active">{{$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7258')}}</li>
                        <li>{{$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7259')}}</li>
                        <li>{{$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7260')}}</li>
                        <li>{{$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7261')}}</li>
                        <li>{{$t('crm.transferIntro')}}</li>
                    </ul>
                </div>
                <div class="funnel-item">
                    <span>{{$t('modules_spoc_crm_web_src_views_marketcharts_marketchartspart1_1354')}}</span>
                    <ul>
                        <li class="active">{{$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7258')}}</li>
                        <li>{{$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7259')}}</li>
                        <li>{{$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7260')}}</li>
                        <li>{{$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7261')}}</li>
                        <li>{{$t('crm.transferIntro')}}</li>
                    </ul>
                </div>
                <div class="funnel-item">
                    <span>{{$t('modules_spoc_crm_web_src_views_marketcharts_marketchartspart1_1355')}}</span>
                    <ul>
                        <li class="active">{{$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7258')}}</li>
                        <li>{{$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7259')}}</li>
                        <li>{{$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7260')}}</li>
                        <li>{{$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7261')}}</li>
                        <li>{{$t('crm.transferIntro')}}</li>
                    </ul>
                </div>
            </div>
            <chart-spart1 class="funnel-charts-part" key="4" v-lese-if="option4" :option="option4"></chart-spart1>
        </div>
    </div>
</template>
<script>

import chartSpart1 from "./chartSpart1";
import { mapMutations, mapState } from "vuex";
import valid, { errors, salerPerformance } from "../../libs/request";
import { barOption, pieOption, funnelOption } from './saleChartsOptions.js';

export default {
    props: {
        menuRoute: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            chartType: "3",
            type: '1',
            typeLists: [
                {
                    value: '1',
                    label: this.$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7265')
                },
                {
                    value: '2',
                    label: this.$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7266')
                },
                {
                    value: '3',
                    label: this.$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7267')
                },
                {
                    value: '4',
                    label: this.$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7268')
                },
                {
                    value: '5',
                    label: this.$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7269')
                },
                {
                    value: '6',
                    label: this.$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7270')
                }
            ],
            time: '2020.5.1~2020.5.19',
            timeType: '1',
            timeLists: [
                {
                    value: '1',
                    label: this.$t('modules_spoc_crm_web_src_views_customerchangelog_index_1162')
                },
                {
                    value: '2',
                    label: this.$t('messagemanagement_components_histroylists_314')
                },
                {
                    value: '3',
                    label: this.$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7273')
                }
            ],
            option: null,
            totalAmount: 0,
            currentUserAmount: 0,
            rankField: 'city',
            option2: null,
            option3: null,
            option4: null,
            officeId: '',
            officeLists: [],
            sale: '',
            saleLists: '',
        };
    },
    components: {
        chartSpart1
    },
    mounted() {
        this.getOption();
    },
    methods: {
        getOption() {
            if (this.chartType == 1) {
                this.option = barOption(
                    [
                        this.$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7274'),
                        this.$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7275'),
                        this.$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7276'),
                        this.$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7277'),
                    ],
                    [
                        [
                            533.86,
                            875.86,
                            754.86,
                            644.86,
                        ],
                        [
                            324.86,
                            876.86,
                            356.86,
                            788.86,
                        ],
                        [
                            324.86,
                            543.86,
                            356.86,
                            256.86,
                        ],
                        [
                            324.86,
                            543.86,
                            356.86,
                            543.86,
                        ],
                        [
                            533.86,
                            875.86,
                            754.86,
                            644.86,
                        ],
                        [
                            324.86,
                            876.86,
                            356.86,
                            788.86,
                        ],
                    ]
                )
            } else if (this.chartType == 2) {
                this.option2 = pieOption(
                    this.$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7255'),
                    [
                        this.$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7278'), this.$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7279'), this.$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7280'), this.$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7281'), this.$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7282')
                    ],
                    [
                        { value: 335, name: this.$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7278') },
                        { value: 310, name: this.$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7279') },
                        { value: 234, name: this.$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7280') },
                        { value: 135, name: this.$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7281') },
                        { value: 1548, name: this.$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7282') }
                    ]
                )
                this.option3 = pieOption(
                    this.$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7256'),
                    [
                        this.$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7283'), this.$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7284'), this.$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7285'), this.$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7286'), this.$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7287')
                    ],
                    [
                        { value: 335, name: this.$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7283') },
                        { value: 310, name: this.$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7284') },
                        { value: 234, name: this.$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7285') },
                        { value: 135, name: this.$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7286') },
                        { value: 1548, name: this.$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7287') }
                    ]
                )
            } else if (this.chartType == 3) {
                this.option4 = funnelOption(
                    this.$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7256'),
                    [
                        this.$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7283'), this.$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7284'), this.$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7285'), this.$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7286'), this.$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7287')
                    ],
                    [
                        { value: 335, name: this.$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7283') },
                        { value: 310, name: this.$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7284') },
                        { value: 234, name: this.$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7285') },
                        { value: 135, name: this.$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7286') },
                        { value: 1548, name: this.$t('modules_spoc_sign_web_src_views_salesfollowupcharts_index_7287') }
                    ]
                )
            }
        }
    },
}
</script>
