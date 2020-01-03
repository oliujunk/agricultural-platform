<template>
  <div class="overview">
    <el-scrollbar style="width: 100%; height: 100%;">
      <div style="min-width: 1660px;">
        <el-row>
          <el-col :span="5">
            <div class="left">
              <div class="info-block">
                <div class="device-name">水肥机</div>
                <div class="device-info">设备编号：16065208</div>
                <div class="device-info" v-if="element[0]">更新时间：{{element[0].datetime}}</div>
              </div>
              <div
                class="left-block"
                v-for="(item, index) in fertilizerElementName"
                :key="index"
              >
                <div class="left-block-value" v-if="element[index]">{{element[index].eValue + ' ' + element[index].eUnit}}</div>
                <div class="left-block-name">{{item.name}}</div>
                <div class="left-block-english">{{item.english}}</div>
              </div>
            </div>
          </el-col>
          <el-col :span="14">
            <div style="height: 60px;">
              <el-radio-group v-model="dataName" style="margin-top: 10px; margin-left: 10px;">
                <el-radio-button label="土湿"></el-radio-button>
                <el-radio-button label="流量"></el-radio-button>
              </el-radio-group>
              <el-radio-group v-model="blockType" style="margin-top: 10px; margin-left: 567px;">
                <el-radio-button label="作物种植区"></el-radio-button>
                <el-radio-button label="灌溉实验区"></el-radio-button>
              </el-radio-group>
            </div>
            <div class="center" v-if="blockType === '作物种植区'">
              <div class="center-top">
                <div
                  class="orchard-block"
                  v-for="(item, index) in nodeName1"
                  :key="index"
                  @click.capture="handleClickBlock(sequence[index] + 13, relayStateBit[sequence[index] + 13])"
                  :style="relayStateBit[sequence[index] + 13] === 1 ? 'background-color: #f97c85;' : 'background-color: #0cc58f;'"
                  v-loading="relayLoading[sequence[index] + 13]"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.5)"
                >
                  <div class="orchard-name">{{item}}</div>
                  <div class="orchard-element">{{dataName}}</div>
                  <div class="orchard-value" v-if="dataName === '土湿' && node[sequence[index] * 2]">{{node[sequence[index] * 2].eValue + ' %'}}</div>
                  <div class="orchard-value" v-else-if="dataName === '流量' && node[sequence[index] * 2 + 1]">{{node[sequence[index] * 2 + 1].eValue + ' m3'}}</div>
                </div>
              </div>
              <div class="center-bottom-left">
                <div class="top"></div>
                <div class="bottom">
                  <div
                    class="bottom-block"
                    v-for="(item, index) in nodeName2"
                    :key="index"
                    @click.capture="handleClickBlock(sequence[index + 11] + 13, relayStateBit[sequence[index + 11] + 13])"
                    :style="relayStateBit[sequence[index + 11] + 13] === 1 ? 'background-color: #f97c85;' : 'background-color: #0cc58f;'"
                    v-loading="relayLoading[sequence[index + 11] + 13]"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.5)"
                  >
                    <div class="name">{{item}}</div>
                    <div class="value" v-if="dataName === '土湿' && node[sequence[index + 11] * 2]">{{dataName}}：{{node[sequence[index + 11] * 2].eValue + ' %'}}</div>
                    <div class="value" v-else-if="dataName === '流量' && node[sequence[index + 11] * 2 + 1]">{{dataName}}：{{node[sequence[index + 11] * 2 + 1].eValue + ' m3'}}</div>
                  </div>
                </div>
              </div>
              <div class="center-bottom-right">
                <div class="left">
                  <div class="top">
                    <div
                      class="block"
                      v-for="item in 4"
                      :key="item"
                      @click.capture="handleClickBlock(sequence[item + 14] + 13, relayStateBit[sequence[item + 14] + 13])"
                      :style="relayStateBit[sequence[item + 14] + 13] === 1 ? 'background-color: #f97c85;' : 'background-color: #0cc58f;'"
                      v-loading="relayLoading[sequence[item + 14] + 13]"
                      element-loading-text="拼命加载中"
                      element-loading-spinner="el-icon-loading"
                      element-loading-background="rgba(0, 0, 0, 0.5)"
                    >
                      <div class="name">大田实验区</div>
                      <div class="value" v-if="dataName === '土湿' && node[sequence[item + 14] * 2]">{{dataName}}：{{node[sequence[item + 14] * 2].eValue + ' %'}}</div>
                      <div class="value" v-else-if="dataName === '流量' && node[sequence[item + 14] * 2 + 1]">{{dataName}}：{{node[sequence[item + 14] * 2 + 1].eValue + ' m3'}}</div>
                    </div>
                  </div>
                  <div class="bottom">
                    <div
                      class="experimental-block"
                      @click.capture="blockType = '灌溉实验区'"
                    >
                      <div style="margin-top: 70px;">灌溉实验区</div>
                      <div>点击进入</div>
                    </div>
                    <div style="display: flex; flex-wrap: wrap-reverse; width: 350px; height: 180px; margin-left: 10px;">
                      <div
                        class="block"
                        v-for="item in 3"
                        :key="item"
                        @click.capture="handleClickBlock(sequence[item + 22] + 13, relayStateBit[sequence[item + 22] + 13])"
                        :style="relayStateBit[sequence[item + 22] + 13] === 1 ? 'background-color: #f97c85;' : 'background-color: #0cc58f;'"
                        v-loading="relayLoading[sequence[item + 22] + 13]"
                        element-loading-text="拼命加载中"
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.5)"
                      >
                        <div class="name">大田实验区</div>
                        <div class="value" v-if="dataName === '土湿' && node[sequence[item + 22] * 2]">{{dataName}}：{{node[sequence[item + 22] * 2].eValue + ' %'}}</div>
                        <div class="value" v-else-if="dataName === '流量' && node[sequence[item + 22] * 2 + 1]">{{dataName}}：{{node[sequence[item + 22] * 2 + 1].eValue + ' m3'}}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="right">
                  <div
                    class="block"
                    v-for="item in 4"
                    :key="item"
                    @click.capture="handleClickBlock(sequence[item + 18] + 13, relayStateBit[sequence[item + 18] + 13])"
                    :style="relayStateBit[sequence[item + 18] + 13] === 1 ? 'background-color: #f97c85;' : 'background-color: #0cc58f;'"
                    v-loading="relayLoading[sequence[item + 18] + 13]"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.5)"
                  >
                    <div class="name">大田实验区</div>
                    <div class="value" v-if="dataName === '土湿' && node[sequence[item + 18] * 2]">{{dataName}}：{{node[sequence[item + 18] * 2].eValue + ' %'}}</div>
                    <div class="value" v-else-if="dataName === '流量' && node[sequence[item + 18] * 2 + 1]">{{dataName}}：{{node[sequence[item + 18] * 2 + 1].eValue + ' m3'}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="irrigate" v-else-if="blockType === '灌溉实验区'">
              <div class="irrigate-top">
                <div
                  class="irrigate-block"
                  v-for="index in 10"
                  :key="index"
                  @click.capture="handleClickBlock(sequence[index + 25] + 13, relayStateBit[sequence[index + 25] + 13])"
                  :style="relayStateBit[sequence[index + 25] + 13] === 1 ? 'background-color: #f97c85;' : 'background-color: #0cc58f;'"
                  v-loading="relayLoading[sequence[index + 25] + 13]"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.5)"
                >
                  <div class="irrigate-name">大田实验区</div>
                  <div class="irrigate-value" v-if="dataName === '土湿' && node[sequence[index + 25] * 2]">{{dataName}}：{{node[sequence[index + 25] * 2].eValue + ' %'}}</div>
                  <div class="irrigate-value" v-else-if="dataName === '流量' && node[sequence[index + 25] * 2 + 1]">{{dataName}}：{{node[sequence[index + 25] * 2 + 1].eValue + ' m3'}}</div>
                </div>
              </div>
              <div class="irrigate-bottom">
                <div
                  class="irrigate-block"
                  v-for="index in 10"
                  :key="index"
                  @click.capture="handleClickBlock(sequence[index + 35] + 13, relayStateBit[sequence[index + 35] + 13])"
                  :style="relayStateBit[sequence[index + 35] + 13] === 1 ? 'background-color: #f97c85;' : 'background-color: #0cc58f;'"
                  v-loading="relayLoading[sequence[index + 35] + 13]"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.5)"
                >
                  <div class="irrigate-name">大田实验区</div>
                  <div class="irrigate-value" v-if="dataName === '土湿' && node[sequence[index + 35] * 2]">{{dataName}}：{{node[sequence[index + 35] * 2].eValue + ' %'}}</div>
                  <div class="irrigate-value" v-else-if="dataName === '流量' && node[sequence[index + 35] * 2 + 1]">{{dataName}}：{{node[sequence[index + 35] * 2 + 1].eValue + ' m3'}}</div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="right">
              <div
                v-for="(item, index) in fertilizerButtonName"
                :key="index"
                v-if="item !== ''"
                class="right-block"
                @click.capture="handleClickBlock(index, relayStateBit[index])"
                :style="relayStateBit[index] === 1 ? 'background-color: #bc5fb7;' : 'background-color: #348191;'"
                v-loading="relayLoading[index]"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.5)"
              >{{item}}</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'overview',

  data() {
    return {
      moment,
      dataName: '土湿',
      blockType: '作物种植区',
      fertilizerElementName: [{ name: '管道压力', english: 'Pressure' }, { name: 'PH值', english: 'PH' }, { name: '电导率', english: 'EC' }, { name: '管道流量', english: 'FLow' }],
      fertilizerButtonName: ['施肥阀1', '施肥阀2', '施肥阀3', '施肥阀4', '施肥泵', '主水泵', '', '', '', '搅拌机1', '搅拌机2', '搅拌机3', '搅拌机4'],
      nodeName1: ['核桃园', '石榴园', '石榴园', '樱桃园', '樱桃园', '樱桃园', '苹果园', '苹果园', '梨园', '山楂园', '杏园'],
      nodeName2: ['走廊', '日光温室', '温控日光温室', '双层面日光温室'],
      node: new Array(100),
      sequence: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 13, 14,
        15, 16, 17, 18,
        19, 20, 21, 22,
        23, 24, 25,
        26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
        36, 37, 38, 39, 40, 41, 42, 43, 44, 45,
      ],
      element: [],
      relayStateByte: [],
      relayStateBit: [],
      relayLoading: [],
    };
  },

  methods: {
    handleClickBlock(index, state) {
      this.relayLoading[index] = true;
      this.$forceUpdate();
      this.$http
        .post('/relay', {
          deviceId: 16065208,
          relayNum: index,
          relayState: state === 0 ? 1 : 0,
        }, {
          headers: {
            token: this.token,
          },
        })
        .then((response) => {
          this.relayLoading[index] = false;
          if (response.data) {
            this.relayStateBit[index] = (state === 0 ? 1 : 0);
            this.$message.success(this.$t('home.control.controlSuccess'));
          } else {
            this.$message.error(this.$t('home.control.controlError'));
          }
          this.$forceUpdate();
        })
        .catch(error => console.log(error));
    },
    getElementData() {
      this.$http
        .get('/intfa/queryData/16065208')
        .then((response) => {
          if (response.data) {
            this.element = response.data.entity.slice(0, 4);
            this.node.splice(0, 4, ...response.data.entity.slice(4, 14));
          }
        })
        .catch();
      for (let i = 0; i < 6; i += 1) {
        setTimeout(() => {
          this.$http
            .get(`/intfa/queryData/${19112991 + i}`)
            .then((response) => {
              if (response.data) {
                this.node.splice(10 + i * 16, 16, ...response.data.entity.slice(0, 16));
              }
            })
            .catch();
        }, 100 * i);
      }
    },
    getRelayState(deviceId) {
      this.$http
        .get(`/data/${deviceId}`, {
          headers: {
            token: this.token,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            if (typeof (response.data) !== 'string') {
              this.relayStateByte = [];
              for (let i = 0; i < 32; i += 1) {
                this.relayStateByte.push(response.data[`j${i + 1}`]);
              }
              this.relayStateBit = [];
              for (let i = 0; i < 256; i += 1) {
                this.relayStateBit.push(((this.relayStateByte[i % 32] >> (i / 32)) & 0x01));
                this.relayLoading.push(false);
              }
            }
          }
        })
        .catch(error => console.error(error));
    },

  },

  mounted() {
    this.token = sessionStorage.getItem('token');
    this.getElementData();
    this.getRelayState(16065208);
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
    },
    dataRefresh() {
      return this.$store.state.dataRefresh;
    },
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
  color: white;
}

