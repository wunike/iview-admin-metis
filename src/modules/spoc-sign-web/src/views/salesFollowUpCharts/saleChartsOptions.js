export const barOption = (qdKeys, vals) => {
    return {
        color: [
            '#3EA8FF', '#FFAE3A', '#F17043', '#63D954', '#E24182',
            '#F5DA41', '#5947DB', '#FF81BE', '#69E3B4', '#D360E5',
            '#82B6FF', '#CBE43A', '#9C48EB', '#5EC8BE'
        ],
        legend: {
            right: 'right',
            data: ['新签客户', '到访资源', '诺访资源', '有效资源', '分配资源', '跟进次数']
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
                shadowStyle: {
                    color: 'rgba(0,62,250,0.03)'
                },
            }
        },
        xAxis: {
            type: 'category',
            data: qdKeys,
            axisLabel: {
                interval: 0,
                rotate: qdKeys.length > 5 ? -15 : '',
                color: function (value, index) {
                    if (value.indexOf('Top1') >= 0) {
                        return '#FFC055';
                    } else if (value.indexOf('Top2') >= 0) {
                        return '#899098';
                    } else if (value.indexOf('Top3') >= 0) {
                        return '#BC8666';
                    } else {
                        return '#000';
                    }
                },
            },
        },
        yAxis: {
            type: 'value',
            name: '资源数：个'
        },
        series: [
            {
                name: '新签客户',
                data: vals[0],
                type: 'bar',
                barWidth: 20,
                label: {
                    show: true,
                    position: 'top',
                    formatter: function (obj) {
                        return obj.value > 0 ? obj.value : ''
                    }
                }
            },
            {
                name: '到访资源',
                data: vals[1],
                type: 'bar',
                barWidth: 20,
                label: {
                    show: true,
                    position: 'top',
                    formatter: function (obj) {
                        return obj.value > 0 ? obj.value : ''
                    }
                }
            },
            {
                name: '诺访资源',
                data: vals[2],
                type: 'bar',
                barWidth: 20,
                label: {
                    show: true,
                    position: 'top',
                    formatter: function (obj) {
                        return obj.value > 0 ? obj.value : ''
                    }
                }
            },
            {
                name: '有效资源',
                data: vals[3],
                type: 'bar',
                barWidth: 20,
                label: {
                    show: true,
                    position: 'top',
                    formatter: function (obj) {
                        return obj.value > 0 ? obj.value : ''
                    }
                }
            },
            {
                name: '分配资源',
                data: vals[4],
                type: 'bar',
                barWidth: 20,
                label: {
                    show: true,
                    position: 'top',
                    formatter: function (obj) {
                        return obj.value > 0 ? obj.value : ''
                    }
                }
            },
            {
                name: '跟进次数',
                data: vals[5],
                type: 'bar',
                barWidth: 20,
                label: {
                    show: true,
                    position: 'top',
                    formatter: function (obj) {
                        return obj.value > 0 ? obj.value : ''
                    }
                }
            }
        ]
    };
}

export const pieOption = (title, qdKeys, vals) => {
    return {
        color: [
            '#3EA8FF', '#FFAE3A', '#F17043', '#63D954', '#E24182',
            '#F5DA41', '#5947DB', '#FF81BE', '#69E3B4', '#D360E5',
            '#82B6FF', '#CBE43A', '#9C48EB', '#5EC8BE'
        ],
        legend: {
            right: 'right',
            top: 'bottom',
            data: qdKeys
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
            {
                name: title,
                data: vals,
                radius: ['50%', '70%'],
                type: 'pie',
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
            },
        ]
    };
}
export const funnelOption = (title, qdKeys, vals) => {
    return {
        color: [
            '#3EA8FF', '#FFAE3A', '#F17043', '#63D954', '#E24182',
            '#F5DA41', '#5947DB', '#FF81BE', '#69E3B4', '#D360E5',
            '#82B6FF', '#CBE43A', '#9C48EB', '#5EC8BE'
        ],
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
            {
                name: title,
                data: vals,
                type: 'funnel',
                left: '20%',
                top: '0%',
                width: '60%',
                height: '100%',
                label: {
                    normal: {
                        position: 'right',
                        formatter: (vals) => {
                            return vals.name
                        },
                        textStyle: {
                            color: 'auto'
                        }
                    },
                    emphasis: {
                        position: 'right',
                        formatter: (vals) => {
                            return vals.name
                        },
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        opacity: 0.7
                    }
                },
            },
        ]
    };
}
