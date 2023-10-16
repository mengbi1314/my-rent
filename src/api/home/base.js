// 引入服务请求
import { POST } from "@/services/request";

const base = {
    Controller(data = {}) {
        return POST({
            url: '/index/index',
            params: data
        });
    }
}

export default base;