<style lang="less">
@white: #fff;
@light-moss-green: #a4cb6d;
@greeny-blue: #44BCB7;
@warm-grey: #999;
@pinkish-grey: #ccc;
.record-card {
	border-radius: 4px;
	box-shadow: 0 0 4.9px 0.1px rgba(114, 115, 222, 0.19);
	background-color: @white;
	border: solid 1px #e7ebf1;
	margin: 20px 0 20px 0;
	padding: 10px;
	box-sizing: border-box;
    position: relative;
    &.current{
        border-color: rgba(64, 67, 250, 1);
    }
	div{
	    word-wrap: break-word;
	    word-break: break-all;
    }
    .type-label{
        @h: 36px;
        // position: absolute;
        // right: 16px;top: 0;
        height: @h;line-height: @h;
        color: @greeny-blue;
        font-size: 14px;
        i{
            position: relative;top: 1px;
            margin-left: 2px;
            color: #fbc271;
        }
    }
	&.item-review {
		border-color: #f33;
	}
	.editable {
		.ivu-btn {
			position: absolute;
			right: 10px;
			bottom: 10px;
		}
	}
	.title {
		// padding-bottom: 8px;
		// .uname {
		// 	float: left;
		// 	color: @light-moss-green;
		// 	font-size: 14px;
		// }
		// .utype {
		// 	// color: @greeny-blue;
		// 	font-size: 14px;
		// 	.iconfont {
		// 		color: #fbc271;
		// 	}
		// 	&.orange {
		// 		color: #fbc271;
		// 	}
		// }
	}
	.tg {
		font-weight: 600;
		& + .tg {
			margin-left: 10px;
		}
	}
	.b {
		font-weight: 600;
	}
	.foo-date {
		margin-top: 10px;
        color: @warm-grey;
        span{
            margin-left: 32px;
        }
	}
	.stat-change {
		text-align: center;
		.istat {
			border: solid 1px @warm-grey;
			padding: 5px 12px;
			display: inline-block;
			width: 90px;
			color: @warm-grey;
			font-weight: 600;
			&.active {
				border: solid 1px @greeny-blue;
				color: @greeny-blue;
			}
		}
		i {
			width: 40px;margin: 0 24px;
			font-size: 14px;
			color: @warm-grey;
		}
	}
	.img-lists {
		.img-item {
			width: 80px;
			height: 80px;
			background-color: #ddd;
			float: left;
			margin: 10px 10px 10px 0;
			.img {
				width: 100%;
				height: 100%;
			}
		}
	}
	.file-lists {
		position: relative;
		.f-title {
			position: absolute;
		}
		.f-list {
			padding-left: 40px;
			.it {
				cursor: pointer;
				color: @greeny-blue;
			}
		}
	}
	.can-play {
		.iconfont {
			margin-left: 4px;
			color: @greeny-blue;
			font-size: 14px;
			cursor: pointer;
			transition: color 0.3s ease;
			&:hover {
				color: #38a9a4;
			}
		}
	}
	.can-play-wechat {
		background: #44bcb7;
		width: 70px;
		height: 30px;
		border-radius: 5px;
        margin-right: 10px;
        float: left;
		cursor: pointer;
		&:hover {
			background: #38a9a4;
		}
		.player-icon {
			width: 12px;
			height: 15px;
			margin-top: 9px;
			margin-left: 15px;
		}
    }
    .voice-time{
        float: left;
        height: 30px;
        line-height: 30px;
    }

}
</style>
<template>
    <div class="record-card" :class="['item-'+data.type, data.className]">
        <div class="type-label">
            <span>{{data.typeLabel}}</span>
            <!-- <i class="iconfont" :class="icon"></i>
            <i class="iconfont icon-xiaoxituisong" v-if="!data.createByName"></i>
            <i class="iconfont icon-dianping" v-else-if="data.type == 'review'"></i>
            <i class="iconfont icon-tubiaokuozhan-" v-else-if="data.type == 'task doing' || data.type == 'task update' || data.type == 'task finish'"></i>
            <i class="iconfont icon-jilu11" v-else></i> -->
        </div>
        <div class="title clearfix" v-if="data.content && data.content.title">
            <p class="utype" :class="{orange:data.type=='review'}">{{$t('modules_spoc_crm_web_src_views_customer360_components_recordcard_848', [data.content.title])}}</p>
        </div>
        <!-- <template v-if="data.content && data.content.title">
            <div v-text="data.content.title"></div>
        </template> -->
        <!-- <template v-if="data.content.content">
            <div v-html="data.content.content.replace(/\r|\n/g,'<br/>')"></div>
        </template> -->
        <template v-if="data.content && data.content.txtArray && data.content.txtArray.length">
            <div v-for="(item,index) in data.content.txtArray" :key="'txt'+index">
                {{item}}
            </div>
        </template>
        <template v-if="data.content && data.content.oldValue && data.content.newValue">
            <div class="stat-change">
                <span class="istat">{{data.content.oldValue}}</span>
                <i class="iconfont icon-lujing3"></i>
                <span class="istat active">{{data.content.newValue}}</span>
            </div>
        </template>
        <template v-if="data.content && data.content.tags && data.content.tags.length">
            <div>
                <span class="tg" v-for="(tg,index) in data.content.tags" :key="'tg'+index" v-text="tg"></span>
            </div>
        </template>
       <!--  <template v-else-if="0">
            <div>
                <p>
                    <span class="b">{{$t('modules_spoc_crm_web_src_views_customer360_components_recordcard_849')}}</span> 
                    <a>{{$t('modules_spoc_crm_web_src_views_customer360_components_recordcard_850')}}</a>
                </p>
                <p>{{$t('modules_spoc_crm_web_src_views_customer360_components_recordcard_851')}}<span class="b">2018-07-22 15：30</span>
                    <i class="icon"></i>
                </p>
            </div>
        </template> -->
        <template v-if="(data.content && data.content.imgList && data.content.imgList.length) || (data.content && data.content.fileList && data.content.fileList.length)">
            <div>
                <div class="img-lists clearfix" v-if="data.content && data.content.imgList && data.content.imgList.length">
                    <div class="img-item" v-for="(item,index) in data.content.imgList" :key="'img'+index">
                        <img class="img" :src="item.url" alt="" @click="open(item.url)" >
                    </div>
                </div>
                <div class="file-lists" v-if="data.content && data.content.fileList && data.content.fileList.length">
                    <span class="f-title">{{$t('modules_spoc_crm_web_src_views_customer360_components_recordcard_852')}}</span>
                    <ul class="f-list">
                        <li class="it" v-for="(f,index) in data.content.fileList" :key="'f'+index" @click="openFile(f)">{{f.filename?f.filename:f.name}}</li>
                    </ul>
                </div>
            </div>
        </template>
        <template v-if="data.content && data.content.audioList && data.content.audioList.length">
            <div class="clearfix" v-for="item in data.content.audioList" :key="item.id">
                <div class="can-play-wechat" @click="playUrl(item.filePath)" >
                    <img class="player-icon" :src="voiceimg" alt="">
                </div>
                <span class="voice-time">{{item.remarks | format2}}</span>
            </div>
        </template>
        <template v-if="data.fullTime">
            <div class="can-play" >
                <span>{{$t('modules_spoc_crm_web_src_views_customer360_components_recordcard_853')}}</span>
                <span class="b">{{ data.fullTime | format}}</span>
                <!--<i class="iconfont icon-bofang" @click="playId(data.fileId,data.fullTime)" v-if="data.recordList.length>0"></i>-->
            </div>
        </template>
        <div class="foo-date">
            {{data.dateRemarks ? data.dateRemarks+ '：' : '' }}{{data.createDateStr}}
            <span v-if="data.createByName">{{$t('modules_spoc_crm_web_src_views_customer360_components_recordcard_854', [ data.createByName ])}}</span>
        </div>
        <div class="editable" v-if="editable && canedit">
            <Button type="primary" size="small" @click="doedit">{{$t('modules_spoc_crm_web_src_views_customer360_components_recordcard_855')}}</Button>
        </div>
		<Modal
            v-model="viewPhoto"
            title="查看图片"
            width="600"
        >
			<div style="width:100%;display:flex;justify-content:center;align-items:center">
				<img :src="imgSrc" style="max-width:500px;"/>
			</div>
			<div slot="footer">
                <Button @click="viewPhoto = false">关闭</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import { util } from "@public/libs/util";
