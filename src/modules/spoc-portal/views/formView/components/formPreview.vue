<style lang="less">
.formPreview {
    flex: 1;
    margin: 0 10px;
    background: #ffffff;
    overflow-x: hidden;
    height: 100%;
    // border: 1px solid #e5e5e5;
    border-radius: 4px;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
    .form {
        width: 100%;
        height: 100%;
        overflow: hidden;
        overflow-y: scroll;
        padding: 10px;
    }
    .vddl-list,
    .vddl-draggable {
        position: relative;
    }
    .vddl-list {
        min-height: 100%;
        width: 100%;
        padding-bottom: 44px;
    }
    .vddl-draggable {
        margin: 0 0 16px;
        padding: 20px 16px;
        .del {
            position: absolute;
            right: 20px;
            bottom: -16px;
            color: #d84636;
            background: #fff;
            -webkit-box-shadow: 0 2px 4px 0 rgba(163, 163, 163, 0.5);
            box-shadow: 0 2px 4px 0 rgba(163, 163, 163, 0.5);
            width: 35px;
            height: 35px;
            border-radius: 18px;
            line-height: 35px;
            text-align: center;
            z-index: 1;
            cursor: pointer;
            &:hover {
                color: #b73224;
            }
        }
        .ivu-form-item {
            margin-bottom: 0;
        }
        &.active {
            background: #ebf8fb;
        }
        &:hover {
            background: #f3fdfc;
        }
    }
    .vddl-dragging {
        opacity: 0.7;
    }
    .vddl-dragging-source {
        display: none;
    }
    .vddl-placeholder {
        width: 100%;
        height: 46px;
        // background: rgba(68, 188, 183, 0.2);
        // border: 1px dotted #CCCCCC;
        border-bottom: 1px solid #eee;
        background: rgba(68, 188, 183, 0.2);
    }
}
</style>
<template>
    <div class="formPreview">
        <Form :model="formModal" :label-width="option.form.labelWidth" :labelPosition="option.form.labelPosition" class="form">
            <vddl-list :list="formModal.items" :horizontal="false" :drop="drop" ref="vddlList">
                <vddl-draggable
                    v-for="(item, index) in formModal.items"
                    :key="item.id"
                    :draggable="item"
                    :index="index"
                    :wrapper="formModal.items"
                    effect-allowed="move"
                    :style="'width:' + ((item.col.span || option.global['*'].col.span) / 24) * 100 + '%;'"
                    :selected="setSelected"
                    :class="{ active: item.id == selectIndex }"
                >
                    <FormItem :prop="'items.'+index+'.value'" :label="item.title+'：'" :required="item.validate&&item.validate.length" :rules="item.validate&&item.validate.length?item.validate:[]"><formItemList :record="item"></formItemList></FormItem>
                    <span class="del" @click="del(index)" v-show="item.id == selectIndex">
                        <CommonIcon type="_del_" :size="18" :style="{ marginTop: '0px', display: 'inline-block', verticalAlign: 'middle' }" />
                    </span>
                </vddl-draggable>
                <!-- <vddl-placeholder :style="'width:' + (option.global['*'].col.span / 24) * 100 + '%;'">Custom placeholder</vddl-placeholder> -->
            </vddl-list>
        </Form>
    </div>
</template>

<script>
import formItemList from './formItemList.vue';
import CommonIcon from '_c/common-icon';
export default {
    props: {
        formOption: {
            type: Object,
            request: true
        },
        lists: {
            type: Array,
            request: true
        }
    },
    data() {
        return {
            // formModal: {},
            selectIndex: ''
        };
    },
    computed: {
        option() {
            return this.formOption;
        },
        formModal(){
            let obj={items:this.lists}
            return obj;
        }
    },
    components: { formItemList, CommonIcon },
    mounted() {},
    methods: {
        drop(e) {
            if (e.item.type == 'InputNumber' && !e.item.props.max) {
                e.item.props.max = Infinity;
            }
            if (e.item.type == 'InputNumber' && !e.item.props.min) {
                e.item.props.min = -Infinity;
            }
            e.item.id = this.guid();
            this.lists.splice(e.index, 0, e.item);
        },
        guid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
                let r = (Math.random() * 16) | 0;
                let v = c == 'x' ? r : (r & 0x3) | 0x8;
                return v.toString(16);
            });
        },
        del(ind) {
            this.lists.splice(ind, 1);
        },
        setSelected(item, e) {
            if (item) {
                this.selectIndex = item.id || '';
                this.$emit('setSelected', item.id || '');
            }else{
                this.selectIndex = '';
                this.$emit('setSelected', '');
            }
        }
    },
    watch: {
        // list: {
        //   handler: function (val, oldVal) {
        //       this.formModal=
        //   },
        //   deep: true
        // },
    }
};
</script>
