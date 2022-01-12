<style lang="less">
  .search-content {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 50px;
    background: rgba(250, 250, 250, 1);
    border: 1px solid rgba(232, 232, 232, 1);
    // 外侧复选框样式
    .ivu-checkbox-wrapper {
      margin-left: 24px;
      .ivu-checkbox-inner{
        border-radius: 50%;
      }
    }
     
   
    .refundName {
      font-family: PingFangSC-Medium;
      // color: rgba(85, 132, 255, 1);
      margin-right: 30px;
      margin-left: 46px;
      padding-left: 10px;
       &.refundNameHeight{
                  a{
                      display: inline-block;
                      overflow: hidden;
                      max-width: 200px;
                      min-width: 100px;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                  }
            }
    }
    .refundNum {
      > span:nth-child(2) {
        margin-left: 8px;
        margin-right: 43px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(85, 132, 255, 1);
        cursor: pointer;
      }
    }
    .refundPerson {
      margin-left: 10px;
    }
    .toggleI {
      cursor: pointer;
      position: absolute;
      right: 20px;
      // top: 0px;
      .toggleIcon {
        transform: rotate(180deg);
      }
    }
  }
 .tableCourse{
      .demo-table-info-row{
        .ivu-checkbox-inner{
            border-radius: 50%;
          }
      }
     &.radio-table{
            /*在做皮肤的时候这里需要修改*/
            .ivu-checkbox {
                display: inline-block;
                margin-right: 4px;
                white-space: nowrap;
                position: relative;
                line-height: 1;
                vertical-align: middle;
                cursor: pointer
            }
            .ivu-checkbox-input {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                z-index: 1;
                opacity: 0;
                width: 13px!important;
                height: 13px!important;
                cursor: pointer
            }
            .ivu-checkbox-inner {
                display: inline-block;
                width: 14px!important;
                height: 14px!important;
                position: relative;
                top: 0;
                left: 0;
                background-color: #fff;
                border: 1px solid #dcdee2;
                border-radius: 50%;
                transition: all .2s ease-in-out
            }

            .ivu-checkbox-inner:after {
                position: absolute;
                width: 8px;
                height: 8px;
                left: 2px;
                top: 2px;
                border-radius: 50%;
                padding:0;
                margin:0;
                display: table;
                border-top: 0;
                border-left: 0;
                border:0;
                content: ' ';
                background-color: #44bcb7;
                opacity: 0;
                transition: all .2s ease-in-out;
                -ms-transform: scale(0);
                transform: scale(0)
            }
            .ivu-checkbox-checked:hover .ivu-checkbox-inner {
                border-color: #44bcb7;
            }
            .ivu-checkbox-checked .ivu-checkbox-inner {
                border-color: #44bcb7;
            }
            .ivu-checkbox-checked .ivu-checkbox-inner:after {
                opacity: 1;
                -ms-transform: scale(1);
                transform: scale(1);
                transition: all .2s ease-in-out
            }

        }
    }
