<style lang="less">
.tableOut {
	// width: calc(~"100% - 90px");
	width: 100%;
	display: flex;
	.tableRow {
		width: calc(~"100% - 130px");
		.table {
			width: 100%;
			&.ivu-table-wrapper {
				overflow: visible;
				position: relative;
				border: 1px solid #dcdee2;
				border-bottom: 0;
				border-right: 0;
				.ivu-table {
					&:after {
						display: block;
					}
				}
			}
		}
	}
}
</style>
<template>
	<div class="tableOut" v-if="setClassRuleShow">
		<div style="text-align:right;width:130px;padding-right:12px;">{{$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_classruletable_2540')}}</div>
		<div class="tableRow">
			<Table :columns="columns" :data="datas" class="table" border>
				<template slot-scope="{ row, index }" slot="week">
					<Select
						v-model="editweek"
						v-if="(editIndex === index) && weekList && weekList.length"
						:disabled="regular!='per day'?false:true"
					>
						<Option v-for="item in weekList" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
					<span v-else>{{ row.week|filterweek }}</span>
				</template>
				<template slot-scope="{ row, index }" slot="hours">
					<Select
						:placeholder="$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_classruletable_2541')"
						v-model="edithours"
						v-if="(editIndex === index) && Number(productCheckData.num)"
						:value="edithours"
						@on-change="hoursChange(editstartTime,edithours,index)"
					>
						<Option
							v-show="item>0"
							v-for="item in Number(productCheckData.num)"
							:value="''+item"
							:key="item"
						>{{ item }}</Option>
					</Select>
					<span v-else>{{ row.hours }}</span>
				</template>
				<template slot-scope="{ row, index }" slot="startTime">
					<TimePicker
						format="HH:mm"
						type="time"
						style="width:120px;"
						placement="bottom-end"
						:placeholder="$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_classruletable_2542')"
						:editable="false"
						:clearable="false"
						v-model="editstartTime"
						v-if="editIndex === index"
						@on-change="handleChange(editstartTime,edithours,index)"
					></TimePicker>
					<span v-if="editIndex === index" style="margin-left:5px">{{(row.endTime?'-':'')+row.endTime}}</span>
					<span v-else>{{row.startTime+'-'+row.endTime}}</span>
				</template>
				<template slot-scope="{ row, index }" slot="action">
					<div v-if="editIndex === index">
						<a style="margin-right:16px;" @click="handleCancel(index)">{{$t('classroom_allscore_53')}}</a>
						<a @click="handleSave(index)">{{$t('courselist_compontents_servicecontent_215')}}</a>
					</div>
					<div v-else>
						<a @click="handleDel(index)" style="margin-right:16px;">{{$t('classlist_compontents_detailinfo_46')}}</a>
						<a @click="handleEdit(row, index)" style="margin-right:16px;">{{$t('classroom_allscore_51')}}</a>
						<a @click="handleAdd(row, index)">{{$t('importPage_action3')}}</a>
					</div>
				</template>
			</Table>
		</div>
	</div>
</template>
<script>
export default {
	filters: {
		filterweek(val) {
			// if (val == 1) {
			// 	return this.$t('modules_spoc_crm_web_src_views_mycustomer_mycustomer_1425');
			// } else if (val == 2) {
			// 	return this.$t('modules_spoc_crm_web_src_views_mycustomer_mycustomer_1426');
			// } else if (val == 3) {
			// 	return this.$t('modules_spoc_crm_web_src_views_mycustomer_mycustomer_1427');
			// } else if (val == 4) {
			// 	return this.$t('modules_spoc_crm_web_src_views_mycustomer_mycustomer_1428');
			// } else if (val == 5) {
			// 	return this.$t('modules_spoc_crm_web_src_views_mycustomer_mycustomer_1429');
			// } else if (val == 6) {
			// 	return this.$t('modules_spoc_crm_web_src_views_mycustomer_mycustomer_1430');
			// } else if (val == 7) {
			// 	return this.$t('modules_spoc_crm_web_src_views_mycustomer_mycustomer_1424');
            // }
            if (val == 1) {
				return '星期一';
			} else if (val == 2) {
				return '星期二';
			} else if (val == 3) {
				return '星期三';
			} else if (val == 4) {
				return '星期四';
			} else if (val == 5) {
				return '星期五';
			} else if (val == 6) {
				return '星期六';
			} else if (val == 7) {
				return '星期日';
			}
		}
	},
	props: ["regular", "productCheckData"],
	data() {
		return {
			columns: [
				{
					title: this.$t('message_socket_303'),
					width: null,
                    resizable: true,
					slot: "week" //week
				},
				{
					title: this.$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_classruletable_2541'),
					width: null,
                    resizable: true,
					slot: "hours"
				},
				{
					title: this.$t('mycourse_mycourse_377'),
					// width: null,
                    // resizable: true,
					slot: "startTime",
					width: 200
				},
				{
					title: this.$t('classlist_compontents_detailinfo_45'),
					// width: null,
                    // resizable: true,
					slot: "action",
					width: 150
				}
			],
			datas: [],
			editIndex: -1, // 当前聚焦的输入框的行数
			editweek: "", // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
			edithours: "", // 第二列输入框
			editstartTime: "", // 第三列输入框
			isEdit: false,
			setClassRuleShow: false,
			weekList: [
				{
					value: 1,
					label: this.$t('modules_spoc_crm_web_src_views_customer360_components_timetable_tableheader_1053')
				},
				{
					value: 2,
					label: this.$t('modules_spoc_crm_web_src_views_customer360_components_timetable_tableheader_1054')
				},
				{
					value: 3,
					label: this.$t('modules_spoc_crm_web_src_views_customer360_components_timetable_tableheader_1055')
				},
				{
					value: 4,
					label: this.$t('modules_spoc_crm_web_src_views_customer360_components_timetable_tableheader_1056')
				},
				{
					value: 5,
					label: this.$t('modules_spoc_crm_web_src_views_customer360_components_timetable_tableheader_1057')
				},
				{
					value: 6,
					label: this.$t('modules_spoc_crm_web_src_views_customer360_components_timetable_tableheader_1058')
				},
				{
					value: 7,
					label: this.$t('modules_spoc_crm_web_src_views_customer360_components_timetable_tableheader_1059')
				}
			]
		};
	},
	mounted() {},
	methods: {
		isShowTips() {
			this.setClassRuleShow = false;
		},
		EimtaddData(id, regularJson, num) {
			this.setClassRuleShow = true;
			if (id) {
                this.datas = regularJson||[];
                console.log('regularJson', regularJson)
				this.productCheckData.num = num;
				return;
			}
			this.datas = [];
			this.addData();
		},
		addData() {
			this.setClassRuleShow = true;
			let da = {
				week: "",
				hours: this.productCheckData.singleNum,
				startTime: "",
				endTime: ""
			};
			this.datas.push(da);
			this.editweek = ""; // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
			this.edithours = "" + this.productCheckData.singleNum; // 第二列输入框
			this.editstartTime = ""; // 第三列输入框
			this.editIndex = this.datas.length - 1;
			this.isEdit = true;
		},
		handleAdd(row, index) {
			if (!this.isEdit) {
				this.edithours = this.productCheckData.singleNum; // 第二列输入框
				this.addData();
			}
		},
		handleEdit(row, index) {
			this.editweek = row.week;
			this.edithours = row.hours;
			this.editstartTime = row.startTime;
			this.editBirthday = row.birthday;
			if (this.isEdit) {
				this.datas.pop();
			}
			this.editIndex = index;
		},
		handleSave(index) {
			if (this.regular != "per day") {
				if (!this.editweek) {
					this.$Message.error(this.$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_classruletable_2565'));
					return;
				}
			}
			if (this.edithours == false) {
				this.$Message.error(this.$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_classruletable_2566'));
				return;
			} else if (!this.editstartTime) {
				this.$Message.error(this.$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_classruletable_2567'));
				return;
			}
			let lab = this.weekList.filter(item => {
				return item.value == this.editweek;
			})[0];
			this.datas[index].week = this.editweek;
			this.datas[index].hours = this.edithours;
			this.datas[index].startTime = this.editstartTime;
			if (this.isEdit) {
				this.isEdit = false;
			}
			this.editIndex = -1;
			this.$emit("getTableData", this.datas);
		},
		handleCancel(index) {
			if (this.isEdit) {
				this.datas.pop();
				this.isEdit = false;
			}
			this.editIndex = -1;
			if (this.datas.length == 0) {
				this.datas = [];
				this.addData();
			}
		},
		handleDel(index) {
			// debugger;
			if (this.isEdit) {
				this.$Message.error(this.$t('modules_spoc_jw_web_src_views_classmanage_createclass_components_classruletable_2568'));
				return;
			}
			this.datas.splice(index, 1);
			if (this.datas.length == 0) {
				this.datas = [];
				this.addData();
            }
			this.$emit("getTableData", this.datas);
		},
		//在父组件中调用过
		getisEdit() {
			if (this.editIndex < 0) {
				return false;
			} else {
				return true;
			}
		},
		hoursChange(val, hour, index) {
			if (val) {
				this.timeChange(val, hour, index);
			}
		},
		handleChange(val, hour, index) {
			if (hour) {
				this.timeChange(val, hour, index);
			}
		},
		timeChange(val, hour, index) {
			let newTimes = "";
			// hour ? hour : this.productCheckData.singleNum;
			newTimes = hour * this.productCheckData.duration;
			// newTimes = hour * 45;
			let endH = Number(val.split(":")[0]) + Math.floor(newTimes / 60);
			let rightMin = Number(val.split(":")[1]) + (newTimes % 60);
			rightMin >= 60
				? (endH = (endH + 1) % 24) && (rightMin = rightMin % 60)
				: (endH = endH % 24);
			let endTime =
				("" + endH).padStart(2, "0").padEnd(3, ":") +
				("" + rightMin).padStart(2, "0");
			this.datas[index].endTime = endTime;
		}
	}
};
</script>