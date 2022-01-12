<style lang="less">

</style>

<template>
<Form :rules="rules" :model="paramsData" :label-width="100" ref="f">
    <div>
        <Row>
            <Col span="8">
                <FormItem :label="$t('modules_spoc_sign_web_src_views_contractgeneration_component_tpl3_5406')" prop="money">
                    <Input v-model="paramsData.money">
                    </Input>
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem :label="$t('modules_spoc_sign_web_src_views_contractgeneration_component_tpl3_5407')" prop="endTime">
                    <DatePicker v-model="paramsData.endTime" :editable="false" type="date" :clearable="false"></DatePicker>
                </FormItem>
            </Col>
        </Row>
        <FormItem :label="$t('modules_spoc_sign_web_src_views_contractgeneration_component_modules_tpl11_5347')">
            <p v-text="tpl">
            </p>
        </FormItem>
    </div>
</Form>
</template>
<script>

import { replace,digitUppercase } from '../../../libs/util.js';
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
            paramsData:{
                money:'',
                endTime:''
            },
            rules:{
                money:[
                    {required:true}
                ],
                endTime:[
                    {required:true}
                ]
            }
        };
    },
    computed:{
        tpl(){
            const item = this.data.htItemList.find(item=>item.id==this.policy.itemId);
            if(!item){
                return this.data.protocal;
            }
            const text = item.protocal?item.protocal:this.data.protocal;
            let money = this.paramsData.money;
            let date = new Date(this.paramsData.endTime);
            let year = date.getFullYear();
            let month = date.getMonth()+1;
            return replace(text,['$1$',digitUppercase(money)],['$2$',year?year:''],['$3$',month?month:'']);
        }
    },
    created(){
        this.policy.giftCount=1;
    },
    methods:{
        setData(){
            this.paramsData=this.policy.jsonData? JSON.parse(this.policy.jsonData):{};
        },
        validForm(){
            return this.$refs.f.validate();
        }
    },
    watch:{
        paramsData:{
            handler(val){
                this.policy.giftCount = 1;
                this.policy.jsonData = val;
                this.$emit('on-change');
            },
            deep:true,
        },
        tpl(v){
            this.policy.protocalText = v;
        }
    }
}
</script>

