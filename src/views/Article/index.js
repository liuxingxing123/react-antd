import React, { Component } from "react";
import {
  Card,
  Button,
  Table,
  Tag,
  Modal,
  Typography,
  message,
  Tooltip
} from "antd";
import { getArticles, deleteArticleById } from "../../requests";
import moment from "moment";
import XLSX from "xlsx";

const ButtonGroup = Button.Group;

const titleDisplayMap = {
  id: "id",
  title: "标题",
  author: "作者",
  createAt: "创建时间",
  amount: "阅读量"
};
const dateFormat = "YYYY年MM月DD日 hh:mm:ss";

export default class ArticleList extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      columns: [],
      total: 0,
      isLoading: false,
      offset: 0,
      limited: 10,
      deleteArticleTitle: "",
      isShowArticleModal: false,
      deleteArticleConfirmLoading: false,
      deleteArticleId: null
    };
  }

  createColumns = columnsKey => {
    const columns = columnsKey.map(item => {
      if (item === "amount") {
        return {
          title: titleDisplayMap[item],
          key: item,
          render: (test, record, index) => {
            //console.log(text, record, index)
            const { amount } = record;
            return (
              <Tooltip title={amount >= 200 ? "超过200" : "没超过200"}>
                <Tag color={amount >= 200 ? "red" : "green"}>{amount}</Tag>
              </Tooltip>
            );
          }
        };
      }
      if (item === "createAt") {
        return {
          title: titleDisplayMap[item],
          key: item,
          render: (test, record, index) => {
            //console.log(text, record, index)
            const { createAt } = record;
            return moment(createAt).format(dateFormat);
          }
        };
      }
      return {
        title: titleDisplayMap[item],
        dataIndex: item,
        key: item
      };
    });
    columns.push({
      title: "操作",
      key: "action",
      render: (text, record) => {
        return (
          <ButtonGroup>
            <Button size="small" type="primary" onClick={this.toEdit.bind(this,record)}>
              编辑
            </Button>
            <Button
              size="small"
              onClick={this.showDeleteArticleModel.bind(this, record)}
              type="danger"
            >
              删除
            </Button>
          </ButtonGroup>
        );
      }
    });
    return columns;
  };
  toEdit = (record)=>{
    this.props.history.push({
      pathname:`/admin/article/edit/${record.id}`,
      state:{
        id:record.id,
        title:record.title
      }
    });
  }
  showDeleteArticleModel = record => {
    //console.log(id)
    // Modal.confirm({
    //   title:"此操作不可逆，请谨慎删除!",
    //   content:  (
    //     <Typography>
    //       确定删除<span style={{color:"#f00"}}>{record.title}</span>吗?
    //     </Typography>
    //   ),
    //   onOk(){
    //       deleteArticle(record.id).then((resp)=>{
    //         console.log(resp)
    //       })
    //   }
    // });
    this.setState({
      isShowArticleModal: true,
      deleteArticleTitle: record.title,
      deleteArticleId: record.id
    });
  };
  getData = () => {
    this.setState({
      isLoading: true
    });
    getArticles(this.state.offset, this.state.limited)
      .then(resp => {
        const columnsKeys = Object.keys(resp.list[0]);
        //   const columns = columnsKeys.map(item => {
        //     return {
        //       title: titleDisplayMap[item],
        //       dataIndex: titleDisplayMap[item],
        //       key: titleDisplayMap[item]
        //     };
        //   });

        const columns = this.createColumns(columnsKeys);
          if(!this.updater.isMounted(this)) return;
        this.setState({
          total: resp.total,
          dataSource: resp.list,
          columns
        });
      })
      .catch(err => {
        //处理错误 虽然有全局处理
      })
      .finally(() => {
        if(!this.updater.isMounted(this)) return;
        this.setState({
          isLoading: false
        });
      });
  };
  onPageChange = (page, pageSize) => {
    this.setState(
      {
        offset: pageSize * (page - 1),
        limited: pageSize
      },
      () => {
        this.getData();
      }
    );
  };

  onShowSizeChange = (current, size) => {
    this.setState(
      {
        offset: 0,
        limited: size
      },
      () => {
        this.getData();
      }
    );
  };
  componentDidMount() {
    this.getData();
  }
  hideDeleteModal = () => {
    this.setState({
      deleteArticleTitle: "",
      isShowArticleModal: false,
      deleteArticleConfirmLoading: false
    });
  };

  deleteArticle = () => {
    this.setState({
      deleteArticleConfirmLoading: true
    });

    deleteArticleById(this.state.deleteArticleId)
      .then(resp => {
        message.success(resp.msg);
        this.setState(
          {
            offset: 0
          },
          () => {
            this.getData();
          }
        );
      })
      .catch(() => {})
      .finally(() => {
        this.setState({
          deleteArticleConfirmLoading: false,
          isShowArticleModal: false
        });
      });
  };
  toExcel = () => {
    //console.log("excel")
    //组合数据
    const data = [
      Object.keys(this.state.dataSource[0]).map(item => titleDisplayMap[item])
    ];
    const dataValue = this.state.dataSource.map(item => {
      const result = [];
      for (const key in item) {
        if (key === "createAt") {
          result.push(moment(item[key]).format(dateFormat));
        } else {
          result.push(item[key]);
        }
      }
      return result;
    });
    const resultData = [...data, ...dataValue];
    //console.log(resultData)
    const ws = XLSX.utils.aoa_to_sheet(resultData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheeyJS");
    XLSX.writeFile(
      wb,
      `articles-${this.state.offset / this.state.limited +
        1}-sheetjs-${moment().format("YYYY-MM-DD-hh-mm-ss")}.xlsx`
    );
  };
  render() {
    return (
      <Card
        title="文章列表"
        extra={
          <Button onClick={this.toExcel}>
            导出Excel
          </Button>
        }
        bordered={false}
      >
        <Table
          dataSource={this.state.dataSource}
          columns={this.state.columns}
          rowKey={record => record.id}
          loading={this.state.isLoading}
          pagination={{
            current: this.state.offset / this.state.limited + 1,
            total: this.state.total,
            pageSize: this.state.limited,
            hideOnSinglePage: true,
            showQuickJumper: true,
            showSizeChanger: true,
            onChange: this.onPageChange,
            onShowSizeChange: this.onShowSizeChange,
            pageSizeOptions: ["10", "20", "30", "40"]
          }}
        />
        <Modal
          title="此操作不可逆，请谨慎!"
          visible={this.state.isShowArticleModal}
          onCancel={this.hideDeleteModal}
          onOk={this.deleteArticle}
          maskClosable={false}
          confirmLoading={this.state.deleteArticleConfirmLoading}
        >
          <Typography>
            确定删除
            <span style={{ color: "#f00" }}>
              {this.state.deleteArticleTitle}
            </span>
            吗?
          </Typography>
        </Modal>
      </Card>
    );
  }
}
