// 引入服务请求
import { POST } from "@/services/request";

const base = {
    CategoryIndex(data = {}) {
        return POST({
            url: '/category/index',
            params: data
        });
    },
    CategoryRecommend(data = {}) {
        return POST({
            url: '/category/recommend',
            params: data
        });
    },
    CategoryInfo(data = {}) {
        return POST({
            url: '/category/info',
            params: data
        });
    }
};

export default base;