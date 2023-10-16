import React from 'react';

const Info = () => {

    const Navigate = React.Router.useNavigate();

    const [searchParams] = React.Router.useSearchParams();

    const [info, setInfo] = React.useState({});

    const [id, setID] = React.useState(searchParams.get('id'));

    const [LoginBusiness, setLoginBusiness] = React.useState(React.Cookies.load('LoginBusiness') ? React.Cookies.load('LoginBusiness') : {});

    // 上一篇
    const [prev, setPrev] = React.useState({});

    // 下一篇
    const [next, setNext] = React.useState({});

    const getInfo = async () => {
        let result = await React.Api.CategoryInfo({ id, busid: LoginBusiness.id });

        if (result.code === 0) {
            React.Vant.Toast.fail({
                message: result.msg,
                onClose: () => {
                    Navigate(-1);
                }
            });

            return;
        }

        setPrev(result.data.prev);
        setInfo(result.data.info);
        setNext(result.data.next);
    }

    // 组件
    const Prev = () => {

        const toPrev = () => {
            setID(prev.id);
            Navigate('/category/category/info?id=' + prev.id);
        }

        if (prev) {
            return (
                <p>上一篇：<a onClick={toPrev}>{prev.name}</a></p>
            )
        } else {
            return (
                <p>上一篇：<a>已到顶了</a></p>
            )
        }
    }

    const Next = () => {
        const toNext = () => {
            setID(next.id);
            Navigate('/category/category/info?id=' + next.id);
        }

        if (next) {
            return (
                <p>下一篇：<a onClick={toNext}>{next.name}</a></p>
            )
        } else {
            return (
                <p>下一篇：<a>已到底了</a></p>
            )
        }
    }

    // 点击收藏
    const onCollection = async () => {
        /* 
    用户id
    文章id
*/

        // 判断用户在文章详情里是否处于登录状态
        if (JSON.stringify(LoginBusiness) === '{}' || !LoginBusiness) {
            React.Vant.Toast.fail('请先登录');
            return;
        }

        // 封装数据
        let data = {
            busid: LoginBusiness.id,
            cateid: id
        }

        let result = await React.Api.CategoryCollection(data);

        if (result.code === 0) {
            React.Vant.Toast.fail(result.msg);
            return;
        }
        getInfo();
    }

    React.useEffect(() => {
        getInfo();
    }, [id])

    // 返回的方法
    const onBack = () => {
        Navigate('/category/category/index');
    }

    return (
        <>
            <React.Vant.Sticky zIndex={10}>
                <React.Vant.NavBar
                    title={'学术详情'}
                    leftText="返回"
                    onClickLeft={onBack}
                />
            </React.Vant.Sticky>

            <div className="xs_Xiangq">
                <div className="bt">
                    <h2>
                        {info.name}
                    </h2>
                    <div className="text">
                        <span>{info.createtime_text}</span>
                        <span>文章作者：{info.nickname}</span>
                    </div>
                </div>
                <div className="wom_de" dangerouslySetInnerHTML={{ __html: info.description }}>

                </div>
                <div className="niming_sq niming_sq_xs_xq">
                    <a onClick={onCollection}>

                        {info.collection_status === true ? <React.Icon.Star /> : <React.Icon.StarO />}
                        {info.collection_status === true ? '已收藏' : '收藏'}

                    </a>
                </div>
            </div>

            <div className="shangxia_piab">
                <Prev />
                <Next />
            </div>
        </>
    );
}

export default Info;