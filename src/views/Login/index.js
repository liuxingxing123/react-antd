import React, { Component } from "react";
import "./login.less";
import { Form, Input, Button, Card, Checkbox } from "antd";
import { connect } from "react-redux";
import { login } from "../../actions/user";
import { Redirect } from "react-router-dom";
const wrapperCol = {
  xs: {
    span: 20,
    offset: 2
  },
  md: {
    span: 16,
    offset: 4
  }
};
const mapState = state => ({
  isLogin: state.user.isLogin,
  isLoading: state.user.isLoading
});
@connect(mapState, { login })
@Form.create()
class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log(values);
        this.props.login(values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return this.props.isLogin ? (
      <Redirect to="/admin" />
    ) : (
      <Card title="QF Admin登录" className="qf-login-title">
        <Form
          {...wrapperCol}
          name="normal_login"
          className="login-form"
          onSubmit={this.handleSubmit}
        >
          <Form.Item name="username">
            {getFieldDecorator("username", {
              rules: [{ required: true, message: "Please input username!" }]
            })(
              <Input
                disabled={this.props.isLoading}
                placeholder="请输入用户名!"
              />
            )}
          </Form.Item>
          <Form.Item name="password">
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "Please input password!" }]
            })(
              <Input
                disabled={this.props.isLoading}
                type="password"
                placeholder="请输入密码!"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox disabled={this.props.isLoading}>记住我</Checkbox>)}
            <Button
              type="primary"
              htmlType="submit"
              loading={this.props.isLoading}
              className="login-form-button"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default Login;
