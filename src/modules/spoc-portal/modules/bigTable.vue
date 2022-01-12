<style lang="less">
.newTable {
    .ivu-table-cell {
        padding-left: 5px;
        padding-right: 5px;
    }
    .head {
        position: relative;
        height: 48px;
        margin-bottom: 12px;
        .name {
            font-size: 16px;
            font-weight: bold;
            position: absolute;
            bottom: 0;
            left: 0;
            margin-left: 10px;
        }
        .nameTab {
            bottom: -28px;
            margin-left: 0;
            width: 100%;
        }
        .buttons {
            position: absolute;
            bottom: 0;
            right: 31px;
        }
        .showCheckBoxButton {
            text-align: center;
            width: 31px;
            height: 31px;
            position: absolute;
            bottom: 0;
            right: 0;
            font-size: 19px;
            /* background: #2d8cf0; */
            color: #fff;
            border-radius: 4px;
            &:hover {
                cursor: pointer;
            }
        }
    }
    .myTable {
        position: relative;
        .showCheckBoxArea {
            position: absolute;
            right: 0;
            top: 0;
            z-index: 999;
            width: 580px;
            background: #fff;
            padding: 24px;
            border: 1px solid rgba(224, 224, 224, 1);
            box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
            border-radius: 4px;
            .ivu-checkbox-default {
                min-width: 124px;
                margin-bottom: 12px;
            }
        }
    }
    .myPage {
        text-align: center;
        padding: 8px 0;
    }
    .active_box {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        a {
            margin-right: 16px;
            // color: #5584ff;
        }
    }
}
</style>
<template>
    <div class="newTable" @click="hideCheckBox">
        <div class="head">
            <div class="name" v-if="!tableName"><slot name="tableNameSlot"></slot></div>
            <div class="name" v-else-if="!Array.isArray(tableName)">{{ tableName }}</div>
            <div class="name nameTab" v-else>
                <Tabs v-model="nameType" @on-click="changeTableType"><TabPane :label="item.name" :name="item.value" v-for="item in tableName" :key="item.value"></TabPane></Tabs>
            </div>
            <div class="buttons" :style="{ right: isShowSelectTableColumn ? '' : '0' }">
                <div style="display: inline-block;" v-for="(item, index) in btnList" :key="index">
                    <Tooltip :content="item.tipContent" :placement="item.tipPlacement" :theme="item.tipTheme" v-if="!Array.isArray(item) && !!item.hidden == false && item.tipContent">
                        <Button
                            style="margin-right: 12px;"
                            v-if="!Array.isArray(item) && !!item.hidden == false"
                            :style="item.style"
                            :type="item.type ? item.type : 'primary'"
                            @click="item.btnClick"
                            v-html="item.text"
                        >
                        </Button>
                    </Tooltip>
                    <Button
                        style="margin-right: 12px;"
                        v-else-if="!Array.isArray(item) && !!item.hidden == false"
                        :style="item.style"
                        :type="item.type ? item.type : 'primary'"
                        @click="item.btnClick"
                        v-html="item.text"
                    ></Button>
                    <Dropdown style="margin-right: 12px;" v-if="Array.isArray(item) && item.every(v => !!v.hidden == false)" @on-click="item[0].btnClick">
                        <Button type="primary">
                            {{ item[0].parentName }}
                            <Icon type="ios-arrow-down"></Icon>
                        </Button>
                        <DropdownMenu slot="list">
                            <DropdownItem v-for="(itemChild, indexChild) in item" :key="indexChild" :name="itemChild.value" v-if="!!itemChild.hidden == false">
                                {{ itemChild.text }}
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <slot name="buttonsAfterSlot"></slot>
            </div>
            <div class="showCheckBoxButton" @click.stop="showCheckBox" v-show="isShowSelectTableColumn"><Icon type="ios-funnel" /></div>
        </div>
        <div class="myTable">
            <Table
                id="bigTableMiddle"
                ref="bigTableMiddle"
                :row-class-name="rowClassName"
                :height="canChangeHeight ? _tableHeight : ''"
                @on-column-width-resize="resizeWidth"
                @on-selection-change="selectionChange"
                @on-row-click="onRowClick"
                @on-sort-change="sortChange"
                @on-filter-change="filterChange"
                :data="tableData"
                :columns="tableColumns"
                border
            ></Table>
        </div>
        <div class="myPage">
            <Page
                v-show="showPage"
                :total="dataTotal"
                :current="pageNo"
                :page-size="_pageSize"
                :page-size-opts="pageSizeOpts"
                @on-change="pageChange"
                @on-page-size-change="pageSizeChange"
                show-sizer
                show-elevator
                show-total
            />
        </div>
        <Modal v-model="showCheckBoxFlag" :title="$t('modules_spoc_portal_modules_bigtable_3254')" width="600">
            <!-- <div style="overflow-y: scroll;" :style="{ height: columnTableHeight + 'px' }"> -->
            <div>
                <p>{{$t('modules_spoc_portal_modules_bigtable_3255')}}</p>
                <p>{{$t('modules_spoc_portal_modules_bigtable_3256')}}</p>
                <p>{{$t('modules_spoc_portal_modules_bigtable_3257')}}</p>
                <div style="display:flex;justify-content:flex-end;margin-bottom:8px;">
                    <Checkbox v-model="showScroll" @on-change="changeShowScroll">{{$t('bigTable_09231')}}</Checkbox>
                </div>
                <!-- :max-height="columnTableHeight" -->
                <Table :max-height="columnTableHeight" :columns="columns" :data="columnsForSetting" :draggable="true" @on-drag-drop="dragDrop" @on-selection-change="columnsSelectionChange">
                    <template slot-scope="{ row }" slot="title">
                        <span>{{ row.title }}</span>
                    </template>
                    <template slot-scope="{ row, index }" slot="width">
                        <InputNumber :min="1" :step="1" v-model="row.width" @on-change="changeWidth(row.width, index)"></InputNumber>
                    </template>
                    <template slot-scope="{ row, index }" slot="fixed">
                        <!-- <RadioGroup v-model="row.fixed" @on-change="changeFixed(row.fixed, index)">
                            <Radio :label="true"><span>锁定</span></Radio>
                            <Radio :label="false"><span>不锁定</span></Radio>
                        </RadioGroup> -->
                        <Checkbox v-model="row.fixed" @on-change="changeFixed(row.fixed, index)">{{$t('bigTable_09232')}}</Checkbox>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <div class="active_box"  style="cursor: pointer;">
                            <CommonIcon type="_bianzu6" :size="16" :style="{marginTop: '0px',display:'inline-block', verticalAlign: 'middle'}"/>
                        </div>
                    </template>
                </Table>
            </div>
            <div slot="footer">
                <Button @click="resetWidth">{{$t('modules_spoc_portal_modules_bigtable_3260')}}</Button>
                <Button @click="resetDefault">{{$t('modules_spoc_portal_modules_bigtable_3261')}}</Button>
                <!-- <Button @click="resetColumn">{{$t('modules_spoc_portal_modules_bigtable_3261')}}</Button> -->
                <Button @click="cancel">{{$t('classroom_allscore_53')}}</Button>
                <Button type="primary" @click="updateShowTitle">{{$t('classroom_allscore_54')}}</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
