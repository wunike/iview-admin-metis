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
            font-size: 14px;
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
            :style="{width: from == 'signIn' || from == 'checkInElectronic' ? '80px' : '170px'}"
            format="yyyy-MM-dd" 
            @on-change="changeDate">
        </DatePicker>
        <span class="date" v-text="date" :style="{width: from == 'signIn' || from == 'checkInElectronic' ? '80px' : '170px'}"></span>
        <div class="page">
            <Button @click.stop="prev"><Icon type="md-arrow-dropleft" /></Button>
            <Button :disabled="isCurrent" @click.stop="getCurrentLists" style="width: 80px;">{{ from == 'signIn' || from == 'checkInElectronic' ? $t('modules_spoc_jw_web_src_modules_search_2092') : $t('modules_spoc_crm_web_src_views_customer360_components_search_857') }}</Button>
            <Button @click.stop="next"><Icon type="md-arrow-dropright" /></Button>
        </div>
    </div>
    <!-- 教室课表 -->
    <v-search-collapse @search="getListClass" @reset="resetSearchClass" v-if="from == 'class'">
        <Select v-model="officeId" style="width:224px" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_search_858')" @on-change="changeOfficeId">
            <Option v-if="item" v-for="item in officeIdList" :value="item.id" :key="item.id">{{ item.code }}{{ item.name }}</Option>
        </Select>
        <Select v-model="classId" multiple style="width:324px" :placeholder="$t('modules_spoc_jw_web_src_modules_search_2095')">
            <Option v-if="item" v-for="item in classLists" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
    </v-search-collapse>
    <!-- 教师课表 -->
    <v-search-collapse @search="getListTeacher" @reset="resetSearchTeacher" v-if="from == 'teacher'">
        <Select v-model="officeId" style="width:224px" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_search_858')" @on-change="changeCourseOwner">
            <Option v-if="item" v-for="item in officeIdList" :value="item.id" :key="item.id">{{ item.code }}{{ item.name }}</Option>
        </Select>
        <Select v-model="teacherType" :placeholder="$t('modules_spoc_jw_web_src_modules_search_2096')" @on-change="changeCourseOwner">
            <Option v-if="item" v-for="item in teacherTypeLists" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Select v-model="allocType" :placeholder="$t('messagemanagement_index_346')" clearable @on-change="changeType">
            <Option v-if="item" :value="item.value" v-for="(item, index) in jw_course_type" :key="index">{{item.label}}</Option>
        </Select>
        <Select v-model="grade" :placeholder="$t('messagemanagement_index_347')" clearable>
            <Option v-if="item" :value="item.value" v-for="(item, index) in jw_course_type_child" :key="index" v-show="allocType == item.type">{{item.label}}</Option>
        </Select>
        <Select v-model="teacher" multiple style="width:324px" clearable :placeholder="$t('modules_spoc_jw_web_src_modules_search_2099')">
            <Option v-if="item" v-for="item in teacherList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
    </v-search-collapse>
    <!-- 手工签到 -->
    <v-search-collapse @search="getListData" @reset="resetSearch" v-if="from == 'signIn'">
        <Select v-model="officeId" style="width:224px" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_search_858')" @on-change="changeOfficeIdSignIn">
            <Option v-if="item" v-for="item in officeIdList" :value="item.id" :key="item.id">{{ item.code }}{{ item.name }}</Option>
        </Select>
        <Select v-model="classroomId" clearable :placeholder="$t('views_room_classroom_560')">
            <Option v-if="item" v-for="item in classLists" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>

        <!-- start 4477 -->
        <Select v-model="classCourse" 
            filterable
            remote
            clearable
            :placeholder="$t('mycourse_mycourse_372')"
            :remote-method="remoteMethodClassCourse"
            >
            <Option v-for="item in classCourseList" 
                v-if="item"
                :value="item.id"
                :key="item.id" >{{ item.name }}</Option>
        </Select>
        <Select v-model="studentId" 
            filterable
            remote
            clearable
            :placeholder="$t('modules_spoc_jw_web_src_modules_search_2102')"
            :remote-method="remoteMethodStudentId"
            >
            <Option v-for="item in studentList" 
                v-if="item"
                :value="item.id"
                :key="item.id" >{{ item.name }}</Option>
        </Select>
        <Select v-model="teacherId" 
            filterable
            remote
            clearable
            :placeholder="$t('courselist_12')"
            :remote-method="remoteMethodTeacherList"
            >
            <Option v-for="item in teacherList" 
                v-if="item"
                :value="item.id"
                :key="item.id" >{{ item.name }}</Option>
        </Select>

        <!-- end 4477 -->



        <!-- <Select v-model="classCourse" clearable :placeholder="$t('mycourse_mycourse_372')">
            <Option v-if="item" v-for="item in classCourseList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select> -->
        <!-- <Select v-model="studentId" clearable :placeholder="$t('modules_spoc_jw_web_src_modules_search_2102')">
            <Option v-if="item" v-for="item in studentList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select> -->
        <!-- <Select v-model="teacherId" clearable :placeholder="$t('courselist_12')">
            <Option v-if="item" v-for="item in teacherList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select> -->
        <Select v-model="allocType" :placeholder="$t('messagemanagement_index_346')" clearable @on-change="changeType">
            <Option v-if="item" :value="item.value" v-for="(item, index) in jw_course_type" :key="index">{{item.label}}</Option>
        </Select>
        <Select v-model="grade" :placeholder="$t('messagemanagement_index_347')" clearable>
            <Option v-if="item" :value="item.value" v-for="(item, index) in jw_course_type_child" :key="index" v-show="allocType == item.type">{{item.label}}</Option>
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
    jwClassroom, 
    sysDict, 
    sysUser, 
    jwTeacherSchedule ,
    jwLesson,
    jwManualSign
} from "../libs/request";
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
        }
    },
    data(){
        return {
            studentId: '',
            studentList: [],
            teacher: [],
            teacherList: [],// 教师列表
            jw_course_type: [],
            // jw_course_grade: [],
            jw_course_type_child: [],
            officeIdList: [],
            teacherTypeLists: [
                {
                    value: 'teacher_id',
                    label: this.$t('courselist_12')
                },
                {
                    value: 'class_teacher_id',
                    label: this.$t('mycourse_mycourse_374')
                },
                {
                    value: 'assist_id',
                    label: this.$t('courselist_13')
                }
            ],
            officeId: '', //校区
            teacherType: '', //老师类型
            teacherTypeCopy: '', //老师类型
            allocType: '', //分类
            grade: '', //年级
            pId: null,
            classLists: [],
            classId: [],
            uploadLists: true, // 第一次获取校区之后，不用选择教室，直接获取教室课表
            classCourse: '', //班课名称
            classCourseList: [],
            classCourseListCopy: [],
            classroomId: '',
            teacherId: '',
            computedDate: '',
        };
    },
    computed: {
        ...mapState(["userInfo", "app"]),
        datePickerType() {
            return this.from == 'signIn' ? 'date' : 'daterange'
        },
    },
    components: {
        vSearchCollapse
    },
    created() {
        this.pId = MENUIDS.JW;
    },
    mounted() {
        this.dataScopeFilter();
        if(this.from == 'teacher' || this.from == 'signIn'){
            this.baseData();
        }
        if(this.from == 'teacher') {
            this.getTeacherType('first');
            waitUntil (()=>{
                return !!(this.officeId && this.teacherType);
            },()=>{
                // this.changeCourseOwner();
                this.officeId = this.officeId == 'all' ? this.userInfo.officeId: this.officeId;
                this.$emit('initLists', this.teacherType, this.officeId);
            });
        }
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        uploadListsData(val) {
            // console.log(val)
            this.officeId = val;
            if(this.from == 'teacher') {
                this.resetSearchTeacher();
            } else if(this.from == 'signIn') {
                this.resetSearch();
            } else if(this.from == 'class') {
                this.resetSearchClass();
            }
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
            // 修改校区或者老师类型，获取教师列表
            // console.log(this.officeId)
            // console.log(this.teacherType)
            if(!this.officeId || !this.teacherType) {
                // this.teacherList = [];
                // this.$Message.error('请选择上课所在校区')
                return;
            }
            this.teacher = [];
            let params = {
                officeId: this.officeId,
                teacherType: this.teacherType
            }
            jwLesson.getUserByOfficeIdAndRoleId(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.teacherList = res.data.data;
                }
            })
            .catch(errors.call(this));
        },
        getTeacherType(str) {
            // 教师课表获取教师类型操作
            let params = {
                type: str && str == 'first' ? '' : this.teacherType,
            }
            jwTeacherSchedule.teacherType(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.teacherType = res.data.data[0] || 'teacher_id';
                    this.teacherTypeCopy = res.data.data[0] || 'teacher_id';
                }
            })
            .catch(errors.call(this));
        },
        baseData() {
			let types = 'jw_course_type'//,jw_course_grade' //课程包分类,适用年级
			sysDict.batchListData({
				types
			})
			.then(valid.call(this))
			.then(res => {
				if (res.ok) {
					this.jw_course_type = res.data.data.jw_course_type
					// this.jw_course_grade = res.data.data.jw_course_grade
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
            sysUser.dataScopeFilter({
				menuId: this.pId
			})
			.then(valid.call(this))
			.then(res => {
				if (res.ok) {
                    this.officeIdList = res.data.data;
                    waitUntil (()=>{
                        return !!this.app.currOfficeId;
                    },()=>{
                        this.officeId = this.app.currOfficeId == 'all' ? this.userInfo.officeId: this.app.currOfficeId;
                        if(this.from == 'teacher') this.changeCourseOwner();
                        if(this.from == 'class') this.changeOfficeId();
                        if(this.from == 'signIn') {
                            this.changeOfficeIdSignIn();
                            this.teacherType = 'teacher_id';
                        }
                    });
				}
			})
			.catch(errors.call(this));
        },
        getListTeacher() {
            // 搜索
            if(!this.teacherType) {
                this.$Message.error(this.$t('modules_spoc_jw_web_src_modules_search_2096'))
                return;
            }
            let params = {
                teacherType: this.teacherType,
                allocType: this.allocType,
                grade: this.grade,
                teacherId: this.teacher.length ? this.teacher.join() : '',
                officeId: this.officeId,
            }
            if(this.teacherType != this.teacherTypeCopy) this.getTeacherType();
            this.$emit('search', params);
        },
        resetSearchTeacher() {
            // 清空
            this.initOfficeIdAndTeacherLists();
            this.allocType = '';
            this.grade = '';
            this.teacher = [];
            this.teacherType = this.teacherTypeCopy;
            let params = {
                allocType: this.allocType,
                grade: this.grade,
                teacherId: '',
                teacherType: this.teacherTypeCopy,
                officeId: this.officeId,
            }
            this.$emit('search', params);
        },
        initOfficeIdAndTeacherLists() {
            waitUntil (()=>{
                return !!this.app.currOfficeId;
            },()=>{
                this.officeId = this.app.currOfficeId == 'all' ? this.userInfo.officeId: this.app.currOfficeId;
            });
            this.changeCourseOwner();
        },
        // ---- 教室课表 start ----
        changeOfficeId() {
            // 选择上课所在校区
            if(this.uploadLists) {
                this.uploadLists = false;
                if(this.from == 'signIn') this.getListData();
                else this.getListClass();
            }
            let params = {
                officeId: this.officeId
            }
            jwClassroom.listClassroomByOfficeId(params)
            .then(valid.call(this))
			.then(res => {
				if (res.ok) {
                    this.classLists = res.data.data.length ? res.data.data : []
				}
			})
			.catch(errors.call(this));
        },
        getListClass() {
            // 查询
            this.officeId = this.officeId == 'all' ? this.userInfo.officeId: this.officeId;
            this.$emit('search', this.officeId, this.classId);
        },
        resetSearchClass() {
            // 清空
            if(this.officeIdList.length && this.officeId != this.officeIdList[0].id) {
                waitUntil (()=>{
                    return !!this.app.currOfficeId;
                },()=>{
                    this.officeId = this.app.currOfficeId == 'all' ? this.userInfo.officeId: this.app.currOfficeId;
                    this.changeOfficeId();
                });
            }
            this.classId = [];
            this.officeId = this.officeId == 'all' ? this.userInfo.officeId: this.officeId;
            this.$emit('search', this.officeId, this.classId);
        },
        // ---- 教室课表 end ----

        // ---- 手工签到 start ----
        changeDate(e) {
            // console.log(e)
            this.$emit('onChangeDate', e);
        },
        getListData() {
            // 搜索
            let params = {
                allocType: this.allocType, //班课排课类型
                classCourseId: this.classCourse, //班课编号
                classroomId: this.classroomId, //教室编号
                grade: this.grade, //班课试用年级
                officeId: this.officeId, //校区id
                studentId: '', //学员编号
                teacherId: this.teacherId, //授课教师id
            }
            this.$emit('search', params);
        },
        resetSearch() {
            // 清空
            this.allocType = '';
            this.classCourse = '';
            this.classroomId = '';
            this.grade = '';
            this.studentId = '';
            waitUntil (()=>{
                return !!this.app.currOfficeId;
            },()=>{
                this.officeId = this.app.currOfficeId;
            });
            this.teacherId = '';
            this.getListData();
        },
        getClassCourseByOfficeId() {
            let params = {
                officeId: this.officeId
            }
            jwManualSign.getClassCourseByOfficeId(params)
            .then(valid.call(this))
			.then(res => {
				if (res.ok) {
                    this.classCourseList = res.data.data.length ? res.data.data : [];
                    this.classCourseListCopy = [...this.classCourseList];
				}
			})
			.catch(errors.call(this));
        },
        listByOfficeId() {
            // 根据校区获取学员
            let params = {
                officeId: this.officeId
            }
            common.comStudentListByOfficeId(params)
            .then(valid.call(this))
			.then(res => {
				if (res.ok) {
                    this.studentList = res.data.data.length ? res.data.data : []
				}
			})
			.catch(errors.call(this));
        },
        changeOfficeIdSignIn() {
            // 修改校区
            // console.log(this.officeId);
            // this.getClassCourseByOfficeId();
            this.changeCourseOwner();
            this.changeOfficeId();
            // this.listByOfficeId();
        },
        remoteMethodClassCourse(query) {
            if(!!query) {
                // 不为空
                let params = {
                    officeId: this.officeId,
                    name: query
                }
                jwManualSign.getClassCourseByOfficeIdAndName(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.classCourseList = res.data.data.length ? res.data.data : [];
                        // this.classCourseListCopy = [...this.classCourseList];
                    }
                })
                .catch(errors.call(this));
            } else {
                this.classCourseList = [];
            }
        },
        remoteMethodStudentId(query) {
            if(!!query) {
                // 不为空
                let params = {
                    officeId: this.officeId,
                    name: query
                }
                common.listByOfficeIdAndName(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.studentList = res.data.data.length ? res.data.data : [];
                    }
                })
                .catch(errors.call(this));
            } else {
                this.studentList = [];
            }
        },
        remoteMethodTeacherList(query) {
            if(!!query) {
                // 不为空
                let params = {
                    roleIds: 6,
                    // pageSize: this.officeId,
                    name: query
                }
                sysUser.listDataByRole(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.teacherList = res.data.data.length ? res.data.data : [];
                    }
                })
                .catch(errors.call(this));
            } else {
                this.teacherList = [];
            }
        },
        // ---- 手工签到 end ----
    },
    watch:{
        'app.currOfficeId': function(val,oldVal){
            if(oldVal && (
                this.$route.name == 'jw.schoolTimetableTeacher' || 
                this.$route.name == 'jw.schoolTimetableSignIn' || 
                this.$route.name == 'jw.scheduleManageList' ||
                this.$route.name == 'jw.checkInElectronic')){
                let officeId = val == 'all' ? this.userInfo.officeId: val;
                this.uploadListsData(officeId);
            }
        }
    }
}
</script>


