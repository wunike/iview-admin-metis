<style lang="less">
.staffing-management-container{
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
}
</style>
    
<template>
<div class="staffing-management-container">
    <v-search-collapse @search="doSearch" @reset="resetSearch" @changeDivHeight="changeDivHeight">
        <DatePicker 
            v-model="createTime"
            ref="DatePicker"
            :options="options3"
            split-panels
            @on-open-change="setOptTime"
            type="daterange"
            placement="bottom-start"
            separator=" ~ "
            :placeholder="$t('scoretemplate_scoretemplate_556')"
            style="width:224px;">
        </DatePicker>
        <Input v-model="params.channelCode" :placeholder="$t('modules_spoc_crm_web_src_views_staffingmanagement_index_1653')" clearable></Input>
        <Input v-model="params.name" :placeholder="$t('modules_spoc_crm_web_src_views_staffingmanagement_index_1654')" clearable></Input>
        <Select
            v-model="params.createById"
            :placeholder="$t('scoretemplate_scoretemplate_569')"
            filterable
            clearable
            remote
            :remote-method="getCreateLists"
            :loading="loadingCreate">
            <Option v-for="(item, index) in createLists" :value="item.value" :key="index">{{item.name}}</Option>
        </Select>
    </v-search-collapse>
    <big-table v-if="defaultShowCol"
        class="my-table"
        :tableName="$t('modules_spoc_crm_web_src_views_staffingmanagement_index_1656')"
        :tableData="tableData"
        :tableColumnArray="tableColumnArray"
        :defaultShowCol="defaultShowCol"
        :canSelection="true"
        :isShowSelectTableColumn="false"
        :dataTotal="dataTotal"
        :btnList="btnList"
        :pageNo="pageNo"
        :tableHeightOut="tableHeightOut"
        updateShowTitleKey="signinDetail/listPage"
        @selectionChange="selectionChange"
        @pageChange="pageChange">
    </big-table>
    <Modal
        v-model="modal"
        :title="title"
        ok-:text="$t('modules_spoc_crm_web_src_views_staffingmanagement_index_1657')"
        width="600"
        :mask-closable="false"
        :loading="loading"
        @on-ok="ok"
        @on-cancel="cancel">
        <Form ref="addRef" :model="formItem" :rules="rules" :label-width="120">
            <FormItem :label="$t('modules_rolemanage_167')" prop="name">
                <Input v-model.trim="formItem.name" :disabled="isEdit" @on-blur="checkConflict" :placeholder="$t('modules_spoc_crm_web_src_views_activityenrollment_components_memberregistration_728')" style="width: 320px;"></Input>
                <div class="ivu-form-item-error-tip" v-if="isConflict">{{$t('modules_spoc_crm_web_src_views_staffingmanagement_index_1660')}}</div>
            </FormItem>
            <FormItem :label="$t('modules_rolemanage_168')" prop="phone">
                <Input v-model="formItem.phone" :disabled="isEdit" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_studentinfo_989')" style="width: 320px;"></Input>
            </FormItem>
            <FormItem :label="$t('scoretemplate_compontents_scoremodify_533')" prop="officeIds">
                <Select v-model="formItem.officeIds" multiple :placeholder="$t('views_approvalnotice_approvalset_index_300')" style="width: 320px;" @on-change="checkOnes">
                    <Option v-for="item in officeLists" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
                <Checkbox v-model="allOfficeIdsStatus" @on-change="checkAll" style="margin-left: 8px">{{$t('modules_rolepeople_212')}}</Checkbox>
            </FormItem>
        </Form>            
    </Modal>
</div>
</template>

<script>
/**
 ** @author: 曹见芳
 ** 促销员管理
 */
import { mapMutations, mapState } from "vuex";
import valid, { errors, sysUser, crmChannel, sysCommonSql } from "../../libs/request";
import bigTable from "@public/modules/bigTable.vue";
import vSearchCollapse from "@public/modules/vSearchCollapse";
import tableDropdown from '@public/modules/tableDropdown.vue';
import { waitUntil, DatePickerOpt, defaultDatePickerValue } from "@public/libs/util";

