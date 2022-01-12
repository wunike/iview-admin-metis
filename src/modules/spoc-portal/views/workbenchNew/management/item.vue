<style lang="less">
@import "../plugin/libs/theme.less";
.work-bench-management-item-container{
    position: relative;
    .img-box{
        position: relative;
        height: 94px;
        img{
            @w: 50px;
            width: @w;height: @w;
            position: absolute; top: 50%;left: 50%;transform: translate(-50%,-50%);
            margin-top: 10px;
        }
    }
    .name{
        @h: 33px;
        height: @h;line-height: @h;
        font-size: 18px;
    }
    .num{
        @h: 20px;
        height: @h;line-height: @h;
        font-size: 14px;color: #999;
    }
    .operation{
        position: absolute;left: 20px;right: 20px;bottom: 0;
        height: 59px;
        padding-top: 16px;
        border-top: 1px solid #EDEDED;
    }
    .edit,.delete{
        margin-top: 1px;color: #999;cursor: pointer;
        &:hover{
            color: @baseThemeColor;
        }
    }
    .edit{
        float: left;margin-left: 30px;
    }
    .delete{
        float: right;margin-right: 30px;
    }
    .ivu-switch{
        @h: 24px;
        float: left;width: 60px;margin-left: 20px;
        height: @h + 4px;
        &::after{
            width: @h;height: @h;border-radius: @h;
        }
    }
    .ivu-switch-checked:after{
        left: 33px;
    }
}
</style>
    
<template>
<div class="work-bench-management-item-container">
    <div class="img-box"><img :src="itemData.img" alt=""></div>
    <div class="name">{{itemData.name}}</div>
    <div class="num">宽*高（{{itemData.width}}*{{itemData.height}})</div>
    <div class="operation">
        <i class="iconfont icon-bianzu31 edit" @click="editItem"></i>
        <i-switch v-model="itemData.display" :loading="loading" true-value="1" false-value="0" :before-change="handleBeforeChange"/>
        <i class="iconfont icon-shanchu delete" @click="deleteItem"></i>
    </div>
</div>
</template>

<script>
/**
 ** @author: 曹见芳
 ** 工作台 - 门户管理项
 */
import valid, { errors, sysAttachment, comPortalItem } from '../../../libs/request.js';
import { mapState, mapMutations } from 'vuex';
export default {
    name: 'workBenchManegementItem',
    props: {
        itemData: {
            type: Object,
            required: true
        }
    },
    data(){
        return {
            loading: false
        };
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        editItem() {
            let _item = Object.assign({}, this.itemData);
            _item.isDisplay = this.itemData.display;
            this.$emit('onEdit', _item)
        },
        deleteItem() {
             this.$Modal.confirm({
                title: '确认删除',
                content: `确认删除 ${this.itemData.name} 吗？`,
                onOk: () => {
                    this.findRelevancyInfo('delFlag');
                }
            });
        },
        saveItem() {},
        handleBeforeChange() {
            this.loading = true;
            return new Promise((resolve) => {
                this.findRelevancyInfo('display',resolve);
            });
        },
        findRelevancyInfo(type, callback) {
            let params = {
                protalItemId: this.itemData.id
            }
            this.updateLoadingStatus({ isLoading: true });
            comPortalItem.findRelevancyInfo(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    // true: 不能修改
                    let _data = res.data.data;
                    if(_data) {
                        this.$Notice.config({
                            top: 120,
                        });
                        this.$Notice.error({
                            title: '提示',
                            render: h => {
                                let dom = [
                                    '该项已经被分配到 ',
                                    h('a', '校长CM'),
                                    '、',
                                    h('a', '服务OO'),
                                    '的工作台模板中，暂不能隐藏。',
                                    h('div', '如需隐藏，请先将该项从已分配的工作台模板中删除。')
                                ]
                                if(type == 'delFlag') {
                                    dom = [
                                        '该项已经被分配到 ',
                                        h('a', '校长CM'),
                                        '、',
                                        h('a', '服务OO'),
                                        '的工作台模板中，暂不能删除。',
                                        h('div', '如需删除，请先将该项从已分配的工作台模板中删除。')
                                    ]
                                }
                                return h('div', {
                                    style: {
                                        'line-height': 1.5
                                    }
                                }, dom)
                            },
                            // duration: 0,
                        });
                        this.updateLoadingStatus({ isLoading: false });
                    } else {
                        // false: 可以修改
                        callback && callback();
                        this.updatePortalItem(type);
                    }
                } else {
                    this.updateLoadingStatus({ isLoading: false });
                }
            })
            .catch(errors.call(this))
            .finally(() => {
                this.loading = false;
            })
        },
        updatePortalItem(type) {
            let params = {
                protalItemId: this.itemData.id
            }
            if(type == 'display') {
                // 显示、隐藏
                params.display = this.itemData.display == '1' ? '0' : '1';
            } else {
                // 删除
                params.delFlag = '1'
            }
            comPortalItem.updatePortalItem(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    let str = type == 'delFlag' ? '删除成功！' : '修改成功！'
                    this.$Message.success(str);
                    this.$emit('uploadItem')
                }
            })
            .catch(errors.call(this))
            .finally(() => {
                this.updateLoadingStatus({ isLoading: false });
            });
        },
    },
}
</script>


