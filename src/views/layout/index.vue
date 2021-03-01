<template>
    <el-container class="layout-container">
    <el-aside class="aside" width="auto">
        <AppAside class="aside-menu" :is-collapse="isCollapse" />
    </el-aside>
    <el-container>
        <el-header class="header">
            <div>
                <i @click="isCollapse = !isCollapse" :class="{
                    'el-icon-s-fold': isCollapse,
                    'el-icon-s-unfold': !isCollapse
                    }"
                    ></i>
                <span>江苏传智播客科技教育有限公司</span>
            </div>
            <el-dropdown>
                <div class="avatar-wrap">
                    <img class="avatar" src="../../../public/aaa.jpg" alt="">
                    <span>用户昵称</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </div>
                <!-- <span class="el-dropdown-link">
                    下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
                </span> -->
                <el-dropdown-menu slot="dropdown">
                    <!-- 组件默认是不识别原生事件的，除非内部做了处理 -->
                    <el-dropdown-item>设置</el-dropdown-item>
                    <el-dropdown-item @click.native="onLogout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            </el-header>
        <el-main class="main">
            <!-- 子路由出口 -->
            <router-view />
        </el-main>
    </el-container>
    </el-container>
    <!-- <div class="layout-container">
        <div>顶部导航栏</div>
        <router-view />
        <div>侧边导航栏</div>
    </div> -->
</template>

<script>
import AppAside from './components/aside'
import { getUserProfile } from '@/api/user'
export default {
  name: 'LayoutIndex',
  components: {
    AppAside
  },
  props: {},
  data () {
    return {
      isCollapse: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserProfile()
  },
  mounted: {},
  methods: {
    loadUserProfile () {
      getUserProfile().then(res => {
        console.log(res)
      })
    },
    onLogout () {
      this.$confirm('确认退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('user')
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.layout-container {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}
.aside {
    background-color: #d3dce6;
    .aside-menu {
        height: 100%;
    }
}
.header {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    // background-color: #b3c0d1;
}
.main {
    background-color: #e9eef3;
}
.avatar-wrap {
    display: flex;
    align-items: center;
    .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;

    }
}
</style>
