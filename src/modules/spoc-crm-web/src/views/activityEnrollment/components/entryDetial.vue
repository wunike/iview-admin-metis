<style lang="less">
/*.ivu-modal-body{*/
/*    padding-bottom:4px;*/
/*}*/
.ed-box{
    .mark-line {
        width: 100%;
        height: 24px;
        display: flex;
        flex-direction: row;
        align-items: center;
        position: relative;
        margin-top:24px;
        .line {
            height: 1px;
            width: 100%;
            background: #d9d9d9;
        }
        span {
            position: absolute;
            top: 3px;
            left: 24px;
            z-index: 2;
            padding: 0 10px;
            background: #fff;
            font-size: 14px;
            color: #495060;
        }
    }
    .stu-info,
    .links,
    .ads-info {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }
    .links-title,
    .links-sp {
        margin-top: 20px;
        margin-bottom: 18px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        span {
            display: inline-block;
            width: 110px;
            font-size: 14px;
            font-weight: normal;
            color: #495060;
            text-align: right;
        }
        b {
            font-size: 14px;
            font-weight: normal;
            color: rgba(73, 80, 96, 1);
            display: inline-block;
            width: calc(~'100% - 110px');
        }
    }
    .links-sp {
        margin-top: 0px;
        margin-bottom: 18px;
        span {
            color: #999;
        }
    }
    .link-btn {
        display: inline-block;
        font-size: 12px;
        font-weight: normal;
        color: rgba(73, 80, 96, 1);
        padding: 6px 12px;
        background: rgba(235, 236, 240, 1);
        border-radius: 4px;
        margin-right: 6px;
        margin-bottom: 6px;
        font-style: normal;
    }
    .common {
        .comstyle {
            margin-bottom: 18px;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: flex-start;
            span {
                display: inline-block;
                min-width: 110px;
                width: 110px;
                font-size: 14px;
                font-weight: normal;
                color: rgba(153, 153, 153, 1);
                text-align: right;
            }
            b {
                display: inline-block;
                /*width: 110px;*/
                font-size: 14px;
                font-weight: normal;
                color: rgba(73, 80, 96, 1);
            }
        }
        .left {
            width: 55%;
            div {
                .comstyle;
            }
        }
        .right {
            width: 45%;
            div {
                .comstyle;
            }
        }
    }
}

