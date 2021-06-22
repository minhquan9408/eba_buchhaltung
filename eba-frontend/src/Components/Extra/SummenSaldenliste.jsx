import React, {useEffect, useState} from "react";
import {fetchAllAccounts} from "../../services/service";
import {prepareAccount} from "../utils";
import SummenSaldenlisteDetails from "./SummenSaldenlisteDetails";
import SummenSaldenlisteDetailsSachkonten from "./SummenSaldenlisteDetailsSachkonten";
import ExportSummenSaldenliste from "../Export/ExportSummenSaldenliste";

export default function SummenSaldenliste() {
  const [accounts, setAccounts] = useState()
  useEffect(() => {
    fetchAllAccounts()
      .then(res => setAccounts(res))
  }, [])
  let sachKonten = prepareAccount(0, 10000, accounts)
  let anlageUndKapitalKonten = prepareAccount(0, 1000, accounts)
  let finanzUndPrivatkonten = prepareAccount(1000, 3000, accounts)
  let betrieblicheAufwendungen = prepareAccount(4000, 5000, accounts)

  let erloeseKonto = prepareAccount(8000, 9000, accounts)
  let vortragsUndStatischeKonten = prepareAccount(8999, 9500, accounts)
  let debitoren = prepareAccount(10000, 70000, accounts)
  let kreditoren = prepareAccount(70000, 100000, accounts)

  const toProps = {
            anlageUndKapitalKonten, finanzUndPrivatkonten, betrieblicheAufwendungen,
            erloeseKonto, vortragsUndStatischeKonten, sachKonten
          }

  return (
    <div>
      <ExportSummenSaldenliste
        dataSachkonten={toProps}
        dataDebitoren={debitoren}
        dataKreditoren={kreditoren}
      />
      <div>
        <SummenSaldenlisteDetailsSachkonten
          title={"Sachkonten"}
          data={toProps}
        />

      </div>

      <div>
        <SummenSaldenlisteDetails
          title = {"Debitoren"}
          data = {debitoren}
        />
      </div>

      <div>
        <SummenSaldenlisteDetails
          title = {"Kreditoren"}
          data = {kreditoren}
        />
      </div>

    </div>

  )
}