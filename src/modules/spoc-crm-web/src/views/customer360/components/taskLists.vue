<style lang="less">
@mainColor: #44BCB7;
.task-lists-temp-container{
    position: relative;
    padding: 20px 20px 10px;min-height: 100%;
    background: #fff;
    .tabs{
        height: 30px;margin-bottom: 20px;
    }
    .tabs-btns{
        @h: 30px;
        li{
            float: left;height: @h;line-height: @h - 2px;
            width: 112px;margin-right: -1px;
            border: 1px solid #D4D5DA;font-size: 14px;
            text-align: center;
            cursor: pointer;
            &.active{
                background: @mainColor;border-color: @mainColor;color: #fff;
            }
            &:first-child{
                border-radius:4px 0px 0px 4px;
            }
            &:last-child{
                border-radius:0px 4px 4px 0px;
            }
        }
    }
    .filter-select{
        @h: 32px;
        float: right;
        height: @h;
        .ivu-select{
            float: left;width: 224px;height: @h;
            margin-left: 12px;
        }
    }
    .no-lists{
        position: absolute;
        top: 50%;
		left: 0;
		right: 0;
		transform: translate(0, -50%);
        text-align: center;
        img{
            display: block;width: 300px;margin: 0 auto;
        }
        p{
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 2;
            font-size: 16px;
            line-height: 48px;
        }
    }
}
</style>
    
<template>
<div class="task-lists-temp-container">
    <div class="tabs">
        <ul class="tabs-btns">
            <li :class="{active: taskType == 'follow task'}" @click="changeTabs('follow task')">{{$t('modules_spoc_crm_web_src_views_customer360_components_tasklists_1036')}}</li>
            <li :class="{active: taskType == 'service task'}" @click="changeTabs('service task')">{{$t('modules_spoc_crm_web_src_views_customer360_components_tasklists_1037')}}</li>
            <li v-if="studentId" :class="{active: taskType == 'sop task'}" @click="changeTabs('sop task')">{{$t('modules_spoc_crm_web_src_views_customer360_components_tasklists_1038')}}</li>
        </ul>
        <div class="filter-select">
            <Select v-model="myfilter" @on-change="onFilterChange" v-if="taskType == 'sop task'">
                <Option :value="item.classId" v-for="(item,index) in traceTypes" :key="'fi'+index">{{ item.className }}</Option>
            </Select>
            <!-- 客户360 任务列表筛选【变更】 -->
            <Select v-model="tplId" @on-change="onTplidChange">
                <Option :value="item.tplId" v-for="item in taskTplLists" :key="item.tplId">{{ item.tplName }}</Option>
            </Select>
        </div>
    </div>
    <div class="task-lists-card" v-if="taskLists && taskLists.length">
        <task-item v-for="(task, i) in taskLists" :key="i" :taskItem="task" @doSearch="doSearch" @showDetail="showDetail"></task-item>
    </div>
    <div class="no-lists" v-else>
        <img src="../../../assets/img/noLists.png" alt="">
        <p>{{noListsTxt}}</p>
    </div>
</div>
</template>

<script>
/**
 ** @author: 曹见芳
 ** 客户360 - 任务列表
 */
import taskItem from "./taskItem.vue";
import { mapMutations, mapState } from "vuex";
import valid, {
	errors,
    common,
    crmCustomer
} from "../../../libs/request";
export default {
    name: 'taskListsTemp',
    components: {
        taskItem
    },
    props: {
        id: {
            type: String,
            required: true
        },
        studentId: {
            type: String,
            required: true
        },
    },
    watch: {
        id: function(newVal, oldVal) {
            if (this.$route.name == 'crm.customer360') {
				this.getListData();
			}
        }
    },
    data(){
        return {
            taskType: 'follow task',
            myfilter: '',
            traceTypes: [],
            noListsTxt: this.$t('modules_spoc_crm_web_src_views_customer360_components_tasklists_1039'),
            taskLists: [
                // {
                //     type: '1',
                //     typeLabel: '联系',
                //     finished: false,
                //     name: 'Jason Liu',
                //     text: '约定25号电话联系家长。',
                //     time: '2019-07-01 10:46'
                // },
            ],
            tplId: 'all',
            taskTplLists: []
        };
    },
    computed: {

    },
    mounted(){
        this.getListData();
        this.getTaskTplLists();
        this.getClassByStudentId();
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        getTaskTplLists() {
            // console.log('getTaskTplLists', this.id)
            let params = {
                objectId: this.id
            }
            common.getTaskTplByObjectId(params)
            .then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    let _data = res.data.data;
                    this.taskTplLists = [{
                        tplId: 'all',
                        tplName: this.$t('message_index_287')
                    }, ..._data];
                }
            })
            .catch(errors.call(this))
        },
        showDetail(taskId){
            this.$emit('showDetail', taskId)
        },
        getClassByStudentId() {
            if(this.studentId) {
                let params = {
                    studentId: this.studentId
                }
                crmCustomer.getClassByStudentId(params)
                .then(valid.call(this))
                .then(res => {
                    if(res.ok) {
                        this.traceTypes = res.data.data;
                    }
                })
                .catch(errors.call(this))
            }
        },
        onFilterChange() {
            // 筛选类型
            this.doSearch();
        },
        onTplidChange() {
            this.doSearch();
        },
        changeTabs(str) {
            this.taskType = str;
            if(str == 'follow task') {
                this.noListsTxt = this.$t('modules_spoc_crm_web_src_views_customer360_components_tasklists_1039');
            } else if(str == 'service task') {
                this.noListsTxt = this.$t('modules_spoc_crm_web_src_views_customer360_components_tasklists_1041');
            } else {
                this.noListsTxt = this.$t('modules_spoc_crm_web_src_views_customer360_components_tasklists_1042');
            }
            // this.noListsTxt = str == 'follow task' ? '暂无跟进任务～' : '暂无服务任务～';
            this.getListData()
        },
        doSearch() {
            this.getListData();
            this.$emit('doSearch')
        },
        getListData() {
			this.updateLoadingStatus({ isLoading: true });
			let param = {
                pageNo: -1,
                objectId: this.id,
                type: this.taskType
            };
            if(this.tplId && this.tplId != 'all') param.tplId = this.tplId
            // console.log('getListData =>', this.myfilter)
            if(this.myfilter) param.classId = this.myfilter;
			common
				.listPageComTask(param)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let result = res.data.data;
						this.taskLists = result.list;
				}
			})
			.catch(errors.call(this))
			.finally(() => {
				this.updateLoadingStatus({ isLoading: false });
			});
		},
    },
}
</script>


