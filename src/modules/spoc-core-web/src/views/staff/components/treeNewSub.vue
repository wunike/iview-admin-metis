<style lang="less">
.my-tree-new{
    position: relative;
    height:100%;
    overflow-y: auto;
    >div{
        height:100%;
    }
    /*.active{*/
    /*    >.tree-item{*/
    /*        .ic-box{*/
    /*            background: #44BCB7;*/
    /*            color:#fff;*/
    /*            border:1px solid #44BCB7;*/
    /*        }*/
    /*        .r-ic-box{*/
    /*            color:#fff;*/
    /*            a{*/
    /*                color:#fff;*/
    /*            }*/
    /*        }*/
    /*    }*/
    /*    .sub-tree{*/
    /*        .li{*/
    /*            .tree-item{*/
    /*                .ic-box{*/
    /*                    background: rgba(68, 188, 183, 0.2);*/
    /*                    color:rgba(73, 80, 96, 1);*/
    /*                    border:1px solid rgba(68, 188, 183, 0.2);*/
    /*                }*/
    /*            }*/
    /*        }*/
    /*    }*/
    /*}*/
    .sub-tree{
        .sub-tree{
            margin-left:40px;
            /*.li>.sub-tree{*/
            /*    margin-left:30px;*/
            /*    .li>.sub-tree{*/
            /*        margin-left:30px;*/
            /*        .li>.sub-tree{*/
            /*            margin-left:30px;*/
            /*            .li>.sub-tree{*/
            /*                margin-left:30px;*/
            /*            }*/
            /*        }*/
            /*    }*/
            /*}*/
        }
    }
    .sub-tree{
        .li{
            position: relative;
            &:before{
                position: absolute;
                content: '';
                left: -22px;
                top: -16px;
                width: 1px;
                height:calc(~"100% + 16px");
                border-left: 1px solid #D8D8D8;
            }
            /*:not(:last-child)*/
            &:after {
                position: absolute;
                content: '';
                width:19px;
                height: 1px;
                left:-22px;
                top: 15px;
                border-top: 1px solid #D8D8D8;
            }
            &:last-child{
                &:before{
                    height: 32px;
                }
            }
        }
    }
    .tree-item{
        height: 32px;
        cursor: pointer;
        position: relative;
        background: #fff;
        margin-bottom:16px;
        color:#333;
        &:hover{
            .ic-box{
                background: #44BCB7;
                color:#fff;
                border:1px solid #44BCB7;
            }
            .r-ic-box{
                color:#fff;
                a{
                    color:#fff;
                }
            }
            &~  .sub-tree{
                .li{
                    .tree-item{
                        .ic-box{
                            background: rgba(68, 188, 183, 0.2);
                            color:rgba(73, 80, 96, 1);
                            border:1px solid rgba(68, 188, 183, 0.2);
                        }
                    }
                }
            }
        }
        .ic-box{
            display: flex;
            height: 30px;
            line-height: 30px;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            border-radius:4px;
            border:1px solid rgba(217,217,217,1);
            margin-right:10px;
            padding-left:6px;
            position: relative;
            span{
                size:14px;
            }
        }
        .r-ic-box{
            text-indent: initial;
            text-align:right;
            position: absolute;
            right:11px;
            top:0;
            width:200px;
            font-size: 14px;
            color:#333333;
            /*background: #E3F2FD;*/
            cursor: default;
            margin-right:20px;
            height:30px;
            line-height: 30px;
            a{
                font-size: 12px;
            }
            .span{
                font-size: 12px;
                margin:0 10px;
            }
            .r-ic1{
                padding-right:16px;
                color:#999999;
                font-size: 18px;
            }
            .r-ic:nth-of-type(3){
                padding-right:16px;
                color:#999999;
                font-size: 18px;
            }
            .r-ic:nth-of-type(1),.r-ic:nth-of-type(2){
                padding-right:12px;
                color:#999;
                font-size: 18px;
            }
        }
        .right {
            transition: all .3s;
            transform-origin: center;
            transform: rotate(-180deg);
            font-size:15px;
            margin-right:5px;
        }
        .down {
            transition: all .3s;
            transform-origin: center;
            transform: rotate(-90deg) ;
            font-size:15px;
            margin-right:5px;
        }
        .nochild{
            display: inline-block;
            width: 16px;
            height: 16px;
            vertical-align: middle;
        }

    }
    
}
</style>
<template>
    <div class="my-tree-new">
        <div v-for="item in data" :key="'tree0_'+item.id"  class="sub-tree" :class="{active:item.id==onlyId}">
            <div class="tree-item"   @click.stop="itemClick(item)">
                <div class="ic-box" >
                    <Icon
                        type="md-arrow-dropleft"
                        size="24"
                        :class="{'down':item.expand,'right':!item.expand}"
                        v-if="item.children && item.children.length"
                        @click.stop="item.expand=!item.expand" />
                    <i v-else class="nochild"></i>
                    <span class="t">{{item.title}}</span>
                    <div class="r-ic-box">
<!--                        <Icon class="r-ic" type="md-create" />-->
                        <!--<Icon class="r-ic" type="ios-trash" />-->
