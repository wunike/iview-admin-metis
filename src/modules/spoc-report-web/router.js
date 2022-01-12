const routers = [{
    path: "/spoc-journaling",
    component: resolve => require(["./src/views/index.vue"], resolve),
    name: "report.index",
    meta: {
        title: "报表",
        icon: "_zuzhijigou"
    },
    children: [
        {
            path: '/spoc-journaling/generationLeadsReport',
            name: 'report.generationLeadsReport',
            meta: {
                title: '渠道转化报表'
            },
            component: resolve =>
                require(['./src/views/generationLeadsReport/index.vue'], resolve)
        },
        {
            path: '/spoc-journaling/salesReport',
            name: 'report.salesReport',
            meta: {
                title: '销售报表'
            },
            component: resolve =>
                require(['./src/views/salesReport/index.vue'], resolve)
        },
        {
            path: '/spoc-journaling/refundReport',
            name: 'report.refundReport',
            meta: {
                title: '退费明细'
            },
            component: resolve =>
                require(['./src/views/refundReport/index.vue'], resolve)
        },
        {
            path: '/spoc-journaling/salesReportByStudent',
            name: 'report.salesReportByStudent',
            meta: {
                title: '销售报表-新签&续签人数'
            },
            component: resolve =>
                require(['./src/views/salesReportByStudent/salesReportByStudent.vue'], resolve)
        },
        {
            path: '/spoc-journaling/studentRemainClassReport',
            name: 'report.studentRemainClassReport',
            meta: {
                title: '学员剩余课时数'
            },
            component: resolve =>
                require(['./src/views/studentRemainClassReport/studentRemainClassReport.vue'], resolve)
        },
        {
            path: '/spoc-report/studentList',
            name: 'report.studentList',
            meta: {
                title: '学生列表'
            },
            component: resolve =>
                require(['./src/views/studentList/studentList.vue'], resolve)
        },
        {
			path: "/spoc-report/centerUtilityReport",
			name: "report.centerUtilityReport",
			meta: {
				title: "校区利用率",
			},
			component: resolve => require(["./src/views/centerUtilityReport/centerUtilityReport.vue"], resolve)
		},
		{
			path: "/spoc-report/classAttendance",
			name: "report.classAttendance",
			meta: {
				title: "班课考勤",
			},
			component: resolve => require(["./src/views/classAttendance/classAttendance.vue"], resolve)
        },
        {
			path: "/spoc-report/monthlyBalance",
			name: "report.monthlyBalance",
			meta: {
				title: "月结",
			},
			component: resolve => require(["./src/views/monthlyBalance/index.vue"], resolve)
		},
        {
            path: '/spoc-report/centerReport.html',
            name: 'report.centerReport',
            meta: {
                title: '中心业绩',
            },
            component: resolve =>
                require(['./src/views/centerReport/centerReport.vue'], resolve)
        },
        {
            path: '/spoc-report/campusDataMigration.html',
            name: 'report.campusDataMigration',
            meta: {
                title: '校区数据迁移'
            },
            component: resolve =>
                require(['./src/views/campusDataMigration/index.vue'], resolve)
        },
        {
            path: '/spoc-report/auditionConversionReport.html',
            name: 'report.auditionConversionReport',
            meta: {
                title: '试听课转换报表'
            },
            component: resolve =>
                require(['./src/views/auditionConversionReport/index.vue'], resolve)
        },
    ]
}];

module.exports = routers;
