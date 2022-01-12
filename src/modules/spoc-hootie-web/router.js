const routers = [{
    path: "/web-hootie",
    component: resolve => require(["./src/views/index.vue"], resolve),
    name: "hootie.index",
    meta: {
        title: "家校互动",
        icon: "_zuzhijigou",

    },
    children: [
        {
            path: '/web-hootie/myCourse.html',
            name: 'hootie.myCourse',
            meta: { title: '我的课程', notCache: true},
            component: resolve => require(['./src/views/myCourse/myCourse.vue'], resolve)
        },
        {
            path: '/web-hootie/teachPush.html',
            name: 'hootie.teachPush',
            meta: { title: '教学推送', notCache: true, outClose: true },
            component: resolve => require(['./src/views/teachPush/teachPush.vue'], resolve)
        },
        {
            path: '/web-hootie/principal.html',
            name: 'hootie.principal',
            meta: { title: '校长信箱', },
            component: resolve => require(['./src/views/principalMailbox/index.vue'], resolve)
        },
        {
            path: '/web-hootie/principalFBDetail.html',
            name: 'hootie.principalFBDetail',
            meta: { title: '反馈详情', notCache: true },
            component: resolve => require(['./src/views/principalMailbox/feedbackDetail.vue'], resolve)
        },
        {
            path: '/web-hootie/courseList.html',
            name: 'hootie.courseList',
            meta: { title: '排课列表', },
            component: resolve => require(['./src/views/courseList/courseList.vue'], resolve)
        },
        {
            path: '/web-hootie/courseListImport.html',
            name: 'hootie.courseListImport',
            meta: { title: '排课导入', keepAlive: true },
            component: resolve => require(['./src/views/courseList/courseListImport.vue'], resolve)
        },
        {
            path: '/web-hootie/importClass.html',
            name: 'hootie.importClass',
            meta: { title: '导入班课', },
            component: resolve => require(['./src/views/courseList/importClass.vue'], resolve)
        },
        {
            path: '/web-hootie/importCourse.html',
            name: 'hootie.importCourse',
            meta: { title: '导入排课', },
            component: resolve => require(['./src/views/courseList/importCourse.vue'], resolve)
        },
        {
            path: '/web-hootie/classList.html',
            name: 'hootie.classList',
            meta: { title: '课次列表', notCache: true },
            component: resolve => require(['./src/views/classList/classList.vue'], resolve)
        },
        {
            path: '/web-hootie/scoreTemplate.html',
            name: 'hootie.scoreTemplate',
            meta: { title: '评分模板', },
            component: resolve => require(['./src/views/scoreTemplate/scoreTemplate.vue'], resolve)
        },
        {
            path: '/web-hootie/jxStudentImport.html',
            name: 'hootie.jxStudentImport',
            meta: { title: '学员导入', },
            component: resolve => require(['./src/views/memberList/jxStudentImport.vue'], resolve)
        },
        {
            path: '/web-hootie/memberList.html',
            name: 'hootie.memberList',
            meta: { title: '学员列表', },
            component: resolve => require(['./src/views/memberList/memberList.vue'], resolve)
        },
        {
            path: '/web-hootie/messageManagement.html',
            name: 'hootie.messageManagement',
            meta: { title: '消息管理', },
            component: resolve => require(['./src/views/messageManagement/index.vue'], resolve)
        },
        {
            path: '/web-hootie/messageManagementDetail.html',
            name: 'hootie.messageManagement.detail',
            meta: { title: '消息详情', notCache: true },
            component: resolve => require(['./src/views/messageManagement/detail.vue'], resolve)
        },
        {
            path: '/web-hootie/pushSettings.html',
            name: 'hootie.pushSettings',
            meta: { title: '推送设置', notCache: true },
            component: resolve => require(['./src/views/pushSettings/index.vue'], resolve)
        },
        {
            path: '/web-hootie/pushSettingsImport.html',
            name: 'hootie.pushSettings.import',
            meta: { title: '导入推送', },
            component: resolve => require(['./src/views/pushSettings/importPage.vue'], resolve)
        },
        {
            path: '/web-hootie/starTemplate.html',
            name: 'hootie.starTemplate',
            meta: { title: '反馈设置', },
            component: resolve => require(['./src/views/starTemplate/index.vue'], resolve)
        },
        {
            path: '/web-hootie/importStarTemplate.html',
            name: 'hootie.importStarTemplate',
            meta: { title: '批量导入' },
            component: resolve => require(['./src/views/starTemplate/import.vue'], resolve)
        },
        {
            path: '/web-hootie/integralFlow.html',
            name: 'hootie.integralFlow',
            meta: { title: '积分流水', },
            component: resolve => require(['./src/views/integralFlow/index.vue'], resolve)
        },
        {
            path: '/web-hootie/message.html',
            name: 'hootie.message',
            meta: { title: '我的消息', },
            component: resolve => require(['./src/views/message/index.vue'], resolve)
        },
        {
            path: '/web-hootie/performanceView.html',
            name: 'hootie.performanceView',
            meta: { title: '查看教学评价', notCache: true },
            component: resolve => require(['./src/views/teachPush/performanceView.vue'], resolve)
        },
    ]
}];

module.exports = routers;
