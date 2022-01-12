<style lang="less"></style>
<template>
    <div>
        <Modal v-model="openModal" :title="$t('modules_spoc_sign_web_src_views_contractmanage_components_exportinovicemodal_5627')" width="480">
            <div style="over-flow:hidden;">
                <span style="color:#b8b8b8;">{{ $t('modules_spoc_sign_web_src_views_contractmanage_components_exportinovicemodal_5628') }}</span>
                <DatePicker
                    separator=" ~ "
                    :placeholder="$t('modules_spoc_core_web_src_views_staff_components_staffdynamic_302')"
                    type="daterange"
                    @on-change="dateChange"
                    v-model="daterange"
                ></DatePicker>
                <Tooltip :content="$t('modules_spoc_sign_web_src_views_contractmanage_components_exportinovicemodal_5630')" placement="top">
                    <Icon type="ios-information-circle-outline" size="20" style="margin: 0 5px;color: rgb(255, 170, 73);" />
                </Tooltip>
                <Button type="primary" @click="exportAllInvoive">{{ $t('modules_spoc_sign_web_src_views_contractmanage_components_exportinovicemodal_5631') }}</Button>
            </div>
            <div slot="footer">
                <Button type="primary" size="large" @click="ok">{{ $t('classroom_allscore_54') }}</Button>
            </div>
        </Modal>
        <export-modal ref="exportModal"></export-modal>
    </div>
</template>
<script>
import { mapGetters, mapState, mapMutations } from 'vuex';
import valid, { errors, invoice } from '../../../libs/request';
import exportModal from "@public/modules/exportModal.vue";
export default {
    data() {
        return {
            openModal: false,
            daterange: [],
            exportStartDate: '',
            exportEndDate: ''
        };
    },
    components: {
        exportModal
    },
    methods: {
        dateChange(val) {
            console.log(val);
            this.exportStartDate = val[0] ? val[0] + ' 00:00:00' : '';
            this.exportEndDate = val[1] ? val[1] + ' 23:59:59' : '';
        },
        ok() {
            let obj = {
                startTime: this.exportStartDate,
                endTime: this.exportEndDate
            };
            this.$refs.exportModal.noShowExport(invoice.exportInovice, obj);
            // let downDom=document.createElement('a');
            // // let href=document.createAttribute('href');
            // // href.value=invoice.exportInovice(obj);
            // downDom.setAttribute('href',invoice.exportInovice(obj));
            // downDom.setAttribute('download',invoice.exportInovice(obj));
            // downDom.click();
            // // window.open(invoice.exportInovice(obj));
            // this.daterange = [];
            // this.exportStartDate = '';
            // this.exportEndDate = '';
            // this.openModal = false;
        },
        exportAllInvoive() {
            let obj = {
                startTime: '',
                endTime: ''
            };
            this.$refs.exportModal.noShowExport(invoice.exportInovice, obj);
            // let downDom=document.createElement('a');
            // downDom.setAttribute('href',invoice.exportInovice(obj));
            // downDom.setAttribute('download',invoice.exportInovice(obj));
            // downDom.click();
            // this.daterange = [];
            // this.exportStartDate = '';
            // this.exportEndDate = '';
            // this.openModal = false;
        }
    }
};
</script>
