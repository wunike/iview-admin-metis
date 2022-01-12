<style lang="less">
.campus-data-migration-container{
    height:100%;
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
    .ivu-table::before{
        display: none;
    }
    .cdmc-step{
        height:130px;
        margin-bottom:16px;
        background: #fff;
        padding:37px 60px 0px;
        border-radius: 6px;
        .ivu-steps-item{
            padding-left: 55px;
        }
        .ivu-steps-main {
            .step-name{
                padding-left: 60px;
            }
            .ivu-steps-content{
                padding-left:0;
            }
            .step-content{
                width:140px;
                margin-left:-55px;
                div{
                    text-align: center;
                    color:rgba(34, 38, 44, 1);
                    font-size: 12px;
                }
                .step-content-title-1{
                    font-size:14px;
                    font-family:Roboto-Regular,Roboto;
                    font-weight:400;
                    color:rgba(34, 38, 44, 1);
                    line-height:18px;
                    padding-bottom:4px;
                    padding-top:6px;
                }
            }
        }
    }
    .cdmc-box{
        height:calc(~"100% - 204px");
        width:100%;
        background: #fff;
        border-radius: 6px;
        padding-left:279px;
        padding-right:269px;
        .tables{
            max-height:calc(~"100% - 118px");
            /*background: #ff3300;*/
            overflow-y: auto;
            .green{
                position: relative;
                padding-left:12px;
                &:before{
                    display: block;
                    content: '';
                    overflow: hidden;
                    position: absolute;
                    width:6px;
                    height:6px;
                    left:0;
                    top:5px;
                    border-radius: 50%;
                    background: #46BC15;
                }
            }
            .red{
                position: relative;
                padding-left:12px;
                &:before{
                    display: block;
                    content: '';
                    overflow: hidden;
                    position: absolute;
                    width:6px;
                    height:6px;
                    border-radius: 50%;
                    background: #FF0000;
                    top:5px;
                    left:0;
                }
            }
            .gray{
                position: relative;
                padding-left:12px;
                &:before{
                    display: block;
                    content: '';
                    overflow: hidden;
                    position: absolute;
                    width:6px;
                    height:6px;
                    border-radius: 50%;
                    background: #999;
                    top:5px;
                    left:0;
                }
            }
            .canot-click{
                cursor: default;
                color: #999;
            }
        }
    }
    .cdmc-finish{
        //  height:calc(~"100% - 204px");
        width:100%;
        background: #fff;
        border-radius: 6px;
        padding-left:279px;
        padding-right:269px;
    }
    .compass-and-time{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding:32px 0 12px 0;
        .compass{
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            font-size:14px;
            font-family:HiraginoSansGB-W6,HiraginoSansGB;
            font-weight:normal;
            color:rgba(73,80,96,1);
        }
        .time{
            font-size:14px;
            font-family:HiraginoSansGB-W3,HiraginoSansGB;
            font-weight:normal;
            color:rgba(153,153,153,1);
            span{
                font-size: 14px;
            }
        }
    }
    .opetration-btns{
        background: #fff;
        box-shadow:0px -1px 3px 0px rgba(0,0,0,0.12);
        position: fixed;
        padding-left:180px;
        left: -16px;
        bottom:0px;
        width:calc(~"100% + 32px");
        height:56px;
        line-height: 56px;
        text-align: center;
        z-index:2;
        span{
            font-size: 14px;
        }
        p{
            margin-bottom:10px;
            width:100%;
            span{
                width:calc(~"50% - 10px");
                display: inline-block;
                text-align: right;
                margin-right:10px;
            }
            b{
                width:50%;
                display: inline-block;
                text-align: left;
                font-weight: normal;
            }
        }
    }
    .upload-steps-status{
        width:100%;
        // height:calc(~"100% - 76px");
        padding-top:40px;
        padding-bottom:165px;
        border-top: 1px solid #eee;
        .time-campass{
            background: #f9f9f9;
            width:100%;
            /*padding-left:200px;*/
            /*margin:30px auto 40px;*/
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding:16px 0;
            font-size: 14px;
            border-radius: 4px;
            p{
                span{
                    display: inline-block;
                    width: 100px;
                    text-align: right;
                    /*color:;*/
                }
                b{
                    display: inline-block;
                    width: 200px;
                    text-align: left;
                }
                &:nth-of-type(1){
                    margin-bottom:10px;
                }
            }
        }
        .sub-steps{
            width:280px;
            margin: 0 auto ;
            max-height:calc(~"100% - 40px");
            overflow-y: auto;
        }
        .upload-over{
            width:100%;
            text-align: center;
            padding-top:40px;
            h2{
                padding-top:24px;
                font-size:24px;
                font-family:PingFangSC-Medium,PingFang SC;
                font-weight:500;
                color:rgba(0,0,0,0.85);
            }
            p{
                margin-top: 8px;
                font-size:14px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(0,0,0,0.43);
            }
        }
    }
}
.office-selected{
    .ivu-modal-body{
        padding-bottom:4px!important;
    }
}
</style>

