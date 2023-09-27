// 引入服务请求
import { POST, UPLOAD } from "@/services/request";

const base = {
    Login(data = {}) {
        return POST({
            url: '/business/base/login',
            params: data
        });
    },
    Register(data = {}) {
        return POST({
            url: '/business/base/register',
            params: data
        });
    },
    Profile(data = {}) {
        return UPLOAD({
            url: '/business/base/profile',
            params: data
        });
    }
};

export default base;