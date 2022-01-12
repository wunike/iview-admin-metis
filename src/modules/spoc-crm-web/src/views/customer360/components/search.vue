<style lang="less">
.school-timet-search-container{
    padding: 20px 32px;
    background: #fff;
    .fl{
        float: left;
    }
    .line-top{
        @h: 26px;
        position: relative;
        height: @h;margin-bottom: 20px;
        .date{
            float: left;line-height: @h;margin-right: 16px;height: @h;
            font-size: 14px;width: 170px;
        }
        .page{
            float: left;
            .ivu-btn{
                padding: 0;
                height: @h;
                line-height: 0;
                ;margin-right: 4px;
                font-size: 14px;
                & > span{
                    vertical-align: baseline;
                }
            }
            .ivu-icon{
                font-size: 38px;transform: rotateX(60deg);
                line-height: 0;
            }
        }
    }
    .v-search-collapse-container{
        padding: 0;
        .v-show-more-selects{
            top: 0;
        }
    }
    // date
    .ivu-input-suffix{
        display: none;
    }
    .ivu-date-picker.date{
        position: absolute;left: 0;top: 0;z-index: 99;
        line-height: normal;
    }
    .ivu-input-with-suffix{
        opacity: 0;
        @h: 26px;
        padding: 0;height: @h;
        border: none;
        &.ivu-input:focus{
            border: none;box-shadow: none;
        }
        &.ivu-input:hover{
            border: none;
        }
    }
    
}
</style>
    
<template>
<div class="school-timet-search-container">
    <div class="line-top">
        <DatePicker class="date" 
            :type="datePickerType" 
            :value="datePickerVal" 
            format="yyyy-MM-dd" 
            @on-change="changeDate">
        </DatePicker>
        <span class="date" v-text="date"></span>
        <div class="page">
            <Button @click.stop="prev"><Icon type="md-arrow-dropleft" /></Button>
            <Button :disabled="isCurrent" @click.stop="getCurrentLists" style="width: 80px;">{{$t('modules_spoc_crm_web_src_views_customer360_components_search_857')}}</Button>
            <Button @click.stop="next"><Icon type="md-arrow-dropright" /></Button>
        </div>
    </div>
    <v-search-collapse @search="getListTeacher" @reset="resetSearchTeacher" v-if="from == 'teacher'">
        <Select v-model="officeId" style="width:224px" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_search_858')" @on-change="changeCourseOwner">
            <Option v-if="item" v-for="item in officeIdList" :value="item.officeId" :key="item.officeId">{{ item.officeCode }}{{ item.officeName }}</Option>
        </Select>
        <Select ref="resetSelect"
            filterable
            remote
            :loading="teacherLoading"
            :remote-method="teacherRemote"
            :placeholder="$t('courselist_12')"
            v-model="teacherId"
            clearable>
            <Option v-for="item in teacherList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
        <Select v-model="type" :placeholder="$t('messagemanagement_index_346')" clearable @on-change="changeType">
            <Option v-if="item" :value="item.value" v-for="(item, index) in jw_course_type" :key="index">{{item.label}}</Option>
        </Select>
        <Select v-model="grade" :placeholder="$t('messagemanagement_index_347')" clearable>
            <Option v-if="item" :value="item.value" v-for="(item, index) in jw_course_type_child" :key="index" v-show="type == item.type">{{item.label}}</Option>
        </Select>
    </v-search-collapse>
    <slot></slot>
</div>
</template>

<script>

import vSearchCollapse from '@public/modules/vSearchCollapse';
import { waitUntil } from '@public/libs/util.js';
import valid, { 
    errors, 
    sys, 
    common,
    sysDict, 
    sysUser, 
} from "../../../libs/request";
import { mapMutations, mapState } from "vuex";
import { MENUIDS } from '@public/libs/config';

