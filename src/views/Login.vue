<template>
  <div class="login">
    <!--
    :model="form" : 用于收集表单数据，是一个对象
    label-width="80px" :label的宽度
    -->
    <el-form
      class="form"
      ref="form"
      :model="user"
      label-width="60px"
      :rules="rules"
    >
      <h2>后台管理系统</h2>
      <el-form-item label="账号" class="zhanghao" prop="username">
        <el-input
          v-model="user.username"
          clearable
          placeholder="请输入用户名"
          @keyup.enter.native="login"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" class="mima" prop="password">
        <el-input
          type="password"
          v-model="user.password"
          placeholder="请输入密码"
          show-password
          @keyup.enter.native="login"
        ></el-input>
      </el-form-item>
      <el-form-item class="anniu">
        <el-button type="success" @click="login">登录</el-button>
        <el-button type="danger" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      // 校验规则
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'change' },
          {
            pattern: /^[0-9]{5,11}$/,
            message: '用户名长度为5-11位数字',
            trigger: 'change'
          }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'change' },
          {
            pattern: /^[a-z0-9A-Z]{3,12}$/,
            message: '密码长度为3-12位',
            trugger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    async login() {
      // 表单校验
      try {
        await this.$refs.form.validate()
      } catch {
        // 失败
        return console.log('校验失败')
      }
      const res = await this.$axios.post('/login', this.user)
      // console.log(res.data)
      const { statusCode, message, data } = res.data
      if (statusCode === 200) {
        this.$message.success(message)
        // 保存token
        localStorage.setItem('token', data.token)
        localStorage.setItem('userId', data.user.id)
        // 跳转到首页
        this.$router.push('/')
      } else {
        this.$message.error(message)
      }
    },
    reset() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .form {
    width: 400px;
    height: 240px;
    background-color: #eee;
    padding: 30px;
    h2 {
      text-align: center;
    }
    .zhanghao {
      margin-top: 30px;
    }
    .mima {
      margin-top: 20px;
    }
    .anniu {
      margin-top: 30px;
    }
  }
}
</style>
