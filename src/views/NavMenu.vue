<template>
  <div class="menu-bar-container" :class="$store.state.collapse?'menu-bar-collapse-width':'menu-bar-width'">
    <el-menu
      :default-active="$route.path"
      text-color="#fff"
      :class="$store.state.collapse?'menu-bar-collapse-width':'menu-bar-width'"
      :collapse="$store.state.collapse"
      :collapse-transition="false"
      style="height: 100%; background-color: rgba(0, 0, 0, 0); border: 0;"
    >
      <el-menu-item index="/weather" @click="$router.push('weather')">
        <i class="icon-third-weather" style="margin-right: 8px; font-size: 14px;"></i>
        <span slot="title" class="title">{{$t('navMenu.weather')}}</span>
      </el-menu-item>
      <el-menu-item index="/fertilizer" @click="$router.push('fertilizer')">
        <i class="icon-third-shui" style="margin-right: 10px;"></i>
        <span slot="title" class="title">{{$t('navMenu.fertilizer')}}</span>
      </el-menu-item>
      <el-menu-item index="/lysimeter" @click="$router.push('lysimeter')">
        <i class="icon-third-database" style="margin-right: 10px;"></i>
        <span slot="title" style="letter-spacing: 5px;">{{$t('navMenu.lysimeter')}}</span>
      </el-menu-item>
      <el-menu-item index="/video" @click="$router.push('video')">
        <i class="el-icon-video-camera-solid" style="font-size: 20px;"></i>
        <span slot="title" style="letter-spacing: 5px;">{{$t('navMenu.video')}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'navMenu',
  data() {
    return {
      user: {},
    };
  },
  mounted() {
    const username = sessionStorage.getItem('username');
    this.$http
      .get(`/user/${username}`, {
        headers: {
          token: sessionStorage.getItem('token'),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          this.user = response.data;
        }
      })
      .catch();
  },
};
</script>

<style scoped>
.menu-bar-container {
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  user-select: none;
}

.menu-bar-width {
  width: 200px;
}

.menu-bar-collapse-width {
  width: 65px;
}

.el-menu >>> .is-active {
  background-color: #278cff;
  color: #fff;
}
.el-menu-item:hover {
  background-color: #278cff;
  color: #fff;
}
.el-menu-item:focus {
  background-color: #278cff;
  color: #fff;
}

.title {
  letter-spacing: 5px;
}
</style>
