<template>
<div class="leaderBox">
    <div class="noData">
        <div class="noDataImg">
            <img src="../../../assets/img/workbenchNew/noData_portal.png" alt="">
        </div>
        <div class="noDataText">暂无门户项配置</div>
    </div>
    <div class="stepBox">
        <div class="stepLists">
            <div class="firstStep stepItem">
                <div class="imgArea">
                    <div class="numIcon">01</div>
                </div>
                <div class="stepText">
                    点击门户模版列表“编辑工作台”，编辑相应门户项
                </div>
            </div>
            <div class="secondStep stepItem">
                <div class="imgArea">
                    <div class="numIcon">02</div>
                </div>
                <div class="stepText">
                    拖动门户项到编辑区域，进行排版
                </div>
            </div>
            <div class="thirdStep stepItem">
                <div class="imgArea">
                    <div class="numIcon">03</div>
                </div>
                <div class="stepText">
                    点击“完成设置”，完成首页布局排版
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
}
</script>

<style lang="less">
@import "../plugin/libs/theme.less";
.leaderBox {
    width: 100%;
    z-index: 7;
    margin-top: 10px;
    background:#fff;
    height: ~"calc(100% - 16px)";
    overflow: hidden;
    .noData {
        position: relative;
        width: 100%;
        height: 45%;
        text-align: center;
        .noDataImg {
            position: absolute;bottom: 30px;left: 0;right: 0;
            top: 20px;
            height: ~"calc(100% - 50px)";
            img{
                position: absolute;left: 0;right: 0;bottom: 0;
                display: block;height: 100%;
                max-height: 200px;
                margin: 0 auto;
            }
        }
        .noDataText {
            position: absolute;left: 0;right: 0;bottom: 0;
            height: 20px;
            width: 100%;
            color: #aaaaaa;
            font-size: 16px;
        }
    }
    .stepBox {
        position: relative;
        width: 100%;
        height: 55%;
        padding-top: 30px;
        .stepLists{
            position: absolute;left: 0;right: 0;bottom: 16px;
        }
        .stepItem {
            width: 33%;
            float: left;
            overflow: hidden;
            text-align: center;
            .imgArea {
                width: 180px;
                height: 180px;
                border-radius: 50%;
                border: 1px dashed @baseThemeColor;
                margin: 0 auto;
                position: relative;
                margin-top: 20px;
                background-size: contain;
                background-repeat: no-repeat;
                .numIcon {
                    position: absolute;
                    width: 33px;
                    height: 36px;
                    line-height: 36px;
                    text-align: center;
                    background: url("../../../assets/img/workbenchNew/stepNum.png") no-repeat;
                    left: 50%;
                    margin-left: -18px;
                    top: -20px;
                    color: #fff;
                }
            }
            .stepText {
                width: 70%;
                margin: 20px auto;
            }

        }
        .firstStep {
            padding-left: 50px;
            .imgArea {
                background-image: url("../../../assets/img/workbenchNew/stepOne.png");
            }
        }
        .secondStep {
            .imgArea {
                background-image: url("../../../assets/img/workbenchNew/stepTwo.png");
            }
        }
        .thirdStep {
            padding-right: 50px;
            .imgArea {
                background-image: url("../../../assets/img/workbenchNew/stepThere.png");
            }
        }
    }
}
</style>
