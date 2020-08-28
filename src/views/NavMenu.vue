<template>
  <div class="menu-bar-container" :class="$store.state.collapse?'menu-bar-collapse-width':'menu-bar-width'">
    <el-menu
      :default-active="$route.path"
      text-color="#fff"
      :class="$store.state.collapse?'menu-bar-collapse-width':'menu-bar-width'"
      :collapse="$store.state.collapse"
      :collapse-transition="false"
      style="height: 100%; background-color: rgba(0, 0, 0, 0); border: 0;"
      unique-opened
    >
      <el-menu-item index="/GIS" @click="$router.push('GIS')">
        <i class="el-icon-s-promotion" style="font-size: 20px;"></i>
        <span slot="title" style="letter-spacing: 15px;">GIS</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="icon-third-weather" style="margin-right: 8px; font-size: 14px;"></i>
          <span>自动气象站</span>
        </template>
        <!-- <el-menu-item disabled>
          <span slot="title" class="title">粥店</span>
        </el-menu-item>
        <el-menu-item disabled>
          <span slot="title" class="title">天平</span>
        </el-menu-item>
        <el-menu-item disabled>
          <span slot="title" class="title">山口</span>
        </el-menu-item>
        <el-menu-item disabled>
          <span slot="title" class="title">大汶口</span>
        </el-menu-item>
        <el-menu-item disabled>
          <span slot="title" class="title">祝阳</span>
        </el-menu-item>
        <el-menu-item disabled>
          <span slot="title" class="title">范镇</span>
        </el-menu-item>
        <el-menu-item disabled>
          <span slot="title" class="title">角峪</span>
        </el-menu-item>
        <el-menu-item disabled>
          <span slot="title" class="title">马庄</span>
        </el-menu-item>
        <el-menu-item disabled>
          <span slot="title" class="title">满庄</span>
        </el-menu-item>
        <el-menu-item disabled>
          <span slot="title" class="title">夏张</span>
        </el-menu-item>
        <el-menu-item disabled>
          <span slot="title" class="title">道郎</span>
        </el-menu-item>
        <el-menu-item disabled>
          <span slot="title" class="title">角峪先锋</span>
        </el-menu-item> -->
        <el-menu-item  index="/weather1" @click="handleClickWeather1">
          <span slot="title" class="title1">岱岳区夏张气象观测站</span>
        </el-menu-item>
        <el-menu-item  index="/weather2" @click="handleClickWeather2">
          <span slot="title" class="title1">岱岳区马庄气象观测站</span>
        </el-menu-item>
        <el-menu-item  index="/weather3" @click="handleClickWeather3">
          <span slot="title" class="title1">岱岳区道朗气象观测站</span>
        </el-menu-item>
        <el-menu-item  index="/weather4" @click="handleClickWeather4">
          <span slot="title" class="title1">岱岳区角峪气象观测站</span>
        </el-menu-item>
        <el-menu-item  index="/weather5" @click="handleClickWeather5">
          <span slot="title" class="title1">岱岳区粥店气象观测站</span>
        </el-menu-item>
        <el-menu-item  index="/weather6" @click="handleClickWeather6">
          <span slot="title" class="title1">岱岳区大汶口气象观测站</span>
        </el-menu-item>
        <el-menu-item  index="/weather7" @click="handleClickWeather7">
          <span slot="title" class="title1">岱岳区山口气象观测站</span>
        </el-menu-item>
        <el-menu-item  index="/weather8" @click="handleClickWeather8">
          <span slot="title" class="title1">岱岳区祝阳气象观测站</span>
        </el-menu-item>
        <el-menu-item  index="/weather9" @click="handleClickWeather9">
          <span slot="title" class="title1">岱岳区满庄气象观测站</span>
        </el-menu-item>
        <el-menu-item  index="/weather10" @click="handleClickWeather10">
          <span slot="title" class="title1">岱岳区天平气象观测站</span>
        </el-menu-item>
        <el-menu-item  index="/weather11" @click="handleClickWeather11">
          <span slot="title" class="title1">岱岳区角峪镇先锋村气象观测站</span>
        </el-menu-item>
        <el-menu-item  index="/weather12" @click="handleClickWeather12">
          <span slot="title" class="title1">岱岳区范镇国家气象观测站</span>
        </el-menu-item>
      </el-submenu>
      <!-- <el-submenu index="2">
        <template slot="title">
          <i class="icon-third-shui" style="margin-right: 10px;"></i>
          <span>土壤水分站</span>
        </template>
        <el-menu-item disabled>
          <span slot="title" class="title">农大农场</span>
        </el-menu-item>
        <el-menu-item disabled>
          <span slot="title" class="title">良庄</span>
        </el-menu-item>
        <el-menu-item disabled>
          <span slot="title" class="title">马庄</span>
        </el-menu-item>
      </el-submenu> -->
      <!-- <el-submenu index="3">
        <template slot="title">
          <i class="icon-third-weather" style="margin-right: 8px; font-size: 14px;"></i>
          <span style="letter-spacing: 10px;">果业站</span>
        </template>
        <el-menu-item disabled>
          <span slot="title">良庄基地(D4710)</span>
        </el-menu-item>
        <el-menu-item disabled>
          <span slot="title">良庄基地(D4709)</span>
        </el-menu-item>
      </el-submenu> -->
      <!-- <el-submenu index="4">
        <template slot="title">
          <i class="icon-third-weather" style="margin-right: 8px; font-size: 14px;"></i>
          <span style="letter-spacing: 5px;">小气候站</span>
        </template>
        <el-menu-item disabled>
          <span slot="title">良庄基地(D4706)</span>
        </el-menu-item>
        <el-menu-item disabled>
          <span slot="title">大汶口(D4707)</span>
        </el-menu-item>
        <el-menu-item disabled>
          <span slot="title">设施站(D4705)</span>
        </el-menu-item>
      </el-submenu> -->
      <el-submenu index="5">
        <template slot="title">
          <i class="icon-third-weather" style="margin-right: 8px; font-size: 14px;"></i>
          <span style="letter-spacing: 5px;">智能温室</span>
        </template>
        <el-menu-item index="/weather" @click="handleClickWenshi">
          <span slot="title">温室监测控制系统</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">
          <i class="icon-third-weather" style="margin-right: 8px; font-size: 14px;"></i>
          <span style="letter-spacing: 22px;">果园</span>
        </template>
        <el-menu-item disabled>
          <span slot="title">小气候站</span>
        </el-menu-item>
        <el-menu-item index="/weather" @click="handleClickGuoyuan">
          <span slot="title">生长监测仪</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="7">
        <template slot="title">
          <i class="icon-third-database" style="margin-right: 10px;"></i>
          <span style="letter-spacing: 10px;">蒸渗仪</span>
        </template>
        <el-menu-item index="/lysimeter" @click="$router.push('lysimeter')">
        <span slot="title" >蒸渗监测系统</span>
      </el-menu-item>
      </el-submenu>
      <el-submenu index="8">
        <template slot="title">
          <i class="icon-third-shui" style="margin-right: 10px;"></i>
          <span>水肥一体化</span>
        </template>
        <el-menu-item index="/fertilizer" @click="$router.push('fertilizer')">
          <span slot="title">种植区</span>
        </el-menu-item>
        <el-menu-item index="/fertilizer" @click="$router.push('fertilizer')">
          <span slot="title">实验区</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="9">
        <template slot="title">
          <span>肥城肥桃示范点</span>
        </template>
        <el-menu-item disabled>
          <span slot="title">小气候站</span>
        </el-menu-item>
        <el-menu-item disabled>
          <span slot="title">生长监测仪</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="10">
        <template slot="title">
          <span>道朗茶园示范点</span>
        </template>
        <el-menu-item disabled>
          <span slot="title">自动气象站</span>
        </el-menu-item>
      </el-submenu>
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
  methods: {
    handleClickGuoyuan() {
      this.$router.push('weather');
      this.$store.commit('currentDeviceId', { currentDeviceId: 16065522 });
    },
    handleClickWenshi() {
      this.$router.push('weather');
      this.$store.commit('currentDeviceId', { currentDeviceId: 16062693 });
    },
    handleClickWeather1() {
      this.$router.push('weather1');
      this.$store.commit('currentDeviceId', { currentDeviceId: 10004164 });
    },
    handleClickWeather2() {
      this.$router.push('weather2');
      this.$store.commit('currentDeviceId', { currentDeviceId: 10004170 });
    },
    handleClickWeather3() {
      this.$router.push('weather3');
      this.$store.commit('currentDeviceId', { currentDeviceId: 10004171 });
    },
    handleClickWeather4() {
      this.$router.push('weather4');
      this.$store.commit('currentDeviceId', { currentDeviceId: 10004173 });
    },
    handleClickWeather5() {
      this.$router.push('weather5');
      this.$store.commit('currentDeviceId', { currentDeviceId: 10004176 });
    },
    handleClickWeather6() {
      this.$router.push('weather6');
      this.$store.commit('currentDeviceId', { currentDeviceId: 10004168 });
    },
    handleClickWeather7() {
      this.$router.push('weather7');
      this.$store.commit('currentDeviceId', { currentDeviceId: 10004090 });
    },
    handleClickWeather8() {
      this.$router.push('weather8');
      this.$store.commit('currentDeviceId', { currentDeviceId: 10004091 });
    },
    handleClickWeather9() {
      this.$router.push('weather9');
      this.$store.commit('currentDeviceId', { currentDeviceId: 10004094 });
    },
    handleClickWeather10() {
      this.$router.push('weather10');
      this.$store.commit('currentDeviceId', { currentDeviceId: 10004135 });
    },
    handleClickWeather11() {
      this.$router.push('weather11');
      this.$store.commit('currentDeviceId', { currentDeviceId: 10004503 });
    },
    handleClickWeather12() {
      this.$router.push('weather12');
      this.$store.commit('currentDeviceId', { currentDeviceId: 10004089 });
    },
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

.el-menu >>> .el-menu--inline {
  background: transparent;
}
.el-menu-item:hover {
  background-color: #278cff;
  color: #fff;
}
.el-menu-item:focus {
  background-color: #278cff;
  color: #fff;
}
.el-menu >>> .el-submenu__title:hover {
  background-color: #278cff;
  color: #fff;
}

.title {
  letter-spacing: 5px;
}
.title1 {
  font-size: 6px;
}
</style>