<template>
    <div class="campus-data-migration-container" >
        <div class="cdmc-step">
            <Steps :current="current">
                <Step v-for="(item,index) in curList" :key="index">
                    <div slot="title" class="step-name">&nbsp;</div>
                    <div slot="content" class="step-content">
                        <div class="step-content-title-1">{{item.title}}</div>
                    </div>
                </Step>
            </Steps>
        </div>
        <div v-if="current != '4'" class="cdmc-box">
                <div class="compass-and-time" >
                    <div class="compass">
                        <label>{{$t('modules_spoc_report_web_src_views_campusdatamigration_index_4504')}}</label>
                        <div  class="">
                            <span v-if="currCompass">{{currCompass}}</span>
                            <Dropdown :transfer="true" trigger="click" @on-click="selectCompass">
                                <Icon  type="md-repeat" size="18" style="display:none;margin-left:6px;color:#CCCCCC;margin-top:-4px;cursor: pointer;" />
                                <DropdownMenu slot="list" >
                                    <DropdownItem
                                            v-for="(item,index) in currCompassList"
                                            :name="item.id"
                                            :selected="currCompass == item.name? true : false"
                                            :key="index">{{item.name}}</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                    <div class="time">
<!--                        <label>{{$t('modules_spoc_report_web_src_views_campusdatamigration_index_4505')}}</label>-->
<!--                        <span class="">{{lastTime}}</span>-->
                        <Button :disabled="forbidClean" @click="cleanAndInitCurrent" style="margin-left:12px;" type="primary">{{$t('modules_spoc_report_web_src_views_campusdatamigration_index_4506')}}</Button>
                    </div>
                </div>
                <div v-if="current != '4'" class="tables">
                    <Table  stripe   :columns="columns1" :data="data"></Table>
                </div>
                <p v-if="current != '4'" style="color:#D4D5DA;font-size:14px;margin-top:12px;"><Icon size="14" color="#D4D5DA" style="margin-right: 3px;margin-bottom:2px;" type="md-information-circle" />{{$t('modules_spoc_report_web_src_views_campusdatamigration_index_4507')}}</p>

        </div>
        <div v-if="current == '4'" class="cdmc-finish">
             <div  class="compass-and-time" >
                    <div class="compass">
                        <label>{{$t('modules_spoc_report_web_src_views_campusdatamigration_index_4504')}}</label>
                        <div  class="">
                            <span v-if="currCompass">{{currCompass}}</span>
                            <Dropdown :transfer="true" trigger="click" @on-click="selectCompass">
                                <Icon  type="md-repeat" size="18" style="display:none;margin-left:6px;color:#CCCCCC;margin-top:-4px;cursor: pointer;" />
                                <DropdownMenu slot="list" >
                                    <DropdownItem
                                            v-for="(item,index) in currCompassList"
                                            :name="item.id"
                                            :selected="currCompass == item.name? true : false"
                                            :key="index">{{item.name}}</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                    <div class="time">
