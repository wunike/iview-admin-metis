export const util = {
    byteFormat(size) {
        if (size) {
            const name = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            let pos = 0;
            while (size >= 1204) {
                size /= 1024;
                pos++;
            }
            if (size.toFixed) {
                return size.toFixed(2) + ' ' + name[pos];
            }
        }
    },
    timeBefore(t) {
        const sec = [31536000, 2592000, 604800, 86400, 3600, 60, 1];
        let ext = ['年', '个月', '星期', '天', '小时', '分钟', '秒'];
        for (let i in sec) {
            const x = Math.floor(t / sec[i]);
            if (x != 0) {
                return `${x}${ext[i]}前`;
            }
        }
    },
    timeFormat(t) {
        const times = [3600, 60, 1];
        const arr = [];
        for (let i in times) {
            const v = times[i];
            const x = Math.floor(t / v);
            if (x > 0) {
                t -= x * v;
            }
            arr.push(x);
        }
        return arr
            .map(i => {
                const v = i.toString();
                return v.length < 2 ? `0${v}` : v;
            })
            .join(':');
    },
    durationFormat(t) {
        const m = Math.floor(t / 60);
        let s = t - 60 * m;
        if (s <= 9) {
            s = `0${s}`;
        }
        return `${m}分${s}秒`;
    },
    uuid() {
        return Math.floor((1 + Math.random()) * 0x1000000000).toString(16);
    }
};
export const isFun = f => {
    return typeof f === 'function';
};


export const clone = (src) => {
    var ret = (src instanceof Array ? [] : {});
    for (var key in src) {
        if (!src.hasOwnProperty(key)) {
            continue;
        }
        var val = src[key];
        if (val && typeof(val) == 'object') {
            val = clone(val);
        }
        ret[key] = val;
    }
    return ret;
};


export const throttle = (fn, wait) => {
    let isThrottled = false,
        lastArgs = null;
    return function wrapper() {
        if (isThrottled) {
            lastArgs = arguments;
        } else {
            fn.apply(this, arguments);
            isThrottled = setTimeout(() => {
                isThrottled = false;
                if (lastArgs) {
                    wrapper.apply(this, lastArgs);
                    lastArgs = null;
                }
            }, wait);
        }
    };
};

export const debounce = (func, delay) => {
    let inDebounce;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(inDebounce);
        inDebounce = setTimeout(() => func.apply(context, args), delay);
    };
};

export const waitUntil = (c, fun, fall, dur = 50, maxTimes = 100) => {
    let times = 0;
    const funwarp = () => {
        const ret = c();
        times++;
        if (ret) {
            fun(times);
        } else if (times < maxTimes) {
            setTimeout(() => {
                funwarp();
            }, dur)
        } else {
            fall && fall(times);
            fall && fall(times);
        }
    }
    funwarp();
}

/*
 * 获取时间区间
 * @params type 传入类型 date month year
 * @param num 时间区间的天数/月数/年数
 * @param noHMS Boolean 是否添加时分秒结尾
 */
export function getTimeInterval(type, num, noHMS) {
    if (num === null) return {};
    let startTime, endTime = '';
    switch (type) {
        case 'date':
            startTime = noHMS ? new Date(new Date().setDate(new Date().getDate() + num)).format('yyyy-MM-dd') : new Date(
                new Date().setDate(new Date().getDate() + num)).format('yyyy-MM-dd') + ' 00:00:00';
            endTime = noHMS ? new Date(new Date().setDate(new Date().getDate() + 1)).format('yyyy-MM-dd') : new Date(
                new Date().setDate(new Date().getDate() + 1)).format('yyyy-MM-dd') + ' 00:00:00';
            break;
        case 'month':
            startTime = noHMS ? new Date(new Date().setMonth(new Date().getMonth() + num + 1, 1)).format('yyyy-MM') :
                new Date(new Date().setMonth(new Date().getMonth() + num + 1, 1)).format('yyyy-MM') + '-01 00:00:00';
            endTime = noHMS ? new Date(new Date().setMonth(new Date().getMonth() + 1, 1)).format('yyyy-MM') : new Date(
                new Date().setMonth(new Date().getMonth() + 1, 1)).format('yyyy-MM') + '-01 00:00:00';
            break;
        case 'year':
            startTime = noHMS ? new Date(new Date().setFullYear(new Date().getFullYear() + num)).format('yyyy') : new Date(
                new Date().setFullYear(new Date().getFullYear() + num)).format('yyyy') + '-01-01 00:00:00';
            endTime = noHMS ? new Date(new Date().setFullYear(new Date().getFullYear() + 1)).format('yyyy') : new Date(
                new Date().setFullYear(new Date().getFullYear() + 1)).format('yyyy') + '-01-01 00:00:00';
            break;
    }
    return {
        startTime,
        endTime,
    };
};

