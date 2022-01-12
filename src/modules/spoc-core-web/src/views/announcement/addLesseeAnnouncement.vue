<style lang="less">
.add-announcement-container{
    .ivu-form{
        margin-bottom: -20px;
    }
}
</style>
    
<template>
<div>
    <Modal
        v-model="modal"
        :title="title"
        :loading="loading"
        className="add-announcement-container"
        width="620"
        @on-cancel="cancel">
        <Form ref="newAnnouncement" :model="newAnnouncement" :rules="ruleValidate" label-position="right" :label-width="120">
            <FormItem :label="$t('modules_spoc_core_web_src_views_announcement_addlesseeannouncement_71')" prop="title">
                <Input v-model="newAnnouncement.title" style="width: 452px;" :placeholder="$t('modules_spoc_core_web_src_views_announcement_addlesseeannouncement_72')"/>
            </FormItem>
            <FormItem :label="$t('modules_spoc_core_web_src_views_announcement_addlesseeannouncement_73')" prop="content">
                <!-- <Input v-model="newAnnouncement.content" style="width: 452px;" type="textarea" :placeholder="$t('modules_spoc_core_web_src_views_announcement_addlesseeannouncement_72')"/> -->
                <editor v-if="$route.name == 'core.lesseeAnnouncement'" :id="addLesseeAnnouncementEditor" ref="addLesseeAnnouncementEditor"></editor>
            </FormItem>
            <FormItem :label="$t('modules_spoc_core_web_src_views_announcement_addlesseeannouncement_74')" prop="officeIdList">
                <Select v-model="newAnnouncement.officeIdList" 
                    @on-change="changeOfficeId" 
                    multiple 
                    style="width: 420px;margin-right: 10px;" 
                    clearable 
                    :placeholder="$t('modules_spoc_core_web_src_views_announcement_addlesseeannouncement_75')">
                    <Option v-for="item in officeLists" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
                <Checkbox v-model="allOfficeId" @on-change="changeAllOfficeId"></Checkbox>
            </FormItem>
            <FormItem :label="$t('modules_spoc_core_web_src_views_announcement_addlesseeannouncement_76')" prop="roleIdList">
                <Select v-model="newAnnouncement.roleIdList" 
                    @on-change="changeRoleId" 
                    multiple 
                    style="width: 420px;margin-right: 10px;" 
                    clearable 
                    :placeholder="$t('modules_spoc_core_web_src_views_announcement_addlesseeannouncement_75')">
                    <Option v-for="item in roleList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
                <Checkbox v-model="allRoleId" @on-change="changeAllRoleId"></Checkbox>
            </FormItem>
        </Form>
        <div slot="footer">
            <Button @click="cancel">{{$t('modules_spoc_core_web_src_views_announcement_addlesseeannouncement_77')}}</Button>
            <!-- <Button type="primary" @click="send('2')">{{$t('modules_spoc_core_web_src_views_announcement_addlesseeannouncement_78')}}</Button> -->
            <Button type="primary" @click="send('1')">{{$t('modules_spoc_core_web_src_views_announcement_addlesseeannouncement_79')}}</Button>
            <Button type="primary" @click="send('0')">{{$t('modules_spoc_core_web_src_views_announcement_addlesseeannouncement_80')}}</Button>
        </div>
    </Modal>
    <Modal
        v-model="setTimeModal"
        :title="$t('modules_spoc_core_web_src_views_announcement_addlesseeannouncement_81')"
        width="600"
        :loading="setTimeLoading"
        @on-ok="setTimeOk"
        @on-cancel="setTimeCancel">
        <Form ref="setTimeRef" label-position="right" :model="setTimeData" :rules="setTimeValidate" :label-width="156">
            <FormItem :label="$t('modules_spoc_core_web_src_views_announcement_addlesseeannouncement_82')" required prop="setTime">
                <DatePicker type="date" :options="options" v-model="setTimeData.setTime" :placeholder="$t('modules_spoc_core_web_src_views_announcement_addlesseeannouncement_75')" style="width: 452px"></DatePicker>
            </FormItem>
        </Form>
    </Modal>
</div>
</template>

<script>
/**
 ** @author: 曹见芳
 ** 弹窗 - 发布公告
 */
