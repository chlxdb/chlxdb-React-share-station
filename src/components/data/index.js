import React, { Component } from 'react'
import { Row, Col, Card } from 'antd';
import * as echarts from 'echarts';
//把你在echar中编辑好的文件放在这个声明的对象中；
import axios from 'axios'
// import Axios from 'axios'

export default class Data extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: sessionStorage.getItem('token'),
            options: [],
            passages: '',
            user: "",
            halllist: "",
            comment1: '',
            comment2: '',
            comment3: '',
            time1: "",
            time2: "",
            time3: "",

        }
    }
    componentDidMount() {
        const token = sessionStorage.getItem('token')
        let passages = 0
        let comments = 0
        let comments2 = 47
        let users = 0
        let reason = 0
        let title1 = 0
        let title2 = 0
        let title3 = 0
        let commentaccount1 = 0
        let commentaccount2 = 0
        let commentaccount3 = 0

        axios({
            method: 'get',
            url: 'http://121.4.187.232:8080/passage/queryAllPassage',
            params: {
                pageNo: 1,
                pageSize: 1000000
            },
            headers: {
                token: token
            }
        })

            .then(
                response => {
                    passages = response.data.passageItemCount
                    axios({
                        method: 'get',
                        url: "http://121.4.187.232:8080/hallComment/queryAllHallComment",
                        params: {
                            pageNo: 1,
                            pageSize: 1000000
                        },
                        headers: {
                            token: this.state.token
                        }
                    })
                        .then(
                            response => {
                                comments = response.data.length
                                const a = response.data[0]
                                const b = response.data[1]
                                const c = response.data[2]
                                this.setState({ comment1: a.content })
                                this.setState({ comment2: b.content })
                                this.setState({ comment3: c.content })
                                this.setState({ time1: a.time })
                                this.setState({ time2: b.time })
                                this.setState({ time3: c.time })
                                axios({
                                    method: 'post',
                                    url: "http://121.4.187.232:8082/admin/queryAllUser",
                                    params: {
                                        pageNo: 1,
                                        pageSize: 1000000
                                    },
                                    headers: {
                                        token: this.state.token
                                    }
                                }).then(

                                    response => {
                                        users = response.data[0].length
                                        axios({
                                            method: 'post',
                                            url: "http://121.4.187.232:8082/admin/queryTotalFileCount",
                                            headers: {
                                                token: this.state.token
                                            }
                                        }).then(
                                            response => {
                                                reason = response.data
                                                console.log(response.data)


                                                var myChart = echarts.init(document.getElementById('main'));

                                                var option1 = {
                                                    tooltip: {
                                                        trigger: 'item'
                                                    },
                                                    legend: {
                                                        top: '5%',
                                                        left: 'center'
                                                    },
                                                    series: [
                                                        {
                                                            name: '详情',
                                                            type: 'pie',
                                                            radius: ['40%', '70%'],
                                                            avoidLabelOverlap: false,
                                                            itemStyle: {
                                                                borderRadius: 10,
                                                                borderColor: '#fff',
                                                                borderWidth: 2
                                                            },
                                                            label: {
                                                                show: false,
                                                                position: 'center'
                                                            },
                                                            emphasis: {
                                                                label: {
                                                                    show: true,
                                                                    fontSize: '40',
                                                                    fontWeight: 'bold'
                                                                }
                                                            },
                                                            labelLine: {
                                                                show: false
                                                            },
                                                            data: [
                                                                { value: passages, name: '文章总数' },
                                                                { value: users, name: '用户总数' },
                                                                { value: comments, name: '留言总数' },
                                                                { value: reason, name: '资源总数' },
                                                                { value: comments2, name: '评论总数' },

                                                            ]
                                                        }
                                                    ]
                                                };

                                                myChart.setOption(option1);


                                            }
                                        )
                                    },
                                )
                            }
                        )


                })

        axios({
            method: 'post',
            url: 'http://121.4.187.232:8082/admin/queryPassageByCommentCount',

            headers: {
                token: token
            }
        })

            .then(
                response => {
                    var myChart2 = echarts.init(document.getElementById('main2'));
                    console.log(response.data.passageItem)
                    title1 = response.data.passageItem[0][0].title
                    title2 = response.data.passageItem[1][0].title
                    title3 = response.data.passageItem[2][0].title
                    commentaccount1 = response.data.passageItem[0][1]
                    commentaccount2 = response.data.passageItem[1][1]
                    commentaccount3 = response.data.passageItem[2][2]


                    var option2 = {
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: [
                            {
                                type: 'category',
                                data: [title1, title2, title3],
                                axisTick: {
                                    alignWithLabel: true
                                }
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value'
                            }
                        ],
                        series: [
                            {
                                name: '评论次数:',
                                type: 'bar',
                                barWidth: '80%',
                                data: [commentaccount1, commentaccount2, commentaccount3,]
                            }
                        ]
                    };
                    myChart2.setOption(option2);
                })

    }



    render() {
        return (
            <div >
                <div style={{ fontSize: 32, textAlign: 'center', marginRight: 200 }}>数据详情:</div>
                <br></br>

                <Row style={{}}>


                    <Col span={7} >
                        <p style={{ fontSize: 25 }}>各部分比例:</p>
                        <div id="main" style={{ width: '80%', height: '400px' }}>
                        </div>
                    </Col>
                    <Col span={8} style={{ marginTop: "5%", }}>
                        <Card title="最新留言:" bordered={false} style={{ width: 300, backgroundColor: '#f4f6f7', }}>
                            <span style={{
                                color: 'red', fontSize: 18, width: '250px',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                display: 'inline-block',
                            }}>{this.state.comment1}</span><br></br>
                            <span >{this.state.time1}</span><br></br>
                            <span style={{
                                color: 'red', fontSize: 18, width: '250px',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                display: 'inline-block',
                            }}>{this.state.comment2}</span><br></br>
                            <span>{this.state.time2}</span><br></br>
                            <span style={{
                                color: 'red', fontSize: 18, width: '250px',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                display: 'inline-block',
                            }}>{this.state.comment3}</span><br></br><span>{this.state.time3}</span>
                        </Card>
                    </Col>
                    <Col span={7} >
                        <p style={{ fontSize: 25 }}>评论次数前三篇:</p>
                        <div id="main2" style={{ width: '80%', height: '400px' }}></div>
                    </Col>

                </Row>

            </div >
        )
    }
}
