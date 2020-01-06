<template>
    <div class="login-container">
        <div class="login-box">
            <!-- 绘制登录form表单 -->
            <el-form ref="loginFormRef" :model="loginForm"  class="el-form">
                <img src="./logo_index.png" alt="">
                <el-form-item>
                    <el-input v-model="loginForm.mobile" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="loginForm.code"  placeholder="请输入校验码"></el-input>
                </el-form-item>
                <el-form-item class="el-form-item">
                    <!-- 复选框，单个复选框直接设置v-model即可，接收true/false的信息 -->
                    <el-checkbox v-model="loginForm.xieyi"></el-checkbox>
                    <span>我已阅读并同意
                        <a href="">用户协议</a>和
                        <a href="">隐私条款</a>
                    </span>
                </el-form-item>
                <el-form-item>
                    <el-button style="width:100%;" type="primary">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '',
        code: '',
        xieyi: false
      }
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
