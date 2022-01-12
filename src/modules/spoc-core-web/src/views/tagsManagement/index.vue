<style lang="less">
.tags-container{
    width:100%;
    height:100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    @rad:4px;
    .tags-left{
        width:314px;
        background: #fff;
        height:100%;
        margin-right:16px;
        border-radius: @rad;
    }
    .tags-right{
        flex: 1;
        background: #fff;
        border-radius: @rad;
    }
}
</style>

<template>
    <div class="tags-container">
        <div class="tags-left">
            <leftMenu></leftMenu>
        </div>
        <div class="tags-right">
            <operateBlock></operateBlock>
        </div>
    </div>
</template>

<script>
import leftMenu from "./leftMenu";
import operateBlock from "./operateBlock"
export default {
    components: {
        leftMenu,
        operateBlock
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
