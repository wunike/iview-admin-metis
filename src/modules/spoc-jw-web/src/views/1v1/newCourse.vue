<style lang="less">
.new-course-container{
    padding-bottom: 24px;
    .jw_course_wrap {
        padding: 24px 32px 24px;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        margin-bottom: 16px;
    }
    .jw_course_title {
        font-size: 16px;
        font-weight: 500;
        color: rgba(73, 80, 96, 1);
        line-height: 1;
        padding-bottom: 16px;
    }
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
    }
    .student_info_box {
        flex: 1;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 14px;
        font-weight: normal;
        color: rgba(153, 153, 153, 1);
        line-height: 21px;
        div {
            color: #495060;
        }
    }
    .select_course_box {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        margin-bottom: 10px;
    }
    .table_box {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        margin-right: 88px;
    }
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
    .time-label{
        float: left;width: 120px;
    }
    .ivu-checkbox-group-item{
        width: 170px;
    }
    .ivu-form-inline {
        .ivu-form-item{
            margin-bottom: 20px;width: 100% / 3;margin-right: 0;
        }
    }
    .submit{
        position: fixed;bottom: 0;right: 0;
        padding-right: 16px;padding-top: 12px;
        height: 56px;
        background: #fff;
        box-shadow:0px -1px 3px 0px rgba(0,0,0,0.12);
        transition: left .5s;
        .inner{
            float: right;
        }
        button{
            margin-left: 10px;
        }
    }
}
</style>
    
<template>
<div class="new-course-container">
    <div class="jw_course_wrap student_wrap">
        <div class="student_title">
            <div class="title">{{$t('modules_spoc_jw_web_src_views_1v1_newcourse_2150')}}</div>
            <Button icon="md-swap">{{$t('modules_spoc_jw_web_src_views_1v1_newcourse_2151')}}</Button>
        </div>
        <div class="student_info">
            <div class="student_info_box">
                <span>{{$t('modules_spoc_jw_web_src_views_1v1_newcourse_2152')}}</span>
                <div>17600002893</div>
            </div>
            <div class="student_info_box">
                <span>{{$t('views_staff_components_staffinfo_669')}}</span>
                <div>{{$t('views_staff_components_staffinfo_670')}}</div>
            </div>
            <div class="student_info_box">
                <span>{{$t('messagemanagement_components_infos_320')}}</span>
                <div>{{$t('modules_spoc_jw_web_src_views_1v1_newcourse_2156')}}</div>
            </div>
            <div class="student_info_box">
                <span>{{$t('modules_spoc_jw_web_src_views_1v1_newcourse_2157')}}</span>
                <div>33</div>
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
        <div class="jw_course_title">{{$t('modules_spoc_crm_web_src_views_customer360_index_1086')}}</div>
        <Form :model="params" :label-width="116" inline>
            <FormItem :label="$t('modules_spoc_jw_web_src_views_1v1_newcourse_2160')">
                <DatePicker type="date" style="width: 254px;" :placeholder="$t('pushsettings_index_505')" v-model="params.date"></DatePicker>
            </FormItem>
            <FormItem :label="$t('modules_spoc_jw_web_src_views_1v1_newcourse_2162')">
                <Input v-model="params.times" :placeholder="$t('scoretemplate_compontents_scoremodify_528')" style="width: 254px;"/>
            </FormItem>
            <FormItem :label="$t('modules_spoc_jw_web_src_views_1v1_newcourse_2164')">
                <Select v-model="params.type" style="width: 254px;" clearable :placeholder="$t('modules_spoc_jw_web_src_views_1v1_newcourse_2165')">
                    <Option v-for="item in typeLists" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
            </FormItem>
            <FormItem :label="$t('modules_spoc_jw_web_src_views_1v1_newcourse_2166')" style="width: 100%">
                <Select v-model="params.type" style="width: 254px;" clearable :placeholder="$t('modules_spoc_jw_web_src_views_1v1_newcourse_2165')">
                    <Option v-for="item in typeLists" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
            </FormItem>
            <FormItem :label="$t('modules_spoc_jw_web_src_views_1v1_newcourse_2167')" style="width: 100%;margin-bottom: 0">
                <span class="time-label">{{$t('modules_spoc_jw_web_src_views_1v1_newcourse_2168')}}</span>
                <CheckboxGroup v-model="params.time1">
                    <Checkbox label="A">
                        <span>A、08:00-10:00</span>
                    </Checkbox>
                    <Checkbox label="B">
                        <span>B、10:30-12:30</span>
                    </Checkbox>
                    <Checkbox label="C">
                        <span>C、14:00-16:00</span>
                    </Checkbox>
                    <Checkbox label="D">
                        <span>D、16:30-18:30</span>
                    </Checkbox>
                    <Checkbox label="E">
                        <span>E、19:00-21:00</span>
                    </Checkbox>
                </CheckboxGroup>
            </FormItem>
            <FormItem :label="$t('modules_spoc_jw_web_src_views_1v1_newcourse_2167')" style="width: 100%">
                <span class="time-label">{{$t('modules_spoc_jw_web_src_views_1v1_newcourse_2169')}}</span>
                <CheckboxGroup v-model="params.time1">
                    <Checkbox label="A">
                        <span>A、08:00-10:00</span>
                    </Checkbox>
                    <Checkbox label="B">
                        <span>B、10:30-12:30</span>
                    </Checkbox>
                    <Checkbox label="C">
                        <span>C、14:00-16:00</span>
                    </Checkbox>
                    <Checkbox label="D">
                        <span>D、16:30-18:30</span>
                    </Checkbox>
                    <Checkbox label="E">
                        <span>E、19:00-21:00</span>
                    </Checkbox>
                </CheckboxGroup>
            </FormItem>
            <FormItem :label="$t('modules_spoc_jw_web_src_views_1v1_newcourse_2170')" style="width: 100%">
                <Input v-model="params.times" type="textarea" :placeholder="$t('scoretemplate_compontents_scoremodify_528')"/>
            </FormItem>
            <FormItem :label="$t('modules_spoc_jw_web_src_views_1v1_newcourse_2171')" style="width: 100%">
                <Input v-model="params.times" type="textarea" :placeholder="$t('scoretemplate_compontents_scoremodify_528')"/>
            </FormItem>
        </Form>
    </div>
    <div class="submit" :style="{'left': $store.state.app.collapsed ? '64px' : '180px'}">
        <div class="inner">
            <Button>{{$t('classroom_allscore_53')}}</Button>
            <Button type="primary">{{$t('modules_spoc_jw_web_src_views_1v1_newcourse_2173')}}</Button>
        </div>
    </div>
</div>
</template>

<script>
/**
 ** @author: 曹见芳
 ** 新增排课申请
 */
export default {
    name: 'jw.newCourse',
    data(){
        return {
            toeflLoading: false,
            toeflOptions: [{ value: 1, label: 1 }],
            greLoading: false,
            greOptions: [{ value: 1, label: 1 }],
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
            params: {
                date: '',
                times: '',
                type: '',
                time1: ['A', 'B']
            },
            typeLists: [],
        };
    },
    mounted(){
        
    },
    methods: {
        toeflRemote() {},
        greRemote() {},
    },
    watch: {
        
    }
}
</script>


