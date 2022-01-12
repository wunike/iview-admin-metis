<style lang="less">
.checkboxAll{
    .ivu-select-multiple .ivu-select-selection .ivu-select-placeholder{
        height: 45px;
    }
}
</style>
<template>
	<div class="checkboxAll">
        <Select v-if="!isObject" v-model="selectRes" multiple :style="myStyle" @on-change="changeSelect">
            <Option v-for="(item,index)  in dataList" :value="item[valueKey]" :key="item[valueKey] + index">{{ item[nameKey] }}</Option>
        </Select>
        <Select v-else v-model="selectRes" multiple :style="myStyle" @on-change="changeSelect">
            <Option v-for="(value, key) in dataList" :value="key" :key="key">{{value}}</Option>
        </Select>
        <Checkbox  v-model="checkedAll" @on-change="handleCheckedAll">全选</Checkbox>
	</div>
</template>
<script>
/**
 * @param dataList  数组，必须项，下拉菜单数据源
 * @param valueKey  字符串，必须项，下拉菜单value 在数据源中对应的key
 * @param nameKey  字符串，必须项，下拉菜单name 在数据源中对应的key
 * @param defaultSelectRes  数组，用于编辑等情况数据反现
 * @param myStyle  对象，用于控制样式
 * @method changeSelectEmit  方法，用于emit父组件调用时绑定的方法，传递参数为已选结果
 * @example  <checkbox-all  v-if="data1.length && createModal" :dataList="data1" nameKey="name" valueKey="age" :myStyle="{'width':'200px','margin-right': '10px'}" :defaultSelectRes="[18,24]" @changeSelectEmit="changeSelectEmit"></checkbox-all>
 *  如果在弹窗中使用，推荐用v-if="是否打开了弹窗",来控制组件加载。避免控制台报错
 * @author Longwang
*/
export default {
    props: {
        myStyle: {
            type: Object,
            default: () => {
                return {
                    'width': '696px',
                    'margin-right': '6px'
                }
            }
        },
        dataList:{
            type: Array,
            required: true
        },
        valueKey:{
            type: String,
            required: true
        },
        nameKey:{
            type: String,
            required: true
        },
        defaultSelectRes:{
            type: Array,
            default: () => {
                return []
            }
        },
        isObject:{
            type: Boolean,
            default: false
        }
    },
	data() {
		return {
            selectRes: [],
            checkedAll: false,
            firstWatch: true, //已选项发生变化时触发响应事件，首次加载时不触发
		};
	},
	computed: {
	},
	components: {
	},
	mounted() {
        if(!this.isObject){
            if(this.dataList && this.defaultSelectRes && this.dataList.length && (this.dataList.length == this.defaultSelectRes.length)) {
                this.checkedAll = true
            }
        } else {
            if(this.dataList && this.defaultSelectRes && (JSON.stringify(this.dataList)!= '{}') && (Object.keys(this.dataList).length == this.defaultSelectRes.length)) {
                this.checkedAll = true
            }
        }
        if(this.defaultSelectRes && this.defaultSelectRes.length){
            this.selectRes = [].concat(this.defaultSelectRes)
        }
	},
	methods: {
        changeSelect(){
            if(!this.isObject){
                if(this.dataList.length && (this.dataList.length == this.selectRes.length)) {
                    this.checkedAll = true
                } else {
                    this.checkedAll = false
                }
            } else {
                if((JSON.stringify(this.dataList)!= '{}') && (Object.keys(this.dataList).length == this.selectRes.length)) {
                    this.checkedAll = true
                } else {
                    this.checkedAll = false
                }
            }
        },
		handleCheckedAll() {
            if(this.checkedAll){
                if(!this.isObject){
                    this.selectRes = this.dataList.map((item)=>{
                        return item[this.valueKey]
                    })
                } else {
                    console.log(this.dataList)
                    this.selectRes = Object.keys(this.dataList)
                }
            } else {
                this.selectRes = []
            }
        }
	},
	watch: {
        selectRes: function(newVal , oldVal){
            //已选项发生变化时触发响应事件，首次加载时不触发
            if(this.firstWatch){
                let compare = function(arr1, arr2){
                    if(arr1.length != arr2.length) {
                        return false
                    }
                    let flag = true
                    arr1.forEach(item => {
                        if(arr2.indexOf(item) < 0) {
                            flag = false
                        }
                    });
                    return flag
                }
                if((newVal.length != oldVal.length) && (!compare(newVal,this.defaultSelectRes))){
                    this.firstWatch = false
                    this.$emit('changeSelectEmit', this.selectRes)
                }

            } else {
                if(newVal.length != oldVal.length){
                    this.$emit('changeSelectEmit', this.selectRes)
                }
            }
        }
	}
};
</script>
