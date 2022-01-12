<style lang='less'>
    .moduleGSX{
        .boxGsx{
            width: 100%;
            height: 100%;
            list-style: none;
            position: relative;
            .tagText {
                display: inline-block;
                width: 80px;
                overflow: hidden;
                text-align: left;
            }
            .active{
                background: #44bcb7;
                color: #fff;
            }
            li {
                display: inline-block;
                margin-left: 10px;
                min-width: 128px;
                height: 34px;
                margin-top: 10px;
            }
        }
    }
</style>

<template>
    <div class="moduleGSX">
        <ul ref="oBox" class="boxGsx">
            <li v-for="(item, index) in littleTag" :key="index" @dragenter="handleDragEnter($event,item)"  draggable="true"  @dragend.prevent="handleDragEnd($event,item)">
                <Button style="height:34px;min-width: 112px;" type="ghost">{{item.title}}
					<!-- <span class="tagText"></span> -->
                    <Dropdown transfer @on-click='selectChange' >
                        <a href="javascript:void(0)">
                            <Icon color="#515a6e" type="ios-arrow-down" />
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem :name="item.title+'|'+item.id+'|'+0">修改名称</DropdownItem>
                            <DropdownItem v-if="item.isSys !=1" :name="item.title+'|'+item.id+'|'+1">删除标签</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
				</Button>
            </li>
        </ul>
        <Modal
            v-model="modal2"
            ref="modal2Ref"
            width=728
            :title="TagName"
            @on-ok="ok1"
            @on-cancel="cancel1">
            <div v-if="TagName === '修改标签'">
                <span style="float:left; line-height: 30px;font-size:14px;color:#999;margin-left:82px"><span style="color:#f00;margin-right:5px">*</span>标签名称：</span>
                <div style="margin-left: 60px">
                    <Input v-model="tagAddName" style="width: 306px;" :maxlength="6" placeholder="请输入标签名称，最多支持6个字符"/>
                </div>
                <!-- 

                    <span style="float:left; line-height: 30px;font-size:14px;color:#999;margin-left:82px"><span style="color:#f00;margin-right:5px">*</span>标签名称：</span>
                <div style="margin-left: 60px">
                    <Input v-model="tagAddName" style="width: 306px;" :maxlength="6" placeholder="请输入标签名称，最多支持6个字符"/>
                </div>
                 -->
            </div>
            <div v-else>
                <p style="text-align: center">确定删除 <span style="color:red; font-size: 16px">{{parentTagName}} </span>吗?</p>
            </div>
        </Modal>
    </div>
</template>

<script>

export default {
    props: {
        littleTag: {
            type: Array,
            default: () => {
                return []
            }
        }
    },

    data() {
        return {
            parentTagName: '',
            parentId: '',
            pTagName: '',
            tagId: '',
            oBoxWidth: '',
            modal2: false,
            TagName: '',
            tagAddName: '',
            state: {
                item: {},
                dragHoverItem: {}
            },
        }
    },

    mounted() {
    },

    methods: {
        selectChange(val) {
            val = val.split('|')
            this.parentTagName = this.tagAddName = val[0]
            this.parentId = val[1]
            this.TagName = val[2] == '0' ? '修改标签' : '删除标签'
            if(val[2] != '0' ){
                this.$Modal.confirm({
                                title:
                                    "确定要将该标签删除吗？",
                                content:
                                    "<p>确定后，此标签将从列表中消失。</p>",
                                onOk: () => {
                                        this.$emit('deleteTag',[this.parentId] )
                                },
                                onCancel: () => {}
                            });
            }else{
              this.modal2 = true;
            }
        },

        handleDragEnter(e, item) {
            this.state.dragHoverItem = item
        },

        handleDragEnd(e, item) {
            let resList = this.littleTag.concat([]);
            let index = this.getItemIndex(resList, this.state.dragHoverItem);
            let rindex = this.getItemIndex(resList, item);
            resList.splice(rindex, 1);
            resList.splice(index, 0, item);
            let menuList = [];
            resList.forEach((item, i) => {
                menuList.push({ id: item.id, sort: i+1 });
            });
            this.$emit('sortTag', menuList)
        },

        getItemIndex(arr,item) {
            for(let i in arr){
                if(arr[i].id==item.id){
                    return i;
                }
            }
            return -1;
        },

        ok1() {
            if(this.TagName == '修改标签') {
                 let sum = 0
                for(let i = 0; i < this.tagAddName.length; i++) {
                  if(this.tagAddName.charCodeAt(i) < 128) {
                      sum += 1
                  }else {
                      sum += 2
                  }
                }
                if(sum > 12) {
                    this.$Message.error('最多能输入6个字')
                    this.modal2 = true
                    this.$refs.modal2Ref.visible = true
                    return
                }
                if(!sum) {
                     this.modal2 = true;
                      this.$refs.modal2Ref.visible = true
                    this.$Message.error('名称不能为空');
                     return
                }
                this.$emit('upTagName', [this.parentId, this.tagAddName])
                this.tagAddName = ''
                return
            }
           

            // this.$Message.info('Clicked ok');
        },

        cancel1() {
            this.tagAddName = ''
            // this.$Message.info('Clicked cancel');
        },
    }
}
</script>
