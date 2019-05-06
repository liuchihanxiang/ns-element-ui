<!--  -->
<template>
  <el-breadcrumb class="app-breadcrumb"
                 separator-class="el-icon-arrow-right">
    <transition-group name="breadcrumb">
      <template v-for="(item,index)  in levelList">
        <el-breadcrumb-item :key="item.path"
                            v-if='isHasBreadcrumb(item)'>
          <span v-if='index==levelList.length-1 || isFirst(item.redirect)'
                class="no-redirect">{{getInternationalValue('routes.'+(item.name||""))}}</span>
          <router-link v-else
                       :to="item.path">{{getInternationalValue('routes.'+(item.name||""))}}</router-link>
        </el-breadcrumb-item>
      </template>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { getInternationalValue, isExist } from '../../utils/index'
export default {
  name: 'Breadcrumb',
  created () {
    this.getBreadcrumb()
  },
  data () {
    return {
      levelList: null
    }
  },
  props: {
    isInternational: {
      type: Boolean
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  methods: {
    getInternationalValue,
    getBreadcrumb () {
      let iconList = this.$route.matched.filter(item => item.name)
      const first = iconList[0]
      if (first && first.name !== 'homepage') {
        iconList = [
          { path: '/homepage', name: 'homepage' }
        ].concat(iconList)
      }
      this.levelList = iconList
    },
    isFirst (redirect) {
      let redirectName = redirect && redirect.name ? redirect.name : false
      if (redirectName) {
        let currentName = this.$route.name
        return currentName === redirectName
      } else {
        return false
      }
    },
    isHasBreadcrumb (item) {
      return !!item.name
    }
  },
  computed: {
    // 是否国际化
    international () {
      return isExist(this.isInternational) ? this.isInternational : this.$NS.isInternational
    }
  }
}
</script>
<style lang='scss' scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 10px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
