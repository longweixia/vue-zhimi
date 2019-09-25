<template>
  <div>
    <div class="layout">
      <Layout>
        <NavHeader></NavHeader>
        <Content class="zm">
          <div class="n_dispage_jm">
            <div class="n_dispage_jm_in resetEditStyle">
              <!--编辑区域-->

              <div class="baseStyle clearfix jm0203_j1" id="resume_body">
                <div class="divLeft clearfix" id="bar">
                  <!--头像-->

                  <div
                    data-toggle="modal"
                    data-target="#myModalHead"
                    class="headDiv"
                    id="resume_head"
                  >
                    <span class="headNotice">点击替换头像</span>
                    <img
                      class="resume_head"
                      src="images/default_head.png"
                      height="200"
                    />
                  </div>
                  <div id="bar_sort"></div>

                  <!--基本信息-->

                  <div
                    class="msgDiv positonDiv resume_add_area resume_sort"
                    id="resume_msg"
                  >
                    <div class="baseAge baseMsg baseDel" id="resume_age">
                      <div
                        class="delete resume_hidden"
                        for-id="resume_age"
                      ></div>
                      <a
                        class="resume_icon_diy icon wbdfont"
                        for-id="age"
                        style="font-size:none"
                        ></a
                      >
                      <input
                        class="baseBorder resume_msg resume_lang_age"
                        for-key="age"
                        placeholder="年龄/生日"
                        value="24岁"
                      />
                    </div>
                    <div
                      class="baseAddress baseMsg baseDel"
                      id="resume_address"
                    >
                      <div
                        class="delete resume_hidden"
                        for-id="resume_address"
                      ></div>
                      <a
                        class="resume_icon_diy icon wbdfont"
                        for-id="address"
                        style="font-size:none"
                        ></a
                      >
                      <input
                        class="resume_msg baseBorder resume_lang_address"
                        for-key="address"
                        placeholder="联系地址"
                        :value="base[4].address"
                      />
                    </div>
                    <div class="baseMobile baseMsg baseDel" id="resume_mobile">
                      <div
                        class="delete resume_hidden"
                        for-id="resume_mobile"
                      ></div>
                      <a
                        class="resume_icon_diy icon wbdfont"
                        for-id="mobile"
                        style="font-size:none"
                        ></a
                      >
                      <input
                        class="resume_msg baseBorder resume_lang_mobile"
                        for-key="mobile"
                        placeholder="联系电话"
                        :value="base[1].tel"
                      />
                    </div>
                    <div class="baseEmail baseMsg baseDel" id="resume_email">
                      <div
                        class="delete resume_hidden"
                        for-id="resume_email"
                      ></div>
                      <a
                        class="resume_icon_diy icon wbdfont"
                        for-id="email"
                        style="font-size:none"
                        ></a
                      >
                      <input
                        class="resume_msg baseBorder resume_lang_email"
                        for-key="email"
                        placeholder="电子邮箱"
                        :value="base[2].Email"
                      />
                    </div>
                  </div>

                  <!--个人技能-->

                  <div
                    class="skillDiv positonDiv resume_add_area resume_graph resume_sort"
                    id="resume_graph"
                  >
                    <ul class="editBtn">
                      <li
                        class="btnMove"
                        style="cursor:move;"
                        data-placement="top"
                        title="拖动调整上下位置"
                      ></li>
                      <li
                        class="btnPlus resume_add"
                        for-key="resume_graph"
                        data-placement="bottom"
                        title="添加一项"
                      ></li>
                      <li
                        class="btnDel resume_hidden"
                        for-id="resume_graph"
                        data-placement="bottom"
                        title="隐藏该模块"
                      ></li>
                    </ul>
                    <ul class="skillUl resume_append_area">
                      <li class="baseDel resume_delete_area resume_graph_item">
                        <div class="skillTitle">
                          <input
                            class="resume_value baseBorder"
                            for-key="resume_skill_graph"
                            placeholder="填写你的技能名称"
                            value="Java"
                          />
                        </div>
                        <span
                          ><i
                            class="resume_line"
                            for-id="resume_skill_graph"
                            style="width:128px;border-top-style:solid;border-top-width:8px;"
                          ></i
                        ></span>
                        <div class="delete resume_delete"></div>
                      </li>
                      <li class="baseDel resume_delete_area resume_graph_item">
                        <div class="skillTitle">
                          <input
                            class="resume_value baseBorder"
                            for-key="53815fa3293e57988958e27243b16870"
                            placeholder="填写你的技能名称"
                            value="C++"
                          />
                        </div>
                        <span
                          ><i
                            class="resume_line"
                            for-id="53815fa3293e57988958e27243b16870"
                            style="width:128px;border-top-style:solid;border-top-width:8px;"
                          ></i
                        ></span>
                        <div class="delete resume_delete"></div>
                      </li>
                      <li class="baseDel resume_delete_area resume_graph_item">
                        <div class="skillTitle">
                          <input
                            class="resume_value baseBorder"
                            for-key="0fb2de17b37fd50c14ccda4d9b96bd94"
                            placeholder="填写你的技能名称"
                            value="mysql"
                          />
                        </div>
                        <span
                          ><i
                            class="resume_line"
                            for-id="0fb2de17b37fd50c14ccda4d9b96bd94"
                            style="width:128px;border-top-style:solid;border-top-width:8px;"
                          ></i
                        ></span>
                        <div class="delete resume_delete"></div>
                      </li>
                      <li class="baseDel resume_delete_area resume_graph_item">
                        <div class="skillTitle">
                          <input
                            class="resume_value baseBorder"
                            for-key="0bab43524d96b1b58129f46097ee14b7"
                            placeholder="填写你的技能名称"
                            value="jsp"
                          />
                        </div>
                        <span
                          ><i
                            class="resume_line"
                            for-id="0bab43524d96b1b58129f46097ee14b7"
                            style="width:128px;border-top-style:solid;border-top-width:8px;"
                          ></i
                        ></span>
                        <div class="delete resume_delete"></div>
                      </li>
                    </ul>
                  </div>

                  <!--兴趣爱好-->

                  <div
                    class="hobbyDiv positonDiv resume_add_area resume_icon resume_sort"
                    id="resume_icon"
                  >
                    <dl class="clearfix">
                      <dt>
                        <span>
                          <div class="resume_lang_hobby">兴趣爱好</div>
                        </span>
                      </dt>
                      <dd class="resume_append_area">
                        <div
                          class="hobbyicon baseDel resume_delete_area resume_icon_item"
                        >
                          <a
                            class="resume_icon_diy icon wbdfont"
                            for-id="resume_hobby_icon"
                            style="font-size:none"
                            ></a
                          >
                          <span class="hobbyTitle">
                            <input
                              class="resume_value baseBorder"
                              for-key="resume_hobby_icon"
                              placeholder="兴趣爱好"
                              value="篮球"
                            />
                          </span>
                          <div class="delete resume_delete"></div>
                        </div>
                        <div
                          class="hobbyicon baseDel resume_delete_area resume_icon_item"
                        >
                          <a
                            class="resume_icon_diy icon wbdfont"
                            for-id="9eff2552587f9d5970ebab85696208dc"
                            style="font-size:none"
                            ></a
                          >
                          <span class="hobbyTitle">
                            <input
                              class="resume_value baseBorder"
                              for-key="9eff2552587f9d5970ebab85696208dc"
                              placeholder="兴趣爱好"
                              value="足球"
                            />
                          </span>
                          <div class="delete resume_delete"></div>
                        </div>
                        <div
                          class="hobbyicon baseDel resume_delete_area resume_icon_item"
                        >
                          <a
                            class="resume_icon_diy icon wbdfont"
                            for-id="162b8459a4a82554da5e6a12c2f21c8f"
                            style="font-size:none"
                            ></a
                          >
                          <span class="hobbyTitle">
                            <input
                              class="resume_value baseBorder"
                              for-key="162b8459a4a82554da5e6a12c2f21c8f"
                              placeholder="兴趣爱好"
                              value="游戏"
                            />
                          </span>
                          <div class="delete resume_delete"></div>
                        </div>
                        <div
                          class="hobbyicon baseDel resume_delete_area resume_icon_item"
                        >
                          <a
                            class="resume_icon_diy icon wbdfont"
                            for-id="b3cf5ddaec3cbe67762a2d8d3df17f17"
                            style="font-size:none"
                            ></a
                          >
                          <span class="hobbyTitle">
                            <input
                              class="resume_value baseBorder"
                              for-key="b3cf5ddaec3cbe67762a2d8d3df17f17"
                              placeholder="兴趣爱好"
                              value="摄影"
                            />
                          </span>
                          <div class="delete resume_delete"></div>
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div class="divRight clearfix resume_main" id="foo">
                  <!--姓名、求职意向-->

                  <div class="nameDiv positonDiv" id="resume_name">
                    <h1>
                      <div
                        class="resume_msg baseBorder resume_notice resume_lang_name"
                        notice-key="msg"
                        for-key="name"
                        for-value="html"
                        contenteditable="true"
                        v-if="resumeList && resumeList.base"
                      >
                        {{ resumeList.base[0].name }}
                      </div>
                    </h1>
                    <h2 v-if="position">
                      <div
                        class="resume_msg baseBorder resume_notice resume_lang_job"
                        notice-key="job"
                        for-key="job"
                        for-value="html"
                        contenteditable="true"
                      >
                        求职目标：{{ position }}
                      </div>
                    </h2>
                  </div>
                  <div id="foo_sort"></div>

                  <!--教育背景-->

                  <div
                    class="eduDiv baseItem positonDiv resume_item resume_add_area resume_sort resume_notice"
                    notice-key="edu"
                    id="resume_edu"
                    for-key="edu"
                  >
                    <ul class="editBtn">
                      <li
                        class="btnMove"
                        style="cursor:move;"
                        data-placement="top"
                        title="拖动调整上下位置"
                      ></li>
                      <li
                        class="btnPlus resume_add"
                        for-key="resume_item"
                        data-placement="bottom"
                        title="添加一项"
                      ></li>
                      <li
                        class="btnDel resume_hidden"
                        for-id="resume_edu"
                        data-placement="bottom"
                        title="隐藏该模块"
                      ></li>
                    </ul>
                    <dl>
                      <dt>
                        <Icon type="ios-school"
                          for-id="edu" size="35" style="margin-top:-10px"
                       />
                        <span>
                          <div class="resume_lang_edu">教育背景</div>
                          <div
                            class="Border resume_line"
                            for-id="edu"
                            style="width:668px;border-top-style:solid;border-top-width:2px;"
                          ></div>
                        </span>
                      </dt>
                      <dd class="resume_append_area" v-for="(item,index) in eduList" :key="index">
                        <div
                          class="baseContent baseDel resume_item_items resume_delete_area"
                        >
                          <div class="delete resume_delete"></div>
                          <div class="conTitle">
                            <span class="conTitle_time">
                              <div
                                class="resume_time baseBorder"
                                contenteditable="true"
                              >
                                2008.09-2012.07
                              </div>
                            </span>
                            <span class="conTitle_company">
                              <div
                                class="resume_unit baseBorder"
                                contenteditable="true"
                              >
                                {{item.type}} ({{item.time}})
                              </div>
                            </span>
                            <span class="conTitle_post">
                              <div
                                class="resume_job baseBorder"
                                contenteditable="true"
                              >
                                计算机科学与技术（本科）
                              </div>
                            </span>
                          </div>
                          <div class="baseDel_ resume_delete_area_">
                            <div class="delete_ resume_delete_"></div>
                            <div
                              class="conDisc baseBorder baseDel resume_value"
                              contenteditable="true"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="复制粘贴文字请右键-粘贴为纯文本"
                            >
                              <p>主修课程</p>
                              <p>
                                c++,java,数据结构，数据库概论，数据库应用，数字逻辑，汇编语言，EDA技术，Windows环境编程实践，操作系统，计算方法，J2EE，计算机网络，Linux操作系统，
                                计算机图形学，编译原理，微机接口技术。
                              </p>
                            </div>
                          </div>
                        </div>
                      </dd>
                    </dl>
                  </div>

                  <!--工作经历-->

                  <div
                    class="workDiv baseItem positonDiv resume_item resume_add_area resume_sort resume_notice"
                    notice-key="work"
                    id="resume_work"
                    for-key="work" 
                  >
                    <ul class="editBtn">
                      <li
                        class="btnMove"
                        style="cursor:move;"
                        data-placement="top"
                        title="拖动调整上下位置"
                      ></li>
                      <li
                        class="btnPlus resume_add"
                        for-key="resume_item"
                        data-placement="bottom"
                        title="添加一项"
                      ></li>
                      <li
                        class="btnDel resume_hidden"
                        for-id="resume_work"
                        data-placement="bottom"
                        title="隐藏该模块"
                      ></li>
                    </ul>
                    <dl>
                      <dt>
                       <Icon type="ios-paper"
                          for-id="edu" size="35" style="margin-top:-10px"
                       />
                        <span>
                          <div class="resume_lang_work">工作经历</div>
                          <div
                            class="Border resume_line"
                            for-id="work"
                            style="width:668px;border-top-style:solid;border-top-width:2px;"
                          ></div>
                        </span>
                      </dt>
                      <dd class="resume_append_area"  v-for="(item,index) in workList" :key="index">
                        <div
                          class="baseContent baseDel resume_item_items resume_delete_area"
                        >
                          <div class="delete resume_delete"></div>
                          <div class="conTitle">
                            <span class="conTitle_time">
                              <div
                                class="resume_time baseBorder"
                                contenteditable="true"
                              >
                                {{item.time}}
                              </div>
                            </span>
                            <span class="conTitle_company">
                              <div
                                class="resume_unit baseBorder"
                                contenteditable="true"
                              >
                                {{item.company}}
                              </div>
                            </span>
                            <span class="conTitle_post">
                              <div
                                class="resume_job baseBorder"
                                contenteditable="true"
                              >
                               {{item.projectName}}
                              </div>
                            </span>
                          </div>
                          <div class="baseDel_ resume_delete_area_">
                            <div class="delete_ resume_delete_"></div>
                            <div
                              class="conDisc baseBorder resume_value"
                              contenteditable="true"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="复制粘贴文字请右键-粘贴为纯文本"
                            >
                              <p>
                              {{item.content}}
                              </p>
                            </div>
                          </div>
                        </div>
                      </dd>
                    </dl>
                  </div>

                  <!--项目经验-->

                  <div
                    class="outexperDiv baseItem positonDiv resume_item resume_add_area resume_sort resume_notice"
                    notice-key="project"
                    id="resume_project"
                    for-key="project" 
                  >
                    <ul class="editBtn">
                      <li
                        class="btnMove"
                        style="cursor:move;"
                        data-placement="top"
                        title="拖动调整上下位置"
                      ></li>
                      <li
                        class="btnPlus resume_add"
                        for-key="resume_item"
                        data-placement="bottom"
                        title="添加一项"
                      ></li>
                      <li
                        class="btnDel resume_hidden"
                        for-id="resume_project"
                        data-placement="bottom"
                        title="隐藏该模块"
                      ></li>
                    </ul>
                    <dl>
                      <dt>
                      <Icon type="ios-create"
                          for-id="edu" size="35" style="margin-top:-10px"
                       />
                        <span>
                          <div class="resume_lang_project">项目经验</div>
                          <div
                            class="Border resume_line"
                            for-id="project"
                            style="width:668px;border-top-style:solid;border-top-width:2px;"
                          ></div>
                        </span>
                      </dt>
                      <dd class="resume_append_area" v-for="(item,index) in projectList" :key="index">
                        <div
                          class="baseContent baseDel resume_item_items resume_delete_area"
                        >
                          <div class="delete resume_delete"></div>
                          <div class="conTitle">
                            <span class="conTitle_time">
                              <div
                                class="resume_time baseBorder"
                                contenteditable="true"
                              >
                                2013.6-2013.9
                              </div>
                            </span>
                            <span class="conTitle_company">
                              <div
                                class="resume_unit baseBorder"
                                contenteditable="true"
                              >
                                {{item.projectName}}
                              </div>
                            </span>
                            <span class="conTitle_post">
                              <div
                                class="resume_job baseBorder"
                                contenteditable="true"
                              ></div>
                            </span>
                          </div>
                          <div class="baseDel_ resume_delete_area_">
                            <div class="delete_ resume_delete_"></div>
                            <div
                              class="conDisc baseBorder resume_value"
                              contenteditable="true"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="复制粘贴文字请右键-粘贴为纯文本"
                            >
                              <p>
                               {{item.content}}</p>
                            </div>
                          </div>
                        </div>
                  
                     
                      </dd>
                    </dl>
                  </div>

                  <!--自我评价-->

                  <div
                    class="selfDiv baseItem positonDiv resume_item resume_sort resume_notice"
                    notice-key="self"
                    id="resume_self"
                    for-key="self"
                  >
                    <ul class="editBtn">
                      <li
                        class="btnMove"
                        style="cursor:move;"
                        data-placement="top"
                        title="拖动调整上下位置"
                      ></li>
                      <li
                        class="btnPlus"
                        data-placement="bottom"
                        title="添加一项"
                        style="display:none;"
                      ></li>
                      <li
                        class="btnDel resume_hidden"
                        for-id="resume_self"
                        data-placement="bottom"
                        title="隐藏该模块"
                      ></li>
                    </ul>
                    <dl>
                      <dt>
                       <Icon type="ios-thumbs-up" 
                          for-id="edu" size="35" style="margin-top:-10px"
                       />
                        <span>
                          <div class="resume_lang_self">自我评价</div>
                          <div
                            class="Border resume_line"
                            for-id="self"
                            style="width:668px;border-top-style:solid;border-top-width:2px;"
                          ></div>
                        </span>
                      </dt>
                      <dd>
                        <div class="baseContent">
                          <div
                            class="conDisc baseBorder resume_lang_self_value resume_value"
                            contenteditable="true"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="复制粘贴文字请右键-粘贴为纯文本" v-for="(item,index) in evaluate" :key="index"
                          >
                            <p>
                             {{item}}</p>
                          </div>
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Content>
        <Footer> </Footer>
      </Layout>
    </div>
  </div>
