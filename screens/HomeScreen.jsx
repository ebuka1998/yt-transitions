import {StyleSheet, ScrollView, StatusBar} from "react-native";
import React, {useContext, useEffect} from "react";
import VideoThumbnail from "../components/VideoThumbnail";
import {videosData} from "../constants/videoData";
import {PlayerContext} from "../context/playerContext";
import VideoModal from "../components/VideoModal";
import HomeHeader from "../components/HomeHeader";
import HocScreen from "./HocScreen";
import {DataContext} from "../context/dataContext";

const HomeScreen = () => {
  const {getTrendingVideos, trendingVideos} = useContext(DataContext);
  useEffect(() => {
    getTrendingVideos();
  }, []);

  return (
    <>
      <HomeHeader />
      <ScrollView style={styles.container}>
        {trendingVideos &&
          trendingVideos?.map((video, index) => (
            <VideoThumbnail video={video} key={index} />
          ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginTop: 83,
  },
});
export default HomeScreen;
// url={`https://www.youtube.com/watch?v=${id}`}
