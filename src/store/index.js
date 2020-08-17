import { createStore, applyMiddleware, compose } from 'redux';
//applyMiddleware:中间件
import thunk from 'redux-thunk';
import reducer from './reducer';

//打开谷歌调试工具
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(
  //合并多个中间件
  applyMiddleware(thunk)
));

export default store;