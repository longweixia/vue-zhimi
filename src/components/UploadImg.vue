<template>
  <!-- 上传照片 -->
  <div>
    <Upload
      class="writeResumeHeadImg"
      :show-upload-list="false"
      :before-upload="handleUpload"
      action="//jsonplaceholder.typicode.com/posts/"
    >
      <!-- 图片悬浮时的背景 -->
      <a v-show="isHeadImg" class="jm-upload-icon"></a>
      <img class="jm-upload-img" :class="imgClass" :src="ImgBase64" />
    </Upload>
    <!-- <div v-if="file !== null">Upload file: {{ file.name }} <Button type="text" @click="upload" :loading="loadingStatus">{{ loadingStatus ? 'Uploading' : 'Click to upload' }}</Button></div> -->
  </div>
</template>
<script>
import Bus from "@/assets/event-bus.js";
export default {
  name: "jmUploadImg",
  props: {
    imgClass:{}, isHeadImg:{},
  ImgBase64: {
      type: String,
      default: "./../../static/image/1.jpg"
    }},
  data() {
    return {
      file: null,
      loadingStatus: false,
      // imgUrl: "./../../static/image/1.jpg"
    };
  },
  methods: {
    handleUpload(file) {
      // 需要传给后台的file文件
      this.file = file;
      // FileReader api 为用户提供了方法去读取一个文件或者一个二进制大对象，
      // 并且提供了事件模型让用户可以操作读取后的结果
      const reader = new FileReader();
      // readAsDataURL：读取为base64格式
      reader.readAsDataURL(file);
      // onload 在文件读取成功时触发
      reader.onload = () => {
        // this.ImgBase64 = reader.result;
        // 实现预览，实际是拿到图片的base64数据去挂在到图片的src上
        // this.imgUrl = ImgBase64;
        Bus.$emit("postPhotoBase64",reader.result);
      };
      // this.postImage();
      return false;
    },
    // postImage() {
    //   var file = this.file;
    //   let data = new FormData();
    //   data.append("file", file, file.name); //很重要 data.append("file", file);不成功
    //   data.append("data", 112);
    //   console.log(data.get("file"));
    //   this.axios.post("resumes/file", data, {
    //     headers: { "content-type": "multipart/form-data" }
    //   });
    // }
  }
};
</script>
<style lang="less" scoped>
.writeResumeHeadImg {
  padding: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  .jm-upload-icon {
    background: rgba(0, 192, 142, 0.5)
      url(./../../static/image/upheadimg.png)
      no-repeat center;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 1;
    font-weight: bold;
    color: #fff;
    text-align: center;
  }
  /deep/ .ivu-upload-select{
    width: 100%;
    height: 100%;
  }
}
.jm-upload-img {
  width: 120px;
  background: no-repeat;
  height: 156px;
}
// 动态的样式，由其他组件改变
.round-head{
  width: 120px;
  height: 120px;
  border-radius: 60px;
}
.one-head{
  width: 120px;
  height: 120px;
  border-radius: 0;
}
.three-head{
  width: 120px;
  height: 156px;
}
</style>