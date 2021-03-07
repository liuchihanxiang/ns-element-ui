<template>
  <div class="container3">
    <div class="header">
      <span class="border-bottom"></span>
      <div class="title"
        v-show="title">
        <span>{{title}}</span>
        <div class="trapezium1"></div>
        <div class="trapezium2"></div>
      </div>
      <span class="bg left"></span>
      <span class="bg right"></span>
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>
<script>
import containerMixins from './mixins'

export default {
  name: 'container3',
  mixins: [containerMixins]
}
</script>
