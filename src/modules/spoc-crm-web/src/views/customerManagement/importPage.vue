<style lang="less">
    .import-page-container {
        font-size: 14px;
        margin: 16px 16px 25px;
        ul,
        li {
            list-style: none;
        }
        .clear() {
            zoom: 1;
            &::before,
            &::after {
                content: '';
                display: block;
                clear: both;
                height: 0;
                line-height: 0;
                font-size: 0;
            }
        }
        .import-page-card {
            margin-bottom: 8px;
            padding: 12px 32px 32px;
            background: #fff;
        }
        .download-template {
            @h: 60px;
            height: @h;
            line-height: @h;
        }
        .count {
            @h: 32px;
            padding-left: 32px;
            height: @h;
            line-height: @h;
            margin-bottom: 8px;
            color: #495060;
        }
        .num {
            font-size: 18px;
        }
        .table-top {
            padding: 8px 0;
            .clear();
        }
        .table-count {
            line-height: 32px;
            float: left;
        }
        .table-btns {
            float: right;
        }
        .ivu-table-cell {
            @p: 8px;
            padding-left: @p;
            padding-right: @p;
        }
        .error-tips {
            line-height: 22px;
            margin-bottom: 12px;
        }
        #errorCord {
            .ivu-table-cell {
                @p: 45px;
                padding-left: @p;
            }
        }
        .page-div {
            padding-top: 12px;
            text-align: center;
        }
    }
</style>

<template>
    <div class="import-page-container">
        <div class="import-page-card">
            <div class="download-template">
                {{$t('importPage_clickHere1')}} <a @click="downloadTemplate">{{$t('importPage_clickHere2')}}</a> {{$t('importPage_clickHere3')}}
            </div>
            <Upload
                ref="upload"
                :headers="headers"
                :before-upload="handleUpload"
                :default-file-list="uploadL"
                type="drag"
                :data='{"activityId":$route.query.activityId}'
                :on-success="doupload"
                :format="['xls','xlsx']"
                :on-format-error="handleFormatError"
                :max-size="1024 * 100 * 1024"
                :action="action">
                <div style="padding: 20px 0">
                    <Icon type="ios-filing-outline" size="52" style="color: #3399ff"></Icon>
                    <h3>{{$t('courselist_compontents_servicecontent_210')}}</h3>
                    <!-- <p>{{$t('modules_spoc_crm_web_src_views_customermanagement_importpage_1249')}}</p> -->
                    <p>{{$t('importPage_support')}}</p>
                </div>
            </Upload>
        </div>
          <div style="padding-left: 32px;" v-if="uploadDateOver">{{$t('importPage_result1before')}}<span style="color:#333333" class="num"> {{this.retData.totalNum}} </span>{{$t('modules_spoc_crm_web_src_views_customermanagement_importpage_1251')}}<span style="color:#19BE6B" class="num"> {{this.retData.successNum}} </span>{{$t('modules_spoc_crm_web_src_views_customermanagement_importpage_1252')}}<span style="color:rgb(231, 43, 0)" class="num"> {{this.retData.totalNum-this.retData.successNum}} </span>{{$t('importPage_result4after1')}}</div>
       
        <!-- <div class="import-page-card" id="errorCord" v-if="retData.failureNum"> -->
        <div class="import-page-card" id="errorCord" v-if="uploadDateOver>0">
            <div class="table-top">
                <div style="color:#999;margin-bottom:20px;"><span style="margin-right:5px;color:#999">|</span>{{$t('modules_spoc_crm_web_src_views_customermanagement_importpage_1254')}}</div>
        <div v-if="this.retData.excelRptNum>0" style="margin-bottom:20px;">{{$t('modules_spoc_crm_web_src_views_customermanagement_importpage_1255')}}<span style="color:rgb(231, 43, 0)" class="num"> {{this.retData.excelRptNum}} </span>{{$t('modules_spoc_crm_web_src_views_customermanagement_importpage_1256')}}<Button type="primary" style="margin-left: 10px;" v-if="this.retData.overwrite>0||this.retData.excelRptNum>0" @click="overwriteFn">{{$t('modules_spoc_crm_web_src_views_customermanagement_importpage_1257')}}</Button> </div>
                <div class="error-tips">
                    <p>
                        {{$t('importPage_notice1')}}<!-- 1.本页只显示前100条错误信息，需点击“下载完整错误报告”按钮，下载全部错误数据； -->
                    </p>
                    <p>
                        {{$t('importPage_notice2')}}<!-- 2.本次所有错误数据将在再次上传导入文件或者页面刷新时清空，请及时查看下载。 -->
                    </p>
                </div>
                <div class="table-count">
                    <!-- 错误数据 -->{{$t('importPage_result5before')}}
                    <span class="num" style="color: #E72B00;">{{
                        retData.failureNum
                    }}</span>
                    <!-- 条 -->{{$t('importPage_result4after1')}}
                </div>
                <Button
                    class="table-btns"
                    type="primary"
                    @click.native.stop="downReport"
                    ><!-- 下载完整错误报告 -->{{$t('importPage_downloadReport')}}</Button
                >
            </div>
            <Table ref="selection" :columns="columnsError" :data="retData.allReportList"></Table>
            <div class="page-div">
                <Page
                    :current="pageNo"
                    :total="count"
                    show-elevator
                    :page-size="pageSize"
                    @on-change="pageChange">
                </Page>
            </div>
        </div>
        <Modal
            v-model="showJxStudentImportResult"
            :title="$t('importPage_tableError2')"
            :mask-closable="false"
            @on-ok="ok"
            @on-cancel="cancel">
            <p v-for="(item, index) in showJxStudentImportResultList" :key="index">{{item}}</p>
        </Modal>
    </div>
