<style lang="less">
    .mytable {
        margin-top: 10px;
        width: 100%;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        padding: 0 16px;
    }

    .ivu-modal-body {
        padding: 24px;
        font-size: 12px;
        line-height: 1.5;
    }

    .modiRoomTipOut {
        >.ivu-modal {
            // width: 800px !important;

            .ivu-modal-header {
                padding: 16px 24px;
            }

            .ivu-modal-body {
                padding-bottom: 5px !important;
            }
        }
    }

    .smallarea {
        border-right: none;
        // width: 112px !important;
        // margin-left:-25px;
        &:after {
            content: '—';
            // display: inline;
            position: absolute;
            right: -12px;
            width: 11px;
            top: 8px;
            font-size: 12px;
            color: #ccc;
        }

        .ivu-input {
            border-right: none;
            border-top-right-radius: 0px;
            border-bottom-right-radius: 0px;
            outline: none;
            // margin-left:25px;
            // width:88px;
        }

        .ivu-input:focus,
        .ivu-input:hover {
            border-color: #dcdee2;
        }

        &+.ivu-input-wrapper {
            // width: 112px !important;

            .ivu-input {
                border-left: none;
                border-top-left-radius: 0px;
                border-bottom-left-radius: 0px;
                outline: none;
                width:88px;
            }

            .ivu-input:focus,
            .ivu-input:hover {
                border-color: #dcdee2;
            }

            &:before {
                content: '';
                display: inline;
                position: absolute;
                left: -12px;
                top: 0px;
                width: 12px;
                height: 32px;
                /* background: red; */
                border-top: 1px solid #dcdee2;
                border-bottom: 1px solid #dcdee2;
                color: #dcdee2;

            }
        }
    }
