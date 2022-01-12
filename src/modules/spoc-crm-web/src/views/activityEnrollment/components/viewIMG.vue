<style lang="less">
    .view-img{
        /*.ivu-modal-header,.ivu-modal-close{*/
        /*    display: none;*/
        /*}*/
        .title-infos{
            text-align: center;
            padding:0 20px 20px;
            font-size: 14px;
        }
        .close-btn{
            text-align: center;
            padding-top:20px;
            span{
                padding:6px 20px;
                background: #aaa;
                color:#fff;
                font-size: 14px;
                border-radius: 4px;
                cursor: pointer;
            }
        }
        .img{
            text-align: center;
            img{
                width:180px;
                height: auto;
                -webkit-user-drag: none;
            }
        }
    }
</style>

<template>
    <Modal v-model="modal"
           width="600"
           :title="$t('modules_spoc_crm_web_src_views_activityenrollment_components_createevent_623')"
           class="view-img"
           @on-cancel="close"
           :mask-closable="false">
        <div class="title-infos">{{titles}}</div>
        <div class="img" :style="{filter:tableStatus !== undefined?'blur(2px)':status!=$t('modules_spoc_crm_web_src_views_activityenrollment_components_viewimg_740')?'blur(2px)':''}">
            <img :src="imgSrc"/>
        </div>
        <div slot="footer">
            <Button @click="close">{{$t('classroom_allscore_53')}}</Button>
        </div>
    </Modal>
</template>

<script>
    export default {
        props: {

        },
        data() {
            return {
                modal: false,
                imgSrc: "",
                titles:this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_viewimg_742'),
                status:'',
                tableStatus:'',
            }
        },
        methods: {
            show(data,status,tableStatus){
                console.log(status,tableStatus)
                this.status = status
                this.tableStatus = tableStatus
                if(tableStatus!== undefined){
                    this.titles = this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_viewimg_743')
                } else{
                    if(status == this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_viewimg_740')){
                        this.titles = this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_viewimg_742')
                    }else{
                        this.titles = this.$t('modules_spoc_crm_web_src_views_activityenrollment_components_viewimg_743')
                    }
                }
                this.modal = true
                this.imgSrc = data.src? data.src : ''
            },
            close() {
                this.modal=false;
            },
        },
    }
</script>
