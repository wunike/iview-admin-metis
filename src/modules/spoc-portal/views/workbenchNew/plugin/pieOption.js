export const pieOption = (title, qdKeys, vals) => {
    return {
        color: [
            '#3EA8FF', '#FFAE3A', '#F17043', '#63D954', '#E24182',
            '#F5DA41', '#5947DB', '#FF81BE', '#69E3B4', '#D360E5',
            '#82B6FF', '#CBE43A', '#9C48EB', '#5EC8BE'
        ],
        legend: {
            top: 'middle',
            right:'10%',
            orient: 'vertical',
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
