<template>
  <div class="example-list">
    <sidebar></sidebar>
    <div class="list">
      <div v-for="data in exampleData" :key="data.name">
        <h2 :id="data.name">{{data.label}}</h2>
        <div class="line"></div>
        <div class="cards">
          <Card v-for="(item,index) in data.list" :key="index" class="card-item" style="cursor:pointer">
            <p slot="title" style="text-align:center">{{item.label}}</p>
            <img src="../../assets/logo.png" @click.prevent="gotoEidtor(item)">
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/sidebar'
import example_data from '@/data/example.json'
import { Card } from 'iview'
const name = 'ExampleList'
export default {
  name,
  data() {
    return {
      exampleData: example_data
    }
  },
  components: {
    Sidebar,
    Card
  },
  methods: {
    gotoEidtor(item) {
      this.$router.push('editor')
    }
  }
}
</script>

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
        margin: 10px 10px;
      }
    }
  }
}
</style>
