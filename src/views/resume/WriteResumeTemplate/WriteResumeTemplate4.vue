<template>
  <div class="jm-template">
    <!-- 姓名和介绍 -->
    <div class="jm-base-name">
      <div
        style="position: relative;"
        :class="isBaseLine ? 'jm-base-linehover' : ''"
        @mouseenter="enterBase"
        @mouseleave="leaveBase"
      >
        <Icon
          v-show="isBaseLine"
          class="jm-head-icon"
          size="20"
          type="md-settings"
        />
        <div class="jm-name">
          <Input
            v-model="name"
            placeholder="你的名字"
            clearable
            style="width:94%;margin:5px 3%;font-size: 30px;"
          />
        </div>
        <div class="jm-name-introduce">
          <Input
            v-model="introduce"
            placeholder="一句话介绍自己，告诉HR为什么选择你而不是别人"
            clearable
            style="width:94%;margin:5px 3%"
          />
        </div>
      </div>
    </div>
    <!-- 年龄信息 -->
    <div class="jm-base-age">
      <div class="jm-age-content">
        <span>
          <Input
            v-model="age"
            placeholder="年龄"
            clearable
            style="width:40px;font-size: 18px;"
          />
        </span>
        <span>
          <Input
            v-model="workYear"
            placeholder="工作经验"
            clearable
            style="width:80px;font-size: 18px;"
          />
        </span>
        <span>
          <Input
            v-model="phone"
            placeholder="手机号"
            clearable
            style="width:120px;font-size: 18px;"
          />
        </span>
        <span>
          <Input
            v-model="email"
            placeholder="邮箱号"
            clearable
            style="width:150px;font-size: 18px;"
          />
        </span>
      </div>
    </div>
    <!-- 求职意向 -->
    <div class="jm-base-like">
      <div class="jm-like-title">
        <div class="jm-title">
          <span>教育背景</span>
        </div>
      </div>
      <div class="jm-like-content">
        <Row class="jm-like-work">
          <Row class="jm-work">
            <Col :span="8" :class="jmDate">
              <DatePicker
                confirm
                v-model="eduDate"
                @on-ok="confirmDate"
                type="daterange"
                placeholder="日期"
                style="width: 200px;z-index:1;"
              ></DatePicker
            ></Col>

            <Col :span="7">
              <Input
                v-model="eduschool"
                placeholder="填写学校名称"
                clearable
                style="font-size: 18px;"
            /></Col>
            <Col :span="8" style="margin-left:10px;">
              <Input
                v-model="eduMajor"
                placeholder="填写专业名称"
                clearable
                style="font-size: 18px;"
            /></Col>
          </Row>
          <Row class="jm-work-content">
            <Input
              style="margin-bottom:'10px'"
              v-model="eduText"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 5 }"
              placeholder="尽量简洁，突出重点，成绩优异的话建议写上GPA及排名等信息，如：GPA：3.72/4（专业前10%）                         GRE：324"
            />
          </Row>
        </Row>
      </div>
    </div>
    <!-- 工作经验 -->
    <div class="jm-work-experience jm-base-like">
      <div class="jm-like-title">
        <div class="jm-title">
          <span>工作经验</span>
        </div>
      </div>
      <div class="jm-like-content">
        <Row class="jm-like-work">
          <Row class="jm-work">
            <Col :span="8" :class="jmDate">
              <DatePicker
                confirm
               v-model="workDate"
                @on-ok="confirmDate"
                type="daterange"
                placeholder="日期"
                style="width: 200px;z-index:1;"
              ></DatePicker
            ></Col>
            <Col :span="7">
              <Input
                v-model="workName"
                placeholder="填写公司名称"
                clearable
                style="font-size: 18px;"
            /></Col>
            <Col :span="8" style="margin-left:10px;">
              <Input
                v-model="workMajor"
                placeholder="填写职位名称"
                clearable
                style="font-size: 18px;"
            /></Col>
          </Row>
          <Row class="jm-work-content">
            <Input
              style="margin-bottom:'10px'"
              v-model="workText"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 5 }"
              placeholder="此项为非必选项，根据实际情况选择，实习经验的时间采取倒叙形式，最近经历写在前面，实习经验的描述与目标岗位的招聘要求尽量匹配，用词精准，工作成果尽量以数据来呈现，突出个人成果以及做出的贡献，描述尽量具体简洁。"
            />
          </Row>
        </Row>
      </div>
    </div>
    <!-- 技能特长 -->
    <div class="jm-work-experience jm-base-like">
      <div class="jm-like-title">
        <div class="jm-title">
          <span>技能特长</span>
        </div>
      </div>
      <div class="jm-like-content">
        <Row class="jm-like-work">
          <Row class="jm-work-content">
            <Input
              style="margin-bottom:'10px'"
              v-model="textWork1"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 5 }"
              placeholder="此项为非必选项，根据实际情况选择，实习经验的时间采取倒叙形式，最近经历写在前面，实习经验的描述与目标岗位的招聘要求尽量匹配，用词精准，工作成果尽量以数据来呈现，突出个人成果以及做出的贡献，描述尽量具体简洁。"
            />
          </Row>
        </Row>
      </div>
    </div>
    <!-- 荣誉奖项 -->
    <div class="jm-work-experience jm-base-like">
      <div class="jm-like-title">
        <div class="jm-title">
          <span>项目博客</span>
        </div>
      </div>
      <div class="jm-like-content">
        <Row class="jm-like-work">
          
          <Row class="jm-work-content">
            <Input
              style="margin-bottom:'10px'"
              v-model="project"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 5 }"
              placeholder="详细描述你所获得的奖项荣誉，时间倒叙，与目标岗位相关性强的写在前面，只写有代表性的奖项即可，同年或同类别的奖项可进行适当合并。"
            />
          </Row>
        </Row>
      </div>
    </div>
    <!-- 自我评价 -->
    <div class="jm-work-experience jm-base-like" style="padding-bottom:30px">
      <div class="jm-like-title">
        <div class="jm-title">
          <span>自我评价</span>
        </div>
      </div>
      <div class="jm-like-content">
        <Row class="jm-like-work">
          
          <Row class="jm-work-content">
            <Input
              style="margin-bottom:'10px'"
              v-model="selfEvaluation"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 5 }"
              placeholder="篇幅不要太长，注意结合简历整体的美观度，如果真的有很多话要说，建议以求职信的形式附上。自我评价应做到突出自身符合目标岗位要求的“卖点”，避免过多使用形容词，而应该通过数据及实例来对自身价值进行深化。"
            />
          </Row>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
