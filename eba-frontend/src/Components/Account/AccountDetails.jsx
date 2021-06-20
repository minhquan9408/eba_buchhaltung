import React from 'react'
import {Table, Typography} from "antd";
import {prepareRowBookingForAccount} from "../utils";

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
        let data = prepareRowBookingForAccount(konto)
        if (data.length > 1)
          return (
            <div>
              <Title level={4}>Konto {konto["Kontonummer"]} - {konto["Kontoname"]}</Title>
              <Table
                bordered
                columns={columns}
                dataSource={data}
                rowClassName={
                  (record) => record.Buchungsdatum === 'Summe' ? "summe-row" : ""
                }
                pagination={false}
              />
              <br/>
              <br/>
            </div>

          )
      })
      }
    </div>
  )
}
