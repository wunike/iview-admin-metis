<style lang="less">
.checkStyle {
	background: #fff;
	border-radius: 4px;
	.title {
		display: flex;
		// justify-content: center;
		align-items: center;
		padding-top: 20px;
		padding-left: 32px;
		> span {
			font-size: 20px;
			font-family: PingFangSC-Medium;
			font-weight: 500;
			color: rgba(73, 80, 96, 1);
		}
	}
	.classDetail {
		display: flex;
		// background: #fff;
		// border-radius: 4px;
		padding: 20px 32px;
		.classDetailRow {
			flex: 1;
			display: flex;
			flex-direction: column;
			> span {
				font-size: 14px;
				font-family: HiraginoSansGB-W3;
				font-weight: normal;
				color: rgba(153, 153, 153, 1);
				> span {
					color: #495060;
				}
			}
			> span:nth-child(2) {
				margin: 10px 0px;
			}
		}
	}
}
</style>
<template>
	<div class="checkStyle">
		<!--  <div class="title">
      <span>SH01GGR1A-190302A</span>
      <Button type="success" size="small" style="width:60px;margin-left:16px">{{$t('modules_spoc_crm_web_src_views_transferintroductionmanagement_index_1991')}}</Button>
		</div>-->
		<slot name="classtitle"></slot>
		<slot name="classDetail"></slot>
		<!-- <div class="classDetail">
      <div class="classDetailRow">
        <span>{{$t('modules_spoc_jw_web_src_views_classmanage_checkwork_checkwork_2422')}}<span>259235</span>
        </span>
        <span>{{$t('modules_spoc_jw_web_src_views_classmanage_checkwork_checkwork_2423')}}<span>{{$t('modules_spoc_jw_web_src_views_classmanage_checkwork_compontents_detailinfo_2446')}}</span>
        </span>
        <span>{{$t('modules_spoc_jw_web_src_views_classmanage_checkwork_checkwork_2424')}}<span>EE</span>
        </span>
      </div>
      <div class="classDetailRow">
        <span>{{$t('modules_spoc_jw_web_src_views_classmanage_checkwork_checkwork_2425')}}<span>{{$t('modules_spoc_jw_web_src_views_classmanage_checkwork_compontents_detailinfo_2449')}}</span>
        </span>
        <span>{{$t('courselist_compontents_modify_187')}}<span>{{$t('modules_spoc_jw_web_src_views_classmanage_checkwork_compontents_detailinfo_2451')}}</span>
        </span>
        <span>{{$t('modules_spoc_jw_web_src_views_classmanage_checkwork_checkwork_2427')}}<span>EE1</span>
        </span>
      </div>
      <div class="classDetailRow">
        <span>{{$t('modules_spoc_jw_web_src_views_classmanage_checkwork_checkwork_2428')}}<span>{{$t('modules_spoc_crm_web_src_views_customer360_components_timetable_coursetimeheader_1043')}}</span>
        </span>
        <span>{{$t('modules_spoc_jw_web_src_views_classmanage_checkwork_checkwork_2429')}}<span>{{$t('modules_spoc_jw_web_src_views_classmanage_checkwork_compontents_detailinfo_2456')}}</span>
        </span>
      </div>
      <div class="classDetailRow">
        <span>{{$t('modules_spoc_jw_web_src_views_classmanage_checkwork_checkwork_2430')}}<span>2019-03-02</span>
        </span>
        <span>{{$t('modules_spoc_jw_web_src_views_classmanage_checkwork_checkwork_2431')}}<span>EE1</span>
        </span>
      </div>
		</div>-->
	</div>
</template>
<script>
import { mapMutations } from "vuex";
// import valid, { errors } from "../../../../libs/request";
export default {
	components: {},
	mounted() {},
	data() {
		return {};
	},
	methods: {
		...mapMutations(["updateLoadingStatus"])
	}
};
</script>