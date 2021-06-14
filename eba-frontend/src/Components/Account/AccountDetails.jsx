import React from 'react'
import {Table, Typography} from "antd";

export default function AccountDetails(props) {
  const {Title} = Typography;
  const konten = props.data
  const columns = [
    {
      title: 'Datum',
      dataIndex: 'Buchungsdatum',
      key: 'Buchungsdatum',
    },
    {
      title: 'Beleg Nr.',
      dataIndex: 'Buchungsschluessel',
      key: 'Buchungsschluessel',
    },
    {
      title: 'Buchungstext',
      dataIndex: 'Beschreibung',
      key: 'Beschreibung',
    },
    {
      title: 'Gegenkonto',
      dataIndex: 'GegenKonto',
      key: 'GegenKonto',
    },
    {
      title: 'Betrag',
      children: [
        {
          title: 'Soll',
          dataIndex: 'SollBetragMitSteuer',
          key: 'SollBetragMitSteuer',
          align: 'right'

        },
        {
          title: 'Haben',
          dataIndex: 'HabenBetragMitSteuer',
          key: 'HabenBetragMitSteuer',
          align: 'right'

        }
      ]
    },
    {
      title: 'USt-Konto',
      dataIndex: 'Steuerkonto',
      key: 'Steuerkonto',
    }
  ]
  return (

    <div>
      {konten.map((konto) => {
        const buchungen = konto["Buchungen"]
        let data = []
        let sumSollBetrag = 0
        let sumHabenBetrag = 0
        for (const buchung in buchungen) {
          if (buchungen.hasOwnProperty(buchung)){
            data.push(buchungen[buchung])
          let sollBetrag = parseFloat(buchungen[buchung]["SollBetragMitSteuer"])
          let habenBetrag = parseFloat(buchungen[buchung]["HabenBetragMitSteuer"])
          if (!isNaN(sollBetrag)) sumSollBetrag += sollBetrag
          if (!isNaN(habenBetrag)) sumHabenBetrag += habenBetrag
          }
        }
        const summary = {
          "Beschreibung": "",
          "Betrag": "",
          "Buchungsdatum": "",
          "Buchungsnummer": "Summe",
          "Buchungsschluessel": "",
          "Buchungstext": "",
          "GegenKonto": "",
          "HabenBetragMitSteuer": sumHabenBetrag.toFixed(2),
          "HabenKonto": "",
          "HabenSteuerBetrag": "",
          "HabenSteuerKonto": "",
          "SollBetragMitSteuer": sumSollBetrag.toFixed(2),
          "SollKonto": "",
          "SollSteuerBetrag": "",
          "SollSteuerKonto": "",
          "Steuerkonto": "",
        }
        data.push(summary)
        if (data.length > 1)
          return (
            <div>
              <Title level = {4}>Konto {konto["Kontonummer"]} - {konto["Kontoname"]}</Title>
              <Table
                bordered
                columns={columns}
                dataSource={data}
                rowClassName={
                  (record) => record.Buchungsnummer === 'Summe' ? "summe-row" : ""
                }
              />
            </div>

          )
      })
      }
    </div>
  )
}
