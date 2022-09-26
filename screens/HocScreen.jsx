import {View, Text} from "react-native";
import React, {useContext} from "react";
import {PlayerContext} from "../context/playerContext";
import VideoModal from "../components/VideoModal";

// const HocScreen = () => {
//   const {selectedVideo} = useContext(PlayerContext);
//   return (
// <View style={{position: 'absolute', opacity: 1}}>
//   {selectedVideo && <VideoModal />}
// </View>
//   );
// };

const HocScreen =
  (Component) =>
  ({...props}) => {
    const {selectedVideo} = useContext(PlayerContext);
    return (
      <>
        <View>
          {selectedVideo && <VideoModal />}
        </View>
        <Component {...props}/>
      </>
    );
  };
export default HocScreen;
