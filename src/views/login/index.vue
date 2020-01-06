<template>
    <div class="login-container">
        <div class="login-box">
            <!-- 绘制登录form表单 -->
            <el-form ref="loginFormRef" :model="loginForm"  class="el-form" :rules='loginFormRules'>
                <img src="./logo_index.png" alt="">
                <!-- prop使得校验规则可以找到当前目录进行匹配校验，值 就是当前项目的名称 -->
                <el-form-item prop="mobile">
                    <el-input v-model="loginForm.mobile" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input v-model="loginForm.code"  placeholder="请输入校验码"></el-input>
                </el-form-item>
                <el-form-item class="el-form-item" prop="xieyi">
                    <!-- 复选框，单个复选框直接设置v-model即可，接收true/false的信息 -->
                    <el-checkbox v-model="loginForm.xieyi"></el-checkbox>
                    <span>我已阅读并同意
                        <a href="">用户协议</a>和
                        <a href="">隐私条款</a>
                    </span>
                </el-form-item>
                <el-form-item>
                    <el-button style="width:100%;" type="primary" @click="login()">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>

export default {
  data () {
    // 声明局部函数，实现校验
    var xieyiTest = function (rule, value, callback) {
      // rule：校验规则，一般无用
      // value：被校验的数据
      // callback：毁掉函数，校验失败或成功都执行
      if (value) {
        callback()
      } else {
        return callback(new Error('请遵守协议'))
      }
    }
    return {
      // 表单数据对象
      loginForm: {
        mobile: '',
        code: '',
        xieyi: false
      },
      //   表单校验
      loginFormRules: {
        // required：项目必填
        // message：错误提示
        // min：信息长度最小限制
        // max：信息长度最大限制

        mobile: [
          // 必填
          { required: true, message: '手机号码必填' },
          { pattern: /^1[35789]\d{9}$/, message: '手机号码格式不对' }
        ],
        code: [
          // 必填
          { required: true, message: '验证码必填' }
        ],
        xieyi: [
          { validator: xieyiTest }
        ]
      }
    }
  },
  methods: {
    login () {
      // console.log(this)
      // 全部表单域项目校验
      // 获得form表单组件的语句: this.$refs.loginFormRef
      // form组件.validate(回调函数)
      // 参数valid：会体现布尔值，表示校验是否成功
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) {
          return false
        }

        // 服务器端账号真实校验
        let p = this.$http({
          url: '/authorizations',
          method: 'POST',
          data: this.loginForm
        })
        p
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log('手机号码或验证码错误' + err)
          })

        // 路由编程式导航
        // this.$router.push('/home')
        this.$router.push({ name: 'home' })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container{
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('./login_bg.jpg');
    background-size: cover;
    height: 100%;
    .login-box{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 410px;
        height: 340px;
        background-color: #fff;
        .el-form{
            width: 75%;
            text-align: center;
            img {
                width: 50%;
                margin: 20px auto;
            }
            .el-form-item{
                text-align: left;
            }
        }
    }
}
</style>
