import React, {useEffect, useState} from "react";
import {fetchAllAccounts} from "../services/service";
import {Spin} from "antd";

export default function AccountOverview () {
    const [accounts, setAccounts] = useState()
    useEffect (() => {
        fetchAllAccounts()
            .then(res => setAccounts(res))
    },[])

    return (
        <>
            {!!accounts ?
                (
                    <div>
                        This is Accounts Overview page
                    </div>
                ) :
                (
                    <Spin/>
                )
            }
        </>

    )
}