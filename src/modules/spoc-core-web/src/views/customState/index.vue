
<style lang="less">
.custom-state-container{
    width:100%;
    height:100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    @rad:4px;
    .csc-left{
        width:200px;
        background: #fff;
        height:100%;
        margin-right:8px;
        border-radius: @rad;
    }
    .csc-right{
        flex: 1;
        background: #fff;
        border-radius: @rad;
        padding:16px;
        height:100%;
        overflow-y: auto;
    }
}
</style>

<template>
    <div class="custom-state-container">
        <div class="csc-left">
            <bussinessObject :types="types" @changeType="changeType" ref="bussinessObject"></bussinessObject>
        </div>
        <div class="csc-right">
            <Tabs v-model="tabName" @on-click="changeTab" :animated="false">
                <TabPane v-for="(item, index) in configurations" :key="index"
                    :label="item.name" :name="index+''">
                    <customizeState :menuId="menuId" :configId="configId" :button="button" :relStatisticalTermsList="relStatisticalTermsList" v-if="relStatisticalTermsList && relStatisticalTermsList.length && menuId && configId=='crm:customState' && tabName == '0' && button && button.length" ref="customizeState"></customizeState>
                    <courseState :menuId="menuId" :configId="configId" :serviceOpt="serviceOpt" v-if="serviceOpt && serviceOpt.length && menuId && configId=='com:studentCourseRel' && tabName == '0'" ref="courseState"></courseState>
                    <stateGroup :menuId="menuId" :configId="configId" v-if="menuId && configId && tabName == '1'" ref="stateGroup"></stateGroup>
                    <stateStatistics :menuId="menuId" :configId="configId" v-if="menuId && configId && tabName == '2'" ref="stateStatistics"></stateStatistics>
                </TabPane>
            </Tabs>
            <!-- <Tabs v-model="tabName" @on-click="changeTab" :animated="false">
                <TabPane :label="$t('modules_spoc_core_web_src_views_customstate_index_175')" name="0">
                    <customizeState :menuId="menuId" :configId="configId" :button="button" :relStatisticalTermsList="relStatisticalTermsList" v-if="relStatisticalTermsList.length && menuId && configId && tabName == '0' && button.length" ref="customizeState"></customizeState>
                </TabPane>
                <TabPane :label="$t('modules_spoc_core_web_src_views_customstate_index_176')" name="1">
                    <stateGroup :menuId="menuId" :configId="configId" v-if="menuId && configId && tabName == '1'" ref="stateGroup"></stateGroup>
                </TabPane>
                <TabPane :label="$t('modules_spoc_core_web_src_views_customstate_index_177')" name="2">
                    <stateStatistics :menuId="menuId" :configId="configId" v-if="menuId && configId && tabName == '2'" ref="stateStatistics"></stateStatistics>
                </TabPane>
            </Tabs> -->
        </div>
    </div>
</template>

<script>
import valid, {
    errors,
    sysUser,
    sysDict,
    sysConfig,
    common
} from "../../libs/request";
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";
import { waitUntil } from '@public/libs/util';
import bussinessObject from "./bussinessObject";
import customizeState from "./customizeState";
import courseState from "./courseState";
import stateGroup from './stateGroup'
import stateStatistics from './stateStatistics'
export default {
    name: 'core.customState',
    components: {
        bussinessObject,
        customizeState,
        courseState,
        stateGroup,
        stateStatistics,
    },
    data() {
        return {
            menuId: '',
            configId: '',
            types: null,
            tabName: '0',
            selectIndex: 0,
            button: [],
            relStatisticalTermsList: null,
            configurations: [],
            serviceOpt: null,
        }
    },
    mounted() {
        this.getConfig()
    },
    methods: {
        changeTab(tabName){
            console.log(tabName,"changeTab")
            this.configId = ''
            this.$nextTick(()=>{
                this.configId = this.types[this.selectIndex].configurations[parseInt(tabName)].configId
            })
        },
        changeType(selectIndex){
            console.log(selectIndex,"selectIndex")
            this.selectIndex = selectIndex
            this.tabName = '-1'
            this.$nextTick(()=>{
                this.menuId = this.types[selectIndex].menuId
                this.configId = this.types[selectIndex].configurations[0].configId
                this.configurations = this.types[selectIndex].configurations
                this.button = this.types[selectIndex].button
                this.tabName = '0'
                this.serviceOpt = this.types[selectIndex].serviceOpt
                console.log(this.menuId, this.configId, '=======2')
            })
        },
        getConfig(){
            sysConfig.getConfig({ 
                menuId:0,
                configId: 'base:buinessentity'
            }).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.types = res.data.data
                    this.menuId = res.data.data[0].menuId
                    this.configurations = res.data.data[0].configurations
                    this.configId = res.data.data[0].configurations[0].configId
                    this.button = res.data.data[0].button

                    console.log(this.menuId, this.configId, '=======1')
                }
            })
            .catch(errors.call(this))
            .finally(() => {
            });

            //获取统计项
            sysConfig.getConfigSub({ 
                menuId:2001,
                configId:'crm:statisticsState',
                subArrKey: 'type',
                subArrValue:'customer management list',
                subArrGetKey:'group'
            }).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.relStatisticalTermsList = res.data.data
                }
            })
            .catch(errors.call(this))
            .finally(() => {
            });

            
        },
    },
}
</script>
