<template>
  <el-checkbox-group v-model="text" @change="handleChange">
    <el-checkbox v-for="item in dicData" :key="item[dicValueKey]" :label="item[dicValueKey]">{{item[dicLabelKey]}}</el-checkbox>
  </el-checkbox-group>
</template>

<script>
import formMxins from './../../core/form'
export default {
  name: 'NsCheckbox',
  mixins: [formMxins],
  props: {
    value: {
      type: Array,
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
      handler: function(val) {
        if (val && val.length) {
          this.text = val
        }
      },
      deep: true
    }
  }
}
</script>
