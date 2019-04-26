<template>
  <div class="users_container">
    <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 展示区域 -->
    <el-card>
    <!-- 搜索和添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
            <el-input v-model="reqParams.query" placeholder="请输入内容">
              <el-button @click="search()" slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </el-col>
        <el-col :span="16">
          <el-button @click="showDialogForm()" type="primary" plain>添加用户</el-button>
        </el-col>
      </el-row>
      <!--表格-->
      <el-table :data="userList" stripe style="width: 100%">
        <el-table-column prop="username" label="姓名">
        </el-table-column>
        <el-table-column prop="email" label="邮箱">
        </el-table-column>
        <el-table-column prop="mobile" label="电话">
        </el-table-column>
        <el-table-column prop="role_name" label="角色">
        </el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ccc">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width=180>
          <el-button-group>
            <el-button icon="el-icon-edit" round></el-button>
            <el-button icon="el-icon-delete" round></el-button>
            <el-button icon="el-icon-setting" round></el-button>
          </el-button-group>
        </el-table-column>
      </el-table>
      <div class="pager_container">
        <el-pagination
          @current-change="changePager"
          :page-size="reqParams.pagesize"
          :current-page="reqParams.pagenum"
          background
          layout="prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </el-card>
    <el-dialog width="400px" title="添加用户" :visible.sync="dialogFormVisible">
      <el-form ref="addForm" :model="addForm" :rules="addRules" label-width="80px" autocomplete="off">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    var checkMobile = (rule, value, callback) => {
      if (!/^1[3456789]\d{9}$/.test(value)) return callback(new Error('手机号不对'))
      callback()
    }
    return {
      userList: [],
      // 传参
      reqParams: {
        query: '',
        pagenum: 1,
        pagesize: 3
      },
      serchValue: '',
      // 总条数
      total: 0,
      dialogFormVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addRules: {
        username: [
          {required: true, message: '用户名必填', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码必填', trigger: 'blur'},
          {min: 6, max: 18, message: '密码6-18个字符串', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '邮箱必填', trigger: 'blur'},
          {type: 'email', message: '邮箱格式错误', trigger: 'blur'}
        ],
        mobile: [
          {required: true, message: '手机号必填', trigger: 'blur'},
          // 手机号必须自定义校验规则  通过自己的函数来校验 （rule,value,callback）
          {validator: checkMobile, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    async getData () {
      // console.log(123)
      const {data: {data, meta}} = await this.$http.get('users', {params: this.reqParams})
      if (meta.status !== 200) return this.$message.error('获取用户信息失败')
      console.log({data: {data, meta}})
      this.userList = data.users
      this.total = data.total
    },
    changePager (newPage) {
      this.reqParams.pagenum = newPage
      this.getData()
    },
    adduser () {
      console.log('add')
      this.dialogFormVisible = true
    },
    search () {
      // 根据当前搜索关键字 去查询第一页的数据
      this.reqParams.pagenum = 1
      this.getData()
    },
    addSubmit () {
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          const {data: {meta}} = await this.$http.post('users', this.addForm)
          if (meta.status !== 201) return this.$message.error('添加失败')
          // 添加成功后
          this.dialogFormVisible = false
          // 更新列表
          this.getData()
          return this.$message.success('添加成功')
        }
      })
    },
    showDialogForm () {
      // 注意： 只有先渲染 找到dom
      // 显示添加对话框
      this.dialogFormVisible = true
      // 重置表单  内容  验证
      this.$refs.addForm.resetFields()
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style scoped>
.users_container{
  padding:20px;
}
.pager_container{
  margin-top: 15px;
  text-align: right;
}
</style>
