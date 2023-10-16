import React from 'react';

const Add = () => {

    // 实例化路由跳转对象
    const Navigate = React.Router.useNavigate();

    // 实例化表单对象
    const [form] = React.Vant.Form.useForm();

    // 定义
    const [product, setProduct] = React.useState({});

    // 提交
    const onAdd = () => {

    }

    // 从表单这里去到商品列表选择需要租赁商品
    const SelectProduct = () => {

    }

    const onBack = () => {
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

                </React.Vant.Form>
            </div>
        </>
    )
}

export default Add;
