<style lang="less">
.classShow {
    .ivu-modal-header {
        background: rgba(247, 248, 250, 1);
        border-radius: 4px 4px 0px 0px;
        .ivu-modal-header-inner {
            // font-size: 18px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.85);
        }
    }
    .ivu-modal-footer {
        .ivu-btn-text {
            border: 1px solid #dcdee2;
        }
    }
    // .#dcdee
    // .pageStyle {
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //     padding-top: 10px;
    //     /* .ivu-page-item-active {
    //   border-color: #2d8cf0;

    // } */
    // }
}
</style>
<template>
    <div>
        <Modal :mask-closable="false" v-model="classShowTipBoo" class-name="classShow" :title="$t('modules_spoc_crm_web_src_views_qrcodeenrollment_components_pagefields_1490')" width="800">
            <div>
                <Input v-model="formData.courseType" :placeholder="$t('modules_spoc_crm_web_src_views_qrcodeenrollment_components_pagefields_1491')" style="width:224px;margin-right:16px;" />
                <Input v-model="formData.courseType" :placeholder="$t('modules_spoc_crm_web_src_views_qrcodeenrollment_components_pagefields_1492')" style="width:224px;" />
                <!-- <Select
                    clearable
                    style="width:224px;"
                    :placeholder="$t('modules_spoc_crm_web_src_views_qrcodeenrollment_components_pagefields_1492')"
                    v-model="formData.courseType"
                    @on-change="courseTypeChange"
                >
                    <Option
                        v-for="item in jw_course_type"
                        :value="item.value"
                        :key="item.value"
                    >{{ item.label }}</Option>
                </Select> -->
                <!-- <Select
          clearable
          style="width:224px;margin-left:12px;"
          :placeholder="$t('modules_spoc_crm_web_src_views_qrcodeenrollment_components_pagefields_1493')"
          v-model="formData.courseGrade"
          @on-change="courseGradeChange"
        >
          <Option
            v-for="item in jw_course_grade"
            :value="item.value"
            :key="item.value"
          >{{ item.label }}</Option>
                </Select>-->
                <Button type="primary" style="margin-left:12px">{{$t('message_addressbook_267')}}</Button>
                <Table :columns="columns0" :data="data0" style="margin-top:20px;" draggable @on-drag-drop="tableDragDrop" border>
                    <template slot-scope="{ row, index }" slot="index">
                        {{ index + 1 }}
                    </template>
                    <template slot-scope="{ row, index }" slot="name">
                        {{ row.name }}
                    </template>
                    <template slot-scope="{ row, index }" slot="type">
                        {{ row.type }}
                    </template>
                    <template slot-scope="{ row, index }" slot="isSelect">
                        <i-switch
                            v-model="row.editable"
                            true-value="1"
                            false-value="0"
                            @on-change="isEditChange(index, $event)"
                            :disabled="row.field == 'name' || row.field == 'phoneList' "
                        ><!-- || row.field == 'visibleOffice' -->
                            <span slot="open">{{$t('modules_leftremenu_92')}}</span>
                            <span slot="close">{{$t('modules_leftremenu_93')}}</span>
                        </i-switch>
                    </template>
                    <template slot-scope="{ row, index }" slot="isRequire">
                        <i-switch
                            v-model="row.required"
                            true-value="1"
                            false-value="0"
                            @on-change="requiredChange(index, $event)"
                            :disabled="row.field == 'name' || row.field == 'phoneList'"
                        >
                            <span slot="open">{{$t('modules_leftremenu_92')}}</span>
                            <span slot="close">{{$t('modules_leftremenu_93')}}</span>
                        </i-switch>
                    </template>
                    <template slot-scope="{ row, index }" slot="move">
                        <CommonIcon type="_bianzu6" :size="16" :style="{ marginTop: '0px', display: 'inline-block', verticalAlign: 'middle' }" />
                    </template>
                </Table>

                <!-- <div class="pageStyle"><Page :total="totalPage" size="small" show-elevator show-sizer @on-change="pageChange" @on-page-size-change="pageSizeChange" /></div> -->
            </div>
            <div slot="footer" class="modiRoomTip">
                <Button @click="handleReset" style="margin-left: 8px">{{$t('classroom_allscore_53')}}</Button>
                <Button type="primary" @click="handleSubmit">{{$t('classroom_allscore_54')}}</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import { mapMutations } from 'vuex';

