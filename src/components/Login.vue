<template>
  <div class="login_container">
    <div class="login_box">
      <img class="login_img" src="../assets/logo.png" alt="">
      <!-- :model="formLabelAlign" 绑定一个表达数据对象 form:{username:'',password:''} -->
      <el-form ref="form" :model="formLogin" :rules="rules">
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-info" type="text" placeholder="请输入登录名" v-model="formLogin.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-view" type="password" placeholder="请输入密码" v-model="formLogin.password"></el-input>
        </el-form-item>
        <el-form-item>
        <el-button type="primary" @click="submit()">登录</el-button>
        <el-button @click="reset()">重置</el-button>
        </el-form-item>
      </el-form>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      formLogin: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          {required: true, message: '请输入登录名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 18, message: '请输入6-18位', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submit () {
      console.log('登陆一下试试')
      this.$refs.form.validate(async valid => {
        if (valid) {
          // console.log('success')
          // const res = await this.$http.post('login', this.form)
          const {data: {data, meta}} = await this.$http.post('login', this.formLogin)
          console.log({data: {data, meta}})
          if (meta.status !== 200) {
            return this.$message.error('输入的用户名或密码有误')
          } else {
            sessionStorage.setItem('token', data.token)
            this.$router.push('/home')
          }
        }
      })
    },
    reset () {
      console.log('重置按钮')
      this.formLogin.username = ''
      this.formLogin.password = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login_container{
  width:100%;
  height:100%;
  background:linear-gradient(45deg,#ccc,blue)
}
.login_container .login_box{
  width:400px;
  height:250px;
  background:linear-gradient(45deg,#eee,lightblue);
  position:absolute;
  box-shadow: 0 0 10px #eee;
  top:50%;
  left:50%;
  transform:translate(-50%,-60%);
  border-radius:10px;
  padding:0 15px;
  box-sizing:border-box;
}
.login_container .login_box .login_img{
  width:80px;
  display:block;
  margin:0 auto;
}
</style>
