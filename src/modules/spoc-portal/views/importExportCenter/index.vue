<style lang="less">
.import-export-center {
    /*width:100%;*/
    /*height:100%;*/
    /*background: #fff;*/
    margin: 16px;
    .my-table {
        width: 100%;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        padding: 0 16px 16px;
        margin-top: 10px;
        .ivu-table-wrapper{
            border: none;
        }
        // .ivu-table:after{
        //     display: none;
        // } .ivu-table-border td{
        //     border: none;
        // }
        //  .ivu-table-border th{
        //     // border: none;
        //  }
    }
}
</style>
<template>
    <div class="import-export-center">
        <v-search-collapse @search="search" @reset="reset" @changeDivHeight="changeDivHeight">
            <DatePicker
                ref="DatePicker"
                split-panels
                v-model="optTime"
                type="daterange"
                placement="bottom-start"
                separator=" ~ "
                placeholder="时间范围"
                style="width:224px;"
            ></DatePicker>
            <Select v-model="searchBox.officeIds" multiple style="width: 206px;" clearable placeholder="查询机构">
                <Option v-for="item in areaSchoolList" :value="item.id" :key="item.id">{{ item.code }}{{ item.name }}</Option>
            </Select>
            <Select v-model="searchBox.bizType" clearable placeholder="请选择枚举类型">
                <Option v-for="item in bizTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select
                filterable
                remote
                v-model="searchBox.createBy"
                placeholder="操作人"
                @on-clear="clearcReateBy"
                :loading="createByLock"
                @on-query-change="getQuery"
                :remote-method="() => {}"
                clearable
            >
                <Option v-for="(item, index) in createByList" :value="item.id" :key="id">{{ item.name }}</Option>
            </Select>
        </v-search-collapse>
        <big-table
            v-if="defaultShowCol"
            class="my-table"
            :tableName="tableName"
            :tableData="tableData"
            :tableColumnArray="tableColumnArray"
            :defaultShowCol="defaultShowCol"
            :canSelection="false"
            :dataTotal="dataTotal"
            :pageNo="pageNo"
            :isShowSelectTableColumn="false"
            :updateShowTitleMethod="updateShowTitle"
            :updateShowTitleKey="updateShowTitleKey"
            :tableHeightOut="tableHeightOut"
            @pageChange="pageChange"
            @changeTableType="changeTableType"
        ></big-table>
    </div>
</template>

