import React, {useEffect, useState} from "react";
import {fetchAllAccounts} from "../../services/service";
import {Spin, Typography} from "antd";
import AccountDetails from "./AccountDetails";

export default function AccountOverview() {
    const {Title} = Typography;

    const [accounts, setAccounts] = useState()
    useEffect(() => {
        fetchAllAccounts()
            .then(res => setAccounts(res))

    }, [])


let sachKonten = []
let debitoren = []
let kreditoren = []
    if(!!accounts) {
        for (const account in accounts) {
            const konto = accounts[account]

                    if (account > 0 && account < 10000) {
                        sachKonten.push(konto)
                    }
                    if (account >= 10000 && account < 70000) {
                        debitoren.push(konto)
                    }
                    if (account >= 70000 && account < 100000) {
                        kreditoren.push(konto)
                    }
                }
        console.log(sachKonten)
        console.log(debitoren)
        console.log(kreditoren)
    }



    return (
        <>
            {!!accounts ?
                (
                    <div>
            <Title level={2}>Sachkonten</Title>
            {sachKonten.length > 0 ?
                (
                    <div>
                        <AccountDetails data = {sachKonten}></AccountDetails>
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
                        <AccountDetails data = {debitoren}></AccountDetails>
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
                        <AccountDetails data = {kreditoren}></AccountDetails>
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