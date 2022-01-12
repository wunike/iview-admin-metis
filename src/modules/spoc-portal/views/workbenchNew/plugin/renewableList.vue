<style lang="less">
@import "./libs/public.less";
.renewable-list-plugin-wrapper {
    // background-image: url("../../../assets/img/workbenchNew/bg_todo.png");
    background-color: #fff;
    .show{
        /*color: #44bcb7;*/
        cursor:pointer;
    }
    .hide{
        color:#C4C4C4;
        cursor:default;
    }
    .title{
        height:40px;
    }
    .main{
        top:45px;
    }
    .ivu-tabs-bar{
        margin:0;
    }
    .rlpw-content{
        padding:0 16px;
    }
    .ivu-table td,.ivu-table th{
        height:40px;padding:0;
    }
    .ivu-table-wrapper{
        border:none;
    }
    .ivu-table:before,.ivu-table:after{
        width:0;
        height:0;
    }
    .ivu-table-cell{
        padding-left:8px;
        padding-right:8px;
    }

    .ivu-table-tip td{
        border:none;
    }
    .rlpw-page{
        padding:0 16px;
        display: inline-block;
        text-align: right;
        position: absolute;
        width:100px;
        top:-5px;
        right:0;
        z-index: 2;
        div{
            .icon{
                &.active{
                    color:#44BCB7;
                    cursor:pointer;
                }
                color:#999;
                cursor: default;
                font-size: 28px;
                margin-bottom:-9px;
            }

        }
    }
    .export-file{
        width:26px;
        height:32px;
        position: absolute;
        top:15px;
        right:14px;
        .icon{
            cursor: pointer;
            border-radius: 20px;
            background: #999;
        }
    }
}
</style>

<template lang="html">
    <plugin-template class="renewable-list-plugin-wrapper"
        :style="{backgroundImage:`url(${require('../../../assets/img/workbenchNew/bg_todo.png')})`}"
        :mode="mode" :data="data" :dataLength="dataLength"
        @clickMore="clickMore" @loadData="loadData"
        @onButtonClick="onButtonClick"
        @init="init">
        <div slot="btttons" class="export-file">
            <tableDropdown  @dropFn="dropFn" :buttonList="buttonList">
                <span class="icon" slot="infos"><Icon style="margin-top:-1px;" size="16" color="#fff"  type="ios-more"></Icon></span>
            </tableDropdown>
<!--            <Button @click="exportFn" :long="true" size="small"  type="primary">导出</Button>-->
        </div>
        <div class="rlpw-page">
            <div>
                <Icon
                        class="icon"
                        :class="{active: pageNo>1 && pageNo <= pages}"
                        style="margin-right:5px;"
                        type="ios-arrow-dropleft"
                        @click="prev"/>
                <Icon
                        class="icon"
                        :class="{active: pageNo>=1 && pageNo < pages}"
                        type="ios-arrow-dropright"
                        @click="next"
                /></div>
        </div>
        <div class="rlpw-content">
            <Tabs v-model="tabVal" @on-click="changeTabs">
                <TabPane
                        :label="tab.label"
                        :name="tab.value"
                        v-for="(tab,index) in renewableList"
                        :key="index">
                </TabPane>
            </Tabs>
            <Table :columns="cols"  :data="dataList" ></Table>
        </div>
    </plugin-template>
</template>

<script>
/**
 ** @author: 曹见芳
 ** 插件 - 续费预警
 */
import MODE from "./mode.js";
import valid, { errors, common } from '../../../libs/request.js';
import pluginTemplate from './components/template.vue'
import { mapMutations,mapState } from "vuex";
import popTipTable from "./components/popTipTable";
import tableDropdown from "./components/tableDropdown";

