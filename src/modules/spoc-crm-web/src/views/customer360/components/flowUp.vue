<style lang="less">
@mainColor: #44BCB7;
.flow-up-container{
    position: relative;
    padding: 16px 16px 24px;
    min-height: 100%;
    background: #fff;
    textarea.ivu-input{
        height: auto;
    }
    .clear{
        zoom: 1;
        &::before, &::after{
            content: '';
            clear: both;
            display: block;height: 0;line-height: 0;font-size: 0;
        }
    }
    .new-flow-up{
        // height:180px;
        padding-top: 17px;padding-right: 16px;padding-bottom: 15px;
        box-shadow:0px 0px 4px 0px rgba(0,0,0,0.15);
        border-radius:4px;
    }
    .ivu-form .ivu-form-item-label{
        font-size: 14px;color: #999;
    }
    .ivu-form-item{
        margin-bottom: 12px;
    }
    .type-img, .useLabelStyle{
        float: left;margin-right: 16px;line-height: 1;
        color: @mainColor;
        width: 70px;
        cursor: pointer;
        i{
            position: relative;top: -1px;
            font-size: 15px;margin-right: 4px;
        }
    }
    .rightbtn{
        float: right;margin-left: 12px;
    }
    .filter-div{
        padding-top: 30px;
    }
    .filter-tabs{
        @h: 30px;
        height: @h;margin-bottom: 20px;
        li{
            float: left;height: @h;line-height: @h - 2px;
            width: 112px;
            border: 1px solid #D4D5DA;font-size: 14px;
            text-align: center;
            cursor: pointer;
            &.active{
                background: @mainColor;border-color: @mainColor;color: #fff;
            }
            &:first-child{
                border-radius:4px 0px 0px 4px;
            }
            &:last-child{
                border-radius:0px 4px 4px 0px;
            }
        }
    }
    .filter-top{
        .clear;
        margin-bottom: 10px;
    }
    .items-tips{
        float: left;
        font-size: 14px;
        span{
            font-size: 16px;color: @mainColor;
        }
        .openAll{
            font-size: 14px;
            cursor: pointer; 
            margin-left: 12px;
        }
    }
    .filter-select{
        @h: 32px;
        float: right;
        width: 224px;height: @h;
    }
    .c-month {
		margin-left: 20px;
		padding: 8px 0 1px 20px;
		border-left: 1px solid @mainColor;
		position: relative;min-height: 20px;
		.month-name {
			position: absolute;
			left: 15px;
			top: -4px;
			cursor: pointer;
			&:before {
				content: " ";
				display: block;
				width: 9px;
				height: 9px;
				background-color: @mainColor;
				border-radius: 50%;
				position: absolute;
				left: -20px;
				top: 3px;
			}
		}
		.st-count{
			position: absolute;
			left: 100px;
			top: -4px;
			cursor: pointer;
			//color: @mainColor;
		}
    }
    .filter-checkbox{
        float: right;margin-top: 9px;margin-right: 16px;
    }
    .useLabelStyle i{
        float: left;top: -1px;font-size: 14px;
    }
}
</style>
    
