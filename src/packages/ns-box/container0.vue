<template>
  <div class="container0 dim_p">
    <span class="border border_top-left"></span>
    <span class="border border_top-right"></span>
    <span class="border border_bottom-right"></span>
    <span class="border border_bottom-left"></span>

    <ul v-if="(title instanceof Array)"
      class="title_list">
      <li v-for="(item,index) in title"
        :key="index"
        :class="{'title_item':true,'title_item_active':activeIndex == index}"
        @click="headerTitleClick(index)">{{item.name}}</li>
    </ul>
    <div class="title"
      v-else>{{title}}</div>

    <slot />
  </div>
</template>
<script>
export default {
  name: 'container0',
  props: {
    title: {
      type: [String, Array],
      default: ''
    },
    afterHeaderTitleClick: {
      // 头部点击事件执行之后执行方法
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      activeIndex: 0
    }
  },
  methods: {
    headerTitleClick(index) {
      this.activeIndex = index
      this.afterHeaderTitleClick(index)
    }
  }
}
</script>

