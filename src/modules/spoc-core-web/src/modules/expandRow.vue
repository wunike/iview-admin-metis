<style lang="less">
	.res-expand-row {
		.row-item {
			overflow: hidden;
			line-height: 40px;
			.item-foldable{
				cursor: initial;
			}
		}
	}
</style>
<template>
	<div class="res-expand-row">
		<div class="row-item" v-for="(item,index) in subMenuList" :key="index">
			<div class="item-foldable"></div>
			<div class="item-name">{{item.name}}</div>
			<div class="item-href">{{item.href}}</div>
			<div class="item-sort"></div>
			<div class="item-visible">{{item.isShow==1?$t("modules_expandrow_13"):$t("modules_expandrow_14")}}</div>
			<div class="item-permission">{{item.permission}}</div>
			<div class="item-ctrls" v-if="edit">
				<a href="javascript:void(0)" class="linkbtn" @click="showModify(item)">{{$t('modules_expandrow_15')}}</a>
				<a href="javascript:void(0)" class="linkbtn" @click="showDelMenu(item)">{{$t('modules_expandrow_16')}}</a>
			</div>
		</div>
		<!--修改弹窗-->
		<Modal v-if="edit" v-model="updateMenuForm.visible" :title="$t('modules_expandrow_17')">
            <div>
                <i-form ref="updatemenu" :model="updateMenuForm" :rules="updateMenuForm.ruleValidate" :label-width="80">
                    <form-item :label="$t('modules_expandrow_18')" prop="name">
                        <i-input v-model="updateMenuForm.name" :placeholder="$t('modules_expandrow_19')"></i-input>
                    </form-item>
                    <form-item :label="$t('modules_expandrow_20')">
                        <span v-text="row.name"></span>
                    </form-item>
                    <form-item :label="$t('modules_expandrow_21')" prop="href">
                        <i-input v-model="updateMenuForm.href" :placeholder="$t('modules_expandrow_22')"></i-input>
                    </form-item>

                    <form-item :label="$t('modules_expandrow_23')" prop="sort">
                        <InputNumber v-model="updateMenuForm.sort" @on-change='sortChange(updateMenuForm.sort)'></InputNumber>
                    </form-item>
                    <form-item :label="$t('modules_expandrow_24')" prop="isShow">
                        <i-switch size="large" v-model="updateMenuForm.isShow">
                            <span slot="open">{{$t('modules_expandrow_25')}}</span>
                            <span slot="close">{{$t('modules_expandrow_14')}}</span>
                        </i-switch>
                    </form-item>
                    <form-item :label="$t('modules_expandrow_26')" prop="permission">
                        <i-input v-model="updateMenuForm.permission" :placeholder="$t('modules_expandrow_27')"></i-input>
                    </form-item>
                    <form-item :label="$t('modules_expandrow_28')" prop="remarks" class="last-child">
                        <i-input v-model="updateMenuForm.remarks" type="textarea" :placeholder="$t('modules_expandrow_29')" :rows="2"></i-input>
                    </form-item>
                </i-form>
            </div>
            <div slot="footer">
                <Button @click="updateMenuClose">{{$t('modules_expandrow_30')}}</Button>
                <Button type="primary" @click="updateMenuOk">{{$t('modules_expandrow_31')}}</Button>
            </div>
        </Modal>
	</div>
</template>
<script>
	import valid, { errors, sysMenu } from '../libs/request';
    import {mapMutations} from 'vuex';
	export default {
		props: {
			row: {
				type: Object,
				default: function() {
					return {};
				}
			},
			edit:{
				type:Boolean,
				default:true,
			}
		},
		data() {
			return {
				subMenuList:[],
				updateMenuForm: {
					visible: false,
					name: '',
					href: '',
					isShow: false,
					permission: '',
					remarks:'',
					ruleValidate: {
						name: [
							{ required: true, message: this.$t('modules_expandrow_32'), trigger: 'blur' }
						],
						href: [
						],
						sort: [
							{ required: true }
						],
						isShow: [
							{ required: true }
						],
						permission: [
							{ required: true, message: this.$t('modules_expandrow_33'), trigger: 'blur' }
						],
						remarks: [
                            { required: false , type:'string', max:100, message:this.$t('modules_expandrow_34'), trigger: 'blur' }
                        ]
					}

				}
			};

		},
		created() {
			this.getList()
		},
		methods: {
            ...mapMutations(['updateLoadingStatus']),
			getList() {
				// this.updateLoadingStatus({isLoading: true});
				let param = {
					'parent.id':this.row.id
				};
				sysMenu.listData(param).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.subMenuList = res.data.data.list;
					}
				}).catch(errors.call(this)).finally(()=>{
                    this.updateLoadingStatus({isLoading: false});
				});
			},
			showDelMenu(item){
				this.$Modal.confirm({
                    title: this.$t('modules_expandrow_35'),
                    content: this.$t('modules_expandrow_36'),
                    onOk: () => {
						this.updateLoadingStatus({isLoading: true});
                        sysMenu.deleteMenu({id:item.id}).then(valid.call(this)).then( res => {
                            if(res.ok){
                                this.getList();
                            }
                        }).catch(errors.call(this)).finally(()=>{
                            this.updateLoadingStatus({isLoading: false});
						});
                    }
				});
			},
			showModify(item){
				this.updateMenuForm.name = item.name;
				this.updateMenuForm.href = item.href;
				this.updateMenuForm.permission = item.permission;
				this.updateMenuForm.sort = item.sort;
				this.updateMenuForm.isShow = item.isShow == '1'?true:false;
				this.updateMenuForm.remarks = item.remarks;
				
				this.updateMenuForm.update = item;
                this.updateMenuForm.visible = true;
               
			},
			updateMenuClose(){
				this.updateMenuForm.visible = false;
			},
			updateMenuOk(){
				this.$refs.updatemenu.validate((vad) => {
					if(vad) {
						let info = {
							name: this.updateMenuForm.name,
							remarks: this.updateMenuForm.remarks,
							sort: this.updateMenuForm.sort,
							href: this.updateMenuForm.href,
							permission: this.updateMenuForm.permission,
							isShow: this.updateMenuForm.isShow ? 1 : 0,
							id: this.updateMenuForm.update.id
						};
						this.updateLoadingStatus({isLoading: true});
						sysMenu.saveMenu(info).then(valid.call(this)).then(res => {
							if(res.ok) {
								this.updateMenuClose();
								this.getList();
                            }
                        }).catch(errors.call(this)).finally(()=>{
                            this.updateLoadingStatus({isLoading: false});
						});
                    }
				});
			},
		},
		
	};
</script>