<script>
import vSearchCollapse from '@public/modules/vSearchCollapse';
import bigTable from '@public/modules/bigTable.vue';
import { waitUntil, DatePickerOpt, defaultDatePickerValue, titleTransformationToLabel, getSelectIdsByid, getSelectTreeDataByid } from '@public/libs/util';
import valid, { errors, sysUser, sysDict, SysProps, api, common } from '../../libs/request';
import { mapMutations, mapState } from 'vuex';
import { crmActivity } from '../../../spoc-crm-web/src/libs/crmActivity';
export default {
    components: {
        vSearchCollapse,
        bigTable
    },
    data() {
        return {
            //搜索
            tableHeightOut: 72,
            optTime: [],
            searchBox: {
                bizType: '',
                createBy: '',
                officeIds: []
            },
            areaSchoolList: [],
            bizTypeList: [],
            createByList: [],
            createByLock: false, //操作人 loading
            //大列表
            pageNo: 1,
            pageSize: this.$store.state.app.pageSizeGlobal,
            tableData: [
                {
                    cusName: '1221',
                    cusStartPhone: '1221',
                    stuName: '1221',
                    stuGrade: '1221',
                    firstSource: '1221',
                    url: 'www.baidu.com'
                }
            ],
            tableColumnArray: [
                {
                    title: '操作',
                    key: 'doAction',
                    maxWidth: 160,
                    render: (h, params) => {
                        return h(
                            'a',
                            {
                                on: {
                                    click: () => {
                                        this.export(params.row.url);
                                    }
                                }
                            },
                            '下载查看结果'
                        );
                    }
                }
            ],
            defaultShowCol: null,
            defaultShowCol1: {
                true: [
                    {
                        name: 'createDate',
                        title: '导出时间',
                        selected: true,
                        required: true,
                        percent: false,
                        sort: 0
                    },
                    {
                        name: 'bizTypeName',
                        title: '数据分类',
                        selected: true,
                        required: true,
                        percent: false,
                        sort: 0
                    },
                    {
                        name: 'rowNum',
                        title: '导出数量',
                        selected: true,
                        required: true,
                        percent: false,
                        sort: 0
                    },
                    {
                        name: 'createByName',
                        title: '操作人',
                        selected: true,
                        required: true,
                        percent: false,
                        sort: 0
                    },
                    {
                        name: 'statusName',
                        title: '状态',
                        selected: true,
                        required: true,
                        percent: false,
                        sort: 0
                    }
                ]
            },
            defaultShowCol2: {
                true: [
                    {
                        name: 'createDate',
                        title: '导入时间',
                        selected: true,
                        required: true,
                        percent: false,
                        sort: 0
                    },
                    {
                        name: 'bizTypeName',
                        title: '数据分类',
                        selected: true,
                        required: true,
                        percent: false,
                        sort: 0
                    },
                    {
                        name: 'rowNum',
                        title: '导入数量',
                        selected: true,
                        required: true,
                        percent: false,
                        sort: 0
                    },
                    {
                        name: 'createByName',
                        title: '操作人',
                        selected: true,
                        required: true,
                        percent: false,
                        sort: 0
                    },
                    {
                        name: 'statusName',
                        title: '状态',
                        selected: true,
                        required: true,
                        percent: false,
                        sort: 0
                    }
                ]
            },
            dataTotal: 0,
            updateShowTitle: null,
            updateShowTitleKey: null,
            tableName: [
                {
                    name: '数据导入管理',
                    value: '0'
                },
                {
                    name: '数据导出管理',
                    value: '1'
                },
            ],
            currentTab: '0' //tab 索引
        };
    },
    computed: {
        ...mapState(['app', 'buttonPerm', 'calendarConfig'])
    },
    mounted() {
        this.setTime();
        this.defaultShowCol = { ...this.defaultShowCol1 };
        this.getSchoolList();
        this.getBizTypeList();
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        getList() {
            this.updateLoadingStatus({ isLoading: true });
            let params = Object.assign({}, this.searchBox);
            params.type = this.currentTab;
            if (this.optTime[0]) {
                params.startTime = new Date(this.optTime[0]).format('yyyy-MM-dd 00:00:00');
            } else {
                params.startTime = '';
            }
            if (this.optTime[1]) {
                params.endTime = new Date(this.optTime[1]).format('yyyy-MM-dd 23:59:59');
            } else {
                params.endTime = '';
            }
            common
                .comDataTransferListPage(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.tableData = res.data.data.list;
                        this.pageNo = !!res.data.data.pageNum ? res.data.data.pageNum : 1;
                        this.pageSize = !!res.data.data.pageSize ? res.data.data.pageSize : 20;
                        this.dataTotal = res.data.data.total;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        getBizTypeList() {
            let params = {
                codes: 'ComDataTransferBizType'
            };
            common
                .enums(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let list = Object.keys(res.data.data.ComDataTransferBizType);
                        let arr = [];
                        list.forEach(v => {
                            arr.push({ label: res.data.data.ComDataTransferBizType[v], value: v });
                        });
                        this.bizTypeList = arr;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
        },
        // 获取登记校区
        getSchoolList() {
            let params = {};
            sysUser
                .dataScopeFilter(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.areaSchoolList = res.data.data;
                        waitUntil(
                            () => {
                                return !!this.app.currOfficeId;
                            },
                            () => {
                                this.searchBox.officeIds = [this.app.currOfficeId];
                                this.getList();
                            }
                        );
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
        },
        changeTableType(v) {
            //tab 切换
            this.currentTab = v;
            this.defaultShowCol = v === '1' ? { ...this.defaultShowCol1 } : { ...this.defaultShowCol2 };
            this.getList();
        },
        changeDivHeight(height) {
            //设置搜索项高度
            this.tableHeightOut = height;
        },
        setTime() {
            //设置初始默认时间
            let firstDate = new Date();
            firstDate.setDate(1); //第一天
            let f = new Date(firstDate).format('yyyy-MM-dd');
            let endDate = new Date().format('yyyy-MM-dd');
            this.optTime = [f, endDate];
        },
        search() {
            //查询
            this.getList();
        },
        reset() {
            //重置
            this.setTime();
            this.clearcReateBy();
            this.searchBox.officeIds = [this.app.currOfficeId];
            this.searchBox.createBy = '';
            this.pageNo=1;
            this.getList();
        },

        clearcReateBy() {
            //清空操作人
            this.createByList = [];
            this.searchBox.createBy = '';
        },
        getQuery(v) {
            // 查询操作人
            this.createByLock = true;
            let params = {};
            params.name = v;
            params.pageNo = 1;
            params.pageSize = 1000;
            let parentId=this.areaSchoolList[0].parentIds.split(',')[0];
            params.searchOfficeId = parentId!=='0'?parentId:1;
            if (!v) {
                this.createByLock = false;
                return;
            }
            sysUser
                .listPage(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.createByLock = false;
                        let data = res.data.data.list;
                        this.createByList = data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
        },
        pageChange(pageNo, pageSize) {
            if (!pageNo) {
                //防止无用重复请求
                return;
            }
            this.pageNo = pageNo;
            this.pageSize = pageSize;
            this.getList();
        },
        export(url) {
            // let params = {};
            // crmActivity
            //     .export(params)
            //     .then(valid.call(this))
            //     .then(res => {
            //         if (res.ok) {
            //         }
            //     });
            this.blob(url);
        },
        blob(url) {
            //导出方法
            // const blob = new Blob([res.data], { type: 'application/actet-stream;charset=utf-8' });
            // const contentDisposition = res.headers['content-disposition']; //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
            // const patt = new RegExp('filename=([^;]+\\.[^\\.;]+);*');
            // const result = patt.exec(contentDisposition);
            // if (!result) {
            //     this.$Message.error(this.$t('pushsettings_33'));
            //     return;
            // }
            // const filename = decodeURIComponent(result[1]);
            const downloadElement = document.createElement('a');
            const href = url//window.URL.createObjectURL(blob); //创建下载的链接
            downloadElement.style.display = 'none';
            downloadElement.href = href;
            downloadElement.download = 'filename'//; //下载后文件名
            // debugger
            document.body.appendChild(downloadElement);
            downloadElement.click(); //点击下载
            document.body.removeChild(downloadElement); //下载完成移除元素
            // window.URL.revokeObjectURL(href);
        }
    }
};
</script>
