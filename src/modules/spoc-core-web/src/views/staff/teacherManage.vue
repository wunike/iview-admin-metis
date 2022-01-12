<style lang="less">
.teacher-manage-container{
    @wh:#fff;
    @pd16:16px;
    .search-table{
        height:517px;
        margin-top:8px;
        background: @wh;
        padding-left:@pd16;
        padding-right:@pd16;
    }
    .table-pages{
        text-align: center;
        margin-top:@pd16;
    }
    .check-title{
        position: relative;
        text-indent: 10px;
        &:before{
            position: absolute;
            content: '';
            display: block;
            left:0;
            top:0;
            width:3px;
            height:100%;
            background: #aaa;
        }
    }
    .mytable{
        margin-top: 10px;
        width:100%;
        background:rgba(255,255,255,1);
        border-radius:4px;
        padding: 0 16px;
    }
}
</style>

<template>
    <div class="teacher-manage-container">
        <v-search-collapse @search="searchInfo" @reset="resetSearch" @changeDivHeight="changeDivHeight">
            <DatePicker type="daterange"  separator=" ~ "  @on-change="comeTimeChange" :value="comeT" format="yyyy-MM-dd" split-panels :placeholder="$t('views_staff_staffmanage_724')" style="width:180px;margin-right:12px;"></DatePicker>
            <DatePicker type="daterange"  separator=" ~ "  @on-change="offTimeChange" :value="offT" format="yyyy-MM-dd"  split-panels :placeholder="$t('views_staff_staffmanage_725')" style="width:180px;margin-right:12px;"></DatePicker>
            <Input  v-model="name" :placeholder="$t('modules_rolemanage_186')" style="width: 140px;margin-right:12px;" />
            <Input  v-model="loginName" :placeholder="$t('modules_rolemanage_190')" style="width: 140px;margin-right:12px;" />
            <Select :placeholder="$t('views_staff_staffmanage_720')" v-model="isService" clearable  style="width:140px;margin-right:12px;">
                <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select :placeholder="$t('views_staff_staffmanage_721')"  v-model="userType" clearable  style="width:140px;margin-right:12px;">
                <Option v-for="item in usrType" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select :placeholder="$t('views_staff_staffmanage_722')"  v-model="gender" clearable  style="width:140px;margin-right:12px;">
                <Option v-for="item in genderList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select :placeholder="$t('views_staff_teachermanage_766')"  v-model="teacherType" clearable  style="width:140px;margin-right:12px;">
                <Option v-for="item in jobList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </v-search-collapse>
        <big-table
                v-if="defaultShowCol"
                :needFixed="true"
                class="mytable"
                :tableHeightOut="tableHeightOut"
                :tableName="tableTitle"
                :pageNo="pageNo"
                :tableData="dataT"
                :tableColumnArray="columnsT"
                :defaultShowCol="defaultShowCol"
                :btnList="btnList"
                :canSelection="true"
                :updateShowTitleMethod="updateShowTitle"
                :dataTotal="pageCounts"
                :maxFlagForFixed="10"
                @resetDefault="resetDefaultCol"
                @selectionChange="selectTableItem"
                @pageChange="pageChange"
        >
        </big-table>
        <export-modal ref="exportModal" :exportMethod="exportMethod"></export-modal>
        <staffDynamic ref="staffInfo" :formStatus="formStatus" :titleName="titleName" @refresh-table="getTableDatas"></staffDynamic>
    </div>
</template>

