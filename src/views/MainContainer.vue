<template>
  <div class="main-container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'mainContainer',
};
</script>

<style>
.main-container {
  display: flex;
  height: 100%;
  width: 100%;
  overflow-y: auto;
}
.el-scrollbar .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
