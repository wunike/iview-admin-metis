<style lang="less">
</style>
<template>
    <div>
   		<Modal v-model="showModal"
           @on-cancel="ok"
            :title="$t('modules_spoc_sign_web_src_modules_pactcard_4875')"
            width="798">
			<list-opt-log-modal-table :ctId="ctId" v-if="ctId"></list-opt-log-modal-table>
            <div slot="footer">
                <Button type="primary" size="large" @click="ok">{{$t('classroom_allscore_54')}}</Button>
            </div>
    	</Modal>
    </div>
</template>
<script>
import { mapGetters, mapState, mapMutations } from 'vuex';
import listOptLogModalTable from './listOptLogModalTable'
import valid, { errors, htContract } from "../../../libs/request";
export default {
 	data() {
		return {
            showModal: false,
            ctId: ''
		};
	},
	components: {
        listOptLogModalTable
	},
	methods: {
        ...mapMutations(['updateLoadingStatus']),
        ok(){
            this.showModal = false
            this.ctId = ''
        },
        listOptLog(id){
            this.ctId = id
            this.showModal = true
        }
	},
};
</script>
