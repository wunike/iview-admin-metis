<style lang="less">
.clientAreaAroundClass {
    height: 100%;
    .radius_wrap {
        display: inline-block;
        margin-right: 12px;
        margin-bottom: 12px;
        vertical-align: middle;
        .radius_box {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 32px;
        }
    }
    .map_wrap {
        width: 100%;
        // height: 500px;
        height: ~'calc(100% - 88px)';
        margin-top: 10px;
        position: relative;
        .map {
            width: 100%;
            height: 100%;
            .bm-view {
                width: 100%;
                height: 100%;
            }
            .auto_complete {
            }
            .city_content_top {
                padding: 0 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                #city_ctrl_form {
                    position: initial;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
            }
        }
        .collection_info_wrap {
            width: 116px;
            padding: 2px;
            background: #478ffa;
            box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
            border-radius: 3px;
            border: 1px solid rgba(35, 113, 230, 1);
            position: absolute;
            // top: -9999px;
            // left: -9999px;
            top: 50%;
            left: 50%;
            .collection_info_box {
                width: 100%;
                max-height: 132px;
                overflow-y: auto;
            }
            .collection_info {
                text-align: center;
                font-size: 12px;
                font-weight: 500;
                color: rgba(255, 255, 255, 1);
                line-height: 32px;
                white-space: pre-wrap;
            }
            .collection_info_triangle {
                position: absolute;
                bottom: -12px;
                left: ~'calc(50% - 6px)';
                border: 6px solid transparent;
                border-top: 6px solid #478ffa;
            }
        }
    }
}
</style>
<template>
    <div class="clientAreaAroundClass">
        <v-search-collapse @search="searchList" @reset="resetSearch">
            <!-- <Select v-model="findObj.city" clearable :placeholder="$t('modules_spoc_crm_web_src_views_clientareaaround_clientareaaround_780')" style="width:224px;">
                <Option v-for="item in searchArr.cityList" :value="item.id" :key="item.value">{{ item.name }}</Option>
            </Select> -->
            <Select
                :disabled="findObj.type === '0' || !findObj.type"
                v-model="findObj.officeId"
                clearable
                :placeholder="$t('modules_spoc_crm_web_src_views_clientareaaround_clientareaaround_781')"
                style="width:140px;"
                @on-change="centerChange"
            >
                <Option v-for="item in searchArr.officeIdList" :value="item.id" :key="item.value">{{ item.code }}{{ item.name }}</Option>
            </Select>
            <Select
                :disabled="findObj.type === '0' || !findObj.type"
                v-model="findObj.gradeType"
                :placeholder="$t('courselist_courselist_223')"
                style="width:140px;"
                clearable
                @on-change="getGradeList"
            >
                <Option v-for="item in searchArr.gradeTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select :disabled="findObj.type === '0' || !findObj.type" v-model="findObj.grade" :placeholder="$t('messagemanagement_index_355')" style="width:140px;" clearable>
                <Option v-for="item in searchArr.gradeList" :value="item.value" :key="item.value" v-show="findObj.gradeType == item.type">{{ item.label }}</Option>
            </Select>
            <div class="radius_wrap">
                <div class="radius_box">
                    <RadioGroup v-model="findObj.type" @on-change="setType">
                        <Radio v-for="item in searchArr.typeList" :label="item.value" :key="item.value">{{ item.label }}</Radio>
                    </RadioGroup>
                </div>
            </div>
        </v-search-collapse>
        <div class="map_wrap">
            <baidu-map class="map" ak="AA328d36b4b2243360980b8b094988f3" :center="center" :zoom="5" scroll-wheel-zoom @ready="handler" @load="loadding">
                <bm-view class="bm-view"></bm-view>
                <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
                <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
                <!-- <bml-marker-clusterer :averageCenter="true" :styles="cluStyle"> -->
                <!-- <bm-marker v-for="(item, index) in points" :key="index" :position="{ lng: item.lng, lat: item.lat }" @mouseover="mouseoverHandler" @mouseout="mouseoutHandler">
                        <bm-label
                            :content="1"
                            :labelStyle="{
                                color: 'white',
                                fontSize: '12px',
                                background: 'transparent',
                                border: 'none',
                                width: '18px',
                                height: '20px',
                                'line-height': '20px',
                                'text-align': 'center',
                                display: 'block',
                                'font-weight': 'bold'
                            }"
                        />
                    </bm-marker> -->
                <!-- </bml-marker-clusterer> -->
                <!-- <bm-point-collection
                    :points="points"
                    shape="BMAP_POINT_SHAPE_STAR"
                    color="red"
                    size="BMAP_POINT_SIZE_BIG"
                    @mouseover="mouseoverHandler"
                    @mouseout="mouseoutHandler"
                ></bm-point-collection> -->
            </baidu-map>
            <div class="collection_info_wrap" :style="{ top: top + 'px', left: left + 'px' }" @mouseover="clearGo" @mouseout="mouseoutHandler">
                <div class="collection_info_box">
                    <div class="collection_info" v-for="item in showLeadsList" :key="item.id">{{ item.enName ? item.enName + '/' : '' }}{{ item.name }}</div>
                </div>
                <div class="collection_info_triangle"></div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex';
