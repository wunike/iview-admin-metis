<style lang="less">
    .jw-info-box{
        width:960px;
        padding-left:24px;
        .dib-item{
            display:flex;
            flex-direction: row;
            justify-content: flex-start;
            padding-bottom:12px;
            width:940px;
            >span{
                display: inline-block;
                width:100px;
                font-size: 14px;
                font-weight: normal;
                color: rgba(153, 153, 153, 1);
            }
            b{
                font-style: normal;
            }
            em{
                font-style: normal;
            }
            .tab-title{
                width:860px;
                display: flex;
                flex-direction: row;
                padding-top:12.5px;
                padding-bottom:12.5px;
                background: #FAFAFA;
                border:1px solid #E8E8E8;
                padding-left:10px;
                font-size: 12px;
                b{
                    display: inline-block;
                    a{
                        display: inline-block;
                        overflow: hidden;
                        max-width: 200px;
                        min-width: 100px;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
            }
            .tab-title-new{
                width:860px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                padding-top:10px;
                padding-bottom:10px;
                background: #FAFAFA;
                border:1px solid #E8E8E8;
                padding-left:10px;
                padding-right:20px;
            }

            .tab-body{
                width:860px;
                font-size: 12px;
                .tab-body-t{
                    width:860px;
                    display: flex;
                    flex-direction: row;
                    background: #FAFAFA;
                    border:1px solid #E8E8E8;
                    padding-top:15.5px;
                    padding-bottom:15.5px;
                    padding-left:10px;
                    border-top:0;
                    b{
                        display: inline-block;
                        width:16.67% ;
                        color:rgba(73, 80, 96, 1);
                        font-weight:600;
                    }
                }
                .tab-body-b{
                    width:860px;
                    display: flex;
                    flex-direction: row;
                    border:1px solid #E8E8E8;
                    border-top:0;
                    padding-top:10.5px;
                    padding-bottom:10.5px;
                    padding-left:10px;
                    em{
                        width:16.67% ;
                        display: inline-block;
                        font-weight:400;
                        color:rgba(73,80,96,1);
                    }
                }
            }
            .di-reason{
                width:860px;
            }
        }
    }
</style>
<template>
    <div class="jw-info-box">
        <div class="lizhi">
            <div class="dib-item">
                <span>{{$t('portal_app_Centres')}}</span>
                <div>{{listData.officeName}}</div>
            </div>
            <div class="dib-item">
                <span>{{$t('modules_spoc_jw_web_src_views_approval_jwapprovaldetial_2265')}}</span>
                <div>{{listData.studentName}}</div>
            </div>
            <div class="dib-item">
                <span>{{$t('modules_spoc_jw_web_src_views_approval_jwapprovaldetial_2266')}}</span>
                <div>{{listData.classCourseName}}</div>
            </div>
            <div class="dib-item">
                <span>{{$t('modules_spoc_jw_web_src_views_approval_jwapprovaldetial_2267')}}</span>
                <div class="di-reason">{{listData.reason}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            listData:{
                type:Object,
                required: true,
                default:() => {
                    return {}
                }
            },
        },
        methods: {

        },
    }
</script>

