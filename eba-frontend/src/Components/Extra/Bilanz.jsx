import React, {useEffect, useState} from "react";
import {fetchAllAccounts} from "../../services/service";
import ExportBilanz from "../Export/ExportBilanz";
import {prepareAccount, prepareBodyForPdf} from "../utils";

export default function Bilanz() {
  const [accounts, setAccounts] = useState()
  useEffect(() => {
    fetchAllAccounts()
      .then(res => setAccounts(res))
  }, [])
  let techAnlagen = []
  let andere = []
  let bank = []
  let sonstiges = []
  let sonstiges2 = []
  let saldoVortrag = []

  if (!!accounts) {
    //-----------------------AKTIVA----------------------//
    //ANLAGEVERMÖGEN
    //Sachanlage
    techAnlagen = prepareAccount(200, 300, accounts)
    andere = prepareAccount(300, 500, accounts)


    //UMLAUFVERMÖGEN
    //Kassenbestand
    bank = prepareAccount(1200, 1201, accounts)
    // Forderung und sonstiges -> sonstige Vermögensgegenstände
    sonstiges = prepareAccount(1300, 1400, accounts)
    sonstiges2 = prepareAccount(1401, 1600, accounts)
    sonstiges2.forEach(konto => {
      sonstiges.push(konto)
    })
    console.log(sonstiges)
    //SONSTIGES
    //Saldovortrag

    //SONSTIGES
    saldoVortrag = prepareAccount(9000, 9010, accounts)


    //-----------------------PASSIVA----------------------//


  }
  return (
    <div>
      <ExportBilanz
        techAnlagen={techAnlagen}
        andere={andere}
        bank={bank}
        sonstiges={sonstiges}
        saldoVortrag={saldoVortrag}
      />
    </div>
  )
}