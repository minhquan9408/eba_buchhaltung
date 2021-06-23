import React, {useEffect, useState} from "react";
import ExportGuV from "../Export/ExportGuV";
import {fetchAllAccounts} from "../../services/service";
import {prepareAccount} from "../utils";

export default function GewinnVerlustRechung() {

  const [accounts, setAccounts] = useState()
    useEffect(() => {
        fetchAllAccounts()
            .then(res => setAccounts(res))
    }, [])
let erloeseKonto = prepareAccount(8000, 9000, accounts)
let abschreibungen = prepareAccount(4820, 4900, accounts)
let sonstigeBetrieblicheAnwendungen = prepareAccount(4200, 4800, accounts)
  sonstigeBetrieblicheAnwendungen.push(prepareAccount(4900, 5000, accounts))
  return (
    <ExportGuV
    erloeseKonto = {erloeseKonto}
    abschreibungen = {abschreibungen}
    sonstigeBetrieblicheAnwendungen = {sonstigeBetrieblicheAnwendungen}
    />
  )
}