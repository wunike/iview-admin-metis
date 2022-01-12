<style lang="less">
.pubS {
    font-size: 14px;
    font-family: HiraginoSansGB-W3;
    font-weight: normal;
    color: rgba(153, 153, 153, 1);
}
.chooseOne {
    .search {
        // margin-top: 30px;
        margin-bottom: 20px;
        display: flex;
        > div:nth-child(1) {
            width: 70px;
            line-height: 32px;
            .pubS;
        }
        > div:nth-child(2) {
            width: 400px;
        }
        & + .nothingStudent {
            display: flex;
            justify-content: center;
            margin: 4px auto 8px !important;
            text-align: center;
            font-size: 14px;
            font-family: HiraginoSansGB-W3;
            font-weight: normal;
            color: rgba(73, 80, 96, 1);
            > div {
                display: flex;
                flex-direction: column;
                > img {
                    width: 200px;
                    height: 148px;
                    border: 1px dashed #999999;
                }
            }
        }
    }
    > div:not(.search) {
        margin-bottom: 10px;
    }
    .choolsere-search-content {
        position: relative;
        // display: flex;
        // justify-content: flex-start;
        // align-items: center;
        height: 50px;line-height: 50px;
        background: rgba(250, 250, 250, 1);
        border: 1px solid rgba(232, 232, 232, 1);
        .ivu-radio-wrapper {
            float: left;
            margin-left: 22px;margin-right: 8px;
        }
        .refundName {
            float: left;
            width: 190px;
        }
        .refundNum {
            float: left;width: 170px + 8px + 24px + 73px;
            > span:nth-child(2) {
                margin-left: 8px;
                margin-right: 43px;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                cursor: pointer;
            }
        }
        .signTime{
            float: left;width: 130px;
        }
        .refundPerson {
            float: left;
        }
        .toggleI {
            cursor: pointer;
            position: absolute;padding: 0 10px;
            right: 10px;
            top: 0;line-height: 48px;
            font-size: 22px;color: #999;
            .toggleIcon {
                transform: rotate(180deg);
            }
        }
    }
    .ivu-table-wrapper {
        margin-top: 0 !important;
        border-top: none;width: 100%;top: -1px;
        .ivu-checkbox-wrapper{
            float: left;margin-left: 22px;
        }
    }
    .pageStyle {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 22px;
    }
    .ivu-select-item{
        zoom: 1;
        &::before, &::after{
            content: "";
            display: block;clear: both;height: 0;line-height: 0;font-size: 0;
        }
    }
    .no-student{
        padding-top: 24px;
        img{
            display: block;margin: 0 auto;
            width: 200px;
        } p{
            font-size: 14px;text-align: center;
        }
    }
    .ivu-table-cell{
        padding: 0;
    }
    .choose-table .ivu-table th {
        height: 100%;
    }
}
</style>
<template>
    <div class="chooseOne">
        <div class="search">
            <div>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_4998')}}</div>
            <Select
                v-model="student"
                filterable
                ref="selectStudent"
                :disabled="disabled"
                remote
                 :placeholder="$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_4999')"
                :remote-method="remoteMethod"
                :loading="loadingStudent"
                @on-change="choicesStudent">
                <Option v-for="option in studentNameLists" :value="option.id" :key="option.id" :label="option.name">
                    <span class="fl">{{option.name}}</span>
                    <span class="fr" style="color:#ccc;">{{option.phone}}</span>
                </Option>
            </Select>
        </div>
        <div v-for="(item,index) in itemList" v-if="itemList.length" :key="index">
            <div class="choolsere-search-content">
                <Radio v-model="item.check" @on-change="CheckboxChange(index, item)"></Radio>
                <div class="refundName color44bcb7">
                    <span v-if="!item.name">--</span>
                    <span v-if="item.name && item.name.length < 12">{{item.name}}</span>
                    <Tooltip v-else-if="item.name && item.name.length >= 12" :content="item.name" max-width="200">{{item.name.substring(0,12)}}</Tooltip>
                </div>
                <div class="refundNum">{{$t('modules_spoc_sign_web_src_modules_preview_4895')}}<span v-if="(showNumB&&editIndex===index)">{{ item.ctNo ? item.ctNo : '-' }}</span>
                    <span v-else>{{item.ctNo ? item.ctNo.substr(0,4)+'***********'+item.ctNo.substr(-2,2) : '-'}}</span>
                    <span @click="showNum(item.ctNo, index)" class="color44bcb7" v-if="item.ctNo">{{ (showNumB&&editIndex===index) ? $t('modules_expandrow_14') : $t('courselist_compontents_servicecontent_219') }}</span>
                </div>
                <div class="signTime">{{$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_5003')}} {{ item.signTime ? item.signTime : '-' }}</div>
                <div class="refundPerson">{{$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_5004')}} {{ item.sellerName ? item.sellerName : '-' }}</div>
                <div class="toggleI" @click="toggleIconHandle(index)" v-if="item.courseInfoVOList && item.courseInfoVOList.length">
                    <Icon type="ios-arrow-up" v-if="closeIndexs.indexOf(index) == -1"/>
                    <Icon type="ios-arrow-down" v-else/>
                </div>
            </div>
            <Table 
                border 
                :columns="columns0" 
                :data="item.courseInfoVOList" 
                style="margin-top:20px;" 
                class="choose-table"
                v-if="closeIndexs.indexOf(index) == -1">
            </Table>
        </div>
        <div v-if="itemList.length == 0" class="no-student">
            <img src="../../../assets/images/empty.png" alt="">
            <p>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_5005')}}</p>
        </div>
        <div class="pageStyle" v-if="itemList.length">
            <Page :current="pageNo"
                size="small"
                v-if="pageCount > 1"
                :total="count"
                show-elevator show-total show-sizer
                :page-size="pageSize"
                @on-change="pageChange"
                @on-page-size-change="sizeChange">
            </Page>
        </div>
    </div>
</template>
<script>
import { mapMutations } from "vuex";
import inputSelect from "@public/modules/inputSelect";
import valid, { errors, sysCommonSql, htContract, common } from "../../../libs/request";
export default {
    components: {
        inputSelect
    },
    data() {
        return {
            disabled: false,
            student: '',
            studentName: '',
            studentNameLists: [],
            loadingStudent: false,
            timer: null,
            pageNo: 1,
            pageSize: 5,
            count: 0,
            itemList: [{}],
            showNumB: false,
            editIndex: -1, // 当前聚焦的输入框的行数
            closeIndexs: [], // 未展开的合同 index 集合
            classShowTipBoo: true,
            toggleIcon: false,
            single: true,
            changed: false,
            initContract: {},
            columns0: [
                {
                    title: " ",
                    align: "center",
                    width: 46,
                    key: "checkBox",
                    render: (h, params) => {
                        let _this = this;
                        let _checkBox = false;
                        if(params.row.checkBox) _checkBox = true;
                        return h("div", [
                            h("Radio", {
                                props: {
                                    // value: params.row.checkBox,
                                    value: _checkBox,
                                    disabled: params.row.status == 'paying'
                                },
                                on: {
                                    "on-change": e => {
                                        _this.changeCheckBox(e, params.row)
                                    }
                                }
                            })
                        ]);
                    }
                },
                {
                    title: this.$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_5006'),
                    key: "courseName",
					resizable: true,
					width: null,
                    render: (h, params) => {
                        return h("div", params.row.courseName || '-');
                    }
                },
                {
                    title: this.$t('views_coursepack_coursepack_379'),
                    key: "courseHourNum",
					resizable: true,
                    width: 60,
                    render: (h, params) => {
                        return h("div", params.row.courseHourNum || '0');
                    }
                },
                {
                    title: this.$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_5008'),
                    key: "costNum",
					resizable: true,
					width: null,
                    render: (h, params) => {
                        return h("div", params.row.costNum || '0');
                    }
                },
                {
                    title: this.$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2134'),
                    key: "leftCourseHour",
					resizable: true,
					width: 66,
                    render: (h, params) => {
                        return h("div", params.row.leftCourseHour || '0');
                    }
                },
                {
                    title: this.$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_5010'),
                    key: "coursePrice",
					resizable: true,
					width: null,
                    render: (h, params) => {
                        return h("div", params.row.coursePrice ? this.formatNums(params.row.coursePrice) : '-');
                    }
                },
                {
                    title: this.$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_5011'),
                    key: "publicUnitPrice",
					resizable: true,
					width: null,
                    render: (h, params) => {
                        return h("div", params.row.publicUnitPrice ? this.formatNums(params.row.publicUnitPrice) : '-');
                    }
                },
                {
                    title: this.$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_5012'),
                    key: "courseUnitPrice",
					resizable: true,
					width: null,
                    render: (h, params) => {
                        return h("div", params.row.courseUnitPrice ? this.formatNums(params.row.courseUnitPrice) : '-');
                    }
                },
                {
                    title: this.$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_5013'),
                    key: "refundAmount",
					resizable: true,
					width: null,
                    render: (h, params) => {
                        return h("div", params.row.refundAmount ? this.formatNums(params.row.refundAmount) : '-');
                    }
                },
                {
                    title: this.$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_5014'),
                    key: "teacherName",
					resizable: true,
					width: null,
                    render: (h, params) => {
                        return h("div", params.row.teacherName || '-');
                    }
                },
                {
                    title: this.$t('mycourse_mycourse_374'),
                    key: "classTeacherName",
					resizable: true,
					width: null,
                    render: (h, params) => {
                        return h("div", params.row.classTeacherName || '-');
                    }
                }
            ],
            studentIdCopy: '',
            needNext: false,
            id: '',
            ctId: ''
        };
    },
    methods: {
        initParams(params, callback) {
            // 从我的合同审批 - 详情 - 重新提交 - 初始化
            this.needNext = true;
            this.id = params.comAuditFlow && params.comAuditFlow.objectUnitIds || ''
            this.ctId = params.ctId || ''
            this.choicesStudent(params.studentId, callback)
        },
        init(contract) {
            this.id = '';
            this.needNext = false;
            this.disabled = true;
            this.pageNo = 1;
            this.count = 0;
            this.getStudentLists(contract.studentName, () => {
                this.choicesStudent(contract.studentId);
            });
            // this.student = contract.studentId;
            this.student = contract.studentId;
            this.studentIdCopy = contract.studentId;
            this.studentName = contract.studentName;
            this.initContract = contract;
        },
        reset() {
            this.studentIdCopy = '';
            this.$refs.selectStudent.query = ''
            this.disabled = false;
            this.initContract = {};
            this.editIndex = -1;
            this.pageNo = 1;
            this.count = 0;
            this.student = '';
            this.studentName = '';
            this.studentNameLists = [];
            this.itemList = [{}];
        },
        remoteMethod(query) {
            if (query !== '') {
                this.loadingStudent = true;
                this.debounce(query);
                
            } else {
                this.studentNameLists = [];
            }
        },
        debounce(query) {
            // 防抖 500ms内没有输入文字，才开始查询，防止多次发起请求
            if(this.timer) {
                clearTimeout(this.timer);
                this.timer = null; 
            }
            this.timer = setTimeout(() => { 
                this.getStudentLists(query);
            }, 1000); 
        },
        getStudentLists(str, callback) {
            if(str != this.studentIdCopy) {
                let params = {
                    name: str
                }
                common.listByOfficeIdAndName(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.loadingStudent = false;
                        let _data = res.data.data;
                        this.studentNameLists = _data;
                        callback && callback();
                    }
                })
                .catch(errors.call(this));
            }
            
        },
        choicesStudent(id, callback) {
            // console.log(item)
            let _student = [];
            if(id) {
                this.student = id;
                _student = this.studentNameLists.filter(function(item){
                    return item.id == id; 
                })
                if(_student && _student.length) {
                    // this.$refs.selectStudent.setQuery(_student[0].name);
                    this.studentName = _student[0].name;
                }
            }
            else return false;
            // console.log(this.student)
            this.changed = true;
            this.$emit('changeStudent', _student[0]);
            let params = {
                studentId: this.student,
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                statusFlag: 2,
                status: 'paying,normal'
            }
            htContract.listContractsWithJwTeacher(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    let _data = res.data.data;
                    this.count = _data.total;
                    this.formatLists(_data.list, callback);
                    // console.log(_data)
                }
            })
            .catch(errors.call(this));
        },
        formatLists(_lists, callback) {
            if(_lists && _lists.length) {
                let curCtId = '';
                if(this.initContract.ctId) curCtId = this.initContract.ctId;
                if(this.ctId) curCtId = this.ctId;
                _lists.forEach(e => {
                    e.check = curCtId && e.ctId == curCtId ? true : false;
                    if(e.courseInfoVOList && e.courseInfoVOList.length) {
                        e.courseInfoVOList.forEach(child => {
                            child.status = e.status;
                            child.ctId = e.ctId;
                            // child.checkBox = false
                            // child.checkBox = curCtId && e.ctId == curCtId ? true : false;
                            if(this.needNext) {
                                if(child.studentCourseId == this.id) {
                                    child.checkBox = true;
                                }
                            } else {
                                child.checkBox = false;
                            }
                        });
                    }
                });
                this.itemList = _lists;   
                // console.log(this.itemList)
                callback && callback();
            } else {
                this.itemList = [{}]
            }
        },
        changeCheckBox(status, item) {
            // 先把列表对应的状态修改
            this.changed = true;
            // 把合同名称前面的单选框全部置为 false
            this.itemList.forEach(inner => {
                inner.check = inner.ctId == item.ctId ? true : false;
                // 找出当前课程包所属的合同
                // 非当前合同的课程包的单选框全部置为 false
                inner.courseInfoVOList.forEach(_list => {
                    _list.checkBox = _list.id == item.id ? true : false;
                });
            });


            // let _item = this.itemList.filter(function(item){
            //     return item.ctId == item.ctId; 
            // });
            // if(_item && _item.length) {
            //     _item[0].courseInfoVOList[item._index].checkBox = status;
            //     // 看看是否全选
            //     let _count = _item[0].courseInfoVOList.length;
            //     let _num = 0;
            //     _item[0].courseInfoVOList.forEach(e => {
            //         if(e.checkBox) _num++;
            //     });
            //     if(_num == 0) {
            //         _item[0].check = false;
            //     } else if(_num == _count) {
            //         _item[0].check = true;
            //     } else {
            //         _item[0].check = false;
            //     }
            // }
        },
        toggleIconHandle(index) {
            // 合同展开收起状态
            if(this.closeIndexs.indexOf(index) > -1) {
                // 展开
                this.closeIndexs.splice(this.closeIndexs.indexOf(index), 1);
            } else {
                // 收起
                this.closeIndexs.push(index);
            }
            this.editIndex = index;
        },
        showNum(ctNo, index) {
            // 合同编号查看隐藏
            if(ctNo) {
                this.showNumB = !this.showNumB;
                this.editIndex = index;
            }
        },
        CheckboxChange(index, item) {
            // 选择合同
            this.changed = true;
            // 只能选择一个合同
            this.itemList.forEach(inner => {
                if(inner.ctId != item.ctId) {
                    inner.check = false;
                    inner.courseInfoVOList.forEach(_list => {
                        _list.checkBox = false;
                    });
                }
            });
        },
        onNext() {
            if(this.changed) {
                this.changed = false;
                let params = {
                    studentId: this.student,
                    studentName: this.studentName
                }
                let _htReceiptDetailList = [];
                if(this.itemList && this.itemList.length && this.itemList[0].ctId) {
                    this.itemList.forEach(list => {
                        // 判断选择退款的合同
                        console.log('list', list)
                        if(list.check) {
                            params.category = list.category;
                            params.ctId = list.ctId;
                            params.ctNo = list.ctNo;
                            params.officeId = list.officeId;
                            params.receiptOutOfficeId = list.receiptOutOfficeId;
                            params.receiptOutUserId = list.receiptOutUserId;
                            params.status = list.status;
                        
                            let _subtractor = 0;
                            // 判断当前合同的 status 是否为 paying
                            if(list.status == 'paying') {
                                list.courseInfoVOList.forEach(child => {
                                    _subtractor += Number(child.costNum) * Number(child.publicUnitPrice);
                                    _htReceiptDetailList.push({
                                        studentCourseId: child.studentCourseId,
                                        studentId: list.studentId,
                                        ctId: list.ctId,
                                        itemId: child.id,
                                        itemName: child.courseName,
                                        itemNum: child.leftCourseHour,
                                        itemUnitPrice: child.publicUnitPrice,
                                        itemPrice: child.refundAmount, //Number(child.coursePrice) - (Number(child.costNum) * Number(child.publicUnitPrice)),
                                        costHours: child.costNum,
                                        courseAmount: child.coursePrice,
                                        // 新增
                                        itemType: child.courseType,
                                        itemGrade: child.courseGrade,
                                        itemBuyNumTotal: child.courseHourNum,
                                        itemPresentNumTotal: child.itemPresentNumTotal,
                                        itemPresentNumLeft: child.itemPresentNumLeft,
                                        // 禅道721变更
                                        publicUnitPrice: child.publicUnitPrice, // 课时单价
                                        courseUnitPrice: child.courseUnitPrice, // 折后单价
                                        refundableAmount: child.refundableAmount, // 可退金额
                                        refundAmount: child.refundAmount, // 应退金额
                                    });
                                });
                                let _itemPrice = (Number(list.signPrice) - Number(list.sparePrice)) - _subtractor
                                // console.log(_itemPrice)
                                params.signPrice = list.signPrice;
                                params.sparePrice = list.sparePrice;
                                params.countMoney = _itemPrice;
                            } else if(list.courseInfoVOList && list.courseInfoVOList.length) {
                                list.courseInfoVOList.forEach(child => {
                                    if(child.checkBox) {
                                        if(child.status == 'paying' && child.costNum != 0) {
                                            _subtractor += Number(child.costNum) * Number(child.publicUnitPrice)
                                        }
                                        _htReceiptDetailList.push({
                                            studentCourseId: child.studentCourseId,
                                            studentId: list.studentId,
                                            ctId: list.ctId,
                                            itemId: child.id,
                                            itemName: child.courseName,
                                            itemNum: child.leftCourseHour,
                                            itemUnitPrice: child.publicUnitPrice,
                                            itemPrice: child.refundAmount, //Number(child.coursePrice) - (Number(child.costNum) * Number(child.publicUnitPrice)),
                                            costHours: child.costNum,
                                            courseAmount: child.coursePrice,
                                            // 新增
                                            itemType: child.courseType,
                                            itemGrade: child.courseGrade,
                                            itemBuyNumTotal: child.courseHourNum,
                                            itemPresentNumTotal: child.itemPresentNumTotal,
                                            itemPresentNumLeft: child.itemPresentNumLeft,
                                            // 禅道721变更
                                            publicUnitPrice: child.publicUnitPrice, // 课时单价
                                            courseUnitPrice: child.courseUnitPrice, // 折后单价
                                            refundableAmount: child.refundableAmount, // 可退金额
                                            refundAmount: child.refundAmount, // 应退金额
                                        })
                                    }
                                });
                            }
                        }
                    });
                }
                params.htReceiptDetailList = _htReceiptDetailList;
                console.log('chooese', params)
                return params;
            }
            else return false;
        },
        formatNums(val){
            //格式化数字
            // if(val !== undefined){
            //     let newNum = Number(val).toFixed(2).toString();
            //     let prev = newNum.split('.')[0]
            //     let next = newNum.split('.')[1]
            //     prev = prev.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
            //     newNum = prev+'.'+ next;
            //     return newNum;
            // }
            return val || 0;
        },
    }
};
</script>
