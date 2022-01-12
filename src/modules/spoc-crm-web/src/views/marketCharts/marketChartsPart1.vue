<template>
    <div class="servicesChartspart1">
        <Checkbox v-model="groupType1" @on-change="groupTypeChange1">{{$t('modules_spoc_crm_web_src_views_marketcharts_marketchartspart1_1353')}}</Checkbox>
        <Checkbox v-model="groupType2" @on-change="groupTypeChange2">{{$t('modules_spoc_crm_web_src_views_marketcharts_marketchartspart1_1354')}}</Checkbox>
        <Checkbox v-model="groupType3" @on-change="groupTypeChange3">{{$t('modules_spoc_crm_web_src_views_marketcharts_marketchartspart1_1355')}}</Checkbox>
        <echarts-parent :option="option" v-if="option"></echarts-parent>
    </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import { waitUntil } from "@public/libs/util";
import valid, {
	errors,
	sysUser,
	sysDict,
	sysAttachment,
	marketingPerformance,
	common
} from "../../libs/request";
import { barOption } from './marketChartsOptionsFor1.js';
import echartsParent from './echartsParent'
export default {
    props:{
        menuRoute:{
            type: String,
            required: true
        },
    },
    data() {
        return {
            option: null,
            officeId: '',
            groupType1: true,
            groupType2: false,
            groupType3: false,
            groupType: '1'
        };
    },
    computed: {
        ...mapState(["userInfo", "app", "buttonPerm","calendarConfig"]),
    },
    components:{
        echartsParent
    },
    mounted() {
        waitUntil(
			() => {
				console.log("this.app.currOfficeId ==" + this.app.currOfficeId);
				if (this.app.currOfficeId) {
					this.officeId = this.app.currOfficeId == 'all' ? this.userInfo.officeId : this.app.currOfficeId;
				}
				return (this.app.currOfficeId && this.userInfo.officeId) || false;
			},
			() => {
                this.getOption();
			}
		);
    },
    methods:{
        groupTypeChange1(val){
            if(this.groupType1){ //选中了 渠道1
                if(this.groupType2 && this.groupType3){ //同时选中了 渠道2 渠道3
                    this.groupType = '5'
                } else if(!this.groupType2 && !this.groupType3){ //同时不选中 渠道2 渠道3
                    this.groupType = '1'
                } else if(this.groupType2 && !this.groupType3){ // 选中渠道2 没有选中 渠道3
                    this.groupType = '4'
                } else if(!this.groupType2 && this.groupType3){ //没有选中渠道2 选中 渠道3  这种情况自动选中渠道2
                    this.groupType2 = true
                    this.groupType = '5'
                }  
            } else { //取消选中 渠道1
                if(this.groupType2 && this.groupType3){ //同时选中了 渠道2 渠道3  这种情况自动取消选中渠道2
                    this.groupType2 = false
                    this.groupType = '3'
                } else if(!this.groupType2 && !this.groupType3){ //同时不选中 渠道2 渠道3 这种情况自动选中渠道3
                    this.groupType3 = true
                    this.groupType = '3'
                } else if(this.groupType2){ //只选中了 渠道2
                    this.groupType = '2'
                } else if(this.groupType3){ //只选中了 渠道3
                    this.groupType = '3'
                } 
            }
            this.getOption()
        },
        groupTypeChange2(val){
            if(this.groupType2) { // 选中了 渠道2
                if(this.groupType1 && this.groupType3){ //同时选中了 渠道1 渠道3
                    this.groupType = '5'
                } else if(!this.groupType1 && !this.groupType3){ //同时不选中 渠道1 渠道3
                    this.groupType = '2'
                } else if(this.groupType1 && !this.groupType3){ // 选中渠道1 没有选中 渠道3
                    this.groupType = '4'
                } else if(!this.groupType1 && this.groupType3){ //没有选中渠道1 选中 渠道3  这种情况自动选中渠道1
                    this.groupType1 = true
                    this.groupType = '5'
                }  
            } else { //取消选中 渠道2
                if(this.groupType1 && this.groupType3){ //同时选中了 渠道1 渠道3  这种情况自动取消选中渠道1
                    this.groupType1 = false
                    this.groupType = '3'
                } else if(!this.groupType1 && !this.groupType3){ //同时不选中 渠道1 渠道3 这种情况自动选中渠道3
                    this.groupType3 = true
                    this.groupType = '3'
                } else if(this.groupType1){ //只选中了 渠道1
                    this.groupType = '1'
                } else if(this.groupType3){ //只选中了 渠道3
                    this.groupType = '3'
                }
            }
            this.getOption()
        },
        groupTypeChange3(val){
            if(this.groupType3) { // 选中了 渠道3
                if(this.groupType1 && this.groupType2){ //同时选中了 渠道1 渠道2
                    this.groupType = '5'
                } else if(!this.groupType1 && !this.groupType2){ //同时不选中 渠道1 渠道2
                    this.groupType = '3'
                } else if(this.groupType1 && !this.groupType2){ // 选中渠道1 没有选中 渠道2 这种情况自动选中渠道2
                    this.groupType2 = true
                    this.groupType = '5'
                } else if(!this.groupType1 && this.groupType2){ //没有选中渠道1 选中 渠道2  这种情况自动选中渠道1
                    this.groupType1 = true
                    this.groupType = '5'
                }  
            } else { //取消选中 渠道3
                if(this.groupType1 && this.groupType2){ //同时选中了 渠道1 渠道2 
                    this.groupType = '4'
                } else if(!this.groupType1 && !this.groupType2){ //同时不选中 渠道1 渠道2 这种情况自动选中渠道2
                    this.groupType2 = true
                    this.groupType = '2'
                } else if(this.groupType1){ //只选中了 渠道1
                    this.groupType = '1'
                } else if(this.groupType2){ //只选中了 渠道2
                    this.groupType = '2'
                }
            }
            this.getOption()
        },
        getOption() {
            console.log(this.menuRoute,'menuRoute~~~~~~~~~~~~')
            marketingPerformance.data({
                groupType: this.groupType,
                rankField: ''
            },{
                headers:{
                    menuRouteCover: this.menuRoute
                }
            })
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    let result = res.data.data
                    console.log(res.data.data)

                    let valObj = {}
                    let keys = []
                    if(!result[0]){
                        this.option = {
                            series:[{
                                data:[]
                            }]
                        }
                        return 
                    }

                    Object.keys(result[0]).forEach(item=>{
                        if(item.toLocaleLowerCase() != 'name' 
                        && item.toLocaleLowerCase() != 'newamount' 
                        && item.toLocaleLowerCase() != 'cash') {
                            valObj[item] = []
                            keys.push(item)
                        }
                    })

                    let qdKeys = []
                    result.forEach((item)=>{
                        qdKeys.push(item.name)
                        keys.forEach(itemKey=>{
                            valObj[itemKey].push(item[itemKey])
                        })
                    })

                    // console.log(qdKeys)
                    // console.log(valObj)
                    let option = barOption(qdKeys,valObj,false,true)
                    console.log(JSON.stringify(option))
                    this.option = option
                }
            })
            .catch(errors.call(this))
            .finally(() => {
                // this.updateLoadingStatus({
                //     isLoading: false
                // });
            });
        }
    },
    watch: {
		"app.currOfficeId": function(val, oldVal) {
			if (oldVal) {
				this.officeId = val == 'all' ? this.userInfo.officeId : val;
				// this.getOption();
			}
		}
	}
}
</script>
