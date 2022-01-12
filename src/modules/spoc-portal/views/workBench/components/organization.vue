<style lang="less">
.org-container{
    height:100%;
    overflow-y: auto;
    overflow-x: hidden;
    background: #fff;
    padding-left:96px;
    padding-right:249px;
    padding-top:39px;
}
</style>

<template>
    <div class="org-container">
        <newTree ref="newTree"></newTree>
    </div>
</template>

<script>
    import newTree from '../../../../spoc-core-web/src/views/staff/components/newTree'
    export default {
        components: {
            newTree
        },
        data() {
            return {

            }
        },
        mounted() {

        },

        methods: {

        },
    }
</script>
