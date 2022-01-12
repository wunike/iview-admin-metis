<style lang="less">
/**
 * 导出弹窗
 * this.$refs.exportModal.show(data);打开弹窗
 * data为 table 全部的字段，Array 格式
 * 点击确定之后，exportModalOk 方法返回导出的字段，Array 格式
 * @author 曹见芳
 * @date 2019-5-5
 */
.v-export-modal-container{
    @border: 1px solid #E6E7EB;
    @p: 16px;
    .v-export-card{
        border: @border;
    }
    .v-export-title{
        @h: 39px;
        height: @h;line-height: @h;padding-left: @p;padding-right: @p;
        background: #FAFAFA;border-bottom: @border;
    }
    .v-export-title-txt{
        float: left;
        & + .ivu-checkbox-wrapper{
            float: right;
        }
    }
    .v-export-lists{
        height: 310px;overflow-y: auto;
        margin-left: @p;padding-top: 14px;
        .ivu-checkbox-wrapper{
            float: left;width: 50%;margin-right: 0;margin-bottom: 14px;
        }
    }
    .v-export-btns{
        height: 56px;padding: 12px;padding-bottom: 0;
        border-top: @border;
    }
    .fl{
        float: left;
    }
    .fr{
        float: right;
    }
}
.exportIng{
    .ivu-modal-body{
        padding-bottom: 35px;
    }
    .ivu-modal-footer{
        display: none;
    }
}
</style>

<template>
<div>
    <Modal v-model="modal3" width="400" class="exportIng" :closable="false" :mask-closable="false">
        <div>
            <div class="ivu-modal-confirm">
                <div class="ivu-modal-confirm-head">
                    <div class="ivu-modal-confirm-head-icon ivu-modal-confirm-head-icon-info">
                            <i class="ivu-icon ivu-icon-ios-information-circle"></i>
                    </div>
                    <div class="ivu-modal-confirm-head-title">数据导出中...</div>
                </div>
                <div class="ivu-modal-confirm-body">
                    <div>下载成功后将自动关闭，请耐心等待</div>
                </div>
            </div>
        </div>
    </Modal>
    <Modal
        class="v-export-modal-container"
        v-model="modal"
        width="800"
        title="选择导出字段"
        :loading="loading"
        @on-ok="ok"
        @on-cancel="cancel">
        <Row :gutter="14">
            <Col span="12">
                <div class="v-export-card">
                    <div class="v-export-title">
                        <span class="v-export-title-txt">所有字段</span>
                        <Checkbox
                            v-model="checkAllLeft"
                            @on-change="handleCheckAllLeft">
                            全选
                        </Checkbox>
                    </div>
                    <div class="v-export-lists">
                        <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
                            <Checkbox :label="item.name" v-for="item in allKeys" :key="item.name">{{ item.title }}</Checkbox>
                        </CheckboxGroup>
                    </div>
                    <div class="v-export-btns">
                        <Button @click.native.stop="add" class="fr">添加 ></Button>
                    </div>
                </div>
            </Col>
            <Col span="12">
                <div class="v-export-card">
                    <div class="v-export-title">
                        <span class="v-export-title-txt">已选字段</span>
                        <Checkbox v-model="checkAllRight" @on-change="handleCheckedRight">
                            全选
                        </Checkbox>
                    </div>
                    <div class="v-export-lists">
                        <CheckboxGroup v-model="checkedGroup" @on-change="checkedGroupChange">
                            <Checkbox :disabled="item.disabled" :label="item.name" v-for="item in checkedKeys" :key="item.name">{{ item.title }}</Checkbox>
                        </CheckboxGroup>
                    </div>
                    <div class="v-export-btns">
                        <Button @click.native.stop="remove" class="fl">< 移除 </Button>
                    </div>
                </div>
            </Col>
        </Row>
    </Modal>
</div>
</template>

