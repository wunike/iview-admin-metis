<style lang="less">
.viewGX{
    video{
        width:896px;
        height:504px;
    }
    .viewGanxiang{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color:rgba(0,0,0,0.6);
        z-index: 1000;
        .videoContent{
           /*  position: absolute;
            bottom: 0px;
            margin: 0 30%;
            width: 896px; */
            width: 896px;
            height: 690px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            .closeViewVideo{
                position: absolute;
                right: -40px;
                top: -4px;
                width: 26px;
                height: 32px;
                color: #FFF;
                cursor: pointer;
                font-size: 26px;
                &:hover{
                    color: #44BCB7;
                }
            }
            .video{
                background-color: #111;
                height: 504px;
                position: relative;
		.cpdf {
			background-color: rgba(0, 0, 0, .5);
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			.center {
				text-align: center;
				height: 100%;
				overflow: auto;
				padding-top: 20px;
				.contor {
					background-color: #fff;
					position: absolute;
					bottom: 0;
					left: 322px;
					margin-bottom: 10px;
					color: #000;
				}
			}
		}
            }
            .videos{
                // background-color:#fff;
                height: 100px;
                padding-top: 18px;
                overflow: hidden;
                .toLeft{
                    width: 40px;
                    height: 64px;
                    float: left;
                    cursor: pointer;
                    color:rgba(204,204,204,1);
                    padding-top: 22px;
                    padding-left: 12px;
                }
                .toRight{
                    padding-left: 14px;
                    padding-top: 22px;
                    cursor: pointer;
                    float: left;
                    width: 40px;
                    height: 64px;
                    color:rgba(204,204,204,1);
                }
                .fmwzs{
                    position: relative;
                    height: 100px;
                    width: 802px;
                    float: left;
                    overflow: hidden;
                }
                .fmwzChild{
                    position: relative;
                    left: 0;
                    white-space: nowrap;
                }
                .fmwz{
                    display: inline-block;
                    margin-right: 30px;
                    position: relative;
                    cursor: pointer;
                    border: 1px solid #ccc;
                    &:hover{
                        border: 1px solid #44BCB7;
                    }
                }
                .cur{
                    border: 1px solid #44BCB7;
                }
                .gxfm{
                    width: 110px;
                    height: 62px;
                    text-align: center;
                }
                .gxfmIcon{
                    position: absolute;
                    top: 20px;
                    left: 42px;
                    width: 25px;
                    height: 25px;
                    border-radius: 15px;
                }
                .gxwz{
                    width: 172px;
                    height: 28px;
                    background: rgba(255,255,255,1);
                    overflow: hidden;
                    padding: 4px 0px 4px 12px;
                }
            }
        }
    }
}
</style>
<template>
    <div class="viewGX">
        <div class="viewGanxiang" v-show="showViewGX">
            <div class="videoContent">
                <div class="video" style="text-align:center;">
                    <img style="max-width:896px; max-height:504px;position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);" v-show="curGxContent.toLocaleLowerCase().endsWith('jpg') || curGxContent.toLocaleLowerCase().endsWith('png') || curGxContent.toLocaleLowerCase().endsWith('jpeg')" :src="curGxContent"/>
                    <div style="width:896px;height:504px;" v-if="videoSource.length"></div>
                    <div class="cpdf" style="width:896px;height:504px;" v-show="curGxContent.toLocaleLowerCase().endsWith('pdf')">
                        <div class="center">
                            <canvas class="canvasstyle" id="the-canvas" style="width: 890px;"></canvas>
                            <div class="contor">
                                <Button @click="prev" style="margin-right:10px;">{{$t('modules_spoc_portal_modules_viewgx_3345')}}</Button>
                                <Button @click="next" style="margin-right:10px;">{{$t('modules_spoc_portal_modules_viewgx_3346')}}</Button>    
                                <span  style="margin-right:10px;">{{$t('modules_spoc_portal_modules_viewgx_3347')}}<span v-text="page_num"></span> / <span v-text="page_count"></span></span>
                                    
                                <Button @click="addscale" icon="plus"  style="margin-right:10px;"></Button>
                                <Button @click="minus" icon="minus"></Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="videos">
                    <div class="toLeft" @click="toLeft" v-show="myStuTalks.length > 6">
                        <i class="iconfont icon-zuo"></i>
                    </div>
                    <div class="toLeft" style="cursor:auto;" v-show="myStuTalks.length <= 6">
                    </div>
                    <div class="fmwzs">
                        <div class="fmwzChild" :style="{left:  leftpx + 'px'}">
                            <div class="fmwz" :class="index == curIndex ? 'cur': ''" v-for="(item, index) in myStuTalks" :key="index" @click="showCurGx(item, index)">
                                <div class="gxfm" v-if="item.fileName.toLocaleLowerCase().endsWith('jpg') || item.fileName.toLocaleLowerCase().endsWith('png') || item.fileName.toLocaleLowerCase().endsWith('jpeg')" :style="'background:url('+dot+item.url+dot+') center center;background-size:cover;'">
                                </div> 
                                <div class="gxfmIcon gxfmVideo" v-show="item.fileName.toLocaleLowerCase().endsWith('mp4')">
                                </div>
                                <div class="gxfmIcon gxfmAudio" v-show="item.fileName.toLocaleLowerCase().endsWith('mp3')">
                                </div>
                                <div class="gxfmIcon gxfmPdf" v-show="item.fileName.toLocaleLowerCase().endsWith('pdf')">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="toRight" @click="toRight" v-show="myStuTalks.length>  6">
                        <i class="iconfont icon-you"></i>
                    </div>
                    <div class="toRight" style="cursor:auto;" v-show="myStuTalks.length <= 6">
                    </div>
                </div>
                <div class="closeViewVideo" @click="closeViewVideo"><i class="iconfont icon-lujingfuzhi"></i></div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name:'viewGX',
    props: {
        myStuTalks:{
            required:true
        },
    },
    computed:{
        ctx() {
            let id = document.getElementById('the-canvas')
            return id.getContext('2d');
        }
    },
    data () {
        return {
            videoSource:[],
            options: {
                autoplay: true,
                volume: 0.6,
                poster: 'http://covteam.u.qiniudn.com/poster.png'
            },
            curIndex: 0,
            curGxContent: '',
            pdfurl:'',
            pdfDoc: null, //pdfjs 生成的对象
            pageNum: 1,//
            pageRendering: false,
            pageNumPending: null,
            scale: 1.2,//放大倍数
            page_num: 0,//当前页数
            page_count: 0,//总页数
            maxscale: 2,//最大放大倍数
            minscale: 0.8,//最小放大倍数
			dot:'"',
            leftpx: 0,
            showViewGX: false,
        }
    },
    methods:{
        renderPage(num) { //渲染pdf
            let vm = this
            this.pageRendering = true;
            let canvas = document.getElementById('the-canvas')
            // Using promise to fetch the page
            this.pdfDoc.getPage(num).then(function(page) {
                var viewport = page.getViewport(vm.scale);
                //alert(vm.canvas.height)
                canvas.height = viewport.height;
                canvas.width = viewport.width;
            
                // Render PDF page into canvas context
                var renderContext = {
                    canvasContext: vm.ctx,
                    viewport: viewport
                };
                var renderTask = page.render(renderContext);
            
                // Wait for rendering to finish
                renderTask.promise.then(function() {
                    vm.pageRendering = false;
                    if(vm.pageNumPending !== null) {
                    // New page rendering is pending
                    vm.renderPage(vm.pageNumPending);
                    vm.pageNumPending = null;
                    }
                });
            });
            vm.page_num = vm.pageNum;
        },
        addscale() {//放大
            if(this.scale >= this.maxscale) {
                return
            }
            this.scale += 0.1;
            this.queueRenderPage(this.pageNum)
            },
        minus() {//缩小
            if(this.scale <= this.minscale) {
                return
            }
            this.scale -= 0.1;
            this.queueRenderPage(this.pageNum)
        },
        prev() {//上一页
            if(this.pageNum <= 1) {
            return;
            }
            this.pageNum--;
            this.queueRenderPage(this.pageNum);
        },
        next() {//下一页
            if(this.pageNum >= this.page_count) {
                return;
            }
            this.pageNum++;
            this.queueRenderPage(this.pageNum);
        },
        closepdf() {//关闭PDF
            this.$emit('closepdf')
        },
        queueRenderPage(num) {
            if(this.pageRendering) {
                this.pageNumPending = num;
            } else {
                this.renderPage(num);
            }
        },
        pdf(){
            let vm= this
            PDFJS.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.min');
            PDFJS.getDocument(vm.pdfurl).then(function(pdfDoc_) { //初始化pdf
                vm.pdfDoc = pdfDoc_;
                vm.page_count = vm.pdfDoc.numPages
                vm.renderPage(vm.pageNum);
            });
        },

        closeViewVideo(){
            this.showViewGX = false
            this.leftpx = 0
            this.curIndex = 0
            this.videoSource =  []
        },
        toLeft(){
            if(this.leftpx == 0){
                return 
            }
            this.leftpx = this.leftpx + 142
        },
        toRight(){
            if(this.leftpx == (this.myStuTalks.length - 5) * - 142){
                return
            }
            this.leftpx = this.leftpx - 142
        },
        showCurGx(item,curIndex){
            this.curGxContent = item.url
            if(item.url.toLocaleLowerCase().endsWith('mp4')){
                this.videoSource =  [{
                    src:  this.curGxContent,
                    type: 'video/mp4'
                }]
                
            } else {
                this.videoSource =  []
            }
            if(item.url.toLocaleLowerCase().endsWith('pdf')){
                this.pdfurl = item.url
                console.log(this.pdfurl)
                this.pdf()
            }

            this.curIndex = curIndex

        },
    },
    watch:{
        myStuTalks(val){
            this.curGxContent = val[0].url
            this.showCurGx(val[0], 0)
        }
    }
}
</script>
