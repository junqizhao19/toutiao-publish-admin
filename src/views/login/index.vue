<template>
    <div class="login-container">
        <div class="login-head"></div>
        <el-form class="login-form" ref="login-form" :model="user" :rules="formRules">
            <el-form-item prop="mobile">
                <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
            </el-form-item>
            <el-form-item prop="agree">
                 <el-checkbox v-model="user.agree"> 我已阅读并同意用户协议和隐私条款</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onLogin" class="login-btn" :loading="loginLoading">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import request from '@/utils/request'

export default {
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '', // 验证码
        agree: false // 是否同意协议
      },
      // checked: false,
      loginLoading: false,
      formRules: {
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ],
        agree: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请同意用户协议'))
              }
            },
            // message: '验证码不能为空',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    onLogin () {
      // 获取表单数据（根据接口要求绑定数据）

      // const user = this.user
      // 表单验证
      this.$refs['login-form'].validate((valid) => {
        if (!valid) {
          return
        }
        this.login()
      })
    },
    login () {
      // 验证通过，提交登录
      this.loginLoading = true
      request({
        method: 'POST',
        url: ' /mp/v1_0/authorizations',

        // data用来设置POST请求体

        data: this.user
      }).then(res => {
        console.log(res)
        // 登录成功
        this.loginLoading = false
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        this.$router.push({
          name: 'home'
        })
      }).catch(err => {
        console.log('登录失败', err)
        this.loginLoading = false
        this.$message.error('登录失败，手机号或验证码错误')
      })
      // 处理后端响应结果
      // 成功：
      // 失败：
    }
  }
}
</script>
<style scoped lang="less">
.login-container {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: url("./login_bg.jpg") no-repeat;
    background-size: cover;
    .login-head{
        width:300px;
        height:57px;
        background:url("./logo_index.png") no-repeat;
        margin-bottom: 30px;
    }
    .login-form {
        background-color: #fff;
        padding: 50px;
        min-width: 300px;
        .login-btn{
            width: 100%;
        }
    }
}
</style>
