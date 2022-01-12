<style lang="less">
    .white-name{
        .white-name-box{
            width:100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: stretch;
            .wnb-left{
                width:508px;
                height:266px;
                border:1px solid rgba(212,213,218,1);
                .wnb-title{
                    padding:10px 12px;
                }
            }
            .wnb-right{
                width:234px;
                height:266px;
                border:1px solid rgba(212,213,218,1);
                .wnb-right-title{
                    height:52px;
                    padding:0 24px 0 12px;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom:1px solid rgba(212,213,218,1);
                }
            }
        }

    }
    .wnb-table{
        border-left:0!important;
        border-right:0!important;
    }
</style>

<template>
    <Modal
        v-model="whiteName"
        width="800"
        class="white-name"
        title="登记奖励"
        :mask-closable="false">
        <div class="white-name-box">
            <div class="wnb-left">
                <div class="wnb-title">
                    <Select v-model="belongOffice" placeholder="选择归属机构" multiple style="width:140px;margin-right: 8px;">
                        <Option v-for="item in belongOfficeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                    <Select v-model="selRoles" placeholder="选择角色" multiple style="width:140px;margin-right: 8px;">
                        <Option v-for="item in selRolesList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                    <Input v-model="keyWords" placeholder="请输入关键词" style="width: 180px" />
                </div>
                <Table class="wnb-table" :columns="cols" :data="lists"></Table>
            </div>
            <div class="wnb-right">
                <div class="wnb-right-title">
                    <span>已选</span>
                    <a> 清空</a>
                </div>
            </div>
        </div>
        <div slot="footer">
            <Button type="text" size="large" @click="cancel">取消</Button>
            <Button type="primary" size="large" @click="ok">确定</Button>
        </div>
    </Modal>
</template>

<script>
    export default {
        props: {
            lists: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                whiteName:false,
                belongOffice:'',
                selRoles:'',
                keyWords:'',
                belongOfficeList:[],
                selRolesList:[],
                cols:[
                    {
                        title:'姓名',
                        key: 'name',
                    },
                    {
                        title:'归属机构',
                        key: 'belongOffice',
                    },
                    {
                        title:'角色',
                        key: 'roles',
                    },
                ],
            }
        },
        mounted() {

        },
        methods: {
            show() {
                this.whiteName = true
            },
            cancel() {

            },
            ok() {

            },
        },
    }
</script>
