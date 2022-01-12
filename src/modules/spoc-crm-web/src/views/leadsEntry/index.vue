<style lang="less">
    .leads-in-container{
        width:100%;
        /*padding-bottom:36px;*/
        height:100%;
        overflow: hidden;
        padding-bottom: 32px;
        .fixed-button{
            background: #fff;
            width:100%;
            position: fixed;
            padding:12px 16px 8px;
            bottom:-0px;
            right:0;
            display: flex;
            flex-direction: row;
            justify-content: center;
			box-shadow:0px -1px 3px 0px rgba(0,0,0,0.12);
        }
        .row-common{
            /*padding:32px;*/
            width:100%;
            height: 100%;
            overflow-y: auto;
            /*background: #fff;*/
        }

        .leads-in-box{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: stretch;
            height:calc( ~ "100% - 20px");
            h2{
                font-size:16px;
                font-weight:normal;
                color:rgba(73,80,96,1);
                padding-bottom:16px;
            }
            .add-btn{
                border:1px solid #ccc;
                height:26px;
                width:26px;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                border-radius: 4px;
                cursor: pointer;
                margin-top:4px;
            }
            .rc1{
                flex:1;
                margin-right:16px;
                background: #FFFFFF;
            }
            .links{
                width:354px;
                background: #fff;
                height: 100%;
                overflow-y: auto;
            }
        }
    }

</style>

<template>
    <div class="leads-in-container">
        <div class="leads-in-box">
            <div class="row-common rc1">
                <resourceEntryModal ref="resourceEntryModal" :showLine="showLine" @setTags="setTags" @saveOk="saveOk"></resourceEntryModal>
            </div>
            <div class="links">
                <leadsTag ref="leadsTag"></leadsTag>
            </div>
        </div>
        <div class="fixed-button">
            <Button @click="handleReset('formValidate')" style="margin-right: 16px">{{$t('classroom_clock_87')}}</Button>
            <Button type="primary" @click="handleSubmit('formValidate')">{{$t('courselist_compontents_servicecontent_215')}}</Button>
        </div>

    </div>
</template>

<script>
    import resourceEntryModal from "../../modules/resourceEntryModal";
    import leadsTag from "../../modules/leadsTag.vue";
    export default {
        name: 'crm.leadsEntry',
        components:{
            resourceEntryModal,
            leadsTag
        },
        data () {
            return {
                showLine:'0',
                formValidate: {
                    name:'',
                    enName:'',
                    phone:'',
                    stuPhone:[],
                    gender:'',
                    brithday:'',
                    schoolType:'',
                    schoolGrade:'',
                    schoolName:'',
                    remark:'',
                    record:'',
                },
                ruleValidate: {
                    name: [
                        { required: true, message: this.$t('modules_spoc_crm_web_src_views_leadsentry_index_1344'), trigger: 'change' }
                    ],
                    phone: [
                        { required: true, message: this.$t('modules_spoc_crm_web_src_views_leadsentry_index_1345'), trigger: 'blur' }
                    ],
                },
                custom:true,
                star:true,
            }
        },
        methods: {
            setTags(tags){
                this.$refs['leadsTag'].setTags(tags);
            },
            handleSubmit (name) {
                let tags=this.$refs['leadsTag'].leadsTagIds;
                this.$refs['resourceEntryModal'].saveAll(tags);
            },
            handleReset (name) {
                console.log(this.$refs['resourceEntryModal']);
                this.$refs['resourceEntryModal'].reset();
                this.$refs['leadsTag'].reset();
                // this.$refs[name].resetFields();
                //(new Date(v)).format('yyyy-MM-dd')
            },
            saveOk(){
                this.handleReset();
            }
        }
    }
</script>
