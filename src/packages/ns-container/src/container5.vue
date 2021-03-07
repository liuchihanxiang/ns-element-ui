<template>
  <div class="container5">
    <span class="trapezoid_line"></span>
    <span class="trapezoid_line bottom-left"></span>
    <div class="header_wraps">
      <span class="bottom"></span>
      <p class="title">
        <span class="top"></span>
        <span class="name">{{title}}</span>
      </p>
    </div>

    <slot></slot>
  </div>
</template>

<script>
import containerMixins from './mixins'

export default {
  name: 'container5',
  mixins: [containerMixins]
}
</script>
