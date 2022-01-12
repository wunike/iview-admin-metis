<style lang="less">
.clear{
    zoom: 1;
    &::before, &::after{
        content: '';
        display: block;clear: both;height: 0;line-height: 0;font-size: 0;
    }
}
.chioce-chioce-container{
    .search-collapse{
        height: 52px;
    }
    .search-btns{
        float: right;
        button{
            @h: 32px;
            float: left;margin-left: 12px;
            padding: 0 16px;
            height: @h;line-height: @h - 2px;
            font-size: 14px;
        }
    }
    .ivu-table-wrapper{
        border-left: 1px solid #e8eaec;
    }
}
.timetable-record-container{
    @border: 1px solid #e8eaec;
    .student-brief{
        h3{
            @h: 28px;
            margin-bottom: 8px;
            height: @h;line-height: @h;
            font-size: 16px;
        }
        ul{
            .clear;
            padding-bottom: 16px;
        }
        li{
            @h: 30px;
            float: left;width: 100% / 4;
            height: @h;line-height: @h;
            font-size: 14px;
            .clear;
            span{
                float: left;color: #999;
            }
        }
    }
    .ivu-table-wrapper{
        border-left: @border;
    }
    .ivu-table:before{
        background-color: #e8eaec;
    }
    .add-timetable-record{
        @h: 48px;
        height: @h;line-height: @h - 1px;
        text-align: center;
        border: @border;border-top: none;
        border-bottom-color: #dcdee2;
    }
    .ivu-modal-footer{
        padding-right: 24px;
    }
    .status{
        @w: 7px;
        position: relative;
        padding-left: 13px;
        &::before{
            content: '';
            position: absolute;left: 0;top: 4px;
            width: @w;height: @w;border-radius: 50%;
            background: #46BC15;
        }
        &.status-red::before{ background: #FF6666; }
    }
}
</style>
    
<template>
<div>
    <Modal
        v-model="choiceStudentModal"
        class-name="chioce-chioce-container"
        :title="$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2106')"
        width="600"
        :loading="loading">
        <div class="search-collapse">
            <Select v-model="className" style="width: 224px;margin-right: 12px;" clearable :placeholder="$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2107')">
                <Option v-for="item in classNameLists" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
            <Input v-model="studentName" :placeholder="$t('mycourse_scoreexchage_418')" style="width: 140px;"/>
            <div class="search-btns">
                <Button type="primary">{{$t('modules_rolepeople_210')}}</Button>
                <Button>{{$t('classroom_clock_87')}}</Button>
            </div>
        </div>
        <Table :columns="columnsStudent" :data="studentLists"></Table>
        <div slot="footer">
            <Button @click="choiceStudentCancel">{{$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2111')}}</Button>
        </div>
    </Modal>
    <Modal
        v-model="timetableRecordModal"
        class-name="timetable-record-container"
        :title="$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2112')"
        width="1000"
        :loading="loading">
        <div class="student-brief">
            <h3>{{$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2113')}}</h3>
            <ul>
                <li>
                    <span>{{$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2114')}}</span>
                    <div>9035029</div>
                </li>
                <li>
                    <span>{{$t('messagemanagement_components_infos_319')}}</span>
                    <div>Timmy</div>
                </li>
                <li>
                    <span>{{$t('views_staff_components_staffinfo_674')}}</span>
                    <div>13501666811</div>
                </li>
                <li>
                    <span>{{$t('messagemanagement_components_infos_320')}}</span>
                    <div>{{$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2118')}}</div>
                </li>
                <li>
                    <span>{{$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2119')}}</span>
                    <div>2019-01-29</div>
                </li>
                <li>
                    <span>{{$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2120')}}</span>
                    <div>3</div>
                </li>
                <li>
                    <span>{{$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2121')}}</span>
                    <div>{{$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2122')}}</div>
                </li>
                <li>
                    <span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_entrydetial_719')}}</span>
                    <div>2000-12-02</div>
                </li>
                <li>
                    <span>{{$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2124')}}</span>
                    <div>{{$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2125')}}</div>
                </li>
                <li>
                    <span>{{$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2126')}}</span>
                    <div>{{$t('modules_leftremenu_92')}}</div>
                </li>
                <li>
                    <span>{{$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2128')}}</span>
                    <div>Jason Liu</div>
                </li>
                <li>
                    <span>{{$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2129')}}</span>
                    <div>{{$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2130')}}</div>
                </li>
            </ul>
        </div>
        <Table :columns="columnsTimetableRecord" :data="timetableRecordLists"></Table>
        <div class="add-timetable-record"><a>{{$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2131')}}</a></div>
        <div slot="footer">
            <Button @click="choiceStudentCancel">{{$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2111')}}</Button>
        </div>
    </Modal>
</div>
</template>

<script>
/**
 ** @author: 曹见芳
 ** 1v1 学员 - 弹窗
 */
export default {
    data(){
        return {
            loading: true,
            // 选择学生 start
            choiceStudentModal: false,
            className: '',
            classNameLists: [],
            studentName: '' ,
            columnsStudent: [
                {
                    title: this.$t('classlist_compontents_detailinfo_35'),
                    key: 'name'
                },
                {
                    title: this.$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2133'),
                    key: 'className'
                },
                {
                    title: this.$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2134'),
                    key: 'num'
                },
                {
                    title: this.$t('classlist_compontents_detailinfo_45'),
                    render: (h, params) => {
                        return h("a", {
                            on: {
                                click: () => {
                                    
                                }
                            }
                        }, this.$t('spoc_hootie_web_282'))
                    }
                }
            ],
            studentLists: [
                {
                    name: this.$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2113'),
                    className: 'TOEFL、GRE',
                    num: '150'
                },
                {
                    name: this.$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2137'),
                    className: 'TOEFL',
                    num: '32'
                }
            ],
            // 选择学生 end
            // 排课记录 start
            timetableRecordModal: false,
            columnsTimetableRecord: [
                {
                    title: this.$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2138'),
                    width: 170,
                    key: 'type'
                },
                {
                    title: this.$t('courselist_compontents_modify_183'),
                    key: 'time'
                },
                {
                    title: this.$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2140'),
                    key: 'type2'
                },
                {
                    title: this.$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2141'),
                    width: 170,
                    key: 'place'
                },
                {
                    title: this.$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2142'),
                    key: 'timeRange'
                },
                {
                    title: this.$t('pushsettings_index_496'),
                    width: 100,
                    key: 'status',
                    render: (h, params) => {
                        let str = this.$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2144');
                        if(params.row.status == '2') str = this.$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2145');
                        return h("span", {
                            class: {
                                'status': true,
                                'status-red': params.row.status == '2'
                            },
                            on: {
                                click: () => {
                                    
                                }
                            }
                        },str)
                    }
                },
                {
                    title: this.$t('classlist_compontents_detailinfo_45'),
                    width: 80,
                    render: (h, params) => {
                        return h("a", {
                            on: {
                                click: () => {
                                    
                                }
                            }
                        }, this.$t('modules_expandrow_15'))
                    }
                },
            ],
            timetableRecordLists: [
                {
                    type: 'TOEFL、GRE',
                    time: '19.12.20-20.1.20',
                    type2: this.$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2147'),
                    place: this.$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2125'),
                    timeRange: 'A、B、C、D',
                    status: '1'
                },
                {
                    type: 'SAT',
                    time: '19.12.20-20.1.20',
                    type2: this.$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2148'),
                    place: this.$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2149'),
                    timeRange: 'A、C、D',
                    status: '2'
                }
            ],
            // 排课记录 end
        };
    },
    methods: {
        changLoading() {
            this.loading = false;
            setTimeout(() => {
                this.loading = true;
            }, 0);
        },
        // 选择学生 start
        showChoiceStudentModal() {
            this.choiceStudentModal = true;
        },
        choiceStudent() {},
        choiceStudentCancel() {
            this.choiceStudentModal = false;
        },
        // 选择学生 end
        // 排课记录 start
        showTimetableRecordModal() {
            this.timetableRecordModal = true;
        },
        choiceStudentCancel() {
            this.timetableRecordModal = false;
        },
        // 排课记录 end
    },
}
</script>


