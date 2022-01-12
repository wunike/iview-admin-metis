<style lang="less">
.formItemList {
}
</style>

<template>
    <div class="formItemList">
        <Input
            v-model="record.value"
            :type="tprop.type"
            :readonly="tprop.readonly"
            :disabled="tprop.disabled"
            :clearable="tprop.clearable"
            :placeholder="tprop.placeholder"
            :maxlength="tprop.maxlength"
            :showWordLimit="tprop.showWordLimit"
            :rows="tprop.rows"
            :password="tprop.password"
            v-if="record.type == 'input'"
        />
        <RadioGroup v-model="record.value" :vertical="tprop.vertical"  :disabled="tprop.disabled" v-if="record.type == 'radio'">
            <Radio v-for="item in options" :key="item.value" :label="item.value">{{ item.label }}</Radio>
        </RadioGroup>
        <CheckboxGroup v-model="record.value" :vertical="tprop.vertical" :disabled="tprop.disabled" v-if="record.type == 'checkbox'">
            <Checkbox v-for="item in options" :key="item.value" :label="item.value">{{ item.label }}</Checkbox>
        </CheckboxGroup>
        <i-switch v-model="record.value" :disabled="tprop.disabled" v-if="record.type == 'switch'">
            <span slot="open">{{ tprop.slot.open }}</span>
            <span slot="close">{{ tprop.slot.close }}</span>
        </i-switch>
        <Select
            v-model="record.value"
            :transfer="tprop.transfer"
            :multiple="tprop.multiple"
            :disabled="tprop.disabled"
            :clearable="tprop.clearable"
            :filterable="tprop.filterable"
            :placeholder="tprop.placeholder"
            :maxTagCount="tprop.maxTagCount"
            v-if="record.type == 'select'"
        >
            <Option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">{{ item.label }}</Option>
        </Select>
        <Slider
            v-model="record.value"
            :min="tprop.min"
            :max="tprop.max"
            :step="tprop.step"
            :transfer="true"
            :disabled="tprop.disabled"
            :range="tprop.range"
            :show-input="tprop.showInput"
            v-if="record.type == 'slider'"
        ></Slider>
        <DatePicker
            v-model="record.value"
            :type="tprop.type"
            :transfer="tprop.transfer"
            :placeholder="tprop.placeholder"
            :disabled="tprop.disabled"
            :clearable="tprop.clearable"
            :readonly="tprop.readonly"
            v-if="record.type == 'DatePicker'"
        ></DatePicker>
        <TimePicker
            v-model="record.value"
            :type="tprop.type"
            :transfer="tprop.transfer"
            :placeholder="tprop.placeholder"
            :disabled="tprop.disabled"
            :clearable="tprop.clearable"
            :readonly="tprop.readonly"
            v-if="record.type == 'TimePicker'"
        ></TimePicker>
        <Cascader
            v-model="record.value"
            :data="tprop.data"
            :disabled="tprop.disabled"
            :clearable="tprop.clearable"
            :placeholder="tprop.placeholder"
            :trigger="tprop.trigger"
            :filterable="tprop.filterable"
            :transfer="tprop.transfer"
            v-if="record.type == 'cascader'"
        ></Cascader>
        <InputNumber
            v-model="record.value"
            :max="tprop.max"
            :min="tprop.min"
            :step="tprop.step"
            :readonly="tprop.readonly"
            :disabled="tprop.disabled"
            :editable="tprop.editable"
            :precision="tprop.precision"
            v-if="record.type == 'InputNumber'"
        ></InputNumber>
        <Rate
            v-model="record.value"
            :disabled="tprop.disabled"
            :count="tprop.count"
            :allowHalf="tprop.allowHalf"
            :clearable="tprop.clearable"
            :show-text="tprop.showText"
            v-if="record.type == 'rate'"
        />
        <ColorPicker
            v-model="record.value"
            :disabled="tprop.disabled"
            :alpha="tprop.alpha"
            :hue="tprop.hue"
            :recommend="tprop.recommend"
            :transfer="tprop.transfer"
            v-if="record.type == 'ColorPicker'"
        />
        <AddressMap v-model="record.value" :disabled="tprop.disabled" :placeholder="tprop.placeholder" v-if="record.type == 'AddressMap'"></AddressMap>
    </div>
</template>

<script>
export default {
    props: {
        record: {
            type: Object,
            request: true
        }
    },
    data() {
        return {};
    },
    computed: {
        tprop() {
            return this.record.props;
        },
        options() {
            return this.record.options;
        }
    },
    components: {},
    mounted() {},
    methods: {}
};
</script>
