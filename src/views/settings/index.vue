<template>
  <div class="settings-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
         <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row>
        <el-col :span="15">
          <el-form ref="form" :model="form" label-width="70px">
            <el-form-item label="编号">
              123
            </el-form-item>
            <el-form-item label="手机">
              456
            </el-form-item>
            <el-form-item label="媒体名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">保存</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="4" :offset="2">
          <!-- <p @click="$refs.file.click()">点击修改头像</p> -->
          <label for="file">
            <el-avatar
            shape="square"
            :size="150"
            fit="fit"
            src="http://localhost:8080/img/aaa.b903dcb6.jpg"
            ></el-avatar>
            <p>点击修改图像</p>
            </label>
          <input
            type="file"
            hidden
            ref="file"
            id="file"
            @change="onFileChange"
          >
        </el-col>
      </el-row>
    </el-card>
    <el-dialog
      title="修改头像"
      :visible.sync="dialogVisible"
      append-to-body
      @opened="onDialogOpened"
      @closed="onDialogClosed"
    >
      <div class="preview-image-wrap">
        <img
          :src="previewImage"
          ref="preview-image"
          class="preview-image"
        >
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onUpdatePhoto">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

// const image = document.getElementById('image');
// 获取图片dom节点
// const image = this.$refs['preview-image'];
// 初始化裁切器
// const cropper = new Cropper(image, {
//   aspectRatio: 16 / 9,
//   crop(event) {
//     console.log(event.detail.x);
//     console.log(event.detail.y);
//     console.log(event.detail.width);
//     console.log(event.detail.height);
//     console.log(event.detail.rotate);
//     console.log(event.detail.scaleX);
//     console.log(event.detail.scaleY);
//   },
// });

export default {
  name: 'SettingsIndex',
  component: '',
  props: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      dialogVisible: false, // 控制上传图片裁切预览的显示状态
      previewImage: '', // 预览图片
      cropper: null // 裁切器示例

    }
  },
  computed: {},
  watch: {},
  created: {},
  mounted: {},
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    onFileChange () {
      // 处理预览图片
      const file = this.$refs.file
      const blobData = window.URL.createObjectURL(file.files[0])
      // console.log(blobData)
      this.previewImage = blobData
      // 展示弹出层，预览用户选择的图片
      this.dialogVisible = true
      // 解决选择相同文件不触发 change事件问题
      this.$refs.file.value = ''
    },
    onDialogOpened () {
      // const image = document.getElementById('image');
      // 获取图片dom节点
      const image = this.$refs['preview-image']
      // 初始化裁切器
      // 如果需要预览图片发生变化更新裁切器
      // 方式一： 裁切器.replace方法
      // 方式二： 销毁裁切器，重新初始化
      if (this.cropper) {
        this.cropper.replace(this.previewImage)
        return
      }
      this.cropper = new Cropper(image, {
        aspectRatio: 16 / 9,
        viewMode: 1
        // 当你移动裁切器时会触发调用crop方法
        // crop (event) {
        //   console.log(event.detail.x)
        //   console.log(event.detail.y)
        //   console.log(event.detail.width)
        //   console.log(event.detail.height)
        //   console.log(event.detail.rotate)
        //   console.log(event.detail.scaleX)
        //   console.log(event.detail.scaleY)
        // }
      })
    },
    onDialogClosed () {
      // this.cropper.destroy()
    },
    onUpdatePhoto () {
      // 获取裁切的图片对象
      this.cropper.getCroppedCanvas().toBlob(file => {
        // console.log(blob)
        const fd = new FormData()
        fd.append('字段名称', file)
      })
      // 请求更新用户头像

      // 关闭对话框
      // 更新视图展示
    }

  }
}
</script>

<style scoped lang="less">
.preview-image-wrap {
  /* Ensure the size of the image fit the container perfectly */
  .preview-image {
    display: block;

    /* This rule is very important, please don't ignore this */
    max-width: 100%;
    height: 200px;
  }
}

</style>
