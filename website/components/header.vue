<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item v-for="item in menuList" @click="switchMenu(item.prop)" :key="item.prop" :index="item.prop">{{ item.label }}</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: 'homepage',
      menuList: [
        {
          label: '首页',
          prop: 'homepage',
        },
        {
          label: '组件',
          prop: 'component',
        },
      ],
    }
  },
  methods: {
    switchMenu(name) {
      this.$router.push({ name })
    },
  },
  watch: {
    $route: {
      handler(route) {
        this.menuList.find(({ prop }) => {
          if (route.fullPath.includes(prop)) {
            this.activeIndex = prop
          }
        })
      },
      immediate: true,
    },
  },
}
</script>

<style>
</style>
