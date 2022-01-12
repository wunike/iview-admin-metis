<style lang="less">
.tags-left-menu-container{
    @rad:4px;
    .tlm-title{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding:32px;
        >div{
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: flex-end;
            h2{
                font-size:16px;
                font-family:HiraginoSansGB-W6,HiraginoSansGB;
                font-weight:normal;
                color:rgba(73,80,96,1);
                margin-right:8px;
            }
        }
    }
    .tlm-content{
        width:100%;
        padding:0 16px;
        .item{
            width:100%;
            height:32px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            border-radius: @rad;
            cursor: pointer;
            margin-bottom: 4px;
            &.active{
                background: #DAF2F1;
                cursor: default;
            }

            .opetate{
                height:100%;
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                align-items: center;
            }
            >span{
                margin-left:8px;
                font-size:14px;
                font-family:HiraginoSansGB-W3,HiraginoSansGB;
                font-weight:normal;
                color:rgba(73,80,96,1);
                margin-left:10px;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                b{
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    background: greenyellow;
                    border-radius: 50%;
                    margin-right:8px;
                    margin-top:1px;
                }
            }
        }
    }
}
.create-group{
    .ivu-modal-body{
        padding:24px 24px  4px 24px !important;
    }
}
</style>

<template>
    <div class="tags-left-menu-container">
        <div class="tlm-title">
            <div>
                <h2>{{$t('modules_spoc_core_web_src_views_tagsmanagement_leftmenu_331')}}</h2>
                <Dropdown placement="bottom" @on-click="alterDropdown(data,$event)" inner trigger="click" class="show_more">
                    <a href="javascript:void(0)">
                        <CommonIcon type="_wangxin" :size="14" style="color:#999;"/>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem name="alter">{{$t('modules_spoc_core_web_src_views_tagsmanagement_leftmenu_332')}}</DropdownItem>
                        <DropdownItem name="del">{{$t('modules_spoc_core_web_src_views_tagsmanagement_leftmenu_333')}}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <a href="javascript:void(0)" @click="createGroup = true">{{$t('modules_spoc_core_web_src_views_tagsmanagement_leftmenu_334')}}</a>
        </div>
        <ul class="tlm-content">
            <li
                    class="item"
                    :class="{active:idx == selectd}"
                    v-for="(item,idx) in list"
                    @click="selectItem(item,idx)"
                    :key="idx">
                <span><b></b>{{item.name}}</span>
                <div class="opetate" v-show="idx == selectd">
                    <Icon type="md-lock" size="14" color="#44BCB7" style="margin-right: 12px;cursor: pointer"/>
                    <i class="iconfont icon-bianzu6" style="font-size: 14px;color:#44BCB7;margin-right: 12px;cursor: pointer"></i>
                    <Dropdown placement="bottom" @on-click="alterDropdown(data,$event)" inner trigger="click" class="show_more">
                        <Icon type="ios-more"  size="16" color="#44BCB7" style="margin-right: 12px;cursor: pointer;margin-top:-2px;" />
                        <DropdownMenu slot="list">
                            <DropdownItem name="alter">{{$t('modules_spoc_core_web_src_views_tagsmanagement_leftmenu_335')}}</DropdownItem>
                            <DropdownItem name="del">{{$t('modules_spoc_core_web_src_views_tagsmanagement_leftmenu_336')}}</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </li>
        </ul>
        <Modal v-model="createGroup"
               :title="$t('modules_spoc_core_web_src_views_tagsmanagement_leftmenu_334')"
               width="600"
               class="create-group"
               :mask-closable="false">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="140">
                <FormItem :label="$t('modules_spoc_core_web_src_views_tagsmanagement_leftmenu_337')" prop="name">
                    <Input v-model="formValidate.name" style="width: 306px" :placeholder="$t('modules_spoc_core_web_src_views_tagsmanagement_leftmenu_338')"></Input>
                </FormItem>
                <FormItem :label="$t('modules_spoc_core_web_src_views_tagsmanagement_leftmenu_339')" prop="nature">
                    <RadioGroup v-model="formValidate.nature">
                        <Radio :label="$t('modules_spoc_core_web_src_views_tagsmanagement_leftmenu_340')" style="margin-right:40px;"></Radio>
                        <Radio :label="$t('modules_spoc_core_web_src_views_tagsmanagement_leftmenu_341')"></Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem :label="$t('modules_spoc_core_web_src_views_tagsmanagement_leftmenu_342')" prop="type">
                    <RadioGroup v-model="formValidate.type">
                        <Radio :label="$t('modules_spoc_core_web_src_views_tagsmanagement_leftmenu_343')" style="margin-right:40px;"></Radio>
                        <Radio :label="$t('modules_spoc_core_web_src_views_tagsmanagement_leftmenu_344')"></Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem :label="$t('modules_spoc_core_web_src_views_tagsmanagement_leftmenu_345')" prop="selModal">
                    <CheckboxGroup v-model="formValidate.selModal">
                        <Checkbox :label="$t('modules_spoc_core_web_src_views_tagsmanagement_leftmenu_346')" style="margin-right:20px;"></Checkbox>
                        <Checkbox :label="$t('modules_spoc_core_web_src_views_tagsmanagement_leftmenu_347')" style="margin-right:20px;"></Checkbox>
                        <Checkbox :label="$t('modules_spoc_core_web_src_views_tagsmanagement_leftmenu_348')"></Checkbox>
                    </CheckboxGroup>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" size="large" @click="cancel">{{$t('modules_spoc_core_web_src_views_tagsmanagement_leftmenu_349')}}</Button>
                <Button type="primary" size="large" @click="ok">{{$t('modules_spoc_core_web_src_views_tagsmanagement_leftmenu_350')}}</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import CommonIcon from '_c/common-icon';
export default {
    components: {
        CommonIcon,
    },
    data() {
        return {
            selectd:0,
            createGroup:false,
            list:[
                {
                    name:this.$t('modules_spoc_core_web_src_views_tagsmanagement_leftmenu_351'),
                },
                {
                    name:this.$t('modules_spoc_core_web_src_views_tagsmanagement_leftmenu_352'),
                },
                {
                    name:this.$t('modules_spoc_core_web_src_views_tagsmanagement_leftmenu_353'),
                },
            ],
            formValidate:{
                name:"",
                nature:"",
                type:"",
                selModal:"",
            },
            ruleValidate:{
                name: [
                    {
                        required: true,
                        message: this.$t('modules_spoc_core_web_src_views_tagsmanagement_leftmenu_354'),
                        trigger: 'blur'
                    }, {
                        pattern: /^\w{1,8}$/,
                        message: this.$t('modules_spoc_core_web_src_views_tagsmanagement_leftmenu_338'),
                        trigger: 'blur'
                    }
                ],
            },
        }
    },
    mounted() {

    },

    methods: {
        selectItem(item,idx) {
            this.selectd = idx
        },
        cancel(){
            this.createGroup = false
        },
        ok(){
            this.$refs['formValidate'].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                    this.createGroup = false
                    this.$refs['formValidate'].resetFields()
                } else {
                }
            })

        },
        del(){
            let obj = {
                title:this.$t('modules_spoc_core_web_src_views_tagsmanagement_leftmenu_355'),
                content: this.$t('modules_spoc_core_web_src_views_tagsmanagement_leftmenu_356'),
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
