<template>
    <div class="page-data-list">
        <div></div>
        <notFundData />
    </div>
</template>

<script>
import notFundData from '@client/components/notFundData';
export default {
    name: 'h5.pageData',
    components: {
        notFundData
    }
};
</script>

<style scoped>
.page-data-list {
    height: 100%;
}
</style>
