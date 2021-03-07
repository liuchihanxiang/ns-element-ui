<template>
  <div class="container1">
    <span class="border_top-left"></span>
    <span class="border-left"></span>
    <slot />
  </div>
</template>

<script>
import containerMixins from './mixins'

export default {
  name: 'container1',
  mixins: [containerMixins]
}
</script>
