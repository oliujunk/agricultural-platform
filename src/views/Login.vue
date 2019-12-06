<template>
  <el-container>
    <el-header style="text-align: right; margin-top: 20px; margin-right: 20px;">
      <i class="el-icon-third-language"></i>
      <el-dropdown trigger="click" @command="handleLanguageChange" style="margin-left: 10px; cursor: pointer;">
        <span class="el-dropdown-link">
          {{$t('login.language')}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item, index) in languageList" :key="index" :command="item.type">{{item.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-main>
      <el-row>
        <el-col :span="12">
          <div class="title">
            <div class="main-heading">{{$t('login.agricultureMainHeading')}}</div>
            <div class="sub-heading">{{$t('login.subHeading')}}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <el-form :model="loginForm" class="login-form">
            <h3>{{$t('login.form.title')}}</h3>
            <el-form-item>
              <el-input
                :placeholder="$t('login.form.accountPlaceholder')"
                v-model="loginForm.username"
              ></el-input>
              <span slot="label" style="color: black;">{{$t('login.form.account')}}</span>
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="loginForm.password"
                :placeholder="$t('login.form.passwordPlaceholder')"
                type="password"
                @keyup.enter.native="login"
              ></el-input>
              <span slot="label" style="color: white;">{{$t('login.form.password')}}</span>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="login"
                v-loading="logining"
              >{{$t('login.form.loginButtom')}}</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="4"></el-col>
      </el-row>
    </el-main>
    <el-footer>{{$t('login.footer')}}</el-footer>
  </el-container>
</template>

<script>
export default {
  name: 'login',

  props: ['username', 'password'],

  data() {
    return {
      logining: false,
      loginForm: {
        username: '',
        password: '',
      },
      language: 'zh_CN',
      languageList: [
        { type: 'zh_CN', name: '中文' },
        { type: 'en_US', name: 'English' },
      ],
    };
  },

  methods: {
    login() {
      this.logining = true;
      this.$http
        .post('/login', {
          username: this.loginForm.username,
          password: this.loginForm.password,
        })
        .then((response) => {
          if (response.data.token) {
            sessionStorage.setItem('username', this.loginForm.username);
            sessionStorage.setItem('token', response.data.token);
            this.$router.push('/');
          } else {
            this.$message.error(this.$t('login.loginUsernameError'));
          }
          this.logining = false;
        })
        .catch((error) => {
          console.log(error);
          this.logining = false;
          this.$message.error(this.$t('login.loginError'));
        });
    },
    handleLanguageChange(command) {
      this.$i18n.locale = command;
      document.title = this.$t('title');
      this.$store.commit('language', { language: command });
      localStorage.setItem('language', command);
    },
  },

  mounted() {
    if (this.username && this.password) {
      this.loginForm.username = this.username;
      this.loginForm.password = this.password;
      this.login();
    }
  },
};
</script>

<style lang="scss" scoped>
.el-container {
  background: url('http://47.105.215.208:8081/images/onstage/login_bg.jpg');
  background-size: cover;
  height: 100%;
}

.title {
  margin-top: 150px;
  margin-right: 100px;
  text-align: right;
}

.main-heading {
  font-size: 40px;
  color: rgba(0,0,0,1.0);
  font-weight: bold;
}

.sub-heading {
  font-size: 25px;
  color: rgba(0,0,0,0.8);
  font-weight: bold;
}

.el-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2em;
  background-color: rgba(0,0,0,0.5);
  color: white;
}

.login-form {
  border: 1px solid #DCDFE6;
  width: 350px;
  margin: 130px auto;
  @media screen and (max-width: 1440px) {
    margin: 30px auto;
  }
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}

</style>
