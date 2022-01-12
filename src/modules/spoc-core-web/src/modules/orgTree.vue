<style lang="less">

</style>
<template>
  <div>
       <stree :data="orgData" :curr="curr" :menu="org_edit" @item-click="itemClick" @menu-click="menuClick"></stree>
       <div class="popmenu" :style="{top:menu.top}" v-show="menu.show" v-if="org_edit">
            <ul>
                <li @click.stop="modify">{{$t('modules_orgtree_119')}}</li>
                <li @click.stop="delfac">{{$t('modules_orgtree_120')}}</li>
                <li @click.stop="addsub">{{$t('modules_orgtree_121')}}</li>
            </ul>
        </div>
        <Modal v-if="org_edit" v-model="addFacSubItem.show" :title="addFacSubItem.add?addFacSubItem.addtitle:addFacSubItem.edittitle">
            <div>
                <i-form ref="addsubfac" :model="addFacSubItem" :rules="addFacSubItem.ruleValidate" :label-width="72">
                <form-item :label="$t('modules_orgtree_122')" prop="name">
                    <i-input v-model="addFacSubItem.name" :placeholder="$t('modules_orgtree_123')"></i-input>
                </form-item>
                <form-item :label="$t('modules_orgtree_124')" prop="parent">
                    <!-- <i-input v-model="state.item.parentTitle" disabled></i-input> -->
                    <i-input v-model="state.item.title" disabled></i-input>
                </form-item>
                <form-item :label="$t('modules_orgtree_125')" prop="type">
                    <Select v-model="addFacSubItem.type">
                        <Option v-for="item in sysOfficeType" :value="item.value" :key="item.id">{{item.label}}</Option>
                    </Select>
                </form-item>
                <form-item :label="$t('modules_orgtree_126')" prop="remarks" class="last-child">
                    <i-input v-model="addFacSubItem.remarks" type="textarea" :placeholder="$t('modules_orgtree_127')" :rows="2" ></i-input>
                </form-item>
                </i-form>
            </div>
            <div slot="footer">
                <Button @click="addSubFacClose">{{$t('modules_orgtree_128')}}</Button>
                <Button type="primary" @click="addSubfacOk">{{$t('modules_orgtree_129')}}</Button>
            </div>
        </Modal>
        <Modal v-if="org_edit" v-model="addFacItem.show" :title="addFacItem.title">
            <div>
                <i-form :model="addFacItem" ref="addfacitem" :rules="addFacItem.ruleValidate" :label-width="72">
                <form-item :label="$t('modules_orgtree_122')" prop="name">
                    <i-input v-model="addFacItem.name" :placeholder="$t('modules_orgtree_123')"></i-input>
                </form-item>
                <form-item :label="$t('modules_orgtree_124')" prop="parent">
                    <Select v-model="addFacItem.parent" filterable>
                        <Option v-for="item in allOffice" :value="item.id" :key="item.id">{{item.name}}</Option>
                    </Select>
                </form-item>
                <form-item :label="$t('modules_orgtree_125')" prop="type">
                    <Select v-model="addFacItem.type">
                        <Option v-for="item in sysOfficeType" :value="item.id" :key="item.id">{{item.label}}</Option>
                    </Select>
                </form-item>
                <form-item :label="$t('modules_orgtree_126')" prop="remarks" class="last-child">
                    <i-input v-model="addFacItem.remarks" type="textarea" :placeholder="$t('modules_orgtree_127')" :rows="2" ></i-input>
                </form-item>
                </i-form>
            </div>
            <div slot="footer">
                <Button @click="addFacItemClose">{{$t('modules_orgtree_128')}}</Button>
                <Button type="primary" @click="addFacOk">{{$t('modules_orgtree_129')}}</Button>
            </div>
        </Modal>
  </div>
