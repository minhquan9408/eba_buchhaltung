import React, {useEffect, useState} from "react";
import {fetchAllBookings} from "../services/service";
import {Spin} from "antd";

export default function BookingOverview() {
    const [booking, setBooking] = useState()
    useEffect(() => {
        fetchAllBookings()
            .then(res => setBooking(res))
    }, [])

    return (
        <>
            {!!booking ?
                (
                    <div>
                        This is Booking Overview page
                    </div>
                ) :
                (
                    <Spin/>
                )
            }
        </>
    )
}