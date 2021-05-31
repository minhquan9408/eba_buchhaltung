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

export default function AccountCreate () {
    const [accounts, setAccounts] = useState()
    const [konto, setKonto] = useState("")

    useEffect (() => {
        fetchAllAccounts()
            .then(res => setAccounts(res))
    },[])
    function handleMenuClick(e) {
        setKonto(e.key)
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
                                labelCol={{
                                    span: 4,
                                }}
                                wrapperCol={{
                                    span: 14,
                                }}
                                layout="horizontal"


                            >
                                <Form.Item label="DatePicker">
                                    <DatePicker/>
                                </Form.Item>
                                <Form.Item label="Input">
                                    <Input/>
                                </Form.Item>
                                <Form.Item label="Select">
                                    <Select>
                                        <Select.Option value="demo">Demo</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label="TreeSelect">
                                    <TreeSelect
                                        treeData={[
                                            {
                                                title: 'Light',
                                                value: 'light',
                                                children: [
                                                    {
                                                        title: 'Bamboo',
                                                        value: 'bamboo',
                                                    },
                                                ],
                                            },
                                        ]}
                                    />
                                </Form.Item>
                                <Form.Item label="Cascader">
                                    <Cascader
                                        options={[
                                            {
                                                value: 'zhejiang',
                                                label: 'Zhejiang',
                                                children: [
                                                    {
                                                        value: 'hangzhou',
                                                        label: 'Hangzhou',
                                                    },
                                                ],
                                            },
                                        ]}
                                    />
                                </Form.Item>

                                <Form.Item label="InputNumber">
                                    <InputNumber/>
                                </Form.Item>
                                <Form.Item label="Switch">
                                    <Switch/>
                                </Form.Item>
                                <Form.Item label="Button">
                                    <Button>Button</Button>
                                </Form.Item>
                            </Form>
                        </>
                        }
                        {konto === "debitor" &&
                        <h1>This is form for debitor</h1>
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