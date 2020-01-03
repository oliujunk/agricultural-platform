<template>
  <div class="search">
    <el-scrollbar style="width: 100%; height: 100%;">
      <div class="search-container">
        <div class="search-select">
          <el-select v-model="currentDeviceId" size="mini">
            <el-option
              v-for="(item, index) in deviceList"
              :key="index"
              :label="item.facName"
              :value="item.facId"
            ></el-option>
          </el-select>
          <el-date-picker
            v-model="dateRange"
            type="datetimerange"
            :range-separator="$t('search.select.rangeSeparator')"
            :start-placeholder="$t('search.select.startPlaceholder')"
            :end-placeholder="$t('search.select.endPlaceholder')"
            class="date-range"
            value-format="yyyy-MM-dd HH:mm:ss"
            @change="handleDateChange"
            size="mini"
          ></el-date-picker>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleSearchHistoryDataByDate"
            :disabled="!searchReady"
            size="mini"
          >{{$t('search.select.search')}}
          </el-button>
          <el-tooltip :content="$t('search.exportTooltip')">
            <el-button
              type="primary"
              icon="el-icon-download"
              @click="handleExport(element)"
              size="mini"
            >{{$t('search.select.export')}}
            </el-button>
          </el-tooltip>
        </div>
        <div class="search-table">
          <el-table
            :data.sync="historys"
            size="mini"
          >
            <el-table-column
              fixed
              prop="dataTime"
              width="150"
              :label="$t('date')"
              align="center"
            ></el-table-column>
            <el-table-column
              v-for="(item, index) in element"
              :key="index"
              :prop="item.ch"
              :label="`${item.name}\n(${item.unit})`"
              min-width="90"
              show-overflow-tooltip
              align="center"
            ></el-table-column>
          </el-table>
          <el-pagination
            background
            layout="total, prev, pager, next, jumper"
            :total="total"
            :page-size="pageSize"
            :current-page.sync="currentPage"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
