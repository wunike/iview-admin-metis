<style lang="less">
.glr-container {
    height: 100%;
    .my-table {
        width: 100%;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        padding: 0 16px 16px;
        margin-top: 10px;
    }
}
</style>

<template>
    <div class="glr-container">
        <v-search-collapse @search="search" @reset="reset" @changeDivHeight="changeDivHeight">
            <div class="treeSelectCos" style="width: 224px;">
                <treeselect
                    sortValueBy="INDEX"
                    :flat="false"
                    :noOptionsText="''"
                    :alwaysOpen="false"
                    :multiple="true"
                    :default-expand-level="2"
                    :limit="1"
                    :limitText="count => `${count}+`"
                    :value-consists-of="valueConsistsOf"
                    :placeholder="$t('modules_spoc_crm_web_src_views_clientareaaround_clientareaaround_781')"
                    v-model="GLR.officeId"
                    :options="GLR.officeIdList"
                ></treeselect>
            </div>
            <Select v-model="gdType" style="width:200px" @on-change="changeGd">
                <Option value="1">{{$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4470')}}</Option>
                <Option value="2" :disabled="gdTime == '-1'">{{$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4471')}}</Option>
            </Select>
            <MonthRangeDatePicker
                ref="DatePicker"
                :clearable="false"
                separator=" ~ "
                :options="options3"
                @on-open-change="setOptTime"
                v-model="GLR.month"
                type="daterange"
                :placeholder="$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4472')"
                style="width:224px;"
            ></MonthRangeDatePicker>
            <Select v-model="GLR.type" :placeholder="$t('views_coursepack_bigtableexample_322')" clearable @on-clear="changeType" @on-change="changeType">
                <Option v-if="item" :value="item.value" v-for="(item, index) in GLR.jwCourseType" :key="index">{{ item.label }}</Option>
            </Select>
            <Select v-model="GLR.grade" :placeholder="$t('modules_spoc_jw_web_src_views_studentremainclassreport_studentremainclassreport_3180')" :disabled="!GLR.type" clearable>
                <Option v-if="item" :value="item.value" v-for="(item, index) in GLR.jwCourseTypeChild" :key="index" v-show="GLR.type == item.type">{{ item.label }}</Option>
            </Select>
            <Select filterable remote @on-clear="clearStu" :remote-method="stuRemote" v-model="GLR.name" clearable :placeholder="$t('classlist_compontents_detailinfo_35')">
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
            >
                <Option v-for="item in GLR.enNameList" :value="item.value" :key="item.value">{{ item.name }}</Option>
            </Select>
            <!-- <div style="display: inline-block;">
                <InputNumber :min="0" v-model="GLR.leftStartHour" :placeholder="$t('modules_spoc_report_web_src_views_studentremainclassreport_studentremainclassreport_4733')" @on-blur="leftStartHourBlur" style="margin-right: 0;width: 90px;"></InputNumber>
                <div style="display: inline-block;line-height: 32px;vertical-align: top;color: rgb(230, 231, 235);font-weight: bold;font-size: 18px;">~</div>
                <InputNumber
                    v-model="GLR.leftEndHour"
                    :placeholder="$t('modules_spoc_report_web_src_views_studentremainclassreport_studentremainclassreport_4734')"
                    @on-blur="leftEndHourBlur"
                    style="width: 90px;"
                    :formatter="
                        val => {
                            return val == Infinity ? $t('modules_spoc_crm_web_src_views_customermanagement_index_1277') : val;
                        }
                    "
                ></InputNumber>
            </div> -->
            <div v-show="currentTab == '1'" class="treeSelectCos" style="width: 224px;">
                <treeselect
                    sortValueBy="INDEX"
                    :flat="false"
                    :noOptionsText="''"
                    :alwaysOpen="false"
                    :multiple="true"
                    :default-expand-level="2"
                    :limit="1"
                    :limitText="count => `${count}+`"
                    :value-consists-of="valueConsistsOf"
                    :placeholder="$t('modules_spoc_crm_web_src_views_customermanagement_index_1262')"
                    v-model="GLR.signOfficeIds"
                    :options="GLR.officeIdList"
                ></treeselect>
            </div>
        </v-search-collapse>
        <journaling
            v-if="defaultShowCol"
            :hasPage="hasPage"
            :current="pageNo"
            :total="total"
            :pageSize="pageSize"
            class="my-table"
            :showSummary="false"
            :tableName="tabs"
            :tableData="tableData"
            :defaultShowCol="defaultShowCol"
            :btnList="btnList"
            :tableHeightOut="tableHeightOut"
            @changeTableType="changeTableType"
            @pageSizeChange="pageSizeChange"
            @pageChange="pageChange"
        ></journaling>
        <Modal
            v-model="exportMonthModal"
            :title="$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4479')"
            :loading="exportMonthModalLoading"
            width="300"
            @on-ok="exportOk"
            @on-cancel="exportCancel">
            <MonthRangeDatePicker
                v-model="exportMonth"
                ref="exportDatePicker"
                type="daterange"
                style="width: 224px;"
                :placeholder="$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4480')"
                :clearable="false"
                separator=" ~ ">
            </MonthRangeDatePicker>
        </Modal>
        <!-- <export-modal ref="exportModal" :exportMethod="exportMethod"></export-modal> -->
    </div>
</template>

<script>
import vSearchCollapse from '@public/modules/vSearchCollapse';
import valid, { errors, sysOffice, sysUser, common, sysDict, sysCommonSql, report, rptArchiveSchedule } from '../../libs/request';
// import { crmActivity } from '../../../../spoc-crm-web/src/libs/request';
import { mapMutations, mapState } from 'vuex';
import journaling from '../../modules/journaling';
// import exportModal from '@public/modules/exportModal.vue';
// import TreeSelect from '_c/tree-select';
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
import { waitUntil, MonthrangeOpt, defaultDatePickerValue, getMonthEndDay, titleTransformationToLabel, getSelectIdsByid, getSelectTreeDataByid, noGdMonth, hasGdMonth } from '@public/libs/util';

export default {
    name: 'report.studentRemainClassReport',
    data() {
        return {
            exportMonthModalLoading: true,
            exportMonthModal: false,
            exportMonth: [],
            pageSize: this.$store.state.app.pageSizeGlobal || 10,
            hasPage: true,
            pageNo: 1,
            total: 0,
            gdType: '1',
            gdTime: '',
            parentOfficeId: '',
            ininOfficeIdList: [],
            valueConsistsOf: 'LEAF_PRIORITY', // ALL、BRANCH_PRIORITY、LEAF_PRIORITY、ALL_WITH_INDETERMINATE
            currentTab: '0',
            options3: null,
            tableHeightOut: 72,
            GLR: {
                officeId: [],
                signOfficeIds: [],
                officeIdList: [],
                month: '',
                type: '',
                jwCourseType: [],
                grade: '',
                jwCourseTypeChild: [],
                name: '',
                nameList: [],
                enName: '',
                enNameList: [],
                leftStartHour: '',
                leftEndHour: ''
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
            // exportMethod: crmActivity.exportSelectedFile, //导出用到的方法对象
            tabs: [
                {
                    name: this.$t('modules_spoc_jw_web_src_views_studentremainclassreport_studentremainclassreport_3187'),
                    value: '0'
                },
                {
                    name: this.$t('modules_spoc_jw_web_src_views_studentremainclassreport_studentremainclassreport_3188'),
                    value: '1'
                }
            ],
            storageDataObj: {
                "0": {},
                "1": {}
            },
        };
    },
    computed: {
        ...mapState(['app', 'buttonPerm', 'calendarConfig'])
    },
    components: {
        vSearchCollapse,
        journaling,
        Treeselect
    },
    mounted() {
        this.baseData();
        this.batchListData();
        this.customerSource();
        this.getTreeDatas();
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        // 获取归档时间点
        getArchiveDate(){
            this.updateLoadingStatus({ isLoading: true });
            rptArchiveSchedule
            .findRecentlyArchiveDate({
                "officeIds": this.GLR.officeId,
            })
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    // console.log(res.data.data, 'gdTime')
                    this.gdTime = res.data.data // 归档时间节点，如果是-1则全是未月结
                    this.findRecentlyArchiveDate(true)
                } else {
                    this.updateLoadingStatus({ isLoading: false });
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },
        exportOk(){
            if(this.exportMonth && !this.exportMonth[0]){
                this.$Message.error(this.$t('modules_spoc_report_web_src_views_auditionconversionreport_index_4488'))
                this.exportMonthModal = true
                this.exportMonthModalLoading = false
                setTimeout(()=>{
                    this.exportMonthModalLoading = true
                },0)
            } else {
                this.updateLoadingStatus({ isLoading: true });
                let param = {
                    officeIds:this.GLR.officeId,//校区id
                }
                param.startTime = new Date(this.exportMonth[0]).format('yyyy-MM-01 00:00:00')
                param.endTime = getMonthEndDay(new Date(this.exportMonth[1]).format('yyyy-MM'));
                report
                .exportRemainClassesCollect(param)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        const blob = new Blob([res.data], {
                            type: "application/actet-stream;charset=utf-8"
                        });
                        const contentDisposition =
                            res.headers["content-disposition"]; //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
                        const patt = new RegExp(
                            "filename=([^;]+\\.[^\\.;]+);*"
                        );
                        const result = patt.exec(contentDisposition);
                        if (!result) {
                            this.$Message.error(this.$t("integralflow_19"));
                            return;
                        }
                        const filename = decodeURIComponent(result[1]);
                        const downloadElement = document.createElement("a");
                        const href = window.URL.createObjectURL(blob); //创建下载的链接
                        downloadElement.style.display = "none";
                        downloadElement.href = href;
                        downloadElement.download = filename; //下载后文件名
                        document.body.appendChild(downloadElement);
                        downloadElement.click(); //点击下载
                        document.body.removeChild(downloadElement); //下载完成移除元素
                        window.URL.revokeObjectURL(href);
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.exportMonthModal = false
                    this.exportMonthModalLoading = false
                    setTimeout(()=>{
                        this.exportMonthModalLoading = true
                    },0)
                    this.updateLoadingStatus({ isLoading: false });
                });
            }
        },
        exportCancel(){
            this.exportMonthModal = false
        },
        pageSizeChange(val){
            console.log(val, 'pageSizeChange')
            this.pageSize = val
            if(this.pageNo == 1){
                this.getListData()
            }
        },
        pageChange(val){
            console.log(val, 'pageChange')
            this.pageNo = val
            this.getListData()
        },
        setOptTime(flag){
            if(flag){
                this.GLR.month=[];
            }
        },
        changeGd(val){
            this.pageNo = 1
            this.GLR.month = [];
            this.findRecentlyArchiveDate(false,true)
        },
        // 设置日期可选范围。并设置默认筛选日期
        findRecentlyArchiveDate(isInit,noSetMonth){
            let _this = this
            if(this.gdTime != '-1'){
                if(this.gdType == '1'){ // 未月结
                    // 拼接未月结时间点。为某个月最后一天的23:59:59。
                    // 注意，未月结要在归档节点上加1000毫秒。这样拿到下个月的一号
                    let _gdTime = new Date(new Date(this.gdTime).getTime() + 1000)
                    let _gdTimeStrYear = _gdTime.getFullYear()
                    let _gdTimeStrMonth = _gdTime.getMonth() + 1
                    let _gdTimeStr = _gdTimeStrYear + '-' + (_gdTimeStrMonth < 10 ? '0' + _gdTimeStrMonth : _gdTimeStrMonth)
                    //设置未月结月份可选范围
                    this.options3 = noGdMonth(_this, _gdTimeStr, 'DatePicker',Number(this.calendarConfig.maxMonthInterval))
                    
                    // if(!noSetMonth){
                        let months = this.GLR.month[0] ? this.GLR.month : defaultDatePickerValue(this.calendarConfig.maxMonthInterval)
                        if(new Date(months[0]).getTime() < new Date(_gdTimeStr).getTime()){
                            // 判断开始月份是否超过了归档点。超过修改开始月份为归档点（加1000后的归档点）
                            months[0] = new Date(_gdTimeStr)
                        }
                        this.GLR.month = months
                    // }
                } else { // 已月结
                    // 拼接已月结时间点。为某个月最后一天的23:59:59。
                    // 注意，这里不需要加1000
                    let _gdTime = new Date(new Date(this.gdTime).getTime())
                    let _gdTimeStrYear = _gdTime.getFullYear()
                    let _gdTimeStrMonth = _gdTime.getMonth() + 1
                    let _gdTimeStr = _gdTimeStrYear + '-' + (_gdTimeStrMonth < 10 ? '0' + _gdTimeStrMonth : _gdTimeStrMonth)
                    //设置已月结月份可选范围
                    this.options3 = hasGdMonth(_this, _gdTimeStr, 'DatePicker',Number(this.calendarConfig.maxMonthInterval))
                    
                    // if(!noSetMonth){
                        let months = this.GLR.month[0] ? this.GLR.month : defaultDatePickerValue(this.calendarConfig.maxMonthInterval)
                        if((new Date(months[0]).getTime() < new Date(_gdTimeStr).getTime()) && (new Date(months[1]).getTime() < new Date(_gdTimeStr).getTime())){
                            // 开始月份、结束月份 都比归档点超前，无需修改
                        } else if((new Date(months[0]).getTime() < new Date(_gdTimeStr).getTime()) && (new Date(months[1]).getTime() < new Date(_gdTimeStr).getTime())){
                            // 开始月份超前。但结束月份比归档点晚。 则设置结束月份为归档点
                            months[1] = new Date(_gdTimeStr)
                        } else {
                            // 如果开始月份、结束月份都比结束月份晚。则修改结束点为归档点，开始点为结束点 减去 配置月份跨度数
                            let dateStart = new Date(_gdTimeStr)
                            let dateEnd = new Date(_gdTimeStr)
                            months[1] = dateEnd
                            dateStart.setMonth(dateStart.getMonth() - (Number(this.calendarConfig.maxMonthInterval) -1))
                            months[0] = dateStart
                        }
                        this.GLR.month = months
                    // }
                }
            } else {
                // 只有未月结数据
                this.gdType = '1'
                
                this.options3 = MonthrangeOpt(this,'DatePicker',Number(this.calendarConfig.maxMonthInterval))
                // if(!noSetMonth){
                    if(this.GLR.month && this.GLR.month[0]){
                        //有选中的月份。无需修改
                    } else {
                        this.GLR.month = defaultDatePickerValue(this.calendarConfig.maxMonthInterval)
                    }
                // }
            }
            if(isInit){
                this.getShowTitle(noSetMonth);
            }
        },
        getTreeDatas() {
            this.updateLoadingStatus({ isLoading: true });
            sysUser
                .dataScopeFilterTree()
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        if (Array.isArray(res.data.data.children)) {
                            let officeIdList = res.data.data.children;
                            this.parentOfficeId = officeIdList[0].id;
                            titleTransformationToLabel(officeIdList);
                            this.ininOfficeIdList = JSON.parse(JSON.stringify(officeIdList));
                            // this.GLR.officeIdList = res.data.data.children;
                            waitUntil(
                                () => {
                                    return (this.app.currOfficeId && this.calendarConfig.maxMonthInterval) || false;
                                },
                                () => {
                                    this.initOffice();
                                }
                            );
                        }
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    // this.updateLoadingStatus({ isLoading: false });
                });
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
                    joinTable: 'com_student',
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
                    joinTable: 'com_student',
                    secondField: 'name',
                    joinTableSearchParam: query
                };
                sysCommonSql
                    .queryPageInputInitData(obj)
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            //                            console.log(res)
                            if (userType == 'student_id') {
                                this.GLR.nameList = res.data.data;
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
            this.pageNo =1
            this.getListData();
        },
        initOffice() {
            if (this.app.currOfficeId == 'all' || this.app.currOfficeId == this.parentOfficeId) {
                this.$set(this.GLR, 'officeIdList', this.ininOfficeIdList);
                this.$set(this.GLR, 'officeId', []);
                this.$nextTick(() => {
                    this.$forceUpdate();
                    this.getArchiveDate()
                });
            } else {
                let resultSelectObj = {};
                getSelectTreeDataByid(this.ininOfficeIdList, resultSelectObj);
                let resultIdsObj = {};
                getSelectIdsByid(this.ininOfficeIdList, resultIdsObj);
                this.$set(this.GLR, 'officeIdList', [resultSelectObj[this.app.currOfficeId]]);
                this.$set(this.GLR, 'officeId', resultIdsObj[this.app.currOfficeId]);
                this.$nextTick(() => {
                    this.$forceUpdate();
                    this.getArchiveDate()
                });
            }
        },
        reset() {
            this.GLR.month = []
            this.GLR.name = '';
            this.GLR.enName = '';
            this.GLR.grade = '';
            this.GLR.type = '';
            this.GLR.leftStartHour = '';
            this.GLR.leftEndHour = '';
            
            this.tableData = [];
            this.gdType = '1'
            this.total = 0
            this.pageNo = 1
            this.initOffice();
        },
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
                    // this.updateLoadingStatus({ isLoading: false });
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
                    // this.updateLoadingStatus({ isLoading: false });
                });
        },
        getShowTitle(noSearch) {
            let param = {};
            if (this.currentTab == "0") {
                param = {
                    pageIdentifier: 'rptRemainClassesStudentCollectVO',
                    voName: 'RptRemainClassesStudentCollectVO'
                };
            } else if (this.currentTab == "1") {
                param = {
                    pageIdentifier: 'rptRemainClassesCourseCollectVO',
                    voName: 'RptRemainClassesCourseCollectVO'
                };
            }
            report.rptRemainGetShowTitle(param)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.defaultShowCol = res.data.data;
                        this.storageDataObj[this.currentTab].defaultShowCol = res.data.data
                        if (!noSearch) {
                            this.getListData();
                        }
                    }
                })
                .catch(errors.call(this));
        },
        getListData() {
            this.updateLoadingStatus({ isLoading: true });
            let param = {};
            let myQuest;
            param.officeIds = this.GLR.officeId
            param.name = this.GLR.name;
            param.enName = this.GLR.enName;
            param.grade = this.GLR.grade;
            param.type = this.GLR.type;
            param.startTime = new Date(this.GLR.month[0]).format("yyyy-MM-01 00:00:00")
            param.endTime = getMonthEndDay(new Date(this.GLR.month[1]).format("yyyy-MM"));
            param.pageSize = this.pageSize || 10
            param.pageNo = this.pageNo
            param.archiveStatus = this.gdType
            if (this.currentTab == "0") {
                myQuest = report.findRemainClassCollect;
            } else if (this.currentTab == "1") {
                myQuest = report.findRemainClassCourse;
                param.signOfficeIds = this.GLR.signOfficeIds
            }
            myQuest(param).then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let result = res.data.data;
                        // if(this.currentTab == "0"){ // 汇总
                        //     this.tableData = result;
                        // } else {
                            this.total = Number(result.total)
                            this.tableData = result.list;
                        // }
                        this.storageDataObj[this.currentTab].data = this.tableData;
                        let _data = Object.assign({},this.GLR)
                        _data.gdType = this.gdType
                        // if(this.currentTab == "1"){ // 明细
                            _data.total = Number(this.total)
                            _data.pageNo = Number(this.pageNo)
                            _data.pageSize = Number(this.pageSize)
                        // }
                        this.storageDataObj[this.currentTab].searchObj =_data
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        changeTableType(val) {
            this.currentTab = val;
            this.pageNo =1
            this.tableColumnArray = []
            // if(val == '1'){
            //     this.hasPage = true
            // } else {
            //     this.hasPage = false
            // }
            if (this.storageDataObj[this.currentTab].data) {
                this.defaultShowCol = this.storageDataObj[this.currentTab].defaultShowCol
                this.tableData = this.storageDataObj[this.currentTab].data;
                let searchObj = this.storageDataObj[this.currentTab].searchObj;
                console.log(searchObj,"searchObj~~~~~~``")
                if (searchObj) {
                    // this.GLR = searchObj;
                    this.GLR.month = searchObj.month;
                    this.GLR.name = searchObj.name;
                    this.GLR.enName = searchObj.enName;
                    this.GLR.grade = searchObj.grade;
                    this.GLR.type = searchObj.type;
                    this.total = searchObj.total
                    this.pageNo = searchObj.pageNo
                    this.pageSize = searchObj.pageSize
                    this.gdType = searchObj.gdType
                }
                this.findRecentlyArchiveDate(false,true)
            } else {
                this.tableData = [];
                this.GLR.month = []
                // this.GLR.officeIds = []
                this.gdType = '1'
                this.total = 0
                this.pageNo = 1
                this.findRecentlyArchiveDate(true,false)
            }
        },
        leftStartHourBlur() {
            if (!this.GLR.leftEndHour) {
                this.GLR.leftEndHour = Infinity;
            } else if (this.GLR.leftEndHour < this.GLR.leftStartHour) {
                this.GLR.leftEndHour = this.GLR.leftStartHour;
            } else {
            }
        },
        leftEndHourBlur() {
            if (!this.GLR.leftStartHour) {
                this.GLR.leftStartHour = 0;
            } else if (this.GLR.leftEndHour < this.GLR.leftStartHour) {
                this.GLR.leftStartHour = this.GLR.leftEndHour;
            } else {
            }
        },
        export() {
            this.exportMonth = [].concat(this.GLR.month)
            this.exportMonthModal = true
        },
    },
    watch: {
        'app.currOfficeId': function(val, oldVal) {
            if (oldVal && this.$route.name == 'report.studentRemainClassReport') {
                this.pageNo = 1
                this.initOffice();
            }
        }
    }
};
</script>
