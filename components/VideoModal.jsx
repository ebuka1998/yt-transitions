import {Text, StyleSheet, Pressable, StatusBar} from "react-native";
import React, {useContext, useState} from "react";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";
import {height, dragRange, dragDownVal} from "../constants/constant";
import {PlayerContext} from "../context/playerContext";
import {Gesture, GestureDetector} from "react-native-gesture-handler";
import VideoPlayerComponent from "./VideoPlayerComponent";

const VideoModal = () => {
  const {showHeight, endVideo, translateY, selectedVideo} =
    useContext(PlayerContext);

  const showControl = useSharedValue(0);
  const begin = useSharedValue(false);
  const context = useSharedValue({y: 0});

  const gesture = Gesture.Pan()
    .onBegin(() => {
      begin.value = true;
    })
    .onStart(() => {
      context.value = {y: translateY.value};
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y;
      showControl.value = 0;
    })

    .onEnd((event) => {
      if (event.translationY > dragRange) {
        translateY.value = withTiming(dragDownVal);
        showControl.value = 0;
        // start.value = translateY.value
      } else if (event.translationY < -dragRange) {
        translateY.value = withTiming(0);
        showControl.value = 0;
        // start.value = translateY.value
      } else {
        translateY.value = withTiming(context.value.y);
        showControl.value = 0;
      }
      showControl.value = 0;
    });

  const singleTap = Gesture.Tap()
    .onBegin(() => {
      begin.value = true;
    })
    .onTouchesDown(() => {
      showControl.value = withTiming(1, {
        duration: 3000,
        easing: Easing.in(Easing.ease),
      });
    })
    .onEnd(() => {
      showControl.value = withTiming(0, {
        duration: 2000,
        easing: Easing.out(Easing.out),
      });
    });

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      height: showHeight.value,
      transform: [
        {
          translateY: interpolate(
            translateY.value,
            [0, dragDownVal], //inputrange
            [0, dragDownVal], //outputRange
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const scrollViewOpacity = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        translateY.value,
        [0, height - 500, dragDownVal],
        [1, 0.5, 0],
        Extrapolate.CLAMP
      ),
    };
  });
  const slideUp = () => {
    translateY.value = withTiming(0);
  };

  // const composed = Gesture.Race(gesture, singleTap);
  return (
    <Animated.View style={[styles.container, reanimatedStyle]}>
      <Pressable onPress={slideUp}>
        <VideoPlayerComponent
          translateY={translateY}
          showControl={showControl}
          slideUp={slideUp}
          selectedVideo={selectedVideo}
          endVideo={() => endVideo()}
          gesture={gesture}
        />
      </Pressable>
      <Animated.ScrollView scrollEventThrottle={16} style={scrollViewOpacity}>
        <Text>hello</Text>
      </Animated.ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 256, 1)",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    marginTop: StatusBar.currentHeight,
    zIndex: 20,
  },
});
export default VideoModal;
