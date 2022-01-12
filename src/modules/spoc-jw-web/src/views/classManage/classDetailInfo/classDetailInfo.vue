<style lang="less">
.classDetailInfoStyle {
    .tableNamespan {
        color: #44bcb7;
        font-size: 16px;
        font-family: HiraginoSansGB-W3;
        font-weight: normal;
    }
    .ivu-table-wrapper {
        overflow: visible !important;
    }
}

.mytable {
    margin-top: 10px;
    width: 100%;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    padding: 0 16px;
    .ivu-table .demo-table-info-row td {
        // background-color: #ddd;
        color: #ccc;
    }
}
</style>
<template>
    <div class="classDetailInfoStyle">
        <detailInfo>
            <div slot="classtitle">
                <div class="title">
                    <span>{{ClassData.name}}</span>
                    <span
                        style="width:60px;margin-left:10px;height:25px;color:#FFF;
            font-size:12px;text-align:center;border-radius:4px;line-height:25px;"
                        :style="{background:backgroundStyle}"
                    >{{ClassData.statusLabel}}</span>
                </div>
            </div>
            <div slot="classDetail">
                <div class="classDetail">
                    <div class="classDetailRow">
                        <span>{{$t('messagemanagement_components_infos_322')}}<span>{{ClassData.grade}}</span>
                        </span>
                        <span>{{$t('courselist_compontents_modify_187')}}<span>{{ClassData.teacherName}}</span>
                        </span>
                    </div>
                    <div class="classDetailRow">
                        <span>{{$t('modules_spoc_jw_web_src_views_classmanage_classdetailinfo_classdetailinfo_2461')}}<span>{{ClassData.memberCount}}</span>
                        </span>
                        <span>{{$t('courselist_compontents_modify_190')}}<span>{{ClassData.assistName}}</span>
                        </span>
                    </div>
                    <div class="classDetailRow">
                        <span style="padding-top:37px">{{$t('courselist_compontents_modify_193')}}<span>{{ClassData.classTeacherName}}</span>
                        </span>
                    </div>
                </div>
            </div>
        </detailInfo>
        <big-table
            v-if="defaultShowCol"
            class="mytable mytableContral"
            :rowClassName="rowClassName"
            :tableData="tableData"
            :updateShowTitleKey="updateShowTitleKey"
            :tableColumnArray="tableColumnArray"
            :defaultShowCol="defaultShowCol"
            :tableHeightOut="tableHeightOut"
            :updateShowTitleMethod="updateShowTitle"
            :dataTotal="dataTotal"
            :isShowSelectTableColumn="true"
            @sortChange="sortChange"
            :pageNo="pageNo"
            @pageChange="pageChange"
            @changeTableType="changeTableType"
        >
            <div slot="tableNameSlot">{{$t('modules_spoc_jw_web_src_views_classmanage_classdetailinfo_classdetailinfo_2464')}}<span class="tableNamespan">{{studyNum}}</span>
            </div>
        </big-table>
    </div>
