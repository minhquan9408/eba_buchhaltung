import React from "react";
import "antd/dist/antd.css";
import { Table, Typography } from "antd";

const { Text } = Typography;

const columns = [
  {
    title: "Name",
    dataIndex: "name"
  },
  {
    title: "Borrow",
    dataIndex: "borrow"
  },
  {
    title: "Repayment",
    dataIndex: "repayment"
  }
];

let data = [
  {
    key: "1",
    name: "John Brown",
    borrow: 10,
    repayment: 33
  },
  {
    key: "2",
    name: "Jim Green",
    borrow: 100,
    repayment: 0
  },
  {
    key: "3",
    name: "Joe Black",
    borrow: 10,
    repayment: 10
  },
  {
    key: "4",
    name: "Jim Red",
    borrow: 75,
    repayment: 45
  }
];

const getSummaryData = () => {
  let totalBorrow = 0;
  let totalRepayment = 0;
  data.forEach(({ borrow, repayment }) => {
    totalBorrow += borrow;
    totalRepayment += repayment;
  });
  data = [
    {
      key: "0",
      name: "Summary",
      borrow: totalBorrow,
      repayment: totalRepayment
    },
    ...data
  ];
};
getSummaryData();
export default function Test() {
    return(
  <>
    <Table columns={columns} dataSource={data} pagination={false} bordered />
    <br />
  </>
)
}

