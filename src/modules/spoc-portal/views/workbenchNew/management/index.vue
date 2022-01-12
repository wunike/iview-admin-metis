<style lang="less">
@import "../plugin/libs/theme.less";
.work-bench-management-container{
    position: relative;
    padding-left: 49px;padding-right: 79px;padding-top: 26px;
    @itemWidth: 227px;
    .title{
        height: 90px - 26px;
        line-height: 64px;
        font-size: 16px;font-weight: bold;
    }
    .lists{
        zoom: 1;margin-right: -36px;
        &::before, &::after{
            content: '';
            display: block;clear: both;height: 0;line-height: 0;font-size: 0;
        }
    }
    .item{
        float: left;
        width: @itemWidth;height: @itemWidth;
        margin-right: 36px;margin-bottom: 36px;
        box-shadow:0px 0px 15px 0px rgba(0,0,0,0.1);border-radius:8px;background: #fff;
        text-align: center;
        &:hover{
            box-shadow: 0px 0px 15px 0px @baseThemeColor;
        }
    }
    .add-item{
        padding-top: 73px;
        cursor: pointer;
        i{
            font-size: 50px;color: #ccc;
        }
        span{
            display: block;
            color: #999;
            line-height: 24px + 24px + 14px;
            font-size: 14px;
        }
    }
}
.edit-add-modal{
    .ivu-form{
        zoom: 1;margin-bottom: -20px;
        &::before, &::after{
            content: '';
            display: block;clear: both;height: 0;line-height: 0;font-size: 0;
        }
    }
    .ivu-form-item{
        float: left;min-height: 34px;
    }
    .ivu-upload{
        float: left;margin-right: 16px;
        cursor: pointer;
    }
    .icon-style{
        @w: 104px;
        display: block;
        width: @w;height: @w;
        border-radius: 4px;
        border: 1px dashed #D9D9D9;
        &:hover{
            //border-color: @baseThemeColor;
        }
    }
    .ivu-form-item-error{
        .icon-style, .icon-style:hover{
            border-color: #ed4014;
        }
    }
    .icon-card{
        position: relative;height: 104px;
    }
    .tips{
        float: left;line-height: 1;
        margin-top: 89px;font-size: 14px;color:rgba(0,0,0,0.45);
    }
    .iconAdd{
        padding-top: 15px;
        text-align: center;color:rgba(0,0,0,0.65);
        i{
            font-size: 40px;color: #ccc;
        }
        span{
            display: block;font-size: 14px;
            color: #999;
            // font-weight: bold;
        }
    }
    .data-type {
        position: relative;padding-right: 64px;
        button{
            position: absolute;right: 0;top: 0;
            width: 60px;
        }
    }
    .ivu-table:after{
        display: none;
    }
    .chartItem{
        position: relative;
        cursor:pointer;
        display:inline-block;
        margin-right:17px;
        border: 1px solid #dcdee2;
        border-radius: 4px;
        padding: 0 8px;
        line-height: 30px;
        &:hover{
            .del{
                display: block;
            }
        }
        .del{
            position: absolute;
            right: -5px;
            top: -12px;
            display: none;
            cursor: pointer;
            &:hover{
                display: block;
            }
        }
    }
}
</style>
    
