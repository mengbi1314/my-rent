import React from 'react';
import Footer from './common/Footer';

const Home = () => {
    return (
        <>
            <React.Vant.Sticky>
                <React.Vant.NavBar
                    title="首页"
                    leftArrow={false}
                />
            </React.Vant.Sticky>

            {/* 引入底部导航 */}
            <Footer />
        </>
    )
}

export default Home;