<style lang="less">
.task-item-container{
    margin: 12px 0;
    box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.15);
    border-radius:4px;
    padding: 5px 18px 3px 13px;
    cursor: pointer;
    .line-1{
        @h: 28px;
        height: @h;line-height: @h;margin-bottom: 3px;
        font-size: 14px;
        cursor: pointer;
        .type{
            float: right;
            font-size: 12px;color: #999;
            i{
                float: right;margin-top: 4px;
                margin-left: 9px;
                color: #FBC271;
                font-size: 18px;
            }
        }
    }
    .detail{
        @h: 24px;
        line-height: @h;
        font-size: 12px;
        span{
            font-weight: bold;
        }
    }
    .time{
        @h: 30px;
        height: @h;line-height: @h;
        font-size: 12px;color: #999;
    }
}
</style>
    
<template>
<div class="task-item-container" @click="changeStatus">
    <div class="line-1">
        <Checkbox v-model="taskItem.status" :disabled="taskItem.status == '1'" true-value="1" false-value="0"></Checkbox>
        <span class="name">{{taskItem.tplName}}</span>
        <div class="type">
            <span>{{taskItem.executorName}}</span>
            <Icon type="md-person" />
            <!-- <i class="iconfont icon-jilu"></i> -->
        </div>
    </div>
    <div class="detail">
       <!--  <div class="txt" v-if="taskItem.type == '1'">{{taskItem.text}}</div>
        <div class="changeName" v-if="taskItem.type == '2'">{{$t('modules_spoc_crm_web_src_views_customer360_components_taskitem_1030')}}<span>{{taskItem.oldName}}</span>{{$t('modules_spoc_crm_web_src_views_customer360_components_taskitem_1031')}}<span>{{taskItem.newName}}</span></div>
        <div class="stutas" v-if="taskItem.type == '3'">{{$t('modules_spoc_crm_web_src_views_customer360_components_taskitem_1032')}}<span>{{taskItem.stutas}}</span></div> -->
        <!-- <div class="date" v-if="taskItem.description">{{$t('modules_spoc_crm_web_src_views_customer360_components_taskitem_1033', [taskItem.description])}}</div> -->
        <div class="date" v-if="taskItem.description">{{taskItem.description}}</div>
        <div class="date" v-if="taskItem.finishTime">{{$t('modules_spoc_crm_web_src_views_customer360_components_taskitem_1034', [taskItem.finishTime])}}</div>
    </div>
    <div class="time" v-if="taskItem.startTime || taskItem.className">
        <span v-if="taskItem.startTime">{{taskItem.startTime}}</span>
        <span v-if="taskItem.className" style="margin-left: 12px;">{{$t('modules_spoc_crm_web_src_views_customer360_components_taskitem_1035', [taskItem.className])}}</span>
    </div>
    <task-detail-modal @refresh="doSearch" ref="taskDeatilModalRef"></task-detail-modal>
</div>
</template>

<script>
/**
 ** @author: 曹见芳
 ** 客户360 - 单个任务
 */
import { mapMutations, mapState } from 'vuex';
import { waitUntil } from "@public/libs/util";
import taskDetailModal from "../../taskCenter/taskDetailModal.vue";
export default {
    name: 'taskItem',
    components: {
        taskDetailModal
    },
    props: {
        taskItem: {
            type: Object,
            required: true
        }
    },
    data(){
        return {
            myButtonPrem: []
        };
    },
    computed: {
        ...mapState(["buttonPerm", "userInfo"]),
    },
    mounted(){
        waitUntil(
            () => {
                return (this.userInfo && this.buttonPerm && (JSON.stringify(this.buttonPerm) != "{}")) || false;
            },
            () => {
                this.myButtonPrem = this.buttonPerm['crm.customer360'] || []
            }
        );
    },
    methods: {
        showDetail(taskId){
            this.$emit('showDetail', taskId)
        },
        changeStatus(flag) {
            // console.log(flag)
            // console.log(this.taskItem.finished)
            this.$refs.taskDeatilModalRef.showModal(this.taskItem.id);
            // this.$refs.taskDeatilModalRef.showModalComplete(this.taskItem.id);
        },
        doSearch(){
            this.$emit("doSearch")
        }
    },
}
</script>


