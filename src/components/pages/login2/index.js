

import React, { Component } from 'react'
import { Row, Col } from 'antd';
import { Form, Input, Button, Checkbox, Tabs } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;


export default class Login2 extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }
    LoginPass() {//验证并成功跳转
        console.log('验证中。。。', this.state.name, this.state.password)

        this.props.history.push('/manage')

    }

    onFinish = (values) => {
        console.log('Success:', values);
        this.LoginPass()

    };
    callback = (key) => {
        console.log(key);
    }


    render() {
        return (
            <div style={{ backgroundColor: "#adc6ff", height: "720px", }}>
                <Row justify="space-around" align="middle">
                    <Col span={10}>
                        <Tabs onChange={this.callback} type="card" style={{ width: '100%', marginTop: "150px ", backgroundColor: "white" }}>
                            <TabPane tab="用户登录" key=" 1">
                                <div style={{ margin: '25px' }}>

                                    <Form
                                        name="normal_login"
                                        className="login-form"
                                        initialValues={{
                                            remember: true,
                                        }}
                                        onFinish={this.onFinish}
                                    >
                                        <Form.Item
                                            name="username"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your Username!',
                                                },
                                            ]}
                                        >
                                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                                        </Form.Item>
                                        <Form.Item
                                            name="password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your Password!',
                                                },
                                            ]}
                                        >
                                            <Input
                                                prefix={<LockOutlined className="site-form-item-icon" />}
                                                type="password"
                                                placeholder="Password"
                                            />
                                        </Form.Item>
                                        <Form.Item>
                                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                                <Checkbox>Remember me</Checkbox>
                                            </Form.Item>

                                            {/* <a className="login-form-forgot" href="">
                                    Forgot password
                                </a> */}
                                        </Form.Item>

                                        <Form.Item>
                                            <Button type="primary" htmlType="submit" className="login-form-button">
                                                Log in
                                            </Button>

                                        </Form.Item>
                                    </Form>
                                </div>

                            </TabPane>




                            <TabPane tab="用户注册" key="2">
                                <div style={{ margin: '25px' }}>
                                    <Form
                                        name="register"
                                        onFinish={this.onFinish}
                                        scrollToFirstError
                                    >

                                        <Form.Item
                                            name="username"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your Username!',
                                                },
                                            ]}
                                        >
                                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                                        </Form.Item>
                                        <Form.Item
                                            name="password"

                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your password!',
                                                },
                                            ]}
                                            hasFeedback
                                        >
                                            <Input
                                                prefix={<LockOutlined className="site-form-item-icon" />}
                                                type="password"
                                                placeholder="Password"
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name="confirm"

                                            dependencies={['password']}
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please confirm your password!',
                                                },
                                                ({ getFieldValue }) => ({
                                                    validator(_, value) {
                                                        if (!value || getFieldValue('password') === value) {
                                                            return Promise.resolve();
                                                        }

                                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                                    },
                                                }),
                                            ]}
                                        >
                                            <Input
                                                prefix={<LockOutlined className="site-form-item-icon" />}
                                                type="password"
                                                placeholder="Confirm Password"
                                            />
                                        </Form.Item>
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit" className="login-form-button">
                                                register now!
                                            </Button>

                                        </Form.Item>
                                    </Form>

                                </div>
                            </TabPane>

                        </Tabs>,
                    </Col>

                </Row>


            </div >
        )
    }
}
