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
              inactive-color="#ccc"
              @change="updateState(scope.row.id,scope.row.mg_state)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width=180>
          <template slot-scope="scope">
            <el-button-group>
              <el-button @click="showEditDialogFormVisible(scope.row.id)" icon="el-icon-edit" round></el-button>
              <el-button @click="delUsers(scope.row.id)" icon="el-icon-delete" round></el-button>
              <el-button @click="showRoleDialogFormVisible(scope.row)" icon="el-icon-setting" round></el-button>
            </el-button-group>
          </template>
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
    <el-dialog width="400px" title="分配角色" :visible.sync="roleDialogFormVisible">
      <el-form label-width="100px" autocomplete="off">
        <el-form-item label="当前用户：">
          {{roleUserName}}
        </el-form-item>
        <el-form-item label="当前用户：">
          {{roleUserRoleName}}
        </el-form-item>
        <el-form-item label="分配角色：">
          <el-select v-model="roleValue" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.roleName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeRole()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog width="400px" title="编辑用户" :visible.sync="editDialogFormVisible">
      <el-form ref="editForm" :model="editForm" :rules="editRules" label-width="80px" autocomplete="off">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSubmit()">确 定</el-button>
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
        pagesize: 5
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
      },
      roleDialogFormVisible: false,
      // 选中角色的值
      roleValue: '',
      // 当前用户的 用户名
      roleUserName: '',
      // 当前用户的 角色
      roleUserRoleName: '',
      // 用户的ID
      roleUserId: '',
      // 角色下拉所有选项
      options: [],
      // 修改角色相关
      editDialogFormVisible: false,
      editForm: {},
      editRules: {
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
    async showEditDialogFormVisible (id) {
      // 显示编辑对话框
      this.editDialogFormVisible = true
      // 可能需要重置表单
      // 填充数据
      // 发请求需要用户的ID
      const {data: {data, meta}} = await this.$http.get(`users/${id}`)
      if (meta.status !== 200) return this.$message.error('获取用户数据失败')
      // 把数据展示表单内
      this.editForm = data
    },
    editSubmit () {
      // 编辑的提交
      // 整个表单的校验
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          // 校验成功
          const {data: {meta}} = await this.$http.put(`users/${this.editForm.id}`, {
            email: this.editForm.email,
            mobile: this.editForm.mobile
          })
          if (meta.status !== 200) return this.$message.error('修改失败')
          this.$message.success('修改成功')
          this.getData()
          this.editDialogFormVisible = false
        }
      })
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
    },
    async updateState (id, newState) {
      // id 用户的ID newState 已改变的状态
      // console.log(id, newState)
      const {data: {meta}} = await this.$http.put(`users/${id}/state/${newState}`)
      if (meta.status !== 200) return this.$message.error('修改状态失败')
      this.$message.success('修改状态成功')
      this.getData()
    },
    delUsers (id) {
      this.$confirm('是否删除该数据?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击了确认  发请求
        const {data: {meta}} = await this.$http.delete(`users/${id}`)
        if (meta.status !== 200) return this.$message.error('删除失败')
        this.$message.success('删除成功')
        this.getData()
      })
    },
    async showRoleDialogFormVisible (row) {
      // 打开对话框
      this.roleDialogFormVisible = true
      // 渲染下拉菜单
      const {data: {data, meta}} = await this.$http.get('roles')
      if (meta.status !== 200) return this.$message.error('获取角色失败')
      this.options = data
      // 当前用户的信息  获取用户信息
      // const {data: {data: ud, meta: um}} = await this.$http.get(`users/${id}`)
      // if (um.status !== 200) return this.$message.error('获取用户失败')
      // console.log(ud)
      this.roleUserId = row.id
      this.roleUserName = row.username
      this.roleUserRoleName = row.role_name
    },
    async changeRole () {
      const {data: {meta}} = await this.$http.put(`users/${this.roleUserId}/role`, {
        rid: this.roleValue
      })
      if (meta.status !== 200) return this.$message.error('分配角色失败')
      this.$message.success('分配角色成功')
      this.roleDialogFormVisible = false
      this.getData()
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
