<style lang="less">
.aa-container{
    height:100%;
    overflow-y: auto;
    overflow-x: hidden;
}
</style>

<template>
    <rolePermission class="aa-container" :noNember="true"></rolePermission>
</template>

<script>
    import rolePermission from '@public/views/rolePermission/index'
export default {
    components: {
        rolePermission
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
