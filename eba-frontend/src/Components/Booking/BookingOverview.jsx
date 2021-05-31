import React, {useEffect, useState} from "react";
import {fetchAllBookings} from "../../services/service";
import {Spin} from "antd";
import {Table} from 'antd';

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
                    dataIndex: 'Soll',
                    key: 'sollKonto',
                },
                {
                    title: 'Betrag',
                    dataIndex: 'Betrag',
                    key: 'sollBetrag',
                }
            ]
        },
        {
            title: 'Haben',
            children: [
                {
                    title: 'Konto',
                    dataIndex: 'Haben',
                    key: 'habenKonto',
                },
                {
                    title: 'Betrag',
                    dataIndex: 'Betrag',
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
                    dataIndex: 'Steuerkonto',
                    key: 'habenKonto',
                },
                {
                    title: 'Betrag',
                    dataIndex: '',
                    key: 'habenBetrag',
                }
            ]
        },
        {
            title: 'USt.Haben',
            children: [
                {
                    title: 'Konto',
                    dataIndex: 'Steuerkonto',
                    key: 'habenKonto',
                },
                {
                    title: 'Betrag',
                    dataIndex: '',
                    key: 'habenBetrag',
                }
            ]
        }
    ];

    let data = [];
    for (const booking in bookings) {
        data.push(bookings[booking])
        console.log(data)
    }
    return (
        <>
            {!!bookings ?
                (
                    <Table bordered columns={columns} dataSource={data}/>
                ) :
                (
                    <Spin/>
                )
            }
        </>
    )
}