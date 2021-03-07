<!--  -->
<template>
  <ns-dialog ref="ns-dialog"
    :visible.sync="show"
    :title="title"
    @close="$emit('close')"
    @closed="closed"
    :area="area"
    :show-close="showClose"
    :custom-class="customClass"
    :destroy-on-close="destroyOnClose"
    :append-to-body="appendToBody"
    :close-on-press-escape="closeOnPressEscape"
    :close-on-click-modal="closeOnClickModal"
    :before-close="beforeClose"
    :width="area instanceof Array ? area[0] : area">
    <div v-if="isDestroy"
      class="ns-upload">
      <div class="ns-upload-left">
        <div v-for="(item,index) in uploadParamsList"
          :key="index">
          <template v-if="index===activeTpl">
            <div class="ns-upload-tips"
              v-if="item.tips">
              <el-alert :type="item.tipsType"
                :closable="false">
                <i class="el-icon-info" />提示：
                <div v-html="item.tips"></div>
              </el-alert>
            </div>
            <div class="ns-upload-main">
              <!-- 展示导入提示语 -->
              <p v-if="tplSwitchList.length>1"
                class="ns-upload-label">
                请添加需要导入的
                <span class="ns-tpl-name">{{tplSwitchList[activeTpl].label}}</span>文件
              </p>

              <el-upload class="upload"
                ref="upload"
                :name="item.name"
                :disabled="uploadSurplusNum === 0"
                :multiple="item.multiple||true"
                :action="item.uploadUrl"
                :accept="item.accept"
                :drag="true"
                :list-type="item.listType"
                :limit="item.limit"
                :before-upload="beforeAvatarUpload"
                :before-remove="item.beforeRemove"
                :on-change="onChange"
                :on-success="onSuccess"
                :on-exceed="onExceed"
                :on-error="onError"
                :http-request="myUpload"
                :auto-upload="item.autoUpload">
                <i class="el-icon-upload" />
                <div class="el-upload__text">
                  将文件拖到此处，或
                  <em>点击上传</em>
                </div>
                <ul slot="tip"
                  class="el-upload-error-list">
                  <li v-for="(file,index) in errorFilesList"
                    :key="index"
                    class="el-upload-error-list__item">
                    <a class="el-upload-error-list__item-name">
                      <i class="el-icon-document" />
                      {{file.name}}
                      <i class="el-icon-error" />
                      <i @click="removeErrorFile(index)"
                        class="el-icon-close" />
                    </a>
                    <a class="el-upload-error-list__item-btn"
                      @click="showErrorMsg(file)">查看错误信息</a>
                  </li>
                </ul>
              </el-upload>
            </div>
          </template>
        </div>
      </div>
      <div v-if="!(tplSwitchList.length===1 && !downloadUrlList[activeTpl].url)"
        class="ns-upload-right">

        <div class="ns-upload-switch"
          v-show="tplSwitchList.length > 1">
          <div class="ns-upload-title">导入选择</div>

          <!-- 大于 tplSwitchMax的值时使用下拉框展示 -->
          <el-radio-group v-if="tplSwitchList.length <= tplSwitchMax"
            v-model="activeTpl"
            @change="switchTpl"
            class="radio-group--vertical">
            <el-radio v-for="(item,index) in tplSwitchList"
              :key="index"
              :label="item.value">{{item.label}}</el-radio>
          </el-radio-group>

          <el-select v-else
            v-model="activeTpl"
            @change="switchTpl"
            placeholder="请选择">
            <el-option v-for="item in tplSwitchList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>

        <div class="ns-upload-download"
          v-show="downloadUrlList[activeTpl].url">
          <div class="ns-upload-title">模板下载区</div>
          <div>
            <el-button class="ns-upload-tpl-btn"
              @click="downloadFile({
                url:downloadUrlList[activeTpl].url,
              name:downloadUrlList[activeTpl].name,
              original:downloadUrlList[activeTpl].original||true
              })"
              type="text">{{downloadUrlList[activeTpl].name}}</el-button>
          </div>
        </div>
      </div>
    </div>
    <slot name="footer">
      <span slot="footer"
        class="dialog-footer">
        <el-button v-if="yesBtn"
          :type="isUpload?'primary':'info'"
          @click="submitUpload">{{confirmText}}</el-button>
        <el-button v-if="cancelBtn"
          @click="$emit('update:visible', false)">{{cancelText}}</el-button>
      </span>
    </slot>
  </ns-dialog>
