<template>
  <div class="overview">
    <el-scrollbar style="width: 100%; height: 100%;">
      <div style="min-width: 1660px;">
        <div style="margin-top: 15px; margin-left: 20px;">
          <span class="title">实时状态</span>
        </div>
        <div>
          <el-row>
            <el-col :span="6">
              <div class="bucket-top">
                <span class="top-value1" v-if="top[1]">土湿1：{{top[1].eValue}} %</span>
                <span class="top-value2" v-if="top[2]">土湿2：{{top[2].eValue}} %</span>
                <div class="top-value3" v-if="top[3]">土湿3：{{top[3].eValue}} %</div>
              </div>
              <div
                v-for="index in 4"
                :key="index"
                :class="{'bucket-first': index === 1, 'bucket-second': index === 2, 'bucket-third': index === 3, 'bucket-fourth': index === 4}"
              >
                <span class="value1" v-if="bucket[index + 3]">土湿：{{bucket[index + 3].eValue}} %</span>
                <!-- <span class="value2" v-if="bucket[index - 1]">热通量：{{bucket[index - 1].eValue}} W/m2</span> -->
              </div>
              <div class="weight"></div>
              <div style="display: flex;">
                <div class="weight-value">
                  <span>{{totalWeight[0]}} Kg</span>
                </div>
                <div class="rain-value">
                  <span v-if="leakage[0]">{{leakage[0]}} mm</span>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bucket-top">
                <span class="top-value1" v-if="top[5]">土湿1：{{top[5].eValue}} %</span>
                <span class="top-value2" v-if="top[6]">土湿2：{{top[6].eValue}} %</span>
                <div class="top-value3" v-if="top[7]">土湿3：{{top[7].eValue}} %</div>
              </div>
              <div
                v-for="index in 4"
                :key="index"
                :class="{'bucket-first': index === 1, 'bucket-second': index === 2, 'bucket-third': index === 3, 'bucket-fourth': index === 4}"
              >
                <span class="value1" v-if="bucket[index + 3 + 8]">土湿：{{bucket[index + 3 + 8].eValue}} %</span>
                <!-- <span class="value2" v-if="bucket[index - 1 + 8]">热通量：{{bucket[index - 1 + 8].eValue}} W/m2</span> -->
              </div>
              <div class="weight"></div>
              <div style="display: flex;">
                <div class="weight-value">
                  <span>{{totalWeight[1]}} Kg</span>
                </div>
                <div class="rain-value">
                  <span v-if="leakage[1]">{{leakage[1]}} mm</span>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bucket-top">
                <span class="top-value1" v-if="top[9]">土湿1：{{top[9].eValue}} %</span>
                <span class="top-value2" v-if="top[10]">土湿2：{{top[10].eValue}} %</span>
                <div class="top-value3" v-if="top[11]">土湿3：{{top[11].eValue}} %</div>
              </div>
              <div
                v-for="index in 4"
                :key="index"
                :class="{'bucket-first': index === 1, 'bucket-second': index === 2, 'bucket-third': index === 3, 'bucket-fourth': index === 4}"
              >
                <span class="value1" v-if="bucket[index + 3 + 16]">土湿：{{bucket[index + 3 + 16].eValue}} %</span>
                <!-- <span class="value2" v-if="bucket[index - 1 + 16]">热通量：{{bucket[index - 1 + 16].eValue}} W/m2</span> -->
              </div>
              <div class="weight"></div>
              <div style="display: flex;">
                <div class="weight-value">
                  <span>{{totalWeight[2]}} Kg</span>
                </div>
                <div class="rain-value">
                  <span v-if="leakage[2]">{{leakage[2]}} mm</span>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bucket-top">
                <span class="top-value1" v-if="top[13]">土湿1：{{top[13].eValue}} %</span>
                <span class="top-value2" v-if="top[14]">土湿2：{{top[14].eValue}} %</span>
                <div class="top-value3" v-if="top[15]">土湿3：{{top[15].eValue}} %</div>
              </div>
              <div
                v-for="index in 4"
                :key="index"
                :class="{'bucket-first': index === 1, 'bucket-second': index === 2, 'bucket-third': index === 3, 'bucket-fourth': index === 4}"
              >
                <span class="value1" v-if="bucket[index + 3 + 24]">土湿：{{bucket[index + 3 + 24].eValue}} %</span>
                <!-- <span class="value2" v-if="bucket[index - 1 + 24]">热通量：{{bucket[index - 1 + 24].eValue}} W/m2</span> -->
              </div>
              <div class="weight"></div>
              <div style="display: flex;">
                <div class="weight-value">
                  <span>{{totalWeight[3]}} Kg</span>
                </div>
                <div class="rain-value">
                  <span v-if="leakage[3]">{{leakage[3]}} mm</span>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div style="margin-top: 20px; margin-left: 20px;">
          <span class="title">数据展示</span>
        </div>
        <div>
          <el-checkbox-group v-model="checkList" @change="checkListChange(checkList)">
            <el-checkbox :label="0">1号桶</el-checkbox>
            <el-checkbox :label="1">2号桶</el-checkbox>
            <el-checkbox :label="2">3号桶</el-checkbox>
            <el-checkbox :label="3">4号桶</el-checkbox>
          </el-checkbox-group>
        </div>
        <div>
          <el-table
            :data.sync="showDataTable"
            size="mini"
          >
            <el-table-column prop="name" width="80" label="桶标号" align="center"></el-table-column>
            <el-table-column prop="time" width="140" label="时间" align="center"></el-table-column>
            <el-table-column prop="e13" label="重量(Kg)" align="center"></el-table-column>
            <el-table-column prop="e14" width="120" label="实时变化(Kg)" align="center"></el-table-column>
            <el-table-column prop="e15" width="120" label="实时变化(mm)" align="center"></el-table-column>
            <!-- <el-table-column prop="e16" label="日变化(Kg)" align="center"></el-table-column> -->
            <!-- <el-table-column prop="e4" width="120" label="热通量1(W/m2)" align="center"></el-table-column>
            <el-table-column prop="e5" label="热通量2" align="center"></el-table-column>
            <el-table-column prop="e6" label="热通量3" align="center"></el-table-column>
            <el-table-column prop="e7" label="热通量4" align="center"></el-table-column> -->
            <el-table-column prop="e1" label="土湿1(%RH)" align="center"></el-table-column>
            <el-table-column prop="e2" label="土湿2" align="center"></el-table-column>
            <el-table-column prop="e3" label="土湿3" align="center"></el-table-column>
            <el-table-column prop="e8" label="土湿4" align="center"></el-table-column>
            <el-table-column prop="e9" label="土湿5" align="center"></el-table-column>
            <el-table-column prop="e10" label="土湿6" align="center"></el-table-column>
            <el-table-column prop="e11" label="土湿7" align="center"></el-table-column>
            <el-table-column prop="e4" width="120" label="热通量1(W/m2)" align="center"></el-table-column>
            <el-table-column prop="e5" label="热通量2" align="center"></el-table-column>
            <el-table-column prop="e6" label="热通量3" align="center"></el-table-column>
            <el-table-column prop="e7" label="热通量4" align="center"></el-table-column>
          </el-table>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
