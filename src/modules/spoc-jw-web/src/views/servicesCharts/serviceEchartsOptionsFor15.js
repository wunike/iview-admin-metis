export const barOption = (obj)=>{
    let xAxisData = []
    let data = []

    for(let key in obj.data){
        xAxisData.push(key)
        data.push(obj.data[key])
    }

    return {
        // title: {
        //     text: obj.title
        // },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
                shadowStyle :{
                    color :'rgba(0,62,250,0.03)'
                },
            }
        },
        xAxis: {
            type: 'category',
            data: xAxisData,
            axisLabel: {
                interval:0,
                rotate: data.length > 5 ? -20 : '',
                color: function (value, index) {
                    if(value.indexOf('Top1')>=0){
                        return '#FFC055';
                    } else if(value.indexOf('Top2')>=0){
                        return '#899098';
                    } else if(value.indexOf('Top3')>=0){
                        return '#BC8666';
                    } else {
                        return '#000';
                    }
                }
            },
        },
        yAxis: {
            type: 'value',
            name: obj.yAxisName,
            minInterval: 1, 
        },
        series: [{
            data: data,
            type: 'bar',
            barMaxWidth: 20,
            markLine : obj.average ? {
                label:{
                    formatter: '校区平均值: ' + '{c}'
                },
                data : [
                    {
                        name: '平均值',
                        yAxis: obj.average,
                    }
                ]
            } : '',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            itemStyle: {
                color: '#3EA8FF' // '#4FD7FF'
            }
        }]
    };
}
