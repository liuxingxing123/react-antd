import React, { Component } from "react";

//自定义实现按需加载
const Loadable = ({ loader, loading: Loading }) => {
  return class LoadableComponent extends Component {
    constructor() {
      super();
      this.state = {//state里面可以是组件
        LoadedComponent: null
      };
    }
    componentDidMount() {
      //()=>import("./Dashboard")
      loader().then(res => {
        //console.log(res.default)
        this.setState({
          LoadedComponent: res.default
        });
      });
    }
    render() {
      const { LoadedComponent } = this.state;
      return LoadedComponent ? <LoadedComponent /> : <Loading />;
    }
  };
};
export default Loadable;
