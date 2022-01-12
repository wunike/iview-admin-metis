<style lang="less">
.leadsTag {
    width: 100%;
    height: 100%;
    padding: 20px 32px;
    .leads_tag_title {
        margin: 8px 0;
        font-size: 16px;
        font-weight: normal;
        color: rgba(73, 80, 96, 1);
        line-height: 24px;
    }
    .leads_tag_box {
        min-height: 30px;
        .ivu-tag-checked {
            /*background: #44bcb7 !important;*/
            .ivu-tag-text {
                color: #ffffff;
            }
        }
    }
    .all_tags_box {
        .ivu-tag-checked {
            /*background: #44bcb7 !important;*/
            border: none;
            .ivu-tag-text {
                color: #ffffff;
            }
        }
        .ivu-collapse-simple {
            border: none;
            .ivu-collapse-item {
                border: none;
                .ivu-collapse-header {
                    border: none !important;
                    display: flex;
                    flex-direction: row-reverse;
                    justify-content: flex-end;
                    align-items: center;
                    padding: 0;
                    font-size: 14px;
                    font-weight: normal;
                    color: rgba(73, 80, 96, 1);
                    line-height: 21px;
                    i {
                        margin-left: 6px;
                    }
                }
                .ivu-collapse-content {
                    padding: 0;
                }
            }
        }
    }
    .ivu-tag .ivu-icon-ios-close{
        font-weight: bold;
    }
}
</style>

<template>
    <div class="leadsTag">
        <div class="leads_tag_title">{{$t('modules_spoc_crm_web_src_modules_leadstag_495')}}</div>
        <div class="leads_tag_box">
            <Tag v-for="item in leadsTagList" :key="'leads_tag_box' + item.id"  closable @on-close="closeTag(item)">{{ item.title }}</Tag>
        </div>
        <div class="all_tags_box">
            <Collapse simple v-model="showPanel">
                <Panel v-for="items in tagList" :key="'all_tags_box' + items.id" :name="items.id">
                    {{ items.title }}
                    <div slot="content">
                        <Tag
                            v-for="item in items.children"
                            :key="'tag' + item.id"
                            :type="leadsTagIds.indexOf(item.id) == -1 ? 'border' : ''"
                            checkable
                            :name="item.id"
                            :checked="leadsTagIds.indexOf(item.id) != -1"
                            @on-change="selecteTag(item, items)"
                        >
                            {{ item.title }}
                        </Tag>
                    </div>
                </Panel>
            </Collapse>
        </div>
    </div>
</template>

<script>
import valid, { errors, sys, sysDict, common } from '../libs/request.js';

export default {
    data() {
        return {
            leadsTagIds: [],
            leadsTagList: [],
            tagList: [],
            showPanel: []
        };
    },
    computed: {
        name() {
            return this.data;
        }
    },
    components: {},
    created() {
        this.getTags();
    },
    mounted() {},
    methods: {
        getTags() {
            let params = {
                menuId: 2001,
                flag: 0
            };
            common
                .buildTree(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let list = res.data.data.children;
                        list.forEach(v => {
                            v.children.forEach(val => {
                                val.leadsTagSort = parseFloat(9999 - v.sort + '.' + (9999 - val.sort));
                            });
                        });
                        this.tagList = list;
                        this.$nextTick(() => {
                            this.showPanel = list.map(v => v.id);
                        });
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
        },
        selecteTag(item, parent) {
            if (this.leadsTagIds.indexOf(item.id) == -1) {
                let arr = this.leadsTagList;
                if (parent.isMultiselect == '0') {
                    let ids = parent.children.map(v => v.id);
                    arr = arr.filter(v => ids.indexOf(v.id) == -1);
                    this.leadsTagIds = this.leadsTagIds.filter(v => ids.indexOf(v) == -1);
                }
                this.$nextTick(() => {
                    this.leadsTagIds.push(item.id);
                    arr.push(item);
                    arr.sort((a, b) => {
                        return b.leadsTagSort - a.leadsTagSort;
                    });
                    this.leadsTagList = arr;
                });
            } else {
                this.leadsTagIds = this.leadsTagIds.filter(v => v != item.id);
                this.leadsTagList = this.leadsTagList.filter(v => v.id != item.id);
            }
        },
        closeTag(item) {
            this.leadsTagIds = this.leadsTagIds.filter(v => v != item.id);
            this.leadsTagList = this.leadsTagList.filter(v => v.id != item.id);
        },
        reset() {
            this.leadsTagIds = [];
            this.leadsTagList = [];
        },
        setTags(tags) {
            this.leadsTagIds = tags;
            let arrays = [];
            this.tagList.forEach(v => {
                let arr = v.children.filter(val => tags.indexOf(val.id) != -1);
                arrays = arrays.concat(arr);
            });
            arrays.sort((a, b) => {
                return b.leadsTagSort - a.leadsTagSort;
            });
            this.leadsTagList = arrays;
        }
    }
};
</script>
