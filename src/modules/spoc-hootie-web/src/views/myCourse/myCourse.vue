<style lang="less">
.myCourse {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    .ivu-table-cell {
        padding-left: 2px;
        padding-right: 0px;
    }
    .myCourse_lt {
        width: 254px;
        height: 100%;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        padding: 0 16px 16px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-direction: column;
        .recent_course_tit {
            width: 254px;
            height: 44px;
            background: linear-gradient(90deg, rgba(0, 165, 154, 1) 0%, rgba(55, 182, 175, 1) 100%);
            border-radius: 4px;
            margin-left: -16px;
            margin-bottom: 12px;
            padding: 0 16px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            span {
                font-size: 18px;
                font-weight: 600;
                color: rgba(255, 255, 255, 1);
                line-height: 25px;
            }
        }
        .recent_course_search {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            min-height: 32px;
            .ivu-date-picker {
                flex: 1;
            }
            button {
                margin-left: 8px;
            }
        }
        .recent_course_scroll {
            height: 100%;
			height: calc(~'100% - 87px');
            flex: 1;
            width: 100%;
            margin-top: 10px;
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            position: relative;
            .ivu-scroll-wrapper,
            .ivu-scroll-container {
                height: 100% !important;
                flex: 1;
            }
            .ivu-timeline {
                padding: 4px 8px 4px 0;
            }
            .ivu-timeline-item-content {
                padding-left: 20px;
            }
            .ivu-timeline-item-head-custom {
                width: auto;
                height: auto;
                padding: 0;
                left: 0;
            }
            .circle {
                width: 13px;
                height: 13px;
                /*background: linear-gradient(270deg, rgba(246, 200, 0, 1) 0%, rgba(250, 190, 2, 1) 100%);*/
                border-radius: 50%;
                &.circleStyle {
                    background: #f6c800;
                }
            }
            .time {
                font-size: 12px;
                line-height: 17px;
                color: rgba(73, 80, 96, 1);
                margin-bottom: 10px;
                &.today {
                    font-weight: bold;
                    color: rgba(34, 38, 44, 1);
                }
            }
            .content {
                margin: 8px 0;
                .ivu-card {
                    cursor: pointer;
                    font-size: 12px;
                    line-height: 17px;
                    color: rgba(73, 80, 96, 1);
                    width: 200px;
                    height: 102px;
                    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
                    &:hover {
                        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
                    }
                    .ivu-card-body {
                        padding: 8px 0px 8px 16px;
                        .course_title {
                            margin-bottom: 10px;
                        }
                    }
                    &.tomorro {
                        .course_info {
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            margin: 5px 0;
                            i {
                                width: 14px;
                                height: 14px;
                                margin-right: 6px;
                            }
                            span {
                                font-size: 12px;
                                font-weight: 400;
                                line-height: 14px;
                            }
                        }
                    }
                    &.today {
                        color: rgba(255, 255, 255, 1);
                        /*background: url(../../assets/svg/course_bg.svg) no-repeat;*/
                        background: linear-gradient(270deg, rgba(246, 200, 0, 1) 0%, rgba(250, 190, 2, 1) 100%);
                        background-size: cover;
                        .course_info {
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            margin: 5px 0;
                            i {
                                width: 14px;
                                height: 14px;
                                margin-right: 6px;
                            }
                            span {
                                font-size: 12px;
                                font-weight: 400;
                                line-height: 14px;
                            }
                        }
                    }
                    &.yesterday {
                        color: rgba(153, 153, 153, 1);
                        .course_info {
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            margin: 5px 0;
                            i {
                                width: 14px;
                                height: 14px;
                                margin-right: 6px;
                            }
                            span {
                                font-size: 12px;
                                font-weight: 400;
                                line-height: 14px;
                            }
                        }
                    }
                }
            }
            .anchor {
                position: absolute;
                bottom: 42px;
                right: 0px;
                height: 36px;
                overflow: hidden;
                border-radius: 50%;
                .ivu-anchor-wrapper {
                    padding: 0;
                    margin: 0;
                    .ivu-anchor {
                        padding: 0;
                        .ivu-anchor-ink {
                            display: none;
                        }
                        .ivu-anchor-link {
                            padding: 0;
                            .ivu-anchor-link-title {
                                width: 36px;
                                height: 36px;
                                text-align: center;
                                line-height: 36px;
                                background: rgba(0, 0, 0, 0.3);
                            }
                            &.to_day {
                                .ivu-anchor-link-title {
                                    width: 36px;
                                    height: 36px;
                                    background: url(../../assets/img/today1.png) no-repeat;
                                    background-size: cover;
                                }
                            }
                            &.to_day_en {
                                .ivu-anchor-link-title {
                                    width: 36px;
                                    height: 36px;
                                    background: url(../../assets/img/today2.png) no-repeat;
                                    background-size: cover;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    .myCourse_gt {
        flex: 1;
        margin-left: 10px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-direction: column;
        overflow: hidden;
        height: 100%;
        overflow-y: auto;
        .myCourse_gt_top {
            min-height: 300px;
            height: 300px;
            border-radius: 4px;
            width: 100%;
            .pushed {
                padding: 0 0px 16px;
                background: #ffffff;
                height: 300px;
                min-height: 300px;
                float: left;
                width: ~'calc(100% - 164px)';
                .pushed_tit {
                    width: 100%;
                    height: 44px;
                    background: linear-gradient(90deg, rgba(0, 165, 154, 1) 0%, rgba(40, 177, 170, 1) 100%);
                    border-radius: 4px;
                    padding: 0 16px;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    span {
                        font-size: 18px;
                        font-weight: 600;
                        color: rgba(255, 255, 255, 1);
                        line-height: 25px;
                    }
                    .tab_card {
                        border-radius: 4px;
                        font-size: 12px;
                        font-weight: 400;
                        color: rgba(255, 255, 255, 1);
                        line-height: 17px;
                        padding: 3px 16px;
                        background: #12948c;
                        margin-right: 10px;
                        &.active {
                            background: rgba(247, 248, 250, 1);
                            color: rgba(0, 165, 154, 1);
                        }
                    }
                }
                .pushed_table {
                    width: 100%;
                    padding: 10px;
                    padding-bottom: 0;
                    .ivu-tag-dot {
                        border: none !important;
                        background: transparent !important;
                        height: auto;
                        padding: 0;
                        margin: 0;
                        display: flex;
                        justify-content: flex-start;
                        cursor: auto;
                        align-items: center;
                        .ivu-tag-dot-inner {
                            width: 6px;
                            height: 6px;
                            top: 0;
                        }
                        &.blue {
                            background: rgba(0, 58, 112, 1);
                        }
                        &.yellow {
                            background: #f6c800;
                        }
                        &.orange {
                            background: #f39945;
                        }

                        .message-num{
                            position: absolute;
                            top:7px;
                            left:83px;
                            background: #fff;
                            min-width:28px;
                            height:24px;
                            border-radius:21px;
                            color:#F6C800;
                            line-height: 24px;
                            text-align: center;
                            box-shadow:0px 1px 3px 0px rgba(0,0,0,0.15);
                        }
                        span {
                            font-size: 14px;
                            font-weight: 400;
                            color: rgba(255, 255, 255, 1);
                            line-height: 22px;
                        }
                    }
                }
                .pushed_page {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding-top: 16px;
                    min-height: 32px;
                    width: 100%;
                }
            }
            .pushed_other {
                float: left;
                width: 164px;
                min-width: 164px;
                height: 300px;
                min-height: 300px;
                padding-left: 16px;
                overflow: hidden;
                .pushed_other_box {
                    width: 148px;
                    height: 97px;
                    min-height: 97px;
                    min-width: 148px;
                    background: #ffffff;
                    border-radius: 4px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    position: relative;
                    &:nth-of-type(2) {
                        margin: 4px 0;
                    }
                    &.blue {
                        background: rgba(0, 58, 112, 1);
                        &:hover{
                            background: rgba(0, 46, 88, 1);
                        }
                    }
                    &.yellow {
                        background: rgba(246, 200, 0, 1);
                        &:hover{
                            background:rgba(232, 188, 0, 1);
                        }
                    }
                    &.orange {
                        background: rgba(243, 153, 69, 1);
                        &:hover{
                            background: rgba(244, 140, 44, 1);
                        }
                    }
                    .message-num {
                        position: absolute;
                        top: 7px;
                        left: 83px;
                        background: #fff;
                        min-width: 28px;
                        height: 24px;
                        border-radius: 21px;
                        color: #f6c800;
                        line-height: 24px;
                        text-align: center;
                        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.15);
                    }
                    span {
                        font-size: 14px;
                        font-weight: 400;
                        color: rgba(255, 255, 255, 1);
                        line-height: 22px;
                    }
                }
            }
        }
        .myCourse_gt_down {
            flex: 1;
            width: 100%;
            background: #ffffff;
            margin-top: 10px;
            .course_info_tit {
                width: 100%;
                height: 44px;
                background: linear-gradient(90deg, rgba(0, 165, 154, 1) 0%, rgba(40, 177, 170, 1) 100%);
                border-radius: 4px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding: 0 16px;
                span {
                    font-size: 18px;
                    font-weight: 600;
                    color: rgba(255, 255, 255, 1);
                    line-height: 25px;
                }
            }
            .collapse {
                border-bottom: 1px #e6e7eb solid;
                margin: 0 10px;
                .v-search-collapse-container {
                    padding-left: 0;
                    padding-top: 16px;
                }
            }
            .course_list {
                padding: 10px;
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                flex-flow: wrap row;
                .no-class {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    .no-class-content {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        padding-top: 50px;
                        img {
                            width: 160px;
                            height: auto;
                        }
                        p {
                            margin-top: 20px;
                            color: #000;
                            font-size: 18px;
                        }
                    }
                }
                .course_card {
                    font-size: 12px;
                    line-height: 17px;
                    color: rgba(73, 80, 96, 1);
                    width: 212px;
                    height: 120px;
                    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
                    margin-right: 16px;
                    margin-bottom: 8px;
                    cursor: pointer;
                    &:hover {
                        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
                    }
                    .ivu-card-body {
                        padding: 8px 0px 8px 16px;
                        display: flex;
                        justify-content: flex-start;
                        align-items: flex-start;
                        position: relative;
                        .course_title {
                            font-size: 14px;
                            font-weight: 400;
                            color: rgba(73, 80, 96, 1);
                            line-height: 20px;
                            margin-bottom: 10px;
                        }
                        .course_info {
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            margin: 5px 0;
                            i {
                                width: 14px;
                                height: 14px;
                                margin-right: 6px;
                                color: #d9d9d9;
                            }
                            span {
                                font-size: 12px;
                                font-weight: 400;
                                color: rgba(73, 80, 96, 1);
                                line-height: 14px;
                                white-space: nowrap;
                                display: inline-block;
                                width: 176px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }
                        }
                    }
                    .course_card_info {
                        flex: 1;
                    }
                    .course_card_tag {
                        width: 54px;
                        position: absolute;
                        top: 9px;
                        right: 0;
                        .ststus_tag {
                            width: 53px;
                            height: 16px;
                            visibility: hidden;
                        }
                        .goto {
                            text-align: right;
                            margin-top: 20px;
                        }
                    }
                    &.did {
                        color: rgba(153, 153, 153, 1);
                        .course_card_tag {
                            .ststus_tag {
                                background: url(../../assets/img/did.png) no-repeat;
                                background-size: cover;
                                visibility: visible;
                                text-align: right;
                                color: #fff;
                                font-size: 12px;
                                padding-right: 0.5px;
                            }
                        }
                    }
                    &.doing {
                        .course_card_tag {
                            .ststus_tag {
                                background: url(../../assets/img/course_card_tag.png) no-repeat;
                                background-size: cover;
                                visibility: visible;
                                text-align: right;
                                color: #fff;
                                font-size: 12px;
                                padding-right: 0.5px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>

<template>
    <div class="myCourse">
        <div class="myCourse_lt">
            <div class="recent_course_tit">
                <CommonIcon type="_rili" :size="18" color="#ffffff" :style="{ marginRight: '8px', display: 'inline-block', verticalAlign: 'middle' }" />
                <span>{{ $t('mycourse_mycourse_359') }}</span>
            </div>
            <div class="recent_course_search">
                <DatePicker type="date" :placeholder="$t('mycourse_mycourse_360')" @on-change="recentCourseDateChange"></DatePicker>
                <Button type="primary" @click="search">{{ $t('message_addressbook_267') }}</Button>
            </div>
            <div class="recent_course_scroll">
                <Scroll :on-reach-edge="handleReachEdge" :distance-to-edge="[0, 0]" :loading-text="loadingText">
                    <Timeline>
                        <template>
                            <TimelineItem :id="dateFormat(index).day === 1 && 'today'" v-for="(items, index) in recentlyLessons" :key="'recentlyLessons' + index" color="#F6C800">
                                <div class="circle circleStyle" slot="dot" v-if="dateFormat(index).day === 1"></div>
                                <p class="time" :class="{ today: dateFormat(index).day === 1 }">{{ dateFormat(index).name }}</p>
                                <p class="content" v-for="(item, ind) in items" :key="item.id" @click="toClass(item)" v-if="index != 0 || ind == items.length - 1">
                                    <Card shadow :class="{ today: isNow(item), yesterday: dateFormat(index).day === 0 || isDid(item), tomorro: dateFormat(index).day !== 0 }">
                                        <div class="course_title">
                                            {{ item.className }}
                                            <span v-if="isNow(item)">{{ $t('mycourse_mycourse_362') }}</span>
                                        </div>
                                        <div class="course_info">
                                            <CommonIcon
                                                type="_fangyuan"
                                                :size="14"
                                                :class="getColor(dateFormat(index).day, isNow(item), isDid(item))"
                                                :style="{ display: 'inline-block', verticalAlign: 'middle' }"
                                            />
                                            <span :title="item.teacherName + ' ' + item.classroomName">{{item.teacherName}} {{ item.classroomName }}</span>
                                        </div>
                                        <div class="course_info">
                                            <CommonIcon
                                                type="_shijian"
                                                :size="14"
                                                :class="getColor(dateFormat(index).day, isNow(item), isDid(item))"
                                                :style="{ display: 'inline-block', verticalAlign: 'middle' }"
                                            />
                                            <span>{{ $t('mycourse_mycourse_363', [item.lessonTime, item.curLesson]) }}</span>
                                        </div>
                                        <div class="course_info">
                                            <CommonIcon
                                                type="_rencai"
                                                :size="14"
                                                :class="getColor(dateFormat(index).day, isNow(item), isDid(item))"
                                                :style="{ display: 'inline-block', verticalAlign: 'middle' }"
                                            />
                                            <span>{{ item.classTeacherName }}</span>
                                        </div>
                                    </Card>
                                </p>
                            </TimelineItem>
                        </template>
                    </Timeline>
                </Scroll>
                <Anchor container=".ivu-scroll-container" class="anchor" :scroll-offset="12" v-if="Object.keys(recentlyLessons).length" @on-select="AnchorLinkClick">
                    <AnchorLink href="#today" title="" :class="$i18n.locale =='zh-CN'?'to_day':'to_day_en'" />
                </Anchor>
            </div>
        </div>
        <div class="myCourse_gt">
            <div class="myCourse_gt_top">
                <div class="pushed">
                    <div class="pushed_tit">
                        <CommonIcon type="_tuisong-shixin" :size="14" color="#ffffff" :style="{ marginRight: '8px', display: 'inline-block', verticalAlign: 'middle' }" />
                        <!--<span v-show="(isAdmin || isPusher) && (!(isAdmin || (isPusher || isApproval)))"  @click="changeTable('unSend')" style="cursor:pointer;">{{$t('mycourse_mycourse_364')}}111</span>-->
                        <!--<span v-show="(isAdmin || isApproval) && (!(isAdmin || (isPusher || isApproval)))" @click="changeTable('unAudit')" style="cursor:pointer;">{{$t('mycourse_mycourse_365')}}222</span>-->
                        <span
                            v-show="isAdmin || isPusher"
                            @click="changeTable('unSend')"
                            style="cursor:pointer;"
                            class="tab_card"
                            :class="{ active: (isAdmin || isPusher) && !tabActive }"
                        >
                            {{ $t('mycourse_mycourse_364') }}
                        </span>
                        <!--<span v-show="isAdmin || (isPusher || isApproval)" style="margin-left:10px;margin-right:10px;">/</span>-->
                        <span
                            v-show="isAdmin || isApproval"
                            @click="changeTable('unAudit')"
                            style="cursor:pointer;"
                            class="tab_card"
                            :class="{ active: (isAdmin || isApproval) && tabActive }"
                        >
                            {{ $t('mycourse_mycourse_365') }}
                        </span>
                    </div>
                    <div v-if="(isAdmin || isPusher) && tableType == 'unSend'">
                        <div class="pushed_table">
                            <Table :columns="pushedCol"  :height="230" border :data="pushedData_unSend"></Table>
                        </div>
                        <!-- <div class="pushed_page">
                            {{ $t('mycourse_mycourse_366', [total_unSend]) }}
                            <Page
                                style="padding-left:10px;"
                                size="small"
                                :total="total_unSend"
                                :current="pageNo_unSend"
                                :page-size="pageSize_unSend"
                                @on-change="pageChange_unSend"
                            />
                        </div> -->
                    </div>
                    <div v-if="(isAdmin || isApproval) && tableType == 'unAudit'">
                        <div class="pushed_table"><Table :columns="pushedCol" border :height="230" :data="pushedData_unAudit"></Table></div>
                        <!-- <div class="pushed_page">
                            {{ $t('mycourse_mycourse_367', [total_unAudit]) }}
                            <Page
                                style="padding-left:10px;"
                                size="small"
                                :total="total_unAudit"
                                :current="pageNo_unAudit"
                                :page-size="pageSize_unAudit"
                                @on-change="pageChange_unAudit"
                            />
                        </div> -->
                    </div>
                </div>
                <div class="pushed_other">
                    <div class="pushed_other_box blue" @click="toExchage">
                        <CommonIcon type="_liwu-" :size="36" color="#ffffff" :style="{ marginBottom: '2px', display: 'inline-block', verticalAlign: 'middle' }" />
                        <span>{{ $t('classroom_evaluation_92') }}</span>
                    </div>
                    <div class="pushed_other_box yellow" @click="toScoreRight">
                        <CommonIcon type="_zan-" :size="36" color="#ffffff" :style="{ marginBottom: '2px', display: 'inline-block', verticalAlign: 'middle' }" />
                        <span>{{ $t('mycourse_mycourse_369') }}</span>
                    </div>
                    <div class="pushed_other_box orange" @click="toMessage">
                        <CommonIcon type="_xiaoxi" :size="36" color="#ffffff" :style="{ marginBottom: '2px', display: 'inline-block', verticalAlign: 'middle' }" />
                        <span>{{ $t('mycourse_mycourse_370') }}</span>
                        <div v-if="messageNum > 0" class="message-num">{{ messageNum }}</div>
                    </div>
                </div>
            </div>
            <div class="myCourse_gt_down">
                <div class="course_info_tit">
                    <CommonIcon type="_rili-" :size="18" color="#ffffff" :style="{ marginRight: '8px', display: 'inline-block', verticalAlign: 'middle' }" />
                    <span>{{ $t('mycourse_mycourse_371') }}</span>
                </div>
                <div class="collapse">
                    <v-search-collapse @search="getListData" @reset="resetSearch">
                        <DatePicker
                            v-model="dataSel"
                            type="daterange"
                            split-panels
                            :placeholder="$t('mycourse_mycourse_377')"
                            style="width: 200px"
                            @on-change="datePickerChange"
                        ></DatePicker>
                        <Select :placeholder="$t('courselist_courselist_225')" clearable v-model="selectCompass" style="width:224px;margin-right:12px;">
                            <Option v-for="item in selectCompassList" :value="item.id" :key="item.id">{{ item.code }}{{ item.name }}</Option>
                        </Select>
                        <Input v-model="classCourseName" :placeholder="$t('mycourse_mycourse_372')" style="width: 140px" />
                        <Select
                            v-model="queryTeacherId"
                            filterable
                            remote
                            clearable
                            :remote-method="getQueryTeacher"
                            :placeholder="$t('mycourse_mycourse_373')"
                            style="width: 140px"
                            :loading="loadingQueryTeacher"
                        >
                            <Option v-for="(option, index) in teacherList" :value="option.id" :key="index">{{ option.name }}</Option>
                        </Select>
                        <Select
                            v-model="classTeacherId"
                            filterable
                            remote
                            clearable
                            :remote-method="getClassTeacher"
                            :placeholder="$t('mycourse_mycourse_374')"
                            style="width: 140px"
                            :loading="loadingClassTeacher"
                        >
                            <Option v-for="(option, index) in classTeacherList" :value="option.id" :key="index">{{ option.name }}</Option>
                        </Select>
                        <Select v-model="status" :placeholder="$t('mycourse_mycourse_375')" clearable style="width:140px">
                            <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ $i18n.locale == 'zh-CN' ? item.label : item.remarks }}</Option>
                        </Select>
                        <Select :placeholder="$t('courselist_courselist_223')" v-model="courseType" clearable style="width:140px;margin-right:12px;">
                            <Option v-for="item in courseTypeList" :value="item.value" :key="item.id">{{ item.label }}</Option>
                        </Select>
                    </v-search-collapse>
                </div>
                <div class="course_list" v-if="myCourseList.length">
                    <div v-for="item in myCourseList" :key="item.id" @click="goClassList(item)">
                        <Card shadow class="course_card" :class="{ doing: item.status == 'doing', did: item.status == 'finish' }">
                            <div class="course_card_info">
                                <p class="course_title">{{ item.name }}</p>
                                <div class="course_info">
                                    <CommonIcon
                                        type="_fangwenrenshu"
                                        :size="14"
                                        :class="{ green: item.status == 'doing' }"
                                        :style="{ display: 'inline-block', verticalAlign: 'middle' }"
                                    />
                                    <span>{{ $t('mycourse_mycourse_378', [item.actualMemberCount]) }}</span>
                                </div>
                                <div class="course_info">
                                    <CommonIcon
                                        type="_fangyuan"
                                        :size="14"
                                        :class="{ green: item.status == 'doing' }"
                                        :style="{ display: 'inline-block', verticalAlign: 'middle' }"
                                    />
                                    <span>{{ item.teacherName }}&emsp;{{ item.classroomName }}</span>
                                </div>
                                <div class="course_info">
                                    <CommonIcon
                                        type="_shijian"
                                        :size="14"
                                        :class="{ green: item.status == 'doing' }"
                                        :style="{ display: 'inline-block', verticalAlign: 'middle' }"
                                    />
                                    <span>{{ item.startDate.split('-').join('.') }} - {{ item.endDate.split('-').join('.') }}</span>
                                </div>
                                <div class="course_info">
                                    <CommonIcon
                                        type="_rencai"
                                        :size="14"
                                        :class="{ green: item.status == 'doing' }"
                                        :style="{ display: 'inline-block', verticalAlign: 'middle' }"
                                    />
                                    <span>{{ item.classTeacherName }}</span>
                                </div>
                            </div>
                            <div class="course_card_tag">
                                <div class="ststus_tag">
                                    {{ item.status == 'doing' ? $t('mycourse_mycourse_412') : item.status == 'finish' ? $t('mycourse_mycourse_413') : '' }}
                                </div>
                                <div class="goto">
                                    <span><Icon type="ios-arrow-forward" :size="18" color="#999999" /></span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
                <div class="course_list" v-else>
                    <div class="no-class">
                        <div class="no-class-content">
                            <img src="../../assets/img/no-stu-class.png" />
                            <p>{{ $t('mycourse_mycourse_414') }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <viewStuContent ref="viewStuContentRef" @doAction="doAction"></viewStuContent>
        <toScore ref="toScore"></toScore>
        <scoreExchage ref="scoreExchage"></scoreExchage>
        <serviceContent v-if="apDetails" ref="serviceRef" @downLoad="downLoad" @success="success" @uploadList="doAction" @cancel="cancel"><div slot="details"></div></serviceContent>
    </div>
</template>

<script>
import vSearchCollapse from '@public/modules/vSearchCollapse.vue';
import CommonIcon from '_c/common-icon';
import viewStuContent from './viewStuContent';
import toScore from './toScore';
import scoreExchage from './scoreExchage';
import serviceContent from '../courseList/compontents/serviceContent.vue';
import { mapGetters, mapState, mapMutations } from 'vuex';
import { waitUntil } from '@public/libs/util';
import valid, { errors, sysDict, sysUser, jxLesson, jxChatMessage, jxClassCourse, jxLessonStudentRel } from '../../libs/request';
export default {
    name: 'hootie.myCourse',
    computed: {
        ...mapState(['userInfo', 'app'])
    },
    data() {
        return {
            apDetails:false,
            //定义两个参数判断有没有数据
            dataSel: [],
            messageNum: 0,
            loadingText: this.$t('mycourse_mycourse_379'),
            topNoData: false,
            bottomNoData: false,
            roleId: '',
            lessonId: '',
            tableType: 'unSend',
            isAdmin: false,
            isPusher: false,
            isApproval: false,
            recentCourseDate: '',
            classId: '',
            classCourseName: '',
            queryTeacherId: '',
            teacherList: [],
            loadingQueryTeacher: false,
            classTeacherId: '',
            classTeacherList: [],
            loadingClassTeacher: false,
            status: '',
            statusList: [],
            courseType: '',
            courseTypeList: [],
            pushedData_unSend: [],
            pushedData_unAudit: [],
            pushedCol: [
                {
                    title: this.$t('mycourse_mycourse_380'),
                    key: 'className',
                    width:null,
                    resizable:true,
                    render: (h, params) => {
                        return h('div', {
                            style:{
                                'word-break': 'break-all'
                            }
                        }, params.row.className)
                    }
                },
                {
                    title: this.$t('classlist_classlist_7'),
                    // minWidth: this.$i18n.locale== 'zh-CN' ? 30 : 52,
                    width:null,
                    resizable:true,
                    key: 'curLesson'
                },
                {
                    title: this.$t('mycourse_mycourse_377'),
                    // minWidth: 80,
                    width:null,
                    resizable:true,
                    render: (h, params) => {
                        return h('span', {
                            style:{
                                'word-break': 'break-word'
                            }
                        }, params.row.lessonDate + ' ' + params.row.lessonTime);
                    }
                },
                {
                    title: this.$t('mycourse_mycourse_382'),
                    // minWidth: 56,
                    width:null,
                    resizable:true,
                    key: 'teacherName',
                    render: (h, params) => {
                        return h('div', {
                            style:{
                                'word-break': 'break-all'
                            }
                        }, params.row.teacherName)
                    }
                },
                {
                    title: this.$t('mycourse_mycourse_374'),
                    // minWidth: 40,
                    width:null,
                    resizable:true,
                    key: 'classTeacherName',
                    render: (h, params) => {
                        return h('div', {
                            style:{
                                'word-break': 'break-all'
                            }
                        }, params.row.classTeacherName)
                    }
                },
                {
                    title: this.$t('mycourse_mycourse_383'),
                    // minWidth: 74,
                    width:null,
                    resizable:true,
                    key: 'classroomName',
                    render: (h, params) => {
                        return h('div', {
                            style:{
                                'word-break': 'break-all'
                            }
                        }, params.row.classroomName)
                    }
                },
                {
                    title: this.$t('courselist_compontents_servicecontent_201'),
                    // minWidth: this.$i18n.locale== 'zh-CN' ? 50 : 80,
                    width:null,
                    resizable:true,
                    key: 'serviceAuditStatus',
                    render: (h, params) => {
                        let text = '';
                        let color = '';
                        if (params.row.serviceAuditStatus == 'unsubmit') {
                            text = this.$t('mycourse_mycourse_385');
                            color = '#999999';
                        } else if (params.row.serviceAuditStatus == 'unaudit') {
                            text = this.$t('mycourse_mycourse_386');
                            color = '#999999';
                        } else if (params.row.serviceAuditStatus == 'agree') {
                            text = this.$t('mycourse_mycourse_387');
                            color = '#44BCB7';
                        } else if (params.row.serviceAuditStatus == 'reject') {
                            text = this.$t('mycourse_mycourse_388');
                            color = '#FF3000';
                        }
                        return h('div', [
                            h('div', {
                                style: {
                                    width: '6px',
                                    height: '6px',
                                    background: color,
                                    display: 'inline-block',
                                    // marginRight: '8px',
                                    // marginLeft: '8px',
                                    borderRadius: '50%'
                                }
                            }),
                            text
                        ]);
                    }
                },
                {
                    title: this.$t('mycourse_mycourse_389'),
                    // minWidth: this.$i18n.locale== 'zh-CN' ? 50 : 80,
                    width:null,
                    resizable:true,
                    key: 'teachingAuditStatus',
                    render: (h, params) => {
                        let text = '';
                        let color = '';
                        if (params.row.teachingAuditStatus == 'unsubmit') {
                            text = this.$t('mycourse_mycourse_385');
                            color = '#999999';
                        } else if (params.row.teachingAuditStatus == 'unaudit') {
                            text = this.$t('mycourse_mycourse_386');
                            color = '#999999';
                        } else if (params.row.teachingAuditStatus == 'agree') {
                            text = this.$t('mycourse_mycourse_387');
                            color = '#44BCB7';
                        } else if (params.row.teachingAuditStatus == 'reject') {
                            text = this.$t('mycourse_mycourse_388');
                            color = '#FF3000';
                        }
                        return h('div', [
                            h('div', {
                                style: {
                                    width: '6px',
                                    height: '6px',
                                    background: color,
                                    display: 'inline-block',
                                    // marginRight: '8px',
                                    // marginLeft: '8px',
                                    borderRadius: '50%'
                                }
                            }),
                            text
                        ]);
                    }
                },
                {
                    title: this.$t('mycourse_mycourse_390'),
                    // minWidth: this.$i18n.locale== 'zh-CN' ? 50 : 80,
                    // tooltip: true,
                    width:null,
                    resizable:true,
                    key: 'auditStatus',
                    // render: (h, params) => {
                    // 	return h('Tag', {
                    // 		props: {
                    // 			type: "dot",
                    // 			color: this.getColorStatus(params.row.serviceAuditStatus)
                    // 		}
                    // 	}, this.getCnStatus(params.row.serviceAuditStatus))
                    // }
                    render: (h, params) => {
                        let text = '';
                        let color = '';
                        if (params.row.auditStatus == 'unsubmit') {
                            text = this.$t('mycourse_mycourse_385');
                            color = '#999999';
                        } else if (params.row.auditStatus == 'unaudit') {
                            text = this.$t('mycourse_mycourse_386');
                            color = '#999999';
                        } else if (params.row.auditStatus == 'agree') {
                            text = this.$t('mycourse_mycourse_387');
                            color = '#44BCB7';
                        } else if (params.row.auditStatus == 'reject') {
                            text = this.$t('mycourse_mycourse_388');
                            color = '#FF3000';
                        }
                        return h('div', [
                            h('span', {
                                style: {
                                    width: '6px',
                                    height: '6px',
                                    background: color,
                                    display: 'inline-block',
                                    // marginRight: '8px',
                                    borderRadius: '50%'
                                }
                            }),
                            text
                        ]);
                    }
                },
                {
                    title: this.$t('classlist_compontents_detailinfo_45'),
                    key: 'doAction',
                    minWidth: this.$i18n.locale== 'zh-CN' ? 70 : 54,
                    // fixed: window.screen.width < 1920 ? 'right' : '',
                    render: (h, params) => {
                        let _this = this;
                        //let service=this.userInfo.permissions.includes('hootie:jxLessonAudit:edit:submitAudit:service');
                        let service = this.userInfo.roleIdList.indexOf('6') >= 0;
                        //let teaching=this.userInfo.permissions.includes('hootie:jxLessonAudit:edit:submitAudit:teaching');
                        let teaching = this.userInfo.roleIdList.indexOf('9') >= 0;
                        // let send=this.userInfo.permissions.includes('hootie:jxLesson:edit:send');
                        let isAuditer = this.userInfo.roleIdList.indexOf('11') >= 0;
                        let isAssist = this.userInfo.roleIdList.indexOf('10') >= 0;
                        let admin = this.userInfo.admin;
                        return h(
                            'div',

                            [
                                // h(
                                //     'a',
                                //     {
                                //         style: {
                                //             display: 'inline-block',
                                //             margin: '3px 5px 3px 0'
                                //         },
                                //         on: {
                                //             click: () => {
                                //                 this.$router.push({
                                //                     name: 'hootie.performanceView',
                                //                     query: {
                                //                         id: params.row.id
                                //                     }
                                //                 });
                                //             }
                                //         }
                                //     },
                                //     this.$t('hootie.performanceView') //查看教学评价 只可查看
                                // ),
                                params.row.serviceAuditStatus == 'unsubmit' && (admin || service) && _this.tableType == 'unSend'
                                    ? h(
                                          'a',
                                          {
                                              style: {
                                                  display: 'inline-block',
                                                  margin: '3px 5px 3px 0'
                                              },
                                              on: {
                                                  click: () => {
                                                      this.apDetails=true;
                                                      this.$nextTick(()=>{
                                                        _this.$refs.serviceRef.showServiceModal(params.row.id, 'inToServer');
                                                      })
                                                  }
                                              }
                                          },
                                          this.$t('mycourse_mycourse_392')
                                      )
                                    : '',
                                params.row.serviceAuditStatus == 'reject' && (admin || service) && _this.tableType == 'unSend'
                                    ? h(
                                          'a',
                                          {
                                              style: {
                                                    display: 'inline-block',
                                                    margin: '3px 5px 3px 0'
                                              },
                                              on: {
                                                  click: () => {
                                                      this.apDetails=true;
                                                      this.$nextTick(()=>{
                                                        _this.$refs.serviceRef.showServiceModal(params.row.id, 'Modify');
                                                      })
                                                  }
                                              }
                                          },
                                          this.$t('mycourse_mycourse_393')
                                      )
                                    : '',
                                params.row.teachingAuditStatus == 'unsubmit' && (admin || teaching || isAssist) && _this.tableType == 'unSend'
                                    ? h(
                                          'a',
                                          {
                                              style: {
                                                    //display:this.getMainInfo(params.row.id)?'inline-block':'none',
                                                    display: 'inline-block',
                                                    margin: '3px 5px 3px 0'
                                              },
                                              on: {
                                                  click: () => {
                                                      _this.getMainInfo(params.row.id, 0);
                                                  }
                                              }
                                          },
                                          this.$t('mycourse_mycourse_394')
                                      )
                                    : '',
                                params.row.teachingAuditStatus == 'reject' && (admin || teaching || isAssist) && _this.tableType == 'unSend'
                                    ? h(
                                          'a',
                                          {
                                              style: {
                                                    display: 'inline-block',
                                                    margin: '3px 5px 3px 0'
                                              },
                                              on: {
                                                  click: () => {
                                                      _this.getMainInfo(params.row.id, 1);
                                                  }
                                              }
                                          },
                                          this.$t('mycourse_mycourse_395')
                                      )
                                    : '',
                                params.row.serviceAuditStatus == 'unaudit' && (admin || isAuditer) && _this.tableType == 'unAudit'
                                    ? h(
                                          'a',
                                          {
                                              style: {
                                                display: 'inline-block',
                                                  margin: '3px 5px 3px 0'
                                              },
                                              on: {
                                                  click: () => {
                                                      this.apDetails=true;
                                                      this.$nextTick(()=>{
                                                        _this.$refs.serviceRef.showServiceModal(params.row.id, 'Approval');
                                                      })
                                                  }
                                              }
                                          },
                                          this.$t('mycourse_mycourse_396')
                                      )
                                    : '',
                                params.row.teachingAuditStatus == 'unaudit' && (admin || isAuditer) && _this.tableType == 'unAudit'
                                    ? h(
                                          'a',
                                          {
                                              style: {
                                                   display: 'inline-block',
                                                  margin: '3px 5px 3px 0'
                                              },
                                              on: {
                                                  click: () => {
                                                      _this.$refs.viewStuContentRef.viewContentModal = true;
                                                      _this.$refs.viewStuContentRef.getTeaching(params.row.id);
                                                      _this.$refs.viewStuContentRef.isEditFn();
                                                  }
                                              }
                                          },
                                          this.$t('mycourse_mycourse_397')
                                      )
                                    : '',
                                params.row.auditStatus == 'agree' && (admin || isAuditer) && _this.tableType == 'unAudit'
                                    ? h(
                                          'a',
                                          {
                                              style: {
                                                   display: 'inline-block',
                                                  margin: '3px 5px 3px 0'
                                              },
                                              on: {
                                                  click: () => {
                                                      _this.send(params.row.id);
                                                  }
                                              }
                                          },
                                          this.$t('mycourse_mycourse_398')
                                      )
                                    : ''
                            ]
                        );
                    }
                }
            ],
            FutureLessonParams: {
                startTime: '',
                endTime: ''
            },
            MyPastLessonParams: {
                startTime: '',
                endTime: ''
            },
            recentlyLessons: {},
            startTime: '',
            endTime: '',
            myCourseList: [],
            pageNo_unAudit: 1,
            pageSize_unAudit: this.$store.state.app.pageSizeGlobal, //3,
            total_unAudit: 0,
            pageNo_unSend: 1,
            totalPages_unAudit: 1,
            loading_unAudit: false,
            pageSize_unSend: this.$store.state.app.pageSizeGlobal, //3,
            total_unSend: 0,
            totalPages_unSend: 1,
            loading_unSend: false,
            tabActive: false,
            selectCompass: '',
            selectCompassList: []
        };
    },
    components: {
        vSearchCollapse,
        CommonIcon,
        viewStuContent,
        scoreExchage,
        toScore,
        serviceContent
    },
    created() {

    },
    mounted() {
        this.blogCompassFn();
        this.getUserRight();
        sysDict
        .batchListData({
            types: 'jw_class_course_status,jw_course_type'
        })
        .then(valid.call(this))
        .then(res => {
            if (res.ok) {
                this.statusList = res.data.data.jw_class_course_status;
                this.status = 'doing';
                this.courseTypeList = res.data.data.jw_course_type;
                this.isAdmin = this.userInfo.admin;
                this.isPusher = this.userInfo.roleIdList.indexOf('6') >= 0 || this.userInfo.roleIdList.indexOf('9') >= 0 || this.userInfo.roleIdList.indexOf('10') >= 0;
                this.isApproval = this.userInfo.roleIdList.indexOf('11') >= 0;

                if (this.isAdmin || this.isPusher) {
                    this.tableType = 'unSend';
                    this.getPushedData();
                } else if (this.isAdmin || this.isApproval) {
                    this.tableType = 'unAudit';
                    this.getPushedData();
                }
                waitUntil(()=>{
                    if (this.app.currOfficeId == 'all') {
                        this.selectCompass = ''
                    }else{
                        this.selectCompass = this.app.currOfficeId
                    }
                    return this.app.currOfficeId || false;
                },()=>{
                    this.getMyClassRoom();
                    this.MyFutureLesson(true);
                });
            }
        })
        .catch(errors.call(this))
        .finally(() => {
            this.updateLoadingStatus({
                isLoading: false
            });
        });
        this.initFromWorkbench();
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        initFromWorkbench() {
            if(this.$route.query.modalType && this.$route.query.modalType == 'createService') {
                // 工作台任务 待提交服务内容
                this.tabActive = !true;
                let id = this.$route.query.lessonId;
                this.apDetails=true;
                this.$nextTick(()=>{
                    this.$refs.serviceRef.showServiceModal(id, 'inToServer');
                })
                // this.$refs.taskDeatilModalRef.showModal(this.$route.query.taskId);
            }
            if(this.$route.query.modalType && this.$route.query.modalType == 'createTeaching') {
                // 工作台任务 待提交教学内容
                this.tabActive = !true;
                let id = this.$route.query.lessonId;
                this.getMainInfo(id, 0);
            }
            if(this.$route.query.modalType && this.$route.query.modalType == 'updateService') {
                // 工作台任务 被驳回服务内容
                this.tabActive = !true;
                let id = this.$route.query.lessonId;
                
                this.apDetails=true;
                this.$nextTick(()=>{
                    this.$refs.serviceRef.showServiceModal(id, 'Modify');
                })
            }
            if(this.$route.query.modalType && this.$route.query.modalType == 'auditService') {
                // 工作台任务 待审批服务内容
                this.tabActive = true;
                let id = this.$route.query.lessonId;
                
                this.apDetails=true;
                this.$nextTick(()=>{
                    this.$refs.serviceRef.showServiceModal(id, 'Approval');
                })
            }
            if(this.$route.query.modalType && this.$route.query.modalType == 'auditTeaching') {
                // 工作台任务 待审批教学内容
                this.tabActive = true;
                let id = this.$route.query.lessonId;
                this.$refs.viewStuContentRef.viewContentModal = true;
                this.$refs.viewStuContentRef.getTeaching(id);
                this.$refs.viewStuContentRef.isEditFn();
            }
        },
        AnchorLinkClick() {
            let today = new Date().toLocaleString().split(' ')[0];
            let todayTime = new Date(today).getTime();
            let arr = Object.keys(this.recentlyLessons);
            let newArr = [];
            arr.filter(item => {
                newArr.push(new Date(item).getTime());
            });
            if (!newArr.includes(todayTime)) {
                this.$Message.warning('今天还没有进行排课，请到排课列表进行排课~');
            }
        },
        blogCompassFn() {
            sysUser
                .dataScopeFilter()
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        // console.log(res.data.data.length)
                        if (res.data.data.length) {
                            this.selectCompassList = res.data.data;
                        } else {
                            this.selectCompassList = [];
                        }
                        // waitUntil (()=>{
                        //     console.log("this.app.currOfficeId ==" + this.app.currOfficeId)
                        //     if(this.app.currOfficeId){
                        //         this.$set(this, 'selectCompass', this.app.currOfficeId)
                        //     }
                        //     return this.app.currOfficeId || false;
                        // },()=>{
                        //     // this.getLists();
                        // });
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        getMainInfo(id,status) {
            jxLessonStudentRel
                .showLessonStudentSendStatus({
                    lessonId: id
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let data = res.data.data;
                        if (data.attendanceNum > 0) {
                            this.getLessonDetailInfo(id,status);
                        } else {
                            this.$Modal.warning({
                                title: this.$t('classlist_classlist_12'),
                                content: this.$t('mycourse_mycourse_400')
                            });
                        }
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        getMessageNums(id) {
            jxChatMessage
                .unReadCountByUser({
                    stuId: id
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.messageNum = res.data.data;
                        //                        console.log(res.data.data)
                    }
                })
                .catch(errors.call(this));
        },
        toMessage() {
            this.$router.push({
                name: 'hootie.message'
            });
        },
        getUserRight() {
            //判断登录用户类型
            sysUser
                .userInfoData()
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.roleId = res.data.data.roleId;
                        this.stuId = res.data.data.id;
                        this.getMessageNums(res.data.data.id);
                    }
                })
                .catch(errors.call(this));
        },
        getLessonDetailInfo(lessonId,status) {
            //获取默认的评星模板。并且初始的评星数starNum  为0
            jxLessonStudentRel
                .showStarInfo({
                    lessonId
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        //						console.log(res)
                        if (
                            //根据后台返回字段匹配
                            res.data.message == '展示课堂学员反馈信息成功' ||
                            res.data.message == 'Showcase Student Feedback Is Successful'
                        ) {
                            this.$router.push({
                                name: 'hootie.teachPush',
                                query: {
                                    id: lessonId,
                                    isReject:status
                                }
                            });
                        } else {
                            this.$Modal.warning({
                                title: this.$t('classlist_classlist_12'),
                                content: res.data.message
                            });
                        }
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        downLoad(id) {
            console.log(id);
        },
        success() {
            console.log(this.$t('classlist_classlist_13'));
        },
        uploadList() {
            //this.getListData();
        },
        toExchage() {
            if (this.roleId != '10') {
                // console.log('ok')
                this.$refs.scoreExchage.show();
            } else {
                this.$Message.error(this.$t('classroom_classroom_79'));
            }
        },
        toScoreRight() {
            if (this.roleId != '10') {
                this.$refs.toScore.show();
            } else {
                this.$Message.error(this.$t('classroom_classroom_79'));
            }
        },
        send(lessonId) {
            jxLesson
                .send({
                    lessonId
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.changeTable(this.tableType);
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
        },
        doAction() {
            this.changeTable(this.tableType);
        },
        MyFutureLesson(flag = false) {
            this.updateLoadingStatus({
                isLoading: false
            });
            let params = {
                queryIndex: 1,
                //teacherIds: 31,
                startTime: this.FutureLessonParams.startTime,
                endTime: this.FutureLessonParams.endTime,
                officeId: this.app.currOfficeId ||''
            };
            jxLesson
                .findMyFutureLesson(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        if (flag) {
                            this.MyPastLessonParams.startTime = res.data.data.startTime;
                            this.MyPastLessonParams.endTime = res.data.data.endTime;
                        }
                        this.FutureLessonParams.startTime = res.data.data.startTime;
                        this.FutureLessonParams.endTime = res.data.data.endTime;
                        if (Object.keys(res.data.data.lessons).length <= 0) {
                            // this.$Message.error(this.$t('mycourse_mycourse_404'));
                            this.bottomNoData = true;
                        }
						if(Object.keys(res.data.data.lessons).length){
							let obj = this.recentlyLessons;
							let list = Object.assign({}, obj, res.data.data.lessons);
                            this.recentlyLessons = list;
                            this.$nextTick(()=>{
                                //今天放在最上面显示
                                if(location.href.indexOf('#today') < 0){
                                    location.href = location.href + '#today'
                                }
                            })
						}else{
							if(flag){
								this.MyPastLesson()
							}
						}
                        //							this.$set(this,'recentlyLessons',Object.assign(this.recentlyLessons,res.data.data.lessons))
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({
                        isLoading: false
                    });
                });
        },
        MyPastLesson() {
            this.updateLoadingStatus({
                isLoading: false
            });
            let params = {
                queryIndex: -1,
                //teacherIds: 31,
                startTime: this.MyPastLessonParams.startTime,
                endTime: this.MyPastLessonParams.endTime,
                officeId: this.app.currOfficeId ||''
            };
            jxLesson
                .findMyPastLesson(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.MyPastLessonParams.startTime = res.data.data.startTime;
                        this.MyPastLessonParams.endTime = res.data.data.endTime;
                        let obj = this.recentlyLessons;
                        let list = Object.assign({}, res.data.data.lessons, obj);
                        this.recentlyLessons = list;
                        // console.log(Object.keys(res.data.data.lessons).length);
                        if (Object.keys(res.data.data.lessons).length <= 0) {
                            // this.$Message.error(this.$t('mycourse_mycourse_404'));
                            this.topNoData = true;
                        }
                        //							this.$set(this,'recentlyLessons',Object.assign(res.data.data.lessons,this.recentlyLessons))
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({
                        isLoading: false
                    });
                });
        },
        handleReachEdge(dir) {
            if (dir > 0 && this.topNoData) {
                this.loadingText = this.$t('mycourse_mycourse_404');
                return;
            } else if (dir < 0 && this.bottomNoData) {
                this.loadingText = this.$t('mycourse_mycourse_404');
                return;
            }
            return new Promise(resolve => {
                // console.log(dir);
                if (dir > 0) {
                    this.MyPastLesson();
                } else {
                    this.MyFutureLesson();
                }
                resolve();
            });
        },
        getListData() {
            this.getMyClassRoom();
        },
        resetSearch() {
            this.queryTeacherId = '';
            this.classTeacherId = '';
            this.status = '';
            this.courseType = '';
            this.startTime = '';
            this.endTime = '';
            this.dataSel = [];
            this.classCourseName = '';
            if (this.app.currOfficeId == 'all') {
                this.selectCompass = ''
            }else{
                this.selectCompass = this.app.currOfficeId
            }
            this.getMyClassRoom();
        },
        toClass(item) {
            this.classId = item.id;
            this.$router.push({
                name: 'classRoom',
                query: {
                    id: this.classId,
                    from: 'myCourse'
                }
            });
        },
        dateFormat(val) {
            let obj = {};
            var day3 = new Date();
            let today = new Date();
            today.setHours(0);
            today.setMinutes(0);
            today.setSeconds(0);
            today.setMilliseconds(0);

            let valDay = new Date(val);
            let difference = today - valDay;
            if (difference == 0) {
                obj = {
                    day: 1,
                    name: this.$t('messagemanagement_components_histroylists_314')
                };
            } else if (difference > 0) {
                obj.day = 0;
                switch (Math.abs(difference)) {
                    case 1000 * 60 * 60 * 24:
                        obj.name = this.$t('messagemanagement_components_histroylists_315');
                        break;
                    case 1000 * 60 * 60 * 24 * 2:
                        obj.name = this.$t('mycourse_mycourse_408');
                        break;
                    default:
                        obj.name = valDay.toLocaleDateString();
                        break;
                }
            } else {
                obj.day = 2;
                switch (Math.abs(difference)) {
                    case 1000 * 60 * 60 * 24:
                        obj.name = this.$t('mycourse_mycourse_409');
                        break;
                    case 1000 * 60 * 60 * 24 * 2:
                        obj.name = this.$t('mycourse_mycourse_410');
                        break;
                    default:
                        obj.name = valDay.toLocaleDateString();
                        break;
                }
            }
            return obj;
        },
        getColor(val, flag, isd) {
            if (val === 0) {
                return 'grey';
            } else if (val === 1 && flag) {
                return 'white';
            } else if (val === 1 && isd) {
                return 'grey';
            } else {
                return 'green';
            }
        },
        isNow(item) {
            let startTime = new Date(item.startTime),
                endTime = new Date(item.endTime),
                now = new Date();
            return now <= endTime && now >= startTime;
        },
        isDid(item) {
            let startTime = new Date(item.startTime),
                endTime = new Date(item.endTime),
                now = new Date();
            return now >= endTime;
        },
        getMyClassRoom() {
            this.updateLoadingStatus({
                isLoading: true
            });
            let params = {
                //teacherId: "31",
                officeId: this.selectCompass,
                queryTeacherId: this.queryTeacherId,
                classTeacherId: this.classTeacherId,
                classCourseName: this.classCourseName,
                status: this.status,
                courseType: this.courseType,
                startTime: this.startTime,
                endTime: this.endTime,
                pageNumber: '1',
                pageSize: '100'
            };
            jxClassCourse
                .findPage(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.myCourseList = res.data.data.content;
                        let ids = this.selectCompassList.map(item => {
                            return item.id;
                        });
                        //                        console.log(res.data.data)
                        if (res.data.data.selfOffices && res.data.data.selfOffices.length) {
                            res.data.data.selfOffices.forEach(item => {
                                if (ids.indexOf(item.id) < 0) {
                                    this.selectCompassList.push(item);
                                }
                            });
                            //                            console.log(this.selectCompassList.length)
                        }
                        this.selectCompassList.sort(function(a, b) {
                            return a.sort - b.sort;
                        });
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({
                        isLoading: false
                    });
                });
        },
        datePickerChange(val) {
            this.startTime = new Date(this.formatTime(new Date(val[0]).getTime()).replace('08:', '00:')).getTime();
            this.endTime = new Date(this.formatTime(new Date(val[1]).getTime()).replace('08:00:00', '23:59:59')).getTime();
        },
        getClassTeacher(query) {
            this.loadingClassTeacher = true;
            let obj = {
                roleIds: 6,
                pageSize: 10,
                name: query
            };
            sysUser
                .listDataByRole(obj)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.classTeacherList = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.loadingClassTeacher = false;
                });
        },
        getQueryTeacher(query) {
            this.loadingQueryTeacher = true;
            let obj = {
                roleIds: 9,
                pageSize: 10,
                name: query
            };
            sysUser
                .listDataByRole(obj)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.teacherList = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.loadingQueryTeacher = false;
                });
        },
        changeTable(listType) {
            if (listType == 'unSend') {
                this.tabActive = false;
            } else {
                this.tabActive = true;
            }
            this.tableType = listType;
            this['pushedData_' + this.tableType] = []
            this['totalPages_' + this.tableType] = 1
            this['pageNo_' + this.tableType] = 1;
            this.getPushedData();
        },
        getPushedData() {
            this.updateLoadingStatus({ isLoading: true })
            this.loadingQueryTeacher = true;
            let obj = {
                pageNumber: this['pageNo_' + this.tableType],
                pageSize: this['pageSize_' + this.tableType],
                listType: this.tableType
            };
            jxLesson
                .listUnSendPage(obj)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this['pushedData_' + this.tableType] = this['pushedData_' + this.tableType].concat(res.data.data.content);
                        this['total_' + this.tableType] = res.data.data.totalElements;
                        this['totalPages_' + this.tableType] = res.data.data.totalPages;
                        this['loading_' + this.tableType] = true
                        let _this = this
                        let _el = document.getElementsByClassName('pushed_table')[0].getElementsByClassName('ivu-table-overflowY')[0]
                        if(!_el){
                            waitUntil(()=>{
                                if(document.getElementsByClassName('pushed_table').length){
                                    return document.getElementsByClassName('pushed_table')[0].getElementsByClassName('ivu-table-overflowY')[0]
                                }
                            },()=>{
                                let el = document.getElementsByClassName('pushed_table')[0].getElementsByClassName('ivu-table-overflowY')[0]
                                el.onscroll = function() {
                                    var scrollHeight = el.scrollHeight;//251
                                    var scrollTop = el.scrollTop;//0-18
                                    var clientHeight = el.clientHeight;//233
                                    console.log(scrollHeight + '  ' + clientHeight + '  ' + scrollTop)
                                    if (scrollHeight - clientHeight == scrollTop) {
                                        //滚动条滚到最底部
                                        if(_this['loading_' + _this.tableType]&&(_this['pageNo_' + _this.tableType] < _this['totalPages_' + _this.tableType])){
                                            _this['pageNo_' + _this.tableType] = _this['pageNo_' + _this.tableType] + 1
                                            _this['loading_' + _this.tableType] = false
                                            _this.getPushedData()
                                        }
                                    }
                                }
                            });
                        }
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.loadingQueryTeacher = false;
                    this.updateLoadingStatus({ isLoading: false })
                });
        },
        pageChange_unSend(val) {
            this.pageNo_unSend = val;
            this.getPushedData('unSend');
        },
        pageChange_unAudit(val) {
            this.pageNo_unAudit = val;
            this.getPushedData('unAudit');
        },
        getCnStatus(value) {
            let status = '';
            switch (value) {
                case 'unsubmit':
                    status = this.$t('mycourse_mycourse_385');
                    break;
                case 'unaudit':
                    status = this.$t('mycourse_mycourse_386');
                    break;
                case 'agree':
                    status = this.$t('mycourse_mycourse_387');
                    break;
                case 'reject':
                    status = this.$t('mycourse_mycourse_388');
                    break;
                default:
                    status = '-';
                    break;
            }
            return status;
        },
        getColorStatus(value) {
            let status = '';
            switch (value) {
                case 'unsubmit':
                    status = '#999999';
                    break;
                case 'unaudit':
                    status = '#44BCB7';
                    break;
                case 'agree':
                    status = '#46BC15';
                    break;
                case 'reject':
                    status = '#FF3000';
                    break;
                default:
                    status = '#FF9300';
                    break;
            }
            return status;
        },
        formatTime(time) {
            let times = new Date(time).format('yyyy-MM-dd hh:mm:ss');
            return times;
        },
        recentCourseDateChange(val) {
            this.recentCourseDate = new Date(this.formatTime(new Date(val).getTime()).replace('08:', '00:')).getTime();
        },
        search() {
            if(!this.recentCourseDate){
                this.FutureLessonParams.startTime = ''
                this.FutureLessonParams.endTime = ''
                this.topNoData = false
                this.bottomNoData = false
                this.recentlyLessons = []
                this.MyFutureLesson(true)
                return
            }
            this.updateLoadingStatus({
                isLoading: true
            });
            let ed = this.recentCourseDate != '' ? this.recentCourseDate + 86399000 : null;
            let params = {
                //teacherIds: 31,
                queryStartTime: this.recentCourseDate,
                queryEndTime: ed,
                officeId: this.app.currOfficeId ||''
            };
            jxLesson
                .findMyFutureLesson(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.FutureLessonParams.startTime = res.data.data.startTime;
                        this.FutureLessonParams.endTime = res.data.data.endTime;
                        this.MyPastLessonParams.startTime = res.data.data.startTime;
                        this.MyPastLessonParams.endTime = res.data.data.endTime;
                        this.recentlyLessons = res.data.data.lessons;
                        //							this.$set(this,'recentlyLessons',Object.assign(this.recentlyLessons,res.data.data.lessons))
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({
                        isLoading: false
                    });
                });
        },
        goClassList(item) {
            // if (item.status == 'ready') {
            //     this.$Message.error(this.$t('mycourse_mycourse_411'));
            //     return;
            // }
            this.$router.push({
                name: 'hootie.classList',
                query: {
                    id: item.id,
                    myClassName: item.name
                }
            });
        },
        cancel(){
            this.apDetails=false;
        }
    },
    watch:{
        'app.currOfficeId': function(val,oldVal){
            if(oldVal  && this.$route.name == 'hootie.myCourse'){
                if (this.app.currOfficeId == 'all') {
                    this.selectCompass = ''
                }else{
                    this.selectCompass = this.app.currOfficeId
                }
                // this.selectCompass = this.app.currOfficeId
                this.getMyClassRoom();
                this.FutureLessonParams.startTime = ''
                this.FutureLessonParams.endTime = ''
                this.topNoData = false
                this.bottomNoData = false
                this.recentlyLessons = []
                this.MyFutureLesson(true)
            }
        },
        '$route.query': function(val, oldVal) {
            this.initFromWorkbench();
        }
    }
};
</script>
