export const barOption = (obj)=>{
    let seriesLabel = {
        normal: {
            show: true,
            position: 'right'
        }
    }

    let legend = Object.keys(obj.legendObj)

    let series = []
    for (let key in obj.legendObj) {
        series.push(
            {
                name: key,
                type: 'bar',
                data: obj.legendObj[key],
                label: seriesLabel,
                
            }
        )
    }

    return {
        title: {
            text: obj.title
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: legend
        },
        grid: {
            left: 100
        },
        xAxis: {
            type: 'value',
        },
        yAxis: {
            type: 'category',
            inverse: true,
            data: obj.yAxisData // ['Sunny', 'Cloudy', 'Showers'],
        },
        series: series
        // series: [
        //     {
        //         name: 'City Alpha',
        //         type: 'bar',
        //         data: [165, 170, 30],
        //         label: seriesLabel,
              
        //     },
        //     {
        //         name: 'City Beta',
        //         type: 'bar',
        //         label: seriesLabel,
        //         data: [150, 105, 110]
        //     },
        //     {
        //         name: 'City Gamma',
        //         type: 'bar',
        //         label: seriesLabel,
        //         data: [220, 82, 63]
        //     }
        // ]
    };
}
