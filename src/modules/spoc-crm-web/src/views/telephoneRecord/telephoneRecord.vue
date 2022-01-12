<style lang="less">
    .telephone-record{
        .mytable {
            width: 100%;
            background: rgba(255, 255, 255, 1);
            border-radius: 4px;
            padding: 0 16px;
            margin-top: 10px;
            .iconfonthover:hover {
                color: #44bcb7;
            }
            .icon-zanting2 {
                color: #44bcb7;
            }
        }
        .table-name-slot-style {

            .content{
                /*margin-left: -16px;*/
                font-family:PingFangSC-Regular,PingFang SC;
                margin-bottom:-7px;
                font-size: 12px;
                font-weight: 600;
                > a {
                    font-weight: normal;
                    font-size: 16px;
                    /*color: #44bcb7;*/
                }
            }

        }
    }

</style>
<template>
    <div class="telephone-record">
        <v-search-collapse
            @search="SearchList"
            @reset="resetSearch"
            @changeDivHeight="changeDivHeight"
        >
            <DatePicker
                ref="DatePicker"
                :options="options3"
                split-panels
                @on-open-change="setOptTime"
                v-model="callDate"
                type="daterange"
                @on-change="signTimeChange"
                placement="bottom-start"
                separator=" ~ "
                :placeholder="$t('modules_spoc_crm_web_src_views_telephonerecord_telephonerecord_1955')"
                style="width:224px;"
            ></DatePicker>

            <Select
                v-model="findObj.salerOfficeId"
                clearable
                :placeholder="$t('modules_spoc_crm_web_src_modules_resourceentrymodal copy_537')"
                style="width:224px;"
                @on-change="salerOfficeIdChange"
            >
                <Option
                    v-for="item in salerOfficeIdList"
                    :value="item.id"
                    :key="item.value"
                >{{item.code}}{{ item.name }}</Option>
            </Select>
            <Select
                v-model="findObj.cusIds"
                multiple
                :placeholder="$t('modules_spoc_crm_web_src_views_customer360_components_leftbanner_819')"
                style="width: 224px;"
                clearable
                filterable="true"
                remote
                :loading="loadingcusIds"
                :remote-method="remoteQuerySingleTableData"
            >
                <Option v-for="(item,index) in cusIdsList" :value="item.id" :key="index">
                    {{ item.name }}
                    <span style="margin-right:40px"></span>
                    {{item.phone}}
                </Option>
                <!--  -->
            </Select>
            <Input
                v-model="findObj.phone"
                :placeholder="$t('modules_usermanage_230')"
                style="width:140px;"
                @on-keyup="RemoveSpace()"
            />
            <Select
                v-model="findObj.createIds"
                multiple
                :placeholder="$t('messagemanagement_components_searchlists_325')"
                style="width: 224px;"
                clearable
                filterable="true"
                remote
                :loading="loadingcusIds"
                :remote-method="remoteCreateIdsList"
            >
                <Option
                    v-for="(item,index) in createIdsList"
                    :value="item.value"
                    :key="index"
                >{{ item.name }}</Option>
            </Select>
            <!--

            -->
            <Select
                v-model="findObj.salerIds"
                multiple
                :placeholder="$t('modules_spoc_crm_web_src_modules_resourceentrymodal copy_536')"
                style="width: 224px;"
                clearable
                filterable="true"
                remote
                :loading="loadingcusIds"
                :remote-method="remoteSalerIdsList"
            >
                <Option
                    v-for="item in salerIdsList"
                    :value="item.value"
                    :key="item.value"
                >{{ item.name }}</Option>
            </Select>
            <div style="display:inline-block;position:relative;">
                <InputNumber
                    v-model="findObj.durationStart"
                    :min="0"
                    :placeholder="$t('modules_spoc_crm_web_src_views_telephonerecord_telephonerecord_1961')"
                    style="width:140px;"
                ></InputNumber>
                <span style="position: relative; bottom: 5px; margin: 0 5px;">--</span>
                <InputNumber
                    v-model="findObj.durationEnd"
                    :min="0"
                    :placeholder="$t('modules_spoc_crm_web_src_views_telephonerecord_telephonerecord_1961')"
                    style="width:140px;"
                ></InputNumber>
            </div>
        </v-search-collapse>

        <big-table
            v-if="defaultShowCol"
            class="mytable"
            :tableData="tableData"
            :tableColumnArray="tableColumnArray"
            :defaultShowCol="defaultShowCol"
            :canSelection="true"
            :dataTotal="dataTotal"
            :btnList="btnList"
            :tableHeightOut="tableHeightOut"
            :isShowSelectTableColumn="true"
            :updateShowTitleMethod="updateShowTitle"
            :updateShowTitleKey="updateShowTitleKey"
            @resetDefault="resetDefaultCol"
            @selectionChange="selectionChange"
            @pageChange="pageChange"
        >
            <div slot="tableNameSlot" class="table-name-slot-style">
                <div class="table-title">{{$t('modules_spoc_crm_web_src_views_telephonerecord_telephonerecord_1962')}}</div>
                <div class="content">{{$t('modules_spoc_crm_web_src_views_customer360_components_flowup_796')}}<span>{{statisticsData.creatorCount||'0' }}</span>{{$t('modules_spoc_crm_web_src_views_telephonerecord_telephonerecord_1964')}}<span>{{statisticsData.customerCount||'0' }}</span>{{$t('modules_spoc_crm_web_src_views_telephonerecord_telephonerecord_1965')}}<span>{{statisticsData.total||'0' }}</span>{{$t('modules_spoc_crm_web_src_views_telephonerecord_telephonerecord_1966')}}</div>

            </div>
        </big-table>
        <export-modal ref="exportModal" :exportMethod="exportMethod"></export-modal>
        <!-- <Modal
            v-model="modalRecord"
            :title="$t('modules_spoc_crm_web_src_views_telephonerecord_telephonerecord_1967')"
            width="600"
            :mask-closable="false"
            class-name="recordStyle"
        >
            <div style="width:100%;display:flex;justify-content:center;align-items:center">
                <audio controls :src="audioIdSrc" style="width:500px;" id="audioId" autoplay></audio>
            </div>
            <div slot="footer">
                <Button @click="cancelRecord">{{$t('modules_spoc_crm_web_src_views_telephonerecord_telephonerecord_1968')}}</Button>
            </div>
        </Modal>-->
        <div
            style="position:fixed;bottom:20px;width: calc(100% - 225px);z-index: 10;"
            v-if="audioIdSrc"
        >
            <div
                style="display:flex;justify-content:center;align-items:center;paddig-right:16px;width:100%;"
            >
                <Icon
                    type="ios-close"
                    size="30"
                    style="position:absolute;top:10px;right:0px;cursor:pointer"
                    @click="audioIdSrcClear"
                />
                <div
                    style="width:100%;display:flex;justify-content:center;align-items:center;margin-top:10px;background:#edfff3;border-radius: 4px;border: 1px solid #8ce6b0;"
                >
                    <audio
                        controls
                        :src="audioIdSrc"
                        style="width:50%;margin-top:10px;margin-bottom:10px;"
                        id="audioId"
                        autoplay
                    ></audio>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import bigTable from "@public/modules/bigTable.vue";
