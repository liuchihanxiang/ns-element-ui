<template>
  <div ref="container--wrap">
    <component v-bind="$attrs"
      v-on="$listeners"
      :is="`container${code}`"
      :ref="`container${code}`">
      <slot />
    </component>
  </div>
</template>

<script>
import container0 from './container0'
import container1 from './container1'
import container2 from './container2'
import container3 from './container3'
import container4 from './container4'
import container5 from './container5'
export default {
  name: 'NsContainer',
  mixins: [],
  components: {
    container0,
    container1,
    container2,
    container3,
    container4,
    container5
  },
  props: {
    code: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {}
  },
  methods: {},
  mounted() {
    console.log(this.$attrs)
  }
}
</script>
