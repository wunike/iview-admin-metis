
<style lang="less">
@mainColor: #44bcb7;
.student-grow-up-container {
    position: relative;height: 100%;
    .count {
        background: #fff;margin-bottom: 16px;padding-bottom: 16px;
        ul {
            display: flex;
        }
        li {
            flex: 1;
            padding-top: 21px;
            text-align: center;
        }
        div {
            @h: 26px;
            height: @h;
            line-height: @h;
            font-size: 14px;
        }
        span {
            font-size: 16px;
            line-height: 22px;
        }
    }
    .table-wrapper {
        padding: 10px;
        height: ~"calc(100% - 101px)";
        background: #fff;
        h3 {
            @h: 22px + 24px;
            height: @h;
            line-height: @h;
            font-size: 16px;
        }
    }
    .page-wrapper {
        padding-top: 16px;
        padding-bottom: 16px;
        text-align: center;
    }
}
</style>
    
<template>
    <div class="student-grow-up-container">
        <div class="count">
            <ul>
                <li>
                    <div>{{$t('modules_spoc_crm_web_src_views_customer360_components_studentgrowup_924')}}</div>
                    <span style="color: #FF9F40;">{{getPointsData && getPointsData.point?getPointsData.point:'0'}}</span>
                </li>
                <li>
                    <div>{{$t('modules_spoc_crm_web_src_views_customer360_components_studentgrowup_925')}}</div>
                    <span
                        style="color: #FF9F40;"
                    >{{getPointsData && getPointsData.totalpoint?getPointsData.totalpoint:'0'}}</span>
                </li>
                <li>
                    <div>{{$t('modules_spoc_crm_web_src_views_customer360_components_studentgrowup_926')}}</div>
                    <span>{{getPointsData && getPointsData.avgPoints?getPointsData.avgPoints:'0'}}</span>
                </li>
                <li>
                    <div>{{$t('modules_spoc_crm_web_src_views_customer360_components_studentgrowup_927')}}</div>
                    <span
                        style="color: #44BCB7;"
                    >{{getPointsData && getPointsData.classNum?getPointsData.classNum:'0'}}</span>
                </li>
            </ul>
        </div>
        <div class="table-wrapper">
            <Tabs :value="tabVal" @on-click="clickTabs">
                <TabPane :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentgrowup_928')" name="name1"></TabPane>
                <TabPane :label="$t('modules_spoc_crm_web_src_views_customer360_components_studentgrowup_929')" name="name2"></TabPane>
                <TabPane :label="$t('classroom_evaluation_91')" name="name3"></TabPane>
            </Tabs>
            <Table :columns="columnsFinnally" :height="tableHeight" :data="tableDataFinnally" border></Table>
            <div class="page-wrapper" v-if="pageCountFinnally > 1">
                <Page :current="pageNoFinnally"
                    :total="countFinnally"
                    show-elevator show-total
                    :page-size="pageSizeFinnally"
                    @on-change="pageChangeFinnally">
                </Page>
            </div>
        </div>
    </div>
</template>

<script>
/**
 ** @author: 曹见芳
 ** 客户360 - 客户成长
 */
