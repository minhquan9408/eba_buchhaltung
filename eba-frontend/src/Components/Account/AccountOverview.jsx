import React, {useEffect, useState} from "react";
import {fetchAllAccounts} from "../../services/service";
import {Spin} from "antd";

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
            console.log(konto)
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
        console.log(debitoren.length)
        console.log(kreditoren.length)
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
                        This is Accounts Overview page für Sachkonten
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
                        This is Accounts Overview page für Debitoren
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
                        This is Accounts Overview page für Kreditoren
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