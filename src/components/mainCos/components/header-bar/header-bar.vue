<template>
  <div class="header-bar">
    <div v-if="!leftMenu" style="float: left;display: inline-block;margin-top: 10px;margin-right:20px;width: 160px;">
      <img :src="logoImgUrl" style="height: 30px;width: auto;display: block;margin-left:8px;"/>
    </div>  <!-- 初始创建企业才显示 -->
  	<a style="cursor: pointer;display: inline-block;font-size: 14px;" @click="gomenu">
  		<Icon type="md-apps" size="24"/>{{$t('portal.allApplication')}}<!-- 全部应用 -->
  	</a>
    <custom-bread-crumb show-icon style="margin-left: 20px;" :list="breadCrumbList"></custom-bread-crumb>
    <div class="custom-content-con">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import customBreadCrumb from './custom-bread-crumb'
import './header-bar.less'
export default {
  name: 'HeaderBar',
  components: {
    customBreadCrumb
  },
  props: {
    
    logoImgUrl:{
      type:String
      // 初始创建企业才有用
    },
    leftMenu:{
      type: Boolean
      // 初始创建企业才有用
    }
  },
  computed: {
    breadCrumbList () {
      return this.$store.state.app.breadCrumbList;
    }
  },
  created(){
  },
  methods: {
  	gomenu(){
  		this.$router.push({name:this.$config.homeName})
  	}
  }
}
</script>
