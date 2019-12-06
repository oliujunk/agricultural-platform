<template>
  <div class="chart">
    <DeviceList></DeviceList>
    <div class="chart-container">
      <div class="chart-select">
        <el-date-picker
          v-model="dateRange"
          type="datetimerange"
          :range-separator="$t('chart.select.rangeSeparator')"
          :start-placeholder="$t('chart.select.startPlaceholder')"
          :end-placeholder="$t('chart.select.endPlaceholder')"
          class="date-range"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="handleDateChange"
        ></el-date-picker>
        <el-button
          type="primary"
          icon="el-icon-third-fenxi"
          @click="handleAnalysis"
          :disabled="!searchReady"
        >{{$t('chart.select.analysis')}}
        </el-button>
      </div>
      <div id="chart" class="chart-item"></div>
    </div>
  </div>
</template>

<script>
import DeviceList from './DeviceList.vue';

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
  name: 'chart',

  components: {
    DeviceList,
  },

  data() {
    return {
      loading: false,
      searchReady: false,
      historys: [],
      dateRange: [],
      element: [],
      lineChart: null,
    };
  },

  methods: {
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
            this.historys.forEach((item) => {
              for (let i = 0, len = element.length; i < len; i += 1) {
                item[[element[i].ch]] = accMul(item[element[i].ch], parseFloat(element[i].prec));
              }
            });
            this.chartDraw(this.historys);
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
        backgroundColor: '#F2F6FC',
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          formatter: name => name.substring(0, name.indexOf('(')),
        },
        xAxis: {
          data: data.map(item => item.dataTime),
        },
        yAxis: {
          splitLine: {
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
          },
          {
            type: 'inside',
            xAxisIndex: [0],
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
    currentDeviceId() {
      return this.$store.state.currentDeviceId;
    },
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

<style lang="scss" scoped>
.chart {
  height: 100%;
  width: 100%;
  display: flex;
  overflow-y: auto;
  right: 0;
}

.chart-container {
  display: flex;
  flex-direction: column;
  width: 90%;
}

.chart-select {
  display: flex;
  justify-content: flex-end;
  margin: 5px;
  float: right;
  min-height: 40px;
  max-width: 1500px;
  margin: 5px;
  .date-range {
    margin-left: 10px;
    margin-right: 10px;
  }
}

.chart-item {
  width: 100%;
  height: 90%;
  text-align: left;
}

.el-button {
  height: 40px;
}

</style>
