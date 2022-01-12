<style lang="less">
.avatar-container {
	.ivu-modal-header {
		padding: 17px 24px 16px !important;
		background: #f7f8fa;
		border-radius: 4px;
		.ivu-modal-header-inner {
			font-size: 18px;
			font-weight: 500;
			color: rgba(0, 0, 0, 0.85);
		}
	}
	.ivu-modal-body {
		padding: 25px 26px !important;
	}
	.avatar-container-box {
		width: 100%;
		height: 420px;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		flex-wrap: wrap;
		overflow: hidden;
		.item {
			width: 128px;
			height: 128px;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			align-items: center;
			background: rgba(250, 250, 250, 1);
			border-radius: 6px;
			border: 1px solid rgba(218, 218, 218, 1);
			margin-right: 12px;
			margin-bottom: 12px;
			position: relative;
			cursor: pointer;
			/*&.not-add{*/
			/*    &:hover{*/
			/*        background: #EAFFFE;*/
			/*        border:1px solid rgba(68,188,183,0.5);*/
			/*    }*/
			/*}*/

			&.selected {
				background: #eafffe;
				border: 1px solid rgba(68, 188, 183, 0.5);
			}
			&:nth-of-type(4n) {
				margin-right: 0px;
			}
			> div {
				width: 128px;
				height: 128px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				img {
					height: auto;
					width: 90px;
					/*max-height:110px;*/
				}
			}
			> img {
				height: 50px;
				width: 50px;
			}
			> span {
				font-size: 14px;
				font-weight: 400;
				color: rgba(73, 80, 96, 1);
				margin-top: 14px;
				margin-bottom: 20px;
			}
		}
	}
	.ivu-modal-footer {
		padding: 10px 24px 10px 18px;
	}
}
</style>

<template>
	<div>
		<Modal
			class="avatar-container"
			width="600"
			v-model="avatar"
			:title="$t('classroom_evaluation_921')"
			:mask-closable="false"
			@on-cancel="starCancel"
		>
			<div class="avatar-container-box">
				<div
					class="item not-add"
					v-for="(item,idx) in list"
					:class="{'selected':item.selected}"
					:key="idx"
					@click="select(item,idx)"
				>
					<div>
						<img :src="item.filePath" />
					</div>
				</div>
				<!--                <div @click="toAdd()" class="item" >-->
				<!--                    <img src="../../assets/img/reward-add.png">-->
				<!--                    <span>{{$t('classroom_allscore_52')}}</span>-->
				<!--                </div>-->
			</div>
			<Page
				style="text-align: center"
				:current="pageNo"
				@on-change="pageChange"
				:page-size="pageSize"
				:total="total"
				size="small"
				show-elevator
			/>
			<div slot="footer">
				<Button @click="starCancel">{{$t('classroom_allscore_53')}}</Button>
				<Button type="primary" @click="starOK">{{$t('classroom_allscore_54')}}</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
import valid, { errors, sysAttachment, jxStudent } from "../../libs/request";
import { mapMutations } from "vuex";
export default {
	props: {
		stuList: {
			type: Array,
			default: () => {
				return [];
			}
		}
	},
	data() {
		return {
			avatar: false,
			list: [],
			params: {},
			open: true,
			tmr: null,
			pageNo: 1,
			total: 0,
			pageSize: 12,
			selectImgPath: ""
		};
	},
	mounted() {},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		select(item1, index) {
			this.list.forEach((item, idx) => {
				if (item1.id == item.id) {
					if (item.selected) {
						item.selected = false;
						this.selectImgPath = "";
					} else {
						// this.$set(this.list[idx],'selected',true);
						item.selected = true;
						this.selectImgPath = item.filePath;
					}
				} else {
					// this.$set(this.list[idx],'selected',false)
					item.selected = false;
				}
				this.$set(this.list, idx, item);
			});
		},
		pageChange(pageNo) {
			if (!pageNo) {
				//防止无用重复请求
				return;
			}
			this.selectImgPath = "";
			this.pageNo = pageNo;
			this.getAvatarList();
		},
		show() {
			this.avatar = true;
			this.selectImgPath = "";
			this.pageNo = 1;
			this.getAvatarList();
		},
		getAvatarList() {
			this.updateLoadingStatus({ isLoading: true });
			let params = {};
			params.type = "jx_class_avatar";
			params.pageSize = 12;
			params.pageNo = this.pageNo;
			sysAttachment
				.list(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						this.list = res.data.data.list;
						this.list.forEach((item, idx) => {
							item.selected = false;
						});
						this.total = res.data.data.total;
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		},
		isObject(o) {
			return (
				(typeof o === "object" || typeof o === "function") && o !== null
			);
		},
		deepClone(obj) {
			if (!this.isObject(obj)) {
				throw new Error(this.$t("classroom_allscore_61"));
			}
			let isArray = Array.isArray(obj);
			let cloneObj = isArray ? [] : {};
			for (let key in obj) {
				cloneObj[key] = this.isObject(obj[key])
					? this.deepClone(obj[key])
					: obj[key];
			}
			return cloneObj;
		},
		starCancel() {
			this.avatar = false;
		},
		starOK() {
			if (this.selectImgPath) {
				if (this.open) {
					this.open = false;
					this.params = {};
					this.params.id = this.stuList[0].id;
					this.params.classAvatarPath = this.selectImgPath;
					jxStudent
						.updateClassAvatar(this.params)
						.then(valid.call(this))
						.then(res => {
							if (res.ok) {
								this.$Message.success({
									duration: 2,
									top: 30,
									content: this.$t(
										"classroom_avatar_change_2"
									)
								});
								this.avatar = false;
								this.$emit("getfaList");
								this.open = true;
							}
						})
						.catch(errors.call(this))
						.finally(() => {
							this.updateLoadingStatus({ isLoading: false });
						});
				} else {
					this.tmr = setTimeout(() => {
						this.open = true;
						clearTimeout(this.tmr);
					}, 1000);
				}
			} else {
				this.$Message.warning({
					duration: 2,
					top: 30,
					content: this.$t("classroom_avatar_change_3")
				});
			}
		}
	}
};
</script>