import { mapMutations, mapState, mapGetters } from "vuex";
import { sys } from '../../../libs/request.js';

import voicePaused from "../../../assets/img/voice.png";
import voicePaying from "../../../assets/img/voice.gif";

export default {
	props: {
		data: {
			type: Object,
			required: true
		},
		editable: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			playing: false,
			audio: {},
			viewPhoto: false,
			imgSrc: '',
		};
	},
	computed: {
		...mapState(["userInfo"]),
		canedit() {
			return (
				["trace", "review", "callplan", "call"].includes(
					this.data.type
				) && this.data.createBy == this.userInfo.id
			); // 日常跟进
		},
		voiceimg() {
			if (this.playing) {
				return voicePaying;
			}
			return voicePaused;
		}
	},
	mounted() {
		this.audio = new Audio();
		this.audio.addEventListener(
			"playing",
			() => {
                this.playing = true;
                setTimeout(()=>{
                    console.info(this.voiceimg);
                },0);
			},
			false
        );
        this.audio.addEventListener(
			"ended",
			() => {
				this.playing = false;
			},
			false
        );
        this.audio.addEventListener(
			"error",
			() => {
				this.playing = false;
			},
			false
		);
	},
	methods: {
		playUrl(url, t) {
			console.log(this.audio.paused)
            if(this.audio.paused){
                this.audio.src = url;
                this.audio.crossOrigin = 'anonymous';
                this.audio.play();
            }
		},
		playId(id, t) {
			const url = `/spoc-crm/a/ws/sys/attachment/display?id=${id}`;
			this.$emit("play", url, t);
		},
		doedit() {
			this.$emit("edit", this.data);
		},
		open(href) {
			this.imgSrc = href
			this.viewPhoto = true
		},
		onupdate(v) {
			// console.info(v)
		},
		openFile(f){
			// if(f.url){
			// 	return this.open(f.url);
			// }
			// const url = sys.downloadPan(f.dir,f.name);
			window.open(f.url);
		}
	},
	filters: {
		format(t) {
			return util.durationFormat(t);
		},
		format2(t) {
			if (t > 60) {
				const m = Math.floor(t / 60);
				const s = t - 60 * m;
				return `${m}'${s}''`;
			}
			return `${t}''`;
		}
	}
};
</script>


