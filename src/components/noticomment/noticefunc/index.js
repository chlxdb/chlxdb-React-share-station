import React, { Component } from 'react'

import { Button } from 'antd';
import { Modal } from 'antd';
import { Input, Form, message } from 'antd';
import axios from 'axios'

const onFinishFailed = errorInfo => {//错误的提示
    console.log('Failed:', errorInfo);
};

export default class Noticefunc extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: sessionStorage.getItem("token"),
            content: '',
            visible: false,
        }
    }
    showModal = () => {
        this.setState({
            visible: true,
            value: '',
        });
    };
    handleCancel = () => {
        this.setState({ visible: false });
    };
    sentnotice = () => {
        axios({
            method: 'post',
            url: "http://121.4.187.232:8080/admin/updateNotice",
            params: {

                content: this.state.content
            },
            headers: {
                token: this.state.token
            }
        }).then(
            response => {
                return (
                    message.success("发表成功"),
                    this.setState({ visible: false })
                )
            })
    }
    onFinish = values => {//成功的提示

        if (values.content === undefined) {
            // console.log('Success:', values);
            // alert("不可以发表空白评论噢！！！")
        } else {
            this.setState({
                content: values.content
            })
            this.sentnotice()
        }
    };
    render() {
        const { visible } = this.state;
        return (
            <div style={{ display: 'inline' }}>
                <Button type="primary" onClick={this.showModal} >发表公告</Button>
                <>
                    <Modal
                        destroyOnClose
                        visible={visible}
                        title="新公告"
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="back" onClick={this.handleCancel}>
                                关闭
                            </Button>
                        ]}
                    >
                        <Form
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={this.onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label="内容"
                                name="content"
                                rules={[
                                    {
                                        pattern: /^[^\s]*$/,
                                        message: '禁止输入空格',
                                    }

                                ]}
                            >
                                <Input.TextArea />
                            </Form.Item>
                            <Form.Item >
                                <Button key="submit" htmlType="submit" >
                                    发表
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </>
            </div>
        )
    }
}
