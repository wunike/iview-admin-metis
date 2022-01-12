<style lang="less">

</style>

<template>
<Form :rules="rules" :label-width="100" :model="paramsData" ref="f">
    <div>
        <Row>
            <Col span="8">
                <FormItem :label="$t('mycourse_mycourse_380')" prop="name">
                    <Input v-model="paramsData.name">
                    </Input>
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem :label="$t('modules_spoc_sign_web_src_views_contractgeneration_component_tpl2_5403')" prop="endTime">
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
import { replace } from '../../../libs/util.js';

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
                name:'',
                endTime:''      
            },
            rules:{
                name:[
                    {required:true,message:this.$t('modules_spoc_sign_web_src_views_contractgeneration_component_tpl2_5405')}
                ],
                endTime:[
                    {required:true,message:this.$t('modules_spoc_sign_web_src_views_contractgeneration_component_tpl2_5405')}
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
            let count = item.giftCount;
            let name = this.paramsData.name;
            let date = new Date(this.paramsData.endTime);
            let year = date.getFullYear();
            let month = date.getMonth()+1;
            return replace(text,['$1$',count],['$2$',name],['$3$',year?year:''],['$4$',month?month:'']);
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
                this.policy.giftCount=1;
                this.policy.jsonData = val;
            },
            deep:true,
        },
        tpl(v){
            this.policy.protocalText = v;
        }
    }
}
</script>

