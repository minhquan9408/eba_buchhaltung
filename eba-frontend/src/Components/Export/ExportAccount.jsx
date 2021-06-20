import React from "react";
import {Button} from "antd";
import {DownloadOutlined} from "@ant-design/icons";
import {jsPDF} from "jspdf";
import "jspdf-autotable"
import autoTable from "jspdf-autotable";

export default function ExportAccount(props) {

  const exportKonten = () => {
    const unit = 'mm'
    const size = 'A4'
    const orientation = "portrait"
    const doc = new jsPDF(orientation, unit, size)
    const head = [
      [
        "Kontonumer",
        "Kontoname",
        "Beschreibung",
        "Adresse"
      ]
    ]
    const body = props.data.map((row) => [
        row.Kontonummer,
        row.Kontoname,
        row.Beschreibung,
        row.Adresse
      ]
    )

    autoTable(doc,{
      startY: 15,
      head: head,
      body: body,
    })
    doc.text(props.title, 10, 10)
    doc.save(`${props.title}.pdf`)
  }
  return (
    <Button
      type="primary"
      icon={<DownloadOutlined/>}
      shape="round"
      onClick={exportKonten}
    >
      Export {props.title}
    </Button>
  )

}