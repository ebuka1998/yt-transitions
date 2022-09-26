import {View, Text} from "react-native";
import React from "react";
import Slider from "@react-native-community/slider";
import { width } from "../constants/constant";

const VideoSlider = ({
  togglePlay,
  playbackInstanceInfo,
  setPlaybackInstanceInfo,
  playbackInstance,
}) => {
  return (
    <View>
      <Slider
        style={{height: 8, width: width, marginLeft:0}}
        thumbTintColor={"red"}
        thumbStyle={{
          height: 17,
          width: 17,
          borderRadius: 100,
        }}
        minimumTrackTintColor={"red"}
        maximumTrackTintColor="red"
        value={
          playbackInstanceInfo.duration
            ? playbackInstanceInfo?.position / playbackInstanceInfo.duration
            : 0
        }
        onSlidingStart={() => {
          if (playbackInstanceInfo.state === "Playing") {
            togglePlay();
            setPlaybackInstanceInfo({
              ...playbackInstanceInfo,
              state: "Paused",
            });
          }
        }}
        onSlidingComplete={async (e) => {
          const position = e * playbackInstanceInfo.duration;
          if (playbackInstance) {
            await playbackInstance.setStatusAsync({
              positionMillis: position,
              shouldPlay: true,
            });
          }
          setPlaybackInstanceInfo({
            ...playbackInstanceInfo,
            position,
          });
        }}
      />
    </View>
  );
};

export default VideoSlider;
