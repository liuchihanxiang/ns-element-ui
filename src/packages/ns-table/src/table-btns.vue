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
    </div>
  </div>
</template>

<script>
import { getInternationalValue } from './../../../utils'
export default {
  props: {
    btnList: {
      type: Array,
      default: () => []
    },
    // eslint-disable-next-line vue/require-default-prop
    permit: Function
  },
  methods: {
    // 处理国际化
    getInternationalValue,
    isShowBtn({ code, text, type, show }) {
      let isShow = show === undefined || show
      if (this.permit && Object.prototype.toString.call(this.permit) === '[object Function]') {
        return isShow && this.permit(code)
      } else {
        return isShow && text
      }
    },
    getBtnText({ code, text, type, show }) {
      let btnText = text
      if (this.permit && Object.prototype.toString.call(this.permit) === '[object Function]') {
        btnText = this.permit(code)
      }
      return this.getInternationalValue(btnText)
    }
  }
}
</script>

<style>
</style>
