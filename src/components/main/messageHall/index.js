import React, { Component } from 'react'
import axios from 'axios'
import { Input, message } from 'antd';

export default class Messagehall extends Component {
    constructor(props) {
        super(props)
        this.state = {
            halllist: [],
            content: ''
        }
    }
    componentDidMount() {
        this.getall()
    }
    getall = () => {
        axios.get('http://121.4.187.232:8080/hallComment/queryAllHallComment').then(
            response => {
                // console.log(response.data)
                this.setState({ halllist: response.data })
            },
        )
    }

    handleChange = (event) => {

        if (event.target.value.trim() === "") {
            alert("不可以发表空白评论噢！！！")
        } else {
            this.setState({ content: event.target.value }, () => this.sentcomment())
        }
    };
    sentcomment = () => {
        axios({
            method: 'post',
            url: "http://121.4.187.232:8080/hallComment/createHallComment",
            params: {
                content: this.state.content
            },
        }).then(
            response => {
                console.log(response)
                message.success("ok")
                this.getall()
            })
    }
    render() {
        return (
            <div >
                <Input placeholder="发表评论,按回车键确认" maxLength={30} onPressEnter={this.handleChange} />
                {
                    this.state.halllist.map((element, id) => {
                        return (
                            <div key={id}>
                                <br></br>
                                <p >留言：<span style={{ fontSize: 16 }}>{element.content}</span>
                                </p>
                                <p><span style={{ fontSize: 5 }} > {element.time} </span></p><hr></hr>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