<template>
<div class="work-bench-management-container">
    <div class="title">门户项</div>
    <div class="lists">
        <div class="item add-item" @click="addItem()">
            <Icon type="md-add" />
            <span>添加门户项</span>
        </div>
        <management-ttem class="item" 
            v-for="(item, index) in lists" 
            :itemData="item" 
            :key="index" 
            @uploadItem="getLists"
            @onEdit="editItem">
        </management-ttem>
    </div>
    <Modal v-model="editAddModal"
        class-name="edit-add-modal"
        width="800"
        :title="modalTitle"
        :mask-closable="false"
        :loading="loading"
        @on-ok="saveEdit"
        @on-cancel="cancelEdit">
        <Form ref="editItemRef" :model="formData" :rules="rule" :label-width="132" :show-message="false">
            <FormItem prop="img" label="应用图标：" required style="width: 100%">
                <div class="icon-card">
                    <Upload :action="uploadImg"
                        :data="{
                            bizId: '',
                            bizType: 'image',
                            isSingle: true
                        }"
                        :headers="headers"
                        :default-file-list="systenUrl" name="file" :show-upload-list="false"
                        :format="['jpg', 'png']" :on-format-error="FormatError" :on-progress="progressUpload"
                        :on-success="HandleSuccess">
                        <img :src="formData.img" alt="" v-if="formData.img" class="icon-style">
                        <div v-else class="icon-style iconAdd">
                            <Icon type="md-add"/>
                            <span>点击选择</span>
                        </div>
                    </Upload>
                    <span class="tips">支持.jpg .png 格式</span>
                </div>
            </FormItem>
            <FormItem prop="name" label="门户项名称：" required style="width: 50%">
                <Input v-model="formData.name" placeholder="请输入"/>
            </FormItem>
            <FormItem prop="allocation" label="门户项配置：" required style="width: 50%">
                <Select v-model="formData.allocation" placeholder="请选择" @on-change="changeHWList">
                    <Option v-for="item in configureList" :value="item.className" :key="item.className"  v-if="item.type='applicationPortal'">{{item.name}}</Option>
                </Select>
            </FormItem>
            <FormItem label="图表：" style="width: 100%" v-show="formData.allocation == 'customChart'">
                <div class="chartItem" @click="chartDetail(item.title, index)" v-for="(item, index) in formData.dataJson" :key="index">
                    {{item.title}}
                    <div class="del" @click.stop="delChartItem(index)">X</div>
                </div>
                <Button type="dashed" @click="handleAdd" icon="md-add" :disabled="!formData.allocation">添加图表</Button>
            </FormItem>
            <FormItem prop="url" label="数据来源：" required style="width: 50%">
                <Input v-model="formData.url" placeholder="请输入"/>
            </FormItem>
            <FormItem prop="menuRoute" label="链接：" style="width: 50%">
                <Input v-model="formData.menuRoute" placeholder="请输入门户项链接"/>
            </FormItem>
            <FormItem prop="width" label="宽：" style="width: 50%">
                <Select v-model="formData.width"  placeholder="请选择宽度">
                    <Option v-for="item in widthList" :value="item.value" :key="item.value">{{item.name}}</Option>
                </Select>
            </FormItem>
            <FormItem prop="height" label="高：" style="width: 50%">
                <Select v-model="formData.height"  placeholder="请选择高度">
                    <Option v-for="item in heightList" :value="item.value" :key="item.value">{{item.name}}</Option>
                </Select>
            </FormItem>
            <FormItem prop="isDisplay" label="是否可见：" style="width: 100%">
                <i-switch size="large" v-model="formData.isDisplay" true-value="1" false-value="0" :before-change="handleBeforeChange">
                    <span slot="open">是</span>
                    <span slot="close">否</span>
                </i-switch>
            </FormItem>
            <FormItem prop="remarks" label="描述：" style="width: 100%">
                <Input v-model="formData.remarks" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入"/>
            </FormItem>
            <!-- <FormItem prop="data" label="展示内容：" style="width: 100%" v-if="showChartsOrTableItem">
                <Input v-model="formData.data" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入"/>
            </FormItem> -->
        </Form>
    </Modal>
    <Modal v-model="chartSet"
        class-name="edit-add-modal"
        width="800"
        title="图表设置"
        :mask-closable="false"
        :loading="chartSetLoading"
        @on-ok="saveEditChartSet"
        @on-cancel="cancelChartSet">
        <Form ref="editItemRef1" :model="formDataChart" :rules="ruleChartSet" :label-width="80" :show-message="false">
            <FormItem prop="title" label="图表名称：" style="width: 100%">
                <Input v-model="formDataChart.title" placeholder="请输入"/>
            </FormItem>
            <FormItem prop="url" label="统计类别："  style="width: 50%">
                <Select v-model="formDataChart.url"  @on-change="changeUrl" placeholder="请选择">
                    <Option v-for="item in requestUrlList" :value="item.url" :key="item.name">{{item.name}}</Option>
                </Select>
            </FormItem>
            <FormItem prop="type" label="图表类别：" style="width: 50%">
                <Select v-model="formDataChart.type" @on-change="changeFormDataChartType"  placeholder="图表类别">
                    <Option v-for="item in supportType" :value="item.code" :key="item.code">{{item.desc}}</Option>
                </Select>
            </FormItem>
            <FormItem prop="groupFileds" label="分组类别：" style="width: 100%">
                <div style="display:flex;">
                    <RadioGroup v-model="formDataChart.groupFiledsType">
                        <Radio label="single" :disabled="'PROGRESS' == formDataChart.type">单选</Radio>
                        <Radio label="multiple" :disabled="'PROGRESS' == formDataChart.type">多选</Radio>
                        <!-- <Radio label="tree-single">树单选</Radio>
                        <Radio label="tree-multiple">树多选</Radio> -->
                    </RadioGroup>
                    <!-- <Select max-tag-count="2" multiple v-model="formDataChart.groupFileds"  placeholder="分组类别">
                        <Option v-for="item in supportGroup" :value="item.field" :key="item.field">{{item.desc}}</Option>
                    </Select> -->
                </div>
            </FormItem>
            <FormItem prop="groupFileds" label="" style="width: 100%" v-show="supportGroup.length && chartSet">
                <div style="display:flex;">
                    <checkbox-all 
                        v-if="supportGroup.length && chartSet"
                        :dataList="supportGroup" nameKey="desc" valueKey="field" 
                        :myStyle="{'width': '614px', 'margin-right': '8px'}" 
                        :defaultSelectRes="formDataChart.groupFileds" @changeSelectEmit="changeSelectEmit1">
                    </checkbox-all>
                </div>
            </FormItem>
            <FormItem prop="filterFileds" label="过滤字段：" style="width: 100%">
                <div style="display:flex;">
                    <RadioGroup v-model="formDataChart.filterFiledsType">
                        <Radio label="single" :disabled="'PROGRESS' == formDataChart.type">单选</Radio>
                        <Radio label="multiple" :disabled="'PROGRESS' == formDataChart.type">多选</Radio>
                        <!-- <Radio label="tree-single">树单选</Radio>
                        <Radio label="tree-multiple">树多选</Radio> -->
                    </RadioGroup>
                </div>
            </FormItem>
            <FormItem prop="filterFileds" label="" style="width: 100%" v-show="supportFilter.length && chartSet">
                <div style="display:flex;">
                    <checkbox-all 
                        v-if="supportFilter.length && chartSet"
                        :dataList="supportFilter" nameKey="filterName" valueKey="filterFiled" 
                        :myStyle="{'width': '614px', 'margin-right': '8px'}" 
                        :defaultSelectRes="formDataChart.filterFileds" @changeSelectEmit="changeSelectEmit">
                    </checkbox-all>
                </div>
            </FormItem>
            <FormItem prop="tjzb" label="统计指标：" style="width: 100%">
                <checkbox-all 
                    v-if="JSON.stringify(supportItem) != '{}' && chartSet"
                    :isObject="true"
                    :dataList="supportItem" nameKey="filterName" valueKey="filterFiled" 
                    :myStyle="{'width': '614px', 'margin-right': '8px'}" 
                    :defaultSelectRes="formDataChart.tjzb" @changeSelectEmit="changeSelectEmit2">
                </checkbox-all>
               <!--  <Select max-tag-count="2" multiple v-model="formDataChart.tjzb"  placeholder="统计指标">
                    <Option v-for="(value, key) in supportItem" :value="key" :key="key">{{value}}</Option>
                </Select> -->
            </FormItem>
            <FormItem v-show="supportSort && JSON.stringify(supportSort) != '{}'" prop="sortFileds" label="排序字段：" style="width: 100%">
                <checkbox-all 
                    v-if="JSON.stringify(supportSort) != '{}' && chartSet"
                    :isObject="true"
                    :dataList="supportSort" nameKey="filterName" valueKey="filterFiled" 
                    :myStyle="{'width': '614px', 'margin-right': '8px'}" 
                    :defaultSelectRes="formDataChart.sortFileds" @changeSelectEmit="changeSelectEmit3">
                </checkbox-all>
            </FormItem>
            <!-- <FormItem prop="tjzbType" label="" style="width: 50%">
                <RadioGroup v-model="formDataChart.tjzbType">
                    <Radio label="single">单选</Radio>
                    <Radio label="multiple">多选</Radio>
                </RadioGroup>
            </FormItem> -->
            <!-- <FormItem prop="sortFiledsType" label="" style="width: 50%">
                <RadioGroup v-model="formDataChart.sortFiledsType">
                    <Radio label="single">单选</Radio>
                    <Radio label="multiple">多选</Radio>
                </RadioGroup>
            </FormItem> -->
            <FormItem v-show="supportPeriod && supportPeriod.length" prop="periodFileds" label="统计时间：" style="width: 100%">
                <checkbox-all 
                    v-if="chartSet"
                    :dataList="supportPeriod" nameKey="desc" valueKey="code" 
                    :myStyle="{'width': '614px', 'margin-right': '8px'}" 
                    :defaultSelectRes="formDataChart.periodFileds" @changeSelectEmit="changeSelectEmit4">
                </checkbox-all>
            </FormItem>
            <FormItem v-show="roleList && roleList.length" prop="roleList" label="角色范围：" style="width: 100%">
                <checkbox-all 
                    v-if="chartSet"
                    :dataList="roleList" nameKey="name" valueKey="id" 
                    :myStyle="{'width': '614px', 'margin-right': '8px'}" 
                    :defaultSelectRes="formDataChart.roleList" @changeSelectEmit="changeSelectEmit5">
                </checkbox-all>
            </FormItem>
        </Form>
    </Modal>
    <Modal v-model="choiceTypeModal"
        class-name="edit-add-modal"
        width="800"
        title="选择类型"
        :mask-closable="false"
        @on-ok="saveChoice"
        @on-cancel="cancelChoice">
        <Table :columns="columns" :data="typeLists" highlight-row @on-current-change="currentChange"></Table>
    </Modal>
