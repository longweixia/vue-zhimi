<template>
<div class="jm">
     <Header><WriteIdeHeader/></Header>
        <Layout class="jm-content">
            <Sider class="jm-sider-left" hide-trigger><WriteIdeSiderLeft/></Sider>
            <Content>
                <WriteIdeContent/>
            </Content>
             <Sider class="jm-sider-right" hide-trigger><WriteIdeSiderRight/></Sider>
        </Layout>
    
</div>
</template>

<script>
import WriteIdeHeader from "@/views/resume/ResumeTemplateCommon/WriteIdeHeader";
import WriteIdeSiderLeft from "@/views/resume/ResumeTemplateCommon/WriteIdeSiderLeft";
import WriteIdeSiderRight from "@/views/resume/ResumeTemplateCommon/WriteIdeSiderRight";
import WriteIdeContent from "@/views/resume/ResumeTemplateCommon/WriteIdeContent";
export default {
  name: "WriteResumeIde",
  data() {
    return {
     
    };
  },
  components: {
      WriteIdeHeader,
      WriteIdeSiderLeft,
      WriteIdeSiderRight,
      WriteIdeContent
  },
  watch: {},

  mounted() {},
  created() {

  }
};
</script>

<style lang="less" scoped>
.ivu-layout-header,.ivu-layout,.ivu-layout-sider{
  background: #fff;
}
.jm-sider-left{
   width: 70px!important; 
    min-width: 70px!important; 
   max-width: 70px!important; 
    flex: 0 0!important;
}
.jm-sider-right{
   width: 360px!important; 
    min-width: 360px!important; 
   max-width: 360px!important; 
    flex: 0 0!important;
    background: #00c091;
}
/deep/.ivu-layout-header{
      height: 50px;
      line-height: 50px;
    }
.jm-content{
    background: #00c091;
}
</style>
