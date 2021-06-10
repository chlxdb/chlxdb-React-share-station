import React, { Component } from 'react'


const data = [
    { id: '01', content: 'ni hao' },
    { id: '02', content: 'chl' },
    { id: '03', content: 'tian' },
]
export default class Detile extends Component {
    render() {

        // 通过params传参
        const { id, title } = this.props.match.params

        //  // 接收search参数
        //  const { search } = this.props.location
        //  const { id, title } = qs.parse((search.slice(1)))



        // 接收state参数

        //  const { id, title } = this.props.location.state || {}
        //  const findResult = data.find((dataobj) => {
        //      return dataobj.id === id
        //  }) || {}

        const findResult = data.find((dataobj) => {
            return dataobj.id === id
        })
        return (

            <ul>
                <li>ID:{id}</li>
                <li>TITLE:{title}</li>
                <li>CONTENT:{findResult.content}</li>
            </ul>
        )
    }
}
