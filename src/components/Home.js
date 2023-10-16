import React from 'react';
import Footer from './common/Footer';

const Home = () => {

    // 定义属性状态
    const [ProductList, setProductList] = React.useState([]);
    const [CateList, setCateList] = React.useState([]);

    // 定义一个请求数据的方法
    const getData = async () => {
        let result = await React.Api.Controller();

        if (result) {
            setProductList(result.data.ProductList);
            setCateList(result.data.CateList);
        }
    }

    // 商品轮播的组件
    const ProductSwiper = () => {
        if (ProductList.length > 0) {
            return (
                <React.Vant.Swiper>
                    {ProductList.map((item) => (
                        <React.Vant.Swiper.Item key={item.id}>
                            <React.Vant.Image lazyload src={item.thumb_cdn} />
                        </React.Vant.Swiper.Item>
                    ))}
                </React.Vant.Swiper>
            )
        }
    }

    // 学术列表
    const Cate = () => {
        if (CateList.length > 0) {
            return CateList.map(item => {
                return (
                    <li key={item.id}>
                        <React.Router.NavLink to={"/category/category/info?id=" + item.id}>
                            <img src={item.image_cdn} alt="" />
                            <div className="right">
                                <p>{item.name}</p>
                                <span>{item.createtime_text}</span>
                            </div>
                        </React.Router.NavLink>
                    </li>
                )
            })
        }
    }

    // 调用一个类似生命周期的hook函数
    React.useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <React.Vant.Sticky
                zIndex={10}
            >
                <React.Vant.NavBar
                    title="首页"
                    leftArrow={false}
                />
            </React.Vant.Sticky>

            {/* 主体内容 */}
            <div className="banner_shouy">
                <ProductSwiper />
            </div>

            {/* 快捷导航 */}
            <div className="shouye_kuanj">
                <div className="swiper-wrapper" style={{ display: 'flex' }}>
                    <div className="swiper-slide" style={{ width: '25%' }}>
                        <React.Router.NavLink to={'/product/lease/add'}>
                            <img src="/assets/images/kj.png" alt="" />
                            <p>产品租赁</p>
                        </React.Router.NavLink>
                    </div>
                    <div className="swiper-slide" style={{ width: '25%' }}>
                        <a href="hsb.html">
                            <img src="/assets/images/kj1.png" alt="" />
                            <p>我要归还</p>
                        </a>
                    </div>
                    <div className="swiper-slide" style={{ width: '25%' }}>
                        <a href="hsb.html">
                            <img src="/assets/images/kj2.png" alt="" />
                            <p>商品大全</p>
                        </a>
                    </div>
                    <div className="swiper-slide" style={{ width: '25%' }}>
                        <a href="#">
                            <img src="/assets/images/kj3.png" alt="" />
                            <p>关于我们</p>
                        </a>
                    </div>
                </div>
            </div>

            {/* 学术文章 */}
            <div className="chan_p_center">

                <div className="list_color" >
                    <ul>
                        <Cate />
                    </ul>
                </div>
            </div>

            <div style={{ height: '50px' }}></div>

            {/* 引入底部导航 */}
            <Footer />
        </>
    )
}

export default Home;