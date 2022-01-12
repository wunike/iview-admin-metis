<style lang="less">
    .count-use-system-container {
        position: relative;height: 100%;
        .cusc-info {
            width: 100%;
            background: #fff;
            height: 87px;
            margin-bottom: 16px;
            ul {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
            }

            li {
                /*flex: 1;*/
                padding-top: 21px;
                text-align: center;
                margin-left: 104px;
            }

            div {
                @h: 26px;
                height: @h;
                line-height: @h;
                font-size: 14px;
            }

            span {
                font-size: 16px;
                line-height: 22px;
            }
        }

        .tab-wrapper {
            padding: 30px 16px 16px 16px;
            height: ~"calc(100% - 103px)";
            width:100%;
            background: #fff;
            position: relative;
            .search{
                position: absolute;
                right:16px;
                top:18px;
                z-index: 2;
            }
            .fa-div{
                height: ~"calc(100% - 80px)";
                width:100%;
                /*background: #ff3300;*/
            }
        }
    }
</style>

<template>
    <div class="count-use-system-container">
        <div class="cusc-info">
            <ul>
                <li>
                    <div>用户总数</div>
                    <span style="color: #7C6AF2;">{{getPointsData && getPointsData.point?getPointsData.point:'0'}}</span>
                </li>
                <li style="margin-left: 120px;">
                    <div>有效用户数</div>
                    <span
                            style="color: #FF9300;"
                    >{{getPointsData && getPointsData.totalpoint?getPointsData.totalpoint:'0'}}</span>
                </li>
            </ul>
        </div>
        <div class="tab-wrapper">
            <div class="search">
                <RadioGroup v-model="dates" @on-change="changeDate">
                    <Radio label="day7">
                        <span>近7天</span>
                    </Radio>
                    <Radio label="day14">
                        <span>近14天</span>
                    </Radio>
                    <Radio label="day30">
                        <span>近30天</span>
                    </Radio>
                </RadioGroup>
                <DatePicker
                        v-model="dateTime"
                        transfer
                        type="daterange"
                        format="yyyy-MM-dd"
                        split-panels
                        placeholder="选择日期"
                        @on-clear="clearDate"
                        @on-change="changeDateFn"
                        style="width: 200px"></DatePicker>
            </div>
            <Tabs style="margin-bottom:24px;" :value="tabVal" @on-click="clickTabs">
                <TabPane label="用户数" name="name1"></TabPane>
                <TabPane label="活跃用户数" name="name2"></TabPane>
                <TabPane label="模块使用人数" name="name3"></TabPane>
            </Tabs>
            <div class="fa-div" ref="faDiv">
                <eChart ref="eChart" v-show="ifLine" :wh="wh"></eChart>
                <bar ref="bar" v-show="!ifLine" :wh="wh"></bar>
            </div>

        </div>
    </div>
</template>

<script>
    import eChart from './echarts1'
    import bar from "./bar";
    export default {
        props: {
            id: {
                type: String,
                required: true
            }
        },
        components: {eChart,bar},
        data() {
            return {
                dates:'',//筛选的日期
                getPointsData:{},
                ifLine:true,
                wh:{
                    height:0,
                    width:0,
                },
                line1:{
                    x:["Jan1", "Mar2", "May3", "Jul4", "Sep5", "Dec6"],
                    data:[100, 200, 100, 400, 100, 300]
                },
                line2:{
                    x:["Jan11", "Mar21", "May32", "Jul43", "Sep35", "Dec6"],
                    data:[100, 600, 500, 400, 100, 300]
                },
                bar:{
                    x:["Jan16", "Mar28", "May3", "Jul4", "Sep5", "Dec6"],
                    data:[100, 200, 500, 800, 100, 300]
                },
                dateTime:[],
                day7:[],
                day14:[],
                day30:[],

            }
        },
        mounted() {
            let dom = this.$refs.faDiv;
            this.wh.height = dom.offsetHeight;
            this.wh.width = dom.offsetWidth;
            this.$refs.eChart.show(this.line1)
        },
        computed:{

        },
        methods: {
            clickTabs(v) {
                if(v == 'name3'){
                    this.ifLine = false
                    this.$refs.bar.show(this.bar)
                }else if(v == 'name1') {
                    this.ifLine = true
                    this.$refs.eChart.show(this.line1)
                }else if(v == 'name2') {
                    this.ifLine = true
                    this.$refs.eChart.show(this.line2)
                }
            },
            changeDate(v) {
                let day = new Date().format('yyyy-MM-dd');
                let day7 = new Date(new Date(new Date().format('yyyy-MM-dd')).getTime() - 7 * 24 * 60 * 60 * 1000).format('yyyy-MM-dd');
                let day14 = new Date(new Date(new Date().format('yyyy-MM-dd')).getTime() - 14 * 24 * 60 * 60 * 1000).format('yyyy-MM-dd');
                let day30 = new Date(new Date(new Date().format('yyyy-MM-dd')).getTime() - 30 * 24 * 60 * 60 * 1000).format('yyyy-MM-dd');
                this.day7 =  [day7,day];
                this.day14 =  [day14,day];
                this.day30 =  [day30,day];
                switch(v){
                    case 'day7':
                        this.dateTime = [day7,day]
                        break;
                    case 'day14':
                        this.dateTime = [day14,day]
                        break;
                    case 'day30':
                        this.dateTime = [day30,day]
                }
            },
            clearDate() {
                this.dates = ''
            },
            changeDateFn(v) {
                if(v[0] == this.day7[0] && v[1] == this.day7[1]){
                    this.dates = 'day7'
                }else if(v[0] == this.day14[0] && v[1] == this.day14[1]){
                    this.dates = 'day14'
                }else if(v[0] == this.day30[0] && v[1] == this.day30[1]){
                    this.dates = 'day30'
                }
                console.log(v)
            },
        },
    }
</script>
