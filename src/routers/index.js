import React from "react";
// 引入路由的组件
import { Routes, Route, Outlet } from "react-router-dom";
// 引入验证登录的路由
import AuthRouter from './Auth';

// 引入home组件
import Home from '@/components/Home';

// 引入每个目录下的index.js
const ModulesFile = require.context('./', true, /index.js$/);

// 路由总集合
const RouterMap = [];

ModulesFile.keys().reduce((modules, modulePath) => {
    // 路由模块名称
    const ModuleName = modulePath.replace(/^.\/(.*)\.js/, '$1');

    if (ModuleName !== 'index') {
        // 获取路由列表
        const ModuleList = ModulesFile(modulePath);

        // 把获取到的路由追加集合里
        RouterMap.push(...ModuleList.default)
    }

    return RouterMap;
}, {});

console.log(RouterMap);

const RouterList = () => {
    return (
        <Routes>
            {/* 首页 */}
            <Route path="/" element={<AuthRouter auth={false} component={<Home />} />} ></Route>

            {/* 遍历路由总集合 */}
            <Route element={<Outlet />} >
                {RouterMap.map((item, index) => {
                    return (
                        // 把父级路由循环出来
                        <Route path={item.path} key={index}>
                            {/* 把子级路由循环出来 */}
                            {item.children.map((son, idx) => {
                                return (
                                    <Route path={son.path} key={idx} element={<AuthRouter auth={son.auth} component={<son.component />} />}></Route>
                                )
                            })}
                        </Route>
                    )
                })}
            </Route>
        </Routes>
    )
}

export default RouterList;