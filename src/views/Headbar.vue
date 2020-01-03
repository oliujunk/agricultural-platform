<template>
  <div class="headbar">
    <span class="title">新普惠智慧农业管理平台</span>
    <div class="menu">
      <el-button type="text" @click="$router.push('/')" style="margin-right: 30px; color: white;">{{$t('homePage.title')}}</el-button>
      <div class="user-dropdown">
        <i class="el-icon-user-solid"></i>
        <el-dropdown style="margin-left: 10px;">
          <span style="color: white;">{{user}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-button type="text" @click="logout">{{$t('headbar.logout')}}</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'headbar',
  data() {
    return {
      user: sessionStorage.getItem('username'),
      language: 'zh_CN',
      languageList: [
        { type: 'zh_CN', name: '中文' },
        { type: 'en_US', name: 'English' },
      ],
      fullScreen: false,
    };
  },

  methods: {
    logout() {
      sessionStorage.clear();
      localStorage.clear();
      this.$store.commit('reset');
      this.$router.push('/login');
    },

    handleLanguageChange(command) {
      this.$i18n.locale = command;
      document.title = this.$t('title');
      this.$store.commit('language', { language: command });
      localStorage.setItem('language', command);

      this.$http
        .get(`/element?lang=${this.$i18n.locale}`, {
          headers: {
            token: sessionStorage.getItem('token'),
          },
        })
        .then((response) => {
          if (response.status === 200) {
            const { data } = response;
            this.$store.commit('elementInfo', { elementInfo: data });
          }
        })
        .catch((error) => {
          console.log(error);
        });

      this.$http
        .get(`/relay?lang=${this.$i18n.locale}`, {
          headers: {
            token: sessionStorage.getItem('token'),
          },
        })
        .then((response) => {
          const { data } = response;
          this.$store.commit('relayInfo', { relayInfo: data });
        })
        .catch(error => console.log(error));
    },

    handleToggleFullScreen() {
      const el = document.documentElement;
      if (this.fullScreen) { // 退出全屏
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (!document.msRequestFullscreen) {
          document.msExitFullscreen();
        }
      } else { // 进入全屏
        if (el.requestFullscreen) {
          el.requestFullscreen();
        } else if (el.mozRequestFullScreen) {
          el.mozRequestFullScreen();
        } else if (el.webkitRequestFullscreen) {
          el.webkitRequestFullscreen();
        } else if (el.msRequestFullscreen) {
          el.msRequestFullscreen();
        }
      }
      this.fullScreen = !this.fullScreen;
    },
  },

  mounted() {
    document.onkeyup = (e) => {
      if (e.key === 'F11') {
        this.fullScreen = true;
      }
    };
    document.onfullscreenchange = () => {
    };
  },
};
</script>

<style scoped>
.headbar {
  margin-left: -1px;
  width: 100%;
  line-height: 70px;
  height: 70px;
  border-color: rgba(180, 190, 190, 0.8);
  border-left-width: 1px;
  border-left-style: solid;
  background-color: rgba(0, 0, 0, 0.8);
  text-align: left;
  display: flex;
  justify-content: space-between;
}

.menu-bar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.collapse-button {
  float: left;
  margin-left: 16px;
}

.backstage-link {
  margin-right: 32px;
}

.fullscreen-button {
  margin-right: 32px;
}

.user-dropdown {
  margin-right: 32px;
  cursor: pointer;
}

.language-select {
  margin-right: 32px;
  cursor: pointer;
}

.title {
  color: white;
  margin-left: 40px;
  font-size: 1.5em;
}

.menu {
  display: flex;
}

.user-dropdown {
  margin-right: 32px;
  color: white;
}
</style>
