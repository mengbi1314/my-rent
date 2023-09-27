import React from "react";

const Login = () => {
    return (
        <>
            {/* 图标样式 */}
            <link rel="stylesheet" type="text/css" href="/assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css" />

            {/* 布局框架 */}
            <link rel="stylesheet" type="text/css" href="/assets/css/util.css" />

            {/* 主要样式 */}
            <link rel="stylesheet" type="text/css" href="/assets/css/main.css" />

            <div class="limiter">
                <div class="container-login100" style={{ backgroundImage: "url('/assets/images/img-01.jpg')" }}>
                    <div class="wrap-login100 p-t-190 p-b-30">
                        <form class="login100-form validate-form">
                            <div class="login100-form-avatar">
                                <img src="/assets/images/avatar-01.jpg" alt="AVATAR" />
                            </div>

                            <span class="login100-form-title p-t-20 p-b-45">Hello</span>

                            <div class="wrap-input100 validate-input m-b-10" data-validate="请输入手机号">
                                <input class="input100" type="text" placeholder="手机号" autocomplete="off" />
                                <span class="focus-input100"></span>
                                <span class="symbol-input100">
                                    <i class="fa fa-user"></i>
                                </span>
                            </div>

                            <div class="wrap-input100 validate-input m-b-10" data-validate="请输入密码">
                                <input class="input100" type="password" placeholder="密码" />
                                <span class="focus-input100"></span>
                                <span class="symbol-input100">
                                    <i class="fa fa-lock"></i>
                                </span>
                            </div>

                            <div class="container-login100-form-btn p-t-10">
                                <button class="login100-form-btn">登 录</button>
                            </div>

                            <div class="text-center w-full p-t-30">
                                <a class="txt1" href="index.html#">
                                    立即注册
                                    <i class="fa fa-long-arrow-right"></i>
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;