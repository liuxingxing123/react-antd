import "./editor.less";
import React, { Component } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Spin,
  message
} from "antd";
import Editor from "wangeditor";
import { getArticleById, saveArticle } from "../../requests";
import moment from "moment";

@Form.create()
class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleValidateStatus: "",
      titleHelp: "",
      isLoading: false
    };
  }
  initEditor = () => {
    this.editor = new Editor(this.editorRef);
    this.editor.customConfig.onchange = html => {
      // html 即变化之后的内容
      //console.log(html);
      this.props.form.setFieldsValue({
        content: html
      });
    };
    this.editor.create();
  };
  componentDidMount() {
    this.initEditor();
    this.setState({
      isLoading: true
    });
    getArticleById(this.props.location.state.id)
      .then(resp => {
        const { id, ...data } = resp;
        data.createAt = moment(data.createAt);
        this.props.form.setFieldsValue(data);
        this.editor.txt.html(data.content);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.setState({
          isLoading: false
        });
      });
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //console.log("Received values of form: ", values);
        //console.log(values.createAt.valuesOf())
        const data = Object.assign({}, values, {
          createAt: values.createAt.valueOf()
        });
        //console.log(data)
        this.setState({
          isLoading: false
        });
        saveArticle(this.props.location.state.id, data)
          .then(resp => {
            message.success(resp.msg);
            this.props.history.push("/admin/article");
          })
          .catch(err => {
            console.log(err);
          })
          .finally(() => {});
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 2 },
        sm: { span: 2 }
      },
      wrapperCol: {
        xs: { span: 22 },
        sm: { span: 22 }
      }
    };
    return (
      <Card
        title={this.props.location.state.title}
        extra={<Button onClick={this.props.history.goBack}>取消</Button>}
        bordered={false}
      >
        <Spin spinning={this.state.isLoading}>
          <Form
            {...formItemLayout}
            onSubmit={this.handleSubmit}
            className="login-form"
          >
            <Form.Item
              label="文章标题"
              /*  validateStatus={this.state.titleValidateStatus}
            help={this.state.titleHelp} */
            >
              {getFieldDecorator("title", {
                rules: [
                  { required: true, message: "请输入标题!" }
                  /* {
                  validator: (rule, value, callback) => {
                    console.log({ rule, value, callback });
                    if(value!=="123"){
                        this.setState({
                            titleValidateStatus:"error",
                            titleHelp:"title不正确"
                        })
                    }else{
                        this.setState({
                            titleValidateStatus:"",
                            titleHelp:""
                        })
                        callback()
                    }
                  }
                } */
                ]
              })(<Input placeholder="标题" />)}
            </Form.Item>
            <Form.Item label="作者">
              {getFieldDecorator("author", {
                rules: [{ required: true, message: "Please input author!" }]
              })(<Input placeholder="admin" />)}
            </Form.Item>
            <Form.Item label="阅读量">
              {getFieldDecorator("amount", {
                rules: [{ required: true, message: "Please input amount!" }]
              })(
                <InputNumber
                  style={{ width: "20%" }}
                  min={0}
                  placeholder="阅读量"
                />
              )}
            </Form.Item>
            <Form.Item label="创建时间">
              {getFieldDecorator("createAt", {
                rules: [{ required: true, message: "创建时间" }]
              })(
                <DatePicker
                  style={{ width: "20%" }}
                  showTime
                  placeholder="选择时间"
                />
              )}
            </Form.Item>
            <Form.Item label="内容">
              {getFieldDecorator("content", {
                rules: [{ required: true, message: "内容是必须的" }]
              })(
                <div
                  ref={editor => (this.editorRef = editor)}
                  className="qf-editor"
                ></div>
              )}
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 2 }}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                提交
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Card>
    );
  }
}

export default Edit;
