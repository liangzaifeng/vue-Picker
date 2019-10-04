<template>
  <div id="app">
    <v-picker @handleCurrent="handleCurrent" :data="list" />
  </div>
</template>

<script>
import vPicker from "./components/v-picker.vue";

export default {
  name: "app",
  components: {
    vPicker
  },
  data() {
    return {
      list: [
        { text: "第1张" },
        { text: "第2张" },
        { text: "第3张" },
        { text: "第4张" },
        { text: "第5张" },
        { text: "第6张" },
        { text: "第7张" },
        { text: "第8张" },
        { text: "第9张" },
        { text: "第10张" },
        { text: "第11张" },
        { text: "第12张" }
      ]
    };
  },
  methods: {
    handleCurrent(item, index) {
      console.log(item, index);
    }
  }
};
</script>

<style>
</style>
