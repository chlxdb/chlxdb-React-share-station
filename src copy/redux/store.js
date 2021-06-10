// 该文件用于暴露一个store对象，整个应用只有一个store对象


//异步加载的引入
import { createStore, applyMiddleware } from 'redux'
import countReducer from './count_reducer'
import thunk from 'redux-thunk'
export default createStore(countReducer, applyMiddleware(thunk))