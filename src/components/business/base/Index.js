import React from 'react';

const Index = () => {

    const Navigate = React.Router.useNavigate();

    const [LoginBusiness, setLoginBusiness] = React.useState({});

    // 类似Vue里的生命周期
    React.useEffect(() => {
        let Login = React.Cookies.load('LoginBusiness');

        setLoginBusiness(Login);
    }, []);

    const Ems = () => {
        if (LoginBusiness.auth === '0') {
            return (
                <div className="my_dind">
                    <div className="bt">
                        <a href="my_fk.html">
                            <h3>
                                <img src="/assets/images/my_x_01.png" />
                                邮箱认证
                            </h3>
                            <div className="right">
                                <img src="/assets/images/right_jiant.png" />
                            </div>
                        </a>
                    </div>
                </div>
            )
        }
    }
    const onLogout = () => {
        React.Vant.Dialog.confirm({
            title: '退出账号',
            message: '是否退出当前账号？'
        }).then((res) => {
            React.Cookies.remove('LoginBusiness', { path: '/' });

            React.Vant.Notify.show({
                type: 'success',
                message: '退出成功',
                duration: 1500,
                onClose: () => {
                    Navigate('/business/base/login');
                }
            })
        }).catch((err) => {
        });
    }

    return (
        <>
            <div className="my_kuang">
                <div className="bj_img">
                    <img className="beij_s" src="/assets/images/my_beij.jpg" alt="" />
                    <div className="nimetou_gaib">
                        <div className="toux_hou">
                            <img
                                id="Dfgrg"
                                style={{ height: '1.1rem' }}
                                src={LoginBusiness.avatar_cdn}
                                alt=""
                            />
                        </div>
                        <div className="mingz">
                            <h2>{LoginBusiness.nickname ? LoginBusiness.nickname : LoginBusiness.mobile_text}</h2>
                        </div>
                    </div>
                </div>
                <div className="div_bx_k">
                    <div className="neir_Ef">
                        <div className="yverjif">
                            <ul>
                                <li>
                                    <React.Router.NavLink>
                                        <h2>0</h2>
                                        <p>收藏商品</p>
                                    </React.Router.NavLink>
                                </li>
                                <li>
                                    <React.Router.NavLink>
                                        <h2>9</h2>
                                        <p>收藏文章</p>
                                    </React.Router.NavLink>
                                </li>
                                <li>
                                    <React.Router.NavLink>
                                        <h2>17</h2>
                                        <p>我的订单</p>
                                    </React.Router.NavLink>

                                </li>
                            </ul>
                        </div>

                        <div className="list_index_my">
                            <div className="fenh_ziyek">
                                <h3>更多服务 </h3>
                            </div>
                            <div className="my_dind">
                                <div className="bt">
                                    <React.Router.NavLink to={'/business/base/profile'}>
                                        <h3>
                                            <img src={"/assets/images/my_x_01.png"} />
                                            修改资料
                                        </h3>
                                        <div className="right">
                                            <img src="/assets/images/right_jiant.png" />
                                        </div>
                                    </React.Router.NavLink>
                                </div>
                            </div>

                            <Ems />

                            <div className="my_dind">
                                <div className="bt">
                                    <a href="my_fk.html">
                                        <h3>
                                            <img src="/assets/images/my_x_01.png" />
                                            意见反馈
                                        </h3>
                                        <div className="right">
                                            <img src="/assets/images/right_jiant.png" />
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="my_dind">
                                <div className="bt">
                                    <a href="my_guan.html">
                                        <h3>
                                            <img src="/assets/images/my_x_02.png" />
                                            关于我们
                                        </h3>
                                        <div className="right">
                                            <img src="/assets/images/right_jiant.png" />
                                        </div>
                                    </a>
                                </div>
                            </div>

                            <div className="my_dind" onClick={onLogout}>
                                <div className="bt">
                                    <a>
                                        <h3>
                                            <img src="/assets/images/my_x_01.png" />
                                            退出账号
                                        </h3>
                                        <div className="right">
                                            <img src="/assets/images/right_jiant.png" />
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div style={{ height: ".9rem" }}></div>
                    </div>
                </div>
            </div>

            <div style={{ height: ".75rem" }}></div>
        </>
    );
}

export default Index;