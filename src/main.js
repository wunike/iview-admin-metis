// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App'
import router from './router'
import store from './store'
// import iView from 'iview'
import iView from 'view-design';
import i18n from '@/locale'
import config from '@/config'
// import importDirective from '@/directive'
import {
    directive as clickOutside
} from 'v-click-outside-x'
import installPlugin from '@/plugin'
import './assets/less/public.less';
//import './assets/less/theme.less';
import './index.less';
import '@/assets/icons/iconfont.css'
import TreeTable from 'tree-table-vue'
import VOrgTree from 'v-org-tree'
import 'v-org-tree/dist/v-org-tree.css'
import "./libs/polyfill.js";
import VueI18n from 'vue-i18n';
import Cookies from "js-cookie";
import VueContextMenu from 'vue-contextmenu';
import formCreate from '@form-create/iview';
import {
    maker
} from '@form-create/iview'
import addressMap from '@public/modules/addressMap.vue';
import cosUpload from '@public/modules/cosUpload.vue';
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import Vddl from 'vddl';

import 'view-design/dist/styles/iview.css';
import './assets/default.css';
import './assets/blue.css';
import './assets/grass.css';
import './assets/iris.css';
import './assets/coral.css';
import './assets/orange.css';
// import '@client/permission' // 权限控制
import * as mUtils from '@client/common/js/mUtils'
import AES from '@client/common/js/secret'
import userModel from '@client/mixins/userModel'

import '@client/common/styles/element-variables.scss'
import '@client/common/styles/index.scss' // 自定义 css
import filters from '@client/filters/index'
import 'animate.css'
import Element from 'element-ui'
import VueClipboard from 'vue-clipboard2'
import VCharts from 'v-charts'

Vue.use(VueClipboard)
Vue.use(Vddl);
Vue.use(formCreate)
Vue.use(VCharts)
/**
 * 引入公共方法mUtils
 */

Vue.prototype.$mUtils = mUtils;
Vue.prototype.AES = AES
// 注册全局过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

// 全局注册mixins
Vue.mixin(userModel); // 公共mixins

String.prototype.replaceAll = function(s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
}

const requireComponent = require.context(
    // 其组件目录的相对路径
    '@public/modules',
    // 是否查询其子目录
    false,
    // 匹配基础组件文件名的正则表达式
    /(addressMap|cosUpload)\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
    // 获取组件配置
    const componentConfig = requireComponent(fileName)

    // 获取组件的 PascalCase 命名
    const componentName = upperFirst(
        camelCase(
            // 获取和目录深度无关的文件名
            fileName
            .split('/')
            .pop()
            .replace(/\.\w+$/, '')
        )
    )
    console.log(componentName)
    // 全局注册组件
    Vue.component(
        componentName,
        // 如果这个组件选项是通过 `export default` 导出的，
        // 那么就会优先使用 `.default`，
        // 否则回退到使用模块的根。
        componentConfig.default || componentConfig
    )
})
// 实际打包时应该不引入mock
/* eslint-disable */
if (process.env.NODE_ENV !== 'production') require('@/mock')

Vue.use(VueContextMenu)
import MonthRangeDatePicker from 'iview-datepicker-monthrange'
Vue.use(MonthRangeDatePicker, {
    i18n: (key, value) => i18n.t(key, value)
});
Vue.use(iView, {
    i18n: (key, value) => i18n.t(key, value)
})
Vue.use(Element, {
    i18n: (key, value) => i18n.t(key, value)
})
Vue.use(TreeTable)
Vue.use(VOrgTree)
/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
/**
 * 注册指令
 */
// importDirective(Vue)
Vue.directive('clickOutside', clickOutside)

store.registerModule('config', {
    state: {
        homeRouter: 'portal.workbenchNew', //'portal.app',
        loginRouter: 'portal.login',
    }
})

/* eslint-disable no-new */

import Highcharts from "highcharts/highcharts";
import HighchartsVue from "highcharts-vue";
// import exportingInit from 'highcharts/modules/exporting'
// exportingInit(Highcharts)
// import stockInit from "highcharts/modules/stock";
// stockInit(Highcharts);

import funnel from 'highcharts/modules/funnel'
funnel(Highcharts);
Vue.use(HighchartsVue);


new Vue({
    el: '#app',
    router,
    i18n,
    store,
    render: h => h(App)
})
const isDebug = process.env.NODE_ENV !== 'production';
let isShowConfirm = false
Vue.config.debug = isDebug;
Vue.config.devtools = isDebug;
Vue.config.productionTip = isDebug;
