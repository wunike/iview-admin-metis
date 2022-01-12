<style lang="less">
.mms-detail-container {
    height: 100%;
    .infos {
        height: 121px;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        padding: 16px 20px;
        b {
            font-weight: normal;
        }
        .i-header {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            h2 {
                height: 22px;
                font-size: 16px;
                font-weight: 500;
                color: rgba(73, 80, 96, 1);
                line-height: 22px;
            }
            span {
                color: #999999;
            }
        }
        .i-body {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: flex-start;
            flex-wrap: wrap;
            .ib-item {
                width: 33.33%;
                font-size: 14px;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: flex-start;
                b {
                    color: #495060;
                }
                span {
                    color: #999;
                }
                .ivu-poptip {
                    width: calc(~'100% - 70px');
                }
                .ivu-poptip-rel {
                    width: 100%;
                }
                .special-b {
                    display: inline-block;
                    width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }
    .chats-record {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        b {
            font-weight: normal;
        }
        .right {
            transition: all 0.3s;
            transform-origin: center;
            transform: rotate(-180deg);
            font-size: 15px;
            margin-right: 5px;
        }
        .down {
            transition: all 0.3s;
            transform-origin: center;
            transform: rotate(-90deg);
            font-size: 15px;
            margin-right: 5px;
        }
        .cr-left {
            position: relative;
            height: 100%;
            width: 260px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-direction: column;
            /*background: #fff;*/
            .search-lists-container {
                width: 193px;
                top: 90px;
            }
            .class-box {
                height: 204px;
                background: #fff;
                width: 100%;
                overflow-y: auto;
                .cb-header {
                    padding-left: 20px;
                    height: 32px;
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    align-items: center;
                    span {
                        margin-left: 8px;
                    }
                }
            }
            .compass-box {
                height: calc(~'100% - 98px');
                background: #fff;
                overflow-y: auto;
                .cb-item-1 {
                    cursor: pointer;
                }
                .cb-item {
                    padding-left: 20px;
                    height: 32px;
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    align-items: center;
                    span {
                        margin-left: 8px;
                        color: #495060;
                        font-size: 14px;
                    }
                    img {
                        margin-left: 3px;
                        height: 24px;
                        width: 24px;
                    }
                }
                ._item {
                    b {
                        vertical-align: middle;
                        transform: translateX(5px);
                        height: 16px;
                        border-radius: 10px;
                        min-width: 14px;
                        background: #e64630;
                        border: 1px solid transparent;
                        color: #fff;
                        line-height: 15px;
                        text-align: center;
                        padding: 0 4px;
                        font-size: 12px;
                        white-space: nowrap;
                        box-shadow: 0 0 0 1px #fff;
                    }
                }
            }
            .chat-header {
                width: 100%;
                padding-left: 20px;
                height: 32px;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                background: linear-gradient(90deg, rgba(121, 223, 220, 1) 0%, rgba(68, 188, 183, 1) 100%);
                span {
                    margin-left: 10px;
                    color: #fff;
                }
            }
            .ivu-tree {
                padding-left: 20px;
                .ivu-tree-children {
                    li {
                        .cb-item {
                            display: flex;
                            flex-direction: row;
                            justify-content: flex-start;
                            align-items: center;
                            span {
                                margin-left: 8px;
                                color: #495060;
                                font-size: 14px;
                            }
                            img {
                                margin-left: 3px;
                                height: 24px;
                                width: 24px;
                            }
                        }
                        ._item {
                            vertical-align: middle;
                            b {
                                margin-left: 6px;
                                height: 16px;
                                border-radius: 10px;
                                min-width: 14px;
                                background: #e64630;
                                border: 1px solid transparent;
                                color: #fff;
                                line-height: 15px;
                                text-align: center;
                                padding: 0 4px;
                                font-size: 12px;
                                white-space: nowrap;
                                box-shadow: 0 0 0 1px #fff;
                            }
                        }
                    }
                }
            }
            .ivu-badge-count {
                vertical-align: middle;
                transform: translateX(50%);
                height: 16px;
                border-radius: 10px;
                min-width: 14px;
                background: #e64630;
                border: 1px solid transparent;
                color: #fff;
                line-height: 15px;
                text-align: center;
                padding: 0 4px;
                font-size: 12px;
                white-space: nowrap;
                box-shadow: 0 0 0 1px #fff;
            }
            .chat-body {
                width: 100%;
                height: calc(~'100% - 332px');
                background: #fff;
                overflow: hidden;
                flex: 1;
                .ivu-scroll-wrapper {
                    height: 100% !important;
                    .ivu-scroll-loader {
                        display: none;
                    }
                    .ivu-scroll-container {
                        height: 100% !important;
                    }
                }
                .chat-item {
                    height: 62px;
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    align-items: flex-start;
                    background: #fff;
                    cursor: pointer;
                    border-bottom: 1px solid #f1f1f1;
                    &:nth-last-of-type(1) {
                        /*border-bottom: none;*/
                    }
                }
                .active {
                    cursor: default;
                    background: #e3f2fd;
                }
                .ci-l {
                    width: 66px;
                    padding-top: 16px;
                    padding-left: 34px;
                    img {
                        height: 24px;
                        width: 24px;
                    }
                }
                .ci-r {
                    margin-left: 8px;
                    width: calc(~'100 - 74px');
                    .ci-r-1 {
                        font-size: 14px;
                        font-weight: normal;
                        color: rgba(73, 80, 96, 1);
                        margin-top: 10px;
                    }
                    .ci-r-2 {
                        font-size: 12px;
                        font-weight: normal;
                        color: rgba(153, 153, 153, 1);
                    }
                    .ci-r-3 {
                        font-size: 14px;
                        font-weight: normal;
                        color: rgba(102, 102, 102, 1);
                    }
                }
            }
            .change-compass {
                width: 100%;
                background: #fff;
                padding: 16px 20px;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                span {
                    font-size: 16px;
                    font-weight: 400;
                    color: rgba(73, 80, 96, 1);
                }
            }
        }
        .cr-right {
            height: 100%;
            width: calc(~'100% - 266px');
            background: #fff;
            border-radius: 4px;
            .crr-header {
                height: 64px;
                width: 100%;
                position: relative;
                .crr-header-1 {
                    height: 64px;
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    span {
                        display: inline-block;
                        height: 24px;
                        width: 48px;
                        line-height: 24px;
                        text-align: center;
                        font-size: 12px;
                        color: rgba(73, 80, 96, 1);
                        cursor: pointer;
                        margin-right: 40px;
                    }
                    .active {
                        cursor: default;
                        color: #fff;
                        background: linear-gradient(to right, #79dfdc, #44bcb7);
                    }
                }
                .crr-header-2 {
                    position: absolute;
                    right: 16px;
                    top: 16px;
                }
            }
            .crr-body {
                height: 100%;
            }
        }
    }
}
</style>

<template>
    <div class="mms-detail-container">
        <div class="chats-record">
            <div class="cr-left">
                <div class="change-compass">
                    <Icon @click="changeSchoolFn" size="26" color="#999999" type="ios-list" style="cursor: pointer" />
                    <span>{{ officeName }}</span>
                </div>
                <div v-if="changeSchool" style="width: 100%;flex: 1;">
                    <div style="padding-left:20px;background: #fff;padding-bottom:8px;width: 100%;">
                        <Input v-model="searchSchool" @on-change="filterCompassDate" icon="ios-search" :placeholder="$t('message_addressbook_267')" style="width: 220px;" />
                    </div>
                    <div class="compass-box">
                        <div class="cb-item-1" @click="chooseCompass(item)" v-for="(item, index) in compassData" :key="index">
                            <div class="cb-item _item">
                                <img style="width:14px;height:12px;" src="../../assets/img/sub-class.png" />
                                <span>{{ $t('message_index_284', [item.officeName, item.personCount || 0]) }}</span>
                                <b v-if="item.sum > 0">{{ item.sum > 0 && item.sum < 100 ? item.sum : item.sum > 99 ? '99+' : '' }}</b>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else style="width: 100%;flex:1;display: flex;justify-content: flex-start;align-items: flex-start;flex-direction: column;">
                    <div style="padding-left:20px;background: #fff;padding-bottom:8px;width: 100%;">
                        <Input v-model="search" icon="ios-search" :placeholder="$t('message_addressbook_267')" style="width: 188px;margin-right:10px;" />
                        <Icon @click="showAddressBook" size="22" color="#999999" type="md-person" style="cursor: pointer" />
                    </div>
                    <!--  @onClickChatRecord="clickChatRecord" -->
                    <search-lists v-if="search" :keyWord="search" :officeId="officeId" :teacherId="userId" parent="message" @onClickChat="searchClickChat" />
                    <div class="class-box">
                        <div class="cb-header">
                            <img src="../../assets/img/class.png" />
                            <span>{{ $t('message_index_285') }}</span>
                        </div>
                        <Tree :data="classList" :render="renderContent"></Tree>
                        <!-- //:load-data="loadData" -->
                        <!--<div class="cb-item-1" v-for="item in classList">
                            <div class="cb-item _item">
                                <Icon style="cursor: pointer" size="15" type="ios-arrow-back" :class="{'down':item.expand,'right':!item.expand}" @click.stop="item.expand=!item.expand" />
                                <img style="width:14px;height:12px;" src="../../assets/img/sub-class.png">
                                <span>{{item.classCourseName}}</span>
                                <b v-if="item.sum > 0">{{item.sum > 0 && item.sum  < 100 ? item.sum:  item.sum  > 99 ? '99+' : ''}}</b>
                            </div>
                            <div v-if="item.children&&item.expand">
                                <div class="cb-item _item" style="cursor: pointer" v-for="item1 in item.children">
                                    <img style="width:20px;height:20px;margin-left:14px;" :src="item1.src">
                                    <span>{{item1.name}}</span>
                                    <b v-if="item1.sum > 0">{{item1.sum > 0 && item1.sum  < 100 ? item1.sum:  item1.sum  > 99 ? '99+' : ''}}</b>
                                </div>
                            </div>
						</div>-->
                    </div>
                    <div class="chat-header">
                        <img src="../../assets/img/chat-icon.png" alt />
                        <span>{{ $t('message_index_286') }}</span>
                    </div>
                    <div class="chat-body">
                        <Scroll :on-reach-bottom="handleReachTop" :distance-to-edge="0">
                            <div :class="{ active: item.dialogId == onlyId }" class="chat-item" @click="clickChat(item)" v-for="(item, index) in chatData" :key="index">
                                <div class="ci-l">
                                    <Badge :count="item.sum > 0 ? Number(item.sum) : null"><img :src="item.avator" /></Badge>
                                </div>
                                <div class="ci-r">
                                    <div class="ci-r-1" v-if="$i18n.locale == 'zh-CN'">{{ item.studentName }}</div>
                                    <div class="ci-r-1" v-else>{{ item.studentEnName || item.studentName }}</div>
                                    <div class="ci-r-2">{{ item.classCourseName || '-' }}</div>
                                </div>
                            </div>
                        </Scroll>
                    </div>
                </div>
            </div>
            <div class="cr-right">
                <!--<div class="crr-header">
					<div class="crr-header-1">
						<span :class="{active:curr == 1}" @click="showMessage(1)">{{$t('message_index_287')}}</span>
						<span :class="{active:curr == 2}" @click="showMessage(2)">{{$t('message_index_288')}}</span>
						<span :class="{active:curr == 3}" @click="showMessage(3)">{{$t('message_index_289')}}</span>
					</div>
					<div class="crr-header-2">
						<DatePicker type="daterange" separator=" ~ " :placeholder="$t('message_index_290')" style="width: 224px"></DatePicker>
					</div>
				</div>-->
                <div class="crr-body">
                    <!--<Radio v-model="single" @on-change="radios">Radio</Radio>-->
                    <!-- v-if="userId&&dialogId&&classCourseId&&officeId&&toId"  -->
                    <chat
                        ref="histroyLists"
                        v-if="roleId && userId && isChat"
                        :studentName="studentName"
                        :dialogId="dialogId"
                        :toId="toId"
                        :toRoleId="toRoleId"
                        :fromRoleId="roleId"
                        :fromId="userId"
                        :classCourseId="classCourseId"
                        :officeId="officeId"
                        :toAvator="toAvator"
                        :formAvator="userInfo.photo"
                        @readed="readed"
                    ></chat>
                </div>
            </div>
        </div>
        <addressBook ref="addressBook" :list="classList" v-if="showBook" @clearBook="clearBook" :officeId="officeId"></addressBook>
    </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex';
import addressBook from './addressBook.vue';
import subClassImg from '../../assets/img/sub-class.png';
import searchLists from '../messageManagement/components/searchLists.vue';

import { waitUntil } from '../../libs/util.js';
import chat from './chat.vue';
import valid, { errors, sysDict, jxChatMessage, jxChatDialog } from '../../libs/request';
export default {
    name: 'hootie.message',
    props: {},
    data() {
        return {
            showBook: false,
            changeSchool: false,
            search: '',
            classList: [],
            compassData: [],
            compassDataCopy: [],
            onlyId: null,
            chatData: [],
            curr: '1',
            officeId: '',
            officeName: '',
            classCourseId: '',
            userId: '',
            roleId: '',
            toId: '',
            studentName: '',
            dialogId: '',
            toAvator: '',
            isChat: false,
            searchSchool: '',
            pageNo: 1
        };
    },
    computed: {
        ...mapState(['userInfo'])
    },
    components: {
        addressBook,
        chat,
        searchLists
    },
    created() {
        this.getListByXq();
        this.getUnReadCountByUser();
    },
    mounted() {
        setTimeout(() => {}, 1000);
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        getListByLaster() {
            if (this.isGetListByLaster) {
                return;
            }
            this.isGetListByLaster = true;
            let params = {
                officeId: this.officeId,
                roleId: this.roleId,
                teacherId: this.userId,
                pageNo: this.pageNo
            };
            jxChatMessage
                .listByLaster(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        if (this.pageNo == 1) {
                            this.chatData = res.data.data.list;
                        } else {
                            this.chatData = [...this.chatData, ...res.data.data.list];
                        }
                        if (res.data.data.list.length) {
                            this.pageNo += 1;
                        }
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.isGetListByLaster = false;
                });
        },
        getUnReadCountByUser() {
            this.updateLoadingStatus({
                isLoading: true
            });
            jxChatMessage
                .unReadCountByUser({})
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({
                        isLoading: false
                    });
                });
        },
        showAddressBook() {
            this.showBook = true;
            this.$nextTick(() => {
                this.$refs.addressBook.showPop();
            });
        },
        chooseCompass(val) {
            this.changeSchool = false;
            this.officeId = val.officeId;
            this.officeName = val.officeName;
            this.searchSchool = '';
            this.compassData = [...this.compassDataCopy];
            this.getListByClass();
            this.pageNo = 1;
            this.getListByLaster();
        },
        changeSchoolFn() {
            this.getListByXq();
            this.changeSchool = true;
        },
        showMessage(idx) {
            this.curr = idx;
        }, // clickChatRecord(item) {
        //     // 点击搜索列表中的聊天记录
        //     this.search = '';
        //     console.log(item)
        //     // this.clickChat(item);
        //     // this.$refs.histroyLists.showSearchChatRecordLists(item)
        // },
        searchClickChat(item) {
            // 点击搜索列表中的联系人
            this.search = '';
            // console.log(item)
            this.clickChat(item);
        },
        clickChat(item) {
            this.isChat = false;
            let params = {
                classCourseId: item.classCourseId,
                stuId: item.studentId
            };
            jxChatMessage
                .listByTeacher(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        // console.log(res)
                        let arr = res.data.data;
                        for (var i = 0; i < arr.length; i++) {
                            if (arr[i].teacherId == this.userInfo.id) {
                                this.roleId = arr[i].roleId;
                                this.onlyId = item.dialogId;
                                this.classCourseId = item.classCourseId;
                                this.userId = this.userInfo.id;
                                this.toId = item.studentId;
                                this.toRoleId = '0';
                                this.studentName = this.$i18n.locale == 'zh-CN' ? item.studentName : (item.studentEnName || item.studentName);
                                this.dialogId = item.dialogId;
                                this.toAvator = item.avator;
                            }
                        }
                    }
                    if (this.dialogId == -1 || !this.dialogId) {
                        this.saveDialog(item);
                    } else {
                        this.isChat = true;
                        this.pageNo = 1;
                        //							this.getListByLaster();
                        //							this.getListByClass();
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.$nextTick(() => {
                        if (this.dialogId != -1) {
                        }
                    });
                });
        },
        getListByXq() {
            this.updateLoadingStatus({
                isLoading: true
            });
            let params = {};
            jxChatMessage
                .listByXq(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.compassData = res.data.data;
                        if (this.compassData.length) {
                            this.officeName = this.compassData[0].officeName;
                            this.officeId = this.compassData[0].officeId;
                        } else {
                            this.officeId = this.userInfo.officeId;
                            this.officeName = this.userInfo.officeName;
                        }
                        this.compassDataCopy = [...this.compassData];
                        this.$nextTick(() => {
                            this.userId = this.userInfo.id;
                            this.roleId = this.userInfo.roleId;
                            this.getListByClass();
                            this.pageNo = 1;

                            waitUntil(
                                () => {
                                    if (this.userId) {
                                        return true;
                                    }
                                },
                                this.getListByLaster,
                                () => {
                                    console.warn(this.$t('modules_spoc_hootie_web_src_views_message_index_2044'));
                                },
                                500
                            );
                        });
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({
                        isLoading: false
                    });
                });
        },
        getListByClass() {
            let params = {
                officeId: this.officeId
            };
            jxChatMessage
                .listByClass(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let list = [];
                        let arr = res.data.data;
                        arr.forEach((v, k) => {
                            let datas = [];
                            let expanded = this.classList[k] ? this.classList[k].expand || false : false;
                            let selected = this.classList[k] ? this.classList[k].select || false : false;
                            datas = v.jxStudentChatMessageVOS;
                            list.push({
                                title: v.classCourseName,
                                classCourseName: v.classCourseName,
                                classCourseId: v.classCourseId,
                                personCount: v.personCount,
                                sum: v.sum,
                                expand: expanded,
                                select: selected,
                                checkAllGroup: [], // loading: false,
                                children: datas,
                                render: (h, { root, node, data }) => {
                                    return h(
                                        'span',
                                        {
                                            style: {
                                                display: 'inline-block'
                                            },
                                            class: {
                                                'cb-item': true,
                                                _item: true
                                            }
                                        },
                                        [
                                            h(
                                                'span',
                                                {
                                                    style: {
                                                        display: 'flex',
                                                        'justify-content': 'flex-start',
                                                        'align-items': 'center'
                                                    }
                                                },
                                                [
                                                    h('img', {
                                                        attrs: {
                                                            src: subClassImg
                                                        },
                                                        style: {
                                                            width: '14px',
                                                            height: '12px'
                                                        }
                                                    }),
                                                    h('span', data.classCourseName + '（' + data.personCount + this.$t('message_index_291')),
                                                    h(
                                                        'b',
                                                        {
                                                            style: {
                                                                display: data.sum > 0 ? 'inline' : 'none'
                                                            }
                                                        },
                                                        data.sum > 0 && data.sum < 100 ? data.sum : data.sum > 99 ? '99+' : ''
                                                    )
                                                ]
                                            )
                                        ]
                                    );
                                }
                            });
                            if (list.length == k + 1) {
                                this.classList = list;
                            }
                        });
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    //						this.updateLoadingStatus({
                    //							isLoading: false
                    //						});
                });
        },
        renderContent(h, { root, node, data }) {
            return h(
                'div',
                {
                    style: {
                        display: 'inline-block',
                        cursor: 'pointer'
                    },
                    class: {
                        'cb-item': true,
                        _item: true
                    },
                    on: {
                        click: () => {
                            this.clickChat(data);
                        }
                    }
                },
                [
                    h(
                        'div',
                        {
                            style: {
                                display: 'flex',
                                'justify-content': 'flex-start',
                                'align-items': 'center'
                            }
                        },
                        [
                            h('img', {
                                attrs: {
                                    src: data.avator
                                },
                                style: {
                                    width: '16px',
                                    height: '16px',
                                    overflow: 'hidden',
                                    'border-radius': '50%'
                                }
                            }),
                            h('span', this.$i18n.locale == 'zh-CN' ? data.studentName : (data.studentEnName || data.studentName)),
                            h(
                                'b',
                                {
                                    style: {
                                        display: data.sum > 0 ? 'inline' : 'none'
                                    }
                                },
                                data.sum > 0 && data.sum < 100 ? data.sum : data.sum > 99 ? '99+' : ''
                            )
                        ]
                    )
                ]
            );
        },
        loadData(item, callback) {
            let datas = [];
            let params = {
                officeId: this.officeId,
                classCourseId: item.classCourseId
            };
            jxChatMessage
                .listByStudent(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        datas = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    callback(datas);
                });
        },
        saveDialog(item) {
            // console.log(item.dialogId)
            if (item.dialogId == -1 || !item.dialogId) {
                //					this.updateLoadingStatus({
                //						isLoading: true
                //					});
                let params = {
                    stuId: item.studentId,
                    stuName: this.$i18n.locale == 'zh-CN' ? item.studentName : (item.studentEnName || item.studentName),
                    classCourseId: item.classCourseId,
                    classCourseName: item.classCourseName,
                    officeId: this.officeId,
                    teacherId: this.userInfo.id,
                    teacherName: this.userInfo.name,
                    roleId: this.roleId,
                    roleName: this.userInfo.roleName
                };
                jxChatDialog
                    .save(params)
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            this.dialogId = res.data.data.id;
                            item.dialogId = res.data.data.id;
                            this.classCourseId = item.classCourseId;
                            this.userId = this.userInfo.id;
                            this.roleId = this.userInfo.roleId;
                            this.toId = item.studentId;
                            this.studentName = this.$i18n.locale == 'zh-CN' ? item.studentName : (item.studentEnName || item.studentName);
                            this.toAvator = item.avator;
                            this.onlyId = item.dialogId;
                            this.isChat = true;
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {
                        this.pageNo = 1;
                        this.getListByLaster();
                        this.getListByClass();
                        //							this.updateLoadingStatus({
                        //								isLoading: false
                        //							});
                    });
            } else {
                this.classCourseId = item.classCourseId;
                this.userId = this.userInfo.id;
                this.roleId = this.userInfo.roleId;
                this.toId = item.studentId;
                this.studentName = this.$i18n.locale == 'zh-CN' ? item.studentName : (item.studentEnName || item.studentName);
                this.dialogId = item.dialogId;
                this.toAvator = item.avator;
                this.onlyId = item.dialogId;
                this.pageNo = 1;
                //					this.getListByLaster();
                //					this.getListByClass();
            }
        },
        readed(id) {
            console.log('readed');
            this.classList.forEach(v => {
                v.children.forEach(val => {
                    if (val.dialogId == id) {
                        v.sum -= val.sum;
                        val.sum = 0;
                    }
                });
            });
            this.pageNo = 1;
            this.getListByLaster();
            this.getListByClass();
        },
        filterCompassDate() {
            // console.log(this.searchSchool)
            if (this.searchSchool) {
                let arr = [];
                this.compassDataCopy.forEach(compass => {
                    // console.log(compass)
                    let _name = compass.officeName;
                    if (compass.officeName.indexOf(this.searchSchool) > -1) {
                        arr.push(compass);
                    }
                });
                this.compassData = arr;
            } else {
                this.compassData = [...this.compassDataCopy];
            }
        },
        handleReachTop() {
            return new Promise(resolve => {
                this.getListByLaster();
                resolve();
            });
        },
        clearBook() {
            this.showBook = false;
            this.pageNo = 1;
            this.getListByLaster();
            this.getListByClass();
        }
    },
    watch: {
        "$route.query": {
            handler: function(val, oldVal) {
                console.log(val,1111)
                if (val.dialogId) {
                    this.clickChat(val);
                }
            },
            deep: true
        }
    }
};
</script>
