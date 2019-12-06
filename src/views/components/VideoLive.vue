<template>
  <div>
    <el-card
      v-for="(item, index) in videos"
      :key="index"
      class="video-card"
    >
      <div>
        <video
          :id="item.serialNumber"
          controls
          width="100%"
          poster="http://47.105.215.208:8081/images/摄像机.jpg"
        ></video>
      </div>
      <div>
        <el-button type="primary" @click="load(index)">加载</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'videoLive',
  data() {
    return {
      videos: [],
    };
  },
  methods: {
    load(index) {
      const videoElement = document.getElementById(this.videos[index].serialNumber);
      const flvPlayer = flvjs.createPlayer({
        type: 'flv',
        url: this.videos[index].flv,
      });
      flvPlayer.attachMediaElement(videoElement);
      flvPlayer.load();
      flvPlayer.play();
    },
  },
  mounted() {
    this.$http
      .get('/video', {
        params: {
          username: sessionStorage.getItem('username'),
        },
        headers: {
          token: sessionStorage.getItem('token'),
        },
      })
      .then((response) => {
        this.videos = JSON.parse(JSON.stringify(response.data));
      })
      .catch(error => console.log(error));
  },
};
</script>

<style scoped>
.video-card {
  width: 480px;
  height: 400px;
  float: left;
}
</style>