</template>
<script>
import stree from '@public/modules/tree/tree';
import valid,{ errors, sysOffice, sysDict } from '../libs/request';
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            state:{
                item:{}
            },
            sysOfficeType:[],
            allOffice:[],
            orgData:[],
            menu:{
                top:'0px',
                show:false,
            },
            addFacSubItem:{
                show:false,
                add:true,
                addtitle:this.$t('modules_orgtree_121'),
                edittitle:this.$t('modules_orgtree_130'),
                name:'',
                type:0,
                remarks:'',
                parent:1, // fake only for valid
                ruleValidate:{
                    name: [
                        { required: true, message: this.$t('modules_orgtree_131'), trigger: 'blur' },
                        { required: true, pattern: /^(^[\w\-]{1,40}$)|(^[\w\s\-\u4e00-\u9fa5]{1,60}$)$/,message:this.$t('modules_orgtree_132'),trigger:'blur'}
                        
                    ],
                    type: [
                        { required: true, message: this.$t('modules_orgtree_133'), trigger: 'change' }
                    ],
                    remarks: [
                        { required: false , type:'string', max:200, message:this.$t('modules_orgtree_134'), trigger: 'blur' }
                    ],
                    parent: [
                        { required: true }
                    ],
                }
            },
            addFacItem:{
                loading:true,
                show:false,
                title:this.$t('modules_orgtree_135'),
                name:'',
                remarks:'',
                type:undefined,
                parent:undefined,
                ruleValidate:{
                    name: [
                        { required: true, message: this.$t('modules_orgtree_131'), trigger: 'blur' },
                        { required: true, pattern: /^(^[\w\-]{1,40}$)|(^[\w\s\-\u4e00-\u9fa5]{1,20}$)$/,message:this.$t('modules_orgtree_132'),trigger:'blur'}
                    ],
                    parent: [
                        { required: true, message: this.$t('modules_orgtree_136'), trigger: 'change' }
                    ],
                    type: [
                        { required: true, message: this.$t('modules_orgtree_133'), trigger: 'change' }
                    ],
                    remarks: [
                        { required: false , type:'string', max:100, message:this.$t('modules_orgtree_137'), trigger: 'blur' }
                    ],
                }
            }
        };
    },
    components:{
        stree,
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
        ...mapGetters('core',['org_edit']),
        curr(){
            if(this.$route.query.id){
                return {id:this.$route.query.id};
            }
            return this.state.item;
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
            sysOffice.getOfficeTree().then(valid.call(this)).then((res)=>{
                 if(res.ok){
                    this.$parent.setNum(res.data.message,0);
                    this.orgData = [];
                    if(Array.isArray(res.data.data.children)){
                        this.$nextTick(()=>{
                            this.orgData = res.data.data.children;
                            callback&&callback();
                        });
                    }
                 }
            }).catch(errors.call(this));
        },
        autoInitFocus(){
            if (!this.$route.query.id && this.orgData[0]){
                this.itemClick(this.orgData[0]); 
            }
        },
        addFacOk() {
            this.$refs['addfacitem'].validate((validok) => {
                if (validok) {
                    let info = {
                        name:this.addFacItem.name,
                        type:this.addFacItem.type,
                        remarks:this.addFacItem.remarks,
                        parent:this.addFacItem.parent
                    };
                    console.info(info);
                    sysOffice.saveOffice(info).then(valid.call(this)).then((res)=>{
                        this.addFacItemClose();
                        if(res.ok){
                            this.loadTree();
                        }
                    }).catch(errors.call(this))
                }
            });
        },
        delfacOk(id) {
            sysOffice.delete({id}).then(valid.call(this)).then((res)=>{
                if (res.ok){
                    this.$Message.success(res.data.message);
                    this.loadTree();
                }
            }).catch(errors.call(this))
        },
        addSubfacOk() {
            this.$refs['addsubfac'].validate((validok) => {
                if(validok) {
                    let info;
                    if(this.addFacSubItem.add){
                        info = {
                            parent:this.state.item.id,
                            type:this.addFacSubItem.type,
                            name:this.addFacSubItem.name,
                            remarks:this.addFacSubItem.remarks
                        }
                    }else{
                        info = {
                            name:this.addFacSubItem.name,
                            remarks:this.addFacSubItem.remarks,
                            type:this.addFacSubItem.type,
                            id:this.state.item.id
                        };
                    }
                    sysOffice.saveOffice(info).then(valid.call(this)).then((res)=>{
                        if(res.ok){
                            this.addSubFacClose();
                            this.$Message.success(res.data.message);
                            this.loadTree();
                        }
                    }).catch(errors.call(this));
                }
            });
        },
        addSubFacClose(){
            this.addFacSubItem.show = false;
            this.$refs['addsubfac'].resetFields();
        },
        addsub() {
            this.$refs['addsubfac'].resetFields();
            this.tryGetOfficeType();
            this.menu.show = false;
            this.addFacSubItem.show = true;
            this.addFacSubItem.add = true;
        },
        delfac() {
            this.menu.show = false;
            if(this.state.item.num>0){
                return this.$Message.warning(this.$t('modules_orgtree_138'));
            }
            this.$Modal.confirm({
                title: this.$t('modules_orgtree_139'),
                content: this.$t('modules_orgtree_140'),
                onOk: () => {
                    this.delfacOk(this.state.item.id)
                }
            });
        },
        modify() {
            this.menu.show = false;
        	this.tryGetOfficeType();
            sysOffice.officeForm({id:this.state.item.id}).then(valid.call(this)).then((res)=>{
                this.addFacSubItem.add=false;
                this.addFacSubItem.show=true;
                if (res.ok){
                    this.addFacSubItem.name=res.data.data.name;
                    this.addFacSubItem.type=res.data.data.type;
                    this.addFacSubItem.remarks=res.data.data.remarks;
                }
            }).catch(errors.call(this));
        },
        itemClick(item) {
            this.hideMenu();
            this.$router.push({name:'core.organization',query: Object.assign({},this.$route.query,{id:item.id})});
        },
        menuClick(e,item) {
        	console.log(item)
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
        showAddOrg() {
            this.$refs['addfacitem'].resetFields();
            this.addFacItem.show = true;
            this.tryGetOfficeType();
            sysOffice.officeList({}).then(valid.call(this)).then((res)=>{
                if(res.ok){
                    this.allOffice=res.data.data.allCompany;
                }
            }).catch(errors.call(this));
        },
        addFacItemClose() {
            this.addFacItem.show = false;
            this.$refs['addfacitem'].resetFields();
        },
        tryGetOfficeType(){
            if(this.sysOfficeType.length>0){
                return;
            }
            sysDict.listData({type:'sys_office_type'}).then(valid.call(this)).then((res)=>{
                if(res.ok){
                    this.sysOfficeType = res.data.data;
                }
            }).catch(errors.call(this));
        }

    }
}
</script>


