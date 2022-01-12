<style lang="less">
	.side-menu-wrapper {
		position: relative;
		.funcBox {
			width: 100%;
			height: 34px;
			min-height: 34px;
			background: rgba(0, 13, 26, 1);
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 12px;
			color: #73818F;
			// box-shadow: 2px 0px 6px 0px rgba(0, 21, 41, 0.35);
			padding: 0 24px;
			overflow: hidden;
		}
	}

	.menuDrawer {
		&.ivu-drawer-wrap{
			position: absolute;
		}
		.ivu-drawer {
			position: absolute;
			top: 64px;
			height: ~"calc(100% - 64px)";
			.ivu-drawer-content {
				background: rgba(47, 66, 72, 1);
				box-shadow: 0px 2px 15px 0px rgba(0, 0, 0, 0.3);
				.ivu-drawer-header {
					display: none;
					.ivu-drawer-header-inner{
						display: none;
					}
				}
				.ivu-drawer-body {
					padding: 42px 16px 0;
					height: 100%;
				}
			}
			.drawer_content {
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				align-items: flex-start;
				flex-wrap: wrap;
				.drawer_wrap{
					width: 100%;
					padding-bottom: 14px;
					margin-bottom: 7px;
					border-bottom:2px rgba(211,211,211,1) dotted;
					.drawer_content_tit{
						font-size:14px;
						font-weight:500;
						color:rgba(153,153,153,1);
						display: flex;
						justify-content: flex-start;
						align-items: center;
						flex-wrap: nowrap;
						line-height: 14px;
						padding: 10px 0px 10px;
					}
					&:last-of-type{
						border: none;
					}
					.drawer_content_childrens{
						display: flex;
						justify-content: flex-start;
						align-items: flex-start;
						flex-wrap: wrap;
					}
				}
				span {
					min-width: 50%;
					text-align: left;
					display: inline-block;
					a {
						display: inline-block;
						flex: 1;
						color: #495060;
						font-size: 14px;
						font-weight: 500;
						color: #bbc0c6;
						line-height: 2em;
						padding-left: 21px;
						&:hover {
							color: #FFFFFF;
						}
					}
				}
			}
		}
	}
</style>
<template>
	<div class="side-menu-wrapper">
		<slot></slot>
		<div class="funcBox">
			<div v-show="!collapsed" style="overflow: hidden; height: 18px;"><!-- 功能模块 --></div>
			<sider-trigger :collapsed="collapsed" icon="md-menu" :size="20" @on-change="handleCollpasedChange"></sider-trigger>
		</div>
		<Menu ref="menu" v-show="!collapsed" :active-name="activeName" :open-names="openedNames" :accordion="accordion" :theme="theme" width="100%" @on-select="handleSelect" style="flex: 1;overflow-x: visible;">
			<template v-for="(item,index) in menuList">
				<template>
					<side-menu-item  :key="`menu-${index}`" :parent-item="item" @openDrawer="openDrawer" :class="{selected:drawerTit==item.meta.title }" v-if="item.meta.isShow==1"></side-menu-item>
					<!--<menu-item v-else :name="getNameOrHref(item, true)" :key="`menu-${index}-${item.children[0].name}`">-->
						<!--<common-icon :type="item.children[0].icon || ''" /><span>{{ item.children[0].meta.title }}</span></menu-item>-->
				</template>
				<!--<template v-else>
					<side-menu-item :key="`side-menu-item-${item.name}-${index}`" :parent-item="item" @openDrawer="openDrawer" :class="{selected:drawerTit==item.meta.title }"></side-menu-item>
					<menu-item v-else :name="getNameOrHref(item)" :key="`menu-item-${item.name}-${index}`">
						<common-icon :type="item.icon || ''" /><span>{{ item.meta.title }}</span></menu-item>
				</template>-->
			</template>
		</Menu>
		<div class="menu-collapsed" v-show="collapsed" :list="menuList">
			<template v-for="(item,ind) in menuList">
				<collapsed-menu @on-click="handleSelect" hide-title :root-icon-size="rootIconSize" :icon-size="iconSize" :theme="theme" :parent-item="item" :key="`drop-menu-${ind}-${item.name}`" @openDrawer="openDrawer" :class="{selected:drawerTit==item.meta.title }" v-if="item.meta.isShow==1"></collapsed-menu>
				<!--<Tooltip transfer v-else :content="item.children && item.children[0] ? item.children[0].meta.title : item.meta.title" placement="right" :key="`drop-menu-${ind}-${item.name}`">
					<a @click="handleSelect(getNameOrHref(item, true))" class="drop-menu-a" :style="{textAlign: 'center'}">
						<common-icon :size="rootIconSize" :color="textColor" :type="item.icon || (item.children && item.children[0].icon) || ''" />
					</a>
				</Tooltip>-->
			</template>
		</div>
		<Drawer :title="drawerTit" :mask-style="{background:'transparent'}" :closable="false" v-model="drawerShow" width="260" scrollable placement="left" class-name="menuDrawer" class="drawerBox" @on-visible-change="changeDraw">
			<div class="drawer_content">
				<div v-for="(item,index) in drawerLis" class="drawer_wrap" :key="`drawerLis_${index}`" v-if="item.meta.title&&item.meta.isShow==1">
						<div class="drawer_content_tit">
      						<CommonIcon type="_shuxingliebiaoxiangqing" :size="12" :style="{'margin-right':'8px'}"/>
							{{$i18n.locale == 'zh-CN' ? item.meta.title : item.meta.enTitle}}
						</div>
						<div class="drawer_content_childrens">
							<span v-for="(val,ind) in item.children" :id="val.meta.title" :key="`drawerList_${ind}`" v-if="val.meta.title&&val.meta.isShow==1">
								<a href="javascript:void(0)" @click="jump(val)">
									{{$i18n.locale == 'zh-CN' ? val.meta.title : val.meta.enTitle}}
								</a>
							</span>
						</div>
				</div>
			</div>
		</Drawer>
	</div>
