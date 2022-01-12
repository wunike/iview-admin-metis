<style lang="less">
    .add-org-class{
        .ivu-modal-body{
            padding-bottom:4px;
        }
        .form-line{
            width:100%;
            height:32px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            margin-bottom:20px;
            .form-line-is{
                height:1px ;
                background: rgba(0,0,0,.2);
            }
            .is1{
                width:24px;
            }
            .is2{
                width:641px;
            }
            .form-line-txt{
                display: block;
                width:56px;
                font-size:14px;
                color:#495060;
            }
        }
    }
</style>

<template>
    <div>
        <Modal
            :width="hide? 400: 800"
            class="add-org-class"
            v-model="showAddOrg"
            @on-click="asyncCancel"
            :mask-closable="false"
            :title="orgName">
            <Form ref="form"  :rules="ruleCustom"   :model="form" label-position="right" :label-width="hide ? 90: 120">
                <div v-if="!hide">
                    <Row>
                        <Col span="12">
                            <FormItem :label="$t('views_staff_components_lefttree_632')" prop="name">
                                <Input  v-model="form.name"></Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                        <!-- :disabled="isLockOrgNum && isReWrite " -->
                            <FormItem :label="$t('views_staff_components_lefttree_631')" prop="code">
                                <Input  v-model="form.code"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row v-if="!hide">
                        <Col span="12">
                            <FormItem :label="$t('views_staff_components_lefttree_633')" prop="type">
                                <Select v-model="form.type">
                                    <Option v-for="item in form.orgTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem :label="$t('views_staff_components_lefttree_634')" prop="parentName">
                                <Select :disabled="disabledPar" v-model="form.parentName"  @on-change="parentNameFn(form.parentName)">
                                    <Option v-for="(item,index ) in form.parentNameList"  :value="item.value" :key="index">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <FormItem :label="$t('views_staff_components_lefttree_635')" :prop="hide?'':'belongType'">
                                <Select  v-model="form.belongType" >
                                    <Option v-for="(item,index ) in form.belongTypeList" style="width:250px" :value="item.value" :key="index">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <!-- <Col span="12">
                            <FormItem :label="$t('views_staff_components_lefttree_633')" prop="type">
                                <Select v-model="form.type">
                                    <Option v-for="item in form.orgTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                        </Col> -->
                        <Col span="12" v-if="!hide">
                            <FormItem :label="$t('views_staff_components_lefttree_639')" prop="cityLevel">
                                <Select v-model="form.cityLevel" style="width:200px;margin-right:10px;">
                                    <Option v-for="item in form.cityLevelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>{{$t('views_staff_components_lefttree_640')}}</FormItem>
                        </Col>
                    </Row>
                    <Row v-if="!hide">
                        <Col span="12">
                            <FormItem prop="address" :label="$t('views_staff_components_lefttree_641')">
                                <Row type="flex" justify="space-between">
                                    <div style="width:100%;
                                            display: flex;
                                            flex-direction: row;
                                            justify-content: space-between;
                                            align-items: center;">
                                        <Input style="margin-right: 8px;"  v-model="form.address" :placeholder="$t('views_staff_components_lefttree_6411')"></Input>
                                        <Button @click="getMap">{{$t('views_staff_components_lefttree_6412')}}</Button>
                                    </div>
        <!--                            <Col span="8">-->
        <!--                                <Select transfer v-model="form.districtEntity.country" :placeholder="$t('modules_spoc_core_web_src_views_staff_components_addorg_294')" clearable @on-change="toShowProvince">-->
        <!--                                    <Option :value="item.id" v-for="item in countryList" :key="item.id">{{item.name}}</Option>-->
        <!--                                </Select>-->
        <!--                            </Col>-->
        <!--                            <Col span="8">-->
        <!--                                <Select transfer v-model="form.districtEntity.province" :placeholder="$t('modules_spoc_core_web_src_views_staff_components_addorg_295')" clearable @on-change="toShowCity">-->
        <!--                                    <Option :value="item.id" v-for="item in provinceList" :key="item.id">{{item.name}}</Option>-->
        <!--                                </Select>-->
        <!--                            </Col>-->
        <!--                            <Col span="8">-->
        <!--                                <Select transfer v-model="form.districtEntity.city" :placeholder="$t('modules_spoc_core_web_src_views_staff_components_addorg_296')" clearable>-->
        <!--                                    <Option :value="item.id" v-for="item in cityList" :key="item.id">{{item.name}}</Option>-->
        <!--                                </Select>-->
        <!--                            </Col>-->
                                </Row>
                            </FormItem>
                        </Col>
                    </Row>
        <!--            <Row v-if="!hide">-->
        <!--                <Col span="24">-->
        <!--                    <FormItem :label="$t('views_staff_components_lefttree_641')" prop="address" >-->
        <!--                        <Input v-model="form.address" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('scoretemplate_compontents_scoremodify_528')" style="width:631px;margin-bottom:0;"></Input>-->
        <!--                    </FormItem>-->
        <!--                </Col>-->
        <!--            </Row>-->
                    <div  class="form-line" v-if="!hide">
                        <div class="form-line-is is1"></div>
                        <div class="form-line-txt">{{$t('views_staff_components_lefttree_643')}}</div>
                        <div class="form-line-is is2"></div>
                    </div>
                    <Row v-if="!hide">
                        <Col span="12">
                            <FormItem :label="$t('views_staff_components_lefttree_644')" prop="accountName">
                                <Input v-model="form.accountName" :placeholder="$t('scoretemplate_compontents_scoremodify_528')"></Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem :label="$t('views_staff_components_lefttree_645')" prop="accountBank">
                                <Input v-model="form.accountBank"  :placeholder="$t('scoretemplate_compontents_scoremodify_528')"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row v-if="!hide">
                        <Col span="12">
                            <FormItem :label="$t('views_staff_components_lefttree_646')" prop="account">
                                <Input v-model="form.account"  :placeholder="$t('scoretemplate_compontents_scoremodify_528')"></Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem :label="$t('views_staff_components_lefttree_647')" prop="phone">
                                <Input v-model="form.phone"  :placeholder="$t('scoretemplate_compontents_scoremodify_528')"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row v-if="!hide">
                        <Col span="24">
                            <FormItem :label="$t('views_staff_components_lefttree_648')" prop="remarks">
                                <Input v-model="form.remarks"
                                    type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('scoretemplate_compontents_scoremodify_528')"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                </div>
                <div v-if="hide">
                    <FormItem v-show="parentNameForView" label="父级机构:">
                        <Input  v-model="parentNameForView" readonly disabled></Input>
                    </FormItem>
                    <FormItem :label="$t('views_staff_components_lefttree_632')" prop="name">
                        <Input  v-model="form.name"></Input>
                    </FormItem>
                    <!-- :disabled="isLockOrgNum && isReWrite " -->
                    <FormItem :label="$t('views_staff_components_lefttree_631')" prop="code">
                        <Input  v-model="form.code"></Input>
                    </FormItem>
                    <FormItem :label="$t('views_staff_components_lefttree_633')" prop="type">
                        <Select v-model="form.type">
                            <Option v-for="item in form.orgTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </div>
            </Form>
            <div slot="footer">
                <Button @click="asyncCancel">{{$t('classroom_allscore_53')}}</Button>
                <Button type="primary"  @click="asyncButton">{{$t('classroom_allscore_54')}}</Button>
            </div>
        </Modal>
        <mapModel ref="mapModel" @mapOk="mapOk"></mapModel>
    </div>
