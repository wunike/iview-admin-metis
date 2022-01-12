<style lang="less">
.otherRuleSetting{
    .ivu-form .ivu-form-item-label{
        color: #b8b8b8;
    }
}
</style>
<template>
    <div class="otherRuleSetting">
        <Form ref="otherRuleSettingForm" :rules="basicFormValidate"  :model="formValidate"  :label-width="110">
            <FormItem :label="$t('modules_spoc_sign_web_src_views_discount_componet_addzzdd_6104')" prop="name"
            :rules="{ required: true, message: $t('modules_spoc_sign_web_src_views_discount_componet_addzzdd_6105'), trigger: 'blur' }">
                <Input v-model="formValidate.name" :placeholder="$t('scoretemplate_compontents_scoremodify_528')" style="width:397px;" :maxlength="10"></Input><span style="margin-left:8px;color:red;text-align: right;display: inline-block;width: 36px;">{{formValidate.name ? formValidate.name.length : 0}}/10</span>
            </FormItem>
           <!--  <FormItem :label="$t('modules_spoc_sign_web_src_views_discount_componet_otherrulesetting_6147')" prop="yhType"
            :rules="{ required: true, message: $t('modules_spoc_sign_web_src_views_discount_componet_otherrulesetting_6148'), trigger: 'change' }">
                <Select v-model="formValidate.yhType" :placeholder="$t('pushsettings_index_505')" style="width:270px;">
                    <Option value="1">{{$t('modules_spoc_sign_web_src_views_category_category_5138')}}</Option>
                </Select>
            </FormItem> -->
            <FormItem :label="$t('modules_spoc_sign_web_src_views_discount_componet_otherrulesetting_6151')" prop="lpjz"
            :rules="{ required: true, message: $t('modules_spoc_sign_web_src_views_discount_componet_otherrulesetting_6152'), trigger: 'blur' }">
                <Input v-model="formValidate.lpjz" :placeholder="$t('scoretemplate_compontents_scoremodify_528')" style="width:443px;"></Input>
            </FormItem>
            <FormItem :label="$t('modules_spoc_sign_web_src_views_discount_componet_otherrulesetting_6153')">
                <Row>
                    <Col span="10">
                        <FormItem prop="startTime">
                            <DatePicker type="date" :placeholder="$t('modules_spoc_sign_web_src_views_discount_componet_otherrulesetting_6154')" v-model="formValidate.startTime"></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="4" style="text-align: center">----</Col>
                    <Col span="10">
                        <FormItem prop="endTime">
                            <DatePicker type="date" :placeholder="$t('modules_spoc_sign_web_src_views_discount_componet_otherrulesetting_6155')" v-model="formValidate.endTime"></DatePicker>
                        </FormItem>
                    </Col>
                </Row>
            </FormItem>
            <FormItem :label="$t('modules_spoc_sign_web_src_views_discount_componet_addzzdd_6106')" prop="itemDesc">
                <Input v-model="formValidate.itemDesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('scoretemplate_compontents_scoremodify_528')" style="width:443px;"></Input>
            </FormItem>
        </Form>
    </div>
</template>
<script>
export default {
    props:{
        rules:{
            type:Array,
            required:true
        }
    },
    components:{
    },
    computed:{
    },
    mounted() {
    },
    data() {
        const validatePass = (rule, value, callback) => {
           /*  if (value === '') {
                callback(new Error('请选择开始时间'));
            } else { */
                if (this.formValidate.endTime !== '') {
                    this.$refs.otherRuleSettingForm.validateField('endTime');
                }
                callback();
            /* } */
        };
        //起止时间校验--结束时间
        const validatePassCheck = (rule, value, callback) => {
           /*  if (value === '') {
                callback(new Error('请选择结束时间'));
            } else */ if (this.formValidate.startTime && this.formValidate.startTime.getTime() >new Date(value).getTime()) {
                callback(new Error(this.$t('modules_spoc_sign_web_src_views_discount_componet_otherrulesetting_6157')));
            } else {
                callback();
            }
        };
        return {
            formValidate: {
                id:'',
                name: '',
                lpjz: '',
                startTime:'',
                endTime: '',
                itemDesc: ''
            },
            basicFormValidate:{
                startTime:[
                    { validator: validatePass, trigger: 'change' }
                ],
                endTime:[
                    { validator: validatePassCheck, trigger: 'change' }
                ],
            },
        }
    },
    methods: {
    },
}
</script>