import valid, { errors, sysAttachment, sysDict, sysRole, sysUser, common } from '../../libs/request.js';
import editor from './editor.vue'
export default {
    name: 'addAnnouncement',
    components: {
        editor
    },
    props: {
        
    },
    data(){
        return {
            modal: !true,
            title: this.$t('modules_spoc_core_web_src_views_announcement_addlesseeannouncement_83'),
            loading: true,
            newAnnouncement: {
                type: '',
                title: '',
                jaondata: '',
                officeIdList: [],
                roleIdList: [],
                content: '',
            },
            ruleValidate: {
                officeIdList: [
                    { required: true, type: 'array', min: 1, message: this.$t('modules_spoc_core_web_src_views_announcement_addlesseeannouncement_75'), trigger: 'change' },
                ],
                title: [
                    { required: true, message: this.$t('modules_spoc_core_web_src_views_announcement_addlesseeannouncement_72'), trigger: 'blur' }
                ],
                type: [
                    { required: true, message: this.$t('modules_spoc_core_web_src_views_announcement_addlesseeannouncement_75'), trigger: 'change' }
                ],
                roleIdList: [
                    { required: true, type: 'array', min: 1, message: this.$t('modules_spoc_core_web_src_views_announcement_addlesseeannouncement_75'), trigger: 'change' },
                ],
                content: [
                    { required: true, message: this.$t('modules_spoc_core_web_src_views_announcement_addlesseeannouncement_72'), trigger: 'blur' }
                ]
            },
            objectType:'announcement',
            objectId: '',
            kind: 'all',
            announcement_type: [],
            roleList: [],
            officeLists: [],
            // jaondataLists: [],
            allOfficeId: false,
            allRoleId: false,
            setTimeModal: false,
            setTimeLoading: true,
            options: {
                disabledDate (date) {
                    return date && date.valueOf() < Date.now();
                }
            },
            setTimeData: {
                setTime: '',
            },
            setTimeValidate: {
                setTime: [
                    { required: true, type: 'date', message: this.$t('modules_spoc_core_web_src_views_announcement_addlesseeannouncement_75'), trigger: 'change' }
                ],
            }
        };
    },
    computed: {
    },
    mounted(){
        this.getOfficeLists();
        this.batchListData();
        this.getRoleList();
    },
    methods: {
        show() {
            this.$refs.addLesseeAnnouncementEditor.reset()
            this.newAnnouncement.content = ''
            this.$refs.newAnnouncement.resetFields();
            this.modal = true;
        },
        send(type) {
            this.newAnnouncement.content = this.$refs.addLesseeAnnouncementEditor.model
            this.$refs.newAnnouncement.validate((valid) => {
                if (valid) {
                    if(type == '1') {
                        // 定时发送
                        this.$refs.setTimeRef.resetFields();
                        this.setTimeModal = true;
                    } else this.save(type);
                } else {
                    this.changeLoading();
                }
            })
        },
        setTimeOk() {
            this.$refs.setTimeRef.validate((valid) => {
                if (valid) {
                    // console.log(this.setTimeData.setTime);
                    this.newAnnouncement.planSendTime = new Date(this.setTimeData.setTime).format('yyyy-MM-dd');
                    this.save('1');
                } else {
                    this.changeSetTimeLoading();
                }
            })
        },
        setTimeCancel() {
            this.setTimeModal = false;
        },
        changeSetTimeLoading() {
            this.setTimeLoading = false;
            setTimeout(() => {
                this.setTimeLoading = true;
            }, 0);
        },
        save(type) {
            let params = Object.assign({}, this.newAnnouncement);
            params.sendType = type;
            params.jaondata = params.jaondata ? params.jaondata.substring(0, params.jaondata.length - 1) : ''
            // console.log(params)
            common.comAnnouncementSave(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.cancel();
                    this.setTimeCancel();
                    this.$emit('uploadLists')
                }
            })
            .catch(errors.call(this))
            .finally(() => {
                this.changeSetTimeLoading();
                this.changeLoading();
            });
        },
        cancel() {
            this.modal = false;
        },
        changeLoading() {
            this.loading = false;
            setTimeout(() => {
                this.loading = true;
            }, 0);
        },
        hasUploadFile(fileObj){
            this.newAnnouncement.jaondata += `${fileObj.filePath},`;
        },
        batchListData() {
            // 获取字典项
            let types = [
                'announcement_type',
            ]
            sysDict.batchListData({types: types.join(',')})
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    let _data = res.data.data;
                    this.announcement_type = _data.announcement_type;
                }
            })
            .catch(errors.call(this))
        },
        getOfficeLists() {
            sysUser.dataScopeFilter()
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    this.officeLists = res.data.data;
                }
            })
            .catch(errors.call(this))
        },
        getRoleList() {
            sysRole.roleList({}).then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    let _data = res.data.data;
                    this.roleList = _data.roleList;
                }
            })
            .catch(errors.call(this))
        },
        changeOfficeId() {
            // 单个校区勾选
            // console.log(this.newAnnouncement.officeIdList)
            this.allOfficeId = this.newAnnouncement.officeIdList.length == this.officeLists.length ? true : false;
        },
        changeAllOfficeId() {
            // 校区全选
            this.newAnnouncement.officeIdList = this.allOfficeId ? this.officeLists.map(item => {return item.id}) : [];
            // console.log(this.allOfficeId, this.newAnnouncement.officeIdList)
        },
        changeRoleId() {
            // 单个岗位勾选
            this.allRoleId = this.newAnnouncement.roleIdList.length == this.roleList.length ? true : false;
        },
        changeAllRoleId() {
            // 岗位全选
            this.newAnnouncement.roleIdList = this.allRoleId ? this.roleList.map(item => {return item.id}) : [];
        },
    },
}
</script>


