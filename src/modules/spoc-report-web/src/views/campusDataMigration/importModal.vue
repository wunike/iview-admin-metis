<style lang="less">
.data-import-container{


}
.di-modal{

    .di-content{
        background: #fff;
        border-radius: 4px ;
    }
    .import-page-card {
        /*margin-bottom: 8px;*/
        /*padding: 20px;*/
        background: #fff;
        .currrent-file{
            font-size:16px;
            font-family:PingFangSC-Medium,PingFang SC;
            font-weight:500;
            /*color:rgba(153,153,153,1);*/
            padding-bottom:20px;
            span{
                color:#999999;
            }
            b{
                font-weight: normal;
            }
        }
    }
    .ivu-upload-list-file{
        /*background: #ff3300;*/
        color:#44BCB7;
        font-size: 14px;
        span{
            i{
                font-size: 14px;
                color:#44BCB7;
            }
        }
    }
    .download-template {
        padding-bottom: 10px;
        font-size:14px;
        font-family:PingFangSC-Medium,PingFang SC;
    }
    .error-infos{
        font-size: 14px;
        padding:10px;
    }
    .errors-info{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        span{
            font-size: 14px;
        }
    }
    .success-infos{
        padding:10px 0  ;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .success-infos-text{
            font-size: 14px;
        }
    }
    .data-table{
        max-height: 300px;
        overflow-y: auto;
        margin-top:10px;
    }
    .footer{
        span{
            font-size: 14px;
        }
    }
}
</style>

