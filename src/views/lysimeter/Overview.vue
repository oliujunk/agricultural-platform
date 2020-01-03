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
                <span class="value2" v-if="bucket[index - 1]">热通量：{{bucket[index - 1].eValue}} W/m2</span>
              </div>
              <div class="weight"></div>
              <div style="display: flex;">
                <div class="weight-value">
                  <span>{{totalWeight[0]}} Kg</span>
                </div>
                <div class="rain-value">
                  <span v-if="top[0] === '32767'">------ mm</span>
                  <span v-else-if="top[0]">{{top[0].eValue}} mm</span>
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
                <span class="value2" v-if="bucket[index - 1 + 8]">热通量：{{bucket[index - 1 + 8].eValue}} W/m2</span>
              </div>
              <div class="weight"></div>
              <div style="display: flex;">
                <div class="weight-value">
                  <span>{{totalWeight[1]}} Kg</span>
                </div>
                <div class="rain-value">
                  <span v-if="top[4] === '32767'">------ mm</span>
                  <span v-else-if="top[4]">{{top[4].eValue}} mm</span>
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
                <span class="value2" v-if="bucket[index - 1 + 16]">热通量：{{bucket[index - 1 + 16].eValue}} W/m2</span>
              </div>
              <div class="weight"></div>
              <div style="display: flex;">
                <div class="weight-value">
                  <span>{{totalWeight[2]}} Kg</span>
                </div>
                <div class="rain-value">
                  <span v-if="top[8] === '32767'">------ mm</span>
                  <span v-else-if="top[8]">{{top[8].eValue}} mm</span>
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
                <span class="value2" v-if="bucket[index - 1 + 24]">热通量：{{bucket[index - 1 + 24].eValue}} W/m2</span>
              </div>
              <div class="weight"></div>
              <div style="display: flex;">
                <div class="weight-value">
                  <span>{{totalWeight[3]}} Kg</span>
                </div>
                <div class="rain-value">
                  <span v-if="top[12] === '32767'">------ mm</span>
                  <span v-else-if="top[12]">{{top[12].eValue}} mm</span>
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
            <el-table-column prop="name" label="桶标号" align="center"></el-table-column>
            <el-table-column prop="time" width="140" label="时间" align="center"></el-table-column>
            <el-table-column prop="e1" label="土湿1" align="center"></el-table-column>
            <el-table-column prop="e2" label="土湿2" align="center"></el-table-column>
            <el-table-column prop="e3" label="土湿3" align="center"></el-table-column>
            <el-table-column prop="e4" label="第一层热通量" align="center"></el-table-column>
            <el-table-column prop="e5" label="第二层热通量" align="center"></el-table-column>
            <el-table-column prop="e6" label="第三层热通量" align="center"></el-table-column>
            <el-table-column prop="e7" label="第四层热通量" align="center"></el-table-column>
            <el-table-column prop="e8" label="第一层土湿" align="center"></el-table-column>
            <el-table-column prop="e9" label="第二层土湿" align="center"></el-table-column>
            <el-table-column prop="e10" label="第三层土湿" align="center"></el-table-column>
            <el-table-column prop="e11" label="第四层土湿" align="center"></el-table-column>
            <el-table-column prop="e13" label="重量" align="center"></el-table-column>
            <el-table-column prop="e12" label="渗漏" align="center"></el-table-column>
          </el-table>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
const bigdecimal = require('bigdecimal');

export default {
  name: 'overview',

  data() {
    return {
      checkList: [0, 1, 2, 3],
      dataTable: [],
      showDataTable: [],
      weight: [],
      totalWeight: [],
      top: new Array(16),
      bucket: new Array(32),
    };
  },

  methods: {
    getElementData() {
      this.$http
        .get('/intfa/queryData/16065434')
        .then((response) => {
          if (response.data) {
            for (let i = 0; i < 8; i += 1) {
              if (response.data.entity[0 + i * 2].eValue === '32767' || response.data.entity[1 + i * 2].eValue === '32767') {
                this.weight.push('32767');
              } else {
                this.weight.push(new bigdecimal.BigDecimal(`${response.data.entity[0 + i * 2].eValue}.${response.data.entity[1 + i * 2].eValue}`));
              }
            }
            for (let i = 0; i < 4; i += 1) {
              if (this.weight[0 + i * 2] === '32767' || this.weight[1 + i * 2] === '32767') {
                this.totalWeight.push('------');
              } else {
                this.totalWeight.push(this.weight[0 + i * 2].add(this.weight[1 + i * 2]).toString());
              }
            }
          }
        })
        .catch();
      for (let i = 0; i < 4; i += 1) {
        this.$http
          .get(`/intfa/queryData/${16065430 + i}`)
          .then((response) => {
            if (response.data) {
              this.top.splice(4 * i, 1, response.data.entity[1]);
              this.top.splice(1 + 4 * i, 3, ...response.data.entity.slice(10, 13));
              this.bucket.splice(8 * i, 8, ...response.data.entity.slice(2, 10));
            }
          })
          .catch();
      }
      setTimeout(() => {
        this.dataTable = [];
        this.showDataTable = [];
        for (let i = 0; i < 4; i += 1) {
          this.dataTable.push({
            name: `${i + 1}号桶`,
            time: this.top[1 + 4 * i].datetime,
            e1: this.top[1 + 4 * i].eValue,
            e2: this.top[2 + 4 * i].eValue,
            e3: this.top[3 + 4 * i].eValue,
            e4: this.bucket[0 + 4 * i].eValue,
            e5: this.bucket[1 + 4 * i].eValue,
            e6: this.bucket[2 + 4 * i].eValue,
            e7: this.bucket[3 + 4 * i].eValue,
            e8: this.bucket[4 + 4 * i].eValue,
            e9: this.bucket[5 + 4 * i].eValue,
            e10: this.bucket[6 + 4 * i].eValue,
            e11: this.bucket[7 + 4 * i].eValue,
            e12: this.top[0 + 4 * i].eValue,
            e13: this.totalWeight[i],
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
  },

  mounted() {
    this.token = sessionStorage.getItem('token');
    this.getElementData();
  },

  computed: {
  },

  watch: {
  },

  beforeDestroy() {
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
