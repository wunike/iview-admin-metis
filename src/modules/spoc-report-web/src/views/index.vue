<style lang="less">
.report_container {
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
        border-left: 1px solid #dcdee2;
        .ivu-table {
            th {
                /*background-color: #fff;*/
            }
            &:after {
                // display: none;
            }
        }
    }
}
// 下拉组件
.treeSelectCos{
    line-height: normal;
    position: relative;
    // left: -50px;
    // top: 1px;
    @mainColor: #44bcb7;
    .vue-treeselect__placeholder, .vue-treeselect__single-value{
        line-height: 32px;
    }
    .vue-treeselect__placeholder{
        color: #c5c8ce;
    }
    .vue-treeselect:not(.vue-treeselect--disabled):not(.vue-treeselect--focused) .vue-treeselect__control:hover{
        border-color: rgba(60, 166, 161, 0.91);
    }
    .vue-treeselect__multi-value-item, .vue-treeselect__value-remove{
        color: @mainColor;
    }
    .vue-treeselect__checkbox--indeterminate{
        border-color: @mainColor;background-color: @mainColor;
    }
    .vue-treeselect__label-container:hover {
        .vue-treeselect__checkbox--unchecked{
            border-color: @mainColor;
        }
        .vue-treeselect__checkbox--indeterminate, .vue-treeselect__checkbox--checked {
            border-color: @mainColor;background-color: @mainColor;
        }
    }
    .vue-treeselect--focused:not(.vue-treeselect--open) .vue-treeselect__control{
        border-color: @mainColor;
    }
    .vue-treeselect__control{
        height: 32px;
        display: inline-table;
        line-height: normal;
    }
    .vue-treeselect__checkbox--checked {
        border-color: @mainColor;background-color: @mainColor;
    }
    .vue-treeselect__option--highlight{
        border-color: @mainColor;
    }
    .vue-treeselect{
        display: inline-block;height: 32px;
        margin-bottom: 12px;
        vertical-align: middle;
    }
    .vue-treeselect--has-value .vue-treeselect__multi-value{
        margin-bottom: 0;
    }
    .vue-treeselect__multi-value-item-container, .vue-treeselect__limit-tip{
        padding-top: 2px;
    }
}
</style>
<template>
	<div class="report_container">
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
	import valid, {
		errors,
		sysMenu
	} from "../libs/request.js";

	const defnav = "report.organization";
	let regist = false;

	let hasPermissions = (g, r) => {
		if(r && g) {
			return arrInclude(g, r.split(","));
		}
		return false;
	};

	export default {
    	name: "report.index",
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
				return this.$store.state.app.tagNavList
			},
			cacheList() {
				const list = [...this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []]
				return list;
			},
		},
		created() {
			this.loadMenuRights();
			if(!regist) {
				this.registerModule();
				regist = true;
			}
			this.pId = MENUIDS.REPORT;
			this.$store.dispatch("report/getMenuData");
			this.$store.commit("updatePid", {
				pid: this.pId
			});
		},
		methods: {
			needUpdate(type, payload) {
				if(this.$refs[type]) {
					this.$refs[type].update(payload);
				}
			},
			loadMenuRights() {
				sysMenu
					.findMenu()
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							this.$store.commit("report/updateRights", {
								rights: res.data.data
							});
						}
					})
					.catch(errors.call(this));
			},
			registerModule() {
				let _this = this;
				this.$store.registerModule("report", {
					namespaced: true,
					state: {
						rights: {},
						menus: []
					},
					getters: {
						org_edit(state, getters, rootState) {
							if(rootState.userInfo.admin) {
								return true;
							}
							let r = getKValue(
								state.rights,
								"report.organization",
								"report.organization",
								"edit"
							);
							return hasPermissions(
								rootState.userInfo.permissions,
								r
							);
						},
						job_edit(state, getters, rootState) {
							if(rootState.userInfo.admin) {
								return true;
							}
							let r = getKValue(
								state.rights,
								"report.organization",
								"report.job",
								"edit"
							);
							return hasPermissions(
								rootState.userInfo.permissions,
								r
							);
						},
						grade_edit(state, getters, rootState) {
							if(rootState.userInfo.admin) {
								return true;
							}
							let r = getKValue(
								state.rights,
								"report.organization",
								"report.grade",
								"edit"
							);
							return hasPermissions(
								rootState.userInfo.permissions,
								r
							);
						},
						resource_edit(state, getters, rootState) {
							if(rootState.userInfo.admin) {
								return true;
							}
							let r = getKValue(
								state.rights,
								"report.organization",
								"report.resource",
								"edit"
							);
							return(
								rootState.userInfo.permissions &&
								rootState.userInfo.permissions.indexOf(r) > -1
							);
						},
						role_edit(state, getters, rootState) {
							if(rootState.userInfo.admin) {
								return true;
							}
							let r = getKValue(
								state.rights,
								"report.organization",
								"report.role",
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
						updateMenu(state, {
							menu
						}) {
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
									this.commit("report/updateMenu", {
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
