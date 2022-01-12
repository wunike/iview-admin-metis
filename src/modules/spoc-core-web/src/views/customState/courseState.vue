<style lang="less">
    .customize-state-container{
        .cs-item{
            margin-bottom:28px;
            h2{
                font-size:16px;
                font-weight:500;
                color:rgba(73,80,96,1);
                margin-bottom:8px;
            }
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
    .showEditColTagModalClass{
        .ivu-table-border th, .ivu-table-border td {
            border-right: none;
        }
        .ivu-table-border td, .ivu-table-border th{
            border-right: none;
        }
    }
</style>

<template>
    <div class="customize-state-container">
        <Modal
            v-model="showEditModal"
            :title="$t('modules_spoc_core_web_src_views_customstate_coursestate_131')"
            width="800"
            class="showEditColTagModalClass"
            @on-ok="tagModalok"
            @on-cancel="tagModalcancel">
            <div style="margin-bottom:12px;">
                <span style="margin-left:12px;">{{$t('modules_spoc_core_web_src_views_customstate_coursestate_132')}}</span>
                <Select style="display:inline-block;width:140px;" v-model="event"  @on-change="changeEvent" transfer>
                    <Option v-for="(item, index) in serviceOpt" :value="item.value" :key="index">{{ item.name }}</Option>
                </Select>
                <span style="margin-left:12px;">{{$t('modules_spoc_core_web_src_views_customstate_coursestate_133')}}</span>
                <Select style="display:inline-block;width:140px;" v-model="target" transfer>
                    <Option v-show="event != 'fall_back'" v-for="(itemChild, indexChild) in getTypeTreeData" :value="itemChild.value" :key="indexChild">{{ itemChild.label }}</Option>
                    <Option v-show="event == 'fall_back'" value="pre">{{$t('modules_spoc_core_web_src_views_customstate_coursestate_134')}}</Option>
                </Select>
                <Button style="display:inline-block;margin-left:12px;" size="small" type="primary" @click="event_target_save">{{$t('modules_spoc_core_web_src_views_customstate_coursestate_135')}}</Button>
            </div>
            <Table border :columns="columnsTagModal" class="tbl" :data="relServiceArray">
                <template slot-scope="{ row }" slot="event">
                    <span class="click_span">{{ serviceOptByValue[row.event]}}</span>
                </template>
                <template slot-scope="{ row }" slot="target">
                    <Select v-model="editRowTarget" transfer v-if="editTagrgetEvent === row.event">
                        <Option v-show="row.event != 'fall_back'" v-for="(itemChild, indexChild) in getTypeTreeData" :value="itemChild.value" :key="indexChild">{{ itemChild.label }}</Option>
                        <Option v-show="row.event == 'fall_back'" value="pre">{{$t('modules_spoc_core_web_src_views_customstate_coursestate_134')}}</Option>
                    </Select>
                    <span v-else class="click_span">{{ getTypeTreeDataByValue[row.target] }}</span>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <div class="active_box">
                        <a href="javaScript:void(0);" v-if="editTagrgetEvent === row.event" @click="saveColTagrgetEvent(row)" >{{$t('modules_spoc_core_web_src_views_customstate_coursestate_135')}}</a>
                        <a href="javaScript:void(0);" v-if="editTagrgetEvent === row.event" @click="cancelColTagrgetEvent()" style="margin-left:12px;">{{$t('modules_spoc_core_web_src_views_customstate_coursestate_136')}}</a>
                        <a href="javaScript:void(0);" v-if="editTagrgetEvent !== row.event" @click="editColTagrgetEvent(row)">{{$t('modules_spoc_core_web_src_views_customstate_coursestate_137')}}</a>
                        <a href="javaScript:void(0);" v-if="editTagrgetEvent !== row.event" @click="delColTagrgetEvent(row)" style="margin-left:12px;">{{$t('modules_spoc_core_web_src_views_customstate_coursestate_138')}}</a>
                    </div>
                </template>
            </Table>
        </Modal>
        <!-- <div class="cs-item" v-for="(itemParent, indexParent) in getTypeTreeData" :key="indexParent"> -->
        <div class="cs-item">
            <!-- <h2>{{itemParent.label}}</h2> -->
            <Table border :columns="columns" class="tbl" :data="getTypeTreeData" v-if="showTable">
                <template slot-scope="{ row }" slot="label">
                    <span class="click_span">{{ row.label }}</span>
                </template>
                <template slot-scope="{ row }" slot="value">
                    <span class="click_span">{{ row.value }}</span>
                </template>
                <template slot-scope="{ row }" slot="task">
                    <div style="color:#999;cursor:pointer;">
                        <div>{{$t('modules_spoc_core_web_src_views_customstate_coursestate_139')}}</div>
                    </div>
                </template>
                <template slot-scope="{ row }" slot="tag">
                    <div style="color:#999;cursor:pointer;">
                        <div>{{$t('modules_spoc_core_web_src_views_customstate_coursestate_139')}}</div>
                    </div>
                </template>
                <template slot-scope="{ row }" slot="relService">
                    <div @click="toShowEdit(row.value, row.relService)" style="color:#44bcb7;cursor:pointer;">
                        <div v-if="!row.relService || !row.relService.length"><a>{{$t('modules_spoc_core_web_src_views_customstate_coursestate_139')}}</a></div>
                        <div v-else v-for="(item,indexChild) in row.relService" :key="indexChild">
                            <a>{{serviceOptByValue[item.event]}}&nbsp;=>&nbsp;{{getTypeTreeDataByValue[item.target]}}</a>
                        </div>
                    </div>
                </template>
            </Table>
        </div>
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
    import userLabel from "@public/modules/userLabel";
    export default {
        props: {
            menuId: {
                type: String,
                required: true
            },
            configId: {
                type: String,
                required: true
            },
            serviceOpt:{
                type: Array,
                required: true
            }
        },
        components: {
            userLabel
        },
        computed: {
            getTypeTreeDataByValue(){
                let obj = {
                    'pre': this.$t('modules_spoc_core_web_src_views_customstate_coursestate_134')
                }
                this.getTypeTreeData.forEach(item =>{
                    obj[item.value] = item.label
                })
                return obj
            },
            serviceOptByValue(){
                let obj = {}
                this.serviceOpt.forEach(item =>{
                    obj[item.value] = item.name
                })
                return obj
            }
        },
        data() {
            return {
                valuesObjById:{},
                getTypeTreeData: [],
                rowValue: '', //回退用到
                showEditModal: false,
                editType: '', // 编辑类别
                /* 关联标签操作相关开始 */
                editRowTarget: '',
                editTagrgetEvent: '', //正在修改的eventID
                target: '',
                event: '',
                columnsTagModal: [
                    {
                        title: '业务',
                        slot: 'event'
                    },
                    {
                        title: '关联状态',
                        slot: 'target'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                    },
                ],
                /* 关联标签操作相关结束 */
                customStateData: [],
                columns: [
                    {
                        title: this.$t('modules_spoc_core_web_src_views_customstate_coursestate_140'),
                        slot: 'label'
                    },
                    {
                        title: this.$t('modules_spoc_core_web_src_views_customstate_coursestate_141'),
                        slot: 'value'
                    },
                    {
                        title: this.$t('modules_spoc_core_web_src_views_customstate_coursestate_142'),
                        slot: 'task'
                    },
                    {
                        title: this.$t('modules_spoc_core_web_src_views_customstate_coursestate_143'),
                        slot: 'tag'
                    },
                    {
                        title: this.$t('modules_spoc_core_web_src_views_customstate_coursestate_131'),
                        slot: 'relService'
                    },
                ],
                showTable: false,
                relServiceArray: [],
                initDataArray: [],
            }
        },
        mounted() {
            this.getTypeTree()
        },
        methods: {
            ...mapMutations(['updateLoadingStatus']),
            changeEvent(val){
                if(val == 'fall_back'){
                    this.target = 'pre'
                } else {
                    this.target = ''
                }
            },
            getConfig(){
                sysConfig.getConfig({
                    menuId: this.menuId,
                    configId: this.configId
                }).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.initDataArray = [].concat(res.data.data)
                        let obj = {}
                        res.data.data.forEach(item =>{
                            obj[item.value] = item
                        })
                        this.valuesObjById = obj

                        this.getTypeTreeData.forEach((item)=>{
                            item.relService = this.valuesObjById[item.value].relService
                        })

                        this.showTable = true
                        console.log(this.getTypeTreeData,"this.getTypeTreeData")
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({
                        isLoading: false
                    });
                });
            },
            getTypeTree(){
                this.showTable = false
                sysDict.getTypeTree({
                    type: 'com_student_course_rel_status'
                })
                .then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.getTypeTreeData = res.data.data.children
                        this.getConfig()
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
            },
            toShowEdit(type, relService){
                this.target = ''
                this.event = ''
                this.editType = type
                this.relServiceArray = JSON.parse(JSON.stringify(relService))
                this.showEditModal = true
            },
            event_target_save(){
                if(this.target && this.event){
                    let hasExist = false
                    this.relServiceArray.forEach(item=>{
                        if(item.event == this.event){
                            hasExist = true
                        }
                    })
                    if(hasExist){
                        this.$Message.error(this.$t('modules_spoc_core_web_src_views_customstate_coursestate_144'))
                        return 
                    }
                    this.relServiceArray.push({
                        event: this.event,
                        target: this.target
                    })
                }
            },
            tagModalok(){
                this.showEditModal = false
                this.updateLoadingStatus({
                    isLoading: true
                });
                this.initDataArray.forEach((item)=>{
                    if(item.value == this.editType){
                        item.relService = this.relServiceArray
                    }
                })
                sysConfig.updateConfig({
                    menuId: this.menuId,
                    configId: this.configId,
                    objectValue: this.initDataArray
                }).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.getTypeTree();
                });
            },
            tagModalcancel(){
                this.editTagrgetEvent = ''
                this.editRowTarget = ''
            },
            cancelColTagrgetEvent(){
                this.editTagrgetEvent = ''
                this.editRowTarget = ''
            },
            saveColTagrgetEvent(row){
                this.relServiceArray.forEach((item,index)=>{
                    if(item.event == this.editTagrgetEvent){
                        // item.target = row.target
                        this.$set(this.relServiceArray[index], 'target', this.editRowTarget)
                    }
                })
                this.editTagrgetEvent = ''
                this.editRowTarget = ''
            },
            editColTagrgetEvent(row) {
                this.editTagrgetEvent = row.event
                this.editRowTarget = row.target
            },
            delColTagrgetEvent(row) {
                let delIndex = -1
                this.relServiceArray.forEach((item,index)=>{
                    if(item.event == row.event){
                        delIndex = index
                    }
                })
                if(delIndex > -1){
                    this.relServiceArray.splice(delIndex, 1)
                }
            },
            save(type, val) {
                console.log(type, type, val)
                this.updateLoadingStatus({
                    isLoading: true
                });
                this.customStateData.forEach((item)=>{
                    if(item.value == type){
                        item[type] = val
                    }
                })

                sysConfig.updateConfig({
                    menuId: this.menuId,
                    configId: this.configId,
                    objectValue: this.customStateData
                }).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.getTypeTree();
                });
            },
        },
    }
</script>
