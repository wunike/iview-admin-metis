<style lang="less">
.caseCreate {
	width: 100%;
	background: rgba(255, 255, 255, 1);
	border-radius: 4px;
	padding: 16px;
	.formParent {
		padding-right: 150/19.2vw;
	}
	.labelName {
		height: 20px;
		font-size: 16px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: bold;
		color: #495060;
		line-height: 20px;
		margin-bottom: 20px;
	}
	.formItems {
		display: flex;
		flex-wrap: wrap;
		.ivu-form-item {
			width: 50%;
		}
		.inputs {
			display: flex;
			> div {
				width: 50%;
			}
		}
	}
	.btns {
		display: flex;
		justify-content: center;
	}
	.schoolInfo{
		position: relative;
		.borderBottomLine{
			width:100%;
			margin-left:105px;
			margin-bottom: 20px;
			height: 1px;
			background: rgb(220, 222, 226);
		}
		.schoolAction{
			position: absolute;
			right: -45/19.2vw;
			display: flex;
			&.hasReduce{
				right: -82/19.2vw;
			}
			>div{
				width: 32px;
				height: 32px;
				text-align: center;
				line-height: 30px;
				border: 1px solid rgb(220, 222, 226);
				border-radius: 4px;
				cursor: pointer;
				font-size: 18px;
				margin-right: 5px;
			}
		}
	}
}
</style>
<template>
	<div class="caseCreate">
		<Tabs v-model="caseType" :animated="false" @on-click="changeCaseType">
			<TabPane label="本科" name="l1"></TabPane>
			<TabPane label="本转" name="l2"></TabPane>
			<TabPane label="研究生" name="l3"></TabPane>
			<TabPane label="高中" name="l4"></TabPane>
		</Tabs>
		<div class="formParent">
			<Form
				ref="formValidate"
				:model="formValidate"
				:rules="ruleValidate"
				:label-width="180"
			>
				<div class="labelName">基本信息</div>
				<div class="formItems">
					<FormItem label="学生名称" prop="name">
						<Input
							v-model="formValidate.obj1"
							placeholder="请输入"
						></Input>
					</FormItem>
					<FormItem label="入学季" prop="name">
						<div class="inputs">
							<Input
								v-model="formValidate.obj2"
								placeholder="请输入"
							></Input>
							<Input
								v-model="formValidate.obj2"
								placeholder="请输入"
							></Input>
						</div>
					</FormItem>
					<FormItem label="背景院校1" prop="name">
						<Input
							v-model="formValidate.obj3"
							placeholder="请填写申请时学校"
						></Input>
					</FormItem>
					<FormItem
						label="对应专业"
						prop="name"
						v-if="caseType == 'l2' || caseType == 'l3'"
					>
						<Input
							v-model="formValidate.obj3"
							placeholder=""
						></Input>
					</FormItem>
					<FormItem label="背景院校2" prop="name">
						<Input
							v-model="formValidate.obj4"
							placeholder="如之前有换校，填之前的学校"
						></Input>
					</FormItem>
					<FormItem
						label="对应专业"
						prop="name"
						v-if="caseType == 'l2' || caseType == 'l3'"
					>
						<Input
							v-model="formValidate.obj3"
							placeholder=""
						></Input>
					</FormItem>
				</div>
				<div class="labelName">录取信息</div>
				<div
					class="formItems schoolInfo"
					v-for="(item, index) in formValidate.schools"
					:key="index"
				>
					<div class="schoolAction" :class="{ hasReduce : formValidate.schools.length > 1}">
						<div @click="addSchool" title="新增">+</div>
						<div
						 	title="删除"
							@click="reduceSchool(index)"
							v-show="formValidate.schools.length > 1"
						>
							-
						</div>
					</div>
					<FormItem label="学校名称" prop="name">
						<Input
							v-model="item.schoolName"
							placeholder="请输入"
						></Input>
					</FormItem>
					<FormItem
						label="录取专业"
						prop="name"
						v-if="
							caseType == 'l1' ||
							caseType == 'l2' ||
							caseType == 'l3'
						"
					>
						<Input
							v-model="item.majorName"
							placeholder="请输入"
						></Input>
					</FormItem>
					<FormItem label="录取结果" prop="name">
						<Input
							v-model="item.schoolRes"
							placeholder="请输入"
						></Input>
					</FormItem>
					<FormItem label="录取国家" prop="name">
						<Input
							v-model="item.schoolCountry"
							placeholder="请输入"
						></Input>
					</FormItem>
					<FormItem label="上传案例卡" prop="name">
						<Upload action="//jsonplaceholder.typicode.com/posts/">
							<Button icon="ios-cloud-upload-outline"
								>选择文件</Button
							>
						</Upload>
					</FormItem>
					<div class="borderBottomLine" v-if="index != formValidate.schools.length -1"></div>
				</div>
				<div class="labelName">标化成绩</div>
				<div class="formItems">
					<FormItem
						label="GPA得分"
						prop="name"
						v-if="
							caseType == 'l1' ||
							caseType == 'l3' ||
							caseType == 'l4'
						"
					>
						<Input
							v-model="formValidate.obj1"
							placeholder="请输入"
						></Input>
					</FormItem>
					<FormItem
						label="GPA总分"
						prop="name"
						v-if="
							caseType == 'l1' ||
							caseType == 'l3' ||
							caseType == 'l4'
						"
					>
						<Input
							v-model="formValidate.obj1"
							placeholder="请输入"
						></Input>
					</FormItem>
					<FormItem
						label="本科GPA得分"
						prop="name"
						v-if="caseType == 'l2'"
					>
						<Input
							v-model="formValidate.obj1"
							placeholder="请输入"
						></Input>
					</FormItem>
					<FormItem
						label="本科GPA总分"
						prop="name"
						v-if="caseType == 'l2'"
					>
						<Input
							v-model="formValidate.obj1"
							placeholder="请输入"
						></Input>
					</FormItem>
					<FormItem
						label="高中GPA得分"
						prop="name"
						v-if="caseType == 'l2'"
					>
						<Input
							v-model="formValidate.obj1"
							placeholder="请输入"
						></Input>
					</FormItem>
					<FormItem
						label="高中GPA总分"
						prop="name"
						v-if="caseType == 'l2'"
					>
						<Input
							v-model="formValidate.obj1"
							placeholder="请输入"
						></Input>
					</FormItem>
					<FormItem
						label="TOEFL"
						prop="name"
						v-if="
							caseType == 'l1' ||
							caseType == 'l2' ||
							caseType == 'l3' ||
							caseType == 'l4'
						"
					>
						<Input
							v-model="formValidate.obj1"
							placeholder="请输入"
						></Input>
					</FormItem>
					<FormItem
						label="TOEFL JUNIOR"
						prop="name"
						v-if="caseType == 'l4'"
					>
						<Input
							v-model="formValidate.obj1"
							placeholder="请输入"
						></Input>
					</FormItem>
					<FormItem label="GRE" prop="name" v-if="caseType == 'l3'">
						<Input
							v-model="formValidate.obj1"
							placeholder="请输入"
						></Input>
					</FormItem>
					<FormItem
						label="IELTS"
						prop="name"
						v-if="
							caseType == 'l1' ||
							caseType == 'l2' ||
							caseType == 'l3'
						"
					>
						<Input
							v-model="formValidate.obj1"
							placeholder="请输入"
						></Input>
					</FormItem>
					<FormItem
						label="SAT总分"
						prop="name"
						v-if="
							caseType == 'l1' ||
							caseType == 'l2'
						"
					>
						<Input
							v-model="formValidate.obj1"
							placeholder="请输入"
						></Input>
					</FormItem>
					<FormItem
						label="SAT-阅读"
						prop="name"
						v-if="
							caseType == 'l1' ||
							caseType == 'l2'
						"
					>
						<Input
							v-model="formValidate.obj1"
							placeholder="请输入"
						></Input>
					</FormItem>
					<FormItem
						label="SAT-文法"
						prop="name"
						v-if="
							caseType == 'l1' ||
							caseType == 'l2'
						"
					>
						<Input
							v-model="formValidate.obj1"
							placeholder="请输入"
						></Input>
					</FormItem>
					<FormItem
						label="SAT-数学"
						prop="name"
						v-if="
							caseType == 'l1' ||
							caseType == 'l2'
						"
					>
						<Input
							v-model="formValidate.obj1"
							placeholder="请输入"
						></Input>
					</FormItem>
					<FormItem
						label="IELTS"
						prop="name"
						v-if="
							caseType == 'l4'
						"
					>
						<Input
							v-model="formValidate.obj1"
							placeholder="请输入"
						></Input>
					</FormItem>
					<FormItem label="SSAT" prop="name" v-if="caseType == 'l4'">
						<Input
							v-model="formValidate.obj1"
							placeholder="请输入"
						></Input>
					</FormItem>
					<FormItem label="GMAT" prop="name" v-if="caseType == 'l3'">
						<Input
							v-model="formValidate.obj1"
							placeholder="请输入"
						></Input>
					</FormItem>
					<FormItem
						label="GRE SUBJECT"
						prop="name"
						v-if="caseType == 'l3'"
					>
						<Input
							v-model="formValidate.obj1"
							placeholder="请输入"
						></Input>
					</FormItem>
					<FormItem label="LAST" prop="name" v-if="caseType == 'l3'">
						<Input
							v-model="formValidate.obj1"
							placeholder="请输入"
						></Input>
					</FormItem>
					<FormItem
						label="SAT Sub详情"
						prop="name"
						v-if="caseType == 'l1' || caseType == 'l2'"
					>
						<Input
							v-model="formValidate.obj1"
							placeholder="请输入"
						></Input>
					</FormItem>
					<FormItem
						label="ACT"
						prop="name"
						v-if="caseType == 'l1' || caseType == 'l2'"
					>
						<Input
							v-model="formValidate.obj1"
							placeholder="请输入"
						></Input>
					</FormItem>
					<FormItem
						label="AP详情"
						prop="name"
						v-if="caseType == 'l1' || caseType == 'l2'"
					>
						<Input
							v-model="formValidate.obj1"
							placeholder="请输入"
						></Input>
					</FormItem>
					<FormItem
						label="IB详情"
						prop="name"
						v-if="caseType == 'l1' || caseType == 'l2'"
					>
						<Input
							v-model="formValidate.obj1"
							placeholder="请输入"
						></Input>
					</FormItem>
					<FormItem
						label="A-level详情"
						prop="name"
						v-if="caseType == 'l1' || caseType == 'l2'"
					>
						<Input
							v-model="formValidate.obj1"
							placeholder="请输入"
						></Input>
					</FormItem>
					<FormItem
						label="校内排名"
						prop="name"
						v-if="
							caseType == 'l1' ||
							caseType == 'l2' ||
							caseType == 'l3' ||
							caseType == 'l4'
						"
					>
						<Input
							v-model="formValidate.obj1"
							placeholder="请输入"
						></Input>
					</FormItem>
				</div>
				<div class="labelName">其它背景</div>
				<div class="formItems">
					<FormItem label="突出活动" prop="name">
						<Input
							v-model="formValidate.obj1"
							placeholder="请输入"
						></Input>
					</FormItem>
					<FormItem label="实习或工作" prop="name">
						<Input
							v-model="formValidate.obj1"
							placeholder="请输入"
						></Input>
					</FormItem>
					<FormItem label="科研" prop="name">
						<Input
							v-model="formValidate.obj1"
							placeholder="请输入"
						></Input>
					</FormItem>
					<FormItem label="夏校或交换" prop="name">
						<Input
							v-model="formValidate.obj1"
							placeholder="请输入"
						></Input>
					</FormItem>
				</div>
				<FormItem label="其它突出亮点" prop="name">
					<Input
						v-model="formValidate.obj1"
						type="textarea"
						:autosize="{ minRows: 8, maxRows: 8 }"
						placeholder="请输入"
					></Input>
				</FormItem>
				<FormItem label="文书上传" prop="name">
					<Upload action="//jsonplaceholder.typicode.com/posts/">
						<Button icon="ios-cloud-upload-outline"
							>选择文件</Button
						>
					</Upload>
				</FormItem>
			</Form>
		</div>
		<div class="btns">
			<Button type="primary" @click="createSubmit">提交</Button>
			<Button
				type="primary"
				@click="createSubmit"
				style="margin-left: 12px"
				>提交并送审</Button
			>
		</div>
	</div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import valid, {
	errors,
	common,
	sysUser,
	sysDict,
	sysProps,
	sysCommonSql,
} from "../../libs/request";
import {
	waitUntil,
	DatePickerOpt,
	defaultDatePickerValue,
} from "@public/libs/util";
export default {
	name: "crm.caseCreate",
	data() {
		return {
			caseType: "l1",
			ruleValidate: {},
			formValidate: {
				schools: [
					{
						schoolName: "",
						majorName: "",
						schoolRes: "",
						schoolCountry: "",
					},
				],
				obj1: "",
				obj2: "",
				obj3: "",
				obj4: "",
				obj5: "",
				obj6: "",
				obj7: "",
				obj8: "",
				obj9: "",
				obj10: "",
				obj11: "",
				obj12: "",
				obj13: "",
				obj14: "",
				obj15: "",
				obj16: "",
				obj17: "",
				obj18: "",
				obj19: "",
			},
		};
	},
	computed: {
		...mapState(["app", "buttonPerm", "userInfo"]),
		myButtonPrem() {
			return this.buttonPerm
				? this.buttonPerm["crm.caseManage"] || []
				: [];
		},
	},
	components: {},
	mounted() {},
	methods: {
		reduceSchool(index) {
			this.formValidate.schools.splice(index, 1);
		},
		addSchool() {
			this.formValidate.schools.push({
				schoolName: "",
				majorName: "",
				schoolRes: "",
				schoolCountry: "",
			});
		},
		changeCaseType() {},
		createSubmit() {
			this.$router.push({
				name: "crm.caseManage",
			});
		},
	},
	watch: {
		"app.currOfficeId": function (val, oldVal) {
			if (oldVal && this.$route.name == "crm.caseManage") {
				// this.$set(this.searchObj, "officeId", val=='all'?'':val);
			}
		},
	},
};
</script>
