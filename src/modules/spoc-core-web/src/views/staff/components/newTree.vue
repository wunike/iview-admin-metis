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
        <sTree ref="sTree" :hide="hide" :data="datas" @add-next="addOrgNext" @re-write="reWrite" @delete-item="deleteItem"></sTree>
        <addOrg ref="addOrg" :hide="hide"  @fa-get-list="getTreeDatas"></addOrg>
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
    import sTree from './treeNewSub.vue';
    import {mapMutations} from 'vuex';
    import addOrg from "./addOrg";
    export default {
        data() {
            return {
                hide:true,
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
            this.getTreeDatas(true)
        },
        methods: {
            ...mapMutations(['updateLoadingStatus']),
            addOrgNext(item) {
                this.$refs.addOrg.addOrgNext(item)
            },
            getTreeDatas(isFirst) {
                this.updateLoadingStatus({isLoading: true});
                sysOffice.getOfficeTree().then(valid.call(this)).then((res)=>{
                    if(res.ok){
                        if(Array.isArray(res.data.data.children)){
                            this.treeTitle = res.data.data.children[0].title
                            this.totalNum = res.data.data.children[0].num
                            this.datas = res.data.data.children;
                            this.$emit("table-title",res.data.data.children[0].title,res.data.data.children[0].code ? res.data.data.children[0].code : '') //首次获取表格 第一层级 title
                            this.$emit("table-datas",res.data.data.children[0].id) //首次获取表格 第一层级 title
                            // this.$refs.sTree.setId(res.data.data.children[0].id)
                        }
                        if(!isFirst){ //非首次加载。编辑、添加、删除树后，更新添加员工弹框下拉
                            this.$emit('editOrAddTree')
                        }
                    }
                }).catch(errors.call(this)).finally(()=>{
                    this.updateLoadingStatus({isLoading:false});
                });
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