<!--                        <Icon class="r-ic1" type="md-add" @click.stop="addNext(item)" />-->
                        <a @click.stop="reWrite(item)">{{$t('classroom_allscore_51')}}</a>
                            <a class="span">{{$t('modules_spoc_core_web_src_views_staff_components_treenewsub_308')}}</a>
<!--                        <a @click.stop="delItem(item)">{{$t('classlist_compontents_detailinfo_46')}}</a>-->
                        <a @click.stop="addNext(item)">{{$t('modules_spoc_core_web_src_views_staff_components_treenewsub_310')}}</a>
                    </div>
                </div>
            </div>
            <div v-if="item.children&&item.expand"  class="sub-tree">
                <div v-for="item2 in item.children" class="li"  :class="{active:item2.id==onlyId}">
                    <div class="tree-item"  :key="'tree1_'+item2.id" @click.stop="itemClick(item2)">
                        <div class="ic-box">
                            <Icon
                                type="md-arrow-dropleft"
                                size="24"
                                :class="{'down':item2.expand,'right':!item2.expand}"
                                v-if="item2.children && item2.children.length"
                                @click.stop="item2.expand=!item2.expand" />
                            <i v-else class="nochild"></i>
                            <span class="t">{{item2.title}}</span>
                            <div class="r-ic-box">
<!--                                <Icon class="r-ic" type="md-create" @click.stop="reWrite(item2)"/>-->
<!--                                <Icon class="r-ic" type="ios-trash" @click.stop="delItem(item2)"/>-->
<!--                                <Icon class="r-ic" type="md-add" @click.stop="addNext(item2)" />-->
                                <a @click.stop="reWrite(item2)">{{$t('classroom_allscore_51')}}</a>
                                <a class="span">{{$t('modules_spoc_core_web_src_views_staff_components_treenewsub_308')}}</a>
                                <a @click.stop="addNext(item2)">{{$t('modules_spoc_core_web_src_views_staff_components_treenewsub_310')}}</a>
                                <a class="span">{{$t('modules_spoc_core_web_src_views_staff_components_treenewsub_308')}}</a>
                                <a @click.stop="delItem(item2)">{{$t('classlist_compontents_detailinfo_46')}}</a>

                            </div>
                        </div>
                    </div>
                    <div v-if="item2.children&&item2.expand" class="sub-tree " :key="'t3_'+item2.id">
                        <div v-for="item3 in item2.children" class="li"  :class="{active:item3.id==onlyId}">
                            <div class="tree-item" :key="'t33_'+item3.id" @click.stop="itemClick(item3)">
                                <div class="ic-box" :class="{active:item3.id==onlyId}">
                                    <Icon
                                        type="md-arrow-dropleft"
                                        size="24"
                                        :class="{'down':item3.expand,'right':!item3.expand}"
                                        v-if="item3.children && item3.children.length"
                                        @click.stop="item3.expand=!item3.expand" />
                                    <i v-else class="nochild"></i>
                                    <span class="t">{{item3.title}}</span>
                                    <div class="r-ic-box">
<!--                                        <Icon class="r-ic" type="md-create" @click.stop="reWrite(item3)"/>-->
<!--                                        <Icon class="r-ic" type="ios-trash" @click.stop="delItem(item3)"/>-->
<!--                                        <Icon class="r-ic" type="md-add" @click.stop="addNext(item3)"/>-->
                                        <a @click.stop="reWrite(item3)">{{$t('classroom_allscore_51')}}</a>
                                        <a class="span">{{$t('modules_spoc_core_web_src_views_staff_components_treenewsub_308')}}</a>
                                        <a @click.stop="addNext(item3)">{{$t('modules_spoc_core_web_src_views_staff_components_treenewsub_310')}}</a>
                                        <a class="span">{{$t('modules_spoc_core_web_src_views_staff_components_treenewsub_308')}}</a>
                                        <a @click.stop="delItem(item3)">{{$t('classlist_compontents_detailinfo_46')}}</a>
                                    </div>
                                </div>

                            </div>
                            <div v-if="item3.children&&item3.expand" class="sub-tree " :key="'t4_'+item3.id">
                                <div v-for="item4 in item3.children" class="li" :class="{active:item4.id==onlyId}">
                                    <div class="tree-item" :key="item4.id" @click.stop="itemClick(item4)">
                                        <div class="ic-box" >
                                            <Icon
                                                type="md-arrow-dropleft"
                                                size="24"
                                                :class="{'down':item4.expand,'right':!item4.expand}"
                                                v-if="item4.children && item4.children.length"
                                                @click.stop="item4.expand=!item4.expand" />
                                            <i v-else class="nochild"></i>
                                            <span class="t">{{item4.title}}</span>
                                            <div class="r-ic-box">