<!--                        <label>{{$t('modules_spoc_report_web_src_views_campusdatamigration_index_4505')}}</label>-->
<!--                        <span class="">{{lastTime}}</span>-->
                        <Button :disabled="forbidClean" @click="cleanAndInitCurrent" style="margin-left:12px;" type="primary">{{$t('modules_spoc_report_web_src_views_campusdatamigration_index_4506')}}</Button>
                    </div>
                </div>
                <div  class="upload-steps-status">
                    <div  class="sub-steps">
                        <Steps  size="small" :current="cur2" direction="vertical">
                            <Step v-for="item  in cur2List" :key="item.task" :title="item.taskName" >
                                <div slot="content">
                                    <Progress stroke-width="5" stroke-color="#44bcb7" :status="item.result == 1 ? 'active':item.result == 3? 'wrong':''" :percent="item.percent">
                                        <span style="color:#44bcb7;" v-if="item.result == 2">{{$t('modules_spoc_crm_web_src_views_taskcenter_taskcenter_1749')}}</span>
                                        <span style="color:#999999;"  v-if="item.result == 0">{{$t('modules_spoc_crm_web_src_views_onsitemanagement_onsitemanagement_1445')}}</span>
                                        <span style="color:#495060;" v-if="item.result == 1">{{$t('modules_spoc_report_web_src_views_campusdatamigration_index_4510')}}</span>
                                        <span style="color:#FF0000;" v-if="item.result == 3">{{$t('modules_spoc_portal_modules_cosupload_3272')}}</span>
                                    </Progress>
                                </div>
                            </Step>
                        </Steps>
                    </div>
                    <div v-if="0" class="upload-over">
                        <Icon  size="70" color="#52C41A" type="ios-checkmark-circle" />
                        <h2>{{$t('scoretemplate_compontents_scoremodify_545')}}</h2>
                        <p>{{$t('modules_spoc_report_web_src_views_campusdatamigration_index_4513', [currCompass])}}</p>
                    </div>
                </div>
        </div>
        <div class="opetration-btns">
            <Button  style="margin-right: 10px;" @click="toPrevStep" v-if="current > 0 && current < 4">{{$t('teachpush_teachpush_656')}}</Button>
            <!--           :disabled="disabledNext()"-->
            <Button :disabled="disabledNext()" style="margin-right: 10px;" type="primary"  @click="toNextStep" v-if=" current != '4'">{{$t('teachpush_teachpush_658')}}</Button>
            <Button  :disabled="isFinished|| startUploadFiles"  style="margin-right: 10px;" type="primary"  @click="startUpload" v-if="current == '4'">{{$t('modules_spoc_report_web_src_views_campusdatamigration_index_4516')}}</Button>
            <Button
                    :disabled="!isFinished"
                    v-if="current == '4'"
                    type="primary"
                    style="margin-right: 10px;"
                    @click="testCourseConflict">{{$t('modules_spoc_report_web_src_views_campusdatamigration_index_4517')}}</Button>
            <Button
                    :disabled="!isFinished"
                    v-if="current == '4'"
                    type="primary"
                    style="margin-right: 10px;"
                    @click="goNext">{{$t('modules_spoc_report_web_src_views_campusdatamigration_index_4518')}}</Button>
<!--            <Button-->
<!--                    :disabled="!isFinished||!showInToSys || !noConflict"-->
<!--                    v-if="current == '4'"-->
<!--                    type="primary"-->
<!--                    @click="inToSys">{{$t('modules_spoc_crm_web_src_views_onsitemanagement_onsitemanagement_1444')}}</Button>-->
        </div>
        <Modal
                v-model="setOfficeBool"
                :title="$t('modules_spoc_crm_web_src_views_clientareaaround_clientareaaround_781')"
                class-name="office-selected"
                width="600"
                @on-ok="setOffice"
                :mask-closable="false"
                @on-cancel="cancelSetOffice">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  :label-width="100">
                <FormItem :label="$t('modules_spoc_core_web_src_views_announcement_addannouncement_60')" prop="officeId">
                    <Select
                            :filterable="true"
                            remote
                            @on-query-change="changeOffice"
                            :remote-method="remoteMethod1"
                            :placeholder="$t('modules_spoc_report_web_src_views_campusdatamigration_index_4522')"
                            @on-change="changeOfficeVal"
                            v-model="formValidate.officeId">
                        <Option v-for="item in options1" :value="item.id" :key="item.value" :label="item.name">{{ item.name }}</Option>
                    </Select>
                </FormItem>
