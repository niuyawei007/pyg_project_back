<template>
  <el-container class="home_container">
    <!-- nav标题导航栏 -->
    <el-header class="home_header"><el-button @click="shift" type="primary" icon="el-icon-menu" circle></el-button> 品优购后台管理系统<el-button @click="quit" style="float:right;margin-top:15px;" type="danger" round>退出</el-button></el-header>
    <el-container >
    <!-- aside边栏 -->
    <el-aside  class="home_aside" :width="collapse?'65px':'180px'" >
      <el-menu
       :default-active="$route.name"
        router
        :unique-opened="true"
        :collapse="collapse"
        :collapse-transition="false"
        background-color="lightblue"
        text-color="#000"
        active-text-color="#aaa"
        style="border:0;margin-top:3px;">
        <el-submenu :index="firstItem.id.toString()" v-for="(firstItem,i) in menu" :key="firstItem.id">
          <template slot="title">
            <i :class="['iconfont',iconfonts[i]]"></i>
            <span>{{firstItem.authName}}</span>
          </template>
          <el-menu-item style="min-width:180px; padding-left:30px;" :index="secondItem.path" v-for="secondItem in firstItem.children" :key="secondItem.id">
            <i class="el-icon-document"></i>
            <span>{{secondItem.authName}}</span></el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <!-- main主展示窗口 -->
    <el-main class="home_main"><router-view></router-view></el-main>
    </el-container><el-progress :percentage="100" status="success"></el-progress>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      collapse: false,
      menu: [],
      iconfonts: ['icon-user-fill', 'icon-cog', 'icon-shoppingcart', 'icon-file', 'icon-chart-area']
    }
  },
  methods: {
    shift () {
      console.log('hello')
      this.collapse = !this.collapse
    },
    async getData () {
      const {data: {data, meta}} = await this.$http.get('menus')
      console.log({data: {data, meta}})
      if (meta.status !== 200) {
        return this.$message.error('获取数据失败')
      } else {
      // 修改数据
        this.menu = data
      }
    },
    quit () {
      console.log('退出登录')
      const data2 = this.$http
      console.log(data2)
      sessionStorage.removeItem('token')
      this.$router.push('/login')
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style scoped>
.home_container{
  height:100%;
}
.home_header{
  color:black;
  line-height:60px;
  font-weight:700;
  font-size:20px;
  background:linear-gradient(left,lightblue,rgb(137, 195, 248))
}
.home_aside{
  background:linear-gradient(top,lightblue,rgb(58, 171, 236));
}
.home_main{
  background:linear-gradient(135deg,rgb(212, 234, 241),rgb(179, 214, 247));
  padding:0;
}

</style>
