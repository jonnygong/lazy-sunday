<template>
    <div class="login-panel">
        <el-row>
            <el-col :span="14">
                <div class="company-info">
                    <div class="logo">
                        <img src="../../assets/images/logo.png" style="width:120px;height:20px">
                    </div>
                    <h5 class="title">杭州快房传媒管理系统后台登录</h5>
                    <ul class="intro">
                         <li><i class="fa fa-arrow-circle-o-right mr5"></i>
                 懒人周末是一款个性化的内容推荐应用，推荐精致的周末生活方式。内容涵盖同城活动、美食、周边游、运动、度假、演唱会、
        话剧、音乐会、读书会、展览、户外、酒吧、购物、电影、公益等，部分活动在APP上预订会带来令人惊喜的超低折扣。
        
            </li>
            <li><i class="fa fa-arrow-circle-o-right mr5"></i>
                在这里，每一个周末都是惊喜！
            </li>
             </ul>
                </div>
            </el-col>
            <el-col :span="10">
                <el-form :model="loginForm" :rules="loginRule" ref="loginForm" label-position="left" label-width="0px"
                         class="demo-ruleForm login-container" @keyup.enter.native="handleSubmit">
                    <h3 class="title">登录</h3>
                    <el-form-item prop="username">
                        <el-input type="text" v-model="loginForm.username" auto-complete="off"
                                  placeholder="用户名"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" v-model="loginForm.password" auto-complete="off"
                                  placeholder="密码"></el-input>
                    </el-form-item>
                
                    <el-form-item style="width:100%;">
                        <span class="forgot-pwd">忘记密码？</span>
                    </el-form-item>

                    <el-form-item style="width:100%;">
                        <el-button type="primary"
                                   style="width:100%;"
                                   @click.native.prevent="handleSubmit"
                                   :loading="logining">登录
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <div class="login-footer">
            <div class="copyright">
                ©  2017 版权所有：杭州快房传媒有限公司  浙ICP备09096541号
            </div>
            <div class="author">
                Created By: 快房传媒
            </div>
        </div>
    </div>
</template>

<script>
import configs from "@/configs/api";
// 获取请求地址域名以及接口列表
const { baseUrl, api } = configs;
export default {
  data() {
    return {
      logining: false,
      loginForm: {
        username: "admin",
        password: "123456"
      },
      codeSrc: "", // 获取到的验证码URL
      loginRule: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSubmit(ev) {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          this.logining = true;
          const params = Object.assign({}, this.loginForm);
          const res = await this.$http.post("login", params);
          this.logining = false;
          if (res !== null) {
            // 登录成功跳转
            this.$store.dispatch("login");
            this.$message.success(res.errmsg);
            this.$router.push({ path: "/main" });
            sessionStorage.JWT_TOKEN = res.data.token;
          } else {
            // 错误后，重新获取验证码
            this.loginForm.code = "";
            this.getCode();
          }
        } else {
          this.$message.error("请正确填写表单后提交！");
          return false;
        }
      });
    },
    // 获取验证码
    getCode() {
      this.codeSrc = `${baseUrl}${api["code"]}?${new Date().getTime()}`;
    }
  },
  mounted() {
    // 获取验证码
    this.getCode();
  }
};
</script>

<style lang="scss">
@import "Login";
</style>