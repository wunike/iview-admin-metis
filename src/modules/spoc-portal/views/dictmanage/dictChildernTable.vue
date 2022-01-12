<style lang="less">
	.dictChildernTable {}
	
	.dictChildernTableModal {
		.ivu-modal-footer {
			display: none;
		}
		.table_wrap {
			.table_action {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				a {
                    margin-right: 14px;
				}
			}
		}
	}
</style>

<template>
	<div class="dictChildernTable" v-if="showTemp">
		<Modal v-model="modalShow" title="下级字典" width="800" class-name="dictChildernTableModal vertical-center-modal" @on-visible-change="visibleChange">
			<Button type="primary" v-if="level && level.length > 1" @click="goBack" style="margin-bottom: 12px">返回上级</Button>
            <div style="height: 350px;">
				<Table height="350" :columns="columns" :data="currSubMenu" draggable class="table_wrap" @on-drag-drop="dragDropTable">
					<template slot-scope="{ row, index }" slot="subDictNum">
						<a href="javascript:void(0);" v-if="row.subDictNum">{{row.subDictNum}}</a>
						<a href="javascript:void(0);" v-else style="color: #999999;cursor: default;">0</a>
					</template>
					<template slot-scope="{ row, index }" slot="isHidden">
						<span v-show="row.isHidden==0">显示</span>
						<span v-show="row.isHidden==3">隐藏</span>
					</template>
					<template slot-scope="{ row, index }" slot="subDictNum">
						<a href="javascript:void(0);" v-if="row.subDictNum" @click="seeChildren(row)">{{row.subDictNum}}</a>
						<a href="javascript:void(0);" v-else style="color: #999999;cursor: default;">0</a>
					</template>
					<template slot-scope="{ row, index }" slot="action">
						<div class="table_action">
							<a href="javascript:void(0);" @click="editMenu(row)">编辑</a>
							<a href="javascript:void(0);" @click="addSubMenu(row)">添加下级</a>
							<a href="javascript:void(0);" v-if="row.isSys == 0" @click="delMenu(row.id)">删除</a>
						</div>
					</template>
				</Table>
			</div>
		</Modal>
		<Modal v-model="newDictModel" class="new-dict-wrap" :title="modalTitle" width="600" :loading="newDictModelLoading" ref='modal' class-name="vertical-center-modal">
			<Form ref="formItem" :model="formItem" :label-width="100" :rules="ruleValidate">
				<FormItem label="显示名称：" prop="label" :rules="{required:true,message:'该项不能为空',trigger: 'blur'}">
					<Input v-model="formItem.label" :maxlength="40"/>
				</FormItem>
				<FormItem label="字典值：" prop="value" :rules="{required:true,message:'该项不能为空',trigger: 'blur'}">
					<Input v-model="formItem.value"/>
				</FormItem>
				<FormItem label="父级：">
					<div class="newEnglishName">{{ formItem.parentLabel }}</div>
				</FormItem>
				<FormItem label="排序：">
					<InputNumber :precision="0" :min="1" v-model="formItem.sort" disabled></InputNumber>
				</FormItem>
				<FormItem label="状态：">
					<i-switch v-model="formItem.isHidden" size="large">
						<span slot="open">显示</span>
						<span slot="close">隐藏</span>
					</i-switch>
				</FormItem>
				<FormItem label="描述：">
					<Input v-model="formItem.description"/>
				</FormItem>
				<FormItem label="备注：">
					<Input v-model="formItem.remarks" style="width:450px;" type="textarea" class="fullTextarea" :autosize="{minRows: 2,maxRows: 5}" />
				</FormItem>
			</Form>
			<div slot="footer">
			    <Button @click="cancel">取消</Button>
			    <Button type="primary" @click="ok">确定</Button>
			</div>
		</Modal>
		<Modal v-model="delDictModal" title="提示" @on-ok="delDictList" class-name="vertical-center-modal">
			<p>确定删除当前数据？</p>
		</Modal>
	</div>
</template>

