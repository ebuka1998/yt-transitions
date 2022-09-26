import {View, Text, StyleSheet, BackHandler} from "react-native";
import React, {useContext, useEffect, useCallback} from "react";
import {PlayerContext} from "../context/playerContext";
import {useFocusEffect} from "@react-navigation/native";
import {dragDownVal, height} from "../constants/constant";
import {withTiming} from "react-native-reanimated";

const ChannelsScreen = ({navigation}) => {
  const {selectedVideo, translateY, showHeight} = useContext(PlayerContext);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (selectedVideo && showHeight.value === height) {
          translateY.value = withTiming(dragDownVal);
          return true;
        } else {
          navigation.goBack();
          return false;
        }
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [selectedVideo, translateY, showHeight])
  );
  return (
    <View style={styles.container}>
      <Text>ChannelsScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginTop: 83,
    // marginBottom: 70
    // height: height
  },
});

export default ChannelsScreen;
