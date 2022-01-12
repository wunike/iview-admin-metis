<style lang="less">
.checkWorkStyle {
    .checkStyle {
        margin-bottom: 16px;
    }
    .tableNamespan {
        color: #999;
        font-size: 14px;
        font-family: HiraginoSansGB-W3;
        font-weight: normal;
    }
}

.kqMytable {
    margin-top: 16px;
    width: 100%;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    padding: 0 16px;
    .ivu-table .demo-table-info-row td {
        // background-color: #ddd;
        color: #ccc;
    }
    .allTop {
        margin-bottom: 12px;
        display: flex;
        justify-content: space-between;
        .title {
            display: inline-block;
            font-size: 16px;
            color: #495060;
            font-weight: 800;
            margin-top: 32px;
            margin-left: 32px;
        }
        > div:nth-child(2) {
            margin-top: 16px;
        }
    }
}
</style>
<template>
    <div class="checkWorkStyle">
        <detailInfo>
            <!-- <div slot="classtitle">
        <div class="title">
          <span>SH01GGR1A-190302A</span>
          <Button type="success" size="small" style="width:60px;margin-left:16px">{{$t('modules_spoc_crm_web_src_views_transferintroductionmanagement_index_1991')}}</Button>
        </div>
			</div>-->
            <div slot="classDetail">
                <div class="classDetail">
                    <div class="classDetailRow">
                        <span>
                            {{ $t('modules_spoc_jw_web_src_views_classmanage_checkwork_checkwork_2422') }}
                            <span>{{ ClassData.code }}</span>
                        </span>
                        <span>
                            {{ $t('modules_spoc_jw_web_src_views_classmanage_checkwork_checkwork_2423') }}
                            <span>{{ ClassData.officeCodeName }}</span>
                            <!-- <span>{{ClassData.office.name}}</span> -->
                        </span>
                        <span>
                            {{ $t('modules_spoc_jw_web_src_views_classmanage_checkwork_checkwork_2424') }}
                            <span>{{ ClassData.type }}</span>
                        </span>
                    </div>
                    <div class="classDetailRow">
                        <span>
                            {{ $t('modules_spoc_jw_web_src_views_classmanage_checkwork_checkwork_2425') }}
                            <span>{{ ClassData.name }}</span>
                        </span>
                        <span>
                            {{ $t('courselist_compontents_modify_187') }}
                            <span>{{ ClassData.teacherName }}</span>
                        </span>
                        <span>
                            {{ $t('modules_spoc_jw_web_src_views_classmanage_checkwork_checkwork_2427') }}
                            <span>{{ ClassData.grade }}</span>
                        </span>
                    </div>
                    <div class="classDetailRow">
                        <span>
                            {{ $t('modules_spoc_jw_web_src_views_classmanage_checkwork_checkwork_2428') }}
                            <span>{{ ClassData.statusLabel }}</span>
                        </span>
                        <span>
                            {{ $t('modules_spoc_jw_web_src_views_classmanage_checkwork_checkwork_2429') }}
                            <span>{{ ClassData.classroomName }}</span>
                        </span>
                    </div>
                    <div class="classDetailRow">
                        <span>
                            {{ $t('modules_spoc_jw_web_src_views_classmanage_checkwork_checkwork_2430') }}
                            <span>{{ ClassData.beginDate.slice(0, 10) }}</span>
                        </span>
                        <span>
                            {{ $t('modules_spoc_jw_web_src_views_classmanage_checkwork_checkwork_2431') }}
                            <span>{{ ClassData.courseName }}</span>
                        </span>
                    </div>
                </div>
            </div>
        </detailInfo>
        <div class="kqMytable">
            <div class="allTop">
                <div>
                    <span class="title">{{ $t('modules_spoc_jw_web_src_views_classmanage_checkwork_checkwork_2432') }}</span>
                    <span class="tableNamespan">{{ $t('modules_spoc_jw_web_src_views_classmanage_checkwork_checkwork_2433') }}</span>
                </div>
                <div>
                    <!--
							{
					style: {},
					type: "",
					btnClick: this.isPrint,
					text: $t("modules_spoc_jw_web_src_views_classmanage_checkwork_checkwork_2434")
				},
				{
					style: {},
					type: "",
					btnClick: this.isExport,
					text: $t("modules_spoc_jw_web_src_views_classmanage_checkwork_checkwork_2435")
				}
					 -->
                    <Button type="primary" @click="isPrint">{{ $t('modules_spoc_jw_web_src_views_classmanage_checkwork_checkwork_2434') }}</Button>
                    <!-- <Button type="primary" style="margin:0 12px" @click="isExport">{{$t('modules_spoc_jw_web_src_views_classmanage_checkwork_checkwork_2435')}}</Button> -->
                    <Checkbox v-model="single" @on-change="singleChange" style="margin-left:8px">
                        {{ $t('modules_spoc_jw_web_src_views_classmanage_checkwork_checkwork_2436') }}
                    </Checkbox>
                </div>
            </div>
            <Table :columns="tableColumnArray" :data="tableData" :row-class-name="rowClassName"></Table>
        </div>
        <!-- <big-table
			v-if="defaultShowCol"
			class="mytable"
			:showPage="false"
			:rowClassName="rowClassName"
			:tableHeightOut="tableHeightOut"
			:tableData="tableData"
			:tableColumnArray="tableColumnArray"
			:defaultShowCol="defaultShowCol"
			:btnList="btnList"
			:canSelection="false"
			:updateShowTitleMethod="updateShowTitle"
			:isShowSelectTableColumn="false"
		>
			<div slot="tableNameSlot">{{$t('modules_spoc_jw_web_src_views_classmanage_checkwork_checkwork_2432')}}<span class="tableNamespan">{{$t('modules_spoc_jw_web_src_views_classmanage_checkwork_checkwork_2433')}}</span>
			</div>

			<span slot="buttonsAfterSlot">
				<Checkbox v-model="single" @on-change="singleChange">{{$t('modules_spoc_jw_web_src_views_classmanage_checkwork_checkwork_2436')}}</Checkbox>
			</span>
		</big-table> -->
        <export-modal ref="exportModal" :exportMethod="exportMethod"></export-modal>
    </div>
