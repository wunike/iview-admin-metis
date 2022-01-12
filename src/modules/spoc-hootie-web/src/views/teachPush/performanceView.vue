<style lang="less">
</style>
<template>
	<div>
		<performances v-if="lessonId && jxStarTpl" :allDisabled="true" :lessonId="lessonId" :jxStarTpl="jxStarTpl"></performances>
	</div>
</template>

<script>
import performances from "./performance.vue";
import { mapMutations } from "vuex";
import valid, { errors, jxLessonStudentRel } from "../../libs/request";

export default {
	name: "hootie.performanceView",
	props:{
		id: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			lessonId: "",
			jxStarTpl: null,
		};
	},
	computed: {},
	components: {
		performances
	},
	created() {},
	mounted() {
		// this.lessonId = this.$route.query.id;
		this.lessonId = this.id;
		this.getLessonDetailInfo();
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		getLessonDetailInfo() {
			//获取默认的评星模板。并且初始的评星数starNum  为0
			this.updateLoadingStatus({ isLoading: true });
			jxLessonStudentRel
				.showStarInfo({
					lessonId: this.lessonId
				})
				.then(valid.call(this))
				.then(res => {
					if (res.ok) {
						let result = res.data.data;
						result.jxStarTplDetailList.forEach(item => {
							item.starNum = 0;
						});
						this.jxStarTpl = result;
						console.log(this.jxStarTpl);
					}
				})
				.catch(errors.call(this))
				.finally(() => {
					this.updateLoadingStatus({ isLoading: false });
				});
		}
	}
};
</script>