<script>
    /**
     **@date: 2019/4/22 11:40
     **@author: lizhi
     **@filename: teacherManage2.vue
     * 主页面 包含表格
     */
    // import staffInfo from './components/staffInfo.vue'
    import staffDynamic from './components/staffDynamic.vue';

    import popTipComp from '@public/modules/tableDropdown.vue'
    import vSearchCollapse from '@public/modules/vSearchCollapse';
    import bigTable from '@public/modules/bigTable.vue';
    import exportModal from "@public/modules/exportModal.vue";
    import valid, {
        errors,
		sysUser,
		sysDict
    } from '../../libs/request';
    import {mapMutations} from 'vuex';
    export default {
        name: 'core.teacher',
        data() {
            return {
                tableHeightOut: 72,//324,
                updateShowTitle: sysUser.updateShowTitle,
                defaultShowCol:null,
                exportMethod:sysUser.exportData,
                selectedIds:[],//选中的ids
                currentIds:[], //当前页的ids
                formStatus:0,
                btnList:[
                    [
                        {
                            style: {},
                            type: '',
                            btnClick: this.isExport,
                            text: '导出全部',
                            value:'1',
                            parentName:'导出'
                        },
                        {
                            style: {},
                            type: '',
                            btnClick: this.isExport,
                            text: '导出所选',
                            value:'2',
                            parentName:'导出'
                        },
                    ],
                ],
                search: '',
                name:'',
                loginName:'',
                isService:'',
                stateList:[
                    {value:1,label:"在职"},
                    {value:0,label:"离职"},
                ],
                userType:'',
                usrType:[
                ],
                gender:'',
                genderList:[
                    {value:'m',label:"男"},
                    {value:'f',label:"女"}
                ],
                teacherType:'',
                job:'teacher',//教师
                jobList:[
                ],
                comeT:[],
                offT:[],
                // table
                pageNo1:1,
                pageCounts: 0, //总数
                pageSize: this.$store.state.app.pageSizeGlobal,
                params:{},
                tableTitle:'教师管理列表',
                checkAllMust:true,
                checkAll:true,
                columnsT:[
                    {
                        // title: '教师编号',
                        key: 'no',
                        // minWidth: 60,
                        fixed: 'left',
                    },
                    {
                        // title: '姓名',
                        key: 'name',
                        // minWidth: 80,
                        // maxWidth: 130,
                        fixed: 'left',
                    },
                    {
                        // title: '用户名',
                        // minWidth: 85,
                        key: 'loginName',
                        fixed: 'left',
                    },
                    {
                        // title: '归属机构',
                        key: 'officeName',
                        // minWidth: 100,
                        fixed: 'left',
                    },
                    {
                        // title: '联系电话',
                        key: 'mobile',
                        // minWidth: 85,
                        fixed: 'left',
                    },
                    
                    {
                        key: 'jobName',
                        // minWidth: 100,
                    },
                    {
						key: 'isEnable',
						// minWidth: 34,
						render: (h, params) => {
							return h('span', params.row.isEnable === '1' ? this.$t('views_staff_staffmanage_748') : this.$t('views_staff_staffmanage_749'))
						}
					},
                    {
                        // title: '教师类型',
                        key: 'teacherTypeName',
                        // width: 100,
                        fixed: 'left'
                    },
                    {
                        // title: '管辖机构',
                        key: 'adminNames',
                        // minWidth: 100,
                    },
                    {
                        // title: '兼职机构',
                        key: 'departNames',
                        // minWidth: 100,
                    },
                    {
                        // title: '可跨机构',
                        key: 'crossNames',
                        // minWidth: 100,
                    },
                    {
                        // title: '可教时长',
                        key: 'teachableDuration',
                        // minWidth: 40,
                    },
                    {
                        // title: '英文名',
                        key: 'enName',
                        // width: 120,
                    },
                    // {
                    //     title: '性别',
                    //     key: 'gender',
                    //     render: (h, params) => {
                    //         return h('span', params.row.gender === 'm' ? '男' : params.row.gender === 'f' ? '女': '')
                    //     }
                    // },
                    {
                        // title: '邮箱',
                        key: 'email',
                        // minWidth: 120,
                    },
                    {
                        // title: '类型',
                        key: 'userTypeName',
                        // minWidth: 34,
                    },
                    {
                        // title: '角色权限',
                        key: 'roleListName',
                        // width: 120,
                    },
                    {
                        // title: '在职状态',
                        key: 'isService',
                        render: (h, params) => {
                            return h('span', params.row.isService === '1' ? '在职' : params.row.isService === '0' ?'离职' : '')
                        }
                    },
                    {
                        // title: '入职时间',
                        key: 'entryDate',
                        // minWidth: 75,
                    },
                    {
                        // title: '离职日期',
                        key: 'leaveDate',
                        // minWidth: 75,
                    },
                    {
                        title: '操作',
                        key: 'doAction',
                        fixed: 'right',
                        width: 90,
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on:{
                                        click: () => {
                                            this.$refs.staffInfo.setModel(params.row,2)
                                            this.titleName = '修改教师'
                                        }
                                    }
                                }, '修改教师信息'),
                            ]);
                        }
                    }
                ],
                columns:[],
                dataT:[
                ],
                titleName:'',
            }
        },
        components: {
            vSearchCollapse,popTipComp,staffDynamic,bigTable,exportModal
        },
        mounted() {
            this.getShowTitle()
            this.getTableDatas()
            this.setSearchCol()
        },
        methods: {
            ...mapMutations(['updateLoadingStatus']),
            resetDefaultCol(){
                this.updateLoadingStatus({ isLoading: true });
                sysUser.clearShowField({
                    pageIdentifier: "user/listData",
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.getShowTitle(true);
                    } else {
                        this.updateLoadingStatus({ isLoading: false });
                    }
                })
                .catch(errors.call(this))
                .finally(() => {

                });
            },
            changeDivHeight(height){
                this.tableHeightOut = height
            },
            getShowTitle(closeLoad){
                sysUser.getShowTitle({
                    pageIdentifier:'user/listData',
                    lang: this.$i18n.locale,
                    voName: 'com.windliven.spoc.modules.sys.vo.UserVO',
                    tableName:'sys_user'
                    })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                       /*  let _res = []
                        res.data.data.false.forEach(item=>{
                            if(item.selected){
                                _res.push(item.name)
                            }
                        })
                        this.defaultShowCol = _res */
                        this.defaultShowCol = res.data.data
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    if(closeLoad){
                        this.updateLoadingStatus({ isLoading: false });
                    }
                });
            },
            selectTableItem(row) {
                //选择导出
                let s = this.selectedIds
                let c = this.currentIds
                for(let i in c){
                    if( s.includes(c[i]) ){
                        let num = this.selectedIds.indexOf(c[i]);
                        s.splice(num,1)
                    }
                }
                if(row.length){
                    row.forEach( item => {
                        s.push(item.id)
                    })
                }
            },
            //设置搜索条件
            setSearchCol() {
                sysDict.batchListData().then(valid.call(this)).then((res)=>{
                    if(res.ok){
                        let sys_user_type = res.data.data.sys_user_type
                        let sys_user_teacher_type = res.data.data.sys_user_teacher_type
                        this.usrType = []
                        for(let item in sys_user_type){
                            let obj = {}
                            let obj1 = sys_user_type[item]
                            obj.value = obj1.value
                            obj.label = obj1.label
                            this.usrType.push(obj)
                        }
                        this.jobList = []
                        for(let item in sys_user_teacher_type){
                            let obj = {}
                            let obj1 = sys_user_teacher_type[item]
                            obj.value = obj1.value
                            obj.label = obj1.label
                            this.jobList.push(obj)
                        }
                    }
                }).catch(errors.call(this))
            },
            comeTimeChange(item) {
                if (item && item[0]) {
                    this.params.entryDateStart = item[0];
                    this.params.entryDateEnd = item[1];
                } else {
                    delete this.params.entryDateStart;
                    delete this.params.entryDateEnd;
                }
            },
            offTimeChange(item) {
                if (item && item[0]) {
                    this.params.leaveDateStart = item[0];
                    this.params.leaveDateEnd = item[1];
                } else {
                    delete this.params.leaveDateStart;
                    delete this.params.leaveDateEnd;
                }
            },
            resetSearch() {
                this.pageNo = 1
                this.name = ''
                this.loginName = ''
                this.isService = ''
                this.userType = ''
                this.gender = ''
                this.teacherType = ''
                this.comeT = []
                this.offT = []
                this.params.entryDateStart = ''
                this.params.entryDateEnd = ''
                this.params.leaveDateStart = ''
                this.params.entryDateEnd = ''
                this.getTableDatas()
            },
            isExport(val){
                //这里val的值。是根据设置下拉类型button设定的值来匹配判断
                if (val == '2' && !this.selectedIds.length) {
                    this.$Message.error(this.$t('views_staff_staffmanage_769'));
                    return;
                }
                // let data = [];
                // if (this.defaultShowCol.true && this.defaultShowCol.true.length) {
                //     let _arr = this.defaultShowCol.true.sort((a, b) => {
                //         return a.sort - b.sort;
                //     });
                //     _arr.forEach((item, index) => {
                //         data.push({
                //             title: item.title,
                //             selected: true,
                //             key: item.name,
                //             fixed: true
                //         });
                //     });
                // }
                //
                // if (this.defaultShowCol.false && this.defaultShowCol.false.length) {
                //     let _arr = this.defaultShowCol.false.sort((a, b) => {
                //         return a.sort - b.sort;
                //     });
                //     _arr.forEach(item => {
                //         data.push({
                //             title: item.title,
                //             selected: false,
                //             key: item.name,
                //             fixed: false
                //         });
                //     });
                // }
                // console.log(data)
                let params = {}
                params.entryDateStart = this.entryDateStart
                params.entryDateEnd = this.entryDateStart
                params.leaveDateStart= this.entryDateStart
                params.leaveDateEnd = this.entryDateStart
                params.gender = this.gender
                params.isService = this.isService
                params.job = this.job
                params.loginName = this.loginName.trim()
                params.name = this.name.trim()
                params.userType = this.userType
                params.teacherType = this.teacherType

                if(val == '2'){
                    //如果是导出所选，需要在这里传递所选对象、或者对象ID，这里根据需要自行处理，并作为搜索参数的一部分传递到导出组件
                    params.userIds = this.selectedIds.join(',')
                    this.exportMethod = sysUser.exportSelected
                }else{
                    delete params.userIds
                    this.exportMethod = sysUser.exportData
                }
                this.$refs.exportModal.noShowExport(this.exportMethod, params);
            },
            // table 部分
            searchInfo() {
//                if (this.name ) {
//                    this.params.name = this.name;
//                } else {
//                    delete this.params.name;
//                }
//                if (this.loginName ) {
//                    this.params.loginName = this.loginName;
//                } else {
//                    delete this.params.loginName;
//                }
//                if (this.isService !== '' ) {
//                    this.params.isService = this.isService;
//                } else {
//                    delete this.params.isService;
//                }
//                if (this.userType ) {
//                    this.params.userType = this.userType;
//                } else {
//                    delete this.params.userType;
//                }
//                if (this.gender ) {
//                    this.params.gender = this.gender;
//                } else {
//                    delete this.params.gender;
//                } if (this.teacherType ) {
//                    this.params.teacherType = this.teacherType;
//                } else {
//                    delete this.params.teacherType;
//                }
                this.pageNo = 1
                this.getTableDatas()
            },
            getTableDatas(id) {
                this.updateLoadingStatus({isLoading: true});
                if(id){ this.params.officeId = id }
                this.params.pageNo = this.pageNo1
                this.params.pageSize = this.pageSize
                this.params.job = this.job
                this.params.name = this.name
                this.params.loginName = this.loginName
                this.params.isService = this.isService
                this.params.userType = this.userType
                this.params.gender = this.gender
                this.params.teacherType = this.teacherType;
                sysUser.listPage(this.params).then(valid.call(this)).then((res)=>{
                    if(res.ok){
                        let data = res.data
                        this.pageCounts = data.data.total
                        let d = data.data.list
                        this.currentIds = []
                        for(let i in d){
                            this.currentIds.push(d[i].id)
                            if(this.selectedIds.includes(d[i].id)){
                                d[i]._checked = true
                            }
                        }
                        this.dataT = d
                    }
                }).catch(errors.call(this))
                .finally(()=>{
                    this.updateLoadingStatus({isLoading:false});
                });
            },
            gettableTitle(title) {
                this.tableTitle = title
            },
            pageChange(page) {
                this.pageNo1 = page
                this.getTableDatas()
            },
            sizeChange(size) {
                this.pageSize = size
                this.getTableDatas()
            },
        },
    }
</script>