// import vSearchCollapse from "@public/modules/vSearchCollapse";
// import inputSelect from "@public/modules/inputSelect";
import valid, {
    errors,
    // sysUser,
    // sysDict,
    crmCustomerDetail
} from "../../../libs/request";
import { mapMutations, mapState } from "vuex";
// import { waitUntil } from "@public/libs/util";
export default {
    name: "studentGrowUp",
    props: {
        id: {
            type: String,
            required: true
        }
    },
    watch: {
        id: function(newVal, oldVal) {
			if (this.$route.name == 'crm.customer360') {
				console.log(newVal);
				this.getPoints();
			}
        }
    },
    data() {
        return {
            tabVal: 'name1',
            getPointsData: {},
            pageNo1: 1,//当前页码
            pageCount1: 1,//页码总数
            count1: 0,//数据总数

            pageNo2: 1,//当前页码
            pageCount2: 1,//页码总数
            count2: 0,//数据总数

            pageNo3: 1,//当前页码
            pageCount3: 1,//页码总数
            count3: 0,//数据总数

            tableData1: [],
            tableData2: [],
            tableData3: [],

            columns1: [
                {
                    title: this.$t('courselist_courselist_223'),
                    width:null,
                    resizable:true,
                    key: "courseType"
                },
                {
                    title: this.$t('messagemanagement_index_355'),
                    width:null,
                    resizable:true,
                    key: "courseGrade"
                },
                {
                    title: this.$t('mycourse_mycourse_380'),
                    width:null,
                    resizable:true,
                    key: "className"
                },
                {
                    title: this.$t('modules_spoc_crm_web_src_views_customer360_components_studentgrowup_934'),
                    width:null,
                    resizable:true,
                    key: "curLesson",
                    render: (h, params) => {
						return h(
							"div",{},this.$t('modules_spoc_crm_web_src_views_customer360_components_studentgrowup_935', [params.row.curLesson])
						);
					}
                },
                {
                    title: this.$t('mycourse_mycourse_377'),
                    width:null,
                    resizable:true,
                    key: "attendDate"
                },
                {
                    title: this.$t('courselist_12'),
                    width:null,
                    resizable:true,
                    key: "teacherName"
                },
                {
                    title: this.$t('modules_spoc_crm_web_src_views_customer360_components_studentgrowup_938'),
                    width:null,
                    resizable:true,
                    key: "points"
                },
                {
                    title: this.$t('modules_spoc_crm_web_src_views_customer360_components_studentgrowup_939'),
                    width:null,
                    resizable:true,
                    key: "lessonAvgPoint"
                }
                // {
                //     title: "操作",
                //     key: "doAction",
                //     render: (h, params) => {
                //         return h(
                //             "a",
                //             {
                //                 on: {
                //                     click: () => {
                //                         console.log(params.row);
                //                     }
                //                 }
                //             },
                //             "查看详情"
                //         );
                //     }
                // }
            ],
            columns2: [
                {
                    title: this.$t('modules_spoc_crm_web_src_views_customer360_components_studentgrowup_940'),
                    width:null,
                    resizable:true,
                    key: "createByName"
                },
                {
                    title: this.$t('messagemanagement_index_355'),
                    width:null,
                    resizable:true,
                    key: "courseGrade"
                },
                {
                    title: this.$t('modules_spoc_crm_web_src_views_customer360_components_studentgrowup_934'),
                    width:null,
                    resizable:true,
                    key: "curLesson",
                    render: (h, params) => {
						return h(
							"div",{},this.$t('modules_spoc_crm_web_src_views_customer360_components_studentgrowup_935', [params.row.curLesson])
						);
					}
                },
                {
                    title: this.$t('mycourse_mycourse_377'),
                    width:null,
                    resizable:true,
                    key: "attendDate"
                },
                {
                    title: this.$t('modules_spoc_crm_web_src_views_customer360_components_studentgrowup_941'),
                    width:null,
                    resizable:true,
                    key: "evaluation"
                }
            ],
            columns3: [
                {
                    title: this.$t('modules_spoc_crm_web_src_views_customer360_components_studentgrowup_940'),
                    width:null,
                    resizable:true,
                    key: "createByName"
                },
                {
                    title: this.$t('messagemanagement_index_355'),
                    width:null,
                    resizable:true,
                    key: "courseGrade"
                },
                {
                    title: this.$t('modules_spoc_crm_web_src_views_customer360_components_studentgrowup_934'),
                    width:null,
                    resizable:true,
                    key: "curLesson",
                    render: (h, params) => {
						return h(
							"div",{},this.$t('modules_spoc_crm_web_src_views_customer360_components_studentgrowup_935', [params.row.curLesson])
						);
					}
                },
                {
                    title: this.$t('mycourse_mycourse_377'),
                    width:null,
                    resizable:true,
                    key: "attendDate"
                }
                // {
                //     title: "操作",
                //     key: "doAction",
                //     render: (h, params) => {
                //         return h(
                //             "a",
                //             {
                //                 on: {
                //                     click: () => {
                //                         console.log(params.row);
                //                     }
                //                 }
                //             },
                //             "查看详情"
                //         );
                //     }
                // }
            ],
            columnsFinnally: [],
            tableDataFinnally: [],
            initTableHeight: 300,
            pageNoFinnally: 1,//当前页码
            pageCountFinnally: 1,//页码总数
            pageSizeFinnally: this.$store.state.app.pageSizeGlobal, //每页条数
            countFinnally: 0,//数据总数
            // tableHeight: null,
            mainBodyHeight: null,
            actualHeight: null,
        };
    },
    computed: {
        ...mapState(["app"]),
        tableHeight() {
            let num = 480;
            //未定义高度。并有自适应外部高度时
            // let hasPage = this.pageCountFinnally > 1 ? 65 : 0;
            let hasPage = 65;
            let __maxHeight__ = this.mainBodyHeight - hasPage - 40;
            // console.log(__maxHeight__)
            num = __maxHeight__;
            return num;
        }
    },
    mounted() {
        this.getPoints();
        this.init();
        this.initMainBodyHeight();
        window.onresize = () => {
            this.initMainBodyHeight();
        };
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        initMainBodyHeight() {
            this.mainBodyHeight = document.body.offsetHeight - 104 - 16 * 2 - 72 - 58 - 85 - 16 - 12;
        },
        init() {
            this.columnsFinnally = [...this.columns1];
            this.tableDataFinnally = [...this.tableData1];
        },
        clickTabs(val) {
            if(this.tabVal != val) {
                this.tabVal = val;
                if(val == 'name1') {
                    this.columnsFinnally = [...this.columns1];
                    this.tableDataFinnally = [...this.tableData1];
                    this.pageNoFinnally = this.pageNo1;
                    this.pageCountFinnally = this.pageCount1;
                    this.countFinnally = this.count1;
                } else if(val == 'name2') {
                    this.columnsFinnally = [...this.columns2];
                    this.tableDataFinnally = [...this.tableData2];
                    this.pageNoFinnally = this.pageNo2;
                    this.pageCountFinnally = this.pageCount2;
                    this.countFinnally = this.count2;
                } else if(val == 'name3') {
                    this.columnsFinnally = [...this.columns3];
                    this.tableDataFinnally = [...this.tableData3];
                    this.pageNoFinnally = this.pageNo3;
                    this.pageCountFinnally = this.pageCount3;
                    this.countFinnally = this.count3;
                }
            }
        },
        //分页方法 如果有分页则为必须方法，修改getCourseList为自己的获取数据方法 这里注意。不再有每页个数改变的方法了
        pageChangeFinnally(pageNo) {
            // console.log(pageNo, this.tabVal)
            this.pageNoFinnally = pageNo;
            if(this.tabVal == 'name1') {
                // 积分列表
                this.pageNo1 = pageNo;
                this.getListData1();
            } else if(this.tabVal == 'name2') {
                // 评价列表
                this.pageNo2 = pageNo;
                this.getListData2();
            } else if(this.tabVal == 'name3') {
                // 课堂反馈
                this.pageNo3 = pageNo;
                this.getListData3();
            }
        },
        getListData1() {
            this.updateLoadingStatus({ isLoading: true });
            let param = {
                pageNumber: this.pageNo1,
                pageSize: this.pageSizeFinnally,
                id: this.id
            };
            crmCustomerDetail
                .getRecentLessons(param)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let result = res.data.data;
                        if(result&&result.content){
                            this.tableData1 = result.content;
                            this.count1 = result.total;
                            this.pageCount1 = result.pages;
                            if(this.tabVal == 'name1') {
                                // 积分列表
                                this.countFinnally = result.total;
                                this.pageCountFinnally = result.pages;
                                this.columnsFinnally = [...this.columns1];
                                this.tableDataFinnally = [...this.tableData1];
                            }
                        }
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        getListData2() {
            this.updateLoadingStatus({ isLoading: true });
            let param = {
                pageNumber: this.pageNo2,
                pageSize: this.pageSizeFinnally,
                id: this.id
            };
            crmCustomerDetail
                .getEvalutions(param)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let result = res.data.data;
                        if(result&&result.content){
                            this.tableData2 = result.content;
                            this.pageCount2 = result.pages;
                            this.count2 = result.total;
                            if(this.tabVal == 'name2') {
                                // 积分列表
                                this.countFinnally = result.total;
                                this.pageCountFinnally = result.pages;
                                this.columnsFinnally = [...this.columns2];
                                this.tableDataFinnally = [...this.tableData2];
                            }
                        }
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        getListData3() {
            this.updateLoadingStatus({ isLoading: true });
            let param = {
                pageNumber: this.pageNo3,
                pageSize: this.pageSizeFinnally,
                id: this.id
            };
            crmCustomerDetail
                .getEvalutions(param)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let result = res.data.data;
                        if(result&&result.content){
                            this.tableData3 = result.content;
                            this.count3 = result.total;
                            this.pageCount3 = result.pages;
                            if(this.tabVal == 'name3') {
                                // 积分列表
                                this.columnsFinnally = [...this.columns3];
                                this.tableDataFinnally = [...this.tableData3];
                                this.countFinnally = result.total;
                                this.pageCountFinnally = result.pages;
                            }
                        }
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        getPoints() {
            if(!this.id){
                return
            }
            this.updateLoadingStatus({ isLoading: true });
            let param = {
                id: this.id
            };
            crmCustomerDetail
                .getPoints(param)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let result = res.data.data;
                        this.getPointsData = result;
                        this.getListData1();
                        this.getListData2();
                        this.getListData3();
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        }
    }
};
</script>


