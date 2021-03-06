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
  Typography
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
    const datum = values.date.format('DD.MM.YYYY')
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const id = Object.keys(booking).length + 1
    const raw = JSON.stringify({
      [id]: {
        "Buchungsdatum": datum,
        "Buchungsnummer": id,
        "Beschreibung": values.Beschreibung,
        "Buchungsschluessel": values.Buchungschluessel,
        "Buchungstext": values.Buchungstext,
        "Steuerkonto": values.Steuerkonto,
        "Betrag": values.Betrag,
        "SollBetragMitSteuer": values.Betrag,
        "HabenBetragMitSteuer": values.Betrag,
        "HabenKonto": values.HabenKonto,
        "SollKonto": values.SollKonto,
        "SollSteuerKonto": "",
        "HabenSteuerKonto": "",
        "SollSteuerBetrag": 0,
        "HabenSteuerBetrag": 0,

      }
    });
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://127.0.0.1:5000/api/buchungen/add", requestOptions)
      .then(response => {
        if (response.ok) {
          history.push("/booking/overview")
        }
        return response.json()
      })
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
        form.setFieldsValue({
          Buchungschluessel: 'RE',
        });
        return;
      case 'Zahlungsausgang':
        setBuchungTextState('Zahlungsausgang')
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
      case 'Eroeffnungsbuchung':
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
  const alleKontenExcludeSteuerKonto = accountsWithName.filter(acc =>
    acc["Kontonummer"] !== "1571" &&
    acc["Kontonummer"] !== "1576" &&
    acc["Kontonummer"] !== "1771" &&
    acc["Kontonummer"] !== "1776"
  )
  const nurDebitoren = accountsWithName.filter(acc => acc["Kontonummer"] >= 10000 && acc["Kontonummer"] < 70000)
  const nurSachkonten = accountsWithName.filter(acc =>
    acc["Kontonummer"] >= 1 &&
    acc["Kontonummer"] < 10000 &&
    acc["Kontonummer"] !== "1571" &&
    acc["Kontonummer"] !== "1576" &&
    acc["Kontonummer"] !== "1771" &&
    acc["Kontonummer"] !== "1776"
  )
  const bankKonto = accountsWithName.filter(acc => acc["Kontonummer"] >= 1000 && acc["Kontonummer"] < 1201)
  const erloeseKonto = accountsWithName.filter(acc => acc["Kontonummer"] >= 8000 && acc["Kontonummer"] < 9000)
  const mWStKonto = accountsWithName.filter(acc => acc["Kontonummer"] === "1771" || acc["Kontonummer"] === "1776")
  const vorSteuerKonto = accountsWithName.filter(acc => acc["Kontonummer"] === "1571" || acc["Kontonummer"] === "1576")
  const allSteuerKonto = accountsWithName.filter(acc => acc["Kontonummer"] === "1571" || acc["Kontonummer"] === "1576"
    || acc["Kontonummer"] === "1771" || acc["Kontonummer"] === "1776"
  )
  return (
    <>
      {!!booking ?
        (
          <div>
            <>
              <Typography.Title level={3}>Neue Buchung erstellen</Typography.Title>
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
                    <Select.Option value="Eroeffnungsbuchung">Er&ouml;ffnungsbuchung
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
                  name="Beschreibung"
                  label="Beschreibung"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input.TextArea style={{
                    width: 500,
                  }}/>

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
                    min={0}
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

                    {buchungTextState === 'Rechnungsausgang' ?
                      mWStKonto.map((acc) => (
                      <Select.Option
                        value={acc["Kontonummer"]}>{acc["Kontonummer"]} - {acc["Kontoname"]}</Select.Option>
                    )) : buchungTextState === 'Rechnungseingang' ? vorSteuerKonto.map((acc) => (
                        <Select.Option
                          value={acc["Kontonummer"]}>{acc["Kontonummer"]} - {acc["Kontoname"]}</Select.Option>
                      )) :
                      allSteuerKonto.map((acc) => (
                        <Select.Option
                          value={acc["Kontonummer"]}>{acc["Kontonummer"]} - {acc["Kontoname"]}</Select.Option>
                      ))

                    }

                  </Select>
                </Form.Item>

                <Form.Item
                  name="SollKonto"
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
                    nurSachkonten.map((acc) => (
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
                    nurSachkonten.map((acc) => (
                      <Select.Option
                        value={acc["Kontonummer"]}>{acc["Kontonummer"]} - {acc["Kontoname"]}</Select.Option>
                    ))
                    }
                    {buchungTextState === 'Eroeffnungsbilanz' &&
                    alleKontenExcludeSteuerKonto.map((acc) => (
                      <Select.Option
                        value={acc["Kontonummer"]}>{acc["Kontonummer"]} - {acc["Kontoname"]}</Select.Option>
                    ))
                    }
                  </Select>
                </Form.Item>

                <Form.Item
                  name="HabenKonto"
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
                    alleKontenExcludeSteuerKonto.map((acc) => (
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