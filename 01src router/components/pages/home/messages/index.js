import React, { Component } from 'react'
import Detile from './detile'
import { Link, Route } from 'react-router-dom'
export default class Messages extends Component {
    state = {
        messageArr: [

            { id: '01', title: '消息1' },
            { id: '02', title: '消息2' },
            { id: '03', title: '消息3' },
        ]
    }
    render() {
        const { messageArr } = this.state

        return (
            <div>
                <ul>
                    {


                        messageArr.map((msgobj) => {
                            return (
                                <li key={msgobj.id}>
                                    {/* // 向路由组件传递search参数
                        // < Link to={`/home/messages/detile/?id=${msgobj.id}&title=${msgobj.title}`}></Link> */}

                                    {/* 向路由组件传递state参数
                            
                                    < Link to={{ pathname: '/home/messages/detile', state: { id: msgobj.id, title: msgobj.title } }}> */}



                                    < Link to={`/home/messages/detile/${msgobj.id}/${msgobj.title}`}>
                                        {msgobj.title}
                                    </ Link>
                                </li>
                            )
                        })}
                </ul>
                <hr />
                <Route path="/home/messages/detile/:id/:title" component={Detile}></Route>

                {/* search参数无需声明接收 正常注册路由 */}
                {/* <Route path="/home/messages/detile" component={Detile}></Route> */}
            </div>
        )
    }
}
