<template>
  <div class="upload-cover" @click="showCoverSelect">
    <div class="color-wrap">
      <img src="" alt="" class="cover-image">
      <el-dialog
        title="选择封面"
        :visible.sync="dialogVisible"
        width="30%"
        append-to-body
      >
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
          <el-tab-pane label="配置管理" name="second">
            <input type="file" ref="file" @change="onFileChange">
            <img width="100" alt="" ref="preview-image">
          </el-tab-pane>
        </el-tabs>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="onCoverConfirm"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { uploadImage } from '@/api/image'

export default {
  name: 'UploadCover',
  component: '',
  props: {},
  data () {
    return {
      dialogVisible: false,
      activeName: 'second'
    }
  },
  computed: {},
  watch: {},
  created: {},
  mounted: {},
  methods: {
    showCoverSelect () {
      this.dialogVisible = true
    },
    onFileChange () {
      // 读取文件对象
      const file = this.$refs.file.files[0]
      const blob = window.URL.createObjectURL(file)
      this.$refs['preview-image'].src = blob

      this.$refs.file.value = ''
    },
    onCoverConfirm () {
      // 如果tab是上传图片，并且input-file有选择的文件，才执行上传图片的操作
      if (this.activeName === 'second') {
        const file = this.$refs.file.files[0]
        if (!file) {
          this.$message('请选择文件')
          // return
        }
        // 执行上传文件的操作
        const fd = new FormData()
        fd.append('image', file)
        uploadImage(fd).then(res => {
          console.log(res)
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.cover {
  width: 200px;
  height: 150px;
  border: 1px solid #000;
  .cover-image {
    height: 120px;
    min-width: 100%;
  }
}
</style>
