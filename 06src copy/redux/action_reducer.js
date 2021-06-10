// 该文件专门为count组件生成action对象

import { INCREMENT, DECREMENT } from './constent'
import store from './store'
//同步action
export const createIncrementAction = data => ({ type: INCREMENT, data })
export const createDecrementAction = data => ({ type: DECREMENT, data })

//异步action
export const createIncrementAsyncAction = (data, time) => {
    return () => {
        setTimeout(() => {
            store.dispatch(createIncrementAction(data))
        }, time)
    }
}