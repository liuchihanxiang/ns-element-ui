<template>
  <div ref="container--wrap">
    <component :title="title"
      :is="`container${code}`"
      :ref="activeCode"
      key="" />
  </div>
</template>

<script>
import container0 from './container0'
// import container1 from './container1'
// import container2 from './container2'
// import container3 from './container3'
export default {
  mixins: [],
  components: {
    container0
    // container1,
    // container2
    // container3
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    code: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {}
  },
  methods: {},
  watch: {},
  mounted() {}
}
</script>
