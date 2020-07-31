<template>
  <div class="content">
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
    <div class="video5">
      <video
        id="video5"
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
    <div class="video6">
      <video
        id="video6"
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
    <div class="video7">
      <video
        id="video7"
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
    <div class="video8">
      <video
        id="video8"
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
    <div class="video9">
      <video
        id="video9"
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
</template>

<script>
export default {
  name: 'video',

  data() {
    return {
      videoList: [{
        channel: 1,
        flv: 'https://flvopen.ys7.com:9188/openlive/875dd26d043a43419b87fb4659bf31c9.flv',
      }, {
        channel: 2,
        flv: 'https://flvopen.ys7.com:9188/openlive/2843e65ebd5e423f8870146fb16de9c8.flv',
      }, {
        channel: 3,
        flv: 'https://flvopen.ys7.com:9188/openlive/37dc3bb2e834497280293a778a1133ab.flv',
      }, {
        channel: 5,
        flv: 'https://flvopen.ys7.com:9188/openlive/c84da35c642f4e28b77254132e2cea11.flv',
      }, {
        channel: 6,
        flv: 'https://flvopen.ys7.com:9188/openlive/c84da35c642f4e28b77254132e2cea11.flv',
      }, {
        channel: 7,
        flv: 'https://flvopen.ys7.com:9188/openlive/e7b16a2e14e74d6789de91714f9ccae1.flv',
      }, {
        channel: 9,
        flv: 'https://flvopen.ys7.com:9188/openlive/1397b61d665e4a03b3350d8b7b800d83.flv',
      }, {
        channel: 10,
        flv: 'https://flvopen.ys7.com:9188/openlive/1397b61d665e4a03b3350d8b7b800d83.flv',
      }, {
        channel: 11,
        flv: 'https://flvopen.ys7.com:9188/openlive/1397b61d665e4a03b3350d8b7b800d83.flv',
      }, {
        channel: 17,
        flv: 'https://flvopen.ys7.com:9188/openlive/e38f93f52d9d4dc29abb21a035d800dc.flv',
      }, {
        channel: 18,
        flv: 'https://flvopen.ys7.com:9188/openlive/034a740930cf4722ac7569d9236eefdf.flv',
      }, {
        channel: 20,
        flv: 'https://flvopen.ys7.com:9188/openlive/8771c2c8a0b84e6bad53a754c10f2536.flv',
      }],
    };
  },

  methods: {
    videoLoad() {
      if (flvjs.isSupported()) {
        for (let i = 0; i < 9; i += 1) {
          const video = document.getElementById(`video${i + 1}`);
          const flvPlayer = flvjs.createPlayer({
            type: 'flv',
            url: this.videoList[i].flv,
          });
          flvPlayer.attachMediaElement(video);
          flvPlayer.load();
          flvPlayer.play();
        }
      }
    },

  },

  mounted() {
    this.videoLoad();
  },

};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  position: relative;
}

.video1 {
  top: 1%;
  left: 1%;
  width: 32%;
  height: 32%;
  position: absolute;
}
.video2 {
  top: 1%;
  left: 34%;
  width: 32%;
  height: 32%;
  position: absolute;
}
.video3 {
  top: 1%;
  left: 67%;
  width: 32%;
  height: 32%;
  position: absolute;
}

.video4 {
  top: 34%;
  left: 1%;
  width: 32%;
  height: 32%;
  position: absolute;
}
.video5 {
  top: 34%;
  left: 34%;
  width: 32%;
  height: 32%;
  position: absolute;
}
.video6 {
  top: 34%;
  left: 67%;
  width: 32%;
  height: 32%;
  position: absolute;
}

.video7 {
  top: 67%;
  left: 1%;
  width: 32%;
  height: 32%;
  position: absolute;
}
.video8 {
  top: 67%;
  left: 34%;
  width: 32%;
  height: 32%;
  position: absolute;
}
.video9 {
  top: 67%;
  left: 67%;
  width: 32%;
  height: 32%;
  position: absolute;
}

.video-content {
  width: 100%;
  height: 100%;
}
</style>
