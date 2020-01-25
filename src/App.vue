<template>
  <div id="app">
    <DietasPage />
  </div>
</template>

<script>
/* import HelloWorld from "./components/HelloWorld.vue"; */
import DietasPage from "./components/DietasPage.vue";

export default {
  title: "Dietas y Kms",
  name: "app",
  components: {
    DietasPage
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
