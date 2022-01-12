<style lang="less">
.scfjxy {
    width: 100%;
    padding-left:52px;
	.del {
		&:hover {
			color: #888;
		}
	}
	> div {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding-left: 50px;
		margin-bottom: 12px;
		div {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			img {
				width: 16px;
				height: 16px;
				margin-right: 12px;
			}
		}
	}
}
</style>
<template>
	<div>
		<Modal v-model="showModal" :title="title" width="500">
			<Form :model="formItem" :label-width="120">
				<FormItem
					:label="$t('modules_spoc_sign_web_src_views_contractmanage_components_scanningcopymodal_5648')"
				>
					<Upload
						name="files"
						:action="uploadFileUrl"
						:data="uploadData"
						:format="['docx']"
						:on-format-error="formatError"
						:on-success="handleSuccess"
						:show-upload-list="false"
						:before-upload="beforeUpload"
					>
						<Button
							icon="ios-cloud-upload-outline"
						>{{$t('modules_spoc_core_web_src_views_announcement_addannouncement_63')}}</Button>
						<div style="color:rgba(0,0,0,0.45);">{{$t('pactFjxyType')}}</div>
					</Upload>
				</FormItem>
			</Form>
			<div class="scfjxy">
				<a target="_blank" v-show="uploadInfo.path" :href="uploadInfo.path">{{uploadInfo.name}}</a>
			</div>
			<div slot="footer">
				<Button
					type="primary"
					size="large"
					@click="ok"
				>{{$t('courselist_compontents_servicecontent_216')}}</Button>
			</div>
		</Modal>
	</div>
</template>
<script>
import { mapGetters, mapState, mapMutations } from "vuex";
import valid, {
	errors,
	htContract,
	sysAttachment,
	sysConfig,
} from "../../../libs/request";
export default {
	data() {
		return {
			showModal: false,
			formItem: {},
			uploadData: {
				type: "ht_contract_tpl",
				dirName: "all",
				menuId: 5001,
			},
			ctId: "",
			title: "",
			list: [],
			formDetail: {},
			uploadInfo: {},
		};
	},
	components: {},
	computed: {
		uploadFileUrl: function () {
			return sysAttachment.uploadFileUrl();
		},
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		beforeUpload() {
			this.updateLoadingStatus({ isLoading: true });
		},
		formatError(file) {
			this.updateLoadingStatus({ isLoading: false });
			this.$Message.error({
				content: this.$t(
					"modules_spoc_sign_web_src_views_library_pact_pact_6607"
				),
				duration: 3,
			});
		},
		handleSuccess(response, file, fileList) {
			console.log(response);
			this.uploadInfo = {
				path: response.data.filePath,
				name: response.data.realName, //  fileName
				attId: response.data.id,
			};
			this.formDetail.value = JSON.stringify(this.uploadInfo);

			this.updateLoadingStatus({ isLoading: true });
			sysConfig
				.save(this.formDetail)
				.then(valid.call(this))
				.then((res) => {
					if (res.ok) {
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		ok() {
			this.showModal = false;
		},
		show() {
			this.showModal = true;
			this.updateLoadingStatus({
				isLoading: true,
			});
			sysConfig
				.form({
					configId: "ct:protocol:tpl",
				})
				.then(valid.call(this))
				.then((res) => {
					if (res.ok) {
						console.log(res.data);
						this.formDetail = res.data.data;
						this.uploadInfo = JSON.parse(res.data.data.value);
						if (this.uploadInfo.path) {
							this.title = this.$t("pactEditFjxy");
						} else {
							this.title = this.$t("pactAddFjxy");
						}
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({
						isLoading: false,
					});
				});
		},
	},
};
</script>
