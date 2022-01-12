<template>
    <el-form-item label="选择页面字段：">
        <div class="userTargetInner" style="display:flex;align-items:center;min-height:33px;">
            <el-tag v-for="(item, index) in valSelect" :key="index" style="margin:2px">{{ item.name }}</el-tag>
            <i class="el-icon-edit-outline" :style="{ marginLeft: valSelect.length ? '9px' : '', cursor: 'pointer' }" @click="showPageFields" />
            <pageFields :ruleList="tempValue" ref="pageFieldRef"></pageFields>
        </div>
    </el-form-item>
</template>

<script>
import pageFields from '@client/components/pageFields';
import valid, { errors, SysProps, common, report, api } from '@client/service/request.js';

export default {
    name: 'attr-qk-ruleList',
    props: {
        ruleList: {
            type: Array,
            defaultL: () => {
                return [];
            }
        }
    },
    data() {
        return {
            tempValue: []
        };
    },
    components: {
        pageFields
    },
    computed: {
        valSelect() {
            return this.tempValue.filter((item, index) => {
                return item.editable == '1';
            });
        }
    },
    mounted() {
        this.tempValue = this.ruleList;
        this.getRules();
    },
    methods: {
        showPageFields() {
            this.$refs.pageFieldRef.show();
        },
        getRules() {
            if (!this.tempValue.length) {
                let tenant = localStorage.getItem('tenant');
                let token = localStorage.getItem('token');
                // this.$axios
                //     .get('/api/common/a/ws/sys/props/list', { tableName: 'crm_customer', isFitPhone: '1' }, 'default', { tenant, token })
                //     .then(res => {
                //         console.log(res.data);
                //         this.tempValue = res.data;
                //     })
                //     .catch(() => {
                //         // this.loading = false;
                //     });

                SysProps.list({ tableName: 'crm_customer', isFitPhone: '1' })
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            this.tempValue = res.data.data;
                        }
                    })
                    .catch(errors.call(this))
                    .catch(() => {})
                    .finally(() => {});
            }
        }
    },
    watch: {
        ruleList(val) {
            this.tempValue = val;
        },
        tempValue() {
            console.log('update:ruleList')
            this.$emit('update:ruleList', this.tempValue);
        }
    }
};
</script>

<style scoped>
.userTargetInner {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    > span {
        display: inline-block;
        font-size: 12px;
        color: rgba(73, 80, 96, 1);
        background: rgba(235, 236, 240, 1);
        border-radius: 4px;
        padding: 0px 12px;
        margin-right: 8px;
        margin-top: 2px;
    }
}
.el-form-item {
    margin-bottom: 10px;
}
</style>