<script>
import valid, { errors, } from "../libs/request";
import util from "../libs/js/util";
export default {
    data(){
        return {
            exportMethod: null,
            modal3: false,
            modal: false,
            checkAllLeft: false, // 所有字段 - name
            checkAllGroup: [], // 所有字段 - 选择的 name 集合
            allKeys: [], // 所有字段
            checkAllRight: false, // 已选字段 - name
            checkedGroup: [], // 已选字段 - 选择的 name 集合
            checkedKeys: [], // 已选字段
            loading: true,
            exportRequestParams: {}, //导出的时候需要传递的参数
        };
    },
    methods: {
        show(data, exportRequestParams) {
            this.exportRequestParams = exportRequestParams
            this.modal = true;
            let _data = JSON.parse(JSON.stringify(data))
            console.log(_data)
            this.getKeys(_data);
        },
        noShowExport(exportMethod,exportRequestParams) {
            this.exportMethod = exportMethod
            this.exportRequestParams = exportRequestParams
            this.ok();
        },
        cancel() {
            this.modal = false;
            this.checkAllLeft = false;
            this.checkAllRight = false;
            this.allKeys = [];
            this.checkAllGroup = [];
            this.checkedGroup = [];
            this.checkedKeys = [];
            this.exportRequestParams = {}
        },
        ok() {
            this.modal3 = true
			this.exportMethod(this.exportRequestParams)
			.then(valid.call(this))
			.then(res => {
				if (res.data) {
                    util.blobDownload(res)
				}
			})
			.catch(errors.call(this))
			.finally(() => {
                setTimeout(()=>{
                    this.modal3 = false
                },1000)
				/* this.updateLoadingStatus({ isLoading: false }); */
			});
            this.cancel();
        },
        //点击左侧全选
        handleCheckAllLeft() {
            if (this.checkAllLeft) {
                this.checkAllGroup = this.allKeys.map(item => { return item.name })
            } else {
                this.checkAllGroup = [];
            }
        },
        //检测左侧是否全选
        checkAllGroupChange(data) {
            // 所有字段 - 单个选择
            if (data.length == this.allKeys.length) {
                this.checkAllLeft = true;
            } else {
                this.checkAllLeft = false;
            }
        },
        //点击右侧全选
        handleCheckedRight() {
            // 已选字段 - 全选复选框
            if (this.checkAllRight) {
                let checkedGroup = []
                this.checkedKeys.forEach(item=>{
                    if(!item.disabled){
                        checkedGroup.push(item.name)
                    }
                })
                this.checkedGroup = checkedGroup
            } else {
                this.checkedGroup = []
            }
        },
        //检测右侧是否全选了非必选项
        checkedGroupChange(data) {
            // 已选字段 - 单个选择
            let checkedGroup = []
            this.checkedKeys.forEach(item=>{
                if(!item.disabled){
                    checkedGroup.push(item.name)
                }
            })
            if (checkedGroup.length == data.length) {
                this.checkAllRight = true;
            } else {
                this.checkAllRight = false;
            }
        },
        getKeys(data) {
            //初始已选字段

            this.checkedKeys = data.true ? data.true.filter(item =>{ return !item.noExport }) : [];
            //初始已选字段为必选。禁用
            this.checkedKeys.map(item=>{ item.disabled = true })
            //初始备选字段
            this.allKeys = data.false ? data.false.filter(item =>{ return !item.noExport }) : []
        },
        add() {
            // 添加
            if(!this.checkAllGroup.length){
                this.$Message.error('请选择字段');
                return;
            }
            let _allKeys = [].concat(this.allKeys)
            _allKeys.forEach((item,index) =>{
                let _index = this.checkAllGroup.indexOf(item.name)
                let _index1 = this.allKeys.indexOf(item.name)
                if(_index > -1){
                    this.checkedKeys.push(item)
                    this.checkAllGroup.splice(_index,1)
                    this.allKeys.splice(_index1,1)
                }
            })
            this.checkAllLeft = false
            this.checkAllRight = false
        },
        remove() {
            // 移除
            if(!this.checkedGroup.length){
                this.$Message.error('请选择字段');
                return;
            }
            let _checkedKeys = [].concat(this.checkedKeys)
            _checkedKeys.forEach((item,index) =>{
                let _index = this.checkedGroup.indexOf(item.name)
                let _index1 = this.checkedKeys.indexOf(item.name)
                if(_index > -1){
                    this.allKeys.push(item)
                    this.checkedGroup.splice(_index,1)
                    this.checkedKeys.splice(_index1,1)
                }
            })
            this.checkAllRight = false
            this.checkAllLeft = false
        },
    },
}
</script>


