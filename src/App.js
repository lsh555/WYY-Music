import React, { memo,Suspense } from 'react'
//共享redux
import { Provider } from 'react-redux';

// 可以将路由划分到一个文件里面
import {renderRoutes} from 'react-router-config'
import { HashRouter } from 'react-router-dom';
import routes from './router'
import store from './store';

import LSHAppHeader from '@/components/app-header'
import LSHAppFooter from '@/components/app-footer'

import HYAppPlayerBar from './pages/player/app-player-bar';

export default memo(function App() {
  return (
    <Provider store={store}>
    <HashRouter>
      <LSHAppHeader/>
      <Suspense fallback={<div>page loading</div>}>
      {renderRoutes(routes)}
      </Suspense>
      <LSHAppFooter/>
      <HYAppPlayerBar/>
    </HashRouter>
    </Provider>
  )
})
