const routers = [{
		path: '/pdfviewer.html',
		name: 'sign.pdfview',
		component: (resolve) => require(['./src/views/pdfviewer.vue'], resolve),
		meta: {
			aside: false
		},
	},
	{
		path: '/spoc-sign',
		name: 'sign.index',
		component: (resolve) => require(['./src/views/index.vue'], resolve),
		meta: {
			title: '合同管理',
		},
		children: [{
				path: '/spoc-sign/contractGeneration.html',
				name: 'sign.contractGeneration',
				component: (resolve) => require(['./src/views/contractGeneration/contractGeneration.vue'], resolve),
				meta: {
					title: '合同生成',
                    outClose:true,
                    notCache: true
				},
			},
			{
				path: '/spoc-sign/discount.html',
				name: 'sign.discount',
				component: (resolve) => require(['./src/views/discount/discount.vue'], resolve),
				meta: {
					title: '合同项目'
				},
			},
			{
				path: '/spoc-sign/pact.html',
				name: 'sign.pact',
				component: (resolve) => require(['./src/views/library/pact/pact.vue'], resolve),
				meta: {
					title: '合同库',
					authority: 1,
					notCache: true
				},
			},
			{
				path: '/spoc-sign/preview.html',
				name: 'sign.preview',
				component: (resolve) => require(['./src/views/library/preview/preview.vue'], resolve),
				meta: {
					title: '主合同预览'
				},
			},
			{
				path: '/spoc-sign/myPact',
				name: 'sign.myPact',
				component: (resolve) => require(['./src/views/myPact/myPact.vue'], resolve),
				meta: {
					title: '我的合同',
				},
			},
			{
				path: '/spoc-sign/pactPreview',
				name: 'sign.pactPreview',
				component: (resolve) => require(['./src/views/myPact/preview/preview.vue'], resolve),
				meta: {
					title: '合同预览'
				},
			},
			{
				path: '/spoc-sign/approval',
				name: 'sign.approval',
				component: (resolve) => require(['./src/views/approval/approvalNew.vue'], resolve),
				meta: {
					title: '合同审批'
				},
			},
			// {
			// 	path: '/spoc-sign/approvlList',
			// 	name: 'sign.approvlList',
			// 	component: (resolve) => require(['./src/views/approval/approvalList.vue'], resolve),
			// 	meta: {
			// 		title: '合同审批list'
			// 	},
			// },
			// {
			// 	path: '/spoc-sign/signManageAro',
			// 	name: 'sign.contractManage',
			// 	component: (resolve) => require(['./src/views/signManage/signManageAro.vue'], resolve),
			// 	redirect: {
			// 		name: 'sign.signManage'
			// 	},
			// 	meta: {
			// 		title: '签约合同管理'
			// 	},
			// 	children: [{
			// 			path: '/spoc-sign/signManage.html',
			// 			name: 'sign.signManage',
			// 			component: (resolve) => require(['./src/views/signManage/signManage.vue'], resolve),
			// 			meta: {
			// 				title: '合同管理'
			// 			},
			// 		},
			// 		{
			// 			path: '/spoc-sign/signManageDetail.html',
			// 			name: 'sign.signManageDetail',
			// 			component: (resolve) => require(['./src/views/signManage/signManageDetail.vue'], resolve),
			// 			meta: {
			// 				title: '合同详情'
			// 			}
			// 		},
			// 	]
			// },
			{
				path: '/spoc-sign/receiptManagement.html',
				name: 'sign.receiptManagement',
				component: (resolve) =>
					require(['./src/views/receiptManagement/receiptManagement.vue'], resolve),
				meta: {
					title: '收款管理'
				},
			},
			{
				path: '/spoc-sign/contractTransferCenter.html',
				name: 'sign.contractTransferCenter',
				component: (resolve) =>
					require(['./src/views/contractTransferCenter/contractTransferCenter.vue'], resolve),
				meta: {
					title: '合同转中心'
				},
			},
			{
				path: '/spoc-sign/courseValidityAdjustment.html',
				name: 'sign.courseValidityAdjustment',
				component: (resolve) =>
					require(['./src/views/courseValidityAdjustment/courseValidityAdjustment.vue'], resolve),
				meta: {
					title: '有效期管理'
				},
			},
			{
				path: '/spoc-sign/validityPeriodPopup',
				name: 'sign.validityPeriodPopup',
				component: (resolve) =>
					require(['./src/views/courseValidityAdjustment/components/validityPeriodPopup.vue'], resolve),
				meta: {
					title: '课程有效期调整申请'
				},
			},
			{
				path: '/spoc-sign/viewThePaymentSlip',
				name: 'sign.viewThePaymentSlip',
				component: (resolve) =>
					require(['./src/views/receiptManagement/components/viewThePaymentSlip.vue'], resolve),
				meta: {
					title: '查看收款单'
				},
			},

			{
				path: '/spoc-sign/refundGiveClass.html',
				name: 'sign.refundGiveClass',
				meta: {
					title: '合同赠课'
				},
				component: resolve =>
					require(['./src/views/refundGiveClass/refundGiveClass.vue'], resolve)
			},
			{
				path: '/spoc-sign/contractRefund.html',
				name: 'sign.contractRefund',
				meta: {
					title: '退费管理'
				},
				component: resolve =>
					require(['./src/views/contractRefund/contractRefund.vue'], resolve)
			},
			{
				path: '/spoc-sign/expiredContract.html',
				name: 'sign.expiredContract',
				meta: {
					title: '过期合同'
				},
				component: resolve => require(['./src/views/expiredContract/index.vue'], resolve)
			},
			{
				path: '/spoc-sign/packageChange.html',
				name: 'sign.packageChange',
				meta: {
					title: '改包申请'
				},
				component: resolve => require(['./src/views/packageChange/packageChange.vue'], resolve)
			},
			{
				path: '/spoc-sign/contractManage.html',
				name: 'sign.contractManage',
				meta: {
					title: '合同管理列表',
					// notCache: true
				},
				component: resolve => require(['./src/views/contractManage/contractManage.vue'], resolve)
			},
			{
				path: '/spoc-sign/myContract.html',
				name: 'sign.myContract',
				meta: {
					title: '我的合同',
					// notCache: true
				},
				component: resolve => require(['./src/views/contractManage/myContract.vue'], resolve)
			},
			{
				path: '/spoc-sign/editLeaveNum.html',
				name: 'sign.editLeaveNum',
				meta: {
					title: '请假管理'
				},
				component: resolve =>
					require(['./src/views/editLeaveNum/editLeaveNum.vue'], resolve)
			},
			{
				path: '/spoc-sign/capitalFlow.html',
				name: 'sign.capitalFlow',
				meta: {
					title: '资金流水'
				},
				component: resolve =>
					require(['./src/views/capitalFlow/capitalFlow.vue'], resolve)
			},
			{
				path: '/spoc-sign/pactDetails.html',
				name: 'sign.pactDetails',
				meta: {
					title: '合同详情', notCache: true
				},
				component: resolve =>
					require(['./src/views/pactDetails/pactDetails.vue'], resolve)
            },
            {
				path: '/spoc-sign/reportedCourses.html',
				name: 'sign.reportedCourses',
				meta: {
					title: '已报课程'
				},
				component: resolve =>
					require(['./src/views/reportedCourses/index.vue'], resolve)
            },
            {
				path: '/spoc-sign/performanceAllocation.html',
				name: 'sign.performanceAllocation',
				meta: {
					title: '业绩分配'
				},
				component: resolve =>
					require(['./src/views/performanceAllocation/performanceAllocation.vue'], resolve)
            },
            {
                path: '/spoc-sign/approvalManagement.html',
                name: 'sign.approvalManagement',
                meta: {
                    title: '合同审批管理'
                },
                component: resolve =>
                    require(['./src/views/approvalManagement/index.vue'], resolve)
            },
		]
	},
];

module.exports = routers;
