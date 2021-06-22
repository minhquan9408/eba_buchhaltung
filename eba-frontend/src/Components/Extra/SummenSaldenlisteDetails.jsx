import React from "react";
import {Table, Typography} from "antd";
import {prepareColumnsForSummenSaldenListe, prepareDataSourceForTable} from "../utils";

export default function SummenSaldenlisteDetails(props) {
  const title = props.title
  const konten = props.data
  let dataSource = []
  prepareDataSourceForTable(
    dataSource,
    konten,
    "",
    false,
    true,
    false
  )
  return (
    <div>
      <Typography.Title level={2}>
        Summen und Saldenlisten {title}
      </Typography.Title>
      <Table
        bordered
        columns={prepareColumnsForSummenSaldenListe()}
        dataSource={dataSource}
        rowClassName={
          (record) => record.Kontonummer === 'Summe' ? "summe-row" : ""
        }
        pagination={false}
      />
      <br/>
      <br/>
    </div>
  )
}