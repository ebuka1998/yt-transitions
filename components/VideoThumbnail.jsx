import {View, Text, StyleSheet, Image, Pressable} from "react-native";
import React, {useContext} from "react";
import millify from "millify";
import {width} from "../constants/constant";
import {PlayerContext} from "../context/playerContext";

const VideoThumbnail = ({video}) => {
  const {setVideo} = useContext(PlayerContext);
  return (
    <Pressable style={styles.container} onPress={() => setVideo(video)}>
      <View>
        <Image
          source={{uri: video.thumbnail[2].url}}
          style={{height: 250, width: "100%"}}
        />
        <View style={styles.minute}>
          <Text style={{color: "white"}}>{video.lengthText}</Text>
        </View>
      </View>
      <View style={styles.description}>
        <View>
          <Image
            source={{uri: video.channelThumbnail[0].url}}
            style={{height: 50, width: 50, borderRadius: 50}}
          />
        </View>
        <View style={{paddingLeft: 20}}>
          <Text
            style={{fontSize: 18, color: "black", width: width / 1.3}}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {video.title}
          </Text>
          <Text
            style={{fontSize: 14, color: "gray", width: width / 1.3}}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {video.channelTitle} . {millify(video.viewCount)} views .{" "}
            {video.publishedText}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    marginBottom: 10,
  },
  minute: {
    position: "absolute",
    bottom: 2,
    right: 4,
  },
  description: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
});
export default VideoThumbnail;
