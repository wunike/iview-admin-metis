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
        <!-- 禁用操作 -->
        <Modal
            v-model="showEditStateDisableRelsModal"
            :title="$t('modules_spoc_core_web_src_views_customstate_customizestate_145')"
            width="800"
            class="showEditColTagModalClass"
            @on-ok="editStateDisableRelsModalok"
            @on-cancel="editStateDisableRelsModalcancel">
            <div style="margin-bottom:12px;">
                <span style="margin-left:12px;">{{$t('modules_spoc_core_web_src_views_customstate_customizestate_146')}}</span>
                <Select v-model="stateDisableRelsType"  @on-change="changeStateDisableRelsType" style="display:inline-block;width:100px;">
                    <Option value="1">{{$t('classlist_compontents_detailinfo_45')}}</Option>
                    <Option value="2">{{$t('modules_spoc_core_web_src_views_customstate_customizestate_148')}}</Option>
                </Select>
                <div style="display:inline-block;margin-left:12px;" v-show="stateDisableRelsType == '1'">
                    <span>{{$t('modules_spoc_core_web_src_views_customstate_customizestate_149')}}</span>
                    <Select style="display:inline-block;width:120px;" v-model="event" clearable transfer>
                        <Option v-for="(itemChild, indexChild) in button" :value="itemChild.value" :key="indexChild">{{ itemChild.name }}</Option>
                    </Select>
                </div>
                <div style="display:inline-block;" v-show="stateDisableRelsType == '2'">
                    <span style="margin-left:12px;">{{$t('modules_spoc_core_web_src_views_customstate_customizestate_150')}}</span>
                    <Select style="display:inline-block;width:100px;" v-model="taskTplName" clearable transfer>
                        <Option v-for="(item, index) in taskList" :value="item.name" :key="index">{{ item.name }}</Option>
                    </Select>
                    <span style="margin-left:12px;">{{$t('modules_spoc_core_web_src_views_customstate_customizestate_149')}}</span>
                    <Select style="display:inline-block;width:100px;" v-model="event" clearable transfer v-if="taskListObjByName && taskListObjByName[taskTplName]">
                        <Option v-for="(item, index) in taskListObjByName[taskTplName]" :value="item.resultValue" :key="index">{{ item.resultLabel }}</Option>
                    </Select>
                    <Select v-else style="display:inline-block;width:100px;" v-model="event" clearable transfer>
                    </Select>
                </div>
                <Button style="display:inline-block;margin-left:12px;" size="small" type="primary" @click="stateDisableRelSave">{{$t('courselist_compontents_servicecontent_215')}}</Button>
            </div>
            <Table draggable @on-drag-drop="drapFun2" border :columns="columnsStateDisableRels" class="tbl" :data="dataStateDisableRels">
                <template slot-scope="{ row }" slot="type">
                    <span class="click_span">{{ row.type == '1' ? $t('classlist_compontents_detailinfo_45') : $t('modules_spoc_core_web_src_views_customstate_customizestate_148') }}</span>
                </template>
                <template slot-scope="{ row }" slot="name">
                  <!--   <span class="click_span">{{ taskEventObjByVal[row.event]}}</span> -->
                    <span class="click_span">{{row.name}}</span>
                </template>
                <template slot-scope="{ row }" slot="value">
                    <!-- <span class="click_span">{{ taskEventObjByVal[row.event]}}</span> -->
                    <span class="click_span">{{ row.value}}</span>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <div class="active_box">
                        <a href="javaScript:void(0);" v-if="editTagrgetEvent !== row.event" @click="delStateDisableRels(row)" style="margin-left:12px;">{{$t('classlist_compontents_detailinfo_46')}}</a>
                    </div>
                </template>
            </Table>
        </Modal>
        <!-- 关联任务 -->
        <Modal
            v-model="showEditTaskModal"
            :title="$t('modules_spoc_core_web_src_views_customstate_coursestate_142')"
            width="800"
            class="showEditColTagModalClass"
            @on-ok="tagModalok"
            @on-cancel="tagModalcancel">
            <div style="margin-bottom:12px;">
                <span style="margin-left:12px;">{{$t('modules_spoc_core_web_src_views_customstate_customizestate_150')}}</span>
                <Select style="display:inline-block;width:100px;" v-model="taskTplName" clearable transfer>
                    <Option v-for="(item, index) in taskList" v-if="taskList&&taskList.length" :value="item.name" :key="index">{{ item.name }}</Option>
                </Select>
                <span style="margin-left:12px;">{{$t('modules_spoc_core_web_src_views_customstate_customizestate_149')}}</span>
                <Select style="display:inline-block;width:100px;" v-if="taskListObjByName && taskListObjByName[taskTplName]"  v-model="event" clearable transfer>
                    <Option  v-for="(item, index) in taskListObjByName[taskTplName]" :value="item.resultValue" :key="index">{{ item.resultLabel }}</Option>
                </Select>
                <Select style="display:inline-block;width:100px;" v-else  v-model="event" clearable transfer>
                </Select>
                <span style="margin-left:12px;">{{$t('modules_spoc_core_web_src_views_customstate_customizestate_154')}}</span>
                <Select style="display:inline-block;width:100px;" v-model="target" clearable transfer>
                    <OptionGroup :label="item.label" v-if="getTypeTreeData&&getTypeTreeData.length" v-for="(item, indexParent) in getTypeTreeData" :key="indexParent">
                        <Option v-if="item && item.children&&item.children.length" v-for="(itemChild, indexChild) in item.children" :value="itemChild.value" :key="indexChild">{{ itemChild.label }}</Option>
                    </OptionGroup>
                </Select>
               <!--  <span style="margin-left:12px;">{{$t('modules_spoc_core_web_src_views_customstate_customizestate_155')}}</span>
                <Select style="display:inline-block;width:100px;" multiple v-model="relStatisticalTerms" clearable transfer>
                    <Option v-if="relStatisticalTermsList && relStatisticalTermsList.length" v-for="(item, index) in relStatisticalTermsList" :value="item.fieldValue" :key="index">{{ item.fieldName }}</Option>
                </Select> -->
                <Button style="display:inline-block;margin-left:12px;" size="small" type="primary" @click="event_target_save">{{$t('courselist_compontents_servicecontent_215')}}</Button>
            </div>
            <Table draggable @on-drag-drop="drapFun1" border :columns="columnsTaskModal" class="tbl" :data="dataTagModal">
                <template slot-scope="{ row }" slot="taskTplName">
                    <span class="click_span">{{ row.taskTplName }}</span>
                </template>
                <template slot-scope="{ row }" slot="event">
                    <span class="click_span">{{ taskEventObjByVal[row.event]}}</span>
                </template>
                <template slot-scope="{ row }" slot="target">
                    <Select v-model="targetObj.target" clearable transfer v-if="editTagrgetEvent === row.event">
                        <OptionGroup :label="item.label" v-if="getTypeTreeData&&getTypeTreeData.length" v-for="(item, indexParent) in getTypeTreeData" :key="indexParent">
                            <Option v-if="item && item.children && item.children.length" v-for="(itemChild, indexChild) in item.children" :value="itemChild.value" :key="indexChild">{{ itemChild.label }}</Option>
                        </OptionGroup>
                    </Select>
                    <span v-else class="click_span">{{ targetNameObjById[row.target] }}</span>
                </template>
                <template slot-scope="{ row }" slot="relStatisticalTerms">
                    <Select v-model="targetObj.relStatisticalTermsArray" multiple clearable transfer v-if="editTagrgetEvent === row.event">
                        <Option v-if="relStatisticalTermsList && relStatisticalTermsList.length" v-for="(item, index) in relStatisticalTermsList" :value="item.fieldValue" :key="index">{{ item.fieldName }}</Option>
                    </Select>
                    <span v-else class="click_span">{{ row.relStatisticalTerms }}</span>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <div class="active_box">
                        <a href="javaScript:void(0);" v-if="editTagrgetEvent === row.event" @click="saveColTagrgetEvent(row)" >{{$t('courselist_compontents_servicecontent_215')}}</a>
                        <a href="javaScript:void(0);" v-if="editTagrgetEvent === row.event" @click="cancelColTagrgetEvent()" style="margin-left:12px;">{{$t('classroom_allscore_53')}}</a>
                        <a href="javaScript:void(0);" v-if="editTagrgetEvent !== row.event" @click="editColTagrgetEvent(row)">{{$t('classroom_allscore_51')}}</a>
                        <a href="javaScript:void(0);" v-if="editTagrgetEvent !== row.event" @click="delColTagrgetEvent(row)" style="margin-left:12px;">{{$t('classlist_compontents_detailinfo_46')}}</a>
                    </div>
                </template>
            </Table>
        </Modal>
        <!-- 关联标签、关联操作 -->
        <Modal
            v-model="showEditColTagModal"
            :title="editType == 'relTag' ? $t('modules_spoc_core_web_src_views_customstate_coursestate_143') : $t('modules_spoc_core_web_src_views_customstate_coursestate_131')"
            width="600"
            class="showEditColTagModalClass"
            @on-ok="tagModalok"
            @on-cancel="tagModalcancel">
            <div style="margin-bottom:12px;">
                <div style="display:inline-block;" v-if="editType == 'relTag'">{{$t('modules_spoc_core_web_src_views_customstate_customizestate_160')}}<span>{{eventName}}</span>
                    <userLabel
                        v-if="tagList && tagList.length"
                        ref="userLabelRef"
                        :tagListDefault="tagList"
                        :menuId="2001"
                        :flag="0"
                        :allowMultiselect="false"
                        :onlyOne="true"
                        style="display:inline-block;"
                        @userLabelTrueChoose="userLabelTrueChoose"
                    >
                        <span slot="hasTagName" style="cursor:pointer;">
                            <Icon type="ios-create-outline" size="24" />
                        </span>
                    </userLabel>
                </div>
                <div style="display:inline-block;" v-if="editType == 'transferOutOpt'">
                    <span>{{$t('modules_spoc_core_web_src_views_customstate_customizestate_149')}}</span>
                    <Select style="display:inline-block;width:120px;" v-model="event" clearable transfer>
                        <Option v-if="button&& button.length" v-for="(itemChild, indexChild) in button" :value="itemChild.value" :key="indexChild">{{ itemChild.name }}</Option>
                    </Select>
                </div>
                <span style="margin-left:12px;">{{$t('modules_spoc_core_web_src_views_customstate_customizestate_154')}}</span>
                <Select style="display:inline-block;width:100px;" v-show="event != 'return'" v-model="target" clearable transfer>
                    <OptionGroup :label="item.label" v-if="getTypeTreeData && getTypeTreeData.length" v-for="(item, indexParent) in getTypeTreeData" :key="indexParent">
                        <Option v-if="item.children && item.children.length" v-for="(itemChild, indexChild) in item.children" :value="itemChild.value" :key="indexChild">{{ itemChild.label }}</Option>
                    </OptionGroup>
                </Select>
                <Select style="display:inline-block;width:100px;" v-show="event == 'return'" v-model="target" clearable transfer>
                    <Option :value="rowValue" >{{$t('modules_spoc_core_web_src_views_customstate_customizestate_161')}}</Option>
                </Select>
               <!--  <span style="margin-left:12px;">{{$t('modules_spoc_core_web_src_views_customstate_customizestate_155')}}</span>
                <Select style="display:inline-block;width:100px;" multiple v-model="relStatisticalTerms" clearable transfer>
                    <Option v-if="relStatisticalTermsList && relStatisticalTermsList.length" v-for="(item, index) in relStatisticalTermsList" :value="item.fieldValue" :key="index">{{ item.fieldName }}</Option>
                </Select> -->
                <Button style="display:inline-block;margin-left:12px;" size="small" type="primary" @click="event_target_save">{{$t('courselist_compontents_servicecontent_215')}}</Button>
            </div>
            <Table draggable @on-drag-drop="drapFun3" border :columns="columnsTagModal" class="tbl" :data="dataTagModal">
                <template slot-scope="{ row }" slot="event">
                    <span class="click_span" v-if="editType == 'relTag'">{{ eventNameObjById[row.event] }}</span>
                    <span class="click_span" v-if="editType == 'transferOutOpt'">{{ transferOutOptNameObjById[row.event] }}</span>
                </template>
                <template slot-scope="{ row }" slot="target">
                    <div v-show="row.event != 'return'">
                        <Select v-model="targetObj.target" clearable transfer v-if="editTagrgetEvent === row.event">
                            <OptionGroup :label="item.label" v-for="(item, indexParent) in getTypeTreeData" :key="indexParent">
                                <Option v-for="(itemChild, indexChild) in item.children" :value="itemChild.value" :key="indexChild">{{ itemChild.label }}</Option>
                            </OptionGroup>
                        </Select>
                        <span v-else class="click_span">{{ targetNameObjById[row.target] }}</span>
                    </div>
                    <div v-show="row.event == 'return'">
                        <Select v-model="targetObj.target" transfer v-if="editTagrgetEvent === row.event">
                            <Option :value="rowValue" >{{$t('modules_spoc_core_web_src_views_customstate_customizestate_161')}}</Option>
                        </Select>
                        <span v-else class="click_span">{{$t('modules_spoc_core_web_src_views_customstate_customizestate_161')}}</span>
                    </div>
                </template>
                <template slot-scope="{ row }" slot="relStatisticalTerms">
                    <Select v-model="targetObj.relStatisticalTermsArray" multiple clearable transfer v-if="editTagrgetEvent === row.event">
                        <Option v-for="(item, index) in relStatisticalTermsList" :value="item.fieldValue" :key="index">{{ item.fieldName }}</Option>
                    </Select>
                    <span v-else class="click_span">{{ row.relStatisticalTerms }}</span>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <div class="active_box">
                        <a href="javaScript:void(0);" v-if="editTagrgetEvent === row.event" @click="saveColTagrgetEvent(row)" >{{$t('courselist_compontents_servicecontent_215')}}</a>
                        <a href="javaScript:void(0);" v-if="editTagrgetEvent === row.event" @click="cancelColTagrgetEvent()" style="margin-left:12px;">{{$t('classroom_allscore_53')}}</a>
                        <a href="javaScript:void(0);" v-if="editTagrgetEvent !== row.event" @click="editColTagrgetEvent(row)">{{$t('classroom_allscore_51')}}</a>
                        <a href="javaScript:void(0);" v-if="editTagrgetEvent !== row.event" @click="delColTagrgetEvent(row)" style="margin-left:12px;">{{$t('classlist_compontents_detailinfo_46')}}</a>
                    </div>
                </template>
            </Table>
        </Modal>
        <!-- 统计状态 -->
        <Modal
            v-model="showEditRelStatisticalTermsModal"
            :title="$t('modules_spoc_core_web_src_views_customstate_customizestate_162')"
            width="600"
            class="showEditColTagModalClass"
            @on-ok="relStatisticalTermsModalok"
            @on-cancel="relStatisticalTermsModalcancel">
            <div style="margin-bottom:12px;">
                <!-- <span style="margin-left:12px;">{{$t('modules_spoc_core_web_src_views_customstate_customizestate_155')}}</span> -->
                <!-- <Select style="display:inline-block;width:100px;" multiple v-model="modal_relStatisticalTerms" clearable transfer>
                    <Option v-if="relStatisticalTermsList && relStatisticalTermsList.length" v-for="(item, index) in relStatisticalTermsList" :value="item.fieldValue" :key="index">{{ item.fieldName }}</Option>
                </Select> -->
                <CheckboxGroup v-model="modal_relStatisticalTerms" v-if="relStatisticalTermsList && relStatisticalTermsList.length">
                    <Checkbox v-for="(item, index) in relStatisticalTermsList" :label="item.fieldValue" :key="index">{{ item.fieldName }}</Checkbox>
                </CheckboxGroup>
            </div>
        </Modal>
        <div class="cs-item" v-for="(itemParent, indexParent) in getTypeTreeData" :key="indexParent">
            <h2>{{itemParent.label}}</h2>
            <Table border :columns="columns" class="tbl" :data="itemParent.children" v-if="customStateData && customStateData.length && crm_customer_status_phase && crm_customer_status_phase.length">
                <template slot-scope="{ row }" slot="label">
                    <span class="click_span">{{ row.label }}</span>
                </template>
                <template slot-scope="{ row }" slot="value">
                    <span class="click_span">{{ row.value }}</span>
                </template>
                <template slot-scope="{ row }" slot="type">
                    <span class="click_span">{{ row.type }}</span>
                </template>
                <template slot-scope="{ row, index }" slot="monitor">
                    <Checkbox  true-value="true" false-value="false"  @on-change="save(row.value, 'monitor',  valuesObjById[row.value].monitor)" v-model="valuesObjById[row.value].monitor" ></Checkbox>
                </template>
                <template slot-scope="{ row,index }" slot="relTask">
                    <div @click="toShowEditTaskModal(row.value, valuesObjById[row.value].relTask)" style="color:#44bcb7;cursor:pointer;">
                        <div v-if="!(valuesObjById[row.value] && valuesObjById[row.value].relTask.length)"><a>{{$t('views_approvalnotice_approvalset_index_311')}}</a></div>
                        <div v-else v-for="(item,indexChild) in valuesObjById[row.value].relTask" :key="indexChild">
                            <a>{{item.taskTplName}}--{{taskEventObjByVal[item.event]}}&nbsp;=>&nbsp;{{targetNameObjById[item.target]}}</a>
                        </div>
                    </div>
                </template>
                <template slot-scope="{ row, index }" slot="relTag">
                    <div @click="toShowEidtRelTag(row.value, 'relTag')" style="color:#44bcb7;cursor:pointer;">
                        <div v-if="!(valuesObjById[row.value] && valuesObjById[row.value].relTag.length )"><a>{{$t('views_approvalnotice_approvalset_index_311')}}</a></div>
                        <div v-else v-for="(item,indexChild) in valuesObjById[row.value].relTag" :key="indexChild">
                            <a>{{eventNameObjById[item.event]}}&nbsp;=>&nbsp;{{targetNameObjById[item.target]}}</a>
                        </div>
                    </div>
                </template>
                <template slot-scope="{ row, index }" slot="transferOutOpt">
                    <div @click="toShowEidtRelTag(row.value, 'transferOutOpt')" style="color:#44bcb7;cursor:pointer;">
                        <div v-if="!(valuesObjById[row.value] && valuesObjById[row.value].transferOutOpt.length )"><a>{{$t('views_approvalnotice_approvalset_index_311')}}</a></div>
                        <div v-else v-for="(item,indexChild) in valuesObjById[row.value].transferOutOpt" :key="indexChild">
                            <div v-show="item.event != 'return'"><a>{{transferOutOptNameObjById[item.event]}}&nbsp;=>&nbsp;{{targetNameObjById[item.target]}}</a></div>
                            <div v-show="item.event == 'return'"><a>{{transferOutOptNameObjById[item.event]}}&nbsp;=>{{$t('modules_spoc_core_web_src_views_customstate_customizestate_164')}}</a></div>
                        </div>
                    </div>
                </template>
                <template slot-scope="{ row, index }" slot="stateDisableRels">
                    <div @click="toShowEidtStateDisableRels(row.value, 'stateDisableRels')" style="color:#44bcb7;cursor:pointer;">
                        <div v-if="!(valuesObjById[row.value] && valuesObjById[row.value].stateDisableRels && valuesObjById[row.value].stateDisableRels.length)"><a>{{$t('views_approvalnotice_approvalset_index_311')}}</a></div>
                        <div v-else>
                        <!-- <div v-else v-for="(item,indexChild) in valuesObjById[row.value].stateDisableRels" :key="indexChild"> -->
                            <!-- <div>{{item.name}}&nbsp;--&nbsp;{{item.value}}</div> -->
                            <div><a>{{ valuesObjById[row.value].stateDisableRels | filterStateDisableRelsNames }}</a></div>
                        </div>
                    </div>
                </template>
                <template slot-scope="{ row, index }" slot="relStatisticalTerms">
                    <div @click="toShowEidtRelStatisticalTerms(row.value, 'relStatisticalTerms')" style="color:#44bcb7;cursor:pointer;">
                        <div v-if="!(valuesObjById[row.value] && valuesObjById[row.value].relStatisticalTerms && valuesObjById[row.value].relStatisticalTerms.length)"><a>{{$t('views_approvalnotice_approvalset_index_311')}}</a></div>
                        <div v-else>
                            <div><a>{{ valuesObjById[row.value].relStatisticalTerms | filterRelStatisticalTerms}}</a></div>
                        </div>
                    </div>
                </template>
            </Table>
        </div>
    </div>
