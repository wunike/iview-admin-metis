<style lang="less">
.date-month-container{
    position: relative;
    display: inline-block;
    /*margin-right:16px;*/
    /*.ivu-date-picker{*/
    /*    margin-right:0;*/
    /*}*/
    b{
        display: inline-block;
        /*height:100%;*/
        /*line-height: 20px;*/
        /*padding:0 6px;*/
        position: absolute;
        top:5px;
        left:143px;
        z-index: 1;
    }
}
</style>

<template>
    <div class="date-month-container">
        <DatePicker
                ref="DatePicker1"
                v-model="beforeMonth"
                type="month"
                :options="options3"
                style="width: 140px"
                placement="bottom-start"
                :placeholder="singleMonth? '选择月份':'选择起始月份'"
                @on-change="beforeMonthFn"
                @on-clear="reset"
        ></DatePicker>
        <b v-if="!singleMonth">-</b>
        <DatePicker
                v-if="!singleMonth"
                ref="DatePicker2"
                style="width: 140px"
                v-model="afterMonth"
                type="month"
                :options="options4"
                placement="bottom-start"
                placeholder="选择终止月份"
                @on-change="afterMonthFn"
                @on-clear="reset"
        ></DatePicker>
    </div>
</template>

<script>
    export default {
        props:{
            singleMonth:{ //是否显示单月，默认显示双月范围
                type:Boolean,
                default:false,
            }
        },
        data() {
            let _this = this;
            return {
                monthRange:[],
                beforeMonth:'',
                afterMonth:'',
                options3: {
                    disabledDate (date) {
                        if(_this.afterMonth){
                            return date && date.valueOf() > new Date(_this.afterMonth).valueOf();
                        }else{
                          return false;
                        }
                    }
                },
                options4: {
                    disabledDate (date) {
                        if(_this.beforeMonth){
                            return date && date.valueOf() <  new Date(_this.beforeMonth).valueOf();
                        }else{
                            return false;
                        }
                    }
                }
            }
        },
        methods: {
            beforeMonthFn(val) {
                if(!this.singleMonth){
                    this.monthRange[0] = val
                    let date = new Date(val.split('-')[0],val.split('-')[1]-1)
                    this.options4.disabledDate(date)
                    if(!!!this.afterMonth){
                        this.afterMonth = val
                        this.monthRange[1] = val
                    }
                }else{
                    this.monthRange[0] = val
                }
                this.$emit('getMonthData',this.monthRange)
            },
            afterMonthFn(val) {
                this.monthRange[1] = val
                let date = new Date(val.split('-')[0],val.split('-')[1]-1)
                this.options3.disabledDate(date)
                if(!!!this.beforeMonth){
                    this.beforeMonth = val
                    this.monthRange[0] = val
                }
                this.$emit('getMonthData',this.monthRange)
            },
            reset(){
                //清空数据
                this.monthRange[0] = ''
                if(!this.singleMonth){
                    this.monthRange[1] = ''
                }
                this.afterMonth = ''
                this.beforeMonth = ''
                this.$emit('getMonthData',this.monthRange)
            },
        },
        watch:{
            singleMonth(val,oldVal){
                if(val){
                    this.monthRange = ['']
                }else{
                    this.monthRange[0] = ''
                    this.monthRange[1] = ''
                }
                this.afterMonth = ''
                this.beforeMonth = ''
                this.$emit('getMonthData',this.monthRange)
            },
        },
    }
</script>
