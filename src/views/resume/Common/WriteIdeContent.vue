<template>
  <div class="jm-container">
    <!-- <WriteResumeTemplate3/> -->
    <TemplateNames/>
  </div>
</template>

<script>
import Bus from '@/assets/event-bus.js' 
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
  if (name == "Template" + templateId) {
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
  methods:{
  // // 获取简历信息
  //   // 调用接口，判断获取该模板中是否已经填写过内容，如果是，直接将数据回填
  //   getTemplatesResume(){
  //     console.log(this.$route.query.id,"11111")
  //     this.axios
  //       .get("resumeTemplates/getTemplatesResume", {
  //         params: {
  //        userName: localStorage.getItem("userName") //暂时写死，到时候用vuex
  //       }
  //       // ,
  //       //   headers:{
  //       //     token:"jack"
  //       //   }
  //       })
  //       .then(res => {
  //         if (res.data.status == "0") {
  //          var resumeTemplateObj = res.data.result;
  //         //  如果获取不到数据，就不执行，防止后面获取属性值：null.xxx报错
  //          if(!resumeTemplateObj){
  //            return
  //          }
  //         //  将数据获取后传递到各个模板简历上
  //          Bus.$emit('getTemplatesResume',resumeTemplateObj)
  //         //  console.log(resumeList)
  //         }
  //       })
  //       .catch(err => {});
  //   }
  },

  mounted() {
    // this.getTemplatesResume();
  },
  beforeCreate(){
  },
  created() {}
};
</script>

<style lang="less" scoped>
.jm-container {
  // position: fixed;
  // width: 70px;
      // height: 3480px;
    min-height: 1160px;
  background: #fff;
  margin-right: 5px;
  margin-left:100px;
  margin-top: 30px;
  
}
</style>
