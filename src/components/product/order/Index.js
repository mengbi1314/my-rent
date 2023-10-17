import React from "react";

const Index = () => {

    // 实例化路由跳转对象
    const Navigate = React.Router.useNavigate();

    const [LoginBusiness, setLoginBusiness] = React.useState(React.Cookies.load('LoginBusiness') ? React.Cookies.load('LoginBusiness') : {});
    const listRef = React.useRef(null);
    const [finished, setFinished] = React.useState(false);
    const [list, setList] = React.useState([]);
    const LeaseData = React.useRef([]);
    const page = React.useRef(1);
    const limit = React.useRef(10);
    const [status, setStatus] = React.useState(0);

    // 拉下刷新
    const onRefresh = () => {
        setList([]);
        LeaseData.current = [];
        setFinished(false);
        page.current = 1;
        return new Promise((resolve) => {
            setTimeout(() => {
                React.Vant.Toast.info('刷新成功');
                getLeaseData();
                resolve(true);
            }, 1500);
        });
    }

    // 上拉加载
    const onLoad = () => {
        setFinished(true);

        getLeaseData();
    }

    const getLeaseData = async () => {
        let data = {
            busid: LoginBusiness.id,
            page: page.current,
            limit: limit.current,
            status: status
        }

        let result = await React.Api.OrderIndex(data);

        if (result) {
            if (result.code === 0) {
                setFinished(true);
                React.Vant.Toast.fail(result.msg);
                return;
            }

            let count = result.data.count;
            LeaseData.current = LeaseData.current.concat(result.data.list);
            setList(LeaseData.current);

            if (LeaseData.current.length >= count) {
                setFinished(true);
                return;
            }

            page.current = page.current + 1;
            setFinished(false);
        }

    }

    const ConfirmLease = () => {

    }

    const Items = () => {
        if (list.length > 0) {
            return list.map((item, key) => {
                return (
                    <li key={key}>
                        <div className="vip_order_goods">
                            <h3>
                                <i><img src={item.product.thumb_cdn} /></i>
                                <dl>
                                    <dt>{item.product.name}</dt>
                                    <dd>
                                        <em>押金</em>
                                        <em>{item.rent}</em>
                                    </dd>
                                    <dd>
                                        <em>总价</em>
                                        <em>{item.price}</em>
                                    </dd>
                                    <dd>
                                        <em>结束时间</em>
                                        <em>{item.endtime_text}</em>
                                    </dd>
                                    <dd>
                                        <em>订单状态</em>
                                        <em>{item.status_text}</em>
                                    </dd>
                                </dl>
                            </h3>
                        </div>

                        <div className="order_btn">

                            {(item.status == 5) && <React.Vant.Button round type="warning" size="small" onClick={() => Navigate(`/order/order/comment?id=${item.id}`)}>订单评价</React.Vant.Button>}

                            {(item.status == 3 || item.status == 4) && <React.Vant.Button round type="danger" size="small" onClick={() => Navigate(`/order/order/recovery?id=${item.id}`)}>归还商品</React.Vant.Button>}

                            {item.status == 2 && <React.Vant.Button round type="warning" size="small" onClick={() => ConfirmLease(item.id)}>确认收货</React.Vant.Button>}

                            {item.status >= 2 && <React.Vant.Button round type="info" size="small" onClick={() => Navigate(`/order/order/express?id=${item.id}`)}>查看物流</React.Vant.Button>}

                            <React.Vant.Button round type="primary" size="small" onClick={() => Navigate(`/order/order/info?id=${item.id}`)}>查看详情</React.Vant.Button>
                        </div>
                    </li>
                )
            })
        }
    }

    const onTabsChange = (value) => {
        setStatus(value.name);
    }

    React.useEffect(() => {
        setList([]);
        LeaseData.current = [];
        setFinished(false);
        page.current = 1;
    }, [status]);

    // 定义选项卡的数据
    const statusList = [
        {
            id: 0,
            name: '全部',
        },
        {
            id: 1,
            name: '已下单',
        },
        {
            id: 2,
            name: '已发货',
        },
        {
            id: 3,
            name: '已收货',
        },
        {
            id: 4,
            name: '已归还',
        },
        {
            id: 5,
            name: '已退押金',
        },
        {
            id: 6,
            name: '已完成',
        },
    ];

    const onBack = () => {
        Navigate('/business/base/index');
    }

    return (
        <>
            {/* 导航栏 */}
            <React.Vant.Sticky>
                <React.Vant.NavBar
                    title='我的订单'
                    leftText='返回'
                    onClickLeft={onBack}
                />
            </React.Vant.Sticky>

            <React.Vant.Tabs onClickTab={onTabsChange} active={status}>
                {statusList.map(item => {
                    return (
                        <React.Vant.Tabs.TabPane name={item.id} title={item.name} key={item.id}></React.Vant.Tabs.TabPane>
                    )
                })}
            </React.Vant.Tabs>

            {/* 列表 */}
            <React.Vant.PullRefresh onRefresh={onRefresh} onRefreshEnd={() => listRef.current?.check()}>
                <React.Vant.List className="vip_user_order" ref={listRef} onLoad={onLoad} finished={finished}>
                    <ul>
                        <Items />
                    </ul>
                </React.Vant.List>
            </React.Vant.PullRefresh>
        </>
    )
}

export default Index;