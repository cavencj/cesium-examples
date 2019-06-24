<template>
  <div class="sidebar">
    <i-menu theme="dark" accordion>
      <template v-for="item in menuData">
        <menu-item v-if="!item.children" :key="item.label" :name="item.name"> {{item.label }}</menu-item>
        <submenu v-if="!!item.children" :key="item.label" :name="item.name">
          <template slot="title">
            {{item.label }}
          </template>
          <menu-item v-for=" child in item.children" :key="child.label" :name="child.name">
            {{child.label}}
          </menu-item>
        </submenu>
      </template>
    </i-menu>
  </div>
</template>

<script>
import { Menu, MenuItem, Submenu } from 'iview'
const name = 'Sidebar'
export default {
  name,
  props: {
    menuData: {
      type: Array,
      defalut() {
        return []
      }
    }
  },
  components: {
    iMenu: Menu,
    MenuItem,
    Submenu
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  width: 240px;
  height: 100%;
  background: #515a6e;
}
</style>
