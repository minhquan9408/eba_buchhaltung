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
    const [accounts, setAccounts] = useState({})
    const [buchungTextState, setBuchungTextState] = useState("")
    useEffect(() => {
        fetchAllBookings()
            .then(res => setBooking(res))
        fetchAllAccounts().then(res => setAccounts(res))
    }, [])

    useEffect(() => {

    }, [buchungTextState])

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
                "Steuerkonto": values.Steuerkonto,
                "Betrag": values.Betrag,
                "SollBetragMitSteuer": values.Betrag,
                "HabenBetragMitSteuer": values.Betrag,
                "Haben": values.Haben,
                "Soll": values.Soll,
                "SollSteuerKonto": "",
                "HabenSteuerKonto": "",
                "SollSteuerBetrag": "",
                "HabenSteuerBetrag": "",

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
                setBuchungTextState('Rechnungsausgang')
                form.setFieldsValue({
                    Buchungschluessel: 'RA',
                });
                return;

            case 'Zahlungseingang':
                setBuchungTextState('Zahlungseingang')
                form.setFieldsValue({
                    Buchungschluessel: 'ZE',
                });
                return;

            case 'Rechnungseingang':
                setBuchungTextState('Rechnungseingang')
                console.log(buchungTextState)
                form.setFieldsValue({
                    Buchungschluessel: 'RE',
                });
                return;
            case 'Zahlungsausgang':
                setBuchungTextState('Zahlungsausgang')
                console.log(buchungTextState)
                form.setFieldsValue({
                    Buchungschluessel: 'ZA',
                });
                return;

            case 'Buchung':
                setBuchungTextState('Buchung')
                form.setFieldsValue({
                    Buchungschluessel: 'UM',
                });

                return;
            case 'Sachkonten':
                setBuchungTextState('Sachkonten')
                form.setFieldsValue({
                    Buchungschluessel: 'SA',
                });
                return;
            case 'Er&ouml;ffnungsbuchung 01.01.':
                setBuchungTextState('Eroeffnungsbilanz')
                form.setFieldsValue({
                    Buchungschluessel: 'ER',
                });
        }
    }
    let accountsWithName = []
    for (const accountId in accounts) {
        let acc = {
            "Kontonummer": accountId,
            "Kontoname": accounts[accountId]["Kontoname"]
        }
        accountsWithName.push(acc)
    }
    //TODO: SHOULD KONTO 1400 1600 9000 9008 9009 BE EXCLUDED?
    const nurKreditoren = accountsWithName.filter(acc => acc["Kontonummer"] >= 70000 && acc["Kontonummer"] < 100000)
    const nurDebitoren = accountsWithName.filter(acc => acc["Kontonummer"] >= 10000 && acc["Kontonummer"] < 70000)
    const nurSachkonten = accountsWithName.filter(acc => acc["Kontonummer"] >= 1 && acc["Kontonummer"] < 10000)
    const bankKonto = accountsWithName.filter(acc => acc["Kontonummer"] == 1200)
    const erloeseKonto = accountsWithName.filter(acc => acc["Kontonummer"] == 8400)

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
                                    name="Soll"
                                    label="Soll-Konto"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select Soll-Konto!',
                                        },
                                    ]}
                                    shouldUpdate={(prevValues, currentValues) => prevValues.Buchungstext !== currentValues.Buchungstext}
                                >
                                    <Select
                                        placeholder="W&auml;hlen Sie ein Konto aus"
                                        allowClear
                                        style={{
                                            width: 500,
                                        }}
                                    >
                                        {buchungTextState === '' &&
                                        accountsWithName.map((acc) => (
                                            <Select.Option
                                                value={acc["Kontonummer"]}>{acc["Kontonummer"]} - {acc["Kontoname"]}</Select.Option>
                                        ))
                                        }
                                        {buchungTextState === 'Rechnungseingang' &&
                                        accountsWithName.map((acc) => (
                                            <Select.Option
                                                value={acc["Kontonummer"]}>{acc["Kontonummer"]} - {acc["Kontoname"]}</Select.Option>
                                        ))
                                        }
                                        {buchungTextState === 'Zahlungseingang' &&
                                        bankKonto
                                            .map((acc) => (
                                                <Select.Option
                                                    value={acc["Kontonummer"]}>{acc["Kontonummer"]} - {acc["Kontoname"]}</Select.Option>
                                            ))
                                        }
                                        {buchungTextState === 'Rechnungsausgang' &&
                                        nurDebitoren
                                            .map((acc) => (
                                                <Select.Option
                                                    value={acc["Kontonummer"]}>{acc["Kontonummer"]} - {acc["Kontoname"]}</Select.Option>
                                            ))
                                        }
                                        {buchungTextState === 'Zahlungsausgang' &&
                                        nurKreditoren
                                            .map((acc) => (
                                            <Select.Option
                                                value={acc["Kontonummer"]}>{acc["Kontonummer"]} - {acc["Kontoname"]}</Select.Option>
                                        ))
                                        }
                                        {buchungTextState === 'Buchung' &&
                                        nurSachkonten
                                            .map((acc) => (
                                            <Select.Option
                                                value={acc["Kontonummer"]}>{acc["Kontonummer"]} - {acc["Kontoname"]}</Select.Option>
                                        ))
                                        }
                                        {buchungTextState === 'Sachkonten' &&
                                        accountsWithName.map((acc) => (
                                            <Select.Option
                                                value={acc["Kontonummer"]}>{acc["Kontonummer"]} - {acc["Kontoname"]}</Select.Option>
                                        ))
                                        }
                                        {buchungTextState === 'Eroeffnungsbilanz' &&
                                        accountsWithName.map((acc) => (
                                            <Select.Option
                                                value={acc["Kontonummer"]}>{acc["Kontonummer"]} - {acc["Kontoname"]}</Select.Option>
                                        ))
                                        }
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
                                    shouldUpdate={(prevValues, currentValues) => prevValues.Buchungstext !== currentValues.Buchungstext}
                                >
                                    <Select
                                        placeholder="W&auml;hlen Sie ein Konto aus"
                                        allowClear
                                        style={{
                                            width: 500,
                                        }}
                                    >
                                        {buchungTextState === '' &&
                                        accountsWithName.map((acc) => (
                                            <Select.Option
                                                value={acc["Kontonummer"]}>{acc["Kontonummer"]} - {acc["Kontoname"]}</Select.Option>
                                        ))
                                        }
                                        {buchungTextState === 'Zahlungsausgang' &&
                                        bankKonto
                                            .map((acc) => (
                                            <Select.Option
                                                value={acc["Kontonummer"]}>{acc["Kontonummer"]} - {acc["Kontoname"]}</Select.Option>
                                        ))
                                        }
                                        {buchungTextState === 'Zahlungseingang' &&
                                        nurDebitoren
                                            .map((acc) => (
                                                <Select.Option
                                                    value={acc["Kontonummer"]}>{acc["Kontonummer"]} - {acc["Kontoname"]}</Select.Option>
                                            ))
                                        }
                                        {buchungTextState === 'Rechnungseingang' &&
                                        nurKreditoren
                                            .map((acc) => (
                                                <Select.Option
                                                    value={acc["Kontonummer"]}>{acc["Kontonummer"]} - {acc["Kontoname"]}</Select.Option>
                                            ))
                                        }
                                        {buchungTextState === 'Rechnungsausgang' &&
                                        erloeseKonto
                                            .map((acc) => (
                                                <Select.Option
                                                    value={acc["Kontonummer"]}>{acc["Kontonummer"]} - {acc["Kontoname"]}</Select.Option>
                                            ))
                                        }
                                        {buchungTextState === 'Buchung' &&
                                        nurSachkonten
                                            .map((acc) => (
                                            <Select.Option
                                                value={acc["Kontonummer"]}>{acc["Kontonummer"]} - {acc["Kontoname"]}</Select.Option>
                                        ))
                                        }
                                        {buchungTextState === 'Sachkonten' &&
                                        nurSachkonten
                                            .map((acc) => (
                                            <Select.Option
                                                value={acc["Kontonummer"]}>{acc["Kontonummer"]} - {acc["Kontoname"]}</Select.Option>
                                        ))
                                        }
                                        {buchungTextState === 'Eroeffnungsbilanz' &&
                                        accountsWithName.map((acc) => (
                                            <Select.Option
                                                value={acc["Kontonummer"]}>{acc["Kontonummer"]} - {acc["Kontoname"]}</Select.Option>
                                        ))
                                        }
                                    </Select>
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