</template>

<script>
import downloadFile from './download'
import throttle from 'lodash/throttle'
import dialogMixins from '../../core/dialog'

export default {
  name: 'NsImport',
  mixins: [dialogMixins],
  props: {
    destroyOnClose: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '上传'
    },

    uploadList: {
      required: true,
      type: Array
    },
    confirmText: {
      type: String,
      default: '上传'
    },
    yesBtn: {
      type: Boolean,
      default: true
    },
    tplSwitchMax: {
      type: Number,
      default: 3
    },

    uploadSurplusNum: {
      type: Number,
      default: 10 // 剩余的上传文件数量
    },
    uploadMaxErrorMsg: {
      type: String,
      default: '附件数量已达最大值！' // 上传数量超出时的提示文案
    },

    beforeUpload: {
      type: Function,
      default: () => {}
    },

    afterSuccess: {
      type: Function,
      default: () => {}
    },
    closeOnClickModal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isUpload: false,
      ischange: true,
      filesList: [],
      activeTpl: 0,
      show: false,
      isDestroy: true,
      errorFilesList: [],
      defaultParams: {
        name: 'file',
        accept: '.xls,.xlsx',
        uploadUrl: '',
        downLoadUrl: '',
        multiple: true,
        tips: '',
        tipsType: 'success',
        limit: 10, // 最大允许上传个数
        size: 500, // 文件大小，默认单位k
        autoUpload: false,
        uploadExtraData: {}
      },
      downloadUrlList: [],
      tplSwitchList: [],
      uploadParamsList: [],
      successList: []
    }
  },
  methods: {
    downloadFile,
    // 初始化数据
    initUploadData() {
      this.$refs.upload[0].clearFiles()
      this.$refs.upload[0].uploadFiles = []
      this.errorFilesList = []
    },
    // 关闭弹窗
    closed() {
      this.initUploadData()
      this.$emit('update:visible', false)
      this.$emit('closed')
    },
    switchTpl(index) {
      this.initUploadData()
      this.$set(this, 'activeTpl', index)
    },
    // 点击上传
    submitUpload: throttle(function () {
      if (this.isUpload) {
        this.$refs.upload[0].submit()
      }
    }, 1000),
    // 初始化数据
    formatterData() {
      this.successList = []
      this.downloadUrlList = []
      this.tplSwitchList = []
      this.uploadParamsList = []

      this.uploadList.forEach(({ name, uploadUrl, downLoadUrl, multiple, tplName, downloadTitle, accept, tips, limit, uploadExtraData, success, tipsType, size, autoUpload }, index) => {
        let itemParams = {
          name,
          accept,
          multiple,
          uploadUrl,
          downLoadUrl,
          tips,
          tplName,
          tipsType,
          size,
          limit,
          uploadExtraData,
          autoUpload,
          success
        }
        this.successList.push({ success: success })

        // 删除多余空字段，防止替换默认值
        Object.keys(itemParams).forEach((key) => {
          let value = itemParams[key]
          if (value === null || value === undefined || value === '') {
            delete itemParams[key]
          }
        })

        // 深拷贝一下默认值，防止下面Object.assign替换默认值
        let defaultParams = JSON.parse(JSON.stringify(this.defaultParams))

        let params = Object.assign(defaultParams, itemParams) // 添加默认参数

        // 判断提示语tips是否存在，不存在的情况下，根据条件（文件类型、大小，是否多文件）增加制定tips提示语
        if (!params.tips.length) {
          let { size, accept, multiple } = params
          let fileSize = size >= 1024 ? `${size / 1024}M` : `${size}K`
          let msg = {
            true: `每个文件大小不超过${fileSize},每次上传10文件以内`,
            false: `文件大小不超过${fileSize}`
          }
          params.tips = `只能上传 ${accept} 格式文件,${msg[multiple]}`
        }

        this.downloadUrlList.push({ url: downLoadUrl, name: downloadTitle }) // 收集下载模板地址 名称
        this.tplSwitchList.push({ value: index, label: tplName }) // 收集切换名称
        this.uploadParamsList.push(JSON.parse(JSON.stringify(params))) // 收集上传参数
      })
    },

    // 自定义上传
    myUpload(content) {
      var form = new FormData()
      let uploadExtraData
      if (Object.prototype.toString.apply(this.uploadExtraData) === '[object Object]') {
        uploadExtraData = this.uploadExtraData
      } else if (Object.prototype.toString.apply(this.uploadExtraData) === '[object Function]') {
        uploadExtraData = this.uploadExtraData() || {}
      } else {
        uploadExtraData = {}
      }
      form.append(this.fileName, content.file)
      Object.keys(uploadExtraData).forEach((key) => {
        form.append(key, uploadExtraData[key])
      })
      this.$http({
        url: content.action,
        method: 'post',
        headers: {
          formatterData: false
        },
        data: form
      })
        .then((res) => {
          content.onSuccess(res)
        })
        .catch((error) => {
          content.onError(error.code, content.file)
        })
    },

    // 监控文件变化
    onChange(file, fileList) {
      let { multiple } = this.uploadParamsActive
      if (multiple === false && fileList.length > 1) {
        fileList = fileList.splice(0, 1)
      }

      if (file.status === 'ready' && this.errorFilesList.length) {
        this.errorFilesList = []
      }
      this.isUpload = !!fileList.length
    },

    beforeAvatarUpload(file) {
      let { size, accept } = this.uploadParamsActive
      let state = true
      // 文件名根据.截取，取最后一位内容【文件名称】，转小写对比
      let fileType = file.name.split('.').pop().toLocaleLowerCase()
      if (accept.indexOf(fileType) === -1) {
        state = false
        this.$message.error(`该文件格式不支持，现只支持 ${accept}等格式!`)
        console.log(1)
        return false
      }

      if (file.size / 1024 > size) {
        state = false
        this.$message.error(`文件大小不能超过${size >= 1024 ? `${size / 1024}M` : `${size}K`}`)
        console.log(2)
        return false
      }

      this.beforeUpload(file)
      return state
    },

    // 上传成功回调
    onSuccess(data, file, fileList) {
      if (this.successList[this.activeTpl].success) {
        this.successList[this.activeTpl].success(data)
      }

      if (this.afterSuccess) {
        this.afterSuccess(data, fileList)
      }
    },
    // 上传错误回调
    onError(msg, file) {
      // 单文件上传直接提示 上传失败原因
      if (this.uploadParamsActive.multiple === false) {
        this.showErrorMsg(file.errorMsg)
      }

      let errorMsg = ''
      if (msg && Array.isArray(msg)) {
        errorMsg = '<ul>'
        msg.forEach((item) => {
          errorMsg += `<li>${item}</li>`
        })
        errorMsg += '</ul>'
      } else {
        errorMsg = msg
      }
      this.errorFilesList.push({
        name: file.name,
        errorMsg
      })
    },
    // 展示错误信息
    showErrorMsg(file) {
      this.$alert(file.errorMsg, '失败信息', {
        customClass: 'message-box-content-scroll',
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定'
      })
    },
    // 移除文件
    removeErrorFile(index) {
      this.errorFilesList.splice(index, 1)
    },
    // 上传文件超出
    onExceed(files, fileList) {
      let message = `上传文件超出最大数量${this.uploadParamsActive.limit}个`
      this.$message({
        message: message,
        type: 'warning'
      })
    }
  },
  watch: {
    uploadList: {
      handler: function (val) {
        if (val && val.length) {
          this.formatterData(val)
        }
      },
      immediate: true,
      deep: true
    },
    visible: {
      immediate: true,
      handler: function (val) {
        this.show = val
        if (this.destroyOnClose) {
          setTimeout(function () {
            this.isDestroy = val
          }, 100)
        }
      }
    },

    // 剩余的上传文件数量
    uploadSurplusNum: {
      immediate: true,
      handler: function (val) {},
      deep: true
    }
  },
  mounted() {},
  created: function () {},
  computed: {
    uploadParamsActive() {
      return this.uploadParamsList[this.activeTpl]
    },
    uploadExtraData() {
      return this.uploadList[this.activeTpl].uploadExtraData
    },
    fileName() {
      return this.uploadList[this.activeTpl].name || 'file'
    }
  }
}
</script>
