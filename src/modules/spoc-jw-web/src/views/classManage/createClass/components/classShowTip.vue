<style lang="less">
.classShow {
    .ivu-modal-header {
        background: rgba(247, 248, 250, 1);
        border-radius: 4px 4px 0px 0px;
        .ivu-modal-header-inner {
            // font-size: 18px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.85);
        }
    }
    .ivu-modal-footer {
        .ivu-btn-text {
            border: 1px solid #dcdee2;
        }
    }
    // .#dcdee
    .pageStyle {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 10px;
        /* .ivu-page-item-active {
      border-color: #2d8cf0;

    } */
    }
}
</style>
<template>
    <div>
        <Modal
            :mask-closable="false"
            v-model="classShowTipBoo"
            class-name="classShow"
            :title="$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_classshowtip_2569')"
            width="1200"
            :styles="{top: '20px'}"
        >
            <div>{{$t('modules_spoc_jw_web_src_views_classmanage_addstudent_addstudent_2414')}}<Select
                v-if="jw_course_type && jw_course_type.length"
                    clearable
                    style="width:224px;"
                    :placeholder="$t('views_coursepack_bigtableexample_322')"
                    v-model="formData.courseType"
                    @on-change="courseTypeChange"
                >
                    <Option
                        v-for="item in jw_course_type"
                        :value="item.value"
                        :key="item.value"
                    >{{ item.label }}</Option>
                </Select>
                <Select
                    clearable
                    style="width:224px;margin-left:12px;"
                    :placeholder="$t('courselist_courselist_224')"
                    v-model="formData.courseGrade"
                    @on-change="courseGradeChange"
                    v-if="jw_course_grade && jw_course_grade.length"
                >
                    <Option
                        v-for="item in jw_course_grade"
                        :value="item.value"
                        :key="item.value"
                    >{{ item.label }}</Option>
                </Select>
                <Table :columns="columns0" :data="data0" style="margin-top:20px;" border></Table>
                <div class="pageStyle">
                    <Page
                        :total="totalPage"
                        size="small"
                        show-elevator
                        show-sizer
                        @on-change="pageChange"
                        @on-page-size-change="pageSizeChange"
                    />
                </div>
            </div>
            <div slot="footer" class="modiRoomTip">
                <Button @click="handleReset" style="margin-left: 8px">{{$t('classroom_allscore_53')}}</Button>
                <Button type="primary" @click="handleSubmit">{{$t('classroom_allscore_54')}}</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import { mapMutations } from "vuex";
