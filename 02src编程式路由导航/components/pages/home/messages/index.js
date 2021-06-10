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



    replaceshow = (id, title) => {
        //params
        this.props.history.replace(`/home/messages/detile/${id}/${title}`)
        //search
        // this.props.history.replace(`/home/messages/detile?id=/${id}&title=${title}`)
        //date
        // this.props.history.replace('/home/messages/detile', { id, title })
    }

    pushshow = (id, title) => {
        //params
        this.props.history.push(`/home/messages/detile/${id}/${title}`)
        //search
        // this.props.history.push(`/home/messages/detile?id=/${id}&title=${title}`)
        //date
        // this.props.history.push('/home/messages/detile', { id, title })
        // //相应接收参数的组件也要改变接收的方式
    }
    back = () => {
        this.props.history.goBack()
    }
    goforward = () => {
        this.props.history.goForward()
    }
    go = () => {
        this.props.history.go(2)
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

                                    {/* 向路由组件传递search参数
                         < Link to={`/home/messages/detile/?id=${msgobj.id}&title=${msgobj.title}`}></Link> */}

                                    {/* 向路由组件传递state参数
                            
                                    < Link to={{ pathname: '/home/messages/detile', state: { id: msgobj.id, title: msgobj.title } }}> */}


                                    < Link to={`/home/messages/detile/${msgobj.id}/${msgobj.title}`}>
                                        {msgobj.title}
                                    </ Link>&npsp;
                                    <button onClick={() => this.pushshow(msgobj.id, msgobj.title)}>push</button>
                                    <button onClick={() => this.replaceshow(msgobj.id, msgobj.title)}>replace</button>
                                </li>
                            )
                        })}
                </ul>
                <hr />
                {/* state参数无需声明接收 正常注册路由 
                <Route path="/home/messages/detile/:id/:title" component={Detile}></Route> */}

                <Route path="/home/messages/detile/:id/:title" component={Detile}></Route>
                <button onClick={this.back}>前进</button>&nbsp;
                <button onClick={this.goforward}>后退</button>
                <button onClick={this.go}>go</button>
            </div>
        )
    }
}
