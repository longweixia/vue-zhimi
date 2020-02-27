<template>
  <div>
    <!-- 求职意向主题 -->
    <div >
      <div class="jm-theme">
        <Row>
          <Col>
            <Icon size="25" type="md-list-box" />
            <div class="title">
              <Input class="title-row" v-model="title" />
            </div>
          </Col>
        </Row>
        <Row
          class="jobList"
          v-for="(item, index) in jobIntentionList"
          :key="index"
        >
          <Icon :size="20" class="jobIcon" :type="item.type" />
          <span class="jobText">{{ item.baseText }}</span>
        </Row>
      </div>
      <div class="jm-theme">
        <Row>
          <Col>
            <Icon size="25" type="md-list-box" />
            <div class="title">
              <Input class="title-row" v-model="title" />
            </div>
          </Col>
        </Row>
        <Row
          class="jobList"
          v-for="(item, index) in jobIntentionList"
          :key="index"
        >
          <Icon :size="20" class="jobIcon" :type="item.type" />
          <span class="jobText">{{ item.baseText }}</span>
        </Row>
      </div>
    </div>
  </div>
</template>
<script>
// import modal3 from "./Modal3";
export default {
  name: "theme3",
  props: [],
  components: {
    // modal3
  },
  data() {
    return {
      title: "求职意向",
      jobIntentionList: [
        //求职意向项
        {
          type: "ios-contact",
          baseText: "意向岗位",
          name: "choseJob"
        },
        {
          type: "md-briefcase",
          baseText: "意向城市",
          name: "city"
        },
        {
          type: "ios-mail",
          baseText: "入职时间",
          name: "entryTime"
        },
        {
          type: "ios-call",
          baseText: "薪资要求",
          name: "salary"
        }
      ]
    };
  },
  watch: {},
  methods: {
    // modal3传过来的，点击取消
  }
};
</script>
 <style lang="less" scoped>
/deep/.ivu-input {
  border: none;
  // color: #fff;
  // background: #6b4b24;
}
.jm-theme {
  // 求职意向主题
  border: 1px solid #e8e8e8;
  margin-bottom: 20px;
  padding: 20px;
  .jobList {
    // width: 25%;
    display: inline-block;
    padding: 20px 5px;
    .jobIcon {
      color: #747474;
      margin-top: -2.5px;
    }
    .jobText {
      color: #747474;
      font-size: 14px;
    }
  }
  // 标题样式
  .title {
    width: 400px;
    // margin-top:-30px;
    // margin-left:30px;
    display: inline-block;
    .title-row {
      border-bottom: 1px solid #254665;
      /deep/ .ivu-input {
        color: #254665;
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
}
</style>