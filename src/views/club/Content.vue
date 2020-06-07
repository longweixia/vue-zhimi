<template>
<!-- 社区中心 -->
  <div>
     <NavHeader></NavHeader>
    
<!-- 
   <div class="jm-bread">
        <Breadcrumb>
                <BreadcrumbItem>
                  <Icon type="ios-home-outline"></Icon> 个人中心
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <Icon type="logo-buffer"></Icon> {{bread}}
                </BreadcrumbItem>
              </Breadcrumb>
   </div> -->

   <!-- <router-view>
   </router-view> -->
   <div>
     <ClubCard></ClubCard>
   </div>
  </div>
</template>

<script>
import NavHeader from "@/components/NavHeader";
import Bus from "@/assets/event-bus.js";
import ClubCard from "./Card";
export default {
  name: "clubContent",
  components:{
   NavHeader,
   ClubCard
  },
  props:["bread","openNames"],
  data() {
    return {
    };
  },
  methods: {
    // 获取图片列表
    // getClubList() {
    //   this.axios
    //     .get("clubs/getClubList", { 
    //       params:{
    //       pageSize: this.pageSize||1,
    //       currentPage:this.currentPage||1,
    //       userName: localStorage.getItem("userName")
    //       }
    //       })
    //     .then(res => {
    //       // this.imgList = res.data.result.list;
    //       // // this.imgList.forEach((val,item)=>{
    //       // //   val.collectText="收藏"
    //       // // })
    //       // this.totalPage = res.data.result.totol;
    //     })
    //     .catch(err => {
    //       console.log("err", err);
    //     });
    // }
  },
  watch: {},

  mounted() {
    // this.getClubList()
  },
  created() {}
};
</script>

<style lang="less" scoped>
.jm-menu{
    min-height: 600px;
    margin-top: 20px;
}
.jm-bread{
    position: absolute;
    left: 240px;
    top: 0;
    height: 40px;
    line-height: 40px;
    margin: 10px;
    margin-top: 60px;
}

</style>