</style>
<template>
    <div class="ed-box">
        <div class="mark-line" style="">
            <span v-if="showLine == '1'">{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_entrydetial_707', [dataObj.cusCode])}}</span>
            <span v-else>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_entrydetial_708')}}</span>
            <div class="line"></div>
        </div>
        <div>
            <div class="stu-info common" style="margin-top:20px;">
                <div class="left">
                    <div>
                        <span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_entrydetial_709')}}</span>
                        <b>{{ dataObj.name ? dataObj.name : '-' }}</b>
                    </div>
                    <div>
                        <span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_entrydetial_710')}}</span>
                        <b v-for="(item, index) in dataObj.phoneList" :key="index">
                            {{ item.starPhone }}
                            <em v-if="index < dataObj.phoneList.length - 1">,</em>
                        </b>
                    </div>
                    <div>
                        <span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_entrydetial_711')}}</span>
                        <b>{{ area }}</b>
                    </div>
                    <div>
                        <span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_entrydetial_712')}}</span>
                        <b>{{ dataObj.sourceList ? first + ' / ' + second + ' / ' + third : '-' }}</b>
                    </div>
                </div>
                <div class="right">
                    <div>
                        <span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_entrydetial_713')}}</span>
                        <b>{{ dataObj.wechat ? dataObj.wechat : '-' }}</b>
                    </div>
                    <div>
                        <span>QQ：</span>
                        <b>{{ dataObj.qq ? dataObj.qq : '-' }}</b>
                    </div>
                    <div>
                        <span>E-mail：</span>
                        <b>{{ dataObj.email ? dataObj.email : '-' }}</b>
                    </div>
                    <div>
                        <span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_entrydetial_714')}}</span>
                        <b>{{ dataObj.address ? dataObj.address : '-' }}</b>
                    </div>
                </div>
            </div>
            <div class="links-sp">
                <span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_entrydetial_715')}}</span>
                <b v-if="selectTags.length">
                    <em class="link-btn" v-for="(item, index) in selectTags" :key="index">{{ item }}</em>
                </b>
				<b v-else>-</b>
            </div>
            <div class="links-sp">
                <span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_entrydetial_716')}}</span>
                <b>{{ dataObj.remarks ? dataObj.remarks : '-' }}</b>
            </div>
        </div>
        <div class="mark-line" v-if="!(stuId&&showLine=='1')">
            <span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_entrydetial_717')}}</span>
            <div class="line"></div>
        </div>
        <div style="margin-top:20px;" v-if="!(stuId&&showLine=='1')">
            <div class="links common" v-if="dataObj.additionInfo">
                <div class="left">
                    <div>
                        <span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_entrydetial_718')}}</span>
                        <b>{{ dataObj.additionInfo.enName ? dataObj.additionInfo.enName : '-' }}</b>
                    </div>
                    <div>
                        <span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_entrydetial_719')}}</span>
                        <b>{{ dataObj.additionInfo.birthday ? dataObj.additionInfo.birthday : '-' }}</b>
                    </div>
                    <div>
                        <span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_entrydetial_720')}}</span>
                        <b>{{ dataObj.additionInfo.schoolType ? schoolTypeName : '-' }}</b>
                    </div>
                </div>
                <div class="right">
                    <div>
                        <span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_entrydetial_721')}}</span>
                        <b>{{ dataObj.additionInfo.gender ? (dataObj.additionInfo.gender == 'm' ? $t('modules_spoc_crm_web_src_views_activityenrollment_components_entrydetial_722') : $t('modules_spoc_crm_web_src_views_activityenrollment_components_entrydetial_723')) : '-' }}</b>
                    </div>
                    <div>
                        <span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_entrydetial_724')}}</span>
                        <b>{{ dataObj.additionInfo.schoolGrade ? schoolGradeName : '-' }}</b>
                    </div>
                    <div>
                        <span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_entrydetial_725')}}</span>
                        <b>{{ dataObj.additionInfo.school ? dataObj.additionInfo.school : '-' }}</b>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import valid, { errors, common, sysDict, crmCustomer } from '../../../libs/request';
export default {
    props:{
        showLine:{
            type:'String',
        },
        id:{
            type:'String',
            default:''
        },
        stuId:{
            type:'String',
            default:''
        },
    },
    data() {
        return {
            dataObj: {},
            tags: [],
            selectTags: [],
            area: '',
            schoolGradeList: [],
            schoolTypeList: [],
            referralList: [],
            schoolGradeName: '',
            schoolTypeName: '',
            first: '-',
            second: '-',
            third: '-'
        };
    },
    mounted() {
        this.getReferralList()//获取学校年级，学校类型
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        getReferralList(){
            let params={
                types: 'referral offline,com_student_school_grade,com_student_school_type',
            }
            sysDict
            .batchListData(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.referralList=res.data.data['referral offline'];
                    this.schoolGradeList=res.data.data['com_student_school_grade'];
                    this.schoolTypeList=res.data.data['com_student_school_type'];
                    // console.log(this.schoolGradeList)
                }
            })
            .catch(errors.call(this))
            .finally(() => {
                this.updateLoadingStatus({ isLoading: false });
            });
        },
        selectTagsFn() {
            // console.log(this.tags)
            // console.log(this.dataObj.tags)
            this.selectTags = [];
            if (this.dataObj.tags !== null) {
                if (this.tags.length > 0 && this.dataObj.tags.length > 0) {
                    this.tags.forEach(item => {
                        this.dataObj.tags.forEach(i => {
                            if (i == item.id) {
                                // console.log(i)
                                this.selectTags.push(item.title);
                            }
                        });
                    });
                }
            }
            this.$emit('sendTagsName',this.selectTags);
        },
        batchListDataFn(val,value,bfValue) {
            let types;
            if (val) {
                types = bfValue;
            } else {
                types = "crm_customer_source";
            }
            sysDict
            .batchListData({
                types
            })
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    if (val == 1) {
                        let second =
                            res.data.data[types];
                        // console.log(second,value)
                        for(let i in second){
                            if(second[i].value == value){
                                this.second = second[i].label
                            }
                        }
                    } else if (val == 2) {
                        let third =
                            res.data.data[types];
                        // console.log(third,value)
                        for(let i in third){
                            if(third[i].value == value){
                                this.third = third[i].label
                            }
                        }
                    } else {
                        let first =
                            res.data.data.crm_customer_source;
                        // console.log(first,value)
                        for(let i in first){
                            if(first[i].value == value){
                                this.first = first[i].label
                            }
                        }
                    }
                }
            })
            .catch(errors.call(this))
            .finally(() => {
                this.updateLoadingStatus({ isLoading: false });
            });
        },
        returnTags(obj) {
            if (obj.length) {
                obj.forEach(item => {
                    this.tags.push({ id: item.id, title: item.title });
                    if (item.children.length > 0) {
                        this.returnTags(item.children);
                    }
                });
            }
        },
        getBuildTree() {
            this.tags = [];
            let obj = {
                // menuId: this.menuId,
                // flag: this.flag,
                menuId: '2001',
                flag: '0'
            };
            common
                .buildTree(obj)
                .then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.returnTags(res.data.data.children)
                        this.selectTagsFn()

                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
        },
        getFormFn(id) {
            if (id) {
                this.updateLoadingStatus({ isLoading: true });
                let params = {
                    id: id
                    // id: 'ea2fe0f620fd404b9b146a9a7a477fee',
                };
                crmCustomer
                    .form(params)
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            this.dataObj = res.data.data;
                            // console.log(this.dataObj)
                            this.getBuildTree()//获取所有标签
                            this.getArea()
                            this.getSchoolGrade()
                            this.getSchoolType()
                            this.batchListDataFn(0,this.dataObj.sourceList[0])
                            this.batchListDataFn(1,this.dataObj.sourceList[1],this.dataObj.sourceList[0])
                            this.batchListDataFn(2,this.dataObj.sourceList[2],this.dataObj.sourceList[1])
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {
                        this.updateLoadingStatus({ isLoading: false });
                    });
            }
        },
        getSchoolGrade() {
            if (this.dataObj.additionInfo !== null && this.dataObj.additionInfo.schoolGrade !== null) {
                this.schoolGradeList.forEach(item => {
                    if (item.value === this.dataObj.additionInfo.schoolGrade) {
                        this.schoolGradeName = item.label;
                    }
                });
            }
        },
        getSchoolType() {
            if (this.dataObj.additionInfo !== null && this.dataObj.additionInfo.schoolType !== null) {
                this.schoolTypeList.forEach(item => {
                    if (item.value === this.dataObj.additionInfo.schoolType) {
                        this.schoolTypeName = item.label;
                    }
                });
            }
        },
        getArea() {
            let country = this.dataObj.districtEntity.countryName ? this.dataObj.districtEntity.countryName : '-';
            let province = this.dataObj.districtEntity.provinceName ? this.dataObj.districtEntity.provinceName : '-';
            let city = this.dataObj.districtEntity.cityName ? this.dataObj.districtEntity.cityName : '-';
            this.area = country + '/' + province + '/' + city;
        }
    }
};
</script>
