import logo from "./logo.png";
import "./frame.less";
import React, { Component } from "react";
import {logout } from "../../actions/user"
import { Layout, Menu, Icon, Dropdown, Avatar, Badge } from "antd";
import { withRouter } from "react-router-dom";
import {connect} from "react-redux"
import {getNotificationsList} from "../../actions/notifications"
const { Header, Content, Sider } = Layout;


const mapSatte=state=>{
  return {
    notificationsCount:state.notifications.list.filter(item=>item.hasRead===false).length,
    avator:state.user.avator,
    displayName:state.user.displayName
  }
}
@withRouter
@connect(mapSatte,{getNotificationsList,logout})
class Frame extends Component {
  onMenuClick = ({ key }) => {
    //console.log(item, key, keyPath, selectedKeys, domEvent )
    this.props.history.push(key);
  };
  onDropdownMenuClick = ({key})=>{
    if(key==="/logout"){
      this.props.logout()
    }else{
      this.props.history.push(key)
    }
    
  }
  componentDidMount(){
    this.props.getNotificationsList()
  }
  renderMenu = ()=> (
    <Menu onClick={this.onDropdownMenuClick}>
      <Menu.Item key="/admin/notifications">
        <Badge dot={Boolean(this.props.notificationsCount)}>通知中心</Badge>
      </Menu.Item>
      <Menu.Item key="/admin/profile">个人设置</Menu.Item>
      <Menu.Item key="/logout">退出登录</Menu.Item>
    </Menu>
  );
  render() {
    //console.log(this.props.location.pathname.split("/").slice(0,3).join("/"))
    return (
      <Layout style={{ minHeight: "100%" }}>
        <Header className="header qf-header">
          <div className="qf-logo">
            <img src={logo} alt="QFADMIN" />
          </div>
          <Dropdown overlay={this.renderMenu()} /* trigger={["click"]} */>
            <div
              className="ant-dropdown-link"
              onClick={e => e.preventDefault()}
              style={{ display: "flex", alignItems: "center", color: "#fff" }}
            >
              <Avatar src={this.props.avator} />
              <span>欢迎您!{this.props.displayName} </span>
              <Badge count={this.props.notificationsCount} offset={[-10, -10]}>
                <Icon type="down" />
              </Badge>
            </div>
          </Dropdown>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: "#fff" }}>
            <Menu
              mode="inline"
              selectedKeys={[
                this.props.location.pathname
                  .split("/")
                  .slice(0, 3)
                  .join("/")
              ]}
              onClick={this.onMenuClick}
              style={{ height: "100%", borderRight: 0 }}
            >
              {this.props.menus.map(route => {
                return (
                  <Menu.Item key={route.pathname}>
                    <Icon type={route.icon} />
                    {route.title}
                  </Menu.Item>
                );
              })}
            </Menu>
          </Sider>
          <Layout style={{ padding: "16px" }}>
            <Content
              style={{
                background: "#fff",
                //padding: 24,
                margin: 0
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
export default Frame;
