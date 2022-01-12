import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { localRead } from '@/libs/util'
import customZhCn1 from './lang/zh-CN1'
import customZhCn2 from './lang/zh-CN2'
import customZhCn3 from './lang/zh-CN3'
import customZhCn4 from './lang/zh-CN4'
import customZhCn5 from './lang/zh-CN5'
import customZhTw from './lang/zh-TW'
import customEnUs1 from './lang/en-US1'
import customEnUs2 from './lang/en-US2'
import customEnUs3 from './lang/en-US3'
import customEnUs4 from './lang/en-US4'
import customEnUs5 from './lang/en-US5'
import zhCnLocale from 'view-design/dist/locale/zh-CN'
import enUsLocale from 'view-design/dist/locale/en-US'
import zhTwLocale from 'view-design/dist/locale/zh-TW'
import enElementLocale from 'element-ui/lib/locale/lang/en'
import zhElementLocale from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(VueI18n)

// 自动根据浏览器系统语言设置语言
const navLang = navigator.language
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false
let lang = localRead('local') || localLang || 'zh-CN'

Vue.config.lang = lang

// vue-i18n 6.x+写法
Vue.locale = () => { }
let messages;
if (lang == 'zh-CN') {
  messages = {
    'zh-CN': Object.assign(zhCnLocale, customZhCn1, customZhCn2, customZhCn3, customZhCn4, customZhCn5,zhElementLocale),
    // 'zh-TW': Object.assign(zhTwLocale, customZhTw),
    // 'en-US': Object.assign(enUsLocale, customEnUs1, customEnUs2, customEnUs3, customEnUs4, customEnUs5)
  }
} else {
  messages = {
    // 'zh-CN': Object.assign(zhCnLocale, customZhCn1, customZhCn2, customZhCn3, customZhCn4, customZhCn5),
    // 'zh-TW': Object.assign(zhTwLocale, customZhTw),
    'en-US': Object.assign(enUsLocale, customEnUs1, customEnUs2, customEnUs3, customEnUs4, customEnUs5,enElementLocale)
  }
}

const i18n = new VueI18n({
  locale: lang,
  messages
})

export default i18n

// vue-i18n 5.x写法
// Vue.locale('zh-CN', Object.assign(zhCnLocale, customZhCn))
// Vue.locale('en-US', Object.assign(zhTwLocale, customZhTw))
// Vue.locale('zh-TW', Object.assign(enUsLocale, customEnUs))