</style>
<template>
  <div class="course-content">
    <div v-for="(item,index) in courseListData" :key="index" v-show="courseListData.length>0">
      <div class="search-content">
        <Checkbox v-model="item.check" @on-change="CheckboxChange(index,item.check,item)" style="border-radius:50%" v-if="showCt"></Checkbox>
        <div class="refundName refundNameHeight"><a :title="item.name">{{item.name}}</a></div>
        <div class="refundNum">{{$t('modules_spoc_sign_web_src_modules_preview_4895')}}<span v-if="(showNumB&&editIndex===index)">{{item.ctNo}}</span>
          <span v-else>{{item.ctNo.substr(0,4)+'***********'+item.ctNo.substr(-2,2)}}</span>
          <span @click="showNum(index)"><a>{{(showNumB&&editIndex===index)?$t('modules_expandrow_14'):$t('courselist_compontents_servicecontent_219')}}</a></span>
        </div>
        <div>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_5003')}}<b>{{item.signTime}}</b></div>
        <div class="refundPerson">{{$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_5004')}}<b>{{item.sellerName}}</b></div>
        <div class="toggleI" @click="toggleIconHandle(index)">
          <Icon type="ios-arrow-up" v-if="toggleUP?editIndex===index:false" size="15"/>
          <Icon type="ios-arrow-down" v-else size="15"/>
        </div>
      </div>
      <Table
		border
        class="tableCourse radio-table"
        :row-class-name="rowClassName"
        :columns="columns0"
        :data="item.courseInfoVOList"
        v-if="toggleUP?editIndex===index:false"
      ></Table>
    </div>
    <div v-show="courseListData.length==0">
        <div class="search-content">
                <!-- <Checkbox v-model="item.check" @on-change="CheckboxChange(index,item.check,item)" style="border-radius:50%" v-if="showCt"></Checkbox> -->
                <div class="refundName" style="margin-left:20px;margin:0px;">-- </div>
                <div class="refundNum" style="margin-left:135px">{{$t('modules_spoc_sign_web_src_modules_preview_4895')}}<span>-</span>
                </div>
                <div style="margin-left:135px">{{$t('modules_spoc_sign_web_src_views_coursevalidityadjustment_components_choosecourse_6061')}}</div>
                <div class="refundPerson" style="margin-left:135px">{{$t('modules_spoc_sign_web_src_views_coursevalidityadjustment_components_choosecourse_6062')}}</div>
      </div>

    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
 import valid, { errors,htContract} from  "../../../libs/request";
export default {
  components: {},
  mounted() {},
  props: {
    showCt:{
      type:Boolean,
      default:false,
    }
  },
  data() {
    return {
      courseListData:[],
      refundNum: "SSH02201902280307",
      showNumB: false,
      toggleUP: false,
      editIndex: -1, // 当前聚焦的输入框的行数
      classShowTipBoo: true,
      toggleIcon: false,
      single: true,
      itemList:  [
        {
          check: false,
          course:'a',
        },
        {
          check: false,
           course:'a1',
        },
        {
          check: false,
           course:'a2',
        },
       
      ],
      columns0: [
        {
          title: " ",
          align: "center",
          width: 50,
          key: "courseName",
          render: (h, params) => {
          //  console.log("params.row.checkBox:"+params.row.checkBox);
          //  console.log(JSON.stringify(this.courseListData));
            return h("div", [
              h("Checkbox", {
                props: {
                  value: params.row.checkBox
                },
                on: {
                  "on-change": e => {
                    //更新视图改变
                    /* 
                    //备注：  不要用params。row来修改数据
						            			//table根据data来变更。当前行数据的修改不会反馈到后台script里的数据 */
                    this.courseListData[this.editIndex].courseInfoVOList=[].concat(this.courseListData[this.editIndex].courseInfoVOList);
                      this.courseListData.filter((item,order)=>{
                            item.courseInfoVOList.filter((data,index)=>{
                              data.checkBox=false;
                            })
                        })
                       this.$set(this.courseListData[this.editIndex].courseInfoVOList[params.index], "checkBox", e);
                       
                        if(e){
                          this.$emit('courseChooseEmit',params.row,this.courseListData[this.editIndex].ctNo);
                        }else{
                          this.$emit('courseChooseEmit','');
                        }
                    /* 
                    */
                  }
                }
              })
              
            ]);
          }
        },
        {
                title: this.$t('modules_spoc_jw_web_src_views_chargingmanage_chargingmanagelist_2335'),
                key: "courseName",
				resizable: true,
				width: null,
                render:(h,params)=>{
                    return h('span',{},
                            params.row.courseName == null ? '-' :params.row.courseName
                    )
                }
            },
            {
                title: this.$t('modules_spoc_sign_web_src_views_coursevalidityadjustment_components_choosecourse_6064'),
                key: "courseHourNum",
				resizable: true,
				width: null,
                render:(h,params)=>{
                    return h('span',{},
                            params.row.courseHourNum == null ? '-' :params.row.courseHourNum
                    )
                }
            },
            {
                title: this.$t('modules_spoc_jw_web_src_views_1v1_student_2218'),
                key: "costNum",
				resizable: true,
				width: null,
                render:(h,params)=>{
                    return h('span',{},
                            params.row.costNum == null ? '-' :params.row.costNum
                    )
                }
            },
            {
                title: this.$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2134'),
                key: "leftCourseHour",
				resizable: true,
				width: null,
                render:(h,params)=>{
                    return h('span',{},
                            params.row.leftCourseHour == null ? '-' :params.row.leftCourseHour
                    )
                }
            },
            {
                title: this.$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_5010'),
                key: "coursePrice",
				resizable: true,
				width: null,
                minWidth:15,
                render:(h,params)=>{
                    return h('span',{
                            style:{
                                'word-break': 'nowrap'
                            },
                        },
                            params.row.coursePrice == null ? '-' :Number(params.row.coursePrice).toFixed(2)
                    )
                }
            },
            {
                title: this.$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_5011'),
                key: "publicUnitPrice",
                minWidth:15,
				resizable: true,
				width: null,
                render:(h,params)=>{
                    return h('span',{
                            style:{
                                'word-break': 'nowrap'
                            },
                        },
                            params.row.publicUnitPrice == null ? '-' :Number(params.row.publicUnitPrice).toFixed(2)
                    )
                }
            },
            {
                title: this.$t('modules_spoc_sign_web_src_views_contractgeneration_component_vitemcard_5472'),
                key: "courseUnitPrice",
                minWidth:15,
				resizable: true,
				width: null,
                render:(h,params)=>{
                    return h('span',{
                            style:{
                                'word-break': 'nowrap'
                            },
                        },
                            params.row.courseUnitPrice == null ? '-' :Number(params.row.courseUnitPrice).toFixed(2)
                    )
                }
            },
            {
                title: this.$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_5014'),
                key: "teacherName",
				resizable: true,
				width: null,
                render:(h,params)=>{
                    return h('span',{},
                            params.row.teacherName == null ? '-' :params.row.teacherName
                    )
                }
            },
            {
                title: this.$t('mycourse_mycourse_374'),
                key: "classTeacherName",
				resizable: true,
				width: null,
                render:(h,params)=>{
                    return h('span',{},
                            params.row.classTeacherName == null ? '-' :params.row.classTeacherName
                    )
                }
            },
      ],
      data0: [
      ]
    };
  },
  methods: {
     ...mapMutations(["updateLoadingStatus"]),
    rowClassName(row, index){
				return 'demo-table-info-row';
      },
      courseClear(){
        this.courseListData=[];
      },
      courseList(obj){
            htContract.listContractsAndCourses({
                officeId: obj.officeId,
                stuId: obj.stuId
            })
            .then(valid.call(this))
            .then(res => {
              if(res.ok) {
                console.log("this.courseListData:"+this.courseListData);
                let courseListData = res.data.data;
                courseListData.forEach((item)=>{
                  item.courseInfoVOList.forEach((data)=>{
                    data.checkBox=false;
                    data.ctId=item.ctId;
                  })
                })
                if(obj.ctNo){ //从合同管理打开，只显示改合同的数据
                  courseListData = courseListData.filter(item=>{
                    return item.ctNo == obj.ctNo
                  })
                }
                this.courseListData = courseListData
              }
            })
            .catch(errors.call(this))
            .finally(() => {
              // this.updateLoadingStatus({
              //   isLoading: false
              // });
					});
        },
    toggleIconHandle(index) {
      this.editIndex = index;
      this.toggleUP = !this.toggleUP;
    },
    showNum(index) {
      this.showNumB = !this.showNumB;
      this.editIndex = index;
    },
    CheckboxChange(index, val) {
      this.data0.forEach(items => {
        //先取消所有对象的勾选，checkBox设置为false
        this.$set(items, "checkBox", false);
      });
      this.itemList.forEach(item => {
        item.check = false;
      });
      this.itemList[index].check = val;
      if(val){
        this.$emit('courseChooseEmit',this.itemList[index].course);
      }else{
        this.$emit('courseChooseEmit','');
      }
      // this.itemList[index].course
      // console.log(JSON.stringify(this.itemList));
    }
  }
};
</script>
