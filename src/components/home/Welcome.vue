<template>
  <div class="welcome_container">
    <h2>欢迎来到品优购后台管理系统</h2>
    <h2>Welcome to the background management system of PYG</h2>
    <!-- <img src="../assets/img/hello.jpg" alt=""> -->
  </div>
</template>

<script>
export default {
  name: 'Welcome'
}
</script>

<style scoped>
h2{
    padding:20px;
    margin:0;
    color:white;
}
.welcome_container{
  text-align: center;
  height:100%;
  background:url(../../assets/img/hello.jpg) no-repeat;
  background-size:100% 100%;
}

</style>
