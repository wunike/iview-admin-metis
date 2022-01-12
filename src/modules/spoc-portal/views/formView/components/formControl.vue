<style lang="less">
.formControl {
    width: 340px;
    min-width: 340px;
    background: #ffffff;
    overflow-x: hidden;
    height: 100%;
    // border: 1px solid #e5e5e5;
    border-radius: 4px;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
    .ivu-tabs {
        height: 100%;
        overflow: hidden;
        .ivu-tabs-nav .ivu-tabs-tab {
            padding: 14px 18px;
        }
        .ivu-tabs-bar{
            margin: 0;
        }
        .ivu-tabs-content {
            height: calc(~'100% - 48px');
            overflow-x: hidden;
        }
    }
    .formControl_box {
        column-count: 2;
        column-gap: 16px;
        column-span: all;
        height: auto;
        padding: 16px 16px 0;
        overflow-x: hidden;
        flex: 1;
        width: 100%;
        .vddl-list,
        .vddl-draggable {
            position: relative;
        }
        .vddl-list {
            min-height: 44px;
        }
        .vddl-dragging {
            opacity: 0.7;
        }
        .vddl-dragging-source {
            display: block;
        }
        .vddl-placeholder {
            width: 100%;
            min-height: 44px;
            line-height: 1;
            border-bottom: 1px solid #eee;
            padding: 0 15px;
            background: rgba(68, 188, 183, 0.2);
        }
        .button {
            min-height: 44px;
            break-inside: avoid;
            font-size: 14px;
            margin-bottom: 10px;
            padding: 0 8px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            border-radius: 4px;
            &:hover {
                background: rgba(0, 136, 249, 0.09);
            }
            .button_name {
                padding-left: 14px;
            }
        }
    }
}
</style>

<template>
    <div class="formControl">
        <Tabs value="name1">
            <TabPane label="表单控件" name="name1">
                <div class="formControl_box">
                    <vddl-draggable class="button" v-for="(item, index) in list" :index="index" :key="item.id" :draggable="item" :copied="item.id" effect-allowed="copy">
                        <Icon :size="16" :type="item.icon" />
                        <div class="button_name" v-html="item.name"></div>
                    </vddl-draggable>
                </div>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>

export default {
    props: {
        formMap: {
            type: Array,
            request: true
        },
    },
    data() {
        return {
            list: null
        };
    },
    computed: {},
    components: {
        // Name
    },
    mounted() {
        this.list = this.formMap.map(v => {
            v.id = this.guid();
            return v;
        });
    },
    methods: {
        guid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
                let r = (Math.random() * 16) | 0;
                let v = c == 'x' ? r : (r & 0x3) | 0x8;
                return v.toString(16);
            });
        }
    }
};
</script>
