import React from "react";
import { areaList } from '@vant/area-data';

const Profile = () => {
    const Navigate = React.Router.useNavigate();

    // 初始化表单对象
    const [form] = React.Vant.Form.useForm();

    const [LoginBusiness, setLoginBusiness] = React.useState(React.Cookies.load('LoginBusiness'));

    React.useEffect(() => {
        let Login = React.Cookies.load('LoginBusiness') ? React.Cookies.load('LoginBusiness') : {};

        setLoginBusiness(Login);
    }, []);

    // 修改资料
    const onProfile = async () => {

    }

    // 处理地区数据
    const [RegionShow, setRegionShow] = React.useState(false);
    const [code, setCode] = React.useState('');

    const RegionConfirm = () => {

    }

    // 处理性别的数据
    const [GenderShow, setGenderShow] = React.useState(false);
    const [GenderList, setGenderList] = React.useState([
        { text: '保密', value: 0 },
        { text: '男', value: 1 },
        { text: '女', value: 2 }
    ]);

    const GenderConfirm = () => {

    }

    // 头像
    const [avatar, setAvatar] = React.useState({});

    const FormFooter = () => {
        return (
            <div style={{ margin: '16px 16px 0' }}>
                <React.Vant.Button round nativeType='submit' type='primary' block>
                    提交
                </React.Vant.Button>
            </div>
        )
    }

    const onBack = () => {
        Navigate(-1);
    }

    return (
        <>
            <React.Vant.Sticky
                zIndex={10}
            >
                <React.Vant.NavBar
                    title="修改资料"
                    leftText="返回"
                    onClickLeft={onBack}
                />
            </React.Vant.Sticky>

            <div className="my_kuang">
                {/* 显示头像 */}
                <div className="bj_img">
                    <img
                        className="beij_s"
                        src="/assets/images/my_beij.jpg"
                        alt=""
                    />
                    <div className="nimetou_gaib">
                        <div className="toux_hou">
                            <img
                                id="Dfgrg"
                                style={{ height: "1.1rem" }}
                                src={LoginBusiness.avatar_cdn}
                                alt=""
                            />
                        </div>
                    </div>
                </div>

                <div className="profile">
                    <React.Vant.Form
                        form={form}
                        onFinish={onProfile}
                        footer={
                            <FormFooter />
                        }
                        border
                        colon
                        labelAlign='right'
                    >

                        {/* 手机号 */}
                        <React.Vant.Form.Item
                            name='mobile'
                            label='手机号'
                            labelWidth='55'
                            initialValue={LoginBusiness.mobile}
                        >
                            <React.Vant.Input placeholder='请输入手机号' readOnly />
                        </React.Vant.Form.Item>

                        {/* 昵称 */}
                        <React.Vant.Form.Item
                            rules={[{ required: true, message: '请填写昵称' }]}
                            name='nickname'
                            label='昵称'
                            labelWidth='55'
                            initialValue={LoginBusiness.nickname || ''}
                        >
                            <React.Vant.Input placeholder='请输入昵称' />
                        </React.Vant.Form.Item>

                        {/* 邮箱 */}
                        <React.Vant.Form.Item
                            rules={[{ required: true, message: '请填写邮箱' }]}
                            name='email'
                            label='邮箱'
                            labelWidth='55'
                            initialValue={LoginBusiness.email || ''}
                        >
                            <React.Vant.Input placeholder='请输入邮箱' />
                        </React.Vant.Form.Item>

                        {/* 密码 */}
                        <React.Vant.Form.Item
                            name='password'
                            label='密码'
                            labelWidth='55'
                        >
                            <React.Vant.Input type='password' placeholder='留空不修改密码' />
                        </React.Vant.Form.Item>

                        {/* 性别 */}
                        <React.Vant.Form.Item
                            label="性别"
                            onClick={() => { setGenderShow(true) }}
                            isLink
                            labelWidth='55'
                        >
                            <React.Vant.Input placeholder="请选择性别" readOnly value={LoginBusiness.gender_text || ''} />
                        </React.Vant.Form.Item>

                        <React.Vant.Popup position="bottom" round visible={GenderShow} onClose={() => { setGenderShow(false) }}>
                            <React.Vant.Picker
                                title="性别"
                                columns={GenderList}
                                defaultValue={LoginBusiness.gender * 1}
                                onConfirm={GenderConfirm}
                                onCancel={() => { setGenderShow(false) }}
                            />
                        </React.Vant.Popup>

                        {/* 地区 */}
                        <React.Vant.Form.Item
                            label="地区"
                            labelWidth='55'
                            onClick={() => { setRegionShow(true) }}
                            isLink
                        >
                            <React.Vant.Input placeholder="请选择地区" readOnly value={LoginBusiness.region_text} />
                        </React.Vant.Form.Item>

                        <React.Vant.Popup position="bottom" round visible={RegionShow} onClose={() => { setRegionShow(false) }}>
                            <React.Vant.Area
                                title="选择地区"
                                value={code}
                                areaList={areaList}
                                onConfirm={RegionConfirm}
                                onCancel={() => setRegionShow(false)}
                            />
                        </React.Vant.Popup>

                        {/* 上传头像 */}
                        <React.Vant.Form.Item
                            label="头像"
                            labelWidth='3.5em'
                            labelAlign='right'
                            name='avatar'
                            initialValue={
                                [
                                    {
                                        url: LoginBusiness.avatar_cdn
                                    }
                                ]
                            }
                        >
                            <React.Vant.Uploader maxCount={1} value={avatar} />
                        </React.Vant.Form.Item>

                    </React.Vant.Form>
                </div>

            </div>
        </>
    )
}

export default Profile;