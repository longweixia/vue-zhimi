<template>
  <div class="jm-sider">
    <ul class="jm-ul">
      <li class="jm-li">
        <div class="jm-text">案例</div>
        <div class="jm-msg">点击下方按钮,查看其他用户填写的简历范例</div>
        <Button @click="showCase" class="jm-btn" type="info" icon="ios-search">查看案例</Button>
        <div class="jm-line"></div>
      </li>
      <li class="jm-li">
        <div class="jm-text">贴士</div>
        <div class="jm-msg">点击下方按钮,查看其他用户填写的简历范例</div>
        <Button class="jm-btn" type="info" icon="ios-search">查看案例</Button>
        <div class="jm-line"></div>
      </li>
    </ul>
       <Drawer title="推荐案例" :closable="false" v-model="value1">
        <div>
          <TemplateNames></TemplateNames>
        </div>
    </Drawer>
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
  if (name == "Template" + templateId) {
    templateName = name;
    modules[templateName] = files(key).default || files(key);
    console.log(modules);
  }
})
export default {
  name: "WriteIdeSiderRight",
  data() {
    return {
      value1:false
    };
  },
  components: {TemplateNames: modules[templateName]},
  watch: {},
  methods:{
    showCase(){
      this.value1 = true
    }
  },
  mounted() {},
  created() {}
};
</script>

<style lang="less" scoped>
.jm-sider {
  // position: fixed;
  // width: 70px;
  background: #00c091;
  padding-right: 100px;
  margin-top: 30px;
  .jm-ul {
    .jm-li {
      background: #fff;
      text-align: center;
      .jm-text {
        // margin-top:10px;
        font-size: 18px;
        color: #525867;
        padding-top: 10px;
      }
      .jm-msg {
        padding:0 20px;
        color: #a4aab9;
        font-size: 14px;
      }
      .jm-btn{
        margin-top:10px;
        margin-bottom: 10px;
        font-size:16px;
        font-weight: bold;
      }
      .jm-line {
        background: #00c091;
        height: 5px;
      }
    }
  }
}
/deep/ .ivu-drawer-right{
  width: 864px!important;
}
/deep/ .ivu-drawer-body>div{
  width: 814px;
}
</style>
