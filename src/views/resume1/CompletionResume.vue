<template>
  <div>
    <div class="layout">
      <Layout>
        <NavHeader></NavHeader>
        <Button
          type="primary"
          @click="changeImage"
        >保存为图片</Button>
        <Button
          type="primary"
          @click="postImage"
        >上传图片</Button>
        <Button
          type="primary"
          @click="downImg"
        >下载图片</Button>

        <img class="completeImg" :src="imgURL"/>

        <Content class="zm" >
        <div id="code" ref="imgTransf">
          <!-- 循环拿到每个模块里面的详情 -->
          <!-- 基本信息 -->
          <div
            class="baseR"
            id="mytitle"
          >
            <ul
              v-for="(item,index) in resumeList.base"
              :key="index"
            >
              <li class="baseC">
                <!-- 取对象的key -->
                <span>{{Object.keys(item)[0]}}</span>
                <!-- 取对象的值 -->
                <span>{{item[Object.keys(item)]}}</span>
              </li>
            </ul>
          </div>
          <!-- 专业技能 -->
          <div class="majorR">
            <Icon
              class="zm-icon"
              size="35"
              type="ios-body"
            ></Icon>
            <span class="zm-title">专业技能</span>
            <span class="zm-line"></span>
            <ul
              v-for="(item,index) in resumeList.major"
              :key="index"
            >
              <li class="majorC">
                <span>{{item}}</span>
              </li>
            </ul>
          </div>
          <!-- 教育背景 -->
          <div class="majorR">
            <Icon
              class="zm-icon"
              size="35"
              type="ios-body"
            ></Icon>
            <span class="zm-title">教育背景</span>
            <span class="zm-line"></span>
            <ul
              v-for="(item,index) in resumeList.education"
              :key="index"
            >
              <li class="majorC">
                <span class="edu-time">{{item.time}}</span>
                <span class="edu-type">({{item.type}})</span>
              </li>
            </ul>
          </div>
          <!-- 工作经历 -->
          <div class="workR majorR">
            <Icon
              class="zm-icon"
              size="35"
              type="ios-body"
            ></Icon>
            <span class="zm-title">工作经历</span>
            <span class="zm-line"></span>
            <div
              v-for="(item,index) in resumeList.work"
              :key="index"
            >
              <h2 class="zm-company">
                <span>{{item.company}}</span>
                <span class="zm-time">({{item.time}})</span>
              </h2>
              <div class="zm-tools">技术栈：{{item.technologyStack}}</div>
              <h2 class="zm-project">
                <span>{{item.projectName}}</span>
              </h2>
              <div class="zm-content">
                {{item.content}}
              </div>
            </div>
          </div>
          <!-- 开源或博客 -->
          <div class="workR majorR">
            <Icon
              class="zm-icon"
              size="35"
              type="ios-body"
            ></Icon>
            <span class="zm-title">开源或博客</span>
            <span class="zm-line"></span>
            <div
              v-for="(item,index) in resumeList.project"
              :key="index"
            >
              <h2 class="zm-company">
                <span>{{item.projectName}}</span>
              </h2>
              <div class="zm-content">
                {{item.content}}
              </div>
            </div>
          </div>
          <!-- 自我评价 -->
          <div class="majorR">
            <Icon
              class="zm-icon"
              size="35"
              type="ios-body"
            ></Icon>
            <span class="zm-title">自我评价</span>
            <span class="zm-line"></span>
            <ul
              v-for="(item,index) in resumeList.evaluate"
              :key="index"
            >
              <li class="majorC">
                <span>{{item}}</span>
              </li>
            </ul>
          </div>
          </div>
        </Content>
        <Footer>

        </Footer>
      </Layout>
    </div>
  </div>
</template>

