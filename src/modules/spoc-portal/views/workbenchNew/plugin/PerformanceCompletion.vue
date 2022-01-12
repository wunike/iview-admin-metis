<style lang="less">
@import "./libs/public.less";
.performance-completion-wrapper {
  position: relative;
  .plugin-title {
    display: inline-block;
  }
  .tabs-right {
    position: absolute;
    right: -10px;
    top: 41px;
    width: 158px;
    font-weight: normal;
  }
  .performance-lists {
    padding-top: 20px;
    @h: 44px;
    .item {
      position: relative;
      height: @h;
      margin: 0 30px;
      padding-left: 67px;
      padding-right: 60px;
      padding-top: 16px;
    }
    .title {
      position: absolute;
      left: 0;
      top: 0;
      width: 67px;
      line-height: @h;
      height: @h;
      color: #76838f;
      font-size: 12px;
    }
    .numer {
      position: absolute;
      right: 0;
      top: 0;
      width: 42px;
      color: #76838f;
      font-size: 12px;
      line-height: @h;
      height: @h;
    }
    @line: 12px;
    .out {
      position: relative;
      height: @line;
      border-radius: @line;
      background: #f2f3f7;
    }
    .inner {
      position: absolute;
      left: 0;
      top: 0;
      color: #fff;
      line-height: @line;
      border-radius: @line;
      text-align: right;
      padding-right: 6px;
      min-width: 30px;
    }
  }
}
</style>

<template>
    <plugin-template
        class="performance-completion-wrapper"
        :mode="mode"
        :data="data"
        :dataLength="true"
        @loadData="loadData"
        @onButtonClick="onButtonClick"
        @init="init"
    >
        <!-- start -->
        <div slot="name" class="plugin-title">
            <span>({{month}}月)</span>
            <Select
                v-model="roleNo"
                @on-change="changeRole"
                size="small"
                clearable
                class="tabs-right"
                placement="bottom-end"
                v-if="roleUserLists && roleUserLists.length > 0"
            >
                <Option
                    v-for="item in roleUserLists"
                    :value="item.id"
                    :key="item.id"
                >{{ item.name }}</Option>
            </Select>
        </div>
        <Tabs v-model="chartType" @on-click="getOption" v-if="false">
            <TabPane label="个人业绩" name="1"></TabPane>
            <TabPane label="校区业绩" name="2"></TabPane>
        </Tabs>
        <Select v-model="searchVal" class="tabs-right" v-if="false">
            <Option v-for="item in lists" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <div class="performance-lists">
            <div class="item" v-for="item in performanceLists" :key="item.title">
                <span class="title">{{item.title}}</span>
                <div class="out">
                    <div
                        class="inner"
                        v-if="item.total > 0"
                        :style="{
                            background: item.over / item.total > 0 ? item.bg : 'gray', 
                            width: (item.over / item.total) * 100 + '%'
                        }"
                    >{{item.over / item.total > 0 ? ((item.over / item.total) * 100).toFixed(2) : 0}}%</div>
                    <div class="inner" v-else :style="{background: 'gray', width: '0'}">0%</div>
                </div>
                <span class="numer">{{item.over}}{{item.company}}/{{item.total}}{{item.company}}</span>
            </div>
        </div>
        <!-- end -->
    </plugin-template>
</template>

<script>
/**
 ** @author: 曹见芳
 ** 插件 - 业绩完成情况
 */
import MODE from "./mode.js";
import valid, { errors, sysUser, crmCustomerStatistics } from '../../../../spoc-crm-web/src/libs/request.js'
import pluginTemplate from './components/template.vue'
import { mapMutations, mapState } from "vuex";
import { waitUntil } from "@public/libs/util";

export default {
    components: {
        pluginTemplate
    },
    props: {
        mode: { //当前模式
            type: String,
            default: '',
            required: true
        },
        data: { //节点数据
            type: Object,
            required: true
        },
    },
    data() {
        return {
            officeId: '',
            // chartType: '1',
            // searchVal: '',
            // lists: [],
            roleNo: '',
            performanceLists: [
                {
                    title: '时间进度',
                    over: new Date().getDate(),
                    total: new Date(new Date().getFullYear(), (new Date().getMonth() + 1), 0).getDate(),
                    company: '',
                    bg: '#5584FF'
                },
                {
                    title: '到访进度',
                    over: 0,
                    total: 0,
                    company: '',
                    bg: '#8272EC'
                },
                {
                    title: '业绩进度',
                    over: 0,
                    total: 0,
                    company: '',
                    bg: '#FF9300'
                }
            ],
            roleUserLists: [],
            month: new Date().getMonth() + 1,
            stateGroupType: '', //customer management list 代表校长，非customer management list代表销售
        }
    },
    computed: {
        ...mapState(["app"]),
        ...MODE
    },
    mounted() {
        // waitUntil(
        //     () => {
        //         if (this.app.currOfficeId) this.officeId = this.app.currOfficeId;
        //         return this.app.currOfficeId
        //     },
        //     () => {
        //         console.log('wait')
        //     }
        // );
    },
    methods: {
        //加载数据
        loadData() {
            this.listRoleUser(() => {
                this.performanceData();
            });
        },
        listRoleUser(callback) {
            let params = {
                dsfFlag: 1,
                roleId: 4,
                // officeId: 17,
                pageSize: 0,
                isCurMonthLz: 1,
                isService: 1
            }
            sysUser.listRoleUser(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let _data = res.data.data;
                        this.roleUserLists = _data.list;
                        this.stateGroupType = _data.list && _data.list.length > 1 ? 'customer management list' : '';
                        callback && callback();
                    }
                })
                .catch(errors.call(this))
        },
        performanceData() {
            let params = {
                startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).format('yyyy-MM-dd hh:mm:ss'),
                endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).format('yyyy-MM-dd') + ' 23:59:59',
                userId: this.roleNo ? this.roleNo : '',
                stateGroupType: this.stateGroupType
            }
            crmCustomerStatistics
                .myPerformance(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let data = res.data.data
                        this.performanceLists[1].over = data.monthOppCount ? Number(data.monthOppCount) : 0
                        this.performanceLists[1].total = data.oppPlan ? Number(data.oppPlan) : 0
                        this.performanceLists[2].over = data.monthSignAmount ? Number(data.monthSignAmount) : 0
                        this.performanceLists[2].total = data.signPricePlan ? Number(data.signPricePlan) : 0
                    }
                })
                .catch(errors.call(this))
        },
        init() {
            this.$emit("init", this);
        },
        onButtonClick(str) {
            this.$emit('onButtonClick', str);
        },
        changeRole(val) {
            this.performanceData();
        },
    }
}
</script>