</style>
<template>
    <div>
        <v-search-collapse @search="findListData" @reset="resetSearch" ref="collapse" @changeDivHeight="changeDivHeight">
            <Select v-model="formRoomFind.officeId" clearable :placeholder="$t('messagemanagement_index_344')" style="width:224px;">
                <Option v-for="item in roomAreaList" :value="item.id" :key="item.value">{{item.code}}{{ item.name }}</Option>
            </Select>
            <Input v-model="formRoomFind.name" :placeholder="$t('views_room_classroom_560')" @on-keyup="removeSpace(1)"></Input>
            <Select v-model="formRoomFind.type" clearable :placeholder="$t('classroom_evaluation_88')">
                <Option v-for="item in roomTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <div class="special-box" style="width: 188px">
                <Input v-model="formRoomFind.areaLower" :placeholder="$t('views_room_classroom_562')" :maxlength="100" @on-keyup="removeSpace(2)"
                    class="smallarea" style="margin-right: 12px;width: 88px;"></Input>
                <Input v-model="formRoomFind.areaHigher" :placeholder="$t('views_room_classroom_563')" :maxlength="100"
                    @on-keyup="removeSpace(3)" style="width: 88px;"></Input>
            </div>
            <Select v-model="formRoomFind.status" clearable :placeholder="$t('views_coursepack_coursepack_353')">
                <Option v-for="item in roomStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </v-search-collapse>
        <big-table 
            v-if="defaultShowCol" 
            class="mytable" 
            :tableName="$t('views_room_classroom_565')" 
            :tableData="tableData"
            :tableColumnArray="tableColumnArray" 
            :defaultShowCol="defaultShowCol" 
            :maxFlagForFixed="8"
            :btnList="btnList" 
            :canSelection="true" 
            :updateShowTitleMethod="updateShowTitle" 
            :dataTotal="dataTotal"
            :tableHeightOut="tableHeightOut"
            :pageNo="pageNo"
            @resetDefault="resetDefaultCol"
            @selectionChange="selectionChange" 
            @sortChange="sortChange" 
            @pageChange="pageChange">
        </big-table>
        <export-modal ref="exportModal" :exportMethod="exportMethod"></export-modal>
        <Modal v-model="modiRoomTip" width="850" :title="disabledtype?$t('views_room_classroom_566'):$t('views_room_classroom_567')" :mask-closable="false"
            class-name="modiRoomTipOut">
            <div>
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                    <FormItem :label="$t('views_room_classroom_568')" prop="classroomCode" v-if="disabledtype">
                        <span>{{formValidate.classroomCode}}</span>
                    </FormItem>
                    <FormItem :label="$t('views_room_classroom_569')" prop="name">
                        <Input v-model="formValidate.name" :placeholder="$t('scoretemplate_compontents_scoremodify_528')"></Input>
                    </FormItem>
                    <Row>
                        <Col span="24" style="display:flex;">
                        <FormItem prop="officeId" :label="$t('views_room_classroom_571')">
                            <Select v-model="formValidate.officeId" :placeholder="$t('pushsettings_index_505')" :disabled="disabledtype"
                                style="width:290px;">
                                <Option v-for="item in roomAreaList" :value="item.id" :key="item.id">
                                    {{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem prop="type" :label="$t('views_room_classroom_573')" style="margin-left:22px;">
                            <Select v-model="formValidate.type" :placeholder="$t('pushsettings_index_505')" :disabled="disabledtype"
                                @on-change="roomtypeChange" style="width:290px;">
                                <Option v-for="item in roomTypeList" :value="item.value" :key="item.value">
                                    {{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        </Col>
                    </Row>
                    <FormItem :label="$t('views_room_classroom_574')" prop="area">
                        <Row>
                            <Col span="8">
                            <Input v-model="formValidate.area" :placeholder="$t('scoretemplate_compontents_scoremodify_528')" style="width:290px;">
                            <span slot="append">{{$t('views_room_classroom_575')}}</span>
                            </Input>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem :label="$t('views_room_classroom_576')" prop="address" v-if="formValidate.type=='extramural'">
                        <Row>
                            <Col span="24">
                            <Input v-model="formValidate.address" :placeholder="$t('scoretemplate_compontents_scoremodify_528')"></Input>
                            </Col>
                            <Col span="3" style="margin-left:5px;">
                            </Col>
                        </Row>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer" class="modiRoomTip">
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">{{$t('classroom_allscore_53')}}</Button>
                <Button type="primary" @click="handleSubmit('formValidate')">{{$t('classroom_allscore_54')}}</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import { mapMutations,mapState } from "vuex";
    import bigTable from '@public/modules/bigTable.vue';
    import exportModal from "@public/modules/exportModal.vue";
    import vSearchCollapse from '@public/modules/vSearchCollapse';
    import valid, { errors, jwClassroom, sysDict,sysUser  } from "../../libs/request";
    import { waitUntil } from '@public/libs/util';
    export default {
        name: 'core.classroom',
        components: {
            bigTable,
            exportModal,
            vSearchCollapse,
        },
        computed: {
            ...mapState(['userInfo','app']),
        },
        mounted() {
            this.getByType();
            this.getShowTitle()
            waitUntil(
				() => {
					if (this.app.currOfficeId) {
                        this.$set(this.formRoomFind, 'officeId', this.app.currOfficeId == 'all' ? '' : this.app.currOfficeId)
					}
					return this.app.currOfficeId || false;
				},
				() => {
                    this.getListData();
				}
			);
        },
        data() {
            // 面积输入正数  可以是小数
            var validateRoombig = function (rule, value, callback) {
                if (!value) {
                    callback(new Error(this.$t('views_room_classroom_579')))
                } else if (/^([0-9]{7,})(\.{0}[0-9]{0}|\.{1}[0-9]{1,2})$/.test(value)) {
                    return callback(new Error(this.$t('views_room_classroom_580')))
                } else if (/^([0-9]{1,6})(\.{0}[0-9]{0}|\.{1}[0-9]{1,2})$/.test(value)) {
                    callback();
                } else {
                    return callback(new Error(this.$t('views_room_classroom_581')))
                }
            };
            // 地址 /教室名称
            var validateSpace = function (rule, value, callback) {
                if (!value) {
                    callback(new Error(this.$t('views_room_classroom_579')))
                } else if (/^[ ]*$/.test(value)) {
                    return callback(new Error(this.$t('views_room_classroom_582')))
                } else {
                    callback();
                }
            };
            return {
                isActioning: false, //多次提交拦截
                tableHeightOut: 72,//324,
                name1: '',
                name2: '',
                selection: [],
                updateShowTitle: jwClassroom.updateShowTitle,
                exportMethod: jwClassroom.exportSelected, //导出用到的方法对象
                defaultShowCol: null,
                dataTotal: 0,
                pageNo: 1,
                pageSize: this.$store.state.app.pageSizeGlobal,
                sortObj: {},
                rowData: {},
                //查询区
                params: {},
                formRoomFind: {
                    officeId: '',
                    name: '',
                    type: '',
                    status: '',
                    areaLower: '',
                    areaHigher: '',
                    // pageNo: '',
                    // pageSize: '',
                },
                roomStatusList: [
                    {
                        value: '0',
                        label: this.$t('scoretemplate_scoretemplate_558')
                    },
                    {
                        value: '1',
                        label: this.$t('scoretemplate_scoretemplate_559')
                    },
                ],
                //修改区
                modiRoomTip: false,
                disabledtype: false,
                formValidate: {
                    classroomCode: '',
                    name: '',
                    officeId: '',
                    officeName: '',
                    type: '',
                    area: '',
                    address: '',
                },
                ruleValidate: {
                    name: [
                        { required: true, validator: validateSpace, trigger: 'change' }
                    ],
                    officeId: [
                        { required: true, message: this.$t('views_room_classroom_579'), trigger: 'change' }
                    ],
                    type: [
                        { required: true, message: this.$t('views_room_classroom_579'), trigger: 'change' }
                    ],
                    address: [
                        { required: true, validator: validateSpace, trigger: 'change' }
                    ],
                    area: [
                        { required: true, validator: validateRoombig, trigger: 'change' }
                    ],
                },
                roomTypeList: [
                ],
                roomAreaList: [

                ],
                tableColumnArray: [
                    {
                        title: this.$t('views_room_classroom_585'),
                        key: 'classroomCode',
                        // width: 110,
                        fixed: 'left'
                    },
                    {
                        title: this.$t('views_room_classroom_560'),
                        key: 'name',
                        // minWidth: 100,
                        fixed: 'left',
                        // tooltip: true,
                    },
                    {
                        title: this.$t('views_room_classroom_586'),
                        key: 'officeName',
                        // minWidth: 100,
                        fixed: 'left',
                        // tooltip: true,
                    },
                    {
                        title: this.$t('views_room_classroom_587'),
                        key: 'type',
                        // width: 100,
                        fixed: 'left',
                        render: (h, params) => {
                            if (this.roomTypeList.length >= 1) {
                                return h('div', this.roomTypeList.filter(item => {
                                    return params.row.type == item.value
                                })[0].label)
                            };
                        }
                    },
                    {
                        title: this.$t('views_room_classroom_588'),
                        key: 'area',
                        // width: 110,
                        fixed: 'left',
                        // tooltip: true,
                    },
                    {
                        title: this.$t('views_room_classroom_589'),
                        key: 'createByName',
                        // width: 100,
                    },
                    {
                        title: this.$t('views_room_classroom_590'),
                        key: 'createDate',
                        // width: 150,
                    },
                    {
                        title: this.$t('views_room_classroom_591'),
                        key: 'updateByName',
                        // width: 100,
                    },
                    {
                        title: this.$t('views_room_classroom_592'),
                        key: 'updateDate',
                        // width: 150,
                    },
                    {
                        title: this.$t('views_room_classroom_593'),
                        key: 'address',
                        // minWidth: 150,
                    },
                    {
                        title: this.$t('pushsettings_index_496'),
                        key: 'status',
                        width: 80,
                        fixed: 'left',
                        render: (h, params) => {
                            return h('div',
                                [
                                    h('Badge', {
                                        props: {
                                            status: params.row.status == '1' ? 'success' : 'default',
                                        }
                                    }), params.row.status == '1' ? this.$t('scoretemplate_scoretemplate_559') : this.$t('scoretemplate_scoretemplate_558')]
                            )
                        }
                    },
                    {
                        title: this.$t('classlist_compontents_detailinfo_45'),
                        key: 'doAction',
                        width: 95,
                        // fixed: 'right',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    style: {
                                    },
                                    on: {
                                        click: () => {
                                            this.$Modal.confirm({
                                                title: this.$t('views_coursepack_bigtableexample_345'),
                                                content: '<p>' + this.$t('views_coursepack_bigtableexample_345') + ' ' + params.row.name + this.$t('scoretemplate_scoretemplate_563') + '</p>',
                                                onOk: () => {
                                                    this.remove(params.row.id);
                                                },
                                                onCancel: () => {
                                                }
                                            })
                                        }
                                    }
                                }, this.$t('classlist_compontents_detailinfo_46')),
                                h('a', {
                                    style: {
                                        'margin-left': '5px',
                                    },
                                    on: {
                                        click: () => {
                                            this.$Modal.confirm({
                                                title: this.$t('classlist_classlist_12'),
                                                content: '<p>' + this.$t('views_room_classroom_599') + '</p>',
                                                onOk: () => {
                                                    this.invalid(params.row.status, params.row.id);
                                                },
                                                onCancel: () => {
                                                }
                                            })
                                        }
                                    }
                                }, params.row.status == '1' ? this.$t('scoretemplate_scoretemplate_558') : this.$t('scoretemplate_scoretemplate_559')),
                                h('a', {
                                    style: {
                                        'margin-left': '5px',
                                    },
                                    on: {
                                        click: () => {
                                            this.modiRoomTip = true;
                                            this.modifiHandle(params.row);
                                        }
                                    }
                                }, this.$t('modules_expandrow_15'))
                            ]);
                        }
                    }
                ],
                tableData: [],
                btnList: [
                    {
                        style: {},
                        type: '',
                        btnClick: this.isCreate,
                        text: this.$t('views_room_classroom_567')
                    },
                    {
                        style: {},
                        type: '',
                        btnClick: this.isImport,
                        text: this.$t('views_coursepack_bigtableexample_343')
                    },
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
                    ],


                ],
            }
        },
        methods: {
            ...mapMutations(["updateLoadingStatus"]),
            resetDefaultCol(){
                this.updateLoadingStatus({ isLoading: true });
                jwClassroom.clearShowField({
                    pageIdentifier: "jwClassroom",
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
            changeDivHeight(height){
                this.tableHeightOut = height
            },
            //不是数字就清空数据
            numArea(value) {
                var patt1 = new RegExp(/^[0-9]{0,}$/);
                return patt1.test(value);
            },
            removeSpace(val) {
                if (val == 1) {
                    this.formRoomFind.name = this.formRoomFind.name.replace(/\s+/g, '');
                } else if (val == 2) {
                    if (!this.numArea(this.formRoomFind.areaLower)) {
                        this.formRoomFind.areaLower = '';
                    }
                    this.formRoomFind.areaLower = this.formRoomFind.areaLower.replace(/\s+/g, '');
                } else if (val == 3) {
                    if (!this.numArea(this.formRoomFind.areaHigher)) {
                        this.formRoomFind.areaHigher = '';
                    }
                    this.formRoomFind.areaHigher = this.formRoomFind.areaHigher.replace(/\s+/g, '');
                }
            },
            findListData() {
                if ((this.formRoomFind.areaLower != '') && (this.formRoomFind.areaHigher != '')) {
                    if (Number(this.formRoomFind.areaLower) > Number(this.formRoomFind.areaHigher)) {
                        this.$Message.error(this.$t('views_room_classroom_605'));
                        this.formRoomFind.areaHigher = '';
                        return
                    }
                }
                this.pageNo = 1
                // this.findList = true;
                this.getListData();
            },
            resetSearch() {
                this.pageNo = 1
                this.formRoomFind = {};
                this.$set(this.formRoomFind, 'officeId', this.app.currOfficeId == 'all' ? '' : this.app.currOfficeId)
                this.getListData();
            },
            getByType() {
                this.updateLoadingStatus({ isLoading: true });
                sysDict.getByType({ menuId: '4001', type: 'jw_classroom_type' }).then(valid.call(this)).then((res) => {
                    if (res.ok) {
                        this.roomTypeList = res.data.data;
                    } else {
                        this.$Message.error(res.data.message);
                    }
                }).catch(errors.call(this)).finally(() => {
                }).finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
                let _this = this;
                sysUser.dataScopeFilter().then(valid.call(this)).then((res) => {
                    if (res.ok) {
                        _this.roomAreaList = res.data.data;
                    } else {
                        this.$Message.error(res.data.message);
                    }
                }).catch(errors.call(this)).finally(() => {
                }).finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
            },
            modifiHandle(row) {
                this.$refs['formValidate'].resetFields();
                this.disabledtype = true;
                this.modiRoomTip = true;
                let rows = JSON.parse(JSON.stringify(row));
                this.formValidate.id = row.id;
                this.formValidate.classroomCode = row.classroomCode;
                this.formValidate.name = row.name;
                this.formValidate.officeId = row.officeId;
                this.formValidate.officeName = row.officeName;
                this.formValidate.type = row.type;
                this.formValidate.area = row.area;
                this.formValidate.address = row.address;
                this.rowData = JSON.parse(JSON.stringify(row));
            },
            isCreate(add) {
                this.$refs['formValidate'].resetFields();
                this.formValidate.name = '';
                this.formValidate.officeId = '';
                this.formValidate.officeName = '';
                this.formValidate.type = '';
                this.formValidate.area = '';
                this.formValidate.address = '';
                this.disabledtype = false;
                this.formValidate.id = '';
                this.modiRoomTip = true;
            },
            handleReset(name) {
                this.$refs[name].resetFields();
                this.modiRoomTip = false;
            },
            handleSubmit(name) {
                this.disabledtype ? (this.rowData.id = this.formValidate.id) : (this.rowData.id = '');
                (this.formValidate.type == 'extramural') ? (this.rowData.address = this.formValidate.address) : (this.rowData.address = '');
                this.rowData.classroomCode = this.formValidate.classroomCode;
                this.rowData.name = this.formValidate.name;
                this.rowData.officeId = this.formValidate.officeId;
                this.rowData.officeName = this.formValidate.officeName;
                this.rowData.type = this.formValidate.type;
                this.rowData.area = this.formValidate.area;
                delete this.rowData._index;
                delete this.rowData._rowKey;
                let modiData = this.rowData;
                this.$refs[name].validate((validres) => {
                    if (validres) {
                        if(this.isActioning){ //多次提交拦截
                            return
                        }
                        this.isActioning = true
                        this.updateLoadingStatus({ isLoading: true });
                        jwClassroom.save(modiData).then(valid.call(this)).then((res) => {
                            if (res.ok) {
                                this.$Message.success(this.disabledtype ? this.$t('courselist_compontents_modify_200') : this.$t('scoretemplate_compontents_scoremodify_551'));
                                if(!this.disabledtype){
                                    this.pageNo = 1
                                }
                                this.getListData();
                            } else {
                                this.$Message.error(res.data.message);
                            }
                        }).catch(errors.call(this))
                        .finally(() => {
                            this.modiRoomTip = false;
                            this.updateLoadingStatus({ isLoading: false });
                            setTimeout(()=>{
                                //多次提交拦截
                                this.isActioning = false
                            },200)
                        });;
                    } else {
                        this.$Message.error(this.$t('views_room_classroom_608'));
                    }
                })
            },
            roomtypeChange(val) {
                this.formValidate.type = val;
            },
            invalid(status, id) {
                status = (status == '1') ? '0' : '1'
                let params = { id, status }
                jwClassroom.changeStatus(params).then(valid.call(this)).then((res) => {
                    if (res.ok) {
                        let text = status == '1' ? this.$t('scoretemplate_scoretemplate_559') : this.$t('scoretemplate_scoretemplate_558')
                        this.$Message.success(this.$t('pushsettings_index_496') + text + this.$t('scoretemplate_scoretemplate_570'));
                        this.getListData();
                    }
                }).catch(errors.call(this)).finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
            },
            remove(id) {
                let ids = { "id": id };
                this.updateLoadingStatus({ isLoading: true });
                jwClassroom.delete(ids).then(valid.call(this)).then((res) => {
                    if (res.ok) {
                        this.$Message.success(this.$t('scoretemplate_scoretemplate_571'));
                        this.pageNo = 1
                        this.getListData();
                    }
                    this.updateLoadingStatus({ isLoading: false });
                }).catch(errors.call(this)).finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
            },
            itemForm(obj) {
                if (obj.key === 'delData') {
                    if (obj.row.status != '1') {
                        this.$Modal.confirm({
                            title: this.$t('views_coursepack_bigtableexample_345'),
                            content: '<p>' + this.$t('views_room_classroom_612') + '</p>',
                            onOk: () => {
                                this.deleteCoursePack(obj.row.id)
                            },
                            onCancel: () => {
                            }
                        });
                    }
                } else if (obj.key === 'changeStatus') {
                    this.$Modal.confirm({
                        title: this.$t('views_room_classroom_613'),
                        content: '<p>' + this.$t('views_room_classroom_614') + '</p>',
                        onOk: () => {
                            this.changeStatus(obj.row.id, obj.row.status)
                        },
                        onCancel: () => {
                        }
                    });
                } else if (obj.key === 'copy') {
                }
            },
            //获取数据，根据情况修改接口、传参
            getListData() {
                this.updateLoadingStatus({ isLoading: true });
                this.currentPage = this.pageNo
                let param = {
                    pageNo: this.pageNo,
                    pageSize: this.pageSize,
                }
                param = Object.assign({}, param, this.formRoomFind);
                // if (this.sortObj.order != 'normal' && this.sortObj.key) {
                //     param.orderByType = this.sortObj.key
                //     param.orderByStatus = this.sortObj.order == 'asc' ? '1' : '2'
                // }
                this.searchObj = param //这里需要给searchObj 赋值，导出数据的时候需要用到
                // if (this.findList) {
                //     param.officeId = this.formRoomFind.officeId;
                //     param.name = this.formRoomFind.name;
                //     param.type = this.formRoomFind.type;
                //     param.status = this.formRoomFind.status;
                //     param.areaLower = this.formRoomFind.areaLower;
                //     param.areaHigher = this.formRoomFind.areaHigher;
                // }
                // this.findList=false;
                jwClassroom.listPage(param)
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            let result = res.data.data
                            this.tableData = result.list
                            this.dataTotal = result.total
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {
                        this.updateLoadingStatus({ isLoading: false });
                    });
            },
            //分页方法 如果有分页则为必须方法，修改getCourseList为自己的获取数据方法 这里注意。不再有每页个数改变的方法了
            pageChange(pageNo, pageSize) {
                if (!pageNo) { //防止无用重复请求
                    return
                }
                this.pageNo = pageNo
                this.pageSize = pageSize
                this.getListData()
            },
            //如果有排序字段则为 必须方法，修改getCourseList为自己的获取数据方法
            sortChange(obj) {
                console.log(obj) // {key: "createByName" ,order: "desc"}
                this.sortObj = obj
                this.getListData()
            },
            //可选方法，如果是多选的话必须有
            selectionChange(selection) {
                console.log(selection)
                this.selection = selection
            },
            //必须方法，获取默认显示的可选列  接口根据需要自行更换，每个模块的接口是不一致的
            getShowTitle(closeLoad) {
                jwClassroom.getShowTitle({
                    pageIdentifier: 'jwClassroom',
                    lang: this.$i18n.locale,
                    voName: 'com.windliven.spoc.modules.jw.entity.JwClassroom'
                })
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            // console.log(res.data.data.false)
                            /* let _res = []
                            res.data.data.false.forEach(item => {
                                if (item.selected) {
                                    _res.push(item.name)
                                }
                            })
                            this.defaultShowCol = _res */
                            this.defaultShowCol = res.data.data
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {
                        if(closeLoad){
                            this.updateLoadingStatus({ isLoading: false });
                        }
                    });
            },
            getDetail(name) {
                alert(name)
            },
            isExport(val) {
                //这里val的值。是根据设置下拉类型button设定的值来匹配判断
                if (val == '2' && !this.selection.length) {
                    this.$Message.error(this.$t('scoretemplate_scoretemplate_572'))
                    return;
                }
                // this.tableColumnArray.map((item) => {
                //     item.name = item.key;
                //     if (item.fixed) {
                //         item.selected = true
                //     } else {
                //         item.selected = false
                //     }
                // })
                // let data = this.tableColumnArray.filter(item => {
                //     return item.key != 'doAction'
                // })
                let searchObj = this.searchObj;
                if (val == '1') {
                    // searchObj = this.searchObj;
                    // searchObj.areaHigher = this.formRoomFind.areaHigher;
                    // searchObj.areaLower = this.formRoomFind.areaLower;
                    // searchObj.name = this.formRoomFind.name;
                    // searchObj.officeId = this.formRoomFind.officeId;
                    // searchObj.status = this.formRoomFind.status;
                    // searchObj.type = this.formRoomFind.type;
                    this.exportMethod = jwClassroom.exportAll //导出用到的方法对象
                } else if (val == '2') {
                    //如果是导出所选，需要在这里传递所选对象、或者对象ID，这里根据需要自行处理，并作为搜索参数的一部分传递到导出组件
                    searchObj = {
                        ids: this.selection.map(item => { return item.id })
                    }
                    this.exportMethod = jwClassroom.export;//导出用到的方法对象
                }
                this.$refs.exportModal.noShowExport(this.exportMethod, searchObj);
                // jwClassroom.exportSelected( this.searchObj.selection).then(valid.call(this)).then((res) => { this.MyFileMethods(res); })
            },
            isImport() {
                this.$router.push({
                    name: 'core.classimport'
                });
            },
        },
        watch: {
			"app.currOfficeId": function(val, oldVal) {
				if (oldVal) {
                    this.$set(this.formRoomFind, 'officeId', this.app.currOfficeId == 'all' ? '' : this.app.currOfficeId)
					this.getListData();
				}
			}
		}
    }
</script>
