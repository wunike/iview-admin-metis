<style lang="less">
.mapModel {
    .ivu-modal-body {
        overflow: hidden;
        height: 400px;
    }
    .map_wrap {
        overflow: hidden;
        width: 100%;
        height: 100%;
        .map {
            width: 100%;
            height: 260px;
            .bm-view {
                width: 100%;
                height: 100%;
            }
            .auto_complete {
            }
        }
        .search{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding-bottom:14px;
            .label{
                width: 50px;
                padding-left: 12px;
            }
        }
        .point {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding-bottom:14px;
            .label{
                width: 50px;
                padding-left: 12px;
            }
        }
    }
}
.tangram-suggestion-main {
    z-index: 9999999999 !important;
}
</style>

<template>
    <Modal v-model="modalMap" title="选择地址" width="800" :closable="true" :mask-closable="true" class-name="mapModel vertical-center-modal" @on-visible-change="modalMapVisible">
        <div class="map_wrap" v-if="modalMap">
            <bm-control>
                <bm-auto-complete @searchcomplete="searchcomplete">
                    <div class="search">
                    <span class="label">地址：</span>
                    <Input element-id="suggestId" v-model="keyword" placeholder="查找地址" style="width:300px" />
                    </div>
                </bm-auto-complete>
                <div class="point">
                    <span class="label">经度：</span>
                    <Input v-model="lng" disabled style="width: 200px" />
                    <span class="label">纬度：</span>
                    <Input v-model="lat" disabled style="width: 200px" />
                </div>
            </bm-control>
            <baidu-map class="map" ak="AA328d36b4b2243360980b8b094988f3" :center="center" scroll-wheel-zoom @ready="handler" @load="loadding" @rightclick="rightclick">
                <bm-view class="bm-view"></bm-view>
                <bm-geolocation
                    anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
                    :showAddressBar="true"
                    :autoLocation="true"
                    @locationSuccess="locationSuccess"
                    @locationError="locationError"
                ></bm-geolocation>
            </baidu-map>
            <div id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div>
        </div>
        <div slot="footer">
            <Button @click="modalMap = false">取消</Button>
            <Button type="primary" @click="mapOk">确定</Button>
        </div>
    </Modal>
</template>

<script>
import valid, { errors, sys, sysDict } from '@public/libs/request';
import { BaiduMap, BmView, BmGeolocation, BmControl, BmAutoComplete } from 'vue-baidu-map';
export default {
    props: {},
    data() {
        return {
            modalMap: false,
            keyword: '',
            dataList: [],
            center: { lng: 0, lat: 0 },
            BMap: {},
            map: {},
            province: '',
            city: '',
            region: '',
            lng: '',
            lat: ''
        };
    },
    components: {
        BaiduMap,
        BmView,
        BmGeolocation,
        BmControl,
        BmAutoComplete
    },
    created() {},
    mounted() {},
    methods: {
        close() {
            this.$nextTick(() => {
                this.modalMap = false;
            });
        },
        modelShow() {
            this.modalMap = true;
        },
        searchcomplete(val) {
            console.log(val, 5555555);
        },
        locationSuccess(item) {
            console.log(item, 'success');
        },
        locationError(item) {
            console.log(item, 'error');
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
                        var point = new BMap.Point(r.point.lng, r.point.lat); //用当前定位的经纬度查找省市区街道等信息
                        var gc = new BMap.Geocoder();
                        map.centerAndZoom(r.point, 16);
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
                        let markers = new BMap.Marker(r.point);
                        map.addOverlay(markers);
                        map.panTo(r.point);
                    } else {
                        alert('failed' + this.getStatus());
                    }
                },
                { enableHighAccuracy: true }
            );
            // 百度地图API功能
            function G(id) {
                return document.getElementById(id);
            }
            var ac = new BMap.Autocomplete({
                //建立一个自动完成的对象
                input: 'suggestId',
                location: map
            });
            ac.addEventListener('onhighlight', function(e) {
                //鼠标放在下拉列表上的事件
                var str = '';
                var _value = e.fromitem.value;
                var value = '';
                if (e.fromitem.index > -1) {
                    value = _value.province + _value.city + _value.district + _value.street + _value.business;
                }
                str = 'FromItem<br />index = ' + e.fromitem.index + '<br />value = ' + value;

                value = '';
                if (e.toitem.index > -1) {
                    _value = e.toitem.value;
                    value = _value.province + _value.city + _value.district + _value.street + _value.business;
                }
                str += '<br />ToItem<br />index = ' + e.toitem.index + '<br />value = ' + value;
                G('searchResultPanel').innerHTML = str;
            });

            var myValue;
            ac.addEventListener('onconfirm', function(e) {
                //鼠标点击下拉列表后的事件
                var _value = e.item.value;
                myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
                G('searchResultPanel').innerHTML = 'onconfirm<br />index = ' + e.item.index + '<br />myValue = ' + myValue;
                setPlace();
            });

            function setPlace() {
                map.clearOverlays(); //清除地图上所有覆盖物
                function myFun() {
                    var pp = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
                    map.centerAndZoom(pp, 18);
                    map.addOverlay(new BMap.Marker(pp)); //添加标注
                    var gc = new BMap.Geocoder();
                    gc.getLocation(pp, function(rs) {
                        var addComp = rs.addressComponents;
                        console.log(rs, '地址信息'); //地址信息
                        console.log(rs.address); //弹出当前所在地址
                        _this.keyword = rs.address;
                        _this.province = rs.addressComponents.province;
                        _this.city = rs.addressComponents.city;
                        _this.region = rs.addressComponents.district;
                        _this.lng = rs.point.lng;
                        _this.lat = rs.point.lat;
                    });
                }
                var local = new BMap.LocalSearch(map, {
                    //智能搜索
                    onSearchComplete: myFun
                });
                local.search(myValue);
            }
        },
        loadding() {},
        rightclick(r) {
            console.log(r, 50000);
            let _this = this;
            this.map.clearOverlays();
            var point = new this.BMap.Point(r.point.lng, r.point.lat); //用当前定位的经纬度查找省市区街道等信息
            var gc = new this.BMap.Geocoder();
            this.map.centerAndZoom(r.point, 16);
            gc.getLocation(point, function(rs) {
                var addComp = rs.addressComponents;
                console.log(rs, '地址信息'); //地址信息
                console.log(rs.address); //弹出当前所在地址
                _this.keyword = rs.address;
                _this.province = rs.addressComponents.province;
                _this.city = rs.addressComponents.city;
                _this.region = rs.addressComponents.district;
                _this.lng = rs.point.lng;
                _this.lat = rs.point.lat;
            });
            let markers = new this.BMap.Marker(r.point);
            this.map.addOverlay(markers);
            this.map.panTo(r.point);
        },
        mapOk() {
            this.$emit('mapOk', this.keyword, this.province, this.city, this.region, this.lng, this.lat);
            this.close();
        }
    },
    watch: {
        //			xqList: {
        //				handler: function(val, oldVal) {
        //
        //				},
        //				deep: true
        //			}
    }
};
</script>