</template>
<script>
    /**
    * 导入
    * @param templateLists  对象, 必填
    * 实例：
    *  {
    *      curr: sys.userdImport,// 导入数据EXCEL  string 格式的路径
           reportUrl: sys.userdDownReport, // 下载导入错误报告EXCEL  string 格式的路径
           download: sys.userDownReportTemplate, // 下载EXCEL导入模板  string 格式的路径
           overwriteUrl: sys.userdCover, // 覆盖用户信息  请求对象
           unCoverUrl: sys.userdUnCover, // 不覆盖用户信息  请求对象
           goBack: 'core.staff', // 返回 route 的 name
    *  }
    * @author Vickt Cao
    */
    import valid, { errors, sys } from '@public/libs/request.js'
    import util from "@public/libs/js/util";
    import { mapMutations, mapGetters } from 'vuex'

    export default {
        props: {
            templateLists: {
                // 页面需要的路径对象
                type: Object,
                default: () => {
                    return {}
                }
            },
            officeId:{
                // 所属校区
                type: String,
                default: ''
            },
            isAdd: {
                type: Boolean,
                default: false
            },
            prevPage: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                headers:{},
                overwriteNum:0,
                showJxStudentImportResult: false, //家校导入后覆盖弹框
                showJxStudentImportResultList: [],//家校导入后覆盖弹框数据
                uploadL:[],
                file: {},
                retData: {
                    totalNum: 0, // 导入总条数
                    successNum: 0, // 成功条数
                    overwrite: 0, // 待覆盖条数
                    failureNum: 0, // 失败条数
                    repeatList: [], // 待确认覆盖数据（数组中包含待覆盖对象object）
                    allReportList: [] // 失败错误报告
                },
                columnsConflict: [
                    // 冲突数据 columns
                    {
                        type: 'selection',
                        width: 40,
                        align: 'center'
                    },
                    {
                        title: this.$t('importPage_table1'),//'序号',
                        width: 130,
                        type: 'index'
                    },
                    {
                        title: this.$t('importPage_table2'),//'重复行号',
                        width: 250,
                        key: 'lineNO'
                    },
                    {
                        title: this.$t('importPage_table3'),//'重复内容',
                        key: 'errorTitle',
                        tooltip: true
                    }
                ],
                columnsError: [
                    // 错误数据 columns
                    {
                        title: this.$t('importPage_table1'),//'序号',
                        width: 140,
                        type: 'index'
                    },
                    {
                        title: this.$t('importPage_tableError1'),//'错误行号',
                        width: 250,
                        key: 'lineNO'
                    },
                    {
                        title: this.$t('importPage_tableError2'),//'错误说明',
                        width: 280,
                        key: 'errorInfo',
                        tooltip: true
                    },
                    {
                        title: this.$t('importPage_tableError3'),//'异常数据',
                        key: 'errorTitle',
                        tooltip: true
                    }
                ],
                pageNo: 1, //当前页码 - 错误数据
                pageCount: 1, //页码总数 - 错误数据
                pageSize: 10, //每页条数 - 错误数据
                count: 0, //数据总数 - 错误数据

                pageNoCover: 1, //当前页码 - 错误数据
                pageCountCover: 1, //页码总数 - 错误数据
                pageSizeCover: 10, //每页条数 - 错误数据
                countCover: 0, //数据总数 - 错误数据

                uploadDateOver: false, // 是否上传完成
                selectionOverwriteLists: [], // 已勾选待确定数据

                keyAll: '',
                keyRepeat: '',
                action: ''
            }
        },
        mounted() {
            if (this.templateLists.curr && this.templateLists.curr()) {
                this.action = this.templateLists.curr()
            }
            // console.log(this.templateLists.curr())
            this.headers = {
                token: localStorage.getItem('token'),
                tenant: localStorage.getItem('tenant')	
            }
        },
        methods: {
            ...mapMutations(['updateLoadingStatus']),
            overwriteFn(){
                // this.templateLists.downloadExcelRptInfo()
                let $eleForm = document.createElement('form')
                $eleForm.methods = 'get'
                $eleForm.action = this.templateLists.downloadExcelRptInfo()
                document.body.appendChild($eleForm)
                //提交表单，实现下载
                $eleForm.submit()

                
            },
             handleFormatError(file) {
                this.$Notice.warning({
                    title: this.$t('importPage_formatIncorrect'), // "格式不正确",
                    desc: this.$t('importPage_formatIncorrect1') + file.name + this.$t('importPage_formatIncorrect2')
                    // desc: "文件格式为 " + file.name + "不正确, 请选择.xls .xlsx格式"
                });
            },
            getOfficeId(val){
               this.action=this.templateLists.curr('?officeId='+val)
            },
            // 
            handleUpload(){
                //  在成功的时候先删除之前的上传列表
                if(this.$refs.upload.fileList.length>=1){
                    this.$refs.upload.fileList.shift();
                }
            },
            doupload(response) {
                //清空之前的错误数据提示start
                this.retData.allReportList=[];
                this.uploadDateOver = false
                //end
                let data = response.data;
                if(!data){
                   // 无数据的时候 提示错误 停止下面的操作
                    this.$Message.error(response.message);
                    return
                }
                if(data==400){
                   // 无数据的时候 提示错误 停止下面的操作
                    this.$Message.error(response.message);
                    return
                }
                if (data.overwrite + data.failureNum+data.excelRptNum == 0) {
                    // 导入成功，弹窗提示
                    this.onEnd(data)
                } else {
                    // 有异常数据
                    if(response.data.successNum==0&&response.data.failureNum){
                       this.$Message.error(response.message);
                    }
                    else if(response.data.successNum>0&&response.data.failureNum>0){
                       this.$Message.warning(response.message);
                    }
                    else if(response.data.successNum>0&&response.data.failureNum==0){
                       this.$Message.success(response.message);
                    }else{
                        this.$Message.error(response.message);
                    }
                    this.uploadDateOver = true
                    this.retData.totalNum = data.totalNum;
                    this.retData.overwrite = data.overwrite;
                    this.retData.excelRptNum = data.excelRptNum;
                    this.retData.successNum = data.successNum;
                    this.retData.failureNum = data.failureNum;
                    this.retData.allReportList = data.allReportList && data.allReportList.length ? data.allReportList : [];
                    this.retData.repeatList = data.repeatList && data.repeatList.length ? data.repeatList : [];
                    this.pageNo = 1
                    this.pageNoCover = 1
                    this.keyAll = data.keyAll
                    this.keyRepeat = data.keyRepeat
                    if (data.overwrite) {
                        //待确认数据
                        this.listPageImportReports(1)
                    }
                    if (data.failureNum) {
                        //错误数据
                        this.listPageImportReports(2)
                    }
                }
            },
            selectOverwriteData(list) {
                // 选择待确定数据
                this.selectionOverwriteLists = list
            },
            coverData(str) {
                // 覆盖 or 不覆盖
                if (this.selectionOverwriteLists.length === 0) {
                    this.$Message.error(this.$t('importPage_warning1'))
                    // this.$Message.error('请选择数据')
                    return
                }
                // let data;
                // if(this.prevPage && this.prevPage == 'jxStudentImport') {
                //     // 学员导入
                //     data = {
                        
                //     }
                // }
                let data = [...this.selectionOverwriteLists];
                let obj;
                if (str == 'cover' || str == 'isAdd') obj = this.templateLists.overwriteUrl;
                // 覆盖
                else obj = this.templateLists.unCoverUrl; // 不覆盖
                let __isAdd__ = str == 'isAdd' ? 1 : 0; //是否新增
                // this.updateLoadingStatus({isLoading:true});
                obj(data, __isAdd__).then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let n = data.length
                        this.retData.overwrite -= n
                        // let lineNoArr = [];
                        // data.forEach(e => {
                        //     lineNoArr.push(e.lineNO);
                        // });
                        // this.retData.allReportList.forEach((e, index) => {
                        //     if(lineNoArr.indexOf(e.lineNO) > -1) {
                        //         this.retData.allReportList.splice(index, 1);
                        //     }
                        // });
                        this.selectionOverwriteLists = []
                        if (str == 'cover' || str == 'isAdd') {
                            if(this.$route.name =='hootie.jxStudentImport'){
                                console.log(res.data.data)
                                if(res.data.data.length){
                                    this.showJxStudentImportResult = true
                                    this.showJxStudentImportResultList = res.data.data
                                    this.retData.successNum = n - res.data.data.length
                                    this.retData.failureNum = res.data.data.length
                                } else {
                                    this.retData.successNum = n
                                    this.retData.failureNum = 0
                                    this.$Message.success(this.$t('modules_spoc_crm_web_src_views_customermanagement_importpage_1258'))
                                }
                            } else {
                                this.retData.successNum += n
                            }
                        } else {
                            this.retData.failureNum += n
                            this.listPageImportReports(2)
                        }
                        if (this.retData.overwrite > 0) {
                            this.listPageImportReports(1)
                        } 
                        // else this.onEnd(this.retData)
                    }
                })
                .catch(errors.call(this))
                // .finally(() => this.updateLoadingStatus({isLoading:false}));
            },
            downloadTemplate() {
                this.updateLoadingStatus({isLoading:true});
                this.templateLists.download().then(valid.call(this))
                .then(res => {
                    if (res.data) {
                        util.blobDownload(res)
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({isLoading:false});
                });
            },
            downReport() {
                // 下载报告
                // console.log(this.templateLists.reportUrl());
                // window.open(this.templateLists.reportUrl());
                // let $eleForm = document.createElement('form')
                // $eleForm.methods = 'get'
                // $eleForm.action = this.templateLists.reportUrl()
                // document.body.appendChild($eleForm)
                // //提交表单，实现下载
                // $eleForm.submit()
                this.updateLoadingStatus({isLoading:true});
                this.templateLists.reportUrl().then(valid.call(this))
                .then(res => {
                    if (res.data) {
                        util.blobDownload(res)
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({isLoading:false});
                });
            },
            onEnd(data) {
                let totalNum = data.totalNum || 0
                let successNum = data.successNum || 0
                let overwrite = data.overwrite || 0
                let failureNum = data.failureNum || 0
                // let content = `共解析数据：${totalNum}条，成功导入： ${successNum}条，待确定导入： ${overwrite}条，无法导入的错误数据： ${failureNum}条。`
                let content = this.$t('importPage_result1before') + totalNum + this.$t('importPage_result1after') + this.$t('importPage_result2before') + successNum + this.$t('importPage_result2after') + this.$t('importPage_result4before') + overwrite + this.$t('importPage_result4after') + this.$t('importPage_result3before') + failureNum + this.$t('importPage_result3after') 
                let title = this.$t('importPage_result0')
               this.$Modal.info({
                    title: title, //'导入结果',
                    content: content,
                    onOk: () => {
                        this.goBack()
                    }
                })
            },
            goBack() {
                // 导入成功之后，返回之前的页面
                if(this.$route.query.activityId){
                     this.$router.push({
                        name: this.templateLists.goBack,
                        query:{
                            activityId:this.$route.query.activityId,
                            qr:this.$route.query.qr,
                            isEnable:this.$route.isEnable
                        }
                    })
                }else{
                     this.$router.push({
                        name: this.templateLists.goBack,
                    })
                }
            },
            pageChange(page) {
                this.pageNo = page
                this.listPageImportReports(2)
            },
            pageChangeCover(page) {
                this.pageNoCover = page
                this.listPageImportReports(1)
            },
            listPageImportReports(type) {
                // 待确认数据 type: 1, 错误数据: type: 2
                let data = {
                    keyAll: this.keyAll,
                    keyRepeat: this.keyRepeat
                }
                if (type == 1) {
                    data.pageNo = this.pageNoCover
                    data.pageSize = this.pageSizeCover
                    data.isUnConfirmed = 1
                } else {
                    data.pageNo = this.pageNo
                    data.pageSize = this.pageSize
                    data.isUnConfirmed = 0
                }
                sys.userListPageImportReports(data)
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            // debugger;
                            let data = res.data.data
                            if (type == 1) {
                                this.pageCountCover = Number(data.pageCount)
                                this.countCover = Number(data.count)
                                this.retData.repeatList = data.dataList
                            } else {
                                this.pageCount = Number(data.pageCount)
                                this.count = Number(data.count)
                                this.retData.allReportList = data.dataList
                            }
                            console.log(this.retData.repeatList)
                        }
                    })
                    .catch(errors.call(this))
            }
        },
        watch: {
            templateLists(val) {
                // console.log(val.curr())
                if (val.curr) this.action = val.curr()
            }
        }
    }
</script>
