<template>
  <div class="publish-container">
   <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{$route.query.id ? '修改文章' : '发布文章'}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form ref="publish-form" :model="article" label-width="60px" :rules="formRules">
        <el-form-item label="标题" prop="title">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <!-- <el-input type="textarea" v-model="article.content"></el-input> -->
          <el-tiptap v-model="content" :extensions="extensions" lang="zh"></el-tiptap>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <template v-if="article.cover.type >0 ">
            <upload-cover
              :key="cover"
              v-for="cover in article.cover.type"
            />
          </template>
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
          <el-select v-model="article.channel_id" placeholder="请选择频道">
            <el-option
            :label="channel.name"
            :value="channel.id"
            v-for="(channel,index) in channels"
            :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onPublish(false)">发表</el-button>
          <el-button @click="onPublish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import UploadCover from './components/upload-cover'
import { getArticlesChannels, addArticle, getArticle, updateArticle } from '@/api/article'
// import element-tiptap 样式
import 'element-tiptap/lib/index.css'
import {
  // 需要的 extensions
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList
} from 'element-tiptap'

export default {
  name: 'PublishIndex',
  component: {
    'el-tiptap': ElementTiptap,
    UploadCover
  },
  props: {},
  data () {
    return {
      channels: [], // 文章频道列表
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: { // 文章封面
          type: 0, // 封面类型，-1：自动，0-无图，1-1张，3-3张
          images: [] // 封面图片的地址
        }
      },
      channel_id: null,
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList()
      ],
      formRules: {
        title: [
          {
            required: true, message: '请输入文章标题', trigger: 'blur'
          },
          {
            min: 5, max: 30, message: '长度在5到30个字符', trigger: 'blur'
          }
        ],
        content: [
          // { required: true, message: '请输入文章内容', trigger: 'change' }
          {
            validator (rule, value, callback) {
              if (value === '<p></p>') {
                callback(new Error('请输入文章内容'))
              } else {
                // 验证通过
                callback()
              }
            }
          }
        ],
        channel_id: [
          {
            required: true, message: '请选择文章频道'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()

    if (this.$route.query.id) {
      this.loadArticle()
    }
  },
  mounted: {},
  methods: {
    loadChannels () {
      getArticlesChannels().then(res => {
        this.channels = res.data.data.channels
      })
    },
    onPublish (draft = false) {
      this.$refs['publish-form'].validator(valid => {
        if (!valid) {
          return
        }
        // 找到数据接口
        // 封装请求方法
        // 请求提交表单
        const articleId = this.$route.query.id
        if (this.$route.query.id) {
          // 执行修改操作
          updateArticle(articleId, this.article, draft).then(res => {
            console.log(res)
            this.$message({
              message: `${draft ? '存入草稿' : '发布'}成功`,
              type: 'success'
            })
          })
        } else {
          addArticle(this.article, draft).then(res => {
            console.log(res)
            this.$message({
              message: `${draft ? '存入草稿' : '发布'}成功`,
              type: 'success'
            })
            this.$router.push('/article')
          })
        }
      })
    },
    loadArticle () {
      console.log('loadArticle')
      getArticle(this.$route.query.id).then(res => {
        this.article = res.data.data
      })
    }
  }
}
</script>

<style scoped lang="less"></style>
