<style lang="less">
.announcement-container{
    position: relative;
    .my-table {
        width: 100%;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        padding: 0 16px;
        .subTypeNameStyle {
            margin-left: 11px;
            .ivu-table-cell {
                margin-left: 11px;
            }
        }
        .ivu-table .read-row td {
            // background-color: #ddd;
            color: #999;
        }
    }
    .status{
        position: relative;
        padding-left: 10px;
        &::before{
            content: '';
            position: absolute;left: 0;top: 4px;
            @w: 6px;
            width: @w;height: @w;border-radius: @w;
            background: #999;
        }
        &.unpublished::before{
            background-color: #44BCB7;
        }
        &.published::before{
            background-color: #7ED321;
        }
        &.drafts::before{
            background-color: #4494F9;
        }
    }
}
</style>
    
<template>
<div class="announcement-container">
    <v-search-collapse @search="doSearch" @reset="resetSenarch" @changeDivHeight="changeDivHeight" v-if="!isAdmin">
        <Input v-model="params.name" :placeholder="$t('modules_spoc_core_web_src_views_announcement_index_87')"></Input>
    </v-search-collapse>
    <big-table v-if="defaultShowCol"
        :style="{'margin-top': isAdmin ? 0 : '16px'}"
        class="my-table"
        :tableName="tableName"
        :tableData="tableData"
        :tableColumnArray="tableColumnArray"
        :defaultShowCol="defaultShowCol"
        :canSelection="true"
        :isShowSelectTableColumn="false"
        :dataTotal="dataTotal"
        :btnList="btnList"
        :pageNo="pageNo"
        :tableHeightOut="tableHeightOut"
        :rowClassName="rowClassName"
        @selectionChange="selectionChange"
        @pageChange="pageChange">
    </big-table>
    <add-announcement ref="addAnnouncementRef" @uploadLists="getListData"></add-announcement>
    <add-lessee-announcement ref="addLesseeAnnouncementRef" @uploadLists="getListData"></add-lessee-announcement>
    <detail-announcement ref="detailAnnouncementRef"></detail-announcement>
    <Modal
        v-model="setTimeModal"
        :title="$t('modules_spoc_core_web_src_views_announcement_index_88')"
        width="600"
        :loading="setTimeLoading"
        @on-ok="setTimeOk"
        @on-cancel="setTimeCancel">
        <Form ref="setTimeRef" label-position="right" :model="setTimeData" :rules="setTimeValidate" :label-width="156">
            <FormItem :label="$t('modules_spoc_core_web_src_views_announcement_index_89')" required prop="setTime">
                <DatePicker type="date" :options="options" v-model="setTimeData.setTime" :placeholder="$t('modules_spoc_core_web_src_views_announcement_index_90')" style="width: 306px"></DatePicker>
            </FormItem>
        </Form>
    </Modal>
</div>
</template>

<script>
/**
 ** @author: 曹见芳
 ** 公告列表
 */
