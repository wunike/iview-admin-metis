<style lang="less">
    .containContentFind {
        .findArea {
            background:rgba(255,255,255,1);
           
            .ivu-form {
                display: flex;
                align-items: center;
                .ivu-form-item {
                    width:140px;
                    margin-left: 12px;
                    margin-bottom: 0px !important;
                    &:nth-child(1),
                    &:nth-last-child(1) {
                        margin-left: 0px;
                    }
                    .ivu-form-item-content {
                        margin-left: 0px !important;
                    }
                    .roomsmallStyle {
                        display: flex;
                        justify-content: flex-start;
                    }
                }
                .ivu-form-item:nth-child(1) {
                    width:224px;
                    
                }
            }
        }
    }
</style>
<template>
    <div style="background:rgba(240,242,245,1)" class="containContentFind">
        <Card style="box-shadow:0px 0px 0px 0px #e5e5e5;margin-bottom:16px;">
            <div class="findArea">
                <Form ref="formRoomFind" :model="formRoomFind" :rules="ruleRoomFind" :label-width="80">
                    <FormItem prop="officeId">
                        <Select v-model="formRoomFind.officeId" clearable :placeholder="$t('views_room_components_roomfind_616')">
                        <Option v-for="item in roomAreaList1" :value="item.id" :key="item.value">{{ item.name }}</Option>
                    </Select>
                    </FormItem>
                    <FormItem prop="name">
                        <Input v-model="formRoomFind.name" :placeholder="$t('views_room_components_roomfind_617')"></Input>
                    </FormItem>
                    <FormItem prop="type">
                        <Select v-model="formRoomFind.type" clearable :placeholder="$t('views_room_components_roomfind_618')">
                                <Option v-for="item in roomTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                    </FormItem>
                    <FormItem prop="status">
                        <Select v-model="formRoomFind.status" clearable :placeholder="$t('views_room_components_roomfind_619')">
                                <Option v-for="item in roomStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                    </FormItem>
                    <FormItem prop="areaLower">
                        <Input v-model="formRoomFind.areaLower" :placeholder="$t('views_room_components_roomfind_620')" :maxlength="100"></Input>
                    </FormItem>
                    <FormItem prop="areaHigher">
                        <Input v-model="formRoomFind.areaHigher" :placeholder="$t('views_room_components_roomfind_620')" :maxlength="100"></Input>
                    </FormItem>
                    <FormItem>
                        <div class="roomsmallStyle">
                            <Button type="primary" style="margin-left:20px;" @click="findBtn">{{$t('views_room_components_roomfind_621')}}</Button>
                            <Button style="margin-left:6px;" @click="resetFindBtn">{{$t('classroom_clock_87')}}</Button>
                        </div>
                    </FormItem>

                </Form>
            </div>
        </Card>
      
    </div>
</template>
<script>
    import { mapMutations } from 'vuex';
    export default {
        data() {
            // 面积输入正数  可以是小数
            var validateRoombig = function (rule, value, callback) {
                if (!value) {
                    callback();
                }
                else if (/^([0-9]|[0-9]{1,})(\.{0}[0-9]{0}|\.?[0-9]{1,})$/.test(value)) {
                    callback();
                }
                else {
                    return callback(new Error(this.$t('views_room_components_roomfind_623')))
                }
            };
            return {
                //查询区
                formRoomFind: {
                    officeId: '',
                    name: '',
                    type: '',
                    status: '',
                    areaLower: '',
                    areaHigher: '',
                    pageNo: '',
                    pageSize: '',
                },
                ruleRoomFind: {
                    officeId: [
                        { required: false, message: this.$t('views_room_components_roomfind_624'), trigger: 'change' }
                    ],
                    name: [
                        { required: false, message: this.$t('views_room_components_roomfind_624'), trigger: 'change' }
                    ],
                    type: [
                        { required: false, message: this.$t('views_room_components_roomfind_624'), trigger: 'change' }
                    ],
                    status: [
                        { required: false, message: this.$t('views_room_components_roomfind_624'), trigger: 'change' }
                    ],
                    areaLower: [
                        { required: false, validator: validateRoombig, trigger: 'change' }
                    ],
                    areaHigher: [
                        { required: false, validator: validateRoombig, trigger: 'change' }
                    ],
                },
                // roomAreaList: [
                // ],
                roomStatusList: [
                    {
                        value: '0',
                        label: this.$t('views_room_components_roomfind_625')
                    },
                    {
                        value: '1',
                        label: this.$t('views_room_components_roomfind_626')
                    },
                ],
            };
        },
        props: ['roomTypeList','roomAreaList1'],
        created() {
        },
        methods: {
            ...mapMutations(['updateLoadingStatus']),
            findBtn() {
                this.$refs['formRoomFind'].validate((validRes) => {
                     if (validRes) {
                           if ((this.formRoomFind.areaLower != '') && (this.formRoomFind.areaHigher != '')) {
                            if (this.formRoomFind.areaLower > this.formRoomFind.areaHigher) {
                                this.$Message.error(this.$t('views_room_components_roomfind_627'));
                                this.formRoomFind.areaHigher = '';
                                return
                            }
                        }
                        this.$emit('roomFind',this.formRoomFind);
                    } else {
                        this.$Message.error(this.$t('views_room_components_roomfind_628'));
                        this.updateLoadingStatus({ isLoading: false });
                    }
                });
            },
            resetFindBtn() {
                this.$refs.formRoomFind.resetFields();
            },
        },
        mounted() {
        }
    }

</script>