<style lang="less">
.course-list-container {
    height: 100%;
    width: 100%;
    .ivu-tabs {
        background: #fff;
        padding-top: 20px;
    }
    .tableNamespan {
        color: #999;
        font-size: 14px;
        font-family: HiraginoSansGB-W3;
        font-weight: normal;
    }
    .approval {
        position: relative;
        color: #495060;
        padding-left: 12px;
        &::before {
            position: absolute;
            display: block;
            content: '';
            width: 4px;
            height: 4px;
            border-radius: 50%;
            left: 0;
            top: 4px;
        }
    }
    .approval-1 {
        .approval;
        &::before {
            background: #06a59b;
        }
    }
    .approval-2 {
        .approval;
        &::before {
            background: #46bc15;
        }
    }
    .approval-3 {
        .approval;
        &::before {
            background: #999999;
        }
    }
    .mytable {
        margin-top: 16px;
        width: 100%;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        padding: 0 16px;
    }
}

.changeModal{
    height: auto;
    // width: calc(~"100% - 208px");
    background: #fff;
    border-radius: 4px;
    padding: 0 16px;
    overflow-y: auto;
    .table-header {
        width: 100%;
        height: 50px;
        background: rgba(250, 250, 250, 1);
        border-bottom: 1px solid #e6e7eb;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        .expand {
            width: 16px;
            height: 100%;
            margin-left: 16px;
            display: flex;
            align-items: center;
            padding-right: 44px;
        }
        .th-1 {
            width: calc(~"(100% - 65px) / 5");
            font-size: 12px;
            font-weight: 500;
            color: rgba(73, 80, 96, 1);
        }
        .spec-item {
            width: 65px;
            font-size: 12px;
            font-weight: 500;
            color: rgba(73, 80, 96, 1);
        }
    }
    .table-body {
        max-height: 400px;
        overflow-y: auto;
        .ivu-table-overflowX {
            overflow-x: hidden;
        }
        .ivu-table-wrapper {
            border-top: 1px solid #e2e2e2;
            border-bottom: none;
        }
        tr {
            td {
                background: #fafafa;
            }
        }
        .padding48 {
            padding-left: 68px;
        }
        .table-item {
            width: 100%;
            height: 50px;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            .expand {
                padding-left: 16px;
                display: flex;
                align-items: center;
                padding-right: 28px;
                img {
                    width: 16px;
                    height: auto;
                    cursor: pointer;
                }
            }
            .ti-1 {
                width: calc(~"(100% - 65px) / 5");
                height: 50px;
                line-height: 50px;
                font-size: 12px;
                font-weight: 400;
                color: rgba(73, 80, 96, 1);
            }
            .spec-item {
                width: 65px;
                position: relative;
                height: 50px;
                line-height: 50px;
                a {
                    margin-right: 16px;
                }
                .si-icon {
                    font-size: 18px;
                    color: #495060;
                    position: absolute;
                    right: 10px;
                    top: 16px;
                    cursor: pointer;
                }
            }
        }
        .button-table {
            border-top: 1px solid #e8e8e8;
            border-bottom: 1px solid #e8e8e8;
        }
        .table-item-content {
            width: 100%;
            border: 1px solid #e8e8e8;
            .sub-table {
                width: 100%;
                height: 50px;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                padding-left: 48px;
                border-bottom: 1px solid #e6e7eb;
                &:nth-last-of-type(1) {
                    border-bottom: none;
                }
                .st-1 {
                    width: calc(~"(100% - 160px) / 4");
                    height: 50px;
                    line-height: 50px;
                    font-size: 12px;
                    font-weight: 400;
                    color: rgba(73, 80, 96, 1);
                    padding-right: 50px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    .do-action {
                        margin-right: 8px;
                        cursor: pointer;
                    }
                }
                .spec-item {
                    width: 160px;
                }
            }
        }
    }
}
</style>

