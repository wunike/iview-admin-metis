<style lang="less">
@mainColor: #44bcb7;
.myEditor {
    min-height: 180px;
    // height: 180px;
    width: 100%;
    border-top: 1px #eeeeee solid;
    position: relative;
    padding-bottom: 44px;
    .demo-upload-list {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
    }
    #editor-container {
        height: 136px;
        .bem {
            margin: 4px;
        }
        .ql-container {
            height: 90px;
            &.ql-snow {
                border: none;
                .ql-editor {
                    padding-top: 0;
                    img {
                        height: 66px;
                        width: auto;
                    }
                }
                #emoji-palette {
                    top: -310px !important;
                    width: 460px !important;
                    height: 264px !important;
                    max-width: initial;
                    display: flex;
                    flex-direction: column-reverse;
                    align-items: flex-start;
                    justify-content: flex-start;
                    #tab-toolbar {
                        width: 100%;
                    }
                    #tab-panel {
                        flex: 1;
                        display: block;
                        max-height: initial;
                        span {
                            float: left;
                        }
                    }
                }
            }
        }
        .ql-toolbar {
            &.ql-snow {
                border: none;
                .ql-stroke {
                    stroke: #999;
                }
                .ql-fill {
                    fill: #999;
                }
                .ql-file {
                    display: inline-block;
                    float: left;
                    height: 24px;
                    padding: 3px 5px;
                    width: 28px;
                    font-size: 12px;
                    line-height: 20px;
                    color: #999;
                    font-weight: 600;
                }
            }
        }
        .ql-snow.ql-toolbar button:hover .ql-stroke,
        .ql-snow .ql-toolbar button:hover .ql-stroke,
        .ql-snow.ql-toolbar button:focus .ql-stroke,
        .ql-snow .ql-toolbar button:focus .ql-stroke,
        .ql-snow.ql-toolbar button.ql-active .ql-stroke,
        .ql-snow .ql-toolbar button.ql-active .ql-stroke,
        .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,
        .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke,
        .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
        .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke,
        .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke,
        .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke,
        .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
        .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
        .ql-snow.ql-toolbar button:hover .ql-stroke-miter,
        .ql-snow .ql-toolbar button:hover .ql-stroke-miter,
        .ql-snow.ql-toolbar button:focus .ql-stroke-miter,
        .ql-snow .ql-toolbar button:focus .ql-stroke-miter,
        .ql-snow.ql-toolbar button.ql-active .ql-stroke-miter,
        .ql-snow .ql-toolbar button.ql-active .ql-stroke-miter,
        .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
        .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
        .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
        .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
        .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
        .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
        .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,
        .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {
            stroke: #3ca6a1e8;
        }
        .ql-snow.ql-toolbar button:hover .ql-fill,
        .ql-snow .ql-toolbar button:hover .ql-fill,
        .ql-snow.ql-toolbar button:focus .ql-fill,
        .ql-snow .ql-toolbar button:focus .ql-fill,
        .ql-snow.ql-toolbar button.ql-active .ql-fill,
        .ql-snow .ql-toolbar button.ql-active .ql-fill,
        .ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill,
        .ql-snow .ql-toolbar .ql-picker-label:hover .ql-fill,
        .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill,
        .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-fill,
        .ql-snow.ql-toolbar .ql-picker-item:hover .ql-fill,
        .ql-snow .ql-toolbar .ql-picker-item:hover .ql-fill,
        .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill,
        .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-fill,
        .ql-snow.ql-toolbar button:hover .ql-stroke.ql-fill,
        .ql-snow .ql-toolbar button:hover .ql-stroke.ql-fill,
        .ql-snow.ql-toolbar button:focus .ql-stroke.ql-fill,
        .ql-snow .ql-toolbar button:focus .ql-stroke.ql-fill,
        .ql-snow.ql-toolbar button.ql-active .ql-stroke.ql-fill,
        .ql-snow .ql-toolbar button.ql-active .ql-stroke.ql-fill,
        .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,
        .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,
        .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
        .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
        .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,
        .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,
        .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill,
        .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill {
            fill: #3ca6a1e8;
        }
        .ql-snow.ql-toolbar button:hover,
        .ql-snow .ql-toolbar button:hover,
        .ql-snow.ql-toolbar button:focus,
        .ql-snow .ql-toolbar button:focus,
        .ql-snow.ql-toolbar button.ql-active,
        .ql-snow .ql-toolbar button.ql-active,
        .ql-snow.ql-toolbar .ql-picker-label:hover,
        .ql-snow .ql-toolbar .ql-picker-label:hover,
        .ql-snow.ql-toolbar .ql-picker-label.ql-active,
        .ql-snow .ql-toolbar .ql-picker-label.ql-active,
        .ql-snow.ql-toolbar .ql-picker-item:hover,
        .ql-snow .ql-toolbar .ql-picker-item:hover,
        .ql-snow.ql-toolbar .ql-picker-item.ql-selected,
        .ql-snow .ql-toolbar .ql-picker-item.ql-selected {
            color: #3ca6a1e8;
        }
    }
    .send {
        position: absolute;
        right: 32px;
        bottom: 20px;
        width: 48px;
        height: 24px;
        padding: 0;
        &.empty {
            .ivu-poptip-popper {
                display: none;
            }
        }
    }
    .type-img {
        margin-top: 10px;
        margin-left: 10px;
        // display:none;
        float: left;
        margin-right: 16px;
        line-height: 1;
        color: #999;
        width: 70px;
        cursor: pointer;
        i {
            position: relative;
            top: -1px;
            font-size: 15px;
            margin-right: 4px;
        }
    }
}
</style>

