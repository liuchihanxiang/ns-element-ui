<template>
  <div class="ns-base-form">
    <el-form
      ref="form"
      :model="formModel"
      v-if="notEmptyArray(actualFormList)"
      :label-position="labelPosition"
      :inline="inline"
      :disabled="disabled"
      :inline-message="inlineMessage"
      :show-message="showMessage"
      :label-suffix="labelSuffix"
      :status-icon="statusIcon"
      :size="size"
      :validate-on-rule-change="validateOnRuleChange"
      :label-width="labelWidth+'px'"
    >
      <el-row :gutter="20" :span="24">
        <template v-for="(column,index) in actualFormList">
          <el-col :span="column.span||24" :key="index" :class="column.colClass||''" class="ns-item-container">
            <el-form-item
              :label="type!=='searchForm'?getInternationalValue(column.label||column.placeholder):''"
              :prop="column.prop"
              :class="column.class"
              v-if="column.type!=='outItemSlot'&&column.show===undefined?true:column.show"
              :rules="type!=='searchForm'?(column.rules||[]):[]"
              :label-width="(column.labelWidth|| labelWidth)+'px'"
            >
              <!-- input或textarea -->
              <el-input
                v-if="isElInput(column.type)"
                v-model="formModel[column.prop]"
                :maxlength="column.maxlength||30"
                :show-word-limit="getDefaultVal(column.showWordLimit,true)"
                :type="column.type"
                :size="column.size"
                :readonly="column.readonly"
                :disabled="column.disabled&&type!=='searchForm'"
                :clearable="getDefaultVal(column.clearable,true)"
                :autosize="column.autosize"
                :placeholder="getPlaceholder(type,column)"
                :prefix-icon="column.prefixIcon"
                :suffix-icon="column.suffixIcon"
                :rows="column.rows"
              />

              <el-input
                v-else-if="column.type==='textarea'"
                v-model="formModel[column.prop]"
                :maxlength="column.maxlength||500"
                :show-word-limit="getDefaultVal(column.showWordLimit,true)"
                :type="column.type"
                :size="column.size"
                :readonly="column.readonly"
                :disabled="column.disabled&&type!=='searchForm'"
                :clearable="getDefaultVal(column.clearable,true)"
                :autosize="column.autosize"
                :placeholder="getPlaceholder(type,column)"
                :prefix-icon="column.prefixIcon"
                :suffix-icon="column.suffixIcon"
                :rows="column.rows"
              />
              <!-- 多选-->
              <el-checkbox-group
                v-else-if="column.type==='checkbox'"
                v-model="formModel[column.prop]"
                :size="column.size"
                :min="column.min"
                :max="column.max"
                :text-color="column.textColor"
                :fill="column.fill"
                :disabled="column.disabled&&type!=='searchForm'"
              >
                <el-checkbox
                  v-for="(item,index) in filterDic(column.dicData,dicList[column.dicData||column.prop])"
                  :key="index"
                  :border="column.border"
                  :true-label="column.trueLabel"
                  :false-label="column.falseLabel"
                  :indeterminate="item.indeterminate||column.indeterminate"
                  :disabled="item.disabled"
                  :name="column.prop"
                  :label="getValue(item,column)"
                >{{getLabel(item,column.labelKey)}}</el-checkbox>
              </el-checkbox-group>
              <!-- 单选按钮 -->
              <el-radio-group
                v-else-if="column.type==='radio'"
                v-model="formModel[column.prop]"
                :size="column.size"
                :name="column.prop"
                @change="(value)=>column.change?column.change(value,filterDic(column.dicData,dicList[column.dicData||column.prop])):''"
                :readonly="column.readonly"
                :disabled="column.disabled&&type!=='searchForm'"
              >
                <el-radio
                  v-for="(item,index) in filterDic(column.dicData,dicList[column.dicData||column.prop])"
                  :key="index"
                  :label="getValue(item,column)"
                  :border="column.border"
                >{{getLabel(item,column.labelKey)}}</el-radio>
              </el-radio-group>
              <!-- 下拉 -->
              <el-select
                v-else-if="column.type==='select'"
                v-model="formModel[column.prop]"
                :placeholder="getPlaceholder(type,column)"
                :size="column.size"
                :clearable="getDefaultVal(column.clearable,true)"
                :multiple="column.multiple"
                :disabled="column.disabled&&type!=='searchForm'"
                :value-key="column.valueKey||'value'"
                :collapse-tags="column.collapseTags"
                @remove-tag="(value)=>column.removeTag?column.removeTag(value,filterDic(column.dicData,dicList[column.dicData||column.prop])):''"
                @change="(value)=>column.change?column.change(value,filterDic(column.dicData,dicList[column.dicData||column.prop])):''"
                :multiple-limit="column.multipleLimit"
              >
                <el-option
                  v-for="(item, index) in filterDic(column.dicData,dicList[column.dicData||column.prop])"
                  :key="index"
                  :disabled="handleDisabled(item,column)"
                  :label="getLabel(item,column.labelKey)"
                  :value="getValue(item,column)"
                />
              </el-select>
              <!-- 时间选择器 -->
              <el-time-picker
                v-else-if="column.type==='timePicker'"
                v-model="formModel[column.prop]"
                :placeholder="getPlaceholder(type,column)"
                :start-placeholder="getInternationalValue(column.startPlaceholder)"
                :end-placeholder="getInternationalValue(column.endPlaceholder)"
                :readonly="column.readonly"
                :disabled="column.diabled&&type!=='searchForm'"
                :size="column.size"
                :clearable="getDefaultVal(column.clearable,true)"
                :is-range="column.isRange"
                :arrow-control="column.arrowControl"
                :align="column.align"
                :popper-class="column.popperClass"
                :range-separator="column.rangeSeparator"
                :picker-options="column.pickerOptions"
                :value-format="column.valueFormat"
                :prefix-icon="column.datePrefixIcon"
                :clear-icon="column.clearIcon"
              />
              <!-- 日期选择器     -->
              <el-date-picker
                v-else-if="isDatePicker(column.type)"
                v-model="formModel[column.prop]"
                :type="column.type"
                :placeholder="getPlaceholder(type,column)"
                :start-placeholder="getInternationalValue(column.startPlaceholder)"
                :end-placeholder="getInternationalValue(column.endPlaceholder)"
                :readonly="column.readonly"
                :disabled="column.diabled"
                :size="column.size"
                :clearable="getDefaultVal(column.clearable,true)"
                :is-range="column.isRange"
                :format="column.format"
                :align="column.align"
                :default-value="column.defaultValue"
                :popper-class="column.popperClass"
                :range-separator="column.rangeSeparator||'-'"
                :picker-options="column.pickerOptions"
                :value-format="column.valueFormat||'yyyy-MM-dd HH:mm:ss'"
                :prefix-icon="column.datePrefixIcon"
              />
              <!-- 计数器 -->
              <el-input-number
                v-else-if="column.type==='number'"
                v-model="formModel[column.prop]"
                :size="column.size"
                :min="column.minNum"
                :max="column.maxNum"
                :step="column.step"
                :disabled="column.disabled&&type!=='searchForm'"
                :controls="column.controls"
                :placeholder="getPlaceholder(type,column)"
                :label="getInternationalValue(column.placeholder)"
                :controls-position="column.controlsPosition"
              />
              <!-- Switch 开关 -->
              <el-switch
                v-else-if="column.type==='switch'"
                v-model="formModel[column.prop]"
                :disabled="column.disabled&&type!=='searchForm'"
                :width="column.width"
                :active-icon-class="column.activeIconClass"
                :inactive-icon-class="column.inactiveIconClass"
                :active-text="getInternationalValue(column.activeText)"
                :active-value="column.activeValue"
                :inactive-value="column.inactiveValue"
                :active-color="column.activeColor"
                :inactive-color="column.inactiveColor"
                @change="column.change?column.change($event):''"
                :inactive-text="getInternationalValue(column.inactiveText)"
              />
              <ns-info-editor
                v-else-if="column.type==='infoTextarea'"
                ref="infoTextarea"
                :label-list="column.labelList"
                :label-base-url="column.labelBaseUrl"
                :init="column.init"
                :disabled="column.disabled"
                v-model="formModel[column.prop]"
              />
              <span v-else-if="column.type==='slot'">
                <slot :name="column.slotName" />
              </span>
              <ns-editor
                v-else-if="column.type==='editor'"
                ref="nsEditor"
                :disabled="column.disabled"
                v-model="formModel[column.prop]"
              ></ns-editor>
            </el-form-item>

            <template v-else-if="column.type==='outItemSlot'">
              <slot :name="column.slotName" />
            </template>
          </el-col>
        </template>

        <el-col :span="24" class="search-btn-container">
          <template v-if="type==='searchForm'">
            <el-button
              type="primary"
              @click="handlerSearch"
              icon="el-icon-search"
              :size="searchBtn&&searchBtn.size"
            >{{searchBtn&&searchBtn.text?getInternationalValue(searchBtn.text):'查询'}}</el-button>
            <el-button
              @click="handlerReset"
              icon="el-icon-delete"
              :size="resetBtn&&resetBtn.size"
            >{{resetBtn&&resetBtn.text?getInternationalValue(resetBtn.text):'重置'}}</el-button>
          </template>
          <div
            class="form-btn-container"
            v-else-if="type!=='searchForm'&& submitBtn&&submitBtn.show"
            :class="getBtnPostion"
          >
            <el-button
              type="primary"
              @click="handlerSearch"
            >{{submitBtn&&submitBtn.text?getInternationalValue(submitBtn.text):'提交'}}</el-button>
            <slot name="menuForm" />
          </div>
          <slot name="extraBtn" />
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import * as utils from './utils.js'
import { getDefaultVal } from '../../utils/index.js'
import formMixins from './mixins.js'
import props from './props.js'
import NsInfoEditor from '../../ns-info-editor'
import NsEditor from './../../ns-tinymce'
export default {
  name: 'NsForm',
  mixins: [formMixins],
  components: {
    NsInfoEditor, NsEditor
  },
  props,
  data() {
    return {
      formModel: {},
      formRules: {},
      dicList: {},
      defaultFormModel: {},
      dickeyList: [],
      dicUrlList: []
    }
  },
  created() {
    this.init()
  },
  mounted() { },
  update() { },
  methods: {
    getDefaultVal,
    init() {
      // 初始化工具方法
      this.initUtils()
      // 初始化数据字典
      this.initDic()
      this.initFormModel()
    },
    // 初始化工具方法
    initUtils() {
      Object.keys(utils).forEach(key => {
        this[key] = utils[key]
      })
    },
    // 初始化表单model 从column中遍历
    initFormModel() {
      const column = this.actualFormList
      this.setDefaultFormModel(column)
      this.formModel = JSON.parse(JSON.stringify(this.defaultFormModel))
      this.setFormVal()
    },
    // 初始化字典数据
    initDic() {
      // dicKey代表前端存的数据字典 key值 dicUr为请求后端的接口
      this.actualFormList.forEach(ele => {
        if (!ele.dicUrl && ele.dicData && typeof ele.dicData === 'string') {
          this.dickeyList.push(ele.dicData)
        } else if (ele.dicUrl) {
          this.dicUrlList.push({
            url: ele.dicUrl,
            method: ele.method,
            ajaxData: ele.ajaxData,
            listKey: ele.listKey,
            dicKey: ele.dicData || ele.prop
          })
        }
      })
      this.getAllDic().then(data => {
        this.dicList = data
      })
    },
    handlerSearch() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let params = this.formFormat ? this.formFormat(this.fromModel) : this.fromModel
          this.handlerSubmit(params)
        }
      })
    },
    validate(callback) {
      return this.$refs.form.validate(callback)
    },
    clearValidate(props) {
      this.$refs.form.clearValidate(props)
    },
    handlerReset() {
      this.$refs.form && this.$refs.form.resetFields()
    },
    emitEventHandler(event) {
      this.$emit(event, ...Array.from(arguments).splice(1))
    },
    // 处理select选择器  option禁用情况
    handleDisabled(item, column) {
      if (typeof item.disabled === 'boolean') {
        return item.disabled
      } else if (item.disabled === undefined && column.optionDisabledKey && typeof item[column.optionDisabledKey] === 'boolean') {
        return item[column.optionDisabledKey]
      } else if (column.optionDisabledFormatter && Object.prototype.toString.apply(column.optionDisabledFormatter) === '[object Function]') {
        return column.optionDisabledFormatter(item)
      } else {
        return false
      }
    }
  },
  computed: {
    // 经过过滤的formlist
    actualFormList() {
      return this.filterFormList(this.formList)
    },

    getBtnPostion: function () {
      if (this.btnPostion) {
        return 'is-' + this.btnPostion
      } else {
        return 'is-center'
      }
    },

    // 是否国际化
    isFormInternational() {
      return this.isExist(this.isInternational) ? this.isInternational : this.$NS.isInternational
    }
  },
  watch: {
    value: {
      handler(n, o) {
        this.setFormVal()
      },
      deep: true
    },
    formModel: {
      handler(n, o) {
        this.$emit('input', n)
      },
      deep: true
    }

  }
}
</script>

<style lang='scss' >
.ns-base-form {
  .el-select,
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner,
  .el-cascader,
  .el-input-number {
    width: 100%;
  }
}
.form-btn-container {
  width: 100%;
  &.is-center {
    text-align: center;
  }
  &.is-left {
    text-align: left;
  }
  &.is-right {
    text-align: right;
  }
}
</style>
