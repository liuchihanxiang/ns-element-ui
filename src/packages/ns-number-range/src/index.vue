<template>
  <div class="ns-number-rang">
    <el-input
      v-model.number="text[0]"
      :style="{ width: width + 'px' }"
      @input="
        (value) => {
          handleChange(value, 0)
        }
      "
      @blur="
        (event) => {
          handleBlur(event)
        }
      "
      :placeholder="placeholderMin"
      :min="min"
      :max="max"
    >
      <template slot="suffix">
        <slot name="suffix"></slot>
      </template>
      <template slot="prefix">
        <slot name="prefix"></slot>
      </template>
    </el-input>
    <span class="split" style="margin: 0 5px">—</span>
    <el-input
      v-model.number="text[1]"
      :style="{ width: width + 'px' }"
      :min="min"
      :max="max"
      @blur="
        (event) => {
          handleBlur(event, 1)
        }
      "
      @input="
        (value) => {
          handleChange(value, 1)
        }
      "
      :placeholder="placeholderMax"
    >
      <template slot="suffix">
        <slot name="suffix"></slot>
      </template>
      <template slot="prefix">
        <slot name="prefix"></slot>
      </template>
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'NsNumberRange',
  props: {
    value: {
      type: Array,
      default: () => ['', ''],
    },
    width: {
      type: Number,
      default: 100,
    },
    prefixIcon: {
      type: String,
      default: null,
    },
    suffixIcon: {
      type: String,
      default: null,
    },
    max: {
      type: Number,
      default: null,
    },
    placeholder: {
      type: [String, Array],
      default: '',
    },
    min: {
      type: Number,
      default: null,
      placeholderMin: '',
      placeholderMax: '',
    },
  },
  data() {
    return {
      text: this.value.length === 2 ? this.value : ['', ''],
    }
  },
  methods: {
    handleChange(val, index) {
      let str = val + ''
      this.text[index] = str.replace(/\D/g, '')
      this.$emit('input', this.text)
    },

    handleBlur(event, index) {
      let min = this.text[0]
      let max = this.text[1]
      if (min !== '' && max !== '') {
        if (min - max >= 0) {
          this.text = [max, min]
          this.handleChange()
        }
      }
      this.$emit('blur', event)
    },
  },
  computed: {},
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
  created() {
    if (typeof this.placeholder === 'string' || (this.placeholder instanceof Array && this.placeholder.length === 1)) {
      this.placeholderMin = this.placeholder + ''
      this.placeholderMax = this.placeholder + ''
    } else if (this.placeholder instanceof Array && this.placeholder.length >= 2) {
      this.placeholderMin = this.placeholder[0]
      this.placeholderMax = this.placeholder[1]
    }
  },
}
</script>
