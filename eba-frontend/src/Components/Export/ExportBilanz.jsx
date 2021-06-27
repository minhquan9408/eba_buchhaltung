import React from "react";
import {DownloadOutlined} from "@ant-design/icons";
import {Button} from "antd";
import {jsPDF} from "jspdf";

export default function ExportBilanz(props) {
  const techAnlagen = props.techAnlagen
  const andere = props.andere
  const bank = props.bank
  const sonstiges = props.sonstiges
  const saldoVortrag = props.saldoVortrag

  let sumTechAnlagen = 0
  let sumAndere = 0
  let sumBank = 0
  let sumSonstiges = 0
  let sumSaldoVortrag = 0

  function exportBilanz() {
    let spaceYAktiva = 20
    const lineXLevel1 = 10
    const lineXLevel2 = 30
    const lineXLevel3 = 40
    const lineKontonummer = 80
    const lineSaldo = 200
    const lineSumSaldo = 250

    const unit = 'mm'
    const size = 'A3'
    const orientation = "portrait"
    const doc = new jsPDF(orientation, unit, size)


    //------------------------AKTIVA--------------------//

    doc.setFontSize(25)
    doc.text("Bilanz Aktiva in \u20AC zum 31. Dezember", 70, 10)

    //Level 1 Anlagevermögen
    doc.setFontSize(20)
    doc.text("A. Anlageverm\u00F6gen", lineXLevel1, spaceYAktiva)
    spaceYAktiva += 10

    //Level 2 Immaterielle
    doc.setFontSize(15)
    doc.text("I. Immaterielle Verm\u00F6gensgegenst\u00E4nde", lineXLevel2, spaceYAktiva)
    spaceYAktiva += 10

    //Level 2 Sachanlagen
    doc.text("II. Sachanlage", lineXLevel2, spaceYAktiva)
    spaceYAktiva += 10


    //SUMME
    doc.setFont(undefined, "bold")
      .text("Summe", lineXLevel1, spaceYAktiva)
      .text("TEST SALDO", lineSumSaldo, spaceYAktiva)
      .setFont(undefined, "normal")
    spaceYAktiva += 10
    //-------------------------------------------//
    //Level 1 Umlaufvermögen
    doc.setFontSize(20)
    doc.text("B. Umlaufverm\u00F6gen", lineXLevel1, spaceYAktiva)
    spaceYAktiva += 10

    //Level 2 Forderung und sonstiges
    doc.setFontSize(15)
    doc.text("II. Forderung und sonstiges", lineXLevel2, spaceYAktiva)
    spaceYAktiva += 10

    if (shouldRender(sonstiges)) {
      doc.text("sonstige Verm\u00F6gegenst\u00E4nde", lineXLevel3, spaceYAktiva)
      spaceYAktiva += 10
      if (sonstiges.length > 0) {
        sonstiges.forEach(konto => {
          const saldoSoll = parseFloat(konto["SaldoSoll"])
          const saldoHaben = parseFloat(konto["SaldoHaben"])
          if (saldoSoll !== saldoHaben)
            doc.text(`${konto["Kontonummer"]} - ${konto["Kontoname"]}`, lineKontonummer, spaceYAktiva)
          if (saldoSoll > 0) {
            doc.text(`- ${konto["SaldoSoll"]}`, lineSaldo, spaceYAktiva)
            sumSonstiges -= saldoSoll
            spaceYAktiva += 10
          }
          if (saldoHaben > 0) {
            doc.text(`${konto["SaldoHaben"]}`, lineSaldo, spaceYAktiva)
            sumSonstiges += saldoSoll
            spaceYAktiva += 10
          }
        })
      }
      doc.text(`${sumSonstiges.toFixed(2)}`, lineSumSaldo, spaceYAktiva)
      spaceYAktiva += 10

    }

    doc.text("IV. Kassenbestand, Bundesbankguthaben, ...", lineXLevel2, spaceYAktiva)
    spaceYAktiva += 10
    //print account
    if (shouldRender(bank)) {
      if (bank.length > 0) {
        bank.forEach(konto => {
          const saldoSoll = parseFloat(konto["SaldoSoll"])
          const saldoHaben = parseFloat(konto["SaldoHaben"])
          if (saldoSoll !== saldoHaben)
            doc.text(`${konto["Kontonummer"]} - ${konto["Kontoname"]}`, lineKontonummer, spaceYAktiva)
          if (saldoSoll > 0) {
            doc.text(`- ${konto["SaldoSoll"]}`, lineSaldo, spaceYAktiva)
            sumBank -= saldoSoll
            spaceYAktiva += 10
          }
          if (saldoHaben > 0) {
            doc.text(`${konto["SaldoHaben"]}`, lineSaldo, spaceYAktiva)
            sumBank += saldoSoll
            spaceYAktiva += 10
          }
        })
      }
      doc.text(`${sumBank.toFixed(2)}`, lineSumSaldo, spaceYAktiva)
      spaceYAktiva += 10
    }

    const sumAktiva = (sumTechAnlagen + sumBank +sumSonstiges+sumAndere +sumSaldoVortrag).toFixed(2)
    doc.setFont(undefined, "bold")
      .text("Gesamtsumme", lineXLevel1, spaceYAktiva)
      .text(sumAktiva, lineSumSaldo, spaceYAktiva)
      .setFont(undefined, "normal")
    spaceYAktiva += 10



    doc.addPage()

//------------------------PASSIVA--------------------//
    doc.setFontSize(25)
    doc.text("Bilanz Aktiva in \u20AC zum 31. Dezember", 70, 10)

    doc.save(`Bilanz.pdf`)
  }

  return (

    <Button
      type="primary"
      icon={<DownloadOutlined/>}
      shape="round"
      onClick={exportBilanz}
    >
      Export Bilanz
    </Button>

  )
}

function shouldRender(konten) {
  let shouldbeRendered = false
  konten.every(konto => {
    if (konto["SaldoSoll"] !== konto["SaldoHaben"]) {
      shouldbeRendered = !shouldbeRendered
    }
    if (shouldbeRendered) return false
    else return true
  })
  return shouldbeRendered
}