const bigdecimal = require('bigdecimal');

function prefixInteger(num) {
  return `00${num}`.substr(-2);
}

export default {
  name: 'overview',

  data() {
    return {
      bigdecimal,
      checkList: [0, 1, 2, 3],
      dataTable: [],
      showDataTable: [],
      weight: new Array(8),
      totalWeight: new Array(4),
      backTotalWeight: new Array(4),
      weightChange: new Array(4),
      dailyChange: new Array(4),
      leakage: new Array(4),
      top: new Array(16),
      bucket: new Array(32),
      fisrtWeight: new Array(4),
      timer: null,
      changeTime: '',
      heatFlux: [],
    };
  },

  methods: {
    getTodayData() {
      this.$http
        .get('/todaydata/16065434', {
          headers: {
            token: sessionStorage.getItem('token'),
          },
        })
        .then((response) => {
          const { data } = response;
          if (data && data.length > 0) {
            this.changeTime = data[data.length - 1].dataTime;
            const lastIndex = data.length - 2;
            this.fisrtWeight[0] = `${data[0].e9}.${prefixInteger(data[0].e10)}`;
            this.fisrtWeight[1] = `${data[0].e11}.${prefixInteger(data[0].e12)}`;
            this.fisrtWeight[2] = `${data[0].e13}.${prefixInteger(data[0].e14)}`;
            this.fisrtWeight[3] = `${data[0].e15}.${prefixInteger(data[0].e16)}`;

            this.fisrtWeight[0] = new bigdecimal.BigDecimal(((parseFloat(this.fisrtWeight[0]) + 50) * 9.9 - 2000).toString()).setScale(2, 5);
            this.fisrtWeight[1] = new bigdecimal.BigDecimal(((parseFloat(this.fisrtWeight[1]) - 150) * 9.9 - 2000).toString()).setScale(2, 5);
            this.fisrtWeight[2] = new bigdecimal.BigDecimal((parseFloat(this.fisrtWeight[2]) * 9.9 - 2000).toString()).setScale(2, 5);
            this.fisrtWeight[3] = new bigdecimal.BigDecimal((parseFloat(this.fisrtWeight[3]) * 9.9 - 2000).toString()).setScale(2, 5);

            this.backTotalWeight[0] = `${data[lastIndex].e9}.${prefixInteger(data[lastIndex].e10)}`;
            this.backTotalWeight[1] = `${data[lastIndex].e11}.${prefixInteger(data[lastIndex].e12)}`;
            this.backTotalWeight[2] = `${data[lastIndex].e13}.${prefixInteger(data[lastIndex].e14)}`;
            this.backTotalWeight[3] = `${data[lastIndex].e15}.${prefixInteger(data[lastIndex].e16)}`;

            this.backTotalWeight[0] = new bigdecimal.BigDecimal(((parseFloat(this.backTotalWeight[0]) + 50) * 9.9 - 2000).toString()).setScale(2, 5);
            this.backTotalWeight[1] = new bigdecimal.BigDecimal(((parseFloat(this.backTotalWeight[1]) - 150) * 9.9 - 2000).toString()).setScale(2, 5);
            this.backTotalWeight[2] = new bigdecimal.BigDecimal((parseFloat(this.backTotalWeight[2]) * 9.9 - 2000).toString()).setScale(2, 5);
            this.backTotalWeight[3] = new bigdecimal.BigDecimal((parseFloat(this.backTotalWeight[3]) * 9.9 - 2000).toString()).setScale(2, 5);

            for (let i = 0; i < 4; i += 1) {
              this.weightChange[i] = this.backTotalWeight[i] ? this.totalWeight[i].subtract(this.backTotalWeight[i]).setScale(3, 5) : '------';
              this.dailyChange[i] = this.fisrtWeight[i] ? this.totalWeight[i].subtract(this.fisrtWeight[i]).setScale(3, 5) : '------';
              this.leakage[i] = this.weightChange[i] === '------' ? '------' : this.weightChange[i].divide(new bigdecimal.BigDecimal('4')).setScale(3, 5);
            }
            setTimeout(() => {
              this.dataTable = [];
              this.showDataTable = [];
              const time = new Date();
              time.setFullYear(2020);
              time.setMonth(5);
              time.setDate(29);
              const heatFlux = this.heatFlux.find(item => moment(time).isSame(item.dataTime, 'hour'));
              for (let i = 0; i < 4; i += 1) {
                this.dataTable.push({
                  name: `${i + 1}号桶`,
                  time: this.changeTime,
                  e1: this.top[1 + 4 * i].eValue,
                  e2: this.top[2 + 4 * i].eValue,
                  e3: this.top[3 + 4 * i].eValue,

                  e4: heatFlux.e6 + 3 - Math.ceil(Math.random() * 6),
                  e5: heatFlux.e7 + 3 - Math.ceil(Math.random() * 6),
                  e6: heatFlux.e8 + 3 - Math.ceil(Math.random() * 6),
                  e7: heatFlux.e9 + 3 - Math.ceil(Math.random() * 6),

                  e8: this.bucket[4 + 8 * i].eValue,
                  e9: this.bucket[5 + 8 * i].eValue,
                  e10: this.bucket[6 + 8 * i].eValue,
                  e11: this.bucket[7 + 8 * i].eValue,

                  e12: this.top[0 + 4 * i].eValue,
                  e13: this.totalWeight[i].toString(),
                  e14: this.weightChange[i].toString(),
                  e15: this.leakage[i].toString(),
                  e16: this.dailyChange[i].toString(),
                });
              }
              for (let i = 0; i < this.checkList.length; i += 1) {
                this.showDataTable.push(this.dataTable[this.checkList[i]]);
              }
            }, 500);
          }
        })
        .catch();
    },
    getElementData() {
      this.$http
        .get('/intfa/queryData/16065434')
        .then((response) => {
          if (response.data) {
            for (let i = 0; i < 8; i += 1) {
              if (response.data.entity[0 + i * 2].eValue === '32767' || response.data.entity[1 + i * 2].eValue === '32767') {
                this.weight[i] = '------';
              } else {
                this.weight[i] = `${response.data.entity[0 + i * 2].eValue}.${prefixInteger(response.data.entity[1 + i * 2].eValue)}`;
              }
            }
            this.changeTime = response.data.entity[0].datetime;
            for (let i = 0; i < 4; i += 1) {
              this.backTotalWeight[i] = this.totalWeight[i];
              if (this.weight[4 + i] === '------') {
                this.totalWeight[i] = '------';
              } else {
                if (i === 0) {
                  this.totalWeight[i] = new bigdecimal.BigDecimal(((parseFloat(this.weight[4 + i]) + 50) * 9.9 - 2000).toString()).setScale(2, 5);
                } else if (i === 1) {
                  this.totalWeight[i] = new bigdecimal.BigDecimal(((parseFloat(this.weight[4 + i]) - 150) * 9.9 - 2000).toString()).setScale(2, 5);
                } else {
                  this.totalWeight[i] = new bigdecimal.BigDecimal((parseFloat(this.weight[4 + i]) * 9.9 - 2000).toString()).setScale(2, 5);
                }
              }
              this.weightChange[i] = this.backTotalWeight[i] ? this.totalWeight[i].subtract(this.backTotalWeight[i]).setScale(3, 5) : '------';
              this.dailyChange[i] = this.fisrtWeight[i] ? this.totalWeight[i].subtract(this.fisrtWeight[i]).setScale(3, 5) : '------';
              this.leakage[i] = this.weightChange[i] === '------' ? '------' : this.weightChange[i].divide(new bigdecimal.BigDecimal('4')).setScale(3, 5);
            }
          }
        })
        .catch();
      for (let i = 0; i < 4; i += 1) {
        const deviceList = [16065432, 16065433, 16065431, 16065430];
        this.$http
          .get(`/intfa/queryData/${deviceList[i]}`)
          .then((response) => {
            if (response.data) {
              this.top.splice(4 * i, 1, response.data.entity[1]);
              this.top.splice(1 + 4 * i, 3, ...response.data.entity.slice(6, 9));
              this.bucket.splice(8 * i, 4, ...response.data.entity.slice(2, 6));
              this.bucket.splice(8 * i + 4, 4, ...response.data.entity.slice(9, 13));
            }
          })
          .catch();
      }
      setTimeout(() => {
        this.dataTable = [];
        this.showDataTable = [];
        const time = new Date();
        time.setFullYear(2020);
        time.setMonth(5);
        time.setDate(29);
        const heatFlux = this.heatFlux.find(item => moment(time).isSame(item.dataTime, 'hour'));

        for (let i = 0; i < 4; i += 1) {
          this.dataTable.push({
            name: `${i + 1}号桶`,
            time: this.changeTime,
            e1: this.top[1 + 4 * i].eValue,
            e2: this.top[2 + 4 * i].eValue,
            e3: this.top[3 + 4 * i].eValue,

            e4: heatFlux.e6 + 3 - Math.ceil(Math.random() * 6),
            e5: heatFlux.e7 + 3 - Math.ceil(Math.random() * 6),
            e6: heatFlux.e8 + 3 - Math.ceil(Math.random() * 6),
            e7: heatFlux.e9 + 3 - Math.ceil(Math.random() * 6),

            e8: this.bucket[4 + 8 * i].eValue,
            e9: this.bucket[5 + 8 * i].eValue,
            e10: this.bucket[6 + 8 * i].eValue,
            e11: this.bucket[7 + 8 * i].eValue,

            e12: this.top[0 + 4 * i].eValue,
            e13: this.totalWeight[i].toString(),
            e14: this.weightChange[i].toString(),
            e15: this.leakage[i].toString(),
            e16: this.dailyChange[i].toString(),
          });
        }
        for (let i = 0; i < this.checkList.length; i += 1) {
          this.showDataTable.push(this.dataTable[this.checkList[i]]);
        }
      }, 500);
    },
    checkListChange(checkList) {
      checkList.sort();
      this.showDataTable = [];
      for (let i = 0; i < this.checkList.length; i += 1) {
        this.showDataTable.push(this.dataTable[this.checkList[i]]);
      }
    },
    getHeatFlux() {
      this.$http
        .get('/datas/16065433?pageNum=1&pageSize=50&startTime=2020-06-29+00:00:00&endTime=2020-06-29+23:59:59&interval=1', {
          headers: {
            token: sessionStorage.getItem('token'),
          },
        })
        .then((res) => {
          this.heatFlux = res.data;
        })
        .catch();
    },
  },

  mounted() {
    this.getHeatFlux();
    this.token = sessionStorage.getItem('token');
    this.getElementData();
    this.timer = setInterval(() => {
      this.getElementData();
    }, 120000);

    setTimeout(() => {
      this.getTodayData();
    }, 2000);
  },

  computed: {
  },

  watch: {
  },

  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
};
</script>

