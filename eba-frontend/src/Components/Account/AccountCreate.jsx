import React, {useEffect, useState} from "react";
import {fetchAllAccounts} from "../../services/service";
import {Button, Dropdown, Form, Input, InputNumber, Menu, Spin} from "antd";
import {DownOutlined, UserOutlined} from "@ant-design/icons";
import {useHistory} from "react-router-dom";
import {Typography} from 'antd';

const {Title} = Typography;
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

export default function AccountCreate() {
  const [accounts, setAccounts] = useState()
  const [konto, setKonto] = useState("")
  const history = useHistory()
  const [isVorhanden, setIsVorhanden] = useState(false)
  useEffect(() => {
    fetchAllAccounts()
      .then(res => setAccounts(res))
  }, [])

  function handleMenuClick(e) {
    setKonto(e.key)
  }

  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields()
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="sachkonto" icon={<UserOutlined/>}>
        Sachkonto
      </Menu.Item>
      <Menu.Item key="debitor" icon={<UserOutlined/>}>
        Debitor
      </Menu.Item>
      <Menu.Item key="kreditor" icon={<UserOutlined/>}>
        Kreditor
      </Menu.Item>
    </Menu>
  );

  const onFinish = (values) => {
    const id = values.Kontonummer
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      [id]: {
        "Kontonummer": values.Kontonummer,
        "Kontoname": values.Kontoname,
        "Beschreibung": values.Beschreibung,
        "EroeffnungsbilanzHabenWert": 0,
        "EroeffnungsbilanzSollWert": 0,
        "JahresverkehrszahlenHabenWert": 0,
        "JahresverkehrszahlenSollWert": 0,
        "Saldo": 0,
        "SaldoSoll": 0,
        "SaldoHaben": 0,
        "Adresse": values.Adresse,
        "Buchungen": {}
      }
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://127.0.0.1:5000/api/konten/add", requestOptions)
      .then(response => {
        if (response.ok) {
          history.push("/account/all-accounts")
          return response.json()
        }
        if (response.status === 400) {
          setIsVorhanden(true)
        }
      })
      .catch(error => console.log('error', error));
  }

  return (
    <>
      {!!accounts ?
        (
          <div>
                        <span>
                            <Title level={3}>
                              W&auml;hlen Sie den Kontotyp
                            </Title>
                            <Dropdown overlay={menu}>
                            <Button>
                                Konto ausw&auml;hlen <DownOutlined/>
                            </Button>
                        </Dropdown>
                        </span>

            {konto === "sachkonto" &&
            <>
              <Title>Sachkonto</Title>

              <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
              >

                <Form.Item
                  name="Kontonummer"
                  label="Kontonummer"
                  rules={[
                    {
                      required: true,
                      type: 'number',
                      min: 1,
                      max: 9999,
                      message: 'Sachkonto bitte eine Zahl zwischen 1 - 9999 eingeben'
                    }
                  ]}
                >
                  <InputNumber/>
                </Form.Item>
                <Form.Item
                  name="Kontoname"
                  label="Kontoname"

                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input style={{
                    width: 500,
                  }}/>
                </Form.Item>

                <Form.Item
                  name="Beschreibung"
                  label="Beschreibung"
                  rules={[
                    {
                      required: true,
                      message: 'Beschreibung eingeben',
                    },
                  ]}
                >
                  <Input.TextArea style={{
                    width: 500,
                  }}/>
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">
                    Konto erstellen
                  </Button>
                  <Button htmlType="button" onClick={onReset}>
                    Reset
                  </Button>
                </Form.Item>
              </Form>
            </>
            }
            {konto === "debitor" && (
              <>
                <Title>Debitor</Title>
                <Form
                  {...formItemLayout}
                  form={form}
                  name="register"
                  onFinish={onFinish}
                  scrollToFirstError
                >

                  <Form.Item
                    name="Kontonummer"
                    label="Kontonummer"
                    rules={[
                      {
                        required: true,
                        type: 'number',
                        min: 10000,
                        max: 69999,
                        message: 'Debitoren bitte eine Zahl zwischen 10000 - 69999 eingeben'
                      }
                    ]}
                  >
                    <InputNumber/>
                  </Form.Item>
                  <Form.Item
                    name="Kontoname"
                    label="Kontoname"

                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input style={{
                      width: 500,
                    }}/>
                  </Form.Item>

                  <Form.Item
                    name="Adresse"
                    label="Adresse"
                    rules={[
                      {
                        required: true,
                        message: 'Adresse eingeben',
                      },
                    ]}
                  >
                    <Input style={{
                      width: 500,
                    }}/>
                  </Form.Item>

                  <Form.Item
                    name="Beschreibung"
                    label="Beschreibung"
                    rules={[
                      {
                        required: true,
                        message: 'Beschreibung eingeben',
                      },
                    ]}
                  >
                    <Input.TextArea style={{
                      width: 500,
                    }}/>
                  </Form.Item>

                  <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                      Konto erstellen
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                      Reset
                    </Button>
                  </Form.Item>
                </Form>
              </>
            )
            }
            {konto === "kreditor" &&
            <>
              <Title>Kreditor</Title>
              <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
              >

                <Form.Item
                  name="Kontonummer"
                  label="Kontonummer"
                  rules={[
                    {
                      required: true,
                      type: 'number',
                      min: 70000,
                      max: 99999,
                      message: 'Kreditoren bitte eine Zahl zwischen 70000 - 99999 eingeben'
                    }
                  ]}
                >
                  <InputNumber/>
                </Form.Item>
                <Form.Item
                  name="Kontoname"
                  label="Kontoname"

                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input style={{
                    width: 500,
                  }}/>
                </Form.Item>

                <Form.Item
                  name="Adresse"
                  label="Adresse"
                  rules={[
                    {
                      required: true,
                      message: 'Adresse eingeben',
                    },
                  ]}
                >
                  <Input style={{
                    width: 500,
                  }}/>
                </Form.Item>

                <Form.Item
                  name="Beschreibung"
                  label="Beschreibung"
                  rules={[
                    {
                      required: true,
                      message: 'Beschreibung eingeben',
                    },
                  ]}
                >
                  <Input.TextArea style={{
                    width: 500,
                  }}/>
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">
                    Konto erstellen
                  </Button>
                  <Button htmlType="button" onClick={onReset}>
                    Reset
                  </Button>
                </Form.Item>
              </Form>
            </>
            }
            {isVorhanden && (
              <p type="danger" style={{textAlign: "center", color: "red"}}> Kontonummer ist
                schon
                vorhanden, w&auml;hlen Sie andere Nummer
                aus </p>
            )}
          </div>

        ) :
        (
          <Spin/>
        )
      }
    </>
  )
}