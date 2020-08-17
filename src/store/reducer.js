// combineReducers:合成reducer,因为可能有多个reducer

// 类似:immutable,深拷贝
import { combineReducers } from 'redux-immutable';


//怕命名冲突，as是重命名
import { reducer as recommendReducer } from '../pages/discover/c-pages/recommend/store';
import { reducer as playerReducer } from '../pages/player/store';

const cReducer = combineReducers({
  recommend: recommendReducer,
  player: playerReducer
});

export default cReducer;