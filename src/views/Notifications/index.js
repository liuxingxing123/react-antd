import React, { Component } from "react";
import { Card, Button, List, Avatar, Badge, Spin } from "antd";
import { connect } from "react-redux";
import {
  markNotificationsAsReadById,
  markAllNotificationsRead
} from "../../actions/notifications";
const mapState = state => {
  const { list, isLoading } = state.notifications;
  return {
    list,
    isLoading
  };
};
@connect(mapState, { markNotificationsAsReadById, markAllNotificationsRead })
class Notifications extends Component {
  render() {
    return (
        <Spin spinning={this.props.isLoading}>
      <Card
        title="通知中心"
        extra={
          <Button
            disabled={this.props.list.every(item => item.hasRead === true)}
            onClick={this.props.markAllNotificationsRead}
          >
            全部标记为已读
          </Button>
        }
        bordered={false}
      >
        <List
          itemLayout="horizontal"
          dataSource={this.props.list}
          renderItem={item => (
            <List.Item
              extra={
                item.hasRead ? null : (
                  <Button
                    onClick={this.props.markNotificationsAsReadById.bind(
                      this,
                      item.id
                    )}
                    style={{ marginLeft: "20px" }}
                  >
                    标记为已读
                  </Button>
                )
              }
            >
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<Badge dot={!item.hasRead}>{item.title}</Badge>}
                description={item.desc}
              />
            </List.Item>
          )}
        />
      </Card>
      </Spin>
    );
  }
}
export default Notifications;
