<style lang="less">
.student-1v1-container{
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
        .status{
            @w: 7px;
            position: relative;
            padding-left: 13px;
            &::before{
                content: '';
                position: absolute;left: 0;top: 4px;
                width: @w;height: @w;border-radius: 50%;
                background: #999;
            }
            &.status-green::before{ background: #46BC15; }
            &.status-blue::before{ background: #44BCB7; }
            &.status-orange::before{ background: #FF9300; }
            &.status-red::before{ background: #FF6666; }
        }
    }
    .count-card{
        height: 86px;margin-top: 10px;
        background: #fff;
        li{
            float: left;width: 100% / 4;
            text-align: center;
            padding: 20px;
        }
        span{
            @h: 25px;
            font-size: 18px;
            height: @h;line-height: @h;
        }
        p{
            @h: 17px + 8px;
            height: @h;line-height: @h;
            font-size: 12px;
        }
    }
}
</style>
    
<template>
<div class="student-1v1-container">
    <v-search-collapse @search="doSearch" @reset="resetSearch" @changeDivHeight="changeDivHeight" class="searchCollapse">
        <Select v-model="params.officeId" style="width: 224px;" clearable :placeholder="$t('messagemanagement_index_352')">
            <Option v-for="item in officeLists" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
        <Input v-model="params.name" :placeholder="$t('mycourse_scoreexchage_418')"/>
        <Input v-model="params.name" :placeholder="$t('modules_spoc_crm_web_src_views_renewalwarning_renewalwarning_1637')"/>
        <DatePicker v-model="createTime"
            type="daterange"
            @on-change="createTimeChange"
            placement="bottom-start"
            separator=" ~ "
            :placeholder="$t('modules_spoc_jw_web_src_views_1v1_student_2184')"
            style="width:224px;">
        </DatePicker>
    </v-search-collapse>
    <div class="count-card">
        <ul>
            <li>
                <span style="color: #44BCB7;">281</span>
                <p>{{$t('modules_spoc_jw_web_src_views_1v1_student_2185')}}</p>
            </li>
            <li>
                <span style="color: #FFCB48;">281</span>
                <p>{{$t('modules_spoc_jw_web_src_views_1v1_student_2186')}}</p>
            </li>
            <li>
                <span style="color: #FFCB48;">281</span>
                <p>{{$t('modules_spoc_jw_web_src_views_1v1_student_2187')}}</p>
            </li>
            <li>
                <span style="color: #7C6AF2;">281</span>
                <p>{{$t('modules_spoc_jw_web_src_views_1v1_student_2188')}}</p>
            </li>
        </ul>
    </div>
    <big-table v-if="defaultShowCol"
        class="my-table"
        :tableName="$t('hootie.memberList')"
        :tableData="tableData"
        :tableColumnArray="tableColumnArray"
        :defaultShowCol="defaultShowCol"
        :canSelection="true"
        :dataTotal="dataTotal"
        :btnList="btnList"
        :pageNo="pageNo"
        :updateShowTitleMethod="updateShowTitle"
        :tableHeightOut="tableHeightOut"
        updateShowTitleKey="signinDetail/listPage"
        @selectionChange="selectionChange"
        @pageChange="pageChange">
    </big-table>
    <student-modal ref="studentModal"></student-modal>
</div>
</template>

<script>
/**
 ** @author: 曹见芳
 ** 1v1 学员
 */
import { mapMutations, mapState } from "vuex";
import valid, {
	errors,
	jwClassCourse,
	sysUser,
	sysDict,
	sysAttachment,
	jwManualSign,
	jwLesson,
	common,
	jwClassroom
} from "../../libs/request";
import { waitUntil } from "@public/libs/util";
import bigTable from "@public/modules/bigTable.vue";
import vSearchCollapse from "@public/modules/vSearchCollapse";
import tableDropdown from '@public/modules/tableDropdown.vue';
import studentModal from './components/studentModal.vue';
export default {
    name: 'jw.1v1student',
    components: {
        bigTable,
        vSearchCollapse,
        tableDropdown,
        studentModal
    },
    props: {
        
    },
    data(){
        return {
            tableHeightOut: 72 + 102,
            createTime: [],
            params: {
                officeId: '',
                name: '',
                restHourLow: '',
                restHourHigh: ''
            },
            pageNo: 1,
            pageSize: this.$store.state.app.pageSizeGlobal,
            officeLists: [],
            selection: [],
            defaultShowCol: null,
            tableData: [],
            dataTotal: 0,
            updateShowTitle: jwClassCourse.updateShowTitle,
            // exportMethod: htContract.exportSelectedFile, //导出用到的方法对象
            btnList: [
                {
                    type: '',
                    btnClick: this.addNew,
                    text: this.$t('modules_spoc_jw_web_src_views_1v1_student_2190'),
                },
            ],
            tableColumnArray: [
                {
                    key: 'status',
                    render: (h, params) => {
                        let str = this.$t('modules_spoc_jw_web_src_views_1v1_student_2191');
                        if(params.row.status == '2') str = this.$t('modules_spoc_jw_web_src_views_1v1_student_2192');
                        else if(params.row.status == '3') str = this.$t('modules_spoc_jw_web_src_views_1v1_student_2193');
                        else if(params.row.status == '4') str = this.$t('modules_spoc_jw_web_src_views_1v1_student_2194');
                        else if(params.row.status == '5') str = this.$t('modules_spoc_crm_web_src_views_customer360_components_timetable_coursetimeheader_1047');
                        return h('span', {
                            class: {
                                status: true,
                                'status-green': params.row.status == '1',
                                'status-blue': params.row.status == '2',
                                'status-orange': params.row.status == '4',
                                'status-red': params.row.status == '5',
                            }
                        }, str)
                    }
                },
                {
                    title: this.$t('classlist_compontents_detailinfo_45'),
                    key: "doAction",
                    width: 220,
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "a",
                                {
                                    style: {
                                        marginRight:'8px',
                                    },
                                    on: {
                                        click: () => {
                                            // this.$router.push({
                                            //     name: 'crm.customer360',
                                            //     query:{
                                            //         id: params.row.id
                                            //     }
                                            // });
                                        }
                                    }
                                }, this.$t('modules_spoc_jw_web_src_views_1v1_student_2197')
                            ),
                            h(
                                "a",
                                {
                                    style: {
                                        marginRight:'8px',
                                    },
                                    on: {
                                        click: () => {
                                            this.$refs.studentModal.showTimetableRecordModal(params.row);
                                        }
                                    }
                                }, this.$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2112')
                            ),
                            h(
                                "a",
                                {
                                    style: {
                                        marginRight:'8px',
                                    },
                                    on: {
                                        click: () => {
                                            
                                        }
                                    }
                                }, this.$t('modules_spoc_jw_web_src_views_1v1_student_2199')
                            ),
                            h(
                                "a",
                                {
                                    style: {
                                        marginRight:'8px',
                                    },
                                    on: {
                                        click: () => {
                                            
                                        }
                                    }
                                }, this.$t('principalmailbox_16')
                            ),
                        ]);
                    }
                }
            ],
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
                if (this.app.currOfficeId) this.params.officeId = this.app.currOfficeId;
                return this.app.currOfficeId
            },
            () => {
                this.getListData();
            }
        );
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
		changeDivHeight(height) {
			this.tableHeightOut = height + 102;
        },
        createTimeChange(date) {
            this.params.createDateStart = date[0] ? date[0] + " 00:00:00" : "";
            this.params.createDateEnd = date[1] ? date[1] + " 23:59:59" : "";
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
                'crm_referral', // 转介绍类型
            ]
            sysDict.batchListData({types: types.join(',')})
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    let _data = res.data.data;
                    this.referralTypeLists = _data.crm_referral;
                }
            })
            .catch(errors.call(this))
        },
        getListData() {
            // 获取data
            // this.updateLoadingStatus({ isLoading: true });
            // let params = Object.assign({}, this.params);
            // params.pageNo = this.pageNo;
            // params.pageSize = this.pageSize;
            // jwClassCourse.listPageStudents(params)
            // .then(valid.call(this))
            // .then(res => {
            //     if (res.ok) {
            //         let result = res.data.data;
            //         this.tableData = result.list;
            //         this.dataTotal = result.total;
            //     } else {
            //         this.tableData = [];
            //         this.dataTotal = 0;
            //     }
            // })
            // .catch(errors.call(this))
            // .finally(() => {
            //     this.updateLoadingStatus({ isLoading: false });
            // });
            this.tableData = [
                {
                    code: '9035029',
                    name: this.$t('modules_spoc_jw_web_src_views_1v1_student_2201'),
                    enName: 'Eva Jacobs',
                    phone: '17055265008',
                    officeName: this.$t('modules_spoc_jw_web_src_views_1v1_student_2202'),
                    status: '1',
                    class: this.$t('modules_spoc_jw_web_src_views_1v1_student_2203'),
                    num: '40',
                },
                {
                    code: '3499024',
                    name: this.$t('modules_spoc_jw_web_src_views_1v1_student_2204'),
                    enName: 'Linnie Jones',
                    phone: '15682083105',
                    officeName: this.$t('modules_spoc_jw_web_src_views_1v1_student_2205'),
                    status: '2',
                    class: this.$t('modules_spoc_jw_web_src_views_1v1_student_2206'),
                    num: '40',
                },
                {
                    code: '9035029',
                    name: this.$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2137'),
                    enName: 'Lula Fitzgerald',
                    phone: '13121349005',
                    officeName: this.$t('modules_spoc_jw_web_src_views_1v1_student_2202'),
                    status: '3',
                    class: this.$t('modules_spoc_jw_web_src_views_1v1_student_2203'),
                    num: '40',
                },
                {
                    code: '2457781',
                    name: this.$t('modules_spoc_jw_web_src_views_1v1_student_2208'),
                    enName: 'Ethel Bowman',
                    phone: '15244007100',
                    officeName: this.$t('modules_spoc_jw_web_src_views_1v1_student_2209'),
                    status: '4',
                    class: this.$t('modules_spoc_jw_web_src_views_1v1_student_2206'),
                    num: '40',
                },
                {
                    code: '9035029',
                    name: this.$t('modules_spoc_jw_web_src_views_1v1_student_2210'),
                    enName: 'Timothy Lawrence',
                    phone: '14509010229',
                    officeName: this.$t('modules_spoc_jw_web_src_views_1v1_student_2202'),
                    status: '5',
                    class: 'GRE（Verbal）',
                    num: '40',
                },
            ];
            this.dataTotal = 4;
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
        getShowTitle() {
            // let params = {
            //     pageIdentifier: 'jwClassCourse/listPageStudentVolumes',
            //     voName: 'JwClassCourseStudentVolumesVO'
            // }
            // jwClassCourse.getShowTitle(params)
            // .then(valid.call(this))
            // .then(res => {
            //     if (res.ok) {
            //         this.defaultShowCol = res.data.data;
            //     }
            // })
            // .catch(errors.call(this));
            this.defaultShowCol = {
                true: [
                    {
                        name: "code",
                        title: this.$t('classlist_compontents_detailinfo_34'),
                        selected: true,
                        required: true,
                        percent: false,
                        total: "",
                        filter: "",
                        sort: 0,
                        dynamiced: false,
                    },
                    {
                        name: "name",
                        title: this.$t('classlist_compontents_detailinfo_35'),
                        selected: true,
                        required: true,
                        percent: false,
                        total: "",
                        filter: "",
                        sort: 0,
                        dynamiced: false,
                    },
                    {
                        name: "enName",
                        title: this.$t('classlist_compontents_detailinfo_36'),
                        selected: true,
                        required: true,
                        percent: false,
                        total: "",
                        filter: "",
                        sort: 0,
                        dynamiced: false,
                    },
                    {
                        name: "phone",
                        title: this.$t('classlist_compontents_detailinfo_37'),
                        selected: true,
                        required: true,
                        percent: false,
                        total: "",
                        filter: "",
                        sort: 0,
                        dynamiced: false,
                    },
                    {
                        name: "officeName",
                        title: this.$t('integralflow_15'),
                        selected: true,
                        required: true,
                        percent: false,
                        total: "",
                        filter: "",
                        sort: 0,
                        dynamiced: false,
                    },
                    {
                        name: "status",
                        title: this.$t('modules_spoc_jw_web_src_views_1v1_student_2216'),
                        selected: true,
                        required: true,
                        percent: false,
                        total: "",
                        filter: "",
                        sort: 0,
                        dynamiced: false,
                    },
                    {
                        name: "class",
                        title: this.$t('modules_spoc_jw_web_src_views_1v1_student_2217'),
                        selected: true,
                        required: true,
                        percent: false,
                        total: "",
                        filter: "",
                        sort: 0,
                        dynamiced: false,
                    },
                    {
                        name: "num",
                        title: this.$t('modules_spoc_jw_web_src_views_1v1_student_2218'),
                        selected: true,
                        required: true,
                        percent: false,
                        total: "",
                        filter: "",
                        sort: 0,
                        dynamiced: false,
                    }
                ]
            }
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
			this.officeId = this.app.currOfficeId;
			this.getListData();
		}
    },
    watch: {
        "app.currOfficeId": function(val, oldVal) {
            if (oldVal) {
                this.params.officeId = this.app.currOfficeId;
                this.getListData();
            }
        }
    }
}
</script>


