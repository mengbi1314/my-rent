// 引入每个目录下面的index.js文件
const ModulesFile = require.context('./', true, /index.js$/);

// Api总集合
const ApiList = {};

// 循环
ModulesFile.keys().reduce((modules, modulePath) => {
    // 获取文件名
    const ModuleName = modulePath.replace(/^.\/(.*)\.js/, '$1');

    if (ModuleName !== 'index') {
        // API列表
        const ModuleList = ModulesFile(modulePath);

        //合并对象 循环多次合并
        Object.assign(ApiList, ModuleList.default);
    }

    return ApiList;
}, {});


export default ApiList;