</template>

<script>
import NavHeader from "@/components/NavHeader";
import NavFooter from "@/components/NavFooter";
import html2canvas from "html2canvas";
export default {
  name: "WriteResumeTemplate2",
  data() {
    return {
      resumeList: {},
      imgURL: "",
      userName: "",
      position: "",//期望职位
      eduList:[],//教育背景
      workList:[],//工作经历
      projectList:[],//开源或博客
      evaluate:[],//自我评价
      base:[]//基本信息

    };
  },
  components: {
    NavHeader,
    NavFooter
  },
  watch: {},
  methods: {
    // 转换图片
    changeImage() {
      let imgHeight = window.document.querySelector("#code").offsetHeight; // 获取DOM高度
      let imgWidth = window.document.querySelector("#code").offsetWidth; // 获取DOM宽度
      let scale = window.devicePixelRatio; // 获取设备像素比
      html2canvas(this.$refs.imgTransf, {
        backgroundColor: null, //设置背景颜色
        useCORS: true, //允许图片跨域
        scale: scale, //缩放2倍，使得图片更加清晰
        width: imgWidth,
        height: imgHeight,
        imageTimeout: 5000, //设置图片的超时，设置0为禁用
        proxy: "", //url代理，用于加载跨域图源，为空则不会加载
        ignoreElements: element => {
          //用于忽略转换的图片中不需要的匹配元素，注意，为true才不会转换
          if (element.id == "mytitle") {
            return true;
          }
        }
      }).then(canvas => {
        let imgURL = canvas.toDataURL("image/png");
        this.imgURL = imgURL;
        //
      });
    },

    //将图片Base64 转成文件
    dataURLtoFile(dataurl, filename) {
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
    // 上传图片，注意，上传图片要把图片的base64格式转换为图片格式，然后上传
    postImage() {
      var file = this.dataURLtoFile(this.imgURL, "img.png");
      let data = new FormData();
      data.append("file", file, file.name); //很重要 data.append("file", file);不成功
      data.append("data", 112);
      console.log(data.get("file"));
      this.axios.post("resumes/file", data, {
        headers: { "content-type": "multipart/form-data" }
      });
    },
    //下载图片
    downImg() {
      this.axios.post("resumes/downImg", {
        headers: { "content-type": "multipart/form-data" }
      });
    },
    // 获取简历信息
    getResumeInfo() {
      this.axios
        .post("resumes/getResumeInfo", {
          userName: "long" //暂时写死，到时候用vuex
        })
        .then(res => {
          if (res.data.status == "0") {
            this.resumeList = res.data.result.resumeContent;

            this.userName = res.data.result.userName;
            this.eduList = this.resumeList.education;
            this.workList = this.resumeList.work;
            this.projectList = this.resumeList.project;
            this.evaluate = this.resumeList.evaluate;
            this.base = this.resumeList.base;
            this.resumeList.base.forEach(element => {
              Object.keys(element).forEach(item => {
                if (item == "position") {
                  this.position = element.position;
                }
              });
            });
          }
        })
        .catch(err => {});
    }
  },
  mounted() {},
  created() {
    this.getResumeInfo();
  }
};
</script>

<style lang="less" scoped>
.zm {
  margin: 0 auto;
}

.baseStyle .divLeft {
  float: left;
  width: 281px;
  padding: 0 2px;
  background: #254665;
}

.baseStyle .divRight {
  float: right;
  width: 819px;
  padding: 0 5px;
}

.msgDiv .icon.resume_focus:after {
  width: 28px;
  height: 40px;
  top: 1px;
  left: -6px;
}

.hobbyicon .icon.resume_focus:after {
  width: 40px;
  height: 40px;
  top: 15px;
  left: 20px;
}

.baseItem .icon.resume_focus:after {
  width: 50px;
  height: 50px;
  top: 12px;
  left: 32px;
}

.custDel .cust_delete {
  left: 12px;
}

.baseStyle .headDiv {
  width: 150px;
  height: 200px;
  margin: 0 auto;
  border: 6px solid rgba(255, 255, 255, 0.9);
  position: relative;
  overflow: hidden;
  margin-bottom: 30px;
}

.baseStyle .headDiv img {
  display: block;
  cursor: pointer;
}

.baseStyle .headDiv .headNotice {
  position: absolute;
  cursor: pointer;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  text-align: center;
  padding-top: 164px;
  color: rgba(255, 255, 255, 0.5);
  opacity: 0;
}

.baseStyle .headDiv:hover .headNotice {
  opacity: 1;
}

.baseStyle .baseItem dl dt {
  height: 67px;
  overflow: auto;
}

.baseStyle .msgDiv {
  padding: 10px 20px;
  min-height: 50px;
}

.baseStyle .msgDiv .baseMsg {
  height: 40px;
  line-height: 40px;
  color: #fff;
  margin-bottom: 4px;
  width: 322px;
}

.baseStyle .msgDiv .baseMsg a {
  display: inline-block;
  font-size: 16px;
  margin-right: 4px;
  vertical-align: middle;
  color: #fff;
  float: left;
  margin-top: 8px;
}

.baseStyle .msgDiv .baseDel .delete {
  top: 11px;
  left: -21px;
  font-size: 16px;
  padding-left: 11px;
}

.baseStyle .msgDiv input {
  width: 230px;
  float: left;
}

.baseStyle .skillDiv {
  padding: 0 20px;
  min-height: 50px;
}

.baseStyle .skillDiv .skillUl li {
  color: #fff;
  margin: 10px 0;
}

.baseStyle .skillDiv .skillUl li span {
  width: 214px;
  height: 15px;
  position: relative;
  display: block;
  margin-top: 10px;
}

.baseStyle .skillDiv .skillUl li span i {
  width: 60%;
  position: absolute;
  display: block;
  left: 0;
  top: 0;
  border-color: #92a3b2;
  border-top-style: solid;
  border-top-width: 8px;
}

.baseStyle .skillDiv .skillUl li .skillTitle {
  height: 30px;
  width: 240px;
}

.baseStyle .skillDiv .baseDel .delete {
  top: 3px;
  left: -21px;
  position: absolute;
}

.baseStyle .hobbyDiv {
  padding: 20px 15px;
}

.baseStyle .hobbyDiv dl dt {
  margin-bottom: 10px;
}

.baseStyle .hobbyDiv dl dt span {
  font-size: 16pt;
  font-weight: 600;
  color: #92a3b2;
}

.baseStyle .hobbyDiv dl dd {
  margin-left: -10px;
}

.baseStyle .hobbyDiv dl dd .hobbyicon {
  width: 80px;
  padding: 5px;
  float: left;
  margin: 5px;
  position: relative;
  border: 1px solid transparent;
}

.baseStyle .hobbyDiv dl dd .hobbyicon a {
  display: block;
  width: 70px;
  height: 70px;
  text-align: center;
  font-size: 40px;
  color: #92a3b2;
}

.baseStyle .hobbyDiv dl dd .hobbyicon span {
  display: block;
  text-align: center;
  color: #92a3b2;
  font-size: 14px;
  width: 70px;
}

.baseStyle .hobbyDiv dl dd .delete {
  top: 104px;
  left: 30px;
  font-size: 16px;
}

.baseStyle .nameDiv {
  margin-top: 0px;
  position: relative;
}

.baseStyle .nameDiv h1 {
  width: 100%;
  text-align: left;
}

.baseStyle .nameDiv h2 {
  width: 100%;
  text-align: left;
  font-weight: lighter;
}

.baseStyle .nameDiv.positonDiv {
  padding: 20px 40px;
  margin-top: -38px;
}

// .baseStyle,.jm0203_j1{background:url(../images/j1_bg.png) repeat-y;}

.jm0203_j1 .nameDiv h1 {
  color: #254665;
}

.jm0203_j1 .nameDiv h2 {
  color: #254665;
}

.jm0203_j1 .baseItem dl dt a {
  color: #254665;
  line-height: 67px;
  height: 67px;
}

.jm0203_j1 .baseItem dl dt span {
  color: #254665;
}

.jm0203_j1 .baseItem dl dt span div.Border {
  border-top-style: solid;
  border-top-color: #254665;
  border-top-width: 2px;
}

.jm0203_j1 .skillDiv .skillUl li span i {
  border-color: #92a3b2;
}

.jm0203_j1 .hobbyDiv dl dt span {
  color: #aab2bc;
}

.jm0203_j1 .hobbyDiv dl dd .hobbyicon a {
  color: #aab2bc;
}

.jm0203_j1 .hobbyDiv dl dd .hobbyicon span {
  color: #aab2bc;
}

.jm0203_j1 .baseItem dl dd {
  color: #2f2c28;
}

// .jm0203_j2{background:url(../images/j2_bg.png) repeat-y;}

.jm0203_j2 .nameDiv h1 {
  color: #dd415e;
}

.jm0203_j2 .nameDiv h2 {
  color: #dd415e;
}

.jm0203_j2 .baseItem dl dt a {
  color: #dd415e;
  line-height: 67px;
  height: 67px;
}

.jm0203_j2 .baseItem dl dt span {
  color: #dd415e;
}

.jm0203_j2 .baseItem dl dt span div.Border {
  border-top-style: solid;
  border-top-color: #dd415e;
  border-top-width: 2px;
}

.jm0203_j2 .skillDiv .skillUl li span i {
  border-color: #ffb7c4;
}

.jm0203_j2 .hobbyDiv dl dt span {
  color: #eeb1ba;
}

.jm0203_j2 .hobbyDiv dl dd .hobbyicon a {
  color: #eeb1ba;
}

.jm0203_j2 .hobbyDiv dl dd .hobbyicon span {
  color: #eeb1ba;
}

.jm0203_j2 .baseItem dl dd {
  color: #2f2c28;
}

// .jm0203_j3{background:url(../images/j3_bg.png) repeat-y;}

.jm0203_j3 .nameDiv h1 {
  color: #967a5b;
}

.jm0203_j3 .nameDiv h2 {
  color: #967a5b;
}

.jm0203_j3 .baseItem dl dt a {
  color: #967a5b;
  line-height: 67px;
  height: 67px;
}

.jm0203_j3 .baseItem dl dt span {
  color: #967a5b;
}

.jm0203_j3 .baseItem dl dt span div.Border {
  border-top-style: solid;
  border-top-color: #967a5b;
  border-top-width: 2px;
}

.jm0203_j3 .skillDiv .skillUl li span i {
  border-color: rgba(234, 234, 234, 0.9);
}

.jm0203_j3 .hobbyDiv dl dt span {
  color: rgba(234, 234, 234, 0.9);
}

.jm0203_j3 .hobbyDiv dl dd .hobbyicon a {
  color: rgba(234, 234, 234, 0.9);
}

.jm0203_j3 .hobbyDiv dl dd .hobbyicon span {
  color: rgba(234, 234, 234, 0.9);
}

.jm0203_j3 .baseItem dl dd {
  color: #2f2c28;
}

// .jm0203_j4{background:url(../images/j4_bg.png) repeat-y;}

.jm0203_j4 .nameDiv h1 {
  color: #3390cd;
}

.jm0203_j4 .nameDiv h2 {
  color: #3390cd;
}

.jm0203_j4 .baseItem dl dt a {
  color: #3390cd;
  line-height: 67px;
  height: 67px;
}

.jm0203_j4 .baseItem dl dt span {
  color: #3390cd;
}

.jm0203_j4 .baseItem dl dt span div.Border {
  border-top-style: solid;
  border-top-color: #3390cd;
  border-top-width: 2px;
}

.jm0203_j4 .skillDiv .skillUl li span i {
  border-color: rgba(234, 234, 234, 0.9);
}

.jm0203_j4 .hobbyDiv dl dt span {
  color: rgba(234, 234, 234, 0.9);
}

.jm0203_j4 .hobbyDiv dl dd .hobbyicon a {
  color: rgba(234, 234, 234, 0.9);
}

.jm0203_j4 .hobbyDiv dl dd .hobbyicon span {
  color: rgba(234, 234, 234, 0.9);
}

.jm0203_j4 .baseItem dl dd {
  color: #2f2c28;
}

// .jm0203_j5{background:url(../images/j5_bg.png) repeat-y;}

.jm0203_j5 .nameDiv h1 {
  color: #f54f4f;
}

.jm0203_j5 .nameDiv h2 {
  color: #f54f4f;
}

.jm0203_j5 .baseItem dl dt a {
  color: #f54f4f;
  line-height: 67px;
  height: 67px;
}

.jm0203_j5 .baseItem dl dt span {
  color: #f54f4f;
}

.jm0203_j5 .baseItem dl dt span div.Border {
  border-top-style: solid;
  border-top-color: #f54f4f;
  border-top-width: 2px;
}

.jm0203_j5 .skillDiv .skillUl li span i {
  border-color: rgba(234, 234, 234, 0.9);
}

.jm0203_j5 .hobbyDiv dl dt span {
  color: rgba(234, 234, 234, 0.9);
}

.jm0203_j5 .hobbyDiv dl dd .hobbyicon a {
  color: rgba(234, 234, 234, 0.9);
}

.jm0203_j5 .hobbyDiv dl dd .hobbyicon span {
  color: rgba(234, 234, 234, 0.9);
}

.jm0203_j5 .baseItem dl dd {
  color: #2f2c28;
}

// .jm0203_j6{background:url(../images/j6_bg.png) repeat-y;}

.jm0203_j6 .nameDiv h1 {
  color: #4d4d4d;
}

.jm0203_j6 .nameDiv h2 {
  color: #4d4d4d;
}

.jm0203_j6 .baseItem dl dt a {
  color: #4d4d4d;
  line-height: 67px;
  height: 67px;
}

.jm0203_j6 .baseItem dl dt span {
  color: #4d4d4d;
}

.jm0203_j6 .baseItem dl dt span div.Border {
  border-top-style: solid;
  border-top-color: #4d4d4d;
  border-top-width: 2px;
}

.jm0203_j6 .skillDiv .skillUl li span i {
  border-color: rgba(234, 234, 234, 0.9);
}

.jm0203_j6 .hobbyDiv dl dt span {
  color: rgba(234, 234, 234, 0.9);
}

.jm0203_j6 .hobbyDiv dl dd .hobbyicon a {
  color: rgba(234, 234, 234, 0.9);
}

.jm0203_j6 .hobbyDiv dl dd .hobbyicon span {
  color: rgba(234, 234, 234, 0.9);
}

.jm0203_j6 .baseItem dl dd {
  color: #2f2c28;
}

// .jm0203_j7{background:url(../images/j7_bg.png) repeat-y;}

.jm0203_j7 .nameDiv h1 {
  color: #aa8460;
}

.jm0203_j7 .nameDiv h2 {
  color: #aa8460;
}

.jm0203_j7 .baseItem dl dt a {
  color: #aa8460;
  line-height: 67px;
  height: 67px;
}

.jm0203_j7 .baseItem dl dt span {
  color: #aa8460;
}

.jm0203_j7 .baseItem dl dt span div.Border {
  border-top-style: solid;
  border-top-color: #aa8460;
  border-top-width: 2px;
}

.jm0203_j7 .skillDiv .skillUl li span i {
  border-color: rgba(234, 234, 234, 0.9);
}

.jm0203_j7 .hobbyDiv dl dt span {
  color: rgba(234, 234, 234, 0.9);
}

.jm0203_j7 .hobbyDiv dl dd .hobbyicon a {
  color: rgba(234, 234, 234, 0.9);
}

.jm0203_j7 .hobbyDiv dl dd .hobbyicon span {
  color: rgba(234, 234, 234, 0.9);
}

.jm0203_j7 .baseItem dl dd {
  color: #2f2c28;
}

// .jm0203_j8{background:url(../images/j8_bg.png) repeat-y;}

.jm0203_j8 .nameDiv h1 {
  color: #76ba31;
}

.jm0203_j8 .nameDiv h2 {
  color: #76ba31;
}

.jm0203_j8 .baseItem dl dt a {
  color: #76ba31;
  line-height: 67px;
  height: 67px;
}

.jm0203_j8 .baseItem dl dt span {
  color: #76ba31;
}

.jm0203_j8 .baseItem dl dt span div.Border {
  border-top-style: solid;
  border-top-color: #76ba31;
  border-top-width: 2px;
}

.jm0203_j8 .skillDiv .skillUl li span i {
  border-color: rgba(234, 234, 234, 0.9);
}

.jm0203_j8 .hobbyDiv dl dt span {
  color: rgba(234, 234, 234, 0.9);
}

.jm0203_j8 .hobbyDiv dl dd .hobbyicon a {
  color: rgba(234, 234, 234, 0.9);
}

.jm0203_j8 .hobbyDiv dl dd .hobbyicon span {
  color: rgba(234, 234, 234, 0.9);
}

.jm0203_j8 .baseItem dl dd {
  color: #2f2c28;
}

// .jm0203_j9{background:url(../images/j9_bg.png) repeat-y;}

.jm0203_j9 .nameDiv h1 {
  color: #647ec9;
}

.jm0203_j9 .nameDiv h2 {
  color: #647ec9;
}

.jm0203_j9 .baseItem dl dt a {
  color: #647ec9;
  line-height: 67px;
  height: 67px;
}

.jm0203_j9 .baseItem dl dt span {
  color: #647ec9;
}

.jm0203_j9 .baseItem dl dt span div.Border {
  border-top-style: solid;
  border-top-color: #647ec9;
  border-top-width: 2px;
}

.jm0203_j9 .skillDiv .skillUl li span i {
  border-color: rgba(234, 234, 234, 0.9);
}

.jm0203_j9 .hobbyDiv dl dt span {
  color: rgba(234, 234, 234, 0.9);
}

.jm0203_j9 .hobbyDiv dl dd .hobbyicon a {
  color: rgba(234, 234, 234, 0.9);
}

.jm0203_j9 .hobbyDiv dl dd .hobbyicon span {
  color: rgba(234, 234, 234, 0.9);
}

.jm0203_j9 .baseItem dl dd {
  color: #2f2c28;
}
.n_dispage_jm .n_dispage_jm_in {
  width: 1100px;
  height: auto;
  box-shadow: 0 0 40px #bdbdbd;
  position: relative;
}
.resetEditStyle .baseStyle {
  margin: 0 auto;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.baseStyle {
  width: 1100px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin: 10px auto 0 auto;
  /* height: auto; */
  padding-top: 50px;
  position: relative;
}
.clearfix {
  zoom: 1;
}
.clearfix {
  display: block;
}
.clearfix {
  height: 1%;
}
.baseStyle .divLeft {
  float: left;
  width: 281px;
  padding: 0 2px;
}
.baseStyle .headDiv {
  width: 150px;
  height: 200px;
  margin: 0 auto;
  border: 6px solid rgba(255, 255, 255, 0.9);
  position: relative;
  overflow: hidden;
  margin-bottom: 30px;
}

.baseStyle .headDiv {
  box-sizing: content-box;
  -moz-box-sizing: content-box;
  -webkit-box-sizing: content-box;
}
.baseStyle .msgDiv {
  padding: 10px 20px;
  min-height: 50px;
}

.baseStyle .positonDiv {
  margin: 20px 0;
  position: relative;
  border: 1px dashed transparent;
  transition: all 0.3s;
  -moz-transition: all 0.3s;
  -webkit-transition: all 0.3s;
  padding: 2px 0 20px 0;
}
.positonDiv .editBtn {
  width: 30px;
  height: 100%;
  position: absolute;
  top: 20px;
  left: -36px;
  display: block;
  opacity: 0;
  filter: alpha(opacity=0);
  transition: all 0.3s;
  -moz-transition: all 0.3s;
  -webkit-transition: all 0.3s;
  -ms--transition: all 0.3s;
}

ul,
ol,
li {
  list-style: none;
  color: #2f2c28;
  font-size: 14px;
  font-weight: normal;
}
.positonDiv .editBtn li.btnMove {
  background-position: 5px -624px;
}
.positonDiv .editBtn li {
  display: block;
  width: 24px;
  height: 24px;
  background-color: rgba(141, 165, 252, 0.5);
  border-radius: 6px;
  margin-bottom: 4px;
}
.positonDiv .editBtn li.btnPlus {
  background-position: -44px -624px;
  cursor: pointer;
}

.positonDiv .editBtn li {
  display: block;
  width: 24px;
  height: 24px;
  background-color: rgba(141, 165, 252, 0.5);
  border-radius: 6px;
  margin-bottom: 4px;
}
.baseStyle .msgDiv .baseMsg {
  height: 40px;
  line-height: 40px;
  color: #fff;
  margin-bottom: 4px;
  width: 322px;
}

.baseStyle .msgDiv .baseMsg {
  font-size: 16px;
}
.baseDel {
  position: relative;
  border: 1px solid transparent;
}
.baseStyle .msgDiv .baseDel .delete {
  top: 11px;
  left: -21px;
  font-size: 16px;
  padding-left: 11px;
}

.resetEditStyle .baseStyle .headDiv .headNotice,
.resetEditStyle .positonDiv .editBtn,
.resetEditStyle .baseDel .delete,
.resetEditStyle .baseDel_ .delete_,
.resetEditStyle .baseDel_:hover .delete_,
.resetEditStyle .resume_drag span {
  display: none;
}
.baseDel .delete {
  position: absolute;
  top: -8px;
  right: -10px;
  // background: url(../images/zxbjSp.png) no-repeat -262px -627px;
  cursor: pointer;
  display: none;
  width: 20px;
  height: 20px;
}
.baseStyle input {
  font-size: inherit;
  background: none;
  border: none;
  width: inherit;
  height: inherit;
  font-weight: inherit;
  font-family: inherit;
  color: inherit;
  text-align: inherit;
}
.resetEditStyle .baseStyle .baseBorder,
.resetEditStyle .baseStyle .positonDiv {
  border-color: transparent;
}

.baseStyle .msgDiv input {
  width: 230px;
  float: left;
}
.resetEditStyle .baseStyle .baseBorder,
.resetEditStyle .baseStyle .positonDiv {
  border-color: transparent;
}

.baseStyle .skillDiv {
  padding: 0 20px;
  min-height: 50px;
}
.baseStyle .divRight {
  float: right;
  width: 819px;
  padding: 0 5px;
}
.baseStyle .nameDiv.positonDiv {
  padding: 20px 40px;
  margin-top: -38px;
}

.resetEditStyle .baseStyle .baseBorder,
.resetEditStyle .baseStyle .positonDiv {
  border-color: transparent;
}
.baseStyle .nameDiv {
  position: relative;
}
.baseStyle .positonDiv {
  border: 1px dashed transparent;

  -moz-transition: all 0.3s;
  -webkit-transition: all 0.3s;

  padding: 2px 0 20px 0;
}
.resetEditStyle .baseStyle .baseBorder,
.resetEditStyle .baseStyle .positonDiv {
  border-color: transparent;
}
.jm0203_j1 .nameDiv h2 {
  color: #254665;
}

.baseStyle .nameDiv h2 {
  width: 100%;
  text-align: left;
  font-weight: lighter;
}
.baseStyle .nameDiv h2 {
  font-size: 18px;
}
.jm0203_j1 .nameDiv h1 {
  color: #254665;
}

.baseStyle .nameDiv h1 {
  width: 100%;
  text-align: left;
}
.baseStyle .nameDiv h1 {
  font-size: 48px;
}
.resetEditStyle .baseStyle .baseBorder,
.resetEditStyle .baseStyle .positonDiv {
  border-color: transparent;
}

.baseStyle .baseItem {
  padding-bottom: 0;
  margin: 0;
}
.baseStyle .positonDiv {
  position: relative;
  border: 1px dashed transparent;
  transition: all 0.3s;
  -moz-transition: all 0.3s;
  -webkit-transition: all 0.3s;
  -ms--transition: all 0.3s;
  padding: 2px 0 20px 0;
}
.baseStyle .baseItem .editBtn {
  left: -36px;
}

ul,
ol,
li {
  list-style: none;
  color: #2f2c28;
  font-size: 14px;
  font-weight: normal;
}
.baseStyle .baseItem dl {
  width: 100%;
  overflow: hidden;
}
.baseStyle .baseItem dl dt {
  height: 67px;
  overflow: auto;
}

.baseStyle .baseItem dl dt {
  height: 65px;
  line-height: 65px;
  padding: 0 35px;
  width: 100%;
  overflow: hidden;
}
.jm0203_j1 .baseItem dl dt a {
  color: #254665;
  line-height: 67px;
  height: 67px;
}

.baseStyle .baseItem dl dt a {
  display: inline-table;
  margin-right: 6px;
  font-size: 45px;
  vertical-align: middle;
  text-align: center;
  color: #254665;
  height: 45px;
  float: left;
}
.jm0203_j1 .baseItem dl dt span {
  color: #254665;
}

.baseStyle .baseItem dl dt span {
  font-size: 26px;
}
.baseStyle .baseItem dl dt span {
  line-height: 62px;
  font-weight: 600;
  color: #000;
  padding-bottom: 5px;
  display: inline-block;
  position: relative;
}
.jm0203_j1 .baseItem dl dt span div.Border {
  border-top-style: solid;
  border-top-color: #254665;
  border-top-width: 2px;
}
.baseStyle .baseItem dl dt span div.Border {
  position: absolute;
  top: 50px;
  left: 0px;
  display: block;
  background: transparent;
  width: 668px;
  cursor: pointer;
  border-top-style: solid;
  border-top-color: #000000;
  border-top-width: 2px;
}
.resume_line {
  cursor: pointer;
  height: 0px !important;
}
.jm0203_j1 .baseItem dl dd {
  color: #2f2c28;
}

.baseStyle .baseItem dl dd {
  font-size: 16px;
}
.baseStyle .baseItem .baseContent {
  margin-bottom: 10px;
  margin: 0 40px;
  padding: 5px 0 5px 5px;
}

.baseDel {
  position: relative;
  border: 1px solid transparent;
}
.baseStyle .baseItem .baseContent .conTitle {
  overflow: hidden;
}
.baseStyle .baseItem .baseContent .conTitle span.conTitle_time {
  width: 180px;
}

.baseStyle .baseItem .baseContent .conTitle span {
  height: initial;
  line-height: initial;
  font-weight: normal;
  float: left;
}
.baseStyle .baseItem .baseContent .conTitle span.conTitle_company {
  width: 290px;
}

.baseStyle .baseItem .baseContent .conTitle span {
  height: initial;
  line-height: initial;
  font-weight: normal;
  float: left;
}

.resetEditStyle .baseStyle .baseBorder,
.resetEditStyle .baseStyle .positonDiv {
  border-color: transparent;
}
.baseStyle .baseItem .baseContent .conTitle span.conTitle_post {
  width: 240px;
}

.baseStyle .baseItem .baseContent .conTitle span {
  height: initial;
  line-height: initial;
  font-weight: normal;
  float: left;
}
</style>
