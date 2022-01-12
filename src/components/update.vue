<style lang="less">
.update-modal {
    .update_main {
        width: 100%;
        min-height: 205px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        .update_header {
            width: 100%;
            font-size: 18px;
            font-weight: normal;
            color: rgba(73, 80, 96, 1);
            line-height: 27px;
        }
        .update_warn {
            width: 100%;
            padding-top: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 1;
            overflow: auto;
            overflow-x: hidden;
            div{
                width: 100%;
            }
            .update_info_tit {
                padding-top: 16px;
                font-size: 16px;
                color: rgba(73, 80, 96, 1);
                line-height: 22px;
                padding-bottom: 8px;
            }
            .update_info {
                font-size: 14px;
                font-weight: 400;
                color: rgba(73, 80, 96, 1);
                line-height: 22px;
            }
        }
        .update_footer {
            width: 100%;
            padding-top: 16px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }
    }
}
</style>

<template>
    <div class="update_window">
        <Modal v-model="updateModal" width="360" :mask-closable="false" :closable="false" class-name="update-modal" :footer-hide="true">
            <div class="update_main">
                <div class="update_header">版本更新</div>
                <div class="update_warn">
                    <i-circle :percent="downloadPercent" dashboard v-if="isUpdatting">
                        <span class="demo-circle-inner" style="font-size:24px">{{ downloadPercent }}%</span>
                    </i-circle>
                    <div v-else>
                        <div class="update_info">版本：{{ updateInfo.version }}</div>
                        <div class="update_info">大小：{{ size }}M</div>
                        <div class="update_info_tit">详情：</div>
                        <div v-html="warnInfo" class="update_info"></div>
                    </div>
                </div>
                <div class="update_footer" v-if="!isUpdatting">
                    <Button @click="close">取消</Button>
                    <Button type="primary" @click="update" style="margin-left: 10px;">更新</Button>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
import isElectron from 'is-electron';
import valid, { errors, sysDict, sysConfig } from '@public/libs/request';
const log = require('electron-log');
export default {
    name: 'update',
    props: {},
    data() {
        return {
            updateModal: false,
            updateInfo: {},
            downloadPercent: null,
            isUpdatting: false,
            warnInfo: '检查到新的版本，是否更新？'
        };
    },
    computed: {
        size() {
            let num=0;
            if(this.updateInfo.files){
                this.updateInfo.files.forEach(v=>{
                    num+=v.size*1;
                });
            }
            console.log(num);
            return (num/1024/1024).toFixed(2);
        }
    },
    created() {},
    mounted() {
        if (isElectron()) {
            this.downloadPercent = Number(0).toFixed(2);
            const _this = this;
            let ipcRenderer = require('electron').ipcRenderer;
            ipcRenderer.send('checkForUpdate');
            ipcRenderer.on('message', (event, text) => {
                log.debug(arguments);
                alert(text);
            });
            ipcRenderer.on('updateIsNew', (event, info) => {
                _this.updateInfo = info;
                log.warn(info)
                let params = {
                    menuId: 0,
                    configId: 'bese:version:content'
                };
                sysConfig
                    .getConfig(params)
                    .then(valid.call(_this))
                    .then(res => {
                        if (res.ok) {
                            _this.warnInfo = res.data.data.content;
                            _this.updateModal = true;
                        }
                    })
                    .catch(errors.call(_this))
                    .finally(() => {});
            });
            ipcRenderer.on('updateError', (event, err) => {
                _this.warnInfo = '检查更新出错';
                _this.downloadPercent = Number(0).toFixed(2);
                _this.isUpdatting = false;
            });
        }
    },
    methods: {
        close() {
            this.updateModal = false;
        },
        update() {
            let _this = this;
            this.isUpdatting = true;
            let ipcRenderer = require('electron').ipcRenderer;
            ipcRenderer.send('downloadUpdate');
            // 注意："downloadProgress”事件可能存在无法触发的问题，只需要限制一下下载网速就好
            ipcRenderer.on('downloadProgress', (event, progressObj) => {
                _this.downloadPercent = progressObj.percent.toFixed(2) || 0;
                if (Math.trunc(_this.downloadPercent) === 100) {
                    ipcRenderer.on('isUpdateNow', function() {
                        ipcRenderer.send('isUpdateNow');
                    });
                }
            });
        }
    }
};
</script>