export const wssBaseUrlDev = 'hootie.ivygate.cn' // 测试地址
export const wssBaseUrl = 'hootie.athenaca.com' // 生产地址

export const DatePickerOpt = (o, refName = 'DatePicker', monthNum = 3) => {
    let _this = o;
    return {
        disabledDate(date, $event) {
            if (_this.$refs[refName] && _this.$refs[refName].$refs.pickerPanel.rangeState.from) {
                let time = _this.$refs[refName].$refs.pickerPanel.rangeState.from;
                let beforeMth = new Date(time);
                let lastMth = new Date(time);
                beforeMth.setMonth(beforeMth.getMonth() - monthNum);
                lastMth.setMonth(lastMth.getMonth() + monthNum);
                if (date && date.valueOf() > beforeMth.valueOf() && date.valueOf() < lastMth.valueOf()) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        }
    }
}
export const MonthrangeOpt = (o, refName = 'DatePicker', monthNum = 3) => {
    // console.log('DatePickerOpt')
    let _this = o;
    return {
        disabledDate(date, $event) {
            if (_this.$refs[refName] && _this.$refs[refName].$refs.pickerPanel.rangeState.from) {
                // console.log(_this.$refs[refName].$refs.pickerPanel.rangeState.from)
                let time = _this.$refs[refName].$refs.pickerPanel.rangeState.from;
                let beforeMth = new Date(time);
                let lastMth = new Date(time);
                beforeMth.setMonth(beforeMth.getMonth() - (monthNum -1));
                lastMth.setMonth(lastMth.getMonth() + monthNum);
                let year=date;
                date = new Date();
                date.setFullYear(year)
                date.setMonth($event - 1);
                date.setDate(1);
                if (date && date.valueOf() > beforeMth.valueOf() && date.valueOf() < lastMth.valueOf()) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        }
    }
}

// 获取未归档可选月份范围
// _gdTimeStr 为归档时间节点。肯定为某个月的最后一天的23:59:59
export const noGdMonth = (o, _gdTimeStr, refName = 'DatePicker', monthNum = 3) => {
    let _this = o;
    return {
        disabledDate (year, month) {
            if(_this.$refs[refName] && _this.$refs[refName].$refs.pickerPanel.rangeState.from){
                // 选择了开始月，决定可选结束月份范围
                // 所选开始月份，计算开始月份范围、结束月份范围
                let time = _this.$refs[refName].$refs.pickerPanel.rangeState.from
                let beforeMth = new Date(time);
                let lastMth = new Date(time);
                beforeMth.setMonth(beforeMth.getMonth() - (monthNum -1)); // 配置为设置减去月份范围 - 1，否则会超出设置的月份范围
                lastMth.setMonth(lastMth.getMonth() + (monthNum -1)); // 配置为设置加上月份范围 - 1，否则会超出设置的月份范围
                //拼接开始、结束月份的字符串
                let beforeMthStrYear = beforeMth.getFullYear()
                let beforeMthStrMonth = beforeMth.getMonth() + 1
                let lastMthStrYear = lastMth.getFullYear()
                let lastMthStrMonth = lastMth.getMonth() + 1
                let beforeMthStr = beforeMthStrYear + '-' + (beforeMthStrMonth < 10 ? '0' + beforeMthStrMonth : beforeMthStrMonth)
                let lastMthStr = lastMthStrYear + '-' + (lastMthStrMonth < 10 ? '0' + lastMthStrMonth : lastMthStrMonth)
                
                let disabledDate = (month < 10) ? year + '-0' + month : year + '-' + month;
                if(new Date(beforeMthStr).getTime() < new Date(_gdTimeStr).getTime()){
                    // 如果开始月份的可选截止点超过了归档点。则开始月份可选截止点改为归档点
                    beforeMthStr = _gdTimeStr
                }
                return disabledDate < beforeMthStr || disabledDate > lastMthStr;     
            } else {
                // 未选择开始时间，设置默认可选开始、结束月份范围
                let disabledDate = (month < 10) ? year + '-0' + month : year + '-' + month;
                return disabledDate < _gdTimeStr;     
            }
        }
    }
}

// 获取已归档可选月份范围
// _gdTimeStr 为归档时间节点。肯定为某个月的最后一天的23:59:59
export const hasGdMonth = (o, _gdTimeStr, refName = 'DatePicker', monthNum = 3) => {
    let _this = o;
    return {
        disabledDate (year, month) {
            if(_this.$refs.DatePicker.$refs.pickerPanel.rangeState.from){
                // 选择了开始月，决定可选结束月份范围
                // 所选开始月份，计算开始月份范围、结束月份范围
                let time = _this.$refs.DatePicker.$refs.pickerPanel.rangeState.from
                let beforeMth = new Date(time);
                let lastMth = new Date(time);
                beforeMth.setMonth(beforeMth.getMonth() - (monthNum-1)); // 配置为设置减去月份范围 - 1，否则会超出设置的月份范围
                lastMth.setMonth(lastMth.getMonth() + (monthNum-1)); // 配置为设置加上月份范围 - 1，否则会超出设置的月份范围
                //拼接开始、结束月份的字符串
                let beforeMthStrYear = beforeMth.getFullYear()
                let beforeMthStrMonth = beforeMth.getMonth() + 1
                let lastMthStrYear = lastMth.getFullYear()
                let lastMthStrMonth = lastMth.getMonth() + 1
                let beforeMthStr = beforeMthStrYear + '-' + (beforeMthStrMonth < 10 ? '0' + beforeMthStrMonth : beforeMthStrMonth)
                let lastMthStr = lastMthStrYear + '-' + (lastMthStrMonth < 10 ? '0' + lastMthStrMonth : lastMthStrMonth)
                
                let disabledDate = (month < 10) ? year + '-0' + month : year + '-' + month;
                if(new Date(lastMthStr).getTime() > new Date(_gdTimeStr).getTime()){
                    // 如果结束月份的可选截止点超过了归档点。则结束月份可选截止点改为归档点
                    lastMthStr = _gdTimeStr
                }
                return disabledDate < beforeMthStr || disabledDate > lastMthStr;     
            } else {
                // 未选择开始时间，设置默认可选开始、结束月份范围
                let disabledDate = (month < 10) ? year + '-0' + month : year + '-' + month;
                return disabledDate > _gdTimeStr;                     
            }
        }
    }
}

export const defaultDatePickerValue = (month = 5) => {
    let now = new Date().getTime()
    let prevTime = now - Number(month) * 30 * 24 * 3600 * 1000
    return [new Date(new Date(prevTime).setDate(1)), new Date()]
}

export const getMonthEndDay = (year_month, hasSecond = true) => {
    var curDate=new Date(year_month);
    var month=curDate.getMonth()
    curDate.setMonth(month);
    var curMonth = curDate.getMonth();
    /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
    curDate.setMonth(curMonth + 1);
    /* 将日期设置为0, 返回当月最后一天日期， 将日期设置为1，返回下一个月第一天日期*/
    curDate.setDate(0);
    /* 返回当月的天数 */
    if(hasSecond){
      return curDate.format('yyyy-MM-dd 23:59:59')
    } else {
      return curDate.format('yyyy-MM-dd')
    }
    // return curDate.getDate();
}

export const titleTransformationToLabel = (data) => {
    if(data && data.length){
        data.forEach(item=>{
            item.label = item.title
            if(item.children && item.children.length){
                titleTransformationToLabel(item.children)
            } else {
                item.children = undefined
            }
        })
    }
}

export const getSelectIdsByid = (idsTree, ids, parentId) => {
    if(idsTree && idsTree.length){
        idsTree.forEach(item=>{
            if(item.children && item.children.length){
                let q = item.children.map(childrenItem =>{ return childrenItem.id })
                // q.push(item.id) // 带父级Id
                ids[item.id] = q
                if(parentId){
                    ids[parentId] = ids[parentId].concat(q)
                }
                getSelectIdsByid(item.children, ids, item.id)
            } else {
                ids[item.id] = [item.id]
            }
        })
    }
}

export const getSelectTreeDataByid = (idsTree, resultObj) => {
    if(idsTree && idsTree.length){
        idsTree.forEach(item=>{
            resultObj[item.id] = item
            getSelectTreeDataByid(item.children, resultObj)
        })
    }
}


export function randomNum(len, radix) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
    const uuid = []
    radix = radix || chars.length
  
    if (len) {
      // Compact form
      for (let i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix ]
    } else {
      // rfc4122, version 4 form
      let r
  
      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
      uuid[14] = '4'
  
      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (let i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16
          uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
        }
      }
    }
    return uuid.join('') + new Date().getTime()
  }

export const formatNum = (num) => {
    num = num + '';
    if (!num.includes('.')) {
        num += '.'
    }
    return num.replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
        return $1 + ',';
    }).replace(/\.$/, '');
}
