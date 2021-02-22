<template>
  <el-radio-group v-model="text" v-bind="$attrs" v-on="$listeners" @change="handleChange">
    <template v-if="button">
      <el-radio-button v-for="item in dicData" :key="item[dicValueKey]" :label="item[dicValueKey]">{{ item[dicLabelKey] }}</el-radio-button>
    </template>
    <template v-else>
      <el-radio v-for="item in dicData" :key="item[dicValueKey]" :label="item[dicValueKey]">{{ item[dicLabelKey] }}</el-radio>
    </template>
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
      default: () => [],
    },
    button: {
      type: Boolean,
      default: false,
    },
    dicData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      text: this.value,
    }
  },
  methods: {
    handleChange(val) {
      this.$emit('input', val)
    },
  },
  watch: {
    value: {
      handler: function (val) {
        if (val !== undefined) {
          this.text = val
        }
      },
      deep: true,
    },
  },
}
</script>