export default {
    name: 'crm.staffingManagement',
    components: {
        bigTable,
        vSearchCollapse,
        tableDropdown,
    },
    computed: {
        ...mapState(["app", "buttonPerm","calendarConfig"]),
        myButtonPrem() {
            return this.buttonPerm["crm.staffingManagement"] || [];
        }
    },
    data(){
        return {
            isActioning: false, //多次提交拦截
            options3: null,
            tableHeightOut: 72,
            createTime: [],
            loadingCreate: false,
            createLists: [],
            params: {
                name: '',
                channelCode: '',
                createById: '',
            },
            officeId: [],
            pageNo: 1,
            pageSize: this.$store.state.app.pageSizeGlobal,
            officeLists: [],
            selection: [],
            defaultShowCol: null,
            tableData: [],
            dataTotal: 0,
            btnList: [
                // {
                //     type: '',
                //     btnClick: this.addNew,
                //     text: '新增促销员',
                //     style: 'margin-right: 0'
                // },
            ],
            tableColumnArray: [
                {
                    title: this.$t('classlist_compontents_detailinfo_45'),
                    key: "doAction",
                    width: 80,
                    render: (h, params) => {
                        let self = this
                        return h("div", [
                            this.myButtonPrem.indexOf('edit') > -1 ? h(
                                "a",
                                {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    },
                                    style: {
                                        marginRight:'8px',
                                    },
                                    on: {
                                        click: () => {
                                            self.getForm(params.row.channelId)
                                        }
                                    }
                                }, "编辑"
                            ) : '',
                            this.myButtonPrem.indexOf('editStatus') > -1 ? h(
                                "a",
                                {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    },
                                    style: {
                                        marginRight:'8px',
                                    },
                                    on: {
                                        click: () => {
                                            self.checkStatus(params.row);
                                        }
                                    }
                                }, params.row.disable == '0' ? '禁用' : '启用'
                            ):'',
                        ]);
                    }
                }
            ],
            modal: false,
            title: this.$t('modules_spoc_crm_web_src_views_staffingmanagement_index_1666'),
            loading: true,
            formItem: {},
            formItemNew: {
                name: '',
                phone: '',
                officeIds: [],
                only: '0'
            },
            rules: {
                name: [
                    { required: true, message: this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_memberregistration_728'), trigger: 'blur' }
                ],
                officeIds: [
                    { required: true, type: 'array', min: 1, message: this.$t('importPage_warning2'), trigger: 'change' },
                ],
            },
            isEdit: false,
            isConflict: false,
            allOfficeIdsStatus: false,
            allOfficeIds: [],
        };
    },
    mounted(){
        this.getOfficeLists();
        this.getShowTitle();
        waitUntil(
            () => {
                return (
                    (this.calendarConfig && this.calendarConfig.maxMonthInterval && JSON.stringify(this.buttonPerm) != "{}") || false
                );
            },
            () => {
                this.createTime = defaultDatePickerValue()
                this.options3 = DatePickerOpt(this,'DatePicker',Number(this.calendarConfig.maxMonthInterval))
                this.getListData();
                if(this.myButtonPrem.indexOf('edit') > -1){
                    this.btnList = [
                        {
                            type: '',
                            btnClick: this.addNew,
                            text: '新增促销员',
                            style: 'margin-right: 0'
                        },
                    ]
                }
            }
        );
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        setOptTime(flag){
            if(flag){
                this.createTime = []
            }
        },
		changeDivHeight(height) {
			this.tableHeightOut = height;
        },
        getOfficeLists() {
            sysUser.dataScopeFilter()
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.officeLists = res.data.data;
                    let _arr = [];
                    this.officeLists.forEach(office => {
                        _arr.push(office.id);
                    });
                    this.allOfficeIds = _arr;
                }
            })
            .catch(errors.call(this))
        },
        getListData() {
            // 获取data
            this.updateLoadingStatus({ isLoading: true });
            this.params.startTime = this.createTime[0] ? this.createTime[0].format('yyyy-MM-dd 00:00:00') : ""
            this.params.endTime = this.createTime[1] ? this.createTime[1].format('yyyy-MM-dd 23:59:59') : ""
            let params = Object.assign({}, this.params);
            params.pageNo = this.pageNo;
            params.pageSize = this.pageSize;
            crmChannel.listPage(params)
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
            this.defaultShowCol = {
                'true': [
                    {
                        'name': 'channelName',
                        'title': this.$t('modules_spoc_crm_web_src_views_staffingmanagement_index_1654'),
                        'selected': true,
                        'required': true,
                        'dynamiced': false,
                    },
                    {
                        'name': 'channelCode',
                        'title': '促销员编号',
                        'selected': true,
                        'required': true,
                        'dynamiced': false,
                    },
                    {
                        'name': 'phone',
                        'title': this.$t('modules_spoc_crm_web_src_views_staffingmanagement_index_1672'),
                        'selected': true,
                        'required': true,
                        'dynamiced': false,
                    },
                    {
                        'name': 'officeName',
                        'title': this.$t('views_approvalnotice_approvalset_index_300'),
                        'selected': true,
                        'required': true,
                        'dynamiced': false,
                    },
                    {
                        'name': 'createDate',
                        'title': this.$t('scoretemplate_scoretemplate_556'),
                        'selected': true,
                        'required': true,
                        'dynamiced': false,
                    },
                    {
                        'name': 'createByName',
                        'title': this.$t('scoretemplate_scoretemplate_569'),
                        'selected': true,
                        'required': true,
                        'dynamiced': false,
                    },
                    {
                        'name': 'leads',
                        'title': 'leads',
                        'selected': true,
                        'required': true,
                        'dynamiced': false,
                    },
                    {
                        'name': 'vleads',
                        'title': 'Vleads',
                        'selected': true,
                        'required': true,
                        'dynamiced': false,
                    },
                    {
                        'name': 'app',
                        'title': 'APP',
                        'selected': true,
                        'required': true,
                        'dynamiced': false,
                    },
                    {
                        'name': 'appPercent',
                        'title': this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_704'),
                        'selected': true,
                        'required': true,
                        'dynamiced': false,
                    },
                    {
                        'name': 'opp',
                        'title': 'OPP',
                        'selected': true,
                        'required': true,
                        'dynamiced': false,
                    },
                    {
                        'name': 'oppPercent',
                        'title': this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_705'),
                        'selected': true,
                        'required': true,
                        'dynamiced': false,
                    },
                    {
                        'name': 'anew',
                        'title': 'New',
                        'selected': true,
                        'required': true,
                        'dynamiced': false,
                    },
                    {
                        'name': 'newPercent',
                        'title': this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_detial_706'),
                        'selected': true,
                        'required': true,
                        'dynamiced': false,
                    }
                ]
            }
        },
        doSearch() {
			this.pageNo = 1;
			this.getListData();
        },
        resetSearch() {
            this.createTime = defaultDatePickerValue();
            for (const key in this.params) {
                if (this.params.hasOwnProperty(key) && typeof(this.params[key]) == 'string') {
                    this.params[key] = '';
                }
            }
			this.getListData();
        },
        getForm(channelId) {
            let params = {
                channelId
            }
            crmChannel.form(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    let _data = res.data.data;
                    this.formItem = {
                        name: _data.name,
                        phone: _data.phone,
                        officeIds: _data.officeIdList || [],
                        only: _data.only,
                        channelId: _data.id
                    }
                    this.title=this.$t('modules_spoc_crm_web_src_views_staffingmanagement_index_1676')
                    this.isEdit = true;
                    this.modal = true;
                }
            })
            .catch(errors.call(this))
        },
        addNew() {
            this.title=this.$t('modules_spoc_crm_web_src_views_staffingmanagement_index_1666')
            this.isEdit = false;
            this.formItem = Object.assign({}, this.formItemNew);
            this.modal = true;
        },
        ok() {
            this.$refs['addRef'].validate((valid) => {
                if (valid && !this.isConflict) {
                    this.saveItem(); 
                } else {
                    this.changeLoading();
                }
            })
        },
        cancel() {
            this.$refs['addRef'].resetFields();    
        },
        changeLoading() {
            this.loading = false;
            setTimeout(() => {
                this.loading = true;
            }, 0);
        },
        saveItem() {
            let params = Object.assign({}, this.formItem);
            params.officeIds = this.formItem.officeIds.join(',');

            if(this.isActioning){ //多次提交拦截
                return
            }
            this.isActioning = true
            this.updateLoadingStatus({ isLoading: true });

            crmChannel.save(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.$Message.success(this.$t('modules_spoc_crm_web_src_views_staffingmanagement_index_1677'))
                    this.modal = false;
                    this.doSearch();
                } else {
                    this.changeLoading();
                }
            })
            .catch(errors.call(this))
            .finally(()=>{
                this.updateLoadingStatus({ isLoading: false });
                setTimeout(()=>{
                    //多次提交拦截
                    this.isActioning = false
                },200)
            })
        },
        getCreateLists(query) {
            this.loadingCreate = true;
            if (query !== '') {
                let params = {
                    mainTable: "crm_channel",
                    mainField: "create_by",
                    joinField: "id",
                    joinTable: "sys_user",
                    secondField: "name",
                    joinTableSearchParam: query
                };
                sysCommonSql
                .queryPageInputInitData(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.createLists = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.loadingCreate = false;
                });
            } else {
                this.createLists = [];
            }
        },
        checkConflict() {
            // 查重
            if(this.formItem.name && this.formItem.name.length) {
                let params = {
                    name: this.formItem.name
                }
                crmChannel.checkConflict(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.isConflict = res.data.data ? true : false;
                    }
                })
                .catch(errors.call(this))
            } else {
                this.isConflict = false;
            }
        },
        checkAll() {
            this.formItem.officeIds = this.allOfficeIdsStatus ? [...this.allOfficeIds] : [];
        },
        checkOnes() {
            this.allOfficeIdsStatus = this.formItem.officeIds.length == this.allOfficeIds.length ? true : false;
        },
        checkStatus(row) {
            console.log(row.disable)
            if(row.disable == '0') {
                // 当前正常，按钮为禁用，需要判断
                this.findChannelQrcodeRel(row.channelId);
            } else {
                // 当前为禁用，按钮为启用
                this.updateChannelDisable(row.channelId, '0');
            }
        },
        findChannelQrcodeRel(channelId) {
            // 判断此渠道在二维码关联下状态是有效的
            let params = {
                channelId
            }
            crmChannel.findChannelQrcodeRel(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    let _data = res.data.data;
                    if(_data && _data.length) {
                        // 弹窗
                        this.$Modal.confirm({
                            okText: this.$t('modules_spoc_crm_web_src_views_staffingmanagement_index_1678'),
                            cancelText: this.$t('modules_spoc_crm_web_src_views_staffingmanagement_index_1679'),
                            title: this.$t('modules_spoc_crm_web_src_views_staffingmanagement_index_1680'),
                            content: this.$t('modules_spoc_crm_web_src_views_staffingmanagement_index_1681'),
                            onOk: () => {
                                this.updateChannelDisable(channelId, '1');
                            }
                        });
                    } else {
                        this.updateChannelDisable(channelId, '1');
                    }
                }
            })
            .catch(errors.call(this))
        },
        updateChannelDisable(channelId, status) {
            let params = {
                channelId,
                disable: status
            }
            crmChannel.updateChannelDisable(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.$Message.success(this.$t('scoretemplate_compontents_scoremodify_550'))
                    this.doSearch();
                }
            })
            .catch(errors.call(this))
        },
    },
}
</script>


