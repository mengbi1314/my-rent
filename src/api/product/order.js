// 引入服务请求
import { POST } from "@/services/request";

const order = {
    OrderIndex(data = {}) {
        return POST({
            url: '/product/order/index',
            params: data
        });
    }
}

export default order;