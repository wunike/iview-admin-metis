<style lang="less">
.wechatMsg {
    height: 100%;
    .msgParent {
        margin-top: 10px;
        width: 100%;
        border-radius: 4px;
        display: flex;
        height: ~'calc(100% - 90px)';
        .leftTree {
            padding: 10px;
            height: 100%;
            width: 200px;
            overflow: auto;
            border: 1px solid #dcdee2;
            background: rgba(255, 255, 255, 1);
            margin-right: 16px;
        }
        .rightMsg {
            height: 100%;
            width: calc(~'100% - 216px');
            background: #fff;
            border-radius: 4px;
            .crr-header {
                height: 64px;
                width: 100%;
                position: relative;
                .crr-header-1 {
                    height: 64px;
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    span {
                        display: inline-block;
                        height: 24px;
                        width: 48px;
                        line-height: 24px;
                        text-align: center;
                        font-size: 12px;
                        color: rgba(73, 80, 96, 1);
                        cursor: pointer;
                        // margin-right: 40px;
                    }
                    .active {
                        cursor: default;
                        color: #fff;
                        background: linear-gradient(to right, #79dfdc, #44bcb7);
                    }
                }
                .crr-header-2 {
                    position: absolute;
                    right: 16px;
                    top: 16px;
                }
            }
            .crr-body {
                height: ~'calc(100% - 64px)';
            }
        }
    }
}
</style>

<template>
    <div class="wechatMsg">
        <v-search-collapse @search="searchRecord" :hasTag="hasTag" @reset="resetSearchRecord" @userLabelTrueChoose="userLabelTrueChoose" @changeDivHeight="changeDivHeight">
            <DatePicker
                ref="DatePicker"
                v-model="optTime"
                type="daterange"
                :clearable="true"
                placement="bottom-start"
                separator=" ~ "
                :placeholder="$t('modules_spoc_crm_web_src_views_customermanagement_index_1259')"
                style="width:206px;"
                :options="options3"
                split-panels
                @on-open-change="setOptTime"
            ></DatePicker>
            <treeSelectCos ref="ownerOfficeIds" placeholder="跟进校区"></treeSelectCos>

            <DatePicker
                ref="DatePicker1"
                :options="options31"
                split-panels
                @on-open-change="setOptTime1"
                v-model="followTime"
                type="daterange"
                :clearable="true"
                placement="bottom-start"
                separator=" ~ "
                placeholder="最近跟进日期"
                style="width:206px;"
            ></DatePicker>
            <Input v-model="record.name" clearable placeholder="客户姓名" />
            <Input v-model="record.phone" clearable placeholder="客户电话" />
            <Select v-model="record.querySources" style="width: 206px;" clearable multiple filterable placeholder="渠道来源">
                <Option v-for="item in crm_customer_source" :value="item.value" :key="item.id">{{ item.name }}</Option>
            </Select>
            <Select v-model="record.registerId" placeholder="登记人" clearable filterable remote :remote-method="remoteMethod2" :loading="loading2">
                <Option v-for="(item, index) in roleOptions2" :value="item.value" :key="index">{{ item.name }}</Option>
            </Select>
            <Select v-model="record.followerId" placeholder="跟进人" clearable filterable remote :remote-method="remoteMethod4" :loading="loading2">
                <Option v-for="(item, index) in roleOptions4" :value="item.value" :key="index">{{ item.name }}</Option>
            </Select>
            <Select
                v-model="record.officeIds"
                style="width: 206px;"
                multiple
                clearable
                :placeholder="$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_689')"
            >
                <Option v-for="item in areaSchoolList" :value="item.id" :key="item.id">{{ item.code }}{{ item.name }}</Option>
            </Select>
            <Select v-model="record.signOfficeIds" style="width: 206px;" multiple clearable :placeholder="$t('modules_spoc_crm_web_src_views_customermanagement_index_1262')">
                <Option v-for="item in areaSchoolList" :value="item.id" :key="item.id">{{ item.code }}{{ item.name }}</Option>
            </Select>
            <Input v-model.trim="record.name" clearable :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_leftbanner_819')" />
            <Input v-model="record.phone" clearable :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_leftbanner_820')" />
            <Select v-model="record.selectOfficeIds" style="width: 206px;" multiple clearable :placeholder="$t('modules_spoc_crm_web_src_modules_leadsinfo_488')">
                <Option v-for="item in areaSchoolList" :value="item.id" :key="item.id">{{ item.code }}{{ item.name }}</Option>
            </Select>
            <Select v-model="record.traceFollowFlag" clearable placeholder="跟进进度">
                <Option v-for="(item, index) in traceFollowList" :value="item.value" :key="index">{{ item.label }}</Option>
            </Select>
            <DatePicker
                v-model="allocTime"
                type="daterange"
                :clearable="true"
                placement="bottom-start"
                separator=" ~ "
                placeholder="分配日期范围"
                style="width:206px;"
            ></DatePicker>
            <Select v-model="record.allocerId" placeholder="分配人" clearable filterable remote :remote-method="remoteMethod3" :loading="loading2">
                <Option v-for="(item, index) in roleOptions3" :value="item.value" :key="index">{{ item.name }}</Option>
            </Select>
            <DatePicker
                v-model="startEndDate"
                type="daterange"
                :clearable="true"
                placement="bottom-start"
                separator=" ~ "
                placeholder="统计日期范围"
                style="width:206px;"
            ></DatePicker>
            <Select v-model="record.entryType" :placeholder="$t('modules_spoc_crm_web_src_views_customermanagement_index_1266')" clearable>
                <Option v-for="(item, index) in entryTypeList" :value="item.value" :key="index">{{ item.label }}</Option>
            </Select>
            <div class="borderStyle" style="width: 292px;">
                <InputNumber :min="0" v-model="record.traceCountStart" placeholder="起始跟进次数" @on-change="traceCountStartBlur" style="margin-right: 12px;"></InputNumber>
                <InputNumber
                    v-model="record.traceCountEnd"
                    placeholder="结束跟进次数"
                    @on-change="traceCountEndBlur"
                    :formatter="
                        val => {
                            return val == Infinity ? '不限' : val;
                        }
                    "
                ></InputNumber>
            </div>
            <form-create ref="fc" v-model="fApi" :rule="rule" :option="option" class="form_create"></form-create>
        </v-search-collapse>
        <div class="msgParent">
            <div class="leftTree"><Tree :data="classList" :load-data="loadData" :render="renderContent"></Tree></div>
            <div class="rightMsg">
                <!-- <div class="crr-header"> -->
                <!-- <div class="crr-header-1"> -->
                <!-- <span :class="{ active: curr == '1' }" @click="showMessage('1')">全部</span> -->
                <!-- <span :class="{ active: curr == '4' }" @click="showMessage('4')">图片</span>
                        <span :class="{ active: curr == '3' }" @click="showMessage('3')">文件</span> -->
                <!-- </div> -->
                <!-- <div class="crr-header-2">
                        <DatePicker
                            @on-change="changeDate"
                            :value="dateRange"
                            type="daterange"
                            separator=" ~ "
                            :placeholder="$t('messagemanagement_detail_340')"
                            style="width: 224px"
                        ></DatePicker>
                    </div> -->
                <!-- </div> -->
                <div class="crr-body"><histroy-lists ref="histroyLists" :curr="curr" :stuId="stuId" :dateRange="dateRange"></histroy-lists></div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import valid, { errors, sysUser, sysDict, sysCommonSql, crmCustomerStatus, crmCustomer, sysConfig, sysProps } from '../../../libs/request';
import vSearchCollapse from '@public/modules/vSearchCollapse';
import campusSelection from '@public/modules/campusSelection';
import { waitUntil, DatePickerOpt, defaultDatePickerValue, titleTransformationToLabel, getSelectIdsByid, getSelectTreeDataByid } from '@public/libs/util';
import treeSelectCos from '@public/modules/treeSelectCos';
import userLabel from '@public/modules/userLabel';
import histroyLists from './histroyLists.vue';

import subClassImg from '../../../assets/img/sub-class.png';
import defaultImg from '../../../assets/img/touxiang.png';
export default {
    name: 'crm.customerManagement',
    components: {
        vSearchCollapse,
        campusSelection,
        treeSelectCos,
        userLabel,
        histroyLists
    },
    data() {
        return {
            data1: [
                {
                    title: '全部',
                    expand: true,
                    children: [
                        {
                            title: '客户',
                            expand: true,
                            children: [
                                {
                                    title: '张三'
                                },
                                {
                                    title: '李四'
                                }
                            ]
                        },
                        {
                            title: '员工',
                            expand: true,
                            children: [
                                {
                                    title: '杨乔'
                                },
                                {
                                    title: '王鑫'
                                }
                            ]
                        }
                    ]
                }
            ],
            parentOfficeId: '',
            ininOfficeIdList: [],
            valueConsistsOf: 'LEAF_PRIORITY', // ALL、BRANCH_PRIORITY、LEAF_PRIORITY、ALL_WITH_INDETERMINATE
            disableOperate: {},
            optTime: [],
            startEndDate: [],
            options3: null,
            options31: null,
            followTime: [],
            allocTime: [],
            loading2: false,
            roleOptions2: [],
            loading3: false,
            roleOptions3: [],
            loading4: false,
            roleOptions4: [],
            hasTag: true,
            updateShowTitle: crmCustomer.updateShowTitle,
            exportMethod: crmCustomer.export, //导出用到的方法对象
            areaSchoolList: [],
            crm_customer_source: [],
            pageNo: 1,
            pageSize: this.$store.state.app.pageSizeGlobal,
            record: {
                startDate: '',
                endDate: '',
                officeIds: [],
                ownerOfficeIds: [],
                signOfficeIds: [],
                querySources: [],
                name: '',
                phone: '',
                studentName: '',
                registerId: '',
                allocerId: '',
                followerId: '',
                tagsArr: [],
                entryType: '',
                traceFollowCountStart: null,
                traceFollowCountEnd: null,
                fieldJsonData: {},
                selectOfficeIds: [],
                statisticsTerm: '',
                traceFollowFlag: '',
                orderByStatus: '',
                orderByType: ''
            },
            traceFollowList: [
                { value: 0, label: this.$t('modules_spoc_crm_web_src_views_customermanagement_index_1292') },
                { value: 1, label: this.$t('modules_spoc_crm_web_src_views_customermanagement_index_1293') }
            ],
            tabName: 0,
            isEffective: '0',
            statusArr: [],
            entryTypeList: [],
            objfield: [],
            myButtonPrem: null,
            showQcyModal: false,
            detailObj: {},
            userLabelData: [],
            tags: '',
            msgGroupRecordModal: false,
            curr: 1,
            classList: []
        };
    },
    computed: {
        ...mapState(['app', 'buttonPerm', 'calendarConfig'])
    },
    mounted() {
        // console.log(this.buttonPerm['crm.customerManagement'])
        crmCustomer
            .findStateDisableOperate({})
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.disableOperate = res.data.data;
                }
            })
            .catch(errors.call(this))
            .finally(() => {
                this.getSchoolList(); // 获取登记校区
                this.getSource(); // 获取渠道来源下拉
                this.getEntryTypeList(); // 获取录入方式下拉
                // this.getConfig(); // 获取权限
                waitUntil(
                    () => {
                        return (this.app.currOfficeId && this.calendarConfig.maxMonthInterval && this.buttonPerm && JSON.stringify(this.buttonPerm) != '{}') || false;
                    },
                    () => {
                        this.optTime = defaultDatePickerValue(this.calendarConfig.maxMonthInterval);
                        // console.log(this.calendarConfig.maxMonthInterval,123)
                        this.options3 = DatePickerOpt(this, 'DatePicker', Number(this.calendarConfig.maxMonthInterval));
                        this.options31 = DatePickerOpt(this, 'DatePicker1', Number(this.calendarConfig.maxMonthInterval));
                        console.log(this.buttonPerm, 'buttonPerm~~~~~~~');
                        this.myButtonPrem = this.buttonPerm['crm.customerManagement'] || [];
                        console.log(this.myButtonPrem, 'myButtonPrem~~~~~~~');
                        this.getTreeDatas(); // 获取校区树形下拉
                    }
                );
            });
    },
    created() {
        let list = [];
        let arr = [
            {
                classCourseId: '84e1fc04cbf3453899a00359ce309b92',
                classCourseName: 'NGR2007',
                sum: '0',
                personCount: 2,
                jxStudentChatMessageVOS: [],
                jxTeacherChatMessageVOS: [
                    {
                        officeId: '13',
                        classCourseId: '84e1fc04cbf3453899a00359ce309b92',
                        classCourseName: 'NGR2007',
                        teacherId: '6ba83b2244064c25935100759a6becd2',
                        teacherName: 'Craig',
                        teacherEnName: 'Craig',
                        avator: '/spoc-hootie/avator/staff.png',
                        roleId: '9',
                        roleName: '授课教师(Craig)',
                        dialogId: '6bc30e58690142beaa125b4e26b34ce0',
                        updateDate: '2020-11-29 16:35',
                        sum: '0',
                        lastMessage: "<p>Hi, I'm sorry. I've only just seen this message.I can give her another copy on Wednesday when she comes to class.</p>"
                    },
                    {
                        officeId: '13',
                        classCourseId: '84e1fc04cbf3453899a00359ce309b92',
                        classCourseName: 'NGR2007',
                        teacherId: 'bf7f376607124d8e8eef6292498e8dd8',
                        teacherName: 'Yoyo Yang',
                        teacherEnName: 'Yoyo Yang',
                        avator: 'https://hootieoss.ivygate.cn/3/0/1602132638536微信图片_20201008125027.jpg',
                        roleId: '6',
                        roleName: '服务OO(Yoyo Yang)',
                        dialogId: '-1',
                        updateDate: null,
                        sum: '0',
                        lastMessage: null
                    }
                ]
            }
        ];
        // console.log('arr')
        // console.log(arr)
        arr.forEach(v => {
            list.push({
                title: v.classCourseName,
                classCourseName: v.classCourseName,
                classCourseId: v.classCourseId,
                jxStudentChatMessageVOS: v.jxStudentChatMessageVOS,
                personCount: v.personCount,
                sum: v.sum,
                loading: false,
                children: [],
                render: (h, { root, node, data }) => {
                    return h(
                        'span',
                        {
                            style: {
                                display: 'inline-block'
                            },
                            class: {
                                'cb-item': true,
                                _item: true
                            }
                        },
                        [
                            h(
                                'span',
                                {
                                    style: {
                                        display: 'flex',
                                        'justify-content': 'flex-start',
                                        'align-items': 'center'
                                    }
                                },
                                [
                                    h('img', {
                                        attrs: {
                                            src: subClassImg
                                        },
                                        style: {
                                            width: '14px',
                                            height: '12px'
                                        }
                                    }),
                                    h('span', data.classCourseName + '（' + data.personCount + this.$t('messagemanagement_detail_342'))
                                    // h('b', {
                                    //     style: {
                                    //         display: data.sum > 0 ? 'inline' : 'none'
                                    //     }
                                    // }, data.sum > 0 && data.sum < 100 ? data.sum : data.sum > 99 ? '99+' : ''),
                                ]
                            )
                        ]
                    );
                }
            });
        });
        // console.log(list)
        this.classList = list;
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
                        // console.log(res)
                        if (Array.isArray(res.data.data.children)) {
                            let officeIdList = res.data.data.children;
                            this.parentOfficeId = officeIdList[0].id;
                            titleTransformationToLabel(officeIdList);
                            this.ininOfficeIdList = JSON.parse(JSON.stringify(officeIdList));
                            this.initOffice();
                        }
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        initOffice() {
            this.$refs.ownerOfficeIds.officeIdList = this.ininOfficeIdList;
            if (this.app.currOfficeId == 'all' || this.app.currOfficeId == this.parentOfficeId) {
                this.$set(this.record, 'ownerOfficeIds', []);
                this.$refs.ownerOfficeIds.officeIds = [];
                this.$nextTick(() => {
                    this.$forceUpdate();
                });
            } else {
                let resultSelectObj = {};
                getSelectTreeDataByid(this.ininOfficeIdList, resultSelectObj);
                let resultIdsObj = {};
                getSelectIdsByid(this.ininOfficeIdList, resultIdsObj);
                this.$set(this.record, 'ownerOfficeIds', resultIdsObj[this.app.currOfficeId]);
                this.$refs.ownerOfficeIds.officeIds = resultIdsObj[this.app.currOfficeId];
                this.$nextTick(() => {
                    this.$forceUpdate();
                });
            }
        },
        // 获取渠道来源下拉
        getSource() {
            sysDict
                .getDictStringTree({ type: 'crm_customer_source' })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let arr = res.data.data;
                        this.crm_customer_source = arr;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    // this.updateLoadingStatus({ isLoading: false });
                });
        },
        // 获取录入方式下拉
        getEntryTypeList() {
            let params = {
                types: 'crm_entry_type'
            };
            sysDict
                .batchListData(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.entryTypeList = res.data.data['crm_entry_type'];
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
        },
        // 获取登记校区
        getSchoolList() {
            let params = {};
            sysUser
                .dataScopeFilter(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.areaSchoolList = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
        },
        // 获取登记人下拉
        remoteMethod2(query) {
            // console.log(query)
            if (query !== '') {
                this.loading1 = true;
                let params = {
                    mainTable: 'crm_customer',
                    mainField: 'create_by',
                    joinField: 'id',
                    joinTable: 'sys_user',
                    secondField: 'name',
                    joinTableSearchParam: query
                };
                sysCommonSql
                    .queryPageInputInitData(params)
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            this.loading2 = false;
                            this.roleOptions2 = res.data.data;
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {
                        // this.loadingoptUserId = false;
                    });
            } else {
                this.options1 = [];
            }
        },
        // 获取分配人下拉
        remoteMethod3(query) {
            if (query !== '') {
                this.loading1 = true;
                let params = {
                    mainTable: 'crm_customer_status',
                    mainField: 'allocer',
                    joinField: 'id',
                    joinTable: 'sys_user',
                    secondField: 'name',
                    joinTableSearchParam: query
                };
                sysCommonSql
                    .queryPageInputInitData(params)
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            this.loading3 = false;
                            this.roleOptions3 = res.data.data;
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {
                        // this.loadingoptUserId = false;
                    });
            } else {
                this.options1 = [];
            }
        },
        // 获取跟进人下拉
        remoteMethod4(query) {
            if (query !== '') {
                this.loading1 = true;
                let params = {
                    mainTable: 'crm_customer_status',
                    mainField: 'saler',
                    joinField: 'id',
                    joinTable: 'sys_user',
                    secondField: 'name',
                    joinTableSearchParam: query
                };
                sysCommonSql
                    .queryPageInputInitData(params)
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            this.loading4 = false;
                            this.roleOptions4 = res.data.data;
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {
                        // this.loadingoptUserId = false;
                    });
            } else {
                this.options1 = [];
            }
        },
        //标签切换
        userLabelTrueChoose(item) {
            this.record.tagsArr = item;
            this.pageNo = 1;
            this.getLists();
        },
        // 执行搜索
        searchRecord() {
            let $f = this.fApi;
            let formData = $f.formData();
            for (let i in formData) {
                if (Array.isArray(formData[i])) {
                } else {
                    formData[i] = [formData[i]];
                }
            }
            this.record.fieldJsonData = formData;
            this.$nextTick(() => {
                this.pageNo = 1;
                this.getLists();
            });
        },
        // 重置搜索
        resetSearchRecord() {
            let $f = this.fApi;
            $f.resetFields();
            this.objfield.forEach(v => {
                let obj = {};
                v.value.forEach(val => {
                    obj.val = '';
                });
                $f.setValue(v.field, obj);
            });
            let formData = null;
            this.$nextTick(() => {
                formData = $f.formData();
                for (let i in formData) {
                    if (Array.isArray(formData[i])) {
                    } else {
                        formData[i] = [formData[i]];
                    }
                }
                this.record = {
                    officeIds: [],
                    ownerOfficeIds: [],
                    signOfficeIds: [],
                    querySources: [],
                    name: '',
                    phone: '',
                    studentName: '',
                    registerId: '',
                    allocerId: '',
                    followerId: '',
                    tagsArr: [],
                    entryType: '',
                    traceFollowCountStart: null,
                    traceFollowCountEnd: null,
                    selectOfficeIds: [],
                    orderByStatus: '',
                    orderByType: ''
                };
                this.record.fieldJsonData = formData;
                this.followTime = [];
                this.allocTime = [];
                // this.record.officeIds = this.app.currOfficeId =='all'? []: [this.app.currOfficeId];
                this.optTime = defaultDatePickerValue(this.calendarConfig.maxMonthInterval);
                this.pageNo = 1;
                this.initOffice();
            });
        },
        setOptTime(flag) {
            if (flag) {
                this.optTime = [];
            }
        },
        setOptTime1(flag) {
            if (flag) {
                this.followTime = [];
            }
        },
        showMessage(idx) {
            this.curr = idx;
        },
        loadData(item, callback) {
            // 获取某个班级下面的教师列表
            let datas = [];
            let params = {
                classCourseId: item.classCourseId,
                stuId: this.stuId
            };
            // jxChatMessage
            // 	.listByTeacher(params)
            // 	.then(valid.call(this))
            // 	.then(res => {
            // 		if (res.ok) {
            // datas = [];
            // 		}
            // 	})
            // 	.catch(errors.call(this))
            // 	.finally(() => {
            // callback(datas);
            // 	});
        },
        clickChat(item, str) {
            // 点击教室，查看聊天记录
            // console.log(item)
            this.onlyId = item.teacherId;
            this.dialogId = item.dialogId;
            // if(item.dialogId == '-1') {
            //     this.$Message.error(this.$t('messagemanagement_detail_341'));
            //     return false;
            // }
            // console.log(item.dialogId)
            // this.findHistory(item.dialogId);
            this.$refs.histroyLists.uploadParams(this.dialogId);
        },
        // 渲染教师列表的方式
        renderContent(h, { root, node, data }) {
            console.log(data, 123);
            return h(
                'div',
                {
                    style: {
                        display: 'inline-block',
                        cursor: 'pointer'
                    },
                    class: {
                        'cb-item': true,
                        _item: true
                    },
                    on: {
                        click: () => {
                            this.clickChat(data);
                        }
                    }
                },
                [
                    h(
                        'div',
                        {
                            style: {
                                display: 'flex',
                                'justify-content': 'flex-start',
                                'align-items': 'center'
                            }
                        },
                        [
                            h('img', {
                                attrs: {
                                    src: data.avator || defaultImg
                                },
                                style: {
                                    width: '16px',
                                    height: '16px',
                                    borderRadius: '16px'
                                }
                            }),
                            h('span', data.roleName)
                            // h('b', {
                            //     style: {
                            //         display: data.sum > 0 ? 'inline' : 'none'
                            //     }
                            // }, data.sum > 0 && data.sum < 100 ? data.sum : data.sum > 99 ? '99+' : ''),
                        ]
                    )
                ]
            );
        }
    },
    watch: {
        'app.currOfficeId': function(val, oldVal) {
            // console.log(val,'app.currOfficeId')
            if (oldVal && this.$route.name == 'crm.wechatMsg') {
                // this.$set(this.record, "ownerOfficeIds", val=='all'?[]: [val]);
                this.pageNo = 1;
                this.initOffice();
            }
        },
        '$route.name': {
            handler: function(val, oldVal) {
                if (val == 'crm.wechatMsg') {
                    let $f = this.fApi;
                    let formData = $f.formData();
                    for (let i in formData) {
                        if (Array.isArray(formData[i])) {
                        } else {
                            formData[i] = [formData[i]];
                        }
                    }
                    this.record.fieldJsonData = formData;
                    this.$nextTick(() => {
                        this.getLists();
                    });
                }
            },
            deep: true
        }
    }
};
</script>
