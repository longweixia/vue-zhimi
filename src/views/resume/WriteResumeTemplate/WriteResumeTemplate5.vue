<template>
  <div class="jm-template">
    <div>
      <div>
        <div class="jm-title">个人简历</div>
      </div>
      <!-- 简历表格区 -->
      <Row class="jm-table">
        <!-- 左侧区域 -->
        <Col :span="20" class="jm-baseInfo">
          <Row class="jm-base-content get-border" style="border:1px solid #000">
          
            <Row class="jm-name">
              <Input
                :class="isFocus['name'] ? 'jm-focus' : ''"
                @on-focus="focusInput('name')"
                @on-blur="blurInput('name')"
                v-model="name"
                placeholder="long"
                clearble
              />
            </Row>
            <Row class="jm-introduce">
              <Input
                :class="isFocus['introduce'] ? 'jm-focus' : ''"
                @on-focus="focusInput('introduce')"
                @on-blur="blurInput('introduce')"
                v-model="introduce"
                placeholder="一句话介绍自己，告诉我们你为什么值得拥有"
                clearble
              />
            </Row>
          </Row>
          <div class="jm-base-content">
            <Ul class="jm-type">
              <li class="jm-type-row">
                <div class="jm-type-left get-border">性别：</div>
                <div class="jm-type-right get-borderV">男</div>
              </li>
              <li class="jm-type-row">
                <div class="jm-type-left get-border" style="border-left:none">性别：</div>
                <div class="jm-type-right get-borderV">男</div>
              </li>
            </Ul>
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
import jmUploadImg from "@/components/UploadImg";
import Bus from "@/assets/event-bus.js";
export default {
  name: "WriteResumeTemplate5",
  data() {
    return {
      name: "",
      introduce: "",
      isFocus: {
        //输入框聚焦标识
        name: false,
        introduce: false
      }
    };
  },
  components: {
    jmUploadImg
  },
  watch: {},
  methods: {
    // 输入域聚焦
    focusInput(item) {
      this.inFocus[item] = true;
    },
    //输入域失去焦点
    blurInput(item) {
      this.inFocus[item] = false;
    }
  },
  mounted() {
   
  },
  created() {}
};
</script>

<style lang="less" scoped>

.jm-template {
  margin-bottom: 40px;
}
.jm-title {
  font-size: 36px;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
}
 .get-border{
    border: 1px solid #000;
    padding: 5px;
    border-top: none;
 
  }
  .get-borderV {
    border: 1px solid #000;
    padding: 5px;
    border-top: none;
    border-left: none;
 
  }
  /deep/.ivu-input{
    border: none;
  }
  // 聚焦时
.jm-focus /deep/.ivu-input {
  background: #626263;
  border-radius: unset;
  padding: 0;
}
.jm-table {
  width: 750px;
  padding-right: 36px;
  padding-left: 36px;
  // 基本信息
  .jm-baseInfo {
    width: 584px;
    .jm-base-content {
      .jm-name {
        height: 50px;
        /deep/.ivu-input {
          font-size: 30px;
          height: 40px;
          border: none;
          padding: 0;
        }
      }
      .jm-introduce {
        /deep/.ivu-input {
          font-size: 12px;
          height: 20px;
          border: none;
          padding: 0;
        }
      }
      .jm-type {
        .jm-type-row {
          list-style: none;
          float: left;
          .jm-type-left {
            width: 86.5px;
            display: inline-block;
          }
          .jm-type-right {
            width: 207px;
            margin-left: -5px;
            display: inline-block;
          }
        }
      }
    }
  }
}
</style>
