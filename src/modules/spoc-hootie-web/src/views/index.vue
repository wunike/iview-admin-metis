<style lang="less">
.hootie_container {
	display: flex;
	height: 100%;
	.mainBody {
		flex: 1;
		overflow-y: auto;
		padding: 10px;
	} // 重写本模块iview部分样式
	.ivu-table-wrapper {
		/*margin-top: 5px;*/
		border: none;
		.ivu-table {
			th {
				/*background-color: #fff;*/
			}
			&:after {
				display: none;
			}
		}
	}
}
</style>
<template>
	<div class="hootie_container">
		<div class="mainBody" id="mainBody">
			<keep-alive :include="cacheList">
				<router-view @update="needUpdate"></router-view>
			</keep-alive>
		</div>
	</div>
</template>
<script>
import { MENUIDS } from "@public/libs/config";
import slideToggle from "_c/common/slideToggle";
import { getKValue, arrInclude } from "../libs/util.js";
import { mapState } from "vuex";
import valid, { errors, sysMenu } from "../libs/request.js";

const defnav = "hootie.organization";
let regist = false;

let hasPermissions = (g, r) => {
	if (r && g) {
		return arrInclude(g, r.split(","));
	}
	return false;
};

export default {
	name: "hootie.index",
	data() {
		return {
			pId: null
		};
	},
	components: {
		slideToggle
	},
	computed: {
		...mapState(["userInfo", "appMenuList"]),
		tagNavList() {
			return this.$store.state.app.tagNavList;
		},
		cacheList() {
			const list = [
				...(this.tagNavList.length
					? this.tagNavList
							.filter(item => !(item.meta && item.meta.notCache))
							.map(item => item.name)
					: [])
			];
			return list;
		}
	},
	created() {
		this.loadMenuRights();
		if (!regist) {
			this.registerModule();
			regist = true;
		}
		this.pId = MENUIDS.HOOTIE;
		this.$store.dispatch("hootie/getMenuData");
		this.$store.commit("updatePid", {
			pid: this.pId
		});
	},
	methods: {
		needUpdate(type, payload) {
			if (this.$refs[type]) {
				this.$refs[type].update(payload);
			}
		},
		loadMenuRights() {
			sysMenu
				.findMenu()
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.$store.commit("hootie/updateRights", {
							rights: res.data.data
						});
					}
				})
				.catch(errors.call(this));
		},
		registerModule() {
			let _this = this;
			this.$store.registerModule("hootie", {
				namespaced: true,
				state: {
					rights: {},
					menus: []
				},
				getters: {
					org_edit(state, getters, rootState) {
						if (rootState.userInfo.admin) {
							return true;
						}
						let r = getKValue(
							state.rights,
							"hootie.organization",
							"hootie.organization",
							"edit"
						);
						return hasPermissions(
							rootState.userInfo.permissions,
							r
						);
					},
					job_edit(state, getters, rootState) {
						if (rootState.userInfo.admin) {
							return true;
						}
						let r = getKValue(
							state.rights,
							"hootie.organization",
							"hootie.job",
							"edit"
						);
						return hasPermissions(
							rootState.userInfo.permissions,
							r
						);
					},
					grade_edit(state, getters, rootState) {
						if (rootState.userInfo.admin) {
							return true;
						}
						let r = getKValue(
							state.rights,
							"hootie.organization",
							"hootie.grade",
							"edit"
						);
						return hasPermissions(
							rootState.userInfo.permissions,
							r
						);
					},
					resource_edit(state, getters, rootState) {
						if (rootState.userInfo.admin) {
							return true;
						}
						let r = getKValue(
							state.rights,
							"hootie.organization",
							"hootie.resource",
							"edit"
						);
						return (
							rootState.userInfo.permissions &&
							rootState.userInfo.permissions.indexOf(r) > -1
						);
					},
					role_edit(state, getters, rootState) {
						if (rootState.userInfo.admin) {
							return true;
						}
						let r = getKValue(
							state.rights,
							"hootie.organization",
							"hootie.role",
							"edit"
						);
						return hasPermissions(
							rootState.userInfo.permissions,
							r
						);
					}
				},
				mutations: {
					updateRights(state, payload) {
						state.rights = payload.rights;
					},
					updateMenu(state, { menu }) {
						state.menus = menu;
					}
				},
				actions: {
					getMenuData() {
						const params = {
							id: _this.pId
						};
						sysMenu
							.listGrantMenu(params)
							.then(valid.call(_this))
							.then(res => {
								this.commit("hootie/updateMenu", {
									menu: res.data.data
								});
								_this.ready = true;
							})
							.catch(errors.call(_this));
					}
				}
			});
		}
	}
};
</script>