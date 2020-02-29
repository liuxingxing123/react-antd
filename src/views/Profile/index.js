import React, { Component } from "react";
import { Upload, Card, Button, Spin, message } from "antd";
import axios from "axios";
import { connect } from "react-redux";
import { change_avator } from "../../actions/user";
const mapState = state => ({
  avatorUrl: state.user.avatorUrl
});
@connect(mapState, { change_avator })
class Profile extends Component {
  state = {
    isUploading: false
  };
  handleUploadAvator = ({ file }) => {
    this.setState({
      isUploading: true
    });
    //上传到的是贴图库http://www.tietuku.com/doc
    const data = new FormData();
    data.append(
      "Token",
      "0a3b7dc5455076c28c01b1fc6d748e44a940d39b:Yl75dvkpVOdq87_HIMcWf8MHM1o=:eyJkZWFkbGluZSI6MTU4Mjk1OTQ0MSwiYWN0aW9uIjoiZ2V0IiwidWlkIjoiNzExMjMwIiwiYWlkIjoiMTY2Njk4NCIsImZyb20iOiJmaWxlIn0="
    );
    data.append("file", file);
    axios
      .post("http://up.imgapi.com/", data)
      .then(resp => {
        if (resp.status === 200) {
          this.setState({
            isUploading: false
          });
          this.props.change_avator(resp.data.linkurl);
          message.success("上传成功!");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <Card title="个人设置" bordered={false}>
        <Upload
          showUploadList={false}
          style={{
            border: "1px dashed #dedede",
            width: 120,
            height: 60,
            display: "block"
          }}
          customRequest={this.handleUploadAvator}
        >
          <Spin spinning={this.state.isUploading}>
            {this.state.avatorUrl ? (
              <img
                style={{ width: 80, height: 80, borderRadius: "50%" }}
                src={this.state.avatorUrl}
                alt="头像"
              />
            ) : (
              <Button>点击上传头像</Button>
            )}
          </Spin>
        </Upload>
        ,
      </Card>
    );
  }
}
export default Profile;
