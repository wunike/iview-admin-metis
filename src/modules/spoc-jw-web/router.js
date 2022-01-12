const routers = [{
	path: "/spoc-eduManage",
	component: resolve => require(["./src/views/index.vue"], resolve),
	name: "jwIndex",
	meta: {
		title: "教务管理",
		icon: "_zuzhijigou"
	},
	children: [
		{
			path: "/spoc-eduManage/classManageList.html",
			name: "jw.classManageList",
			meta: {
				title: "班课列表",
				// notCache: true
			},
			component: resolve => require(["./src/views/classManage/classManageList.vue"], resolve)
		},
		{
			path: "/spoc-eduManage/classManageImport.html",
			name: "jw.classManageImport",
			meta: {
				title: "班课导入"
			},
			component: resolve => require(["./src/views/classManage/classManageImport.vue"], resolve)
		},
		{
			path: "/spoc-eduManage/classDetailInfo.html",
			name: "jw.classManage.classDetailInfo",
			meta: {
				title: "班课详情",
				notCache: true
			},
			component: resolve => require(["./src/views/classManage/classDetailInfo/classDetailInfo.vue"], resolve)
		},
		{
			path: "/spoc-eduManage/sortClass.html",
			name: "jw.classManage.sortClass",
			meta: {
				title: "排课",
				notCache: true
			},
			component: resolve => require(["./src/views/classManage/sortClass/sortClass.vue"], resolve)
		},
		{
			path: "/spoc-eduManage/checkWork.html",
			name: "jw.classManage.checkWork",
			meta: {
				title: "考勤",
				notCache: true
			},
			component: resolve => require(["./src/views/classManage/checkWork/checkWork.vue"], resolve)
		},
		{
			path: '/spoc-eduManage/classManage/addStudent.html',
			name: 'jw.classManage.addStudent',
			meta: { title: '添加学员', notCache: true },
			component: resolve => require(['./src/views/classManage/addStudent/addStudent.vue'], resolve)
		},
		{
			path: '/spoc-eduManage/classManage/shareClass.html',
			name: 'jw.shareClass',
			meta: { title: '共享开班' },
			component: resolve => require(['./src/views/classManage/createClass/createClass.vue'], resolve)
		},
		{
			path: '/spoc-eduManage/classManage/createClass.html',
			name: 'jw.createClass',
			meta: { title: '手动开班' },
			component: resolve => require(['./src/views/classManage/createClass/createClass.vue'], resolve)
		},
		{
			path: "/spoc-eduManage/scheduleManageList.html",
			name: "jw.scheduleManageList",
			meta: {
				title: "排课列表"
			},
			component: resolve => require(["./src/views/scheduleManage/scheduleManageList.vue"], resolve)
		},
		{
			path: "/spoc-eduManage/classStudentManageList.html",
			name: "jw.classStudentManageList",
			meta: {
				title: "班课学员"
			},
			component: resolve => require(["./src/views/classStudentManage/classStudentManageList.vue"], resolve)
		},
		{
			path: "/spoc-eduManage/studentCourseDetail.html",
			name: "jw.studentCourseDetail",
			meta: {
				title: "学员详情",
				notCache: true
			},
			component: resolve => require(["./src/views/classStudentManage/studentCourseDetail.vue"], resolve)
		},
		{
			path: '/spoc-eduManage/schoolTimetableTeacher.html',
			name: 'jw.schoolTimetableTeacher',
			meta: { title: '教师课表' },
			component: resolve => require(['./src/views/schoolTimetable/teacher.vue'], resolve)
		},
		{
			path: '/spoc-eduManage/schoolTimetableClass.html',
			name: 'jw.schoolTimetableClass',
			meta: { title: '教室课表' },
			component: resolve => require(['./src/views/schoolTimetable/class.vue'], resolve)
		},
		{
			path: '/spoc-eduManage/schoolTimetableSignIn.html',
			name: 'jw.schoolTimetableSignIn',
			meta: { title: '手工签到' },
			component: resolve => require(['./src/views/schoolTimetable/signIn.vue'], resolve)
		},
		{
			path: '/spoc-eduManage/signinDetail.html',
			name: 'jw.signinDetail',
			meta: { title: '手工签到详情', notCache: true },
			component: resolve => require(['./src/views/signinDetail/index.vue'], resolve)
		},
		{
			path: '/spoc-eduManage/checkInElectronic.html',
			name: 'jw.checkInElectronic',
			meta: { title: '电子签到', notCache: true },
			component: resolve => require(['./src/views/checkInElectronic/index.vue'], resolve)
		},
		{
			path: '/spoc-eduManage/approvalList.html',
			name: 'jw.approvalList',
			meta: { title: '退班审批' },
			component: resolve => require(['./src/views/approval/approvalNew.vue'], resolve)
		},
		{
			path: "/spoc-eduManage/chargingManageList.html",
			name: "jw.chargingManageList",
			meta: {
				title: "扣费记录"
			},
			component: resolve => require(["./src/views/chargingManage/chargingManageList.vue"], resolve)
		},
		{
			path: "/spoc-eduManage/unChargingManageList.html",
			name: "jw.unChargingManageList",
			meta: {
				title: "取消扣费列表"
			},
			component: resolve => require(["./src/views/chargingManage/unChargingManageList.vue"], resolve)
		},
		{
			path: '/spoc-eduManage/servicesCharts',
			name: 'jw.servicesCharts',
			meta: {
				title: '服务榜单'
			},
			component: resolve =>
				require(['./src/views/servicesCharts/servicesCharts.vue'], resolve)
		},
		{
			path: '/spoc-eduManage/course',
			name: 'jw.course',
			meta: {
				title: '1v1排课'
			},
			component: resolve =>
				require(['./src/views/course/course.vue'], resolve)
		},
		{
			path: '/spoc-eduManage/1v1course',
			name: 'jw.1v1course',
			meta: {
				title: '1对1课程'
			},
			component: resolve =>
				require(['./src/views/1v1course/1v1course.vue'], resolve)
        },
        {
			path: '/spoc-eduManage/1v1/student',
			name: 'jw.1v1student',
			meta: {
				title: '1v1学员'
			},
			component: resolve =>
				require(['./src/views/1v1/student.vue'], resolve)
        },
        {
			path: '/spoc-eduManage/1v1/newCourse',
			name: 'jw.newCourse',
			meta: {
				title: '新增排课申请',
				notCache: true
			},
			component: resolve =>
				require(['./src/views/1v1/newCourse.vue'], resolve)
		},
		{
			path: '/spoc-eduManage/attendancePage.html',
			name: 'jw.attendancePage',
			meta: {
				title: '1对1考勤'
			},
			component: resolve =>
				require(['./src/views/attendancePage/attendancePage.vue'], resolve)
        },
        {
            path: '/spoc-eduManage/approvalManagement.html',
            name: 'jw.approvalManagement',
            meta: {
                title: '退班审批管理'
            },
            component: resolve =>
                require(['./src/views/approvalManagement/index.vue'], resolve)
        },
	]
}];

module.exports = routers;

