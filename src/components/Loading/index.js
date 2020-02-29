import "./index.less";
import React from "react";
import { Spin } from "antd";

export default function Loading() {
  return (
    <div className="example">
      <Spin />
    </div>
  );
}
