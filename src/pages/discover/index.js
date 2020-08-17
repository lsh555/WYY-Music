import React, { memo } from 'react';
//子路由渲染
import { renderRoutes } from 'react-router-config';

import { dicoverMenu } from "@/common/local-data";

import { NavLink } from 'react-router-dom';

import {
  DiscoverWrapper,
  TopMenu
} from './style';

export default memo(function LSHDiscover(props) {
  // 子路由渲染
  const { route } = props;

  return (
    <DiscoverWrapper>
       <div className="top">
        <TopMenu className="wrap-v1">
          {
            dicoverMenu.map((item, index) => {
              return (
                <div className="item" key={item.title}>
                  <NavLink to={item.link}>{item.title}</NavLink>
                </div>
              )
            })
          }
        </TopMenu>
      </div>
      {renderRoutes(route.routes)}
    </DiscoverWrapper>
  )
})

