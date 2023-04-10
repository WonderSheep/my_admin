<template>
  <div>
    <div class="banner" >后台管理系统</div>
    <el-card class="box-card">
      <el-tabs stretch v-model="activeName" @tab-click="handleClick" @keyup.enter="submitForm('loginForm')">
        <el-tab-pane label="登录" name="login" >
          <el-form :model="loginForm" status-icon ref="loginForm" label-width="70px">
            <el-form-item label="用户名">
              <el-input type="text" v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密 码" >
              <el-input type="password" v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" round :loading="isloading" @click="submitForm('loginForm')">登录</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="register">
          <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="70px">
            <el-form-item label="用户名" prop="username">
              <el-input type="text" v-model="registerForm.username"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input type="email" v-model="registerForm.email"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="registerForm.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkpassword">
              <el-input type="password" v-model="registerForm.checkpassword"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" round :loading="isloading"
                @click="submitRegisterForm('registerForm')">提交</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>

import api from "../../api";
import { mapMutations } from "vuex";
import jwtDecode from 'jwt-decode';

export default {
  name: 'loginCenter',
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error('用户名不能为空'));
      } else if (value.length < 5 || value.length > 10) {
        callback(new Error('用户名长度必须5-10个字符内'));
      } else {
        callback();
      }
    };

    var validateEmail = (rule, value, callback) => {
      const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/
      if (value === '') {
        callback(new Error('邮箱不能为空'));
      } else if (!reg.test(value)) {
        callback(new Error('邮箱格式不正确'));
      } else {
        callback();
      }
    };

    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'));
      } else {
        callback();
      }
    };

    var validateCheckPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'));
      } if (value != this.registerForm.password) {
        callback(new Error('两次密码不一致'))
      } else {
        callback();
      }
    };

    return {
      activeName: 'login',
      loginForm: {
        username: '',
        password: ''
      },
      registerForm: {
        username: "",
        password: "",
        email: "",
        checkpassword: ""
      },
      isloading: false,
      rules: {
        username: [
          { validator: validateUsername, trigger: "blur" },
        ],
        email: [
          { validator: validateEmail, trigger: "blur" }
        ],
        password: [
          { validator: validatePassword, trigger: "blur" }
        ],
        checkpassword: [
          { validator: validateCheckPassword, trigger: "blur" }
        ]
      }
    }
  },
  methods: {
    ...mapMutations("loginModule", ["updateUsername", "updateToken"]),
    handleClick(tab, event) {
      
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.login({
            username: this.loginForm.username,
            password: this.loginForm.password
          }).then(res => {
            if (res.data.status === 200) {
              // this.updateUsername(res.data.result[0].username);
              this.updateToken(res.data.token);
              this.updateUsername(jwtDecode(res.data.token).username);
              var currentObj = {
                token:res.data.token,
                username:jwtDecode(res.data.token).username
              }
              localStorage.setItem('token', JSON.stringify(currentObj));
              this.$router.push('/');

            }
          }).catch(error => {
            console.log(error);
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    submitRegisterForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.register({
            username: this.registerForm.username,
            password: this.registerForm.password,
            email: this.registerForm.email
          }).then(res => {
            console.log(res);
            this.$message({
              message: '恭喜你,注册成功！',
              type: 'success'
            });
          }).catch(error => {
            console.log(error);
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
}
</script>

<style scoped>
.banner {
  font-size: 30px;
  margin-top: 100px;
}

.box-card {
  width: 600px;
  margin: 0 auto;
  margin-top: 20px;
}
</style>