<template>
<div class="flow-up-container">
    <div class="new-flow-up">
        <Form ref="formValidate" :model="addItem" :rules="ruleValidate" :label-width="110">
            <!-- <FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_components_flowup_786')" prop="date">
                <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" v-model="addItem.date" ></DatePicker>
            </FormItem> -->
            <FormItem :label="$t('modules_spoc_crm_web_src_views_customer360_components_flowup_787')" prop="text">
                <Input v-model="addItem.text" type="textarea" :rows="4" :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_flowup_788')"></Input>
            </FormItem>
            <FormItem label=" ">
                <div class="type-img" @click="showImgBox">
                    <Icon type="ios-image"/>
                    <span>{{$t('modules_spoc_crm_web_src_views_customer360_components_flowup_789', [imgnum])}}</span>
                    <up-img-new 
                        ref="upImgNew" 
                        v-show="addItem.img.visible" 
                        @close="close"
                        @on-change="onImgChange"
                        class="abs-img"
                        fileInputId="360FlowUpImg" 
                        :objectType="objectType" 
                        :objectId="id"
                        :kind="kind">
                    </up-img-new>
                </div>
                <div class="type-img" @click="showFileBox">
                    <Icon type="ios-folder"/>
                    <span>{{$t('modules_spoc_crm_web_src_views_customer360_components_flowup_790', [filenum])}}</span>
                    <up-file-new
                        ref="upFileNew"
                        v-show="addItem.file.visible" 
                        @close="close"
                        @on-change="onFileChange"
                        class="abs-file"
                        fileInputId="360FlowUpFile" 
                        :objectType="objectType" 
                        :objectId="id"
                        :kind="kind"
                        :maxNum="3">
                    </up-file-new>
                </div>
                <!-- bug 570 客户管理-客户360-标签编辑入口放在跟进内容下面，原来的标签位置仅展示标签内容不可编辑 -->
                <user-label 
                    v-if="myButtonPrem.indexOf('editcus') > -1" 
                    ref="userLable" 
                    :menuId="2001" 
                    :flag="0" 
                    @userLabelTrueChoose="userLabelTrueChoose" 
                    :defaultCheckedTagids="ids" 
                    @poperShow="poperShow"
                    placement="right">
                    <span slot="hasTagName">
                        <div class="edit">
                            <i class="iconfont icon-tongyongbiaoqian"></i>标签
                        </div>
                    </span>
                </user-label>
            </FormItem>
            <FormItem label="下次联系时间：" style="margin-bottom: 0;">
                <DatePicker type="datetime" v-model="nextTime" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择时间" style="width: 170px"></DatePicker>
                <Button class="rightbtn" type="primary" @click="doSubmit('trace')" v-if="(detailData.isEffective != '1') && (myButtonPrem.indexOf('createTrace') > -1)">提交日常跟进</Button>
                <Button class="rightbtn" type="primary" @click="doSubmit('review')" v-if="(detailData.isEffective != '1') && (myButtonPrem.indexOf('createReview') > -1)">提交领导点评</Button>
            </FormItem>
        </Form>
    </div>
    <div class="filter-div">
        <div class="filter-tabs">
            <ul>
                <li :class="{active: tabs == '1'}" @click="changeTabs('1')">{{$t('modules_spoc_crm_web_src_views_customer360_components_flowup_794')}}</li>
                <li :class="{active: tabs == '2'}" @click="changeTabs('2')">{{$t('modules_spoc_crm_web_src_views_customer360_components_flowup_795')}}</li>
            </ul>
        </div>
        <div class="filter-top">
            <div class="items-tips">{{$t('modules_spoc_crm_web_src_views_customer360_components_flowup_796')}}<span>{{count}}</span>{{$t('modules_spoc_crm_web_src_views_customer360_components_flowup_797')}}<span class="openAll" @click="openAll">{{isOpenAll? $t('modules_spoc_crm_web_src_views_customer360_components_flowup_798'):$t('modules_spoc_crm_web_src_views_customer360_components_flowup_799')}}</span>
            </div>
            <Select v-model="myfilter" multiple  @on-change="onFilterChange" class="filter-select" :max-tag-count="1">
                <!-- <Option value="">{{$t('modules_spoc_crm_web_src_views_customer360_components_flowup_800')}}</Option> -->
                <Option :value="item.value" v-for="(item,index) in crm_trace_type" :key="'fi'+index">{{ item.label }}{{item.description ? '('+item.description+')' : ''}}</Option>
            </Select>
            <Checkbox v-model="single" @on-change="getCrmTraceTrees()" class="filter-checkbox">{{$t('modules_spoc_crm_web_src_views_customer360_components_flowup_801')}}</Checkbox>
        </div>
        <div class="c-month" v-for="(mon, i) in crmTraceTrees" :key="i">
            <p class="month-name" @click="toggle(mon)">
                <span v-text="mon.time"></span>
                <Icon :type="mon.hide!==true?'ios-arrow-up':'ios-arrow-down'"></Icon>
            </p>
            <div v-if="mon.hide!==true">
                <record-card v-for="item in mon.crmTraces" :data="item" :key="item.id" :editable="editable" @edit="onEdit" @play="onPlay"/>
            </div>
            <div v-else>
                <div class="st-count" @click="toggle(mon)">{{$t('modules_spoc_crm_web_src_views_customer360_components_flowup_802', [mon.count])}}</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
