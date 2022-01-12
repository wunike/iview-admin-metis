<style lang="less">
	.formXQ{
		.ivu-form{
			.ivu-form-item-label{
				font-size: 14px;
                color: #999999;
			}
		}
		.ivu-select-single{
			.ivu-select-selection{
				.ivu-select-selected-value {
					font-size: 14px;
				}
			}
		}
	}
</style>

<template>
	<Modal class="formXQ" v-model="modalXQ" :title="$t('modules_spoc_sign_web_src_views_contractgeneration_component_modelxq_5265')" width="600" :closable="false" :mask-closable="false" class-name=" vertical-center-modal">
		<div>
			<Form ref="formXQ" :rules="XQRule" :model="XQData" :label-width="80">
				<FormItem :label="$t('modules_spoc_crm_web_src_views_customermanagement_index_1262')" prop="xq">
					<Select v-model="XQData.xq" style="width: 230px;">
						<Option :value="item.id" v-for="item in xqList" :key="item.id">{{item.name}}</Option>
					</Select>
				</FormItem>
			</Form>
		</div>
		<div slot="footer">
			<Button @click="modalXQ=false">{{$t('classroom_allscore_53')}}</Button>
			<Button type="primary" @click="XQOk('formXQ')">{{$t('classroom_allscore_54')}}</Button>
		</div>
	</Modal>
</template>

<script>
	export default {
		props: {
			xqList: {
				type: Array,
				request: true,
				default: []
			},
			selected: {
				type: [String, Number],
				default: ''
			}
		},
		data() {
			return {
				modalXQ: false,
				XQData: {
					xq: this.selected
				},
				XQRule: {
					xq: [{
						required: true,
						message: this.$t('modules_spoc_core_web_src_views_customstate_stategroup_204'),
						trigger: 'change'
					}]
				},
				saveData: ''
			}
		},
		methods: {
			XQOk(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						this.$emit('XQOk', this.saveData, this.XQData.xq)
						this.modalXQ = false;
					} else {}
				})
			},
			modelShow() {
				this.modalXQ = true;
			}
		},
		watch: {
			xqList: {
				handler: function(val, oldVal) {
					if(!this.selected) {
						if(this.xqList.length) {
							this.XQData.xq = this.xqList[0].id;
                            if(this.xqList.length==1&&this.$route.query.cusId){
                                // this.XQOk('formXQ')
                            }
						}
					}
				},
				deep: true
			}
		}
	}
</script>
