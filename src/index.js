import "./index.less"
import React from "react"
import { render } from "react-dom"
import store from "./store"
import {Provider} from "react-redux"
import App from "./App"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom"

import { mainRouter } from "./routes"

import zhCN from "antd/es/locale/zh_CN"
import {ConfigProvider} from "antd"
render(
  <Provider store={store}>
  <ConfigProvider locale={zhCN}>
    <Router>
      <Switch>
        <Route
          path="/admin"
          component={App}
        />
        {mainRouter.map(route => {
          return (
            <Route
              path={route.pathname}
              component={route.component}
              key={route.pathname}
            />
          );
        })}
        <Redirect to="/admin" from="/" exact />
        <Redirect to="/404" />
      </Switch>
    </Router>
  </ConfigProvider></Provider>,
  document.querySelector("#root")
);