<template>
    <div class="myEditor">
        <div class="demo-upload-list">
            <div v-for="(item, index) in defaultList1" :key="'defaultList1' + index">
                <template>
                    <Tag type="border" closable color="primary" @on-close="closeTag(defaultList1, index)">{{ item.name }}</Tag>
                </template>
            </div>
            <div v-for="(item, index) in defaultList2" :key="'defaultList2' + index">
                <template>
                    <Tag type="border" closable color="primary" @on-close="closeTag(defaultList2, index)">{{ item.name }}</Tag>
                </template>
            </div>
            <div v-for="(item, index) in defaultList3" :key="'defaultList3' + index">
                <template>
                    <Tag type="border" closable color="primary" @on-close="closeTag(defaultList3, index)">{{ item.name }}</Tag>
                </template>
            </div>
        </div>
        <div class="type-img" @click="showImgBox">
            <Icon type="ios-image" />
            <span>{{$t('modules_spoc_hootie_web_src_views_message_myeditor_2049', [ imgnum ])}}</span>
            <up-img-new
                v-show="addItem.img.visible"
                ref="upImgNew"
                @close="imgClose"
                @on-change="onImgChange"
                class="abs-img"
                fileInputId="myEditorUpImg"
                :objectType="objectType"
                :objectId="objectId"
                :kind="kind"
            ></up-img-new>
        </div>
        <div class="type-img" @click="showVideoBox">
            <Icon type="md-film" />
            <span>{{$t('modules_spoc_hootie_web_src_views_message_myeditor_2050', [ videonum ])}}</span>
            <up-video-new
                ref="upVideoNew"
                v-show="addItem.video.visible"
                @close="videoClose"
                @on-change="onVideoChange"
                class="abs-file"
                fileInputId="myEditorUpVideo"
                :objectType="objectType"
                :objectId="objectId"
                :kind="kind"
                :maxNum="3"
            ></up-video-new>
        </div>
        <div class="type-img" @click="showFileBox">
            <Icon type="ios-folder" />
            <span>{{$t('modules_spoc_hootie_web_src_views_message_myeditor_2051', [ filenum ])}}</span>
            <up-file-new
                ref="upFileNew"
                v-show="addItem.file.visible"
                @close="fileClose"
                @on-change="onFileChange"
                class="abs-file"
                fileInputId="myEditorUpFile"
                :objectType="objectType"
                :objectId="objectId"
                :kind="kind"
                :maxNum="3"
            ></up-file-new>
        </div>
        <quill-editor
            v-model="content"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)"
            id="editor-container"
        >
            <div id="toolbar" slot="toolbar"><button class="ql-emoji" style="margin-top:-4px;"></button></div>
        </quill-editor>
        <div class="send" :class="{ empty: !contEmpet }">
            <Poptip v-model="isEmpet" placement="top-end" trigger="click">
                <Button type="primary" @click="send">{{ $t('message_myeditor_292') }}</Button>
                <div slot="content">{{ $t('message_chat_281') }}</div>
            </Poptip>
        </div>
    </div>
</template>