</div>
</template>

<script>
/**
 ** @author: 曹见芳
 ** 工作台 - 门户管理页
 */
import managementTtem from "./item.vue";
import pluginList from "../plugin/libs/pluginData.js";
import valid, { errors, sysAttachment, comPortalItem, api, report, sysRole } from '../../../libs/request.js';
import { mapState, mapMutations } from 'vuex';
import { waitUntil } from "@public/libs/util";
import checkboxAll from "@public/modules/checkboxAll/checkboxAll.vue";
export default {
    name: 'portal.workbenchManage',
    components: {
        managementTtem,
        checkboxAll
    },
    props: {
        
    },
    data(){
        return {
            formDataChart: {},
            chartSetLoading: true,
            chartSet: false,
            lists: [],
            editAddModal: false,
            modalTitle: '新建门户项',
            loading: true,
            formData: {},
            newItem: {
                // img: '/spoc-common/upload/all/20191121/41c5aa69ae6440a9b0139a7ab3b5f954.png',
                img: '',
                name :'',
                allocation: '',
                url: '',
                dataType: '',
                dataTypeName: '',
                width: '',
                height: '',
                isDisplay: '1',
                remarks: '',
                data: '',
                menuRoute: ''
            },
            rule: {},
            ruleChartSet:{
                title: [
                    { required: true, message: '请输入', trigger: 'change' }
                ],
                type: [
                    { required: true, message: '请选择', trigger: 'change' }
                ],
                url: [
                    { required: true, message: '请选择', trigger: 'change' }
                ],
            },
            showConfigure: true, //显示接口相关
            widthList: [
                { value: 1, name: 1 },
                { value: 2, name: 2 },
                { value: 3, name: 3 },
                { value: 4, name: 4 },
                { value: 5, name: 5 },
                { value: 6, name: 6 }
            ],
            heightList: [
                { value: 1, name: 1 },
                { value: 2, name: 2 },
                { value: 3, name: 3 },
                { value: 4, name: 4 },
                { value: 5, name: 5 },
                { value: 6, name: 6 } 
            ],
            systenUrl: [{ 'name': '', 'url': '' }],
            choiceTypeModal: false,
            columns: [
                {
                    title: '别名',
                    key: 'key_'
                },
                {
                    title: '名字',
                    key: 'name_'
                },
                {
                    title: '描述',
                    key: 'desc_'
                },
                {
                    title: '操作',
                    width: 80,
                    render: (h, params) => {
                        return h('a', {
                            on: {
                                click: () => {
                                    this.checkItem = params.row;
                                }
                            }
                        },'选择')
                    }
                },
            ],
            typeLists: [
                {
                    "key_": "basic",
                    "id_": "1",
                    "html_": "<ul class=\"list-group\">\r\n  <li class=\"list-group-item\">{{data-alias.account}}</li>\r\n  <li class=\"list-group-item\">{{data-alias.fullname}}</li>\r\n  <li class=\"list-group-item\">{{data-alias.mobile}}</li>\r\n  <li class=\"list-group-item\">{{data-alias.orgName}}</li>\r\n  <li class=\"list-group-item\">{{data-alias.roleNames}}</li>\r\n</ul>",
                    "desc_": "适用基本信息展示，或者列表数据",
                    "name_": "基础模板"
                }, {
                    "key_": "echarts",
                    "id_": "3",
                    "html_": "{\r\n\t\"title\": {\r\n\t\t\"text\": \"产品销售情况\"\r\n\t},\r\n\t\"legend\": {},\r\n\t\"tooltip\": {},\r\n\t\"toolbox\": {\r\n\t\t\"show\": true,\r\n\t\t\"feature\": {\r\n\t\t\t\"magicType\": {\r\n\t\t\t\t\"show\": true,\r\n\t\t\t\t\"type\": [\"line\", \"bar\", \"stack\", \"tiled\"]\r\n\t\t\t},\r\n\t\t\t\"restore\": {\r\n\t\t\t\t\"show\": true\r\n\t\t\t},\r\n\t\t\t\"saveAsImage\": {\r\n\t\t\t\t\"show\": true\r\n\t\t\t}\r\n\t\t}\r\n\t},\r\n\t\"dataset\": {\r\n\t\t\"source\": []\r\n\t},\r\n\t\"xAxis\": {\r\n\t\t\"type\": \"category\"\r\n\t},\r\n\t\"yAxis\": {},\r\n\t\"series\": []\r\n}",
                    "desc_": "",
                    "name_": "柱状图折线图模板"
                }, {
                    "key_": "basic",
                    "id_": "4",
                    "html_": "<div class=\"row\">\r\n\t<div class=\"col-sm-7 m-b-xs\">\r\n\t\t<div data-toggle=\"buttons\" class=\"btn-group\">\r\n\t\t\t<label class=\"btn btn-sm btn-default active\"> <input type=\"radio\" name=\"param.Q_user_SL\" value=\"1\">待办</label>\r\n\t\t\t<label class=\"btn btn-sm btn-default\"> <input type=\"radio\" name=\"param.Q_user_SL\" value=\"2\">已办</label>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class=\"col-sm-5\">\r\n\t\t<div class=\"input-group\">\r\n\t\t\t<input type=\"text\" placeholder=\"搜索订单关键字\" class=\"input-sm form-control\" ng-model=\"param.subject_\" > \r\n\t\t\t<span class=\"input-group-btn\"> <button type=\"button\" ng-click=\"loadPanelData()\" class=\"btn btn-sm btn-primary\">搜索</button> </span>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n <div class=\"table-responsive\">\r\n\t<table class=\"table table-striped\">\r\n\t\t<thead>\r\n\t\t\t<tr>\r\n\t\t\t\t<th>订单编号</th>\r\n\t\t\t\t<th>待办事项</th>\r\n\t\t\t\t<th>业务品种</th>\r\n\t\t\t\t<th>客户姓名</th>\r\n\t\t\t\t<th>创建时间</th>\r\n\t\t\t</tr>\r\n\t\t</thead>\r\n\t\t<tbody>\r\n\t\t\t<tr ng-repeat=\"task in list\">\r\n\t\t\t\t<td>{{task.apply_no}}</td>\r\n\t\t\t\t<td><a ng-click=\"openFullWindow('/flow/task/taskApprove?id='+this.task.ID_)\" >{{task.NAME_}}</a> </td>\r\n\t\t\t\t<td>{{task.PROC_DEF_NAME_}}</td>\r\n\t\t\t\t<td>{{task.seller_name}}</td>\r\n\t\t\t\t<td>{{task.create_time}} </td>\r\n\t\t\t</tr>\r\n\t\t</tbody>\r\n\t</table>\r\n</div>",
                    "desc_": "列表数据的模板案例，支持检索",
                    "name_": "列表模板"
                }, {
                    "key_": "echarts",
                    "id_": "5",
                    "html_": "{\r\n\t\"title\": {\r\n\t\t\"text\": \"产品销售情况\"\r\n\t},\r\n\t\"legend\": {},\r\n\t\"tooltip\": {},\r\n\t\"dataset\": {\r\n\t\t\"source\": []\r\n\t},\r\n\t\"series\": [{\r\n\t\t\"type\": \"pie\"\r\n\t}]\r\n}",
                    "desc_": "饼状图案例模板",
                    "name_": "饼图模板"
                }
            ],
            checkItem: {},
            showChartsOrTableItem: false,
            headers: {},
            requestUrlList: [],
            supportSort:{},
            supportGroup: [],
            supportType: [],
            supportItem:{},
            supportFilter: [],
            supportPeriod: [],
            roleList: [],
            editCharSetIndex: 0,
            isEditCharSet: false,
        };
    },
    computed: {
        uploadImg: function () {
            return api.fileAttachmentUploadUrl(); // sysAttachment.uploadFileUrl();
        },
        configureList() {
            let arr = [
                // {
                //     name:"图表",//组件名称
                //     className:"chartsOrTable", //类名
                //     width:[
                //         { value:1, name:1 },
                //         { value:2, name:2 },
                //         { value:3, name:3 },
                //         { value:4, name:4 },
                //         { value:5, name:5 },
                //         { value:6, name:6 },
                //     ],
                //     height:[
                //         { value:1, name:1 },
                //         { value:2, name:2 },
                //         { value:3, name:3 },
                //         { value:4, name:4 },
                //         { value:5, name:5 },
                //         { value:6, name:6 },
                //     ]
                // }
            ];
            if(pluginList && pluginList.plugin) {
                arr = [...pluginList.plugin, ...arr]
            }
            return arr;
        }
    },
    mounted(){
        this.getLists();
        this.listStatPanel()
        this.headers = {
            token: localStorage.getItem('token'),
            tenant: localStorage.getItem('tenant')	
        }
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        changeFormDataChartType(val){
            if(val == 'PROGRESS'){
                this.formDataChart.groupFiledsType = 'single'
                this.formDataChart.filterFiledsType = 'single'
            }
        },  
        changeSelectEmit(selectRes) {
            this.$set(this.formDataChart, 'filterFileds', selectRes)
        },
        changeSelectEmit1(selectRes) {
            this.$set(this.formDataChart, 'groupFileds', selectRes)
        },
        changeSelectEmit2(selectRes) {
            this.$set(this.formDataChart, 'tjzb', selectRes)
        },
        changeSelectEmit3(selectRes) {
            this.$set(this.formDataChart, 'sortFileds', selectRes)
        },
        changeSelectEmit4(selectRes) {
            console.log(selectRes)
            this.$set(this.formDataChart, 'periodFileds', selectRes)
        },
        changeSelectEmit5(selectRes) {
            console.log(selectRes)
            this.$set(this.formDataChart, 'roleList', selectRes)
        },
        delChartItem(index){
            this.formData.dataJson.splice(index,1)
            this.$forceUpdate()
        },
        formDataChartTrans(obj){
            let groupFileds = []
            if(obj.groupFileds && obj.groupFileds.length){
                obj.groupFileds.forEach(item=>{
                    let _obj = this.supportGroup.find(itemChild=>{
                        return itemChild.field == item
                    })
                    if(_obj){
                        groupFileds.push({
                            "groupName": _obj.desc,
                            "groupField": _obj.field,
                            "type": obj.groupFiledsType
                        })
                    }
                })
            }
            obj.groupFileds = groupFileds
            /////////////////////////////
            let sortFileds = []
            if(obj.sortFileds && obj.sortFileds.length){
                obj.sortFileds.forEach(item=>{
                    if(this.supportSort[item]){
                        sortFileds.push({
                            "sortName": this.supportSort[item],
                            "sortField": item
                        })
                    }
                })
            }
            obj.sortFileds = sortFileds
            /////////////////////////////
            let filterFileds = []
            if(obj.filterFileds && obj.filterFileds.length){
                obj.filterFileds.forEach(item=>{
                    let q = this.supportFilter.find(_item=>{
                        return _item.filterFiled == item
                    })
                    if(q){
                        filterFileds.push(q)
                    }
                })
            }
            obj.filterFileds = filterFileds
            /////////////////////////////
            let periodFileds = []
            if(obj.periodFileds && obj.periodFileds.length){
                obj.periodFileds.forEach(item=>{
                    let q = this.supportPeriod.find(_item=>{
                        return _item.code == item
                    })
                    if(q){
                        periodFileds.push(q)
                    }
                })
            }
            obj.periodFileds = periodFileds
            /////////////////////////////
            let tjzb = []
            if(obj.tjzb && obj.tjzb.length){
                obj.tjzb.forEach(item=>{
                    if(this.supportItem[item]){
                        tjzb.push(
                            {
                                name: this.supportItem[item],
                                value: item
                            }
                        )
                    }
                })
            }
            obj.tjzb = tjzb
            /////////////////////////////
            // let roleList = []
            // if(obj.roleList && obj.roleList.length){
            //     obj.roleList.forEach(item=>{
            //         let q = this.roleList.find(_item=>{
            //             return _item.id == item
            //         })
            //         if(q){
            //             roleList.push(q)
            //         }
            //     })
            // }
            // obj.roleList = roleList
            return obj
        },
        saveEditChartSet(){
            this.$refs.editItemRef1.validate((valid) => {
                if (valid) {
                    console.log(JSON.stringify(this.formDataChart))
                    let formDataChart = JSON.parse(JSON.stringify(this.formDataChart))
                    if (this.formData.dataJson) {
                        let titles = this.formData.dataJson.map((item)=>{ return item.title })
                        if(titles.indexOf(formDataChart.title) >=0 && !this.isEditCharSet){
                            this.$Message.error('名称不可重复')
                            this.chartSetLoading = false
                            this.chartSet = true
                            setTimeout(()=>{
                                this.chartSetLoading = true 
                            },100)
                        } else if(this.isEditCharSet){
                            this.formData.dataJson.splice(this.editCharSetIndex, 1, this.formDataChartTrans(formDataChart))
                        } else {
                            this.formData.dataJson.push(this.formDataChartTrans(formDataChart))
                        }
                    } else {
                        this.formData.dataJson = [this.formDataChartTrans(formDataChart)]
                    }
                    this.chartSetLoading = false
                    this.chartSet = false
                    setTimeout(()=>{
                    this.chartSetLoading = true 
                    },100)
                } else {
                    this.chartSetLoading = false
                    this.chartSet = true
                    setTimeout(()=>{
                        this.chartSetLoading = true 
                    },100)
                }
            })
        }, 
        cancelChartSet(){
            this.chartSet = false
        },
        handleAdd(){
            this.supportSort ={}
            this.supportGroup = []
            this.supportType = []
            this.supportItem = {}
            this.supportFilter = []
            this.formDataChart = {}
            this.formDataChart.groupFiledsType = 'multiple'
            this.formDataChart.filterFiledsType = 'multiple'
            // this.formDataChart.tjzbType = 'multiple'
            // this.formDataChart.sortFiledsType = 'multiple'
            this.isEditCharSet = false
            this.chartSet = true
        },
        chartDetail(title, index){
            let _obj = null
            this.formData.dataJson.forEach((item, _index)=>{
                if(index == _index) {
                    _obj = item
                    this.editCharSetIndex = index
                }
            })
            let obj = JSON.parse(JSON.stringify(_obj))
            this.changeUrl(obj.url)
            if(obj.groupFileds){
                obj.groupFileds = obj.groupFileds.map(item=>{ return item.groupField })
            }
            if(obj.sortFileds){
                obj.sortFileds = obj.sortFileds.map(item=>{ return item.sortField })
            }
            if(obj.tjzb){
                obj.tjzb = obj.tjzb.map(item=>{ return item.value })
            }
            if(obj.filterFileds){
                obj.filterFileds = obj.filterFileds.map(item=>{ return item.filterFiled })
            }
            if(obj.periodFileds){
                obj.periodFileds = obj.periodFileds.map(item=>{ return item.code })
            }
            // if(obj.roleList){
            //     obj.roleList = obj.roleList.map(item=>{ return item.id })
            // }
            this.formDataChart = obj
            this.isEditCharSet = true
            this.chartSet = true
        },
        listStatPanel(){
            report.listStatPanel({})
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.requestUrlList = res.data.data
                }
            })
            .catch(errors.call(this))
            .finally(() => {
            });
        },
        getLists() {
            let params = {
                delFlag: 0,
            }
            this.updateLoadingStatus({ isLoading: true });
            comPortalItem.findPortalItemList(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    let _data = res.data.data;
                    if(_data && _data.length) {
                        _data.forEach(item => {
                            item.width = Number(item.width);
                            item.height = Number(item.height);
                        });
                    }
                    this.lists = _data || [];
                }
            })
            .catch(errors.call(this))
            .finally(() => {
                this.updateLoadingStatus({ isLoading: false });
            });
        },
        changeLoading() {
            this.loading = false;
            setTimeout(() => {
                this.loading = true;
            }, 0);
        },
        cancelEdit() {
            this.editAddModal = false;
        },
        changeUrl(_url){
            if(!_url){
                return
            }
            this.formDataChart.groupFileds = []
            this.formDataChart.filterFileds = []
            this.formDataChart.periodFileds = []
            this.formDataChart.roleList = []
            this.formDataChart.tjzb = []
            this.formDataChart.sortFileds = []
            this.$forceUpdate()
            let url = _url.substring(4,_url.length)

            // 获取分组
            report.supportGroup(url)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.supportGroup = res.data.data
                }
            })
            .catch(errors.call(this))
            .finally(() => {
            });

            // 获取排序
            report.supportSort(url)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.supportSort = res.data.data
                }
            })
            .catch(errors.call(this))
            .finally(() => {
            });

             //获取图形类型
            report.supportType(url)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.supportType = res.data.data
                }
            })
            .catch(errors.call(this))
            .finally(() => {
            });

            // 获取指标项
            report.supportItem(url)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.supportItem = res.data.data
                }
            })
            .catch(errors.call(this))
            .finally(() => {
            });

            // 获取过滤字段
            report.supportFilter(url)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.supportFilter = res.data.data
                }
            })
            .catch(errors.call(this))
            .finally(() => {
            });

            // 获取过滤字段
            report.supportPeriod(url)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.supportPeriod = res.data.data
                }
            })
            .catch(errors.call(this))
            .finally(() => {
            });

            // 获取角色列表
            sysRole
            .roleList()
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.roleList = res.data.data.roleList;
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },
        //获取宽高下拉
        changeHWList(flag){
            if(!flag) {
                this.formData.width = "";
                this.formData.height = "";
            }
            this.configureList.map((item)=>{
                if(item.className == this.formData.allocation){
                    this.widthList = item.width;
                    this.heightList = item.height;
                }
            });
            this.showChartsOrTableItem = this.formData.allocation == 'chartsOrTable' ? true : false;
        },
        FormatError(file) {
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: file.name + '文件格式不正确, 请选择JPG、PNG'
            });
        },
        progressUpload(event, file, fileList) {
            this.updateLoadingStatus({ isLoading: true })
        },
        HandleSuccess: function (data) {
            this.updateLoadingStatus({ isLoading: false })
            this.$Message.success('上传成功');
            // console.log(data.data)
            this.formData.img = data.data.url;
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.save();
                } else {
                    this.changeLoading();
                }
            })
        },
        saveEdit() {
            this.handleSubmit('editItemRef');
        },
        addItem() {
            this.handleReset('editItemRef');
            this.modalTitle = '新建门户项';
            this.formData = Object.assign({}, this.newItem);
            this.editAddModal = true;
        },
        editItem(item) {
            this.handleReset('editItemRef');
            this.modalTitle = '编辑门户项';
            this.formData = Object.assign({}, item);
            // this.changeHWList(true);
            this.changeHWList(this.formData.allocation)
            this.editAddModal = true;
        },
        openChoiceTypeModal() {
            // console.log(this.formData.dataType)
            if(this.formData.dataType) {
                this.typeLists.forEach(item => {
                    if(item.id_ == this.formData.dataType) item._highlight = true;
                });
            }
            this.choiceTypeModal = true;
        },
        saveChoice() {
            if(this.checkItem && this.checkItem.id_) {
                this.formData.dataType = this.checkItem.id_;
                this.formData.dataTypeName = this.checkItem.key_;
                // this.formData.data = this.checkItem.html_;
            }
        },
        cancelChoice() {
            this.typeLists.forEach(item => {
                delete item._highlight;
            });
        },
        choiceOver(item) {
            if(item && item.id_) {
                this.formData.dataType = item.id_;
                this.formData.dataTypeName = item.name_;
                this.formData.data = item.html_;
            }
        },
        currentChange(item) {
            this.checkItem = item;
        },
        save() {
            let params = Object.assign({}, this.formData);
            params.data = JSON.stringify(this.formData.dataJson)

            this.updateLoadingStatus({ isLoading: true });
            comPortalItem.save(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.$Message.success('保存成功！');
                    this.cancelEdit();
                    this.getLists();
                } else {
                    this.changeLoading();
                }
            })
            .catch(errors.call(this))
            .finally(() => {
                this.updateLoadingStatus({ isLoading: false });
            });
        },
        handleBeforeChange() {
            return new Promise((resolve) => {
                if(this.formData.id) {
                    this.loading = true;
                    this.findRelevancyInfo(resolve);
                }
                else resolve();
            });
        },
        findRelevancyInfo(callback) {
            let params = {
                protalItemId: this.formData.id
            }
            this.updateLoadingStatus({ isLoading: true });
            comPortalItem.findRelevancyInfo(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    // true: 不能修改
                    let _data = res.data.data;
                    if(_data) {
                        this.$Notice.config({
                            top: 120,
                        });
                        this.$Notice.error({
                            title: '提示',
                            render: h => {
                                let dom = [
                                    '该项已经被分配到 ',
                                    h('a', '校长CM'),
                                    '、',
                                    h('a', '服务OO'),
                                    '的工作台模板中，暂不能隐藏。',
                                    h('div', '如需隐藏，请先将该项从已分配的工作台模板中删除。')
                                ]
                                return h('div', {
                                    style: {
                                        'line-height': 1.5
                                    }
                                }, dom)
                            },
                            // duration: 0,
                        });
                    } else {
                        // false: 可以修改
                        callback && callback();
                    }
                } else {
                }
            })
            .catch(errors.call(this))
            .finally(() => {
                this.loading = false;
                this.updateLoadingStatus({ isLoading: false });
            })
        },
    },
}
</script>


