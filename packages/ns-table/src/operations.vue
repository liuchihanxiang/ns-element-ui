<template>
  <div>
    <!-- 操作列个数小于等于最大个数时 全部显示 -->
    <template v-if="!realOperationsConfig.autoDropdown||rowOperation.length<realOperationsConfig.dropdownMaxNum">
      <template v-for="(operationItem,operationIndex) in  rowOperation">
        <!-- 操作按钮只显示文字 -->
        <el-button v-if="!realOperationsConfig.onlyShowIcon"
                   @click="operationItem.click(row,$event,operationItem.type)"
                   :class="operationItem.class||''"
                   :key="operationIndex"
                   class="operation-text no-choose-row"
                   :type="operationItem.btnType?operationItem.btnType:'primary'"
                   size="mini">
          {{getInternationalValue(operationItem.text)}}
        </el-button>
        <!-- 操作按钮只显示图标 -->
        <el-tooltip v-else-if="realOperationsConfig.onlyShowIcon && operationItem.icon"
                    class="item"
                    :key="operationIndex"
                    effect="dark"
                    :content="getInternationalValue(operationItem.text)"
                    placement="top-start">
          <a class="operation-icon no-choose-row"
             @click="operationItem.click(row,$event,operationItem.type)">
            <i v-if="operationItem.icon"
               :class="operationItem.icon+' '+(operationItem.class||'')" />
          </a>
        </el-tooltip>
      </template>
    </template>
    <!-- 操作列个数大于最大个数时 会显示前两个按钮 其他为下拉显示 -->
    <template v-else>
      <!-- 前两个按钮 -->
      <template v-for="(n,numIndex) in 2">
        <!-- 操作按钮只显示文字 -->
        <template v-if="!realOperationsConfig.onlyShowIcon">
          <el-button class="operation-text"
                     :class="rowOperation[n-1].class"
                     @click="rowOperation[n-1].click(row,$event,rowOperation[n-1].type)"
                     :key="numIndex"
                     :type="rowOperation.btnType?rowOperation.btnType:'primary'"
                     size="mini">
            {{getInternationalValue( rowOperation[n-1].text)}}
          </el-button>
        </template>
        <!-- 操作按钮只显示图标 -->
        <template v-if="realOperationsConfig.onlyShowIcon &&  rowOperation[n-1].icon">
          <el-tooltip class="item"
                      effect="dark"
                      :key="numIndex"
                      :content="getInternationalValue( rowOperation[n-1].text)"
                      placement="top-start">
            <a class="operation-icon"
               @click=" rowOperation[n-1].click(row,$event, rowOperation[n-1].type)">
              <i v-if=" rowOperation[n-1].icon"
                 :class=" rowOperation[n-1].icon+' '+ rowOperation[n-1].class" />
            </a>
          </el-tooltip>
        </template>

      </template>
      <!-- 超出最大按钮个数 下拉部分 显示 图标+按钮 -->
      <el-dropdown class="operation-dropdown"
                   :show-timeout='80'
                   :hide-on-click="false">
        <span class="el-dropdown-link">
          {{getInternationalValue(realOperationsConfig.operationMore)}}
          <i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <template v-for="(operationItem,operationIndex) in  rowOperation">
            <el-dropdown-item class="no-choose-row"
                              :class="operationItem.class||''"
                              @click.native="operationItem.click(row,$event,operationItem.type)"
                              :key="operationIndex"
                              v-if="operationIndex>=2">
              <i v-if="operationItem.icon"
                 :class="operationItem.icon" /> {{getInternationalValue(operationItem.text)}}
            </el-dropdown-item>
          </template>
        </el-dropdown-menu>
      </el-dropdown>
    </template>
  </div>
</template>

<script>
import { getInternationalValue } from './../../utils'
export default {
  name: 'TableOperations',
  inject: ['table'],
  props: {
    row: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  methods: {
    getInternationalValue
  },
  computed: {
    rowOperation () {
      const row = this.row /*eslint-disable-line*/
      return this.table.operations.filter(item => {
        let isRight = true
        let judgesObj = item.judges
        if (judgesObj) {
          return eval(judgesObj) /*eslint-disable-line*/
        }
        return isRight
      })
    },
    realOperationsConfig () {
      return this.table.realOperationsConfig
    }
  }
}
</script>