import { mapMutations, mapState } from "vuex";
import valid, { errors, common } from "../../libs/request";
import { waitUntil } from "@public/libs/util";
import bigTable from "@public/modules/bigTable.vue";
import exportModal from "@public/modules/exportModal.vue";
import vSearchCollapse from "@public/modules/vSearchCollapse";
import addAnnouncement from './addAnnouncement.vue'
import addLesseeAnnouncement from './addLesseeAnnouncement.vue'
import detailAnnouncement from './detail.vue'
import popTipComp from '@public/modules/tableDropdown.vue';
export default {
    name: 'core.announcement',
    components: {
        bigTable,
        exportModal,
        vSearchCollapse,
        addAnnouncement,
        addLesseeAnnouncement,
        detailAnnouncement,
        popTipComp
    },
    props: {
        
    },
    data(){
        return {
            isAdmin: true, //管理员
            tableHeightOut: 72,
            params: {
                // officeId: '',
                // name: '',
            },
            pageNo: 1,
            pageSize: this.$store.state.app.pageSizeGlobal,
            selection: [],
            defaultShowCol: null,
            tableData: [],
            dataTotal: 0,
            setTimeModal: false,
            setTimeLoading: true,
            options: {
                disabledDate (date) {
                    return date && date.valueOf() < Date.now();
                }
            },
            setTimeData: {
                setTime: '',
            },
            setTimeValidate: {
                setTime: [
                    { required: true, type: 'date', message: this.$t('modules_spoc_core_web_src_views_announcement_index_90'), trigger: 'change' }
                ],
            },
            updateAnnouncementId: '',
            tableColumnArray: [
                {
                    key: 'id',
                    render: (h, params) => {
                        let _num = this.pageSize * (this.pageNo - 1) + params.index + 1;
                        return h('span', _num)
                    }
                },
                {
                    key: 'status',
                    // title: '状态',
                    render: (h, params) => {
                        let str = '';
                        if(params.row.status == 'drafts') str = this.$t('modules_spoc_core_web_src_views_announcement_index_91') 
                        else if(params.row.status == 'unpublished') str = this.$t('modules_spoc_core_web_src_views_announcement_index_92') 
                        else if(params.row.status == 'published') str = this.$t('modules_spoc_core_web_src_views_announcement_index_93') 
                        else if(params.row.status == 'revocation') str = this.$t('modules_spoc_core_web_src_views_announcement_index_94') 
                        return h('span', {
                            class: {
                                'status': params.row.status ? true : false,
                                'unpublished': params.row.status == 'unpublished',
                                'published': params.row.status == 'published',
                                'drafts': params.row.status == 'drafts',
                            }
                        }, str);
                    }
                },
                {
                    key: 'officeNameList',
                    render: (h, params) => {
                        return h('div', params.row.officeNameList && params.row.officeNameList.length ? params.row.officeNameList.join('、') : '')
                    }
                },
                {
                    key: 'roleNameList',
                    render: (h, params) => {
                        return h('div', params.row.roleNameList && params.row.roleNameList.length ? params.row.roleNameList.join('、') : '')
                    }
                },
                {
                    title: this.$t('classlist_compontents_detailinfo_45'),
                    key: "doAction",
                    width: 140,
                    render: (h, params) => {
                        let dom = [];
                        dom.push(h(
                            "a",
                            {
                                on: {
                                    click: () => {
                                        if(params.row.read == '0') this.updateRead(params.row.id);
                                        else this.$refs.detailAnnouncementRef.show(params.row.id);
                                    }
                                }
                            }, this.$t('courselist_compontents_servicecontent_219')
                        ));
                        if(params.row.status == 'drafts') {
                            dom.push(h(popTipComp, {
                                props: {
                                    actionName: this.$t('modules_spoc_core_web_src_views_announcement_index_97'),
                                    buttonList: [{ label: this.$t('modules_spoc_core_web_src_views_announcement_index_98'), key: 'immediate' }, { label: this.$t('modules_spoc_core_web_src_views_announcement_index_99'), key: 'timing' }]
                                },
                                style: {
                                    marginLeft: '8px'
                                },
                                on: {
                                    dropFn: key => {
                                        this.send(params.row.id, key);
                                    }
                                }
                            }))
                        }
                        else if(params.row.status == 'unpublished') {
                            dom.push(h(
                                "a",
                                {
                                    style: {
                                        marginLeft: '8px'
                                    },
                                    on: {
                                        click: () => {
                                            this.computedParams(params.row.id, '2');
                                        }
                                    }
                                }, this.$t('modules_spoc_core_web_src_views_announcement_index_100')
                            ))
                        }
                        else if(params.row.status == 'published') {
                            dom.push(h(
                                "a",
                                {
                                    style: {
                                        marginLeft: '8px'
                                    },
                                    on: {
                                        click: () => {
                                            this.computedParams(params.row.id, '3');
                                        }
                                    }
                                }, this.$t('message_myhistory_299')
                            ))
                        }
                        return h("div", dom);
                    }
                }
            ],
        };
    },
    computed: {
        ...mapState(["app"]),
        tableName() {
            let arr = '';
            if(this.$route.name == 'core.lesseeAnnouncement'){
                arr = this.$t('modules_spoc_core_web_src_views_announcement_index_102')
            } else {
                arr = this.isAdmin ? this.$t('modules_spoc_core_web_src_views_announcement_index_103') : this.$t('modules_spoc_core_web_src_views_announcement_index_104')
            }
            return arr;
        },
        btnList() {
            let arr = [
                {
                    type: '',
                    btnClick: this.clickBtn,
                    text: this.isAdmin ? this.$t('modules_spoc_core_web_src_views_announcement_index_105') : this.$t('modules_spoc_core_web_src_views_announcement_index_106'),
                    style: {
                        'margin-right': 0
                    }
                },
            ];
            return arr;
        },
    },
    mounted(){
        this.getShowTitle();
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
			this.tableHeightOut = height;
        },
        getListData() {
            // 获取data
            this.updateLoadingStatus({ isLoading: true });
            let params = {}; //Object.assign({}, this.params);
            params.pageNo = this.pageNo;
            params.pageSize = this.pageSize;
            common.comAnnouncementListPage(params)
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
            if(this.$route.name == 'core.lesseeAnnouncement'){ // 租户公告
                this.defaultShowCol = {
                    'true': [
                        {
                            'name': 'id',
                            'title': this.$t('modules_spoc_core_web_src_views_announcement_index_107'),
                            'selected': true,
                            'required': true,
                            'dynamiced': false,
                        },
                        {
                            'name': 'status',
                            'title': this.$t('pushsettings_index_496'),
                            'selected': true,
                            'required': true,
                            'dynamiced': false,
                        },
                        {
                            'name': 'officeNameList',
                            'title': this.$t('modules_spoc_core_web_src_views_announcement_index_109'),
                            'selected': true,
                            'required': true,
                            'dynamiced': false,
                        },
                        {
                            'name': 'roleNameList',
                            'title': this.$t('modules_spoc_core_web_src_views_announcement_index_110'),
                            'selected': true,
                            'required': true,
                            'dynamiced': false,
                        },
                        {
                            'name': 'title',
                            'title': this.$t('modules_spoc_core_web_src_views_announcement_index_111'),
                            'selected': true,
                            'required': true,
                            'dynamiced': false,
                        },
                        {
                            'name': 'sendTime',
                            'title': this.$t('modules_spoc_core_web_src_views_announcement_index_112'),
                            'selected': true,
                            'required': true,
                            'dynamiced': false,
                        },
                        {
                            'name': 'planTime',
                            'title': this.$t('modules_spoc_core_web_src_views_announcement_index_113'),
                            'selected': true,
                            'required': true,
                            'dynamiced': false,
                        },
                        {
                            'name': 'revocationTime',
                            'title': this.$t('modules_spoc_core_web_src_views_announcement_index_114'),
                            'selected': true,
                            'required': true,
                            'dynamiced': false,
                        },
                        {
                            'name': 'creater',
                            'title': this.$t('modules_spoc_core_web_src_views_announcement_index_115'),
                            'selected': true,
                            'required': true,
                            'dynamiced': false,
                        },
                        {
                            'name': 'createTime',
                            'title': this.$t('modules_spoc_core_web_src_views_announcement_index_116'),
                            'selected': true,
                            'required': true,
                            'dynamiced': false,
                        },
                    ]
                }
            } else {
                this.defaultShowCol = {
                    'true': [
                        {
                            'name': 'id',
                            'title': this.$t('modules_spoc_core_web_src_views_announcement_index_107'),
                            'selected': true,
                            'required': true,
                            'dynamiced': false,
                        },
                        {
                            'name': 'typeName',
                            'title': this.$t('messagemanagement_components_histroylists_309'),
                            'selected': true,
                            'required': true,
                            'dynamiced': false,
                        },
                        {
                            'name': 'status',
                            'title': this.$t('pushsettings_index_496'),
                            'selected': true,
                            'required': true,
                            'dynamiced': false,
                        },
                        {
                            'name': 'officeNameList',
                            'title': this.$t('modules_spoc_core_web_src_views_announcement_index_118'),
                            'selected': true,
                            'required': true,
                            'dynamiced': false,
                        },
                        {
                            'name': 'roleNameList',
                            'title': this.$t('modules_spoc_core_web_src_views_announcement_index_119'),
                            'selected': true,
                            'required': true,
                            'dynamiced': false,
                        },
                        {
                            'name': 'title',
                            'title': this.$t('modules_spoc_core_web_src_views_announcement_index_111'),
                            'selected': true,
                            'required': true,
                            'dynamiced': false,
                        },
                        {
                            'name': 'sendTime',
                            'title': this.$t('modules_spoc_core_web_src_views_announcement_index_112'),
                            'selected': true,
                            'required': true,
                            'dynamiced': false,
                        },
                        {
                            'name': 'planTime',
                            'title': this.$t('modules_spoc_core_web_src_views_announcement_index_113'),
                            'selected': true,
                            'required': true,
                            'dynamiced': false,
                        },
                        {
                            'name': 'revocationTime',
                            'title': this.$t('modules_spoc_core_web_src_views_announcement_index_114'),
                            'selected': true,
                            'required': true,
                            'dynamiced': false,
                        },
                    ]
                }
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
        },
        rowClassName(row, index) {
			if (row.read == "1") {
				return "read-row";
			}
			return "";
        },
        clickBtn() {
            if(this.$route.name == 'core.lesseeAnnouncement'){
                this.$refs.addLesseeAnnouncementRef.show();
            } else {
                if(this.isAdmin) {
                    this.$refs.addAnnouncementRef.show();
                }
            }
        },
        updateRead(id) {
            let params = {
                idList: [id],
                status: '1'
            }
			this.getListData();
			this.$refs.detailAnnouncementRef.show(id);
            /*common.comAnnouncementUpdateRead(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    
                }
            })
            .catch(errors.call(this))*/
        },
        send(id, key) {
            // 发布
            if(key == 'immediate') {
                // 立即发布 
                let params = {
                    id,
                    operationType: '0'
                }
                this.updateAnnouncement(params);
            } else {
                // 定时发布
                this.updateAnnouncementId = id;
                this.$refs.setTimeRef.resetFields();
                this.setTimeModal = true;
            }
        },
        setTimeOk() {
            this.$refs.setTimeRef.validate((valid) => {
                if (valid) {
                    // console.log(this.setTimeData.setTime);
                    let params = {
                        id: this.updateAnnouncementId,
                        operationType: '1',
                        planSendTime: new Date(this.setTimeData.setTime).format('yyyy-MM-dd')
                    }
                    this.updateAnnouncement(params);
                } else {
                    this.changeSetTimeLoading();
                }
            })
        },
        setTimeCancel() {
            this.setTimeModal = false;
        },
        changeSetTimeLoading() {
            this.setTimeLoading = false;
            setTimeout(() => {
                this.setTimeLoading = true;
            }, 0);
        },
        computedParams(id, type) {
            // 取消发布、撤回
            let params = {
                id,
                operationType: type
            }
            this.updateAnnouncement(params);
        },
        updateAnnouncement(params) {
            common.comAnnouncementUpdateAnnouncement(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.setTimeCancel();
                    this.getListData();
                }
            })
            .catch(errors.call(this))
        }
    },
    watch: {
        "app.currOfficeId": function(val, oldVal) {
            if (oldVal) {
                this.params.officeId = this.app.currOfficeId;
                this.getListData();
            }
        },
        '$route.name': function(val, oldVal) {
            this.getShowTitle();
            this.getListData();
        },
    }
}
</script>


