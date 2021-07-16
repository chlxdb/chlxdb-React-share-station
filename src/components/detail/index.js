import React, { Component } from 'react'
import { Row, Col, Input, message, Card, Image, } from 'antd';
import axios from 'axios'
import Axios from 'axios'



export default class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: sessionStorage.getItem('token1'),
            userid: sessionStorage.getItem('userid'),
            comment: '',
            passage: '',
            commentlist: [],
            img: [],
            file: [],
        }

    }

    componentDidMount() {
        this.getallcomment()
    }
    getallcomment = () => {
        const { id } = this.props.match.params
        axios.get('http://121.4.187.232:8080/passage/passageResources', {
            params: {
                passageID: id
            }
        })
            .then(
                response => {
                    this.setState({ file: response.data[1] })
                    this.setState({ img: response.data[2] })
                    this.setState({ passage: response.data[0] })
                    this.setState({ commentlist: response.data[3] })
                    console.log(response.data)
                },
            )
    }
    sentcomment = () => {
        const { id } = this.props.match.params
        if (this.state.token) {
            axios({
                method: 'post',
                url: "http://121.4.187.232:8082/comment/createComment",
                params: {
                    content: this.state.comment,
                    passageID: id,
                    userID: this.state.userid
                },
                headers: {
                    token: this.state.token
                }
            }).then(
                response => {
                    return (
                        message.success("发表成功"),
                        this.getallcomment()
                    )

                })
        }
        else {

            alert("请先登录后再发表评论")


        }

    }

    handleChange = (event) => {

        if (event.target.value.trim() === "") {
            alert("不可以发表空白评论噢！！！")
        } else {
            this.setState({ comment: event.target.value }, () => this.sentcomment())
        }
    };

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
    render() {

        return (
            <div style={{ marginLeft: 100, marginRight: 100 }}>


                <Row justify="space-around"  >

                    <Col style={{ backgroundColor: '#adc6ff' }} span={17} >

                        {
                            Object.keys(this.state.img).map((v, id) => {

                                return (

                                    <Image
                                        key={id}
                                        style={{ width: '100%', height: 300 }}
                                        alt="example"
                                        src={`data:image/png;base64,${this.state.img[v]}`}
                                    />

                                )
                            })

                        }
                        <h1 style={{ textAlign: 'center' }}>
                            {this.state.passage.title}
                        </h1>
                        <p style={{ textAlign: 'center' }}> {this.state.passage.content}</p>
                        <br></br><br></br>
                        <Card title="资源下载区：" bordered={false} style={{ backgroundColor: '#adc6ff' }} >
                            {this.state.file.map((element, id) => {
                                return (
                                    <div key={id}>
                                        {element.address}
                                        <a type="primary" href='xxx' onClick={() => this.downLoad(id)}>下载</a>
                                        <br></br>
                                    </div>
                                )
                            })}
                        </Card>
                    </Col>
                    <Col span={5} style={{ backgroundColor: '#adc6ff', color: 'block', height: 650, overflow: 'scroll' }}>
                        <Card title="评论区：" bordered={false} style={{ backgroundColor: '#adc6ff', }} >
                            <p><Input placeholder="发表评论,按回车键确认" maxLength={30} onPressEnter={this.handleChange} /></p>
                        </Card>
                        {
                            this.state.commentlist.map((element, commentID) => {
                                return (
                                    <div key={commentID} style={{ marginLeft: 20 }}>

                                        <br></br>
                                        <p>用户名：<span style={{ fontSize: 16 }}> {element.username}</span></p>
                                        <p>
                                            评论： <span style={{ fontSize: 16 }}> {element.content}</span>
                                        </p>
                                        <p><span style={{ fontSize: 5 }}>{element.time}</span></p>
                                        <hr></hr>
                                    </div>
                                )
                            })
                        }


                    </Col>

                </Row>

            </ div >


        )
    }
}
