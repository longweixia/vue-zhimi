import domtoimage from 'dom-to-image';
export default{  
    //将图片Base64 转成文件
    dataURLtoFile:function(dataurl, filename) {
      console.log("转文件");
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },

    // 将文档转换为图片
    transformImage: function(dom){
      return new Promise(function(resolve,reject){
        domtoimage.toPng(dom)
        .then((dataUrl) => {
          resolve(dataUrl)
        }).catch(function (error) {
          reject(error)
        });
      })
      // domtoimage.toPng(document.getElementById(id))
      //   .then((dataUrl) => {
       
      //       console.log(dataUrl)
      //       return dataUrl
          
      //   })
      //   .catch(function (error) {
      //     console.error('oops, something went wrong!', error);
      //   });
    }
 }