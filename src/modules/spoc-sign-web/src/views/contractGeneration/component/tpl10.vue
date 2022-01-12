<style lang="less">

</style>

<template>
<div class="protocol_content">
    <FormItem :label="$t('modules_spoc_sign_web_src_views_contractgeneration_component_modules_tpl11_5347')">
        <p v-text="tpl">
        </p>
    </FormItem>
    
</div>
</template>
<script>
import { replace , digitUppercase } from '../../../libs/util.js';
export default {
    props:{
		data:{
			type:Object,
			required:true,
		},
		info:{ // 主合同信息
			type:Object,
			required:true,
        },
        policy:{
            type:Object,
            required:true,
        },
        tplObj:{
            type:Object,
        },
        actualPrice:{
            type:[String,Number]
        }
	},
    data(){
        return {
            
        };
    },
    computed:{
        tpl(){
            const item = this.data.htItemList.find(item=>item.id==this.policy.itemId);
//          if((!item) || (item && JSON.stringify(item) == '{}')){
//              return this.data.protocal;
//          }
            const text = item.protocal?item.protocalText:this.data.protocal;
            const v = replace(text,['$1$',this.data.htItemList[0].giftCount]);
            this.policy.protocalText = v;
            return v;
        }
    },
    methods:{
        setData(){
        },
        validForm(){
            return Promise.resolve(true);
        }
    },
    watch:{
        tpl(v){
            this.policy.protocalText = v;
        }
    }
}
</script>

