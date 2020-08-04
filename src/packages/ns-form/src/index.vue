<template>
  <div class="ns-form">
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
      @submit.native.prevent
    >
      <el-row :gutter="20" :span="24">
        <template v-for="(column,index) in actualFormList">
          <el-col
            :span="column.span||24"
            :key="index"
            :class="{'ns-item-container':true,'ns-search-item-container':type==='searchForm'}"
          >
            <el-form-item
              :label="type!=='searchForm'?getInternationalValue(column.label||column.placeholder):''"
              :prop="column.prop"
              :class="column.class"
              v-if="!outFormItemList.includes(column.type)&&column.show===undefined?true:column.show"
              :rules="type!=='searchForm'?(column.rules||[]):[]"
              :label-width="(column.labelWidth|| labelWidth)+'px'"
            >
              <template slot="label" v-if="column.labelSlot">
                <slot :name="column.prop+'Label'" :column="column"></slot>
              </template>
              <!-- input或password -->
              <el-input
                v-if="isElInput(column.type)"
                v-model.trim="formModel[column.prop]"
                :type="column.type"
                :size="column.size"
                :readonly="column.readonly"
                :disabled="column.disabled&&type!=='searchForm'"
                :clearable="getDefaultVal(column.clearable,true)"
                :autosize="column.autosize"
                :placeholder="getPlaceholder(type,column)"
                :prefix-icon="column.prefixIcon"
                :show-word-limit="type==='searchForm'?false:getDefaultVal(column.showWordLimit,true)"
                :maxlength="column.maxlength||30"
                :minlength="column.minlength"
                :suffix-icon="column.suffixIcon"
                :show-password="getDefaultVal(column.showPassword,false)"
                :rows="column.rows"
                @change="(value)=>{isFunction(column.change)&&column.change(value)}"
              />
              <!-- input或textarea -->
              <el-input
                v-else-if="column.type==='textarea'"
                v-model="formModel[column.prop]"
                :type="column.type"
                :size="column.size"
                :readonly="column.readonly"
                :disabled="column.disabled&&type!=='searchForm'"
                :clearable="getDefaultVal(column.clearable,true)"
                :autosize="column.autosize"
                :placeholder="getPlaceholder(type,column)"
                :show-word-limit="getDefaultVal(column.showWordLimit,true)"
                :maxlength="column.maxlength||500"
                :minlength="column.minlength"
                :rows="column.rows"
                @change="(value)=>{isFunction(column.change)&&column.change(value)}"
              />
              <!-- autocomplete -->
              <el-autocomplete
                v-else-if="column.type==='autocomplete'"
                v-model.trim="formModel[column.prop]"
                :size="column.size"
                :readonly="column.readonly"
                :disabled="column.disabled&&type!=='searchForm'"
                :clearable="getDefaultVal(column.clearable,true)"
                :placeholder="getPlaceholder(type,column)"
                :prefix-icon="column.prefixIcon"
                :suffix-icon="column.suffixIcon"
                :value-key="getDefaultVal(column.valueKey,'name')"
                :placement="column.placement"
                :select-when-unmatched="column.selectWhenUnmatched"
                :popper-class="getDefaultVal(column.popperClass,'')"
                :hide-loading="column.hideLoading"
                :popper-append-to-body="column.popperAppendToBody"
                :highlight-first-item="column.highlightFirstItem"
                :trigger-on-focus="getDefaultVal(column.triggerOnFocus,true)"
                :fetch-suggestions="(queryString,callback)=>{autocompleteFetchSuggestions(queryString,callback,column)}"
                @select="(value)=>{isFunction(column.select)&&column.select(value)}"
                @change="(value)=>{isFunction(column.change)&&column.change(value)}"
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
                :filterable="getDefaultVal(column.filterable,true)"
                :value-key="column.valueKey||'value'"
                :collapse-tags="column.collapseTags"
                :multiple-limit="column.multipleLimit"
                :remote="column.remote"
                :remote-method="column.remoteMethod"
                :no-data-text="column.noDataText"
                :no-match-text="column.noMatchText"
                :popper-append-to-body="column.popperAppendToBody"
                @remove-tag="(value)=>column.removeTag?column.removeTag(value,filterDic(column.dicData,dicList[column.dicData||column.prop])):''"
                @change="(value)=>column.change?column.change(value,filterDic(column.dicData,dicList[column.dicData||column.prop])):''"
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
                :clearable="column.clearable"
                :is-range="column.isRange"
                :format="column.format||dateValueFormat"
                :align="column.align"
                :default-value="column.defaultValue"
                :popper-class="column.popperClass"
                :range-separator="column.rangeSeparator||'-'"
                :picker-options="column.pickerOptions"
                :value-format="column.valueFormat || dateFormat"
                :prefix-icon="column.datePrefixIcon"
              />
              <!-- 计数器 -->
              <el-input-number
                v-else-if="column.type==='inputNumber'"
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
                :active-value="getDefaultVal(column.activeValue,1)"
                :inactive-value="getDefaultVal(column.inactiveValue,0)"
                :active-color="column.activeColor"
                :inactive-color="column.inactiveColor"
                @change="column.change?column.change($event):''"
                :inactive-text="getInternationalValue(column.inactiveText)"
              />
              <el-cascader
                v-else-if="column.type==='cascader'"
                :options="column.options"
                :size="column.size"
                :show-all-levels="getDefaultVal(column.showAllLevels,false)"
                :placeholder="getPlaceholder(type,column)"
                :disabled="column.disabled"
                :collapse-tags="getDefaultVal(column.collapseTags,true)"
                :clearable="getDefaultVal(column.clearable,true)"
                v-model="formModel[column.prop]"
                :props="getCascaderProps(column)"
              ></el-cascader>
              <ns-editor
                v-else-if="column.type==='editor'"
                ref="nsEditor"
                :init="column.init||{}"
                :disabled="column.disabled"
                v-model="formModel[column.prop]"
              ></ns-editor>
              <span v-else-if="column.type==='slot'">
                <slot :name="column.slotName" />
              </span>
            </el-form-item>
            <template v-else-if="column.type==='outItemSlot'">
              <slot :name="column.slotName" />
            </template>
            <el-divider
              v-else-if="column.type==='groupLine'"
              :content-position="column.position||'left'"
            >{{column.title}}</el-divider>
            <el-divider v-else-if="column.type==='groupLineSlot'" :content-position="column.position||'left'">
              <slot :name="column.slotName" />
            </el-divider>
          </el-col>
        </template>

        <el-col :span="24" class="search-btn-container">
          <template v-if="type==='searchForm'">
            <slot name="searchBtn">
              <el-button
                type="primary"
                @click="handlerSearch"
                :icon="getDefaultVal(searchBtn.icon,'el-icon-search')"
                class="btn-confirm"
                :size="searchBtn&&searchBtn.size"
              >{{searchBtn&&searchBtn.text?getInternationalValue(searchBtn.text):'查询'}}</el-button>
              <el-button
                @click="handlerReset"
                v-if="showResetBtn"
                class="btn-cancel"
                :icon="getDefaultVal(resetBtn.icon,'el-icon-delete')"
                :size="resetBtn&&resetBtn.size"
              >{{resetBtn&&resetBtn.text?getInternationalValue(resetBtn.text):'重置'}}</el-button>
            </slot>
          </template>
          <div
            class="form-btn-container"
            v-else-if="type!=='searchForm'&& submitBtn&&submitBtn.show"
            :class="getBtnPostion"
          >
            <el-button
              type="primary"
              @click="handlerSearch"
              :size="submitBtn&&submitBtn.size"
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
import * as utils from './../../../utils/index'
import formMixins from './mixins.js'
import props from './props.js'
import NsEditor from './../../ns-tinymce'
export default {
  name: 'NsForm',
  mixins: [formMixins],
  components: {
    NsEditor
  },
  props,
  data() {
    return {
      formModel: {},
      formRules: {},
      dicList: {},
      defaultFormModel: {},
      dickeyList: [],
      dicUrlList: [],
      outFormItemList: ['outItemSlot', 'groupLine', 'groupLineSlot'] // formitem外部选项类型集合
    }
  },
  created() {
    this.init()
  },
  mounted() {},
  update() {},
  methods: {
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
      return this.formList ? this.filterFormList(this.formList) : []
    },

    getBtnPostion: function() {
      if (this.btnPostion) {
        return 'is-' + this.btnPostion
      } else {
        return 'is-center'
      }
    },
    // 是否国际化
    international() {
      return this.isExist(this.isInternational) ? this.isInternational : this.$NS.isInternational
    },
    dateValueFormat() {
      return this.$NS.nsFormDefault.dateValueFormat
    },
    dateFormat() {
      return this.$NS.nsFormDefault.dateFormat
    },
    dicLabelKey() {
      return this.$NS.nsFormDefault.dicLabelKey
    },
    dicValueKey() {
      return this.$NS.nsFormDefault.dicValueKey
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
