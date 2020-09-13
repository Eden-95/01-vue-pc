<template>
  <div class="publish">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/activity">活动管理</el-breadcrumb-item>
      <el-breadcrumb-item to="/list">活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>发布文章</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-form :model="post" label-width="80px">
        <el-form-item label="文章标题">
          <el-input
            placeholder="请输入文章标题"
            v-model="post.title"
          ></el-input>
        </el-form-item>
        <el-form-item label="文章内容">
          <quill-editor v-model="post.content"></quill-editor>
        </el-form-item>
        <el-form-item label="栏目">
          <el-checkbox-group v-model="post.categories">
            <el-checkbox
              :label="item.id"
              name="type"
              v-for="item in tabList"
              :key="item.id"
              >{{ item.name }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="封面">
          <!-- action:上传的图片地址 -->
          <el-upload
            action="http://localhost:3000/upload"
            :headers="headers"
            list-type="picture-card"
            :on-success="success"
            :on-remove="remove"
            multiple
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="post.type">
            <el-radio :label="1">文章</el-radio>
            <el-radio :label="2">视频</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="publish">发布</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      post: {
        title: '',
        content: '',
        categories: [],
        cover: [],
        type: 1
      },
      // 栏目数据
      tabList: [],
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }
  },
  created() {
    this.getTabList()
  },
  methods: {
    async getTabList() {
      const res = await this.$axios.get('/category')
      console.log(res)
      const { statusCode, data } = res
      if (statusCode === 200) {
        this.tabList = data.filter(
          item => item.name !== '关注' && item.name !== '头条'
        )
        console.log(this.tabList)
      }
    },
    success(res, file, fileList) {
      console.log('res', res)
      console.log('file', file)
      console.log('fileList', fileList)
      const { statusCode, data } = res
      if (statusCode === 200) {
        this.post.cover.push(data)
      }
    },
    remove(file) {
      console.log(file)
      this.post.cover = this.post.cover.filter(
        item => item.id !== file.response.data.id
      )
    },
    parseCategories(arr) {
      // 简写
      // return arr.map(item => ({ id: item }))
      // 完整写
      return arr.map(item => {
        return { id: item }
      })
    },
    async publish() {
      // 在发送ajax请求的时候，需要处理categories，把[4,5,6]=>[{id:4},{id:5},{id:6}]
      const res = await this.$axios.post('/post', {
        ...this.post,
        categories: this.parseCategories(this.post.categories)
      })
      console.log(res)
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-top: 20px;
  ::v-deep .ql-editor {
    height: 200px;
  }
}
</style>
