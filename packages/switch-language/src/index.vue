<!--  -->
<template>
  <el-dropdown trigger="hover" @command="setLanguage">
    <div>
      <i class="icon iconfont icon-language" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="zh" :disabled="language==='zh'">中文</el-dropdown-item>
      <el-dropdown-item command="en" :disabled="language==='en'">English</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: 'SwitchLanguage',
  computed: {
    language() {
      return this.$store.getters.language
    }
  },
  methods: {
    setLanguage(lang) {
      this.$i18n.locale = lang
      this.$store.commit('SET_LANGUAGE', lang)
      this.$message.success({ message: this.$t('langTips'), center: true })
    }
  }
}
</script>
<style lang='scss' scoped>
.icon-language {
  font-size: 26px;
  cursor: pointer;
}
</style>
