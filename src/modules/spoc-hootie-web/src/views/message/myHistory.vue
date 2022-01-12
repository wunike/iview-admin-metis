<style lang="less">
.myHistory {
    position: relative;
    .ivu-divider {
        padding: 0 120px;
        .ivu-divider-inner-text {
            font-size: 12px;
            font-weight: normal;
            color: rgba(102, 102, 102, 1);
            line-height: 18px;
        }
    }
    .ivu-divider-horizontal.ivu-divider-with-text-center:after,
    .ivu-divider-horizontal.ivu-divider-with-text-center:before,
    .ivu-divider-horizontal.ivu-divider-with-text-left:after,
    .ivu-divider-horizontal.ivu-divider-with-text-left:before,
    .ivu-divider-horizontal.ivu-divider-with-text-right:after,
    .ivu-divider-horizontal.ivu-divider-with-text-right:before {
        border-top: 1px solid #666666;
    }
    .history_scroll {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        .ivu-scroll-container {
            height: 100% !important;
        }
    }
    .ivu-scroll-content {
        padding: 0 20px;
        overflow: hidden;
        .chat_wrap {
            width: 100%;
            padding-bottom: 24px;
            &.other {
                padding-right: 140px;
                .chat_box {
                    display: flex;
                    justify-content: flex-start;
                    align-items: flex-start;
                    .avatar_box {
                        width: 38px;
                        height: 38px;
                        min-width: 38px;
                        min-height: 38px;
                        .ivu-avatar {
                            width: 38px;
                            height: 38px;
                            line-height: 38px;
                            border-radius: 50%;
                            font-size: 22px;
                        }
                    }
                    .char_info_box {
                        padding-left: 8px;
                        flex: 1;
                        display: flex;
                        justify-content: flex-start;
                        align-items: flex-start;
                        flex-direction: column;
                        .history_info {
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            .name {
                                font-size: 14px;
                                font-weight: normal;
                                color: rgba(73, 80, 96, 1);
                                line-height: 21px;
                                padding-right: 6px;
                            }
                            .time {
                                font-size: 13px;
                                font-weight: normal;
                                color: rgba(153, 153, 153, 1);
                                line-height: 20px;
                            }
                        }
                        .history_cont_box {
                            margin-top: 6px;
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            .history_cont {
                                flex: 1;
                                background: rgba(243, 243, 243, 1);
                                border-radius: 4px 12px 12px 12px;
                                padding: 8px 16px;
                                font-size: 14px;
                                font-weight: 400;
                                color: rgba(73, 80, 96, 1);
                                line-height: 20px;
                                p {
                                    word-break: break-word;
                                }
                            }
                            .history_video{
                                .video{
                                    width: 60%;
                                    height: auto;
                                }
                            }
                            .file {
                                flex: 1;
                                background: #ffffff;
                                border-radius: 4px 12px 12px 12px;
                                border: 1px #01c1b2 solid;
                                padding: 8px;
                                font-size: 14px;
                                font-weight: 400;
                                color: rgba(73, 80, 96, 1);
                                line-height: 20px;
                                width: 262px;
                                height: 66px;
                                display: flex;
                                justify-content: flex-start;
                                align-items: center;
                                .file_info {
                                    flex: 1;
                                    width: 100%;
                                    overflow: hidden;
                                }
                                .file_icon {
                                    color: inherit;
                                    position: relative;
                                    .file_type {
                                        position: absolute;
                                        top: 0;
                                        left: 0;
                                        bottom: 0;
                                        right: 0;
                                        color: #ffffff;
                                        text-align: center;
                                        line-height: 48px;
                                    }
                                }
                            }
                            .image {
                                display: inline-block;
                                max-width: 62%;
                                height: auto;
                                img {
                                    display: inline-block;
                                    max-width: 100%;
                                    max-height: 260px;
                                    height: auto;
                                }
                            }
                        }
                    }
                }
            }
            &.me {
                padding-left: 140px;
                .chat_box {
                    display: flex;
                    justify-content: flex-end;
                    align-items: flex-start;
                    flex-direction: row-reverse;
                    .avatar_box {
                        width: 38px;
                        height: 38px;
                        min-width: 38px;
                        min-height: 38px;
                        .ivu-avatar {
                            width: 38px;
                            height: 38px;
                            line-height: 38px;
                            border-radius: 50%;
                            font-size: 22px;
                        }
                    }
                    .char_info_box {
                        padding-right: 8px;
                        flex: 1;
                        display: flex;
                        justify-content: flex-start;
                        align-items: flex-end;
                        flex-direction: column;
                        .history_info {
                            display: flex;
                            justify-content: flex-end;
                            align-items: center;
                            flex-direction: row-reverse;
                            .name {
                                font-size: 14px;
                                font-weight: normal;
                                color: rgba(73, 80, 96, 1);
                                line-height: 21px;
                                padding-left: 6px;
                            }
                            .time {
                                font-size: 13px;
                                font-weight: normal;
                                color: rgba(153, 153, 153, 1);
                                line-height: 20px;
                            }
                        }
                        .history_cont_box {
                            margin-top: 6px;
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            flex-direction: row-reverse;
                            .history_cont {
                                background: rgba(243, 243, 243, 1);
                                border-radius: 12px 4px 12px 12px;
                                padding: 8px 16px;
                                font-size: 14px;
                                font-weight: 400;
                                color: rgba(73, 80, 96, 1);
                                line-height: 20px;
                                word-break: break-word;
                                p {
                                    word-break: break-word;
                                }
                            }
                            .history_video{
                                width: 60%;
                                .video{
                                    width: 100%;
                                    height: auto;
                                }
                            }
                            .file {
                                flex: 1;
                                background: #ffffff;
                                border-radius: 4px 12px 12px 12px;
                                border: 1px #01c1b2 solid;
                                padding: 8px;
                                font-size: 14px;
                                font-weight: 400;
                                line-height: 20px;
                                width: 262px;
                                height: 66px;
                                display: flex;
                                justify-content: flex-start;
                                align-items: center;
                                flex-direction: row-reverse;
                                .file_info {
                                    flex: 1;
                                    width: 100%;
                                    overflow: hidden;
                                    margin-right: 12px;
                                    color: rgba(73, 80, 96, 1);
                                }
                                .file_icon {
                                    color: inherit;
                                    position: relative;
                                    .file_type {
                                        position: absolute;
                                        top: 0;
                                        left: 0;
                                        bottom: 0;
                                        right: 0;
                                        color: #ffffff;
                                        text-align: center;
                                        line-height: 48px;
                                    }
                                }
                            }
                            .image {
                                display: inline-block;
                                max-width: 62%;
                                height: auto;
                                img {
                                    display: inline-block;
                                    max-width: 100%;
                                    max-height: 260px;
                                    height: auto;
                                }
                            }
                        }
                    }
                }
            }
            .normal {
                font-size: 14px;
                font-weight: 400;
                color: rgba(187, 187, 187, 1);
                line-height: 24px;
                margin-right: 6px;
                white-space: nowrap;
            }
            .alert {
                margin: 0 6px;
                width: 18px;
                min-width: 18px;
            }
            .demo-spin-icon-load {
                animation: ani-demo-spin 1s linear infinite;
                margin: 0 6px;
            }
            @keyframes ani-demo-spin {
                from {
                    transform: rotate(0deg);
                }
                50% {
                    transform: rotate(180deg);
                }
                to {
                    transform: rotate(360deg);
                }
            }
        }
    }
    .context-menu-list {
        &:hover {
            background: #e3f2fd !important;
        }
        .btn-wrapper-simple {
            height: auto !important;
        }
    }
}
</style>

