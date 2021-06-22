import React from "react";
import {Table, Typography} from "antd";
import {prepareColumnsForSummenSaldenListe, prepareDataSourceForTable} from "../utils";

export default function SummenSaldenlisteDetailsSachkonten(props) {
  const title = props.title
  const {
    anlageUndKapitalKonten,
    finanzUndPrivatkonten,
    betrieblicheAufwendungen,
    erloeseKonto,
    vortragsUndStatischeKonten,
    sachKonten
  } = props.data

  let dataSource = []
  prepareDataSourceForTable(
    dataSource,
    anlageUndKapitalKonten,
    "Anlage- und Kapitalkonten",
    true,
    true,
    true
    )
  prepareDataSourceForTable(
    dataSource,
    finanzUndPrivatkonten,
    "Finanz- und Privatkonten",
    true,
    true,
    true
    )
  prepareDataSourceForTable(
    dataSource,
    betrieblicheAufwendungen,
    "Betriebliche Aufwendungen",
    true,
    true,
    true
    )
  prepareDataSourceForTable(
    dataSource,
    erloeseKonto,
    "Erl\u00F6skonten",
    true,
    true,
    true
    )
  prepareDataSourceForTable(
    dataSource,
    vortragsUndStatischeKonten,
    "Vortragskonten - Statische Konten",
    true,
    true,
    true
    )
  prepareDataSourceForTable(
    dataSource,
    sachKonten,
    " ",
    false,
    false,
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
          (record) => record.Kontonummer === 'Summe' ?
            "summe-row" :
            record.Kontonummer === " " ? "title-row": ""
        }
        pagination={false}
      />
      <br/>
      <br/>
    </div>
  )
}