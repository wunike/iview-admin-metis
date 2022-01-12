<style lang="less">
.monthly-balance-modal-container{
    .ivu-modal-body{
        padding-top: 15px;padding-bottom: 15px;
    }
    .ivu-form-item{
        margin-bottom: 12px;
    }
    .admin-ids {
        .ivu-select-selection {
            > div {
                overflow: hidden;
                width: 312px;
                height: 62px;
                text-overflow: ellipsis;
                white-space: nowrap;
                .ivu-tag {
                    float: left;
                }
            }
            height: 62px;
        }
    }
    .ivu-modal-body{
        padding-bottom: 0;
    }
}
.monthly-balance-modal-confirm{
    .ivu-modal-header{
        display: none;
    }
    .ivu-modal-body{
        padding: 16px 0 0;
    }
    .ivu-modal-footer {
        height: 32px + 24px;
        button{
            float: right;
            width: 66px;height: 32px;padding: 0;
        }
    }
    .title{
        @h: 22px;
        position: relative;
        padding: 16px 0 14px 70px;
        line-height: @h;height: @h + 30px;
        font-size: 16px;
        i{
            position: absolute;left: 32px;top: 16px;
            color: #FAAD14;font-size: 22px;
        }
    }
    .detail{
        line-height: 22px;
        padding: 0 32px 22px 70px;font-size: 14px;font-weight: 400;
        span{
            color: #FF1B1B;
        }
    }
}
</style>
    
<template>
<div>
    <Modal
        v-model="modal"
        :title="title"
        width="600"
        class-name="monthly-balance-modal-container"
        :loading="loading"
        @on-ok="ok"
        @on-cancel="cancel">
        <Form :model="modalData" label-position="right" :label-width="126">
            <FormItem :label="$t('modules_spoc_report_web_src_views_monthlybalance_modal_4634')">
                <span>{{modalData.date}}</span>
            </FormItem>
            <FormItem :label="$t('modules_spoc_report_web_src_views_monthlybalance_modal_4635')">
                <span>{{modalData.title}}</span>
            </FormItem>
            <FormItem :label="$t('modules_spoc_report_web_src_views_monthlybalance_modal_4636')" v-if="modalData.status == 'failArchive'">
                <span>{{modalData.recentArchiveDate || '-'}}</span>
            </FormItem>
            <FormItem :label="$t('modules_spoc_report_web_src_views_monthlybalance_modal_4637')">
                <RadioGroup v-model="status">
                    <Radio label="1">{{$t('modules_leftremenu_92')}}</Radio>
                    <Radio label="2">{{$t('modules_leftremenu_93')}}</Radio>
                </RadioGroup>
            </FormItem>
           <!--  <FormItem :label="$t('modules_spoc_report_web_src_views_monthlybalance_modal_4640')">
                <DatePicker type="date" :disabled="status == '1'" :placeholder="$t('pushsettings_index_505')" v-model="date" style="width: 372px;"></DatePicker>
            </FormItem> -->
        </Form>
    </Modal>
    <Modal 
        v-model="withdrawModal" 
        :closable="false"
        width="433"
        class="monthly-balance-modal-confirm">
        <div slot="header"></div>
        <div class="title">
            <Icon type="md-help-circle" />
            <span>{{type != 'complateArchive' ? $t('modules_spoc_report_web_src_views_monthlybalance_modal_4642') : $t('modules_spoc_report_web_src_views_monthlybalance_modal_4643')}}</span>
        </div>
        <div class="detail">
            <span>{{type != 'complateArchive' ? $t('modules_spoc_report_web_src_views_monthlybalance_modal_4644') : $t('modules_spoc_report_web_src_views_monthlybalance_modal_4645')}}</span>{{$t('modules_spoc_report_web_src_views_monthlybalance_modal_4646')}}</div>
        <div slot="footer">
            <div>
                <Button type="primary" style="margin-left: 8px" @click="withdrawOk">{{$t('classroom_allscore_54')}}</Button>
                <Button @click="withdrawCancel">{{$t('classroom_allscore_53')}}</Button>
            </div>
        </div>
    </Modal>
    <Modal
        v-model="modalMultiple"
        :title="$t('modules_spoc_report_web_src_views_monthlybalance_index_4624')"
        width="548"
        class-name="monthly-balance-modal-container"
        :loading="loading"
        @on-ok="okMultiple"
        @on-cancel="cancelMultiple">
        <Form :model="multipleData" label-position="right" :label-width="100">
            <FormItem :label="$t('modules_spoc_report_web_src_views_monthlybalance_modal_4650')">
                <DatePicker v-model="dateMonth"
                    type="month"
                    @on-change="dateMonthChange"
                    placement="bottom-start"
                    separator=" ~ "
                    :placeholder="$t('modules_spoc_report_web_src_views_monthlybalance_index_4618')"
                    :clearable="false"
                    style="width:340px;">
                </DatePicker>
            </FormItem>
            <FormItem :label="$t('modules_spoc_report_web_src_views_monthlybalance_modal_4652')">
                <Select
                    class="admin-ids"
                    v-model="officeIds"
                    multiple
                    @on-change="changeOfficeIds"
                    style="width:340px;height:62px;margin-right:8px;">
                    <Option v-for="item in officeIdList" :value="item.officeId" :key="item.officeId">{{ item.title }}</Option>
                </Select>
                <Checkbox :disabled="fordbidAll" v-model="selectAll" @on-change="changeAll">{{$t('modules_rolepeople_212')}}</Checkbox>
            </FormItem>
            <FormItem :label="$t('modules_spoc_report_web_src_views_monthlybalance_modal_4637')">
                <RadioGroup v-model="status">
                    <Radio label="1">{{$t('modules_leftremenu_92')}}</Radio>
                    <Radio label="2">{{$t('modules_leftremenu_93')}}</Radio>
                </RadioGroup>
            </FormItem>
            <!-- <FormItem :label="$t('modules_spoc_report_web_src_views_monthlybalance_modal_4640')">
                <DatePicker type="date" :disabled="status == '1'" :placeholder="$t('pushsettings_index_505')" v-model="date" style="width: 372px;"></DatePicker>
            </FormItem> -->
        </Form>
    </Modal>
