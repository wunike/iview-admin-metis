<style lang="less">
    .statisticsTime {
        font-size: 12px;
        p{
             line-height: 32px;
            span {
                padding: 4px 8px;
                cursor: pointer;
                margin-right: 6px;
            }
            span:first-child {
                cursor: auto;
                color: #b8b8b8;
                padding: 0;
                margin-right: 15px;
            }
            .active {
                background-color: #44bcb6;
                color: white;
            }
        }
        .ivu-input {
            height: 26px;
            
        }
        .ivu-input-icon {
            height: 26px;
            line-height: 26px;            
        }
    }

</style>
<template>
    <div class="statisticsTime">
        <p>
            <span>{{timeTitle}}：</span><span :class="{active:num === index}" ref="hasActive" @click="addAcitve(index)" v-for="(item, index) in statisticsTimeList">{{item}}</span>
            <DatePicker v-model="startTime" @on-change="beforeChange" :format="dateType.format" :type="dateType.type" transfer :placeholder="placeholder" style="width: 130px"></DatePicker>
				——
		    <DatePicker v-model="endTime" @on-change="afterChange" :format="dateType.format" :type="dateType.type" transfer :placeholder="placeholder" style="width: 130px"></DatePicker>
            
        </p>
    </div>
</template>
<script>
export default {
    props: {
        isFuture: {
            type: Boolean,
            default: true
        },

        currentTime: {
            type: String,
            default: '2018-01'
        },

        timeTitle: {
            type: String,
            default: '统计时间'
        },

        statisticsTimeList: {
            type: Array,
			default: function() {
				return ["当前月 ", "最近三个月", "最近六个月"];
			}
        },
        placeholder: {
            type: String,
            default: '签约时间'
        },
        dateType: {
            type: Object,
            default: {
				format:'yyyy-MM',
				type:'month'
            }
        }

    },

    data() {
        return {
            num: 0,
            startTime: '',
            endTime: '',
            titleContent: ''
        }
    },

    methods: {
    	setReset(){
            this.num = 0
            this.startTime = ''
            this.endTime = ''
    	},
        addAcitve(index) {
            this.num = index
            this.startTime = ''
            this.endTime = ''
            if (!index) {
                this.$emit('allDate')
                return
            }
            index -= 1
            if(this.isFuture) {
               this.agoDateList(index)
            } else { 
                this.futureDateList(index)
            }
        },

        beforeChange(val) {
            if(!val) return
            this.startTime = val
            this.judgeTime()
        },

        afterChange(val) {
            if(!val) return
            this.endTime = val
            this.judgeTime()
        },

		judgeTime() {
			if(!this.startTime || !this.endTime) {
				this.$Message.info("请输入开始时间 或 结束时间")
				return
            }

            this.startTime = new Date(this.startTime).format('yyyy-MM-dd')
            this.endTime = new Date(this.endTime).format('yyyy-MM-dd')
            let [year, month, day] = this.endTime.match(/\d+/g);
                let re = /-/g
                let endTime = this.endTime.replace(re,'')
                let startTime = this.startTime.replace(re,'')
                if(endTime - startTime < 0) {
                    this.$Message.info("开始时间不能大于结束时间")
                    return
                }
             
                this.num = ''
                this.$emit('upDateAnalyseSellDetail', [`${this.startTime}`, `${year}-${month}-${day}`])
		},

        agoDateList(index) {
            let endTime, startTime
			let agoMonth = 3 * index-1;
			let [year, month, day] = this.currentTime.match(/\d+/g);
			let [originYear, originMonth, originDay] = this.currentTime.match(/\d+/g);
			if (month - agoMonth <= 0) {
				month -= agoMonth;
				month += 12;
				year -= 1;
			}else {
				month -= agoMonth;
			}
            month = month < 10 ? `0${month}` : month
			if (index) {
				startTime = `${year}-${month}-${day}`
			}else {
				startTime = `${originYear}-${originMonth}-${originDay}`
			}

			endTime = `${originYear}-${parseInt(originMonth)+1}-${originDay}`
            this.$emit('upDateAnalyseSellDetail', [`${startTime}`, `${endTime}`, index])
		},

		futureDateList(index) {
            let startTime, endTime
			let agoMonth = 3 * index;
			let [year, month, day] = this.currentTime.match(/\d+/g);
			let [originYear, originMonth, originDay] = this.currentTime.match(/\d+/g);
            month = month/1
            year = year/1
			if (month + agoMonth > 12) {
				month += agoMonth;
				month -= 12;
				year += 1;
			}else {
				month += agoMonth;
			}
			month = month < 10 ? `0${month}` : month
			if (index) {
				endTime = `${year}-${parseInt(month)+1}-${day}`
			}else {
				startTime = `${originYear}-${originMonth}-${originDay}`
				endTime = `${originYear}-${parseInt(originMonth)+1}-${originDay}`
			    this.$emit('upDateAnalyseSellDetail', [`${startTime}`, `${endTime}`, index])
				return
			}

			startTime = `${originYear}-${originMonth}-${originDay}`
			this.$emit('upDateAnalyseSellDetail', [`${startTime}`, `${endTime}`, index])
            
		},

    }
}
</script>
