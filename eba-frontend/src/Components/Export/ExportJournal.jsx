import React from 'react';
import {Button} from "antd";
import {DownloadOutlined} from '@ant-design/icons';
import {jsPDF} from 'jspdf';
import "jspdf-autotable"
import autoTable from "jspdf-autotable";


export default function ExportJournal(props) {

  const dataBookings = props.data

  const exportJournal = () => {
    const unit = 'mm'
    const size = 'A2'
    const orientation = "portrait"
    const marginLeft = 10
    const title = "Journal"
    const doc = new jsPDF(orientation, unit, size)
    const head = [
      [
        {content: ' ', colSpan: 4, styles: {halign: 'center', fillColor: [22, 160, 133]}},
        {content: 'Soll', colSpan: 2, styles: {halign: 'center', fillColor: [22, 160, 133]}},
        {content: 'Haben', colSpan: 2, styles: {halign: 'center', fillColor: [22, 160, 133]}},
        {content: 'USt.Soll', colSpan: 2, styles: {halign: 'center', fillColor: [22, 160, 133]}},
        {content: 'USt.Haben', colSpan: 2, styles: {halign: 'center', fillColor: [22, 160, 133]}},
      ],
      [
        'Buchungsnummer',
        'Buchungsdatum',
        'Buchungsschl\u00FCssel',
        'Buchungstext',
        'Konto',
        'Betrag',
        'Konto',
        'Betrag',
        'Konto',
        'Betrag',
        'Konto',
        'Betrag',
      ],
    ];

    const body = dataBookings.map((row) => [
      row.Buchungsnummer,
      row.Buchungsdatum,
      row.Buchungsschluessel,
      row.Beschreibung,
      row.SollKonto,
      row.SollBetragMitSteuer,
      row.HabenKonto,
      row.HabenBetragMitSteuer,
      row.SollSteuerKonto,
      row.SollSteuerBetrag,
      row.HabenSteuerKonto,
      row.HabenSteuerBetrag,
    ])

    autoTable(doc,{
      startY: 20,
      head: head,
      body: body,
      theme: 'grid',
      didParseCell: function (data) {
        let col = data.column.index
        if (col === 4 ||
        col === 5 ||
        col === 6 ||
        col === 7 ||
        col === 8 ||
        col === 9 ||
        col === 10 ||
        col === 11
        ) data.cell.styles.halign = 'center'
        let rows = data.table.body;
        if (data.row.index === rows.length - 1) {
          data.cell.styles.fontStyle = "bold"
          data.cell.styles.fontSize = 12
        }
      }
    });

    doc.text(title, marginLeft, 10)
    doc.save("jounal.pdf")
  };
  return (
    <div>
      <Button
        type="primary"
        icon={<DownloadOutlined/>}
        shape="round"
        onClick={exportJournal}
      >
        Export Jounal
      </Button>
    </div>
  )
}