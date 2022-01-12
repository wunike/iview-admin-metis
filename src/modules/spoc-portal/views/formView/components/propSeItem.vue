<style lang="less">
.propSeItem {
    .setItemForm {
        .ivu-form-item-label {
            font-size: 14px;
            font-weight: 700;
        }
        .formItem_box {
            border-bottom: solid 1px #e1e1e1;
            margin-bottom: 20px;
            .control_attr {
                .ivu-form-item {
                    margin-bottom: 8px;
                    .ivu-form-item-label {
                        font-weight: 400;
                    }
                }
            }
            .options_list {
                max-height: 280px;
                overflow: hidden auto;
                padding-left: 4px;
            }
        }
        .ivu-input-number {
            width: 100%;
        }
    }
}
</style>

<template>
    <div class="propSeItem">
        <Form
            ref="formInline"
            :model="formData"
            :rules="formValidate"
            label-colon
            label-position="top"
            class="setItemForm"
        >
            <div class="formItem_box">
                <FormItem label="标题">
                    <Input v-model="formData.title" />
                </FormItem>
            </div>
            <div class="formItem_box">
                <FormItem label="关联字段" prop="field">
                    <Input v-model="formData.field" />
                </FormItem>
            </div>
            <div class="formItem_box" v-if="hasObjKeys(formData.props,'placeholder')">
                <FormItem label="占位文本	">
                    <Input v-model="formData.props.placeholder" />
                </FormItem>
            </div>
            <div class="formItem_box" v-if="hasObjKeys(formData,'options')">
                <FormItem label="选项" required error>
                    <div class="addOptions_box">
                        <a @click="addOptions" v-if="!formData.options.length">自定义选项</a>
                        <a @click="resetOptions" v-else>重置选项</a>
                        <Divider type="vertical" />
                        <a @click="associationDict">关联字典表</a>
                    </div>
                    <div class="options_list">
                        <Row
                            v-for="(item,index) in formData.options"
                            :key="index"
                            style="margin-bottom: 14px;"
                        >
                            <Col span="10">
                                label：
                                <Input
                                    v-model="item.label"
                                    placeholder="label"
                                    style="width: 74px"
                                />
                            </Col>
                            <Col span="10">
                                value：
                                <Input
                                    v-model="item.value"
                                    placeholder="value"
                                    style="width: 74px"
                                />
                            </Col>
                            <Col span="4">
                                <span
                                    style="cursor: pointer;margin-left: 4px;"
                                    @click="addOptions"
                                    v-if="index+1==formData.options.length"
                                >
                                    <Icon type="md-add-circle" color="#44bcb7" size="18" />
                                </span>
                                <span
                                    @click="delItem(index)"
                                    style="cursor: pointer;margin-left:4px;"
                                >
                                    <Icon type="md-close-circle" color="red" size="18" />
                                </span>
                            </Col>
                        </Row>
                    </div>
                </FormItem>
            </div>
            <div class="formItem_box" v-if="hasObjKeys(formData.props,'data')">
                <FormItem label="选项">
                    <div class="addOptions_box">
                        <a @click="addOptions">添加选项</a>
                        <Divider type="vertical" />
                        <a @click="associationDict">关联字典表</a>
                    </div>
                </FormItem>
            </div>
            <div class="formItem_box">
                <FormItem label="控件属性">
                    <div class="control_attr">
                        <FormItem label="文本域默认行数" v-if="hasObjKeys(formData.props,'rows')">
                            <InputNumber :max="10" :min="1" v-model="formData.props.rows"></InputNumber>
                        </FormItem>
                        <Checkbox
                            v-model="formData.props.showWordLimit"
                            v-if="hasObjKeys(formData.props,'showWordLimit')"
                        >显示输入字数统计</Checkbox>
                        <FormItem label="最大输入长度" v-if="hasObjKeys(formData.props,'maxlength')">
                            <InputNumber :max="255" :min="1" v-model="formData.props.maxlength"></InputNumber>
                        </FormItem>
                        <FormItem label="最大值" v-if="hasObjKeys(formData.props,'max')">
                            <InputNumber v-model="formData.props.max"></InputNumber>
                        </FormItem>
                        <FormItem label="最小值" v-if="hasObjKeys(formData.props,'min')">
                            <InputNumber v-model="formData.props.min"></InputNumber>
                        </FormItem>
                        <FormItem label="每次改变的步伐，可以是小数" v-if="hasObjKeys(formData.props,'step')">
                            <InputNumber :min="1" v-model="formData.props.step"></InputNumber>
                        </FormItem>
                        <FormItem label="数值精度	" v-if="hasObjKeys(formData.props,'precision')">
                            <InputNumber :min="0" v-model="formData.props.precision"></InputNumber>
                        </FormItem>
                        <Checkbox
                            v-model="formData.props.vertical"
                            v-if="hasObjKeys(formData.props,'vertical')"
                        >垂直排列</Checkbox>

                        <Checkbox
                            v-model="formData.props.multiple"
                            v-if="hasObjKeys(formData.props,'multiple')"
                        >多选</Checkbox>
                        <Checkbox
                            v-model="formData.props.filterable"
                            v-if="hasObjKeys(formData.props,'filterable')"
                        >可搜索</Checkbox>
                        <FormItem label="标签数量" v-if="hasObjKeys(formData.props,'maxTagCount')">
                            <InputNumber :min="1" v-model="formData.props.maxTagCount"></InputNumber>
                        </FormItem>
                        <Checkbox
                            v-model="formData.props.trigger"
                            :true-value="'hover'"
                            :false-value="'click'"
                            v-if="hasObjKeys(formData.props,'trigger')"
                        >移入展开</Checkbox>
                        <FormItem label="显示类型" v-if="formData.type=='DatePicker'">
                            <Select v-model="formData.props.type">
                                <Option
                                    :value="item.value"
                                    v-for="item in datePickerList"
                                    :key="item.value"
                                >{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="显示类型" v-if="formData.type=='TimePicker'">
                            <Select v-model="formData.props.type">
                                <Option
                                    :value="item.value"
                                    v-for="item in timePickerList"
                                    :key="item.value"
                                >{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="总数" v-if="hasObjKeys(formData.props,'count')">
                            <InputNumber :min="1" v-model="formData.props.count"></InputNumber>
                        </FormItem>
                        <Checkbox
                            v-model="formData.props.showText"
                            v-if="hasObjKeys(formData.props,'showText')"
                        >是否显示提示文字</Checkbox>
                        <Checkbox
                            v-model="formData.props.range"
                            v-if="hasObjKeys(formData.props,'range')"
                        >是否开启双滑块模式</Checkbox>
                        <Checkbox
                            v-model="formData.props.showInput"
                            v-if="hasObjKeys(formData.props,'showInput')"
                        >是否显示数字输入框，仅在单滑块模式下有效</Checkbox>
                    </div>
                </FormItem>
            </div>
            <div class="formItem_box" v-if="hasObjKeys(formData,'validate')">
                <FormItem label="校验">
                    <Checkbox @on-change="setValidate">必填</Checkbox>
                </FormItem>
            </div>
            <div
                class="formItem_box"
                v-if="hasObjKeys(formData.props,'readonly')||hasObjKeys(formData.props,'disabled')||hasObjKeys(formData.props,'clearable')"
            >
                <FormItem label="字段状态">
                    <Checkbox
                        v-model="formData.props.readonly"
                        v-if="hasObjKeys(formData.props,'readonly')"
                    >只读</Checkbox>
                    <br v-if="hasObjKeys(formData.props,'readonly')" />
                    <Checkbox
                        v-model="formData.props.disabled"
                        v-if="hasObjKeys(formData.props,'disabled')"
                    >禁用</Checkbox>
                    <br v-if="hasObjKeys(formData.props,'disabled')" />
                    <Checkbox
                        v-model="formData.props.clearable"
                        v-if="hasObjKeys(formData.props,'clearable')"
                    >清空按钮</Checkbox>
                </FormItem>
            </div>
            <div
                class="formItem_box"
            >
                <FormItem label="字段状态">
                    <Checkbox
                        v-model="formData.props.readonly"
                    >只读</Checkbox>
                </FormItem>
            </div>
        </Form>
        <Modal v-model="dictModal" width="600" class-name="vertical-center-modal">
            <p slot="header">
                <span>新增字典项</span>
            </p>
            <div class="body" transfer>
                <Form ref="dictForms" :model="dictForm" :rules="ruleValidate" :label-width="80">
                    <FormItem label="模块" prop="module">
                        <Select v-model="dictForm.module" @on-change="moduleChange">
                            <Option value="0">公共</Option>
                            <Option
                                :value="item.id"
                                v-for="item in menuList"
                                :key="item.id"
                            >{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="字典项" prop="dictionary">
                        <Select v-model="dictForm.dictionary">
                            <Option
                                :value="item.value"
                                v-for="item in dictionaryList"
                                :key="item.value"
                            >{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button type="primary" @click="saveDict('dictForms')">保存</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import valid, {
    errors,
    SysProps,
    sysDict,
    sysMenu
} from "../../../libs/request";
export default {
    props: {
        formData: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    data() {
        return {
            permission: [],
            dictModal: false,
            dictForm: {
                module: "",
                dictionary: ""
            },
            ruleValidate: {
                module: [
                    { required: true, message: "请选择模块", trigger: "change" }
                ],
                dictionary: [
                    {
                        required: true,
                        message: "请选择字典项",
                        trigger: "change"
                    }
                ]
            },
            menuList: [],
            dictionaryList: [],
            datePickerList: [
                { label: "日期", value: "date" },
                { label: "日期范围", value: "daterange" },
                { label: "日期时间", value: "datetime" },
                { label: "日期时间范围", value: "datetimerange" },
                { label: "年", value: "year" },
                { label: "月", value: "month" }
            ],
            timePickerList: [
                { label: "时间", value: "time" },
                { label: "时间范围", value: "timerange" }
            ],
            formValidate: {
                field: [
                    {
                        required: true,
                        message: "关联字段不能为空",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    computed: {},
    components: {},
    mounted() {
        this.getListMenu();
    },
    methods: {
        getListMenu() {
            let params = {};
            sysMenu
                .listMenu(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.menuList = res.data.data;
                    }
                })
                .catch(errors.call(this));
        },
        hasObjKeys(obj, key) {
            let arr = Object.keys(obj);
            if (arr.indexOf(key) == -1) {
                return false;
            } else {
                return true;
            }
        },
        setValidate(val) {
            if (val) {
                let obj = {
                    required: true,
                    message: `${this.formData.title}不能为空`,
                    trigger: "change"
                };
                if (
                    typeof this.formData.value == "object" &&
                    Array.isArray(this.formData.value)
                ) {
                    obj.type = "array";
                } else if (
                    this.formData.type == "DatePicker" ||
                    this.formData.type == "TimePicker"
                ) {
                    obj.type = "date";
                } else if (typeof this.formData.value == "boolean") {
                    obj.type = "boolean";
                } else if (typeof this.formData.value == "number") {
                    obj.type = "number";
                }
                this.formData.validate.push(obj);
            } else {
                this.formData.validate = this.formData.validate.filter(
                    v => !v.required
                );
            }
        },
        moduleChange(item) {
            let params = {
                type: "root",
                menuId: item || 0
            };
            sysDict
                .DictListDataNew(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.dictionaryList = res.data.data;
                    }
                })
                .catch(errors.call(this));
        },
        saveDict(name) {
            this.$refs[name].validate(ok => {
                if (ok) {
                    let obj = this.dictionaryList.find(
                        v => v.value == this.dictForm.dictionary
                    );
                    this.formData.filtersKey = this.dictForm.dictionary;
                    this.formData.filtersLabel = obj ? obj.label : "--";
                    this.dictModal = false;

                    // this.dictForm = {
                    //     module: '',
                    //     dictionary: ''
                    // };
                    this.handleReset(name);
                    let params1 = {
                        types: this.formData.filtersKey
                    };
                    sysDict
                        .batchListData(params1)
                        .then(valid.call(this))
                        .then(res => {
                            if (res.ok) {
                                let dictTypeObj = res.data.data;
                                this.formData.options =
                                    dictTypeObj[this.formData.filtersKey];
                            }
                        })
                        .catch(errors.call(this))
                        .finally(() => {});
                } else {
                }
            });
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        },
        addOptions() {
            this.formData.options.push({ label: "", value: "" });
        },
        resetOptions() {
            this.formData.options = [];
        },
        associationDict() {
            this.dictModal = true;
            this.resetOptions();
        },
        delItem(index) {
            this.formData.options.splice(index, 1);
        },
        hasKey(val) {
            let arr = Object.keys(this.formData.props);
            if (arr.indexOf(val) == -1) {
                return false;
            } else {
                return true;
            }
        }
    }
};
</script>
