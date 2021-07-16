import React, { Component } from 'react'
import { Table, Button } from 'antd';
import { Modal } from 'antd';
import { Input, Form, message } from 'antd';
// import { Link } from 'react-router-dom'

// import { Button } from 'antd';
// import { Pagination, Radio } from 'antd';
// import { Row, Col } from 'antd';
import axios from 'axios'


const columns = [
    {
        title: '标题',
        dataIndex: 'title',
    },
    {
        title: '内容',
        dataIndex: 'content',
    },
    {
        title: '操作',
        render: () => <span>查看详情</span>
    }


];

const tailLayout = {
    // wrapperCol: { offset: 0, span: 10 },
};
const onFinishFailed = errorInfo => {//错误的提示
    console.log('Failed:', errorInfo);
};


export default class Reason extends Component {

    constructor(props) {
        super(props)
        this.state = {
            passages: [],
            data: [],
            visible: false,
            token: sessionStorage.getItem("token"),
            title: "",
            content: "",
            id: ""

        }

    }


    componentDidMount() {
        this.setState({ token: sessionStorage.getItem("token") })
        this.getall()
    }
    getall = () => {
        axios.get('http://121.4.187.232:8080/passage/queryAllPassage', {
            params: {
                pageNo: 1,
                pageSize: 1000000
            }
        })
            .then(
                response => {
                    this.setState({ passages: response.data.passageItem })
                })

    }

    state = {
        selectedRowKeys: [], // Check here to configure the default column
    };

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };



    remove = () => {

        for (let i = 0; i < this.state.selectedRowKeys.length; i++) {
            axios({
                method: 'post',
                url: "http://121.4.187.232:8080/admin/deletePassage",
                params: {
                    passageID: this.state.selectedRowKeys[i],
                },
                headers: {
                    token: this.state.token
                }

            }).then(
                response => {
                    
                    this.getall()
                })
        }
    }

    sent = () => {
        axios({
            method: 'post',
            url: "http://121.4.187.232:8080/admin/createPassage",
            params: {
                title: this.state.title,
                content: this.state.content
            },
            headers: {
                token: this.state.token
            }
        }).then(
            response => {
                return (
                    console.log(response),
                    message.success("发布成功"),
                    this.setState({ visible: false }),
                    this.getall()
                )

            })

    }


    showModal = () => {
        this.setState({
            visible: true,
            value: '',

        });
    };


    onFinish = values => {//成功的提示
        console.log('Success:', values);
        this.setState({
            title: values.title,
        })
        this.setState({
            content: values.content
        })

        this.sent()

    };
    handleCancel = () => {
        this.setState({ visible: false });
    };

    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const { visible } = this.state;
        return (
            <div>
                <>
                    <Button type="primary" onClick={this.showModal}>
                        发表新文章
                    </Button>
                    <Modal
                        destroyOnClose
                        visible={visible}
                        title="Title"
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
                            onFinish={this.onFinish}
                            onFinishFailed={onFinishFailed}

                        >
                            <Form.Item
                                label="标题"
                                name="title"
                                rules={[

                                    {
                                        pattern: /^[^\s]*$/,
                                        message: '禁止输入空格',
                                    }

                                ]}

                            >
                                <Input />
                            </Form.Item>
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
                            <Form.Item {...tailLayout}>

                                <Button key="submit" htmlType="submit" >
                                    发表
                                </Button>,

                            </Form.Item>
                        </Form>
                    </Modal>
                </>


                <Table
                    onRow={record => {
                        return {
                            onClick: event => {
                                this.props.history.push(`/manage/reson_detail/${record.id}`)
                                this.setState({ id: record.id })
                              
                            }, // 点击行
                        };
                    }} pagination={{ pageSize: 7 }} scroll={{ y: 500 }} rowSelection={rowSelection} columns={columns} dataSource={this.state.passages} rowKey={record => record.id} />

                < Button type="primary" onClick={this.remove} > 删除所选</Button>
            </div>
        );
    }
}