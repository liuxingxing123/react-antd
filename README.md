This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

1.cnpm install -g create-react-app
2.create-react-app my-app
3.cd my-app

# 启动编译当前的 React 项目，并自动打开 http://localhost:3000/

4.npm start

# 配置装饰器的写法

5.cnpm i react-app-rewired customize-cra -D
同时将 package.json 替换成
"start": "react-app-rewired start",
"build": "react-app-rewired build",
"test": "react-app-rewired test",
const {
    override,
    addLessLoader,
    addDecoratorsLegacy,
    fixBabelImports
} = require("customize-cra")  需要安装cnpm i @babel/plugin-proposal-decorators -D   来支持addDecoratorsLegacy

# 配置less
6 cnpm i less less-loader -D

# 安装antd
7.cnpm i antd -S 同时需要安装babel-plugin-import   cnpm i babel-plugin-import -D
babel-plugin-import 是一个用于按需加载组件代码和样式的 babel 插件（原理），现在我们尝试安装它并修改 config-overrides.js 文件。

# 安装react-router-dom   react的路由
8.cnpm i react-router-dom -S

# 配置路由的懒加载
9.cnpm i react-loadable -S

# 安装ajax请求的库文件axios
10.cnpm i axios -S

# 安装第三方库moment  日期时间库
11.cnpm i moment -S

# 前端导出文件的库
12.cnpm i xlsx -S

# 安装wangEditor富文本编辑器
13 cnpm i  wangeditor -s

# 安装echarts图表库
14cnpm i echarts -s

# 安装redux 及其需要的库文件
cnpm i redux react-redux redux-thunk -s