</template>
<script>
import CommonIcon from '_c/common-icon';
	import siderTrigger from './sider-trigger'
	import SideMenuItem from './side-menu-item.vue'
	import CollapsedMenu from './collapsed-menu.vue'
	import { getUnion } from '@/libs/tools'
	import mixin from './mixin'

	export default {
		name: 'SideMenu',
		mixins: [mixin],
		components: {
			SideMenuItem,
			CollapsedMenu,
			siderTrigger,
			CommonIcon
		},
		props: {
			menuList: {
				type: Array,
				default() {
					return []
				}
			},
			collapsed: {
				type: Boolean
			},
			theme: {
				type: String,
				default: 'dark'
			},
			rootIconSize: {
				type: Number,
				default: 20
			},
			iconSize: {
				type: Number,
				default: 16
			},
			accordion: Boolean,
			activeName: {
				type: String,
				default: ''
			},
			openNames: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				openedNames: [],
				drawerShow: false,
				drawerLis: [],
				drawerTit: '',
			}
		},
		created() {},
        mounted() {
            
        },
		methods: {
			handleCollpasedChange(state) {
				this.$emit('on-coll-change', state)
				this.drawerShow = false;
			},
			handleSelect(name) {
				this.$emit('on-select', name)
			},
			getOpenedNamesByActiveName(name) {
				return this.$route.matched.map(item => item.name).filter(item => item !== name)
			},
			updateOpenName(name) {
				if(name === this.$config.homeName) this.openedNames = []
				else this.openedNames = this.getOpenedNamesByActiveName(name)
			},
			openDrawer(arr, val) {
				this.drawerTit = val;
				this.drawerLis = arr;
				let dom = document.querySelector(".left-sider");
				let drawers = document.querySelector(".drawerBox");
				for(let i = 0; i < drawers.children.length; i++) {
					drawers.children[i].style.left = dom.style.width;
				}
				this.drawerShow = true;
			},
			jump(item) {
				this.$router.push({
					name: item.name
				})
				this.drawerShow=false;
			},
			changeDraw(val) {
				if(!val) {
					this.drawerTit = "";
				}
			}
		},
		computed: {
			textColor() {
				return this.theme === 'dark' ? '#fff' : '#495060'
			}
		},
		watch: {
			activeName(name) {
				if(this.accordion) this.openedNames = this.getOpenedNamesByActiveName(name)
				else this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(name))
			},
			openNames(newNames) {
				this.openedNames = newNames
			},
			openedNames() {
				this.$nextTick(() => {
					this.$refs.menu.updateOpened()
				})
			}
		},
		mounted() {
			this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(name))
		}
	}
</script>
<style lang="less">
	@import './side-menu.less';
</style>