export default {
    props: {
        date: {
            type: String,
            required: true,
        },
        from: {
            type: String,
            default: 'class', // 默认是教室课表：class，教师课表：teacher，手工签到：signIn
        },
        isCurrent: { // 是否是本周
            type: Boolean,
            default: true,
        },
        datePickerVal: {
            type: [String, Array],
            required: true,
        },
        id: {
            type: String,
            required: true
        }
    },
    data(){
        return {
            studentId: '',
            studentList: [],
            teacher: [],
            teacherList: [],// 教师列表
            jw_course_type: [], //分类
            jw_course_type_child: [],
            officeIdList: [],
            officeId: '', //校区
            teacherType: '', //老师类型
            teacherTypeCopy: '', //老师类型
            type: '', //分类
            grade: '', //年级
            pId: null,
            teacherId: '',
            datePickerType: 'daterange',
            teacherLoading: false,
        };
    },
    computed: {
        ...mapState(["userInfo", "app"]),
    },
    components: {
        vSearchCollapse
    },
    created() {
        this.pId = MENUIDS.CRM;
    },
    mounted() {
        this.dataScopeFilter();
        this.baseData();
        waitUntil (()=>{
            return !!(this.officeId);
        },()=>{
            this.$emit('initLists', this.officeId);
        });
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        uploadListsData(val) {
            // console.log(val)
            this.officeId = val;
            this.resetSearchTeacher();
        },
        prev() {
            // 日期 prev
            this.$emit('prev');
        },
        next() {
            // 日期 next
            this.$emit('next');
        },
        getCurrentLists() {
            // 本周
            this.$emit('getCurrentLists');
        },
        changeCourseOwner() {
            // 修改校区 - 获取教师列表
            this.$emit('initLists', this.officeId);
        },
        baseData() {
			let types = 'jw_course_type'
			sysDict.batchListData({
				types
			})
			.then(valid.call(this))
			.then(res => {
				if (res.ok) {
					this.jw_course_type = res.data.data.jw_course_type
				}
			})
            .catch(errors.call(this));
            
            let type = 'jw_course_type'
			sysDict.findChildDictByParentDict({
				type
			})
			.then(valid.call(this))
			.then(res => {
				if (res.ok) {
					this.jw_course_type_child = res.data.data
				}
			})
			.catch(errors.call(this))
        },
        changeType() {
            this.grade = ''
        },
        dataScopeFilter() {
            // 获取校区列表
            common.comStudentFindStudentOffice({
				studentId: this.id
			})
			.then(valid.call(this))
			.then(res => {
				if (res.ok) {
                    this.officeIdList = res.data.data;
                    // waitUntil (()=>{
                    //     return !!this.app.currOfficeId;
                    // },()=>{
                    //     this.officeId = this.app.currOfficeId;
                    // });
                    if(this.officeIdList && this.officeIdList.length) this.officeId = this.officeIdList[0].officeId;
				}
			})
			.catch(errors.call(this));
        },
        getListTeacher() {
            // 搜索
            let params = {
                type: this.type,
                grade: this.grade,
                teacherId: this.teacher.length ? this.teacher.join() : '',
                officeId: this.officeId,
            }
            this.$emit('search', params);
        },
        resetSearchTeacher() {
            // 清空
            this.initOfficeIdAndTeacherLists();
            this.type = '';
            this.grade = '';
            this.teacher = [];
            let params = {
                type: this.type,
                grade: this.grade,
                teacherId: '',
                officeId: this.officeId,
            }
            this.$emit('search', params);
            this.$refs.resetSelect.clearSingleSelect();
        },
        initOfficeIdAndTeacherLists() {
            // waitUntil (()=>{
            //     return !!this.app.currOfficeId;
            // },()=>{
            //     this.officeId = this.app.currOfficeId;
            // });
        },
        changeDate(e) {
            // console.log(e)
            this.$emit('onChangeDate', e);
        },
        teacherRemote(query) {
            this.getSearchList(9, query);
        },
        getSearchList(userType, query) {
            this.teacherLoading = true;
            let obj = {
                roleIds: userType,
                pageSize: 10,
                pageNo: 1,
                isService: 1,
                isEnable: 1,
                officeId: this.officeId,
                name: query
            };
            sysUser.listDataByRole(obj)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.teacherLoading = false;
                    this.teacherList = res.data.data;
                }
            })
            .catch(errors.call(this))
        },
    },
    watch:{
        // 'app.currOfficeId': function(val,oldVal){
        //     if(oldVal){
        //         this.uploadListsData(val);
        //     }
        // }
    }
}
</script>


