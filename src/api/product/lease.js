// 引入服务请求
import { UPLOAD } from "@/services/request";

const Lease = {
    LeaseAdd(data = {}) {
        return UPLOAD({
            url: '/product/lease/add',
            params: data
        });
    }
}
export default Lease;
