import React, { memo } from 'react';

import HYTopBanner from './c-cpns/top-banner';
import HYHotRecommend from './c-cpns/hot-recommend';
import HYNewAlbum from './c-cpns/new-album';
import HYRecommendRanking from './c-cpns/recommend-ranking';
import HYUserLogin from './c-cpns/user-login';
import HYSettleSonger from './c-cpns/settle-songer';
import HYHotRadio from './c-cpns/hot-radio';
import { 
  RecommendWrapper,
  Content,
  RecommendLeft,
  RecommendRight
} from './style';

function HYRecommend(props) {
  return (
    <RecommendWrapper>
      <HYTopBanner/>
      <Content className="wrap-v2">
        <RecommendLeft>
          <HYHotRecommend/>
          <HYNewAlbum/>
          <HYRecommendRanking/>
        </RecommendLeft>
        <RecommendRight>
        <HYUserLogin />
          <HYSettleSonger />
          <HYHotRadio />
          </RecommendRight>
      </Content>
    </RecommendWrapper>
  )
}

export default memo(HYRecommend);
