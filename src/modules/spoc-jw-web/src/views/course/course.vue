<style lang="less">
.jw_course {
    width: 100%;
    height: 100%;
    .jw_course_title {
        font-size: 16px;
        font-weight: 500;
        color: rgba(73, 80, 96, 1);
        line-height: 1;
        padding-bottom: 16px;
    }
    .jw_course_wrap {
        padding: 24px 32px 24px;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        margin-bottom: 16px;
    }
    .course_intention {
        padding-top: 24px;
        .course_intention_list {
            .course_intention_item {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding-bottom: 14px;
                .course_intention_name {
                    font-size: 16px;
                    font-weight: 500;
                    color: rgba(73, 80, 96, 1);
                    line-height: 22px;
                }
                .course_intention_wrap {
                    flex: 1;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                }
                .course_intention_box {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    .course_intention_info_name {
                        font-size: 14px;
                        font-weight: normal;
                        color: rgba(153, 153, 153, 1);
                        line-height: 21px;
                    }
                    .course_intention_info {
                        font-size: 14px;
                        font-weight: normal;
                        color: rgba(73, 80, 96, 1);
                        line-height: 21px;
                        .red {
                            font-size: 14px;
                            font-weight: normal;
                            color: #ff4a4a;
                            line-height: 21px;
                        }
                    }
                }
            }
        }
    }
    .student_wrap {
        .student_title {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding-bottom: 16px;
            .title {
                font-size: 20px;
                font-weight: 500;
                color: rgba(73, 80, 96, 1);
                line-height: 1;
            }
            button {
                width: 100px;
                height: 28px;
                line-height: 1;
                margin-left: 10px;
                font-size: 14px;
                font-weight: normal;
                line-height: 21px;
                padding: 0;
            }
        }
        .student_info {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .student_info_box {
                flex: 1;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                font-size: 14px;
                font-weight: normal;
                color: rgba(153, 153, 153, 1);
                line-height: 21px;
                .student_info_cont {
                    color: #495060;
                }
            }
        }
    }
    .select_course_wrap {
        .select_course_box {
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            .table_box {
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                margin-right: 88px;
                .table_box_label {
                    font-size: 14px;
                    font-weight: normal;
                    color: rgba(73, 80, 96, 1);
                    line-height: 21px;
                }
                .table_box_content {
                    width: 472px;
                    .ivu-table-wrapper {
                        border: 1px solid #dcdee2;
                        border-bottom: 0;
                        border-right: 0;
                        .ivu-table {
                            &:after {
                                display: inline-block;
                            }
                        }
                    }
                }
            }
        }
    }
    .basic_info_wrap {
        .basic_info_box {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .basic_info_item {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                .basic_info_label {
                    width: 112px;
                    font-size: 14px;
                    font-weight: normal;
                    text-align: right;
                    color: rgba(153, 153, 153, 1);
                    line-height: 21px;
                    margin-right: 10px;
                }
            }
        }
    }
    .course_info_wrap {
        .course_info_search {
            .course_info_item {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                .course_info_label {
                    width: 112px;
                    font-size: 14px;
                    font-weight: normal;
                    text-align: right;
                    color: rgba(153, 153, 153, 1);
                    line-height: 21px;
                    margin-right: 10px;
                }
            }
            .course_info_search_top {
                padding-bottom: 20px;
            }
            .course_info_search_bottom {
                display: flex;
                justify-content: flex-start;
                align-items: center;
            }
        }
        .search_button {
            padding: 20px 0 16px;
            text-align: right;
        }
    }
}
</style>
<template>
    <div class="jw_course">
        <div class="jw_course_wrap course_intention">
            <div class="jw_course_title">{{$t('modules_spoc_jw_web_src_views_course_course_2843')}}</div>
            <div class="course_intention_list">
                <div class="course_intention_item">
                    <div class="course_intention_name">TOEFL</div>
                    <div class="course_intention_wrap">
                        <div class="course_intention_box">
                            <div class="course_intention_info_name">{{$t('modules_spoc_jw_web_src_views_course_course_2844')}}</div>
                            <div class="course_intention_info"><span class="red">{{$t('modules_spoc_jw_web_src_views_course_course_2845')}}</span></div>
                        </div>
                        <div class="course_intention_box">
                            <div class="course_intention_info_name">{{$t('modules_spoc_jw_web_src_views_course_course_2846')}}</div>
                            <div class="course_intention_info">Yona Z</div>
                        </div>
                        <div class="course_intention_box">
                            <div class="course_intention_info_name">{{$t('modules_spoc_jw_web_src_views_course_course_2847')}}</div>
                            <div class="course_intention_info">
                                <span>Echo Liang</span>
                                、
                                <span class="red">{{$t('modules_spoc_jw_web_src_views_course_course_2848')}}</span>
                            </div>
                        </div>
                        <div class="course_intention_box">
                            <div class="course_intention_info_name">{{$t('modules_spoc_jw_web_src_views_course_course_2849')}}</div>
                            <div class="course_intention_info">Yona Z</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="course_intention_list">
                <div class="course_intention_item">
                    <div class="course_intention_name">TOEFL</div>
                    <div class="course_intention_wrap">
                        <div class="course_intention_box">
                            <div class="course_intention_info_name">{{$t('modules_spoc_jw_web_src_views_course_course_2844')}}</div>
                            <div class="course_intention_info"><span class="red">{{$t('modules_spoc_jw_web_src_views_course_course_2845')}}</span></div>
                        </div>
                        <div class="course_intention_box">
                            <div class="course_intention_info_name">{{$t('modules_spoc_jw_web_src_views_course_course_2846')}}</div>
                            <div class="course_intention_info">Yona Z</div>
                        </div>
                        <div class="course_intention_box">
                            <div class="course_intention_info_name">{{$t('modules_spoc_jw_web_src_views_course_course_2847')}}</div>
                            <div class="course_intention_info">
                                <span>Echo Liang</span>
                                、
                                <span class="red">{{$t('modules_spoc_jw_web_src_views_course_course_2848')}}</span>
                            </div>
                        </div>
                        <div class="course_intention_box">
                            <div class="course_intention_info_name">{{$t('modules_spoc_jw_web_src_views_course_course_2849')}}</div>
                            <div class="course_intention_info">Yona Z</div>
                        </div>
                    </div>
                </div>
            </div>
            <Table :columns="intentionCol" :data="intentionData"></Table>
        </div>
        <div class="jw_course_wrap student_wrap">
            <div class="student_title">
                <div class="title">{{$t('modules_spoc_jw_web_src_views_1v1_newcourse_2150')}}</div>
                <Button icon="md-swap">{{$t('modules_spoc_jw_web_src_views_1v1_newcourse_2151')}}</Button>
            </div>
            <div class="student_info">
                <div class="student_info_box">
                    <div class="student_info_label">{{$t('modules_spoc_jw_web_src_views_1v1_newcourse_2152')}}</div>
                    <div class="student_info_cont">17600002893</div>
                </div>
                <div class="student_info_box">
                    <div class="student_info_label">{{$t('views_staff_components_staffinfo_669')}}</div>
                    <div class="student_info_cont">{{$t('views_staff_components_staffinfo_670')}}</div>
                </div>
                <div class="student_info_box">
                    <div class="student_info_label">{{$t('messagemanagement_components_infos_320')}}</div>
                    <div class="student_info_cont">{{$t('modules_spoc_jw_web_src_views_1v1_newcourse_2156')}}</div>
                </div>
                <div class="student_info_box">
                    <div class="student_info_label">{{$t('modules_spoc_jw_web_src_views_1v1_newcourse_2157')}}</div>
                    <div class="student_info_cont">33</div>
                </div>
            </div>
        </div>
        <div class="jw_course_wrap select_course_wrap">
            <div class="jw_course_title">{{$t('modules_spoc_jw_web_src_views_1v1_newcourse_2158')}}</div>
            <div class="select_course_box">
                <div class="table_box">
                    <div class="table_box_label">TOEFL：</div>
                    <div class="table_box_content">
                        <Table :columns="toeflCol" :data="toeflData">
                            <template slot-scope="{ row, index }" slot="subject">
                                {{ row.subject }}
                            </template>
                            <template slot-scope="{ row, index }" slot="teacher">
                                <Select v-model="row.teacher" filterable remote :remote-method="toeflRemote" :loading="toeflLoading">
                                    <Option v-for="(option, index) in toeflOptions" :value="option.value" :key="index">{{ option.label }}</Option>
                                </Select>
                            </template>
                        </Table>
                    </div>
                </div>
                <div class="table_box">
                    <div class="table_box_label">GRE：</div>
                    <div class="table_box_content">
                        <Table :columns="greCol" :data="greData">
                            <template slot-scope="{ row, index }" slot="subject">
                                {{ row.subject }}
                            </template>
                            <template slot-scope="{ row, index }" slot="teacher">
                                <Select v-model="row.teacher" filterable remote :remote-method="greRemote" :loading="greLoading">
                                    <Option v-for="(option, index) in greOptions" :value="option.value" :key="index">{{ option.label }}</Option>
                                </Select>
                            </template>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
        <div class="jw_course_wrap basic_info_wrap">
            <div class="jw_course_title">{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2630')}}</div>
            <div class="basic_info_box">
                <div class="basic_info_item">
                    <div class="basic_info_label">{{$t('modules_spoc_jw_web_src_views_attendancepage_attendancepage_2296')}}</div>
                    <div class="basic_info_content"><Input v-model="headmaster" :placeholder="$t('scoretemplate_compontents_scoremodify_528')" style="width: 254px" /></div>
                </div>
                <div class="basic_info_item">
                    <div class="basic_info_label">{{$t('courselist_compontents_modify_196')}}</div>
                    <div class="basic_info_content">
                        <Select v-model="classroom" filterable remote :remote-method="remoteClassroom" :loading="loadingClassroom" :placeholder="$t('modules_spoc_jw_web_src_views_1v1_newcourse_2165')" style="width: 254px">
                            <Option v-for="(option, index) in classroomOptions" :value="option.value" :key="index">{{ option.label }}</Option>
                        </Select>
                    </div>
                </div>
                <div class="basic_info_item">
                    <div class="basic_info_label">{{$t('views_staff_components_lefttree_648')}}</div>
                    <div class="basic_info_content"><Input v-model="remark" :placeholder="$t('scoretemplate_compontents_scoremodify_528')" style="width: 254px" /></div>
                </div>
            </div>
        </div>
        <div class="jw_course_wrap course_info_wrap">
            <div class="jw_course_title">{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2666')}}</div>
            <div class="course_info_search">
                <div class="course_info_search_top">
                    <div class="course_info_item">
                        <div class="course_info_label">{{$t('modules_spoc_jw_web_src_views_course_course_2866')}}</div>
                        <div class="course_info_content">
                            <RadioGroup v-model="courseType">
                                <Radio :label="$t('modules_spoc_jw_web_src_views_course_course_2867')"></Radio>
                                <Radio :label="$t('modules_spoc_jw_web_src_views_course_course_2868')"></Radio>
                            </RadioGroup>
                        </div>
                    </div>
                </div>
                <div class="course_info_search_bottom">
                    <div class="course_info_item">
                        <div class="course_info_label">{{$t('courselist_compontents_modify_178')}}</div>
                        <div class="course_info_content"><DatePicker type="date" :placeholder="$t('pushsettings_index_505')" style="width: 254px" @on-change="getClassDate"></DatePicker></div>
                    </div>
                    <div class="course_info_item">
                        <div class="course_info_label">{{$t('courselist_compontents_modify_181')}}</div>
                        <div class="course_info_content">
                            <Select v-model="classTime" :placeholder="$t('modules_spoc_jw_web_src_views_attendancepage_attendancepage_2323')" style="width: 254px">
                                <Option v-for="(option, index) in classTimeOptions" :value="option.value" :key="index">{{ option.label }}</Option>
                            </Select>
                        </div>
                    </div>
                    <div class="course_info_item">
                        <div class="course_info_label">{{$t('modules_spoc_jw_web_src_views_course_course_2873')}}</div>
                        <div class="course_info_content">
                            <Select v-model="classHours" :placeholder="$t('modules_spoc_jw_web_src_views_attendancepage_attendancepage_2325')" style="width: 254px">
                                <Option v-for="(option, index) in classHoursOptions" :value="option.value" :key="index">{{ option.label }}</Option>
                            </Select>
                        </div>
                    </div>
                </div>
                <div class="search_button"><Button type="primary">{{$t('modules_spoc_jw_web_src_views_course_course_2875')}}</Button></div>
            </div>
            <Table :columns="courseCol" :data="courseData">
                <template slot-scope="{ row, index }" slot="index">
                    {{ row.index }}
                </template>
                <template slot-scope="{ row, index }" slot="date">
                    {{ row.date }}
                </template>
                <template slot-scope="{ row, index }" slot="week">
                    {{ row.week }}
                </template>
                <template slot-scope="{ row, index }" slot="classTime">
                    {{ row.classTime }}
                </template>
                <template slot-scope="{ row, index }" slot="classHours">
                    {{ row.classHours }}
                </template>
                <template slot-scope="{ row, index }" slot="subjectsTeachers">
                    <Select v-model="row.subjectsTeachers" filterable>
                        <Option v-for="(option, index) in subjectsTeachersOptions" :value="option.value" :key="index">{{ option.label }}</Option>
                    </Select>
                </template>
                <template slot-scope="{ row, index }" slot="headMaster">
                    {{ row.headMaster }}
                </template>
                <template slot-scope="{ row, index }" slot="classroom">
                    {{ row.classroom }}
                </template>
            </Table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'jw.course',
    data() {
        return {
            subjectsTeachersOptions:[],
            courseType: '',
            classHours: '',
            classHoursOptions: [],
            classTime: '',
            classTimeOptions: [],
            remark: '',
            headmaster: '',
            classroom: '',
            loadingClassroom: false,
            classroomOptions: [{ value: 1, label: 1 }],
            toeflLoading: false,
            toeflOptions: [{ value: 1, label: 1 }],
            greLoading: false,
            greOptions: [{ value: 1, label: 1 }],
            intentionCol: [
                {
                    title: this.$t('modules_spoc_jw_web_src_views_course_course_2876'),
                    key: 'name'
                },
                {
                    title: this.$t('modules_spoc_jw_web_src_views_course_course_2877'),
                    key: 'name'
                },
                {
                    title: this.$t('modules_spoc_jw_web_src_views_course_course_2878'),
                    key: 'name'
                },
                {
                    title: this.$t('modules_spoc_jw_web_src_views_course_course_2879'),
                    key: 'name'
                },
                {
                    title: this.$t('modules_spoc_jw_web_src_views_course_course_2880'),
                    key: 'name'
                },
                {
                    title: this.$t('modules_spoc_jw_web_src_views_course_course_2881'),
                    key: 'name'
                },
                {
                    title: this.$t('modules_spoc_jw_web_src_views_course_course_2882'),
                    key: 'name'
                }
            ],
            intentionData: [{ name: '2019.12.01-2020.01.20' }],
            toeflCol: [
                {
                    type: 'selection',
                    title: this.$t('spoc_hootie_web_282'),
                    width: 50
                },
                {
                    title: this.$t('modules_spoc_jw_web_src_views_1v1_newcourse_2175'),
                    slot: 'subject',
                    width: 60
                },
                {
                    title: this.$t('modules_spoc_jw_web_src_views_1v1_newcourse_2176'),
                    slot: 'teacher'
                }
            ],
            toeflData: [{ subject: this.$t('modules_spoc_jw_web_src_views_1v1_newcourse_2177'), teacher: '' }, { subject: this.$t('modules_spoc_jw_web_src_views_1v1_newcourse_2178'), teacher: '' }, { subject: this.$t('modules_spoc_jw_web_src_views_1v1_newcourse_2179'), teacher: '' }, { subject: this.$t('modules_spoc_jw_web_src_views_1v1_newcourse_2180'), teacher: '' }],
            greCol: [
                {
                    type: 'selection',
                    title: this.$t('spoc_hootie_web_282'),
                    width: 50
                },
                {
                    title: this.$t('modules_spoc_jw_web_src_views_1v1_newcourse_2175'),
                    slot: 'subject',
                    width: 60
                },
                {
                    title: this.$t('modules_spoc_jw_web_src_views_1v1_newcourse_2176'),
                    slot: 'teacher'
                }
            ],
            greData: [{ subject: this.$t('modules_spoc_jw_web_src_views_1v1_newcourse_2177'), teacher: '' }, { subject: this.$t('modules_spoc_jw_web_src_views_1v1_newcourse_2178'), teacher: '' }, { subject: this.$t('modules_spoc_jw_web_src_views_1v1_newcourse_2179'), teacher: '' }, { subject: this.$t('modules_spoc_jw_web_src_views_1v1_newcourse_2180'), teacher: '' }],

            courseCol: [
                {
                    title: this.$t('courselist_compontents_detailinfo_160'),
                    slot: 'index',
                    width: 60
                },
                {
                    title: this.$t('modules_spoc_jw_web_src_views_classmanage_createclass_createclass_2694'),
                    slot: 'date',
                },
                {
                    title: this.$t('message_socket_303'),
                    slot: 'week'
                },
                {
                    title: this.$t('mycourse_mycourse_377'),
                    slot: 'classTime',
                },
                {
                    title: this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_604'),
                    slot: 'classHours'
                },
                {
                    title: this.$t('modules_spoc_jw_web_src_views_course_course_2895'),
                    slot: 'subjectsTeachers',
                    width:300
                },
                {
                    title: this.$t('modules_spoc_jw_web_src_views_course_course_2896'),
                    slot: 'headMaster'
                },
                {
                    title: this.$t('courselist_16'),
                    slot: 'classroom',
                },
            ],
            courseData:[
                {index:1,date:'2020-1-1',week:'--',classTime:'9:30-11:30',classHours:'1',subjectsTeachers:'',headMaster:'John Lopez',classroom:this.$t('modules_spoc_jw_web_src_views_course_course_2898')}
            ]
        };
    },
    computed: {},
    components: {},
    mounted() {},
    methods: {
        toeflRemote() {},
        greRemote() {},
        remoteClassroom() {},
        getClassDate(val) {}
    }
};
</script>
