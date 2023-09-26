// 引入组件
import Index from "@/components/business/base/Index";
import Login from "@/components/business/base/Login";
import Register from "@/components/business/base/Register";
import Ems from "@/components/business/base/Ems";
import Profile from "@/components/business/base/Profile";

const base = [
    {
        path:'base/index',
        name:'BaseIndex',
        component:Index,
        auth:true
    },
    {
        path:'base/login',
        name:'BaseLogin',
        component:Login
    },
    {
        path:'base/register',
        name:'BaseRegister',
        component:Register
    },
    {
        path:'base/ems',
        name:'BaseEms',
        component:Ems,
        auth:true
    },
    {
        path:'base/profile',
        name:'BaseProfile',
        component:Profile,
        auth:true
    },
];

export default base;