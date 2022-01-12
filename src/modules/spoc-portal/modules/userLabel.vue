<style lang="less">
.useLabelStyle {
}

.PopStyle {
    .ivu-poptip-title {
        display: none;
    }
    .ivu-poptip-inner {
        position: relative;
    }
    .ivu-poptip-body {
        padding: 20px;
        display: flex;
        .userPopContent {
            display: flex;
            align-items: center;
            font-size: 14px;
            font-family: HiraginoSansGB;
            font-weight: normal;
            color: rgba(73, 80, 96, 1);
            .ivu-icon-ios-arrow-up,
            .ivu-icon-ios-arrow-down {
                cursor: pointer;
            }
            .rotateObj {
                transform: rotate(180deg);
            }
        }
        .canChooseTag {
            width: 400px;
            max-height: 280px;
            margin-bottom: 135px;
            overflow: auto;
            .userChooseContent {
                width: 100%;
                overflow: hidden;
                position: absolute;
                left: 0px;
                bottom: 0px;
                background: #fff;
                .footer {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    padding: 12px 20px;
                }
            }
        }
        .userPopContentToggle {
            display: flex;
            align-items: center;
            margin-top: 8px;
            flex-wrap: wrap;
            .checkStyle {
                display: inline-block;
                font-size: 12px;
                color: rgba(73, 80, 96, 1);
                // background: rgba(235, 236, 240, 1);
                border-radius: 4px;
                height: 24px;
                line-height: 24px;
                padding: 0 12px;
                margin-right: 8px;
                margin-bottom: 10px;
                border: 1px solid #d4d5da;
                background: #fff;
                cursor: pointer;
                &.checkClass {
                    background: #44bcb7;
                    color: #fff;
                    border: none;
                }
            }
            // 已经选择的
            &.userPopContentToggleTrue {
                max-height: 80px;
                overflow: auto;
                padding-bottom: 16px;
                display: flex;
                flex-wrap: nowrap;
                align-items: center;
                border-top: 1px solid rgba(220, 222, 227, 1);
                border-bottom: 1px solid rgba(220, 222, 227, 1);
                > p {
                    font-size: 14px;
                    font-family: HiraginoSansGB;
                    font-weight: normal;
                    color: rgba(73, 80, 96, 1);
                    margin-right: 12px;
                    margin-bottom: 10px;
                    margin-left: 20px;
                }
                .trueChoose {
                    display: flex;
                    flex-flow: wrap;
                    span {
                        background: #44bcb7;
                        color: #fff;
                        display: inline-block;
                        font-size: 12px;
                        border-radius: 4px;
                        padding: 6px 12px;
                        margin-right: 8px;
                        margin-bottom: 10px;
                    }
                }
            }
        }
    }
}
</style>
<template>
    <div class="useLabelStyle">
        <Poptip v-model="visible" :placement="placement" @on-popper-show="poperShow" transfer popper-class="PopStyle">
            <!-- 插槽hasTagName中放自定义的内容 点击之后显示的Poptip 气泡提示 -->
            <slot name="hasTagName"></slot>
            <!-- 点击之后显示的Poptip 气泡提示内容 -->
            <div slot="content">
                <div style class="canChooseTag">
                    <Button type="primary" @click="changeOpenAll">{{isOpenAll ? '全部收起': '全部展开'}}</Button>
                    <div v-for="(item, index) in tagList" :key="index">
                        <div v-if="item.children && item.children.length" style="margin-top:10px;">
                            <div class="userPopContent">
                                <p>{{ item.title }}</p>
                                <Icon
                                    type="ios-arrow-up"
                                    size="18"
                                    style="margin-left:9px"
                                    @click="iosArrowDownClick(item.id)"
                                    :class="{ rotateObj: !isRotateObj['isRotateObj' + item.id] }"
                                />
                                <Checkbox
                                    v-if="allowMultiselect && item.isMultiselect == '1'"
                                    @on-change="changeSelectAll(item.id)"
                                    v-model="isSelectAllObj['isRotateObj' + item.id]"
                                    style="margin-left:12px;"
                                >
                                    全选
                                </Checkbox>
                            </div>
                            <div class="userPopContentToggle" v-show="isRotateObj['isRotateObj' + item.id]">
                                <span
                                    class="checkStyle"
                                    :class="{ checkClass: hasCheckedTagids.includes(itemChild.id) }"
                                    v-for="(itemChild, indexChild) in item.children"
                                    :key="indexChild"
                                    @click="clickTag(itemChild.id, item.isMultiselect, item.id)"
                                >
                                    {{ itemChild.title }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="userChooseContent">
                        <div class="userPopContentToggle userPopContentToggleTrue">
                            <p style="padding-top:16px;max-height:84px;">已选:</p>
                            <div class="trueChoose" style="padding-top:16px;max-height:84px;">
                                <span v-for="(item, index) in hasCheckedTagids" v-show="tagNameObjById[item]" :key="index">
                                    {{ tagNameObjById[item] }}
                                    <Icon type="md-close" size="14" style="margin-left:8px" @click="removeTag(item)" />
                                </span>
                            </div>
                        </div>
                        <div class="footer">
                            <Button style="margin-right:16px" @click="clearBtn">清空</Button>
                            <Button type="primary" @click="makeSureBtn">确定</Button>
                        </div>
                    </div>
                </div>
            </div>
        </Poptip>
    </div>
</template>
<script>
// import { mapMutations, mapState } from "vuex";
import valid, { errors, common } from '../libs/request';
export default {
    props: {
        menuId: {
            type: String,
            required: true
        },
        flag: {
            type: String,
            required: true
        },
        allowMultiselect: {
            //是否允许复选。默认为true。当设置为false。则忽略数据的复选属性
            type: Boolean,
            default: true
        },
        onlyOne: {
            //只允许选取一个标签。设置该属性为true的同时，必须把allowMultiselect也设置为false
            type: Boolean,
            default: false
        },
        tagListDefault: {
            //非必须项，有的模块。在加载改组件之前已经请求了获取标签的接口，不必重复调用
            type: Array,
            required: false
        },
        defaultCheckedTagids: {
            //默认选中项
            type: Array,
            required: false
        },
        placement: {
            type: String,
            default: 'right-start'
        },
        echoDisplay: {
            //非必须项，默认确定
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            tagList: [],
            visible: false,
            isRotateObj: {},
            isSelectAllObj: {},
            hasCheckedTagids: [], // 已选标签集合
            isOpenAll: false
        };
    },
    computed: {
        // ...mapState(["app"])
        tagidGroupObjByParentId() {
            // {parentId:[ID1,ID2,ID3]} key为父ID，value为子ID集合的map
            let obj = {};
            this.tagList.forEach(item => {
                let ids = item.children.map(itemChild => {
                    return itemChild.id;
                });
                obj[item.id] = ids;
            });
            return obj;
        },
        tagNameObjById() {
            // {id:name} key为id value为name 的map
            let obj = {};
            this.tagList.forEach(item => {
                item.children.forEach(itemChild => {
                    obj[itemChild.id] = itemChild.title;
                });
            });
            return obj;
        },
        getParentIdById() {
            //{id:parentId} key为id value为parentId 的map
            let obj = {};
            this.tagList.forEach(item => {
                item.children.forEach(itemChild => {
                    obj[itemChild.id] = item.id;
                });
            });
            return obj;
        }
    },
    components: {},
    mounted() {
        this.getBuildTree();
        if (this.defaultCheckedTagids && this.defaultCheckedTagids.length) {
            this.hasCheckedTagids = [].concat(this.defaultCheckedTagids);
        }
    },
    methods: {
        // ...mapMutations(["updateLoadingStatus"]),
        changeOpenAll(){
            console.log(this.isOpenAll)
            this.isOpenAll = !this.isOpenAll
            this.tagList.forEach(item=>{
                this.isRotateObj['isRotateObj' + item.id] = this.isOpenAll
            })
        },
        //获取标签
        getBuildTree() {
            if (this.tagListDefault && this.tagListDefault.length) {
                let tagList = this.tagListDefault;
                this.tagList = tagList;
                tagList.forEach((item, index) => {
                    this.$set(this.isRotateObj, 'isRotateObj' + item.id, index == 0 ? true : false);
                    this.$set(this.isSelectAllObj, 'isRotateObj' + item.id, false);
                });
            } else {
                let obj = {
                    menuId: this.menuId,
                    flag: this.flag
                };
                common
                    .buildTree(obj)
                    .then(valid.call(this))
                    .then(res => {
                        if (res.ok) {
                            console.log(res.data.data);
                            let tagList = res.data.data.children;
                            this.tagList = tagList;
                            tagList.forEach((item, index) => {
                                this.$set(this.isRotateObj, 'isRotateObj' + item.id, index == 0 ? true : false);
                                this.$set(this.isSelectAllObj, 'isRotateObj' + item.id, false);
                            });
                            if(this.echoDisplay){
                                this.makeSureBtn();
                            }
                        }
                    })
                    .catch(errors.call(this))
                    .finally(() => {});
            }
        },
        // 点击选中\取消选中标签
        clickTag(id, isMultiselect, parentId) {
            let index = this.hasCheckedTagids.indexOf(id);
            if (this.allowMultiselect && isMultiselect == '1') {
                // 支持多选
                if (index > -1) {
                    this.hasCheckedTagids.splice(index, 1); // 已存在则移除
                    this.isSelectAllObj['isRotateObj' + parentId] = false; //全选状态置为false
                } else {
                    this.hasCheckedTagids.push(id); // 不存在则添加

                    //检测改分组是否全选
                    let isselectAll = true;
                    this.tagidGroupObjByParentId[parentId].forEach(item => {
                        let _index = this.hasCheckedTagids.indexOf(item);
                        if (_index < 0) {
                            isselectAll = false;
                        }
                    });
                    this.isSelectAllObj['isRotateObj' + parentId] = isselectAll;
                }
            } else {
                // 不支持多选
                if (index > -1) {
                    this.hasCheckedTagids.splice(index, 1); // 已存在则移除
                } else {
                    if (this.onlyOne) {
                        this.hasCheckedTagids = [id];
                    } else {
                        let isselectIdIndex = -1;
                        this.tagidGroupObjByParentId[parentId].forEach(item => {
                            let _index = this.hasCheckedTagids.indexOf(item);
                            if (_index > -1) {
                                isselectIdIndex = _index;
                            }
                        });
                        if (isselectIdIndex > -1) {
                            //存在兄弟标签已被选中，移除
                            this.hasCheckedTagids.splice(isselectIdIndex, 1);
                        }
                        this.hasCheckedTagids.push(id); // 不存在则判断其他兄弟标签是否被选中，选中则移除兄弟标签后再加入已选
                    }
                }
            }
        },
        //删除已选中标签
        removeTag(id) {
            let index = this.hasCheckedTagids.indexOf(id);
            this.hasCheckedTagids.splice(index, 1);

            let parentId = this.getParentIdById[id];
            this.isSelectAllObj['isRotateObj' + parentId] = false; //全选状态置为false
            if (this.hasCheckedTagids && this.hasCheckedTagids.length < 1) {
                this.$emit('userLabelTrueChooseClear', '');
            }
        },
        //展开收起
        iosArrowDownClick(id) {
            this.isRotateObj['isRotateObj' + id] = !this.isRotateObj['isRotateObj' + id];
        },
        //全选/取消全选某个分组
        changeSelectAll(parentId) {
            console.log(parentId, this.isSelectAllObj['isRotateObj' + parentId]);
            if (this.isSelectAllObj['isRotateObj' + parentId]) {
                //全选某分组
                this.tagidGroupObjByParentId[parentId].forEach(item => {
                    let _index = this.hasCheckedTagids.indexOf(item);
                    if (_index < 0) {
                        this.hasCheckedTagids.push(item);
                    }
                });
            } else {
                // 取消选中某分组
                this.tagidGroupObjByParentId[parentId].forEach(item => {
                    let _index = this.hasCheckedTagids.indexOf(item);
                    if (_index > -1) {
                        this.hasCheckedTagids.splice(_index, 1);
                    }
                });
            }
        },
        //确定
        makeSureBtn() {
            // 点击确定之后触发子组件自定义的userLabelTrueChoose事件并传参已选数据this.trueChoose
            this.visible = false;

            let hasCheckedTagidsByGroupObj = {};
            let hasCheckedTagNames = [];
            let hasCheckedTagObjArr = [];
            this.hasCheckedTagids.forEach(item => {
                //获取分组二位数组的对象
                let parentId = this.getParentIdById[item];
                if (hasCheckedTagidsByGroupObj[parentId]) {
                    hasCheckedTagidsByGroupObj[parentId].push(item);
                } else {
                    hasCheckedTagidsByGroupObj[parentId] = [item];
                }

                //获取选中的标签名称集合
                hasCheckedTagNames.push(this.tagNameObjById[item]);

                //选中的标签对象集合
                hasCheckedTagObjArr.push({
                    id: item,
                    parentId: parentId,
                    name: this.tagNameObjById[item]
                });
            });

            let obj = {};
            obj.hasCheckedTagids = this.hasCheckedTagids; // 一维数组
            obj.hasCheckedTagidsByGroup = Object.values(hasCheckedTagidsByGroupObj); // 二维数组
            obj.hasCheckedTagNames = hasCheckedTagNames; // 选中的标签名称集合
            obj.hasCheckedTagObjArr = hasCheckedTagObjArr; // 选中标签完整对象集合

            this.$emit('userLabelTrueChoose', JSON.parse(JSON.stringify(obj)));
        },
        // 清空
        clearBtn() {
            for (let key in this.isSelectAllObj) {
                this.isSelectAllObj[key] = false;
            }
            this.hasCheckedTagids = [];
            this.$emit('userLabelTrueChooseClear', '');
        },
        poperShow() {
            this.$emit('poperShow')
        },
    },
    watch: {
        tagidGroupObjByParentId: function(newValue, oldValue) {
            console.log(newValue);
        },
        defaultCheckedTagids: {
            handler(val, oval) {
                if (val && val.length) {
                    this.hasCheckedTagids = [].concat(val);
                }
            },
            deep: true
        }
    }
};
</script>
