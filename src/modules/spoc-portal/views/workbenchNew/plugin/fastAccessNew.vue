<style lang="less">
@import "./libs/public.less";
.fast-access-new-plugin-wrapper {
  background-color: #fff;
  .main {
    border-top: 1px solid #e9e9e9;
  }
  .fast-access-lists {
    @w: 60px;
    ul {
      padding: 0 30px;
    }
    li {
      @li: 80px;
      float: left;
      margin-right: 22px;
      width: @li;
      height: @li;
    }
    .inner {
      position: relative;
      cursor: pointer;
      height: 100%;
      padding-top: 12px;
      margin: 0 auto;
      line-height: 38px;
      font-size: 12px;
      text-align: center;
      color: #565656;
    //   font-weight: bold;
      div {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
      }
    }
    img {
      display: block;
      width: 34px;
      margin: 0 auto;
    }
  }
}
.edit-fast-new-access {
  @h: 72px;
  .ivu-modal-body {
    padding-bottom: 4px;
  }
  .item {
    position: relative;
    padding-left: 82px;
    overflow: hidden;
    &.top {
      min-height: @h + 1px;
      margin-bottom: 20px;
      border-bottom: 1px solid #d9d9d9;
    }
    .tips {
      color: #d0021b;
      line-height: @h;
    }
  }
  .title {
    position: absolute;
    left: 0;
    top: 0;
    line-height: @h;
  }
  .lists {
    .clear();
    margin-right: -16px;
    & > div {
      float: left;
      margin-right: 16px;
      margin-bottom: 20px;
      height: @h;
      min-width: @h;
      border: 1px solid #e6e7eb;
    }
  }
}
</style>

<template>
    <plugin-template
        class="fast-access-new-plugin-wrapper"
        :mode="mode"
        :data="dataCopy"
        :dataLength="true"
        :needMore="true"
        titleColor="#565656"
        @clickMore="clickMore"
        @loadData="loadData"
        @onButtonClick="onButtonClick"
        iconName="md-settings"
        @init="init"
    >
        <!-- start -->
        <div class="fast-access-lists">
            <ul v-if="cardCheckIds && cardCheckIds.length">
                <li
                    v-for="item in listsAll"
                    :key="item.id"
                    v-if="cardCheckIds.indexOf(item.id) > -1"
                >
                    <div class="inner" @click="toDetail(item)">
                        <img :src="item.icon" alt="">
                        <div>{{item.title}}</div>
                    </div>
                </li>
            </ul>
            <ul v-else>
                <li>
                    <div class="inner">
                        <Icon type="ios-add-circle" style="font-size: 20px" @click="clickMore"/>
                        <div>暂无</div>
                    </div>
                </li>
            </ul>
        </div>
        <Modal
            v-model="editFastAccess"
            width="818"
            title="编辑快捷操作"
            class-name="edit-fast-new-access"
            :loading="loading"
            @on-ok="saveFastAccess"
            @on-cancel="cancel"
        >
            <div class="item top">
                <div class="title">已选功能：</div>
                <div class="lists" v-if="checkIds && checkIds.length">
                    <fast-access-item
                        v-for="(top, index) in listsAll"
                        :key="index"
                        bg="white"
                        v-if="checkIds.indexOf(top.id) > -1"
                        :checked="true"
                        :data="top"
                        @onDel="onDel"
                    ></fast-access-item>
                </div>
                <div class="tips" v-else>请到下方选择您的快捷操作。</div>
            </div>
            <div class="item" v-for="(cards, index) in lists" :key="index">
                <div class="title">{{cards.title}}：</div>
                <div class="lists">
                    <fast-access-item
                        v-for="(card, index) in cards.lists"
                        v-if="checkIds.indexOf(card.id) == -1"
                        :key="index"
                        bg="white"
                        :data="card"
                        @onAdd="onAdd"
                    ></fast-access-item>
                </div>
            </div>
        </Modal>
        <!-- end -->
        <task-modal ref="taskModalRef"></task-modal>
        <popupsM ref="popModule" v-if="popShow" @cancel="cancelPopModule" @save="savePop"></popupsM>
        <turn-center ref="turnCenter" v-if="turnCenterShow" @cancel="cancelTurnCenter" @save="saveTurnCenter"></turn-center>
        <add-new-payment ref="addNewPayment"></add-new-payment>
        <applyRefund ref="applyRefundRef"></applyRefund>
        <editLeaveNumModify
            v-if="officeIdList && officeIdList.length"
            ref="editLeaveNumModifyRef"
            :officeIdList="officeIdList"
        ></editLeaveNumModify>
        <scoreExchage v-if="hasHootie" ref="scoreExchage"></scoreExchage>
        <toScore v-if="hasHootie" ref="toScore"></toScore>
    </plugin-template>
</template>

<script>
/**
 ** @author: 曹见芳
 ** 插件 - 快捷操作
 */
