// 引入路由组件
import { Outlet } from 'react-router-dom';

// 引入当前目录下面的所有文件
const ModulesFile = require.context('./',true,/.js$/);

// 路由集合
const RouterMap = [];

ModulesFile.keys().reduce((modules,modulePath) => {
    // 路由模块名称
    const ModuleName = modulePath.replace(/^.\/(.*)\.js/,'$1');

    if(ModuleName !== 'index')
    {
        const ModuleList = ModulesFile(modulePath);

        RouterMap.push(...ModuleList.default);
    }

    return RouterMap;
},{});

// 定义父组件
const Layout = () => {
    return (
        <Outlet />
    )
}

const RouterList = [
    {
        path:'/business',
        name:'Business',
        component:Layout,
        children:RouterMap
    }
];

export default RouterList;