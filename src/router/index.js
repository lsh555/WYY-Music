import React from 'react'
import {Redirect} from 'react-router-dom'


const LSHDiscover  = React.lazy(() => import( "@/pages/discover"));
const HYRecommend  = React.lazy(_ => import( "../pages/discover/c-pages/recommend"));
const HYRanking = React.lazy(_ => import( "../pages/discover/c-pages/ranking"));
const HYSongs = React.lazy(_ => import( "../pages/discover/c-pages/songs"));
const HYDjradio = React.lazy(_ => import( "../pages/discover/c-pages/djradio"));
const HYArtist  = React.lazy(_ => import( "../pages/discover/c-pages/artist"));
const HYAlbum = React.lazy(_ => import( "../pages/discover/c-pages/album"));
const HYPlayer = React.lazy(_ => import( '../pages/player'));

const LSHMine = React.lazy(_ => import( "@/pages/mine"));
const LSHFriend = React.lazy(_ => import( "@/pages/friend"));


const routes = [
  {
    path: "/",
    exact:true,
    render:()=>(
      <Redirect to="/discover"/>
    )
  },
  {
    path: "/discover",
    component: LSHDiscover,
    routes: [
      {
        path: "/discover",
        exact: true,
        render: () => (
          <Redirect to="/discover/recommend"/>
        )
      },
      {
        path: "/discover/recommend",
        component: HYRecommend
      },
      {
        path: "/discover/ranking",
        component: HYRanking
      },
      {
        path: "/discover/songs",
        component: HYSongs
      },
      {
        path: "/discover/djradio",
        exact: true,
        component: HYDjradio
      },
      {
        path: "/discover/artist",
        component: HYArtist
      },
      {
        path: "/discover/album",
        component: HYAlbum
      },
      {
        path: "/discover/player",
        component: HYPlayer
      }
    ]
  },
  {
    path: "/mine",
    component: LSHMine
  },
  {
    path: "/friend",
    component: LSHFriend
  },
];

export default routes