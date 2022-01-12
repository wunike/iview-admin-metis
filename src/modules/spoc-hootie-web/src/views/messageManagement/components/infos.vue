<style lang="less">
.mm-infos-container {
	height: 121px;
	background: rgba(255, 255, 255, 1);
	border-radius: 4px;
	padding: 16px 20px;
	b {
		font-weight: normal;
	}
	.i-header {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		h2 {
			height: 22px;
			font-size: 16px;
			font-weight: 500;
			color: rgba(73, 80, 96, 1);
			line-height: 22px;
		}
		span {
			color: #999999;
		}
	}
	.i-body {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;
		flex-wrap: wrap;
		.ib-item {
			width: 33.33%;
			font-size: 14px;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: flex-start;
			b {
				color: #495060;
			}
			span {
				color: #999;
			}
			.ivu-poptip {
				width: calc(~"100% - 70px");
			}
			.ivu-poptip-rel {
				width: 100%;
			}
			.special-b {
				display: inline-block;
				width: 100%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
}
</style>

<template>
	<div class="mm-infos-container">
		<div class="i-header">
			<h2>{{infos.name}}</h2>
			<span>
				{{$t('messagemanagement_components_infos_318')}}
				<b>{{infos.code}}</b>）
			</span>
		</div>
		<div class="i-body">
			<div class="ib-item" style="margin-top:15px;">
				<span>{{$t('messagemanagement_components_infos_319')}}</span>
				<b>{{infos.enName}}</b>
			</div>
			<div class="ib-item" style="margin-top:15px;">
				<span>{{$t('messagemanagement_components_infos_320')}}</span>
				<b>{{infos.officeName}}</b>
			</div>
			<div class="ib-item" style="margin-top:15px;">
				<span>{{$t('messagemanagement_components_infos_321')}}</span>
				<b>{{infos.type.toUpperCase()}}</b>
			</div>
			<div class="ib-item" style="margin-top:12px;">
				<span>{{$t('messagemanagement_components_infos_322')}}</span>
				<b>{{infos.grade.toUpperCase()}}</b>
			</div>
			<div class="ib-item" style="margin-top:12px;">
				<span>{{$t('messagemanagement_components_infos_323')}}</span>
				<b>{{infos.lastMessageTime}}</b>
			</div>
			<div class="ib-item" style="margin-top:12px;">
				<span>{{$t('messagemanagement_components_infos_324')}}</span>
				<Poptip placement="top" trigger="hover" word-wrap width="300" :content="infos.joinClassNames">
					<b class="special-b">{{infos.joinClassNames}}</b>
				</Poptip>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
import valid, { errors, jxStudent } from "../../../libs/request";
export default {
	data() {
		return {
			infos: {
				name: "",
				code: "",
				enName: "",
				officeName: "",
				type: "",
				grade: "",
				lastMessageTime: "",
				joinClassNames: ""
			}
		};
	},
	computed: {
		...mapState(["userInfo"])
	},
	mounted() {
		this.stuId = this.$route.query.id;
		this.getInfos();
	},
	methods: {
		getInfos() {
			let params = {
				id: this.stuId
			};
			jxStudent
				.form(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let _data = res.data.data;
						this.infos = _data;
					}
				})
				.catch(errors.call(this));
		}
	}
};
</script>