</div>
</template>

<script>
/**
 ** @author: 曹见芳
 ** 月结 - 弹窗
 */
import valid, { errors, rptArchiveSchedule } from "../../libs/request";
import { getMonthEndDay } from "@public/libs/util";
export default {
    name: 'monthlyBalanceModal',
    data(){
        return {
            modal: false,
            modalData: {},
            loading: true,
            status: '1',
            date: '',
            withdrawModal: false,
            type: '',
            // 批量手动月结
            modalMultiple: false,
            dateMonth: '',
            officeIds: [],
            selectAll: false,
            officeIdAll: [],
            officeIdList: []
        };
    },
    computed: {
        title() {
            let str = this.$t('modules_spoc_report_web_src_views_monthlybalance_index_4624');
            if(this.modalData.status == 'archiving' || this.modalData.status == 'unarchive') {
                str = this.$t('modules_spoc_report_web_src_views_monthlybalance_index_4629');
            }
            return str;
        },
    },
    methods: {
        show(item) {
            // console.log('show')
            this.status = '1';
            this.date = '';
            this.modalData = item;
            this.modal = true;
        },
        ok() {
            // console.log(this.status)
            if(this.status == '2' && !this.date) {
                this.$Message.error(this.$t('modules_spoc_report_web_src_views_monthlybalance_modal_4655'));
                this.changeLoading();
            } else {
                let params = {
                    archiveScheduleIds: [this.modalData.id],
                    executeNow: this.status == '1' ? true : false,
                    planExecuteDate: this.status == '1' ? new Date().format("yyyy-MM-dd") : new Date(this.date).format("yyyy-MM-dd")
                }
                this.manualArchive(params);
            }
        },
        cancel() {},
        changeLoading() {
            this.loading = false;
            setTimeout(() => {
                this.loading = true;
            }, 0);
        },
        showWithdrawModal(item, type) {
            this.status = '1';
            this.date = '';
            this.type = type;
            this.modalData = item;
            this.withdrawModal = true;
        },
        withdrawOk() {
            if(this.type != 'complateArchive') {
                // 手动月结
                this.modal = true;
            } else {
                // 反月结
                this.liftArchive();
            }
            this.withdrawCancel();
        },
        withdrawCancel() {
            this.withdrawModal = false;
        },
        liftArchive() {
            // 反月结
            let params = {
                id: this.modalData.id
            }
            rptArchiveSchedule.liftArchive(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.$Message.success(this.$t('modules_spoc_report_web_src_views_monthlybalance_modal_4656'))
                    this.$emit('uploadLists')
                    
                } 
                this.withdrawModal = false;
                // else {
                //     this.$Message.error(this.$t('modules_spoc_report_web_src_views_monthlybalance_modal_4657'))
                //     this.withdrawModal = false;
                // }
            }).catch(errors.call(this));
        },
        // 批量手动月结
        showManualArchiveMultiple() {
            this.dateMonth = ''
            this.status = '1';
            this.selectAll = false;
            this.officeIds = [];
            this.date = '';
            this.multipleData = {

            }
            this.officeIdList = [];
            this.officeIdAll = [];
            this.modalMultiple = true;
        },
        okMultiple() {
            if(this.status == '2' && !this.date) {
                this.$Message.error(this.$t('modules_spoc_report_web_src_views_monthlybalance_modal_4655'));
                this.changeLoading();
            } else {
                let params = {
                    executeNow: this.status == '1' ? true : false,
                    planExecuteDate: this.status == '1' ? new Date().format("yyyy-MM-dd") : new Date(this.date).format("yyyy-MM-dd"),
                    date: getMonthEndDay(this.dateMonth, false)
                }
                let arr = [];
                this.officeIdList.forEach(office => {
                    if(this.officeIds.indexOf(office.officeId) > -1) {
                        arr.push(office.officeId)
                    }
                });
                params.archiveOfficeIds = arr;
                // console.log(params)
                this.manualArchive(params);
            }
        },
        cancelMultiple() {},
        dateMonthChange() {
            let _date = new Date(this.dateMonth);
            let params = {
                year: _date.getFullYear(),
                month: _date.getMonth() + 1
            }
            rptArchiveSchedule.findListByYearMonth(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.officeIdList = res.data.data;
                    // console.log(this.officeIdList)
                    let arr = [];
                    this.officeIdList.forEach(item => {
                        // if(item.status == 'unarchive') 
                        arr.push(item.officeId);
                    });
                    this.officeIdAll = arr;
                    this.officeIds = [];
                    this.selectAll = false
                } else {
                    this.officeIdList = [];
                    this.officeIdAll = [];
                    this.officeIds = [];
                    this.selectAll = false
                }
            }).catch(errors.call(this));
        },
        changeOfficeIds(arr) {
            this.selectAll = (arr.length === this.officeIdAll.length) && (arr.length != 0);
            console.log(arr.length, this.officeIdAll.length, this.selectAll)
        },
        changeAll(val) {
            if (val) {
                this.officeIds = [...this.officeIdAll];
            } else {
                this.officeIds = [];
            }
        },
        manualArchive(params) {
            rptArchiveSchedule.manualArchive(params).then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.$emit('uploadLists')
                    this.modal = false;
                    this.modalMultiple = false;
                } else this.changeLoading();
            }).catch(errors.call(this));
        }
    }
}
</script>


