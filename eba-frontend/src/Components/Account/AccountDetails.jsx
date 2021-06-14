import React, {useState} from 'react'
import {Table} from "antd";

export default function AccountDetails(props) {
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
        },
        {
          title: 'Haben',
          dataIndex: 'HabenBetragMitSteuer',
          key: 'HabenBetragMitSteuer',
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
        for (const buchung in buchungen){
          data.push(buchungen[buchung])
        }
        if (data.length != 0)
        return (
          <div>
            <p>Konto {konto["Kontonummer"]} - {konto["Kontoname"]}</p>
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
