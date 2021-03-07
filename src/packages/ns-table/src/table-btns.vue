<template>
  <div v-if="btnList.length"
    class="btn_wraps clearfix">
    <div class="pull-left">
      <template v-for="(btnItem,btnIndex) in btnList">
        <template v-if="isShowBtn(btnItem)&&(!btnItem.position||btnItem.position==='left')">
          <el-dropdown v-if="btnItem.group&&btnItem.children&&btnItem.children.length"
            class="table-btn_item"
            :key="btnIndex"
            @command="btnItem.click"
            @click="btnItem.click?btnItem.click(btnItem.code):''"
            split-button
            :type="btnItem.type||'primary'">
            {{getBtnText(btnItem)}}
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in btnItem.children"
                :key="item.code"
                :command="item.code">{{getBtnText(item)}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button v-else
            :key="btnIndex"
            :disabled="btnItem.disabled"
            :plain="getDefaultVal(btnItem.plain, false)"
            :class="`table-btn_item ${btnItem.class||''}`"
            @click="btnItem.click?btnItem.click(btnItem.code):''"
            :type="btnItem.type?btnItem.type:'primary'">{{getBtnText(btnItem)}}
          </el-button>
        </template>
      </template>
    </div>
    <div class="pull-right">
      <template v-for="(btnItem,btnIndex) in btnList">
        <template v-if="btnItem.position==='right'&&isShowBtn(btnItem)">
          <el-dropdown v-if="btnItem.group&&btnItem.children&&btnItem.children.length"
            class="table-btn_item"
            :key="btnIndex"
            @command="btnItem.click"
            @click="btnItem.click?btnItem.click(btnItem.code):''"
            split-button
            :type="btnItem.type||'primary'">
            {{getBtnText(btnItem)}}
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in btnItem.children"
                :key="item.code"
                :command="item.code">{{getBtnText(item)}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button v-else
            :key="btnIndex"
            :disabled="btnItem.disabled"
            :class="`table-btn_item ${btnItem.class||''}`"
            @click="btnItem.click?btnItem.click(btnItem.code):''"
            :type="btnItem.type?btnItem.type:'primary'">{{getBtnText(btnItem)}}
          </el-button>

        </template>
      </template>
      <el-button v-if='toolbar.zoom'
        :icon="isFullScreen?'icon-exit-full-screen':'icon-full-screen'"
        @click="toggleFullScreen"
        class="tools-btn"></el-button>
      <el-dropdown v-if='toolbar.custom'
        :hide-on-click="false"
        class="cloumns-switch">
        <span class="el-dropdown-link">
          <el-button icon="icon-config"
            class="tools-btn"></el-button>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-checkbox-group v-model="showClomnuIndex">
            <el-dropdown-item v-for="(item,index) in showClomnuList"
              :key="index">
              <el-checkbox :label="item.index">{{item.label}}</el-checkbox>
            </el-dropdown-item>
          </el-checkbox-group>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- <i class="icon-exit-full-screen"></i> -->
    </div>
  </div>
</template>

<script>
import { getInternationalValue, getDefaultVal } from './../../../utils'

export default {
  props: {
    btnList: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    toolbar: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // eslint-disable-next-line vue/require-default-prop
    permit: Function
  },
  data() {
    return {
      showClomnuList: [],
      showClomnuIndex: [],
      isFullScreen: false
    }
  },
  methods: {
    // 处理国际化
    getInternationalValue,
    getDefaultVal,
    isShowBtn({ code, text, type, show }) {
      let isShow = show === undefined || show
      if (this.permit && Object.prototype.toString.call(this.permit) === '[object Function]') {
        return isShow && this.permit(code)
      } else {
        return isShow && text
      }
    },
    toggleFullScreen() {
      this.isFullScreen = !this.isFullScreen
      this.$emit('toggleFullScreen', this.isFullScreen)
    },
    getBtnText({ code, text, type, show }) {
      let btnText = text
      if (this.permit && Object.prototype.toString.call(this.permit) === '[object Function]') {
        btnText = this.permit(code)
      }
      return this.getInternationalValue(btnText)
    }
  },
  watch: {
    columns: {
      handler(val) {
        let showClomnuIndex = []
        let showClomnuList = []
        val.forEach((ele, index) => {
          if (ele.show || typeof ele.show === 'undefined') {
            if (typeof ele.hide === 'undefined' || ele.hide) {
              showClomnuIndex.push(index)
            }
            showClomnuList.push({
              label: ele.label,
              index: index
            })
          }
        })
        this.showClomnuIndex = showClomnuIndex
        this.showClomnuList = showClomnuList
      },
      deep: true,
      immediate: true
    },
    showClomnuIndex: {
      handler: function (val) {
        if (val) {
          this.$emit('changeClomnus', val)
        }
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style>
</style>