<template>
    <div class="myHistory">
        <Scroll :on-reach-top="handleReachTop" :distance-to-edge="[-10, -10]" class="history_scroll">
            <div class="chat_wrap" v-for="item in chatList" :key="item.data.id" :class="{ other: !isMe(item), me: isMe(item) }">
                <div class="chat_box">
                    <div class="avatar_box" v-if="isMe(item)">
                        <Avatar :src="userInfo.photo" v-if="userInfo.photo" />
                        <Avatar style="background-color: #87d068" icon="ios-person" v-else />
                    </div>
                    <div class="avatar_box" v-else>
                        <Avatar :src="item.data.fromAvator" v-if="item.data.fromAvator" />
                        <Avatar style="background-color: #87d068" icon="ios-person" v-else />
                    </div>
                    <div class="char_info_box">
                        <div class="history_info">
                            <!--<div class="name" v-if="isMe(item)">{{item.data.fromName}}</div>-->
                            <div class="name" v-if="$i18n.locale == 'zh-CN'">{{ item.data.fromName }}</div>
                            <div class="name" v-else>{{ item.data.fromEnName }}</div>
                            <div class="time"><Time :time="item.data.fromDate" type="datetime" v-if="item.data.fromDate" /></div>
                        </div>
                        <div class="history_cont_box">
                            <a
                                :href="item.data.filePath"
                                :download="JSON.parse(item.data.message).fileName"
                                @contextmenu="showMenu(item)"
                                class="file"
                                v-if="item.data.msgType == 3"
                            >
                                <div class="file_icon">
                                    <CommonIcon
                                        :type="fileIcon(item)"
                                        :size="48"
                                        :style="{ width: '48px', height: '48px', display: 'inline-block', verticalAlign: 'middle', lineHeight: 1 }"
                                    />
                                    <!--<span class="file_type">{{item.data.message.split('.')[item.data.message.split('.').length-1]}}</span>-->
                                </div>
                                <div class="file_info">
                                    <Poptip trigger="hover" :content="JSON.parse(item.data.message).fileName">
                                        <p style="white-space: nowrap;">{{ JSON.parse(item.data.message).fileName }}</p>
                                    </Poptip>

                                    <p style="text-align: right;color: #898989;">{{ JSON.parse(item.data.message).fileSizeStr }}</p>
                                </div>
                            </a>
                            <a :href="item.data.filePath" download class="image" @contextmenu="showMenu(item)" v-else-if="item.data.msgType == 4">
                                <img :src="item.data.filePath" />
                            </a>
                            <div class="history_audio" @contextmenu="showMenu(item)" v-else-if="item.data.msgType == 5">
                                <audio :src="item.data.filePath" controls>{{ $t('message_myhistory_295') }}</audio>
                            </div>
                            <div class="history_video" @contextmenu="showMenu(item)" v-else-if="item.data.msgType == 6">
                                <video controls="controls" class="video">
                                    <source :src="item.data.filePath" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <div class="history_cont" v-html="item.data.message" @contextmenu="showMenu(item)" v-else></div>
                            <span v-if="item.statusCode == '0'" class="normal" v-show="isMe(item)">
                                <span v-if="item.data.isRead == '1'">{{ $t('message_myhistory_296') }}</span>
                                <span v-else>{{ $t('message_myhistory_297') }}</span>
                            </span>
                            <span class="alert" v-else-if="item.statusCode == '1'" style="cursor:pointer;" @click="again(item.data)">
                                <Icon type="md-alert" size="18" color="#ff0000" v-show="item.data.fromId == roleId + ':' + userId" />
                            </span>
                            <Spin v-else v-show="item.data.fromId == roleId + ':' + userId"><Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon></Spin>
                        </div>
                    </div>
                </div>
            </div>
        </Scroll>
        <vue-context-menu :contextMenuData="contextMenuData" @copy="copy" @withdraw="withdraw" @remind="remind"></vue-context-menu>
    </div>