import MODE from "./mode.js";
import valid, { errors, sysAttachment, sysMenu, sysUser } from '../../../libs/request.js';
import pluginTemplate from './components/template.vue'
import fastAccessItem from './components/fastAccessItem.vue'
import { mapMutations, mapState } from "vuex";
import { waitUntil } from "@public/libs/util";
import taskModal from "@/modules/spoc-crm-web/src/views/taskCenter/taskModal.vue";
import popupsM from "@/modules/spoc-sign-web/src/views/packageChange/pops/popups.vue";
import turnCenter from "@/modules/spoc-sign-web/src/views/contractTransferCenter/components/turnCenter.vue";
import addNewPayment from "@/modules/spoc-sign-web/src/views/receiptManagement/components/addNewPayment.vue";
import applyRefund from "@/modules/spoc-sign-web/src/views/applyRefund/applyRefund.vue";
import editLeaveNumModify from "@/modules/spoc-sign-web/src/views/editLeaveNum/components/editLeaveNumModify.vue";
import scoreExchage from "@/modules/spoc-hootie-web/src/views/myCourse/scoreExchage.vue";
import toScore from "@/modules/spoc-hootie-web/src/views/myCourse/toScore.vue";

export default {
    components: {
        pluginTemplate, fastAccessItem, taskModal, popupsM, turnCenter, addNewPayment, applyRefund, editLeaveNumModify, scoreExchage, toScore
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
            loading: true,
            editFastAccess: false,
            lists: [],
            listsAll: [],
            checkIds: [],
            cardCheckIds: [],
            idNameArr: [],
            dataCopy: {},
            checkIdsCopy: [],
            over: false,
            listsAllOver: false,
            popShow: false,
            turnCenterShow: false,
            officeIdList: [],
            hasHootie: false,
        }
    },
    computed: {
        ...MODE
    },

    mounted() {
        this.over = false;
        this.listsAllOver = false;
        this.getMenuList();
        this.dataCopy = Object.assign({}, this.data);
        this.initLists();
        this.getofficeIdList();
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        getofficeIdList(){
            sysUser
                .dataScopeFilter()
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.officeIdList = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                });
        },
        init() {
            this.$emit("init", this);
        },
        //加载数据
        initLists() {
            if (this.$route.query.protalTplId) {
                this.over = true;
                this.setDataCheckids();
            } else {
                this.findMenuByMenuIds();
            }
        },
        setDataCheckids() {
            // this.checkIds = this.dataCopy.itemContent ? this.dataCopy.itemContent.split(',') : [];
            // this.checkIdsCopy = this.dataCopy.itemContent ? this.dataCopy.itemContent.split(',') : [];
            this.filterCheckIds(this.dataCopy.itemContent ? this.dataCopy.itemContent.split(',') : []);
            // 非弹窗数据
            this.cardCheckIds = this.data.itemContent ? this.data.itemContent.split(',') : [];
            // this.dataLength = this.cardCheckIds && this.cardCheckIds.length ? true : false;
        },
        filterCheckIds(arr) {
            // 过滤
            if (arr && arr.length) {
                waitUntil(
                    () => {
                        // console.log(this.listsAllOver, this.over, this.listsAll, arr)
                        return (this.listsAllOver && this.over) || false
                    },
                    () => {
                        if (this.listsAll && this.listsAll.length) {
                            let allIds = [];
                            this.listsAll.forEach(item => {
                                allIds.push(item.id)
                            });
                            let arrFinish = [];
                            arr.forEach(item => {
                                if (allIds.indexOf(item) > -1) {
                                    arrFinish.push(item)
                                }
                            });
                            // console.log(allIds, arrFinish, arr, this.listsAll)
                            this.checkIds = [...arrFinish];
                            this.checkIdsCopy = [...arrFinish];
                        }
                    }
                );
            } else {
                this.checkIds = [];
                this.checkIdsCopy = [];
            }
        },
        findMenuByMenuIds() {
            sysMenu.findMenuByMenuIds({})
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let _data = res.data.data;
                        let _arr = [];
                        if (_data && _data.length) {
                            _data.forEach(list => {
                                _arr.push(list.id)
                            });
                            // this.checkIds = [..._arr];
                            // this.checkIdsCopy = [..._arr];
                            this.filterCheckIds(_arr);
                            this.cardCheckIds = [..._arr];
                            // this.dataLength = true;
                        } else {
                            this.setDataCheckids();
                        }
                        this.over = true;
                    }
                })
                .catch(errors.call(this))
        },
        getMenuList() {
            sysMenu.listGrantAllMenu().then(valid.call(this)).then(res => {
                if (res.ok) {
                    //获取菜单权限开始
                    let _data = res.data.data;
                    let _children = _data.children;
                    let _favoMap = _data.favoMap;
                    this.idNameArr = [];
                    this.lists = [];
                    _children.forEach(item => {
                        this.idNameArr.push({
                            id: item.id,
                            name: item.meta.title
                        })
                    });
                    for (let key in _favoMap) {
                        let title = this.idNameArr.filter(function (item) {
                            return item.id == key;
                        })[0].name;
                        let _lists = [];
                        if (_favoMap[key] && _favoMap[key].length) {
                            _favoMap[key].forEach(item => {
                                _lists.push({
                                    id: item.id,
                                    title: item.meta.title,
                                    icon: item.meta.icon,
                                    name: item.name,
                                })
                            });
                        }
                        if(key == '7001'){
                            this.hasHootie = true
                        }
                        this.lists.push({
                            id: key,
                            title: title,
                            lists: _lists
                        });
                    }
                    this.listsAll = [];
                    this.lists.forEach(list => {
                        this.listsAll = [...this.listsAll, ...list.lists];
                    });
                    this.listsAllOver = true;

                    console.log(this.lists,"aaaaaa")
                }
            }).catch(errors.call(this))
        },
        onDel(item) {
            // if(this.checkIds.length == 1) {
            //     this.$Message.error('请至少选择1个功能')
            // } else {
            let _id = item.id;
            let _num = this.checkIds.indexOf(_id);
            if (_num > -1) {
                this.checkIds.splice(_num, 1);
            }
            // }
        },
        onAdd(item) {
            if (this.checkIds.length < 8) {
                this.checkIds.push(item.id);
            } else {
                this.$Message.error('请最多选择8个功能')
            }
        },
        loadData() {

        },
        //点击设置
        clickMore() {
            this.checkIds = [...this.checkIdsCopy];
            this.editFastAccess = true;
        },
        saveFastAccess() {
            // this.updateLoadingStatus({ isLoading: true });
            if (this.$route.query.protalTplId) {
                this.dataCopy.itemContent = this.checkIds.join(',');
                this.cancel();
                this.$emit('onUploadFastAccess', this.dataCopy, 'saveFastAccess')
            } else {
                this.updateQuickMenu();
            }
        },
        updateQuickMenu() {
            let params = {
                quickMenus: this.checkIds.join(',')
            }
            sysUser.updateQuickMenu(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.cancel();
                        this.findMenuByMenuIds();
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.changeLoading();
                });
        },
        cancel() {
            this.editFastAccess = false;
        },
        changeLoading() {
            this.loading = false;
            setTimeout(() => {
                this.loading = true;
            }, 0);
        },
        onButtonClick(str) {
            this.$emit('onButtonClick', str);
        },
        cancelTurnCenter(){
            this.turnCenterShow = false
        },
        saveTurnCenter(){
            this.turnCenterShow = false
        },
        cancelPopModule(){
            this.popShow = false
        },
        savePop(){
            this.popShow = false
        },
        toDetail(route) {
            console.log(route,"快捷操作")
            let flag = route.name.indexOf('?') > -1
            let routeInfo = route.name.split('?')
            if(flag && routeInfo[1] == 'modal') {
                if(routeInfo[0] == 'addTask'){
                    // 添加任务
                    this.$refs.taskModalRef.showModal({
                        modalName: "添加任务",
                        taskType: 'follow task',
                        from: 'quick'
                    });
                }
                if(routeInfo[0] == 'packageChange'){
                    // 改包
                    this.popShow = true
                    setTimeout(()=>{
                        this.$refs.popModule.show();
                    },100)
                }
                if(routeInfo[0] == 'contractTransferCenter'){
                    // 转中心
                    this.turnCenterShow = true
                    setTimeout(()=>{
                        this.$refs.turnCenter.showPop();
                    },100)
                }
                if(routeInfo[0] == 'receiptManagement'){
                    // 收款
                    this.$refs.addNewPayment.showPop()
                }
                if(routeInfo[0] == 'contractRefund'){
                    // 退费
                    this.$refs.applyRefundRef.applyRefundRefShow();
                }
                if(routeInfo[0] == 'editLeaveNum'){
                    // 请假申请
                    this.$refs.editLeaveNumModifyRef.showTipsMethods(
                        0,
                        "修改请假次数申请新增"
                    );
                }
                if(routeInfo[0] == 'courseValidityAdjustment'){
                    // 有效期修改
                    this.$refs.editLeaveNumModifyRef.showTipsMethods(
                        "stop",
                        "提交有效期申请"
                    );
                }
                if(routeInfo[0] == 'scoreExchage'){
                    // 积分兑换
                    this.$refs.scoreExchage.show();
                }
                if(routeInfo[0] == 'toScore'){
                    // 立即评价
                    this.$refs.toScore.show();
                }
            } else if (flag) {
                console.log(routeInfo[1])
                let querys = routeInfo[1].replace(new RegExp('&amp;','g'),"&").split('&')
                let query = {}
                querys.forEach(item=>{
                    let params = item.split('=')
                    query[params[0]] = params[1]
                })
                this.$router.push({
                    name: routeInfo[0],
                    query: query
                });
            } else {
                this.$router.push({
                    name: route.name,
                });
            }
        },
    },
    watch: {
        data: {
            handler(val, oval) {
                this.dataCopy = Object.assign({}, val);
                this.initLists();
            },
            deep: true
        }
    }
}
</script>
