import React, {useEffect, useState} from "react";
import {fetchAllAccounts} from "../../services/service";
import {
    Button,
    Cascader,
    DatePicker,
    Dropdown,
    Form,
    Input,
    InputNumber,
    Menu,
    Select,
    Spin,
    Switch,
    TreeSelect
} from "antd";
import {DownOutlined, UserOutlined} from "@ant-design/icons";

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
        console.log('Received values of form: ', values);
        const allAccountsIds = Object.keys(accounts)
        console.log(allAccountsIds)

        console.log(values.Kontonummer)
        const id = values.Kontonummer
        // const myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json");
        //
        // const raw = JSON.stringify({
        //     [id]: {
        //         "Beschreibung": "test",
        //         "Eroeffnungsbilanz": {
        //             "Haben": 0,
        //             "Soll": 0
        //         },
        //         "Jahresverkehrszahlen": {
        //             "Haben": 0,
        //             "Soll": 0
        //         },
        //         "Kontoname": "test",
        //         "Kontonummer": "2000",
        //         "Monatsverkehrszahlen": {
        //             "Haben": 0,
        //             "Soll": 0
        //         },
        //         "Buchungen": {}
        //     }
        // });
        //
        // const requestOptions = {
        //     method: 'POST',
        //     headers: myHeaders,
        //     body: raw,
        //     redirect: 'follow'
        // };
        //
        // fetch("/api/konten/add", requestOptions)
        //     .then(response => response.text())
        //     .then(result => console.log(result))
        //     .catch(error => console.log('error', error));
    }

    return (
        <>
            {!!accounts ?
                (
                    <div>
                        This is Account Create page {konto}
                        <Dropdown overlay={menu}>
                            <Button>
                                Konto ausw&auml;hlen <DownOutlined/>
                            </Button>
                        </Dropdown>
                        {konto === "sachkonto" &&
                        <>
                            <h1>This is form for sachkonto</h1>
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
                                            max: 9999,
                                            message: 'The input is not a number, max = 999'
                                        }
                                    ]}
                                >
                                    <InputNumber min={1} max={9999}/>
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
                                    <Input/>
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
                                    <Input.TextArea/>
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
                                <h1>This is form for debitor</h1>
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
                                                required: true
                                            }
                                        ]}
                                    >
                                        <Input/>
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
                                        <Input/>
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
                                        <Input/>
                                    </Form.Item>

                                    <Form.Item
                                        name="Adresse"
                                        label="Adresse"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Beschreibung eingeben',
                                            },
                                        ]}
                                    >
                                        <Input/>
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
                        <h1>This is form for kreditor</h1>
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