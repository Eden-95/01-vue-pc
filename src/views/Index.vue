<template>
  <div class="index">
    <el-container>
      <el-aside width="200px">
        <div class="logo">黑马头条</div>
        <!-- 导航菜单 -->
        <el-menu
          :default-active="$route.path"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <!-- 新语法 -->
          <el-menu-item index="/">
            <template #title>
              <i class="el-icon-message-solid"></i>
              <span>文章列表</span>
            </template>
          </el-menu-item>
          <!-- 旧语法 -->
          <el-menu-item index="/publish">
            <i class="el-icon-menu"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="info">
            <img
              v-if="user.head_img"
              :src="$axios.defaults.baseURL + user.head_img"
              alt=""
            />
            <span>{{ user.nickname }}</span>
          </div>
          <div class="logout">
            <a href="#" @click.prevent="logout">退出</a>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {}
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.get(`/user/${userId}`)
      // console.log(res.data)
      if (res.statusCode === 200) {
        this.user = res.data
        console.log(this.user)
      }
    },
    async logout() {
      // 弹窗
      try {
        await this.$confirm('你确认要退出吗？', '温馨提示', {
          type: 'warning'
        })
      } catch {
        return this.$message.info('操作取消')
      }
      // 点击确定
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      // 跳转
      this.$router.push('/login')
      // 提示
      this.$message.success('退出成功')
    }
  }
}
</script>

<style lang="scss" scoped>
.el-aside {
  background-color: #545c64;
  .logo {
    width: 200px;
    height: 60px;
    background-color: #333;
    text-align: center;
    line-height: 60px;
    color: #fff;
    font-size: 18px;
  }
}
.el-header {
  background-color: #b3c0d1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .info {
    display: flex;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
.el-main {
  background-color: #e9eef3;
}
.index {
  height: 100%;
  .el-container {
    height: 100%;
  }
}
</style>
