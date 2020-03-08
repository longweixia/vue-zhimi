import html2canvas from "html2canvas";
export default{  
    
    // 将文档转换为图片
     changeImage: function(id,noId){
        // id需要转换的dom 的id, noId为不需要转换的id
        let domContent = window.document.querySelector(id)
        let imgHeight = domContent.offsetHeight; // 获取DOM高度
        let imgWidth = domContent.offsetWidth; // 获取DOM宽度
        let scale = window.devicePixelRatio; // 获取设备像素比
      
         html2canvas(domContent, {
          backgroundColor: null, //设置背景颜色
          useCORS: true, //允许图片跨域
          scale: scale, //缩放2倍，使得图片更加清晰
          width: imgWidth,
          height: imgHeight,
          imageTimeout: 5000, //设置图片的超时，设置0为禁用
          proxy: "", //url代理，用于加载跨域图源，为空则不会加载
          ignoreElements: element => {
            //用于忽略转换的图片中不需要的匹配元素，注意，为true才不会转换
            if (element.id == noId) {
              return true;
            }
          }
        }).then(canvas => {
          let imgURL = canvas.toDataURL("image/png");
          return imgURL;
          // 
  
        });
    }
 }