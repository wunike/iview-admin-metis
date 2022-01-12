<style lang="less">
.essentialInfo {
    background: #ffffff;
    padding: 0 32px 32px;
    .essentialInfo_wrap {
        margin-bottom: 20px;
        .essentialInfo_tit {
            font-size: 16px;
            font-weight: normal;
            color: rgba(73, 80, 96, 1);
            line-height: 24px;
            padding-bottom: 8px;
        }
        .essentialInfo_box {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .essentialInfo_info {
                font-size: 14px;
                font-weight: normal;
                color: rgba(153, 153, 153, 1);
                line-height: 21px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                min-width: 230px;
                .essentialInfo_content{
                    color: #495060;
                }
            }
        }
        .collapse_wrap {
            display: flex;
            padding-top: 8px;
            .collapse {
                width: 230px;
                margin-right: 32px;
                box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
                .ivu-collapse-content {
                    height: 211px;
                    overflow: auto;
                    .ivu-collapse-content-box {
                        padding: 0;
                    }
                }
            }
        }
    }
}
</style>
<template>
    <div class="essentialInfo">
        <div class="essentialInfo_wrap">
            <div class="essentialInfo_tit">包年包月</div>
            <div class="essentialInfo_box">
                <div class="essentialInfo_info">
                    <div class="essentialInfo_label">定价：</div>
                    <div class="essentialInfo_content">9999.00元/年</div>
                </div>
                <div class="essentialInfo_info">
                    <div class="essentialInfo_label">限制服务时长：</div>
                    <div class="essentialInfo_content">1年（365天）</div>
                </div>
            </div>
        </div>
        <div class="essentialInfo_wrap">
            <div class="essentialInfo_tit">按量付费</div>
            <div class="essentialInfo_box">
                <div class="essentialInfo_info">
                    <div class="essentialInfo_label">定价：</div>
                    <div class="essentialInfo_content">9999.00元/年</div>
                </div>
                <div class="essentialInfo_info">
                    <div class="essentialInfo_label">限制客户数量：</div>
                    <div class="essentialInfo_content">999人</div>
                </div>
            </div>
        </div>

        <div class="essentialInfo_wrap">
            <div class="essentialInfo_tit">功能</div>
            <div class="essentialInfo_box">
                <div class="essentialInfo_info">
                    <div class="essentialInfo_label">包含功能包：</div>
                    <div class="essentialInfo_content">{{collapseList.map(v=>v.name).join('、')}}</div>
                </div>
            </div>
            <div class="collapse_wrap">
                <Collapse value="1" class="collapse" v-for="(item, index) in collapseList" :key="index">
                    <Panel name="1" hide-arrow>
                        {{ item.name }}
                        <div slot="content">
                            <div class="tree_box"><Tree :data="item.collapseTree"></Tree></div>
                        </div>
                    </Panel>
                </Collapse>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            collapseList: [
                {
                    name: '家校互动',
                    collapseTree: [
                        {
                            title: 'parent 1',
                            expand: true,
                            children: [
                                {
                                    title: 'parent 1-1',
                                    expand: true,
                                    children: [
                                        {
                                            title: 'leaf 1-1-1'
                                        },
                                        {
                                            title: 'leaf 1-1-2'
                                        }
                                    ]
                                },
                                {
                                    title: 'parent 1-2',
                                    expand: true,
                                    children: [
                                        {
                                            title: 'leaf 1-2-1'
                                        },
                                        {
                                            title: 'leaf 1-2-1'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            title: 'parent 1',
                            expand: true,
                            children: [
                                {
                                    title: 'parent 1-1',
                                    expand: true,
                                    children: [
                                        {
                                            title: 'leaf 1-1-1'
                                        },
                                        {
                                            title: 'leaf 1-1-2'
                                        }
                                    ]
                                },
                                {
                                    title: 'parent 1-2',
                                    expand: true,
                                    children: [
                                        {
                                            title: 'leaf 1-2-1'
                                        },
                                        {
                                            title: 'leaf 1-2-1'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    name: '教务管理',
                    collapseTree: [
                        {
                            title: 'parent 1',
                            expand: true,
                            children: [
                                {
                                    title: 'parent 1-1',
                                    expand: true,
                                    children: [
                                        {
                                            title: 'leaf 1-1-1'
                                        },
                                        {
                                            title: 'leaf 1-1-2'
                                        }
                                    ]
                                },
                                {
                                    title: 'parent 1-2',
                                    expand: true,
                                    children: [
                                        {
                                            title: 'leaf 1-2-1'
                                        },
                                        {
                                            title: 'leaf 1-2-1'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    },
    components: {}
};
</script>
