// import Dashboard from "./Dashboard"
// import Login from "./Login"
// import NotFound from "./NotFound"
// import Setting from "./Setting"
// import ArticleList from "./Article"
// import ArticleEdit from "./Article/Edit"

//配置组件的按需加载  xxx.chunk.js
import Loadable from "react-loadable"
//import Loadable from "./Loadable"   //自定义实现懒加载原理
import {Loading} from "../components"

const Dashboard = Loadable({
    loader:()=>import("./Dashboard"),
    loading:Loading
})

const Login = Loadable({
    loader:()=>import("./Login"),
    loading:Loading
})

const NotFound = Loadable({
    loader:()=>import("./NotFound"),
    loading:Loading
})

const Setting = Loadable({
    loader:()=>import("./Setting"),
    loading:Loading
})

const ArticleList = Loadable({
    loader:()=>import("./Article"),
    loading:Loading
})

const ArticleEdit = Loadable({
    loader:()=>import("./Article/Edit"),
    loading:Loading
})

const Notifications = Loadable({
    loader:()=>import("./Notifications"),
    loading:Loading
})
const NoAuth = Loadable({
    loader:()=>import("./NoAuth"),
    loading:Loading
})
const Profile = Loadable({
    loader:()=>import("./Profile"),
    loading:Loading
})
export {
    Dashboard,
    Login,
    NotFound,
    Setting,
    ArticleList,
    ArticleEdit,
    Notifications,
    NoAuth,
    Profile
}