</template>
<script>
import { mapMutations } from "vuex";
import bigTable from "@public/modules/bigTable.vue";
import vSearchCollapse from "@public/modules/vSearchCollapse";
import valid, { errors, jwClassCourse } from "../../../libs/request";
import detailInfo from "./compontents/detailInfo";
export default {
    name: "jw.classManage.classDetailInfo",
    components: {
        bigTable,
        vSearchCollapse,
        detailInfo
    },
    mounted() {
        this.getShowTitle();
        this.ClassGetData({
            id: this.$route.query.id
        });
    },
    data() {
        return {
            studyNum: 0,
            tableHeightOut: 164, //324,
            updateShowTitleKey: "listPageClassStudent",
            optionsDisableObj: {},
            ClassData: {},
            editIndex: -1,
            single: "",
            selection: [],
            updateShowTitle: jwClassCourse.updateShowTitle,
            defaultShowCol: null,
            dataTotal: 0,
            pageNo: 1,
            pageSize: this.$store.state.app.pageSizeGlobal,
            sortObj: {},
            tableColumnArray: [
                {
                    // title: "学生编号",
                    key: "code",
                    render: (h, params) => {
                        return h(
                            "div",
                            {
                                style: {
                                    "word-break": "break-all"
                                }
                            },
                            params.row.code
                        );
                    }
                },
                {
                    // title: "首课日期",
                    key: "startDate",
                    render: (h, params) => {
                        return h("div", [
                            !(this.editIndex == params.index)
                                ? h(
                                      "a",
                                      {
                                          style: {
                                              color:
                                                  params.row.status == "stop" ||
                                                  params.row.status ==
                                                      "finish" ||
                                                  params.row.status == "quit" ||
                                                  params.row.isStudying == "0"
                                                      ? "#AAA"
                                                      : ""
                                          },
                                          on: {
                                              click: () => {
                                                  /* if (row.status == "stop" || row.status == "finish"||row.status == "quit"||row.isStudying=='0') {
				return "demo-table-info-row";
			} */
                                                  if (
                                                      params.row.status ==
                                                          "stop" ||
                                                      params.row.status ==
                                                          "finish" ||
                                                      params.row.status ==
                                                          "quit" ||
                                                      params.row.isStudying ==
                                                          "0"
                                                  ) {
                                                      return;
                                                  }
                                                  this.editIndex = params.index;
                                              }
                                          }
                                      },
                                      params.row.startDate
                                  )
                                : h("DatePicker", {
                                      props: {
                                          type: "date",
                                          transfer: true,
                                          clearable: false,
                                          confirm: true,
                                          value: params.row.startDate,
                                          options: this.optionsDisableObj
                                      },
                                      style: {
                                          width: "112px"
                                      },
                                      on: {
                                          "on-ok": val => {
                                              this.editIndex = -1;
                                              this.updateStudentFirstTime(
                                                  params.row.ids,
                                                  this.startDate
                                              );
                                          },
                                          "on-clear": () => {
                                              this.editIndex = -1;
                                          },
                                          "on-change": date => {
                                              console.log(
                                                  "params.row:" +
                                                      JSON.stringify(params.row)
                                              );
                                              this.startDate = date;
                                          },
                                          "on-open-change": date => {
                                              this.$nextTick(function() {
                                                  let spanText = document
                                                      .querySelectorAll(
                                                          ".ivu-picker-confirm button"
                                                      )[0]
                                                      .getElementsByTagName(
                                                          "span"
                                                      )[0];
                                                  spanText.innerHTML = this.$t('classroom_allscore_53');
                                              });
                                          }
                                      }
                                  })
                        ]);
                    }
                }
            ],
            tableData: [],
            btnList: []
        };
    },
    computed: {
        backgroundStyle() {
            let status = this.ClassData.status;
            let bg = "";
            switch (status) {
                case "ready":
                    bg = "#01C1B2";
                    break;
                case "doing":
                    bg = "#46BC15";
                    break;
                case "finish":
                    bg = "#CCC";
                    break;
                default:
                    bg = "#CCC";
            }
            return bg;
        }
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        rowClassName(row, index) {
            if (
                row.status == "stop" ||
                row.status == "finish" ||
                row.status == "quit" ||
                row.isStudying == "0"
            ) {
                return "demo-table-info-row";
            }
            return "";
        },
        updateStudentFirstTime(id, startDate) {
            this.updateLoadingStatus({
                isLoading: true
            });
            let params = {
                // classId: classId, //班课编号
                id, //首课日期
                startDate //首课日期
                // studentCourseId: studentCourseId //学员课程编号
            };
            jwClassCourse
                .updateStudentFirstTime(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.$Message.success(this.$t('modules_spoc_crm_web_src_views_customer360_components_studentsource_1028'));
                        this.getListData();
                        // this.ClassData = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({
                        isLoading: false
                    });
                });
        },
        changeTableType(val) {
            console.log(val);
        },
        //在读学员接口
        readingStudentCount() {
            jwClassCourse
                .readingStudentCount({ classId: this.ClassData.id })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.studyNum = res.data.data;
                    }
                });
        },
        ClassGetData(id) {
            jwClassCourse
                .form(id)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.ClassData = res.data.data;
                        console.log(this.ClassData);
                        this.readingStudentCount();
                        this.getListData();
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({
                        isLoading: false
                    });
                });
        },
        //获取数据，根据情况修改接口、传参
        getListData() {
            this.updateLoadingStatus({
                isLoading: true
            });
            this.currentPage = this.pageNo;
            let param = {
                id: this.$route.query.id,
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                officeId: this.$route.query.officeId
                    ? this.$route.query.officeId
                    : this.ClassData.office.id
            };
            if (this.sortObj.order != "normal" && this.sortObj.key) {
                param.orderByType = this.sortObj.key;
                param.orderByStatus = this.sortObj.order == "asc" ? "1" : "2";
            }
            this.searchObj = param; //这里需要给searchObj 赋值，导出数据的时候需要用到
            jwClassCourse
                .listPageClassStudent(param)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.tableData = res.data.data.list;
                        this.dataTotal = res.data.data.total;
                        //首课日期不能要在开班日期之后
                        let val = this.ClassData.beginDate;
                        this.optionsDisableObj = {
                            disabledDate(date) {
                                return (
                                    date &&
                                    date.valueOf() <
                                        new Date(val).getTime() +
                                            (3600 * 24 - 86400000)
                                );
                            }
                        };
                        let index = 1;
                        this.tableData.filter(item => {
                            item.ids = item.id;
                            item.id = index++;
                        });
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({
                        isLoading: false
                    });
                });
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
        //如果有排序字段则为 必须方法，修改getCourseList为自己的获取数据方法
        sortChange(obj) {
            console.log(obj); // {key: "createByName" ,order: "desc"}
            this.sortObj = obj;
            this.getListData();
        },
        //必须方法，获取默认显示的可选列  接口根据需要自行更换，每个模块的接口是不一致的
        getShowTitle() {
            jwClassCourse
                .getShowTitle({
                    pageIdentifier: "listPageClassStudent",
                    voName: "JwClassCourseStudentVO",
                    lang: this.$i18n.locale
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.defaultShowCol = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
        }
    }
};
</script>