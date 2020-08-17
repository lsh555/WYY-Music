import React, { memo, useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { getSizeImage, formatDate, getPlaySong } from '@/utils/format-utils';

import { NavLink } from 'react-router-dom';
import { Slider,message } from 'antd';

import { getSongDetailAction,
         changeSequenceAction,
         changeCurrentIndexAndSongAction,
         changeCurrentLyricIndexAction } 
  from '../store/actionCreators';
import {
  PlaybarWrapper,
  Control,
  PlayInfo,
  Operator
} from './style';

export default memo(function HYAppPlayerBar() {
  
   // props and state
   const [currentTime, setCurrentTime] = useState(0);
   const [progress, setProgress] = useState(0);
   const [isChanging, setIsChanging] = useState(false);
   const [isPlaying, setIsPlaying] = useState(false);
   const [showPanel, setShowPanel] = useState(false);
 
  // redux hook
  const { currentSong,sequence,playList,lyricList,currentLyricIndex } = useSelector(state => ({
    playList:state.getIn(["player","playList"]),
    currentSong: state.getIn(["player", "currentSong"]),
    sequence: state.getIn(["player", "sequence"]),
    lyricList: state.getIn(["player", "lyricList"]),
    currentLyricIndex: state.getIn(["player", "currentLyricIndex"])
  }), shallowEqual);
  const dispatch = useDispatch();
  
  // other hooks
  const audioRef = useRef();
  useEffect(() => {
    dispatch(getSongDetailAction(167876));
  }, [dispatch]);
  useEffect(() =>  {
    audioRef.current.src = getPlaySong(currentSong.id);
    audioRef.current.play().then(res => {
      setIsPlaying(true);
    }).catch(err => {
      setIsPlaying(false);
    });
  }, [currentSong]);
  
  // other handle
  const picUrl = (currentSong.al && currentSong.al.picUrl) || "";
  const singerName = (currentSong.ar && currentSong.ar[0].name) || "未知歌手";
  const duration = currentSong.dt || 0;
  const showDuration = formatDate(duration, "mm:ss");
  const showCurrentTime = formatDate(currentTime, "mm:ss");

    // handle function
    const playMusic = useCallback(() => {
      isPlaying ? audioRef.current.pause(): audioRef.current.play();
      setIsPlaying(!isPlaying);
    },[isPlaying])

    const timeUpdate = (e) => {
      const currentTime = e.target.currentTime;
      if (!isChanging) {
        setCurrentTime(e.target.currentTime * 1000);
        setProgress(currentTime * 1000 / duration * 100);
      }
        // 获取当前的歌词
      let i = 0;
      for (; i < lyricList.length; i++) {
        let lyricItem = lyricList[i];
        if (currentTime * 1000 < lyricItem.time) {
          break;
        }
      }
      if (currentLyricIndex !== i - 1) {
      dispatch(changeCurrentLyricIndexAction(i - 1));
      const content = lyricList[i - 1] && lyricList[i - 1].content
      message.open({
        key: "lyric",
        content: content,
        duration: 0,
        className: "lyric-class"
      })
      }
    }

    //变换0，1，2，循环，单曲等
    const changeSequence = () => {
      let currentSequence = sequence + 1;
      if (currentSequence > 2) {
        currentSequence = 0;
      }
      dispatch(changeSequenceAction(currentSequence));
    }
    //上一首，下一首
    const changeMusic = (tag) => {
      dispatch(changeCurrentIndexAndSongAction(tag));
    }
    //歌曲播放完之后
    const handleMusicEnded = () => {
      if (sequence === 2) { // 单曲循环
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      } else {
        dispatch(changeCurrentIndexAndSongAction(1));
      }
    }

    //useCallback:当把一个回调函数传到一个自定义组件内部时候用
    const sliderChange = useCallback((value) => {
      setIsChanging(true);
      const currentTime = value / 100 * duration;
      setCurrentTime(currentTime);
      setProgress(value);
    }, [duration]);

    const sliderAfterChange = useCallback((value) => {
      const currentTime = value / 100 * duration / 1000;
      audioRef.current.currentTime = currentTime;
      setCurrentTime(currentTime * 1000);
      setIsChanging(false);
  
      if (!isPlaying) {
        playMusic();
      }
    }, [duration,isPlaying, playMusic]);

  return (
    <PlaybarWrapper className="sprite_player">
      <div className="content wrap-v2">
     <Control isPlaying={isPlaying}>
     <button className="sprite_player prev" onClick={e => changeMusic(-1)}></button>
     <button className="sprite_player play" onClick={e => playMusic()}></button>
     <button className="sprite_player next" onClick={e => changeMusic(1)}></button>
     </Control>
     <PlayInfo>
     <div className="image">
     <NavLink to="/discover/player">
              <img src={getSizeImage(picUrl, 35)} alt="" />
            </NavLink>
          </div>
      <div className="info">
      <div className="song">
          <span className="song-name">{currentSong.name}</span>
          <a href="#/" className="singer-name">{singerName}</a>
       </div>
       <div className="progress">
              <Slider defaultValue={30} 
                      value={progress}
                      onChange={sliderChange}
                      onAfterChange={sliderAfterChange}/>
              <div className="time">
                <span className="now-time">{showCurrentTime}</span>
                <span className="divider">/</span>
                <span className="duration">{showDuration}</span>
                </div>
              </div>
      </div>
    </PlayInfo>
    <Operator sequence={sequence}>
          <div className="left">
            <button className="sprite_player btn favor"></button>
            <button className="sprite_player btn share"></button>
          </div>
          <div className="right sprite_player">
            <button className="sprite_player btn volume"></button>
            <button className="sprite_player btn loop" onClick={e => changeSequence()}></button>
            <button className="sprite_player btn playlist"
            onClick={e => setShowPanel(!showPanel)}>{playList.length}</button>
          </div>
        </Operator>
      </div>
      <audio ref={audioRef} onTimeUpdate={timeUpdate}
      onEnded={e => handleMusicEnded()}/>
    </PlaybarWrapper>
  )
})
