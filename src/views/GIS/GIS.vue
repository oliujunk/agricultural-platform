<template>
  <div class="location">
    <div id="map" class="map-container"></div>
    <el-dialog
      title="数据预览"
      :visible.sync="dialogPreviewVisible"
      :modal="false"
      width="400px"
    >
      <el-card class="preview-card">
        <div slot="header">
          <span>设备名称：{{currentDevice.deviceName}}</span>
          <!-- <el-button type="primary" size="mini" style="float: right;" @click="handleClickDetail">详情</el-button> -->
        </div>
        <div v-if="currentDevice.entity">更新时间：{{currentDevice.entity[0].datetime}}</div>
        <div v-for="(item, index) in currentDevice.entity" :key="index">
          {{`${item.eName}: ${item.eValue} ${item.eUnit}`}}
        </div>
      </el-card>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'location',
  data() {
    return {
      map: null,
      position: [
        {
          longitude: 116.5753, latitude: 36.0554, name: '岱岳区夏张气象观测站', devicdId: 10004164,
        },
        {
          longitude: 117.0002, latitude: 35.5929, name: '岱岳区马庄气象观测站', devicdId: 10004170,
        },
        {
          longitude: 116.5408, latitude: 36.1407, name: '岱岳区道朗气象观测站', devicdId: 10004171,
        },
        {
          longitude: 117.2548, latitude: 36.0954, name: '岱岳区角峪气象观测站', devicdId: 10004173,
        },
        {
          longitude: 117.0540, latitude: 36.1247, name: '岱岳区粥店气象观测站', devicdId: 10004176,
        },
        {
          longitude: 117.0747, latitude: 35.5858, name: '岱岳区大汶口气象观测站', devicdId: 10004168,
        },
        {
          longitude: 117.1554, latitude: 36.1359, name: '岱岳区山口气象观测站', devicdId: 10004090,
        },
        {
          longitude: 117.2008, latitude: 36.1439, name: '岱岳区祝阳气象观测站', devicdId: 10004091,
        },
        {
          longitude: 117.0429, latitude: 36.0400, name: '岱岳区满庄自动站', devicdId: 10004094,
        },
        {
          longitude: 117.0059, latitude: 36.1100, name: '泰安京沪高速交通站', devicdId: 10004135,
        },
        {
          longitude: 117.2217, latitude: 36.1254, name: '岱岳区范镇自动站', devicdId: 10004503,
        },
        {
          longitude: 117.2423, latitude: 36.0817, name: '角峪镇+先锋村', devicdId: 10004089,
        },
        {
          longitude: 117.265998, latitude: 35.971766, name: '泰安良庄智能温室', devicdId: 16062693,
        },
        {
          longitude: 116.774829, latitude: 36.1711, name: '肥城果实生长监测', devicdId: 16065522,
        },
        { longitude: 117.264758, latitude: 35.972146, name: '蒸渗仪' },
        { longitude: 117.264762, latitude: 35.972146, name: '1#桶' },
        { longitude: 117.264764, latitude: 35.972146, name: '2#桶' },
        { longitude: 117.264766, latitude: 35.972146, name: '3#桶' },
        { longitude: 117.264768, latitude: 35.972146, name: '4#桶' },
      ],
      dialogPreviewVisible: false,
      currentDevice: {},
    };
  },
  methods: {
    handleClickDetail() {

    },
  },
  mounted() {
    const map = new AMap.Map('map', {
      resizeEnable: true,
      zoom: 10,
      center: [117.0429, 35.9400],
    });
    AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], () => {
      const scale = new AMap.Scale();
      map.addControl(scale);
      map.add([new AMap.TileLayer.RoadNet()]);
    });

    const markerIcon = new AMap.Icon({
      size: new AMap.Size(50, 50),
      image: 'http://115.28.187.9:8081/images/onstage/location.png',
      imageSize: new BMap.Size(50, 50),
    });

    const markers = [];
    for (let i = 0; i < this.position.length; i += 1) {
      const marker = new AMap.Marker({
        position: new AMap.LngLat(this.position[i].longitude, this.position[i].latitude),
        icon: markerIcon,
        label: {
          content: this.position[i].name,
          direction: 'top',
        },
      });
      marker.on('click', () => {
        this.dialogPreviewVisible = true;
        this.$http
          .get(`/intfa/queryData/${this.position[i].devicdId}`)
          .then((res) => {
            this.currentDevice = res.data;
          })
          .catch(error => console.log(error));
      });
      markers.push(marker);
    }
    map.add(markers);

    this.map = map;
  },
};
</script>

<style lang="scss" scoped>
.location {
  width: 100%;
  height: 100%;
  .map-container {
    width: 100%;
    height: 100%;
  }
}

.location::v-deep .amap-logo {
  display: none;
  opacity:0 !important;
}
.location::v-deep .amap-copyright {
  display: none;
  opacity:0 !important;
}

.preview-card {
  text-align: left;
}
</style>