</template>

<script>
    let crm_customer_status_phase
    let relStatisticalTermsList = []
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
            button: {
                type: Array,
                required: true
            },
            relStatisticalTermsList:{
                type: Array,
                required: true
            }
        },
        components: {
            userLabel
        },
        computed: {
            taskListObjByName(){ //任务模板名称为key 任务模板可选结果为value
                let obj = {}
                if(this.taskList){
                    this.taskList.forEach(item =>{
                        obj[item.name] = item.completeResultList
                    })
                }
                return obj
            },
            taskEventObjByVal(){ //任务模板选择结果value为key 任务模板选择结果名称为value
                let obj = {}
                if(this.taskList){
                    this.taskList.forEach(item =>{
                        item.completeResultList.forEach(itemChild =>{
                            obj[itemChild.resultValue] = itemChild.resultLabel
                        })
                    })
                }
                return obj
            },
            eventNameObjById(){ // 标签map,key为id,value为title.例如：{id: title,id1:title1}
                let obj = {}
                if(this.tagList){
                    this.tagList.forEach(item =>{
                        item.children.forEach(itemChild=>{
                            obj[itemChild.id] = itemChild.title
                        })
                    })
                }
                return obj
            },
            transferOutOptNameObjById(){ // 操作map,key为对象中的value,value为label。例如：{value: laber, value1: laber1}
                let obj = {}
                if(this.button){
                    this.button.forEach(item =>{
                        obj[item.value] = item.name
                    })
                }
                return obj
            },
            targetNameObjById(){
                let obj = {}
                if(this.getTypeTreeData){
                    this.getTypeTreeData.forEach(item =>{
                        if(item.children){
                            item.children.forEach(itemChild=>{
                                obj[itemChild.value] = itemChild.label
                            })
                        }
                    })
                    return obj
                }
            },
        },
        data() {
            return {
                dataStateDisableRels: [],
                stateDisableRelsType: "1",
                showEditStateDisableRelsModal: false,
                valuesObjById:{},
                getTypeTreeData: [],
                rowValue: '', //回退用到
                relStatisticalTerms: [],
                taskTplName: '',
                taskList:[],
                showEditTaskModal: false,
                editPhase: '',
                editType: '', // 编辑类别
                /* 关联标签操作相关开始 */
                targetObj:{},
                editTagrgetEvent: '', //正在修改的eventID
                tagList: [],
                target: '',
                eventName: '',
                event: '',
                showEditColTagModal: false,
                modal_relStatisticalTerms: [],
                showEditRelStatisticalTermsModal: false,
                dataTagModal: [],
                columnsTagModal: [
                    {
                        title: '标签',
                        slot: 'event'
                    },
                    {
                        title: '关联状态',
                        slot: 'target'
                    },
                  /*   {
                        title: '统计状态',
                        slot: 'relStatisticalTerms'
                    }, */
                    {
                        title: '操作',
                        slot: 'action',
                    },
                ],
                columnsTaskModal: [
                    {
                        title: '任务模板',
                        slot: 'taskTplName'
                    },
                    {
                        title: '选择结果',
                        slot: 'event'
                    },
                    {
                        title: '关联状态',
                        slot: 'target'
                    },
                   /*  {
                        title: '统计状态',
                        slot: 'relStatisticalTerms'
                    }, */
                    {
                        title: '操作',
                        slot: 'action',
                    },
                ],
                columnsStateDisableRels: [
                    {
                        title: '禁用类型',
                        slot: 'type'
                    },
                    {
                        title: 'name',
                        slot: 'name'
                    },
                    {
                        title: 'value',
                        slot: 'value'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                    },
                ],
                /* 关联标签操作相关结束 */
                monitor: '', //可监控
                relTask: [],
                relTag: [],
                transferOutOpt: [],
                customStateData: [],
                crm_customer_status_phase: [],
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
                        title: this.$t('modules_spoc_core_web_src_views_customstate_customizestate_167'),
                        slot: 'type'
                    },
                    {
                        title: this.$t('modules_spoc_core_web_src_views_customstate_customizestate_168'),
                        slot: 'monitor'
                    },
                    {
                        title: this.$t('modules_spoc_core_web_src_views_customstate_coursestate_142'),
                        slot: 'relTask'
                    },
                    {
                        title: this.$t('modules_spoc_core_web_src_views_customstate_coursestate_143'),
                        slot: 'relTag'
                    },
                    {
                        title: this.$t('modules_spoc_core_web_src_views_customstate_coursestate_131'),
                        slot: 'transferOutOpt'
                    },
                    {
                        title: this.$t('modules_spoc_core_web_src_views_customstate_customizestate_145'),
                        slot: 'stateDisableRels'
                    },
                    {
                        title: this.$t('modules_spoc_core_web_src_views_customstate_customizestate_162'),
                        slot: 'relStatisticalTerms'
                    },
                ],
            }
        },
        mounted() {
            this.getStatusTaskInfo()
            this.getBuildTree()
        },
        methods: {
            ...mapMutations(['updateLoadingStatus']),
            drapFun1(index1, index2){
                // 关联任务排序
                console.log(index1, index2)
                let obj = JSON.parse(JSON.stringify(this.dataTagModal[index1]))
                this.dataTagModal.splice(index1, 1)
                this.dataTagModal.splice(index2, 0, obj)
            },
            drapFun2(index1, index2){
                // 禁用操作排序
                console.log(index1, index2)
                let obj = JSON.parse(JSON.stringify(this.dataStateDisableRels[index1]))
                this.dataStateDisableRels.splice(index1, 1)
                this.dataStateDisableRels.splice(index2, 0, obj)
            },
            drapFun3(index1, index2){
                // 关联标签、关联操作排序
                console.log(index1, index2)
                let obj = JSON.parse(JSON.stringify(this.dataTagModal[index1]))
                this.dataTagModal.splice(index1, 1)
                this.dataTagModal.splice(index2, 0, obj)
            },
            stateDisableRelSave(){
                if(this.stateDisableRelsType == '1'){ // 禁用操作
                    if(!this.event){
                        this.$Message.error(this.$t('modules_spoc_core_web_src_views_customstate_customizestate_169'))
                        return false
                    } else {
                        let _arr = this.button.filter((item)=>{ return item.value == this.event })
                        
                        let hasExist = false
                        this.dataStateDisableRels.forEach(item=>{
                            if(item.event == this.event && item.name == _arr[0].name){
                                hasExist = true
                            }
                        })
                        if(hasExist){
                            this.$Message.error(this.$t('modules_spoc_core_web_src_views_customstate_customizestate_170'))
                            return 
                        }

                        this.dataStateDisableRels.push({
                            name: _arr[0].name,
                            value: this.event,
                            type: this.stateDisableRelsType
                        })
                    }
                }
                if(this.stateDisableRelsType == '2'){ // 禁用任务
                    if((!this.taskTplName) || (!this.event)){
                        this.$Message.error(this.$t('modules_spoc_core_web_src_views_customstate_customizestate_171'))
                        return false
                    } else {

                        let hasExist = false
                        this.dataStateDisableRels.forEach(item=>{
                            if(item.event == this.event && item.name == this.taskTplName){
                                hasExist = true
                            }
                        })
                        if(hasExist){
                            this.$Message.error(this.$t('modules_spoc_core_web_src_views_customstate_customizestate_172'))
                            return 
                        }

                        this.dataStateDisableRels.push({
                            name: this.taskTplName,
                            value: this.event,
                            type: this.stateDisableRelsType
                        })
                    }
                }
            },
            changeStateDisableRelsType(){
                this.event = ''
                this.taskTplName = ''
            },
            editStateDisableRelsModalok(){
                this.showEditStateDisableRelsModal = false
                
                this.updateLoadingStatus({
                    isLoading: true
                });
                this.customStateData.forEach((item)=>{
                    if(item.value == this.editPhase){
                        item[this.editType] = this.dataStateDisableRels
                    }
                })
                sysConfig.updateConfig({ 
                    menuId: this.menuId,
                    configId: this.configId,
                    objectValue: this.customStateData
                }).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.editType = ''
                        this.editPhase = ''
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.getTypeTree();
                });
            },
            editStateDisableRelsModalcancel(){

            },
            getTypeTree(){
                sysDict.getTypeTree({
                    type: 'crm_customer_status_phase'
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
            getStatusTaskInfo(){
                common.getStatusTaskInfo({})
                    .then(valid.call(this))
                    .then(res => {
                        if(res.ok) {
                            this.taskList = res.data.data
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {});
            },
            toShowEditTaskModal(phase, value){
                this.editType = 'relTask'
                this.editPhase = phase
                if(this.customStateData){
                    this.customStateData.forEach((item)=>{
                        if(item.value == phase){
                            this.dataTagModal = [].concat(item.relTask)
                        }
                    })
                }
                this.event = ''
                this.target = ''
                this.taskTplName = ''
                this.relStatisticalTerms = []
                this.showEditTaskModal = true
            },
            toShowEidtStateDisableRels(phase, editType){
                console.log(phase, editType)
                this.stateDisableRelsType = '1'
                this.event = ''
                this.taskTplName = ''
                this.editType = editType
                this.editPhase = phase
                this.customStateData.forEach((item)=>{
                    if(item.value == phase){
                        this.dataStateDisableRels = [].concat(item.stateDisableRels || [])
                    }
                })
                this.showEditStateDisableRelsModal = true
            },
            toShowEidtRelStatisticalTerms(phase, editType){
                console.log(phase,'toShowEidtRelStatisticalTerms')
                this.editType = editType
                this.editPhase = phase
                if(this.customStateData){
                    this.customStateData.forEach((item)=>{
                        if(item.value == phase){
                            this.modal_relStatisticalTerms = [].concat(item.relStatisticalTermsArray)
                        }
                    })
                }
                this.showEditRelStatisticalTermsModal = true
            },
            toShowEidtRelTag(phase, editType){
                this.editType = editType
                this.rowValue = phase
                this.editPhase = phase
                if(editType == 'relTag'){
                    this.$set(this.columnsTagModal[0], 'title', this.$t('modules_spoc_core_web_src_views_customstate_customizestate_173'))
                    if(this.$refs.userLabelRef){
                        this.$refs.userLabelRef.hasCheckedTagids = []
                    }
                    if(this.customStateData){
                        this.customStateData.forEach((item)=>{
                            if(item.value == phase){
                                this.dataTagModal = [].concat(item.relTag)
                            }
                        })
                    }
                }
                if(editType == 'transferOutOpt'){
                    this.$set(this.columnsTagModal[0], 'title', this.$t('classlist_compontents_detailinfo_45'))
                    this.customStateData.forEach((item)=>{
                        if(item.value == phase){
                            this.dataTagModal = [].concat(item.transferOutOpt)
                        }
                    })
                }
                this.targetObj = {}
                this.event = ''
                this.target = ''
                this.eventName = ''
                this.relStatisticalTerms = []
                this.showEditColTagModal = true
            },
            getBuildTree(){
                let obj = {
                    menuId: '2001',
                    flag: '0'
                };
                common.buildTree(obj)
                    .then(valid.call(this))
                    .then(res => {
                        if(res.ok) {
                            this.tagList = res.data.data.children
                            this.getDict()
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {});
            },
            userLabelTrueChoose(data) {
                if(data.hasCheckedTagNames && data.hasCheckedTagNames.length){
                    this.eventName = data.hasCheckedTagNames[0];
                    this.event = data.hasCheckedTagids[0];
                } else {
                    this.eventName = '';
                    this.event = '';
                }
            },
            event_target_save(){
                if(this.target &&
                    this.event &&
                    (this.editType != 'relTask' || (this.taskTplName && this.editType == 'relTask'))){
                    let hasExist = false
                    if(this.dataTagModal){
                        this.dataTagModal.forEach(item=>{
                            if(item.event == this.event){
                                hasExist = true
                            }
                        })
                    }
                    if(hasExist){
                        this.$Message.error(this.$t('modules_spoc_core_web_src_views_customstate_customizestate_174'))
                        return 
                    }
                    if(this.editType == 'relTask'){
                        this.dataTagModal.push({
                            taskTplName: this.taskTplName,
                            event: this.event,
                            target: this.target,
                            relStatisticalTerms : this.relStatisticalTerms.join(','),
                            relStatisticalTermsArray : this.relStatisticalTerms.filter(item=>{ return item != null })
                        })
                    } else {
                        this.dataTagModal.push({
                            event: this.event,
                            target: this.target,
                            relStatisticalTerms : this.relStatisticalTerms.join(','),
                            relStatisticalTermsArray : this.relStatisticalTerms.filter(item=>{ return item != null })
                        })
                    }
                }
            },
            relStatisticalTermsModalok(){
                this.showEditRelStatisticalTermsModal = false
                this.updateLoadingStatus({
                    isLoading: true
                });
                if(this.customStateData){
                    this.customStateData.forEach((item)=>{
                        if(item.value == this.editPhase){
                            item.relStatisticalTermsArray = this.modal_relStatisticalTerms
                            item.relStatisticalTerms = this.modal_relStatisticalTerms.join(',')
                        }
                    })
                }
                sysConfig.updateConfig({ 
                    menuId: this.menuId,
                    configId: this.configId,
                    objectValue: this.customStateData
                }).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.editType = ''
                        this.editPhase = ''
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.getTypeTree();
                });
            },
            relStatisticalTermsModalcancel(){
                this.modal_relStatisticalTerms = []
            },
            tagModalok(){
                console.log(this.editPhase, this.editType, this.dataTagModal ,11111111111111)
                this.showEditColTagModal = false
                this.showEditTaskModal = false
                this.updateLoadingStatus({
                    isLoading: true
                });
                if(this.customStateData){
                    this.customStateData.forEach((item)=>{
                        if(item.value == this.editPhase){
                            item[this.editType] = this.dataTagModal
                        }
                    })
                }
                sysConfig.updateConfig({
                    menuId: this.menuId,
                    configId: this.configId,
                    objectValue: this.customStateData
                }).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.editType = ''
                        this.editPhase = ''
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.getTypeTree();
                });
            },
            tagModalcancel(){
                this.editTagrgetEvent = ''
            },
            //编辑关联标签
            getConfig(){
                sysConfig.getConfig({
                    menuId: this.menuId,
                    configId: this.configId
                }).then(valid.call(this))
                .then(res => {
                    if(res.ok) {

                        let obj = {}
                        if(res.data.data){
                            res.data.data.forEach(item =>{
                                obj[item.value] = item
                            })
                        }
                        this.valuesObjById = obj

                        let q = res.data.data
                        if(this.getTypeTreeData){
                            this.getTypeTreeData.forEach((item)=>{
                                if(item.children){
                                    item.children.forEach((itemChild)=>{
                                        if(!this.valuesObjById[itemChild.value]){
                                            let obj = {
                                                value: itemChild.value,
                                                phase: item.value,
                                                status: itemChild.label,
                                                transferOutOpt:[],
                                                transferInOpt:[],
                                                relTask: [],
                                                monitor: "false",
                                                relTag: [],
                                                stateDisableRels: [],
                                            }
                                            this.$set(this.valuesObjById, itemChild.value, obj)
                                            q.push(obj)
                                        }
                                    })
                                }
                            })
                        }

                        this.customStateData = q

                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({
                        isLoading: false
                    });
                });
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
                            crm_customer_status_phase = res.data.data
                            this.getTypeTree()
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {
                    });
            },
            cancelColTagrgetEvent(){
                this.editTagrgetEvent = ''
            },
            saveColTagrgetEvent(row){
                if(this.dataTagModal){
                    this.dataTagModal.forEach(item=>{
                        if(item.event == this.editTagrgetEvent){
                            item.relStatisticalTermsArray = this.targetObj.relStatisticalTermsArray.filter(item=>{ return item != null })
                            item.relStatisticalTerms = this.targetObj.relStatisticalTermsArray.filter(item=>{ return item != null }).join(',')
                            item.target = this.targetObj.target
                        }
                    })
                }
                this.editTagrgetEvent = ''
            },
            editColTagrgetEvent(row) {
                this.editTagrgetEvent = row.event
                this.targetObj = {
                    target: row.target,
                    relStatisticalTermsArray: row.relStatisticalTermsArray.filter(item=>{ return item != null })
                }
            },
            delColTagrgetEvent(row) {
                this.editTagrgetEvent = ''
                let delIndex = -1
                if(this.dataTagModal){
                    this.dataTagModal.forEach((item,index)=>{
                        if(item.event == row.event){
                            delIndex = index
                        }
                    })
                }
                if(delIndex > -1){
                    this.dataTagModal.splice(delIndex, 1)
                }
            },
            delStateDisableRels(row) {
                let delIndex = -1
                this.dataStateDisableRels.forEach((item,index)=>{
                    if(item.name == row.name && item.value == row.value){
                        delIndex = index
                    }
                })
                if(delIndex > -1){
                    this.dataStateDisableRels.splice(delIndex, 1)
                }
            },
            delStateDisableRels(row) {
                let delIndex = -1
                this.dataStateDisableRels.forEach((item,index)=>{
                    if(item.name == row.name && item.value == row.value){
                        delIndex = index
                    }
                })
                if(delIndex > -1){
                    this.dataStateDisableRels.splice(delIndex, 1)
                }
            },
            save(phase, type, val) {
                console.log(phase, type, val)
                this.updateLoadingStatus({
                    isLoading: true
                });
                if(this.customStateData){
                    this.customStateData.forEach((item)=>{
                        if(item.value == phase){
                            item[type] = val
                        }
                    })
                }

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
        filters:{
            nameFilter: function(val){
                let q = []
                if(crm_customer_status_phase){
                    crm_customer_status_phase.forEach(item=>{
                        if(val.indexOf(item.value) > -1){
                            q.push(item.label)
                        }
                        return item.value == val
                    })
                }
                return q.join(',')
            },
            filterStateDisableRelsNames: function(list){
                let keys = {}
                list.forEach(item=>{
                    keys[item.name] = 1
                })
                return Object.keys(keys).join(',')
            },
            filterRelStatisticalTerms: function(list){
                let names = []
                if(relStatisticalTermsList){
                    relStatisticalTermsList.forEach(item=>{
                        if(list.indexOf(item.fieldValue) > -1){
                            names.push(item.fieldName)
                        }
                    })
                }
                return names.join(',')
            }
        },
        watch:{
            relStatisticalTermsList: {
                handler:function(val){
                    relStatisticalTermsList =val
                },
                immediate: true
            }
        }
        
    }
</script>