import vSearchCollapse from '@public/modules/vSearchCollapse';
import valid, { errors, crmTerritory, common, sysUser, sysDict, sysCommonSql } from '../../libs/request';
import { waitUntil } from '@public/libs/util';
import { MENUIDS } from '@public/libs/config';
import { BaiduMap, BmView, BmGeolocation, BmControl, BmAutoComplete, BmCityList, BmPointCollection, BmlMarkerClusterer, BmMarker, BmLabel } from 'vue-baidu-map';
import MarkerClusterer from 'bmaplib.markerclusterer';
import pin from './pin.png';
export default {
    name: 'crm.clientAreaAround',
    mixins: ['markerClusterer'],
    data() {
        return {
            BMap: '',
            map: '',
            pId: '',
            goOut: null,
            points: [],
            leadsList: {},
            showLeadsList: [],
            top: -99999,
            left: -99999,
            center: { lng: 116.395645038, lat: 39.9299857781 },
            findObj: {
                officeId: '',
                gradeType: '',
                grade: '',
                type: '0'
            },
            searchArr: {
                officeIdList: [],
                gradeTypeList: [],
                gradeList: [],
                typeList: [
                    { value: '1', label: this.$t('modules_spoc_crm_web_src_views_clientareaaround_clientareaaround_784') },
                    { value: '0', label: this.$t('modules_spoc_crm_web_src_views_clientareaaround_clientareaaround_785') }
                ]
            },
            // markerClusterer: {},
            markers: [],
            cluStyle: [
                { url: pin, size: { width: 20, height: 26 }, opt_anchor: [16, 0], textColor: 'white', opt_textSize: 10 },
                { url: './pin.png', size: { width: 20, height: 26 }, opt_anchor: [40, 35], textColor: 'white', opt_textSize: 12 },
                { url: './pin2.png', size: { width: 40, height: 52 }, opt_anchor: [32, 0], textColor: 'white', opt_textSize: 14 }
            ],
            centerBF: { lng: 116.395645038, lat: 39.9299857781 },
            mapvLayer: '',
            oldkeys: ''
        };
    },
    computed: {
        ...mapState(['app'])
    },
    components: {
        vSearchCollapse,
        BaiduMap,
        BmView,
        BmGeolocation,
        BmControl,
        BmAutoComplete,
        BmCityList,
        BmPointCollection,
        BmlMarkerClusterer,
        BmMarker,
        BmLabel
    },
    mounted() {
        this.pId = MENUIDS.CRM;
        this.dataScopeFilter();
        this.batchListData();
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        batchListData() {
            this.updateLoadingStatus({ isLoading: true });
            let types = 'jw_course_type'; //课程包分类,适用年级
            sysDict
                .batchListData({
                    types
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.searchArr.gradeTypeList = res.data.data.jw_course_type;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        getGradeList(value) {
            this.updateLoadingStatus({ isLoading: true });
            let types = value; //课程包分类,适用年级
            sysDict
                .batchListData({
                    types
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.searchArr.gradeList = res.data.data[value];
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        getLeadsList() {
            this.updateLoadingStatus({ isLoading: true });
            let params = {
                grade: this.findObj.grade,
                gradeType: this.findObj.gradeType,
                officeId: this.findObj.officeId,
                type: this.findObj.type
            };
            crmTerritory
                .list(params)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let arr = [];
                        let BMap = this.BMap;
                        let _this = this;
                        let mapv = require('mapv');
                        this.leadsList = res.data.data;
                        // this.map.clearOverlays();
                        // let markers=[];
                        // arr = Object.keys(this.leadsList).map(v => {
                        //     let point = { lng: v.split(',')[0], lat: v.split(',')[1] };
                        //                      let myIcon = new BMap.Icon(window.location.origin+'/spoc-crm/upload/noDel/Star.png', new BMap.Size(14, 14), {
                        //                          offset: new BMap.Size(0, 0), // 指定定位位置
                        //                          imageOffset: new BMap.Size(0, 0) // 设置图片偏移
                        //                      });
                        //                      var marker = new BMap.Marker(point, { icon: myIcon });
                        //                      this.map.addOverlay(marker);
                        //                      marker.addEventListener('mouseover', _this.mouseoverHandler);
                        //                      marker.addEventListener('mouseout', _this.mouseoutHandler);
                        // markers.push(marker);
                        //     return point;
                        // });
                        let randomCount = 100000;
                        Object.keys(this.leadsList).forEach(val => {
                            this.leadsList[val].forEach(v => {
                                arr.push({
                                    geometry: {
                                        type: 'Point',
                                        coordinates: [v.lng, v.lat]
                                    },
                                    // 具体点的icon设置
                                    iconOptions: {
                                        url: [], // 非聚合时点的icon,可设置为空
                                        width: 50 / 3,
                                        height: randomCount % 3 === 2 ? 50 / 3 : 77 / 3
                                    }
                                });
                            });
                        });
                        let dataSet = new mapv.DataSet(arr);
                        let options = {
                            // shadowColor: 'rgba(255, 250, 50, 1)',
                            // shadowBlur: 10,
                            // 非聚合点的颜色和大小，未设置icon或icon获取失败时使用
                            fillStyle: 'rgba(255, 50, 0, 1.0)',
                            size: 50 / 3 / 2, // 非聚合点的半径
                            // 非聚合时点的icon设置，会被具体点的设置覆盖，可设置为空
                            iconOptions: {
                                // url: 'images/marker.png',
                                // width: 50 / 3,
                                // height: 77 / 3,
                                offset: {
                                    x: 50 / 3 / 2,
                                    y: 50 / 3 / 2
                                }
                            },
                            minSize: 8, // 聚合点最小半径
                            maxSize: 31, // 聚合点最大半径
                            globalAlpha: 0.8, // 透明度
                            clusterRadius: 150, // 聚合像素半径
                            maxClusterZoom: 18, // 最大聚合的级别
                            maxZoom: 19, // 最大显示级别
                            minPoints: 2, // 最少聚合点数，点数多于此值才会被聚合
                            extent: 400, // 聚合的细腻程度，越高聚合后点越密集
                            label: {
                                // 聚合文本样式
                                show: true, // 是否显示
                                fillStyle: 'white'
                                // shadowColor: 'yellow',
                                // font: '20px Arial',
                                // shadowBlur: 10,
                            },
                            gradient: { 0: 'blue', 0.5: 'yellow', 1.0: 'rgb(255,0,0)' }, // 聚合图标渐变色
                            draw: 'cluster',
                            methods: {
                                click(point) {
                                    if (point) {
                                        if (point.iconOptions) {
                                            console.log(point.iconOptions.url);
                                        }
                                        // 通过children可以拿到被聚合的所有点
                                        console.log(point.children);
                                    }
                                },
                                mousemove(point, $e) {
                                    if (point && !point.children.length) {
                                        let keys = String(Number(point.geometry.coordinates[0]) + ',' + Number(point.geometry.coordinates[1]));
                                        if (_this.oldkeys != keys) {
                                            _this.oldkeys = keys;
                                            _this.mouseoverHandler(point);
                                            console.log(1)
                                        }
                                    } else {
                                        if(_this.oldkeys&&!_this.goOut){
                                            _this.mouseoutHandler(point);console.log(2)
                                        }
                                    }
                                }
                                // mouseout(point) {
                                //     console.log(point)
                                //     if (point) {
                                //         this.mouseoutHandler(point);
                                //     }
                                // }
                            }
                        };
                        this.mapvLayer = new mapv.baiduMapLayer(this.map, dataSet, options);
                        // this.markers=markers;
                        this.points = arr;
                        console.log(arr);
                        // console.log(markers,1122)
                        // this.markerClusterer = new MarkerClusterer(this.map, {markers:_this.markers});
                        // let BMap = this.BMap;
                        // let map = this.map;

                        // // 编写自定义函数,创建标注
                        // function addMarker(point) {
                        //     var marker = new BMap.Marker(point);
                        //     marker.setAnimation(BMAP_ANIMATION_BOUNCE);
                        //     map.addOverlay(marker);
                        // }
                        // Object.keys(this.leadsList).forEach(v => {
                        //     var point = new BMap.Point(v.split(',')[0], v.split(',')[1]);
                        //     addMarker(point);
                        // });
                    }
                })
                .catch(errors.call(this))
                .finally(() => {
                    this.updateLoadingStatus({ isLoading: false });
                });
        },
        dataScopeFilter() {
            // 获取校区列表
            sysUser
                .dataScopeFilter({
                    menuId: this.pId
                })
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        this.searchArr.officeIdList = res.data.data;
                        waitUntil(
                            () => {
                                return !!this.app.currOfficeId;
                            },
                            () => {
                                this.findObj.officeId = this.app.currOfficeId;
                            }
                        );
                    }
                })
                .catch(errors.call(this));
        },
        searchList() {
            this.getLeadsList();
        },
        resetSearch() {
            for (let item in this.findObj) {
                this.findObj[item] = '';
            }
            this.findObj.type = '0';
            this.leadsList = [];
            this.points = [];
            this.$set(this.findObj, 'officeId', this.app.currOfficeId);
            this.getLeadsList();
        },
        setType() {
            this.$set(this.findObj, 'officeId', this.app.currOfficeId);
            this.findObj.gradeType = '';
            this.findObj.grade = '';
        },
        handler({ BMap, map }) {
            let _this = this; // 设置一个临时变量指向vue实例，因为在百度地图回调里使用th
            this.BMap = BMap;
            this.map = map;
            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(
                function(r) {
                    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                        console.log(r);
                        _this.center = { lng: r.point.lng, lat: r.point.lat };
                        _this.centerBF = { lng: r.point.lng, lat: r.point.lat };
                        var point = new BMap.Point(r.point.lng, r.point.lat); //用当前定位的经纬度查找省市区街道等信息
                        var gc = new BMap.Geocoder();
                        map.centerAndZoom(r.point, 10);
                        gc.getLocation(point, function(rs) {
                            var addComp = rs.addressComponents;
                            console.log(rs); //地址信息
                            console.log(rs.address); //弹出当前所在地址
                            _this.keyword = rs.address;
                            _this.province = rs.addressComponents.province;
                            _this.city = rs.addressComponents.city;
                            _this.region = rs.addressComponents.district;
                            _this.lng = rs.point.lng;
                            _this.lat = rs.point.lat;
                        });
                        // let markers = new BMap.Marker(r.point);
                        // map.addOverlay(markers);
                        map.panTo(r.point);
                    } else {
                        alert('failed' + this.getStatus());
                    }
                },
                { enableHighAccuracy: true }
            );
            this.searchList();
        },
        loadding() {},
        mouseoverHandler(point) {
            this.showLeadsList = [];
            clearTimeout(this.goOut);
            this.goOut='';
            let keys = Number(point.geometry.coordinates[0]).toFixed(2) + ',' + Number(point.geometry.coordinates[1]).toFixed(2);
            this.showLeadsList = this.leadsList[keys] || [];
            this.$nextTick(() => {
                let wrap = this.$el.querySelectorAll('.collection_info_wrap');
                let wid = wrap[0].offsetWidth;
                let height = wrap[0].scrollHeight;
                let position = { x: point.geometry._coordinates[0], y: point.geometry._coordinates[1] };
                this.top = position.y - height;
                this.left = position.x - wid / 2;
            });
        },
        mouseoutHandler() {
            this.goOut = setTimeout(() => {
                this.top = -99999;
                this.left = -99999;
                this.showLeadsList = [];
                this.oldkeys = '';
            }, 1000);
        },
        clearGo() {
            clearTimeout(this.goOut);
        },
        centerChange(item) {
            if (!item) {
                item = this.searchArr.officeIdList[0].id;
            }
            let addressObj = this.searchArr.officeIdList.find(v => v.id == item);
            let address = this.centerBF;
            if (addressObj && addressObj.latLongAddress) {
                let arr = addressObj.latLongAddress.split(',');
                address = { lng: arr[0], lat: arr[1] };
            }
            this.center = address;
            console.log(address, addressObj.latLongAddress);
        }
    },
    watch: {
        'app.currOfficeId': function(val, oldVal) {
            if (oldVal) {
                this.$set(this.findObj, 'officeId', this.app.currOfficeId);
                this.getListData();
            }
        }
    }
};
</script>
