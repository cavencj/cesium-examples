<template>
  <div class="ly-head">
    <div class="title">
      Cesium Examples
    </div>
    <div class="menu">
      <i-menu mode="horizontal" @on-select="gotoPage" theme="dark" style="cursor:pointer">
        <menu-item name="/">主页</menu-item>
        <menu-item name="example-list">功能示例</menu-item>
        <submenu name="docs">
          <template slot="title">文档说明</template>
          <menu-item name="guide">开发指南</menu-item>
          <menu-item name="api">API文档</menu-item>
        </submenu>
        <submenu name="suport">
          <template slot="title">技术支持</template>
          <menu-item name="es6">ES6</menu-item>
          <menu-item name="html5">Html5</menu-item>
          <menu-item name="css3">Css3</menu-item>
          <menu-item name="cesium">Cesium</menu-item>
        </submenu>
      </i-menu>
    </div>
  </div>
</template>
<script>
import { Menu, MenuItem, Submenu } from 'iview'
const name = 'Head'
export default {
  name,
  components: {
    iMenu: Menu,
    MenuItem,
    Submenu
  },
  methods: {
    gotoPage(name) {
      if (['/', 'example-list', 'docs'].indexOf(name) >= 0) {
        this.$router.push(name)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.ly-head {
  width: 100%;
  height: 61px;
  display: flex;
  justify-content: space-between;
  border-bottom: 0.2px solid #cecece;
  background: #515a6e;
  .title {
    text-align: left;
    font-size: 20px;
    font-weight: bold;
    padding-left: 10px;
    line-height: 60px;
    display: inline-block;
    background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(rgb(7, 127, 224)), to(rgb(243, 243, 239)));
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>


