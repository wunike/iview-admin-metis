<style lang="less">
@mainColor: #44BCB7;
.stu-card-wrapper{
    position: relative;
    width: 267px;
    height: 418px;
    display: inline-block;
    margin-left: 30px;
    margin-right: 30px;
    text-align: center;
    box-shadow:0px 2px 4px 0px rgba(0,0,0,0.25);
    .companyInfo {
        width: 170px;
        margin: 0 auto;
        padding: 20px 0 20px 0;
        img {
            max-width: 170px;
        }
    }
    .stuName {
        margin: 0 auto;
        text-align: center;
        color: @mainColor;
        font-size: 14px;
        font-weight: bold;
        .avator {
            width: 110px;
            height: 120px;
        }
        .courseGrade {
            color: #fff;
            background: @mainColor;
            display: inline-block;
            padding: 2px 12px;
            border-radius: 15px;
        }
        .myJsBarcode {
            height: 70px;
            width: 200px;
        }
    }
}
</style>

<template>
    <div class="stu-card-wrapper">
        <div class="companyInfo">
            <img src="../../../assets/img/company.png" />
        </div>
        <div class="stuName">
            <img class="avator" :src="childItem.imgPath" />
            <div>{{childItem.name}}</div>
            <div style="font-weight: 400;margin-bottom:12px;">{{childItem.enName}}</div>
            <div>{{childItem.officeName}}</div>
            <span class="courseGrade" :style="{'background': myBackground}">{{childItem.gradeLabel}}</span>
            <div>
                <canvas class="myJsBarcode" id="canvas"></canvas>
            </div>
        </div>
    </div>
</template>

<script>
/**
 ** @author: 曹见芳
 ** 客户360 - 学生卡
 */
const JsBarcode = require("jsbarcode");
export default {
    name: 'stuCard',
    props: {
        myBackground: {
            type: String,
            required: true
        },
        childItem: {
            type: Object,
            required: true
        },
    },
    mounted(){
        var canvas = document.getElementById("canvas");
        JsBarcode(
            canvas,
            this.childItem.code
        );
    },
}
</script>

