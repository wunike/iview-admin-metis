export const barOption = (keys,cashs)=>{
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
        yAxis: {
            type: 'value',
            minInterval: 1,
            name: '元',
        },
        xAxis: {
            type: 'category',
            data: keys,
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
                    return vals.join('\n');
                }
            },
        },
        series: [
            {
                type: 'bar',
                data: cashs,
                barMaxWidth : 20,
                label:{
                    show: true,
                    position: 'top',
                    formatter: function(obj){
                        return obj.value > 0 ? obj.value : ''
                    }
                }
            }
        ]
    };
}
