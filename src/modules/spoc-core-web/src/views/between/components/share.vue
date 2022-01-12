<style lang="less">
.between-share-container{
    .between-share-container-content{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        padding:0 20px 8px 40px;
        .left{
            width: 186px;
            height:330px;
            margin-right: 64px;
            background: #999;
            background-size: contain;
            background-origin: content-box;
            position: relative;
            img{
                width: 48px;
                height:48px;
                position: absolute;
                /*bottom:52px;*/
                /*left:69px;*/
                cursor: default;
            }
        }
        .right{
            width: 442px;
            .bscc-r{
                font-size:12px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(153,153,153,1);
                >span{
                    font-size:14px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(73,80,96,1);
                }
                img{
                    width: 98px;
                    height:98px;
                }
                >a{
                 font-size: 14px;
                }
                .a-input{
                    border:none;
                    color:#44bcb7;
                }
            }
            .spec{
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: flex-start;
            }
            .spec-center{
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                span{
                    margin-bottom:8px;
                }

            }
        }
    }
}
</style>

<template>
    <Modal
            class="between-share-container"
            v-model="modal"
            title="分享"
            @on-ok="ok"
            width="800"
            :mask-closable="false"
    >
        <div class="between-share-container-content">
            <div class="left" ref="imgObjBox" :style="{backgroundImage: 'url(' + bg + ')' }">
                <img
                        ref="imgObj" @mousedown="move"
                        :style="{'left':md.left +'px','top':md.top + 'px'}"
                        src="https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=376029017,2622921745&fm=26&gp=0.jpg">
            </div>
            <div class="right">
                <div class="bscc-r spec-center" >
                    <span>分享海报：</span>
                    <Upload
                            :data="{
                                bizId: '',
                                bizType: 'image',
                                isSingle: true
                            }"
                            :headers="headers"
                            ref="pageRef"
                            :action="uploadImg"
                            :before-upload="detailBeforeUpload"
                            :format="['jpg','png']"
                            :on-format-error="handleFormatError"
                            name="file"
                            :show-upload-list="false"
                            :on-success="HandleSuccess"
                    >
                        <Button @click="upload"  type="primary">上传</Button>
                    </Upload>
                </div>
                <div class="bscc-r" style="margin:8px 0 20px 0;">
                    上传图片分率比例 9:16（推荐尺寸750x1334），jpg、png格式，图片不大于1M。
                </div>
                <div class="bscc-r">
                    <span>自定义二维码位置：</span>
                    <Button @click="toOringe"  type="primary">回到默认位置</Button>
                </div>
                <div class="bscc-r" style="margin:8px 0 22px 0;">
                    鼠标拖动方块，可自定义二维码位置。

                </div>
                <div class="bscc-r" style="margin-bottom:22px;">
                    <span>分享链接：</span>
                    <a style="margin:0 5px;" :href="copyValue"><input ref="aInput" class="a-input" readonly type="text" :value="copyValue"></a>
                    <Icon @click="copy" type="ios-copy-outline" size="16" style="cursor: pointer"/>
                </div>
                <div class="bscc-r spec">
                    <span>分享二维码：</span>
                    <img src="https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=376029017,2622921745&fm=26&gp=0.jpg">
                </div>
            </div>
        </div>
        <div slot="footer">
            <Button @click="cancel" >取消</Button>
            <Button @click="ok"  type="primary">确定</Button>
        </div>
    </Modal>
</template>

