<template>
    <Modal
        v-model="studentAccontModal"
        :title="$t('modules_spoc_sign_web_src_views_studentaccont_modal_7540')"
        :mask-closable="false"
        width="1100"
        @on-cancel="studentAccontCancel">
        <student-accont ref="studentAccent"></student-accont>
    </Modal>
</template>

<script>
/***
 * 学员账户弹窗
 */
import studentAccont from "./index.vue";
export default {
    name: 'studentAccontModal',
    components: {
        studentAccont,
    },
    data() {
        return {
            studentAccontModal: !true,
        }
    },
    methods: {
        studentAccontCancel() {
            this.$refs.studentAccent.reset()
        },
        show(student) {
            this.studentAccontModal = true;
            this.$refs.studentAccent.init(student)
        }
    }
}
</script>


