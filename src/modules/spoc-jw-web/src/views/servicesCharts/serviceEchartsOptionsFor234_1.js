export const barOption1 = (obj)=>{
    console.log(obj)
    // obj= {
    //     allType,
    //     teacherNameArray,
    //     allTypeArrObj
    // }

    let series = []
    for(let key in obj.allTypeArrObj) {
        series.push(
            {
                name: key,
                type:'bar',
                stack: '耗课金额',
                barMaxWidth: 20,
                data: obj.allTypeArrObj[key]
            },
        )
    }
    let zeroArr = []
    obj.teacherNameArray.forEach(item => {
        zeroArr.push(0)
    });
    series.push({
        name:'合计',
        type: 'line',
        lineStyle:{
            opacity : 0,
        },
        label:{
            show: true,
            textStyle:{
                color:'#000'
            }
        },
        data:  zeroArr // [0,0,0,0,0,0,0,0,0,0] 
    })

    return {
        color:[
            '#3EA8FF','#FFAE3A','#F17043','#63D954','#E24182',
            '#F5DA41','#5947DB','#FF81BE','#69E3B4','#D360E5',
            '#82B6FF','#CBE43A','#9C48EB','#5EC8BE'
        ],
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
        legend: {
            data: obj.allType //['EE','LWP','GGR','GIR','冬夏令营']
        },
        xAxis : [
            {
                type : 'category',
                data : obj.teacherNameArray, //['赵一','钱二','孙三','李四','周五','吴六','郑七','赵一1','钱二2','孙三3']
                axisLabel: {
                    interval:0,
                    rotate: obj.teacherNameArray.length > 4 ? -20 : '',
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
            }
        ],
        yAxis : [
            {
                type : 'value',
                name: obj.yAxisName,
            }
        ],
        series : series
        //[
            // {
            //     name:'LWP',
            //     type:'bar',
            //     stack: '广告',
            //     barWidth: 20,
            //     data:[220, 182, 191, 234, 290, 330, 310,100,200,150]
            // },
            // {
            //     name:'GGR',
            //     type:'bar',
            //     stack: '广告',
            //     barWidth: 20,
            //     data:[150, 232, 201, 154, 190, 330, 410,100,200,150]
            // },
            // {
            //     name:'GIR',
            //     type:'bar',
            //     stack: '广告',
            //     barWidth: 20,
            //     data:[150, 232, 201, 154, 190, 330, 410,100,200,150]
            // },
            // {
            //     name:'冬夏令营',
            //     type:'bar',
            //     stack: '广告',
            //     barWidth: 20,
            //     data:[150, 232, 201, 154, 190, 330, 410,100,200,150]
            // },
            // {
            //     name:'合计',
            //     type: 'line',
            //     lineStyle:{
            //         opacity : 0,
            //     },
            //     label:{
            //         show: true,
            //         textStyle:{
            //             color:'#000'
            //         }
            //     },
            //     data:  [0,0,0,0,0,0,0,0,0,0]
            // }
        //]
    };
}
