export const lineOption = (qdKeys,valObj)=>{
    let series = []
    let keys = []
    for(let key in valObj){
        keys.push(key)
        series.push(
            {
                name: key,
                type: 'line',
                data: valObj[key]
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
            trigger: 'axis'
        },
        legend: {
            data: keys
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: qdKeys
        },
        yAxis: {
            type: 'value'
        },
        series: series
    };
    return obj
}
