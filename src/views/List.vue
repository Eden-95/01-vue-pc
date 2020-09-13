<template>
  <div class="list">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/activity">活动管理</el-breadcrumb-item>
      <el-breadcrumb-item to="/list">活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 列表卡片 -->
    <el-card>
      <el-table :data="list" style="width: 100%" stripe border>
        <!--
          label: 表头
          prop： 该列需要显示数据的哪一项
         -->
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="100"
          :index="indexMethod"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="title"
          label="标题"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="user.nickname"
          label="作者"
        ></el-table-column>
        <el-table-column align="center" label="创建时间">
          <template v-slot="scope">
            {{ scope.row.create_date | time }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="cover[0].url" label="封面">
          <template v-slot="scope">
            <img :src="$url(scope.row.cover[0].url)" alt="" />
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <el-button type="primary">编辑</el-button>
          <el-button>删除</el-button>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <!--
        background：分页有蓝色的背景
        total： 指定总条数
        page-size： 指定每页显示的条数
        :current-page: 当前页
        current-change： 当前页发生改变的时候的事件
        layout:
       -->
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        background
        :total="total"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        :current-page="pageIndex"
        @current-change="currentChange"
        @size-change="sizeChange"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      pageIndex: 1,
      pageSize: 5,
      // 总文章数
      total: 0
    }
  },
  created() {
    this.getPostList()
  },
  methods: {
    async getPostList() {
      const res = await this.$axios.get('/post', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      console.log(res)
      const { statusCode, data, total } = res
      if (statusCode === 200) {
        this.list = data
        this.total = total
        console.log(this.list)
      }
    },
    currentChange(value) {
      console.log('页码值改变了', value)
      this.pageIndex = value
      this.getPostList()
    },
    sizeChange(value) {
      console.log('每页的条数变化', value)
      this.pageSize = value
      this.getPostList()
    },
    indexMethod(index) {
      return index + 1 + (this.pageIndex - 1) * this.pageSize
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-top: 20px;
  img {
    width: 200px;
    height: 120px;
    object-fit: cover;
  }
  .el-table {
    margin-bottom: 10px;
  }
}
</style>
