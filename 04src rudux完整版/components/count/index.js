import React, { Component } from 'react'
//引入store
import store from '../../redux/store'
//引入actioncreat
import { createIncrementAction, createDecrementAction } from '../../redux/action_reducer'

export default class Count extends Component {
    state = { carname: "bengchi" }
    // componentDidMount() {
    //     // 检测redux中状态的变化，变化就调用render
    //     store.subscribe(() => {
    //         this.setState({})

    //     })
    // }
    increat = () => {
        const { value } = this.selectnumber
        // 通知redux加value
        // store.dispatch({ type: 'increment', data: value * 1 })
        store.dispatch(createIncrementAction(value * 1))


        // this.setState({ count: count + value * 1 })
    }
    decreat = () => {
        const { value } = this.selectnumber
        // store.dispatch({ type: 'decrement', data: value * 1 })
        store.dispatch(createDecrementAction(value * 1))
        // const { count } = this.state
        // this.setState({ count: count - value * 1 })
    }
    increatifodd = () => {
        const { value } = this.selectnumber
        // const { count } = this.state
        const count = store.getState()
        if (count % 2 !== 0) {
            // store.dispatch({ type: 'increment', data: value * 1 })
            // this.setState({ count: count + value * 1 })
            store.dispatch(createIncrementAction(value * 1))
        }

    }
    increatasnc = () => {
        const { value } = this.selectnumber

        // const { count } = this.state
        setTimeout(() => {
            // store.dispatch({ type: 'increment', data: value * 1 })
            store.dispatch(createIncrementAction(value * 1))
            // this.setState({ count: count + value * 1 })
        }, 500)
    }
    render() {
        return (
            <div>
                <h1>当前求和为：{store.getState()}</h1>
                <select ref={c => this.selectnumber = c}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>&nbsp;
                <button onClick={this.increat}>+</button>&nbsp;
                <button onClick={this.decreat}>-</button>&nbsp;
                <button onClick={this.increatifodd}>当前求和为奇数时加</button>&nbsp;
                <button onClick={this.increatasnc}>异步加</button>&nbsp;
            </div>
        )
    }
}
