import React from "react";


const AuthRouter = (props) => {
    // 组件带有该属性时说明该组件需要登录才进去
    if (props.auth === true) {
        // 获取登录信息
        let LoginBusiness = React.Cookies.load('LoginBusiness') ? React.Cookies.load('LoginBusiness') : {};

        if (!LoginBusiness || JSON.stringify(LoginBusiness) === '{}') {
            return (
                <React.Router.Navigate to={"/business/base/login"} replace={true} />
            )
        } else {
            return (
                <>
                    {props.component}
                </>
            )
        }
    } else {
        // 不需要登录
        return (
            <>
                {/* 显示页面 */}
                {props.component}
            </>
        )
    }

}

export default AuthRouter;