<template>
    <div class="course-list-container">
        <Tabs :value="TabPaneChangeval" @on-click="TabPaneChange" style="margin-bottom:-14px;">
            <TabPane :label="$t('classlist_classlist_1')" name="name1"></TabPane>
            <TabPane :label="$t('classlist_classlist_2')" name="name3"></TabPane>
            <TabPane :label="$t('classlist_classlist_3')" name="name2" v-if="tabParams"></TabPane>
        </Tabs>
        <div v-if="TabPaneChangeval == 'name1' || TabPaneChangeval == 'name2'">
            <vSearchCollapse @search="searchInfo" @reset="resetSearch" @changeDivHeight="changeDivHeight">
                <DatePicker
                    type="daterange"
                    separator=" ~ "
                    @on-change="ClassTimeRangeChange"
                    :value="findObj.ClassTimeRange"
                    v-model="findObj.ClassTimeRange"
                    format="yyyy-MM-dd"
                    split-panels
                    :placeholder="$t('courselist_courselist_221')"
                    style="width:224px;"
                ></DatePicker>
                <Select
                    filterable
                    remote
                    multiple
                    :loading="teacherLoading"
                    :remote-method="teacherRemote"
                    :placeholder="$t('classlist_classlist_4')"
                    v-model="findObj.teacherId"
                    clearable
                    style="width:224px;margin-right:12px;"
                >
                    <Option v-for="item in teacherList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
                <Select
                    filterable
                    remote
                    multiple
                    :loading="classTeacherLoading"
                    :remote-method="classTeacherRemote"
                    :placeholder="$t('classlist_classlist_6')"
                    v-model="findObj.classTeacherId"
                    clearable
                    style="width:224px;margin-right:12px;"
                >
                    <Option v-for="item in classTeacherList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
                <Select :placeholder="$t('classlist_classlist_7')" v-model="findObj.curLesson" clearable style="width:224px;margin-right:12px;">
                    <Option v-for="(item, index) in roomAreaList" :value="index + 1" :key="index + 1">{{ index + 1 }}</Option>
                </Select>
                <DatePicker
                    type="daterange"
                    separator=" ~ "
                    @on-change="serviceAuditCommitTimeChange"
                    :value="findObj.serviceAuditCommitTime"
                    v-model="findObj.serviceAuditCommitTime"
                    format="yyyy-MM-dd"
                    split-panels
                    :placeholder="$t('classlist_classlist_8')"
                    style="width:224px;margin-right:12px;"
                ></DatePicker>
                <DatePicker
                    type="daterange"
                    separator=" ~ "
                    @on-change="teachingAuditCommitTimeChange"
                    :value="findObj.teachingAuditCommitTime"
                    v-model="findObj.teachingAuditCommitTime"
                    format="yyyy-MM-dd"
                    split-panels
                    :placeholder="$t('classlist_classlist_9')"
                    style="width:224px;margin-right:12px;"
                ></DatePicker>
                <DatePicker
                    type="daterange"
                    separator=" ~ "
                    @on-change="auditTimeChange"
                    :value="findObj.auditTime"
                    v-model="findObj.auditTime"
                    format="yyyy-MM-dd"
                    split-panels
                    :placeholder="$t('classlist_classlist_10')"
                    style="width:224px;margin-right:12px;"
                ></DatePicker>
            </vSearchCollapse>
            <big-table
                ref="bigTableRef"
                v-if="defaultShowCol"
                class="mytable"
                :pageNo="pageNo"
                :tableHeightOut="tableHeightOut"
                :tableData="tableData"
                :updateShowTitleKey="updateShowTitleKey"
                :tableColumnArray="tableColumnArray"
                :defaultShowCol="defaultShowCol"
                :canSelection="false"
                :updateShowTitleMethod="updateShowTitle"
                :dataTotal="dataTotal"
                :btnList="btnList"
                @resetDefault="resetDefaultCol"
                @selectionChange="selectionChange"
                @pageChange="pageChange"
            >
                <div slot="tableNameSlot">
                    {{ $t('classlist_classlist_1') }}
                    <!-- 课次列表 -->
                    <span class="tableNamespan">{{ '(' + $t('mycourse_mycourse_372') + ':' + $route.query.myClassName + ')' }}</span>
                </div>
            </big-table>
            <serviceContent v-if="apDetails" @cancel="cancel" ref="serviceRef" @downLoad="downLoad" @success="success" @uploadList="uploadList"></serviceContent>
            <viewStuContent ref="viewStuContentRef" @doAction="doAction"></viewStuContent>
        </div>
        <div v-if="TabPaneChangeval == 'name3'"><memberList :tabName="TabPaneChangeval" ref="memberListRef"></memberList></div>
        <Modal
			:mask-closable="false"
			v-model="changeModal"
			:loading="changeModalLoading"
            width="800"
			:title="$t('spoc_hootie_web_281')"
		>
            <div class="changeModal">
                <div>{{$t('spoc_hootie_web_283')}}:{{changeModalName}}</div>
                <div class="table-header">
                    <div class="expand"></div>
                    <div class="th-1">{{$t('classlist_classlist_7')}}</div>
                    <div class="th-1">{{$t('scoretemplate_scoretemplate_569')}}</div>
                    <div class="th-1">{{$t('scoretemplate_scoretemplate_556')}}</div>
                    <div class="th-1">{{$t('startemplate_index_577')}}</div>
                    <div class="th-1">{{$t('startemplate_index_578')}}</div>
                    <div class="spec-item">{{$t('classlist_compontents_detailinfo_45')}}</div>
                </div>
                <div class="table-body" v-if="modalList.length > 0">
                    <div class="table-item-box" v-for="(item,index) in modalList" :key="index">
                        <div
                            class="table-item"
                            :style="item.expand ? 'border-bottom:none' : 'border-bottom:1px solid #E6E7EB;' "
                        >
                            <div class="expand">
                                <img @click.stop="openItem(item)" src="../../assets/img/collapse.png" v-if="item.expand" />
                                <img @click.stop="openItem(item)" src="../../assets/img/expand.png" v-else />
                            </div>
                            <div class="ti-1">{{item.lesson}}</div>
                            <div class="ti-1">{{item.createByName}}</div>
                            <div class="ti-1">{{formatTime(item.createDate)}}</div>
                            <div class="ti-1">{{item.updateByName}}</div>
                            <div class="ti-1">{{formatTime(item.updateDate)}}</div>
                            <div class="spec-item">
                                <a
                                    style="display:inline-block;"
                                    @click="selectFn(item)"
                                >{{$t('spoc_hootie_web_282')}}</a>
                            </div>
                        </div>
                        <Table
                            v-if="item.expand && item.jxStarTplDetailList.length >0"
                            :show-header="false"
                            :columns="columns1"

                            :data="item.jxStarTplDetailList"
                        ></Table>
                    </div>
                </div>
            </div>
            <div slot="footer">
                <Button  @click="cancelChangeModal">{{$t('courselist_compontents_servicecontent_216')}}</Button>
            </div>
		</Modal>
    </div>
