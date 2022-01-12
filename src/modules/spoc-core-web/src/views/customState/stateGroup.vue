<style lang="less">
.state-group-container1{
    .sgc-header{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        // overflow: hidden;
        width: 100%;
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
        margin-top:20px;
        .center{
            height:320px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .com{
            border-radius: 4px;
            border: 1px solid rgba(0,0,0,0.15);
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
                border-bottom: 1px solid rgba(0,0,0,0.15);
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
    <div class="state-group-container1">
        <div class="sgc-header">
            <Select v-model="modelType" @on-change="changeModelType" style="width:224px" :placeholder="$t('modules_spoc_core_web_src_views_customstate_stategroup_178')">
                <Option v-for="item in crm_group_state_type" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Button type="primary" @click="toNewGroup">{{$t('modules_spoc_core_web_src_views_customstate_stategroup_179')}}</Button>
        </div>
        <Table :columns="columns" :data="dataList" class="tbl" :draggable="islayout" @on-drag-drop="tableDrag"></Table>
        <Modal v-model="newGroup"
               :title="$t('modules_spoc_core_web_src_views_customstate_stategroup_179')"
               width="600"
               class="new-group"
               :loading="isLoadingModal"
               :mask-closable="false">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="140">
                <FormItem :label="$t('modules_spoc_core_web_src_views_customstate_stategroup_180')" prop="name">
                    <Input v-model="formValidate.name" style="width: 306px" :placeholder="$t('modules_spoc_core_web_src_views_customstate_stategroup_181')"></Input>
                </FormItem>
                <FormItem :label="$t('modules_spoc_core_web_src_views_customstate_stategroup_182')" prop="status">
                    <Select :placeholder="$t('modules_spoc_core_web_src_views_customstate_stategroup_183')" style="width: 306px" v-model="formValidate.status" multiple clearable>
                        <Option v-for="item in crm_customer_status_phase" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Checkbox style="margin-left:10px;" @on-change="createSelAllPhase" v-model="selAllPhase">{{$t('modules_spoc_core_web_src_views_customstate_stategroup_184')}}</Checkbox>
                </FormItem>
            </Form>

            <div slot="footer">
                <Button type="text" size="large" @click="cancelNewGroup">{{$t('modules_spoc_core_web_src_views_customstate_stategroup_185')}}</Button>
                <Button type="primary" size="large" @click="okNewGroup">{{$t('modules_spoc_core_web_src_views_customstate_stategroup_186')}}</Button>
            </div>
        </Modal>
        <Modal v-model="assignStatus"
               :title="isCreate? $t('modules_spoc_core_web_src_views_customstate_stategroup_187') : $t('modules_spoc_core_web_src_views_customstate_stategroup_188')"
               width="600"
               class="assign-status"
               :loading="assignStatusLoading"
               :mask-closable="false">
            <div>{{$t('modules_spoc_core_web_src_views_customstate_stategroup_180')}}<Input v-model="hasSelectGroupName" style="width: 491px" :placeholder="$t('modules_spoc_core_web_src_views_customstate_stategroup_189')"></Input>
                <div class="assign-status-box">
                    <div class="com">
                        <h2>
                            <Checkbox @on-change="createSelAllPhase0" v-model="selAll0">{{toSelectPhase.length}}/{{toSelectPhaseList.length}}</Checkbox>
                            <span>{{$t('modules_spoc_core_web_src_views_customstate_stategroup_190')}}</span>
                        </h2>
                        <div class="com-box">
                            <CheckboxGroup v-model="toSelectPhase">
                                <Checkbox v-for="(item, index) in toSelectPhaseList" :key="index" :label="item.value">{{item.label}}</Checkbox>
                            </CheckboxGroup>
                        </div>
                    </div>
                    <div class="center">
                        <Button size="small" @click="toAddPhase"><Icon type="ios-arrow-forward" /></Button>
                        <Button size="small" @click="toRemovePhase" style="margin-top:10px;"><Icon type="ios-arrow-back" /></Button>
                    </div>
                    <div class="com">
                        <h2>
                            <Checkbox @on-change="createSelAllPhase1" v-model="selAll1">{{forRemoveSelectPhase.length}}/{{toRemovePhaseList.length}}</Checkbox>
                            <span>{{$t('modules_spoc_core_web_src_views_customstate_stategroup_191')}}</span>
                        </h2>
                        <div class="com-box">
                            <CheckboxGroup v-model="forRemoveSelectPhase">
                                <Checkbox v-for="(item, index) in toRemovePhaseList" :key="index" :label="item.value">{{item.label}}</Checkbox>
                            </CheckboxGroup>
                        </div>
                    </div>
                </div>
            </div>
            <div slot="footer">
                <Button type="text" size="large" @click="cancel">{{$t('modules_spoc_core_web_src_views_customstate_stategroup_185')}}</Button>
                <Button type="primary" size="large" @click="ok">{{$t('modules_spoc_core_web_src_views_customstate_stategroup_186')}}</Button>
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
        toSelectPhaseList(){
            return this.crm_customer_status_phase.filter(item=>{
                return this.hasSelectPhase.indexOf(item.value) < 0
            })
        },
        toRemovePhaseList(){
            return this.crm_customer_status_phase.filter(item=>{
                return this.hasSelectPhase.indexOf(item.value) > -1
            })
        },
    },
    data() {
        return {
            isCreate: true,
            hasSelectGroupName: '',
            dataListAll: [],
            modelType: '',
            crm_group_state_type:[],
            isLoadingModal: true,
            assignStatusLoading: true,
            selAll0: false,
            selAll1: false,
            selAllPhase: false,
            editIndex: -1,
            toSelectPhase: [],
            forRemoveSelectPhase: [],
            dataList: [],
            hasSelectPhase: [],
            newGroup:false,
            formValidate:{
                name:'',
                status: []
            },
            assignStatus:false,
            crm_customer_status_phase: [],
            columns: [
                {
                    title: this.$t('modules_spoc_core_web_src_views_customstate_stategroup_192'),
                    key: 'sort'
                },
                {
                    title: this.$t('modules_spoc_core_web_src_views_customstate_stategroup_193'),
                    key: 'groupName'
                },
                {
                    title: this.$t('modules_spoc_core_web_src_views_customstate_stategroup_194'),
                    key: 'states',
                    render:(h,params)=>{
                        let strArr = []
                        strArr = params.row.states.map(item=>{
                            return item.name
                        })
                        return h('div',
                            {
                            },
                            strArr.join(',')
                        )
                    }
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
                                            let q = []
                                            params.row.states.forEach(item =>{
                                                q.push(item.value)
                                            })
                                            this.editIndex = params.index
                                            this.hasSelectPhase = q
                                            this.isCreate = false
                                            this.hasSelectGroupName = params.row.groupName
                                            this.forRemoveSelectPhase = []
                                            this.toSelectPhase = []
                                            this.selAll0 = false
                                            this.selAll1 = false
                                            this.assignStatus = true
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
                                                title: this.$t('modules_spoc_core_web_src_views_customstate_stategroup_201'),
                                                content: this.$t('modules_spoc_core_web_src_views_customstate_stategroup_202'),
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
                name: [
                    {
                        required: true,
                        message: this.$t('modules_spoc_core_web_src_views_customstate_stategroup_204'),
                        trigger: 'change'
                    }, {
                        pattern: /^.{1,8}$/,
                        message: this.$t('modules_spoc_core_web_src_views_customstate_stategroup_205'),
                        trigger: 'change'
                    }
                ],
                status: [
                    { required: true, type: 'array', min: 1, message: this.$t('modules_spoc_core_web_src_views_customstate_stategroup_206'), trigger: 'change' },
                ],
            },
        }
    },
    mounted() {
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
                        this.getDict()
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
        },
        createSelAllPhase0(){
            if(this.selAll0){
                this.toSelectPhase = this.toSelectPhaseList.map(item=>{
                    return item.value
                })
            } else {
                this.toSelectPhase = []
            }
        },
        createSelAllPhase1(){
            if(this.selAll1){
                this.forRemoveSelectPhase = this.toRemovePhaseList.map(item=>{
                    return item.value
                })
            } else {
                this.forRemoveSelectPhase = []
            }
        },
        createSelAllPhase(){
            if(this.selAllPhase){
                this.formValidate.status = this.crm_customer_status_phase.map(item=>{
                    return item.value
                })
            } else {
                this.formValidate.status = false
            }
        },
        toNewGroup(){
            this.isCreate = true
            this.hasSelectPhase = []
            this.hasSelectGroupName = ''
            this.forRemoveSelectPhase = []
            this.toSelectPhase = []
            this.selAll0 = false
            this.selAll1 = false
            this.assignStatus = true
            // this.selAllPhase = false
            // this.$refs.formValidate.resetFields();
            // this.newGroup = true
        },
        toAddPhase(){
            this.hasSelectPhase = this.hasSelectPhase.concat(this.toSelectPhase)
            this.toSelectPhase = []
            this.selAll0 = false
        },
        toRemovePhase(){
            this.hasSelectPhase = this.hasSelectPhase.filter(item=>{
                return this.forRemoveSelectPhase.indexOf(item) < 0
            })
            this.forRemoveSelectPhase = []
            this.selAll1 = false
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
        changeModelType(val){
            let dataList = this.dataListAll.filter(item=>{
                return item.type == val
            })
            if(dataList){
                this.dataList = dataList[0].group
            }
            console.log(this.dataList)
        },
        getConfig(){
            sysConfig.getConfig({ 
                menuId: this.menuId,
                configId: this.configId
            }).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    console.log(res.data.data)
                    this.dataListAll = res.data.data
                    let dataList = res.data.data.filter(item=>{
                        return item.type == this.modelType
                    })
                    if(dataList){
                        this.dataList = dataList[0].group
                    }
                    console.log(this.dataList)
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
            this.assignStatus = false
        },
        ok() {
            if(!this.hasSelectGroupName){
                this.$Message.error(this.$t('modules_spoc_core_web_src_views_customstate_stategroup_189'))
                this.assignStatusLoading = false
                this.assignStatus = true
                setTimeout(()=>{
                    this.assignStatusLoading = true
                },0)
                return 
            }
            if(!this.toRemovePhaseList.length){
                this.$Message.error(this.$t('modules_spoc_core_web_src_views_customstate_stategroup_207'))
                this.assignStatusLoading = false
                this.assignStatus = true
                setTimeout(()=>{
                    this.assignStatusLoading = true
                },0)
                return 
            }
            this.updateLoadingStatus({
                isLoading: true
            })

            let states = []
            this.toRemovePhaseList.forEach((item)=>{
                states.push({
                    name: item.label,
                    value: item.value
                })
            })
           
            let _obj = JSON.parse(JSON.stringify(this.dataList))

            if(this.isCreate){ 
                _obj.push({
                    groupName: this.hasSelectGroupName,
                    states: states,
                    sort: (_obj.length + 1) + '',
                    status: '0'
                })
            } else {
                _obj.forEach((item,index) => {
                    if(index === this.editIndex){
                        item.groupName = this.hasSelectGroupName
                        item.states = states
                    }
                })
            }
            this.assignStatus = false
            this.doUpdate(_obj)
        },
        cancelNewGroup() {
            this.newGroup = false
        },
        okNewGroup() {
            this.$refs.formValidate.validate((validRes) => {
                if (validRes) {
                    this.updateLoadingStatus({
                        isLoading: true
                    })

                    let states = []
                    this.crm_customer_status_phase.forEach((item)=>{
                        if( this.formValidate.status.indexOf(item.value) > -1){
                            states.push({
                                name: item.label,
                                value: item.value
                            })
                        }
                    })
                
                    let _obj = JSON.parse(JSON.stringify(this.dataList))

                    _obj.push({
                        groupName:  this.formValidate.name,
                        sort: (_obj.length + 1) + '',
                        states,
                        status: '0'
                    })
                    
                    this.newGroup = false
                    this.doUpdate(_obj)

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
                item.sort = index + 1
            })

            console.log(_obj)

            this.doUpdate(_obj)
        },
    },
}
</script>
