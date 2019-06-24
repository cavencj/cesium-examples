<template>
  <div class="example-list">
    <sidebar :menu-data="menuData"></sidebar>
    <div class="list">
      <div v-for="data in exampleData" :key="data.name">
        <h2 :id="data.name">{{data.label}}</h2>
        <div class="line"></div>
        <div class="cards">
          <Card v-for="(item,index) in data.list" :key="index" class="card-item" style="cursor:pointer">
            <p slot="title" style="text-align:center">{{item.label}}</p>
            <img :src="getImagePath(data.name,item)" @click.prevent="gotoEidtor(data.name,item.key)">
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/sidebar'
import { Card } from 'iview'
import * as axios from 'axios'
const name = 'ExampleList'
export default {
  name,
  data() {
    return {
      menuData: [],
      exampleData: []
    }
  },
  components: {
    Sidebar,
    Card
  },
  methods: {
    getImagePath(folder, item) {
      return 'images/' + folder + '/' + item.key + '.' + (item.img_suffix || 'png')
    },
    gotoEidtor(folder, key) {
      this.$store.dispatch('setAnchor', folder + '/' + key)
      this.$router.push('editor')
    },
    getMenuData() {
      return axios.get('/config/menu.json')
    },
    getExampleData() {
      return axios.get('/config/example.json')
    }
  },
  mounted() {
    axios.all([this.getMenuData(), this.getExampleData()]).then(
      axios.spread((example, preview) => {
        this.menuData = example.data
        this.exampleData = preview.data
      })
    )
  }
}
</script>
<style lang="scss">
.example-list {
  .ivu-card-body {
    padding: 0px;
  }
}
</style>

<style lang="scss" scoped>
.example-list {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  .list {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 0 15px;
    h2 {
      padding-left: 10px;
      margin: 6px 0;
    }
    .line {
      width: 100%;
      height: 1px;
      background: #515a6e;
    }
    .cards {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .card-item {
        width: 250px;
        height: 250px;
        margin: 10px 15px;
        text-align: center;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
