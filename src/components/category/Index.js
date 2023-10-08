import React from "react";

const Index = () => {

    const listRef = React.useRef(null);
    const [finished, setFinished] = React.useState(false);

    const CateData = React.useRef([]);
    const [CateList, setCateList] = React.useState([]);

    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(10);

    const onRefresh = () => {
        setFinished(false);
        setCateList([]);
        setPage(1);
        CateData.current = [];

        return new Promise((resolve) => {
            setTimeout(() => {
                React.Vant.Toast.info('刷新成功');
                getCateData();
                resolve(true);
            }, 1500);
        });
    }

    const onLoadRefresh = () => {
        setFinished(true);
        getCateData();
    }

    const getCateData = async () => {
        let data = {
            page: page,
            limit: limit,
        }

        let result = await React.Api.CategoryIndex(data);

        if (result) {
            if (result.code === 0) {
                setFinished(true);
                React.Vant.Toast.fail(result.msg);
                return;
            }

            let count = result.data.count;
            CateData.current = CateData.current.concat(result.data.list);
            setCateList(CateData.current);

            if (CateData.current.length >= count) {
                setFinished(true);
                return;
            }

            setFinished(false);
            setPage(page + 1);
        }

    }

    const Items = () => {
        if (CateList.length > 0) {
            return CateList.map(item => {
                return (
                    <li key={item.id}>
                        <React.Router.NavLink to={'/category/category/info?id=' + item.id}>
                            <img src={item.image_cdn} alt="" />
                            <p>{item.name}</p>
                            <span>{item.createtime_text}</span>
                        </React.Router.NavLink>
                    </li>
                )
            })
        }
    }

    const CategorySwiper = () => {

    }

    // 菜单
    const onMenu = () => {

    }

    return (
        <>
            <React.Vant.Sticky
                zIndex={10}
            >
                <React.Vant.NavBar
                    title="学术"
                    onClickLeft={onMenu}
                    leftArrow={false}
                    leftText={<React.Icon.Description fontSize={20} />}
                    rightText={<React.Icon.Search fontSize={20} />}
                />
            </React.Vant.Sticky>

            {/* 轮播图 */}
            <div className="banner_shouy">
                <CategorySwiper />
            </div>

            {/* 列表 */}
            <React.Vant.PullRefresh onRefresh={onRefresh} onRefreshEnd={() => listRef.current?.check()}>
                {/* List 组件可以与 PullRefresh 组件结合使用，实现下拉刷新的效果 */}
                <React.Vant.List finished={finished} ref={listRef} onLoad={onLoadRefresh}>
                    <div className="lest_xs">
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