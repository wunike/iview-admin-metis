<style lang="less">
.reported-courses-container{
    position: relative;
    .my-table {
        width: 100%;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        padding: 0 16px;
        margin-top: 10px;
        .subTypeNameStyle {
            margin-left: 11px;
            .ivu-table-cell {
                margin-left: 11px;
            }
        }
    }
    .searchCollapse {
        .ivu-input-number {
            .ivu-input-number-handler-wrap {
                opacity: 1;
            }
        }
    }
}

.exportIng{
    .ivu-modal-body{
        padding-bottom: 35px;
    }
    .ivu-modal-footer{
        display: none;
    }
}
</style>
    
<template>
<div class="reported-courses-container">
    <v-search-collapse @search="doSearch" @reset="resetSearch" @changeDivHeight="changeDivHeight" class="searchCollapse">
        <DatePicker v-model="signTime"
            type="daterange"
            @on-change="signTimeChange"
            placement="bottom-start"
            separator=" ~ "
            :placeholder="$t('modules_spoc_crm_web_src_views_transferintroductionmanagement_index_1975')"
            style="width:224px;">
        </DatePicker>
        <Select v-model="params.signOfficeId" style="width: 224px;" clearable :placeholder="$t('modules_spoc_crm_web_src_views_customermanagement_index_1262')">
            <Option v-for="item in officeLists" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
        <Select v-model="params.stuOfficeId" style="width: 224px;" clearable :placeholder="$t('modules_spoc_sign_web_src_views_reportedcourses_index_7222')">
            <Option v-for="item in officeLists" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
        <Input v-model="params.stuName" :placeholder="$t('memberlist_memberlist_257')"/>
        <Select v-model="params.status" clearable :placeholder="$t('pushsettings_index_496')">
            <Option v-for="item in com_student_course_rel_status" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Input v-model="params.ctNo" :placeholder="$t('modules_spoc_sign_web_src_views_approval_approvalnew_5071')"/>
        <Input v-model="params.courseName" :placeholder="$t('modules_spoc_sign_web_src_views_reportedcourses_index_7226')"/>
        <DatePicker v-model="validDateUnit"
            type="daterange"
            @on-change="validDateUnitChange"
            placement="bottom-start"
            separator=" ~ "
            :placeholder="$t('modules_spoc_sign_web_src_views_pactdetails_pactdetails_6923')"
            style="width:224px;">
        </DatePicker>
    </v-search-collapse>
    <big-table v-if="defaultShowCol"
        class="my-table"
        :tableName="tableName"
        :tableData="tableData"
        :tableColumnArray="tableColumnArray"
        :defaultShowCol="defaultShowCol"
        :canSelection="true"
        :dataTotal="dataTotal"
        :btnList="btnList"
        :pageNo="pageNo"
        :updateShowTitleMethod="updateShowTitle"
        :tableHeightOut="tableHeightOut"
        :updateShowTitleKey="updateShowTitleKey"
        @resetDefault="resetDefaultCol"
        @changeTableType="changeTableType"
        @selectionChange="selectionChange"
        @pageChange="pageChange">
    </big-table>
    <Modal v-model="modal3" width="400" class="exportIng" :closable="false" :mask-closable="false">
        <div>
            <div class="ivu-modal-confirm">
                <div class="ivu-modal-confirm-head">
                    <div class="ivu-modal-confirm-head-icon ivu-modal-confirm-head-icon-info">
                            <i class="ivu-icon ivu-icon-ios-information-circle"></i>
                    </div>
                    <div class="ivu-modal-confirm-head-title">{{$t('modules_spoc_crm_web_src_views_activityenrollment_index_761')}}</div>
                </div>
                <div class="ivu-modal-confirm-body">
                    <div>{{$t('modules_spoc_crm_web_src_views_activityenrollment_index_762')}}</div>
                </div>
            </div>
        </div>
    </Modal>
</div>
</template>

<script>
/**
 ** @author: 曹见芳
 ** 已报课程
 */
