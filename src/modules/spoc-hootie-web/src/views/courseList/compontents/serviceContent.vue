<style lang="less">
@comColor: #495060;
.vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;
    .ivu-modal {
        top: 0;
    }
}
//  .ap-details-container {
//   }
.flex-row {
    display: flex;
    flex-direction: row;
}
.ap-details {
    // .ivu-modal-content{
    //   min-width:800px !important;
    // }
    .ivu-tabs-nav {
        padding-top: 10px;
    }

    .ivu-modal-footer .ivu-btn-text {
        border: 1px solid rgb(220, 222, 226);
    }
    .ivu-modal-footer .ivu-btn-text:hover {
        border: 1px solid rgb(220, 222, 226);
    }

    .ivu-modal-header {
        padding: 17px 24px 16px !important;
        background: #f7f8fa;
        border-radius: 4px;
        .ivu-modal-header-inner {
            font-size: 18px;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.85);
        }
    }

    .ivu-input {
        font-size: 14px !important;
    }
    .ivu-modal-footer {
        padding: 10px 24px !important;
    }
    .ivu-input-group-append {
        width: 34px !important;
    }
    .ivu-form-item-label {
        color: #999999 !important;
        font-size: 14px !important;
    }
    .ivu-modal-body {
        padding: 0 !important;
        font-size: 14px !important;
        color: @comColor;
    }

    b {
        font-weight: normal;
    }
    .flexRow {
        display: flex;
        flex-direction: row;
    }
    .ap-header {
        background: #fff;
        padding: 0 24px;
        .info-line {
            .flexRow;
            justify-content: flex-start;
            align-items: flex-start;
            margin-bottom: 18px;
        }
        .info-line-item {
            width: 33.33%;
            font-size: 14px;

            span {
                color: #999;
            }
            b {
                color: @comColor;
            }
        }
    }
    .cp-course {
        height: 535px;
        width: 100%;
        padding: 20px 40px 20px;
        background: #f2f3f7;
        .flexRow;
        justify-content: space-between;
        align-items: center;
        .cp-course-item {
            height: 496px;
            width: 400px;
            border-radius: 4px;
            border: 1px solid #e6e7eb;
            overflow: visible;
            position: relative;
            .combination-course-table {
                position: absolute;
                height: 275px;
                width: 548px;
                top: 100px;
                right: 32px;
                box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
                background: #fff;
                border-radius: 4px;
                z-index: 10;
                .ivu-table td,
                .ivu-table-header th {
                    height: 50px !important;
                }
            }
            .course-search {
                height: 64px;
                width: 548px;
                .flexRow;
                justify-content: flex-start;
                align-items: center;
            }
            .cp-course-item-t {
                height: 52px;
                border-radius: 4px 4px 0 0;
                .flexRow;
                justify-content: center;
                align-items: center;
                background: #f7f8fa;
                border-bottom: 1px solid #e6e7eb;
                span {
                    color: #495060;
                    font-size: 14px;
                    margin-left: 3px;
                }
            }
            .cp-course-ul {
                height: 403px;
                background: #fff;
                overflow-y: scroll;
                .cp-course-li {
                    border-bottom: 1px solid #e6e7eb;
                    .flexRow;
                    justify-content: flex-start;
                    align-items: flex-start;
                    height: 180px;
                    width: 100%;
                    &:nth-last-of-type(1) {
                        border-bottom: 0;
                    }
                }
                .checkes {
                    .flexRow;
                    justify-content: center;
                    align-items: center;
                    width: 56px;
                    height: 100%;
                }
                .ul-items {
                    width: 302px;
                    div {
                        width: 288px;
                        margin-top: 12px;
                        font-size: 14px;
                        span {
                            font-size: 14px;
                            color: #495060;
                        }
                    }
                    .ul-items-s {
                        margin-top: 10px;
                        padding-top: 6px;
                        margin-bottom: 10px;
                        border-top: 1px dashed #e6e7eb;
                    }
                }
            }
            .cp-course-item-b {
                height: 39px;
                background: #fff;
                border-radius: 0 0 4px 4px;
                padding-right: 8px;
                padding-top: 8px;
                padding-left: 15px;
                font-size: 14px;
                border-top: 1px solid #e6e7eb;
                a {
                    cursor: default;
                }
                .left {
                    float: left;
                }
                .right {
                    float: right;
                }
            }
            .new-course {
                background: #fff;
            }
            .combination-course {
                height: 64px;
                background: #fff;
                border-bottom: 1px solid #e6e7eb;
                padding: 15px 16px 0;
            }
            .new-course-box {
                height: 403px;
                overflow-y: scroll;
            }
        }
    }
    .cp-counts {
        padding: 20px 36px 25px;
        height: 207px;
        width: 100%;
        .flexRow;
        justify-content: space-between;
        .com {
            margin-bottom: 12px;
            font-size: 14px;
            font-weight: 500;
            color: rgba(73, 80, 96, 1);
            line-height: 20px;
        }
        .cp-counts-left {
            width: 400px;
            span {
                .com;
            }
        }
        .cp-counts-right {
            width: 400px;
            h2 {
                .com;
                border-bottom: 1px solid #e6e7eb;
                padding-bottom: 6px;
            }
            .counts-item {
                .flexRow;
                justify-content: space-between;
                margin-top: 13px;
                span {
                    font-size: 14px;
                    font-weight: 400;
                    color: rgba(73, 80, 96, 1);
                    line-height: 20px;
                }
                a {
                    font-size: 16px;
                }
            }
        }
    }
    .ap-info-item {
        h2 {
            font-size: 16px;
            font-weight: 500;
            color: rgba(73, 80, 96, 1);
            line-height: 22px;
        }
        .ap-column {
            padding: 20px 0 58px 103px;
            font-size: 12px;
            .time {
                color: #22262c;
                font-weight: bold;
            }
            .content {
                margin-top: 8px;
                color: @comColor;
            }
        }
    }
}
.apConatiner {
    .classImgcontain {
        margin-bottom: 24px;
        margin-top: 12px;
        .classImgStyle {
            display: flex;
            color: #999999;
            .classImgStyleT {
                min-width: 60px;
                text-align: right;
            }
            .addImg {
                min-width: 90px;
                min-height: 90px;
                border: 1px dashed #dcdee2;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin-left: 20px;
                border-radius: 4px;
                &:hover {
                    border: 1px dashed #44bcb7;
                    transition: border 0.4s;
                }
            }

            .getImgList {
                display: flex;
                // width: calc(~"100% - 60px");
                flex-wrap: wrap;
                margin-top: -10px;
                .getImgitem {
                    width: 88px;
                    height: 88px;
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    margin-left: 20px;
                    margin-top: 10px;
                    .videoStyle {
                        width: 88px;
                        height: 88px;
                        position: relative;
                        .controlsView {
                            position: absolute;
                            width: 88px;
                            height: 88px;
                            right: 0px;
                            top: 0px;
                            background: transparent;
                            display: block;
                            z-index: 100;
                        }
                    }
                }
            }
            .Imgformat {
                display: flex;
                justify-content: center;
                align-items: flex-end;
                margin-left: 16px;
            }
        }
        .classImgStyleFile {
            display: flex;
            .uploadFile {
                margin-left: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 500px;
                .ivu-upload {
                    width: 100%;
                    height: 100%;
                }
            }
            .serviceFileImg {
                margin-left: 20px;
                max-height: 250px;
                overflow: auto;
                .serviceFileImgInner {
                    border: 1px solid #dcdee3;
                    padding: 12px 16px;
                    cursor: pointer;
                    min-height: 66px;
                    min-width: 293px;
                    margin-bottom: 12px;
                    .itemFile {
                        display: flex;
                        align-items: center;
                        height: 44px;
                        line-height: 44px;
                        .icon-pdf1Style {
                            width: 40px;
                            height: 46px;
                            color: red;
                            padding-top: -5px;
                            font-size: 36px;
                        }
                    }
                }
            }
        }
        .imgItemOut {
            display: flex;
            flex-wrap: wrap;
            max-height: 216px;
            position: relative;
            .videoStyle {
                width: 88px;
                height: 88px;
                position: relative;
                .controlsView {
                    position: absolute;
                    width: 88px;
                    height: 88px;
                    right: 0px;
                    top: 0px;
                    background: transparent;
                    display: block;
                    z-index: 100;
                }
            }
        }
        .imgItemOut1 {
            flex-direction: column;
            max-height: 100px;
            width: 600px;
            overflow-y: auto;
            .img-item1 {
                display: flex;
                align-items: center;
                margin-bottom: 14px;
                margin-top: 10px;
            }
        }
        .img-item {
            width: 88px;
            height: 88px;
            margin-left: 12px;
            margin-top: 20px;
            position: relative;
            .ImgClose {
                position: absolute;
                z-index: 100;
                top: -10px;
                right: -10px;
                background: #fff;
                width: 16px;
                height: 16px;
                border-radius: 50%;
            }
            img {
                width: 100%;
                height: 100%;
            }
            .videoStyle {
                width: 88px;
                height: 88px;
            }
        }
    }
}
</style>

