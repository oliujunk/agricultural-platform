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
          <el-button
            type="primary"
            icon="el-icon-download"
            @click="exportDataEvent"
            size="mini"
          >{{$t('search.select.export')}}
          </el-button>
        </div>
        <div>
          <vxe-table
            :data.sync="historys"
            size="mini"
            align="center"
            ref="historyTable"
            height="660"
            :loading="tableLoading"
          >
            <vxe-table-column
              fixed
              field="dataTime"
              width="150"
              :title="$t('date')"
            ></vxe-table-column>
            <vxe-table-column
              v-for="(item, index) in element"
              :key="index"
              :field="item.ch"
              :title="`${item.name}\n(${item.unit})`"
            ></vxe-table-column>
          </vxe-table>
        </div>
        <div class="pagination">
          <el-pagination
            background
            layout="sizes, total, prev, pager, next, jumper"
            :total="total"
            :page-size="pageSize"
            :page-sizes="[100, 200, 500, 1000]"
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
const bigdecimal = require('bigdecimal');

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

function prefixInteger(num) {
  return `00${num}`.substr(-2);
}

export default {
  name: 'search',
  data() {
    return {
      element: [],
      searchReady: false,
      searchMode: 'default',
      historys: [],
      pageSize: 100,
      interval: 5,
      dateRange: [],
      tableLoading: false,
      total: 0,
      currentPage: 1,
      deviceIdList: [16065434, 16065430, 16065431, 16065432, 16065433],
      currentDeviceId: 16065434,
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
            interval: this.interval,
          },
          headers: {
            token: sessionStorage.getItem('token'),
          },
        })
        .then((response) => {
          const { element } = this;
          if (response.status === 200) {
            this.historys = response.data.reverse();
            if (deviceId === 16065434) {
              const backupData = new Array(4);
              backupData[0] = new bigdecimal.BigDecimal('0');
              backupData[1] = new bigdecimal.BigDecimal('0');
              backupData[2] = new bigdecimal.BigDecimal('0');
              backupData[3] = new bigdecimal.BigDecimal('0');
              this.historys.forEach((item) => {
                item.e1 = new bigdecimal.BigDecimal((parseFloat(`${item.e9}.${prefixInteger(item.e10)}`) * 9.9 - 1700).toString());
                item.e2 = new bigdecimal.BigDecimal((parseFloat(`${item.e11}.${prefixInteger(item.e12)}`) * 9.9 - 2600).toString());
                item.e3 = new bigdecimal.BigDecimal((parseFloat(`${item.e13}.${prefixInteger(item.e14)}`) * 9.9 - 1800).toString());
                item.e4 = new bigdecimal.BigDecimal((parseFloat(`${item.e15}.${prefixInteger(item.e16)}`) * 9.9 - 330).toString());
                item.e5 = item.e1.subtract(backupData[0]).setScale(3, 5).toString();
                item.e6 = item.e2.subtract(backupData[1]).setScale(3, 5).toString();
                item.e7 = item.e3.subtract(backupData[2]).setScale(3, 5).toString();
                item.e8 = item.e4.subtract(backupData[3]).setScale(3, 5).toString();
                backupData[0] = item.e1;
                backupData[1] = item.e2;
                backupData[2] = item.e3;
                backupData[3] = item.e4;
                item.e1 = item.e1.setScale(2, 5).toString();
                item.e2 = item.e2.setScale(2, 5).toString();
                item.e3 = item.e3.setScale(2, 5).toString();
                item.e4 = item.e4.setScale(2, 5).toString();
              });
              this.historys[0].e5 = '0.000';
              this.historys[0].e6 = '0.000';
              this.historys[0].e7 = '0.000';
              this.historys[0].e8 = '0.000';
              this.historys.reverse();
            } else {
              this.historys.forEach((item) => {
                for (let i = 0, len = element.length; i < len; i += 1) {
                  item[[element[i].ch]] = accMul(item[element[i].ch], parseFloat(element[i].prec));
                }
              });
            }
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
            if (deviceId === 16065434) {
              this.historys.forEach((item) => {
                item.e1 = new bigdecimal.BigDecimal((parseFloat(`${item.e9}.${item.e10}`) * 9.9 - 1700).toString()).setScale(2, 5).toString();
                item.e2 = new bigdecimal.BigDecimal((parseFloat(`${item.e11}.${item.e12}`) * 9.9 - 2600).toString()).setScale(2, 5).toString();
                item.e3 = new bigdecimal.BigDecimal((parseFloat(`${item.e13}.${item.e14}`) * 9.9 - 1800).toString()).setScale(2, 5).toString();
                item.e4 = new bigdecimal.BigDecimal((parseFloat(`${item.e15}.${item.e16}`) * 9.9 - 330).toString()).setScale(2, 5).toString();
              });
            } else {
              this.historys.forEach((item) => {
                for (let i = 0, len = element.length; i < len; i += 1) {
                  item[[element[i].ch]] = accMul(item[element[i].ch], parseFloat(element[i].prec));
                }
              });
            }
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
            if (deviceId === 16065434) {
              for (let i = 0; i < 4; i += 1) {
                const detail = {};
                detail.name = `蒸发桶${i + 1}`;
                detail.ch = `e${i + 1}`;
                detail.unit = 'Kg';
                element.push(detail);

                const detail1 = {};
                detail1.name = `变化量${i + 1}`;
                detail1.ch = `e${i + 5}`;
                detail1.unit = 'Kg';
                element.push(detail1);
              }
            } else {
              for (let i = 0; i < 16; i += 1) {
                if (eleNum[i] === '100') continue;
                if (i >= 5 && i <= 8) continue;
                const detail = this.getDetail(eleNum[i]);
                if (eleName[i] !== '-') {
                  detail.name = eleName[i];
                }
                detail.ch = `e${i + 1}`;
                element.push(detail);
              }
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

    exportDataEvent() {
      this.$refs.historyTable.exportData({
        filename: `${this.currentDeviceId}_${moment().format('YYYY-MM-DD HH:mm:ss')}`,
        sheetName: 'Sheet1',
        type: 'xlsx',
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

.vxe-table {
  background-color: transparent;
}

.vxe-table >>> th {
  background-color: rgba(0, 0, 0, 0.2)!important;
  color: white;
}
.vxe-table >>> tr {
  border: 0;
  color: white;
  background-color: rgba(0, 0, 0, 0.3)!important;
}
.vxe-table >>> tr:hover td {
  background-color: transparent;
}
.vxe-table >>> tr:nth-child(2n+1) {
  background-color: rgba(0, 0, 0, 0.1)!important;
}

.vxe-table >>> .vxe-table--body-wrapper {
  background-color: transparent;
}

.vxe-table >>> td {
  border: 0;
}
.vxe-table >>>.vxe-table__fixed::before {
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
