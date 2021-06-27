import React from "react";
import {Button} from "antd";
import {DownloadOutlined} from "@ant-design/icons";
import {jsPDF} from "jspdf";
import autoTable from "jspdf-autotable";
import {prepareBodyForPdf} from "../utils";

export default function ExportGuV(props) {
  const erloeseKonto = props.erloeseKonto
  const abschreibungen = props.abschreibungen
  const sonstigeBetrieblicheAnwendungen = props.sonstigeBetrieblicheAnwendungen
  const body = []

if(!!erloeseKonto && !!abschreibungen &&!!sonstigeBetrieblicheAnwendungen){
  const summeErloeseKonto = prepareBodyForPdf(body, erloeseKonto, "+ Umsatzerl\u00F6se")
  const summeAbschreibung = prepareBodyForPdf(body, abschreibungen, "- Abschreibungen")
  const summeSonstiges = prepareBodyForPdf(body, sonstigeBetrieblicheAnwendungen, "- Sonstige betriebliche Anwendungen")
  const finalSumme = (summeErloeseKonto + summeAbschreibung + summeSonstiges).toFixed(2)
  body.push([
      "Summe Ergebnis der gew\u00F6hnlichen Gesch\u00E4ftst\u00E4tigkeit",
      "",
      "",
      "",
      finalSumme
    ])
  body.push([
      "Jahres\u00FCberschuss",
      "",
      "",
      "",
      finalSumme
    ])
}


  const exportGuV = () => {
    const unit = 'mm'
    const size = 'A3'
    const orientation = "portrait"
    const doc = new jsPDF(orientation, unit, size)
    const head = [
      [
        "",
        "",
        "Kontonummer",
        "Saldo",
        "Summe",
      ]
    ]
    autoTable(doc, {
      startY: 15,
      head: head,
      body: body,
      didParseCell: function (data) {
          let rows = data.table.body;
          for (const row in rows) {
            if (rows[row]["raw"]["4"]!==undefined){
              data.cell.styles.fontStyle = "bold"
            }
          }
          if (data.row.index === rows.length - 1) {
            data.cell.styles.fontStyle = "bold"
            data.cell.styles.fontSize = 12
          }
        }
    })
    doc.text("Gewinn- und Verlustrechnung in \u20AC zum 31. Dezember", 10, 10)
    doc.save(`GuV.pdf`)
  }

  return (
    <Button
      type="primary"
      icon={<DownloadOutlined/>}
      shape="round"
      onClick={exportGuV}
    >
      Export GuV
    </Button>
  )
}