<script>
import NavHeader from "@/components/NavHeader";
import NavFooter from "@/components/NavFooter";
import html2canvas from "html2canvas";
export default {
  name: "CompletionResume",
  data() {
    return {
      resumeList: [],
      imgURL: ""
    };
  },
  components: {
    NavHeader,
    NavFooter
  },
  watch: {},
  methods: {
    // 转换图片
    changeImage() {
      let imgHeight = window.document.querySelector("#code").offsetHeight; // 获取DOM高度
      let imgWidth = window.document.querySelector("#code").offsetWidth; // 获取DOM宽度
      let scale = window.devicePixelRatio; // 获取设备像素比
      html2canvas(this.$refs.imgTransf, {
        backgroundColor: null, //设置背景颜色
        useCORS: true, //允许图片跨域
        scale: scale, //缩放2倍，使得图片更加清晰
        width: imgWidth,
        height: imgHeight,
        imageTimeout: 5000, //设置图片的超时，设置0为禁用
        proxy: "", //url代理，用于加载跨域图源，为空则不会加载
        ignoreElements: element => {
          //用于忽略转换的图片中不需要的匹配元素，注意，为true才不会转换
          if (element.id == "mytitle") {
            return true;
          }
        }
      }).then(canvas => {
        let imgURL = canvas.toDataURL("image/png");
        this.imgURL = imgURL;
        // 

      });
    },
  
  //将图片Base64 转成文件
  dataURLtoFile(dataurl, filename) {
        console.log("转文件")
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    },
// 上传图片，注意，上传图片要把图片的base64格式转换为图片格式，然后上传
  postImage(){
    var file = this.dataURLtoFile(this.imgURL,"img.png");
      let data = new FormData();
      data.append("file", file, file.name);//很重要 data.append("file", file);不成功
      data.append('data',112)
      console.log(data.get('file'))
      this.axios.post("resumes/file", data, {
        headers: { "content-type": "multipart/form-data" }
      });
  },
//下载图片
  downImg(){
      this.axios.post("resumes/downImg", {
        headers: { "content-type": "multipart/form-data" }
      });
  },
    // 获取简历信息
    getResumeInfo() {
      this.axios
        .post("resumes/getResumeInfo", {
          userName: "long" //暂时写死，到时候用vuex
        })
        .then(res => {
          if (res.data.status == "0") {
            this.resumeList = res.data.result.resumeContent;
          }
        })
        .catch(err => {});
    }
  },
  mounted() {
    this.getResumeInfo();
  }
};
</script>

<style lang="less" scoped>
.ivu-layout {
  background: #fff;
}
.ivu-layout-header {
  background: #fff;
}
.zm {
  margin-left: 200px;
  margin-right: 200px;
  font-size: 16px;
  width: 800px;
  font-family: "Times New Roman", "Microsoft YaHei", serif;
  word-break: break-all;
  color: #000;
}
.baseR {
  position: relative;
  min-height: 156px;
  .baseC {
    float: left;
    width: 50%;
  }
}
// 专业技能，教育背景
.majorR {
  position: relative;
  min-height: 156px;
  .zm-icon {
    color: #1a73e8;
    display: inline-block;
    margin-left: -40px;
  }
  .zm-title {
    position: absolute;
    font-size: 19px;
    color: #1a73e8;
    font-weight: 600;
    top: 2px;
  }
  .zm-line {
    position: absolute;
    display: block;
    width: 800px;
    height: 2px;
    top: 32px;
    background: #1a73e8;
  }
  .majorC {
    width: 50%;
    .edu-time {
      margin: 10px 0 10px;
    }
    .edu-type {
      margin: 10px 0 10px 30px;
    }
  }
}

// 工作经历
.workR {
  margin-bottom: 25px;
  .zm-company {
    font-family: "Times New Roman", SongTi, serif;
    font-size: 20px;
    margin: 0;
    margin-top: 20px;
    .zm-time {
      margin-left: 10px;
    }
  }
  .zm-tools {
    margin-bottom: 16px;
  }
  .zm-project {
    font-weight: bold;
    padding-left: 24px;
    font-size: 17px;
  }
  .zm-content {
    margin: 2px 0 8px 0;
    text-indent: 20px;
    font-size: 16px;
    line-height: 1.6;
  }
}
.completeImg {
  width: 800px;
}
</style>
