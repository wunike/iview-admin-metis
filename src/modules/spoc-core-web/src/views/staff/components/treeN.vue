<style lang="less">
.my-tree{
    position: relative;
    height:calc(~"100% - 52px");
    overflow-y: auto;
    >div{
        // height:100%;
    }
    .ic1{
        padding-left:10px;
    }
    .ic2{
        padding-left:20px;
    }
    .ic3{
        padding-left:30px;
    }
    .ic4{
        padding-left:40px;
    }
    .ic5{
        padding-left:50px;
    }
    .ic6{
        padding-left:60px;
    }
    .active{
        background: #E3F2FD;
    }
    .tree-item{
        height: 30px;
        line-height: 30px;
        cursor: pointer;
        position: relative;
        background: #fff;
        color:#333;
        .ic-box{
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .r-ic-box{
            display: none;
            text-indent: initial;
            text-align:right;
            position: absolute;
            right:0px;
            top:0;
            width:100px;
            font-size: 14px;
            color:#333333;
            background: #E3F2FD;
            cursor: default;
            .r-ic1{
                padding-right:16px;
                color:#999999;
                font-size: 18px;
                &:hover{
                    color:#495060;
                }
            }
            .r-ic:nth-of-type(3){
                padding-right:16px;
                color:#999999;
                font-size: 18px;
                &:hover{
                    color:#495060;
                }
            }
            .r-ic:nth-of-type(1),.r-ic:nth-of-type(2){
                padding-right:12px;
                color:#999;
                font-size: 18px;
                &:hover{
                    color:#495060;
                }
            }
        }
        &:hover{
            .ic-box{
                background: #E3F2FD;
            }
            .r-ic-box{
                display: block;
                z-index: 2;
                .r-ic1, .r-ic{
                    cursor: pointer;
                    color:#999999;
                    &:hover{
                        color:#495060;
                    }
                }
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
    <div class="my-tree">
        <div v-for="item in data" :key="'tree0_'+item.id"  >
            <div class="tree-item"   @click.stop="itemClick(item)">
                <div class="ic-box ic1" :class="{active:item.id==onlyId}">
                    <Icon
                        type="ios-arrow-back"
                        :class="{'down':item.expand,'right':!item.expand}"
                        v-if="item.children && item.children.length"
                        @click.stop="item.expand=!item.expand" />
                    <i v-else class="nochild"></i>
                    <span class="t">{{titleNum(item.title, item)}}</span>
                    <div class="r-ic-box" v-if="!!hide">
                        <Icon class="r-ic" type="md-create" @click.stop="reWrite(item)"/>
                        <!--<Icon class="r-ic" type="ios-trash" />-->
                        <Icon class="r-ic1" type="md-add" @click.stop="addNext(item)" />
                    </div>
                </div>
            </div>
            <div v-if="item.children&&item.expand"  >
                <template v-for="item2 in item.children">
                    <div class="tree-item sub-tree1"  :key="'tree1_'+item2.id" @click.stop="itemClick(item2)">
                        <div class="ic-box ic2" :class="{active:item2.id==onlyId}">
                            <Icon
                                type="ios-arrow-back"
                                :class="{'down':item2.expand,'right':!item2.expand}"
                                v-if="item2.children && item2.children.length"
                                @click.stop="item2.expand=!item2.expand" />
                            <i v-else class="nochild"></i>
                            <span class="t">{{titleNum(item2.title, item2)}}</span>
                            <div class="r-ic-box" v-if="!!hide">
                                <Icon class="r-ic" type="md-create" @click.stop="reWrite(item2)"/>
                                <Icon class="r-ic" type="ios-trash" @click.stop="delItem(item2)"/>
                                <Icon class="r-ic" type="md-add" @click.stop="addNext(item2)" />
                            </div>
                        </div>
                    </div>
                    <div v-if="item2.children&&item2.expand" class="sub-tree " :key="'t3_'+item2.id">
                        <template v-for="item3 in item2.children" >
                            <div class="tree-item" :class="{active:item3.id==onlyId}" :key="'t33_'+item3.id" @click.stop="itemClick(item3)">
                                <div class="ic-box ic3" :class="{active:item3.id==onlyId}">
                                    <Icon
                                        type="ios-arrow-back"
                                        :class="{'down':item3.expand,'right':!item3.expand}"
                                        v-if="item3.children && item3.children.length"
                                        @click.stop="item3.expand=!item3.expand" />
                                    <i v-else class="nochild"></i>
                                    <span class="t">{{titleNum(item3.title, item3)}}</span>
                                    <div class="r-ic-box" v-if="!!hide">
                                        <Icon class="r-ic" type="md-create" @click.stop="reWrite(item3)"/>
                                        <Icon class="r-ic" type="ios-trash" @click.stop="delItem(item3)"/>
                                        <Icon class="r-ic" type="md-add" @click.stop="addNext(item3)"/>
                                    </div>
                                </div>

                            </div>
                            <div v-if="item3.children&&item3.expand" class="sub-tree " :key="'t4_'+item3.id">
                                <template v-for="item4 in item3.children">
                                    <div class="tree-item" :class="{active:item4.id==onlyId}" :key="item4.id" @click.stop="itemClick(item4)">
                                        <div class="ic-box ic4" :class="{active:item4.id==onlyId}">
                                            <Icon
                                                type="ios-arrow-back"
                                                :class="{'down':item4.expand,'right':!item4.expand}"
                                                v-if="item4.children && item4.children.length"
                                                @click.stop="item4.expand=!item4.expand" />
                                            <i v-else class="nochild"></i>
                                            <span class="t">{{titleNum(item4.title, item4)}}</span>
                                            <div class="r-ic-box" v-if="!!hide">
                                                <Icon class="r-ic" type="md-create" @click.stop="reWrite(item4)"/>
                                                <Icon class="r-ic" type="ios-trash" @click.stop="delItem(item4)"/>
                                                <Icon class="r-ic" type="md-add" @click.stop="addNext(item4)"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="item4.children&&item4.expand" class="sub-tree " :key="'t5_'+item4.id">
                                        <template v-for="item5 in item4.children">
                                            <div class="tree-item" :class="{active:item5.id==onlyId}" :key="'t55_'+item5.id" @click.stop="itemClick(item5)">
                                                <div class="ic-box ic5" :class="{active:item5.id==onlyId}">
                                                    <Icon
                                                        type="ios-arrow-back"
                                                        :class="{'down':item5.expand,'right':!item5.expand}"
                                                        v-if="item5.children && item5.children.length"
                                                        @click.stop="item5.expand=!item5.expand" />
                                                    <i v-else class="nochild"></i>
                                                    <span class="t">{{titleNum(item5.title, item5)}}</span>
                                                    <div class="r-ic-box" v-if="!!hide">
                                                        <Icon class="r-ic" type="md-create" @click.stop="reWrite(item5)"/>
                                                        <Icon class="r-ic" type="ios-trash" @click.stop="delItem(item5)"/>
                                                        <Icon class="r-ic" type="md-add" @click.stop="addNext(item5)"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-if="item5.children&&item5.expand" class="sub-tree " :key="'t6_'+item5.id">
                                                <template v-for="item6 in item5.children">
                                                    <div class="tree-item" :class="{active:item6.id==onlyId}" :key="'t66_'+item6.id" @click.stop="itemClick(item6)">
                                                        <div class="ic-box ic6" :class="{active:item6.id==onlyId}">
                                                            <Icon
                                                                type="ios-arrow-back"
                                                                :class="{'down':item6.expand,'right':!item6.expand}"
                                                                v-if="item6.children && item6.children.length"
                                                                @click.stop="item6.expand=!item6.expand" />
                                                            <i v-else class="nochild"></i>
                                                            <span class="t">{{titleNum(item6.title, item6)}}</span>
                                                            <div class="r-ic-box" v-if="!!hide">
                                                                <Icon class="r-ic" type="md-create" @click.stop="reWrite(item6)"/>
                                                                <Icon class="r-ic" type="ios-trash" @click.stop="delItem(item6)"/>
                                                                <!--<Icon class="r-ic" type="md-add" @click="addNext(item6)"/>-->
                                                            </div>
                                                        </div>
                                                    </div>
                                                </template>
                                            </div>
                                        </template>
                                    </div>
                                </template>
                            </div>
                        </template>
                    </div>
                </template>
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
