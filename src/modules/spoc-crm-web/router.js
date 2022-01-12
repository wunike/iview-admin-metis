const routers = [
	{
		path: '/spoc-crm',
		name: 'crm.index',
		component: (resolve) => require(['./src/views/index.vue'], resolve),
		meta: {
			title: 'CRM',
			icon: '_kehuzhongxin'
		},
		children: [
			{
				path: '/spoc-crm/transferIntro',
				name: 'crm.transferIntro',
				meta: {
					title: '转介绍管理'
				},
				component: resolve =>
					require(['./src/views/transferIntroductionManagement/index.vue'], resolve)
			},
			{
				path: '/spoc-crm/QrCodeEnrollment.html',
				name: 'crm.QrCodeEnrollment',
				meta: {
					title: '二维码招生',
					notCache: true
				},
				component: resolve =>
					require(['./src/views/QrCodeEnrollment/QrCodeEnrollment.vue'], resolve)
			},
			{
				path: '/spoc-crm/renewalWarning.html',
				name: 'crm.renewalWarning',
				meta: {
					title: '续费预警'
				},
				component: resolve =>
					require(['./src/views/renewalWarning/renewalWarning.vue'], resolve)
			},
			{
				path: '/spoc-crm/QrCodeEnrollmentDetail.html',
				name: 'crm.QrCodeEnrollmentDetail',
				meta: {
					title: '二维码详情',
					notCache: true
				},
				component: resolve =>
					require(['./src/views/QrCodeEnrollment/QrCodeEnrollmentDetail.vue'], resolve)
			},
			{
				path: '/spoc-crm/createQrCode.html',
				name: 'crm.createQrCode',
				meta: {
					title: '创建二维码'
				},
				component: resolve =>
					require(['./src/views/QrCodeEnrollment/createQrCode.vue'], resolve)
			},
			{
				path: '/spoc-crm/editorQrCode.html',
				name: 'crm.editorQrCode',
				meta: {
					title: '编辑二维码'
				},
				component: resolve =>
					require(['./src/views/QrCodeEnrollment/createQrCode.vue'], resolve)
			},
			{
				path: '/spoc-crm/activityEnrollment',
				name: 'crm.activityEnrollment',
				component: (resolve) => require(['./src/views/activityEnrollment/index.vue'], resolve),
				meta: {
					title: '活动招生',
					notCache: true
				},
			},
			{
				path: '/spoc-crm/createEvent',
				name: 'crm.createEvent',
				meta: {
					title: '创建活动',
					// outClose:true
				},
				component: resolve =>
					require(['./src/views/activityEnrollment/components/createEvent.vue'], resolve)
			},
			{
				path: '/spoc-crm/activityEnrollment/detial',
				name: 'crm.activityEnrollment.detial',
				meta: {
					title: '活动招生详情',
					notCache: true
				},
				component: resolve =>
					require(['./src/views/activityEnrollment/components/detial.vue'], resolve)
			},
			{
				path: '/spoc-crm/activityEnrollment/activityImport',
				name: 'crm.activityImport',
				meta: {
					title: '活动导入'
				},
				component: resolve =>
					require(['./src/views/activityEnrollment/components/activityImport.vue'], resolve)
			},
			{
				path: '/spoc-crm/activityEnrollment/newResourceImport',
				name: 'crm.newResourceImport',
				meta: {
					title: '活动导入新资源'
				},
				component: resolve =>
					require(['./src/views/activityEnrollment/components/newResourceImport.vue'], resolve)
			},
			{
				path: '/spoc-crm/customerManagement',
				name: 'crm.customerManagement',
				meta: {
					title: '客户管理',
					// notCache: true
				},
				component: resolve =>
					require(['./src/views/customerManagement/index.vue'], resolve)
			},
			{
				path: '/spoc-crm/crmCustomerImport',
				name: 'crm.crmCustomerImport',
				meta: {
					title: '客户管理导入'
				},
				component: resolve =>
					require(['./src/views/customerManagement/crmCustomerImport.vue'], resolve)
			},
			{
				path: '/spoc-crm/leadsEntry',
				name: 'crm.leadsEntry',
				meta: {
					title: 'Leads 录入',
					// notCache: true
				},
				component: resolve =>
					require(['./src/views/leadsEntry/index.vue'], resolve)
			},
			{
				path: '/spoc-crm/myCustomer.html',
				name: 'crm.myCustomer',
				meta: {
					title: '我的客户'
				},
				component: resolve =>
					require(['./src/views/myCustomer/myCustomer.vue'], resolve)
			},
			{
				path: '/spoc-crm/telephoneRecord.html',
				name: 'crm.telephoneRecord',
				meta: {
					title: '电话记录'
				},
				component: resolve =>
					require(['./src/views/telephoneRecord/telephoneRecord.vue'], resolve)
			},
			{
				path: '/spoc-crm/customer360.html',
				name: 'crm.customer360',
				meta: {
					title: '客户360',
                    sameNameCache:true,//同名缓存
					// notCache: true
				},
				component: resolve =>
					require(['./src/views/customer360/index.vue'], resolve)
			},
			{
				path: '/spoc-crm/onSiteManagement.html',
				name: 'crm.onSiteManagement',
				meta: {
					title: '上门管理'
				},
				component: resolve =>
					require(['./src/views/onSiteManagement/onSiteManagement.vue'], resolve)
			},
			{
				path: '/spoc-crm/studentManagement.html',
				name: 'crm.studentManagement',
				meta: {
					title: '学员管理'
				},
				component: resolve =>
					require(['./src/views/studentManagement/studentManagement.vue'], resolve)
			},
			{
				path: '/spoc-crm/clientAreaAround.html',
				name: 'crm.clientAreaAround',
				meta: {
					title: '客户地域分布'
				},
				component: resolve =>
					require(['./src/views/clientAreaAround/clientAreaAround.vue'], resolve)
			},
			{
				path: '/spoc-crm/taskCenter.html',
				name: 'crm.taskCenter',
				meta: {
					title: '我的任务'
				},
				component: resolve =>
					require(['./src/views/taskCenter/taskCenter.vue'], resolve)
			},
			{
				path: '/spoc-crm/caseList.html',
				name: 'crm.caseList',
				meta: {
					title: '案例库'
				},
				component: resolve =>
					require(['./src/views/caseManage/caseList.vue'], resolve)
			},
			{
				path: '/spoc-crm/caseCreate.html',
				name: 'crm.caseCreate',
				meta: {
					title: '新建案例'
				},
				component: resolve =>
					require(['./src/views/caseManage/caseCreate.vue'], resolve)
			},
			{
				path: '/spoc-crm/caseManage.html',
				name: 'crm.caseManage',
				meta: {
					title: '案例管理'
				},
				component: resolve =>
					require(['./src/views/caseManage/caseManage.vue'], resolve)
			},
			{
				path: '/spoc-crm/caseChart.html',
				name: 'crm.caseChart',
				meta: {
					title: '案例统计'
				},
				component: resolve =>
					require(['./src/views/caseManage/caseChart.vue'], resolve)
			},
			{
				path: '/spoc-crm/taskCenterAll.html',
				name: 'crm.taskCenterAll',
				meta: {
					title: '任务管理'
				},
				component: resolve =>
					require(['./src/views/taskCenter/taskCenterAll.vue'], resolve)
			},
			{
				path: '/spoc-crm/staffingManagement',
				name: 'crm.staffingManagement',
				meta: {
					title: '促销员管理'
				},
				component: resolve =>
					require(['./src/views/staffingManagement/index.vue'], resolve)
			},
			{
				path: '/spoc-crm/marketCharts',
				name: 'crm.marketCharts',
				meta: {
					title: '市场榜单'
				},
				component: resolve =>
					require(['./src/views/marketCharts/marketCharts.vue'], resolve)
			},
			{
				path: '/spoc-crm/customerCommunicationRecord',
				name: 'crm.customerCommunicationRecord',
				meta: {
					title: '客户沟通记录'
				},
				component: resolve =>
					require(['./src/views/customerCommunicationRecord/index.vue'], resolve)
			},
			{
				path: '/spoc-crm/customerCommunicationRecordImport',
				name: 'crm.customerCommunicationRecordImport',
				meta: {
					title: '客户沟通记录导入'
				},
				component: resolve =>
					require(['./src/views/customerCommunicationRecord/crmCustomerImport.vue'], resolve)
			},
			{
				path: '/spoc-crm/customerChangeLog',
				name: 'crm.customerChangeLog',
				meta: {
					title: '客户变更日志'
				},
				component: resolve =>
					require(['./src/views/customerChangeLog/index.vue'], resolve)
			},
			{
				path: '/spoc-crm/performancePlan',
				name: 'crm.performancePlan',
				meta: {
					title: '业绩计划'
				},
				component: resolve =>
					require(['./src/views/performancePlan/index.vue'], resolve)
			},
			{
				path: '/spoc-crm/wechatUser',
				name: 'crm.wechatUser',
				meta: {
					title: '我的微信客户',
				},
				component: resolve =>
					require(['./src/views/wechat/wechatUser/index.vue'], resolve)
			},
			{
				path: '/spoc-crm/wechatGroup',
				name: 'crm.wechatGroup',
				meta: {
					title: '我的微信群',
				},
				component: resolve =>
					require(['./src/views/wechat/wechatGroup/index.vue'], resolve)
			},
			{
				path: '/spoc-crm/wechatMsg',
				name: 'crm.wechatMsg',
				meta: {
					title: '聊天内容',
				},
				component: resolve =>
					require(['./src/views/wechat/wechatMsg/index.vue'], resolve)
			},
			{
				path: '/spoc-crm/topicPageEnrollment.html',
				name: 'crm.topicPageEnrollment',
				meta: {
					title: '专题页招生',
					notCache: true
				},
				component: resolve =>
					require(['./src/views/topicPageEnrollment/topicPageEnrollment.vue'], resolve)
			},
			{
				path: '/spoc-crm/topicPageEnrollmentDetail.html',
				name: 'crm.topicPageEnrollmentDetail',
				meta: {
					title: '专题页详情',
					notCache: true
				},
				component: resolve =>
					require(['./src/views/topicPageEnrollment/topicPageEnrollmentDetail.vue'], resolve)
			},
		]
	},
];

// eslint-disable-next-line
module.exports = routers;
