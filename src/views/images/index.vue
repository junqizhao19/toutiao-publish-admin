<template>
  <div class="image-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <div class="action-head">
        <el-radio-group v-model="collect" size="mini" @change="loadImages(1)">
          <el-radio-button :label="false" @click.native="loadImages(false)">全部</el-radio-button>
          <el-radio-button :label="true" @click.native="loadImages(true)">收藏</el-radio-button>
        </el-radio-group>
        <el-button size="mini" type="success" @click="dialogUploadVisible= true">上传素材</el-button>
      </div>
      <!-- 素材列表 -->
      <el-row :gutter="10">
        <el-col :md="6" :lg="4" :xs="12" :sm="6" class="image-item">
          <el-image
            style="height: 100px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            fit="cover">
          </el-image>
          <!--
            'el-icon-star-on': img.is_collected,
            'el-icon-star-off': !img.is_collected
             v-loading = "true"
             :icon="img.is_collected ? 'el-icon-star-on': 'el-icon-star-off'"
           -->
          <div class="image-action">
           <el-button
           type="warning"
           icon="el-icon-star-on"
           circle
           size="mini"
           @click="onCollect(img)"
           :loading="collectLoading"
           >
           </el-button>
            <!-- <i
              :class="{
                'el-icon-star-on': true,
                'el-icon-star-off': false
              }"
              @click="onCollect(img)"
            ></i> -->
            <el-button
            type="danger"
            icon="el-icon-delete-solid"
            circle
            size="mini"
            @click="onCollect(img)"
            >
            </el-button>
          </div>
        </el-col>
        <el-col :md="6" :lg="4" :xs="12" :sm="6" class="image-item">
          <el-image
            style="height: 100px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            fit="cover">
          </el-image>
          <div class="image-action">
            <i class="el-icon-star-on"></i>
            <i class="el-icon-delete-solid"></i>
          </div>
        </el-col>
        <el-col :md="6" :lg="4" :xs="12" :sm="6" class="image-item">
          <el-image
            style="height: 100px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            fit="cover">
          </el-image>
          <div class="image-action">
            <i class="el-icon-star-on"></i>
            <i class="el-icon-delete-solid"></i>
          </div>
        </el-col>
        <el-col :md="6" :lg="4" :xs="12" :sm="6" class="image-item">
          <el-image
            style="height: 100px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            fit="cover">
          </el-image>
          <div class="image-action">
            <i class="el-icon-star-on"></i>
            <i class="el-icon-delete-solid"></i>
          </div>
        </el-col>
        <el-col :md="6" :lg="4" :xs="12" :sm="6" class="image-item">
          <el-image
            style="height: 100px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            fit="cover">
          </el-image>
          <div class="image-action">
            <i class="el-icon-star-on"></i>
            <i class="el-icon-delete-solid"></i>
          </div>
        </el-col>
        <el-col :md="6" :lg="4" :xs="12" :sm="6" class="image-item">
          <el-image
            style="height: 100px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            fit="cover">
          </el-image>
          <div class="image-action">
            <i class="el-icon-star-on"></i>
            <i class="el-icon-delete-solid"></i>
          </div>
        </el-col>
        <el-col :md="6" :lg="4" :xs="12" :sm="6" class="image-item">
          <el-image
            style="height: 100px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            fit="cover">
          </el-image>
          <div class="image-action">
            <i class="el-icon-star-on"></i>
            <i class="el-icon-delete-solid"></i>
          </div>
        </el-col>
        <el-col :md="6" :lg="4" :xs="12" :sm="6" class="image-item">
          <el-image
            style="height: 100px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            fit="cover">
          </el-image>
          <div class="image-action">
            <i class="el-icon-star-on"></i>
            <i class="el-icon-delete-solid"></i>
          </div>
        </el-col>
      </el-row>
      <!-- 素材列表 -->
      <!-- 数据分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalCount"
        :page-size="pageSize"
        @current-change="onPageChange"
        :current-page.sync="page"
      >
      </el-pagination>
      <!-- 数据分页 -->
    </el-card>
    <!--
      upload组件本身就支持请求提交上传操作，说白了使用它不需要自己去发请求，他会自己发。
      请求方法： 默认就是POST。
      请求路径： action,必须写完整路径
      请求头： headers
     -->
    <el-dialog
      title="上传素材"
      :visible.sync="dialogUploadVisible"
      :append-to-body="true"
    >
    <!-- v-if="dialogUploadVisible" -->
      <el-upload
        :show-file-list="false"
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        :headers="uploadHeaders"
        name="image"
        :on-success="onUploadSuccess"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { getImages, collectImage } from '@/api/image'

export default {
  name: 'ImageIndex',
  component: '',
  props: {},
  data () {
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      collect: 'false', // 默认查询全部素材列表
      images: [], // 图片素材列表
      dialogUploadVisible: false,
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`
      },
      totalCount: 0,
      pageSize: 20,
      page: 1
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadImages(1)
  },
  mounted: {},
  methods: {
    loadImages (page = 1) {
      // 重置高亮页码，防止数据与页码不对应
      this.page = page
      getImages({
        collect: this.collect,
        page,
        per_page: this.pageSize
      }).then(res => {
        this.images = res.data.data.results
        this.images = res.data.data.total_Count
      })
    },
    onUploadSuccess () {
      // 关闭对话框
      this.dialogUploadVisible = false
      // 更新素材列表
      this.loadImages(this.page)
      this.$message({
        type: 'success',
        message: '上传成功'
      })
    },
    onPageChange (page) {
      this.loadImages(page)
    },
    onCollect (img) {
      collectImage(img.id, !img.is_collected).then(res => {
        img.is_collected = !img.is_collected
      })
    }
  }
}
</script>

<style scoped lang="less">
.action-head {
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
.image-action {
  font-size: 25px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: #fff;
  height: 40px;
  background-color: rgba(204, 204, 204, .5);
  position: absolute;
  bottom: 4px;
  left: 5px;
  right: 5px;
}
.image-item {
  position: relative;
}
</style>
