<style lang="less">
    .cost-pop{
        padding-left: 30px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        span{
            color:#999;
            font-size: 14px;
        }
        b{
            color:#999;
            font-size: 14px;
            padding-left: 10px;
        }
    }

</style>

<template>
    <Modal v-model="costModal"
           :title="$t('modules_spoc_crm_web_src_views_activityenrollment_components_poptipcom_732')"
           width="600"
           @on-cancel="cancel"
           :mask-closable="false">
        <div class="cost-pop">
            <span>{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_poptipcom_733')}}</span>
            <Input type="number"  v-model="cost" :placeholder="$t('modules_spoc_crm_web_src_views_activityenrollment_components_poptipcom_734')" style="width: 300px" @on-change="getNum">
                <span slot="append">{{$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_617')}}</span>
            </Input>
        </div>
        <div slot="footer">
            <Button style="margin-left:12px" @click="cancel">{{$t('classroom_allscore_53')}}</Button>
            <Button type="primary"  @click="ok">{{$t('courselist_compontents_servicecontent_215')}}</Button>
        </div>
    </Modal>
</template>

<script>
    export default {
        props:{
            actionName:{
                type: String,
                default: ''
            },
        },
        data() {
            return {
                costModal:false,
                cost:'',
                id:''
            }
        },
        mounted() {

        },

        methods: {
            getNum() {
                this.cost = parseFloat(this.cost).toString().replace(/-\+/ig,'')
            },
            show(data) {
                this.costModal=true
                this.cost = data.val
                this.id = data.id
            },
            cancel() {
                this.costModal = false
                this.cost = ''
                this.id=''
            },
            ok() {
                if(this.cost){
                    this.costModal = false
                    this.$emit('sendData',{cost:parseFloat(this.cost).toFixed(2),id:this.id})
                    this.cost = ''
                    this.id=''
                }else{
                    this.$Message.warning(this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_poptipcom_738'))
                }

            }

        },
    }
</script>
