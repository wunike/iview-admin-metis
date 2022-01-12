<style lang="less">
.leads_info_wrap {
    padding: 0px 24px 30px;
    .leads_info_title {
        font-size: 16px;
        font-weight: 500;
        color: rgba(73, 80, 96, 1);
        line-height: 22px;
        padding-bottom: 10px;
    }
    .ivu-form-item-label{
        font-size:14px;
        font-weight:normal;
        color:rgba(153,153,153,1);
    }
    .ivu-form-item-content{
        font-size:14px;
        font-weight:normal;
        color:rgba(73,80,96,1);
        line-height: 32px;
    }
    .ivu-form{
        .ivu-form-item{
            margin-bottom: 0;
        }
    }
}
</style>

<template>
    <div class="leads_info_wrap">
        <div class="leads_info_title">{{$t('modules_spoc_crm_web_src_modules_leadsinfo_484')}}</div>
        <Form :label-width="110" label-colon>
            <div v-if="sysFieldJson.length&&leadsInfo.additionInfo" style="margin-bottom: 16px;">
                <Row>
                    <Col span="12">
                        <FormItem prop="name" :label="formItemName('name')" v-if="formItemshow('name')">
                            {{leadsInfo.name||''}}
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem  prop="additionInfo.enName" :label="formItemName('enName')" v-if="formItemshow('enName')">
                            {{leadsInfo.enName||''}}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <!-- <FormItem prop="phoneList" required> -->
                            <!-- <div:style="index!=leadsInfo.phoneList.length-1?'margin-bottom:14px;':''"> -->
                                <FormItem :label="index==0?formItemName('phoneList'):''" :prop="'phoneList.'+index+'.phone'" v-for="(phoneItem, index) in leadsInfo.phoneList" :key="'phoneList'+index" v-if="formItemshow('phoneList')">
                                {{phoneItem.starPhone||''}}
                                </FormItem>
                            <!-- </div> -->
                        <!-- </FormItem> -->
                    </Col>
                    <Col span="12">
                        <FormItem  prop="additionInfo.gender" :label="formItemName('gender')" v-if="formItemshow('gender')">
                            {{getGender}}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem prop="districtEntity" :label="formItemName('districtEntity')" v-if="formItemshow('districtEntity')">
                            <div>
                                {{leadsInfo.districtEntity.countryName||''}} <sapn v-if="leadsInfo.districtEntity.provinceName">-></sapn> {{leadsInfo.districtEntity.provinceName||''}} <sapn v-if="leadsInfo.districtEntity.cityName">-></sapn> {{leadsInfo.districtEntity.cityName||''}} <sapn v-if="leadsInfo.districtEntity.areaName">-></sapn> {{leadsInfo.districtEntity.areaName||''}}
                            </div>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem  prop="birthday" :label="formItemName('birthday')" v-if="formItemshow('birthday')">
                            {{leadsInfo.birthday||''}}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem prop="sourceList" :label="formItemName('sourceList')" v-if="formItemshow('sourceList')">
                            <!-- <Row type="flex" justify="space-between">
                                <Col span="24"> -->
                                    <!-- <Select transfer v-model="leadsInfo.sourceList[0]" clearable @on-change="sourceChange(1,$event)" :disabled="$route.query.isTransferIntro=='1'">
                                        <Option :value="item.value" v-for="item in sourceList[0]" :key="item.id" v-if="isShowSource(item)">{{item.label}}</Option>
                                    </Select> -->
                                        <!-- <Cascader :data="sourceList" :placeholder="$t('modules_spoc_crm_web_src_modules_leadsinfo_485')+formItemName('sourceList')" transfer filterable clearable v-model="leadsInfo.sourceList" :disabled="$route.query.isTransferIntro=='1'"></Cascader> -->
                                        {{getSourceStr}}

                                <!-- </Col>
                            </Row> -->
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem prop="wechat" :label="formItemName('wechat')" v-if="formItemshow('wechat')">

                            {{leadsInfo.wechat||''}}
                        </FormItem>
                    </Col>
                </Row>
                <Row v-if="leadsInfo.sourceList[0]=='referral'">
                    <Col span="12">
                        <FormItem prop="referral.referralType" :label="$t('modules_spoc_crm_web_src_modules_leadsinfo_486')">
                            {{referral}}
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem prop="referral.referraler" :label="$t('modules_spoc_crm_web_src_modules_leadsinfo_487')">
                            {{referraler}}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem prop="qq" :label="formItemName('qq')" v-if="formItemshow('qq')">
                            {{leadsInfo.qq||''}}
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem prop="address" :label="formItemName('address')" v-if="formItemshow('address')">
                            {{leadsInfo.address||''}}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem prop="email" :label="formItemName('email')" v-if="formItemshow('email')">
                            {{leadsInfo.email||''}}
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem :label="$t('modules_spoc_crm_web_src_modules_leadsinfo_488')">
                            {{selectOffice}}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem :label="$t('modules_spoc_crm_web_src_modules_leadsinfo_489')">
                            {{shcool}}
                        </FormItem>
                    </Col>
                <!--</Row>
                <Row> -->
                    <Col span="12">
                        <FormItem prop="remarks" :label="formItemName('remarks')" v-if="formItemshow('remarks')">
                            {{leadsInfo.remarks||''}}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem prop="tags" :label="$t('modules_spoc_crm_web_src_modules_leadsinfo_490')">
                            <div class="userTargetInner">
                                <span v-for="item in getTagsName" :key="item">{{item}}</span>
                            </div>
                        </FormItem>
                    </Col>
                </Row>
            </div>
            <div class="other_leads_info">
                <div class="leads_info_title">{{$t('modules_spoc_crm_web_src_modules_leadsinfo_491')}}</div>
                <Row v-if="batchListDataFinished">
                    <Col span="12" v-for="(item,index) in ugcFieldJson" :key="item.field+index">
                        <FormItem prop="email" :label="item.name">
                            {{ugcFieldContent(item)}}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        </Form>
    </div>
