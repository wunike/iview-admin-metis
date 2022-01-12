<style lang="less">
    .poptip-table{
        .pop-box{
            display: flex;
            flex-direction: row;
            align-items: center;
            .text-span{
                display:block;
                width:60px;
                height:30px;
                line-height:30px;
                overflow:hidden;
                text-overflow:ellipsis;
                white-space: nowrap
            }
            .my-pop{
                display: inline-block;
                background:#F7BB63;
                height:18px;
                width:18px;
                line-height:18px;
                text-align: center;
                color:#fff;
                margin-left:4px;
                border-radius:2px;
            }

        }

    }
    .pt-table{
        .ivu-table td,.ivu-table th{
            height:40px;padding:0;
        }
        .ivu-table-wrapper{
            border:none;
        }
        .ivu-table:before,.ivu-table:after{
            width:0;
            height:0;
        }
    }
</style>
<template>
    <div class="poptip-table">
        <Poptip placement="right-start" width="640" trigger="hover" :transfer="true">
            <div class="pop-box">
                <span class="text-span">{{text}}</span>
                <span class="my-pop">课</span>
            </div>

            <div class="api" slot="content">
                <div style=" padding-bottom:5px;">{{text}}</div>
                <Table class="pt-table" :columns="cols"  :data="courseList"></Table>
            </div>
        </Poptip>
    </div>
</template>

<script>
    // import valid, { errors, common } from '../../../../libs/request.js';
    import { mapMutations } from "vuex";
    export default {
        mounted() {
        },
        props: {
            courseList:{
                default:'',
                type:Array,
            },
            text:{
                default:'',
                type:String,
            },
        },
        data(){
            return {
                cols:[
                    {
                        title: "课程包名称",
                        key: "name",
                        render:(h,params) => {
                            return h('div',
                                { },
                                [
                                    h('span',

                                        params.row.name? params.row.name : '-'),
                                    h('Icon',
                                        {
                                            props:{
                                                type:'ios-warning-outline',
                                                size:14,
                                                color:params.row.isIgnore == '0' ? '#495960':'red'
                                            },
                                            style:{
                                                marginLeft:'4px',
                                                marginTop:'-3px'
                                            },
                                        }
                                    )
                                ]
                            )
                        }
                    },
                    {
                        title: "购买课时数",
                        key: "totalHour",
                        render:(h,params) => {
                            return h('div',
                                { },
                                [
                                    h('span',
                                        {

                                        },
                                        params.row.totalHour),
                                ]
                            )
                        }
                    },
                    {
                        title: "赠送课时数",
                        key: "presentHour",
                        render:(h,params) => {
                            return h('div',
                                { },
                                [
                                    h('span',
                                        {

                                        },
                                        params.row.presentHour),
                                ]
                            )
                        }
                    },
                    {
                        title: "剩余总课时数",
                        key: "remainHour",
                        render:(h,params) => {
                            return h('div',
                                { },
                                [
                                    h('span',
                                        {

                                        },
                                        params.row.remainHour),
                                ]
                            )
                        }
                    },
                    {
                        title: "剩余有效期(天)",
                        key: "remainDay",
                        render:(h,params) => {
                            return h('div',
                                { },
                                [
                                    h('span',
                                        {

                                        },
                                        params.row.remainDay),
                                ]
                            )
                        }
                    },
                ],
            }
        },
        mounted(){
            // console.log(this.courseList)
          // this.getLists()
        },
        methods: {
            ...mapMutations(["updateLoadingStatus"]),
        }
    }
</script>
