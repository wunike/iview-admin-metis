<style lang="less">
.v-input-select-wrapper{
    display: inline-block;position: relative;width: 200px;
    .options{
        position: absolute;top: 32px;left: 0;right: 0;
        margin: 5px 0;padding: 5px 0;
        background: #fff;
        max-height: 200px;
        overflow-y: scroll;
        border-radius: 4px;box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
        z-index: 999;
        
    }
    .options-item{
        margin: 0;
        line-height: normal;
        padding: 7px 16px;
        clear: both;
        color: #515a6e;
        font-size: 12px!important;
        white-space: nowrap;
        list-style: none;
        cursor: pointer;
        transition: background .2s ease-in-out;
        &-active{
            color: #44bcb7;
        }
    }
    .options-not-found{
        color: #c5c8ce;text-align: center;
    }
}
</style>
<template>
	<div class="v-input-select-wrapper"> 
        <div class="my-input" @click.stop="nothing">
            <Input v-model="searchKey" style="width:100%"
                :placeholder="placeholder" 
                :clearable="clearable"
                @on-change="changeSearchKey"
                @on-clear="clearSearchKey"
                />
        </div>
        <!-- v-show="" -->
        <div class="options" v-show="showSelect">
            <div v-for="(item, index) in dataList" class="options-item" v-if="dataList && dataList.length"
                :key="index" 
                v-show="!!searchKey ? (!searchKey) || (item[labelName].toLowerCase().indexOf(searchKey.toLowerCase()) > -1) : true"
                @click.stop="selectOption(item)">
                {{item[labelName]}}
            </div>
            <div v-if="!dataList || !dataList.length" class="options-not-found">
                无匹配数据
            </div>
        </div>
	</div>
</template>
<script>
	let mySetTimeout;
	import { mapMutations, mapState} from "vuex";
	import valid, {errors,} from "../libs/request";
	export default {
		name: "inputSelect",
		props:{
			clearable: {
				//是否可清除
				type: Boolean,
				default: true
			},
			placeholder: {
				//默认placeholder
				type: String,
				default: '请输入'
			},
			dataList:{
				//数据源
				type: Array,
			},
			labelName:{
				//数据源name 字段的key
				type: String,
				default: 'name'
			},
			idName:{
				//数据源value 字段的key
				type: String,
				default: 'id'
			}
        },
        computed: {

        },
		mounted() {
            document.body.addEventListener('click', this.hideSelect, false);
        },
        beforeDestroy() {
			document.body.removeEventListener('click', this.hideSelect);
		},
		computed: {
            ...mapState(["userInfo", "app"]),
		},
		data() {
			return {
				searchKey: '',
				searchType: 'id', // id || name
				searchValue: '',
                showSelect: false,
			}
		},
		methods: {
			...mapMutations(["updateLoadingStatus"]),
            //选择下拉选项
            hideSelect() {
                // console.log('22!!')
                this.showSelect = false
            },
			selectOption(item){
				// console.log(item[this.idName])
				// console.log(item[this.labelName])
				this.searchKey = item[this.labelName]
				this.searchValue = item[this.idName]
				this.searchType = 'id'

				let returnObj = {
					searchType: this.searchType,
					searchValue: this.searchValue,
				}
				clearTimeout(mySetTimeout)
				this.showSelect = false
				this.$emit('returnSelect', returnObj)
			},
			//修改了搜索值
			changeSearchKey(){
				this.searchType = 'name'
				this.searchValue = this.searchKey + ''
				let returnObj = {
					searchType: this.searchType,
					searchValue: this.searchValue,
				}
				this.showSelect = true
				//阻止高频触发搜索
				if(mySetTimeout){
					clearTimeout(mySetTimeout)
					mySetTimeout = setTimeout(()=>{
						this.$emit('returnSelect', returnObj)
					},500)
				} else {
					mySetTimeout = setTimeout(()=>{
						this.$emit('returnSelect', returnObj)
					},500)
				}
			},
			clearSearchKey(){

            },
            nothing() {
                this.showSelect = true
            },
            reset() {
                // 用于搜索区域的清空事件
                this.searchKey = '';
            },
		},
		watch:{
			// dataList:  {
			// 	handler: function (val, oldVal) { console.log(val)},
			// 	deep: true
			// },
		}
	}
</script>