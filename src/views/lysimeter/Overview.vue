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
                <div class="top-value1">土湿1：23 %</div>
                <span class="top-value2">土湿2：23 %</span>
                <span class="top-value3">土湿3：23 %</span>
                <div class="top-value4">土湿4：23 %</div>
              </div>
              <div class="bucket-first">
                <span class="value1">土湿：23 %</span>
                <span class="value2">热通量：24 W/m2</span>
              </div>
              <div class="bucket-second">
                <span class="value1">土湿：23 %</span>
                <span class="value2">热通量：24 W/m2</span>
              </div>
              <div class="bucket-third">
                <span class="value1">土湿：23 %</span>
                <span class="value2">热通量：24 W/m2</span>
              </div>
              <div class="bucket-fourth">
                <span class="value1">土湿：23 %</span>
                <span class="value2">热通量：24 W/m2</span>
              </div>
              <div class="weight"></div>
              <div class="weight-value">
                <span v-if="weight[0]">{{weight[0].add(weight[1])}} Kg</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bucket-top">
                <div class="top-value1">土湿1：23 %</div>
                <span class="top-value2">土湿2：23 %</span>
                <span class="top-value3">土湿3：23 %</span>
                <div class="top-value4">土湿4：23 %</div>
              </div>
              <div class="bucket-first">
                <span class="value1">土湿：23 %</span>
                <span class="value2">热通量：24 W/m2</span>
              </div>
              <div class="bucket-second">
                <span class="value1">土湿：23 %</span>
                <span class="value2">热通量：24 W/m2</span>
              </div>
              <div class="bucket-third">
                <span class="value1">土湿：23 %</span>
                <span class="value2">热通量：24 W/m2</span>
              </div>
              <div class="bucket-fourth">
                <span class="value1">土湿：23 %</span>
                <span class="value2">热通量：24 W/m2</span>
              </div>
              <div class="weight"></div>
              <div class="weight-value">
                <span v-if="weight[2]">{{weight[2].add(weight[3])}} Kg</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bucket-top">
                <div class="top-value1">土湿1：23 %</div>
                <span class="top-value2">土湿2：23 %</span>
                <span class="top-value3">土湿3：23 %</span>
                <div class="top-value4">土湿4：23 %</div>
              </div>
              <div class="bucket-first">
                <span class="value1">土湿：23 %</span>
                <span class="value2">热通量：24 W/m2</span>
              </div>
              <div class="bucket-second">
                <span class="value1">土湿：23 %</span>
                <span class="value2">热通量：24 W/m2</span>
              </div>
              <div class="bucket-third">
                <span class="value1">土湿：23 %</span>
                <span class="value2">热通量：24 W/m2</span>
              </div>
              <div class="bucket-fourth">
                <span class="value1">土湿：23 %</span>
                <span class="value2">热通量：24 W/m2</span>
              </div>
              <div class="weight"></div>
              <div class="weight-value">
                <span v-if="weight[4]">{{weight[4].add(weight[5])}} Kg</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bucket-top">
                <div class="top-value1">土湿1：23 %</div>
                <span class="top-value2">土湿2：23 %</span>
                <span class="top-value3">土湿3：23 %</span>
                <div class="top-value4">土湿4：23 %</div>
              </div>
              <div class="bucket-first">
                <span class="value1">土湿：23 %</span>
                <span class="value2">热通量：24 W/m2</span>
              </div>
              <div class="bucket-second">
                <span class="value1">土湿：23 %</span>
                <span class="value2">热通量：24 W/m2</span>
              </div>
              <div class="bucket-third">
                <span class="value1">土湿：23 %</span>
                <span class="value2">热通量：24 W/m2</span>
              </div>
              <div class="bucket-fourth">
                <span class="value1">土湿：23 %</span>
                <span class="value2">热通量：24 W/m2</span>
              </div>
              <div class="weight"></div>
              <div class="weight-value">
                <span v-if="weight[6]">{{weight[6].add(weight[7])}} Kg</span>
              </div>
            </el-col>
          </el-row>
        </div>
        <div style="margin-top: 20px; margin-left: 20px;">
          <span class="title">数据展示</span>
        </div>
        <div>
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="1号桶"></el-checkbox>
            <el-checkbox label="2号桶"></el-checkbox>
            <el-checkbox label="3号桶"></el-checkbox>
            <el-checkbox label="4号桶"></el-checkbox>
          </el-checkbox-group>
        </div>
        <div>
          <el-table
            :data.sync="dataTable"
            size="mini"
          >
            <el-table-column prop="name" label="桶标号" align="center"></el-table-column>
            <el-table-column prop="time" width="140" label="时间" align="center"></el-table-column>
            <el-table-column prop="e1" label="土湿1" align="center"></el-table-column>
            <el-table-column prop="e1" label="土湿2" align="center"></el-table-column>
            <el-table-column prop="e1" label="土湿3" align="center"></el-table-column>
            <el-table-column prop="e1" label="土湿4" align="center"></el-table-column>
            <el-table-column prop="e1" label="第一层土湿" align="center"></el-table-column>
            <el-table-column prop="e2" label="第一层热通量" align="center"></el-table-column>
            <el-table-column prop="e3" label="第二层土湿" align="center"></el-table-column>
            <el-table-column prop="e4" label="第二层热通量" align="center"></el-table-column>
            <el-table-column prop="e5" label="第三层土湿" align="center"></el-table-column>
            <el-table-column prop="e6" label="第三层热通量" align="center"></el-table-column>
            <el-table-column prop="e7" label="第四层土湿" align="center"></el-table-column>
            <el-table-column prop="e8" label="第四层热通量" align="center"></el-table-column>
            <el-table-column prop="e9" label="重量" align="center"></el-table-column>
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
      checkList: [],
      dataTable: [
        {
          name: '1号桶', time: '2019-12-02 15:00:00', e1: 16.2, e2: 23.6, e3: 15.3, e4: 16.7, e5: 19.2, e6: 17.3, e7: 14.6, e8: 25.4, e9: 23.9,
        },
        {
          name: '2号桶', time: '2019-12-02 15:00:00', e1: 16.2, e2: 23.6, e3: 15.3, e4: 16.7, e5: 19.2, e6: 17.3, e7: 14.6, e8: 25.4, e9: 23.9,
        },
        {
          name: '3号桶', time: '2019-12-02 15:00:00', e1: 16.2, e2: 23.6, e3: 15.3, e4: 16.7, e5: 19.2, e6: 17.3, e7: 14.6, e8: 25.4, e9: 23.9,
        },
        {
          name: '4号桶', time: '2019-12-02 15:00:00', e1: 16.2, e2: 23.6, e3: 15.3, e4: 16.7, e5: 19.2, e6: 17.3, e7: 14.6, e8: 25.4, e9: 23.9,
        },
      ],
      weight: [],
    };
  },

  methods: {
    getElementData() {
      this.$http
        .get('http://47.105.215.208:8005/intfa/queryData/16065434')
        .then((response) => {
          if (response.data) {
            for (let i = 0; i < 8; i += 1) {
              this.weight.push(new bigdecimal.BigDecimal(`${response.data.entity[0 + i * 2].eValue}.${response.data.entity[1 + i * 2].eValue}`));
            }
          }
        })
        .catch();
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
  top: 5px;
}
.top-value2 {
  position: relative;
  color: white;
  font-size: 0.8em;
  top: 10px;
}
.top-value3 {
  position: relative;
  color: white;
  font-size: 0.8em;
  margin-left: 15px;
  top: 10px;
}
.top-value4 {
  position: relative;
  color: white;
  font-size: 0.8em;
  top: 15px;
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
  width: 125px;
  height: 34px;
  background: transparent;
  border: 4px solid white;
  border-radius: 10px;
  margin-left: 104px;
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
