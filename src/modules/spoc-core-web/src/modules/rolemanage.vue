<style lang="less">
	@green: #2d8cf0;
	.role-manage-tab {
		height: ~"calc(100vh - 90px)";
		overflow: auto;
		.role-namelist {
			border-radius: 10px;
			box-shadow: 0 0 8.8px 0.2px rgba(3, 0, 0, 0.1);
			border: solid 1px #e0e0e0;
			margin: 20px 0;
			padding: 20px;
			.role-item-box,
			.add-role-box {
				margin: 10px 15px;
			}
			.add-role-box {
				border-radius: 3px;
				border: 1px solid #e6e6e6;
				width: 190px;
				height: 46px;
				line-height: 46px;
				box-sizing: border-box;
				padding: 0 5px;
				position: relative;
				font-size: 14px;
				cursor: pointer;
				float: left;
				&:hover {
					border-color: @green;
				}
				.border-r {
					margin: 0 8px 0 10px;
					width: 24px;
					height: 24px;
					box-sizing: border-box;
					border-radius: 4px;
					line-height: 1.5;
					text-align: center;
					border: 1px dashed #2d8cf0;
					color: #2d8cf0;
					display: inline-block;
				}
			}
		}
		.listMsg {
			.btnlist {
				border: 1px solid #e0e0e0;
				background: #fafafa;
				height: 40px;
				line-height: 40px;
				border-radius: 2px;
				position: relative;
				text-indent: 20px;
				.lineSide {
					position: absolute;
					left: -1px;
					top: -1px;
					height: 40px;
					width: 5px;
					/*background: #2d8cf0;*/
					border-radius: 2px 0 0 2px;
				}
			}
		}
		.page {
			text-align: center;
			margin-top: 20px;
		}
	}
	
	.TQuserInfo {
		ul,
		li {
			list-style: none;
			margin: 0;
			padding: 0;
		}
		li>span {
			display: inline-block;
			width: 60px;
			text-align: right;
			line-height: 30px;
			margin-right: 10px;
		}
	}
</style>