<script>
	import valid, {
		errors,
		sysDict
	} from '../../libs/request.js';

	export default {
		data() {
			return {
				modalTitle:'编辑下级字典项',
				modalShow: false,
				showTemp: false,
				formItem: {
					label: '',
					value: '',
					sort: 1,
					isHidden: true,
					remarks: '',
					type: '',
					parent: '',
					parentID: '',
					parentVal: '',
					parentLabel: '',
					menuId: ''
				},
				editMenuID: '',
				ruleValidate: {
					label: [{
						required: true,
						message: '显示名称不能为空',
						trigger: 'blur'
					}],
					value: [{
						required: true,
						message: '字典值不能为空',
						trigger: 'blur'
					}]
				},
				newDictModelLoading: true,
				newDictModel: false,
				columns: [{
						title: '显示名称',
						key: 'label'
					},
					{
						title: '字典值',
						key: 'value'
					},
					{
						title: '类型',
						key: 'type'
					},
					{
						title: '下级数量',
						slot: 'subDictNum'
					},
					{
						title: '描述',
						key: 'description'
					},
					{
						title: '可见',
						slot: 'isHidden'
					},
					{
						title: '操作',
						slot: 'action',
						width: 175
					},
				],
				currSubMenu: [],
				listParams: {
					type: '',
					menuId: ""
				},
				delMenuID: '',
                delDictModal:false,
                level: [], //当前的级别
			}
		},
		created() {

		},
		methods: {
            goBack() {
                this.level.pop();
                let item = this.level[this.level.length - 1];
                // console.log(item);
				this.showModel(item);
            },
			seeChildren(item){
                this.level.push(item);
                // console.log(this.level);
				this.showModel(item);
            },
            showModelFromParent(item) {
                this.level = [];
                this.seeChildren(item);
            },
			addSubMenu(item) {
				// 添加下级
				// console.log(item)
				// 重置数据
				this.formItem = {
					label: '',
					value: '',
					sort: 1,
					isHidden: true,
					remarks: '',
					type: '',
					parent: '',
					parentID: ''
				}
				// parentId=所选分类Id，description=所选分类label，type=所选分类value
				this.isEditList = false;
				this.modalTitle = '新增字典项';
				this.formItem.parent = item.type;
				this.formItem.parentID = item.id;
				this.formItem.parentVal = item.value;
				this.formItem.parentLabel = item.label;
				this.formItem.description = item.label;
				this.englishName = item.label;
				this.editMenuID = '';
				this.newDictModel = true;
				this.checkTree = true;
				this.formItem.menuId = item.menuId
			},
			getListData(item = this.listParams) {
				let params = {
					type: item.value,
					menuId: item.menuId
				}
				sysDict.DictListDataNew(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						let _data = res.data;
						this.currSubMenu = _data.data;
					}
				}).catch(errors.call(this)).finally(() => {});
			},
			showModel(item) {
				this.listParams = item;
				this.getListData(item);
				this.showTemp = true;
				this.$nextTick(() => {
					this.modalShow = true;
				});
			},
			dragDropTable(ind1, ind2) {
				let arr1 = this.currSubMenu[ind1];
				let arr2 = this.currSubMenu[ind2];
				this.currSubMenu.splice(ind1, 1);
				this.currSubMenu.splice(ind2, 0, arr1);
				let arr = [];
				this.currSubMenu.forEach((v, k) => {
					v.sort = k + 1;
					arr.push({
						id: v.id,
						sort: v.sort
					})
				})
				sysDict.sortDict(arr).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.getListData(this.listParams);
					}
				}).catch(errors.call(this)).finally(() => {});
			},
			visibleChange(val) {
				if(val) {

				} else {
					this.modalShow = false;
					this.$nextTick(() => {
						this.showTemp = false;
					});
				}
			},
			editMenu(item) {
				// console.log(item)
				// 编辑字典项
				this.modalTitle = '编辑下级字典项'
				this.formItem = {
					label: item.label,
					value: item.value,
					sort: item.sort,
					isHidden: true,
					remarks: item.remarks,
					parentId: item.parentId,
					parentLabel: this.listParams.label,
					description: item.description,
					menuId: item.menuId
				}
				if(item.isHidden == 0) {
					this.formItem.isHidden = true;
				} else if(item.isHidden == 3) {
					this.formItem.isHidden = false;
				}
				this.formItem.type = item.type;
				this.editMenuID = item.id;
				this.newDictModel = true;
			},
			ok() {
				this.$refs.modal.buttonLoading = true;
				let params = {
					description: this.formItem.description,
					label: this.formItem.label,
					remarks: this.formItem.remarks,
					sort: this.formItem.sort,
					value: this.formItem.value,
					type: this.formItem.type,
					menuId: this.formItem.menuId,
					parentId: this.formItem.parentId
				}
				// 显示、隐藏
				if(this.formItem.isHidden) {
					params.isHidden = 0
				} else {
					params.isHidden = 3
				}
				// 编辑
				if(this.editMenuID) {
					params.id = this.editMenuID
				}

				if(this.formItem.parent) {
					// 添加下级
					// console.log('添加下级')
					params.parentId = this.formItem.parentID;
					// params.description = this.formItem.parentLabel;
					params.type = this.formItem.parentVal;
				}

				// console.log(params);
				this.$refs['formItem'].validate((validout) => {
					if(validout) {
						sysDict.DictSave(params).then(valid.call(this)).then(res => {
							if(res.ok) {
								this.newDictModel = false;
								this.getListData(this.listParams);
								this.$emit('uploadTable');
							}
						}).catch(errors.call(this)).finally(() => {
							this.$refs.modal.buttonLoading = false;
						});
					} else {
						this.$refs.modal.buttonLoading = false;
					}
				})
			},
			cancel() {
				this.newDictModel=false;
				this.$refs['formItem'].resetFields();
			},
			delMenu(id) {
				this.delMenuID = id;
				this.delDictModal = true;
			},
			delDictList() {
				// 删除某一项列表
				let params = {
					id: this.delMenuID
				}
				sysDict.DictDelect(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.delDictModal = false;
						this.getListData(this.listParams);
						// 刷新左侧树
						this.$emit('uploadTable');
					}
				}).catch(errors.call(this));
			},
		}
	}
</script>