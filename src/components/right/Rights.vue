<template>
  <div class="rights_container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table
        height="400px"
        :data="rightsList"
        style="width: 100%">
        <el-table-column
          type="index">
        </el-table-column>
        <el-table-column
          property="authName"
          label="权限名称">
        </el-table-column>
        <el-table-column
          property="path"
          label="路径">
        </el-table-column>
        <el-table-column
          label="权限等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level==='0'">一级权限</el-tag>
            <el-tag v-if="scope.row.level==='1'" type="success">二级权限</el-tag>
            <el-tag v-if="scope.row.level==='2'" type="warning">三级权限</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Rights',
  data () {
    return {
      rightsList: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      // 获取权限列表数据
      const {data: {data, meta}} = await this.$http.get('rights/list')
      if (meta.status !== 200) return this.$message.error('获取权限列表数据失败')
      this.rightsList = data
      console.log(data)
    }
  }
}
</script>

<style scoped>
.rights_container{
  padding:20px;
}
</style>
