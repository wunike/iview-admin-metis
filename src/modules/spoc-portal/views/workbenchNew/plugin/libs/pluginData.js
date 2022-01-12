//小组件列表
var pluginList={
    //小组件列表
    plugin:[
        {
            name:"公告栏",
            className:"Announcement",
            classObjct(){
                return require.ensure([], () => {
                    return (require("../announcement.vue"))
                }, "plugin/Announcement");
            },
            type:"applicationPortal",
            width:[1, 2, 3, 4, 5, 6],
            height:[1, 2, 3, 4]
        },
        {
            name:"生日提醒",
            className:"BirthdayList",
            classObjct(){
                return require.ensure([], () => {
                    return (require("../birthdayList.vue"))
                }, "plugin/BirthdayList");
            },
            type:"generalPortal",
            width:[1, 2, 3, 4, 5, 6],
            height:[1, 2, 3, 4]
        },
        {
            name:"快捷操作",
            className:"FastAccess",
            classObjct(){
                return require.ensure([], () => {
                    return (require("../fastAccess.vue"))
                }, "plugin/FastAccess");
            },
            type:"generalPortal",
            width:[1, 2, 3, 4, 5, 6],
            height:[1, 2, 3, 4]
        },
        {
            name:"快捷操作(new)",
            className:"FastAccessNew",
            classObjct(){
                return require.ensure([], () => {
                    return (require("../fastAccessNew.vue"))
                }, "plugin/FastAccessNew");
            },
            type:"generalPortal",
            width:[1, 2, 3, 4, 5, 6],
            height:[1, 2, 3, 4]
        },
        {
            name:"待办事项",
            className:"ToDoList",
            classObjct(){
                return require.ensure([], () => {
                    return (require("../toDoList.vue"))
                }, "plugin/ToDoList");
            },
            type:"applicationPortal",
            width:[1, 2, 3, 4, 5, 6],
            height:[1, 2, 3, 4]
        },
        {
            name:"续费预警",
            className:"RenewableList",
            classObjct(){
                return require.ensure([], () => {
                    return (require("../renewableList.vue"))
                }, "plugin/RenewableList");
            },
            type:"applicationPortal",
            width:[1, 2, 3, 4, 5, 6],
            height:[1, 2, 3, 4]
        },
        {
            name:"市场榜单",
            className:"MarketingPerformance",
            classObjct(){
                return require.ensure([], () => {
                    return (require("../marketingPerformance.vue"))
                }, "plugin/MarketingPerformance");
            },
            type:"applicationPortal",
            width:[1, 2, 3, 4, 5, 6],
            height:[1, 2, 3, 4]
        },
        {
            name:"服务榜单",
            className:"ServicePerformance",
            classObjct(){
                return require.ensure([], () => {
                    return (require("../servicePerformance.vue"))
                }, "plugin/ServicePerformance");
            },
            type:"applicationPortal",
            width:[1, 2, 3, 4, 5, 6],
            height:[1, 2, 3, 4]
        },
        {
            name:"销售榜单",
            className:"SalesPerformance",
            classObjct(){
                return require.ensure([], () => {
                    return (require("../salesPerformance.vue"))
                }, "plugin/SalesPerformance");
            },
            type:"applicationPortal",
            width:[1, 2, 3, 4, 5, 6],
            height:[1, 2, 3, 4]
        },
        {
            name:"销售跟进",
            className:"SalesFollowUp",
            classObjct(){
                return require.ensure([], () => {
                    return (require("../SalesFollowUp.vue"))
                }, "plugin/SalesFollowUp");
            },
            type:"applicationPortal",
            width:[1, 2, 3, 4, 5, 6],
            height:[1, 2, 3, 4]
        },
        {
            name:"业绩完成情况",
            className:"PerformanceCompletion",
            classObjct(){
                return require.ensure([], () => {
                    return (require("../PerformanceCompletion.vue"))
                }, "plugin/PerformanceCompletion");
            },
            type:"applicationPortal",
            width:[1, 2, 3, 4, 5, 6],
            height:[1, 2, 3, 4]
        },
        {
            name:"本月工作量统计",
            className:"WorkloadStatistics",
            classObjct(){
                return require.ensure([], () => {
                    return (require("../workloadStatistics.vue"))
                }, "plugin/WorkloadStatistics");
            },
            type:"applicationPortal",
            width:[1, 2, 3, 4, 5, 6],
            height:[1, 2, 3, 4]
        },
        {
            name:"自定义图表",
            className:"customChart",
            classObjct(){
                return require.ensure([], () => {
                    return (require("../newChart.vue"))
                }, "customChart");
            },
            type:"customChart",
            width:[1, 2, 3, 4, 5, 6],
            height:[1, 2, 3, 4]
        },
        // {
        //     name:"echarts",
        //     className:"echarts",
        //     classObjct(){
        //         return require.ensure([], () => {
        //             return (require("../echarts.vue"))
        //         }, "plugin/echarts");
        //     },
        //     type:"applicationPortal",
        //     width:[3],
        //     height:[2]
        // },
    ]
};
pluginList.plugin = pluginList.plugin.map(item=>{
    item.width = item.width.map(data=>{
        return {
            value:data,
            name:data
        }
    })
    item.height = item.height.map(data=>{
        return {
            value:data,
            name:data
        }
    })
    return item;
});
export default pluginList;
