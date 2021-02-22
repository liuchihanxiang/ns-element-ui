<template>
  <el-checkbox-group v-model="text" v-bind="$attrs" v-on="$listeners" @change="handleChange">
    <el-checkbox v-for="item in formatterDicData" :key="item[dicValueKey]" :label="item[dicValueKey]">{{ item[dicLabelKey] }}</el-checkbox>
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
      default: () => [],
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
        if (val && val.length) {
          this.text = val
        }
      },
      deep: true,
    },
  },
  computed: {
    formatterDicData() {
      let { dicData, dicLabelKey, dicValueKey } = this
      if (dicData.length && (typeof dicData[0] === 'number' || typeof dicData[0] === 'string')) {
        return dicData.map((item) => {
          return {
            [dicLabelKey]: item,
            [dicValueKey]: item,
          }
        })
      } else {
        return dicData || []
      }
    },
  },
}
</script>
