<style lang="less">
.create-event-container{
    width:100%;
    /*padding-bottom:36px;*/
    .ivu-form-item{
        margin-bottom:20px;
    }
    .ivu-form-item-label{
        color:#999!important;
        font-size:14px!important;
    }
    .ivu-select-placeholder,input,.ivu-input-group-append{
        font-size:14px!important;

    }

    .fixed-button{
        text-align: center;
        background: #fff;
        box-shadow:0px -1px 3px 0px rgba(0,0,0,0.12);
        width:100%;
        position: fixed;
        z-index: 99;
        padding:12px 16px;
        bottom: 0;
        right:0;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }
    .row-common{
        padding:21px 32px 12px 32px;
        width:100%;
        background: #fff;
        margin-bottom:16px;
        min-height:120px;
        h2{
            font-size:16px;
            font-weight:normal;
            color:rgba(73,80,96,1);
            padding-bottom:16px;
        }
        .rc-box{

        }
    }
}

</style>

<template>
    <div class="create-event-container">
        <Form ref="formValidate"  :model="formValidate" :rules="ruleValidate" :label-width="140">
            <div class="row-common">
                <h2>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_596')}}</h2>
                <Row>
                    <Col span="8">
                        <FormItem :label="$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_597')" prop="activityType">
                            <Select :disabled="edit" v-model="formValidate.activityType" :placeholder="$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_598')" clearable>
                                <Option :value="item.value" v-for="(item,index) in activityTypeList" :key="index">{{item.label}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem :label="$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_599')" prop="activityName">
                            <Input :disabled="edit" v-model="formValidate.activityName" :placeholder="$t('scoretemplate_compontents_scoremodify_528')"></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem :label="$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_601')" prop="activityTime">
                            <DatePicker
                                    type="daterange"
                                    separator=" ~ "
                                    format="yyyy-MM-dd"
                                    v-model="formValidate.activityTime"
                                    style="width:100%;"
                                    :placeholder="$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_602')"
                                    @on-change="changeDate"
                                    :transfer="true"
                                    clearable>
                            </DatePicker>
                        </FormItem>
                    </Col>
<!--                    <Col span="8">-->
<!--                        <FormItem :label="$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_603')" prop="consumptionClass">-->
<!--                            <Input type="number"  v-model="formValidate.consumptionClass">-->
<!--                                <span slot="append">{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_604')}}</span>-->
<!--                            </Input>-->
<!--                        </FormItem>-->
<!--                    </Col>-->
                </Row>
                <Row>
                    <Col span="8">
                        <FormItem :label="$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_605')" prop="classroom" :rules="(formValidate.activityType != 'place events' && false) ? { required: true, message: $t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_606'), trigger: 'change' } : { required: false }">
                            <Select v-model="formValidate.classroom" :placeholder="$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_607')" clearable>
                                <Option :value="item.id" v-for="(item,index) in classroomList" :key="index">{{item.name}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem :label="$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_608')" prop="hostTeacher" :rules="(formValidate.activityType != 'place events' && false) ? { required: true, message: $t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_609'), trigger: 'change' }: { required: false }">
                            <Select v-model="formValidate.hostTeacher" :placeholder="$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_609')" clearable>
                                <Option :value="item.id" v-for="(item,index) in teachList" :key="index">{{item.name}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem :label="$t('courselist_compontents_modify_193')" prop="serverOO">
                            <Select v-model="formValidate.serverOO" :placeholder="$t('classlist_classlist_6')" clearable>
                                <Option :value="item.id" v-for="(item,index) in serverOOList" :key="index">{{item.name}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <FormItem  :label="$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_612')" prop="leads">
                            <Input :disabled="edit" v-model="formValidate.leads" :placeholder="$t('scoretemplate_compontents_scoremodify_528')"></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem :label="$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_613')" prop="nums">
                            <Input :disabled="edit" v-model="formValidate.nums" :placeholder="$t('scoretemplate_compontents_scoremodify_528')"></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem :label="$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_614')">
                            {{ (formValidate.nums && formValidate.leads)? (formValidate.nums *100/formValidate.leads).toFixed(1) : 0}} %
                        </FormItem>
                    </Col>
                </Row>

            </div>
            <div class="row-common">
                <h2>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_615')}}</h2>
                <Row>
                    <Col span="8">
                        <FormItem :label="$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_616')" prop="siteBudget">
                            <Input :disabled="edit" @on-change="total(0)"  type="number" v-model="formValidate.siteBudget" :placeholder="$t('scoretemplate_compontents_scoremodify_528')">
                                <span slot="append">{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</span>
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem :label="$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_618')" prop="staffBudget">
                            <Input :disabled="edit" @on-change="total(1)"  type="number" v-model="formValidate.staffBudget" :placeholder="$t('scoretemplate_compontents_scoremodify_528')">
                                <span slot="append">{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</span>
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem :label="$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_619')" prop="giftBudget">
                            <Input :disabled="edit" @on-change="total(2)"  type="number" v-model="formValidate.giftBudget" :placeholder="$t('scoretemplate_compontents_scoremodify_528')">
                                <span slot="append">{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</span>
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <FormItem :label="$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_620')" prop="otherBudget">
                            <Input :disabled="edit" @on-change="total(3)" type="number" v-model="formValidate.otherBudget" :placeholder="$t('scoretemplate_compontents_scoremodify_528')">
                                <span slot="append">{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</span>
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem :label="$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_621')" prop="totalBudget">
                            <span style="color: #FF0000;font-size: 14px;">{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_622', [formValidate.totalBudget])}}</span>
                        </FormItem>
                    </Col>
                </Row>
            </div>
            <div class="row-common">
                <h2>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_623')}}</h2>
                <Row>
                    <Col span="8">
                        <FormItem :label="$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_624')" >
                                    <!-- remote
                                    @on-clear="clearApl"
                                    :loading="QrCodeValueLd"
                                    @on-query-change="getQuery"
                                    :remote-method="()=>{}" -->
                            <Select
                                    filterable 
                                    v-model="formValidate.qrCode"
                                    :placeholder="$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_625')"
                                    clearable>
                                <Option v-for="(item,index) in qrCodeList" :label="(item.code?item.code:'') + '(' + (item.title?item.title:'-') +')'" :value="item.code" :key="index">{{ (item.code?item.code:'') + '(' + (item.title?item.title:'-') +')'}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
            </div>
            <div class="fixed-button">
                <div style="margin:0 auto;">
                    <Button @click="handleReset('formValidate')" style="margin-right: 16px">{{cancelOrBack}}</Button>
                    <Button type="primary" @click="handleSubmit('formValidate')">{{$t('courselist_compontents_servicecontent_215')}}</Button>
                </div>
            </div>
        </Form>
    </div>
</template>

<script>
import valid, {
    errors,
    common,
    sysUser,
    sysDict,
    crmActivity,
    crmQrcode
} from "../../../libs/request";
import {mapMutations, mapState} from 'vuex';
import { waitUntil } from '@public/libs/util';
export default {
    name: 'crm.createEvent',
    data () {
        return {
            isActioning: false, //多次提交拦截
            QrCodeValueLd:false,
            loading:true,
            officeId:'',//校区
            startDate:'',
            endDate:'',
            activityTypeList:[],
            teachList:[],
            serverOOList:[],
            // assistList:[],
            classroomList:[],
            qrCodeList:[],
            fromForm:false,//是否从编辑进入
            num:0,
            formValidate: {
                activityType:'',
                activityName:'',
                // consumptionClass:null,
                classroom:'',
                activityTime:[],
                hostTeacher:'',
                serverOO:'',
                leads:'',
                nums:'',
                siteBudget:null,
                staffBudget:null,
                giftBudget:null,
                otherBudget:null,
                totalBudget:0,
                qrCode:'',
            },
            ruleValidate: {
                activityType: [
                    { required: true, message: this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_598'), trigger: 'change' }
                ],
                // classroom: [
                //     { required: true, message: '请选择活动教室', trigger: 'change' }
                // ],
                activityName: [
                    { required: true, message: this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_627'), trigger: 'blur' }
                ],
                // consumptionClass: [
                //     { message: '请输入消耗课时数', trigger: 'blur' },
                //     {pattern: /^[0-9]+$/, message: '必须为不小于0的数字', trigger: 'blur'}
                // ],
                activityTime: [
                    {
                        "required": true,
                        "type": "array",
                        "trigger": "change",
                        "fields": {
                            "0": {
                                "type": "date",
                                "message": this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_628'),
                                "required": true
                            },
                            "1": {
                                "type": "date",
                                "message": this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_628'),
                                "required": true
                            }
                        }
                    }
                ],
                // hostTeacher: [
                //     { required: true, message: '请选择主持老师', trigger: 'change' }
                // ],
                // serverOO: [
                //     { required: true, message: '请选择服务OO', trigger: 'change' }
                // ],
                // TeachingAssistant: [
                //     { required: true, message: '请选择授课助教', trigger: 'change' }
                // ],
                leads: [
                    { required: true, message: this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_629'), trigger: 'blur' },
                    {pattern: /^[1-9]\d*$/, message: this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_630'), trigger: 'blur'}
                ],
                nums: [
                    { required: true, message: this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_631'), trigger: 'blur' },
                    {pattern: /^[1-9]\d*$/, message: this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_630'), trigger: 'blur'}
                ],
                siteBudget: [
                    { required: true, message: this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_632'), trigger: 'blur' },
                    {pattern:/^(([1-9]\d*)|([0]))(\.[0-9]{2})?$/, message: this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_633'), trigger: 'blur'}
                ],
                staffBudget: [
                    { required: true, message: this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_634'), trigger: 'blur' },
                    {pattern: /^(([1-9]\d*)|([0]))(\.[0-9]{2})?$/, message: this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_633'), trigger: 'blur'}
                ],
                giftBudget: [
                    { required: true, message: this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_635'), trigger: 'blur' },
                    {pattern: /^(([1-9]\d*)|([0]))(\.[0-9]{2})?$/, message: this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_633'), trigger: 'blur'}
                ],
                otherBudget: [
                    { required: true, message: this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_636'), trigger: 'blur' },
                    {pattern: /^(([1-9]\d*)|([0]))(\.[0-9]{2})?$/, message: this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_633'), trigger: 'blur'}
                ],
                // totalBudget: [
                //     { required: true, message: '请输入总预算', trigger: 'blur' },
                //     {pattern:/^\d+(\.[0-9]{2})?$/, message: '必须为整数或保留两位小数', trigger: 'blur'}
                // ],

            },
            formData:{},
            edit:false,
        }
    },
    computed:{
        ...mapState(["userInfo", "app"]),
        cancelOrBack(){
            let value = this.$route.query.id ? this.$t('classroom_exchange_105') :this.$t('classroom_allscore_53')
            return value;
        }
    },
    mounted(){
        // console.log(this.userInfo)
        // console.log(this.app)
        this.listByCode()
        // console.log(this.app.currOfficeId)
    },
    methods: {
        ...mapMutations(["updateLoadingStatus",'closeTag']),
        init(){
            if(this.$route.query.id){
                this.edit = true
                this.getForm(this.$route.query.id)
            }else{
                this.officeId = this.app.currOfficeId
                this.listClassroom()
                this.batchListData()
            }
        },
        getForm(id){ //获取详情信息
            this.updateLoadingStatus({ isLoading: true });
            crmActivity.form({id:id})
            .then(valid.call(this))
            .then((res) => {
                if(res.ok){
                    // console.log(res.data)
                    // console.log('3')
                    this.fromForm = true//来自编辑
                    this.num = 0
                    this.formData = res.data.data
                    this.officeId = this.formData.officeId
                    this.startDate = this.formData.beginDate
                    this.endDate = this.formData.endDate
                    this.formValidate.activityType = this.formData.type
                    // this.formValidate.consumptionClass = this.formData.courseHour
                    this.formValidate.activityName = this.formData.name
                    this.formValidate.classroom = this.formData.classroomId
                    this.formValidate.hostTeacher = this.formData.teacherId
                    this.formValidate.serverOO = this.formData.classTeacherId
                    // this.formValidate.TeachingAssistant = this.formData.assistId
                    this.formValidate.leads = this.formData.predictLeads
                    this.formValidate.nums = this.formData.predictCount
                    this.formValidate.nums = this.formData.predictCount
                    this.formValidate.siteBudget = parseFloat(this.formData.placeCost).toFixed(2)
                    this.formValidate.staffBudget = parseFloat(this.formData.personCost).toFixed(2)
                    this.formValidate.giftBudget = parseFloat(this.formData.giftCost).toFixed(2)
                    this.formValidate.otherBudget = parseFloat(this.formData.otherCost).toFixed(2)
                    this.formValidate.totalBudget = parseFloat(this.formData.cost).toFixed(2)
                    this.formValidate.activityTime = [this.formData.beginDate,this.formData.endDate]
                    this.formValidate.qrCode = this.formData.qrCode
                    this.qrCodeList.unshift({
                        code: this.formData.qrCode,
                        id: this.formData.qrId,
                        title: this.formData.title || ''
                    })
                    // this.qrCodeList = [
                    //     {
                    //         code:this.formData.qrCode,
                    //         id:this.formData.qrId
                    //     }
                    // ]
                    // console.log(this.qrCodeList)
                    this.getTeachers('teacher',{id:this.formData.teacherId,name:this.formData.teacherName})
                    // this.getTeachers('assit')
                    this.getTeachers('classTeacher',{id:this.formData.classTeacherId,name:this.formData.classTeacherName})
                    //获取下拉
                    this.listClassroom()
                    this.batchListData()
                }
            })
            .then(errors.call(this))
            .finally(() => {
                this.updateLoadingStatus({ isLoading: false });
            })
        },
        batchListData() {
            this.updateLoadingStatus({ isLoading: true });
            let types =
                "crm_activity_type";
            sysDict
            .batchListData({
                types
            })
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    // console.log(res)
                    this.activityTypeList = res.data.data.crm_activity_type
                }
            })
            .catch(errors.call(this))
            .finally(() => {
                this.updateLoadingStatus({ isLoading: false });
            });

        },
        getTeachers(type,data){
            crmActivity
            .listUnConflictedUsers({
                "officeId" : this.officeId,
                "userType" : type,
                "startTime" : this.startDate,
                "endTime" : this.endDate
            })
            .then(valid.call(this))
            .then((res) => {
                // console.log(res)
                if (res.ok) {
                    if(type == 'teacher'){
                        this.teachList = res.data.data
                        if(data){
                            this.teachList.push(data)
                        }
                    }else if(type == 'assit'){ //助教
                        // this.assistList = res.data.data
                    }else if(type == 'classTeacher'){ //服务oo
                        this.serverOOList = res.data.data
                        if(data){
                            this.serverOOList.push(data)
                        }
                    }
                }
                // else{
                //     if(data){
                //         if(type == 'teacher'){
                //             if(data){
                //                 this.teachList.push(data)
                //             }
                //         }else if(type == 'classTeacher'){ //服务oo
                //             if(data){
                //                 this.serverOOList.push(data)
                //             }
                //         }
                //     }
                // }
            })
            .then(errors.call(this))
            .finally(() => {
            })
        },
        listClassroom(){ //教室
            common
            .listByOfficeId({
                officeId:this.officeId,
            })
            .then(valid.call(this))
            .then((res) => {
                // console.log(res.data)
                if (res.ok) {
                    this.classroomList = res.data.data
                }
            })
            .then(errors.call(this))
            .finally(() => {
            })
        },
        // getQuery(query) {
        //     // console.log("2--"+query)
        //     if(this.fromForm && !this.num){
        //         this.num++
        //         return false;
        //     }else {
        //         this.fromForm = false
        //     }
        //     if(query.length <1 && query !== undefined){
        //         this.formValidate.qrCode = ''
        //         this.qrCodeList = []
        //     }
        //     this.listByCode(query)
        //     // console.log('0')
        // },
        // clearApl(){
        //     this.qrCodeList = []
        // },
        listByCode(query){
            // console.log('1---'+query)
            // if (query != "" && !this.fromForm) {
                // this.QrCodeValueLd = true
                let obj= {
                    officeId: '',
                    code: '' ,
                    title: ''
                };
                crmQrcode.listByCode(obj)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.qrCodeList = res.data.data
                        this.init()
                    }
                })
                .catch(errors.call(this))
                .finally(()=>{
                    // this.QrCodeValueLd = false
                })
            // }
        },
        total(key){
            let a = !this.formValidate.siteBudget ? 0 : parseFloat(this.formValidate.siteBudget)
            let b = !this.formValidate.staffBudget ? 0 : parseFloat(this.formValidate.staffBudget)
            let c = !this.formValidate.giftBudget ? 0 : parseFloat(this.formValidate.giftBudget)
            let d = !this.formValidate.otherBudget ? 0 : parseFloat(this.formValidate.otherBudget)
            this.formValidate.totalBudget = (a + b + c + d).toFixed(2);
        },
        changeDate(date) {
            // console.log(date)
            this.startDate = date[0];
            this.endDate = date[1];
            this.formValidate.hostTeacher = ''
            this.formValidate.serverOO = ''
            this.formValidate.TeachingAssistant = ''
            if(date[0]){
                this.getTeachers('teacher')
                // this.getTeachers('assit')
                this.getTeachers('classTeacher')
            }

        },
        handleSubmit (name) {
            if(this.loading){
                this.loading = false
                this.$refs[name].validate((valids) => {
                    if (valids) {
                        let a = setTimeout(()=>{
                            this.loading = true
                            clearTimeout(a)
                        },1000)
                        if(this.edit){
                            this.updateBase()
                        }else{
                            this.save()
                        }
                    } else {
                        this.loading = true
                        this.$Message.error(this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_639'));
                    }
                })
            }

        },
        updateBase() {
            let params = {
                "classroomId": this.formValidate.classroom,
                "beginDate": this.startDate,
                "endDate": this.endDate,
                "teacherId": this.formValidate.hostTeacher,//主持老师
                "classTeacherId": this.formValidate.serverOO,//服务OO
                id:this.$route.query.id,
                "qrCode": this.formValidate.qrCode,
                "type": this.formData.type
            }
            if(this.isActioning){ //多次提交拦截
                return
            }
            this.isActioning = true
            this.updateLoadingStatus({ isLoading: true });
            crmActivity.updateBase(params)
            .then(valid.call(this))
            .then((res) => {
                // console.log(res)
                if(res.ok){
                    this.$Message.success(this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_640'));
                    this.$router.push({
                        name:"crm.activityEnrollment.detial",
                        query:{
                            activityId: this.$route.query.id,
                            qr:this.$route.query.qr,
                            isEnable:this.$route.query.isEnable
                        }
                    })
                }

            })
            .then(errors.call(this))
            .finally(() => {
                this.updateLoadingStatus({ isLoading: false });
                setTimeout(()=>{
                    //多次提交拦截
                    this.isActioning = false
                },200)
                // this.$refs['formValidate'].resetFields()
                // this.startDate = ''
                // this.endDate = ''
            })
        },
        save() {
            let params = {
                "type": this.formValidate.activityType,
                // "courseHour": this.formValidate.consumptionClass === null ? '' : this.formValidate.consumptionClass ,//消耗课时数
                "name": this.formValidate.activityName,
                "classroomId": this.formValidate.classroom,
                "beginDate": new Date(this.startDate).format('yyyy-MM-dd 00:00'),
                "endDate": new Date(this.endDate).format('yyyy-MM-dd 23:59'),
                "teacherId": this.formValidate.hostTeacher,//主持老师
                "classTeacherId": this.formValidate.serverOO,//服务OO
                // "assistId": this.formValidate.TeachingAssistant,//助教
                "predictLeads": this.formValidate.leads,
                "predictCount": this.formValidate.nums,
                "placeCost": this.formValidate.siteBudget,
                "personCost": this.formValidate.staffBudget,
                "giftCost": this.formValidate.giftBudget,
                "otherCost": this.formValidate.otherBudget,
                "qrCode": this.formValidate.qrCode,
                officeId:this.officeId,
            }

            if(this.$route.query.id){
                params.id = this.$route.query.id
            }
            if(this.isActioning){ //多次提交拦截
                return
            }
            this.isActioning = true
            this.updateLoadingStatus({ isLoading: true });
            crmActivity.save(params)
            .then(valid.call(this))
            .then((res) => {
                // console.log(res)
                if(res.ok){
                    this.$Message.success(this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_641'));
                    this.closeTag(this.$route)
                    this.$router.push({
                        name:"crm.activityEnrollment"
                    })
                }
            })
            .then(errors.call(this))
            .finally(() => {
                this.updateLoadingStatus({ isLoading: false });
                setTimeout(()=>{
                    //多次提交拦截
                    this.isActioning = false
                },200)
                // this.$refs['formValidate'].resetFields()
                // this.startDate = ''
                // this.endDate = ''
            })
        },
        handleReset (name) {
            this.loading = true
            if(this.$route.query.id){
                this.$router.push({
                    name:"crm.activityEnrollment.detial",
                    query:{
                        activityId: this.$route.query.id,
                        qr:this.$route.query.qr,
                        isEnable:this.$route.query.isEnable
                    }
                })
            }else{
                this.$router.push({
                    name:"crm.activityEnrollment"
                })
            }
        }
    },
    watch:{
        'app.currOfficeId': function(val,oldVal){
            if(oldVal != val){
               console.log(this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_642'))
                if(!this.edit){
                    this.listByCode()
                    this.officeId = this.app.currOfficeId
                    // this.listClassroom()
                    // this.batchListData()

                    this.formValidate.hostTeacher = ''
                    this.formValidate.serverOO = ''
                    this.formValidate.TeachingAssistant = ''
                    this.formValidate.classroom = ''

                }
            }
        }
    }
}
</script>