<template>
	<div class="role-manage-tab">
		<div class="search">
			<Input icon="search" :placeholder="$t('modules_rolemanage_149')" style="width: 396px" @on-click="onSearch" @on-enter="onSearch" v-model="search.text"></Input>
		</div>
		<div class="role-namelist clearfix">
			<role-card v-for="item in roleNameList" :class="{active:item.id==state.clicked.id}" :key="item.id" :item="item" :disabled="isRoleDisable" @click.native="cardClick(item)" @ondel="cardDel" @onSync="onSync" @onupdate="cardUpdate" @ongive="giveRight" @onpeople="peopleChoose" :edit="edit"></role-card>
			<div class="add-role-box" @click="addRole" v-if="edit">
				<span class="border-r">+</span>
				<span>{{$t('modules_rolemanage_150')}}</span>
			</div>
		</div>
		<div>
			<div class="listMsg">
				<div class="btnlist">
					<div class="lineSide"></div>
					<span>{{$t('modules_rolemanage_151', [appmenu.name])}}</span>
				</div>
			</div>
			<Table :columns="userList" :data="roleUserList.list"></Table>
			<div class="page">
				<Page show-elevator show-total show-sizer :current="roleUserList.pageNo" :total="roleUserList.count" :page-size="pageConfig.pageSize" @on-page-size-change="onPageSizeChange" @on-change="onPageChange"></Page>
			</div>
		</div>

		<Modal v-if="edit" v-model="addRoleItem.show" :title="addRoleItem.add?addRoleItem.addtitle:addRoleItem.edittitle">
			<div>
				<i-form ref="addrole" :model="addRoleItem" :rules="addRoleItem.ruleValidate" :label-width="72">
					<form-item :label="$t('modules_rolemanage_152')" prop="name">
						<i-input v-model="addRoleItem.name" :placeholder="$t('modules_rolemanage_153')"></i-input>
					</form-item>
					<form-item :label="$t('modules_rolemanage_154')" prop="enname">
						<i-input v-model="addRoleItem.enname" :placeholder="$t('modules_rolemanage_155')"></i-input>
					</form-item>
					<form-item :label="$t('modules_rolemanage_156')" prop="dataScope">
						<Select v-model="addRoleItem.dataScope">
							<Option v-for="item in alldataScope" :value="item.value" :key="item.id">{{item.label}}</Option>
						</Select>
					</form-item>
					<form-item :label="$t('modules_rolemanage_157')" prop="readOnly">
					    <RadioGroup v-model="addRoleItem.readOnly">
					        <Radio label="1">{{$t('modules_rolemanage_158')}}</Radio>
					        <Radio label="0">{{$t('modules_rolemanage_159')}}</Radio>
					    </RadioGroup>
					</form-item>
					<form-item :label="$t('modules_rolemanage_160')" prop="part">
						<Select v-model="addRoleItem.part" multiple>
							<Option v-for="item in roleModelList" :value="item.id" :key="item.id" :disabled="abel(item.id,item.menuId)">{{item.name}}</Option>
						</Select>
					</form-item>
					<form-item :label="$t('modules_rolemanage_161')" prop="remarks" class="last-child">
						<i-input v-model="addRoleItem.remarks" type="textarea" :placeholder="$t('modules_rolemanage_162')" :rows="2"></i-input>
					</form-item>
				</i-form>
			</div>
			<div slot="footer">
				<Button @click="addRoleClose">{{$t('modules_rolemanage_163')}}</Button>
				<Button type="primary" @click="addRoleOk">{{$t('modules_rolemanage_164')}}</Button>
			</div>
		</Modal>
		<Modal :mask-closable='false' v-model="isBind" width=728 :title="isBindTitle?$t('modules_rolemanage_165'):$t('modules_rolemanage_166')" ref="reason">
			<div style="padding-left:10px">
				<ul class="TQuserInfo">
					<li><span>{{$t('modules_rolemanage_167')}}</span>{{userInfor.name}}</li>
					<li><span>{{$t('modules_rolemanage_168')}}</span>{{userInfor.photo}}</li>
					<li><span>{{$t('modules_rolemanage_169')}}</span>{{userInfor.email}}</li>
					<li v-if="!isBindTitle"><span>{{$t('modules_rolemanage_170')}}</span>{{tqInfo.tqUsername}}</li>
				</ul>
			</div>
			<div slot="footer">
				<Button @click="isBindCancel">{{$t('modules_rolemanage_163')}}</Button>
				<Button type="primary" @click="isBindOk">{{isBindTitle?$t('modules_rolemanage_165'):$t('modules_rolemanage_166')}}</Button>
			</div>
		</Modal>
		<Modal :mask-closable='false' v-model="isOk" width=728 @on-ok="isOkOk" ref="reason1" @on-cancel="isOkCancel">
			<div style="padding-left:10px">
				<p style="line-height:30px;text-align:center;margin-top:30px" v-if="isBindTitle"><span>{{$t('modules_rolemanage_170')}}</span>
					<Input v-model="tqInfo.tqUsername" :placeholder="$t('modules_rolemanage_171')" style="width: 300px" />
				</p>
				<p style="line-height:30px;text-align:center;margin-top:30px" v-else>{{$t('modules_rolemanage_172')}}</p>
			</div>
		</Modal>
		<Modal v-model="syncModel" width="728" :title="$t('modules_rolemanage_173')">
			<div>
				<i-form :label-width="72">
					<p style="margin-bottom: 14px;">{{$t('modules_rolemanage_174')}}</p>
					<form-item :label="$t('modules_rolemanage_175')">
						<p v-for="(item,index) in syncList.origin" :key="index">{{item.content}}</p>
					</form-item>
					<form-item :label="$t('modules_rolemanage_176')">
						<p v-for="(item,index) in syncList.target" :key="index">{{item.content}}</p>
					</form-item>
					<form-item :label="$t('modules_rolemanage_177')">
						<p> <span v-if="syncList.origin">{{syncList.origin[0].num}}</span><span v-else>0</span>{{$t('modules_rolemanage_178')}}</p>
					</form-item>
				</i-form>
			</div>
			<div slot="footer">
				<Button @click="syncModel=false">{{$t('modules_rolemanage_163')}}</Button>
				<Button type="primary" @click="syncOk">{{$t('modules_rolemanage_179')}}</Button>
			</div>
		</Modal>
		<Modal v-model="affirmSyncModel" width="400" :title="$t('modules_rolemanage_180')">
			<div style="padding: 4px 0 20px;">
				<p>
					<span v-for="(item,index) in syncList.target" :key="index">{{$t('modules_rolemanage_181', [item.content,item.num])}}</span>
					<span>{{$t('modules_rolemanage_182')}}</span>
				</p>
				<p>{{$t('modules_rolemanage_183')}}</p>
			</div>
			<div slot="footer">
				<Button @click="affirmSyncModel=false">{{$t('modules_rolemanage_163')}}</Button>
				<Button type="primary" @click="affirmSyncOk">{{$t('modules_rolemanage_184')}}</Button>
			</div>
		</Modal>
		<role-people ref="rolepeople" :appmenu="appmenu" :role="state.item" @fresh="doFresh"></role-people>
		<rightstab ref="rightstab" :appmenu="appmenu" :role="state.item" @fresh="doFresh" :menuId="menuId"></rightstab>

	</div>
