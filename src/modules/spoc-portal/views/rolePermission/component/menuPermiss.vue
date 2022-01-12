<style lang="less">
.menu-permiss-container{
    @border: 1px solid #D4D5DA;
    border: @border;
    .clear {
        zoom: 1;
        &::before, &::after{
            content: "";display: block;clear: both;height: 0;
            line-height: 0;font-size: 0;
        }
    }
    .menu-permiss-top{
        @h: 50px;
        height: @h;padding-left: 14px;
        span{
            float: left;line-height: @h;
        }
    }
    .meuns-select{
        float: left;margin-top: 9px;margin-left: 21px;
    }
    .menu-permiss-bottom{
        border-top: @border;height: 270px;overflow-y: auto;
        padding: 8px;
    }
}
</style>
    
<template>
<div class="menu-permiss-container">
    <div class="menu-permiss-top">
        <span>{{ title }}</span>
        <Select v-model="compact" filterable ref="search" :style="'width:' + width"
            clearable
            class="meuns-select"
            :placeholder="placeholder"
            @on-change="checkTitle" @on-query-change="textQueryChange">
            <Option v-for="item in orgDataBackups" :value="item.id" :key="item.id">{{ item.title }}</Option>
        </Select>
    </div>
    <div class="menu-permiss-bottom">
        <Tree ref="treeRefs" @on-check-change="checkChange" :data="treeDataCopy" show-checkbox :check-strictly="true"></Tree>
    </div>
</div>
</template>

<script>

/**
 * 菜单功能权限
 * @author 曹见芳
 */

export default {
    props: {
        title: {
            type: String,
            default: 'PC权限'
        },
        width: {
            type: String,
            default: '224px'
        },
        placeholder: {
            type: String,
            default: '请输入关键词'
        },
        treeData: { // tree 
            type: Array,
            required: true
        }
    },
    data(){
        return {
            compact: '',
            treeDataRest: [], // 备份完整的数组
            treeDataCopy: [], // 复制一份用来操作
            orgDataBackups: [], // 搜索下来列表
            // notclick: false, // 为 true 开始过滤
            queryValue: '' , // 输入的文字
            childIdByParentIdMap:{}
        };
    },
    mounted(){
        this.resetData(this.treeData);
    },
    methods: {
        resetData(arr) {
            // this.treeDataRest = [...arr];
            // this.treeDataCopy = [...arr];
            // this.orgDataBackups = [...arr];
            this.compact = '';
            let newArr = JSON.parse(JSON.stringify(arr));
            this.treeDataRest = newArr;
            this.treeDataCopy = newArr;
            this.orgDataBackups = newArr;
            this.getChildIdByParentId(newArr)
        },
        getChildIdByParentId(arr){
            arr.forEach(item=>{
                this.childIdByParentIdMap[item.id] = [item.id]
                if(item.children && item.children.length){
                    this.getChildIdByParentIdMap(item.children, item.id)
                }
            })
        },
        getChildIdByParentIdMap(items, parentId){
            this.getChildIdByParentId(items)
            items.forEach(item=>{
                this.childIdByParentIdMap[parentId].push(item.id)
                if(item.children && item.children.length){
                    this.getChildIdByParentIdMap(item.children, parentId)
                }
            })
        },
        textQueryChange(item) {
            // 更改关键字
			// this.notclick = false;
            this.queryValue = item;
        },
        checkTitle(id) {
            // console.log(id)
            // 选择下拉菜单的某一项
            if(id) {
                let cump = this.treeDataRest.filter((list) => { 
					return list.id == id; 
                })[0];
                this.queryValue = cump.title;
                this.compact = id;
            } else {
                this.queryValue = '';
                this.compact = '';
            }
            this.textChange();
        },
        textChange() {
            // 更新 tree 的数组
            // console.log(this.queryValue)
			if(this.queryValue) {
				// 开始过滤树一级节点
				let newTree = this.treeDataRest.filter((item) => {
					return item.title.indexOf(this.queryValue) >= 0
                });
                this.treeDataCopy = [...newTree];
			} else {
                this.treeDataCopy = [...this.treeDataRest];
            }
        },
        doChecked(item, statu){
            if(item.children && item.children.length > 0){
                item.children.forEach((childrenItem)=>{
                    childrenItem.checked = statu;
                    this.doChecked(childrenItem, statu);
                })
            }
        },
        cancelEl(id, parentItem){
            parentItem.forEach(out => {
                if(out.id == id){
                    out.checked = false
                    if(out.children && out.children.length > 0) {
                        out.children.forEach((childrenItem)=>{
                            childrenItem.checked = false;
                            this.doChecked(childrenItem, false);
                        })
                    }
                } else {
                    if(out.children && out.children.length > 0) {
                        this.cancelEl(id , out.children);
                    }
                }
            });
        },
        checkedEl(id, parentItem){
            parentItem.forEach(out => {
                if(out.id == id){
                    out.checked = true
                    if(out.children && out.children.length > 0) {
                        out.children.forEach((childrenItem)=>{
                            childrenItem.checked = true;
                            this.doChecked(childrenItem, true);
                        })
                    }
                } else {
                    if(out.children && out.children.length > 0) {
                        this.checkedEl(id , out.children);
                    }
                }
            });
        },
        checkedParent(id, item){
            item.forEach(out => {
                if(this.childIdByParentIdMap[out.id].indexOf(id)>=0){
                    out.checked = true
                }
                if(out.children && out.children.length > 0) {
                    this.checkedParent(id, out.children)
                }
            });
        },
        checkChange(list, el) {
            if(el.checked){ // 选中某个节点
                this.checkedEl(el.id, this.treeDataCopy)
                this.checkedParent(el.id,this.treeDataCopy)
            } else { // 取消选择某个节点
                this.cancelEl(el.id, this.treeDataCopy)
            }
            let arr = [];
            this.treeDataCopy.forEach(out => {
                if(out.checked || out.indeterminate) {
                    arr.push({
                        id: out.id,
                        lists: []
                    })
                    if(out.children && out.children.length > 0) {
                        this.findChildren(out.children, out.id, arr);
                        // this.findChildren(out.children, lists);
                    }
                }
            });
            // console.log(arr)
            this.$emit('save', arr, this.compact);
        },
        findChildren(list, id, arr) {
            list.forEach(out => {
                if(out.checked || out.indeterminate) {
                    let lists = arr.filter(function(item){
                        return item.id == id; 
                    })[0].lists;
                    lists.push(out.id);
                    if(out.children && out.children.length > 0) {
                        this.findChildren(out.children, id, arr);
                    }
                }
            });
        },
    },
    watch: {
        treeData(val) {
            this.resetData(val);
        }
    }
}
</script>


