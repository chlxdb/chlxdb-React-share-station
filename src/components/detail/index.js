import React, { Component } from 'react'
import { Row, Col, Carousel, Input } from 'antd';
import axios from 'axios'

import { Avatar } from 'antd';


const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};


export default class Detail extends Component {

    constructor(props) {
        super(props)

        this.state = {
            passage: '',
            commentlist: [],


        }

    }

    componentDidMount() {
        const { id } = this.props.match.params
        axios.get('http://121.4.187.232:8080/passage/passageResources', {
            params: {
                passageID: id
            }
        })
            .then(
                response => {
                    console.log(response.data, 111)
                    this.setState({ passage: response.data[0] })
                    this.setState({ commentlist: response.data[3] })

                },
            )
    }
    onPressEnter = (e) => {
        if (e.target.value.trim() === "") {
            alert("do not black")
        } else { console.log('onPressEnter:', e.target.value); }
    };

    render() {

        return (
            <div style={{ textAlign: 'center', marginLeft: 100, marginRight: 100 }}>


                <Row justify="space-around" >

                    <Col style={{ backgroundColor: '#707b84' }} span={17} >
                        <Carousel autoplay>
                            <div>
                                <h3 style={contentStyle}>1</h3>
                            </div>
                            <div>
                                <h3 style={contentStyle}>2</h3>
                            </div>
                            <div>
                                <h3 style={contentStyle}>3</h3>
                            </div>
                            <div>
                                <h3 style={contentStyle}>4</h3>
                            </div>
                        </Carousel>,
                        <h1>
                            {this.state.passage.title}
                        </h1>
                        <p> {this.state.passage.content}</p>
                    </Col>

                    <Col span={5} style={{ backgroundColor: '#707b84', color: '#fff', height: 650, overflow: 'scroll' }}>
                        <h1 style={{ color: '#fff' }}>评论区</h1>

                        <Input placeholder="发表评论,按回车键确认" maxLength={30} onPressEnter={this.onPressEnter} />
                        <br></br>
                        <hr></hr>
                        <br></br>
                        {
                            this.state.commentlist.map((element, commentID) => {
                                return (
                                    <div key={commentID} style={{}}>
                                        <Avatar
                                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                            alt="Han Solo"

                                        />{element.username}<span>{element.time}</span>
                                        <p >
                                            {element.content}
                                        </p>
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
