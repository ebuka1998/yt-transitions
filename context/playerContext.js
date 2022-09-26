import React, {createContext, useState} from "react";
import {useSharedValue, withTiming, Easing} from "react-native-reanimated";
import {height} from "../constants/constant";

export const PlayerContext = createContext();

export const PlayerContextProvider = ({children}) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const showHeight = useSharedValue(0);
  const translateY = useSharedValue(0);

  const setVideo = (video) => {
    if (selectedVideo) {
      endVideo();
      setSelectedVideo(video);
      if (video) toggleVideo();
    }
    setSelectedVideo(video);
    if (video) toggleVideo();
  };

  const endVideo = () => {
    showHeight.value = withTiming(0, {
      duration: 300,
      easing: Easing.linear(Easing.linear),
    });
    translateY.value = withTiming(0, {
      duration: 300,
      easing: Easing.linear(Easing.ease),
    });
    setSelectedVideo(null);
  };

  const toggleVideo = () => {
    showHeight.value = withTiming(height, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    });
  };
  return (
    <PlayerContext.Provider
      value={{
        selectedVideo,
        showHeight,
        translateY,
        setVideo,
        setSelectedVideo,
        endVideo,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
