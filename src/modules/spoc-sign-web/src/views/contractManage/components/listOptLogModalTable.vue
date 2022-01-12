<style lang="less">
</style>
<template>
    <div>
   		<Table border :columns="columns1" :data="data1"></Table>
    </div>
</template>
<script>
import { mapGetters, mapState, mapMutations } from 'vuex';
import valid, { errors, htContract } from "../../../libs/request";
export default {
    props:{
        ctId:{
            type: String,
            required: true
        },
    },
 	data() {
		return {
            data1: [],
			columns1: [
				{
					title: this.$t('courselist_compontents_detailinfo_160'),
					type: "index",
					align: "center",
					resizable: true,
					width: null,
                },
                {
                    title: this.$t('integralflow_10'),
                    key: 'optUserName',
                    align: 'center',
					resizable: true,
					width: null,
                },
				// {
				// 	title: "审核内容",
				// 	key: 'content',
                // },
				{
					title: this.$t('classlist_compontents_detailinfo_45'),
					key: "typeLabel",
					align: "center",
					resizable: true,
					width: null,
					render: (h, params) => {
                        // return h('span', params.row.typeLabel == this.$t('modules_spoc_crm_web_src_views_transferintroductionmanagement_index_2002') ? this.$t('classlist_classlist_13') : params.row.typeLabel)
                        return h('span', params.row.typeLabel == '审核' ? this.$t('classlist_classlist_13') : params.row.typeLabel)
					} 
				},
				// {
                //     title: '不通过原因',
                //     key: 'reason',
                //     align: 'center'
                // },
                {
                    title: this.$t('messagemanagement_components_histroylists_313'),
                    key: 'optTime',
                    align: 'center',
					resizable: true,
					width: null,
                },
			],
		};
	},
	components: {
    },
    mounted(){
        this.listOptLog(this.ctId)
    },
	methods: {
        ...mapMutations(['updateLoadingStatus']),
        listOptLog(ctId) {
            this.updateLoadingStatus({ isLoading: true });
            this.data1 = []
            htContract.listOptLog({
                ctId: ctId, //'9c4844ede98f42f08542e8d7cc8b6f13'
            })
            .then(valid.call(this))
            .then(res => {
                this.data1 = res.data.data
            })
            .catch(errors.call(this))
            .finally(() => {
                this.updateLoadingStatus({ isLoading: false });
            });
            
        },
	}
};
</script>
