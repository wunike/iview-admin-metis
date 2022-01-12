<style lang="less">
.glr-container {
    #lineTop {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .select-institution {
        height: 32px;
        display: inline-block;
        margin-right: 12px;
        margin-bottom: 12px;
        line-height: normal;
    }
    .my-table {
        width: 100%;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        padding: 0 16px;
        margin-top: 10px;
    }
}
</style>

<template>
    <div class="glr-container">
        <v-search-collapse @search="search" @reset="reset" @changeDivHeight="changeDivHeight">
            <tree-select :placeholder="$t('modules_spoc_crm_web_src_views_clientareaaround_clientareaaround_781')" v-model="GLR.officeId" style="width: 224px;" check-strictly :expand-all="true" :data="GLR.officeIdList"></tree-select>
            <MonthRangeDatePicker v-model="GLR.month" type="daterange" :placeholder="$t('modules_spoc_jw_web_src_views_studentremainclassreport_studentremainclassreport_3178')" style="width:224px;"></MonthRangeDatePicker>
            <Select v-model="GLR.allocType" :placeholder="$t('views_coursepack_bigtableexample_322')" clearable @on-clear="changeType" @on-change="changeType">
                <Option v-if="item" :value="item.value" v-for="(item, index) in GLR.jwCourseType" :key="index">{{ item.label }}</Option>
            </Select>
            <Select v-model="GLR.grade" :placeholder="$t('modules_spoc_jw_web_src_views_studentremainclassreport_studentremainclassreport_3180')" :disabled="!GLR.allocType" clearable>
                <Option v-if="item" :value="item.value" v-for="(item, index) in GLR.jwCourseTypeChild" :key="index" v-show="GLR.allocType == item.type">{{ item.label }}</Option>
            </Select>
            <Select filterable remote @on-clear="clearStu" :remote-method="stuRemote" v-model="GLR.name" clearable :placeholder="$t('classlist_compontents_detailinfo_35')" style="width: 140px;margin-right:12px;">
                <Option v-for="item in GLR.nameList" :value="item.value" :key="item.value">{{ item.name }}</Option>
            </Select>
            <Select
                filterable
                remote
                @on-clear="clearStu"
                :remote-method="stuRemoteEn"
                v-model="GLR.enName"
                clearable
                :placeholder="$t('modules_spoc_jw_web_src_views_studentremainclassreport_studentremainclassreport_3182')"
                style="width: 140px;margin-right:12px;"
            >
                <Option v-for="item in GLR.enNameList" :value="item.value" :key="item.value">{{ item.name }}</Option>
            </Select>
            <div style="display: inline-block;">
                <InputNumber :min="0" v-model="GLR.traceCountStart" :placeholder="$t('modules_spoc_crm_web_src_views_customermanagement_index_1275')" @on-change="traceCountStartBlur" style="margin-right: 0;width: 90px;"></InputNumber>
                <div style="display: inline-block;line-height: 32px;vertical-align: top;color: rgb(230, 231, 235);font-weight: bold;font-size: 18px;">~</div>
                <InputNumber
                    v-model="GLR.traceCountEnd"
                    :placeholder="$t('modules_spoc_crm_web_src_views_customermanagement_index_1276')"
                    @on-change="traceCountEndBlur"
                    style="width: 90px;"
                    :formatter="
                        val => {
                            return val == Infinity ? $t('modules_spoc_crm_web_src_views_customermanagement_index_1277') : val;
                        }
                    "
                ></InputNumber>
            </div>
        </v-search-collapse>
        <big-table
            v-if="defaultShowCol"
            class="my-table"
            :tableName="tabs"
            :tableData="tableData"
            :tableColumnArray="tableColumnArray"
            :defaultShowCol="defaultShowCol"
            :canSelection="false"
            :btnList="btnList"
            :showPage="false"
            :isShowSelectTableColumn="false"
            :tableHeightOut="tableHeightOut"
            @changeTableType="changeTableType"
        ></big-table>
        <export-modal ref="exportModal" :exportMethod="exportMethod"></export-modal>
    </div>