import jmUploadImg from "@/components/UploadImg";
export default {
  name: "WriteResumeTemplate4",
  data() {
    return {
      textWork1:"",
      isBaseLine: false, //是否基本信息编辑框
      name: "",
      introduce: "",
      email: "",
      phone: "",
      workYear: "",
      age: "",
      eduText: "",
      jmDate: "jm-date", //是否显示日期选择框的笑图标
      eduDate:"",
      eduschool:"",
      eduMajor:"",
      workDate:"",
      workName:"",
      workMajor:"",
      workText:"",
      project:"",//项目
      selfEvaluation:"",//自我评价


    };
  },
  components: {
    jmUploadImg
  },
  watch: {},
  methods: {
    // 确定日期
    confirmDate() {
      this.jmDate = "jm-date";
    },
    // 鼠标悬浮头像
    enterBase() {
      this.isBaseLine = true;
    },
    //鼠标离开头像
    leaveBase() {
      this.isBaseLine = false;
    }
  },
  mounted() {},
  created() {}
};
</script>

<style lang="less" scoped>
.jm-template{
  margin-bottom: 40px;
}
.jm-head-icon {
  position: absolute;
  top: 0;
  right: 0;
  color: #fff;
  background: #00c091;
  /*z-index: 1;*/
}
.jm-base-name {
  position: relative;
  /* border: 1px solid #254665;*/
  padding: 20px;
  padding-bottom: 15px;
  background: #6b4b24;
  color: #fff;
  /deep/.ivu-input {
    border: none;
    color: #fff;
    background: #6b4b24;
  }
  .jm-name {
    /deep/.ivu-input {
      color: #fff;
      font-size: 30px;
    }
  }
}
.jm-base-linehover {
  border: 1px dashed #00c091;
}

.jm-base-age {
  height: 100px;
  padding-left: 30px;
  padding-right: 30px;
  margin-top: 10px;
  padding-bottom: 10px;
  .jm-age-content {
    padding-right: 170px;
    /deep/.ivu-input {
      border: none;
      // color:#fff;
      // background: #6b4b24;
    }
  }
}
.jm-title {
  width: 92px;
  padding: 0 10px;
  color: white;
  font-size: 0;
  background-color: #0b70bd;
  span {
    font-size: 18px;
    font-weight: bold;
    height: 42px;
    line-height: 40px;
    text-align: center;
  }
}
.jm-base-like {
  padding-left: 30px;
  margin-bottom: 20px;
  .jm-like-title {
    height: 42px;
    margin-bottom: 15px;
    border-bottom: 2px solid #292929;
    border-color: #0b70bd;
  }
  .jm-like-content {
    .jm-like-work {
      /deep/.ivu-input-with-suffix {
        color: #0b70bd;
        font-weight: bold;
      }
      /deep/.ivu-input-default,
      /deep/.ivu-input {
        color: #0b70bd;
        font-weight: bold;
      }
      .jm-work {
        color: #0b70bd;
        font-weight: bold;
        /deep/.ivu-input {
          border: none;
          // color:#fff;
          // background: #6b4b24;
        }

        .jm-date {
          /deep/.ivu-input-suffix {
            visibility: hidden;
          }
        }
        .jm-date:hover {
          /deep/.ivu-input-suffix {
            visibility: visible;
          }
        }
      }
      .jm-work-content {
        margin-top: 10px;
        margin-bottom: 10px;
        padding-right: 20px;
        /deep/.ivu-input {
          border: none;
          // color:#fff;
          // background: #6b4b24;
        }
      }
    }
  }
}
.jm-work-experience {
}
</style>