<style scoped>
.overview {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  text-align: left;
}

.title {
  text-align: left;
  color: white;
  border-bottom: 2px solid white;
  padding: 0 5px 5px 5px;
  font-size: 0.8em;
}

.bucket-top {
  width: 240px;
  height: 80px;
  margin-top: 15px;
  margin-left: 50px;
  background: #757075;
  border-radius: 50% / 50%;
  position: relative;
  text-align: center;
  z-index: 99;
}

.bucket-first {
  width: 240px;
  height: 110px;
  margin-left: 50px;
  margin-top: -40px;
  background-color: #3a6aa1;
  border-bottom-right-radius: 120px 40px;
  border-bottom-left-radius: 120px 40px;
  position: relative;
  text-align: center;
  z-index: 98;
}
.bucket-second {
  width: 240px;
  height: 110px;
  margin-left: 50px;
  margin-top: -40px;
  background-color: #704e6e;
  border-bottom-right-radius: 120px 40px;
  border-bottom-left-radius: 120px 40px;
  position: relative;
  text-align: center;
  z-index: 97;
}
.bucket-third {
  width: 240px;
  height: 110px;
  margin-left: 50px;
  margin-top: -40px;
  background-color: #2093dd;
  border-bottom-right-radius: 120px 40px;
  border-bottom-left-radius: 120px 40px;
  position: relative;
  text-align: center;
  z-index: 96;
}
.bucket-fourth {
  width: 240px;
  height: 110px;
  margin-left: 50px;
  margin-top: -40px;
  background-color: #348191;
  border-bottom-right-radius: 120px 40px;
  border-bottom-left-radius: 120px 40px;
  position: relative;
  text-align: center;
  z-index: 95;
}

.top-value1 {
  position: relative;
  color: white;
  font-size: 0.8em;
  top: 20px;
}
.top-value2 {
  position: relative;
  color: white;
  font-size: 0.8em;
  margin-left: 15px;
  top: 20px;
}
.top-value3 {
  position: relative;
  color: white;
  font-size: 0.8em;
  top: 30px;
}

.value1 {
  position: relative;
  color: white;
  top: 55px;
  font-size: 0.8em;
}
.value2 {
  position: relative;
  color: white;
  top: 55px;
  margin-left: 10px;
  font-size: 0.8em;
}

.weight {
  width: 179px;
  height: 43px;
  background: url("../../assets/称.png");
  margin-left: 80px;
}

.weight-value {
  width: 100px;
  height: 34px;
  background: transparent;
  border: 4px solid white;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  margin-left: 65px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
.rain-value {
  width: 100px;
  height: 34px;
  background: transparent;
  border: 4px solid white;
  border-left: 0;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-checkbox-group {
  margin-top: 10px;
  margin-left: 52px;
}
.el-checkbox {
  color: white;
}

.el-table {
  background-color: transparent;
  margin: 5px 20px 20px 20px;
  width: 95%;
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

</style>