/**
 ** @author: 曹见芳
 ** 客户360 - 学员跟进
 */
import valid, { errors, sysUser, sysDict, crmTrace, crmCustomer, crmCustomerDetail } from "../../../libs/request";
import { mapMutations, mapState } from 'vuex';
import recordCard from "./recordCard";
import upImgNew from "./upImgNew";
import upFileNew from "./upFileNew";
import { clone, waitUntil } from '@public/libs/util.js'
import cosUpload from '@public/modules/cosUpload'
import userLabel from "@public/modules/userLabel"
export default {
    name: 'flowUp',
    components: {
        recordCard,
        upImgNew,
        upFileNew,
        cosUpload,
        userLabel
    },
    props: {
        id:{
           type: String,
           required: true 
        },
        detailData: {
            type: Object,
            required: true
        },
        eventByState: {
            type: Array,
            required: true,
        }
    },
    data(){
        return {
            nextTime: null,
            isOpenAll: false,
            showUpload: false,
            objectType:'customer',
            // objectId: '',
            kind: '',
            addItem: {
                // date: '',
                text: '',
                img: {
					visible: false
				},
				file: {
					visible: false
				},
            },
            editItem: {},
            imgList:[],
            fileList:[],
            ruleValidate: {
                /* date: [
                    { required: true, type: 'date', message: '请选择跟进时间', trigger: 'change' }
                ], */
                text: [
                    { required: true, message: this.$t('modules_spoc_crm_web_src_views_customer360_components_flowup_803'), trigger: 'change' },
                ]
            },
            myfilter: [],
            crm_trace_type: [],
            crmTraceTrees: [],
            editable: true,
            count: 0,
            tabs: '1',
            parentType: 'trace', //跟进动态：trace；服务动态：service
            //uid: '9a4bbb2d6e3846878572debfa8bc486c'
            myButtonPrem: [],
            single: false, // 2020-3-25,进入页面默认勾上查看所有日志
            // 789 02（待确认）【变更】客户360，默认，取消勾选，查看所有修改日志。
            tagList: [],
            // eventByState:[]
        };
    },
    computed: {
        ...mapState(["buttonPerm"]),
        canFlow(){
            return this.eventByState.indexOf('follow') < 0
        },
        imgnum(){
			return `${this.imgList.length}/9`;
		},
		filenum(){
			return `${this.fileList.length}/3`;
        },
        ids() {
            let arr = [];
            if(this.tagList && this.tagList.length) {
                this.tagList.forEach(tag => {
                    arr.push(tag.id);
                });
            }
            return arr;
        }
    },
    mounted(){
        // this.batchListData();
        this.isOpenAll = false;
        this.getCrmTraceTrees();
        waitUntil(
            () => {
                return (JSON.stringify(this.buttonPerm)!= '{}') || false;
            },
            () => {
                this.myButtonPrem = this.buttonPerm['crm.customer360'] || []
            }
        );
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        openAll(){
            this.isOpenAll = !this.isOpenAll
            if(this.isOpenAll){
                this.crmTraceTrees.forEach(item=>{
                    item.hide = false
                })
            } else {
                if(this.$route.query.flowId) {
                    this.crmTraceTrees.forEach(item => {
                        let num = 0;
                        item.crmTraces.forEach(inner => {
                            if(inner.id == this.$route.query.flowId) {
                                inner.className = 'current';
                                num = 1;
                            }
                        });
                        item.hide = num == 0;
                    });
                } else {
                    let i = 0;
                    this.crmTraceTrees.forEach(item=>{
                        item.hide = ++i > 3 ;
                    });
                }
            }
        },
        // getEventByState() {
        //     waitUntil(
        //         () => {
        //             return this.detailData && this.detailData.statusVal;
        //         },
        //         () => {
        //             crmCustomer.getEventByState({
        //                 state: this.detailData.statusVal
        //             })
        //             .then(valid.call(this))
        //             .then(res => {
        //                 if (res.ok) {
        //                     this.eventByState = res.data.data || []
        //                 }
        //             })
        //             .catch(errors.call(this))
        //             .finally(() => {

        //             });
        //         }
        //     );
        // },
        uploadOk(){
            this.showUpload = false
        },
        uploadCancel(){
            this.showUpload = false
        },
        close(){
			this.addItem.img.visible = false;
            this.addItem.file.visible = false;
        },
        onImgChange(v){
			this.imgList = v;
		},
		onFileChange(v){
			this.fileList = v;
		},
        showImgBox() {
            if(this.addItem.img.visible) {
                this.addItem.img.visible = false
            } else {
                this.kind = "image"
                this.addItem.img.visible = true;
                this.addItem.file.visible = false;
            }
		},
		showFileBox() {
            if(this.addItem.file.visible) {
                this.addItem.file.visible = false
            } else {
                this.kind = "file"
                this.showUpload = true
                this.addItem.img.visible = false;
                this.addItem.file.visible = true;
            }
        },
        poperShow() {
            this.addItem.file.visible = false
            this.addItem.img.visible = false;
        },
        doSubmit(type) {
            // 验证新增跟进记录内容
            // console.log(this.addItem)
            this.$refs.formValidate.validate((validRes) => {
                if (validRes) {
                    this.updateLoadingStatus({isLoading: true});
                    const data = {
                        cusId: this.id, //'9a4bbb2d6e3846878572debfa8bc486c',
                        type: type,
                        phase: 'saler',
                        content:{
                            content:this.addItem.text,
                            imgList:this.imgList,
                            fileList:this.fileList,
                        },
                    };
                    if(type == 'trace'){
                        data.nextTime = this.nextTime ? new Date(this.nextTime).format('yyyy-MM-dd hh:mm:ss') : ''
                    }
                    crmTrace.save(data).then(valid.call(this)).then(res=>{
                        if(res.ok){
                            this.imgList =[]
                            this.fileList =[]
                            if(this.$refs.upFileNew && this.$refs.upImgNew){
                                this.$refs.upFileNew.files = []
                                this.$refs.upImgNew.imgs = []
                            }
                            this.$refs.formValidate.resetFields()
                            if(type == 'trace'){
                                this.$emit('reCustomerSteps')
                            }
                            this.getCrmTraceTrees();
                            // this.loadData();
                        }
                    }).catch(errors.call(this)).finally(()=>{
                        if(this.$refs.upImgNew){
                            this.$refs.upImgNew.reset()
                        }
                        if(this.$refs.upFileNew){
                            this.$refs.upFileNew.reset()
                        }
                        this.updateLoadingStatus({isLoading: false});
                    });
                } else {
                    // this.$Message.error('Fail!');
                }
            })
        },
        onFilterChange() {
            // 筛选类型
            // console.log(this.myfilter)
            this.getCrmTraceTrees();
        },
        toggle(item) {
            item.hide = !item.hide;
            // console.log(item)
			if(!item.crmTraces.length){
				this.getMonthData(item.timeStamp);
			}
        },
        getMonthData(stamp){
			// const types = this.typefilter;
			// crmTrace.listData(stamp,this.uid,types).then(valid.call(this)).then(res=>{
			// 	if(res.ok){
			// 		const item = this.monthData.crmTraceTrees.find(it=>it.timeStamp==stamp);
			// 		item.crmTraces = res.data.data;
			// 	}
			// }).catch(errors.call(this));
        },
        getCrmTraceTrees(month) {
            let params = {
                cusId: this.id, //'9a4bbb2d6e3846878572debfa8bc486c',
                parentType: this.parentType
            }
            // if(this.myfilter) params.types = this.myfilter;
            params.types = this.myfilter.join(',');
            if(month) params.month = month;
            // console.log(this.single)
            params.heighTypes = this.single ? 'followRecord,updateLog' : 'followRecord';
            crmTrace.listTreeData(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    let _data = res.data.data;
                    let list = [];
                    // bug #630 【app&PC】电话纪要需求修改
                    if(this.$route.query.flowId) {
                        _data.crmTraceTrees.forEach(item => {
                            let num = 0;
                            item.crmTraces.forEach(inner => {
                                if(inner.id == this.$route.query.flowId) {
                                    inner.className = 'current';
                                    num = 1;
                                }
                            });
                            item.hide = num == 0;
                            list.push(item);
                        });
                    } else {
                        let i = 0;
                        list = _data.crmTraceTrees.map(item=>{
                            item.hide = ++i > 3 ;
                            return item;
                        });
                    }
                    // console.log(list)
                    this.crmTraceTrees = list;
                    this.count = _data.count;
                    // this.getEventByState()
                }
            })
            .catch(errors.call(this))

            crmTrace.listTypeCount(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.crm_trace_type = res.data.data
                }
            })
            .catch(errors.call(this))
        },
        batchListData() {
            let types = [
                'crm_trace_type', // 跟进类型
            ]
            sysDict.batchListData({types: types.join(',')})
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    let _data = res.data.data;
                    this.crm_trace_type = _data.crm_trace_type;
                }
            })
            .catch(errors.call(this))
        },
        onEdit(item){
			this.editItem.show = true;
			this.editItem.id=item.id;
			this.editItem.type=item.type;
			this.editItem.typeLabel=item.typeLabel;
			this.editItem.nextTime=item.nextTime;
			// console.log(item)
			this.editItem.content=clone(item.content);
			// this.$nextTick(()=>{
			// 	this.$refs.img2.init();
			// 	this.$refs.file2.init();
			// });
		},
		onPlay(url,t){
			// this.$emit('play',url,t);
        },
        changeTabs(str) {
            this.tabs = str;
            this.parentType = str == '1' ? 'trace' : 'service';
            this.getCrmTraceTrees();
        },
        userLabelTrueChoose(data) {
            // console.log(data.hasCheckedTagids)
            this.uploadTags(data.hasCheckedTagids, () => {
                this.tagList = data.hasCheckedTagObjArr;
            });
            // this.tags = data.hasCheckedTagObjArr;
        },
        uploadTags(hasCheckedTagids, callback) {
            this.updateLoadingStatus({isLoading:true});
            let params = {
                cusId: this.id,
                tagIds: hasCheckedTagids
            }
            crmCustomerDetail.saveTag(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.$emit('upload-all');
                    callback && callback();
                }
            })
            .catch(errors.call(this))
            .finally(() => {this.updateLoadingStatus({isLoading:false})});
        }
    },
    watch: {
        id: function(newVal, oldVal){
            if (this.$route.name == 'crm.customer360') {
            // console.log(newVal)
				this.getCrmTraceTrees()
				this.isOpenAll = false
				this.$refs.formValidate.resetFields()
			}
        },
        detailData: {
            handler(val, oval) {
                if(val.tagList && val.tagList.length){
                    this.tagList = [].concat(val.tagList);
                }
                // this.getEventByState()
            },
            deep: true,
            immediate: true
        }
    },
}
</script>


