<style lang="less">
    .mytable{
        margin-top: 10px;
        width:100%;
        background:rgba(255,255,255,1);
        border-radius:4px;
		padding: 0 16px;
    }
</style>
<template>
    <div>
        <v-search-collapse @search="getListData" @reset="resetSearch">
			<Input v-model="name1" :placeholder="$t('views_coursepack_bigtableexample_315')"></Input>
			<Input v-model="name2" :placeholder="$t('views_coursepack_bigtableexample_316')"></Input>
		</v-search-collapse>
        <big-table 
            v-if="defaultShowCol"
            class="mytable"
            :tableName="tableName"
            :tableData="tableData" 
            :tableColumnArray="tableColumnArray" 
            :defaultShowCol="defaultShowCol"
            :btnList="btnList"
            :canSelection="true"
            :updateShowTitleMethod="updateShowTitle"
            :dataTotal="dataTotal"
            @selectionChange="selectionChange"
            @sortChange="sortChange"
            @pageChange="pageChange"
            @changeTableType="changeTableType"
            >
        </big-table>
        <export-modal ref="exportModal" :exportMethod="exportMethod"></export-modal>
    </div>
</template>
<script>
    import { mapMutations } from "vuex"; 
    import bigTable from '@public/modules/bigTable.vue';
    import exportModal from "@public/modules/exportModal.vue";
    import vSearchCollapse from '@public/modules/vSearchCollapse';
    import valid, { errors, jwCourse, } from "../../libs/request";
    import tableDropdown  from '@public/modules/tableDropdown';
    export default {
        name: 'core.bigTableExample',
		components:{
            bigTable,
            exportModal,
            vSearchCollapse,
            tableDropdown
		},
        mounted () {
            this.getShowTitle()
            this.getListData()
        },
        data () {
            return {
                tableName: [
                    {
                        name: this.$t('views_coursepack_bigtableexample_317'),
                        value: '1111a'
                    },{
                        name: this.$t('views_coursepack_bigtableexample_318'),
                        value: '222222d'
                    }
                ],
                name1: '',
                name2: '',
                selection:[],
                updateShowTitle: jwCourse.updateShowTitle,
                exportMethod: jwCourse.listPage, //导出用到的方法对象
                defaultShowCol: null,
                dataTotal: 0,
                pageNo: 1,
                pageSize: 10,
                sortObj: {},
                tableColumnArray: [
                    {
                        title: this.$t('views_coursepack_bigtableexample_319'),
                        key: 'name',
                        sortable: 'custom',
                        minWidth:100,
                        maxWidth:200,
                        tooltip: true,
                        fixed: 'left'
                    },
                    {
                        title: this.$t('views_coursepack_bigtableexample_320'),
                        key: 'officeName',
                        minWidth:100,
                        maxWidth:200,
                        tooltip: true,
                        fixed: 'left'
                    },
                    {
                        title: this.$t('views_coursepack_bigtableexample_321'),
                        key: 'officeNames',
                        minWidth:100,
                        tooltip: true,
                        fixed: 'left'
                    },
                    {
                        title: this.$t('views_coursepack_bigtableexample_322'),
                        key: 'typeLabel',
                        width: 100
                    },
                    {
                        title: this.$t('views_coursepack_bigtableexample_323'),
                        key: 'gradeLabel',
                        width: 100
                    },
                    {
                        title: this.$t('views_coursepack_bigtableexample_324'),
                        key: 'status',
                        render: (h, params) => {
                            return  h('div', [
                                h('div', {
                                    style:{
                                        'display':'inline-block',
                                        'width':'6px',
                                        'height':'6px',
                                        'border-radius':'4px',
                                        'margin-right': '6px',
                                        'background' : (params.row.status == '1') ? 'rgba(70,188,21,1)' : '#999999'
                                    },
                                }),
                                h('div', {
                                    style:{
                                        'display':'inline-block',
                                    },
                                }, params.row.status == '1' ? this.$t('views_coursepack_bigtableexample_325') : this.$t('views_coursepack_bigtableexample_326'))
                            ])
                        },
                        width: 100
                    },
                    {
                        title: this.$t('views_coursepack_bigtableexample_327'),
                        key: 'saleEndDate',
                        width: 100
                    },
                    {
                        title: this.$t('views_coursepack_bigtableexample_328'),
                        key: 'address',
                        minWidth: 150,
                        sortable: 'custom'
                    },
                    {
                        title: this.$t('views_coursepack_bigtableexample_329'),
                        key: 'createByName',
                        minWidth: 150,
                        sortable: 'custom'
                    },
                    {
                        title: this.$t('views_coursepack_bigtableexample_330'),
                        key: 'createDate',
                        minWidth: 150,
                        sortable: 'custom'
                    },
                    {
                        title: this.$t('views_coursepack_bigtableexample_331'),
                        key: 'updateByName',
                        minWidth: 150,
                        sortable: 'custom'
                    },
                    {
                        title: this.$t('views_coursepack_bigtableexample_332'),
                        key: 'updateDate',
                        minWidth: 150,
                        sortable: 'custom'
                    },
                    {
                        title: this.$t('views_coursepack_bigtableexample_333'),
                        key: 'study',
                        minWidth: 150,
                        sortable: 'custom'
                    },
                    {
                        title: this.$t('views_coursepack_bigtableexample_334'),
                        key:'doAction',
                        width: 160,
                        fixed: 'right',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    style:{
                                    },
                                    on: {
                                        click: () => {
                                            this.getDetail(params.row.id)
                                        }
                                    } 
                                }, this.$t('views_coursepack_bigtableexample_335')),
                                h('a', {
                                    style:{
                                        'margin-left':'5px',
                                    },
                                    on: {
                                        click: () => {
                                            this.openType = '1'
                                            this.title = this.$t('views_coursepack_bigtableexample_336')
                                            this.createModal = true
                                            this.getDetail(params.row.id)
                                        }
                                    } 
                                }, this.$t('views_coursepack_bigtableexample_337')),
                                h(tableDropdown, {
                                    style:{
                                        'margin-left':'10px'
                                    },
                                    props: {
                                        buttonList: [
                                            {label:  params.row.status == '1' ? this.$t('views_coursepack_bigtableexample_326') : this.$t('views_coursepack_bigtableexample_325'), key: 'changeStatus'},
                                            {label: this.$t('views_coursepack_bigtableexample_338'), key: 'delData'},
                                            {label: this.$t('views_coursepack_bigtableexample_339'), key: 'copy'}
                                        ],
                                    },
                                    on: {
                                        dropFn : (key)=> {
                                            this.doActionItem({
                                                key,
                                                row: params.row,
                                            })
                                        }
                                    }
                                }),
                            ])
                        }
                    }
                ],
                tableData: [],
                btnList:[
                    [
                        {
                            style: {},
                            type: '',
                            btnClick: this.isExport,
                            text: this.$t('views_coursepack_bigtableexample_340'),
                            value:'1',
                            parentName:this.$t('views_coursepack_bigtableexample_341')
                        },
                        {
                            style: {},
                            type: '',
                            btnClick: this.isExport,
                            text: this.$t('views_coursepack_bigtableexample_342'),
                            value:'2',
                            parentName:this.$t('views_coursepack_bigtableexample_341')
                        },
                    ],
                    {
                        style: {},
                        type: '',
                        btnClick: this.isImport,
                        text: this.$t('views_coursepack_bigtableexample_343')
                    },
                    {
                        style: {},
                        type: '',
                        btnClick: this.isCreate,
                        text: this.$t('views_coursepack_bigtableexample_344')
                    },
                ],
            }
        },
        methods: {
            ...mapMutations(["updateLoadingStatus"]),
            changeTableType(val){
                console.log(val)
            },
            doActionItem(obj) {
                if(obj.key === 'delData') { 
                    if(obj.row.status != '1'){
                        this.$Modal.confirm({
                            title: this.$t('views_coursepack_bigtableexample_345'),
                            content: '<p>' + this.$t('views_coursepack_bigtableexample_346') + '</p>',
                            onOk: () => {
                                this.deleteCoursePack(obj.row.id)
                            },
                            onCancel: () => {
                            }
                        });
                    }
                } else if(obj.key === 'changeStatus') {
                    this.$Modal.confirm({
                        title: this.$t('views_coursepack_bigtableexample_347'),
                        content: '<p>' + this.$t('views_coursepack_bigtableexample_348') + '</p>',
                        onOk: () => {
                            this.changeStatus(obj.row.id, obj.row.status)
                        },
                        onCancel: () => {
                        }
                    });
                } else if(obj.key === 'copy') {
                }
            },
            //获取数据，根据情况修改接口、传参
            getListData() { 
                this.updateLoadingStatus({ isLoading: true });
                this.currentPage = this.pageNo
                let param = {
                    pageNo: this.pageNo,
                    pageSize: this.pageSize,
                }
                if(this.sortObj.order != 'normal' && this.sortObj.key){
                    param.orderByType = this.sortObj.key
                    param.orderByStatus = this.sortObj.order == 'asc' ? '1' : '2'
                }
                this.searchObj = param  //这里需要给searchObj 赋值，导出数据的时候需要用到
                jwCourse.listPage(param)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let result = res.data.data
                        this.tableData = result.list
                        this.dataTotal = result.total
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
            },
            //分页方法 如果有分页则为必须方法，修改getCourseList为自己的获取数据方法 这里注意。不再有每页个数改变的方法了
            pageChange(pageNo,pageSize){
                if(!pageNo){ //防止无用重复请求
                    return 
                }
                this.pageNo = pageNo
                this.pageSize = pageSize
                this.getListData()
            },
            //如果有排序字段则为 必须方法，修改getCourseList为自己的获取数据方法
            sortChange(obj){
                console.log(obj) // {key: "createByName" ,order: "desc"}
                this.sortObj = obj
                this.getListData()
            },
            //可选方法，如果是多选的话必须有
            selectionChange(selection){
                console.log(selection)
                this.selection = selection
            },
            //必须方法，获取默认显示的可选列  接口根据需要自行更换，每个模块的接口是不一致的
            getShowTitle(){
                jwCourse.getShowTitle({
                    pageIdentifier: 'jwClassroom/listPage'
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        /* console.log(res.data.data.false)
                        let _res = []
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
                });
            },
            resetSearch(){

            },
            getDetail(name){
                alert(name)
            },
            isExport(val){
                //这里val的值。是根据设置下拉类型button设定的值来匹配判断
                if(val == '2' && !this.selection.length){
                    this.$Message.error('请选择要导出的数据')
                    return;
                }
                this.tableColumnArray.map((item)=>{
                    item.name = item.key;
                    if(item.fixed){
                        item.selected = true
                    } else {
                        item.selected = false
                    }
                })
                let data = this.tableColumnArray.filter(item=>{
                    return item.key != 'doAction'
                })
                if(val == '2'){ 
                    //如果是导出所选，需要在这里传递所选对象、或者对象ID，这里根据需要自行处理，并作为搜索参数的一部分传递到导出组件
                    this.searchObj.selection = this.selection
                }
                this.$refs.exportModal.show(data, val, this.searchObj);
            },
            isImport(){
                alert('导入')
               /*  this.$router.push({
                    name: '',
                    query: {
                        
                    }
                }) */
            },
            isCreate(){
                alert(this.$t('views_coursepack_bigtableexample_344'))
            },
        },
    }
</script>