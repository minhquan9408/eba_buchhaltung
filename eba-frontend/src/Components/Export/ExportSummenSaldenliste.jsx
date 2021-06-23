import React from "react";
import {Button} from "antd";
import {DownloadOutlined} from "@ant-design/icons";
import {jsPDF} from "jspdf";
import {exportSummenSaldenliste, exportSummenSaldenlisteSachkonten, prepareDataSourceForTable} from "../utils";

export default function ExportSummenSaldenliste(props) {

  const {
    anlageUndKapitalKonten,
    finanzUndPrivatkonten,
    betrieblicheAufwendungen,
    erloeseKonto,
    vortragsUndStatischeKonten,
    sachKonten
  } = props.dataSachkonten

  let dataSachkontenForExport  = []
  prepareDataSourceForTable(
    dataSachkontenForExport,
    anlageUndKapitalKonten,
    "Anlage- und Kapitalkonten",
    true,
    true,
    true
    )
  prepareDataSourceForTable(
    dataSachkontenForExport,
    finanzUndPrivatkonten,
    "Finanz- und Privatkonten",
    true,
    true,
    true
    )
  prepareDataSourceForTable(
    dataSachkontenForExport,
    betrieblicheAufwendungen,
    "Betriebliche Aufwendungen",
    true,
    true,
    true
    )
  prepareDataSourceForTable(
    dataSachkontenForExport,
    erloeseKonto,
    "Erl\u00F6skonten",
    true,
    true,
    true
    )
  prepareDataSourceForTable(
    dataSachkontenForExport,
    vortragsUndStatischeKonten,
    "Vortragskonten - Statische Konten",
    true,
    true,
    true
    )
  prepareDataSourceForTable(
    dataSachkontenForExport,
    sachKonten,
    " ",
    false,
    false,
    false
    )
  const debitoren = props.dataDebitoren
  const kreditoren = props.dataKreditoren
  const exportListe = () => {
    const unit = 'mm'
    const size = 'A2'
    const orientation = "portrait"
    const doc = new jsPDF(orientation, unit, size)


    exportSummenSaldenlisteSachkonten(doc, dataSachkontenForExport, "Sachkonten")
    doc.addPage()
    exportSummenSaldenliste(doc, debitoren, "Debitoren")
    doc.addPage()
    exportSummenSaldenliste(doc, kreditoren,"Kreditoren")


    doc.save("Summen-Saldenliste.pdf")
  };
  return (
    <div>
      <div>
        <Button
          type="primary"
          icon={<DownloadOutlined/>}
          shape="round"
          onClick={exportListe}
        >
          Export
        </Button>
      </div>
    </div>
  )
}