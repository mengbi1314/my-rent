// 引入目录下的所有js文件
const ModulesFile = require.context("./", true, /.js$/);

//接口集合
const ApiList = {};

ModulesFile.keys().reduce((modules, modulePath) => {
    // 文件名
    const ModuleName = modulePath.replace(/^.\/(.*)\.js/, "$1");

    // 不包含当前index.js 文件
    if (ModuleName !== "index") {
        // API请求列表
        const ModuleList = ModulesFile(modulePath);

        // 合并对象 循环多次合并
        Object.assign(ApiList, ModuleList.default);
    }

    return ApiList;
}, {});

//导出接口集合
export default ApiList;