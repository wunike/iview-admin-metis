const currentConfigKey = process.env.NODE_ENV
const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV === 'development'
const $config = {
    "port": "4000",
    "adminAccount": "admin",
    "db": {
        "servername": "dds-2ze881840d4e21e41216-pub.mongodb.rds.aliyuncs.com",
        "DATABASE": "admin",
        "port": 3717,
        "user": "root",
        "pass": "Ivygatemongo2019!",
        "authSource": "admin"
    },
    "baseURL": "https://h5server.suzhijiaedu.com"
}

const configDict = {
	development: {
		baseURL: $config.baseURL
	},
	production: {
		baseURL: $config.baseURL
	}
}
export default {
    /**
     * @description 配置显示在浏览器标签的title
     */
    title: '',
    /**
     * @description token在Cookie中存储的天数，默认1天
     */
    cookieExpires: '',
    /**
     * @description 是否使用国际化，默认为false
     *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
     *              用来在菜单中显示文字
     */
    useI18n: true,
    /**
     * @description api请求基础路径
     */
    baseUrl: {
        dev: '',
        pro: ''
    },
    /**
     * @description 默认打开的首页的路由name值，默认为home
     */
    homeName: 'portal.workbenchNew', //'portal.app',
    /**
     * @description 需要加载的插件
     */
    plugin: {
        'error-store': {
            showInHeader: true, // 设为false后不会在顶部显示错误日志徽标
            developmentOff: true // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
        }
    },
    isDevelop: (isDev || isTest),
    ...configDict[currentConfigKey],
    // h5模式宽高
    canvasH5Width: 375,
    canvasH5Height: 644,
    // pc模式宽高
    canvasPcWidth: 1200,
    canvasPcHeight: 847,
    baseURL1: 'https://h5server.suzhijiaedu.com'
}
