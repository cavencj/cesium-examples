<template>
  <div class="ly-content">
    <router-view></router-view>
  </div>
</template>
<script>
const name = 'Content'
export default {}
</script>

<style lang="scss" scoped>
.ly-content {
  width: 100%;
  height: calc(100% - 61px);
  overflow: hidden;
}
</style>
