import React from "react";

const Register = () => {

    // 初始化表单对象
    const [form] = React.Vant.Form.useForm();

    const Navigate = React.Router.useNavigate();

    // 定义属性状态
    const [mobile, setMobile] = React.useState('13500000000');
    const [password, setPassword] = React.useState('123456');

    const onSubmit = async () => {
        let data = {
            mobile,
            password
        }

        let result = await React.Api.Register(data);

        if (result.code === 0) {
            React.Vant.Notify.show({
                type: 'warning',
                message: result.msg,
                duration: 1500
            });

            return;
        } else {
            React.Vant.Notify.show({
                type: 'success',
                message: result.msg,
                duration: 1500,
                onClose: () => {
                    Navigate('/business/base/login');
                }
            });

            return;
        }

    }

    return (
        <>
            {/* 图标样式 */}
            <link rel="stylesheet" type="text/css" href="/assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css" />

            {/* 布局框架 */}
            <link rel="stylesheet" type="text/css" href="/assets/css/util.css" />

            {/* 主要样式 */}
            <link rel="stylesheet" type="text/css" href="/assets/css/main.css" />

            <div className="limiter">
                <div className="container-login100" style={{ backgroundImage: "url('/assets/images/img-01.jpg')" }}>
                    <div className="wrap-login100 p-t-190 p-b-30">
                        <React.Vant.Form className="login100-form validate-form" form={form} onFinish={onSubmit}>
                            <div className="login100-form-avatar">
                                <img src="/assets/images/avatar-01.jpg" alt="AVATAR" />
                            </div>

                            <span className="login100-form-title p-t-20 p-b-45">Hello</span>

                            <div className="wrap-input100 validate-input m-b-10" data-validate="请输入手机号">
                                <input className="input100" type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="手机号" />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-user"></i>
                                </span>
                            </div>

                            <div className="wrap-input100 validate-input m-b-10" data-validate="请输入密码">
                                <input className="input100" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="密码" />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-lock"></i>
                                </span>
                            </div>

                            <div className="container-login100-form-btn p-t-10">
                                <button className="login100-form-btn">注 册</button>
                            </div>

                            <div className="text-center w-full p-t-30">
                                <React.Router.NavLink className="txt1" to={"/business/base/login"}>
                                    立即登录
                                    <i className="fa fa-long-arrow-right"></i>
                                </React.Router.NavLink>
                            </div>
                        </React.Vant.Form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Register;