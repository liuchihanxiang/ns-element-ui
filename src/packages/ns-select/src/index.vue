<template>
  <el-select v-model="text" v-bind="$attrs" @change="handleChange" v-on="$listeners">
    <el-option v-for="item in dicData" :key="item.value" :label="item[dicLabelKey]" :value="item[dicValueKey]"></el-option>
  </el-select>
</template>

<script>
import formMxins from './../../core/form'
export default {
  mixins: [formMxins],
  name: 'NsSelect',
  props: {
    value: {
      type: [String, Number, Array],
      default: '',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: '',
    },
    collapseTags: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    filterable: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: '',
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
