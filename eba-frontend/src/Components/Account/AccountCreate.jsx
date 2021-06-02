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
                                // onFinish={onFinish}
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
                                    // onFinish={onFinish}
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