</template>

<script>
import vSearchCollapse from '@public/modules/vSearchCollapse';
import valid, { errors, sysOffice, sysUser, common, sysDict, sysCommonSql } from '../../libs/request';
import { report } from '@public/libs/request';
import { crmActivity } from '../../../../spoc-crm-web/src/libs/request';
import { mapMutations, mapState } from 'vuex';
import bigTable from '../../../../spoc-portal/modules/bigTable';
import exportModal from '@public/modules/exportModal.vue';
import TreeSelect from '_c/tree-select';
import { waitUntil, DatePickerOpt, defaultDatePickerValue } from '@public/libs/util';

export default {
    data() {
        return {
            currentTab: '0',
            tableHeightOut: 72,
            GLR: {
                officeId: [],
                officeIdList: [],
                month: '',
                allocType: '',
                jwCourseType: [],
                grade: '',
                jwCourseTypeChild: [],
                name: '',
                nameList: [],
                enName: '',
                enNameList: [],
                traceCountStart: '',
                traceCountEnd: ''
            },
            defaultShowCol: {},
            tableData: [],
            tableColumnArray: [],
            btnList: [
                {
                    style: {},
                    type: '',
                    btnClick: this.export,
                    text: this.$t('integralflow_5')
                }
            ],
            exportMethod: crmActivity.exportSelectedFile, //导出用到的方法对象
            tabs: [
                {
                    name: this.$t('modules_spoc_jw_web_src_views_studentremainclassreport_studentremainclassreport_3187'),
                    value: '0'
                },
                {
                    name: this.$t('modules_spoc_jw_web_src_views_studentremainclassreport_studentremainclassreport_3188'),
                    value: '1'
                }
            ]
        };
    },
    computed: {
        ...mapState(['app', 'buttonPerm', 'calendarConfig'])
    },
    components: {
        vSearchCollapse,
        bigTable,
        exportModal,
        TreeSelect
    },
    mounted() {
        this.getTreeDatas();
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        getTreeDatas() {
            this.updateLoadingStatus({ isLoading: true });
            sysUser
                .dataScopeFilterTree()
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        if (Array.isArray(res.data.data.children)) {
                            this.GLR.officeIdList = res.data.data.children;
                            waitUntil(
                                () => {
                                    return this.app.currOfficeId || false;
                                },
                                () => {
                                    this.$set(this.GLR, 'officeId', this.app.currOfficeId == 'all' ? [] : [this.app.currOfficeId]);
                                    this.init();
                                }
                            );
                        }
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        init() {
            this.baseData();
            this.batchListData();
            this.customerSource();
            this.getShowTitle();
            this.getListData();
        },
        stuRemote(query) {
            this.getSearchList('student_id', query);
        },
        stuRemoteEn(query) {
            if (query !== '') {
                let obj = {
                    mainTable: 'cw_capital_trace',
                    mainField: 'student_id',
                    joinField: 'id',
                    joinTable: 'sys_user',
                    secondField: 'en_name',
                    joinTableSearchParam: query
                };
                sysCommonSql
                    .queryPageInputInitData(obj)
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            this.GLR.enNameList = res.data.data;
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {
                        // this.updateLoadingStatus({ isLoading: false });
                    });
            }
        },
        getSearchList(userType, query) {
            if (query !== '') {
                let obj = {
                    mainTable: 'cw_capital_trace',
                    mainField: userType,
                    joinField: 'id',
                    joinTable: 'sys_user',
                    secondField: 'name',
                    joinTableSearchParam: query
                };
                if (userType == 'student_id') {
                    obj.joinTable = 'com_student';
                } else if (userType == 'applyer_id') {
                    obj.joinTable = 'sys_user';
                }
                sysCommonSql
                    .queryPageInputInitData(obj)
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            //                            console.log(res)
                            if (userType == 'student_id') {
                                this.GLR.nameList = res.data.data;
                            } else if (userType == 'applyer_id') {
                                this.GLR.applicantList = res.data.data;
                            }
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {
                        // this.updateLoadingStatus({ isLoading: false });
                    });
            }
        },
        changeType() {
            this.GLR.grade = '';
        },
        baseData() {
            let types = 'jw_course_type'; //,jw_course_grade' //课程包分类,适用年级
            sysDict
                .batchListData({
                    types
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.GLR.jwCourseType = res.data.data.jw_course_type;
                        // this.jw_course_grade = res.data.data.jw_course_grade
                    }
                })
                .catch(errors.call(this));

            let type = 'jw_course_type';
            sysDict
                .findChildDictByParentDict({
                    type
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.GLR.jwCourseTypeChild = res.data.data;
                    }
                })
                .catch(errors.call(this));
        },
        search() {
            this.getListData();
        },
        reset() {},
        changeDivHeight(height) {
            this.tableHeightOut = height;
        },
        batchListData() {
            this.updateLoadingStatus({ isLoading: true });

            let types = 'crm_activity_type';
            sysDict
                .batchListData({
                    types
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.GLR.activityTypeList = res.data.data.crm_activity_type;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        customerSource() {
            this.updateLoadingStatus({ isLoading: true });
            sysDict
                .getDictStringTree({ type: 'crm_customer_source' })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.GLR.customerSource = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        getShowTitle() {
            report
                .rptRemainGetShowTitle({
                    pageIdentifier: 'rptRemainClassesCollectVO',
                    voName: 'RptRemainClassesCollectVO'
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.defaultShowCol = res.data.data;
                    }
                })
                .catch(errors.call(this));
        },
        getShowTitleMore() {
            report
                .rptRemainGetShowTitle({
                    pageIdentifier: 'rptRemainClassesCollectVO',
                    voName: 'RptRemainClassesCollectVO'
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.defaultShowCol = res.data.data;
                    }
                })
                .catch(errors.call(this));
        },
        getListData() {
            this.updateLoadingStatus({ isLoading: true });
            let param = {
                startTime: this.GLR.month[0] || '',
                endTime: this.GLR.month[1] || '',
                officeIds: this.GLR.officeId,
                name: this.GLR.name,
                enName: this.GLR.enName,
                grade: this.GLR.grade,
                type: this.GLR.allocType
            };
            // this.searchObj = param; //这里需要给searchObj 赋值，导出数据的时候需要用到
            report
                .findRemainClassCollect(param)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let result = res.data.data;
                        this.tableData = result;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        export() {},
        changeTableType(val) {
            this.currentTab = val;
            // console.log(val)
            if (val == '0') {
                this.getShowTitle();
                this.singleMonth = false;
            } else {
                this.singleMonth = true;

                this.getShowTitleMore();
            }
        },
        traceCountStartBlur() {
            if (!this.GLR.traceCountEnd) {
                this.GLR.traceCountEnd = Infinity;
            } else if (this.GLR.traceCountEnd < this.GLR.traceCountStart) {
                this.GLR.traceCountEnd = this.GLR.traceCountStart;
            } else {
            }
        },
        traceCountEndBlur() {
            if (!this.GLR.traceCountStart) {
                this.GLR.traceCountStart = 0;
            } else if (this.GLR.traceCountEnd < this.GLR.traceCountStart) {
                this.GLR.traceCountStart = this.GLR.traceCountEnd;
            } else {
            }
        }
    },
    watch: {
        'app.currOfficeId': function(val, oldVal) {
            if (oldVal && this.$route.name == 'jw.studentRemainClassReport') {
                this.$set(this.GLR, 'officeId', val == 'all' ? [] : [val]);
                this.getListData();
            }
        }
    }
};
</script>
