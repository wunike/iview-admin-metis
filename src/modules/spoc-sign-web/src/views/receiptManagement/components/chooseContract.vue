<style lang="less">
@comColor:#495060;
.flex-row{
    display: flex;
    flex-direction: row;
}

.choose-contract{
    .ivu-modal-footer .ivu-btn-text{
        border:1px solid rgb(220, 222, 226);
    }
    .ivu-modal-footer .ivu-btn-text:hover{
        border:1px solid rgb(220, 222, 226);
    }

    .ivu-modal-header{
        padding:17px 24px 16px!important;
        background: #F7F8FA;
        border-radius:4px;
        .ivu-modal-header-inner{
            font-size:18px;
            font-weight:500;
            color:rgba(0,0,0,0.85);
        }
    }
    .ivu-input{
        font-size:14px!important;
    }
    .ivu-modal-footer{
        padding:10px 24px!important;
    }
    .ivu-input-group-append{
        width: 34px!important;
    }

    .ivu-modal-body{
        font-size:14px!important;
        color:@comColor;
    }
    .ivu-table-header{
        th{
            height:50px!important;
        }
    }
    .ivu-table-tbody{
        td{
            height:40px!important;
        }
    }
    b{
        font-weight: normal;
    }
    em{
        font-style: normal;
    }
    .choose-contract-box{
        width:100%;
        margin-bottom:10px;
        &:nth-last-of-type(1){
            margin-bottom: 0;
        }
    }
    .item-line{
        .flex-row;
        height:50px;
        justify-content: space-between;
        align-items: center;
        width:100%;
        padding:0  22px;
        background: #FAFAFA;
        font-size:12px;
        color:@comColor;
        border:1px solid #E8E8E8;
    }
    .item-flex{
        .flex-row;
        justify-content: flex-start;
        align-items: center;
        &:nth-child(1) {
            width: 25%;
            overflow: hidden;
            height: 50px;
        }
        em{
            color: #F5222D;
            font-size: 16px;
        }
    }

    .no-see{
        display: none;
    }
    .padding30{
        padding-left:30px;
    }
}
</style>

<template>
    <div class="choose-contract-container">
        <Modal
            class="choose-contract"
            width="800"
            v-model="chooseContract"
            :mask-closable="false"
            @on-cancel="cancel"
            :title="$t('modules_spoc_sign_web_src_views_receiptmanagement_components_choosecontract_6993')">
            <div v-if="!list || list.length === 0">{{$t('modules_spoc_sign_web_src_views_receiptmanagement_components_choosecontract_7007')}}</div>
            <!-- <RadioGroup style="width: 100%" v-model="contract" @on-change="selectContract"> -->
            <RadioGroup style="width: 100%" v-model="contract" v-else>
                <div class="choose-contract-box" v-for='item in list' :key="item.ctId">
                    <div class="item-line">
                        <div class="item-flex">
                            <Radio :label="item.ctId" :value="item.ctId"><span class="no-see">{{item.ctId}}</span></Radio>
                            <a v-if="item.name && item.name.length < 12">{{item.name}}</a>
                            <Tooltip v-else :content="item.name" max-width="200"><a>{{item.name.substring(0,12)}}</a></Tooltip>
                        </div>
                        <div class="item-flex"><span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_5003')}}</span><b>{{item.signTime}}</b></div>
                        <div class="item-flex"><span>{{$t('modules_spoc_sign_web_src_views_applyrefund_components_chooserefound_5004')}}</span><b>{{item.sellerName}}</b></div>
                        <div class="item-flex"><span>{{$t('modules_spoc_sign_web_src_views_receiptmanagement_components_choosecontract_6996')}}</span><em>{{formatNums(item.sparePrice)}}</em>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</div>
                    </div>
                    <!-- <Table
                        v-if="item.ctId === contract"
                        :columns="cols"
                        :data="item.courseInfoVOList">
                    </Table> -->
                </div>
            </RadioGroup>
            <div slot="footer">
                <Button @click="cancel">{{$t('classroom_allscore_53')}}</Button>
                <Button type="primary" @click="submit">{{$t('scoretemplate_scoretemplate_561')}}</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import valid, { errors, htContract } from "../../../libs/request";
export default {
    name: 'addNewPayment',
    props: {
        studentId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            chooseContract:false,
            contract:'',
            cols:[
                {
                    title: this.$t('modules_spoc_jw_web_src_views_chargingmanage_chargingmanagelist_2335'),
                    key: "courseName",
                    className:'padding30'
                },

                {
                    title: this.$t('views_coursepack_coursepack_380'),
                    key: "publicUnitPrice"
                },
                {
                    title: this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_604'),
                    key: "courseHourNum"
                },
                {
                    title: this.$t('modules_spoc_sign_web_src_views_receiptmanagement_components_choosecontract_7003'),
                    key: "coursePrice"
                },
                {
                    title: this.$t('modules_spoc_sign_web_src_views_receiptmanagement_components_choosecontract_7004'),
                    key: "costNum"
                },

                {
                    title: this.$t('modules_spoc_jw_web_src_views_1v1_components_studentmodal_2134'),
                    key: "leftCourseHour"
                },
            ],
            list:[],
            pageNo: 1,
            pageSize: 10,
            count: 0,
        }
    },
    methods: {
        showMyPop(){
            this.getLists();
            this.chooseContract = true
        },
        getLists() {
            let params = {
                studentId: this.studentId,
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                statusFlag: 0,
                status: 'unpay,paying'
            }
            htContract.listContractsWithJwTeacher(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    let _data = res.data.data;
                    this.count = _data.total;
                    // console.log(_data.list)
                    this.list = _data.list;
                }
            })
            .catch(errors.call(this));
        },
        cancel(){
            this.chooseContract = false
        },
        submit(){
            let _this = this;
            if(!this.contract){
                this.$Message.warning({
                    top: 50,
                    duration: 3,
                    content:this.$t('modules_spoc_sign_web_src_views_receiptmanagement_components_choosecontract_7006')
                })
            }else{
                this.chooseContract = false
                let _lists = this.list.filter(function(item){
                    return item.ctId == _this.contract; 
                })[0];
                // console.log(_lists);
                this.$emit('contract-id', _lists)
                this.contract = ''
            }
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
}
</script>