<template>
    <div class="data-import-container">
        <Modal
                v-model="modal"
                class-name="di-modal"
                width="1000"
                :mask-closable="false"
                :title="title"
                >
            <div class="di-content">
                <div class="import-page-card">
                    <div class="currrent-file">
                        <span>{{$t('modules_spoc_report_web_src_views_campusdatamigration_importmodal_4489')}}</span><b>{{taskName}}</b>
                    </div>
                    <div class="download-template">{{$t('modules_spoc_report_web_src_views_campusdatamigration_importmodal_4490')}}</div>
                    <!--                :data='{"officeId":officeId}'-->
                    <Upload
                            ref="upload"
                            :before-upload="handleUpload"
                            :default-file-list="uploadL"
                            type="drag"
                            :on-success="doupload"
                            :data="{officeId:officeId}"
                            :on-remove="remove"
                            :on-error="onError"
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
                <div v-if="errorInfos" class="error-infos">
                    <div>{{$t('modules_spoc_report_web_src_views_campusdatamigration_importmodal_4492')}}<span style="color:#ff3300">{{errorInfos}}</span></div>
                </div>
                <div v-if="successInfos.totalNum" class="success-infos">
                    <div class="success-infos-text">{{$t('modules_spoc_report_web_src_views_campusdatamigration_importmodal_4493')}}<span style="color: #46BC15">{{successInfos.totalNum}}</span>{{$t('modules_spoc_report_web_src_views_campusdatamigration_importmodal_4494')}}<span style="color: #46BC15">{{successInfos.successNum}}</span>{{$t('modules_spoc_report_web_src_views_campusdatamigration_importmodal_4495')}}<span style="color: #FF9300">{{successInfos.overwrite}}</span>{{$t('modules_spoc_report_web_src_views_campusdatamigration_importmodal_4496')}}<span style="color: #E72B00">{{successInfos.failureNum}}</span>{{$t('importPage_result4after1')}}</div>
                </div>
                <div v-if="successInfos.failureNum" class="errors-info">
                    <div><span>{{$t('modules_spoc_report_web_src_views_campusdatamigration_importmodal_4498')}}</span><span style="color: #E72B00">{{successInfos.failureNum}}</span><span>{{$t('importPage_result4after1')}}</span></div>
                    <Button type="primary" @click="getErrorInfos">{{$t('importPage_downloadReport')}}</Button>
                </div>
                <div v-if="successInfos.repeatList.length" class="data-table">
                    <Table ref="selection"  :columns="columnsConflict" :data="successInfos.repeatList"></Table>
                </div>
                <div v-if="successInfos.allReportList.length"  class="data-table">
                    <Table ref="selection"  :columns="columnsError" :data="successInfos.allReportList"></Table>
                </div>
            </div>
            <div slot="footer" class="footer">
                <Button style="margin-left:12px" @click="cancel">{{$t('modules_spoc_report_web_src_views_campusdatamigration_importmodal_4500')}}</Button>
                <Button
                        :disabled="successInfos.totalNum < 1 ||successInfos.overwrite > 0 ||successInfos.failureNum>0"
                        type="primary"  @click="ok">{{$t('scoretemplate_compontents_scoremodify_545')}}</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import valid, {
        errors,
        rptDataMigarate
    } from "../../libs/request"
    import { mapState,mapMutations } from "vuex";
    export default {
        props: {

        },
        components: {

        },
        data() {
            return {
                modal:false,
                title:'',
                taskName:'',
                id:'',
                action:'',
                uploadL:[],
                officeId:'',
                errorInfos:'',
                successInfos:{
                    totalNum: 0, // 导入总条数
                    successNum: 0, // 成功条数
                    overwrite: 0, // 待覆盖条数
                    failureNum: 0, // 失败条数
                    repeatList: [], // 待确认覆盖数据（数组中包含待覆盖对象object）
                    allReportList: [] // 失败错误报告
                },
                getErrorFn:'',
                columnsConflict: [
                    // 冲突数据 columns
                    {
                        type: 'selection',
                        width: 40,
                        align: 'center'
                    },
                    {
                        title: this.$t('courselist_compontents_detailinfo_160'),//'序号',
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
                        title: this.$t('courselist_compontents_detailinfo_160'),//'序号',
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
            }
        },
        methods: {
            ...mapMutations(["updateLoadingStatus"]),
            updateStatus() {
                rptDataMigarate.updateStatus({id:this.id,status:'1'}).then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.$emit('successFn',this.id)
                    }
                })
                .catch(errors.call(this))
            },
            cancel(key) {
                this.modal = false
                this.$refs.upload.fileList.shift();
                if(!key){
                    this.$emit('successFn',this.id)
                }
                this.successInfos= {
                    totalNum: 0, // 导入总条数
                    successNum: 0, // 成功条数
                    overwrite: 0, // 待覆盖条数show
                    failureNum: 0, // 失败条数
                    repeatList: [], // 待确认覆盖数据（数组中包含待覆盖对象object）
                    allReportList: [] // 失败错误报告
                }
                this.errorInfos = ''
            },
            ok() {
                this.modal = false
                this.$refs.upload.fileList.shift();
                this.successInfos= {
                    totalNum: 0, // 导入总条数
                    successNum: 0, // 成功条数
                    overwrite: 0, // 待覆盖条数show
                    failureNum: 0, // 失败条数
                    repeatList: [], // 待确认覆盖数据（数组中包含待覆盖对象object）
                    allReportList: [] // 失败错误报告
                }
                this.errorInfos = ''
            },
            show(v) {
                console.log(v)
                let data = v.data
                this.id = v.id
                this.modal = true
                this.officeId = v.officeId
                this.title = v.title
                this.taskName = v.taskName
                if(data){
                    this.action = data+'/importFile'
                    this.getErrorFn = data+'/downReport'
                }
            },
            downloadTemplate() {

            },
            handleUpload(v) {
                //成功之前清除之前的文件
                this.updateLoadingStatus({ isLoading: true });
                if(this.$refs.upload.fileList.length>=1){
                    this.$refs.upload.fileList.shift();
                }
            },
            handleFormatError(file, fileList	) {
                //格式错误
            },
            onError(error, file, fileList) {
                //上传错误
                // console.log('error')
                // console.log(error,file,fileList)
            },
            remove(file, fileList) {
                console.log(file)
                console.log(fileList)
                if(fileList.length < 1){
                    this.errorInfos = ''
                    this.successInfos= {
                        totalNum: 0, // 导入总条数
                        successNum: 0, // 成功条数
                        overwrite: 0, // 待覆盖条数
                        failureNum: 0, // 失败条数
                        repeatList: [], // 待确认覆盖数据（数组中包含待覆盖对象object）
                        allReportList: [] // 失败错误报告
                    }
                }

            },
            doupload(response, file, fileList) {
                //成功上传
                if(response.status == 'success'){
                    this.errorInfos = ''
                    this.successInfos= response.data
                    if(!this.successInfos.failureNum && !this.successInfos.overwrite){
                        this.$Message.success(this.$t('modules_spoc_report_web_src_views_campusdatamigration_importmodal_4502'))
                        this.modal = false
                        this.updateStatus()
                        this.cancel(true)
                        // this.$emit('successFn',this.id)
                    }
                } else if(response.status == 'error'){
                    this.successInfos= {
                        totalNum: 0, // 导入总条数
                        successNum: 0, // 成功条数
                        overwrite: 0, // 待覆盖条数
                        failureNum: 0, // 失败条数
                        repeatList: [], // 待确认覆盖数据（数组中包含待覆盖对象object）
                        allReportList: [] // 失败错误报告
                    }
                    this.errorInfos = response.message
                    this.$Message.error(this.$t('modules_spoc_report_web_src_views_campusdatamigration_importmodal_4503'))
                }
                this.updateLoadingStatus({ isLoading: false });

            },
            getErrorInfos() {
                // 下载错误报告
                let $eleForm = document.createElement('form')
                $eleForm.methods = 'get'
                $eleForm.action = this.getErrorFn
                document.body.appendChild($eleForm)
                //提交表单，实现下载
                $eleForm.submit()
                $eleForm.remove()
            },
        },
    }
</script>
