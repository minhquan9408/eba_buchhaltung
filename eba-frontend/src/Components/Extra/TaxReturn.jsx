import React, {useEffect, useState} from "react";
import {fetchAllAccounts} from "../../services/service";
import {Table, Typography} from "antd";
import ExportTaxReturn from "../Export/ExportTaxReturn";

export default function TaxReturn() {
  const [accounts, setAccounts] = useState()
  useEffect(() => {
    fetchAllAccounts()
      .then(res => setAccounts(res))
  }, [])
  let vorSteuer = []
  let mehrwertSteuer = []
  let sumVorSteuer = 0
  let sumMehrwertSteuer = 0
  let saldo = 0
  if (!!accounts) {
    for (const account in accounts) {
      const konto = accounts[account]
      if (account == 1571 || account == 1576) {
        vorSteuer.push(konto)
        let betrag = parseFloat(konto["JahresverkehrszahlenSollWert"])
        sumVorSteuer += betrag
      }

      if (account == 1771 || account == 1776) {
        mehrwertSteuer.push(konto)
        let betrag = parseFloat(konto["JahresverkehrszahlenHabenWert"])
        sumMehrwertSteuer += betrag
      }
    }
    saldo = sumMehrwertSteuer - sumVorSteuer
  }
  const columns = [
    {
      title: 'Beschreibung',
      dataIndex: 'Beschreibung',
      key: 'Beschreibung',
      align: 'left'
    },
    {
      title: 'Summe',
      dataIndex: 'Summe',
      key: 'Summe',
      align: 'right'
    }
  ]
  const data = [
    {
      "Beschreibung": "Saldo von Vorsteuer",
      "Summe": sumVorSteuer.toFixed(2)
    },
    {
      "Beschreibung": "Saldo von Mehrwertsteuer",
      "Summe": sumMehrwertSteuer.toFixed(2)
    },
    {
      "Beschreibung": "Ans Finanzamt zu zahlen",
      "Summe": saldo.toFixed(2)
    }
  ]
  return (
    <div>
      <Typography.Title level = {3}>
        Steuererkl&auml;rung
      </Typography.Title>
      <ExportTaxReturn data = {data}/>
      <Table bordered
             columns={columns}
             dataSource={data}
             rowClassName={
               (record) => record.Beschreibung === 'Ans Finanzamt zu zahlen' ? "summe-row" : ""
             }
             pagination={false}
      />
    </div>
  )
}