import exportModal from "@public/modules/exportModal.vue";
import vSearchCollapse from "@public/modules/vSearchCollapse";
import valid, {
    errors,
    sysUser,
    sys,
    sysCommonSql,
    crmRecord
} from "../../libs/request";
import {
    waitUntil,
    DatePickerOpt,
    defaultDatePickerValue
} from "@public/libs/util";
export default {
    name: 'crm.telephoneRecord',
    data() {
        return {
            options3: null,
            tableHeightOut: 72, //324,
            pre: "",
            findObj: {
                callDateStart: "",
                callDateEnd: "",
                salerOfficeId: "",
                cusIds: [],
                phone: "",
                createIds: [],
                salerIds: [],
                durationStart: "",
                durationEnd: ""
            },
            modalRecord: false,
            updateShowTitleKey: "record/listPage",
            updateShowTitle: crmRecord.updateShowTitle,
            exportMethod: crmRecord.export, //导出用到的方法对象
            selection: [],
            btnList: [
                /*  {
                    style: {},
                    type: "",
                    btnClick: this.createQrCode,
                    text: "导出电话录音"
                }, */
                [
                    {
                        style: {},
                        type: "",
                        btnClick: this.isExport,
                        text: "导出全部",
                        value: "1",
                        parentName: "导出"
                    },
                    {
                        style: {},
                        type: "",
                        btnClick: this.isExport,
                        text: "导出所选",
                        value: "2",
                        parentName: "导出"
                    }
                ]
            ],
            cw_capital_trace_typelist: [],
            cw_capital_trace_sub_typeList: [],
            loadingcusIds: false,
            cusIdsList: [],
            createIdsList: [],
            salerIdsList: [],
            salerOfficeIdList: [],
            callDate: [],
            pageNo: 1,
            pageSize: this.$store.state.app.pageSizeGlobal,
            /*搜索相关结束*/
            tableName: "电话记录列表",
            defaultShowCol: null,
            dataTotal: 0,
            sortObj: {},
            tableColumnArray: [
                {
                    // title: "播放",
                    key: "playAudio",
                    width: 100,
                    render: (h, params) => {
                        let dropList = []; // 渲染的下拉表单
                        // params.row.fileIds = "1,2,3";
                        let arr;
                        if (params.row.filePaths != null) {
                            arr = params.row.filePaths.split(",");
                        }
                        if (params.row.filePaths) {
                            params.row.filePaths
                                .split(",")
                                .forEach((item, index) => {
                                    dropList[index] = h(
                                        "DropdownItem",
                                        {
                                            props: {
                                                name: "dropListItem" + index
                                            },
                                            style: {
                                                background: "#FFF"
                                            },
                                            nativeOn: {
                                                // 必须使用nativeOn
                                                click: e => {
                                                    params.row.audioIdSrc = true;
                                                    this.audioListFn(
                                                        params,
                                                        item,
                                                        e
                                                    );
                                                }
                                            }
                                        },
                                        `录音${index + 1}`
                                    );
                                });
                        }
                        return h("div", [
                            this.myButtonPrem.indexOf("play") >= 0
                                ? h(
                                      "Dropdown",
                                      {
                                          style: {
                                              color: params.row.fileIds
                                                  ? ""
                                                  : "#ddd"
                                          },
                                          props: {
                                              transfer: true
                                          }
                                      },
                                      [
                                          h("i", {
                                              class: !params.row.audioIdPlay
                                                  ? "iconfont icon-bofang2 iconfonthover"
                                                  : "iconfont icon-zanting2 iconfonthover",
                                              style: {
                                                  fontSize: "20px",
                                                  cursor: "pointer"
                                              },
                                              on: {
                                                  click: () => {
                                                      if (
                                                          params.row
                                                              .audioIdSrc &&
                                                          params.row.audioIdPlay
                                                      ) {
                                                          params.row.audioIdSrc = false;
                                                          if(document.getElementById("audioId")){
                                                              document.getElementById("audioId").pause();
                                                          }
                                                      } else {
                                                          if (arr.length <= 1) {
                                                              this.audioListFn(
                                                                  params,
                                                                  arr[0]
                                                              );
                                                          }
                                                      }
                                                  }
                                              }
                                          }),
                                          arr.length > 1
                                              ? h(
                                                    "DropdownMenu",
                                                    {
                                                        slot: "list"
                                                    },
                                                    dropList
                                                )
                                              : ""
                                      ]
                                  )
                                : ""
                        ]);
                    }
                },
                // {
                //     title: "操作",
                //     key: "doAction",
                //     width: 100,
                //     render: (h, params) => {
                //         let dropList = []; // 渲染的下拉表单
                //         let arr;
                //         if (params.row.filePaths != null) {
                //             arr = params.row.filePaths.split(",");
                //         }
                //         if (params.row.filePaths) {
                //             params.row.filePaths
                //                 .split(",")
                //                 .forEach((item, index) => {
                //                     dropList[index] = h(
                //                         "DropdownItem",
                //                         {
                //                             props: {
                //                                 name: "dropListItem" + index
                //                             },
                //                             style: {
                //                                 background: "#FFF"
                //                             },
                //                             nativeOn: {
                //                                 // 必须使用nativeOn
                //                                 click: e => {
                //                                     params.row.audioIdSrc = true;
                //                                     this.audioListFn(
                //                                         params,
                //                                         item,
                //                                         e
                //                                     );
                //                                 }
                //                             }
                //                         },
                //                         `录音${index + 1}`
                //                     );
                //                 });
                //         }
                //         return h("div", [
                //             this.myButtonPrem.indexOf("play") >= 0
                //                 ? h(
                //                       "Dropdown",
                //                       {
                //                           style: {
                //                               color: params.row.fileIds
                //                                   ? ""
                //                                   : "#ddd"
                //                           },
                //                           props: {
                //                               transfer: true
                //                           }
                //                       },
                //                       [
                //                           h(
                //                               "a",
                //                               {
                //                                   style: {
                //                                       //   fontSize: "20px",
                //                                       cursor: "pointer"
                //                                   },
                //                                     attrs:{
                //                                         href:arr[0],
                //                                         download:arr[0]
                //                                     },
                //                                   on: {
                //                                       click: () => {
                //                                           if (arr.length <= 1) {
                //                                               //                                               var a = document.createElement("a");
                //                                               // var event = new MouseEvent("click");
                //                                               // a.download =arr[0];
                //                                               // a.href = arr[0];
                //                                               // a.dispatchEvent(event)
                //                                           }
                //                                       }
                //                                   }
                //                               },
                //                               "下载"
                //                           ),
                //                           arr.length > 1
                //                               ? h(
                //                                     "DropdownMenu",
                //                                     {
                //                                         slot: "list"
                //                                     },
                //                                     dropList
                //                                 )
                //                               : ""
                //                       ]
                //                   )
                //                 : ""
                //         ]);
                //     }
                // }
            ],
            tableData: [],
            audioIdSrc: "",
            statisticsData:{
                creatorCount:0,
                ustomerCount:0,
                total:0,
                duration: ''
            },

        };
    },
    computed: {
        ...mapState(["app", "buttonPerm", "calendarConfig"]),
        myButtonPrem() {
            return this.buttonPerm["crm.telephoneRecord"] || []; 
        }
    },
    components: {
        bigTable,
        exportModal,
        vSearchCollapse
    },
    mounted() {
        this.getShowTitle();
        this.getInitData();
        // this.batchListData();

        /* document.getElementById("audioId").addEventListener("play", function () {   //开始播放时触发
            console.log("event play: " + (new Date()).getTime());
         }); */
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        resetDefaultCol(){
            this.updateLoadingStatus({ isLoading: true });
            crmRecord.clearShowField({
                pageIdentifier: "record/listPage",
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
        setOptTime(flag) {
            if (flag) {
                this.callDate = [];
            }
        },
        changeDivHeight(height) {
            this.tableHeightOut = height;
        },
        audioListFn(params, item, e) {
            this.tableData.forEach(listData => {
                if(listData.id != params.row.id){
                    listData.audioIdSrc = false;
                    listData.audioIdPlay = false;
                }
            });
            this.audioIdSrc = "";
            let arr = document.getElementsByClassName("ivu-dropdown-item");
            for (let val of arr) {
                val.style.background = "";
            }
            if (e) {
                e.target.style.background = "#44bcb7";
            }
            if (this.pre !== "") {
                let val = this.pre;
                val.row.audioIdSrc = false;
                val.row.audioIdPlay = false;
            } else {
                this.pre = params;
            }
            params.row.audioIdSrc = true;
            params.row.audioIdPlay = true;
            setTimeout(() => {
                this.audioIdSrc = item;
                this.$nextTick(function() {
                    let audioId = document.getElementById("audioId");
                    if(audioId){
                        audioId.load();
                        audioId.addEventListener("playing", function() {
                            console.log("this.pre" + this.pre);
                            console.log("playing");
                            params.row.audioIdPlay = true;
                        });
                        audioId.addEventListener("pause", function() {
                            console.log("pause");
                            params.row.audioIdPlay = false;
                        });
                    }
                });
            }, 500);
        },
        audioIdSrcClear() {
            this.audioIdSrc = "";
            this.pre.row.audioIdSrc = false;
        },
        //不是数字就清空数据
        numArea(value) {
            var patt1 = new RegExp(/^[0-9]{0,}$/);
            return patt1.test(value);
        },
        RemoveSpace(val) {
            if (!this.numArea(this.findObj.phone)) {
                this.findObj.phone = parseInt(this.findObj.phone)
                    ? parseInt(this.findObj.phone)
                    : "";
            }
        },
        createQrCode(type) {
            /*  this.$router.push({
                name:"crm.createQrCode"
            }) */
        },
        //可选方法，如果是多选的话必须有
        selectionChange(selection) {
            this.selection = selection;
        },
        isExport(val) {
            //这里val的值。是根据设置下拉类型button设定的值来匹配判断
            if (val == "2" && !this.selection.length) {
                this.$Message.error(this.$t('scoretemplate_scoretemplate_572'));
                return;
            }
            let searchObj = this.searchObj;
            delete searchObj.pageNo
            delete searchObj.pageSize
            if (val == "2") {
                //如果是导出所选，需要在这里传递所选对象、或者对象ID，这里根据需要自行处理，并作为搜索参数的一部分传递到导出组件
                searchObj = {
                    ids: this.selection
                        .map(item => {
                            return item.id;
                        })
                };
            }
            this.$refs.exportModal.noShowExport(this.exportMethod, searchObj);
        },
        //客户姓名
        remoteQuerySingleTableData(query) {
            this.loadingcusIds = true;
            let params = {
                mainTable: "crm_customer",
                searchField: "name",
                searchFieldParam: query,
                field1: "star_phone"
            };
            sysCommonSql
                .querySingleTableData(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.cusIdsList = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.loadingcusIds = false;
                });
        },
        //联系人
        remoteCreateIdsList(query) {
            this.loadingcusIds = true;
            let params = {
                mainTable: "crm_record",
                mainField: "create_by",
                joinField: "id",
                joinTable: "sys_user",
                secondField: "name",
                joinTableSearchParam: query
            };
            sysCommonSql
                .queryPageInputInitData(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.createIdsList = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.loadingcusIds = false;
                });
        },
        //跟进人
        remoteSalerIdsList(query) {
            this.loadingcusIds = true;
            let params = {
                mainTable: "crm_customer_status",
                mainField: "saler",
                joinField: "id",
                joinTable: "sys_user",
                secondField: "name",
                joinTableSearchParam: query
            };
            sysCommonSql
                .queryPageInputInitData(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.salerIdsList = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.loadingcusIds = false;
                });
        },
        getListDataEmit() {
            this.getListData();
        },
        salerOfficeIdChange() {
            this.findObj.studentId = "";
        },
        getInitData() {
            var promise = new Promise((resolve, reject) => {
                //校区列表
                sysUser
                    .dataScopeFilter()
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            resolve(res);
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {});
            });
            promise.then(res => {
                if (res.ok) {
                    this.salerOfficeIdList = res.data.data;
                    waitUntil(
                        () => {
                            if (this.app.currOfficeId) {
                                this.$set(
                                    this.findObj,
                                    "salerOfficeId",
                                    this.app.currOfficeId == "all"
                                        ? ""
                                        : this.app.currOfficeId
                                );
                            }
                            return (
                                (this.app.currOfficeId &&
                                    JSON.stringify(this.buttonPerm) != "{}" && this.buttonPerm) ||
                                false
                            );
                        },
                        () => {
                            if (this.myButtonPrem.indexOf("play") < 0) {
                                //不可导出
                                this.btnList = [];
                            }
                            this.callDate = defaultDatePickerValue(
                                
                            );
                            this.options3 = DatePickerOpt(
                                this,
                                "DatePicker",
                                Number(this.calendarConfig.maxMonthInterval)
                            );
                            this.signTimeChange();
                            this.getListData();
                        }
                    );
                }
            });
        },
        changeType(val) {
            this.findObj.courseGrade = "";
        },
        getListData() {
            this.selection = []
            this.audioIdSrc = "";
            this.updateLoadingStatus({ isLoading: true });
            let param = {
                pageNo: this.pageNo,
                pageSize: this.pageSize
                // filtered: 1
            };
            param = Object.assign({}, param, this.findObj);
            // param.salerOfficeId = "";
            this.searchObj = param; //这里需要给searchObj 赋值，导出数据的时候需要用到
            crmRecord
                .listPage(param)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let result = res.data.data;
                        this.tableData = result.list;
                        // this.tableData[2].fileIds = "1,2,3";
                        // this.tableData[3].fileIds = "1,2,3";
                        this.tableData.forEach(item => {
                            item.audioIdSrc = false;
                            item.audioIdPlay = false;
                        });
                        this.dataTotal = result.total;
                        this.statisticsDataFn()
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        statisticsDataFn() {
//            this.updateLoadingStatus({ isLoading: true });
            let param = {
                pageNo: this.pageNo,
                pageSize: this.pageSize
                // filtered: 1
            };
            param = Object.assign({}, param, this.findObj);
            // param.salerOfficeId = "";
            this.searchObj = param; //这里需要给searchObj 赋值，导出数据的时候需要用到
            crmRecord
                .statisticsRecord(param)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let result = res.data.data;
                        this.statisticsData.creatorCount = result.creatorCount
                        this.statisticsData.customerCount = result.customerCount
                        this.statisticsData.total = this.dataTotal
                        this.statisticsData.duration = result.duration
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
//                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        signTimeChange() {
            this.findObj.callDateStart = this.callDate[0]
                ? this.callDate[0].format("yyyy-MM-dd 00:00:00")
                : "";
            this.findObj.callDateEnd = this.callDate[1]
                ? this.callDate[1].format("yyyy-MM-dd 23:59:59")
                : "";
        },
        //获取数据，根据情况修改接口、传参
        SearchList() {
            if (
                Number(this.findObj.durationStart) >
                Number(this.findObj.durationEnd)
            ) {
                this.$Message.error(this.$t('modules_spoc_crm_web_src_views_telephonerecord_telephonerecord_1970'));
                this.findObj.durationEnd = "";
                return;
            }
            this.pageNo = 1;
            this.getListData();
        },
        //分页方法 如果有分页则为必须方法，修改getCourseList为自己的获取数据方法 这里注意。不再有每页个数改变的方法了
        pageChange(pageNo, pageSize) {
            if (!pageNo) {
                //防止无用重复请求
                return;
            }
            this.pageNo = pageNo;
            this.pageSize = pageSize;
            this.getListData();
        },
        //必须方法，获取默认显示的可选列  接口根据需要自行更换，每个模块的接口是不一致的
        getShowTitle(closeLoad) {
            crmRecord
                .getShowTitle({
                    pageIdentifier: "record/listPage",
                    voName: "com.windliven.spoc.modules.crm.vo.CrmRecordVO"
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.defaultShowCol = res.data.data;
                        this.defaultShowCol.true.push({
                            dynamiced: false,
                            name: "playAudio",
                            required: true,
                            selected: true,
                            sort: 100,
                            title: this.$t('modules_spoc_crm_web_src_views_telephonerecord_telephonerecord_1971')
                        });
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
					if(closeLoad){
                        this.updateLoadingStatus({ isLoading: false });
                    }
				});
        },
        resetSearch() {
            for (let item in this.findObj) {
                if (this.findObj[item] instanceof Array) {
                    this.findObj[item] = [];
                } else {
                    this.findObj[item] = "";
                }
            }
            this.callDate = defaultDatePickerValue(
                
            );
            this.signTimeChange();
            this.pageNo = 1;
            this.$set(
                this.findObj,
                "salerOfficeId",
                this.app.currOfficeId == "all" ? "" : this.app.currOfficeId
            );
            this.getListData();
        }
    },
    watch: {
        "app.currOfficeId": function(val, oldVal) {
            if (oldVal && this.$route.name == "crm.telephoneRecord") {
                // this.$set(this.findObj, "salerOfficeId", this.app.currOfficeId);
                this.$set(
                    this.findObj,
                    "salerOfficeId",
                    val == "all" ? "" : val
                );
                this.getListData();
            }
        }
    }
};
</script>
