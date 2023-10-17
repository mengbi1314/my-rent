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
    const [action, setAction] = React.useState(searchParams.get('action') ? searchParams.get('action') : '');

    // 下拉刷新
    const onRefresh = () => {
        setFinished(false);
        setList([]);
        setPage(1);
        ProductData.current = [];
        return new Promise((resolve) => {
            setTimeout(() => {
                React.Vant.Toast.info('刷新成功');
                getProductData();
                resolve(true);
            }, 1500);
        });
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

        if (result) {
            if (result.code === 0) {
                React.Vant.Toast.fail(result.msg);
                return;
            }

            let count = result.data.count;
            ProductData.current = ProductData.current.concat(result.data.list);
            setList(ProductData.current);

            if (ProductData.current.length === count) {
                setFinished(true);
                return;
            }

            setPage(page + 1);
            setFinished(false);
        }

    }

    const selected = (item) => {
        React.Cookies.save('product', item, { path: '/' });

        Navigate(-1);
    }

    const Items = () => {
        if (action === 'lease') {
            if (list.length > 0) {
                return list.map(item => {
                    return (
                        <li key={item.id}>
                            <a onClick={() => selected(item)}>
                                <img src={item.thumb_cdn} alt="" />
                                <p>{item.name}</p>
                                <span>￥ {item.rent_price}</span>
                            </a>
                        </li>
                    )
                })
            }
        }
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
                            <Items />
                        </ul>
                    </div>
                </React.Vant.List>
            </React.Vant.PullRefresh>


        </>
    )
}

export default Index;