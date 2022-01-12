<style lang="less">
.yhzcRuleSetting{
    .mySelect{
        .ivu-select-selection{
            min-height: 60px;
        }
    }
    .ivu-form .ivu-form-item-label{
        color: #b8b8b8;
    }
}
</style>
<template>
    <div class="yhzcRuleSetting">
        <Form ref="yhzcRuleSettingForm" :rules="basicFormValidate" :model="formValidate"  :label-width="110">
            <FormItem :label="$t('modules_spoc_sign_web_src_views_discount_componet_addzzdd_6104')" prop="name"
            :rules="{ required: true, message: $t('modules_spoc_sign_web_src_views_discount_componet_addzzdd_6105'), trigger: 'blur' }">
                <Input v-model="formValidate.name" :placeholder="$t('scoretemplate_compontents_scoremodify_528')" :maxlength="20" style="width:387px;"></Input><span style="margin-left:8px;color:red;text-align: right;display: inline-block;width: 36px;">{{formValidate.name ? formValidate.name.length : 0}}/20</span>
            </FormItem>
          <!--   <FormItem :label="$t('modules_spoc_sign_web_src_views_discount_componet_otherrulesetting_6147')" prop="yhType"
            :rules="{ required: true, message: $t('modules_spoc_sign_web_src_views_discount_componet_otherrulesetting_6148'), trigger: 'change' }">
                <Select v-model="formValidate.yhType" :placeholder="$t('pushsettings_index_505')" style="width:364px;">
                    <Option value="1">{{$t('modules_spoc_sign_web_src_views_category_category_5138')}}</Option>
                </Select>
            </FormItem> -->
            <FormItem :label="$t('modules_spoc_sign_web_src_views_contractgeneration_contractgeneration1_5607')" prop="type"
            :rules=" { required: true, message: $t('modules_spoc_sign_web_src_views_discount_componet_yhzcrulesetting_6227'), trigger: 'change' }">
                <Select v-model="formValidate.type" :placeholder="$t('pushsettings_index_505')" style="width:443px;">
                    <Option  v-for="(item,index) in dictData.ht_item_type" :key="index" :value="item.value">{{item.label}}</Option>
                </Select>
            </FormItem>
            <div  v-show="formValidate.type == 'discount'">
                <FormItem :label="$t('modules_spoc_sign_web_src_views_discount_componet_yhzcrulesetting_6228')" prop="ratio" class="ivu-form-item-required"
                :rules="formValidate.type != 'discount' ? {} :{ validator: validateRatio, trigger: 'blur' }">
                    <Input number v-model="formValidate.ratio" :placeholder="$t('scoretemplate_compontents_scoremodify_528')" style="width:443px;"></Input>
                </FormItem>
            </div>
            <div v-show="formValidate.type == 'fullreduction'">
                <FormItem :label="$t('modules_spoc_sign_web_src_views_discount_componet_yhzcrulesetting_6229')" prop="fullReductionPrice" class="ivu-form-item-required"
                :rules="formValidate.type != 'fullreduction'? {}:{ validator: validateFullReductio1, trigger: 'blur' }">
                    <Input number v-model="formValidate.fullReductionPrice" :placeholder="$t('scoretemplate_compontents_scoremodify_528')" style="width:443px;"></Input>
                </FormItem>
                <FormItem :label="$t('modules_spoc_sign_web_src_views_discount_componet_yhzcrulesetting_6230')" prop="fullReductionDiscount" class="ivu-form-item-required"
                :rules="formValidate.type != 'fullreduction'? {}:{ validator: validateFullReductio2, trigger: 'blur' }">
                    <Input number v-model="formValidate.fullReductionDiscount" :placeholder="$t('scoretemplate_compontents_scoremodify_528')" style="width:443px;"></Input>
                </FormItem>
                <FormItem :label="$t('modules_spoc_sign_web_src_views_discount_componet_yhzcrulesetting_6231')" prop="fullReductionLimit" class="ivu-form-item-required"
                :rules="formValidate.type != 'fullreduction'? {}:{ validator: validateFullReductionLimit, trigger: 'blur' }">
                    <Input number v-model="formValidate.fullReductionLimit" :placeholder="$t('scoretemplate_compontents_scoremodify_528')" style="width:443px;"></Input>
                </FormItem>
            </div>
          <!--   <FormItem :label="$t('modules_spoc_sign_web_src_views_discount_componet_yhzcrulesetting_6232')" prop="zuheyouhuichongtu">
                <RadioGroup v-model="formValidate.zuheyouhuichongtu">
                    <Radio label="0">{{$t('modules_spoc_sign_web_src_views_discount_componet_yhzcrulesetting_6233')}}</Radio>
                    <Radio label="1">{{$t('modules_spoc_jw_web_src_views_schedulemanage_schedulemanagelist_2963')}}</Radio>
                </RadioGroup>
            </FormItem> -->
            <FormItem :label="$t('modules_spoc_sign_web_src_views_discount_componet_yhzcrulesetting_6235')" prop="syfw">
               <!--  <RadioGroup v-model="formValidate.syfw">
                    <Radio label="0">{{$t('message_index_287')}}</Radio>
                    <Radio label="1">{{$t('modules_spoc_sign_web_src_views_discount_componet_yhzcrulesetting_6237')}}</Radio>
                    <Radio label="2">{{$t('modules_spoc_sign_web_src_views_discount_componet_yhzcrulesetting_6238')}}</Radio>
                </RadioGroup> -->
                <Checkbox  v-model="checkAllSyfw" @on-change="handleCheckAll">{{$t('modules_rolepeople_212')}}</Checkbox>
                <CheckboxGroup v-model="formValidate.syfw" @on-change="checkAllGroupChange">
                    <Checkbox label="1">{{$t('modules_spoc_sign_web_src_views_discount_componet_yhzcrulesetting_6237')}}</Checkbox>
                    <Checkbox label="2">{{$t('modules_spoc_sign_web_src_views_discount_componet_yhzcrulesetting_6238')}}</Checkbox>
                </CheckboxGroup>
            </FormItem>
            <FormItem class="mySelect" :label="$t('scoretemplate_compontents_scoremodify_533')" prop="syxq">
                <Select v-model="formValidate.syxq"  @on-change="changeSelectXq" multiple style="width:385px;margin-right:6px;">
                    <Option v-for="(item,index) in xqLists" :value="item.subId" :key="index">{{ item.name }}</Option>
                </Select>
                <Checkbox  v-model="checkAllSyxq" @on-change="handleCheckAllSyxq">{{$t('modules_rolepeople_212')}}</Checkbox>
            </FormItem>
            <FormItem class="mySelect" :label="$t('modules_spoc_sign_web_src_views_discount_componet_yhzcrulesetting_6241')" prop="sykcb">
                <Select v-model="formValidate.sykcb"  @on-change="changeSelectKcb" multiple style="width:385px;margin-right:6px;">
                    <Option v-for="(item,index) in courseForChooseList" :value="item.id" :key="index">{{ item.name }}</Option>
                </Select>
                <Checkbox  v-model="checkAllSykcb" @on-change="handleCheckAllSykcb">{{$t('modules_rolepeople_212')}}</Checkbox>
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
        },
        dictData: {
            type: Object,
            required: true,
        },
        xqLists: {
            type: Array,
            required: true,
        },
        courseForChooseList: {
            type: Array,
            required: true,
        }
    },
    components:{
    },
    computed:{
        xqSubidLists(){
            let q = []
            this.xqLists.forEach(item => {
                q.push(item.subId)
            });
            return q
        },
        courseIdList(){
            let q = []
            this.courseForChooseList.forEach(item => {
                q.push(item.id)
            });
            return q
        }
    },
    mounted() {
    },
    data() {
        const validatePass = (rule, value, callback) => {
           /*  if (value === '') {
                callback(new Error('请选择开始时间'));
            } else { */
                if (this.formValidate.endTime !== '') {
                    this.$refs.yhzcRuleSettingForm.validateField('endTime');
                }
                callback();
            /* } */
        };
        //起止时间校验--结束时间
        const validatePassCheck = (rule, value, callback) => {
           /*  if (value === '') {
                callback(new Error('请选择结束时间'));
            } else */ if (this.formValidate.startTime && this.formValidate.startTime.getTime() >new Date(value).getTime()) {
                callback(new Error('结束时间不能早于开始时间'));
            } else {
                callback();
            }
        };
        return {
            validateRatio : (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error('不能为空'));
                }
                if (Number(value) !==0 && !Number(value)) {
                    return callback(new Error('请输入数字'));
                } else {
                    if (value <= 0 || value >= 1) {
                        return callback(new Error('请输入0~1之间的数字'));
                    } else {
                        return callback();
                    }
                }
            },
            validateFullReductionLimit : (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error('不能为空'));
                }
                // 模拟异步验证效果
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        return callback(new Error('请输入整数'));
                    } else {
                        if (value < 0) {
                            return callback(new Error('请输入不小于零的整数'));
                        } else {
                            return callback();
                        }
                    }
                }, 0);
            },
            validateFullReductio1 : (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error('不能为空'));
                }
                if (Number(value) !==0 && !Number(value)) {
                    return callback(new Error('请输入数字'));
                } else {
                    if (value <=0) {
                        return callback(new Error('请输入正数'));
                    } else if(this.formValidate.fullReductionPrice && this.formValidate.fullReductionDiscount){
                        this.$refs.yhzcRuleSettingForm.validateField('fullReductionDiscount');
                        return callback();
                    } else {
                        return callback();
                    }
                }
            },
            validateFullReductio2 : (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error('不能为空'));
                }
                if (Number(value) !==0  && !Number(value)) {
                    return callback(new Error('请输入数字'));
                } else {
                    if (value <=0) {
                        return callback(new Error('请输入正数'));
                    } else if(this.formValidate.fullReductionPrice && this.formValidate.fullReductionDiscount && this.formValidate.fullReductionPrice <= this.formValidate.fullReductionDiscount){
                        return callback(new Error('优惠金额不能大于最低满足价格'));
                    } else {
                        return callback();
                    }
                }
            },
            checkAllSyfw: false,
            checkAllSyxq: false,
            checkAllSykcb: false,
            formValidate: {
                id: '',
                name: '',
                type: '',
                ratio: '',
                fullReductionPrice: '',
                fullReductionDiscount: '',
                fullReductionLimit: '',
                syfw: [],
                syxq: [],
                sykcb:'',
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
                syfw: [
                    { required: true, type: 'array', min: 1, message: '请至少选择一项', trigger: 'change' }
                ],
            },
            ruleValidate: {
               /* zuheyouhuichongtu: [
                    { required: true, message: '请选择组合优惠冲突', trigger: 'change' }
                ],
                syfw: [
                    { required: true, message: '请选择使用范围', trigger: 'change' }
                ],
                syxq: [
                    { required: true, message: '请选择适用校区', trigger: 'blur' }
                ],
                sykcb: [
                    { required: true, message: '请选择适用课程包', trigger: 'blur' }
                ],
                itemDesc: [
                    { required: true, message: '请输入适用产品描述', trigger: 'blur' },
                    { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                ]*/
            },
        }
    },
    methods: {
        changeSelectXq(){
            if(this.formValidate.syxq.length == this.xqSubidLists.length){
                this.checkAllSyxq = true
            } else {
                this.checkAllSyxq = false
            }
        },
        changeSelectKcb(){
            if(this.formValidate.sykcb.length == this.courseIdList.length){
                this.checkAllSykcb = true
            } else {
                this.checkAllSykcb = false
            }
        },
        handleCheckAll () {
            if (this.checkAllSyfw) {
                this.formValidate.syfw = ['1','2'];
            } else {
                this.formValidate.syfw = [];
            } 
        },
        handleCheckAllSyxq () {
            if (this.checkAllSyxq) {
                this.formValidate.syxq = [].concat(this.xqSubidLists);
            } else {
                this.formValidate.syxq = [];
            } 
        },
        handleCheckAllSykcb () {
            if (this.checkAllSykcb) {
                this.formValidate.sykcb = [].concat(this.courseIdList);
            } else {
                this.formValidate.sykcb = [];
            } 
        },
        checkAllGroupChange (data) {
            console.log(this.formValidate.syfw)
            if (data.length === 2) {
                this.checkAllSyfw = true;
            } else {
                this.checkAllSyfw = false;
            }
        }
    },
}
</script>