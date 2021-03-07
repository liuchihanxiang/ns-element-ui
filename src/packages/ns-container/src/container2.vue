<template>
  <div class="container2">
    <div class="header">
      <div class="title"
        v-show="title">
        <span class="name">{{title}}</span>
        <div class="trapezium"></div>
        <div class="trapezium trapezium1"></div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import containerMixins from './mixins'

export default {
  name: 'container2',
  mixins: [containerMixins]
}
</script>