<!--                <p v-if="formValidate.officeId" style="margin-bottom:16px;margin-left:18px;color:#fa795e;">{{$t('modules_spoc_report_web_src_views_campusdatamigration_index_4523', [tipsVal])}}</p>-->
            </Form>
            <div slot="close"></div>
            <div slot="footer">
                <Button @click="cancelSetOffice">{{$t('classroom_allscore_53')}}</Button>
                <Button type="primary"  @click="setOffice">{{$t('classroom_clock_85')}}</Button>
            </div>
        </Modal>
        <importModal ref="importModal" @successFn="successFn"></importModal>
    </div>
</template>

<script>
    import valid, {
        errors,
        sysUser,
        rptDataMigarate
    } from "../../libs/request";
    import {jwLesson} from '../../../../spoc-jw-web/src/libs/request'
    import { mapState,mapMutations } from "vuex";
    import importModal from "./importModal";
    export default {
        name:'report.campusDataMigration',
        components: {
            importModal
        },
        data() {
            return {
                curList:[
                    {
                        title:this.$t('modules_spoc_report_web_src_views_campusdatamigration_index_4526'),
                        progress:100,
                    },
                    {
                        title:this.$t('modules_spoc_report_web_src_views_campusdatamigration_index_4527'),
                        progress:20,
                    },
                    {
                        title:this.$t('modules_spoc_report_web_src_views_campusdatamigration_index_4528'),
                        progress:0,
                    },
                    {
                        title:this.$t('modules_spoc_report_web_src_views_campusdatamigration_index_4529'),
                        progress:0,
                    },
                    {
                        title:this.$t('modules_spoc_report_web_src_views_campusdatamigration_index_4530'),
                        progress:0,
                    },
                ],
                setOfficeBool:false,
                ifToSetOffice:true,
                formValidate: {
                    officeId: '',
                },
                ruleValidate: {
                    officeId: [
                        { required: true, message: this.$t('pushsettings_index_507'), trigger: 'change' }
                    ],
                },
                currCompass:'',
                currCompassList:[],
                current:0,
                lastTime:'',
                columns1: [
                    {
                        title:  this.$t('modules_spoc_report_web_src_views_campusdatamigration_index_4532'),
                        key: 'taskName'
                    },
                    {
                        title: this.$t('pushsettings_index_496'),
                        key: 'status',
                        // maxWidth:200,
                        render: (h, params) => {
                            return h('div', [
                                h(
                                    'span',

                                    {
                                        class:'green',
                                        style: {
                                            display:params.row.status == '1'?'inline-block':'none',
                                            marginRight: '16px'
                                        },
                                        on: {
                                            click: () => {

                                            }
                                        }
                                    },
                                    this.$t('memberlist_18')
                                ),
                                h(
                                    'span',
                                    {
                                        class:'red',
                                        style: {
                                            // color:'#ed4014',
                                            display:params.row.status == '0'?'inline-block':'none',
                                            marginRight: '16px'
                                        },
                                        on: {
                                            click: () => {

                                            }
                                        }
                                    },
                                    this.$t('memberlist_19')
                                ),
                                h(
                                    'span',
                                    {
                                        class:'gray',
                                        style: {
                                            // color:'#ed4014',
                                            display:params.row.status == '2'?'inline-block':'none',
                                            marginRight: '16px'
                                        },
                                        on: {
                                            click: () => {

                                            }
                                        }
                                    },
                                    this.$t('modules_spoc_portal_views_workbenchnew_plugin_renewablelist_4395')
                                ),
                            ]);
                        }
                    },
                    {
                        title: this.$t('classlist_compontents_detailinfo_45'),
                        key: 'doAction',
                        width:220,
                        render: (h, params) => {
                            return h('div', [
                                h(
                                    'a',
                                    {
                                        class:params.row.status === '0'? '' : 'canot-click',
                                        style: {
                                            marginRight: '16px'
                                        },
                                        on: {
                                            click: () => {
                                                if(params.row.status === '0'){
                                                    this.downloadFn(params.row.rest)
                                                }
                                            }
                                        }
                                    },
                                   this.$t('modules_spoc_report_web_src_views_campusdatamigration_index_4538')
                                ),
                                h(
                                    'a',
                                    {
                                        class:params.row.status === '0'? '' : 'canot-click',
                                        style: {
                                            marginRight: '16px'
                                        },
                                        on: {
                                            click: () => {
                                                if(params.row.status === '0') {
                                                    this.$refs.importModal.show({
                                                        taskName:params.row.taskName,
                                                        data: params.row.rest,
                                                        id: params.row.id,
                                                        officeId:this.formValidate.officeId,
                                                        title:this.current == 0
                                                            ? this.$t('modules_spoc_report_web_src_views_campusdatamigration_index_4526'):this.current == 1
                                                                ?this.$t('modules_spoc_report_web_src_views_campusdatamigration_index_4527'):this.current == 2
                                                                    ?this.$t('modules_spoc_report_web_src_views_campusdatamigration_index_4528'):this.current == 3
                                                                        ?this.$t('modules_spoc_report_web_src_views_campusdatamigration_index_4529'):''
                                                    })
                                                }
                                            }
                                        }
                                    },
                                    this.$t('modules_spoc_core_web_src_views_announcement_addannouncement_63')
                                ),
                                h(
                                    'a',
                                    {
                                        class:params.row.status === '0'? '' : 'canot-click',
                                        style: {
                                            marginRight: '16px'
                                        },
                                        on: {
                                            click: () => {
                                                if(params.row.status === '0'){
                                                    this.ignore(params.row.id)
                                                }
                                            }
                                        }
                                    },
                                    this.$t('modules_spoc_portal_views_workbenchnew_plugin_renewablelist_4405')
                                ),
                            ]);
                        }
                    }
                ],
                data:[],
                comfirmUpload:false,
                cur2:0,
                cur2List:[],
                isFinished:false,//上传结束
                showInToSys:false,//关闭
                toNextCompass:false,//继续下一轮
                startUploadFiles:false,
                forbidClean:false,
                loading1:false,
                options1:[],
                officeId:'',//当前校区
                // tipsVal:'',
            }
        },
        computed: {
            ...mapState(['userInfo','app']),
        },
        mounted() {
            this.initMigirate()
            // this.setData(0)
            // this.disabledNext()
        },

        methods: {
            ...mapMutations(["updateLoadingStatus"]),
            //初始化获取校区 test 测试当前校区是否已经没有了
            initMigirate(test) {
                rptDataMigarate.initMigirate().then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        if(res.data.data == '-1'){
                            if(test){
                                this.showInToSys = true
                                this.toNextCompass = false
                            }else{
                                this.setOfficeBool = true
                            }
                        }else{
                            if(test){//next
                                this.showInToSys = false
                                this.toNextCompass = true
                            }else{
                                this.officeId = res.data.data
                                this.current = 0;
                                // this.getLastMigarateDate(this.officeId)
                                this.listPage(this.officeId)
                            }
                        }
                        this.getSchool()
                    }
                })
                .catch(errors.call(this))
            },
            cleanAndInitCurrent() {
                let config = {
                    title: this.$t('modules_spoc_report_web_src_views_campusdatamigration_index_4541'),
                    width:400,
                    content: this.$t('modules_spoc_report_web_src_views_campusdatamigration_index_4542'),
                    onOk: () => {
                        this.cleanImportData()
                    },
                }
                this.$Modal.confirm(config)
            },
            //清除本轮临时数据
            cleanImportData() {
                rptDataMigarate.cleanImportData({officeId:this.officeId}).then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.current = 0;
                        this.setOfficeBool = true
                        this.data = []
                        this.formValidate.officeId = ''
                        this.$refs['formValidate'].resetFields();
                        this.options1 = [...this.currCompassList];
                        this.isFinished = false
                        this.toNextCompass = false
                        this.forbidClean = false
                        this.cur2List=[]
                        this.cur2 = 0
                        // console.log(this.officeId)
                        // this.listPage(this.officeId)
                    }
                })
                .catch(errors.call(this))
            },
            remoteMethod1 (query) {
                if (query !== '') {
                    this.loading1 = true;
                    let st = setTimeout(() => {
                        this.loading1 = false;
                        const list = this.currCompassList.map(item => {
                            return item;
                        });
                        this.options1 = list.filter(item => item.name.toLowerCase().indexOf(query.toLowerCase()) > -1);
                        clearTimeout(st)
                    }, 200);
                } else {
                    this.options1 = [...this.currCompassList];
                }
            },
            changeOffice(val) {
                // console.log(val)
                if(val == ''){
                    this.options1 = [...this.currCompassList];
                    this.formValidate.officeId = ''
                }
            },
            changeOfficeVal() {
                // if(this.formValidate.officeId){
                //     this.initPage(this.formValidate.officeId)
                // }
            },
            getLastMigarateDate(officeId) {
                rptDataMigarate.getLastMigarateDate({officeId:officeId}).then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.lastTime = res.data.data?res.data.data :'-'
                    }
                })
                .catch(errors.call(this))
            },
            initPage(officeId){
                // this.getSchool()
                // console.log(officeId)
                this.current = 0;
                rptDataMigarate.initTask({officeId:officeId}).then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        // console.log(res.data.data)
                        let data = res.data.data
                        // this.selectCompass(this.officeId,true)
                        // this.getLastMigarateDate(officeId)
                        // this.setOfficeBool = false
                        this.listPage(officeId)
                    }
                })
                .catch(errors.call(this))
            },
            cleanAndInit(officeId){
                // console.log(officeId)
                this.current = 0;
                rptDataMigarate.cleanAndInit({officeId:officeId}).then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        // console.log(res.data.data)
                        let data = res.data.data
                        // this.selectCompass(this.officeId,true)
                        // this.getLastMigarateDate(officeId)
                        // this.setOfficeBool = false
                        this.listPage(officeId)
                    }
                })
                .catch(errors.call(this))
            },
            listPage(officeId){
                // console.log(officeId)
                this.updateLoadingStatus({ isLoading: true });
                rptDataMigarate.listPage({
                    officeId:officeId,
                    step:parseInt(this.current)+1,
                    orderByType:'sn',
                    orderByStatus:'1'
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.data = res.data.data.list
                        // console.log(res.data)
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // this.initPage(this.formValidate.officeId)
                        let one = this.currCompassList.filter(item => {
                            return item.id == this.formValidate.officeId
                        })
                        this.currCompass = one[0].name
                        this.formValidate.officeId = one[0].id
                        this.officeId = one[0].id
                        this.initPage(this.officeId)
                        // this.getLastMigarateDate(this.formValidate.officeId)
                        this.setOfficeBool = false
                        // this.listPage(this.formValidate.officeId)
                    } else {
                        // this.$Message.error('Fail!');
                    }
                })
            },
            setOffice() {
                this.handleSubmit('formValidate')
            },
            cancelSetOffice() {
                this.setOfficeBool = false
                history.go(-1)
            },
            downloadFn(path) {
                // console.log(path)
                let $eleForm = document.createElement('form')
                $eleForm.methods = 'post'
                $eleForm.action = path+'/import/template'
                // console.log( $eleForm.action)
                // return false;
                document.body.appendChild($eleForm)
                $eleForm.submit()
                $eleForm.remove()
            },
            disabledNext(){
                const disable = (currentValue) => currentValue.status == 0;
                // console.log(this.data.some(disable))
                return this.data.some(disable)
            },
            selectCompass(val) {
                if(val){
                    let one = this.currCompassList.filter(item => {
                        return item.id == val
                    })
                    this.currCompass = one[0].name
                    this.formValidate.officeId = one[0].id
                    this.officeId= one[0].id
                }
            },
            getSchool() {
                sysUser.dataScopeFilter({ types:3 })
                .then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.currCompassList = res.data.data
                        this.options1 = [...this.currCompassList]
                        this.selectCompass(this.officeId)
                    }
                })
                .catch(errors.call(this))
            },
            //更新状态
            ignore(id) {
                rptDataMigarate.updateStatus({id:id,status:'2'}).then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let offId = this.formValidate.officeId ? this.formValidate.officeId : this.officeId
                        this.listPage(offId)
                        // console.log(res.data)
                    }
                })
                .catch(errors.call(this))
            },
            successFn() {
                let offId = this.formValidate.officeId ? this.formValidate.officeId : this.officeId
                this.listPage(offId)
            },
            toNextStep() {
                this.current++
                if(this.current >= 4){
                    this.current = 4
                    this.progress(true)
                }else{
                    let offId = this.formValidate.officeId ? this.formValidate.officeId : this.officeId
                    this.listPage(offId)
                }
            },
            toPrevStep() {
                this.current--
                if(this.current < 0){
                    this.current = 0
                }
                let offId = this.formValidate.officeId ? this.formValidate.officeId : this.officeId
                this.listPage(offId)
            },
            startUpload() {
                let config = {
                    title: this.$t('modules_spoc_report_web_src_views_campusdatamigration_index_4543'),
                    width:400,
                    content: this.$t('modules_spoc_report_web_src_views_campusdatamigration_index_4544'),
                    onOk: () => {
                        this.current = 4
                        this.comfirmUpload = false
                        this.startUploadFiles = true
                        this.forbidClean = true
                        this.migarate()
                        this.progress()
                    },
                    onCancel: () => {
                        this.comfirmUpload = true
                        this.forbidClean = false

                    }
                }
                this.$Modal.confirm(config)
            },
            migarate() {
                rptDataMigarate.migarate({officeId:this.officeId})
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        console.log('ok')
                        // this.progress()
                    }
                })
                .catch(errors.call(this))
            },
            inToSys() {

            },
            goNext() {
                this.setOfficeBool = true
                this.comfirmUpload = false
                this.startUploadFiles = true
                this.forbidClean = false
            },
            testCourseConflict() {
                jwLesson.checkConflictByOfficeId({officeId:this.officeId}).then(valid.call(this))
                .then(res => {
                    // console.log(res)
                    if (res.ok) {
                        this.toNextCompass = true
                        // console.log(res.data)
                    }
                })
                .catch(errors.call(this))
            },
            progress(lock) {
                rptDataMigarate.progress({officeId:this.officeId}).then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.cur2List = res.data.data
                        const ff = (currentValue) => currentValue.result < 2;
                        const result = this.cur2List.filter(word => word.result > 0);
                        // this.cur2 = result.length
                        // let len = 0;
                        if(!result.length){
                            this.cur2 = 0;
                        }else {
                            this.cur2 = result.length -1
                        }
                        // console.log(result.length)
                        // console.log(ff)
                        let isOK = this.cur2List.some(ff)
                        // console.log(isOK)
                        if(!lock){
                            if(isOK){
                                let st = setTimeout(()=>{
                                    this.progress()
                                    clearTimeout(st)
                                },1000)
                            }else{
                                let config = {
                                    title:this.$t('modules_spoc_report_web_src_views_campusdatamigration_index_4545'),
                                    content:this.$t('modules_spoc_report_web_src_views_campusdatamigration_index_4546', [this.currCompass])
                                }
                                this.$Modal.success(config)
                                // this.$Message.success('上传成功!');
                                this.isFinished = true
                                // this.initMigirate(true)
                            }
                        }else{
                            if(isOK){
                                // let st = setTimeout(()=>{
                                //     this.progress()
                                //     clearTimeout(st)
                                // },1000)
                            }else{
                                let config = {
                                    title:this.$t('modules_spoc_report_web_src_views_campusdatamigration_index_4545'),
                                    content:this.$t('modules_spoc_report_web_src_views_campusdatamigration_index_4546', [this.currCompass])
                                }
                                this.$Modal.success(config)
                                this.isFinished = true
                                // this.initMigirate(true)
                            }
                        }

                    }
                })
                .catch(errors.call(this))
            },

            // nextCampass() {
            //     this.initMigirate()
            // },
        },
    }
</script>