<script>
import valid, {
    errors,
    api
} from "../../../libs/request";
export default {
    components: {

    },
    data() {
        return {
            modal:false,
            headers:{},
            bg:"",
            copyValue:'https://dss0.bdstatic.com9999',
            md: {
                left:69,
                top:230,
            }
        }
    },
    mounted() {
        this.headers = {
            token: localStorage.getItem('token'),
            tenant: localStorage.getItem('tenant')
        }
    },
    computed: {
        uploadImg: function() {
            return api.fileAttachmentUploadUrl();
        }
    },
    methods: {
        offset(target) {
            let top = 0
            let  left = 0
            while(target.offsetParent) {
                top += target.offsetTop
                left += target.offsetLeft
                target = target.offsetParent
            }
            return {
                top: top,
                left: left,
            }
        },
        move(e){
            e.target.style.cursor="move";
            //阻止默认事件的方法,如果不阻止默认事件onmouseup会无法触发
            e.preventDefault();
            let odiv = e.target;        //获取目标元素
            let Odiv = e.target.parentElement; // 获取父元素
            //目标元素和父元素 距离左上角的距离
            const OdivLeft = this.offset(Odiv).left;
            const OdivTop = this.offset(Odiv).top;
            const odivLeft = this.offset(odiv).left;
            const odivTop = this.offset(odiv).top;
            //目标元素和父元素 宽高
            const ow = odiv.offsetWidth
            const Ow = Odiv.offsetWidth
            const oh = odiv.offsetHeight
            const Oh = Odiv.offsetHeight
            //鼠标距离内部左上角的距离
            const disX = e.clientX - odivLeft;
            const disY = e.clientY - odivTop;
            document.onmousemove = (e)=>{
                let X = e.clientX;
                let Y = e.clientY;
                this.md.left = X - OdivLeft - disX;
                this.md.top = Y - OdivTop - disY;
                if(X - OdivLeft - disX <= 0){
                    this.md.left = 0
                }
                if(Y - OdivTop - disY <= 0){
                    this.md.top = 0
                }
                if(Y - OdivTop - disY >= Oh - oh){
                    this.md.top = Oh - oh
                }
                if(X - OdivLeft - disX >=  Ow - ow){
                    this.md.left = Ow - ow
                }
                //移动当前元素
                // odiv.style.left = this.md.left + 'px';
                // odiv.style.top = this.md.top  + 'px';
            };
            document.onmouseup = (e) => {
                e.target.style.cursor="default";
                document.onmousemove = null;
                document.onmouseup = null;
            };
        },
        detailBeforeUpload(file) {
            return this.checkImageWH(file);
        },
        checkImageWH(file) {
            let self = this;
            return new Promise(function (resolve, reject) {
                let filereader = new FileReader();
                filereader.onload = e => {
                    let src = e.target.result;
                    const image = new Image();
                    image.onload = function () {
                        if( self.GetPercent(this.width, this.height) <= 0.5625 && self.GetPercent(this.width, this.height) >= 0.56 ){
                            resolve();
                        }else{
                            self.$Notice.error({
                                title: "请上传图片的尺寸比例为9:16",
                            });
                            reject();
                        }
                    };
                    image.onerror = reject;
                    image.src = src;
                };
                filereader.readAsDataURL(file);
            })
        },

        GetPercent(num, total) {
            num = parseFloat(num);
            total = parseFloat(total);
            if (isNaN(num) || isNaN(total)) {
                return "-";
            }
            return total <= 0 ? "0%" : (Math.round(num / total * 100) / 100.00);
        },
        HandleSuccess(data) {
            console.log(data.data.url);
            this.bg = data.data.url
            this.$Message.success("上传成功");
        },
        handleFormatError(file) {
            this.$Notice.warning({
                title: "格式不正确",
                desc:
                    "文件格式为" +
                    file.name +
                    "不正确, 请选择.png 或者.jpg格式的图片"
            });
        },
        receiptInfos(data){
            // 从父组件接受数据
            this.modal = true;
            console.log(data)
        },
        ok(){

        },
        cancel(){
            this.modal = false;
        },
        upload(){
        },
        toOringe(){
            this.md = {
                left:69,
                top:230,
            }
        },
        copy(){
            let ref = this.$refs.aInput
            ref.select(); // 选择对象
            document.execCommand("Copy"); // 执行浏览器复制命令
            this.$Notice.success({
                title: '复制成功',
                desc: this.copyValue
            });
            // window.clipboardData.setData('text/plain', '版权所有，商用必究');

        },
    },
}
</script>
