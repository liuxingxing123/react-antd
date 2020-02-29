import React, { Component, createRef } from "react";
import echarts from "echarts";
import { getArticleAmount } from "../../requests";

export default class Dashboard extends Component {
  constructor() {
    super();
    this.articleAmount = createRef();
  }

  initArticleChart() {
    
    getArticleAmount().then(res => {
      const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        title: {
            text: '文章阅读量'
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: res.amount.map(item => item.month)
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: res.amount.map(item => item.value),
            type: "line",
            areaStyle: {}
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      this.articleChart.setOption(option);
    });
  }
  componentDidMount() {
    this.articleChart = echarts.init(this.articleAmount.current);
    this.initArticleChart();
  }
  render() {
    return <div ref={this.articleAmount} style={{ height: "400px" }}></div>;
  }
}
