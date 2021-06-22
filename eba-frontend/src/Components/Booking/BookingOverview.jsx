import React, {useEffect, useState} from "react";
import {fetchAllBookings} from "../../services/service";
import {Spin, Table} from "antd";
import {Typography} from 'antd';
import ExportJournal from "../Export/ExportJournal";

export default function BookingOverview() {
  const {Title} = Typography;
  const [bookings, setBookings] = useState()

  useEffect(() => {
    fetchAllBookings()
      .then(res => setBookings(res))
  }, [])

  const columns = [
    {
      title: 'Buchungsnummer',
      dataIndex: 'Buchungsnummer',
      key: 'buchungsnummer',
    },
    {
      title: 'Buchungsdatum',
      dataIndex: 'Buchungsdatum',
      key: 'buchungsdatum',
    },
    {
      title: 'Buchungsschl\u00FCssel',
      dataIndex: 'Buchungsschluessel',
      key: 'buchungsschluessel',
    },
    {
      title: 'Buchungstext',
      dataIndex: 'Beschreibung',
      key: 'buchungstext',
    },
    {
      title: 'Soll',
      children: [
        {
          title: 'Konto',
          dataIndex: 'SollKonto',
          key: 'sollKonto',
        },
        {
          title: 'Betrag',
          dataIndex: 'SollBetragMitSteuer',
          key: 'sollBetrag',
          align: 'right'
        }
      ]
    },
    {
      title: 'Haben',
      children: [
        {
          title: 'Konto',
          dataIndex: 'HabenKonto',
          key: 'habenKonto',
        },
        {
          title: 'Betrag',
          dataIndex: 'HabenBetragMitSteuer',
          key: 'habenBetrag',
          align: 'right'

        }
      ]
    },
    //TODO: Add STEUER COLUMN & CHANGE STEUER BETRAG
    {
      title: 'USt.Soll',
      children: [
        {
          title: 'Konto',
          dataIndex: 'SollSteuerKonto',
          key: 'sollSteuerKonto',
        },
        {
          title: 'Betrag',
          dataIndex: 'SollSteuerBetrag',
          key: 'SollSteuerBetrag',
          align: 'right'

        }
      ]
    },
    {
      title: 'USt.Haben',
      children: [
        {
          title: 'Konto',
          dataIndex: 'HabenSteuerKonto',
          key: 'habenSteuerKonto',
        },
        {
          title: 'Betrag',
          dataIndex: 'HabenSteuerBetrag',
          key: 'HabenSteuerBetrag',
          align: 'right'

        }
      ]
    }
  ];

  let dataBookings = []
  let sumSollBetrag = 0
  let sumHabenBetrag = 0
  let sumSteuerSollBetrag = 0
  let sumSteuerHabenBetrag = 0
  for (const booking in bookings) {
    if (bookings.hasOwnProperty(booking)) {
      dataBookings.push(bookings[booking])
      let sollBetrag = parseFloat(bookings[booking]["SollBetragMitSteuer"])
      let habenBetrag = parseFloat(bookings[booking]["HabenBetragMitSteuer"])
      let steuerSollBetrag = parseFloat(bookings[booking]["SollSteuerBetrag"])
      let steuerHabenBetrag = parseFloat(bookings[booking]["HabenSteuerBetrag"])

      if (!isNaN(sollBetrag)) sumSollBetrag += sollBetrag

      if (!isNaN(habenBetrag)) sumHabenBetrag += habenBetrag

      if (!isNaN(steuerHabenBetrag)) sumSteuerHabenBetrag += steuerHabenBetrag

      if (!isNaN(steuerSollBetrag)) sumSteuerSollBetrag += steuerSollBetrag
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
    "HabenSteuerBetrag": sumSteuerHabenBetrag.toFixed(2),
    "HabenSteuerKonto": "",
    "SollBetragMitSteuer": sumSollBetrag.toFixed(2),
    "SollKonto": "",
    "SollSteuerBetrag": sumSteuerSollBetrag.toFixed(2),
    "SollSteuerKonto": "",
    "Steuerkonto": "",
  }
  dataBookings.push(summary)
  return (
    <>
      <span>
         <Title style={{textAlign: 'center'}}>
        Journal
      </Title>
        <ExportJournal data={dataBookings}/>
      </span>

      {!!bookings ?
        (
          <div>
            <Table bordered
                   columns={columns}
                   dataSource={dataBookings}
                   rowClassName={
                     (record) => record.Buchungsnummer === 'Summe' ? "summe-row" : ""
                   }
                   pagination={false}
            />
          </div>
        ) :
        (
          <Spin/>
        )
      }
    </>
  )
}