<!--                                                <Icon class="r-ic" type="md-create" @click.stop="reWrite(item4)"/>-->
<!--                                                <Icon class="r-ic" type="ios-trash" @click.stop="delItem(item4)"/>-->
<!--                                                <Icon class="r-ic" type="md-add" @click.stop="addNext(item4)"/>-->
                                                <a @click.stop="reWrite(item4)">{{$t('classroom_allscore_51')}}</a>
                                                <a class="span">{{$t('modules_spoc_core_web_src_views_staff_components_treenewsub_308')}}</a>
                                                <a @click.stop="addNext(item4)">{{$t('modules_spoc_core_web_src_views_staff_components_treenewsub_310')}}</a>
                                                <a class="span">{{$t('modules_spoc_core_web_src_views_staff_components_treenewsub_308')}}</a>
                                                <a @click.stop="delItem(item4)">{{$t('classlist_compontents_detailinfo_46')}}</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="item4.children&&item4.expand" class="sub-tree " :key="'t5_'+item4.id">
                                        <div v-for="item5 in item4.children" class="li" :class="{active:item5.id==onlyId}">
                                            <div class="tree-item"  :key="'t55_'+item5.id" @click.stop="itemClick(item5)">
                                                <div class="ic-box" >
                                                    <Icon
                                                        type="md-arrow-dropleft"
                                                        size="24"
                                                        :class="{'down':item5.expand,'right':!item5.expand}"
                                                        v-if="item5.children && item5.children.length"
                                                        @click.stop="item5.expand=!item5.expand" />
                                                    <i v-else class="nochild"></i>
                                                    <span class="t">{{item5.title}}</span>
                                                    <div class="r-ic-box">
<!--                                                        <Icon class="r-ic" type="md-create" @click.stop="reWrite(item5)"/>-->
<!--                                                        <Icon class="r-ic" type="ios-trash" @click.stop="delItem(item5)"/>-->
<!--                                                        <Icon class="r-ic" type="md-add" @click.stop="addNext(item5)"/>-->
                                                        <a @click.stop="reWrite(item5)">{{$t('classroom_allscore_51')}}</a>
                                                        <a class="span">{{$t('modules_spoc_core_web_src_views_staff_components_treenewsub_308')}}</a>
                                                        <a @click.stop="addNext(item5)">{{$t('modules_spoc_core_web_src_views_staff_components_treenewsub_310')}}</a>
                                                        <a class="span">{{$t('modules_spoc_core_web_src_views_staff_components_treenewsub_308')}}</a>
                                                        <a @click.stop="delItem(item5)">{{$t('classlist_compontents_detailinfo_46')}}</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-if="item5.children&&item5.expand" class="sub-tree " :key="'t6_'+item5.id">
                                                <div v-for="item6 in item5.children" class="li" :class="{active:item6.id==onlyId}">
                                                    <div class="tree-item"  :key="'t66_'+item6.id" @click.stop="itemClick(item6)">
                                                        <div class="ic-box" >
                                                            <Icon
                                                                type="md-arrow-dropleft"
                                                                size="24"
                                                                :class="{'down':item6.expand,'right':!item6.expand}"
                                                                v-if="item6.children && item6.children.length"
                                                                @click.stop="item6.expand=!item6.expand" />
                                                            <i v-else class="nochild"></i>
                                                            <span class="t">{{item6.title}}</span>
                                                            <div class="r-ic-box">
<!--                                                                <Icon class="r-ic" type="md-create" @click.stop="reWrite(item6)"/>-->
<!--                                                                <Icon class="r-ic" type="ios-trash" @click.stop="delItem(item6)"/>-->
                                                                <!--<Icon class="r-ic" type="md-add" @click="addNext(item6)"/>-->
                                                                <a @click.stop="reWrite(item6)">{{$t('classroom_allscore_51')}}</a>
                                                                <a class="span">{{$t('modules_spoc_core_web_src_views_staff_components_treenewsub_308')}}</a>
<!--                                                                <a @click.stop="addNext(item6)">{{$t('modules_spoc_core_web_src_views_staff_components_treenewsub_310')}}</a>-->
                                                                <a @click.stop="delItem(item6)">{{$t('classlist_compontents_detailinfo_46')}}</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    props:{
        hide:{
            type:Boolean,
            default:()=>{
                return true
            }
        },
        data:{
            type:Array,
            required:true,
            default:function(){
                return [];
            }
        },
        menu:{
            type:Boolean,
            default:false
        },
        curr:{
            type:Object,
            default:function(){
                return {};
            }
        },
        hideStaffNums: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            onlyId:'',
        };
    },
    mounted(){
        // console.log(this.hide+'0000')
    },
    methods:{
        setId(id){
            this.onlyId = id
        },
        itemClick(item){
            this.onlyId = item.id
            this.$emit('item-click',item);
        },
        addNext(item){
            this.$emit('add-next',item);
        },
        reWrite(item) {
            this.$emit('re-write',item);
        },
        delItem(item) {
            if(item.num){
                this.$Message.warning({content:this.$t('views_staff_components_treen_715'),duration:1});
            }else{
                this.$emit('delete-item',item);
            }
        },
        showPopMenu(e,item){
            this.$emit('menu-click',e,item);
        },
        titleNum(title,item){
            if(typeof item.num !='undefined' && this.hideStaffNums){
                let code = item.code ? item.code : ''
                return title + '('+ item.num + this.$t('modules_rolemanage_178') + ')';
            }
            return title;
        },
    },
}
</script>
