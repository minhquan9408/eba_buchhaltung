import React, {useEffect, useState} from "react";
import {fetchAllBookings} from "../../services/service";
import {Spin, Table} from "antd";

export default function BookingOverview() {
    const [bookings, setBookings] = useState()

    useEffect(() => {
        fetchAllBookings()
            .then(res => setBookings(res))
    }, [])

    const columns = [
        {
            title: 'Buchungsnummer',
            dataIndex: 'Buchungsnummer',
            key: 'buchungsnummer',
        },
        {
            title: 'Buchungsdatum',
            dataIndex: 'Buchungsdatum',
            key: 'buchungsdatum',
        },
        {
            title: 'Buchungsschluessel',
            dataIndex: 'Buchungsschluessel',
            key: 'buchungsschluessel',
        },
        {
            title: 'Buchungstext',
            dataIndex: 'Buchungstext',
            key: 'buchungstext',
        },
        {
            title: 'Soll',
            children: [
                {
                    title: 'Konto',
                    dataIndex: 'SollKonto',
                    key: 'sollKonto',
                },
                {
                    title: 'Betrag',
                    dataIndex: 'SollBetragMitSteuer',
                    key: 'sollBetrag',
                }
            ]
        },
        {
            title: 'Haben',
            children: [
                {
                    title: 'Konto',
                    dataIndex: 'HabenKonto',
                    key: 'habenKonto',
                },
                {
                    title: 'Betrag',
                    dataIndex: 'HabenBetragMitSteuer',
                    key: 'habenBetrag',
                }
            ]
        },
        //TODO: Add STEUER COLUMN & CHANGE STEUER BETRAG
        {
            title: 'USt.Soll',
            children: [
                {
                    title: 'Konto',
                    dataIndex: 'SollSteuerKonto',
                    key: 'sollSteuerKonto',
                },
                {
                    title: 'Betrag',
                    dataIndex: 'SollSteuerBetrag',
                    key: 'SollSteuerBetrag',
                }
            ]
        },
        {
            title: 'USt.Haben',
            children: [
                {
                    title: 'Konto',
                    dataIndex: 'HabenSteuerKonto',
                    key: 'habenSteuerKonto',
                },
                {
                    title: 'Betrag',
                    dataIndex: 'HabenSteuerBetrag',
                    key: 'HabenSteuerBetrag',
                }
            ]
        }
    ];

    let dataBookings = [];
    for (const booking in bookings) {
        dataBookings.push(bookings[booking])
        console.log(dataBookings)
    }
    return (
        <>
            {!!bookings ?
                (
                    <Table bordered columns={columns} dataSource={dataBookings}/>
                ) :
                (
                    <Spin/>
                )
            }
        </>
    )
}