.left {
  display: flex;
  flex-wrap: wrap;
  margin-top: 60px;
  margin-left: 30px;
}

.info-block {
  width: 270px;
  height: 140px;
  background-color: #278cff;
  border-radius: 4px;
  margin-bottom: 102px;
}
.info-block .device-name {
  margin: 30px 0 10px 20px;
  font-size: 20px;
}
.info-block .device-info {
  margin-left: 20px;
  font-size: 0.8em;
}

.left-block {
  width: 130px;
  height: 180px;
  background-color: #704e6e;
  margin-bottom: 20px;
  margin-right: 10px;
  border-radius: 4px;
  text-align: center;
}
.left-block:hover {
  background-color: #919191;
}
.left-block .left-block-value {
  margin-top: 55px;
  font-size: 20px;
}
.left-block .left-block-name {
  margin-top: 10px;
}
.left-block .left-block-english {
  margin-top: 5px;
  font-size: 0.8em;
}

.center {
  display: flex;
  flex-wrap: wrap;
  margin-left: 10px;
}
.center-top {
  width: 925px;
  height: 210px;
  border: 4px solid white;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.orchard-block {
  width: 80px;
  height: 190px;
  background-color: #0cc58f;
  text-align: center;
  user-select: none;
}
.orchard-block:hover {
  cursor: pointer;
}
.orchard-block .orchard-name {
  margin-top: 60px;
  font-size: 18px;
}
.orchard-block .orchard-element {
  margin-top: 16px;
  font-size: 14px;
}
.orchard-block .orchard-value {
  margin-top: 5px;
  font-size: 14px;
}

.center-bottom-left {
  width: 240px;
  height: 400px;
  border: 4px solid white;
  border-top: 0;
  border-left: 0;
  text-align: center;
}
.center-bottom-left .top {
  height: 10px;
  border-left: 4px solid white;
}
.center-bottom-left .bottom {
  margin-top: 38px;
  height: 352px;
  border-left: 4px solid white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.center-bottom-left .bottom .bottom-block {
  width: 220px;
  height: 80px;
  background-color: #0cc58f;
  user-select: none;
}
.center-bottom-left .bottom .bottom-block:hover {
  cursor: pointer;
}
.center-bottom-left .bottom .bottom-block:first-child {
  margin-top: 8px;
}
.name {
  margin-top: 15px;
  font-size: 14px;
}
.value {
  font-size: 16px;
}

.center-bottom-right {
  width: 685px;
  height: 400px;
  border-right: 4px solid white;
  border-bottom: 4px solid white;
  display: flex;
  text-align: center;
}

.center-bottom-right .left {
  width: 75%;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.center-bottom-right .left .top {
  width: 250px;
  height: 180px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-left: 10px;
}
.center-bottom-right .left .top .block {
  width: 110px;
  height: 80px;
  background-color: #0cc58f;
  margin-right: 10px;
  user-select: none;
}
.center-bottom-right .left .top .block:hover {
  cursor: pointer;
}

.center-bottom-right .left .bottom {
  width: 510px;
  height: 210px;
  margin-left: 10px;
  display: flex;
  align-items: flex-end;
}
.center-bottom-right .left .bottom .experimental-block {
  width: 150px;
  height: 200px;
  background-color: #278cff;
  user-select: none;
}
.center-bottom-right .left .bottom .experimental-block:hover {
  cursor: pointer;
}

.center-bottom-right .left .bottom .block {
  width: 165px;
  height: 80px;
  background-color: #0cc58f;
  margin-right: 10px;
  margin-top: 10px;
  user-select: none;
}
.center-bottom-right .left .bottom .block:hover {
  cursor: pointer;
}

.center-bottom-right .right {
  width: 25%;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}
.center-bottom-right .right .block {
  width: 165px;
  height: 80px;
  background-color: #0cc58f;
  user-select: none;
}
.center-bottom-right .right .block:hover {
  cursor: pointer;
}

.center-bottom-right .right .block:first-child {
  margin-top: 60px;
}

.irrigate {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-left: 10px;
}
.irrigate-top {
  width: 925px;
  height: 273px;
  border: 4px solid white;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.irrigate-bottom {
  width: 925px;
  height: 273px;
  border: 4px solid white;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 60px;
}
.irrigate-block {
  width: 85px;
  height: 260px;
  background-color: #0cc58f;
  text-align: center;
  user-select: none;
}
.irrigate-block:hover {
  cursor: pointer;
}
.irrigate-block .irrigate-name {
  margin-top: 90px;
  font-size: 16px;
}
.irrigate-block .irrigate-value {
  margin-top: 15px;
  font-size: 14px;
}

.right {
  display: flex;
  flex-wrap: wrap;
  margin-top: 60px;
  margin-left: 10px;
}
.right .right-block {
  width: 135px;
  height: 116px;
  background-color: #348191;
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  user-select: none;
}
.right .right-block:hover {
  cursor: pointer;
}

.el-radio-group {
  border: 2px solid white;
  border-radius: 4px;
  user-select: none;
}
.el-radio-button >>> span {
  background: transparent;
  border: 0;
  border-radius: 4px;
  color: white;
}
</style>