const accMul = (arg1, arg2) => {
  let m = 0;
  if ((arg1 || arg1 === 0) && (arg2 || arg2 === 0)) {
    const s1 = arg1.toString();
    const s2 = arg2.toString();
    try {
      if (s1.split('.').length > 1) {
        m += s1.split('.')[1].length;
      }
    } catch (e) {
      console.log(e);
    }
    try {
      if (s2.split('.').length > 1) {
        m += s2.split('.')[1].length;
      }
    } catch (e) {
      console.log(e);
    }
    return (
      (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / (10 ** m)
    );
  }
  return null;
};

export default {
  name: 'search',
  data() {
    return {
      element: [],
      searchReady: false,
      searchMode: 'default',
      historys: [],
      pageSize: 17,
      interval: 1,
      dateRange: [],
      tableLoading: false,
      total: 0,
      currentPage: 1,
      deviceIdList: [16065208, 19112991, 19112992, 19112993, 19112994, 19112995, 19112996],
      currentDeviceId: 16065208,
      deviceList: [],
    };
  },

  methods: {
    getDeviceList() {
      this.$http
        .get(`/user/${sessionStorage.getItem('username')}`, {
          headers: {
            token: sessionStorage.getItem('token'),
          },
        })
        .then((response) => {
          if (response.data) {
            const { devices } = response.data;
            this.deviceList = this.deviceIdList.map(deviceId => devices.filter(item => item.facId === deviceId).pop());
            this.currentDeviceId = this.deviceList[0].facId;
          }
        })
        .catch();
    },

    getHistoryData(deviceId, pageNum, pageSize) {
      this.historys = [];
      this.tableLoading = true;
      this.$http
        .get(`/datas/${deviceId}`, {
          params: {
            pageNum,
            pageSize,
          },
          headers: {
            token: sessionStorage.getItem('token'),
          },
        })
        .then((response) => {
          const { element } = this;
          if (response.status === 200) {
            this.historys = response.data;
            this.historys.forEach((item) => {
              for (let i = 0, len = element.length; i < len; i += 1) {
                item[[element[i].ch]] = accMul(item[element[i].ch], parseFloat(element[i].prec));
              }
            });
          }
          this.tableLoading = false;
        })
        .catch((error) => {
          console.log(error);
          this.tableLoading = false;
        });
    },

    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.historys = [];
      if (this.searchMode === 'default') {
        this.getHistoryData(this.currentDeviceId, 1, this.pageSize);
      } else {
        this.getHistoryDataByDate(this.currentDeviceId, 1, this.pageSize, this.dateRange[0], this.dateRange[1]);
      }
    },

    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      if (this.searchMode === 'default') {
        this.getHistoryData(this.currentDeviceId, currentPage, this.pageSize);
      } else {
        this.getHistoryDataByDate(this.currentDeviceId, currentPage, this.pageSize, this.dateRange[0], this.dateRange[1]);
      }
    },

    handleDateChange() {
      if (this.dateRange && this.dateRange.length !== 0) {
        this.searchReady = true;
      } else {
        this.searchReady = false;
      }
    },

    handleSearchHistoryDataByDate() {
      this.searchMode = 'date';
      this.getHistoryDataCount(this.currentDeviceId, this.dateRange[0], this.dateRange[1], this.interval);
      this.getHistoryDataByDate(this.currentDeviceId, 1, this.pageSize, this.dateRange[0], this.dateRange[1], this.interval);
    },

    getHistoryDataByDate(deviceId, pageNum, pageSize, startTime, endTime, interval) {
      this.historys = [];
      this.tableLoading = true;
      this.$http
        .get(`/datas/${deviceId}`, {
          params: {
            pageNum,
            pageSize,
            startTime,
            endTime,
            interval,
          },
          headers: {
            token: sessionStorage.getItem('token'),
          },
        })
        .then((response) => {
          const { element } = this;
          if (response.status === 200) {
            this.historys = response.data;
            this.historys.forEach((item) => {
              for (let i = 0, len = element.length; i < len; i += 1) {
                item[[element[i].ch]] = accMul(item[element[i].ch], parseFloat(element[i].prec));
              }
            });
          }
          this.tableLoading = false;
        })
        .catch((error) => {
          console.log(error);
          this.tableLoading = false;
        });
    },

    getDeviceInfo(deviceId) {
      this.$http
        .get(`/device/${deviceId}`, {
          headers: {
            token: sessionStorage.getItem('token'),
          },
        })
        .then((response) => {
          if (response.status === 200) {
            this.name = response.data.facName;
            const eleNum = response.data.eleNum.split('/');
            const eleName = response.data.eleName.split('/');
            const element = [];
            for (let i = 0; i < 16; i += 1) {
              if (eleNum[i] === '100') continue;
              const detail = this.getDetail(eleNum[i]);
              if (eleName[i] !== '-') {
                detail.name = eleName[i];
              }
              detail.ch = `e${i + 1}`;
              element.push(detail);
            }
            this.element = element;
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 403) {
              sessionStorage.removeItem('username');
              sessionStorage.removeItem('token');
            }
          }
        });
    },

    getDetail(elementNum) {
      const element = this.elementInfo;
      const detail = element.find(item => item.index === elementNum);
      return JSON.parse(JSON.stringify(detail));
    },

    handleExport(element) {
      this.$http
        .post(`/datas/${this.currentDeviceId}/export`, {
          element,
          startTime: this.dateRange[0],
          endTime: this.dateRange[1],
          interval: this.interval,
        }, {
          responseType: 'blob',
          headers: {
            token: sessionStorage.getItem('token'),
          },
        })
        .then((response) => {
          const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
          const filename = `${this.currentDeviceId}_${moment(new Date()).format('YYYY_MM_DD_HH_mm_ss')}.xlsx`;
          if (navigator.msSaveBlob) {
            navigator.msSaveBlob(blob, filename);
          } else {
            const elink = document.createElement('a');
            elink.download = filename;
            elink.style.display = 'none';
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href);
            document.body.removeChild(elink);
          }
        })
        .catch();
    },

    getHistoryDataCount(deviceId, startTime, endTime, interval) {
      this.$http
        .get(`/datas/${deviceId}/count`, {
          params: {
            startTime,
            endTime,
            interval,
          },
          headers: {
            token: sessionStorage.getItem('token'),
          },
        })
        .then((response) => {
          if (response.status === 200) {
            this.total = response.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  mounted() {
    this.getDeviceList();
    if (this.currentDeviceId) {
      this.getDeviceInfo(this.currentDeviceId);
      this.getHistoryDataCount(this.currentDeviceId);
      this.getHistoryData(this.currentDeviceId, 1, this.pageSize);
    }
  },

  computed: {
    elementInfo() {
      return this.$store.state.elementInfo;
    },
  },

  watch: {
    currentDeviceId() {
      this.historys = [];
      this.searchMode = 'default';
      this.interval = 1;
      this.dateRange = [];
      if (this.currentDeviceId) {
        this.getDeviceInfo(this.currentDeviceId);
        this.getHistoryDataCount(this.currentDeviceId);
        this.getHistoryData(this.currentDeviceId, 1, this.pageSize);
      }
    },
  },
};
</script>

<style scoped>
.search {
  display: flex;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.search-container {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  width: 99%;
}

.search-select {
  display: flex;
  justify-content: flex-end;
  min-height: 40px;
  margin-right: 16px;
  margin-top: 10px;
}
.search-select .date-range {
  margin-left: 10px;
  margin-right: 10px;
}
.search-select .el-button {
  height: 27px;
}

.el-pagination {
  text-align: right;
  margin: 10px;
}

.el-table {
  background-color: transparent;
}
.el-table::before {
  height: 0;
}
.el-table >>> th {
  background-color: rgba(0, 0, 0, 0.2)!important;
  color: white;
}
.el-table >>> tr {
  border: 0;
  color: white;
  background-color: rgba(0, 0, 0, 0.3)!important;
}
.el-table >>> tr:hover td {
  background-color: transparent;
}
.el-table >>> tr:nth-child(2n+1) {
  background-color: rgba(0, 0, 0, 0.1)!important;
}

.el-table >>> td {
  border: 0;
}
.el-table >>>.el-table__fixed::before {
  height: 0;
}

.el-pagination {
  background: transparent;
}
.el-pagination >>> .el-pagination__total {
  color: white;
}
.el-pagination >>> .btn-prev {
  color: white!important;
  background: transparent;
  border: 2px solid white;
}
.el-pagination >>> .el-pager .number {
  color: white!important;
  background: transparent;
  border: 2px solid white;
}
.el-pagination >>> .btn-next {
  color: white!important;
  background: transparent;
  border: 2px solid white;
}
.el-pagination >>> .el-pagination__jump {
  color: white!important;
  background: transparent;
}

</style>
