<template>
  <div id="app">
    
<keep-alive  include="['WriteResumeTemplate3','TemplateMall']">
    <router-view/>
</keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
} */
/* * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
} */
</style>
