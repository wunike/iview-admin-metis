export const barOption = (qdKeys,valObj, interval0, hasPadding)=>{
    var seriesLabel = {
        show: true,
        position: 'top',
        formatter: function(obj){
            return obj.value > 0 ? obj.value : ''
        }
    }
    // qdKeys,valObj
    let keys = []
    let series = []
    for(let key in valObj){
        keys.push(key)
        series.push(
            {
                name: key,
                type: 'bar',
                // barWidth: 20,
                barMaxWidth : 20,
                barGap: 0,
                data: valObj[key],
                label: seriesLabel,
            },
        )
    }
    let obj = {
        color:[
            '#3EA8FF','#FFAE3A','#F17043','#63D954','#E24182',
            '#F5DA41','#5947DB','#FF81BE','#69E3B4','#D360E5',
            '#82B6FF','#CBE43A','#9C48EB','#5EC8BE'
        ],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
                shadowStyle :{
                    color :'rgba(0,62,250,0.03)'
                },
            }
        },
        legend: {
            data: keys
        },
        // dataZoom: [ 
        //     {
        //         type: 'slider',
        //         start: 0,                         
        //         end: qdKeys.length > 10 ? 20 : (qdKeys.length > 5 ? 30 : 100),
        //         xAxisIndex: 0,
        //     },
        //     {
        //         type: 'inside',
        //         xAxisIndex: 0,
        //         orient: 'vertical',
        //         zoomLock:true,
        //         zoomOnMouseWheel: false,
        //         moveOnMouseWheel: true,
        //         moveOnMouseMove: true,
        //     }    
        //  ],
        grid: { // 控制图的大小，调整下面这些值就可以，
           y2:90
        },
        yAxis: {
            type: 'value',
            name: '个',
            minInterval: 1,
            axisLabel: {
                formatter: '{value}'
            }
        },
        xAxis: {
            type: 'category',
            // inverse: true,
            data: qdKeys,
            axisLabel: {
                // interval:0,
                rotate: -15,
                // padding: [35,0,0,0],
                // rotate: data.length > 5 ? 20 : '',
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
                },
                formatter: function (value, index) {
                    let vals = value.split('#')
                    // return vals.join('\n');
                    let _vals = []
                    vals.forEach(item => {
                        if(item.indexOf('(')>=0){
                            let _arr = item.split('(')
                            _vals.push(_arr[0])
                            _vals.push('(' + _arr[1])
                        } else {
                            _vals.push(item) 
                        }
                    });
                    return _vals.join('\n');
                }
            },
        },
        series: series
    };
    if(interval0){
        obj.xAxis.axisLabel.interval = 0
    }
    if(hasPadding){
        obj.xAxis.axisLabel.padding = [35,0,0,0]
    }
    return obj
}
