<style lang="less">
@mainColor: #44BCB7;
.user-tag-container{
    margin-top: 8px;
    padding: 20px;
    background: #fff;
    .title{
        @h: 20px;
        position: relative;
        height: @h;line-height: @h;margin-bottom: 16px;
        & > i{
            margin-right: 9px;
            color: @mainColor;font-size: 13px;
        }
        span{
            font-size: 14px;font-weight: bold;
        }
        .edit{
            font-size: 14px;color: #aaa;cursor: pointer;
        }
    }
    .lists{
        min-height: 1px;
    }
    .ivu-tag{
        margin:0 8px 8px 0;
    }
    .useLabelStyle{
        float: right;
    }
}
</style>
    
<template>
<div class="user-tag-container">
    <div class="title">
        <i class="iconfont icon-tongyongbiaoqian"></i>
        <span>{{$t('modules_spoc_core_web_src_views_customstate_customizestate_173')}}</span>
    </div>
    <div class="lists" v-if="detailData.tagList && detailData.tagList.length > 0">
        <Tag :fade="false" v-for="(tag, index) in detailData.tagList" :key="index" size="medium">{{tag.name}}</Tag>
    </div>
    <div class="lists"  v-if="!detailData.tagList || detailData.tagList.length == 0">
        <Tag :fade="false" size="medium">{{$t('modules_spoc_crm_web_src_views_customer360_components_usertag_1077')}}</Tag>
    </div>
</div>
</template>

<script>
/**
 ** @author: 曹见芳
 ** 客户360 - 左侧标签
 */
export default {
    name: 'userTag',
    props: {
        detailData: {
            type: Object,
            required: true
        },
    },
    computed: {
        ids() {
            let arr = [];
            if(this.detailData.tagList && this.detailData.tagList.length) {
                this.detailData.tagList.forEach(tag => {
                    arr.push(tag.id);
                });
            }
            return arr;
        }
    }
}
</script>


