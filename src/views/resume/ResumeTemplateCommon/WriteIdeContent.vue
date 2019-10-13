<template>
  <div class="jm-container">
    <!-- <WriteResumeTemplate3/> -->
    <TemplateNames/>
  </div>
</template>

<script>
  
// 拿到url中的模板id
var urlPath = window.location.href;
if (urlPath.indexOf("?") != -1) {
  var str = urlPath.substr(1);
  var strs = str.split("=");
  var templateId = strs[1];
  console.log(templateId,"templateId")
}
// 使用webpack提供的前端自动加载文件的工程化方法
// 拿到用户跳转过来的简历模板id，只加载id对应的简历模板
var templateName;
//简历模板名称
const path = require("path");
// 3个参数分别对应着，需要检索的目录，是否检索子目录，匹配文件的正则表达式,一般是文件名
const files = require.context("./../WriteResumeTemplate", false, /\.vue$/);
// console.log(files,"获取文件，这里是一个函数")
// Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组
const modules = {};
files.keys().forEach(key => {
  const name = path.basename(key, '.vue')
  if (name == "WriteResumeTemplate" + templateId) {
    templateName = name;
    modules[templateName] = files(key).default || files(key);
    console.log(modules);
  }
})


export default {
  name: "WriteIdeContent",
  data() {
    return {};
  },
  // vue怎么用同一个组件标签表示不同的组件
  components: { TemplateNames: modules[templateName] },
  watch: {},

  mounted() {},
  beforeCreate(){
  },
  created() {}
};
</script>

<style lang="less" scoped>
.jm-container {
  // position: fixed;
  // width: 70px;
  background: #fff;
  margin-right: 5px;
  margin-left:100px;
  margin-top: 30px;
  
}
</style>
