import React from "react";
// 引入路由组件
import {BrowserRouter} from 'react-router-dom';
// 引入所有的路由
import RouterList from '@/routers/index';

const App = () => {
    return (
        <BrowserRouter>
            <RouterList />
        </BrowserRouter>
    )
}

export default App;