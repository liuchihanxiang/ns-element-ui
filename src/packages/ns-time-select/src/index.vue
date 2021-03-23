<template>
  <div>
    <el-time-select :placeholder="getPlaceholder(type, column)"
      :readonly="column.readonly"
      :editable="column.editable"
      :disabled="column.disabled"
      key="start"
      v-model="formModel[column.prop][0]"
      :picker-options="{
                   start: '08:30',
                   step: '00:15',
                   end: formModel[column.prop][1]||'18:30'
                }">
    </el-time-select>
    <span>-</span>
    <el-time-select :placeholder="getPlaceholder(type, column)"
      key="end"
      :readonly="column.readonly"
      :editable="column.editable"
      :disabled="column.disabled"
      v-model="formModel[column.prop][1]"
      :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30',
                    minTime: formModel[column.prop][0]
                }">
    </el-time-select>
  </div>
</template>

<script>
import formMxins from './../../core/form'
export default {
  name: 'NsTimeSelect',
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
  },
  computed: {
    formatterDicData() {
      let { dicData, dicLabelKey, dicValueKey } = this
      if (dicData.length && (typeof dicData[0] === 'number' || typeof dicData[0] === 'string')) {
        return dicData.map((item) => {
          return {
            [dicLabelKey]: item,
            [dicValueKey]: item
          }
        })
      } else {
        return dicData || []
      }
    }
  }
}
</script>
