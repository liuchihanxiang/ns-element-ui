<template>
  <el-checkbox-group v-model="text"
    @change="handleChange">
    <el-checkbox v-for="item in formatter(dicData)"
      :key="item[dicValueKey]"
      :label="item[dicValueKey]">{{item[dicLabelKey]}}</el-checkbox>
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
    },
    formatter(dicData) {
      if (dicData.length && (typeof dicData[0] === 'number' || typeof dicData[0] === 'string')) {
        return dicData.map((item) => {
          return {
            name: item,
            id: name
          }
        })
      } else {
        return dicData || []
      }
    }
  },
  watch: {
    value: {
      handler: function (val) {
        if (val && val.length) {
          this.text = val
        }
      },
      deep: true
    }
  }
}
</script>
