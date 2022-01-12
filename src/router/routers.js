import Main from '@/components/mainCos'
import parentView from '@/components/parent-view'

/*
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

// 此处定义需要使用的子模块
const moduleList = [
    //	require('@/modules/spoc-choiceschool-web/router.js'),//选校
    //	// require('@/modules/spoc-library-web/router.js'),//院校库
    require('@/modules/spoc-jw-web/router.js'), //教务
    require('@/modules/spoc-sign-web/router.js'), //签约
    require('@/modules/spoc-core-web/router.js'), //组织机构
    require('@/modules/spoc-hootie-web/router.js'), //家校互动
    require('@/modules/spoc-crm-web/router.js'), //CRM
    require('@/modules/spoc-report-web/router.js'), //报表
    require('@/modules/spoc-h5-web/client/router/index.js'), //h5
    //	require('@/modules/spoc-plan-web/router.js'),//规划
    //	// require('@/modules/spoc-docu-web/router.js'),//文书
    //	// require('@/modules/spoc-apply-web/router.js'),//申请
    //	require('@/modules/spoc-market-web/router.js'),//微信营销
    //	require('@/modules/spoc-salary-web/router.js')//工资薪酬  发版屏蔽？
]

const routers = [{
    path: '/',
    component: (resolve) => require(['@/modules/spoc-portal/views/index.vue'], resolve),
    name: 'portal.index',
    meta: {
        title: '工作台前端'
    },
    redirect: {
        name: 'portal.appList'
    }, // 设置默认页跳转的路由名
    children: [
        // {{routerList}} // 须确保 portal.index 是第一个
        {
            path: '/appList.html',
            name: 'portal.appList',
            component: (resolve) => require(['@/modules/spoc-portal/views/applist.vue'], resolve),
            meta: {
                title: '应用管理',
                hideInMenu: true,
            },
            redirect: {
                name: 'portal.app'
            }, // 设置默认页跳转的路由名
            children: [{
                    path: '/app.html',
                    component: (resolve) => require(['@/modules/spoc-portal/views/app.vue'], resolve),
                    name: 'portal.app',
                    meta: {
                        title: '应用列表',
                        icon: '_shouye'
                    },
                },
                {
                    path: '/news.html',
                    component: (resolve) => require(['@/modules/spoc-portal/views/news/news.vue'],
                        resolve),
                    name: 'portal.news',
                    meta: {
                        title: '通知管理'
                    },
                    children: [{
                            path: '/newsList.html',
                            name: 'portal.newsList',
                            component: (resolve) => require([
                                '@/modules/spoc-portal/views/news/newsList.vue'
                            ], resolve),
                            meta: {
                                hideInMenu: true,
                            },
                        },
                        {
                            path: '/newSet.html',
                            name: 'portal.newSet',
                            component: (resolve) => require([
                                '@/modules/spoc-portal/views/news/newSet.vue'
                            ], resolve),
                            meta: {
                                hideInMenu: true,
                            },
                        }
                    ]
                }
            ]
        },
        {
            path: '/system.html',
            component: (resolve) => require(['@/modules/spoc-portal/views/system/index.vue'], resolve),
            name: 'portal.system',
            meta: {
                title: '系统',
                icon: '_jichupeizhi'
            },
            children: [{
                    path: '/system/tag',
                    name: 'portal.tagsManage',
                    meta: {
                        title: '标签管理'
                    },
                    component: (resolve) => {
                        require(['@/modules/spoc-portal/views/tag/tag'], resolve)
                    }
                },
                {
                    path: '/myFeedback',
                    component: (resolve) => require([
                        '@/modules/spoc-portal/views/selfCentred/myFeedback.vue'
                    ], resolve),
                    name: 'portal.myFeedback',
                    meta: {
                        title: '我的反馈'
                    },
                },
                {
                    path: '/system/workorderM',
                    name: 'portal.workorderM',
                    meta: {
                        title: '工单管理'
                    },
                    component: (resolve) => {
                        require(['@/modules/spoc-portal/views/workorderM'], resolve)
                    }
                },
                {
                    path: '/infoSet.html',
                    component: (resolve) => require(['@/modules/spoc-portal/views/infoSet.vue'],
                        resolve),
                    name: 'portal.infoSet',
                    meta: {
                        title: '通知设置'
                    }
                },
                {
                    path: '/dictmanage',
                    component: (resolve) => require([
                        '@/modules/spoc-portal/views/dictmanage/index.vue'],
                        resolve),
                    name: 'portal.dictmanage',
                    meta: {
                        title: "字典管理",
                        icon: '_zidianguanli'
                    }
                },
                {
                    path: '/systemConfig.html',
                    name: 'portal.systemConfig',
                    meta: {
                        title: '系统设置'
                    },
                    component: (resolve) => require([
                        '@/modules/spoc-portal/views/systemConfig/systemConfigWrap.vue'
                    ], resolve)
                },
                {
                    path: '/rolePermission.html',
                    component: (resolve) => require([
                        '@/modules/spoc-portal/views/rolePermission/index.vue'
                    ], resolve),
                    name: 'portal.rolePermission',
                    meta: {
                        title: '角色权限'
                    }
                },
                {
                    path: '/inConstruction.html',
                    component: (resolve) => require(['@/modules/spoc-portal/views/inConstruction.vue'],
                        resolve),
                    name: 'portal.inConstruction',
                    meta: {
                        title: '建设中'
                    }
                },
                {
                    path: '/personEdit.html',
                    component: (resolve) => require(['@/modules/spoc-portal/views/personEdit.vue'],
                        resolve),
                    name: 'portal.personEdit',
                    meta: {
                        title: '个人信息',
                        notCache: true
                    }
                },
            ]
        },
        {
            path: '/customAttribute.html',
            component: (resolve) => require([
                '@/modules/spoc-portal/views/customAttribute/customAttribute.vue'
            ], resolve),
            name: 'portal.customAttribute',
            meta: {
                title: '自定义属性'
            }
        },
        {
            path: '/workBenchCreate.html',
            component: (resolve) => require([
                '@/modules/spoc-portal/views/workBench/create.vue'
            ], resolve),
            name: 'portal.workBenchCreate',
            meta: {
                title: '创建企业',
                leftMenu: false,
            }
        },
        {
            path: '/workBench.html',
            component: (resolve) => require([
                '@/modules/spoc-portal/views/workBench/index.vue'
            ], resolve),
            name: 'portal.workBench',
            meta: {
                title: '完善企业信息',
                leftMenu: false,
                outClose: true
            }
        },
        {
            path: '/workbenchNew.html',
            component: (resolve) => require([
                '@/modules/spoc-portal/views/workbenchNew/index/index.vue'
            ], resolve),
            name: 'portal.workbenchNew',
            meta: {
                title: '门户编辑'
            }
        },
        {
            path: '/importExportCenter.html',
            component: (resolve) => require([
                '@/modules/spoc-portal/views/importExportCenter/index.vue'
            ], resolve),
            name: 'portal.importExportCenter',
            meta: {
                title: '导入导出中心'
            }
        },

        {
            path: '/workbenchNew.html',
            component: (resolve) => require([
                '@/modules/spoc-portal/views/workbenchNew/index/index.vue'
            ], resolve),
            name: 'portal.workbenchNew',
            meta: {
                title: '工作台'
            }
        },
        {
            path: '/workbenchManage.html',
            component: (resolve) => require([
                '@/modules/spoc-portal/views/workbenchNew/management/index.vue'
            ], resolve),
            name: 'portal.workbenchManage',
            meta: {
                title: '门户管理项'
            }
        },
        {
            path: '/workbenchLists.html',
            component: (resolve) => require([
                '@/modules/spoc-portal/views/workbenchNew/lists/index.vue'
            ], resolve),
            name: 'portal.workbenchLists',
            meta: {
                title: '工作台模版列表'
            }
        },
        {
            path: '/spoc-portal/echartsTest',
            name: 'poratl.echartsTest',
            meta: {
                title: 'echartsTest'
            },
            component: resolve =>
                require(['@/modules/spoc-portal/views/echarts/echartsTest.vue'], resolve)
        },
        {
            path: '/formView.html',
            component: (resolve) => require([
                '@/modules/spoc-portal/views/formView/formView.vue'
            ], resolve),
            name: 'portal.formView',
            meta: {
                title: '表单设计器'
            }
        },
    ]
}]
var children = []
moduleList.forEach((item) => {
    children = [...children, ...item]
})
routers[0].children = [...routers[0].children, ...children]
// export default routers;
export default [{
        path: '/login.html',
        name: 'portal.login',
        meta: {
            title: 'Login - 登录',
            hideInMenu: true
        },
        component: (resolve) => require(['@/modules/spoc-portal/views/login.vue'], resolve)
    }, {
        path: '/locking',
        name: 'locking',
        meta: {
            title: '暂时离开',
            hideInMenu: true
        },
        component: (resolve) => require(['@/components/mainCos/components/lockscreen/components/locking-page.vue'],
            resolve)
    }, {
        path: '/classRoom',
        name: 'classRoom',
        meta: {
            title: '课堂',
            hideInMenu: true
        },
        component: (resolve) => require(['@/modules/spoc-hootie-web/src/views/classRoom/classRoom.vue'], resolve)
    },
    {
        path: '/spoc-eduManage/printIndex.html',
        name: 'jw.printIndex',
        meta: {
            title: '',
            hideInMenu: true
        },
        component: (resolve) => require(['@/modules/spoc-portal/views/printIndex.vue'], resolve),
        children: [{
            path: '/spoc-eduManage/printStudentCard.html',
            name: 'jw.printStudentCard',
            meta: {
                title: '打印学生卡',
                hideInMenu: true
            },
            component: (resolve) => require([
                '@/modules/spoc-jw-web/src/views/classStudentManage/printStudentCard.vue'
            ], resolve)
        }]
    },
    {
        path: '/h5Form.html',
        component: (resolve) => require(['@/modules/spoc-crm-web/src/views/h5Form/h5Form.vue'], resolve),
        name: 'portal.h5Form',
        meta: {
            hideInMenu: true
        },
    },
    //	{
    //		path: '/',
    //		name: 'home',
    //		redirect: '/index',
    //		component: Main,
    //		meta: {
    //			//	        hideInMenu: true
    //			notCache: true
    //		},
    //		children: routers
    //	}
    ...routers
]
