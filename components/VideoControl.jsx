import {
  View,
  Text,
  ActivityIndicator,
  Pressable,
  StyleSheet,
} from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Slider from "@react-native-community/slider";
import {height, dragDownVal} from "../constants/constant";
import {getMinutesSecondsFromMilliseconds} from "../utils/utils";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const VideoControl = ({
  state,
  togglePlay,
  playbackInstanceInfo,
  translateY,
  showIconValue,
}) => {
  function renderIcon() {
    if (state === "Buffering") {
      return <ActivityIndicator size={20} color="white" />;
    } else if (state === "Playing") {
      return <FontAwesome name="pause" size={20} color="#fff" />;
    } else if (state === "Paused") {
      return <FontAwesome name="play" size={20} color="#fff" />;
    } else if (state === "Ended") {
      return <MaterialIcons name="replay" size={20} color="#fff" />;
    }
  }

  const rControlOpacity = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scaleY: interpolate(
            translateY.value,
            [0, dragDownVal], //inputrange
            [1, 0], //outputRange
            Extrapolate.CLAMP
          ),
        },
      ],
      opacity:
        state === "Paused"
          ? 1
          : state === "Paused" && translateY.value > 0 ? 0 :  interpolate(
              showIconValue.value,
              [0, 1,], //inputrange
              [0, 1,], //outputRange
              Extrapolate.IDENTITY
            ),
    };
  });
  return (
    <Animated.View style={[{...StyleSheet.absoluteFill}, rControlOpacity]}>
      <View
        style={{
          // ...StyleSheet.absoluteFill,
          position: "absolute",
          height: "100%",
          width: "100%",
          zIndex: 10,
          backgroundColor: "rgba(0,0,0,0.5)",
          //   opacity: 0.7,
          flex: 1,
        }}
      >
        <View
          style={{
            display: "flex",
            // alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
            width: "100%",
            zIndex: 20,
          }}
        >
          <View
            style={{alignItems: "center", justifyContent: "center", flex: 1}}
          >
            <Pressable
              onPress={state === "Buffering" ? null : togglePlay}
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                backgroundColor: "blue",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {renderIcon()}
            </Pressable>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 10,
              paddingBottom: 15,
            }}
          >
            <View>
              <Text style={{color: "white"}}>
                {getMinutesSecondsFromMilliseconds(
                  playbackInstanceInfo.position
                )}{" "}
                /{" "}
                {getMinutesSecondsFromMilliseconds(
                  playbackInstanceInfo.duration
                )}
              </Text>
            </View>
            <View>
              <AntDesign name="iconfontdesktop" color={"red"} />
            </View>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default VideoControl;
