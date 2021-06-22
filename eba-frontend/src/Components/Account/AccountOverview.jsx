import React, {useEffect, useState} from "react";
import {fetchAllAccounts} from "../../services/service";
import {Spin, Typography} from "antd";
import AccountDetails from "./AccountDetails";
import ExportKontenBlatt from "../Export/ExportKontenBlatt";
import {prepareAccount} from "../utils";

export default function AccountOverview() {
    const {Title} = Typography;

    const [accounts, setAccounts] = useState()
    useEffect(() => {
        fetchAllAccounts()
            .then(res => setAccounts(res))
    }, [])

let sachKonten = prepareAccount(0, 10000, accounts)
let debitoren = prepareAccount(10000, 70000, accounts)
let kreditoren = prepareAccount(70000, 100000, accounts)

    return (
        <>
          <ExportKontenBlatt
            sachKonten = {sachKonten}
            debitoren = {debitoren}
            kreditoren = {kreditoren}
          />
            {!!accounts ?
                (
                    <div>
            <Title level={2}>Sachkonten</Title>
            {sachKonten.length > 0 ?
                (
                    <div>
                        <AccountDetails data = {sachKonten}/>
                    </div>
                ) :
                (
                    <div>Kein Sachkonto </div>
                )
            }
            <Title level={2}>Debitoren</Title>
            {debitoren.length > 0 ?
                (
                    <div>
                        <AccountDetails data = {debitoren}/>
                    </div>
                ) :
                (
                    <div>Kein Debitoren </div>
                )
            }
            <Title level={2}>Kreditoren</Title>
            {kreditoren.length > 0 ?
                (
                    <div>
                        <AccountDetails data = {kreditoren}/>
                    </div>
                ) :
                (
                    <div>Kein Kreditoren </div>
                )
            }
                    </div>
                ) :
                (
                    <Spin/>
                )
            }
        </>
    )
}