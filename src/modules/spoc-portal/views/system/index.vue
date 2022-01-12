<style lang="less">
.plan_container {
    height: 100%;
    display: flex;
    .content {
        flex: 1;
        overflow-y: auto;
        padding: 10px;
        /*min-width: 1200px;*/
    } // 重写本模块iview部分样式
    .ivu-table-wrapper {
        /*margin-top: 5px;*/
        border: none;
        .ivu-table {
            th {
                /*background-color: #fff;*/
            }
            &:after {
                display: none;
            }
        }
    }
}
</style>
<template>
    <div class="plan_container">
        <!--<left-menu type="spoc-portal"></left-menu>-->
        <div class="content">
            <!--<nav-title></nav-title>-->

            <keep-alive :include="cacheList"><router-view class="main_content"></router-view></keep-alive>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { MENUIDS } from '@public/libs/config';
import valid, { errors, sysMenu } from '../../libs/request';
// import leftMenu from "../../modules/leftMenu";
import navTitle from '@public/modules/navTitle';

let route = 'portal.system';

export default {
    name: 'portal.system',
    data() {
        return {
            pId: null
        };
    },
    computed: {
        ...mapState(['userInfo', 'appMenuList']),
        tagNavList() {
            return this.$store.state.app.tagNavList;
        },
        cacheList() {
            const list = [...(this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : [])];
            return list;
        }
    },
    components: {
        // leftMenu,
        navTitle
    },
    created() {
        this.pId = MENUIDS.PORTAL;
        this.getMenuData(this.pId);
    },
    methods: {
        autoFocus() {
            if (this.$route.name == route) {
                //未指定具体菜单
                let menus = this.$store.state.portal.menus;
                if (menus[0]) {
                    this.$router.replace({
                        name: menus[0].href,
                        query: {
                            id: menus[0].id
                        }
                    });
                }
            }
        },
        getMenuData(id) {
            const params = {
                id
            };
            if (!params.id) {
                //debugger;
            }
            sysMenu
                .listGrantMenu(params)
                .then(valid.call(this))
                .then(res => {
                    this.$store.commit('portal/updateMenu', {
                        menu: res.data.data
                    });
                    this.ready = true;
                    setTimeout(() => {
                        this.autoFocus();
                    }, 100);
                })
                .catch(errors.call(this));
        }
    }
};
</script>
