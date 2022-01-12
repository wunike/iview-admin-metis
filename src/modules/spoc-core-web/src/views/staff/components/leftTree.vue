<style lang="less">
.left-tree-container{
    height:calc(~"100% - 32px");
    .title{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height:52px;
        width:220px;
        font-size:16px;
        margin-left:20px;
        span{
            font-size:16px;
            font-weight:500;
            color:rgba(73,80,96,1);
            line-height:28px;
            font-weight:500;
        }
        .add-icon-main{
            font-size: 20px;
            cursor: pointer;
            color:#999;
            &:hover{
                color:#495060;
            }
        }
    }
}
</style>

<template>
    <div class="left-tree-container">
        <h3 class="title"><span>{{treeTitle}}({{totalNum}})</span><Icon  v-if="!!hide"  @click="addOrg" type="md-add" class="add-icon-main" /></h3>
        <sTree ref="sTree" :hide="hide"  @item-click="itemClick" :data="datas" @add-next="addOrgNext" @re-write="reWrite" @delete-item="deleteItem"></sTree>
        <addOrg ref="addOrg"  @fa-get-list="getTreeDatas"></addOrg>
        <Modal
                width="800"
                v-model="deleteTree"
                :title="$t('views_coursepack_bigtableexample_345')"
                @on-ok="deleteTreeOK">
            <p>{{$t('views_staff_components_lefttree_652')}}</p>
        </Modal>
    </div>
</template>

<script>
    /**
     **@date: 2019/4/19 12:01
     **@author: lizhi
     **@filename: leftTree.vue
     * 左侧机构树
     */
    import valid, {
        errors,
		sysOffice
    } from '../../../libs/request';
    import sTree from './treeN.vue';
    import {mapMutations} from 'vuex';
    import addOrg from "./addOrg";
    export default {
        name: "leftMenu",
        props: {
            searchVal:{
                type:String,
                default:''
            },
            hide:{
                type:Boolean,
                default:()=>{
                    return true
                }
            }
        },
        data() {
            return {
                deleteTree:false,
                deleteKey:'',
                treeTitle:'',
                totalNum:0,
                datas:[],
            }
        },
        components: {
            sTree,addOrg
        },
        mounted() {
            // console.log(this.hide+'9999')
            this.getTreeDatas(true)
        },
        methods: {
            ...mapMutations(['updateLoadingStatus']),
            addOrg() {
                this.$refs.addOrg.addOrg()

            },
            addOrgNext(item) {
                this.$refs.addOrg.addOrgNext(item)
            },
            getTreeDatas(isFirst,setRow) {
                // this.updateLoadingStatus({isLoading: true});
                sysOffice.getOfficeTree().then(valid.call(this)).then((res)=>{
                    if(res.ok){
                        if(Array.isArray(res.data.data.children)){
                            this.treeTitle = res.data.data.children[0].title
                            this.totalNum = res.data.data.children[0].num
                            this.datas = res.data.data.children;
                            // console.log(isFirst,setRow)
                            if(setRow){
                                // this.$emit("table-title",res.data.data.children[0].title,res.data.data.children[0].code ? res.data.data.children[0].code : '') //首次获取表格 第一层级 title
                                this.$emit("get-new-table",setRow) //设置表格在哪个校区
                                this.$refs.sTree.setId(setRow)
                            }else{
                                this.$emit("table-title",res.data.data.children[0].title,res.data.data.children[0].code ? res.data.data.children[0].code : '') //首次获取表格 第一层级 title
                                this.$emit("get-new-table",res.data.data.children[0].id) //首次获取表格 第一层级 title
                                this.$refs.sTree.setId(res.data.data.children[0].id)
                            }
                        }
                        if(!isFirst){ //非首次加载。编辑、添加、删除树后，更新添加员工弹框下拉
                            this.$emit('editOrAddTree')
                        }
                    }
                }).catch(errors.call(this)).finally(()=>{
                    // this.updateLoadingStatus({isLoading:false});
                });
            },
            searchTreeByName(name) {
                // console.log(name)
                //模糊搜索获取树
                this.updateLoadingStatus({isLoading: true});
                let params={}
                params.name = name
                sysOffice.listByName(params).then(valid.call(this)).then((res)=>{
                    // console.log(res.data.data)
                    if(res.ok){
                        if(Array.isArray(res.data.data.children) && res.data.data.children.length){
                            this.treeTitle = res.data.data.children[0].title
                            this.totalNum = res.data.data.children[0].num
                            this.datas = res.data.data;
                            // this.$emit("table-title",res.data.data.children[0].title, res.data.data.children[0].code ? res.data.data.children[0].code : '') //首次获取表格 第一层级 title
                        }
                    }
                }).catch(errors.call(this)).finally(()=>{
                    this.updateLoadingStatus({isLoading:false});
                });
            },
            itemClick(item) {
                this.$emit("table-title",item.title,item.code ?item.code : '' )
                this.$emit("get-new-table",item.id)
            },
            deleteTreeOK(id){
                sysOffice.delete({
                    id:this.deleteKey
                }).then(valid.call(this)).then((res)=>{
                    if(res.ok){
                        this.deleteKey = ''
                        this.$Message.success({content:this.$t('views_staff_components_lefttree_663'),duration:1});
                        this.deleteTree = false
                        this.getTreeDatas()
                    }
                })
            },
            deleteItem(item) {
                this.deleteTree = true
                this.deleteKey = item.id
            },
            reWrite(item) {
                this.$refs.addOrg.reWrite(item)
            },
        },
    }
</script>