</template>

<script>
import vSearchCollapse from '@public/modules/vSearchCollapse';
import bigTable from '@public/modules/bigTable.vue';
import valid, { errors, sysUser, sysDict, jxLesson, jxClassCourse, jxLessonAudit, jxLessonStudentRel, jxStarTpl } from '../../libs/request';
import { mapMutations, mapState } from 'vuex';
import serviceContent from '../courseList/compontents/serviceContent';
import memberList from '../memberList/memberList.vue';
import viewStuContent from '../myCourse/viewStuContent';
import tableDropdown from '@public/modules/tableDropdown';
export default {
    components: {
        vSearchCollapse,
        bigTable,
        serviceContent,
        tableDropdown,
        viewStuContent,
        memberList
    },
    data() {
        return {
            columns1: [
				{
					title: "infos",
					key: "item",
                    minWidth:130,
					tooltip: true
				},
				{
					title: "enInfos",
					key: "itemEn",
                    minWidth:130,
					tooltip: true,
					className: "padding48"
				},
				{
					title: "remarks",
					key: "remarks",
                    minWidth:130,
					tooltip: true
				},
			],
            modalList: [],
            changeModal: false,
            changeModalLoading: true,
            changeId: '',
            changeModalObj: null,
            changeModalName: '',
            apDetails:false,
            tableHeightOut: 72 + 57, //324,
            tabParams: false,
            arrMax: [],
            orderNum: 0,
            rowNum: -1,
            TabPaneChangeval: 'name1',
            updateShowTitleKey: 'listClassLessonPage',
            teacherLoading: false,
            assistLoading: false,
            classTeacherLoading: false,
            selection: [],
            sortObj: {},
            trurNumberShow: true,
            tableTitle: this.$t('classlist_classlist_1'),
            findObj: {
                ClassTimeRange: [],
                startTime: '',
                endTime: '',
                auditTime: [],
                auditStartTime: '',
                auditEndTime: '',
                serviceAuditCommitTime: [],
                serviceCommitStartTime: '',
                serviceCommitEndTime: '',
                teachingAuditCommitTime: [],
                teachingCommitStartTime: '',
                teachingCommitEndTime: '',
                curLesson: '',
                teacherId: [],
                classTeacherId: []
            },
            jw_course_grade: [],
            roomAreaList: '',
            teacherList: [],
            assistList: [],
            classTeacherList: [],
            jw_course_type: [],
            updateShowTitle: jxLesson.updateShowTitle,
            defaultShowCol: null,
            exportMethod: sysUser.exportData,
            selectedIds: [], //选中的ids
            currentIds: [], //当前页的ids
            pageNo: 1,
            dataTotal: 0, //总数
            pageSize: this.$store.state.app.pageSizeGlobal,
            tableColumnArray: [
                {
                    title: this.$t('spoc_hootie_web_9'),
                    key: 'sendFlag',
                    width: null,
                    // 推送状态 : 0：未推送，1：已推送
                    render: (h, params) => {
                        let text = '';
                        let color = '';
                        if (params.row.sendFlag == 0) {
                            text = this.$t('spoc_hootie_web_10');
                            color = '#999999';
                        } else if (params.row.sendFlag == 1) {
                            text = this.$t('spoc_hootie_web_11');
                            color = '#44BCB7';
                        }
                        return h('div', [
                            h('span', {
                                style: {
                                    width: '6px',
                                    height: '6px',
                                    background: color,
                                    display: 'inline-block',
                                    marginRight: '4px',
                                    borderRadius: '50%'
                                }
                            }),
                            text
                        ]);
                    }
                },
                {
                    title: this.$t('spoc_hootie_web_12'),
                    key: 'auditStatus',
                    width: null,
                    /* 
unsubmit：未提交；unaudit：待审批；agree：已通过；reject：已驳回
*/
                    render: (h, params) => {
                        let text = '';
                        let color = '';
                        if (params.row.auditStatus == 'unsubmit') {
                            text = this.$t('mycourse_mycourse_385');
                            color = '#999999';
                        } else if (params.row.auditStatus == 'unaudit') {
                            text = this.$t('mycourse_mycourse_386');
                            color = '#999999';
                        } else if (params.row.auditStatus == 'agree') {
                            text = this.$t('mycourse_mycourse_387');
                            color = '#44BCB7';
                        } else if (params.row.auditStatus == 'reject') {
                            text = this.$t('mycourse_mycourse_388');
                            color = '#FF3000';
                        }
                        return h('div', [
                            h('span', {
                                style: {
                                    width: '6px',
                                    height: '6px',
                                    background: color,
                                    display: 'inline-block',
                                    marginRight: '4px',
                                    borderRadius: '50%'
                                }
                            }),
                            text
                        ]);
                    }
                },
                {
                    title: this.$t('courselist_compontents_servicecontent_201'),
                    key: 'serviceAuditStatus',
                    width: null,
                    //服务内容 : unsubmit：未提交；unaudit：待审批；agree：已通过；reject：已驳回
                    render: (h, params) => {
                        let text = '';
                        let color = '';
                        if (params.row.serviceAuditStatus == 'unsubmit') {
                            text = this.$t('mycourse_mycourse_385');
                            color = '#999999';
                        } else if (params.row.serviceAuditStatus == 'unaudit') {
                            text = this.$t('mycourse_mycourse_386');
                            color = '#999999';
                        } else if (params.row.serviceAuditStatus == 'agree') {
                            text = this.$t('mycourse_mycourse_387');
                            color = '#44BCB7';
                        } else if (params.row.serviceAuditStatus == 'reject') {
                            text = this.$t('mycourse_mycourse_388');
                            color = '#FF3000';
                        }
                        let admin = this.userInfo.admin;
                        let isAuditer = this.userInfo.roleIdList.indexOf('11') >= 0;
                        return h('div', [
                            h('span', [
                                h('span', {
                                    style: {
                                        width: '6px',
                                        height: '6px',
                                        background: color,
                                        display: 'inline-block',
                                        marginRight: '4px',
                                        borderRadius: '50%'
                                    }
                                }),
                                text
                            ]),
                            this.TabPaneChangeval == 'name1' &&
                            params.row.serviceAuditStatus != 'unsubmit' &&
                            // (admin || this.userInfo.roleIdList.indexOf("6")!=-1||this.userInfo.roleIdList.indexOf("11")!=-1)
                            (admin || this.userInfo.permissions.includes('hootie:jxLesson:view:service'))
                                ? h(
                                      'a',
                                      {
                                          style: {
                                              marginLeft: '16px',
                                              display: 'inline-block'
                                          },
                                          on: {
                                              click: () => {
                                                  this.apDetails = true;
                                                  this.$nextTick(() => {
                                                      this.$refs.serviceRef.showServiceModal(params.row.id, 'seeInfo');
                                                  });
                                              }
                                          }
                                      },
                                      this.$t('courselist_compontents_servicecontent_219')
                                  )
                                : '',
                            // (params.row.auditStatus=='agree')&&(admin|| isAuditer)&& (_this.tableType == 'unAudit')
                            /*   this.TabPaneChangeval == "name2" &&
params.row.serviceAuditStatus == "unaudit" &&
(admin || this.userInfo.roleIdList.indexOf("11")!=-1) */
                            params.row.serviceAuditStatus == 'unaudit' && (admin || isAuditer) && this.TabPaneChangeval == 'name2'
                                ? h(tableDropdown, {
                                      style: {
                                          'margin-left': '10px'
                                      },
                                      props: {
                                          buttonList: [
                                              {
                                                  label: this.$t('spoc_hootie_web_19'),
                                                  key: 'agree'
                                              },
                                              {
                                                  label: this.$t('spoc_hootie_web_20'),
                                                  key: 'reject'
                                              }
                                          ],
                                          actionName: this.$t('spoc_hootie_web_21')
                                      },
                                      on: {
                                          dropFn: key => {
                                              this.audit(params.row.id, key, 'service');
                                          }
                                      }
                                  })
                                : ''
                        ]);
                    }
                },
                {
                    title: this.$t('mycourse_mycourse_389'),
                    key: 'teachingAuditStatus',
                    width: null,
                    // 教学内容 : unsubmit：未提交；unaudit：待审批；agree：已通过；reject：已驳回
                    render: (h, params) => {
                        let text = '';
                        let color = '';
                        if (params.row.teachingAuditStatus == 'unsubmit') {
                            text = this.$t('mycourse_mycourse_385');
                            color = '#999999';
                        } else if (params.row.teachingAuditStatus == 'unaudit') {
                            text = this.$t('mycourse_mycourse_386');
                            color = '#999999';
                        } else if (params.row.teachingAuditStatus == 'agree') {
                            text = this.$t('mycourse_mycourse_387');
                            color = '#44BCB7';
                        } else if (params.row.teachingAuditStatus == 'reject') {
                            text = this.$t('mycourse_mycourse_388');
                            color = '#FF3000';
                        }
                        let viewTeaching = this.userInfo.permissions.indexOf('hootie:jxLesson:view:teaching') != -1;

                        let admin = this.userInfo.admin;
                        return h('div', [
                            h('span', [
                                h('span', {
                                    style: {
                                        width: '6px',
                                        height: '6px',
                                        background: color,
                                        display: 'inline-block',
                                        marginRight: '4px',
                                        borderRadius: '50%'
                                    }
                                }),
                                text
                            ]),
                            this.TabPaneChangeval == 'name1' &&
                            params.row.teachingAuditStatus != 'unsubmit' &&
                            //(admin ||(this.userInfo.roleIdList.indexOf("9")!=-1 || this.userInfo.roleIdList.indexOf("10")!=-1||this.userInfo.roleIdList.indexOf("11")!=-1))
                            (admin || this.userInfo.permissions.includes('hootie:jxLesson:view:teaching'))
                                ? h(
                                      'a',
                                      {
                                          style: {
                                              marginLeft: '16px',
                                              display: 'inline-block'
                                          },
                                          on: {
                                              click: () => {
                                                  this.$refs.viewStuContentRef.viewContentModal = true;
                                                  this.$refs.viewStuContentRef.isEditFn();
                                                  this.$refs.viewStuContentRef.getTeaching(params.row.id, 'classList');
                                              }
                                          }
                                      },
                                      this.$t('courselist_compontents_servicecontent_219')
                                  )
                                : '',
                            this.TabPaneChangeval == 'name2' && params.row.teachingAuditStatus == 'unaudit' && (admin || this.userInfo.roleIdList.indexOf('11') != -1)
                                ? h(tableDropdown, {
                                      style: {
                                          'margin-left': '10px'
                                      },
                                      props: {
                                          buttonList: [
                                              {
                                                  label: this.$t('spoc_hootie_web_19'),
                                                  key: 'agree'
                                              },
                                              {
                                                  label: this.$t('spoc_hootie_web_20'),
                                                  key: 'reject'
                                              }
                                          ],
                                          actionName: this.$t('spoc_hootie_web_21')
                                      },
                                      on: {
                                          dropFn: key => {
                                              this.audit(params.row.id, key, 'teaching');
                                          }
                                      }
                                  })
                                : ''
                        ]);
                    }
                },
                {
                    title: this.$t('classlist_classlist_8'),
                    key: 'serviceAuditCommitTime',
                    width: null,
                    render(h, params) {
                        return h('div', {}, params.row.serviceAuditCommitTime ? params.row.serviceAuditCommitTime : '/');
                    }
                },
                {
                    title: this.$t('classlist_classlist_9'),
                    key: 'teachingAuditCommitTime',
                    width: null,
                    render(h, params) {
                        return h('div', {}, params.row.teachingAuditCommitTime ? params.row.teachingAuditCommitTime : '/');
                    }
                },
                {
                    title: this.$t('classlist_classlist_10'),
                    key: 'auditTime',
                    width: null,
                    render(h, params) {
                        return h('div', {}, params.row.auditTime ? params.row.auditTime : '/');
                    }
                },
                {
                    title: this.$t('classlist_compontents_detailinfo_45'),
                    key: 'doAction',
                    width: 200,
                    fixed: 'right',
                    render: (h, params) => {
                        let admin = this.userInfo.admin;
                        return h(
                            'div',
                            {
                                class: ['doActionClass']
                            },
                            [
                                h(
                                    'a',
                                    {
                                        style: {
                                            display: 'inline-block',
                                            marginLeft: '8px',
                                            marginRight: '8px',
                                            'word-break': 'break-word'
                                        },
                                        on: {
                                            click: () => {
                                                this.$router.push({
                                                    name: 'classRoom',
                                                    query: {
                                                        id: params.row.id,
                                                        from: 'classList',
                                                        classListId: this.$route.query.id
                                                    }
                                                });
                                            }
                                        }
                                    },
                                    this.$t('spoc_hootie_web_28')
                                ),
                                this.TabPaneChangeval == 'name1' &&
                                (params.row.serviceAuditStatus == 'unsubmit' && params.row.isAttendance == 1) &&
                                (admin || this.userInfo.roleIdList.indexOf('6') != -1)
                                    ? h(
                                          'a',
                                          {
                                              style: {
                                                  marginLeft: '8px',
                                                  marginRight: '8px',
                                                  display: 'inline-block',
                                                  'word-break': 'break-word'
                                              },
                                              on: {
                                                  click: () => {
                                                  this.apDetails = true;
                                                  this.$nextTick(() => {
                                                      this.$refs.serviceRef.showServiceModal(params.row.id, 'inToServer');})
                                                  }
                                              }
                                          },
                                          this.$t('mycourse_mycourse_392')
                                      )
                                    : '',
                                this.TabPaneChangeval == 'name1' && params.row.serviceAuditStatus == 'reject' && (admin || this.userInfo.roleIdList.indexOf('6') != -1)
                                    ? h(
                                          'a',
                                          {
                                              style: {
                                                  marginLeft: '8px',
                                                  marginRight: '8px',
                                                  display: 'inline-block',
                                                  'word-break': 'break-word'
                                              },
                                              on: {
                                                  click: () => {
                                                  this.apDetails = true;
                                                  this.$nextTick(() => {
                                                      this.$refs.serviceRef.showServiceModal(params.row.id, 'Modify');
                                                      })
                                                  }
                                              }
                                          },
                                          this.$t('mycourse_mycourse_393')
                                      )
                                    : '',
                                this.TabPaneChangeval == 'name1' &&
                                (params.row.teachingAuditStatus == 'unsubmit' && params.row.isAttendance == 1) &&
                                (admin || (this.userInfo.roleIdList.indexOf('9') != -1 || this.userInfo.roleIdList.indexOf('10') != -1))
                                    ? h(
                                          'a',
                                          {
                                              style: {
                                                  marginLeft: '8px',
                                                  marginRight: '8px',
                                                  display: 'inline-block',
                                                  'word-break': 'break-word'
                                              },
                                              on: {
                                                  click: () => {
                                                      if (Number(params.row.stuProportion.split('/')[0]) <= 0) {
                                                          this.$Modal.warning({
                                                              title: this.$t('classlist_classlist_12'),
                                                              content: this.$t('mycourse_mycourse_400')
                                                          });
                                                          return;
                                                      }
                                                      this.getLessonDetailInfo(params.row.id);
                                                  }
                                              }
                                          },
                                          this.$t('mycourse_mycourse_394')
                                      )
                                    : '',
                                this.TabPaneChangeval == 'name1' &&
                                params.row.teachingAuditStatus == 'reject' &&
                                (admin || (this.userInfo.roleIdList.indexOf('9') != -1 || this.userInfo.roleIdList.indexOf('10') != -1))
                                    ? h(
                                          'a',
                                          {
                                              style: {
                                                  marginLeft: '8px',
                                                  marginRight: '8px',
                                                  display: 'inline-block',
                                                  'word-break': 'break-word'
                                              },
                                              on: {
                                                  click: () => {
                                                      if (Number(params.row.stuProportion.split('/')[0]) <= 0) {
                                                          this.$Modal.warning({
                                                              title: this.$t('classlist_classlist_12'),
                                                              content: this.$t('mycourse_mycourse_400')
                                                          });
                                                          return;
                                                      }
                                                      this.$router.push({
                                                          name: 'hootie.teachPush',
                                                          query: {
                                                              id: params.row.id,
                                                              isReject: 1,
                                                              from: 'hootie.classList',
                                                              isEdit: 1,
                                                              classId: this.$route.query.id
                                                          }
                                                      });
                                                  }
                                              }
                                          },
                                          this.$t('mycourse_mycourse_395')
                                      )
                                    : '',
                                this.TabPaneChangeval == 'name1' && params.row.teachingAuditStatus == 'unsubmit' ? h(
                                    'a',
                                    {
                                        style: {
                                            display: 'inline-block',
                                            marginLeft: '8px',
                                            marginRight: '8px',
                                            'word-break': 'break-word'
                                        },
                                        on: {
                                            click: () => {
                                                this.modalList = []
                                                this.getModal(params.row.courseType, params.row.courseGrade, params.row.id)
                                            }
                                        }
                                    },
                                    this.$t('spoc_hootie_web_281')
                                ):'',
                                this.TabPaneChangeval == 'name2' && params.row.serviceAuditStatus == 'unaudit' && (admin || this.userInfo.roleIdList.indexOf('11') != -1)
                                    ? h(
                                          'a',
                                          {
                                              style: {
                                                  marginLeft: '8px',
                                                  marginRight: '8px',
                                                  display: 'inline-block',
                                                  'word-break': 'break-word'
                                              },
                                              on: {
                                                  click: () => {
                                                  this.apDetails = true;
                                                  this.$nextTick(() => {
                                                      this.$refs.serviceRef.showServiceModal(params.row.id, 'Approval');
                                                      })
                                                  }
                                              }
                                          },
                                          this.$t('mycourse_mycourse_396')
                                      )
                                    : '',
                                this.TabPaneChangeval == 'name2' && params.row.teachingAuditStatus == 'unaudit' && (admin || this.userInfo.roleIdList.indexOf('11') != -1)
                                    ? h(
                                          'a',
                                          {
                                              style: {
                                                  marginLeft: '8px',
                                                  marginRight: '8px',
                                                  display: 'inline-block',
                                                  'word-break': 'break-word'
                                              },
                                              on: {
                                                  click: () => {
                                                      this.$refs.viewStuContentRef.viewContentModal = true;
                                                      this.$refs.viewStuContentRef.isEditFn();
                                                      this.$refs.viewStuContentRef.getTeaching(params.row.id);
                                                  }
                                              }
                                          },
                                          this.$t('mycourse_mycourse_397')
                                      )
                                    : '',
                                this.TabPaneChangeval == 'name2' &&
                                params.row.auditStatus == 'agree' &&
                                params.row.sendFlag == 0 &&
                                (admin || this.userInfo.roleIdList.indexOf('11') != -1)
                                    ? h(
                                          'a',
                                          {
                                              style: {
                                                  marginLeft: '8px',
                                                  marginRight: '8px',
                                                  display: 'inline-block',
                                                  'word-break': 'break-word'
                                              },
                                              on: {
                                                  click: () => {
                                                      this.sendFn(params.row.id);
                                                  }
                                              }
                                          },
                                          this.$t('mycourse_mycourse_398')
                                      )
                                    : ''
                            ]
                        );
                    }
                }
            ],
            tableData: [],
            btnList: [],
            isApproval: false,
            isAdmin: false
        };
    },

    computed: {
        ...mapState(['userInfo', 'app'])
    },
    mounted() {
        this.getShowTitle(); //显示列的数据
        this.baseDataList(); //下拉数据
        this.getTotalLessonCount(); //课次下拉
        if (this.$route.query.name) {
            this.TabPaneChangeval = this.$route.query.name;
            this.getListData(); //表格数据
        } else {
            this.getListData(); //表格数据
        }
        this.getSearchList(9, '');
        this.getSearchList(6, '');
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        cancelChangeModal(){
            this.changeModal = false
        },
        // ok(){
        //     if(!this.changeModalObj){
        //         this.changeModalLoading = false
        //         this.changeModal = true
        //         setTimeout(()=>{
        //             this.changeModalLoading = true
        //         },100)
        //         this.$Message.error(this.$t('spoc_hootie_web_284'))
        //         return false;
        //     } 
        // },
        selectFn(item){
            console.log(item)
            this.changeModalObj = item
            this.changeModalName = item.lesson
            this.$Modal.confirm({
                title: this.$t('scoretemplate_scoretemplate_561'),
                content: this.$t('spoc_hootie_web_285',[item.lesson]),
                onOk: () => {
                    this.updateLoadingStatus({ isLoading: true });
                    jxLessonStudentRel
                        .saveStar({
                            id: this.changeId,
                            jxStarTpl:this.changeModalObj
                        })
                        .then(valid.call(this))
                        .then(res => {
                            if (res.ok) {
                                this.changeModalLoading = false
                                this.changeModal = false
                                setTimeout(()=>{
                                    this.changeModalLoading = true
                                })
                            } else {
                                this.changeModalLoading = false
                                this.changeModal = true
                                setTimeout(()=>{
                                    this.changeModalLoading = true
                                },100)
                            }
                        })
                        .catch(errors.call(this))
                        .finally(() => {
                            this.updateLoadingStatus({ isLoading: false });
                        });
                },
                onCancel: () => {
                }
            });
        },
        openItem(item) {
			if (item.expand) {
				item.expand = !item.expand;
				this.currentGradeObj = {};
			} else {
				this.modalList.forEach((item1, index) => {
					item1.expand = false;
				});
				item.expand = !item.expand;
				// this.currentGradeObj = item;
				// this.createMan = item.isAdmin;
			}
		},
        formatTime(time) {
			let times = new Date(time).format("yyyy-MM-dd hh:mm:ss");
			return times;
		},
        getModal(courseType, courseGrade, id){
            this.changeModal = true
            this.changeModalName = ''
            this.changeModalObj = null
            this.changeId = id
            this.updateLoadingStatus({ isLoading: true });
            jxStarTpl
				.list({
                    pageNumber: 1,
			        pageSize: 100,
			        courseType: courseType,
			        courseGrade: courseGrade
                })
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let list = res.data.data.content;
						list.forEach((item, index) => {
                            item.expand = false;
						});
						this.modalList = list;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
        },
        resetDefaultCol(){
            this.updateLoadingStatus({ isLoading: true });
            jxLesson.clearShowField({
                pageIdentifier: "listClassLessonPage",
            })
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
        //修改内容之后从新更新列表
        changeDivHeight(height) {
            this.tableHeightOut = height + 57;
        },
        doAction() {
            this.getListData();
        },
        getLessonDetailInfo(lessonId) {
            //获取默认的评星模板。并且初始的评星数starNum  为0
            jxLessonStudentRel
                .showStarInfo({
                    lessonId
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        //						console.log(res)
                        if (
                            //根据后台返回字段匹配
                            res.data.message == '展示课堂学员反馈信息成功' ||
                            res.data.message == 'Showcase Student Feedback Is Successful'
                        ) {
                            this.$router.push({
                                name: 'hootie.teachPush',
                                query: {
                                    id: lessonId
                                }
                            });
                        } else {
                            this.$Modal.warning({
                                title: this.$t('classlist_classlist_12'),
                                content: res.data.message
                            });
                        }
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        //推送
        sendFn(id) {
            jxLesson
                .send({ lessonId: id })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.$Message.success(res.data.message);
                        this.getListData();
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        //审批
        audit(id, value, type) {
            this.updateLoadingStatus({ isLoading: true });
            let params = {
                lessonId: id,
                type: type,
                auditStatus: value
            };
            jxLessonAudit
                .audit(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.$Message.success(res.data.message);
                        this.getListData();
                    } else {
                        this.$Message.error(res.data.message);
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        downLoad(id) {
            // console.log(id);
        },
        success() {
            // console.log(this.$t('classlist_classlist_13'));
        },
        uploadList() {
            this.getListData();
        },
        getTotalLessonCount() {
            jxClassCourse
                .getTotalLessonCount({ classId: this.$route.query.id })
                .then(valid.call(this))
                .then(res => {
                    // console.log(res.data.data.totalLesson);
                    this.roomAreaList = Number(res.data.data.totalLesson);
                })
                .catch(errors.call(this))
                .finally(() => {
                    // this.updateLoadingStatus({ isLoading: false });
                });
        },
        TabPaneChange(name) {
            this.TabPaneChangeval = name;
            if (name == 'name3') {
                setTimeout(() => {
                    this.$refs['memberListRef'].TabPaneChange();
                });
            } else if (name == 'name2' || name == 'name1') {
                this.getListData();
            }
        },
        emitGetListData() {
            this.getListData();
        },
        teacherRemote(query) {
            this.getSearchList(9, query);
        },
        classTeacherRemote(query) {
            this.getSearchList(6, query);
        },
        getSearchList(userType, query) {
            if (userType == 9) {
                this.teacherLoading = true;
            } else if (userType == 10) {
                this.assistLoading = true;
            } else if (userType == 6) {
                this.classTeacherLoading = true;
            }
            let obj = {
                roleIds: userType,
                pageSize: 10,
                name: query
            };
            sysUser
                .listDataByRole(obj)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        if (userType == 9) {
                            this.teacherLoading = false;
                            this.teacherList = res.data.data;
                        } else if (userType == 10) {
                            this.assistLoading = false;
                            this.assistList = res.data.data;
                        } else if (userType == 6) {
                            this.classTeacherLoading = false;
                            this.classTeacherList = res.data.data;
                        }
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    // this.updateLoadingStatus({ isLoading: false });
                });
        },
        //获取数据，根据情况修改接口、传参
        getListData() {
            this.updateLoadingStatus({ isLoading: true });
            let param = {
                pageNumber: this.pageNo,
                pageSize: this.pageSize,
                classId: this.$route.query.id
            };
            if (this.sortObj.order != 'normal' && this.sortObj.key) {
                param.orderByType = this.sortObj.key;
                param.orderByStatus = this.sortObj.order == 'asc' ? '1' : '2';
            }
            this.searchObj = param; //这里需要给searchObj 赋值，导出数据的时候需要用到
            if (this.findList) {
                /* 
this.findObj.startTime = val[0];
this.findObj.endTime = val[1];
*/
                param.startTime = this.findObj.startTime ? new Date(this.findObj.startTime + ' 00:00:00').getTime() : '';
                param.endTime = this.findObj.endTime ? new Date(this.findObj.endTime + ' 23:59:59').getTime() : '';
                param.auditStartTime = this.findObj.auditStartTime ? new Date(this.findObj.auditStartTime + ' 00:00:00').getTime() : '';
                param.auditEndTime = this.findObj.auditEndTime ? new Date(this.findObj.auditEndTime + ' 23:59:59').getTime() : '';
                param.serviceCommitStartTime = this.findObj.serviceCommitStartTime ? new Date(this.findObj.serviceCommitStartTime + ' 00:00:00').getTime() : '';
                param.serviceCommitEndTime = this.findObj.serviceCommitEndTime ? new Date(this.findObj.serviceCommitEndTime + ' 23:59:59').getTime() : '';
                param.teachingCommitStartTime = this.findObj.teachingCommitStartTime ? new Date(this.findObj.teachingCommitStartTime + ' 00:00:00').getTime() : '';
                param.teachingCommitEndTime = this.findObj.teachingCommitEndTime ? new Date(this.findObj.teachingCommitEndTime + ' 23:59:59').getTime() : '';
                param.type = this.findObj.type;
                param.grade = this.findObj.grade;
                param.curLesson = this.findObj.curLesson;
                param.teacherIds = this.findObj.teacherId.length ? this.findObj.teacherId.join(',') : '';
                param.classTeacherIds = this.findObj.classTeacherId.length ? this.findObj.classTeacherId.join(',') : '';
            }
            let jxLessonListQuest;
            if (this.TabPaneChangeval == 'name1') {
                jxLessonListQuest = jxLesson.listClassLessonPage;
                this.tableTitle = this.$t('classlist_classlist_1');
            } else if (this.TabPaneChangeval == 'name2') {
                jxLessonListQuest = jxLesson.listClassLessonAuditPage;
                this.tableTitle = this.$t('classlist_classlist_14');
            }
            jxLessonListQuest(param)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let result = res.data.data.content;
                        this.tableData = result;
                        this.dataTotal = res.data.data.totalElements;
                        // console.log(this.userInfo);
                        this.$nextTick(() => {
                            if (this.userInfo) {
                                // this.tabParams =this.userInfo.admin || (this.userInfo.roleIdList&&!this.userInfo.roleIdList.includes("11"));
                                this.isApproval = this.userInfo.roleIdList.indexOf('11') >= 0;
                                this.isAdmin = this.userInfo.admin;
                                this.tabParams = this.isAdmin || this.isApproval;
                            }
                        });
                        //  console.log('nextTickOfter');
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        courseTypeChange(val) {
            let type = 'jw_course_type'; //适用年级
            sysDict
                .findChildDictByParentDict({
                    type
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let aaa = res.data.data.filter(item => {
                            return item.type == this.findObj.type;
                        });
                        this.jw_course_grade = aaa;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        baseDataList() {
            let types = 'jw_course_type'; //课程包分类,适用年级
            sysDict
                .batchListData({
                    types
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.jw_course_type = res.data.data.jw_course_type;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
        },
        //可选方法，如果是多选的话必须有
        selectionChange(selection) {
            // console.log(selection);
            this.selection = selection;
        },
        getShowTitle(closeLoad) {
            jxLesson
                .getShowTitle({
                    pageIdentifier: 'listClassLessonPage',
                    voName: 'JxClassLessonVO',
                    lang: this.$i18n.locale
                })
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
        auditTimeChange(val) {
            this.findObj.auditStartTime = val[0];
            this.findObj.auditEndTime = val[1];
        },
        ClassTimeRangeChange(val) {
            this.findObj.startTime = val[0];
            this.findObj.endTime = val[1];
        },
        serviceAuditCommitTimeChange(val) {
            this.findObj.serviceCommitStartTime = val[0];
            this.findObj.serviceCommitEndTime = val[1];
        },
        teachingAuditCommitTimeChange(val) {
            this.findObj.teachingCommitStartTime = val[0];
            this.findObj.teachingCommitEndTime = val[1];
            // console.log(val);
        },
        searchInfo() {
            this.findList = true;
            this.pageNo = 1;
            this.getListData();
        },
        resetSearch() {
            this.findObj.auditTime = [];
            this.findObj.serviceAuditCommitTime = [];
            this.findObj.teachingAuditCommitTime = [];
            for (let item in this.findObj) {
                if (typeof this.findObj[item] === 'string' || typeof this.findObj[item] === 'number') {
                    this.findObj[item] = '';
                }
                if (typeof this.findObj[item] === 'object') {
                    this.findObj[item] = [];
                }
            }
            this.pageNo = 1;
            this.getListData();
        },
        getLists() {
            this.updateLoadingStatus({ isLoading: true });
            let params = {};
            common
                .listPage(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let list = res.data.data.list;
                        let listD1 = []; //有效
                        let listD2 = []; //无效

                        for (let i in list) {
                            if (list[i].isEnable === '0') {
                                listD2.push(list[i]);
                            } else if (list[i].isEnable === '1') {
                                listD1.push(list[i]);
                            }
                        }
                        this.data = listD1;
                        this.data1 = listD2;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
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
        cancel(){
            this.apDetails=false;
        }
    }
};
</script>
