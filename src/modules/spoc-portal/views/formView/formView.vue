<style lang="less">
.formView {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 10px;
    .formView_banner {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
        background: #FFFFFF;
        border-radius: 4px;
        .formView_name {
            font-size: 18px;
            color: #515a6e;
            line-height: 1;
        }
        .formView_operation {
            .save {
                margin-left: 12px;
            }
        }
    }
    .formView_main {
        width: 100%;
        flex: 1;
        margin-top: 10px;
        overflow: hidden;
        border-radius: 4px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }
}
</style>
<template>
    <div class="formView">
        <div class="formView_banner">
            <div class="formView_name">表单设计器</div>
            <div class="formView_operation">
                <Button>预览</Button>
                <Button type="primary" class="save">保存</Button>
            </div>
        </div>
        <div class="formView_main">
            <formControl :formMap="formMap"></formControl>
            <formPreview :formOption="formOptions" :lists="lists" @setSelected="setSelected"></formPreview>
            <formConfig :lists="lists" :formOption="formOptions.form" :formGlobal="formOptions.global" :selectId="selectId"></formConfig>
        </div>
    </div>
</template>

<script>
import formControl from './components/formControl.vue';
import formPreview from './components/formPreview.vue';
import formConfig from './components/formConfig.vue';
import formMaps from './utils/formMap.js';
import formOption from './utils/formOption.js';
export default {
    mixins: [formOption,formMaps],
    data() {
        return {
            lists:[],
            selectId:''
        };
    },
    computed: {},
    components: {
        formControl,
        formPreview,
        formConfig
    },
    mounted() {},
    methods: {
        setSelected(id){
            this.selectId=id;
        }
    }
};
</script>