import valid, { errors, sysDict, common } from "../../../../libs/request";
// import { jwCourse } from "../../../../../../spoc-core-web/src/libs/request";
export default {
    components: {},
    mounted() {
        this.baseData();
        // this.baseTableList();
    },
    props: ["officeId", "shareArea"],
    data() {
        return {
            formData: {
                courseType: "",
                courseGrade: ""
            },
            currentPage: 1,
            pageSize: 10,
            totalPage: 0,
            checkDate: {},
            classShowTipBoo: false,
            jw_course_type: [],
            jw_course_grade: [],
            columns0: [
                {
                    title: this.$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2107'),
                    align: "center",
                    width: null,
                    resizable: true,
                    key: "checkBox",
                    render: (h, params) => {
                        // let _this=this;
                        return h("div", [
                            h("Checkbox", {
                                props: {
                                    value: params.row.checkBox
                                },
                                on: {
                                    "on-change": e => {
                                        // for(let i=0;i<_this.data0.length;i++){
                                        //   _this.data0[i].checkBox=false;
                                        // }
                                        if(this.data0){
                                            this.data0.forEach(items => {
                                                //先取消所有对象的勾选，checkBox设置为false
                                                this.$set(items, "checkBox", false);
                                            });
                                            this.data0[params.index].checkBox = e; //再将勾选的对象的checkBox设置为true
                                            this.checkData = this.data0[params.index];
                                        }
                                    }
                                }
                            })
                        ]);
                    }
                },
                {
                    title: this.$t('mycourse_mycourse_380'),
                    key: "name",
                    width: null,
                    resizable: true
                },

                {
                    title: this.$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_classshowtip_2577'),
                    key: "timeLimit",
                    width: null,
                    resizable: true
                },
                {
                    title: this.$t('views_coursepack_coursepack_380'),
                    width: null,
                    resizable: true,
                    key: "price",
                     render:(h,params)=>{
                         return h('div',[
                             h("div",{},Number(params.row.price).toFixed(2))
                         ])
                    }
                },
                {
                    title: this.$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_classshowtip_2579'),
                    width: null,
                    resizable: true,
                    key: "num"
                },
                {
                    title: this.$t('views_coursepack_coursepack_381'),
                    width: null,
                    resizable: true,
                    key: "totalPrice",
                    render:(h,params)=>{
                         return h('div',[
                             h("div",{},Number(params.row.totalPrice).toFixed(2))
                         ])
                    }
                },
                {
                    title: this.$t('messagemanagement_index_355'),
                    width: null,
                    resizable: true,
                    key: "gradeLabel"
                }
            ],
            data0: []
        };
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        pageChange(currentPage) {
            this.currentPage = currentPage;
            this.baseTableList();
            console.log(this.currentPage, this.pageSize);
        },
        pageSizeChange(pageSize) {
            this.pageSize = pageSize;
            this.baseTableList();
            console.log(this.currentPage, this.pageSize);
        },
        courseTypeChange(val) {
            let type = "jw_course_type"; //适用年级
            sysDict
                .findChildDictByParentDict({
                    type
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        //debugger;
                        let aaa = res.data.data.filter(item => {
                            return item.type == this.formData.courseType;
                        });
                        this.jw_course_grade = aaa;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
            this.baseTableList();
            //请求接口
        },
        courseGradeChange() {
            console.log(this.formData);
            this.baseTableList();
            //请求接口
        },
        baseData() {
            let types = "jw_course_type"; //课程包分类,适用年级
            sysDict
                .batchListData({
                    types
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.jw_course_type = res.data.data.jw_course_type;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    // this.updateLoadingStatus({ isLoading: false });
                });
            // let type = "jw_course_type"; //适用年级
            // sysDict
            //   .findChildDictByParentDict({
            //     type
            //   })
            //   .then(valid.call(this))
            //   .then(res => {
            //     if (res.ok) {
            //       this.jw_course_grade = res.data.data;
            //     }
            //   })
            //   .catch(errors.call(this))
            //   .finally(() => {
            //     this.updateLoadingStatus({ isLoading: false });
            //   });
        },
        baseTableList() {
            console.log(this.shareArea);
            let params = {
                officeIds:
                    Array.isArray(this.shareArea) && this.shareArea.length
                        ? this.officeId + "," + this.shareArea.join(",")
                        : this.officeId,
                type: this.formData.courseType,
                grade: this.formData.courseGrade,
                pageNo: this.currentPage,
                pageSize: this.pageSize
            }; //
            common
                .listPageByOffice(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        // debugger;
                        this.data0 = res.data.data.list;
                        // alert(this.totalPage);
                        this.totalPage = res.data.data.total;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    // this.updateLoadingStatus({ isLoading: false });
                });
        },
        handleSubmit() {
            if (true) {
                this.classShowTipBoo = false;
                this.$emit("chooseDetailMethod", this.checkData);
            }
        },
        handleReset() {
            this.classShowTipBoo = false;
            if(this.data0){
                this.data0.forEach(items => {
                    //先取消所有对象的勾选，checkBox设置为false
                    this.$set(items, "checkBox", false);
                });
            }
            this.checkData = {};
        },
        classShowMethods() {
            this.classShowTipBoo = true;
            this.formData.courseType = "";
            this.formData.courseGrade = "";
        }
    }
};
</script>
