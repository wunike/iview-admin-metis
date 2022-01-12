export const barOption2 = (obj)=>{
    let xAxisData = []
    let data = []

    for(let key in obj){
        xAxisData.push(key)
        data.push({
            name: key,
            value : Number(obj[key])
        })
    }
    return {
        color:[
            '#3EA8FF','#FFAE3A','#F17043','#63D954','#E24182',
            '#F5DA41','#5947DB','#FF81BE','#69E3B4','#D360E5',
            '#82B6FF','#CBE43A','#9C48EB','#5EC8BE'
        ],
        tooltip: {
            trigger: 'item',
            // formatter: "{a} <br/>{b}: {c} ({d}%)"
            formatter: "{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data: xAxisData
        },
        series: [
            {
                name:'访问来源',
                type:'pie',
                radius: ['35%', '50%'],
                label: {
                    normal: {
                        formatter: '{b}: {c}({d}%)',
                    }
                },
                data: data
            }
        ]
    };
}
