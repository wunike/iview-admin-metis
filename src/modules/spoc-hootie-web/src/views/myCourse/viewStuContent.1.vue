<style lang="less">
.viewContent {
	position: relative;
	.ivu-modal-body {
		padding-bottom: 6px;
	}
	.p340 {
		width: 340px;
	}
	.p324 {
		width: 324px;
	}
	.fl50 {
		float: left;
		width: 50%;
	}
	.fl100 {
		float: left;
		width: 100%;
	}
	.viewForm {
		overflow: hidden;
	}
	.jxContent1 {
		height: 511px;
	}
	.jxContent {
		position: absolute;
		top: 252px;
		left: 0;
		width: 1000px;
		height: 511px;
		padding: 24px 25px 0;
		background: #f2f3f7;
		.contentTitle {
			width: 465px;
			height: 52px;
			background: rgba(247, 248, 250, 1);
			border-radius: 4px 4px 0px 0px;
			border: 1px solid rgba(230, 231, 235, 1);
			line-height: 52px;
			font-size: 14px;
			text-align: center;
		}
		.contentForm {
			padding: 24px 24px 0 24px;
		}
		.form1 {
			width: 464px;
			display: inline-block;
			margin-right: 22px;
			background: #ffffff;
		}
		.form2 {
			width: 464px;
			display: inline-block;
			background: #ffffff;
		}
	}
}
</style>
<template>
	<div>
		<Modal
			v-model="viewContentModal"
			width="1000"
			:title="$t('mycourse_viewstucontent_442')"
			class="viewContent"
		>
			<div>
				<Form :model="formItem" :label-width="110" class="viewForm">
					<FormItem :label="$t('mycourse_viewstucontent_443')" class="fl100">
						<Input v-model="formItem.input" placeholder="Enter something..." class="p340"></Input>
					</FormItem>
					<FormItem :label="$t('courselist_courselist_223')" class="fl50">
						<Select v-model="formItem.select" class="p340">
							<Option value="beijing">New York</Option>
							<Option value="shanghai">London</Option>
							<Option value="shenzhen">Sydney</Option>
						</Select>
					</FormItem>
					<FormItem :label="$t('messagemanagement_index_355')" class="fl50">
						<Select v-model="formItem.select" class="p340">
							<Option value="beijing">New York</Option>
							<Option value="shanghai">London</Option>
							<Option value="shenzhen">Sydney</Option>
						</Select>
					</FormItem>
					<FormItem :label="$t('classlist_classlist_7')" class="fl100">
						<Input v-model="formItem.input" placeholder="Enter something..." class="p340"></Input>
					</FormItem>
				</Form>
				<div class="jxContent1"></div>
				<div class="jxContent">
					<div class="form1">
						<div class="contentTitle">·English Version</div>
						<div class="contentForm">
							<Form :model="formItem" :label-width="90" class="viewForm">
								<FormItem label="Course Materials:">
									<Input
										v-model="formItem.textarea"
										type="textarea"
										:autosize="{minRows: 3,maxRows: 3}"
										placeholder="Enter something..."
										class="p324"
									></Input>
								</FormItem>
								<FormItem label="Target Objectives:">
									<Input
										v-model="formItem.textarea"
										type="textarea"
										:autosize="{minRows: 3,maxRows: 3}"
										placeholder="Enter something..."
										class="p324"
									></Input>
								</FormItem>
								<FormItem label="Classwork:">
									<Input
										v-model="formItem.textarea"
										type="textarea"
										:autosize="{minRows: 3,maxRows: 3}"
										placeholder="Enter something..."
										class="p324"
									></Input>
								</FormItem>
								<FormItem label="Homework:">
									<Input
										v-model="formItem.textarea"
										type="textarea"
										:autosize="{minRows: 3,maxRows: 3}"
										placeholder="Enter something..."
										class="p324"
									></Input>
								</FormItem>
							</Form>
						</div>
					</div>
					<div class="form2">
						<div class="contentTitle">{{$t('mycourse_viewstucontent_447')}}</div>
						<div class="contentForm">
							<Form :model="formItem" :label-width="90" class="viewForm">
								<FormItem :label="$t('mycourse_viewstucontent_448')">
									<Input
										v-model="formItem.textarea"
										type="textarea"
										:autosize="{minRows: 3,maxRows: 3}"
										placeholder="Enter something..."
										class="p324"
									></Input>
								</FormItem>
								<FormItem :label="$t('mycourse_viewstucontent_449')">
									<Input
										v-model="formItem.textarea"
										type="textarea"
										:autosize="{minRows: 3,maxRows: 3}"
										placeholder="Enter something..."
										class="p324"
									></Input>
								</FormItem>
								<FormItem :label="$t('mycourse_viewstucontent_450')">
									<Input
										v-model="formItem.textarea"
										type="textarea"
										:autosize="{minRows: 3,maxRows: 3}"
										placeholder="Enter something..."
										class="p324"
									></Input>
								</FormItem>
								<FormItem :label="$t('mycourse_viewstucontent_451')">
									<Input
										v-model="formItem.textarea"
										type="textarea"
										:autosize="{minRows: 3,maxRows: 3}"
										placeholder="Enter something..."
										class="p324"
									></Input>
								</FormItem>
							</Form>
						</div>
					</div>
				</div>
			</div>
			<div slot="footer">
				<Button
					type="default"
					size="large"
					:loading="modal_loading"
					@click="del"
				>{{$t('classroom_clock_87')}}</Button>
				<Button
					type="primary"
					size="large"
					:loading="modal_loading"
					@click="del"
				>{{$t('courselist_compontents_servicecontent_215')}}</Button>
			</div>
		</Modal>
	</div>
</template>
<script>
import { mapGetters, mapState, mapMutations } from "vuex";
import valid, {
	errors,
	sysDict,
	jxLesson,
	jxClassCourse
} from "../../libs/request";
export default {
	data() {
		return {
			viewContentModal: false,
			formItem: {}
		};
	},
	methods: {
		MyFutureLesson() {
			let params = {
				queryIndex: 1,
				teacherIds: 31,
				startTime: this.FutureLessonParams.startTime,
				endTime: this.FutureLessonParams.endTime
			};
			jxLesson
				.findMyFutureLesson(params)
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						if (flag) {
							this.MyPastLessonParams.startTime =
								res.data.data.startTime;
							this.MyPastLessonParams.endTime =
								res.data.data.endTime;
						}
						this.FutureLessonParams.startTime =
							res.data.data.startTime;
						this.FutureLessonParams.endTime = res.data.data.endTime;
						let obj = this.recentlyLessons;
						let list = Object.assign(
							{},
							obj,
							res.data.data.lessons
						);
						this.recentlyLessons = list;
						//							this.$set(this,'recentlyLessons',Object.assign(this.recentlyLessons,res.data.data.lessons))
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({
						isLoading: false
					});
				});
		}
	}
};
</script>