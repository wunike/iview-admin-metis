<style lang="less">
    .state-group-container2{
        .sgc-header{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 8px;
            margin-top:6px;
        }
        .tbl {
            border: none;
            .ivu-table th {
                height: 50px;
            }
            .ivu-table:before {
                display: none;
            }
            .ivu-table:after {
                display: none;
            }
            .active_box {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                a {
                    margin-right: 16px;
                    // color: #5584ff;
                }
            }
            .click_span {
                cursor: pointer;
            }
        }

    }
    .new-group{
        .ivu-modal-body{
            padding-bottom: 0!important;
        }
		button{
			height: 32px;
		}
    }
    .assign-status{
        /*.ivu-modal-body{*/
        /*    padding-bottom: 0!important;*/
        /*}*/
        .assign-status-box{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: stretch;
            .com{
                border-radius: 4px;
                border: 1px solid #ccc;
                width:254px;
                h2{
                    height:40px;
                    font-size:14px;
                    font-family:PingFangSC-Regular,PingFangSC;
                    font-weight:400;
                    color:rgba(0,0,0,0.65);
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid #ccc;
                    padding:0 12px;
                }
                .com-box{
                    padding-left: 12px;
                    height:265px;
                    .cb-c{
                        display: block;
                        margin-top:12px;

                    }
                }
            }
        }
    }
</style>

