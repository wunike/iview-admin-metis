<style lang="less">
.school-time-table-container{
    position: relative;
    height: 100%;
	div::-webkit-scrollbar {
		width: 6px !important;
	}
}
</style>
    
<template>
<div class="school-time-table-container">
    <search 
        ref="search" 
        :date="date" 
        :datePickerVal="datePickerValArr" 
        :id="id"
        :isCurrent="isCurrent" 
        from="teacher" 
        @onChangeDate="changeDate"
        @initLists="initLists" 
        @search="uploadLists" 
        @getCurrentLists="getCurrentLists" 
        @next="next" 
        @prev="prev">
    </search>
    <course-time-list
        ref="courseTimeList"
        :lists="lists"
        :isCurrent="true"
        @changeSingle="changeSingle"
        @changeData="changeData">
    </course-time-list>
</div>
</template>

<script>
/**
 ** @author: 曹见芳
 ** 客户360 - 学员课表
 */
import search from './search';
import courseTimeList from "./timeTable/courseTimeList";
import valid, { errors, sys, crmCustomerDetail } from "../../../libs/request";
import { mapMutations, mapState } from "vuex";

const ONE_DAY = 24 * 60 * 60 * 1000;

export default {
    name: 'schoolTimetable',
    components: {
        search,
        courseTimeList
    },
    props: {
        id: {
            type: String,
            required: true
        }
    },
    data(){
        return {
            date: '',
            isCurrent: true,
            startTime: '',
            endTime: '',
            lists: [],
        };
    },
    computed: {
        datePickerValArr() {
            return [this.startTime, this.endTime]
        },
        studentId() {
            return this.id;
        }
    },
    mounted(){
        
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        changeDate(e) {
            if(e && e.length == 2) {
                let isMonday = new Date(e[0]).getDay() == 1;
                let isSunday = new Date(e[1]).getDay() == 0;
                let isOnWeek = (new Date(e[1]).getTime() - new Date(e[0]).getTime()) / ONE_DAY == 6;
                if(!isMonday || !isSunday || !isOnWeek) {
                    this.$Message.warning(this.$t('modules_spoc_crm_web_src_views_customer360_components_schooltimetable_856'));
                }
                this.setStartTimeToDatePickerVal = false;
                // console.log(this.startTime)
                // console.log(this.endTime)
                // 不在当前选择的一周之内，才做操作
                if(new Date(e[0]).getTime() < new Date(this.startTime).getTime() || new Date(e[0]).getTime() > new Date(this.endTime).getTime()) {
                    this.uploadTime = true;
                    this.$refs.courseTimeList.getDays(e[0]);
                    // } else {
                    //     console.log('不操作')
                }
            }
            
        },
        getCurrentLists() {
            this.setStartTimeToDatePickerVal = true;
            this.uploadTime = true;
            this.$refs.courseTimeList.getDays();
        },
        prev() {
            this.setStartTimeToDatePickerVal = true;
            this.uploadTime = true;
            this.$refs.courseTimeList.getDays('prev');
        },
        next() {
            this.setStartTimeToDatePickerVal = true;
            this.uploadTime = true;
            this.$refs.courseTimeList.getDays('next');
        },
        uploadLists(_params) {
            this.allocType = _params.type;
            this.grade = _params.grade;
            this.teacherId = _params.teacherId;
            this.officeId = _params.officeId;
            this.getLists();
        },
        initLists(_officeId) {
            // 刚进入的时候，只有 校区 ，获取列表
            this.officeId = _officeId;
            this.getLists();
        },
        getLists() {
			// 获取数据
			this.updateLoadingStatus({
				isLoading: true
			});
			let params = {
				type: this.allocType,
				endTime: this.endTime,
				grade: this.grade,
				startTime: this.startTime,
				teacherId: this.teacherId,
                officeId: this.officeId,
                studentId: this.studentId
			};
			crmCustomerDetail.findStudentSchedule(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    let _lists = res.data.data;
                    _lists.forEach(item => {
                        item.startTime = item.startTime.split(" ")[1];
                        item.endTime = item.endTime.split(" ")[1];
                    });
                    this.lists = _lists;
                }
            })
            .catch(errors.call(this))
            .finally(() => {
                this.updateLoadingStatus({
                    isLoading: false
                });
            });
		},
        changeData(_firstDate, _endDate, _isCurrent) {
			this.startTime = _firstDate;
			this.endTime = _endDate;
			this.date = `${_firstDate} ~ ${_endDate}`;
			this.isCurrent = _isCurrent >= 0 ? true : false;
			if (this.setStartTimeToDatePickerVal)
				this.datePickerVal = _firstDate;
			if (this.uploadTime) this.getLists();
		},
		changeSingle(_val, _id) {
			if (_val) this.exportIds.push(_id);
			else {
				let _index = this.exportIds.indexOf(_id);
				if (_index > -1) {
					this.exportIds.splice(_index, 1);
				}
			}
			// console.log(this.exportIds)
		},
    },
    watch: {
        id() {
			if (this.$route.name == 'crm.customer360') {
				this.getLists();
			}
        }
    }
}
</script>


