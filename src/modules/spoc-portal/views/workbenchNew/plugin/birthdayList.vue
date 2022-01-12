<style lang="less">
@import "./libs/public.less";
.birthday-list-plugin-wrapper {
    // background-image: url("../../../assets/img/workbenchNew/bg_birth.png");
    background-color: #fff;
    .birth-inner{
        position: absolute;left: 0;top: 0;right: 0;bottom: 0;padding-bottom: 26px;
        overflow-y: auto;
    }
    .birth-date, .birth-lists{
        padding: 0 20px;.clear();
    }
    .birth-date{
        line-height: 28px;height: 28px;
        span{
            float: left;
        }
        img{
            float: left;height: 21px;margin-left: -8px;margin-top: 3px;
        }
    }
    .birth-lists{
        line-height: 26px;
        li{
            float: left;width: 100% / 3;.oneLine;
        }
        i{
            font-size: 12px;color: #F8B62D;margin-left: 2px;
        }
    }
}
</style>

<template>
<plugin-template class="birthday-list-plugin-wrapper" 
    :style="{backgroundImage:`url(${require('../../../assets/img/workbenchNew/bg_birth.png')})`}"
    :mode="mode" :data="data" :dataLength="dataLength"
    @clickMore="clickMore" @loadData="loadData"
    @onButtonClick="onButtonClick"
    @init="init">
    <div class="birth-inner">
        <div class="birth-date" v-if="birthData && birthData.cuttentStudentBirthday && birthData.cuttentStudentBirthday.length">
            <span>今日（{{birthData.cuttentStudentBirthday.length}}）</span>
            <!-- <img src="../../../assets/img/workbenchNew/birth-today.gif" /> -->
        </div>
        <div class="birth-lists" v-if="birthData && birthData.cuttentStudentBirthday && birthData.cuttentStudentBirthday.length">
            <ul>
                <li v-for="(item, index) in birthData.cuttentStudentBirthday" :key="index">
                    <a @click="toCustomer360(item)">{{item.name}} {{item.enName}}</a>
                    <i class="iconfont icon-bianzu8" v-if="item.type == '1'"></i>
                </li>
            </ul>
        </div>
        <div class="birth-date" v-if="birthData && birthData.weekStudentBirthday && birthData.weekStudentBirthday.length">本周（{{birthData.weekStudentBirthday.length}}）</div>
        <div class="birth-lists" v-if="birthData && birthData.weekStudentBirthday && birthData.weekStudentBirthday.length">
            <ul>
                <li v-for="(item, index) in birthData.weekStudentBirthday" :key="index">
                    <a @click="toCustomer360(item)">{{item.name}} {{item.enName}}</a>
                    <i class="iconfont icon-bianzu8" v-if="item.type == '1'"></i>
                </li>
            </ul>
        </div>
        <div class="birth-date" v-if="birthData && birthData.monthStudentBirthday && birthData.monthStudentBirthday.length">本月（{{birthData.monthStudentBirthday.length}}）</div>
        <div class="birth-lists" v-if="birthData && birthData.monthStudentBirthday && birthData.monthStudentBirthday.length">
            <ul>
                <li v-for="(item, index) in birthData.monthStudentBirthday" :key="index">
                    <a @click="toCustomer360(item)">{{item.name}} {{item.enName}}</a>
                    <i class="iconfont icon-bianzu8" v-if="item.type == '1'"></i>
                </li>
            </ul>
        </div>
    </div>
</plugin-template>
</template>

<script>
/**
 ** @author: 曹见芳
 ** 插件 - 生日提醒
 */
import MODE from "./mode.js";
import valid, { errors, common } from '../../../libs/request.js';
import { crmCustomer } from '../../../../spoc-crm-web/src/libs/request.js'
import pluginTemplate from './components/template.vue'
import { mapMutations, mapState } from "vuex";
import { waitUntil } from "@public/libs/util";
export default {
    components: {
        pluginTemplate
    },
    props: {
        mode: { //当前模式
            type: String,
            default: '',
            required: true
        },
        data: { //节点数据
            type: Object,
            required: true
        },
    },
    data() {
        return {
            dataLength: true,
            birthData: {
                cuttentStudentBirthday: [],
                weekStudentBirthday: [],
                monthStudentBirthday: [],
            },
            officeId: ''
        }
    },
    computed: {
        ...mapState(["app"]),
        ...MODE
    },
    mounted() {
        waitUntil(
            () => {
                if (this.app.currOfficeId) this.officeId = this.app.currOfficeId;
                return this.app.currOfficeId
            },
            () => {
                this.findStudentBirthday();
            }
        );
    },
    methods: {
        //加载数据
        loadData() {
            
        },
        findStudentBirthday() {
            let params = {
                officeIds: this.officeId
            }
            console.log(params)
            crmCustomer.findStudentBirthday(params,{
                headers:{
                    menuRouteCover: this.data.menuRoute
                }
            })
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    let _data = res.data.data;
                    this.birthData = _data;
                    let flag = false;
                    if(this.birthData &&
                        ((_data.cuttentStudentBirthday && _data.cuttentStudentBirthday.length) ||
                        (_data.weekStudentBirthday && _data.weekStudentBirthday.length) ||
                        (_data.monthStudentBirthday && _data.monthStudentBirthday.length))) flag = true;
                    this.dataLength = flag;
                }
            })
            .catch(errors.call(this))
        },
        //点击更多
        clickMore(){
            console.log('clickMore')
        },
        init() {
            this.$emit("init", this);
        },
        onButtonClick(str) {
            this.$emit('onButtonClick', str);
        },
        toCustomer360(item) {
            this.$router.push({
                name: 'crm.customer360',
                query: {
                    id: item.cusId
                }
            });
        },
    },
    watch: {
        "app.currOfficeId": function(val, oldVal) {
            if (oldVal) {
                this.officeId = this.app.currOfficeId;
                this.findStudentBirthday();
            }
        }
    }
}
</script>
