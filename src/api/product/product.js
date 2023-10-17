// 引入服务请求
import { POST } from "@/services/request";

const product = {
    ProductIndex(data = {}) {
        return POST({
            url: '/product/product/index',
            params: data
        });
    }
}

export default product;