</template>

<script>
import CommonIcon from '_c/common-icon';
import { mapMutations, mapState } from 'vuex';
export default {
    props: {
        chatList: {
            type: Array,
            default: () => {
                return [];
            }
        },
        userId: {
            type: String,
            default: ''
        },
        roleId: {
            type: String,
            default: ''
        },
        toId: {
            type: String,
            default: ''
        },
        formAvator: {
            type: [String, Number],
            default: ''
        },
        toAvator: {
            type: [String, Number],
            default: ''
        },
        pageNo: {
            type: [String, Number],
            default: 1
        },
        hasHistory: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    components: {
        CommonIcon
    },
    data() {
        return {
            pageNum: this.pageNo,
            time: 0,
            sayId: '',
            content: '',
            msgType: '',
            contextMenuData: {
                // the contextmenu name(@1.4.1 updated)
                menuName: 'demo',
                // The coordinates of the display(菜单显示的位置)
                axis: {
                    x: null,
                    y: null
                },
                // Menu options (菜单选项)
                menulists: [
                    {
                        fnHandler: 'copy', // Binding events(绑定事件)
                        btnName: this.$t('message_myhistory_298') // The name of the menu option (菜单名称)
                    },
                    {
                        fnHandler: 'withdraw',
                        btnName: this.$t('message_myhistory_299')
                    },
                    {
                        fnHandler: 'remind',
                        btnName: this.$t('message_myhistory_300')
                    }
                ]
            },
            iconMap: {
                xlsx: '_excelfuzhi',
                xls: '_excelfuzhi',
                docx: '_wordfuzhi',
                doc: '_wordfuzhi',
                pdf: '_pdf1',
                ppt: '_pptfuzhi1',
                pptx: '_pptfuzhi1'
            }
        };
    },
    methods: {
        fileIcon(item) {
            let arr = item.data.filePath.split('.');
            let fileType = arr[arr.length - 1];
            if (fileType) {
                fileType = fileType.toLocaleLowerCase();
                return this.iconMap[fileType] || '_pptfuzhi';
            } else {
                return '_pptfuzhi';
            }
        },
        showMenu(item) {
            if (this.isMe(item)) {
                this.sayId = item.data.id;
                this.content = item.data.message;
                this.msgType = item.data.msgType;
                if (item.data.isRead == 1) {
                    this.contextMenuData.menulists = [
                        {
                            fnHandler: 'copy', // Binding events(绑定事件)
                            btnName: this.$t('message_myhistory_298') // The name of the menu option (菜单名称)
                        },
                        {
                            fnHandler: 'withdraw',
                            btnName: this.$t('message_myhistory_299')
                        }
                    ];
                } else {
                    this.contextMenuData.menulists = [
                        {
                            fnHandler: 'copy', // Binding events(绑定事件)
                            btnName: this.$t('message_myhistory_298') // The name of the menu option (菜单名称)
                        },
                        {
                            fnHandler: 'withdraw',
                            btnName: this.$t('message_myhistory_299')
                        },
                        {
                            fnHandler: 'remind',
                            btnName: this.$t('message_myhistory_300')
                        }
                    ];
                }
                event.preventDefault();
                var x = event.clientX;
                var y = event.clientY;
                // Get the current location
                this.contextMenuData.axis = {
                    x,
                    y
                };
            }
        },
        copy() {
            this.$emit('copy', this.content);
        },
        withdraw() {
            this.$emit('withdraw', this.sayId);
        },
        remind() {
            this.$emit('remind', this.sayId, this.msgType, this.content);
        },
        handleReachTop(flag) {
            this.pageNum += 1;
            this.$emit('getHistory', this.pageNum);
            return new Promise(resolve => {
                //              	this.time=setInterval(()=>{
                //              		console.log(this.hasHistory)
                //              		if(this.hasHistory){
                //              			this.$emit('offhistoryFlag');
                //              			this.time.clearInterval();
                resolve();
                //              		}
                //              	},21)
            });
        },
        isMe(item) {
            let fromId = item.data.fromId.split(':')[1] || item.data.fromId;
            return fromId == this.userId;
        },
        getTime(item) {
            return new Date(item.fromDate).toLocaleString();
        },
        again(item) {
            this.$emit('again', item);
        }
    }
};
</script>