/**
 * @param tableName  可选项，表格名称 ,字符串或者数组。不写tableName 就必须写tableName的slot
 * @param tableColumnArray  数组，非必须项，需要修订的列集合，不需要加入全选列;操作列固定key名称为doAction;
 * @param tableData  数组，必须项，渲染列表数据
 * @param defaultShowCol  对象，必须项， 默认显示的列。包含结构示例
 *      {
 *          true:[{key:'',name:'', selected: '' ,required: ''}, ...]
 *          false:[{key:'',name:'', selected: '' ,required: ''}, ...]
 *      }
 * @param btnList  数组，列表顶部的按钮,数组中的元素为对象，也可以数组，如果是数组则渲染为可下拉的菜单，比如导出全部、导出所选
 *      示例 {
            style: {},   绑定按钮样式
            type: '',   按钮类型  参考iview Bytton 可支持的type
            btnClick: this.isExport,  点击按钮触发的事件
            text: '导出全部',   按钮显示文字
            value:'1',      可下来菜单所需，用于识别点击了哪个按钮
            parentName:'导出'  可下来菜单所需项，用于下拉菜单名称显示
        },
 * @param canSelection  布尔值，可选项，默认为false  表格是否支持多选
 * @param maxFlagForFixed  数值，可选项，默认为10  列数不足该数值是，忽略所有列的fixed设置，均不锁定
 * @param updateShowTitleMethod  方法，用于更新默认选中列
 * @param updateShowTitleKey  字符串，可选项, 用于更新默认选中列，传递参数pageIdentifier
 * @param showPage  布尔值，可选项，默认为true是否显示分页
 * @param dataTotal  数值，可选项，数据总数，如果需要显示分页则为必须项
 * @param pageSizeOpts  数组，可选项，分页，每页个数设置， 默认值[10, 20, 30, 40]
 * @param pageNo  数值，可选项，当前分页页码，如果需要显示分页则为必须项
 * @param isShowSelectTableColumn  布尔值，可选项，默认为true，是否显示选择可显示列
 * @param canChangeHeight  布尔值，可选项，默认为true，是否动态改变表格高度
 * @method selectionChange  方法，用于传递多选时的所选项
 * @method sortChange  方法，用于列排序的时候传递排序项
 * @method pageChange  方法，用于发生分页、或者发生每页个数修改设置时触发事件
 * @method changeTableType  方法，用于tab类型表头。发生tab切换时触发事件
 * @slot tableNameSlot  表格名称插槽
 * @slot buttonsAfterSlot  buttons后的插槽
 * @example <big-table
                v-if="defaultShowCol"
                class="mytable"
                tableName="我的表格"
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
                @changeTableType="changeTableType">
            </big-table>
 * @author Longwang
*/
import valid, { sysDict, errors } from '../libs/request';
import util from '@public/libs/js/util';
import { waitUntil, clone } from '@public/libs/util';
import CommonIcon from '_c/common-icon';
export default {
    props: {
        //表格名称
        tableName: {
            type: [String, Array]
        },
        //全部列集合
        tableColumnArray: {
            type: Array,
            required: true
        },
        //列表数据
        tableData: {
            type: Array,
            required: true
        },
        //默认列状态
        defaultShowCol: {
            type: Object,
            required: true
        },
        //table上侧按钮集合
        btnList: {
            type: Array
        },
        //是否可以支持多选
        canSelection: {
            type: Boolean,
            default: false
        },
        //不足指定列数则不锁定列
        maxFlagForFixed: {
            type: Number,
            default: 10
        },
        //更新显示列记录方法
        updateShowTitleMethod: {
            type: Function
        },
        //更新显示列关键字
        updateShowTitleKey: {
            type: String,
            default: ''
        },
        //分页每页个数
        pageSizeOpts: {
            type: Array,
            default: () => {
                return [20, 50, 100];
            }
        },
        dataTotal: {
            type: Number,
            default: 0
        },
        pageNo: {
            type: Number,
            default: 1
        },
        showPage: {
            type: Boolean,
            default: true
        },
        isShowSelectTableColumn: {
            type: Boolean,
            default: true
        },
        tableHeight: {
            type: [String, Number],
            default: ''
        },
        rowClassName: {
            type: Function
        },
        tableHeightOut: {
            type: [String, Number],
            default: ''
        },
        needFixed: {
            type: Boolean,
            default: false
        },
        canChangeHeight: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            showScroll: false,
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: this.$t('bigTable1'), //'列名',
                    slot: 'title'
                },
                {
                    title: this.$t('bigTable2'), //'列宽',
                    slot: 'width'
                },
                {
                    title: this.$t('bigTable_09233'), // 是否锁定

                    slot: 'fixed'
                },
                {
                    title: this.$t('modules_expandrow_23'), //'排序',
                    slot: 'action',
                    width: 70
                }
            ],
            isLoadingPage: false, //防止切换每页大小时重复加载
            nameType: this.tableName ? (Array.isArray(this.tableName) ? this.tableName[0].value : '') : '',
            _pageNo: 1,
            _pageSize: 20,
            showCheckBoxFlag: false, //是否显示选择列窗口
            tableColumns: [], //表格最终绑定列
            mainBodyHeight: '',
            actualHeight: 0,
            sixTrHeight: 0,
            filterObj: {},
            filtersKeys: {}, //  key为列表的key value为 改列需要筛选的备选项字典
            batchListData: [], // 字典项结果集
            columnsForSetting: [],
            columnsForSettingInit: [],
            selectionKey: [],
            canCancelSCroll: false,
        };
    },
    components: {CommonIcon},
    computed: {
        columnTableHeight() {
            return document.body.offsetHeight * 0.6;
        },
        tableFilterInitObj() {
            //返回一个filtersKey的 map
            let _obj = {};
            this.tableColumnArray.forEach(item => {
                if (item.filtersKey) {
                    _obj[item.key] = item.filtersKey;
                }
            });
            return _obj;
        },
        tableColumnArrayToObj() {
            //返回一个修订map。key为修订列数组中那个每个元素的key, value为修订列数组中那个每个元素
            let _obj = {};
            this.tableColumnArray.forEach(item => {
                delete item.fixed;
                _obj[item.key] = item;
            });
            return _obj;
        },
        _tableHeight() {
            let num = 480;
            // 设置了固定的高度，直接展示
            if (this.tableHeight) {
                num = this.tableHeight;
            } else if (!this.tableHeight && this.tableHeightOut) {
                // 未定义高度，且有自适应外部高度时
                // 数据少于等于6条，高度不控制
                if (this.tableData.length <= 6) {
                    num = null;
                } else {
                    // 分页
                    // let hasPage = (this.showPage && ((this.dataTotal/this._pageSize) > 1)) ? 65: 32
                    let hasPage = 65 - 16;
                    /**
                     * __maxHeight__: 页面能用来显示table的实际高度
                     * 48 + 12为表格名称的高度
                     * 16: margin-top的高度
                     * 40: 表头的高度
                     * 6: 滚动条的高度
                     * this.actualHeight: table实际数据渲染的高度
                     * this.sixTrHeight: 6条数据占的实际高度
                     */
                    let __maxHeight__ = this.mainBodyHeight - this.tableHeightOut - hasPage - 48 - 12 - 16 - 6;
                    // console.log(__maxHeight__ > this.actualHeight)
                    num = __maxHeight__ > this.actualHeight ? '' : __maxHeight__ < this.sixTrHeight ? this.sixTrHeight : __maxHeight__;
                }
            }
            // console.log('finnaly', num)
            return num;
        }
    },
    mounted() {
        this.selectionKey = [];
        this.init();
        this.initMainBodyHeight();
        window.onresize = () => {
            this.initMainBodyHeight();
        };
        waitUntil(
            () => {
                this.actualHeightFun();
                return !!this.actualHeight;
            },
            () => {},
            () => {},
            300,
            100
        );
    },
    destroyed() {
        window.onresize = null;
    },
    methods: {
        changeShowScroll(val){
            console.log(val)
            if(val){
                // console.log(JSON.stringify(this.columnsForSetting))
                this.columnsForSetting.forEach(item => {
                    if(!item.width){
                        item.width = 36 + util.getBytesCount2(item.title) * 12
                        if(item.filtersKey || (item.filters && item.filters.length)){
                            item.width = item.width + 12
                        }
                        if(!item.sortable){
                            item.width = item.width + 12
                        }
                    }
                });
            } else {
                this.columnsForSetting.forEach(item => {
                    item.width = null
                });
            }
        },
        resizeWidth(newWidth, oldWidth, column, event) {
            this.columnsForSetting.forEach(item => {
                if (item.name == column.name) {
                    item.width = newWidth;
                }
            });
            this.updateShowTitle('resizeWidth');
        },
        columnsSelectionChange(columnsSelection) {
            this.selectionKey = columnsSelection.map(item => {
                return item.name;
            }); // 已选中的key  name key相等
            this.columnsForSetting.forEach((item, index) => {
                if (this.selectionKey.indexOf(item.name) >= 0) {
                    item.selected = true;
                    item._checked = true;
                } else {
                    item.selected = false;
                    item._checked = false;
                }
            });
        },
        changeWidth(val, index) {
            this.$set(this.columnsForSetting[index], 'width', val);
        },
        changeFixed(val, index) {
            if(val){
                this.showScroll = true
            }
            this.$set(this.columnsForSetting[index], 'fixed', val);
        },
        cancel() {
            this.resetColumn();
            this.showCheckBoxFlag = false;
        },
        resetWidth() {
            let _array = []
            this.columnsForSettingInit.forEach(item=>{
                _array.push(Object.assign({},item))
            })
            this.columnsForSetting = _array;
            this.columnsForSetting.forEach(item => {
                item.width = null;
                item.fixed = false;
                item.scrolled = false;
            });
            this.updateShowTitle();
        },
        resetColumn() {
            console.log(this.columnsForSettingInit);
            let _array = []
            this.columnsForSettingInit.forEach(item=>{
                _array.push(Object.assign({},item))
            })
            this.columnsForSetting = _array;
        },
        dragDrop(index1, index2) {
            let columnsForSettingCopy = [].concat(this.columnsForSetting);
            let obj = columnsForSettingCopy[index1];
            columnsForSettingCopy.splice(index1, 1);
            columnsForSettingCopy.splice(index2, 0, obj);
            columnsForSettingCopy.forEach((item, index) => {
                item.sort = index; // 重新排序
            });
            this.columnsForSetting = columnsForSettingCopy;
            console.log(this.columnsForSetting, 'this.columnsForSetting~~~~~');
        },
        resetFilter() {
            // 所有筛选项清空
            this.filterObj = {};
            let tableColumnsCopy = [].concat(this.tableColumns);
            tableColumnsCopy.forEach(item => {
                delete item.filteredValue;
            });
            this.tableColumns = tableColumnsCopy;
        },
        filterChange(val) {
            this.filterObj[val.key] = val._filterChecked;
            let newFilterObj = {};

            let tableColumnsCopy = [].concat(this.tableColumns);
            tableColumnsCopy.forEach(item => {
                if (this.filterObj[item.key] && this.filterObj[item.key].length) {
                    item.filteredValue = this.filterObj[item.key];
                    if (item.sysProps) {
                        newFilterObj[item.sysProps] = this.filterObj[item.key].join(',');
                    } else {
                        // 没有item.sysProps 则认为是动态表单的筛选。返回一个属性fieldJsonData的对象
                        if (newFilterObj.fieldJsonData) {
                            newFilterObj.fieldJsonData[item.key] = this.filterObj[item.key];
                        } else {
                            newFilterObj.fieldJsonData = {};
                            newFilterObj.fieldJsonData[item.key] = this.filterObj[item.key];
                        }
                    }
                } else {
                    delete item.filteredValue;
                }
            });
            this.tableColumns = tableColumnsCopy;
            // this.$emit('filterChange', this.filterObj);
            this.$emit('filterChange', newFilterObj);
        },
        onRowClick(row, index) {
            this.$emit('onRowClick', row, index);
        },
        resetDefault(){
            this.$emit('resetDefault');
        },
        resetTabvalFn(val) {
            if (val == 1) {
                this.nameType = this.tableName[0].value;
            } else {
                this.nameType = this.tableName[1].value;
            }
        },
        actualHeightFun() {
            // table实际渲染高度
            if (
                document.getElementById('bigTableMiddle') &&
                document.getElementById('bigTableMiddle').getElementsByTagName('table') &&
                document.getElementById('bigTableMiddle').getElementsByTagName('table').length &&
                document.getElementById('bigTableMiddle').getElementsByTagName('table')[1].offsetHeight > 0
            ) {
                this.actualHeight = document.getElementById('bigTableMiddle').getElementsByTagName('table')[1].offsetHeight;
            }

            // 计算6条数据占的实际高度
            let __sixTrHeight__ = 36; // 36是thead的高度
            if (
                document.getElementById('bigTableMiddle') &&
                document.getElementById('bigTableMiddle').getElementsByTagName('tbody') &&
                document.getElementById('bigTableMiddle').getElementsByTagName('tbody').length &&
                document.getElementById('bigTableMiddle').getElementsByTagName('tbody')[0].children &&
                document.getElementById('bigTableMiddle').getElementsByTagName('tbody')[0].children.length > 6
            ) {
                let __dom__ = document.getElementById('bigTableMiddle').getElementsByTagName('tbody')[0].children;
                for (let i = 0; i < 6; i++) {
                    // console.log(__dom__[i].offsetHeight)
                    __sixTrHeight__ += __dom__[i].offsetHeight;
                }
            }
            this.sixTrHeight = __sixTrHeight__;
            // console.log('6条数据占的实际高度', __sixTrHeight__)
            // console.log('actualHeight', this.actualHeight)
        },
        initMainBodyHeight() {
            // console.log(document.getElementById('mainBody').offsetHeight - 16 * 2)
            this.mainBodyHeight = document.body.offsetHeight - (50 + 38) - 16 * 2;
        },
        initItem(item, filtersKeys, required) {
            if (item.filtersKey) {
                // 收集filtersKeys
                filtersKeys[item.name] = item.filtersKey;
            }
            if (item.filtersKey || (item.filters && item.filters.length)) {
                // 收集filtersKeys
                item.filterRemote = () => {};
            }
            if (item.sortable && item.sortable !== 'false') {
                item.sortable = 'custom';
            }
            if (required) {
                item._disabled = true; // 默认必选项.并且不可取消
                item._checked = true; // 默认选中状态
                this.selectionKey.push(item.name);
            } else if (item.selected) {
                item._checked = true; // 默认选中状态
                this.selectionKey.push(item.name);
            } else {
                item._checked = false;
            }
            item.key = item.name;
            item.resizable = true; //为了表格可拖拽宽度
            // if(!item.width){
            //     item.width = 36 + util.getBytesCount2(item.title) * 12
            //     if(item.filtersKey || (item.filters && item.filters.length)){
            //         item.width = item.width + 12
            //     }
            //     if(item.sortable == 'custom'){
            //         item.width = item.width + 12
            //     }
            // }
            item.fixed = item.fixed ? true : false
            return item;
        },
        init() {
            let filtersKeys = {}; // 收集filtersKeys
            let columnsForSetting = [];
            if (this.defaultShowCol.true && this.defaultShowCol.true.length) {
                this.defaultShowCol.true.forEach((item,index) => {
                    if(index == 0){
                        this.showScroll = item.scrolled ? true : false // 默认值可能为null
                    }
                    item = this.initItem(item, filtersKeys, true);
                    columnsForSetting.push(item);
                });
            }

            if (this.defaultShowCol.false && this.defaultShowCol.false.length) {
                this.defaultShowCol.false.forEach(item => {
                    item = this.initItem(item, filtersKeys, false);
                    columnsForSetting.push(item);
                });
            }

            this.columnsForSetting = columnsForSetting.sort((a, b) => {
                return a.sort - b.sort;
            });
            this.columnsForSettingInit = [];
            this.columnsForSetting.forEach((item)=>{
                this.columnsForSettingInit.push(Object.assign({},item))
            })

            console.log(this.columnsForSetting, 'this.columnsForSetting~~~~~`');

            this._pageNo = 1;
            this._pageSize = this.$store.state.app.pageSizeGlobal; // this.pageSizeOpts[0]
            this.pageSizeOpts = this.$store.state.app.pageOptGlobal; // this.pageSizeOpts[0]

            this.filtersKeys = Object.assign(filtersKeys, this.tableFilterInitObj); // 合并默认筛选和自定义筛选

            let filtersKeysValues = Object.values(this.filtersKeys);
            if (filtersKeysValues && filtersKeysValues.length) {
                // 如果有字典项，则查询字典
                sysDict
                    .batchListData({
                        types: filtersKeysValues.join(',')
                    })
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            this.batchListData = res.data.data;
                            this.changeTableColumns();
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {});
            } else {
                this.changeTableColumns();
            }
        },
        changeTableType(val) {
            this.tableColumns = [];
            this.$emit('changeTableType', val);
        },
        hideCheckBox() {
            this.showCheckBoxFlag = false;
        },
        showCheckBox() {
            this.showCheckBoxFlag = !this.showCheckBoxFlag;
            if (this.showCheckBoxFlag) {
                this.canCancelSCroll = true
            }
        },
        //更新记录显示列
        updateShowTitle(isResize) {
            if (isResize != 'resizeWidth') {
                this.changeTableColumns();
            }

            // if((!this.showScroll) && this.canCancelSCroll){
            //     this.canCancelSCroll = false // 防止重复循环执行的标志
            //     this.resetWidth()
            //     return false
            // }
            this.columnsForSettingInit = [].concat(this.columnsForSetting);
            this.columnsForSettingInit.forEach(item=>{
                item.scrolled = this.showScroll
            })

            let updateShowTitleMethod;
            if (this.updateShowTitleKey && this.updateShowTitleMethod) {
                updateShowTitleMethod = this.updateShowTitleMethod(this.updateShowTitleKey, this.columnsForSetting);
            } else if(this.updateShowTitleMethod) {
                updateShowTitleMethod = this.updateShowTitleMethod(this.columnsForSetting);
            }
            if(updateShowTitleMethod){
                updateShowTitleMethod
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {});
            }
            this.showCheckBoxFlag = false;
        },
        //补充每一列的信息
        editColumn(item) {
            if (this.tableColumnArrayToObj[item.key]) {
                let _item = this.tableColumnArrayToObj[item.key];
                if (_item.render) {
                    item.render = _item.render;
                }
                if (_item.className) {
                    item.className = _item.className;
                }
                if (_item.align) {
                    item.align = _item.align;
                }
            }
            return item;
        },
        noFalse(data) {
            if (typeof data != 'undefined' && data != null && data !== '') {
                return true;
            } else {
                return false;
            }
        },
        //获取需要显示的列头
        changeTableColumns() {
            let data = [];

            let selectedAarray = this.columnsForSetting.filter(item => {
                return item.selected == true;
            });
            let widthTotal = 0;
            selectedAarray.forEach((item, index) => {
                widthTotal = widthTotal + item.width;
            });

            let hasFixed = false;

            this.columnsForSetting.forEach((item, index) => {
                let _item = Object.assign({}, this.editColumn(item));
                // if (!_item.render) {
                if (_item.dynamiced && !_item.render) {
                    _item.render = (h, params) => {
                        return h(
                            'div',
                            {
                                style: {
                                    /* 'word-break': 'break-word' */
                                }
                            },
                            _item.dynamiced
                                ? params.row.fieldJsonData && this.noFalse(params.row.fieldJsonData[_item.key])
                                    ? params.row.fieldJsonData[_item.key]
                                    : '-'
                                : this.noFalse(params.row[_item.key])
                                ? params.row[_item.key]
                                : '-'
                        );
                    };
                }

                if (_item.filtersKey) {
                    // 如果有筛选字典。则渲染筛选下拉
                    let batchKey = this.filtersKeys[_item.key];
                    _item.filters = this.batchListData[batchKey];
                }


                console.log(document.getElementsByClassName('newTable')[0].offsetWidth ,"~~~asdasd~~~", widthTotal)
                if (this.showScroll) {
                    if(_item.width){
                        _item.minWidth = _item.width
                        delete _item.width
                    }
                } else if(document.getElementsByClassName('newTable')[0].offsetWidth > widthTotal){
                    if(_item.width){
                        _item.minWidth = _item.width
                        delete _item.width
                    }
                }

                if (_item.fixed) {
                    _item.fixed = 'left'
                    if(_item.width){
                        _item.minWidth = _item.width
                        delete _item.width
                    }
                    hasFixed = true
                }

                if (_item.selected) {
                    data.push(_item);
                }
            });
            console.log(hasFixed,"hasFixed~~")

            let doAction = this.tableColumnArrayToObj.doAction;
            if (doAction) {
                doAction.fixed = (hasFixed && this.showScroll) ? 'right' : ''
                data.push(doAction);
            }
            if (this.canSelection) {
                data.unshift({
                    fixed: (hasFixed && this.showScroll) ? 'left' : '',
                    type: 'selection',
                    width: 35,
                    align: 'center'
                    // fixed: this.needFixed && window.screen.width < 1920 && this.selectionKey.length > this.maxFlagForFixed ? 'left' : ''
                });
            }
            this.tableColumns = clone(data);
            console.log('-------tableColumns----------');
            console.log(this.tableColumns);
            console.log('-------tableColumns----------');
            this.$nextTick(() => {
                this.actualHeightFun();
            });
        },
        selectionChange(selection) {
            this.$emit('selectionChange', selection);
        },
        sortChange(sortObj) {
            this.$emit('sortChange', sortObj);
        },
        pageChange(pageNo) {
            this._pageNo = pageNo;
            if (!this.isLoadingPage) {
                //防止切换每页大小时重复加载
                this.$emit('pageChange', this._pageNo, this._pageSize);
                this.isLoadingPage = true;
                setTimeout(() => {
                    this.isLoadingPage = false;
                }, 100);
            }
        },
        pageSizeChange(pageSize) {
            this._pageSize = pageSize;
            this.pageChange(1);
        }
    },
    watch: {
        //针对tab类型列表，切换tab时，修改对应的defaultShowCol。来实现重新渲染列表
        defaultShowCol: function(newVal) {
            this.init();
        },
        tableColumnArray: function(newVal) {
            this.init();
        },
        tableData: {
            handler(val, oval) {
                this.$nextTick(() => {
                    this.actualHeightFun();
                });
            },
            deep: true
        }
    }
};
</script>
