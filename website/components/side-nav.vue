<template>
  <div class="side-nav_wraps">
    <ul>
      <li v-for="(item, index) in routeList" @click="showComponent(item.name)" :key="item.name" :class="{ active: $route.name === item.name }">{{ item.title }}</li>
    </ul>
  </div>
</template>

<script>
import { componentsList } from './../nav.config'
export default {
  data() {
    return {
      routeList: componentsList,
    }
  },
  methods: {
    showComponent(name) {
      if (name === this.$route.name) {
        return
      }
      this.$router.push({ name })
    },
  },
}
</script>

<style lang="scss" scoped>
.side-nav_wraps {
  ul li {
    list-style: none;
    color: #5e6d82;
    line-height: 1.8;
    cursor: pointer;
    &.active {
      color: #409eff;
    }
  }
}
</style>>

