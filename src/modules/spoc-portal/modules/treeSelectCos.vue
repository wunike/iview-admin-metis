<style lang="less">
</style>
<template>
    <div class="treeSelectCos" style="width: 224px;">
        <treeselect  
            sortValueBy="INDEX"
            :flat="false"
            :noOptionsText="''"
            :alwaysOpen="false"
            :multiple="true"
            :default-expand-level="defaultExpandLevel"
            :limit='1'
            :limitText="count => `${count}+`"
            :value-consists-of="valueConsistsOf" 
            :placeholder="placeholder" 
            v-model="officeIds" 
            :options="officeIdList">
        </treeselect>
    </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
import { waitUntil, titleTransformationToLabel, getSelectIdsByid, getSelectTreeDataByid } from "@public/libs/util";
import valid, {
    errors,
    sysUser
} from "../libs/request";
export default {
    name: 'treeSelectCos',
    props:{
        placeholder: {
            type: String,
            default: '归属校区'
        },
        defaultExpandLevel: {
            type: Number,
            default: 2
        },
        valueConsistsOf: {
            type: String,
            default: 'ALL_WITH_INDETERMINATE' // ALL、BRANCH_PRIORITY、LEAF_PRIORITY、ALL_WITH_INDETERMINATE
        },
        initData: {
            type: Boolean,
            default: false // 需要加载初始校区数据。如果是false则需要父级赋值。如果一个页面存在多个改组件，不建议设置为true,会多次请求 
        }
    },
    data() {
        return {
            officeIds: [],
            officeIdList: [],
            parentOfficeId: '',
            ininOfficeIdList: [],
        };
    },
    computed: {
        ...mapState(["app", "buttonPerm","calendarConfig"]),
    },
    components: {
        Treeselect
    },
    mounted() {
        if(this.initData){
            waitUntil(
                () => {
                    return this.app.currOfficeId || false;
                },
                () => {
                    this.getTreeDatas()
                }
            );
        }
    },
    methods: {
        getTreeDatas() {
            sysUser.dataScopeFilterTree().then(valid.call(this)).then((res)=>{
                if(res.ok){
                    if(Array.isArray(res.data.data.children)){
                        let officeIdList = res.data.data.children
                        this.parentOfficeId = officeIdList[0].id
                        titleTransformationToLabel(officeIdList)
                        this.ininOfficeIdList = JSON.parse(JSON.stringify(officeIdList))
                        this.officeIdList = JSON.parse(JSON.stringify(officeIdList))
                        this.initOffice()
                    }
                }
            }).catch(errors.call(this)).finally(()=>{
            });
        },
        initOffice() {
            if(this.app.currOfficeId == 'all'|| this.app.currOfficeId == this.parentOfficeId){
                this.officeIds = []
                this.$nextTick(()=>{
                    this.$forceUpdate();
                })
            } else {
                let resultSelectObj = {}
                getSelectTreeDataByid(this.ininOfficeIdList, resultSelectObj);
                let resultIdsObj = {}
                getSelectIdsByid(this.ininOfficeIdList, resultIdsObj)
                this.officeIds = resultIdsObj[this.app.currOfficeId]
                this.$nextTick(()=>{
                    this.$forceUpdate();
                })
            }
            this.$emit('treeSelectOfficeIdsFun', this.officeIds)
        },
    },
    watch: {
    }
};
</script>
