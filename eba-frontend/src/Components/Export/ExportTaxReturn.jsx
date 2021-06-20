import React from "react";
import {DownloadOutlined} from "@ant-design/icons";
import {Button} from "antd";
import {jsPDF} from "jspdf";
import "jspdf-autotable"
import autoTable from "jspdf-autotable";

export default function ExportTaxReturn(props) {
  const data = props.data
  console.log(data)
  const exportTaxReturn = () => {
    const unit = 'mm'
    const size = 'A4'
    const orientation = "portrait"
    const doc = new jsPDF(orientation, unit, size)

    const head = [[
      "Beschreibung",
      "Summe"
    ]]
    const body = data.map((row)=> [
      row.Beschreibung,
      row.Summe
    ])
    autoTable(doc, {
      startY: 15,
      head: head,
      body: body,
      didParseCell: function (data) {
        let col = data.column.index
        if (col === 1) data.cell.styles.halign = 'right'
        let rows = data.table.body;
        if (data.row.index === rows.length - 1) {
            data.cell.styles.fontStyle = "bold"
            data.cell.styles.fontSize= 12
        }
    }
    })
    doc.text("Umsatzsteuererkl\u00E4rung des gesamten Gesch\u00E4ftsjahr", 10, 5)
    doc.save("steuererkl\u00E4rung.pdf")
  }
  return (
    <div>
      <Button
        type="primary"
        icon={<DownloadOutlined/>}
        shape="round"
        onClick={exportTaxReturn}
      >
        Export
      </Button>
    </div>
  )
}