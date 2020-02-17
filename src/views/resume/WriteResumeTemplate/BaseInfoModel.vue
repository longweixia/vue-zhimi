<template>
  <!-- 基本信息弹窗 -->
  <div>
    <Modal class="jm-skill-modal" v-model="modalSkills">
      <p class="jm-title" slot="header" style="text-align:left">
        <span>编辑基本信息</span>
      </p>
      <div class="jm-content">
        <!-- 表单区 -->
        <Form
          class="jm-form"
          :model="formLeft"
          label-position="left"
          :label-width="100"
        >
          <FormItem class="jm-Row" label="你的姓名">
            <Input
              v-model="formLeft.input1"
              placeholder="请输入您的名称"
            ></Input>
          </FormItem>
          <FormItem class="jm-Row" label="出生日期">
            <DatePicker
              :value="formLeft.input2"
              format="yyyy年MM月dd日"
              type="date"
              placeholder="选择日期"
            ></DatePicker>
          </FormItem>
          <FormItem class="jm-Row" label="工作年限">
            <Select v-model="work" clearable placeholder="选择工作年限">
              <Option v-for="item in workYearList" :value="item" :key="item">{{
                item
              }}</Option>
            </Select>
          </FormItem>
          <FormItem class="jm-Row" label="头像设置">
            <Select v-model="headPic">
              <Option v-for="item in headPicList" :value="item" :key="item">{{
                item
              }}</Option>
            </Select>
          </FormItem>
          <FormItem class="jm-Row" label="电话号码">
            <Input v-model="formLeft.input3" placeholder="请输入电话"></Input>
          </FormItem>
          <FormItem class="jm-Row" label="联系邮箱">
            <Input v-model="formLeft.input4" placeholder="请输入邮箱"></Input>
          </FormItem>
        </Form>
        <!-- 一句话描述 -->
       
          <Row class="wordDescribe"> 
            <Row>
            <Col span="8">一句话描述</Col>
            <Col span="8" offset="8"
              >是否隐藏描述
              <i-Switch class="jm-switch">
                <span slot="open">开</span>
                <span slot="close">关</span>
              </i-Switch>
            </Col>
            </Row>
            <Row>
              <Col>
              <Input v-model="wordDescribe" placeholder=" 例如：3年产品经验，熟悉互联网行业，成功主导产品01过程。"></Input>
              </Col>
            </Row>
          </Row>
     
      </div>
      <div class="jm-footer" slot="footer">
        <Button class="jm-save-btn" size="large">保存</Button>
        <Button @click="cancelMpdel" class="jm-cancle-btn" size="large"
          >取消</Button
        >
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: "baseInfoModel",
  props: ["modalSkills"], //基本信息的弹窗标识
  data() {
    return {
      // 表单输入框的值
      formLeft: {
        input1: "",
        input2: "",
        input3: "",
        input4: "",
      },
      // 工作年限数组
      workYearList: ["1年", "2年", "3年"],
      work: "", //工作年限
      // 头像状态数组
      headPicList: ["显示", "隐藏"],
      headPic: "显示", //头像状态
      wordDescribe:"",//一句话描述自己
    };
  },
  watch: {},
  methods: {

    // 点击取消
    cancelMpdel() {
      this.$emit("changeSkillModel", false);
    }
  }
};
</script>
 <style lang="less" scoped>
.jm-skill-modal {
  width: 600px;
  /deep/.ivu-modal {
    width: 600px !important;
  }
  // 加这个deep可以深度修改内置的样式
  /deep/.ivu-modal-header {
    padding: 0 !important;
  }

  // 标题
  .jm-title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    color: white;
    background-color: #00c190;
    border-radius: 4px 4px 0 0;
  }
  // 中间表单区
  .jm-content {
    .jm-form {
      .jm-Row {
        display: inline-block;
        width: 48%;
      }
    }
    .wordDescribe{
      .jm-switch{
       
      }
    }
  }
  // 底部按钮
  .jm-footer {
    text-align: center;
    .jm-save-btn {
      background-color: #00c190;
      color: white;
      border-radius: 4px;
      border: none;
      width: 100px;
      height: 40px;
      margin-left: 15px;
      cursor: pointer;
    }
    .jm-cancle-btn {
      background-color: #ededed;
      color: #8b8b8b;
      border-radius: 4px;
      border: none;
      width: 100px;
      height: 40px;
      margin-left: 15px;
      cursor: pointer;
    }
  }
}
</style>