<template>
  <div :class="`container0 dim_${state}`">
    <span class="border border_top-left"></span>
    <span class="border border_top-right"></span>
    <span class="border border_bottom-right"></span>
    <span class="border border_bottom-left"></span>

    <ul v-if="(title instanceof Array)"
      class="title_list">
      <li v-for="(item,index) in title"
        :key="index"
        :class="{'title_item':true,'title_item_active':activeIndex == index}"
        @click="headerTitleClick(index)">{{item}}</li>
    </ul>
    <div :class="`title${type === 2 ? '-header':''} `"
      v-else>{{title}}</div>

    <slot />
  </div>
</template>
<script>
import containerMixins from './mixins'

export default {
  name: 'container0',
  mixins: [containerMixins],
  props: {
    title: [String, Array]
  },
  data() {
    return {
      activeIndex: 0
    }
  },
  methods: {
    headerTitleClick(index) {
      this.activeIndex = index
      this.$emit('handleTitleClick', index)
    }
  }
}
</script>

