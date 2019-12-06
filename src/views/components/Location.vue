<template>
  <div
    class="location"
  >
    <div id="baidu-map" class="baidu-map-container"></div>
    <el-input
      id="location-search"
      :placeholder="$t('location.locationSearchPlaceholder')"
      v-model="searchLocation"
      clearable
      prefix-icon="el-icon-search"
      class="location-search"
      @change="handleSearchChange"
    >
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'location',
  data() {
    return {
      devices: null,
      searchLocation: null,
      map: null,
      center: null,
    };
  },
  methods: {
    handleSearchChange(value) {
      const myGeo = new BMap.Geocoder();
      if (value.indexOf(',') === -1) {
        myGeo.getPoint(value, (point) => {
          if (point) {
            this.center = point;
            this.map.centerAndZoom(point, 16);
            this.map.addOverlay(new BMap.Marker(point));
          }
        });
      } else {
        const lngLat = value.split(',');
        const point = new BMap.Point(parseFloat(lngLat[0].trim()), parseFloat(lngLat[1].trim()));
        this.center = point;
        this.map.centerAndZoom(point, 16);
        this.map.addOverlay(new BMap.Marker(point));
      }
    },
  },
  mounted() {
    const username = sessionStorage.getItem('username');

    const map = new BMap.Map('baidu-map');
    const point = new BMap.Point(114.426986, 30.436675);
    map.centerAndZoom(point, 6);
    map.enableScrollWheelZoom(true);
    // 缩放控件
    map.addControl(new BMap.NavigationControl({
      offset: new BMap.Size(10, 70),
      anchor: BMAP_ANCHOR_TOP_RIGHT,
    }));

    // 比例尺控件
    map.addControl(new BMap.ScaleControl({
      offset: new BMap.Size(80, 25),
      anchor: BMAP_ANCHOR_BOTTOM_LEFT,
    }));

    // 地图类型控件
    map.addControl(new BMap.MapTypeControl({
      offset: new BMap.Size(10, 10),
      anchor: BMAP_ANCHOR_TOP_RIGHT,
      mapTypes: [BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP],
    }));

    const myIcon = new BMap.Icon('http://47.105.215.208:8081/images/onstage/location.png', new BMap.Size(50, 50), {
      anchor: new BMap.Size(10, 25),
      imageSize: new BMap.Size(50, 50),
    });
    this.map = map;
    this.center = point;

    this.$http
      .get(`/user/${username}`, {
        headers: {
          token: sessionStorage.getItem('token'),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const { data } = response;
          this.devices = JSON.parse(JSON.stringify(data.devices));
          for (let i = 0; i < this.devices.length; i += 1) {
            const marker = new BMap.Marker(new BMap.Point(this.devices[i].longitude, this.devices[i].latitude), { icon: myIcon });
            marker.addEventListener('click', (e) => {
              console.log(e);
              for (let j = 0; j < this.devices.length; j += 1) {
                if (e.target.Xz.lng === this.devices[j].longitude && e.target.Xz.lat === this.devices[j].latitude) {
                  this.$store.commit('currentDeviceId', { currentDeviceId: this.devices[j].facId });
                  this.$router.push('/home');
                  break;
                }
              }
            });
            map.addOverlay(marker);
          }
        }
      })
      .catch(error => console.log(error));
  },
};
</script>

<style lang="scss" scoped>
.location {
  width: 100%;
  height: 100%;
  .baidu-map-container {
    width: 100%;
    height: 100%;
  }

  .location-search {
    position: fixed;
    top: 100px;
    left: 250px;
    width: 350px;
  }
}

.el-select .el-input {
    width: 130px;
  }

</style>
