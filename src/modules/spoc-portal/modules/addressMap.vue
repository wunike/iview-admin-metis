<style lang="less">
.address_wrap {
    .address_map {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        .address_input{
            margin-right: 8px;
        }
    }
}
</style>

<template>
    <div class="address_wrap">
        <div class="address_map">
            <Input class="address_input" v-model="info.address" :placeholder="placeholder||'请输入地址'" />
            <Button @click="getMap">地址选择</Button>
        </div>
        <mapModel ref="mapModel" @mapOk="mapOk"></mapModel>
    </div>
</template>

<script>
import mapModel from '@public/modules/mapModel.vue';
export default {
    props: {
        value: {
            type: Object,
        },
        placeholder: String,
        disabled: Boolean
    },
    data() {
        return {
            info:this.value,
        };
    },
    components: {
        mapModel
    },
    methods: {
        getMap() {
            this.$refs.mapModel.modelShow();
        },
        mapOk(keyword, province, city, region, lng, lat) {
            this.info.address = keyword;
            this.info.latLongAddress = lng + ',' + lat;
        }
    },
    watch: {
        info: {
            handler: function(val, oldVal) {
                this.$emit('input', val);
            },
            deep: true
        },
        value: {
            handler: function(val, oldVal) {
                this.info=val;
                console.log(val, oldVal,'value')
            },
            deep: true
        }
    }
};
</script>
