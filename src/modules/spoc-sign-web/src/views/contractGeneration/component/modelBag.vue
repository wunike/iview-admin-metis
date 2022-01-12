<style>

</style>

<template>
	<Modal v-model="modalBag" :title="$t('modules_spoc_sign_web_src_views_contractgeneration_component_modelbag_5255')" width="600" :closable="true" :mask-closable="true" class-name="vertical-center-modal">
		<div>
			<v-select style="width: 354px;padding-bottom: 14px;" class="search" :placeholder="$t('modules_spoc_sign_web_src_views_contractgeneration_component_modelbag_5256')" icon="search" v-model="searchValue" k='cnname' :datafunc="searchDropList" @on-enter="textChange" @on-click="textChange" @selected="textChange">
			</v-select>
    		<Table border :columns="columns" :data="tableData"></Table>
		</div>
		<div slot="footer">
			<Button @click="modalBag=false">{{$t('classroom_allscore_53')}}</Button>
			<!--<Button type="primary" @click="BagOk()">{{$t('classroom_allscore_54')}}</Button>-->
		</div>
	</Modal>
</template>

<script>
	import vSelect from '@public/modules/vSelect.vue';
	export default {
		props: {
			bagList:{
				type:Array,
				default:function(){
					return []
				},
			}
		},
		data() {
			return {
				modalBag: false,
				searchValue:'',
				columns:[
                    {
                        title: this.$t('views_coursepack_bigtableexample_319'),
                        align: 'center',
                        key: 'name',
						resizable: true,
						width: null,
                    },
                    {
                        title: this.$t('views_coursepack_coursepackgroup_465'),
                        align: 'center',
						resizable: true,
						width: null,
                        render:(h,params)=>{
                        	return h('div',{},params.row.htItemList.map(item=>item.name).join(','))
                        }
                    },
                    {
                        title: this.$t('modules_spoc_sign_web_src_views_contractgeneration_component_modelbag_5261'),
                        align: 'center',
						resizable: true,
						width: null,
                        render:(h,params)=>{
                        	return h('div',{},params.row.htItemSubList.find(item=>item.type=='sys_office').publicPrice)
                        }
                    },
                    {
                        title: this.$t('modules_spoc_sign_web_src_views_contractgeneration_component_modelbag_5262'),
                        align: 'center',
						resizable: true,
						width: null,
                        render:(h,params)=>{
                        	return h('div',{},params.row.htItemSubList.find(item=>item.type=='sys_office').discountAmount)
                        }
                    },
                    {
                        title: this.$t('classlist_compontents_detailinfo_45'),
                        align: 'center',
						resizable: true,
						width: null,
                        render:(h, params)=>{
                        	return h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                    	
                                    },
                                    on: {
                                        click: () => {
                                        	this.BagOk(params.row,this.bagList.find(item=>item.id==10).protocal);
                                        }
                                    }
                                }, this.$t('classroom_allscore_52'))
                        }
                    }],
				tableData:this.bagList.find(item=>item.id==10).htItemList
			}
		},
		components: {
			vSelect,
		},
		created(){
			console.log(this.bagList)
		},
		methods: {
			BagOk(arr) {
				this.$emit('BagOk', arr)
				this.modalBag = false;
			},
			modelShow() {
				this.modalBag = true;
			},
			textChange(val){
				
			},
			searchDropList(word) {
				return new Promise((resolve, reject) => {
					//	            	SchoolMajor.listThink({name:word,schoolId:this.$route.query.schoolId}).then(valid.call(this)).then(res=>{
					//	                    if(res.ok){
					//	                        resolve(res.data.data);
					//	                    } else {
					//	                        reject(res);
					//	                    }
					//	                }).catch(err=>{
					//	                    errors.call(this);
					//	                    reject(err);
					//	                });
				});
			},
		},
		watch: {
			/*
						xqList: {
							handler: function(val, oldVal) { 
								if(!this.selected) {
									if(this.xqList.length) {
										this.BagData.xq = this.xqList[0].id;
									}
								}
							},
							deep: true
						}*/
		}
	}
</script>