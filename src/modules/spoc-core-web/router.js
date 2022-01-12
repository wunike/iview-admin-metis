const routers = [{
	path: '/spoc-core',
	component: resolve => require(['./src/views/index.vue'], resolve),
	name: 'coreIndex',
	meta: {
		title: '组织机构',
		icon: '_zuzhijigou'
	},
	children: [{
			path: '/spoc-core/organization.html',
			name: 'core.organization',
			meta: {
				title: '组织机构'
			},
			component: resolve => require(['./src/views/organization.vue'], resolve)
		},
		{
			path: '/spoc-core/role.html',
			name: 'core.job',
			meta: {
				title: '岗位管理'
			},
			component: resolve => require(['./src/views/job.vue'], resolve)
		},
		{
			path: '/spoc-core/grade.html',
			name: 'core.grade',
			meta: {
				title: '职能等级'
			},
			component: resolve => require(['./src/views/grade.vue'], resolve)
		},
		{
			path: '/spoc-core/resource.html',
			name: 'core.resource',
			meta: {
				title: '资源管理'
			},
			component: resolve => require(['./src/views/resource.vue'], resolve)
		},
		{
			path: '/spoc-core/classroom.html',
			name: 'core.classroom',
			meta: {
				title: '教室管理'
			},
			component: resolve =>
				require(['./src/views/room/classroom.vue'], resolve)
		},
		{
			path: '/spoc-core/classimport.html',
			name: 'core.classimport',
			meta: {
				title: '教室导入'
			},
			component: resolve =>
				require(['./src/views/room/classimport.vue'], resolve)
		},
		// {
		//  path: '/spoc-core/systemConfig.html',
		//  name: 'core.systemConfig',
		//  meta:{ title:'系统设置' },
		//  component: (resolve) => require(['./src/views/room/systemConfig.vue'], resolve)
		// },
		{
			path: '/spoc-core/staff-manage.html',
			name: 'core.staff',
			meta: {
				title: '员工管理'
			},
			component: resolve =>
				require(['./src/views/staff/staffManage.vue'], resolve)
		},
		{
			path: '/spoc-core/import-staff.html',
			name: 'core.staffImport',
			meta: {
				title: '导入员工'
			},
			component: resolve =>
				require(['./src/views/staff/importPage.vue'], resolve)
		},
		{
			path: '/spoc-core/teacher-manage.html',
			name: 'core.teacher',
			meta: {
				title: '教师管理'
			},
			component: resolve =>
				require(['./src/views/staff/teacherManage.vue'], resolve)
		},
		// {
		//     path: '/spoc-core/classDetails.html',
		//     name: 'core.classDetails',
		//     meta: { title: '班课详情' },
		//     component: resolve =>
		//         require(['./src/views/staff/classDetails.vue'], resolve)
		//         // require(['./src/views/staff/models.vue'], resolve)
		//
		// },
		{
			path: '/spoc-core/coursePack.html',
			name: 'core.coursePack',
			meta: {
				title: '课程包'
			},
			component: resolve =>
				require(['./src/views/coursePack/coursePack.vue'], resolve)
		},
		{
			path: '/spoc-core/coursePackGroup.html',
			name: 'core.coursePackGroup',
			meta: {
				title: '组合课程包'
			},
			component: resolve =>
				require(['./src/views/coursePack/coursePackGroup.vue'], resolve)
		},
		{
			path: '/spoc-core/bigTableExample.html',
			name: 'core.bigTableExample',
			meta: {
				title: 'bigTableExample'
			},
			component: resolve =>
				require(['./src/views/coursePack/bigTableExample.vue'], resolve)
		},
		{
			path: '/spoc-core/approvalSet.html',
			name: 'core.approvalSet',
			meta: {
				title: '审批设置'
			},
			component: resolve =>
				require(['./src/views/approvalNotice/index.vue'], resolve)
		},
        // {
        //     path: '/spoc-core/tagsManage.html',
        //     name: 'core.tagsManage',
        //     meta: {
        //         title: '审批设置'
        //     },
        //     component: resolve =>
        //         require(['./src/views/tagsManagement/index.vue'], resolve)
        // },
        {
            path: '/spoc-core/customState.html',
            name: 'core.customState',
            meta: {
                title: '自定义状态'
            },
            component: resolve =>
                require(['./src/views/customState/index.vue'], resolve)
        },
        {
            path: '/spoc-core/taskTemplate.html',
            name: 'core.taskTemplate',
            meta: {
                title: '任务模板'
            },
            component: resolve =>
                require(['./src/views/taskTemplate/index.vue'], resolve)
        },
        {
            path: '/spoc-core/announcement.html',
            name: 'core.announcement',
            meta: {
                title: '公告列表'
            },
            component: resolve =>
                require(['./src/views/announcement/index.vue'], resolve)
        },
        {
			path: '/spoc-core/schoolManagement.html',
            name: 'core.schoolManagement',
            meta: {
				title: '学员学校管理'
            },
            component: resolve =>
			require(['./src/views/schoolManagement/index.vue'], resolve)
        },
		{
			path: '/spoc-core/lessee.html',
			name: 'core.lessee',
			meta: {
				title: '租户列表'
			},
			component: resolve =>
				require(['./src/views/lessee/lessee.vue'], resolve)
        },
        {
			path: '/spoc-core/lessee360.html',
			name: 'core.lessee360',
			meta: {
				title: '客户360'
			},
			component: resolve =>
				require(['./src/views/lessee360/index.vue'], resolve)
		},
		{
			path: '/spoc-core/lesseeTrialTenant.html',
			name: 'core.lesseeTrialTenant',
			meta: {
				title: '租户套餐'
			},
			component: resolve =>
				require(['./src/views/lesseeTrialTenant/lesseeTrialTenant.vue'], resolve)
		},
		{
			path: '/spoc-core/tenantAccount.html',
			name: 'core.tenantAccount',
			meta: {
				title: '租户账户'
			},
			component: resolve =>
				require(['./src/views/tenantAccount/tenantAccount.vue'], resolve)
		},
		{
			path: '/spoc-core/lesseeShareEditPage.html',
			name: 'core.lesseeShareEditPage',
			meta: {
				title: '分享页编辑',
				notCache: true
			},
			component: resolve =>
				require(['./src/views/lesseeShareEditPage/lesseeShareEditPage.vue'], resolve)
		},
        // {
        //     path: '/spoc-core/dataImport.html',
        //     name: 'core.dataImport',
        //     meta: {
        //         title: '数据迁移导入'
        //     },
        //     component: resolve =>
        //         require(['./src/views/campusDataMigration/import.vue'], resolve)
        // },
        {
            path: '/spoc-core/funPackageManage.html',
            name: 'core.funPackageManage',
            meta: {
                title: '功能包'
            },
            component: resolve =>
                require(['./src/views/funPackageManage/funPackageManage.vue'], resolve)
        },
        {
            path: '/spoc-core/between.html',
            name: 'core.between',
            meta: {
                title: '功能套餐'
            },
            component: resolve =>
                require(['./src/views/between/between.vue'], resolve)
        },
        {
            path: '/spoc-core/lesseeAnnouncement.html',
            name: 'core.lesseeAnnouncement',
            meta: {
                title: '租户公告'
            },
            component: resolve =>
                require(['./src/views/announcement/index.vue'], resolve)
        },
        {
            path: '/spoc-core/sopTaskSetting.html',
            name: 'core.sopTaskSetting',
            meta: {
                title: 'SOP任务设置'
            },
            component: resolve =>
                require(['./src/views/SOPTaskSetting/index.vue'], resolve)
        },
	]
}]
// {
//  path: '/disk.html',
//  name: 'disk.index',
//  meta:{ title:'网盘' },
//  component: (resolve) => require(['./src/views/disk.vue'], resolve)
// },
// eslint-disable-next-line
module.exports = routers
//export default routers;