</template>

<script>
import valid, { errors, sys, sysUser, common, sysDict, crmCustomer, sysCommonSql, crmActivity, sysProps } from '../libs/request.js';
import { mapMutations, mapState } from 'vuex';
export default {
    props: {
        id: {
            type: String,
            default: ''
        },
        stuId: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            ugcFieldJson: [],
            sysFieldJson: [],
            leadsInfo: {},
            referralerList:[],
            referralList:[],
            sourceList:[],
            typeMap:[],
            listDataMap:{},
            batchListDataFinished:false,
            tagList:[],
            officeList:[],
            schoolList:[],
        };
    },
    components: {
    },
    computed: {
        referraler() {
            let info=this.referralerList.find(v=>v.id==this.leadsInfo.referral.referraler)
            if(info){
                return `${info.name}（${info.phone}）`;
            }else{
                return '';
            }
        },
        selectOffice(){
            let info=this.officeList.find(v=>v.id==this.leadsInfo.selectOfficeId);
            if(info){
                return info.name||'';
            }else{
                return '';
            }
        },
        shcool(){
            let info=this.schoolList.find(v=>v.id==this.leadsInfo.schoolId);
            if(info){
                return info.name||'';
            }else{
                return '';
            }
        },
        referral(){
            console.log(this.referralList,this.leadsInfo.referral.referralType,123)
            let info=this.referralList.find(v=>v.value==this.leadsInfo.referral.referralType);
            if(info){
                return info.label||'';
            }else{
                return '';
            }
        },
        getGender(){
            if(this.leadsInfo.gender!='m'){
                return this.$t('views_staff_components_staffinfo_671');
            }else{
                return this.$t('views_staff_components_staffinfo_670');
            }
        },
        getSourceStr(){
            let valArr=this.leadsInfo.sourceList;
            if(valArr&&valArr.length&&this.sourceList.length){
                let sourceInfo=[];
                let sourceObj = this.sourceList;
                valArr.forEach((v,k)=>{
                    if(sourceObj.find(val=>val.value==v)){
                        sourceInfo.push(sourceObj.find(val=>val.value==v).label);
                        sourceObj=sourceObj.find(val=>val.value==v).children;
                    }
                })
                console.log(sourceInfo)
                return sourceInfo.join('/');
            }else{
                return '';
            }
        },
        getTagsName(){
            let tagIds=this.leadsInfo.tags;
            if(tagIds&&tagIds.length&&this.tagList){
                let tagsName = this.tagList.filter(v=>tagIds.indexOf(v.id)!=-1).map(v=>v.title);
                return tagsName;
            }else{
                return ['']
            }
        }
    },
    mounted() {
        this.getFormFn();
        this.getReferralList();
        this.getcustomerList();
        this.getSource();
        this.getTags();
        this.getOfficeList();
        this.getSchoolList();
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        getSchoolList(){
                let params={
                    name:''
                }
                common
                .comSchoolListName(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                      this.schoolList = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                });
        },
        getOfficeList(){
            sysUser
            .dataScopeFilter()
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                  this.officeList = res.data.data;
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },
        getTags() {
            let params = {
                menuId: 2001,
                flag: 0
            };
            common
                .buildTree(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let list = res.data.data.children;
        				let arr=[]
                        list.forEach(v => {
                            v.children.forEach(val => {
                                val.leadsTagSort = parseFloat(9999 - v.sort + '.' + (9999 - val.sort));
        						arr.push(val)
                            });
                        });
                        this.tagList = arr;
                        console.log(this.tagList,2222222222)
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
        },
        getFormFn() {
            this.updateLoadingStatus({ isLoading: true });
            let params = {
                id: this.id
            };
            crmCustomer
                .form(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.leadsInfo = res.data.data;
                        if(this.leadsInfo.referral.referralerName){
                            this.referralerSearch(this.leadsInfo.referral.referralerName||'');
                        }
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        getcustomerList() {
            let params = {
                tableName: 'crm_customer'
            };
            sysProps
                .list(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.ugcFieldJson = res.data.data.filter(v => {
                            return v.category == 'ugcField' && (v.base == '1' || v.editable == '1');
                        });
                        this.sysFieldJson = res.data.data.filter(v => {
                            return v.category == 'sysField';
                        });
                        let type=this.ugcFieldJson.filter(v=>!!v.dictType);
                        this.typeMap=type;
                        this.getReferralList(type);
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
        },
        referralerSearch(query){
            let params={
                "searchField":"name",
                "searchFieldParam":query,
            };
            if(this.leadsInfo.referral.referralType=='Student Referral'){
                params.mainTable='com_student'
                params.field1='phone'
            }else if(this.leadsInfo.referral.referralType=='Non-Student Referral'){
                params.mainTable='crm_customer'
                params.field1='star_phone'
            }else{
                params.mainTable='sys_user'
                params.field1='mobile'
            }
            sysCommonSql
            .querySingleTableData(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.referralerList=res.data.data;
                }
            })
            .catch(errors.call(this))
            .finally(() => {
            });
        },
        getReferralList(type){
            let types='';
            if(type){
                let typeStr=type.map(v=>v.dictType).join(',');
                types='referral referral,'+typeStr;
            }else{
                types='referral referral';
            }
            let params={
                types
            }
            sysDict
            .batchListData(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    if(type){
                        type.forEach(v=>{
                            this.$set(this.listDataMap,v.dictType,res.data.data[v.dictType]);
                        })
                        this.$nextTick(()=>{
                            this.batchListDataFinished=true;
                        })
                    }else{
                        this.referralList=res.data.data['referral referral'];
                        console.log(res.data.data,123123)
                    }
                }
            })
            .catch(errors.call(this))
            .finally(() => {
            });
        },
        getSource(){
            let params={
                type: 'crm_customer_source',
            }
            sysDict
            .getTypeTree(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.sourceList=res.data.data.children;
                }
            })
            .catch(errors.call(this))
            .finally(() => {
            });
        },
        formItemName(_key){
            return this.sysFieldJson.find(v=>v.field==_key).name;
        },
        formItemshow(_key){
            return this.sysFieldJson.find(v=>v.field==_key).base=='1';
        },
        ugcFieldContent(item){
            let getLabel=(arr,searchArr,item)=>{
                if(searchArr.length){
                    let info=arr.children.find(v=>v.value==searchArr[0])
                    if(info){
                        searchArr.splice(0,1)
                        if(info.children&&info.children.length&&searchArr.length){
                            return [...item,...getLabel(info.children,searchArr,item)]
                        }else{
                            return [info.label]||['']
                        }
                    }
                }
            }
            let info=null;
            if(this.leadsInfo.fieldJsonData){
                info=this.leadsInfo.fieldJsonData[item.field];
            }
            if(info&&item.isObjField=='1'){
                return info[Object.keys(info)[0]]||'';
            }else if(info&&item.dictType){
                if(Array.isArray(info)){
                    let datas=this.listDataMap[item.dictType];
                    if(datas&&datas.children){
                        return getLabel(datas,info,[]).join(' -> ')||'';
                    }else if(datas){
                        return datas.filter(v=>info.indexOf(v.value)!=-1).map(v=>v.label).join('、')||'';
                    }else{
                        return this.$t('modules_spoc_crm_web_src_modules_leadsinfo_494')
                    }
                }else{
                    return this.listDataMap[item.dictType].find(v=>v.value==info).label||'';
                }

            }else{
                return info||'';
            }
        }
    }
};
</script>