</template>
<script>
	import valid, {
		errors,
		delRole,
		bindAccount,
		getExternalSystemAccount,
		unBindAccount,
		sysUser,
		sysRole,
		sysDict
	} from '../libs/request';
	import roleCard from './roleCard.vue';
	import rightstab from './rightstab';
	import rolePeople from './rolePeople.vue';
	import { mapMutations } from 'vuex';

	export default {
		props: {
			appmenu: {
				type: Object,
				required: true,
			},
			edit: {
				type: Boolean,
				default: true
			},
			menuId: {
				type: [String, Number],
				default: true,
			}
		},
		data() {
			return {
				roleId: '',
				affirmSyncModel: false,
				syncModel: false,
				syncList: {},
				syncNum: '',
				search: {
					text: '',
					page: 0
				},
				isOk: false,
				isBind: false,
				isBindTitle: true,
				tqInfo: {
					tqUsername: '',
				},
				userInfor: {
					name: this.$t('modules_rolemanage_185')
				},
				pageConfig: {
					pageSize: 10
				},
				state: {
					item: {},
					clicked: {}
				},
				alldataScope: [],
				roleUserList: {},
				userList: [],
				usercolumn: [{
					title: this.$t('modules_rolemanage_186'),
					key: "name",
					width: 140
				}, {
					title: this.$t('modules_rolemanage_187'),
					key: 'roleName'
				}, {
					title: this.$t('modules_rolemanage_188'),
					key: 'companyName',
					width: 100
				}, {
					title: this.$t('modules_rolemanage_189'),
					key: 'officeName'
				}, {
					title: this.$t('modules_rolemanage_190'),
					key: "loginName",
					width: 120
				}, {
					title: this.$t('modules_rolemanage_191'),
					key: "mobile",
					width: 120
				}, {
					title: this.$t('modules_rolemanage_192'),
					key: "email"
				}, ],
				roleNameList: [],
				roleModelList: [],
				loadItem: {},
				addRoleItem: {
					show: false,
					add: true,
					addtitle: this.$t('modules_rolemanage_150'),
					edittitle: this.$t('modules_rolemanage_193'),
					part: [],
					name: '',
					enname: '',
					dataScope: null,
					readOnly:"0",
					remarks: '',
					ruleValidate: {
						name: [{
								required: true,
								message: this.$t('modules_rolemanage_194'),
								trigger: 'blur'
							},
							{
								required: true,
								pattern: /^(^[\w\-]{1,20}$)|(^[\w\-\u4e00-\u9fa5]{1,10}$)$/,
								message: this.$t('modules_rolemanage_195'),
								trigger: 'blur'
							}
						],
						enname: [{
							required: true,
							message: this.$t('modules_rolemanage_196'),
							trigger: 'blur'
						}],
						dataScope: [{
							required: true,
							message: this.$t('modules_rolemanage_197'),
							trigger: 'change'
						}],
						remarks: [{
							required: false,
							type: 'string',
							max: 100,
							message: this.$t('modules_rolemanage_198'),
							trigger: 'blur'
						}],
					}
				},
			};
		},
		components: {
			roleCard,
			rightstab,
			rolePeople,
		},
		created() {
			this.initPage();
		},
		methods: {
			...mapMutations(['updateLoadingStatus']),
            abel(id,mId) {
                let flag1=false,flag2=true;
                this.addRoleItem.part.forEach((v,k)=>{
                    if(id==v){
                        flag2=false;
                    }
                    this.roleModelList.forEach((val,ind)=>{
                        if(val.id==v){
                            if(mId==val.menuId){
                                flag1=true;
                            }
                        }
                    })
                })
                if(flag1&&flag2){
                    return true;
                }else{
                    return false;
                }
            },
			initPage() {
				this.getRoles(() => {
					this.$nextTick(() => {
						if(this.roleNameList[0]) {
							this.loadItem = this.roleNameList[0]
							this.cardClick(this.roleNameList[0]);
						}
					});
				});
			},
			getRoles(cb) {
				this.updateLoadingStatus({
					isLoading: true
				});
				sysRole.listMenuRole(this.appmenu.id).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.roleNameList = res.data.data.roleList || [];
						cb && cb();
					}
				}).catch(errors.call(this)).finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});
			},
			cardClick(item) {
				[...this.userList] = this.usercolumn
				this.loadItem = item
				if(item.id == 904 || item.id == 908) {
					this.userList.push({
						title: this.$t('modules_rolemanage_199'),
						key: "email",
						render: (h, params) => {
							return h('a', {
									on: {
										click: () => {
											this.userInfor = params.row
											this.getUserInfor(params.row)
											// if(params.row.accountMap) {
											//     this.isBindTitle = true  
											//     this.tqInfo.tqUsername = ''
											// } else {

											//     return
											// }
											// this.isBind = true
										}
									}
								},
								this.$t('modules_rolemanage_200')
							)
						}
					})
				}
				this.search.text = '';
				this.state.clicked = item;
				this.getCurrUserList();
			},

			getUserInfor() {
				let obj = {
					userId: this.userInfor.id,
					system: 'tq'
				}
				getExternalSystemAccount(obj).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.tqInfo = res.data.data
						if(this.tqInfo) {
							this.isBindTitle = false
						} else {
							this.tqInfo = {
								tqUsername: '',
							}
							this.isBindTitle = true
						}
						this.isBind = true
					}
				}).catch(errors.call(this)).finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});
			},

			bindAccount() {
				let obj = {
					userId: this.userInfor.id,
					system: 'tq',
					tqUsername: this.tqInfo.tqUsername
				}
				bindAccount(obj).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$Message.info(res.data.message)
						this.cardClick(this.loadItem)
					}
				}).catch(errors.call(this)).finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});
			},

			unBindAccount() {
				let obj = {
					id: this.tqInfo.id,
				}
				unBindAccount(obj).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$Message.info(res.data.message)
						this.cardClick(this.loadItem)
					}
				}).catch(errors.call(this)).finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});
			},

			onPageChange(page) {
				this.search.page = page || 1;
				this.getCurrUserList();
			},
			onPageSizeChange(pageSize) {
				this.pageConfig.pageSize = pageSize;
				this.getCurrUserList();
			},
			onSearch() {
				this.search.page = 0;
				this.getCurrUserList();
			},
			getCurrUserList() {
				let param = {
					'role.id': this.state.clicked.id,
					'role.menuId': this.appmenu.id,
					pageSize: this.pageConfig.pageSize
				};
				if(this.search.text) {
					param.name = this.search.text;
				}
				if(this.search.page) {
					param.pageNo = this.search.page;
				}
				this.updateLoadingStatus({
					isLoading: true
				});
				sysUser.getUserList(param).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.roleUserList = res.data.data;
					}
				}).catch(errors.call(this)).finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});
			},
			addRole() {
				this.$refs['addrole'].resetFields();
				this.tryScopeData();
				this.addRoleItem.show = true;
				this.addRoleItem.add = true;
			},
			cardDel(item) {
				if(item.num > 0) {
					return this.$Message.warning(this.$t('modules_rolemanage_201'));
				}
				this.$Modal.confirm({
					title: this.$t('modules_rolemanage_202'),
					content: this.$t('modules_rolemanage_203'),
					onOk: () => {
						this.cardClick(item);
						this.doDel(item);
					},
					onCancel: () => {
						this.cardClick(item);
					}
				});
			},
			onSync(item) {
				console.log(item)
				this.roleId = item.id;
				sysRole.formRoleSync({
					roleId: item.id
				}).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.syncList = res.data.data;
						let arr = this.syncList.target.map(item => item.num);
						this.syncNum = arr.reduce(function(x, y) {
							return x + y;
						});
						this.syncModel = true;
					}
				}).catch(errors.call(this));
			},
			syncOk() {
				if(this.syncNum) {
					this.affirmSyncModel = true;
				} else {
					this.roleSync(() => {
						this.syncModel = false;
					});
				}
			},
			affirmSyncOk() {
				this.roleSync(() => {
					this.syncModel = false;
					this.affirmSyncModel = true;
				});
			},
			roleSync(cb) {
				sysRole.roleSync({
					roleId: this.roleId
				}).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$Message.success(res.data.message);
						cb && cb();
					}
				}).catch(errors.call(this));
			},
			doDel(item) {
				sysRole.roleDelete({id:item.id}).then(valid.call(this)).then((res) => {
					if(res.ok) {
						this.getRoles();
					}
				}).catch(errors.call(this));
			},
			cardUpdate(item) {
				sysRole.RolelistData({
					menuId: this.appmenu.id,
					roleId:item.id
				}).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.roleModelList = res.data.data || [];
					}
				}).catch(errors.call(this));
				this.state.item = item;
				this.tryScopeData();
				this.addRoleItem.add = false;
				this.addRoleItem.show = true;
				this.addRoleItem.name = item.name;
				this.addRoleItem.enname = item.enname;
				this.addRoleItem.remarks = item.remarks;
				this.addRoleItem.dataScope = item.dataScope;
				this.addRoleItem.readOnly = item.readOnly;
				this.addRoleItem.part = item.syncList.map(item => item.syncObjectId);

			},
			addRoleOk() {
				this.$refs['addrole'].validate((validok) => {
					if(validok) {
						let info = {
							name: this.addRoleItem.name,
							remarks: this.addRoleItem.remarks,
							dataScope: this.addRoleItem.dataScope,
							enname: this.addRoleItem.enname,
							menuId: this.appmenu.id,
							readOnly: this.addRoleItem.readOnly,
							roleSyncIds: this.addRoleItem.part.join(',')
						};
						if(!this.addRoleItem.add) {
							info.id = this.state.item.id;
							this.state.clicked = this.state.item;
						}
						sysRole.roleSave(info).then(valid.call(this)).then((res) => {
							if(res.ok) {
								this.addRoleClose();
								this.getRoles();
							}
						}).catch(errors.call(this))
					}
				});
			},
			addRoleClose() {
				if(this.state.item.id) {
					this.cardClick(this.state.item);
				}
				this.addRoleItem.show = false;
				this.$refs['addrole'].resetFields();
			},
			giveRight(item) {
				this.state.item = item;
				this.$nextTick(() => {
					this.$refs.rightstab.show();
				});
			},
			peopleChoose(item) {
				this.state.item = item;
				this.$nextTick(() => {
					this.$refs.rolepeople.show();
				});
			},
			tryScopeData() {
				if(this.alldataScope.length) {
					return;
				}
				sysDict.listData({type:'sys_data_scope'}).then(valid.call(this)).then((res) => {
					if(res.ok) {
						this.alldataScope = res.data.data;
					}
				}).catch(errors.call(this));
			},
			doFresh(item) {
				this.getRoles();
				this.cardClick(item);
			},
			isRoleDisable(item) {
				// 中方后期教师、中方后期组长、美方后期教师、美方后期组长这4个角色不允许分配人员
				// 规划主管，规划顾问 不能自由分配人员
				//          const arr = ['6','7','8','9','704','705'];
				//          return arr.indexOf(item.id)>-1;
				return true;
			},

			isOkOk() {
				if(this.isBindTitle) {
					if(!this.tqInfo.tqUsername) {
						this.$refs.reason1.visible = true
						this.isOk = true
						this.$Message.info(this.$t('modules_rolemanage_171'))
						return
					}
					this.bindAccount()
				} else {
					this.unBindAccount()
				}
			},

			isOkCancel() {

			},

			isBindCancel() {
				this.isBind = false
			},

			isBindOk() {
				this.isBind = false
				this.isOk = true
			}
		}
	}
</script>