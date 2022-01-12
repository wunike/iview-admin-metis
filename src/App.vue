<style lang="less">
.errorPageF {
    /* width:100%;
        height:100%;
        background-color:#000;
        position: fixed;
        z-index: 999;
        .errorContent{
            background-color: #F00;
            width: 100px;
            height: 100px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
        } */
}
</style>
<template>
    <div id="app" style="height: 100%;">
        <div class="loadingView" v-show="show" :style="loadingStyle">
            <div class="loadingViewFrame">
                <div class="loadingBox1 loadingBox"></div>
                <div class="loadingBox2 loadingBox"></div>
                <div class="loadingBox4 loadingBox"></div>
                <div class="loadingBox3 loadingBox"></div>
            </div>
        </div>
        <Update></Update>
        <!-- <div v-show="showErrorStatu" class="errorPageF">
            <div class="errorContent">

            </div>
        </div> -->
        <router-view></router-view>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import Update from '_c/update.vue';
import theme from '@public/libs/js/theme.js';

// import '@public/libs/js/theme.js';
export default {
    mixins:[theme],
    components: { Update },
    created() {
    },
    mounted() {
    },
    beforeDestroy() {
        // this.$electron.ipcRenderer.removeAll(["message", "downloadProgress", "isUpdateNow"]);
    },
    data() {
        return {
            // theme: this.$store.state.app.themeColor,
            // percent: 0,
            // show: false
        };
    },
    // mounted() {
    //   //更新进度
    //   ipcRenderer.on('downloadProgress', (event, data) => {
    //
    //     this.percent = (data.percent).toFixed(2);
    //     if (data.percent >= 100) {
    //       // this.show = false;
    //     }
    //   });
    //
    //   /**
    //    * 主进程返回的检测状态
    //    */
    //   ipcRenderer.on('message', (event, data) => {
    //     switch (data.status) {
    //       case -1:
    //         this.$Message.error(data.msg);
    //         break;
    //       case 0:
    //         this.$Message.loading(data.msg);
    //         break;
    //       case 1:
    //         this.show = true;
    //         break;
    //     }
    //   });
    //   // this.updateApp();
    // },
    // // methods: {
    // //   updateApp() {
    // //     log.debug('updateApp')
    // //     ipcRenderer.send('checkForUpdate')
    // //   }
    // // },
    computed: {
        ...mapState(['isLoading', 'loadingBg', 'showError']),
        loadingStyle() {
            if (this.loadingBg) {
                return { backgroundColor: this.loadingBg };
            }
            return {};
        },
        show() {
            return this.isLoading || this.loadingBg;
        },
        showErrorStatu() {
            return this.showError;
        }
    }
};
</script>