<template>
    <div class="state-group-container2">
        <div class="sgc-header">
            <Select @on-change="changeModelType" v-model="modelType" style="width:224px" :placeholder="$t('modules_spoc_core_web_src_views_customstate_statestatistics_208')">
                <Option v-for="item in crm_group_state_type" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Button type="primary" @click="toNewGroup">{{$t('modules_spoc_core_web_src_views_customstate_statestatistics_209')}}</Button>
        </div>
        <Table :columns="columns" :data="dataList" class="tbl" :draggable="islayout" @on-drag-drop="tableDrag"></Table>
        <Modal v-model="newGroup"
               :title="isEdit ? $t('modules_spoc_core_web_src_views_customstate_statestatistics_210') : $t('modules_spoc_core_web_src_views_customstate_statestatistics_211')"
               width="600"
               class="new-group"
               :loading="isLoadingModal"
               :mask-closable="false">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="140">
                <FormItem :label="$t('modules_spoc_core_web_src_views_customstate_statestatistics_212')" prop="fieldName">
                    <Input v-model="formValidate.fieldName" style="width: 306px" :placeholder="$t('scoretemplate_compontents_scoremodify_528')"></Input>
                </FormItem>
                <FormItem :label="$t('modules_spoc_core_web_src_views_customstate_statestatistics_214')" prop="type">
                    <RadioGroup @on-change="changeType" v-model="formValidate.type">
                        <Radio label="0">{{$t('modules_spoc_core_web_src_views_customstate_statestatistics_215')}}</Radio>
                        <Radio label="1">{{$t('modules_spoc_core_web_src_views_customstate_statestatistics_216')}}</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem :label="formValidate.type == '0' ? $t('modules_spoc_core_web_src_views_customstate_statestatistics_217'): $t('modules_spoc_core_web_src_views_customstate_statestatistics_218')" prop="formulaValue">
                   <!--  <Select :placeholder="$t('modules_spoc_core_web_src_views_customstate_statestatistics_219')" style="width: 306px" v-model="formValidate.formulaValue" clearable>
                        <Option v-for="item in crm_customer_status_phase" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select> -->
                    <Input v-model="formValidate.formulaValue" style="width: 306px" :placeholder="$t('scoretemplate_compontents_scoremodify_528')"></Input>
                </FormItem>
                <FormItem :label="$t('principalmailbox_feedbackdetail_478')" prop="remarks">
                    <Input v-model="formValidate.remarks"  type="textarea" style="width: 306px" :placeholder="$t('scoretemplate_compontents_scoremodify_528')"></Input>
                </FormItem>
            </Form>

            <div slot="footer">
                <Button type="text" size="large" @click="cancel">{{$t('classroom_allscore_53')}}</Button>
                <Button type="primary" size="large" @click="ok">{{$t('classroom_allscore_54')}}</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import valid, {
        errors,
        sysUser,
        sysDict,
        sysConfig,
        common
    } from "../../libs/request";
    import { mapMutations, mapGetters, mapActions, mapState } from "vuex";
    import { waitUntil } from '@public/libs/util';
    export default {
        props: {
            islayout: {
                type: Boolean,
                default: true
            },
            menuId: {
                type: String,
                required: true
            },
            configId: {
                type: String,
                required: true
            }
        },
        components: {
        },
        computed: {
        },
        data() {
            return {
                dataListAll: [],
                modelType: '',
                crm_group_state_type:[],
                isEdit: false,
                isLoadingModal: true,
                dataList: [],
                newGroup: false,
                formValidate: {
                    fieldName: '',
                    type: '0',
                    formulaValue: '',
                    remarks: '',
                },
                crm_customer_status_phase: [],
                columns: [
                    {
                        title: this.$t('modules_spoc_core_web_src_views_customstate_stategroup_192'),
                        key: 'sort'
                    },
                    {
                        title: this.$t('modules_spoc_core_web_src_views_customstate_statestatistics_224'),
                        key: 'fieldName'
                    },
                    {
                        title: this.$t('modules_spoc_core_web_src_views_customstate_statestatistics_225'),
                        key: 'type',
                        render:(h,params)=>{
                            return h('div',
                                {},
                                params.row.type == '0' ? this.$t('modules_spoc_core_web_src_views_customstate_statestatistics_215') : this.$t('modules_spoc_core_web_src_views_customstate_statestatistics_216')
                            )
                        }
                    },
                    {
                        title: this.$t('modules_spoc_core_web_src_views_customstate_statestatistics_226'),
                        key: 'formulaValue'
                    },
                    {
                        title: this.$t('modules_expandrow_28'),
                        key: 'remarks',
                        tooltip: true
                    },
                    {
                        title: this.$t('modules_spoc_core_web_src_views_customstate_stategroup_195'),
                        key: 'status',
                        render:(h,params)=>{
                            return h('i-switch',
                                {
                                    props: {
                                        size:'large',
                                        value: params.row.status,
                                        'true-value': '1',
                                        'false-value': '0',
                                    },
                                    // scopedSlots: {
                                    //     open: () => h('span', '正常'),
                                    //     close: () => h('span', '禁用')
                                    // },
                                    style: {
                                        marginRight: '16px'
                                    },
                                    on: {
                                        'on-change': (val) => {
                                            this.changeStatus(params, val)
                                        }
                                    }
                                },
                                [
                                    h('span', {
                                        slot: 'open',
                                        domProps:{
                                            innerHTML: this.$t('views_staff_staffmanage_748')
                                        }
                                    }),
                                    h('span', {
                                        slot:  'close',
                                        domProps:{
                                            innerHTML: this.$t('portal_app_discontinueUse')
                                        }
                                    })
                                ]
                            )
                        }
                    },
                    {
                        title: this.$t('classlist_compontents_detailinfo_45'),
                        key: 'doAction',
                        render:(h,params)=>{
                            return h('div', [
                                h(
                                    'a',
                                    {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '16px'
                                        },
                                        on: {
                                            click: () => {
                                                this.formValidate = {
                                                    fieldName: params.row.fieldName,
                                                    formulaValue: params.row.formulaValue,
                                                    remarks: params.row.remarks,
                                                    sort: params.row.sort ,
                                                    type: params.row.type ,
                                                    status: params.row.status,
                                                }
                                                this.isEdit = true
                                                this.newGroup = true
                                            }
                                        }
                                    },
                                    this.$t('classroom_allscore_51')
                                ),h(
                                    'a',
                                    {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        style: {
                                        },
                                        on: {
                                            click: () => {
                                                if(params.row.status == '1'){
                                                    this.$Message.error(this.$t('modules_spoc_core_web_src_views_customstate_stategroup_200'))
                                                    return
                                                }
                                                this.$Modal.confirm({
                                                    title: this.$t('views_coursepack_bigtableexample_345'),
                                                    content: this.$t('modules_spoc_core_web_src_views_customstate_statestatistics_235'),
                                                    onOk: () => {
                                                        this.doDel(params.index)
                                                    },
                                                    onCancel: () => {
                                                    }
                                                });
                                            }
                                        }
                                    },
                                    this.$t('classlist_compontents_detailinfo_46')
                                )]
                            )
                        }
                    },
                ],
                ruleValidate:{
                    fieldName: [
                        {
                            required: true,
                            message: this.$t('modules_spoc_core_web_src_views_customstate_stategroup_204'),
                            trigger: 'change'
                        }, {
                            pattern: /^.{1,8}$/,
                            message: this.$t('modules_spoc_core_web_src_views_customstate_statestatistics_238'),
                            trigger: 'change'
                        }
                    ],
                    type: [
                        {
                            required: true,
                            message: this.$t('modules_spoc_core_web_src_views_customstate_stategroup_204'),
                            trigger: 'change'
                        }
                    ],
                    formulaValue: [
                        {
                            required: true,
                            message: this.$t('modules_spoc_core_web_src_views_customstate_stategroup_204'),
                            trigger: 'change'
                        }
                        // { required: true, type: 'array', min: 1, message: '至少选择一项', trigger: 'change' },
                    ],
                },
            }
        },
        mounted() {
            // this.getDict()
            this.batchListData()
        },
        methods: {
            ...mapMutations(['updateLoadingStatus']),
            batchListData(){
                sysDict.batchListData({
                    types: 'crm_group_state_type'
                })
                    .then(valid.call(this))
                    .then(res => {
                        if(res.ok) {
                            this.crm_group_state_type = res.data.data.crm_group_state_type
                            this.modelType = this.crm_group_state_type[0].value
                            this.getConfig()
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {});
            },
            changeModelType(val){
                let dataList = this.dataListAll.filter(item=>{
                    return item.type == val
                })
                if(dataList){
                    this.dataList = dataList[0].group
                }
                console.log(this.dataList)
            },
            changeType(){
               this.formValidate.formulaValue = '' 
            },
            toNewGroup() {
                this.$refs.formValidate.resetFields()
                this.isEdit = false
                this.newGroup = true
            },
            getDict(){
                this.updateLoadingStatus({
                    isLoading: true
                });
                sysDict.findChildDictByParentDict({ type:'crm_customer_status_phase' })
                    .then(valid.call(this))
                    .then(res => {
                        if(res.ok) {
                            this.crm_customer_status_phase = res.data.data
                            this.getConfig()
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {
                    });
            },
            doUpdate(objectValue){
                console.log(JSON.stringify(objectValue))
                let dataListAll = JSON.parse(JSON.stringify(this.dataListAll))
                dataListAll.forEach(item=>{
                    if(item.type == this.modelType){
                        item.group = objectValue
                    }
                })
                sysConfig.updateConfig({ 
                    menuId: this.menuId,
                    configId: this.configId,
                    objectValue: dataListAll
                }).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.getConfig();
                });
            },
            doDel(index){
                this.updateLoadingStatus({
                    isLoading: true
                })
                let _obj = JSON.parse(JSON.stringify(this.dataList))

                let newArray = _obj.filter((item, _index) => {
                    return _index != index
                })
                newArray.forEach((item,index) => {
                    item.sort = (index + 1) + ''
                })
                
                this.doUpdate(newArray)
            },
            changeStatus(params, val){
                this.updateLoadingStatus({
                    isLoading: true
                })
                console.log(params, val)
                let _obj = JSON.parse(JSON.stringify(this.dataList))

                _obj.forEach((item,index) => {
                    if(index === params.index){
                        item.status = val
                    }
                })
                
                this.doUpdate(_obj)
            },
            getConfig(){
                sysConfig.getConfig({ 
                    menuId: this.menuId,
                    configId: this.configId
                }).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        console.log(res.data)
                        this.dataListAll = res.data.data
                        let dataList = res.data.data.filter(item=>{
                            return item.type == this.modelType
                        })
                        if(dataList){
                            this.dataList = dataList[0].group
                        }
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({
                        isLoading: false
                    })
                });
            },
            cancel() {
                this.newGroup = false
                this.$refs.formValidate.resetFields()
            },
            ok() {
                this.$refs.formValidate.validate((validRes) => {
                    if (validRes) {
                        this.updateLoadingStatus({
                            isLoading: true
                        })

                        let _obj = JSON.parse(JSON.stringify(this.dataList))

                        if(this.isEdit){
                            _obj.forEach((item, index)=>{
                                if(item.sort == this.formValidate.sort){
                                    item.fieldName = this.formValidate.fieldName
                                    item.type = this.formValidate.type
                                    item.formulaValue = this.formValidate.formulaValue
                                    item.remarks = this.formValidate.remarks
                                }
                            })
                        } else {
                            _obj.push({
                                fieldName: this.formValidate.fieldName,
                                type: this.formValidate.type,
                                formulaValue: this.formValidate.formulaValue,
                                remarks: this.formValidate.remarks,
                                sort: (_obj.length + 1) + '' ,
                                status: "0",
                            })
                        }
                        this.newGroup = false
                        this.doUpdate(_obj)
                        this.$refs.formValidate.resetFields()
                    } else {
                        this.isLoadingModal = false
                        this.newGroup = true
                        setTimeout(()=>{
                            this.isLoadingModal = true
                        },0)
                    }
                })
            },
            tableDrag(index1, index2) {
                console.log(index1, index2)
                if(index1 == index2){
                    return
                }
                this.updateLoadingStatus({
                    isLoading: true
                })

                let _index1 = parseInt(index1)
                let _index2 = parseInt(index2) 

                let _obj = JSON.parse(JSON.stringify(this.dataList))
                let _data = _obj.find((item,index) =>{
                    return index == _index1
                })

                if(_index1 > _index2){
                    _obj.splice(_index2, 0, _data)
                    let _index = _index1 + 1
                    _obj.splice(_index, 1)
                } else {
                    _obj.splice(_index2 + 1, 0, _data)
                    _obj.splice(_index1, 1)
                }
                
                _obj.forEach((item, index)=>{
                    item.sort = (index + 1) + ''
                })

                console.log(_obj)

                this.doUpdate(_obj)
            },
        },
    }
</script>
