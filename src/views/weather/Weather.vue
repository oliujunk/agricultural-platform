<template>
  <div class="weather">
    <div class="header">
      <div style="display: flex;">
        <div :class="{'title': true, 'is-active': currentTab === 'home'}">
          <a @click="handleClickTitle('home')">首页</a>
        </div>
        <div :class="{'title': true, 'is-active': currentTab === 'search'}">
          <a @click="handleClickTitle('search')">数据查询</a>
        </div>
        <div :class="{'title': true, 'is-active': currentTab === 'analysis'}">
          <a @click="handleClickTitle('analysis')">数据分析</a>
        </div>
      </div>
      <div class="search">
        <el-input v-model="searchKeyword" placeholder="请输入搜索关键字" size="small">
          <el-button slot="append" icon="el-icon-search" type="primary"></el-button>
        </el-input>
      </div>
    </div>
    <div class="content">
      <Overview v-if="currentTab === 'home'"></Overview>
      <Search v-else-if="currentTab === 'search'"></Search>
      <Analysis v-else-if="currentTab === 'analysis'"></Analysis>
    </div>
  </div>
</template>

<script>
import Overview from '@/views/weather/Overview.vue';
import Search from '@/views/weather/Search.vue';
import Analysis from '@/views/weather/Analysis.vue';

export default {
  name: 'weather',

  components: {
    Overview,
    Search,
    Analysis,
  },

  data() {
    return {
      currentTab: 'home',
      searchKeyword: '',
    };
  },

  methods: {
    handleClickTitle(name) {
      this.currentTab = name;
    },

    getDeviceList() {
      const username = sessionStorage.getItem('username');
      this.$http
        .get(`/user/${username}`, {
          headers: {
            token: sessionStorage.getItem('token'),
          },
        })
        .then((response) => {
          if (response.status === 200) {
            const { data } = response;
            this.$store.commit('userId', { userId: data.id });
            this.deviceList = JSON.parse(JSON.stringify(data.devices));
            if (!this.$store.state.currentDeviceId) { this.$store.commit('currentDeviceId', { currentDeviceId: data.devices[0].facId }); }
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response) {
            if (error.response.status === 403) {
              sessionStorage.removeItem('username');
              sessionStorage.removeItem('token');
            }
          }
        });
    },

    getElementInfo() {
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
    },

    getRelayInfo() {
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

  },

  mounted() {
    this.getElementInfo();
    this.getRelayInfo();
    this.getDeviceList();
    // this.$store.commit('currentDeviceId', { currentDeviceId: 16062693 });
  },

  computed: {
    currentDeviceId: {
      get() {
        return this.$store.state.currentDeviceId;
      },
      set(newValue) {
        this.$store.commit('currentDeviceId', { currentDeviceId: newValue });
      },
    },
    elementInfo() {
      return this.$store.state.elementInfo;
    },
    relayInfo() {
      return this.$store.state.relayInfo;
    },
    dataRefresh() {
      return this.$store.state.dataRefresh;
    },
  },

  watch: {
    currentDeviceId() {
      this.getElementInfo();
      this.getRelayInfo();
      this.getDeviceList();
    },
  },

  beforeDestroy() {
  },
};
</script>

<style scoped>
.weather {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
  height: 100%;
}

.header {
  background-color: rgba(0, 0, 0, 0.7);
  margin: 15px 20px 20px 20px;
  border-radius: 5px;
  line-height: 60px;
  text-align: left;
  display: flex;
  justify-content: space-between;
  user-select: none;
  min-width: 1000px;
}
.header .title {
  margin-left: 70px;
  letter-spacing: 5px;
  color: white;
}
.header .title:hover {
  cursor: pointer;
  color: #409EFF;
}
.header .is-active a {
  color: #409EFF;
  border-bottom: 3px solid #409EFF;
}
.header a {
  padding: 0px 5px 10px 5px;
}
.header .search {
  margin-right: 80px;
  background-color: rgba(0, 0, 0, 0);
}

.el-input {
  background-color: rgba(0, 0, 0, 0);
  color: white;
}
.el-input >>> input {
  background-color: rgba(0, 0, 0, 0);
  color: white;
  border: 2px solid #409EFF;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}

.el-input >>> .el-input-group__append {
  background-color: #409EFF;
  border: 1px solid #409EFF;
  color: white;
  font-size: 1.5em;
  border-bottom-right-radius: 15px;
  border-top-right-radius: 15px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.content {
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  margin: 0 20px 20px 20px;
  border-radius: 5px;
}
</style>
