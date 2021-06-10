// 该文件专门为count组件生成action对象

import {INCREMENT,DECREMENT} from './constent'

export const createIncrementAction = data => ({ type: INCREMENT, data })
export const createDecrementAction = data => ({ type: DECREMENT, data })