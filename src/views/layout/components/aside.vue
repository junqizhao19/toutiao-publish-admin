<template>
        <el-menu
            class="nav-menu"
            :default-active="$route.path"
            background-color="#002033"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
            :collapse="isCollapse"
            >
            <el-menu-item index="/">
                <i class="el-icon-setting"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/article">
                <i class="el-icon-menu"></i>
                <span slot="title">内容管理</span>
            </el-menu-item>
            <el-menu-item index="/image">
                <i class="iconfont iconimage"></i>
                <span slot="title">素材管理</span>
            </el-menu-item>
            <el-menu-item index="/publish">
                <i class="iconfont iconpublish"></i>
                <span slot="title">发布文章</span>
            </el-menu-item>
            <el-menu-item index="/comment">
                <i class="iconfont iconentypocomment"></i>
                <span slot="title">评论管理</span>
            </el-menu-item>
            <el-menu-item index="/fans">
                <i class="el-icon-setting"></i>
                <span slot="title">粉丝管理</span>
            </el-menu-item>
            <el-menu-item index="/settings">
                <i class="el-icon-setting"></i>
                <span slot="title">个人设置</span>
            </el-menu-item>
            </el-menu>
</template>

<script>
export default {
  name: 'AppAside',
  props: ['is-collapse'],
  data () {
    return {
      // isCollapse: false
    }
  },
  component: '',
  computed: {},
  watch: {},
  created: {},
  mounted: {},
  methods: {}
}
</script>

<style scoped lang="less">
.nav-menu {
    .iconfont {
        margin-right: 8px;
        padding-left: 5px;
    }
}
</style>
