import React from 'react';
import { areaList } from '@vant/area-data';

const Add = () => {

    // 实例化路由跳转对象
    const Navigate = React.Router.useNavigate();

    // 实例化表单对象
    const [form] = React.Vant.Form.useForm();

    // 定义
    const [product, setProduct] = React.useState(React.Cookies.load('product') ? React.Cookies.load('product') : {});
    const [LoginBusiness, setLoginBusiness] = React.useState(React.Cookies.load('LoginBusiness') ? React.Cookies.load('LoginBusiness') : {});
    const [RegionShow, setRegionShow] = React.useState(false);
    const [code, setCode] = React.useState([
        LoginBusiness.province,
        LoginBusiness.city,
        LoginBusiness.district
    ]);

    // 上传证件
    const [card, setCard] = React.useState([]);

    // 提交
    const onAdd = async (values) => {
        // 判断租赁天数大于等于10天
        if (day < 10) {
            React.Vant.Toast.fail('租赁天数必须大于等于10天');
            return;
        }

        let StartTime = Math.floor(start / 1000);
        let EndTime = Math.floor(end.getTime() / 1000);

        // 封装数据
        let data = {
            busid: LoginBusiness.id,
            proid: product.id,
            address: values.address,
            mobile: values.mobile,
            nickname: values.nickname,
            code: LoginBusiness.district || LoginBusiness.city || LoginBusiness.province,
            createtime: StartTime,
            endtime: EndTime,
            card: values.card[0].file,
            price: rent,// 包含押金的金额
            rent: product.rent,// 只是押金
        }

        let result = await React.Api.LeaseAdd(data);

        if (result.code === 1) {
            React.Vant.Toast.success({
                message: result.msg,
                onClose: () => {
                    React.Cookies.remove('product', { path: '/' });

                    Navigate('/product/order/index');
                }
            });

            return;
        } else {
            React.Vant.Toast.fail(result.msg);
            return;
        }
    }

    // 地区选择
    const RegionConfirm = (_, values) => {
        let [province, city, district] = values;

        if (!province || !city || !district) {
            return;
        }

        setRegionShow(false);

        LoginBusiness.province = province.value;
        LoginBusiness.city = city.value;
        LoginBusiness.district = district.value;

        LoginBusiness.region_text = province.text + '-' + city.text + '-' + district.text;

        setLoginBusiness(LoginBusiness);
    }

    // 选择时间
    const [DateShow, setDateShow] = React.useState(false);
    const [start, SetStart] = React.useState(new Date(new Date()).getTime());
    const [end, SetEnd] = React.useState(new Date(new Date().getTime() + (10 * 24 * 60 * 60 * 1000)));
    const [day, SetDay] = React.useState(10)
    const [endTime, setEndTime] = React.useState(`${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}`);

    const DateConfirm = (values) => {
        // 获取开始时间的时分秒
        let H = new Date(start).getHours();
        let I = new Date(start).getMinutes();
        let S = new Date(start).getSeconds();

        // 设置结束时间的时分秒
        values.setHours(H, I, S);

        let time = values.getTime();

        SetDay(Math.ceil((time - start) / (24 * 60 * 60 * 1000)));

        setEndTime(`${values.getFullYear()}-${values.getMonth() + 1}-${values.getDate()}`);

        SetEnd(new Date(time));
    }

    // 押金以及租金
    const [price, setPrice] = React.useState(0);
    const [rent, setRent] = React.useState(0);

    const getTotal = () => {

        let rent_price = product.rent_price ? parseFloat(product.rent_price) : 0;

        rent_price = rent_price * day;

        let rent = product.rent ? parseFloat(product.rent) : 0;

        rent = rent_price + rent;

        setPrice(rent_price.toFixed(2));
        setRent(rent.toFixed(2));

    }

    React.useEffect(() => {
        getTotal();
    }, [day]);

    // 从表单这里去到商品列表选择需要租赁商品
    const SelectProduct = () => {
        Navigate('/product/product/index?action=lease');
    }

    const onBack = () => {
        React.Cookies.remove('product', { path: '/' });
        Navigate(-1);
    }

    return (
        <>
            {/* 导航栏 */}
            <React.Vant.Sticky>
                <React.Vant.NavBar
                    title='立即租赁'
                    leftText='返回'
                    onClickLeft={onBack}
                />
            </React.Vant.Sticky>

            {/* 表单结构 */}
            <div className='add'>
                <React.Vant.Form
                    form={form}
                    onFinish={onAdd}
                >
                    {/* 选择租赁商品 */}
                    <React.Vant.Form.Item
                        labelWidth='4.5em'
                        labelAlign='right'
                        label="租赁商品"
                        isLink
                        onClick={SelectProduct}
                        colon
                    >
                        <React.Vant.Input placeholder="租赁商品" readOnly value={product.name ? product.name : ''} />
                    </React.Vant.Form.Item>

                    {/* 押金 */}
                    <React.Vant.Form.Item
                        label="押金"
                        labelWidth='4.5em'
                        labelAlign='right'
                        colon
                    >
                        <React.Vant.Input readOnly value={product.rent ? product.rent : ''} placeholder={'押金'} />
                    </React.Vant.Form.Item>

                    {/* 日租租金 */}
                    <React.Vant.Form.Item
                        label="日供租金"
                        labelWidth='4.5em'
                        labelAlign='right'
                        colon
                    >
                        <React.Vant.Input readOnly value={product.rent_price ? product.rent_price : ''} placeholder={'日供租金'} />
                    </React.Vant.Form.Item>

                    <React.Vant.Form.Item
                        name="nickname"
                        label="昵称"
                        labelWidth='4.5em'
                        labelAlign='right'
                        colon
                        initialValue={LoginBusiness.nickname}
                        rules={[
                            { required: true, message: '请输入昵称' }
                        ]}
                    >
                        <React.Vant.Input placeholder="请输入昵称" />
                    </React.Vant.Form.Item>

                    {/* 手机号 */}
                    <React.Vant.Form.Item
                        label="手机号"
                        name="mobile"
                        labelWidth='4.5em'
                        labelAlign='right'
                        colon
                        initialValue={LoginBusiness.mobile}
                        rules={[
                            { required: true, message: '请输入手机号' }
                        ]}
                    >
                        <React.Vant.Input placeholder="请输入手机号" />
                    </React.Vant.Form.Item>

                    {/* 地区 */}
                    <React.Vant.Form.Item
                        label="地区"
                        labelWidth='4.5em'
                        labelAlign='right'
                        colon
                        onClick={() => { setRegionShow(true) }}
                        isLink
                    >
                        <React.Vant.Input placeholder="请选择地区" readOnly value={LoginBusiness.region_text} />
                    </React.Vant.Form.Item>

                    <React.Vant.Popup position="bottom" round visible={RegionShow} onClose={() => { setRegionShow(false) }}>
                        <React.Vant.Area
                            title="请选择地区"
                            areaList={areaList}
                            value={code}
                            onCancel={() => { setRegionShow(false) }}
                            onConfirm={RegionConfirm}
                        />
                    </React.Vant.Popup>

                    {/* 详细地址 */}
                    <React.Vant.Form.Item
                        name="address"
                        label="详细地址"
                        labelWidth='4.5em'
                        labelAlign='right'
                        colon
                        rules={[
                            { required: true, message: '请输入详细地址' }
                        ]}
                    >
                        <React.Vant.Input placeholder="请输入详细地址" />
                    </React.Vant.Form.Item>

                    {/* 租用时间 */}
                    <React.Vant.Form.Item
                        label="租用时间"
                        labelWidth='4.5em'
                        labelAlign='right'
                        colon
                        onClick={() => { setDateShow(true) }}
                        isLink
                    >
                        <React.Vant.Input readOnly value={endTime} />
                    </React.Vant.Form.Item>

                    <React.Vant.Calendar
                        showConfirm={false}
                        visible={DateShow}
                        defaultValue={end}
                        onClose={() => { setDateShow(false) }}
                        onConfirm={DateConfirm}
                    />

                    {/* 图片 */}
                    <React.Vant.Form.Item
                        label="上传证件"
                        name="card"
                        labelWidth='4.5em'
                        labelAlign='right'
                        colon
                        rules={[
                            { required: true, message: '请上传证件图片' }
                        ]}
                    >
                        <React.Vant.Uploader previewSize={150} maxCount={1} value={card} />
                    </React.Vant.Form.Item>

                    <div className="zy_goods_foot dis_flex">
                        <div className="left">
                            <div>{day}天<b>￥<em>{price}</em></b></div>
                            <div className="tou_d">含押金￥{rent}</div>
                        </div>
                        <p>
                            <React.Vant.Button nativeType="submit" block size="normal" type="primary">立即申请</React.Vant.Button>
                        </p>
                    </div>


                </React.Vant.Form>
            </div>
        </>
    )
}

export default Add;