<template>
    <div class="ap-details-container">
        <Modal
            class="ap-details"
            :width="lang ? '1150' : '1000'"
            v-model="showModal"
            :mask-closable="false"
            @on-cancel="cancel"
            @on-visible-change="visibleChange"
            :title="$t('courselist_compontents_servicecontent_201')"
        >
            <Tabs @on-click="addActive" v-model="tabValue" v-if="this.courseType != 'inToServer'">
                <TabPane :label="$t('courselist_compontents_servicecontent_202')" name="A"></TabPane>
                <TabPane :label="$t('courselist_compontents_servicecontent_203')" name="B"></TabPane>
            </Tabs>
            <div v-if="tabValue === 'A'" style="padding-top:10px;">
                <div class="ap-header apConatiner">
                    <div style="display:flex;justify-content:flex-end;margin-bottom:12px;margin-top: -12px;" v-if="isEdit && this.courseType != 'seeInfo'">
                        <Button @click="courseFn">{{ $t('classroom_allscore_51') }}</Button>
                    </div>

                    <div class="classImgcontain">
                        <div class="classImgStyle" v-if="!isEdit">
                            <div :style="{ width: lang ? '130px' : '60px', textAlign: 'right' }">{{ $t('courselist_compontents_servicecontent_205') }}</div>
                            <cos-upload
                                style="margin-left: 20px;"
                                ref="cosUploadImg"
                                v-if="objectType && kind"
                                :objectType="objectType"
                                :objectId="objectId"
                                :kind="kind"
                                :accept="['jpg', 'png', 'jpeg', 'wmv', 'rm', 'rmvb', 'mov', 'avi', 'mp4', 'flv', 'MP4']"
                                :maxNum="9"
                                :uploadButtonName="$t('courselist_compontents_servicecontent_206')"
                                fileInputId="taskModal"
                                :isChangeFile="false"
                                @delFromUpload="delFromUpload"
                                @hasUploadFile="hasUploadFile"
                            ></cos-upload>
                            <!-- <div class="up-file-lists">
										<ul>
											<li class="li" v-for="(item,index) in files" :key="'f'+index">
												<span>{{item.name?item.name:item.fileName}}</span>
												<span class="del-btn" @click="delfile(item,index)">{{$t('classlist_compontents_detailinfo_46')}}</span>
											</li>
										</ul>
									</div> -->
                            <!-- <div class="addImg" v-if="false">
								<Upload
									multiple
									style="width:100%;height:100%;justify-content:center;align-items: center;display:flex;cursor: pointer;"
									:action="uploadImg"
									:format="['jpg','png','jpeg','wmv','rm','rmvb','mov','avi','mp4','flv','MP4',]"
									:on-format-error="handleFormatError"
									:on-progress="handleProgress"
									:before-upload="handleBeforeUpload"
									:show-upload-list="false"
									:max-size="20480"
									:on-exceeded-size="handleSizeError"
									name="files"
									:data="{isThumb: 1,type:'jx_lesson_service_image',fileType:'image',dirName:'all',remarks:'',menuId:'7001',objectId:objectId}"
									:on-success="HandleSuccess"
								>
									<div style="display:flex;justify-content:center;flex-direction:column;">
										<Icon
											type="ios-add"
											size="44"
											style="color: #3399ff;margin: 0 auto 8px;;color:#999999;width:44px;height:44px;"
										></Icon>
										<p
											style="font-weight:400;color:#999;white-space:nowrap;"
										>{{$t('courselist_compontents_servicecontent_206')}}</p>
									</div>
								</Upload>
							</div> -->
                            <div class="Imgformat" v-if="false">{{ $t('courselist_compontents_servicecontent_207') }}</div>
                        </div>
                        <!-- 不是编辑的时候 -->
                        <div class="classImgStyle" v-else>
                            <div :style="{ width: lang ? '130px' : '60px', textAlign: 'right' }">{{ $t('courselist_compontents_servicecontent_205') }}</div>
                            <div class="getImgList">
                                <div class="getImgitem" v-for="item in service_image" :key="item.filePath" @click="handleView(item.filePath)">
                                    <img
                                        :src="getImgThumb(item.filePath)"
                                        :onerror="getImgThumbError(item.filePath)"
                                        width="100%"
                                        height="100%"
                                        v-if="item.filePath && (item.filePath.endsWith('.jpg') || item.filePath.endsWith('.jpeg') || item.filePath.endsWith('.png'))"
                                    />
                                    <div class="videoStyle" v-else>
                                        <span class="controlsView"></span>
                                        <video :src="item.filePath" controls="controls" width="88" height="88">{{ $t('courselist_compontents_servicecontent_208') }}</video>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="imgItemOut" v-if="!isEdit" :style="{ marginLeft: lang ? '138px' : '68px' }">
                            <div class="img-item" v-for="(item, order) in saveList.attachmentImgList" :key="item.filePath" @click="handleView(item.filePath)">
                                <i class="iconfont icon-cuowuguanbi-fuzhi ImgClose" style="color:#D9D9D9" @click.stop="selectImgCancel('jx_lesson_service_image', order)"></i>
                                <img
                                    :src="getImgThumb(item.filePath)"
                                    :onerror="getImgThumbError(item.filePath)"
                                    v-if="item.filePath && (item.filePath.endsWith('.jpg') || item.filePath.endsWith('.jpeg') || item.filePath.endsWith('.png'))"
                                />
                                <div class="videoStyle" v-else>
                                    <span class="controlsView"></span>
                                    <video :src="item.filePath" controls="controls" width="88" height="88">{{ $t('courselist_compontents_servicecontent_208') }}</video>
                                </div>
                            </div>
                            <Progress :percent="percentProgress" :stroke-width="2" v-if="percentProgressShow" />
                        </div>
                        <div class="classImgStyle classImgStyleFile" style="margin-top:20px;">
                            <div :style="{ width: lang ? '130px' : '60px', textAlign: 'right' }">
                                {{ isEdit && saveList.attachmentFileList.length == 0 ? '' : $t('courselist_compontents_servicecontent_209') }}
                            </div>
                            <div class="uploadFile" v-if="!isEdit">
                                <!-- <div> -->
                                <cos-upload1
                                    ref="cosUploadImg1"
                                    v-if="objectType && kind"
                                    :objectType="objectType1"
                                    :objectId="objectId"
                                    :kind="kind"
                                    :accept="['rar', 'zip', 'doc', 'docx', 'pdf', 'jpg', 'ppt', 'pptx', 'xls', 'xlsx']"
                                    :maxNum="9"
                                    :uploadButtonName="$t('courselist_compontents_servicecontent_206')"
                                    fileInputId="taskModal1"
                                    :isChangeFile="false"
                                    @delFromUpload="delFromUpload1"
                                    @hasUploadFile="hasUploadFile1"
                                ></cos-upload1>
                                <!-- </div> -->
                                <!-- <Upload
								style="display:none"
									:action="uploadImg"
									type="drag"
									:max-size="20480"
									:on-exceeded-size="handleSizeError"
									:on-progress="handleProgress1"
									:before-upload="handleBeforeUpload1"
									:on-format-error="handleFormatError"
									:format="['rar','zip','doc','docx','pdf','jpg','ppt','pptx','xls','xlsx']"
									name="files"
									:show-upload-list="false"
									:data="{isThumb: 1,type:'jx_lesson_service_file',fileType:'image',dirName:'all',remarks:'',menuId:'7001',objectId:objectId}"
									:on-success="HandleSuccess"
								>
									<div>
										<div style="padding: 20px 0">
											<Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
											<p>{{$t('courselist_compontents_servicecontent_210')}}</p>
											<p style="color:#ccc;">{{$t('courselist_compontents_servicecontent_211')}}</p>
										</div>
									</div>
								</Upload> -->
                            </div>
                            <div v-show="isEdit" class="serviceFileImg">
                                <div class="serviceFileImgInner" v-for="rowItem in service_file" :key="rowItem.id" @click="handleView1(rowItem.filePath)">
                                    <div class="itemFile">
                                        <i
                                            class="iconfont icon-pdf1 icon-pdf1Style"
                                            v-if="
                                                rowItem &&
                                                    rowItem.filePath
                                                        .split('/')
                                                        .slice(-1)[0]
                                                        .includes('.pdf')
                                            "
                                        ></i>
                                        <i
                                            class="iconfont icon-wordfuzhi icon-pdf1Style"
                                            style="color:#2d8cf0"
                                            v-else-if="
                                                rowItem &&
                                                    rowItem.filePath
                                                        .split('/')
                                                        .slice(-1)[0]
                                                        .includes('.doc')
                                            "
                                        ></i>
                                        <i
                                            class="iconfont icon-wordfuzhi icon-pdf1Style"
                                            style="color:#2d8cf0"
                                            v-else-if="
                                                rowItem &&
                                                    rowItem.filePath
                                                        .split('/')
                                                        .slice(-1)[0]
                                                        .includes('.docx')
                                            "
                                        ></i>
                                        <i
                                            class="iconfont icon-pptfuzhi1 icon-pdf1Style"
                                            style="color:#ff8400;"
                                            v-else-if="
                                                rowItem &&
                                                    rowItem.filePath
                                                        .split('/')
                                                        .slice(-1)[0]
                                                        .includes('.ppt')
                                            "
                                        ></i>
                                        <i
                                            class="iconfont icon-pptfuzhi1 icon-pdf1Style"
                                            style="color:#ff8400;"
                                            v-else-if="
                                                rowItem &&
                                                    rowItem.filePath
                                                        .split('/')
                                                        .slice(-1)[0]
                                                        .includes('.pptx')
                                            "
                                        ></i>
                                        <i
                                            class="iconfont icon-excelfuzhi icon-pdf1Style"
                                            style="color:#19be6b"
                                            v-else-if="
                                                rowItem &&
                                                    rowItem.filePath
                                                        .split('/')
                                                        .slice(-1)[0]
                                                        .includes('.xls')
                                            "
                                        ></i>
                                        <i
                                            class="iconfont icon-excelfuzhi icon-pdf1Style"
                                            style="color:#19be6b"
                                            v-else-if="
                                                rowItem &&
                                                    rowItem.filePath
                                                        .split('/')
                                                        .slice(-1)[0]
                                                        .includes('.xlsx')
                                            "
                                        ></i>
                                        <i class="iconfont icon-pptfuzhi icon-pdf1Style" style="color:#999" v-else></i>
                                        <span style="margin-left:10px;">{{ rowItem.fileName }}</span>
                                    </div>
                                </div>
                            </div>
                            <div></div>
                        </div>
                        <div class="imgItemOut1" v-show="!isEdit" :style="{ marginLeft: lang ? '150px' : '80px' }">
                            <div class="img-item1" v-for="(rowItem, index) in saveList.attachmentFileList" :key="rowItem.id" @click="handleView1(rowItem.filePath)">
                                <i class="iconfont icon-fujian" style="font-size:13px;cursor: pointer;"></i>
                                <span style="margin-left:10px;color:#1C2B36;font-size:14px;width:362px;display:inline-block;position:relative;cursor: pointer;">
                                    <span style="width:280px;display: inline-block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" :title="rowItem.fileName">
                                        {{ rowItem.fileName }}
                                    </span>
                                    <Icon type="ios-close" size="20" @click.stop="selectImgCancel('jx_lesson_service_file', index)" style="right:0px;top:-1px;position:absolute" />
                                </span>
                            </div>
                        </div>
                        <Progress
                            :percent="percentProgress1"
                            :stroke-width="2"
                            v-if="percentProgressShow1"
                            style="margin-left: 80px;
    width: 560px;"
                        />
                    </div>
                </div>
                <slot name="details"></slot>
            </div>
            <div v-else-if="tabValue === 'B'" style="padding:0 16px;">
                <div class="ap-info-item">
                    <h2 style="font-size:14px;">{{ $t('courselist_compontents_servicecontent_212') }}</h2>
                    <div class="ap-column">
                        <Timeline>
                            <TimelineItem
                                :color="item.status === 0 ? '#E72B00' : item.status === 1 ? '#44BCB7' : item.status === 2 ? '#A0A2AD' : '#A0A2AD'"
                                v-for="item in TMLineColumn"
                                :key="item.time"
                            >
                                <!-- //服务内容 : unsubmit：未提交；unaudit：待审批；agree：已通过；reject：已驳回  commited 提交审批-->
                                <span
                                    slot="dot"
                                    :style="
                                        item.type === 'unsubmit'
                                            ? 'background:#FFF;border:1px solid #A0A2AD'
                                            : item.type === 'agree'
                                            ? 'background:#44BCB7;'
                                            : item.type === 'commited'
                                            ? 'background:#A0A2AD;border:1px solid #A0A2AD'
                                            : item.type === 'unaudit'
                                            ? 'background:#A0A2AD;border:1px solid #A0A2AD'
                                            : item.type === 'reject'
                                            ? 'background:red;'
                                            : 'background:none;border:1px solid #A0A2AD'
                                    "
                                    style="display:inline-block;width:12px;height:12px;border-radius:50%;margin-top:8px;"
                                >
                                    &nbsp;
                                </span>
                                <p class="time" style="font-size:14px;">
                                    <span>{{ item.optTime }}</span>
                                    <span style="margin-left:50px;">{{ item.optUserName }}</span>
                                </p>
                                <p class="content">{{ item.reason }}</p>
                            </TimelineItem>
                        </Timeline>
                    </div>
                </div>
            </div>
            <div slot="footer">
                <Button @click="cancel" v-show="!isEdit">{{ $t('classroom_allscore_53') }}</Button>
                <Button @click="submit()" type="primary" style="margin-left: 8px" v-show="!isEdit">
                    {{ courseType != 'Approval' ? $t('courselist_compontents_servicecontent_214') : $t('courselist_compontents_servicecontent_215') }}
                </Button>
                <Button type="primary" size="large" @click="cancel" v-show="isEdit && courseType == 'seeInfo'">{{ $t('courselist_compontents_servicecontent_216') }}</Button>
            </div>
            <div slot="footer" v-show="isEdit && courseType == 'Approval'">
                <Button @click="submit1(1)" type="primary" style="margin-left: 8px">{{ $t('courselist_compontents_servicecontent_217') }}</Button>
                <Button @click="submit1(2)" type="primary" style="margin-left: 8px">{{ $t('classlist_classlist_13') }}</Button>
            </div>
        </Modal>
        <Modal :title="$t('courselist_compontents_servicecontent_219')" v-model="visible" width="25%" class-name="vertical-center-modal">
            <img
                :src="getImgThumb(imgSrc)"
                :onerror="getImgThumbError(imgSrc)"
                width="100%"
                style="object-fit: cover;"
                v-if="imgSrc && (imgSrc.endsWith('.jpg') || imgSrc.endsWith('.jpeg') || imgSrc.endsWith('.png'))"
            />
            <div class="videoStyle" v-else>
                <video :src="imgSrc" controls="controls" width="100%" style="object-fit: fill;">{{ $t('courselist_compontents_servicecontent_208') }}</video>
            </div>
            <div slot="footer">
                <Button type="primary" size="large" @click="closeVideo">{{ $t('courselist_compontents_servicecontent_216') }}</Button>
            </div>
        </Modal>
        <Modal :title="$t('courselist_compontents_servicecontent_219')" v-model="visible1" width="25%" class-name="vertical-center-modal">
            <img :src="getImgThumb(imgSrc)" :onerror="getImgThumbError(imgSrc)" width="100%" style="object-fit: cover;" v-if="imgSrc && imgSrc.endsWith('.jpg')" />
            <div slot="footer">
                <Button type="primary" size="large" @click="visible1 = false">{{ $t('courselist_compontents_servicecontent_216') }}</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import valid, { errors, jxLessonAudit, sysAttachment } from '../../../libs/request';
