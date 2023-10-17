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

    }

    // 上拉加载
    const onLoad = () => {
        setFinished(true);

        getLeaseData();
    }

    const getLeaseData = async () => {
        let data = {
            busid: LoginBusiness.id,

        }

        let result = await React.Api.OrderIndex(data);
    }


    const Items = () => {

    }

    const onTabsChange = () => {

    }

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