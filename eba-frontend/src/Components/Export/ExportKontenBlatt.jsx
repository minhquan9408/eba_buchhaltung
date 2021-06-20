import React from "react";
import {Button} from "antd";
import {DownloadOutlined} from "@ant-design/icons";
import {jsPDF} from "jspdf";
import "jspdf-autotable"
import {renderRowForAccountPDF} from "../utils";


export default function ExportKontenBlatt(props) {

  const sachKonten = props.sachKonten
  const debitoren = props.debitoren
  const kreditoren = props.kreditoren

  const exportKonten = () => {
    const unit = 'mm'
    const size = 'A3'
    const orientation = "portrait"
    const doc = new jsPDF(orientation, unit, size)

    renderRowForAccountPDF(doc, "Sachkonten", sachKonten)
    renderRowForAccountPDF(doc, "Debitoren", debitoren)
    renderRowForAccountPDF(doc, "Kreditoren", kreditoren)
    doc.save("konten.pdf")
  }
  return (
    <div>
      <Button
        type="primary"
        icon={<DownloadOutlined/>}
        shape="round"
        onClick={exportKonten}
      >
        Export Kontenbl&auml;tter
      </Button>
    </div>
  )
}