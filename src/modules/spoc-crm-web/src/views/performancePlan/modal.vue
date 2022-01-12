<style lang="less">
.performance-plan-modal-container {
    .ivu-form .ivu-form-item-label {
        font-size: 14px;
        color: #999;
    }
    .ivu-form-item-content,
    .ivu-input-group-append,
    .ivu-input-group-prepend,
    .ivu-input {
        font-size: 14px;
    }
    .ivu-input-group-append,
    .ivu-input-group-prepend {
        width: 44px;
    }
}
</style>

<template>
    <div>
        <Modal class="performance-plan-modal-container" v-model="editModal" title="修改" width="600">
            <Form ref="editItemRef" :model="editItem" :rules="ruleItem" :label-width="136">
                <FormItem label="销售顾问：" prop="objectName" v-if="type == 'sales consultant'">
                    <span>{{ editItem.objectName }}</span>
                </FormItem>
                <FormItem label="归属校区：" prop="officeName" v-if="type == 'sales consultant'">
                    <span>{{ editItem.officeName }}</span>
                </FormItem>
                <FormItem label="校区：" prop="objectName" v-else>
                    <span>{{ editItem.objectName }}</span>
                </FormItem>
                <FormItem label="时间范围：" prop="timeScope">
                    <!-- <DatePicker type="year" :value="editItem.year" style="width: 200px"></DatePicker> -->
                    <DatePicker type="month" format="yyyy年MM月" :value="editItem.timeScope" style="width: 306px"></DatePicker>
                </FormItem>
                <FormItem
                    v-for="item in showClo"
                    :key="item.name"
                    :label="item.title + '：'"
                    :prop="item.name"
                    v-if="item.selected == '1'"
                    :rules="
                        item.name.indexOf('Price') != -1
                            ? [
                                  {
                                      required: true,
                                      type: 'number',
                                      pattern: /^(([1-9][0-9]{0,14})|([0]{1})|(([0]\\.\\d{1,2}|[1-9][0-9]{0,14}\\.\\d{1,2})))$/,
                                      message: '请输入金额',
                                      trigger: 'blur',
                                      transform(value) {
                                          return Number(value);
                                      }
                                  }
                              ]
                            : [
                                  {
                                      required: true,
                                      type: 'number',
                                      message: '请输入个数',
                                      trigger: 'blur',
                                      transform(value) {
                                          return Number(value);
                                      }
                                  }
                              ]
                    "
                >
                    <InputNumber
                        :min="0"
                        v-model="editItem[item.name]"
                        style="width: 306px"
                        :formatter="value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                        :parser="value => value.replace(/\¥\s?|(,*)/g, '')"
                        v-if="item.name.indexOf('Price') != -1"
                    ></InputNumber>
                    <div v-else>
                        <InputNumber :min="0" v-model="editItem[item.name]" style="width: 306px"></InputNumber>
                        个
                    </div>
                </FormItem>
            </Form>

            <div slot="footer">
                <Button @click="cancelOffice" :loading="loading">取消</Button>
                <Button type="primary" @click="submitOffice" :loading="loading">保存</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
/**
 ** @author: 曹见芳
 ** 业绩计划 - 弹窗
 */
import valid, { errors, sysUser, sysDict, crmReferral, sysConfig, crmPlan } from '../../libs/request';
export default {
    data() {
        return {
            loading: false,
            type: 'office',
            editModal: false,
            editItem: {
                objectName: '',
                officeName: '',
                // year: '2020',
                timeScope: '',
                num: null,
                person: null
            },
            showClo: [],
            ruleItem: {
                timeScope: [{ required: true, type: 'date', message: '请选择', trigger: 'change' }]
                // signPricePlan: [
                //     // { required: true,type: 'number', message: '请输入', trigger: 'blur' },
                //     {required: true,type: 'number',pattern: /^(([1-9][0-9]{0,14})|([0]{1})|(([0]\\.\\d{1,2}|[1-9][0-9]{0,14}\\.\\d{1,2})))$/,message: '请输入金额',trigger: 'blur',transform(value) {return Number(value);}}
                // ],
                // oppPlan: [
                //     // { required: true,type: 'number', message: '请输入', trigger: 'blur' },
                //     {required: true,type: 'number',message: '请输入个数',trigger: 'blur',transform(value) {return Number(value);}}
                // ]
            }
        };
    },
    methods: {
        showOfficeModal(obj) {
            let { tabaleTabs, showClo, row,timeScope } = obj;
            // debugger
            this.editItem = Object.assign({}, row);
            this.editItem.timeScope = new Date(timeScope);
            this.type = tabaleTabs;
            this.showClo = showClo;
            // console.log(tabaleTabs, row)
            this.editModal = true;
        },
        submitOffice() {
            this.$refs.editItemRef.validate(ok => {
                if (ok) {
                    this.loading = true;
                    let params = Object.assign({}, this.editItem);
                    let planObj = {};

                    this.showClo.forEach(v => {
                        if(v.name){
                            planObj[v.name] = Number(params[v.name])||0;
                        }
                    });
                    params.plan = JSON.stringify(planObj);
                    params.timeScope = new Date(this.editItem.timeScope).format('yyyy-MM');
                    params.objectType = this.type;
                    params.period = 'month';
                    crmPlan
                        .save(params)
                        .then(valid.call(this))
                        .then(res => {
                            if (res.ok) {
                                this.cancelOffice();
                                this.$emit('saveOk');
                            } else {
                            }
                        })
                        .catch(errors.call(this))
                        .finally(() => {
                            this.loading = false;
                        });
                }
            });
        },
        cancelOffice() {
            this.$refs.editItemRef.resetFields();
            this.editModal = false;
        },
        changeLoading() {
            this.loading = false;
            setTimeout(() => {
                this.loading = true;
            }, 0);
        }
    }
};
</script>