</template>
<script>
import { mapMutations } from 'vuex';
import util from '@public/libs/js/util';
// import bigTable from "@public/modules/bigTable.vue";
import exportModal from '@public/modules/exportModal.vue';
import vSearchCollapse from '@public/modules/vSearchCollapse';
import valid, { errors, jwClassCourse, jwAttendance } from '../../../libs/request';
import tableDropdown from '@public/modules/tableDropdown';
import detailInfo from './compontents/detailInfo';
import tableTooltip from './compontents/tableTooltip';
import { constants } from 'crypto';
import channelNum from './compontents/channelNum';
export default {
    name: 'jw.classManage.checkWork',
    components: {
        // bigTable,
        exportModal,
        vSearchCollapse,
        // tableDropdown,
        tableTooltip,
        detailInfo,
        channelNum
    },
    mounted() {
        // this.getListData();
        this.ClassGetData({
            id: this.$route.query.id
        });
    },
    data() {
        return {
            tableHeightOut: 135, //324,
            ClassData: {
                id: '', //编号
                name: '', //课程名字
                statusLabel: '', //状态
                classroomName: '', //教室
                beginDate: '', //开班日期
                courseName: '', //所属课程
                //
                office: {
                    name: ''
                }, //教室名字
                teacherName: '', //授课老师
                type: '', //课程分类：关联字典表：jw_course_type
                grade: '' //年级
            },
            single: false,
            selection: [],
            updateShowTitle: jwClassCourse.updateShowTitle,
            exportMethod: jwClassCourse.exportNameList, //导出用到的方法对象
            defaultShowCol: null,
            sortObj: {},
            // tableColumnArray:[],
            tableColumnArray: [
                {
                    title: this.$t('courselist_compontents_detailinfo_160'),
                    key: 'id',
                    minWidth: 100,
                    fixed: 'left'
                },
                {
                    title: this.$t('classlist_compontents_detailinfo_34'),
                    key: 'studentCode',
                    minWidth: 150,
                    fixed: 'left',
                    tooltip: true
                },
                {
                    title: this.$t('classlist_compontents_detailinfo_35'),
                    key: 'studentName',
                    fixed: 'left',
                    minWidth: 100,
                    tooltip: true
                },
                {
                    title: this.$t('pushsettings_index_496'),
                    fixed: 'left',
                    key: 'studentCourseStatusLabel',
                    minWidth: 120,
                    tooltip: false,
                    render: (h, params) => {
                        /*
						刘亮(Robert Liu) 12-26 14:19:56
这一列取值逻辑：
isStudying=0已退班，
isStudying=1的时候取studentCourseStatusLabel的值，
isStudying=0 || studentCourseStatus=quit || studentCourseStatus=finish 行置灰

刘亮(Robert Liu) 12-26 14:22:24
置灰再加一个studentCourseStatus=stop
						*/
                        let studentCourseStatus = '';
                        if (params.row.studentCourseStatus == 'ready') {
                            studentCourseStatus = 'error';
                        } else if (params.row.studentCourseStatus == 'start' || params.row.studentCourseStatus == 'doing') {
                            studentCourseStatus = 'success';
                        } else if (params.row.studentStatus == 'finish' || params.row.studentCourseStatus == 'stop' || params.row.studentCourseStatus == 'quit') {
                            studentCourseStatus = 'default';
                        } else if (params.row.studentCourseStatus == 'finish') {
                            studentCourseStatus = 'warning';
                        }
                        if (params.row.isStudying == '0') {
                            studentCourseStatus = 'default';
                        }
                        return h('div', [
                            h('Badge', {
                                props: {
                                    status: studentCourseStatus
                                }
                            }),
                            params.row.studentCourseStatusLabel,
                            h(tableTooltip, {
                                props: {
                                    tableData: params.row.detailVOList
                                }
                            })
                        ]);
                    }
                    /*       ready 未入班
start 已入班
doing 上课中
stop 停课
finish 已结课
refunded 已退费 */
                    // 未入班：#999     上课中：#44bcb7   已退班：#ff9300    停课：#ff3000    结课：#ccc（列表内文字颜色也为#ccc）
                }
            ],
            tableData: [],
            btnList: [
                // {
                //   style: {},
                //   type: "",
                //   btnClick: this.sendClassNotice,
                //   text: "发送课程通知"
                // },
                {
                    style: {},
                    type: '',
                    btnClick: this.isPrint,
                    text: '导出点名表'
                },
                {
                    style: {},
                    type: '',
                    btnClick: this.isExport,
                    text: '导出考勤记录'
                }
            ]
        };
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        /*    jwAttendance() {
			  let params={
			    name:this.ClassData.name
			  }
			  //顶部详情数据
			  jwAttendance
			    .listPage()
			    .then(valid.call(this))
			    .then(res => {
			      if (res.ok) {
			        this.tableData = res.data.data;
			      }
			    })
			    .catch(errors.call(this))
			    .finally(() => {
			      this.updateLoadingStatus({ isLoading: false });
			    });
			}, */
        rowClassName(row, index) {
            // if (row.isStudying == "0"||row.studentCourseStatus == "stop" || row.studentCourseStatus == "finish"||row.studentCourseStatus == "quit") {
            if (row.isStudying == '0' || row.studentCourseStatus == 'stop') {
                return 'demo-table-info-row';
            }
            return '';
        },
        singleChange() {
            this.getListData();
        },
        ClassGetData(id) {
            //顶部详情数据
            this.updateLoadingStatus({
                isLoading: true
            });
            jwClassCourse
                .form(id)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        // debugger;
                        this.ClassData = res.data.data;
                        this.getListData();
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    // this.updateLoadingStatus({
                    // 	isLoading: false
                    // });
                });
        },
        changeTableType(val) {
            console.log(val);
        },
        //获取数据，根据情况修改接口、传参
        getListData() {
            // debugger;
            this.updateLoadingStatus({
                isLoading: true
            });
            this.currentPage = this.pageNo;
            let param = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                classId: this.$route.query.id,
                pastFlag: this.single ? '1' : '0',
                officeId: this.$route.query.officeId ? this.$route.query.officeId : this.ClassData.office.id
            };
            jwAttendance
                .listClassStudentAttendance(param)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.tableData = res.data.data;
                        let order = 0;
                        this.tableData.forEach(item => {
                            order++;
                            item.id = order;
                        });
                        this.getShowTitle();
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({
                        isLoading: false
                    });
                });
        },
        getShowTitle() {
            this.tableColumnArray = this.tableColumnArray.slice(0, 4);
            this.ClassData.jwLessonList.filter((list, order) => {
                this.tableColumnArray.push({
                    title: list.teacherName,
                    key: order + list.teacherId,
                    minWidth: 120,
                    align: 'center',
                    tooltip: true,
                    renderHeader: (h, params) => {
                        return h(
                            'div',
                            {
                                // style:{
                                //     display:'flex',
                                //     'flex-direction': 'column',
                                //     'justify-content': 'flex-start',
                                //     'align-items': 'flex-start',
                                //     height: '50px'
                                // }
                            },
                            [
                                h('div', {}, list.teacherName),
                                h(
                                    'div',
                                    {
                                        props: {},
                                        style: {
                                            display: 'inline-block',

                                            color: '#4494F9',
                                            cursor: 'pointer'
                                        },
                                        on: {
                                            click: () => {
                                                // console.log(list);
                                                this.$router.push({
                                                    name: 'jw.signinDetail',
                                                    query: {
                                                        lessonId: list.id,
                                                        status: list.status
                                                    }
                                                });
                                            }
                                        }
                                    },
                                    list.startTime.substr(5, 5)
                                ),

                                list.sopTaskUnfinishCount > 0
                                    ? h(
                                          'span',
                                          {
                                              style: {
                                                  display: 'inline-block',
                                                  width: '14px',
                                                  height: '14px',
                                                  background: '#FF0000',
                                                  textAlign: 'center',
                                                  lineHeight: '14px',
                                                  color: '#FFF',
                                                  borderRadius: '50%',
                                                  'margin-left': '6px'
                                              }
                                          },
                                          list.sopTaskUnfinishCount
                                      )
                                    : '',
                                list.sopTaskUnfinishCount <= 0 && list.sopTaskTotalCount > 0
                                    ? h(
                                          'Icon',
                                          {
                                              //表格header
                                              style: {
                                                  display: 'inline-block'
                                                  // width:"14px",
                                                  // height:"14px",
                                                  // background:'#FF0000',
                                                  // textAlign:'center',
                                                  // lineHeight:'14px',
                                                  // color:'#FFF',
                                                  // borderRadius:'50%'
                                              },
                                              props: {
                                                  type: 'ios-checkmark-circle',
                                                  color: '#52C41A',
                                                  size: '14'
                                              }
                                          },
                                          ''
                                      )
                                    : ''
                            ]
                        );
                    },
                    render: (h, params) => {
                        let text = '';
                        let bp = false;
                        params.row[order + list.teacherId] = '未考勤';
                        if (params.row.attendanceVOList && params.row.attendanceVOList.length) {
                            params.row.attendanceVOList.filter((val, num) => {
                                if (val.lessonId == list.id) {
                                    if (!bp) {
                                        if (val.status == 'unAttendance') {
                                            params.row[order + list.teacherId] = '未考勤';
                                        } else {
                                            params.row[order + list.teacherId] = val.statusLabel;
                                        }
                                        bp = true;
                                        params.row[order + 'sopTasks'] = val.sopTasks;
                                    }
                                } else {
                                    text = '';
                                }
                            });
                        }
                        let stateText = '';
                        if (params.row[order + list.teacherId] == '已删') {
                            stateText = '/';
                        } else {
                            stateText = params.row[order + list.teacherId];
                        }
                        let nostatusBool = params.row[order + 'sopTasks'].some(function(val, index, arr) {
                            return val.status == '0';
                        });
                        let hasStatusBool = params.row[order + 'sopTasks'].some(function(val, index, arr) {
                            return val.status == '1';
                        });
                        return h('div', [
                            h(
                                'span',
                                {
                                    style: {
                                        marginRight: '3px'
                                    }
                                },
                                stateText
                            ),
                            hasStatusBool && !nostatusBool && stateText != '/'
                                ? h(channelNum, {
                                      //已完成任务
                                      props: {
                                          sopTasks: params.row[order + 'sopTasks'] ? params.row[order + 'sopTasks'] : [],
                                          isOk: '1',
                                          stateText: stateText
                                      },
                                      on: {
                                          click: () => {
                                              // alert('ok')
                                          },
                                          reloadList: () => {
                                              this.ClassGetData({id: this.$route.query.id});
                                            //   this.getListData(); // 完成任务后刷新列表
                                          }
                                      }
                                  })
                                : '',
                            nostatusBool
                                ? h(channelNum, {
                                      //未完成任务
                                      props: {
                                          sopTasks: params.row[order + 'sopTasks'] ? params.row[order + 'sopTasks'] : [],
                                          isOk: '0'
                                      },
                                      on: {
                                          click: () => {
                                              // alert('ok')
                                          },
                                          reloadList: () => {
                                              this.ClassGetData({id: this.$route.query.id});
                                            //   this.getListData(); // 完成任务后刷新列表
                                          }
                                      }
                                  })
                                : ''
                        ]);
                    }
                });
            });
        },
        sendClassNotice() {
            this.$Modal.confirm({
                title: '确认发送课程通知吗?',
                content: '确认后此班课将对所有课程发送课程通知。',
                onOk: () => {},
                onCancel: () => {}
            });
        },
        isPrint() {
            /*  this.tableColumnArray = [
				   {
				     title: "序号",
				     key: "name",
				     fixed: "left"
				   }
				 ]; */

            let param = {
                officeId: this.$route.query.officeId ? this.$route.query.officeId : this.ClassData.office.id,
                ids: [this.$route.query.id],
                pastFlag: this.single ? '1' : '0'
            };
            this.$refs.exportModal.noShowExport(this.exportMethod, param);
            // jwClassCourse
            //     .exportNameList(param)
            //     .then(valid.call(this))
            //     .then(res => {
            //         if (res.ok) {
            //             util.blobDownload(res);
            //         }
            //     })
            //     .catch(errors.call(this))
            //     .finally(() => {});
        },
        isExport(val) {
            let param = {
                officeId: this.$route.query.officeId ? this.$route.query.officeId : this.ClassData.office.id,
                ids: [this.$route.query.id]
            };
            this.$refs.exportModal.noShowExport(this.exportMethod, param);

            // jwClassCourse
            //     .exportNameList(param)
            //     .then(valid.call(this))
            //     .then(res => {
            //         if (res.ok) {
            //             util.blobDownload(res);
            //         }
            //     })
            //     .catch(errors.call(this))
            //     .finally(() => {});

            //这里val的值。是根据设置下拉类型button设定的值来匹配判断
            /*  if (val == "2" && !this.selection.length) {
				   this.$Message.error("请选择要导出的数据");
				   return;
				 }
				 this.tableColumnArray.map(item => {
				   item.name = item.key;
				   if (item.fixed) {
				     item.selected = true;
				   } else {
				     item.selected = false;
				   }
				 });
				 let data = this.tableColumnArray.filter(item => {
				   return item.key != "doAction";
				 });
				 if (val == "2") {
				   //如果是导出所选，需要在这里传递所选对象、或者对象ID，这里根据需要自行处理，并作为搜索参数的一部分传递到导出组件
				   this.searchObj.selection = this.selection;
				 } */
        },
        isImport() {
            alert('导入');
            /*  this.$router.push({
				              name: '',
				              query: {

				              }
				          }) */
        },
        isCreate() {
            this.$router.push({
                name: 'jw.createClass',
                query: {}
            });
        }
    }
};
</script>
