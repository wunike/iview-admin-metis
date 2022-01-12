<style lang="less">
.optb-container{
    width: 100%;
    .optb-c-title{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        padding:32px;
        >b{
            display: inline-block;
            width: 16px;
            height: 16px;
            background: greenyellow;
            border-radius: 50%;
            margin-right:8px;
            margin-top:1px;
        }
        >span{
            margin-left:8px;
            font-size:14px;
            font-family:HiraginoSansGB-W3,HiraginoSansGB;
            font-weight:normal;
            color:rgba(73,80,96,1);
            margin-right:22px;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
        }
        a{
            margin-right: 32px;
        }
    }
    .tags-block{
        width: 100%;
        padding:0 32px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        .item{
            border:1px solid #D4D5DA;
            height:32px;
            width:160px;
            padding-right: 14px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            border-radius:4px;
            margin-right: 24px;
            >span{
                display: inline-block;
                width: 130px;
                text-align: center;
                font-size: 14px;
                color:#495060;
            }
        }
    }
}
</style>

<template>
    <div class="optb-container">
        <div class="optb-c-title">
            <b></b><span>{{$t('modules_spoc_core_web_src_views_tagsmanagement_operateblock_357')}}</span> <a href="javascript:void(0)" @click="createTag = true">{{$t('modules_spoc_core_web_src_views_tagsmanagement_operateblock_358')}}</a> <Checkbox v-model="mult">{{$t('modules_spoc_core_web_src_views_tagsmanagement_operateblock_359')}}</Checkbox>
        </div>
        <ul class="tags-block">
            <li class="item">
                <span>{{$t('modules_spoc_core_web_src_views_tagsmanagement_operateblock_360')}}</span>
                <Dropdown placement="bottom" @on-click="alterDropdown(data,$event)" inner trigger="click" class="show_more">
                    <a href="javascript:void(0)">
                        <Icon type="ios-arrow-down"  size="14" color="#999999"/>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem name="alter">{{$t('modules_spoc_core_web_src_views_tagsmanagement_operateblock_361')}}</DropdownItem>
                        <DropdownItem name="del">{{$t('modules_spoc_core_web_src_views_tagsmanagement_operateblock_362')}}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </li>
        </ul>
        <Modal v-model="createTag"
               :title="$t('modules_spoc_core_web_src_views_tagsmanagement_operateblock_358')"
               width="600"
               class="create-group"
               :mask-closable="false">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="140">
                <FormItem :label="$t('modules_spoc_core_web_src_views_tagsmanagement_operateblock_363')" prop="name">
                    <Input v-model="formValidate.name" style="width: 306px" :placeholder="$t('modules_spoc_core_web_src_views_tagsmanagement_operateblock_364')"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" size="large" @click="cancel">{{$t('modules_spoc_core_web_src_views_tagsmanagement_operateblock_365')}}</Button>
                <Button type="primary" size="large" @click="ok">{{$t('modules_spoc_core_web_src_views_tagsmanagement_operateblock_366')}}</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    components: {

    },
    data() {
        return {
            mult:false,
            createTag:false,
            formValidate:{
                name:"",
            },
            ruleValidate:{
                name: [
                    {
                        required: true,
                        message: this.$t('modules_spoc_core_web_src_views_tagsmanagement_operateblock_367'),
                        trigger: 'blur'
                    }, {
                        pattern: /^\w{1,8}$/,
                        message: this.$t('modules_spoc_core_web_src_views_tagsmanagement_operateblock_364'),
                        trigger: 'blur'
                    }
                ],
            },
        }
    },
    mounted() {

    },

    methods: {
        cancel(){
            this.createTag = false
        },
        ok(){
            this.$refs['formValidate'].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                    this.createTag = false
                    this.$refs['formValidate'].resetFields()
                } else {

                }
            })
        },
        del(){
            let obj = {
                title:this.$t('modules_spoc_core_web_src_views_tagsmanagement_operateblock_368'),
                content: this.$t('modules_spoc_core_web_src_views_tagsmanagement_operateblock_369'),
                onOk:() => {

                },
                onCancel:() => {

                }
            }
            this.$Modal.confirm(obj)
        },
    },
}
</script>