export default {
    components: {
        pluginTemplate,
        popTipTable,
        tableDropdown
    },
    props: {
        mode: { //当前模式
            type: String,
            default: '',
            required: true
        },
        data: { //节点数据
            type: Object,
            required: true
        },
    },
    data() {
        return {
            dataLength: !false,
            tabVal:'',
            buttonList:[
                {
                    value:'1', label:'导出'
                },
            ],
            renewableList:[
                {
                    value:'1', label:'待续费'
                },
                {
                    value:'2', label:'续费未跟进'
                },
                {
                    value:'3', label:'续费已跟进'
                },
                {
                    value:'0', label:'已忽略'
                },
            ],
            cols:[],
            cols1:[
                {
                    title: "姓名",
                    key: "stuName",
                    minWidth:50,
                    render: (h, params) => {
                        return h(
                            "div", [
                                h('span',{
                                    style:{
                                    }
                                },[
                                    h(popTipTable,
                                        {
                                            props:{
                                                courseList:params.row.courseList,
                                                text:params.row.stuName
                                            },
                                        }),
                                ]),

                            ]
                        )
                    }
                },
                {
                    title: "英文名",
                    key: "stuEnName",
                    render: (h, params) => {
                        return h(
                            "div", [
                                h('span',
                                    params.row.stuEnName? params.row.stuEnName :'-'),
                            ]
                        )
                    }
                },
                {
                    title: "剩余总课时数",
                    key: "remainHour",
                    // minWidth:90,

                },
                {
                    title: "剩余有效期",
                    key: "remainDay",
                    // minWidth:90,
                    render: (h, params) => {
                        return h(
                            "div", [
                                h('span',
                                    // params.row.remainDay? params.row.remainDay+"天" :'-'),
                                    params.row.remainDay? (Number(params.row.remainDay) >=0 ? (params.row.remainDay+"天") : ('过期'+ Math.abs(Number(params.row.remainDay))+"天")) :'-'),
                            ]
                        )
                    }
                },
                {
                    title: "操作",
                    key: "action",
                    width:80,
                    render: (h, params) => {
                        return h(
                            "div",[
                                h('a',
                                    {
                                        class:params.row.isIgnore == '0'?'show':'hide',
                                        style:{
                                            'margin-right':'8px',
                                            display:this.tabVal == '1' || this.tabVal == '3'? 'inline-block':'none'
                                        },
                                        on:{
                                            click:()=>{
                                                if(params.row.isIgnore == '0'){
                                                    let config = {
                                                        title:`<div>确认 <span>忽略</span>此条续费预警吗？</div>`,
                                                        content:`确认后该学员续费预警将不再显示。`,
                                                        onOk:()=>{
                                                            this.ignore(params.row.stuId)
                                                        }
                                                    }
                                                    this.$Modal.confirm(config)
                                                }
                                            }
                                        }
                                    },
                                    '忽略'),
                                h('a',
                                    {
                                        on:{
                                            click:()=>{
                                                this.$router.push({
                                                    name:'crm.customer360',
                                                    query:{
                                                        id:params.row.cusId
                                                    }
                                                })
                                            }
                                        }
                                    },
                                    '详情'),
                            ]
                        );
                    }
                },

            ],
            cols2:[
                {
                    title: "姓名",
                    key: "stuName",
                    // width:90,
                    // tooltip:true,
                    render: (h, params) => {
                        return h(
                            "div",
                            [
                                // h('span',
                                //     {
                                //         style:{
                                //             display:'inline-block',
                                //             width:'150px',
                                //             height:'30px',
                                //             'line-height':'30px',
                                //             overflow:'hidden',
                                //             textOverflow:'ellipsis',
                                //             'white-space': 'nowrap'
                                //         },
                                //     },
                                //     params.row.stuName),
                                h('span',{
                                    style:{
                                    }
                                },[
                                    h(popTipTable,
                                        {
                                            props:{
                                                courseList:params.row.courseList,
                                                text:params.row.stuName
                                            },
                                        }),
                                ]),

                            ]
                        )
                    }
                },
                {
                    title: "英文名",
                    key: "stuEnName",
                    // maxWidth:80,
                    // tooltip:true,
                    render: (h, params) => {
                        return h(
                            "div", [
                                h('span',
                                    params.row.stuEnName? params.row.stuEnName :'-'),
                            ]
                        )
                    }
                },
                {
                    title: "忽略时间",
                    key: "ignoreTime",
                    width:80,
                    // ellipsis:true,
                    tooltip:true,
                    hide:true,
                    // render: (h, params) => {
                    //     return h(
                    //         "div", [
                    //             h('span',
                    //                 params.row.ignoreTime? params.row.ignoreTime :'-'),
                    //         ]
                    //     )
                    // }
                },
                {
                    title: "剩余总课时数",
                    key: "remainHour",
                    // width:100,
                },
                {
                    title: "剩余有效期",
                    key: "remainDay",
                    // maxWidth:100,
                    render: (h, params) => {
                        return h(
                            "div", [
                                h('span',
                                    // params.row.remainDay? params.row.remainDay+"天" :'-'),
                                    params.row.remainDay? (Number(params.row.remainDay) >=0 ? (params.row.remainDay+"天") : ('过期'+ Math.abs(Number(params.row.remainDay))+"天")) :'-'),
                            ]
                        )
                    }
                },
                {
                    title: "操作",
                    key: "action",
                    // width:40,
                    render: (h, params) => {
                        return h(
                            "div",[
                                h('a',
                                    {
                                        class:params.row.isIgnore == '0'?'show':'hide',
                                        style:{
                                            'margin-right':'8px',
                                            display:this.tabVal == '1' || this.tabVal == '3'? 'inline-block':'none'
                                        },
                                        on:{
                                            click:()=>{
                                                if(params.row.isIgnore == '0'){
                                                    let config = {
                                                        title:`<div>确认 <span>忽略</span>此条续费预警吗？</div>`,
                                                        content:`确认后该学员续费预警将不再显示。`,
                                                        onOk:()=>{
                                                            this.ignore(params.row.stuId)
                                                        }
                                                    }
                                                    this.$Modal.confirm(config)
                                                }
                                            }
                                        }
                                    },
                                    '忽略'),
                                h('a',
                                    {
                                        on:{
                                            click:()=>{
                                                this.$router.push({
                                                    name:'crm.customer360',
                                                    query:{
                                                        id:params.row.cusId
                                                    }
                                                })
                                            }
                                        }
                                    },
                                    '详情'),
                            ]
                        );
                    }
                },

            ],
            dataList:[],
            total:0,
            pageSize:4,
            pageNo:1,
            pages:0,
            officeIdList:[],
        }
    },
    computed: {
        ...mapState(["app"]),
        ...MODE
    },
    mounted(){
        this.changeTabs('1')
        this.cols = [...this.cols1]
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        dropFn(v) {
            if(v == '1'){
                this.exportFn()
            }
        },
        prev() {
            // console.log(this.pageNo)
            // console.log(this.pageNo>1 && this.pageNo <= this.pages)
            if(this.pageNo>1 && this.pageNo <= this.pages){
                this.pageNo--
                this.getLists(this.tabVal)
            }
        },
        next() {
            // console.log(this.pageNo>=1 && this.pageNo < this.pages)
            // console.log(this.pages)
            if(this.pageNo>=1 && this.pageNo < this.pages){
                this.pageNo++
                this.getLists(this.tabVal)
            }
        },
        //加载数据
        loadData() {
            this.showloading = true;
        },
        //点击更多
        clickMore(){
            // console.log('clickMore')
        },
        init() {
            this.$emit("init", this);
        },
        onButtonClick(str) {
            this.$emit('onButtonClick', str);
        },
        changeTabs(val) {
            this.pageNo = 1
            this.tabVal = val
            if(val == '0'){
                this.cols = [...this.cols2]
            } else {
                this.cols = [...this.cols1]
            }
            this.getLists(val)
        },
        exportFn(){
            this.updateLoadingStatus({ isLoading: true });
            let params = {}
            switch (this.tabVal) {
                case '1':
                    params.showFlag='0'
                    break;
                case '2':
                    params.showFlag='1'
                    break;
                case '3':
                    params.showFlag='2'
                    break;
                default:
                    params.showFlag='3'
            }
            params.pageNo = this.pageNo
            params.pageSize = this.pageSize
            params.officeIdList= this.officeIdList
            common.exportFile(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    console.log(res.data)
                    const blob = new Blob([res.data], {type: "application/actet-stream;charset=utf-8"});
                    const contentDisposition = res.headers["content-disposition"]; //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
                    const patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*");
                    const result = patt.exec(contentDisposition);
                    if (!result) {
                        this.$Message.error(this.$t("pushsettings_33"));
                        return;
                    }
                    const filename = decodeURIComponent(result[1]);
                    const downloadElement = document.createElement("a");
                    const href = window.URL.createObjectURL(blob); //创建下载的链接
                    downloadElement.style.display = "none";
                    downloadElement.href = href;
                    downloadElement.download = filename; //下载后文件名
                    document.body.appendChild(downloadElement);
                    downloadElement.click(); //点击下载
                    document.body.removeChild(downloadElement); //下载完成移除元素
                    window.URL.revokeObjectURL(href);
                }
            })
            .catch(errors.call(this))
            .finally(() => {
                this.updateLoadingStatus({ isLoading: false });
            });
        },
        getLists(k){
            this.officeIdList = this.app.currOfficeId == "all" ? [] : [this.app.currOfficeId]
            this.updateLoadingStatus({ isLoading: true });
            let params = {}
            switch (k) {
                case '1':
                    params.showFlag='0'
                    break;
                case '2':
                    params.showFlag='1'
                    break;
                case '3':
                    params.showFlag='2'
                    break;
                default:
                    params.showFlag='3'
            }
            params.pageNo = this.pageNo
            params.pageSize = this.pageSize
            params.officeIdList= this.officeIdList
            common.comAlarmRenewListPage(params,{
                headers:{
                    menuRouteCover: this.data.menuRoute
                }
            })
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    let _data = res.data.data;
                    this.total = _data.total
                    this.pages = Math.ceil(this.total/4)
                    this.dataList = _data.list
                }
            })
            .catch(errors.call(this))
            .finally(() => {
                this.updateLoadingStatus({ isLoading: false });
            });
        },
        ignore(id){
            this.updateLoadingStatus({ isLoading: true });
            let params = {
                isIgnore:'1',
                stuId:id
            }
            common.saveIsIgnore(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.getLists(this.tabVal)
                }
            })
            .catch(errors.call(this))
            .finally(() => {
                this.updateLoadingStatus({ isLoading: false });
            });
        },
    },
    watch: {
        "app.currOfficeId": function(val, oldVal) {
            if (oldVal) {
                // this.$set(this.params, "followOfficeId", val == "all" ? "" : val);
                // this.officeIdList = this.app.currOfficeId == "all" ? [] : [this.app.currOfficeId]
                this.getLists(this.tabVal);
            }
        }
    }
}
</script>