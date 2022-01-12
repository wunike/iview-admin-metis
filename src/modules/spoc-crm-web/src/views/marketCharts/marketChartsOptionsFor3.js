export const barOption = (qdKeys,valObj)=>{

    let keys = []
    let series = []
    for(let key in valObj){
        keys.push(key)
        if(key.toLocaleLowerCase() != 'cash'){
            series.push(
                {
                    name: key,
                    type: 'bar',
                    // barWidth: 20,
                    barMaxWidth : 20,
                    barGap: 0,
                    data: valObj[key],
                    label:{
                        show: true,
                        position: 'top',
                        formatter: function(obj){
                            return obj.value > 0 ? obj.value : ''
                        }
                    }
                },
            )
        } else {
            series.push(
                {
                    name: key,
                    type:'line',
                    yAxisIndex: 1,
                    lineStyle:{
                        // opacity : 0,
                    },
                    data: valObj[key],
                },
            )
        }
    }

    return {
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
        xAxis: [
            {
                type: 'category',
                data: qdKeys,
                axisPointer: {
                    type: 'shadow'
                },
                axisLabel: {
                    interval:0,
                    rotate:-15,
                    // rotate: data.length > 5 ? -20 : '',
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
                        let _vals = []
                        vals.forEach(item => {
                            if(item.length > 14 && item.indexOf('(')>=0){
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
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '个',
                minInterval: 1,
            },
            {
                type: 'value',
                name: '元',
                minInterval: 1,
            }
        ],
        series: series
    };
}
