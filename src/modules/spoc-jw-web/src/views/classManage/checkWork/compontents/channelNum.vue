<style lang="less">
.ivu-poptip-inner .ivu-poptip-title-inner {
	font-size: 14px;
	font-family: HiraginoSansGB-W6, HiraginoSansGB;
	font-weight: 800;
	color: #495060;
}
.listDataClass:hover {
	background: #eee;
}
.api-All {
	display: inline-block;
}
.api-All{
	.numSpan{
		display: inline-block;
		width: 16px;
		height: 16px;
		background: #FF0000;
		text-align: center;
		line-height: 16px;
		color: #FFF;
		border-radius: 50%;
		cursor: pointer;
	}
}
</style>
<template>
	<div class="api-All">
		<Poptip
			v-model="visiblePoptip"
			placement="bottom"
			transfer
			:title="failArr.length>0?$t('modules_spoc_jw_web_src_views_classmanage_checkwork_compontents_channelnum_2441')+failArr.length:$t('modules_spoc_jw_web_src_views_classmanage_checkwork_compontents_channelnum_2442')+finallyArr.length"
		>
			<div v-if="isOk == '0'" class="numSpan" @click="clickFindQrcodeChannelFn">{{failArr.length}}</div>
            <Icon v-else @click="clickFindQrcodeChannelFn" type="ios-checkmark-circle" size="18" color="#52C41A" style="cursor:pointer;"/>
            <!-- @scroll="myFunction" -->
			<div
				class="slotApi"
				slot="content"
				:style="{height:newSopTasks.length>7?'270px':'',overflow:'auto'}"
			>
				<div
					class="listDataClass"
					v-for="(item,index) in newSopTasks"
					@click="showTaskDetail(item.id)"
					:key="index"
					style="height:40px;line-height:40px;"
				>
					<Icon
						:type="item.status=='0'?'ios-brush':'ios-checkmark-circle'"
						size="18"
						:color="item.status=='0'?'#FF0000':'#52C41A'"
					/>
					{{item.name}}
				</div>
				<div v-show="newSopTasks.length<=0">
					<Button loading shape="circle"></Button>
				</div>
			</div>
		</Poptip>
		<task-detail-modal @refresh="doSearch" ref="taskDeatilModalRef"></task-detail-modal>
	</div>
</template>
<script>
import { mapMutations } from "vuex";
import valid, {
	errors
} from "../../../../libs/request";
import taskDetailModal from "../../../../../../spoc-crm-web/src/views/taskCenter/taskDetailModal.vue";
export default {
    props: {
        sopTasks: {
            type: [Array]
        },
        isOk:{//是否为对号，否则为感叹号
            type: String,
            defalult:'0'
        }

    },
	components: {
		taskDetailModal
	},
	mounted() {
		// this.baseData();
	},
	computed: {
		newSopTasks: function() {
			let aaa = this.sopTasks.filter(item => {
				return item.status == "0";
			});
			let bbb = this.sopTasks.filter(item => {
				return item.status == "1";
			});
			this.failArr = aaa;
			this.finallyArr = bbb;
			return [].concat(aaa, bbb);
		}
	},

	data() {
		return {
			visiblePoptip: false,
			failArr: [],
			finallyArr: []
			// findQrcodeChannelList: [],
			// pageNo: 1,
			// pageSize: 8,
			// maxPage: 0,
			// loadingData: true
		};
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		clickFindQrcodeChannelFn() {},
		showTaskDetail(id) {
			this.visiblePoptip = false;
			this.$refs.taskDeatilModalRef.showModal(id);
        },
        doSearch(){
			console.log('完成任务')
            this.$emit('reloadList')
        }
	}
};
</script>
