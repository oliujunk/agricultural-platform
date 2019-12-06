<template>
  <div class="device-list">
    <el-scrollbar style="width: 100%; height: 100%;">
    <el-table
      :data.sync="deviceList"
      size="medium"
      :show-header="false"
      @cell-click="handleCellClick"
      :cell-style="cellStyle"
      style="cursor: pointer;"
    >
      <el-table-column prop="facName" width="140" show-overflow-tooltip align="center"></el-table-column>
    </el-table>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'deviceList',

  data() {
    return {
      deviceList: [],
      selectRow: null,
      selectColumn: null,
    };
  },

  methods: {
    handleCellClick(row, column) {
      this.selectRow = row;
      this.selectColumn = column;
      if (row.facId === this.$store.state.currentDeviceId) {
        this.$store.commit('dataRefresh', { dataRefresh: true });
      }
      this.$store.commit('currentDeviceId', { currentDeviceId: row.facId });
      this.first = false;
    },

    cellStyle({ row, column }) {
      const currentStyle = {
        'background-color': '#2db7f5',
        color: '#fff',
      };
      if (row === this.selectRow && column === this.selectColumn) {
        return currentStyle;
      }
      if (this.currentDeviceId === row.facId) {
        return currentStyle;
      }
      return null;
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
  },

  computed: {
    currentDeviceId() {
      return this.$store.state.currentDeviceId;
    },
  },

};
</script>

<style scoped>
.device-list {
  width: 142px;
  min-width: 142px;
  overflow-y: auto;
}
</style>
