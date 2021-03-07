<template>
  <div class="container4 mini">
    <span class="corner corner--top_left"></span>
    <span class="corner corner--top_right"></span>
    <span class="corner corner--bottom_left"></span>
    <span class="corner corner--bottom_right"></span>
    <span class="title"
      v-if="title">{{title}}</span>
    <slot />
  </div>
</template>
<script>
import containerMixins from './mixins'

export default {
  name: 'container4',
  mixins: [containerMixins]
}
</script>
