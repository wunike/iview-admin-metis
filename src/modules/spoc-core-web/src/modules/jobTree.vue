<style lang="less">
.role-container{
    .tree-level-1{
        text-indent: 0.75em;
    }
}
</style>
<template>
  <div class="role-container">
       <stree :data="roleTree" :curr="curr" :menu="job_edit" @item-click="itemClick" @menu-click="menuClick"></stree>
       <div class="popmenu" :style="{top:menu.top}" v-show="menu.show" v-if="job_edit">
            <ul>
                <li @click.stop="modify">{{$t('modules_jobtree_56')}}</li>
                <li @click.stop="del">{{$t('modules_jobtree_57')}}</li>
            </ul>
        </div>
        <Modal v-if="job_edit" v-model="addJobItem.show" :title="addJobItem.add?addJobItem.addtitle:addJobItem.edittitle">
            <div>
                <i-form ref="addjob" :model="addJobItem" :rules="addJobItem.ruleValidate" :label-width="72">
                <form-item :label="$t('modules_jobtree_58')" prop="name">
                    <i-input v-model="addJobItem.name" :placeholder="$t('modules_jobtree_59')"></i-input>
                </form-item>
                <form-item :label="$t('modules_jobtree_60')" prop="remarks" class="last-child">
                    <i-input v-model="addJobItem.remarks" type="textarea" :placeholder="$t('modules_jobtree_61')" :rows="2" ></i-input>
                </form-item>
                </i-form>
            </div>
            <div slot="footer">
                <Button @click="addJobClose">{{$t('modules_jobtree_62')}}</Button>
                <Button type="primary" @click="addJobOk">{{$t('modules_jobtree_63')}}</Button>
            </div>
        </Modal>
  </div>
</template>
<script>
import stree from '@public/modules/tree/tree';
import valid,{ errors,sysDict } from "../libs/request";
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            state:{
                item:{}
            },
            roleTreeData:[],
            menu:{
                top:'0px',
                show:false,
            },
            addJobItem:{
                show:false,
                add:true,
                addtitle:this.$t('modules_jobtree_64'),
                edittitle:this.$t('modules_jobtree_65'),
                name:'',
                remarks:'',
                ruleValidate:{
                    name: [
                        { required: true, message: this.$t('modules_jobtree_66'), trigger: 'blur' },
                        { required: true, pattern: /^(^[\w\-]{1,20}$)|(^[\w\-\u4e00-\u9fa5]{1,10}$)$/,message:this.$t('modules_jobtree_67'),trigger:'blur'}
                    ],
                    remarks: [
                        { required: false, type:'string', max:100, message:this.$t('modules_jobtree_68'), trigger: 'blur' }
                    ],
                }
            }
        };
    },
    components:{
        stree
    },
    created(){
        this.loadTree(this.autoInitFocus);
    },
    deactivated(){
        this.hideMenu();
    },
    mounted(){
        document.addEventListener('click',this.hideMenu,false);
    },
    beforeDestroy(){
        document.removeEventListener('click',this.hideMenu);
    },
    computed:{
        ...mapGetters('core',['job_edit']),
        curr(){
            if(this.$route.query.rid){
                return {id:this.$route.query.rid};
            }
            return this.state.item;
        },
        roleTree(){
            return this.roleTreeData.map(item=>{
                return {
                    id:item.id,
                    title:item.label,
                    description:item.description,
                    num:item.value,
                    expand:false,
                }
            });
        }
    },
    methods:{
        update(payload){
            this.loadTree();
        },
        hideMenu(){
            this.menu.show = false;
        },
        loadTree(callback) {
            sysDict.listJobTree().then(valid.call(this)).then((res)=>{
                if(res.ok){
                    this.$parent.setNum(res.data.message,1);
                    this.roleTreeData = res.data.data;
                    callback&&callback();
                }
            }).catch(errors.call(this));
        },
        autoInitFocus(){
            if (!this.$route.query.rid && this.roleTree[0]){
                this.itemClick(this.roleTree[0]); 
            }
        },
        itemClick(item) {
            this.hideMenu();
            this.$router.push({name:'core.job',query:Object.assign({},this.$route.query,{rid:item.id})});
        },
        menuClick(e,item) {
            this.state.item=item;
            let top = e.pageY;
            if(document.body.offsetHeight - top < 120){
                top = top - 120;
            }
            this.menu= {
               top : `${top+15}px`,
               show:true
           };
        },
        modify() {
            this.menu.show=false;
            this.addJobItem.add=false;
            this.addJobItem.show = true;
            this.addJobItem.name = this.state.item.title;
            this.addJobItem.remarks = this.state.item.description;
        },
        give() {
            this.menu.show = false;
            this.rights.show = true;
        },
        del() {
            this.menu.show = false;
            if(this.state.item.num>0){
                return this.$Message.warning(this.$t('modules_jobtree_69'));
            }
            this.$Modal.confirm({
                title: this.$t('modules_jobtree_70'),
                content: this.$t('modules_jobtree_71'),
                onOk: () => {
                    this.doDel(this.state.item.id)
                }
            });
        },
        addJobOk() {
            this.$refs.addjob.validate((validok) => {
                if(validok){
                     let info = {
                        label:this.addJobItem.name,
                        description:this.addJobItem.remarks,
                        type:'xx_school_job',
                        parentId:0,
                        value:0
                    };
                    if(!this.addJobItem.add){
                        info.id = this.state.item.id;
                    }
                    sysDict.DictSave(info).then(valid.call(this)).then((res)=>{
                        if(res.ok){
                            this.addJobClose();
                            this.loadTree();
                        }
                    }).catch(errors.call(this))
                }
            });
        },
        addJobClose() {
            this.addJobItem.show = false;
            this.$refs.addjob.resetFields();
        },
        doDel(id) {
            sysDict.DictDelect({id}).then(valid.call(this)).then((res)=>{
                if(res.ok){
                    this.loadTree();
                }
            }).catch(errors.call(this));
        },
        showAddJob() {
            this.$refs.addjob.resetFields();
            this.addJobItem.show = true;
            this.addJobItem.add = true;
        }

    }
}
</script>


