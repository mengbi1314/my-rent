import React from "react";

const Footer = () => {

    const Navigate = React.Router.useNavigate();

    const location = React.Router.useLocation();

    const [active, setActive] = React.useState(location.pathname);

    const onChangeBar = (name) => {
        setActive(name);
        Navigate(name);
    }

    return (
        <div className="foot_menu">
            <React.Vant.Tabbar value={active} activeColor={'#ef6382'} onChange={onChangeBar}>
                <React.Vant.Tabbar.Item name={'/'} icon={<React.Icon.WapHomeO />}>首页</React.Vant.Tabbar.Item>
                <React.Vant.Tabbar.Item name={''} icon={<React.Icon.AppsO />}>分类</React.Vant.Tabbar.Item>
                <React.Vant.Tabbar.Item name={'/category/category/index'} icon={<React.Icon.Description />}>学术</React.Vant.Tabbar.Item>
                <React.Vant.Tabbar.Item name={'/business/base/index'} icon={<React.Icon.UserO />}>我的</React.Vant.Tabbar.Item>
            </React.Vant.Tabbar>
        </div>
    );
}

export default Footer;