</template>

<script>
    import valid, {
        errors,
        sysOffice,
        sysUser,
        sys,
        sysDict
    } from '../../../libs/request';
    import {htRecepitAccount} from '../../../../../spoc-sign-web/src/libs/htRecepitAccount.js'
    import {mapMutations} from 'vuex';
    import mapModel from "@public/modules/mapModel.vue";

    export default {
        props: {
            hide:{
                type:Boolean,
                default:()=>{
                    return false
                }
            }
        },
        components:{
            mapModel
        },
        data() {
            const validatePass = (rule, value, callback) => {
                if(value !== null && value !== undefined) {
                    let va = value.replace(/\s*/g, '')
                    if (va === '') {
                        callback(new Error(this.$t('pushsettings_index_507')));
                    } else {
                        callback();
                    }
                }else{
                    callback(new Error(this.$t('pushsettings_index_507')));
                }
            };
            const validateParent = (rule, value, callback) => {
                if(value !== null && value !== undefined) {
                    let va = value.replace(/\s*/g, '')
                    if (va === '') {
                        callback(new Error(this.$t('pushsettings_index_507')));
                    }else{
                        callback();
                    }
                }else{
                    callback(new Error(this.$t('pushsettings_index_507')));
                }
            };
            const validatephone = (rule, value, callback) => {
                if(value !== null){
                    let va = value.replace(/\s*/g,'')
                    if (va === '') {
                        callback(new Error(this.$t('views_staff_components_lefttree_653')));
                    }else if (!/^(([0-9]+-|(\([0-9]+\))|(（[0-9]+）))[0-9]+)|([0|\+[0-9]{1,5})?([1][0-9]*)$/.test(value)) {
                        return callback(new Error(this.$t('views_staff_components_lefttree_654')))
                    } else{
                        callback();
                    }
                }else{
                    callback(new Error(this.$t('views_staff_components_lefttree_655')))
                }
            };
            return {
                parentNameForView: '',
                isLockOrgNum:false,//锁定机构编号
                isReWrite:false,
                reId:'',
                officeNameOnly:[],//限制机构名称不能重复
                itemId:'',
                formStatus:'',
                showAddOrg: false,
                orgName:'',
                showAddNextOrg:false,
                parentNameParams:{},
                disabledPar:false,
                codeStatus:false,
                countryList:[],
                provinceList:[],
                cityList:[],
                form:{
                    code:'',
                    name:'',
                    type:'',
                    orgTypeList:[],
                    parentName:'',
                    parentNameList:[],
                    latLongAddress:'',
                    address:'',
                    belongType:'',
                    belongTypeList:[],
                    regionList:[],
                    cityLevel:'',
                    accountName:'',
                    accountBank:'',
                    account:'',
                    phone:'',
                    remarks:'',
                    cityLevelList:[
                        {value:'1',label:this.$t('views_staff_components_lefttree_656')},
                        {value:'2',label:this.$t('views_staff_components_lefttree_657')},
                        {value:'3',label:this.$t('views_staff_components_lefttree_658')},
                        {value:'4',label:this.$t('views_staff_components_lefttree_659')},
                        {value:'5',label:this.$t('views_staff_components_lefttree_660')},
                    ]
                },
                ruleCustom:{
                    code:[{required:true, validator: validatePass, trigger: 'blur' }],
                    name:[{required:true, validator: validateParent, trigger: 'blur' }],
                    parentName:[{required:true, validator: validatePass, trigger: 'change' }],
                    belongType:[{required:true, validator: validatePass, trigger: 'change' }],
                    cityLevel:[{required:true, validator: validatePass, trigger: 'change' }],
                    // accountName:[{required:true, validator: validatePass, trigger: 'blur' }],
                    // accountBank:[{required:true, validator: validatePass, trigger: 'blur' }],
                    // account:[{required:true, validator: validatePass, trigger: 'blur' }],
                    // phone: [{required:true, validator: validatephone , trigger: 'blur' }],
                }
            }
        },
        mounted() {
            this.getFindByName()

        },
        methods: {
            ...mapMutations(['updateLoadingStatus']),
            getMap() {
                this.showAddOrg = true
                this.$refs.mapModel.modelShow();
            },
            mapOk(keyword, province, city, region, lng, lat) {
                this.showAddOrg = true
                this.form.address = keyword
                this.form.latLongAddress = lng+','+lat
                console.log(this.form.address,'900000')
            },


            getFindByName(){
                this.updateLoadingStatus({ isLoading: true });
                let params={
                    name: '',
                    level: 2
                }
                sys
                .findByName(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.countryList=res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
            },
            addOrg() {
                // alert('addOrg')
                this.handleReset('form')
                this.showAddOrg = true
                this.isReWrite = false
                this.orgName = this.$t('modules_orgtree_135')
                this.formStatus = this.$t('modules_orgtree_135')
                this.disabledPar = false
                this.codeStatus = false
                this.form.name = ''
                this.form.code = ''
                this.form.parentName = ''
                // typy默认设置为 校区
                // this.form.type = ''
                this.itemId = ''
                //获取父类集合
                sysUser
                .dataScopeFilter()
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let data = res.data.data;
                        this.form.parentNameList = []
                        for (let item in data) {
                            let obj = {};
                            let obj1 = data[item];
                            obj.id = obj1.id;
                            obj.value = obj1.name;
                            obj.label = obj1.name;
                            obj.name = obj1.name
                            this.form.parentNameList.push(obj)
                        }
                    }
                })
                .catch(errors.call(this));
                // sysOffice.officeList().then(valid.call(this)).then((res)=>{
                //     let com = res.data.data.allCompany
                //     this.form.parentNameList = []
                //     for(let item in com ){
                //         let obj = {}
                //         let comI = com[item]
                //         obj.type = comI.type
                //         obj.id = comI.id
                //         obj.remarks = comI.remarks
                //         obj.name = comI.name
                //         obj.parent = comI.parentId
                //         obj.value = comI.name
                //         obj.label = comI.name
                //         this.form.parentNameList.push(obj)
                //     }
                // }).catch(errors.call(this))
                sysDict.batchListData().then(valid.call(this)).then((res)=>{
                    if(res.ok){
                        let office = res.data.data.sys_office_type
                        let belong = res.data.data.sys_office_belong_type
                        let cityLevel = res.data.data.sys_office_city_level
                        this.form.orgTypeList = []
                        this.form.belongTypeList = []
                        this.form.cityLevelList = []
                        for(let item in office){
                            let obj = {}
                            let obj1 = office[item]
                            obj.value = obj1.value
                            obj.label = obj1.label
                            this.form.orgTypeList.push(obj)
                            // typy默认设置为 校区
                            if(obj.label  == '校区') this.form.type = obj.value;
                        }
                        for(let item in belong){
                            let obj = {}
                            let obj1 = belong[item]
                            obj.value = obj1.value
                            obj.label = obj1.label
                            this.form.belongTypeList.push(obj)
                        }
                        for(let item in cityLevel){
                            let obj = {}
                            let obj1 = cityLevel[item]
                            obj.value = obj1.value
                            obj.label = obj1.label
                            this.form.cityLevelList.push(obj)
                        }
                    }
                }).catch(errors.call(this))
            },
            addOrgNext(item) {
                // alert('addOrgNext')

                console.log(item)
                this.handleReset('form')
                this.parentNameForView = item.title
                this.showAddOrg = true
                this.isReWrite = false
                this.orgName = this.$t('modules_orgtree_121')
                this.formStatus = this.$t('modules_orgtree_121')
                this.form.parentName = ''
                // typy默认设置为 校区
                // this.form.type = ''
                this.itemId = ''
                this.form.parentNameList = []
                this.form.orgTypeList = []
                this.provinceList = []
                this.cityList = []
                let obj =[
                    {
                        value: item.id,
                        label: item.title
                    }
                ]
                this.form.parentNameList=obj;
                this.form.parentName = item.id
                this.parentNameParams.parent = item.id
                this.disabledPar = true
                this.codeStatus = false
                sysDict.batchListData().then(valid.call(this)).then((res)=>{
                    if(res.ok){
                        let office = res.data.data.sys_office_type
                        let belong = res.data.data.sys_office_belong_type
                        let cityLevel = res.data.data.sys_office_city_level
                        this.form.orgTypeList = []
                        this.form.belongTypeList = []
                        this.form.cityLevelList = []

                        for(let item in office){
                            let obj = {}
                            let obj1 = office[item]
                            obj.value = obj1.value
                            obj.label = obj1.label
                            this.form.orgTypeList.push(obj)
                            // typy默认设置为 校区
                            if(obj.label == '校区') this.form.type = obj.value;
                        }
                        for(let item in belong){
                            let obj = {}
                            let obj1 = belong[item]
                            obj.value = obj1.value
                            obj.label = obj1.label
                            this.form.belongTypeList.push(obj)
                        }
                        for(let item in cityLevel){
                            let obj = {}
                            let obj1 = cityLevel[item]
                            obj.value = obj1.value
                            obj.label = obj1.label
                            this.form.cityLevelList.push(obj)
                        }
                    }
                }).catch(errors.call(this))
                if(item.id){
                    //获取父类集合
                    sysOffice.listParentNamesById({id:item.id}).then(valid.call(this)).then((res)=>{
                        this.officeNameOnly = res.data.data
                    }).catch(errors.call(this))
                }
            },
            asyncCancel() {
                this.showAddOrg = false
                this.handleReset('form')
            },
            reWrite(item) {
                // alert('reWrite')

                this.updateLoadingStatus({isLoading: true});
                this.handleReset('form')
                this.isReWrite = true
                // 修改机构
                this.itemId = item.id
                this.showAddOrg = true
                this.codeStatus = true
                this.disabledPar = false
                this.orgName = this.$t('modules_orgtree_130')
                this.formStatus = this.$t('modules_orgtree_130')
                this.form.name = item.title
                this.parentNameParams.parent = item.parentId
                sysOffice.officeList().then(valid.call(this)).then((res)=>{
                    let com = res.data.data.allCompany
                    this.form.parentNameList = []
                    for(let item in com ){
                        let obj = {}
                        let comI = com[item]
                        obj.type = comI.type
                        obj.id = comI.id
                        obj.remarks = comI.remarks
                        obj.name = comI.name
                        obj.parent = comI.parentId
                        obj.value = comI.name
                        obj.label = comI.name
                        this.form.parentNameList.push(obj)
                    }
                }).catch(errors.call(this))
                sysDict.batchListData().then(valid.call(this)).then((res)=>{
                    if(res.ok){
                        let office = res.data.data.sys_office_type
                        let belong = res.data.data.sys_office_belong_type
                        let cityLevel = res.data.data.sys_office_city_level
                        this.form.orgTypeList = []
                        this.form.belongTypeList = []
                        this.form.cityLevelList = []
                        for(let item in office){
                            let obj = {}
                            let obj1 = office[item]
                            obj.value = obj1.value
                            obj.label = obj1.label
                            this.form.orgTypeList.push(obj)
                        }
                        for(let item in belong){
                            let obj = {}
                            let obj1 = belong[item]
                            obj.value = obj1.value
                            obj.label = obj1.label
                            this.form.belongTypeList.push(obj)
                        }
                        for(let item in cityLevel){
                            let obj = {}
                            let obj1 = cityLevel[item]
                            obj.value = obj1.value
                            obj.label = obj1.label
                            this.form.cityLevelList.push(obj)
                        }
                    }
                }).catch(errors.call(this))
                if(item.id){
                    //获取父类集合
                    sysOffice.listParentNamesById({id:item.id}).then(valid.call(this)).then((res)=>{
                        this.officeNameOnly = res.data.data
                        if(this.officeNameOnly.includes(this.form.name)){
                            let index = this.officeNameOnly.indexOf(this.form.name)
                            this.officeNameOnly.splice(index,1)
                        }
                    }).catch(errors.call(this))
                    sysOffice.officeForm({
                        id:item.id
                    })
                    .then(valid.call(this)).then((res)=>{
                        if(res.ok){
                            let data = res.data.data
                            // console.log(data)
                            this.parentNameParams.parent = data.parentId
                            this.form.code = data.code
                            // this.form.address = data.address ? data.address : ''
                            this.isLockOrgNum = (this.form.code === '' || this.form.code === null)? false : true
                            this.form.name = data.name
                            this.form.parentName = data.parentName ? data.parentName : ''
                            this.form.type = data.type
                            this.form.belongType = data.belongType? data.belongType : ''
                            this.form.cityLevel = data.cityLevel? data.cityLevel : ''
                            this.form.phone = data.phone
                            this.form.remarks = data.remarks
                            this.form.latLongAddress = data.latLongAddress
                            this.form.address = data.address
                        }
                    }).catch(errors.call(this))
                    htRecepitAccount.formByOfficeId({officeId:item.id})
                    .then(valid.call(this)).then((res)=>{
                        if(res.ok){
                            let data = res.data.data
                            if(data){
                                this.form.accountName = data.accountName
                                this.form.accountBank = data.accountBank
                                this.form.account = data.account
                                this.reId = data.id
                            }
                        }
                    }).catch(errors.call(this))
                    .finally(()=>{
                        this.updateLoadingStatus({isLoading:false});
                    });
                } else{
                    return false
                }
            },
            asyncButton() {
                if(this.formStatus === this.$t('modules_orgtree_135')){
                    this.handleSubmit('form',"add")
                } else if(this.formStatus === this.$t('modules_orgtree_121')) {
                    this.handleSubmit('form',"add")
                }else if(this.formStatus === this.$t('modules_orgtree_130')) {
                    this.handleSubmit('form',"re")
                }
            },
            handleSubmit (name,type) {
                if(this.officeNameOnly.length &&  !this.officeNameOnly.includes(this.form.name) || !this.officeNameOnly.length){
                    this.$refs[name].validate((valid1) => {
                        if(valid1){
                            let params = {}
                            params.id = this.itemId
                            params.code = this.form.code
                            params.name = this.form.name
                            params.type = this.form.type ? this.form.type : ''
                            // params.address = this.form.address
                            params.parentId = this.parentNameParams.parent
                            params.address = this.form.address
                            params.latLongAddress = this.form.latLongAddress
                            params.belongType = this.form.belongType
                            params.cityLevel = this.form.cityLevel
                            params.phone = this.form.phone
                            params.remarks = this.form.remarks
                            sysOffice.saveOffice(params).then(valid.call(this)).then((res)=>{
                                if(res.ok && res.data.data){
                                    if(!this.hide){ //租户向导中需隐藏
                                        let params1= {}
                                        params1.accountName = this.form.accountName
                                        params1.accountBank = this.form.accountBank
                                        params1.account = this.form.account
                                        params1.officeId = res.data.data
                                        params1.name = this.form.name
                                        params1.comanyName = this.form.name
                                        if(type === 'add'){
                                            delete params1.id
                                        }else{
                                            params1.id = this.reId
                                        }
                                        htRecepitAccount.save(params1).then(valid.call(this)).then((res)=>{
                                            if(res.ok){
                                                this.showAddOrg = false
                                                if(type === 'add'){
                                                    this.$Message.success({content:this.$t('views_staff_components_lefttree_665'),duration:1});
                                                    this.$emit('fa-get-list')
                                                }else{
                                                    this.$Message.success({content:this.$t('views_staff_components_lefttree_666'),duration:1});
                                                    this.$emit('fa-get-list')
                                                }
                                                this.officeNameOnly = ''
                                                this.$refs[name].resetFields();
                                            }
                                        }).catch(errors.call(this))
                                    }else{
                                        this.showAddOrg = false
                                        if(type === 'add'){
                                            this.$Message.success({content:this.$t('views_staff_components_lefttree_665'),duration:1});
                                            this.$emit('fa-get-list')
                                        }else{
                                            this.$Message.success({content:this.$t('views_staff_components_lefttree_666'),duration:1});
                                            this.$emit('fa-get-list')
                                        }
                                        this.officeNameOnly = ''
                                        this.$refs[name].resetFields();
                                    }
                                }
                            }).catch(errors.call(this))
                        }
                    })
                }else{
                    this.$Message.warning({content:this.$t('views_staff_components_lefttree_667'),duration:2});
                }
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            parentNameFn(value) {
                //获取父类集合
                let obj = this.form.parentNameList;
                for(let i in obj){
                    if(obj[i].name === value){
                        this.parentNameParams.parent = obj[i].id
                    }
                }
                if(this.parentNameParams.parent){
                    sysOffice.listParentNamesById({id:this.parentNameParams.parent}).then(valid.call(this)).then((res)=>{
                        this.officeNameOnly = res.data.data
                    }).catch(errors.call(this))
                }
            },
        },
        watch:{

        }
    }
</script>
