import React from "react";
// 引入路由的组件
import { Routes, Route, Outlet } from "react-router-dom";
// 引入验证登录的路由
import AuthRouter from './Auth';

// 引入每个目录下的index.js
const ModulesFile = require.context('./',true,/index.js$/);

// 路由总集合
const RouterMap = [];

ModulesFile.keys().reduce((modules,modulePath) => {
    // 路由模块名称
    const ModuleName = modulePath.replace(/^.\/(.*)\.js/,'$1');

    if(ModuleName !== 'index')
    {
        // 获取路由列表
        const ModuleList = ModulesFile(modulePath);

        // 把获取到的路由追加集合里
        RouterMap.push(...ModuleList.default)
    }

    return RouterMap;
},{});

console.log(RouterMap);

const RouterList = () => {

}

export default RouterList;