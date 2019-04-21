<template>
  <el-container class="home_container">
    <!-- nav标题导航栏 -->
    <el-header class="home_header"><el-button @click="shift" type="primary" icon="el-icon-menu" circle></el-button> 品优购后台管理系统<el-button style="float:right;margin-top:15px;" type="danger" round>退出</el-button></el-header>
    <el-container >
    <!-- aside边栏 -->
    <el-aside :collapse="collapse" :collapse-transition="false" class="home_aside" :width="collapse?'65px':'180px'" >
      <el-menu
        background-color="lightblue"
        text-color="#000"
        active-text-color="#aaa"
        style="border:0">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item index="1-1">选项2</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <!-- main主展示窗口 -->
    <el-main class="home_main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      collapse: ''
    }
  },
  methods: {
    shift () {
      console.log('hello')
      this.collapse = !false
    }
  }
}
</script>

<style scoped>
.home_container{
  height:100%;
}
.home_header{
  color:black;
  line-height: 60px;
  font-weight:700;
  font-size:20px;
  background:linear-gradient(left,lightblue,rgb(137, 195, 248))
}
.home_aside{
  background:linear-gradient(top,lightblue,rgb(58, 171, 236));
}
.home_main{
  background:linear-gradient(135deg,lightblue,rgb(137, 195, 248));
}

</style>
