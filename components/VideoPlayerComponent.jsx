import {View, Text, Pressable} from "react-native";
import React, {useCallback, useRef, useState} from "react";
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {dragDownVal, height, midBound, width} from "../constants/constant";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import {Video, AVPlaybackStatus, ResizeMode} from "expo-av";
import VideoPlayer from "expo-video-player";
import {Gesture, GestureDetector} from "react-native-gesture-handler";
import VideoControl from "./VideoControl";
import VideoSlider from "./VideoSlider";
import {WebView} from "react-native-webview";
import YoutubePlayer from "react-native-youtube-iframe";

const VideoPlayerComponent = ({
  translateY,
  slideUp,
  selectedVideo,
  endVideo,
  gesture,
  showControl,
  isPaused,
}) => {
  const playbackInstance = useRef(null);

  const [playbackInstanceInfo, setPlaybackInstanceInfo] = useState({
    position: 0,
    duration: 0,
    state: "Buffering",
  });
  const rVideoStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        translateY.value,
        [0, dragDownVal], //inputrange
        [height / 3, 70],
        Extrapolate.CLAMP
      ),
    };
  });
  const videoWidth = useAnimatedStyle(() => {
    return {
      height: interpolate(
        translateY.value,
        [0, dragDownVal], //inputrange
        [height / 3, 70],
        Extrapolate.CLAMP
      ),
      width: interpolate(
        translateY.value,
        [0, midBound, dragDownVal], //inputrange
        [width, width, width / 3],
        Extrapolate.CLAMP
      ),
    };
  });

  const textOpacity = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        translateY.value,
        [0, height - 500, dragDownVal],
        [0, 0, 1],
        Extrapolate.CLAMP
      ),
    };
  });

  const togglePlay = async () => {
    const shouldPlay = playbackInstanceInfo.state !== "Playing";

    if (playbackInstance.current !== null) {
      await playbackInstance.current.setStatusAsync({
        shouldPlay,
        ...(playbackInstanceInfo.state === "Ended" && {positionMillis: 0}),
      });
      setPlaybackInstanceInfo({
        ...playbackInstanceInfo,
        state: playbackInstanceInfo.state === "Playing" ? "Paused" : "Playing",
      });
    }
  };

  const updatePlaybackCallback = (status) => {
    // console.log(status, "status");
    if (status.isLoaded) {
      setPlaybackInstanceInfo({
        ...playbackInstanceInfo,
        position: status.positionMillis,
        duration: status.durationMillis || 0,
        state: status.didJustFinish
          ? "Ended"
          : status.isBuffering
          ? "Buffering"
          : status.shouldPlay
          ? "Playing"
          : "Paused",
      });
    } else {
      if (status.isLoaded === false && status.error) {
        const errorMsg = `Encountered a fatal error during playback: ${status.error}`;
        console.log(errorMsg, "error");
        // setErrorMessage(errorMsg)
      }
    }
  };

  return (
    <View style={{display: "flex", justifyContent: "flex-start"}}>
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            {
              width: width,
              backgroundColor: "gray",
              borderTopWidth: 1,
              borderTopColor: "#ebe5e5",
              flexDirection: "row",
              alignItems: "center",
            },
            rVideoStyle,
          ]}
        >
          <View style={{flex: 4, flexDirection: "row", alignItems: "center"}}>
            <Animated.View style={videoWidth}>
              <View
                style={{
                  //  width:"100%",
                  height: "100%",
                  position: 'relative'
                }}
              >
                <WebView
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  source={{uri: `https://www.youtube.com/embed/${selectedVideo.videoId}`}}
                />
              </View>

              {/* <Video
                ref={playbackInstance}
                style={{height: "100%", position: "relative"}}
                // source={selectedVideo.video}
                source={{
                  uri: `https://www.youtube.com/watch?v=${selectedVideo.videoId}`,
                }}
                resizeMode="cover"
                shouldPlay={true}
                onPlaybackStatusUpdate={updatePlaybackCallback}

              />

              <VideoControl
                state={playbackInstanceInfo.state}
                playbackInstance={playbackInstance.current}
                playbackInstanceInfo={playbackInstanceInfo}
                setPlaybackInstanceInfo={setPlaybackInstanceInfo}
                togglePlay={togglePlay}
                translateY={translateY}
                showIconValue={showControl}
              /> */}
            </Animated.View>
            <Animated.Text style={textOpacity}>HELLO</Animated.Text>
          </View>
          <Animated.View
            style={[
              {
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-around",
                marginRight: 10,
              },
              textOpacity,
            ]}
          >
            <Ionicons name="md-pause" size={32} />
            <Ionicons name="md-close" size={32} onPress={endVideo} />
          </Animated.View>
        </Animated.View>
      </GestureDetector>
      {/* <VideoSlider
        playbackInstance={playbackInstance.current}
        playbackInstanceInfo={playbackInstanceInfo}
        setPlaybackInstanceInfo={setPlaybackInstanceInfo}
        togglePlay={togglePlay}
      /> */}
    </View>
  );
};

export default VideoPlayerComponent;
