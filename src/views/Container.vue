<template>
  <div class="container">
    <Headbar></Headbar>
    <div style="display: flex; height: 100%; width: 100%;">
      <NavMenu></NavMenu>
      <MainContainer></MainContainer>
    </div>
  </div>
</template>

<script>
import NavMenu from './NavMenu.vue';
import Headbar from './Headbar.vue';
import MainContainer from './MainContainer.vue';

export default {
  name: 'container',
  components: {
    NavMenu,
    Headbar,
    MainContainer,
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: url('../assets/background1.jpg') no-repeat;
  background-size: cover;
}
</style>
