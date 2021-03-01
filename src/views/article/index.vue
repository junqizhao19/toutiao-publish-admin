<template>
  <div class="article-container">
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form ref="form" :model="form" label-width="40px" size="mini">
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channelId" placeholder="请选择频道">
            <el-option label="全部" :value="null"></el-option>
            <el-option :label="channel.name" :value="channel.id" v-for="(channel, index) in channels" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="rangeDate"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <!-- button 按钮的click事件有一个默认的参数，当你没有指定参数时，他会默认传递一个没用的数据 -->
          <el-button type="primary" :disabled="loading" @click="loadArticles(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        根据筛选条件共查询到 {{ totalCount }} 条结果：
      </div>
      <!-- v-loading="loading" -->
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        size="mini"
        class="list-table"
        >
        <el-table-column
          prop="date"
          label="封面">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.img"
              fit="cover">
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </el-image>

            <!-- <img :src="scope.row.img || 'no-cover.gif' " alt="" class="article-cover"> -->
             <!-- <img v-if="scope.row.img" :src="scope.row.img" alt="" class="article-cover">
             <img v-else src="./no-cover.gif" alt="" class="article-cover"> -->
          </template>
        </el-table-column>
        <el-table-column
         prop="id"
         label="编号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="标题">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <el-tag :type="articleStatus[scope.row.status].type">{{articleStatus[scope.row.status].text}}</el-tag>
            <!-- <el-tag v-if="scope.row.status === 0" type="warning">标签一</el-tag>
            <el-tag v-else-if="scope.row.status === 1" type="success">标签二</el-tag>
            <el-tag v-else-if="scope.row.status === 2" type="danger">标签三</el-tag>
            <el-tag v-else-if="scope.row.status === 3" type="info">标签四</el-tag> -->
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="发布时间">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              circle
              icon="el-icon-edit"
              @click="$router.push('/publish?id='+scope.row.id)"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              circle
              icon="el-icon-delete"
              @click="onDeleteArticle(scope.row.id.toString())"
              ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        layout="prev, pager, next"
        background
        :disabled="loading"
        :total="totalCount"
        @current-change="onCurrentChange"
        :page-size="pageSize"
        >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticles, getArticlesChannels, deleteArticle } from '@/api/article'
export default {
  name: 'ArticleIndex',
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
      tableData: [{
        id: 0,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        status: 0,
        img: 'http://n0.sinaimg.cn/photo/1_img/upload/c4b46437/100/w1500h1000/20190814/acb6-icapxpi5172195.jpg'
      }, {
        id: 1,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        status: 1,
        img: 'http://n1.sinaimg.cn/news/1_img/upload/c4b46437/100/w1500h1000/20200102/147b-imrkkfw8987861.jpg'
      }, {
        id: 2,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        status: 2
      }, {
        id: 3,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        status: 3
      }],
      articles: [], // 文章数据列表
      articleStatus: [
        {
          text: '标签一', status: 0, type: 'warning'
        },
        {
          text: '标签二', status: 1, type: 'success'
        },
        {
          text: '标签三', status: 2, type: 'danger'
        },
        {
          text: '标签四', status: 3, type: 'info'
        }
      ],
      totalCount: 0,
      pageSize: 10,
      status: null,
      channels: [], // 文章频道列表
      channelId: null, // 查询文章的频道
      rangeDate: null // 筛选的范围日期
      // loading: true // 表单数据加载中 loading

    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticles(1)
    this.loadChannels()
  },
  mounted: {},
  methods: {
    loadArticles (page = 1) {
      this.loading = true
      getArticles({
        page,
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.channelId,
        begin_pubdate: this.rangeDate ? this.rangeDate[0] : null, // 开始日期
        end_pubdate: this.rangeDate ? this.rangeDate[1] : null // 截止日期
      }).then(res => {
        // console.log(res)
        const { results, total_count: totalCount } = res.data.data
        this.totalCount = totalCount
        this.articles = results

        // 关闭加载中 loading
        this.loading = false
      })
    },
    onSubmit () {
      console.log('submit!')
    },
    onCurrentChange (page) {
      // console.log(page)
      this.loadArticles(page)
    },
    loadChannels () {
      getArticlesChannels().then(res => {
        //  找到数据接口
        //  封装请求方法
        //  删除请求结果
        //  处理响应结果
        this.channels = res.data.data.channels
      })
    },
    onDeleteArticle (articleId) {
      console.log(articleId)
      this.$confirm('确认删除吗?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticle(articleId).then(res => {
          console.log(res)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.filter-card {
  margin-bottom:30px
}
.list-table {
  margin-bottom: 20px;
}
.article-cover {
  width: 100px;
  background-size: cover;
}
</style>
