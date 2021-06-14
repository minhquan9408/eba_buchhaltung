import React, {useEffect, useState} from "react";
import {fetchAllAccounts} from "../../services/service";
import {Spin} from "antd";
import AccountDetails from "./AccountDetails";

export default function AccountOverview() {
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
                        <h1>Sachkonten</h1>
            {sachKonten.length > 0 ?
                (
                    <div>
                        {/*<AccountDetails></AccountDetails>*/}
                    </div>
                ) :
                (
                    <div>Kein Sachkonto </div>
                )
            }
            <h1>Debitoren</h1>
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
            <h1>Kreditoren</h1>
            {kreditoren.length > 0 ?
                (
                    <div>
                        {/*<AccountDetails></AccountDetails>*/}
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