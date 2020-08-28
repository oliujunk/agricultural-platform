import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'xe-utils';
import VXETable from 'vxe-table';
import 'vxe-table/lib/index.css';

import axios from 'axios';
import Viewer from 'v-viewer';

import VXETablePluginExportXLSX from 'vxe-table-plugin-export-xlsx';

import App from '@/App.vue';
import router from '@/router/index';
import i18n from '@/i18n/i18n';
import store from '@/store/index';
import '@/assets/icon/iconfont.css';
import 'viewerjs/dist/viewer.css';
import '@/styles/index.css';

Vue.config.productionTip = false;

let SERVER_API_URL = '';
let SERVER_SOCKET_URL = '';
let API_BASE_URL = '';

if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://47.105.215.208:8005';
  SERVER_API_URL = 'http://47.105.215.208:9000';
  API_BASE_URL = 'http://47.105.215.208:8005';
  SERVER_SOCKET_URL = 'ws://47.105.215.208:9000';
} else {
  // axios.defaults.baseURL = 'http://127.0.0.1:8005';
  // API_BASE_URL = 'http://127.0.0.1:8005';
  // SERVER_API_URL = 'http://127.0.0.1:9001';
  // SERVER_SOCKET_URL = 'ws://127.0.0.1:9001';
  axios.defaults.baseURL = 'http://47.105.215.208:8005';
  SERVER_API_URL = 'http://47.105.215.208:9000';
  API_BASE_URL = 'http://47.105.215.208:8005';
  SERVER_SOCKET_URL = 'ws://47.105.215.208:9000';
}

Vue.http = Vue.prototype.$http = axios;

Vue.prototype.$SERVER_API_URL = SERVER_API_URL;
Vue.prototype.$SERVER_SOCKET_URL = SERVER_SOCKET_URL;
Vue.prototype.$API_BASE_URL = API_BASE_URL;

moment.locale('zh-cn', {
  months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
  monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
  weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
  weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
  weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'YYYY-MM-DD',
    LL: 'YYYY年MM月DD日',
    LLL: 'YYYY年MM月DD日Ah点mm分',
    LLLL: 'YYYY年MM月DD日ddddAh点mm分',
    l: 'YYYY-M-D',
    ll: 'YYYY年M月D日',
    lll: 'YYYY年M月D日 HH:mm',
    llll: 'YYYY年M月D日dddd HH:mm',
  },
  meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
  meridiemHour(hour, meridiem) {
    if (hour === 12) {
      hour = 0;
    }
    if (meridiem === '凌晨' || meridiem === '早上'
          || meridiem === '上午') {
      return hour;
    } if (meridiem === '下午' || meridiem === '晚上') {
      return hour + 12;
    }
    return hour >= 11 ? hour : hour + 12;
  },
  meridiem(hour, minute) {
    const hm = hour * 100 + minute;
    if (hm < 600) {
      return '凌晨';
    } if (hm < 900) {
      return '早上';
    } if (hm < 1130) {
      return '上午';
    } if (hm < 1230) {
      return '中午';
    } if (hm < 1800) {
      return '下午';
    }
    return '晚上';
  },
  calendar: {
    sameDay: '[今天]LT',
    nextDay: '[明天]LT',
    nextWeek: '[下]ddddLT',
    lastDay: '[昨天]LT',
    lastWeek: '[上]ddddLT',
    sameElse: 'L',
  },
  dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
  ordinal(number, period) {
    switch (period) {
      case 'd':
      case 'D':
      case 'DDD':
        return `${number}日`;
      case 'M':
        return `${number}月`;
      case 'w':
      case 'W':
        return `${number}周`;
      default:
        return number;
    }
  },
  relativeTime: {
    future: '%s内',
    past: '%s前',
    s: '几秒',
    ss: '%d秒',
    m: '1分钟',
    mm: '%d分钟',
    h: '1小时',
    hh: '%d小时',
    d: '1天',
    dd: '%d天',
    M: '1个月',
    MM: '%d个月',
    y: '1年',
    yy: '%d年',
  },
  week: {
    // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
    dow: 1, // Monday is the first day of the week.
    doy: 4, // The week that contains Jan 4th is the first week of the year.
  },
});

Vue.use(ElementUI);
VXETable.use(VXETablePluginExportXLSX);
Vue.use(VXETable);

Vue.use(Viewer, {
  defaultOptions: {
    navbar: false,
    toolbar: {
      zoomIn: true,
      zoomOut: true,
      oneToOne: true,
      reset: true,
      prev: false,
      play: true,
      next: false,
      rotateLeft: true,
      rotateRight: true,
      flipHorizontal: true,
      flipVertical: true,
    },
  },
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
