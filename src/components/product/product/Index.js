import React from 'react';

const Index = () => {
    // 实例化路由跳转对象
    const Navigate = React.Router.useNavigate();

    const [searchParams] = React.Router.useSearchParams();

    const [finished, setFinished] = React.useState(false);
    const [list, setList] = React.useState([]);
    const ProductData = React.useRef([]);
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(10);
    const [action, setAction] = React.useState(searchParams.get('acton') ? searchParams.get('action') : '');

    // 下拉刷新
    const onRefresh = () => {

    }

    // 上拉加载
    const onLoadRefresh = () => {
        setFinished(true);
        getProductData();
    }

    const getProductData = async () => {
        let data = {
            page: page,
            limit: limit
        }

        let result = await React.Api.ProductIndex(data);
    }

    const onBack = () => {
        Navigate(-1);
    }

    return (
        <>
            {/* 导航栏 */}
            <React.Vant.Sticky>
                <React.Vant.NavBar
                    title='商品列表'
                    leftText='返回'
                    onClickLeft={onBack}
                />
            </React.Vant.Sticky>

            <div className="sous_anniu">
                <p><img src="/assets/images/ss_xs.png" alt="" /></p>
            </div>

            <React.Vant.PullRefresh onRefresh={onRefresh}>
                {/* List 组件可以与 PullRefresh 组件结合使用，实现下拉刷新的效果 */}
                <React.Vant.List finished={finished} onLoad={onLoadRefresh}>
                    <div className="left_kuangs">
                        <ul>
                            <li>
                                <a href="list_xq.html">
                                    <img src="images/canp_1.jpg" alt="" />
                                    <p>人生最宝贵的是健康家庭最宝贵的是和睦人生最宝贵的是健康家庭最宝贵的是和睦</p>
                                    <span>￥1000 <em>.00</em></span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </React.Vant.List>
            </React.Vant.PullRefresh>


        </>
    )
}

export default Index;