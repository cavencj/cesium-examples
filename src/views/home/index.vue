<template>
  <div class="home">
    <div class="map-container" id="map-container"></div>
    <div class="animate">{{animateText}}</div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      animateText: ''
    }
  },
  methods: {
    initViewer() {
      let viewer = new Cesium.Viewer('map-container', {
        baseLayerPicker: false,
        animation: false,
        homeButton: false,
        selectionIndicator: false,
        navigationHelpButton: false,
        fullscreenButton: false,
        timeline: false,
        geocoder: false,
        sceneModePicker: false,
        imageryProvider: new Cesium.UrlTemplateImageryProvider({
          url: 'http://mt1.google.cn/vt/lyrs=m@207000000&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=Galile'
        })
      })
      viewer.cesiumWidget._creditContainer.style.display = 'none'
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(114.406534, 30.566363, 18061284),
        orientation: {
          heading: Cesium.Math.toRadians(0),
          pitch: Cesium.Math.toRadians(-90),
          roll: Cesium.Math.toRadians(0)
        },
        duration: 0
      })
      viewer.clock.multiplier = 200
      viewer.clock.shouldAnimate = !0
      this.rotate(viewer)
    },
    rotate(viewer) {
      let second = viewer.clock.currentTime.secondsOfDay
      viewer.clock.onTick.addEventListener(function(clock) {
        let current = viewer.clock.currentTime.secondsOfDay
        let diff = (current - second) / 1e3
        second = current
        viewer.scene.camera.rotate(Cesium.Cartesian3.UNIT_Z, -1 * diff)
      })
    },
    startAnimate() {
      let text = ' 带 你 走 进 3D 的 世 界 '
      let i = 0
      let index = setInterval(() => {
        if (i === text.length) {
          return clearInterval(index)
        }
        this.animateText = text.substr(0, i % text.length)
        i++
      }, 100)
    }
  },
  mounted() {
    this.initViewer()
    this.startAnimate()
  }
}
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .map-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .animate {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    font-size: 35px;
    width: 100%;
    height: 100%;
    text-align: center;
    padding-top: 25%;
    user-select: none;
    pointer-events: none;
    font-weight: bold;
    color: rgba(218, 68, 23, 0.514);
  }
}
</style>
