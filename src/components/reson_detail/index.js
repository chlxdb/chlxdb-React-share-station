import React, { Component } from 'react'
import { Tabs, } from 'antd';
import { Table, Button, Image, Col, Row } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
import { Input, Form, message } from 'antd';

import Axios from 'axios'
import axios from 'axios'

const { TabPane } = Tabs;

const columns = [
    {
        title: '用户',
        dataIndex: 'username',
    },
    {
        title: '评论',
        dataIndex: 'content',
    },
    {
        title: '时间',
        dataIndex: 'time',
    },
];


const onFinishFailed = errorInfo => {//错误的提示
    console.log('Failed:', errorInfo);
};
export default class Reasondetail extends Component {
    constructor(props) {
        super(props)
        const { id } = this.props.match.params
        sessionStorage.setItem('ID', id)
        this.state = {
            token: "",
            id: id,
            commentlist: [],
            visible: false,
            commentcontent: "",
            title: '',
            content: '',
            file: [],
            file1: [],
            img: [],
        }
    }
    componentDidMount() {
        this.setState({ token: sessionStorage.getItem("token") })
        this.getall()
        this.getcomment()
    }
    getall = () => {
        axios({
            method: 'get',
            url: "http://121.4.187.232:8080/passage/passageResources",
            params: {
                passageID: this.state.id
            },
        }).then(
            response => {
                this.setState({ file: response.data[1] })
                this.setState({ title: response.data[0].title })
                this.setState({ content: response.data[0].content })
                this.setState({ img: response.data[2] })

            })
    }
    remove1 = () => {
        for (let i = 0; i < this.state.selectedRowKeys.length; i++) {
            axios({
                method: 'post',
                url: "http://121.4.187.232:8080/admin/deleteComment",
                params: {
                    commentID: this.state.selectedRowKeys[i]
                },
                headers: {
                    token: this.state.token
                }
            }).then(
                response => {
                    console.log(response.data)
                    this.getcomment()
                })
        }
    }
    sentcomment = () => {
        axios({
            method: 'post',
            url: "http://121.4.187.232:8080/admin/createComment",
            params: {
                content: this.state.commentcontent,
                passageID: this.state.id,
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
                    this.getcomment()
                )
            })
    }
    date = () => {
        axios({
            method: 'post',
            url: "http://121.4.187.232:8080/admin/updatePassage",
            params: {
                content: this.state.content,
                passageID: this.state.id,
                title: this.state.title
            },
            headers: {
                token: this.state.token
            }
        }).then(
            response => {
                console.log(response)
                if (response.data === "updatePassage is ok!")
                    message.success("修改成功")
            })
    }
    getcomment = () => {
        axios({
            method: 'get',
            url: "http://121.4.187.232:8080/passage/queryCommentByPassageID",
            params: {
                passageID: this.state.id
            },
        }).then(
            response => {
                this.setState({ commentlist: response.data })
            })
    }
    state = {
        selectedRowKeys: [], // Check here to configure the default column
    };
    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    callback = (key) => {
        console.log(key);
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
        this.date()

    };
    uploadFile = () => {
        let file = document.querySelector('#input').files[0]
        let formdata = new FormData()
        formdata.append("file", file)
        formdata.append("passageID", this.state.id)
        Axios({
            url: 'http://121.4.187.232:8080/admin/uploadResources',
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
                token: this.state.token,
            },
            data: formdata
        }).then(
            request => {
                this.getall()

                if (request.data.length === 0) {
                    message.error("上传失败，不能为空")
                }
                else {
                    message.success("成功上传")
                }

            },
            error => {
                console.log(error.data)
            }
        )
    }
    uploadFile1 = () => {
        let file = document.querySelector('#input1').files[0]
        let formdata = new FormData()
        formdata.append("file", file)
        formdata.append("passageID", this.state.id)
        Axios({
            url: 'http://121.4.187.232:8082/admin/uploadImg',
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
                token: this.state.token,
            },
            data: formdata
        }).then(
            request => {
                this.getall()
                if (request.data.length === 0) {
                    message.error("上传失败，不能为空")
                }
                else {
                    message.success("成功上传")
                }

            },
            error => {
                console.log(error.data)
            }
        )
    }
    downLoad = (id) => {
        // alert(this.state.file[id].address)
        Axios(
            {
                method: 'post',
                url: `http://121.4.187.232:8082/passage/downResources?filePath=${this.state.file[id].address}`,
                // data: { filePath: this.state.file[id].address },
                responseType: 'blob',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        ).then(
            res => {
                res = res.data;
                let blob = new Blob([res], { type: res.type });
                let downloadElement = document.createElement("a");
                let href = window.URL.createObjectURL(blob);
                downloadElement.href = href;
                downloadElement.download = this.state.file[id].address;
                document.body.appendChild(downloadElement);
                downloadElement.click();
                document.body.removeChild(downloadElement);
                window.URL.revokeObjectURL(href);
            },
            error => {
                console.log(error.data)
            }
        )
    }

    remove = (id) => {

        axios({
            method: 'post',
            url: "  http://121.4.187.232:8080/admin/deleteResources",
            params: {
                resourcesID: id
            },
            headers: {
                token: this.state.token
            }
        }).then(
            response => {
                console.log(response)
                message.success("删除成功")
                this.getall()
            })
    }
    delete = (id) => {
        axios({
            url: "http://121.4.187.232:8082/admin/deleteImg",
            method: 'post',
            params: {
                imgID: id
            },
            headers: {
                token: this.state.token
            }
        }).then(
            response => {

                console.log(response)
                message.success("删除成功")
                this.getall()
            })



    }
    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };


        return (
            <div>
                <Tabs defaultActiveKey="1" onChange={this.callback}>
                    <TabPane tab="评论" key="1">
                        <Table pagination={{ pageSize: 7 }} scroll={{ y: 500 }} rowSelection={rowSelection} columns={columns} dataSource={this.state.commentlist} rowKey={record => record.commentID} />
                        < Button type="primary" onClick={this.remove1} > 删除所选</Button> &nbsp;
                        &nbsp;
                    </TabPane>
                    <TabPane tab="修改文章" key="2">
                        <Form
                            name="basic"
                            onFinish={this.onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label="标题"
                                name="title"
                                initialValue={this.state.title}

                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="内容"
                                name="content"
                                initialValue={this.state.content}
                            >
                                <Input.TextArea />
                            </Form.Item>
                            <Form.Item >
                                <Button type="primary" key="submit" htmlType="submit" >
                                    修改
                                </Button>
                            </Form.Item>
                        </Form>
                    </TabPane>
                    <TabPane tab="资源" key="3">
                        <Row>
                            <Col span={12}>
                                <input type="file" id="input" ></input>
                                <Button onClick={this.uploadFile}>上传资源文件</Button>
                                {
                                    this.state.file.map((element, id) => {
                                        return (
                                            <div key={id}>
                                                <br></br>
                                                {element.address}
                                                <Button onClick={() => this.downLoad(id)}>下载查看</Button>
                                                &nbsp;
                                                <Button onClick={() => this.remove(element.id)}>删除</Button>
                                                <br></br>
                                            </div>
                                        )
                                    })
                                }
                            </Col>

                            <Col span={12}>
                                <input type="file" id="input1" ></input>
                                <Button onClick={this.uploadFile1}>上传资源图片</Button>


                                {/* {Object.keys(obj).map((v,i)=>{
           //加上kye={i}，控制台就不会报错
                return <p key={i}>遍历的属性是：{v}----------遍历的值：{obj[v]}</p>
            })
          } */}
                                <Row gutter={32}>
                                    {

                                        Object.keys(this.state.img).map((v, id) => {

                                            return (
                                                <Col span={7} key={id} >
                                                    <br></br>
                                                    <Image
                                                        alt="example"
                                                        src={`data:image/png;base64,${this.state.img[v]}`}

                                                    />
                                                    <Button onClick={() => this.delete(v)} > 删除图片</Button>


                                                </Col>


                                            )
                                        })

                                    }
                                </Row>
                            </Col>
                        </Row>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
