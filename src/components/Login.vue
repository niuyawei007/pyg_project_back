<template>
  <div class="login_container">
    <div class="login_box">
      <img class="login_img" src="../assets/logo.png" alt="">
      <!-- :model="formLabelAlign" 绑定一个表达数据对象 form:{username:'',password:''} -->
      <el-form :model="formLogin">
        <el-form-item>
          <el-input type="text" placeholder="请输入登录名" v-model="formLogin.username"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password" placeholder="请输入密码" v-model="formLogin.password"></el-input>
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
        username: '',
        password: ''
      }
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
