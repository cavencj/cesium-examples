<template>
  <div class="sidebar">
    <i-menu theme="dark">
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
import menu_data from '@/data/menu.json'
const name = 'Sidebar'
export default {
  name,
  data() {
    return {
      menuData: menu_data
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
