/**  各个模块 */
const routers = [{
    path: '/spoc-h5',
    name: 'h5.index',
    component: (resolve) => require(['@client/index'], resolve),
    meta: {
        title: 'H5',
        icon: '_kehuzhongxin'
    },
    redirect: {
        name: 'h5.pageList'
    },
    children: [{
            path: 'page-list',
            name: 'h5.pageList',
            meta: {
                title: '专题页推广'
            },
            component: resolve =>
                require(['@client/pages/home/page-list'], resolve)
        }, {
            path: 'my-template',
            name: 'h5.myTemplate',
            meta: {
                title: '模板库'
            },
            component: resolve =>
                require(['@client/pages/home/my-template'], resolve)
        }, {
            path: 'page-data',
            name: 'h5.pageData',
            component: resolve =>
                require(['@client/pages/home/page-data'], resolve)
        }, {
            path: 'page-data-detail',
            name: 'h5.pageDataDetail',
            component: resolve =>
                require(['@client/pages/home/page-data-detail'], resolve)
        }, {
            path: 'template-list',
            name: 'h5.templateList',
            component: resolve =>
                require(['@client/pages/home/template-list'], resolve)
        }, {
            path: 'editor',
            name: 'h5.Editor',
            meta: {
                title: '编辑专题页',
                outClose: true
            },
            component: resolve =>
                require(['@client/pages/editor/Index'], resolve)
        }, {
            path: 'mine',
            name: 'h5.Mine',
            component: resolve =>
                require(['@client/pages/Mine'], resolve)
        },
        {
            path: 'login',
            name: 'h5.Login',
            component: resolve =>
                require(['@client/pages/Login'], resolve),
            meta: {
                hideHeader: true,
                trust: true,
                noNeedLogin: true
            }
        }
    ]
}]

// eslint-disable-next-line
module.exports = routers;
