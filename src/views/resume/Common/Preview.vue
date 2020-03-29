<template>

  <div>
 <img class="jm-upload-img" :src="dataUrl" />
  </div>
</template>
<script>
export default {
  name: "preview",
  data() {
    return {
        dataUrl:""
    };
  },
  watch: {},
  methods: {

   

  },
  mounted(){
      this.dataUrl = this.$route.params.dataUrl
  }
};
</script>
<style lang="less" scoped>

</style>