<script>
import { quillEditor, Quill } from 'vue-quill-editor';
import Emoji from 'quill-emoji/dist/quill-emoji.js';
//	import { container, ImageExtend, QuillWatch } from 'quill-image-extend-module'
//	Quill.register('modules/ImageExtend', ImageExtend)
//	Quill.register('modules/emoji', Emoji)
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import 'quill-emoji/dist/quill-emoji.css';
import CommonIcon from '_c/common-icon';
import valid, { errors, jxLessonAudit, sysAttachment } from '../../libs/request';
// import cosUpload from '@public/modules/cosUpload';
import upImgNew from './upImgNew';
import upFileNew from './upFileNew';
import upVideoNew from './upVideoNew';
export default {
    data() {
        return {
            imgList: [],
            videoList: [],
            fileList: [],
            kind: 'image',
            addItem: {
                // date: '',
                text: '',
                img: {
                    visible: false
                },
                video: {
                    visible: false
                },
                file: {
                    visible: false
                }
            },
            objectType: 'customer',
            objectId: '',
            defaultList1: [],
            defaultList2: [],
            defaultList3: [],
            formData: {
                type: 'jx_chat_file',
                fileType: 'all',
                dirName: 'all',
                remarks: '',
                menuId: '7001',
                objectId: ''
            },
            content: '',
            contEmpet: false,
            isEmpet: false,
            editorOption: {
                debug: 'info',
                placeholder: this.$t('message_myeditor_294'),
                modules: {
                    'emoji-toolbar': true,
                    toolbar: {
                        container: '#toolbar',
                        handlers: {
                            image: function() {
                                return;
                            },
                            video: function() {
                                return;
                            }
                        }
                    }
                },
                theme: 'snow'
            }
        };
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        },
        uploadFile() {
            return sysAttachment.uploadFileUrl();
        },
        imgnum() {
            return `${this.imgList.length}/9`;
        },
        filenum() {
            return `${this.fileList.length}/3`;
        },
        videonum() {
            return `${this.videoList.length}/3`;
        }
    },
    components: {
        quillEditor,
        CommonIcon,
        upImgNew,
        upFileNew,
        upVideoNew
    },
    mounted() {
        // debugger;
        this.$el.onkeydown = event => {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if (e.ctrlKey && e.keyCode == 13) {
                //ctrl+ enter 键
                //要做的事情
                if (this.editor.hasFocus()) {
                    console.log('has');
                    this.send();
                }
            }
        };
        if (this.editor) {
        }
    },
    methods: {
        showImgBox() {
            this.kind = 'image';
            this.objectId = this.guid();
            this.addItem.img.visible = true;
            this.addItem.file.visible = false;
            this.addItem.video.visible = false;
        },
        showFileBox() {
            this.kind = 'file';
            this.objectId = this.guid();
            this.addItem.img.visible = false;
            this.addItem.video.visible = false;
            this.addItem.file.visible = true;
        },
        showVideoBox() {
            this.kind = 'video';
            this.objectId = this.guid();
            this.addItem.video.visible = true;
            this.addItem.img.visible = false;
            this.addItem.file.visible = false;
        },
        onVideoChange(v) {
            this.videoList = v;
        },
        onFileChange(v) {
            this.fileList = v;
        },
        onImgChange(v) {
            this.imgList = v;
        },
        imgClose() {
            this.addItem.img.visible = false;
            this.imgList.filter(item => {
                let image = new Image();
                image.onload = () => {
                    let width = image.width;
                    let height = image.height;
                    let fileSize = image.fileSize;
                    let obj = {
                        msgType: 4,
                        message: {
                            url: item.filePath,
                            w: width,
                            h: height
                        },
                        filePath: item.filePath,
                        id: item.objectId
                    };
                    this.$emit('uploadFile', obj);
                };
                image.src = item.filePath;
            });
            this.$refs.upImgNew.reset();
        },
        videoClose() {
            this.addItem.video.visible = false;
            this.videoList.filter(item => {
                let video = document.createElement('VIDEO');
                video.src = item.filePath;
                video.addEventListener('canplay', e => {
                    let width = video.videoWidth;
                    let height = video.videoHeight;
                    let obj = {
                        msgType: 6,
                        message: {
                            url: item.filePath,
                            w: width,
                            h: height
                        },
                        filePath: item.filePath,
                        id: item.objectId
                    };
                    this.$emit('uploadFile', obj);
                });
            });
            this.$refs.upVideoNew.reset();
        },
        fileClose() {
            this.addItem.file.visible = false;
            this.fileList.filter(item => {
                let filesize = item.fileSize;
                let filesize_new = filesize / 1024 / 1024;
                let obj = {
                    msgType: 3,
                    message: JSON.stringify({
                        fileName: item.fileName,
                        fileSizeStr: filesize_new
                    }),
                    filePath: item.filePath,
                    id: item.objectId
                };
                this.$emit('uploadFile', obj);
            });
            this.$refs.upFileNew.reset();
        },
        onEditorBlur(editor) {
            console.log('editor blur!', editor);
        },
        onEditorFocus(editor) {
            console.log('editor focus!', editor);
        },
        onEditorReady(editor) {
            console.log('editor ready!', editor);
        },
        onEditorChange({ editor, html, text }) {
            this.content = html;
        },
        send() {
            if (this.content.replace(/(<p>|<\/p>|<br>)/g, '').length || this.defaultList1.length || this.defaultList2.length || this.defaultList3.length) {
                this.contEmpet = false;
                this.isEmpet = false;
                for (let i = 0; i < this.defaultList1.length; i++) {
                    let item = this.defaultList1[i];
                    this.$refs.upload1.post(item);
                }
                for (let i = 0; i < this.defaultList2.length; i++) {
                    let item = this.defaultList2[i];
                    this.$refs.upload2.post(item);
                }
                for (let i = 0; i < this.defaultList3.length; i++) {
                    let item = this.defaultList3[i];
                    this.$refs.upload3.post(item);
                }
                if (this.content.replace(/(<p>|<\/p>|<br>)/g, '').length) {
                    this.$emit('on-send', {
                        message: this.content,
                        msgType: 1
                    });
                }
            } else {
                this.contEmpet = true;
                this.isEmpet = true;
                setTimeout(() => {
                    this.contEmpet = false;
                    this.isEmpet = false;
                }, 2000);
            }
        },
        handleFormatError(file) {},
        guid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = (Math.random() * 16) | 0,
                    v = c == 'x' ? r : (r & 0x3) | 0x8;
                return v.toString(16);
            });
        },
        closeTag(arr, ind) {
            arr.splice(ind, 1);
        }
    }
};
</script>
