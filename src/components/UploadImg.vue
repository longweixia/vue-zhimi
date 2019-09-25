<template>
<!-- 上传照片 -->
    <div>
        <Upload class="writeResumeHeadImg" 
         :show-upload-list="false"
            :before-upload="handleUpload"
            action="//jsonplaceholder.typicode.com/posts/">
            
                <img src="https://static.500d.me/resources/500d/cvresume/images/1.jpg" />
            
        </Upload>
        <!-- <div v-if="file !== null">Upload file: {{ file.name }} <Button type="text" @click="upload" :loading="loadingStatus">{{ loadingStatus ? 'Uploading' : 'Click to upload' }}</Button></div> -->
    </div>
</template>
<script>
    export default {
        name:"jmUploadImg",
        data () {
            return {
                file: null,
                loadingStatus: false
            }
        },
        methods: {
            handleUpload (file) {
                this.file = file;
                return false;
            },
            upload () {
                this.loadingStatus = true;
                setTimeout(() => {
                    this.file = null;
                    this.loadingStatus = false;
                    this.$Message.success('Success')
                }, 1500);
            }
        }
    }
</script>
<style lang="less" scoped>
.writeResumeHeadImg{
    padding: 0;
}
</style>