import CommonIcon from '_c/common-icon';
import valid, { errors, common, cwCapitalTrace, sysDict, sysProps,sysUser } from '../../../libs/request';
export default {
    mounted() {
        this.baseData();
        this.getcustomerList();
        // this.baseTableList();
    },
    props: ['officeId', 'shareArea','formList'],
    data() {
        return {
            formData: {
                courseType: '',
                courseGrade: ''
            },
            currentPage: 1,
            pageSize: 10,
            totalPage: 0,
            checkDate: {},
            classShowTipBoo: false,
            jw_course_type: [],
            jw_course_grade: [],
            columns0: [
                {
                    title: this.$t('courselist_compontents_detailinfo_160'),
                    type: 'index',
                    width: null,
                    resizable: true,
                    slot: 'index'
                },
                {
                    title: this.$t('modules_spoc_crm_web_src_views_qrcodeenrollment_components_pagefields_1492'),
                    width: null,
                    resizable: true,
                    slot: 'name'
                },
                {
                    title: this.$t('modules_spoc_crm_web_src_views_qrcodeenrollment_components_pagefields_1500'),
                    width: null,
                    resizable: true,
                    slot: 'type'
                },
                {
                    title: this.$t('modules_spoc_crm_web_src_views_qrcodeenrollment_components_pagefields_1501'),
                    width: null,
                    resizable: true,
                    slot: 'isSelect'
                },
                {
                    title: this.$t('modules_spoc_crm_web_src_views_qrcodeenrollment_components_pagefields_1502'),
                    width: null,
                    resizable: true,
                    slot: 'isRequire'
                },
                {
                    title: this.$t('modules_spoc_crm_web_src_views_qrcodeenrollment_components_pagefields_1503'),
                    width: null,
                    resizable: true,
                    slot: 'move'
                }
            ],
            data0: [],
            schoolList: []
        };
    },
    components: {
        CommonIcon
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        getcustomerList() {
            let params = {
                tableName: 'crm_customer',
                isFitPhone: 1
            };
            sysProps
                .list(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let data=res.data.data;
                        sysUser
                            .dataScopeFilter(params)
                            .then(valid.call(this))
                            .then(res => {
                                if (res.ok) {
                                    let schoolList = res.data.data;
                                    let obj = {
                                        base: '0',
                                        category: 'sysField',
                                        createById: '1',
                                        createDate: 1571019705000,
                                        delFlag: '0',
                                        dictType: '',
                                        dictValue: '',
                                        editable: '0',
                                        enName: 'visibleOffice',
                                        field: 'visibleOffice',
                                        fieldJsonData: "",
                                        filterList: [],
                                        filterMultiple: false,
                                        filters: "[]",
                                        filtersKey: "",
                                        filtersLabel: "",
                                        id: "",
                                        insertRptKeys: "",
                                        isEdit: '0',
                                        isFitPhone: '1',
                                        isList: '0',
                                        isNull: '0',
                                        isQuery: '1',
                                        jdbcType: 'select',
                                        menuId: '0',
                                        name: this.$t('courselist_courselist_225'),
                                        percent: "",
                                        queryTypeValue: '',
                                        queryType: "",
                                        remarks: "",
                                        required: 'false',
                                        selected: "",
                                        sort: 0,
                                        sortable: "",
                                        tableName: 'crm_customer',
                                        tenantId: "",
                                        tooltip: "",
                                        total: "",
                                        type: this.$t('modules_spoc_crm_web_src_views_qrcodeenrollment_components_pagefields_1505'),
                                        updateById: '1',
                                        updateDate: 1572938899510,
                                        _id: 'crmcustomer_013',
                                        options:[],
                                        // options:schoolList.map(v=>{
                                            // return {"value": v.id, "label": v.name}
                                        // })
                                    };
                                    if(!this.formList.length){
                                        this.data0 = [obj,...data];
                                    }
                                    this.$emit('chooseDetailMethod', this.data0);
                                }
                            })
                            .catch(errors.call(this))
                            .finally(() => {});
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
        },
        pageChange(currentPage) {
            this.currentPage = currentPage;
            this.baseTableList();
            console.log(this.currentPage, this.pageSize);
        },
        pageSizeChange(pageSize) {
            this.pageSize = pageSize;
            this.baseTableList();
            console.log(this.currentPage, this.pageSize);
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
                        //debugger;
                        let aaa = res.data.data.filter(item => {
                            return item.type == this.formData.courseType;
                        });
                        this.jw_course_grade = aaa;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
            this.baseTableList();
            //请求接口
        },
        courseGradeChange() {
            console.log(this.formData);
            this.baseTableList();
            //请求接口
        },
        baseData() {
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
                .finally(() => {
                    // this.updateLoadingStatus({ isLoading: false });
                });
            // let type = "jw_course_type"; //适用年级
            // sysDict
            //   .findChildDictByParentDict({
            //     type
            //   })
            //   .then(valid.call(this))
            //   .then(res => {
            //     if (res.ok) {
            //       this.jw_course_grade = res.data.data;
            //     }
            //   })
            //   .catch(errors.call(this))
            //   .finally(() => {
            //     this.updateLoadingStatus({ isLoading: false });
            //   });
        },
        baseTableList() {
            console.log(this.shareArea);
            let params = {
                officeIds: Array.isArray(this.shareArea) && this.shareArea.length ? this.officeId + ',' + this.shareArea.join(',') : this.officeId,
                type: this.formData.courseType,
                grade: this.formData.courseGrade,
                pageNo: this.currentPage,
                pageSize: this.pageSize
            }; //
            common
                .listPageByOffice(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        // debugger;
                        this.data0 = res.data.data.list;
                        // alert(this.totalPage);
                        this.totalPage = res.data.data.total;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    // this.updateLoadingStatus({ isLoading: false });
                });
        },
        handleSubmit() {
            this.classShowTipBoo = false;
            console.log(this.data0)
            this.$emit('chooseDetailMethod', this.data0);
        },
        handleReset() {
            this.classShowTipBoo = false;
            this.data0.forEach(items => {
                //先取消所有对象的勾选，checkBox设置为false
                this.$set(items, 'checkBox', false);
            });
            this.checkData = {};
        },
        classShowMethods() {
            this.classShowTipBoo = true;
            this.formData.courseType = '';
            this.formData.courseGrade = '';
        },
        tableDragDrop(index1, index2) {
            let item1 = this.data0[index1];
            let item2 = this.data0[index2];
            this.data0.splice(index1, 1, item2);
            this.data0.splice(index2, 1, item1);
            console.log(item1, item2);
        },
        isEditChange(ind, e) {
            this.$set(this.data0[ind], 'editable', e);
        },
        requiredChange(ind, e) {
            this.$set(this.data0[ind], 'required', e);
        }
    },
    watch: {
            'formList': {
              handler: function (val, oldVal) {
                    if(val.length){
                        this.data0 = val;
                        this.$emit('chooseDetailMethod', this.data0);
                    }else{
                        this.getcustomerList();
                    }
              },
              deep: true
            },
    },
};
</script>
