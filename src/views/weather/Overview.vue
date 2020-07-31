<template>
  <div class="overview">
    <el-scrollbar style="width: 100%; height: 100%;">
      <div style="min-width: 1660px;">
        <div style="margin-top: 15px; margin-left: 20px;">
          <span class="title">实时状态</span>
        </div>
        <div class="element-container">
          <el-card
            class="element-card"
            v-for="(item, index) in element"
            :key="index"
            :body-style="cardStyle()"
          >
            <div>
              <img :src="`http://47.105.215.208:8081/images/onstage/element/${item.index}.png`" class="image">
            </div>
            <div style="width: 100%; text-align: center;">
              <span class="element-name">{{ item.name }}</span>
              <div v-if="item.index === '198' && elementData[item.ch] !== 32767" class="element-data">
                {{ elementData[item.ch] < 3000 ? $t('home.overview.low') : elementData[item.ch] < 5000 ? $t('home.overview.middle') : $t('home.overview.high') }}
              </div>
              <div v-else-if="elementData[item.ch] !== 32767" class="element-data">
                {{ accMul(elementData[item.ch], item.prec) + ' ' + item.unit }}
              </div>
              <div v-else class="element-data">
                {{ '------' + ' ' + item.unit }}
              </div>
            </div>
          </el-card>
        </div>
        <el-row>
          <el-col :span="17">
            <div style="margin-top: 15px; margin-left: 20px;">
              <span class="title">24小时数据</span>
            </div>
            <div v-if="todayData.length > 0">
              <el-table
                :data.sync="todayData"
                size="mini"
              >
                <el-table-column prop="ch" width="100" :label="$t('home.overview.table.channel')" align="center"></el-table-column>
                <el-table-column prop="name" :label="$t('home.overview.table.name')" align="center"></el-table-column>
                <el-table-column prop="avgData" :label="$t('home.overview.table.avg')" align="center"></el-table-column>
                <el-table-column prop="minData" :label="$t('home.overview.table.min')" align="center"></el-table-column>
                <el-table-column prop="minTime" :label="$t('home.overview.table.minTime')" align="center"></el-table-column>
                <el-table-column prop="maxData" :label="$t('home.overview.table.max')" align="center"></el-table-column>
                <el-table-column prop="maxTime" :label="$t('home.overview.table.maxTime')" align="center"></el-table-column>
              </el-table>
            </div>
          </el-col>
          <el-col :span="7">
            <div style="margin-top: 15px; margin-left: 20px;">
              <span class="title">项目信息</span>
            </div>
            <el-card :body-style="{ padding: '0px' }" class="device-cover">
              <img v-if="device && device.coverUrl" :src="device.coverUrl" style="width: 100%; height: 240px;">
              <img v-else src="http://47.105.215.208:8081/images/onstage/login_bg.jpg" style="width: 100%; height: 240px;">
              <div style="display: flex; padding-left: 10px; justify-content: space-between;">
                <div>
                  <div style="text-align: left;">{{$t('home.overview.deviceName')}}{{ device.facName }}</div>
                  <div style="text-align: left;">{{$t('home.overview.deviceId')}}{{ device.facId }}</div>
                </div>
                <div style="margin-right: 10px;">
                  <el-upload
                    :action="`${this.$API_BASE_URL}/device/upload`"
                    :headers="{ token }"
                    :data="{ deviceId: elementData.facId }"
                    :before-upload="beforeUploadDevice"
                    :on-success="handleUploaddCoverSuccess"
                    :show-file-list="false"
                  >
                    <el-button size="small" type="primary">{{$t('home.overview.upload')}}</el-button>
                  </el-upload>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <div style="margin-top: 15px; margin-left: 20px;">
          <span class="title">设备状态</span>
        </div>
        <div class="relay-container">
          <div class="relay-container">
            <el-card
              v-for="(item, index) in relayElement"
              :key="index"
              class="switch-card"
              v-loading="relayLoading[index]"
              :element-loading-text="$t('home.control.loading')"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
              :body-style="{ display: 'flex' }"
            >
              <div>
                <img :src="`http://47.105.215.208:8081/images/onstage/element/${item.index}.png`" class="image">
              </div>
              <div style="text-align: center; width: 100px;">
                <div>{{ item.name }}</div>
                <el-switch
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  v-model="relayStateBit[item.num]"
                  :active-value="1"
                  :inactive-value="0"
                  @change="handleSwitchChange(index, item.ch, item.num, relayStateBit[item.num])"
                ></el-switch>
              </div>
            </el-card>
          </div>
          <div class="relay-container">
            <el-card
              v-for="(item, index) in relayExtendElement"
              :key="index"
              class="switch-card"
              v-loading="relayExtendLoading[index]"
              :element-loading-text="$t('home.control.loading')"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
              :body-style="{ display: 'flex' }"
            >
              <div>
                <img :src="`http://47.105.215.208:8081/images/onstage/element/${item.index}.png`" class="image">
              </div>
              <div style="text-align: center; width: 100px;">
                <div>{{ item.name }}</div>
                <el-switch
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  v-model="relayStateBit[item.num]"
                  :active-value="1"
                  :inactive-value="0"
                  @change="handleSwitchChange(index, item.ch, item.num, relayStateBit[item.num])"
                ></el-switch>
              </div>
            </el-card>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'overview',

  data() {
    return {
      token: '',
      device: {},
      elementData: {},
      relayStateByte: [],
      relayStateBit: [],
      relayElement: [],
      relayExtendElement: [],
      relayLoading: [],
      relayExtendLoading: [],
      element: [],
      todayData: [],
      cardStyle: () => {
        const background = `hsl(${((Math.random() * 1000) % 270) + 90}, ${((Math.random() * 1000) % 40) + 60}%, ${((Math.random() * 1000) % 40) + 20}%`;
        return {
          display: 'flex',
          width: '100%',
          'padding-top': '20px',
          background,
        };
      },
      accMul: (arg1, arg2) => {
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
            (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / (10 ** m)
          );
        }
        return null;
      },
    };
  },

  methods: {
    getDeviceInfo(deviceId) {
      this.$http
        .get(`/device/${deviceId}`, {
          headers: {
            token: this.token,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            this.device = JSON.parse(JSON.stringify(response.data));
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

            const relayNum = response.data.relayNum.split('/');
            const relayName = response.data.relayName.split('/');
            const relayElement = [];
            this.relayLoading = [];
            for (let i = 0; i < 32; i += 1) {
              if (relayNum[i] === '0') continue;
              const detail = this.getRelayDetail(parseInt(relayNum[i], 10));
              if (relayName[i] !== '-') {
                detail.name = relayName[i];
              }
              detail.ch = `j${i + 1}`;
              detail.num = i;
              relayElement.push(detail);
              this.relayLoading.push(false);
            }
            this.relayElement = relayElement;

            if (response.data.relayExtend) {
              const relayExtendNum = response.data.relayExtendNum.split('/');
              const relayExtendName = response.data.relayExtendName.split('/');
              const { relayExtendCount } = response.data;
              const relayExtendElement = [];
              this.relayExtendLoading = [];
              for (let i = 0; i < relayExtendCount; i += 1) {
                if (relayExtendNum[i] === '0') continue;
                const detail = this.getRelayDetail(parseInt(relayExtendNum[i], 10));
                if (relayExtendName[i] !== '-') {
                  detail.name = relayExtendName[i];
                }
                detail.ch = `j${i + 33}`;
                detail.num = i + 32;
                relayExtendElement.push(detail);
                this.relayExtendLoading.push(false);
              }
              this.relayExtendElement = relayExtendElement;
            } else {
              this.relayExtendLoading = [];
              this.relayExtendElement = [];
            }
            this.$forceUpdate();
          }
        })
        .catch(error => console.log(error));
    },
    getDetail(elementNum) {
      const element = this.elementInfo;
      const detail = element.find(item => item.index === elementNum);
      return JSON.parse(JSON.stringify(detail));
    },
    getRelayDetail(relayNum) {
      const relayArray = this.relayInfo;
      const detail = relayArray.find(item => item.index === relayNum);
      return JSON.parse(JSON.stringify(detail));
    },
    getDeviceData(deviceId) {
      this.$http
        .get(`/data/${deviceId}`, {
          headers: {
            token: this.token,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            if (typeof (response.data) !== 'string') {
              this.elementData = response.data;
              this.relayStateByte = [];
              for (let i = 0; i < 32; i += 1) {
                this.relayStateByte.push(this.elementData[`j${i + 1}`]);
              }
              this.relayStateBit = [];
              for (let i = 0; i < 256; i += 1) {
                this.relayStateBit.push(((this.relayStateByte[i % 32] >> (i / 32)) & 0x01));
              }
              this.$store.commit('dataRefresh', { dataRefresh: false });
              for (let i = 0, len = this.element.length; i < len; i += 1) {
                const cardStyle = {
                  h: (Math.random() * 1000) % 360,
                  s: ((Math.random() * 1000) % 40) + 50,
                  l: ((Math.random() * 1000) % 40) + 50,
                };
                this.cardStyle[i] = {
                  background: `hsl(${cardStyle.h}, ${cardStyle.s}%, ${
                    cardStyle.l
                  }%)`,
                };
              }
            } else {
              this.elementData = {};
            }
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 403) {
              sessionStorage.removeItem('username');
              sessionStorage.removeItem('token');
            } else {
              this.elementData = {};
            }
          }
        });
    },
    tableDraw(deviceId) {
      this.todayData = [];
      this.$http
        .get(`/todaydata/${deviceId}`, {
          headers: {
            token: this.token,
          },
        })
        .then((response) => {
          const { data } = response;
          if (data && data.length > 0) {
            const todayData = JSON.parse(JSON.stringify(this.element));
            todayData.forEach((item) => {
              item.minData = 32767;
              item.maxData = -32767;
              item.avgData = 0;
              item.sumData = 0;
              item.add = 0;
            });
            data.forEach((item, index) => {
              for (let i = 0, len = todayData.length; i < len; i += 1) {
                const elementData = item[[todayData[i].ch]];
                if (elementData < todayData[i].minData) {
                  todayData[i].minData = elementData;
                  todayData[i].minTime = item.dataTime;
                }
                if (elementData !== 32767 && elementData > todayData[i].maxData) {
                  todayData[i].maxData = elementData;
                  todayData[i].maxTime = item.dataTime;
                }
                if (elementData !== 32767) {
                  todayData[i].sumData += elementData;
                  todayData[i].add += 1;
                }
                if (index === data.length - 1) {
                  todayData[i].avgData = Math.round(todayData[i].sumData / todayData[i].add);
                }
              }
            });
            todayData.forEach((item) => {
              item.minData = this.accMul(item.minData, parseFloat(item.prec));
              item.maxData = this.accMul(item.maxData, parseFloat(item.prec));
              item.avgData = this.accMul(item.avgData, parseFloat(item.prec));
            });
            this.todayData = todayData;
            this.$forceUpdate();
          }
        })
        .catch();
    },
    beforeUploadDevice(file) {
      const suffixName = file.name.substring(file.name.lastIndexOf('.') + 1);
      const extension = suffixName === 'jpg';
      const extension2 = suffixName === 'png';
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!extension && !extension2) {
        this.$message.error(this.$t('home.overview.uploadTypeError'));
      }
      if (!isLt1M) {
        this.$message.error(this.$t('home.overview.uploadSizeError'));
      }
      // eslint-disable-next-line no-mixed-operators
      return (extension || extension2 && isLt1M);
    },
    handleUploaddCoverSuccess() {
      this.$forceUpdate();
    },
    handleSwitchChange(index, ch, num, value) {
      if (num < 32) {
        this.relayLoading[index] = true;
      } else {
        this.relayExtendLoading[index] = true;
      }

      this.$http
        .post(
          '/relay', {
            deviceId: this.currentDeviceId,
            relayNum: num,
            relayState: value,
          }, {
            headers: {
              token: this.token,
            },
          },
        )
        .then((response) => {
          if (num < 32) {
            this.relayLoading[index] = false;
          } else {
            this.relayExtendLoading[index] = false;
          }
          if (response.data) {
            this.$message.success(this.$t('home.control.controlSuccess'));
          } else {
            this.relayStateBit[num] = (value === 0 ? 1 : 0);
            this.$message.error(this.$t('home.control.controlError'));
          }
          this.$forceUpdate();
        })
        .catch(error => console.log(error));
    },
  },

  mounted() {
    this.token = sessionStorage.getItem('token');
    if (this.currentDeviceId) {
      setTimeout(() => {
        this.getDeviceInfo(this.currentDeviceId);
        this.getDeviceData(this.currentDeviceId);
        this.tableDraw(this.currentDeviceId);
      }, 1000);
    }
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
      if (this.currentDeviceId) {
        this.getDeviceInfo(this.currentDeviceId);

        setTimeout(() => {
          this.getDeviceData(this.currentDeviceId);
          this.tableDraw(this.currentDeviceId);
        }, 500);
      }
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
}

.title {
  text-align: left;
  color: white;
  border-bottom: 2px solid white;
  padding: 0 5px 5px 5px;
  font-size: 0.8em;
}

.element-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-left: 15px;
}

.element-card {
  width: 180px;
  height: 80px;
  margin: 5px;
  display: flex;
  border: 0;
  border-radius: 0;
}

.image {
  width: 48px;
  height: 48px;
}

.element-name {
  color: rgb(255, 255, 255);
}

.element-data {
  margin-top: 15px;
  color: rgb(255, 255, 255);
}

.el-table {
  margin: 15px 20px 20px 20px;
  width: 1100px;
  background: transparent;
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

.device-cover {
  height: 290px;
  border: 0;
  border-radius: 0;
  margin: 10px 20px 20px 0;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
}

.relay-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-left: 10px;
}

.switch-card {
  width: 150px;
  height: 80px;
  margin: 0 5px 0 0;
  border: 0;
  border-radius: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
}
</style>
