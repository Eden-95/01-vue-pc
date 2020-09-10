<template>
  <div class="login">
    <!--
    :model="form" : 用于收集表单数据，是一个对象
    label-width="80px" :label的宽度
    -->
    <el-form class="form" :model="user" label-width="40px">
      <h2>后台管理系统</h2>
      <el-form-item label="账号" class="zhanghao">
        <el-input
          v-model="user.username"
          clearable
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" class="mima">
        <el-input
          type="password"
          v-model="user.password"
          placeholder="请输入密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item class="anniu">
        <el-button type="success">登录</el-button>
        <el-button type="danger">重置</el-button>
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
      }
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
