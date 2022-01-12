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
