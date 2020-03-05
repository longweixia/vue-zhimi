<template>
  <!-- 上传照片 -->
  <div>
    <Upload
      class="writeResumeHeadImg"
      :show-upload-list="false"
      :before-upload="handleUpload"
      action="//jsonplaceholder.typicode.com/posts/"
    >
      <img class="jm-upload-img" :src="imgUrl" />
    </Upload>
    <!-- <div v-if="file !== null">Upload file: {{ file.name }} <Button type="text" @click="upload" :loading="loadingStatus">{{ loadingStatus ? 'Uploading' : 'Click to upload' }}</Button></div> -->
  </div>
</template>
<script>
export default {
  name: "jmUploadImg",
  data() {
    return {
      file: null,
      loadingStatus: false,
      imgUrl: "https://static.500d.me/resources/500d/cvresume/images/1.jpg"
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
        const ImgBase64 = reader.result;
        // 实现预览，实际是拿到图片的base64数据去挂在到图片的src上
        this.imgUrl = ImgBase64;
      };
      this.postImage();
      return false;
    },
    postImage() {
      var file = this.file;
      let data = new FormData();
      data.append("file", file, file.name); //很重要 data.append("file", file);不成功
      data.append("data", 112);
      console.log(data.get("file"));
      this.axios.post("resumes/file", data, {
        headers: { "content-type": "multipart/form-data" }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.writeResumeHeadImg {
  padding: 0;
//   width:100%;
//     height: 100%;
}
.jm-upload-img{
    
    background: no-repeat;
}
</style>