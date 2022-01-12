<style lang="less">
.detail-announcement-container{
    .title{
        padding-top: 4px;
        line-height: 46px;font-size: 22px;text-align: center;
    }
    .author{
        text-align: center;
        margin-bottom: 20px;
        ul{
            display: inline-block;
        }
        li{
            @h: 20px;
            float: left;color: #999;margin: 0 10px;
            line-height: @h;
            i{
                float: left;margin-right: 8px;
            }
        }
    }
    .conten{
        padding: 0 36px 20px;
    }
    .fieldJsonData{
        padding: 0 36px 0 72px;
        .item{
            @h: 28px;
            position: relative;
            min-height: @h;line-height: @h;
            padding-left: 22px;
            i{
                position: absolute;left: 0;top: 0;
                font-size: 14px;color: #999;
            }
        }
    }
}
</style>
    
<template>
<div>
<Modal
    v-model="modal"
    :title="$t('modules_spoc_core_web_src_views_announcement_detail_84')"
    className="detail-announcement-container"
    width="600">
    <div slot="footer">
        <Button type="primary" @click="close">{{$t('modules_spoc_core_web_src_views_announcement_detail_85')}}</Button>
    </div>
    <div class="title">{{detailData.title}}</div>
    <div class="author">
        <ul>
            <li>
                <i class="iconfont icon-renxiang"></i>
                <span>{{detailData.createByName}}</span>
            </li>
            <li>
                <i class="iconfont icon-shijian1"></i>
                <span>{{detailData.createDate}}</span>
            </li>
        </ul>
    </div>
    <div class="conten" v-html="detailData.content"></div>
    <div class="fieldJsonData" v-if="$route.name != 'core.lesseeAnnouncement' && detailData.file && detailData.file.length">
        <div class="item" v-for="(item, index) in detailData.file" :key="index" @click="handleView1(item.filePath)">
            <i class="iconfont icon-wenjian"></i>
            <a>{{item.fileName}}</a>
        </div>
    </div>
</Modal>
<Modal
    :title="$t('modules_spoc_core_web_src_views_announcement_detail_86')"
    v-model="visible1"
    width="25%"
    class-name="vertical-center-modal">
    <img :src="imgSrc"
        width="100%"
        style="object-fit: cover;"
    />
    <div slot="footer">
        <Button type="primary" @click="closeVisible">{{$t('modules_spoc_core_web_src_views_announcement_detail_85')}}</Button>
    </div>
</Modal>
</div>
</template>

<script>
/**
 ** @author: 曹见芳
 ** 弹窗 - 公共详情
 */
import valid, { errors, common } from '../../libs/request.js';
export default {
    name: 'detail',
    data(){
        return {
            modal: false,
            id: '',
            detailData: {},
            imgSrc: '',
            visible1: false
        };
    },
    mounted() {
		this.lang = this.$i18n.locale == "en-US" ? 1 : 0;
		console.log(this.lang);
	},
    methods: {
        getForm() {
            let params = {
                id: this.id
            };
            common.comAnnouncementForm(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    let _data = res.data.data;
                    if(_data.jaondata) {
                        let _arr = _data.jaondata.split(',');

                        let _new = [];
                        _arr.forEach(item => {
                            _new.push({
                                fileName: item.split('/').pop(),
                                filePath: item
                            });
                        });
                        _data.file = _new;
                    }
                    this.detailData = _data;
                    // console.log(this.detailData)
                }
            })
            .catch(errors.call(this))
        },
        show(id) {
            this.id = id;
            this.getForm();
            this.modal = true;
        },
        close() {
            this.modal = false;
            this.$emit('close');
        },
        handleView1(imgSrc) {
            // console.log(imgSrc)
			if (imgSrc.endsWith(".jpg") || imgSrc.endsWith(".png") || imgSrc.endsWith(".jpeg") || imgSrc.endsWith(".gif")) {
				this.imgSrc = imgSrc;
				this.visible1 = true;
			} else if (imgSrc.endsWith(".pdf")) {
				window.open(imgSrc);
			} else {
				let id = document.getElementById("iframeId");
				if (id) {
					id.parentNode.removeChild(id);
				}
				let iframe = document.createElement("iframe");
				iframe.src = imgSrc;
				iframe.id = "iframeId";
				document.body.appendChild(iframe);
			}
        },
        closeVisible() {
            this.visible1 = false;
        },
    },
}
</script>