import { mapMutations } from 'vuex';
import { reject } from 'q';
import cosUpload from '@public/modules/cosUpload';
import cosUpload1 from '@public/modules/cosUpload1';
export default {
    components: {
        cosUpload,
        cosUpload1
    },
    props: {},
    data() {
        return {
            // files: [],
            objectType: 'jx_lesson_service_image',
            objectType1: 'jx_lesson_service_file',
            objectId: '',
            kind: 'image',
            multipleLength: 0,
            multipleLength1: 0,
            visible1: false,
            visible: false,
            percentProgress: 0,
            percentProgress1: 0,
            percentProgressShow: false,
            percentProgressShow1: false,
            imgSrc: '',
            percent: 100,
            isEdit: false,
            inToService: '',
            courseType: '',
            // objectId: "",
            tabValue: 'A',
            showModal: false,
            saveList: {
                lessonId: '',
                type: '',
                attachmentFileList: [],
                attachmentImgList: []
            },
            service_image: [],
            service_file: [],
            TMLineColumn: []
        };
    },
    computed: {
        uploadImg: function() {
            return sysAttachment.uploadFileUrl();
        }
    },
    mounted() {
        this.lang = this.$i18n.locale == 'en-US' ? 1 : 0;
        console.log(this.lang);
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        // delFromUpload1(index){
        //     this.saveList.attachmentImgList.splice(index,1);
        //     this.$refs.cosUploadImg.taskModalUpload(index)
        // },
        hasUploadFile(attachmentObj) {
            // this.percentProgressShow = false;
            // 	this.saveList.attachmentImgList.push(data.data);
            // 	this.multipleLength = this.saveList.attachmentImgList.length;
            this.saveList.attachmentImgList.push(attachmentObj);
        },
        hasUploadFile1(attachmentObj) {
            this.saveList.attachmentFileList.push(attachmentObj);
        },
        closeVideo() {
            let videos = document.getElementsByTagName('video');
            if (videos && videos.length) {
                for (let i = 0; i < videos.length; i++) {
                    videos[i].currentTime = 0;
                    videos[i].pause();
                }
            }
            this.visible = false;
        },
        getImgThumbError(filePath) {
            return 'this.src="' + filePath + '"';
        },
        getImgThumb(filePath) {
            let _filePath = filePath.split('.');
            let type = _filePath[_filePath.length - 1];
            return filePath + '-thumb.' + type;
        },
        // handleSizeError(file, fileList) {
        // 	this.$Message.error(this.$t("spoc_hootie_web_38"));
        // },
        handleBeforeUpload(file) {
            if (this.saveList.attachmentImgList.length >= 9) {
                this.$Message.error(this.$t('spoc_hootie_web_39'));
                return false;
            }
            if (file.type.startsWith('image')) {
                if (file.size >= 2048 * 5 * 1024) {
                    //图片10M
                    this.$Message.error(this.$t('spoc_hootie_web_40'));
                    return false;
                }
            } else if (file.type.startsWith('video')) {
                if (file.size >= 20480 * 1024) {
                    this.$Message.error(this.$t('spoc_hootie_web_41'));
                    return false;
                }
            }
            this.multipleLength++;
            if (this.multipleLength > 9) {
                this.$Message.error(this.$t('spoc_hootie_web_39'));
                return false;
            }
        },
        // handleBeforeUpload1(file) {
        // 	if (this.saveList.attachmentFileList.length >= 9) {
        // 		this.$Message.error(this.$t("spoc_hootie_web_39"));
        // 		return false;
        // 	}
        // 	if (file.type.startsWith("image")) {
        // 		if (file.size >= 2048 * 5 * 1024) {
        // 			//图片10M
        // 			this.$Message.error(this.$t("spoc_hootie_web_40"));
        // 			return false;
        // 		}
        // 	} else if (file.type.startsWith("video")) {
        // 		if (file.size >= 20480 * 1024) {
        // 			this.$Message.error(this.$t("spoc_hootie_web_41"));
        // 			return false;
        // 		}
        // 	}
        // 	this.multipleLength1++;
        // 	if (this.multipleLength1 > 9) {
        // 		this.$Message.error(this.$t("spoc_hootie_web_39"));
        // 		return false;
        // 	}
        // },
        // handleProgress(event, file, fileList) {
        // 	this.percentProgressShow = true;
        // 	this.percentProgress = Math.floor(event.percent);
        // },
        // handleProgress1(event, file, fileList) {
        // 	this.percentProgressShow1 = true;
        // 	this.percentProgress1 = Math.floor(event.percent);
        // },
        handleView(imgSrc) {
            this.imgSrc = imgSrc;
            this.visible = true;
        },
        handleView1(imgSrc) {
            if (imgSrc.endsWith('.jpg')) {
                this.imgSrc = imgSrc;
                this.visible1 = true;
            } else if (imgSrc.endsWith('.pdf')) {
                window.open(imgSrc);
            } else {
                let id = document.getElementById('iframeId');
                if (id) {
                    id.parentNode.removeChild(id);
                }
                let iframe = document.createElement('iframe');
                iframe.src = imgSrc;
                iframe.id = 'iframeId';
                document.body.appendChild(iframe);
            }
        },
        courseFn() {
            this.isEdit = !this.isEdit;
        },
        delFromUpload1(index) {
            this.saveList.attachmentFileList.splice(index, 1);
            this.$refs.cosUploadImg1.deleteFileFromParent(index);
            this.multipleLength1--;
        },
        delFromUpload(index) {
            this.saveList.attachmentImgList.splice(index, 1);
            this.$refs.cosUploadImg.deleteFileFromParent(index);
            this.multipleLength--;
        },
        selectImgCancel(type, order) {
            if (type == 'jx_lesson_service_image') {
                this.saveList.attachmentImgList.splice(order, 1);
                this.$refs.cosUploadImg.deleteFileFromParent(order);
                this.multipleLength--;
            } else if (type == 'jx_lesson_service_file') {
                this.saveList.attachmentFileList.splice(order, 1);
                this.$refs.cosUploadImg1.deleteFileFromParent(order);
                this.multipleLength1--;
            }
        },
        /*
		delImg(index,item){
            this.imgs.splice(index,1);
            this.$refs.cosUploadImg.deleteFileFromParent(index)
        }
		*/
        // handleFormatError(file) {
        // 	this.$Notice.warning({
        // 		title: this.$t("scoretemplate_compontents_scoremodify_542"),
        // 		desc:
        // 			this.$t("scoretemplate_compontents_scoremodify_543") +
        // 			file.name +
        // 			this.$t("spoc_hootie_web_44")
        // 	});
        // },

        // HandleSuccess(data) {
        // 	if (data.data.type == "jx_lesson_service_image") {
        // 		this.percentProgressShow = false;
        // 		this.saveList.attachmentImgList.push(data.data);
        // 		this.multipleLength = this.saveList.attachmentImgList.length;
        // 	} else if (data.data.type == "jx_lesson_service_file") {
        // 		this.percentProgressShow1 = false;
        // 		this.saveList.attachmentFileList.push(data.data);
        // 		this.multipleLength1 = this.saveList.attachmentFileList.length;
        // 	}
        // 	this.$Message.success(this.$t("scoretemplate_compontents_scoremodify_545"));
        // },
        showServiceModal(id, type) {
            this.tabValue = 'A';
            this.showModal = true;
            this.objectId = id;
            this.saveList = {
                lessonId: '',
                type: '',
                attachmentFileList: [],
                attachmentImgList: []
            };
            this.saveList.lessonId = id;
            this.saveList.type = 'service';
            this.isEdit = '';
            //修改服务
            if (type == 'Modify') {
                this.isEdit = true;
                this.courseType = type;
                this.getEditList();
                this.aduioInfoList();
            }
            //进入服务
            else if (type == 'inToServer') {
                this.isEdit = false;
                this.courseType = type;
            }
            //查看
            else if (type == 'seeInfo') {
                this.isEdit = true;
                this.courseType = type;
                this.getEditList();
                this.aduioInfoList();
            }
            //审批服务内容
            else if (type == 'Approval') {
                this.isEdit = true;
                this.courseType = type;
                this.getEditList();
                this.aduioInfoList();
            }
        },
        aduioInfoList() {
            let params = {
                lessonId: this.objectId,
                type: 'service'
            };
            jxLessonAudit
                .listAuditLog(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.TMLineColumn = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        getEditList(type) {
            let params = {
                lessonId: this.objectId
            };
            jxLessonAudit
                .getService(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        if (res.data.data.jxAttachmentImgList) {
                            this.service_image = res.data.data.jxAttachmentImgList;
                            this.saveList.attachmentImgList = this.service_image;
                            this.multipleLength = this.saveList.attachmentImgList.length;
                        }
                        if (res.data.data.jxAttachmentFileList) {
                            this.service_file = res.data.data.jxAttachmentFileList;
                            this.saveList.attachmentFileList = this.service_file;
                            this.multipleLength1 = this.saveList.attachmentImgList.length;
                        }
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        addActive(idx) {
            this.tabValue = idx;
        },
        cancel() {
            //审批服务内容
            if (this.courseType == 'Approval') {
                this.isEdit = true;
                this.getEditList();
            } else {
                this.showModal = false;
            }
            let videos = document.getElementsByTagName('video');
            if (videos && videos.length) {
                for (let i = 0; i < videos.length; i++) {
                    videos[i].currentTime = 0;
                    videos[i].pause();
                }
            }
            this.$emit('cancel');
        },
        submit1(num) {
            this.updateLoadingStatus({ isLoading: true });
            let value = '';
            if (num == 1) {
                value = 'reject';
            } else if (num == 2) {
                value = 'agree';
            }
            let params = {
                lessonId: this.objectId,
                type: 'service',
                auditStatus: value
            };
            jxLessonAudit
                .audit(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.$Message.success(res.data.message);
                        this.showModal = false;
                        this.$emit('uploadList');
                    } else {
                        this.$Message.error(res.data.message);
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        submit(val) {
            if (this.saveList.attachmentFileList.length < 1 && this.saveList.attachmentImgList.length < 1) {
                this.$Message.error(this.$t('courselist_compontents_servicecontent_220'));
                return;
            }
            jxLessonAudit
                .serviceSubmitAudit(this.saveList)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.$emit('uploadList');
                        this.$Message.success(res.data.message);
                        //审批服务内容
                        if (this.courseType == 'Approval') {
                            this.isEdit = true;
                        } else {
                            this.showModal = false;
                        }
                    } else {
                        this.$Message.error(res.data.message);
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        visibleChange(flag){
            // console.log()
            if(!flag){
                this.cancel();
            }
        }
    }
};
</script>
