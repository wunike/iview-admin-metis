<style lang="less">
	.dict_container {
		height: 100%;
		display: flex;
		.content {
			flex: 1;
			overflow-y: auto;
			background: #FFFFFF;
			padding: 0;
			margin: 0 10px;
			padding: 0 16px;
		}
		.headbar {
			padding-left: 10px;
			padding: 24px 10px 0px;
			line-height: 32px;
			font-size: 16px;
			font-weight: 500;
			color: rgba(73, 80, 96, 1);
			.ivu-icon-chevron-right {
				margin: 0 7px;
			}
			.t1 {
				display: inline-block;
			}
			.t2 {
				cursor: default;
			}
			.set {
				float: right;
				margin-right: 20px;
			}
		}
	}
</style>
<template>
	<div class="dict_container">
		<left-menu types="spoc-portal" @emptyLists="emptyLists" @upload="upload" @changTitle="changTitle" ref="leftmenu" class="dict-left-menu" @showAddBtn="showAddBtn"></left-menu>
		<div class="content">
			<div class="headbar">
				<div class="t1">当前应用模块：</div>
				<!--<Icon type="chevron-right"></Icon>-->
				<a class="t2" v-text="title"></a>
				<Button @click="addDect" type="primary" style="width:102px;height:32px;float: right;" v-show="dataLength">新增字典项</Button>
			</div>
			<dictable ref="dict" @uploadTree="uploadTree"></dictable>
		</div>
	</div>
</template>

<script>
	import { mapMutations, mapState } from 'vuex';
	import valid, {
		errors,
		sys
	} from '../../libs/request.js';
	import leftMenu from "../../modules/leftMenuDict";
	import dictable from "./dictable"

	let route = 'portal.dictmanage';

	export default {
		name: 'portal.dictmanage',
		data() {
			return {
				title: '全局',
				dataLength: 0,
			};
		},
		computed: {
			...mapState(['userInfo', 'appMenuList']),
			navList() {
				if(this.$route.params.titles) {
					return this.$route.params.titles;
				}
				return this.$route.matched.filter(res => res.meta.title).map(val => {
					if(Array.isArray(val.meta.title)) {
						return val.meta.title[this.$route.params.currentTitle];
					}
					return val.meta.title
				})
			},
		},
		components: {
			leftMenu,
			dictable,
		},
		created() {

		},
		methods: {
			emptyLists() {
				this.$refs.dict.emptyLists();
			},
			upload(item) {
				this.$refs.dict.needUpload(item);
			},
			uploadTree(callback, id) {
				this.$refs.leftmenu.getTree(callback, id);
			},
			changTitle(item) {
				this.$refs.dict.changTitle(item);
				this.title = item.name;
			},
			addDect() {
				this.$refs.dict.addDect();
			},
			showAddBtn(num) {
				this.dataLength = num;
			}
		}
	}
</script>
