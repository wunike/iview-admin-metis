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
        }
	},
    data(){
        return {
            
        };
    },
    computed:{
        tpl(){
            const item = this.data.htItemList.find(item=>item.id==this.policy.itemId);
            if(!item){
                return this.data.protocal;
            }
            const text = item.protocal?item.protocal:this.data.protocal;
            let total = digitUppercase(this.info.price);
            const r = item.ratio==0?1:item.ratio;
            let ratio = r*10;
            let money = digitUppercase(Math.round(this.info.price*r));
            const v = replace(text,['$1$',total],['$2$',ratio],['$3$',money]);
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

