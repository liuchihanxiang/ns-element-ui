<template>
  <el-radio-group v-model="text"
    @change="handleChange">
    <el-radio v-for="item in dicData"
      :key="item[dicValueKey]"
      :label="item[dicValueKey]">{{item[dicLabelKey]}}</el-radio>
  </el-radio-group>
</template>

<script>
import formMxins from './../../core/form'
export default {
  name: 'NsRadio',
  mixins: [formMxins],
  props: {
    value: {
      type: [String, Number, Boolean],
      default: () => []
    },
    dicData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      text: this.value
    }
  },
  methods: {
    handleChange(val) {
      this.$emit('input', val)
      this.$emit('change', val)
    }
  },
  watch: {
    value: {
      handler: function (val) {
        if (val !== undefined) {
          this.text = val
        }
      },
      deep: true
    }
  }
}
</script>
