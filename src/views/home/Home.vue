<template>
  <div class="home">
    <div class="header">
      <div class="headline">智慧农业管理中心</div>
      <!-- 全屏按钮 -->
      <el-button
        type="text"
        :icon="fullScreen ? 'icon-third-tuichuquanping' : 'icon-third-quanping'"
        class="fullscreen-button"
        @click="handleToggleFullScreen"
      ></el-button>
    </div>
    <div class="content">
      <div class="datetime">
        <span class="top-left"></span>
        <span class="top-right"></span>
        <span class="bottom-left"></span>
        <span class="bottom-right"></span>
        <div class="title">日期时间</div>
        <div class="date">
          <div>{{date}}</div>
        </div>
        <div class="time">
          <div class="hour" v-if="time">
            {{time.slice(0, 2)}}
          </div>
          <span style="line-height: 70px; margin-left: 15px; margin-right: 15px;">:</span>
          <div class="hour" v-if="time">
            {{time.slice(3, 5)}}
          </div>
          <span style="line-height: 70px; margin-left: 15px; margin-right: 15px;">:</span>
          <div class="hour" v-if="time">
            {{time.slice(6, 8)}}
          </div>
        </div>
      </div>
      <div class="todo">
        <span class="top-left"></span>
        <span class="top-right"></span>
        <span class="bottom-left"></span>
        <span class="bottom-right"></span>
        <div class="title">待办事项</div>
        <div class="todo-content">
          <el-input
            v-model="newTodo"
            placeholder="请输入待办事项 回车确认"
            size="mini"
            class="todo-input"
            @keyup.enter.native="handleEnterTodo"
          ></el-input>
          <el-table
            ref="todoListTable"
            :data="todoList"
            :show-header="false"
            size="mini"
            class="todo-table"
            @select="handleSelectTodo"
          >
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column label="标题" prop="title">
              <template slot-scope="scope">
                <span v-if="scope.row.completed" style="text-decoration: line-through; color: #909399;">{{scope.row.title}}</span>
                <span v-else style="color: #008cd9;">{{scope.row.title}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="50">
              <template slot-scope="scope">
                <el-button
                  icon="el-icon-circle-close"
                  type="text"
                  size="mini"
                  @click="handleClickDeleteTodo(scope.$index)"
                  class="todo-delete-button"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="weather">
        <span class="top-left"></span>
        <span class="top-right"></span>
        <span class="bottom-left"></span>
        <span class="bottom-right"></span>
        <div class="title">气象环境</div>
        <div class="weather-content">
          <div class="weather-element">
            <div class="weather-element-icon">
              <i class="icon-third-fengsu" style="font-size: 50px; margin-top: -5px;"></i>
            </div>
            <div>1.5 m/s</div>
            <div>风速</div>
            <div>Windspeed</div>
          </div>
          <div class="weather-element">
            <div class="weather-element-icon">
              <i class="icon-third-fengxiang" style="font-size: 50px; margin-left: 8px;"></i>
            </div>
            <div>正北</div>
            <div>风向</div>
            <div>Winddirection</div>
          </div>
          <div class="weather-element">
            <div class="weather-element-icon">
              <i class="icon-third-wendu" style="font-size: 50px; margin-left: 5px;"></i>
            </div>
            <div>{{weather.temperature}} ℃</div>
            <div>温度</div>
            <div>Temperature</div>
          </div>
          <div class="weather-element">
            <div class="weather-element-icon">
              <i class="icon-third-shidu" style="font-size: 50px; margin-left: 5px;"></i>
            </div>
            <div>{{weather.humidity}} %RH</div>
            <div>湿度</div>
            <div>Humidity</div>
          </div>
          <div class="weather-element">
            <div class="weather-element-icon">
              <i class="icon-third-qiya" style="font-size: 50px; margin-left: 5px;"></i>
            </div>
            <div>1001.2 hPa</div>
            <div>气压</div>
            <div>Pressure</div>
          </div>
        </div>
      </div>
      <div class="control-log">
        <span class="top-left"></span>
        <span class="top-right"></span>
        <span class="bottom-left"></span>
        <span class="bottom-right"></span>
        <div class="title">控制通知</div>
        <div class="control-log-content">
          <el-table
            :data="controlLog.list"
            size="mini"
            class="control-log-table"
            :header-cell-style="{'text-align':'center', color: '#008cd9'}"
            :cell-style="{'text-align':'center'}"
          >
            <el-table-column prop="createTime" :label="$t('date')" width="150"></el-table-column>
            <el-table-column prop="facId" label="ID" width="80"></el-table-column>
            <el-table-column prop="num" :label="$t('home.control.relayNum')" width="50"></el-table-column>
            <el-table-column prop="state" :label="$t('home.control.status')" width="60">
              <template slot-scope="scope">
                <span v-if="scope.row.state === 0" style="color: #E6A23C;">{{$t('home.control.break')}}</span>
                <span v-else style="color: #409EFF;">{{$t('home.control.close')}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="result" :label="$t('home.control.result')" width="60">
              <template slot-scope="scope">
                <span v-if="scope.row.result" style="color: #67C23A;">{{$t('home.control.success')}}</span>
                <span v-else style="color: #F56C6C;">{{$t('home.control.fail')}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="lysimeter">
        <span class="top-left"></span>
        <span class="top-right"></span>
        <span class="bottom-left"></span>
        <span class="bottom-right"></span>
        <div class="title">气象曲线</div>
        <div id="chart"></div>
      </div>
      <div class="notification">
        <span class="top-left"></span>
        <span class="top-right"></span>
        <span class="bottom-left"></span>
        <span class="bottom-right"></span>
        <div class="title">预警信息</div>
        <div class="notification-content"></div>
          <el-table
            :data="notification"
            size="mini"
            class="notification-table"
            :header-cell-style="{'text-align':'center', color: '#008cd9'}"
            :cell-style="{'text-align':'center'}"
          >
            <el-table-column prop="time" :label="$t('date')" width="135"></el-table-column>
            <el-table-column prop="deviceId" label="ID" width="75"></el-table-column>
            <el-table-column prop="type" label="类型" width="80"></el-table-column>
            <el-table-column prop="message" label="消息" show-overflow-tooltip></el-table-column>
          </el-table>
      </div>
      <div class="entry">
        <span class="top-left"></span>
        <span class="top-right"></span>
        <span class="bottom-left"></span>
        <span class="bottom-right"></span>
        <div class="title">主页入口</div>
        <div class="content">
          <div @click.capture="handleClickEntry('weather')">
            <i class="icon-third-weather"></i>
            <span>{{$t('navMenu.weather')}}</span>
          </div>
          <div @click.capture="handleClickEntry('fertilizer')">
            <i class="icon-third-shui"></i>
            <span>{{$t('navMenu.fertilizer')}}</span>
          </div>
          <div @click.capture="handleClickEntry('lysimeter')">
            <i class="icon-third-database"></i>
            <span>{{$t('navMenu.lysimeter')}}</span>
          </div>
          <div @click.capture="handleClickEntry('video')">
            <i class="el-icon-video-camera-solid"></i>
            <span>{{$t('navMenu.video')}}</span>
          </div>
        </div>
      </div>
      <div class="video1">
        <video
          id="video1"
          controls
          style="object-fit: fill;"
          webkit-playsinline
          playsinline
          x-webkit-airplay="allow"
          x5-video-player-type="h5"
          x5-video-player-fullscreen="true"
          x5-video-orientation="portraint"
          class="video-content"
          autoplay="autoplay"
          muted="muted"
        ></video>
      </div>
      <div class="video2">
        <video
          id="video2"
          controls
          style="object-fit: fill;"
          webkit-playsinline
          playsinline
          x-webkit-airplay="allow"
          x5-video-player-type="h5"
          x5-video-player-fullscreen="true"
          x5-video-orientation="portraint"
          class="video-content"
          autoplay="autoplay"
          muted="muted"
        ></video>
      </div>
      <div class="video3">
        <video
          id="video3"
          controls
          style="object-fit: fill;"
          webkit-playsinline
          playsinline
          x-webkit-airplay="allow"
          x5-video-player-type="h5"
          x5-video-player-fullscreen="true"
          x5-video-orientation="portraint"
          class="video-content"
          autoplay="autoplay"
          muted="muted"
        ></video>
      </div>
      <div class="video4">
        <video
          id="video4"
          controls
          style="object-fit: fill;"
          webkit-playsinline
          playsinline
          x-webkit-airplay="allow"
          x5-video-player-type="h5"
          x5-video-player-fullscreen="true"
          x5-video-orientation="portraint"
          class="video-content"
          autoplay="autoplay"
          muted="muted"
        ></video>
      </div>
    </div>
  </div>
</template>

<script>
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
  name: 'home',

  data() {
    return {
      fullScreen: false,
      date: '',
      time: '',
      newTodo: '',
      todoList: [
        { title: '上午8点开始灌溉', completed: true },
        { title: '下午5点结束灌溉', completed: false },
      ],
      lineChart: null,
      historys: [],
      element: [],
      controlLog: {},
      websocket: null,
      notification: [
        {
          time: '2019-12-23 08:00:00', deviceId: 16062693, type: '阈值报警', message: '通道1大于设定的阈值42',
        },
        { time: '2019-12-23 08:00:00', deviceId: 16062693, type: '阈值拍照' },
        { time: '2019-12-23 08:00:00', deviceId: 16062693, type: '阈值控制' },
        { time: '2019-12-23 08:00:00', deviceId: 16062693, type: '拍照完成' },
      ],
      operator: (arg) => {
        let ret = '';
        switch (arg) {
          case 0:
            ret = this.$t('operator.eq');
            break;
          case 1:
            ret = this.$t('operator.gt');
            break;
          case 2:
            ret = this.$t('operator.lt');
            break;
          case 3:
            ret = this.$t('operator.ge');
            break;
          case 4:
            ret = this.$t('operator.le');
            break;
          default:
            break;
        }
        return ret;
      },
      weather: {},
      flvPlayer1: null,
      flvPlayer2: null,
      flvPlayer3: null,
      flvPlayer4: null,
    };
  },

  methods: {
    handleToggleFullScreen() {
      const el = document.documentElement;
      if (this.fullScreen) { // 退出全屏
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (!document.msRequestFullscreen) {
          document.msExitFullscreen();
        }
      } else { // 进入全屏
        if (el.requestFullscreen) {
          el.requestFullscreen();
        } else if (el.mozRequestFullScreen) {
          el.mozRequestFullScreen();
        } else if (el.webkitRequestFullscreen) {
          el.webkitRequestFullscreen();
        } else if (el.msRequestFullscreen) {
          el.msRequestFullscreen();
        }
      }
      this.fullScreen = !this.fullScreen;
    },

    handleClickEntry(name) {
      this.$router.push(`/${name}`);
      switch (name) {
        case 'weather':
          this.$store.commit('currentDeviceId', { currentDeviceId: 16065522 });
          break;
        default:
          break;
      }
    },

    updateDatetime() {
      this.date = moment().format('YYYY/MM/DD dddd');
      this.time = moment().format('HH:mm:ss');
    },

    handleEnterTodo() {
      if (this.todoList.length < 8) {
        if (this.newTodo.length > 0) {
          this.todoList.push({ title: this.newTodo, completed: false });
          this.newTodo = '';
        }
      } else {
        this.$message.error('待办事项已达上限');
      }
    },

    handleClickDeleteTodo(index) {
      this.todoList.splice(index, 1);
    },

    handleSelectTodo(selection, row) {
      row.completed = !row.completed;
      this.$refs.todoListTable.toggleRowSelection(row, row.completed);
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
        .catch(error => console.log(error));
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
          left: 50,
          top: 20,
          right: 20,
          bottom: 10,
        },
        xAxis: {
          data: data.map(item => item.dataTime),
          axisLine: {
            lineStyle: {
              color: '#0097e8',
            },
          },
          axisLabel: {
            interval: 0,
            rotate: 20,
            fontSize: 8,
            show: false,
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
              color: '#0097e8',
            },
          },
          axisTick: {
            show: false,
          },
        },
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

    getControlLog(deviceId, pageNum, pageSize) {
      this.controlLog.list = [];
      this.$http
        .get(`/controllog/${deviceId}?pageNum=${pageNum}&pageSize=${pageSize}`, {
          headers: {
            token: sessionStorage.getItem('token'),
          },
        })
        .then((response) => {
          if (response.status === 200) {
            if (this.controlLog.total) {
              this.controlLog.list = response.data.list;
              this.controlLog.nextPage = response.data.nextPage;
              this.controlLog.pageSize = response.data.pageSize;
              this.controlLog.pageNum = response.data.pageNum;
              this.controlLog.hasNextPage = response.data.hasNextPage;
              this.controlLog.total = response.data.total;
            } else {
              this.controlLog = response.data;
            }
          }
        })
        .catch();
    },

    initWebSocket() {
      const wsurl = `${this.$SERVER_SOCKET_URL}/ws/onstage`;
      this.websocket = new WebSocket(wsurl);
      this.websocket.onopen = this.websocketOnOpen;
      this.websocket.onmessage = this.websocketOnMessage;
      this.websocket.onerror = this.websocketOnError;
      this.websocket.onclose = this.websocketOnClose;
    },

    websocketOnOpen() {
      this.websocket.send(JSON.stringify({ deviceId: 16062693 }));
    },

    websocketOnMessage(e) {
      try {
        const message = JSON.parse(e.data);
        const { type, data, deviceId } = message;
        if (type) {
          switch (type) {
            case 'warning':
              if (data.message) {
                this.notification.unshift({
                  time: moment().format('YYYY-MM-DD HH:mm:ss'),
                  type: '阈值报警',
                  deviceId,
                  message,
                });
                this.notification = this.notification.slice(0, 7);
              } else {
                const msg = `${this.element[data.element].name} ${this.operator(data.operator)} ${this.$t('notify.defaultWarningMessage')}`;
                this.notification.unshift({
                  time: moment().format('YYYY-MM-DD HH:mm:ss'),
                  type: '阈值报警',
                  deviceId,
                  message: msg,
                });
                this.notification = this.notification.slice(0, 7);
              }
              break;
            case 'photo':
              {
                const msg = `${this.element[data.element].name} ${this.operator(data.operator)} ${this.$t('notify.defaultPhotoMessage')}`;
                this.notification.unshift({
                  time: moment().format('YYYY-MM-DD HH:mm:ss'),
                  type: '阈值拍照',
                  deviceId,
                  message: msg,
                });
                this.notification = this.notification.slice(0, 7);
              }
              break;
            case 'photoCompleted':
              this.notification.unshift({
                time: moment().format('YYYY-MM-DD HH:mm:ss'),
                type: '拍照完成',
                deviceId,
              });
              this.notification = this.notification.slice(0, 7);
              break;
            case 'control':
              {
                const msg = `${this.element[data.element].name} `
                + `${this.operator(data.operator)} ${this.$t('notify.defaultWarningMessage')} ${data.action === 1 ? this.$t('home.control.break') : this.$t('home.control.close')} `
                + `${this.relayElement.find(item => item.num === data.relay).name}`;
                this.notification.unshift({
                  time: moment().format('YYYY-MM-DD HH:mm:ss'),
                  type: '阈值控制',
                  deviceId,
                  message: msg,
                });
                this.notification = this.notification.slice(0, 7);
              }
              break;
            default:
              break;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    websocketOnError(e) {
      console.log('错误', e);
    },

    websocketOnClose(e) {
      console.log('断开连接', e);
    },

    getWeather(deviceId) {
      this.$http
        .get(`http://47.105.215.208:8005/intfa/queryData/${deviceId}`)
        .then((res) => {
          if (res.data) {
            this.weather.temperature = res.data.entity[2].eValue;
            this.weather.humidity = res.data.entity[3].eValue;
          }
        })
        .catch();
    },

    videoLoad() {
      if (flvjs.isSupported()) {
        const video1 = document.getElementById('video1');
        const flvPlayer1 = flvjs.createPlayer({
          type: 'flv',
          url: 'https://flvopen.ys7.com:9188/openlive/89f4f933c4db4733950deb8ffd0adf40.flv', // 14
        });
        flvPlayer1.attachMediaElement(video1);
        flvPlayer1.load();
        flvPlayer1.play();

        const video2 = document.getElementById('video2');
        const flvPlayer2 = flvjs.createPlayer({
          type: 'flv',
          url: 'https://flvopen.ys7.com:9188/openlive/1bc373316ab842dcbfb6500b82397048.flv', // 12
        });
        flvPlayer2.attachMediaElement(video2);
        flvPlayer2.load();
        flvPlayer2.play();

        const video3 = document.getElementById('video3');
        const flvPlayer3 = flvjs.createPlayer({
          type: 'flv',
          url: 'https://flvopen.ys7.com:9188/openlive/e38f93f52d9d4dc29abb21a035d800dc.flv', // 17
        });
        flvPlayer3.attachMediaElement(video3);
        flvPlayer3.load();
        flvPlayer3.play();

        const video4 = document.getElementById('video4');
        const flvPlayer4 = flvjs.createPlayer({
          type: 'flv',
          url: 'https://flvopen.ys7.com:9188/openlive/408ad501ce8e40858dbff211ee79ce07.flv', // 10
        });
        flvPlayer4.attachMediaElement(video4);
        flvPlayer4.load();
        flvPlayer4.play();
        this.flvPlayer1 = flvPlayer1;
        this.flvPlayer2 = flvPlayer2;
        this.flvPlayer3 = flvPlayer3;
        this.flvPlayer4 = flvPlayer4;
      }
    },

  },

  mounted() {
    this.initWebSocket();
    this.getElementInfo();
    this.getRelayInfo();
    setInterval(() => {
      this.updateDatetime();
    }, 500);
    this.lineChart = echarts.init(document.getElementById('chart'), 'light');
    window.onresize = () => {
      this.lineChart.resize();
    };
    this.getDeviceInfo(16062693);
    // this.getHistoryData(16062693, 1, 10);
    setTimeout(() => {
      this.getHistoryData(16062693, 1, 10);
    }, 2000);
    this.getControlLog(16062693, 1, 5);

    setInterval(() => {
      this.getWeather(16062693);
    }, 10000);
    this.videoLoad();
  },

  computed: {
    elementInfo() {
      return this.$store.state.elementInfo;
    },
    relayInfo() {
      return this.$store.state.relayInfo;
    },
  },
  beforeDestroy() {
    this.flvPlayer1.pause();
    this.flvPlayer1.unload();
    this.flvPlayer1.detachMediaElement();

    this.flvPlayer2.pause();
    this.flvPlayer2.unload();
    this.flvPlayer2.detachMediaElement();

    this.flvPlayer3.pause();
    this.flvPlayer3.unload();
    this.flvPlayer3.detachMediaElement();

    this.flvPlayer4.pause();
    this.flvPlayer4.unload();
    this.flvPlayer4.detachMediaElement();
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: url('../../assets/home_background.jpg') no-repeat;
  background-size: cover;
}

.header {
  width: 100%;
  height: 8%;
}

.headline {
  color: white;
  font-size: 20px;
  margin-top: 15px;
  user-select: none;
}

.fullscreen-button {
  position: absolute;
  right: 0.5%;
  top: 0;
}

.content {
  width: 100%;
  height: 92%;
  position: relative;
}

.top-left {
  position: absolute;
  left: -1px;
  top: 0px;
  padding: 10px;
  border-style: solid;
  border-color: #44a7df;
  border-width: 2px 0 0 2px;
}
.top-right {
  position: absolute;
  right: -1px;
  top: 0px;
  padding: 10px;
  border-style: solid;
  border-color: #44a7df;
  border-width: 2px 2px 0 0;
}
.bottom-left {
  position: absolute;
  left: -1px;
  bottom: 0px;
  padding: 10px;
  border-style: solid;
  border-color: #44a7df;
  border-width: 0 0 2px 2px;
}
.bottom-right {
  position: absolute;
  right: -1px;
  bottom: 0px;
  padding: 10px;
  border-style: solid;
  border-color: #44a7df;
  border-width: 0 2px 2px 0;
}

.el-table::before {
  height: 0;
}
.el-table >>> th {
  background-color: rgba(0, 0, 0, 0.2)!important;
}
.el-table >>> tr {
  border: 0;
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

.title {
  margin-top: 8px;
  margin-left: 5px;
  padding-top: 4px;
  font-size: 10px;
  color: #dfe5dd;
  width: 90px;
  height: 30px;
  background: url('../../assets/title_background.png') no-repeat;
  background-size: contain;
  user-select: none;
}

.datetime {
  top: 0;
  left: 1%;
  width: 19%;
  height: 23%;
  position: absolute;
  border: 0.5px solid rgba(68, 142, 168, 0.6);
  background: rgba(0, 0, 0, 0.1);
}
.datetime .date {
  color: white;
  font-size: 30px;
}
.datetime .time {
  font-family: 'DS-DIGI';
  color: white;
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
}
.datetime .time .hour {
  background: #008dd4;
  width: 60px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
}

.todo {
  top: 25%;
  left: 1%;
  width: 19%;
  height: 43%;
  position: absolute;
  border: 0.5px solid rgba(68, 142, 168, 0.6);
  background: rgba(0, 0, 0, 0.1);
}
.todo-content {
  display: flex;
  flex-direction: column;
  width: 90%;
}
.todo-input {
  background: transparent;
  color: white;
  margin-left: 5%;
}
.todo-input >>> input {
  background-color: rgba(0, 0, 0, 0);
  color: white;
  border: 2px solid #409EFF;
  border-radius: 15px;
}
.todo-table {
  background: transparent;
  margin-left: 5%;
}
.todo-delete-button {
  background: transparent;
  color: red;
}

.weather {
  top: 70%;
  left: 1%;
  width: 49%;
  height: 27%;
  position: absolute;
  border: 0.5px solid rgba(68, 142, 168, 0.6);
  background: rgba(0, 0, 0, 0.1);
}
.weather-content {
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 90%;
}
.weather-element {
  width: 160px;
  height: 90%;
  display: flex;
  flex-direction: column;
  color: #00aaff;
  justify-content: center;
  align-items: center;
}
.weather-element div:nth-child(2) {
  font-size: 25px;
}
.weather-element-icon {
  width: 110px;
  height: 110px;
  min-height: 110px;
  background: url('../../assets/element_background.png') no-repeat;
  background-size: contain;
  margin-top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.control-log {
  top: 70%;
  left: 51%;
  width: 23%;
  height: 27%;
  position: absolute;
  border: 0.5px solid rgba(68, 142, 168, 0.6);
  background: rgba(0, 0, 0, 0.1);
}
.control-log-table {
  background: transparent;
  margin-left: 5%;
  margin-top: -2%;
  color: #008cd9;
}

.lysimeter {
  top: 0;
  right: 1%;
  width: 24%;
  height: 24%;
  position: absolute;
  border: 0.5px solid rgba(68, 142, 168, 0.6);
  background: rgba(0, 0, 0, 0.1);
}
#chart {
  width: 100%;
  height: 85%;
  text-align: left;
  margin-top: -10px;
}

.notification {
  top: 26%;
  right: 1%;
  width: 24%;
  height: 36%;
  position: absolute;
  border: 0.5px solid rgba(68, 142, 168, 0.6);
  background: rgba(0, 0, 0, 0.1);
}
.notification-table {
  width: 90%;
  background: transparent;
  margin-left: 5%;
  margin-top: -2%;
  color: #008cd9;
}


.entry {
  top: 64%;
  right: 1%;
  width: 24%;
  height: 33%;
  position: absolute;
  border: 0.5px solid rgba(68, 142, 168, 0.6);
  background: rgba(0, 0, 0, 0.1);
}
.entry .content {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 82%;
}
.entry .content div {
  width: 40%;
  height: 40%;
  font-size: 20px;
  color: #052b86;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
}
.entry .content div span {
  margin-left: 10px;
}
.entry .content div:hover {
  cursor: pointer;
}
.entry .content div:nth-child(1) {
  background: #0cc58f;
  margin-left: 8%;
  margin-top: 4%;
}
.entry .content div:nth-child(2) {
  background: #2093dd;
  margin-left: 5%;
  margin-top: 4%;
}
.entry .content div:nth-child(3) {
  background: #8286e0;
  margin-left: 8%;
  margin-top: 2%;
}
.entry .content div:nth-child(4) {
  background: #e08982;
  margin-left: 5%;
  margin-top: 2%;
}

.video-content {
  width: 100%;
  height: 100%;
}

.video1 {
  top: 1%;
  left: 21%;
  width: 26%;
  height: 32%;
  position: absolute;
  border: 0.5px solid rgba(68, 142, 168, 0.6);
  background: url('../../assets/video.jpg') no-repeat;
  background-size: 100% 100%;
}
.video2 {
  top: 1%;
  left: 48%;
  width: 26%;
  height: 32%;
  position: absolute;
  border: 0.5px solid rgba(68, 142, 168, 0.6);
  background: url('../../assets/video.jpg') no-repeat;
  background-size: 100% 100%;
}
.video3 {
  top: 35%;
  left: 21%;
  width: 26%;
  height: 32%;
  position: absolute;
  border: 0.5px solid rgba(68, 142, 168, 0.6);
  background: url('../../assets/video.jpg') no-repeat;
  background-size: 100% 100%;
}
.video4 {
  top: 35%;
  left: 48%;
  width: 26%;
  height: 32%;
  position: absolute;
  border: 0.5px solid rgba(68, 142, 168, 0.6);
  background: url('../../assets/video.jpg') no-repeat;
  background-size: 100% 100%;
}
</style>
