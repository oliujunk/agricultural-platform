<template>
  <div class="chart-container">
    <div class="chart-select">
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
        :range-separator="$t('chart.select.rangeSeparator')"
        :start-placeholder="$t('chart.select.startPlaceholder')"
        :end-placeholder="$t('chart.select.endPlaceholder')"
        class="date-range"
        value-format="yyyy-MM-dd HH:mm:ss"
        @change="handleDateChange"
        size="mini"
      ></el-date-picker>
      <el-button
        type="primary"
        icon="el-icon-more"
        @click="handleAnalysis"
        :disabled="!searchReady"
        size="mini"
      >{{$t('chart.select.analysis')}}
      </el-button>
    </div>
    <div
      id="chart"
      class="chart-item"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    ></div>
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
      if (s1.split('.').length > 1) { m += s1.split('.')[1].length; }
    } catch (e) { console.log(e); }
    try {
      if (s2.split('.').length > 1) { m += s2.split('.')[1].length; }
    } catch (e) { console.log(e); }
    return (
      (Number(s1.replace('.', '')) * Number(s2.replace('.', '')))
      / (10 ** m)
    );
  }
  return null;
};

export default {
  name: 'analysis',

  data() {
    return {
      loading: false,
      searchReady: false,
      historys: [],
      dateRange: [],
      element: [],
      lineChart: null,
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

    handleAnalysis() {
      this.$http
        .get(`/datas/${this.currentDeviceId}`, {
          params: {
            pageNum: 1,
            pageSize: 10000,
            startTime: this.dateRange[0],
            endTime: this.dateRange[1],
            sort: 'ASC',
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
            this.chartDraw(this.historys);
          }
        })
        .catch(error => console.log(error));
    },

    getHistoryData(deviceId, pageNum, pageSize) {
      this.loading = true;
      this.historys.list = [];
      this.$http
        .get(`/datas/${deviceId}`, {
          params: {
            pageNum,
            pageSize,
            sort: 'DESC',
          },
          headers: {
            token: sessionStorage.getItem('token'),
          },
        })
        .then((response) => {
          const { element } = this;
          if (response.status === 200) {
            this.historys = response.data;
            this.historys.reverse();
            if (deviceId === 16065434) {
              this.historys.forEach((item) => {
                item.e1 = new bigdecimal.BigDecimal(`${item.e9}.${item.e10}`).toString();
                item.e2 = new bigdecimal.BigDecimal(`${item.e11}.${item.e12}`).toString();
                item.e3 = new bigdecimal.BigDecimal(`${item.e13}.${item.e14}`).toString();
                item.e4 = new bigdecimal.BigDecimal(`${item.e15}.${item.e16}`).toString();
              });
            } else {
              this.historys.forEach((item) => {
                for (let i = 0, len = element.length; i < len; i += 1) {
                  item[[element[i].ch]] = accMul(item[element[i].ch], parseFloat(element[i].prec));
                }
              });
            }
            this.chartDraw(this.historys);
            this.loading = false;
          }
        })
        .catch();
    },

    handleDateChange() {
      if (this.dateRange && this.dateRange.length !== 0) {
        this.searchReady = true;
      } else {
        this.searchReady = false;
      }
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
              }
            } else {
              for (let i = 0; i < 16; i += 1) {
                if (eleNum[i] === '100') continue;
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
          console.log(error);
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

    chartDraw(dataset) {
      const data = JSON.parse(JSON.stringify(dataset));
      const dimensions = [this.$t('date')];
      const series = [];
      const element = JSON.parse(JSON.stringify(this.element));
      for (let i = 0, len = element.length; i < len; i += 1) {
        dimensions.push(`${element[i].name}(${element[i].unit})`);
        series.push({ type: 'line', smooth: true, symbol: 'none' });
      }
      const options = {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        textStyle: {
          color: 'white',
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          formatter: name => name.substring(0, name.indexOf('(')),
          textStyle: {
            color: 'white',
          },
        },
        grid: {
          left: 100,
          top: 50,
          right: 100,
          bottom: 70,
        },
        xAxis: {
          data: data.map(item => item.dataTime),
          axisLine: {
            lineStyle: {
              color: 'white',
            },
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#315070'],
              width: 1,
              type: 'dotted',
            },
          },
          axisLine: {
            lineStyle: {
              color: 'white',
            },
          },
          axisTick: {
            show: false,
          },
        },
        toolbox: {
          left: 'right',
          top: 20,
          feature: {
            dataZoom: {
              yAxisIndex: 'none',
            },
            restore: {},
            saveAsImage: {},
          },
        },
        dataZoom: [
          {
            type: 'slider',
            show: true,
            xAxisIndex: [0],
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            fillerColor: 'rgba(255, 255, 255, 0.5)',
            dataBackground: {
              lineStyle: { color: 'white' },
              areaStyle: { color: 'white' },
            },
            textStyle: {
              color: 'white',
            },
            left: 130,
            right: 130,
          },
        ],
        dataset: {
          dimensions,
          source: data.map((item) => {
            const ret = [item.dataTime];
            for (let i = 0, len = element.length; i < len; i += 1) {
              ret.push(item[element[i].ch]);
            }
            return ret;
          }),
        },
        series,
      };

      this.lineChart.setOption(options);
    },

  },

  mounted() {
    this.getDeviceList();
    this.lineChart = echarts.init(document.getElementById('chart'), 'light');

    if (this.currentDeviceId) {
      this.getDeviceInfo(this.currentDeviceId);
      this.getHistoryData(this.currentDeviceId, 1, 1000);
    }

    window.onresize = () => {
      this.lineChart.resize();
    };
  },

  computed: {
    elementInfo() {
      return this.$store.state.elementInfo;
    },
  },
  watch: {
    currentDeviceId() {
      this.lineChart.clear();
      this.historys = {};
      this.dateRange = [];
      this.getDeviceInfo(this.currentDeviceId);
      this.getHistoryData(this.currentDeviceId, 1, 1000);
    },
  },
};
</script>

<style scoped>
.chart-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-left: 20px;
  margin-right: 20px;
}

.chart-select {
  display: flex;
  justify-content: flex-end;
  min-height: 40px;
  margin-right: 16px;
  margin-top: 10px;
}
.chart-select .date-range {
  margin-left: 10px;
  margin-right: 10px;
}

.chart-select .el-button {
  height: 27px;
}

.chart-item {
  width: 100%;
  height: 90%;
  text-align: left;
}

</style>
