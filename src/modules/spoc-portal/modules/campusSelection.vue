<style lang="less">
.campusSelection {
}
</style>

<template>
    <Select v-model="officeIds" :multiple="multiple" clearable :placeholder="placeholder" class="campusSelection" @on-change="officeIdChange">
        <Option v-for="item in schoolList" :value="item.id" :key="item.id">{{ item.code }}{{ item.name }}</Option>
    </Select>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import valid, { errors, sysUser, sysDict, sysCommonSql, sysConfig } from '../libs/request';
import { waitUntil } from '@public/libs/util';
export default {
    props: {
        placeholder: {
            type: String,
            default: '校区选择'
        },
        value: {},
        multiple: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            officeIds: [],
            schoolList: []
        };
    },
    computed: { ...mapState(['app', 'buttonPerm']) },
    components: {},
    mounted() {
        this.getSchoolList();
    },
    methods: {
        getSchoolList() {
            let params = {};
            sysUser
                .dataScopeFilter(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.schoolList = res.data.data;
                        waitUntil(
                            () => {
                                return !!this.app.currOfficeId;
                            },
                            () => {
                                if (this.multiple) {
                                    this.officeIds = [this.app.currOfficeId].filter(v => v !== 'all');
                                } else {
                                    this.officeIds = this.app.currOfficeId;
                                }
                                this.$emit('input', this.officeIds);
                                this.$emit('officeIdChange', this.officeIds);
                            }
                        );
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
        },
        officeIdChange() {
            this.$emit('input', this.officeIds);
        }
    },
    watch: {
        'app.currOfficeId': function(val, oldVal) {
            if (oldVal) {
                // this.$set(this, 'officeIds', [this.app.currOfficeId].filter(v=>!!v));
                if (this.multiple) {
                    this.officeIds = [this.app.currOfficeId].filter(v => v !== 'all');
                } else {
                    this.officeIds = this.app.currOfficeId;
                }
                                // console.log(this.app.currOfficeId,23232233)
                this.$emit('input', this.officeIds);
                this.$emit('officeIdChange', this.officeIds);
            }
        },
        value: function(val, oldVal) {
            this.officeIds=val;
        }
    }
};
</script>
