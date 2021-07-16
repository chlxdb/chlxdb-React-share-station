import React, { Component } from 'react'

import axios from 'axios'
import { Form, Input, Button, message, Card } from 'antd';
import { Row, Col } from 'antd';

//管理员登录处
const onFinishFailed = errorInfo => {//错误的提示
    console.log('Failed:', errorInfo);
};
export default class Login1 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: [],
            password: []
        }
    }

    LoginPass() {//验证并成功跳转
        axios.post('http://121.4.187.232:8080/user/adminLogin?password=' + this.state.password + '&username=' + this.state.name, {
        })
            .then(
                response => {
                    if (response.data.state) {
                        sessionStorage.setItem("token", response.data.token)
                        localStorage.setItem('token', response.data.token)
                        message.success('登录成功')
                        this.props.history.push('/manage')
                    } else {
                        message.error('用户名或密码错误,请重新登录!')
                    }
                }
            )
    }
    onFinish = values => {//成功的提示
        console.log('Success:', values);
        this.setState({
            name: values.username,
        })
        this.setState({
            password: values.password
        })
        this.LoginPass()
    };
    render() {
        return (
            <div style={{ backgroundColor: "#adc6ff", height: "720px" }}>
                <Row justify="space-around" align="middle">
                    <Col span={10}>
                        <Card title="管理员登录处" style={{ marginTop: '150px', width: '100%' }}>
                            <Form
                                name="basic"
                                initialValues={{ remember: true }}
                                onFinish={this.onFinish}
                                onFinishFailed={onFinishFailed}
                            >
                                <Form.Item
                                    label="Username"
                                    name="username"
                                    rules={[{ required: true, message: '请输入用户名!' },
                                    {
                                        min: 4,
                                        message: '不能少于4个字符',
                                    }, {
                                        pattern: /^[^\s]*$/,
                                        message: '禁止输入空格',
                                    },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[{ required: true, message: '请输入密码!' },
                                    {
                                        min: 4,
                                        message: '密码不能少于4个字符',
                                    }, {
                                        max: 6,
                                        message: '密码不能大于6个字符',
                                    }, {
                                        pattern: /^[^\s]*$/,
                                        message: '禁止输入空格',
                                    },]}
                                >
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item >
                                    <Button type="primary" htmlType="submit">
                                        登录
                                    </Button>
                                </Form.Item>
                            </Form>

                        </Card>
                    </Col>
                </Row>
            </div >
        )

    }
}


