
<template>
  <!-- 技能弹窗页面 -->
  <div>
    <Modal class="jm-skill-modal" v-model="modalSkills">
      <p class="jm-title" slot="header" style="text-align:left">
        <span>编辑技能特长</span>
      </p>
      <div class="jm-center">
        <Row class="jm-input">
          <Input
            v-model="customSkiVal"
            placeholder="自定义技能（例如：数据分析），限制10个字以内"
            clearable
            style="width: 465px"
          />
          <Button
            style="background:#00c091;color:#fff;width:80px;margin-left:10px;"
            @click="addSkills"
            >添加</Button
          >
        </Row>
        <Row class="jm-ski-table">
          <div class="jm-Recom-title">根据您的职业推荐的技能</div>
          <div class="jm-recom-body">
            <!-- 注意官网直接给是on-change事件是不生效的，算是个小坑，加个@就可以了 -->
            <Tag
              v-for="(item, index) in skillList"
              :key="index"
              style="border:1px solid #ddd;margin:0 10px 8px;"
              checkable
              :checked="item.isChecked"
              :name="item.name"
              @on-change="changeTag(item.isChecked, item.name)"
              color="success"
              >{{ item.name }}{{ item.isChecked }}</Tag
            >
          </div>
        </Row>
        <Row class="jm-ski-table">
          <div class="jm-Recom-title">
            已添加的技能
            <span class="jm-ski-info">（还可以添加8项技能）</span>
          </div>
          <div class="jm-recom-list">
            {{ hasSkillList }}
            <Row
              class="jm-recom-line"
              v-for="(item, index) in hasSkillList"
              :key="index"
            >
              <Col v-if="item.isChecked" span="8" style="text-align: left;">
                <Icon
                  @click="deleteSkills(index)"
                  class="jm-recom-icon"
                  size="20"
                  type="md-close-circle"
                />
                <span class="jm-recom-text">{{ item.name }}</span>
              </Col>
              <Col v-if="item.isChecked" span="12">
                <Slider
                  v-model="item.skillNumber"
                  :step="33"
                  :tip-format="format"
                ></Slider>
              </Col>
              <Col
                v-if="item.isChecked"
                span="4"
                class="jm-recom-tag"
                style="text-align: right;"
                >{{ item.skillNumber | ConversionNumber }}</Col
              >
            </Row>
          </div>
        </Row>
      </div>
      <div class="jm-footer" slot="footer">
        <Button @click="save" class="jm-save-btn" size="large">保存</Button>
        <Button @click="cancelModel" class="jm-cancle-btn" size="large"
          >取消</Button
        >
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: "skillModal",
  props: ["modalSkills"], //技能的弹窗标识
  filters: {
    ConversionNumber: function(val) {
      //根据滑块的来显示滑块提示文字
      if (val == 0) {
        return "一般";
      } else if (val == 33) {
        return "熟悉";
      } else if (val == 66) {
        return "熟练";
      } else if (val == 99) {
        return "精通";
      }
    }
  },

  data() {
    return {
      customSkiVal: "", //自定义技能输入框
      valRecom: 66, //自定义技能滑块的值
      showTipText: "熟练", //滚动条上方显示的文字
      sliderText: "", //滑块后面的文字
      hasSkillList: [
        { name: "商务", isChecked: false, skillNumber: 66 },
        { name: "BD拓展", isChecked: false, skillNumber: 66 },
        { name: "行业分析", isChecked: false, skillNumber: 66 },
        { name: "商业策划", isChecked: false, skillNumber: 66 }
      ], //已添加技能列表
      skillList: [
        { name: "商务", isChecked: false, skillNumber: 66 },
        { name: "BD拓展", isChecked: false, skillNumber: 66 },
        { name: "行业分析", isChecked: false, skillNumber: 66 },
        { name: "商业策划", isChecked: false, skillNumber: 66 }
      ] //技能列表
    };
  },
  watch: {
    // 对象深度监听
    skillList: {
      handler(newValue, oldValue) {
        // var obj = { name: "" };
        for (var i in newValue) {
          if (newValue[i].isChecked) {
            // obj.name = newValue[i].name;
            // this.hasSkillList.push(newValue);
            this.hasSkillList.find(
              item => item.name === newValue[i].name
            ).isChecked = true;
          } else {
            this.hasSkillList.find(
              item => item.name === newValue[i].name
            ).isChecked = false;
          }
        }
      },
      deep: true
    }
  },
  methods: {
    //格式化滑条显示文字
    format(val) {
      if (val == 0) {
        return "一般";
      } else if (val == 33) {
        return "熟悉";
      } else if (val == 66) {
        return "熟练";
      } else if (val == 99) {
        return "精通";
      }
    },
    changeTag(isChecked, name) {
      // js数组中含有多个对象，已知某个对象的属性值，找到这个对象其它的属性
      this.skillList.find(item => item.name === name).isChecked = !isChecked;
    },
    // 添加技能
    addSkills() {
      if (this.customSkiVal === "") {
        this.$Message.warning("请输入您的技能");
        return;
      } else if (
        // 如果添加的技能已经存在,要分两种情况：状态为true，拒绝添加，如果状态为false，改成true即可
        JSON.stringify(this.hasSkillList).indexOf(this.customSkiVal) != -1
      ) {
        if (
          this.hasSkillList.find(item => item.name === this.customSkiVal)
            .isChecked
        ) {
          this.$Message.warning("已有该技能，请输入其它内容");
          return;
        } else {
          this.hasSkillList.find(
            item => item.name === this.customSkiVal
          ).isChecked = true;
          this.hasSkillList.find(
            item => item.name === this.customSkiVal
          ).skillNumber = 66;
          return;
        }
      }

      let addSkillContent = {
        name: this.customSkiVal,
        isChecked: true,
        skillNumber: 66
      };
      this.hasSkillList.push(addSkillContent);
    },
    // 删除单行已选技能
    deleteSkills(i) {
      this.hasSkillList[i].isChecked = false;
      // 如果删除项在推荐技能数组中，就要去改变skillList对应项的状态
      if (
        JSON.stringify(this.skillList).indexOf(this.hasSkillList[i].name) != -1
      ) {
        // 让已选的tag同步状态
        this.skillList.find(
          item => item.name === this.hasSkillList[i].name
        ).isChecked = false;
        // 恢复未选择技能的数值
        this.hasSkillList[i].skillNumber = 66;
      }
    },
    // 点击取消
    cancelModel() {
      this.$emit("changeSkillModel", false);
    },
    // 保存基本信息数据
    save(){
      this.cancelModel();
      // 传过去的时候处理下数据，状态为fasle的不用传
      let choseSkillList = [];
      this.hasSkillList.forEach((item,index)=>{
        if(item.isChecked){
          choseSkillList.push(item)
        }
      })
      this.$emit("saveSkill",choseSkillList)
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
  /deep/.ivu-slider-bar {
    height: 8px;
    background: #e6e8ef;
    border-radius: 6px;
    position: absolute;
  }
  /deep/.ivu-slider-button {
    width: 14px;
    height: 14px;
    border: 2px solid #00c901;
  }
  /deep/.ivu-slider-wrap {
    height: 8px;
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
  // 中间
  .jm-center {
    .jm-ski-table {
      padding: 4px 7px;
      .jm-Recom-title {
        text-align: left;
        margin-top: 10px;
        margin-bottom: 5px;
        font-size: 14px;
        .jm-ski-info {
          font-size: 12px;
          color: #ccc;
        }
      }
      .jm-recom-body {
        text-align: left;
        width: 100%;
        height: 160px;
        padding: 10px 8px;
        border: solid 1px #ccc;
        border-radius: 2px;
        overflow-y: auto;
      }
      .jm-recom-list {
        .jm-recom-line {
          height: 34px;
          line-height: 34px;
          margin-bottom: 10px;
          text-align: center;
          .jm-recom-icon {
            color: #80e0c7;
          }
          .jm-recom-icon:hover {
            color: red;
            cursor: pointer;
          }
          .jm-recom-text {
            display: inline-block;
            height: 26px;
            line-height: 26px;
            padding: 0 12px;
            color: white;
            background-color: #7fe0c7;
            border-radius: 13px;
            margin-left: 30px;
            font-size: 12px;
            //   vertical-algin:middle;
          }
          .jm-recom-tag {
            color: #414a60;
            font-size: 16px;
          }
        }
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