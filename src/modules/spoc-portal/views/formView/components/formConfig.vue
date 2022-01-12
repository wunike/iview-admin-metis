<style lang="less">
.formConfig {
    width: 340px;
    min-width: 340px;
    background: #ffffff;
    overflow: hidden;
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
        .ivu-tabs-bar {
            margin: 0;
        }
        .ivu-tabs-content {
            height: calc(~'100% - 48px');
        }
    }
    .controlSettings {
        width: 100%;
        height: 100%;
        padding: 10px;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .formSettings {
        width: 100%;
        height: 100%;
        padding: 10px;
        overflow-x: hidden;
        overflow-y: auto;
        .ivu-input-number{
            width: 100%;
        }
    }
}
</style>

<template>
    <div class="formConfig">
        <Tabs v-model="tabName">
            <TabPane label="控件设置" name="name1">
                <div class="controlSettings"><propSeItem :formData="lists.find(v => v.id == selectId)" v-if="selectId"></propSeItem></div>
            </TabPane>
            <TabPane label="表单设置" name="name2">
                <div class="formSettings">
                    <Form ref="formInline" :model="formOption" label-colon label-position="top" class="setItemForm">
                        <FormItem label="标签位置">
                            <Select v-model="formOption.labelPosition">
                                <Option :value="item.value" v-for="item in labelPositionList" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="标签宽度"><InputNumber v-model="formOption.labelWidth"></InputNumber></FormItem>
                        <FormItem label="表单项宽度"><InputNumber v-model="formGlobal['*'].col.span" :max="24" :min="1" style="width: 240px;"></InputNumber>&nbsp;&nbsp;/&nbsp;&nbsp;24</FormItem>
                    </Form>
                </div>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
import propSeItem from './propSeItem.vue';
export default {
    props: {
        lists: {
            type: Array,
            request: true
        },
        formOption: {
            type: Object,
            request: true
        },
        formGlobal: {
            type: Object,
            request: true
        },
        selectId: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            tabName: 'name2',
            labelPositionList: [{ label: '左方', value: 'left' }, { label: '右方', value: 'right' }, { label: '上方', value: 'top' }]
        };
    },
    computed: {
        name() {
            return this.data;
        }
    },
    components: { propSeItem },
    mounted() {},
    methods: {}
};
</script>
