import React, { Component } from 'react'
// import { Tabs } from 'antd';
import { Table, Button, message } from 'antd';
import { Modal } from 'antd';
import { Input, Form } from 'antd';
import axios from 'axios'
import Noticefunc from './noticefunc';




const onFinishFailed = errorInfo => {//错误的提示
    console.log('Failed:', errorInfo);
};


const columns = [

    {
        title: '内容',
        dataIndex: 'content',
    },
    {
        title: '时间',
        dataIndex: 'time',
    },
];

export default class Noticomment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: sessionStorage.getItem("token"),
            commentlist: [],
            content: '',
            visible: false,
        }

    }

    componentDidMount = () => {
        this.getallcomment()
    }
    getallcomment = () => {

        axios({
            method: 'get',
            url: "http://121.4.187.232:8080/hallComment/queryAllHallComment",


        }).then(
            response => {
                // console.log(response.data)
                this.setState({ commentlist: response.data })

            })
    }

    remove = () => {

        for (let i = 0; i < this.state.selectedRowKeys.length; i++) {
            axios({
                method: 'post',
                url: "http://121.4.187.232:8080/admin/deleteHallComment",
                params: {
                    ID: this.state.selectedRowKeys[i],
                },
                headers: {
                    token: this.state.token
                }

            }).then(
                response => {
                    console.log(response.data)
                    this.getallcomment()
                })
        }
    }

    sentcomment = () => {
        axios({
            method: 'post',
            url: "http://121.4.187.232:8080/hallComment/createHallComment",
            params: {

                content: this.state.content
            },
            headers: {
                token: this.state.token
            }
        }).then(
            response => {
                return (
                    console.log(response.data),
                    message.success("发表成功"),
                    this.setState({ visible: false }),
                    this.getallcomment()
                )

            })

    }

    onFinish = values => {//成功的提示
        console.log('Success:', values);
        this.setState({
            content: values.content
        })
        this.sentcomment()

    };
    showModal = () => {
        this.setState({
            visible: true,
            value: '',

        });
    };
    handleCancel = () => {
        this.setState({ visible: false });
    };

    state = {
        selectedRowKeys: [], // Check here to configure the default column
    };
    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    render() {
        const { visible } = this.state;
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>发表留言</Button>&nbsp;&nbsp;&nbsp;
                <Noticefunc></Noticefunc>
                <Table pagination={{ pageSize: 8 }} scroll={{ y: 500 }} rowSelection={rowSelection} columns={columns} dataSource={this.state.commentlist} rowKey={record => record.id} />
                < Button type="primary" onClick={this.remove} > 删除所选</Button>
                <>
                    <Modal
                        visible={visible}
                        title="新留言"
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        destroyOnClose
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
                            <Form.Item>
                                <Button key="submit" htmlType="submit" >
                                    发表
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </>
            </div >
        )
    }
}

