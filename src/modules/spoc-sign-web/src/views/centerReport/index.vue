<style lang="less">
    .glr-container{
        #lineTop{
            display: flex;
            flex-direction: row;
            align-items: center;
        }
        .select-institution{
            height: 32px;
            display: inline-block;
            margin-right: 12px;
            margin-bottom: 12px;
            line-height: normal;
        }
        .my-table{
            width: 100%;
            background: rgba(255, 255, 255, 1);
            border-radius: 4px;
            padding: 0 16px;
            margin-top: 10px;
        }
    }
</style>

<template>
    <div class="glr-container">
        <v-search-collapse @search="search" @reset="reset" @changeDivHeight="changeDivHeight">
            <div class="select-institution">
                <v-select-tree :treeData="GLR.officeIdList"
                               style="width: 224px;margin-bottom:-12px;"
                               :label="selectTreeLabel"
                               :placeholder="$t('modules_spoc_crm_web_src_views_clientareaaround_clientareaaround_781')"
                               @onChange="changeTree"></v-select-tree>
            </div>
            <DatePicker
                    ref="DatePicker"
                    v-model="GLR.month"
                    type="month"
                    placement="bottom-start"
                    :placeholder="$t('modules_spoc_portal_modules_datemonth_3308')"
            ></DatePicker>
            <Select
                    :placeholder="$t('modules_spoc_sign_web_src_views_centerreport_index_5225')"
                    clearable
                    v-model="GLR.city"
                    @on-change="sectionListChange">
                <Option
                        v-for="item in GLR.cityList"
                        :value="item.value"
                        :key="item.value"
                >{{ item.name }}</Option>
            </Select>
        </v-search-collapse>
        <big-table
                v-if="defaultShowCol"
                class="my-table"
                :tableName="tabs"
                :tableData="tableData"
                :tableColumnArray="tableColumnArray"
                :defaultShowCol="defaultShowCol"
                :canSelection="true"
                :dataTotal="dataTotal"
                :btnList="btnList"
                :pageNo="pageNo"
                :showPage="currentTab=='0'?false:true"
                :isShowSelectTableColumn="false"
                :updateShowTitleMethod="updateShowTitle"
                :updateShowTitleKey="updateShowTitleKey"
                :tableHeightOut="tableHeightOut"
                @selectionChange="selectionChange"
                @pageChange="pageChange"
                @changeTableType="changeTableType"
        ></big-table>
        <export-modal ref="exportModal" :exportMethod="exportMethod"></export-modal>
    </div>
</template>

<script>
    import vSearchCollapse from "@public/modules/vSearchCollapse";
    import valid, {
        errors,
        sysOffice,
        sysUser,
        common,
        sysDict
    } from "../../libs/request";
    import {crmActivity} from '../../../../spoc-crm-web/src/libs/request'
    import { mapMutations, mapState } from "vuex";
    import Axios from 'axios'
    import vSelectTree from '@public/modules/vSelectTree';
    import bigTable from "../../../../spoc-portal/modules/bigTable";
    import exportModal from "@public/modules/exportModal.vue";
    export default {
        components: {
            vSearchCollapse,
            vSelectTree,
            bigTable,
            exportModal
        },
        data() {
            return {
                currentTab:'0',
                tableHeightOut:72,
                selectTreeLabel:'',
                GLR:{
                    officeId:'',
                    officeIdList:[],
                    city:'',
                    cityList:[],
                    month:'',
                },
                defaultShowCol:{},
                tableData:[],
                tableColumnArray:[],
                dataTotal:'',
                btnList:[
                    {
                        style: {},
                        type: "",
                        btnClick: this.export,
                        text: this.$t('integralflow_5')
                    }
                ],
                pageNo:'',
                updateShowTitle:'crmActivity.updateShowTitle',
                updateShowTitleKey:'listCrmActivityPage',
                exportMethod: crmActivity.exportSelectedFile, //导出用到的方法对象
                tabs:[
                    {
                        name: this.$t('modules_spoc_report_web_src_views_centerreport_centerreport_4554'),
                        value:'0'
                    },
                    {
                        name:this.$t('report.centerReport'),
                        value:'1'
                    },
                ],
            }
        },
        mounted() {
            this.init()
        },

        methods: {
            ...mapMutations(["updateLoadingStatus"]),
            init(){
                // Axios.all([this.batchListData(),this.customerSource()])
                // .then(Axios.spread(function(acct,perms){
                //     console.log(acct,perms)
                // }))
                this.batchListData()
                this.customerSource()
                this.getTreeDatas()
                this.getShowTitle()
                this.getListData()
            },
            search() {

            },
            reset() {

            },
            officeIdChange() {

            },
            firstSourceChange() {

            },
            changeDivHeight(height) {
                this.tableHeightOut = height;
            },
            sectionListChange(val) {
                this.GLR.month = ''
                if(val){
                    this.GLR.monthList = this.GLR.sectionList[val-1].mon
                }else{
                    this.GLR.monthList = []
                }
            },
            batchListData() {
                this.updateLoadingStatus({ isLoading: true });

                let types =
                    "crm_activity_type";
                sysDict
                .batchListData({
                    types
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.GLR.activityTypeList = res.data.data.crm_activity_type
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });

            },
            customerSource() {
                this.updateLoadingStatus({ isLoading: true });
                sysDict.getDictStringTree({type:'crm_customer_source'}).then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.GLR.customerSource = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
            },
            getTreeDatas() {
                this.updateLoadingStatus({isLoading: true});
                sysOffice.getOfficeTree().then(valid.call(this)).then((res)=>{
                    if(res.ok){
                        if(Array.isArray(res.data.data.children)){
                            this.GLR.officeIdList = res.data.data.children;
                        }
                    }
                }).catch(errors.call(this)).finally(()=>{
                    this.updateLoadingStatus({isLoading:false});
                });
            },
            changeTree(value, label) {
                console.log(value,label)
                // 选择归属机构
                this.GLR.officeId = value;
                this.selectTreeLabel = label;
            },
            selectionChange() {

            },
            pageChange() {

            },
            getShowTitle() {
                crmActivity
                .getShowTitle({
                    pageIdentifier: "listCrmActivityPage",
                    voName: "com.windliven.spoc.modules.crm.vo.CrmActivityVO"
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        // console.log(res)
                        this.defaultShowCol = res.data.data;
                    }
                })
                .catch(errors.call(this));
            },
            getShowTitleMore(){
                common
                .getShowTitle({
                    pageIdentifier: "ComStudent",
                    voName:
                        "com.windliven.spoc.modules.student.vo.ComStudentManageVO"
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.defaultShowCol = res.data.data;
                    }
                })
                .catch(errors.call(this));
            },
            getListData() {
                this.updateLoadingStatus({ isLoading: true });
                let param = {
                    beginDate:  "",
                    endDate:  "",
                };
                this.searchObj = param; //这里需要给searchObj 赋值，导出数据的时候需要用到
                crmActivity
                .listCrmActivityPage(param)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let result = res.data.data;
                        this.tableData = result.list;
                        this.dataTotal = result.total;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
            },
            export() {

            },
            exportMethod() {

            },
            changeTableType(val) {
                this.currentTab = val
                if(val=='0'){
                    this.getShowTitle()
                }else{
                    this.getShowTitleMore()
                }
            },
        },
    }
</script>
