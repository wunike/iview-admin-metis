<style lang="less">
.pub {
    font-size: 14px;
    font-family: HiraginoSansGB-W3, HiraginoSansGB;
    font-weight: normal;
    color: rgba(153, 153, 153, 1);
}
.mainBody {
    position: relative;
}
.attendancePageClass {
    .main-contain {
        overflow: hidden;
        .check-class-detail {
            margin: 0px 0px 16px;
            font-size: 14px;
            padding: 20px 24px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.15);
            border-radius: 4px;
            .title {
                font-size: 16px;
                font-family: HiraginoSansGB-W6, HiraginoSansGB;
                font-weight: 800;
                color: rgba(73, 80, 96, 1);
            }
            .stopListContent {
                display: flex;
                flex-wrap: wrap;
                > div {
                    width: 33.33%;
                    margin-top: 11px;
                }
            }
        }
        .check-student-detail {
            margin: 16px 0px 16px;
            font-size: 14px;
            padding: 20px 24px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.15);
            border-radius: 4px;
            .title {
                font-size: 16px;
                font-family: HiraginoSansGB-W6, HiraginoSansGB;
                font-weight: 800;
                color: rgba(73, 80, 96, 1);
            }
            .stopListContent {
                display: flex;
                flex-wrap: wrap;
                > div {
                    width: 25%;
                    margin-top: 11px;
                }
            }
        }
    }
    // 天气冷鼻子不通气嗓子痰多 通窍鼻炎颗粒和辅舒良进行治疗。
    .mealList {
        position: absolute;
        bottom: 0px;
        left: 0px;
        width: 100%;
        font-size: 14px;
        padding: 16px 36px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.15);
        border-radius: 4px;
        .title {
            font-size: 16px;
            font-family: HiraginoSansGB-W6, HiraginoSansGB;
            font-weight: 800;
            color: rgba(73, 80, 96, 1);
        }
        .stopListContent {
            display: flex;
            flex-wrap: wrap;
            > div {
                width: 33.33%;
                margin-top: 10px;
            }
        }
    }
}
</style>
<template>
    <div class="attendancePageClass">
        <div class="main-contain">
            <div class="experience-version">
                <div class="check-class-detail">
                    <div
                        style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px"
                    >
                        <div style="display:flex;">
                            <span class="title">{{$t('modules_spoc_jw_web_src_views_attendancepage_attendancepage_2283')}}</span>
                        </div>
                    </div>
                    <div class="stopListContent">
                        <div>
                            <span style="color:#999;">{{$t('modules_spoc_jw_web_src_views_attendancepage_attendancepage_2284')}}</span>
                            <span style="color:#495060FF;">{{$t('modules_spoc_jw_web_src_views_attendancepage_attendancepage_2285')}}</span>
                        </div>
                        <div>
                            <span style="color:#999;">{{$t('views_staff_components_staffinfo_674')}}</span>
                            <span style="color:#495060FF;">17600002893</span>
                        </div>
                        <div>
                            <span style="color:#999;">{{$t('courselist_compontents_modify_181')}}</span>
                            <span>{{$t('modules_spoc_jw_web_src_views_attendancepage_attendancepage_2288')}}</span>
                            <!-- <span style="color:#495060FF;">
                                <span style="color:#F39945FF">20</span>{{$t('message_socket_305')}}<span style="color:#F39945FF">49</span>{{$t('message_socket_306')}}</span>-->
                        </div>
                        <div>
                            <span style="color:#999;">{{$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2129')}}</span>
                            <span style="color:#495060FF;">{{$t('modules_spoc_jw_web_src_views_attendancepage_attendancepage_2292')}}</span>
                        </div>
                        <div>
                            <span style="color:#999;">{{$t('modules_spoc_jw_web_src_views_attendancepage_attendancepage_2293')}}</span>
                            <span style="color:#495060FF;">{{$t('modules_spoc_jw_web_src_views_attendancepage_attendancepage_2294')}}</span>
                        </div>
                        <div>
                            <span style="color:#999;">{{$t('modules_spoc_jw_web_src_views_attendancepage_attendancepage_2295')}}</span>
                            <span style="color:#495060FF;">Yona Zeng</span>
                        </div>
                        <div>
                            <span style="color:#999;">{{$t('modules_spoc_jw_web_src_views_attendancepage_attendancepage_2296')}}</span>
                            <span style="color:#495060FF;">Yona Zeng</span>
                        </div>
                        <div>
                            <span style="color:#999;">{{$t('modules_spoc_jw_web_src_views_attendancepage_attendancepage_2297')}}</span>
                            <span style="color:#495060FF;">{{$t('modules_spoc_jw_web_src_views_attendancepage_attendancepage_2298')}}</span>
                        </div>
                    </div>
                </div>
                <div class="check-student-detail">
                    <div
                        style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px"
                    >
                        <div style="display:flex;">
                            <span class="title">{{$t('modules_spoc_crm_web_src_views_customer360_components_studentbref_883')}}</span>
                        </div>
                    </div>
                    <div class="stopListContent">
                        <div>
                            <span style="color:#999;">{{$t('modules_spoc_crm_web_src_views_customer360_components_studentother_1000')}}</span>
                            <span style="color:#495060FF;">278363544</span>
                        </div>
                        <div>
                            <span style="color:#999;">{{$t('classroom_exchange_96')}}</span>
                            <span style="color:#495060FF;">{{$t('modules_spoc_jw_web_src_views_attendancepage_attendancepage_2285')}}</span>
                        </div>
                        <div>
                            <span style="color:#999;">{{$t('modules_spoc_jw_web_src_views_attendancepage_attendancepage_2302')}}</span>
                            <span>{{$t('views_staff_components_staffinfo_671')}}</span>
                            <!-- <span style="color:#495060FF;">
                                <span style="color:#F39945FF">20</span>{{$t('message_socket_305')}}<span style="color:#F39945FF">49</span>{{$t('message_socket_306')}}</span>-->
                        </div>
                        <div>
                            <span style="color:#999;">{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_entrydetial_719')}}</span>
                            <span style="color:#495060FF;">2014-12-18</span>
                        </div>
                        <div>
                            <span style="color:#999;">{{$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_945')}}</span>
                            <span style="color:#495060FF;">{{$t('modules_spoc_jw_web_src_views_attendancepage_attendancepage_2306')}}</span>
                        </div>
                        <div>
                            <span style="color:#999;">{{$t('views_staff_components_staffinfo_674')}}</span>
                            <span style="color:#495060FF;">17600002938</span>
                        </div>
                        <div>
                            <span style="color:#999;">{{$t('modules_spoc_jw_web_src_views_attendancepage_attendancepage_2307')}}</span>
                            <span style="color:#495060FF;">9</span>
                        </div>
                        <div>
                            <span style="color:#999;">{{$t('modules_spoc_jw_web_src_views_1v1_newcourse_2157')}}</span>
                            <span style="color:#495060FF;">20</span>
                        </div>
                        <div>
                            <span style="color:#999;">{{$t('modules_spoc_jw_web_src_views_attendancepage_attendancepage_2309')}}</span>
                            <span style="color:#495060FF;">{{$t('modules_spoc_jw_web_src_views_attendancepage_attendancepage_2310')}}</span>
                        </div>
                        <div>
                            <span style="color:#999;">{{$t('modules_spoc_jw_web_src_views_attendancepage_attendancepage_2311')}}</span>
                            <span style="color:#495060FF;">2019-12-12</span>
                        </div>
                        <div>
                            <span style="color:#999;">{{$t('modules_spoc_jw_web_src_views_attendancepage_attendancepage_2312')}}</span>
                            <span style="color:#495060FF;">{{$t('modules_spoc_jw_web_src_views_attendancepage_attendancepage_2313')}}</span>
                        </div>
                        <div>
                            <span style="color:#999;">{{$t('modules_spoc_jw_web_src_views_attendancepage_attendancepage_2314')}}</span>
                            <span style="color:#495060FF;">2019-12-18</span>
                        </div>
                        <div>
                            <span style="color:#999;">{{$t('modules_spoc_jw_web_src_views_attendancepage_attendancepage_2315')}}</span>
                            <span style="color:#495060FF;">{{$t('modules_spoc_crm_web_src_views_customer360_components_studentcourses_923')}}</span>
                        </div>
                        <div>
                            <span style="color:#999;">{{$t('modules_spoc_jw_web_src_views_attendancepage_attendancepage_2317')}}</span>
                            <span style="color:#495060FF;">-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mealList">
            <div
                style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px"
            >
                <div style="display:flex;">
                    <span style="display:flex;align-items:center;">
                        <!-- 未考勤 -->
                        <span
                            style="width:16px;height:16px;background:#E2E4E8FF;border-radius:50%;"
                        ></span>
                    </span>
                    <span style="display:flex;align-items:center;margin-left:6px;">{{$t('modules_spoc_crm_web_src_views_customer360_components_studentcourses_923')}}</span>
                    <!-- 考勤异常 -->
                    <!-- <span
                            style="width:16px;height:16px;background:#FF3000FF;border-radius:50%;"
                        ></span>
                    <span style="display:flex;align-items:center;margin-left:6px;">{{$t('modules_spoc_jw_web_src_views_attendancepage_attendancepage_2318')}}</span> -->
                </div>
                <div>
                    <Button
                        type="primary"
                        style="padding:6px 16px;margin-left:12px;"
                        @click="goToDetail"
                    >{{$t('classlist_compontents_detailinfo_46')}}</Button>
                    <Button
                        type="primary"
                        style="padding:6px 16px;margin-left:12px;"
                        @click="goToDetail"
                    >{{$t('modules_spoc_crm_web_src_views_customer360_components_studentcourses_923')}}</Button>
                    <Button
                        type="primary"
                        style="padding:6px 16px;margin-left:12px;"
                        @click="goToDetail"
                    >{{$t('modules_spoc_jw_web_src_views_attendancepage_attendancepage_2320')}}</Button>
                    <Button
                        type="primary"
                        style="padding:6px 16px;margin-left:12px;"
                        @click="goToDetail"
                    >{{$t('modules_spoc_crm_web_src_views_customer360_components_studentcourses_922')}}</Button>
                </div>
            </div>
            <div class="stopListContent">
                <div>
                    <span style="color:#999;">{{$t('modules_spoc_jw_web_src_views_attendancepage_attendancepage_2322')}}</span>
                    <!-- <span style="color:#495060FF;">2019.11.5 10:00</span> -->
                    <Select v-model="model1" style="width:254px" :placeholder="$t('modules_spoc_jw_web_src_views_attendancepage_attendancepage_2323')">
                        <Option
                            v-for="item in cityList1"
                            :value="item.value"
                            :key="item.value"
                        >{{ item.label }}</Option>
                    </Select>
                </div>
                <div>
                    <span style="color:#999;">{{$t('modules_spoc_jw_web_src_views_attendancepage_attendancepage_2324')}}</span>
                    <Select v-model="model2" style="width:254px" :placeholder="$t('modules_spoc_jw_web_src_views_attendancepage_attendancepage_2325')">
                        <Option
                            v-for="item in cityList2"
                            :value="item.value"
                            :key="item.value"
                        >{{ item.label }}</Option>
                    </Select>
                </div>
                <div>
                    <span style="color:#999;">{{$t('views_staff_components_lefttree_648')}}</span>
                    <Input v-model="model3" :placeholder="$t('modules_spoc_jw_web_src_views_attendancepage_attendancepage_2325')" style="width: 254px" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
    name: 'jw.attendancePage',
    data() {
        return {
            cityList1: [
                {
                    value: "1",
                    label: "1"
                },
                {
                    value: "2",
                    label: "2"
                }
            ],
            model1: "",
            cityList2: [
                {
                    value: "1",
                    label: "1"
                },
                {
                    value: "2",
                    label: "2"
                }
            ],
            model2: "",
            model3: ""
        };
    },
    computed: {},
    components: {},
    mounted() {},
    methods: {
        goToDetail() {
            // this.$router.push({
            //     name: "core.lesseeTrialTenant"
            // });
        },
        tabChange(name) {
            // if (name == "name3") {
            //     this.$router.push({
            //         name: "core.lesseeSharePage"
            //     });
            // }
        }
    }
};
</script>