import { mapMutations, mapState } from "vuex";
import valid, { errors, sysUser, sysDict, common } from "../../libs/request";
import { waitUntil } from "@public/libs/util";
import util from "@public/libs/js/util";
import bigTable from "@public/modules/bigTable.vue";
import exportModal from "@public/modules/exportModal.vue";
import vSearchCollapse from "@public/modules/vSearchCollapse";
import tableDropdown from '@public/modules/tableDropdown.vue';
export default {
    name: 'sign.reportedCourses',
    components: {
        bigTable,
        exportModal,
        vSearchCollapse,
        tableDropdown,
    },
    data(){
        return {
            exportData: {},
            modal3: false,
            tableHeightOut: 72,
            signTime: [],
            validDateUnit: [],
            params: {
                signOfficeId: '',
                stuOfficeId: '',
                status: '',
                ctNo: '',
                stuName: '',
                courseName: '',
                signTimeStart: '',
                signTimeEnd: '',
                validDateUnitStart: '',
                validDateUnitEnd: '',
            },
            pageNo: 1,
            pageSize: this.$store.state.app.pageSizeGlobal,
            updateShowTitleKey: 'ComStudentCourseRelBasePageVO',
            officeLists: [],
            selection: [],
            defaultShowCol: null,
            tableName: [
                {
                    value: 'lists',
                    name: this.$t('modules_spoc_sign_web_src_views_reportedcourses_index_7230'),
                },
                {
                    value: 'count',
                    name: this.$t('modules_spoc_sign_web_src_views_reportedcourses_index_7231')
                }
            ],
            tableData: [],
            dataTotal: 0,
            updateShowTitle: common.updateShowTitle,
            tableColumnArray: [],
            tab: 'lists',
            com_student_course_rel_status: [],
            btnList:[
                [
                    {
                        style: {},
                        type: '',
                        btnClick: this.isExport,
                        text: this.$t('integralflow_4'),
                        value: '1',
                        parentName: this.$t('integralflow_5')
                    },
                    {
                        style: {},
                        type: '',
                        btnClick: this.isExport,
                        text: this.$t('integralflow_6'),
                        value: '2',
                        parentName: this.$t('integralflow_5')
                    },
                ]
            ]
        };
    },
    computed: {
        ...mapState(["app"]),
    },
    mounted(){
        this.getOfficeLists();
        this.getShowTitle();
        this.batchListData();
        waitUntil(
            () => {
                if (this.app.currOfficeId) this.params.signOfficeId = this.app.currOfficeId;
                return this.app.currOfficeId
            },
            () => {
                this.getListData();
            }
        );
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        resetDefaultCol(){
            this.updateLoadingStatus({ isLoading: true });
            let params
            if(this.tab == 'lists') {
                params = {
                    pageIdentifier: 'ComStudentCourseRelBasePageVO'
                }
            } else {
                params = {
                    pageIdentifier: 'ComStudentCourseRelTotalPageVO'
                }
            }
            common.clearShowField(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.getShowTitle(true);
                } else {
                    this.updateLoadingStatus({ isLoading: false });
                }
            })
            .catch(errors.call(this))
            .finally(() => {

            });
        },
        isExport(val){
            let params = this.exportData
            if (val == "2") {
                if (!this.selection.length) {
                    this.$Message.error(this.$t('scoretemplate_scoretemplate_572'));
                    return;
                }
                params = {
                    ids: this.selection.map(item => {
                        return item.id;
                    })
                };
            }
            this.modal3 = true
            common.comStudentCourseRelExport(params)
			.then(valid.call(this))
			.then(res => {
				if (res.data) {
                    util.blobDownload(res)
				}
			})
			.catch(errors.call(this))
			.finally(() => {
                setTimeout(()=>{
                    this.modal3 = false
                },1000)
			});
        },
		changeDivHeight(height) {
			this.tableHeightOut = height;
        },
        signTimeChange(date) {
            this.params.signTimeStart = date[0] ? date[0] + " 00:00:00" : "";
            this.params.signTimeEnd = date[1] ? date[1] + " 23:59:59" : "";
        },
        validDateUnitChange(date) {
            this.params.validDateUnitStart = date[0] ? date[0] + " 00:00:00" : "";
            this.params.validDateUnitEnd = date[1] ? date[1] + " 23:59:59" : "";
        },
        getOfficeLists() {
            sysUser.dataScopeFilter()
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.officeLists = res.data.data;
                }
            })
            .catch(errors.call(this))
        },
        batchListData() {
            // 获取字典项
            let types = [
                'com_student_course_rel_status', // 类型
            ]
            sysDict.batchListData({types: types.join(',')})
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    let _data = res.data.data;
                    this.com_student_course_rel_status = _data.com_student_course_rel_status;
                }
            })
            .catch(errors.call(this))
        },
        getListData() {
            // 获取data
            this.updateLoadingStatus({ isLoading: true });
            if(!this.params.stuOfficeId){
                this.params.stuOfficeId = ''
            }
            this.exportData = JSON.parse(JSON.stringify(this.params))
            let params = Object.assign({}, this.params);
            params.pageNo = this.pageNo;
            params.pageSize = this.pageSize;
            if(this.tab == 'lists') {
                common.comStudentCourseRelbaseListPage(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let result = res.data.data;
                        this.tableData = result.list;
                        this.dataTotal = result.total;
                    } else {
                        this.tableData = [];
                        this.dataTotal = 0;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
            } else {
                common.comStudentCourseReltotalListPage(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let result = res.data.data;
                        this.tableData = result.list;
                        this.dataTotal = result.total;
                    } else {
                        this.tableData = [];
                        this.dataTotal = 0;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
            }
        },
        //可选方法，如果是多选的话必须有
        selectionChange(selection) {
            this.selection = selection;
        },
        //分页方法 如果有分页则为必须方法，修改getCourseList为自己的获取数据方法 这里注意。不再有每页个数改变的方法了
        pageChange(pageNo, pageSize) {
            if (!pageNo) {
                //防止无用重复请求
                return;
            }
            this.pageNo = pageNo;
            this.pageSize = pageSize;
            this.getListData();
        },
        //必须方法，获取默认显示的可选列  接口根据需要自行更换，每个模块的接口是不一致的
        getShowTitle(closeLoad) {
            let params = {};
            if(this.tab == 'lists') {
                params = {
                    pageIdentifier: 'ComStudentCourseRelBasePageVO',
                    voName: 'com.windliven.spoc.modules.student.vo.ComStudentCourseRelBasePageVO',
                }
            } else {
                params = {
                    pageIdentifier: 'ComStudentCourseRelTotalPageVO',
                    voName: 'com.windliven.spoc.modules.student.vo.ComStudentCourseRelTotalPageVO',
                }
            }
            common.getShowTitle(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.defaultShowCol = res.data.data;
                }
            })
            .catch(errors.call(this))
            .finally(() => {
                if(closeLoad){
                    this.updateLoadingStatus({ isLoading: false });
                }
            });
        },
        doSearch() {
			this.pageNo = 1;
			this.getListData();
        },
        resetSearch() {
            for (const key in this.params) {
                if (this.params.hasOwnProperty(key) && typeof(this.params[key]) == 'string') {
                    this.params[key] = '';
                }
            }
            this.params.signOfficeId = this.app.currOfficeId;
            this.signTime = [];
            this.validDateUnit = [];
			this.getListData();
        },
        changeTableType(val) {
            this.tab = val;
            if(val == 'lists') {
                // 报读课程记录
                this.updateShowTitleKey = 'ComStudentCourseRelBasePageVO'
            } else {
                // 课耗统计
                this.updateShowTitleKey = 'ComStudentCourseRelTotalPageVO'
            }
            this.getShowTitle();
            this.getListData();
        },
    },
    watch: {
        "app.currOfficeId": function(val, oldVal) {
            if (oldVal) {
                this.params.signOfficeId = this.app.currOfficeId;
                this.getListData();
            }
        }
    }
}
</script>


