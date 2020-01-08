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
                    <el-button style="width:100%;" type="primary" @click="login()" :disabled="isLoading" :loading="isLoading">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
// 对gt.js文件进行导入
// gt.js文件本身没有做导出动作，所以就直接导入即可，此时系统增加一个全局变量，名称为 initGeeTest
import './gt.js'

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
      // 极验对象
      capObj: null,
      // 设置按钮初始状态
      isLoading: false,
      // 表单数据对象
      loginForm: {
        mobile: '13911111111',
        code: '246810',
        xieyi: true
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

        // 用户重复单击登录使用缓存好的极验对象
        // 判断极验窗口对象存在，就直接使用
        if (this.capObj !== null) {
          return this.capObj.verify()
        }

        // 设置登录按钮为禁用、等待状态
        this.isLoading = true

        // 人机交互验证
        // axios获得极验的秘钥信息
        let pro = this.$http({
          url: '/captchas/' + this.loginForm.mobile,
          method: 'GET'
        })
        pro
          .then(res => {
            // console.log(res)
            // 从res里解构下述的data对象（对象结构赋值）
            let { data } = res.data
            // 请检测data的数据结构， 保证data.gt, data.challenge, data.success有值
            window.initGeetest({
              gt: data.gt,
              challenge: data.challenge,
              offline: !data.success,
              new_captcha: true,
              product: 'bind' // 设置窗口样式
            }, captchaObj => {
              // 这里可以调用验证实例 captchaObj 的实例方法
              // captchaObj:极验窗口对象
              captchaObj.onReady(() => {
                // 验证码ready之后才能调用verify方法显示验证码（可以显示窗口了）
                captchaObj.verify() // 显示验证码窗口
                this.isLoading = false
                this.capObj = captchaObj
              }).onSuccess(() => {
                // 行为校验正确的处理
                // 验证账号，登录系统
                this.loginAct()
              }).onError(() => {
                // 行为校验错误处理
              })
            })
          })
          .catch(err => {
            return this.$message.error('获取极验秘钥失败' + err)
          })
      })
    },
    // 账号真实性校验，并登录
    loginAct () {
    // 服务器端账号真实校验
      let pro = this.$http({
        url: '/authorizations',
        method: 'POST',
        data: this.loginForm
      })
      pro
        .then(res => {
          // console.log(res)
          if (res.status === 201) {
            // 客户端浏览器把服务器返回的秘钥等相关信息通过sessionStorage做记录，表明是登录状态
            window.sessionStorage.setItem('userinfo', JSON.stringify(res.data.data))
            // 路由编程式导航
            // this.$router.push('/home')
            // 进入后台系统
            this.$router.push({ name: 'home' })
          }
        })
        .catch(err => {
          // console.log('手机号码或验证码错误' + err)
          this.$message.error('手机号码或验证码错误' + err)
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
