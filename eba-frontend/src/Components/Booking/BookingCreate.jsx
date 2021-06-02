import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {fetchAllAccounts, fetchAllBookings} from "../../services/service";
import {
    Button,
    Spin,
    Form,
    Select,
    Input,
    DatePicker,
} from "antd";


const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

export default function BookingCreate() {
    const [booking, setBooking] = useState({})
    // const [nextId, setNextId] = useState(Object.keys(booking).length)
const [accounts, setAccounts] = useState({})
    useEffect(() => {
        fetchAllBookings()
            .then(res => setBooking(res))
        fetchAllAccounts().then(res => setAccounts(res))
    }, [])
    const [form] = Form.useForm();
    const history = useHistory()

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        const datum = values.date.format('L')
        console.log(values.Buchungstext)

//TODO: CALCULATE STEUER

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const id = Object.keys(booking).length + 1
        console.log(id)
        const raw = JSON.stringify({
            [id]: {
                "Buchungsdatum": datum,
                "Buchungsnummer": id,
                "Buchungsschluessel": values.Buchungschluessel,
                "Buchungstext": values.Buchungstext,
                "Betrag": values.Betrag,
                "Haben": values.Haben,
                "Soll": values.Soll,
                "Steuerkonto": values.Steuerkonto
            }
        });
        console.log(raw)
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("/api/buchungen/add", requestOptions)
            .then(response => {
                if (response.ok) {
                    history.push("/booking/overview")
                }
                return response.json()
            })
            .then(result => {
                    console.log(result)
                }
            )
            .catch(error => console.log('error', error));
    };


    const onReset = () => {
        form.resetFields()
    }
    const onBookingChange = (value) => {
        switch (value) {
            case 'Rechnungsausgang':
                form.setFieldsValue({
                    Buchungschluessel: 'RA',
                });
                return;

            case 'Zahlungseingang':
                form.setFieldsValue({
                    Buchungschluessel: 'ZE',
                });
                return;

            case 'Rechnungseingang':
                form.setFieldsValue({
                    Buchungschluessel: 'RE',
                });
                return;
            case 'Zahlungsausgang':
                form.setFieldsValue({
                    Buchungschluessel: 'ZA',
                });
                return;

            case 'Buchung':
                form.setFieldsValue({
                    Buchungschluessel: 'UM',
                });
                return;
            case 'Sachkonten':
                form.setFieldsValue({
                    Buchungschluessel: 'SA',
                });
                return;
            case 'Er&ouml;ffnungsbuchung 01.01.':
                form.setFieldsValue({
                    Buchungschluessel: 'ER',
                });
        }
    }

    return (
        <>
            {!!booking ?
                (
                    <div>
                        <>
                            <h1>Neue Buchung erstellen</h1>
                            <Form
                                {...formItemLayout}
                                form={form}
                                name="register"
                                onFinish={onFinish}
                                scrollToFirstError
                            >
                                <Form.Item name="date" label="Buchungsdatum"
                                           rules={[{
                                               required: true,
                                               message: 'Waehlen Sie ein Datum aus!',
                                           },]}>
                                    <DatePicker
                                        placeholder="Datum"
                                        style={{
                                            width: 150,
                                        }}
                                    />
                                </Form.Item>


                                <Form.Item
                                    name="Buchungstext"
                                    label="Buchungstext"
                                    rules={[
                                        {
                                            required: true
                                        }
                                    ]}
                                >
                                    <Select
                                        placeholder="W&auml;hlen Sie eine Buchung aus"
                                        onChange={onBookingChange}
                                        allowClear
                                        style={{
                                            width: 500,
                                        }}
                                    >
                                        <Select.Option value="Rechnungsausgang">Rechnungsausgang</Select.Option>
                                        <Select.Option value="Zahlungseingang">Zahlungseingang </Select.Option>
                                        <Select.Option value="Rechnungseingang">Rechnungseingang</Select.Option>
                                        <Select.Option value="Zahlungsausgang">Zahlungsausgang</Select.Option>
                                        <Select.Option value="Buchung">Buchung</Select.Option>
                                        <Select.Option value="Sachkonten">Sachkonten</Select.Option>
                                        <Select.Option value="Er&ouml;ffnungsbuchung 01.01.">Er&ouml;ffnungsbuchung
                                            01.01.</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="Buchungschluessel"
                                    label="Buchungsschl&uuml;ssel"

                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input disabled style={{
                                        width: 50,
                                    }}
                                    />

                                </Form.Item>
                                <Form.Item
                                    name="Betrag"
                                    label="Betrag"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Betrag eingeben',
                                        },
                                    ]}
                                >
                                    <Input
                                        style={{
                                            width: 100
                                        }}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="Steuerkonto"
                                    label="Steuerkonto"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Steuerkonto eingeben',
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="W&auml;hlen Sie ein Steuerkonto aus"
                                        allowClear
                                        style={{
                                            width: 500,
                                        }}
                                    >
                                        <Select.Option value=" ">Kein Steuer</Select.Option>
                                        <Select.Option value="1571">1571 - Vorsteuer 7%</Select.Option>
                                        <Select.Option value="1576">1576 - Vorsteuer 19% </Select.Option>
                                        <Select.Option value="1771">1771 - Umsatzsteuer 7%</Select.Option>
                                        <Select.Option value="1776">1776 - Umsatzsteuer 19%</Select.Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    name="Haben"
                                    label="Haben-Konto"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select Haben-Konto!',
                                        },
                                    ]}
                                >
                                    <Input
                                        style={{
                                            width: 100,
                                        }}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="Soll"
                                    label="Soll-Konto"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select Soll-Konto!',
                                        },
                                    ]}
                                >
                                    <Input
                                        style={{
                                            width: 100,
                                        }}
                                    />
                                </Form.Item>

                                <Form.Item {...tailFormItemLayout}>
                                    <Button type="primary" htmlType="submit">
                                        Buchen
                                    </Button>
                                    <Button htmlType="button" onClick={onReset}>
                                        Reset
                                    </Button>
                                </Form.Item>
                            </Form>
                        </>
                    </div>

                ) :
                (
                    <Spin/>
                )
            }
        </>
    )
}