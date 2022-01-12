<style lang="less">
	.role-permission-container {
		.clear() {
			zoom: 1;
			&::before,
			&::after {
				content: "";
				display: block;
				clear: both;
				height: 0;
				line-height: 0;
				font-size: 0;
			}
		}
		.top {
			@left: 56px+8px;
			@right: 88px+26px;
			@h: 32px;
			position: relative;
			height: @h;
			padding-left: @left;
			padding-right: @right;
			margin-bottom: 12px;
			h3 {
				position: absolute;
				left: 0;
				top: 0;
				height: @h;
				line-height: @h;
				color: #495060;
				font-size: 14px;
				font-weight: initial;
			}
			.ivu-btn {
				position: absolute;
				right: 0;
				top: 0;
			}
		}
		.user-list-container,
		.role-list-container {
			padding: 10px;
			background: #fff;
		}
		.ivu-table-cell {
			@p: 10px;
			padding-left: @p;
			padding-right: @p;
		}
		.bottom {
			.ivu-table-wrapper {
				border: none;
			}
			.ivu-table {
				&::before,
				&::after {
					background-color: transparent;
				}
			}
		}
	}
</style>

<template>
	<div class="role-permission-container">
		<Row :gutter="10">
			<Col :span="noNember?24:8">
			<role-list-temp ref="roleLists" :tabelHeight="tabelHeight" @changeRoleTable="changeRoleTable">
			</role-list-temp>
			</Col>
			<Col span="16" v-if="!noNember">
			<user-list-temp ref="userLists" @refreshRoleList="refreshRoleList" :tabelHeight="tabelHeight">
			</user-list-temp>
			</Col>
		</Row>
	</div>
</template>

<script>
	import roleListTemp from './component/roleList';
	import userListTemp from './component/userList';

	export default {
		name: 'portal.rolePermission',
		props: {
            noNember:{
                type:Boolean,
                default:false
            }
		},
		data() {
			return {
				tabelHeight: 500,
			};
		},
		components: {
			roleListTemp,
			userListTemp
		},
		mounted() {
			// console.log(this.tabelHeight)
			this.initTableHeight();
			window.onresize = () => {
				this.initTableHeight();
			}
        },
        destroyed(){
            window.onresize = null;
        },
		methods: {
			initTableHeight() {
                if(this.noNember){
                    this.tabelHeight = document.querySelector('.cistern-center').clientHeight-32-12-16*2;
                    console.log(document.querySelector('.cistern-center').clientHeight);
                }else{
                    this.tabelHeight = document.body.offsetHeight - 44 - 32 - 64 - 38 - 18 * 2;
                }
				// console.log(document.body.offsetHeight)
			},
			changeRoleTable(roleId, officeId) {
				// 选择角色列表
				// console.log(roleId)
				// console.log(officeId)
                if(!this.noNember){
                    this.$refs.userLists.initId(roleId, officeId);
                }
			},
			refreshRoleList() {
				// 刷新角色列表
				this.$refs.roleLists.getLists();
                // this.$refs.userLists.getLists();
            }
		},
	}
</script>
