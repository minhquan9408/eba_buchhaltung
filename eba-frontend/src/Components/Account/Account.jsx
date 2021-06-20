import React, {useEffect, useState} from "react";
import {fetchAllAccounts} from "../../services/service";
import {Table, Typography} from "antd";
import ExportAccount from "../Export/ExportAccount";
import ExportSachkonto from "../Export/ExportSachkonto";
import {prepareAccount} from "../utils";

export default function Account() {
  const [accounts, setAccounts] = useState()
  useEffect(() => {
    fetchAllAccounts()
      .then(res => setAccounts(res))
  }, [])

  let sachKonten = prepareAccount(0, 10000, accounts)
  let debitoren = prepareAccount(10000, 70000, accounts)
  let kreditoren = prepareAccount(70000, 100000, accounts)

  const columnsSachkonten = [
    {
      title: 'Kontonummer',
      dataIndex: 'Kontonummer',
      key: 'Kontonummer',
    },
    {
      title: 'Kontoname',
      dataIndex: 'Kontoname',
      key: 'Kontoname',
    },
    {
      title: 'Beschreibung',
      dataIndex: 'Beschreibung',
      key: 'buchungstext',
    },
  ]

  const columnsNotSachkonten = [
    {
      title: 'Kontonummer',
      dataIndex: 'Kontonummer',
      key: 'Kontonummer',
    },
    {
      title: 'Kontoname',
      dataIndex: 'Kontoname',
      key: 'Kontoname',
    },
    {
      title: 'Beschreibung',
      dataIndex: 'Beschreibung',
      key: 'buchungstext',
    },
    {
      title: 'Adresse',
      dataIndex: 'Adresse',
      key: 'Adresse',
    },
  ]
  return (
    <div>
      <div>
        <Typography.Title level={4}>Alle Sachkonten</Typography.Title>
        <ExportSachkonto data={sachKonten}/>
        <Table
          bordered
          columns={columnsSachkonten}
          dataSource={sachKonten}
          pagination={false}
        />
      </div>
      <br/>
      <br/>
      <div>
        <Typography.Title level={4}>Alle Debitoren</Typography.Title>
        <ExportAccount data={debitoren} title={"Debitoren"}/>
        <Table
          bordered
          columns={columnsNotSachkonten}
          dataSource={debitoren}
          pagination={false}
        />
      </div>
      <br/>
      <br/>
      <div>
        <Typography.Title level={4}>Alle Kreditoren</Typography.Title>
        <ExportAccount data={kreditoren} title={"Kreditoren"}/>
        <Table
          bordered
          columns={columnsNotSachkonten}
          dataSource={kreditoren}
          pagination={false}
        />
      </div>
    </div>
  )
}