import React from "react";
import {Button} from "antd";
import {DownloadOutlined} from "@ant-design/icons";
import {jsPDF} from "jspdf";
import "jspdf-autotable"
import autoTable from "jspdf-autotable";

export default function ExportSachkonto(props) {
  const exportSachkonto = () => {
    const unit = 'mm'
    const size = 'A3'
    const orientation = "portrait"
    const doc = new jsPDF(orientation, unit, size)
    const head = [
      [
        "Kontonumer",
        "Kontoname",
        "Beschreibung"
      ]

    ]
    const body = props.data.map((row) => [
        row.Kontonummer,
        row.Kontoname,
        row.Beschreibung,
      ]
    )
    autoTable(doc, {
      startY: 15,
      head: head,
      body: body,
    })
    doc.text("Sachkonten", 10, 10)
    doc.save(`Sachkonten.pdf`)
  }
  return (
    <Button
      type="primary"
      icon={<DownloadOutlined/>}
      shape="round"
      onClick={exportSachkonto}
    >
      Export Sachkonten
    </Button>
  )
}